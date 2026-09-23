// JeffTutorPanel — the student-facing "Chat with Jeff" tutor.
//
// A slide-up sheet on phones and a right-hand drawer on larger screens, driven
// by useJeffTutor (which talks to the jeff-chat edge function's tutor mode).
// This is a DIFFERENT feature from src/components/lessons/JeffChat.tsx, which
// is the scripted in-lesson teaching experience.
//
// Everything here reuses existing tokens (bg-card, text-muted-foreground, the
// gold coin pill from GameNav, AnimatedNumber for the balance tick) so it
// follows the app's light/dark theme automatically.
import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import { ArrowRight, BookOpen, Coins, Send } from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import AnimatedNumber from "@/components/AnimatedNumber"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { useJeffTutor, type JeffTutorLesson, type JeffTutorMessage } from "@/hooks/useJeffTutor"

// Same asset + cache-bust as JeffMascot / JeffChat / JeffLogo.
const MASCOT_SRC = "/brand/mascot-character.png?v=2"

const STARTERS = [
  "What's the difference between a stock and a bond?",
  "How does compound interest actually work?",
  "Why did my portfolio go down today?",
]

function JeffAvatar({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <img
      src={MASCOT_SRC}
      alt=""
      width={size}
      height={size}
      className={cn("shrink-0 object-contain select-none", className)}
      style={{ width: size, height: size }}
      draggable={false}
    />
  )
}

/** Jeff rocking gently (the CookSkit body motion) + three bouncing dots. */
function TypingIndicator() {
  return (
    <motion.div
      className="flex items-end gap-2"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        animate={{ rotate: [-4, 4, -4] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "center bottom" }}
      >
        <JeffAvatar size={28} />
      </motion.div>
      <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-border bg-card px-3.5 py-2.5">
        <span className="flex items-center gap-1" aria-hidden>
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              className="block h-1.5 w-1.5 rounded-full bg-primary/70"
              animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
            />
          ))}
        </span>
        <span className="text-xs text-muted-foreground">Jeff's putting it together…</span>
      </div>
    </motion.div>
  )
}

