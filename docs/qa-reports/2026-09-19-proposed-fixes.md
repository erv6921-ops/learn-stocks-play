# Proposed fixes for the 2026-09-19 playtest findings

Every issue from the six playtest reports, with the root cause found in code, the proposed change, and an effort estimate (S under 1 hour, M half a day, L a day or more). Items marked **Decision** need a product call before I build them; my recommendation is stated. Everything else is a straightforward fix I would make as described.

Suggested order: Phase 1 (backend + the three blockers), Phase 2 (scoring, mastery, widgets), Phase 3 (content), Phase 4 (Jeff chat), Phase 5 (onboarding, dashboard, teacher, stocks).

---

## Phase 1: backend and blockers

### 1. Analytics writes rejected (`coins_spent`, `quiz_levelup`) — every tester
**Cause.** The deployed check constraint on `analytics_events` allows 17 event names; the repo migration and `src/lib/analyticsEvents.ts` list 21. The migration was never applied to production, so `coins_spent`, `quiz_levelup`, `game_lost`, `watchlist_removed` fail with error 23514 on every coin change.
**Fix.** New SQL file that drops and recreates the constraint with all 21 names; apply via the Management API. Add `error.code` to the `logEvent` warning so drift is visible next time. **S**

### 2. "Retake lesson" right after finishing shows a blank shell — blocker
**Cause.** `handleRetake` resets ~15 state flags by hand and bumps a key that remounts only part of the tree; the just-finished path leaves ability/reinforcement state populated, and the rebuilt content either throws or renders the not-found branch. (`src/pages/LessonDetail.tsx:522-541`)
**Fix.** Hold a `runId` and key the whole lesson body on it; retake becomes "clear chat, new run" and React resets everything. **S**

### 3. "Reread the lesson with Jeff" traps the student — blocker
**Cause.** `handleMasteryReread` bumps `regenerationCount` (which mounts a fresh mastery check with its timer running) and opens the chat overlay on top; the chat resumes in its `done` state so only the last recap shows; "Take the Quiz" restarts from section 0 and replays the whole block. (`LessonDetail.tsx:511-516`, `JeffChat.tsx:413-420, 762-767`)
**Fix.** Reread sets a `rereading` flag without remounting the mastery check; the walk is unmounted while the overlay is open (no timer); the chat opens in a review mode with the full transcript visible and a "Back to the mastery check" button that jumps straight to mastery. **M**

### 4. Reflection box silently refuses repetitive text — blocker
**Cause.** `looksLowEffort()` blocks the submit but the only feedback is a top-right toast that auto-dismisses; the counter and button still look valid. (`LessonDetail.tsx:464-466`, `src/lib/answerQuality.ts:32`)
**Fix.** Inline red helper under the textarea ("Looks repetitive, write it in your own words") and the button disabled while the text fails the check. **S**

---

## Phase 2: scoring, mastery, timers, widgets

### 5. Scores are wrong four ways (teacher sees 100% for 71%; revisit shows 100%; resume launders a score; second tab writes 0%)
**Cause.** One write model with no guard: `updateLessonProgress` is a blind upsert that can write `completed:false, quiz_score:null` over a finished row; two competing score writes at finish (mastery-only ratio, then whole-lesson ratio) race; accuracy lives only in React state so resume starts from zero; a focus-triggered re-hydrate in a second tab flips the lesson to completed and writes that tab's partial tally. (`src/contexts/AppContext.tsx:519-550`, `LessonDetail.tsx:363-403, 792-807`)
**Fix.** (a) Make progress writes monotonic: never downgrade `completed`, never null a score over a completed row, percent-only updates send only the percent. (b) One finish write carrying the whole-lesson accuracy; delete the second `onScore` write. (c) Persist the run tallies and section index to localStorage so reload/resume keeps the real accuracy. (d) Snapshot "completed" at lesson start; if another tab finishes first, show "Finished in another tab" instead of writing. Teacher view then shows the whole-lesson accuracy as the big number and "Mastery check 100%" as secondary. **M to L** (this is the one refactor that touches every progress write; see "One lesson-run record" below)

