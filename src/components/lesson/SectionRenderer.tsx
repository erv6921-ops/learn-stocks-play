import React, { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useJeff } from "@/contexts/JeffContext"
import { useApp } from "@/contexts/AppContext"
import { supabase } from "@/integrations/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ConceptSection,
  MicroCheckSection,
  ScenarioSection,
  AppliedQuestionSection,
  RecapSection,
  MasteryCheckSection,
  QuizQuestion,
} from "@/types"
import {
  BookOpen,
  Check,
  CheckCircle,
  XCircle,
  ArrowRight,
  Lightbulb,
  Target,
  ListChecks,
  BrainCircuit,
  FileQuestion,
  Snowflake,
} from "lucide-react"
import { toast } from "sonner"
import { HighlightedText } from "@/lib/highlightTerms"
import { DEV_LOCAL_BYPASS } from "@/lib/devBypass"
import { useHints } from "@/components/lesson/HintContext"
import { useQuizSession } from "@/components/lesson/QuizSessionContext"
import CoinBurst from "@/components/gamification/CoinBurst"
// shuffleQuestion import removed - shuffling is handled upstream in LessonDetail

// Minimum seconds allowed per quiz question before it's auto-marked wrong.
const QUESTION_TIME = 15

// The real per-question budget scales up with how much text there is to read
// (~1s per 13 characters of question + all options — a comfortable teen
// reading pace), floored at QUESTION_TIME and capped so it never drags. This
// keeps the speed-bonus tension while making the first, wordy, full-sentence
// questions fair — a student is never timed out mid-read.
function questionSeconds(q: QuizQuestion): number {
  const chars = q.question.length + q.options.reduce((sum, o) => sum + o.length, 0)
  return Math.min(40, Math.max(QUESTION_TIME, Math.ceil(chars / 13)))
}

// Coins to freeze the countdown for the current question (a power-up).
const FREEZE_COST = 100

// ─── Quiz Answer Component (shared by Micro Check, Applied Question, Mastery) ───

interface QuizAnswerProps {
  question: QuizQuestion
  onCorrect: () => void
  onIncorrect: () => void
  onContinue: () => void
  showContinue: boolean
  // Coins gained on a right answer / lost on a wrong one. Defaults to 50;
  // the low-stakes micro-check passes 25.
  coins?: number
  // Optional - only the Mastery Engine's write path (MasteryCheckRenderer)
  // wires this. Micro-check and applied-question are formative practice,
  // not the assessment of mastery, so they never log to question_attempts.
  onAnswered?: (isCorrect: boolean, responseTimeMs: number) => void
}

