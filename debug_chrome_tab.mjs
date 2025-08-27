#!/usr/bin/env node

import { spawn } from 'child_process';
import puppeteer from 'puppeteer-core'; // Use puppeteer-core for connecting


// this flow requires chrome is launched with
//     --remote-debugging-port=9228 --remote-allow-origins=devtools://devtools

const url = await selectAndGetDebuggerUrl(process.argv[2]?.trim() || null);
connectAndNavigate(url);


async function selectAndGetDebuggerUrl(titleQuery) {
  try {
    // 1. Fetch all available targets from Chrome
    const response = await fetch('http://localhost:9228/json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const allTargets = await response.json();

    // Filter out the DevTools instances themselves to avoid recursion
    const availableTargets = allTargets.filter(t => t.type === 'page' && !t.url.startsWith('devtools://'));
    if (availableTargets.length === 0) {
        console.error('Error: No debuggable pages found.');
        process.exit(1);
    }

    let target;

    // string passed in argv
    if (titleQuery) {
      target = availableTargets.find(t => t.title.toLowerCase().includes(titleQuery.toLowerCase()));
    } else {
      // Format targets for display in fzf
      const choices = availableTargets.map(t => `${t.title}\t${t.url}`);

      // Let the user choose a target using fzf
      console.log('Please select a target:');
      const selection = await runFzf(choices);

      if (!selection) {
        // This case handles if fzf returns an empty string, though it's rare on success
        throw new Error('No selection made.');
      }

      // Find the original target object based on the user's selection
      const [selectedTitle, selectedUrl] = selection.split('\t');
      target = availableTargets.find(t => t.url === selectedUrl && t.title === selectedTitle);
    }

    if (target && target.webSocketDebuggerUrl) {
      const wsUrl = target.webSocketDebuggerUrl.replace(/^ws:\/\//, '');
      const devtoolsUrl = `devtools://devtools/bundled/devtools_app.html?ws=${wsUrl}`;
      console.log('\n✅ DevTools URL:');
      console.log(devtoolsUrl);
      return devtoolsUrl;
    } else {
      console.error(`Error: Could not find the full target data for "${selection}".`);
      process.exit(1);
    }

  } catch (error) {
    // Catch errors from fetching or from the fzf process (e.g., cancellation)
    console.error(`\n❌ ${error.message}`);
    if (error.message.startsWith('fetch')) {
      console.log('Ensure chrome is running with    --remote-debugging-port=9228 --remote-allow-origins=devtools://devtools ')
    }
    process.exit(1);
  }
}



/**
 * Spawns fzf to allow the user to select from a list of items.
 * @param {string[]} list - The list of strings to choose from.
 * @returns {Promise<string>} A promise that resolves with the selected item.
 */
function runFzf(list) {
  return new Promise((resolve, reject) => {
    // Join the list into a single string with newlines for fzf's stdin
    const fzfInput = list.join('\n');

    // Spawn the fzf process. The arguments enhance the UI.
    const fzf = spawn('fzf', ['--height=40%', '--layout=reverse', '--border'], {
      stdio: ['pipe', 'pipe', 'inherit'], // pipe stdin, pipe stdout, inherit stderr
    });

    let selection = '';

    // Handle case where fzf command is not found
    fzf.on('error', (err) => {
      reject(new Error('fzf command not found. Please install fzf.'));
    });

    // Capture the selection from fzf's stdout
    fzf.stdout.on('data', (data) => {
      selection += data.toString();
    });

    // Handle the process closing
    fzf.on('close', (code) => {
      if (code === 0) {
        // Success, user made a selection
        resolve(selection.trim());
      } else if (code === 130) {
        // User cancelled (e.g., pressed Ctrl+C or Esc)
        reject(new Error('Selection cancelled.'));
      } else {
        reject(new Error(`fzf exited with code ${code}`));
      }
    });

    // Write the list of choices to fzf's stdin
    fzf.stdin.write(fzfInput);
    fzf.stdin.end();
  });
}



async function connectAndNavigate(url) {
  let browser;
  try {
    // Step 1: Fetch the WebSocket endpoint from the running Chrome instance
    console.log('Fetching connection endpoint from http://localhost:9228/json/version...');
    const response = await fetch('http://localhost:9228/json/version');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const versionInfo = await response.json();
    const browserWSEndpoint = versionInfo.webSocketDebuggerUrl;

    if (!browserWSEndpoint) {
        throw new Error('Could not find webSocketDebuggerUrl in version response.');
    }
    console.log(`Found browser WebSocket endpoint: ${browserWSEndpoint}`);


    // Step 2: Connect Puppeteer to the browser
    console.log('Connecting Puppeteer to the existing browser...');
    browser = await puppeteer.connect({
        browserWSEndpoint,
        defaultViewport: null // Inherit viewport from the browser
    });
    console.log('Puppeteer connected successfully.');


    // Step 3: Open a new tab (page) and navigate
    const page = await browser.newPage();
    await page.bringToFront();
    console.log('New tab opened. Navigating to ', url);
    await page.goto(url);


  } catch (err) {
    console.error('An error occurred:', err.message);
    console.error('Is Chrome running with --remote-debugging-port=9228?');
  } finally {
    if (browser) {
      // Step 4: Disconnect from the browser.
      // This is crucial! .disconnect() detaches Puppeteer but leaves the browser open.
      // .close() would terminate the entire browser instance.
      await browser.disconnect();
      console.log('Puppeteer disconnected.');
    }
  }
}

