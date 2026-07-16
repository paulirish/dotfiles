# Page Distiller Skill (`distill-page`)

This folder contains the `distill-page` agent skill, designed to extract clean, distilled webpage Markdown using the Chrome DevTools Protocol (CDP). It leverages Chromium's experimental Page Content Annotations machine-learning model to parse and annotate page structures natively.

## 🚀 Usage

You can execute the page distiller directly using Node.js:

```bash
# Fetch and distill a page to Markdown (default behavior)
node agents/skills/distill-page/scripts/distill-page.ts <URL>

# Output the raw decoded JSON representation
node agents/skills/distill-page/scripts/distill-page.ts --json <URL>

# Decode a base64 payload from stdin (bypasses Playwright browser launch)
node agents/skills/distill-page/scripts/distill-page.ts --base64-stdin < base64.txt
```


## 🌟 Features & Benefits

Unlike tools like convert page DOM/HTML to markdown, `distill-page` uses Chromium's native visual Machine Learning model to isolate and format only the main content.

### Key Benefits:
1. **Extreme Noise Reduction**: Bypasses header menus, navigation links, sidebar widgets, ad overlays, search boxes, and footer links automatically.
2. **High Token Efficiency**: Reduces output size by **50% to 70%** on standard articles/blogs compared to converting full HTML:
   * **web.dev article**: 21KB (`turndown`) &rarr; **11KB** (`distill-page`) — **47% savings**
   * **paulirish.com homepage**: 7.4KB (`turndown`) &rarr; **2.4KB** (`distill-page`) — **67% savings**
   * This saves valuable context window tokens and reduces processing costs when feeding pages to downstream LLMs.
3. **Semantic Fidelity Features**:
   * **Page Titles**: Extracts and prepends the page title as a standalone plain text line at the very top.
   * **Table Captions**: Identifies table captions (`TableData.table_name`) and renders them cleanly as bold headers.
   * **Ad Stripping**: Instantly ignores nodes flagged as ads by the browser model (`is_ad_related`).
   * **Accordions**: Detects collapsed elements and wraps them in HTML `<details>` disclosure blocks.
   * **Asides**: Detects sidebars and callouts and wraps them in HTML `<aside>` tags (preventing heading hierarchy breakage).
   * **Heading Levels**: Dynamic mapping of text size hierarchies to appropriate Markdown headers (`XL` &rarr; `# H1`, `L` &rarr; `## H2`, `M` &rarr; `### H3`, etc.).

## 🛠️ Implementation Details

### Two-Pass Compiler Architecture
The parser uses a clean two-pass compiler design to decouple tree parsing from markdown serialization formatting:
1. **Phase 1 (Parse to AST)**: Recursively traverses the Chromium layout annotation protobufs (`AnnotatedPageContent`) and builds a strongly-typed intermediate document AST (`ASTDocument` containing `ASTBlockNode` and `ASTInlineNode` structures).
2. **Phase 2 (Serialize to Markdown)**: Traverses the AST and formats it into Markdown. This keeps formatting logic (spacing normalization, tag generation, emphasis grouping) separate from structural parsing.

### Core Mechanism
The script uses **Playwright** to launch Chromium and establish a direct **CDP Session** to a page. It then calls the experimental `Page.getAnnotatedPageContent` method to extract the ML-annotated layout tree.

### Headless execution
By default, the script launches Chromium in the **new headless mode** (`--headless=new` passed to Chromium `args` while keeping Playwright's `headless: false`). 
* Note: The old headless mode (Playwright's default `headless: true` or the `--headless` flag) consistently fails and returns a `Protocol error` for `Page.getAnnotatedPageContent`.

### Protocol & Compilation
The CDP method returns a base64 string containing a serialized `AnnotatedPageContent` message defined in Chromium's Optimization Guide.
* We compile these definitions into ESM JavaScript and TypeScript using `protobufjs-cli`.
* To update or regenerate these files from the upstream Chromium source tree, refer to the [Maintenance Guide](updating.md).

## ⚠️ Known Constraints

* **Empty Pages**: The CDP method will fail with a protocol error on `about:blank` or pages with negligible content.
* **Experimental Status**: This is an experimental CDP feature; its behavior may change or be removed in future Chromium versions.
* **Blockquotes**: The Chromium layout annotator model does not recognize blockquotes and maps `<blockquote>` elements to `AX_ROLE_UNKNOWN` (181). Because of this, Page Distiller does not support blockquote structural nesting or styling (we choose not to handle it because raw DOM injection fixes are fragile and break on nested line boundaries).

## 🆚 Turndown vs CDP ML Extraction (Tradeoffs)

We have evaluated this CDP `AnnotatedPageContent` method against standard HTML-to-Markdown parsers like [Turndown](https://github.com/mixmark-io/turndown). 

**The CDP method fails many standard syntax parser tests by design.**

### The Core Difference
* **Turndown is a Semantic Syntax Parser**: It maps raw HTML tags directly to Markdown syntax (`<em>` directly becomes `_`, `<code>` becomes backticks), relying entirely on the author's original HTML structure.
* **CDP is a Visual ML Extraction**: It strips away all HTML tags completely and abstracts the layout tree into generic elements (`CONTAINER`, `TEXT`, `IMAGE`). It relies entirely on how the page visually presents data.

### When the CDP approach is WORSE than Turndown:
Because the ML model discards precise tag identities, the CDP approach struggles when maintaining perfect structural syntax parity is required:
1. **Inline Code blocks (`<code>`)**: You lose literal backtick boundaries. The ML model evaluates textual sizing and styling. If a `<code>` block doesn’t explicitly look small or uniquely styled in the rendered layout, the CDP may emit it simply as generic `TEXT`, losing the code formatting.
2. **Specific Emphasis differentiation (`<i>` vs `<em>` vs `<b>` vs `<strong>`)**: Turndown retains whether the author specifically wanted bold or italics. The ML model collapses all these signals into a single generic boolean: `hasEmphasis: true`. 
3. **Paragraph spacing vs Layout breaks (`<p>` vs `<div>`)**: Turndown checks whether structural spaces match paragraph semantics. The ML model throws out tags entirely and returns `CONTENT_ATTRIBUTE_CONTAINER` nodes based on rendered boxes, making it very difficult to differentiate a semantic paragraph from a random padded div purely from the extracted data.

### Why we use CDP:
While it fails rigorous syntax parity, the CDP method perfectly replicates a **distraction-free reading environment**. For feeding web performance intelligence to autonomous AI agents, filtering out 90% of structural DOM noise (sidebars, footers, ad overlays, floating popups) using visual annotations is significantly more valuable than getting inline `<code>` tags translated perfectly from bad HTML.
