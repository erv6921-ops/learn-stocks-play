// Unread-message count for the Friends nav badge. Seeds from friends_unread_count(),
// then keeps live via Supabase Realtime (new messages addressed to me) and a
// local "refresh" event the Friends page fires after it marks a thread read.
import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useApp } from "@/contexts/AppContext"
import { unreadCount } from "@/lib/friends"

export const FRIENDS_REFRESH_EVENT = "investiplay:friends-refresh"

/** Fire after reading/sending so every mounted badge recomputes. */
export function notifyFriendsChanged(): void {
  window.dispatchEvent(new Event(FRIENDS_REFRESH_EVENT))
}

export function useFriendsUnread(): number {
  const { user } = useApp()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!user?.id) {
      setCount(0)
      return
    }
    let cancelled = false
    const refresh = () => {
      unreadCount()
        .then((n) => { if (!cancelled) setCount(n) })
        .catch(() => { /* ignore transient errors */ })
    }
    refresh()

    const onRefresh = () => refresh()
    window.addEventListener(FRIENDS_REFRESH_EVENT, onRefresh)

    const channel = supabase
      .channel(`friend-unread-${user.id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "friend_messages", filter: `recipient_id=eq.${user.id}` },
        () => refresh(),
      )
      .subscribe()

    return () => {
      cancelled = true
      window.removeEventListener(FRIENDS_REFRESH_EVENT, onRefresh)
      supabase.removeChannel(channel)
    }
  }, [user?.id])

  return count
}
