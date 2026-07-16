import { fromBinary } from "@bufbuild/protobuf";
import {
  AnnotatedPageContentSchema,
  AnnotatedRole,
  ContentAttributeType,
  TextSize,
  TableRowType
} from './proto/common_quality_data_pb.js';
import type { ContentNode, AnnotatedPageContent, ContentAttributes } from './proto/common_quality_data_pb.js';

function normalizeWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

const {
  CONTENT_ATTRIBUTE_TEXT,
  CONTENT_ATTRIBUTE_IMAGE,
  CONTENT_ATTRIBUTE_ANCHOR,
  CONTENT_ATTRIBUTE_ORDERED_LIST,
  CONTENT_ATTRIBUTE_UNORDERED_LIST,
  CONTENT_ATTRIBUTE_TABLE,
  CONTENT_ATTRIBUTE_TABLE_ROW,
  CONTENT_ATTRIBUTE_HEADING,
  CONTENT_ATTRIBUTE_CONTAINER
} = ContentAttributeType;

type AnyNode = ContentNode;
type IAnnotatedPageContent = AnnotatedPageContent;

const HEADING_PREFIXES: Record<number, string> = {
  [TextSize.XL]: '## ',
  [TextSize.L]: '### ',
  [TextSize.M_DEFAULT]: '#### ',
  [TextSize.S]: '##### ',
  [TextSize.XS]: '##### ',
};

export function decodeAnnotatedPageContent(base64String: string): IAnnotatedPageContent {
  const buffer = Buffer.from(base64String, 'base64');
  return fromBinary(AnnotatedPageContentSchema, buffer);
}

function findNodeByRoles(node: AnyNode, roles: AnnotatedRole[]): AnyNode | null {
  const attrs = node.contentAttributes;
  if (attrs?.annotatedRoles) {
    for (const r of roles) {
      if (attrs.annotatedRoles.includes(r)) {
        return node;
      }
    }
  }

  if (node.childrenNodes) {
    for (const child of node.childrenNodes) {
      const found = findNodeByRoles(child, roles);
      if (found) return found;
    }
  }
  return null;
}

function recursiveToMarkdownInternal(node: AnyNode, state: {imageIndex: number, insideHeading?: boolean, currentUrl?: string | null}): string {
  let md = '';
  const attrs = node.contentAttributes;

  if (!attrs) {
    if (node.childrenNodes) {
      for (const child of node.childrenNodes) {
        md += recursiveToMarkdown(child, state);
      }
    }
    return md;
  }

  if (attrs.isAdRelated) {
    return '';
  }

  if (attrs.contentData.case === "textData") {
    const textData = attrs.contentData.value;
    let text = textData.textContent || '';
    const isCodeFence = text.includes('```');
    text = text.trim();
    if (text) {
      if (textData.textStyle?.hasEmphasis && text !== '`') {
        text = `**${text}**`;
      }
      if (textData.textStyle?.textSize) {
        const size = textData.textStyle.textSize;
        if (size === TextSize.XL || size === TextSize.L) {
          if (!state.insideHeading) {
            const prefix = size === TextSize.XL ? '##' : '###';
            text = `\n\n${prefix} ${text}\n\n`;
          }
        }
      }
      if (isCodeFence) {
        text = `\n${text}\n`;
      }
      md += text;
      if (!text.endsWith('\n')) {
        md += ' ';
      }
    }
  } else if (attrs.contentData.case === "imageData") {
    const imageData = attrs.contentData.value;
    const caption = imageData.imageCaption || 'image';
    if (imageData.url) {
      md += `\n![${caption}](${imageData.url})\n`;
    } else {
      const ref = `image${String(state.imageIndex++).padStart(2, '0')}`;
      md += `\n![${caption}][${ref}]\n`;
    }
  } else if (attrs.contentData.case === "anchorData") {
    const anchorData = attrs.contentData.value;
    const url = anchorData.url || '';
    let resolvedUrl = url;
    if (state.currentUrl && url.startsWith(state.currentUrl + '#')) {
      resolvedUrl = url.substring(state.currentUrl.length);
    }
    let childText = '';
    if (node.childrenNodes) {
      for (const child of node.childrenNodes) {
        childText += recursiveToMarkdown(child, state);
      }
    }
    childText = childText.trim();
    if (childText && resolvedUrl) {
      md += `[${childText}](${resolvedUrl}) `; // we've processed children manually
    }
    return md;
  } else if (
    attrs.attributeType === CONTENT_ATTRIBUTE_ORDERED_LIST ||
    attrs.attributeType === CONTENT_ATTRIBUTE_UNORDERED_LIST
  ) {
    let listMd = '\n\n';
    const isOrdered = attrs.attributeType === CONTENT_ATTRIBUTE_ORDERED_LIST;
    let index = 1;

    if (node.childrenNodes) {
      for (const item of node.childrenNodes) {
        // Even if it isn't strictly CONTENT_ATTRIBUTE_LIST_ITEM, process it as a list child
        let itemText = '';
        if (item.childrenNodes) {
          for (const content of item.childrenNodes) {
            itemText += recursiveToMarkdown(content, state);
          }
        }
        itemText = normalizeWhitespace(itemText);
        if (itemText) {
          const prefix = isOrdered ? `${index}. ` : '* ';
          listMd += `${prefix}${itemText}\n`;
          index++;
        }
      }
    }
    return listMd + '\n';
  } else if (attrs.attributeType === CONTENT_ATTRIBUTE_TABLE) {
    let tableMd = '\n\n';
    const tableData = attrs.contentData.case === "tableData" ? attrs.contentData.value : undefined;
    if (tableData?.tableName) {
      tableMd += `**Table: ${tableData.tableName}**\n\n`;
    }
    let isFirstRow = true;
    if (node.childrenNodes) {
      for (const row of node.childrenNodes) {
        const rowAttrs = row.contentAttributes;
        if (!rowAttrs || rowAttrs.attributeType !== CONTENT_ATTRIBUTE_TABLE_ROW) continue;

        let rowText = '|';
        let sepText = '|';
        if (row.childrenNodes) {
          for (const cell of row.childrenNodes) {
            let cellText = '';
            if (cell.childrenNodes) {
              for (const content of cell.childrenNodes) {
                cellText += recursiveToMarkdown(content, state);
              }
            }
            cellText = normalizeWhitespace(cellText);
            rowText += ` ${cellText} |`;
            sepText += `---|`;
          }
        }
        tableMd += rowText + '\n';
        const rowType = rowAttrs.contentData.case === "tableRowData" ? rowAttrs.contentData.value.type : undefined;
        if (isFirstRow || rowType === TableRowType.HEADER) {
          if (isFirstRow) {
            tableMd += sepText + '\n';
          }
        }
        isFirstRow = false;
      }
    }
    return tableMd + '\n';
  } else if (attrs.attributeType === CONTENT_ATTRIBUTE_HEADING) {
    let maxTextSize = TextSize.M_DEFAULT;
    if (node.childrenNodes) {
      for (const child of node.childrenNodes) {
        const childAttrs = child.contentAttributes;
        if (childAttrs?.contentData.case === "textData" && childAttrs.contentData.value.textStyle?.textSize) {
          const size = childAttrs.contentData.value.textStyle.textSize;
          if (size > maxTextSize) {
            maxTextSize = size;
          }
        }
      }
    }

    let headingText = '';
    if (node.childrenNodes) {
      const oldInsideHeading = state.insideHeading;
      state.insideHeading = true;
      for (const child of node.childrenNodes) {
        headingText += recursiveToMarkdown(child, state);
      }
      state.insideHeading = oldInsideHeading;
    }
    headingText = normalizeWhitespace(headingText);
    if (headingText) {
      const prefix = HEADING_PREFIXES[maxTextSize] || '## ';
      return `\n\n${prefix}${headingText}\n\n`;
    }
    return '';

  }

  // Policy decision: We skip rendering navigation (NAV) and footer (FOOTER) elements
  // because they contain boilerplate links. However, we keep search elements (ANNOTATED_ROLE_SEARCH)
  // because search input fields or search-related context might be useful for understanding page utility.
  if (
    attrs.annotatedRoles &&
    (attrs.annotatedRoles.includes(AnnotatedRole.NAV) || attrs.annotatedRoles.includes(AnnotatedRole.FOOTER))
  ) {
    return ''; // Skip rendering kids of nav/footer
  }

  if (node.childrenNodes) {
    for (const child of node.childrenNodes) {
      md += recursiveToMarkdown(child, state);
    }
  }

  if (attrs.attributeType === CONTENT_ATTRIBUTE_CONTAINER) {
    md += '\n\n';
  }

  return md;
}

