-- Optional due date for class-level assignments.
--
-- Used by homework: the teacher can set the day it's due, shown to the student
-- on their Homework page (and used to flag overdue work). Nullable - classwork
-- and un-dated homework leave it NULL, preserving today's behavior.
ALTER TABLE public.assigned_lessons
  ADD COLUMN IF NOT EXISTS due_date date;
