import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

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
    }
  }
}
`;

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
    const result = runGh(`api graphql -F owner="${owner}" -F name="${name}" -F number=${prNumber} -f query='${query}'`);
    const data = JSON.parse(result);

    const threads = data.data.repository.pullRequest.reviewThreads.nodes;
    console.log(`Found ${threads.length} review threads.`);

    const results = threads.map((thread: any) => ({
      isResolved: thread.isResolved,
      comments: thread.comments.nodes.map((comment: any) => ({
        user: comment.author ? comment.author.login : 'ghost',
        body: comment.body,
        path: comment.path,
        line: comment.line,
        created_at: comment.createdAt,
        diff_hunk: comment.diffHunk
      }))
    }));

    const mdContent = convertToMarkdown(results, prNumber);
    console.log(mdContent);

  } catch (e) {
    console.error('Failed to fetch or process reviews:', e);
  }
}

function convertToMarkdown(threads: any[], prNumber: number): string {
  let md = `# PR #${prNumber} Reviews Archive\n\n`;

  const openThreads = threads.filter(t => !t.isResolved);
  const resolvedThreads = threads.filter(t => t.isResolved);

  md += `## Open Discussions (${openThreads.length})\n\n`;
  for (const thread of openThreads) {
    md += renderThread(thread);
  }

  md += `## Resolved Discussions (${resolvedThreads.length})\n\n`;
  for (const thread of resolvedThreads) {
    md += renderThread(thread);
  }

  return md;
}

function renderThread(thread: any): string {
  let md = '';
  const firstComment = thread.comments[0];
  if (!firstComment) return md;

  md += `### on \`${firstComment.path}\`${firstComment.line ? ` at line ${firstComment.line}` : ''}\n\n`;

  for (const comment of thread.comments) {
    md += `#### **${comment.user}** at ${comment.created_at}\n`;
    md += `> ${comment.body.replace(/\n/g, '\n> ')}\n\n`;
    
    if (comment.diff_hunk) {
      const lines = comment.diff_hunk.split('\n');
      const truncated = lines.slice(-4).join('\n');
      md += `<details>\n<summary>Diff Hunk (Truncated)</summary>\n\n\`\`\`diff\n${truncated}\n\`\`\`\n\n</details>\n\n`;
    }
  }

  md += '---\n\n';
  return md;
}

main();
