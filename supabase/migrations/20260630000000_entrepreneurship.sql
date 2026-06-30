-- Gulliver Biz Lab — Mrs. Fortgang's Shark Tank entrepreneurship unit.
--
-- One row per (student, submission_type). The unit collects several distinct
-- deliverables (elevator pitch text, business-plan answers, prototype photos,
-- logo designs, commercial video link, website link). We keep them in a single
-- table keyed by `submission_type` so a student has exactly one current version
-- of each deliverable — saving again upserts over the previous answer.
create table if not exists public.entrepreneurship_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  -- e.g. 'elevator_pitch' | 'business_plan' | 'prototype' | 'logo'
  --      | 'commercial' | 'website'
  submission_type text not null,
  -- Structured answers (business-plan questions, vibe brainstorm, etc.).
  content jsonb not null default '{}'::jsonb,
  -- External links (commercial video, published website) when applicable.
  link text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, submission_type)
);

alter table public.entrepreneurship_submissions enable row level security;

create policy "Users can manage own entrepreneurship submissions"
  on public.entrepreneurship_submissions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Marks a student as enrolled in the Gulliver Biz Lab program. When true the
-- app hides the AP elective tabs and shows only Regular Course + Biz Lab.
alter table public.profiles
  add column if not exists biz_lab_enrolled boolean not null default false;
