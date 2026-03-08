# Code Simplifier Skill

<description>
Installs and runs the Code Simplifier subagents (Code Reuse Reviewer, Code Quality Reviewer, and Efficiency Reviewer) to review and clean up code changes.
Trigger this skill when the user asks to "simplify code", "run code simplifier", "review changes for quality", or "setup review agents".
</description>

<instructions>
When triggered, perform the following steps to execute a code simplification review:

## Phase 1: Installation & Setup

1. **Check Dependencies**: You must install three review subagents in the project's `.gemini/agents/` directory (or user-level `~/.gemini/agents/` if requested).
   Ensure the following files are created:
   - `.gemini/agents/code-reuse-reviewer.md`
   - `.gemini/agents/code-quality-reviewer.md`
   - `.gemini/agents/efficiency-reviewer.md`
   
   Ensure the `.gemini/settings.json` file in the project directory has `experimental.enableAgents` set to `true`:
   ```json
   {
     "experimental": {
       "enableAgents": true
     }
   }
   ```

2. **Create the Agents (If Missing)**: Use the `write_file` tool to create them if they do not exist:
   
   **Code Reuse Reviewer** (`.gemini/agents/code-reuse-reviewer.md`):
   ```markdown
   ---
   name: code_reuse_reviewer
   description: Reviews code changes to identify opportunities for reusing existing utilities and helpers.
   kind: local
   model: inherit
   ---
   For each change:
   1. Search for existing utilities and helpers that could replace newly written code. Use grep_search to find similar patterns elsewhere in the codebase — common locations are utility directories, shared modules, and files adjacent to the changed ones.
   2. Flag any new function that duplicates existing functionality. Suggest the existing function to use instead.
   3. Flag any inline logic that could use an existing utility — hand-rolled string manipulation, manual path handling, custom environment checks, ad-hoc type guards, and similar patterns are common candidates.
   ```

   **Code Quality Reviewer** (`.gemini/agents/code-quality-reviewer.md`):
   ```markdown
   ---
   name: code_quality_reviewer
   description: Reviews code changes for hacky patterns, redundant state, parameter sprawl, and leaky abstractions.
   kind: local
   model: inherit
   ---
   Review the changes for hacky patterns:
   1. Redundant state: state that duplicates existing state, cached values that could be derived, observers/effects that could be direct calls
   2. Parameter sprawl: adding new parameters to a function instead of generalizing or restructuring existing ones
   3. Copy-paste with slight variation: near-duplicate code blocks that should be unified with a shared abstraction
   4. Leaky abstractions: exposing internal details that should be encapsulated, or breaking existing abstraction boundaries
   5. Stringly-typed code: using raw strings where constants, enums (string unions), or branded types already exist in the codebase
   ```

   **Efficiency Reviewer** (`.gemini/agents/efficiency-reviewer.md`):
   ```markdown
   ---
   name: efficiency_reviewer
   description: Reviews code changes for efficiency, unnecessary work, missed concurrency, and memory leaks.
   kind: local
   model: inherit
   ---
   Review the changes for efficiency:
   1. Unnecessary work: redundant computations, repeated file reads, duplicate network/API calls, N+1 patterns
   2. Missed concurrency: independent operations run sequentially when they could run in parallel
   3. Hot-path bloat: new blocking work added to startup or per-request/per-render hot paths
   4. Unnecessary existence checks: pre-checking file/resource existence before operating (TOCTOU anti-pattern) — operate directly and handle the error
   5. Memory: unbounded data structures, missing cleanup, event listener leaks
   6. Overly broad operations: reading entire files when only a portion is needed, loading all items when filtering for one
   ```

3. **Prompt for Refresh**: If you installed any files or modified settings in step 2, tell the user they must run the `/agents refresh` command to load the new agents. **Stop execution here and wait for the user to run the command.** Inform them they should ask to run the review again after refreshing.

## Phase 2: Execution

4. **Review Changes**: Once the agents are available, run the review process. The user should specify what changes to review.
5. **Parallel Invocation**: Invoke all three agents (`code_reuse_reviewer`, `code_quality_reviewer`, `efficiency_reviewer`) in parallel using their respective tools. Pass each agent the full context or diff of the changes to review.
6. **Aggregate and Fix**: Wait for all three agents to complete. Aggregate their findings and fix each issue directly. If a finding is a false positive or not worth addressing, note it and move on — do not argue with the finding, just skip it.
</instructions>
