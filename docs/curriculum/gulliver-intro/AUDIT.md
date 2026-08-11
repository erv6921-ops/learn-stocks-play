# Gulliver Introduction to Business — Integration Audit

Reuse-and-gap audit for adding a third onboarding track, "Gulliver Introduction
to Business," alongside the Regular Course and Gulliver Biz Lab. No
implementation here — this is the map of what exists, what's missing, and the
order to build in.

Plan under audit: `docs/curriculum/gulliver-intro/Gulliver.md` (referred to as
"the plan" below).

---

## 0. Grade level — is it captured, and should the selector ask for grade?

**Captured today:** yes, but weakly.
- `profiles.grade` — nullable int, DB CHECK constraint permits **7–12 or NULL**
  (`src/pages/Onboarding.tsx:117-127`, `gradeForDb`). Collected on the student
  "A bit about you" step (`Onboarding.tsx:993-1013`) via a Grade `Select` whose
  options include 6th grade and "Adult", both coerced to NULL before the DB
  write.
- Surfaced to the local user object as `user.grade` (`AppContext.tsx:252, 377`;
  defaults to `9`).
- Shown on the teacher roster as `Grade {n}` (`TeacherDashboard.tsx:1023`).

**But grade does nothing today.** It is never read to pick a track, gate
content, or scope anything — it is display/metadata only. The Biz Lab vs.
Regular choice is made by course *name* on the `program-select` step
(`Onboarding.tsx:1133-1202`), entirely independent of the grade field.

**Recommendation.** Keep the selector asking by **course/program name**, not by
grade. Reasons:
- Grade and track are not 1:1 in the general population — the app also serves
  non-Gulliver students at every grade 6–12, so "9th grade ⇒ Gulliver Intro"
  is false for most users.
- Biz Lab (8th) and Gulliver Intro (9th) differ by grade *within Gulliver*, but
  the app can't tell a Gulliver student from anyone else without a class-code /
  school signal (see §1, "primary track"). Grade alone can't route them.
- The existing grade field is nullable and frequently skipped, so it's an
  unreliable routing key.

If we want grade to *inform* the default (e.g. pre-highlight Biz Lab for an 8th
grader who joined a Gulliver class), do it as a soft default on top of an
explicit name-based selector, not as the selector itself. Worth capturing grade
more reliably regardless, since the plan's two-chapter/6-block content is
grade-anchored.

---

## 1. Track plumbing

### Where the selector lives
`src/pages/Onboarding.tsx`, the `program-select` step (`1133-1202`). It renders
exactly **two** buttons — "Standard InvestiPlay" (`1153-1174`) and "Gulliver Biz
Lab" (`1175-1197`). Each button does three things:
1. sets local `bizLab` boolean state (`setBizLab(false/true)`),
2. writes `localStorage.investiplay_active_track` (`"florida"` /
   `"gulliver-biz-lab"`, lines `1157`, `1179`),
3. writes `localStorage.investiplay_biz_lab_pending` (`"0"`/`"1"`, lines `1160`,
   `1180`) — the flag that survives the email-confirmation round-trip.

Adding a third option touches this step **plus every place the track identity is
a boolean** (see next). The current model is the core problem: track identity is
stored as a **boolean** `biz_lab_enrolled`, which cannot express three states.

### How track identity is stored
- **Persisted (source of truth):** `profiles.biz_lab_enrolled` — a **boolean**
  in Supabase (`types.ts:855, 879, 903`; profiles Row has it).
- **Mirrored to client:** `user.bizLabEnrolled` (`types/index.ts:27`), hydrated
  in `AppContext.tsx:258` and `:383` via `applyPendingBizLab`.
- **Pending flag (pre-session):** `localStorage.investiplay_biz_lab_pending`,
  flushed to the profile on first authenticated hydrate by `applyPendingBizLab`
  (`AppContext.tsx:68-80`).
- **Client-only view state:** `localStorage.investiplay_active_track` typed as
  `CourseTrack = "florida" | "ap-micro" | "gulliver-biz-lab"`
  (`types/index.ts:108`). This is **only** "which tab is showing in the Missions
  page" (`Lessons.tsx:92-97`). It is *not* persisted server-side and is not the
  identity of record — `bizLabEnrolled` is.

So there are effectively two representations: a **persisted boolean**
(enrolled-in-Biz-Lab-or-not) and a **transient client enum** (which lessons tab
is open). A third track needs the persisted side to become an enum too.

