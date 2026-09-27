-- ============================================================================
-- Track locking
-- ----------------------------------------------------------------------------
-- Students may only self-select the two OPEN tracks (Regular, and the
-- client-side IB Economics view which persists as "regular"). The non-default
-- enrollment_track values -- 'biz_lab' and 'gulliver_intro' -- are LOCKED: a
-- student can only land on one by joining a class whose track matches.
--
-- This file:
--   0. (REVIEW FIRST) counts existing students already on a locked track.
--   1. adds classes.track and backfills it from the teacher's program.
--   2. teaches lookup_class_by_join_code to return the class track.
--   3. adds a BEFORE INSERT OR UPDATE trigger on profiles that blocks a student
--      from creating or moving profiles.track to a locked value unless they are
--      a member of a class with that track. Teachers are exempt.
--
-- Apply with your usual SQL runner. Do NOT run `supabase db push`.
-- ============================================================================


-- ----------------------------------------------------------------------------
-- 0. REVIEW FIRST -- run this SELECT on its own before applying anything below.
--    It counts existing students currently on each locked track. These rows are
--    GRANDFATHERED: the trigger added in step 3 only evaluates a row on INSERT
--    or when its track is updated, so existing rows are untouched and their
--    access is NOT removed. This is purely so you can see who is affected before
--    proceeding. (It intentionally does NOT reference classes.track, which does
--    not exist until step 1, so it runs safely against the current schema.)
-- ----------------------------------------------------------------------------
select
  p.track                                   as locked_track,
  count(*)                                  as students_on_locked_track
from public.profiles p
where p.track in ('biz_lab', 'gulliver_intro')
  and p.role is distinct from 'teacher'
group by p.track
order by p.track;


-- ----------------------------------------------------------------------------
-- 1. classes.track -- which curriculum a class enrolls its students into.
--    Defaults to 'regular' for every existing and future class. Done in small
--    idempotent steps (add nullable, set default, backfill, then set NOT NULL)
--    so no single long line can be mangled by copy/paste line-wrapping.
-- ----------------------------------------------------------------------------
alter table public.classes
  add column if not exists track public.enrollment_track;

alter table public.classes
  alter column track set default 'regular';

update public.classes
set track = 'regular'
where track is null;

alter table public.classes
  alter column track set not null;

-- Backfill: if a class's teacher is themselves on a program track, adopt it as
-- the class track. Only touches classes still at the 'regular' default, so it is
-- safe to re-run and won't clobber a track set by hand.
update public.classes c
set track = p.track
from public.profiles p
where p.id = c.teacher_id
  and p.track in ('biz_lab', 'gulliver_intro')
  and c.track = 'regular';


-- ----------------------------------------------------------------------------
-- 2. lookup_class_by_join_code now also returns the class track, so the app can
--    copy it onto the joining student's profile. Return type changes, so the
--    old function must be dropped first.
-- ----------------------------------------------------------------------------
drop function if exists public.lookup_class_by_join_code(text);

-- NOTE: kept on ONE line on purpose -- some SQL runners split multi-line
-- CREATE FUNCTION bodies and choke. Do not reflow.
create function public.lookup_class_by_join_code(_code text) returns table(id uuid, name text, track public.enrollment_track) language sql stable security definer set search_path = 'public' as $$ select c.id, c.name, c.track from public.classes c where c.join_code = upper(_code) limit 1; $$;


-- ----------------------------------------------------------------------------
-- 3. Server-side lock. A profile cannot be created with, or moved to, a locked
--    track value ('biz_lab' / 'gulliver_intro') unless the user is a member of a
--    class carrying that track. Teachers may set their own program freely.
--    Fires BEFORE INSERT OR UPDATE:
--      * INSERT  -- any locked track is a "transition into" and is checked. (A
--                   brand-new student has no membership yet, so they can only be
--                   created on 'regular'; the locked track is applied by a later
--                   UPDATE once they've joined a matching class.)
--      * UPDATE  -- only a *change* into a locked track is checked, so setting
--                   track back to 'regular' always succeeds and existing
--                   locked-track rows are never disturbed.
-- ----------------------------------------------------------------------------
-- NOTE: kept on ONE line on purpose (see the RPC note above). Do not reflow.
create or replace function public.enforce_track_lock() returns trigger language plpgsql security definer set search_path = public as $$ declare is_locked_transition boolean; actor_role public.app_role; begin if tg_op = 'INSERT' then is_locked_transition := new.track in ('biz_lab','gulliver_intro'); actor_role := new.role; else is_locked_transition := new.track is distinct from old.track and new.track in ('biz_lab','gulliver_intro'); actor_role := coalesce(old.role, new.role); end if; if is_locked_transition then if actor_role = 'teacher' then return new; end if; if not exists (select 1 from public.class_members cm join public.classes c on c.id = cm.class_id where cm.user_id = new.id and c.track = new.track) then raise exception 'Track % is locked; join a matching class.', new.track using errcode = 'check_violation'; end if; end if; return new; end; $$;

drop trigger if exists enforce_track_lock on public.profiles;
create trigger enforce_track_lock
  before insert or update of track on public.profiles
  for each row
  execute function public.enforce_track_lock();
