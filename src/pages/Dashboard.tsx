import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { useNetWorth } from "@/hooks/useNetWorth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import GameNav from "@/components/GameNav";
import { Wordmark } from "@/components/Wordmark";
import { lessons, unitInfo, getLessonsByUnit, getUnitRewardTotal } from "@/data/lessons";
import { supabase } from "@/integrations/supabase/client";
import jeffCharacter from "@/assets/jeff-character.png";
import DailyMissions from "@/components/DailyMissions";
import DailySignal from "@/components/DailySignal";
import {
  BookOpen, LineChart, Coins, TrendingUp, TrendingDown,
  Star, StarOff, ChevronRight, Wallet,
  GraduationCap, Flame, Lock, Trophy, Shield, Zap, Award,
  Target, Eye, ArrowRight } from
"lucide-react";

const LEVEL_NAMES = [
"Beginner Learner",
"Investor in Training",
"Market Observer",
"Portfolio Strategist",
"Wealth Builder",
"Capital Manager",
"Market Analyst",
"Capital Architect",
"Financial Engineer",
"Master Economist"];

// Curriculum-based level: driven by % of units completed + mastery
function getCurriculumLevel(completedLessons: number, totalLessons: number, unitScores: { done: number; total: number }[]) {
  const completionPct = totalLessons > 0 ? completedLessons / totalLessons : 0;
  const unitsFullyComplete = unitScores.filter(u => u.total > 0 && u.done >= u.total).length;
  const totalUnits = unitScores.filter(u => u.total > 0).length;
  const unitMasteryPct = totalUnits > 0 ? unitsFullyComplete / totalUnits : 0;
  // Weighted: 60% lesson completion, 40% unit mastery
  const score = completionPct * 0.6 + unitMasteryPct * 0.4;
  // Map to levels 1-10
  if (score >= 0.95) return 10;
  if (score >= 0.85) return 9;
  if (score >= 0.72) return 8;
  if (score >= 0.60) return 7;
  if (score >= 0.48) return 6;
  if (score >= 0.36) return 5;
  if (score >= 0.25) return 4;
  if (score >= 0.15) return 3;
  if (score >= 0.05) return 2;
  return 1;
}

// Curriculum-based unlock thresholds (units completed or mastery %)
const NEXT_UNLOCKS = [
{ name: "Portfolio Simulator", unitsRequired: 2, pctRequired: 10 },
{ name: "Advanced Charts", unitsRequired: 4, pctRequired: 25 },
{ name: "Options Trading", unitsRequired: 8, pctRequired: 50 },
{ name: "Hedge Fund Mode", unitsRequired: 14, pctRequired: 70 }];

const BADGES = [
{ name: "First Lesson", icon: BookOpen, unlockAt: 1 },
{ name: "5-Day Streak", icon: Flame, unlockAt: 5 },
{ name: "Stock Trader", icon: TrendingUp, unlockAt: 10 },
{ name: "Quiz Master", icon: Trophy, unlockAt: 15 },
{ name: "Portfolio Pro", icon: Shield, unlockAt: 25 },
{ name: "Market Expert", icon: Zap, unlockAt: 50 }];

// Streak logic: only counts days with meaningful activity (lesson/quiz/trade)
// We filter jeffsHistory for reasons that indicate real engagement
const MEANINGFUL_REASONS = ["lesson", "quiz", "mission", "assessment", "bought", "sold", "unit test"];

function getStreak(history: { amount: number; reason: string; date: Date }[]) {
  if (history.length === 0) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // Only count days with meaningful activity
  const dates = new Set(
    history
      .filter((h) => MEANINGFUL_REASONS.some(r => h.reason.toLowerCase().includes(r)))
      .map((h) => {
        const d = new Date(h.date);
        d.setHours(0, 0, 0, 0);
        return d.getTime();
      })
  );
  let streak = 0;
  const day = new Date(today);
  if (dates.has(day.getTime())) streak++;
  else return 0;
  for (let i = 1; i < 365; i++) {
    day.setDate(day.getDate() - 1);
    if (dates.has(day.getTime())) streak++;
    else break;
  }
  return streak;
}

