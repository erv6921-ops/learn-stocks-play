# Fresh-student playtest (qa-s1): Units 1 to 2, then buy 3 AMZN

Automated playtest, 2026-09-19, real auth on the QA dev server (port 8084), one of five concurrent students in "QA Playtest Class". Persona: first session, reads little. Completed Units 1 and 2 (24 of 50 lessons) in about 2 hours; Units 3 and 4 did not fit the budget. Bought 3 whole AMZN shares.

Reviewer caveat: it does not get bored; anything called slow or repetitive is a guess.

## Findings, worst first

1. **Major: reopening a finished lesson can show "Crushed it! 100% ACCURACY" for a lesson scored 33%.** income-8 (real 33%, 4 of 12) and income-13 (real 50%) show 100% on revisit with the coin block gone. psych-1, income-3, income-12 revisit correctly; the difference was not found.
2. **Major: every coin deduction fails to record.** Console `[analytics] coins_spent {code: 23514}` (check-constraint violation) on every coin loss in all 24 lessons and on the AMZN confirm. `coins_spent` IS in the allowed list in `supabase/migrations/20260901000000_analytics_events.sql` (call site `src/contexts/AppContext.tsx:598`), so the deployed constraint differs from the migration.
3. **Major: mastery check demands 4 of 4.** 3 of 4 is "RETRY NEEDED". "Reread the lesson with Jeff" drops you at the chat's last message and then replays the entire quiz. Retries re-serve the identical four questions reshuffled; on income-6 the retry scored 8 of 8 from memory two minutes later.
4. **Major: coins are lost for wrong answers and nothing warns you.** Intro says "Earn InvestiCoins for every question you get right"; results show a "COINS LOST" column for the first time. Lost coins in 23 of 24 lessons (70 to 140 per lesson).
5. **Major (content): distractor padding.** "for the typical teenager", "for brand-new buyers", "in a downturn as the years pass", "in almost every situation". Most questions become "pick the one that sounds like a sentence". Not perfectly reliable: one correct answer was padded too ("on a day-to-day basis").
6. **Minor: joining a class does not update the dashboard until reload.** Join card disappears but CLASS RANK still says "Join a class"; after reload "#2 of 4 students".
7. **Minor: class rank and national rank contradict.** "Class #5 of 6" next to "National #4 of 63".
8. **Minor: unit list out of order.** Unit 6 → Unit 35 (Insurance & Protection) → Unit 7.
9. **Minor, low confidence: lesson URL navigation intermittently hangs 25+ seconds** (income-1, 3, 4, 13) while curl returns in 0.4s; five agents were hitting the server.
10. **Minor: AMZN header shows the 1-month change ($12.13, -4.56%, no minus on the dollar) next to "Market Closed"**, while today's change is -3.07 (-1.20%). Coins "4,308.87" vs "4,309" on the same screen.
11. **Minor: no "Next lesson" on the results screen.** Primary button "See daily missions" routes out of the lesson flow; "Continue Learning" lands on the 35-unit list.
12. **Unverified:** never saw a unit-completion celebration or the advertised unit bonus (+1,550 / +2,850); banner just flipped to the next unit. Retracted: ranking and categorise widgets work by hand (automation fault). psych-3 is an id gap only.

## AMZN purchase: went through

| | |
|---|---|
| Price per share | $253.71 (market closed) |
| Shares | 3 whole |
| Total | 761.13 InvestiCoins |
| Balance before / after | 4,080.00 / 3,318.87 |
| Position | 3 shares, avg $253.71, value 761.13, P/L +0.00 |

Flow: shares input 1 → 3, ticket updated live, Buy 3 Shares → "Confirm purchase of 3 shares for 761.13 InvestiCoins?" → Confirm. No double charge. The cleanest part of the app.

## Per-unit summary

| Unit | Done | Wall time | Coins at end |
|---|---|---|---|
| 1 Psychology of Money | 9/9 | ~40 min | 2,010 |
| 2 Income & Earning Power | 15/15 | ~70 min (+~30 min retries/hangs) | 4,284 |
| 3, 4 | 0 | not reached | |

Every lesson is labelled "2 min"; median 3.6 min, several 4 to 6 min.

## Per-lesson table

| Lesson | Min | Acc | Correct | +Gained | -Lost | Net |
|---|---|---|---|---|---|---|
| psych-1 | ~10 | 55% | 16/29 | +260 | -155 | +120 |
| psych-2 | 4.0 | 63% | 10/16 | +560 | -140 | +435 |
| psych-4 | 3.2 | 58% | 7/12 | +220 | -90 | +145 |
| psych-5 | 4.2 | 56% | 9/16 | +420 | -110 | +325 |
| psych-6 | 3.4 | 50% | 6/12 | +170 | -100 | +85 |
| psych-7 | 3.8 | 50% | 6/12 | +280 | -90 | +205 |
| psych-8 | 4.4 | 63% | 10/16 | +360 | -90 | +285 |
| psych-9 | 3.4 | 50% | 6/12 | +180 | -100 | +95 |
| psych-10 | 4.5 | 75% | 9/12 | +190 | -70 | +135 |
| income-1 | 2.9 | 45% | 5/11 | +180 | -100 | +95 |
| income-2 | 5.2 | 55% | 6/11 | +100 | -70 | +45 |
| income-3 | 3.1 | 42% | 5/12 | +180 | -110 | +85 |
| income-4 | 6.2 | 63% | 10/16 | +420 | -130 | +305 |
| income-5 | 3.3 | 42% | 5/12 | +180 | -110 | +85 |
| income-6 | 2.0 | 100% | 8/8 | +560 | 0 | +575 |
| income-7 | 3.6 | 67% | 10/15 | +360 | -130 | +245 |
| income-8 | 3.3 | 33% | 4/12 | +160 | -120 | +55 |
| income-9 | 4.1 | 63% | 10/16 | +360 | -100 | +275 |
| income-10 | 3.3 | 50% | 6/12 | +200 | -100 | +115 |
| income-11 | 3.3 | 42% | 5/12 | +180 | -110 | +85 |
| income-12 | 4.1 | 69% | 11/16 | +370 | -90 | +295 |
| income-13 | 4.0 | 50% | 8/16 | +320 | -120 | +215 |
| income-14 | 4.0 | 63% | 10/16 | +280 | -100 | +195 |
| income-15 | 4.3 | 63% | 10/16 | +360 | -140 | +235 |

## Where it got stuck as a user

1. First screen after the tour: dropped into psych-1 with three reply bubbles and no idea what an InvestiCoin is for; three taps later a 16-second timed quiz on "present bias", "mental accounting", "sunk cost", "lifestyle creep", each seen once in a skipped paragraph. Got 2 of 4, failed, sent back to redo everything. "That is the moment I would have closed the tab."
2. After every lesson: "See daily missions" → "Continue Learning" → a wall of 35 unit cards and "0% of all units complete · 302 lessons to the finish line". Finishing a nine-lesson unit moved the number from 0% to 3% with no celebration.
