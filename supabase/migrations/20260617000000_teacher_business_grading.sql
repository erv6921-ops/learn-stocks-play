-- Let teachers read their students' Micro-Business written work (which lives in
-- business_game_state.activities) and record a grade + feedback per student.

-- 1. A class teacher can read the business_game_state of students in their classes.
DROP POLICY IF EXISTS "Teachers can view student business work" ON public.business_game_state;
CREATE POLICY "Teachers can view student business work" ON public.business_game_state
  FOR SELECT TO authenticated
  USING (public.is_teacher_of_student(auth.uid(), user_id));

-- 2. Per-student grade + written feedback on their business work. One row per
--    student; the teacher writes it, the student can read their own.
CREATE TABLE IF NOT EXISTS public.business_grades (
  user_id    uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  grade      text,
  feedback   text,
  graded_by  uuid REFERENCES auth.users(id),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.business_grades ENABLE ROW LEVEL SECURITY;

-- Student reads their own grade; the class teacher reads their students' grades.
CREATE POLICY "read own or student business grade" ON public.business_grades
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.is_teacher_of_student(auth.uid(), user_id));

-- Only a class teacher of the student may create or change the grade.
CREATE POLICY "teacher inserts business grade" ON public.business_grades
  FOR INSERT TO authenticated
  WITH CHECK (public.is_teacher_of_student(auth.uid(), user_id) AND graded_by = auth.uid());

CREATE POLICY "teacher updates business grade" ON public.business_grades
  FOR UPDATE TO authenticated
  USING (public.is_teacher_of_student(auth.uid(), user_id))
  WITH CHECK (public.is_teacher_of_student(auth.uid(), user_id) AND graded_by = auth.uid());