### 6. Mastery check: 4 of 4, same questions on retry, "adapted to your level" copy
**Cause.** Authored lessons set `requiredCorrect: 4` and the renderer serves exactly 4, so the pass mark is 100%. The retry-variety hooks exist in the renderer but `LessonDetail` never passes them, and no authored question has a `difficulty`, so the adaptive selector ties and returns the same four every time. The "adapted" line shows whenever the student has ever answered anything. (`SectionRenderer.tsx:640-670`, `LessonDetail.tsx:568-585`, `adaptiveEngine.ts:135-153`)
**Fix.** Serve 5 questions with a pass mark of 4 ("Goal: 4 of 5"), or 4 with a pass mark of 3. Wire `previouslyAsked`/`onAsked` so retries draw unseen questions from the pool, and randomize among tied candidates. Stamp difficulties on the authored questions (mastery 1-2 easier, 3-4 medium, 5-6 harder) so selection can discriminate. Only show "adapted" when the served set spanned more than one difficulty. **M**
**Decision:** pass mark. Recommend 4 of 5.

### 7. Timers: 7 to 22 seconds, expiry silently scores as wrong and costs coins
**Cause.** Floor is 15s scaled by text length; a teacher-set per-question override can push it to 7s. Timeout calls `registerWrong` with the coin penalty and shows "Not quite right". Nothing warns that time costs coins. (`SectionRenderer.tsx:43-54, 118-134`)
**Fix.** Floor 20s, clamp teacher overrides to 20s or more; distinct "Time's up" state that still shows the explanation; timeout counts for accuracy but no coin loss; overview copy "Right answers earn coins, wrong ones cost some"; 5-seconds-left pulse. **S**
**Decision:** keep the wrong-answer coin penalty (disclosed) or remove it. Recommend keep and disclose; remove it only on timeout.

### 8. Coin accounting: summary 25 short, double payment on remount, correct answer paying nothing
**Cause.** The in-chat quick check pays through `earnJeffs` directly, bypassing the session tally (so the receipt is 25 short and the multiplier applies differently). Any remount restarts at section 0 with the chat already done, so already-answered questions pay again. The "paid nothing" case is the timeout/tap race. (`JeffChat.tsx:430`, `QuizSessionContext.tsx:187-223`)
**Fix.** Route quick-check rewards through the session (`registerBonus`), persist answered question ids per run and skip re-awarding, fix the race by resolving the tap before the timer tick. **M** (shares the run record from item 5)

### 9. Reload or Back shows "Start Mission" with no sign progress is kept; Back lands on /dashboard
**Fix.** If a saved chat or progress exists, the overview shows "Continue where you left off (step N of M)" as the primary button and "Start over" as secondary; Back from a lesson goes to the lessons list. **S**

### 10. No "Next lesson" on the completion screen
**Fix.** `getNextLessonId()` in the lesson data (next in unit, else first of the next unit in the track), reuse the unlock check, and a primary "Next: {title}" button above "See daily missions". **S**

### 11. In-chat widgets give no feedback
**Cause.** Rank It clears the sequence on a miss with no message, no undo, no reveal. Sort It clears a wrong bin after a 500 ms flash and can never be wrong. Fill-in-the-blank injects the student's wrong word into the sentence; the "it it" duplicate comes from generated sentences where the answer already sits next to the blank. (`src/components/lessons/JeffInterrupter.tsx:262-278, 476-566, 571-653`)
**Fix.** Rank It: keep the placed items, "Not the right order, 2 of 3 correct", Undo last, and "Show me" after two misses (no coins). Sort It: a wrong pick sticks red with "Try the other group", counts as a miss, heavy guessing pays 0. Fill-in: render the correct word in green and the wrong one struck through; validator rejects sentences whose neighbouring token equals the answer. **M**

### 12. Empty quick check that disappears (invfund-6)
**Cause.** The loading skeleton is nearly invisible and the generator races an 8 s timeout; on timeout or invalid output the card is silently replaced by reply pills. (`JeffChat.tsx:553-578`)
**Fix.** Visible "Loading a quick check" caption, 15 s timeout, and a one-line "Skipping this one" instead of vanishing. **S**

### 13. "2 min lesson" on every card
**Cause.** `duration: 2` hard-coded in the lesson factory. (`src/data/lessons.ts:14`)
**Fix.** Estimate from content: chat turns, graded questions (micro + applied + mastery), plus the reflection. Shows 6 to 9 minutes for these lessons. **S**

