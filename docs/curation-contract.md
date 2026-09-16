# Teacher Curation Contract (v2 curriculum pipeline)

Contract between the frontend and the source-grounded v2 edge functions.
Teachers mark extracted items **Emphasize** or **Trash** after extraction and
before question / lesson generation. The v1 functions and their tables are
unchanged; everything below is additive.

Requires these SQL files to have been run in the Supabase SQL Editor, in order:
`sql/2026-09-11_source_grounding.sql`, `sql/2026-09-11_teacher_curation.sql`,
`sql/2026-09-11_teacher_approval.sql`, `sql/2026-09-13_generation_settings.sql`,
`sql/2026-09-15_teacher_questions_and_stages.sql` (section 7 below),
`sql/2026-09-16_sub_lessons.sql` (section 8 below).

---

## 1. Flow

```
upload row  ->  extract-curriculum-v2  ->  status 'awaiting_teacher_review'
                                             |
                          teacher marks rows (Emphasize / Trash)   <- this doc, section 2
                                             |
                generate-questions-v2  ->  status 'questions_generated'
                                             |
                synthesize-lesson-v2   ->  status 'lesson_synthesized'
```

Nothing is triggered automatically after extraction. The frontend calls each
function explicitly. Both generation functions read `teacher_status` from the
database at call time, so marks made right before the call are honored.

The whole flow lives on one page, `/teacher/curriculum` (new upload) and
`/teacher/curriculum/:uploadId` (existing upload): choose PDF -> Extract
(progress bar driven by `extraction_stage`, section 7.4) -> the same page
becomes the review: a stats row, four tabs (Vocabulary · Concepts · Questions
· Source Pages, each with a count badge and a collapsed "Trashed (n)" group),
then the build area (instructions, settings, Generate, Build, Preview ->
"I've reviewed this lesson" -> Assign). `/teacher/upload` redirects there.
The dashboard's Curriculum tab keeps a small upload card that routes to the
page, the upload history, and the lesson bank (section 7.6).

---

## 2. The buttons: exact table + column

Every button is a single `UPDATE ... SET teacher_status = <value>` on one row.
Allowed values: `'active'` (default, no mark), `'emphasized'`, `'trashed'`.
Un-marking is setting it back to `'active'`.

| Button target | Table | Row key | Column | Read-side label |
|---|---|---|---|---|
| Concept | `concepts` | `id` | `teacher_status` | `name` (+ `definition`) |
| Vocabulary term | `vocabulary` | `id` | `teacher_status` | `term` (+ `definition`) |
| Learning objective | `learning_objectives` | `id` | `teacher_status` | `objective` |
| Source page / chunk | `curriculum_source_chunks` | `id` | `teacher_status` | `page_start`, `page_end` (+ `content`) |

All four tables are filtered by `upload_id`.

RLS: a signed-in teacher can update rows only for uploads where
`curriculum_uploads.teacher_id = auth.uid()`, and a trigger rejects any update
that changes a column other than `teacher_status` (error code
`insufficient_privilege`). Reads use the existing SELECT policies.

Example (supabase-js):

```ts
await supabase.from("concepts").update({ teacher_status: "emphasized" }).eq("id", conceptId);
await supabase.from("curriculum_source_chunks").update({ teacher_status: "trashed" }).eq("id", chunkId);
```

Also visible for the review UI (read-only): `grounding_status`
(`'verified' | 'failed' | 'unverified'`) and `evidence_quote` on each of the
three item tables. Items with `grounding_status = 'failed'` are never used as
a guide even if active; show them greyed out.

### What each mark does

| Mark | Chunks | Concepts / objectives | Vocabulary |
|---|---|---|---|
| `trashed` | Text is never sent to the model. | No teaching section, no questions, excluded from Jeff context. Existing bank questions attached to a trashed concept are dropped from the mastery pool. | No vocab entry, no question, excluded from Jeff context. |
| `emphasized` | Rendered as `<source priority="true">` and called out in the prompt. | Own teaching section; >= 3 verified questions; >= 1 mastery-pool question. | Used in the lesson text; >= 1 verified question. |
| `active` | Normal source. | Normal coverage. | Normal coverage. |

Emphasis never overrides grounding. If the sources cannot support the minimum,
the function generates what it can, records the shortfall in
`coverage_report` and `insufficient_source_reason`, and never pads.

