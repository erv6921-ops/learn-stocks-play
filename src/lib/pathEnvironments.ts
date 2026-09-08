// Environment tier system for the vertical lesson path (LessonPath.tsx).
//
// Jeff climbs from underground to deep space as the student advances up the
// track. Each UNIT is its own climbing stage: on a multi-unit track (regular /
// personal finance = 35 units) the unit index maps continuously across the
// biome gradient, so every unit sits at a visibly different altitude and the
// scene changes as you cross a unit boundary. Single-unit tracks (gulliver,
// ib) fall back to per-lesson interpolation so they still ascend.
//
// This module owns ONLY the tier math + palette tokens. Scene rendering lives
// in a separate, swappable component registry (pathScenes.tsx) keyed by tier,
// so illustrated assets can replace the procedural placeholder art without
// touching path/progress logic.

// 12 biomes, bottom → top. Finer-grained than a simple 8 so a 35-unit climb
// reads as many distinct stages (≈3 units per biome) with a warm sunset beat
// in the middle before breaking into the sky.
export const TIER_NAMES = [
  "the sewers",
  "the underground",
  "street level",
  "downtown",
  "the tower",
  "the rooftops",
  "the skyline",
  "the clouds",
  "the jet stream",
  "the stratosphere",
  "low orbit",
  "deep space",
] as const;

export type TierIndex = number;
export const TIER_COUNT = TIER_NAMES.length; // 12

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

const PALETTES: TierPalette[] = [
  { sky: ["#080b0a", "#101c17"], mid: "#18251e", fg: "#2c4438", glow: "#37a06e", stars: false, scrim: 0.16 }, // 0 sewers
  { sky: ["#0f1613", "#1f2b24"], mid: "#26362e", fg: "#3a5145", glow: "#6fae8f", stars: false, scrim: 0.14 }, // 1 underground
  { sky: ["#15211b", "#2c3d33"], mid: "#36493d", fg: "#54705d", glow: "#ffd98a", stars: false, scrim: 0.12 }, // 2 street (night, warm lamps)
  { sky: ["#3a5145", "#6f9078"], mid: "#7d9a84", fg: "#a6c1a9", glow: "#ffe9a8", stars: false, scrim: 0.09 }, // 3 downtown (day)
  { sky: ["#5b7360", "#93ab84"], mid: "#a7bd94", fg: "#d0e0b6", glow: "#fff0c0", stars: false, scrim: 0.07 }, // 4 tower interior
  { sky: ["#7f9f86", "#b8d2b3"], mid: "#c8ddc2", fg: "#e6f2da", glow: "#fff3c4", stars: false, scrim: 0.05 }, // 5 rooftops
  { sky: ["#e0995a", "#f6c98b"], mid: "#cf9463", fg: "#ffe2b4", glow: "#ffd39a", stars: false, scrim: 0.06 }, // 6 skyline (sunset)
  { sky: ["#a7cbe6", "#dcecf7"], mid: "#eaf4fb", fg: "#ffffff", glow: "#ffffff", stars: false, scrim: 0.04 }, // 7 clouds (brightest)
  { sky: ["#78a6d6", "#bcd8ef"], mid: "#a7c6e6", fg: "#ffffff", glow: "#eaf4fb", stars: false, scrim: 0.06 }, // 8 jet stream
  { sky: ["#3f68a8", "#8fb4dc"], mid: "#5f86bd", fg: "#cfe0f2", glow: "#eaf4fb", stars: false, scrim: 0.09 }, // 9 stratosphere
  { sky: ["#16224a", "#37508c"], mid: "#26386a", fg: "#6d86bd", glow: "#9fc0ff", stars: true, scrim: 0.14 },  // 10 low orbit
  { sky: ["#04050d", "#0f1430"], mid: "#171d42", fg: "#3a4488", glow: "#aab6ff", stars: true, scrim: 0.18 },  // 11 deep space
];

export function tierPalette(tier: number): TierPalette {
  return PALETTES[clampTier(tier)];
}

export function clampTier(t: number): number {
  return Math.max(0, Math.min(TIER_COUNT - 1, Math.round(t)));
}

/** Continuous position (0 at the bottom of the track, 1 at the top) → float tier. */
export function tierFloatForFraction(fraction: number): number {
  const f = Math.max(0, Math.min(1, fraction));
  return f * (TIER_COUNT - 1);
}

/**
 * Spec interface: map a unit's index → environment tier, interpolating across
 * however many units the track has. Returns a FLOAT so a 35-unit track spreads
 * smoothly across all 12 biomes (each unit its own altitude). Single-unit
 * tracks return 0 here; `tierForNode` owns the per-lesson fallback.
 */
export function tierFloatForUnit(unitIndex: number, unitCount: number): number {
  if (unitCount <= 1) return 0;
  return tierFloatForFraction(unitIndex / (unitCount - 1));
}

/**
 * The (float) tier a given path node sits in. Multi-unit tracks tier BY UNIT
 * (a whole unit shares one altitude; the scene changes at unit boundaries).
 * Single-unit tracks tier BY LESSON so Jeff still ascends across the lone unit.
 */
export function tierForNode(args: {
  unitIndex: number;
  unitCount: number;
  globalLessonIndex: number;
  totalLessons: number;
}): number {
  const { unitIndex, unitCount, globalLessonIndex, totalLessons } = args;
  if (unitCount > 1) return tierFloatForUnit(unitIndex, unitCount);
  if (totalLessons <= 1) return 0;
  return tierFloatForFraction(globalLessonIndex / (totalLessons - 1));
}

/** Human-readable stage name for a unit, e.g. "the rooftops". */
export function stageName(tier: number): string {
  return TIER_NAMES[clampTier(tier)];
}

/**
 * Blend factor (0..1) for how far a node is INTO its own tier band, used to
 * cross-fade adjacent scenes at boundaries so there are no hard seams.
 */
export function tierBlend(tierFloat: number): number {
  return tierFloat - Math.floor(tierFloat);
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
