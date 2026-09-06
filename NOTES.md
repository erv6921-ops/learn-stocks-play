# Generated-Lesson UX Parity — Review Notes

Branch: `fixes/generated-lesson-ux-parity` (NOT pushed to main).
Typecheck: **0 errors.** `npm run build`: **passes.**

Four issues, all addressed. The headline of the investigation: the app has **two
parallel assignment systems**, and the fix is mostly *wiring generated lessons
into the existing one* rather than building anything new.

---

## Investigation findings (read this first)

| System | Assignment table | Progress table | Title source | Route |
|---|---|---|---|---|
| **Regular lessons** | `assigned_lessons` (text `lesson_id`, has `due_date`) | `lesson_progress` (`completed`, `progress_percent`) | static `lessons` registry | `/lessons/:id` |
| **Generated lessons (before)** | `class_lesson_assignments` | `student_lesson_progress` | DB `lessons` row | `/student/lesson/:id` |

The regular teacher per-student view, the **Homework tab** (`Homework.tsx`), and the
**new-assignment popup** (`AssignmentNotifications.tsx`) all read `assigned_lessons`
+ `lesson_progress`. Generated lessons were invisible to all three because they
only wrote the `class_lesson_*` tables.

**Reuse decision:** *dual-write* generated lessons into `assigned_lessons` (+
`lesson_progress` on completion) so they flow through the regular plumbing, while
**keeping** `class_lesson_assignments` (the student content/question read-RLS is
built on it — see the recursion fix from the prior task). A small resolver
(`src/lib/generatedLessons.ts`) teaches the three regular consumers to show
generated (UUID) lesson names and route to `/student/lesson/:id`.

---

## Reused vs newly built

**Reused (extended, not replaced):**
- `assigned_lessons` — generated lessons now write here (same shape/policies as regular).
- `lesson_progress` — completion written here on finish (same table regular lessons use).
- `AssignmentNotifications` popup — now shows generated lessons (name + route resolved).
- `Homework.tsx` — now lists generated lessons (name + route + due date resolved).
- `TeacherDashboard` per-student/per-class views — now show generated lessons with real names.
- `assigned_lessons.due_date` — Issue 4's due date; **already existed**, no new column.

**Newly built (small):**
- `src/lib/generatedLessons.ts` — `isGeneratedLessonId`, `lessonRoute`, `fetchGeneratedLessonNames`.
- `src/components/StagedProgress.tsx` — reusable staged progress bar (Issue 1).

---

## Issue 1 — Progress bars

**Chose approach (b): staged status text + time-based bar.** Rationale: both
`generate-questions` and `synthesize-lesson` are each a **single Claude call** —
there is no natural per-item checkpoint to report, and restructuring them into
per-item loops that write `curriculum_uploads.generation_progress` just to fake
granularity would be worse code for cosmetic gain. `StagedProgress` eases to ~95%
over an estimated duration and advances staged labels; the caller flips it to 100%
when the call returns.
- `PreviewLessonModal` (generation): "Analyzing concepts… → Writing questions… → Balancing difficulty… → Almost done…"
- `AssignLessonPage` (synthesis): "Reading your material… → Writing Jeff's teaching… → Adding checks & scenario… → Building the mastery check… → Finalizing lesson…"

## Issue 2 — Assignment parity

- `AssignLessonPage` now **also** inserts `assigned_lessons` rows
  (`assignment_type: "homework"`, `assigned_by`, optional `due_date`) alongside the
  existing `class_lesson_assignments` insert.
- On completion, `StudentLessonView` **also** upserts `lesson_progress`
  (`completed: true`, `progress_percent: 100`, `quiz_score`).
- `Homework.tsx`, `AssignmentNotifications.tsx`, and `TeacherDashboard.tsx` resolve
  generated (UUID) lesson_ids → DB name and route to `/student/lesson/:id`.
- Net effect: assigning a generated lesson now triggers the **same** new-assignment
  popup, shows under each student in the teacher dashboard, and appears in Homework —
  reusing the existing components.

## Issue 3 — Teaching density

