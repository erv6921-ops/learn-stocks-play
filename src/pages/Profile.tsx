import React, { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Trans, useTranslation } from "react-i18next"
import i18n, { I18N_ENABLED, currentLanguage, setLanguage, type SupportedLanguage } from "@/i18n"
import { DEV_LOCAL_BYPASS } from "@/lib/devBypass"
import { motion, type Variants } from "framer-motion"
import { useTheme } from "next-themes"
import { persistTheme } from "@/hooks/useThemeSync"
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
  Pencil, Sun, Moon, Monitor, Palette, Check,
  Crown, Medal, Target, Gem, PiggyBank, Briefcase, LineChart, Brain,
  Shield, Banknote, Diamond, BarChart3, Wallet, Compass, Trash2, LogOut,
  Languages,
} from "lucide-react"
import { anchor } from "@/lib/tourAnchors"
import { loadActivities } from "@/lib/businessActivities"
import type { BizState } from "@/lib/businessSim"
import { ACCENT_THEMES, getAccent, applyAccent, type AccentId } from "@/lib/accentTheme"

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

// i18n keys for the local micro-business types (see lib/businessActivities).
const BUSINESS_TYPE_LABELS: Record<string, string> = {
  food: "settings.businessTypes.food",
  tech: "settings.businessTypes.tech",
  retail: "settings.businessTypes.retail",
  creative: "settings.businessTypes.creative",
}

// i18n keys, in level order.
const BUSINESS_PHASES = [1, 2, 3, 4, 5, 6].map(n => `settings.businessPhases.${n}`)
const businessPhase = (level: number) =>
  BUSINESS_PHASES[Math.min(Math.max(level - 1, 0), BUSINESS_PHASES.length - 1)]

function timeAgo(date: Date): string {
  const s = Math.floor((Date.now() - date.getTime()) / 1000)
  if (s < 60) return i18n.t("settings.timeAgo.justNow")
  const m = Math.floor(s / 60)
  if (m < 60) return i18n.t("settings.timeAgo.minutes", { count: m })
  const h = Math.floor(m / 60)
  if (h < 24) return i18n.t("settings.timeAgo.hours", { count: h })
  const d = Math.floor(h / 24)
  if (d < 7) return i18n.t("settings.timeAgo.days", { count: d })
  return date.toLocaleDateString(i18n.language, { month: "short", day: "numeric" })
}

