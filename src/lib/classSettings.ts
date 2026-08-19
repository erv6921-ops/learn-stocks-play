// Per-class teacher controls. Stored as a jsonb blob in public.class_settings
// (one row per class), edited by the teacher on their dashboard and enforced in
// the student app (nav visibility, route guards, per-question time limit).
//
// Everything is opt-in restrictive: the DEFAULT is "nothing locked, no timer",
// so a class with no settings row behaves exactly as before.

// Pages a teacher can switch off for students. Dashboard and Missions (lessons)
// are intentionally not lockable - they're the core of the app. `route` is the
// path prefix used for nav hiding + route guarding; `nav` matches GameNav's `to`.
export interface ControllablePage {
  key: string
  label: string
  route: string
}

export const CONTROLLABLE_PAGES: ControllablePage[] = [
  { key: "lab", label: "Lab", route: "/lab" },
  { key: "stocks", label: "Stocks", route: "/stocks" },
  { key: "micro-business", label: "Business", route: "/micro-business" },
  { key: "bank", label: "Bank", route: "/bank" },
  { key: "progress", label: "Progress", route: "/progress" },
  { key: "leaderboard", label: "Leaderboard", route: "/leaderboard" },
  { key: "challenges", label: "Challenges", route: "/challenges" },
  { key: "partners", label: "Find Partners", route: "/partners" },
  { key: "daily", label: "Daily Challenge", route: "/daily" },
]

export interface ClassSettings {
  // Page keys (from CONTROLLABLE_PAGES) the students in this class may NOT open.
  lockedPages: string[]
  // Seconds a student gets to answer each quiz question. 0 / null = untimed.
  secondsPerQuestion: number | null
  // Hide dollar/coin balances and the leaderboard ranking from students.
  hideLeaderboardRank: boolean
  // Require lessons to be done in assigned order (no skipping ahead).
  enforceAssignedOrder: boolean
}

export const DEFAULT_CLASS_SETTINGS: ClassSettings = {
  lockedPages: [],
  secondsPerQuestion: null,
  hideLeaderboardRank: false,
  enforceAssignedOrder: false,
}

// Tolerant parse of whatever is in the jsonb column (older/partial rows).
export function normalizeClassSettings(raw: unknown): ClassSettings {
  const r = (raw ?? {}) as Partial<ClassSettings>
  const secs = Number(r.secondsPerQuestion)
  return {
    lockedPages: Array.isArray(r.lockedPages) ? r.lockedPages.filter((x) => typeof x === "string") : [],
    secondsPerQuestion: Number.isFinite(secs) && secs > 0 ? Math.round(secs) : null,
    hideLeaderboardRank: !!r.hideLeaderboardRank,
    enforceAssignedOrder: !!r.enforceAssignedOrder,
  }
}

// A student may belong to more than one class; combine settings into the most
// restrictive result (a page is locked if ANY class locks it; the timer is the
// shortest set across classes).
export function mergeClassSettings(list: ClassSettings[]): ClassSettings {
  if (list.length === 0) return DEFAULT_CLASS_SETTINGS
  const lockedPages = Array.from(new Set(list.flatMap((s) => s.lockedPages)))
  const timers = list.map((s) => s.secondsPerQuestion).filter((n): n is number => !!n)
  return {
    lockedPages,
    secondsPerQuestion: timers.length ? Math.min(...timers) : null,
    hideLeaderboardRank: list.some((s) => s.hideLeaderboardRank),
    enforceAssignedOrder: list.some((s) => s.enforceAssignedOrder),
  }
}

export const isPageLocked = (settings: ClassSettings, route: string): boolean =>
  CONTROLLABLE_PAGES.some((p) => settings.lockedPages.includes(p.key) && route.startsWith(p.route))
