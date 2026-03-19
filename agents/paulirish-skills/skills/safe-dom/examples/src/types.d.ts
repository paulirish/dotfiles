// Ambient declaration file — no imports/exports so TypeScript treats this
// as a script, making all declarations globally available without any import.

type ParseSelector<I extends string> =
  I extends `${infer TagName}#${string}`
    ? TagName extends keyof HTMLElementTagNameMap
      ? HTMLElementTagNameMap[TagName]
      : TagName extends keyof SVGElementTagNameMap
        ? SVGElementTagNameMap[TagName]
        : HTMLElement
    : I extends keyof HTMLElementTagNameMap
      ? HTMLElementTagNameMap[I]
      : I extends keyof SVGElementTagNameMap
        ? SVGElementTagNameMap[I]
        : HTMLElement;

declare class SafeHTML {
  html: string;
  constructor(html: string);
  toString(): string;
}

// Sanitizer API — not yet in TypeScript's DOM lib.
// https://developer.mozilla.org/en-US/docs/Web/API/Sanitizer
interface SanitizerConfig {
  allowElements?: string[];
  blockElements?: string[];
  dropElements?: string[];
  allowAttributes?: Record<string, string[]>;
  dropAttributes?: Record<string, string[]>;
}
declare class Sanitizer {
  constructor(config?: SanitizerConfig);
}