function LessonCard({ lesson, onStart }: { lesson: JeffTutorLesson; onStart: (l: JeffTutorLesson) => void }) {
  return (
    <motion.button
      type="button"
      onClick={() => onStart(lesson)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      whileTap={{ scale: 0.98 }}
      className="press-scale mt-2 flex w-full items-center gap-3 rounded-2xl border-2 border-primary/30 bg-card px-3.5 py-3 text-left transition-colors hover:border-primary hover:bg-primary/5"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <BookOpen className="h-[18px] w-[18px]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-bold text-foreground">{lesson.title}</span>
        <span className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-primary">
          Start this lesson <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </span>
    </motion.button>
  )
}

// Tailwind styling for Jeff's markdown-formatted replies. Kept compact so
// headers/lists sit naturally inside a chat bubble (no @tailwindcss/typography),
// and every element inherits the bubble's own text color so it reads correctly
// in both light and dark mode.
const MARKDOWN_COMPONENTS = {
  strong: (props: React.HTMLAttributes<HTMLElement>) => <strong className="font-semibold" {...props} />,
  em: (props: React.HTMLAttributes<HTMLElement>) => <em className="italic" {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="mb-2 last:mb-0" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="mb-2 list-disc pl-5 last:mb-0" {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className="mb-2 list-decimal pl-5 last:mb-0" {...props} />,
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="mb-1" {...props} />,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="mb-1 text-base font-semibold" {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="mb-1 text-base font-semibold" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="mb-1 text-base font-semibold" {...props} />,
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="rounded bg-black/10 px-1 text-sm dark:bg-white/10" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="underline" target="_blank" rel="noopener noreferrer" {...props} />
  ),
}

function MessageBubble({ m, onStartLesson }: { m: JeffTutorMessage; onStartLesson: (l: JeffTutorLesson) => void }) {
  const isJeff = m.role === "assistant"
  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={cn("flex items-end gap-2", isJeff ? "justify-start" : "justify-end")}
    >
      {isJeff && <JeffAvatar size={28} className="mb-0.5" />}
      <div className={cn("min-w-0", isJeff ? "max-w-[88%]" : "max-w-[85%]")}>
        <div
          className={cn(
            "rounded-2xl px-3.5 py-2.5 text-[15px] leading-relaxed",
            // Jeff's replies are markdown (rendered below); the student's own
            // messages stay plain text with newlines preserved.
            isJeff ? "break-words" : "whitespace-pre-wrap",
            isJeff
              ? "rounded-bl-md border border-border bg-card text-foreground"
              : "rounded-br-md bg-primary text-primary-foreground",
            m.blocked && "border-gold/40 bg-gold/10",
          )}
        >
          {isJeff ? (
            // A half-finished "**" mid-stream just renders as literal text until
            // the closing marker arrives, so streaming never breaks the layout.
            <ReactMarkdown components={MARKDOWN_COMPONENTS}>{m.content}</ReactMarkdown>
          ) : (
            m.content
          )}
        </div>
        {isJeff && m.lesson && <LessonCard lesson={m.lesson} onStart={onStartLesson} />}
      </div>
    </motion.div>
  )
}

export interface JeffTutorPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function JeffTutorPanel({ open, onOpenChange }: JeffTutorPanelProps) {
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const { messages, loading, balance, cost, dailyRemaining, dailyLimit, canSend, send } = useJeffTutor()
  const [draft, setDraft] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Keep the newest message in view.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [messages.length, loading])

  // Focus the box when the panel opens (desktop only - on phones the keyboard
  // would cover half the sheet before the student has read anything).
  useEffect(() => {
    if (open && !isMobile) setTimeout(() => inputRef.current?.focus(), 250)
  }, [open, isMobile])

  const submit = (text: string) => {
    if (!canSend || !text.trim()) return
    setDraft("")
    void send(text)
  }

  // Opens a lesson the same way the dashboard / homework reminder do
  // (react-router navigate to /lessons/:id - AppContext owns post-login
  // routing, page links use useNavigate).
  const startLesson = (lesson: JeffTutorLesson) => {
    onOpenChange(false)
    navigate(`/lessons/${lesson.lesson_id}`)
  }

  const outOfQuestions = dailyRemaining <= 0
  const broke = balance < cost
  const hint = loading
    ? "Jeff's thinking…"
    : outOfQuestions
      ? `You've used today's ${dailyLimit} questions. Jeff's back tomorrow!`
      : broke
        ? `Each question costs ${cost} coins and you have ${balance.toLocaleString()}. Finish a lesson to earn more.`
        : `${dailyRemaining} question${dailyRemaining === 1 ? "" : "s"} left today · ${cost} coins each`

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={cn(
          "flex flex-col gap-0 p-0 bg-background",
          isMobile
            ? "h-[88dvh] rounded-t-3xl border-t"
            : "w-full sm:max-w-md",
        )}
      >
        {/* ── Header ── */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3 pr-12">
          <div className="relative">
            <JeffAvatar size={40} />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-success" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <SheetTitle className="text-base font-extrabold leading-tight text-foreground">Chat with Jeff</SheetTitle>
            <SheetDescription className="text-xs text-muted-foreground">Your money tutor · answers from your class material</SheetDescription>
          </div>
          {/* Same gold pill as the GameNav HUD; AnimatedNumber tweens the debit. */}
          <div
            className="flex shrink-0 items-center gap-1.5 rounded-xl border border-gold/15 bg-gold/10 px-2.5 py-1.5 text-xs font-bold text-gold shadow-sm tabular-nums"
            aria-label={`${balance} InvestiCoins`}
          >
            <Coins className="h-3.5 w-3.5 shrink-0" />
            <AnimatedNumber value={balance} />
          </div>
        </div>

        {/* ── Messages ── */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <JeffAvatar size={88} />
              </motion.div>
              <div>
                <p className="text-lg font-extrabold text-foreground">Hey! What are we figuring out today?</p>
                <p className="mt-1 text-sm text-muted-foreground">Ask me anything about money, investing, or your class.</p>
              </div>
              <div className="flex w-full max-w-sm flex-col gap-2">
                {STARTERS.map((q, i) => (
                  <motion.button
                    key={q}
                    type="button"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    onClick={() => submit(q)}
                    disabled={!canSend}
                    className="press-scale w-full rounded-2xl border-2 border-primary/30 bg-card px-4 py-3 text-left text-sm font-semibold text-foreground transition-colors hover:border-primary hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {q}
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {messages.map(m => (
                <MessageBubble key={m.id} m={m} onStartLesson={startLesson} />
              ))}
              <AnimatePresence>{loading && <TypingIndicator key="typing" />}</AnimatePresence>
            </div>
          )}
        </div>

        {/* ── Composer ── */}
        <div className="border-t border-border bg-card/70 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md">
          <form
            className="flex items-end gap-2"
            onSubmit={e => { e.preventDefault(); submit(draft) }}
          >
            <Textarea
              ref={inputRef}
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  submit(draft)
                }
              }}
              placeholder={outOfQuestions ? "Come back tomorrow!" : "Ask Jeff a question…"}
              rows={1}
              maxLength={2000}
              disabled={outOfQuestions}
              aria-label="Your question for Jeff"
              className="min-h-[2.75rem] max-h-32 flex-1 resize-none rounded-2xl bg-background text-[15px]"
            />
            <Button
              type="submit"
              disabled={!canSend || !draft.trim()}
              className="press-scale h-11 shrink-0 rounded-2xl px-4 font-bold"
              aria-label={`Send, costs ${cost} coins`}
            >
              <Send className="mr-1.5 h-4 w-4" />
              Send · {cost}
            </Button>
          </form>
          <p
            className={cn(
              "mt-2 text-xs",
              !canSend && !loading ? "font-semibold text-gold" : "text-muted-foreground",
            )}
            aria-live="polite"
          >
            {hint}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default JeffTutorPanel
