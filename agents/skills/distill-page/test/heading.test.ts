import test from 'node:test';
import assert from 'node:assert';
import * as pb from '../scripts/proto/common_quality_data_pbjs.js';
import {decodeAnnotatedPageContent, convertToMarkdown} from '../scripts/distill-page.ts';

const {ContentAttributeType} = pb.optimization_guide.proto;
const {
  CONTENT_ATTRIBUTE_TEXT,
  CONTENT_ATTRIBUTE_ANCHOR,
  CONTENT_ATTRIBUTE_HEADING
} = ContentAttributeType;

test('convertToMarkdown handles HEADING containers correctly', () => {
  const payload = {
    rootNode: {
      childrenNodes: [
        {
          contentAttributes: {
            attributeType: CONTENT_ATTRIBUTE_HEADING,
          },
          childrenNodes: [
            {
              contentAttributes: {
                attributeType: CONTENT_ATTRIBUTE_TEXT,
                textData: {
                  textContent: 'Is ',
                  textStyle: {textSize: pb.optimization_guide.proto.TextSize.TEXT_SIZE_L},
                },
              },
            },
            {
              contentAttributes: {
                attributeType: CONTENT_ATTRIBUTE_TEXT,
                textData: {textContent: 'GetTokens', textStyle: {hasEmphasis: true}},
              },
            },
            {
              contentAttributes: {
                attributeType: CONTENT_ATTRIBUTE_TEXT,
                textData: {textContent: ' billed?'},
              },
            },
          ],
        },
      ],
    },
  };

  const message = pb.optimization_guide.proto.AnnotatedPageContent.create(payload);
  const buffer = pb.optimization_guide.proto.AnnotatedPageContent.encode(message).finish();
  const base64 = Buffer.from(buffer).toString('base64');

  const decoded = decodeAnnotatedPageContent(base64);
  const md = convertToMarkdown(decoded);

  // We expect a single header with level ### because of TEXT_SIZE_L on one child.
  // And newlines on either side.
  const expected = '### Is **GetTokens** billed?';
  // Using trim() to make it easier to compare without worrying about exact outer newlines for now,
  // but we should ideally check them. Let's check trim() first.
  assert.strictEqual(md.trim(), expected);
});

test('convertToMarkdown cleans up spaces before punctuation', () => {
  const payload = {
    rootNode: {
      childrenNodes: [
        {
          contentAttributes: {
            attributeType: CONTENT_ATTRIBUTE_TEXT,
            textData: {textContent: 'Text followed by space'},
          },
        },
        {
          contentAttributes: {
            attributeType: CONTENT_ATTRIBUTE_TEXT,
            textData: {textContent: '.'},
          },
        },
      ],
    },
  };

  const message = pb.optimization_guide.proto.AnnotatedPageContent.create(payload);
  const buffer = pb.optimization_guide.proto.AnnotatedPageContent.encode(message).finish();
  const base64 = Buffer.from(buffer).toString('base64');

  const decoded = decodeAnnotatedPageContent(base64);
  const md = convertToMarkdown(decoded);

  const expected = 'Text followed by space.';
  assert.strictEqual(md.trim(), expected);
});

test('convertToMarkdown converts same-page links to fragments', () => {
  const payload = {
    mainFrameData: {
      url: 'https://example.com/page',
    },
    rootNode: {
      childrenNodes: [
        {
          contentAttributes: {
            attributeType: CONTENT_ATTRIBUTE_ANCHOR,
            anchorData: {
              url: 'https://example.com/page#section',
            },
          },
          childrenNodes: [
            {
              contentAttributes: {
                attributeType: CONTENT_ATTRIBUTE_TEXT,
                textData: {textContent: 'Link Text'},
              },
            },
          ],
        },
      ],
    },
  };

  const message = pb.optimization_guide.proto.AnnotatedPageContent.create(payload);
  const buffer = pb.optimization_guide.proto.AnnotatedPageContent.encode(message).finish();
  const base64 = Buffer.from(buffer).toString('base64');

  const decoded = decodeAnnotatedPageContent(base64);
  const md = convertToMarkdown(decoded);

  const expected = '[Link Text](#section)';
  assert.strictEqual(md.trim(), expected);
});

test('convertToMarkdown removes spaces inside backticks', () => {
  const payload = {
    rootNode: {
      childrenNodes: [
        {
          contentAttributes: {
            attributeType: CONTENT_ATTRIBUTE_TEXT,
            textData: {textContent: '`'},
          },
        },
        {
          contentAttributes: {
            attributeType: CONTENT_ATTRIBUTE_TEXT,
            textData: {textContent: 'code-block'},
          },
        },
        {
          contentAttributes: {
            attributeType: CONTENT_ATTRIBUTE_TEXT,
            textData: {textContent: '`'},
          },
        },
      ],
    },
  };

  const message = pb.optimization_guide.proto.AnnotatedPageContent.create(payload);
  const buffer = pb.optimization_guide.proto.AnnotatedPageContent.encode(message).finish();
  const base64 = Buffer.from(buffer).toString('base64');

  const decoded = decodeAnnotatedPageContent(base64);
  const md = convertToMarkdown(decoded);

  const expected = '`code-block`';
  assert.strictEqual(md.trim(), expected);
});

test('convertToMarkdown handles bold backticks correctly', () => {
  const payload = {
    rootNode: {
      childrenNodes: [
        {
          contentAttributes: {
            attributeType: CONTENT_ATTRIBUTE_TEXT,
            textData: {
              textContent: '`',
              textStyle: {hasEmphasis: true},
            },
          },
        },
        {
          contentAttributes: {
            attributeType: CONTENT_ATTRIBUTE_TEXT,
            textData: {
              textContent: 'box-sizing',
              textStyle: {hasEmphasis: true},
            },
          },
        },
        {
          contentAttributes: {
            attributeType: CONTENT_ATTRIBUTE_TEXT,
            textData: {
              textContent: '`',
              textStyle: {hasEmphasis: true},
            },
          },
        },
      ],
    },
  };

  const message = pb.optimization_guide.proto.AnnotatedPageContent.create(payload);
  const buffer = pb.optimization_guide.proto.AnnotatedPageContent.encode(message).finish();
  const base64 = Buffer.from(buffer).toString('base64');

  const decoded = decodeAnnotatedPageContent(base64);
  const md = convertToMarkdown(decoded);

  const expected = '`**box-sizing**`';
  assert.strictEqual(md.trim(), expected);
});
