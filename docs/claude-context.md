# Claude context architecture

## Principle: progressive disclosure

Claude's context is a limited resource.
Load only what is relevant to the current task.
Retrieve specialized knowledge when needed; do not pre-load everything.

## Context hierarchy

```
always loaded:
    ~/.claude/CLAUDE.md            ← global preferences (tiny by design)

environment-specific:
    profile CLAUDE.md overlays     ← appended by the dotfiles installer

project-specific:
    <repo>/CLAUDE.md               ← stable project conventions

scoped:
    .claude/rules/                 ← task-scoped rule sets

procedural:
    .claude/skills/                ← reusable procedures (fetched on demand)

learned:
    Claude auto-memory             ← durable non-obvious facts

temporary:
    plans, scratch notes, task context
```

### What belongs where

| Layer | Contains |
|-------|----------|
| Global `~/.claude/CLAUDE.md` | Universal working-style and safety rules, nothing else |
| Profile overlay | Environment invariants (filesystem layout, resource limits, runtime quirks) |
| Project `CLAUDE.md` | Stable project conventions every session needs |
| Rules/skills | Scoped or procedural knowledge — fetched, not always loaded |
| Auto-memory | Durable learned facts — conclusions, not transcripts |
| Temporary context | Plans, debug notes, task state — discard when done |

---

## Memory policy

### Store conclusions, not transcripts

**Bad:**
> Yesterday we spent a long time debugging Redis and eventually discovered
> that integration tests failed because REDIS_URL wasn't set.

**Good:**
> Integration tests require REDIS_URL.

**Bad:**
> Claude kept using pandas even after being corrected.

**Good:**
> This project uses Polars, not pandas.

Memories should be short, factual, and useful to a future session with no
prior context.

### Memory promotion decision tree

```
New information
       |
       v
Useful in a future session?
   no ─────────> discard
   |
  yes
   |
Stable project invariant?
   yes ──────────> project CLAUDE.md / docs
   |
   no
   |
Non-obvious learned fact?
   yes ──────────> auto-memory
   |
   no ──────────> discard
```

Do not automatically promote every correction into permanent global instructions.
Global instructions should only change for genuinely cross-project preferences.

---

## Measuring context size

Use the built-in CLI command to check budget:

```bash
dotfiles claude-stats
```

Output:

```
Claude context budget

global CLAUDE.md
  lines:             52
  words:            285
  estimated tokens:  380

codeocean overlay
  lines:             36
  words:            210
  estimated tokens:  280

codeocean effective total
  estimated tokens:  660
```

Budgets (warnings, not hard failures):

| Layer | Token limit |
|-------|-------------|
| Global `CLAUDE.md` | 800 |
| Profile overlay | 500 |

Token estimate: `words × 4/3` (deterministic, no external dependencies).

---

## Memory garbage collection (future / optional)

A future `dotfiles memory-gc` workflow would:

- Remove stale memories superseded by project docs or git history
- Merge duplicate entries
- Shorten verbose entries to their essential conclusion
- Resolve contradictions between memories
- Promote stable project invariants to project `CLAUDE.md`
- Demote inappropriate global instructions to project scope

Until then: review `.claude/memory/` periodically and prune manually.

---

## Why Mem0 is deferred

Native Claude auto-memory is being evaluated first in real project use.
Adding Mem0 (or any external vector store) before that evaluation would
introduce complexity without evidence it improves recall quality or
session coherence.  Revisit once native memory has been used across
multiple project types.
