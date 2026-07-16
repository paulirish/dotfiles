#!/usr/bin/env node

import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import * as fs from 'node:fs';

async function getConverter() {
  // NOTE: This fallback logic is a bit weird/dumb. We try to use a local clone
  // of markpaste if it exists in the sibling directory, otherwise fall back to 
  // the published npm package. 
  try {
    // Try local path first (assuming markpaste is a sibling to dotfiles repo)
    const localUrl = new URL('../../../../../markpaste/src/index.js', import.meta.url).href;
    const module = await import(localUrl);
    return module.convert;
  } catch (e) {
    // Fall back to npm package
    try {
      const module = await import('markpaste');
      return module.convert;
    } catch (npmError: any) {
      console.error('Error: Could not load markpaste locally or from npm.');
      console.error(`Local error: ${e.message}`);
      console.error(`NPM error: ${npmError.message}`);
      process.exit(1);
    }
  }
}

async function main() {
  const args = process.argv.slice(2);
  const url = args[0];

  if (!url) {
    console.error('Usage: node fetch-as-markdown.ts <URL>');
    process.exit(1);
  }

  const convert = await getConverter();
  let browser;

  try {
    browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'load' });
    const bodyHtml = await page.content();

    const markdown = await convert(bodyHtml, { converter: 'turndown' });
    console.log(markdown);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

main();
