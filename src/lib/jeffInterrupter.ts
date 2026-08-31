// jeffInterrupter — the "quick check" interrupters that pause Jeff's class
// every few teaching beats with a tiny interactive activity. The activity's
// CONTENT is always AI-generated from what Jeff just said (via the jeff-chat
// edge function's raw mode), so it tests exactly the concept in his last
// message rather than a generic finance question. The TYPE is picked at random
// client-side. Generation is fail-silent: any bad/malformed response returns
// null and the caller simply resumes the chat as if no interrupter fired.
import { supabase } from "@/integrations/supabase/client"
import type { Lesson } from "@/types"
import { stripDashes } from "@/lib/text"

export type InterrupterType =
  | "true_or_false"
  | "fill_in_blank"
  | "poll"
  | "spot_the_mistake"
  | "sort_it"
  | "rank_it"
  | "smart_move"

export interface TrueOrFalse {
  type: "true_or_false"
  statement: string
  answer: boolean
  explanation: string
}

export interface FillInBlank {
  type: "fill_in_blank"
  sentence: string
  options: string[]
  answer: string
  explanation: string
}

export interface Poll {
  type: "poll"
  question: string
  options: string[]
  percentages: number[]
}

export interface SpotTheMistake {
  type: "spot_the_mistake"
  /** Three separate, realistic money decisions; exactly one hides a mistake. */
  scenarios: string[]
  /** Index (0-2) of the scenario that contains the money mistake. */
  mistakeIndex: number
  explanation: string
}

/** One item to be dropped into one of the two Sort It bins. */
export interface SortItItem {
  text: string
  /** 0 or 1 — the bin this item correctly belongs in. */
  bin: number
}

export interface SortIt {
  type: "sort_it"
  /** Exactly two category labels. */
  bins: string[]
  /** 3-4 items, at least one per bin. */
  items: SortItItem[]
  explanation: string
}

export interface RankIt {
  type: "rank_it"
  /** What to order and in which direction. */
  prompt: string
  /** The items to arrange. */
  items: string[]
  /** Item indexes in the correct order (first to last); a permutation of items. */
  order: number[]
  explanation: string
}

export interface SmartMove {
  type: "smart_move"
  scenario: string
  /** Exactly two plausible actions. */
  options: string[]
  /** 0 or 1 — the smarter financial move. */
  answer: number
  explanation: string
}

export type Interrupter =
  | TrueOrFalse
  | FillInBlank
  | Poll
  | SpotTheMistake
  | SortIt
  | RankIt
  | SmartMove

// The in-chat "Quick Check" rotation. `poll` (an opinion prompt with no right
// answer) is intentionally excluded: these checks exist to verify the student
// actually grasped the material, so every rotated type has a correct answer.
// The `poll` type/schema stay defined below in case it's ever re-added.
export const INTERRUPTER_TYPES: InterrupterType[] = [
  "true_or_false",
  "fill_in_blank",
  "spot_the_mistake",
  "sort_it",
  "rank_it",
  "smart_move",
]

/** Pick one interrupter type at random (client-side, per the spec). */
export function randomInterrupterType(): InterrupterType {
  return INTERRUPTER_TYPES[Math.floor(Math.random() * INTERRUPTER_TYPES.length)]
}