### Every place track identity is read
| Concern | File:line | Notes |
|---|---|---|
| Hydrate → `user.bizLabEnrolled` | `AppContext.tsx:258`, `:383` | reads `biz_lab_enrolled` |
| Pending flush | `AppContext.tsx:68-80` (`applyPendingBizLab`) | localStorage → profile |
| Onboarding writes | `Onboarding.tsx:458, 486, 506, 526` (`biz_lab_enrolled`/`bizLabEnrolled`) | 4 write sites |
| Onboarding selector | `Onboarding.tsx:1133-1202`, `1157`, `1179` | the 2-option screen |
| Track tab state | `Lessons.tsx:92-97` | `active_track` localStorage |
| Force-off stale tracks | `Lessons.tsx:101-105` | Biz Lab never sees `ap-micro`; non-Biz-Lab never sees `gulliver-biz-lab` |
| **AP tab visibility** | `Lessons.tsx:110` (`effectiveApMode = apMode && !bizLabEnrolled`) | AP hidden for Biz Lab |
| Track tab list | `Lessons.tsx:433-443, 543-556` | which tabs render |
| Content selection | `Lessons.tsx:111-113` (`trackUnits` filter on `u.track`) + `591` (`GulliverBizLab` vs AP vs coaster) | picks unit set / renderer |
| Unit → track mapping | `data/lessons.ts:539-543` (`getUnitsByTrack`, `getUnitTrack`), `apMicro.ts:334-350` | content is tagged `track` |

**Routing:** no track-based routing exists. Post-login routing keys off
`role` and `onboarding_complete` only (`AppContext.tsx:409-417`). The Biz Lab
lives *inside* the Missions page as a tab, not on its own route.

**Progress / leaderboard / mastery:** **none are track-scoped.** `lesson_progress`,
`mastery_scores`, `question_attempts`, and the class/national leaderboards
(`get_class_leaderboard`, `Challenges.tsx:80`) are all keyed by `user_id`
(and class), never by track. This is good news for reuse and bad news for
"a Gulliver Intro class leaderboard" — that would need class scoping, which
already exists, rather than track scoping, which doesn't.

**Nav tabs (`GameNav.tsx:67-76`):** a single flat list; no track gating. The
only track-driven hiding today is the *AP sub-tabs inside Lessons*, not sidebar
nav.

### What "primary track" means mechanically
There is **no first-class notion of a default track** today. The closest
mechanisms:
1. **Selector default/order** — `program-select` has no pre-selected option;
   "primary" would mean listing Gulliver Intro **first** and pre-highlighting
   it. Cheapest interpretation.
2. **`active_track` default** — `Lessons.tsx:93` hard-defaults to `"florida"`.
   "Primary" could mean defaulting a Gulliver Intro student's Missions tab to
   the intro track.
3. **Auto-detection of "a Gulliver student"** — the app has **no signal** for
   this today. Identity is manual selection only. To make the intro track the
   *automatic* default for Gulliver students you'd need a class-code→track
   mapping (a Gulliver class join code implies the track) or school detection
   (`profiles.school_name`, free text, unreliable). **Open question for the
   plan owner:** how is "a Gulliver student" identified? Recommend a
   per-class track attribute on `classes` (e.g. `classes.track`) so joining a
   Gulliver Intro class sets the emphasis, rather than inferring from grade or
   free-text school name.

**Central plumbing takeaway:** replace the boolean `biz_lab_enrolled` with a
single enum column (e.g. `profiles.track text` with values
`regular | biz_lab | gulliver_intro`, defaulting to `regular`), migrate the
existing boolean into it, and collapse the two representations. Every read in
the table above then switches from `bizLabEnrolled` to `track === ...`. This is
the one change the rest of the work depends on.

---

## 2. Student-side reuse (per plan touchpoint)