### 14. "Rich-kid energy, keep it up" toast during lessons
**Cause.** Jeff's ambient reaction fires on every positive coin entry, including inside lessons. (`src/contexts/JeffContext.tsx:255-264`)
**Fix.** Suppress inside lessons and unit tests; rate-limit to one per minute elsewhere. **S**

### 15. League Up modal: identical gifts, no dismiss, may vanish
**Cause.** Dismiss is disabled until a pick; tiles are identical by design; the overlay sits in an error boundary that renders nothing on a crash, so it can disappear mid-animation. (`src/components/gamification/LeagueUpOverlay.tsx`)
**Fix.** Skip button that awards the lowest tile; label tiles "Mystery box A/B/C" with "one gift, picked at random"; reveal all three values after the pick; proper dialog semantics and its own fallback card. **S**

---

## Phase 3: curriculum content

### 16. Distractor padding ("in the majority of cases", "for the typical teenager") — every tester
**Cause.** Baked into the content files by an earlier "de-bias" pass that lengthened wrong answers with 12 fixed hedge phrases to satisfy a minimum-length check; 300+ occurrences across `deepInvesting2.ts` (264), `deepIncome.ts` (69), `deepBizC.ts` (51), `deepEntreStrategyPsych.ts` (50) and a few quiz files. Nothing in code adds them at runtime.
**Fix.** One-off script that strips the 12 phrases (including stacked ones) from option strings; relax the weak-distractor threshold from 60% to 45% of average length so the shortened options are not swapped out; CI grep so the phrases cannot return. Replace the "Younger boys always earn higher returns" distractor. **S**

### 17. Contradictions between lessons (exact lines located)
- Cooling-off rule: 48 h in psych-2 (`deepEntreStrategyPsych.ts:1514-1579`), 24 h in psych-5 and psych-7 (`:1885-1992`, `:2255-2398`), "24 to 48 h waiting rule" in budget-11 (`deepBudget.ts:1884-1893`). **Decision:** standardize. Recommend "24-hour rule" everywhere, with budget-11 adding "48 hours or more for big purchases".
- Emergency fund: "3 to 6 months" in income-13 (`deepIncome.ts:2257-2326`) vs "$300 to 500, the adult target is overkill" in budget-6 (`deepBudget.ts:957-1030`). Fix: income-13 says "adults aim for 3 to 6 months; as a teen, start with a $300 to $500 cushion", so the two agree.
- Payroll tax: 15.3% self-employment in income-4 (`deepIncome.ts:587-691`) vs 7.65% FICA in income-5 (`:773-820`). Fix: one sentence in each cross-referencing the other ("employees pay half, 7.65%; self-employed pay both halves, 15.3%").
- Savings rates: 4% (income-1 `:33, 81`), 0.5% (invfund-1 `deepInvesting2.ts:15-118`), 1% (invfund-6 `:951`). Fix: "regular savings 0.5 to 1%, high-yield savings 4% or more" consistently.
- Dangling references: "$5 problem" is taught in budget-3 (`deepBudget.ts:386`) but Jeff never voiced it; "sinking fund" is defined at `:942`; "$6.50 popcorn trick" at `:2052`; Zoe is a realWorldExample at `deepIncome.ts:1876`. These are all cases of item 18, not missing content. **S** for the edits.

### 18. Terms tested before taught (psych-8 biases, budget-10 two-factor, compound growth, fractional shares, simple interest)
**Cause.** The source text does contain most of these, but the personal-finance chat prompt caps Jeff at 6 messages under 40 words and "one small idea per message" against 550 to 900 word lessons, and the source is clipped at 3,500 characters (losing 170 to 790 characters of every Unit 1 to 4 lesson). The `mustCover` list is empty because authored questions carry no concept tags. (`src/lib/jeffChatLesson.ts:730-762`)
**Fix.** Raise the chat budget to about 8 turns for lessons with a source, raise the clip to 5,000 characters, tag each authored question with its concept and feed those into `mustCover` so Jeff must name every tested concept. Genuinely untaught items (fractional shares in invfund-1, simple interest in invfund-2, IPOs in invfund-3) get one added sentence in the source. **M**

