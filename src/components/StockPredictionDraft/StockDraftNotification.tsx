// App-wide listener: when a student's teacher launches the Stock Prediction
// Draft, this pops a BLOCKING modal that makes the student lock in a pick before
// they can continue. Mirrors LessonGradeNotifications (realtime subscription +
// re-check on load), but the dialog can't be dismissed — the student has to do
// it.
//
// Every launch re-prompts EVERYONE, including students who already picked last
// time. We track, per class, which launch (its launched_at timestamp) the
// student has already completed, in localStorage — same "seen" idea as the
// lesson-grade pop-up. So a fresh launch (new timestamp) always re-prompts, and
// the modal closes once they (re-)pick for that specific launch.

import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { TrendingUp } from "lucide-react"
import PickScreen from "./PickScreen"

interface DueDraft {
  classId: string
  launchedAt: string
}

// Per-device record of the launch each class's draft was last completed for.
const ackKey = (uid: string) => `investiplay_stock_draft_ack_${uid}`
const readAck = (uid: string): Record<string, string> => {
  try {
    const raw = localStorage.getItem(ackKey(uid))
    const parsed = raw ? JSON.parse(raw) : {}
    return parsed && typeof parsed === "object" ? parsed : {}
  } catch {
    return {}
  }
}
const writeAck = (uid: string, classId: string, launchedAt: string) => {
  try {
    localStorage.setItem(ackKey(uid), JSON.stringify({ ...readAck(uid), [classId]: launchedAt }))
  } catch {
    /* ignore */
  }
}

export function StockDraftNotification() {
  const { user, isTeacher } = useAuth()
  const [due, setDue] = useState<DueDraft | null>(null)

  const check = useCallback(async () => {
    if (!user || isTeacher) { setDue(null); return }

    // Classes I'm a student in.
    const { data: mem } = await supabase
      .from("class_members").select("class_id").eq("user_id", user.id)
    const classIds = [...new Set((mem ?? []).map(r => r.class_id))].filter(Boolean) as string[]
    if (classIds.length === 0) { setDue(null); return }

    // Which of those have a live draft session, and when was it launched?
    const { data: sessions } = await (supabase as any)
      .from("stock_draft_sessions")
      .select("class_id, launched_at, active")
      .in("class_id", classIds)
      .eq("active", true)
    const live = (sessions ?? []) as { class_id: string; launched_at: string }[]
    if (live.length === 0) { setDue(null); return }

    // A launch is "due" until the student completes a pick for THAT launch
    // (matched by its launched_at timestamp) — so relaunches re-prompt everyone.
    const ack = readAck(user.id)
    const pending = live.find(s => ack[s.class_id] !== s.launched_at)
    setDue(pending ? { classId: pending.class_id, launchedAt: pending.launched_at } : null)
  }, [user, isTeacher])

  useEffect(() => {
    if (!user || isTeacher) return
    let cancelled = false
    void check()
    // Any change to a draft session I can see (RLS scopes this to my classes)
    // re-runs the check, so a launch/relaunch pops the modal live.
    const channel = supabase
      .channel(`stock-draft-sessions-${user.id}`)
      .on("postgres_changes",
        { event: "*", schema: "public", table: "stock_draft_sessions" },
        () => { if (!cancelled) void check() })
      .subscribe()
    return () => { cancelled = true; supabase.removeChannel(channel) }
  }, [user, isTeacher, check])

  const handlePicked = () => {
    // Mark this launch complete so the modal closes and doesn't re-open until
    // the teacher launches again (a new launched_at).
    if (user && due) writeAck(user.id, due.classId, due.launchedAt)
    void check()
  }

  if (!due) return null

  return (
    <Dialog open onOpenChange={() => { /* blocking — no manual dismiss */ }}>
      {/* Hide the default close (X) so the only way out is to pick. */}
      <DialogContent
        className="max-w-2xl max-h-[85vh] overflow-y-auto [&>button]:hidden"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-1">
            <TrendingUp className="w-7 h-7 text-primary" />
          </div>
          <DialogTitle className="text-center text-2xl font-display">
            📣 Your teacher started the Stock Draft!
          </DialogTitle>
          <DialogDescription className="text-center">
            Pick one stock to root for all semester. It'll be added to your watchlist so you can follow it.
          </DialogDescription>
        </DialogHeader>

        {/* forcePick: always lets them (re-)pick, even if a prior pick locked. */}
        <PickScreen classId={due.classId} forcePick onPicked={handlePicked} />
      </DialogContent>
    </Dialog>
  )
}
