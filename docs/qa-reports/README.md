# QA playtest reports, 2026-09-19

Six automated students played the Personal Finance track on the QA dev server (`npm run dev:qa`, port 8084, real Supabase auth) at the same time, all in the class "QA Playtest Class" (join code `QATEST`). Accounts and rules: `docs/qa-accounts.md`.

| Report | Persona | Coverage |
|---|---|---|
| `2026-09-19-curriculum-structure-review.md` | Structure reviewer (qa-s2) | All 50 lessons, Units 1 to 4: structure map, repeats, contradictions, ordering |
| `2026-09-19-speedrunner-s3.md` | Speedrunner (qa-s3) | All 50 lessons with reloads, Back, duplicate tabs |
| `2026-09-19-fresh-student-s1.md` | Fresh student (qa-s1) | Units 1 and 2, then bought 3 AMZN |
| `2026-09-19-student-and-teacher-view-s5.md` | Fresh student + teacher checkpoints (qa-s5) | Units 1 and 2 plus 3 lessons of Unit 3; four teacher checkpoints |
| `2026-09-19-chaos-student-s4.md` | Chaos (qa-s4) | Unit 1 and income-1 to income-10; injection, garbage input |
| (qa-fresh, report in chat only) | Fresh student | Unit 1, then bought 3 AMZN |

Every reviewer states the same caveat: it never gets bored, so pacing complaints are guesses. Watch a real student.

## What held up

- Jeff's chat resisted prompt injection, answer extraction and inappropriate requests; no XSS anywhere; no duplicate submissions or double coin awards from double-clicks.
- The stock buy flow (quantity, live ticket, confirm step, persistence) worked cleanly for every tester.
- Per-student teacher data (lesson counts, quiz percentages, reflections, timings, time on app) matched the student side at every checkpoint with six concurrent students.
- The new Assign-tab lesson finder returned sensibly ranked results for a topic description and offered "Have Jeff create a lesson".

## Consolidated issues, ranked by severity and how many testers hit them

### Blockers
1. **"Retake lesson" immediately after finishing renders a blank lesson with no buttons** (S2, 3x).
2. **After failing a mastery check, "Reread the lesson with Jeff" opens an overlay with only the recap while the timer runs underneath; Continue unclickable** (S2, S3).
3. **The reflection box silently rejects repetitive text**: green word counter, enabled button, click does nothing, no request sent (S4, 3 lessons).

### Major, seen by 3 or more testers
4. **`coins_spent` (and `quiz_levelup`) analytics writes fail a check constraint on `analytics_events`** on every coin change (all six). The event is in the allowed list in `supabase/migrations/20260901000000_analytics_events.sql`; the deployed constraint is behind the repo.
5. **Mastery check requires 4/4 on a 13 to 22 second timer** and replays the block on a miss; retries mostly re-serve the identical four questions (S2, S3, S1, S4; S5 saw fresh questions). One "2 min lesson" served 72 questions (S4); 20 retry cycles on one lesson (S5). Results screen still says "Questions adapted to your level".
6. **Distractor padding gives the answer away**: "in the majority of cases", "for the typical teenager", "in almost every situation", "as a general rule", "according to most guides" (all six). A regex on seven phrases passed most questions with no finance knowledge (S3).
7. **Timers expire silently as a wrong answer and cost coins**; "COINS LOST" is never explained; the intro promises only earning (qa-fresh, S1, S2).
8. **Scores shown to the student and teacher are wrong in several ways**: the teacher's big number is the mastery retake (100%) not actual accuracy (qa-fresh); revisiting a failed lesson shows "Crushed it! 100%" (S1); accuracy is recomputed from only the last session, so leaving and resuming launders a bad score (S3); a second tab overwrote a 73% pass with a permanent 0% (S3).
9. **Ordering ("Tap them in order") and categorise widgets give no feedback on a wrong tap**: ordering silently resets with no undo, no reveal, no skip (S3, S5); categorise swallows wrong taps so it cannot be got wrong and looks dead (S4). Two testers named this as the moment a real student would quit.
10. **Terms tested before taught**: sunk cost, lifestyle creep, endowment effect, anchoring, framing, compound growth, fractional shares, simple interest, two-factor login (all reviewers; full list in the structure review).
11. **No "Next lesson" on the completion screen**; the primary button routes to daily missions and then a 35-unit list (qa-fresh, S1, S4).

