import test from 'node:test';
import assert from 'node:assert';
import {chromium} from 'playwright';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {decodeAnnotatedPageContent, convertToMarkdown} from '../scripts/decode_annotations.ts';
import {injectSemanticMarkers} from '../scripts/distill-page.ts';
import TurndownService from 'turndown';
// @ts-expect-error - no types for turndown-plugin-gfm
import {gfm} from 'turndown-plugin-gfm';

const EXPECTED_PASSING_TESTS = [
  'p',
  'multiple ps',
  'strong',
  'b',
  'code',
  'code containing markdown syntax',
  'code containing markdown syntax in a span',
  'h1',
  'not escaping = outside of a heading',
  'h1 as atx',
  'h2',
  'h2 as atx',
  'invalid heading',
  'a with a child',
  'pre/code block',
  'multiple pre/code blocks',
  'fenced pre/code block',
  'pre/code block fenced with ~',
  'not escaping ~~~',
  'comment',
  'pre/code with comment',
  'whitespace between inline elements',
  'blank inline elements',
  'blank inline element with br',
  'not escaping # outside of a heading',
  'not escaping within code',
  'not escaping . outside of an ol',
  'not escaping - outside of a ul',
  'not escaping + outside of a ul',
  'not escaping > outside of a blockquote',
  'non-markdown inline elements',
  'text separated by a space in an element',
  'triple tildes inside code',
  'preformatted code with leading whitespace',
  'preformatted code with trailing whitespace',
  'preformatted code loosely surrounded'
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('Run Turndown cases against CDP getAnnotatedPageContent', async (t) => {
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

  const runAll = process.env.RUN_ALL_TURNDOWN_TESTS === '1';

  const page = await context.newPage();
  const client = await page.context().newCDPSession(page);
  await client.send('Page.enable');

  for (const tc of testCases) {
    const isPassing = EXPECTED_PASSING_TESTS.includes(tc.name || '');
    if (!runAll && !isPassing) {
      continue;
    }

    await t.test(tc.name || 'unnamed case', async () => {
      // Navigate to a data URL with the input HTML
      const dataUrl = 'data:text/html;charset=utf-8,' + encodeURIComponent(`<!DOCTYPE html><html><body>${tc.inputHtml}</body></html>`);
      await page.goto(dataUrl, {waitUntil: 'load'});
      await page.bringToFront();

      await injectSemanticMarkers(page);

      let actualMd = '';
      try {
        const {content} = await client.send('Page.getAnnotatedPageContent');
        const decoded = decodeAnnotatedPageContent(content);
        actualMd = convertToMarkdown(decoded) || '';
      } catch (e) {
        console.error(`Failed on ${tc.name}`, e);
      }

      const expectedGfm = turndownGfm.turndown(tc.inputHtml);
      assert.strictEqual(actualMd.trim(), expectedGfm.trim(), `Output mismatch for case "${tc.name}"`);
    });
  }

  await browser.close();
});
