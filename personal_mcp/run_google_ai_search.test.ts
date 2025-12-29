import { test } from 'node:test';
import assert from 'node:assert';
import { runGoogleAiSearch } from './tools.ts'; // ts-node allows .ts extension
import * as fs from 'node:fs/promises';

test('run_google_ai_search works', { timeout: 60000 }, async (t) => {
  // Use a query that likely triggers AI overview or at least some complex result.
  // "how to center a div" is a classic.
  const query = 'how to center a div';
  
  console.log('Starting Google AI search test...');
  const result = await runGoogleAiSearch({ query });
  
  console.log('Result:', result);

  if (result.isError) {
      // If it fails, we fail the test, but maybe we should log why.
      // It might fail if Google detects bot.
      assert.fail(`Tool execution failed: ${result.content[0].text}`);
  }

  assert.ok(result.content[0].text.includes('Saved AI response'));
  
  // Check if file exists and cleanup
  const match = result.content[0].text.match(/Saved AI response to (.*?) \(source:/);
  if (match) {
      const fullPath = match[1];
      try {
          const stat = await fs.stat(fullPath);
          assert.ok(stat.isFile(), 'Output file should exist');
          console.log(`Verified file ${fullPath} exists.`);
          
          // Clean up
          await fs.unlink(fullPath);
          console.log(`Cleaned up ${fullPath}.`);
      } catch (e) {
          assert.fail(`File check failed: ${e.message}`);
      }
  } else {
      assert.fail('Could not parse filename from result message');
  }
});
