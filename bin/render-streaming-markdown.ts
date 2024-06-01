// usage:
//     cat README.md | deno run --allow-env --allow-read --allow-run bin/render-streaming-markdown.ts
//     

import $ from "jsr:@david/dax@0.41.0"
import { writeAllSync } from 'https://deno.land/std@v0.190.0/streams/mod.ts';

let inputBuffer = ""

const decoder = new TextDecoder()
const encoder = new TextEncoder()

for await (const chunk of Deno.stdin.readable) {
  const decoded = decoder.decode(chunk);
  inputBuffer += decoded
  // console.log("$$$$$$$$$$", decoder.decode(chunk), "$$$zzz$$$")

  // --style auto is there to force it to output styled https://github.com/charmbracelet/glow/blob/2430b0a/main.go#L158
  const output = await $`glow --style auto`.stdinText(decoded).text()
  writeAllSync(Deno.stdout, encoder.encode(output));
}
