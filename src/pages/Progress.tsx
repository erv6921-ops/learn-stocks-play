import React, { useState, useMemo, useEffect } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import i18n from "@/i18n"
import { useApp } from "@/contexts/AppContext"
import { useAuth } from "@/hooks/useAuth"
import { supabase } from "@/integrations/supabase/client"
import GameNav from "@/components/GameNav"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { anchor } from "@/lib/tourAnchors"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress as ProgressBar } from "@/components/ui/progress"
import { lessons, unitInfo, getLessonsByUnit } from "@/data/lessons"
import { hasUnfinishedBenchmark } from "@/lib/benchmarkProgress"
import { motion } from "framer-motion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Target, TrendingUp, TrendingDown, BookOpen, ChevronRight,
  BarChart3, GraduationCap, CheckCircle2, Clock, Circle,
  Sparkles, AlertCircle, LayoutGrid, Layers
} from "lucide-react"
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip as RechartsTooltip
} from "recharts"

// ── Dynamic unit-level category data derived from unitInfo ──

interface UnitScore {
  unitId: string
  unitNumber: number
  title: string
  shortTitle: string
  level: number
  completionPercent: number
  masteryScore: number
  masteryTier: "not-started" | "strength" | "growing" | "development"
  hasActivity: boolean
  done: number
  total: number
  quizAvg: number
  status: "not-started" | "in-progress" | "complete"
  group: string
}

// Cluster units into readable groups for grouped radar view
const UNIT_GROUPS: { labelKey: string; levels: number[] }[] = [
  { labelKey: "progress.groups.foundational", levels: [1, 2] },
  { labelKey: "progress.groups.markets", levels: [3, 4] },
  { labelKey: "progress.groups.analysis", levels: [5, 6] },
  { labelKey: "progress.groups.macroBusiness", levels: [7, 8] },
  { labelKey: "progress.groups.advanced", levels: [9, 10] },
]

function getGroupForLevel(level: number): string {
  const g = UNIT_GROUPS.find(g => g.levels.includes(level))
  return g ? i18n.t(g.labelKey) : i18n.t("progress.groups.other")
}

function getMasteryTier(score: number, hasActivity: boolean): UnitScore["masteryTier"] {
  if (!hasActivity) return "not-started"
  if (score >= 75) return "strength"
  if (score >= 50) return "growing"
  return "development"
}

function masteryTierMeta(tier: UnitScore["masteryTier"]): { label: string; color: string; bg: string; border: string } {
  if (tier === "not-started") return { label: i18n.t("progress.tier.notStarted"), color: "text-muted-foreground", bg: "bg-muted/30", border: "border-muted/20" }
  if (tier === "strength") return { label: i18n.t("progress.tier.strength"), color: "text-success", bg: "bg-success/5", border: "border-success/15" }
  if (tier === "growing") return { label: i18n.t("progress.tier.growing"), color: "text-warning", bg: "bg-warning/5", border: "border-warning/15" }
  return { label: i18n.t("progress.tier.development"), color: "text-destructive", bg: "bg-destructive/5", border: "border-destructive/15" }
}

function masteryBarColor(score: number, hasActivity: boolean): string {
  if (!hasActivity) return "bg-muted"
  if (score >= 75) return "bg-success"
  if (score >= 50) return "bg-warning"
  return "bg-destructive"
}

function masteryLabelColor(score: number, hasActivity: boolean): string {
  if (!hasActivity) return "text-muted-foreground"
  if (score >= 75) return "text-success"
  if (score >= 50) return "text-warning"
  return "text-destructive"
}

// Custom radar tooltip
function CustomRadarTooltip({ active, payload }: any) {
  if (!active || !payload?.[0]) return null
  const data = payload[0].payload
  const tier = masteryTierMeta(getMasteryTier(data.score, data.hasActivity))
  return (
    <div className="bg-card border border-border rounded-xl px-4 py-3 shadow-lg">
      <p className="text-sm font-semibold">{data.category}</p>
      <p className="text-lg font-bold text-primary">{data.hasActivity ? `${data.score}%` : "-"}</p>
      <p className={`text-xs font-medium ${tier.color}`}>{tier.label}</p>
    </div>
  )
}

