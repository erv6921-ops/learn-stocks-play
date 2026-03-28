export type MasteryTier = "explorer" | "builder" | "strategist" | "investor" | "capital-architect"

// Legacy alias for backward compatibility
export type LiteracyLevel = MasteryTier

export interface BenchmarkCategoryScore {
  correct: number
  total: number
  percent: number
}

export interface UserProfile {
  id: string
  firstName?: string
  age: number
  schoolName: string
  grade: number
  literacyLevel: MasteryTier
  onboardingComplete: boolean
  assessmentScore: number
  benchmarkScores?: Record<string, number> // per-topic: 0 or 1
  benchmarkCategoryScores?: Record<string, BenchmarkCategoryScore>
  rewardMultiplier?: number
  createdAt: Date
}

export interface AssessmentQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  topic: "budgeting" | "saving" | "stocks" | "debt" | "economics"
  explanation: string
}

export interface Lesson {
  id: string
  title: string
  description: string
  category: LessonCategory
  level: MasteryTier
  unitId: string
  lessonNumber: string // e.g. "1.1"
  reward: number // InvestiCoin reward
  content: string
  videoPath?: string
  videoSegments?: string[]
  duration: number
  completed: boolean
  quizScore?: number
}

export type LessonCategory = 
  | "budgeting"
  | "economics"
  | "balance-sheets"
  | "stocks"
  | "debt-management"
  | "psychology-of-money"
  | "income-earning"
  | "banking"
  | "credit-debt"
  | "investing-intro"
  | "stock-market"
  | "portfolio"
  | "etfs-funds"
  | "bonds"
  | "financial-statements"
  | "financial-ratios"
  | "valuation"
  | "behavioral-finance"
  | "bubbles-crashes"
  | "macro-economics"
  | "economic-indicators"
  | "entrepreneurship"
  | "competitive-strategy"
  | "options"
  | "alternatives"
  | "financial-planning"
  | "simulations"

export interface UnitInfo {
  id: string
  unitNumber: number
  title: string
  level: number
  levelTitle: string
  categories: LessonCategory[]
  orderIndex: number
}

export interface Token {
  id: string
  name: string
  symbol: string
  totalSupply: number
  createdAt: Date
  priceSimulation: number
  marketCap: number
}

export interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: number
  peRatio: number
  high52Week: number
  low52Week: number
  historicalData: { date: string; price: number }[]
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

// ═══════════════════════════════════════════════
// STRUCTURED LESSON CONTENT (6-Section Format)
// ═══════════════════════════════════════════════

export interface LessonContentSection {
  type: "concept" | "micro-check" | "scenario" | "applied-question" | "recap" | "mastery-check"
}

export interface ConceptSection extends LessonContentSection {
  type: "concept"
  title: string
  paragraphs: string[]
  bullets?: string[]
  realWorldExample?: string
}

export interface MicroCheckSection extends LessonContentSection {
  type: "micro-check"
  questions: QuizQuestion[]
}

export interface ScenarioSection extends LessonContentSection {
  type: "scenario"
  title: string
  narrative: string
  details?: string[]
}

export interface AppliedQuestionSection extends LessonContentSection {
  type: "applied-question"
  question: QuizQuestion
}

export interface RecapSection extends LessonContentSection {
  type: "recap"
  takeaways: string[]
}

export interface MasteryCheckSection extends LessonContentSection {
  type: "mastery-check"
  questions: QuizQuestion[]
  requiredCorrect: number
}

export type LessonSection = ConceptSection | MicroCheckSection | ScenarioSection | AppliedQuestionSection | RecapSection | MasteryCheckSection

export interface StructuredLessonContent {
  lessonId: string
  sections: LessonSection[]
}

export interface LessonProgress {
  lessonId: string
  completed: boolean
  quizScore?: number
  completedAt?: Date
}

export interface StockHolding {
  symbol: string
  shares: number
  purchasePrice: number
  purchasedAt: Date
}

export const MASTERY_TIERS: Record<MasteryTier, { label: string; emoji: string; color: string }> = {
  "explorer": { label: "Foundational", emoji: "🌱", color: "success" },
  "builder": { label: "Applied", emoji: "📈", color: "primary" },
  "strategist": { label: "Strategic", emoji: "🧠", color: "accent" },
  "investor": { label: "Advanced", emoji: "🏦", color: "warning" },
  "capital-architect": { label: "Advanced+", emoji: "🚀", color: "warning" },
}

export const LEVEL_TITLES: Record<number, string> = {
  1: "Money Foundations",
  2: "Banking & Credit",
  3: "Investing Core",
  4: "Portfolio Strategy",
  5: "Company Analysis",
  6: "Behavioral Finance",
  7: "Macro Economics",
  8: "Entrepreneurship",
  9: "Advanced Investing",
  10: "Real-World Application",
}
