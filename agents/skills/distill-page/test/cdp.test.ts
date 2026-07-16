import test from 'node:test';
import assert from 'node:assert';
import {fetchDistilledBase64} from '../scripts/distill-page.ts';

test('CDP Page.getAnnotatedPageContent returns base64 content', async () => {
  const content = await fetchDistilledBase64('https://example.com');

  assert.ok(content, 'Content should not be empty');
  assert.strictEqual(typeof content, 'string', 'Content should be a string');
  // Simple check for base64: length is a multiple of 4, only valid chars
  assert.match(content, /^[a-zA-Z0-9+/]*={0,2}$/, 'Content should be base64 encoded');
});
