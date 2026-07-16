import test from 'node:test';
import {chromium} from 'playwright';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {decodeAnnotatedPageContent, convertToMarkdown} from '../scripts/decode_annotations.ts';
import {injectSemanticMarkers} from '../scripts/distill-page.ts';
import TurndownService from 'turndown';
// @ts-expect-error - no types for turndown-plugin-gfm
import {gfm} from 'turndown-plugin-gfm';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('Run Turndown cases against CDP getAnnotatedPageContent', async () => {
  const browser = await chromium.launch({
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
  const turndownGfm = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced'
  });
  turndownGfm.use(gfm);

  const indexPage = await context.newPage();

  const indexPath = path.resolve(__dirname, '../turndown_tmp/test/index.html');
  await indexPage.goto('file://' + indexPath);

  const testCases = await indexPage.evaluate(() => {
    return Array.from(document.querySelectorAll('.case')).map(node => ({
      name: node.getAttribute('data-name'),
      inputHtml: node.querySelector('.input')?.innerHTML || '',
      expected: node.querySelector('.expected')?.textContent || '',
    }));
  });

  await indexPage.close();

  console.log(`Found ${testCases.length} test cases.`);

  // To avoid 200s runtime, we can just run the first 5 tests or specific ones
  // that we want to try supporting.
  const SKIPPED_TESTS: string[] = [];

  let passed = 0;
  let failed = 0;

  const page = await context.newPage();
  const client = await page.context().newCDPSession(page);
  await client.send('Page.enable');

  for (const tc of testCases) {
    if (SKIPPED_TESTS.includes(tc.name || '')) {
      console.log(`\n⏭️ Skipped: ${tc.name}`);
      continue;
    }
    // Navigate to a data URL with the input HTML
    const dataUrl = 'data:text/html;charset=utf-8,' + encodeURIComponent(`<!DOCTYPE html><html><body>${tc.inputHtml}</body></html>`);
    await page.goto(dataUrl, {waitUntil: 'load'});
    await page.bringToFront();

    await injectSemanticMarkers(page);

    // wait a small bit for CDP to digest
    await page.waitForTimeout(500);

    let actualMd = '';
    try {
      const {content} = await client.send('Page.getAnnotatedPageContent');
      const decoded = decodeAnnotatedPageContent(content);
      actualMd = convertToMarkdown(decoded) || '';
    } catch (e) {
      console.error(`Failed on ${tc.name}`, e);
    }

    const expectedGfm = turndownGfm.turndown(tc.inputHtml);
    if (actualMd.trim() === expectedGfm.trim()) {
      passed++;
    } else {
      console.log(`\n❌ Failed: ${tc.name}`);
      console.log(`EXPECTED (Turndown GFM):\n${expectedGfm}`);
      console.log(`ACTUAL (Page Distiller):\n${actualMd}`);
      failed++;
    }
  }

  await browser.close();
  console.log(`\nResults: ${passed} passed, ${failed} failed`);
});
