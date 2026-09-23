// useJeffTutor — client state for the "Chat with Jeff" AI tutor.
//
// Talks to the jeff-chat edge function's TUTOR MODE (body shape
// { session_id, message, history }). The server owns everything that matters:
// it identifies the student from the JWT, enforces the daily limit, charges
// coins through the jeffs_history ledger, and grounds the answer in the
// teacher's material. This hook only keeps the conversation on screen.
//
// Design notes
// - One session_id per mount, kept in memory only (never localStorage), so a
//   fresh open of the panel is a fresh session in jeff_chat_messages.
// - Blocked replies ("daily_limit" | "insufficient_coins" | "error") arrive
//   as HTTP 200 with a message already written in Jeff's voice. They are
//   appended like any other Jeff message. Nothing here ever throws or shows a
//   raw error string; a transport failure becomes a friendly Jeff line too.
// - `balance` starts from the app's ledger balance and, once the server has
//   reported a post-charge balance, follows the server. (AppContext caches
//   the ledger and only re-sums on hydrate, so the top-bar pill catches up on
//   the next reload; this hook's balance is the up-to-date one to show.)
// - `dailyRemaining` is seeded from the student's own jeff_chat_messages rows
//   (RLS: students read their own) and then tracked locally.
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { SupabaseClient } from "@supabase/supabase-js"
import { supabase } from "@/integrations/supabase/client"
import { useApp } from "@/contexts/AppContext"

/** Coins charged per answered question — mirrors JEFF_CHAT_COST in the edge function. */
export const JEFF_CHAT_COST = 200
/** Questions per rolling 24h — mirrors JEFF_DAILY_LIMIT in the edge function. */
export const JEFF_DAILY_LIMIT = 10
/** Turns of history sent with each message (the server keeps at most this many). */
const HISTORY_TURNS = 6
const MAX_MESSAGE_CHARS = 2000

export type JeffTutorBlocked = "daily_limit" | "insufficient_coins" | "error"

export interface JeffTutorLesson {
  lesson_id: string
  title: string
}

export interface JeffTutorMessage {
  id: string
  role: "user" | "assistant"
  content: string
  /** Lesson Jeff pointed the student to (assistant messages only). */
  lesson?: JeffTutorLesson | null
  /** Set when this Jeff message is a blocked/offline notice rather than an answer. */
  blocked?: JeffTutorBlocked | "offline"
}

interface TutorResponse {
  reply?: unknown
  lesson?: unknown
  balance?: unknown
  blocked?: unknown
}

const OFFLINE_REPLY =
  "Hmm, I can't reach my brain right now. Check your connection and try me again in a sec."

const isBlocked = (v: unknown): v is JeffTutorBlocked =>
  v === "daily_limit" || v === "insufficient_coins" || v === "error"

const asLesson = (v: unknown): JeffTutorLesson | null => {
  if (!v || typeof v !== "object") return null
  const o = v as { lesson_id?: unknown; title?: unknown }
  return typeof o.lesson_id === "string" && typeof o.title === "string"
    ? { lesson_id: o.lesson_id, title: o.title }
    : null
}

// jeff_chat_messages was created by hand (no migration / generated types yet),
// so query it through the untyped client surface.
const untyped = supabase as unknown as SupabaseClient

export function useJeffTutor() {
  const { user, jeffsBalance, setJeffsBalanceFromServer } = useApp()

  // One session per mount. useMemo (not useState) so it is created exactly once
  // and never persisted anywhere.
  const sessionId = useMemo(() => crypto.randomUUID(), [])

  const [messages, setMessages] = useState<JeffTutorMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState<number>(() => Math.round(jeffsBalance))
  const [usedToday, setUsedToday] = useState(0)

  // Until the server has told us a post-charge balance, mirror the app's
  // ledger balance (it moves when the student earns coins elsewhere).
  const serverBalanceKnown = useRef(false)
  useEffect(() => {
    if (!serverBalanceKnown.current) setBalance(Math.round(jeffsBalance))
  }, [jeffsBalance])

  // Seed today's usage from the student's own rows. Any failure (offline, the
  // dev-local user, RLS) leaves it at 0 — the server enforces the real limit.
  useEffect(() => {
    if (!user) return
    let cancelled = false
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    untyped
      .from("jeff_chat_messages")
      .select("id", { count: "exact", head: true })
      .eq("role", "user")
      .gte("created_at", since)
      .then(({ count, error }) => {
        if (!cancelled && !error && typeof count === "number") setUsedToday(count)
      })
    return () => { cancelled = true }
  }, [user?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const dailyRemaining = Math.max(0, JEFF_DAILY_LIMIT - usedToday)
  const canSend = balance >= JEFF_CHAT_COST && !loading && dailyRemaining > 0

  const append = useCallback((m: Omit<JeffTutorMessage, "id">) => {
    setMessages(prev => [...prev, { ...m, id: crypto.randomUUID() }])
  }, [])

  const send = useCallback(async (text: string) => {
    const message = text.trim().slice(0, MAX_MESSAGE_CHARS)
    if (!message || loading) return

    // History = the last real turns (blocked / offline notices are UI-only and
    // never went through the model, so they are left out).
    const history = messages
      .filter(m => !m.blocked)
      .slice(-HISTORY_TURNS)
      .map(m => ({ role: m.role, content: m.content }))

    append({ role: "user", content: message })
    setLoading(true)
    try {
      const { data, error } = await supabase.functions.invoke("jeff-chat", {
        body: { session_id: sessionId, message, history },
      })
      const res = !error && data && typeof data === "object" ? (data as TutorResponse) : null
      if (!res || typeof res.reply !== "string" || !res.reply.trim()) {
        if (error) console.error("[jeff-tutor] invoke failed:", error.message ?? error)
        append({ role: "assistant", content: OFFLINE_REPLY, blocked: "offline" })
        return
      }

      if (typeof res.balance === "number" && Number.isFinite(res.balance)) {
        serverBalanceKnown.current = true
        setBalance(Math.round(res.balance))
        // The server balance is the authoritative post-charge ledger sum. Push
        // it into context so the app-wide coin header updates immediately,
        // instead of staying stale until the next hydrate/reload.
        setJeffsBalanceFromServer(res.balance)
      }

      if (isBlocked(res.blocked)) {
        if (res.blocked === "daily_limit") setUsedToday(JEFF_DAILY_LIMIT)
        append({ role: "assistant", content: res.reply, blocked: res.blocked })
        return
      }

      setUsedToday(n => n + 1)
      append({ role: "assistant", content: res.reply, lesson: asLesson(res.lesson) })
    } catch (e) {
      console.error("[jeff-tutor] send failed:", e)
      append({ role: "assistant", content: OFFLINE_REPLY, blocked: "offline" })
    } finally {
      setLoading(false)
    }
  }, [append, loading, messages, sessionId, setJeffsBalanceFromServer])

  return {
    sessionId,
    messages,
    loading,
    balance,
    cost: JEFF_CHAT_COST,
    dailyLimit: JEFF_DAILY_LIMIT,
    dailyRemaining,
    canSend,
    send,
  }
}

export type JeffTutor = ReturnType<typeof useJeffTutor>
