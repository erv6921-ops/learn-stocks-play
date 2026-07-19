/**
 * MCQ Engine — render-time shuffling + anti-pattern validation.
 *
 * Goals:
 * - Balanced correct-answer distribution across sets
 * - Reject longest-answer bias (>20% over average word count)
 * - Reject obviously short/weak distractors
 * - Preserve plausible, scenario-based options while removing guessable structure
 */

import { QuizQuestion } from "@/types"

const MAX_SET_ATTEMPTS = 24
const MAX_SINGLE_ATTEMPTS = 12
const MAX_CORRECT_LENGTH_RATIO = 1.15
const MIN_OPTION_WORDS = 4
const MAX_LENGTH_SPREAD_RATIO = 2.0 // longest option should not be >2x shortest

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function getWordCounts(options: string[]): number[] {
  return options.map(countWords)
}

function average(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / values.length
}

function hasLengthBias(question: QuizQuestion): boolean {
  const counts = getWordCounts(question.options)
  const avg = average(counts)
  const correctWords = counts[question.correctAnswer]
  const maxWords = Math.max(...counts)
  const minWords = Math.min(...counts)

  // Correct answer must not be notably longer than average
  if (correctWords > avg * MAX_CORRECT_LENGTH_RATIO) return true
  // Correct answer must not be the longest by a wide margin
  if (correctWords === maxWords && correctWords - minWords >= 3) return true
  // Overall spread must not be too extreme (makes longest stand out)
  if (minWords > 0 && maxWords / minWords > MAX_LENGTH_SPREAD_RATIO) return true

  return false
}

// ── Render-time length normalization ─────────────────────────────────────
// Positional shuffling can never hide the classic tell where the CORRECT
// answer is written as the longest, most detailed option (much of the authored
// question bank has this bias). Before shuffling, trim trailing elaboration
// clauses off standout-long options until the correct answer no longer sticks
// out. Only clearly-decorative tails are cut, and never below 5 words, so the
// core assertion of the option is preserved (full reasoning still lives in the
// explanation shown after answering).
const TRAILING_CLAUSE_CUTTERS: RegExp[] = [
  /,\s+(?:which|so|and|but|making|allowing|helping|leading|giving|keeping|letting|creating|reducing|ensuring|even)\b[^]*$/i,
  /\s+because\b[^]*$/i,
  /\s+so that\b[^]*$/i,
  /\s+(?:—|–)\s[^]*$/,
  /\s+while\b[^]*$/i,
  /\s+instead of\b[^]*$/i,
  /\s+rather than\b[^]*$/i,
  /\s+even if\b[^]*$/i,
  /\s+over time[.!]?$/i,
]

function trimTrailingClause(text: string): string {
  for (const cutter of TRAILING_CLAUSE_CUTTERS) {
    const trimmed = text.replace(cutter, "")
    if (trimmed === text) continue
    const cleaned = stripWeakTail(trimmed)
    if (cleaned && countWords(cleaned) >= 5) return cleaned
  }
  return text
}

// Words an option must never END on after a cut (dangling grammar).
const WEAK_TAIL_WORDS = new Set([
  "for", "to", "with", "of", "a", "an", "the", "and", "or", "nor", "in", "by",
  "on", "at", "as", "from", "into", "that", "which", "because", "so", "while",
  "their", "your", "its", "my", "our", "his", "her", "than", "but", "if",
  "is", "are", "be", "being", "been", "was", "were", "has", "have", "had",
  "can", "could", "will", "would", "may", "might", "must", "should",
  "even", "also", "still", "just", "only", "very", "quite", "more", "most",
  "less", "least", "not", "no", "any", "some", "each", "every", "both",
  "either", "neither", "such", "how", "what", "who", "where", "why", "when",
  "it", "this", "these", "those", "they", "we", "you", "i",
])

// Phrase-boundary words where a trailing cut is grammatically safe-ish.
// Note: no "to" — infinitives bind too tightly ("the desire to match…").
const CUT_BOUNDARY_WORDS = new Set([
  "for", "with", "by", "in", "on", "so", "that", "which", "because",
  "while", "without", "across", "over", "instead", "rather", "and", "or",
  "when", "before", "after", "during", "through", "unless", "since",
])

