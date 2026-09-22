# Speedrunner playtest (qa-s3): all 50 lessons, Units 1 to 4

Automated playtest, 2026-09-19, real auth on the QA dev server (port 8084), one of five concurrent students. Persona: double-click everything, browser Back mid-lesson, reload mid-quiz, duplicate tab. Finished all 50 lessons (27,755 coins, class #1 of 6) in about 4 hours.

Reviewer caveat: it does not get bored; pacing comments are guesses.

## Findings, worst first

1. **Major: a second tab of the same lesson silently overwrites a passed lesson with 0%.** Open psych-5 in two tabs, finish it in tab A (73%, 8 of 11, +465 net); tab B, untouched, had already landed on "Mission complete, 0% ACCURACY, 0 of 1 questions correct, -10 net" and that 0% is what the lesson now permanently shows (verified 3 hours later).
2. **Major: every wrong answer fires a failing database write** (`coins_spent`, 23514); `quiz_levelup` fails the same way (budget-14, invfund-6).
3. **Major: ordering questions silently reset with zero feedback and taps cannot be undone** (psych-2 "LEAST to MOST willpower-friendly"). No message, no correct order shown, no coin change; looped 12+ times. Only solvable by trying permutations.
4. **Major (one occurrence, not reproducible): a correct mastery answer graded wrong, with the app naming that same answer as correct** (psych-8). Best guess: the per-question countdown expiring during the attempt's first render.
5. **Major: lesson accuracy is recomputed from only the last session.** Answer badly, leave, return, finish: 100% ACCURACY (income-1, budget-14). Bailing and resuming launders a bad score into a perfect one; finding 1 is the same mechanism in the other direction.
6. **Minor: reload, navigate-away or Back always shows the "Start Mission" splash** with no sign you are mid-lesson. Progress is preserved (Start Mission resumes in place) but nothing says so. Back lands on /dashboard, not the lesson list. Hit deliberately on 24 lessons.
7. **Minor: "Skip" on the first-run tour launches psych-1** instead of dismissing the tour.
8. **Minor: joining a class does not update the UI until reload.** Double-clicking Join registered one join only.
9. **Minor: mastery check is 4/4 on a ~20s timer and retries the identical four questions** (reshuffled options). psych-8 and budget-11 each consumed 7 to 9 minutes in the loop. Escape hatches: "Hint · 2 left" and "Time Freeze · 100".
10. **Minor: "Reread the lesson with Jeff" during a mastery check opens a full-screen overlay while the question timer keeps running underneath**; it hit 0 and auto-marked the question wrong while reading.
11. **Minor (content): distractors identifiable without any finance knowledge.** A regex penalising "in the majority of cases", "for the typical teenager", "in almost every situation", "for people in general", "under most conditions", "across most markets", "in everyday life" carried most questions alone.

Not bugs: double-clicking submit/answer buttons never produced duplicate coins or submissions; `/lessons/psych-3` is a clean "Lesson not found" (Unit 1 legitimately skips that id).

## Where it got stuck as a user

psych-2's ordering question: tapped an item, tapped it again to undo, nothing; guessed an order, all numbers vanished with no feedback; re-tapped eleven times. "A real sophomore would have decided the app was broken within about fifteen seconds." Softer: the Start Mission splash after every reload looks like lost work.

## Per-lesson table (times include deliberate chaos detours; coins = running dashboard balance after the lesson)

| Lesson | Min | Coins after | Result | Chaos / glitch |
|---|---|---|---|---|
| psych-1 | ~14 | 515 | pass | coins_spent errors; Jeff-overlay timer |
| psych-2 | ~4 | 1,365 | 92% | double-clicks accepted, no dup; ordering silent reset |
| psych-4 | 1.6 | 1,600 | 55% | |
| psych-5 | ~6 | 3,380 | 73% → overwritten to 0% | second tab clobbered score |
| psych-6 | 2.7 | 1,950 | 64% | leave + return → splash |
| psych-7 | 8.5 | 2,715 | 56% | reload → splash |
| psych-8 | 7+7+retry | 23,805 | pass | 3 failed mastery runs; mis-grade |
| psych-9 | 2.5 | 12,280 | 91% | back+forward |
| psych-10 | 6.3 | 2,925 | 50% | leave + return |
| income-1 | 2.6 fail → 1.1 | 7,625 | 100% | resumed session laundered score |
| income-2 | 2.9 | 3,760 | 55% | back+forward |
| income-3 | 2.7 | 4,045 | 64% | leave + return |
| income-4 | 2.4 | 4,760 | 91% | reload |
| income-5 | 2.1 | 5,035 | 64% | |
| income-6 | 2.7 | 5,380 | 73% | back+forward |
| income-7 | 2.6 | 6,375 | 92% | leave + return |
| income-8 | 2.5 | 6,970 | 75% | reload |
| income-9 | 2.5 | 7,970 | 73% | back+forward |
| income-10 | 2.6 | 8,290 | 58% | leave + return |
| income-11 | 2.5 | 8,725 | 75% | reload |
| income-12 | 1.9 | 9,290 | 73% | |
| income-13 | 2.6 | 9,735 | 67% | back+forward |
| income-14 | 2.4 | 10,130 | 82% | leave + return |
| income-15 | 3.0 | 10,580 | 67% | reload |
| budget-1 | 3.4 | 12,760 | 82% | |
| budget-2 | 2.9 | 13,335 | 75% | back+forward |
| budget-3 | 4.2 | 13,575 | 50% | leave + return |
| budget-4 | 3.6 | 14,265 | 60% | reload |
| budget-5 | 2.2 | 14,490 | 50% | |
| budget-6 | 2.6 | 14,895 | 64% | back+forward |
| budget-7 | 2.5 | 15,095 | 45% | leave + return |
| budget-8 | 2.5 | 15,690 | 73% | reload |
| budget-9 | 2.9 | 16,250 | 56% | |
| budget-10 | 2.6 | 16,650 | 67% | back+forward |
| budget-11 | 7.0 + 9.1 fail → pass | 24,980+ | pass | two runs lost to mastery loop |
| budget-12 | 2.4 | 17,105 | 82% | reload |
| budget-13 | 2.0 | 17,485 | 55% | |
| budget-14 | 7.0 fail → 1.8 | 26,525 | 100% | quiz_levelup error; resumed-session score |
| budget-15 | 3.7 | 18,450 | 55% | leave + return |
| budget-16 | 2.7 | 18,855 | 82% | reload |
| invfund-1 | 2.5 | 19,080 | 55% | |
| invfund-2 | 7.0 fail → 2.2 | 27,260 | 82% | first run lost to mastery loop |
| invfund-3 | 4.1 | 19,405 | 58% | leave + return |
| invfund-4 | 2.5 | 19,580 | 42% | reload |
| invfund-5 | 1.4 | 19,870 | 71% | |
| invfund-6 | 2.2 | 20,265 | 73% | back+forward |
| invfund-7 | 2.2 | 20,635 | 73% | leave + return |
| invfund-8 | 2.2 | 21,215 | 75% | reload |
| invfund-9 | 1.9 | 21,475 | 55% | |
| invfund-10 | 2.3 | 22,225 | 75% | back+forward |

Note the coin column is not monotonic (e.g. 23,805 after psych-8, then 12,280 after psych-9, then 2,925): the "running balance" the agent read was stale or inconsistent across screens. Worth checking against the profile's stored balance.
