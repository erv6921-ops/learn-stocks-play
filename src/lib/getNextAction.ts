// Single source of truth for "what should this student do next?" — powers the
// current node + CTA on the student's lesson path (src/components/student/LessonPath.tsx).
//
// SCHEMA NOTES (verified against supabase/migrations + generated types):
//  • "assignments" live in `assigned_lessons` (lesson_id is TEXT; there is no
//    assignment_submissions/student_assignments table). Completion is read from
//    `lesson_progress.completed`, mirroring Homework.tsx.
//  • Curriculum lessons/units are STATIC (src/data/lessons.ts) — there is no
//    units table. `lesson_progress.progress_percent` is stored relative to a
//    lesson's non-"concept" ("walk") sections, so we count those to render
//    "Section k of n".
//  • Everything except assignments is already in memory via AppContext
//    (lessonProgress, unitTestProgress, user.*), so the only round trip here is
//    fetching assignments — see fetchAssignmentContext().
//
// DEEP-LINK CAVEAT: the lesson player (LessonDetail) always opens at section 0
// and STEP 4 forbids modifying lesson components, so `resume_lesson` routes to
// the lesson (one-tap resume) rather than the exact section. The subtitle still
// reports the section the student left off on.

import { supabase } from "@/integrations/supabase/client";
import { lessons, unitInfo, getLessonsByUnit } from "@/data/lessons";
import { getStructuredContent } from "@/data/lessonContent";
import { lessonRoute, fetchGeneratedLessonNames } from "@/lib/generatedLessons";
import { parseDue, dueLabel } from "@/lib/dueDate";
import type { LessonProgress, EnrollmentTrack, CourseTrack } from "@/types";

export type NextAction = {
  kind: "assignment" | "resume_lesson" | "next_lesson" | "review";
  eyebrow: string; // unit name or "Assigned by your teacher"
  title: string; // lesson name
  subtitle: string; // e.g. "Section 4 of 7" or "Due Friday"
  progressPct: number | null;
  route: string; // deep link to the exact resume point
  urgent: boolean;
};

/** One assignment row we care about (completion is derived from lesson_progress). */
export interface AssignmentRow {
  lesson_id: string;
  due_date: string | null;
  due_time: string | null;
}

export interface NextActionContext {
  assignedTrack?: EnrollmentTrack;
  lessonProgress: LessonProgress[];
  assignments: AssignmentRow[];
  /** Display names for generated (UUID) assignment lessons, keyed by id. */
  assignmentNames?: Map<string, string>;
}

const HOUR = 3600 * 1000;

// EnrollmentTrack (profiles.track / assigned_track enum) → the CourseTrack used
// to filter static units/lessons. IB Econ is client-side only, so it isn't an
// enrollment value and falls through to the regular curriculum here.
function courseTrackFor(t?: EnrollmentTrack): CourseTrack {
  if (t === "gulliver_intro") return "gulliver-intro";
  if (t === "biz_lab") return "gulliver-biz-lab";
  return "regular";
}

// Count a lesson's "walk" sections (everything the student steps through — the
// same set progress_percent is measured against). Wrapped defensively: content
// generation should never break the home screen.
function walkSectionCount(lessonId: string): number | null {
  try {
    const raw = getStructuredContent(lessonId, 0, null, [], null);
    if (!raw?.sections) return null;
    const n = raw.sections.filter((s: { type: string }) => s.type !== "concept").length;
    return n > 0 ? n : null;
  } catch {
    return null;
  }
}

/**
 * Fetch the ONE thing not already in memory: the student's assignments (and
 * display names for any generated ones). class_members → assigned_lessons,
 * exactly like Homework.tsx. Errors resolve to an empty set so the caller falls
 * back to the non-assignment actions.
 */
export async function fetchAssignmentContext(
  userId: string,
): Promise<{ assignments: AssignmentRow[]; assignmentNames: Map<string, string> }> {
  try {
    const { data: memberships } = await supabase
      .from("class_members")
      .select("class_id")
      .eq("user_id", userId);
    const classIds = (memberships ?? []).map((m: { class_id: string }) => m.class_id);
    if (classIds.length === 0) return { assignments: [], assignmentNames: new Map() };

    const { data: rows } = await supabase
      .from("assigned_lessons")
      .select("lesson_id, due_date, due_time, assigned_at")
      .in("class_id", classIds)
      .order("assigned_at", { ascending: false });

    // Collapse a lesson assigned to multiple of the student's classes to one row.
    const seen = new Set<string>();
    const assignments: AssignmentRow[] = [];
    for (const a of (rows ?? []) as (AssignmentRow & { assigned_at: string })[]) {
      if (seen.has(a.lesson_id)) continue;
      seen.add(a.lesson_id);
      assignments.push({ lesson_id: a.lesson_id, due_date: a.due_date, due_time: a.due_time });
    }

    const assignmentNames = await fetchGeneratedLessonNames(assignments.map((a) => a.lesson_id));
    return { assignments, assignmentNames };
  } catch {
    return { assignments: [], assignmentNames: new Map() };
  }
}