### Major, single tester
12. Teacher's "time on app" showed 2 minutes after 75 minutes (qa-fresh). Note: S5's final checkpoint showed 1h 38m correctly, so this may have been fixed by data arriving later or be intermittent.
13. Mid-lesson state reset on psych-8 replayed earlier questions and paid coins twice (qa-fresh).
14. Ask Jeff charges 200 coins even for a garbled or refused message, with no confirmation; two questions cost a whole lesson (S4, S5).
15. Local Taxes (income-15) quick check has a wrong correct answer and an explanation that reverses itself mid-sentence (S2).
16. Fill-in-the-blank writes the student's wrong word into the lesson sentence ("ignore it it") (S2).
17. Risk vs Return (invfund-6) quick check renders empty and skips itself (S2).
18. A failed jeff-chat call (CORS preflight rejected) degraded to a generic line with no error (S2).
19. One correct mastery answer graded wrong while naming the same answer as correct; not reproducible (S3).

### Minor, widely seen
20. Class header and Analytics show "0% avg completion / 0% class done" regardless of work done; they count only assigned lessons (qa-fresh, S5).
21. Joining a class leaves the Class Rank card on "Join a class" until reload (S1, S3, S4, S5).
22. "Skip" on Jeff's intro tour launches a lesson (qa-fresh first run, S3). The tour overlay blocks clicks but not typing (S4).
23. Unit list shows Unit 35 between Unit 6 and Unit 7 (S1, S2, S5). `/lessons/psych-3` is a dead URL; Unit 1 ids skip 3 (all).
24. Reload or Back mid-lesson shows the "Start Mission" splash with no sign progress is kept (S3); Back lands on /dashboard.
25. Header coin balance is stale until reload; the Amazon buy gives no success confirmation (qa-fresh). Leaderboard mixes whole and two-decimal coin values (S5).
26. AMZN header shows the 1-month change (no minus on the dollar) next to "Market Closed" (S1, S4). Stock quantity silently clamps 0 / -1 / 0.001 to 0.01; shortfall message unformatted (S4).
27. Student leaderboard shows every classmate as "Student S." plus a duplicate React key warning (S5).
28. League Up modal does not block clicks behind it and its three gifts are identical (S5).
29. Lesson totals disagree: 302, 298, 313 across screens (S5). Class rank vs national rank contradict on one line (S1). New student ranked "#55 of 61" nationally before doing anything (qa-fresh).
30. "Rich-kid energy, keep it up 😎" toast fires during lessons (qa-fresh).

## Curriculum content (see the structure review for the full lists)

- Repeats: every-dollar-a-job x3, lifestyle creep vs lifestyle inflation, three ROI lessons, ETFs vs Diversification, Skill Stacking vs Labor Markets, Identity vs Healthy Beliefs.
- Contradictions: cooling-off rule 48h / 24h / 24 to 48h; emergency fund 3 to 6 months vs $300 to 500; payroll tax 15.3% vs 7.65%; high-yield savings 4% / 0.5% / 1%.
- Ordering: Behavioral Traps tests four concepts taught later (anchoring 25 lessons later); Units 1 and 2 lean on Unit 4 investing vocabulary; Recessions teaches the emergency fund before Emergency Funds.
- Jeff refuses his own suggested follow-up questions eight times; "Reading a Stock Chart" has no chart; dangling references to examples never shown.
- The unlabelled third micro-check is spaced review of the previous lesson (14 confirmed); label it.
