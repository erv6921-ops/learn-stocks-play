import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import {
  ClassSettings,
  DEFAULT_CLASS_SETTINGS,
  normalizeClassSettings,
  mergeClassSettings,
} from "@/lib/classSettings"

const Ctx = createContext<ClassSettings>(DEFAULT_CLASS_SETTINGS)

// Loads the teacher-controlled settings for the classes the current student is
// in, merged into the most restrictive result, and keeps them live. Teachers
// (and signed-out users) always get the permissive default. If the
// class_settings table isn't present yet (migration not applied), the query
// fails softly and everything stays unlocked - nothing breaks.
export function ClassSettingsProvider({ children }: { children: ReactNode }) {
  const { user, isTeacher } = useAuth()
  const [settings, setSettings] = useState<ClassSettings>(DEFAULT_CLASS_SETTINGS)

  useEffect(() => {
    if (!user || isTeacher) {
      setSettings(DEFAULT_CLASS_SETTINGS)
      return
    }
    let cancelled = false

    async function load() {
      const { data: memberships } = await supabase
        .from("class_members")
        .select("class_id")
        .eq("user_id", user!.id)
      const classIds = (memberships || []).map((m) => m.class_id)
      if (cancelled) return
      if (classIds.length === 0) {
        setSettings(DEFAULT_CLASS_SETTINGS)
        return
      }
      const { data, error } = await (supabase as any)
        .from("class_settings")
        .select("settings")
        .in("class_id", classIds)
      if (cancelled) return
      if (error || !data) {
        setSettings(DEFAULT_CLASS_SETTINGS)
        return
      }
      setSettings(mergeClassSettings(data.map((r: any) => normalizeClassSettings(r.settings))))
    }

    load()

    const channel = supabase
      .channel(`class-settings-${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "class_settings" },
        () => { if (!cancelled) load() }
      )
      .subscribe()

    return () => {
      cancelled = true
      supabase.removeChannel(channel)
    }
  }, [user, isTeacher])

  return <Ctx.Provider value={settings}>{children}</Ctx.Provider>
}

export const useClassSettings = () => useContext(Ctx)
