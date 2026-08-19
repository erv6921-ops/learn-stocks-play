// Shared flag for the DEV auth bypass (see AppContext's hydrate effect).
//
// Under `npm run dev` the app auto-signs-in a throwaway, already-onboarded user
// with no real Supabase session. In that state every network *write* fails
// (RLS denies it), which floods the console and masks real errors. Local and
// localStorage state still work, so gameplay is unchanged; we simply skip the
// doomed persistence calls. `import.meta.env.DEV` is false in every production
// build, so this can never affect the deployed app.
//
// NOTE: the real-auth escape hatch (localStorage.investiplay_dev_real_auth)
// is intentionally disabled; auth is fully skipped on any dev server so
// localhost never shows a login screen. Re-add the flag check here if you
// ever need to exercise real Supabase auth locally again.
export const DEV_LOCAL_BYPASS = import.meta.env.DEV

// A syntactically valid placeholder UUID for the throwaway dev user, so any
// read that does reach the DB fails on RLS (empty result) rather than on uuid
// syntax (a 400 that spams the console).
export const DEV_LOCAL_USER_ID = "00000000-0000-4000-8000-0000000000de"
