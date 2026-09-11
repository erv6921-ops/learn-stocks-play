# Overnight Report — IRS Forms in Labs + Benchmark Personalization

Branch: `feature/lesson-path`. **Everything is uncommitted.** No migrations were run;
any `.sql` under `supabase/migrations/` is OUTPUT ONLY — paste into the Supabase SQL
Editor yourself.

---

## SECTION 1 — RECON FINDINGS

### 1A. "Lab stations" / simulations / interactive activities

There is **no** table or type literally called "lab station". The interactive-activity
system in this app is the **Applied Finance Lab**:

| Concern | Where | Notes |
|---|---|---|
| Lab catalog (definition) | `src/data/labDocuments.ts` | `labCategories: LabCategory[]` — 12 categories, each with `documents: LabDocument[]`. A `LabDocument` = `{ id, title, subtitle, difficulty, reward, estimatedMinutes, available, education? }`. |
| Form fields for a lab | `src/data/labDocuments.ts` | Separate exported arrays (`w4FormFields`, `w2FormFields`, `form1040ezFields`, …) registered in `labFormFields: Record<docId, FormField[]>`. A `FormField` = `{ id, label, type, placeholder?, helpText?, whyItMatters?, options?, required, section, sectionNumber, validation? }`. |
| Library / list UI | `src/pages/AppliedFinanceLab.tsx` (route `/lab`) | "Up next" featured card + topic chips + doc grid. |
| The form player (renders a lab) | `src/pages/LabDocument.tsx` (route `/lab/:docId`) | Reads `getLabDocument(docId)` + `labFormFields[docId]`, renders a single continuous "form sheet" of `FormField`s grouped by `section`. |
| How answers are checked | `LabDocument.tsx` → `requestFeedback()` | Calls Supabase Edge Function **`lab-feedback`** (AI). There is **no expected-answers object** and **no per-field correctness grading** today — the AI returns `{ correct, feedback, tip }` per field. |
| How completion is saved | `src/data/labDocuments.ts` → `markLabDocDone` / `isLabDocDone` | **localStorage only**, key `ip_lab_done_${docId}`. There is **NO database table for lab attempts or lab completion.** Coins are awarded via `useApp().earnJeffs(doc.reward, …)`. |
| Props a lab "takes" | none — driven by `:docId` route param | The player looks everything up from the static data by id. |

Implication for Phase 1: the existing pattern is **static data + localStorage completion +
AI (not answer-key) checking**. The task's requirement for an **expected-answers object +
per-box grading** is genuinely new; I added it as an additive lab *kind* rather than
retrofitting the AI path.

### 1B. Benchmark assessment

- **Administered entirely inside** `src/pages/Onboarding.tsx` (step `"assessment"`). There is
  no standalone `AssessmentEngine` component. Questions come from
  `src/data/assessmentQuestions.ts` (`benchmarkQuestions`, 50 items, 25 served, adaptive by
  self-reported difficulty tier `foundational|applied|strategic`).
- **Where the score lands** — `Onboarding.tsx` → `handleComplete()` → `persistProfile()` upserts
  `profiles` with:
  - `assessment_score` (0–100 overall %)
  - `literacy_level` (MasteryTier string, from `calculateLiteracyLevel`)
  - `reward_multiplier` (1.0–1.5)
  - `benchmark_scores` (legacy per-topic 0/1 map, `computeBenchmarkScores`)
  - `benchmark_category_scores` (JSON `Record<category, {correct,total,percent}>`, `computeCategoryScores`)
  - `track`, `biz_lab_enrolled`
  - Note: column `mastery_tier` **exists** on `profiles` (types.ts:987) but the benchmark writes
    `literacy_level`, **not** `mastery_tier`. `mastery_tier` is effectively unused by the benchmark.
- **Downstream readers of these fields:**
  - `src/lib/curriculumEngine.ts` — `getAdaptiveCurriculum` / `getAdaptiveUnit` map
    `benchmark_category_scores` → per-unit "validated vs required" lessons + an entry-depth label.
  - `src/pages/Lessons.tsx`, `src/pages/Progress.tsx`, `src/pages/Dashboard.tsx` — read
    `benchmarkCategoryScores` / `assessmentScore` from the in-memory `user` (AppContext) to render
    adaptive unit state and progress.
  - `src/components/admin/StudentMasterDashboard.tsx` (`/admin/analytics`) — shows
    `assessment_score` per student (via the `student_master_stats` RPC).
  - `src/contexts/AppContext.tsx` — loads the profile into the `user` object.

