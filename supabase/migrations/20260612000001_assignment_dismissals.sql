-- Per-user record of which assignment notifications a student has already been
-- shown, so the "you have assignments" dialog appears once per assignment and is
-- consistent across devices/browsers (it's keyed to the user id, not the
-- browser's localStorage). Replaces the earlier device-local approach.
--
-- Cascade on assigned_lessons: if a teacher deletes and re-creates an
-- assignment, the old dismissal disappears and the new one can surface again.
create table assignment_dismissals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  assignment_id uuid not null references public.assigned_lessons(id) on delete cascade,
  dismissed_at timestamptz default now(),
  unique(user_id, assignment_id)
);

alter table assignment_dismissals enable row level security;

-- A student can only ever see and write their own dismissal rows.
create policy "Users can manage own assignment dismissals"
on assignment_dismissals
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