// The exact JSON schema each type must return, injected into the system prompt
// so the model has one authoritative shape to fill in.
const TYPE_SCHEMAS: Record<InterrupterType, string> = {
  true_or_false: `{
  "type": "true_or_false",
  "statement": "string — a clear factual statement about what Jeff just explained, 1 sentence max",
  "answer": true or false,
  "explanation": "string — one sentence explaining why, under 20 words"
}`,
  fill_in_blank: `{
  "type": "fill_in_blank",
  "sentence": "string — sentence with exactly one [BLANK] placeholder",
  "options": ["correct answer", "wrong option 1", "wrong option 2"],
  "answer": "string — must match one of the options exactly",
  "explanation": "string — one sentence, under 20 words"
}`,
  poll: `{
  "type": "poll",
  "question": "string — a relatable personal finance opinion question for a teenager, directly related to the lesson topic",
  "options": ["option 1", "option 2", "option 3"],
  "percentages": [integer, integer, integer] — must sum to exactly 100
}`,
  spot_the_mistake: `{
  "type": "spot_the_mistake",
  "scenarios": [
    "string — one realistic 1-2 sentence money decision a teenager could plausibly make",
    "string — a DIFFERENT, unrelated realistic money decision",
    "string — a THIRD, unrelated realistic money decision"
  ],
  "mistake_index": 0, 1, or 2 — the index of the ONE scenario that contains a money mistake tied to what Jeff just taught,
  "explanation": "string — one sentence explaining why that choice is the mistake, under 25 words"
}
IMPORTANT for spot_the_mistake: the three scenarios must be about three DIFFERENT situations, not variations of the same one. The two that are NOT the mistake must be genuinely smart, sensible money decisions — never obviously good or exaggerated. The mistake must be SUBTLE: the kind of slip someone who hadn't just learned this concept could easily make, so a student can't sniff it out from common sense alone. All three should read as equally plausible at a glance.`,
  sort_it: `{
  "type": "sort_it",
  "bins": ["label A", "label B"] — exactly two SHORT category labels of one or two words each (e.g. "Need" and "Want", "Asset" and "Liability"),
  "items": [
    {"text": "string — a short, concrete real-world thing a teen would recognize", "bin": 0 or 1},
    {"text": "string", "bin": 0 or 1},
    {"text": "string", "bin": 0 or 1},
    {"text": "string", "bin": 0 or 1}
  ] — exactly four items, with at least one belonging to each bin,
  "explanation": "string — one sentence on how to tell the two groups apart, under 20 words"
}
Keep each item text under 8 words so it fits on a phone.`,
  rank_it: `{
  "type": "rank_it",
  "prompt": "string — tell the student exactly what to order and in which direction, e.g. 'Order these from LOWEST to HIGHEST risk'",
  "items": ["string", "string", "string"] — exactly three short items to arrange,
  "order": [integer, integer, integer] — the item indexes in the CORRECT order, first to last; must be a permutation of 0, 1, 2,
  "explanation": "string — one sentence explaining the correct order, under 20 words"
}
The three items must have a genuinely correct ordering along one clear dimension. Keep each item under 6 words.`,
  smart_move: `{
  "type": "smart_move",
  "scenario": "string — 1 to 2 sentences setting up a realistic money situation that ends at a choice",
  "options": ["string — one plausible action", "string — another plausible action"] — exactly two, BOTH believable,
  "answer": 0 or 1 — the index of the smarter financial move,
  "explanation": "string — one sentence on why that move is smarter, under 25 words"
}
Both options must be tempting and realistic — never make one obviously silly. The smarter move should only be clear to someone who understood what Jeff just taught.`,
}

/** The system prompt that drives interrupter generation, per the spec. */
export function buildInterrupterPrompt(
  lessonTitle: string,
  lastJeffMessage: string,
  type: InterrupterType,
): string {
  return `You are generating a short interactive activity for a financial literacy lesson app for high school students. The lesson topic is '${lessonTitle}'. Jeff (the AI tutor) just said: '${lastJeffMessage}'.

Generate a '${type}' interrupter activity that is DIRECTLY about the concept Jeff just explained. The activity must test or reinforce exactly what was in Jeff's last message — not a general finance question, not a different topic.

Return ONLY valid JSON matching this exact schema with no markdown, no explanation, no preamble:

For ${type}:
${TYPE_SCHEMAS[type]}

Never generate a question about a topic not covered in Jeff's last message. Keep language teen-friendly and casual.`
}

// ── Parsing + validation ────────────────────────────────────────────
// The model is asked for bare JSON but can still wrap it in prose or a code
// fence, so pull out the first {...} block before parsing. Anything that
// doesn't parse or doesn't match the requested type's shape returns null.

