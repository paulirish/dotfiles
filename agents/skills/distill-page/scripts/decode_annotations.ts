import {fromBinary, create} from '@bufbuild/protobuf';
import {AnnotatedPageContentSchema, AnnotatedRole, ContentAttributeType, TextSize, TableRowType, TextStyleSchema, ContentNodeSchema} from './proto/common_quality_data_pb.js';
import type {ContentNode, AnnotatedPageContent, TextInfo, ImageInfo, AnchorData, TableData} from './proto/common_quality_data_pb.js';

const {
  CONTENT_ATTRIBUTE_TEXT,
  CONTENT_ATTRIBUTE_IMAGE,
  CONTENT_ATTRIBUTE_ANCHOR,
  CONTENT_ATTRIBUTE_ORDERED_LIST,
  CONTENT_ATTRIBUTE_UNORDERED_LIST,
  CONTENT_ATTRIBUTE_TABLE,
  CONTENT_ATTRIBUTE_TABLE_ROW,
  CONTENT_ATTRIBUTE_HEADING,
  CONTENT_ATTRIBUTE_CONTAINER,
  CONTENT_ATTRIBUTE_PARAGRAPH,
} = ContentAttributeType;

// AST Types for Intermediate Representation, bridging with common_quality_data types
export interface ASTTextRun {
  type: 'text';
  text: string;
  style?: TextInfo['textStyle'];
}

export interface ASTImage {
  type: 'image';
  data: ImageInfo;
  isReference?: boolean;
  referenceId?: string;
}

export interface ASTLink {
  type: 'link';
  data: AnchorData;
  children: ASTInlineNode[];
}

export type ASTInlineNode = ASTTextRun | ASTLink | ASTImage;

export interface ASTParagraph {
  type: 'paragraph';
  children: ASTInlineNode[];
}

export interface ASTHeading {
  type: 'heading';
  level: number;
  children: ASTInlineNode[];
}

export interface ASTCodeBlock {
  type: 'codeblock';
  code: string;
  language?: string;
}

export interface ASTListItem {
  type: 'list-item';
  children: (ASTInlineNode | ASTBlockNode)[];
}

export interface ASTList {
  type: 'list';
  ordered: boolean;
  items: ASTListItem[];
}

export interface ASTTableCell {
  type: 'table-cell';
  header: boolean;
  children: ASTInlineNode[];
}

export interface ASTTableRow {
  type: 'table-row';
  cells: ASTTableCell[];
}

export interface ASTTable {
  type: 'table';
  data?: TableData;
  rows: ASTTableRow[];
}

export interface ASTCallout {
  type: 'callout';
  subtype: 'aside' | 'paid' | 'hidden';
  children: ASTBlockNode[];
}

export type ASTBlockNode = ASTParagraph | ASTHeading | ASTCodeBlock | ASTList | ASTTable | ASTCallout | ASTImage;

export interface ASTDocument {
  title?: string;
  children: ASTBlockNode[];
}

interface ParserState {
  imageCounter: {value: number};
  insideParagraph: boolean;
  insideHeading: boolean;
  insideCodeBlock: boolean;
  currentUrl?: string | null;
}

