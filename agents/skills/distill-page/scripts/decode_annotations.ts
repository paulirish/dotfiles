import {fromBinary, create} from '@bufbuild/protobuf';
import {AnnotatedPageContentSchema, AnnotatedRole, ContentAttributeType, TextSize, TableRowType, ContentNodeSchema} from './proto/common_quality_data_pb.js';
import type {ContentNode, AnnotatedPageContent, TextInfo, ImageInfo, AnchorData, TableData, IframeData} from './proto/common_quality_data_pb.js';
import {INLINE_CODE_CLOSE_MARKER, INLINE_CODE_OPEN_MARKER, PRE_CLOSE_MARKER, PRE_OPEN_MARKER} from './semantic_markers.ts';

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
  isCode?: boolean;
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

export interface ASTEmbed {
  type: 'embed';
  url: string;
  label: string;
}

export type ASTInlineNode = ASTTextRun | ASTLink | ASTImage | ASTEmbed;
export type ASTNonTextInlineNode = Exclude<ASTInlineNode, ASTTextRun>;

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
  insideListItem: boolean;
  insideCodeBlock: boolean;
  insideInlineCode: boolean;
  currentUrl?: string | null;
}

const SEMANTIC_MARKERS = [
  PRE_OPEN_MARKER,
  PRE_CLOSE_MARKER,
  INLINE_CODE_OPEN_MARKER,
  INLINE_CODE_CLOSE_MARKER,
];
const semanticMarkerPattern = new RegExp(`(${SEMANTIC_MARKERS.join('|')})`);

