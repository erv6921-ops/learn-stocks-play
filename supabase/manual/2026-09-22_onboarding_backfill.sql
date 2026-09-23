-- 2026-09-22  Onboarding backfill
--
-- Context: the auth listener used to hard-code onboardingComplete=true when a
-- profile row existed, so the real profiles.onboarding_complete flag was never
-- reliably persisted (a deferred hydrate that lost a race was the only writer).
-- After fixing the mapper to read the real column, any existing student whose
-- flag is still unset would be sent back through onboarding on next login.
--
-- Fix: mark onboarding complete for every profile that has already been using
-- the app -- it has at least one lesson_progress row OR at least one
-- class_members row -- since such a profile has clearly finished onboarding.
--
-- Run the three statements in order and eyeball each result before the UPDATE.

-- (1) Confirm the flag's column name and shape (expected: onboarding_complete).
SELECT * FROM profiles LIMIT 5;

-- (2) How many profiles will the UPDATE touch? (IS NOT TRUE catches both
--     NULL and false, i.e. every row where the flag is not already set.)
SELECT COUNT(*) AS affected
FROM profiles p
WHERE p.onboarding_complete IS NOT TRUE
  AND (
    EXISTS (SELECT 1 FROM lesson_progress lp WHERE lp.user_id = p.id)
    OR EXISTS (SELECT 1 FROM class_members cm WHERE cm.user_id = p.id)
  );

-- (3) Mark those established students as onboarded.
UPDATE profiles p
SET onboarding_complete = TRUE
WHERE p.onboarding_complete IS NOT TRUE
  AND (
    EXISTS (SELECT 1 FROM lesson_progress lp WHERE lp.user_id = p.id)
    OR EXISTS (SELECT 1 FROM class_members cm WHERE cm.user_id = p.id)
  );
