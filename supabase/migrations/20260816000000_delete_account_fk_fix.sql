-- Let account self-deletion succeed.
--
-- The delete-account edge function calls auth.admin.deleteUser(), which deletes
-- the row in auth.users. Several columns reference auth.users(id) with NO delete
-- action, so Postgres refuses the delete whenever the user is referenced. These
-- are "who did this" columns — the teacher/student who created a challenge, won
-- it, was the duel opponent, or graded a business. When that user deletes their
-- account we want to KEEP the row and null the reference, not block the delete.
--
-- Without this, deleteUser() fails and the account is only half-removed (the
-- profile row cascades away, but the auth user and login remain).

alter table public.class_challenges
  drop constraint if exists class_challenges_created_by_fkey,
  add  constraint class_challenges_created_by_fkey
    foreign key (created_by) references auth.users(id) on delete set null;

alter table public.class_challenges
  drop constraint if exists class_challenges_winner_user_id_fkey,
  add  constraint class_challenges_winner_user_id_fkey
    foreign key (winner_user_id) references auth.users(id) on delete set null;

alter table public.class_challenges
  drop constraint if exists class_challenges_opponent_user_id_fkey,
  add  constraint class_challenges_opponent_user_id_fkey
    foreign key (opponent_user_id) references auth.users(id) on delete set null;

alter table public.business_grades
  drop constraint if exists business_grades_graded_by_fkey,
  add  constraint business_grades_graded_by_fkey
    foreign key (graded_by) references auth.users(id) on delete set null;
