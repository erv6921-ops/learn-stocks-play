-- Split proposal guidance and supplementary sub-lessons. Run in the Supabase
-- SQL Editor after sql/2026-09-16_extraction_progress.sql. Additive only.
--
-- split_instructions  free text the teacher writes on the "Split into
--                     lessons" dialog describing the chapter's structure
--                     ("split by the six learning objectives; fold each bonus
--                     case into the objective it relates to"). Kept on the
--                     upload row so it survives reopening the dialog. Sent to
--                     propose-split (a small model call that only sees the
--                     page outline, never full page text).
-- is_supplementary    set on a sub-lesson made from appendix material
--                     (lecture enhancers, bonus cases, test banks, answer
--                     keys) so the dialog and the selector flag it and the
--                     teacher can trash all its pages in one click.
alter table public.curriculum_uploads
  add column if not exists split_instructions text;

alter table public.sub_lessons
  add column if not exists is_supplementary boolean not null default false;
