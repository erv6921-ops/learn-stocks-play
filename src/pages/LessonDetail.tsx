import React, { useState, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useApp } from "@/contexts/AppContext"
import { lessons } from "@/data/lessons"
import { getStructuredContent } from "@/data/lessonContent"
import { generateStructuredContent } from "@/lib/contentGenerator"
import { LessonSection, StructuredLessonContent, QuizQuestion } from "@/types"
import { shuffleQuestionSet } from "@/lib/mcqEngine"
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
import JeffChat from "@/components/lessons/JeffChat"
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
  const { lessonProgress, updateLessonProgress, earnJeffs, getRewardMultiplier } = useApp()

  const lesson = lessons.find(l => l.id === id)
  const progress = lessonProgress.find(p => p.lessonId === id)
  const isCompleted = progress?.completed

  // Track regeneration attempts for mastery check failures
  const [regenerationCount, setRegenerationCount] = useState(0)

  // Always use structured content — hand-written or generated
  const structuredContent: StructuredLessonContent | null = useMemo(() => {
    if (!lesson) return null
    const handWritten = getStructuredContent(lesson.id)
    const raw = (handWritten && regenerationCount === 0) ? handWritten : generateStructuredContent(lesson, regenerationCount)
    if (!raw) return null

    // Process all question sections through the MCQ engine for balanced positions & length normalization
    const processedSections = raw.sections.map(section => {
      if (section.type === "micro-check") {
        return { ...section, questions: shuffleQuestionSet(section.questions) }
      }
      if (section.type === "applied-question") {
        const [processed] = shuffleQuestionSet([section.question])
        return { ...section, question: processed }
      }
      if (section.type === "mastery-check") {
        return { ...section, questions: shuffleQuestionSet(section.questions) }
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

  const handleMasteryComplete = (correct: number, attempts: number) => {
    setTotalAttempts(attempts)
    setLessonFinished(true)
    updateLessonProgress(lesson.id, true, 100)
    if (!isCompleted) {
      earnJeffs(lesson.reward, `Completed lesson: ${lesson.title}`)
      setJeffsEarned(true)
    }
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
          onQuizReady={handleChatQuizReady}
          onClose={() => setChatOpen(false)}
        />
      )}
    </div>
  )
}
