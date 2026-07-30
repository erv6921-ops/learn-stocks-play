/**
 * Content Generator - Structured lesson content builder
 * 
 * Generates 6-section lessons with balanced MCQ distribution.
 * MCQ Engine Rules:
 * - Correct answers distributed evenly across A/B/C/D
 * - Answer lengths normalized (no longest-answer bias)
 * - Deterministic rebalancing per question set
 * - On regeneration, produces fresh shuffled sets
 */

import { Lesson, StructuredLessonContent, QuizQuestion, LessonCategory, MasteryTier } from "@/types"
import { getQuizForLesson } from "@/data/lessonQuizzes"
import { prepareQuestionsForRender, questionPassesQualityChecks } from "@/lib/mcqEngine"

// ═══════════════════════════════════════════════
// CATEGORY TEMPLATES - Concept paragraphs, scenarios, and fallback questions
// ═══════════════════════════════════════════════

interface CategoryTemplate {
  conceptIntro: (title: string, desc: string) => string[]
  bullets: (title: string) => string[]
  realWorldExample: (title: string) => string
  scenario: (title: string, desc: string) => { title: string; narrative: string; details: string[] }
  fallbackQuestions: (title: string, tier: MasteryTier) => QuizQuestion[]
}

function tierDifficulty(tier: MasteryTier): "beginner" | "intermediate" | "advanced" {
  if (tier === "explorer") return "beginner"
  if (tier === "builder" || tier === "strategist") return "intermediate"
  return "advanced"
}

/**
 * Balanced answer index generator - ensures correct answers are distributed across A/B/C/D.
 * Uses a deterministic seed based on the question ID + generation seed to maintain consistency
 * while varying across regenerations.
 */
let _generationSeed = 0

function balancedCorrectIndex(questionId: string, questionIndex: number): number {
  let hash = _generationSeed
  for (let i = 0; i < questionId.length; i++) {
    hash = ((hash << 5) - hash) + questionId.charCodeAt(i)
    hash |= 0
  }
  return ((Math.abs(hash) + questionIndex) % 4)
}

/**
 * Reorder options so the correct answer lands at the target index.
 * Returns new options array and new correctAnswer index.
 */
function rebalanceQuestion(q: QuizQuestion, targetIndex: number): QuizQuestion {
  if (q.correctAnswer === targetIndex) return q
  // Guard: a question with fewer options than the target slot would get
  // `undefined` swapped into its options array.
  if (targetIndex >= q.options.length) return q
  const options = [...q.options]
  const correctText = options[q.correctAnswer]
  // Swap correct answer to target position
  options[q.correctAnswer] = options[targetIndex]
  options[targetIndex] = correctText
  return { ...q, options, correctAnswer: targetIndex }
}

// ═══════════════════════════════════════════════
// GENERIC TEMPLATE
// ═══════════════════════════════════════════════

