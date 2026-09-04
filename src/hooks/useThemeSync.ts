import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { supabase } from "@/integrations/supabase/client"

// ═══════════════════════════════════════════════════════════════
// CROSS-DEVICE THEME PERSISTENCE  (overnight-build P1)
// ───────────────────────────────────────────────────────────────
// The light/dark toggle itself already works: next-themes writes `class="dark"`
// / `class="light"` on <html>, Tailwind's darkMode:["class"] keys off `.dark`,
// and the choice is kept in localStorage so a refresh on the SAME device holds.
//
// What was missing is cross-DEVICE persistence: a student who picks Dark on the
// classroom iMac should still get Dark on their phone. This layer adds exactly
// that on top of next-themes:
//   • on sign-in, read profiles.theme_preference and apply it once
//   • persistTheme(t) writes the choice back to profiles.theme_preference
//
// Best-effort by design. Every DB call is wrapped so a missing column, RLS
// hiccup, or offline network can NEVER throw into the render tree — if the
// write/read fails, localStorage silently remains the source of truth and the
// UI is unaffected. Requires this migration (see BUILD-SUMMARY.md):
//   ALTER TABLE profiles ADD COLUMN theme_preference TEXT DEFAULT 'light';
// Until it's applied, this is a no-op; nothing breaks.
// ═══════════════════════════════════════════════════════════════

const VALID_THEMES = new Set(["light", "dark", "system"])

/** Fire-and-forget write of the chosen theme to the signed-in user's profile. */
export function persistTheme(theme: string | undefined) {
  if (!theme || !VALID_THEMES.has(theme)) return
  supabase.auth.getUser().then(
    ({ data }) => {
      const uid = data.user?.id
      if (!uid) return
      // Cast: theme_preference isn't in the generated Database types until the
      // column ships, so we bypass the typed builder for this one field.
      void (supabase.from("profiles") as any)
        .update({ theme_preference: theme })
        .eq("id", uid)
        .then(() => {}, () => {})
    },
    () => {},
  )
}

/**
 * Invisible bootstrap component: mount ONCE inside <ThemeProvider>. On sign-in
 * it pulls the saved preference from Supabase and applies it via next-themes.
 */
export function ThemeSync() {
  const { setTheme } = useTheme()
  const applied = useRef(false)

  useEffect(() => {
    let cancelled = false

    const apply = async () => {
      if (applied.current) return
      try {
        const { data: userData } = await supabase.auth.getUser()
        const user = userData.user
        if (!user || cancelled) return
        const { data, error } = await (supabase.from("profiles") as any)
          .select("theme_preference")
          .eq("id", user.id)
          .maybeSingle()
        if (error || cancelled) return
        const pref = data?.theme_preference
        if (pref && VALID_THEMES.has(pref)) {
          applied.current = true
          setTheme(pref)
        }
      } catch {
        // column/table missing or offline — keep the localStorage theme
      }
    }

    apply()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      // Re-apply on a fresh sign-in (e.g. switching accounts on a shared device).
      if (event === "SIGNED_IN") {
        applied.current = false
        void apply()
      }
    })

    return () => {
      cancelled = true
      subscription.unsubscribe()
    }
  }, [setTheme])

  return null
}
