# Red Team Audit: `safe-dom` Utility
**Status:** 🚩 CRITICAL SMELLS DETECTED
**Reviewer:** Principal Engineer (Red Team)

## 1. Interrogating the Premise (The "XY Problem")
**The Goal:** Prevent DOM-XSS using "Perfect Types" CSP and modern Sanitizer APIs.
**The Reality:** You've built a fragile, string-concatenating templating engine that mimics the syntax of `lit-html` but lacks its intelligence. 

By using `Trusted Types` with `'none'`, you've successfully nuked the standard sinks, but your `dom` helper is just a wrapper for `String.prototype.replace`. You are solving "How do I make strings safe?" instead of "How do I manage DOM state safely?"

## 2. Holistic Review & Architectural Smells

### The "Nuclear" Render Pattern
Your `render()` function calls `el.setHTML()` on every update. This is a performance catastrophe.
- **Focus Loss:** Every time you re-render a list, any `<input>` that had focus is destroyed and recreated. Good luck with form validation or search-as-you-type.
- **State Erasure:** CSS transitions, video playback, and scroll positions in sub-elements are wiped clean on every "update."
- **Parsing Overhead:** You are asking the browser to parse a massive string into DOM nodes every time a single counter increments.

### Global Namespace Pollution
`globalThis.$` and `globalThis.dom`. We stopped doing this when we moved away from jQuery for a reason. In a modern ESM-first codebase, this is an invitation for name collisions and makes it impossible to tree-shake your utility if only parts of it are used.

### The "SafeHTML" Leaky Abstraction
The `SafeHTML` class is a thin wrapper around a string. Because it implements `toString()`, it can be easily coerced back into a plain string and piped into a dangerous sink if the CSP isn't active (e.g., in a development environment or a misconfigured edge worker). It doesn't actually *contain* safe DOM nodes; it just promises that the string was escaped once upon a time.

## 3. Security & Performance: The Weak Links

### Context-Blind Escaping
Your `escapeHTML` regex is dangerous because it is **context-blind**. 
```js
// Vulnerability: Attribute Injection
const userInput = '"> <script>alert(1)</script> <a "';
const html = dom`<div title="${userInput}"></div>`;
```
While `setHTML` *might* catch the script tag, basic regex escaping doesn't understand the difference between being inside an attribute, a `style` tag, or a `script` tag. You are relying entirely on the browser's Sanitizer API to fix your bad strings.

### The "Safari is Dead" Strategy
`throw new Error('setHTML() not supported')`. 
As of early 2026, Safari's support for the Sanitizer API is still trailing. Throwing an error is not a "Safe DOM" strategy; it's an application crash. A grizzled dev knows you need a "Trusted Types" compatible fallback (like a light DOMPurify wrapper) to keep the business running.

---

## 4. The "Sanity" Refactor Plan

We need to move from **String-Based Security** to **Structural Security**.

### Step 1: Use `<template>` Elements
Instead of `SafeHTML` holding a string, it should hold a `DocumentFragment`.
- The `dom` tag should parse the template *once* into a detached fragment.
- Interpolated values should be inserted as `Text` nodes or sanitized attributes directly into the DOM tree, not via string concatenation.

### Step 2: Context-Aware Interpolation
The `dom` tag needs to identify *where* a variable is being placed.
- If it's between tags: Insert as a `Text` node (auto-safe).
- If it's in an attribute: Use `setAttribute` with the raw value (auto-safe for most attributes).
- This eliminates the need for a manual `escapeHTML` regex.

### Step 3: Ditch Globals, Use "Result" Objects
Stop polluting `globalThis`. Export a `createContext` or just standard ESM exports.
Make `SafeHTML` more robust—perhaps it shouldn't be a class, but a `Symbol`-branded object that only your `render` function knows how to unpack.

### Step 4: Graceful Degradation (The "Business" Requirement)
If `setHTML` is missing, we check for a `Trusted Types` policy. If that’s missing, we fall back to a safe `textContent` update or a tiny, bundled sanitizer. We don't just `throw`.

---

## 5. Conclusion
This code is "clever" in its use of new APIs but "naive" in its architectural execution. It’s a "Hello World" templating engine. If you want this to survive a production environment, we need to stop treating the DOM like a big string and start treating it like a tree.

**Shall I proceed with a refactor of `dom.js` following this plan?**
