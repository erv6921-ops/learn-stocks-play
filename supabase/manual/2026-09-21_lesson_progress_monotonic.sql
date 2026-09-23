SELECT * FROM lesson_progress LIMIT 5;

-- Lesson progress must be monotonic. The client (AppContext.updateLessonProgress)
-- already resolves its writes against the row it last read, but a second tab or
-- a stale local copy can still send completed=false, a NULL quiz_score, or a
-- lower score over a row that is already completed. This trigger is the
-- backstop: once a row is completed it stays completed, keeps its
-- completed_at, stays at 100%, and its quiz_score / mastery_score never go
-- null or drop.
--
-- lesson_progress today: id, user_id, lesson_id, completed, quiz_score,
-- completed_at, progress_percent, created_at, updated_at. There is no column
-- for the mastery-check accuracy (mastery_scores is a per-topic confidence
-- table written only by the mastery-score edge function), so one is added.
-- Inspect the SELECT output above before running the statements below.

ALTER TABLE public.lesson_progress
  ADD COLUMN IF NOT EXISTS mastery_score NUMERIC;

CREATE OR REPLACE FUNCTION public.lesson_progress_keep_monotonic()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF OLD.completed THEN
    -- Never un-complete a lesson.
    NEW.completed := true;
    NEW.completed_at := COALESCE(NEW.completed_at, OLD.completed_at, now());
    NEW.progress_percent := 100;

    -- Ignore a NULL or lower quiz_score over a completed row.
    IF NEW.quiz_score IS NULL
       OR (OLD.quiz_score IS NOT NULL AND NEW.quiz_score < OLD.quiz_score) THEN
      NEW.quiz_score := OLD.quiz_score;
    END IF;

    -- Same rule for the mastery-check accuracy.
    IF NEW.mastery_score IS NULL
       OR (OLD.mastery_score IS NOT NULL AND NEW.mastery_score < OLD.mastery_score) THEN
      NEW.mastery_score := OLD.mastery_score;
    END IF;
  ELSE
    -- Not completed yet: the bar never moves backwards either.
    IF NEW.progress_percent IS NULL
       OR (OLD.progress_percent IS NOT NULL AND NEW.progress_percent < OLD.progress_percent) THEN
      NEW.progress_percent := OLD.progress_percent;
    END IF;
    IF NEW.completed THEN
      NEW.completed_at := COALESCE(NEW.completed_at, now());
      NEW.progress_percent := 100;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS lesson_progress_keep_monotonic ON public.lesson_progress;

-- BEFORE UPDATE fires for the UPDATE half of the client's
-- INSERT ... ON CONFLICT (user_id, lesson_id) DO UPDATE upsert too.
CREATE TRIGGER lesson_progress_keep_monotonic
BEFORE UPDATE ON public.lesson_progress
FOR EACH ROW
EXECUTE FUNCTION public.lesson_progress_keep_monotonic();

-- Verify: the trigger is installed and the column exists.
SELECT tgname, tgenabled FROM pg_trigger
WHERE tgrelid = 'public.lesson_progress'::regclass AND tgname = 'lesson_progress_keep_monotonic';

SELECT column_name, data_type FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'lesson_progress'
ORDER BY ordinal_position;
