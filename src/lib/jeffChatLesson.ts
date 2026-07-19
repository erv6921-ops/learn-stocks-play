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

// Opening hook questions per lesson topic, each with reply options that
// actually ANSWER that question (so the first tap never feels irrelevant).
// Matched against the lesson's category (specific ids first, then keyword
// families).
interface Hook { question: string; answers: string[] }

const CATEGORY_HOOKS: [RegExp, Hook][] = [
  [/delayed|gratification|instant/, {
    question: "Would you rather have $50 today or $100 in a month?",
    answers: ["$50 today, easy", "$100 in a month", "Hmm, depends"],
  }],
  [/psychology-of-money|behavioral/, {
    question: "If you got $100 right now, what's the FIRST thing you'd do with it?",
    answers: ["Spend it on something fun 🛍️", "Save every penny", "Half spend, half save"],
  }],
  [/budget/, {
    question: "Do you actually know where your money goes every month?",
    answers: ["Yeah, pretty much", "Not really 😅", "I don't track anything"],
  }],
  [/banking/, {
    question: "Do you know how banks make money off your savings account?",
    answers: ["No idea honestly", "They charge fees, right?", "They invest it somehow?"],
  }],
  [/credit|debt/, {
    question: "Did you know your credit score can affect your rent, job, and even phone plan?",
    answers: ["Wait, seriously?", "Yeah, I knew that", "What even is a credit score?"],
  }],
  [/invest|stock|portfolio|etf|bond/, {
    question: "If I told you $100 invested at 17 beats $1,000 invested at 30, would you believe me?",
    answers: ["No way, prove it", "I'd believe it", "How does that work?"],
  }],
  [/tax/, {
    question: "How much of a $15/hr paycheck do you actually take home?",
    answers: ["All of it… right?", "Like $12/hr maybe?", "No clue honestly"],
  }],
  [/insurance/, {
    question: "What would happen if you got in a car accident tomorrow with no insurance?",
    answers: ["I'd be in big trouble", "My parents would cover it?", "Never thought about it"],
  }],
  [/entrepreneur|business/, {
    question: "What's one problem in your school or neighborhood nobody's solved yet?",
    answers: ["Ooh, I've got ideas", "Let me think about that", "Why does that matter?"],
  }],
]

export function openingHook(lesson: Lesson): Hook {
  const hay = `${lesson.category} ${lesson.title.toLowerCase()}`
  for (const [re, hook] of CATEGORY_HOOKS) {
    if (re.test(hay)) return hook
  }
  return {
    question: `What do you already know about ${lesson.title.toLowerCase()}?`,
    answers: ["Basically nothing", "A little bit", "Quite a bit actually"],
  }
}

// Jeff already introduced himself in onboarding, so lessons skip the "I'm Jeff"
// every time. Instead he rolls in casually — sometimes fresh off some random
// activity, sometimes just diving straight in.
const LESSON_OPENERS: ((title: string) => string)[] = [
  (t) => `Just got back from a run 🏃 — anyway, today it's ${t}.`,
  (t) => `Phew, just finished a pickup basketball game 🏀 Okay, ${t} time.`,
  (t) => `Was out on a walk, but I'm back 🚶 Let's talk ${t}.`,
  (t) => `Just grabbed a snack 🍎 Alright — ${t}.`,
  (t) => `Fresh off beating my high score 🎮 So, ${t}.`,
  (t) => `Just wrapped up a quick nap 😴 Now — ${t}.`,
  (t) => `Back from the gym 💪 Today we're on ${t}.`,
  (t) => `Just made myself a smoothie 🥤 Cool, let's do ${t}.`,
  (t) => `Okay, let's jump right in — ${t}.`,
  (t) => `Ready when you are. Today it's ${t}.`,
  (t) => `${t}. This one's actually kinda fun.`,
  (t) => `Alright, ${t} — let's get into it.`,
]

/** Jeff's opener — no API call needed for the first message. */
export function initialJeffMessage(lesson: Lesson): string {
  const opener = LESSON_OPENERS[Math.floor(Math.random() * LESSON_OPENERS.length)](lesson.title)
  return `${opener} Quick question first — ${openingHook(lesson).question}`
}

/** Reply options matching the opener's hook question. */
export function initialOptions(lesson: Lesson): string[] {
  return openingHook(lesson).answers
}

export function buildSystemPrompt(lesson: Lesson): string {
  return `You are Jeff, the friendly mascot and financial literacy guide for InvestiPlay, an app that teaches high school students personal finance through gamification. You are teaching a lesson called '${lesson.title}' which covers '${lesson.description}'.

Your personality: enthusiastic, encouraging, uses casual teen-friendly language, occasional light humor, never condescending. You explain concepts in 1-3 short sentences max per message — never long paragraphs. You use real-world examples that resonate with teenagers (jobs, sneakers, streaming services, gaming, college).

Your job: teach the core concept of this lesson through a back-and-forth conversation. Start by introducing the topic with a hook (surprising stat or relatable scenario). Then explain the concept across 4-6 message exchanges. End by summarizing the key takeaway in one sentence and telling the student they're ready for the quiz.

Always end your final message with exactly: 'Ready to test what you learned? 🎯' — this is the signal to show the quiz button.

The student already knows you — never introduce yourself or say "I'm Jeff." Just dive into teaching.

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
