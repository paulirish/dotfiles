# Global Claude Code Preferences

These preferences apply to all projects unless a project-level `CLAUDE.md` overrides them.

---

## Communication

- Lead with the verdict or conclusion; follow with reasoning
- Be concise by default — expand only when explicitly asked
- Discuss tradeoffs directly; do not soft-pedal important downsides
- Challenge questionable assumptions rather than implementing them silently
- Distinguish what is known from what is inferred; flag uncertainty explicitly

---

## Code behaviour

- Prefer readable code over unnecessary abstraction
- Inspect existing project conventions before introducing new patterns
- Do not refactor code unrelated to the current task
- Run relevant tests after meaningful changes

### Python

- Target Python 3.11+ unless the project constrains the version
- Use `pathlib.Path` for all filesystem code; avoid `os.path`
- Prefer `tomllib` (stdlib 3.11+), dataclasses, `match/case`, f-strings
- Use `uv` for environment and package management when practical
- Prefer `subprocess.run(..., check=True)` over bare `os.system()`

### Shell / bash

- Prefer `command -v` over `which` for portability
- Quote all variables: `"$var"`, not `$var`
- Use `[ -f ... ]` and `[ -d ... ]` rather than `test`
- Prefer `set -euo pipefail` in new scripts

---

## Data integrity

- Never modify source/primary data in place
- Distinguish derived data from primary data clearly
- Never put credentials, secrets, API keys, or tokens in Git
- Prefer environment-variable injection for secrets; refer users to `~/.extra`

---

## Workflow

- Do not commit unless explicitly asked
- Never force-push unless explicitly requested
- Never put credentials in Git — not even in comments
- Project-level `CLAUDE.md` overrides these global preferences

### Git

- Prefer HTTPS remotes in ephemeral or container environments
- Use `gh auth setup-git` for GitHub credential integration when possible
- Never write tokens to `.git-credentials` directly

---

## Authentication references

| Service       | Env var               | Notes                            |
|---------------|-----------------------|----------------------------------|
| Anthropic/Claude | `ANTHROPIC_API_KEY` | Never log or print this value  |
| GitHub        | `GH_TOKEN`            | Or use `gh auth login`           |
| AWS           | `AWS_ACCESS_KEY_ID` + `AWS_SECRET_ACCESS_KEY` | Standard provider chain |
| Mem0          | `MEM0_API_KEY`        | Optional                         |

Set these in `~/.extra` (never committed) or via your environment's secret injection mechanism.
