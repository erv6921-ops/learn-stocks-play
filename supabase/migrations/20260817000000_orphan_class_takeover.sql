-- Orphan-class takeover.
--
-- Previously classes.teacher_id was NOT NULL and ON DELETE CASCADE, so deleting
-- a teacher deleted all their classes and unenrolled every student. Instead we
-- keep the class and let it go "unclaimed" (teacher_id null) when its teacher
-- leaves; any teacher can then take it over. Student enrollments (class_members)
-- are keyed to the class, so they ride along to the new owner untouched.

-- 1) teacher_id may be null (unclaimed), and orphan instead of cascade on delete.
alter table public.classes
  alter column teacher_id drop not null;

alter table public.classes
  drop constraint if exists classes_teacher_id_fkey,
  add  constraint classes_teacher_id_fkey
    foreign key (teacher_id) references auth.users(id) on delete set null;

-- 2) Any teacher can see unclaimed classes (so they can adopt one).
drop policy if exists "Teachers can view unclaimed classes" on public.classes;
create policy "Teachers can view unclaimed classes"
on public.classes for select
using (teacher_id is null and public.has_role(auth.uid(), 'teacher'));

-- 3) Any teacher can claim an unclaimed class, assigning themselves as owner.
--    USING restricts the takeover to currently-unclaimed classes; WITH CHECK
--    ensures they can only set themselves as the new teacher, not someone else.
drop policy if exists "Teachers can claim unclaimed classes" on public.classes;
create policy "Teachers can claim unclaimed classes"
on public.classes for update
using (teacher_id is null and public.has_role(auth.uid(), 'teacher'))
with check (teacher_id = auth.uid());
