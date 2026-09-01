import React, { useState, useMemo, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useApp } from "@/contexts/AppContext"
import { lessons } from "@/data/lessons"
import { getStructuredContent } from "@/data/lessonContent"
import { generateStructuredContent, tierDifficulty } from "@/lib/contentGenerator"
import { LessonSection, StructuredLessonContent, QuizQuestion, MasteryTier } from "@/types"
import { shuffleQuestionSet, normalizeOptionLengths, questionPassesQualityChecks } from "@/lib/mcqEngine"
import { getQuizForLesson, getQuizForLessonByTier } from "@/data/lessonQuizzes"
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
import { ActivityCheckRenderer } from "@/components/lesson/ActivityCheckRenderer"
import { DiagramRenderer } from "@/components/lesson/DiagramRenderer"
import { HintProvider } from "@/components/lesson/HintContext"
import { QuizSessionProvider } from "@/components/lesson/QuizSessionContext"
import { LessonCompletionScreen } from "@/components/lesson/LessonCompletionScreen"
import { DefinitionPracticeCard } from "@/components/lesson/DefinitionPracticeCard"
import { getDefinitionPractice } from "@/data/definitionPractice"
import JeffChat from "@/components/lessons/JeffChat"
import { buildScript, isDeepLesson, clearChat } from "@/lib/jeffChatLesson"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/integrations/supabase/client"
import { getReflectionPrompt, MIN_REFLECTION_WORDS, REFLECTION_BONUS } from "@/lib/reflectionPrompts"
import { toast } from "sonner"
import { looksLowEffort, LOW_EFFORT_MESSAGE } from "@/lib/answerQuality"
import { DEV_LOCAL_BYPASS } from "@/lib/devBypass"
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Coins,
  Target,
  X,
} from "lucide-react"

