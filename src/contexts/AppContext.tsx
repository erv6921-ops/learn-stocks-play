import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { UserProfile, LessonProgress, Token, StockHolding, MasteryTier, EnrollmentTrack } from "@/types"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { recordMoneyEvent } from "@/lib/notifications"
import { DEV_LOCAL_BYPASS, DEV_LOCAL_USER_ID } from "@/lib/devBypass"
import { isExplicitlyNonFlorida } from "@/lib/geography"

interface UnitTestProgress {
  category: string
  completed: boolean
  score: number
  completedAt?: Date
}

interface JeffsHistoryEntry {
  amount: number
  reason: string
  date: Date
}

interface AppContextType {
  user: UserProfile | null
  authReady: boolean
  setUser: (user: UserProfile | null) => void
  lessonProgress: LessonProgress[]
  updateLessonProgress: (lessonId: string, completed: boolean, quizScore?: number, progressPercent?: number) => void
  tokens: Token[]
  addToken: (token: Omit<Token, "id" | "createdAt" | "priceSimulation" | "marketCap">) => void
  watchlist: string[]
  addToWatchlist: (symbol: string) => void
  removeFromWatchlist: (symbol: string) => void
  resetOnboarding: () => void
  logout: () => Promise<void>
  jeffsBalance: number
  earnJeffs: (amount: number, reason: string) => void
  awardJeffs: (amount: number, reason: string) => void
  spendJeffs: (amount: number, reason: string) => boolean
  jeffsHistory: JeffsHistoryEntry[]
  unitTestProgress: UnitTestProgress[]
  updateUnitTestProgress: (category: string, completed: boolean, score: number) => void
  portfolio: StockHolding[]
  buyStock: (symbol: string, shares: number, pricePerShare: number) => boolean
  sellStock: (symbol: string, shares: number, pricePerShare: number) => boolean
  getHolding: (symbol: string) => StockHolding | undefined
  getRewardMultiplier: () => number
}

const AppContext = createContext<AppContextType | undefined>(undefined)

// Small helper: localStorage cache (used for guests / quick reload before
// the DB hydrate completes). Once authenticated, DB is the source of truth.
const ls = {
  get<T>(key: string, fallback: T): T {
    try {
      const v = localStorage.getItem(key)
      return v ? (JSON.parse(v) as T) : fallback
    } catch { return fallback }
  },
  set(key: string, value: unknown) {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
  },
  del(key: string) { try { localStorage.removeItem(key) } catch {} },
}

// One-time "welcome / thanks for logging in" gift from Jeff. Granted once ever,
// gated by the presence of this exact reason in the coin ledger (see hydrate).
const WELCOME_GIFT_AMOUNT = 15
const WELCOME_GIFT_REASON = "Welcome gift from Jeff 🎉"

const ENROLLMENT_TRACKS: EnrollmentTrack[] = ["regular", "biz_lab", "gulliver_intro"]

// Resolve a profile row to its enrollment track. Reads the new profiles.track
// enum, falling back to the legacy biz_lab_enrolled boolean for rows written
// before the enum migration (or fetched before it ran).
//
// Safety clamp: biz_lab and gulliver_intro are Florida-only. If a profile is on
// one of those but its geography is an EXPLICIT non-Florida state, clamp to
// "regular". NULL/empty state_course is grandfathered (was write-only until now,
// so absent data means "never captured", not "not Florida") - see isExplicitlyNonFlorida.
function resolveTrack(profile: any): EnrollmentTrack {
  const t = profile?.track as EnrollmentTrack | undefined
  const resolved: EnrollmentTrack = (t && ENROLLMENT_TRACKS.includes(t))
    ? t
    : (profile?.biz_lab_enrolled ? "biz_lab" : "regular")
  if ((resolved === "biz_lab" || resolved === "gulliver_intro") && isExplicitlyNonFlorida(profile?.state_course)) {
    return "regular"
  }
  return resolved
}

