-- ============================================================================
-- Realtime-delivery fallback for assigned_lessons browser notifications
-- ----------------------------------------------------------------------------
-- REVIEW ONLY - do NOT run this unless, AFTER the BrowserNotifier resubscribe
-- loop is fixed, the student STILL never logs
--   [notif-debug] assigned_lessons INSERT received
-- while the channel is stably SUBSCRIBED. That would mean Supabase Realtime is
-- not delivering the INSERT to the student even though the SELECT policy allows
-- it, which is almost always one of the two things below.
--
-- Nothing here changes who can read data: the existing SELECT policy
--   "Class members view assignments":
--     is_class_teacher(auth.uid(), class_id) OR is_class_member(auth.uid(), class_id)
-- already permits enrolled students. These statements only make Realtime able to
-- evaluate that policy and emit the full row.
-- ============================================================================

-- 0. Sanity checks (run these first; they only SELECT, they change nothing).

--    (a) Is the table in the realtime publication? Expect one row.
SELECT schemaname, tablename
FROM   pg_publication_tables
WHERE  pubname = 'supabase_realtime'
  AND  schemaname = 'public'
  AND  tablename  = 'assigned_lessons';

--    (b) Current replica identity. 'd' = default (primary key only),
--        'f' = full (all columns). Realtime needs the row's columns (incl.
--        class_id) available to evaluate the SELECT policy reliably.
SELECT relname,
       CASE relreplident
         WHEN 'd' THEN 'default' WHEN 'f' THEN 'full'
         WHEN 'n' THEN 'nothing' WHEN 'i' THEN 'index'
       END AS replica_identity
FROM   pg_class
WHERE  relname = 'assigned_lessons';

-- ----------------------------------------------------------------------------
-- 1. FIX A - emit the full row so Realtime can apply RLS on every column.
--    Safe and idempotent. This is the most common fix when a row-scoped policy
--    (here, class-scoped via class_id) blocks realtime delivery.
ALTER TABLE public.assigned_lessons REPLICA IDENTITY FULL;

-- ----------------------------------------------------------------------------
-- 2. FIX B - only if (0a) returned NO rows, i.e. the table somehow isn't in the
--    publication on this environment. (It is added by migration
--    20260818000000_teacher_controls.sql, so normally skip this.)
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.assigned_lessons;

-- ----------------------------------------------------------------------------
-- 3. Verify as the student (optional, run in the SQL editor while impersonating
--    the student's JWT, or via the app). Should return the newly-assigned row:
-- SELECT id, class_id, lesson_id, assignment_type, assigned_at
-- FROM   public.assigned_lessons
-- WHERE  class_id = '<the-students-class-id>'
-- ORDER  BY assigned_at DESC
-- LIMIT  5;
-- If this returns the row for the student but Realtime still doesn't deliver,
-- the remaining suspect is the resubscribe loop (client), not RLS.
-- ============================================================================
