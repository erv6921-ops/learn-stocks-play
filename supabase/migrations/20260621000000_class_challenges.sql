-- Class Challenges: students/teachers post coin-pot competitions within a class.

create table class_challenges (
  id uuid default gen_random_uuid() primary key,
  class_id uuid references classes(id) on delete cascade,
  created_by uuid references auth.users(id),
  created_by_role text not null check (created_by_role in ('student', 'teacher')),
  title text not null,
  description text not null,
  metric text not null check (metric in ('lessons_completed', 'xp_earned', 'streak_days', 'quiz_score_avg')),
  entry_fee integer not null default 25,
  pot integer not null default 0,
  teacher_bonus integer not null default 0,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text not null default 'active' check (status in ('active', 'completed', 'cancelled')),
  winner_user_id uuid references auth.users(id),
  created_at timestamptz default now()
);

create table challenge_entries (
  id uuid default gen_random_uuid() primary key,
  challenge_id uuid references class_challenges(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  coins_contributed integer not null,
  score integer not null default 0,
  joined_at timestamptz default now(),
  unique(challenge_id, user_id)
);

create index challenge_entries_challenge_id_idx on challenge_entries(challenge_id);
create index class_challenges_class_id_idx on class_challenges(class_id);

alter table class_challenges enable row level security;
alter table challenge_entries enable row level security;

-- Membership covers students (class_members) and teachers (classes.teacher_id),
-- since teachers own their classes rather than being enrolled in them.
-- ── class_challenges ──────────────────────────────────────────────────────
create policy "Class members can view challenges"
on class_challenges for select
using (
  class_id in (select class_id from class_members where user_id = auth.uid())
  or class_id in (select id from classes where teacher_id = auth.uid())
);

create policy "Students and teachers can create challenges"
on class_challenges for insert
with check (auth.uid() = created_by);

-- Needed so entering a challenge can grow the pot, and so expiry/winner and
-- teacher cancellation can update status. Scoped to the challenge's class.
create policy "Class members can update challenges"
on class_challenges for update
using (
  class_id in (select class_id from class_members where user_id = auth.uid())
  or class_id in (select id from classes where teacher_id = auth.uid())
);

-- ── challenge_entries ─────────────────────────────────────────────────────
-- Standings need every entry in challenges that belong to the viewer's class,
-- not just their own row.
create policy "Class members can view entries"
on challenge_entries for select
using (
  challenge_id in (
    select id from class_challenges
    where class_id in (select class_id from class_members where user_id = auth.uid())
       or class_id in (select id from classes where teacher_id = auth.uid())
  )
);

create policy "Users can enter challenges"
on challenge_entries for insert
with check (auth.uid() = user_id);

-- Score is recalculated client-side on load for the current user.
create policy "Users can update their own entry"
on challenge_entries for update
using (auth.uid() = user_id);

-- Used for self-service refunds when a challenge is cancelled.
create policy "Users can remove their own entry"
on challenge_entries for delete
using (auth.uid() = user_id);
