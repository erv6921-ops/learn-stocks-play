-- ===========================================================================
-- Friends & sharing ("Friends" feature)
-- Project: InvestiPlay (vcjdshippmqopaffuzbw)
--
-- NOT applied automatically. Paste into the Supabase SQL Editor. Idempotent and
-- safe to run from scratch (every object uses "if not exists" / "drop … if
-- exists" / "create or replace"). Do NOT run `supabase db push` for this.
--
-- What it adds:
--   • friendships     – request → accept flow between students who share a class
--   • friend_messages – structured share cards (lesson / jeff_prompt / stock / note)
--   • friend_blocks   – one student blocks another (blocked users can't message you)
--   • friend_reports  – abuse reports; a student's teachers can read them
--
-- RLS mirrors the app's "own-row only" convention (see 20260716000000_partners.sql):
-- students only ever read their own conversations, and can only message accepted,
-- unblocked friends who share a class. Because `profiles` and `class_members` are
-- themselves own-row-only, every directory / roster read goes through a
-- SECURITY DEFINER RPC (same pattern as get_partners / search_students), which is
-- where the "share a class", "are friends" and "not blocked" rules are enforced.
-- ===========================================================================

-- Shared updated_at helper (create defensively so this script stands alone).
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ── Tables ──────────────────────────────────────────────────────────────────

-- friendships: one row per relationship, direction = who asked. `status` moves
-- pending → accepted. are_friends() (below) treats it as undirected.
create table if not exists public.friendships (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references auth.users(id) on delete cascade,
  addressee_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'accepted')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (requester_id, addressee_id),
  check (requester_id <> addressee_id)
);
create index if not exists friendships_requester_idx on public.friendships(requester_id);
create index if not exists friendships_addressee_idx on public.friendships(addressee_id);

-- friend_messages: structured share cards. reference_id/reference_label are the
-- denormalised target (lesson id + title, stock symbol + name, or the Jeff prompt
-- text) so the inbox renders a card without any extra cross-table read (which RLS
-- would block anyway). `note` is the optional ≤140-char message.
create table if not exists public.friend_messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references auth.users(id) on delete cascade,
  recipient_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('lesson', 'jeff_prompt', 'stock', 'note')),
  reference_id text,
  reference_label text,
  note text,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  check (sender_id <> recipient_id),
  check (note is null or char_length(note) <= 140),
  -- Non-note cards must point at something; note cards must carry a note.
  check (
    (type = 'note' and reference_id is null and note is not null)
    or (type <> 'note' and reference_id is not null)
  )
);
create index if not exists friend_messages_pair_idx
  on public.friend_messages(sender_id, recipient_id, created_at);
create index if not exists friend_messages_inbox_idx
  on public.friend_messages(recipient_id, read_at);

create table if not exists public.friend_blocks (
  id uuid primary key default gen_random_uuid(),
  blocker_id uuid not null references auth.users(id) on delete cascade,
  blocked_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (blocker_id, blocked_id),
  check (blocker_id <> blocked_id)
);
create index if not exists friend_blocks_blocker_idx on public.friend_blocks(blocker_id);
create index if not exists friend_blocks_blocked_idx on public.friend_blocks(blocked_id);

create table if not exists public.friend_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references auth.users(id) on delete cascade,
  reported_id uuid not null references auth.users(id) on delete cascade,
  reason text not null,
  note text,
  -- The offending message, when the report was filed from a conversation.
  message_id uuid references public.friend_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  check (reporter_id <> reported_id)
);
create index if not exists friend_reports_reported_idx on public.friend_reports(reported_id);

grant select, insert, update, delete on public.friendships to authenticated;
grant select, insert, delete on public.friend_messages to authenticated;
grant select, insert, delete on public.friend_blocks to authenticated;
grant select, insert on public.friend_reports to authenticated;
grant all on public.friendships to service_role;
grant all on public.friend_messages to service_role;
grant all on public.friend_blocks to service_role;
grant all on public.friend_reports to service_role;

-- updated_at maintenance on friendships.
drop trigger if exists friendships_set_updated_at on public.friendships;
create trigger friendships_set_updated_at
  before update on public.friendships
  for each row execute function public.update_updated_at_column();

