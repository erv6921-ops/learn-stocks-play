import React, { useState, useMemo, useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useApp } from "@/contexts/AppContext"
import { getLessonById } from "@/data/lessons"
import { getNextLessonId } from "@/lib/lessonNavigation"
import { getStructuredContent } from "@/data/lessonContent"
import { generateStructuredContent, tierDifficulty } from "@/lib/contentGenerator"
import { Lesson, LessonSection, StructuredLessonContent, QuizQuestion, MasteryTier, UserProfile, LessonProgress } from "@/types"
import { shuffleQuestionSet, normalizeOptionLengths, questionPassesQualityChecks } from "@/lib/mcqEngine"
import { getQuizForLesson, getQuizForLessonByTier } from "@/data/lessonQuizzes"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { JeffMascot } from "@/components/JeffMascot"
import {
  ConceptRenderer,
  MicroCheckRenderer,
  ScenarioRenderer,
  AppliedQuestionRenderer,
  RecapRenderer,
  MasteryCheckRenderer,
} from "@/components/lesson/SectionRenderer"
import { ActivityCheckRenderer } from "@/components/lesson/ActivityCheckRenderer"
import { DiagramRenderer } from "@/components/lesson/DiagramRenderer"
import { HintProvider } from "@/components/lesson/HintContext"
import { QuizSessionProvider, type AnswerContext, type QuizRunBridge } from "@/components/lesson/QuizSessionContext"
import { LessonCompletionScreen } from "@/components/lesson/LessonCompletionScreen"
import { DefinitionPracticeCard } from "@/components/lesson/DefinitionPracticeCard"
import { getDefinitionPractice } from "@/data/definitionPractice"
import { ScenarioResponse } from "@/components/lesson/ScenarioResponse"
import { getScenarioSet } from "@/content/gullerIntro/scenarios"
import JeffChat from "@/components/lessons/JeffChat"
import { logEvent } from "@/lib/analyticsEvents"
import { buildScript, isDeepLesson, clearChat, loadChat } from "@/lib/jeffChatLesson"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/integrations/supabase/client"
import { getReflectionPrompt, MIN_REFLECTION_WORDS, REFLECTION_BONUS } from "@/lib/reflectionPrompts"
import { toast } from "sonner"
import { looksLowEffort } from "@/lib/answerQuality"
import { DEV_LOCAL_BYPASS } from "@/lib/devBypass"
import { TeacherPreviewBanner, PreviewSectionNav, PreviewCompleteCard } from "@/components/teacher/TeacherPreviewChrome"
import {
  useLessonRun,
  masteryKeyPrefix,
  wholeLessonAccuracyOf,
  masteryAccuracyOf,
  type LessonRun,
  type LessonRunHandle,
} from "@/lib/lessonRun"
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Coins,
  RotateCcw,
  X,
} from "lucide-react"

export interface LessonDetailProps {
  /**
   * Teacher preview. When true NOTHING is persisted or awarded: no
   * lesson_progress, question_attempts, student_ability, mastery-score call,
   * reflections, coins/Jeffs, or analytics. The teacher still answers questions
   * and sees feedback (local state only), gets a section jump menu, and the
   * mastery check walks the full pool without a pass gate. Default false:
   * student behavior is unchanged.
   */
  previewMode?: boolean
  /** Lesson id override (used when rendered outside the /lessons/:id route). */
  lessonId?: string
  /** Called instead of navigating away when the preview is closed. */
  onExit?: () => void
}

// ─── Shared header ───

