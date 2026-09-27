// Friends (/friends) — classmate friendships + a per-friend share inbox.
//
// Left: incoming requests, your friends (with unread badges), and an "Add from
// my class" roster. Right: the selected friend's conversation — structured
// share cards (lesson / Jeff prompt / stock) and notes in time order, a note
// composer, plus Block and Report. Classmate/roster reads and every mutation go
// through the SECURITY DEFINER RPCs in sql/friends_chat.sql; conversation
// messages are a direct RLS-guarded read kept live with Supabase Realtime.
//
// Visual language borrows the Partners "ID badge" roster and the JeffTutorPanel
// chat bubbles so it sits inside the existing design system + dark mode.

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"
import GameNav from "@/components/GameNav"
import { supabase } from "@/integrations/supabase/client"
import { useApp } from "@/contexts/AppContext"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { getInitials } from "@/lib/playerStats"
import { cn } from "@/lib/utils"
import { containsProfanity, NOTE_MAX_LENGTH } from "@/lib/profanity"
import FriendMessageCard from "@/components/friends/FriendMessageCard"
import { notifyFriendsChanged } from "@/hooks/useFriendsUnread"
import {
  listFriends, listRequests, listClassmates, sendRequest, respondRequest,
  removeFriend, sendMessage, getConversation, markRead, blockUser, reportUser,
  fullName, type FriendRow, type RequestRow, type ClassmateRow, type FriendMessage,
} from "@/lib/friends"
import {
  Users, UserPlus, Clock, Check, X, Loader2, Send, MoreVertical, Ban, Flag,
  Mail, School, GraduationCap, MessageSquare, ArrowLeft,
} from "lucide-react"

const REPORT_REASONS = ["harassment", "spam", "inappropriate", "other"] as const

function Initials({ first, last, size = 40 }: { first: string | null; last: string | null; size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full bg-primary/10 font-extrabold text-primary"
      style={{ width: size, height: size, fontSize: size * 0.34 }}
    >
      {getInitials(first ?? undefined, last ?? undefined)}
    </span>
  )
}

