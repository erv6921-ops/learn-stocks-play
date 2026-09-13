# Teacher Curation Contract (v2 curriculum pipeline)

Contract between the frontend and the source-grounded v2 edge functions.
Teachers mark extracted items **Emphasize** or **Trash** after extraction and
before question / lesson generation. The v1 functions and their tables are
unchanged; everything below is additive.

Requires both SQL files to have been run in the Supabase SQL Editor:
`sql/2026-09-11_source_grounding.sql` then `sql/2026-09-11_teacher_curation.sql`.

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

### generate-questions-v2

```json
{ "uploadId": "<uuid>", "regenerate": false }
```

- First run (no rows in `generated_questions` for the upload): generates.
- If rows exist and `regenerate` is omitted/false: returns the existing count
  without calling the model (`questionsGenerated`, `keptApproved`).
- `"regenerate": true`: deletes rows with `teacher_approved_at is null` **and**
  `lesson_id is null`, then generates fresh rows. Rows the teacher approved
  (`teacher_approved_at` set, see section 6) and rows already linked to a
  lesson are kept. New rows are inserted with `status = 'pending'` and
  `teacher_approved_at = null`, so they enter the teacher's review queue
  normally.
- Pool size: 15 baseline, grown to cover emphasis minimums, capped at 30.

Response:

```json
{ "success": true, "questionsGenerated": 18, "verifiedCount": 17, "failedCount": 1,
  "keptApproved": 0, "coverage": [ ...coverage_report... ], "insufficientSourceReason": "optional" }
```

Sets upload status to `questions_generated` and writes
`curriculum_uploads.coverage_report`.

### synthesize-lesson-v2

```json
{ "uploadId": "<uuid>", "lessonId": "<uuid>" }
```

Same as before: create the `lessons` row first, then call. Response:

```json
{ "success": true, "sectionsCount": 9, "masteryCount": 15, "requiredCorrect": 4,
  "verifiedCount": 8, "failedCount": 0, "coverage": [ ...coverage_report... ], "insufficientSourceReason": "optional" }
```

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
**and** source chunk. Written by generate-questions-v2 and updated by
synthesize-lesson-v2. Computed in code from tags and citations, never by the
model.

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

UI: `QuestionApprovalPanel` (approve / edit / reject / "Approve all verified", evidence quote + page numbers) renders inside `PreviewLessonModal` (upload pool) and on `/teacher/lesson-review/:lessonId` (lesson + mastery pool, plus the lesson approve button). Assigning a lesson now lands on that review page. `/admin/approved-content` is the read-only cross-teacher view.

`synthesize-lesson-v2` builds the mastery pool from approved rows only; unapproved rows are listed in `failed_items` with the reason "Not yet approved by the teacher". `generate-questions-v2` regeneration keeps rows with `teacher_approved_at` set.
