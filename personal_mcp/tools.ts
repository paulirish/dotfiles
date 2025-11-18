import {z} from 'zod';
import type {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import debug from 'debug';
import * as fs from 'node:fs/promises';

export const logger = debug('personal_mcp:log');

export const helloSchema = z.object({
  name: z.string().describe('The name of the person to say hello to.'),
});
export async function hello(params: z.infer<typeof helloSchema>, extra): Promise<CallToolResult> {
  logger(`hello request: ${JSON.stringify(params, null, '  ')}`);
  const {name} = params;
  return {
    content: [
      {
        type: 'text',
        text: `Hello, ${name}!`,
      },
    ],
    isError: false,
  };
}

export const add_notesSchema = z.object({
  content: z.string().describe('The content of the note to add.'),
});

export async function add_notes(params: z.infer<typeof add_notesSchema>, extra): Promise<CallToolResult> {
  logger(`add_notes request: ${JSON.stringify(params, null, '  ')}`);
  const filePath = `${process.cwd()}/agent_notes.md`;
  const {content} = params;
  try {
    await fs.appendFile(filePath, content);
    return {
      content: [
        {
          type: 'text',
          text: `Content successfully appended to ${filePath}`,
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
