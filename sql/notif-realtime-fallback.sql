-- ============================================================================
-- Per-student notifications for reliable realtime browser notifications
-- ----------------------------------------------------------------------------
-- REVIEW / RUN YOURSELF.
--
-- Why: Realtime's postgres_changes RLS check only reliably evaluates direct
-- column = auth.uid() policies. Confirmed on investiplay.app: lesson_progress
-- (user_id = auth.uid()) delivers, but assigned_lessons does NOT - even after
-- rewriting its class-scoped policy to an inline EXISTS. So we stop depending on
-- realtime evaluating class/function policies and instead fan events out into a
-- per-student table whose policy is a plain user_id = auth.uid().
--
-- Stays DIRECT (no change needed, already deliver - pure direct-column policies):
--   lesson_grades, partners, friend_messages.
-- Routed through student_notifications here (function / cross-table policies):
--   assigned_lessons (class-level), business_grades (... OR is_teacher_of_student()).
-- ============================================================================

-- 1. Table ------------------------------------------------------------------
create table if not exists public.student_notifications (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  type       text not null,                      -- 'classwork' | 'homework' | 'business_grade'
  title      text,
  body       text,
  link       text,
  read       boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists student_notifications_user_idx
  on public.student_notifications (user_id, created_at desc);

-- 2. RLS: each user sees / updates only their own rows ----------------------
alter table public.student_notifications enable row level security;

drop policy if exists "sn_select_own" on public.student_notifications;
create policy "sn_select_own" on public.student_notifications
  for select to authenticated using (user_id = auth.uid());

drop policy if exists "sn_update_own" on public.student_notifications;
create policy "sn_update_own" on public.student_notifications
  for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

grant select, update on public.student_notifications to authenticated;

-- 3. Realtime ---------------------------------------------------------------
alter publication supabase_realtime add table public.student_notifications;

-- 4a. New assignment -> one notification per class member -------------------
create or replace function public.notify_assignment()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.student_notifications (user_id, type, title, body, link)
  select cm.user_id,
         case when new.assignment_type = 'homework' then 'homework' else 'classwork' end,
         case when new.assignment_type = 'homework' then 'New homework' else 'New classwork' end,
         'Your teacher assigned new work. Tap to get started.',
         '/dashboard'
  from public.class_members cm
  where cm.class_id = new.class_id;
  return new;
end;
$$;

drop trigger if exists trg_notify_assignment on public.assigned_lessons;
create trigger trg_notify_assignment
  after insert on public.assigned_lessons
  for each row execute function public.notify_assignment();

-- 4b. Business work graded -> notify that student ---------------------------
create or replace function public.notify_business_grade()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (new.grade is not null or new.feedback is not null)
     and (tg_op = 'INSERT'
          or new.grade    is distinct from old.grade
          or new.feedback is distinct from old.feedback) then
    insert into public.student_notifications (user_id, type, title, body, link)
    values (new.user_id, 'business_grade', 'Your work was graded',
            'Your teacher graded your business work. Tap to see it.', '/dashboard');
  end if;
  return new;
end;
$$;

drop trigger if exists trg_notify_business_grade on public.business_grades;
create trigger trg_notify_business_grade
  after insert or update on public.business_grades
  for each row execute function public.notify_business_grade();

-- ----------------------------------------------------------------------------
-- After running: no redeploy needed for the SQL side. The client build that
-- subscribes to student_notifications must be live (see the pushed build). Then
-- reassign a lesson -> the student should log
--   [notif-debug] student_notifications INSERT received
-- and the banner should fire.
-- ============================================================================
