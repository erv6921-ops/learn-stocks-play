-- Stock Prediction Draft: a semester-long stock-picking icebreaker. On day one
-- each student picks ONE stock; the pick is snapshotted at Yahoo Finance's price
-- and then tracked passively for the rest of the semester. One pick per student
-- per class, editable for a 48-hour window (lock enforced client-side by
-- comparing pick_date to now(); the `locked` column is a fallback/manual
-- override). Mirrors the class_challenges FK + RLS patterns.

create table stock_predictions (
  id uuid default gen_random_uuid() primary key,
  -- profiles.id == auth.users.id here, so student_id doubles as the auth id
  -- used by the RLS policies below.
  student_id uuid references profiles(id) on delete cascade not null,
  class_id uuid references classes(id) on delete cascade not null,
  ticker text not null,             -- e.g. "AAPL"
  company_name text not null,       -- e.g. "Apple"
  pick_price numeric not null,      -- price at time of pick (Yahoo snapshot)
  pick_date timestamptz default now(),
  locked boolean default false,     -- true once the 48h edit window closes
  created_at timestamptz default now(),
  -- One pick per student per class (semester) — no duplicates. Lets the client
  -- upsert on change during the edit window instead of inserting a new row.
  unique (student_id, class_id)
);

create index stock_predictions_class_id_idx on stock_predictions(class_id);
create index stock_predictions_student_id_idx on stock_predictions(student_id);

alter table stock_predictions enable row level security;

-- ── stock_predictions RLS ───────────────────────────────────────────────────
-- Students manage their own single row.
create policy "Students can view own prediction"
on stock_predictions for select
using (auth.uid() = student_id);

create policy "Students can insert own prediction"
on stock_predictions for insert
with check (auth.uid() = student_id);

create policy "Students can update own prediction"
on stock_predictions for update
using (auth.uid() = student_id)
with check (auth.uid() = student_id);

-- The class teacher can read every pick in their class (roster overview / the
-- teacher leaderboard). Students read peers' picks through the SECURITY DEFINER
-- RPC below rather than directly, matching how the class leaderboard works.
create policy "Teachers can view class predictions"
on stock_predictions for select
using (class_id in (select id from classes where teacher_id = auth.uid()));

-- ── Leaderboard RPC ─────────────────────────────────────────────────────────
-- The callback/leaderboard view (used by both students and teachers) needs
-- every pick in the class joined to the student's name. profiles' RLS only
-- exposes a user's own row, so — exactly like get_class_leaderboard — this
-- SECURITY DEFINER function returns the joined rows, but only to a member or
-- teacher of the class. The client fetches live prices and computes % change.
create or replace function public.get_stock_predictions(_class_id uuid)
returns table (
  id uuid,
  student_id uuid,
  first_name text,
  last_name text,
  ticker text,
  company_name text,
  pick_price numeric,
  pick_date timestamptz,
  locked boolean
)
language sql
stable
security definer
set search_path = public
as $$
  select
    sp.id,
    sp.student_id,
    p.first_name,
    p.last_name,
    sp.ticker,
    sp.company_name,
    sp.pick_price,
    sp.pick_date,
    sp.locked
  from public.stock_predictions sp
  join public.profiles p on p.id = sp.student_id
  where sp.class_id = _class_id
    -- Only expose the class's picks to members/teachers of that class.
    and (
      public.is_class_member(auth.uid(), _class_id)
      or public.is_class_teacher(auth.uid(), _class_id)
    )
  order by sp.pick_date asc;
$$;

grant execute on function public.get_stock_predictions(uuid) to authenticated;
