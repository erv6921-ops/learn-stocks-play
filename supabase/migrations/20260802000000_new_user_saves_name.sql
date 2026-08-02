-- Names entered at sign-up must land on the profile immediately, so a student
-- shows up by name in partner search / requests even if they never finish
-- onboarding or bounce away on the email-confirmation step.
--
-- The client now passes first_name / last_name in the signUp metadata
-- (raw_user_meta_data). This trigger reads them at account creation. On an
-- existing row it only BACKFILLS a null name (COALESCE keeps any name already
-- saved), so a later profile edit is never clobbered.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  desired_role public.app_role;
BEGIN
  desired_role := CASE
    WHEN NEW.raw_user_meta_data->>'role' = 'teacher' THEN 'teacher'::app_role
    ELSE 'student'::app_role
  END;

  INSERT INTO public.profiles (id, email, role, first_name, last_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    desired_role,
    NULLIF(NEW.raw_user_meta_data->>'first_name', ''),
    NULLIF(NEW.raw_user_meta_data->>'last_name', '')
  )
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email,
      role = COALESCE(public.profiles.role, EXCLUDED.role),
      first_name = COALESCE(public.profiles.first_name, EXCLUDED.first_name),
      last_name = COALESCE(public.profiles.last_name, EXCLUDED.last_name),
      updated_at = now();

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, desired_role)
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$function$;