- `synthesize-lesson` system prompt: teaching sections now **≤ 2 short paragraphs**;
  "if there's more, split into additional shorter slides, never a wall of text."
  Segments allowed up to 6 (was 4); each renders as its own tap-through concept slide.
- **Redeployed.** (Existing dense rows from prior testing are not backfilled — only new lessons.)

## Issue 4 — Homework + due date

- Optional **due date picker** on `AssignLessonPage` → `assigned_lessons.due_date`.
- **No schema change** — `assigned_lessons.due_date` already exists.
- A student who exits before finishing: the lesson is in `assigned_lessons` and not
  yet `completed` in `lesson_progress`, so Homework lists it automatically (reusing
  the existing incomplete-detection). Due date renders in the Homework entry (existing `fmtDue`).

---

## Schema changes / SQL

**None required.** Everything reuses existing tables/columns
(`assigned_lessons.due_date`, `lesson_progress.completed/progress_percent`, both
with the right unique constraints and RLS). **No `supabase db push`, no SQL to run.**

Edge function redeployed: `synthesize-lesson` (Issue 3 prompt). No other function changes.

---

## Known risks / gaps (please review)

1. **Dual-write, not full consolidation.** Generated lessons now live in BOTH
   `assigned_lessons` (for regular-system visibility) AND `class_lesson_assignments`
   (for content/question read-RLS + the student dashboard `StudentLessonsSection`).
   This is deliberate (avoids a risky RLS rewrite) but means two rows per assignment.
   A future cleanup could migrate the read-RLS onto `assigned_lessons` (via the
   `is_class_member` SECURITY DEFINER helper) and drop `class_lesson_assignments`.
2. **Legacy lessons assigned before this change** (the ~5 test rows) are NOT in
   `assigned_lessons`, so they won't appear in Homework/popup/teacher-view. Only
   lessons assigned from now on will. (Re-assign them if you want them to show.)
3. **Mid-lesson progress %** isn't written (only completion). Homework still shows
   them as incomplete-until-done, which is correct; but the teacher dashboard
   progress bar will read 0% until completion for generated lessons.
4. **Teacher-view title resolution** covers the signed-in teacher's own generated
   lessons (loaded by `teacher_id`) — correct for the teacher dashboard use case.
5. **Not browser-tested.** Typecheck + build pass; I did not click through the flows.
6. `assignment_type` is set to `"homework"` for all generated lessons so they surface
   in the Homework tab + popup even without a due date. If you'd rather undated
   generated lessons behave as "classwork," change that one field in AssignLessonPage.

---

## Testing checklist

**Issue 1 — progress bars**
- [ ] Teacher: open a curriculum upload → **Preview lesson** → see the staged bar
      ("Analyzing concepts…" → …) while questions generate.
- [ ] Teacher: **Assign to class** → see the staged synthesis bar
      ("Reading your material…" → … → "Finalizing lesson…") while the lesson builds.

**Issue 2 — assignment parity**
- [ ] Teacher assigns a generated lesson to a class.
- [ ] Student in that class lands on `/dashboard` → **new-assignment popup** appears
      with the lesson's real name; "Do now" opens `/student/lesson/:id`.
- [ ] Teacher dashboard: the lesson shows under each student (real name), like a regular assignment.

**Issue 3 — density**
- [ ] Assign a fresh lesson; open it as a student → Jeff's teaching slides are short
      (≤2 short paragraphs each), more slides instead of walls of text.

**Issue 4 — homework + due date**
- [ ] Teacher assigns with a **due date** set.
- [ ] Student **starts then exits** the lesson before finishing → it appears in the
      **Homework** tab with "Due: <date>".
- [ ] Student completes it → it leaves the Homework "to-do" (marked done via `lesson_progress`).
- [ ] Assign another with **no** due date → still appears in Homework (undated).

**Regression (regular lessons untouched)**
- [ ] A hand-built lesson still assigns, pops, appears in Homework, and routes to `/lessons/:id` as before.

---

## Commits on this branch
- Issue 3: cap teaching sections at 2 paragraphs / up to 6 slides
- Issue 1: staged progress bars (generation + synthesis)
- Issues 2 & 4: assignment parity (assigned_lessons/lesson_progress) + due date + homework
- (this) NOTES.md

Nothing pushed to `main`.