const genericTemplate: CategoryTemplate = {
  conceptIntro: (title: string, desc: string) => [
    `Understanding ${title} is a critical step in building your financial literacy. This concept connects directly to how real money decisions are made every day.`,
    desc || `In this lesson, you'll explore the key principles behind ${title} and learn how to apply them in practical situations.`,
    `By mastering this topic, you'll develop the analytical skills needed to make informed financial decisions throughout your life.`
  ],
  bullets: (title: string) => [
    `Core principles of ${title}`,
    `How ${title} applies to everyday financial decisions`,
    `Common mistakes people make with ${title}`,
    `Strategies to leverage ${title} for better outcomes`
  ],
  realWorldExample: (title: string) =>
    `Consider how ${title} plays out in real life: A teenager starts earning their first paycheck and must decide how to allocate their money. Understanding ${title} helps them make smarter choices that compound over time.`,
  scenario: (title: string, desc: string) => ({
    title: `${title} in Action`,
    narrative: `Imagine you're advising a friend who needs help with ${title.toLowerCase()}. They've come to you because they know you've been studying financial literacy. Here's the situation they're facing:`,
    details: [
      `They have limited experience with ${title.toLowerCase()}`,
      `They need to make a decision within the next month`,
      `The outcome will affect their finances for at least a year`,
      `There are multiple options to consider, each with trade-offs`
    ]
  }),
  fallbackQuestions: (title: string, tier: MasteryTier) => {
    const diff = tierDifficulty(tier)
    return [
      {
        id: `fb-${title.replace(/\s+/g, '-').toLowerCase()}-1`,
        question: `Which of the following best describes why ${title.toLowerCase()} matters for long-term financial health?`,
        options: [
          `It helps you track daily spending patterns more accurately`,
          `It builds a framework for making informed financial decisions`,
          `It guarantees higher returns on all of your investments`,
          `It removes the need to create a monthly spending budget`
        ],
        correctAnswer: 1,
        explanation: `${title} provides a decision-making framework, not guarantees. It helps you evaluate options and make more informed choices over time.`
      },
      {
        id: `fb-${title.replace(/\s+/g, '-').toLowerCase()}-2`,
        question: `A friend says they don't need to understand ${title.toLowerCase()} because they "just follow their gut." What's the best response?`,
        options: [
          `Gut feelings are usually reliable for major financial choices`,
          `Understanding the principles helps verify if instincts are sound`,
          `Only professional financial advisors need this kind of knowledge`,
          `Following popular trends is more effective than learning basics`
        ],
        correctAnswer: 1,
        explanation: `While intuition can play a role, understanding financial principles gives you a framework to verify your instincts and avoid common cognitive biases.`
      },
      {
        id: `fb-${title.replace(/\s+/g, '-').toLowerCase()}-3`,
        question: `What is the most significant benefit of applying ${title.toLowerCase()} principles early in life?`,
        options: [
          `You can achieve full financial independence before age thirty`,
          `Small informed decisions compound into large outcomes over time`,
          `You will completely avoid making any costly financial mistakes`,
          `It allows you to skip building an emergency savings fund`
        ],
        correctAnswer: 1,
        explanation: `Starting early with sound financial principles allows the power of compounding to work in your favor, whether through savings, investments, or skill development.`
      },
      {
        id: `fb-${title.replace(/\s+/g, '-').toLowerCase()}-4`,
        question: `When evaluating advice about ${title.toLowerCase()}, which approach shows the strongest critical thinking?`,
        options: [
          `Accept advice from anyone who speaks with confidence`,
          `Ignore all outside advice and figure things out alone`,
          `Evaluate the source's expertise and how it fits your situation`,
          `Follow whatever the majority of people are currently doing`
        ],
        correctAnswer: 2,
        explanation: `Critical evaluation of financial advice means considering the source's credibility, their potential conflicts of interest, and how their advice applies to your unique circumstances.`
      }
    ]
  }
}

// ═══════════════════════════════════════════════
// CATEGORY-SPECIFIC OVERRIDES
// ═══════════════════════════════════════════════

