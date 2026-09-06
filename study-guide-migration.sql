-- ===========================================================================
-- STUDY GUIDE BUILDER — schema + RLS
-- Project: InvestiPlay (vcjdshippmqopaffuzbw)
-- Run in the Supabase SQL Editor. Idempotent. (Also applied via the Management
-- API during the build — this file is the record of record.)
-- ===========================================================================

-- Teacher-authored extra-practice study guide (MCQs + scenarios + activities).
CREATE TABLE IF NOT EXISTS study_guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  upload_id UUID NOT NULL REFERENCES curriculum_uploads(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES profiles(id),
  name TEXT NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Which classes a study guide is published to.
CREATE TABLE IF NOT EXISTS study_guide_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  study_guide_id UUID NOT NULL REFERENCES study_guides(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (study_guide_id, class_id)
);

-- Ungraded student responses to scenarios/activities (saved, not scored).
CREATE TABLE IF NOT EXISTS study_guide_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  study_guide_id UUID NOT NULL REFERENCES study_guides(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id),
  item_key TEXT NOT NULL,            -- e.g. "scenario-0", "activity-1"
  response TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (study_guide_id, user_id, item_key)
);

-- ── RLS (uses SECURITY DEFINER helpers is_class_teacher / is_class_member to
--    avoid the lessons<->assignments-style recursion) ──────────────────────

ALTER TABLE study_guides ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Teachers manage own study guides" ON study_guides;
CREATE POLICY "Teachers manage own study guides" ON study_guides
  FOR ALL USING (teacher_id = auth.uid()) WITH CHECK (teacher_id = auth.uid());
DROP POLICY IF EXISTS "Students see assigned study guides" ON study_guides;
CREATE POLICY "Students see assigned study guides" ON study_guides
  FOR SELECT USING (
    id IN (
      SELECT sga.study_guide_id FROM study_guide_assignments sga
      WHERE is_class_member(auth.uid(), sga.class_id)
    )
  );

ALTER TABLE study_guide_assignments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Teachers manage own SG assignments" ON study_guide_assignments;
CREATE POLICY "Teachers manage own SG assignments" ON study_guide_assignments
  FOR ALL USING (is_class_teacher(auth.uid(), class_id))
          WITH CHECK (is_class_teacher(auth.uid(), class_id));
DROP POLICY IF EXISTS "Students see own class SG assignments" ON study_guide_assignments;
CREATE POLICY "Students see own class SG assignments" ON study_guide_assignments
  FOR SELECT USING (is_class_member(auth.uid(), class_id));

ALTER TABLE study_guide_responses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Students manage own SG responses" ON study_guide_responses;
CREATE POLICY "Students manage own SG responses" ON study_guide_responses
  FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS "Teachers read SG responses for own guides" ON study_guide_responses;
CREATE POLICY "Teachers read SG responses for own guides" ON study_guide_responses
  FOR SELECT USING (
    study_guide_id IN (SELECT id FROM study_guides WHERE teacher_id = auth.uid())
  );
