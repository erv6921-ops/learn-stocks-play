// jeffInterrupter — the "quick check" interrupters that pause Jeff's class
// every few teaching beats with a tiny interactive activity. The activity's
// CONTENT is always AI-generated from what Jeff just said (via the jeff-chat
// edge function's raw mode), grounded in the lesson's own text and Jeff's last
// few messages, so it tests exactly the concept he just taught rather than a
// generic finance question. The TYPE is picked at random client-side.
// Generation is fail-silent: any bad/malformed response returns null and the
// caller simply resumes the chat as if no interrupter fired. A check that
// hinges on numbers is re-derived by a second, cheap model call and dropped
// when the two disagree, so a miscomputed "correct" answer never reaches the
// student.
import { supabase } from "@/integrations/supabase/client"
import type { Lesson } from "@/types"
import { stripDashes } from "@/lib/text"
import { loadChat, isCurriculumLesson } from "@/lib/jeffChatLesson"
import { getStructuredContent } from "@/data/lessonContent"

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

/** How much of the lesson's grounding text the generator sees. */
const SOURCE_CHARS = 2000
/** How many of Jeff's most recent messages ground the check. */
const RECENT_MESSAGES = 3

/** Extra context the caller can hand the generator; anything missing is recovered locally. */
export interface InterrupterContext {
  /** Jeff's most recent messages, oldest first. The last one is what the check is about. */
  recentJeffMessages?: string[]
  /** The lesson's grounding text (its concept sections, or the teacher's pages). */
  source?: string
}

/**
 * The system prompt that drives interrupter generation. Grounded in the
 * lesson's source text and Jeff's last few messages (oldest first), so every
 * fact in the check is something Jeff actually said or the lesson states.
 */
