// JeffChat — the "Jeff teaches you" lesson experience. Not a text-message
// thread: the real animated Jeff mascot stands on a full-screen stage and
// teaches one beat at a time in a big speech bubble. While the AI thinks,
// Jeff goes into his "think" pose; when the lesson wraps he celebrates and
// the quiz button appears. The student answers by tapping big choice
// buttons. Conversation history still drives the AI (via the jeff-chat edge
// function) and persists to localStorage so closing mid-lesson resumes.

import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { JeffMascot } from "@/components/Jeff/JeffMascot"
import { JeffScene } from "@/components/Jeff"
import type { JeffMoodType, JeffActivity } from "@/contexts/JeffContext"
import { X, History } from "lucide-react"
import type { Lesson } from "@/types"
import {
  jeffChatTurn, initialJeffMessage, INITIAL_OPTIONS, END_SIGNAL,
  loadChat, saveChat, scriptOptions, type ChatMessage,
} from "@/lib/jeffChatLesson"

/** Tiny Jeff head for lesson-list indicators (the real mascot art). */
export function JeffChatAvatar({ size = 16 }: { size?: number }) {
  return (
    <img
      src="/brand/mascot-character.png?v=2"
      alt=""
      width={size}
      height={size}
      className="shrink-0 object-contain"
      style={{ width: size, height: size }}
    />
  )
}

/* Expected teaching beats — drives the little progress dots up top. */
const EXPECTED_TURNS = 6

/* ── Thinking skits ──────────────────────────────────────────────────
   While the AI works, Jeff doesn't just stand there — he plays a random
   little skit (cooking, napping, jumping jacks, sketching, juggling
   numbers, pacing…) and rotates to a new one if the wait drags on. */

interface Skit {
  caption: string
  mood: JeffMoodType
  /** Built-in mascot activity (cook/nap/pack render their own props). */
  activity?: JeffActivity
  /** Extra whole-body motion layered by the stage. */
  anim?: { animate: Record<string, number[]>; duration: number }
  /** Extra floating emoji scene rendered around Jeff. */
  extras?: { emoji: string; left: string; top: string; delay: number }[]
}

const SKITS: Skit[] = [
  { caption: "Jeff is thinking hard… 🤔", mood: "think" },
  { caption: "Jeff's cooking up an answer… 🍳", mood: "idle", activity: "cook" },
  { caption: "Jeff's recharging with a micro-nap… 💤", mood: "sleep", activity: "nap" },
  { caption: "Jeff's digging through his notes… 🎒", mood: "idle", activity: "pack" },
  {
    caption: "Jeff's doing his hype jumps! 🔥", mood: "encourage",
    anim: { animate: { y: [0, -30, 0, -16, 0], scaleY: [1, 1.06, 0.92, 1.04, 1] }, duration: 0.9 },
  },
  {
    caption: "Jeff's sketching it out… ✏️", mood: "think",
    extras: [
      { emoji: "✏️", left: "78%", top: "30%", delay: 0 },
      { emoji: "📐", left: "8%", top: "48%", delay: 0.5 },
      { emoji: "💡", left: "60%", top: "6%", delay: 1 },
    ],
  },
  {
    caption: "Jeff's juggling the numbers… 🪙", mood: "idle",
    anim: { animate: { rotate: [-4, 4, -4] }, duration: 0.7 },
    extras: [
      { emoji: "🪙", left: "20%", top: "18%", delay: 0 },
      { emoji: "🪙", left: "48%", top: "4%", delay: 0.35 },
      { emoji: "🪙", left: "74%", top: "20%", delay: 0.7 },
    ],
  },
  {
    caption: "Jeff's pacing back and forth…", mood: "think",
    anim: { animate: { x: [0, 34, 34, 0, 0] }, duration: 3.2 },
  },
  {
    caption: "Jeff's warming up with a spin! 🌀", mood: "encourage",
    anim: { animate: { rotate: [0, 0, 360, 360], y: [0, -18, -18, 0] }, duration: 1.4 },
  },
  {
    caption: "Jeff's flipping through the textbook… 📖", mood: "think",
    extras: [
      { emoji: "📖", left: "70%", top: "42%", delay: 0 },
      { emoji: "🔎", left: "14%", top: "22%", delay: 0.6 },
    ],
  },
]

const randomSkit = (excludeCaption?: string): Skit => {
  const pool = SKITS.filter(s => s.caption !== excludeCaption)
  return pool[Math.floor(Math.random() * pool.length)]
}