### 19. Unlabelled third micro-check (spaced review)
**Cause.** `getStructuredContent` appends one random question from the previous lesson in the category when the student's confidence tier is "moderate", with no marker. (`src/data/lessonContent.ts:1408-1423`)
**Fix.** Tag the question `reviewOf: {lessonId, title}` and render "Review from last lesson: {title}" above it; pick deterministically so it does not change mid-lesson. **S**

### 20. Repeats and ordering (content decisions)
Proposals, in order of confidence:
- Rename "lifestyle creep" in psych-1 to "lifestyle inflation" (matching budget-7) and cross-reference. **S**
- psych-8: either move anchoring, framing, confirmation bias and endowment effect into the chat via item 18, or trim the mastery pool to loss aversion plus two of the others. Recommend item 18 plus stamping those questions as "harder" so they are not all drawn at once.
- income-2 vs income-3 and income-9 vs income-12: cross-reference now; consider merging later.
- income-7, income-8, income-11 (three ROI lessons): keep 2.7 and 2.11, fold 2.8's "borrowing without graduating" into 2.11. **Decision.**
- invfund-5 vs invfund-7: remove the diversification definition from 4.5's chat and quick check so 4.7 owns it. **S**
- psych-9 vs psych-10: differentiate 1.9 toward "testing beliefs like claims" and drop its identity content. **S**
- Unit 3.1, 3.2, 3.9 "every dollar a job": keep all three but make 3.9 explicitly "the same idea for irregular income". **S**
- invfund-9 has no chart: add an interactive price/volume diagram section (the `interactive-diagram` type exists). **M, Decision.**

---

## Phase 4: Jeff chat

### 21. Jeff offers follow-up buttons then refuses them
**Cause.** The three reply chips come from a second model call with no system prompt, no lesson title, no source; Jeff's next turn runs under a prompt that forbids drifting outside the lesson, so he refuses what the chips proposed. (`supabase/functions/jeff-chat/index.ts:927-946`, `jeffChatLesson.ts:740-747`)
**Fix.** Give the chip call the lesson title and the first 1,500 characters of source with "only suggest replies Jeff can answer from this material"; change the teaching prompt to "answer a follow-up in one sentence even if adjacent, then return; never say a question is out of scope". **S**

### 22. Canned openers, raw titles, "wait, no dashes", "the source suggests", non-sequitur "which is exactly why X matters"
**Cause.** Client-side templates: 11 `LESSON_OPENERS` picked at random; `QUESTION_FRAMINGS` lowercase the raw title into a sentence ("Here's a entrepreneurship income warm-up"); `factOpener` glues a category fact to an unrelated title; the no-dash rule makes the model self-correct out loud; the prompt labels the grounding block "SOURCE MATERIAL". (`jeffChatLesson.ts:479-537, 558-629, 650, 746, 761`)
**Fix.** Drop the life-update openers (or pick one stable per lesson); add a `topicPhrase` per lesson ("the ROI of college vs trade school") used instead of the title, with an a/an helper; drop the "fact" opener style where the fact does not fit; soften the dash rule and strip "wait, no dashes" patterns in post-processing; add "never mention the source or the material". **S to M**

### 23. In-chat quick checks that make no sense (rank items Jeff never said, emotion in a ranking, wrong tax math with "wait")
**Cause.** Quick checks are generated live from only Jeff's last message, type chosen at random, validated for JSON shape only. (`src/lib/jeffInterrupter.ts:180-195, 217-316`)
**Fix.** Ground the generator in the lesson source and Jeff's last three messages; require every ranking item to be a fact Jeff stated; reject explanations containing "wait," or "actually,"; for numeric checks, a cheap verification pass that recomputes the answer and drops the check on disagreement. **M**

### 24. Failed chat call degrades silently (CORS preflight)
**Cause.** The function's CORS allow-list is narrower than six other functions'; a failed call falls back to scripted paragraphs with generic buttons and no signal. (`index.ts:21-24`, `JeffChat.tsx:515-535`)
**Fix.** Widen the allowed headers to match the other functions; keep the scripted fallback but show "Jeff's live connection dropped, teaching from notes" with a Retry button and log the failure. **S**