const CATEGORY_TEMPLATES: Partial<Record<LessonCategory, Partial<CategoryTemplate>>> = {
  budgeting: {
    conceptIntro: (title, desc) => [
      `Budgeting isn't just about restricting spending - it's about intentionally directing your money toward what matters most to you. ${title} explores this essential skill.`,
      desc || `You'll learn practical frameworks for creating, maintaining, and adjusting budgets that work in the real world, not just on paper.`,
      `The best budget is one you'll actually follow. We'll focus on approaches that are sustainable and adaptable to changing circumstances.`
    ],
    scenario: (title, desc) => ({
      title: `Real-World Budget Challenge`,
      narrative: `Your cousin just landed their first full-time job earning $2,800/month after taxes. They've asked for your help creating a budget. Here's what they're dealing with:`,
      details: [
        `Rent: $900/month (shared apartment)`,
        `Student loan payment: $250/month`,
        `Car insurance: $120/month`,
        `They want to save for an emergency fund AND start investing`,
        `They also want to maintain a social life and hobbies`
      ]
    })
  },
  stocks: {
    conceptIntro: (title, desc) => [
      `The stock market can seem complex, but understanding ${title} gives you a powerful advantage. Every investor needs this knowledge.`,
      desc || `We'll break down stock market concepts into clear, practical insights you can use right away.`,
      `Remember: even professional investors started by understanding these same fundamentals.`
    ],
    scenario: (title, desc) => ({
      title: `Stock Market Scenario`,
      narrative: `You've saved $1,000 from your part-time job and want to make your first investment. You're researching stocks and need to make an informed decision:`,
      details: [
        `Company A: Tech startup, stock up 200% this year, no profits yet`,
        `Company B: Established retailer, 3% annual dividend, steady growth`,
        `Company C: Biotech firm, pending FDA approval, stock is volatile`,
        `Your investment timeline is 5+ years`,
        `You can't afford to lose this money`
      ]
    })
  },
  "credit-debt": {
    conceptIntro: (title, desc) => [
      `Credit and debt are two of the most powerful - and potentially dangerous - financial tools available. Understanding ${title} is essential.`,
      desc || `We'll explore how credit works, how to use debt wisely, and how to avoid the traps that catch millions of people.`,
      `The difference between "good debt" and "bad debt" can be the difference between building wealth and digging a financial hole.`
    ]
  },
  "investing-intro": {
    conceptIntro: (title, desc) => [
      `Investing is how you make your money work for you instead of just working for money. ${title} lays the groundwork for your investing journey.`,
      desc || `We'll cover the fundamental principles that every successful investor understands.`,
      `The earlier you start investing, the more time compound returns have to grow your wealth exponentially.`
    ]
  },
  "macro-economics": {
    conceptIntro: (title, desc) => [
      `Macroeconomics shapes every financial decision you make, even if you don't realize it. Understanding ${title} helps you see the bigger picture.`,
      desc || `We'll explore how large-scale economic forces affect your personal finances, from interest rates to inflation to employment trends.`,
      `Informed citizens who understand macroeconomics make better voters, consumers, and investors.`
    ]
  }
}

// ═══════════════════════════════════════════════
// CONTENT GENERATION ENGINE
// ═══════════════════════════════════════════════

function getTemplate(category: LessonCategory): CategoryTemplate {
  const override = CATEGORY_TEMPLATES[category] || {}
  return { ...genericTemplate, ...override }
}

