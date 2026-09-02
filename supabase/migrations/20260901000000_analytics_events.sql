-- Behavioral analytics event stream for InvestiPlay.
--
-- One row per tracked student action across every feature (quizzes, missions,
-- lessons, games, economy, Jeff, class challenges). This is an append-only
-- firehose: writes are fire-and-forget from the client (see
-- src/lib/analyticsEvents.ts) and reads are for dashboards/analysis, not the
-- hot UI path. `event_data` is a flexible jsonb bag so new metadata can be added
-- without a schema change; `session_id` groups events from a single browser tab.
--
-- NOTE: retention / privacy (FERPA) is intentionally out of scope for now and
-- will be audited later — this migration only creates the table + indexes + RLS.

CREATE TABLE IF NOT EXISTS public.analytics_events (
  id         uuid        NOT NULL DEFAULT gen_random_uuid(),
  student_id uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event      text        NOT NULL,                       -- see allowed set below
  event_data jsonb,                                      -- nullable metadata bag
  session_id uuid,                                       -- nullable; groups a tab's events
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (id),
  -- Keep the writable event vocabulary pinned so typos don't silently pollute
  -- the stream. Extend this list (and the union in analyticsEvents.ts) together.
  CONSTRAINT analytics_events_event_check CHECK (event IN (
    'session_start',
    'session_end',
    'quiz_attempted',
    'quiz_correct',
    'quiz_incorrect',
    'quiz_levelup',
    'mission_started',
    'mission_completed',
    'lesson_started',
    'lesson_completed',
    'game_played',
    'game_won',
    'game_lost',
    'coins_earned',
    'coins_spent',
    'watchlist_added',
    'watchlist_removed',
    'portfolio_traded',
    'jeff_turn',
    'class_challenge_joined',
    'streak_broken'
  ))
);

-- Fast per-student timeline reads (e.g. "everything student X did, newest first").
CREATE INDEX IF NOT EXISTS analytics_events_student_created_idx
  ON public.analytics_events (student_id, created_at DESC);

-- Fast filtering by event type across students (e.g. "all quiz_correct events").
CREATE INDEX IF NOT EXISTS analytics_events_event_idx
  ON public.analytics_events (event);

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Students may append their own events (client writes only ever insert self).
DROP POLICY IF EXISTS "ae_insert_own" ON public.analytics_events;
CREATE POLICY "ae_insert_own" ON public.analytics_events
  FOR INSERT TO authenticated
  WITH CHECK (student_id = auth.uid());

-- Students may read back their own events.
DROP POLICY IF EXISTS "ae_select_own" ON public.analytics_events;
CREATE POLICY "ae_select_own" ON public.analytics_events
  FOR SELECT TO authenticated
  USING (student_id = auth.uid());

-- Teachers may read events for students in their own classes (mirrors the
-- student_ability / student_activity_events teacher-read pattern). To let a
-- teacher read EVERY student's events regardless of class, replace the USING
-- clause with: EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid()
--                        AND p.role = 'teacher').
DROP POLICY IF EXISTS "ae_select_teacher" ON public.analytics_events;
CREATE POLICY "ae_select_teacher" ON public.analytics_events
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.class_members cm
      JOIN public.classes c ON c.id = cm.class_id
      WHERE cm.user_id = analytics_events.student_id
        AND c.teacher_id = auth.uid()
    )
  );
