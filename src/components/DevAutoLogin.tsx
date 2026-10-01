// DEV-ONLY: auto-signs a real Supabase session on localhost so the sign-in
// screen never appears during local development, and shows a small badge while
// active. Mounted from App.tsx only under DEV / the opt-in flag; it renders
// nothing (and does nothing) in production or when preconditions aren't met.
//
// It does NOT weaken auth: it calls the same public signInWithPassword as the
// login form, only when there is NO existing session, using credentials from
// local env vars. RLS and edge-function auth are untouched.

import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { devAutoLoginEnabled, getDevCreds } from "@/lib/devAutoLogin"

// Module-level guard so React StrictMode's double-mount (dev) can't fire two
// concurrent sign-in requests.
let attempted = false

export default function DevAutoLogin() {
  const navigate = useNavigate()
  const [active, setActive] = useState<null | { account: string; email: string }>(null)
  const ranRef = useRef(false)

  useEffect(() => {
    if (ranRef.current) return
    ranRef.current = true
    if (!devAutoLoginEnabled()) return

    void (async () => {
      const { data: { session } } = await supabase.auth.getSession()

      // Requirement: only auto-login when there is NO existing session.
      if (session?.user) {
        // A session established by a previous dev auto-login in this tab keeps
        // the badge visible after a refresh; a manually created session does not
        // get mislabeled.
        if (sessionStorage.getItem("dev_autologin")) {
          setActive({ account: sessionStorage.getItem("dev_autologin_as") || "teacher", email: session.user.email || "" })
        }
        return
      }

      if (attempted) return
      attempted = true

      const creds = getDevCreds(window.location.search)
      if (!creds) return // missing creds -> fall back to the normal login screen

      const { error } = await supabase.auth.signInWithPassword({
        email: creds.email,
        password: creds.password,
      })
      if (error) {
        console.warn(`[dev-autologin] sign-in failed (${creds.account}): ${error.message}`)
        return
      }

      sessionStorage.setItem("dev_autologin", "1")
      sessionStorage.setItem("dev_autologin_as", creds.account)
      setActive({ account: creds.account, email: creds.email })

      // Route to the right landing page, mirroring AppContext's post-login
      // routing (which doesn't fire on a programmatic sign-in off the /auth
      // page). Teachers -> dashboard; otherwise onboarding_complete decides.
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: profile } = await supabase
        .from("profiles")
        .select("role, onboarding_complete")
        .eq("id", user.id)
        .maybeSingle()
      if (profile?.role === "teacher") navigate("/teacher-dashboard", { replace: true })
      else if (profile?.onboarding_complete) navigate("/dashboard", { replace: true })
      else navigate("/onboarding", { replace: true })
    })()
  }, [navigate])

  if (!active) return null

  return (
    <div
      className="pointer-events-none fixed bottom-3 left-3 z-40 flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-100/95 px-2.5 py-1 text-[11px] font-medium text-amber-900 shadow-sm dark:border-amber-700 dark:bg-amber-950/90 dark:text-amber-200"
      title={active.email}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
      DEV auto-login · {active.account}
    </div>
  )
}
