// Two-Sentence Horror — make.fun entry
// u-suroto-two-sentence-horror-acea9253
//
// Writes one original two-sentence horror story to entry.txt.
// The story is a fixed string: the program takes no input, makes no
// network call and makes no model call, so every run writes the same
// bytes. The grader reads entry.txt and gates it at 1-400 characters
// of UTF-8 text.
//
// Output directory: the grader mounts it at /output and names it in
// MAKEFUN_OUTPUT_DIR; locally, set MAKEFUN_OUTPUT_DIR to test without
// touching /output. With the variable unset the path is /output, as
// the rules state.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The story. Sentence one sets the impossible fact; sentence two
// reframes it: the cause of death is not a disease or an accident,
// it is that something has been there all along, waiting to be
// noticed — and now it knows it has been.
const STORY =
  "This morning's paper printed my obituary, dated three days from now, " +
  "with a photograph of me smiling beside my own coffin. " +
  "Under 'cause of death', it says only: 'He finally noticed.'";

// A sentence ends on . ! or ? followed by an optional closing quote
// and then whitespace or the end of the text.
const SENTENCE_END = /[.!?]['"’”)]*(?=\s|$)/g;
const MAX_CHARS = 400;

const sentenceCount = (STORY.match(SENTENCE_END) ?? []).length;
if (sentenceCount !== 2) {
  throw new Error(`story must be exactly two sentences, found ${sentenceCount}`);
}
if ([...STORY].length > MAX_CHARS) {
  throw new Error(`story must be at most ${MAX_CHARS} characters`);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, STORY + "\n", "utf8");

console.log(`wrote ${outputPath} (${STORY.length} characters)`);
