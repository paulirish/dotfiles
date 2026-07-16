#!/usr/bin/env node

import { execSync } from 'node:child_process';

interface GerritComment {
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

async function main() {
  try {
    let branchName: string;
    try {
      branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    } catch (e) {
      console.error('Error: Not in a git repository or failed to get branch name.');
      process.exit(1);
    }

    let changeNumber: string;
    let gerritBase: string;
    try {
      changeNumber = execSync(`git config branch.${branchName}.gerritissue`).toString().trim();
      gerritBase = execSync(`git config --get branch.${branchName}.gerritserver`).toString().trim();
    } catch (e) {
      console.error(`Error: Could not get Gerrit config for branch "${branchName}".`);
      console.error(`Ensure "branch.${branchName}.gerritissue" and "branch.${branchName}.gerritserver" are set in git config.`);
      process.exit(1);
    }

    if (!changeNumber || !gerritBase) {
      console.error(`Error: Gerrit issue or server not configured for branch "${branchName}".`);
      process.exit(1);
    }

    const commentsUrl = `${gerritBase}/changes/${changeNumber}/comments`;
    console.log(`Fetching comments from ${commentsUrl}...`);

    const commentsResponse = await fetch(commentsUrl);
    if (!commentsResponse.ok) {
      console.error(`Error fetching comments: ${commentsResponse.statusText}`);
      process.exit(1);
    }

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
      console.log('No unresolved comments found.');
      return;
    }

    console.log(`\nUnresolved comments for CL ${changeNumber}:\n`);
    const output = unresolvedComments
      .map((comment, i) => {
        const location = comment.line ? `${comment.path}:${comment.line}` : comment.path;
        return `${i + 1}. ${location}\n${comment.message.trim()}`;
      })
      .join('\n\n');

    console.log(output);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
