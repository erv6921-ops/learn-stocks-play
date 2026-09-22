-- Lessons written from Jeff's own financial-literacy knowledge (no PDF).
-- Run in the Supabase SQL Editor (or via the Management API). Additive only.
--
-- origin        'upload'         the teacher uploaded a PDF (default, every existing row)
--               'jeff_knowledge' author-lesson-material wrote the source pages from a
--                                teacher's description; the rest of the v2 pipeline
--                                (generate-questions-v2, synthesize-lesson-v2) is unchanged
-- topic_prompt  the teacher's description of the lesson they asked for (jeff_knowledge only)

alter table public.curriculum_uploads
  add column if not exists origin text not null default 'upload';

alter table public.curriculum_uploads
  drop constraint if exists curriculum_uploads_origin_check;
alter table public.curriculum_uploads
  add constraint curriculum_uploads_origin_check
  check (origin in ('upload', 'jeff_knowledge'));

alter table public.curriculum_uploads
  add column if not exists topic_prompt text;
