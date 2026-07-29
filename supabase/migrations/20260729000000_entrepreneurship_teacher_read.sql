-- Let teachers read the Biz Lab submissions of students in their classes, so
-- the teacher dashboard's per-student "View work" page can display every
-- written deliverable (elevator pitch, business plan, prototype notes, etc.).
-- Mirrors the lr_select_teacher policy on public.lesson_reflections.
CREATE POLICY "es_select_teacher" ON public.entrepreneurship_submissions
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1
      FROM public.class_members cm
      JOIN public.classes c ON c.id = cm.class_id
      WHERE cm.user_id = entrepreneurship_submissions.user_id
        AND c.teacher_id = auth.uid()
    )
  );
