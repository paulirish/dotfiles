import test from 'node:test';
import assert from 'node:assert';
import * as pb from '../scripts/proto/common_quality_data_pbjs.js';
import {decodeAnnotatedPageContent, convertToMarkdown} from '../scripts/distill-page.ts';

const {ContentAttributeType} = pb.optimization_guide.proto;
const {
  CONTENT_ATTRIBUTE_TEXT,
  CONTENT_ATTRIBUTE_IMAGE,
  CONTENT_ATTRIBUTE_DIALOG_MODAL,
  CONTENT_ATTRIBUTE_DIALOG_MODELESS,
} = ContentAttributeType;

test('Decoding base64 string into AnnotatedPageContent object', () => {
  const payload = {
    version: 1,
    rootNode: {},
  };



  const message = pb.optimization_guide.proto.AnnotatedPageContent.create(payload);
  const buffer = pb.optimization_guide.proto.AnnotatedPageContent.encode(message).finish();
  const base64 = Buffer.from(buffer).toString('base64');

  const decoded = decodeAnnotatedPageContent(base64);

  assert.strictEqual(decoded.version, 1); // Note default decoded might be string
  assert.ok(decoded.rootNode !== undefined);
});

test('convertToMarkdown adds newlines around headlines', () => {
  const payload = {
    rootNode: {
      childrenNodes: [
        {
          contentAttributes: {
            attributeType: CONTENT_ATTRIBUTE_TEXT,
            textData: {textContent: 'Before headline'},
          },
        },
        {
          contentAttributes: {
            attributeType: CONTENT_ATTRIBUTE_TEXT,
            textData: {
              textContent: 'Headline Text',
              textStyle: {
                textSize: pb.optimization_guide.proto.TextSize.TEXT_SIZE_XL,
              },
            },
          },
        },
        {
          contentAttributes: {
            attributeType: CONTENT_ATTRIBUTE_TEXT,
            textData: {textContent: 'After headline'},
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

  const expected = 'Before headline\n\n## Headline Text\n\nAfter headline';
  assert.strictEqual(md, expected);
});

test('convertToMarkdown renders image with URL', () => {
  const payload = {
    rootNode: {
      childrenNodes: [
        {
          contentAttributes: {
            attributeType: CONTENT_ATTRIBUTE_IMAGE,
            imageData: {
              imageCaption: 'Example Image',
              url: 'http://example.com/image.png'
            }
          }
        },
        {
          contentAttributes: {
            attributeType: CONTENT_ATTRIBUTE_IMAGE,
            imageData: {
              imageCaption: 'No URL Image'
            }
          }
        }
      ]
    }
  };

  const message = pb.optimization_guide.proto.AnnotatedPageContent.create(payload);
  const buffer = pb.optimization_guide.proto.AnnotatedPageContent.encode(message).finish();
  const base64 = Buffer.from(buffer).toString('base64');

  const decoded = decodeAnnotatedPageContent(base64);
  const md = convertToMarkdown(decoded);

  const expected = '![Example Image](http://example.com/image.png)\n\n![No URL Image][image01]';
  assert.strictEqual(md, expected);
});

test('convertToMarkdown renders dialog content', () => {
  const payload = {
    rootNode: {
      childrenNodes: [
        {
          contentAttributes: {
            attributeType: CONTENT_ATTRIBUTE_TEXT,
            textData: {textContent: 'Before dialog'}
          }
        },
        {
          contentAttributes: {
            attributeType: CONTENT_ATTRIBUTE_DIALOG_MODAL,
          },
          childrenNodes: [
            {
              contentAttributes: {
                attributeType: CONTENT_ATTRIBUTE_TEXT,
                textData: {textContent: 'Inside modal dialog'}
              }
            }
          ]
        },
        {
          contentAttributes: {
            attributeType: CONTENT_ATTRIBUTE_DIALOG_MODELESS,
          },
          childrenNodes: [
            {
              contentAttributes: {
                attributeType: CONTENT_ATTRIBUTE_TEXT,
                textData: {textContent: 'Inside modeless dialog'}
              }
            }
          ]
        },
        {
          contentAttributes: {
            attributeType: CONTENT_ATTRIBUTE_TEXT,
            textData: {textContent: 'After dialog'}
          }
        }
      ]
    }
  };

  const message = pb.optimization_guide.proto.AnnotatedPageContent.create(payload);
  const buffer = pb.optimization_guide.proto.AnnotatedPageContent.encode(message).finish();
  const base64 = Buffer.from(buffer).toString('base64');

  const decoded = decodeAnnotatedPageContent(base64);
  const md = convertToMarkdown(decoded);

  const expected = 'Before dialog Inside modal dialog Inside modeless dialog After dialog';
  assert.strictEqual(md, expected);
});
