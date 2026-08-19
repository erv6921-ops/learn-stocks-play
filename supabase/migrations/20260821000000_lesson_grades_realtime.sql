-- Realtime on lesson_grades so a student sees the "your teacher graded your
-- work" pop-up the instant a grade is saved (no refresh). Idempotent.
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.lesson_grades;
  EXCEPTION WHEN others THEN NULL;
  END;
END $$;
