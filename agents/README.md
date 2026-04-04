# @paulirish/agents

A monorepo for Paul Irish's Gemini/Claude skills and CLI agents.

## Structure

- `skills/`: Specialized agent skills for Gemini and Claude.
- `clis/`: Command-line tools intended for use via `npx`.

## Featured Tools

### Heap Snapshot Inspection
A suite of tools for investigating memory issues in Chromium environments.

- **CLI**: `npx @paulirish/agents heap-snapshot`
- **Skill**: `heap-snapshot-inspection` (Guides you through memory analysis)

## Installation & Setup

### For Development
This project uses `pnpm` for package management and follows the `buildless-types` standard.

```bash
pnpm install
```

### Installing Skills
To install the skills to your local Gemini or Claude configuration:

```bash
./paulirish-skills/install-skills.sh
```

## Usage

### Using CLIs
CLIs are designed to be run directly via `npx` without local installation:

```bash
npx @paulirish/agents heap-snapshot summary my-app.heapsnapshot
```

### Using Skills
Once installed, skills can be activated within your AI agent environment (e.g., Gemini CLI or Claude) to provide expert guidance on specific tasks.

## Development

### Adding a New Skill
1. Create a new directory in `skills/`.
2. Add a `SKILL.md` file with the skill definition.

### Adding a New CLI
1. Create a new directory in `clis/`.
2. Set up a `package.json` following the `pauls-project-setup` conventions.
3. Add the CLI entry point to the root `package.json` `bin` field for easy `npx` access.

### Testing
We use the native Node.js test runner:

```bash
pnpm test
```

## Publishing
The project is configured for publishing to npm as `@paulirish/agents`.

```bash
npm publish
```
