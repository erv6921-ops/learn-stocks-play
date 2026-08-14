import React, { useState, useEffect, useMemo } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { supabase } from "@/integrations/supabase/client"
import { useApp } from "@/contexts/AppContext"
import { benchmarkQuestions, BenchmarkQuestion, calculateLiteracyLevel, getLevelDescription, computeCategoryScores } from "@/data/assessmentQuestions"
import { computeBenchmarkScores } from "@/lib/curriculumEngine"
import { shuffleQuestion } from "@/lib/mcqEngine"
import { DEV_LOCAL_BYPASS } from "@/lib/devBypass"
import { JeffMascot } from "@/components/JeffMascot"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { CheckCircle, XCircle, ArrowRight, ArrowLeft, X, Sparkles, Loader2, BarChart3, GraduationCap, Users, ChevronRight, MailCheck, PartyPopper, Building2 } from "lucide-react"
import Confetti from "@/components/Confetti"
import { EnrollmentTrack } from "@/types"

type UserRole = "student" | "teacher"
type OnboardingStep = "role-select" | "name" | "teacher-details" | "student-account" | "student-details" | "program-select" | "welcome" | "assessment" | "results"

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

// Ensure we cover all categories - pick at least 1 per category
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

// The profiles.grade CHECK constraint only permits integers 7–12 (or NULL).
// GRADE_MAP deliberately covers options outside that range (6th grade, and
// "adult" → 0) for the local User object, so before writing to the database we
// coerce anything out of range — including a skipped ("") or unexpected
// selection, which maps to undefined — down to NULL to satisfy the constraint.
function gradeForDb(gradeKey: string): number | null {
  const mapped = GRADE_MAP[gradeKey]
  return typeof mapped === "number" && Number.isInteger(mapped) && mapped >= 7 && mapped <= 12
    ? mapped
    : null
}

// ── Guided sign-up header ──────────────────────────────────────────────────
// A slim progress bar of dots showing how far along the sign-up the user is.
function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5 mb-7">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className={cn(
            "h-1.5 rounded-full",
            i === current ? "bg-primary" : i < current ? "bg-primary/50" : "bg-border",
          )}
          animate={{ width: i === current ? 26 : 7 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
        />
      ))}
    </div>
  )
}

