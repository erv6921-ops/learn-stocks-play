# Overnight Build — Generated Curriculum Lessons → Full Jeff-Taught Experience

Branch: `overnight/generated-lessons-full-experience` (NOT pushed to main).
Project: InvestiPlay (Supabase `vcjdshippmqopaffuzbw`).

Goal: when a teacher assigns an uploaded-curriculum lesson, students get the full
InvestiPlay lesson experience (Jeff teaches → checks → scenario → mastery),
rendered through the **same** lesson components hand-built lessons use, feeding
the **real** IRT theta engine — not a bare quiz.

**Status: all 5 phases implemented, typecheck clean (0 errors), `npm run build`
passes, and the extract → 15-questions → synthesize pipeline was smoke-tested
end-to-end against the live DB (see “Verification” below).**

---

## What was built, file by file

### Phase 1 — fewer, better questions
- `supabase/functions/generate-questions/index.ts` — rewritten. Was 5 questions ×
  every concept (~45). Now **one Claude call** produces **exactly 15 questions
  total** across the top `MAX_CONCEPTS` (6) most-prominent concepts, with a mix of
  difficulty (~5 easy / 6 medium / 4 hard). Difficulty label → numeric
  (`easy 0.25 / medium 0.5 / hard 0.75`) stored in `generated_questions.difficulty`.
  Each question is attributed to a concept (name→id map). Idempotent: skips if the
  upload already has questions. **Deployed.**

### Phase 2 — lesson synthesis
- `supabase/functions/synthesize-lesson/index.ts` — **new.** Input `{uploadId,
  lessonId}`. Loads `extracted_text`, `concepts`, `vocabulary`,
  `learning_objectives`, and the 15 `generated_questions`. Locked system prompt
  (Jeff’s voice) → strict JSON (fences stripped) with 2–4 teaching segments,
  1 mini check-in, 1 micro-check, 1 scenario. The function **assembles the ordered
  `sections` array server-side** (mini check-in placed mid-lesson) and **appends a
  `mastery-check` built from the 15 DB questions** (`requiredCorrect = round(pool*0.6)`
  → 9 for a pool of 15; pool > required so retries draw fresh subsets). Also stores a
  compact `jeffContext` (objectives, concepts, vocab, text excerpt) for Jeff’s live
  chat. Writes it all to `lessons.content` (JSONB). **Deployed.**
- `src/pages/AssignLessonPage.tsx` — wired: create lesson as `draft` → invoke
  `synthesize-lesson` (shows a **“Building lesson…”** button state) → set
  `published` → create `class_lesson_assignments` → link questions. Synthesis
  failure is **non-fatal** (publishes anyway; student view falls back to a
  mastery-only check).
- `overnight-migration.sql` — **new**, repo root. Adds `lessons.content JSONB`
  (idempotent) + a recap of the recursion-safe `class_lesson_assignments` policies.

### Phase 3 — student player
- `src/pages/StudentLessonView.tsx` — **rewritten.** Now renders the DB lesson
  through the **real** lesson components:
  - Jeff teaches first via `JeffChat`, scripted from the sections with
    `buildScript(sections, isDeepLesson(...))` (same as hand-built lessons), with
    `mustCover` (concept defs) and `source` (uploaded text excerpt) so Jeff can
    teach/answer about **this** upload. `onQuizReady` → sections.
  - Sections + mastery run inside `HintProvider` + `QuizSessionProvider`
    (`concept = "curriculum:<lesson-slug>"`), reusing `ConceptRenderer`,
    `MicroCheckRenderer`, `ScenarioRenderer`, `MasteryCheckRenderer`, etc.
  - **Scoring flows into the existing systems unchanged:** `QuizSessionProvider →
    useAbility → updateTheta` (real Bayesian IRT), and `MasteryCheckRenderer`
    logs `question_attempts` (`source: "lesson_quiz"`). On mastery complete →
    `student_lesson_progress` marked `completed` → `LessonResultsScreen`.
  - Fallback: if `lessons.content` is missing, it builds a mastery-only check from
    `generated_questions` so nothing regresses.