export function buildInterrupterPrompt(
  lessonTitle: string,
  recentJeffMessages: string | string[],
  type: InterrupterType,
  source?: string,
): string {
  const recent = (Array.isArray(recentJeffMessages) ? recentJeffMessages : [recentJeffMessages])
    .map(m => m.trim()).filter(Boolean).slice(-RECENT_MESSAGES)
  const transcript = recent.map((m, i) => `${i + 1}. '${m}'`).join("\n")
  const material = source?.trim()
    ? `LESSON MATERIAL (the only outside facts the activity may rely on):\n"""\n${source.trim().slice(0, SOURCE_CHARS)}\n"""\n\n`
    : ""
  const rankRule = type === "rank_it"
    ? `\nFor this ranking: every item must be something Jeff stated in the messages above, and the correct order must follow directly from what he said. Never rank things he did not mention.`
    : ""

  return `You are generating a short interactive activity for a financial literacy lesson app for high school students. The lesson is '${lessonTitle}'.

${material}JEFF'S RECENT MESSAGES (oldest first; the LAST one is what the activity must be about):
${transcript}

Generate a '${type}' interrupter activity that is DIRECTLY about the concept in Jeff's last message. It must test or reinforce exactly what he just explained, not a general finance question and not a different topic. Every fact, number, and comparison in the activity must be something Jeff stated or the lesson material says; never invent figures, and never bring in outside topics.${rankRule}

Write the explanation as one clean sentence stating why the answer is right. Do not think aloud, hedge, or correct yourself in it.

Return ONLY valid JSON matching this exact schema with no markdown, no explanation, no preamble:

For ${type}:
${TYPE_SCHEMAS[type]}

Never generate a question about a topic not covered in Jeff's messages above. Keep language teen-friendly and casual.`
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

// An explanation where the model changed its mind mid-sentence ("wait, the
// answer is...", "actually, ...") means the check itself is suspect: drop it.
const SELF_CORRECTION = /\b(?:wait|actually),/i

function validate(obj: unknown, type: InterrupterType): Interrupter | null {
  const out = validateShape(obj, type)
  if (out && "explanation" in out && SELF_CORRECTION.test(out.explanation)) return null
  return out
}

function validateShape(obj: unknown, type: InterrupterType): Interrupter | null {
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

// ── Second opinion for numeric checks ───────────────────────────────
// A check that leans on numbers (a dollar figure, a percentage, a count) is
// where a generator most often gets its own "correct" answer wrong. Before the
// student sees one, a second, cheap model call recomputes the answer from the
// same grounding; if the two disagree the check is dropped.

const hasDigits = (s: string) => /\d/.test(s)

function isNumericCheck(c: Interrupter): boolean {
  switch (c.type) {
    case "true_or_false": return hasDigits(c.statement)
    case "fill_in_blank": return hasDigits(c.answer) || hasDigits(c.sentence)
    case "rank_it": return hasDigits(c.prompt) || c.items.some(hasDigits)
    case "smart_move": return hasDigits(c.scenario) || c.options.some(hasDigits)
    case "spot_the_mistake": return c.scenarios.some(hasDigits)
    case "sort_it": return c.items.some(i => hasDigits(i.text))
    case "poll": return false
  }
}

/** The question to re-answer, with the expected answer's canonical form, per type. */
function verificationQuestion(c: Interrupter): { question: string; expected: string } | null {
  switch (c.type) {
    case "true_or_false":
      return { question: `Statement: "${c.statement}"\nIs this statement TRUE or FALSE? Reply with exactly one word: TRUE or FALSE.`, expected: c.answer ? "true" : "false" }
    case "fill_in_blank":
      return {
        question: `Sentence: "${c.sentence}"\nOptions:\n${c.options.map((o, i) => `${i}) ${o}`).join("\n")}\nWhich option number correctly fills [BLANK]? Reply with just the number.`,
        expected: String(c.options.indexOf(c.answer)),
      }
    case "rank_it":
      return {
        question: `${c.prompt}\nItems:\n${c.items.map((it, i) => `${i}) ${it}`).join("\n")}\nReply with the item numbers in the correct order as a JSON array, for example [2,0,1].`,
        expected: JSON.stringify(c.order),
      }
    case "smart_move":
      return { question: `Scenario: ${c.scenario}\nOption 0: ${c.options[0]}\nOption 1: ${c.options[1]}\nWhich option is the smarter financial move? Reply with just 0 or 1.`, expected: String(c.answer) }
    case "spot_the_mistake":
      return {
        question: `${c.scenarios.map((sc, i) => `Scenario ${i}: ${sc}`).join("\n")}\nExactly one of these contains a money mistake. Which scenario number? Reply with just 0, 1, or 2.`,
        expected: String(c.mistakeIndex),
      }
    case "sort_it":
      return {
        question: `Bins: 0) ${c.bins[0]}  1) ${c.bins[1]}\nItems:\n${c.items.map((it, i) => `${i}) ${it.text}`).join("\n")}\nFor each item in order, which bin does it belong in? Reply with a JSON array of 0/1 values, for example [0,1,1,0].`,
        expected: JSON.stringify(c.items.map(i => i.bin)),
      }
    case "poll":
      return null
  }
}

// Normalize a model's short answer to the canonical form used in `expected`.
function canonicalAnswer(raw: string, expected: string): string | null {
  const t = raw.trim()
  if (expected === "true" || expected === "false") {
    const m = t.match(/\b(true|false)\b/i)
    return m ? m[1].toLowerCase() : null
  }
  if (expected.startsWith("[")) {
    const m = t.match(/\[[\d,\s]*\]/)
    if (!m) return null
    try {
      const arr = JSON.parse(m[0])
      return Array.isArray(arr) ? JSON.stringify(arr.map((n: unknown) => Number(n))) : null
    } catch { return null }
  }
  const m = t.match(/-?\d+/)
  return m ? m[0] : null
}

/**
 * Re-derive a numeric check's answer with a second model call. Returns false
 * only when the second answer is parseable and disagrees; a network failure or
 * an unparseable second opinion keeps the check (fail-open), since the check
 * already passed shape validation.
 */
