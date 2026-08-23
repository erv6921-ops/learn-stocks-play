import { useEffect, useRef } from "react"
import { useApp } from "@/contexts/AppContext"
import { supabase } from "@/integrations/supabase/client"
import { DEV_LOCAL_BYPASS } from "@/lib/devBypass"
import { Ability, DEFAULT_ABILITY, Observation, updateTheta } from "@/lib/adaptiveEngine"

// Don't write to the DB on every question - that's a network round-trip per
// answer. Instead flush the estimate a few seconds after the last answer, on
// in-app lesson exit (unmount), AND on tab hide / close. The last of these is
// the important one: React's unmount cleanup does NOT run on a hard tab close /
// refresh / browser quit, so a debounced write pending at close would be lost.
// pagehide + visibilitychange cover that, using fetch keepalive (sendBeacon
// can't send the Authorization/apikey headers PostgREST needs).
const PERSIST_DEBOUNCE_MS = 4000

// Opt-in tracing so the persistence path can be watched in the browser console,
// in dev automatically or in a preview/prod build via localStorage.ability_debug=1.
const DEBUG =
  (typeof import.meta !== "undefined" && (import.meta as any).env?.DEV) ||
  (typeof localStorage !== "undefined" && localStorage.getItem("ability_debug") === "1")
const dbg = (...args: unknown[]) => { if (DEBUG) console.debug("[useAbility]", ...args) }

const REST_URL = (import.meta as any).env?.VITE_SUPABASE_URL as string | undefined
const ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY as string | undefined

export interface AbilityHandle {
  /** Fold one answer into the live estimate (and schedule a debounced persist). */
  record: (obs: Observation) => void
  /** Current ability point estimate (theta), read fresh from the live ref. */
  getTheta: () => number
  /** How many answers have been folded into the estimate this session. */
  getAttempts: () => number
  /** Force an immediate persist (e.g. on lesson completion). */
  persist: () => void
}

/**
 * Loads a student's per-topic ability (theta/se) from Supabase on lesson entry,
 * holds it in memory, updates it with each answer via the pure adaptive engine,
 * and persists it back on exit (debounced, on unmount, and on tab hide/close).
 * Keyed on `concept` (lesson.category for now). Cold start (no row, or fetch
 * unresolved) uses the DEFAULT prior, which is exactly today's behavior.
 *
 * Persistence is a no-op under DEV_LOCAL_BYPASS or without a signed-in user:
 * the local dev user is a throwaway placeholder with no real JWT, so every
 * write would fail RLS - matching the app's other student-scoped writes
 * (question_attempts, activity). Persistence can only be exercised against a
 * real authenticated session (a preview/prod build with a real login).
 */