**Verdict on "does the benchmark change the experience?":** *Partially, but weakly.*
`curriculumEngine` genuinely marks foundational lessons "validated" for strong domains — so the
adaptive unit view changes. **But** it does NOT touch the IRT engine at all (see 1C): every
student starts every lesson's adaptive quiz at `theta = 0`, so **the difficulty of the first
question served is identical for a novice and an expert.** The benchmark also does not influence
`getNextAction` (the home-screen "what's next" chain). So the classroom impression is right: the
benchmark relabels units but doesn't move the questions.

### 1C. IRT engine

- **Pure math:** `src/lib/adaptiveEngine.ts` — 1PL/Rasch. `updateTheta(prev, obs)` does one Bayesian
  step on `N(theta, se²)`. `selectNextQuestion(pool, theta, asked)` picks the not-yet-asked question
  whose `difficulty` (b) is closest to `theta` (max Fisher info). Difficulty scale is modest
  (`B_REMEDIAL=-1.5`, `B_BASE=0`, `B_HARD=1.5`). `DEFAULT_ABILITY = { theta: 0, se: 1.0 }`.
- **Persistence table:** `student_ability (user_id, concept, theta, se, attempts, updated_at)`,
  migration `supabase/migrations/20260827000000_student_ability.sql`. `concept` = `lesson.category`.
  RLS: students read/insert/update own rows; teachers read their class's rows.
- **Persistence hook:** `src/hooks/useAbility.ts` — loads the row for `(user_id, concept)` on lesson
  entry, updates in memory per answer, debounce-persists on exit / tab-hide. **No-op under
  `DEV_LOCAL_BYPASS`** (the local dev user has no real JWT).
- **Wiring:** `QuizSessionProvider` (`src/components/lesson/QuizSessionContext.tsx`) calls
  `useAbility(concept)`; `LessonDetail.tsx:561` and `StudentLessonView.tsx:293` pass
  `concept={lesson.category}`. `SectionRenderer.tsx` calls
  `selectNextQuestion(pool, session.getTheta(), asked)` to choose questions.
- **`question_attempts`:** *does not exist* as a table. Per-answer signal lives only in memory
  (AnswerContext) and analytics events (`logEvent("quiz_attempted", …)`); only the folded
  `{theta, se, attempts}` is persisted, to `student_ability`.
- **Brand-new-student init:** hardcoded `DEFAULT_ABILITY` (`theta 0, se 1.0`). **The benchmark result
  does NOT seed it.** This is the core gap Phase 2 closes: the benchmark's per-domain % is never
  translated into a starting `theta`, so the adaptive engine always cold-starts at average.

### 1D. Assumptions in the brief that DON'T match the repo (stated plainly)

1. **`/admin/curriculum-review` route — does not exist.** The only admin route is `/admin/analytics`.
2. **`question_approvals` table — does not exist anywhere** (repo, migrations, or generated types).
3. **`generated_questions` — exists in Supabase but only inside the teacher curriculum-upload
   pipeline** (`supabase/functions/generate-questions/index.ts` inserts rows keyed on
   `upload_id` + `concept_id` with `status='pending'`). It is NOT a general benchmark-question review
   queue, is not surfaced in any frontend, and its columns (`upload_id`, `concept_id`, `question_text`,
   `options`, `correct_answer`, `explanation`, `difficulty` numeric 0–1, `status`) are tied to an
   uploaded-curriculum concept graph. Reusing it for benchmark items would require inventing fake
   `upload_id`/`concept_id` FKs.
   → **Decision (reversible):** generated benchmark items go into a static review file
   (`src/data/benchmarkBankGenerated.ts`, every item `approved:false / status:'pending'`), surfaced in a
   **new** `/admin/curriculum-review` page with Approve/Reject persisted to localStorage. Nothing
   auto-publishes into the live `benchmarkQuestions`. A DB-backed schema mirroring the
   `generated_questions` conventions is provided as an OUTPUT-ONLY migration for when you want it in
   Postgres. See Sections 2–4.
4. **`mastery_tier` vs `literacy_level`:** the benchmark writes `literacy_level`; `mastery_tier` column
   is unused. I left both alone and keyed everything off `benchmark_category_scores` + `student_ability`.

---

## SECTION 2 — WHAT I BUILT (file by file)

### Phase 1 — Real IRS forms in lab stations

**New — `src/components/labs/forms/` (the reusable form-replica system):**

