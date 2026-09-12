-- Source grounding for the Curriculum Synthesis Engine (v2 edge functions).
-- Run in the Supabase SQL Editor. Additive only: new table, new nullable
-- columns with defaults, and one tightened student SELECT policy.
-- Existing generated_questions rows default to grounding_status = 'unverified'
-- and stay visible to students.

-- ---------------------------------------------------------------------------
-- 1. curriculum_source_chunks: page-aware ~1,200-word slices of each upload.
--    Every generated item cites one or more of these by uuid.
-- ---------------------------------------------------------------------------
create table if not exists public.curriculum_source_chunks (
  id uuid primary key default gen_random_uuid(),
  upload_id uuid not null references public.curriculum_uploads(id) on delete cascade,
  chunk_index int not null,
  page_start int,
  page_end int,
  content text not null,
  created_at timestamptz default now(),
  unique (upload_id, chunk_index)
);

create index if not exists curriculum_source_chunks_upload_idx
  on public.curriculum_source_chunks (upload_id, chunk_index);

alter table public.curriculum_source_chunks enable row level security;

drop policy if exists "Service role manages source chunks" on public.curriculum_source_chunks;
create policy "Service role manages source chunks"
  on public.curriculum_source_chunks
  for all
  to service_role
  using (true)
  with check (true);

drop policy if exists "Teachers see chunks from own uploads" on public.curriculum_source_chunks;
create policy "Teachers see chunks from own uploads"
  on public.curriculum_source_chunks
  for select
  using (
    upload_id in (
      select id from public.curriculum_uploads where teacher_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- 2. generated_questions: citation + verification columns.
-- ---------------------------------------------------------------------------
alter table public.generated_questions
  add column if not exists source_chunk_ids uuid[],
  add column if not exists evidence_quote text,
  add column if not exists grounding_status text default 'unverified';

alter table public.generated_questions
  drop constraint if exists generated_questions_grounding_status_check;
alter table public.generated_questions
  add constraint generated_questions_grounding_status_check
  check (grounding_status in ('verified', 'failed', 'unverified'));

-- Students must never read a question whose grounding failed. The teacher
-- policy ("See questions from own uploads") is untouched so teachers can
-- still review failed rows. NULL is treated as 'unverified' (visible).
drop policy if exists "Students see assigned lesson questions" on public.generated_questions;
create policy "Students see assigned lesson questions"
  on public.generated_questions
  for select
  using (
    coalesce(grounding_status, 'unverified') <> 'failed'
    and lesson_id in (
      select cla.lesson_id
      from public.class_lesson_assignments cla
      join public.class_members cm on cm.class_id = cla.class_id
      where cm.user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- 3. Extracted items (concepts / vocabulary / learning objectives) carry the
--    same citation columns so downstream v2 functions can filter out failed
--    items and nothing is ever silently deleted. Only teachers can read these
--    tables (existing policies), so no student policy change is needed here.
-- ---------------------------------------------------------------------------
alter table public.concepts
  add column if not exists source_chunk_ids uuid[],
  add column if not exists evidence_quote text,
  add column if not exists grounding_status text default 'unverified';
alter table public.concepts
  drop constraint if exists concepts_grounding_status_check;
alter table public.concepts
  add constraint concepts_grounding_status_check
  check (grounding_status in ('verified', 'failed', 'unverified'));

alter table public.vocabulary
  add column if not exists source_chunk_ids uuid[],
  add column if not exists evidence_quote text,
  add column if not exists grounding_status text default 'unverified';
alter table public.vocabulary
  drop constraint if exists vocabulary_grounding_status_check;
alter table public.vocabulary
  add constraint vocabulary_grounding_status_check
  check (grounding_status in ('verified', 'failed', 'unverified'));

alter table public.learning_objectives
  add column if not exists source_chunk_ids uuid[],
  add column if not exists evidence_quote text,
  add column if not exists grounding_status text default 'unverified';
alter table public.learning_objectives
  drop constraint if exists learning_objectives_grounding_status_check;
alter table public.learning_objectives
  add constraint learning_objectives_grounding_status_check
  check (grounding_status in ('verified', 'failed', 'unverified'));

-- ---------------------------------------------------------------------------
-- 4. curriculum_uploads: why fewer items were generated (or none at all).
--    No existing column fits: status is a short enum-like text and
--    extracted_text holds the source itself.
-- ---------------------------------------------------------------------------
alter table public.curriculum_uploads
  add column if not exists insufficient_source_reason text;
