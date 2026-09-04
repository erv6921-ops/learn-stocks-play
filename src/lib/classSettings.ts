// Per-class teacher controls. Stored as a jsonb blob in public.class_settings
// (one row per class), edited by the teacher on their dashboard and enforced in
// the student app (nav visibility, route guards, per-question time limit,
// which curriculum tracks are visible).
//
// Everything is opt-in restrictive: the DEFAULT is "nothing locked, no timer,
// every track on", so a class with no settings row behaves exactly as before.

import { CourseTrack } from "@/types"

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
  { key: "homework", label: "Homework", route: "/homework" },
  { key: "partners", label: "Find Partners", route: "/partners" },
  { key: "daily", label: "Daily Challenge", route: "/daily" },
]

// MODIFIED: Curriculum tracks a teacher can switch on/off for a whole class.
// `key` is the stable JSON key stored in class_settings.settings.tracksEnabled;
// `track` maps it to the Lessons page's CourseTrack view so a disabled key
// simply hides that track's tab. AP Micro and Biz Lab are intentionally NOT
// listed here - they stay always-available and are unaffected by this control.
export interface TrackToggle {
  key: string
  label: string
  track: CourseTrack
}

export const TOGGLEABLE_TRACKS: TrackToggle[] = [
  { key: "personal-finance", label: "Personal Finance", track: "regular" },
  { key: "gulliver-intro", label: "Gulliver Intro to Business", track: "gulliver-intro" },
  { key: "ib-econ", label: "IB Economics", track: "ib-econ" },
]

// Every track enabled - the permissive default used when a class has no
// settings row yet (or a row that predates this feature).
const allTracksEnabled = (): Record<string, boolean> =>
  Object.fromEntries(TOGGLEABLE_TRACKS.map((t) => [t.key, true]))

export interface ClassSettings {
  // Page keys (from CONTROLLABLE_PAGES) the students in this class may NOT open.
  lockedPages: string[]
  // Seconds a student gets to answer each quiz question. 0 / null = untimed.
  secondsPerQuestion: number | null
  // Hide dollar/coin balances and the leaderboard ranking from students.
  hideLeaderboardRank: boolean
  // Require lessons to be done in assigned order (no skipping ahead).
  enforceAssignedOrder: boolean
  // MODIFIED: which curriculum tracks students in this class may see. Keyed by
  // TrackToggle.key; a missing key means "enabled" (so older rows stay open).
  tracksEnabled: Record<string, boolean>
}

export const DEFAULT_CLASS_SETTINGS: ClassSettings = {
  lockedPages: [],
  secondsPerQuestion: null,
  hideLeaderboardRank: false,
  enforceAssignedOrder: false,
  tracksEnabled: allTracksEnabled(), // MODIFIED
}

// Tolerant parse of whatever is in the jsonb column (older/partial rows).
export function normalizeClassSettings(raw: unknown): ClassSettings {
  const r = (raw ?? {}) as Partial<ClassSettings>
  const secs = Number(r.secondsPerQuestion)
  // MODIFIED: a missing track key reads as enabled, so rows written before this
  // feature (no tracksEnabled at all) leave every track visible.
  const rawTracks = (r.tracksEnabled ?? {}) as Record<string, unknown>
  const tracksEnabled = Object.fromEntries(
    TOGGLEABLE_TRACKS.map((t) => [t.key, rawTracks[t.key] !== false])
  )
  return {
    lockedPages: Array.isArray(r.lockedPages) ? r.lockedPages.filter((x) => typeof x === "string") : [],
    secondsPerQuestion: Number.isFinite(secs) && secs > 0 ? Math.round(secs) : null,
    hideLeaderboardRank: !!r.hideLeaderboardRank,
    enforceAssignedOrder: !!r.enforceAssignedOrder,
    tracksEnabled, // MODIFIED
  }
}

// A student may belong to more than one class; combine settings into the most
// restrictive result (a page is locked if ANY class locks it; the timer is the
// shortest set across classes).
export function mergeClassSettings(list: ClassSettings[]): ClassSettings {
  if (list.length === 0) return DEFAULT_CLASS_SETTINGS
  const lockedPages = Array.from(new Set(list.flatMap((s) => s.lockedPages)))
  const timers = list.map((s) => s.secondsPerQuestion).filter((n): n is number => !!n)
  // MODIFIED: most-restrictive merge - a track is visible only if EVERY class
  // the student belongs to leaves it enabled.
  const tracksEnabled = Object.fromEntries(
    TOGGLEABLE_TRACKS.map((t) => [t.key, list.every((s) => s.tracksEnabled[t.key] !== false)])
  )
  return {
    lockedPages,
    secondsPerQuestion: timers.length ? Math.min(...timers) : null,
    hideLeaderboardRank: list.some((s) => s.hideLeaderboardRank),
    enforceAssignedOrder: list.some((s) => s.enforceAssignedOrder),
    tracksEnabled, // MODIFIED
  }
}

export const isPageLocked = (settings: ClassSettings, route: string): boolean =>
  CONTROLLABLE_PAGES.some((p) => settings.lockedPages.includes(p.key) && route.startsWith(p.route))

// MODIFIED: is a given CourseTrack visible under these class settings? Tracks
// not managed by TOGGLEABLE_TRACKS (AP Micro, Biz Lab) are always visible.
export const isTrackEnabled = (settings: ClassSettings, track: CourseTrack): boolean => {
  const toggle = TOGGLEABLE_TRACKS.find((t) => t.track === track)
  if (!toggle) return true
  return settings.tracksEnabled[toggle.key] !== false
}
