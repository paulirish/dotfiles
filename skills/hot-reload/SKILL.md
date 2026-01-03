---
name: Hot Reloading for Chrome Extensions
description: This skill should be used when the user asks to "setup hot reload", "add hot reloading to chrome extension", "watch extension files", "auto reload extension", or mentions "manifest v3 hot reload". Provides a zero-dependency solution for automatic extension refreshing during development.
version: 0.1.0
---

# Hot Reloading for Chrome Extension Development

Provide a zero-dependency hot-reloading system for Manifest V3 (MV3) extensions. This system enables automatic extension and tab refreshing whenever source files change, eliminating the need for manual reloads in `chrome://extensions`.

## How It Works

The system consists of a server-side watcher and a client-side listener:
1.  **The Watcher (Node.js)**: Runs on the developer's machine. It uses native `fs.watch` to monitor the project directory and exposes a Server-Sent Events (SSE) endpoint (`/events`). When a file change is detected, it broadcasts a "reload" signal.
2.  **The Client (JavaScript)**: Injected into the extension's background service worker. It connects to the watcher server using `EventSource`. Upon receiving a "reload" signal, it reloads any open extension tabs (options pages, popups) and then calls `chrome.runtime.reload()` to refresh the extension itself.

## Implementation Guide for the Agent

To implement hot reloading in the current project, follow these steps:

### 1. Copy the Source Files

Copy the following files from the skill's `examples/` directory into the project root or a designated `tools/` directory:

-   `examples/hot-reload-server.mjs` -> `hot-reload-server.mjs`
-   `examples/hot-reload-client.js` -> `hot-reload-client.js`

### 2. Configure the Background Script

Update the extension's background service worker (e.g., `service-worker.js`) to import the client script. This should be the first line in the file:

```javascript
importScripts('hot-reload-client.js');
```

### 3. Update Permissions

Ensure the `manifest.json` includes `management` (to detect development mode) and `tabs` (to refresh open extension pages):

```json
{
  "permissions": [
    "management",
    "tabs"
  ]
}
```

### 4. Provide Execution Instructions to the User

Inform the user to start the watcher server in their terminal:

```bash
node hot-reload-server.mjs
```

## Additional Resources

### Examples
Working configuration and implementation scripts in `examples/`:
- **`examples/hot-reload-server.mjs`** - The Node.js watcher server (to be copied to the project).
- **`examples/hot-reload-client.js`** - The extension-side client (to be copied to the project).
