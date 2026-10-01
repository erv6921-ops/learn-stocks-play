// DEV-ONLY: localhost auto-login helpers (see components/DevAutoLogin.tsx).
//
// Signs a real Supabase session in automatically on localhost so a developer
// never sees the sign-in screen under `npm run dev:qa` (real auth). It does NOT
// touch real auth, RLS, or edge-function checks: it just calls the same public
// signInWithPassword the login form uses, with credentials read from local env
// vars (never hardcoded, never committed).
//
// Deliberately SKIPPED when the fake-user bypass is active (`npm run dev` on
// 8080, DEV_LOCAL_BYPASS): that mode already shows no login screen and has no
// real session, so signing one in would fight the fake user.

import { DEV_LOCAL_BYPASS } from "@/lib/devBypass"

type DevAccount = "teacher" | "student"

/** True only on a local dev host. */
function isLocalhost(): boolean {
  const h = window.location.hostname
  return h === "localhost" || h === "127.0.0.1"
}

/**
 * Whether dev auto-login is eligible to run at all: local host, dev build (or
 * the explicit opt-in flag), and NOT the fake-user bypass.
 */
export function devAutoLoginEnabled(): boolean {
  const flagged = import.meta.env.DEV || import.meta.env.VITE_DEV_AUTOLOGIN === "true"
  return isLocalhost() && flagged && !DEV_LOCAL_BYPASS
}

export interface DevCreds {
  account: DevAccount
  email: string
  password: string
}

/**
 * The credentials to use, chosen by the `?as=` query param. `?as=student` uses
 * the student vars; anything else (or absent) uses the default (teacher) vars.
 * Returns null when the chosen pair isn't fully configured, so the caller falls
 * back to the normal login screen.
 */
export function getDevCreds(search: string): DevCreds | null {
  const params = new URLSearchParams(search)
  const account: DevAccount = params.get("as") === "student" ? "student" : "teacher"

  const email =
    account === "student"
      ? import.meta.env.VITE_DEV_STUDENT_EMAIL
      : import.meta.env.VITE_DEV_LOGIN_EMAIL
  const password =
    account === "student"
      ? import.meta.env.VITE_DEV_STUDENT_PASSWORD
      : import.meta.env.VITE_DEV_LOGIN_PASSWORD

  if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
    return null
  }
  return { account, email, password }
}