export default function Dashboard() {
  const { user, authReady, lessonProgress, watchlist, jeffsBalance, portfolio, jeffsHistory, earnJeffs, getRewardMultiplier } = useApp();
  const { netWorth, portfolioValue, holdings, livePrices } = useNetWorth();
  const navigate = useNavigate();

  // The dashboard reflects the core (Florida) curriculum only; the optional AP
  // Micro elective has its own card + track and never affects these stats.
  const floridaUnits = useMemo(() => unitInfo.filter((u) => (u.track ?? "florida") === "florida"), []);
  const floridaLessons = useMemo(() => lessons.filter((l) => (l.track ?? "florida") === "florida"), []);
  const floridaLessonIds = useMemo(() => new Set(floridaLessons.map((l) => l.id)), [floridaLessons]);

  const completedLessons = lessonProgress.filter((p) => p.completed && floridaLessonIds.has(p.lessonId)).length;
  const totalLessons = floridaLessonIds.size;
  const progressPercent = totalLessons > 0 ? Math.round(completedLessons / totalLessons * 100) : 0;

  // ── Live watchlist prices ──
  const [watchlistPrices, setWatchlistPrices] = useState<Map<string, {price: number;change: number | null;changePercent: number | null;name?: string;}>>(new Map());
  const [watchlistLoading, setWatchlistLoading] = useState(false);

  const fetchWatchlistPrices = useCallback(async () => {
    if (watchlist.length === 0) {setWatchlistPrices(new Map());return;}
    setWatchlistLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('get-stock-quote', {
        body: { symbols: watchlist.slice(0, 6) }
      });
      if (!error && data?.stocks) {
        const map = new Map<string, {price: number;change: number | null;changePercent: number | null;name?: string;}>();
        for (const s of data.stocks) {
          map.set(s.symbol, { price: s.price, change: s.change, changePercent: s.changePercent, name: s.name || s.symbol });
        }
        setWatchlistPrices(map);
      }
    } catch {} finally {setWatchlistLoading(false);}
  }, [watchlist]);

  useEffect(() => {fetchWatchlistPrices();}, [fetchWatchlistPrices]);

  // ── Join a class ──
  // inClass: null = unknown/loading, false = not yet in any class, true = enrolled.
  const [inClass, setInClass] = useState<boolean | null>(null);
  const [joinCode, setJoinCode] = useState("");
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!user?.id) return;
      const { data, error } = await supabase.
      from("class_members").
      select("id").
      eq("user_id", user.id).
      limit(1);
      if (!cancelled && !error) setInClass((data?.length ?? 0) > 0);
    })();
    return () => {cancelled = true;};
  }, [user?.id]);

  const handleJoinClass = async () => {
    const code = joinCode.trim().toUpperCase();
    if (!code) return;
    setJoining(true);
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) throw new Error("Not authenticated");

      const { data: classData, error: classError } = await supabase.
      rpc("lookup_class_by_join_code", { _code: code }).
      single();

      if (classError || !classData) {
        toast.error("Invalid code", { description: "No class found with this join code." });
        return;
      }

      const { error: joinError } = await supabase.
      from("class_members").
      insert({ class_id: (classData as {id: string;name: string;}).id, user_id: authUser.id });

      // 23505 = already a member; treat as success.
      if (joinError && joinError.code !== "23505") throw joinError;

      toast.success(joinError?.code === "23505" ? "Already joined" : "Joined!", {
        description: `You're in ${(classData as {name: string;}).name}.`
      });
      setJoinCode("");
      setInClass(true);
    } catch (error: any) {
      toast.error("Couldn't join class", { description: error.message });
    } finally {
      setJoining(false);
    }
  };

  const totalXp = useMemo(() =>
  jeffsHistory.filter((h) => h.amount > 0).reduce((sum, h) => sum + h.amount, 0),
  [jeffsHistory]
  );

  // Curriculum-based level
  const unitScoresForLevel = useMemo(() => {
    const check = (id: string) => lessonProgress.some((p) => p.lessonId === id && p.completed);
    return floridaUnits.map(u => {
      const ul = getLessonsByUnit(u.id);
      return { done: ul.filter(l => check(l.id)).length, total: ul.length };
    });
  }, [lessonProgress, floridaUnits]);
  const currLevel = useMemo(() => getCurriculumLevel(completedLessons, totalLessons, unitScoresForLevel), [completedLessons, totalLessons, unitScoresForLevel]);
  // Progress within current level band
  const levelProgressPct = useMemo(() => {
    const pct = totalLessons > 0 ? completedLessons / totalLessons * 100 : 0;
    return Math.min(pct, 100);
  }, [completedLessons, totalLessons]);

  const streak = useMemo(() => getStreak(jeffsHistory), [jeffsHistory]);
  const earnedToday = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return jeffsHistory
      .filter((h) => h.amount > 0 && new Date(h.date).getTime() >= today.getTime())
      .reduce((sum, h) => sum + h.amount, 0);
  }, [jeffsHistory]);

  const unitsFullyComplete = unitScoresForLevel.filter(u => u.total > 0 && u.done >= u.total).length;
  const nextUnlock = NEXT_UNLOCKS.find((u) => unitsFullyComplete < u.unitsRequired);
  const unlockedBadgeCount = BADGES.filter((b) => completedLessons >= b.unlockAt).length;

  // Dynamic formatted date
  const formattedDate = useMemo(() => {
    return new Date().toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }, []);

  // ── Derive from Missions data (single source of truth) ──
  const isLessonCompleted = (id: string) => lessonProgress.some((p) => p.lessonId === id && p.completed);

  // Find next incomplete lesson (same logic as Missions page)
  const nextLesson = useMemo(() => {
    const check = (id: string) => lessonProgress.some((p) => p.lessonId === id && p.completed);
    return floridaLessons.find((l) => !check(l.id));
  }, [lessonProgress, floridaLessons]);

  // Find the unit the next lesson belongs to
  const currentUnit = useMemo(() => {
    if (!nextLesson) return floridaUnits[floridaUnits.length - 1];
    return floridaUnits.find((u) => u.id === nextLesson.unitId) || floridaUnits[0];
  }, [nextLesson, floridaUnits]);

  // Current unit progress
  const currentUnitLessons = useMemo(() => getLessonsByUnit(currentUnit.id), [currentUnit]);
  const currentUnitCompleted = useMemo(() => {
    const check = (id: string) => lessonProgress.some((p) => p.lessonId === id && p.completed);
    return currentUnitLessons.filter((l) => check(l.id)).length;
  }, [currentUnitLessons, lessonProgress]);
  const currentUnitProgress = currentUnitLessons.length > 0 ? Math.round(currentUnitCompleted / currentUnitLessons.length * 100) : 0;

  // Unit overview cards (show current + next 3 units with incomplete lessons)
  const unitOverviewCards = useMemo(() => {
    const check = (id: string) => lessonProgress.some((p) => p.lessonId === id && p.completed);
    return floridaUnits
      .map((unit) => {
        const ul = getLessonsByUnit(unit.id);
        const done = ul.filter((l) => check(l.id)).length;
        const total = ul.length;
        const reward = getUnitRewardTotal(unit.id);
        const remainingReward = ul.filter((l) => !check(l.id)).reduce((s, l) => s + l.reward, 0);
        return { ...unit, done, total, reward, remainingReward, progress: total > 0 ? Math.round(done / total * 100) : 0 };
      })
      .filter((u) => u.progress < 100)
      .slice(0, 4);
  }, [lessonProgress, floridaUnits]);

  // Streak ring: 7-day cycle
  const streakDayInCycle = streak % 7;
  const streakRingProgress = streakDayInCycle / 7 * 100;

  if (!authReady) return null;
  if (!user) return <Navigate to="/auth" replace />;

  const getGreeting = () => {
    const hour = new Date().getHours();
    const name = user?.firstName || "";
    const suffix = name ? `, ${name}` : "";
    if (hour < 12) return `Good morning${suffix}`;
    if (hour < 18) return `Good afternoon${suffix}`;
    return `Good evening${suffix}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <GameNav />

      <main className="container mx-auto px-4 py-6 md:py-8 pb-28 md:pb-10">
        {/* ──── HERO SECTION ──── */}
        <div className="hud-panel p-4 md:p-6 lg:p-8 mb-4 md:mb-8 relative z-10">
          {/* Dedicated phone layout (≤640px) */}
          <div className="min-[641px]:hidden relative z-10 space-y-3">
            <div>
              <h1 className="text-xl font-extrabold text-white tracking-tight mb-0.5">
                {getGreeting()} 👋
              </h1>
              <p className="text-white/50 text-xs">
                {formattedDate}{user?.grade ? ` · Grade ${user.grade}` : ""}{user?.schoolName ? ` · ${user.schoolName}` : ""}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shadow-glow border border-white/5 shrink-0">
                  <Star className="w-4 h-4 text-gold" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white">Level {currLevel}</p>
                  <p className="text-[11px] text-white/40 truncate">{LEVEL_NAMES[currLevel - 1] || "Master"}</p>
                </div>
              </div>
              <div className="h-3 rounded-full bg-white/10 overflow-hidden border border-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-success transition-all duration-1000 ease-out animate-xp-fill"
                  style={{ width: `${levelProgressPct}%`, boxShadow: '0 0 16px hsl(152 62% 46% / 0.5)' }}
                />
              </div>
              <p className="text-[10px] text-white/30 mt-1.5 text-right">
                {completedLessons} / {totalLessons} lessons · {progressPercent}% curriculum
              </p>
            </div>

            <div className="bg-white/5 border border-orange-500/20 rounded-2xl p-4 backdrop-blur-sm relative overflow-hidden">
              <div className="flex items-center gap-3 mb-2">
                <div className="relative w-11 h-11 shrink-0">
                  <svg viewBox="0 0 36 36" className="w-11 h-11 -rotate-90">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="hsl(25 95% 53%)"
                      strokeWidth="3"
                      strokeDasharray={`${streakRingProgress}, 100`}
                      strokeLinecap="round"
                      className="transition-all duration-700"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-orange-400" style={{ animation: streak > 0 ? 'streak-pulse 2s ease-in-out infinite' : 'none' }} />
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-white leading-none">{streak}</p>
                  <p className="text-[11px] text-white/50 font-semibold">day streak</p>
                </div>
              </div>
              <p className="text-[10px] text-orange-400/70 font-medium">
                {streakDayInCycle === 0 && streak > 0 ? "🎉 +250 🪙 earned!" : `${7 - streakDayInCycle} days to +250 🪙`}
              </p>
            </div>

            {nextUnlock && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 text-[10px] text-white/40 uppercase tracking-widest font-bold mb-2">
                  <Lock className="w-3 h-3" />
                  Next Unlock
                </div>
                <p className="text-sm font-bold text-white">{nextUnlock.name}</p>
                <p className="text-[11px] text-white/30 mt-0.5">{nextUnlock.unitsRequired} units needed</p>
              </div>
            )}
          </div>

          {/* Existing tablet/desktop layout (>640px) */}
          <div className="hidden min-[641px]:flex flex-col lg:flex-row lg:items-center gap-4 md:gap-6 relative z-10">
            {/* Left: Greeting + Level + XP */}
            <div className="flex-1">
              {/* Row 1: Greeting */}
              <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-white tracking-tight mb-0.5 md:mb-1">
                {getGreeting()} 👋
              </h1>
              {/* Row 2: Date line */}
              <p className="text-white/50 text-xs md:text-sm mb-3 md:mb-4">
                {formattedDate}{user?.grade ? ` · Grade ${user.grade}` : ""}{user?.schoolName ? ` · ${user.schoolName}` : ""}
              </p>

              {/* Row 3: Level + XP bar — stacked on mobile, inline on desktop */}
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <div className="flex items-center gap-2.5 shrink-0">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/10 flex items-center justify-center shadow-glow border border-white/5">
                    <Star className="w-4 h-4 md:w-5 md:h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Level {currLevel}</p>
                    <p className="text-[11px] text-white/40">{LEVEL_NAMES[currLevel - 1] || "Master"}</p>
                  </div>
                </div>
                <div className="flex-1 w-full md:max-w-md">
                  <div className="h-3 md:h-3.5 rounded-full bg-white/10 overflow-hidden border border-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-success transition-all duration-1000 ease-out animate-xp-fill"
                      style={{ width: `${levelProgressPct}%`, boxShadow: '0 0 16px hsl(152 62% 46% / 0.5)' }} />
                  </div>
                  <p className="text-[10px] text-white/30 mt-1 text-right">
                    {completedLessons} / {totalLessons} lessons · {progressPercent}% curriculum
                  </p>
                </div>
              </div>
            </div>

            {/* Right: STREAK + Next Unlock */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:flex-wrap">
              <div className="bg-white/5 border border-orange-500/20 rounded-2xl p-4 md:p-5 md:min-w-[160px] backdrop-blur-sm relative overflow-hidden w-full md:w-auto">
                <div className="flex items-center gap-3 mb-2">
                  <div className="relative w-11 h-11 md:w-12 md:h-12">
                    <svg viewBox="0 0 36 36" className="w-11 h-11 md:w-12 md:h-12 -rotate-90">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="3" />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="hsl(25 95% 53%)"
                        strokeWidth="3"
                        strokeDasharray={`${streakRingProgress}, 100`}
                        strokeLinecap="round"
                        className="transition-all duration-700" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Flame className="w-5 h-5 text-orange-400" style={{ animation: streak > 0 ? 'streak-pulse 2s ease-in-out infinite' : 'none' }} />
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-white leading-none">{streak}</p>
                    <p className="text-[11px] text-white/50 font-semibold">day streak</p>
                  </div>
                </div>
                <p className="text-[10px] text-orange-400/70 font-medium">
                  {streakDayInCycle === 0 && streak > 0 ? "🎉 +250 🪙 earned!" : `${7 - streakDayInCycle} days to +250 🪙`}
                </p>
              </div>

              {nextUnlock &&
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:min-w-[140px] backdrop-blur-sm w-full md:w-auto">
                  <div className="flex items-center gap-1.5 text-[10px] text-white/40 uppercase tracking-widest font-bold mb-2">
                    <Lock className="w-3 h-3" />
                    Next Unlock
                  </div>
                  <p className="text-sm font-bold text-white">{nextUnlock.name}</p>
                  <p className="text-[11px] text-white/30 mt-0.5">{nextUnlock.unitsRequired} units needed</p>
                </div>
              }
            </div>
          </div>

          {/* Continue Lesson CTA — tablet/desktop only */}
          {nextLesson &&
          <div className="hidden min-[641px]:flex mt-6 pt-5 border-t border-white/10 items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <Wordmark className="text-base shrink-0 !text-white" />
                <div className="min-w-0">
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-0.5">Continue Your Journey</p>
                  <p className="text-sm font-bold text-white truncate">{nextLesson.title}</p>
                  <p className="text-xs text-white/40 mt-0.5">
                    Unit {currentUnit.unitNumber}: {currentUnit.title} · {currentUnitProgress}% complete
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-gold font-bold text-sm flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5" />+{Math.round(nextLesson.reward * getRewardMultiplier())}
                </span>
                <Link to={`/lessons/${nextLesson.id}`}>
                  <Button size="sm" className="press-scale gap-1.5">
                    Continue <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          }
        </div>

        {/* ──── JOIN A CLASS (shown to students not yet in a class) ──── */}
        {inClass === false &&
        <Card variant="elevated" className="mb-4 md:mb-8 border-primary/30">
          <CardContent className="p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold">Join a class</p>
                <p className="text-sm text-muted-foreground">Got a class code from your teacher? Enter it to join.</p>
              </div>
            </div>
            <form
              className="flex gap-2 w-full sm:w-auto"
              onSubmit={(e) => {e.preventDefault();handleJoinClass();}}>
              <Input
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="e.g. ABC123"
                maxLength={6}
                className="uppercase font-mono w-full sm:w-36" />
              <Button type="submit" disabled={!joinCode.trim() || joining}>
                {joining ? "Joining…" : "Join"}
              </Button>
            </form>
          </CardContent>
        </Card>
        }

        {/* ──── MOBILE CONTINUE CARD (separate from hero) ──── */}
        {nextLesson &&
        <div className="min-[641px]:hidden mb-4">
          <Card variant="elevated" className="p-4 border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <img alt="" className="w-8 h-8 object-contain shrink-0" src="/lovable-uploads/26a8ff86-40b5-4f21-9e6e-2bc94bee8dbc.png" />
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Continue Your Journey</p>
            </div>
            <p className="text-sm font-bold mb-1">{nextLesson.title}</p>
            <p className="text-xs text-muted-foreground mb-1">
              Unit {currentUnit.unitNumber}: {currentUnit.title} · {currentUnitProgress}% complete
            </p>
            <p className="text-gold font-bold text-sm flex items-center gap-1 mb-3">
              <Coins className="w-3.5 h-3.5" />+{Math.round(nextLesson.reward * getRewardMultiplier())}
            </p>
            <Link to={`/lessons/${nextLesson.id}`} className="block">
              <Button className="w-full press-scale gap-1.5 min-h-[44px]">
                Continue <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </Card>
        </div>
        }

        {/* ──── DAILY SIGNAL ──── */}
        <div className="mb-4 md:mb-8">
          <DailySignal />
        </div>

        {/* ──── STATS GRID ──── */}
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-4 md:mb-8">
          <StatCard
            title="Total Value"
            value={Math.floor(netWorth).toLocaleString()}
            subtitle={earnedToday > 0 ? `+${earnedToday.toLocaleString()} today` : "Cash + Investments"}
            icon={Coins}
            accentColor="gold" />
          <StatCard
            title="Cash Balance"
            value={jeffsBalance.toLocaleString()}
            subtitle="Available to spend"
            icon={Wallet}
            accentColor="gold" />

          <StatCard title="Portfolio Value" value={Math.floor(portfolioValue).toLocaleString()} icon={LineChart} accentColor="primary" />
          <StatCard title="Level" value={`${currLevel}`} subtitle={LEVEL_NAMES[currLevel - 1] || "Master"} icon={Star} accentColor="accent" />
          <StatCard title="Missions Done" value={`${completedLessons}/${totalLessons}`} icon={BookOpen} accentColor="primary" />
          <StatCard title="Stocks Owned" value={portfolio.length.toString()} icon={TrendingUp} accentColor="primary" />
        </div>

        {/* ──── MISSION PREVIEW SECTION ──── */}
        <div className="mb-4 md:mb-8">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h3 className="font-display text-sm md:text-base font-bold flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Mission Progress
            </h3>
            <Link to="/lessons">
              <Button variant="ghost" size="sm" className="press-scale text-xs min-h-[44px] md:min-h-0">
                View All Missions <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          {/* Overall progress */}
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Overall Progress</span>
              <span className="text-sm font-bold">{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} variant="success" />
          </div>

          {/* Unit Progress Grid — derived from unitInfo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {unitOverviewCards.map((unit) =>
            <Link
              key={unit.id}
              to="/lessons"
              className="p-4 rounded-2xl bg-card border border-border/40 hover:bg-muted/40 transition-all group hover-lift press-scale">

                <div className="flex items-center justify-between mb-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Unit {unit.unitNumber}</p>
                    <p className="text-sm font-bold truncate">{unit.title}</p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <Progress value={unit.progress} variant="success" className="h-2" />
                  </div>
                  <span className="text-[11px] text-muted-foreground font-semibold shrink-0">{unit.done}/{unit.total}</span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[11px] text-gold font-bold flex items-center gap-1">
                    <Coins className="w-3 h-3" />{unit.remainingReward.toLocaleString()} left
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* ──── AP MICROECONOMICS ELECTIVE ──── */}
        <button
          onClick={() => {
            try { localStorage.setItem("investiplay_active_track", "ap-micro"); } catch { /* ignore */ }
            navigate("/lessons");
          }}
          className="w-full text-left rounded-2xl p-5 mb-4 md:mb-8 relative overflow-hidden press-scale"
          style={{ background: "linear-gradient(135deg,#0f2d1e 0%,#14432e 55%,#1D9E75 140%)" }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-1">Elective course</p>
              <h3 className="font-display text-lg font-extrabold text-white tracking-tight">AP Microeconomics</h3>
              <p className="text-white/55 text-sm mt-0.5">6 College Board–aligned units. Available in any state — your required curriculum is unaffected.</p>
            </div>
            <span className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-white/10 border border-white/15 px-3 py-2 text-sm font-bold text-white">
              Start <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </button>

        {/* ──── DAILY MISSIONS ──── */}
        <DailyMissions
          lessonProgress={lessonProgress}
          portfolio={portfolio}
          earnJeffs={earnJeffs}
        />

        {/* ──── BADGES STRIP ──── */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-base font-bold flex items-center gap-2">
              <Award className="w-4 h-4 text-gold" />
              Badges
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-semibold">{unlockedBadgeCount}/{BADGES.length} unlocked</span>
              <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${unlockedBadgeCount / BADGES.length * 100}%` }} />
              </div>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {BADGES.map((badge) => {
              const unlocked = completedLessons >= badge.unlockAt;
              const Icon = badge.icon;
              return (
                <div
                  key={badge.name}
                  title={unlocked ? badge.name : `Unlock: Complete ${badge.unlockAt} lessons`}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl min-w-[80px] border transition-all cursor-default ${
                  unlocked ?
                  "bg-gold/8 border-gold/20 shadow-gold-glow" :
                  "bg-muted/30 border-border/40 opacity-50 grayscale"}`
                  }>

                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center relative ${
                  unlocked ? "bg-gold/15" : "bg-muted"}`
                  }>
                    <Icon className={`w-5 h-5 ${unlocked ? "text-gold" : "text-muted-foreground/40"}`} />
                    {!unlocked && <Lock className="w-3 h-3 absolute -bottom-0.5 -right-0.5 text-muted-foreground/50" />}
                    {unlocked && <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-gold" style={{ animation: 'sparkle 2s ease-in-out infinite' }} />}
                  </div>
                  <p className="text-[10px] font-semibold text-center leading-tight">{badge.name}</p>
                </div>);

            })}
          </div>
        </div>

        {/* ──── THREE COLUMN LAYOUT ──── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Portfolio */}
          <Card variant="elevated" className="card-tier-1 hover-lift">
            <CardHeader className="flex flex-row items-center justify-between p-6">
              <CardTitle className="flex items-center gap-2 text-base">
                <Wallet className="w-4 h-4 text-primary" />
                My Portfolio
              </CardTitle>
              <Link to="/stocks">
                <Button variant="ghost" size="sm" className="press-scale">
                  Trade <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              {portfolio.length > 0 ?
              <div className="space-y-1">
                  {portfolio.slice(0, 4).map(({ symbol, shares, purchasePrice }) => {
                  const currentPrice = livePrices.get(symbol) ?? purchasePrice;
                  const currentValue = shares * currentPrice;
                  const profitLossPercent = (currentPrice - purchasePrice) / purchasePrice * 100;
                  const profitLoss = currentValue - shares * purchasePrice;

                  return (
                    <Link key={symbol} to={`/stocks/${encodeURIComponent(symbol)}`}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/40 transition-all press-scale">
                        <div>
                          <p className="font-bold text-sm">{symbol}</p>
                          <p className="text-xs text-muted-foreground">{shares} shares</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm flex items-center justify-end gap-1">
                            <Coins className="w-3.5 h-3.5 text-gold" />
                            {Math.floor(currentValue).toLocaleString()}
                          </p>
                          <p className={`text-xs flex items-center justify-end gap-1 ${profitLoss >= 0 ? "text-success" : "text-destructive"}`}>
                            {profitLoss >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {profitLoss >= 0 ? "+" : ""}{profitLossPercent.toFixed(1)}%
                          </p>
                        </div>
                      </Link>);

                })}
                </div> :

              <EmptyState icon={Wallet} label="No stocks owned yet" cta="Buy Stocks" to="/stocks" />
              }
            </CardContent>
          </Card>

          {/* Watchlist */}
          <Card variant="elevated" className="card-tier-1 hover-lift">
            <CardHeader className="flex flex-row items-center justify-between p-6">
              <CardTitle className="flex items-center gap-2 text-base">
                <Star className="w-4 h-4 text-warning" />
                Watchlist
              </CardTitle>
              <Link to="/stocks">
                <Button variant="ghost" size="sm" className="press-scale">
                  View All <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              {watchlist.length > 0 ?
              <div className="space-y-1">
                  {watchlist.slice(0, 6).map((sym) => {
                  const lp = watchlistPrices.get(sym);
                  const isGain = lp && (lp.change ?? 0) >= 0;
                  return (
                    <Link key={sym} to={`/stocks/${encodeURIComponent(sym)}`}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/40 transition-all press-scale">
                        <div>
                          <p className="font-bold text-sm">{sym}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[120px]">{lp?.name || sym}</p>
                        </div>
                        <div className="text-right">
                          {lp ?
                        <>
                              <p className="font-bold text-sm">{lp.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                              {lp.changePercent != null &&
                          <p className={`text-xs flex items-center justify-end gap-1 ${isGain ? "text-success" : "text-destructive"}`}>
                                  {isGain ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                  {lp.changePercent.toFixed(2)}%
                                </p>
                          }
                            </> :

                        <span className="text-xs text-muted-foreground">Loading...</span>
                        }
                        </div>
                      </Link>);

                })}
                </div> :

              <div className="text-center py-10 rounded-2xl bg-muted/20 border border-dashed border-border/40">
                  <StarOff className="w-8 h-8 mx-auto text-muted-foreground/30 mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">Your Watchlist is empty.</p>
                  <p className="text-xs text-muted-foreground/60 mb-4">Tap ⭐ on any stock to add it.</p>
                  <Link to="/stocks">
                    <Button variant="hero" size="sm" className="press-scale">Browse Stocks</Button>
                  </Link>
                </div>
              }
            </CardContent>
          </Card>

          {/* Micro-Business */}
          <Card variant="elevated" className="card-tier-1 hover-lift">
            <CardHeader className="flex flex-row items-center justify-between p-6">
              <CardTitle className="flex items-center gap-2 text-base">
                <Coins className="w-4 h-4 text-primary" />
                My Business
              </CardTitle>
              <Link to="/micro-business">
                <Button variant="ghost" size="sm" className="press-scale">
                  Open <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <EmptyState icon={Coins} label="Build your micro-business" cta="Get Started" to="/micro-business" />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>);

}

/* ──── Sub-components ──── */

function EmptyState({ icon: Icon, label, cta, to }: {icon: React.ComponentType<{className?: string;}>;label: string;cta: string;to: string;}) {
  return (
    <div className="text-center py-10 rounded-2xl bg-muted/20 border border-dashed border-border/40">
      <div className="relative w-fit mx-auto mb-3">
        <img alt="" className="w-8 h-8 object-contain mx-auto mb-2" src="/lovable-uploads/3e63c29a-3f71-4350-96db-209ca70ada67.png" />
        <Icon className="w-8 h-8 text-muted-foreground/20" />
      </div>
      <p className="text-sm text-muted-foreground mb-4">{label}</p>
      <Link to={to}>
        <Button variant="hero" size="sm" className="press-scale">{cta}</Button>
      </Link>
    </div>);

}

function StatCard({ title, value, subtitle, icon: Icon, accentColor }: {title: string;value: string;subtitle?: string;icon: React.ComponentType<{className?: string;}>;accentColor: string;}) {
  const isGold = accentColor === 'gold';
  const colorMap: Record<string, {bg: string;text: string;strip: string;}> = {
    gold: { bg: "bg-gold/10", text: "text-gold", strip: "from-gold to-gold/40" },
    primary: { bg: "bg-primary/10", text: "text-primary", strip: "from-primary to-primary/30" },
    accent: { bg: "bg-accent/10", text: "text-accent", strip: "from-accent to-accent/30" },
    secondary: { bg: "bg-secondary/10", text: "text-secondary", strip: "from-secondary to-secondary/30" }
  };
  const c = colorMap[accentColor] || colorMap.primary;

  return (
    <Card
      variant="elevated"
      className={`relative overflow-hidden p-3.5 md:p-5 hover-lift press-scale cursor-default ${
      isGold ? "border-gold/20" : ""}`
      }>

      {/* Top accent strip */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${c.strip}`} />
      <div className="flex flex-col gap-2">
        <div className={`p-2 rounded-xl w-fit ${c.bg}`}>
          <Icon className={`w-4 h-4 ${c.text}`} />
        </div>
        <div>
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">{title}</p>
          <p className={`text-xl min-[420px]:text-[22px] font-extrabold capitalize tracking-tight leading-tight mt-0.5 ${isGold ? "text-gold" : ""}`}>{value}</p>
          {subtitle &&
          <p className={`text-[10px] mt-0.5 font-medium ${isGold ? "text-gold/60" : "text-muted-foreground"}`}>{subtitle}</p>
          }
        </div>
      </div>
    </Card>);

}