export const AnnotationParser = {
  decodeAnnotatedPageContent(base64String: string): AnnotatedPageContent {
    const buffer = Buffer.from(base64String, 'base64');
    return fromBinary(AnnotatedPageContentSchema, buffer);
  },

  findNodeByRoles(node: ContentNode, roles: AnnotatedRole[]): ContentNode | null {
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
        const found = this.findNodeByRoles(child, roles);
        if (found) return found;
      }
    }
    return null;
  },

  textSizeToHeadingLevel(size: number | undefined): number {
    if (size === TextSize.XL) return 1;
    if (size === TextSize.L) return 2;
    if (size === TextSize.M_DEFAULT) return 3;
    if (size === TextSize.S || size === TextSize.XS) return 4;
    return 2;
  },

  isInlineNode(node: ASTBlockNode | ASTInlineNode): node is ASTInlineNode {
    return node.type === 'text' || node.type === 'link' || node.type === 'image';
  },

  parseChildrenFlat(nodes: ContentNode[], state: ParserState): (ASTBlockNode | ASTInlineNode)[] {
    const result: (ASTBlockNode | ASTInlineNode)[] = [];
    for (const child of nodes) {
      result.push(...this.parseNode(child, state));
    }
    return result;
  },

  parseInlineChildren(nodes: ContentNode[], state: ParserState): ASTInlineNode[] {
    const flat = this.parseChildrenFlat(nodes, state);
    const inlines: ASTInlineNode[] = [];
    for (const item of flat) {
      if (this.isInlineNode(item)) {
        inlines.push(item);
      }
    }
    return inlines;
  },

  extractAllText(node: ContentNode): string {
    let text = '';
    const attrs = node.contentAttributes;
    if (attrs?.contentData.case === 'textData') {
      text += attrs.contentData.value.textContent || '';
    }
    if (node.childrenNodes) {
      for (const child of node.childrenNodes) {
        text += this.extractAllText(child);
      }
    }
    return text;
  },

  parseChildren(nodes: ContentNode[], state: ParserState): ASTBlockNode[] {
    const blocks: ASTBlockNode[] = [];
    let inlineAccumulator: ASTInlineNode[] = [];

    const flushInlines = () => {
      if (inlineAccumulator.length > 0) {
        blocks.push({
          type: 'paragraph',
          children: [...inlineAccumulator],
        });
        inlineAccumulator = [];
      }
    };

    let activeCodeBlock: ASTCodeBlock | null = null;

    for (const child of nodes) {
      const childAttrs = child.contentAttributes;

      if (childAttrs?.contentData.case === 'textData') {
        const text = childAttrs.contentData.value.textContent || '';

        if (text.includes('```')) {
          const parts = text.split('```');

          for (let i = 0; i < parts.length; i++) {
            const part = parts[i];

            if (i > 0) {
              state.insideCodeBlock = !state.insideCodeBlock;
              if (state.insideCodeBlock) {
                flushInlines();
                activeCodeBlock = {type: 'codeblock', code: ''};
              } else {
                if (activeCodeBlock) {
                  blocks.push(activeCodeBlock);
                  activeCodeBlock = null;
                }
              }
            }

            if (part) {
              if (state.insideCodeBlock && activeCodeBlock) {
                activeCodeBlock.code += part;
              } else {
                const virtualTextNode = create(ContentNodeSchema, {
                  contentAttributes: {
                    attributeType: CONTENT_ATTRIBUTE_TEXT,
                    contentData: {
                      case: 'textData',
                      value: {
                        textContent: part,
                        textStyle: childAttrs.contentData.value.textStyle,
                      },
                    },
                  },
                });
                const nodeState = {...state};
                const items = this.parseNode(virtualTextNode, nodeState);
                for (const item of items) {
                  if (item.type === 'text' || item.type === 'link' || item.type === 'image') {
                    inlineAccumulator.push(item);
                  } else if (item.type === 'paragraph') {
                    inlineAccumulator.push(...item.children);
                  } else {
                    flushInlines();
                    blocks.push(item);
                  }
                }
              }
            }
          }
          continue;
        }
      }

      if (state.insideCodeBlock && activeCodeBlock) {
        activeCodeBlock.code += this.extractAllText(child);
        continue;
      }

      const nodeState = {...state};
      const items = this.parseNode(child, nodeState);

      for (const item of items) {
        if (
          item.type === 'paragraph' ||
          item.type === 'heading' ||
          item.type === 'codeblock' ||
          item.type === 'list' ||
          item.type === 'table' ||
          item.type === 'callout' ||
          item.type === 'image'
        ) {
          flushInlines();
          blocks.push(item);
        } else {
          inlineAccumulator.push(item);
        }
      }
    }

    flushInlines();
    if (activeCodeBlock) {
      blocks.push(activeCodeBlock);
    }

    return blocks;
  },

  hasCodeFenceChild(node: ContentNode): boolean {
    if (!node.childrenNodes) return false;
    for (const child of node.childrenNodes) {
      const attrs = child.contentAttributes;
      if (attrs?.contentData.case === 'textData') {
        const text = attrs.contentData.value.textContent || '';
        if (text.includes('```')) {
          return true;
        }
      }
    }
    return false;
  },

  isPermalinkText(text: string): boolean {
    const cleaned = text.trim().toLowerCase();
    if (!cleaned) return true;
    if (/^[#¶§🔗\s]+$/.test(cleaned)) return true;
    return cleaned === 'permalink' || cleaned === 'link';
  },

  parseTextNode(node: ContentNode, textData: TextInfo, state: ParserState): (ASTBlockNode | ASTInlineNode)[] {
    let text = textData.textContent || '';
    const isCodeFence = text.includes('```');

    if (isCodeFence) {
      state.insideCodeBlock = !state.insideCodeBlock;
      return [];
    }

    if (state.insideCodeBlock) {
      return [];
    }

    text = text.replace(/ +([.,!?;:)])/g, '$1');

    const trimmed = text.trim();
    if (!trimmed) {
      return [];
    }

    const bold = !!(textData.textStyle?.hasEmphasis && !state.insideHeading);

    const size = textData.textStyle?.textSize;
    if ((size === TextSize.XL || size === TextSize.L) && !state.insideHeading && !state.insideParagraph) {
      const headingTextRun: ASTTextRun = {
        type: 'text',
        text: trimmed,
        style: textData.textStyle ? {...textData.textStyle, hasEmphasis: bold} : undefined,
      };
      const level = this.textSizeToHeadingLevel(size);
      const headingBlock: ASTHeading = {
        type: 'heading',
        level,
        children: [headingTextRun],
      };
      return [headingBlock];
    }

    const run: ASTTextRun = {
      type: 'text',
      text: trimmed,
      style: textData.textStyle ? {...textData.textStyle, hasEmphasis: bold} : undefined,
    };
    return [run];
  },

  parseImageNode(node: ContentNode, imageData: ImageInfo, state: ParserState): ASTImage[] {
    let referenceId = undefined;
    let isReference = false;
    if (!imageData.url) {
      referenceId = `image${String(state.imageCounter.value++).padStart(2, '0')}`;
      isReference = true;
    }
    const img: ASTImage = {
      type: 'image',
      data: imageData,
      isReference,
      referenceId,
    };
    return [img];
  },

  parseAnchorNode(node: ContentNode, anchorData: AnchorData, state: ParserState): (ASTLink | ASTInlineNode)[] {
    const url = anchorData.url || '';
    let resolvedUrl = url;
    if (state.currentUrl && url.startsWith(state.currentUrl + '#')) {
      resolvedUrl = url.substring(state.currentUrl.length);
    }

    const inlineChildren = this.parseInlineChildren(node.childrenNodes || [], state);
    if (inlineChildren.length > 0 && resolvedUrl) {
      if (state.insideHeading && resolvedUrl.startsWith('#')) {
        const combinedText = inlineChildren.map(c => (c.type === 'text' ? c.text : '')).join('');
        if (this.isPermalinkText(combinedText)) {
          return [];
        }
        return inlineChildren;
      }

      const link: ASTLink = {
        type: 'link',
        data: {...anchorData, url: resolvedUrl},
        children: inlineChildren,
      };
      return [link];
    }
    return [];
  },

  parseParagraphNode(node: ContentNode, state: ParserState): ASTParagraph[] {
    const childState = {...state, insideParagraph: true};
    const inlineChildren = this.parseInlineChildren(node.childrenNodes || [], childState);
    if (inlineChildren.length > 0) {
      const p: ASTParagraph = {
        type: 'paragraph',
        children: inlineChildren,
      };
      return [p];
    }
    return [];
  },

  parseHeadingNode(node: ContentNode, state: ParserState): ASTHeading[] {
    const childState = {...state, insideHeading: true};
    const inlineChildren = this.parseInlineChildren(node.childrenNodes || [], childState);
    if (inlineChildren.length > 0) {
      let maxTextSize = TextSize.M_DEFAULT;
      if (node.childrenNodes) {
        for (const child of node.childrenNodes) {
          const childAttrs = child.contentAttributes;
          if (childAttrs?.contentData.case === 'textData') {
            const sz = childAttrs.contentData.value.textStyle?.textSize;
            if (sz !== undefined && sz > maxTextSize) {
              maxTextSize = sz;
            }
          }
        }
      }
      const level = this.textSizeToHeadingLevel(maxTextSize);
      const h: ASTHeading = {
        type: 'heading',
        level,
        children: inlineChildren,
      };
      return [h];
    }
    return [];
  },

  parseListNode(node: ContentNode, state: ParserState, ordered: boolean): ASTList[] {
    const items: ASTListItem[] = [];
    if (node.childrenNodes) {
      for (const itemNode of node.childrenNodes) {
        const childState = {...state, insideParagraph: false};
        const itemChildren = this.parseChildren(itemNode.childrenNodes || [itemNode], childState);
        if (itemChildren.length > 0) {
          items.push({
            type: 'list-item',
            children: itemChildren,
          });
        }
      }
    }
    if (items.length > 0) {
      const list: ASTList = {
        type: 'list',
        ordered,
        items,
      };
      return [list];
    }
    return [];
  },

  parseTableNode(node: ContentNode, state: ParserState, tableData?: TableData): ASTTable[] {
    const rows: ASTTableRow[] = [];
    if (node.childrenNodes) {
      for (const rowNode of node.childrenNodes) {
        const rowAttrs = rowNode.contentAttributes;
        if (!rowAttrs || rowAttrs.attributeType !== CONTENT_ATTRIBUTE_TABLE_ROW) continue;

        const cells: ASTTableCell[] = [];
        if (rowNode.childrenNodes) {
          for (const cellNode of rowNode.childrenNodes) {
            const childState = {...state, insideParagraph: true};
            const cellInlines = this.parseInlineChildren(cellNode.childrenNodes || [], childState);
            const rowType = rowAttrs.contentData.case === 'tableRowData' ? rowAttrs.contentData.value.type : undefined;
            const header = rowType === TableRowType.HEADER;
            cells.push({
              type: 'table-cell',
              header,
              children: cellInlines,
            });
          }
        }
        rows.push({
          type: 'table-row',
          cells,
        });
      }
    }
    if (rows.length > 0) {
      const table: ASTTable = {
        type: 'table',
        data: tableData,
        rows,
      };
      return [table];
    }
    return [];
  },

  parseCalloutNode(node: ContentNode, subtype: 'paid' | 'hidden' | 'aside', state: ParserState): ASTCallout[] {
    const childState = {
      ...state,
      insideParagraph: false,
      insideHeading: false,
    };
    const blockChildren = this.parseChildren(node.childrenNodes || [], childState);
    if (blockChildren.length > 0) {
      const callout: ASTCallout = {
        type: 'callout',
        subtype,
        children: blockChildren,
      };
      return [callout];
    }
    return [];
  },

  parseDefaultNode(node: ContentNode, state: ParserState): (ASTBlockNode | ASTInlineNode)[] {
    if (node.childrenNodes) {
      if (this.hasCodeFenceChild(node)) {
        return this.parseChildren(node.childrenNodes, state);
      }
      return this.parseChildrenFlat(node.childrenNodes, state);
    }
    return [];
  },

  parseNode(node: ContentNode, state: ParserState): (ASTBlockNode | ASTInlineNode)[] {
    const attrs = node.contentAttributes;
    if (!attrs) {
      return this.parseDefaultNode(node, state);
    }

    if (attrs.isAdRelated) {
      return [];
    }

    const roles = attrs.annotatedRoles || [];
    if (roles.includes(AnnotatedRole.NAV) || roles.includes(AnnotatedRole.FOOTER)) {
      return [];
    }

    // Policy decision: We choose not to support blockquotes (AX_ROLE_BLOCKQUOTE = 8)
    // because the Chromium layout annotator model maps them as AX_ROLE_UNKNOWN (181).
    // Attempting to inject/track them via raw DOM prefixes (like '> ') is fragile
    // and breaks on nested block layout lines, so we are choosing not to handle it.

    const hasPaid = roles.includes(AnnotatedRole.PAID_CONTENT);
    const hasHidden = roles.includes(AnnotatedRole.CONTENT_HIDDEN);
    const hasAside = roles.includes(AnnotatedRole.ASIDE);

    if (hasPaid || hasHidden || hasAside) {
      const subtype = hasPaid ? 'paid' : hasHidden ? 'hidden' : 'aside';
      return this.parseCalloutNode(node, subtype, state);
    }

    // 1. Dispatch by content data type
    switch (attrs.contentData.case) {
      case 'textData':
        return this.parseTextNode(node, attrs.contentData.value, state);
      case 'imageData':
        return this.parseImageNode(node, attrs.contentData.value, state);
      case 'anchorData':
        return this.parseAnchorNode(node, attrs.contentData.value, state);
    }

    // 2. Dispatch by structural attribute type
    switch (attrs.attributeType) {
      case CONTENT_ATTRIBUTE_PARAGRAPH:
        if (this.hasCodeFenceChild(node)) {
          return this.parseChildren(node.childrenNodes || [], state);
        }
        return this.parseParagraphNode(node, state);
      case CONTENT_ATTRIBUTE_HEADING:
        return this.parseHeadingNode(node, state);
      case CONTENT_ATTRIBUTE_ORDERED_LIST:
      case CONTENT_ATTRIBUTE_UNORDERED_LIST:
        return this.parseListNode(node, state, attrs.attributeType === CONTENT_ATTRIBUTE_ORDERED_LIST);
      case CONTENT_ATTRIBUTE_TABLE: {
        const tableData = attrs.contentData.case === 'tableData' ? attrs.contentData.value : undefined;
        return this.parseTableNode(node, state, tableData);
      }
    }

    return this.parseDefaultNode(node, state);
  },

  parseProtoToAST(decodedProto: AnnotatedPageContent): ASTDocument {
    const root = decodedProto.rootNode;
    if (!root) return {children: []};

    const contentRoot = this.findNodeByRoles(root, [AnnotatedRole.ARTICLE, AnnotatedRole.MAIN]) || root;

    const state: ParserState = {
      imageCounter: {value: 1},
      insideParagraph: false,
      insideHeading: false,
      insideCodeBlock: false,
      currentUrl: decodedProto.mainFrameData?.url,
    };

    const children = this.parseChildren([contentRoot], state);
    return {
      title: decodedProto.mainFrameData?.title || undefined,
      children,
    };
  },
};

