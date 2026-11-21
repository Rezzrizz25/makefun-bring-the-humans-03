// makefun-bring-the-humans-03 — entry program (Node 22, standard library only).
//
// What this entry is: an original vertical TikTok ad for make.fun, made
// with Remotion (code-drawn frames, no AI video). The ad is posted publicly
// on TikTok from a public account, its caption carrying the bounty's line
// and our play code; VIDEO.json names that TikTok post, and the house reads
// the post's views from TikTok to score it.
//
// What this program does: one small, honest job. It copies VIDEO.json from
// the repository root into the output directory, because that is where the
// gate looks for it — the sealed scorer reads the link file from /output,
// not from the repo. Nothing else is written, nothing is fetched, and no
// network is touched. If the copy cannot happen, the program says so and
// exits non-zero instead of pretending the entry is ready.
//
// The two directories come from the environment, so the same file works
// inside the grader's container and on a laptop:
//   MAKEFUN_BOT_DIR     — where the repo is mounted (default /bot)
//   MAKEFUN_OUTPUT_DIR  — where the gate reads the link file (default /output)
// Local check:
//   MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// and then out/VIDEO.json should hold the TikTok URL.

import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Where the entry lives, and where the gate expects its link file.
const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const SOURCE = join(BOT_DIR, "VIDEO.json");
const TARGET = join(OUTPUT_DIR, "VIDEO.json");

// The output directory may not exist yet; make it before copying.
mkdirSync(OUTPUT_DIR, { recursive: true });

// Refuse a placeholder or a broken link file early: a VIDEO.json that
// still names the @<handle> placeholder, or that is not valid JSON, would
// only fail later at the gate, silently — and a silent failure at the gate
// is the worst kind, because the entry looks submitted while it is not.
// Fail here, loudly, while there is still time to post the video.
if (!existsSync(SOURCE)) {
  console.error(`VIDEO.json not found in ${BOT_DIR} — nothing to hand to the gate.`);
  process.exit(1);
}

let videoUrl: string;
try {
  const parsed = JSON.parse(readFileSync(SOURCE, "utf8")) as { url?: unknown };
  if (typeof parsed.url !== "string" || parsed.url.length === 0) {
    throw new Error("VIDEO.json has no string 'url' field");
  }
  if (parsed.url.includes("<handle>") || parsed.url.includes("<id>")) {
    throw new Error("VIDEO.json still holds the placeholder URL — post the TikTok first");
  }
  videoUrl = parsed.url;
} catch (err) {
  console.error(`VIDEO.json in ${BOT_DIR} is not usable: ${(err as Error).message}`);
  process.exit(1);
}

try {
  // Copying a file onto itself is a no-op that hides a misconfiguration
  // (bot dir and output dir pointing at the same place), so say so.
  if (SOURCE === TARGET) {
    console.log(`VIDEO.json already in place at ${TARGET} (${videoUrl})`);
  } else {
    copyFileSync(SOURCE, TARGET);
    console.log(`Entry link handed over: ${videoUrl} -> ${TARGET}`);
  }
} catch (err) {
  console.error(`Could not copy VIDEO.json to ${OUTPUT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
