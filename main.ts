// Laugh Track: The Crypto Trading Joke Contest — v2 entry
// Competition: u-alfasurya91-laugh-track-the-crypto-trading-joke-a454158a
//
// The entry is one trading joke, written to
// $MAKEFUN_OUTPUT_DIR/entry.txt (falling back to /output).
//
// The joke (136 characters, 136 bytes UTF-8, one line):
//   "I bought the dip, then the dip dipped, then the dip's dip
//    dipped. My portfolio is now a support group for coins that
//    will never recover."
// Why it should land: "buy the dip" is the one piece of trading
// advice every crypto trader has heard and followed. The setup
// repeats the dip three times, each one lower than the last, so
// the fall keeps accelerating. The payoff reframes the wrecked
// portfolio as a support group — the coins are not investments
// any more, they are patients, and recovery is never coming.
// The punchline sits at the very end, and a trader who has
// caught a falling knife will recognise themselves in it.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY =
  "I bought the dip, then the dip dipped, then the dip's dip dipped. My portfolio is now a support group for coins that will never recover.";

// Everything below is about the gate, not the joke: the entry must
// be one line of 1-200 characters and contain real text.
function fail(message: string): never {
  throw new Error(`entry rejected: ${message}`);
}

function checkEntry(text: string): void {
  const trimmed = text.trim();
  if (trimmed.length === 0) fail("entry is empty or only whitespace");
  if (text.length > 200) {
    fail(`entry is ${text.length} characters, over the 200 limit`);
  }
  if (text.length < 1) fail("entry is shorter than 1 character");
  if (/[\r\n]/.test(text)) fail("entry must be a single line");
}

checkEntry(ENTRY);

// The output directory comes from the environment. The source file's
// own location is resolved from import.meta.url so nothing here
// depends on the directory the grader happens to run from.
const sourceDir = dirname(fileURLToPath(import.meta.url));
if (!existsSync(sourceDir)) fail("cannot locate this program's directory");

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entryPath = resolve(outputDir, "entry.txt");
mkdirSync(outputDir, { recursive: true });
writeFileSync(entryPath, ENTRY, "utf8");

// Read the file back and refuse to finish silently if what landed
// on disk is not byte-for-byte the entry we validated above.
if (readFileSync(entryPath, "utf8") !== ENTRY) {
  fail("entry.txt on disk does not match the validated entry");
}
