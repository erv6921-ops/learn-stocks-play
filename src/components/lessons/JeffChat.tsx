// JeffChat — the "Chat with Jeff" lesson experience. Replaces paragraph
// reading with an iMessage-style conversation: Jeff (AI, via the jeff-chat
// edge function) teaches the concept in short bursts; the student replies by
// tapping pre-written pills. When Jeff sends the end signal, the quiz button
// appears. Conversation persists to localStorage so closing mid-lesson
// resumes where the student left off.

import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import type { Lesson } from "@/types"
import {
  jeffChatTurn, initialJeffMessage, INITIAL_OPTIONS, END_SIGNAL,
  loadChat, saveChat, scriptOptions, type ChatMessage,
} from "@/lib/jeffChatLesson"

const JEFF_GREEN = "#1a5c41"
const JEFF_GOLD = "#f59e0b"

/* ── Jeff's chat avatar: gold circle, dot eyes, curved smile ── */
export function JeffChatAvatar({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden className="shrink-0">
      {/* green body peeking behind the head */}
      <ellipse cx="16" cy="29" rx="9" ry="5" fill={JEFF_GREEN} />
      {/* gold head */}
      <circle cx="16" cy="15" r="12" fill={JEFF_GOLD} />
      {/* eyes */}
      <circle cx="12" cy="13" r="1.6" fill="#1f2937" />
      <circle cx="20" cy="13" r="1.6" fill="#1f2937" />
      {/* smile */}
      <path d="M 11.5 18 Q 16 21.5 20.5 18" stroke="#1f2937" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </svg>
  )
}

/* ── typing indicator: three bouncing dots in a Jeff bubble ── */
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <JeffChatAvatar />
      <div className="rounded-2xl rounded-bl-md px-4 py-3" style={{ background: JEFF_GREEN }}>
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-white/70"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface JeffChatProps {
  lesson: Lesson
  /**
   * Scripted fallback: Jeff teaches these messages (built from the lesson's
   * own content) whenever the AI is unavailable, instead of erroring out.
   */
  script?: string[]
  /** Student tapped "Take the Quiz →". */
  onQuizReady: () => void
  /** Student closed the chat (progress is saved). */
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
  const [typing, setTyping] = useState(false)
  const feedRef = useRef<HTMLDivElement>(null)

  // Persist every state change so closing mid-lesson resumes seamlessly.
  useEffect(() => {
    saveChat(lesson.id, { messages, options, done, scriptIdx })
  }, [lesson.id, messages, options, done, scriptIdx])

  // Smooth scroll to the newest message.
  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, typing, done])

  const send = async (choice: string) => {
    if (typing) return
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: choice }]
    setMessages(nextMessages)
    setOptions([])
    setTyping(true)
    const minDelay = new Promise(r => setTimeout(r, 800)) // typing-dots realism

    try {
      const [{ text, options: newOptions }] = await Promise.all([
        jeffChatTurn(lesson, nextMessages),
        minDelay,
      ])
      setTyping(false)
      setMessages(prev => [...prev, { role: "assistant", content: text }])
      if (text.includes(END_SIGNAL)) {
        setDone(true)
        setOptions([])
      } else {
        setOptions(newOptions)
      }
    } catch {
      await minDelay
      setTyping(false)
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
        // No script left either: drop the student's unanswered bubble,
        // apologize, and re-show the same options so they can tap again.
        setMessages([...messages, { role: "assistant", content: "Hmm, lost my train of thought for a sec! Try tapping that again." }])
        setOptions(lastOptionsRef.current)
      }
    }
  }

  // Remember the options that were on screen so an error can restore them.
  const lastOptionsRef = useRef<string[]>(options)
  useEffect(() => { if (options.length) lastOptionsRef.current = options }, [options])

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* ── Top bar ── */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-white shrink-0">
        <JeffChatAvatar size={38} />
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 leading-tight">Jeff</p>
          <p className="text-xs text-gray-500">InvestiPlay Guide</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close chat"
          className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* ── Message feed ── */}
      <div ref={feedRef} className="flex-1 overflow-y-auto px-4 py-5">
        <div className="max-w-2xl mx-auto space-y-3">
          {/* lesson context chip */}
          <p className="text-center text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-4">
            {lesson.title}
          </p>

          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : ""}`}
              >
                {m.role === "assistant" && <JeffChatAvatar />}
                <div
                  className={`max-w-[78%] px-4 py-2.5 text-[15px] leading-snug whitespace-pre-wrap ${
                    m.role === "assistant"
                      ? "rounded-2xl rounded-bl-md text-white"
                      : "rounded-2xl rounded-br-md text-gray-900 font-medium"
                  }`}
                  style={{ background: m.role === "assistant" ? JEFF_GREEN : JEFF_GOLD }}
                >
                  {m.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {typing && <TypingIndicator />}
        </div>
      </div>

      {/* ── Bottom: reply pills OR the quiz button ── */}
      <div className="border-t border-gray-200 bg-white px-4 py-3 shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="max-w-2xl mx-auto">
          {done ? (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Button
                size="lg"
                onClick={onQuizReady}
                className="w-full text-base font-bold press-scale border-0 text-gray-900 hover:opacity-90"
                style={{ background: JEFF_GOLD }}
              >
                Take the Quiz →
              </Button>
            </motion.div>
          ) : (
            <div className="flex gap-2 flex-wrap justify-end min-h-[2.5rem]">
              {!typing && options.map((opt, i) => (
                <motion.button
                  key={`${messages.length}-${i}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => send(opt)}
                  className="press-scale rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors hover:text-white"
                  style={{ borderColor: JEFF_GREEN, color: JEFF_GREEN }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = JEFF_GREEN }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent" }}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
