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

  // Persist every state change so closing mid-lesson resumes seamlessly.
  useEffect(() => {
    saveChat(lesson.id, { messages, options, done, scriptIdx })
  }, [lesson.id, messages, options, done, scriptIdx])

  // What's on stage right now.
  const current = [...messages].reverse().find(m => m.role === "assistant")?.content ?? ""
  const lastChoice = messages[messages.length - 1]?.role === "user" ? messages[messages.length - 1].content : null
  const jeffTurns = messages.filter(m => m.role === "assistant").length
  const mood = done ? "celebrate" : thinking ? "think" : "encourage"

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
                      <span className="text-sm text-muted-foreground">Jeff is thinking…</span>
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

            {/* Jeff himself — big, alive, on stage */}
            <div className="shrink-0 flex items-end gap-3 h-40 sm:h-48">
              <div className="h-full w-40 sm:w-48">
                <JeffMascot mood={mood} />
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