function recursiveToMarkdown(node: AnyNode, state: {imageIndex: number, insideHeading?: boolean, currentUrl?: string | null}): string {
  let md = recursiveToMarkdownInternal(node, state);

  const attrs = node.contentAttributes;
  const roles = attrs?.annotatedRoles;

  if (roles && roles.length > 0) {
    const hasPaid = roles.includes(AnnotatedRole.PAID_CONTENT);
    const hasHidden = roles.includes(AnnotatedRole.CONTENT_HIDDEN);
    const hasAside = roles.includes(AnnotatedRole.ASIDE);

    if (hasPaid || hasHidden || hasAside) {
      let trimmed = md.trim();
      if (trimmed) {
        if (hasPaid) {
          trimmed = `> [!IMPORTANT]\n> **Paid Content**: The following section is behind a paywall.\n\n${trimmed}`;
        }
        if (hasHidden) {
          trimmed = `<details><summary>Collapsed Content</summary>\n\n${trimmed}\n</details>`;
        }
        if (hasAside) {
          trimmed = `<aside>\n\n${trimmed}\n</aside>`;
        }
        md = trimmed;
      }
    }
  }

  return md;
}

export function convertToMarkdown(decodedProto: IAnnotatedPageContent): string {
  const root = decodedProto.rootNode;
  if (!root) return '';

  // Try to find the narrowest main content area to avoid outer shells
  const contentRoot =
    findNodeByRoles(root, [AnnotatedRole.ARTICLE, AnnotatedRole.MAIN]) || root;

  let prefix = '';
  if (decodedProto.mainFrameData?.title) {
    prefix = `# ${decodedProto.mainFrameData.title}\n\n`;
  }

  let rawMd = recursiveToMarkdown(contentRoot, {imageIndex: 1, currentUrl: decodedProto.mainFrameData?.url});

  // Clean up formatting
  rawMd = rawMd
    .replace(/\n{3,}/g, '\n\n')
    .replace(/ \n/g, '\n')
    .replace(/ +([.,!?;:)])/g, '$1')
    .replace(/`[ \t]+/g, '`')
    .replace(/[ \t]+`/g, '`');

  return (prefix + rawMd).trim();
}
