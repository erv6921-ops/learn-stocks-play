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
import AnimatedNumber from "@/components/AnimatedNumber";
import GameNav from "@/components/GameNav";
import { Wordmark } from "@/components/Wordmark";
import { lessons, unitInfo, getLessonsByUnit, getUnitRewardTotal } from "@/data/lessons";
import { supabase } from "@/integrations/supabase/client";
import { anchor } from "@/lib/tourAnchors";
import { isEarnedEntry } from "@/lib/playerStats";
import { getLeague } from "@/lib/leagues";
import { CoasterTrack } from "./Lessons";
import FullScreenCoaster from "@/components/FullScreenCoaster";
import DailyMissions from "@/components/DailyMissions";
import { loadActivities, bizDef, type ActivitiesState, type BusinessType } from "@/lib/businessActivities";
import { type BizState, monthlyRevenue, statusLabel } from "@/lib/businessSim";
import {
  BookOpen, LineChart, Coins, TrendingUp, TrendingDown,
  Star, StarOff, ChevronRight, Wallet,
  GraduationCap, Flame, Lock, Trophy, Shield, Zap, Award, Store, Landmark, FlaskConical, Maximize2, Minimize2, Users,
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

  // Friends snapshot — accepted partners + waiting invites (Partners page RPCs).
  const [friendsInfo, setFriendsInfo] = useState<{ count: number; names: string[]; invites: number } | null>(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!user?.id) return;
      const [{ data: partners }, { data: requests }] = await Promise.all([
        (supabase as any).rpc("get_partners"),
        (supabase as any).rpc("get_partner_requests"),
      ]);
      if (cancelled) return;
      const rows = (partners ?? []) as { first_name: string | null; last_name: string | null }[];
      setFriendsInfo({
        count: rows.length,
        names: rows.slice(0, 3).map((r) => `${r.first_name || ""} ${(r.last_name || "").charAt(0)}${r.last_name ? "." : ""}`.trim()).filter(Boolean),
        invites: ((requests ?? []) as unknown[]).length,
      });
    })();
    return () => { cancelled = true; };
  }, [user?.id]);

  // Fullscreen roller-coaster overlay toggle.
  const [coasterFull, setCoasterFull] = useState(false);

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

        {/* ═══ 1. ROLLER COASTER — full-width strip ═══ */}
        <MCard i={1}>
          <div className="bg-white rounded-[20px] overflow-hidden relative" style={{ border: "0.5px solid #e0e8e3", boxShadow: "var(--shadow-md)" }}>
            {/* gold→mint hairline + soft corner glow */}
            <div className="absolute top-0 left-0 right-0 h-[2.5px]"
              style={{ background: "linear-gradient(90deg, #E3A008, #1D9E75 55%, transparent)" }} />
            <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full blur-3xl pointer-events-none"
              style={{ background: "rgba(29,158,117,0.08)" }} />
            <div className="px-5 md:px-6 pt-5 pb-1 flex items-center justify-between gap-3 relative">
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#1D9E75" }} />
                  Unit {currentUnit.unitNumber} · Your ride
                </p>
                <p className="font-display font-extrabold text-xl tracking-tight truncate mt-0.5">{currentUnit.title}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[12px] font-extrabold px-3 py-1.5 rounded-full"
                  style={{ color: "#0f6b4f", background: "rgba(29,158,117,0.1)", border: "1px solid rgba(29,158,117,0.18)" }}>
                  {currentUnitCompleted}/{currentUnitLessons.length} · {currentUnitProgress}%
                </span>
                <button
                  onClick={() => setCoasterFull(true)}
                  className="nav-bounce inline-flex items-center gap-1.5 rounded-full pl-2.5 pr-3.5 py-2 text-[13px] font-bold text-white shadow-md"
                  style={{ background: "linear-gradient(135deg,#2FD39B,#0F7E5C)", boxShadow: "0 6px 16px rgba(15,126,92,0.35)" }}
                >
                  <Maximize2 className="w-4 h-4" /> Fullscreen
                </button>
              </div>
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

        {/* ═══ 2. SNAPSHOT — four tinted stat boxes ═══ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
          {[
            { i: 2, icon: Coins, tint: "#E3A008", label: "Cash", num: jeffsBalance, sub: earnedToday > 0 ? `+${earnedToday.toLocaleString()} today` : "InvestiCoins ready to spend" },
            { i: 3, icon: Flame, tint: "#F97316", label: "Streak", num: streak, suffix: ` day${streak === 1 ? "" : "s"}`, pulse: streak > 0, sub: streak > 0 ? "Don't break the chain" : "Play today to start one" },
            { i: 4, icon: TrendingUp, tint: "#1D9E75", label: "Stocks owned", num: portfolio.length, sub: portfolio.length > 0 ? `🪙 ${Math.floor(portfolioValue).toLocaleString()} invested` : "Make your first trade" },
            { i: 5, icon: BookOpen, tint: "#8B5CF6", label: "Lessons", num: completedLessons, suffix: `/${totalLessons}`, sub: `${progressPercent}% of the course`, progress: progressPercent },
          ].map((st) => (
            <MCard key={st.label} i={st.i}>
              <div className="group bg-white rounded-[20px] p-4 md:p-5 relative overflow-hidden hover-lift press-scale h-full"
                style={{ border: "0.5px solid #e0e8e3", boxShadow: "var(--shadow-sm)" }}>
                <div className="absolute top-0 left-0 right-0 h-[2.5px]"
                  style={{ background: `linear-gradient(90deg, ${st.tint}, ${st.tint}00 70%)` }} />
                <div className="absolute -right-7 -top-7 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ background: `${st.tint}1f` }} />
                <div className="relative">
                  <motion.span
                    initial={{ scale: 0, rotate: -12 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.1 + st.i * 0.05 }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 border group-hover:scale-110 transition-transform"
                    style={{ background: `linear-gradient(135deg, ${st.tint}26, ${st.tint}0a)`, color: st.tint, borderColor: `${st.tint}26` }}>
                    <st.icon className="w-4 h-4" style={st.pulse ? { animation: "streak-pulse 2s ease-in-out infinite" } : undefined} />
                  </motion.span>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{st.label}</p>
                  <p className="font-display text-[22px] font-extrabold tracking-tight leading-tight mt-0.5 tabular-nums">
                    <AnimatedNumber value={st.num} countUp />{st.suffix ?? ""}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{st.sub}</p>
                  {st.progress != null && (
                    <div className="mt-3 h-1 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${st.progress}%` }}
                        transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
                        className="h-full rounded-full" style={{ background: st.tint }} />
                    </div>
                  )}
                </div>
              </div>
            </MCard>
          ))}
        </div>

        {/* ═══ 3. DAILIES — challenge + missions ═══ */}
        <div className="grid grid-cols-1 min-[900px]:grid-cols-2 gap-3 mt-3 items-start">
          <MCard i={6}>
            <div className={`rounded-[20px] p-5 text-white relative overflow-hidden hover-lift ${dailyDone ? "opacity-75" : ""}`} style={{ background: "linear-gradient(135deg,#0f3d2a,#06291f)", boxShadow: "var(--shadow-md)" }}>
              <div className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: "linear-gradient(90deg, transparent, rgba(43,182,115,0.7), transparent)" }} />
              <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full blur-2xl pointer-events-none"
                style={{ background: "rgba(43,182,115,0.14)" }} />
              <p className="relative text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">Daily challenge</p>
              <div className="relative flex items-center justify-between gap-4 mt-2.5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border border-white/5" style={{ background: "rgba(43,182,115,0.18)" }}>
                    <Flame className="w-5 h-5 text-success" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display font-extrabold text-lg truncate">{dailyGameName}</p>
                    <p className="text-sm font-bold mt-0.5" style={{ color: "#4ade80" }}>+75 coins</p>
                  </div>
                </div>
                {dailyDone ? (
                  <span className="shrink-0 text-sm font-bold px-4 py-2 rounded-[6px] bg-white/5" style={{ color: "#4ade80" }}>Completed ✓</span>
                ) : (
                  <Link to="/daily" className="shrink-0">
                    <button className="px-6 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-sm font-bold transition-colors press-scale border border-white/10">
                      Play →
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </MCard>

          <MCard i={7}>
            <DailyMissions
              lessonProgress={lessonProgress}
              portfolio={portfolio}
              earnJeffs={earnJeffs} />
          </MCard>
        </div>

        {/* ═══ 4. SNAPSHOTS — business · portfolio · friends ═══ */}
        <div className="grid grid-cols-1 min-[900px]:grid-cols-3 gap-3 mt-3 items-stretch">
          {/* Micro-business */}
          <MCard i={8}>
            <Link to="/micro-business" className="block h-full">
              <div className="group bg-white rounded-[20px] p-5 relative overflow-hidden hover-lift press-scale h-full"
                style={{ border: "0.5px solid #e0e8e3", boxShadow: "var(--shadow-sm)" }}>
                <div className="absolute top-0 left-0 right-0 h-[2.5px]" style={{ background: "linear-gradient(90deg, #0F766E, #0F766E00 70%)" }} />
                <div className="absolute -right-7 -top-7 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" style={{ background: "#0F766E1f" }} />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <motion.span
                      initial={{ scale: 0, rotate: -12 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.55 }}
                      className="w-9 h-9 rounded-xl flex items-center justify-center border group-hover:scale-110 transition-transform"
                      style={{ background: "linear-gradient(135deg, #0F766E26, #0F766E0a)", color: "#0F766E", borderColor: "#0F766E26" }}>
                      <Store className="w-4 h-4" />
                    </motion.span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mt-3">My business</p>
                  {hasBusiness && bizSim ? (
                    <>
                      <p className="font-display text-[22px] font-extrabold tracking-tight leading-tight mt-0.5">Month <AnimatedNumber value={bizSim.month} countUp /></p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {statusLabel(bizSim).label} · 🪙 {monthlyRevenue(bizSim).toLocaleString()}/mo · {bizSim.customers.toLocaleString()} customers
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-display text-[22px] font-extrabold tracking-tight leading-tight mt-0.5">Start yours</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Build a company from scratch</p>
                    </>
                  )}
                </div>
              </div>
            </Link>
          </MCard>

          {/* Portfolio */}
          <MCard i={9}>
            <Link to="/stocks" className="block h-full">
              <div className="group bg-white rounded-[20px] p-5 relative overflow-hidden hover-lift press-scale h-full"
                style={{ border: "0.5px solid #e0e8e3", boxShadow: "var(--shadow-sm)" }}>
                <div className="absolute top-0 left-0 right-0 h-[2.5px]" style={{ background: "linear-gradient(90deg, #3BA7C4, #3BA7C400 70%)" }} />
                <div className="absolute -right-7 -top-7 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" style={{ background: "#3BA7C41f" }} />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <motion.span
                      initial={{ scale: 0, rotate: -12 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.55 }}
                      className="w-9 h-9 rounded-xl flex items-center justify-center border group-hover:scale-110 transition-transform"
                      style={{ background: "linear-gradient(135deg, #3BA7C426, #3BA7C40a)", color: "#3BA7C4", borderColor: "#3BA7C426" }}>
                      <LineChart className="w-4 h-4" />
                    </motion.span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mt-3">Portfolio</p>
                  {portfolio.length > 0 ? (
                    <>
                      <p className="font-display text-[22px] font-extrabold tracking-tight leading-tight mt-0.5 tabular-nums">
                        🪙 <AnimatedNumber value={Math.floor(portfolioValue)} countUp />
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.7 }}
                          className={`inline-block text-sm font-bold ml-2 ${plPct >= 0 ? "text-success" : "text-destructive"}`}>
                          {plPct >= 0 ? "▲" : "▼"} {plPct >= 0 ? "+" : ""}{plPct.toFixed(1)}%
                        </motion.span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {portfolio.length} {portfolio.length === 1 ? "stock" : "stocks"} · {portfolio.slice(0, 3).map((h) => h.symbol).join(", ")}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-display text-[22px] font-extrabold tracking-tight leading-tight mt-0.5">First trade</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Buy real companies with virtual cash</p>
                    </>
                  )}
                </div>
              </div>
            </Link>
          </MCard>

          {/* Friends */}
          <MCard i={10}>
            <Link to="/partners" className="block h-full">
              <div className="group bg-white rounded-[20px] p-5 relative overflow-hidden hover-lift press-scale h-full"
                style={{ border: "0.5px solid #e0e8e3", boxShadow: "var(--shadow-sm)" }}>
                <div className="absolute top-0 left-0 right-0 h-[2.5px]" style={{ background: "linear-gradient(90deg, #E0457B, #E0457B00 70%)" }} />
                <div className="absolute -right-7 -top-7 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" style={{ background: "#E0457B1f" }} />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <motion.span
                      initial={{ scale: 0, rotate: -12 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.55 }}
                      className="w-9 h-9 rounded-xl flex items-center justify-center border group-hover:scale-110 transition-transform"
                      style={{ background: "linear-gradient(135deg, #E0457B26, #E0457B0a)", color: "#E0457B", borderColor: "#E0457B26" }}>
                      <Users className="w-4 h-4" />
                    </motion.span>
                    {friendsInfo && friendsInfo.invites > 0 ? (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full animate-pulse"
                        style={{ color: "#E0457B", background: "#E0457B1a" }}>
                        {friendsInfo.invites} invite{friendsInfo.invites === 1 ? "" : "s"} 📨
                      </span>
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all" />
                    )}
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mt-3">Friends</p>
                  {friendsInfo && friendsInfo.count > 0 ? (
                    <>
                      <p className="font-display text-[22px] font-extrabold tracking-tight leading-tight mt-0.5">
                        <AnimatedNumber value={friendsInfo.count} countUp /> partner{friendsInfo.count === 1 ? "" : "s"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {friendsInfo.names.join(", ")}{friendsInfo.count > friendsInfo.names.length ? ` +${friendsInfo.count - friendsInfo.names.length} more` : ""}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-display text-[22px] font-extrabold tracking-tight leading-tight mt-0.5">Find friends</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Search classmates & team up</p>
                    </>
                  )}
                </div>
              </div>
            </Link>
          </MCard>
        </div>
      </main>

      {/* Fullscreen roller coaster — same overlay Missions uses */}
      {coasterFull && (
        <div className="fixed inset-0 z-[60] bg-background">
          <FullScreenCoaster
            unitNumber={currentUnit.unitNumber}
            unitTitle={currentUnit.title}
            unitReward={Math.round(getUnitRewardTotal(currentUnit.id) * getRewardMultiplier())}
            stations={currentUnitLessons.map((l) => ({
              id: l.id,
              title: l.title,
              done: isLessonCompleted(l.id),
              unlocked: coasterUnlocked(l.id),
            }))}
            currentIdx={coasterIdx}
            stats={{ streak, points: jeffsBalance, level: currLevel }}
            onSelectStation={(st) => navigate(`/lessons/${st.id}`)}
          />
          <button
            onClick={() => setCoasterFull(false)}
            className="absolute top-4 left-4 z-[61] inline-flex items-center gap-1.5 rounded-full pl-2.5 pr-3.5 py-2 text-[13px] font-bold text-[#0d3524] shadow-lg transition-transform active:scale-95"
            style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.9)" }}
          >
            <Minimize2 className="w-4 h-4" /> Exit fullscreen
          </button>
        </div>
      )}
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