export function useAbility(concept?: string): AbilityHandle {
  const { user } = useApp()

  const abilityRef = useRef<Ability>(DEFAULT_ABILITY)
  const attemptsRef = useRef(0)
  const dirtyRef = useRef(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()
  // Access token kept current so the unload flush can build an authed request
  // synchronously (auth.getSession() is async and unreliable during unload).
  const tokenRef = useRef<string | undefined>()

  // Identity read from refs so the unmount persist (which captures the first
  // render's closure) still sees the latest user/concept.
  const userIdRef = useRef(user?.id)
  userIdRef.current = user?.id
  const conceptRef = useRef(concept)
  conceptRef.current = concept

  // ─── Keep the access token fresh for the keepalive unload flush ───
  useEffect(() => {
    if (DEV_LOCAL_BYPASS) return
    supabase.auth.getSession().then(({ data }) => { tokenRef.current = data.session?.access_token })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      tokenRef.current = session?.access_token
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  // ─── Load on lesson entry ───
  useEffect(() => {
    // Reset to the prior for a new user/concept until the load resolves.
    abilityRef.current = DEFAULT_ABILITY
    attemptsRef.current = 0
    dirtyRef.current = false
    if (!user?.id || !concept || DEV_LOCAL_BYPASS) {
      if (DEV_LOCAL_BYPASS) dbg("load skipped: DEV_LOCAL_BYPASS (no persistence in dev)")
      return
    }
    let cancelled = false
    ;(supabase as any)
      .from("student_ability")
      .select("theta, se, attempts")
      .eq("user_id", user.id)
      .eq("concept", concept)
      .maybeSingle()
      .then(({ data, error }: { data: { theta: number; se: number; attempts: number } | null; error: unknown }) => {
        if (cancelled || error || !data) return
        abilityRef.current = { theta: data.theta, se: data.se }
        attemptsRef.current = data.attempts ?? 0
        dbg("loaded", { concept, ...data })
      })
    return () => { cancelled = true }
  }, [user?.id, concept])

  const rowPayload = () => ({
    user_id: userIdRef.current,
    concept: conceptRef.current,
    theta: abilityRef.current.theta,
    se: abilityRef.current.se,
    attempts: attemptsRef.current,
    updated_at: new Date().toISOString(),
  })

  // Normal (page-alive) persist via supabase-js.
  const persist = () => {
    if (!dirtyRef.current || !userIdRef.current || !conceptRef.current || DEV_LOCAL_BYPASS) {
      if (dirtyRef.current && DEV_LOCAL_BYPASS) dbg("persist skipped: DEV_LOCAL_BYPASS")
      return
    }
    dirtyRef.current = false
    const row = rowPayload()
    dbg("persist ->", { theta: row.theta, attempts: row.attempts })
    ;(supabase as any)
      .from("student_ability")
      .upsert(row, { onConflict: "user_id,concept" })
      .then(({ error }: { error: unknown }) => {
        if (error) console.error("[student_ability upsert]", error)
      })
  }

  // Unload flush via fetch keepalive - survives a hard tab close, and can set
  // the apikey/Authorization headers that navigator.sendBeacon cannot.
  const keepaliveFlush = () => {
    if (!dirtyRef.current || !userIdRef.current || !conceptRef.current || DEV_LOCAL_BYPASS) return
    if (!REST_URL || !ANON_KEY || !tokenRef.current) { dbg("keepalive skipped: no token/url yet"); return }
    dirtyRef.current = false
    const row = rowPayload()
    dbg("keepalive flush ->", { theta: row.theta, attempts: row.attempts })
    try {
      fetch(`${REST_URL}/rest/v1/student_ability?on_conflict=user_id,concept`, {
        method: "POST",
        keepalive: true,
        headers: {
          "Content-Type": "application/json",
          apikey: ANON_KEY,
          Authorization: `Bearer ${tokenRef.current}`,
          Prefer: "resolution=merge-duplicates",
        },
        body: JSON.stringify([row]),
      }).catch((e) => dbg("keepalive fetch error", e))
    } catch (e) {
      dbg("keepalive threw", e)
    }
  }

  const record = (obs: Observation) => {
    abilityRef.current = updateTheta(abilityRef.current, obs)
    attemptsRef.current += 1
    dirtyRef.current = true
    dbg("record", { theta: abilityRef.current.theta.toFixed(3), attempts: attemptsRef.current })
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(persist, PERSIST_DEBOUNCE_MS)
  }

  // Flush on tab hide / close (the case React unmount misses) and on in-app
  // unmount (React Router navigation). visibilitychange:hidden fires on tab
  // close, tab switch, and mobile background; pagehide covers unload/bfcache.
  useEffect(() => {
    const onHidden = () => { if (document.visibilityState === "hidden") keepaliveFlush() }
    window.addEventListener("pagehide", keepaliveFlush)
    document.addEventListener("visibilitychange", onHidden)
    return () => {
      window.removeEventListener("pagehide", keepaliveFlush)
      document.removeEventListener("visibilitychange", onHidden)
      clearTimeout(debounceRef.current)
      persist() // in-app unmount: page still alive, supabase-js completes fine
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    record,
    getTheta: () => abilityRef.current.theta,
    getAttempts: () => attemptsRef.current,
    persist,
  }
}
