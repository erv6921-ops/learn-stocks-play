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

type UserRole = "student" | "teacher"
type OnboardingStep = "role-select" | "name" | "teacher-details" | "student-details" | "welcome" | "assessment" | "results"

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

const GRADE_MAP: Record<string, number> = {
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  "11": 11,
  "12": 12,
  freshman: 9,
  sophomore: 10,
  junior: 11,
  senior: 12,
  adult: 0,
}

export default function Onboarding() {
  const navigate = useNavigate()
  const { setUser } = useApp()
  const { toast } = useToast()

  const [step, setStep] = useState<OnboardingStep>("role-select")
  const [loading, setLoading] = useState(false)
  const [showSkipDialog, setShowSkipDialog] = useState(false)

  // Role & profile fields
  const [selectedRole, setSelectedRole] = useState<UserRole | "">("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [schoolName, setSchoolName] = useState("")
  const [grade, setGrade] = useState("")
  const [age, setAge] = useState("")
  const [classCode, setClassCode] = useState("")
  const [stateCourse, setStateCourse] = useState("")
  const [password, setPassword] = useState("")
  const [signupLoading, setSignupLoading] = useState(false)

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
    // Prefill email from the authenticated session so the user sees it's linked
    supabase.auth.getSession().then(({ data }) => {
      const e = data.session?.user?.email
      console.log("[Onboarding] session email:", e)
      if (e) setEmail(e)
    })


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

  const BENCHMARK_TOTAL = 25
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

  const persistProfile = async (extra: Record<string, any>) => {
    const { data } = await supabase.auth.getSession()
    const uid = data.session?.user?.id
    if (!uid) {
      toast({
        title: "Log in to save progress",
        description: "Your account needs to be signed in before progress can save across devices.",
        variant: "destructive",
      })
      navigate("/auth")
      return false
    }

    const payload = {
      id: uid,
      email: data.session?.user?.email ?? email,
      first_name: firstName || null,
      last_name: lastName || null,
      school_name: schoolName || null,
      grade: grade ? GRADE_MAP[grade] ?? null : null,
      age: age ? parseInt(age) : null,
      state_course: stateCourse || null,
      class_code: classCode || null,
      onboarding_complete: true,
      ...extra,
    }

    const { error } = await supabase.from("profiles").upsert(payload, { onConflict: "id" })
    if (error) {
      console.error("[Onboarding] Failed to save profile", error)
      toast({ title: "Couldn't save progress", description: error.message, variant: "destructive" })
      return false
    }

    // If a join code was entered, look up the class and enroll the student.
    const trimmedCode = classCode.trim().toUpperCase()
    if (trimmedCode) {
      const { data: classData, error: lookupError } = await supabase
        .rpc("lookup_class_by_join_code", { _code: trimmedCode })
        .single()

      if (lookupError || !classData) {
        toast({
          title: "Invalid class code",
          description: `No class found for code "${trimmedCode}". You can add it later from the Leaderboard.`,
          variant: "destructive",
        })
      } else {
        const { error: joinError } = await supabase
          .from("class_members")
          .insert({ class_id: (classData as { id: string }).id, user_id: uid })

        // 23505 = already a member; treat as success.
        if (joinError && joinError.code !== "23505") {
          toast({ title: "Couldn't join class", description: joinError.message, variant: "destructive" })
        }
      }
    }

    return true
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

    // Save to the database so the profile follows the user across devices.
    const saved = await persistProfile({
      literacy_level: litLevel,
      assessment_score: overallPercent,
      reward_multiplier: rewardMultiplier,
      benchmark_scores: benchmarkScoresLegacy,
      benchmark_category_scores: categoryScores,
    })
    if (!saved) {
      setLoading(false)
      return
    }

    const { data: session } = await supabase.auth.getSession()
    const localUser = {
      id: session.session?.user?.id ?? `student-${Date.now()}`,
      firstName: firstName || "Student",
      age: parseInt(age) || 14,
      schoolName: schoolName || "",
      grade: grade ? GRADE_MAP[grade] ?? 9 : 9,
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

    const saved = await persistProfile({
      literacy_level: "explorer",
      assessment_score: 0,
      reward_multiplier: 1,
      benchmark_scores: {},
      benchmark_category_scores: {},
    })
    if (!saved) {
      setLoading(false)
      return
    }

    const { data: session } = await supabase.auth.getSession()
    const localUser = {
      id: session.session?.user?.id ?? `student-${Date.now()}`,
      firstName: firstName || "Student",
      age: parseInt(age) || 14,
      schoolName: schoolName || "",
      grade: grade ? GRADE_MAP[grade] ?? 9 : 9,
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
      <AnimatePresence mode="wait">
        {/* Step 1: Role Selection */}
        {step === "role-select" && (
          <motion.div
            key="role-select"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center text-center max-w-lg"
          >
            <img src={investiplayLogo} alt="InvestiPlay" className="h-12 md:h-14 object-contain mb-8" />
            <h1 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-2">
              Welcome to InvestiPlay
            </h1>
            <p className="text-muted-foreground text-sm mb-8">
              Let's get started — are you a student or a teacher?
            </p>
            <div className="w-full max-w-sm space-y-3">
              <button
                onClick={() => { setSelectedRole("student"); setStep("name") }}
                className="w-full p-5 rounded-xl border-2 border-border hover:border-primary hover:bg-muted/50 transition-all text-left"
              >
                <div className="font-semibold text-lg">🎓 I'm a Student</div>
                <p className="text-sm text-muted-foreground mt-1">Learn money skills through interactive lessons and simulations</p>
              </button>
              <button
                onClick={() => { setSelectedRole("teacher"); setStep("name") }}
                className="w-full p-5 rounded-xl border-2 border-border hover:border-primary hover:bg-muted/50 transition-all text-left"
              >
                <div className="font-semibold text-lg">📚 I'm a Teacher</div>
                <p className="text-sm text-muted-foreground mt-1">Manage classes, assign lessons, and track student progress</p>
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/auth")}
                className="text-primary font-medium hover:underline"
              >
                Log in
              </button>
            </p>
          </motion.div>
        )}

        {/* Step 2: Name (both roles) */}
        {step === "name" && (
          <motion.div
            key="name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center text-center max-w-lg"
          >
            <img src={investiplayLogo} alt="InvestiPlay" className="h-12 md:h-14 object-contain mb-8" />
            <h1 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-2">
              What's your name?
            </h1>
            <p className="text-muted-foreground text-sm mb-6">
              {selectedRole === "teacher" ? "We'll use this for your teacher profile" : "We'll use this to personalize your experience"}
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
                <label className="text-sm font-medium mb-1.5 block">Last Name</label>
                <Input
                  placeholder="e.g. Johnson"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setStep("role-select")}>
                <ArrowLeft className="mr-2 w-4 h-4" /> Back
              </Button>
              <Button
                size="xl"
                variant="hero"
                disabled={!firstName.trim()}
                onClick={() => setStep(selectedRole === "teacher" ? "teacher-details" : "student-details")}
              >
                Continue <ArrowRight className="ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3a: Teacher Details */}
        {step === "teacher-details" && (
          <motion.div
            key="teacher-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center text-center max-w-lg"
          >
            <img src={investiplayLogo} alt="InvestiPlay" className="h-12 md:h-14 object-contain mb-8" />
            <h1 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-2">
              Teacher Info
            </h1>
            <p className="text-muted-foreground text-sm mb-6">
              Tell us a bit about your school
            </p>
            <div className="w-full max-w-sm space-y-4 text-left">
              <div>
                <label className="text-sm font-medium mb-1.5 block">School Name</label>
                <Input
                  placeholder="e.g. Lincoln High School"
                  value={schoolName}
                  onChange={e => setSchoolName(e.target.value)}
                  autoFocus
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email</label>
                <Input
                  type="email"
                  placeholder="e.g. emma@school.edu"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  minLength={6}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  You'll use this with your email to log back in from any device.
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setStep("name")} disabled={signupLoading}>
                <ArrowLeft className="mr-2 w-4 h-4" /> Back
              </Button>
              <Button
                size="xl"
                variant="hero"
                disabled={!schoolName.trim() || !email.trim() || password.length < 6 || signupLoading}
                onClick={async () => {
                  setSignupLoading(true)
                  try {
                    // If already signed in with a different account, sign out first
                    const { data: existing } = await supabase.auth.getSession()
                    if (existing.session && existing.session.user.email !== email.trim()) {
                      await supabase.auth.signOut()
                    }

                    const { data, error } = await supabase.auth.signUp({
                      email: email.trim(),
                      password,
                      options: {
                        emailRedirectTo: window.location.origin,
                        // Provisions the profile + 'teacher' role server-side.
                        data: { role: "teacher" },
                      },
                    })

                    if (error) {
                      if (error.message.toLowerCase().includes("registered") || error.message.toLowerCase().includes("already")) {
                        toast({
                          title: "Account already exists",
                          description: "Use the Log in link to sign back into your account.",
                          variant: "destructive",
                        })
                        setSignupLoading(false)
                        return
                      }
                      throw error
                    }

                    // Email confirmation on → no session yet. The account +
                    // teacher role are already saved by the trigger; finish
                    // after they confirm and log in.
                    if (!data.session) {
                      toast({
                        title: "Account created!",
                        description: "Check your email to confirm, then log in from any device.",
                      })
                      navigate("/auth")
                      return
                    }

                    // Session active — save the rest of the teacher profile.
                    const saved = await persistProfile({})
                    if (saved) {
                      toast({ title: "Welcome aboard!", description: "Your teacher account is ready." })
                      navigate("/teacher-dashboard")
                    }
                  } catch (err: any) {
                    toast({
                      title: "Couldn't create account",
                      description: err.message,
                      variant: "destructive",
                    })
                  } finally {
                    setSignupLoading(false)
                  }
                }}
              >
                {signupLoading ? <Loader2 className="mr-2 animate-spin" /> : <>Create Teacher Account <ArrowRight className="ml-2" /></>}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3b: Student Details */}
        {step === "student-details" && (
          <motion.div
            key="student-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center text-center max-w-lg"
          >
            <img src={investiplayLogo} alt="InvestiPlay" className="h-12 md:h-14 object-contain mb-8" />
            <h1 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-2">
              Student Info
            </h1>
            <p className="text-muted-foreground text-sm mb-6">
              A few details to personalize your learning
            </p>
            <div className="w-full max-w-sm space-y-4 text-left">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email</label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  minLength={6}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  You'll use this with your email to log back in from any device.
                </p>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Grade</label>
                <Select value={grade} onValueChange={setGrade}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your grade" />
                  </SelectTrigger>
                <SelectContent>
                    <SelectItem value="6">6th Grade</SelectItem>
                    <SelectItem value="7">7th Grade</SelectItem>
                    <SelectItem value="8">8th Grade</SelectItem>
                    <SelectItem value="9">9th Grade</SelectItem>
                    <SelectItem value="10">10th Grade</SelectItem>
                    <SelectItem value="11">11th Grade</SelectItem>
                    <SelectItem value="12">12th Grade</SelectItem>
                    <SelectItem value="freshman">Freshman</SelectItem>
                    <SelectItem value="sophomore">Sophomore</SelectItem>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="adult">Adult</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Age</label>
                <Input
                  type="number"
                  min={8}
                  max={99}
                  placeholder="e.g. 16"
                  value={age}
                  onChange={e => setAge(e.target.value)}
                />
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
              <div>
                <label className="text-sm font-medium mb-1.5 block">Class Code <span className="text-muted-foreground font-normal">(optional)</span></label>
                <Input
                  placeholder="e.g. ABC123"
                  value={classCode}
                  onChange={e => setClassCode(e.target.value.toUpperCase())}
                  maxLength={6}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setStep("name")} disabled={signupLoading}>
                <ArrowLeft className="mr-2 w-4 h-4" /> Back
              </Button>
              <Button
                size="xl"
                variant="hero"
                disabled={!grade || !email.trim() || password.length < 6 || signupLoading}
                onClick={async () => {
                  setSignupLoading(true)
                  try {
                    // If already signed in with a different account, sign out first
                    const { data: existing } = await supabase.auth.getSession()
                    if (existing.session && existing.session.user.email !== email.trim()) {
                      await supabase.auth.signOut()
                    }

                    const { data, error } = await supabase.auth.signUp({
                      email: email.trim(),
                      password,
                      options: {
                        emailRedirectTo: window.location.origin,
                        data: { role: "student" },
                      },
                    })

                    if (error) {
                      // If user already exists, let them know to log in
                      if (error.message.toLowerCase().includes("registered") || error.message.toLowerCase().includes("already")) {
                        toast({
                          title: "Account already exists",
                          description: "Use the Log in link to sign back into your progress.",
                          variant: "destructive",
                        })
                        setSignupLoading(false)
                        return
                      }
                      throw error
                    }

                    toast({
                      title: "Account created!",
                      description: data.session
                        ? "You can log back in any time with your email and password."
                        : "Check your email to confirm your account. You'll be able to log in from any device after.",
                    })
                    if (!data.session) {
                      navigate("/auth")
                      return
                    }

                    const saved = await persistProfile({
                      literacy_level: "explorer",
                      assessment_score: 0,
                      reward_multiplier: 1,
                      benchmark_scores: {},
                      benchmark_category_scores: {},
                      onboarding_complete: false,
                    })
                    if (saved) setStep("welcome")
                  } catch (err: any) {
                    toast({
                      title: "Couldn't create account",
                      description: err.message,
                      variant: "destructive",
                    })
                  } finally {
                    setSignupLoading(false)
                  }
                }}
              >
                {signupLoading ? <Loader2 className="mr-2 animate-spin" /> : <>Continue <ArrowRight className="ml-2" /></>}
              </Button>
            </div>
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
