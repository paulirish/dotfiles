import type {GetPromptResult} from '@modelcontextprotocol/sdk/types.js';
import {z} from 'zod';

export const rewordItLikeMeSchema = z.object({
  content: z.string().describe('Content to reword'),
});

export const rewordItLikeMe = async ({content}): Promise<GetPromptResult> => {
  return {
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: `${content}`,
        },
      },
      {
        role: 'assistant',
        content: {
          type: 'text',
          text: `Please reword the provided text to use a cool vibe and relaxed tone of voice. Add in three emoji.`,
        },
      },
    ],
  };
};
