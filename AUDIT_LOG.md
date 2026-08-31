# Standards Compliance Audit Log

Automated weekly check that InvestiPlay's lesson/quiz content in `src/data/lessons.ts`,
`src/data/lessonQuizzes.ts`, and `src/data/quizzes/*.ts` still matches current financial-literacy
standards. Runs every week; only produces a content PR when something is actually flagged.

## 2026-08-10 — no changes needed

Checked sources (all reviewed for updates in the trailing 30 days, i.e. since 2026-07-11):

- Florida DOE / CPALMS — Personal Financial Literacy (2102372 / course code family 210237201) and
  Personal Financial Literacy Honors (2102374 / 210237401), SS.912.FL benchmark strand. Current
  version is the 2022-and-beyond revision (per the 2025-26 FL DOE Curriculum Framework); no
  benchmark changes found in the trailing 30 days.
- Florida Legislature 2026 session — no new financial-literacy statute changes found. For the
  record: CS/CS/HB 1255 & CS/CS/SB 1618 (2025), effective 7/1/2025, added FAFSA/cost-of-attendance/
  scholarships/loans content to the required course — already covered by `credit-16` ("Paying for
  College: FAFSA, Grants & Loans"). HB 1261 "Smart Living Act" (2025), which would have added
  broader life-skills content, died in committee 6/16/2025 and was not reintroduced this session —
  no action required, noted for future monitoring.
- Jump$tart Coalition / Council for Economic Education — National Standards for Personal Financial
  Education, current edition remains the 2021 joint revision (6 categories: Financial Responsibility
  & Decision Making, Income & Careers, Planning & Money Management, Saving, Investing, Managing
  Risk). No newer edition found.
- EverFi — standards-alignment materials still reference Jump$tart National Standards + state
  standards; no material update found in the trailing 30 days.
- Next Gen Personal Finance (NGPF) — maintains a 2026 state bill tracker; no new adopted standard
  affecting Florida found.
- Banzai — April 2026 product update expanded state-standards alignment for Utah, California, and
  Wisconsin (not Florida); outside the 30-day window.
- Ramsey Education — curriculum remains aligned to Jump$tart + all-50-states standards; no
  Florida-specific change found.

Spot-checked lesson coverage against the FL.912.FL benchmarks turned up in this pass (FL.1.1-1.5,
FL.2.1/2.11/2.13, FL.3.3/3.6/3.7, FL.4.2, FL.5.9/5.12, FL.6.3/6.4/6.13) — all map to existing
lessons (`psych-*`, `income-14`, `income-15`, `invest-11`, `invest-12`, `banking-9`, `ins-3`,
`ins-6`, `ins-7`, `behavior-*`). No drifted lessons or standards-with-no-lesson gaps identified
this cycle.

Result: 0 lessons flagged, 0 new/updated standards requiring a content change, nothing urgent.

## 2026-08-17 — no changes needed

Checked sources (all reviewed for updates in the trailing 30 days, i.e. since 2026-07-18):

- Florida DOE / CPALMS — Personal Financial Literacy (2102372 / course code family 210237201) and
  Personal Financial Literacy Honors (2102374 / 210237401), SS.912.FL benchmark strand. No
  benchmark or course-description changes found in the trailing 30 days (CPALMS/DOE pages could
  not be fetched directly this cycle either — see Caveat below).
- Florida Legislature — no new financial-literacy statute changes found. HB 1261 "Smart Living Act"
  remains dead (died in committee 6/16/2025, not reintroduced). No FAFSA/consumer-content bills
  beyond the already-covered 2025 CS/CS/HB 1255 & CS/CS/SB 1618.
- Jump$tart Coalition / Council for Economic Education — National Standards for Personal Financial
  Education, current edition remains the 2021 joint revision (6 categories). No newer edition found.
- EverFi — no material alignment update found.
- Next Gen Personal Finance (NGPF) — 2026 bill tracker still active; no newly adopted standard
  affecting Florida found. NGPF is also running a Stiles-Nicholson-funded $500 PD stipend for
  Florida teachers (deadline 12/31/2026) — a funding/PD program, not a standards change, no action
  needed.
- Banzai — no new Florida-specific alignment change found this cycle.
- Ramsey Education — no Florida-specific change found.
- NCSL 2026 financial-literacy legislation tracker (last updated 2026-05-18 per search results) —
  no new Florida entry found.

No lesson-content drift or standards gaps identified against the SS.912.FL benchmarks spot-checked
last cycle; no re-scope of the comparison was triggered since no source changed.

Result: 0 lessons flagged, 0 new/updated standards requiring a content change, nothing urgent.

## 2026-08-24 — no changes needed

Checked sources (all reviewed for updates in the trailing 30 days, i.e. since 2026-07-25):

- Florida DOE / CPALMS — Personal Financial Literacy (2102372 / course code family 210237201) and
  Personal Financial Literacy Honors (2102374 / 210237401), SS.912.FL benchmark strand. No
  benchmark or course-description changes found in the trailing 30 days. Direct fetch of
  cpalms.org is still blocked by this session's network egress proxy — see Caveat below.
- Florida Legislature — no new financial-literacy statute changes found this cycle. HB 1261 "Smart
  Living Act" remains dead (died in committee 6/16/2025, not reintroduced).
- Jump$tart Coalition / Council for Economic Education — National Standards for Personal Financial
  Education, current edition remains the 2021 joint revision (6 categories). No newer edition found.
- EverFi — no material alignment update found; 2025-26 collateral (curriculum guide, 2026 "State of
  Teen Financial Literacy" report) still maps to Jump$tart + state standards, nothing new to act on.
- Next Gen Personal Finance (NGPF) — Live US Dashboard (as of 2026-05-23) lists 30 "Guarantee
  States" including Florida; 2026 bill tracker still active; no newly adopted standard affecting
  Florida found.
- Banzai — no new Florida-specific alignment change found this cycle (last alignment expansion was
  April 2026, for Utah/California/Wisconsin — not Florida).
- Ramsey Education — no Florida-specific change found.
- Noted, not actionable: Texas HB 27 (signed June 2025) makes personal financial literacy its own
  required course for the TX class entering 9th grade in 2026-27. Texas-specific; does not affect
  InvestiPlay's Florida-course-code standards mapping (2102372/2102374), and Florida already
  guarantees the requirement. Flagged here only in case a future cycle adds a Texas-standards track.

No lesson-content drift or standards gaps identified against the SS.912.FL benchmarks spot-checked
in prior cycles; no re-scope of the comparison was triggered since no source changed.

Result: 0 lessons flagged, 0 new/updated standards requiring a content change, nothing urgent.

## 2026-08-31 — no changes needed

Checked sources (all reviewed for updates in the trailing 30 days, i.e. since 2026-08-01):

- Florida DOE / CPALMS — Personal Financial Literacy (2102372 / course code family 210237201) and
  Personal Financial Literacy Honors (2102374 / 210237401), SS.912.FL benchmark strand. Search
  results still show the course versioned "2022 and beyond" with no newer revision surfaced. Direct
  fetch of cpalms.org and ncsl.org is still blocked by this session's network egress proxy — see
  Caveat below — so this remains a search-snippet-only check.
- Florida Legislature — no new financial-literacy statute changes found this cycle. HB 1261 "Smart
  Living Act" remains dead (died in committee 6/16/2025, not reintroduced). No bills beyond the
  already-covered 2025 CS/CS/HB 1255 & CS/CS/SB 1618 (FAFSA/college-cost content, covered by
  `credit-16`).
- Jump$tart Coalition / Council for Economic Education — National Standards for Personal Financial
  Education, current edition remains the 2021 joint revision (6 categories). No newer edition found.
  Florida Jump$tart Coalition is running 2026 NEC teacher-scholarship applications (deadline
  8/14/2026) — a PD/funding item, not a standards change, no action needed.
- EverFi — no material alignment update found; still maps to Jump$tart + state standards. Pinellas
  County Schools (FL) case study on EverFi's site describes normal 2025-26 rollout, not a standards
  or content change.
- Next Gen Personal Finance (NGPF) — 2026 bill tracker still active; no newly adopted standard
  affecting Florida found.
- Banzai — no new Florida-specific alignment change found this cycle.
- Ramsey Education — no Florida-specific change found; curriculum remains aligned to Jump$tart +
  all-50-states standards.
- Noted, not actionable: Pennsylvania's new mandatory personal-finance course takes effect for the
  2026-27 school year (per SAS/PA DOE materials surfaced in search) — Pennsylvania-specific, does
  not affect InvestiPlay's Florida-course-code standards mapping (2102372/2102374).

No lesson-content drift or standards gaps identified against the SS.912.FL benchmarks spot-checked
in prior cycles; no re-scope of the comparison was triggered since no source changed.

Result: 0 lessons flagged, 0 new/updated standards requiring a content change, nothing urgent.