export default function LessonDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user, lessonProgress, updateLessonProgress, earnJeffs } = useApp()

  const lesson = lessons.find(l => l.id === id)
  const progress = lessonProgress.find(p => p.lessonId === id)
  const isCompleted = progress?.completed

  // Track regeneration attempts for mastery check failures
  const [regenerationCount, setRegenerationCount] = useState(0)

  // Content pacing (Hook B): the student's most recent confidence tier for
  // THIS topic, fetched once per lesson visit - not on every regeneration,
  // since it reflects standing coming INTO this lesson, not anything that
  // happens during it. Cold start (no row yet, or the fetch hasn't resolved)
  // leaves this null, which is exactly today's unmodified content - never a
  // special case that blocks or delays rendering the lesson.
  const [contentConfidenceTier, setContentConfidenceTier] = useState<string | null>(null)
  // fragile_confidence's "different set than what they just saw" needs to
  // know what that set actually was - the question ids from this lesson's
  // most recent completed mastery-check session.
  const [recentQuestionIds, setRecentQuestionIds] = useState<string[]>([])
  // Standing adaptive ability (theta) for THIS topic, coming into the lesson.
  // Picks the initial pool difficulty (remedial/base/hard) for a fresh lesson,
  // superseding the coarse literacyLevel. Null = no estimate yet (cold start),
  // which falls back to literacyLevel - exactly today's behavior.
  const [abilityTheta, setAbilityTheta] = useState<number | null>(null)

  useEffect(() => {
    // Replays already have a fixed quiz_score on record - don't let content
    // pacing reshuffle what a student sees when reviewing a done lesson.
    if (!lesson || !user?.id || isCompleted) return
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
  }, [lesson, user?.id, isCompleted])

  // Always use structured content - hand-written or generated.
  // On mastery-check retries (regenerationCount > 0), getStructuredContent
  // keeps hand-written sections and the AP quiz overlay intact and only
  // varies GENERATED question selection; the shuffle below re-randomizes
  // option order for everyone because this memo re-runs. (Previously a
  // retry regenerated everything, so authored lessons retried against
  // off-topic generic template questions.)
  const structuredContent: StructuredLessonContent | null = useMemo(() => {
    if (!lesson) return null
    // Prefer the live per-topic ability (theta) over the coarse account-wide
    // literacyLevel: a theta above/below a neutral band pulls the hard/remedial
    // pool. Cold start (no theta yet) falls back to literacyLevel - today's
    // behavior. Mapped onto MasteryTier so it reuses tierDifficulty's existing
    // beginner/intermediate/advanced pool routing.
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
    // a student who fails re-sees the EXACT same questions (SectionRenderer
    // rotates a per-attempt slice, but only if the pool is bigger than the
    // slice). Build a supplemental bank from this lesson's OWN already-authored
    // questions - the micro-check + applied questions, then any unused quiz-pool
    // questions - so every mastery-check has room to rotate to fresh questions
    // on a retry. Attempt 1 still shows only the authored mastery questions
    // (they stay first), so nothing a student just saw is repeated immediately.
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
        // Give the retry rotation headroom: enough distinct questions for a
        // couple of fresh attempts beyond the first. Extras are drawn from the
        // supplemental bank and de-duped against the authored mastery questions.
        const target = section.requiredCorrect + 3
        const baseIds = new Set(base.map(q => q.id))
        const extras = supplemental.filter(q => !baseIds.has(q.id)).slice(0, Math.max(0, target - base.length))
        return { ...section, questions: shuffleQuestionSet([...base, ...extras]) }
      }
      return section
    })
    return { ...raw, sections: processedSections }
  }, [lesson, regenerationCount, contentConfidenceTier, recentQuestionIds, user?.literacyLevel, abilityTheta])

  // ─── Lesson state ───
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0)
  const [lessonStarted, setLessonStarted] = useState(false)
  const [lessonFinished, setLessonFinished] = useState(false)
  const [totalAttempts, setTotalAttempts] = useState(0)
  const [totalCorrect, setTotalCorrect] = useState(0)
  // "Chat with Jeff" replaces the paragraph reading for uncompleted lessons.
  const [chatOpen, setChatOpen] = useState(false)
  // Retake: the student finished this lesson but chose to run the WHOLE thing
  // again (Jeff's teaching + every question). While true, an already-completed
  // lesson is treated like a fresh attempt so the overview/chat/walk all show.
  const [retaking, setRetaking] = useState(false)
  // Bumped on each retake to remount the QuizSessionProvider, so the completion
  // screen's coin/accuracy tallies reflect only the current run, not a sum of
  // the original attempt and the retake.
  const [retakeCount, setRetakeCount] = useState(0)
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
  // Owned here, not inside MasteryCheckRenderer: a genuine fail routes
  // through the recap section, which unmounts/remounts that component, so
  // a restart counter kept there would reset to 1 on every real retry -
  // silently zeroing out retry_factor. LessonDetail stays mounted for the
  // whole lesson, so this is what actually survives that remount.
  // attemptNumber only increments on a genuine fail-and-retry (handleMasteryFail);
  // the capped confidence-tier reinforcement round (handleReinforcementContinue)
  // is a deliberately fresh, separate attempt chain, not a "restart."
  const [masteryAttempt, setMasteryAttempt] = useState(() => ({ sessionId: crypto.randomUUID(), attemptNumber: 1 }))
  const reflectionPrompt = lesson ? getReflectionPrompt(lesson.id, lesson.category) : ""
  const reflectionWords = reflectionText.trim().split(/\s+/).filter(Boolean).length
  // Lessons with a definition-practice override replace the post-mastery
  // reflection with a mandatory "Define These Key Terms" card (same gate: the
  // student can't reach the finish screen until it's done). Practice only —
  // no mastery/theta impact, no DB write of the answers.
  const definitionPractice = lesson ? getDefinitionPractice(lesson.id) : null

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

  // Concept sections are TEACHING material, delivered by Jeff in the chat - they
  // are never shown as standalone "reading" steps, so the student never hits a
  // wall of vocab paragraphs in the middle of a lesson. The interactive walk is
  // everything except concept sections (checks, scenario, applied, recap,
  // mastery); Jeff still teaches from the full concept text via `conceptSource`
  // / `buildScript` below.
  const walkSections = sections.filter(s => s.type !== "concept")

  // DEV-ONLY shortcut: /lessons/<id>?dev=mastery drops you straight onto the
  // mastery-check quiz, skipping Jeff's chat and the practice walk. Gated on
  // import.meta.env.DEV so it can never fire in a production build. Handy for
  // eyeballing authored quiz questions without playing the whole lesson.
  useEffect(() => {
    if (!import.meta.env.DEV) return
    const jump = new URLSearchParams(window.location.search).get("dev")
    if (jump !== "mastery") return
    const masteryIdx = walkSections.findIndex(s => s.type === "mastery-check")
    if (masteryIdx === -1) return
    setChatOpen(false)
    setLessonStarted(true)
    setCurrentSectionIdx(masteryIdx)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson?.id])

  // Deep (academic-course) lessons ground the live Jeff chat in the authored
  // curriculum so it teaches the real material in depth instead of improvising
  // from the title. Assemble that source text from the concept sections.
  const deepLesson = isDeepLesson(lesson)
  const conceptSource = sections
    .flatMap(s => (s.type === "concept" ? [s] : []))
    .map(c => [c.title, ...c.paragraphs, c.realWorldExample ? `Example: ${c.realWorldExample}` : ""].filter(Boolean).join("\n"))
    .join("\n\n")

  // Every topic the student will be quizzed on, from the question concept tags.
  // Jeff must teach each one, so no question is ever asked about something the
  // lesson didn't cover. Slugs are humanized ("risk-and-reward" -> "risk and reward").
  const mustCoverTopics = Array.from(new Set(
    sections.flatMap(s => {
      if (s.type === "micro-check" || s.type === "mastery-check") return s.questions.map(q => q.concept)
      if (s.type === "applied-question") return [s.question.concept]
      return []
    }).filter((c): c is string => !!c)
  )).map(c => c.replace(/-/g, " "))

  // The Jeff chat teaches all the concept material - after it, students go
  // straight into the interactive walk (which contains no concept sections).
  const handleChatQuizReady = () => {
    setChatOpen(false)
    // Record "content viewed" on the existing lesson_progress row (not completed
    // yet), seeding the section-0 percentage so the teacher sees them as started.
    if (!isCompleted) {
      const startPercent = walkSections.length > 0 ? Math.round((1 / walkSections.length) * 100) : 0
      updateLessonProgress(lesson.id, false, undefined, startPercent)
    }
    setLessonStarted(true)
    setCurrentSectionIdx(0)
    window.scrollTo({ top: 0 })
  }

  // ─── Handlers ───
  const handleSectionContinue = () => {
    if (currentSectionIdx < walkSections.length - 1) {
      const nextIdx = currentSectionIdx + 1
      setCurrentSectionIdx(nextIdx)
      // Persist how far the student has gotten so the teacher dashboard can show
      // a live progress bar. Don't touch a lesson that's already completed.
      if (!isCompleted && walkSections.length > 0) {
        const percent = Math.round(((nextIdx + 1) / walkSections.length) * 100)
        updateLessonProgress(lesson.id, false, undefined, percent)
      }
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const finishLesson = (correct: number, attempts: number) => {
    setTotalAttempts(attempts)
    setTotalCorrect(correct)
    setLessonFinished(true)
    const quizScore = attempts > 0 ? Math.round((correct / attempts) * 100) : 100
    updateLessonProgress(lesson.id, true, quizScore)
    // No flat completion reward - coins are earned per question (right answers
    // gain coins, wrong ones lose them). The only completion-time bonus is the
    // optional reflection journal, awarded separately when it's submitted.
  }

  // Mastery confidence pacing is read-only advice on top of the pass/fail
  // gate above it - a cold start, timeout, or function error just means no
  // tier came back, and every branch below falls through to today's plain
  // pass behavior. Never let this call block or break lesson completion.
  const withTimeout = <T,>(p: PromiseLike<T>, ms = 4000): Promise<T | null> =>
    new Promise((resolve) => {
      const timer = setTimeout(() => resolve(null), ms)
      Promise.resolve(p).then((v) => { clearTimeout(timer); resolve(v) }, () => { clearTimeout(timer); resolve(null) })
    })

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
    // First-time completions write a "Make It Stick" reflection before the
    // rewards screen; replays skip straight to the finish.
    if (isCompleted) { finishLesson(correct, attempts); return }
    window.scrollTo({ top: 0, behavior: "smooth" })
    evaluateMastery(correct, attempts, attemptSessionId)
  }

  const handleReinforcementContinue = () => {
    // Same regenerate-and-jump machinery as a real fail, but straight back
    // into the mastery check - the student already passed, so there's no
    // reason to re-walk the recap first. A fresh, separate attempt chain
    // (sessionAttemptNumber back to 1) - this isn't a "restart," it's a
    // deliberate extra round on top of a pass.
    setPendingReinforcement(null)
    setMasteryAttempt({ sessionId: crypto.randomUUID(), attemptNumber: 1 })
    setRegenerationCount(prev => prev + 1)
    const masteryIdx = walkSections.findIndex(s => s.type === "mastery-check")
    if (masteryIdx !== -1) setCurrentSectionIdx(masteryIdx)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleReflectionSubmit = async () => {
    if (!pendingMastery || reflectionWords < MIN_REFLECTION_WORDS || savingReflection) return
    if (looksLowEffort(reflectionText)) { toast.error(LOW_EFFORT_MESSAGE); return }
    setSavingReflection(true)
    try {
      if (user?.id && !DEV_LOCAL_BYPASS) {
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
    finishLesson(pendingMastery.correct, pendingMastery.attempts)
  }

  // Definition-practice equivalent of handleReflectionSubmit: it gates the same
  // pendingMastery → finish transition. Purely practice, so it never touches the
  // mastery score; it awards the same completion bonus as a reflection and marks
  // reflectionDone so the finish screen credits it consistently.
  const handleDefinitionComplete = () => {
    if (!pendingMastery) return
    earnJeffs(REFLECTION_BONUS, `Definition practice: ${lesson.title}`)
    setReflectionDone(true)
    finishLesson(pendingMastery.correct, pendingMastery.attempts)
  }

  const handleMasteryFail = () => {
    // A genuine restart of the same failed attempt chain - bump the count
    // retry_factor reads, on a fresh session id. Regenerate questions too.
    setMasteryAttempt(prev => ({ sessionId: crypto.randomUUID(), attemptNumber: prev.attemptNumber + 1 }))
    setRegenerationCount(prev => prev + 1)
    const recapIdx = walkSections.findIndex(s => s.type === "recap")
    if (recapIdx !== -1) setCurrentSectionIdx(recapIdx)
  }

  // Same genuine-retry bookkeeping as a fail, but instead of jumping to the
  // recap it reopens the Jeff chat so the student rereads the whole
  // conversational lesson before their fresh mastery attempt.
  const handleMasteryReread = () => {
    setMasteryAttempt(prev => ({ sessionId: crypto.randomUUID(), attemptNumber: prev.attemptNumber + 1 }))
    setRegenerationCount(prev => prev + 1)
    setChatOpen(true)
    window.scrollTo({ top: 0 })
  }

  // Retake the entire lesson from the top: reset every bit of session state,
  // wipe the saved Jeff conversation so his class starts fresh, and reshuffle
  // the question selection for variety. `retaking` then routes the render back
  // through the pre-lesson overview even though the lesson is already completed.
  const handleRetake = () => {
    clearChat(lesson.id)
    setRetaking(true)
    setLessonStarted(false)
    setLessonFinished(false)
    setChatOpen(false)
    setCurrentSectionIdx(0)
    setTotalAttempts(0)
    setTotalCorrect(0)
    setPendingMastery(null)
    setPendingReinforcement(null)
    setCheckingMastery(false)
    setConfidenceRoundUsed(false)
    setReflectionText("")
    setReflectionDone(false)
    setRegenerationCount(prev => prev + 1)
    setRetakeCount(prev => prev + 1)
    setMasteryAttempt({ sessionId: crypto.randomUUID(), attemptNumber: 1 })
    window.scrollTo({ top: 0 })
  }

  // The post-mastery "Make It Stick" reflection and the finish screen aren't
  // section steps, so a raw section index stalls the header at e.g. 5/6. Once
  // the student is in the reflection/finish phase, show the bar as complete.
  const inFinalPhase = lessonFinished || reflectionDone || !!pendingMastery || checkingMastery
  const displayStep = inFinalPhase ? walkSections.length : currentSectionIdx + 1
  const sectionProgress = walkSections.length > 0 ? (displayStep / walkSections.length) * 100 : 0

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
            // Keyed on regenerationCount too, not just idx: the reinforcement
            // round (handleReinforcementContinue) jumps straight back to this
            // same section index without detouring through recap, so idx
            // alone wouldn't change and React would reuse the old, already
            // "finished" component instance instead of mounting a fresh one.
            key={`mastery-${idx}-${regenerationCount}`}
            section={section}
            topicId={lesson.category}
            lessonId={lesson.id}
            attemptSessionId={masteryAttempt.sessionId}
            sessionAttemptNumber={masteryAttempt.attemptNumber}
            onComplete={handleMasteryComplete}
            onFail={handleMasteryFail}
            // Rereading opens the Jeff chat, which exists for not-yet-completed
            // lessons and during a retake; omit it on plain completed replays.
            onReread={(!isCompleted || retaking) ? handleMasteryReread : undefined}
          />
        )
      default:
        return null
    }
  }

  return (
    <HintProvider key={lesson.id} total={2}>
    <QuizSessionProvider key={`quiz-${lesson.id}-${retakeCount}`} lessonId={lesson.id} concept={lesson.category}>
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-14 gap-4">
            {/* Back arrow on the pre-start overview and after completion. */}
            {(!lessonStarted || lessonFinished || isCompleted) && (
              <Button variant="ghost" size="icon" onClick={() => navigate("/lessons")}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="font-semibold text-sm truncate">{lesson.title}</h1>
              {lessonStarted && !lessonFinished && (
                <div className="flex items-center gap-2 mt-0.5">
                  <Progress value={sectionProgress} className="h-1 flex-1 max-w-[120px]" />
                  <span className="text-[10px] text-muted-foreground">{displayStep}/{walkSections.length}</span>
                </div>
              )}
            </div>
            <Badge variant="outline" className="text-xs">{lesson.lessonNumber}</Badge>
            {/* Exit: always available so a student can leave a lesson mid-way and
                come back later. Progress on completed sections is already saved. */}
            {lessonStarted && !lessonFinished && (!isCompleted || retaking) && (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Exit lesson"
                title="Exit lesson"
                onClick={() => navigate("/lessons")}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {!lessonStarted && (!isCompleted || retaking) ? (
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
                      <Coins className="w-4 h-4 text-gold" /> Earn InvestiCoins for every question you get right
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
              <Button
                size="lg"
                variant="hero"
                onClick={() => setChatOpen(true)}
                className="w-full h-16 text-xl font-bold rounded-2xl shadow-lg shadow-primary/30"
              >
                Start Mission <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
              <p className="text-sm text-muted-foreground mt-3">👆 Tap here to begin — 💬 Jeff will teach you this one in chat</p>
            </div>
          </div>
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
        ) : (lessonFinished || isCompleted) && !(retaking && !lessonFinished) ? (
          /* ─── Completion screen: satisfying, numbers roll up, Jeff above ─── */
          <LessonCompletionScreen
            correct={totalCorrect}
            attempts={totalAttempts}
            storedQuizScore={progress?.quizScore}
            reflectionDone={reflectionDone}
            reflectionBonus={REFLECTION_BONUS}
            onContinue={() => navigate("/lessons?category=" + lesson.category)}
            onRetake={handleRetake}
            // Store the true whole-lesson accuracy so a later replay shows the
            // real score, not the mastery-only ~100%. (finishLesson marks the
            // lesson complete; this refines the persisted score to the honest one.)
            onScore={(pct) => updateLessonProgress(lesson.id, true, pct)}
          />
        ) : (
          /* ─── Active section rendering (interactive walk, no concept steps) ─── */
          <div className="space-y-6">
            {renderSection(walkSections[currentSectionIdx], currentSectionIdx)}
          </div>
        )}
      </main>

      {/* ─── Chat with Jeff: the conversational lesson (replaces reading) ─── */}
      {chatOpen && (!isCompleted || retaking) && (
        <JeffChat
          lesson={lesson}
          // Offline/no-credits fallback: Jeff teaches the lesson's own
          // concept content as a scripted chat instead of erroring. Deep
          // lessons walk the full curriculum rather than a 7-beat summary.
          script={buildScript(sections, deepLesson)}
          // Grounds the live AI in the lesson's authored concept content for
          // EVERY track, so Jeff teaches the same material the quiz is written
          // from - fixing questions that tested things the chat never covered.
          source={conceptSource || undefined}
          // Forces Jeff to teach every topic the quiz will test, when the
          // questions carry concept tags (Gulliver Intro today; harmless empty
          // elsewhere until more lessons are tagged).
          mustCover={mustCoverTopics.length ? mustCoverTopics : undefined}
          onQuizReady={handleChatQuizReady}
          // Exit leaves the lesson entirely. JeffChat persists the conversation
          // per-lesson, so returning to this lesson resumes Jeff's class.
          onClose={() => navigate("/lessons")}
        />
      )}
    </div>
    </QuizSessionProvider>
    </HintProvider>
  )
}
