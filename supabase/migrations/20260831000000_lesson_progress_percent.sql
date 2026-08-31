-- Per-lesson completion percentage so teachers can see HOW FAR into a lesson a
-- student has gotten, not just started vs. completed. The lesson player writes
-- this as the student advances through sections; the teacher dashboard reads it
-- live (lesson_progress is already in the supabase_realtime publication and
-- teachers already have a SELECT policy on their students' rows).
ALTER TABLE public.lesson_progress
  ADD COLUMN IF NOT EXISTS progress_percent NUMERIC;

-- Backfill: rows already marked completed are, by definition, 100% done.
UPDATE public.lesson_progress
  SET progress_percent = 100
  WHERE completed = true AND progress_percent IS NULL;
