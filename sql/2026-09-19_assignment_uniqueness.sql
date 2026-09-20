-- A lesson can be assigned to a class only once. assigned_lessons already has
-- a unique (class_id, lesson_id) key; class_lesson_assignments did not, so a
-- second click on Assign wrote a duplicate row. Remove existing duplicates
-- (keep the earliest), then add the same guarantee. Additive otherwise.
delete from public.class_lesson_assignments a
  using public.class_lesson_assignments b
  where a.lesson_id = b.lesson_id
    and a.class_id = b.class_id
    and a.id > b.id;

create unique index if not exists class_lesson_assignments_lesson_class_key
  on public.class_lesson_assignments (lesson_id, class_id);
