-- Sub-lessons: a teacher splits one uploaded chapter into several lessons,
-- each generated from only its own pages. Run in the Supabase SQL Editor
-- AFTER sql/2026-09-15_teacher_questions_and_stages.sql. Additive only,
-- except the chunk column guard (section 4), which is redefined to also
-- allow sub_lesson_id.
--
-- Contract: docs/curation-contract.md, section 8.

-- ---------------------------------------------------------------------------
-- 1. sub_lessons
--    One row per lesson-to-be within an upload. Every upload with chunks has
--    at least one (the default, created by extract-curriculum-v2 and by the
--    backfill below). generation_settings / instructions / coverage_report /
--    insufficient_source_reason are per sub-lesson; the upload-level columns
--    of the same names stay for the upload-wide instruction box and for
--    older clients.
-- ---------------------------------------------------------------------------
create table if not exists public.sub_lessons (
  id uuid primary key default gen_random_uuid(),
  upload_id uuid not null references public.curriculum_uploads(id) on delete cascade,
  title text not null,
  sort_order integer not null default 0,
  instructions text,
  generation_settings jsonb,
  coverage_report jsonb,
  insufficient_source_reason text,
  -- Set the first time the teacher renames / merges / splits / reorders /
  -- moves pages. The auto-split proposal is never offered again once true.
  split_edited_by_teacher boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists sub_lessons_upload_idx on public.sub_lessons (upload_id, sort_order);

alter table public.sub_lessons enable row level security;

drop policy if exists "Service role manages sub_lessons" on public.sub_lessons;
create policy "Service role manages sub_lessons"
  on public.sub_lessons
  for all
  to service_role
  using (true)
  with check (true);

drop policy if exists "Teachers manage sub_lessons of own uploads" on public.sub_lessons;
create policy "Teachers manage sub_lessons of own uploads"
  on public.sub_lessons
  for all
  using (upload_id in (select id from public.curriculum_uploads where teacher_id = auth.uid()))
  with check (upload_id in (select id from public.curriculum_uploads where teacher_id = auth.uid()));

drop policy if exists "Admin reads all sub_lessons" on public.sub_lessons;
create policy "Admin reads all sub_lessons"
  on public.sub_lessons
  for select
  using ((auth.jwt() ->> 'email') = 'erv6921@gmail.com');

-- ---------------------------------------------------------------------------
-- 2. Ownership columns. A chunk belongs to at most one sub-lesson; a lesson
--    and a question belong to the sub-lesson they were generated for.
-- ---------------------------------------------------------------------------
alter table public.curriculum_source_chunks
  add column if not exists sub_lesson_id uuid references public.sub_lessons(id) on delete set null;
create index if not exists curriculum_source_chunks_sub_lesson_idx
  on public.curriculum_source_chunks (sub_lesson_id);

alter table public.lessons
  add column if not exists sub_lesson_id uuid references public.sub_lessons(id) on delete set null;
create index if not exists lessons_sub_lesson_idx on public.lessons (sub_lesson_id);

alter table public.generated_questions
  add column if not exists sub_lesson_id uuid references public.sub_lessons(id) on delete set null;
create index if not exists generated_questions_sub_lesson_idx on public.generated_questions (sub_lesson_id);

-- ---------------------------------------------------------------------------
-- 3. Backfill: one default sub-lesson per upload that has chunks and no
--    sub-lesson yet. It owns every chunk, inherits the upload's settings and
--    reports, and adopts every existing lesson and question of the upload.
--    Uploads without chunks (v1, never extracted) are left alone: the default
--    is created when they are (re-)extracted.
-- ---------------------------------------------------------------------------
insert into public.sub_lessons (upload_id, title, sort_order, generation_settings, coverage_report, insufficient_source_reason)
select
  u.id,
  coalesce(nullif(regexp_replace(u.file_name, '\.pdf$', '', 'i'), ''), 'Lesson 1'),
  0,
  u.generation_settings,
  u.coverage_report,
  u.insufficient_source_reason
from public.curriculum_uploads u
where exists (select 1 from public.curriculum_source_chunks c where c.upload_id = u.id)
  and not exists (select 1 from public.sub_lessons s where s.upload_id = u.id);

update public.curriculum_source_chunks c
  set sub_lesson_id = s.id
  from public.sub_lessons s
  where c.sub_lesson_id is null and s.upload_id = c.upload_id and s.sort_order = 0;

update public.lessons l
  set sub_lesson_id = s.id
  from public.sub_lessons s
  where l.sub_lesson_id is null and s.upload_id = l.upload_id and s.sort_order = 0;

update public.generated_questions q
  set sub_lesson_id = s.id
  from public.sub_lessons s
  where q.sub_lesson_id is null and s.upload_id = q.upload_id and s.sort_order = 0;

-- ---------------------------------------------------------------------------
-- 4. Chunk column guard. The shared curation_only_teacher_status() guard
--    (sql/2026-09-11_teacher_curation.sql) lets a user session change only
--    teacher_status. On curriculum_source_chunks the teacher must also be
--    able to move a page between sub-lessons, so that table gets its own
--    guard allowing teacher_status AND sub_lesson_id, and the target
--    sub-lesson must belong to the same upload. The other three item tables
--    keep the shared guard unchanged.
-- ---------------------------------------------------------------------------
create or replace function public.curation_chunk_guard()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    return new;
  end if;
  if (to_jsonb(new) - 'teacher_status' - 'sub_lesson_id') is distinct from (to_jsonb(old) - 'teacher_status' - 'sub_lesson_id') then
    raise exception 'Teachers may only change teacher_status or sub_lesson_id on %', tg_table_name
      using errcode = 'insufficient_privilege';
  end if;
  if new.sub_lesson_id is distinct from old.sub_lesson_id
     and new.sub_lesson_id is not null
     and not exists (select 1 from public.sub_lessons s where s.id = new.sub_lesson_id and s.upload_id = new.upload_id) then
    raise exception 'A page can only be moved to a sub-lesson of the same upload'
      using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

drop trigger if exists curriculum_source_chunks_curation_guard on public.curriculum_source_chunks;
create trigger curriculum_source_chunks_curation_guard
  before update on public.curriculum_source_chunks
  for each row execute function public.curation_chunk_guard();

-- ---------------------------------------------------------------------------
-- 5. Teacher-written questions carry their sub-lesson. The insert guard
--    (sql/2026-09-15) still stamps origin / approval; this adds the check
--    that the sub-lesson belongs to the row's upload.
-- ---------------------------------------------------------------------------
create or replace function public.generated_questions_teacher_insert_guard()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    return new;
  end if;
  new.origin := 'teacher_authored';
  new.status := coalesce(new.status, 'pending');
  new.source_chunk_ids := null;
  new.evidence_quote := null;
  new.grounding_status := 'unverified';
  new.teacher_approved_at := coalesce(new.teacher_approved_at, now());
  new.teacher_approved_by := auth.uid();
  if new.sub_lesson_id is not null
     and not exists (select 1 from public.sub_lessons s where s.id = new.sub_lesson_id and s.upload_id = new.upload_id) then
    raise exception 'sub_lesson_id must belong to the question''s upload'
      using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- 6. Starred cap per sub-lesson, from the sub-lesson's own masteryRequired
--    (falls back to the upload's, then 4). Rows without a sub-lesson (none
--    after the backfill) are capped per upload as before.
-- ---------------------------------------------------------------------------
create or replace function public.generated_questions_star_cap()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  cap int;
  n int;
begin
  if new.starred and not coalesce(old.starred, false) then
    if new.sub_lesson_id is not null then
      select greatest(1, least(15, coalesce(
               (s.generation_settings ->> 'masteryRequired')::int,
               (u.generation_settings ->> 'masteryRequired')::int,
               4)))
        into cap
        from public.sub_lessons s
        join public.curriculum_uploads u on u.id = s.upload_id
        where s.id = new.sub_lesson_id;
      select count(*) into n
        from public.generated_questions
        where sub_lesson_id = new.sub_lesson_id and starred and id <> new.id;
    else
      select greatest(1, least(15, coalesce((generation_settings ->> 'masteryRequired')::int, 4)))
        into cap
        from public.curriculum_uploads
        where id = new.upload_id;
      select count(*) into n
        from public.generated_questions
        where upload_id = new.upload_id and sub_lesson_id is null and starred and id <> new.id;
    end if;
    cap := coalesce(cap, 4);
    if n >= cap then
      raise exception 'Starred limit reached: this lesson allows % starred question(s) (its mastery pass mark)', cap
        using errcode = 'check_violation';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists generated_questions_star_cap on public.generated_questions;
create trigger generated_questions_star_cap
  before insert or update of starred on public.generated_questions
  for each row execute function public.generated_questions_star_cap();