### 25. Ask Jeff charges 200 coins for garbled or refused replies, no cost shown up front
**Cause.** Coins are charged before the model call and refunded only on thrown errors; an unparseable reply becomes a normal "my brain glitched" turn and is still charged and counted. The entry button says only "Ask Jeff". (`jeff-chat/index.ts:660-690, 748-780`, `src/components/Jeff/index.tsx:152-165`)
**Fix.** Refund and do not count when the reply is the fallback or the model marks `answered: false`; button reads "Ask Jeff · 200 coins"; one-time inline note on first use. **M**
**Decision:** keep 200 coins per question? Recommend yes with the refund rule, and revisit once lesson payouts are rebalanced.

---

## Phase 5: onboarding, dashboard, teacher, stocks

### 26. New real students skip onboarding entirely
**Cause.** The auth listener hard-codes `onboardingComplete: true` whenever a profile row exists, and the signup trigger always creates one; the `/onboarding` page reads that value and bounces to the dashboard. The correct value is only set by a deferred hydrate that loses the race. (`AppContext.tsx:435`, `Onboarding.tsx:388-395`)
**Fix.** Use `!!profile.onboarding_complete` in one shared profile-to-user mapper; let an already-signed-in student with an unfinished profile enter onboarding at the name step and go through grade and class code; mark complete at the end. **M**

### 27. Tour "Skip" starts a lesson; tour overlay blocks clicks but not typing
**Cause.** `finish()` always navigates to the first lesson; the overlay is a pointer-events blocker with no inert/focus trap. (`JeffTour.tsx:216-219, 284-287`)
**Fix.** Navigate only on real completion; mark the app root inert while the tour is open, Escape closes. **S**

### 28. Class Rank card stale after joining
**Cause.** `handleJoinClass` only flips a boolean; the class-board effect is keyed on the user id and never refetches. (`Dashboard.tsx:197-227, 419-445`)
**Fix.** Extract the board load into a callback and call it after a successful join. **S**

### 29. Day-one mission "Buy or sell a stock" impossible; "virtual cash" vs "InvestiCoins"; crowded first dashboard
**Cause.** Daily missions rotate by calendar day, so a new student can get "trade" on day one. (`src/lib/dailyMissions.ts:207-214`, `Dashboard.tsx:1545`)
**Fix.** Force the easy slot to "Finish your first lesson" while lessons completed is 0, gate the trade mission on affordability, change the card copy to "with your InvestiCoins", move the Start learning button above the missions, hide the game/business/portfolio cards until the first lesson is done. **S to M**

### 30. Login gives no feedback
**Cause.** `handleLogin` clears its spinner and relies on the auth listener to navigate; the listener awaits a profile query inside the callback, which can hang. On the bypass server the listener is never subscribed. (`Auth.tsx:36-70`, `AppContext.tsx:418`)
**Fix.** Keep the spinner until routed and navigate from the login handler itself after the profile check; defer the listener's query; on the bypass server show a banner instead of the login form. **S**

### 31. Ranks and leaderboard: "#55 of 61" for a new student, class vs national contradicting, "Student S." collisions, duplicate keys, mixed decimals
**Cause.** National rank splices a client-side "You" row into server rows (different metric from the class board); the 15-coin welcome gift ranks a new student above every zero-balance account; names are first name plus last initial with no collision handling; rows are keyed by name; coin totals are unrounded ledger sums. (`Dashboard.tsx:90-98, 407-452`, `Leaderboard.tsx:89, 768`)
**Fix.** Use the server's own row for "You" on both boards; hide rank until the student has activity beyond the welcome gift; fall back to full last name when initials collide; key rows on user id; round scores at the RPC boundary. **S**

### 32. Header coin balance stale until reload
**Cause.** Four copies of the balance (React state, localStorage, `profiles.jeffs_balance`, the ledger sum) with hydrate re-running on every auth event, including tab focus, and clobbering optimistic updates; server-side charges (Ask Jeff) never reach the header. (`AppContext.tsx:133, 253-350, 581-588`)
**Fix.** The ledger is the only truth; hydrate only on initial session or user change; track in-flight deltas so a late fetch cannot overwrite them; push the balance the edge function returns into context. **M**

