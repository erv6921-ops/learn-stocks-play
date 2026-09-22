# QA accounts and autonomy rules

Permanent test accounts on the pilot Supabase project (`vcjdshippmqopaffuzbw`).
Passwords are NOT in the repo: they live in `.env.local` (gitignored) as
`QA_TEACHER_PASSWORD` / `QA_STUDENT_PASSWORD`.

| Role    | Email                          | Notes                                              |
|---------|--------------------------------|----------------------------------------------------|
| Teacher | `qa-teacher@investiplay.test`  | Owns the class "QA Playtest Class", join code `QATEST` |
| Student | `qa-fresh@investiplay.test`    | First-session persona for `.claude/agents/student-playtester.md` |
| Student | `qa-s1@investiplay.test` … `qa-s5@investiplay.test` | Five more students for concurrent playtests (`QA_S1_PASSWORD` … `QA_S5_PASSWORD` in `.env.local`) |

Older `1@`, `3@`, `4@investiplay.test` students also exist (passwords unknown; leave them alone).

## Rules for automated sessions (Claude, playtester agents, scripts)

1. Sign in only with `@investiplay.test` accounts. Never create new auth users
   without being asked first (sign-up sends a real confirmation email).
2. Touch only rows owned by the QA accounts: their profiles, progress, holdings,
   the QA class and its assignments, and curriculum uploads whose
   `teacher_id` is the QA teacher. Never read or change a real teacher's or
   student's data.
3. Schema changes (`sql/*.sql`, `supabase/migrations`) and edge-function
   deploys only when explicitly requested in the conversation.
4. Local target for QA is `http://localhost:8084`, started with `npm run dev:qa`
   (`VITE_REAL_AUTH=1`): real Supabase auth, onboarding and persistence, so the
   QA accounts actually get used. Plain `npm run dev` on 8080 force-signs-in a
   fake "Dev" user and skips all writes; it is useless for account-based QA.
   Never point a browser session at a production URL.
5. Cleanup: to reset the QA student, delete its `lesson_progress`,
   `assigned_lessons`-related progress, holdings and set `profiles.jeffs_balance`
   back to 0 by SQL. Do not delete the auth user (the `delete-account` function
   fails for teachers who own curriculum rows, see the 2026-09-19 note in memory).

## Dev login bookmark

`/dev/teacher-login?email=<email>&password=<password>` signs in with the given
credentials and lands on the teacher dashboard. It is only registered in DEV
builds. Keep the URL in a bookmark, not in the repo.
