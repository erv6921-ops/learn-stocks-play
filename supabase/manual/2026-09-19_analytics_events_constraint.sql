SELECT conname, pg_get_constraintdef(oid) AS definition FROM pg_constraint WHERE conrelid = 'public.analytics_events'::regclass AND conname = 'analytics_events_event_check';

-- Re-align the deployed analytics_events CHECK constraint with the event
-- vocabulary in src/lib/analyticsEvents.ts (21 names). Production was found
-- on 2026-09-19 with a 17-name version that rejected coins_spent,
-- quiz_levelup, game_lost and watchlist_removed with error 23514.
-- Inspect the SELECT output above before running the statements below.

ALTER TABLE public.analytics_events
  DROP CONSTRAINT IF EXISTS analytics_events_event_check;

ALTER TABLE public.analytics_events
  ADD CONSTRAINT analytics_events_event_check CHECK (event IN (
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
  ));

SELECT conname, pg_get_constraintdef(oid) AS definition FROM pg_constraint WHERE conrelid = 'public.analytics_events'::regclass AND conname = 'analytics_events_event_check';
