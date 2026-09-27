// "Send to a friend" — a self-contained button + picker dialog reused on lesson
// cards, the lesson view, Jeff prompts and the stock detail page. Opens a list
// of accepted friends, an optional ≤140-char note (basic profanity filter), and
// posts a structured share card via friends_send_message.
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Send, Loader2, Check, Users, BookOpen, LineChart, MessageCircle } from "lucide-react"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { getInitials } from "@/lib/playerStats"
import { cn } from "@/lib/utils"
import { containsProfanity, NOTE_MAX_LENGTH } from "@/lib/profanity"
import {
  listFriends, sendMessage, fullName, type FriendRow, type SharePayload,
} from "@/lib/friends"
import { notifyFriendsChanged } from "@/hooks/useFriendsUnread"

const TYPE_ICON = { lesson: BookOpen, stock: LineChart, jeff_prompt: MessageCircle } as const

export interface SendToFriendButtonProps {
  share: SharePayload
  /** icon = round ghost icon button; pill = bordered pill; button = default. */
  variant?: "icon" | "pill" | "button"
  className?: string
  /** Override the visible label (pill/button variants). */
  label?: string
}

export default function SendToFriendButton({ share, variant = "pill", className, label }: SendToFriendButtonProps) {
  const { t } = useTranslation()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [friends, setFriends] = useState<FriendRow[]>([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const [note, setNote] = useState("")
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (!open) return
    setSelected(null)
    setNote("")
    setLoading(true)
    listFriends()
      .then(setFriends)
      .catch(() => toast({ title: t("friends.errors.loadFriends"), variant: "destructive" }))
      .finally(() => setLoading(false))
  }, [open, t, toast])

  const Icon = TYPE_ICON[share.type]

  const handleSend = async () => {
    if (!selected) return
    if (note && containsProfanity(note)) {
      toast({ title: t("friends.send.profanity"), variant: "destructive" })
      return
    }
    setSending(true)
    try {
      await sendMessage({
        to: selected,
        type: share.type,
        referenceId: share.referenceId,
        referenceLabel: share.referenceLabel ?? null,
        note: note.trim() || null,
      })
      notifyFriendsChanged()
      const to = friends.find((f) => f.user_id === selected)
      toast({ title: t("friends.send.sent", { name: to ? fullName(to) : t("friends.send.friend") }) })
      setOpen(false)
    } catch (e) {
      toast({
        title: t("friends.send.failed"),
        description: e instanceof Error ? e.message : undefined,
        variant: "destructive",
      })
    } finally {
      setSending(false)
    }
  }

  const trigger =
    variant === "icon" ? (
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(true) }}
        aria-label={t("friends.send.action")}
        title={t("friends.send.action")}
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
      >
        <Send className="h-4 w-4" />
      </button>
    ) : variant === "pill" ? (
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(true) }}
        className={cn(
          "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-semibold text-muted-foreground transition-colors press-scale hover:border-foreground/30 hover:text-foreground",
          className,
        )}
      >
        <Send className="h-4 w-4" /> {label ?? t("friends.send.action")}
      </button>
    ) : (
      <Button
        type="button"
        variant="secondary"
        className={cn("gap-1.5", className)}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(true) }}
      >
        <Send className="h-4 w-4" /> {label ?? t("friends.send.action")}
      </Button>
    )

  return (
    <>
      {trigger}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="h-4 w-4 text-primary" /> {t("friends.send.title")}
            </DialogTitle>
            <DialogDescription className="flex items-center gap-2 text-left">
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1 truncate">
                {share.referenceLabel ?? t(`friends.cardType.${share.type}`)}
              </span>
            </DialogDescription>
          </DialogHeader>

          {loading ? (
            <div className="flex items-center justify-center gap-2 py-10 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" /> {t("friends.loading")}
            </div>
          ) : friends.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-10 text-center text-muted-foreground">
              <Users className="h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm font-semibold">{t("friends.send.noFriendsTitle")}</p>
              <p className="text-xs">{t("friends.send.noFriendsBody")}</p>
            </div>
          ) : (
            <>
              <div className="max-h-60 space-y-1.5 overflow-y-auto pr-1">
                <AnimatePresence initial={false}>
                  {friends.map((f) => {
                    const active = selected === f.user_id
                    return (
                      <motion.button
                        key={f.user_id}
                        type="button"
                        layout
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => setSelected(f.user_id)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition-colors",
                          active ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-muted/60",
                        )}
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-extrabold text-primary">
                          {getInitials(f.first_name ?? undefined, f.last_name ?? undefined)}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-sm font-bold">{fullName(f)}</span>
                        {active && <Check className="h-4 w-4 shrink-0 text-primary" />}
                      </motion.button>
                    )
                  })}
                </AnimatePresence>
              </div>

              <div>
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value.slice(0, NOTE_MAX_LENGTH))}
                  maxLength={NOTE_MAX_LENGTH}
                  rows={2}
                  placeholder={t("friends.send.notePlaceholder")}
                  className="resize-none"
                  aria-label={t("friends.send.noteLabel")}
                />
                <p className="mt-1 text-right text-[11px] text-muted-foreground tabular-nums">
                  {note.length}/{NOTE_MAX_LENGTH}
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setOpen(false)} disabled={sending}>
                  {t("common.cancel")}
                </Button>
                <Button onClick={handleSend} disabled={!selected || sending} className="gap-1.5">
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {t("friends.send.action")}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
