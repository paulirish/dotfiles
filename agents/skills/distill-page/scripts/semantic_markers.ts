// Private-use delimiters injected into the page before Chromium emits the
// annotation proto. They are intentionally unlike Markdown syntax, so author
// text cannot be mistaken for a structural boundary during decoding.
export const PRE_OPEN_MARKER = '\uE000distill-page-pre-open\uE001';
export const PRE_CLOSE_MARKER = '\uE000distill-page-pre-close\uE001';
export const INLINE_CODE_OPEN_MARKER = '\uE000distill-page-inline-code-open\uE001';
export const INLINE_CODE_CLOSE_MARKER = '\uE000distill-page-inline-code-close\uE001';
