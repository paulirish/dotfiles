import test from 'node:test';
import assert from 'node:assert';
import * as pb from '../scripts/proto/common_quality_data_pbjs.js';
import {decodeAnnotatedPageContent, convertToMarkdown} from '../scripts/distill-page.ts';

const {ContentAttributeType} = pb.optimization_guide.proto;
const {
  CONTENT_ATTRIBUTE_TEXT,
  CONTENT_ATTRIBUTE_IMAGE,
  CONTENT_ATTRIBUTE_UNORDERED_LIST,
  CONTENT_ATTRIBUTE_TABLE,
  CONTENT_ATTRIBUTE_TABLE_ROW,
  CONTENT_ATTRIBUTE_CONTAINER
} = ContentAttributeType;

test('convertToMarkdown handles lists correctly', () => {
  const payload = {
    rootNode: {
      childrenNodes: [
        {
          contentAttributes: {
            attributeType: CONTENT_ATTRIBUTE_UNORDERED_LIST,
          },
          childrenNodes: [
            {
              childrenNodes: [
                {
                  contentAttributes: {
                    attributeType: CONTENT_ATTRIBUTE_TEXT,
                    textData: {textContent: 'Item 1'},
                  },
                },
              ],
            },
            {
              childrenNodes: [
                {
                  contentAttributes: {
                    attributeType: CONTENT_ATTRIBUTE_TEXT,
                    textData: {textContent: 'Item 2'},
                  },
                },
              ],
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

  const expected = '* Item 1\n* Item 2';
  assert.strictEqual(md.trim(), expected);
});

test('convertToMarkdown handles tables correctly', () => {
  const payload = {
    rootNode: {
      childrenNodes: [
        {
          contentAttributes: {
            attributeType: CONTENT_ATTRIBUTE_TABLE,
          },
          childrenNodes: [
            {
              contentAttributes: {
                attributeType: CONTENT_ATTRIBUTE_TABLE_ROW,
              },
              childrenNodes: [
                {
                  childrenNodes: [
                    {
                      contentAttributes: {
                        attributeType: CONTENT_ATTRIBUTE_TEXT,
                        textData: {textContent: 'Header 1'},
                      },
                    },
                  ],
                },
                {
                  childrenNodes: [
                    {
                      contentAttributes: {
                        attributeType: CONTENT_ATTRIBUTE_TEXT,
                        textData: {textContent: 'Header 2'},
                      },
                    },
                  ],
                },
              ],
            },
            {
              contentAttributes: {
                attributeType: CONTENT_ATTRIBUTE_TABLE_ROW,
              },
              childrenNodes: [
                {
                  childrenNodes: [
                    {
                      contentAttributes: {
                        attributeType: CONTENT_ATTRIBUTE_TEXT,
                        textData: {textContent: 'Cell 1'},
                      },
                    },
                  ],
                },
                {
                  childrenNodes: [
                    {
                      contentAttributes: {
                        attributeType: CONTENT_ATTRIBUTE_TEXT,
                        textData: {textContent: 'Cell 2'},
                      },
                    },
                  ],
                },
              ],
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

  const expected = '| Header 1 | Header 2 |\n|---|---|\n| Cell 1 | Cell 2 |';
  assert.strictEqual(md.trim(), expected);
});

test('convertToMarkdown skips nav and footer roles', () => {
  const payload = {
    rootNode: {
      childrenNodes: [
        {
          contentAttributes: {
            attributeType: CONTENT_ATTRIBUTE_TEXT,
            textData: {textContent: 'Main Content'},
          },
        },
        {
          contentAttributes: {
            attributeType: CONTENT_ATTRIBUTE_CONTAINER,
            annotatedRoles: [pb.optimization_guide.proto.AnnotatedRole.ANNOTATED_ROLE_NAV],
          },
          childrenNodes: [
            {
              contentAttributes: {
                attributeType: CONTENT_ATTRIBUTE_TEXT,
                textData: {textContent: 'Nav Content'},
              },
            },
          ],
        },
        {
          contentAttributes: {
            attributeType: CONTENT_ATTRIBUTE_TEXT,
            textData: {textContent: 'More Main Content'},
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

  const expected = 'Main Content More Main Content';
  assert.strictEqual(md.trim(), expected);
});

test('convertToMarkdown handles images correctly', () => {
  const payload = {
    rootNode: {
      childrenNodes: [
        {
          contentAttributes: {
            attributeType: CONTENT_ATTRIBUTE_IMAGE,
            imageData: {
              imageCaption: 'Test Image',
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

  const expected = '![Test Image][image01]';
  assert.strictEqual(md.trim(), expected);
});
