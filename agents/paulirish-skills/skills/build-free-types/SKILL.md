---
name: build-free-types
description: This skill should be used when the user asks to "set up types without a build step", "use vanilla JS with types", "configure erasable syntax", or mentions "JSDoc type checking". It provides instructions for modern type safety using JSDoc in browsers and native TypeScript execution in Node.js.
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


## Example Files

- **`examples/tsconfig.json`** - A complete type-checking configuration.