function extractJson(raw: string): unknown {
  const fenced = raw.replace(/```json/gi, "```").split("```")
  // Prefer a fenced block if present, else the whole string.
  const candidate = fenced.length > 1 ? fenced[1] : raw
  const match = candidate.match(/\{[\s\S]*\}/)
  if (!match) return null
  try {
    return JSON.parse(match[0])
  } catch {
    return null
  }
}

const isStr = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0

function validate(obj: unknown, type: InterrupterType): Interrupter | null {
  if (!obj || typeof obj !== "object") return null
  const o = obj as Record<string, unknown>

  switch (type) {
    case "true_or_false": {
      if (!isStr(o.statement) || typeof o.answer !== "boolean" || !isStr(o.explanation)) return null
      return {
        type,
        statement: stripDashes(o.statement),
        answer: o.answer,
        explanation: stripDashes(o.explanation),
      }
    }
    case "fill_in_blank": {
      const options = Array.isArray(o.options) ? o.options.filter(isStr).map(stripDashes) : []
      if (!isStr(o.sentence) || options.length < 2 || !isStr(o.answer)) return null
      const answer = stripDashes(o.answer)
      // The correct answer must actually be one of the options, or the activity
      // is unanswerable — treat that as a failed generation.
      if (!options.includes(answer)) return null
      const sentence = stripDashes(o.sentence)
      if (!/\[BLANK\]/.test(sentence)) return null
      return {
        type,
        sentence,
        options: options.slice(0, 3),
        answer,
        explanation: isStr(o.explanation) ? stripDashes(o.explanation) : "",
      }
    }
    case "poll": {
      const options = Array.isArray(o.options) ? o.options.filter(isStr).map(stripDashes) : []
      const pct = Array.isArray(o.percentages)
        ? o.percentages.filter((n): n is number => typeof n === "number")
        : []
      if (!isStr(o.question) || options.length < 2 || pct.length !== options.length) return null
      // Normalize the percentages so they always render as a clean split adding
      // to 100, regardless of what the model returned.
      const total = pct.reduce((a, b) => a + b, 0)
      const normalized = total > 0
        ? pct.map(p => Math.round((p / total) * 100))
        : options.map(() => Math.round(100 / options.length))
      // Fix any rounding drift by nudging the largest bucket.
      const drift = 100 - normalized.reduce((a, b) => a + b, 0)
      if (drift !== 0 && normalized.length) {
        const maxIdx = normalized.indexOf(Math.max(...normalized))
        normalized[maxIdx] += drift
      }
      return { type, question: stripDashes(o.question), options: options.slice(0, 4), percentages: normalized }
    }
    case "spot_the_mistake": {
      const scenarios = Array.isArray(o.scenarios) ? o.scenarios.filter(isStr).map(stripDashes) : []
      const idx = typeof o.mistake_index === "number" ? o.mistake_index : Number(o.mistake_index)
      // Need three distinct choices and a valid index into them, or there's
      // nothing coherent to answer — bail and resume the chat normally.
      if (scenarios.length < 3 || !Number.isInteger(idx) || idx < 0 || idx > 2) return null
      return {
        type,
        scenarios: scenarios.slice(0, 3),
        mistakeIndex: idx,
        explanation: isStr(o.explanation) ? stripDashes(o.explanation) : "",
      }
    }
    case "sort_it": {
      const bins = Array.isArray(o.bins) ? o.bins.filter(isStr).map(stripDashes) : []
      const items: SortItItem[] = []
      for (const raw of Array.isArray(o.items) ? o.items : []) {
        if (!raw || typeof raw !== "object") continue
        const r = raw as Record<string, unknown>
        const text = isStr(r.text) ? stripDashes(r.text) : ""
        const bin = Number(r.bin)
        if (text && (bin === 0 || bin === 1)) items.push({ text, bin })
      }
      const trimmed = items.slice(0, 4)
      // Need two bins, at least three items, and both bins actually used - or
      // there's no real sorting to do.
      if (bins.length !== 2 || trimmed.length < 3) return null
      if (!trimmed.some(i => i.bin === 0) || !trimmed.some(i => i.bin === 1)) return null
      return { type, bins: bins.slice(0, 2), items: trimmed, explanation: isStr(o.explanation) ? stripDashes(o.explanation) : "" }
    }
    case "rank_it": {
      const items = Array.isArray(o.items) ? o.items.filter(isStr).map(stripDashes).slice(0, 4) : []
      const order = Array.isArray(o.order) ? o.order.map(n => Number(n)) : []
      if (!isStr(o.prompt) || items.length < 3) return null
      // `order` must be a full permutation of the item indexes, else the answer
      // is ambiguous or unreachable.
      if (order.length !== items.length) return null
      const sorted = [...order].sort((a, b) => a - b)
      if (!sorted.every((v, i) => v === i)) return null
      return { type, prompt: stripDashes(o.prompt), items, order, explanation: isStr(o.explanation) ? stripDashes(o.explanation) : "" }
    }
    case "smart_move": {
      const options = Array.isArray(o.options) ? o.options.filter(isStr).map(stripDashes) : []
      const answer = Number(o.answer)
      if (!isStr(o.scenario) || options.length !== 2 || !(answer === 0 || answer === 1)) return null
      return { type, scenario: stripDashes(o.scenario), options: options.slice(0, 2), answer, explanation: isStr(o.explanation) ? stripDashes(o.explanation) : "" }
    }
  }
}

/**
 * Generate one interrupter activity from Jeff's last message. Returns null on
 * any failure (network, timeout, malformed JSON, wrong shape) so the caller can
 * silently skip the interrupter and keep the lesson flowing.
 */
export async function generateInterrupter(
  lesson: Lesson,
  lastJeffMessage: string,
  type: InterrupterType,
): Promise<Interrupter | null> {
  try {
    const { data, error } = await supabase.functions.invoke("jeff-chat", {
      body: {
        raw: true,
        maxTokens: 400,
        system: buildInterrupterPrompt(lesson.title, lastJeffMessage, type),
        // The model needs at least one user turn; the instruction lives in the
        // system prompt, so this is just the trigger.
        messages: [{ role: "user", content: "Generate the activity now as specified." }],
      },
    })
    if (error || !data?.text) return null
    return validate(extractJson(data.text as string), type)
  } catch {
    return null
  }
}
