-- Distinguish classwork from homework on class-level assignments.
--
-- Classwork keeps the existing forcing behavior: the student is locked into a
-- pop-up until they open the lesson. Homework is softer - the student gets a
-- "Do now / Do later" prompt and can defer it to the Homework page.
--
-- Existing rows predate the split, so they default to 'classwork' to preserve
-- today's behavior.
ALTER TABLE public.assigned_lessons
  ADD COLUMN IF NOT EXISTS assignment_type text NOT NULL DEFAULT 'classwork';

ALTER TABLE public.assigned_lessons
  DROP CONSTRAINT IF EXISTS assigned_lessons_assignment_type_check;
ALTER TABLE public.assigned_lessons
  ADD CONSTRAINT assigned_lessons_assignment_type_check
  CHECK (assignment_type IN ('classwork', 'homework'));
