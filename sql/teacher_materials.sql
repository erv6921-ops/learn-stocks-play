-- teacher_materials: presentations ("deck") and class activities ("activity")
-- that a teacher generates from a selection of lessons. Content is model-
-- generated JSON (slides or an activity), grounded only in the selected lessons.
--
-- One script, safe to run from scratch AND to re-run: every statement is
-- guarded (IF NOT EXISTS / CREATE OR REPLACE / DROP POLICY IF EXISTS).
--
-- Project: InvestiPlay (vcjdshippmqopaffuzbw). Do NOT run `supabase db push`;
-- apply via the Management API / SQL editor exactly like the other curriculum
-- migrations.

create extension if not exists "pgcrypto";

create table if not exists public.teacher_materials (
  id          uuid primary key default gen_random_uuid(),
  teacher_id  uuid not null references auth.users (id) on delete cascade,
  -- 'deck' = slide presentation, 'activity' = printable class activity.
  type        text not null check (type in ('deck', 'activity')),
  title       text not null default 'Untitled',
  -- The lesson ids this material was built from. Mixed keys: built-in lessons
  -- are text ids ("1.1", "psych-3"), generated lessons are UUID strings.
  lesson_ids  text[] not null default '{}',
  -- The generated payload: { version, slides:[...] } for a deck, or
  -- { version, format, ... } for an activity. Shape is enforced client-side.
  content     jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists teacher_materials_teacher_idx
  on public.teacher_materials (teacher_id, updated_at desc);

-- Keep updated_at current on every UPDATE.
create or replace function public.touch_teacher_materials_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_teacher_materials_updated_at on public.teacher_materials;
create trigger trg_teacher_materials_updated_at
  before update on public.teacher_materials
  for each row execute function public.touch_teacher_materials_updated_at();

-- RLS: a teacher sees and manages ONLY their own materials.
alter table public.teacher_materials enable row level security;

drop policy if exists "teacher_materials_select_own" on public.teacher_materials;
create policy "teacher_materials_select_own"
  on public.teacher_materials for select
  using (auth.uid() = teacher_id);

drop policy if exists "teacher_materials_insert_own" on public.teacher_materials;
create policy "teacher_materials_insert_own"
  on public.teacher_materials for insert
  with check (auth.uid() = teacher_id);

drop policy if exists "teacher_materials_update_own" on public.teacher_materials;
create policy "teacher_materials_update_own"
  on public.teacher_materials for update
  using (auth.uid() = teacher_id)
  with check (auth.uid() = teacher_id);

drop policy if exists "teacher_materials_delete_own" on public.teacher_materials;
create policy "teacher_materials_delete_own"
  on public.teacher_materials for delete
  using (auth.uid() = teacher_id);
