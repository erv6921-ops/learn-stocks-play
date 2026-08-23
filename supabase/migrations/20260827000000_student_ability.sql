-- Per-topic adaptive ability estimate for the IRT adaptive-difficulty engine.
--
-- One row per (student, topic). `concept` holds the lesson.category for now
-- (per-topic granularity; a future per-concept pass can add finer-grained rows
-- keyed on the same column). `theta` is the ability estimate on the logit scale
-- (0 = average), `se` its standard error (shrinks as more questions are
-- answered), `attempts` the number of answers folded into the estimate.
--
-- The engine math lives in src/lib/adaptiveEngine.ts; this table only persists
-- {theta, se, attempts} so a student resumes at their real level next session.

CREATE TABLE IF NOT EXISTS public.student_ability (
  user_id    uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  concept    text        NOT NULL,                       -- lesson.category (per-topic for now)
  theta      double precision NOT NULL DEFAULT 0,        -- ability estimate (logit scale)
  se         double precision NOT NULL DEFAULT 1.0,      -- standard error of theta
  attempts   integer     NOT NULL DEFAULT 0,             -- answers folded into the estimate
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, concept)
);

-- Fast per-student reads (load all of a student's topic abilities on lesson entry).
CREATE INDEX IF NOT EXISTS student_ability_user_idx
  ON public.student_ability (user_id);

ALTER TABLE public.student_ability ENABLE ROW LEVEL SECURITY;

-- Students can read their own ability rows.
DROP POLICY IF EXISTS "sa_select_own" ON public.student_ability;
CREATE POLICY "sa_select_own" ON public.student_ability
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Students can insert their own ability rows.
DROP POLICY IF EXISTS "sa_insert_own" ON public.student_ability;
CREATE POLICY "sa_insert_own" ON public.student_ability
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Students can update their own ability rows (the debounced persist on lesson exit).
DROP POLICY IF EXISTS "sa_update_own" ON public.student_ability;
CREATE POLICY "sa_update_own" ON public.student_ability
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Teachers can read the ability rows of students in their own classes
-- (mirrors the student_activity_events teacher-read policy). To let a teacher
-- read EVERY student's rows regardless of class, replace the USING clause below
-- with: EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid()
--                 AND p.role = 'teacher').
DROP POLICY IF EXISTS "sa_select_teacher" ON public.student_ability;
CREATE POLICY "sa_select_teacher" ON public.student_ability
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.class_members cm
      JOIN public.classes c ON c.id = cm.class_id
      WHERE cm.user_id = student_ability.user_id
        AND c.teacher_id = auth.uid()
    )
  );
