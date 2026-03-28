
-- Create assigned_lessons table for teachers to assign lessons to students
CREATE TABLE public.assigned_lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id uuid NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  student_user_id uuid NOT NULL,
  lesson_id text NOT NULL,
  assigned_by uuid NOT NULL,
  assigned_at timestamp with time zone NOT NULL DEFAULT now(),
  completed boolean NOT NULL DEFAULT false,
  completed_at timestamp with time zone,
  UNIQUE (class_id, student_user_id, lesson_id)
);

ALTER TABLE public.assigned_lessons ENABLE ROW LEVEL SECURITY;

-- Teachers can manage assignments for their classes
CREATE POLICY "Teachers can insert assignments" ON public.assigned_lessons
  FOR INSERT TO authenticated
  WITH CHECK (is_class_teacher(auth.uid(), class_id));

CREATE POLICY "Teachers can view assignments" ON public.assigned_lessons
  FOR SELECT TO authenticated
  USING (is_class_teacher(auth.uid(), class_id) OR student_user_id = auth.uid());

CREATE POLICY "Teachers can update assignments" ON public.assigned_lessons
  FOR UPDATE TO authenticated
  USING (is_class_teacher(auth.uid(), class_id) OR student_user_id = auth.uid());

CREATE POLICY "Teachers can delete assignments" ON public.assigned_lessons
  FOR DELETE TO authenticated
  USING (is_class_teacher(auth.uid(), class_id));
