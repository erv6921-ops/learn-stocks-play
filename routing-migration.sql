-- ===========================================================================
-- LESSON ROUTING: Missions vs Homework placement
-- Project: InvestiPlay (vcjdshippmqopaffuzbw)
-- Run in the Supabase SQL Editor. Idempotent. (Also applied via the Management
-- API during the build — this file is the record.)
--
-- No new `units` table: Missions units are the existing STATIC unitInfo entries
-- (src/data/lessons.ts, ids like "unit-2"). We only record, per generated
-- lesson, which bucket it went to and (for Missions) which static unit + order.
-- => No new RLS policy needed; `lessons` already has teacher + student SELECT
--    policies, and these are plain columns on that table.
-- ===========================================================================

ALTER TABLE lessons ADD COLUMN IF NOT EXISTS placement TEXT NOT NULL DEFAULT 'homework';
  -- 'homework' (one-off assignment) | 'missions' (part of the course sequence)
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS mission_unit_id TEXT;   -- static unitInfo id, e.g. 'unit-2' (null for homework)
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS mission_sort INT;       -- optional ordering hint within the unit
