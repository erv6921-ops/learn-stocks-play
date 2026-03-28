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

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          // Fetch user role and profile
          const [roleResult, profileResult] = await Promise.all([
            supabase
              .from("user_roles")
              .select("role")
              .eq("user_id", session.user.id)
              .single(),
            supabase
              .from("profiles")
              .select("*")
              .eq("id", session.user.id)
              .single(),
          ])

          setAuthState({
            user: session.user,
            loading: false,
            role: roleResult.data?.role || null,
            profile: profileResult.data,
          })
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
        const [roleResult, profileResult] = await Promise.all([
          supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", session.user.id)
            .single(),
          supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single(),
        ])

        setAuthState({
          user: session.user,
          loading: false,
          role: roleResult.data?.role || null,
          profile: profileResult.data,
        })
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