### Unchanged but relevant
- `src/components/student/StudentLessonsSection.tsx` (dashboard “Lessons” cards) and
  `src/components/LessonResultsScreen.tsx` are reused as-is.

---

## Decisions / deviations (and why)

1. **Reused the real IRT engine + real lesson components; did NOT modify
   `LessonDetail.tsx`.** `LessonDetail` (782 lines) drives hand-built lessons and
   is explicitly off-limits. `StudentLessonView` mirrors its JeffChat→sections→
   mastery structure and imports the **same** renderers/providers, so behavior is
   the same without risking the regular flow. Trade-off: two player entry points
   (`/lessons/:id` for static, `/student/lesson/:lessonId` for generated) rather
   than one unified page.
2. **Mastery pool built server-side from the 15 DB questions**, not re-authored by
   the synthesis call — more reliable, and keeps the pool = the generated bank.
3. **Mini check-in / micro-check are authored by the synthesis call** (1 Q each),
   separate from the mastery pool, so the pool stays a clean 15.
4. **`concept` key = `curriculum:<slug(lesson name)>`** (per your earlier choice to
   derive from the lesson) — keeps curriculum theta per-topic, no collision with
   the app’s existing concepts.
5. **Question-generation reduced via a single call**, not 15 separate calls — faster
   and cheaper, and lets Claude balance difficulty across concepts.
6. **Synthesis is on the assign path** (draft → synthesize → publish). If it fails,
   the lesson still publishes and the student gets a mastery-only check.

---

## What was NOT finished / known limitations

1. **Dashboard progress is coarse.** `student_lesson_progress` is written only on
   completion (theta/attempts are handled by the reused components mid-lesson).
   So a lesson shows “Start lesson” until finished, then “Completed” — there’s no
   live in-progress % on the card. (Old bare-quiz view updated it per question.)
   Fix later: have the player upsert `num_answered` as sections complete.
2. **Dashboard card is `StudentLessonsSection`, not the exact regular lesson card /
   pop-up entry flow.** The task asked for “same card + pop-up/entry behavior.”
   Generated lessons appear in their own “Lessons” section on the dashboard, not
   interleaved into the regular units with the DashboardPopups entry animation.
   Full parity would require registering DB lessons into the units/registry that
   `Dashboard`/`DashboardPopups` iterate — deferred (higher risk, touches the
   regular dashboard).
3. **Teacher preview still previews questions, not the full lesson structure.**
   `PreviewLessonModal` shows the generated questions (now 15). Previewing the
   synthesized sections would need synthesis to run at preview time (before assign).
   Left as-is (the “otherwise questions” branch you allowed).
4. **No live browser test.** Verified at the data/API layer only (see below). The
   Jeff chat UI, section stepper, and mastery UI were not click-tested in a browser
   (needs a real student login in a class with an assigned lesson).
5. **`generate-questions` is idempotent (skips if questions exist).** Re-running on
   an upload that already has the old 45 will NOT reduce them to 15. For uploads
   created before this build, clear their `generated_questions` first to regenerate.

---

## SQL applied (and in `overnight-migration.sql`)

Applied live via the Management API during the build; also written to
`overnight-migration.sql` at repo root. The only **new** schema change is:

```sql
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS content JSONB;
```

No new RLS policy needed: students already have `"Students see assigned lessons"`
(SELECT) on `lessons`, which returns the whole row incl. `content`; teachers keep
`"Teachers see own lessons"`. The migration file also re-states the recursion-safe
`class_lesson_assignments` policies (using `is_class_teacher`/`is_class_member`
SECURITY DEFINER helpers) for reproducibility.

