// Strips the fixed hedge phrases that an earlier "de-bias" pass appended to
// wrong answer options to pad them past the weak-distractor minimum-length
// check. The padding ("..., as a strict and unbreakable rule", etc.) made the
// correct answer obvious because it was the only option without a hedge tail.
//
//   node scripts/strip-distractor-padding.ts
//
// Removes every occurrence across src/data/*.ts (including STACKED phrases,
// e.g. "..., phraseA, phraseB"), cleans up the leftover punctuation/whitespace,
// and writes a unified before/after diff to scripts/output/distractor-strip.diff
// for review.
//
// Runs directly under Node >= 22.18 (built-in TypeScript type stripping).

import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_DIR = path.join(ROOT, "src/data");
const OUT_DIR = path.join(ROOT, "scripts/output");
const DIFF_PATH = path.join(OUT_DIR, "distractor-strip.diff");

// The hedge phrases the de-bias pass appended. The audit found ELEVEN distinct
// phrases across two padding styles:
//   1. deepBizC.ts     comma-prefixed, stackable ("..., phraseA, phraseB")
//   2. deepInvesting2.ts space-prefixed ("... according to most guides"),
//      sometimes trailed by " in the vast majority of situations"
// Keep this array in sync with scripts/check-distractor-padding.ts.
export const HEDGE_PHRASES: string[] = [
  "as a strict and unbreakable rule",
  "for essentially all companies today",
  "as many people wrongly believe",
  "in the vast majority of situations",
  "in nearly every real case",
  "according to most business textbooks",
  "under almost all normal conditions",
  "regardless of the specific circumstances",
  "without any meaningful exceptions",
  "based on common workplace assumptions",
  "according to most guides",
];

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Matches a TERMINAL run of one or more hedge phrases, each preceded by either
// a comma+whitespace (deepBizC stacking style) or plain whitespace
// (deepInvesting2 " according to most guides ..." style). The `+` consumes
// stacked phrases in a single pass; the leading separator is eaten so the stem
// keeps its own ending punctuation. Phrases are distinctive enough that a plain
// space separator does not match legitimate prose in the current corpus.
const alternation = HEDGE_PHRASES.map(escapeRegex).join("|");
const PADDING_RE = new RegExp(`(?:(?:\\s*,\\s*|\\s+)(?:${alternation}))+`, "gi");

export function stripPadding(text: string): string {
  // Because the leading separator (", " or " ") is consumed together with the
  // phrase, the stem keeps its own ending and no further cleanup is needed.
  // (Do NOT add whole-file punctuation/whitespace passes: a ",\s*\" rule would
  // eat legitimate array-element separators, and a space-collapse rule would
  // flatten indentation.)
  return text.replace(PADDING_RE, "");
}

function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const tmp = mkdtempSync(path.join(tmpdir(), "strip-"));
  const diffChunks: string[] = [];
  let changedFiles = 0;
  let totalRemoved = 0;

  const files = readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".ts"))
    .sort();

  for (const f of files) {
    const abs = path.join(DATA_DIR, f);
    const before = readFileSync(abs, "utf8");
    const matches = before.match(PADDING_RE);
    if (!matches) continue;
    // Count individual phrase occurrences for the summary.
    for (const m of matches) {
      for (const p of HEDGE_PHRASES) {
        totalRemoved += (m.match(new RegExp(escapeRegex(p), "gi")) || []).length;
      }
    }
    const after = stripPadding(before);
    if (after === before) continue;

    // Unified diff via system `diff -u` (self-contained; independent of git
    // working-tree state so parallel edits to other files don't pollute it).
    const origTmp = path.join(tmp, f);
    writeFileSync(origTmp, before);
    writeFileSync(abs, after);
    let diff = "";
    try {
      execFileSync("diff", ["-u", origTmp, abs], { encoding: "utf8" });
    } catch (e: any) {
      // diff exits 1 when files differ; that's the normal path.
      diff = e.stdout || "";
    }
    // Relabel the temp path to the real relative path for a readable diff.
    const rel = path.relative(ROOT, abs);
    diff = diff
      .replace(new RegExp(`^--- .*$`, "m"), `--- a/${rel}`)
      .replace(new RegExp(`^\\+\\+\\+ .*$`, "m"), `+++ b/${rel}`);
    diffChunks.push(diff);
    changedFiles++;
    console.log(`stripped ${f}`);
  }

  rmSync(tmp, { recursive: true, force: true });
  writeFileSync(DIFF_PATH, diffChunks.join("\n"));
  console.log(
    `\nDone. Removed ${totalRemoved} hedge-phrase occurrence(s) across ${changedFiles} file(s).`
  );
  console.log(`Diff written to ${path.relative(ROOT, DIFF_PATH)}`);
}

// Only run when invoked directly (not when imported for HEDGE_PHRASES).
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