async function secondOpinionAgrees(check: Interrupter, lessonTitle: string, recent: string[], source?: string): Promise<boolean> {
  const vq = verificationQuestion(check)
  if (!vq) return true
  const transcript = recent.slice(-RECENT_MESSAGES).map((m, i) => `${i + 1}. '${m}'`).join("\n")
  const material = source?.trim() ? `LESSON MATERIAL:\n"""\n${source.trim().slice(0, SOURCE_CHARS)}\n"""\n\n` : ""
  const system = `You are double-checking a quick-check question for the financial literacy lesson '${lessonTitle}'. Use the lesson material and Jeff's messages below as ground truth, and do any arithmetic carefully. Reply with ONLY the answer in the requested format, nothing else.\n\n${material}JEFF'S RECENT MESSAGES:\n${transcript}`
  try {
    const { data, error } = await supabase.functions.invoke("jeff-chat", {
      body: { raw: true, maxTokens: 40, system, messages: [{ role: "user", content: vq.question }] },
    })
    if (error || typeof data?.text !== "string") return true
    const got = canonicalAnswer(data.text, vq.expected)
    return got === null ? true : got === vq.expected
  } catch {
    return true
  }
}

// ── Context recovery ────────────────────────────────────────────────
// Callers that only have Jeff's last message still get a grounded check: the
// rest of his recent messages come from the lesson's saved chat, and the
// grounding text from the lesson's own concept sections.

function recentFromSavedChat(lesson: Lesson, lastJeffMessage: string): string[] {
  const saved = loadChat(lesson.id)?.messages ?? []
  const recent = saved.filter(m => m.role === "assistant").map(m => m.content.trim()).filter(Boolean)
  const last = lastJeffMessage.trim()
  if (recent[recent.length - 1] !== last) recent.push(last)
  return recent.slice(-RECENT_MESSAGES)
}

function sourceFromLessonContent(lesson: Lesson): string | undefined {
  if (isCurriculumLesson(lesson)) return undefined
  try {
    const sections = getStructuredContent(lesson.id)?.sections ?? []
    const text = sections
      .flatMap(sec => (sec.type === "concept" ? [sec] : []))
      .map(c => [c.title, ...c.paragraphs, c.realWorldExample ? `Example: ${c.realWorldExample}` : ""].filter(Boolean).join("\n"))
      .join("\n\n")
    return text || undefined
  } catch {
    return undefined
  }
}

/**
 * Generate one interrupter activity from Jeff's last message, grounded in the
 * lesson text and his last few messages. Returns null on any failure (network,
 * timeout, malformed JSON, wrong shape, a self-correcting explanation, or a
 * numeric answer the second opinion disagrees with) so the caller can silently
 * skip the interrupter and keep the lesson flowing.
 */
export async function generateInterrupter(
  lesson: Lesson,
  lastJeffMessage: string,
  type: InterrupterType,
  ctx: InterrupterContext = {},
): Promise<Interrupter | null> {
  try {
    const recent = ctx.recentJeffMessages?.length
      ? [...ctx.recentJeffMessages.map(m => m.trim()).filter(Boolean), lastJeffMessage.trim()]
          .filter((m, i, arr) => m && arr.indexOf(m) === i)
          .slice(-RECENT_MESSAGES)
      : recentFromSavedChat(lesson, lastJeffMessage)
    const source = ctx.source ?? sourceFromLessonContent(lesson)
    const { data, error } = await supabase.functions.invoke("jeff-chat", {
      body: {
        raw: true,
        maxTokens: 400,
        system: buildInterrupterPrompt(lesson.title, recent, type, source),
        // The model needs at least one user turn; the instruction lives in the
        // system prompt, so this is just the trigger.
        messages: [{ role: "user", content: "Generate the activity now as specified." }],
      },
    })
    if (error || !data?.text) return null
    const check = validate(extractJson(data.text as string), type)
    if (!check) return null
    if (isNumericCheck(check) && !(await secondOpinionAgrees(check, lesson.title, recent, source))) return null
    return check
  } catch {
    return null
  }
}
