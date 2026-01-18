import { test } from 'node:test';
import assert from 'node:assert';
import { fetchAsMarkdown } from './tools.ts';

test('fetchAsMarkdown works', { timeout: 30000 }, async (t) => {
  const url = 'https://example.com';
  
  console.log('Starting fetchAsMarkdown test...');
  const result = await fetchAsMarkdown({ url });
  
  console.log('Result content type:', typeof result.content[0].text);
  
  if (result.isError) {
      assert.fail(`Tool execution failed: ${result.content[0].text}`);
  }

  const markdown = result.content[0].text;
  assert.ok(markdown && markdown.length > 0, 'Markdown should not be empty');
  assert.ok(markdown.includes('Example Domain'), 'Markdown should contain page title');
  
  console.log('Markdown snippet:', markdown.substring(0, 100));
});
