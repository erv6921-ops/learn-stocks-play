-- Teacher-authored questions, starred questions, free-text teacher
-- instructions, and extraction stage markers. Run in the Supabase SQL Editor.
-- Additive only: no existing column, policy or row is removed or altered
-- except the approval-guard trigger function, which is redefined below with
-- the same behaviour for generated rows plus an exemption for teacher-authored
-- rows (see section 4).
--
-- Contract: docs/curation-contract.md, sections 6 and 7.

-- ---------------------------------------------------------------------------
-- 1. generated_questions.origin + starred
--    origin  'generated'        written by generate-questions-v2 (default)
--            'teacher_authored' written by the teacher on the Questions tab
--    starred every student gets this question: always in the mastery pool,
--            served before any rotated question. Capped per upload at
--            generation_settings.masteryRequired (trigger in section 5).
-- ---------------------------------------------------------------------------
alter table public.generated_questions
  add column if not exists origin text not null default 'generated';
alter table public.generated_questions
  drop constraint if exists generated_questions_origin_check;
alter table public.generated_questions
  add constraint generated_questions_origin_check
  check (origin in ('generated', 'teacher_authored'));

alter table public.generated_questions
  add column if not exists starred boolean not null default false;

create index if not exists generated_questions_starred_idx
  on public.generated_questions (upload_id)
  where starred;

-- ---------------------------------------------------------------------------
-- 2. curriculum_uploads: teacher instructions + extraction progress
--    teacher_instructions  free text; shapes scope, emphasis, tone and
--                          structure only (GROUNDING_RULES forbid new facts).
--    extraction_stage      written by extract-curriculum-v2 as it runs; null
--                          when idle, finished or failed. The upload page
--                          polls it to drive the progress bar.
-- ---------------------------------------------------------------------------
alter table public.curriculum_uploads
  add column if not exists teacher_instructions text;
alter table public.curriculum_uploads
  add column if not exists extraction_stage text;
alter table public.curriculum_uploads
  add column if not exists extraction_stage_at timestamptz;
alter table public.curriculum_uploads
  drop constraint if exists curriculum_uploads_extraction_stage_check;
alter table public.curriculum_uploads
  add constraint curriculum_uploads_extraction_stage_check
  check (extraction_stage is null or extraction_stage in ('reading_pages', 'extracting', 'verifying', 'saving'));

-- ---------------------------------------------------------------------------
-- 3. Teachers may INSERT questions on their own uploads. Until now every row
--    came from a service-role function; this is the first client insert path.
--    The BEFORE INSERT guard in section 4 forces origin / approval on rows
--    written from a user session, so the policy only needs ownership.
-- ---------------------------------------------------------------------------
drop policy if exists "Teachers write questions on own uploads" on public.generated_questions;
create policy "Teachers write questions on own uploads"
  on public.generated_questions
  for insert
  with check (
    upload_id in (select id from public.curriculum_uploads where teacher_id = auth.uid())
  );

-- ---------------------------------------------------------------------------
-- 4. Guards.
--
-- 4a. BEFORE INSERT (user sessions only): a row a teacher writes is always
--     origin = 'teacher_authored', auto-approved by that teacher, status
--     'pending' (every read path filters on it), and carries no grounding
--     data. Service-role inserts (auth.uid() is null) are untouched.
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
  return new;
end;
$$;

drop trigger if exists generated_questions_teacher_insert_guard on public.generated_questions;
create trigger generated_questions_teacher_insert_guard
  before insert on public.generated_questions
  for each row execute function public.generated_questions_teacher_insert_guard();

-- ---------------------------------------------------------------------------
-- 4b. BEFORE UPDATE (replaces sql/2026-09-11_teacher_approval.sql section 3).
--     Unchanged for generated rows:
--       - editing question content from a user session clears approval and
--         resets grounding to 'unverified'
--       - a row with grounding_status = 'failed' can never be approved
--       - teacher_approved_by is always the approving user
--     New:
--       - origin cannot be changed from a user session, so a generated row can
--         never be relabelled to escape the rules below
--       - the edit-reset rule is skipped when, and only when,
--         origin = 'teacher_authored'; those rows stay approved through edits
--       - the grounding-failed rule is skipped for teacher-authored rows
--         (they never carry grounding data)
-- ---------------------------------------------------------------------------
create or replace function public.generated_questions_approval_guard()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    return new;
  end if;

  if new.origin is distinct from old.origin then
    raise exception 'A question''s origin cannot be changed'
      using errcode = 'insufficient_privilege';
  end if;

  if new.origin <> 'teacher_authored'
     and (new.question_text is distinct from old.question_text
          or new.options is distinct from old.options
          or new.correct_answer is distinct from old.correct_answer
          or new.explanation is distinct from old.explanation) then
    new.teacher_approved_at := null;
    new.teacher_approved_by := null;
    new.grounding_status := 'unverified';
  end if;

  if new.origin <> 'teacher_authored'
     and new.teacher_approved_at is not null
     and new.grounding_status = 'failed' then
    raise exception 'A question that was not found in the source cannot be approved'
      using errcode = 'check_violation';
  end if;

  if new.teacher_approved_at is null then
    new.teacher_approved_by := null;
  elsif new.teacher_approved_at is distinct from old.teacher_approved_at
        or new.teacher_approved_by is distinct from old.teacher_approved_by then
    new.teacher_approved_by := auth.uid();
  end if;

  return new;
end;
$$;

drop trigger if exists generated_questions_approval_guard on public.generated_questions;
create trigger generated_questions_approval_guard
  before update on public.generated_questions
  for each row execute function public.generated_questions_approval_guard();

-- ---------------------------------------------------------------------------
-- 5. Starred cap. Starring a question is refused once the upload already has
--    generation_settings.masteryRequired starred questions (default 4).
--    Lowering masteryRequired later never unstars anything: the UI shows the
--    overage and makes the teacher unstar down to the new cap before
--    generating. Unstarring is always allowed. Runs for every session so the
--    cap holds outside the UI too.
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
    select greatest(1, least(15, coalesce((generation_settings ->> 'masteryRequired')::int, 4)))
      into cap
      from public.curriculum_uploads
      where id = new.upload_id;
    cap := coalesce(cap, 4);
    select count(*) into n
      from public.generated_questions
      where upload_id = new.upload_id and starred and id <> new.id;
    if n >= cap then
      raise exception 'Starred limit reached: this upload allows % starred question(s) (its mastery pass mark)', cap
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