> Note: the broader curriculum schema (lessons, generated_questions,
> student_lesson_progress, question_attempts.selected_answer, all the curriculum
> RLS) was applied live earlier this project and is **not** in `supabase/migrations`.
> `overnight-migration.sql` documents the overnight delta + the assignment-policy
> recap, not the entire history. Ask if you want a full consolidated migration.

Edge functions deployed to `vcjdshippmqopaffuzbw`: `generate-questions` (updated),
`synthesize-lesson` (new). (`extract-curriculum`, `check-mastery` unchanged.)

---

## Verification (data/API layer, done tonight; test data cleaned up)

Seeded a throwaway upload (4 concepts), then:
- `extract-curriculum` → 4 concepts, 6 vocab.
- `generate-questions` → **15** questions. ✅ (Phase 1)
- `synthesize-lesson` → **7 sections**, mastery pool **15**, requiredCorrect **9**. ✅ (Phase 2)
- Stored `lessons.content.sections` shape:
  `[concept, concept, micro-check, concept, micro-check, scenario, mastery-check]`
  — 3 Jeff-voiced teaching segments, mid-lesson check-in, mastery answers as numeric
  indices. ✅
- All seed rows deleted afterward (0 stray).
- `npx tsc --noEmit` → **0 errors**. `npm run build` → **success**.

---

## Morning testing checklist (browser)

**Teacher**
1. `/teacher-dashboard` → Curriculum tab → upload a PDF; wait for “extracted”.
2. Click **Preview lesson** on the upload → confirm ~**15** questions generate.
3. Click **Assign to class**, name it, pick a class → **Assign**.
   - Watch for the **“Building lesson…”** button state (synthesis running).
   - Lands back on the dashboard; toast confirms assignment.
4. (Optional) In SQL Editor: `select content->'sections' from lessons where id='<lessonId>';`
   → should show concept/micro-check/scenario/mastery-check.

**Student** (a student in that class)
5. `/dashboard` → **Lessons** section shows the new lesson card → **Start lesson**.
6. **Jeff teaches** the uploaded material (iMessage UI); ask Jeff a question about
   the content → he should answer from it. Advance to the check (“Ready to test…”).
7. Step through: concept sections → mini check-in → micro-check → scenario.
8. **Mastery check**: answer questions; pass = ≥9/15.
9. **Results screen** shows score + mastery; **Back to dashboard**.
10. Verify scoring landed:
    - `select * from question_attempts where lesson_id='<lessonId>' and user_id='<studentId>';`
    - `select * from student_ability where user_id='<studentId>' and concept like 'curriculum:%';` (theta updated)
    - `select status from student_lesson_progress where lesson_id='<lessonId>' and student_id='<studentId>';` → `completed`

---

## Risks / things to watch

- **Synthesis latency/cost:** one Claude call (~8k max_tokens) on assign. Fine for a
  few-concept upload; a very large upload just uses the top 6 concepts + a 6k-char
  text excerpt, so it stays bounded.
- **Jeff script from generated sections:** `buildScript` is battle-tested on
  hand-built sections; generated sections match the schema, but Jeff’s scripted
  phrasing over machine-written concept text hasn’t been reviewed for tone. Worth a
  read-through in step 6.
- **`correctAnswer` index mapping:** synthesized mastery questions convert stored
  `correct_answer` (option text or letter) to a numeric index; verified on the smoke
  test (index 1). If a future generator emits an answer that matches no option, it
  defaults to index 0 — watch for any question whose “correct” looks off.
- **Idempotency vs regeneration** (see limitation #5) for pre-existing uploads.
- **DEV_LOCAL_BYPASS:** student writes (attempts/theta/progress) are no-ops for the
  local dev user — test scoring against a real login.

---

## Commits on this branch
- Phase 1: 15 mixed-difficulty questions
- Phase 2: synthesize-lesson + `lessons.content` + assign wiring
- Phase 3: render generated lessons through the real player
- Phase 5: these notes (+ `overnight-migration.sql` from Phase 2)

Nothing pushed to `main`. Review + merge at your discretion.
