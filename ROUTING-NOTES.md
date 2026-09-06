# Lesson Routing — Missions vs Homework — Review Notes

Branch: `feature/study-guide-builder` (continued; **note: this branch was already
merged to main last turn**, so these commits sit on top of main until merged again).
Typecheck: **0 errors.** `npm run build`: **passes.** Not pushed to main.

---

## How Missions actually works (investigation)

- **Missions is 100% static.** `src/data/lessons.ts` exports `unitInfo: UnitInfo[]`
  and `lessons: Lesson[]` (plain arrays). Unit membership is `lessons.filter(l =>
  l.unitId === unitId)` (`getLessonsByUnit`). Units have ids like `unit-2`, an
  `orderIndex`, categories, and a `track`.
- **The Missions view is rendered from those static arrays by four pages** —
  `Lessons.tsx`, `MissionsPreview.tsx`, `Dashboard.tsx`, `Progress.tsx`.
- **`Lessons.tsx` (1418 lines) runs an adaptive/prerequisite engine** over the
  static data: `unlockedUnits` (unlocks a unit when ≥60% of the prior unit is
  done), `adaptiveCurriculum`, `isLessonUnlocked`, and renders each unit as a
  "coaster" of stations that route to **`/lessons/:id`**.
- **The `/lessons/:id` player (`LessonDetail`) resolves lessons via
  `lessons.find(l => l.id === id)` — static only.** Generated (DB) lessons play
  through a *separate* route, `/student/lesson/:id` (`StudentLessonView`).

**Conclusion / surfaced tradeoff:** inserting a dynamic DB lesson into the
*gated, sequential* Missions coaster — across all four renderers, with unlock
logic and the right player route — is a **large, high-risk change**. I did **not**
do that. Instead I made the teacher's routing decision real and surfaced Missions
lessons in a **safe, isolated** way (below), and I'm documenting the remaining
work rather than papering over it.

---

## Decision: how units / placement are represented

- **No new `units` table.** Missions units are the existing **static `unitInfo`**
  entries. The teacher picks one from that list. This is the lowest-risk option and
  needs **no new RLS** (a units table would have).
- **Placement recorded as columns on the existing `lessons` table**
  (`routing-migration.sql`):
  - `placement TEXT DEFAULT 'homework'` — `'homework'` | `'missions'`
  - `mission_unit_id TEXT` — a static unitInfo id (e.g. `unit-2`), null for homework
  - `mission_sort INT` — optional ordering hint
  - No new RLS policy: these are columns on `lessons`, which already has teacher +
    student SELECT policies.

---

## Reused vs newly built

**Reused:**
- Existing static `unitInfo` for the unit picker (no new units concept).
- Existing `class_lesson_assignments` + the student SELECT RLS on `lessons` for
  class-scoped access to Missions lessons.
- The existing generated-lesson player (`/student/lesson/:id`).
- The Homework path is byte-for-byte the prior flow (assigned_lessons + due date).

**Newly built:**
- `lessons.placement` / `mission_unit_id` / `mission_sort` columns.
- `src/components/lessons/TeacherMissionsStrip.tsx` — isolated student surfacing.
- The routing chooser + unit picker in `AssignLessonPage`, and the CurriculumTab badges.

---

## What changed (file by file)

- **`AssignLessonPage.tsx`** — new **"Where should this lesson go?"** step:
  - **Homework** → existing behavior unchanged (writes `class_lesson_assignments`
    **and** `assigned_lessons`, optional **due date**, links questions).
  - **Missions** → unit picker (from static `unitInfo`); sets
    `lessons.placement='missions'` + `mission_unit_id`; writes
    `class_lesson_assignments` (for class-scoped read access) but **NOT
    `assigned_lessons`** (mutually exclusive — no homework, **no due date**).
- **`components/lessons/TeacherMissionsStrip.tsx`** (new) — a small **"From your
  teacher · this unit"** card. Loads its own RLS-scoped data
  (`placement='missions'` + `mission_unit_id` = active unit), routes to
  `/student/lesson/:id`. **Does not touch** the coaster/unlock/adaptive engine.
- **`Lessons.tsx`** — mounts `<TeacherMissionsStrip unitId={activeUnitId} />` once
  at the top of the main Missions view (one isolated line; no engine changes).
- **`CurriculumTab.tsx`** — per-upload badges: **"In Missions"** / **"In Homework"**
  so the teacher can see where each upload's lessons ended up.

---

## Known limitations (please read)

1. **Missions lessons are NOT inserted into the gated coaster sequence.** They
   appear as an **isolated "From your teacher" strip** above the coaster on the
   main Missions page (`Lessons.tsx`) for the active unit — not as a numbered
   station in sequence, not subject to unlock gating, and **not shown in the other
   three Missions renderers** (`MissionsPreview`, `Dashboard` mission preview,
   `Progress`). Full in-sequence insertion is the deferred large change.
2. **`mission_sort` is stored but there's no reordering UI** — the strip orders by
   it (default null → insertion order).
3. Missions lessons still also appear in the **dashboard "Lessons" section**
   (`StudentLessonsSection`, which lists all generated lessons via
   `class_lesson_assignments`). That's an existing surface, not homework — but if
   you want Missions lessons to appear *only* in the Missions strip, that section
   would need a `placement` filter (easy follow-up).
4. **Not browser-tested** — typecheck + build pass; flows not clicked through.
5. **Existing lessons** default to `placement='homework'` (correct — they were
   assigned as homework before this change).

---

## Schema / SQL

`routing-migration.sql` (repo root) — 3 idempotent `ADD COLUMN IF NOT EXISTS` on
`lessons`. **Also applied via the Management API** during the build (not
`supabase db push`), so columns are live on `vcjdshippmqopaffuzbw`. No new tables,
no new RLS.

---

## Testing checklist

**Assign → Homework (regression, unchanged)**
- [ ] Assign lesson → choose **Homework** → set a due date → pick class → Assign.
- [ ] Student: new-assignment popup + Homework tab entry with the due date; opens `/student/lesson/:id`.
- [ ] CurriculumTab shows **In Homework** on that upload.

**Assign → Missions (new)**
- [ ] Assign lesson → choose **Missions** → due-date field is hidden, **unit picker** appears.
- [ ] Try to Assign without a unit → blocked with a toast.
- [ ] Pick a unit + class → Assign → toast says "added to Missions (unit)".
- [ ] Student on the **Missions** page, that unit active → sees the **"From your teacher · this unit"** card → opens the lesson at `/student/lesson/:id` and can complete it (mastery/theta flow intact).
- [ ] The lesson does **NOT** appear in the Homework tab or the new-assignment popup.
- [ ] CurriculumTab shows **In Missions** on that upload.

**Mutual exclusivity**
- [ ] A Missions-placed lesson has no `assigned_lessons` row (verify in SQL) and no due date.

---

## Commits on this branch (this task)
- Lesson routing: placement columns (migration) + Missions/Homework chooser + unit picker
- Missions student surfacing (isolated TeacherMissionsStrip) + CurriculumTab badges
- ROUTING-NOTES.md

Nothing pushed to `main`.
