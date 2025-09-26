#!/usr/bin/env node

import {spawn} from 'child_process';
import puppeteer from 'puppeteer-core';

/**
 * Handy script for folks hacking on Chrome DevTools frontend
 * 
 * To use…
 *
 * Start chrome with remote debugguging port set. (9228 preferred to avoid other conflicts)
 *     <chrome> --remote-debugging-port=9228 --remote-allow-origins=devtools://devtools
 *
 * Pass a string to match against page titles and open the first match
 *     node debug_chrome_tab.mjs example
 * 
 * Even better, have `fzf` installed and use the interactive target chooser:
 *     node debug_chrome_tab.mjs
 *
 */

const DEBUGGING_PORTS = [9228, 9222];

async function cli() {
  try {
    const query = process.argv[2]?.trim();
    const {targets, port} = await findDebuggablePages();
    if (targets.length === 0) {
      throw new Error('No debuggable pages found.');
    }

    const target = await selectTarget(targets, query);
    if (!target?.webSocketDebuggerUrl) {
      if (query) throw new Error(`No page title matching "${query}" found.`);
      throw new Error('No target selected.');
    }

    const devtoolsUrl = getDevToolsUrl(target.webSocketDebuggerUrl);
    process.stdout.write(`${devtoolsUrl}\n`);

    await openUrlWithPuppeteer(devtoolsUrl, port);
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    if (error.message.includes('ECONNREFUSED')) {
      console.error('Ensure Chrome is running with --remote-debugging-port=9228 (or 9222)');
    }
    process.exit(1);
  }
}

async function findDebuggablePages() {
  for (const port of DEBUGGING_PORTS) {
    try {
      const response = await fetch(`http://localhost:${port}/json`);
      if (!response.ok) continue;
      const targets = await response.json();
      const filteredTargets = targets.filter(t => t.type === 'page' && !t.url.startsWith('devtools://'));
      return {targets: filteredTargets, port};
    } catch  {
      // Ignore and try the next port
    }
  }
  throw new Error(`Could not connect to Chrome on ports: ${DEBUGGING_PORTS.join(', ')}.`);
}

async function selectTarget(targets, query) {
  if (query) {
    return targets.find(t => t.title.toLowerCase().includes(query.toLowerCase()));
  }

  const choices = targets.map(t => `${t.title}\t${t.url}`);
  const selection = await runFzf(choices);
  const [selectedTitle, selectedUrl] = selection.split('\t');
  return targets.find(t => t.url === selectedUrl && t.title === selectedTitle);
}

function getDevToolsUrl(wsUrl) {
  const wsHost = wsUrl.replace(/^ws:\/\/ /, '');
  return `devtools://devtools/bundled/devtools_app.html?ws=${wsHost}`;
}

async function openUrlWithPuppeteer(url, port) {
  let browser;
  try {
    const response = await fetch(`http://localhost:${port}/json/version`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const {webSocketDebuggerUrl: browserWSEndpoint} = await response.json();
    if (!browserWSEndpoint) {
      throw new Error('Could not find webSocketDebuggerUrl.');
    }

    browser = await puppeteer.connect({browserWSEndpoint, defaultViewport: null});
    const page = await browser.newPage();
    await page.bringToFront();
    await page.goto(url);
  } finally {
    if (browser) {
      await browser.disconnect();
    }
  }
}

function runFzf(list) {
  return new Promise((resolve, reject) => {
    const fzfInput = list.join('\n');
    const fzf = spawn('fzf', ['--height=40%', '--layout=reverse', '--border', '--border-label', 'Select a page to debug'], {
      stdio: ['pipe', 'pipe', 'inherit'],
    });

    let selection = '';
    fzf.stdout.on('data', data => {
      selection += data.toString();
    });
    fzf.on('error', () => reject(new Error('fzf command not found. Please install fzf.')));
    fzf.on('close', code => {
      if (code === 0) return resolve(selection.trim());
      if (code === 130) return reject(new Error('Selection cancelled.'));
      reject(new Error(`fzf exited with code ${code}`));
    });

    fzf.stdin.write(fzfInput);
    fzf.stdin.end();
  });
}

cli();
