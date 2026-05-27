import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import type { User } from "@supabase/supabase-js"

interface AuthState {
  user: User | null
  loading: boolean
  role: "student" | "teacher" | null
  profile: any | null
}

export function useAuth() {
  const navigate = useNavigate()
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    role: null,
    profile: null,
  })

  const withTimeout = <T,>(p: PromiseLike<T>, ms = 3000): Promise<T | null> =>
    Promise.race([
      Promise.resolve(p),
      new Promise<null>(resolve => setTimeout(() => resolve(null), ms)),
    ])

  const loadUserData = async (user: User) => {
    const [roleResult, profileResult] = await Promise.all([
      withTimeout(
        supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .maybeSingle()
      ),
      withTimeout(
        supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle()
      ),
    ])

    setAuthState({
      user,
      loading: false,
      role: (roleResult as any)?.data?.role || null,
      profile: (profileResult as any)?.data || null,
    })
  }

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setAuthState({
            user: session.user,
            loading: false,
            role: null,
            profile: null,
          })
          setTimeout(() => { loadUserData(session.user) }, 0)
        } else {
          setAuthState({
            user: null,
            loading: false,
            role: null,
            profile: null,
          })
        }
      }
    )

    // Then check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        setAuthState({
          user: session.user,
          loading: false,
          role: null,
          profile: null,
        })
        loadUserData(session.user)
      } else {
        setAuthState({
          user: null,
          loading: false,
          role: null,
          profile: null,
        })
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    navigate("/auth")
  }

  return {
    ...authState,
    signOut,
    isTeacher: authState.role === "teacher",
    isStudent: authState.role === "student",
  }
}