const cleanWord = (w: string) => w.toLowerCase().replace(/[^a-z']/g, "")

// Drop trailing weak/dangling words + punctuation after a cut. Returns null
// when the cleanup can't produce a well-formed remainder.
function stripWeakTail(text: string): string | null {
  let words = text.trim().split(/\s+/)
  while (words.length > 0 && WEAK_TAIL_WORDS.has(cleanWord(words[words.length - 1]))) words.pop()
  if (words.length < 5) return null
  const out = words.join(" ").replace(/[,;:—–-]+$/, "").trim()
  if (!isBalanced(out)) return null
  return out
}

// A candidate must not strand an unclosed dash-aside, paren or quote.
function isBalanced(text: string): boolean {
  if (((text.match(/[—–]/g) || []).length) % 2 === 1) return false
  if ((text.match(/\(/g) || []).length !== (text.match(/\)/g) || []).length) return false
  if (((text.match(/"/g) || []).length) % 2 === 1) return false
  return true
}

/**
 * Shorten `text` toward `targetWords` by cutting trailing phrases at safe
 * boundaries. Returns the original text when no clean cut exists. A vaguer but
 * still-true correct answer beats a guessable one — distractors are factually
 * wrong, so the trimmed correct option remains the best choice, and the full
 * reasoning still appears in the explanation after answering.
 */
function shortenToward(text: string, targetWords: number): string {
  const words = text.trim().replace(/[.!]\s*$/, "").split(/\s+/)

  // Collect clean candidate prefixes at safe boundaries, longest first.
  const candidates: string[] = []
  for (let i = words.length - 1; i >= 5; i--) {
    const boundary = CUT_BOUNDARY_WORDS.has(cleanWord(words[i])) || /[,;:]$/.test(words[i - 1])
    if (!boundary) continue
    const candidate = stripWeakTail(words.slice(0, i).join(" "))
    if (candidate) candidates.push(candidate)
  }

  // Prefer the longest candidate that reaches the target; otherwise take the
  // shortest clean candidate (narrowing the gap still weakens the tell).
  for (const candidate of candidates) {
    if (countWords(candidate) <= targetWords) return candidate
  }
  return candidates.length > 0 ? candidates[candidates.length - 1] : text
}

export function normalizeOptionLengths(question: QuizQuestion): QuizQuestion {
  const options = [...question.options]

  // Pass 1: clip decorative trailing clauses off whichever option is the
  // standout longest, while the engine's bias heuristics still flag the set.
  for (let pass = 0; pass < 4; pass++) {
    if (!hasLengthBias({ ...question, options })) break
    const counts = options.map(countWords)
    const longestIdx = counts.indexOf(Math.max(...counts))
    const trimmed = trimTrailingClause(options[longestIdx])
    if (trimmed === options[longestIdx]) break // no safe cut available
    options[longestIdx] = trimmed
  }

  // Pass 2: kill the "pick the longest" tell outright — if the CORRECT answer
  // is still strictly the longest, shorten it toward the second-longest
  // option at safe phrase boundaries.
  const counts = options.map(countWords)
  const correctWords = counts[question.correctAnswer]
  const othersMax = Math.max(...counts.filter((_, i) => i !== question.correctAnswer))
  if (correctWords > othersMax) {
    options[question.correctAnswer] = shortenToward(options[question.correctAnswer], othersMax)
  }

  return { ...question, options }
}

function hasWeakDistractor(question: QuizQuestion): boolean {
  const counts = getWordCounts(question.options)
  const avg = average(counts)

  return question.options.some((option, index) => {
    if (index === question.correctAnswer) return false

    const words = counts[index]
    const normalized = option.trim().toLowerCase()

    return (
      words < MIN_OPTION_WORDS ||
      words < avg * 0.6 ||
      normalized.startsWith("all of the above") ||
      normalized.startsWith("none of the above") ||
      normalized === "all of the above" ||
      normalized === "none of the above"
    )
  })
}

function validateQuestion(question: QuizQuestion): boolean {
  // Support standard 4-option and AP-style 5-option (A–E) questions.
  if (question.options.length < 4 || question.options.length > 5) return false
  if (hasLengthBias(question)) return false
  if (hasWeakDistractor(question)) return false
  return true
}

function fisherYates<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function shuffleQuestion(question: QuizQuestion): QuizQuestion {
  // Strip length bias first — position shuffling can't fix option text.
  const q = normalizeOptionLengths(question)
  let fallback: QuizQuestion | null = null

  for (let attempt = 0; attempt < MAX_SINGLE_ATTEMPTS; attempt++) {
    // Shuffle however many options the question has (supports 4- and 5-option MCQs).
    const indices = fisherYates(q.options.map((_, i) => i))
    const shuffled: QuizQuestion = {
      ...q,
      options: indices.map(i => q.options[i]),
      correctAnswer: indices.indexOf(q.correctAnswer),
    }

    fallback = shuffled
    if (validateQuestion(shuffled)) return shuffled
  }

  return fallback ?? q
}

function evaluateDistribution(questions: QuizQuestion[]): number {
  if (questions.length === 0) return 0

  let score = 100
  // Size the position-balance tally to the largest option set (4 or 5).
  const numOptions = Math.max(4, ...questions.map(q => q.options.length))
  const counts = new Array(numOptions).fill(0)
  let invalidQuestions = 0

  questions.forEach(question => {
    counts[question.correctAnswer] = (counts[question.correctAnswer] ?? 0) + 1
    if (!validateQuestion(question)) invalidQuestions++
  })

  const expected = questions.length / numOptions
  const maxDeviation = expected > 0
    ? Math.max(...counts.map(count => Math.abs(count - expected) / expected))
    : 0

  if (maxDeviation > 0.35) score -= 25
  else if (maxDeviation > 0.2) score -= 10

  let maxRun = 1
  let currentRun = 1
  for (let i = 1; i < questions.length; i++) {
    if (questions[i].correctAnswer === questions[i - 1].correctAnswer) {
      currentRun++
      maxRun = Math.max(maxRun, currentRun)
    } else {
      currentRun = 1
    }
  }

  if (maxRun >= 4) score -= 25
  else if (maxRun >= 3) score -= 10

  score -= invalidQuestions * 20

  return Math.max(0, score)
}

export function shuffleQuestionSet(questions: QuizQuestion[]): QuizQuestion[] {
  if (questions.length === 0) return questions

  let best = questions
  let bestScore = -1

  for (let attempt = 0; attempt < MAX_SET_ATTEMPTS; attempt++) {
    const candidate = questions.map(question => shuffleQuestion(question))
    const score = evaluateDistribution(candidate)

    if (score > bestScore) {
      best = candidate
      bestScore = score
    }

    if (score >= 92) break
  }

  return best
}

export function prepareQuestionsForRender(questions: QuizQuestion[]): QuizQuestion[] {
  return shuffleQuestionSet(questions)
}

export function questionPassesQualityChecks(question: QuizQuestion): boolean {
  return validateQuestion(question)
}
