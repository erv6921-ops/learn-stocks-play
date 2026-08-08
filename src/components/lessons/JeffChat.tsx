// JeffChat - the "Jeff teaches you" lesson experience. Not a text-message
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
  jeffChatTurn, initialJeffMessage, initialOptions, END_SIGNAL,
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

/* Expected teaching beats - drives the little progress dots up top. */
const EXPECTED_TURNS = 6

/* ── Thinking skits ──────────────────────────────────────────────────
   While the AI works, Jeff plays a fully staged skit - each one is its
   own little scene where props live WITH his body (pan in hand, blanket
   over him, pencil on a real notepad), not floating nearby. Rotates to a
   new skit if the wait drags on. */

interface Skit {
  caption: string
  Body: React.FC
}

/** 💤 Lying down on a pillow, blanket on top, z's rising. */
function NapSkit() {
  return (
    <div className="relative w-full h-full">
      {/* pillow under his head */}
      <motion.div
        className="absolute left-[4%] bottom-[5%] w-[32%] h-[15%] rounded-[45%] bg-white border border-black/10 shadow-sm"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
      />
      {/* Jeff tips over and lies down */}
      <motion.div
        className="absolute inset-0"
        initial={{ rotate: 0, y: 0 }}
        animate={{ rotate: -84, y: "16%", x: "18%" }}
        transition={{ duration: 0.65, ease: [0.3, 1.4, 0.6, 1] }}
        style={{ transformOrigin: "50% 58%" }}
      >
        <JeffMascot mood="sleep" />
      </motion.div>
      {/* blanket tucked over his body, rising gently as he breathes */}
      <motion.div
        className="absolute left-[40%] bottom-[3%] w-[58%] h-[24%] rounded-t-[2.2rem] rounded-b-md"
        style={{
          background: "repeating-linear-gradient(45deg, hsl(var(--secondary)) 0 9px, hsl(var(--primary-glow)) 9px 18px)",
          boxShadow: "inset 0 4px 0 rgba(255,255,255,0.55), 0 2px 4px rgba(var(--brand-rgb),0.15)",
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, -2.5, 0] }}
        transition={{ opacity: { delay: 0.55, duration: 0.3 }, y: { duration: 2.6, repeat: Infinity, delay: 0.8, ease: "easeInOut" } }}
      />
      {/* z's drifting up from his head */}
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="absolute font-extrabold text-primary/80"
          style={{ left: `${14 + i * 8}%`, bottom: `${36 + i * 9}%`, fontSize: `${0.65 + i * 0.18}rem` }}
          animate={{ opacity: [0, 1, 0], y: [6, -8, -20], x: [0, 4, 8] }}
          transition={{ duration: 2.1, repeat: Infinity, delay: 0.9 + i * 0.55, ease: "easeOut" }}
        >
          z
        </motion.span>
      ))}
    </div>
  )
}

/** 🍳 Pan in hand (moves with his body), steam, and a flipping pancake. */
function CookSkit() {
  return (
    <div className="relative w-full h-full">
      {/* the whole body rocks like he's working the stove - pan is INSIDE
          this wrapper so it moves with him, like it's in his hand */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: [-4, 4, -4] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "center bottom" }}
      >
        <JeffMascot mood="idle" />
        {/* frying pan at his right hand */}
        <motion.span
          className="absolute text-4xl sm:text-5xl"
          style={{ left: "56%", bottom: "14%" }}
          animate={{ rotate: [-8, 6, -8], y: [0, -3, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
        >
          🍳
        </motion.span>
        {/* pancake flipping out of the pan */}
        <motion.span
          className="absolute text-lg sm:text-xl"
          style={{ left: "66%", bottom: "30%" }}
          animate={{ y: [0, -34, 0], rotate: [0, 340, 360], opacity: [0, 1, 1] }}
          transition={{ duration: 1.15, repeat: Infinity, repeatDelay: 0.9, ease: "easeOut" }}
        >
          🥞
        </motion.span>
      </motion.div>
      {/* steam rising above the pan */}
      {[0, 1].map(i => (
        <motion.span
          key={i}
          className="absolute text-slate-400 text-xs"
          style={{ left: `${66 + i * 8}%`, bottom: "36%" }}
          animate={{ opacity: [0, 0.8, 0], y: [0, -14, -24] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.7, ease: "easeOut" }}
        >
          ∿
        </motion.span>
      ))}
    </div>
  )
}

/** ✏️ A real notepad in front of him; the pencil scribbles lines that appear. */
function SketchSkit() {
  return (
    <div className="relative w-full h-full">
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "center bottom" }}
      >
        <JeffMascot mood="think" />
      </motion.div>
      {/* notepad propped in front of him */}
      <motion.div
        className="absolute right-[-8%] bottom-[2%] w-[44%] h-[36%] rounded-lg bg-white border border-black/10 shadow-md p-2"
        style={{ rotate: 8 }}
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
      >
        {/* scribble lines appearing one after another, then clearing */}
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="h-[3px] rounded-full bg-slate-300 mb-[6px]"
            style={{ width: `${82 - i * 18}%` }}
            animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.55, times: [0, 0.25, 0.85, 1], ease: "easeOut" }}
          />
        ))}
      </motion.div>
      {/* pencil scribbling on the pad */}
      <motion.span
        className="absolute text-xl sm:text-2xl"
        style={{ left: "58%", bottom: "26%" }}
        animate={{ x: [0, 14, 3, 18, 0], y: [0, 3, 7, 10, 0], rotate: [12, 20, 14, 22, 12] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
      >
        ✏️
      </motion.span>
    </div>
  )
}