function selectQuestions(pool: QuizQuestion[], count: number, exclude: Set<string>): QuizQuestion[] {
  const available = pool.filter(q => !exclude.has(q.id) && questionPassesQualityChecks(q))
  // If the quality filter empties the pool, fall back to unfiltered unused
  // questions - an imperfect question beats a renderer crash on [].
  const usable = available.length > 0 ? available : pool.filter(q => !exclude.has(q.id))
  const shuffled = [...usable].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

/**
 * Post-process a set of questions to ensure balanced answer distribution.
 * Reorders options so correct answers are spread across A/B/C/D.
 * Also validates length/quality before returning a render-ready set.
 */
function balanceQuestions(questions: QuizQuestion[]): QuizQuestion[] {
  const balanced = questions.map((q, i) => {
    const groupBase = Math.floor(i / 4) * 4
    const positionInGroup = i % 4
    const targetIdx = (balancedCorrectIndex(q.id, groupBase) + positionInGroup) % 4
    return rebalanceQuestion(q, targetIdx)
  })

  return prepareQuestionsForRender(balanced)
}

export function generateStructuredContent(
  lesson: Lesson,
  regenerationAttempt: number = 0,
  // Hook B content pacing - see lessonContent.ts's getStructuredContent for
  // what each tier actually does; this function only applies what it's told.
  confidenceTier: string | null = null,
  excludeQuestionIds: string[] = [],
  reinforcementQuestion: QuizQuestion | null = null
): StructuredLessonContent {
  // Set generation seed for this call - changes on regeneration
  _generationSeed = regenerationAttempt * 7919 // prime multiplier for variety

  const template = getTemplate(lesson.category)
  let quizPool = getQuizForLesson(lesson.id)
  const usedIds = new Set<string>()

  // fragile_confidence: give a different set than what they just saw, not
  // the identical questions again. Only apply if enough remain to still
  // build a full set - excluding down to almost nothing would break content
  // generation, which is worse than repeating a question once.
  if (confidenceTier === "fragile_confidence" && excludeQuestionIds.length > 0) {
    const filtered = quizPool.filter(q => !excludeQuestionIds.includes(q.id))
    if (filtered.length >= 4) quizPool = filtered
  }

  // On regeneration, shuffle the pool differently
  const shuffledPool = regenerationAttempt > 0
    ? [...quizPool].sort(() => Math.random() - 0.5)
    : quizPool

  // ─── Concept Section ───
  const conceptParagraphs = template.conceptIntro(lesson.title, lesson.description)
  const conceptBullets = template.bullets(lesson.title)
  const realWorldExample = template.realWorldExample(lesson.title)

  // ─── Micro Check - pick 1-2 questions from quiz pool ───
  let microCheckQuestions: QuizQuestion[]
  if (shuffledPool.length >= 2) {
    microCheckQuestions = selectQuestions(shuffledPool, 2, usedIds)
    microCheckQuestions.forEach(q => usedIds.add(q.id))
  } else {
    const fallback = template.fallbackQuestions(lesson.title, lesson.level)
    microCheckQuestions = [fallback[0]]
    usedIds.add(fallback[0].id)
  }

  // ─── Scenario ───
  const scenario = template.scenario(lesson.title, lesson.description)

  // ─── Applied Question - pick 1 from quiz pool ───
  let appliedQuestion: QuizQuestion
  if (shuffledPool.length >= 3) {
    const picked = selectQuestions(shuffledPool, 1, usedIds)
    appliedQuestion = picked[0] || template.fallbackQuestions(lesson.title, lesson.level)[1]
    if (picked[0]) usedIds.add(picked[0].id)
  } else {
    const fallback = template.fallbackQuestions(lesson.title, lesson.level)
    appliedQuestion = fallback[1]
    usedIds.add(fallback[1].id)
  }

  // ─── Recap ───
  const takeaways = [
    `${lesson.title} is a practical skill that applies directly to real financial decisions`,
    ...conceptBullets.slice(0, 3),
    `Apply these concepts to your own financial situation for maximum benefit`
  ]

  // ─── Mastery Check - pick 3-4 from quiz pool ───
  let masteryQuestions: QuizQuestion[]
  if (shuffledPool.length >= 6) {
    masteryQuestions = selectQuestions(shuffledPool, 4, usedIds)
  } else if (shuffledPool.length > usedIds.size) {
    masteryQuestions = selectQuestions(shuffledPool, Math.min(3, shuffledPool.length - usedIds.size), usedIds)
    if (masteryQuestions.length < 3) {
      const fallback = template.fallbackQuestions(lesson.title, lesson.level)
      masteryQuestions.push(...fallback.filter(q => !usedIds.has(q.id)).slice(0, 3 - masteryQuestions.length))
    }
  } else {
    // Exclude fallbacks already shown in the micro-check/applied sections -
    // otherwise the mastery check repeats questions whose answers were just
    // revealed minutes earlier in the same lesson.
    masteryQuestions = template.fallbackQuestions(lesson.title, lesson.level)
      .filter(q => !usedIds.has(q.id))
  }

  // moderate_confidence: mix in one real question pulled from the prior
  // lesson in this topic (resolved by the caller - lessonContent.ts is what
  // knows about both hand-written and generated prior-lesson pools).
  if (reinforcementQuestion && !usedIds.has(reinforcementQuestion.id)) {
    microCheckQuestions = [...microCheckQuestions, reinforcementQuestion]
  }

  // ─── Balance all questions across A/B/C/D ───
  const balancedMicro = balanceQuestions(microCheckQuestions)
  const balancedApplied = balanceQuestions([appliedQuestion])[0]
  const balancedMastery = balanceQuestions(masteryQuestions)

  return {
    lessonId: lesson.id,
    sections: [
      {
        type: "concept" as const,
        title: lesson.title,
        paragraphs: conceptParagraphs,
        bullets: conceptBullets,
        realWorldExample
      },
      {
        type: "micro-check" as const,
        questions: balancedMicro
      },
      {
        type: "scenario" as const,
        title: scenario.title,
        narrative: scenario.narrative,
        details: scenario.details
      },
      {
        type: "applied-question" as const,
        question: balancedApplied
      },
      {
        type: "recap" as const,
        takeaways
      },
      {
        type: "mastery-check" as const,
        requiredCorrect: Math.min(3, balancedMastery.length),
        questions: balancedMastery
      }
    ]
  }
}
