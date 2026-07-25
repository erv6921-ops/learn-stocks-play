import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { useNetWorth } from "@/hooks/useNetWorth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from "framer-motion";
import GameNav from "@/components/GameNav";
import { Wordmark } from "@/components/Wordmark";
import { lessons, unitInfo, getLessonsByUnit, getUnitRewardTotal } from "@/data/lessons";
import { supabase } from "@/integrations/supabase/client";
import { anchor } from "@/lib/tourAnchors";
import { isEarnedEntry } from "@/lib/playerStats";
import { getLeague } from "@/lib/leagues";
import { CoasterTrack } from "./Lessons";
import { loadActivities, bizDef, type ActivitiesState, type BusinessType } from "@/lib/businessActivities";
import { type BizState, monthlyRevenue, statusLabel } from "@/lib/businessSim";
import {
  BookOpen, LineChart, Coins, TrendingUp, TrendingDown,
  Star, StarOff, ChevronRight, Wallet,
  GraduationCap, Flame, Lock, Trophy, Shield, Zap, Award, Store, Landmark, FlaskConical,
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

  // ── Daily Challenge: today's game + whether it's already been completed ──
  const dailyDate = new Date();
  const dailyToday = `${dailyDate.getFullYear()}-${String(dailyDate.getMonth() + 1).padStart(2, "0")}-${String(dailyDate.getDate()).padStart(2, "0")}`;
  const dailyGameName = dailyDate.getDate() % 2 === 0 ? "Higher or Lower" : "Daily Scenario";
  // Live micro-business state so the dashboard snapshot mirrors /micro-business.
  const [bizActivities, setBizActivities] = useState<ActivitiesState | null>(null);
  useEffect(() => { loadActivities().then(setBizActivities); }, []);
  const bizType = bizActivities?.businessType ?? null;
  const bizSim = (bizActivities?.sim as BizState | undefined) ?? null;
  const hasBusiness = !!bizType;

  const [dailyDone, setDailyDone] = useState(false);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!user?.id) return;
      const { data } = await supabase.
      from("daily_game_completions").
      select("id").
      eq("user_id", user.id).
      eq("game_date", dailyToday).
      maybeSingle();
      if (!cancelled) setDailyDone(!!data);
    })();
    return () => {cancelled = true;};
  }, [user?.id, dailyToday]);

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
  const myLeague = getLeague(jeffsBalance);
  const earnedToday = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return jeffsHistory
      .filter((h) => isEarnedEntry(h) && new Date(h.date).getTime() >= today.getTime())
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

  // ── Class rank (same RPC as the Leaderboard page) ──
  const [rankInfo, setRankInfo] = useState<{ rank: number; pts: number } | null>(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!user?.id) return;
      const { data: memberships } = await supabase.from("class_members").select("class_id").eq("user_id", user.id);
      const classId = memberships?.[0]?.class_id;
      if (!classId) return;
      const { data: lb } = await supabase.rpc("get_class_leaderboard", { _class_id: classId });
      if (cancelled || !lb) return;
      const sorted = [...lb].sort((a, b) => Number(b.xp) - Number(a.xp));
      const idx = sorted.findIndex((r) => r.user_id === user.id);
      if (idx !== -1) setRankInfo({ rank: idx + 1, pts: Math.round(Number(sorted[idx].xp)) });
    })();
    return () => { cancelled = true; };
  }, [user?.id]);

  // ── Active class challenge (same table the Challenges page uses) ──
  const [challenge, setChallenge] = useState<{ title: string; pot: number; entry_fee: number; ends_at: string } | null>(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!user?.id) return;
      const { data: memberships } = await supabase.from("class_members").select("class_id").eq("user_id", user.id);
      const classIds = (memberships ?? []).map((m) => m.class_id);
      if (classIds.length === 0) return;
      const { data } = await (supabase as any)
        .from("class_challenges").select("*").in("class_id", classIds).eq("status", "active");
      if (cancelled) return;
      const live = ((data ?? []) as { title: string; pot: number; entry_fee: number; ends_at: string }[])
        .filter((ch) => new Date(ch.ends_at).getTime() > Date.now());
      if (live.length > 0) setChallenge(live[0]);
    })();
    return () => { cancelled = true; };
  }, [user?.id]);

  // ── This week: lessons completed + 7-day activity dots ──
  const weekInfo = useMemo(() => {
    const dayStart = (offset: number) => {
      const d = new Date(); d.setDate(d.getDate() - offset); d.setHours(0, 0, 0, 0);
      return d.getTime();
    };
    const completedTimes = lessonProgress
      .filter((p) => p.completed && p.completedAt)
      .map((p) => new Date(p.completedAt as Date).getTime());
    const days: boolean[] = [];
    for (let i = 6; i >= 0; i--) {
      const start = dayStart(i);
      days.push(completedTimes.some((t) => t >= start && t < start + 86400000));
    }
    const weekStart = dayStart(6);
    const count = completedTimes.filter((t) => t >= weekStart).length;
    return { days, count };
  }, [lessonProgress]);

  // ── Portfolio P/L% (live value vs cost basis) ──
  const costBasis = portfolio.reduce((s, h) => s + h.shares * h.purchasePrice, 0);
  const plPct = costBasis > 0 ? ((portfolioValue - costBasis) / costBasis) * 100 : 0;

  // ── Roller coaster inputs for the current unit (reuses the Missions coaster) ──
  const coasterLessons = useMemo(
    () => currentUnitLessons.map((l) => ({ lesson: l, status: "required" as const })),
    [currentUnitLessons]
  );
  const coasterIdx = useMemo(() => {
    const i = currentUnitLessons.findIndex((l) => !isLessonCompleted(l.id));
    return i === -1 ? Math.max(0, currentUnitLessons.length - 1) : i;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUnitLessons, lessonProgress]);
  const coasterUnlocked = (lessonId: string): boolean => {
    const i = currentUnitLessons.findIndex((l) => l.id === lessonId);
    if (i <= 0) return i === 0;
    return isLessonCompleted(currentUnitLessons[i - 1].id);
  };

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
    <div className="min-h-screen" style={{ background: "#f0f5f3" }}>
      <GameNav />

      <main className="p-4 pb-28 md:pb-6">
        {/* ──── JOIN A CLASS (only for students not yet in one) ──── */}
        {inClass === false &&
        <MCard i={0} className="mb-3">
          <Card variant="elevated" className="border-primary/30 rounded-[10px]">
            <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold">Join a class</p>
                  <p className="text-sm text-muted-foreground">Got a class code from your teacher? Enter it to join.</p>
                </div>
              </div>
              <form className="flex gap-2 w-full sm:w-auto" onSubmit={(e) => {e.preventDefault();handleJoinClass();}}>
                <Input value={joinCode} onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  placeholder="e.g. ABC123" maxLength={6} className="uppercase font-mono w-full sm:w-36" />
                <Button type="submit" disabled={!joinCode.trim() || joining}>{joining ? "Joining…" : "Join"}</Button>
              </form>
            </CardContent>
          </Card>
        </MCard>
        }

        {/* ═══ SPLIT SCREEN: coaster + next lesson (left) · live stat rail (right) ═══ */}
        <div className="flex flex-col min-[900px]:flex-row gap-3 items-start">

          {/* ── LEFT COLUMN (~65%) ── */}
          <div className="w-full min-[900px]:flex-[2] min-w-0 space-y-3">
            {/* Roller coaster progress — the exact component from Missions */}
            <MCard i={1}>
              <div className="bg-white rounded-[10px] overflow-hidden" style={{ border: "0.5px solid #e0e8e3" }}>
                <div className="px-5 pt-4 pb-1 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                      Unit {currentUnit.unitNumber} · Your ride
                    </p>
                    <p className="font-display font-extrabold text-lg tracking-tight truncate">{currentUnit.title}</p>
                  </div>
                  <span className="shrink-0 text-sm font-bold" style={{ color: "#1D9E75" }}>
                    {currentUnitCompleted}/{currentUnitLessons.length} · {currentUnitProgress}%
                  </span>
                </div>
                <CoasterTrack
                  lessons={coasterLessons}
                  currentIdx={coasterIdx}
                  unitTotalPts={Math.round(getUnitRewardTotal(currentUnit.id) * getRewardMultiplier())}
                  isUnlocked={coasterUnlocked}
                  isCompleted={(al) => isLessonCompleted(al.lesson.id)}
                  onSelect={(id) => navigate(`/lessons/${id}`)}
                  celebrate={currentUnitProgress === 100}
                />
              </div>
            </MCard>

            {/* Next lesson */}
            {nextLesson && (
              <MCard i={2}>
                <div className="bg-white rounded-[10px] p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-4" style={{ border: "0.5px solid #e0e8e3" }}>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-1">
                      Next lesson · Unit {currentUnit.unitNumber}
                    </p>
                    <p className="font-display font-extrabold text-base tracking-tight">{nextLesson.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">{nextLesson.description}</p>
                    <p className="text-sm font-bold mt-1.5" style={{ color: "#1D9E75" }}>
                      +{Math.round(nextLesson.reward * getRewardMultiplier()).toLocaleString()} coins on completion
                    </p>
                  </div>
                  <Link to={`/lessons/${nextLesson.id}`} className="shrink-0">
                    <Button className="press-scale gap-1.5 font-bold px-6" style={{ background: "#1D9E75" }}>
                      Start <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </MCard>
            )}
          </div>

          {/* ── RIGHT SIDEBAR (~35%) — live stat cards ── */}
          <div className="w-full min-[900px]:flex-1 min-w-0 flex flex-row min-[900px]:flex-col gap-2 overflow-x-auto min-[900px]:overflow-visible no-scrollbar pb-1 min-[900px]:pb-0">

            {/* 1 · Today's daily game */}
            <MCard i={3} className="min-w-[240px] min-[900px]:min-w-0 flex-1">
              <div className="rounded-[10px] p-4 text-white h-full" style={{ background: "#0f2d1e" }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">Today</p>
                <p className="font-display font-extrabold text-lg mt-1">{dailyGameName}</p>
                <p className="text-sm font-bold mt-0.5" style={{ color: "#4ade80" }}>+75 coins</p>
                {dailyDone ? (
                  <p className="mt-3 text-sm font-bold text-center py-2 rounded-[6px] bg-white/5" style={{ color: "#4ade80" }}>Completed ✓</p>
                ) : (
                  <Link to="/daily" className="block mt-3">
                    <button className="w-full py-2 rounded-[6px] bg-white/15 hover:bg-white/25 text-white text-sm font-bold transition-colors press-scale">
                      Play →
                    </button>
                  </Link>
                )}
              </div>
            </MCard>

            {/* 2 · Class rank — hidden when not in a class */}
            {rankInfo && (
              <MCard i={4} className="min-w-[240px] min-[900px]:min-w-0 flex-1">
                <Link to="/leaderboard" className="block h-full">
                  <div className="rounded-[10px] p-4 text-white h-full press-scale" style={{ background: "#0f2d1e" }}>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">Class rank</p>
                    <p className="font-display font-extrabold text-3xl mt-1" style={{ color: "#4ade80" }}>#{rankInfo.rank}</p>
                    <p className="text-sm text-white/70 mt-1">
                      {rankInfo.pts.toLocaleString()} pts{streak > 0 ? ` · ${streak} day streak 🔥` : ""}
                    </p>
                  </div>
                </Link>
              </MCard>
            )}

            {/* 3 · Active challenge */}
            <MCard i={5} className="min-w-[240px] min-[900px]:min-w-0 flex-1">
              <div className="bg-white rounded-[10px] p-4 h-full" style={{ border: "1px solid rgba(29,158,117,0.35)" }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Challenge pot</p>
                {challenge ? (
                  <>
                    <p className="font-display font-extrabold text-2xl mt-1" style={{ color: "#1D9E75" }}>
                      🪙 {challenge.pot.toLocaleString()}
                    </p>
                    <p className="text-sm text-foreground/80 mt-0.5 truncate">
                      {challenge.title} · {timeLeft(challenge.ends_at)}
                    </p>
                    <Link to="/challenges" className="block mt-3">
                      <button className="w-full py-2 rounded-[6px] text-white text-sm font-bold press-scale" style={{ background: "#0f2d1e" }}>
                        Enter · {challenge.entry_fee} coins
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="font-bold text-sm mt-2">No active challenges</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Check back soon</p>
                  </>
                )}
              </div>
            </MCard>

            {/* 4 · InvestiCoins balance */}
            <MCard i={6} className="min-w-[240px] min-[900px]:min-w-0 flex-1">
              <div className="bg-white rounded-[10px] p-4 h-full" style={{ border: "0.5px solid #e0e8e3" }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Coins</p>
                <p className="font-display font-extrabold text-2xl mt-1 flex items-center gap-1.5">
                  <Coins className="w-5 h-5 text-gold" /> {jeffsBalance.toLocaleString()}
                </p>
                {earnedToday > 0 && (
                  <p className="text-sm font-bold mt-0.5" style={{ color: "#1D9E75" }}>+{earnedToday.toLocaleString()} earned today</p>
                )}
                <p className="text-xs text-muted-foreground/60 mt-3">Visit shop</p>
              </div>
            </MCard>
          </div>
        </div>

        {/* ═══ BOTTOM ROW — badges · portfolio · this week ═══ */}
        <div className="grid grid-cols-1 min-[900px]:grid-cols-3 gap-2 mt-3">
          {/* Badges */}
          <MCard i={7}>
            <div className="bg-white rounded-[10px] p-4 h-full" style={{ border: "0.5px solid #e0e8e3" }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-3">Badges</p>
              <div className="flex items-center gap-3">
                {BADGES.slice(0, 4).map((badge) => {
                  const unlocked = completedLessons >= badge.unlockAt;
                  const Icon = badge.icon;
                  return (
                    <div key={badge.name} title={unlocked ? badge.name : `Unlock: complete ${badge.unlockAt} lessons`}
                      className={`w-11 h-11 rounded-full flex items-center justify-center relative ${unlocked ? "" : "grayscale opacity-50"}`}
                      style={{ background: unlocked ? "linear-gradient(135deg,#1D9E75,#0f2d1e)" : "#e8eeeb" }}>
                      <Icon className={`w-5 h-5 ${unlocked ? "text-white" : "text-muted-foreground"}`} />
                      {!unlocked && <Lock className="w-3 h-3 absolute -bottom-0.5 -right-0.5 text-muted-foreground/60" />}
                    </div>
                  );
                })}
              </div>
              <p className="text-sm font-bold mt-3">{unlockedBadgeCount} earned</p>
            </div>
          </MCard>

          {/* Portfolio value */}
          <MCard i={8}>
            <div className="bg-white rounded-[10px] p-4 h-full" style={{ border: "0.5px solid #e0e8e3" }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Portfolio</p>
              <p className="font-display font-extrabold text-2xl mt-1">🪙 {Math.floor(portfolioValue).toLocaleString()}</p>
              {portfolio.length > 0 && (
                <p className={`text-sm font-bold mt-0.5 ${plPct >= 0 ? "text-success" : "text-destructive"}`}>
                  {plPct >= 0 ? "▲" : "▼"} {plPct >= 0 ? "+" : ""}{plPct.toFixed(1)}%
                </p>
              )}
              <Link to="/stocks" className="inline-block text-sm font-bold mt-3" style={{ color: "#1D9E75" }}>
                View stocks →
              </Link>
            </div>
          </MCard>

          {/* This week */}
          <MCard i={9}>
            <div className="bg-white rounded-[10px] p-4 h-full" style={{ border: "0.5px solid #e0e8e3" }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">This week</p>
              <p className="font-display font-extrabold text-2xl mt-1">
                {weekInfo.count} {weekInfo.count === 1 ? "lesson" : "lessons"}
              </p>
              <div className="flex items-center gap-1.5 mt-3">
                {weekInfo.days.map((active, i) => (
                  <span key={i} className="w-2.5 h-2.5 rounded-full"
                    style={{ background: active ? "#1D9E75" : "#dbe4df" }} />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">last 7 days</p>
            </div>
          </MCard>
        </div>
      </main>
    </div>);

}

/* ──── Sub-components ──── */

// Cascade wrapper: fade + slide up, 0.05s stagger between cards.
function MCard({ i, children, className }: { i: number; children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Human "time left" for challenge deadlines.
function timeLeft(endsAt: string): string {
  const ms = new Date(endsAt).getTime() - Date.now();
  if (ms <= 0) return "ended";
  const days = Math.floor(ms / 86400000);
  if (days > 0) return `${days}d left`;
  const hours = Math.floor(ms / 3600000);
  return hours > 0 ? `${hours}h left` : "ending soon";
}
