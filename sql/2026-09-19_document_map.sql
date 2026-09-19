-- Document map + unit tags + vocabulary confidence. Run in the Supabase SQL
-- Editor after sql/2026-09-17_split_instructions.sql. Additive only, except
-- the extraction_stage check constraint, which gains two stage values.
--
-- document_map   written by extract-curriculum-v2 (step "map") before any
--                extraction: document type, organizing units with page ranges
--                and core / supplementary role, author-flagged vocabulary
--                lists (whatever the author labelled them), notes. Shape:
-- {
--   "document_type": "textbook_chapter | instructor_manual | slide_deck | worksheet | notes | other",
--   "organizing_unit": "what the units are called (e.g. learning objective, section, slide group)",
--   "units": [ { "key": "U1", "title": "...", "page_start": 5, "page_end": 8,
--                "role": "core" | "supplementary", "kind": "free text (e.g. lecture notes, bonus case)" } ],
--   "vocabulary_sources": [ { "unit_key": "U1", "page": 8, "label_as_written": "Key Terms", "terms": ["..."] } ],
--   "flagged_terms": ["..."],           -- every author-flagged term, de-duplicated
--   "notes": "free text",
--   "model": "...", "mapped_at": "iso"
-- }
-- unit_key / unit_title  on every extracted item: the map unit that owns the
--                chunk the item was cited from (computed in code, never by
--                the model).
-- confidence     on vocabulary: 'high' when the term is author-flagged in the
--                map, 'low' when it was only found defined in core text.

alter table public.curriculum_uploads
  add column if not exists document_map jsonb;

alter table public.curriculum_uploads
  drop constraint if exists curriculum_uploads_extraction_stage_check;
alter table public.curriculum_uploads
  add constraint curriculum_uploads_extraction_stage_check
  check (extraction_stage is null or extraction_stage in ('reading_pages', 'mapping', 'extracting', 'verifying', 'saving'));

alter table public.concepts
  add column if not exists unit_key text,
  add column if not exists unit_title text;

alter table public.vocabulary
  add column if not exists unit_key text,
  add column if not exists unit_title text,
  add column if not exists confidence text;
alter table public.vocabulary
  drop constraint if exists vocabulary_confidence_check;
alter table public.vocabulary
  add constraint vocabulary_confidence_check
  check (confidence is null or confidence in ('high', 'low'));

alter table public.learning_objectives
  add column if not exists unit_key text,
  add column if not exists unit_title text;

-- Pages the client sent as images (thin or garbled text) are transcribed by
-- the model; remember which so the review can say so.
alter table public.curriculum_source_chunks
  add column if not exists text_source text;
alter table public.curriculum_source_chunks
  drop constraint if exists curriculum_source_chunks_text_source_check;
alter table public.curriculum_source_chunks
  add constraint curriculum_source_chunks_text_source_check
  check (text_source is null or text_source in ('pdf_text', 'image_transcription'));