function QuizAnswer({ question, onCorrect, onIncorrect, onContinue, showContinue, coins = 50, onAnswered }: QuizAnswerProps) {
  // Questions are already shuffled & validated by the MCQ engine in LessonDetail - use as-is
  const shuffledQ = question
  // Per-question countdown budget, scaled to reading length (see questionSeconds).
  const questionMs = questionSeconds(shuffledQ) * 1000
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  // Wrong options this question's hints have crossed out.
  const [eliminated, setEliminated] = useState<number[]>([])
  // Time-freeze power-up: once bought, the countdown for this question stops.
  const [frozen, setFrozen] = useState(false)
  const hints = useHints()
  const session = useQuizSession()
  const { jeffsBalance, spendJeffs } = useApp()

  // ── Gamification: coin-particle burst on a correct answer ──
  const [burstId, setBurstId] = useState(0)

  // ── Countdown timer (15s per question) ──
  const [remainingMs, setRemainingMs] = useState(questionMs)
  const intervalRef = useRef<ReturnType<typeof setInterval>>()
  // Mount time for THIS question - a fresh QuizAnswer instance is created
  // per question (parent passes key={question.id}), so these refs naturally
  // reset per question.
  const shownAtRef = useRef(Date.now())
  // Guards against double-resolution (a click landing at the same tick the
  // timer hits zero) - whichever fires first wins.
  const resolvedRef = useRef(false)

  const handleTimeout = () => {
    if (resolvedRef.current) return
    resolvedRef.current = true
    clearInterval(intervalRef.current)
    setRevealed(true) // reveals the correct answer highlighted, no selection
    onAnswered?.(false, questionMs)
    session.registerWrong(coins) // −coins + toast
    onIncorrect()
  }

  // Fully (re)initialise for each question and start its countdown. Keyed on
  // the question id so this runs whether the component remounted (new key) OR
  // was reused with a new question prop - either way the speed timer, guards
  // and answer state all reset, so every question behaves like the first.
  useEffect(() => {
    resolvedRef.current = false
    shownAtRef.current = Date.now()
    setSelected(null)
    setRevealed(false)
    setEliminated([])
    setFrozen(false)
    setRemainingMs(questionMs)

    intervalRef.current = setInterval(() => {
      const rem = Math.max(0, questionMs - (Date.now() - shownAtRef.current))
      setRemainingMs(rem)
      if (rem <= 0) handleTimeout()
    }, 200)
    return () => clearInterval(intervalRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuffledQ.id])

  const handleSelect = (idx: number) => {
    if (resolvedRef.current || revealed || eliminated.includes(idx)) return
    resolvedRef.current = true
    clearInterval(intervalRef.current) // pause the timer on answer
    const responseMs = Date.now() - shownAtRef.current
    setSelected(idx)
    setRevealed(true)
    const isRight = idx === shuffledQ.correctAnswer
    onAnswered?.(isRight, responseMs)
    if (isRight) {
      session.registerCorrect(coins, responseMs) // +coins by speed tier + toast
      setBurstId(b => b + 1)
      onCorrect()
    } else {
      session.registerWrong(coins) // −coins + toast
      onIncorrect()
    }
  }

  // Cap eliminations so at least two options (incl. the correct one) always
  // remain - a hint narrows the field, it never hands over the answer.
  const maxEliminations = Math.max(0, shuffledQ.options.length - 2)
  const canHint = !!hints && hints.hintsLeft > 0 && eliminated.length < maxEliminations && !revealed

  const takeHint = () => {
    if (!hints || hints.hintsLeft <= 0) return
    const wrong = shuffledQ.options
      .map((_, i) => i)
      .find(i => i !== shuffledQ.correctAnswer && !eliminated.includes(i))
    if (wrong === undefined) return
    if (hints.spendHint()) setEliminated(prev => [...prev, wrong])
  }

  // Spend coins to stop the countdown for this question. Resets next question.
  const canFreeze = !frozen && !revealed
  const freezeTime = () => {
    if (frozen || revealed) return
    if (!spendJeffs(FREEZE_COST, "Time freeze power-up")) {
      toast.error("Not enough InvestiCoins", { description: `Time Freeze costs ${FREEZE_COST} coins.` })
      return
    }
    setFrozen(true)
    clearInterval(intervalRef.current) // stop the countdown; it can't hit zero now
    toast.error(`−${FREEZE_COST} coins`, { description: "Time frozen ❄️ — take your time." })
  }

  const isCorrect = selected === shuffledQ.correctAnswer

  // Timer bar geometry & colour: green >8s, yellow 4-8s, red <4s.
  const secsLeft = Math.ceil(remainingMs / 1000)
  const timerColor =
    remainingMs > 8000
      ? "hsl(var(--success))"
      : remainingMs > 4000
      ? "hsl(var(--warning))"
      : "hsl(var(--destructive))"
  const timerPct = (remainingMs / (questionMs)) * 100
  // A frozen timer reads as calm sky-blue and stops draining.
  const barColor = frozen ? "hsl(199 89% 48%)" : timerColor

  // Combo pill state, derived from the shared session.
  const combo = session.combo
  const comboPill =
    session.lostCombo != null
      ? { text: "Combo lost!", broken: true as const, pulse: undefined }
      : combo >= 10
      ? { text: "10x COMBO 🚀", broken: false as const, pulse: 0.6 }
      : combo >= 5
      ? { text: "5x COMBO ⚡", broken: false as const, pulse: 1 }
      : combo >= 3
      ? { text: "3x COMBO 🔥", broken: false as const, pulse: undefined }
      : null

  return (
    <div className="space-y-3 relative">
      {/* Countdown timer bar. */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 h-2.5 rounded-full bg-muted overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: `${timerPct}%`,
              backgroundColor: barColor,
              transition: "width 0.2s linear, background-color 0.4s ease",
            }}
          />
        </div>
        {frozen ? (
          <span className="w-8 flex justify-end"><Snowflake className="w-4 h-4 text-sky-500" /></span>
        ) : (
          <span className="text-xs font-semibold tabular-nums w-8 text-right" style={{ color: barColor }}>
            {secsLeft}s
          </span>
        )}
      </div>

      {/* Combo banner (persists across questions while the streak lives). */}
      <AnimatePresence>
        {comboPill && (
          <motion.div
            key={comboPill.broken ? "broken" : comboPill.text}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              comboPill.pulse
                ? { opacity: 1, scale: [1, 1.05, 1] }
                : { opacity: 1, scale: 1 }
            }
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
            transition={
              comboPill.pulse
                ? { scale: { duration: comboPill.pulse, repeat: Infinity, ease: "easeInOut" } }
                : { duration: 0.2 }
            }
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
              comboPill.broken
                ? "bg-destructive/15 text-destructive"
                : "bg-emerald-900 text-amber-300"
            }`}
          >
            {comboPill.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question, with a checkmark badge that pops in on a correct answer. */}
      <div className="relative">
        <p className="font-semibold text-foreground text-base pr-12">{shuffledQ.question}</p>
        <AnimatePresence>
          {revealed && isCorrect && (
            <motion.div
              key="correct-check"
              className="absolute -top-1 right-0"
              initial={{ scale: 0, rotate: -25 }}
              animate={{ scale: [0, 1.35, 1], rotate: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              // NOTE: framer-motion only supports two keyframes with spring, so
              // the 3-keyframe "pop" (0 → 1.35 → 1) must use a tween. Keeping a
              // spring here throws "Only two keyframes currently supported…",
              // which aborts the page-level fade and blanks the next screen.
              transition={{
                scale: { type: "tween", duration: 0.4, ease: "easeOut", times: [0, 0.6, 1] },
                rotate: { type: "spring", stiffness: 320, damping: 13 },
              }}
            >
              <div className="relative w-10 h-10 rounded-full bg-success flex items-center justify-center shadow-md">
                <Check className="w-6 h-6 text-success-foreground" strokeWidth={3} />
                <CoinBurst burstKey={burstId} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-2">
        {shuffledQ.options.map((opt, i) => {
          const isSelected = selected === i
          const isRight = i === shuffledQ.correctAnswer
          const showGreen = revealed && isRight
          const showRed = revealed && isSelected && !isRight
          const isEliminated = !revealed && eliminated.includes(i)

          // A wrong pick gives the card a quick shake; everything else keeps the
          // original clean tinted-card styling.
          return (
            <motion.button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={revealed || isEliminated}
              animate={showRed ? { x: [0, -8, 8, -6, 6, 0] } : undefined}
              transition={{ duration: 0.4 }}
              className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-center gap-3 text-sm ${
                isEliminated
                  ? "border-border/60 bg-muted/40 text-muted-foreground line-through opacity-55"
                  : showGreen
                  ? "border-success bg-success/10 text-success"
                  : showRed
                  ? "border-destructive bg-destructive/10 text-destructive"
                  : isSelected
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              } ${revealed || isEliminated ? "cursor-default" : "cursor-pointer"}`}
            >
              {showGreen && <CheckCircle className="w-4 h-4 flex-shrink-0" />}
              {showRed && <XCircle className="w-4 h-4 flex-shrink-0" />}
              <span className="flex-1">{opt}</span>
              {isEliminated && <span className="text-[10px] font-semibold shrink-0">ruled out</span>}
            </motion.button>
          )
        })}
      </div>

      {/* Power-ups: hints (a shared per-lesson budget, each rules out a wrong
          answer) and Time Freeze (100 coins to stop this question's countdown). */}
      {!revealed && (
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {hints && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={!canHint}
                onClick={takeHint}
                className="gap-1.5"
              >
                <Lightbulb className={`w-3.5 h-3.5 ${hints.hintsLeft > 0 ? "text-amber-500" : "text-muted-foreground"}`} />
                {hints.hintsLeft > 0
                  ? `Hint · ${hints.hintsLeft} left`
                  : "No hints left"}
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!canFreeze || jeffsBalance < FREEZE_COST}
              onClick={freezeTime}
              className="gap-1.5"
              title={jeffsBalance < FREEZE_COST ? `Costs ${FREEZE_COST} coins` : undefined}
            >
              <Snowflake className={`w-3.5 h-3.5 ${frozen ? "text-sky-400" : jeffsBalance >= FREEZE_COST ? "text-sky-500" : "text-muted-foreground"}`} />
              {frozen ? "Time frozen" : `Time Freeze · ${FREEZE_COST}`}
            </Button>
          </div>
          {frozen ? (
            <span className="text-[11px] text-muted-foreground">❄️ Timer paused for this question</span>
          ) : hints && eliminated.length > 0 ? (
            <span className="text-[11px] text-muted-foreground">👀 Crossed out a wrong answer</span>
          ) : hints && hints.hintsLeft > 0 ? (
            <span className="text-[11px] text-muted-foreground">Stuck? A hint rules one out.</span>
          ) : null}
        </div>
      )}

      {revealed && (
        <div className={`p-4 rounded-lg ${isCorrect ? "bg-success/10 border border-success/20" : "bg-amber-500/10 border border-amber-500/20"}`}>
          <p className={`font-medium text-sm ${isCorrect ? "text-success" : "text-amber-600"}`}>
            {isCorrect ? "✓ Correct!" : "✗ Not quite right"}
          </p>
          {!isCorrect && (
            <div className="mt-2 space-y-2">
              <div className="bg-background/50 rounded-lg p-3">
                <p className="text-xs font-medium text-foreground flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" /> Why this matters:
                </p>
                <p className="text-xs text-muted-foreground mt-1">{shuffledQ.explanation}</p>
              </div>
              <p className="text-xs text-muted-foreground">
                ✅ Correct answer: <strong className="text-foreground">{shuffledQ.options[shuffledQ.correctAnswer]}</strong>
              </p>
            </div>
          )}
          {isCorrect && shuffledQ.explanation && (
            <p className="text-xs text-muted-foreground mt-1">{shuffledQ.explanation}</p>
          )}
        </div>
      )}

      {revealed && showContinue && (
        <div className="pt-2">
          <Button size="sm" onClick={onContinue}>
            Continue <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
          </Button>
        </div>
      )}
    </div>
  )
}