function hasSemanticMarker(text: string): boolean {
  return SEMANTIC_MARKERS.some(marker => text.includes(marker));
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

  findNodesByRole(node: ContentNode, role: AnnotatedRole, matches: ContentNode[] = []): ContentNode[] {
    if (node.contentAttributes?.annotatedRoles?.includes(role)) {
      matches.push(node);
    }
    for (const child of node.childrenNodes || []) {
      this.findNodesByRole(child, role, matches);
    }
    return matches;
  },

  findContentRoot(root: ContentNode): ContentNode {
    const textLength = (node: ContentNode) => this.extractAllText(node).length;
    const largestNodeWithRole = (role: AnnotatedRole): ContentNode | null => {
      return this.findNodesByRole(root, role)
        .reduce<ContentNode | null>((largest, candidate) => {
          return !largest || textLength(candidate) > textLength(largest) ? candidate : largest;
        }, null);
    };
    const dominatesPage = (node: ContentNode | null) => !!node && textLength(node) >= textLength(root) / 2;

    // Landmark roles can appear on small promotional or client-rendered page
    // shells before the actual content. Select the largest meaningful MAIN,
    // rather than relying on document traversal order.
    const largestMain = largestNodeWithRole(AnnotatedRole.MAIN);
    if (dominatesPage(largestMain)) return largestMain;

    // A page can use <article> for small embedded cards. If no MAIN dominates,
    // use a dominant article as the next-best proxy for primary content.
    const largestArticle = largestNodeWithRole(AnnotatedRole.ARTICLE);

    // When several small article cards are the only ARTICLE landmarks, retain
    // the page root. The parser already removes NAV and FOOTER subtrees.
    return dominatesPage(largestArticle) ? largestArticle! : root;
  },

  textSizeToHeadingLevel(size: number | undefined): number {
    if (size === TextSize.XL) return 1;
    if (size === TextSize.L) return 2;
    if (size === TextSize.M_DEFAULT) return 3;
    if (size === TextSize.S || size === TextSize.XS) return 4;
    return 2;
  },

  isInlineNode(node: ASTBlockNode | ASTInlineNode): node is ASTInlineNode {
    return node.type === 'text' || node.type === 'link' || node.type === 'image' || node.type === 'embed';
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

        if (hasSemanticMarker(text)) {
          const parts = text.split(semanticMarkerPattern);

          for (const part of parts) {
            if (part === PRE_OPEN_MARKER || part === PRE_CLOSE_MARKER) {
              state.insideCodeBlock = part === PRE_OPEN_MARKER;
              if (state.insideCodeBlock) {
                flushInlines();
                activeCodeBlock = {type: 'codeblock', code: ''};
              } else {
                if (activeCodeBlock) {
                  blocks.push(activeCodeBlock);
                  activeCodeBlock = null;
                }
              }
              continue;
            }
            if (part === INLINE_CODE_OPEN_MARKER || part === INLINE_CODE_CLOSE_MARKER) {
              state.insideInlineCode = part === INLINE_CODE_OPEN_MARKER;
              continue;
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
                  if (item.type === 'text' || item.type === 'link' || item.type === 'image' || item.type === 'embed') {
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
        if (text.includes(PRE_OPEN_MARKER) || text.includes(PRE_CLOSE_MARKER)) {
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
    if (text === PRE_OPEN_MARKER || text === PRE_CLOSE_MARKER) {
      state.insideCodeBlock = text === PRE_OPEN_MARKER;
      return [];
    }
    if (text === INLINE_CODE_OPEN_MARKER || text === INLINE_CODE_CLOSE_MARKER) {
      state.insideInlineCode = text === INLINE_CODE_OPEN_MARKER;
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
    if (
      (size === TextSize.XL || size === TextSize.L) &&
      !state.insideHeading &&
      !state.insideParagraph &&
      !state.insideListItem
    ) {
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
      isCode: state.insideInlineCode,
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

  parseIframeNode(node: ContentNode, iframeData: IframeData, state: ParserState): (ASTBlockNode | ASTInlineNode)[] {
    const defaultParsed = this.parseDefaultNode(node, state);

    // Failed iframes will have the hostname and 'refused to connect.' as adjacent text nodes.
    // Convert these into links to what was embedded.
    const refusedIndex = defaultParsed.findIndex(n => n.type === 'text' && n.text === 'refused to connect.');
    const possibleHostnameNode = defaultParsed[refusedIndex - 1];
    if (refusedIndex > 0 && possibleHostnameNode.type === 'text' && iframeData.data.case === 'frameData') {
      const possibleHostname = possibleHostnameNode.text;
      const frameUrl = iframeData.data.value.url;
      const parsedUrl = URL.parse(iframeData.data.value.url);

      if (parsedUrl?.hostname === possibleHostname) {
        return [{
          type: 'embed',
          url: frameUrl,
          label: `Link to ${parsedUrl.hostname} embed`,
        }];
      }
    }

    return defaultParsed;
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
        const childState = {...state, insideParagraph: false, insideListItem: true};
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
      case 'iframeData':
        return this.parseIframeNode(node, attrs.contentData.value, state);
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

    const contentRoot = this.findContentRoot(root);

    const state: ParserState = {
      imageCounter: {value: 1},
      insideParagraph: false,
      insideHeading: false,
      insideListItem: false,
      insideCodeBlock: false,
      insideInlineCode: false,
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

  append(appendee: string, appendix: string) {
    if (!appendix) return appendee;
    const spacer = this.shouldInsertSpace(appendee, appendix) ? ' ' : '';
    return appendee + spacer + appendix;
  },

  serializeInlineChildren(children: ASTInlineNode[], insideLink = false): string {
    const isBold = (node: ASTTextRun): boolean => {
      // Policy decision: Suppress emphasis wrapping (bold) inside link tags.
      // The Chromium layout annotator model flags all link text runs as having
      // emphasis due to visual color/styling differences. Bolding every link
      // creates significant visual clutter.
      return !!node.style?.hasEmphasis && !insideLink;
    };
    const appendCodeOrText = (base: string, text: string, isCode: boolean): string => {
      const serialized = isCode ? this.serializeCodeSpan(text) : text;
      return this.append(base, serialized);
    };
    const appendBoldOrText = (base: string, text: string, isBold: boolean): string => {
      const serialized = isBold ? `**${text}**` : text;
      return this.append(base, serialized);
    };

    let md = '';
    for (let i = 0; i < children.length;) {
      const childPeek = children[i];

      // Not text, so just append and move on.
      if (childPeek.type !== 'text') {
        const serialized = this.serializeNonTextInline(childPeek);
        md = this.append(md, serialized);
        i++;
        continue;
      }

      // We want to only add enter and exit markers for inline bold and code text when needed, so
      // sibling text in the same state of each should be merged before putting markers around them.
      // Find code sub-runs inside each run of bold (or not) text, so they can contain multiple
      // code segments.
      // - the outer loop looks for boldness runs: consecutive text nodes with the same isBold state
      // - within boldness runs, the inner loop looks for "codeness" segments: consecutive nodes of the same isCode state
      const isBoldRun = isBold(childPeek);
      let boldnessRun = '';
      let isCodeSegment = !!childPeek.isCode;
      let codenessSegment = '';

      // Go until we run out of text in a isBoldRun state.
      for (; i < children.length; i++) {
        const next = children[i];
        if (next.type !== 'text' || isBold(next) !== isBoldRun) break;

        // Flush codenessSegment to the boldnessRun when isCode changes.
        const isCode = !!next.isCode;
        if (isCodeSegment !== isCode) {
          boldnessRun = appendCodeOrText(boldnessRun, codenessSegment, isCodeSegment);
          codenessSegment = '';
          isCodeSegment = isCode;
        }
        // For each same-isCode text, accumulate in codenessSegment.
        codenessSegment = this.append(codenessSegment, next.text);
      }
      boldnessRun = appendCodeOrText(boldnessRun, codenessSegment, isCodeSegment);

      md = appendBoldOrText(md, boldnessRun, isBoldRun);
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

  serializeCodeSpan(text: string): string {
    const longestBacktickRun = Math.max(0, ...(text.match(/`+/g) || []).map(run => run.length));
    const delimiter = '`'.repeat(longestBacktickRun + 1);
    const content = /^\s|\s$|`/.test(text) ? ` ${text} ` : text;
    return `${delimiter}${content}${delimiter}`;
  },

  serializeNonTextInline(node: ASTNonTextInlineNode): string {
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
    if (node.type === 'embed') {
      return `[${node.label}](${node.url})`;
    }

    node satisfies never;
    throw new Error('Unsupported inline node');
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
              return this.serializeInlineChildren([child]);
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
