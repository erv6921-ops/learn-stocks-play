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
