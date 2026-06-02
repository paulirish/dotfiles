# @paulirish/agents

A collection of expert agent skills and command-line tools for Gemini and Claude.

## Installing Skills

Skills can be installed directly into your agent environment (e.g., Gemini CLI, Claude) using the `skills` CLI:

```bash
npx skills add paulirish/dotfiles/agents --skill <skill-name>
```

## Available Skills

Here is the list of available skills that you can add to your agent configuration:

### 🛠️ [buildless-types](skills/buildless-types/SKILL.md)
Use when setting up type checking/type safety without a compilation/build step (e.g., using JSDoc for browsers or erasable syntax for Node.js).
```bash
npx skills add paulirish/dotfiles/agents --skill buildless-types
```

### 🧹 [code-simplifier-gemini-cli](skills/code-simplifier-gemini-cli/SKILL.md)
Installs and configures a set of specialized subagents (Code Reuse Reviewer, Code Quality Reviewer, and Efficiency Reviewer) in Gemini CLI to automatically review and simplify code changes.
```bash
npx skills add paulirish/dotfiles/agents --skill code-simplifier-gemini-cli
```

### 🤖 [create-gemini-cli-subagents](skills/create-gemini-cli-subagents/SKILL.md)
An expert guide on how to define, create, configure, and delegate tasks to custom subagents inside the Gemini CLI environment.
```bash
npx skills add paulirish/dotfiles/agents --skill create-gemini-cli-subagents
```

### 💬 [github-pr-comments](skills/github-pr-comments/SKILL.md)
Easily query for open discussions, review feedback, and comments on a GitHub pull request to resolve them directly from your agent workflow.
```bash
npx skills add paulirish/dotfiles/agents --skill github-pr-comments
```

### 🔍 [heap-snapshot-inspection](skills/heap-snapshot-inspection/SKILL.md)
Provides expert guidance and step-by-step workflows for inspecting heap snapshots and resolving memory leaks in Chromium, Node.js, and Electron.
```bash
npx skills add paulirish/dotfiles/agents --skill heap-snapshot-inspection
```

### ⚡ [hot-reload-chrome-ext](skills/hot-reload-chrome-ext/SKILL.md)
Sets up a zero-dependency hot-reloading system for Manifest V3 Chrome extensions to automatically refresh open pages and reload the extension when source files change.
```bash
npx skills add paulirish/dotfiles/agents --skill hot-reload-chrome-ext
```

### 🎨 [modern-css](skills/modern-css/SKILL.md)
Brings specialized knowledge for writing high-quality modern CSS (including View Transitions, Container Queries, Scroll-driven animations, Masonry, `:has()`, and more) and refactoring legacy styles.
```bash
npx skills add paulirish/dotfiles/agents --skill modern-css
```

### 🔑 [npm-trusted-publishing](skills/npm-trusted-publishing/SKILL.md)
Expert walkthrough for setting up or debugging npm Trusted Publishing (OIDC) from GitHub Actions, handling secure credential-less publishing, provenance, and metadata validation.
```bash
npx skills add paulirish/dotfiles/agents --skill npm-trusted-publishing
```

### 🏗️ [pauls-project-setup](skills/pauls-project-setup/SKILL.md)
Applies Paul's modern project stack conventions for new repos (pnpm, native node test runner, esbuild, buildless JSDoc type checking, etc.).
```bash
npx skills add paulirish/dotfiles/agents --skill pauls-project-setup
```

### 🔎 [qmd-expert](skills/qmd-expert/SKILL.md)
Enables advanced usage of QMD (Quick Markdown Search) to run multi-query searches, retrieve deep contextual knowledge, and extract high-scoring chunk IDs.
```bash
npx skills add paulirish/dotfiles/agents --skill qmd-expert
```

---

## Development & Contribution

To contribute new skills or make improvements to existing ones:

### Structure
- `skills/`: The public skills directories.
- `clis/`: Command-line tools.

### Adding a New Skill
1. Create a new directory in `skills/`.
2. Add a `SKILL.md` file with your skill definition and the standard YAML frontmatter:
   ```yaml
   ---
   name: my-awesome-skill
   description: A short description of what this skill does.
   ---
   ```