---

## 3. Functions and payloads

All are `POST https://<project>.supabase.co/functions/v1/<name>` with the
user's JWT (`Authorization: Bearer <access_token>`), `verify_jwt = true`.
Use `supabase.functions.invoke(name, { body })`.

### extract-curriculum-v2

```json
{ "uploadId": "<uuid>", "pages": [ { "page": 1, "text": "..." }, { "page": 2, "text": "..." } ] }
```

- Send one entry per PDF page from the pdf.js loop (do not join pages).
- Legacy `{ "uploadId", "extractedText" }` is still accepted and treated as page 1.
- Optional `"reextract": true` re-runs extraction on an upload that already has
  chunks. This deletes the previous chunks, concepts, vocabulary and objectives
  (teacher marks included) and clears `coverage_report`. Without it, a second
  call returns HTTP 409.
- Chunking: one chunk per page; a page over 1,500 words is split into several
  chunks labeled with that page; a page under 30 words is merged into the next.
- Under 200 readable words total: HTTP 422, status `extraction_failed`,
  `insufficient_source_reason` = "Not enough readable text. The file may be scanned images."

Response:

```json
{ "success": true, "conceptsCount": 9, "vocabularyCount": 4, "objectivesCount": 2,
  "chunksCount": 12, "verifiedCount": 15, "failedCount": 0, "insufficientSourceReason": "optional" }
```

On success the upload status is `awaiting_teacher_review`. Load the four
tables by `upload_id` to render the review screen.

**Stepped run (sql/2026-09-16_extraction_progress.sql).** No single request
may approach the edge-function wall clock (150 s on the free plan; the
gateway also answers 504 after 150 s), so extraction is driven by the client
in steps, one small page group per request (`runSteppedExtraction()` in
`curation/api.ts`):

| Request | Does | Answer |
|---|---|---|
| `{ uploadId, pages, reextract? }` | word gate, 409 / reset, store chunks, default sub-lesson, split chunks into groups of ~10,000 chars, save the plan in `extraction_progress` | `{ success, step: "planned", groups, progress }` |
| `{ uploadId, step: "group", group: i }` | extract + verify + persist group i from ITS pages only; a group that errors or returns nothing is recorded in `progress.failed` and the run continues | `{ success, step: "group", group, groupFailed?, progress, ...counts }` |
| `{ uploadId, step: "finalize" }` | merge duplicates across groups (one row per name / term / objective citing the UNION of every chunk any copy cited; longest definition; verified quote if any), then decide | `{ success, step: "finalized", progress, ...counts }` or 422 |
| `{ uploadId, step: "status" }` | current plan + progress, to resume an interrupted run without the PDF | `{ success, step: "status", progress }` |

`extraction_progress` = `{ groups, plan, pages, done, failed:[{group,pages,reason}], current, counts }`.
`extraction_stage` still moves `reading_pages` -> `extracting` / `verifying`
(per group) -> `saving` and is null when idle; the page polls both every
1.5 s so the bar moves group by group. Nothing advances on a timer.

A run that ends with zero items is a FAILURE: status `extraction_failed`,
`insufficient_source_reason` = `[extract] No concepts, vocabulary or
objectives were found in any of the N page groups. ...`, HTTP 422. A run
where some groups produced nothing keeps the rest, sets
`awaiting_teacher_review`, and records `[extract] K of N page groups produced
nothing: pp. a-b produced nothing (reason); ...`, which the review page shows
in a banner. A row left `pending` with a plan can be continued from the next
group ("Continue extraction" on the upload page).

### generate-questions-v2

```json
{ "uploadId": "<uuid>", "regenerate": false, "settings": { ... }, "teacherInstructions": "optional text" }
```

- Teacher-authored rows (`origin = 'teacher_authored'`, section 7.1) are never
  counted as "existing generation", never deleted, and never regenerated.
- First run (no **generated** rows for the upload): generates, even if the
  teacher already wrote questions.
- If generated rows exist and `regenerate` is omitted/false: returns the
  existing count without calling the model (`questionsGenerated`,
  `keptApproved`, `keptTeacherAuthored`).
