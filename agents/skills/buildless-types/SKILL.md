---
name: buildless-types
description: Use when the user asks to "set up types without a build step", "use vanilla JS with types", "configure erasable syntax", or mentions "JSDoc type checking". It provides instructions for modern type safety using JSDoc in browsers and native TypeScript execution in Node.js.
---

# Modern Type Checking (No Build Step)

Configure projects for type safety without a compilation step (tsc/build) by leveraging JSDoc for browser code and Erasable Syntax for Node.js.

## Core Philosophy

*   **Browser (Client-side)**: Use pure `.js` files with **JSDoc annotations**. This ensures the code runs directly in the browser while maintaining full IDE type support and error checking.
*   **Node.js (Server-side/Tooling)**: Use `.ts` files with **Erasable Syntax**. This allows Node.js (v24.11.0+) to execute TypeScript files directly without a build step, provided they don't use non-erasable features like enums or namespaces.

## Configuration Standards

Apply these settings to enable seamless type checking.

### 1. `package.json`

Ensure the project is an ES Module and specifies a modern Node.js version.

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

Configure the TypeScript compiler to check JavaScript files and enforce erasable syntax.

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
    "strict": true,
    "skipLibCheck": true
  }
}
```

> [!WARNING]
> **Anti-Pattern: Avoid explicit `include` fields**
> Do NOT add an `include` array or `files` block to the `tsconfig.json` unless previously requested or strictly required to isolate specific directories. Explicit `include` fields are an anti-pattern because they override the default behavior (which natively scans all project files), leading to missing coverage when new files or extensions (like `.mjs`) are added later.

> [!WARNING]
> **Anti-Pattern: Avoid fragmented sub-package TSConfigs**
> Just because a monorepo workspace has multiple child `package.json` files (e.g., for publishing or dependency isolation), do NOT assume they each require their own localized `tsconfig.json`. It is fundamentally best practice to manage all typechecking via a **Single Unified Root `tsconfig.json`** that covers the entire repository. This prevents cross-package path resolution friction and avoids massive script redundancy when running full-repo checks.

## Coding Rules

Follow these rules to maintain a build-free environment.

### Browser Rules (`.js` files)

*   **Use JSDoc for all types**: Define variable types, function signatures, and complex objects using JSDoc comments.
*   **Avoid TS-specific syntax**: Do not use `interface`, `type` aliases, or other TypeScript-only syntax in `.js` files.
*   **Import types correctly**: Do NOT use the legacy typedef import (`/** @typedef {import('./types.js').User} User */`).  Use the modern TS 5.5+ style: `/** @import {User} from './types.js' */`.

### Node.js Rules (`.ts` files)

*   **Strictly use Erasable Syntax**: Avoid features that require transformation.
    *   ❌ No `enum`
    *   ❌ No `namespaces`
    *   ❌ No parameter properties in constructors
    *   ❌ No `experimentalDecorators`
*   **Include file extensions**: Always include the `.ts` extension in import paths: `import { x } from './utils.ts'`.
*   **Use `import type`**: Explicitly mark type-only imports to satisfy `verbatimModuleSyntax`.
*   Once implemented, add to project docs/guidelines that agents should NOT use `npx tsx` or `ts-node` to run node scripts; instead, just run them directly: `node script.ts`.


## Type Design & Analysis Principles

When working with types (whether in TS or via JSDoc), apply these principles to ensure high-quality type design:

### Analysis Framework
Evaluate types across these dimensions:
1. **Encapsulation**: Hide implementation details. Don't let invariants be violated from outside.
2. **Invariant Expression**: Express constraints clearly in the type structure. Make illegal states unrepresentable.
3. **Invariant Usefulness**: Ensure invariants prevent real bugs and model the domain accurately.
4. **Invariant Enforcement**: Enforce constraints at construction or via type guards. Prefer compile-time guarantees over runtime checks.

### Key Practices for Buildless Types
*   **Discriminated Unions**: Use them over enums (especially in TS where enums are non-erasable).
*   **Modern JSDoc Imports**: Use `@import` to bring in strong types from `.d.ts` or external packages.
*   **Pragmatism**: Value pragmatism over perfection. Use types to prevent bugs, not just to satisfy the compiler.

## Example Files

- **`examples/tsconfig.json`** - A complete type-checking configuration.