// Onboarding records the program choice in localStorage *before* the account
// has a session (email-confirmation signups bounce to /auth first). On the
// first authenticated hydrate we flush that pending choice to the profile and
// clear the flag, so picking "Gulliver Introduction to Business" (or Biz Lab)
// survives the round-trip. biz_lab_enrolled is kept in sync for the rollback path.
function applyPendingTrack(uid: string, current: EnrollmentTrack): EnrollmentTrack {
  let pending: string | null = null
  try { pending = localStorage.getItem("investiplay_track_pending") } catch {}
  if (!pending || !ENROLLMENT_TRACKS.includes(pending as EnrollmentTrack)) return current
  const want = pending as EnrollmentTrack
  if (want !== current) {
    supabase.from("profiles").update({ track: want, biz_lab_enrolled: want === "biz_lab" }).eq("id", uid).then(({ error }) => {
      if (error) console.error("[track pending apply]", error)
    })
  }
  try { localStorage.removeItem("investiplay_track_pending") } catch {}
  return want
}

// Every per-user localStorage key. Cleared on logout / sign-out so one
// account's cached data never bleeds into the next session on a shared device.
const USER_KEYS = [
  "investiplay_user",
  "investiplay_progress",
  "investiplay_tokens",
  "investiplay_watchlist",
  "investiplay_jeffs_balance",
  "investiplay_jeffs_history",
  "investiplay_unit_tests",
  "investiplay_portfolio",
]

