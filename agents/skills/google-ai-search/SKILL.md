---
name: google-ai-search
description: Run a Google Search and capture the AI response/Overview.
---

# Google AI Search Skill

This skill allows running a Google search query and capturing the AI Overview (SGE) response. It connects to a running Chrome instance via Chrome DevTools Protocol (CDP) to leverage the user's active session and authentication.

## Prerequisites

You must have Chrome running with remote debugging enabled on port 51673 (or specify a custom port).

To launch Chrome with remote debugging on Mac:
```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=51673
```

## Usage

```bash
node agents/skills/google-ai-search/scripts/google-ai-search.ts [--port <port>] <query>
```

Example:
```bash
node agents/skills/google-ai-search/scripts/google-ai-search.ts "how to use webusb in chrome extension"
```

The script will attempt to capture the AI response (either from network traffic or SGE DOM container) and save it as an HTML file in your `~/Downloads` directory (e.g., `~/Downloads/aimode_how-to-use-webusb-in-chrome-.html`).
