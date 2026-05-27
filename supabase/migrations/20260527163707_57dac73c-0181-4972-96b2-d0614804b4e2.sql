
-- Fix privilege escalation: only allow self-insert as 'student'.
-- Teacher role must be assigned via admin/server process, not self-claim.
DROP POLICY IF EXISTS "Users can insert own roles" ON public.user_roles;
CREATE POLICY "Users can self-assign student role"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id AND role = 'student'::app_role);

-- Restrict marketplace_listings policies to authenticated role
DROP POLICY IF EXISTS "Anyone can view active listings" ON public.marketplace_listings;
DROP POLICY IF EXISTS "Users can create own listings" ON public.marketplace_listings;
DROP POLICY IF EXISTS "Users can update own listings" ON public.marketplace_listings;

CREATE POLICY "Authenticated can view active listings"
ON public.marketplace_listings
FOR SELECT
TO authenticated
USING (status = 'active' OR seller_user_id = auth.uid());

CREATE POLICY "Authenticated can create own listings"
ON public.marketplace_listings
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = seller_user_id);

CREATE POLICY "Authenticated can update own listings"
ON public.marketplace_listings
FOR UPDATE
TO authenticated
USING (auth.uid() = seller_user_id);