// ─── Section Components ───

export function ConceptRenderer({ section, onContinue }: { section: ConceptSection; onContinue: () => void }) {
  return (
    <Card variant="elevated" className="overflow-hidden">
      <div className="bg-primary/5 border-b border-border px-6 py-3 flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-primary" />
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Concept</span>
      </div>
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
        {section.paragraphs.map((p, i) => (
          <p key={i} className="text-sm text-muted-foreground leading-relaxed"><HighlightedText text={p} /></p>
        ))}
        {section.bullets && (
          <ul className="space-y-2 pl-1">
            {section.bullets.map((b, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><HighlightedText text={b} /></span>
              </li>
            ))}
          </ul>
        )}
        {section.realWorldExample && (
          <div className="bg-muted/50 rounded-xl p-4 border border-border">
            <p className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-gold" /> Real-World Example
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed"><HighlightedText text={section.realWorldExample} /></p>
          </div>
        )}
        <div className="pt-2">
          <Button onClick={onContinue}>
            Continue <ArrowRight className="ml-1.5 w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function MicroCheckRenderer({ section, onContinue }: { section: MicroCheckSection; onContinue: () => void }) {
  const [currentQ, setCurrentQ] = useState(0)
  const total = section.questions.length

  const handleNext = () => {
    if (currentQ < total - 1) setCurrentQ(currentQ + 1)
    else onContinue()
  }

  return (
    <Card variant="elevated" className="overflow-hidden">
      <div className="bg-accent/10 border-b border-border px-6 py-3 flex items-center gap-2">
        <BrainCircuit className="w-4 h-4 text-accent" />
        <span className="text-xs font-semibold text-accent uppercase tracking-wider">Micro Check</span>
        <Badge variant="outline" className="ml-auto text-xs">{currentQ + 1}/{total}</Badge>
      </div>
      <CardContent className="p-6">
        <QuizAnswer
          key={`mc-${currentQ}`}
          question={section.questions[currentQ]}
          coins={25}
          onCorrect={() => {}}
          onIncorrect={() => {}}
          onContinue={handleNext}
          showContinue={true}
        />
      </CardContent>
    </Card>
  )
}

export function ScenarioRenderer({ section, onContinue }: { section: ScenarioSection; onContinue: () => void }) {
  return (
    <Card variant="elevated" className="overflow-hidden">
      <div className="bg-warning/10 border-b border-border px-6 py-3 flex items-center gap-2">
        <FileQuestion className="w-4 h-4 text-warning" />
        <span className="text-xs font-semibold text-warning uppercase tracking-wider">Applied Scenario</span>
      </div>
      <CardContent className="p-6 space-y-4">
        <h3 className="text-lg font-bold text-foreground">{section.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed"><HighlightedText text={section.narrative} /></p>
        {section.details && (
          <ul className="space-y-2 pl-1">
            {section.details.map((d, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-warning mt-1">▸</span>
                <span><HighlightedText text={d} /></span>
              </li>
            ))}
          </ul>
        )}
        <div className="pt-2">
          <Button onClick={onContinue}>
            Continue <ArrowRight className="ml-1.5 w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function AppliedQuestionRenderer({ section, onContinue }: { section: AppliedQuestionSection; onContinue: () => void }) {
  return (
    <Card variant="elevated" className="overflow-hidden">
      <div className="bg-secondary/10 border-b border-border px-6 py-3 flex items-center gap-2">
        <Target className="w-4 h-4 text-secondary" />
        <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Applied Question</span>
      </div>
      <CardContent className="p-6">
        <QuizAnswer
          question={section.question}
          coins={25}
          onCorrect={() => {}}
          onIncorrect={() => {}}
          onContinue={onContinue}
          showContinue={true}
        />
      </CardContent>
    </Card>
  )
}

export function RecapRenderer({ section, onContinue }: { section: RecapSection; onContinue: () => void }) {
  return (
    <Card variant="elevated" className="overflow-hidden">
      <div className="bg-primary/5 border-b border-border px-6 py-3 flex items-center gap-2">
        <ListChecks className="w-4 h-4 text-primary" />
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Key Takeaways</span>
      </div>
      <CardContent className="p-6 space-y-3">
        {section.takeaways.map((t, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
            <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
            <p className="text-sm text-foreground">{t}</p>
          </div>
        ))}
        <div className="pt-2">
          <Button onClick={onContinue}>
            Start Mastery Check <ArrowRight className="ml-1.5 w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function MasteryCheckRenderer({
  section,
  topicId,
  lessonId,
  attemptSessionId,
  sessionAttemptNumber,
  onComplete,
  onFail,
  onReread,
}: {
  section: MasteryCheckSection
  // Mastery Engine identifiers - the LessonCategory and lesson id this
  // mastery check belongs to, threaded down so each answer can be logged
  // to question_attempts against the right topic.
  topicId: string
  lessonId: string
  // Owned by LessonDetail, not local state: a genuine fail-and-retry routes
  // through the recap section, which unmounts/remounts this component, so
  // any restart counter kept here would reset to 1 on every single retry -
  // silently zeroing out retry_factor for every real student retry. The
  // parent survives that remount, so it's the only place this can live.
  attemptSessionId: string
  sessionAttemptNumber: number
  onComplete: (correctCount: number, totalAttempts: number, attemptSessionId: string) => void
  onFail: () => void
  /** Optional - reopen the Jeff chat so the student rereads the lesson before retrying. */
  onReread?: () => void
}) {
  const { react } = useJeff()
  const { user } = useApp()
  const [currentQ, setCurrentQ] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [totalAttempts, setTotalAttempts] = useState(0)
  const [finished, setFinished] = useState(false)

  const required = section.requiredCorrect

  // Per-attempt question subset: the authored pool is intentionally larger
  // than `requiredCorrect`, so a student who fails and retries gets FRESH
  // questions instead of re-seeing the exact same ones. We draw `required`
  // questions from the pool starting at an offset that rotates by
  // `sessionAttemptNumber` (deterministic per attempt, so a mid-attempt
  // re-render stays stable), cycling through the pool with wrap-around. This
  // component is remounted (keyed on regenerationCount) on every retry, so the
  // memo recomputes with the new attempt number each time.
  const questions = useMemo(() => {
    const pool = section.questions
    if (pool.length <= required) return pool
    // attemptNumber starts at 1; offset advances by `required` each attempt so
    // successive attempts consume the next slice of the pool before wrapping.
    const offset = ((sessionAttemptNumber - 1) * required) % pool.length
    return Array.from({ length: required }, (_, i) => pool[(offset + i) % pool.length])
  }, [section.questions, required, sessionAttemptNumber])

  const total = questions.length

  // Fire-and-forget event log write - never blocks or delays quiz feedback,
  // and a failed write never breaks the lesson (matches the app's existing
  // pattern for non-critical writes, e.g. the reflection-journal save).
  const logAttempt = (question: QuizQuestion, isCorrect: boolean, responseTimeMs: number) => {
    if (!user?.id || DEV_LOCAL_BYPASS) return
    supabase.from("question_attempts").insert({
      user_id: user.id,
      question_id: question.id,
      topic_id: topicId,
      lesson_id: lessonId,
      source: "lesson_quiz",
      is_correct: isCorrect,
      response_time_ms: responseTimeMs,
      attempt_session_id: attemptSessionId,
      session_attempt_number: sessionAttemptNumber,
    }).then(({ error }) => {
      if (error) console.error("[question_attempts insert]", error)
    })
  }

  const CORRECT_CHEERS = [
    "Boom! Nailed it. 💥",
    "Yes! You've got this. ⭐",
    "Sharp! Keep it rolling. 📈",
    "That's the way! 🙌",
  ]

  const handleCorrect = () => {
    const nc = correctCount + 1
    setCorrectCount(nc)
    setTotalAttempts(prev => prev + 1)
    if (nc >= required) {
      // The one that secures the pass - Jeff does a backflip.
      react("celebrate", "YESSS! That's the one - you passed! 🎉", "flip")
    } else {
      react("celebrate", CORRECT_CHEERS[nc % CORRECT_CHEERS.length], "jump")
    }
  }
  const handleIncorrect = () => {
    setTotalAttempts(prev => prev + 1)
    react("encourage", "Shake it off - lock in on the next one. 💪")
  }

  const handleNext = () => {
    if (currentQ < total - 1) {
      setCurrentQ(currentQ + 1)
      // Clutch moment: one correct answer away from passing.
      if (required > 1 && correctCount === required - 1) {
        react("think", "Focus up - get this one and you pass. It's for all the marbles! 🎯")
      }
    } else {
      setFinished(true)
      const finalCorrect = correctCount // already updated
      if (finalCorrect >= required) onComplete(finalCorrect, totalAttempts, attemptSessionId)
      // fail handled by retry button
    }
  }

  // Need to track correct count after state update
  const actualCorrect = correctCount
  const passed = finished && actualCorrect >= required

  if (finished && !passed) {
    return (
      <Card variant="elevated" className="overflow-hidden">
        <div className="bg-destructive/10 border-b border-border px-6 py-3 flex items-center gap-2">
          <Target className="w-4 h-4 text-destructive" />
          <span className="text-xs font-semibold text-destructive uppercase tracking-wider">Mastery Check - Retry Needed</span>
        </div>
        <CardContent className="p-6 text-center space-y-4">
          <XCircle className="w-12 h-12 text-destructive mx-auto" />
          <p className="text-lg font-bold">You got {actualCorrect} / {total} correct</p>
          <p className="text-sm text-muted-foreground">You need at least {required} correct answers to pass. Reread the lesson with Jeff, then run it back!</p>
          <div className="flex flex-col gap-2 items-stretch max-w-xs mx-auto">
            {onReread && (
              <Button onClick={() => {
                react("encourage", "Smart move - let's run back through it together, then crush it. 📖")
                onReread()
              }}>
                <BookOpen className="w-4 h-4 mr-2" /> Reread the lesson with Jeff
              </Button>
            )}
            <Button variant={onReread ? "outline" : "default"} onClick={() => {
              // No local resets needed - onFail() routes to recap, which
              // unmounts this component entirely; the next attempt's
              // sessionId/number come back down fresh via props from
              // LessonDetail, which is what actually survives the remount.
              react("encourage", "No sweat - we run it back and get it this time. 🔁")
              onFail()
            }}>
              Retry Mastery Check
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card variant="elevated" className="overflow-hidden">
      <div className="bg-primary/10 border-b border-border px-6 py-3 flex items-center gap-2">
        <Target className="w-4 h-4 text-primary" />
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Mastery Check</span>
        <Badge variant="outline" className="ml-auto text-xs">{currentQ + 1}/{total}</Badge>
      </div>
      <CardContent className="p-6 space-y-4">
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span>Goal: {required} correct</span>
            <span className="text-success font-medium">{correctCount} / {required} ✓</span>
          </div>
          <Progress value={(correctCount / required) * 100} className="h-2" />
        </div>
        <QuizAnswer
          key={`mastery-${currentQ}`}
          question={questions[currentQ]}
          onCorrect={handleCorrect}
          onIncorrect={handleIncorrect}
          onContinue={handleNext}
          onAnswered={(isCorrect, ms) => logAttempt(questions[currentQ], isCorrect, ms)}
          showContinue={true}
        />
      </CardContent>
    </Card>
  )
}
