-- Per-upload lesson generation settings chosen by the teacher on the
-- curation review (bank size, difficulty, number of quick checks, mastery
-- pass mark). Run in the Supabase SQL Editor. Additive only.
--
-- Teachers can already UPDATE their own upload rows ("Teachers update own
-- uploads"), so no new policy is needed. The v2 functions read this column
-- when the request body carries no settings.

alter table public.curriculum_uploads
  add column if not exists generation_settings jsonb;
