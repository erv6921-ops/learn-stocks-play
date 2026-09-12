-- ===========================================================================
-- Teacher lesson preview: read access for "Full Lesson" / "Question Bank"
-- Project: InvestiPlay (vcjdshippmqopaffuzbw)
--
-- NOT applied automatically. Run in the Supabase SQL Editor. Idempotent.
--
-- Why: today a teacher can SELECT `lessons` and `generated_questions` only for
-- their OWN uploads ("Teachers see own lessons" / "See questions from own
-- uploads"). A lesson another teacher generated and that is assigned to one of
-- THIS teacher's classes (via class_lesson_assignments or the text-keyed
-- assigned_lessons table) is invisible, so the preview modal fails to load it.
-- These policies add: a teacher can read the lesson row and its question rows
-- for any lesson assigned to a class they teach. Nothing here widens student
-- access or grants any write. Built-in library lessons live in the app bundle
-- and need no policy.
--
-- Uses the existing SECURITY DEFINER helper is_class_teacher(_user_id uuid,
-- _class_id uuid) so the lessons <-> class_lesson_assignments policies don't
-- recurse (same pattern as "Teachers manage own lesson assignments").
-- ===========================================================================

-- ── Helper: is this lesson assigned to any class the user teaches? ──────────
-- assigned_lessons.lesson_id is TEXT (library ids like '1.1' share the column
-- with generated UUIDs), so the comparison is done as text.
CREATE OR REPLACE FUNCTION public.is_lesson_assigned_to_teacher(_user_id uuid, _lesson_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.class_lesson_assignments cla
    JOIN public.classes c ON c.id = cla.class_id
    WHERE cla.lesson_id = _lesson_id
      AND c.teacher_id = _user_id
  )
  OR EXISTS (
    SELECT 1
    FROM public.assigned_lessons al
    JOIN public.classes c ON c.id = al.class_id
    WHERE al.lesson_id = _lesson_id::text
      AND c.teacher_id = _user_id
  );
$$;

REVOKE ALL ON FUNCTION public.is_lesson_assigned_to_teacher(uuid, uuid) FROM public;
GRANT EXECUTE ON FUNCTION public.is_lesson_assigned_to_teacher(uuid, uuid) TO authenticated;

-- ── lessons: teachers read lessons assigned to their classes ───────────────
-- (Own lessons are already covered by "Teachers see own lessons".)
DROP POLICY IF EXISTS "Teachers see lessons assigned to their classes" ON public.lessons;
CREATE POLICY "Teachers see lessons assigned to their classes" ON public.lessons
  FOR SELECT
  TO authenticated
  USING (public.is_lesson_assigned_to_teacher(auth.uid(), id));

-- ── generated_questions: teachers read the question rows of those lessons ──
-- (Own uploads are already covered by "See questions from own uploads".)
DROP POLICY IF EXISTS "Teachers see questions for lessons assigned to their classes" ON public.generated_questions;
CREATE POLICY "Teachers see questions for lessons assigned to their classes" ON public.generated_questions
  FOR SELECT
  TO authenticated
  USING (
    lesson_id IS NOT NULL
    AND public.is_lesson_assigned_to_teacher(auth.uid(), lesson_id)
  );

-- ── Verify ─────────────────────────────────────────────────────────────────
-- SELECT tablename, policyname, cmd FROM pg_policies
--  WHERE schemaname = 'public' AND tablename IN ('lessons','generated_questions')
--  ORDER BY tablename, policyname;