- `"regenerate": true`: deletes generated rows with `teacher_approved_at is
  null` **and** `lesson_id is null`, then generates fresh rows. Rows the
  teacher approved (`teacher_approved_at` set, see section 6), rows already
  linked to a lesson, and teacher-authored rows are kept. New rows are
  inserted with `status = 'pending'`, `origin = 'generated'` and
  `teacher_approved_at = null`, so they enter the teacher's review queue
  normally.
- `teacherInstructions` (else `curriculum_uploads.teacher_instructions`) is
  rendered as a `<teacher_instructions>` block: it directs scope, emphasis,
  tone and structure only (section 7.2).
- Pool size: 15 baseline, grown to cover emphasis minimums, capped at 30.

Response:

```json
{ "success": true, "questionsGenerated": 18, "verifiedCount": 17, "failedCount": 1,
  "keptApproved": 0, "keptTeacherAuthored": 2, "unsupportedInstructions": [],
  "coverage": [ ...coverage_report... ], "insufficientSourceReason": "optional" }
```

Sets upload status to `questions_generated` and writes
`curriculum_uploads.coverage_report`.

### synthesize-lesson-v2

```json
{ "uploadId": "<uuid>", "lessonId": "<uuid>", "settings": { ... }, "teacherInstructions": "optional text" }
```

Same as before: create the `lessons` row first, then call. Response:

```json
{ "success": true, "sectionsCount": 9, "masteryCount": 15, "requiredCorrect": 4, "starredCount": 2,
  "unsupportedInstructions": [], "verifiedCount": 8, "failedCount": 0,
  "coverage": [ ...coverage_report... ], "insufficientSourceReason": "optional" }
```

Mastery pool: approved, non-failed rows; starred rows (section 7.3) are
always included (even if attached to a trashed concept), listed first, and
their ids are written to the section as `pinnedQuestionIds`. The player
serves pinned questions first, in order, before the adaptive draw, so every
student gets them. Each pool question also carries `origin` and `starred`.

Sets upload status to `lesson_synthesized` and merges lesson notes into
`coverage_report`. `lessons.content` is `version: 2` and contains
`sections`, `failed_items` (removed items for admin review), `grounding`
(counts), and `jeffContext` (trashed items excluded). Each concept / scenario
section and each check question carries `coversKeys`, `sourceChunkIds`,
`evidenceQuote`, `groundingStatus`.

Lesson shape (the player runs Jeff's live conversation first, grounded on
`jeffContext.excerpt`, which is now a teaching brief: teacher emphasis, then
every verified concept and term, then source text):

```
slide 1 -> mini check-in -> slide 2 -> micro-check -> vocab match -> scenario -> slide 3 -> mastery check
```

- At most 3 `concept` slides, 1-2 short paragraphs each; emphasized topics get
  them first. If more than 3 topics are emphasized, the rest are covered in
  Jeff's conversation and the questions, and the coverage note says so.
- `activity-check` / `vocab-match` is built in code from verified, non-trashed
  vocabulary (3-5 pairs, emphasized first); it is omitted when fewer than 3
  verified terms exist. No model call, so it needs no quote.
- Any missing piece (no scenario, fewer slides) is simply skipped; the order
  of the rest is unchanged.

### Lesson settings (sql/2026-09-13_generation_settings.sql)

`curriculum_uploads.generation_settings` (jsonb) holds the teacher's choices,
edited on the review screen ("Lesson settings", above Generate Lesson) and
saved on every change via the existing "Teachers update own uploads" policy:

```json
{ "bankSize": 15, "difficulty": "mixed", "microChecks": 2, "masteryRequired": 4 }
```

| Field | Range | Used by | Effect |
|---|---|---|---|
| `bankSize` | 5-30 | generate-questions-v2 | Questions requested (grown for emphasis minimums, capped at 30). |
| `difficulty` | `easier` / `balanced` / `harder` / `mixed` | generate-questions-v2 | Easy/medium/hard mix asked of the model; each row's `difficulty` (0.25/0.5/0.75) shows as Easy/Medium/Hard in the approval list, which can be filtered. |
| `microChecks` | 0-4 | synthesize-lesson-v2 | Number of one-question checks between the slides (`checks` array in the model output; the first two sit after slides 1 and 2, any others right before mastery). |
| `masteryRequired` | 1-15, at most `bankSize` | synthesize-lesson-v2 | `requiredCorrect` on the mastery-check section. |

