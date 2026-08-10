-- Partner Duels: 1v1 challenges between two accepted partners.
--
-- Reuses the class_challenges / challenge_entries tables. A duel is a
-- class_challenges row with class_id = null and opponent_user_id set to the
-- challenged partner. It starts in 'pending' (invite sent, only the creator has
-- staked). When the opponent accepts and pays the entry fee, it flips to
-- 'active'. Everything else (scoring, expiry → completed, winner payout,
-- cancellation refunds) is handled by the existing challenge machinery.

alter table class_challenges
  add column if not exists opponent_user_id uuid references auth.users(id);

create index if not exists class_challenges_opponent_idx
  on class_challenges(opponent_user_id);

-- Allow the 'pending' state used while a duel invite is awaiting acceptance.
alter table class_challenges drop constraint if exists class_challenges_status_check;
alter table class_challenges add constraint class_challenges_status_check
  check (status in ('active', 'completed', 'cancelled', 'pending'));

-- ── Additive RLS for duels ────────────────────────────────────────────────
-- Permissive policies are OR'd with the existing class-based ones, so class
-- challenges are unaffected; these simply also grant the two duelists access
-- to their private 1v1 (which has no class_id).

drop policy if exists "Duel participants can view challenges" on class_challenges;
create policy "Duel participants can view challenges"
on class_challenges for select
using (auth.uid() = created_by or auth.uid() = opponent_user_id);

-- The opponent needs to flip status → 'active' and grow the pot on accept; the
-- creator needs to cancel a still-pending invite. Both are the two duelists.
drop policy if exists "Duel participants can update challenges" on class_challenges;
create policy "Duel participants can update challenges"
on class_challenges for update
using (auth.uid() = created_by or auth.uid() = opponent_user_id);

-- Standings need both entries visible to both duelists.
drop policy if exists "Duel participants can view entries" on challenge_entries;
create policy "Duel participants can view entries"
on challenge_entries for select
using (
  challenge_id in (
    select id from class_challenges
    where created_by = auth.uid() or opponent_user_id = auth.uid()
  )
);
