# Analytics events — callsite checklist

Import once per file:

```ts
import { logEvent } from "@/lib/analyticsEvents"
```

All calls are fire-and-forget — no `await` needed, no `try/catch` needed (the
helper swallows its own errors and no-ops under the dev bypass).

## Session (App shell)

- [ ] **On app mount** → `logEvent("session_start")`
  Fire once when the authenticated shell first mounts (after a user is known).
- [ ] **On logout / tab unmount** → `logEvent("session_end")`
  On the logout handler, and/or a `beforeunload` listener.

## Quiz / question flow

- [ ] **After a question loads** → `logEvent("quiz_attempted", { topicId, difficulty, theta })`
- [ ] **After grading — correct** → `logEvent("quiz_correct", { topicId, difficulty, theta, durationMs })`
- [ ] **After grading — incorrect** → `logEvent("quiz_incorrect", { topicId, difficulty, theta, selectedIndex })`

## Missions (daily missions)

- [ ] **On mission start** → `logEvent("mission_started", { missionId, kind })`
- [ ] **On mission complete** → `logEvent("mission_completed", { missionId, kind, coinsAmount })`

## Lessons

- [ ] **On lesson load** → `logEvent("lesson_started", { lessonId, category })`
- [ ] **On lesson exit / completion** → `logEvent("lesson_completed", { lessonId, category, percent })`

## Games (daily games, career/business sims)

- [ ] **On game start** → `logEvent("game_played", { gameId })`
- [ ] **On win result** → `logEvent("game_won", { gameId, score })`

## Economy (coins ledger)

- [ ] **Whenever coins are earned/spent** → `logEvent("coins_earned", { coinsAmount, source })`
  Use a negative `coinsAmount` for spend. Best placed at the single ledger-write
  chokepoint so every source is covered once.

## Watchlist / portfolio

- [ ] **On add to watchlist** → `logEvent("watchlist_added", { ticker })`
- [ ] **On a trade** → `logEvent("portfolio_traded", { ticker, side, qty, price })`

## Jeff

- [ ] **On each Jeff turn** → `logEvent("jeff_turn", { context })`

## Class challenges

- [ ] **On join** → `logEvent("class_challenge_joined", { challengeId })`
- [ ] **On rank change** → `logEvent("streak_broken", { challengeId, oldRank, newRank })`
  (No dedicated `rank_changed` event exists in the vocabulary. If rank tracking
  is wanted as its own metric, add a `rank_changed` value to both the `AnalyticsEvent`
  union in `src/lib/analyticsEvents.ts` and the CHECK constraint in the migration.)

## Streaks

- [ ] **On a broken streak** → `logEvent("streak_broken", { previousStreak })`

---

### Notes

- `session_id` is added automatically (per browser tab, from `sessionStorage`).
- `student_id` is added automatically from the Supabase auth session.
- `event_data` is a free-form bag — the field names above (`topicId`, `theta`,
  `coinsAmount`, …) are conventions, not enforced. Pick consistent keys.
- Adding a new event type requires editing **two** places together: the
  `AnalyticsEvent` union and the SQL CHECK constraint.
