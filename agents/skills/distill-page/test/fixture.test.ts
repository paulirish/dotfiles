import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { convertToMarkdown } from '../scripts/distill-page.ts';
import * as pb from '../scripts/proto/common_quality_data_pbjs.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('convertToMarkdown with large fixture payload', () => {
  const fixturePath = path.join(__dirname, 'fixtures', 'annotatedpagecontent_payload.json');
  const fixtureData = fs.readFileSync(fixturePath, 'utf8');
  const payload = JSON.parse(fixtureData);

  // Convert JSON payload to Protobuf message to resolve string enums to numbers
  const message = pb.optimization_guide.proto.AnnotatedPageContent.fromObject(payload);
  
  // Convert back to object with options matching decodeAnnotatedPageContent
  const normalizedPayload = pb.optimization_guide.proto.AnnotatedPageContent.toObject(message, {
    longs: String,
    defaults: true,
    arrays: true,
    objects: true,
  });

  const md = convertToMarkdown(normalizedPayload as any);

  assert.ok(md, 'Markdown output should not be empty');
  assert.strictEqual(typeof md, 'string');
  assert.ok(md.length > 0);
  console.log(`Generated markdown length: ${md.length}`);
  
  // Basic sanity checks on the output
  assert.ok(md.includes('#') || md.includes('**') || md.includes('['), 'Markdown should contain some formatting elements');
});
