-- Fine-grained student activity telemetry for the teacher analytics view:
-- every page a student opens (with dwell time), periodic "still active" pings
-- (time-on-app + when), and every quiz question answered (which question, right
-- or wrong, and how long they took) across micro-checks, applied questions, and
-- mastery checks.
--
-- This is additive to question_attempts (which the mastery engine keeps for its
-- own adaptive scoring); the teacher dashboard reads from this table so all
-- question types and page activity live in one place.

CREATE TABLE IF NOT EXISTS public.student_activity_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  kind text NOT NULL,              -- 'page_view' | 'question_answered' | 'session_ping'
  route text,                      -- page_view: the path visited
  lesson_id text,                  -- question_answered / lesson pages
  question_id text,                -- question_answered
  is_correct boolean,              -- question_answered
  selected_index integer,          -- question_answered: which option they picked
  duration_ms integer,             -- page_view dwell OR question response time
  meta jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Fast per-student, time-ordered reads for the teacher view.
CREATE INDEX IF NOT EXISTS student_activity_events_user_time_idx
  ON public.student_activity_events (user_id, created_at DESC);

ALTER TABLE public.student_activity_events ENABLE ROW LEVEL SECURITY;

-- Students insert their own events.
DROP POLICY IF EXISTS "sae_insert_own" ON public.student_activity_events;
CREATE POLICY "sae_insert_own" ON public.student_activity_events
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Students can read their own events.
DROP POLICY IF EXISTS "sae_select_own" ON public.student_activity_events;
CREATE POLICY "sae_select_own" ON public.student_activity_events
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Teachers can read the events of students in their classes.
DROP POLICY IF EXISTS "sae_select_teacher" ON public.student_activity_events;
CREATE POLICY "sae_select_teacher" ON public.student_activity_events
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.class_members cm
      JOIN public.classes c ON c.id = cm.class_id
      WHERE cm.user_id = student_activity_events.user_id
        AND c.teacher_id = auth.uid()
    )
  );
