// Regenerates the LESSON_CATALOG constant embedded in
// supabase/functions/jeff-chat/index.ts from the real catalog in
// src/data/lessons.ts (+ apMicro.ts), so the "Chat with Jeff" tutor can only
// recommend lessons that exist.
//
//   npm run generate:jeff-catalog    rewrite the block in place
//   npm run check:jeff-catalog       warn (exit 0) if the block is stale;
//                                    wired as `prebuild`, so `npm run build`
//                                    prints the warning but never fails on it
//
// Why this exists: Supabase edge functions run on Deno and cannot resolve the
// Vite "@/" alias that src/data/lessons.ts uses, so the function carries a
// generated snapshot. This script bundles the catalog with esbuild (already
// installed as a dependency of vite; nothing new to install) with the alias
// resolved, evaluates it, and splices the result between the
// BEGIN/END GENERATED LESSON_CATALOG markers.
//
// Runs directly under Node >= 22.18 (built-in TypeScript type stripping):
//   node scripts/generate-jeff-lesson-catalog.ts [--check]

import * as esbuild from "esbuild";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TARGET = path.join(ROOT, "supabase/functions/jeff-chat/index.ts");
const TARGET_REL = path.relative(ROOT, TARGET);
const BEGIN = "  // BEGIN GENERATED LESSON_CATALOG";
const END = "  // END GENERATED LESSON_CATALOG";
const MAX_DESC = 110;

interface CatalogLesson {
  lesson_id: string;
  title: string;
  track: string;
  unit: string;
  description: string;
}

// ---------------------------------------------------------------------------
// Load the live catalog by bundling src/data/lessons.ts with "@/" resolved.
// ---------------------------------------------------------------------------