// Jeff stands beside a speech bubble and talks the user through the current
// step - the friendly "guide" that ties the whole sign-up together.
function JeffGuide({ message, mood = "happy" }: { message: string; mood?: "happy" | "thinking" | "excited" | "teaching" | "celebrating" }) {
  return (
    <div className="flex items-end gap-3 mb-6">
      <JeffMascot size="xl" mood={mood} />
      <motion.div
        key={message}
        initial={{ opacity: 0, scale: 0.85, x: -8 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="relative mb-2 max-w-[15rem] rounded-2xl rounded-bl-md border border-border bg-card px-4 py-2.5 text-left text-sm font-medium text-foreground shadow-card"
      >
        <span
          aria-hidden
          className="absolute -left-1.5 bottom-2 h-3 w-3 rotate-45 border-b border-l border-border bg-card"
        />
        {message}
      </motion.div>
    </div>
  )
}

// Full header for a sign-up data-collection step: progress + Jeff + heading.
function StepHeader({
  current,
  total,
  message,
  mood,
  title,
  subtitle,
}: {
  current: number
  total: number
  message: string
  mood?: "happy" | "thinking" | "excited" | "teaching" | "celebrating"
  title: string
  subtitle?: string
}) {
  return (
    <>
      <StepDots current={current} total={total} />
      <JeffGuide message={message} mood={mood} />
      <h1 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-2">{title}</h1>
      {subtitle && <p className="text-muted-foreground text-sm mb-6">{subtitle}</p>}
    </>
  )
}

export default function Onboarding() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user, setUser } = useApp()
  const { toast } = useToast()

  const [step, setStep] = useState<OnboardingStep>("role-select")
  const [loading, setLoading] = useState(false)
  const [showSkipDialog, setShowSkipDialog] = useState(false)
  // True when an already-authenticated user lands here just to (re)take the
  // benchmark - we skip the role/signup steps and preserve their profile.
  const [benchmarkOnly, setBenchmarkOnly] = useState(false)

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
  // Email verification: after signUp with confirmation on, we collect the
  // 6-digit code here ("code") then celebrate ("done") - no magic link.
  const [emailStep, setEmailStep] = useState<"" | "code" | "done">("")
  const [emailCode, setEmailCode] = useState("")
  // Program choice: Regular Course, Gulliver Biz Lab (Shark Tank), or Gulliver
  // Introduction to Business. Persisted to profiles.track; biz_lab_enrolled is
  // kept in sync for rollback.
  const [track, setTrack] = useState<EnrollmentTrack>(() => user?.track ?? (user?.bizLabEnrolled ? "biz_lab" : "regular"))

  // Adaptive assessment state
  const [questionPool] = useState<BenchmarkQuestion[]>(() => buildAdaptivePool())
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<BenchmarkQuestion[]>([])
  const [answers, setAnswers] = useState<number[]>([])
  const [correctHistory, setCorrectHistory] = useState<boolean[]>([])
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)

  // The current question - adaptively selected
  const [currentQuestion, setCurrentQuestion] = useState<BenchmarkQuestion>(() => shuffleQuestion(questionPool[0]) as BenchmarkQuestion)

  useEffect(() => {
    const wantsBenchmark = searchParams.get("benchmark") === "1"

    supabase.auth.getSession().then(({ data }) => {
      // Prefill email from the authenticated session so the user sees it's linked
      const e = data.session?.user?.email
      console.log("[Onboarding] session email:", e)
      if (e) setEmail(e)

      // An authenticated user clicking "Take Benchmark" goes straight to the
      // assessment - no login/signup, no dashboard bounce. (The DEV bypass has
      // no real session but is effectively "signed in", so allow it there too.)
      if (wantsBenchmark && (data.session || DEV_LOCAL_BYPASS)) {
        setBenchmarkOnly(true)
        setStep("assessment")
        return
      }

      // Otherwise, if the user already finished onboarding, send them home.
      const stored = localStorage.getItem("investiplay_user")
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          if (parsed?.onboardingComplete) {
            navigate("/dashboard")
          }
        } catch {}
      }
    })
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
    // DEV bypass has no session; skip the DB round-trip and let the caller
    // update local state so the benchmark still completes on localhost.
    if (DEV_LOCAL_BYPASS) return true
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

    // In benchmark-only mode we only touch the assessment-related columns so
    // the user's existing name/school/grade/etc. are preserved (an upsert only
    // updates the columns it's given).
    const payload = benchmarkOnly
      ? {
          id: uid,
          email: data.session?.user?.email ?? email,
          onboarding_complete: true,
          ...extra,
        }
      : {
          id: uid,
          email: data.session?.user?.email ?? email,
          first_name: firstName || null,
          last_name: lastName || null,
          school_name: schoolName || null,
          grade: gradeForDb(grade),
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

  // Verify the 6-digit signup code. verifyOtp confirms the email and creates a
  // session; AppContext's SIGNED_IN routing keeps students on /onboarding (a
  // no-op), so the confetti "done" screen shows. Teachers get routed straight
  // to their dashboard - their profile is saved from the signup metadata.
  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setSignupLoading(true)
    try {
      const { error } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: emailCode.trim(),
        type: "signup",
      })
      if (error) throw error
      setEmailCode("")
      setEmailStep("done")
    } catch (err: any) {
      toast({ title: "Invalid or expired code", description: err.message, variant: "destructive" })
    } finally {
      setSignupLoading(false)
    }
  }

  const handleResendCode = async () => {
    setSignupLoading(true)
    const { error } = await supabase.auth.resend({ type: "signup", email: email.trim() })
    setSignupLoading(false)
    if (error) toast({ title: "Couldn't resend", description: error.message, variant: "destructive" })
    else toast({ title: "New code sent", description: "Check your inbox (and spam folder)." })
  }

  // From the confetti "Email confirmed" screen - save the collected profile and
  // continue into the app (teachers → dashboard, students → the rest of onboarding).
  const handleEnterApp = async () => {
    setSignupLoading(true)
    try {
      if (selectedRole === "teacher") {
        const saved = await persistProfile({})
        if (saved) navigate("/teacher-dashboard")
      } else {
        const saved = await persistProfile({
          literacy_level: "explorer",
          assessment_score: 0,
          reward_multiplier: 1,
          benchmark_scores: {},
          benchmark_category_scores: {},
          onboarding_complete: false,
        })
        if (saved) { setEmailStep(""); setStep("welcome") }
      }
    } finally {
      setSignupLoading(false)
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

    // Save to the database so the profile follows the user across devices.
    const saved = await persistProfile({
      literacy_level: litLevel,
      assessment_score: overallPercent,
      reward_multiplier: rewardMultiplier,
      benchmark_scores: benchmarkScoresLegacy,
      benchmark_category_scores: categoryScores,
      track,
      biz_lab_enrolled: track === "biz_lab",
    })
    if (!saved) {
      setLoading(false)
      return
    }

    const { data: session } = await supabase.auth.getSession()
    // For a benchmark-only retake, keep the existing profile and just refresh
    // the assessment results; otherwise build the profile from the form fields.
    const base = benchmarkOnly && user
      ? user
      : {
          id: session.session?.user?.id ?? `student-${Date.now()}`,
          firstName: firstName || "Student",
          age: parseInt(age) || 14,
          schoolName: schoolName || "",
          grade: grade ? GRADE_MAP[grade] ?? 9 : 9,
          createdAt: new Date(),
        }
    const localUser = {
      ...base,
      literacyLevel: litLevel,
      onboardingComplete: true,
      assessmentScore: overallPercent,
      benchmarkScores: benchmarkScoresLegacy,
      benchmarkCategoryScores: categoryScores,
      rewardMultiplier,
      track,
      bizLabEnrolled: track === "biz_lab",
    }

    setUser(localUser)
    setLoading(false)
    // One-time flag the post-onboarding Jeff tour consumes on the dashboard.
    try { localStorage.setItem("investiplay_show_tour", "1") } catch { /* ignore */ }
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
      track,
      biz_lab_enrolled: track === "biz_lab",
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
      track,
      bizLabEnrolled: track === "biz_lab",
      createdAt: new Date()
    }

    setUser(localUser)
    setLoading(false)
    // One-time flag the post-onboarding Jeff tour consumes on the dashboard.
    try { localStorage.setItem("investiplay_show_tour", "1") } catch { /* ignore */ }
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

  // How many dots the sign-up progress bar shows (teachers have one fewer step).
  const totalSteps = selectedRole === "teacher" ? 3 : 5

  const pageBg =
    "radial-gradient(circle at 18% 18%, hsl(var(--primary) / 0.10), transparent 42%)," +
    "radial-gradient(circle at 85% 82%, hsl(var(--gold) / 0.08), transparent 42%)," +
    "hsl(var(--background))"

  // ── Email verification takes over the screen while active ──
  if (emailStep === "done") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: pageBg }}>
        <Confetti />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="w-full max-w-md text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.15 }}
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-primary shadow-glow"
          >
            <PartyPopper className="h-12 w-12 text-white" />
          </motion.div>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold mb-2">Email confirmed! 🎉</h1>
          <p className="text-muted-foreground mb-8">
            <span className="font-medium text-foreground">{email}</span> is verified. You're logged in - let's get you into InvestiPlay.
          </p>
          <Button size="lg" className="w-full text-base font-bold" onClick={handleEnterApp} disabled={signupLoading}>
            {signupLoading ? <Loader2 className="mr-2 animate-spin" /> : (
              <>{selectedRole === "teacher" ? "Go to my dashboard" : "Start learning"} <ArrowRight className="ml-1.5 h-4 w-4" /></>
            )}
          </Button>
        </motion.div>
      </div>
    )
  }

  if (emailStep === "code") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: pageBg }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="text-center mb-6">
            <JeffMascot size="sm" message="I just emailed you a 6-digit code - pop it in here to confirm your email!" />
          </div>
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MailCheck className="h-5 w-5 text-primary" /> Enter your code</CardTitle>
              <CardDescription>
                We sent a 6-digit code to <span className="font-medium text-foreground">{email}</span>. It expires in 1 hour.
                <br />
                <span className="font-semibold text-foreground">Don't see it?</span> Check your spam or junk folder.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerifyEmail} className="space-y-4">
                <Input
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="000000"
                  maxLength={6}
                  value={emailCode}
                  onChange={e => setEmailCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="text-center text-2xl tracking-[0.5em] font-bold"
                  autoFocus
                  required
                />
                <Button type="submit" className="w-full" disabled={signupLoading || emailCode.length !== 6}>
                  {signupLoading ? <Loader2 className="mr-2 animate-spin" /> : "Confirm email"}
                </Button>
              </form>
              <div className="mt-4 flex items-center justify-between text-sm">
                <button type="button" onClick={handleResendCode} disabled={signupLoading} className="text-primary hover:underline disabled:opacity-50">
                  Resend code
                </button>
                <button type="button" onClick={() => { setEmailStep(""); setEmailCode("") }} className="text-muted-foreground hover:underline">
                  Back
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 18% 18%, hsl(var(--primary) / 0.10), transparent 42%)," +
          "radial-gradient(circle at 85% 82%, hsl(var(--gold) / 0.08), transparent 42%)," +
          "hsl(var(--background))",
      }}
    >
      {/* soft decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-32 -right-24 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.30), transparent 70%)" }}
        />
        <div
          className="absolute -bottom-32 -left-24 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, hsl(var(--gold) / 0.22), transparent 70%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)", backgroundSize: "26px 26px" }}
        />
      </div>
      <div className="relative z-10 w-full flex items-center justify-center">
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
            <StepHeader
              current={0}
              total={totalSteps}
              mood="excited"
              message="Hi, I'm Jeff! I'll guide you through setup. First up - who are you?"
              title="Welcome to InvestiPlay"
              subtitle="Let's get started - are you a student or a teacher?"
            />
            <div className="w-full max-w-sm space-y-3">
              <button
                onClick={() => { setSelectedRole("student"); setStep("name") }}
                className="group w-full p-5 rounded-2xl border-2 border-border bg-card hover:border-primary hover:shadow-card transition-all text-left flex items-center gap-4 hover-lift press-scale"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-lg">I'm a Student</div>
                  <p className="text-sm text-muted-foreground mt-0.5">Learn money skills through interactive lessons and simulations</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
              <button
                onClick={() => { setSelectedRole("teacher"); setStep("name") }}
                className="group w-full p-5 rounded-2xl border-2 border-border bg-card hover:border-primary hover:shadow-card transition-all text-left flex items-center gap-4 hover-lift press-scale"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-lg">I'm a Teacher</div>
                  <p className="text-sm text-muted-foreground mt-0.5">Manage classes, assign lessons, and track student progress</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
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
            <StepHeader
              current={1}
              total={totalSteps}
              mood="happy"
              message={firstName.trim() ? `Nice to meet you, ${firstName.trim()}! 👋` : "Awesome! What should I call you?"}
              title="What's your name?"
              subtitle={selectedRole === "teacher" ? "We'll use this for your teacher profile" : "We'll use this to personalize your experience"}
            />
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
                onClick={() => setStep(selectedRole === "teacher" ? "teacher-details" : "program-select")}
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
            <StepHeader
              current={2}
              total={totalSteps}
              mood="teaching"
              message="Last step! Tell me about your school and set up your login."
              title="Teacher Info"
              subtitle="Tell us a bit about your school"
            />
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
                        // Provisions the profile + 'teacher' role server-side.
                        // Name + school go in metadata so the handle_new_user
                        // trigger writes them to the profile immediately - the
                        // email-confirmation flow has no session here yet.
                        data: { role: "teacher", first_name: firstName || null, last_name: lastName || null, school_name: schoolName || null },
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

                    // Email confirmation on → no session yet. Collect the
                    // 6-digit code we just emailed, right here.
                    if (!data.session) {
                      setEmailCode("")
                      setEmailStep("code")
                      toast({
                        title: "Check your email",
                        description: "We sent a 6-digit code to confirm your address.",
                      })
                      return
                    }

                    // Session active - save the rest of the teacher profile.
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

        {/* Step 3b: Student Account (login credentials) */}
        {step === "student-account" && (
          <motion.div
            key="student-account"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center text-center max-w-lg"
          >
            <StepHeader
              current={3}
              total={totalSteps}
              mood="happy"
              message="Let's set up your login so your progress is saved on any device."
              title="Create your login"
              subtitle="You'll use these to sign back in anytime"
            />
            <div className="w-full max-w-sm space-y-4 text-left">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email</label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" autoFocus />
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
              <Button variant="outline" onClick={() => setStep("program-select")}>
                <ArrowLeft className="mr-2 w-4 h-4" /> Back
              </Button>
              <Button
                size="xl"
                variant="hero"
                disabled={!email.trim() || password.length < 6}
                onClick={() => setStep("student-details")}
              >
                Continue <ArrowRight className="ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3c: Student Details */}
        {step === "student-details" && (
          <motion.div
            key="student-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center text-center max-w-lg"
          >
            <StepHeader
              current={4}
              total={totalSteps}
              mood="teaching"
              message={firstName.trim() ? `Almost there, ${firstName.trim()}! This helps me tailor your lessons.` : "Almost there! This helps me tailor your lessons."}
              title="A bit about you"
              subtitle="A few details to personalize your learning"
            />
            <div className="w-full max-w-sm space-y-4 text-left">
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
              <Button variant="outline" onClick={() => setStep("student-account")} disabled={signupLoading}>
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
                        // Name in metadata so the handle_new_user trigger saves it
                        // to the profile at creation - the email-confirmation flow
                        // returns no session here and skips persistProfile below.
                        data: { role: "student", first_name: firstName || null, last_name: lastName || null },
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

                    // Email confirmation on → no session yet. Collect the
                    // 6-digit code we just emailed, right here.
                    if (!data.session) {
                      setEmailCode("")
                      setEmailStep("code")
                      toast({
                        title: "Check your email",
                        description: "We sent a 6-digit code to confirm your address.",
                      })
                      return
                    }
                    toast({
                      title: "Account created!",
                      description: "You can log back in any time with your email and password.",
                    })

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

        {/* Step 3: Program selection (students) - Regular Course, Gulliver Biz
            Lab, or Gulliver Introduction to Business. Comes BEFORE account
            creation so it always shows even when email confirmation is on
            (sign-up otherwise bounces to /auth first). The pending flag is
            applied to the profile on first login, so the choice survives the
            email-confirmation round-trip. */}
        {step === "program-select" && (
          <motion.div
            key="program-select"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center text-center max-w-lg"
          >
            <StepHeader
              current={2}
              total={totalSteps}
              mood="excited"
              message="Pick your adventure! You can explore the full app either way."
              title="Choose your program"
              subtitle="Which course is your class using?"
            />
            <div className="w-full max-w-sm space-y-3">
              <button
                onClick={() => {
                  setTrack("regular")
                  try {
                    localStorage.setItem("investiplay_active_track", "regular")
                    localStorage.setItem("investiplay_track_pending", "regular")
                  } catch {}
                  setStep("student-account")
                }}
                className="group w-full p-5 rounded-2xl border-2 border-border bg-card hover:border-primary hover:shadow-card transition-all text-left flex items-center gap-4 hover-lift press-scale"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-lg">Regular Course</div>
                  <p className="text-sm text-muted-foreground mt-0.5">The full money-skills curriculum, lessons, stocks, and AP tracks</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
              <button
                onClick={() => {
                  setTrack("biz_lab")
                  try {
                    localStorage.setItem("investiplay_active_track", "gulliver-biz-lab")
                    localStorage.setItem("investiplay_track_pending", "biz_lab")
                  } catch {}
                  setStep("student-account")
                }}
                className="group w-full p-5 rounded-2xl border-2 border-border bg-card hover:border-gold hover:shadow-card transition-all text-left flex items-center gap-4 hover-lift press-scale"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-lg flex items-center gap-2">
                    Gulliver Biz Lab <span className="text-[10px] font-bold uppercase bg-gold/15 text-gold rounded-full px-2 py-0.5">Shark Tank</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">Build a business and pitch it to the Sharks. Hides the AP elective tabs.</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-gold group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
              <button
                onClick={() => {
                  setTrack("gulliver_intro")
                  try {
                    // Gulliver Intro students land on their own course view (the
                    // fullscreen gulliver-intro coaster), not the regular course.
                    localStorage.setItem("investiplay_active_track", "gulliver-intro")
                    localStorage.setItem("investiplay_track_pending", "gulliver_intro")
                  } catch {}
                  setStep("student-account")
                }}
                className="group w-full p-5 rounded-2xl border-2 border-border bg-card hover:border-primary hover:shadow-card transition-all text-left flex items-center gap-4 hover-lift press-scale"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-lg">Gulliver Introduction to Business</div>
                  <p className="text-sm text-muted-foreground mt-0.5">The 9th-grade intro business course. Hides the AP elective tabs.</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            </div>
            <Button variant="ghost" className="mt-5 text-muted-foreground" onClick={() => setStep("name")}>
              <ArrowLeft className="mr-2 w-4 h-4" /> Back
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
              Take a quick benchmark to personalize your curriculum - or skip to start from the beginning.
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
                          The Benchmark Assessment personalizes everything - your lessons, difficulty, recommendations, and reward multiplier are all tailored based on your results. Without it, you'll start at the foundational level in every unit.
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
                  <p>• Strong areas ({'>'}75%): Foundational content is validated - you'll skip ahead to advanced scenarios</p>
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
    </div>
  )
}