function LessonHeader({
  lesson,
  previewMode,
  onPreviewExit,
  showBack,
  showExit,
  onLeave,
  step,
}: {
  lesson: Lesson
  previewMode: boolean
  onPreviewExit?: () => void
  showBack: boolean
  showExit: boolean
  onLeave: () => void
  /** Walk progress to show under the title, or null. */
  step: { current: number; total: number } | null
}) {
  const pct = step && step.total > 0 ? (step.current / step.total) * 100 : 0
  return (
    <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      {previewMode && <TeacherPreviewBanner onExit={onPreviewExit} />}
      <div className="container mx-auto px-4">
        <div className="flex items-center h-14 gap-4">
          {showBack && !previewMode && (
            <Button variant="ghost" size="icon" onClick={onLeave} aria-label="Back to missions">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="font-semibold text-sm truncate">{lesson.title}</h1>
            {step && (
              <div className="flex items-center gap-2 mt-0.5">
                <Progress value={pct} className="h-1 flex-1 max-w-[120px]" />
                <span className="text-[10px] text-muted-foreground">{step.current}/{step.total}</span>
              </div>
            )}
          </div>
          <Badge variant="outline" className="text-xs">{lesson.lessonNumber}</Badge>
          {/* Exit: always available so a student can leave a lesson mid-way and
              come back later. The run record resumes exactly where they were. */}
          {showExit && (
            <Button variant="ghost" size="icon" aria-label="Exit lesson" title="Exit lesson" onClick={onLeave}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Route component: owns the run record and the pre-run screens ───

export default function LessonDetail({ previewMode = false, lessonId: lessonIdProp, onExit }: LessonDetailProps = {}) {
  const { id: routeId } = useParams<{ id: string }>()
  const id = lessonIdProp ?? routeId
  const navigate = useNavigate()
  const { user, lessonProgress } = useApp()

  // Leaving the lesson: the modal preview closes itself; the route navigates.
  // Back from a lesson always goes to the lessons list, never the dashboard.
  const exit = (to: string) => {
    if (previewMode && onExit) onExit()
    else navigate(to)
  }

  const lesson = getLessonById(id)
  // A legacy/alias id in the URL (e.g. /lessons/psych-3 or /lessons/income-8)
  // resolves to a real lesson - rewrite the URL to its canonical id so progress
  // and analytics key on the live id. Skip in preview/modal (prop-driven) mode.
  useEffect(() => {
    if (!lessonIdProp && lesson && lesson.id !== id) {
      navigate(`/lessons/${lesson.id}`, { replace: true })
    }
  }, [lessonIdProp, lesson, id, navigate])
  const progress = lessonProgress.find(p => p.lessonId === lesson?.id) ?? lessonProgress.find(p => p.lessonId === id)
  // Preview always behaves like a fresh, never-completed attempt.
  const isCompleted = !previewMode && !!progress?.completed

  // Analytics: log when a lesson is opened, and how long it was open at
  // completion. Fires once per lesson id; the ref seeds the elapsed timer.
  const lessonOpenedAtRef = useRef(Date.now())
  useEffect(() => {
    if (!lesson || previewMode) return // preview: no analytics_events
    lessonOpenedAtRef.current = Date.now()
    logEvent("lesson_started", { lessonId: lesson.id, trackId: lesson.category })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson?.id])

  // The ONE record of this attempt (src/lib/lessonRun.ts). Preview keeps it in
  // memory only; students' runs persist so a reload resumes the same run.
  const rh = useLessonRun(lesson?.id, { persist: !previewMode })
  const run = rh.run

  // Which lesson the student has actively entered this visit. A saved run is
  // NOT auto-entered: the overview offers "Continue where you left off" first.
  const [enteredFor, setEnteredFor] = useState<string | null>(previewMode ? (lesson?.id ?? null) : null)
  const entered = !!lesson && enteredFor === lesson.id

  // Preview skips the overview + Jeff chat: start a run immediately.
  useEffect(() => {
    if (previewMode && lesson && !run) {
      rh.startNewRun({ completedAtStart: false, chatDone: true })
      setEnteredFor(lesson.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewMode, lesson?.id, run])

  // Content pacing (Hook B): the student's most recent confidence tier for
  // THIS topic, fetched once per lesson visit - it reflects standing coming
  // INTO this lesson, not anything that happens during it. Cold start (no row
  // yet, or the fetch hasn't resolved) leaves this null, which is exactly
  // today's unmodified content - never a special case that blocks rendering.
  const [contentConfidenceTier, setContentConfidenceTier] = useState<string | null>(null)
  // fragile_confidence's "different set than what they just saw" needs to
  // know what that set actually was - the question ids from this lesson's
  // most recent completed mastery-check session.
  const [recentQuestionIds, setRecentQuestionIds] = useState<string[]>([])
  // Standing adaptive ability (theta) for THIS topic, coming into the lesson.
  // Picks the initial pool difficulty (remedial/base/hard) for a fresh lesson,
  // superseding the coarse literacyLevel. Null = no estimate yet (cold start).
  const [abilityTheta, setAbilityTheta] = useState<number | null>(null)

  useEffect(() => {
    // Replays already have a fixed quiz_score on record - don't let content
    // pacing reshuffle what a student sees when reviewing a done lesson.
    // Preview: skip too - the teacher's own history must not shape the content.
    if (!lesson || !user?.id || isCompleted || previewMode) return
    let cancelled = false
    supabase
      .from("mastery_scores")
      .select("confidence_tier")
      .eq("user_id", user.id)
      .eq("topic_id", lesson.category)
      .order("computed_at", { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled || error || !data) return
        setContentConfidenceTier(data.confidence_tier)
      })
    supabase
      .from("question_attempts")
      .select("question_id, attempt_session_id, created_at")
      .eq("user_id", user.id)
      .eq("lesson_id", lesson.id)
      .order("created_at", { ascending: false })
      .limit(20)
      .then(({ data, error }) => {
        if (cancelled || error || !data || data.length === 0) return
        const latestSession = data[0].attempt_session_id
        setRecentQuestionIds([...new Set(data.filter(r => r.attempt_session_id === latestSession).map(r => r.question_id))])
      })
    // Standing ability for this topic, to pick the initial pool difficulty.
    ;(supabase as any)
      .from("student_ability")
      .select("theta")
      .eq("user_id", user.id)
      .eq("concept", lesson.category)
      .maybeSingle()
      .then(({ data, error }: { data: { theta: number } | null; error: unknown }) => {
        if (cancelled || error || !data) return
        setAbilityTheta(data.theta)
      })
    return () => { cancelled = true }
  }, [lesson, user?.id, isCompleted, previewMode])

  // How many interactive steps the walk has (for "step N of M" on the
  // overview). The section count doesn't change with regeneration.
  const walkCount = useMemo(() => {
    if (!lesson) return 0
    const base = getStructuredContent(lesson.id, 0, null, [], null)
    return base ? base.sections.filter(s => s.type !== "concept").length : 0
  }, [lesson])

  // The next lesson to send the student to from the completion screen: the next
  // in this unit, else the first of the next unit, gated by the same unlock
  // rules the mission map uses. Recomputes when progress changes (so it appears
  // once THIS lesson is marked complete) and is null when there's no unlocked
  // next - in which case the completion screen hides the "Next" button.
  const nextLesson = useMemo(() => {
    const nextId = getNextLessonId(lesson?.id, lessonProgress, user)
    return nextId ? getLessonById(nextId) : null
  }, [lesson?.id, lessonProgress, user])

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Lesson not found</h2>
          <Button onClick={() => exit("/lessons")}>Back to Missions</Button>
        </div>
      </div>
    )
  }

  // ─── In a run: the player owns everything, keyed on the run id so a
  //     retake / restart remounts every piece of lesson state fresh. ───
  if (run && entered) {
    return (
      <LessonRunPlayer
        key={run.runId}
        lesson={lesson}
        run={run}
        rh={rh}
        previewMode={previewMode}
        onPreviewExit={onExit}
        exit={exit}
        user={user}
        progress={progress}
        openedAt={lessonOpenedAtRef.current}
        contentConfidenceTier={contentConfidenceTier}
        recentQuestionIds={recentQuestionIds}
        abilityTheta={abilityTheta}
        nextLesson={nextLesson}
      />
    )
  }

  if (previewMode) return null // the effect above starts the preview run

  // ─── Pre-run screens ───
  // A saved chat alone (no run record) only means "resume" for a lesson that
  // isn't complete yet: completed lessons may carry a leftover chat from before
  // runs existed, and those must show the honest replay screen, not "Continue".
  const savedChat = !isCompleted && loadChat(lesson.id)
  const resumable = !!run || !!savedChat
  const totalSteps = walkCount + 1 // Jeff's chat is step 1
  const currentStep = run ? (run.chatDone ? Math.min(run.sectionIndex + 2, totalSteps) : 1) : 1

  const startFresh = () => {
    clearChat(lesson.id)
    rh.startNewRun({ completedAtStart: isCompleted })
    setEnteredFor(lesson.id)
    window.scrollTo({ top: 0 })
  }
  const continueRun = () => {
    if (!run) rh.startNewRun({ completedAtStart: isCompleted }) // saved chat only: the chat resumes inside
    setEnteredFor(lesson.id)
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <LessonHeader
        lesson={lesson}
        previewMode={false}
        showBack
        showExit={false}
        onLeave={() => exit("/lessons")}
        step={null}
      />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {isCompleted && !resumable ? (
          /* ─── Replay of a completed lesson: the honest stored score ─── */
          <>
            <LessonCompletionScreen
              correct={0}
              attempts={0}
              storedQuizScore={progress?.quizScore}
              reflectionDone={false}
              reflectionBonus={REFLECTION_BONUS}
              onContinue={() => exit("/lessons?category=" + lesson.category)}
              onRetake={startFresh}
              nextTitle={nextLesson?.title}
              onNext={nextLesson ? () => exit("/lessons/" + nextLesson.id) : undefined}
            />
            {getScenarioSet(lesson.id) && <ScenarioResponse lessonId={lesson.id} />}
          </>
        ) : (
          /* ─── Pre-lesson overview ─── */
          <div className="space-y-6">
            <Card variant="elevated">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <JeffMascot size="sm" />
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4" /> {lesson.duration} min lesson
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <Coins className="w-4 h-4 text-gold" /> Right answers earn coins, wrong ones cost some.
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">{lesson.description}</p>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {["📖 Learn", "🧪 Apply", "✅ Master"].map((label, i) => (
                    <div key={i} className="text-center p-2 rounded-lg bg-muted/50 border border-border">
                      <span className="text-xs text-muted-foreground">{label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {resumable ? (
              <div className="text-center space-y-3">
                <Button
                  size="lg"
                  variant="hero"
                  onClick={continueRun}
                  className="w-full h-16 text-lg font-bold rounded-2xl shadow-lg shadow-primary/30"
                >
                  Continue where you left off (step {currentStep} of {totalSteps}) <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
                <Button variant="ghost" size="lg" className="w-full text-muted-foreground" onClick={startFresh}>
                  <RotateCcw className="mr-2 w-4 h-4" /> Start over
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <Button
                  size="lg"
                  variant="hero"
                  onClick={startFresh}
                  className="w-full h-16 text-xl font-bold rounded-2xl shadow-lg shadow-primary/30"
                >
                  Start Mission <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
                <p className="text-sm text-muted-foreground mt-3">👆 Tap here to begin — 💬 Jeff will teach you this one in chat</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

// ─── The player: one mounted instance per run ───

interface LessonRunPlayerProps {
  lesson: Lesson
  run: LessonRun
  rh: LessonRunHandle
  previewMode: boolean
  onPreviewExit?: () => void
  exit: (to: string) => void
  user: UserProfile | null
  progress: LessonProgress | undefined
  openedAt: number
  contentConfidenceTier: string | null
  recentQuestionIds: string[]
  abilityTheta: number | null
  nextLesson: Lesson | null
}

function LessonRunPlayer({
  lesson,
  run,
  rh,
  previewMode,
  onPreviewExit,
  exit,
  user,
  progress,
  openedAt,
  contentConfidenceTier,
  recentQuestionIds,
  abilityTheta,
  nextLesson,
}: LessonRunPlayerProps) {
  const { updateLessonProgress, earnJeffs, awardJeffs } = useApp()

  // Reshuffles the GENERATED question selection on a genuine mastery retry
  // (fail → recap → retry) and the reinforcement round. Rereading with Jeff
  // deliberately does NOT bump it: nothing remounts, nothing regenerates.
  const [regenerationCount, setRegenerationCount] = useState(0)

  // Always use structured content - hand-written or generated.
  // On mastery-check retries (regenerationCount > 0), getStructuredContent
  // keeps hand-written sections and the AP quiz overlay intact and only
  // varies GENERATED question selection; the shuffle below re-randomizes
  // option order for everyone because this memo re-runs.
  const structuredContent: StructuredLessonContent | null = useMemo(() => {
    // Prefer the live per-topic ability (theta) over the coarse account-wide
    // literacyLevel: a theta above/below a neutral band pulls the hard/remedial
    // pool. Cold start (no theta yet) falls back to literacyLevel.
    const effectiveTier: MasteryTier | null =
      abilityTheta == null ? (user?.literacyLevel ?? null)
      : abilityTheta > 0.5 ? "investor"
      : abilityTheta < -0.5 ? "explorer"
      : "builder"
    const raw = getStructuredContent(lesson.id, regenerationCount, contentConfidenceTier, recentQuestionIds, effectiveTier)
    if (!raw) return null

    // Guessability guard: authored questions often have the correct answer
    // written as the longest option - a tell no amount of position-shuffling
    // can hide. For each quiz question: (1) trim trailing elaboration off
    // standout-long options, and (2) if it STILL fails the length/quality
    // checks, swap in a clean unused question from this lesson's quiz pool.
    const pool = effectiveTier
      ? getQuizForLessonByTier(lesson.id, tierDifficulty(effectiveTier))
      : getQuizForLesson(lesson.id)
    const usedIds = new Set<string>()
    raw.sections.forEach(s => {
      if (s.type === "micro-check" || s.type === "mastery-check") s.questions.forEach(q => usedIds.add(q.id))
      if (s.type === "applied-question") usedIds.add(s.question.id)
    })
    const deBias = (q: QuizQuestion): QuizQuestion => {
      const normalized = normalizeOptionLengths(q)
      if (questionPassesQualityChecks(normalized)) return normalized
      const substitute = pool.find(p => !usedIds.has(p.id) && questionPassesQualityChecks(normalizeOptionLengths(p)))
      if (substitute) {
        usedIds.add(substitute.id)
        return normalizeOptionLengths(substitute)
      }
      return normalized // no clean replacement available - trimmed original beats nothing
    }

    // Retry variety: a mastery-check pool no larger than requiredCorrect means
    // a student who fails re-sees the EXACT same questions. Build a supplemental
    // bank from this lesson's OWN already-authored questions - the micro-check
    // + applied questions, then any unused quiz-pool questions - so every
    // mastery-check has room to rotate to fresh questions on a retry.
    const masteryIds = new Set<string>()
    raw.sections.forEach(s => { if (s.type === "mastery-check") s.questions.forEach(q => masteryIds.add(q.id)) })
    const supplemental: QuizQuestion[] = []
    const suppSeen = new Set<string>()
    const addSupp = (q: QuizQuestion) => {
      if (masteryIds.has(q.id) || suppSeen.has(q.id)) return
      const norm = normalizeOptionLengths(q)
      if (!questionPassesQualityChecks(norm)) return
      suppSeen.add(q.id)
      supplemental.push(norm)
    }
    raw.sections.forEach(s => {
      if (s.type === "micro-check") s.questions.forEach(addSupp)
      if (s.type === "applied-question") addSupp(s.question)
    })
    pool.forEach(addSupp)

    // Process all question sections through the MCQ engine for balanced positions & length normalization
    const processedSections = raw.sections.map(section => {
      if (section.type === "micro-check") {
        return { ...section, questions: shuffleQuestionSet(section.questions.map(deBias)) }
      }
      if (section.type === "applied-question") {
        const [processed] = shuffleQuestionSet([deBias(section.question)])
        return { ...section, question: processed }
      }
      if (section.type === "mastery-check") {
        const base = section.questions.map(deBias)
        // lockQuestions: show exactly the authored set, no supplemental padding.
        if (section.lockQuestions) {
          return { ...section, questions: shuffleQuestionSet(base) }
        }
        // Enough questions to SERVE 5 per attempt (the mastery renderer's serve
        // count) plus headroom so retries can rotate to unseen questions.
        const target = Math.max(section.requiredCorrect, 5) + 3
        const baseIds = new Set(base.map(q => q.id))
        const extras = supplemental.filter(q => !baseIds.has(q.id)).slice(0, Math.max(0, target - base.length))
        return { ...section, questions: shuffleQuestionSet([...base, ...extras]) }
      }
      return section
    })
    return { ...raw, sections: processedSections }
  }, [lesson, regenerationCount, contentConfidenceTier, recentQuestionIds, user?.literacyLevel, abilityTheta])

  // ─── Per-run UI state (everything durable lives in `run`) ───
  // "Chat with Jeff" replaces the paragraph reading. Opens straight away for a
  // run whose chat isn't done yet (a resumed chat picks up where it left off).
  const [chatOpen, setChatOpen] = useState(!run.chatDone && !previewMode)
  // Reread with Jeff from a failed mastery check: a review overlay over the
  // SAME run. While it is open the mastery walk is unmounted (no timer runs);
  // closing it lands straight back on the mastery check.
  const [rereading, setRereading] = useState(false)
  // Another tab finished this lesson while this run was in progress.
  const [finishedElsewhere, setFinishedElsewhere] = useState(false)
  // "Make It Stick" reflection - after mastery, before the completion screen.
  const [pendingMastery, setPendingMastery] = useState<{ correct: number; attempts: number; attemptSessionId: string; tier: string | null } | null>(null)
  const [reflectionText, setReflectionText] = useState("")
  const [savingReflection, setSavingReflection] = useState(false)
  const [reflectionDone, setReflectionDone] = useState(false)
  // Mastery confidence pacing: brief check-in while mastery-score is scored,
  // and - for a fragile/needs-support result - one capped reinforcement
  // round before the student moves on regardless of that round's outcome.
  const [checkingMastery, setCheckingMastery] = useState(false)
  const [pendingReinforcement, setPendingReinforcement] = useState<{ correct: number; attempts: number } | null>(null)
  const [confidenceRoundUsed, setConfidenceRoundUsed] = useState(false)
  const finishingRef = useRef(false)

  const lessonFinished = !!run.finishedAt
  const reflectionPrompt = getReflectionPrompt(lesson.id, lesson.category)
  const reflectionWords = reflectionText.trim().split(/\s+/).filter(Boolean).length
  // Repetitive / mashed-letter filler: block submit and show an inline nudge
  // (instead of the old self-dismissing toast that a student could miss).
  const reflectionLowEffort = looksLowEffort(reflectionText)
  // Lessons with a definition-practice override replace the post-mastery
  // reflection with a mandatory "Define These Key Terms" card (same gate).
  const definitionPractice = getDefinitionPractice(lesson.id)

  const sections = structuredContent?.sections ?? []

  // Concept sections are TEACHING material, delivered by Jeff in the chat - the
  // interactive walk is everything except concept sections. Teacher preview
  // walks EVERY section, concept (teaching) sections included.
  const walkSections = previewMode ? sections : sections.filter(s => s.type !== "concept")
  const currentSectionIdx = Math.max(0, Math.min(run.sectionIndex, Math.max(0, walkSections.length - 1)))

  // DEV-ONLY shortcut: /lessons/<id>?dev=mastery drops you straight onto the
  // mastery-check quiz, skipping Jeff's chat and the practice walk.
  useEffect(() => {
    if (!import.meta.env.DEV) return
    const jump = new URLSearchParams(window.location.search).get("dev")
    if (jump !== "mastery") return
    const masteryIdx = walkSections.findIndex(s => s.type === "mastery-check")
    if (masteryIdx === -1) return
    setChatOpen(false)
    rh.markChatDone()
    rh.advanceSection(masteryIdx)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson.id])

  // ─── Answer keys for the run record ───
  // The quiz components don't know about the run; the provider asks us which
  // run key an answer belongs to. Sections answer their questions in order
  // from a fresh mount, so "the n-th answer since this section mounted" maps
  // to a question id exactly; mastery uses the last question it served us.
  const sectionAnswerCountRef = useRef(0)
  const lastMasteryAskedRef = useRef<string | null>(null)
  useEffect(() => {
    sectionAnswerCountRef.current = 0
  }, [currentSectionIdx, regenerationCount, run.masteryAttempt.sessionId])

  const resolveAnswer = (ctx: AnswerContext | undefined): { key: string; source: "walk" | "mastery" } => {
    const live = rh.getRun() ?? run
    const idx = Math.max(0, Math.min(live.sectionIndex, Math.max(0, walkSections.length - 1)))
    const section = walkSections[idx]
    const n = sectionAnswerCountRef.current++
    if (section?.type === "mastery-check") {
      const qid = ctx?.questionId ?? lastMasteryAskedRef.current ?? `#${n}`
      return { key: `${masteryKeyPrefix(live.masteryAttempt.sessionId)}${qid}`, source: "mastery" }
    }
    if (ctx?.questionId) return { key: `s${idx}:${ctx.questionId}`, source: "walk" }
    switch (section?.type) {
      case "micro-check": {
        const q = section.questions[Math.min(n, section.questions.length - 1)]
        return { key: `s${idx}:${q?.id ?? `#${n}`}`, source: "walk" }
      }
      case "applied-question":
        return { key: `s${idx}:${section.question.id}`, source: "walk" }
      case "activity-check":
        return { key: `s${idx}:activity`, source: "walk" }
      default:
        return { key: `s${idx}:#${n}`, source: "walk" }
    }
  }

  const runBridge: QuizRunBridge = {
    resolveAnswer,
    recordAnswer: rh.recordAnswer,
    coinsGained: rh.coinsGained,
    coinsLost: rh.coinsLost,
    answeredTotal: rh.answeredTotal,
    answeredCorrect: rh.answeredCorrect,
  }

  // In-chat quick checks pay through the run record too, so a remount can't
  // pay twice and the completion receipt equals the record. Paid at face value
  // (awardJeffs) so the receipt matches the balance change exactly.
  const payQuickCheck = (amount: number, reason: string, key: string) => {
    if (previewMode) return
    const fresh = rh.recordAnswer(key, { correct: true, coins: amount, timedOut: false, source: "quickcheck" })
    if (fresh) awardJeffs(amount, reason)
  }

  if (!structuredContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Lesson not found</h2>
          <Button onClick={() => exit("/lessons")}>Back to Missions</Button>
        </div>
      </div>
    )
  }

  // Deep (academic-course) lessons ground the live Jeff chat in the authored
  // curriculum so it teaches the real material in depth instead of improvising
  // from the title. Assemble that source text from the concept sections.
  const deepLesson = isDeepLesson(lesson)
  const conceptSource = sections
    .flatMap(s => (s.type === "concept" ? [s] : []))
    .map(c => [c.title, ...c.paragraphs, c.realWorldExample ? `Example: ${c.realWorldExample}` : ""].filter(Boolean).join("\n"))
    .join("\n\n")

  // Every topic the student will be quizzed on, from the question concept tags.
  const mustCoverTopics = Array.from(new Set(
    sections.flatMap(s => {
      if (s.type === "micro-check" || s.type === "mastery-check") return s.questions.map(q => q.concept)
      if (s.type === "applied-question") return [s.question.concept]
      return []
    }).filter((c): c is string => !!c)
  )).map(c => c.replace(/-/g, " "))

  // Mid-run progress writes (percent only). Never on a retake of a completed
  // lesson (updateLessonProgress is monotonic anyway) and never in preview.
  const writePercent = (percent: number) => {
    if (run.completedAtStart || previewMode) return
    updateLessonProgress(lesson.id, false, undefined, percent)
  }

  // The Jeff chat teaches all the concept material - after it, students go
  // straight into the interactive walk (which contains no concept sections).
  const handleChatQuizReady = () => {
    setChatOpen(false)
    rh.markChatDone()
    // Record "content viewed" (not completed yet), seeding the section-0
    // percentage so the teacher sees them as started.
    if (walkSections.length > 0) writePercent(Math.round((1 / walkSections.length) * 100))
    window.scrollTo({ top: 0 })
  }

  // ─── Handlers ───
  const handleSectionContinue = () => {
    if (currentSectionIdx < walkSections.length - 1) {
      const nextIdx = currentSectionIdx + 1
      rh.advanceSection(nextIdx)
      // Persist how far the student has gotten so the teacher dashboard can show
      // a live progress bar.
      if (walkSections.length > 0) writePercent(Math.round(((nextIdx + 1) / walkSections.length) * 100))
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Mastery confidence pacing is read-only advice on top of the pass/fail
  // gate - a cold start, timeout, or function error just means no tier came
  // back. Never let this call block or break lesson completion.
  const withTimeout = <T,>(p: PromiseLike<T>, ms = 4000): Promise<T | null> =>
    new Promise((resolve) => {
      const timer = setTimeout(() => resolve(null), ms)
      Promise.resolve(p).then((v) => { clearTimeout(timer); resolve(v) }, () => { clearTimeout(timer); resolve(null) })
    })

  // THE finish write. One call, carrying the whole-lesson accuracy from the
  // run record (every walk + mastery answer, failed attempts included) and the
  // mastery-check accuracy. If another tab completed this lesson since the run
  // began, nothing is written and the student is told instead.
  const finishLesson = async () => {
    if (finishingRef.current) return
    finishingRef.current = true
    const snapshot = rh.getRun() ?? run
    rh.finish()
    if (previewMode) return // preview: no lesson_progress completion, no analytics
    clearChat(lesson.id) // the conversation belonged to this run; a later visit is a replay or a fresh retake
    logEvent("lesson_completed", { lessonId: lesson.id, completedPercent: 100, timeSpent_ms: Date.now() - openedAt })
    const whole = wholeLessonAccuracyOf(snapshot) ?? 100
    const mastery = masteryAccuracyOf(snapshot) ?? undefined
    if (!snapshot.completedAtStart && user?.id && !DEV_LOCAL_BYPASS) {
      const res = await withTimeout(
        supabase.from("lesson_progress").select("completed").eq("user_id", user.id).eq("lesson_id", lesson.id).maybeSingle()
      )
      if (res && !res.error && res.data?.completed) {
        setFinishedElsewhere(true)
        return
      }
    }
    updateLessonProgress(lesson.id, true, whole, undefined, mastery)
    // No flat completion reward - coins are earned per question. The only
    // completion-time bonus is the optional reflection, awarded on submit.
  }

  const evaluateMastery = async (correct: number, attempts: number, attemptSessionId: string) => {
    setCheckingMastery(true)
    let tier: string | null = null
    // The mastery-score edge function needs a real session; in the DEV bypass
    // it 401s. Skip it there and treat the tier as unknown (null).
    const result = DEV_LOCAL_BYPASS ? null : await withTimeout(
      supabase.functions.invoke("mastery-score", {
        body: { topicId: lesson.category, attemptSessionId, source: "lesson_quiz" },
      })
    )
    if (result && !result.error && result.data && !(result.data as any).error) {
      tier = (result.data as any).confidenceTier ?? null
    }
    setCheckingMastery(false)

    // Fragile/needs-support gets exactly one extra reinforcement round, then
    // proceeds regardless of what that round scores - no unbounded retries.
    if ((tier === "fragile_confidence" || tier === "needs_support") && !confidenceRoundUsed) {
      setConfidenceRoundUsed(true)
      setPendingReinforcement({ correct, attempts })
      return
    }
    setPendingMastery({ correct, attempts, attemptSessionId, tier })
  }

  const handleMasteryComplete = (correct: number, attempts: number, attemptSessionId: string) => {
    // Close the passing attempt in the run record (mastery accuracy) and open
    // a fresh chain in case a reinforcement round follows.
    rh.endMasteryAttempt({ passed: true, restart: false })
    // First-time completions write a "Make It Stick" reflection before the
    // rewards screen; retakes skip straight to the finish. Preview skips the
    // mastery-score edge function and the reflection/definition gate too.
    if (run.completedAtStart || previewMode) { void finishLesson(); return }
    window.scrollTo({ top: 0, behavior: "smooth" })
    evaluateMastery(correct, attempts, attemptSessionId)
  }

  const handleReinforcementContinue = () => {
    // Straight back into the mastery check - the student already passed, so
    // there's no reason to re-walk the recap first. The fresh attempt chain
    // (attempt 1, new session id) was opened by handleMasteryComplete.
    setPendingReinforcement(null)
    setRegenerationCount(prev => prev + 1)
    const masteryIdx = walkSections.findIndex(s => s.type === "mastery-check")
    if (masteryIdx !== -1) rh.advanceSection(masteryIdx)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleReflectionSubmit = async () => {
    if (!pendingMastery || reflectionWords < MIN_REFLECTION_WORDS || savingReflection) return
    // The button is disabled while the text looks low-effort; this is a silent
    // safety net (no toast) so a stray submit can't slip a junk reflection past.
    if (looksLowEffort(reflectionText)) return
    setSavingReflection(true)
    try {
      if (user?.id && !DEV_LOCAL_BYPASS && !previewMode) {
        await (supabase as any).from("lesson_reflections").upsert(
          {
            user_id: user.id,
            lesson_id: lesson.id,
            prompt: reflectionPrompt,
            response: reflectionText.trim(),
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id,lesson_id" }
        )
      }
    } catch { /* never block lesson completion on a save hiccup */ }
    setSavingReflection(false)
    if (!previewMode) earnJeffs(REFLECTION_BONUS, `Reflection journal: ${lesson.title}`)
    setReflectionDone(true)
    void finishLesson()
  }

  // Definition-practice equivalent of handleReflectionSubmit: it gates the same
  // pendingMastery → finish transition. Purely practice, so it never touches the
  // mastery score; it awards the same completion bonus as a reflection.
  const handleDefinitionComplete = () => {
    if (!pendingMastery) return
    if (!previewMode) earnJeffs(REFLECTION_BONUS, `Definition practice: ${lesson.title}`)
    setReflectionDone(true)
    void finishLesson()
  }

  const handleMasteryFail = () => {
    // A genuine restart of the same failed attempt chain - the attempt number
    // retry_factor reads goes up, on a fresh session id. Regenerate questions.
    rh.endMasteryAttempt({ passed: false, restart: true })
    setRegenerationCount(prev => prev + 1)
    const recapIdx = walkSections.findIndex(s => s.type === "recap")
    if (recapIdx !== -1) rh.advanceSection(recapIdx)
  }

  // Same attempt bookkeeping as a fail, but instead of the recap the student
  // rereads Jeff's whole conversation in a review overlay, then comes straight
  // back to the mastery check (same run, same section - never section 0).
  const handleMasteryReread = () => {
    rh.endMasteryAttempt({ passed: false, restart: true })
    setRereading(true)
    window.scrollTo({ top: 0 })
  }
  const backToMastery = () => {
    setRereading(false)
    window.scrollTo({ top: 0 })
  }

  // Retake the entire lesson from the top: wipe the saved Jeff conversation and
  // start a new run. The player is keyed on the run id, so React remounts
  // every piece of lesson state fresh - nothing to reset by hand.
  const handleRetake = () => {
    if (!previewMode) clearChat(lesson.id)
    rh.startNewRun({ completedAtStart: true, chatDone: previewMode })
    window.scrollTo({ top: 0 })
  }

  // The post-mastery "Make It Stick" reflection and the finish screen aren't
  // section steps, so a raw section index stalls the header at e.g. 5/6. Once
  // the student is in the reflection/finish phase, show the bar as complete.
  const inFinalPhase = lessonFinished || reflectionDone || !!pendingMastery || checkingMastery
  const displayStep = inFinalPhase ? walkSections.length : currentSectionIdx + 1

  const renderSection = (section: LessonSection, idx: number) => {
    switch (section.type) {
      case "concept":
        return <ConceptRenderer key={idx} section={section} onContinue={handleSectionContinue} />
      case "micro-check":
        return <MicroCheckRenderer key={idx} section={section} onContinue={handleSectionContinue} />
      case "activity-check":
        return <ActivityCheckRenderer key={idx} section={section} onContinue={handleSectionContinue} />
      case "interactive-diagram":
        return <DiagramRenderer key={idx} section={section} onContinue={handleSectionContinue} />
      case "scenario":
        return <ScenarioRenderer key={idx} section={section} onContinue={handleSectionContinue} />
      case "applied-question":
        return <AppliedQuestionRenderer key={idx} section={section} onContinue={handleSectionContinue} />
      case "recap":
        return <RecapRenderer key={idx} section={section} onContinue={handleSectionContinue} />
      case "mastery-check":
        return (
          <MasteryCheckRenderer
            // Keyed on the attempt session id: every new attempt (retry,
            // reread, reinforcement round) mounts a fresh instance even when
            // the section index doesn't change.
            key={`mastery-${idx}-${run.masteryAttempt.sessionId}`}
            section={section}
            topicId={lesson.category}
            lessonId={lesson.id}
            attemptSessionId={run.masteryAttempt.sessionId}
            sessionAttemptNumber={run.masteryAttempt.attemptNumber}
            previouslyAsked={run.askedQuestionIds}
            onAsked={(qid) => { lastMasteryAskedRef.current = qid; rh.noteAsked(qid) }}
            onComplete={handleMasteryComplete}
            onFail={handleMasteryFail}
            onReread={!previewMode ? handleMasteryReread : undefined}
          />
        )
      default:
        return null
    }
  }

  return (
    <HintProvider key={run.runId} total={2}>
    <QuizSessionProvider lessonId={lesson.id} concept={lesson.category} previewMode={previewMode} run={runBridge}>
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <LessonHeader
        lesson={lesson}
        previewMode={previewMode}
        onPreviewExit={onPreviewExit}
        showBack={lessonFinished}
        showExit={!lessonFinished && !previewMode}
        onLeave={() => exit("/lessons")}
        step={!lessonFinished ? { current: displayStep, total: walkSections.length } : null}
      />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Teacher preview: jump anywhere in the lesson without playing through. */}
        {previewMode && (
          <div className="mb-6">
            <PreviewSectionNav
              sections={walkSections}
              currentIdx={lessonFinished ? walkSections.length : currentSectionIdx}
              onJump={(i) => {
                // A finished preview run can't be un-finished: start a fresh one
                // and land on the chosen section.
                if (lessonFinished) rh.startNewRun({ completedAtStart: false, chatDone: true })
                rh.advanceSection(i)
                window.scrollTo({ top: 0 })
              }}
            />
          </div>
        )}
        {previewMode && lessonFinished ? (
          /* ─── Preview finish: no completion screen (it awards + persists) ─── */
          <PreviewCompleteCard
            correct={rh.answeredCorrect}
            total={rh.answeredTotal}
            onRestart={handleRetake}
            onExit={onPreviewExit}
          />
        ) : finishedElsewhere ? (
          /* ─── Another tab completed this lesson first ─── */
          <Card variant="elevated">
            <CardContent className="p-8 text-center space-y-4">
              <JeffMascot size="sm" />
              <h2 className="text-xl font-bold">Finished in another tab</h2>
              <p className="text-muted-foreground">
                This lesson was already completed in another tab, so this run's score wasn't written over it.
                The coins you earned here are already in your balance.
              </p>
              <Button size="lg" className="font-bold" onClick={() => exit("/lessons?category=" + lesson.category)}>
                Back to missions <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ) : checkingMastery ? (
          /* ─── Brief check-in while mastery-score scores the attempt ─── */
          <Card variant="elevated">
            <CardContent className="p-8 text-center space-y-4">
              <JeffMascot size="sm" />
              <p className="text-sm text-muted-foreground animate-pulse">Checking in on that…</p>
            </CardContent>
          </Card>
        ) : pendingReinforcement ? (
          /* ─── Honest, non-fail-framed nudge for a fragile/needs-support pass ─── */
          <Card variant="elevated">
            <CardContent className="p-8 text-center space-y-4">
              <JeffMascot size="sm" />
              <h2 className="text-xl font-bold">Nice, you passed! 🎯</h2>
              <p className="text-muted-foreground">
                Let's lock it in with one more round before we move on.
              </p>
              <p className="text-xs text-muted-foreground">One quick round, then you're done - promise.</p>
              <Button size="lg" className="font-bold" onClick={handleReinforcementContinue}>
                Let's go <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ) : pendingMastery && !lessonFinished && definitionPractice ? (
          /* ─── Mandatory "Define These Key Terms" card (replaces reflection) ─── */
          <DefinitionPracticeCard
            definition={definitionPractice}
            onComplete={handleDefinitionComplete}
          />
        ) : pendingMastery && !lessonFinished ? (
          /* ─── "Make It Stick" reflection - apply the lesson to your own life ─── */
          <Card variant="elevated">
            <CardContent className="p-6 md:p-8 space-y-5">
              <div className="flex items-start gap-4">
                <JeffMascot size="sm" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary">Make it stick</p>
                  <h2 className="text-xl font-bold mt-0.5">Nice - you passed! Now make it yours.</h2>
                  {pendingMastery.tier === "high_confidence" && (
                    <p className="text-xs font-semibold text-primary mt-1">
                      🔥 Crushing this one - expect a tougher round next time.
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">
                    Learning sticks when you put it in your own words and make a real plan.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
                <p className="text-sm font-semibold leading-relaxed">{reflectionPrompt}</p>
              </div>

              <div>
                <Textarea
                  value={reflectionText}
                  onChange={(e) => setReflectionText(e.target.value)}
                  placeholder="Write your plan in your own words…"
                  rows={5}
                  className="resize-none text-[15px]"
                  autoFocus
                />
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs font-semibold ${reflectionWords >= MIN_REFLECTION_WORDS ? "text-success" : "text-muted-foreground"}`}>
                    {reflectionWords} / {MIN_REFLECTION_WORDS} words {reflectionWords >= MIN_REFLECTION_WORDS && "✓"}
                  </span>
                  <span className="text-xs font-bold text-gold flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5" /> +{REFLECTION_BONUS} bonus
                  </span>
                </div>
                {reflectionText.trim() && reflectionLowEffort && (
                  <p className="text-xs font-semibold text-destructive mt-1.5">
                    Looks repetitive — write it in your own words.
                  </p>
                )}
              </div>

              <Button
                size="lg"
                className="w-full font-bold"
                disabled={reflectionWords < MIN_REFLECTION_WORDS || reflectionLowEffort || savingReflection}
                onClick={handleReflectionSubmit}
              >
                {savingReflection ? "Saving…" :
                  reflectionWords < MIN_REFLECTION_WORDS
                    ? `Write ${MIN_REFLECTION_WORDS - reflectionWords} more ${MIN_REFLECTION_WORDS - reflectionWords === 1 ? "word" : "words"} to finish`
                    : "Lock it in & finish mission"}
                {reflectionWords >= MIN_REFLECTION_WORDS && !savingReflection && <ArrowRight className="ml-2 w-4 h-4" />}
              </Button>
            </CardContent>
          </Card>
        ) : lessonFinished ? (
          /* ─── Completion screen: whole-lesson accuracy + the run's coin receipt ─── */
          <>
            <LessonCompletionScreen
              correct={rh.answeredCorrect}
              attempts={rh.answeredTotal}
              storedQuizScore={progress?.quizScore}
              reflectionDone={reflectionDone}
              reflectionBonus={REFLECTION_BONUS}
              onContinue={() => exit("/lessons?category=" + lesson.category)}
              onRetake={handleRetake}
              nextTitle={nextLesson?.title}
              onNext={nextLesson ? () => exit("/lessons/" + nextLesson.id) : undefined}
            />
            {/* Optional, ungraded scenario writing (teacher-review only). */}
            {getScenarioSet(lesson.id) && <ScenarioResponse lessonId={lesson.id} />}
          </>
        ) : rereading || chatOpen ? (
          /* The interactive walk is unmounted whenever a full-screen Jeff
             overlay is up - the teaching chat (chatOpen) or the reread review
             (rereading) - so no question's countdown timer runs behind it and
             auto-fails a micro-check the student hasn't even seen yet. */
          null
        ) : (
          /* ─── Active section rendering (interactive walk, no concept steps) ─── */
          <div className="space-y-6">
            {walkSections[currentSectionIdx] && renderSection(walkSections[currentSectionIdx], currentSectionIdx)}
          </div>
        )}
      </main>

      {/* ─── Chat with Jeff: the conversational lesson (replaces reading) ─── */}
      {chatOpen && !previewMode && (
        <JeffChat
          lesson={lesson}
          // Offline/no-credits fallback: Jeff teaches the lesson's own
          // concept content as a scripted chat instead of erroring.
          script={buildScript(sections, deepLesson)}
          // Grounds the live AI in the lesson's authored concept content so
          // Jeff teaches the same material the quiz is written from.
          source={conceptSource || undefined}
          // Forces Jeff to teach every topic the quiz will test.
          mustCover={mustCoverTopics.length ? mustCoverTopics : undefined}
          onQuizReady={handleChatQuizReady}
          onCoins={payQuickCheck}
          // Exit leaves the lesson entirely. JeffChat persists the conversation
          // per-lesson and the run persists its step, so returning resumes.
          onClose={() => exit("/lessons")}
        />
      )}

      {/* ─── Reread with Jeff: the full transcript, then back to the mastery check ─── */}
      {rereading && !previewMode && (
        <JeffChat
          lesson={lesson}
          script={buildScript(sections, deepLesson)}
          source={conceptSource || undefined}
          mustCover={mustCoverTopics.length ? mustCoverTopics : undefined}
          reviewMode
          onCoins={payQuickCheck}
          onQuizReady={backToMastery}
          onClose={backToMastery}
        />
      )}
    </div>
    </QuizSessionProvider>
    </HintProvider>
  )
}