| Touchpoint | Status | What exists / what's new |
|---|---|---|
| **Pre-class primer** (homework, 5 min) | **Partial** | Lesson infrastructure covers delivery — `LessonDetail.tsx` + structured content + Jeff chat. There's no distinct "primer" object; a primer = a short assigned lesson. Reuse `assigned_lessons` for push + `lesson_progress` for completion. *Net-new:* the primer content itself (goods/services sort, factor examples) and a "primer" content shape if we want it lighter than a full lesson. |
| **Warm-up scenario** (0–5 min, projected) | **Covered (mechanics), net-new (content)** | `DailyScenario` component (`src/components/games/DailyScenario.tsx`) + `data/scenarioData.ts` already render a single multiple-choice scenario with coin reward and correct/incorrect states; `Daily.tsx` hosts it and the leaderboard is projectable via `get_class_leaderboard`. *Partial gap:* it's the one global daily scenario, not a per-block business scenario the teacher can pin. *Net-new:* business-specific scenarios + optional per-block selection. |
| **Mid-lecture checkpoint** (live class distribution) | **NET-NEW** (the load-bearing piece) | The *answering* primitive exists: `MasteryCheckRenderer` (`SectionRenderer.tsx:484+`) logs each answer to `question_attempts` (`:545-556`) with `topic_id`/`lesson_id`. But there is **no live, class-level distribution view** — nothing aggregates classmates' answers, nothing is realtime, and there's no "checkpoint session" the teacher opens/closes. This is the single biggest build and the plan's stated differentiator. |
| **Exit ticket** (2 Q, feeds mastery) | **Partial** | Reuses `MasteryCheckRenderer` + the `mastery-score` edge function (`supabase/functions/mastery-score/index.ts`), which already turns a completed check into a `confidence_tier` per `topic_id`. An exit ticket is a 2-question mastery check. *Net-new:* packaging it as a distinct block-scoped ticket and ensuring its attempts are attributable to the block/concept, not just the coarse `LessonCategory` topic. |
| **Post-class practice** (homework, adaptive) | **Covered** | `getAdaptiveCurriculum` (`curriculumEngine.ts`, used `Lessons.tsx:124`) + tiered quiz pools (`getQuizForLessonByTier`, `data/quizzes/*`) + `lesson_progress` persistence already deliver adaptive practice. Reuse directly; only new content (the block's terms) is required. |
| **Weekly challenge** | **Partial** | Class Challenges exist end-to-end: `Challenges.tsx`, `lib/challenges.ts`, `class_challenges`/`challenge_entries` tables (`migrations/20260621000000_class_challenges.sql`). *Gap:* metrics are generic — `lessons_completed | xp_earned | streak_days | quiz_score_avg` (`challenges.ts:15`) computed over a date window (`computeMyScore`, `:45-69`). There is **no way to scope a challenge to a chapter/block/concept** (answering the plan's "Can a teacher scope a Class Challenge to a chapter?" — **no**). Adding a chapter/block-scoped metric is a contained extension of `computeMyScore` + the `metric` CHECK constraint. |

---

## 3. Teacher-side gap

### What shows class-level data today
`src/pages/TeacherDashboard.tsx` — and it is **entirely completion-based**, built
from `lesson_progress.completed` booleans:
- KPI row: classes, students, avg completion, assignment count (`:606-611`).
- **Class completion donut** (`:898-939`).
- **Per-student progress bars** (`:942-959`).
- **Lesson completion across the class** stacked bars (`:962-984`).
- Roster with per-student assigned/completed lessons (`:989-1125`).
- Data path: `loadClassMembers` joins `class_members` → `profiles` +
  `lesson_progress(completed)` (`:272-322`); teacher read is authorized by the
  `is_teacher_of_student` RLS policy on `lesson_progress`
  (`migrations/20260610000000_classwide_assignments.sql`).

### What's missing
| Requirement (plan §Teacher, ranked) | Status | Gap |
|---|---|---|
| **1. Per-concept mastery distribution** | **NET-NEW** | Dashboard has *completion*, never *mastery*. No teacher-side read of `mastery_scores`/`question_attempts` exists (no RLS policy, no RPC, no UI). And "concept" is finer than today's `topic_id` (= `LessonCategory`); the plan's Block 1 alone has nine terms mapping to one topic. Needs both a class-scoped mastery read (§4) and a finer concept dimension. |
| **2. Live checkpoint results** | **NET-NEW** | No realtime, no checkpoint-session object, no in-lesson teacher view. Highest-effort item. Would need a `checkpoint` (or reuse `assigned_lessons`-style) session row + Supabase realtime subscription on `question_attempts` (or a dedicated `checkpoint_responses` table) scoped to the open checkpoint. |
| **3. Assign by block** | **Partial** | Assignment exists but is **per-lesson** (`assignLessonToClass`, `TeacherDashboard.tsx:178-212`; `assigned_lessons` is one row per `(class_id, lesson_id)`). A "block" is a group of lessons/primer/practice. *Small net-new:* a block→lesson-ids grouping and a "assign block" button that inserts the group. No schema change strictly required if a block is just a named lesson set. |
| **4. Completion at a glance** | **Covered** | The donut + per-student bars already answer "who did the homework." |

---

## 4. Data model

### Can `mastery_scores` / `question_attempts` support a class-level rollup as-is?
**Partially — the join is possible, but three things are missing.**

`mastery_scores` (`types.ts:699-728`): `user_id, topic_id, mcs_score,
confidence_tier, contributing_signals, computed_at`. It is **append-only** (the
edge function `insert`s a new row per session — `mastery-score/index.ts:349`;
"latest" is `order computed_at desc limit 1`, as `LessonDetail.tsx:70-81` reads
it). `question_attempts` (`types.ts:959+`): `user_id, question_id, topic_id,
lesson_id, is_correct, response_time_ms, attempt_session_id,
session_attempt_number, source`.

What a class rollup needs and what's absent:
1. **No `class_id` on either table.** Rollup must go through `class_members`
   (`class_id, user_id`) → the mastery/attempts rows by `user_id`. Doable in one
   SECURITY DEFINER RPC modeled on `get_class_leaderboard`
   (`migrations/20260611000000_class_leaderboard_rpc.sql`) — no column add
   strictly required if we join via membership.
2. **No teacher/peer read authorization.** `mastery_scores` has *no* student
   insert policy by design (service-role writes only) and, per the repo, **no
   teacher SELECT policy** — there is no migration creating these tables or their
   RLS at all (they were provisioned outside the tracked migrations; grep finds
   zero `create table mastery_scores`/`question_attempts`). A rollup must ship a
   SECURITY DEFINER RPC (bypasses RLS, gated to `is_class_teacher`) or add a
   teacher SELECT policy. **This is the actual blocker, not the join.**
3. **Concept granularity.** `mastery_scores.topic_id` = `lesson.category`
   (`SectionRenderer.tsx:271, 378`; `LessonDetail.tsx:74`) — a coarse
   `LessonCategory`, not the per-term "concept" the plan wants distributions
   over. Per-concept requires either (a) finer `topic_id`s for the intro course,
   or (b) computing distributions from `question_attempts` grouped by
   `question_id`/a new concept tag. `question_attempts` has no concept column,
   so (b) still needs a concept→question mapping.

**Verdict:** a **topic-level** class rollup is buildable now with just an RPC
(no schema change). A **per-concept** rollup — what the plan asks for — needs a
concept dimension added on top.

### Missing columns / tables (net)
- Teacher-readable path into `mastery_scores` / `question_attempts` (RPC or RLS).
- A **concept** dimension (column on attempts, or a concept↔question/topic map).
- A **checkpoint session** table (+ optional `checkpoint_responses`) for live
  results (§3.2).
- A **block** grouping (data-level list is enough; no table strictly needed).
- The **track enum** on `profiles` (§1), replacing the boolean.
- Optional: a **track attribute on `classes`** to identify Gulliver classes (§1).

### How students are associated with a class today
Fully in place: `class_members (class_id, user_id)` ↔ `classes (id, teacher_id,
join_code)`. Students join by entering a join code in onboarding
(`Onboarding.tsx:355-377`, via `lookup_class_by_join_code` +
`class_members` insert) or later from the Leaderboard. Authorization helpers
already exist: `is_class_member`, `is_class_teacher`
(`migrations/20260202172555_*.sql:70,86`) and `is_teacher_of_student`
(`migrations/20260610000000_*.sql`). This is a solid foundation — every new
class-scoped feature should route through these.

---

## 5. Build order (cheapest → highest impact)

1. **Track enum migration + selector third option.** *(S)* Add
   `profiles.track` enum (migrate `biz_lab_enrolled` into it), add the third
   `program-select` button, swap the ~10 `bizLabEnrolled` reads (table in §1) to
   `track ===`. Make Gulliver Intro the primary by ordering it first +
   pre-highlight, and defaulting `active_track` for those students. Unblocks
   everything else. *Risk:* touch-many-files but mechanical.
2. **Intro-course content + tagged units.** *(M)* Author the 6 blocks as units
   tagged `track: "gulliver_intro"` (reuses `getUnitsByTrack`,
   `Lessons.tsx:111-113`), plus primers, exit tickets (2-Q mastery checks),
   adaptive practice pools, and warm-up business scenarios. Pure content on
   existing rails.
3. **Assign-by-block.** *(S)* Define block→lesson-id groups; add an "assign
   block" action that inserts the group into `assigned_lessons`. No schema
   change. Table-stakes per the plan.
4. **Chapter/block-scoped weekly challenge.** *(S–M)* Extend the `metric` CHECK
   + `computeMyScore` (`challenges.ts:45`) to score only lessons within a
   chapter/block window. Contained.
5. **Class mastery view (topic-level first).** *(M)* SECURITY DEFINER RPC
   (`get_class_mastery(_class_id)`) joining `class_members` → latest
   `mastery_scores` per `(user, topic)`, gated to `is_class_teacher`; render a
   distribution + weakest-3 panel on the teacher dashboard. **This is "the
   product" per the plan** — highest value per unit effort once #1 lands.
6. **Per-concept granularity.** *(M)* Add the concept dimension (finer topic ids
   for the intro course, or a concept tag on questions) so #5 shows per-term
   distributions instead of per-category. Upgrades #5 from useful to
   plan-accurate.
7. **Live checkpoint results.** *(L)* Checkpoint-session table + realtime
   subscription + in-lesson teacher distribution view. Highest impact *and*
   highest cost; the plan's #2 requirement and the thing "he cannot do today."
   Do last, on top of the mastery plumbing from #5/#6.

Sizes: S ≈ ≤1 day, M ≈ few days, L ≈ 1–2 weeks. Ship #1 first (it gates the
rest); #5 is the highest impact-to-cost once the track exists; #7 is the
signature feature but only worth starting after the read-side plumbing is proven
by #5.
