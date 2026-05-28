
DROP POLICY IF EXISTS "Teachers can create classes" ON public.classes;
CREATE POLICY "Authenticated can create own classes"
ON public.classes
FOR INSERT
TO authenticated
WITH CHECK (teacher_id = auth.uid());

DROP POLICY IF EXISTS "Users can self-assign student role" ON public.user_roles;
CREATE POLICY "Users can self-assign role"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id AND role IN ('student'::app_role, 'teacher'::app_role));