interface JeffChatProps {
  lesson: Lesson
  /** Scripted fallback: Jeff teaches these when the AI is unavailable. */
  script?: string[]
  /** Student tapped "Take the Quiz →". */
  onQuizReady: () => void
  /** Student closed the stage (progress is saved). */
  onClose: () => void
}

export default function JeffChat({ lesson, script = [], onQuizReady, onClose }: JeffChatProps) {
  // Resume a saved conversation, otherwise open with Jeff's hardcoded hook.
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    loadChat(lesson.id)?.messages ?? [{ role: "assistant", content: initialJeffMessage(lesson) }]
  )
  const [options, setOptions] = useState<string[]>(() => {
    const saved = loadChat(lesson.id)
    return saved ? saved.options : INITIAL_OPTIONS
  })
  const [done, setDone] = useState<boolean>(() => loadChat(lesson.id)?.done ?? false)
  const [scriptIdx, setScriptIdx] = useState<number>(() => loadChat(lesson.id)?.scriptIdx ?? 0)
  const [thinking, setThinking] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [skit, setSkit] = useState<Skit>(SKITS[0])

  // Pick a fresh skit whenever thinking starts, and rotate to a new one
  // every few seconds if the AI takes its time — keeps Jeff feeling alive.
  useEffect(() => {
    if (!thinking) return
    setSkit(prev => randomSkit(prev.caption))
    const interval = setInterval(() => setSkit(prev => randomSkit(prev.caption)), 3800)
    return () => clearInterval(interval)
  }, [thinking])

  // Persist every state change so closing mid-lesson resumes seamlessly.
  useEffect(() => {
    saveChat(lesson.id, { messages, options, done, scriptIdx })
  }, [lesson.id, messages, options, done, scriptIdx])

  // What's on stage right now.
  const current = [...messages].reverse().find(m => m.role === "assistant")?.content ?? ""
  const lastChoice = messages[messages.length - 1]?.role === "user" ? messages[messages.length - 1].content : null
  const jeffTurns = messages.filter(m => m.role === "assistant").length
  const mood: JeffMoodType = done ? "celebrate" : thinking ? skit.mood : "encourage"
  const activity: JeffActivity = thinking ? (skit.activity ?? "none") : "none"

  const send = async (choice: string) => {
    if (thinking) return
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: choice }]
    setMessages(nextMessages)
    setOptions([])
    setThinking(true)
    const minDelay = new Promise(r => setTimeout(r, 800)) // let the think pose land

    try {
      const [{ text, options: newOptions }] = await Promise.all([
        jeffChatTurn(lesson, nextMessages),
        minDelay,
      ])
      setThinking(false)
      setMessages(prev => [...prev, { role: "assistant", content: text }])
      if (text.includes(END_SIGNAL)) {
        setDone(true)
        setOptions([])
      } else {
        setOptions(newOptions)
      }
    } catch {
      await minDelay
      setThinking(false)
      if (scriptIdx < script.length) {
        // AI unavailable → Jeff keeps teaching from the lesson's own content.
        const text = script[scriptIdx]
        setMessages(prev => [...prev, { role: "assistant", content: text }])
        setScriptIdx(scriptIdx + 1)
        if (text.includes(END_SIGNAL)) {
          setDone(true)
          setOptions([])
        } else {
          setOptions(scriptOptions(scriptIdx))
        }
      } else {
        setMessages([...messages, { role: "assistant", content: "Hmm, lost my train of thought for a sec! Try tapping that again." }])
        setOptions(lastOptionsRef.current)
      }
    }
  }

  // Remember the options that were on screen so an error can restore them.
  const lastOptionsRef = useRef<string[]>(options)
  useEffect(() => { if (options.length) lastOptionsRef.current = options }, [options])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(150 40% 96%) 0%, hsl(152 38% 90%) 55%, hsl(168 45% 84%) 100%)" }}
    >
      {/* soft chalkboard glow behind the stage */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 100%, hsl(170 60% 30% / 0.14), transparent 65%)" }} />

      {/* ── Top bar: lesson + progress dots + close ── */}
      <div className="relative z-10 flex items-center gap-3 px-4 py-3 shrink-0">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary/70">Jeff's class</p>
          <p className="font-display font-extrabold text-foreground truncate">{lesson.title}</p>
        </div>
        <div className="flex items-center gap-1.5" aria-label="Lesson progress">
          {Array.from({ length: EXPECTED_TURNS }).map((_, i) => (
            <span
              key={i}
              className="h-1.5 w-4 rounded-full transition-colors"
              style={{ background: done || i < jeffTurns ? "hsl(152 62% 42%)" : "hsl(152 20% 78%)" }}
            />
          ))}
        </div>
        <button
          onClick={() => setShowHistory(h => !h)}
          aria-label="Conversation history"
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${showHistory ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-black/5"}`}
        >
          <History className="w-4.5 h-4.5" />
        </button>
        <button
          onClick={onClose}
          aria-label="Leave class"
          className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-black/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* ── The stage ── */}
      <div className="relative z-10 flex-1 min-h-0 flex flex-col max-w-3xl w-full mx-auto px-4">
        {showHistory ? (
          /* transcript review */
          <div className="flex-1 min-h-0 overflow-y-auto py-2 space-y-2 pr-1">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : ""}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm ${
                  m.role === "assistant" ? "bg-white/80 border border-border text-foreground" : "bg-primary text-primary-foreground"
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* speech bubble — Jeff's current teaching beat */}
            <div className="flex-1 min-h-0 flex flex-col justify-end pb-2">
              {lastChoice && !thinking && (
                <motion.p
                  key={`echo-${messages.length}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-xs text-muted-foreground text-right mb-2 italic"
                >
                  You: "{lastChoice}"
                </motion.p>
              )}
              <AnimatePresence mode="wait">
                <motion.div
                  key={thinking ? "thinking" : current}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22 }}
                  className="relative rounded-3xl bg-white shadow-lg border border-border/70 px-5 py-4 sm:px-6 sm:py-5"
                >
                  {thinking ? (
                    <div className="flex items-center gap-2.5 py-1">
                      <div className="flex gap-1.5">
                        {[0, 1, 2].map(i => (
                          <motion.span
                            key={i}
                            className="w-2 h-2 rounded-full bg-primary/60"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={skit.caption}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="text-sm text-muted-foreground"
                        >
                          {skit.caption}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  ) : (
                    <p className="text-[17px] sm:text-lg leading-relaxed text-foreground whitespace-pre-wrap">
                      {current}
                    </p>
                  )}
                  {/* bubble tail pointing down at Jeff */}
                  <span className="absolute -bottom-2 left-14 w-4 h-4 rotate-45 bg-white border-r border-b border-border/70" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Jeff himself — big, alive, on stage. While thinking he plays
                a random skit: extra body motion + activity props + floating
                emoji scene, rotating every few seconds. */}
            <div className="shrink-0 flex items-end gap-3 h-40 sm:h-48">
              <motion.div
                key={thinking ? skit.caption : "idle"}
                className="relative h-full w-40 sm:w-48"
                animate={thinking && skit.anim ? skit.anim.animate : { x: 0, y: 0, rotate: 0, scaleY: 1 }}
                transition={thinking && skit.anim
                  ? { duration: skit.anim.duration, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.3 }}
                style={{ transformOrigin: "center bottom" }}
              >
                <JeffMascot mood={mood} activity={activity} />
                {/* built-in activity props (frying pan / sleeping mat / backpack) */}
                {thinking && skit.activity && <JeffScene activity={skit.activity} />}
                {/* skit-specific floating extras */}
                <AnimatePresence>
                  {thinking && skit.extras?.map((e, i) => (
                    <motion.span
                      key={`${skit.caption}-${i}`}
                      className="absolute text-lg sm:text-xl pointer-events-none"
                      style={{ left: e.left, top: e.top }}
                      initial={{ opacity: 0, scale: 0, y: 6 }}
                      animate={{ opacity: [0, 1, 1, 0.6], scale: [0.6, 1.1, 1, 1], y: [6, -6, -2, -8], rotate: [-6, 6, -6] }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 1.8, repeat: Infinity, delay: e.delay, ease: "easeInOut" }}
                    >
                      {e.emoji}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </>
        )}
      </div>

      {/* ── Bottom: choice buttons OR the quiz button ── */}
      <div className="relative z-10 shrink-0 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] bg-white/70 backdrop-blur-md border-t border-border/60">
        <div className="max-w-3xl mx-auto">
          {done ? (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Button size="lg" onClick={onQuizReady} className="w-full text-base font-bold press-scale h-12">
                Take the Quiz →
              </Button>
            </motion.div>
          ) : (
            <div className="grid gap-2 min-h-[3rem]">
              {!thinking && options.map((opt, i) => (
                <motion.button
                  key={`${messages.length}-${i}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => send(opt)}
                  className="press-scale w-full rounded-2xl border-2 border-primary/30 bg-white px-4 py-3 text-[15px] font-semibold text-foreground text-left hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  {opt}
                </motion.button>
              ))}
              {thinking && (
                <p className="text-center text-xs text-muted-foreground py-3">Jeff's putting it together…</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
