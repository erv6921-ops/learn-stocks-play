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

export function shuffleQuestion(q: QuizQuestion): QuizQuestion {
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