async function loadCatalog(): Promise<CatalogLesson[]> {
  const dir = mkdtempSync(path.join(tmpdir(), "jeff-catalog-"));
  const entry = path.join(dir, "entry.ts");
  const bundle = path.join(dir, "bundle.cjs");
  writeFileSync(
    entry,
    `import { lessons, unitInfo } from "@/data/lessons";
const unitTitle = Object.fromEntries(unitInfo.map((u) => [u.id, u.title]));
export default lessons.map((l) => ({
  lesson_id: l.id,
  title: l.title,
  track: l.track ?? "regular",
  unit: unitTitle[l.unitId] ?? l.unitId,
  description: l.description ?? "",
}));
`,
  );
  try {
    await esbuild.build({
      entryPoints: [entry],
      bundle: true,
      platform: "node",
      format: "cjs",
      outfile: bundle,
      logLevel: "error",
      absWorkingDir: ROOT,
      alias: { "@": path.join(ROOT, "src") },
      loader: { ".png": "dataurl", ".svg": "dataurl", ".jpg": "dataurl", ".jpeg": "dataurl", ".webp": "dataurl" },
    });
    const mod = createRequire(import.meta.url)(bundle) as { default?: unknown };
    const catalog = mod.default;
    if (!Array.isArray(catalog)) throw new Error("catalog bundle did not export an array");
    return catalog as CatalogLesson[];
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function validate(catalog: CatalogLesson[], targetSrc: string): void {
  const ids = new Set<string>();
  for (const l of catalog) {
    if (!l.lesson_id || !l.title) throw new Error(`lesson with missing id/title: ${JSON.stringify(l)}`);
    if (ids.has(l.lesson_id)) throw new Error(`duplicate lesson id in src/data/lessons.ts: ${l.lesson_id}`);
    ids.add(l.lesson_id);
  }
  // Every track in the catalog must be one the edge function knows how to
  // scope (type CatalogTrack + TRACK_VISIBILITY), or the tutor would silently
  // never recommend those lessons — and tsc would reject the literal anyway.
  const union = /type CatalogTrack = ([^;]+);/.exec(targetSrc)?.[1] ?? "";
  const known = new Set(Array.from(union.matchAll(/"([^"]+)"/g), (m) => m[1]));
  const unknown = [...new Set(catalog.map((l) => l.track))].filter((t) => !known.has(t));
  if (unknown.length) {
    throw new Error(
      `catalog uses track(s) ${unknown.map((t) => `"${t}"`).join(", ")} that ${TARGET_REL} does not know. ` +
        `Add them to \`type CatalogTrack\` and TRACK_VISIBILITY there, then re-run.`,
    );
  }
}

// ---------------------------------------------------------------------------
// Render + splice
// ---------------------------------------------------------------------------

function trimDesc(d: string): string {
  const t = d.trim().replace(/\s+/g, " ");
  return t.length > MAX_DESC ? t.slice(0, MAX_DESC - 3).trimEnd() + "..." : t;
}

function render(catalog: CatalogLesson[]): string {
  const q = (s: string) => JSON.stringify(s);
  const lines: string[] = [];
  let group = "";
  for (const l of catalog) {
    const g = `${l.track} · ${l.unit}`;
    if (g !== group) {
      group = g;
      lines.push(`  // ${g}`);
    }
    lines.push(
      `  { lesson_id: ${q(l.lesson_id)}, title: ${q(l.title)}, track: ${q(l.track)}, unit: ${q(l.unit)}, description: ${q(trimDesc(l.description))} },`,
    );
  }
  return lines.join("\n");
}

function findBlock(src: string): { start: number; end: number; body: string } {
  const b = src.indexOf(BEGIN);
  const e = src.indexOf(END);
  if (b < 0 || e < 0 || e < b) {
    throw new Error(`could not find the BEGIN/END GENERATED LESSON_CATALOG markers in ${TARGET_REL}`);
  }
  const start = src.indexOf("\n", b) + 1; // first line after BEGIN
  return { start, end: e, body: src.slice(start, e) };
}

function countEmbedded(body: string): number {
  return body.split("\n").filter((line) => /^\s*\{ lesson_id: /.test(line)).length;
}

function banner(lines: string[]): string {
  const bar = "!".repeat(78);
  return ["", bar, ...lines.map((l) => `!!  ${l}`), bar, ""].join("\n");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const check = process.argv.includes("--check");
  const targetSrc = readFileSync(TARGET, "utf8");
  const block = findBlock(targetSrc);
  const catalog = await loadCatalog();
  validate(catalog, targetSrc);
  const fresh = render(catalog);

  if (check) {
    const embedded = countEmbedded(block.body);
    if (embedded !== catalog.length) {
      console.warn(banner([
        `Jeff tutor lesson catalog is STALE: ${TARGET_REL}`,
        `embeds ${embedded} lessons but src/data/lessons.ts has ${catalog.length}.`,
        `Jeff may recommend lessons that no longer exist, or miss new ones.`,
        `Run:  npm run generate:jeff-catalog`,
      ]));
    } else if (block.body.trimEnd() !== fresh.trimEnd()) {
      console.warn(banner([
        `Jeff tutor lesson catalog differs from src/data/lessons.ts`,
        `(same count, but titles/units/descriptions changed).`,
        `Run:  npm run generate:jeff-catalog`,
      ]));
    } else {
      console.log(`✓ Jeff tutor lesson catalog is current (${catalog.length} lessons).`);
    }
    return;
  }

  if (block.body.trimEnd() === fresh.trimEnd()) {
    console.log(`Jeff tutor lesson catalog already current (${catalog.length} lessons); ${TARGET_REL} unchanged.`);
    return;
  }
  const next = targetSrc.slice(0, block.start) + fresh + "\n" + targetSrc.slice(block.end);
  writeFileSync(TARGET, next);
  console.log(`Wrote ${catalog.length} lessons into ${TARGET_REL} (was ${countEmbedded(block.body)}).`);
}

main().catch((err) => {
  const check = process.argv.includes("--check");
  const msg = err instanceof Error ? err.message : String(err);
  if (check) {
    // Warning only: a broken check must never fail `npm run build`.
    console.warn(banner([`Could not verify the Jeff tutor lesson catalog: ${msg}`, `Run:  npm run generate:jeff-catalog`]));
    process.exit(0);
  }
  console.error(`generate-jeff-lesson-catalog: ${msg}`);
  process.exit(1);
});
