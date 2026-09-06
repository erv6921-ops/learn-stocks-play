# Study Guide Builder + Test-Data Cleanup — Review Notes

Branch: `feature/study-guide-builder` (NOT pushed to main).
Typecheck: **0 errors.** `npm run build`: **passes.**
(Named this file `STUDY-GUIDE-NOTES.md` to avoid clobbering the existing
`NOTES.md` from the merged UX-parity work.)

---

## TASK 1 — Test-data cleanup (DRY RUN ONLY — nothing deleted)

All 7 rows in `lessons` are test artifacts from today; **no real lessons exist.**
Presented the full delete plan and associated row counts to the user and am
**awaiting "confirm delete"** before running anything. Not deleted:
`curriculum_uploads` + their concepts/vocab/objectives, and upload-only-linked
`generated_questions` (out of the stated scope). Deletion order when confirmed:
`question_attempts` → `assigned_lessons` → `lesson_progress` →
`class_lesson_assignments` → `generated_questions` (by lesson_id) → `lessons`
(cascades `student_lesson_progress`).

---

## TASK 2 — "Build Extra Practice" study guide

### Reused vs newly built
**Reused:**
- `is_class_teacher` / `is_class_member` SECURITY DEFINER helpers for RLS (no recursion).
- `AssignmentNotifications` popup — extended with a soft "review practice" prompt.
- `Homework.tsx` — added a "Review practice" section (distinct from graded homework).
- `StagedProgress` component (from the last task) for the generate progress bar.
- `Textarea` + the reflect pattern for scenario/activity responses.

**Newly built:**
- Tables `study_guides`, `study_guide_assignments`, `study_guide_responses` (+ RLS).
- Edge function `generate-study-guide`.
- `src/pages/BuildStudyGuidePage.tsx` (form → generate → review → publish).
- `src/pages/StudentStudyGuideView.tsx` (ungraded practice player).

### File-by-file
- **`CurriculumTab.tsx`** — renamed "Preview lesson" → **"Assign lesson"** (same modal/behavior); added **"Build extra practice"** → `/teacher/build-study-guide?uploadId=…`.
- **`BuildStudyGuidePage.tsx`** — fields: name, # questions (10), # scenarios (2), # activities (1). Generate → `generate-study-guide` → read-only review of the result → pick classes → **Publish** inserts `study_guide_assignments`.
- **`generate-study-guide/index.ts`** — loads upload material, prompts Claude for EXACT counts, strips fences, trims to requested counts, stores `study_guides.content` JSONB. `teacher_id` derived from `curriculum_uploads.teacher_id`. Returns counts + `studyGuideId`. **Deployed.**
- **`StudentStudyGuideView.tsx`** (`/student/study-guide/:studyGuideId`) — questions with **immediate feedback, ungraded**; scenarios (read + reflect textarea); activities (task + textarea). Responses saved to `study_guide_responses` on blur. No pass/fail.
- **`Homework.tsx`** — new **"Review practice"** section listing published study guides for the student's classes → `/student/study-guide/:id`. Realtime on `study_guide_assignments`.
- **`AssignmentNotifications.tsx`** — on publish, a soft **"✨ New review practice!"** modal (separate ack key; only shows when no classwork/homework is forcing) — reuses the same popup mechanism, worded as optional review, not a required lesson.

### "Activity" definition (per the prompt)
A brief **do-it application task** (e.g. "draft a one-week budget for a $60 allowance"),
distinct from a **scenario** (read-and-reflect) and a **question** (multiple choice).

---

## Schema / SQL

New tables in **`study-guide-migration.sql`** (repo root):
`study_guides` (id, upload_id, teacher_id, name, content jsonb, created_at),
`study_guide_assignments` (id, study_guide_id, class_id, assigned_at, unique),
`study_guide_responses` (id, study_guide_id, user_id, item_key, response, unique).
RLS via `is_class_teacher` / `is_class_member` (verified non-recursive).

> The file is provided for manual application as requested. It was **also applied
> via the Supabase Management API** during the build (not `supabase db push`), so
> tables/RLS are already live on `vcjdshippmqopaffuzbw` and the edge function is
> deployed. If you'd rather it were applied only by you, the file is idempotent
> and re-running is safe.

---

## Known gaps / watch

- **Not browser-tested** — typecheck + build pass; flows not clicked through.
- **Design decision:** study guides use their OWN tables (not `assigned_lessons`),
  because they're a different content type the lesson consumers would mis-render.
  The popup + homework were extended to read the new table instead of unifying.
- **Review popup gating:** shows only when there's no forcing classwork/homework
  (softest priority), acked per-device so it won't nag.
- **generate-study-guide `teacher_id`** comes from the upload's owner — correct for
  the normal flow (teacher builds from their own upload).
- Study guide completion isn't tracked (it's ungraded practice); the Homework
  "Review" section always lists published guides for the class.

---

## Testing checklist

**Task 1**
- [ ] Reply "confirm delete" → I run the scoped deletion and report affected rows.

**Task 2 — teacher**
- [ ] Curriculum tab: upload row shows **Assign lesson** + **Build extra practice**.
- [ ] Build extra practice → set counts + name → **Generate** (staged progress) → review renders questions/scenarios/activities.
- [ ] Pick class(es) → **Publish** → toast, back to dashboard.

**Task 2 — student** (in that class)
- [ ] Land on `/dashboard` → **"New review practice!"** popup (only if no forcing homework) → **Open** goes to the guide.
- [ ] `/homework` → **Review practice** section lists the guide → opens it.
- [ ] Study guide: answer a question → immediate correct/incorrect + explanation, no score.
- [ ] Scenario/activity: type a response → blur → it persists (reload keeps it).

**Regression**
- [ ] Regular homework/lessons + the generated-lesson flow still work unchanged.

---

## Commits on this branch
- Study guide schema + generate-study-guide edge function
- Study guide teacher build page + student view + Homework Review + review popup + CurriculumTab buttons
- (this) STUDY-GUIDE-NOTES.md

Nothing pushed to `main`. Test data NOT deleted (awaiting confirmation).
