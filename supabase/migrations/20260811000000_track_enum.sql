-- Migrate persisted track identity from the profiles.biz_lab_enrolled boolean
-- to a three-state profiles.track enum.
--
-- The boolean could only express "Biz Lab or not"; the new enum adds a third
-- program, 'gulliver_intro' (Gulliver Introduction to Business). See
-- docs/curriculum/gulliver-intro/AUDIT.md §1.
--
-- ROLLBACK PATH: biz_lab_enrolled is intentionally kept in place and is still
-- written in sync by the app (biz_lab_enrolled = (track = 'biz_lab')). A later
-- migration drops it once the enum is proven. Do NOT drop it here.

-- 1. Enum type. Named enrollment_track to stay distinct from the client-side
--    CourseTrack view-state union ("florida" | "ap-micro" | "gulliver-biz-lab").
do $$
begin
  if not exists (select 1 from pg_type where typname = 'enrollment_track') then
    create type public.enrollment_track as enum ('regular', 'biz_lab', 'gulliver_intro');
  end if;
end$$;

-- 2. Column. Non-null, defaulting every existing and future row to the regular
--    course unless set otherwise.
alter table public.profiles
  add column if not exists track public.enrollment_track not null default 'regular';

-- 3. Backfill from the existing boolean: enrolled -> 'biz_lab', everything else
--    (false or historically null) -> 'regular'.
update public.profiles
set track = case
  when biz_lab_enrolled is true then 'biz_lab'::public.enrollment_track
  else 'regular'::public.enrollment_track
end;
