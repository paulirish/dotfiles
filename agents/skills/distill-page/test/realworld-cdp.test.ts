import test from 'node:test';
import assert from 'node:assert';
import {processPage, convertToMarkdown} from '../scripts/distill-page.ts';

test.skip('Evaluate CDP markdown against real-world URLs', async () => {
  const urls = [
    'https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver',
    'https://web.dev/articles/lcp',
    'https://nextjs.org/docs/app/building-your-application/optimizing/fonts',
  ];

  await Promise.all(
    urls.map(async url => {
      console.log(`\nTesting ${url}...`);
      try {
        const decodedProto = await processPage(url);
        const markdown = convertToMarkdown(decodedProto);

        // Basic assertions
        assert.ok(markdown.length > 500, `Markdown should have substantial content (got ${markdown.length} bytes)`);

        // Check if code blocks or critical semantics survived
        // We injected \`\`\` into pre blocks and \` into code blocks
        const hasCode = markdown.includes('`');
        assert.ok(hasCode, 'Markdown should show evidence of code block extraction');

        console.log(`✅ Passed. Extracted ${markdown.length} bytes of markdown.`);
      } catch (e) {
        console.error(`❌ Failed on ${url}:`, e);
        assert.fail(String(e));
      }
    }),
  );
});
