import test from 'node:test';
import assert from 'node:assert';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import fs from 'node:fs';
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

  const snapshotPath = path.resolve(__dirname, 'fixtures/mock-page-distilled.md');
  fs.writeFileSync(snapshotPath, md, 'utf8');

  assert.ok(md.startsWith('Mock Page Title'), 'Should prepend title as standalone line');
  assert.ok(md.includes('**Table: Mock Table Caption**'), 'Should prepend table name/caption');
  assert.ok(md.includes('<aside>'), 'Should wrap aside content in <aside> tag');
  assert.ok(md.includes('<details><summary>Collapsed Content</summary>'), 'Should wrap hidden content in details element');

  // New assertions
  assert.ok(md.includes('* Item 1\n* Item 2\n  * Nested Item A\n  * Nested Item B'), 'Should format unordered list with nested items');
  assert.ok(md.includes('[Link Text](file:///relative-path)'), 'Should format link with resolved path');
  assert.ok(md.includes('[same-page fragment link](#section-10)'), 'Should convert same-page links to relative fragments');
  assert.ok(md.includes('nested `edits[]` array.'), 'Should preserve inline spacing inside paragraph and keep it inline');
  const expectedCodeBlock = [
    '```',
    '{',
    '  "path": "some/file.py",',
    '  "edits": [',
    '    {',
    '      "oldText": "text to replace",',
    '      "newText": "replacement text"',
    '    }',
    '  ]',
    '}',
    '```',
  ].join('\n');
  assert.ok(md.includes(expectedCodeBlock), 'Should format highlighted pre block as clean raw code block');
  assert.ok(md.includes('![With URL][image01]'), 'Should format first image as reference image01');
  assert.ok(md.includes('![image][image02]'), 'Should format second image as reference image02');
  assert.ok(md.includes('![image][image03]'), 'Should format third image as reference image03');
  assert.ok(
    md.includes("Hi, I'm Kilian. I make [Polypane](https://polypane.app/), the browser for responsive web development and design."),
    'Should not split styled paragraph into heading lines',
  );

  // Schema.org paywall integration check
  assert.ok(
    md.includes(
      '> [!IMPORTANT]\n> **Paid Content**: The following section is behind a paywall.\n\nPaid content paragraph that should be identified as paid content by annotations.',
    ),
    'Should format paid content with paywall warning block',
  );

  // Dynamic headings check
  assert.ok(md.includes('# Dynamic Size XL Heading'), 'XL heading size should map to H1');
  assert.ok(md.includes('## Dynamic Size L Heading'), 'L heading size should map to H2');
  assert.ok(md.includes('### Dynamic Size M Heading'), 'M heading size should map to H3');
  assert.ok(md.includes('#### Dynamic Size S Heading'), 'S heading size should map to H4');

  // Punctuation spacing check
  assert.ok(md.includes('Punctuation spacing test: Hello, world! This is a test.'), 'Should normalize whitespace before punctuation');

  // Dialog transparency check
  assert.ok(md.includes('Dialog transparency test: Before dialog'), 'Should extract text before dialog');
  assert.ok(md.includes('Inside modal dialog After dialog.'), 'Should extract text inside and after dialog');

  // Code spacing & formatting check
  assert.ok(md.includes('Code spacing test: `const a = 123;`'), 'Should remove spaces inside code backticks');
  assert.ok(md.includes('Bold code test: **`const b = 456;`**'), 'Should wrap bold code block correctly');

  // Table column padding check
  const expectedTable = [
    '| **Header A** | **Header B** | **Header C** |',
    '|---|---|---|',
    '| Value A1 | Value B1 |  |',
    '| Value A2 | Value B2 |  |',
  ].join('\n');
  assert.ok(md.includes(expectedTable), 'Should format aligned and padded table rows');

  assert.ok(md.includes('Variable spacing test: `sk_test_id` and `payment-intent`.'), 'Should prevent spaces around underscores and hyphens in code variables');
  assert.ok(md.includes('Sentence dot spacing test. **This should have a space before it.**'), 'Should keep space after sentence-ending period before bold block');
  assert.ok(md.includes('Dotted variable test: `payment.method.id`.'), 'Should format dotted variable without spaces around dots');

  // Merged code block tab layout check (Bug B & C)
  assert.ok(md.includes('app/layout.tsx TypeScript TypeScript'), 'Should extract text before fence as normal block');
  const expectedMergedCode = [
    '```',
    "import { Geist } from 'next/font/google'",
    'const geist = Geist({',
    "  subsets: ['latin'],",
    '})',
    '```',
  ].join('\n');
  assert.ok(md.includes(expectedMergedCode), 'Should parse and format split code block correctly');

  // Nested container code block check (Bug C)
  assert.ok(md.includes('```\nconst x = 1;\n```'), 'Should extract and join nested code block components');

  // Nav and footer filtering check
  assert.ok(!md.includes('About Us'), 'Should skip nav block content');
  assert.ok(!md.includes('Mock Company. All rights reserved.'), 'Should skip footer block content');
});