export function AppProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [authReady, setAuthReady] = useState(false)
  const [user, setUserState] = useState<UserProfile | null>(() => ls.get("investiplay_user", null))
  const [lessonProgress, setLessonProgress] = useState<LessonProgress[]>(() => ls.get("investiplay_progress", []))
  const [tokens, setTokens] = useState<Token[]>(() => ls.get("investiplay_tokens", []))
  const [watchlist, setWatchlist] = useState<string[]>(() => ls.get("investiplay_watchlist", []))
  const [jeffsBalance, setJeffsBalance] = useState<number>(() => ls.get("investiplay_jeffs_balance", 0))
  const [jeffsHistory, setJeffsHistory] = useState<JeffsHistoryEntry[]>(() => ls.get("investiplay_jeffs_history", []))
  const [unitTestProgress, setUnitTestProgress] = useState<UnitTestProgress[]>(() => ls.get("investiplay_unit_tests", []))
  const [portfolio, setPortfolio] = useState<StockHolding[]>(() => ls.get("investiplay_portfolio", []))

  // Track the currently-signed-in user id so writes can target the right rows.
  const userIdRef = useRef<string | null>(null)
  const authReadyRef = useRef(false)
  // Guards the one-time welcome gift against a double-grant when hydrate runs
  // twice on initial load (getSession + onAuthStateChange both fire) before the
  // first ledger row lands. The ledger check handles cross-session idempotency;
  // this handles the within-session race.
  const welcomeGiftedRef = useRef(false)

  const setUser = (newUser: UserProfile | null) => {
    setUserState(newUser)
    if (newUser) ls.set("investiplay_user", newUser); else ls.del("investiplay_user")
  }

  // Wipe all in-memory + cached per-user state. Used on logout and whenever
  // the Supabase session ends (including sign-out from another tab).
  const clearLocalData = () => {
    userIdRef.current = null
    setUserState(null)
    setLessonProgress([])
    setTokens([])
    setWatchlist([])
    setJeffsBalance(0)
    setJeffsHistory([])
    setUnitTestProgress([])
    setPortfolio([])
    USER_KEYS.forEach(k => ls.del(k))
  }

  // Real logout: end the Supabase session first (so a refresh can't restore
  // it), then clear local state. Callers should redirect to /auth after.
  const logout = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error("[AppContext] signOut failed", error)
    }
    clearLocalData()
  }

  // ───────────────────────────────────────────────────────────
  // Auth → hydrate all per-user data from the database
  // ───────────────────────────────────────────────────────────
  useEffect(() => {
    // ─── DEV-ONLY: skip auth + onboarding for local testing ───
    // import.meta.env.DEV is true under `npm run dev` and FALSE in every
    // production build, so this can never affect the deployed app. Signs you in
    // as a throwaway, already-onboarded local user. To use real auth on the dev
    // server, set localStorage.investiplay_dev_real_auth = "1".
    if (DEV_LOCAL_BYPASS) {
      userIdRef.current = DEV_LOCAL_USER_ID
      authReadyRef.current = true
      setUser({
        id: DEV_LOCAL_USER_ID,
        firstName: "Dev",
        age: 16,
        schoolName: "Localhost High",
        grade: 11,
        literacyLevel: "explorer",
        onboardingComplete: true,
        assessmentScore: 0,
        benchmarkScores: {},
        benchmarkCategoryScores: {},
        rewardMultiplier: 1,
        // Enroll the throwaway dev user in the Gulliver Intro track so localhost
        // lands straight in the six-block course with no auth/onboarding. Florida
        // geography so it's explicitly eligible for the Florida-only tracks.
        track: "gulliver_intro",
        stateCourse: "Florida",
        createdAt: new Date(),
      })
      setAuthReady(true)
      return
    }

    const withTimeout = <T,>(p: PromiseLike<T>, ms = 5000): Promise<T | null> =>
      Promise.race([
        Promise.resolve(p),
        new Promise<null>(resolve => setTimeout(() => resolve(null), ms)),
      ])

    const safeQuery = async <T,>(p: PromiseLike<T>, ms = 5000): Promise<T | null> => {
      try {
        return await withTimeout(p, ms)
      } catch (error) {
        console.error("[AppContext] Hydration query failed", error)
        return null
      }
    }

    // Fetch the FULL jeffs_history ledger, paginating past Supabase's implicit
    // 1000-row cap so the summed InvestiCoin balance never undercounts once a
    // user exceeds 1000 ledger entries (which would diverge from the
    // server/leaderboard, whose balance is also SUM(jeffs_history.amount)).
    // Returns null on any failure so the caller can keep the last-known balance
    // rather than corrupting it with a partial/empty sum.
    const fetchFullJeffsHistory = async (uid: string): Promise<any[] | null> => {
      const pageSize = 1000
      const rows: any[] = []
      for (let from = 0; ; from += pageSize) {
        const res = await safeQuery(
          supabase
            .from("jeffs_history")
            .select("*")
            .eq("user_id", uid)
            .order("created_at", { ascending: true })
            .range(from, from + pageSize - 1)
        )
        if (!res?.data) return null // transient failure - don't reconcile with a partial ledger
        rows.push(...res.data)
        if (res.data.length < pageSize) break
      }
      return rows
    }

    const hydrate = async (uid: string) => {
      userIdRef.current = uid

      const cachedUser = ls.get<UserProfile | null>("investiplay_user", null)
      if (!cachedUser) {
        setUser({
          id: uid,
          age: 14,
          schoolName: "",
          grade: 9,
          literacyLevel: "explorer",
          onboardingComplete: false,
          assessmentScore: 0,
          benchmarkScores: {},
          benchmarkCategoryScores: {},
          rewardMultiplier: 1,
          createdAt: new Date(),
        })
      }

      const [profileRes, lessonsRes, unitTestsRes, jeffsHistoryRows, portfolioRes, watchlistRes, tokensRes] = await Promise.all([
        safeQuery(supabase.from("profiles").select("*").eq("id", uid).maybeSingle()),
        safeQuery(supabase.from("lesson_progress").select("*").eq("user_id", uid)),
        safeQuery(supabase.from("unit_test_progress").select("*").eq("user_id", uid)),
        fetchFullJeffsHistory(uid),
        safeQuery(supabase.from("portfolio").select("*").eq("user_id", uid)),
        safeQuery(supabase.from("watchlist").select("*").eq("user_id", uid)),
        safeQuery(supabase.from("user_tokens").select("*").eq("user_id", uid)),
      ])

      const profile = profileRes?.data
      if (profile) {
        const hydrated: UserProfile = {
          id: profile.id,
          firstName: profile.first_name ?? undefined,
          lastName: profile.last_name ?? undefined,
          classCode: profile.class_code ?? undefined,
          age: profile.age ?? 14,
          schoolName: profile.school_name ?? "",
          grade: profile.grade ?? 9,
          literacyLevel: (profile.literacy_level as MasteryTier) ?? "explorer",
          role: (profile.role as "student" | "teacher" | null) ?? null,
          onboardingComplete: !!profile.onboarding_complete,
          assessmentScore: profile.assessment_score ?? 0,
          benchmarkScores: (profile.benchmark_scores as any) ?? {},
          benchmarkCategoryScores: (profile.benchmark_category_scores as any) ?? {},
          rewardMultiplier: profile.reward_multiplier ?? 1,
          track: applyPendingTrack(uid, resolveTrack(profile)),
          assigned_track: (profile.assigned_track as EnrollmentTrack | null) ?? undefined,
          stateCourse: profile.state_course ?? undefined,
          createdAt: new Date(profile.created_at ?? Date.now()),
        }
        setUser(hydrated)
      }

      if (lessonsRes?.data) {
        const lp: LessonProgress[] = lessonsRes.data.map((r: any) => ({
          lessonId: r.lesson_id,
          completed: r.completed,
          quizScore: r.quiz_score ?? undefined,
          completedAt: r.completed_at ? new Date(r.completed_at) : undefined,
          progressPercent: r.progress_percent ?? undefined,
        }))
        setLessonProgress(lp)
        ls.set("investiplay_progress", lp)
      }

      if (unitTestsRes?.data) {
        const ut: UnitTestProgress[] = unitTestsRes.data.map((r: any) => ({
          category: r.category,
          completed: r.completed,
          score: r.score,
          completedAt: r.completed_at ? new Date(r.completed_at) : undefined,
        }))
        setUnitTestProgress(ut)
        ls.set("investiplay_unit_tests", ut)
      }

      // Only reconcile when the fetch succeeded. On a transient failure
      // (jeffsHistoryRows === null) we leave both jeffsHistory and the balance
      // at their last-known localStorage values so the counter never
      // flickers to a stale/zero number; a later successful load reconciles.
      if (jeffsHistoryRows) {
        const h: JeffsHistoryEntry[] = jeffsHistoryRows.map((r: any) => ({
          amount: r.amount,
          reason: r.reason,
          date: new Date(r.created_at),
        }))
        setJeffsHistory(h)
        ls.set("investiplay_jeffs_history", h)
        // The balance is summed over the FULL paginated ledger (see
        // fetchFullJeffsHistory), so it stays the true source of truth and
        // matches the server/leaderboard even beyond 1000 entries.
        const balance = h.reduce((sum, e) => sum + e.amount, 0)
        setJeffsBalance(balance)
        ls.set("investiplay_jeffs_balance", balance)

        // One-time welcome gift: the first time a user's ledger has no welcome
        // entry, Jeff hands them coins for signing in. Keying off the ledger
        // (the synced source of truth) makes it idempotent - granted once, ever,
        // even across devices and reinstalls. awardJeffs appends its own ledger
        // row + fires the coin notification.
        if (!welcomeGiftedRef.current && !h.some(e => e.reason === WELCOME_GIFT_REASON)) {
          welcomeGiftedRef.current = true
          awardJeffs(WELCOME_GIFT_AMOUNT, WELCOME_GIFT_REASON)
          toast.success(`Jeff gifted you ${WELCOME_GIFT_AMOUNT} coins for signing in! 🎉`, { duration: 5000 })
        }
      }

      if (portfolioRes?.data) {
        const pf: StockHolding[] = portfolioRes.data.map((r: any) => ({
          symbol: r.symbol,
          shares: Number(r.shares),
          purchasePrice: Number(r.purchase_price),
          purchasedAt: new Date(r.purchased_at),
        }))
        setPortfolio(pf)
        ls.set("investiplay_portfolio", pf)
      }

      if (watchlistRes?.data) {
        const wl = watchlistRes.data.map((r: any) => r.symbol)
        setWatchlist(wl)
        ls.set("investiplay_watchlist", wl)
      }

      if (tokensRes?.data) {
        const tk: Token[] = tokensRes.data.map((r: any) => ({
          id: r.id,
          name: r.name,
          symbol: r.symbol,
          totalSupply: Number(r.total_supply),
          createdAt: new Date(r.created_at),
          priceSimulation: Number(r.price_simulation),
          marketCap: Number(r.market_cap),
        }))
        setTokens(tk)
        ls.set("investiplay_tokens", tk)
      }
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        // Supabase re-emits SIGNED_IN whenever the tab regains focus, not just
        // on a real login. Track the previous user so we only run post-login
        // routing when the signed-in user actually changes - otherwise leaving
        // and returning to the app would yank people back to the dashboard.
        //
        // But an explicit login from the /auth page must always route, even when
        // a session for that same user was still persisted (so userIdRef already
        // matches and isNewSignIn would be false). Capture that synchronously
        // here, before the async profile lookup, since the route is still /auth.
        //
        // On a full page refresh, userIdRef resets to null (fresh JS context), so
        // a session restore looks like "null -> userId", i.e. a user change. We
        // must NOT treat that as a login, or every refresh yanks the user to the
        // dashboard. So the "user changed" branch requires a non-null previous id
        // (a real account switch within a live session); refresh restores fall
        // through to onAuthPage, which is false off the /auth page → stay put.
        const previousUserId = userIdRef.current
        const onAuthPage = window.location.pathname.startsWith("/auth")
        const shouldRoute = onAuthPage || (previousUserId !== null && previousUserId !== session.user.id)
        authReadyRef.current = true
        setAuthReady(true)
        userIdRef.current = session.user.id
        void (async () => {
          const { data: existingUser } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .maybeSingle()
          if (existingUser) {
            setUser({
              id: existingUser.id,
              firstName: existingUser.first_name ?? undefined,
              lastName: existingUser.last_name ?? undefined,
              classCode: existingUser.class_code ?? undefined,
              age: existingUser.age ?? 14,
              schoolName: existingUser.school_name ?? "",
              grade: existingUser.grade ?? 9,
              literacyLevel: (existingUser.literacy_level as MasteryTier) ?? "explorer",
              role: (existingUser.role as "student" | "teacher" | null) ?? null,
              onboardingComplete: true,
              assessmentScore: existingUser.assessment_score ?? 0,
              benchmarkScores: (existingUser.benchmark_scores as any) ?? {},
              benchmarkCategoryScores: (existingUser.benchmark_category_scores as any) ?? {},
              rewardMultiplier: existingUser.reward_multiplier ?? 1,
              track: applyPendingTrack(session.user.id, resolveTrack(existingUser)),
              assigned_track: (existingUser.assigned_track as EnrollmentTrack | null) ?? undefined,
              stateCourse: existingUser.state_course ?? undefined,
              createdAt: new Date(existingUser.created_at ?? Date.now()),
            })
          } else {
            setUser({
              id: session.user.id,
              age: 14,
              schoolName: "",
              grade: 9,
              literacyLevel: "explorer",
              onboardingComplete: false,
              assessmentScore: 0,
              benchmarkScores: {},
              benchmarkCategoryScores: {},
              rewardMultiplier: 1,
              createdAt: new Date(),
            })
          }

          // Single source of truth for post-login routing. Do not add routing
          // logic in Auth.tsx, Onboarding.tsx, or any other file.
          //
          // Only on a fresh sign-in (login or email-confirmation), never on
          // page-refresh session restore, so it doesn't yank users off their
          // current page. Teachers go to their dashboard; otherwise
          // onboarding_complete decides between /dashboard and /onboarding.
          if (event === "SIGNED_IN" && shouldRoute) {
            if (existingUser?.role === "teacher") {
              navigate("/teacher-dashboard", { replace: true })
            } else if (existingUser?.onboarding_complete) {
              navigate("/dashboard", { replace: true })
            } else {
              navigate("/onboarding", { replace: true })
            }
          }
        })()
        // Defer to avoid deadlocks inside the listener
        setTimeout(() => { void hydrate(session.user.id) }, 0)
      } else if (authReadyRef.current) {
        clearLocalData()
      }
    })

    withTimeout(supabase.auth.getSession(), 4000).then((result) => {
      const session = result?.data.session
      if (!session?.user) {
        userIdRef.current = null
        setUserState(null)
        ls.del("investiplay_user")
      } else {
        userIdRef.current = session.user.id
        void hydrate(session.user.id)
      }
      authReadyRef.current = true
      setAuthReady(true)
    }).catch((error) => {
      console.error("[AppContext] Auth session restore failed", error)
      userIdRef.current = null
      setUserState(null)
      ls.del("investiplay_user")
      authReadyRef.current = true
      setAuthReady(true)
    })

    return () => subscription.unsubscribe()
  }, [])

  // ───────────────────────────────────────────────────────────
  // Mutations: update local state immediately, persist to DB
  // ───────────────────────────────────────────────────────────

  // Returns the id to persist under, or null when persistence should be
  // skipped (DEV bypass has no real session). Every mutation below gates its
  // network write on this, so local state still updates in dev.
  const persistUid = (): string | null =>
    DEV_LOCAL_BYPASS ? null : userIdRef.current

  const updateLessonProgress = (lessonId: string, completed: boolean, quizScore?: number, progressPercent?: number) => {
    const now = completed ? new Date() : undefined
    // Completing a lesson is 100% by definition. Otherwise use the caller's
    // section percentage; if none is given (e.g. a legacy "content viewed"
    // call), keep whatever we already have so we never move the bar backwards.
    let persistedPercent: number | undefined
    setLessonProgress(prev => {
      const existing = prev.find(p => p.lessonId === lessonId)
      persistedPercent = completed ? 100 : (progressPercent ?? existing?.progressPercent)
      const updated = existing
        ? prev.map(p => p.lessonId === lessonId ? { ...p, completed, quizScore, completedAt: now, progressPercent: persistedPercent } : p)
        : [...prev, { lessonId, completed, quizScore, completedAt: now, progressPercent: persistedPercent }]
      ls.set("investiplay_progress", updated)
      return updated
    })
    const uid = persistUid()
    if (uid) {
      const payload: Record<string, unknown> = {
        user_id: uid,
        lesson_id: lessonId,
        completed,
        quiz_score: quizScore ?? null,
        completed_at: now?.toISOString() ?? null,
      }
      // Only write the percent when we have one, so partial updates don't
      // overwrite the stored value with null on the conflicting row.
      if (persistedPercent !== undefined) payload.progress_percent = persistedPercent
      supabase.from("lesson_progress").upsert(payload, { onConflict: "user_id,lesson_id" }).then(({ error }) => {
        if (error) console.error("[lesson_progress upsert]", error)
      })
    }
  }

  const updateUnitTestProgress = (category: string, completed: boolean, score: number) => {
    const now = completed ? new Date() : undefined
    setUnitTestProgress(prev => {
      const existing = prev.find(p => p.category === category)
      const updated = existing
        ? prev.map(p => p.category === category ? { ...p, completed, score, completedAt: now } : p)
        : [...prev, { category, completed, score, completedAt: now }]
      ls.set("investiplay_unit_tests", updated)
      return updated
    })
    const uid = persistUid()
    if (uid) {
      supabase.from("unit_test_progress").upsert({
        user_id: uid, category, completed, score,
        completed_at: now?.toISOString() ?? null,
      }, { onConflict: "user_id,category" }).then(({ error }) => {
        if (error) console.error("[unit_test_progress upsert]", error)
      })
    }
  }

  const getRewardMultiplier = (): number => {
    if (!user) return 1.0
    if (typeof user.rewardMultiplier === "number") return user.rewardMultiplier
    if (typeof user.assessmentScore !== "number") return 1.0
    const normalizedScore = user.assessmentScore > 1.5 ? Math.min(user.assessmentScore, 100) : user.assessmentScore * 100
    return Math.min(1 + normalizedScore / 200, 1.5)
  }

  const persistBalance = (newBalance: number) => {
    ls.set("investiplay_jeffs_balance", newBalance)
    const uid = persistUid()
    if (uid) {
      supabase.from("profiles").update({ jeffs_balance: newBalance }).eq("id", uid).then(({ error }) => {
        if (error) console.error("[jeffs_balance update]", error)
      })
    }
  }

  const recordHistory = (entry: JeffsHistoryEntry) => {
    // Surface this coin movement in the notification center (bell in the nav).
    // entry.amount is already signed: positive = gained, negative = spent/lost.
    recordMoneyEvent(entry.amount, entry.reason)
    setJeffsHistory(prev => {
      const next = [...prev, entry]
      ls.set("investiplay_jeffs_history", next)
      return next
    })
    const uid = persistUid()
    if (uid) {
      supabase.from("jeffs_history").insert({
        user_id: uid, amount: entry.amount, reason: entry.reason,
      }).then(({ error }) => { if (error) console.error("[jeffs_history insert]", error) })
    }
  }

  const earnJeffs = (amount: number, reason: string) => {
    const multiplier = getRewardMultiplier()
    const scaledAmount = Math.round(amount * multiplier)
    setJeffsBalance(prev => {
      const newBalance = prev + scaledAmount
      persistBalance(newBalance)
      return newBalance
    })
    recordHistory({ amount: scaledAmount, reason, date: new Date() })
  }

  // Credit an exact coin amount with no reward-multiplier scaling. Used for
  // fixed payouts like challenge pots and refunds, where the amount is final.
  const awardJeffs = (amount: number, reason: string) => {
    if (!Number.isFinite(amount) || amount === 0) return
    setJeffsBalance(prev => {
      const newBalance = prev + amount
      persistBalance(newBalance)
      return newBalance
    })
    recordHistory({ amount, reason, date: new Date() })
  }

  const spendJeffs = (amount: number, reason: string): boolean => {
    if (jeffsBalance < amount) return false
    setJeffsBalance(prev => {
      const newBalance = prev - amount
      persistBalance(newBalance)
      return newBalance
    })
    recordHistory({ amount: -amount, reason, date: new Date() })
    return true
  }

  const buyStock = (symbol: string, shares: number, pricePerShare: number): boolean => {
    // Reject trades with no valid live price or non-positive share count -
    // otherwise a failed quote (price 0/NaN) would grant free shares.
    if (!Number.isFinite(pricePerShare) || pricePerShare <= 0 || !Number.isFinite(shares) || shares <= 0) return false
    const totalCost = Math.round(shares * pricePerShare * 100) / 100
    if (jeffsBalance < totalCost) return false
    spendJeffs(totalCost, `Bought ${shares} shares of ${symbol}`)

    setPortfolio(prev => {
      const existing = prev.find(h => h.symbol === symbol)
      let updated: StockHolding[]
      let newShares: number
      let newAvg: number
      if (existing) {
        newShares = existing.shares + shares
        newAvg = ((existing.purchasePrice * existing.shares) + (pricePerShare * shares)) / newShares
        updated = prev.map(h => h.symbol === symbol ? { ...h, shares: newShares, purchasePrice: newAvg } : h)
      } else {
        newShares = shares
        newAvg = pricePerShare
        updated = [...prev, { symbol, shares, purchasePrice: pricePerShare, purchasedAt: new Date() }]
      }
      ls.set("investiplay_portfolio", updated)

      const uid = persistUid()
      if (uid) {
        supabase.from("portfolio").upsert({
          user_id: uid, symbol, shares: newShares, purchase_price: newAvg,
        }, { onConflict: "user_id,symbol" }).then(({ error }) => {
          if (error) console.error("[portfolio upsert]", error)
        })
      }
      return updated
    })
    return true
  }

  const sellStock = (symbol: string, shares: number, pricePerShare: number): boolean => {
    if (!Number.isFinite(pricePerShare) || pricePerShare <= 0 || !Number.isFinite(shares) || shares <= 0) return false
    const holding = portfolio.find(h => h.symbol === symbol)
    if (!holding || holding.shares < shares) return false

    const totalValue = Math.round(shares * pricePerShare * 100) / 100
    earnJeffs(totalValue, `Sold ${shares} shares of ${symbol}`)

    setPortfolio(prev => {
      let removeRow = false
      const updated = prev.map(h => {
        if (h.symbol === symbol) {
          const remainingShares = h.shares - shares
          if (remainingShares <= 0) { removeRow = true; return null }
          return { ...h, shares: remainingShares }
        }
        return h
      }).filter((h): h is StockHolding => h !== null)
      ls.set("investiplay_portfolio", updated)

      const uid = persistUid()
      if (uid) {
        if (removeRow) {
          supabase.from("portfolio").delete().eq("user_id", uid).eq("symbol", symbol).then(({ error }) => {
            if (error) console.error("[portfolio delete]", error)
          })
        } else {
          const row = updated.find(h => h.symbol === symbol)!
          supabase.from("portfolio").upsert({
            user_id: uid, symbol, shares: row.shares, purchase_price: row.purchasePrice,
          }, { onConflict: "user_id,symbol" }).then(({ error }) => {
            if (error) console.error("[portfolio upsert]", error)
          })
        }
      }
      return updated
    })
    return true
  }

  const getHolding = (symbol: string): StockHolding | undefined => portfolio.find(h => h.symbol === symbol)

  const addToken = (tokenData: Omit<Token, "id" | "createdAt" | "priceSimulation" | "marketCap">) => {
    const priceSimulation = Math.random() * 10 + 0.1
    const marketCap = tokenData.totalSupply * priceSimulation
    const newToken: Token = {
      ...tokenData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      priceSimulation,
      marketCap,
    }
    setTokens(prev => {
      const updated = [...prev, newToken]
      ls.set("investiplay_tokens", updated)
      return updated
    })
    const uid = persistUid()
    if (uid) {
      supabase.from("user_tokens").insert({
        user_id: uid,
        name: newToken.name,
        symbol: newToken.symbol,
        total_supply: newToken.totalSupply,
        price_simulation: priceSimulation,
        market_cap: marketCap,
      }).then(({ error }) => { if (error) console.error("[user_tokens insert]", error) })
    }
  }

  const addToWatchlist = (symbol: string) => {
    if (watchlist.includes(symbol)) return
    setWatchlist(prev => {
      const updated = [...prev, symbol]
      ls.set("investiplay_watchlist", updated)
      return updated
    })
    const uid = persistUid()
    if (uid) {
      supabase.from("watchlist").insert({ user_id: uid, symbol }).then(({ error }) => {
        if (error && !error.message.includes("duplicate")) console.error("[watchlist insert]", error)
      })
    }
  }

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(prev => {
      const updated = prev.filter(s => s !== symbol)
      ls.set("investiplay_watchlist", updated)
      return updated
    })
    const uid = persistUid()
    if (uid) {
      supabase.from("watchlist").delete().eq("user_id", uid).eq("symbol", symbol).then(({ error }) => {
        if (error) console.error("[watchlist delete]", error)
      })
    }
  }

  const resetOnboarding = () => {
    clearLocalData()
  }

  return (
    <AppContext.Provider
      value={{
        user, authReady, setUser,
        lessonProgress, updateLessonProgress,
        tokens, addToken,
        watchlist, addToWatchlist, removeFromWatchlist,
        resetOnboarding, logout,
        jeffsBalance, earnJeffs, awardJeffs, spendJeffs, jeffsHistory,
        unitTestProgress, updateUnitTestProgress,
        portfolio, buyStock, sellStock, getHolding,
        getRewardMultiplier,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