Both functions accept the same object as `settings` in the request body,
which takes precedence over the column; missing or invalid values fall back
to the defaults above.

Error statuses common to all three: 400 bad body, 404 no chunks for the
upload, 409 already extracted (extract only), 422 insufficient source,
500 database error, 502 model or verification error. Error bodies are
`{ "success": false, "errors": ["..."] }`.

---

## 4. `curriculum_uploads.status` values

| Value | Set by | Meaning |
|---|---|---|
| `pending` | frontend insert | Row created, nothing run yet. |
| `awaiting_teacher_review` | extract-curriculum-v2 | Extraction done and verified. Teacher marks items; nothing downstream has run. |
| `questions_generated` | generate-questions-v2 | Question bank exists (with `coverage_report`). |
| `lesson_synthesized` | synthesize-lesson-v2 | At least one lesson has been built for this upload. |
| `extraction_failed` | extract-curriculum-v2 | Not enough text, model/DB error, or persistence failure. See `insufficient_source_reason`. |
| `extracted` | v1 extract-curriculum only | Legacy v1 success state. Not used by v2. |
| `deleted` | frontend | Soft-deleted upload (existing behavior). |

Other upload columns the review UI should read:
`insufficient_source_reason` (text, one `[stage] reason` line per stage:
`[extract]`, `[questions]`, `[lesson]`) and `coverage_report` (below).

---

## 5. `curriculum_uploads.coverage_report` shape

A JSON array with one entry per concept, vocabulary term, learning objective
**and** source chunk, plus one `"instruction"` entry per teacher-instruction
part the sources could not support (section 7.2). Written by
generate-questions-v2 and updated by synthesize-lesson-v2. Computed in code
from tags and citations, never by the model (the model only reports which
instruction parts it skipped).

```json
[
  {
    "item_type": "concept",            // "concept" | "vocabulary" | "objective" | "chunk"
    "item_id": "<row uuid>",           // id in the matching table
    "label": "Compound Interest",      // name / term / objective text / "Page 3" or "Pages 3-4"
    "teacher_status": "emphasized",    // "active" | "emphasized" | "trashed"
    "questions_generated": 3,          // verified bank questions covering this item
                                       // (for chunks: verified questions citing the chunk)
    "target": 3,                       // 3 emphasized concept/objective, 1 emphasized vocab/chunk, else 0
    "note": "Lesson: has its own teaching section. Mastery pool: 3 question(s)."
  }
]
```

`note` is free text for the teacher. Phrases to expect:

- `Trashed by teacher; excluded from generation.`
- `Extraction item failed grounding; not used as a guide.`
- `Shortfall: 1 of 3 required questions were supported by the sources after a top-up attempt.`
- `N approved question(s) kept from a previous run.`
- `Lesson: has its own teaching section.` / `Lesson: NO dedicated teaching section (sources did not support one).`
- `Lesson: emphasized term used in the lesson.` / `Lesson: emphasized term NOT used in the lesson (...)`
- `Mastery pool: N question(s).`
- `Lesson: cited by N verified lesson item(s).`
- `Emphasized source was not cited by any verified question.`
- `Skipped: your instruction asked for this but the sources do not contain it (question bank | lesson).`
  (`item_type: "instruction"`, `item_id: "questions-N"` / `"lesson-N"`, `label` = the skipped part)

A simple UI rule: flag any entry where `target > 0 && questions_generated < target`,
or whose note contains `NOT` or `Shortfall`.

---

## 6. Teacher approval gate (sql/2026-09-11_teacher_approval.sql)

Students only see generated content the teacher approved. Nothing uses the
`status` column for this; approval lives in two new columns, same pattern on
both tables:

| Table | Columns | Who sets them | Student gate |
|---|---|---|---|
| `generated_questions` | `teacher_approved_at timestamptz`, `teacher_approved_by uuid` | Teacher UPDATE on own uploads (trigger stamps `_by`) | RLS "Students see assigned lesson questions" also requires `teacher_approved_at is not null` |
| `lessons` | `teacher_approved_at timestamptz`, `teacher_approved_by uuid` | Teacher UPDATE on own lessons (trigger stamps `_by`) | RLS "Students see assigned lessons" also requires `teacher_approved_at is not null` |

