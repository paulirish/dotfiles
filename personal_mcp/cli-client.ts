import { get_unresolved_comments } from './tools.ts';
import { runGoogleAiSearch } from './tools.ts';

const result = await runGoogleAiSearch({
  query: 'what is the best way to cook salmon'
});


// const result = await get_unresolved_comments({}, undefined);

if (result.isError) {
  console.error('Error:', result.content[0].text);
} else {
  console.log(result.content[0].text);
}
