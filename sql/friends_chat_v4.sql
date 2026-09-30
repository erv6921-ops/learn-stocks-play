-- ===========================================================================
-- Friends & sharing — v4 (drop the classmates-only rule)
-- Project: InvestiPlay (vcjdshippmqopaffuzbw)
--
-- Applies ON TOP OF friends_chat.sql + _v2 + _v3. NOT auto-applied — paste into
-- the Supabase SQL Editor. Do NOT run `supabase db push`.
--
-- Mutual consent (you must accept a request / partnership) is the real gate, so
-- the extra "must share a class" requirement is dropped: you can message anyone
-- you've accepted, in any class. Block + accept still fully apply.
--
-- Removes the users_share_class() check from:
--   • friends_send_message   (message-send gate)
--   • friends_send_request   (who you can send a request to)
--   • friends_list           (accepted partners now appear regardless of class)
-- friends_list_classmates() is unchanged — it stays class-scoped because it's
-- only the "Add from my class" convenience list, not a talk-to restriction.
-- (users_share_class() itself is left in place; it's just no longer called by
-- these paths.)  Idempotent.
-- ===========================================================================

-- ── Message-send: friends + not blocked (no class check) ─────────────────────
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

-- ── Friend request: anyone (not just classmates); accept = mutual, single row ─
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
  if public.is_blocked_between(_me, _to) then
    raise exception 'This student is unavailable';
  end if;

  if public.are_friends(_me, _to) then
    return 'accepted';
  end if;

  update public.friendships
     set status = 'accepted'
   where requester_id = _to and addressee_id = _me and status = 'pending';
  if found then
    return 'accepted';
  end if;

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

-- ── friends_list: accepted friends ∪ ALL accepted partners (any class) ───────
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
  select
    other.id as user_id,
    other.first_name,
    other.last_name,
    other.school_name,
    other.grade,
    coalesce((
      select count(*) from public.friend_messages m
      where m.recipient_id = auth.uid()
        and m.sender_id = other.id
        and m.read_at is null
    ), 0) as unread,
    lm.created_at as last_message_at,
    lm.type as last_message_type,
    lm.note as last_message_note,
    lm.reference_label as last_message_label,
    lm.sender_id as last_message_sender
  from (
    select case when f.requester_id = auth.uid() then f.addressee_id else f.requester_id end as oid
    from public.friendships f
    where f.status = 'accepted' and auth.uid() in (f.requester_id, f.addressee_id)
    union
    select case when pa.user_id = auth.uid() then pa.partner_id else pa.user_id end as oid
    from public.partners pa
    where pa.status = 'accepted' and auth.uid() in (pa.user_id, pa.partner_id)
  ) fi
  join public.profiles other on other.id = fi.oid
  left join lateral (
    select m.type, m.note, m.reference_label, m.sender_id, m.created_at
    from public.friend_messages m
    where (m.sender_id = auth.uid() and m.recipient_id = other.id)
       or (m.sender_id = other.id and m.recipient_id = auth.uid())
    order by m.created_at desc
    limit 1
  ) lm on true
  where not public.is_blocked_between(auth.uid(), other.id)
  order by lm.created_at desc nulls last, other.first_name;
$$;
grant execute on function public.friends_list() to authenticated;