### 33. Teacher header "0% avg completion / 0% class done"
**Cause.** Both pills and the Analytics donut divide by assigned lessons; a class-wide, track-scoped metric already exists lower on the page. (`TeacherDashboard.tsx:841-886, 936-939`)
**Fix.** Relabel the pills "Assigned avg" / "Assigned done", add "Curriculum done" from the existing track metric, and use it for the donut when nothing is assigned. **S**

### 34. Teacher "2 min time on app"
**Cause.** Time is summed from `page_view` dwell only, and a page view is written only on route change; a session spent inside one lesson page writes nothing, and the 60-second pings are ignored. (`App.tsx:122-141`, `StudentWork.tsx:338-341`)
**Fix.** Count distinct active minutes across page views, pings and answered questions; flush the current page on `pagehide`. **S**

### 35. Lesson totals 302 / 298 / 313
**Cause.** Three independent computations; the teacher count unions every enabled track toggle. (`Dashboard.tsx:114`, `Lessons.tsx:324`, `TeacherDashboard.tsx:892-900`)
**Fix.** One `countLessons(tracks)` helper; teacher scoped to the class's enrolled track; lessons page shows "N of 302 done". **S**

### 36. Unit 35 between Unit 6 and Unit 7; `/lessons/psych-3` dead
**Cause.** The rail sorts by `orderIndex` (7) but prints `unitNumber` (35); every other unit has the two equal. psych-3 was never a lesson id (1.3 is psych-4). (`src/data/lessons.ts:31, 86-94`)
**Fix.** Renumber unit-35 to 7 and shift units 7 to 34 up by one, rewriting the "N.x" lesson-number strings (ids untouched, nothing persisted keys on the number); fix the description lookup that this exposes. Add a legacy alias map so psych-3 redirects to psych-4. **M, Decision** (renumber vs a display-only mapping; recommend renumber).

### 37. Stocks page: 1-month change shown as today's, missing minus sign, silent clamp, unformatted shortfall, error-styled success toast, stale balance, unexplained fractions
**Cause.** Header uses the chart-range change with the day change as fallback; `fmtChange` drops the sign for negatives; the input clamps to 0.01 with no message; `toFixed(2)` instead of the formatter; the success path calls `toast.error` with a red down-arrow and resets quantity; fractional input under "Number of Shares". (`StockDetail.tsx:711-712, 742, 785-800, 1026-1030, 1062`)
**Fix.** Header shows today's change labelled "Today", range change stays in the chart panel; sign fix; inline "Minimum is 0.01 shares" or whole shares only; one coin formatter; `toast.success` with "Balance 3,985 to 3,224"; keep quantity. **S each**
**Decision:** allow fractional shares (with a one-line explanation) or whole shares only for this audience. Recommend keep fractions, explain them.

---

## One lesson-run record (recommended refactor behind items 2, 3, 5, 8, 9)

Attempt state today is spread across about 20 `useState` hooks, in-memory session tallies, a localStorage chat snapshot and a non-monotonic upsert. A single `LessonRun` record (`runId`, section index, answered questions with coins, mastery attempts, chat done, finished at) persisted on every change would make retake, reread, resume, second-tab detection, the receipt, the completion accuracy and the teacher's score all read from the same place, and the finish becomes one write. It is the largest single item (L) but it removes the whole class of scoring bugs rather than patching four symptoms.

---

## Decisions needed before building

1. Mastery pass mark: 4 of 5 (recommended) or keep 4 of 4 with fresh questions.
2. Coin penalty for wrong answers: keep and disclose (recommended); no penalty on timeouts.
3. Fractional shares: keep with explanation (recommended) or whole shares only.
4. Ask Jeff cost: keep 200 with refunds on non-answers (recommended).
5. Cooling-off rule: 24 hours everywhere, 48+ for big purchases (recommended).
6. Unit numbering: renumber Insurance to Unit 7 and shift (recommended) or display-only mapping.
7. ROI lessons: fold 2.8 into 2.11 (recommended) or keep all three.
8. Reading a Stock Chart: build the interactive chart now (M) or defer.
9. The lesson-run refactor: do it now as part of Phase 2 (recommended) or patch the four symptoms individually.
