-- Per-class leaderboard with real XP.
--
-- Students cannot read each other's profiles / jeffs_history directly (those
-- tables are RLS "own-row only"), so the leaderboard needs a SECURITY DEFINER
-- function that returns just the leaderboard fields (name + XP) for every member
-- of a class — and only to callers who are themselves a member or the teacher of
-- that class.
--
-- XP matches how the app already computes a user's XP on the client: the sum of
-- positive jeffs_history amounts (total InvestiCoins earned).
CREATE OR REPLACE FUNCTION public.get_class_leaderboard(_class_id uuid)
RETURNS TABLE (
  user_id uuid,
  first_name text,
  last_name text,
  xp numeric
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    p.id AS user_id,
    p.first_name,
    p.last_name,
    COALESCE((
      SELECT SUM(jh.amount)
      FROM public.jeffs_history jh
      WHERE jh.user_id = p.id
        AND jh.amount > 0
    ), 0) AS xp
  FROM public.class_members cm
  JOIN public.profiles p ON p.id = cm.user_id
  WHERE cm.class_id = _class_id
    -- Only expose the roster to members/teachers of this class.
    AND (
      public.is_class_member(auth.uid(), _class_id)
      OR public.is_class_teacher(auth.uid(), _class_id)
    );
$$;

GRANT EXECUTE ON FUNCTION public.get_class_leaderboard(uuid) TO authenticated;
