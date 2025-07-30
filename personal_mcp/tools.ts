import {z} from 'zod';
import type {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import debug from 'debug';

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
