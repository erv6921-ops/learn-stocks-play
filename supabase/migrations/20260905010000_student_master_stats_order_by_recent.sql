-- Order the StudentMasterDashboard roster by most-recently-active first.
--
-- The original get_student_master_stats (20260905000000) returned rows
-- ORDER BY name (alphabetical). The dashboard is far more useful when the
-- students who are actually using the app right now float to the top, so this
-- replaces the function to also compute a last_active_at signal and orders by
-- it, newest first.
--
-- last_active_at = the most recent of a student's real activity timestamps:
--   * question_attempts.created_at        (answering questions)
--   * lesson_progress.updated_at          (working through lessons)
--   * investicoins_transactions.created_at(earning/spending coins)
-- GREATEST() ignores NULLs, so a student who has only ever done one of these
-- still gets a sensible timestamp; a brand-new student with no activity gets
-- NULL and sorts last (NULLS LAST), then alphabetically as a tiebreak.
--
-- Everything else (the per-table CTE aggregation to avoid Cartesian fan-out,
-- the teacher/admin gate, the teacher exclusion) is unchanged from the
-- original migration.
--
-- Adding last_active_at to the RETURNS TABLE changes the function's return
-- type, which CREATE OR REPLACE cannot do, so drop the old definition first.
DROP FUNCTION IF EXISTS public.get_student_master_stats();

CREATE OR REPLACE FUNCTION public.get_student_master_stats()
RETURNS TABLE (
  id                       uuid,
  email                    text,
  name                     text,
  school_name              text,
  current_investocoins     numeric,
  current_jeffs            numeric,
  mastery_tier             text,
  assessment_score         numeric,
  lessons_started          bigint,
  lessons_completed        bigint,
  total_questions_attempted bigint,
  correct_answers          bigint,
  accuracy_percent         numeric,
  earned_today             numeric,
  earned_7days             numeric,
  earned_month             numeric,
  total_purchases          bigint,
  total_spent_on_purchases numeric,
  last_active_at           timestamptz
)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  WITH lp AS (
    SELECT
      user_id,
      COUNT(DISTINCT lesson_id)                              AS lessons_started,
      COUNT(*) FILTER (WHERE completed)                      AS lessons_completed,
      MAX(updated_at)                                        AS last_active
    FROM public.lesson_progress
    GROUP BY user_id
  ),
  qa AS (
    SELECT
      user_id,
      COUNT(*)                                               AS total_questions_attempted,
      COUNT(*) FILTER (WHERE is_correct)                     AS correct_answers,
      MAX(created_at)                                        AS last_active
    FROM public.question_attempts
    GROUP BY user_id
  ),
  it AS (
    SELECT
      user_id,
      COALESCE(SUM(amount) FILTER (WHERE DATE(created_at) = CURRENT_DATE), 0)                          AS earned_today,
      COALESCE(SUM(amount) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'), 0)           AS earned_7days,
      COALESCE(SUM(amount) FILTER (WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE)), 0)          AS earned_month,
      MAX(created_at)                                                                                  AS last_active
    FROM public.investicoins_transactions
    WHERE amount > 0
    GROUP BY user_id
  ),
  pur AS (
    SELECT
      buyer_user_id AS user_id,
      COUNT(*)          AS total_purchases,
      COALESCE(SUM(price), 0) AS total_spent_on_purchases
    FROM public.purchases
    GROUP BY buyer_user_id
  )
  SELECT
    p.id,
    p.email,
    TRIM(COALESCE(p.first_name, '') || ' ' || COALESCE(p.last_name, '')) AS name,
    p.school_name,
    COALESCE(p.investicoins_balance, 0)  AS current_investocoins,
    COALESCE(p.jeffs_balance, 0)         AS current_jeffs,
    p.mastery_tier,
    p.assessment_score,
    COALESCE(lp.lessons_started, 0)             AS lessons_started,
    COALESCE(lp.lessons_completed, 0)           AS lessons_completed,
    COALESCE(qa.total_questions_attempted, 0)   AS total_questions_attempted,
    COALESCE(qa.correct_answers, 0)             AS correct_answers,
    ROUND(100.0 * COALESCE(qa.correct_answers, 0)
          / NULLIF(qa.total_questions_attempted, 0), 1) AS accuracy_percent,
    COALESCE(it.earned_today, 0)   AS earned_today,
    COALESCE(it.earned_7days, 0)   AS earned_7days,
    COALESCE(it.earned_month, 0)   AS earned_month,
    COALESCE(pur.total_purchases, 0)          AS total_purchases,
    COALESCE(pur.total_spent_on_purchases, 0) AS total_spent_on_purchases,
    GREATEST(lp.last_active, qa.last_active, it.last_active) AS last_active_at
  FROM public.profiles p
  LEFT JOIN lp  ON lp.user_id  = p.id
  LEFT JOIN qa  ON qa.user_id  = p.id
  LEFT JOIN it  ON it.user_id  = p.id
  LEFT JOIN pur ON pur.user_id = p.id
  -- Admin dashboard: only teachers, or the admin email allowlisted on the
  -- /admin/analytics page, may pull every student's financials. Teachers
  -- themselves are excluded from the student roster.
  WHERE (
      public.has_role(auth.uid(), 'teacher'::app_role)
      OR (SELECT lower(email) FROM public.profiles WHERE id = auth.uid()) = 'erv6921@gmail.com'
    )
    AND (p.role IS DISTINCT FROM 'teacher')
  -- Most recently active students first; never-active students fall to the
  -- bottom, then alphabetical as a stable tiebreak.
  ORDER BY last_active_at DESC NULLS LAST, name;
$$;

GRANT EXECUTE ON FUNCTION public.get_student_master_stats() TO authenticated;
