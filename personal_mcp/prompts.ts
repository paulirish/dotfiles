import type {GetPromptResult} from '@modelcontextprotocol/sdk/types.js';
import {z} from 'zod';

export const rewordItLikeMeSchema = z.object({
  content: z.string().describe('Content to reword'),
});

export const rewordItLikeMe = async ({content}): Promise<GetPromptResult> => {
  return {
    messages: [
      // Dunno if tools can handle this multi message prompt style.
      // {
      //   role: 'user',
      //   content: {
      //     type: 'text',
      //     text: `${content}`,
      //   },
      // },
      {
        role: 'assistant',
        content: {
          type: 'text',
          text: `${content}\n\n\nPlease reword the provided text. Tone: Technical substance, competent, slightly irreverent, brief.`,
        },
      },
    ],
  };
};