- `types.ts` — shared types: `IRSFormType` (`w4|w2|1099nec|1040`), `IRSFieldKind`,
  `IRSFormPayload { form, prefill, expected, scenario }`, `IRSGradeSpec { boxLabel, kind, hint }`,
  `FieldFeedback`, `GradeResult`, `IRSFormProps`.
- `format.ts` — input masking + grading normalization: `maskSSN` (XXX-XX-XXXX), `maskEIN`,
  `formatCurrency` (thousands separators as you type), `normalize(kind,v)`, and `valuesMatch(kind,a,b)`
  (exact, format-insensitive; a blank entry is never counted correct even against an expected "0").
- `IRSFormShell.tsx` — the paper look: `<IRSFormShell>` masthead ("Department of the Treasury —
  Internal Revenue Service", Form number + year, OMB number top-right, black 2px rules, monospace
  fields, white sheet on a scrollable container). Primitives `FormSection`, `BoxRow`, `Box`
  (numbered corner label + "why does this box exist?" tooltip + red/green outline + check/X + hint),
  `ChoiceBox` (mutually-exclusive checkbox/radio groups). Horizontally scrolls inside a bordered
  container on mobile (min-width sheet) instead of reflowing.
- `W4Form.tsx` — Form W-4 (2024), Steps 1–5 incl. Step 2 multiple jobs + Step 3 dependents; exports
  `w4Grading`.
- `W2Form.tsx` — Form W-2, boxes a–f + 1–20 prefilled/read-only, plus a graded "Read & Report"
  section; exports `w2Grading`.
- `Form1099NEC.tsx` — Form 1099-NEC boxes 1–7 (gig scenario) + the self-employment-tax teaching
  question; exports `nec1099Grading`.
- `Form1040.tsx` — simplified Form 1040 lines 1a, 2b, 8, 9, 11, 12 (standard deduction), 15, 16, 24,
  25a, 33, 34/37; exports `f1040Grading`.
- `IRSFormLab.tsx` — orchestrator page: renders the right form, grades entries against the lab's
  `expected` key using each form's grading spec, shows per-box feedback anchored to the box number,
  awards coins + marks the lab done on a perfect submission, records the attempt.
- `attempts.ts` — `recordIrsAttempt` / `getIrsAttempt` (localStorage `ip_irs_attempt_${docId}`,
  same pattern as the existing lab-completion flags).
- `index.ts` — barrel export.

**Edited:**
- `src/data/labDocuments.ts` — extended `LabDocument` with `kind?: "irs_form"` + `irsForm?:
  IRSFormPayload`. Seeded **4** IRS-form labs at the top of the Taxes category (all `available:true`):
  `irs-w4-first-job`, `irs-w2-read`, `irs-1040-single` (the 3 required), plus `irs-1099nec-gig` so
  the 4th built form is reachable. Each carries its `scenario`/`prefill`/`expected` payload.
- `src/pages/LabDocument.tsx` — after all hooks, delegates to `<IRSFormLab>` when
  `doc.kind === "irs_form"`. The existing AI-checked field labs are untouched. `AppliedFinanceLab.tsx`
  (the library) needed no change — the new labs list, preview (education teaser), and open correctly.

**Standards coverage (SS.912.FL income/taxation):** W-4 → SS.912.FL.1 (earning income / withholding);
W-2 read-and-report → SS.912.FL.1.4 (taxation, reading a wage statement); 1040 single filer →
SS.912.FL.1.4 (filing, standard deduction, refund vs. owed); 1099-NEC → SS.912.FL.1.4 +
self-employment tax awareness.

### Phase 2 — Benchmark actually personalizes the app

