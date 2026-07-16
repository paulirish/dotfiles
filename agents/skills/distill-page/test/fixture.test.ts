import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { convertToMarkdown } from '../scripts/distill-page.ts';
import { fromJson } from '@bufbuild/protobuf';
import { AnnotatedPageContentSchema } from '../scripts/proto/common_quality_data_pb.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('convertToMarkdown with large fixture payload', () => {
  const fixturePath = path.join(__dirname, 'fixtures', 'annotatedpagecontent_payload.json');
  const fixtureData = fs.readFileSync(fixturePath, 'utf8');
  const payload = JSON.parse(fixtureData);

  const message = fromJson(AnnotatedPageContentSchema, payload);

  const md = convertToMarkdown(message);

  assert.ok(md, 'Markdown output should not be empty');
  assert.strictEqual(typeof md, 'string');
  assert.ok(md.length > 0);
  console.log(`Generated markdown length: ${md.length}`);
  
  // Basic sanity checks on the output
  assert.ok(md.includes('#') || md.includes('**') || md.includes('['), 'Markdown should contain some formatting elements');
});
