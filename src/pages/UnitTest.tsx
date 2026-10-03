import React, { useState, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useTranslation, Trans } from "react-i18next"
import { useApp } from "@/contexts/AppContext"
import { getUnitTestByCategory } from "@/data/unitTestQuestions"
import { categoryInfo } from "@/data/lessons"
import { LessonCategory } from "@/types"
import { shuffleQuestionSet } from "@/lib/mcqEngine"
import { useContentTranslation } from "@/i18n/contentTranslation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { JeffMascot } from "@/components/JeffMascot"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  XCircle,
  Trophy,
  Coins,
  AlertTriangle
} from "lucide-react"

export default function UnitTest() {
  const { t } = useTranslation()
  const { category } = useParams<{ category: string }>()
  const navigate = useNavigate()
  const { unitTestProgress, updateUnitTestProgress, earnJeffs } = useApp()

  const [started, setStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [testComplete, setTestComplete] = useState(false)

  const unitTest = getUnitTestByCategory(category as LessonCategory)
  const catInfo = categoryInfo[category as LessonCategory]
  const existingProgress = unitTestProgress.find(p => p.category === category)

  // Shuffle & validate all questions through the MCQ engine for balanced positions & lengths
  const shuffledQuestions = useMemo(
    () => unitTest ? shuffleQuestionSet(unitTest.questions) : [],
    [unitTest]
  )

  // Runtime content translation of the CURRENTLY-displayed question only.
  // Grading stays index-based on the original English values below; we only
  // translate the strings the student actually reads.
  const currentQ = shuffledQuestions[currentQuestion]
  const { tc } = useContentTranslation(
    currentQ ? [currentQ.question, ...currentQ.options, currentQ.explanation] : []
  )

  if (!unitTest || !catInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">{t("unitTest.notFound")}</h2>
          <Button onClick={() => navigate("/lessons")}>{t("unitTest.backToLessons")}</Button>
        </div>
      </div>
    )
  }

  const handleStartTest = () => {
    setStarted(true)
  }

  const handleSelectAnswer = (index: number) => {
    if (!showFeedback) {
      setSelectedAnswer(index)
      setShowFeedback(true)
    }
  }

  const handleNextQuestion = () => {
    const newAnswers = [...answers, selectedAnswer!]
    setAnswers(newAnswers)
    setSelectedAnswer(null)
    setShowFeedback(false)

    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      // Calculate final score using shuffled questions
      const correctCount = newAnswers.filter(
        (a, i) => a === shuffledQuestions[i].correctAnswer
      ).length
      const scorePercent = Math.round((correctCount / shuffledQuestions.length) * 100)
      const passed = scorePercent >= unitTest.passingScore

      updateUnitTestProgress(category!, passed, scorePercent)

      if (passed && !existingProgress?.completed) {
        earnJeffs(unitTest.reward, `Passed ${catInfo.title} Unit Test`)
      }

      setTestComplete(true)
    }
  }

  const isCorrectAnswer = selectedAnswer === currentQ?.correctAnswer
  const finalScore = testComplete
    ? Math.round(
        (answers.filter((a, i) => a === shuffledQuestions[i].correctAnswer).length /
          shuffledQuestions.length) *
          100
      )
    : 0
  const passed = finalScore >= unitTest.passingScore

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
              <h1 className="font-display font-bold text-sm truncate">{unitTest.title}</h1>
            </div>
            <div className="flex items-center gap-2 text-warning text-sm">
              <Trophy className="w-4 h-4" />
              <span className="font-semibold">{unitTest.reward} InvestiCoins</span>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {!started ? (
          // Pre-test screen
          <Card variant="elevated">
            <CardHeader className="text-center">
              <JeffMascot
                size="sm"
                message={t("unitTest.preMascot")}
                className="mb-4"
              />
              <CardTitle className="text-2xl">{unitTest.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-center text-muted-foreground">
                {unitTest.description}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-primary">{unitTest.questions.length}</p>
                  <p className="text-sm text-muted-foreground">{t("unitTest.questions")}</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-warning">{unitTest.passingScore}%</p>
                  <p className="text-sm text-muted-foreground">{t("unitTest.toPass")}</p>
                </div>
              </div>

              {existingProgress?.completed && (
                <div className="bg-success/10 border border-success/20 rounded-xl p-4 text-center">
                  <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                  <p className="font-medium text-success">
                    {t("unitTest.alreadyPassed", { score: existingProgress.score })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("unitTest.canRetake")}
                  </p>
                </div>
              )}

              <div className="bg-warning/10 border border-warning/20 rounded-xl p-4">
                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-warning">{t("unitTest.examRules")}</p>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      <li>• {t("unitTest.rule1")}</li>
                      <li>• {t("unitTest.rule2")}</li>
                      <li>• {t("unitTest.rule3", { score: unitTest.passingScore, reward: unitTest.reward })}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button variant="hero" size="lg" className="w-full" onClick={handleStartTest}>
                {t("unitTest.startExam")}
                <ArrowRight className="ml-2" />
              </Button>
            </CardContent>
          </Card>
        ) : !testComplete ? (
          // Active test
          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>
                    {t("unitTest.questionProgress", { current: currentQuestion + 1, total: unitTest.questions.length })}
                  </span>
                  <span className="text-muted-foreground">
                    {/* Compare against the SHUFFLED set - answers were recorded against it */}
                    {t("unitTest.correctCount", { count: answers.filter((a, i) => a === shuffledQuestions[i]?.correctAnswer).length })}
                  </span>
                </div>
                <Progress
                  value={((currentQuestion + 1) / unitTest.questions.length) * 100}
                />
              </div>

              <h3 className="text-lg font-bold mb-6">{tc(currentQ.question)}</h3>

              <div className="space-y-3">
                {currentQ.options.map((option, index) => {
                  const isSelected = selectedAnswer === index
                  const isCorrect = index === currentQ.correctAnswer
                  const showAsCorrect = showFeedback && isCorrect
                  const showAsWrong = showFeedback && isSelected && !isCorrect

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectAnswer(index)}
                      disabled={showFeedback}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                        showAsCorrect
                          ? "border-success bg-success/10 text-success"
                          : showAsWrong
                          ? "border-destructive bg-destructive/10 text-destructive"
                          : isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary hover:bg-muted/50"
                      } ${showFeedback ? "cursor-default" : "cursor-pointer"}`}
                    >
                      {showAsCorrect && <CheckCircle className="w-5 h-5 flex-shrink-0" />}
                      {showAsWrong && <XCircle className="w-5 h-5 flex-shrink-0" />}
                      <span>{tc(option)}</span>
                    </button>
                  )
                })}
              </div>

              {showFeedback && (
                <div
                  className={`mt-4 p-4 rounded-lg ${
                    isCorrectAnswer
                      ? "bg-success/10 border border-success/20"
                      : "bg-amber-500/10 border border-amber-500/20"
                  }`}
                >
                  <p
                    className={`font-medium ${
                      isCorrectAnswer ? "text-success" : "text-amber-600"
                    }`}
                  >
                    {isCorrectAnswer ? t("unitTest.correct") : t("unitTest.notQuite")}
                  </p>
                  {!isCorrectAnswer && (
                    <div className="mt-3 space-y-3">
                      <div className="bg-background/50 rounded-lg p-3">
                        <p className="text-sm font-medium text-foreground">{t("unitTest.whyMatters")}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {tc(currentQ.explanation)}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <Trans
                          i18nKey="unitTest.correctAnswerIs"
                          values={{ answer: tc(currentQ.options[currentQ.correctAnswer]) }}
                          components={{ b: <strong className="text-foreground" /> }}
                        />
                      </p>
                    </div>
                  )}
                </div>
              )}

              {showFeedback && (
                <div className="mt-6 text-center">
                  <Button onClick={handleNextQuestion}>
                    {currentQuestion < unitTest.questions.length - 1 ? (
                      <>
                        {t("unitTest.nextQuestion")} <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    ) : (
                      <>
                        {t("unitTest.seeResults")} <CheckCircle className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          // Results screen
          <Card variant="elevated">
            <CardHeader className="text-center">
              <JeffMascot
                size="sm"
                message={passed ? t("unitTest.resultMascotPass") : t("unitTest.resultMascotFail")}
                className="mb-4"
              />
              <CardTitle className="text-2xl">
                {passed ? t("unitTest.congrats") : t("unitTest.almostThere")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-5xl font-bold text-primary">{finalScore}%</p>
                <p className="text-muted-foreground">
                  {/* Compare against the SHUFFLED set - answers were recorded against it */}
                  {t("unitTest.scoreOf", {
                    correct: answers.filter((a, i) => a === shuffledQuestions[i]?.correctAnswer).length,
                    total: shuffledQuestions.length,
                  })}
                </p>
              </div>

              {passed ? (
                <div className="bg-success/10 border border-success/20 rounded-xl p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Coins className="w-8 h-8 text-warning" />
                    <span className="text-3xl font-bold text-warning">+{unitTest.reward}</span>
                  </div>
                  <p className="text-success font-medium">{t("unitTest.jeffsEarned")}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t("unitTest.youPassed", { title: catInfo.title })}
                  </p>
                </div>
              ) : (
                <div className="bg-warning/10 border border-warning/20 rounded-xl p-6 text-center">
                  <p className="text-warning font-medium">
                    {t("unitTest.youNeed", { score: unitTest.passingScore })}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t("unitTest.reviewAndRetry")}
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate("/lessons")}
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  {t("unitTest.backToLessons")}
                </Button>
                {!passed && (
                  <Button
                    variant="default"
                    className="flex-1"
                    onClick={() => {
                      setStarted(false)
                      setCurrentQuestion(0)
                      setAnswers([])
                      setSelectedAnswer(null)
                      setShowFeedback(false)
                      setTestComplete(false)
                    }}
                  >
                    {t("unitTest.tryAgain")}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
