-- Teacher controls + two fixes.
--
-- 1. Teachers can read the profiles of students in their classes. The dashboard
--    was showing "Unknown Student" because the profiles RLS was self-only
--    (auth.uid() = id), so member names came back null. Mirrors the
--    es_select_teacher / lr_select_teacher policies.
-- 2. class_settings: a per-class, teacher-controlled settings blob (which pages
--    students may open, per-question time limit, and more). Teachers manage
--    their own class's row; members may read it to enforce it client-side.
-- 3. Realtime on assigned_lessons + lesson_progress so the student's assignment
--    pop-up fires the instant a teacher assigns a lesson (no refresh).

-- ── 1. Teacher can read member profiles ──────────────────────────────
DROP POLICY IF EXISTS "profiles_select_teacher" ON public.profiles;
CREATE POLICY "profiles_select_teacher" ON public.profiles
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1
      FROM public.class_members cm
      JOIN public.classes c ON c.id = cm.class_id
      WHERE cm.user_id = profiles.id
        AND c.teacher_id = auth.uid()
    )
  );

-- ── 2. Per-class settings ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.class_settings (
  class_id uuid PRIMARY KEY REFERENCES public.classes(id) ON DELETE CASCADE,
  settings jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.class_settings ENABLE ROW LEVEL SECURITY;

-- The class's teacher (owner) can read/write its settings.
DROP POLICY IF EXISTS "class_settings_teacher_all" ON public.class_settings;
CREATE POLICY "class_settings_teacher_all" ON public.class_settings
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.classes c
            WHERE c.id = class_settings.class_id AND c.teacher_id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.classes c
            WHERE c.id = class_settings.class_id AND c.teacher_id = auth.uid())
  );

-- Students in the class may read its settings so the app can enforce them.
DROP POLICY IF EXISTS "class_settings_member_read" ON public.class_settings;
CREATE POLICY "class_settings_member_read" ON public.class_settings
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.class_members cm
            WHERE cm.class_id = class_settings.class_id AND cm.user_id = auth.uid())
  );

-- ── 3. Realtime for the forcing assignment pop-up ────────────────────
-- Adding a table already in the publication raises an error; swallow it so the
-- migration stays idempotent.
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.assigned_lessons;
  EXCEPTION WHEN others THEN NULL;
  END;
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.lesson_progress;
  EXCEPTION WHEN others THEN NULL;
  END;
END $$;
