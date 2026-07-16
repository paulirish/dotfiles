---
name: distill-page
description: Extract distilled page content as Markdown using Chromium's on-device ML page content annotation.
---

# Page Distiller Skill

This skill extracts high-quality, noise-free Markdown content from a webpage using Chromium's experimental, on-device Machine Learning model annotations (`Page.getAnnotatedPageContent`).

Unlike generic HTML-to-Markdown parsers (e.g. Turndown) which rely on markup syntax heuristics, this approach uses Chromium's visual ML layout analysis. It automatically identifies semantic roles (such as `ARTICLE` and `MAIN`) and excludes sidebars, navigation elements, footers, and popups.

## Usage

```bash
node agents/skills/distill-page/scripts/distill-page.ts [--markdown] <URL>
```

### Options:
* `--markdown`: Output as distilled Markdown (recommended). Without this, it outputs the raw decoded protobuf JSON.
* `--base64-stdin`: Instead of fetching via Playwright, decode a base64-encoded protobuf payload passed via stdin.

### Examples:
```bash
# Get markdown representation of page
node agents/skills/distill-page/scripts/distill-page.ts --markdown https://example.com

# Get raw JSON structure of annotated layout tree
node agents/skills/distill-page/scripts/distill-page.ts https://example.com
```

## Requirements
* Launches a headful browser (`headless: false`) and requires Chromium feature flags:
  * `--enable-dom-distiller`
  * `--enable-features=OptimizationHints,PageContentAnnotation,OptimizationGuideModelDownloading`
* Playwright must be installed.
* ProtobufJS must be installed.
