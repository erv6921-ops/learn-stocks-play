-- Teacher-launched draft sessions. When the teacher "starts the draft", one row
-- per class is upserted with active=true; Realtime streams that to every
-- student in the class, whose client then shows a blocking "make your pick" pop
-- up until they've picked. class_id is the PK so a class has exactly one
-- session that gets flipped on/off rather than accumulating rows.

create table stock_draft_sessions (
  class_id uuid primary key references classes(id) on delete cascade,
  active boolean not null default true,
  launched_by uuid references profiles(id),
  launched_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table stock_draft_sessions enable row level security;

-- Class members and the class teacher can see whether a draft is live.
create policy "Class can view draft session"
on stock_draft_sessions for select
using (
  class_id in (select class_id from class_members where user_id = auth.uid())
  or class_id in (select id from classes where teacher_id = auth.uid())
);

-- Only the class teacher can launch (insert) or end/relaunch (update) a session.
create policy "Teacher can launch draft session"
on stock_draft_sessions for insert
with check (class_id in (select id from classes where teacher_id = auth.uid()));

create policy "Teacher can update draft session"
on stock_draft_sessions for update
using (class_id in (select id from classes where teacher_id = auth.uid()))
with check (class_id in (select id from classes where teacher_id = auth.uid()));

-- Stream launches to students in real time. RLS above already scopes each
-- student to their own class's row, so Realtime only forwards the event to the
-- right students. Idempotent (mirrors the partners/lesson_grades realtime adds).
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.stock_draft_sessions;
  EXCEPTION WHEN others THEN NULL;
  END;
END $$;
