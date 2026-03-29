import React, { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { supabase } from "@/integrations/supabase/client"
import { useApp } from "@/contexts/AppContext"
import { benchmarkQuestions, BenchmarkQuestion, calculateLiteracyLevel, getLevelDescription, computeCategoryScores } from "@/data/assessmentQuestions"
import { computeBenchmarkScores } from "@/lib/curriculumEngine"
import { shuffleQuestion } from "@/lib/mcqEngine"
import { JeffMascot } from "@/components/JeffMascot"
import investiplayLogo from "@/assets/investiplay-logo-full.png"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, XCircle, ArrowRight, ArrowLeft, X, Sparkles, Loader2, BarChart3 } from "lucide-react"

type OnboardingStep = "about-you" | "welcome" | "assessment" | "results"

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia",
  "Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland",
  "Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey",
  "New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina",
  "South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming",
  "Washington D.C."
]

// ═══════════════════════════════════════════════════
// ADAPTIVE BENCHMARK ENGINE
// Start hard → adapt based on performance
// ═══════════════════════════════════════════════════

interface AdaptiveState {
  questionOrder: BenchmarkQuestion[]
  difficultyLevel: number // 0-100 internal tracker
}

function buildAdaptiveQuestionOrder(): BenchmarkQuestion[] {
  // Group by difficulty
  const strategic = benchmarkQuestions.filter(q => q.difficulty === "strategic")
  const applied = benchmarkQuestions.filter(q => q.difficulty === "applied")
  const foundational = benchmarkQuestions.filter(q => q.difficulty === "foundational")

  // Shuffle within each tier
  const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5)

  // Start with hardest, then interleave
  return [...shuffle(strategic), ...shuffle(applied), ...shuffle(foundational)]
}

function getAdaptiveNextQuestion(
  allQuestions: BenchmarkQuestion[],
  answeredIds: Set<string>,
  recentCorrect: boolean[], // last N answers
): BenchmarkQuestion | null {
  const remaining = allQuestions.filter(q => !answeredIds.has(q.id))
  if (remaining.length === 0) return null

  // Calculate recent performance (last 4 answers)
  const recent = recentCorrect.slice(-4)
  const recentRate = recent.length > 0 ? recent.filter(Boolean).length / recent.length : 0.5

  // Determine target difficulty
  let targetDifficulty: string
  if (recentRate >= 0.75) {
    targetDifficulty = "strategic" // doing well → harder
  } else if (recentRate >= 0.4) {
    targetDifficulty = "applied" // middling → medium
  } else {
    targetDifficulty = "foundational" // struggling → easier
  }

  // Try to find a question at target difficulty
  const atTarget = remaining.filter(q => q.difficulty === targetDifficulty)
  if (atTarget.length > 0) return atTarget[Math.floor(Math.random() * atTarget.length)]

  // Fallback: pick from adjacent difficulty
  if (targetDifficulty === "strategic") {
    const applied = remaining.filter(q => q.difficulty === "applied")
    if (applied.length > 0) return applied[Math.floor(Math.random() * applied.length)]
  } else if (targetDifficulty === "foundational") {
    const applied = remaining.filter(q => q.difficulty === "applied")
    if (applied.length > 0) return applied[Math.floor(Math.random() * applied.length)]
  }

  // Last resort: any remaining
  return remaining[Math.floor(Math.random() * remaining.length)]
}

// Ensure we cover all categories — pick at least 1 per category
function buildAdaptivePool(): BenchmarkQuestion[] {
  // Start with all questions shuffled by difficulty (hardest first)
  return buildAdaptiveQuestionOrder()
}