export const MarkdownSerializer = {
  shouldInsertSpace(prevText: string, nextChunk: string): boolean {
    if (!prevText) return false;
    const lastChar = prevText[prevText.length - 1];
    const firstChar = nextChunk[0];

    // Never insert spaces around underscores or hyphens (common in code variables/domains)
    if (
      lastChar === '_' ||
      lastChar === '-' ||
      firstChar === '_' ||
      firstChar === '-'
    ) {
      return false;
    }

    const startsWithPunc = /^[.,!?;:)]/.test(nextChunk) && !nextChunk.startsWith('![');
    const endsWithSkip = /[(\s]/.test(lastChar);
    return !startsWithPunc && !endsWithSkip;
  },

  mergeGroup(group: ASTInlineNode[], bold: boolean): ASTInlineNode {
    if (group.length === 1) return group[0];

    let texts = '';
    for (let i = 0; i < group.length; i++) {
      const node = group[i];
      if (node.type !== 'text') continue;
      const chunk = node.text;
      if (!chunk) continue;

      if (this.shouldInsertSpace(texts, chunk)) {
        texts += ' ';
      }
      texts += chunk;
    }

    const first = group[0];
    if (first.type === 'text') {
      return {
        type: 'text',
        text: texts,
        style: first.style ? create(TextStyleSchema, {...first.style, hasEmphasis: bold}) : bold ? create(TextStyleSchema, {hasEmphasis: true}) : undefined,
      };
    }
    return first;
  },

  serializeInlineChildren(children: ASTInlineNode[], insideLink = false): string {
    const grouped: ASTInlineNode[] = [];
    let currentGroup: ASTInlineNode[] = [];
    let currentBold: boolean | undefined = undefined;

    for (const child of children) {
      if (child.type === 'text') {
        const isBold = !!(child.style?.hasEmphasis && !insideLink);
        if (currentBold === undefined) {
          currentBold = isBold;
          currentGroup.push(child);
        } else if (currentBold === isBold) {
          currentGroup.push(child);
        } else {
          grouped.push(this.mergeGroup(currentGroup, currentBold));
          currentGroup = [child];
          currentBold = isBold;
        }
      } else {
        if (currentGroup.length > 0) {
          grouped.push(this.mergeGroup(currentGroup, !!currentBold));
          currentGroup = [];
          currentBold = undefined;
        }
        grouped.push(child);
      }
    }
    if (currentGroup.length > 0) {
      grouped.push(this.mergeGroup(currentGroup, !!currentBold));
    }

    let md = '';
    for (let i = 0; i < grouped.length; i++) {
      const child = grouped[i];
      const chunk = this.serializeInline(child, insideLink);
      if (!chunk) continue;

      if (this.shouldInsertSpace(md, chunk)) {
        md += ' ';
      }
      md += chunk;
    }
    return md.trim();
  },

  serializeImage(node: ASTImage): string {
    const caption = node.data.imageCaption || 'image';
    if (node.isReference) {
      return `![${caption}][${node.referenceId}]`;
    }
    return `![${caption}](${node.data.url || ''})`;
  },

  serializeInline(node: ASTInlineNode, insideLink = false): string {
    if (node.type === 'text') {
      let text = node.text;
      // Policy decision: Suppress emphasis wrapping (bold) inside link tags.
      // The Chromium layout annotator model flags all link text runs as having
      // emphasis due to visual color/styling differences. Bolding every link
      // creates significant visual clutter.
      if (node.style?.hasEmphasis && !insideLink) {
        text = `**${text}**`;
      }
      return text;
    }
    if (node.type === 'link') {
      const linkText = this.serializeInlineChildren(node.children, true);
      if (linkText && node.data.url) {
        return `[${linkText}](${node.data.url})`;
      }
      return linkText;
    }
    if (node.type === 'image') {
      return this.serializeImage(node);
    }
    return '';
  },

  serializeBlock(node: ASTBlockNode): string {
    if (node.type === 'paragraph') {
      return this.serializeInlineChildren(node.children);
    }

    if (node.type === 'heading') {
      const levelHashes = '#'.repeat(node.level);
      const content = this.serializeInlineChildren(node.children);
      return `${levelHashes} ${content}`;
    }

    if (node.type === 'codeblock') {
      const code = node.code.replace(/^\n+/, '').replace(/\n+$/, '');
      return `\`\`\`\n${code}\n\`\`\``;
    }

    if (node.type === 'list') {
      let md = '';
      let index = 1;
      for (const item of node.items) {
        const content = item.children
          .map(child => {
            if (child.type === 'paragraph') {
              return this.serializeInlineChildren(child.children);
            }
            if (child.type === 'text' || child.type === 'link') {
              return this.serializeInline(child);
            }
            return this.serializeBlock(child as ASTBlockNode);
          })
          .join('\n')
          .trim();

        const prefix = node.ordered ? `${index}. ` : '* ';
        const indentedContent = content
          .split('\n')
          .map((line, i) => {
            if (i === 0) return line;
            return '  ' + line;
          })
          .join('\n');

        md += `${prefix}${indentedContent}\n`;
        index++;
      }
      return md;
    }

    if (node.type === 'table') {
      let md = '';
      if (node.data?.tableName) {
        md += `**Table: ${node.data.tableName}**\n\n`;
      }

      // Determine maximum column count across all rows
      let maxCols = 0;
      for (const row of node.rows) {
        if (row.cells.length > maxCols) {
          maxCols = row.cells.length;
        }
      }

      if (maxCols === 0) return '';

      for (let r = 0; r < node.rows.length; r++) {
        const row = node.rows[r];
        let rowText = '|';

        for (let c = 0; c < maxCols; c++) {
          const cell = row.cells[c];
          const cellText = cell ? this.serializeInlineChildren(cell.children) : '';
          rowText += ` ${cellText} |`;
        }
        md += rowText + '\n';

        if (r === 0) {
          let sepText = '|';
          for (let c = 0; c < maxCols; c++) {
            sepText += '---|';
          }
          md += sepText + '\n';
        }
      }
      return md;
    }

    if (node.type === 'image') {
      return this.serializeImage(node);
    }

    if (node.type === 'callout') {
      const childrenMd = node.children
        .map(c => this.serializeBlock(c))
        .join('\n\n')
        .trim();
      if (!childrenMd) return '';

      if (node.subtype === 'aside') {
        return `<aside>\n\n${childrenMd}\n</aside>`;
      }
      if (node.subtype === 'hidden') {
        return `<details><summary>Collapsed Content</summary>\n\n${childrenMd}\n</details>`;
      }
      if (node.subtype === 'paid') {
        return `> [!IMPORTANT]\n> **Paid Content**: The following section is behind a paywall.\n\n${childrenMd}`;
      }
    }

    return '';
  },

  serializeASTToMarkdown(ast: ASTDocument): string {
    let md = '';
    if (ast.title) {
      md += `${ast.title}\n\n`;
    }

    const blocksMd = ast.children.map(c => this.serializeBlock(c)).filter(Boolean);
    md += blocksMd.join('\n\n');

    md = md
      .replace(/\n{3,}/g, '\n\n')
      .replace(/ \n/g, '\n')
      .replace(/`[ \t]*([^`\n]*?)[ \t]*`/g, '`$1`');

    return md.trim();
  },
};

export function decodeAnnotatedPageContent(base64String: string): AnnotatedPageContent {
  return AnnotationParser.decodeAnnotatedPageContent(base64String);
}

export function parseProtoToAST(decodedProto: AnnotatedPageContent): ASTDocument {
  return AnnotationParser.parseProtoToAST(decodedProto);
}

export function convertToMarkdown(decodedProto: AnnotatedPageContent): string {
  const ast = AnnotationParser.parseProtoToAST(decodedProto);
  return MarkdownSerializer.serializeASTToMarkdown(ast);
}
