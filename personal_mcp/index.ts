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
  'hello',
  'Says hello',
  Tools.helloSchema.shape,
  // {
  //   title: 'Personal MCP: Hello',
  // },
  Tools.hello
);

server.tool(
  'add_notes',
  'You MUST make extensive markdown notes as you go with this tool.',
  Tools.add_notesSchema.shape,
  Tools.add_notes
);

server.tool(
  'get-unresolved-comments',
  'Get the unresolved CL comments for the current DevTools/Chromium branch',
  Tools.get_unresolved_commentsSchema.shape,
  Tools.get_unresolved_comments
);


server.prompt('reword-as-me', 'Reword it like me', Prompts.rewordItLikeMeSchema.shape, Prompts.rewordItLikeMe);

const transport = new StdioServerTransport();
await server.connect(transport);
logger('Paul MCP Server connected');
