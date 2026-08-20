-- Structured percentage grade per lesson, so the app can compute a student's
-- average across lessons (the existing `grade` text column stays as the display
-- label, kept in sync as e.g. "92%").
ALTER TABLE public.lesson_grades
  ADD COLUMN IF NOT EXISTS grade_percent integer;

ALTER TABLE public.lesson_grades
  DROP CONSTRAINT IF EXISTS lesson_grades_grade_percent_check;
ALTER TABLE public.lesson_grades
  ADD CONSTRAINT lesson_grades_grade_percent_check
  CHECK (grade_percent IS NULL OR (grade_percent >= 0 AND grade_percent <= 100));
