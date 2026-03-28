
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view own business" ON businesses;
DROP POLICY IF EXISTS "Users can create own business" ON businesses;
DROP POLICY IF EXISTS "Users can update own business" ON businesses;

-- Recreate as permissive policies
CREATE POLICY "Users can view own business"
ON businesses
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own business"
ON businesses
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own business"
ON businesses
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);
