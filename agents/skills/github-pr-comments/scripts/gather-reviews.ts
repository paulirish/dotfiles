import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

interface RawComment {
  author?: { login: string };
  body: string;
  path?: string;
  line?: number;
  createdAt: string;
  diffHunk?: string;
}

interface RawThread {
  isResolved: boolean;
  comments: { nodes: RawComment[] };
}

interface ParsedComment {
  user: string;
  body: string;
  path?: string;
  line?: number;
  created_at: string;
  diff_hunk?: string;
}

interface ParsedThread {
  isResolved: boolean;
  comments: ParsedComment[];
}

function runGh(args: string): string {
  try {
    return execSync(`gh ${args}`, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  } catch (error) {
    console.error(`Failed to run: gh ${args}`);
    throw error;
  }
}

const query = `
query($owner: String!, $name: String!, $number: Int!) {
  repository(owner: $owner, name: $name) {
    pullRequest(number: $number) {
      reviewThreads(first: 100) {
        nodes {
          isResolved
          comments(first: 10) {
            nodes {
              author { login }
              body
              path
              line
              createdAt
              diffHunk
            }
          }
        }
      }
      comments(first: 100) {
        nodes {
          author { login }
          body
          createdAt
        }
      }
    }
  }
}
`;

export function fetchReviews(owner: string, name: string, prNumber: number, runGhFn: (args: string) => string) {
  const result = runGhFn(`api graphql -F owner="${owner}" -F name="${name}" -F number=${prNumber} -f query='${query}'`);
  return JSON.parse(result);
}

export function parseReviews(data: any): { results: ParsedThread[], parsedGeneralComments: ParsedComment[] } {
  const threads = data.data.repository.pullRequest.reviewThreads.nodes as RawThread[];
  const generalComments = data.data.repository.pullRequest.comments.nodes as RawComment[];

  const results: ParsedThread[] = threads.map((thread) => ({
    isResolved: thread.isResolved,
    comments: thread.comments.nodes.map((comment) => ({
      user: comment.author?.login ?? 'ghost',
      body: comment.body,
      path: comment.path,
      line: comment.line,
      created_at: comment.createdAt,
      diff_hunk: comment.diffHunk
    }))
  }));

  const parsedGeneralComments: ParsedComment[] = generalComments.map((comment) => ({
    user: comment.author?.login ?? 'ghost',
    body: comment.body,
    created_at: comment.createdAt
  }));

  return { results, parsedGeneralComments };
}

function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: node gather-reviews.ts <owner/repo> <pr_number>');
    process.exit(1);
  }

  const [repoStr, prNumberStr] = args;
  const [owner, name] = repoStr.split('/');
  const prNumber = parseInt(prNumberStr, 10);

  if (!owner || !name || isNaN(prNumber)) {
    console.error('Invalid arguments. Repo must be in owner/repo format, and PR number must be an integer.');
    process.exit(1);
  }

  console.log(`Fetching review threads for PR #${prNumber} in ${owner}/${name}...`);

  try {
    const data = fetchReviews(owner, name, prNumber, runGh);
    const { results, parsedGeneralComments } = parseReviews(data);

    console.log(`Found ${results.length} review threads.`);
    console.log(`Found ${parsedGeneralComments.length} general comments.`);

    const mdContent = convertToMarkdown(results, parsedGeneralComments, prNumber);
    console.log(mdContent);
  } catch (e) {
    console.error('Failed to fetch or process reviews:', e);
    process.exit(1);
  }
}

export function convertToMarkdown(threads: ParsedThread[], generalComments: ParsedComment[], prNumber: number): string {
  let md = `# PR #${prNumber} Comments\n\n`;

  if (generalComments.length > 0) {
    md += `## General Comments (${generalComments.length})\n\n`;
    for (const comment of generalComments) {
      md += `#### **${comment.user}** at ${comment.created_at}\n`;
      md += `> ${comment.body.replace(/\r?\n/g, '\n> ')}\n\n`;
      md += '---\n\n';
    }
  }

  const openThreads = threads.filter(t => !t.isResolved);
  const resolvedThreads = threads.filter(t => t.isResolved);

  if (resolvedThreads.length > 0) {
    md += `## Resolved Discussions (${resolvedThreads.length})\n\n`;
    for (const thread of resolvedThreads) {
      md += renderThread(thread);
    }
  }

  if (openThreads.length > 0) {
    md += `## Open Discussions (${openThreads.length})\n\n`;
    for (const thread of openThreads) {
      md += renderThread(thread);
    }
  }

  return md;
}

export function renderThread(thread: ParsedThread): string {
  let md = '';
  const firstComment = thread.comments[0];
  if (!firstComment) return md;

  md += `### on \`${firstComment.path}\`${firstComment.line ? ` at line ${firstComment.line}` : ''}\n\n`;

  if (firstComment.diff_hunk) {
    const lines = firstComment.diff_hunk.split('\n');
    const truncated = lines.slice(-4).join('\n');
    md += `<details>\n<summary>Context</summary>\n\n\`\`\`diff\n${truncated}\n\`\`\`\n\n</details>\n\n`;
  }

  for (const comment of thread.comments) {
    md += `#### **${comment.user}** at ${comment.created_at}\n`;
    md += `> ${comment.body.replace(/\r?\n/g, '\n> ')}\n\n`;
  }

  md += '---\n\n';
  return md;
}

if (process.argv[1] && fs.realpathSync(process.argv[1]) === fs.realpathSync(import.meta.filename)) {
  main();
}

