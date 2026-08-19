-- Per-lesson grading for the teacher's "View work" page. Each lesson block a
-- student completes can be graded individually (grade + written feedback),
-- instead of one grade for the whole student.

CREATE TABLE IF NOT EXISTS public.lesson_grades (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id text NOT NULL,
  grade text,
  feedback text,
  graded_by uuid,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, lesson_id)
);

ALTER TABLE public.lesson_grades ENABLE ROW LEVEL SECURITY;

-- The student can read their own lesson grades (for a future student-facing view).
DROP POLICY IF EXISTS "lg_select_own" ON public.lesson_grades;
CREATE POLICY "lg_select_own" ON public.lesson_grades
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Teachers can read + write grades for students in their classes.
DROP POLICY IF EXISTS "lg_all_teacher" ON public.lesson_grades;
CREATE POLICY "lg_all_teacher" ON public.lesson_grades
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.class_members cm
      JOIN public.classes c ON c.id = cm.class_id
      WHERE cm.user_id = lesson_grades.user_id AND c.teacher_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.class_members cm
      JOIN public.classes c ON c.id = cm.class_id
      WHERE cm.user_id = lesson_grades.user_id AND c.teacher_id = auth.uid()
    )
  );
