-- Teacher/admin "master" per-student stats for the StudentMasterDashboard.
--
-- The browser supabase-js client can't run ad-hoc SQL, so — like every other
-- aggregate surface in this app (get_class_leaderboard, get_national_leaderboard)
-- — the query lives in a SECURITY DEFINER RPC gated to teachers.
--
-- IMPORTANT: this does NOT join the four child tables (lesson_progress,
-- question_attempts, investicoins_transactions, purchases) to profiles all at
-- once. A single multi-way join fans out into a Cartesian product, so any SUM
-- that isn't wrapped in DISTINCT (earned_today, correct_answers,
-- total_spent_on_purchases, …) gets multiplied by the row counts of the OTHER
-- joined tables. Each table is aggregated on its own in a CTE and then joined
-- back by user, which keeps every total correct.
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
  total_spent_on_purchases numeric
)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  WITH lp AS (
    SELECT
      user_id,
      COUNT(DISTINCT lesson_id)                              AS lessons_started,
      COUNT(*) FILTER (WHERE completed)                      AS lessons_completed
    FROM public.lesson_progress
    GROUP BY user_id
  ),
  qa AS (
    SELECT
      user_id,
      COUNT(*)                                               AS total_questions_attempted,
      COUNT(*) FILTER (WHERE is_correct)                     AS correct_answers
    FROM public.question_attempts
    GROUP BY user_id
  ),
  it AS (
    SELECT
      user_id,
      COALESCE(SUM(amount) FILTER (WHERE DATE(created_at) = CURRENT_DATE), 0)                          AS earned_today,
      COALESCE(SUM(amount) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'), 0)           AS earned_7days,
      COALESCE(SUM(amount) FILTER (WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE)), 0)          AS earned_month
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
    COALESCE(pur.total_spent_on_purchases, 0) AS total_spent_on_purchases
  FROM public.profiles p
  LEFT JOIN lp  ON lp.user_id  = p.id
  LEFT JOIN qa  ON qa.user_id  = p.id
  LEFT JOIN it  ON it.user_id  = p.id
  LEFT JOIN pur ON pur.user_id = p.id
  -- Admin dashboard: only teachers may pull every student's financials, and
  -- teachers themselves are excluded from the student roster.
  WHERE public.has_role(auth.uid(), 'teacher'::app_role)
    AND (p.role IS DISTINCT FROM 'teacher')
  ORDER BY name;
$$;

GRANT EXECUTE ON FUNCTION public.get_student_master_stats() TO authenticated;