const fmtDate = (d: Date) =>
  d.toLocaleDateString(i18n.language, { month: "short", day: "numeric", year: "numeric" })

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
  const { user, setUser, lessonProgress, jeffsHistory, portfolio, logout } = useApp()
  const { t } = useTranslation()
  const { netWorth } = useNetWorth()
  const { theme, setTheme } = useTheme()
  const [accent, setAccentState] = useState<AccentId>(getAccent)
  const chooseAccent = (id: AccentId) => { setAccentState(id); applyAccent(id) }
  const navigate = useNavigate()

  // ── Delete-account dialog ──
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState("")
  const [deleting, setDeleting] = useState(false)

  const handleDeleteAccount = async () => {
    setDeleting(true)
    try {
      const { error } = await supabase.functions.invoke("delete-account")
      if (error) throw error
      toast.success(t("settings.accountDeleted"))
      await logout()
      navigate("/auth", { replace: true })
    } catch (e: any) {
      toast.error(e?.message || t("settings.couldntDeleteAccount"))
      setDeleting(false)
    }
  }

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
      toast.error(t("settings.firstNameEmpty"))
      return
    }
    setSaving(true)
    const { error } = await supabase
      .from("profiles")
      .update({ first_name: first, last_name: last || null })
      .eq("id", user.id)
    setSaving(false)
    if (error) {
      toast.error(t("settings.couldntSaveName"))
      return
    }
    setUser({ ...user, firstName: first, lastName: last || undefined })
    setEditOpen(false)
    toast.success(t("settings.profileUpdated"))
  }

  const THEME_OPTIONS = [
    { value: "light", label: t("settings.theme.light"), icon: Sun },
    { value: "dark", label: t("settings.theme.dark"), icon: Moon },
    { value: "system", label: t("settings.theme.system"), icon: Monitor },
  ] as const

  // ── UI language (phase 1: chrome only; hidden only if VITE_ENABLE_I18N=false) ──
  const LANGUAGE_OPTIONS = [
    { value: "en", label: "settings.languageEnglish" },
    { value: "es", label: "settings.languageSpanish" },
  ] as const
  const [language, setLanguageState] = useState<SupportedLanguage>(currentLanguage)
  const chooseLanguage = async (lng: SupportedLanguage) => {
    setLanguageState(lng)
    await setLanguage(lng) // i18next + localStorage("investiplay_lang")
    if (!user?.id || DEV_LOCAL_BYPASS) return
    // profiles.language isn't in the generated Supabase types yet (migration
    // pending), so bypass the typed builder for this one field.
    const { error } = await (supabase.from("profiles") as any)
      .update({ language: lng })
      .eq("id", user.id)
    if (error) toast.error(t("settings.couldntSaveLanguage"))
  }

  const [dailyGames, setDailyGames] = useState<{ game_type: string; coins_earned: number | null; completed_at: string | null }[]>([])
  const [business, setBusiness] = useState<BusinessSnapshot | null>(null)
  const [extrasLoaded, setExtrasLoaded] = useState(false)

  // ── Classes the student belongs to (may be more than one) ──
  const [myClasses, setMyClasses] = useState<{ id: string; name: string; joinCode: string }[]>([])
  const [leaveTarget, setLeaveTarget] = useState<{ id: string; name: string } | null>(null)
  const [leaving, setLeaving] = useState(false)

  // Load every class this student is enrolled in (mirrors the Leaderboard).
  useEffect(() => {
    if (!user?.id) return
    let active = true
    void (async () => {
      const { data: memberships } = await supabase
        .from("class_members")
        .select("class_id")
        .eq("user_id", user.id)
      if (!active || !memberships || memberships.length === 0) {
        if (active) setMyClasses([])
        return
      }
      const classIds = memberships.map(m => m.class_id)
      const { data: classes } = await supabase
        .from("classes")
        .select("id, name, join_code")
        .in("id", classIds)
      if (active && classes) {
        setMyClasses(classes.map(c => ({ id: c.id, name: c.name, joinCode: c.join_code })))
      }
    })()
    return () => { active = false }
  }, [user?.id])

  const handleLeaveClass = async () => {
    if (!user?.id || !leaveTarget) return
    setLeaving(true)
    const { error } = await supabase
      .from("class_members")
      .delete()
      .eq("class_id", leaveTarget.id)
      .eq("user_id", user.id)
    setLeaving(false)
    if (error) {
      toast.error(t("settings.couldntLeaveClass"))
      return
    }
    setMyClasses(prev => prev.filter(c => c.id !== leaveTarget.id))
    toast.success(t("settings.leftClass", { name: leaveTarget.name }))
    setLeaveTarget(null)
  }

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
      } else {
        // No row in the `businesses` table, so fall back to the same local
        // activities/sim state the Dashboard reads, so the two views agree
        // instead of Profile claiming "No business yet".
        const acts = await loadActivities()
        if (active && acts.businessType) {
          const sim = acts.sim as BizState | undefined
          const label = BUSINESS_TYPE_LABELS[acts.businessType] ? t(BUSINESS_TYPE_LABELS[acts.businessType]) : t("common.business")
          const month = sim?.month ?? 1
          setBusiness({
            name: t("settings.businessNameFallback", { label }),
            type: acts.businessType,
            level: Math.max(1, Math.ceil(month / 3)),
            pnl: typeof sim?.cash === "number" ? sim.cash - 500 : 0,
          })
        }
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

  // Level mirrors the navbar HUD (regular curriculum only).
  const { level, levelPct } = useMemo(() => {
    const regularUnits = unitInfo.filter(u => (u.track ?? "regular") === "regular")
    const regularLessonIds = new Set(regularUnits.flatMap(u => getLessonsByUnit(u.id).map(l => l.id)))
    const totalLessons = regularLessonIds.size
    const doneLessons = lessonProgress.filter(p => p.completed && regularLessonIds.has(p.lessonId)).length
    const completionPct = totalLessons > 0 ? doneLessons / totalLessons : 0
    const unitScores = regularUnits.map(u => {
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
    const totalLessons = lessons.length
    const totalUnits = unitInfo.length
    const holdings = portfolio.length
    const gamesPlayed = dailyGames.length
    const nw = Math.floor(netWorth)
    const xp = Math.floor(totalXP)
    const defs = [
      // ── Lessons ──
      { id: "first-steps", name: t("settings.badges.first-steps.name"), desc: t("settings.badges.first-steps.desc"), icon: BookOpen, earned: lc >= 1, need: t("settings.badges.first-steps.need") },
      { id: "bookworm", name: t("settings.badges.bookworm.name"), desc: t("settings.badges.bookworm.desc"), icon: GraduationCap, earned: lc >= 10, need: t("settings.badges.bookworm.need", { count: lc }) },
      { id: "scholar", name: t("settings.badges.scholar.name"), desc: t("settings.badges.scholar.desc"), icon: Star, earned: lc >= 25, need: t("settings.badges.scholar.need", { count: lc }) },
      { id: "dedicated", name: t("settings.badges.dedicated.name"), desc: t("settings.badges.dedicated.desc"), icon: Brain, earned: lc >= 50, need: t("settings.badges.dedicated.need", { count: lc }) },
      { id: "centurion", name: t("settings.badges.centurion.name"), desc: t("settings.badges.centurion.desc"), icon: Medal, earned: lc >= 100, need: t("settings.badges.centurion.need", { count: lc }) },
      { id: "completionist", name: t("settings.badges.completionist.name"), desc: t("settings.badges.completionist.desc"), icon: CheckCircle2, earned: totalLessons > 0 && lc >= totalLessons, need: t("settings.badges.completionist.need", { count: lc, total: totalLessons }) },
      // ── Units ──
      { id: "unit-master", name: t("settings.badges.unit-master.name"), desc: t("settings.badges.unit-master.desc"), icon: Layers, earned: unitsCompleted >= 1, need: t("settings.badges.unit-master.need") },
      { id: "trailblazer", name: t("settings.badges.trailblazer.name"), desc: t("settings.badges.trailblazer.desc"), icon: Compass, earned: unitsCompleted >= 3, need: t("settings.badges.trailblazer.need", { count: unitsCompleted }) },
      { id: "unit-champion", name: t("settings.badges.unit-champion.name"), desc: t("settings.badges.unit-champion.desc"), icon: Crown, earned: unitsCompleted >= 5, need: t("settings.badges.unit-champion.need", { count: unitsCompleted }) },
      { id: "graduate", name: t("settings.badges.graduate.name"), desc: t("settings.badges.graduate.desc"), icon: Shield, earned: totalUnits > 0 && unitsCompleted >= totalUnits, need: t("settings.badges.graduate.need", { count: unitsCompleted, total: totalUnits }) },
      // ── Levels ──
      { id: "rising-star", name: t("settings.badges.rising-star.name"), desc: t("settings.badges.rising-star.desc"), icon: Sparkles, earned: level >= 3, need: t("settings.badges.rising-star.need", { level: level }) },
      { id: "halfway", name: t("settings.badges.halfway.name"), desc: t("settings.badges.halfway.desc"), icon: Trophy, earned: level >= 5, need: t("settings.badges.halfway.need", { level: level }) },
      { id: "expert", name: t("settings.badges.expert.name"), desc: t("settings.badges.expert.desc"), icon: Target, earned: level >= 8, need: t("settings.badges.expert.need", { level: level }) },
      { id: "maxed", name: t("settings.badges.maxed.name"), desc: t("settings.badges.maxed.desc"), icon: Crown, earned: level >= 10, need: t("settings.badges.maxed.need", { level: level }) },
      // ── Streaks ──
      { id: "streak-3", name: t("settings.badges.streak-3.name"), desc: t("settings.badges.streak-3.desc"), icon: Flame, earned: bestStreak >= 3, need: t("settings.badges.streak-3.need", { best: bestStreak }) },
      { id: "streak-7", name: t("settings.badges.streak-7.name"), desc: t("settings.badges.streak-7.desc"), icon: Zap, earned: bestStreak >= 7, need: t("settings.badges.streak-7.need", { best: bestStreak }) },
      { id: "streak-14", name: t("settings.badges.streak-14.name"), desc: t("settings.badges.streak-14.desc"), icon: Sparkles, earned: bestStreak >= 14, need: t("settings.badges.streak-14.need", { best: bestStreak }) },
      { id: "streak-30", name: t("settings.badges.streak-30.name"), desc: t("settings.badges.streak-30.desc"), icon: Rocket, earned: bestStreak >= 30, need: t("settings.badges.streak-30.need", { best: bestStreak }) },
      // ── Coins earned ──
      { id: "coin-500", name: t("settings.badges.coin-500.name"), desc: t("settings.badges.coin-500.desc"), icon: Coins, earned: xp >= 500, need: t("settings.badges.coin-500.need", { count: xp.toLocaleString() }) },
      { id: "coin-1k", name: t("settings.badges.coin-1k.name"), desc: t("settings.badges.coin-1k.desc"), icon: PiggyBank, earned: xp >= 1000, need: t("settings.badges.coin-1k.need", { count: xp.toLocaleString() }) },
      { id: "coin-5k", name: t("settings.badges.coin-5k.name"), desc: t("settings.badges.coin-5k.desc"), icon: Banknote, earned: xp >= 5000, need: t("settings.badges.coin-5k.need", { count: xp.toLocaleString() }) },
      { id: "coin-10k", name: t("settings.badges.coin-10k.name"), desc: t("settings.badges.coin-10k.desc"), icon: Wallet, earned: xp >= 10000, need: t("settings.badges.coin-10k.need", { count: xp.toLocaleString() }) },
      { id: "coin-50k", name: t("settings.badges.coin-50k.name"), desc: t("settings.badges.coin-50k.desc"), icon: Gem, earned: xp >= 50000, need: t("settings.badges.coin-50k.need", { count: xp.toLocaleString() }) },
      { id: "coin-100k", name: t("settings.badges.coin-100k.name"), desc: t("settings.badges.coin-100k.desc"), icon: Diamond, earned: xp >= 100000, need: t("settings.badges.coin-100k.need", { count: xp.toLocaleString() }) },
      // ── Net worth ──
      { id: "networth-5k", name: t("settings.badges.networth-5k.name"), desc: t("settings.badges.networth-5k.desc"), icon: TrendingUp, earned: nw >= 5000, need: t("settings.badges.networth-5k.need", { count: nw.toLocaleString() }) },
      { id: "networth-25k", name: t("settings.badges.networth-25k.name"), desc: t("settings.badges.networth-25k.desc"), icon: BarChart3, earned: nw >= 25000, need: t("settings.badges.networth-25k.need", { count: nw.toLocaleString() }) },
      // ── Stocks ──
      { id: "investor", name: t("settings.badges.investor.name"), desc: t("settings.badges.investor.desc"), icon: TrendingUp, earned: holdings >= 1, need: t("settings.badges.investor.need") },
      { id: "diversified", name: t("settings.badges.diversified.name"), desc: t("settings.badges.diversified.desc"), icon: LineChart, earned: holdings >= 3, need: t("settings.badges.diversified.need", { count: holdings }) },
      { id: "portfolio-pro", name: t("settings.badges.portfolio-pro.name"), desc: t("settings.badges.portfolio-pro.desc"), icon: Briefcase, earned: holdings >= 5, need: t("settings.badges.portfolio-pro.need", { count: holdings }) },
      // ── Business ──
      { id: "entrepreneur", name: t("settings.badges.entrepreneur.name"), desc: t("settings.badges.entrepreneur.desc"), icon: Store, earned: !!business, need: t("settings.badges.entrepreneur.need") },
      { id: "profitable", name: t("settings.badges.profitable.name"), desc: t("settings.badges.profitable.desc"), icon: TrendingUp, earned: !!business && (business.pnl ?? 0) > 0, need: t("settings.badges.profitable.need") },
      { id: "business-boss", name: t("settings.badges.business-boss.name"), desc: t("settings.badges.business-boss.desc"), icon: Rocket, earned: !!business && (business.level ?? 0) >= 3, need: t("settings.badges.business-boss.need") },
      // ── Daily games ──
      { id: "gamer", name: t("settings.badges.gamer.name"), desc: t("settings.badges.gamer.desc"), icon: Gamepad2, earned: gamesPlayed >= 1, need: t("settings.badges.gamer.need") },
      { id: "game-regular", name: t("settings.badges.game-regular.name"), desc: t("settings.badges.game-regular.desc"), icon: Target, earned: gamesPlayed >= 10, need: t("settings.badges.game-regular.need", { count: gamesPlayed }) },
      { id: "game-master", name: t("settings.badges.game-master.name"), desc: t("settings.badges.game-master.desc"), icon: Medal, earned: gamesPlayed >= 25, need: t("settings.badges.game-master.need", { count: gamesPlayed }) },
    ]
    return defs
  }, [completedLessons.length, unitsCompleted, level, bestStreak, totalXP, portfolio.length, business, dailyGames.length, netWorth, t])

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
        text: t("settings.playedGame", { game: g.game_type.replace(/[-_]/g, " ") }),
        amount: g.coins_earned ?? 0,
        icon: Gamepad2,
      }))
    return [...fromHistory, ...fromGames]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 20)
  }, [jeffsHistory, dailyGames, t])

  const initials = getInitials(user?.firstName, user?.lastName)
  const fullName = getDisplayName(user?.firstName, user?.lastName)
  const memberSince = user?.createdAt ? fmtDate(new Date(user.createdAt)) : "-"

  const stats = [
    { label: t("settings.stats.coinsEarned"), value: Math.floor(totalXP).toLocaleString(), icon: Coins, color: "text-accent", bg: "bg-accent/10" },
    { label: t("settings.stats.netWorth"), value: Math.floor(netWorth).toLocaleString(), icon: Coins, color: "text-gold", bg: "bg-gold/10" },
    { label: t("settings.stats.currentStreak"), value: t("settings.stats.streakValue", { count: streak }), icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: t("settings.stats.lessonsDone"), value: completedLessons.length, icon: BookOpen, color: "text-primary", bg: "bg-primary/10" },
    { label: t("settings.stats.unitsDone"), value: unitsCompleted, icon: Layers, color: "text-secondary", bg: "bg-secondary/10" },
    { label: t("settings.stats.badges"), value: earnedBadges.length, icon: Award, color: "text-primary", bg: "bg-primary/10" },
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
        {/* ── SECTION 1 - USER HEADER ── */}
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
                      <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4" />{t("settings.grade", { grade: user.grade })}</span>
                    )}
                    {user?.classCode && (
                      <span className="flex items-center gap-1.5"><KeyRound className="w-4 h-4" />{t("settings.classCode", { code: user.classCode })}</span>
                    )}
                    <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" />{t("settings.memberSince", { date: memberSince })}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={openEdit} className="md:pb-0 self-start md:self-end gap-1.5 press-scale">
                  <Pencil className="w-3.5 h-3.5" /> {t("settings.edit")}
                </Button>
              </div>

              {/* Level + XP to next level */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5 font-semibold text-sm">
                    <Star className="w-4 h-4 text-primary" /> {t("settings.level", { level })}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {level >= 10 ? t("settings.maxLevel") : t("settings.pctToNextLevel", { pct: Math.round(levelPct), next: level + 1 })}
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
            <CardContent className="p-4 space-y-4">
              {/* Light / dark mode */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Palette className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t("settings.appearance")}</p>
                    <p className="text-xs text-muted-foreground">{t("settings.appearanceDesc")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-muted/60 rounded-xl p-1 self-start sm:self-auto" ref={anchor("profile-theme")}>
                  {THEME_OPTIONS.map(opt => {
                    const activeTheme = (theme ?? "system") === opt.value
                    return (
                      <button
                        key={opt.value}
                        onClick={() => { setTheme(opt.value); persistTheme(opt.value) }}
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
              </div>

              {/* Accent color */}
              <div className="border-t border-border/60 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "hsl(var(--primary) / 0.12)" }}>
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t("settings.accentColor")}</p>
                    <p className="text-xs text-muted-foreground">{t("settings.accentColorDesc")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 self-start sm:self-auto">
                  {ACCENT_THEMES.map(t => {
                    const active = accent === t.id
                    return (
                      <button
                        key={t.id}
                        onClick={() => chooseAccent(t.id)}
                        aria-pressed={active}
                        title={t.label}
                        className="relative w-8 h-8 rounded-full press-scale transition-transform hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${t.swatch}, ${t.swatchDeep})`,
                          boxShadow: active
                            ? `0 0 0 2px hsl(var(--card)), 0 0 0 4px ${t.swatch}`
                            : "0 1px 3px rgba(0,0,0,0.15)",
                        }}
                      >
                        {active && <Check className="w-4 h-4 text-white absolute inset-0 m-auto" strokeWidth={3} />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* UI language - English / Español. Writes localStorage + profiles.language. */}
              {I18N_ENABLED && (
                <div className="border-t border-border/60 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Languages className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{t("settings.language")}</p>
                      <p className="text-xs text-muted-foreground">{t("settings.languageDesc")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-muted/60 rounded-xl p-1 self-start sm:self-auto" role="group" aria-label={t("settings.language")}>
                    {LANGUAGE_OPTIONS.map(opt => {
                      const activeLang = language === opt.value
                      return (
                        <button
                          key={opt.value}
                          onClick={() => chooseLanguage(opt.value)}
                          aria-pressed={activeLang}
                          lang={opt.value}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors press-scale ${
                            activeLang ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {t(opt.label)}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* ── MY CLASSES ── */}
        {myClasses.length > 0 && (
          <motion.div variants={item}>
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <School className="w-5 h-5 text-primary" /> {t("settings.myClasses", { count: myClasses.length })}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {myClasses.map(c => (
                  <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/50">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <School className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm truncate">{c.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <KeyRound className="w-3 h-3" /> {c.joinCode}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="press-scale shrink-0 gap-1.5 text-destructive hover:text-destructive"
                      onClick={() => setLeaveTarget({ id: c.id, name: c.name })}
                    >
                      <LogOut className="w-3.5 h-3.5" /> {t("settings.leave")}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        <Dialog open={!!leaveTarget} onOpenChange={(o) => { if (!leaving && !o) setLeaveTarget(null) }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("settings.leaveClassTitle")}</DialogTitle>
              <DialogDescription>
                <Trans i18nKey="settings.leaveClassDesc" values={{ name: leaveTarget?.name }} components={{ b: <span className="font-semibold" /> }} />
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setLeaveTarget(null)} disabled={leaving}>{t("common.cancel")}</Button>
              <Button variant="destructive" onClick={handleLeaveClass} disabled={leaving}>
                {leaving ? t("settings.leaving") : t("settings.leaveClass")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ── DANGER ZONE ── */}
        <motion.div variants={item}>
          <Card variant="elevated" className="border-destructive/30">
            <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{t("settings.deleteAccount")}</p>
                  <p className="text-xs text-muted-foreground">{t("settings.deleteAccountDesc")}</p>
                </div>
              </div>
              <Button variant="destructive" size="sm" className="press-scale self-start sm:self-auto"
                onClick={() => { setDeleteConfirm(""); setDeleteOpen(true) }}>
                <Trash2 className="w-4 h-4 mr-1.5" /> {t("settings.deleteAccount")}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <Dialog open={deleteOpen} onOpenChange={(o) => { if (!deleting) setDeleteOpen(o) }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("settings.deleteAccountTitle")}</DialogTitle>
              <DialogDescription>
                {t("settings.deleteAccountWarning")}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Label htmlFor="delete-confirm"><Trans i18nKey="settings.typeToConfirm" components={{ b: <span className="font-bold" /> }} /></Label>
              <Input id="delete-confirm" value={deleteConfirm} autoComplete="off"
                onChange={(e) => setDeleteConfirm(e.target.value)} placeholder="DELETE" />
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setDeleteOpen(false)} disabled={deleting}>{t("common.cancel")}</Button>
              <Button variant="destructive" onClick={handleDeleteAccount}
                disabled={deleting || deleteConfirm.trim().toUpperCase() !== "DELETE"}>
                {deleting ? t("settings.deleting") : t("settings.deleteAccount")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ── SECTION 2 - STATS OVERVIEW ── */}
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

        {/* ── SECTION 3 - COMPLETED LESSONS ── */}
        <motion.div variants={item}>
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><BookOpen className="w-5 h-5 text-primary" /> {t("settings.completedLessons")}</CardTitle>
            </CardHeader>
            <CardContent>
              {lessonsByUnit.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Rocket className="w-7 h-7 text-primary" />
                  </div>
                  <p className="font-semibold">{t("settings.noLessonsYet")}</p>
                  <p className="text-sm text-muted-foreground mt-1 mb-4">{t("settings.noLessonsYetDesc")}</p>
                  <Link to="/lessons"><Button>{t("settings.startLearning")} <ChevronRight className="w-4 h-4 ml-1" /></Button></Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {lessonsByUnit.map(({ unit, items }) => (
                    <div key={unit.id}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                          {t("settings.unitHeading", { unit: unit.unitNumber, title: unit.title })}
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

        {/* ── SECTION 4 - BADGES ── */}
        <motion.div variants={item}>
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Award className="w-5 h-5 text-primary" /> {t("settings.badgesTitle")}
                <span className="text-sm font-normal text-muted-foreground">({earnedBadges.length}/{badges.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {earnedBadges.length === 0 && (
                <p className="text-sm text-muted-foreground mb-4">
                  {t("settings.noBadgesYet")}
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

        {/* ── SECTION 5 - RECENT ACTIVITY ── */}
        <motion.div variants={item}>
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><Sparkles className="w-5 h-5 text-primary" /> {t("settings.recentActivity")}</CardTitle>
            </CardHeader>
            <CardContent>
              {activity.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">{t("settings.noActivityYet")}</p>
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

        {/* ── SECTION 6 - MICRO-BUSINESS SNAPSHOT ── */}
        <motion.div variants={item}>
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><Store className="w-5 h-5 text-primary" /> {t("settings.microBusiness")}</CardTitle>
            </CardHeader>
            <CardContent>
              {business ? (
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <Store className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-lg">{business.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">{t("settings.businessPhase", { type: business.type || t("common.business"), phase: t(businessPhase(business.level)) })}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{t("settings.profitLoss")}</p>
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
                  <p className="font-semibold">{t("settings.noBusinessYet")}</p>
                  <p className="text-sm text-muted-foreground mt-1 mb-4">{t("settings.noBusinessYetDesc")}</p>
                  <Link to="/micro-business"><Button variant="secondary">{t("settings.startBusiness")} <ChevronRight className="w-4 h-4 ml-1" /></Button></Link>
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
            <DialogTitle>{t("settings.editProfile")}</DialogTitle>
            <DialogDescription>{t("settings.editProfileDesc")}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="first-name">{t("settings.firstName")}</Label>
              <Input
                id="first-name"
                value={firstNameInput}
                onChange={e => setFirstNameInput(e.target.value)}
                placeholder={t("settings.firstName")}
                maxLength={40}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="last-name">{t("settings.lastName")}</Label>
              <Input
                id="last-name"
                value={lastNameInput}
                onChange={e => setLastNameInput(e.target.value)}
                placeholder={t("settings.lastName")}
                maxLength={40}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditOpen(false)} disabled={saving}>{t("common.cancel")}</Button>
            <Button onClick={saveName} disabled={saving}>{saving ? t("common.saving") : t("common.save")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
