import React, { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { motion, type Variants } from "framer-motion"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import { useApp } from "@/contexts/AppContext"
import { useNetWorth } from "@/hooks/useNetWorth"
import GameNav from "@/components/GameNav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress as ProgressBar } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog"
import { supabase } from "@/integrations/supabase/client"
import { lessons, unitInfo, getLessonsByUnit } from "@/data/lessons"
import {
  getInitials, getDisplayName, getStreak, getBestStreak, getTotalEarned,
} from "@/lib/playerStats"
import {
  Coins, Zap, Flame, BookOpen, Layers, Award, Star, GraduationCap,
  School, KeyRound, CalendarDays, Sparkles, Store, TrendingUp, TrendingDown,
  Gamepad2, Lock, CheckCircle2, ChevronRight, Trophy, Rocket,
  Pencil, Sun, Moon, Monitor, Palette,
} from "lucide-react"

// ── Curriculum level + progress to next level ─────────────────────────────
// Mirrors GameNav/getCurriculumLevel thresholds so the level matches the HUD,
// but also returns how far along the player is toward the next level.
const LEVEL_THRESHOLDS = [0, 0.05, 0.15, 0.25, 0.36, 0.48, 0.6, 0.72, 0.85, 0.95]

function levelProgress(score: number) {
  let level = 1
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (score >= LEVEL_THRESHOLDS[i]) { level = i + 1; break }
  }
  if (level >= 10) return { level: 10, pct: 100 }
  const lower = LEVEL_THRESHOLDS[level - 1]
  const upper = LEVEL_THRESHOLDS[level]
  const pct = Math.max(0, Math.min(100, ((score - lower) / (upper - lower)) * 100))
  return { level, pct }
}

const BUSINESS_PHASES = ["Idea", "Startup", "Growing", "Established", "Scaling", "Empire"]
const businessPhase = (level: number) =>
  BUSINESS_PHASES[Math.min(Math.max(level - 1, 0), BUSINESS_PHASES.length - 1)]

function timeAgo(date: Date): string {
  const s = Math.floor((Date.now() - date.getTime()) / 1000)
  if (s < 60) return "just now"
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  if (d < 7) return `${d}d ago`
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
}

const fmtDate = (d: Date) =>
  d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })

// Pick an icon for an activity entry based on its reason text.
function activityIcon(reason: string) {
  const r = reason.toLowerCase()
  if (r.includes("bought") || r.includes("buy")) return TrendingUp
  if (r.includes("sold") || r.includes("sell")) return TrendingDown
  if (r.includes("lesson") || r.includes("quiz") || r.includes("unit test")) return BookOpen
  if (r.includes("game") || r.includes("daily") || r.includes("mission")) return Gamepad2
  if (r.includes("business")) return Store
  if (r.includes("streak")) return Flame
  return Coins
}

interface ActivityEntry {
  date: Date
  text: string
  amount: number
  icon: React.ComponentType<{ className?: string }>
}

interface BusinessSnapshot {
  name: string
  type: string
  level: number
  pnl: number
}

// Framer Motion section stagger
const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

