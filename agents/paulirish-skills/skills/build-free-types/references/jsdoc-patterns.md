# JSDoc Patterns for Build-Free Type Checking

Use these patterns to maintain type safety in vanilla `.js` files without a build step.

## Type Imports

To import types from other files without using `import` statements that browsers might struggle with (or to keep them type-only), use the `@import` tag (supported in TS 5.5+).

```javascript
/** @import { User, Session } from './types.d.ts' */
/** @import { GlobalConfig } from '../config.js' */
```

## Basic Types

Define types for variables and constants.

```javascript
/** @type {number} */
let count = 0;

/** @type {string[]} */
const names = ['Alice', 'Bob'];

/** @type {Promise<string>} */
const dataPromise = fetchData();
```

## Functions

Document parameters and return values.

```javascript
/**
 * @param {string} url - The URL to fetch.
 * @param {RequestInit} [options] - Optional fetch options.
 * @returns {Promise<Response>}
 */
async function customFetch(url, options) {
  return fetch(url, options);
}
```

## Objects and Interfaces

Use `@typedef` to define complex shapes.

```javascript
/**
 * @typedef {Object} UserProfile
 * @property {string} id
 * @property {string} username
 * @property {string} [displayName] - Optional display name
 * @property {number} createdAt - Timestamp
 */

/** @type {UserProfile} */
const user = { id: '1', username: 'paul', createdAt: Date.now() };
```

## Type Assertions (Casting)

Use parentheses and `@type` to cast values.

```javascript
const element = /** @type {HTMLInputElement} */ (document.getElementById('my-input'));
element.value = 'hello';
```

## Generics

Use `@template` for generic functions.

```javascript
/**
 * @template T
 * @param {T[]} arr
 * @returns {T | undefined}
 */
function first(arr) {
  return arr[0];
}
```