All rows that existed when the SQL ran were backfilled as approved.

- **Approve**: `update generated_questions set teacher_approved_at = now(), teacher_approved_by = auth.uid() where id = ?`
- **Undo**: set both to null.
- **Reject**: `delete from generated_questions where id = ?` (new teacher DELETE policy, own uploads only).
- **Edit**: call `verify-question-v2` with `{ questionId, question_text, options, correct_answer, explanation, evidence_quote }` (caller's JWT; must own the upload). It re-runs the quote check and the strict support check, saves the edit with the new `grounding_status` and `source_chunk_ids`, and clears approval. Response: `{ success, grounding_status, reason, source_chunk_ids, pages }`.
- A row with `grounding_status = 'failed'` cannot be approved: the DB trigger raises, and the UI offers Edit or Delete only.
- Any user-session edit to `question_text`, `options`, `correct_answer`, or `explanation` that bypasses the function is reset to `grounding_status = 'unverified'` with approval cleared by the same trigger.

UI: `QuestionApprovalPanel` (approve / edit / reject / star / "Approve all verified", evidence quote + page numbers, "Add question" form) renders on the Questions tab of `/teacher/curriculum/:uploadId` (upload pool), inside `PreviewLessonModal`, and on `/teacher/lesson-review/:lessonId` (lesson + mastery pool). The whole-lesson approval is the "I've reviewed this lesson" checkbox on the curriculum page (it stamps `lessons.teacher_approved_at`); Assign is disabled until it is checked, and rebuilding the lesson clears it. `/admin/approved-content` is the read-only cross-teacher view.

`synthesize-lesson-v2` builds the mastery pool from approved rows only; unapproved rows are listed in `failed_items` with the reason "Not yet approved by the teacher". `generate-questions-v2` regeneration keeps rows with `teacher_approved_at` set.

---

## 7. Teacher-authored questions, starring, instructions, progress (sql/2026-09-15_teacher_questions_and_stages.sql)

### 7.1 `generated_questions.origin`

`'generated'` (default; written by generate-questions-v2) or
`'teacher_authored'` (written by the teacher on the Questions tab). Check
constraint allows only those two.

A teacher writes a question with a plain INSERT (new policy "Teachers write
questions on own uploads", scoped to `upload_id` in the teacher's uploads):

```ts
await supabase.from("generated_questions").insert({
  upload_id, concept_id: null | "<uuid>", question_text, options: [a, b, c, d],
  correct_answer: "<exact text of the correct option>", explanation, difficulty: 0.25 | 0.5 | 0.75,
  status: "pending", origin: "teacher_authored",
});
```

A BEFORE INSERT guard (user sessions only) forces `origin =
'teacher_authored'`, `status = 'pending'`, `grounding_status = 'unverified'`,
null `source_chunk_ids` / `evidence_quote`, and stamps `teacher_approved_at =
now()` / `teacher_approved_by = auth.uid()`. So a teacher-written question is
approved on save, skips grounding entirely, survives regeneration, and is in
the mastery pool on the next build. `correct_answer` must equal one option
exactly: that is how the builder and the player find the right option.

The approval-guard trigger (redefined in the same file) keys its exemptions
on `origin = 'teacher_authored'` and nothing else:

- `origin` cannot be changed from a user session.
- Editing content (stem / options / answer / explanation) still resets a
  **generated** row to `unverified` and clears its approval. A
  teacher-authored row keeps its approval through edits.
- The "grounding-failed rows cannot be approved" rule does not apply to
  teacher-authored rows (they never carry grounding data).

UI: teacher rows show the neutral "Written by you" badge (never "Not found in
source" or "Not verified"), no evidence box, "Save" instead of "Save and
verify", and Delete. "Approve all verified" ignores them.

### 7.2 `curriculum_uploads.teacher_instructions`

Free text (max 2,000 chars), saved on blur from the box above Generate and
sent as `teacherInstructions` to both generation functions (the body wins
over the column). GROUNDING_RULES now say: teacher instructions direct what
to cover and how to present it (scope, emphasis, tone, structure); every fact
still comes from the sources; an instruction part the sources do not contain
is skipped, never invented, and returned in `unsupported_instructions`, which
both functions write into `coverage_report` as `item_type: "instruction"`
entries and echo as `unsupportedInstructions` in the response.

### 7.3 `generated_questions.starred`

Boolean, default false. Starred = every student gets it: always in the
mastery pool, served before rotation (`pinnedQuestionIds` on the mastery
section). Any approved question can be starred, generated or teacher-written.

Cap: at most `generation_settings.masteryRequired` (default 4) starred rows
per upload. The Questions tab disables further stars at the cap (tooltip
explains why) and shows "Starred N of cap"; a BEFORE trigger refuses a star
past the cap with `check_violation`. Lowering `masteryRequired` below the
starred count never unstars anything: Lesson settings shows how many are
over, and Generate / Regenerate / Build are disabled until the teacher
unstars down to the new cap. Undoing a question's approval also unstars it.

### 7.4 `curriculum_uploads.extraction_stage` / `extraction_stage_at`

See extract-curriculum-v2 above. Allowed values `reading_pages`,
`extracting`, `verifying`, `saving`, or null.

### 7.5 Preview -> approve -> assign

After Build: `LessonPreviewButtons` ("Full Lesson" runs `StudentLessonView`
in `previewMode`: Jeff teaches, questions come up, feedback shows, nothing
is written or awarded), then the "I've reviewed this lesson" checkbox
(stamps `lessons.teacher_approved_at`), then Assign to class, which opens
`/teacher/assign-lesson?uploadId=&lessonId=&lessonName=` (existing flow:
classes + due date, writes `class_lesson_assignments` and `assigned_lessons`,
so it appears in the students' Homework tab like any assigned lesson).

### 7.6 Lesson bank

`LessonBank` (dashboard Curriculum tab) lists every `lessons` row of the
teacher with built content: name, source upload, built date, review state,
sections / mastery / starred counts, classes assigned, with Full Lesson /
Question Bank / Open (the upload page) / Assign. Assign reuses the assign
page above with `lessonId`, so a lesson can go to another class later
without regenerating.

---

## 8. Sub-lessons (sql/2026-09-16_sub_lessons.sql)

A teacher uploads a whole chapter and splits it into several lessons, each
generated from only its own pages.

### 8.1 Data model

`public.sub_lessons`: `id`, `upload_id`, `title`, `sort_order`,
`instructions` (this lesson's own box), `generation_settings` (per
sub-lesson: bankSize, difficulty, microChecks, masteryRequired; defaults from
the upload's values), `coverage_report`, `insufficient_source_reason`,
`split_edited_by_teacher`, `created_at`. RLS: teachers manage rows of their
own uploads; service role everything.

Ownership: `curriculum_source_chunks.sub_lesson_id` (every chunk has exactly
one owner), `lessons.sub_lesson_id`, `generated_questions.sub_lesson_id`.
The chunk column guard now allows a user session to change `teacher_status`
**or** `sub_lesson_id` (the target must belong to the same upload); nothing
else on chunks is teacher-editable.

Default: extract-curriculum-v2 creates one sub-lesson (title = file name)
owning every chunk, so a short upload never needs the split step and the
single-lesson path is unchanged. The SQL backfills the same default for every
existing upload with chunks and points its lessons and questions at it. Both
generation functions call `resolveSubLesson()`: with no `subLessonId` they
use the upload's first sub-lesson (creating it if missing), so older clients
keep working. A re-extract resets the split to one lesson (page boundaries
may change); the first sub-lesson keeps its title, settings and
instructions and adopts every lesson and question.

Items (`concepts`, `vocabulary`, `learning_objectives`) are not re-keyed:
an item belongs to every sub-lesson that owns a chunk in its
`source_chunk_ids`, so an item cited from two sub-lessons' pages appears in
both, with one shared `teacher_status`. Items with no citation (grounding
failed) belong to no sub-lesson; the UI shows them in a "Not placed" group.

### 8.1a Chunk selection for generation

Neither generator sends a whole document to the model. `selectChunks()` in
`_shared/grounding.ts` picks the passages one call may see, in document
order, capped at 30,000 characters: (1) chunks cited by the items the call
is about (emphasized items first; an item with no citation falls back to a
keyword match on its name and definition), (2) every teacher-emphasized
chunk, (3) the rest ranked by how many items cite them, then by keyword
match to the teacher instructions, then (lesson only) by how many figures
they contain, then document order. Trashed chunks are never candidates.

generate-questions-v2 splits the sub-lesson's usable items into batches of
six (emphasized first), runs one generation call and one verification call
per batch over that batch's selection, and uses the same selection for the
emphasis top-up. synthesize-lesson-v2 makes one call over the selection for
the emphasized items with the figure preference on; Jeff's brief is built
from the same passages.

### 8.2 Generation

`generate-questions-v2` and `synthesize-lesson-v2` accept `subLessonId` and
`subLessonInstructions`. Everything is scoped to that sub-lesson: chunks
(`loadChunks(..., subLessonId)`; a sub-lesson never sees another's pages),
items (`loadCurationSet(..., ownedChunkIds)`), existing / regenerated
questions (`generated_questions.sub_lesson_id`), the mastery pool, settings
(`sub_lessons.generation_settings`, else the upload's), coverage report and
shortfall notes (written to the sub-lesson row; the upload row keeps a copy),
and the starred cap (per sub-lesson, from its own `masteryRequired`).
Trashed chunks stay excluded; emphasis applies within every sub-lesson that
owns the item. Rows inserted by generate carry `sub_lesson_id`; synthesize
stamps `lessons.sub_lesson_id` and `content.subLessonId`. Responses echo
`subLessonId`.

Instructions: the upload-wide box (`curriculum_uploads.teacher_instructions`)
applies to every sub-lesson; the sub-lesson box (`sub_lessons.instructions`)
is added below it in the same `<teacher_instructions>` block and takes
precedence where they conflict. The grounding clause (section 7.2) is
unchanged.

### 8.3 UI

`SubLessonBar` above the stats row: one chip per sub-lesson (page range,
word count, "short" warning under 300 words, build / reviewed state) and
"Split into lessons". The four tabs, the stats, the Questions panel (and its
"Add question" form, which writes `sub_lesson_id`), Lesson settings, both
instruction boxes, Generate, Build, coverage, the approval checkbox and
Assign all follow the selected sub-lesson, so a teacher can build one and
come back for the next.

`SplitLessonsDialog`: rename, merge with next, split at a page, reorder,
drag a page onto another lesson, add / remove a lesson, mark a lesson
supplementary. "Propose a split" is offered only while no sub-lesson has
`split_edited_by_teacher`; saving marks every row edited, so the proposal is
never re-run over the teacher's version. Two layers
(sql/2026-09-17_split_instructions.sql):

- Layer 1, `proposeSplit()` in curation/api.ts, no model call: strips the
  running header shared by most pages, scans the FULL text of every page for
  numbered section headings ("LO 2-1 ...", "2-2 THE CIRCULAR FLOW MODEL",
  "Section 3.2 ..."), scores them (LO / Section / Chapter prefix > ALL CAPS
  > Title Case), keeps the strongest class that occurs twice, requires the
  numbers to increase in page order (appendix restarts are discarded), and
  cuts a lesson at the first page of each kept heading, titled with it.
  Front matter joins the first lesson. Pages after the last real section
  that carry an appendix cue (lecture enhancer, bonus case, test bank,
  answer key ...) or a number restart become a final lesson titled from
  their content ("Lecture enhancers and cases") with
  `sub_lessons.is_supplementary = true`; the dialog and the selector flag it
  and "Trash these pages" trashes all its pages in one click.
- Layer 2, `propose-split` edge function (caller JWT; own upload only): runs
  when the teacher wrote a description of the chapter's structure
  (`curriculum_uploads.split_instructions`, saved on blur) or layer 1 found
  no numbered structure. It receives only the page OUTLINE built by
  `buildOutline()` (page label, headings, ~200-char snippet, appendix cue
  per page) plus the description, never full page text, and returns titled,
  in-order groups with a supplementary flag; every page is placed exactly
  once (skipped pages join the preceding lesson). On failure the dialog
  falls back to layer 1.

Assign: `/teacher/assign-lesson?uploadId=&lessonId=` links only the
questions whose `sub_lesson_id` matches the lesson's (a legacy lesson with no
sub-lesson links only unowned questions); a question is never relabelled to
another sub-lesson's lesson. Each sub-lesson is approved and assigned
separately with its own due date. The lesson bank lists every built
sub-lesson as its own lesson, labelled "From <upload> › <sub-lesson title>".
