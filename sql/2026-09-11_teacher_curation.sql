-- Teacher curation of extracted curriculum items (Emphasize / Trash) before
-- question and lesson generation. Run in the Supabase SQL Editor.
-- Additive only. No existing policy is altered.

-- ---------------------------------------------------------------------------
-- 1. teacher_status on every curatable item table.
-- ---------------------------------------------------------------------------
alter table public.concepts
  add column if not exists teacher_status text not null default 'active';
alter table public.concepts
  drop constraint if exists concepts_teacher_status_check;
alter table public.concepts
  add constraint concepts_teacher_status_check
  check (teacher_status in ('active', 'emphasized', 'trashed'));

alter table public.vocabulary
  add column if not exists teacher_status text not null default 'active';
alter table public.vocabulary
  drop constraint if exists vocabulary_teacher_status_check;
alter table public.vocabulary
  add constraint vocabulary_teacher_status_check
  check (teacher_status in ('active', 'emphasized', 'trashed'));

alter table public.learning_objectives
  add column if not exists teacher_status text not null default 'active';
alter table public.learning_objectives
  drop constraint if exists learning_objectives_teacher_status_check;
alter table public.learning_objectives
  add constraint learning_objectives_teacher_status_check
  check (teacher_status in ('active', 'emphasized', 'trashed'));

alter table public.curriculum_source_chunks
  add column if not exists teacher_status text not null default 'active';
alter table public.curriculum_source_chunks
  drop constraint if exists curriculum_source_chunks_teacher_status_check;
alter table public.curriculum_source_chunks
  add constraint curriculum_source_chunks_teacher_status_check
  check (teacher_status in ('active', 'emphasized', 'trashed'));

-- ---------------------------------------------------------------------------
-- 2. Upload-level curation outputs.
-- ---------------------------------------------------------------------------
alter table public.curriculum_uploads
  add column if not exists coverage_report jsonb;
alter table public.curriculum_uploads
  add column if not exists insufficient_source_reason text;

-- ---------------------------------------------------------------------------
-- 3. Column guard: when the caller is a signed-in user (auth.uid() is set),
--    an UPDATE may change teacher_status and nothing else. Service-role and
--    admin sessions have no auth.uid() and are unaffected.
-- ---------------------------------------------------------------------------
create or replace function public.curation_only_teacher_status()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is not null
     and (to_jsonb(new) - 'teacher_status') is distinct from (to_jsonb(old) - 'teacher_status') then
    raise exception 'Teachers may only change teacher_status on %', tg_table_name
      using errcode = 'insufficient_privilege';
  end if;
  return new;
end;
$$;

drop trigger if exists concepts_curation_guard on public.concepts;
create trigger concepts_curation_guard
  before update on public.concepts
  for each row execute function public.curation_only_teacher_status();

drop trigger if exists vocabulary_curation_guard on public.vocabulary;
create trigger vocabulary_curation_guard
  before update on public.vocabulary
  for each row execute function public.curation_only_teacher_status();

drop trigger if exists learning_objectives_curation_guard on public.learning_objectives;
create trigger learning_objectives_curation_guard
  before update on public.learning_objectives
  for each row execute function public.curation_only_teacher_status();

drop trigger if exists curriculum_source_chunks_curation_guard on public.curriculum_source_chunks;
create trigger curriculum_source_chunks_curation_guard
  before update on public.curriculum_source_chunks
  for each row execute function public.curation_only_teacher_status();

-- ---------------------------------------------------------------------------
-- 4. RLS: teachers may UPDATE rows that belong to their own uploads. Combined
--    with the trigger above, the only field they can change is teacher_status.
--    These are NEW policies; no existing policy is changed.
-- ---------------------------------------------------------------------------
drop policy if exists "Teachers curate concepts from own uploads" on public.concepts;
create policy "Teachers curate concepts from own uploads"
  on public.concepts
  for update
  using (
    upload_id in (select id from public.curriculum_uploads where teacher_id = auth.uid())
  )
  with check (
    upload_id in (select id from public.curriculum_uploads where teacher_id = auth.uid())
  );

drop policy if exists "Teachers curate vocabulary from own uploads" on public.vocabulary;
create policy "Teachers curate vocabulary from own uploads"
  on public.vocabulary
  for update
  using (
    upload_id in (select id from public.curriculum_uploads where teacher_id = auth.uid())
  )
  with check (
    upload_id in (select id from public.curriculum_uploads where teacher_id = auth.uid())
  );

drop policy if exists "Teachers curate objectives from own uploads" on public.learning_objectives;
create policy "Teachers curate objectives from own uploads"
  on public.learning_objectives
  for update
  using (
    upload_id in (select id from public.curriculum_uploads where teacher_id = auth.uid())
  )
  with check (
    upload_id in (select id from public.curriculum_uploads where teacher_id = auth.uid())
  );

drop policy if exists "Teachers curate chunks from own uploads" on public.curriculum_source_chunks;
create policy "Teachers curate chunks from own uploads"
  on public.curriculum_source_chunks
  for update
  using (
    upload_id in (select id from public.curriculum_uploads where teacher_id = auth.uid())
  )
  with check (
    upload_id in (select id from public.curriculum_uploads where teacher_id = auth.uid())
  );
