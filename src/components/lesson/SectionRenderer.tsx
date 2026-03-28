import React, { useState } from "react"
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
// shuffleQuestion import removed — shuffling is handled upstream in LessonDetail

// ─── Quiz Answer Component (shared by Micro Check, Applied Question, Mastery) ───

interface QuizAnswerProps {
  question: QuizQuestion
  onCorrect: () => void
  onIncorrect: () => void
  onContinue: () => void
  showContinue: boolean
}

function QuizAnswer({ question, onCorrect, onIncorrect, onContinue, showContinue }: QuizAnswerProps) {
  // Questions are already shuffled & validated by the MCQ engine in LessonDetail — use as-is
  const shuffledQ = question
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)

  const handleSelect = (idx: number) => {
    if (revealed) return
    setSelected(idx)
    setRevealed(true)
    if (idx === shuffledQ.correctAnswer) onCorrect()
    else onIncorrect()
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

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={revealed}
              className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-center gap-3 text-sm ${
                showGreen
                  ? "border-success bg-success/10 text-success"
                  : showRed
                  ? "border-destructive bg-destructive/10 text-destructive"
                  : isSelected
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              } ${revealed ? "cursor-default" : "cursor-pointer"}`}
            >
              {showGreen && <CheckCircle className="w-4 h-4 flex-shrink-0" />}
              {showRed && <XCircle className="w-4 h-4 flex-shrink-0" />}
              <span>{opt}</span>
            </button>
          )
        })}
      </div>

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
  onComplete,
  onFail,
}: {
  section: MasteryCheckSection
  onComplete: (correctCount: number, totalAttempts: number) => void
  onFail: () => void
}) {
  const [currentQ, setCurrentQ] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [totalAttempts, setTotalAttempts] = useState(0)
  const [finished, setFinished] = useState(false)

  const total = section.questions.length
  const required = section.requiredCorrect

  const handleCorrect = () => {
    setCorrectCount(prev => prev + 1)
    setTotalAttempts(prev => prev + 1)
  }
  const handleIncorrect = () => {
    setTotalAttempts(prev => prev + 1)
  }

  const handleNext = () => {
    if (currentQ < total - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      setFinished(true)
      const finalCorrect = correctCount // already updated
      if (finalCorrect >= required) onComplete(finalCorrect, totalAttempts)
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
          <span className="text-xs font-semibold text-destructive uppercase tracking-wider">Mastery Check — Retry Needed</span>
        </div>
        <CardContent className="p-6 text-center space-y-4">
          <XCircle className="w-12 h-12 text-destructive mx-auto" />
          <p className="text-lg font-bold">You got {actualCorrect} / {total} correct</p>
          <p className="text-sm text-muted-foreground">You need at least {required} correct answers to pass. Review the concepts and try again!</p>
          <Button onClick={() => {
            setCurrentQ(0)
            setCorrectCount(0)
            setTotalAttempts(0)
            setFinished(false)
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
          showContinue={true}
        />
      </CardContent>
    </Card>
  )
}
