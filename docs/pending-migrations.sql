-- ═══════════════════════════════════════════════════════════════════════════
-- PENDING MIGRATIONS — overnight-build 2026-09-04
-- ───────────────────────────────────────────────────────────────────────────
-- DO NOT auto-apply. Eduardo runs these by hand in the Supabase SQL Editor
-- (project vcjdshippmqopaffuzbw). This file lives in docs/ ON PURPOSE so it is
-- never picked up by `supabase db push` / migration automation.
--
-- After running these, regenerate the typed client so the `as any` casts in
-- the app can eventually be tightened:
--   supabase gen types typescript --project-id vcjdshippmqopaffuzbw > src/integrations/supabase/types.ts
-- ═══════════════════════════════════════════════════════════════════════════


-- ─────────────────────────────────────────────────────────────
-- P1: cross-device theme persistence
-- Adds the column ThemeSync / persistTheme read & write. Safe default keeps
-- every existing row on the current light default.
-- ─────────────────────────────────────────────────────────────
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS theme_preference TEXT DEFAULT 'light';

-- (No new RLS needed: profiles already has owner read/write policies, which is
--  all ThemeSync/persistTheme use — each user reads/writes only their own row.)


-- ─────────────────────────────────────────────────────────────
-- P4: scenario free-response (ungraded, teacher-review-only)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.scenario_responses (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id     TEXT NOT NULL,
  scenario_id   TEXT NOT NULL,
  response_text TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_by   UUID REFERENCES auth.users(id),
  teacher_notes TEXT
);

CREATE INDEX IF NOT EXISTS scenario_responses_user_idx   ON public.scenario_responses (user_id);
CREATE INDEX IF NOT EXISTS scenario_responses_lesson_idx ON public.scenario_responses (lesson_id);

ALTER TABLE public.scenario_responses ENABLE ROW LEVEL SECURITY;

-- Students: insert & read ONLY their own responses.
DROP POLICY IF EXISTS "students insert own scenario responses" ON public.scenario_responses;
CREATE POLICY "students insert own scenario responses"
  ON public.scenario_responses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "students read own scenario responses" ON public.scenario_responses;
CREATE POLICY "students read own scenario responses"
  ON public.scenario_responses FOR SELECT
  USING (auth.uid() = user_id);

-- Teachers: read & update (mark reviewed / add notes) responses written by any
-- student who is a member of a class this teacher owns.
DROP POLICY IF EXISTS "teachers read their students scenario responses" ON public.scenario_responses;
CREATE POLICY "teachers read their students scenario responses"
  ON public.scenario_responses FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.class_members cm
      JOIN public.classes c ON c.id = cm.class_id
      WHERE cm.user_id = scenario_responses.user_id
        AND c.teacher_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "teachers review their students scenario responses" ON public.scenario_responses;
CREATE POLICY "teachers review their students scenario responses"
  ON public.scenario_responses FOR UPDATE
  USING (
    EXISTS (
      SELECT 1
      FROM public.class_members cm
      JOIN public.classes c ON c.id = cm.class_id
      WHERE cm.user_id = scenario_responses.user_id
        AND c.teacher_id = auth.uid()
    )
  );