-- ── Helpers (SECURITY DEFINER: bypass own-row RLS so policies don't recurse) ──

-- Two users share at least one class (student ↔ student via class_members).
create or replace function public.users_share_class(_a uuid, _b uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.class_members ma
    join public.class_members mb on mb.class_id = ma.class_id
    where ma.user_id = _a and mb.user_id = _b and _a <> _b
  );
$$;
revoke all on function public.users_share_class(uuid, uuid) from public;
grant execute on function public.users_share_class(uuid, uuid) to authenticated;

-- Either user has blocked the other.
create or replace function public.is_blocked_between(_a uuid, _b uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.friend_blocks
    where (blocker_id = _a and blocked_id = _b)
       or (blocker_id = _b and blocked_id = _a)
  );
$$;
revoke all on function public.is_blocked_between(uuid, uuid) from public;
grant execute on function public.is_blocked_between(uuid, uuid) to authenticated;

-- Accepted friendship in either direction.
create or replace function public.are_friends(_a uuid, _b uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.friendships
    where status = 'accepted'
      and (
        (requester_id = _a and addressee_id = _b)
        or (requester_id = _b and addressee_id = _a)
      )
  );
$$;
revoke all on function public.are_friends(uuid, uuid) from public;
grant execute on function public.are_friends(uuid, uuid) to authenticated;

-- The signed-in teacher teaches a class this student belongs to.
create or replace function public.teaches_student(_teacher uuid, _student uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.class_members cm
    join public.classes c on c.id = cm.class_id
    where cm.user_id = _student and c.teacher_id = _teacher
  );
$$;
revoke all on function public.teaches_student(uuid, uuid) from public;
grant execute on function public.teaches_student(uuid, uuid) to authenticated;

-- ── RLS ───────────────────────────────────────────────────────────────────

alter table public.friendships enable row level security;
alter table public.friend_messages enable row level security;
alter table public.friend_blocks enable row level security;
alter table public.friend_reports enable row level security;

-- friendships: either party can read the row (needed for the requests badge +
-- realtime). Direct writes are locked down — everything goes through the
-- SECURITY DEFINER RPCs below, which enforce share-a-class / not-blocked. We do
-- allow a direct addressee accept/decline and either-party delete so the app can
-- also work without the RPCs if needed.
drop policy if exists "friendships_select_involved" on public.friendships;
create policy "friendships_select_involved" on public.friendships
  for select to authenticated
  using (requester_id = auth.uid() or addressee_id = auth.uid());

drop policy if exists "friendships_insert_own_request" on public.friendships;
create policy "friendships_insert_own_request" on public.friendships
  for insert to authenticated
  with check (
    requester_id = auth.uid()
    and status = 'pending'
    and public.users_share_class(auth.uid(), addressee_id)
    and not public.is_blocked_between(auth.uid(), addressee_id)
  );

drop policy if exists "friendships_update_addressee" on public.friendships;
create policy "friendships_update_addressee" on public.friendships
  for update to authenticated
  using (addressee_id = auth.uid() or requester_id = auth.uid())
  with check (addressee_id = auth.uid() or requester_id = auth.uid());

drop policy if exists "friendships_delete_involved" on public.friendships;
create policy "friendships_delete_involved" on public.friendships
  for delete to authenticated
  using (requester_id = auth.uid() or addressee_id = auth.uid());

-- friend_messages: read your own side of any conversation (sender or recipient).
-- INSERT/UPDATE/DELETE are RPC-only (no permissive policy) so the friend + class
-- + block + length rules can never be bypassed by a raw insert.
drop policy if exists "friend_messages_select_involved" on public.friend_messages;
create policy "friend_messages_select_involved" on public.friend_messages
  for select to authenticated
  using (sender_id = auth.uid() or recipient_id = auth.uid());

-- friend_blocks: fully self-owned.
drop policy if exists "friend_blocks_select_own" on public.friend_blocks;
create policy "friend_blocks_select_own" on public.friend_blocks
  for select to authenticated using (blocker_id = auth.uid());
drop policy if exists "friend_blocks_insert_own" on public.friend_blocks;
create policy "friend_blocks_insert_own" on public.friend_blocks
  for insert to authenticated with check (blocker_id = auth.uid());
drop policy if exists "friend_blocks_delete_own" on public.friend_blocks;
create policy "friend_blocks_delete_own" on public.friend_blocks
  for delete to authenticated using (blocker_id = auth.uid());

-- friend_reports: a reporter can insert + read their own; a student's teachers
-- can read reports filed against that student.
drop policy if exists "friend_reports_insert_own" on public.friend_reports;
create policy "friend_reports_insert_own" on public.friend_reports
  for insert to authenticated with check (reporter_id = auth.uid());
drop policy if exists "friend_reports_select_own_or_teacher" on public.friend_reports;
create policy "friend_reports_select_own_or_teacher" on public.friend_reports
  for select to authenticated
  using (reporter_id = auth.uid() or public.teaches_student(auth.uid(), reported_id));

-- ── Directory / roster RPCs (SECURITY DEFINER) ──────────────────────────────

-- Classmates I could add: every student sharing a class with me, minus me,
-- teachers and anyone in a block relationship. `status` tells the UI how to
-- render the row (none / pending_out / pending_in / accepted).
create or replace function public.friends_list_classmates()
returns table (
  user_id uuid,
  first_name text,
  last_name text,
  school_name text,
  grade integer,
  status text
)
language sql
stable
security definer
set search_path = public
as $$
  select distinct on (p.id)
    p.id as user_id,
    p.first_name,
    p.last_name,
    p.school_name,
    p.grade,
    case
      when exists (
        select 1 from public.friendships f
        where f.status = 'accepted'
          and ((f.requester_id = auth.uid() and f.addressee_id = p.id)
            or (f.requester_id = p.id and f.addressee_id = auth.uid()))
      ) then 'accepted'
      when exists (
        select 1 from public.friendships f
        where f.status = 'pending' and f.requester_id = auth.uid() and f.addressee_id = p.id
      ) then 'pending_out'
      when exists (
        select 1 from public.friendships f
        where f.status = 'pending' and f.requester_id = p.id and f.addressee_id = auth.uid()
      ) then 'pending_in'
      else 'none'
    end as status
  from public.class_members me
  join public.class_members them on them.class_id = me.class_id and them.user_id <> me.user_id
  join public.profiles p on p.id = them.user_id
  where me.user_id = auth.uid()
    and (p.role is distinct from 'teacher')
    and not public.is_blocked_between(auth.uid(), p.id)
  order by p.id, p.first_name, p.last_name;
$$;
grant execute on function public.friends_list_classmates() to authenticated;

-- Accepted friends + per-friend unread count and last-activity time (for the
-- conversation list ordering + unread badges).
create or replace function public.friends_list()
returns table (
  user_id uuid,
  first_name text,
  last_name text,
  school_name text,
  grade integer,
  unread bigint,
  last_message_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  with me as (select auth.uid() as uid)
  select
    other.id as user_id,
    other.first_name,
    other.last_name,
    other.school_name,
    other.grade,
    coalesce((
      select count(*) from public.friend_messages m
      where m.recipient_id = (select uid from me)
        and m.sender_id = other.id
        and m.read_at is null
    ), 0) as unread,
    (
      select max(m.created_at) from public.friend_messages m
      where (m.sender_id = (select uid from me) and m.recipient_id = other.id)
         or (m.sender_id = other.id and m.recipient_id = (select uid from me))
    ) as last_message_at
  from public.friendships f
  join public.profiles other on other.id = case
    when f.requester_id = (select uid from me) then f.addressee_id else f.requester_id end
  where f.status = 'accepted'
    and ((select uid from me) in (f.requester_id, f.addressee_id))
    and not public.is_blocked_between((select uid from me), other.id)
  order by last_message_at desc nulls last, other.first_name;
$$;
grant execute on function public.friends_list() to authenticated;

-- Incoming pending requests (people who asked to be my friend).
create or replace function public.friends_list_requests()
returns table (
  user_id uuid,
  first_name text,
  last_name text,
  school_name text,
  grade integer
)
language sql
stable
security definer
set search_path = public
as $$
  select p.id as user_id, p.first_name, p.last_name, p.school_name, p.grade
  from public.friendships f
  join public.profiles p on p.id = f.requester_id
  where f.addressee_id = auth.uid()
    and f.status = 'pending'
    and not public.is_blocked_between(auth.uid(), p.id)
  order by f.created_at desc;
$$;
grant execute on function public.friends_list_requests() to authenticated;

-- ── Mutation RPCs ────────────────────────────────────────────────────────────

-- Send a friend request. If the other person already invited me, this accepts
-- it (returns 'accepted'); otherwise it creates a pending request ('pending').
create or replace function public.friends_send_request(_to uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  _me uuid := auth.uid();
  _reverse public.friendships%rowtype;
begin
  if _me is null then raise exception 'Not authenticated'; end if;
  if _to = _me then raise exception 'You cannot add yourself'; end if;
  if not public.users_share_class(_me, _to) then
    raise exception 'You can only add classmates';
  end if;
  if public.is_blocked_between(_me, _to) then
    raise exception 'This student is unavailable';
  end if;

  -- They already asked me → accept their request instead of making a new one.
  select * into _reverse from public.friendships
  where requester_id = _to and addressee_id = _me and status = 'pending';
  if found then
    update public.friendships set status = 'accepted' where id = _reverse.id;
    return 'accepted';
  end if;

  insert into public.friendships (requester_id, addressee_id, status)
  values (_me, _to, 'pending')
  on conflict (requester_id, addressee_id) do nothing;

  -- Already-accepted pair inserting again is a no-op; report the real state.
  if public.are_friends(_me, _to) then return 'accepted'; end if;
  return 'pending';
end;
$$;
grant execute on function public.friends_send_request(uuid) to authenticated;

-- Accept or decline an incoming request.
create or replace function public.friends_respond_request(_from uuid, _accept boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare _me uuid := auth.uid();
begin
  if _me is null then raise exception 'Not authenticated'; end if;
  if _accept then
    update public.friendships set status = 'accepted'
    where requester_id = _from and addressee_id = _me and status = 'pending';
  else
    delete from public.friendships
    where requester_id = _from and addressee_id = _me and status = 'pending';
  end if;
end;
$$;
grant execute on function public.friends_respond_request(uuid, boolean) to authenticated;

-- Remove a friend (or cancel a request) in either direction.
create or replace function public.friends_remove(_other uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare _me uuid := auth.uid();
begin
  if _me is null then raise exception 'Not authenticated'; end if;
  delete from public.friendships
  where (requester_id = _me and addressee_id = _other)
     or (requester_id = _other and addressee_id = _me);
end;
$$;
grant execute on function public.friends_remove(uuid) to authenticated;

-- Send a share card / note to an accepted, unblocked friend who shares a class.
create or replace function public.friends_send_message(
  _to uuid,
  _type text,
  _reference_id text,
  _reference_label text,
  _note text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  _me uuid := auth.uid();
  _clean_note text := nullif(btrim(coalesce(_note, '')), '');
  _id uuid;
begin
  if _me is null then raise exception 'Not authenticated'; end if;
  if _type not in ('lesson', 'jeff_prompt', 'stock', 'note') then
    raise exception 'Unknown message type: %', _type;
  end if;
  if not public.are_friends(_me, _to) then
    raise exception 'You can only message friends';
  end if;
  if public.is_blocked_between(_me, _to) then
    raise exception 'This student is unavailable';
  end if;
  if not public.users_share_class(_me, _to) then
    raise exception 'You can only message classmates';
  end if;
  if _clean_note is not null and char_length(_clean_note) > 140 then
    raise exception 'Note is too long (max 140 characters)';
  end if;
  if _type = 'note' then
    if _clean_note is null then raise exception 'Empty note'; end if;
  elsif _reference_id is null or btrim(_reference_id) = '' then
    raise exception 'Missing reference for % card', _type;
  end if;

  insert into public.friend_messages (sender_id, recipient_id, type, reference_id, reference_label, note)
  values (
    _me, _to, _type,
    case when _type = 'note' then null else _reference_id end,
    nullif(btrim(coalesce(_reference_label, '')), ''),
    _clean_note
  )
  returning id into _id;
  return _id;
end;
$$;
grant execute on function public.friends_send_message(uuid, text, text, text, text) to authenticated;

-- Mark every message from one friend as read (called when a conversation opens).
create or replace function public.friends_mark_read(_other uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.friend_messages
  set read_at = now()
  where recipient_id = auth.uid() and sender_id = _other and read_at is null;
$$;
grant execute on function public.friends_mark_read(uuid) to authenticated;

-- Total unread messages (nav badge).
create or replace function public.friends_unread_count()
returns bigint
language sql
stable
security definer
set search_path = public
as $$
  select count(*)::bigint from public.friend_messages
  where recipient_id = auth.uid() and read_at is null;
$$;
grant execute on function public.friends_unread_count() to authenticated;

-- Block / unblock. Blocking also tears down any friendship so the person leaves
-- your list and can no longer message you (send is re-checked server-side too).
create or replace function public.friends_block(_other uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare _me uuid := auth.uid();
begin
  if _me is null then raise exception 'Not authenticated'; end if;
  if _other = _me then raise exception 'You cannot block yourself'; end if;
  insert into public.friend_blocks (blocker_id, blocked_id)
  values (_me, _other)
  on conflict (blocker_id, blocked_id) do nothing;
  delete from public.friendships
  where (requester_id = _me and addressee_id = _other)
     or (requester_id = _other and addressee_id = _me);
end;
$$;
grant execute on function public.friends_block(uuid) to authenticated;

create or replace function public.friends_unblock(_other uuid)
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.friend_blocks where blocker_id = auth.uid() and blocked_id = _other;
$$;
grant execute on function public.friends_unblock(uuid) to authenticated;

-- File an abuse report against another student.
create or replace function public.friends_report(
  _reported uuid,
  _reason text,
  _note text,
  _message_id uuid
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare _me uuid := auth.uid();
begin
  if _me is null then raise exception 'Not authenticated'; end if;
  if _reported = _me then raise exception 'You cannot report yourself'; end if;
  insert into public.friend_reports (reporter_id, reported_id, reason, note, message_id)
  values (_me, _reported, coalesce(nullif(btrim(_reason), ''), 'unspecified'),
          nullif(btrim(coalesce(_note, '')), ''), _message_id);
end;
$$;
grant execute on function public.friends_report(uuid, text, text, uuid) to authenticated;

-- Teacher view: reports filed against students in the signed-in teacher's classes.
create or replace function public.friends_list_reports()
returns table (
  id uuid,
  reporter_id uuid,
  reporter_name text,
  reported_id uuid,
  reported_name text,
  reason text,
  note text,
  message_id uuid,
  message_type text,
  message_note text,
  created_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    r.id,
    r.reporter_id,
    btrim(coalesce(rp.first_name, '') || ' ' || coalesce(rp.last_name, '')) as reporter_name,
    r.reported_id,
    btrim(coalesce(tp.first_name, '') || ' ' || coalesce(tp.last_name, '')) as reported_name,
    r.reason,
    r.note,
    r.message_id,
    m.type as message_type,
    m.note as message_note,
    r.created_at
  from public.friend_reports r
  join public.profiles rp on rp.id = r.reporter_id
  join public.profiles tp on tp.id = r.reported_id
  left join public.friend_messages m on m.id = r.message_id
  where public.teaches_student(auth.uid(), r.reported_id)
  order by r.created_at desc;
$$;
grant execute on function public.friends_list_reports() to authenticated;

-- ── Realtime ─────────────────────────────────────────────────────────────────
-- Stream new messages (inbox + unread badge) and incoming requests to the
-- recipient the instant they're written. RLS already restricts what each client
-- can read, so Realtime only forwards rows the subscriber is allowed to see.
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'friend_messages'
  ) then
    alter publication supabase_realtime add table public.friend_messages;
  end if;
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'friendships'
  ) then
    alter publication supabase_realtime add table public.friendships;
  end if;
end $$;

-- ── Verify ─────────────────────────────────────────────────────────────────
-- select tablename, policyname, cmd from pg_policies
--  where schemaname = 'public'
--    and tablename in ('friendships','friend_messages','friend_blocks','friend_reports')
--  order by tablename, policyname;