/** 🪙 Proper juggling - coins follow an arcing cascade above his hands. */
function JuggleSkit() {
  return (
    <div className="relative w-full h-full">
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: [-3, 3, -3], y: [0, -2, 0] }}
        transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "center bottom" }}
      >
        <JeffMascot mood="encourage" />
      </motion.div>
      {/* three coins in a cascade arc above his head */}
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="absolute text-lg sm:text-xl"
          style={{ left: "42%", bottom: "72%" }}
          animate={{
            x: [-30, 0, 30, 0, -30],
            y: [10, -26, 10, 22, 10],
            rotate: [0, 180, 360, 360, 360],
          }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.53, ease: "easeInOut" }}
        >
          🪙
        </motion.span>
      ))}
    </div>
  )
}

/** 📖 Book held at his chest, pages flipping. */
function BookSkit() {
  return (
    <div className="relative w-full h-full">
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "center bottom" }}
      >
        <JeffMascot mood="think" />
        {/* book held right in front of his body */}
        <motion.span
          className="absolute text-3xl sm:text-4xl"
          style={{ left: "30%", bottom: "16%" }}
          animate={{ scaleX: [1, 0.75, 1], rotate: [-2, 2, -2] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
        >
          📖
        </motion.span>
      </motion.div>
      {/* the occasional lightbulb when something clicks */}
      <motion.span
        className="absolute text-base sm:text-lg"
        style={{ left: "66%", top: "4%" }}
        animate={{ opacity: [0, 0, 1, 0], scale: [0.5, 0.5, 1.15, 0.8], y: [4, 4, -4, -8] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
      >
        💡
      </motion.span>
    </div>
  )
}

/** 🔥 Hype jumps with squash-and-stretch and impact puffs. */
function JumpSkit() {
  return (
    <div className="relative w-full h-full">
      <motion.div
        className="absolute inset-0"
        animate={{ y: [0, -32, 0, -18, 0], scaleY: [0.94, 1.08, 0.9, 1.05, 0.94], scaleX: [1.05, 0.95, 1.08, 0.96, 1.05] }}
        transition={{ duration: 1.05, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "center bottom" }}
      >
        <JeffMascot mood="encourage" />
      </motion.div>
      {/* landing puffs */}
      {[0, 1].map(i => (
        <motion.span
          key={i}
          className="absolute text-sm text-slate-400"
          style={{ left: `${26 + i * 42}%`, bottom: "2%" }}
          animate={{ opacity: [0, 0.9, 0], scale: [0.4, 1.1, 1.4], x: [0, i === 0 ? -8 : 8] }}
          transition={{ duration: 1.05, repeat: Infinity, delay: 0.5, ease: "easeOut" }}
        >
          💨
        </motion.span>
      ))}
    </div>
  )
}

/** 🚶 Pacing - walks left and right, turning to face where he's going. */
function PaceSkit() {
  return (
    <div className="relative w-full h-full">
      <motion.div
        className="absolute inset-0"
        animate={{ x: [0, 40, 40, 0, 0], scaleX: [1, 1, -1, -1, 1], y: [0, -3, 0, -3, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, times: [0, 0.46, 0.5, 0.96, 1], ease: "easeInOut" }}
        style={{ transformOrigin: "center bottom" }}
      >
        <JeffMascot mood="think" />
      </motion.div>
      {/* a thought bubble trailing overhead */}
      <motion.span
        className="absolute text-base sm:text-lg"
        style={{ left: "58%", top: "2%" }}
        animate={{ opacity: [0, 1, 1, 0], y: [4, -2, -2, -8] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      >
        💭
      </motion.span>
    </div>
  )
}

/** 🎒 Digging through his pack - uses the mascot's built-in packing scene. */
function NotesSkit() {
  return (
    <div className="relative w-full h-full">
      <JeffMascot mood="idle" activity="pack" />
      <JeffScene activity="pack" />
    </div>
  )
}

/** 🤔 Classic think pose with a pulsing thought bubble of ideas. */
function ThinkSkit() {
  return (
    <div className="relative w-full h-full">
      <JeffMascot mood="think" />
      <motion.span
        className="absolute text-xl sm:text-2xl"
        style={{ left: "62%", top: "0%" }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.6, 1, 1, 0.7], y: [6, -2, -2, -10] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        💭
      </motion.span>
      {["❓", "💰", "📈"].map((e, i) => (
        <motion.span
          key={e}
          className="absolute text-[10px] sm:text-xs"
          style={{ left: `${68 + (i % 2) * 6}%`, top: "6%" }}
          animate={{ opacity: [0, 0, 1, 0], scale: [0.5, 0.5, 1, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
        >
          {e}
        </motion.span>
      ))}
    </div>
  )
}

const SKITS: Skit[] = [
  { caption: "Jeff is thinking hard… 🤔", Body: ThinkSkit },
  { caption: "Jeff's cooking up an answer… 🍳", Body: CookSkit },
  { caption: "Jeff's recharging with a micro-nap… 💤", Body: NapSkit },
  { caption: "Jeff's digging through his notes… 🎒", Body: NotesSkit },
  { caption: "Jeff's doing his hype jumps! 🔥", Body: JumpSkit },
  { caption: "Jeff's sketching it out… ✏️", Body: SketchSkit },
  { caption: "Jeff's juggling the numbers… 🪙", Body: JuggleSkit },
  { caption: "Jeff's pacing back and forth… 💭", Body: PaceSkit },
  { caption: "Jeff's flipping through the textbook… 📖", Body: BookSkit },
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
    return saved ? saved.options : initialOptions(lesson)
  })
  const [done, setDone] = useState<boolean>(() => loadChat(lesson.id)?.done ?? false)
  const [scriptIdx, setScriptIdx] = useState<number>(() => loadChat(lesson.id)?.scriptIdx ?? 0)
  const [thinking, setThinking] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [skit, setSkit] = useState<Skit>(SKITS[0])

  // Pick a fresh skit whenever thinking starts, and rotate to a new one
  // every few seconds if the AI takes its time - keeps Jeff feeling alive.
  useEffect(() => {
    if (!thinking) return
    setSkit(prev => randomSkit(prev.caption))
    // Staged scenes need time to breathe (lying down, tucking in…), so
    // rotate a little slower than the old caption-only version.
    const interval = setInterval(() => setSkit(prev => randomSkit(prev.caption)), 5000)
    return () => clearInterval(interval)
  }, [thinking])

  // Persist every state change so closing mid-lesson resumes seamlessly.
  // Skip while `thinking`: options are momentarily cleared awaiting Jeff's
  // reply, and saving that snapshot would strand a resumed session with no
  // options and no reply if the chat closes before the reply lands.
  useEffect(() => {
    if (thinking) return
    saveChat(lesson.id, { messages, options, done, scriptIdx })
  }, [lesson.id, messages, options, done, scriptIdx, thinking])

  // What's on stage right now.
  const current = [...messages].reverse().find(m => m.role === "assistant")?.content ?? ""
  const lastChoice = messages[messages.length - 1]?.role === "user" ? messages[messages.length - 1].content : null
  const jeffTurns = messages.filter(m => m.role === "assistant").length
  const mood: JeffMoodType = done ? "celebrate" : "encourage"

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
      // Hard stop: if the AI ignores its message budget, force the wrap-up at
      // 8 Jeff messages so no lesson chat drags past that.
      const jeffCount = nextMessages.filter(m => m.role === "assistant").length + 1
      const forceEnd = jeffCount >= 8 && !text.includes(END_SIGNAL)
      const finalText = forceEnd ? `${text} ${END_SIGNAL} 🎯` : text
      setMessages(prev => [...prev, { role: "assistant", content: finalText }])
      if (finalText.includes(END_SIGNAL)) {
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
      // The translucent accent tint is layered OVER a solid app-background base
      // so the overlay fully covers the pre-lesson screen behind it. Without the
      // opaque base the near-transparent gradient let that screen show through,
      // making the chat look glitched/overlapping.
      style={{ background: "linear-gradient(180deg, hsl(var(--accent) / 0.06) 0%, hsl(var(--accent) / 0.12) 55%, hsl(var(--primary) / 0.16) 100%), hsl(var(--background))" }}
    >
      {/* soft chalkboard glow behind the stage */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 100%, hsl(var(--primary) / 0.14), transparent 65%)" }} />

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
              style={{ background: done || i < jeffTurns ? "hsl(var(--accent))" : "hsl(var(--accent) / 0.25)" }}
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
            {/* speech bubble - Jeff's current teaching beat */}
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

            {/* Jeff himself - big, alive, on stage. While thinking he plays
                a fully staged skit (lying under a blanket, pan in hand,
                scribbling a notepad…), rotating every few seconds. */}
            <div className="shrink-0 flex items-end gap-3 h-40 sm:h-48">
              <div className="relative h-full w-40 sm:w-48">
                {thinking ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={skit.caption}
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <skit.Body />
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <JeffMascot mood={mood} />
                )}
              </div>
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