export default function Profile() {
  const { user, setUser, lessonProgress, jeffsHistory, portfolio } = useApp()
  const { netWorth } = useNetWorth()
  const { theme, setTheme } = useTheme()

  // ── Edit-name dialog ──
  const [editOpen, setEditOpen] = useState(false)
  const [firstNameInput, setFirstNameInput] = useState("")
  const [lastNameInput, setLastNameInput] = useState("")
  const [saving, setSaving] = useState(false)

  const openEdit = () => {
    setFirstNameInput(user?.firstName ?? "")
    setLastNameInput(user?.lastName ?? "")
    setEditOpen(true)
  }

  const saveName = async () => {
    if (!user?.id) return
    const first = firstNameInput.trim()
    const last = lastNameInput.trim()
    if (!first) {
      toast.error("First name can't be empty")
      return
    }
    setSaving(true)
    const { error } = await supabase
      .from("profiles")
      .update({ first_name: first, last_name: last || null })
      .eq("id", user.id)
    setSaving(false)
    if (error) {
      toast.error("Couldn't save your name. Please try again.")
      return
    }
    setUser({ ...user, firstName: first, lastName: last || undefined })
    setEditOpen(false)
    toast.success("Profile updated")
  }

  const THEME_OPTIONS = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ] as const

  const [dailyGames, setDailyGames] = useState<{ game_type: string; coins_earned: number | null; completed_at: string | null }[]>([])
  const [business, setBusiness] = useState<BusinessSnapshot | null>(null)
  const [extrasLoaded, setExtrasLoaded] = useState(false)

  // Pull the data that isn't already in AppContext: daily-game plays and the
  // micro-business snapshot. RLS scopes everything to the signed-in user.
  useEffect(() => {
    if (!user?.id) return
    let active = true
    void (async () => {
      const [gamesRes, bizRes] = await Promise.all([
        supabase
          .from("daily_game_completions")
          .select("game_type, coins_earned, completed_at")
          .eq("user_id", user.id)
          .order("completed_at", { ascending: false }),
        supabase
          .from("businesses")
          .select("id, name, type, level")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1),
      ])
      if (!active) return
      setDailyGames(gamesRes.data ?? [])

      const biz = bizRes.data?.[0]
      if (biz) {
        const { data: fin } = await supabase
          .from("business_finances")
          .select("revenue, expenses")
          .eq("business_id", biz.id)
        const pnl = (fin ?? []).reduce((s, f) => s + (Number(f.revenue) || 0) - (Number(f.expenses) || 0), 0)
        if (active) setBusiness({ name: biz.name, type: biz.type, level: biz.level, pnl })
      }
      if (active) setExtrasLoaded(true)
    })()
    return () => { active = false }
  }, [user?.id])

  // ── Derived stats ────────────────────────────────────────────────────────
  const lessonsById = useMemo(() => new Map(lessons.map(l => [l.id, l])), [])

  const completedLessons = useMemo(
    () => lessonProgress
      .filter(p => p.completed && lessonsById.has(p.lessonId))
      .map(p => ({ progress: p, lesson: lessonsById.get(p.lessonId)! })),
    [lessonProgress, lessonsById]
  )

  const unitsCompleted = useMemo(() => {
    return unitInfo.filter(u => {
      const ul = getLessonsByUnit(u.id)
      if (ul.length === 0) return false
      const done = ul.filter(l => lessonProgress.some(p => p.lessonId === l.id && p.completed)).length
      return done >= ul.length
    }).length
  }, [lessonProgress])

  // Level mirrors the navbar HUD (Florida core track only).
  const { level, levelPct } = useMemo(() => {
    const floridaUnits = unitInfo.filter(u => (u.track ?? "florida") === "florida")
    const floridaLessonIds = new Set(floridaUnits.flatMap(u => getLessonsByUnit(u.id).map(l => l.id)))
    const totalLessons = floridaLessonIds.size
    const doneLessons = lessonProgress.filter(p => p.completed && floridaLessonIds.has(p.lessonId)).length
    const completionPct = totalLessons > 0 ? doneLessons / totalLessons : 0
    const unitScores = floridaUnits.map(u => {
      const ul = getLessonsByUnit(u.id)
      return { done: ul.filter(l => lessonProgress.some(p => p.lessonId === l.id && p.completed)).length, total: ul.length }
    })
    const unitsFull = unitScores.filter(u => u.total > 0 && u.done >= u.total).length
    const totalUnits = unitScores.filter(u => u.total > 0).length
    const unitMasteryPct = totalUnits > 0 ? unitsFull / totalUnits : 0
    const score = completionPct * 0.6 + unitMasteryPct * 0.4
    const { level, pct } = levelProgress(score)
    return { level, levelPct: pct }
  }, [lessonProgress])

  const streak = useMemo(() => getStreak(jeffsHistory), [jeffsHistory])
  const bestStreak = useMemo(() => getBestStreak(jeffsHistory), [jeffsHistory])
  const totalXP = useMemo(() => getTotalEarned(jeffsHistory), [jeffsHistory])

  // ── Badges ─────────────────────────────────────────────────────────────
  const badges = useMemo(() => {
    const lc = completedLessons.length
    const defs = [
      { id: "first-steps", name: "First Steps", desc: "Complete your first lesson", icon: BookOpen, earned: lc >= 1, need: "Complete 1 lesson" },
      { id: "bookworm", name: "Bookworm", desc: "Complete 10 lessons", icon: GraduationCap, earned: lc >= 10, need: `Complete 10 lessons (${lc}/10)` },
      { id: "scholar", name: "Scholar", desc: "Complete 25 lessons", icon: Star, earned: lc >= 25, need: `Complete 25 lessons (${lc}/25)` },
      { id: "unit-master", name: "Unit Master", desc: "Finish a full unit", icon: Layers, earned: unitsCompleted >= 1, need: "Finish every lesson in a unit" },
      { id: "halfway", name: "Halfway Hero", desc: "Reach Level 5", icon: Trophy, earned: level >= 5, need: `Reach Level 5 (Lv ${level})` },
      { id: "streak-3", name: "Streak Starter", desc: "Hit a 3-day streak", icon: Flame, earned: bestStreak >= 3, need: `Reach a 3-day streak (best ${bestStreak})` },
      { id: "streak-7", name: "On Fire", desc: "Hit a 7-day streak", icon: Sparkles, earned: bestStreak >= 7, need: `Reach a 7-day streak (best ${bestStreak})` },
      { id: "coin-1k", name: "Coin Collector", desc: "Earn 1,000 coins", icon: Coins, earned: totalXP >= 1000, need: `Earn 1,000 coins (${Math.floor(totalXP)}/1,000)` },
      { id: "coin-10k", name: "Big Earner", desc: "Earn 10,000 coins", icon: Zap, earned: totalXP >= 10000, need: `Earn 10,000 coins (${Math.floor(totalXP)}/10,000)` },
      { id: "investor", name: "Market Player", desc: "Buy your first stock", icon: TrendingUp, earned: portfolio.length >= 1, need: "Buy a stock in the market" },
      { id: "entrepreneur", name: "Entrepreneur", desc: "Start a business", icon: Store, earned: !!business, need: "Launch a micro-business" },
      { id: "gamer", name: "Game On", desc: "Play a daily game", icon: Gamepad2, earned: dailyGames.length >= 1, need: "Play a daily game" },
    ]
    return defs
  }, [completedLessons.length, unitsCompleted, level, bestStreak, totalXP, portfolio.length, business, dailyGames.length])

  const earnedBadges = badges.filter(b => b.earned)

  // ── Completed lessons grouped by unit ────────────────────────────────────
  const lessonsByUnit = useMemo(() => {
    const groups = new Map<string, typeof completedLessons>()
    for (const entry of completedLessons) {
      const uid = entry.lesson.unitId
      if (!groups.has(uid)) groups.set(uid, [])
      groups.get(uid)!.push(entry)
    }
    return unitInfo
      .filter(u => groups.has(u.id))
      .map(u => ({
        unit: u,
        items: groups.get(u.id)!.sort((a, b) => a.lesson.lessonNumber.localeCompare(b.lesson.lessonNumber, undefined, { numeric: true })),
      }))
  }, [completedLessons])

  // ── Recent activity feed (last 20) ───────────────────────────────────────
  const activity = useMemo<ActivityEntry[]>(() => {
    const fromHistory: ActivityEntry[] = jeffsHistory.map(h => ({
      date: new Date(h.date),
      text: h.reason,
      amount: h.amount,
      icon: activityIcon(h.reason),
    }))
    const fromGames: ActivityEntry[] = dailyGames
      .filter(g => g.completed_at)
      .map(g => ({
        date: new Date(g.completed_at as string),
        text: `Played ${g.game_type.replace(/[-_]/g, " ")}`,
        amount: g.coins_earned ?? 0,
        icon: Gamepad2,
      }))
    return [...fromHistory, ...fromGames]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 20)
  }, [jeffsHistory, dailyGames])

  const initials = getInitials(user?.firstName, user?.lastName)
  const fullName = getDisplayName(user?.firstName, user?.lastName)
  const memberSince = user?.createdAt ? fmtDate(new Date(user.createdAt)) : "—"

  const stats = [
    { label: "Total XP", value: Math.floor(totalXP).toLocaleString(), icon: Zap, color: "text-accent", bg: "bg-accent/10" },
    { label: "InvestiCoins", value: Math.floor(netWorth).toLocaleString(), icon: Coins, color: "text-gold", bg: "bg-gold/10" },
    { label: "Current Streak", value: `${streak}d`, icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Lessons Done", value: completedLessons.length, icon: BookOpen, color: "text-primary", bg: "bg-primary/10" },
    { label: "Units Done", value: unitsCompleted, icon: Layers, color: "text-secondary", bg: "bg-secondary/10" },
    { label: "Badges", value: earnedBadges.length, icon: Award, color: "text-primary", bg: "bg-primary/10" },
  ]

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <GameNav />
      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 py-8 max-w-5xl space-y-6"
      >
        {/* ── SECTION 1 — USER HEADER ── */}
        <motion.div variants={item}>
          <Card variant="elevated" className="overflow-hidden">
            <div className="bg-gradient-hero h-20 md:h-24" />
            <CardContent className="pt-0">
              <div className="flex flex-col md:flex-row md:items-end gap-4">
                <Avatar className="w-20 h-20 md:w-24 md:h-24 -mt-14 md:-mt-16 border-4 border-card shadow-lg">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl md:text-3xl font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 md:pb-2 min-w-0">
                  <h1 className="text-2xl md:text-3xl font-display font-bold leading-tight break-words">{fullName}</h1>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                    {user?.schoolName && (
                      <span className="flex items-center gap-1.5"><School className="w-4 h-4" />{user.schoolName}</span>
                    )}
                    {user?.grade != null && (
                      <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4" />Grade {user.grade}</span>
                    )}
                    {user?.classCode && (
                      <span className="flex items-center gap-1.5"><KeyRound className="w-4 h-4" />Class {user.classCode}</span>
                    )}
                    <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" />Member since {memberSince}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={openEdit} className="md:pb-0 self-start md:self-end gap-1.5 press-scale">
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </Button>
              </div>

              {/* Level + XP to next level */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5 font-semibold text-sm">
                    <Star className="w-4 h-4 text-primary" /> Level {level}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {level >= 10 ? "Max level reached 🎉" : `${Math.round(levelPct)}% to Level ${level + 1}`}
                  </span>
                </div>
                <ProgressBar value={levelPct} className="h-2.5" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── APPEARANCE ── */}
        <motion.div variants={item}>
          <Card variant="elevated">
            <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Palette className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Appearance</p>
                  <p className="text-xs text-muted-foreground">Choose how InvestiPlay looks</p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-muted/60 rounded-xl p-1 self-start sm:self-auto">
                {THEME_OPTIONS.map(opt => {
                  const activeTheme = (theme ?? "system") === opt.value
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setTheme(opt.value)}
                      aria-pressed={activeTheme}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors press-scale ${
                        activeTheme ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <opt.icon className="w-3.5 h-3.5" /> {opt.label}
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── SECTION 2 — STATS OVERVIEW ── */}
        <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {stats.map(s => (
            <Card key={s.label} variant="elevated" className="hover-lift">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.bg}`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div className="text-xl font-bold leading-none">{s.value}</div>
                <div className="text-[11px] text-muted-foreground font-medium">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* ── SECTION 3 — COMPLETED LESSONS ── */}
        <motion.div variants={item}>
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><BookOpen className="w-5 h-5 text-primary" /> Completed Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              {lessonsByUnit.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Rocket className="w-7 h-7 text-primary" />
                  </div>
                  <p className="font-semibold">No lessons completed yet</p>
                  <p className="text-sm text-muted-foreground mt-1 mb-4">Your finished lessons will show up here.</p>
                  <Link to="/lessons"><Button>Start Learning <ChevronRight className="w-4 h-4 ml-1" /></Button></Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {lessonsByUnit.map(({ unit, items }) => (
                    <div key={unit.id}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                          Unit {unit.unitNumber} · {unit.title}
                        </span>
                        <span className="text-[11px] text-muted-foreground">({items.length})</span>
                      </div>
                      <div className="space-y-2">
                        {items.map(({ lesson, progress }) => (
                          <div key={lesson.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/50">
                            <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-sm truncate">{lesson.lessonNumber} · {lesson.title}</p>
                              {progress.completedAt && (
                                <p className="text-xs text-muted-foreground">{fmtDate(new Date(progress.completedAt))}</p>
                              )}
                            </div>
                            <span className="flex items-center gap-1 text-xs font-bold text-gold shrink-0">
                              <Coins className="w-3.5 h-3.5" /> +{lesson.reward}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* ── SECTION 4 — BADGES ── */}
        <motion.div variants={item}>
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Award className="w-5 h-5 text-primary" /> Badges
                <span className="text-sm font-normal text-muted-foreground">({earnedBadges.length}/{badges.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {earnedBadges.length === 0 && (
                <p className="text-sm text-muted-foreground mb-4">
                  No badges yet — complete lessons, build streaks, and explore to start earning them! 🌟
                </p>
              )}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {badges.map(b => (
                  <div
                    key={b.id}
                    title={b.earned ? b.desc : b.need}
                    className={`relative flex flex-col items-center text-center gap-1.5 p-3 rounded-xl border transition-colors ${
                      b.earned ? "bg-primary/5 border-primary/20" : "bg-muted/30 border-border/50 opacity-60"
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center ${b.earned ? "bg-primary/15" : "bg-muted"}`}>
                      {b.earned
                        ? <b.icon className="w-5 h-5 text-primary" />
                        : <Lock className="w-4 h-4 text-muted-foreground" />}
                    </div>
                    <span className="text-[11px] font-semibold leading-tight">{b.name}</span>
                    <span className="text-[10px] text-muted-foreground leading-tight">
                      {b.earned ? b.desc : b.need}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── SECTION 5 — RECENT ACTIVITY ── */}
        <motion.div variants={item}>
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><Sparkles className="w-5 h-5 text-primary" /> Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {activity.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">No activity yet. Start a lesson to get going!</p>
              ) : (
                <div className="space-y-1.5">
                  {activity.map((a, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/40 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <a.icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <p className="flex-1 text-sm first-letter:uppercase min-w-0 truncate">{a.text}</p>
                      {a.amount !== 0 && (
                        <span className={`text-xs font-bold shrink-0 ${a.amount > 0 ? "text-success" : "text-destructive"}`}>
                          {a.amount > 0 ? "+" : ""}{Math.round(a.amount).toLocaleString()}
                        </span>
                      )}
                      <span className="text-[11px] text-muted-foreground shrink-0 w-16 text-right">{timeAgo(a.date)}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* ── SECTION 6 — MICRO-BUSINESS SNAPSHOT ── */}
        <motion.div variants={item}>
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><Store className="w-5 h-5 text-primary" /> Micro-Business</CardTitle>
            </CardHeader>
            <CardContent>
              {business ? (
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <Store className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-lg">{business.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">{business.type || "Business"} · {businessPhase(business.level)} phase</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Profit / Loss</p>
                    <p className={`text-lg font-bold flex items-center justify-end gap-1 ${business.pnl >= 0 ? "text-success" : "text-destructive"}`}>
                      {business.pnl >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {business.pnl >= 0 ? "+" : ""}{Math.round(business.pnl).toLocaleString()}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-3">
                    <Store className="w-7 h-7 text-secondary" />
                  </div>
                  <p className="font-semibold">No business yet</p>
                  <p className="text-sm text-muted-foreground mt-1 mb-4">Launch your own micro-business and watch it grow.</p>
                  <Link to="/micro-business"><Button variant="secondary">Start a Business <ChevronRight className="w-4 h-4 ml-1" /></Button></Link>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.main>

      {/* Edit name dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Update the name shown across InvestiPlay.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="first-name">First name</Label>
              <Input
                id="first-name"
                value={firstNameInput}
                onChange={e => setFirstNameInput(e.target.value)}
                placeholder="First name"
                maxLength={40}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="last-name">Last name</Label>
              <Input
                id="last-name"
                value={lastNameInput}
                onChange={e => setLastNameInput(e.target.value)}
                placeholder="Last name"
                maxLength={40}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditOpen(false)} disabled={saving}>Cancel</Button>
            <Button onClick={saveName} disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
