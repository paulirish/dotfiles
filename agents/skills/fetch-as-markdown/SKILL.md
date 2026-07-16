---
name: fetch-as-markdown
description: Fetch a URL using Playwright and convert its content to Markdown.
---

# Fetch As Markdown Skill

This skill allows fetching any web page, rendering it using a headless browser (Playwright) to ensure client-side content is loaded, and converting the resulting HTML into clean Markdown using `markpaste`.

## Usage

```bash
node agents/skills/fetch-as-markdown/scripts/fetch-as-markdown.ts <URL>
```

Example:
```bash
node agents/skills/fetch-as-markdown/scripts/fetch-as-markdown.ts https://example.com
```

The script will output the converted markdown to stdout.
