-- National leaderboard: every student who picked a US state is "national".
-- Returns all such users (excludes the AP Financial Literacy course option and
-- teachers), ranked by live coins - the jeffs_history ledger balance, the same
-- number shown in the top bar and every other social surface. The `xp` column
-- name matches the class/partners RPCs so the client code stays uniform.
CREATE OR REPLACE FUNCTION public.get_national_leaderboard()
RETURNS TABLE (user_id uuid, first_name text, last_name text, state text, xp numeric)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT
    p.id AS user_id, p.first_name, p.last_name, p.state_course AS state,
    COALESCE((SELECT SUM(jh.amount) FROM public.jeffs_history jh WHERE jh.user_id = p.id), 0) AS xp
  FROM public.profiles p
  WHERE auth.uid() IS NOT NULL
    AND (p.role IS DISTINCT FROM 'teacher')
    AND p.state_course IS NOT NULL
    AND p.state_course <> 'AP Financial Literacy'
  ORDER BY xp DESC
  LIMIT 500;
$$;
GRANT EXECUTE ON FUNCTION public.get_national_leaderboard() TO authenticated;
