// CI guard: fails (exit 1) if any of the de-bias hedge phrases have crept back
// into src/data. Pairs with scripts/strip-distractor-padding.ts, which removes
// them. Wire-up: `npm run check:distractors`.
//
//   node scripts/check-distractor-padding.ts
//
// Runs directly under Node >= 22.18 (built-in TypeScript type stripping).

import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { HEDGE_PHRASES } from "./strip-distractor-padding.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_DIR = path.join(ROOT, "src/data");

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function main() {
  const offenders: { file: string; phrase: string; count: number }[] = [];

  const files = readdirSync(DATA_DIR).filter((f) => f.endsWith(".ts"));
  for (const f of files) {
    const text = readFileSync(path.join(DATA_DIR, f), "utf8");
    for (const phrase of HEDGE_PHRASES) {
      const count = (text.match(new RegExp(escapeRegex(phrase), "gi")) || []).length;
      if (count > 0) offenders.push({ file: f, phrase, count });
    }
  }

  if (offenders.length === 0) {
    console.log("✓ No distractor padding found in src/data.");
    return;
  }

  console.error("✗ Distractor padding detected in src/data:\n");
  for (const o of offenders) {
    console.error(`  ${o.file}: "${o.phrase}" ×${o.count}`);
  }
  console.error("\nRun `node scripts/strip-distractor-padding.ts` to remove it.");
  process.exit(1);
}

main();
