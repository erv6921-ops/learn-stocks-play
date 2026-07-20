import React, { useState, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useApp } from "@/contexts/AppContext"
import { lessons } from "@/data/lessons"
import { getStructuredContent } from "@/data/lessonContent"
import { generateStructuredContent } from "@/lib/contentGenerator"
import { LessonSection, StructuredLessonContent, QuizQuestion } from "@/types"
import { shuffleQuestionSet, normalizeOptionLengths, questionPassesQualityChecks } from "@/lib/mcqEngine"
import { getQuizForLesson } from "@/data/lessonQuizzes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { HintProvider } from "@/components/lesson/HintContext"
import JeffChat from "@/components/lessons/JeffChat"
import { buildScript } from "@/lib/jeffChatLesson"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/integrations/supabase/client"
import { getReflectionPrompt, MIN_REFLECTION_WORDS, REFLECTION_BONUS } from "@/lib/reflectionPrompts"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  Coins,
  Target,
} from "lucide-react"

export default function LessonDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user, lessonProgress, updateLessonProgress, earnJeffs, getRewardMultiplier } = useApp()

  const lesson = lessons.find(l => l.id === id)
  const progress = lessonProgress.find(p => p.lessonId === id)
  const isCompleted = progress?.completed

  // Track regeneration attempts for mastery check failures
  const [regenerationCount, setRegenerationCount] = useState(0)

  // Always use structured content — hand-written or generated.
  // On mastery-check retries (regenerationCount > 0), getStructuredContent
  // keeps hand-written sections and the AP quiz overlay intact and only
  // varies GENERATED question selection; the shuffle below re-randomizes
  // option order for everyone because this memo re-runs. (Previously a
  // retry regenerated everything, so authored lessons retried against
  // off-topic generic template questions.)
  const structuredContent: StructuredLessonContent | null = useMemo(() => {
    if (!lesson) return null
    const raw = getStructuredContent(lesson.id, regenerationCount)
    if (!raw) return null

    // Guessability guard: authored questions often have the correct answer
    // written as the longest option — a tell no amount of position-shuffling
    // can hide. For each quiz question: (1) trim trailing elaboration off
    // standout-long options, and (2) if it STILL fails the length/quality
    // checks, swap in a clean unused question from this lesson's quiz pool.
    const pool = getQuizForLesson(lesson.id)
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
      return normalized // no clean replacement available — trimmed original beats nothing
    }

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
        return { ...section, questions: shuffleQuestionSet(section.questions.map(deBias)) }
      }
      return section
    })
    return { ...raw, sections: processedSections }
  }, [lesson, regenerationCount])

  // ─── Lesson state ───
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0)
  const [lessonStarted, setLessonStarted] = useState(false)
  const [lessonFinished, setLessonFinished] = useState(false)
  const [jeffsEarned, setJeffsEarned] = useState(false)
  const [totalAttempts, setTotalAttempts] = useState(0)
  // "Chat with Jeff" replaces the paragraph reading for uncompleted lessons.
  const [chatOpen, setChatOpen] = useState(false)
  // "Make It Stick" reflection — after mastery, before the completion screen.
  const [pendingMastery, setPendingMastery] = useState<{ correct: number; attempts: number } | null>(null)
  const [reflectionText, setReflectionText] = useState("")
  const [savingReflection, setSavingReflection] = useState(false)
  const [reflectionDone, setReflectionDone] = useState(false)
  const reflectionPrompt = lesson ? getReflectionPrompt(lesson.category, lesson.title) : ""
  const reflectionWords = reflectionText.trim().split(/\s+/).filter(Boolean).length

  if (!lesson || !structuredContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Lesson not found</h2>
          <Button onClick={() => navigate("/lessons")}>Back to Missions</Button>
        </div>
      </div>
    )
  }

  const sections = structuredContent.sections

  // The chat replaces the reading ("concept") sections — after it, students
  // jump straight to the first interactive/quiz section.
  const firstQuizIdx = Math.max(0, sections.findIndex(s => s.type !== "concept"))

  const handleChatQuizReady = () => {
    setChatOpen(false)
    // Record "content viewed" on the existing lesson_progress row (not completed yet).
    if (!isCompleted) updateLessonProgress(lesson.id, false)
    setLessonStarted(true)
    setCurrentSectionIdx(firstQuizIdx)
    window.scrollTo({ top: 0 })
  }

  // ─── Handlers ───
  const handleSectionContinue = () => {
    if (currentSectionIdx < sections.length - 1) {
      setCurrentSectionIdx(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const finishLesson = (attempts: number) => {
    setTotalAttempts(attempts)
    setLessonFinished(true)
    updateLessonProgress(lesson.id, true, 100)
    if (!isCompleted) {
      earnJeffs(lesson.reward, `Completed lesson: ${lesson.title}`)
      setJeffsEarned(true)
    }
  }

  const handleMasteryComplete = (correct: number, attempts: number) => {
    // First-time completions write a "Make It Stick" reflection before the
    // rewards screen; replays skip straight to the finish.
    if (isCompleted) { finishLesson(attempts); return }
    setPendingMastery({ correct, attempts })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleReflectionSubmit = async () => {
    if (!pendingMastery || reflectionWords < MIN_REFLECTION_WORDS || savingReflection) return
    setSavingReflection(true)
    try {
      if (user?.id) {
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
    earnJeffs(REFLECTION_BONUS, `Reflection journal: ${lesson.title}`)
    setReflectionDone(true)
    finishLesson(pendingMastery.attempts)
  }

  const handleMasteryFail = () => {
    // Regenerate questions for next attempt
    setRegenerationCount(prev => prev + 1)
    const recapIdx = sections.findIndex(s => s.type === "recap")
    if (recapIdx !== -1) setCurrentSectionIdx(recapIdx)
  }

  const sectionProgress = sections.length > 0 ? ((currentSectionIdx + 1) / sections.length) * 100 : 0

  const renderSection = (section: LessonSection, idx: number) => {
    switch (section.type) {
      case "concept":
        return <ConceptRenderer key={idx} section={section} onContinue={handleSectionContinue} />
      case "micro-check":
        return <MicroCheckRenderer key={idx} section={section} onContinue={handleSectionContinue} />
      case "scenario":
        return <ScenarioRenderer key={idx} section={section} onContinue={handleSectionContinue} />
      case "applied-question":
        return <AppliedQuestionRenderer key={idx} section={section} onContinue={handleSectionContinue} />
      case "recap":
        return <RecapRenderer key={idx} section={section} onContinue={handleSectionContinue} />
      case "mastery-check":
        return <MasteryCheckRenderer key={idx} section={section} onComplete={handleMasteryComplete} onFail={handleMasteryFail} />
      default:
        return null
    }
  }

  return (
    <HintProvider key={lesson.id} total={2}>
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-14 gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/lessons")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="font-semibold text-sm truncate">{lesson.title}</h1>
              {lessonStarted && !lessonFinished && (
                <div className="flex items-center gap-2 mt-0.5">
                  <Progress value={sectionProgress} className="h-1 flex-1 max-w-[120px]" />
                  <span className="text-[10px] text-muted-foreground">{currentSectionIdx + 1}/{sections.length}</span>
                </div>
              )}
            </div>
            <Badge variant="outline" className="text-xs">{lesson.lessonNumber}</Badge>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {!lessonStarted && !isCompleted ? (
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
                      <Coins className="w-4 h-4 text-gold" /> {lesson.reward.toLocaleString()} InvestiCoins on completion
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

            <div className="text-center">
              <Button size="lg" variant="hero" onClick={() => setChatOpen(true)}>
                Start Mission <ArrowRight className="ml-2" />
              </Button>
              <p className="text-xs text-muted-foreground mt-2">💬 Jeff will teach you this one in chat</p>
            </div>
          </div>
        ) : pendingMastery && !lessonFinished ? (
          /* ─── "Make It Stick" reflection — apply the lesson to your own life ─── */
          <Card variant="elevated">
            <CardContent className="p-6 md:p-8 space-y-5">
              <div className="flex items-start gap-4">
                <JeffMascot size="sm" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary">Make it stick</p>
                  <h2 className="text-xl font-bold mt-0.5">Nice — you passed! Now make it yours.</h2>
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
              </div>

              <Button
                size="lg"
                className="w-full font-bold"
                disabled={reflectionWords < MIN_REFLECTION_WORDS || savingReflection}
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
        ) : lessonFinished || isCompleted ? (
          /* ─── Completion screen ─── */
          <Card variant="elevated">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-success/20 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
              <h2 className="text-2xl font-bold">Mission Complete! 🎉</h2>

              {jeffsEarned && (
                <div className="bg-gold/10 border border-gold/20 rounded-xl p-4">
                  <div className="flex items-center justify-center gap-2">
                    <Coins className="w-5 h-5 text-gold" />
                    <span className="text-2xl font-semibold text-gold">
                      +{Math.round(lesson.reward * getRewardMultiplier()).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">InvestiCoins earned!</p>
                  {getRewardMultiplier() > 1 && (
                    <p className="text-xs text-gold/70 mt-1">({getRewardMultiplier().toFixed(1)}x multiplier from Benchmark)</p>
                  )}
                  {reflectionDone && (
                    <p className="text-xs text-gold/80 mt-1">+{REFLECTION_BONUS} reflection bonus — plan locked in 📝</p>
                  )}
                </div>
              )}

              <p className="text-muted-foreground">You've successfully completed this mission!</p>
              <Button onClick={() => navigate("/lessons?category=" + lesson.category)}>
                Continue Learning <ArrowRight className="ml-2" />
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* ─── Active section rendering ─── */
          <div className="space-y-6">
            {renderSection(sections[currentSectionIdx], currentSectionIdx)}
          </div>
        )}
      </main>

      {/* ─── Chat with Jeff: the conversational lesson (replaces reading) ─── */}
      {chatOpen && !isCompleted && (
        <JeffChat
          lesson={lesson}
          // Offline/no-credits fallback: Jeff teaches the lesson's own
          // concept content as a scripted chat instead of erroring.
          script={buildScript(sections)}
          onQuizReady={handleChatQuizReady}
          onClose={() => setChatOpen(false)}
        />
      )}
    </div>
    </HintProvider>
  )
}
