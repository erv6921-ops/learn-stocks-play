-- "Make It Stick" reflections: after passing a lesson's mastery check,
-- students write how they'll apply the lesson in their own life (word-minimum
-- free response). One row per student per lesson; re-doing a lesson updates it.
CREATE TABLE IF NOT EXISTS public.lesson_reflections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  prompt TEXT NOT NULL,
  response TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, lesson_id)
);
CREATE INDEX IF NOT EXISTS lesson_reflections_user_idx ON public.lesson_reflections(user_id, created_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.lesson_reflections TO authenticated;
GRANT ALL ON public.lesson_reflections TO service_role;
ALTER TABLE public.lesson_reflections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "lr_select_own" ON public.lesson_reflections FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "lr_insert_own" ON public.lesson_reflections FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "lr_update_own" ON public.lesson_reflections FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Teachers can read reflections from students in their classes (for the
-- teacher dashboard later).
CREATE POLICY "lr_select_teacher" ON public.lesson_reflections FOR SELECT TO authenticated USING (
  EXISTS (
    SELECT 1
    FROM public.class_members cm
    JOIN public.classes c ON c.id = cm.class_id
    WHERE cm.user_id = lesson_reflections.user_id
      AND c.teacher_id = auth.uid()
  )
);
