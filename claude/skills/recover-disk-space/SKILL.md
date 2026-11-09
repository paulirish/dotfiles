---
name: recover-disk-space
description: >
  Diagnose and recover macOS disk space without rebooting. Identifies runaway processes that bloat swap, lists the biggest disk hogs (caches, Application Support, Docker, Downloads, stale git worktrees), runs safe cache prunes, and asks before anything destructive. Use when the user says "running out of disk", "no disk left", "disk is full", "free up disk", "reclaim disk space", "clean up worktrees", or describes the "fixed by restart" pattern.
allowed-tools: [Bash, AskUserQuestion]
---

# Recover Disk Space (macOS)

Diagnose why disk is full and recover space without a reboot. A common pattern is: long-running app renderers leak memory → macOS grows swap files for days → disk fills → restart wipes swap and "fixes" it. This skill targets both the symptom (disk hogs) and the cause (runaway processes).

## When To Activate

- "running out of disk space", "no disk left", "disk is full", "almost full"
- "free up disk", "reclaim disk", "clean up disk"
- User describes the pattern: full after a few days of work, fixed by restart
- User asks how to avoid restarting to free disk

## Inputs

None. The skill probes the system directly.

## Instructions

Open with one short line stating you're using the `recover-disk-space` skill so the user knows the workflow is active.

### 1. Diagnose (read-only, run in parallel)

Run these in a single message in parallel — all are read-only:

```bash
df -h /
sysctl vm.swapusage; ls -lah /private/var/vm/ 2>/dev/null
tmutil listlocalsnapshots / 2>/dev/null | head -20
du -sh ~/Library/Caches 2>/dev/null
du -sh ~/Library/Application\ Support 2>/dev/null
du -sh ~/Library/Containers/com.docker.docker 2>/dev/null
du -sh ~/Downloads 2>/dev/null
ps aux | sort -k4 -nr | head -10
```

Then drill down only into the heaviest top-level folders found above:

```bash
du -sh ~/Library/Caches/* 2>/dev/null | sort -hr | head -10
du -sh ~/Library/Application\ Support/* 2>/dev/null | sort -hr | head -10
```

If the user works out of git repos with worktrees (`git worktree list` in each repo of interest), also run the stale-worktree audit in step 1b — worktrees for finished PRs are a frequent multi-GB source (each carries its own `node_modules`/`.next`/build output) that plain cache-prune commands never touch.

### 1b. Stale git worktree audit

For each repo the user works in that uses worktrees:

```bash
cd <repo> && git worktree prune -v   # metadata-only cleanup for dirs already gone — always safe, run first
git worktree list
du -sh <each worktree path> 2>/dev/null   # size per worktree
```

For every remaining real worktree, look up its branch's PR state (adjust remote as needed):

```bash
gh pr list --head <branch> --state all --json number,state,title --limit 1
```

Classify each:
- **MERGED** → candidate for removal. Before removing, confirm no real unmerged work: `git -C <worktree> status --porcelain` (ignore untracked `node_modules`/build dirs — those are never real work) and sanity-check the branch isn't hiding local-only commits beyond the merge.
- **OPEN** → leave untouched, it's active work.
- **CLOSED (not merged)** → ambiguous; don't auto-delete. Check whether the change actually landed another way (grep main for the feature/fix) and ask the user explicitly whether to delete or keep.

Include worktrees living outside the repo's own directory tree too — e.g. `.claude/worktrees/*` inside the repo, and any under a scratch/tmp path from prior sessions (`git worktree list` shows the real path regardless of location).

Present a table (worktree path, branch, PR #, state, size) before asking to remove anything.

### 2. Interpret findings

Present a compact summary table with:
- Filesystem capacity and free space
- Swap usage (highlight if > ~10 GB used — that points to the leaky-process pattern)
- Top 5–7 disk hogs across `Caches`, `Application Support`, Docker, Downloads
- Any process with multi-hundred-MB RSS that has been running for days, especially renderers (Cursor Helper, Chrome Helper, Slack Helper, VS Code Helper) at sustained high CPU%

A high-CPU long-running renderer is the prime suspect for swap bloat.

### 3. Ask the user with `AskUserQuestion` (multi-select)

Offer these options. Phrase the runaway-process option with the **specific PID and process name** found in step 1:

- "Kill runaway process: `<name>` (PID `<pid>`) — CPU `<n>%`, RSS `<n> MB`, running since `<date>`" — frees memory, reduces swap pressure.
- "Clear safe regeneratable caches" — runs the prune block in step 4.
- "Drill into `<biggest Application Support entry>` (`<size>`)" — read-only.
- "Show Docker reclaimable space (no delete)" — runs `docker system df -v`.

If swap > 10 GB and no obvious runaway process is found, also offer:
- "Show all processes with RSS > 300 MB sorted by CPU time" — `ps -axo pid,rss,time,%cpu,comm | awk '$2>300000' | sort -k4 -nr | head -20`.

### 3b. Ask about stale worktrees (part of the same `AskUserQuestion` round, or its own)

- "Remove the N worktrees backing merged PRs (~X GB)" — batch removal of everything classified MERGED with no unmerged work.
- For each CLOSED-but-not-merged worktree, ask individually whether to delete or keep.

### 4. Execute selected actions

**Safe cache prune block** (no confirmation needed once selected):

```bash
pnpm store prune 2>&1 | tail -5
rm -rf ~/Library/Caches/ms-playwright/* 2>/dev/null
brew cleanup --prune=all 2>&1 | tail -5
rm -rf ~/.Trash/* ~/.Trash/.[!.]* 2>/dev/null
df -h /
```

Skip yarn cache cleanup in pnpm projects — `yarn cache clean` errors out inside a pnpm project.

**Kill runaway process**: use `kill <PID>` (SIGTERM). The user's harness will prompt to confirm — that's expected and correct, since the PID is agent-inferred. Do not use `kill -9` unless SIGTERM fails after a couple of seconds.

**Drill into a folder**: just `du -sh <path>/* | sort -hr | head -10`.

### 4b. Execute worktree removal

For each approved worktree:

```bash
git worktree remove <path> --force
git branch -D <branch>
```

Then clean up now-empty parent directories the removals may have left behind (e.g. `.claude/worktrees/` once empty):

```bash
rmdir <parent-dir> 2>/dev/null
```

Run removals one at a time rather than in one long chained command — worktree removal can be slow (large `node_modules`) and a single long-running compound command risks hitting the tool timeout mid-batch with unclear partial state. Re-run `git worktree list` after to confirm final state.

### 5. Report

Show before/after for `df -h /`. List exactly what was freed, including any worktrees/branches removed (path, branch, PR #). List the residual hogs the user did not authorize for cleanup, with one-line guidance per item:

- **Claude / Cursor / VS Code Application Support**: chat history, workspace state, extensions — deleting loses local state.
- **Docker**: `docker system prune -a --volumes` reclaims aggressively but is destructive.
- **Downloads**: user content — never auto-delete.

## Hard rules

- Never delete from `Application Support`, `Documents`, `Downloads`, or any user-content path automatically. Always confirm per-folder.
- Never run `docker system prune -a --volumes` without explicit confirmation in this turn.
- Never `kill -9` a process before trying SIGTERM and waiting briefly.
- Never delete `/private/var/vm/swapfile*` — macOS manages those.
- Never disable Time Machine or delete local snapshots without explicit confirmation; check `tmutil listlocalsnapshots /` first.
- The harness will block agent-inferred process kills. That's correct — explain to the user and proceed when authorized.
