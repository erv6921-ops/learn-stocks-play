-- Ensure RLS is enabled on businesses
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

-- Remove existing policies (including previously misconfigured restrictive variants)
DROP POLICY IF EXISTS "Users can view own business" ON public.businesses;
DROP POLICY IF EXISTS "Users can create own business" ON public.businesses;
DROP POLICY IF EXISTS "Users can update own business" ON public.businesses;
DROP POLICY IF EXISTS "Users can view their own business" ON public.businesses;
DROP POLICY IF EXISTS "Users can insert their own business" ON public.businesses;
DROP POLICY IF EXISTS "Users can update their own business" ON public.businesses;

-- Recreate policies as permissive so authenticated users can manage only their own rows
CREATE POLICY "Users can view own business"
ON public.businesses
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own business"
ON public.businesses
AS PERMISSIVE
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own business"
ON public.businesses
AS PERMISSIVE
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);