-- Why each extracted item was extracted, in the model's own words at
-- extraction time ("Defined in the section notes as the theory that ...;
-- listed by the author among the unit's terms"). Shown on the review page in
-- the "How this was found" panel so the teacher can judge every item.
-- Run after sql/2026-09-19_document_map.sql. Additive only.
alter table public.concepts add column if not exists rationale text;
alter table public.vocabulary add column if not exists rationale text;
alter table public.learning_objectives add column if not exists rationale text;
