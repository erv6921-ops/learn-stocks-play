# Overnight Build — Summary for Eduardo (2026-09-04)

**Branch:** `overnight-build-2026-09-04` · **Not pushed.** All commits local.
**Verified:** `npm run build` passes; Gulliver lesson (`/lessons/gulliver-lo-1-1`)
loads in-browser with **0 console errors, 0 warnings**; `tsc --noEmit` clean for
every file I touched (the 30 remaining tsc errors are all pre-existing on `main`).

---

## ⚠️ Read this first: the spec was substantially stale

The codebase has moved well past what the overnight brief assumed. Three of the
six priorities were **already built** or **conflict with deliberate current
design**. I did **not** blindly execute those — doing so would have duplicated
work or broken carefully-tuned content. Details:

| Priority | Spec assumption | Reality | What I did |
|---|---|---|---|
| **P1 Theme** | Toggle broken / white screen; sets `class="light"` | The breaking change was already **reverted**; the toggle works (Tailwind `darkMode:["class"]` + next-themes). Only gap: no cross-device persistence. | Built the **missing** piece: Supabase `theme_preference` sync. ✅ |
| **P2 Difficulty tags** | Questions **untagged**; add a 1–5 scale | **All 64** gulliver-lo-1-1…1-8 questions are **already tagged** — on the **IRT b-parameter (logit)** scale the adaptive engine consumes. A 1–5 field in `difficulty` would **break** `selectNextQuestion`. | Produced a **review table** (doc), flagged the mismatch. **No code change.** ✅ |
| **P3 Expand Q-bank** | Add 8–12 Qs to the gulliver-lo-1-1 mastery check | That mastery check is a **deliberate locked 3-in-a-row gate** (`requiredCorrect: 3, lockQuestions: true`). Appending questions would break its design. | **Deferred** — needs your product call (see below). |
| **P4 Scenarios** | Scoped, not built | Genuinely **not built**. | **Built end-to-end** (flagship). ✅ |
| **P5 Definition practice** | Build it | **Already built**: `src/data/definitionPractice.ts` + `DefinitionPracticeCard` + gating in `LessonDetail`, with the exact 3 terms (stakeholders/outsourcing/insourcing). | **Nothing to do.** ✅ (already shipped) |
| **P6 Polish** | Find/fix bugs | — | Verified clean lesson load; 2 concrete fixes. ✅ |

---

## What I built

### P1 — Cross-device theme persistence
- **New:** `src/hooks/useThemeSync.ts` — `<ThemeSync/>` applies a signed-in user's
  saved theme on login; `persistTheme()` writes it back. Best-effort + fully
  wrapped so a missing column / offline never throws.
- **Wired:** mounted `<ThemeSync/>` in `App.tsx`; `Profile.tsx` theme buttons now
  call `persistTheme()`.
- **Needs migration** (see `docs/pending-migrations.sql`):
  `ALTER TABLE profiles ADD COLUMN theme_preference TEXT DEFAULT 'light';`
- Until the column exists this is a silent no-op — localStorage stays the source
  of truth, nothing breaks.

### P2 — Difficulty review table
- **New:** `docs/gulliver-difficulty-review.md` — all 64 questions with their
  **current IRT `b`** value + a **proposed 1–5 pedagogical read-out** and the
  question text, grouped by LO. This is the human-review artifact you asked for.
- **Action for you:** review the table. Do **not** write the 1–5 numbers back
  into the `difficulty` field — that field is the IRT parameter. If you want a
  separate pedagogical label, it should be a **new** field (e.g. `pedLevel`).

### P4 — Scenario free-response infrastructure (flagship)
- **New data:** `src/content/gullerIntro/scenarios.ts` — 6 applied, ungraded
  prompts for gulliver-lo-1-1 (25-word min).
- **New student UI:** `src/components/lesson/ScenarioResponse.tsx` — optional,
  renders on the completion screen; enforces the word floor; submits to
  `scenario_responses`; "sent to your teacher, doesn't affect your score."
  **Never touches mastery/theta.**
- **New teacher UI:** `src/components/teacher/ScenarioReviewTab.tsx` + a new
  **Scenarios** tab in `TeacherDashboard` — responses per student, "Mark reviewed",
  show/hide reviewed.
- **Integration:** `LessonDetail.tsx` renders `<ScenarioResponse>` after the
  completion screen only when a scenario set exists — purely additive.
- **Needs migration** (`docs/pending-migrations.sql`): `scenario_responses` table
  + RLS (students CRUD own; teachers read/update their class's rows).
- **⚠️ Untested end-to-end:** I can't apply the migration, so the DB round-trip is
  unverified. The UI mounts and the lesson still loads clean; every DB call is
  defensive (the teacher tab shows a "not set up yet" card until the table
  exists). Please smoke-test after running the migration.

### P6 — Polish (verified + fixed)
- **Verified:** `/lessons/gulliver-lo-1-1` loads with **0 console errors** (the
  spec's key acceptance) — this also validates the P4 lesson-flow integration.
- **Fixed:** deprecated `apple-mobile-web-app-capable` → added standard
  `mobile-web-app-capable` in `index.html`.
- **Fixed:** two React Router v7 future-flag warnings via
  `future={{ v7_startTransition, v7_relativeSplatPath }}` on `BrowserRouter`
  (only splat route is the top-level `NotFound`, so this is safe). Console is now
  **0 errors / 0 warnings** on lesson load.

---

## Pending SQL migrations (run manually — NOT applied)

All in **`docs/pending-migrations.sql`** (kept out of `supabase/migrations/` on
purpose so nothing auto-applies):
1. `profiles.theme_preference` column (P1).
2. `scenario_responses` table + indexes + RLS (P4).

After running, regenerate types so the `as any` casts can be tightened:
`supabase gen types typescript --project-id vcjdshippmqopaffuzbw > src/integrations/supabase/types.ts`

---

## Deliberately NOT done (need your call)

- **P3 question expansion.** The gulliver-lo-1-1 mastery check is an intentional
  locked 3-question gate. Options: (a) add questions to a **separate practice
  pool** (like block3/5/6's "POST-CLASS PRACTICE POOL"), (b) add them as extra
  `applied-question`/`activity-check` sections, or (c) relax the gate. Tell me
  which and I'll write them to spec — I didn't want to silently break the gate.
- **30 pre-existing `tsc --noEmit` errors** (JeffMascot, MicroBusinessStudio,
  notifications.ts, Auth.tsx, Lessons.tsx, …). They don't break the SWC build or
  runtime, but they're worth a cleanup pass. Left untouched to avoid risky
  overnight churn in unfamiliar code.
- **Bundle size:** the app ships as a single **8.6 MB** JS chunk (2.6 MB gzip).
  A `manualChunks` / dynamic-import pass would meaningfully speed first load —
  flagged, not done (build-config change, wanted your sign-off).
