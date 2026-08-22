-- Optional time-of-day for a homework due date.
--
-- due_date already gives the day it's due; due_time lets a teacher pin an exact
-- deadline (e.g. 3:00 PM). Nullable - a date with no time means "due that day".
ALTER TABLE public.assigned_lessons
  ADD COLUMN IF NOT EXISTS due_time time;
