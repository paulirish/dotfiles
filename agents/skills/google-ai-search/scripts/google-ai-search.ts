#!/usr/bin/env node

import { chromium } from 'playwright';
import * as fs from 'node:fs/promises';
import * as os from 'node:os';
import * as path from 'node:path';

async function main() {
  const args = process.argv.slice(2);
  
  // Simple argument parsing
  let query = '';
  let port = 51673;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--port' && args[i + 1]) {
      port = parseInt(args[i + 1], 10);
      i++;
    } else {
      query = args[i]; // Assume last non-flag is the query (or we can join them if multiple)
    }
  }

  // If query was multiple words not quoted, we might want to join them
  // But standard is to quote it. If we have multiple arguments that are not flags, let's join them.
  const positionalArgs = args.filter((arg, index) => {
    if (arg.startsWith('--')) return false;
    if (index > 0 && args[index - 1] === '--port') return false;
    return true;
  });
  query = positionalArgs.join(' ');

  if (!query) {
    console.error('Usage: node google-ai-search.ts [--port <port>] <query>');
    console.error('Default port is 51673. Ensure Chrome is running with --remote-debugging-port=51673');
    process.exit(1);
  }

  console.log(`Connecting to Chrome on port ${port}...`);
  let browser;
  try {
    try {
      browser = await chromium.connectOverCDP(`http://localhost:${port}`);
    } catch (e: any) {
      console.error(`Failed to connect to browser on port ${port}.`);
      console.error(`Ensure Chrome is running with --remote-debugging-port=${port}.`);
      console.error(`Error: ${e.message}`);
      process.exit(1);
    }

    console.log(`Running search for: "${query}"`);
    const context = await browser.newContext();
    const page = await context.newPage();

    let aiResponseContent: string | null = null;
    page.on('response', async (response) => {
      const url = response.url();
      if (
        url.startsWith('https://www.google.com/async/folif?') &&
        response.headers()['content-type']?.includes('text/html')
      ) {
        try {
          const text = await response.text();
          if (!aiResponseContent) aiResponseContent = text;
        } catch (e) {
          // ignore
        }
      }
    });

    await page.goto('https://www.google.com/search?q=&udm=50');
    await page.waitForTimeout(1000);

    const searchBox = page.locator('textarea:visible').first();
    await searchBox.fill(query, { timeout: 5000 });
    await page.waitForTimeout(500);
    await page.keyboard.press('Enter');

    console.log('Waiting for search results...');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    let savedSource = 'network';
    let contentToSave = aiResponseContent;

    if (!contentToSave) {
      // Strategy 2: DOM
      const element = await page.locator('*[data-subtree="aimc"]').first();
      if ((await element.count()) > 0) {
        contentToSave = await element.evaluate((el) => el.outerHTML);
        savedSource = 'dom';
      }
    }

    await page.close();
    await context.close();

    if (contentToSave) {
      const slug = query
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .substring(0, 30);
      const filename = `aimode_${slug}.html`;
      const downloadsDir = path.join(os.homedir(), 'Downloads');
      const fullPath = path.join(downloadsDir, filename);

      await fs.writeFile(fullPath, contentToSave);
      console.log(`Success: Saved AI response to ${fullPath} (source: ${savedSource})`);
    } else {
      console.error('Error: Could not find AI response via network or DOM.');
      process.exit(1);
    }
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
