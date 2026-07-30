import React, { useRef, useState } from "react"
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
  CheckCircle,
  XCircle,
  ArrowRight,
  Lightbulb,
  Target,
  ListChecks,
  BrainCircuit,
  FileQuestion,
} from "lucide-react"
import { useHints } from "@/components/lesson/HintContext"
// shuffleQuestion import removed - shuffling is handled upstream in LessonDetail

// ─── Quiz Answer Component (shared by Micro Check, Applied Question, Mastery) ───

interface QuizAnswerProps {
  question: QuizQuestion
  onCorrect: () => void
  onIncorrect: () => void
  onContinue: () => void
  showContinue: boolean
  // Optional - only the Mastery Engine's write path (MasteryCheckRenderer)
  // wires this. Micro-check and applied-question are formative practice,
  // not the assessment of mastery, so they never log to question_attempts.
  onAnswered?: (isCorrect: boolean, responseTimeMs: number) => void
}

function QuizAnswer({ question, onCorrect, onIncorrect, onContinue, showContinue, onAnswered }: QuizAnswerProps) {
  // Questions are already shuffled & validated by the MCQ engine in LessonDetail - use as-is
  const shuffledQ = question
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  // Wrong options this question's hints have crossed out.
  const [eliminated, setEliminated] = useState<number[]>([])
  const hints = useHints()
  // Mount time for THIS question - a fresh QuizAnswer instance is created
  // per question (parent passes key={question.id}), so this ref naturally
  // resets per question with no effect/cleanup needed.
  const shownAtRef = useRef(Date.now())

  const handleSelect = (idx: number) => {
    if (revealed || eliminated.includes(idx)) return
    setSelected(idx)
    setRevealed(true)
    const isRight = idx === shuffledQ.correctAnswer
    onAnswered?.(isRight, Date.now() - shownAtRef.current)
    if (isRight) onCorrect()
    else onIncorrect()
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

  const isCorrect = selected === shuffledQ.correctAnswer

  return (
    <div className="space-y-3">
      <p className="font-semibold text-foreground text-base">{shuffledQ.question}</p>
      <div className="space-y-2">
        {shuffledQ.options.map((opt, i) => {
          const isSelected = selected === i
          const isRight = i === shuffledQ.correctAnswer
          const showGreen = revealed && isRight
          const showRed = revealed && isSelected && !isRight
          const isEliminated = !revealed && eliminated.includes(i)

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={revealed || isEliminated}
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
            </button>
          )
        })}
      </div>

      {/* Hint control - a shared budget of hints for the whole lesson. Each hint
          rules out one wrong answer. */}
      {!revealed && hints && (
        <div className="flex items-center justify-between gap-2 flex-wrap">
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
          {eliminated.length > 0 ? (
            <span className="text-[11px] text-muted-foreground">👀 Crossed out a wrong answer</span>
          ) : hints.hintsLeft > 0 ? (
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
          <p key={i} className="text-sm text-muted-foreground leading-relaxed">{p}</p>
        ))}
        {section.bullets && (
          <ul className="space-y-2 pl-1">
            {section.bullets.map((b, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
        {section.realWorldExample && (
          <div className="bg-muted/50 rounded-xl p-4 border border-border">
            <p className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-gold" /> Real-World Example
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">{section.realWorldExample}</p>
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
          key={section.questions[currentQ].id}
          question={section.questions[currentQ]}
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
        <p className="text-sm text-muted-foreground leading-relaxed">{section.narrative}</p>
        {section.details && (
          <ul className="space-y-2 pl-1">
            {section.details.map((d, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-warning mt-1">▸</span>
                <span>{d}</span>
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
}) {
  const { react } = useJeff()
  const { user } = useApp()
  const [currentQ, setCurrentQ] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [totalAttempts, setTotalAttempts] = useState(0)
  const [finished, setFinished] = useState(false)

  const total = section.questions.length
  const required = section.requiredCorrect

  // Fire-and-forget event log write - never blocks or delays quiz feedback,
  // and a failed write never breaks the lesson (matches the app's existing
  // pattern for non-critical writes, e.g. the reflection-journal save).
  const logAttempt = (question: QuizQuestion, isCorrect: boolean, responseTimeMs: number) => {
    if (!user?.id) return
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
          <p className="text-sm text-muted-foreground">You need at least {required} correct answers to pass. Review the concepts and try again!</p>
          <Button onClick={() => {
            // No local resets needed - onFail() routes to recap, which
            // unmounts this component entirely; the next attempt's
            // sessionId/number come back down fresh via props from
            // LessonDetail, which is what actually survives the remount.
            react("encourage", "No sweat - we run it back and get it this time. 🔁")
            onFail()
          }}>
            Retry Mastery Check
          </Button>
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
          key={section.questions[currentQ].id}
          question={section.questions[currentQ]}
          onCorrect={handleCorrect}
          onIncorrect={handleIncorrect}
          onContinue={handleNext}
          onAnswered={(isCorrect, ms) => logAttempt(section.questions[currentQ], isCorrect, ms)}
          showContinue={true}
        />
      </CardContent>
    </Card>
  )
}
