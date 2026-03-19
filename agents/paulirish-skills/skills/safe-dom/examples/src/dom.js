/**
 * @fileoverview DOM utilities and safe HTML creation.
 * Pairs with the Perfect Types CSP:
 *   Content-Security-Policy: require-trusted-types-for 'script'; trusted-types 'none';
 */

export class SafeHTML {
  /** @param {string} html */
  constructor(html) {
    /** @type {string} */
    this.html = html;
  }
  toString() {
    return this.html;
  }
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
      processedVal = val
        .map(v =>
          v instanceof SafeHTML
            ? v.html
            : v === undefined || v === null
              ? ''
              : escapeHTML(v),
        )
        .join('');
    } else if (val instanceof SafeHTML) {
      processedVal = val.html;
    } else {
      processedVal = escapeHTML(val);
    }

    return acc + str + processedVal;
  }, '');
  return new SafeHTML(html);
}

// An empty config {} tells the API "No allow-list, use the Baseline block-list."
// This permissive config allows safe attributes like class, id, aria-*, and data-*
// automatically, while still blocking event handlers (onerror, onclick, etc.).
// See: https://wicg.github.io/sanitizer-api/#built-in-safe-baseline-configuration
const defaultRenderSanitizer = new Sanitizer({});

/**
 * Renders a SafeHTML result into an element using setHTML() for Perfect Types compatibility.
 * setHTML() adds a second sanitization layer on top of the dom`` template's escaping.
 *
 * NOTE: new Sanitizer() (no config) uses a restrictive default allow-list.
 * this function uses new Sanitizer({}) which uses the permissive Baseline block-list.
 *
 * @param {Element} el
 * @param {SafeHTML} safeHtml
 * @param {Sanitizer} [sanitizer]
 */
export function render(el, safeHtml, sanitizer = defaultRenderSanitizer) {
  if (!(safeHtml instanceof SafeHTML)) {
    throw new Error('render() only accepts results from the dom`...` tag');
  }
  if (!('setHTML' in el)) {
    throw new Error('setHTML() not supported. Requires Chrome 133+ or Firefox 135+.');
  }
  // setHTML() is not yet in the TypeScript DOM lib — cast to access it.
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/setHTML
  /** @type {any} */ (el).setHTML(safeHtml.html, { sanitizer });
}

/**
 * Guaranteed querySelector. Always returns an element or throws if nothing matches.
 * @template {string} T
 * @param {T} query
 * @param {ParentNode=} context
 * @return {ParseSelector<T>}
 */
export function $(query, context) {
  const result = (context || document).querySelector(query);
  if (result === null) {
    throw new Error(`querySelector('${query}') not found`);
  }
  return /** @type {ParseSelector<T>} */ (result);
}

