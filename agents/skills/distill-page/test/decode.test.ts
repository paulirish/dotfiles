import test from 'node:test';
import assert from 'node:assert';
import {fromJson, toBinary} from '@bufbuild/protobuf';
import type {JsonValue} from '@bufbuild/protobuf';
import {AnnotatedPageContentSchema, ContentAttributeType} from '../scripts/proto/common_quality_data_pb.js';
import {decodeAnnotatedPageContent, convertToMarkdown} from '../scripts/distill-page.ts';

const {CONTENT_ATTRIBUTE_TEXT} = ContentAttributeType;

function getMarkdown(payload: JsonValue): string {
  const buffer = toBinary(AnnotatedPageContentSchema, fromJson(AnnotatedPageContentSchema, payload));
  const base64 = Buffer.from(buffer).toString('base64');
  const decoded = decodeAnnotatedPageContent(base64);
  return convertToMarkdown(decoded);
}

test('Decoding base64 string into AnnotatedPageContent object', () => {
  const payload: JsonValue = {
    version: 1,
    rootNode: {},
  };

  const buffer = toBinary(AnnotatedPageContentSchema, fromJson(AnnotatedPageContentSchema, payload));
  const base64 = Buffer.from(buffer).toString('base64');

  const decoded = decodeAnnotatedPageContent(base64);

  assert.strictEqual(decoded.version, 1);
  assert.ok(decoded.rootNode !== undefined);
});

test('convertToMarkdown skips nodes and children if isAdRelated is true', () => {
  const payload: JsonValue = {
    rootNode: {
      childrenNodes: [
        {
          contentAttributes: {
            attributeType: CONTENT_ATTRIBUTE_TEXT,
            textData: {textContent: 'Non-ad content.'},
          },
        },
        {
          contentAttributes: {
            attributeType: ContentAttributeType.CONTENT_ATTRIBUTE_CONTAINER,
            isAdRelated: true,
          },
          childrenNodes: [
            {
              contentAttributes: {
                attributeType: CONTENT_ATTRIBUTE_TEXT,
                textData: {textContent: 'Buy cheap things now!'},
              },
            },
          ],
        },
      ],
    },
  };
  const md = getMarkdown(payload);
  assert.strictEqual(md, 'Non-ad content.');
});
