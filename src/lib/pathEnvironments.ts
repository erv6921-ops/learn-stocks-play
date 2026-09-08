// Environment tier system for the vertical lesson path (LessonPath.tsx).
//
// Jeff climbs from underground to space as the student advances up the track.
// The number of environments is NOT tied to a fixed unit count — the whole
// point is that a track may have 1 unit (gulliver: 8 lessons) or 35 units
// (regular: 302 lessons). We map a *position along the track* to one of a
// fixed, ordered palette of tiers and interpolate across whatever the real
// track size is.
//
// This module owns ONLY the tier math + palette tokens. Actual scene rendering
// lives in a separate, swappable component registry (pathScenes.tsx) keyed by
// tier index, so illustrated assets can replace the procedural placeholder art
// later without touching any path/progress logic.

export const TIER_NAMES = [
  "sewer",
  "street level",
  "building interior",
  "rooftop",
  "clouds",
  "upper atmosphere",
  "orbit",
  "deep space",
] as const;

export type TierIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export const TIER_COUNT = TIER_NAMES.length; // 8

/** Per-tier ambient palette. Dark/damp at the bottom → bright mid → deep navy
 *  + stars at the top. Each tier is theme-agnostic (these are the scene's own
 *  colors, painted behind the path regardless of the app's light/dark theme;
 *  node/label contrast is handled separately with an adaptive scrim). */
export interface TierPalette {
  /** vertical background gradient stops, bottom→top */
  sky: [string, string];
  /** silhouette / mid-layer fill */
  mid: string;
  /** foreground detail accent */
  fg: string;
  /** subtle glow/ambient light color */
  glow: string;
  /** true once we're high enough for stars to show */
  stars: boolean;
  /** how much to darken the scrim behind nodes for legibility (0..1) */
  scrim: number;
}

const PALETTES: Record<number, TierPalette> = {
  0: { sky: ["#0b0f0d", "#14231c"], mid: "#1c2b22", fg: "#2f4a3a", glow: "#3ba776", stars: false, scrim: 0.15 }, // sewer — dark, damp
  1: { sky: ["#1b2620", "#33463a"], mid: "#3d5245", fg: "#5c7a66", glow: "#8fd6a8", stars: false, scrim: 0.12 }, // street level, night-ish
  2: { sky: ["#33463a", "#5b6f57"], mid: "#6d8467", fg: "#93ab84", glow: "#cfe6b2", stars: false, scrim: 0.10 }, // building interior, warmer
  3: { sky: ["#6f8f76", "#9cc0a0"], mid: "#b7d2b3", fg: "#dceccf", glow: "#fff3c4", stars: false, scrim: 0.06 }, // rooftop — bright, open
  4: { sky: ["#a7cbe6", "#d9ecf7"], mid: "#eaf4fb", fg: "#ffffff", glow: "#ffffff", stars: false, scrim: 0.04 }, // clouds — brightest
  5: { sky: ["#5b83b8", "#a7cbe6"], mid: "#7fa3cf", fg: "#cfe0f2", glow: "#eaf4fb", stars: false, scrim: 0.08 }, // upper atmosphere
  6: { sky: ["#1b2a52", "#3a5490"], mid: "#2c3f6e", fg: "#6d86bd", glow: "#9fc0ff", stars: true, scrim: 0.14 },  // orbit — deep blue, stars begin
  7: { sky: ["#05060f", "#111634"], mid: "#1a1f45", fg: "#3a4488", glow: "#aab6ff", stars: true, scrim: 0.18 },  // deep space — near-black + stars
};

export function tierPalette(tier: number): TierPalette {
  return PALETTES[clampTier(tier)];
}

export function clampTier(t: number): TierIndex {
  return Math.max(0, Math.min(TIER_COUNT - 1, Math.round(t))) as TierIndex;
}

/** Continuous position (0 at the bottom of the track, 1 at the top) → tier. */
export function tierForFraction(fraction: number): TierIndex {
  const f = Math.max(0, Math.min(1, fraction));
  return clampTier(f * (TIER_COUNT - 1));
}

/**
 * Spec interface: map a unit's index → environment tier, interpolating across
 * however many units the track actually has.
 *
 * Degenerate case: a single-unit track (gulliver = 1 unit, ib = 1 unit) can't
 * span the palette by unit index alone, so the caller should fall back to
 * per-lesson interpolation (see `tierForNode`). We return tier 0 here and let
 * `tierForNode` own that fallback so this function stays pure to its name.
 */
export function tierForUnit(unitIndex: number, unitCount: number): TierIndex {
  if (unitCount <= 1) return 0;
  return tierForFraction(unitIndex / (unitCount - 1));
}

/**
 * The tier a given path node sits in. Multi-unit tracks tier BY UNIT (so a
 * whole unit shares one environment and tiers change at unit boundaries).
 * Single-unit tracks tier BY LESSON so Jeff still ascends sewer→space across
 * the lone unit — otherwise the environment would never change for gulliver.
 */
export function tierForNode(args: {
  unitIndex: number;
  unitCount: number;
  globalLessonIndex: number;
  totalLessons: number;
}): TierIndex {
  const { unitIndex, unitCount, globalLessonIndex, totalLessons } = args;
  if (unitCount > 1) return tierForUnit(unitIndex, unitCount);
  if (totalLessons <= 1) return 0;
  return tierForFraction(globalLessonIndex / (totalLessons - 1));
}

/**
 * Blend factor (0..1) for how far a node is INTO its own tier band, used to
 * cross-fade adjacent scenes at boundaries so there are no hard seams. 0 means
 * "just entered this tier", 1 means "about to cross into the next".
 */
export function tierBlend(fraction: number): number {
  const scaled = Math.max(0, Math.min(1, fraction)) * (TIER_COUNT - 1);
  return scaled - Math.floor(scaled);
}

/** Linear color mix between two hex colors (for boundary cross-fades). */
export function mixHex(a: string, b: string, t: number): string {
  const pa = hexToRgb(a);
  const pb = hexToRgb(b);
  const m = (x: number, y: number) => Math.round(x + (y - x) * Math.max(0, Math.min(1, t)));
  return `rgb(${m(pa[0], pb[0])}, ${m(pa[1], pb[1])}, ${m(pa[2], pb[2])})`;
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const v = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)];
}
