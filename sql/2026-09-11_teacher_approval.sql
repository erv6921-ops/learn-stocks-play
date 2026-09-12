-- Teacher approval gate for generated content. Run in the Supabase SQL Editor.
-- Order matters: columns are added and BACKFILLED before any policy changes,
-- so the 45 live generated_questions rows (and every existing lesson) stay
-- visible to students without interruption.

-- ---------------------------------------------------------------------------
-- 1. Columns + backfill: generated_questions
-- ---------------------------------------------------------------------------
alter table public.generated_questions
  add column if not exists teacher_approved_at timestamptz,
  add column if not exists teacher_approved_by uuid references auth.users(id) on delete set null;

update public.generated_questions
  set teacher_approved_at = now()
  where teacher_approved_at is null;

create index if not exists generated_questions_teacher_approved_idx
  on public.generated_questions (upload_id, teacher_approved_at);

-- ---------------------------------------------------------------------------
-- 2. Columns + backfill: lessons (same pattern; gates the whole lesson)
-- ---------------------------------------------------------------------------
alter table public.lessons
  add column if not exists teacher_approved_at timestamptz,
  add column if not exists teacher_approved_by uuid references auth.users(id) on delete set null;

update public.lessons
  set teacher_approved_at = now()
  where teacher_approved_at is null;

-- ---------------------------------------------------------------------------
-- 3. Guards (BEFORE UPDATE, user sessions only; service role has no auth.uid())
--    - a question with grounding_status = 'failed' can never be approved
--    - teacher_approved_by is always the approving user, never client-supplied
--    - editing question content from a user session clears approval and
--      resets grounding to 'unverified' (verify-question-v2 re-verifies)
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

  if new.question_text is distinct from old.question_text
     or new.options is distinct from old.options
     or new.correct_answer is distinct from old.correct_answer
     or new.explanation is distinct from old.explanation then
    new.teacher_approved_at := null;
    new.teacher_approved_by := null;
    new.grounding_status := 'unverified';
  end if;

  if new.teacher_approved_at is not null and new.grounding_status = 'failed' then
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

create or replace function public.lessons_approval_guard()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    return new;
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

drop trigger if exists lessons_approval_guard on public.lessons;
create trigger lessons_approval_guard
  before update on public.lessons
  for each row execute function public.lessons_approval_guard();

-- ---------------------------------------------------------------------------
-- 4. Student visibility now also requires teacher approval.
--    The lesson_id and grounding_status clauses are unchanged.
-- ---------------------------------------------------------------------------
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
    and teacher_approved_at is not null
  );

drop policy if exists "Students see assigned lessons" on public.lessons;
create policy "Students see assigned lessons"
  on public.lessons
  for select
  using (
    id in (
      select cla.lesson_id
      from public.class_lesson_assignments cla
      join public.class_members cm on cm.class_id = cla.class_id
      where cm.user_id = auth.uid()
    )
    and teacher_approved_at is not null
  );

-- ---------------------------------------------------------------------------
-- 5. Teachers approve / reject their own generated questions.
--    Approve = UPDATE teacher_approved_at (guard stamps teacher_approved_by).
--    Reject  = DELETE the row (no delete policy existed before).
--    Lessons already have "Teachers update own lessons" (teacher_id = auth.uid()).
-- ---------------------------------------------------------------------------
drop policy if exists "Teachers approve questions from own uploads" on public.generated_questions;
create policy "Teachers approve questions from own uploads"
  on public.generated_questions
  for update
  using (
    upload_id in (select id from public.curriculum_uploads where teacher_id = auth.uid())
  )
  with check (
    upload_id in (select id from public.curriculum_uploads where teacher_id = auth.uid())
  );

drop policy if exists "Teachers delete questions from own uploads" on public.generated_questions;
create policy "Teachers delete questions from own uploads"
  on public.generated_questions
  for delete
  using (
    upload_id in (select id from public.curriculum_uploads where teacher_id = auth.uid())
  );

-- ---------------------------------------------------------------------------
-- 6. Read-only admin view of everything that went live, across all teachers.
--    Same allowlist mechanism as the existing profiles_admin_read policy.
-- ---------------------------------------------------------------------------
drop policy if exists "Admin reads all lessons" on public.lessons;
create policy "Admin reads all lessons"
  on public.lessons
  for select
  using ((auth.jwt() ->> 'email') = 'erv6921@gmail.com');

drop policy if exists "Admin reads all generated questions" on public.generated_questions;
create policy "Admin reads all generated questions"
  on public.generated_questions
  for select
  using ((auth.jwt() ->> 'email') = 'erv6921@gmail.com');

drop policy if exists "Admin reads all curriculum uploads" on public.curriculum_uploads;
create policy "Admin reads all curriculum uploads"
  on public.curriculum_uploads
  for select
  using ((auth.jwt() ->> 'email') = 'erv6921@gmail.com');

drop policy if exists "Admin reads all source chunks" on public.curriculum_source_chunks;
create policy "Admin reads all source chunks"
  on public.curriculum_source_chunks
  for select
  using ((auth.jwt() ->> 'email') = 'erv6921@gmail.com');
