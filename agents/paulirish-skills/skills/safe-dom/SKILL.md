---
name: safe-dom
description: Use when the user wants safe/XSS-free DOM manipulation in vanilla JS, mentions setHTML(), Sanitizer API, Trusted Types, innerHTML replacement, or asks about preventing DOM-XSS. Also trigger when setting up dom utilities, a $ querySelector helper, or safe HTML templating patterns.
---

# Safe DOM Manipulation

This skill covers a layered approach to XSS-free DOM manipulation in vanilla JS:

1. **Perfect Types CSP** — blocks all legacy HTML injection sinks at the browser level
2. **`setHTML()` / Sanitizer API** — the modern safe HTML insertion primitive
3. **`dom` tagged template** — safe HTML templating with automatic escaping
4. **`render()`** — renders a `dom` template result into the DOM safely
5. **`$` helper** — typed `querySelector` that throws on miss

> **Compatibility caveat:** The `dom` + `render()` pattern as originally written uses `innerHTML`, which is blocked by Perfect Types CSP. See the [Integration section](#integration-and-caveats) for the fix.

---

## 1. Perfect Types CSP

Set this Content-Security-Policy header to eliminate the entire class of DOM-XSS:

```
Content-Security-Policy: require-trusted-types-for 'script'; trusted-types 'none';
```

**What this does:**
- `require-trusted-types-for 'script'` — all HTML parsing sinks (`innerHTML`, `outerHTML`, `document.write`, `insertAdjacentHTML`, etc.) now refuse plain strings
- `trusted-types 'none'` — no policy is allowed to create `TrustedHTML` objects, so there's no escape hatch

**Result:** The *only* safe path for HTML modification is `setHTML()` and `Document.parseHTML()`, which have sanitization built in. All legacy sinks are effectively disabled.

This is called "Perfect Types" — no policy needed, no vigilance required from developers. The browser enforces it.

---

## 2. `setHTML()` and the Sanitizer API

### Basic usage

```js
// Default sanitizer: strips scripts, event handlers, dangerous elements
el.setHTML('<b>Hello</b> <script>alert(1)</script>');
// el now contains: <b>Hello</b>

// Parse into a detached document instead of inserting directly
const doc = Document.parseHTML('<ul><li>Item</li></ul>');
const list = doc.querySelector('ul');
el.appendChild(list.cloneNode(true));
```

### Custom Sanitizer config

```js
// Allow only specific elements/attributes
const sanitizer = new Sanitizer({
  allowElements: ['b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'p'],
  allowAttributes: { 'a': ['href'] },
});
el.setHTML(untrustedString, { sanitizer });
```

### With Perfect Types CSP

`setHTML()` is the *designed* answer to Perfect Types — it does not use a Trusted Types sink internally. It's the only method that works when `trusted-types 'none'` is active.

### Browser support

Check [MDN: Element.setHTML()](https://developer.mozilla.org/en-US/docs/Web/API/Element/setHTML) or [caniuse](https://caniuse.com/mdn-api_element_sethtml) for current Baseline status before using in production. Use `@supports` or feature-detect:

```js
const supportsSetHTML = 'setHTML' in Element.prototype;
```

---

## 3. `dom` Tagged Template

A tagged template that auto-escapes interpolated values. Produces a `SafeHTML` wrapper — never a raw string.

```js
export class SafeHTML {
  /** @param {string} html */
  constructor(html) {
    /** @type {string} */
    this.html = html;
  }
  toString() { return this.html; }
}

/**
 * Escapes HTML special characters.
 * @param {unknown} str
 * @returns {string}
 */
export function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Tagged template for safe HTML.
 * Use ${unsafe_var} for untrusted input — it will be escaped.
 * Use ${dom`<b>safe</b>`} for trusted/nested templates.
 * @param {TemplateStringsArray} strings
 * @param {...(string | number | SafeHTML | Array<string | SafeHTML | number | undefined | null> | undefined | null)} values
 * @returns {SafeHTML}
 */
export function dom(strings, ...values) {
  const html = strings.reduce((acc, str, i) => {
    let val = values[i];
    if (val === undefined || val === null) val = '';

    let processedVal = '';
    if (Array.isArray(val)) {
      processedVal = val.map(v =>
        (v instanceof SafeHTML ? v.html : (v === undefined || v === null ? '' : escapeHTML(v)))
      ).join('');
    } else if (val instanceof SafeHTML) {
      processedVal = val.html;
    } else {
      processedVal = escapeHTML(val);
    }

    return acc + str + processedVal;
  }, '');
  return new SafeHTML(html);
}
```

**Usage:**

```js
const userName = '<script>alert(1)</script>';  // untrusted input
const items = ['Alpha', 'Beta'];

const result = dom`
  <h1>${userName}</h1>
  <ul>
    ${items.map(item => dom`<li>${item}</li>`)}
  </ul>
`;
// userName is escaped; nested dom`` calls pass through unescaped
```

---

## 4. `render()` — Safe Rendering

Renders a `SafeHTML` result into an element.

### Original version (uses innerHTML — blocked by Perfect Types CSP)

```js
export function render(el, safeHtml) {
  if (!(safeHtml instanceof SafeHTML)) {
    throw new Error('render() only accepts results from the dom`...` tag');
  }
  el.innerHTML = safeHtml.html;  // ⚠️ blocked when trusted-types 'none' is active
}
```

### Perfect Types-compatible version (use this with the CSP)

Use `setHTML()` instead of `innerHTML`. **Critical gotcha:** the default `Sanitizer` strips ALL attributes including `class`, `id`, `style`, and `data-*`. You must pass a custom `Sanitizer` that re-allows the presentation attributes you need:

```js
// Create once at module level, reuse across renders.
const renderSanitizer = new Sanitizer({
  allowAttributes: {
    'class': ['*'],
    'id': ['*'],
    'style': ['*'],
    'data-*': ['*'],
    'href': ['a'],
    'src': ['img', 'video', 'audio', 'source'],
    'alt': ['img'],
    'aria-label': ['*'],
    'aria-hidden': ['*'],
    'role': ['*'],
  },
});

export function render(el, safeHtml, sanitizer = renderSanitizer) {
  if (!(safeHtml instanceof SafeHTML)) {
    throw new Error('render() only accepts results from the dom`...` tag');
  }
  el.setHTML(safeHtml.html, { sanitizer });
}
```

This config preserves presentation attributes while still blocking `onerror`, `onclick`, and all other event handlers — which is the XSS risk the Sanitizer exists to prevent.

---

## 5. `$` querySelector Helper

A typed, throwing `querySelector` wrapper. Returns the correct element type based on the CSS selector string.

```js
/** @import { ParseSelector } from './types.js' */

/**
 * Guaranteed context.querySelector. Always returns an element or throws if nothing matches.
 * @template {string} T
 * @param {T} query
 * @param {ParentNode=} context
 * @return {ParseSelector<T>}
 */
globalThis.$ = function (query, context) {
  const result = (context || document).querySelector(query);
  if (result === null) {
    throw new Error(`query ${query} not found`);
  }
  return /** @type {ParseSelector<T>} */ (result);
};
```

**Usage:**

```js
const btn = $('button#submit');     // typed as HTMLButtonElement
const input = $('input[type=text]'); // typed as HTMLInputElement
const header = $('h1', myDialog);   // scoped to a context node
```

---

## 6. Type Declarations (`types.d.ts`)

Put this in `src/types.d.ts` (or wherever your ambient types live):

```ts
export type ParseSelector<I extends string> =
  I extends `${infer TagName}#${string}` ?
    TagName extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[TagName] :
    TagName extends keyof SVGElementTagNameMap ? SVGElementTagNameMap[TagName] :
    HTMLElement :
  I extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[I] :
  I extends keyof SVGElementTagNameMap ? SVGElementTagNameMap[I] :
  HTMLElement;

export class SafeHTML {
  html: string;
  constructor(html: string);
  toString(): string;
}

declare global {
  function $<T extends string>(query: T, context?: ParentNode): ParseSelector<T>;
  function dom(strings: TemplateStringsArray, ...values: any[]): SafeHTML;
}
```

---

## Integration and Caveats

### What works together

| Feature | With Perfect Types CSP | Without CSP |
|---|---|---|
| `setHTML()` | ✅ designed for this | ✅ |
| `Document.parseHTML()` | ✅ designed for this | ✅ |
| `dom` tagged template (building) | ✅ it's just string ops | ✅ |
| `render()` with `innerHTML` | ❌ blocked | ✅ |
| `render()` with `setHTML()` | ✅ | ✅ |
| `el.innerHTML = ...` | ❌ blocked | ✅ (unsafe) |

### Recommended combinations

**Option A: Perfect Types CSP + setHTML (simplest)**
```js
// CSP: require-trusted-types-for 'script'; trusted-types 'none';
el.setHTML(untrustedString);  // safe, browser-enforced
```

**Option B: dom template + setHTML-based render (full pattern)**
```js
// CSP: require-trusted-types-for 'script'; trusted-types 'none';
// render() uses setHTML() internally

const html = dom`<li>${userInput}</li>`;
render($('ul'), html);
```

**Option C: dom template + innerHTML (no Perfect Types CSP)**
```js
// No strict CSP — relies on the dom template for safety
const html = dom`<li>${userInput}</li>`;
render($('ul'), html);  // original render() with innerHTML
```

### Known limitations / gotchas

- **Default Sanitizer strips all attributes** — `class`, `id`, `style`, `data-*` are all removed unless explicitly re-allowed via `allowAttributes`. This will silently break CSS-dependent rendering. Always pass a custom `Sanitizer` in `render()`.
- `Sanitizer` and `setHTML()` are not yet in TypeScript's DOM lib — declare them manually in `types.d.ts` (see examples folder).
- `setHTML()` is not in all browsers — check Baseline status. As of 2026: Chrome 133+, Firefox 135+, Safari unknown.
- `ParseSelector<T>` type inference only works for simple selectors (tag, tag#id) — complex selectors like `div > span` fall back to `HTMLElement`.
- `dom` arrays require explicit typing if you mix `SafeHTML` and strings; TypeScript may not catch all misuse without stricter generics.

---

## Full Example

```html
<!-- index.html -->
<meta http-equiv="Content-Security-Policy"
  content="require-trusted-types-for 'script'; trusted-types 'none';">
<script type="module" src="./dom.js"></script>
<script type="module" src="./app.js"></script>
<ul id="list"></ul>
```

```js
// app.js
/** @import { SafeHTML } from './types.js' */

/** @param {{ name: string, score: number }[]} players */
function renderLeaderboard(players) {
  /** @type {SafeHTML[]} */
  const rows = players.map(p => dom`
    <li class="player">
      <span class="name">${p.name}</span>
      <span class="score">${p.score}</span>
    </li>
  `);

  render($('#list'), dom`${rows}`);
}

renderLeaderboard([
  { name: '<b>hacker</b>', score: 9001 },  // safely escaped
  { name: 'Alice', score: 100 },
]);
```

---

## References

- [MDN: Element.setHTML()](https://developer.mozilla.org/en-US/docs/Web/API/Element/setHTML)
- [MDN: Document.parseHTML()](https://developer.mozilla.org/en-US/docs/Web/API/Document/parseHTML)
- [MDN: Sanitizer constructor](https://developer.mozilla.org/en-US/docs/Web/API/Sanitizer/Sanitizer)
- [MDN: Trusted Types API](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API)
- [Jun Kokatsu: Eliminating XSS with Trusted Types](https://microsoftedge.github.io/edgevr/posts/eliminating-xss-with-trusted-types/)
- [ShopTalkShow 704: setHTML() episode](https://shoptalkshow.com/704/)
