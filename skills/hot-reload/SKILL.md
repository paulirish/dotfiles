# Hot Reloading for Chrome Extension Development

Developing Chrome extensions can be tedious when you have to manually reload the extension every time you make a change. This guide explains how to set up a simple, robust hot-reloading system for Manifest V3 (MV3) extensions with **zero dependencies**.

## The Architecture

The system consists of two parts:
1.  **Watcher Server (Node.js):** A script that runs on your development machine using native Node.js modules (`http` and `fs`). It watches your extension's files and notifies the extension via Server-Sent Events (SSE).
2.  **Extension Client (JavaScript):** A small script included in your extension that connects to the Watcher Server and triggers a reload when notified.

## Step 1: The Watcher Server (`hot-reload-server.mjs`)

This script uses native `fs.watch` for file watching and a native `http` server for SSE. Within, it uses a single regex to ignore irrelevant files.

See `hot-reload-server.mjs`

## Step 2: The Extension Client (`hot-reload.js`)

This script runs inside your extension and listens for the 'reload' message using the native `EventSource` API.

See `hot-reload-client.js`

# Step 3: Import hot-reload-client.js in the background service-worker script.

Add this to your `background.js`:
```javascript
importScripts('hot-reload-client.js');
```

> **Note:** The `management` permission is required for `chrome.management.getSelf` to detect if the extension is in development mode. The `tabs` permission is required to reload open extension tabs.

## Step 4: Usage

1.  Start the watcher:
    ```bash
    node hot-reload-server.js
    ```
2.  Load your extension as an "Unpacked Extension" in Chrome (`chrome://extensions`).
3.  Every time you save a file, the extension will automatically reload!

## Benefits of this Approach

- **Zero Dependencies:** No `npm install` required. Uses only native Node.js and Browser APIs.
- **Lightweight:** Uses the native `EventSource` API for efficient server-side events.
- **Robust:** Handles server restarts and provides debounced file watching.
- **Clean State:** `chrome.runtime.reload()` ensures the entire extension state is reset.
