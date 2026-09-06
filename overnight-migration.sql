-- ===========================================================================
-- OVERNIGHT BUILD MIGRATION — generated-lessons-full-experience
-- Project: InvestiPlay (vcjdshippmqopaffuzbw)
--
-- Run in the Supabase SQL Editor. All statements are idempotent.
-- (These were also applied via the Management API during the build; this file
--  is the record of record.)
-- ===========================================================================

-- ── NEW IN THIS OVERNIGHT BUILD ────────────────────────────────────────────

-- Synthesized full-lesson content (StructuredLessonContent + Jeff teaching
-- context) for a generated curriculum lesson. Read by the student lesson
-- player; written by the synthesize-lesson edge function (service role).
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS content JSONB;

-- No new RLS policy needed: `content` is a column on `lessons`, and students
-- already have the SELECT policy "Students see assigned lessons" (added earlier
-- this session) which returns the whole row (including content) for lessons
-- assigned to a class they belong to. Teachers keep "Teachers see own lessons".

-- ── RECAP: curriculum schema applied earlier this session (idempotent) ──────
-- Included so this project can be rebuilt from the repo. Safe to re-run.

-- lessons.content depends on the lessons table existing (created earlier):
--   lessons(id, upload_id, teacher_id, name, status, created_at)
-- generated_questions(..., difficulty float, lesson_id uuid, ...)
-- student_lesson_progress(student_id, lesson_id, status, num_correct,
--   num_answered, completed_at, ...) with per-student RLS.
-- question_attempts.selected_answer text (added earlier).
--
-- class_lesson_assignments RLS uses SECURITY DEFINER helpers to avoid the
-- lessons<->class_lesson_assignments recursion:
DROP POLICY IF EXISTS "Teachers manage own lesson assignments" ON class_lesson_assignments;
CREATE POLICY "Teachers manage own lesson assignments" ON class_lesson_assignments
  FOR ALL
  USING (is_class_teacher(auth.uid(), class_id))
  WITH CHECK (is_class_teacher(auth.uid(), class_id));

DROP POLICY IF EXISTS "Students see own class assignments" ON class_lesson_assignments;
CREATE POLICY "Students see own class assignments" ON class_lesson_assignments
  FOR SELECT
  USING (is_class_member(auth.uid(), class_id));
