// jeffChatLesson — client wrapper + prompt assembly for the "Chat with Jeff"
// lesson experience (edge function: jeff-chat). Jeff teaches the lesson
// conversationally; the student replies via tappable options.
import { supabase } from "@/integrations/supabase/client"
import type { Lesson, LessonSection } from "@/types"

export interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export const END_SIGNAL = "Ready to test what you learned?"

/** Hardcoded initial reply options — shown before the first API call. */
export const INITIAL_OPTIONS = ["Let's go 🔥", "Tell me more", "I know a little about this"]

// Opening hook questions per lesson topic. Matched against the lesson's
// category (specific ids first, then keyword families).
const CATEGORY_HOOKS: [RegExp, string][] = [
  [/psychology-of-money|behavioral/, "If you got $100 right now, what's the FIRST thing you'd do with it?"],
  [/delayed|gratification/, "Would you rather have $50 today or $100 in a month?"],
  [/budget/, "Do you actually know where your money goes every month?"],
  [/banking/, "Do you know how banks make money off your savings account?"],
  [/credit|debt/, "Did you know your credit score can affect your rent, job, and even phone plan?"],
  [/invest|stock|portfolio|etf|bond/, "If I told you $100 invested at 17 beats $1,000 invested at 30, would you believe me?"],
  [/tax/, "How much of a $15/hr paycheck do you actually take home?"],
  [/insurance/, "What would happen if you got in a car accident tomorrow with no insurance?"],
  [/entrepreneur|business/, "What's one problem in your school or neighborhood nobody's solved yet?"],
]

export function openingHook(lesson: Lesson): string {
  const hay = `${lesson.category} ${lesson.title.toLowerCase()}`
  for (const [re, hook] of CATEGORY_HOOKS) {
    if (re.test(hay)) return hook
  }
  return `What do you already know about ${lesson.title}?`
}

/** Jeff's hardcoded opener — no API call needed for the first message. */
export function initialJeffMessage(lesson: Lesson): string {
  return `Hey! I'm Jeff 👋 I'll be teaching you about ${lesson.title} today. Quick question first — ${openingHook(lesson)}`
}

export function buildSystemPrompt(lesson: Lesson): string {
  return `You are Jeff, the friendly mascot and financial literacy guide for InvestiPlay, an app that teaches high school students personal finance through gamification. You are teaching a lesson called '${lesson.title}' which covers '${lesson.description}'.

Your personality: enthusiastic, encouraging, uses casual teen-friendly language, occasional light humor, never condescending. You explain concepts in 1-3 short sentences max per message — never long paragraphs. You use real-world examples that resonate with teenagers (jobs, sneakers, streaming services, gaming, college).

Your job: teach the core concept of this lesson through a back-and-forth conversation. Start by introducing the topic with a hook (surprising stat or relatable scenario). Then explain the concept across 4-6 message exchanges. End by summarizing the key takeaway in one sentence and telling the student they're ready for the quiz.

Always end your final message with exactly: 'Ready to test what you learned? 🎯' — this is the signal to show the quiz button.

Keep each message under 40 words. Never use bullet points or headers. Sound like a knowledgeable friend, not a textbook.`
}

/** One chat turn: full history in, Jeff's reply + next tap options out. */
export async function jeffChatTurn(
  lesson: Lesson,
  messages: ChatMessage[],
): Promise<{ text: string; options: string[] }> {
  const { data, error } = await supabase.functions.invoke("jeff-chat", {
    body: { system: buildSystemPrompt(lesson), messages },
  })
  if (error) throw new Error(error.message || "AI request failed")
  if (data?.error) throw new Error(data.error)
  return { text: (data?.text as string) || "", options: (data?.options as string[]) || [] }
}

// ── Scripted fallback ──────────────────────────────────────────────
// When the AI is unavailable (no API credits, offline, rate-limited), Jeff
// teaches from the lesson's own written content instead of erroring out.
// Chunks concept paragraphs into chat-sized messages (<~45 words each).

const CHUNK_WORDS = 42

function chunkText(text: string): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean)
  const chunks: string[] = []
  let current = ""
  for (const s of sentences) {
    const candidate = current ? `${current} ${s}` : s
    if (candidate.split(/\s+/).length > CHUNK_WORDS && current) {
      chunks.push(current)
      current = s
    } else {
      current = candidate
    }
  }
  if (current) chunks.push(current)
  return chunks
}

/** Jeff's teaching script from the lesson's concept sections. */
export function buildScript(sections: LessonSection[]): string[] {
  const out: string[] = []
  for (const s of sections) {
    if (s.type !== "concept") continue
    for (const p of s.paragraphs) out.push(...chunkText(p))
    if (s.realWorldExample) out.push(...chunkText(`Real talk: ${s.realWorldExample}`))
  }
  const script = out.slice(0, 7)
  if (script.length === 0) return []
  script[script.length - 1] += ` That's the big idea! ${END_SIGNAL} 🎯`
  return script
}

/** Rotating tap options while Jeff works through the script. */
export function scriptOptions(idx: number): string[] {
  const sets = [
    ["Tell me more", "Give me an example", "Got it 👍"],
    ["Makes sense", "Wait, explain that again", "Keep going"],
    ["Interesting 🤔", "Okay, then what", "Got it 👍"],
  ]
  return sets[idx % sets.length]
}

// ── Resume support: conversation persists per-lesson in localStorage ──
const storeKey = (lessonId: string) => `ip_jeffchat_${lessonId}`

export interface SavedChat {
  messages: ChatMessage[]
  options: string[]
  done: boolean
  /** Position in the scripted fallback (0 = AI-only so far). */
  scriptIdx?: number
}

export function loadChat(lessonId: string): SavedChat | null {
  try {
    const raw = localStorage.getItem(storeKey(lessonId))
    return raw ? (JSON.parse(raw) as SavedChat) : null
  } catch { return null }
}

export function saveChat(lessonId: string, chat: SavedChat) {
  try { localStorage.setItem(storeKey(lessonId), JSON.stringify(chat)) } catch { /* ignore */ }
}
