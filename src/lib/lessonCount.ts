import { lessons } from "@/data/lessons"
import type { CourseTrack, EnrollmentTrack, Lesson } from "@/types"

// Single source of truth for "how many lessons are in this curriculum". The
// student dashboard, the Lessons page and the teacher dashboard all used to
// count on their own (unit walks, enabled-toggle unions, raw catalog filters)
// and drifted apart. Untagged lessons belong to the default "regular" course.

export function lessonsForTracks(tracks: readonly CourseTrack[]): Lesson[] {
  const wanted = new Set<CourseTrack>(tracks)
  return lessons.filter((l) => wanted.has(l.track ?? "regular"))
}

export function countLessons(tracks: readonly CourseTrack[]): number {
  return lessonsForTracks(tracks).length
}

// The course a program of record maps to. Gulliver Intro students (and their
// teachers) live on the "gulliver-intro" course; everyone else, including Biz
// Lab (regular course + a Biz Lab tab), is on the regular curriculum.
export function enrollmentToCourseTrack(track?: EnrollmentTrack | null): CourseTrack {
  return track === "gulliver_intro" ? "gulliver-intro" : "regular"
}
