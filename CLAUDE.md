# InvestiPlay: project rules for Claude

- Test accounts, the QA class, and the rules for autonomous sessions are in
  `docs/qa-accounts.md`. Read it before signing in anywhere or touching data.
- Never create auth users, apply SQL, or deploy edge functions without an
  explicit request in the current conversation.
- `npm run dev` (port 8080) bypasses auth with a fake local user. For anything
  that needs a real account, use `npm run dev:qa` (port 8084, real auth).
- Supabase types in `src/integrations/supabase/types.ts` predate the curriculum
  tables; use the loosely typed `db` export from
  `src/components/teacher/curation/api.ts` for those.
