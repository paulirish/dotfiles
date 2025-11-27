import {z} from 'zod';
import type {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import debug from 'debug';
import * as fs from 'node:fs/promises';
import { execSync } from 'child_process';

export const logger = debug('personal_mcp:log');



export const add_notesSchema = z.object({
  content: z.string().describe('The content of the note to add.'),
});

export async function add_notes(params: z.infer<typeof add_notesSchema>, extra): Promise<CallToolResult> {
  logger(`add_notes request: ${JSON.stringify(params, null, '  ')}`);
  const filePath = `${process.cwd()}/agent_notes.md`;
  const {content} = params;
  try {
    await fs.appendFile(filePath, `\n${content}\n\n`);
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
