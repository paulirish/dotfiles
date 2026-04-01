---
name: pauls-project-setup
description: Use this skill ALWAYS when the user asks to start a new project, initialize a repository, bootstrap a new app, or set up a codebase from scratch. It provides Paul's exact required modern stack conventions (pnpm, native node test, esbuild/vite, and buildless-types). If the user mentions "new project" or "setup", you must consult this skill before creating any files to ensure the correct architecture is used.
---

# Paul's Project Setup

When setting up a new project or initializing a repository, use this modern stack and these specific configuration conventions.

## Core Stack Strategy

We use this specific stack to maximize execution speed, minimize configuration overhead, and avoid slow build steps during development.

- **Package Manager**: `pnpm` (for strict dependency resolution and speed)
- **Type Checking**: `buildless-types` standard (JSDoc or Erasable Syntax with `tsc --noEmit` to get type safety without the overhead of a build step)
- **Testing**: Node.js native test runner (`node --test`)`. We avoid Jest entirely because it is notoriously slow and requires complex transpilation pipelines.
- **Bundler / Dev Server**: `esbuild` (for fast Node.js tooling compilation).

## Configuration Standards

Apply these baseline settings to enable the preferred workflow.

### 1. `package.json` Scripts & Settings

Ensure the project is an ES Module and defines standard scripts inspired by Paul's existing projects:

```json
{
  "type": "module",
  "engines": {
    "node": ">=24.11.0"
  },
  "scripts": {
    "test": "pnpm run typecheck && pnpm run test:node",
    "test:node": "node --test test/**/*.test.js",
    "typecheck": "tsc --noEmit",
    "preflight": "pnpm typecheck && pnpm test"
  }
}
```

### 2. Type Safety (`buildless-types`)
- Use modern Node.js features to run `.ts` files directly using erasable syntax, or use complete JSDoc annotations in `.js` files.
- The `tsconfig.json` should align with the `buildless-types` skill constraints (e.g., `erasableSyntaxOnly: true`, `verbatimModuleSyntax: true`, `allowImportingTsExtensions: true`).
- Execute files directly with `node script.ts`. **Do not use** tools like `npx tsx` or `ts-node`.

### 3. Testing
- Prefer the built-in Node.js test runner (`node --test`) for unit and integration testing. It requires zero configuration and runs extremely fast.
- If a richer ecosystem or browser-like testing environment is required, use `vitest`.
- Avoid `jest` completely due to its performance overhead and configuration complexity.

### 4. Bundling
- Use `esbuild` for fast Node.js CLI tooling compilation or generic JS bundling.
- Use `vite` for modern web application frontend development and building.
