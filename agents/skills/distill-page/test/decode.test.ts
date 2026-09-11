import test from 'node:test';
import assert from 'node:assert';
import {fromJson, toBinary} from '@bufbuild/protobuf';
import type {JsonValue} from '@bufbuild/protobuf';
import {AnnotatedPageContentSchema, ContentAttributeType} from '../scripts/proto/common_quality_data_pb.js';
import {decodeAnnotatedPageContent, convertToMarkdown} from '../scripts/distill-page.ts';
import {INLINE_CODE_CLOSE_MARKER, INLINE_CODE_OPEN_MARKER} from '../scripts/semantic_markers.ts';

const {CONTENT_ATTRIBUTE_TEXT, CONTENT_ATTRIBUTE_IMAGE, CONTENT_ATTRIBUTE_IFRAME, CONTENT_ATTRIBUTE_PARAGRAPH} = ContentAttributeType;

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

test('convertToMarkdown replaces a failed CodePen iframe with a link', () => {
  const payload: JsonValue = {
    rootNode: {
      childrenNodes: [
        {
          contentAttributes: {
            attributeType: CONTENT_ATTRIBUTE_IFRAME,
            iframeData: {
              frameData: {
                url: 'https://codepen.io/example/embed/preview/bJOrK?editable=true',
                title: 'codepen.io',
              },
            },
          },
          childrenNodes: [
            {
              contentAttributes: {
                attributeType: CONTENT_ATTRIBUTE_IMAGE,
                imageData: {},
              },
            },
            {
              contentAttributes: {
                attributeType: CONTENT_ATTRIBUTE_TEXT,
                textData: {textContent: 'codepen.io'},
              },
            },
            {
              contentAttributes: {
                attributeType: CONTENT_ATTRIBUTE_TEXT,
                textData: {textContent: ' refused to connect.'},
              },
            },
          ],
        },
      ],
    },
  };

  assert.strictEqual(
    getMarkdown(payload),
    '[Link to codepen.io embed](https://codepen.io/example/embed/preview/bJOrK?editable=true)',
  );
});

test('convertToMarkdown keeps inline code inside a continuous emphasis span', () => {
  const textNode = (textContent: string): JsonValue => ({
    contentAttributes: {
      attributeType: CONTENT_ATTRIBUTE_TEXT,
      textData: {
        textContent,
        textStyle: {hasEmphasis: true},
      },
    },
  });
  const payload: JsonValue = {
    rootNode: {
      childrenNodes: [
        {
          contentAttributes: {attributeType: CONTENT_ATTRIBUTE_PARAGRAPH},
          childrenNodes: [
            textNode('The minimum width of grid and flex children is '),
            textNode(INLINE_CODE_OPEN_MARKER),
            textNode('auto'),
            textNode(INLINE_CODE_CLOSE_MARKER),
            textNode('. Setting it explicitly to '),
            textNode(INLINE_CODE_OPEN_MARKER),
            textNode('0'),
            textNode(INLINE_CODE_CLOSE_MARKER),
            textNode(' removes the intrinsic size, unlocking various things.'),
          ],
        },
      ],
    },
  };

  assert.strictEqual(
    getMarkdown(payload),
    '**The minimum width of grid and flex children is `auto`. Setting it explicitly to `0` removes the intrinsic size, unlocking various things.**',
  );
});
