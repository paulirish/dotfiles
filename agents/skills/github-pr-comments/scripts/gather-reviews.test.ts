import { test } from 'node:test';
import * as assert from 'node:assert';
import { convertToMarkdown, renderThread, parseReviews } from './gather-reviews.ts';

test('renderThread formats thread correctly with diff hunk', () => {
  const mockThread = {
    isResolved: false,
    comments: [
      {
        user: 'user1',
        body: 'Comment 1',
        path: 'file.js',
        line: 10,
        created_at: '2026-04-27T12:00:00Z',
        diff_hunk: '@@ -8,8 +8,8 @@\n line1\n line2\n+line3'
      },
      {
        user: 'user2',
        body: 'Comment 2',
        path: 'file.js',
        line: 10,
        created_at: '2026-04-27T12:01:00Z',
        diff_hunk: '@@ -8,8 +8,8 @@\n line1\n line2\n+line3'
      }
    ]
  };

  const output = renderThread(mockThread);

  // Check that path and line are present
  assert.match(output, /### on `file.js` at line 10/);

  // Check that diff hunk is present
  assert.match(output, /<details>/);
  assert.match(output, /<summary>Context<\/summary>/);
  assert.match(output, /```diff/);
  assert.match(output, /\+line3/);

  // Check that "Diff Hunk" is NOT present
  assert.strictEqual(output.includes('Diff Hunk'), false);

  // Check that comments are present
  assert.match(output, /#### \*\*user1\*\* at 2026-04-27T12:00:00Z/);
  assert.match(output, /> Comment 1/);
  assert.match(output, /#### \*\*user2\*\* at 2026-04-27T12:01:00Z/);
  assert.match(output, /> Comment 2/);

  // Check that diff hunk appears only once (should only be in the first part)
  const detailsCount = (output.match(/<details>/g) || []).length;
  assert.strictEqual(detailsCount, 1);
});

test('convertToMarkdown separates open and resolved discussions and includes general comments', () => {
  const mockThreads = [
    {
      isResolved: false,
      comments: [{ user: 'u1', body: 'c1', path: 'p1', created_at: 't1' }]
    },
    {
      isResolved: true,
      comments: [{ user: 'u2', body: 'c2', path: 'p2', created_at: 't2' }]
    }
  ];

  const mockGeneralComments = [
    { user: 'u3', body: 'c3', created_at: 't3' }
  ];

  const output = convertToMarkdown(mockThreads, mockGeneralComments, 123);

  assert.match(output, /# PR #123 Comments/);
  assert.match(output, /## General Comments \(1\)/);
  assert.match(output, /> c3/);
  assert.match(output, /## Resolved Discussions \(1\)[\s\S]*## Open Discussions \(1\)/);
  assert.match(output, /### on `p1`/);
  assert.match(output, /### on `p2`/);
});

test('convertToMarkdown omits headers when count is zero', () => {
  const output = convertToMarkdown([], [], 123);

  assert.strictEqual(output.includes('## General Comments'), false);
  assert.strictEqual(output.includes('## Resolved Discussions'), false);
  assert.strictEqual(output.includes('## Open Discussions'), false);
});

test('parseReviews handles missing author with ghost fallback', () => {
  const mockData = {
    data: {
      repository: {
        pullRequest: {
          reviewThreads: {
            nodes: [
              {
                isResolved: false,
                comments: {
                  nodes: [
                    { author: null, body: 'c1', createdAt: 't1' }
                  ]
                }
              }
            ]
          },
          comments: {
            nodes: [
              { author: null, body: 'c2', createdAt: 't2' }
            ]
          }
        }
      }
    }
  };

  const { results, parsedGeneralComments } = parseReviews(mockData);

  assert.strictEqual(results[0].comments[0].user, 'ghost');
  assert.strictEqual(parsedGeneralComments[0].user, 'ghost');
});

test('convertToMarkdown handles CRLF newlines', () => {
  const mockGeneralComments = [
    { user: 'u1', body: 'line1\r\nline2', created_at: 't1' }
  ];

  const output = convertToMarkdown([], mockGeneralComments, 123);

  assert.match(output, /> line1\n> line2/);
});

test('renderThread returns empty string for thread with no comments', () => {
  const mockThread = {
    isResolved: false,
    comments: []
  };

  const output = renderThread(mockThread);
  assert.strictEqual(output, '');
});
