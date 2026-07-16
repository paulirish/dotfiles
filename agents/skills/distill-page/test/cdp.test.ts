import test from 'node:test';
import assert from 'node:assert';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {fetchDistilledBase64, decodeAnnotatedPageContent, convertToMarkdown} from '../scripts/distill-page.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('CDP Page.getAnnotatedPageContent on mock-page.html', async () => {
  const mockPagePath = path.resolve(__dirname, 'fixtures/mock-page.html');
  const mockPageUrl = `file://${mockPagePath}`;
  
  const content = await fetchDistilledBase64(mockPageUrl);
  assert.ok(content, 'Content should not be empty');

  const decoded = decodeAnnotatedPageContent(content);
  const md = convertToMarkdown(decoded);

  assert.ok(md.includes('# Mock Page Title'), 'Should prepend title');
  assert.ok(md.includes('**Table: Mock Table Caption**'), 'Should prepend table name/caption');
  assert.ok(md.includes('<aside>'), 'Should wrap aside content in <aside> tag');
  assert.ok(md.includes('<details><summary>Collapsed Content</summary>'), 'Should wrap hidden content in details element');
});

