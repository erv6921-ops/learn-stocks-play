-- ===========================================================================
-- Friends & sharing — v3 (let existing Partners chat too)
-- Project: InvestiPlay (vcjdshippmqopaffuzbw)
--
-- Applies ON TOP OF friends_chat.sql + friends_chat_v2.sql. NOT auto-applied —
-- paste into the Supabase SQL Editor. Do NOT run `supabase db push`.
--
-- Problem: two students who are already accepted *partners* (public.partners,
-- the "Find Partners" feature) were NOT friends in the chat, so they couldn't
-- message each other without re-adding.
--
-- Fix (query-time bridge, no data duplication, covers existing AND future
-- partners): an accepted partnership counts as a friendship for the chat, as
-- long as the two share a class — the "classmates only" safety rule is kept, so
-- cross-class partners still can't message. Three SECURITY DEFINER functions are
-- updated; nothing else (no tables, no RLS, no frontend) changes. Idempotent.
--
--   • are_friends()            → true for accepted friendship OR accepted partner
--   • friends_list()           → union of accepted friends + class-sharing
--                                 accepted partners (deduped), same columns
--   • friends_list_classmates()→ a classmate who's an accepted partner shows as
--                                 'accepted' (no duplicate "Add" button)
-- ===========================================================================

-- ── are_friends: accepted friendship OR accepted partnership ─────────────────
-- Used by the message-send gate (still AND users_share_class, so classmates
-- only) and by friends_send_request (returns 'accepted' for an existing partner
-- instead of creating a second relationship row).
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
      and ((requester_id = _a and addressee_id = _b)
        or (requester_id = _b and addressee_id = _a))
  )
  or exists (
    select 1 from public.partners
    where status = 'accepted'
      and ((user_id = _a and partner_id = _b)
        or (user_id = _b and partner_id = _a))
  );
$$;
revoke all on function public.are_friends(uuid, uuid) from public;
grant execute on function public.are_friends(uuid, uuid) to authenticated;

-- ── friends_list: accepted friends ∪ class-sharing accepted partners ─────────
-- Same return columns as v2 (create-or-replace, no signature change). Partners
-- are filtered by users_share_class so the inbox only ever lists people you can
-- actually message; friendship rows are kept as-is (they were classmates when
-- the request was made). Deduped so a friend-who-is-also-a-partner appears once.
create or replace function public.friends_list()
returns table (
  user_id uuid,
  first_name text,
  last_name text,
  school_name text,
  grade integer,
  unread bigint,
  last_message_at timestamptz,
  last_message_type text,
  last_message_note text,
  last_message_label text,
  last_message_sender uuid
)
language sql
stable
security definer
set search_path = public
as $$
  with me as (select auth.uid() as uid),
  friend_ids as (
    -- accepted friendships (either direction)
    select case when f.requester_id = (select uid from me) then f.addressee_id else f.requester_id end as oid
    from public.friendships f
    where f.status = 'accepted'
      and (select uid from me) in (f.requester_id, f.addressee_id)
    union
    -- accepted partnerships that share a class (either direction)
    select case when pa.user_id = (select uid from me) then pa.partner_id else pa.user_id end as oid
    from public.partners pa
    where pa.status = 'accepted'
      and (select uid from me) in (pa.user_id, pa.partner_id)
      and public.users_share_class(
            (select uid from me),
            case when pa.user_id = (select uid from me) then pa.partner_id else pa.user_id end
          )
  )
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
    lm.created_at as last_message_at,
    lm.type as last_message_type,
    lm.note as last_message_note,
    lm.reference_label as last_message_label,
    lm.sender_id as last_message_sender
  from (select distinct oid from friend_ids) fi
  join public.profiles other on other.id = fi.oid
  left join lateral (
    select m.type, m.note, m.reference_label, m.sender_id, m.created_at
    from public.friend_messages m
    where (m.sender_id = (select uid from me) and m.recipient_id = other.id)
       or (m.sender_id = other.id and m.recipient_id = (select uid from me))
    order by m.created_at desc
    limit 1
  ) lm on true
  where not public.is_blocked_between((select uid from me), other.id)
  order by lm.created_at desc nulls last, other.first_name;
$$;
grant execute on function public.friends_list() to authenticated;

-- ── friends_list_classmates: partner-accepted classmates read as 'accepted' ──
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
      )
        or exists (
        select 1 from public.partners pa
        where pa.status = 'accepted'
          and ((pa.user_id = auth.uid() and pa.partner_id = p.id)
            or (pa.user_id = p.id and pa.partner_id = auth.uid()))
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

-- ── Verify ─────────────────────────────────────────────────────────────────
-- As a signed-in student, select * from public.friends_list();  -- partners you
-- share a class with should now appear alongside your chat friends.
