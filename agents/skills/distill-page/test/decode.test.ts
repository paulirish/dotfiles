import test from 'node:test';
import assert from 'node:assert';
import { fromJson, toBinary } from '@bufbuild/protobuf';
import {
  AnnotatedPageContentSchema,
  AnnotatedRole,
  ContentAttributeType,
  TextSize,
  TableRowType
} from '../scripts/proto/common_quality_data_pb.js';
import {decodeAnnotatedPageContent, convertToMarkdown} from '../scripts/distill-page.ts';

const {
  CONTENT_ATTRIBUTE_TEXT,
  CONTENT_ATTRIBUTE_IMAGE,
  CONTENT_ATTRIBUTE_DIALOG_MODAL,
  CONTENT_ATTRIBUTE_DIALOG_MODELESS,
} = ContentAttributeType;

function getMarkdown(payload: any): string {
  const buffer = toBinary(AnnotatedPageContentSchema, fromJson(AnnotatedPageContentSchema, payload as any));
  const base64 = Buffer.from(buffer).toString('base64');
  const decoded = decodeAnnotatedPageContent(base64);
  return convertToMarkdown(decoded);
}

test('Decoding base64 string into AnnotatedPageContent object', () => {
  const payload = {
    version: 1,
    rootNode: {},
  };



  const buffer = toBinary(AnnotatedPageContentSchema, fromJson(AnnotatedPageContentSchema, payload as any));
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
                textSize: TextSize.XL,
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

  const buffer = toBinary(AnnotatedPageContentSchema, fromJson(AnnotatedPageContentSchema, payload as any));
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

  const buffer = toBinary(AnnotatedPageContentSchema, fromJson(AnnotatedPageContentSchema, payload as any));
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

  const buffer = toBinary(AnnotatedPageContentSchema, fromJson(AnnotatedPageContentSchema, payload as any));
  const base64 = Buffer.from(buffer).toString('base64');

  const decoded = decodeAnnotatedPageContent(base64);
  const md = convertToMarkdown(decoded);

  const expected = 'Before dialog Inside modal dialog Inside modeless dialog After dialog';
  assert.strictEqual(md, expected);
});

test('convertToMarkdown prepends title if mainFrameData.title is present', () => {
  const payload = {
    mainFrameData: {
      title: 'My Document Title',
      url: 'https://example.com',
    },
    rootNode: {
      childrenNodes: [
        {
          contentAttributes: {
            attributeType: CONTENT_ATTRIBUTE_TEXT,
            textData: {textContent: 'Some text content.'},
          },
        },
      ],
    },
  };
  const md = getMarkdown(payload);
  assert.strictEqual(md, '# My Document Title\n\nSome text content.');
});

test('convertToMarkdown prepends table name before rows if tableData.tableName is present', () => {
  const payload = {
    rootNode: {
      childrenNodes: [
        {
          contentAttributes: {
            attributeType: ContentAttributeType.CONTENT_ATTRIBUTE_TABLE,
            tableData: {
              tableName: 'My Cool Table',
            },
          },
          childrenNodes: [
            {
              contentAttributes: {
                attributeType: ContentAttributeType.CONTENT_ATTRIBUTE_TABLE_ROW,
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
              ],
            },
          ],
        },
      ],
    },
  };
  const md = getMarkdown(payload);
  assert.match(md, /\*\*Table: My Cool Table\*\*\n\n\| Cell 1 \|/);
});

test('convertToMarkdown skips nodes and children if isAdRelated is true', () => {
  const payload = {
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

test('convertToMarkdown prepends a warning before paid content', () => {
  const payload = {
    rootNode: {
      childrenNodes: [
        {
          contentAttributes: {
            attributeType: ContentAttributeType.CONTENT_ATTRIBUTE_CONTAINER,
            annotatedRoles: [AnnotatedRole.PAID_CONTENT],
          },
          childrenNodes: [
            {
              contentAttributes: {
                attributeType: CONTENT_ATTRIBUTE_TEXT,
                textData: {textContent: 'This is the premium paragraph.'},
              },
            },
          ],
        },
      ],
    },
  };
  const md = getMarkdown(payload);
  assert.strictEqual(md, '> [!IMPORTANT]\n> **Paid Content**: The following section is behind a paywall.\n\nThis is the premium paragraph.');
});

test('convertToMarkdown wraps ANNOTATED_ROLE_CONTENT_HIDDEN in details element', () => {
  const payload = {
    rootNode: {
      childrenNodes: [
        {
          contentAttributes: {
            attributeType: ContentAttributeType.CONTENT_ATTRIBUTE_CONTAINER,
            annotatedRoles: [AnnotatedRole.CONTENT_HIDDEN],
          },
          childrenNodes: [
            {
              contentAttributes: {
                attributeType: CONTENT_ATTRIBUTE_TEXT,
                textData: {textContent: 'Hidden content inside details.'},
              },
            },
          ],
        },
      ],
    },
  };
  const md = getMarkdown(payload);
  assert.strictEqual(md, '<details><summary>Collapsed Content</summary>\n\nHidden content inside details.\n</details>');
});

test('convertToMarkdown wraps ANNOTATED_ROLE_ASIDE in aside element', () => {
  const payload = {
    rootNode: {
      childrenNodes: [
        {
          contentAttributes: {
            attributeType: ContentAttributeType.CONTENT_ATTRIBUTE_CONTAINER,
            annotatedRoles: [AnnotatedRole.ASIDE],
          },
          childrenNodes: [
            {
              contentAttributes: {
                attributeType: CONTENT_ATTRIBUTE_TEXT,
                textData: {textContent: 'Some aside content.'},
              },
            },
          ],
        },
      ],
    },
  };
  const md = getMarkdown(payload);
  assert.strictEqual(md, '<aside>\n\nSome aside content.\n</aside>');
});

test('convertToMarkdown maps TextSize values dynamically to heading levels', () => {
  const checkHeading = (size: number, expectedPrefix: string) => {
    const payload = {
      rootNode: {
        childrenNodes: [
          {
            contentAttributes: {
              attributeType: ContentAttributeType.CONTENT_ATTRIBUTE_HEADING,
            },
            childrenNodes: [
              {
                contentAttributes: {
                  attributeType: CONTENT_ATTRIBUTE_TEXT,
                  textData: {
                    textContent: 'Heading Text',
                    textStyle: { textSize: size },
                  },
                },
              },
            ],
          },
        ],
      },
    };
    const md = getMarkdown(payload);
    assert.strictEqual(md, `${expectedPrefix} Heading Text`);
  };

  checkHeading(TextSize.XL, '##');
  checkHeading(TextSize.L, '###');
  checkHeading(TextSize.M_DEFAULT, '####');
  checkHeading(TextSize.S, '#####');
  checkHeading(TextSize.XS, '#####');
});

// TODO: Try to set up a real ad integration test using a live page like https://privacy-sandbox-demos-news.dev/pa-multiple-ad

