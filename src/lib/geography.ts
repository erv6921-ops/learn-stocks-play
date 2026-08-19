// Geography gating for the Florida-only curriculum tracks (biz_lab, gulliver_intro).
//
// Geography (a student's state) lives on profiles.state_course and is SEPARATE
// from the curriculum track (profiles.track: regular | biz_lab | gulliver_intro).
//
// IMPORTANT: grandfather anything that isn't a definite other state:
//   • NULL/empty  → "never captured" (state_course was write-only until now)
//   • a course label like "AP Financial Literacy", or any value not in
//     US_STATES → not a place, so we can't say the student is outside Florida
// In BOTH cases we treat geography as unknown and do NOT clamp or hide options.
// Only a real US state that isn't Florida disqualifies a student. Use these
// helpers everywhere (resolveTrack and the onboarding buttons) so the "unknown"
// path is grandfathered consistently.

// Canonical list of the values that count as a US state (the geography options).
// Shared with Onboarding's State/Course dropdown.
export const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia",
  "Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland",
  "Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey",
  "New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina",
  "South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming",
  "Washington D.C.",
]

export const FLORIDA = "Florida"

/**
 * True ONLY for a real US state that isn't Florida. NULL/empty, "AP Financial
 * Literacy", or any non-state value → false (unknown, treated like NULL).
 */
export function isExplicitlyNonFlorida(stateCourse?: string | null): boolean {
  return !!stateCourse && US_STATES.includes(stateCourse) && stateCourse !== FLORIDA
}

/** Eligible for the Florida-only tracks unless the state is explicitly non-Florida. */
export function eligibleForFloridaTracks(stateCourse?: string | null): boolean {
  return !isExplicitlyNonFlorida(stateCourse)
}
