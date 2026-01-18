import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js';
import fs from 'node:fs';
import debug from 'debug';
import * as Tools from './tools.ts';
import * as Prompts from './prompts.ts';

if (process.env.DEBUG_FILE) {
  const logFile = fs.createWriteStream(process.env.DEBUG_FILE, {flags: 'a'});
  debug.log = function (chunk) {
    logFile.write(`${chunk}\n`);
  };
  logFile.on('error', function (error) {
    console.log(`Error when opening/writing to log file: ${error.message}`);
    logFile.end();
    process.exit(1);
  });
}
export const logger = debug('personal_mcp:log');

const server = new McpServer(
  {
    name: 'Paul MCP Server',
    version: '0.1.0',
  },
  {capabilities: {logging: {}}}
);

server.tool(
  'add_notes',
  'MANDATORY: You MUST make extensive markdown notes as you go with this tool.',
  Tools.add_notesSchema.shape,
  Tools.add_notes
);

server.tool(
  'get-unresolved-comments',
  'Get the unresolved CL comments for the current DevTools/Chromium branch',
  Tools.get_unresolved_commentsSchema.shape,
  Tools.get_unresolved_comments
);

server.tool(
  'get-cl-diff',
  'Get the diff of a DevTools/Chromium CL from chromium-review.googlesource.com.',
  Tools.getClDiffSchema.shape,
  Tools.getClDiff
);


server.tool(
  'run_google_ai_search',
  'Run a Google AI search query and save the response.',
  Tools.runGoogleAiSearchSchema.shape,
  Tools.runGoogleAiSearch
);

server.tool(
  'fetch_url_as_markdown',
  'Fetch a URL and get the body HTML as markdown.',
  Tools.fetchAsMarkdownSchema.shape,
  Tools.fetchAsMarkdown
);


server.prompt('reword-as-me', 'Reword it like me', Prompts.rewordItLikeMeSchema.shape, Prompts.rewordItLikeMe);

const transport = new StdioServerTransport();
await server.connect(transport);
logger('Paul MCP Server connected');