/**
 * Priority order, first match wins (never returns null):
 *  1. assignment    — incomplete, due within 48h
 *  2. resume_lesson — started, section incomplete
 *  3. next_lesson   — next lesson in the assigned track
 *  4. review        — fallback
 */
export function getNextAction(ctx: NextActionContext): NextAction {
  const completed = new Set(ctx.lessonProgress.filter((p) => p.completed).map((p) => p.lessonId));
  const ct = courseTrackFor(ctx.assignedTrack);
  const orderedUnits = unitInfo
    .filter((u) => (u.track ?? "regular") === ct)
    .sort((a, b) => a.orderIndex - b.orderIndex);

  const unitForLesson = (lessonId: string) =>
    orderedUnits.find((u) => getLessonsByUnit(u.id).some((l) => l.id === lessonId)) ??
    unitInfo.find((u) => getLessonsByUnit(u.id).some((l) => l.id === lessonId));
  const titleFor = (lessonId: string) =>
    lessons.find((l) => l.id === lessonId)?.title ?? ctx.assignmentNames?.get(lessonId) ?? "Your lesson";

  // 1. ASSIGNMENT — incomplete, due within the next 48 hours (overdue included:
  //    still the most urgent thing). Soonest due first.
  const cutoff = Date.now() + 48 * HOUR;
  const dueSoon = ctx.assignments
    .filter((a) => !completed.has(a.lesson_id) && a.due_date && parseDue(a.due_date, a.due_time).getTime() <= cutoff)
    .sort((a, b) => parseDue(a.due_date!, a.due_time).getTime() - parseDue(b.due_date!, b.due_time).getTime());
  if (dueSoon.length > 0) {
    const a = dueSoon[0];
    const started = ctx.lessonProgress.find((p) => p.lessonId === a.lesson_id && !p.completed);
    return {
      kind: "assignment",
      eyebrow: "Assigned by your teacher",
      title: titleFor(a.lesson_id),
      subtitle: dueLabel(a.due_date!, a.due_time),
      progressPct: started?.progressPercent ?? null,
      route: lessonRoute(a.lesson_id),
      urgent: true,
    };
  }

  // 2. RESUME_LESSON — started but not finished, most recently touched first.
  const resumable = ctx.lessonProgress
    .filter((p) => !p.completed && (p.progressPercent ?? 0) > 0)
    .sort((a, b) => (b.completedAt ? new Date(b.completedAt).getTime() : 0) - (a.completedAt ? new Date(a.completedAt).getTime() : 0));
  if (resumable.length > 0) {
    const p = resumable[0];
    const pct = Math.round(p.progressPercent ?? 0);
    const n = walkSectionCount(p.lessonId);
    // progress_percent is stored as round(((idx+1)/n)*100) for the section the
    // student is on, so invert: 1-based section number for display, 0-based
    // index for the ?section= deep link the lesson player consumes.
    const sectionIdx = n ? Math.min(n, Math.max(1, Math.round((pct / 100) * n))) : null;
    const resumeIdx = sectionIdx != null ? sectionIdx - 1 : 0;
    const base = lessonRoute(p.lessonId);
    return {
      kind: "resume_lesson",
      eyebrow: unitForLesson(p.lessonId)?.title ?? "Keep going",
      title: titleFor(p.lessonId),
      subtitle: sectionIdx && n ? `Section ${sectionIdx} of ${n}` : `${pct}% complete`,
      progressPct: pct,
      route: resumeIdx >= 1 ? `${base}?section=${resumeIdx}` : base,
      urgent: false,
    };
  }

  // 3. NEXT_LESSON — first not-yet-completed lesson in track order.
  const next = orderedUnits.flatMap((u) => getLessonsByUnit(u.id)).find((l) => !completed.has(l.id));
  if (next) {
    return {
      kind: "next_lesson",
      eyebrow: unitForLesson(next.id)?.title ?? "Up next",
      title: next.title,
      subtitle: next.lessonNumber ? `Lesson ${next.lessonNumber}` : "Start your next lesson",
      progressPct: null,
      route: lessonRoute(next.id),
      urgent: false,
    };
  }

  // 4. REVIEW — fallback. Never returns null / an empty card.
  return {
    kind: "review",
    eyebrow: "Keep it sharp",
    title: "Review what you've learned",
    subtitle: "Revisit a lesson and lock it in",
    progressPct: null,
    route: "/lessons",
    urgent: false,
  };
}

/** Verb-first button label derived from the action kind. */
export function actionButtonLabel(action: NextAction): string {
  switch (action.kind) {
    case "assignment":
      return (action.progressPct ?? 0) > 0 ? "Continue" : "Start lesson";
    case "resume_lesson":
      return "Continue";
    case "next_lesson":
      return "Start lesson";
    case "review":
      return "Review";
  }
}
