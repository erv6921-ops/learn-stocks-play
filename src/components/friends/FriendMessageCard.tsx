// One message in a friend conversation: a tappable structured share card
// (lesson / jeff_prompt / stock) or a plain note bubble. Aligned right for my
// own messages, left for the friend's — same bubble language as JeffTutorPanel.
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { BookOpen, LineChart, MessageCircle, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { openJeffWithPrompt, type FriendMessage } from "@/lib/friends"

const TYPE_ICON = { lesson: BookOpen, stock: LineChart, jeff_prompt: MessageCircle } as const

export default function FriendMessageCard({ message, mine }: { message: FriendMessage; mine: boolean }) {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const open = () => {
    switch (message.type) {
      case "lesson":
        if (message.reference_id) navigate(`/lessons/${message.reference_id}`)
        break
      case "stock":
        if (message.reference_id) navigate(`/stocks/${message.reference_id}`)
        break
      case "jeff_prompt":
        if (message.reference_id) openJeffWithPrompt(message.reference_id)
        break
    }
  }

  const align = mine ? "items-end" : "items-start"

  if (message.type === "note") {
    return (
      <motion.div
        layout="position"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={cn("flex flex-col gap-1", align)}
      >
        <div
          className={cn(
            "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[15px] leading-relaxed",
            mine
              ? "rounded-br-md bg-primary text-primary-foreground"
              : "rounded-bl-md border border-border bg-card text-foreground",
          )}
        >
          {message.note}
        </div>
      </motion.div>
    )
  }

  const Icon = TYPE_ICON[message.type]
  const label = message.reference_label ?? t(`friends.cardType.${message.type}`)

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("flex flex-col gap-1", align)}
    >
      <button
        type="button"
        onClick={open}
        className={cn(
          "group flex max-w-[85%] items-center gap-3 rounded-2xl border-2 px-3.5 py-3 text-left transition-colors press-scale",
          mine
            ? "border-primary/40 bg-primary/5 hover:border-primary hover:bg-primary/10"
            : "border-border bg-card hover:border-primary/50 hover:bg-primary/5",
        )}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {t(`friends.cardType.${message.type}`)}
          </span>
          <span className="mt-0.5 block truncate text-sm font-bold text-foreground">{label}</span>
          <span className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-primary">
            {t(`friends.open.${message.type}`)} <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </span>
      </button>
      {message.note && (
        <div
          className={cn(
            "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
            mine
              ? "rounded-br-md bg-primary text-primary-foreground"
              : "rounded-bl-md border border-border bg-card text-foreground",
          )}
        >
          {message.note}
        </div>
      )}
    </motion.div>
  )
}