**New:**
- `src/lib/benchmarkSeeding.ts` — pure mapping from benchmark per-domain scores to IRT seeds:
  `percentToTheta` (100%→+1.2, 50%→0, 0%→−1.2 on the engine's ±1.5 scale), `deriveDomainAbilities`
  ({concept, theta, se: `SEED_SE=0.9` = low confidence, attempts: 0}), plus the "starting point"
  summary helpers `domainStartingPoints`, `tierForPercent`, `tierForTheta`, `TIER_LABEL`,
  `conceptLabel`.
- `src/data/benchmarkBankGenerated.ts` — generated benchmark bank, **42 items across the 7 major
  SS.912.FL domains** (earning income, taxes, budgeting, saving & investing, credit & debt, risk &
  insurance, consumer skills), 6 per domain spread easy/medium/hard. Every item `status:"pending"`;
  **nothing is imported into the live `benchmarkQuestions`.**
- `src/lib/benchmarkReview.ts` — approve/reject decisions for the queue (localStorage).
- `src/pages/admin/CurriculumReview.tsx` — the `/admin/curriculum-review` review page: items grouped
  by domain, correct option highlighted, explanation shown, Approve/Reject/Reset per item, running
  pending/approved/rejected counts. Nothing auto-publishes.

**Edited:**
- `src/pages/Onboarding.tsx` — in `handleComplete`, after the profile save, **seeds
  `student_ability`** from the benchmark's `benchmark_category_scores` (upsert, keyed on
  `user_id,concept`), skipped under `DEV_LOCAL_BYPASS`, with a destructive toast if the write fails
  (no longer swallowed). Added a **"Your starting point"** block to the results screen showing each
  tested domain's starting tier + which domains are flagged for review.
