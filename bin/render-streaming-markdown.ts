// usage:
//     cat README.md | deno run --allow-env --allow-read --allow-run bin/render-streaming-markdown.ts
//     

import $ from 'jsr:@david/dax@0.41.0'
// todo: replace dax with this:
// import { exec } from 'https://deno.land/std/process.mod.ts';
import { writeAllSync } from 'https://deno.land/std@v0.190.0/streams/mod.ts';

let inputBuffer = ""

const decoder = new TextDecoder()
const encoder = new TextEncoder()

// This style works well for prompt..  but not chat
for await (const chunk of Deno.stdin.readable) {
  // show immediately, but meanwhile…
  writeAllSync(Deno.stdout, chunk);
  // Collect it.
  inputBuffer += decoder.decode(chunk);
}

// and now re-render it.
if (inputBuffer) {
  console.log('⬇️… and now rendered…⬇️');
  const output = await $`glow --style auto`.stdinText(inputBuffer).text()
  writeAllSync(Deno.stdout, encoder.encode(output));
}


// This is a newline-buffered variant to avoid getting extra newlines in the output because we send it to glow too eagerly
// it works but... the next problem is backtick codeblocks are broken up and... i'm sure there's more.
//   definitely need a better solution
 
// let remainingContent = '';
// for await (const chunk of Deno.stdin.readable) {
//   const decoded = remainingContent + decoder.decode(chunk);

//   const lastNewline = decoded.lastIndexOf("\n");
//   if (lastNewline !== -1) {
//     // Flush everything up to it
//     const output = await $`glow --style auto`.stdinText(decoded.substring(0, lastNewline + 1)).text()
//     writeAllSync(Deno.stdout, encoder.encode(output));

//     // Hold onto the remaining content to flush with the next chunk
//     remainingContent = decoded.substring(lastNewline + 1);
//   }
// }

// // Flush any remaining content
// if (remainingContent) {
//   const output = await $`glow --style auto`.stdinText(remainingContent).text()
//   writeAllSync(Deno.stdout, encoder.encode(output));
// }
