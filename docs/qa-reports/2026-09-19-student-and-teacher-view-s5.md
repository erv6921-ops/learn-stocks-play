# Fresh-student playtest with teacher checkpoints (qa-s5)

Automated playtest, 2026-09-19, real auth on the QA dev server (port 8084), one of five concurrent students in "QA Playtest Class". Completed Unit 1 (9/9), Unit 2 (15/15) and 3 of 16 Unit 3 lessons, with four teacher checkpoints as `qa-teacher@investiplay.test`. Cut short by an API limit.

Reviewer caveat: it does not get bored; "grindy" is a guess.

## Teacher view verdict

Per-student data is accurate and matches the student side at every checkpoint: lesson counts (9, then 24, then 27), per-lesson quiz percentages, reflections, question timings, the "Adaptive ability by topic" band, time on app (1h 38m), accuracy (68%, 131/193). Nothing stale, duplicated or missing at the student level. The per-student "View work" page is the strongest screen in the product.

The only broken numbers are the two class-level headline percentages: "0% Avg completion · 0% Class done" at every checkpoint, while the Students tab below reads 46, 38, 27, 24, 19 and 9 lessons completed. Analytics says "Assign a lesson to start tracking completion." Both are assignment-scoped but labelled as class-wide.

Lesson finder check (Assign tab, "how compound interest grows savings"): 15 hits, most relevant first (Compound Interest & the Rule of 72, Compound Interest on Debt, Simple vs Compound, Compounding, Checking vs Savings, Why Investing Beats Saving, Emergency Funds, APR vs APY, Interest, Interest Rate Risk, IRAs/Roth IRAs & 529 Plans, then weaker tail matches). "Have Jeff create a lesson about ..." appears under "Not what you need?". Note: with no search term the default list opens on Introduction to Business and Introduction to Economics lessons, an odd default for a personal-finance teacher.

## Findings, worst first

1. **Major: every answered question fires a failing analytics write** (`coins_spent`, 23514) on correct answers too; `quiz_levelup` fails the same way. 21 in an 8-minute run.
2. **Major: `/lessons/psych-3` is a dead URL.** Unit 1 ids are psych-1, 2, 4 to 10; the slug is one ahead of the displayed number from lesson 3 on. In-app Start routes correctly; deep links and teacher-pasted links break.
3. **Major: teacher headline metrics read 0%** while the class completed 163 lessons (see verdict).
4. **Major (soft-lock risk): "Tap them in order" silently resets on a wrong answer.** No message, no red flash, no reveal, no skip, no Continue until you guess right (income-6, income-9). About 13 minutes lost on two of them.
5. **Major: the skill-stacking ordering answer is not derivable from the lesson.** Correct order is Communication only → Coding only → Coding + Sales; the lesson never ranks coding-only vs communication-only.
6. **Major: mastery checks require 4/4.** 20 consecutive retry cycles logged on income-4 (~6 minutes on a "2 min lesson"). This reviewer saw fresh questions on retry; the structure reviewer (S2) saw identical questions. Discrepancy unresolved.
7. **Minor (Major if class competition matters): every classmate on the student leaderboard renders as "Student S."** Ranks 2 to 5 identical; only coin totals distinguish them. The teacher view shows "Student S1" to "Student S5", so the data exists; the student view collapses to first name + last initial.
8. **Minor: leaderboard mixes whole numbers and two-decimal coin values** (19,995 vs 8,392.46). Sam T. went from 3,380 to 3,324 without logging in.
9. **Minor: Class Rank card says "Join a class" after joining** until a full reload.
10. **Minor: the "League Up" reward modal does not block clicks behind it**, cannot be dismissed without picking a gift, and the three gifts are visually identical.
11. **Minor: Ask Jeff costs 200 coins with no confirmation**, and the button that opens the panel does not mention a cost.
12. **Minor: lesson totals disagree**: 302 (dashboard), 298 (lessons page), 313 (teacher analytics).
13. **Minor: duplicate React keys on the leaderboard** (console warning); with five identically named rows this could drop or double rows on a class of 30.
14. **Minor: Unit 35 sits between Unit 6 and Unit 7** in the unit rail.

## Checkpoints

| Checkpoint | Students tab | Header |
|---|---|---|
| #0 (before any lessons) | S5, S1, S3, S2 at 0; Sam Tester 8 | 0 assignments, 0% / 0% (correct at this point) |
| #1 (after Unit 1) | S2 35, S1 11, S5 9, Sam Tester 9, S3 8, S4 6 | 0% / 0% (wrong) |
| #2 (after Unit 2) | S2 46, S3 35, S5 24, S1 24, Sam Tester 9 | 0% / 0% (wrong) |
| Final (Unit 3, 3 lessons) | S2 46, S3 38, S5 27, S1 24, S4 19, Sam Tester 9; Analytics matches exactly | 0% / 0% (wrong) |

Student `/leaderboard` at the end: #1 of 6, 19,995 coins, Lv 5, Gold League, six members listed. Consistent with the teacher's counts.

## Where it got stuck as a user

Both times on "Tap them in order": three taps, everything went blank, nothing else happened. Eventually brute-forced permutations, which a 15-year-old will not do. Also, low confidence: the first dashboard after the tour has a Daily/Lessons toggle, class-code box, daily missions, a Higher-or-Lower game, a business sim, a portfolio and a class rank card, and the "Start learning" button sits inside the Daily panel rather than Lessons.
