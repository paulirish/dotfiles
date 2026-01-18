import {z} from 'zod';
import type {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import debug from 'debug';
import * as fs from 'node:fs/promises';
import * as os from 'node:os';
import * as path from 'node:path';
import { execSync, exec } from 'child_process';
import {promisify} from 'node:util';
import { chromium } from 'playwright';

const execAsync = promisify(exec);
export const logger = debug('personal_mcp:log');



export const add_notesSchema = z.object({
  content: z.string().describe('The content of the note to add.'),
});

export async function add_notes(params: z.infer<typeof add_notesSchema>, extra): Promise<CallToolResult> {
  logger(`add_notes request: ${JSON.stringify(params, null, '  ')}`);
  const filePath = `${process.cwd()}/agent_notes.md`;
  const {content} = params;
  try {
    await fs.appendFile(filePath, `${content}\n\n* * *\n`);
    return {
      content: [
        {
          type: 'text',
          text: `👍`,
        },
      ],
      isError: false,
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error appending to file ${filePath}: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
}

export const get_unresolved_commentsSchema = z.object({});

export async function get_unresolved_comments(
  params: z.infer<typeof get_unresolved_commentsSchema>,
  extra,
): Promise<CallToolResult> {
  try {
    let execSyncFn = execSync;
    if (process.env.NODE_TEST_CONTEXT) {
      const rets = ['feature1', '12345', 'http://cool'];
      execSyncFn = () => rets.shift();
    }
    const branchName = execSyncFn('git rev-parse --abbrev-ref HEAD').toString().trim();
    const changeNumber = execSyncFn(`git config branch.${branchName}.gerritissue`).toString().trim();
    const gerritBase = execSyncFn(`git config --get branch.${branchName}.gerritserver`).toString().trim();


    const commentsUrl = `${gerritBase}/changes/${changeNumber}/comments`;
    // https://gerrit-review.googlesource.com/Documentation/rest-api-changes.html#list-change-comments


    const commentsResponse = await fetch(commentsUrl);
    let commentsText = await commentsResponse.text();
    // Gerrit API prepends `)]}'` to JSON responses.
    if (commentsText.startsWith(")]}'")) {
      commentsText = commentsText.substring(5);
    }
    const commentsByFile = JSON.parse(commentsText) as {[filePath: string]: GerritComment[]};

    const allComments = Object.entries(commentsByFile).flatMap(([path, comments]) =>
      comments.map((c) => ({...c, path})),
    );
    const commentsById = new Map(allComments.map((c) => [c.id, c]));
    const getRootComment = (comment: GerritComment): GerritComment => {
      if (!comment.in_reply_to) {
        return comment;
      }
      const parent = commentsById.get(comment.in_reply_to);
      if (!parent) {
        return comment;
      }
      return getRootComment(parent);
    };

    const threads = new Map<string, GerritComment[]>();
    for (const comment of allComments) {
      const root = getRootComment(comment);
      if (!threads.has(root.id)) {
        threads.set(root.id, []);
      }
      threads.get(root.id)!.push(comment);
    }

    const resolvedThreadIds = new Set<string>();
    for (const [rootId, comments] of threads.entries()) {
      comments.sort((a, b) => new Date(a.updated).getTime() - new Date(b.updated).getTime());
      const lastComment = comments[comments.length - 1];
      if (lastComment.unresolved === false) {
        resolvedThreadIds.add(rootId);
      }
    }

    const unresolvedComments = allComments
      .filter((c) => c.unresolved)
      .filter((c) => {
        const root = getRootComment(c);
        return !resolvedThreadIds.has(root.id);
      });

    if (unresolvedComments.length === 0) {
      return {content: [{type: 'text', text: 'No unresolved comments found.'}]};
    }

    const output = unresolvedComments
      .map((comment, i) => {
        const location = comment.line ? `${comment.path}:${comment.line}` : comment.path;
        return `${i + 1}. ${location}\n${comment.message.trim()}`;
      })
      .join('\n\n');

    const header = `Unresolved comments for CL ${changeNumber}:\n\n`;
    return {content: [{type: 'text', text: header + output}]};
  } catch (error) {
    return {content: [{type: 'text', text: `Error: ${error.message}`}], isError: true};
  }
}

export interface GerritComment {
  id: string;
  path?: string;
  line?: number;
  in_reply_to?: string;
  message: string;
  updated: string;
  author?: {
    _account_id: number;
    name?: string;
    email?: string;
  };
  unresolved?: boolean;
}


export const getClDiffSchema = z.object({
  urlOrId: z.string().describe('The URL or ID of the DevTools CL.'),
});


export async function getClDiff(params: z.infer<typeof getClDiffSchema>): Promise<CallToolResult> {
  const {urlOrId} = params;
  const path = URL.parse(urlOrId, 'https://crrev.com/').pathname || '';
  const numericid = /\b\d+\b/.exec(path)?.[0];


  if (!numericid) {
    return {content: [{type: 'text', text: 'Invalid CL URL or ID'}], isError: true};
  }
  const url = `https://chromium-review.googlesource.com/changes/devtools%2Fdevtools-frontend~${numericid}/revisions/current/patch?download&raw`;
  const resp = await fetch(url);
  if (!resp.ok) {
    return {content: [{type: 'text', text: `Error: ${resp.statusText}`}], isError: true};
  }

  const text = await resp.text();
  return {content: [{type: 'text', text: text}]};
}

export const runGoogleAiSearchSchema = z.object({
  query: z.string().describe('The search query to run.'),
  remoteDebuggingPort: z.number().optional().describe('The remote debugging port of the browser to connect to. Defaults to 51673.'),
});

export async function runGoogleAiSearch(
  params: z.infer<typeof runGoogleAiSearchSchema>,
): Promise<CallToolResult> {
  const {query} = params;
  const port = params.remoteDebuggingPort || 51673;
  let browser;
  try {
    try {
      browser = await chromium.connectOverCDP(`http://localhost:${port}`);
    } catch (e) {
      return {
        content: [{type: 'text', text: `Failed to connect to browser on port ${port}. Ensure Chrome is running with --remote-debugging-port=${port}. Error: ${e.message}`}],
        isError: true,
      };
    }
    
    // Create a new context to avoid interfering with existing tabs/state too much
    const context = await browser.newContext();
    const page = await context.newPage();

    let aiResponseContent: string | null = null;
    page.on('response', async (response) => {
      const url = response.url();
      if (
        url.startsWith('https://www.google.com/async/folif?') &&
        response.headers()['content-type']?.includes('text/html')
      ) {
        try {
          const text = await response.text();
          if (!aiResponseContent) aiResponseContent = text;
        } catch (e) {
          // ignore
        }
      }
    });

    await page.goto('https://www.google.com/search?q=&udm=50');

    // Wait a bit to be nice
    await page.waitForTimeout(1000);

    // Type query with some delay to simulate human typing
    const searchBox = page.locator('textarea:visible').first();
    await searchBox.fill(query, {timeout: 5000});
    await page.waitForTimeout(500);
    await page.keyboard.press('Enter');

    // Wait for networkidle
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Extra safety

    let savedSource = 'network';
    let contentToSave = aiResponseContent;

    if (!contentToSave) {
      // Strategy 2: DOM
      const element = await page.locator('*[data-subtree="aimc"]').first();
      if ((await element.count()) > 0) {
        contentToSave = await element.evaluate((el) => el.outerHTML);
        savedSource = 'dom';
      }
    }

    // Cleanup page/context
    await page.close();
    await context.close();

    if (contentToSave) {
      const slug = query
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .substring(0, 30);
      const filename = `aimode_${slug}.html`;
      const downloadsDir = path.join(os.homedir(), 'Downloads');
      const fullPath = path.join(downloadsDir, filename);
      
      await fs.writeFile(fullPath, contentToSave);
      return {
        content: [
          {
            type: 'text',
            text: `Saved AI response to ${fullPath} (source: ${savedSource})`,
          },
        ],
      };
    } else {
      return {
        content: [{type: 'text', text: 'Could not find AI response via network or DOM.'}],
        isError: true,
      };
    }
  } catch (error) {
    return {content: [{type: 'text', text: `Error: ${error.message}`}], isError: true};
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

export const fetchAsMarkdownSchema = z.object({
  url: z.string().url().describe('The URL to fetch and convert to markdown.'),
});

export async function fetchAsMarkdown(
  params: z.infer<typeof fetchAsMarkdownSchema>,
): Promise<CallToolResult> {
  const {url} = params;
  let browser;
  try {
    browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle'});
    const bodyHtml = await page.content(); // full HTML

    // @ts-ignore TODO: fix and use the published npm package dur
    const {convert} = await import('../../markpaste/src/index.js');
    const markdown = await convert(bodyHtml, {converter: 'pandoc'});

    return {
      content: [
        {
          type: 'text',
          text: markdown,
        },
      ],
    };
  } catch (error) {
    return {content: [{type: 'text', text: `Error: ${error.message}`}], isError: true};
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

