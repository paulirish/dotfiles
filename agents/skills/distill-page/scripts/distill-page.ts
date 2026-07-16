#!/usr/bin/env node
import {chromium} from 'playwright';
import {decodeAnnotatedPageContent, convertToMarkdown} from './decode_annotations.ts';

export {decodeAnnotatedPageContent, convertToMarkdown};

export async function injectSemanticMarkers(page: any) {
  await page.evaluate(() => {
    document.querySelectorAll('code').forEach(el => {
      if (!el.closest('pre')) {
        el.insertAdjacentText('afterbegin', '`');
        el.insertAdjacentText('beforeend', '`');
      }
    });
    document.querySelectorAll('pre').forEach(el => {
      el.insertAdjacentText('afterbegin', '\n```\n');
      el.insertAdjacentText('beforeend', '\n```\n');
    });
    document.querySelectorAll('blockquote').forEach(el => {
      const p = document.createElement('span');
      p.textContent = '> ';
      el.prepend(p);
    });
  });
}

export async function fetchDistilledBase64(url: string) {
  let browser;
  try {
    browser = await chromium.launch({
      headless: false,
      args: [
        '--headless=new',
        '--enable-features=OptimizationHints,PageContentAnnotation,OptimizationGuideModelDownloading',
        '--enable-dom-distiller',
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Create a CDP session to the page
    const client = await page.context().newCDPSession(page);

    // Enable the Page domain for experimental commands
    await client.send('Page.enable');

    const response = await page.goto(url, {waitUntil: 'load'});
    if (!response || !response.ok()) {
      throw new Error(`HTTP error! status: ${response ? response.status() : 'unknown'} when fetching ${url}`);
    }

    // Bridge the visual gap: Inject text markers to preserve semantic HTML bounds
    await injectSemanticMarkers(page);

    // Bring to front and wait for potential model processing
    await page.bringToFront();
    await page.waitForTimeout(2000);

    // Page.getAnnotatedPageContent returns distilled/annotated HTML content
    const {content} = await client.send('Page.getAnnotatedPageContent');

    await browser.close();
    return content;
  } catch (error) {
    if (browser) await browser.close();
    throw error;
  }
}

export async function processPage(url: string) {
  const base64Content = await fetchDistilledBase64(url);
  return decodeAnnotatedPageContent(base64Content);
}

function outputResult(decodedProto: any, toMarkdown: boolean) {
  if (toMarkdown) {
    console.log(convertToMarkdown(decodedProto));
  } else {
    console.log(JSON.stringify(decodedProto, null, 2));
  }
}

// Check if running as a standalone script
import {fileURLToPath} from 'node:url';

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const toMarkdown = !process.argv.includes('--json');
  const isBase64Stdin = process.argv.includes('--base64-stdin');

  if (isBase64Stdin) {
    let base64Data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', chunk => {
      base64Data += chunk;
    });
    process.stdin.on('end', () => {
      try {
        const decodedProto = decodeAnnotatedPageContent(base64Data.trim());
        outputResult(decodedProto, toMarkdown);
      } catch (err) {
        console.error('Error decoding base64:', (err as Error).message);
        process.exit(1);
      }
    });
  } else {
    const url = process.argv.find(arg => arg.startsWith('http') || arg.startsWith('file'));

    if (!url) {
      console.log(`
Usage (URL fetches via Playwright): node agents/skills/distill-page/scripts/distill-page.ts [--json] <URL>
Usage (Base64 stdin bypasses Playwright): node agents/skills/distill-page/scripts/distill-page.ts --base64-stdin [--json] < base64.txt

Example (Outputs Markdown): node agents/skills/distill-page/scripts/distill-page.ts https://www.debugbear.com/blog/content-visibility-api
Example (Outputs JSON): node agents/skills/distill-page/scripts/distill-page.ts --json https://www.debugbear.com/blog/content-visibility-api
      `);
      process.exit(1);
    }

    processPage(url)
      .then(decodedProto => {
        outputResult(decodedProto, toMarkdown);
      })
      .catch(err => {
        console.error('Error:', err.message);
        process.exit(1);
      });
  }
}
