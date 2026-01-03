---
name: no-build-types
description: Sets up modern type checking without a build step. Use when setting up a new project, introducing TypeScript or JSDOC types, or when the user asks for "no build," "vanilla JS," or "erasable syntax" setups.
---

# Modern Type Checking (No Build Step)

This skill configures a project for type safety without requiring a compilation step (tsc/build).

## Core Philosophy

1. **Browser (Client-side)**: Use pure `.js` files with **JSDoc annotations**.
2. **Node.js (Server-side/Tooling)**: Use `.ts` files with **Erasable Syntax**.

## Configuration Standards

When configuring the project, always generate or update these files with the following settings:

### 1. `package.json`
Must be an ES Module and require modern Node.js (for native TS support).

```json
{
  "type": "module",
  "engines": {
    "node": ">=24.11.0"
  },
  "scripts": {
    "typecheck": "tsc --noEmit"
  }
}

```

### 2. `tsconfig.json`

Must enable `erasableSyntaxOnly` and `checkJs`.

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "nodenext",

    /* Node.js - Native TS Execution Flags */    
    "erasableSyntaxOnly": true, /* Prevents using unsupported TypeScript features. */
    "verbatimModuleSyntax": true, /* Enforces explicit type imports: https://nodejs.org/api/typescript.html#importing-types-without-type-keyword */
    "allowImportingTsExtensions": true, /* Allows 'import x from "./file.ts"' */
    "rewriteRelativeImportExtensions": true, /* Handle the import adjustment if compiling to JS */

    /* Type Checking Strategy */
    "noEmit": true,
    "allowJs": true,
    "checkJs": true,
    "strict": true
  }
}

```

## Coding Rules

When generating code under this specific configuration, strictly follow these rules:

### Browser Rules (`.js` files)

* **Types**: Use JSDoc for all type definitions.
* Variables: `/** @type {MyType} */`
* Functions: `/** @param {string} arg */`
* Imports: `/** @import {Types} from './mytypes.js' */`


### Node.js Rules (`.ts` files)

* **Erasable Syntax Only**: Do NOT use features that require transformation.
* ❌ No `enum`
* ❌ No `namespaces`
* ❌ No parameter properties (`constructor(public x: string)`)
* ❌ No `experimentalDecorators`


* **Imports**:
* Always include the file extension: `import { x } from './utils.ts'`
* Always use `import type` for type-only imports.
