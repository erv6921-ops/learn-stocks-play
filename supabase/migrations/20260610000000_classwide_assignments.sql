-- Restructure assigned_lessons from per-student rows to class-level rows.
--
-- Old model: one row per (class_id, student_user_id, lesson_id). A lesson could
-- only be assigned to students who had already joined, and students who joined
-- later never received earlier assignments.
--
-- New model: one row per (class_id, lesson_id). Every member of the class —
-- including students who join afterwards — inherits the assignment. Per-student
-- completion is derived from lesson_progress (the old `completed` column here was
-- never written to), so it is dropped.

-- 1. Drop old per-student policies (they reference student_user_id).
DROP POLICY IF EXISTS "Teachers can insert assignments" ON public.assigned_lessons;
DROP POLICY IF EXISTS "Teachers can view assignments" ON public.assigned_lessons;
DROP POLICY IF EXISTS "Teachers can update assignments" ON public.assigned_lessons;
DROP POLICY IF EXISTS "Teachers can delete assignments" ON public.assigned_lessons;

-- 2. Collapse existing per-student rows down to one row per (class_id, lesson_id).
DELETE FROM public.assigned_lessons a
USING public.assigned_lessons b
WHERE a.class_id = b.class_id
  AND a.lesson_id = b.lesson_id
  AND a.ctid > b.ctid;

-- 3. Drop per-student columns. Dropping student_user_id also drops the old
--    composite UNIQUE(class_id, student_user_id, lesson_id) constraint.
ALTER TABLE public.assigned_lessons
  DROP COLUMN IF EXISTS student_user_id,
  DROP COLUMN IF EXISTS completed,
  DROP COLUMN IF EXISTS completed_at;

-- 4. Enforce one assignment per lesson per class.
ALTER TABLE public.assigned_lessons
  ADD CONSTRAINT assigned_lessons_class_lesson_key UNIQUE (class_id, lesson_id);

-- 5. New class-level policies: teachers manage assignments for their classes;
--    teachers and class members can read them.
CREATE POLICY "Teachers insert class assignments" ON public.assigned_lessons
  FOR INSERT TO authenticated
  WITH CHECK (public.is_class_teacher(auth.uid(), class_id));

CREATE POLICY "Teachers delete class assignments" ON public.assigned_lessons
  FOR DELETE TO authenticated
  USING (public.is_class_teacher(auth.uid(), class_id));

CREATE POLICY "Class members view assignments" ON public.assigned_lessons
  FOR SELECT TO authenticated
  USING (
    public.is_class_teacher(auth.uid(), class_id)
    OR public.is_class_member(auth.uid(), class_id)
  );

-- 6. Allow a class teacher to read the lesson progress of students enrolled in
--    their classes (powers the dashboard's per-student completion view).
CREATE OR REPLACE FUNCTION public.is_teacher_of_student(_teacher uuid, _student uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.classes c
    JOIN public.class_members cm ON cm.class_id = c.id
    WHERE c.teacher_id = _teacher
      AND cm.user_id = _student
  );
$$;

DROP POLICY IF EXISTS "Teachers can view student progress" ON public.lesson_progress;
CREATE POLICY "Teachers can view student progress" ON public.lesson_progress
  FOR SELECT TO authenticated
  USING (public.is_teacher_of_student(auth.uid(), user_id));
