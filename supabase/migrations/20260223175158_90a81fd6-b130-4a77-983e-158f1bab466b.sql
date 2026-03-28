
-- Drop all existing restrictive policies on user_roles
DROP POLICY IF EXISTS "Users can insert own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;

-- Recreate as permissive policies
CREATE POLICY "Users can insert own roles" ON public.user_roles
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Also fix restrictive policies on profiles
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

-- Fix classes policies too
DROP POLICY IF EXISTS "Teachers can create classes" ON public.classes;
DROP POLICY IF EXISTS "Teachers can delete own classes" ON public.classes;
DROP POLICY IF EXISTS "Teachers can update own classes" ON public.classes;
DROP POLICY IF EXISTS "Teachers can view own classes" ON public.classes;

CREATE POLICY "Teachers can create classes" ON public.classes
  FOR INSERT TO authenticated
  WITH CHECK (teacher_id = auth.uid() AND has_role(auth.uid(), 'teacher'::app_role));

CREATE POLICY "Teachers can delete own classes" ON public.classes
  FOR DELETE TO authenticated
  USING (teacher_id = auth.uid());

CREATE POLICY "Teachers can update own classes" ON public.classes
  FOR UPDATE TO authenticated
  USING (teacher_id = auth.uid());

CREATE POLICY "Teachers can view own classes" ON public.classes
  FOR SELECT TO authenticated
  USING (teacher_id = auth.uid() OR is_class_member(auth.uid(), id));

-- Fix class_members policies
DROP POLICY IF EXISTS "Teachers can add class members" ON public.class_members;
DROP POLICY IF EXISTS "Teachers can remove class members" ON public.class_members;
DROP POLICY IF EXISTS "View class members" ON public.class_members;

CREATE POLICY "Teachers can add class members" ON public.class_members
  FOR INSERT TO authenticated
  WITH CHECK (is_class_teacher(auth.uid(), class_id) OR user_id = auth.uid());

CREATE POLICY "Teachers can remove class members" ON public.class_members
  FOR DELETE TO authenticated
  USING (is_class_teacher(auth.uid(), class_id) OR user_id = auth.uid());

CREATE POLICY "View class members" ON public.class_members
  FOR SELECT TO authenticated
  USING (is_class_teacher(auth.uid(), class_id) OR user_id = auth.uid());

-- Also add a policy to allow students to look up classes by join code
CREATE POLICY "Students can lookup classes by join code" ON public.classes
  FOR SELECT TO authenticated
  USING (true);