export default function Friends() {
  const { user } = useApp()
  const { toast } = useToast()
  const { t } = useTranslation()

  const [friends, setFriends] = useState<FriendRow[]>([])
  const [requests, setRequests] = useState<RequestRow[]>([])
  const [classmates, setClassmates] = useState<ClassmateRow[]>([])
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState<string | null>(null)

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [messages, setMessages] = useState<FriendMessage[]>([])
  const [loadingConvo, setLoadingConvo] = useState(false)
  const [draft, setDraft] = useState("")
  const [sending, setSending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const [blockTarget, setBlockTarget] = useState<FriendRow | null>(null)
  const [reportTarget, setReportTarget] = useState<FriendRow | null>(null)
  const [reportReason, setReportReason] = useState<string>(REPORT_REASONS[0])
  const [reportNote, setReportNote] = useState("")
  const [safetyBusy, setSafetyBusy] = useState(false)

  const selected = friends.find((f) => f.user_id === selectedId) ?? null

  const loadRoster = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { setLoading(false); return }
    try {
      const [f, r, c] = await Promise.all([listFriends(), listRequests(), listClassmates()])
      setFriends(f)
      setRequests(r)
      setClassmates(c)
    } catch {
      toast({ title: t("friends.errors.loadRoster"), variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }, [t, toast])

  useEffect(() => { loadRoster() }, [loadRoster, user?.id])

  // Load a conversation + mark it read whenever a friend is selected.
  const openConversation = useCallback(async (otherId: string) => {
    if (!user?.id) return
    setLoadingConvo(true)
    try {
      const msgs = await getConversation(user.id, otherId)
      setMessages(msgs)
      await markRead(otherId)
      setFriends((prev) => prev.map((f) => (f.user_id === otherId ? { ...f, unread: 0 } : f)))
      notifyFriendsChanged()
    } catch {
      toast({ title: t("friends.errors.loadConversation"), variant: "destructive" })
    } finally {
      setLoadingConvo(false)
    }
  }, [user?.id, t, toast])

  useEffect(() => {
    if (selectedId) openConversation(selectedId)
    else setMessages([])
  }, [selectedId, openConversation])

  // Keep newest message in view.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [messages.length, loadingConvo])

  // Realtime: a new message addressed to me refreshes the roster, and reloads
  // the open thread if it's from the friend I'm looking at.
  useEffect(() => {
    if (!user?.id) return
    const channel = supabase
      .channel(`friends-page-${user.id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "friend_messages", filter: `recipient_id=eq.${user.id}` },
        (payload: { new?: { sender_id?: string } }) => {
          const from = payload.new?.sender_id
          if (from && from === selectedId) openConversation(selectedId)
          else loadRoster()
        },
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "friendships", filter: `addressee_id=eq.${user.id}` },
        () => loadRoster(),
      )
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [user?.id, selectedId, openConversation, loadRoster])

  // ── Roster actions ─────────────────────────────────────────────────────
  const addFriend = async (c: ClassmateRow) => {
    setBusyId(c.user_id)
    try {
      const res = await sendRequest(c.user_id)
      toast({
        title: res === "accepted" ? t("friends.toast.nowFriends", { name: fullName(c) }) : t("friends.toast.requestSent", { name: fullName(c) }),
      })
      await loadRoster()
    } catch (e) {
      toast({ title: t("friends.errors.action"), description: e instanceof Error ? e.message : undefined, variant: "destructive" })
    } finally {
      setBusyId(null)
    }
  }

  const respond = async (r: RequestRow, accept: boolean) => {
    setBusyId(r.user_id)
    try {
      await respondRequest(r.user_id, accept)
      if (accept) toast({ title: t("friends.toast.nowFriends", { name: fullName(r) }) })
      await loadRoster()
    } catch (e) {
      toast({ title: t("friends.errors.action"), description: e instanceof Error ? e.message : undefined, variant: "destructive" })
    } finally {
      setBusyId(null)
    }
  }

  const unfriend = async (f: FriendRow) => {
    setBusyId(f.user_id)
    try {
      await removeFriend(f.user_id)
      if (selectedId === f.user_id) setSelectedId(null)
      await loadRoster()
    } catch (e) {
      toast({ title: t("friends.errors.action"), description: e instanceof Error ? e.message : undefined, variant: "destructive" })
    } finally {
      setBusyId(null)
    }
  }

  // ── Conversation actions ───────────────────────────────────────────────
  const sendNote = async () => {
    if (!selected || !draft.trim()) return
    if (containsProfanity(draft)) {
      toast({ title: t("friends.send.profanity"), variant: "destructive" })
      return
    }
    setSending(true)
    const text = draft.trim()
    try {
      const id = await sendMessage({ to: selected.user_id, type: "note", note: text })
      // Optimistically append; realtime only notifies the recipient.
      setMessages((prev) => [...prev, {
        id, sender_id: user!.id, recipient_id: selected.user_id, type: "note",
        reference_id: null, reference_label: null, note: text, read_at: null,
        created_at: new Date().toISOString(),
      }])
      setDraft("")
    } catch (e) {
      toast({ title: t("friends.send.failed"), description: e instanceof Error ? e.message : undefined, variant: "destructive" })
    } finally {
      setSending(false)
    }
  }

  const confirmBlock = async () => {
    if (!blockTarget) return
    setSafetyBusy(true)
    try {
      await blockUser(blockTarget.user_id)
      if (selectedId === blockTarget.user_id) setSelectedId(null)
      toast({ title: t("friends.toast.blocked", { name: fullName(blockTarget) }) })
      setBlockTarget(null)
      await loadRoster()
    } catch (e) {
      toast({ title: t("friends.errors.action"), description: e instanceof Error ? e.message : undefined, variant: "destructive" })
    } finally {
      setSafetyBusy(false)
    }
  }

  const submitReport = async () => {
    if (!reportTarget) return
    setSafetyBusy(true)
    try {
      await reportUser({ reported: reportTarget.user_id, reason: reportReason, note: reportNote.trim() || null })
      toast({ title: t("friends.toast.reported") })
      setReportTarget(null)
      setReportNote("")
      setReportReason(REPORT_REASONS[0])
    } catch (e) {
      toast({ title: t("friends.errors.action"), description: e instanceof Error ? e.message : undefined, variant: "destructive" })
    } finally {
      setSafetyBusy(false)
    }
  }

  const addable = classmates.filter((c) => c.status === "none" || c.status === "pending_out")

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <GameNav />
      <main className="container mx-auto max-w-6xl px-4 py-6 md:py-8">
        <h1 className="mb-1 flex items-center gap-2 text-2xl font-extrabold">
          <MessageSquare className="h-6 w-6 text-primary" /> {t("friends.title")}
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">{t("friends.subtitle")}</p>

        <div className="grid items-start gap-6 md:grid-cols-5">
          {/* ── Left: requests + friends + add from class ── */}
          <div className={cn("space-y-6 md:col-span-2", selectedId && "hidden md:block")}>
            {/* Incoming requests */}
            {requests.length > 0 && (
              <section>
                <h2 className="mb-2 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary" /> {t("friends.requests", { count: requests.length })}
                  <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                </h2>
                <div className="space-y-2">
                  <AnimatePresence>
                    {requests.map((r) => (
                      <motion.div key={r.user_id} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                        <Initials first={r.first_name} last={r.last_name} size={36} />
                        <p className="min-w-0 flex-1 truncate text-sm font-bold">{fullName(r)}</p>
                        <Button size="sm" className="gap-1" disabled={busyId === r.user_id} onClick={() => respond(r, true)}>
                          {busyId === r.user_id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />} {t("friends.accept")}
                        </Button>
                        <Button size="sm" variant="ghost" className="px-2 text-muted-foreground hover:text-destructive" disabled={busyId === r.user_id} onClick={() => respond(r, false)} title={t("friends.decline")}>
                          <X className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </section>
            )}

            {/* My friends */}
            <section>
              <h2 className="mb-2 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-muted-foreground">
                <Users className="h-4 w-4 text-primary" /> {t("friends.myFriends", { count: friends.length })}
              </h2>
              {loading ? (
                <p className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> {t("friends.loading")}</p>
              ) : friends.length === 0 ? (
                <Card><CardContent className="p-5 text-center">
                  <Users className="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" />
                  <p className="text-sm font-semibold">{t("friends.empty.title")}</p>
                  <p className="text-xs text-muted-foreground">{t("friends.empty.body")}</p>
                </CardContent></Card>
              ) : (
                <div className="space-y-2">
                  <AnimatePresence>
                    {friends.map((f) => (
                      <motion.button
                        key={f.user_id}
                        layout
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => setSelectedId(f.user_id)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors",
                          selectedId === f.user_id ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-muted/60",
                        )}
                      >
                        <Initials first={f.first_name} last={f.last_name} size={40} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold">{fullName(f)}</p>
                          {f.school_name && (
                            <p className="truncate text-xs text-muted-foreground">{f.school_name}</p>
                          )}
                        </div>
                        {f.unread > 0 && (
                          <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-destructive px-1.5 text-[11px] font-bold leading-none text-destructive-foreground">
                            {f.unread > 9 ? "9+" : f.unread}
                          </span>
                        )}
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </section>

            {/* Add from my class */}
            <section>
              <h2 className="mb-2 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-muted-foreground">
                <UserPlus className="h-4 w-4 text-primary" /> {t("friends.addFromClass")}
              </h2>
              {addable.length === 0 ? (
                <p className="px-1 text-xs text-muted-foreground">{t("friends.noClassmates")}</p>
              ) : (
                <div className="space-y-2">
                  {addable.map((c) => (
                    <div key={c.user_id} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                      <Initials first={c.first_name} last={c.last_name} size={36} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">{fullName(c)}</p>
                        <p className="flex items-center gap-2 truncate text-xs text-muted-foreground">
                          {c.school_name && <span className="inline-flex items-center gap-1"><School className="h-3 w-3" />{c.school_name}</span>}
                          {c.grade != null && <span className="inline-flex items-center gap-1"><GraduationCap className="h-3 w-3" />{t("friends.grade", { grade: c.grade })}</span>}
                        </p>
                      </div>
                      {c.status === "pending_out" ? (
                        <Badge variant="outline" className="shrink-0 gap-1 text-muted-foreground"><Clock className="h-3 w-3" /> {t("friends.invited")}</Badge>
                      ) : (
                        <Button size="sm" className="shrink-0 gap-1" disabled={busyId === c.user_id} onClick={() => addFriend(c)}>
                          {busyId === c.user_id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <UserPlus className="h-3.5 w-3.5" />} {t("friends.add")}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* ── Right: conversation ── */}
          <div className={cn("md:col-span-3", !selectedId && "hidden md:block")}>
            {!selected ? (
              <Card className="border-dashed">
                <CardContent className="p-10 text-center">
                  <MessageSquare className="mx-auto mb-3 h-12 w-12 text-muted-foreground/40" />
                  <p className="font-bold">{t("friends.pickFriend.title")}</p>
                  <p className="text-sm text-muted-foreground">{t("friends.pickFriend.body")}</p>
                </CardContent>
              </Card>
            ) : (
              <Card className="flex h-[70vh] flex-col overflow-hidden">
                {/* Conversation header */}
                <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                  <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSelectedId(null)} aria-label={t("friends.back")}>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Initials first={selected.first_name} last={selected.last_name} size={36} />
                  <p className="min-w-0 flex-1 truncate font-bold">{fullName(selected)}</p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label={t("friends.more")}><MoreVertical className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setReportTarget(selected)}><Flag className="mr-2 h-4 w-4" /> {t("friends.report")}</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => setBlockTarget(selected)}><Ban className="mr-2 h-4 w-4" /> {t("friends.block")}</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => unfriend(selected)}><X className="mr-2 h-4 w-4" /> {t("friends.unfriend")}</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Messages */}
                <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                  {loadingConvo ? (
                    <div className="flex items-center justify-center gap-2 py-10 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> {t("friends.loading")}</div>
                  ) : messages.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-muted-foreground">
                      <Send className="h-8 w-8 text-muted-foreground/40" />
                      <p className="text-sm font-semibold">{t("friends.convoEmpty.title")}</p>
                      <p className="text-xs">{t("friends.convoEmpty.body")}</p>
                    </div>
                  ) : (
                    messages.map((m) => (
                      <FriendMessageCard key={m.id} message={m} mine={m.sender_id === user?.id} />
                    ))
                  )}
                </div>

                {/* Note composer */}
                <div className="border-t border-border bg-card/70 px-4 pt-3 pb-3 backdrop-blur-md">
                  <form className="flex items-end gap-2" onSubmit={(e) => { e.preventDefault(); sendNote() }}>
                    <Textarea
                      value={draft}
                      onChange={(e) => setDraft(e.target.value.slice(0, NOTE_MAX_LENGTH))}
                      onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendNote() } }}
                      maxLength={NOTE_MAX_LENGTH}
                      rows={1}
                      placeholder={t("friends.notePlaceholder")}
                      className="min-h-[2.75rem] max-h-28 flex-1 resize-none rounded-2xl"
                      aria-label={t("friends.notePlaceholder")}
                    />
                    <Button type="submit" disabled={!draft.trim() || sending} className="press-scale h-11 shrink-0 rounded-2xl px-4 font-bold">
                      {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                  </form>
                  <p className="mt-1 text-right text-[11px] text-muted-foreground tabular-nums">{draft.length}/{NOTE_MAX_LENGTH}</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Block confirmation */}
      <Dialog open={!!blockTarget} onOpenChange={(o) => { if (!safetyBusy && !o) setBlockTarget(null) }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{t("friends.blockDialog.title", { name: blockTarget ? fullName(blockTarget) : "" })}</DialogTitle>
            <DialogDescription>{t("friends.blockDialog.body")}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setBlockTarget(null)} disabled={safetyBusy}>{t("common.cancel")}</Button>
            <Button variant="destructive" onClick={confirmBlock} disabled={safetyBusy} className="gap-1.5">
              {safetyBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Ban className="h-4 w-4" />} {t("friends.block")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report */}
      <Dialog open={!!reportTarget} onOpenChange={(o) => { if (!safetyBusy && !o) setReportTarget(null) }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{t("friends.reportDialog.title", { name: reportTarget ? fullName(reportTarget) : "" })}</DialogTitle>
            <DialogDescription>{t("friends.reportDialog.body")}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {REPORT_REASONS.map((reason) => (
                <button
                  key={reason}
                  type="button"
                  onClick={() => setReportReason(reason)}
                  className={cn(
                    "rounded-xl border px-3 py-2 text-sm font-semibold transition-colors",
                    reportReason === reason ? "border-primary bg-primary/5 text-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t(`friends.reportReason.${reason}`)}
                </button>
              ))}
            </div>
            <Textarea
              value={reportNote}
              onChange={(e) => setReportNote(e.target.value)}
              rows={3}
              placeholder={t("friends.reportDialog.notePlaceholder")}
              className="resize-none"
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setReportTarget(null)} disabled={safetyBusy}>{t("common.cancel")}</Button>
            <Button onClick={submitReport} disabled={safetyBusy} className="gap-1.5">
              {safetyBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Flag className="h-4 w-4" />} {t("friends.reportDialog.submit")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
