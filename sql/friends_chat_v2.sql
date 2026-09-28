-- ===========================================================================
-- Friends & sharing — v2 (mutual friendship + inbox previews)
-- Project: InvestiPlay (vcjdshippmqopaffuzbw)
--
-- Applies ON TOP OF sql/friends_chat.sql (which creates the tables, RLS and the
-- base RPCs). NOT applied automatically — paste into the Supabase SQL Editor.
-- Do NOT run `supabase db push`.
--
-- Idempotent and safe to re-run. The data-cleanup step is guarded with
-- to_regclass so running it before the base script simply no-ops instead of
-- erroring. What it does, in order:
--   1. Collapse existing duplicate / two-way-pending friendships to ONE row so a
--      pair-unique index can be added (a mutually-pending pair becomes friends).
--   2. Add a unique index on the unordered pair — no second row can ever exist
--      for the same two users, in either direction.
--   3. Rework friends_send_request so one accept = mutual friends, with no
--      chance of a duplicate/second request.
--   4. Extend friends_list with a last-message preview for the merged inbox.
-- ===========================================================================

-- ── 1. Clean up existing data BEFORE adding the pair-unique index ────────────
do $$
begin
  if to_regclass('public.friendships') is null then
    raise notice 'public.friendships not found — run sql/friends_chat.sql first; skipping cleanup.';
    return;
  end if;

  -- Promote the canonical keeper of each pair to 'accepted' when the pair is
  -- already accepted anywhere, or both directions were pending (both asked →
  -- they're friends). Keeper = accepted-first, then oldest.
  with ranked as (
    select
      id,
      status,
      row_number() over (
        partition by least(requester_id, addressee_id), greatest(requester_id, addressee_id)
        order by (status = 'accepted') desc, created_at asc
      ) as rn,
      bool_or(status = 'accepted') over (
        partition by least(requester_id, addressee_id), greatest(requester_id, addressee_id)
      ) as pair_has_accepted,
      count(*) filter (where status = 'pending') over (
        partition by least(requester_id, addressee_id), greatest(requester_id, addressee_id)
      ) as pending_cnt
    from public.friendships
  )
  update public.friendships f
     set status = 'accepted'
    from ranked r
   where f.id = r.id
     and r.rn = 1
     and f.status <> 'accepted'
     and (r.pair_has_accepted or r.pending_cnt >= 2);

  -- Delete every non-keeper row for each pair (recomputed identically).
  with ranked as (
    select
      id,
      row_number() over (
        partition by least(requester_id, addressee_id), greatest(requester_id, addressee_id)
        order by (status = 'accepted') desc, created_at asc
      ) as rn
    from public.friendships
  )
  delete from public.friendships f
   using ranked r
   where f.id = r.id
     and r.rn > 1;
end $$;

-- ── 2. Pair-unique constraint (either direction) ─────────────────────────────
-- The base table already has UNIQUE (requester_id, addressee_id) (same-direction
-- dupes). This index additionally blocks the reverse row, so a pair can only
-- ever have a single friendship row. Dropped first so the script re-runs.
drop index if exists public.friendships_unique_pair;
create unique index friendships_unique_pair
  on public.friendships (least(requester_id, addressee_id), greatest(requester_id, addressee_id));

-- ── 3. One accept = mutual friends, never a duplicate/second request ──────────
-- Order of checks matters so we never attempt an insert that the pair-unique
-- index would reject:
--   • already friends (either direction) → 'accepted'
--   • they already asked me (reverse pending) → accept it → 'accepted'
--   • I already have an outgoing pending → 'pending' (no-op)
--   • otherwise create the single pending request → 'pending'
create or replace function public.friends_send_request(_to uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  _me uuid := auth.uid();
begin
  if _me is null then raise exception 'Not authenticated'; end if;
  if _to = _me then raise exception 'You cannot add yourself'; end if;
  if not public.users_share_class(_me, _to) then
    raise exception 'You can only add classmates';
  end if;
  if public.is_blocked_between(_me, _to) then
    raise exception 'This student is unavailable';
  end if;

  -- Already friends in either direction.
  if public.are_friends(_me, _to) then
    return 'accepted';
  end if;

  -- They already invited me → accept it (mutual, single row).
  update public.friendships
     set status = 'accepted'
   where requester_id = _to and addressee_id = _me and status = 'pending';
  if found then
    return 'accepted';
  end if;

  -- I already have an outgoing pending request → nothing to do.
  if exists (
    select 1 from public.friendships
    where requester_id = _me and addressee_id = _to and status = 'pending'
  ) then
    return 'pending';
  end if;

  insert into public.friendships (requester_id, addressee_id, status)
  values (_me, _to, 'pending');
  return 'pending';
end;
$$;
grant execute on function public.friends_send_request(uuid) to authenticated;

-- ── 4. friends_list with a last-message preview (merged inbox) ────────────────
-- Return type changes, so drop then recreate. Adds the latest message's type,
-- note, denormalised label and sender so each friend row can double as a
-- conversation entry. Friends with no messages sort last (created_at null).
drop function if exists public.friends_list();
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
    lm.created_at as last_message_at,
    lm.type as last_message_type,
    lm.note as last_message_note,
    lm.reference_label as last_message_label,
    lm.sender_id as last_message_sender
  from public.friendships f
  join public.profiles other
    on other.id = case when f.requester_id = (select uid from me) then f.addressee_id else f.requester_id end
  left join lateral (
    select m.type, m.note, m.reference_label, m.sender_id, m.created_at
    from public.friend_messages m
    where (m.sender_id = (select uid from me) and m.recipient_id = other.id)
       or (m.sender_id = other.id and m.recipient_id = (select uid from me))
    order by m.created_at desc
    limit 1
  ) lm on true
  where f.status = 'accepted'
    and ((select uid from me) in (f.requester_id, f.addressee_id))
    and not public.is_blocked_between((select uid from me), other.id)
  order by lm.created_at desc nulls last, other.first_name;
$$;
grant execute on function public.friends_list() to authenticated;

-- ── Verify ─────────────────────────────────────────────────────────────────
-- select least(requester_id,addressee_id) a, greatest(requester_id,addressee_id) b,
--        count(*), array_agg(status)
--   from public.friendships group by 1,2 having count(*) > 1;   -- expect 0 rows
