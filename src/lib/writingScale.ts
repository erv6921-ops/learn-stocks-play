// Writing-scale: teachers set how much writing micro-business activities
// require (classes.writing_scale - 0.5 Light / 1.0 Standard / 1.5 Extended).
// Students inherit the most lenient scale among their classes. `ws(n)` scales
// any word minimum; small structural minimums (names etc., < 20 words) are
// never scaled. Cached in localStorage so minimums render correctly instantly.

import { supabase } from "@/integrations/supabase/client"

const LS_KEY = "investiplay_writing_scale"

let _scale = (() => {
  try {
    const v = parseFloat(localStorage.getItem(LS_KEY) || "1")
    return v >= 0.25 && v <= 2 ? v : 1
  } catch { return 1 }
})()

const listeners = new Set<() => void>()

export function getWritingScale(): number { return _scale }

function setScale(v: number) {
  if (v === _scale) return
  _scale = v
  try { localStorage.setItem(LS_KEY, String(v)) } catch { /* ignore */ }
  listeners.forEach(l => l())
}

/** Scale a word minimum. Rounds to the nearest 5 and never drops below 10. */
export function ws(base: number): number {
  if (base < 20) return base // names/short fields stay as authored
  return Math.max(10, Math.round((base * _scale) / 5) * 5)
}

/** Fetch the student's class writing scale (most lenient wins). */
export async function initWritingScale(): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data: memberships } = await supabase
      .from("class_members").select("class_id").eq("user_id", user.id)
    if (!memberships || memberships.length === 0) { setScale(1); return }
    const { data: classes } = await (supabase as any)
      .from("classes").select("writing_scale")
      .in("id", memberships.map(m => m.class_id))
    const scales = (classes ?? [])
      .map((c: { writing_scale: number | null }) => Number(c.writing_scale))
      .filter((v: number) => v >= 0.25 && v <= 2)
    if (scales.length > 0) setScale(Math.min(...scales))
  } catch { /* keep cached value */ }
}

/** Subscribe a React component to scale changes (re-render on fetch). */
export function subscribeWritingScale(cb: () => void): () => void {
  listeners.add(cb)
  return () => { listeners.delete(cb) }
}