// Lesson id -> title, for labelling teacher grades.
const LESSON_TITLE = new Map(lessons.map((l) => [l.id, l.title]))

interface StudentGrade { lesson_id: string; grade_percent: number | null; feedback: string | null }

export default function ProgressPage() {
  const { t } = useTranslation()
  const { user, lessonProgress, unitTestProgress } = useApp()
  const { isTeacher } = useAuth()

  // Teacher-assigned per-lesson grades for this student (their report card).
  const [lessonGrades, setLessonGrades] = useState<StudentGrade[]>([])
  useEffect(() => {
    if (!user?.id) return
    let cancelled = false
    ;(async () => {
      const { data } = await (supabase as any)
        .from("lesson_grades")
        .select("lesson_id, grade_percent, feedback")
        .eq("user_id", user.id)
      if (!cancelled) setLessonGrades((data ?? []) as StudentGrade[])
    })()
    return () => { cancelled = true }
  }, [user?.id])

  const gradedLessons = useMemo(
    () => lessonGrades
      .filter((g) => g.grade_percent != null)
      .sort((a, b) => (LESSON_TITLE.get(a.lesson_id) || a.lesson_id).localeCompare(LESSON_TITLE.get(b.lesson_id) || b.lesson_id)),
    [lessonGrades]
  )
  const gradeAverage = gradedLessons.length
    ? Math.round(gradedLessons.reduce((s, g) => s + (g.grade_percent as number), 0) / gradedLessons.length)
    : null
  const [viewMode, setViewMode] = useState<"my" | "class">("my")
  const [chartView, setChartView] = useState<"all" | "grouped">("grouped")
  const [evolutionMode, setEvolutionMode] = useState<"overall" | "category">("overall")
  const [selectedCategory, setSelectedCategory] = useState(unitInfo.find(u => (u.track ?? "regular") === "regular")?.id || "")

  const benchmarkCategoryScores = user?.benchmarkCategoryScores || null
  const benchmarkTaken = !!benchmarkCategoryScores && Object.keys(benchmarkCategoryScores).length > 0
  // Started the benchmark before but didn't finish - offer to resume instead of
  // "take it now". Read once on mount (localStorage isn't reactive).
  const [benchmarkInProgress] = useState(() => hasUnfinishedBenchmark())

  const getBenchmarkPercentForUnit = (unitId: string) => {
    const unit = unitInfo.find(u => u.id === unitId)
    if (!unit || !benchmarkCategoryScores) return null

    let totalCorrect = 0
    let totalQuestions = 0
    unit.categories.forEach(category => {
      const score = benchmarkCategoryScores[category]
      if (score) {
        totalCorrect += score.correct
        totalQuestions += score.total
      }
    })

    if (totalQuestions === 0) return null
    return Math.round((totalCorrect / totalQuestions) * 100)
  }

  // ── Compute per-unit completion + mastery from lesson data + benchmark ──
  const unitScores: UnitScore[] = useMemo(() => {
    return unitInfo.filter(u => (u.track ?? "regular") === "regular").map(unit => {
      const ul = getLessonsByUnit(unit.id)
      const done = ul.filter(l => lessonProgress.find(p => p.lessonId === l.id && p.completed)).length
      const total = ul.length
      const quizScores = ul
        .map(l => lessonProgress.find(p => p.lessonId === l.id)?.quizScore)
        .filter((s): s is number => s != null)

      const quizAvg = quizScores.length > 0
        ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length)
        : 0

      const completionPercent = total > 0 ? Math.round((done / total) * 100) : 0
      const benchmarkPercent = getBenchmarkPercentForUnit(unit.id)
      const hasLessonActivity = done > 0 || quizScores.length > 0
      const hasBenchmarkActivity = benchmarkPercent != null
      const hasActivity = hasLessonActivity || hasBenchmarkActivity

      const masteryScore = hasLessonActivity
        ? (quizScores.length > 0
          ? Math.round(completionPercent * 0.7 + quizAvg * 0.3)
          : completionPercent)
        : (benchmarkPercent ?? 0)

      const status = done === 0 ? "not-started" as const : done === total ? "complete" as const : "in-progress" as const
      const words = unit.title.split(" ")
      const shortTitle = words.length > 2 ? words.slice(0, 2).join(" ") : unit.title

      return {
        unitId: unit.id,
        unitNumber: unit.unitNumber,
        title: unit.title,
        shortTitle,
        level: unit.level,
        completionPercent,
        masteryScore,
        masteryTier: getMasteryTier(masteryScore, hasActivity),
        hasActivity,
        done,
        total,
        quizAvg,
        status,
        group: getGroupForLevel(unit.level),
      }
    })
  }, [lessonProgress, benchmarkCategoryScores])

  const hasAnyActivity = unitScores.some(u => u.hasActivity)

  // ── Grouped scores for grouped radar (mastery score) ──
  const groupedScores = useMemo(() => {
    return UNIT_GROUPS.map(g => {
      const units = unitScores.filter(u => g.levels.includes(u.level))
      const active = units.filter(u => u.hasActivity)
      const avgScore = active.length > 0
        ? Math.round(active.reduce((sum, u) => sum + u.masteryScore, 0) / active.length)
        : 0
      return {
        category: i18n.t(g.labelKey),
        score: avgScore,
        hasActivity: active.length > 0,
        fullMark: 100,
        unitCount: units.length,
        activeCount: active.length,
      }
    })
  }, [unitScores])

  // ── All-units radar data (mastery score) ──
  const allUnitsRadarData = useMemo(() => {
    return unitScores.map(u => ({
      category: u.shortTitle,
      score: u.masteryScore,
      hasActivity: u.hasActivity,
      fullMark: 100,
    }))
  }, [unitScores])

  const radarData = chartView === "grouped" ? groupedScores : allUnitsRadarData

  // ── Overall metrics ──
  const overallMasteryScore = useMemo(() => {
    const active = unitScores.filter(u => u.hasActivity)
    if (active.length === 0) return 0
    return Math.round(active.reduce((sum, u) => sum + u.masteryScore, 0) / active.length)
  }, [unitScores])

  const overallCompletion = useMemo(() => {
    const totalLessons = unitScores.reduce((sum, u) => sum + u.total, 0)
    if (totalLessons === 0) return 0
    const completedLessons = unitScores.reduce((sum, u) => sum + u.done, 0)
    return Math.round((completedLessons / totalLessons) * 100)
  }, [unitScores])

  // ── Strength / Growing / Development zones (mastery thresholds) ──
  const strengthZones = unitScores
    .filter(s => s.hasActivity && s.masteryScore >= 75)
    .sort((a, b) => b.masteryScore - a.masteryScore)
    .slice(0, 3)

  const growingZones = unitScores
    .filter(s => s.hasActivity && s.masteryScore >= 50 && s.masteryScore < 75)
    .sort((a, b) => b.masteryScore - a.masteryScore)
    .slice(0, 3)

  const developmentZones = unitScores
    .filter(s => s.hasActivity && s.masteryScore < 50)
    .sort((a, b) => a.masteryScore - b.masteryScore)
    .slice(0, 3)

  // ── Growth timeline ──
  const growthData = useMemo(() => {
    const points: { date: string; score: number }[] = []
    unitTestProgress
      .filter(p => p.completed)
      .sort((a, b) => new Date(a.completedAt || 0).getTime() - new Date(b.completedAt || 0).getTime())
      .forEach(p => {
        points.push({
          date: new Date(p.completedAt || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          score: p.score
        })
      })
    return points
  }, [unitTestProgress])

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <GameNav />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="flex items-center justify-between mb-1.5">
            <h1 className="font-display text-[28px] md:text-[32px] font-bold tracking-tight">{t("progress.title")}</h1>
            {isTeacher && (
              <div className="flex gap-1 bg-muted rounded-xl p-1">
                <button
                  onClick={() => setViewMode("my")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${viewMode === "my" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {t("progress.myProgress")}
                </button>
                <button
                  onClick={() => setViewMode("class")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${viewMode === "class" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {t("progress.classAverage")}
                </button>
              </div>
            )}
          </div>
          <p className="text-muted-foreground text-sm mb-8">{t("progress.subtitle")}</p>
        </motion.div>

        {/* ─── REPORT CARD: teacher's per-lesson grades + average ─── */}
        {gradeAverage != null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <Card variant="elevated">
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      {t("progress.reportCard.title")}
                    </CardTitle>
                    <CardDescription>
                      {t("progress.reportCard.description", { count: gradedLessons.length })}
                    </CardDescription>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{t("progress.average")}</p>
                    <p className="text-3xl font-extrabold tabular-nums text-primary leading-none">{gradeAverage}%</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {gradedLessons.map((g) => (
                    <div key={g.lesson_id} className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl bg-muted/30">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">{LESSON_TITLE.get(g.lesson_id) || g.lesson_id}</p>
                        {g.feedback && (
                          <p className="text-xs text-muted-foreground truncate">{g.feedback}</p>
                        )}
                      </div>
                      <Badge
                        variant="outline"
                        className={`font-bold tabular-nums shrink-0 ${
                          (g.grade_percent as number) >= 75 ? "text-success border-success/20"
                          : (g.grade_percent as number) >= 50 ? "text-warning border-warning/20"
                          : "text-destructive border-destructive/20"
                        }`}
                      >
                        {g.grade_percent}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {!benchmarkTaken ? (
          /* ── Benchmark not taken - CTA + skeleton ── */
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <Card variant="elevated" className="text-center overflow-hidden relative max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-warning/5 pointer-events-none" />
              <CardHeader className="relative">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">
                  {benchmarkInProgress ? t("progress.benchmarkCta.titleResume") : t("progress.benchmarkCta.title")}
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  {benchmarkInProgress
                    ? t("progress.benchmarkCta.descriptionResume")
                    : t("progress.benchmarkCta.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="relative space-y-4">
                <Link to="/onboarding?benchmark=1">
                  <Button variant="hero" size="lg" className="press-scale w-full">
                    <Target className="w-5 h-5 mr-2" />
                    {benchmarkInProgress ? t("progress.benchmarkCta.buttonResume") : t("progress.benchmarkCta.button")}
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {t("progress.benchmarkCta.note")}
                </p>
              </CardContent>
            </Card>

            {/* Skeleton radar placeholder */}
            <Card variant="elevated" className="overflow-hidden">
              <CardContent className="pt-6 pb-6">
                <div className="h-[280px] rounded-2xl bg-muted/20 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-10 h-10 mx-auto text-muted-foreground/15 mb-3" />
                    <p className="text-sm text-muted-foreground/50 font-medium">{t("progress.assessmentPlaceholder")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* ─── VISUAL SUMMARY BAR ─── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card variant="elevated">
                <CardContent className="pt-6 pb-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("progress.overallCompletion")}</p>
                      <p className="text-3xl font-bold text-foreground">{overallCompletion}%</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t("progress.overallMasteryScore")}: {hasAnyActivity ? `${overallMasteryScore}%` : t("progress.notAssessed")}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-success inline-block" /> {t("progress.legend.strength")}</span>
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-warning inline-block" /> {t("progress.legend.growing")}</span>
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-destructive/60 inline-block" /> {t("progress.legend.development")}</span>
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-muted inline-block" /> {t("progress.notAssessed")}</span>
                    </div>
                  </div>
                  {/* Segmented bar - all units */}
                  <div className="flex gap-0.5 h-3 rounded-full overflow-hidden bg-muted/30">
                    {unitScores.map((u, i) => (
                      <motion.div
                        key={u.unitId}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 + i * 0.02 }}
                        className={`flex-1 rounded-sm ${masteryBarColor(u.masteryScore, u.hasActivity)} origin-left`}
                        title={`${u.title}: ${t("progress.completion")} ${u.completionPercent}% · ${t("progress.mastery")} ${u.hasActivity ? `${u.masteryScore}%` : t("progress.notAssessed")}`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* ─── SECTION 1: BENCHMARK ASSESSMENT PROGRESS ─── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card variant="elevated" ref={anchor("progress-overview")}>
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        {t("progress.benchmarkSection.title")}
                      </CardTitle>
                      <CardDescription>
                        {t("progress.benchmarkSection.description")}
                      </CardDescription>
                    </div>
                    <div className="flex gap-1 bg-muted rounded-xl p-1">
                      <button
                        onClick={() => setChartView("grouped")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${chartView === "grouped" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        <Layers className="w-3 h-3" /> {t("progress.chartView.grouped")}
                      </button>
                      <button
                        onClick={() => setChartView("all")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${chartView === "all" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        <LayoutGrid className="w-3 h-3" /> {t("progress.chartView.allUnits")}
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      className="rounded-2xl bg-muted/30 p-3"
                      style={{ height: chartView === "all" ? 380 : 320 }}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      key={chartView}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={radarData} cx="50%" cy="50%" outerRadius={chartView === "all" ? "60%" : "70%"}>
                          <PolarGrid stroke="hsl(var(--border))" />
                          <PolarAngleAxis
                            dataKey="category"
                            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: chartView === "all" ? 8 : 11, fontWeight: 600 }}
                          />
                          <PolarRadiusAxis
                            angle={30}
                            domain={[0, 100]}
                            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }}
                          />
                          <Radar
                            name="Score"
                            dataKey="score"
                            stroke="hsl(var(--primary))"
                            fill="hsl(var(--primary))"
                            fillOpacity={0.2}
                            strokeWidth={2}
                            animationDuration={800}
                            animationEasing="ease-out"
                          />
                          <RechartsTooltip content={<CustomRadarTooltip />} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </motion.div>

                    <div className="space-y-5">
                      <div>
                        <h4 className="text-sm font-bold text-success flex items-center gap-1.5 mb-2.5">
                          <Sparkles className="w-4 h-4" /> {t("progress.areas.strongTitle")}
                        </h4>
                        {strengthZones.length > 0 ? strengthZones.map(s => {
                          const tier = masteryTierMeta(s.masteryTier)
                          return (
                            <motion.div
                              key={s.unitId}
                              initial={{ opacity: 0, x: 8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3 }}
                              className={`flex items-center justify-between p-3 rounded-xl ${tier.bg} border ${tier.border} mb-2 hover:shadow-sm transition-all`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="w-1 h-8 rounded-full bg-success" />
                                <div>
                                  <span className="text-sm font-medium truncate block">{s.title}</span>
                                  <span className="text-[11px] text-muted-foreground">{t("progress.areas.strongDetail")}</span>
                                </div>
                              </div>
                              <Badge variant="outline" className={`${tier.color} border-current/20 font-bold shrink-0`}>{s.masteryScore}%</Badge>
                            </motion.div>
                          )
                        }) : (
                          <p className="text-sm text-muted-foreground">{t("progress.areas.strongEmpty")}</p>
                        )}
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-warning flex items-center gap-1.5 mb-2.5">
                          <TrendingUp className="w-4 h-4" /> {t("progress.areas.mediumTitle")}
                        </h4>
                        {growingZones.length > 0 ? growingZones.map(s => {
                          const tier = masteryTierMeta(s.masteryTier)
                          return (
                            <motion.div
                              key={s.unitId}
                              initial={{ opacity: 0, x: 8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.05 }}
                              className={`flex items-center justify-between p-3 rounded-xl ${tier.bg} border ${tier.border} mb-2 hover:shadow-sm transition-all`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="w-1 h-8 rounded-full bg-warning" />
                                <div>
                                  <span className="text-sm font-medium truncate block">{s.title}</span>
                                  <span className="text-[11px] text-muted-foreground">{t("progress.areas.mediumDetail")}</span>
                                </div>
                              </div>
                              <Badge variant="outline" className={`${tier.color} border-current/20 font-bold shrink-0`}>{s.masteryScore}%</Badge>
                            </motion.div>
                          )
                        }) : (
                          <p className="text-sm text-muted-foreground">{t("progress.areas.mediumEmpty")}</p>
                        )}
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-destructive flex items-center gap-1.5 mb-2.5">
                          <Target className="w-4 h-4" /> {t("progress.areas.weakTitle")}
                        </h4>
                        {developmentZones.length > 0 ? developmentZones.map(s => {
                          const tier = masteryTierMeta(s.masteryTier)
                          return (
                            <motion.div
                              key={s.unitId}
                              initial={{ opacity: 0, x: 8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                              className={`flex items-center justify-between p-3 rounded-xl ${tier.bg} border ${tier.border} mb-2 hover:shadow-sm transition-all`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="w-1 h-8 rounded-full bg-destructive/60" />
                                <div>
                                  <span className="text-sm font-medium truncate block">{s.title}</span>
                                  <span className="text-[11px] text-muted-foreground">{t("progress.areas.weakDetail")}</span>
                                </div>
                              </div>
                              <Badge variant="outline" className={`${tier.color} border-current/20 font-bold shrink-0`}>{s.masteryScore}%</Badge>
                            </motion.div>
                          )
                        }) : (
                          <p className="text-sm text-muted-foreground">{t("progress.areas.weakEmpty")}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* ─── UNIT BREAKDOWN GRID ─── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LayoutGrid className="w-5 h-5 text-primary" />
                    {t("progress.unitBreakdown.title")}
                  </CardTitle>
                  <CardDescription>{t("progress.unitBreakdown.description")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {unitScores.map((u, i) => {
                      const tier = masteryTierMeta(u.masteryTier)
                      return (
                        <motion.div
                          key={u.unitId}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, delay: 0.3 + i * 0.02 }}
                          className={`p-4 rounded-xl border ${tier.border} ${tier.bg} hover:shadow-md transition-all`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="min-w-0 flex-1">
                              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{t("progress.unitLabel", { number: u.unitNumber })}</p>
                              <p className="text-sm font-semibold truncate">{u.title}</p>
                            </div>
                            <span className="text-lg font-bold text-foreground shrink-0 ml-2">
                              {u.total > 0 ? `${u.completionPercent}%` : "-"}
                            </span>
                          </div>

                          {/* Completion progress bar (primary) */}
                          <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden mb-2">
                            <div
                              className="h-full rounded-full transition-all duration-500 bg-primary"
                              style={{ width: `${u.completionPercent}%` }}
                            />
                          </div>

                          <div className="flex items-center justify-between gap-2">
                            {u.status === "complete" ? (
                              <Badge className="bg-success/10 text-success border-success/20 text-[9px]">{t("progress.status.mastered")}</Badge>
                            ) : u.status === "in-progress" ? (
                              <Badge variant="outline" className="text-[9px] text-primary border-primary/20">{t("progress.status.inProgress")}</Badge>
                            ) : (
                              <Badge variant="outline" className="text-[9px] text-muted-foreground">{t("progress.status.notStarted")}</Badge>
                            )}
                            <span className="text-[10px] text-muted-foreground">{t("progress.lessonsCount", { done: u.done, total: u.total })}</span>
                          </div>

                          <p className={`text-[10px] mt-2 font-medium ${masteryLabelColor(u.masteryScore, u.hasActivity)}`}>
                            {t("progress.masteryScore")}: {u.hasActivity ? `${u.masteryScore}%` : "-"}
                          </p>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* ─── SECTION 2: YOUR LEARNING EVOLUTION ─── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        {t("progress.evolution.title")}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1 bg-muted rounded-xl p-1">
                        <button
                          onClick={() => setEvolutionMode("overall")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${evolutionMode === "overall" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                        >
                          {t("progress.overallMasteryScore")}
                        </button>
                        <button
                          onClick={() => setEvolutionMode("category")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${evolutionMode === "category" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                        >
                          {t("progress.evolution.byUnit")}
                        </button>
                      </div>
                      {evolutionMode === "category" && (
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                          <SelectTrigger className="w-[180px] h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {unitInfo.filter(u => (u.track ?? "regular") === "regular").map(u => (
                              <SelectItem key={u.id} value={u.id}>{t("progress.unitTitle", { number: u.unitNumber, title: u.title })}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {growthData.length >= 2 ? (
                    <motion.div
                      className="h-[260px] rounded-2xl bg-muted/20 p-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={growthData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                          <YAxis domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                          <RechartsTooltip
                            contentStyle={{
                              background: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "12px",
                              fontSize: "12px"
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="score"
                            stroke="hsl(var(--primary))"
                            strokeWidth={2.5}
                            dot={{ fill: "hsl(var(--primary))", r: 5, strokeWidth: 2, stroke: "hsl(var(--background))" }}
                            activeDot={{ r: 7, fill: "hsl(var(--primary))", stroke: "hsl(var(--primary))", strokeWidth: 3, filter: "drop-shadow(0 0 6px hsl(var(--primary) / 0.4))" }}
                            animationDuration={1000}
                            animationEasing="ease-out"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </motion.div>
                  ) : (
                    <div className="text-center py-10 rounded-2xl bg-muted/20 border border-dashed border-border/40">
                      <BookOpen className="w-8 h-8 mx-auto text-muted-foreground/30 mb-3" />
                      <p className="text-sm text-muted-foreground">
                        {growthData.length === 1
                          ? t("progress.evolution.emptyOne")
                          : t("progress.evolution.emptyNone")}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* ─── SECTION 3: CURRICULUM PROGRESS TABLE ─── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    {t("progress.curriculum.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="grid grid-cols-[1fr_100px_80px_100px] gap-2 px-3 py-2 text-[11px] text-muted-foreground font-bold uppercase tracking-wider">
                      <span>{t("progress.table.unit")}</span>
                      <span className="text-center">{t("progress.table.lessons")}</span>
                      <span className="text-center">{t("progress.table.quizAvg")}</span>
                      <span className="text-center">{t("progress.table.status")}</span>
                    </div>
                    {unitScores.map((u, i) => (
                      <motion.div
                        key={u.unitId}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: 0.45 + i * 0.02 }}
                        className="grid grid-cols-[1fr_100px_80px_100px] gap-2 items-center px-3 py-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-semibold truncate">{t("progress.unitTitle", { number: u.unitNumber, title: u.title })}</p>
                        </div>
                        <div className="text-center">
                          <span className="text-sm font-medium">{u.done}/{u.total}</span>
                        </div>
                        <div className="text-center">
                          <span className="text-sm font-medium">{u.quizAvg > 0 ? `${u.quizAvg}%` : "-"}</span>
                        </div>
                        <div className="flex justify-center">
                          {u.status === "complete" ? (
                            <Badge className="bg-success/10 text-success border-success/20 text-[10px]">
                              <CheckCircle2 className="w-3 h-3 mr-1" />{t("progress.status.complete")}
                            </Badge>
                          ) : u.status === "in-progress" ? (
                            <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">
                              <Clock className="w-3 h-3 mr-1" />{t("progress.status.inProgress")}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-muted-foreground text-[10px]">
                              <Circle className="w-3 h-3 mr-1" />{t("progress.status.notStarted")}
                            </Badge>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  )
}
