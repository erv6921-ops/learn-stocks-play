import React, { useState, useEffect, useMemo } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Trans, useTranslation } from "react-i18next"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { supabase } from "@/integrations/supabase/client"
import { useApp } from "@/contexts/AppContext"
import { benchmarkQuestions, BenchmarkQuestion, calculateLiteracyLevel, getLevelDescription, computeCategoryScores } from "@/data/assessmentQuestions"
import { computeBenchmarkScores } from "@/lib/curriculumEngine"
import { deriveDomainAbilities, domainStartingPoints, conceptLabel, TIER_LABEL, type StartingTier } from "@/lib/benchmarkSeeding"
import { shuffleQuestion } from "@/lib/mcqEngine"
import { saveBenchmarkProgress, loadBenchmarkProgress, clearBenchmarkProgress } from "@/lib/benchmarkProgress"
import { DEV_LOCAL_BYPASS } from "@/lib/devBypass"
import { eligibleForFloridaTracks, US_STATES } from "@/lib/geography"
import { applyClassTrack } from "@/lib/classTrack"
import { JeffMascot } from "@/components/JeffMascot"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { CheckCircle, XCircle, ArrowRight, ArrowLeft, X, Sparkles, Loader2, BarChart3, GraduationCap, Users, ChevronRight, MailCheck, PartyPopper, Building2, Eye, EyeOff, Check, ChevronsUpDown } from "lucide-react"
import Confetti from "@/components/Confetti"
import { EnrollmentTrack } from "@/types"

type UserRole = "student" | "teacher"
// Shortened student sign-up: exactly four screens after the role gate -
// name -> grade -> track -> login. Non-default tracks (Biz Lab / Gulliver
// Intro) are no longer pickable here; they are joined via a class code.
// Teachers keep their own short path (name -> school -> details).
type OnboardingStep =
  | "role-select" | "name" | "teacher-school" | "teacher-details"
  | "grade" | "track" | "student-account"
  | "welcome" | "assessment" | "results"

// Progress-dot index for each student data screen. role-select is the entry
// gate (shown before these four) and isn't counted. Teachers use their own
// count (see totalSteps).
const STUDENT_STEP_INDEX: Record<string, number> = {
  "name": 0, "grade": 1, "track": 2, "student-account": 3,
}
const STUDENT_TOTAL_STEPS = 4

// US_STATES lives in @/lib/geography (shared with the Florida-track gating).

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

// The profiles.grade CHECK constraint only permits integers 7 to 12 (or NULL).
// GRADE_MAP deliberately covers options outside that range (6th grade, and
// "adult" → 0) for the local User object, so before writing to the database we
// coerce anything out of range (including a skipped ("") or unexpected
// selection, which maps to undefined) down to NULL to satisfy the constraint.
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

// One animated single-question screen: Jeff header + progress dots, the field(s)
// sliding in, and a Back/Continue footer. Every student data step is built from
// this so the whole flow shares one polished animation and Jeff on each screen.
function FieldStep({
  stepKey, current, total, mood, message, title, subtitle,
  onBack, onContinue, continueDisabled = false, continueLabel,
  loading = false, children,
}: {
  stepKey: string
  current: number
  total: number
  mood?: "happy" | "thinking" | "excited" | "teaching" | "celebrating"
  message: string
  title: string
  subtitle?: string
  onBack?: () => void
  onContinue: () => void
  continueDisabled?: boolean
  continueLabel?: string
  loading?: boolean
  children: ReactNode
}) {
  const { t } = useTranslation()
  // Enter submits when the step is completable, so keyboard users fly through.
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !continueDisabled && !loading) { e.preventDefault(); onContinue() }
  }
  return (
    <motion.div
      key={stepKey}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className="flex flex-col items-center text-center max-w-lg"
      onKeyDown={handleKeyDown}
    >
      <StepHeader current={current} total={total} mood={mood} message={message} title={title} subtitle={subtitle} />
      <motion.div
        className="w-full max-w-sm space-y-4 text-left"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14, type: "spring", stiffness: 240, damping: 24 }}
      >
        {children}
      </motion.div>
      <div className="flex gap-3 mt-6">
        {onBack && (
          <Button variant="outline" onClick={onBack} disabled={loading}>
            <ArrowLeft className="mr-2 w-4 h-4" /> {t("onboarding.back")}
          </Button>
        )}
        <Button size="xl" variant="hero" disabled={continueDisabled || loading} onClick={onContinue}>
          {loading ? <Loader2 className="mr-2 animate-spin" /> : <>{continueLabel ?? t("onboarding.continue")} <ArrowRight className="ml-2" /></>}
        </Button>
      </div>
    </motion.div>
  )
}

// Password field with a show/hide eye toggle. Manages its own reveal state so
// the password and confirm fields can be revealed independently.
function PasswordInput({
  value, onChange, placeholder, autoFocus = false,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  autoFocus?: boolean
}) {
  const [show, setShow] = useState(false)
  const { t } = useTranslation()
  return (
    <div className="relative">
      <Input
        type={show ? "text" : "password"}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder ?? t("onboarding.passwordPlaceholder")}
        minLength={6}
        autoFocus={autoFocus}
        className="pr-10"
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setShow(s => !s)}
        aria-label={show ? t("onboarding.hidePassword") : t("onboarding.showPassword")}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  )
}

