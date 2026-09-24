-- ===========================================================================
-- Lesson sharing by email
-- Project: InvestiPlay (vcjdshippmqopaffuzbw)
--
-- NOT applied automatically. Paste into the Supabase SQL Editor. Idempotent.
--
-- A teacher (owner of a public.lessons row) shares a lesson with another
-- teacher's email. The recipient gets READ access to the lesson row and its
-- generated_questions rows, which is enough to preview it and assign it to
-- their own class through the existing assign flow (class_lesson_assignments
-- + assigned_lessons only check that the user teaches the target class).
-- Recipients cannot edit or delete the original lesson: no UPDATE/DELETE
-- policy is added on public.lessons here, and existing policies are untouched.
--
-- Helper functions are SECURITY DEFINER so the lessons <-> lesson_shares
-- policies do not recurse (same pattern as is_lesson_assigned_to_teacher).
-- ===========================================================================

-- ── Table ──────────────────────────────────────────────────────────────────
create table if not exists public.lesson_shares (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  -- Filled server-side from the owner's JWT so the recipient can see who
  -- shared it without needing read access to the owner's profile.
  owner_email text,
  shared_with_email text not null,
  created_at timestamptz not null default now(),
  unique (lesson_id, shared_with_email)
);

create index if not exists lesson_shares_recipient_idx
  on public.lesson_shares (lower(shared_with_email));

create index if not exists lesson_shares_lesson_idx
  on public.lesson_shares (lesson_id);

grant select, insert, delete on public.lesson_shares to authenticated;

-- ── Normalize on insert: lowercase/trim recipient, stamp owner email ───────
create or replace function public.lesson_shares_normalize()
returns trigger
language plpgsql
as $$
begin
  new.shared_with_email := lower(trim(new.shared_with_email));
  if new.owner_id is null then
    new.owner_id := auth.uid();
  end if;
  new.owner_email := lower(coalesce(auth.jwt() ->> 'email', new.owner_email, ''));
  return new;
end;
$$;

drop trigger if exists lesson_shares_normalize on public.lesson_shares;
create trigger lesson_shares_normalize
  before insert on public.lesson_shares
  for each row execute function public.lesson_shares_normalize();

-- ── Helpers (SECURITY DEFINER, bypass RLS to avoid policy recursion) ───────
create or replace function public.is_lesson_owner(_user_id uuid, _lesson_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.lessons l
    where l.id = _lesson_id and l.teacher_id = _user_id
  );
$$;

revoke all on function public.is_lesson_owner(uuid, uuid) from public;
grant execute on function public.is_lesson_owner(uuid, uuid) to authenticated;

create or replace function public.is_lesson_shared_with_me(_lesson_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.lesson_shares s
    where s.lesson_id = _lesson_id
      and s.shared_with_email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

revoke all on function public.is_lesson_shared_with_me(uuid) from public;
grant execute on function public.is_lesson_shared_with_me(uuid) to authenticated;

-- ── RLS on lesson_shares ───────────────────────────────────────────────────
alter table public.lesson_shares enable row level security;

drop policy if exists "Owners insert shares of own lessons" on public.lesson_shares;
create policy "Owners insert shares of own lessons"
  on public.lesson_shares
  for insert
  to authenticated
  with check (
    owner_id = auth.uid()
    and public.is_lesson_owner(auth.uid(), lesson_id)
  );

drop policy if exists "Owners see shares of own lessons" on public.lesson_shares;
create policy "Owners see shares of own lessons"
  on public.lesson_shares
  for select
  to authenticated
  using (
    owner_id = auth.uid()
    and public.is_lesson_owner(auth.uid(), lesson_id)
  );

drop policy if exists "Owners delete shares of own lessons" on public.lesson_shares;
create policy "Owners delete shares of own lessons"
  on public.lesson_shares
  for delete
  to authenticated
  using (
    owner_id = auth.uid()
    and public.is_lesson_owner(auth.uid(), lesson_id)
  );

drop policy if exists "Recipients see shares to their email" on public.lesson_shares;
create policy "Recipients see shares to their email"
  on public.lesson_shares
  for select
  to authenticated
  using (lower(shared_with_email) = lower(coalesce(auth.jwt() ->> 'email', '')));

-- ── Recipients read the shared lesson and its question rows ────────────────
-- (Additive SELECT policies only; nothing existing is changed or removed.)
drop policy if exists "Recipients read lessons shared with them" on public.lessons;
create policy "Recipients read lessons shared with them"
  on public.lessons
  for select
  to authenticated
  using (public.is_lesson_shared_with_me(id));

drop policy if exists "Recipients read questions of lessons shared with them" on public.generated_questions;
create policy "Recipients read questions of lessons shared with them"
  on public.generated_questions
  for select
  to authenticated
  using (
    lesson_id is not null
    and public.is_lesson_shared_with_me(lesson_id)
  );

-- ── Verify ─────────────────────────────────────────────────────────────────
-- select tablename, policyname, cmd from pg_policies
--  where schemaname = 'public'
--    and tablename in ('lesson_shares', 'lessons', 'generated_questions')
--  order by tablename, policyname;
