import { get_unresolved_comments , fetchAsMarkdown, runGoogleAiSearch } from './tools.ts';

// const result = await runGoogleAiSearch({
//   query: 'what is the best way to cook salmon'
// });


// const result = await get_unresolved_comments({}, undefined);

const result = await fetchAsMarkdown({url: 'https://cascadiajs-2025.netlify.app/20-color-spaces/'});

if (result.isError) {
  console.error('Error:', result.content[0].text);
} else {
  console.log(result.content[0].text);
}
