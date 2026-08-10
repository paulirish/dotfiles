# Working style

- Lead with the answer. Keep prose concise.
- Investigate uncertainty; do not guess.
- Ask only when ambiguity materially affects the result.
- Be thorough when the task requires it, not by default.

# Engineering

- Read existing code and conventions before changing it.
- Make the smallest change that solves the problem.
- Prefer readable code over unnecessary abstraction.
- Do not refactor unrelated code or add dependencies without reason.
- Test meaningful changes. Never disable tests to make them pass.
- Commit or push only when asked. Never force-push shared branches.
- Reference code as `file:line`. Show commands actually run.

# Python

- Respect the project's existing environment manager.
- For new Python-only projects, prefer uv.
- Use conda/mamba when native dependencies make it useful.
- Don't mutate global/base environments; create named envs.
- Pin dependencies that affect reproducibility.
- Use pathlib.Path, f-strings, dataclasses, match/case (Python 3.11+).

# Context & agents

- Keep the main context small; retrieve only what is relevant.
- Use subagents to isolate substantial exploration.
- Give subagents narrow tasks and request concise findings.
- Use the cheapest capable model for delegated work:
  - Haiku: search, discovery, simple inspection.
  - Sonnet: implementation, debugging, review.
  - Opus: only when deep reasoning will materially improve the result.

# Memory

- Store durable, non-obvious facts useful to future sessions.
- Store conclusions, not task transcripts.
- Keep memories short and factual.
- Update or remove stale or conflicting memories.
- Do not store facts already obvious from project files.

# Safety

- Never expose or commit secrets; use environment variable injection.
- Never modify primary/source data in place.
- Keep derived and primary data clearly separate.