- `src/lib/getNextAction.ts` — added optional `benchmarkCategoryScores` to `NextActionContext`; the
  **`review` fallback only** now targets the student's weakest tested domain's first lesson
  (`weakestReviewLesson`). Priority order and the other three action kinds are unchanged;
  `mastery_check`/`benchmark` kinds were not touched (they aren't in the chain).
- `src/components/student/LessonPath.tsx` — passes `benchmarkCategoryScores` into `getNextAction`
  (and dropped a stale `unitTestProgress` prop that wasn't in the type — net −1 pre-existing error).
- `src/components/admin/StudentMasterDashboard.tsx` — added a per-student **"Show benchmark starting
  point"** panel that reads the seeded `student_ability` rows (teacher RLS already permits this) and
  shows each domain's tier + live theta. This is the teacher-facing view of the same data.

### Verification performed
- `npx tsc --noEmit -p tsconfig.app.json`: **23 errors, all pre-existing** (JeftMascot,
  MicroBusinessStudio, apMicro, AppContext, notifications, Auth, Lessons, Onboarding
  ReactNode/QuizQuestion casts, StudentHeroBanner). Baseline was 24; my change to LessonPath removed
  one. **None of my new/edited lines add an error.**
- `npm run build`: **passes clean** (built in ~5s, PWA generated).
- `npm run preview` on `localhost:4173`: server returns 200; the built bundle contains all new
  features (verified by grepping `dist/assets/index-*.js`).
- Pure-logic checks (esbuild + node) confirmed SSN/currency masking, `valuesMatch` (incl. the
  blank-≠-"0" fix), `percentToTheta`, `tierForPercent/Theta`, and `deriveDomainAbilities`.

---

## SECTION 3 — MIGRATION FILES & RUN ORDER

Both are **OUTPUT ONLY** — I did not run them. Neither is required for the features to work today
(the shipping paths use `student_ability` (already migrated) + localStorage). Run them only if/when
you want DB-backed lab attempts and a DB-backed review queue. Run in this order:

1. `supabase/migrations/20260909000000_lab_form_attempts.sql` — optional server-side persistence of
   IRS-form lab attempts (student-owned rows, teacher class-read). **Not wired to the client yet** —
   creating it alone changes nothing until `attempts.ts` is pointed at it.
2. `supabase/migrations/20260909000100_generated_benchmark_questions.sql` — `generated_benchmark_questions`
   (mirrors the existing `generated_questions` column conventions + `domain`/`standard`) and
   `question_approvals` (the audit trail the brief referenced, which doesn't exist yet). The review
   page currently reads the static file + localStorage, so this is only needed to move the queue into
   Postgres.

The pre-existing `student_ability` table (migration `20260827000000_student_ability.sql`) is what the
benchmark seeding writes to — **it's already live, no migration needed for Phase 2 to work.**

---

## SECTION 4 — STILL BROKEN / HALF-DONE / NEXT STEPS

1. **No live browser walkthrough of the full authenticated flow.** I verified typecheck, build,
   bundle contents, and the pure grading/seeding math, but I did NOT drive a real login in a browser
   to watch `student_ability` rows actually get written (the brief says test persistence via
   preview + a real login, and the DEV bypass blocks the write). The write path mirrors the proven
   `useAbility` upsert exactly, and errors now surface via toast, but a human should confirm end-to-end
   with a real account. (I did not spawn the student-playtester agent — not requested.)
2. **Generated benchmark bank is staged, not promoted.** The 42 SS.912.FL items live in a static file
   and a localStorage review queue because the assumed `generated_questions`/`question_approvals`
   review infra + `/admin/curriculum-review` route did not exist (Section 1D). Nothing auto-publishes.
   Next: after human approval, add a small promote step (approved items → appended to
   `benchmarkQuestions`, or migrate to the two output-only tables and read from Postgres). This was the
   deliberately-reversible choice.
3. **Teacher "starting point" reads `student_ability`, not `benchmark_category_scores`.** I chose this
   because the teacher RLS on `student_ability` already exists and needs no migration, and it shows the
   live (post-drift) ability. The `get_student_master_stats` RPC does not return
   `benchmark_category_scores`; adding it would need a migration (can't run tonight). Trade-off noted.
4. **W-2/1099 "Read & Report" grades transcription, not full transcription of every box.** The
   employer/payer side is faithfully rendered read-only; the graded portion is the key figures a
   student must locate + copy. Extending grading to more boxes is just more `expected` keys.
5. **1040 tax on line 16 is given in the scenario** rather than looked up from an embedded tax table.
   A future pass could render a real mini tax-table widget so the student derives line 16 themselves.
6. **Chunk size warning** on build (pre-existing; the app is one big bundle). Not introduced by me.
7. **Pre-existing typecheck errors (23)** remain in unrelated files; I intentionally didn't touch them.

---

## SECTION 5 — EXACTLY WHAT TO CLICK

Build + preview first (the DEV `npm run dev` bypass blocks `student_ability` writes):
```
npm run build && npm run preview      # serves http://localhost:4173
```

**A. IRS-form labs**
1. Sign in (a real account, so coins/persistence behave), go to **`/lab`** (needs 600 coins, like all
   labs — the "Applied Finance Lab").
2. Under **Taxes** you'll see the new labs at the top: **"W-4 · First Job"**, **"W-2 · Read &
   Report"**, **"1040 · Single Filer"**, **"1099-NEC · Gig Work"**. They're also the "Up next" card.
3. Open **`/lab/irs-w4-first-job`**. Confirm it looks like the paper W-4 (Treasury header, OMB
   1545-0074, numbered boxes, monospace). Hover/tap any ⓘ for the "why this box exists" tooltip.
   Fill it per the scenario (Alex Rivera, SSN 123-45-6789, Single, one job, 0 dependents, sign
   "Alex Rivera"), click **Check my answers** → all boxes go green, coins awarded, completion screen.
   Enter a wrong filing status and re-check → that box outlines red with the box-anchored hint.
4. Open **`/lab/irs-w2-read`** — the W-2 is prefilled/read-only; copy Box 1/2/4/6 into "Read & Report"
   and check. Open **`/lab/irs-1040-single`** — fill lines 1a→37 from the scenario (refund $730).
   Open **`/lab/irs-1099nec-gig`** — report Box 1 ($4,200), Box 4 ($0), and choose "set aside ~25–30%".
5. On a phone / narrow window, confirm the form scrolls sideways inside its border (doesn't stack).

**B. Benchmark personalization**
1. Take the benchmark: **`/onboarding?benchmark=1`** (signed in), answer through to results.
2. On the **results screen**, see the new **"Your starting point"** block (per-domain tiers + review
   flags), then **Start Personalized Learning**.
3. Verify seeding: in the browser console run
   `localStorage.setItem('ability_debug','1')`, or query Supabase directly:
   `select concept, theta, se, attempts from student_ability where user_id = auth.uid();` — you should
   see one row per tested domain with a non-zero theta (strong domains positive, weak negative),
   se 0.9, attempts 0. (If the write fails you'll now get a red toast instead of silence.)
4. Enter a lesson whose category you scored HIGH on and one you scored LOW on; the first adaptive
   question served should be harder in the strong domain (higher `b`) than in the weak one, because
   `selectNextQuestion` starts from the seeded theta.
5. On the student lesson path, once assignments/resumes are cleared, the **Review** card points at
   your weakest benchmark domain's lesson ("Review · <Domain>").
6. Teacher view: **`/admin/analytics`** (as an allowlisted teacher) → a student card → **"Show
   benchmark starting point"** → per-domain tiers + theta read from `student_ability`.

**C. Generated benchmark review queue**
1. Go to **`/admin/curriculum-review`** (signed in). See 42 SS.912.FL items grouped by the 7 domains,
   each with the correct answer highlighted + explanation.
2. Approve/Reject a few → the header counts update and decisions persist across reloads (localStorage).
   Confirm nothing here changes the live benchmark (it doesn't — promotion is a separate manual step).
