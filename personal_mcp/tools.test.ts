import {describe, it} from 'node:test';
import assert from 'node:assert';
import {hello} from './tools.ts';

describe('hello tool', () => {
  it('should return a friendly greeting', async () => {
    const result = await hello({name: 'World'}, {});
    assert.deepStrictEqual(result, {
      content: [
        {
          type: 'text',
          text: 'Hello, World!',
        },
      ],
      isError: false,
    });
  });
});