export default function Onboarding() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user, setUser } = useApp()
  const { toast } = useToast()
  const { t } = useTranslation()

  const [step, setStep] = useState<OnboardingStep>("role-select")
  const [loading, setLoading] = useState(false)
  const [showSkipDialog, setShowSkipDialog] = useState(false)
  // True when an already-authenticated user lands here just to (re)take the
  // benchmark - we skip the role/signup steps and preserve their profile.
  const [benchmarkOnly, setBenchmarkOnly] = useState(false)
  // True when an already-authenticated STUDENT lands here with an unfinished
  // profile (e.g. they signed up, confirmed email, then came back). They
  // already have a login, so we start them at the name step and skip the
  // account-creation step - onboarding_complete is written at the very end.
  const [resumeAuthed, setResumeAuthed] = useState(false)

  // Role & profile fields
  const [selectedRole, setSelectedRole] = useState<UserRole | "">("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [schoolName, setSchoolName] = useState("")
  const [grade, setGrade] = useState("")
  const [age, setAge] = useState("")
  const [classCode, setClassCode] = useState("")
  // Track step: the class-code entry is hidden behind a link until requested.
  const [showClassCode, setShowClassCode] = useState(false)
  const [stateCourse, setStateCourse] = useState("")
  const [stateOpen, setStateOpen] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  // Both signup steps require a 6+ char password that matches its confirmation.
  const passwordsMatch = password.length >= 6 && password === confirmPassword
  const [signupLoading, setSignupLoading] = useState(false)
  // Email verification: after signUp with confirmation on, we collect the
  // 6-digit code here ("code") then celebrate ("done") - no magic link.
  const [emailStep, setEmailStep] = useState<"" | "code" | "done">("")
  const [emailCode, setEmailCode] = useState("")
  // Program choice: Regular Course, Gulliver Biz Lab (Shark Tank), or Gulliver
  // Introduction to Business. Persisted to profiles.track; biz_lab_enrolled is
  // kept in sync for rollback.
  const [track, setTrack] = useState<EnrollmentTrack>(() => user?.track ?? (user?.bizLabEnrolled ? "biz_lab" : "regular"))
  // Teacher school step: once "Gulliver Preparatory" is picked we reveal its two
  // program tracks (Biz Lab / Intro to Business) inline.
  const [gulliverPrep, setGulliverPrep] = useState(false)

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

  // Resume an in-progress benchmark: if the student answered some questions in a
  // previous visit but didn't finish, restore their answers and pick up at the
  // next question. Runs once, when we first enter the assessment step.
  const [benchmarkRestored, setBenchmarkRestored] = useState(false)

  useEffect(() => {
    const wantsBenchmark = searchParams.get("benchmark") === "1"
    // ?preview=1 walks the whole onboarding flow even when already onboarded
    // (e.g. under the DEV auth bypass) so the sign-up screens can be reviewed.
    const previewMode = searchParams.get("preview") === "1"

    supabase.auth.getSession().then(async ({ data }) => {
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

      // Already authenticated (real session, not the dev bypass): decide from
      // the REAL profile row - not a possibly-stale localStorage copy - whether
      // to send them home or resume onboarding. This is the read that keeps a
      // new student in onboarding instead of bouncing them to the dashboard.
      if (data.session && !previewMode) {
        const { data: prof } = await supabase
          .from("profiles")
          .select("role, onboarding_complete")
          .eq("id", data.session.user.id)
          .maybeSingle()
        if (prof?.onboarding_complete) {
          navigate("/dashboard")
          return
        }
        // A signed-in student with an unfinished profile: skip role-select and
        // the signup step, drop them at the name step, and mark onboarding
        // complete only at the very end (handleComplete / handleSkip).
        if (prof && prof.role !== "teacher") {
          setSelectedRole("student")
          setResumeAuthed(true)
          setStep("name")
          return
        }
      }

      // Fallback for the dev bypass (no real session): use the cached user.
      const stored = localStorage.getItem("investiplay_user")
      if (stored && !previewMode) {
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

  // Restore a partially-completed benchmark when the assessment opens.
  useEffect(() => {
    if (benchmarkRestored || step !== "assessment") return
    setBenchmarkRestored(true)

    const saved = loadBenchmarkProgress()
    if (!saved || saved.answers.length === 0 || saved.answers.length >= BENCHMARK_TOTAL) return

    setAnsweredQuestions(saved.answeredQuestions)
    setAnswers(saved.answers)
    setCorrectHistory(saved.correctHistory)
    setScore(saved.score)
    setCurrentQuestionIdx(saved.answers.length)

    const answeredIds = new Set(saved.answeredQuestions.map(q => q.id))
    const nextQ = getAdaptiveNextQuestion(questionPool, answeredIds, saved.correctHistory)
    if (nextQ) setCurrentQuestion(shuffleQuestion(nextQ) as BenchmarkQuestion)

    toast({
      title: t("onboarding.resumingBenchmark"),
      description: t("onboarding.resumingBenchmarkDesc", { current: saved.answers.length + 1, total: BENCHMARK_TOTAL }),
    })
  }, [step, benchmarkRestored, questionPool])

  // Persist progress after each answer so an unfinished benchmark isn't lost.
  useEffect(() => {
    if (step !== "assessment") return
    if (answers.length === 0 || answers.length >= BENCHMARK_TOTAL) return
    saveBenchmarkProgress({ answeredQuestions, answers, correctHistory, score })
  }, [answers, step, answeredQuestions, correctHistory, score])

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
        title: t("onboarding.logInToSave"),
        description: t("onboarding.logInToSaveDesc"),
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
      toast({ title: t("onboarding.couldntSaveProgress"), description: error.message, variant: "destructive" })
      return false
    }

    // If a join code was entered, look up the class and enroll the student.
    // Joining a class is now the ONLY way a student can land on a non-default
    // (locked) track: the class carries a `track`, and on join we copy it to the
    // student's assigned_track + track. The class_members insert must happen
    // BEFORE the profiles.track update so the server-side lock trigger sees the
    // membership and allows the write.
    const trimmedCode = classCode.trim().toUpperCase()
    if (trimmedCode) {
      const { data: classData, error: lookupError } = await supabase
        .rpc("lookup_class_by_join_code", { _code: trimmedCode })
        .single()

      if (lookupError || !classData) {
        toast({
          title: t("onboarding.invalidClassCode"),
          description: t("onboarding.invalidClassCodeDesc", { code: trimmedCode }),
          variant: "destructive",
        })
      } else {
        const klass = classData as { id: string; track?: EnrollmentTrack | null }
        const { error: joinError } = await supabase
          .from("class_members")
          .insert({ class_id: klass.id, user_id: uid })

        // 23505 = already a member; treat as success.
        if (joinError && joinError.code !== "23505") {
          toast({ title: t("dashboard.couldntJoinClass"), description: joinError.message, variant: "destructive" })
        } else {
          await applyClassTrack(uid, klass.track ?? "regular")
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
      toast({ title: t("auth.invalidCode"), description: err.message, variant: "destructive" })
    } finally {
      setSignupLoading(false)
    }
  }

  const handleResendCode = async () => {
    setSignupLoading(true)
    const { error } = await supabase.auth.resend({ type: "signup", email: email.trim() })
    setSignupLoading(false)
    if (error) toast({ title: t("auth.couldntResend"), description: error.message, variant: "destructive" })
    else toast({ title: t("auth.newCodeSent"), description: t("auth.newCodeSentDesc") })
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
        // Shortened flow: no benchmark. Complete onboarding and enter the app.
        setEmailStep("")
        await finishStudentOnboarding()
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

    // Benchmark is fully complete - drop the resume snapshot.
    clearBenchmarkProgress()

    const { data: session } = await supabase.auth.getSession()

    // ── Seed the IRT engine from the benchmark ──
    // Translate per-domain performance into a starting theta per concept so the
    // adaptive engine begins each lesson at the student's real level instead of
    // the flat default. Keyed on concept = lesson.category, exactly what
    // useAbility loads on lesson entry. Non-fatal: a failure here still lets the
    // student into the app, but we surface it rather than swallowing it.
    const seedRows = deriveDomainAbilities(categoryScores)
    const seedUid = session.session?.user?.id
    if (DEV_LOCAL_BYPASS) {
      // No real JWT in dev; RLS would reject the write. Mirrors useAbility.
      console.debug("[benchmark seed] skipped under DEV_LOCAL_BYPASS", seedRows.length, "rows")
    } else if (seedUid && seedRows.length > 0) {
      const now = new Date().toISOString()
      const rows = seedRows.map((r) => ({ user_id: seedUid, ...r, updated_at: now }))
      const { error: seedErr } = await (supabase as any)
        .from("student_ability")
        .upsert(rows, { onConflict: "user_id,concept" })
      if (seedErr) {
        console.error("[benchmark seed] student_ability upsert failed", seedErr)
        toast({
          title: t("onboarding.seedFailed"),
          description: t("onboarding.seedFailedDesc"),
          variant: "destructive",
        })
      } else {
        console.debug("[benchmark seed] wrote", rows.length, "student_ability rows")
      }
    }

    // For a benchmark-only retake, keep the existing profile and just refresh
    // the assessment results; otherwise build the profile from the form fields.
    const base = benchmarkOnly && user
      ? user
      : {
          id: session.session?.user?.id ?? `student-${Date.now()}`,
          firstName: firstName || t("common.student"),
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
      stateCourse: stateCourse || undefined,
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
    clearBenchmarkProgress()

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
      firstName: firstName || t("common.student"),
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
      stateCourse: stateCourse || undefined,
      bizLabEnrolled: track === "biz_lab",
      createdAt: new Date()
    }

    setUser(localUser)
    setLoading(false)
    // One-time flag the post-onboarding Jeff tour consumes on the dashboard.
    try { localStorage.setItem("investiplay_show_tour", "1") } catch { /* ignore */ }
    navigate("/dashboard")
  }

  // Finish the shortened student sign-up (name -> grade -> track -> login).
  // There is no benchmark step any more, so the assessment-derived fields get
  // sensible defaults (literacy "explorer", score 0, multiplier 1, empty
  // benchmark maps) and the IRT engine seeds itself at its flat default on the
  // first lesson instead of from a benchmark. persistProfile writes the profile
  // (onboarding_complete = true) and, when a class code was entered, joins the
  // class and applies its track. Called once, after the account exists.
  const finishStudentOnboarding = async () => {
    setLoading(true)
    clearBenchmarkProgress()

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
    // If a class code moved the student onto a locked track, applyClassTrack has
    // already stashed it as the pending track; reflect it locally so the
    // dashboard opens on the right course without waiting for the next hydrate.
    let pendingTrack: EnrollmentTrack = track
    try {
      const p = localStorage.getItem("investiplay_track_pending")
      if (p === "biz_lab" || p === "gulliver_intro" || p === "regular") pendingTrack = p
    } catch { /* storage unavailable */ }

    const localUser = {
      id: session.session?.user?.id ?? `student-${Date.now()}`,
      firstName: firstName || t("common.student"),
      lastName: lastName || undefined,
      age: parseInt(age) || 14,
      schoolName: schoolName || "",
      grade: grade ? GRADE_MAP[grade] ?? 9 : 9,
      literacyLevel: "explorer" as const,
      onboardingComplete: true,
      assessmentScore: 0,
      benchmarkScores: {},
      benchmarkCategoryScores: {},
      rewardMultiplier: 1,
      track: pendingTrack,
      stateCourse: stateCourse || undefined,
      bizLabEnrolled: pendingTrack === "biz_lab",
      createdAt: new Date(),
    }

    setUser(localUser)
    setLoading(false)
    try { localStorage.setItem("investiplay_show_tour", "1") } catch { /* ignore */ }
    navigate("/dashboard")
  }

  // From the track step: a brand-new student goes on to create a login; an
  // already-authenticated student (resuming an unfinished profile) has no login
  // to make, so we complete onboarding straight away.
  const proceedFromTrack = () => {
    if (resumeAuthed) { void finishStudentOnboarding() } else { setStep("student-account") }
  }

  const literacyLevel = calculateLiteracyLevel(score)
  const categoryScoresPreview = computeCategoryScores(
    answeredQuestions as any,
    answers
  )

  const categoryGroups = [
    { label: t("onboarding.categories.moneyFoundations"), cats: ["psychology-of-money", "income-earning", "budgeting"] },
    { label: t("onboarding.categories.bankingCredit"), cats: ["banking", "credit-debt"] },
    { label: t("onboarding.categories.investingCore"), cats: ["investing-intro", "stocks", "stock-market"] },
    { label: t("onboarding.categories.portfolioStrategy"), cats: ["portfolio", "etfs-funds", "bonds"] },
    { label: t("onboarding.categories.companyAnalysis"), cats: ["financial-statements", "financial-ratios", "valuation"] },
    { label: t("onboarding.categories.behavioralFinance"), cats: ["behavioral-finance", "bubbles-crashes"] },
    { label: t("onboarding.categories.macroEconomics"), cats: ["macro-economics", "economic-indicators"] },
    { label: t("onboarding.categories.entrepreneurship"), cats: ["entrepreneurship", "competitive-strategy"] },
    { label: t("onboarding.categories.advancedInvesting"), cats: ["options", "alternatives"] },
    { label: t("onboarding.categories.realWorld"), cats: ["financial-planning", "simulations"] },
  ]

  // Adaptive difficulty indicator
  const difficultyLabel = useMemo(() => {
    if (correctHistory.length < 2) return t("onboarding.difficulty.strategic")
    const recent = correctHistory.slice(-4)
    const rate = recent.filter(Boolean).length / recent.length
    if (rate >= 0.75) return t("onboarding.difficulty.advanced")
    if (rate >= 0.4) return t("onboarding.difficulty.applied")
    return t("onboarding.difficulty.foundational")
  }, [correctHistory, t])

  // How many dots the sign-up progress bar shows. Teachers: name → school →
  // account.
  const totalSteps = selectedRole === "teacher" ? 4 : STUDENT_TOTAL_STEPS

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
          <h1 className="font-display text-3xl md:text-4xl font-extrabold mb-2">{t("auth.emailConfirmed")}</h1>
          <p className="text-muted-foreground mb-8">
            <Trans i18nKey="onboarding.emailVerifiedLoggedIn" values={{ email }} components={{ email: <span className="font-medium text-foreground" /> }} />
          </p>
          <Button size="lg" className="w-full text-base font-bold" onClick={handleEnterApp} disabled={signupLoading}>
            {signupLoading ? <Loader2 className="mr-2 animate-spin" /> : (
              <>{selectedRole === "teacher" ? t("onboarding.goToMyDashboard") : t("dashboard.startLearning")} <ArrowRight className="ml-1.5 h-4 w-4" /></>
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
            <JeffMascot size="sm" message={t("auth.jeffCodeMessage")} />
          </div>
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MailCheck className="h-5 w-5 text-primary" /> {t("auth.enterYourCode")}</CardTitle>
              <CardDescription>
                <Trans i18nKey="auth.weSentCode" values={{ email }} components={{ email: <span className="font-medium text-foreground" /> }} />
                <br />
                <span className="font-semibold text-foreground">{t("auth.dontSeeIt")}</span> {t("auth.checkSpam")}
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
                  {signupLoading ? <Loader2 className="mr-2 animate-spin" /> : t("auth.confirmEmail")}
                </Button>
              </form>
              <div className="mt-4 flex items-center justify-between text-sm">
                <button type="button" onClick={handleResendCode} disabled={signupLoading} className="text-primary hover:underline disabled:opacity-50">
                  {t("auth.resendCode")}
                </button>
                <button type="button" onClick={() => { setEmailStep(""); setEmailCode("") }} className="text-muted-foreground hover:underline">
                  {t("onboarding.back")}
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
              message={t("onboarding.jeffRole")}
              title={t("onboarding.welcomeTitle")}
              subtitle={t("onboarding.roleSubtitle")}
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
                  <div className="font-semibold text-lg">{t("onboarding.imStudent")}</div>
                  <p className="text-sm text-muted-foreground mt-0.5">{t("onboarding.studentDesc")}</p>
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
                  <div className="font-semibold text-lg">{t("onboarding.imTeacher")}</div>
                  <p className="text-sm text-muted-foreground mt-0.5">{t("onboarding.teacherDesc")}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              {t("auth.alreadyHaveAccount")}{" "}
              <button
                onClick={() => navigate("/auth")}
                className="text-primary font-medium hover:underline"
              >
                {t("auth.logIn")}
              </button>
            </p>
          </motion.div>
        )}

        {/* Step 2: Name (both roles) */}
        {step === "name" && (
          <FieldStep
            stepKey="name"
            current={selectedRole === "teacher" ? 1 : STUDENT_STEP_INDEX["name"]}
            total={totalSteps}
            mood="happy"
            message={firstName.trim() ? t("onboarding.jeffNiceToMeet", { name: firstName.trim() }) : t("onboarding.jeffName")}
            title={t("onboarding.nameTitle")}
            subtitle={selectedRole === "teacher" ? t("onboarding.nameSubtitleTeacher") : t("onboarding.nameSubtitleStudent")}
            onBack={resumeAuthed ? undefined : () => setStep("role-select")}
            continueDisabled={!firstName.trim()}
            onContinue={() => setStep(selectedRole === "teacher" ? "teacher-school" : "grade")}
          >
            <div>
              <label className="text-sm font-medium mb-1.5 block">{t("settings.firstName")}</label>
              <Input placeholder={t("onboarding.firstNamePlaceholder")} value={firstName} onChange={e => setFirstName(e.target.value)} autoFocus />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">{t("settings.lastName")}</label>
              <Input placeholder={t("onboarding.lastNamePlaceholder")} value={lastName} onChange={e => setLastName(e.target.value)} />
            </div>
          </FieldStep>
        )}

        {/* Step 3a: Teacher School + Program */}
        {step === "teacher-school" && (
          <motion.div
            key="teacher-school"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center text-center max-w-lg"
          >
            <StepHeader
              current={2}
              total={totalSteps}
              mood="teaching"
              message={t("onboarding.jeffSchool")}
              title={t("onboarding.schoolTitle")}
              subtitle={t("onboarding.schoolSubtitle")}
            />
            <div className="w-full max-w-sm space-y-3 text-left">
              {/* Quick-pick: Gulliver Preparatory reveals its two programs. */}
              <button
                onClick={() => { setSchoolName("Gulliver Preparatory"); setGulliverPrep(true) }}
                className={`group w-full p-5 rounded-2xl border-2 transition-all text-left flex items-center gap-4 hover-lift press-scale ${gulliverPrep ? "border-primary bg-primary/5 shadow-card" : "border-border bg-card hover:border-primary hover:shadow-card"}`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-lg">Gulliver Preparatory</div>
                  <p className="text-sm text-muted-foreground mt-0.5">{gulliverPrep ? t("onboarding.gulliverPickBelow") : t("onboarding.gulliverPickNext")}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>

              {/* Gulliver's two programs, revealed after the school is chosen. */}
              {gulliverPrep && (
                <div className="space-y-2 pl-3 ml-3 border-l-2 border-primary/30">
                  <button
                    onClick={() => {
                      setTrack("biz_lab")
                      try {
                        localStorage.setItem("investiplay_active_track", "gulliver-biz-lab")
                        localStorage.setItem("investiplay_track_pending", "biz_lab")
                      } catch {}
                      setStep("teacher-details")
                    }}
                    className="group w-full p-4 rounded-xl border-2 border-border bg-card hover:border-gold hover:shadow-card transition-all text-left flex items-center gap-3 hover-lift press-scale"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold flex items-center gap-2">
                        {t("onboarding.gulliverBizLab")} <span className="text-[10px] font-bold uppercase bg-gold/15 text-gold rounded-full px-2 py-0.5">{t("onboarding.sharkTank")}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{t("onboarding.bizLabDesc")}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-gold group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                  <button
                    onClick={() => {
                      setTrack("gulliver_intro")
                      try {
                        localStorage.setItem("investiplay_active_track", "gulliver-intro")
                        localStorage.setItem("investiplay_track_pending", "gulliver_intro")
                      } catch {}
                      setStep("teacher-details")
                    }}
                    className="group w-full p-4 rounded-xl border-2 border-border bg-card hover:border-primary hover:shadow-card transition-all text-left flex items-center gap-3 hover-lift press-scale"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold">{t("onboarding.gulliverIntro")}</div>
                      <p className="text-xs text-muted-foreground mt-0.5">{t("onboarding.gulliverIntroDesc")}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                </div>
              )}

              {/* Or type a different school (defaults to the regular course). */}
              <div className="pt-2">
                <label className="text-sm font-medium mb-1.5 block">{t("onboarding.orTypeSchool")}</label>
                <Input
                  placeholder={t("onboarding.schoolPlaceholder")}
                  value={gulliverPrep ? "" : schoolName}
                  onChange={e => { setGulliverPrep(false); setTrack("regular"); setSchoolName(e.target.value) }}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setStep("name")}>
                <ArrowLeft className="mr-2 w-4 h-4" /> {t("onboarding.back")}
              </Button>
              {/* Gulliver Prep advances via a program pick above; the typed-school
                  path uses this Continue (regular course). */}
              {!gulliverPrep && (
                <Button size="xl" variant="hero" disabled={!schoolName.trim()} onClick={() => setStep("teacher-details")}>
                  {t("onboarding.continue")} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              )}
            </div>
          </motion.div>
        )}

        {/* Step 3b: Teacher Details */}
        {step === "teacher-details" && (
          <motion.div
            key="teacher-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center text-center max-w-lg"
          >
            <StepHeader
              current={3}
              total={totalSteps}
              mood="teaching"
              message={t("onboarding.jeffTeacherLast")}
              title={t("onboarding.teacherInfo")}
              subtitle={schoolName ? t("onboarding.teacherSubtitleSchool", { school: schoolName }) : t("onboarding.teacherSubtitle")}
            />
            <div className="w-full max-w-sm space-y-4 text-left">
              <div>
                <label className="text-sm font-medium mb-1.5 block">{t("auth.email")}</label>
                <Input
                  type="email"
                  placeholder={t("onboarding.teacherEmailPlaceholder")}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoFocus
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">{t("auth.password")}</label>
                <PasswordInput value={password} onChange={setPassword} />
                <p className="text-xs text-muted-foreground mt-1">
                  {t("onboarding.passwordHint")}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">{t("auth.confirmPassword")}</label>
                <PasswordInput value={confirmPassword} onChange={setConfirmPassword} placeholder={t("onboarding.confirmPasswordPlaceholder")} />
                {confirmPassword.length > 0 && password !== confirmPassword && (
                  <p className="text-xs text-destructive mt-1">{t("onboarding.passwordsMismatch")}</p>
                )}
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setStep("teacher-school")} disabled={signupLoading}>
                <ArrowLeft className="mr-2 w-4 h-4" /> {t("onboarding.back")}
              </Button>
              <Button
                size="xl"
                variant="hero"
                disabled={signupLoading || (!DEV_LOCAL_BYPASS && (!email.trim() || !passwordsMatch))}
                onClick={async () => {
                  setSignupLoading(true)
                  try {
                    // DEV bypass: skip Supabase signup + email confirmation
                    // entirely and drop straight into the teacher dashboard with
                    // the chosen school + program. Local-only; never runs in a
                    // production build (import.meta.env.DEV is false there).
                    if (DEV_LOCAL_BYPASS) {
                      setUser({
                        id: `teacher-${Date.now()}`,
                        firstName: firstName || t("auth.teacher"),
                        age: 30,
                        schoolName: schoolName || "",
                        grade: 12,
                        literacyLevel: "explorer",
                        onboardingComplete: true,
                        assessmentScore: 0,
                        benchmarkScores: {},
                        benchmarkCategoryScores: {},
                        rewardMultiplier: 1,
                        track,
                        bizLabEnrolled: track === "biz_lab",
                        createdAt: new Date(),
                      })
                      toast({ title: t("onboarding.welcomeAboard"), description: t("onboarding.teacherReadyDev") })
                      navigate("/teacher-dashboard")
                      return
                    }

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
                          title: t("onboarding.accountExists"),
                          description: t("onboarding.accountExistsTeacherDesc"),
                          variant: "destructive",
                        })
                        setSignupLoading(false)
                        return
                      }
                      throw error
                    }

                    // Supabase silently no-ops signUp for an email that's
                    // already registered and confirmed (identities comes back
                    // empty, with no error and no session) to avoid leaking
                    // which emails exist. Without this check we'd tell the
                    // user we emailed them a code that was never sent, and
                    // they'd be stuck forever on the code screen.
                    if (!data.session && data.user?.identities?.length === 0) {
                      toast({
                        title: "Account already exists",
                        description: "Use the Log in link to sign back into your account.",
                        variant: "destructive",
                      })
                      setSignupLoading(false)
                      return
                    }

                    // Email confirmation on → no session yet. Collect the
                    // 6-digit code we just emailed, right here.
                    if (!data.session) {
                      setEmailCode("")
                      setEmailStep("code")
                      toast({
                        title: t("auth.checkYourEmail"),
                        description: t("auth.checkYourEmailDesc"),
                      })
                      return
                    }

                    // Session active - save the rest of the teacher profile,
                    // including the chosen program track (scopes the dashboard's
                    // assignable-lesson list to e.g. the 8 Gulliver Intro LOs).
                    const saved = await persistProfile({ track, biz_lab_enrolled: track === "biz_lab" })
                    if (saved) {
                      toast({ title: t("onboarding.welcomeAboard"), description: t("onboarding.teacherReady") })
                      navigate("/teacher-dashboard")
                    }
                  } catch (err: any) {
                    toast({
                      title: t("onboarding.couldntCreateAccount"),
                      description: err.message,
                      variant: "destructive",
                    })
                  } finally {
                    setSignupLoading(false)
                  }
                }}
              >
                {signupLoading ? <Loader2 className="mr-2 animate-spin" /> : <>{t("onboarding.createTeacherAccount")} <ArrowRight className="ml-2" /></>}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3b: Student Account (login credentials) */}
        {/* Shortened student flow: name -> grade -> track -> login. */}
        {step === "grade" && (
          <FieldStep
            stepKey="grade"
            current={STUDENT_STEP_INDEX["grade"]}
            total={totalSteps}
            mood="teaching"
            message={firstName.trim() ? t("onboarding.jeffGradeName", { name: firstName.trim() }) : t("onboarding.gradeQuestion")}
            title={t("onboarding.gradeQuestion")}
            subtitle={t("onboarding.gradeSubtitle")}
            onBack={() => setStep("name")}
            continueDisabled={!grade}
            onContinue={() => setStep("track")}
          >
            <div>
              <label className="text-sm font-medium mb-1.5 block">{t("onboarding.grade")}</label>
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger><SelectValue placeholder={t("onboarding.selectGrade")} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">{t("onboarding.grades.6")}</SelectItem>
                  <SelectItem value="7">{t("onboarding.grades.7")}</SelectItem>
                  <SelectItem value="8">{t("onboarding.grades.8")}</SelectItem>
                  <SelectItem value="9">{t("onboarding.grades.9")}</SelectItem>
                  <SelectItem value="10">{t("onboarding.grades.10")}</SelectItem>
                  <SelectItem value="11">{t("onboarding.grades.11")}</SelectItem>
                  <SelectItem value="12">{t("onboarding.grades.12")}</SelectItem>
                  <SelectItem value="freshman">{t("onboarding.grades.freshman")}</SelectItem>
                  <SelectItem value="sophomore">{t("onboarding.grades.sophomore")}</SelectItem>
                  <SelectItem value="junior">{t("onboarding.grades.junior")}</SelectItem>
                  <SelectItem value="senior">{t("onboarding.grades.senior")}</SelectItem>
                  <SelectItem value="adult">{t("onboarding.grades.adult")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </FieldStep>
        )}

        {/* Step 3 (students): Track. Only the two open tracks are pickable -
            Regular and IB Economics. Every other track (Biz Lab, Gulliver Intro)
            is locked and can only be joined with a class code, so it is not shown
            here at all. The class-code entry is tucked behind a small link. */}
        {step === "track" && (
          <motion.div
            key="track"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="flex flex-col items-center text-center max-w-lg"
          >
            <StepHeader
              current={STUDENT_STEP_INDEX["track"]}
              total={totalSteps}
              mood="excited"
              message={t("onboarding.jeffProgram")}
              title={t("onboarding.programTitle")}
              subtitle={t("onboarding.programSubtitle")}
            />
            <div className="w-full max-w-sm space-y-3">
              {/* Regular course - the default open track. */}
              <button
                onClick={() => {
                  setTrack("regular")
                  setClassCode("")
                  try {
                    localStorage.setItem("investiplay_active_track", "regular")
                    localStorage.setItem("investiplay_track_pending", "regular")
                    localStorage.removeItem("investiplay_ib_econ_enrolled")
                  } catch {}
                  proceedFromTrack()
                }}
                className="group w-full p-5 rounded-2xl border-2 border-border bg-card hover:border-primary hover:shadow-card transition-all text-left flex items-center gap-4 hover-lift press-scale"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-lg">{t("onboarding.regularCourse")}</div>
                  <p className="text-sm text-muted-foreground mt-0.5">{t("onboarding.regularCourseDesc")}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
              {/* IB Economics: a client-side course track (no profiles.track enum
                  value). Persisted enrollment stays "regular"; a localStorage
                  flag opens the IB Econ course view with a Personal Finance tab. */}
              <button
                onClick={() => {
                  setTrack("regular")
                  setClassCode("")
                  try {
                    localStorage.setItem("investiplay_active_track", "ib-econ")
                    localStorage.setItem("investiplay_track_pending", "regular")
                    localStorage.setItem("investiplay_ib_econ_enrolled", "true")
                  } catch {}
                  proceedFromTrack()
                }}
                className="group w-full p-5 rounded-2xl border-2 border-border bg-card hover:border-accent hover:shadow-card transition-all text-left flex items-center gap-4 hover-lift press-scale"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-lg">{t("onboarding.ibEconomics")}</div>
                  <p className="text-sm text-muted-foreground mt-0.5">{t("onboarding.ibEconomicsDesc")}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>

              {/* Class-code path: the only way onto a locked track. Tucked behind
                  a link so it stays out of the way for the common case. */}
              {!showClassCode ? (
                <button
                  onClick={() => setShowClassCode(true)}
                  className="text-sm text-primary font-medium hover:underline pt-1"
                >
                  {t("onboarding.haveClassCode")}
                </button>
              ) : (
                <div className="rounded-2xl border-2 border-dashed border-primary/30 bg-primary/[0.03] p-4 text-left space-y-3">
                  <label className="text-sm font-medium block">
                    {t("onboarding.classCode")}
                  </label>
                  <Input
                    placeholder={t("dashboard.joinCodePlaceholder")}
                    value={classCode}
                    onChange={e => setClassCode(e.target.value.toUpperCase())}
                    maxLength={6}
                    autoFocus
                    onKeyDown={e => {
                      if (e.key === "Enter" && classCode.trim()) {
                        e.preventDefault()
                        proceedFromTrack()
                      }
                    }}
                  />
                  <p className="text-xs text-muted-foreground">{t("onboarding.classCodeSubtitle")}</p>
                  <Button
                    size="lg"
                    variant="hero"
                    className="w-full"
                    disabled={!classCode.trim()}
                    onClick={() => proceedFromTrack()}
                  >
                    {t("onboarding.continue")} <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
            <Button variant="ghost" className="mt-5 text-muted-foreground" onClick={() => setStep("grade")}>
              <ArrowLeft className="mr-2 w-4 h-4" /> {t("onboarding.back")}
            </Button>
          </motion.div>
        )}

        {/* Final student step: create the login + sign up. All the profile
            fields are already collected on the screens before this. */}
        {step === "student-account" && (
          <FieldStep
            stepKey="student-account"
            current={STUDENT_STEP_INDEX["student-account"]}
            total={totalSteps}
            mood="happy"
            message={t("onboarding.jeffLogin")}
            title={t("onboarding.createLoginTitle")}
            subtitle={t("onboarding.createLoginSubtitle")}
            onBack={() => setStep("track")}
            continueDisabled={!DEV_LOCAL_BYPASS && (!email.trim() || !passwordsMatch)}
            continueLabel={t("auth.createAccount")}
            loading={signupLoading}
            onContinue={async () => {
              setSignupLoading(true)
              try {
                // DEV bypass: no real Supabase signup/email confirmation. Persist
                // via the local path and drop straight into the app.
                if (DEV_LOCAL_BYPASS) {
                  await finishStudentOnboarding()
                  return
                }

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
                      title: t("onboarding.accountExists"),
                      description: t("onboarding.accountExistsStudentDesc"),
                      variant: "destructive",
                    })
                    setSignupLoading(false)
                    return
                  }
                  throw error
                }

                // Supabase silently no-ops signUp for an email that's already
                // registered and confirmed (identities comes back empty, with
                // no error and no session) to avoid leaking which emails
                // exist. Without this check we'd tell the user we emailed
                // them a code that was never sent, and they'd be stuck
                // forever on the code screen.
                if (!data.session && data.user?.identities?.length === 0) {
                  toast({
                    title: "Account already exists",
                    description: "Use the Log in link to sign back into your progress.",
                    variant: "destructive",
                  })
                  setSignupLoading(false)
                  return
                }

                // Email confirmation on → no session yet. Collect the
                // 6-digit code we just emailed, right here.
                if (!data.session) {
                  setEmailCode("")
                  setEmailStep("code")
                  toast({
                    title: t("auth.checkYourEmail"),
                    description: t("auth.checkYourEmailDesc"),
                  })
                  return
                }
                toast({
                  title: t("auth.accountCreated"),
                  description: t("onboarding.accountCreatedDesc"),
                })

                // Session active immediately (email confirmation off): complete
                // the shortened flow and enter the app - no benchmark.
                await finishStudentOnboarding()
              } catch (err: any) {
                toast({
                  title: t("onboarding.couldntCreateAccount"),
                  description: err.message,
                  variant: "destructive",
                })
              } finally {
                setSignupLoading(false)
              }
            }}
          >
            <div>
              <label className="text-sm font-medium mb-1.5 block">{t("auth.email")}</label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={t("onboarding.studentEmailPlaceholder")} autoFocus />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">{t("auth.password")}</label>
              <PasswordInput value={password} onChange={setPassword} />
              <p className="text-xs text-muted-foreground mt-1">{t("onboarding.passwordHint")}</p>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">{t("auth.confirmPassword")}</label>
              <PasswordInput value={confirmPassword} onChange={setConfirmPassword} placeholder={t("onboarding.confirmPasswordPlaceholder")} />
              {confirmPassword.length > 0 && password !== confirmPassword && (
                <p className="text-xs text-destructive mt-1">{t("onboarding.passwordsMismatch")}</p>
              )}
            </div>
          </FieldStep>
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
              message={t("onboarding.jeffWelcome")}
              className="mb-8 justify-center"
            />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gradient mb-3">
              InvestiPlay
            </h1>
            <p className="text-muted-foreground text-lg mb-4 max-w-md">
              {t("onboarding.tagline")}
            </p>
            <p className="text-sm text-muted-foreground mb-8 max-w-sm">
              {t("onboarding.benchmarkIntro")}
            </p>
            <Button size="xl" variant="hero" onClick={() => setStep("assessment")}>
              {t("onboarding.takeBenchmark")} <ArrowRight className="ml-2" />
            </Button>
            <Button variant="ghost" size="sm" className="mt-3 text-muted-foreground" onClick={() => setShowSkipDialog(true)}>
              {t("onboarding.skipToStart")}
            </Button>

            {/* Skip dialog */}
            <Dialog open={showSkipDialog} onOpenChange={setShowSkipDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("onboarding.skipTitle")}</DialogTitle>
                  <DialogDescription>
                    {t("onboarding.skipDesc")}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowSkipDialog(false)}>
                    {t("onboarding.goBack")}
                  </Button>
                  <Button variant="destructive" onClick={handleSkip} disabled={loading}>
                    {loading ? <Loader2 className="mr-2 animate-spin" /> : null}
                    {t("onboarding.skipAnyway")}
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
                  <h2 className="font-display text-2xl font-bold">{t("onboarding.benchmarkTitle")}</h2>
                  <p className="text-sm text-muted-foreground">
                    {t("onboarding.benchmarkMeta", { count: totalQuestions })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {difficultyLabel}
                  </Badge>
                  <Dialog open={showSkipDialog} onOpenChange={setShowSkipDialog}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        {t("onboarding.skip")}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{t("onboarding.skipSureTitle")}</DialogTitle>
                        <DialogDescription>
                          {t("onboarding.skipSureDesc")}
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowSkipDialog(false)}>
                          {t("onboarding.goBack")}
                        </Button>
                        <Button variant="destructive" onClick={handleSkip} disabled={loading}>
                          {loading ? <Loader2 className="mr-2 animate-spin" /> : null}
                          {t("onboarding.skipAnyway")}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  {t("onboarding.questionOf", { current: answeredCount + 1, total: totalQuestions })}
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
                        <strong>{t("onboarding.explanation")}</strong> {currentQuestion.explanation}
                      </p>
                      <Button onClick={handleNextQuestion} className="mt-4 w-full">
                        {answeredCount + 1 < totalQuestions ? t("onboarding.nextQuestion") : t("onboarding.seeResults")}
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
              message={t("onboarding.jeffComplete", { score, total: totalQuestions })}
              className="mb-6 justify-center"
            />

            <Card variant="elevated">
              <CardHeader className="text-center">
                <Sparkles className="w-12 h-12 mx-auto text-warning mb-2" />
                <CardTitle className="text-2xl">{t("onboarding.resultsTitle")}</CardTitle>
                <CardDescription>{t("onboarding.resultsDesc")}</CardDescription>
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
                    {t("onboarding.depth", { tier: t(`onboarding.tiers.${literacyLevel}`) })}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-2">
                    {getLevelDescription(literacyLevel)}
                  </p>
                </div>

                {/* Category Breakdown */}
                <div>
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" /> {t("onboarding.categoryBreakdown")}
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

                {/* Your starting point — derived from the same per-domain scores
                    that now seed the adaptive engine's starting difficulty. */}
                {(() => {
                  const points = domainStartingPoints(categoryScoresPreview)
                  if (points.length === 0) return null
                  const ahead = points.filter(p => p.tier === "advanced" || p.tier === "on-track")
                  const review = points.filter(p => p.isReview)
                  const dot: Record<StartingTier, string> = {
                    advanced: "bg-success",
                    "on-track": "bg-primary",
                    building: "bg-warning",
                    review: "bg-destructive",
                  }
                  return (
                    <div className="rounded-xl border border-primary/15 bg-primary/[0.03] p-4">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" /> {t("onboarding.startingPoint")}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        <Trans i18nKey="onboarding.startingPointDesc" values={{ ahead: ahead.length, total: points.length }} components={{ strong: <strong /> }} />
                      </p>
                      <div className="space-y-1.5 max-h-44 overflow-y-auto">
                        {points.slice(0, 8).map(p => (
                          <div key={p.concept} className="flex items-center gap-2 text-xs">
                            <span className={`w-2 h-2 rounded-full shrink-0 ${dot[p.tier]}`} />
                            <span className="font-medium w-40 truncate">{conceptLabel(p.concept)}</span>
                            <span className="text-muted-foreground truncate">{TIER_LABEL[p.tier]}</span>
                          </div>
                        ))}
                      </div>
                      {review.length > 0 && (
                        <p className="text-xs text-muted-foreground mt-3">
                          <Trans
                            i18nKey="onboarding.reviewFlag"
                            values={{ topics: review.map(r => conceptLabel(r.concept)).slice(0, 4).join(", "), more: review.length > 4 ? t("onboarding.andMore") : "" }}
                            components={{ strong: <strong /> }}
                          />
                        </p>
                      )}
                    </div>
                  )
                })()}

                {/* What this means */}
                <div className="bg-muted rounded-xl p-4 text-sm text-muted-foreground space-y-1">
                  <p><strong>{t("onboarding.whatHappensNow")}</strong></p>
                  <p>{t("onboarding.strongAreas")}</p>
                  <p>{t("onboarding.growingAreas")}</p>
                  <p>{t("onboarding.developmentAreas")}</p>
                  <p><Trans i18nKey="onboarding.rewardMultiplier" values={{ multiplier: Math.min(1 + Math.round((score / totalQuestions) * 100) / 200, 1.5).toFixed(2) }} components={{ strong: <strong /> }} /></p>
                </div>

                <Button onClick={handleComplete} size="lg" variant="hero" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 animate-spin" /> : null}
                  {t("onboarding.startPersonalized")} <ArrowRight className="ml-2" />
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