export default function Onboarding() {
  const navigate = useNavigate()
  const { setUser } = useApp()
  const { toast } = useToast()

  const [step, setStep] = useState<OnboardingStep>("about-you")
  const [loading, setLoading] = useState(false)
  const [showSkipDialog, setShowSkipDialog] = useState(false)

  // About You fields
  const [firstName, setFirstName] = useState("")
  const [schoolName, setSchoolName] = useState("")
  const [grade, setGrade] = useState("")
  const [stateCourse, setStateCourse] = useState("")

  // Adaptive assessment state
  const [questionPool] = useState<BenchmarkQuestion[]>(() => buildAdaptivePool())
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<BenchmarkQuestion[]>([])
  const [answers, setAnswers] = useState<number[]>([])
  const [correctHistory, setCorrectHistory] = useState<boolean[]>([])
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)

  // The current question — adaptively selected
  const [currentQuestion, setCurrentQuestion] = useState<BenchmarkQuestion>(() => shuffleQuestion(questionPool[0]) as BenchmarkQuestion)

  useEffect(() => {
    // If user already has a local profile, skip to dashboard
    const stored = localStorage.getItem("investiplay_user")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed?.onboardingComplete) {
          navigate("/dashboard")
          return
        }
      } catch {}
    }
  }, [])

  const BENCHMARK_TOTAL = 50
  const totalQuestions = BENCHMARK_TOTAL
  const answeredCount = answers.length

  const handleAnswer = (answerIndex: number) => {
    const isCorrect = answerIndex === currentQuestion.correctAnswer
    if (isCorrect) setScore(prev => prev + 1)
    setAnswers(prev => [...prev, answerIndex])
    setAnsweredQuestions(prev => [...prev, currentQuestion])
    setCorrectHistory(prev => [...prev, isCorrect])
    setShowExplanation(true)
  }

  const handleNextQuestion = () => {
    setShowExplanation(false)

    if (answeredCount + 1 >= totalQuestions) {
      // All questions answered
      setStep("results")
      return
    }

    // Get next question adaptively
    const answeredIds = new Set([...answeredQuestions.map(q => q.id), currentQuestion.id])
    const nextQ = getAdaptiveNextQuestion(
      questionPool,
      answeredIds,
      [...correctHistory]
    )

    if (nextQ) {
      setCurrentQuestion(shuffleQuestion(nextQ) as BenchmarkQuestion)
      setCurrentQuestionIdx(prev => prev + 1)
    } else {
      setStep("results")
    }
  }

  const handleComplete = async () => {
    setLoading(true)

    // Compute scores locally first (no auth dependency)
    const allQs = answeredQuestions.length > 0 ? answeredQuestions : questionPool
    const litLevel = calculateLiteracyLevel(score)
    const categoryScores = computeCategoryScores(allQs as any, answers)
    const benchmarkScoresLegacy = computeBenchmarkScores(
      allQs.map(q => ({ topic: q.category, correctAnswer: q.correctAnswer })),
      answers
    )
    const overallPercent = Math.round((score / totalQuestions) * 100)
    const rewardMultiplier = Math.min(1 + overallPercent / 200, 1.5)

    const localUser = {
      id: `student-${Date.now()}`,
      firstName: firstName || "Student",
      age: 14,
      schoolName: schoolName || "",
      grade: parseInt(grade) || 9,
      literacyLevel: litLevel,
      onboardingComplete: true,
      assessmentScore: overallPercent,
      benchmarkScores: benchmarkScoresLegacy,
      benchmarkCategoryScores: categoryScores,
      rewardMultiplier,
      createdAt: new Date()
    }

    setUser(localUser)
    setLoading(false)
    navigate("/dashboard")
  }

  const handleSkip = async () => {
    setShowSkipDialog(false)
    setLoading(true)
    
    // Build local user immediately
    const localUser = {
      id: `student-${Date.now()}`,
      firstName: firstName || "Student",
      age: 14,
      schoolName: schoolName || "",
      grade: parseInt(grade) || 9,
      literacyLevel: "explorer" as const,
      onboardingComplete: true,
      assessmentScore: 0,
      benchmarkScores: {},
      benchmarkCategoryScores: {},
      rewardMultiplier: 1,
      createdAt: new Date()
    }

    setUser(localUser)
    setLoading(false)
    navigate("/dashboard")
  }

  const literacyLevel = calculateLiteracyLevel(score)
  const categoryScoresPreview = computeCategoryScores(
    answeredQuestions as any,
    answers
  )

  const categoryGroups = [
    { label: "Money Foundations", cats: ["psychology-of-money", "income-earning", "budgeting"] },
    { label: "Banking & Credit", cats: ["banking", "credit-debt"] },
    { label: "Investing Core", cats: ["investing-intro", "stocks", "stock-market"] },
    { label: "Portfolio Strategy", cats: ["portfolio", "etfs-funds", "bonds"] },
    { label: "Company Analysis", cats: ["financial-statements", "financial-ratios", "valuation"] },
    { label: "Behavioral Finance", cats: ["behavioral-finance", "bubbles-crashes"] },
    { label: "Macro Economics", cats: ["macro-economics", "economic-indicators"] },
    { label: "Entrepreneurship", cats: ["entrepreneurship", "competitive-strategy"] },
    { label: "Advanced Investing", cats: ["options", "alternatives"] },
    { label: "Real-World Application", cats: ["financial-planning", "simulations"] },
  ]

  // Adaptive difficulty indicator
  const difficultyLabel = useMemo(() => {
    if (correctHistory.length < 2) return "Strategic"
    const recent = correctHistory.slice(-4)
    const rate = recent.filter(Boolean).length / recent.length
    if (rate >= 0.75) return "Advanced"
    if (rate >= 0.4) return "Applied"
    return "Foundational"
  }, [correctHistory])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Exit button */}
      <div className="fixed top-4 right-4 z-50">
        <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="text-muted-foreground gap-1.5">
          <X className="w-4 h-4" /> Exit
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {step === "about-you" && (
          <motion.div
            key="about-you"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center text-center max-w-lg"
          >
            <img src={investiplayLogo} alt="InvestiPlay" className="h-12 md:h-14 object-contain mb-8" />
            <h1 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-2">
              About You
            </h1>
            <p className="text-muted-foreground text-sm mb-6">
              Just 3 quick things so we can personalize your experience
            </p>
            <div className="w-full max-w-sm space-y-4 text-left">
              <div>
                <label className="text-sm font-medium mb-1.5 block">First Name</label>
                <Input
                  placeholder="e.g. Emma"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  autoFocus
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">School Name</label>
                <Input
                  placeholder="e.g. Lincoln High School"
                  value={schoolName}
                  onChange={e => setSchoolName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Grade</label>
                <Select value={grade} onValueChange={setGrade}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {[6,7,8,9,10,11,12].map(g => (
                      <SelectItem key={g} value={String(g)}>Grade {g}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">State / Course</label>
                <Select value={stateCourse} onValueChange={setStateCourse}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your state or course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AP Financial Literacy">AP Financial Literacy</SelectItem>
                    {US_STATES.map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              size="xl"
              variant="hero"
              className="mt-6"
              disabled={!firstName.trim()}
              onClick={() => setStep("welcome")}
            >
              Continue <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        )}

        {step === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center text-center max-w-lg"
          >
            <JeffMascot
              size="lg"
              message="Welcome to InvestiPlay! Let's discover what you already know!"
              className="mb-8 justify-center"
            />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gradient mb-3">
              InvestiPlay
            </h1>
            <p className="text-muted-foreground text-lg mb-4 max-w-md">
              Learn money skills that last a lifetime through interactive lessons and simulations
            </p>
            <p className="text-sm text-muted-foreground mb-8 max-w-sm">
              Take a quick benchmark to personalize your curriculum — or skip to start from the beginning.
            </p>
            <Button size="xl" variant="hero" onClick={() => setStep("assessment")}>
              Take Benchmark Assessment <ArrowRight className="ml-2" />
            </Button>
            <Button variant="ghost" size="sm" className="mt-3 text-muted-foreground" onClick={() => setShowSkipDialog(true)}>
              Skip and start from the beginning →
            </Button>

            {/* Skip dialog */}
            <Dialog open={showSkipDialog} onOpenChange={setShowSkipDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Skip Benchmark Assessment?</DialogTitle>
                  <DialogDescription>
                    The benchmark personalizes your lessons, difficulty, and reward multiplier. Without it, you'll start at the foundational level in every unit.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowSkipDialog(false)}>
                    Go Back
                  </Button>
                  <Button variant="destructive" onClick={handleSkip} disabled={loading}>
                    {loading ? <Loader2 className="mr-2 animate-spin" /> : null}
                    Skip Anyway
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.div>
        )}

        {step === "assessment" && (
          <motion.div
            key="assessment"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-2xl"
          >
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-display text-2xl font-bold">Benchmark Assessment</h2>
                  <p className="text-sm text-muted-foreground">
                    Adaptive • {totalQuestions} questions • Personalizes your entire experience
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {difficultyLabel}
                  </Badge>
                  <Dialog open={showSkipDialog} onOpenChange={setShowSkipDialog}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        Skip
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure you want to skip?</DialogTitle>
                        <DialogDescription>
                          The Benchmark Assessment personalizes everything — your lessons, difficulty, recommendations, and reward multiplier are all tailored based on your results. Without it, you'll start at the foundational level in every unit.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowSkipDialog(false)}>
                          Go Back
                        </Button>
                        <Button variant="destructive" onClick={handleSkip} disabled={loading}>
                          {loading ? <Loader2 className="mr-2 animate-spin" /> : null}
                          Skip Anyway
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Question {answeredCount + 1} of {totalQuestions}
                </span>
                <Badge variant="muted">
                  {currentQuestion.category.replace(/-/g, ' ')}
                </Badge>
              </div>
              <Progress value={((answeredCount + 1) / totalQuestions) * 100} />
            </div>

            <div className="flex gap-6 items-start">
              <div className="hidden md:block">
                <JeffMascot
                  size="md"
                  mood={showExplanation ? (answers[answeredCount] === currentQuestion.correctAnswer ? "celebrating" : "teaching") : "thinking"}
                  animate={!showExplanation}
                />
              </div>

              <Card variant="elevated" className="flex-1">
                <CardHeader>
                  <CardTitle className="text-lg leading-relaxed">
                    {currentQuestion.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {currentQuestion.options.map((option, index) => {
                    const answered = showExplanation
                    const selectedAnswer = answers[answeredCount]
                    const isSelected = selectedAnswer === index
                    const isCorrect = index === currentQuestion.correctAnswer

                    return (
                      <button
                        key={index}
                        onClick={() => !showExplanation && handleAnswer(index)}
                        disabled={showExplanation}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                          answered
                            ? isCorrect
                              ? "border-success bg-success/10"
                              : isSelected
                              ? "border-destructive bg-destructive/10"
                              : "border-border opacity-50"
                            : "border-border hover:border-primary hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="font-medium text-sm leading-relaxed">
                            <span className="text-muted-foreground mr-2">{String.fromCharCode(65 + index)}.</span>
                            {option}
                          </span>
                          {answered && isCorrect && (
                            <CheckCircle className="text-success flex-shrink-0 mt-0.5" />
                          )}
                          {answered && isSelected && !isCorrect && (
                            <XCircle className="text-destructive flex-shrink-0 mt-0.5" />
                          )}
                        </div>
                      </button>
                    )
                  })}

                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-muted rounded-xl"
                    >
                      <p className="text-sm text-muted-foreground">
                        <strong>Explanation:</strong> {currentQuestion.explanation}
                      </p>
                      <Button onClick={handleNextQuestion} className="mt-4 w-full">
                        {answeredCount + 1 < totalQuestions ? "Next Question" : "See Results"}
                        <ArrowRight className="ml-2" />
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {step === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl"
          >
            <JeffMascot
              size="xl"
              mood="celebrating"
              message={`Assessment complete! You scored ${score} out of ${totalQuestions}!`}
              className="mb-6 justify-center"
            />

            <Card variant="elevated">
              <CardHeader className="text-center">
                <Sparkles className="w-12 h-12 mx-auto text-warning mb-2" />
                <CardTitle className="text-2xl">Your Benchmark Results</CardTitle>
                <CardDescription>Your curriculum is now personalized based on these results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Overall Score */}
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-primary">
                    {Math.round((score / totalQuestions) * 100)}%
                  </div>
                  <Badge
                    variant={literacyLevel}
                    className="text-lg px-4 py-2"
                  >
                    {literacyLevel === "capital-architect" ? "Advanced+" : literacyLevel.charAt(0).toUpperCase() + literacyLevel.slice(1)} Depth
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-2">
                    {getLevelDescription(literacyLevel)}
                  </p>
                </div>

                {/* Category Breakdown */}
                <div>
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" /> Category Breakdown
                  </h3>
                  <div className="space-y-2">
                    {categoryGroups.map(group => {
                      const cats = group.cats
                      let totalCorrect = 0
                      let totalQ = 0
                      cats.forEach(cat => {
                        if (categoryScoresPreview[cat]) {
                          totalCorrect += categoryScoresPreview[cat].correct
                          totalQ += categoryScoresPreview[cat].total
                        }
                      })
                      const pct = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0

                      return (
                        <div key={group.label} className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground w-36 truncate">{group.label}</span>
                          <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className={`h-full rounded-full ${pct >= 75 ? 'bg-success' : pct >= 50 ? 'bg-warning' : 'bg-destructive/60'}`}
                            />
                          </div>
                          <span className={`text-xs font-bold w-10 text-right ${pct >= 75 ? 'text-success' : pct >= 50 ? 'text-warning' : 'text-destructive'}`}>
                            {pct}%
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* What this means */}
                <div className="bg-muted rounded-xl p-4 text-sm text-muted-foreground space-y-1">
                  <p><strong>What happens now:</strong></p>
                  <p>• Strong areas ({'>'}75%): Foundational content is validated — you'll skip ahead to advanced scenarios</p>
                  <p>• Growing areas (50-74%): Applied-level entry with moderate scaffolding</p>
                  <p>• Development areas ({'<'}50%): Full foundational coverage with extra practice</p>
                  <p>• Reward multiplier: <strong>{Math.min(1 + Math.round((score / totalQuestions) * 100) / 200, 1.5).toFixed(2)}x</strong> on all InvestiCoins earned</p>
                </div>

                <Button onClick={handleComplete} size="lg" variant="hero" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 animate-spin" /> : null}
                  Start Personalized Learning <ArrowRight className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
