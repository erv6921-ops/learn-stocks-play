-- Create RPC for join-by-code so students don't need blanket SELECT on classes
CREATE OR REPLACE FUNCTION public.lookup_class_by_join_code(_code text)
RETURNS TABLE(id uuid, name text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT c.id, c.name
  FROM public.classes c
  WHERE c.join_code = UPPER(_code)
  LIMIT 1;
$$;

-- Drop the overly permissive blanket SELECT policy
DROP POLICY IF EXISTS "Students can lookup classes by join code" ON public.classes;