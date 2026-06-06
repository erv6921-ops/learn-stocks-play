-- Self-serve teacher signup.
-- The signup flow passes the chosen role through auth metadata
-- (options.data.role). We trust that choice here and provision exactly
-- one role row for the new user, so a teacher never ends up with both a
-- 'student' and 'teacher' row (which would break role lookups that use
-- maybeSingle()). Defaults to 'student' when no role is supplied.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  desired_role public.app_role;
BEGIN
  desired_role := CASE
    WHEN NEW.raw_user_meta_data->>'role' = 'teacher' THEN 'teacher'::app_role
    ELSE 'student'::app_role
  END;

  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, COALESCE(NEW.email, ''), desired_role)
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email,
      role = COALESCE(public.profiles.role, EXCLUDED.role),
      updated_at = now();

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, desired_role)
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
