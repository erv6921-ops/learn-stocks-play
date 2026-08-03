import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

// Shape returned by the get_partner_requests RPC (incoming, still-pending
// requests where the current user is the recipient).
interface RequestRow {
  user_id: string
  first_name: string | null
  last_name: string | null
  school_name: string | null
}

// Per-device, per-user record of which incoming request senders this user has
// already been shown the pop-up for, so a brand-new request pops once while
// already-seen ones stay quiet. Keyed by user id (mirrors the grade/bell store).
const seenKey = (uid: string) => `investiplay_friend_requests_seen_${uid}`

function readSeen(uid: string): string[] {
  try {
    const raw = localStorage.getItem(seenKey(uid))
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function displayName(r: RequestRow): string {
  const full = [r.first_name, r.last_name].filter(Boolean).join(" ").trim()
  return full || "A student"
}

export function FriendRequestNotifications() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [requests, setRequests] = useState<RequestRow[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!user) return
    let cancelled = false

    async function check() {
      const { data, error } = await (supabase as any).rpc("get_partner_requests")
      if (cancelled || error || !Array.isArray(data) || data.length === 0) return

      // Only surface the pop-up when at least one request is new to this device.
      const seen = readSeen(user!.id)
      const hasNew = (data as RequestRow[]).some(r => !seen.includes(r.user_id))
      if (!hasNew) return

      setRequests(data as RequestRow[])
      setOpen(true)
    }

    // Check once on app open...
    check()

    // ...and stay live: a pending row inserted with partner_id = me means a new
    // request just landed, so re-query (the payload has only ids; the RPC adds
    // the sender's name/school) and pop the dialog instantly.
    const channel = supabase
      .channel(`friend-requests-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "partners",
          filter: `partner_id=eq.${user.id}`,
        },
        () => { check() },
      )
      .subscribe()

    return () => {
      cancelled = true
      supabase.removeChannel(channel)
    }
  }, [user])

  // Remember every currently-pending sender so the pop-up doesn't repeat, then close.
  const dismiss = () => {
    if (user && requests.length > 0) {
      const ids = requests.map(r => r.user_id)
      try {
        localStorage.setItem(seenKey(user.id), JSON.stringify(ids))
      } catch {
        /* ignore */
      }
    }
    setOpen(false)
  }

  const viewRequests = () => {
    dismiss()
    navigate("/partners")
  }

  if (requests.length === 0) return null

  const count = requests.length
  const firstName = displayName(requests[0])
  const others = count - 1

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) dismiss() }}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-2">
            <UserPlus className="w-8 h-8 text-accent" />
          </div>
          <DialogTitle className="text-center text-2xl font-display">
            🤝 {count === 1 ? "New friend request!" : `${count} new friend requests!`}
          </DialogTitle>
          <DialogDescription className="text-center">
            {count === 1
              ? `${firstName} wants to be your partner.`
              : `${firstName} and ${others} other${others === 1 ? "" : "s"} want to be your partner.`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 my-2 max-h-56 overflow-y-auto">
          {requests.map(r => (
            <div key={r.user_id} className="flex items-center gap-3 rounded-lg border bg-card p-3">
              <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <UserPlus className="w-4 h-4 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{displayName(r)}</p>
                {r.school_name && (
                  <p className="text-xs text-muted-foreground truncate">{r.school_name}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={dismiss} className="w-full sm:w-auto">
            Later
          </Button>
          <Button onClick={viewRequests} className="w-full sm:w-auto">
            View requests
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
