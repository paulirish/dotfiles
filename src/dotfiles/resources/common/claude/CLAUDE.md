# Global Claude Code Preferences

These are my general, cross-project preferences. They apply everywhere;
a project-specific `CLAUDE.md` takes precedence where they conflict.

---

## Memory location

Shared project memory lives at `.claude/memory/` (index in `MEMORY.md`).
The harness's default auto-memory path `/cfg/projects/-project/memory/` is
symlinked here, so memory writes from any session land in this directory and
travel with the repo. Read and update files here — not the cfg path.

---

## Approach

- Optimize for correctness and thoroughness over brevity or speed.
- Be exhaustive in code review, analysis, and agentic coding tasks.
  Do not stop at the first few findings.
- Investigate when uncertain rather than guessing.
- Ask clarifying questions when requirements are ambiguous rather than
  assuming.
- Flag uncertainty explicitly instead of presenting guesses as facts.

---

## Model selection

- Dynamically select the model best suited to the task at hand rather than
  defaulting to one model. Match model capability to task demand:
  - Use the most capable models (e.g. Opus) for hard reasoning, architecture,
    tricky debugging, and thorough code review.
  - Use faster/cheaper models (e.g. Sonnet, Haiku) for routine, mechanical,
    or well-scoped work (simple edits, boilerplate, quick lookups, bulk
    parallel subagents).
- When delegating to subagents or workflows, pick each agent's model to fit
  its subtask rather than inheriting one model for everything.
- If unsure which model fits, briefly say so and pick the more capable one
  for correctness-critical work.

---

## Verification

- Run tests and verification after making changes, not just before declaring
  done.
- Show diffs or plans before making non-trivial changes.
- Never disable failing tests to make them pass; fix the underlying issue.

---

## Communication & output

- Lead with the answer or result; keep prose tight and skip filler preambles.
- Reference code as `file:line`, and show the commands actually run.
- State plainly when something is unverified, skipped, or failed — don't
  imply success.
- Discuss tradeoffs directly; do not soft-pedal important downsides.

---

## Code & repo conventions

- Match the surrounding style; don't introduce new dependencies or frameworks
  without asking.
- Prefer small, reviewable diffs; don't reformat unrelated code.
- Commit or push only when asked; never force-push shared branches.
- Inspect existing project conventions before introducing new patterns.

### Python

- Target Python 3.11+ unless the project constrains the version.
- Use `pathlib.Path` for all filesystem code; avoid `os.path`.
- Prefer `tomllib` (stdlib 3.11+), dataclasses, `match/case`, f-strings.
- Use `uv` for package/env management when practical; prefer
  `subprocess.run(..., check=True)` over bare `os.system()`.

### Python / conda environments

- Manage environments with conda/mamba; capture deps in a `*.yaml` env file
  (prefer `mamba` for installs — it's faster).
- When a project needs multiple environments, use a **separate `*.yaml` file
  per environment** — don't pile unrelated deps into one env.
- Prefer `conda`/`mamba install` over `pip`; only use `pip` when a package
  isn't available via conda. Add pip deps to the env `*.yaml` under a `pip:`
  block.
- Don't `pip install` into the base env; create and activate a named env
  first.
- Pin versions for anything that affects results; avoid hidden global state.
- Always include `nodefaults` in the channels list of conda yaml files.

### Shell / bash

- Prefer `command -v` over `which` for portability.
- Quote all variables: `"$var"`, not `$var`.
- Use `[ -f ... ]` and `[ -d ... ]` rather than bare `test`.
- Prefer `set -euo pipefail` in new scripts.

---

## Sandbox / safe execution

- Prefer running commands in **sandbox mode** by default (read-only filesystem
  + no network) so commands can't accidentally mutate state or reach the
  network.
- Only disable the sandbox when a command genuinely needs it (installing deps,
  network fetch, writing outside the workspace) — and say why when doing so.
- Run `ulimit -c 0` when starting a new shell to disable core dumps — a crash
  that dumps core can quickly fill the small (~5 GB) root disk.
- Point `TMPDIR` at scratch when starting a new shell (e.g.
  `export TMPDIR=/scratch/tmp` after creating it) so temp files land on the
  large scratch disk instead of the small root.

---

## Data integrity

- Never modify source/primary data in place.
- Distinguish derived data from primary data clearly.
- Never put credentials, secrets, API keys, or tokens in Git — not even in
  comments.
- Prefer environment-variable injection for secrets; refer users to `~/.extra`.

---

## Authentication references

| Service          | Env var                                         | Notes                        |
|------------------|-------------------------------------------------|------------------------------|
| Anthropic/Claude | `ANTHROPIC_API_KEY`                             | Never log or print the value |
| OpenAI/Codex     | `OPENAI_API_KEY`                                | Optional                     |
| GitHub           | `GH_TOKEN`                                      | Or `gh auth login`           |
| AWS              | `AWS_ACCESS_KEY_ID` + `AWS_SECRET_ACCESS_KEY`   | Standard provider chain      |
| Mem0             | `MEM0_API_KEY`                                  | Optional                     |

Set these in `~/.extra` (never committed) or via your environment's secret
injection mechanism.
