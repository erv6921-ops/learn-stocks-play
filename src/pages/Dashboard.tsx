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
import { useStockHistory } from "@/hooks/useStockHistory";
import { Area, AreaChart, ResponsiveContainer, YAxis, Tooltip } from "recharts";
import GameNav from "@/components/GameNav";
import { Wordmark } from "@/components/Wordmark";
import { lessons, unitInfo, getLessonsByUnit, getUnitRewardTotal } from "@/data/lessons";
import { getAdaptiveUnit } from "@/lib/curriculumEngine";
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
  const [friendsInfo, setFriendsInfo] = useState<{ count: number; rows: { name: string; coins: number }[]; invites: number } | null>(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!user?.id) return;
      const [{ data: partners }, { data: requests }] = await Promise.all([
        (supabase as any).rpc("get_partners"),
        (supabase as any).rpc("get_partner_requests"),
      ]);
      if (cancelled) return;
      const rows = (partners ?? []) as { first_name: string | null; last_name: string | null; xp: number }[];
      setFriendsInfo({
        count: rows.length,
        rows: rows
          .map((r) => ({ name: `${r.first_name || ""} ${(r.last_name || "").charAt(0)}${r.last_name ? "." : ""}`.trim() || "Student", coins: Math.round(Number(r.xp) || 0) }))
          .sort((a, b) => b.coins - a.coins),
        invites: ((requests ?? []) as unknown[]).length,
      });
    })();
    return () => { cancelled = true; };
  }, [user?.id]);

  // Fullscreen roller-coaster overlay toggle.
  const [coasterFull, setCoasterFull] = useState(false);

  // ── Class rank + top-5 leaderboard rows ──
  const [rankInfo, setRankInfo] = useState<{ rank: number; pts: number; total: number } | null>(null);
  const [lbRows, setLbRows] = useState<{ name: string; xp: number; isMe: boolean; rank: number }[]>([]);
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
      if (idx !== -1) setRankInfo({ rank: idx + 1, pts: Math.round(Number(sorted[idx].xp)), total: sorted.length });

      // Top 5 rows, always include the current user even if outside top 5
      const top5 = sorted.slice(0, 5);
      if (idx >= 5) top5.push(sorted[idx]);
      const rows = top5.map((r, i) => ({
        name: r.user_id === user.id ? "You" : `${r.first_name || ""}${r.last_name ? ` ${(r.last_name as string).charAt(0)}.` : ""}`.trim() || "Student",
        xp: Math.round(Number(r.xp)),
        isMe: r.user_id === user.id,
        rank: sorted.indexOf(r) + 1,
      }));
      if (!cancelled) setLbRows(rows);
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
  // Use the adaptive unit so validated lessons (benchmark-skipped) are correctly
  // treated as done — matching the exact logic the Missions page uses.
  const coasterLessons = useMemo(
    () => getAdaptiveUnit(
      currentUnit.id,
      user?.benchmarkCategoryScores ?? null,
      user?.benchmarkScores ?? null,
      user?.assessmentScore ?? null,
    ).lessons,
    [currentUnit, user?.benchmarkCategoryScores, user?.benchmarkScores, user?.assessmentScore]
  );
  const coasterIdx = useMemo(() => {
    for (let i = 0; i < coasterLessons.length; i++) {
      const al = coasterLessons[i];
      if (al.status !== "validated" && !isLessonCompleted(al.lesson.id)) return i;
    }
    return coasterLessons.length; // all done — CoasterTrack clamps to n-1
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coasterLessons, lessonProgress]);
  const coasterUnlocked = (lessonId: string): boolean => {
    const i = coasterLessons.findIndex((al) => al.lesson.id === lessonId);
    if (i <= 0) return i === 0;
    const prev = coasterLessons[i - 1];
    return prev.status === "validated" || isLessonCompleted(prev.lesson.id);
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
              isCompleted={(al) => al.status === "validated" || isLessonCompleted(al.lesson.id)}
              onSelect={(id) => navigate(`/lessons/${id}`)}
              celebrate={currentUnitProgress === 100}
            />
          </div>
        </MCard>

        {/* ═══ 2. TODAY + STATS — dailies left, numbers right ═══ */}
        <div className="grid grid-cols-1 min-[900px]:grid-cols-2 gap-3 mt-3 items-start">

          {/* Left: daily action cards stacked */}
          <div className="space-y-3">
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

          {/* Right: 4 stat boxes in 2×2 grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { i: 2, icon: Coins, tint: "#E3A008", label: "Coins", num: jeffsBalance, sub: earnedToday > 0 ? `+${earnedToday.toLocaleString()} today` : "InvestiCoins ready to spend" },
              { i: 3, icon: Flame, tint: "#F97316", label: "Streak", num: streak, suffix: ` day${streak === 1 ? "" : "s"}`, pulse: streak > 0, sub: streak > 0 ? "Don't break the chain" : "Play today to start one" },
              { i: 4, icon: TrendingUp, tint: "#1D9E75", label: "Stocks owned", num: portfolio.length, sub: portfolio.length > 0 ? `🪙 ${Math.floor(portfolioValue).toLocaleString()} invested` : "Make your first trade" },
              { i: 5, icon: BookOpen, tint: "#8B5CF6", label: "Lessons", num: completedLessons, suffix: `/${totalLessons}`, sub: `${progressPercent}% of the course`, progress: progressPercent },
            ].map((st) => (
              <MCard key={st.label} i={st.i}>
                <div className="group bg-white rounded-[20px] p-4 relative overflow-hidden hover-lift press-scale h-full"
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
                      className="w-8 h-8 rounded-xl flex items-center justify-center mb-2.5 border group-hover:scale-110 transition-transform"
                      style={{ background: `linear-gradient(135deg, ${st.tint}26, ${st.tint}0a)`, color: st.tint, borderColor: `${st.tint}26` }}>
                      <st.icon className="w-4 h-4" style={st.pulse ? { animation: "streak-pulse 2s ease-in-out infinite" } : undefined} />
                    </motion.span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{st.label}</p>
                    <p className="font-display text-[20px] font-extrabold tracking-tight leading-tight mt-0.5 tabular-nums">
                      <AnimatedNumber value={st.num} countUp />{st.suffix ?? ""}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{st.sub}</p>
                    {st.progress != null && (
                      <div className="mt-2.5 h-1 rounded-full bg-muted overflow-hidden">
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
        </div>

        {/* ═══ 3. SNAPSHOTS — business · portfolio · class rank ═══ */}
        <div className="grid grid-cols-1 min-[900px]:grid-cols-3 gap-3 mt-3 items-stretch">

          {/* ── Micro-business: revenue hero + radial rep + customer dots ── */}
          <MCard i={8}>
            <Link to="/micro-business" className="block h-full">
              <div className="group bg-white rounded-[20px] p-5 relative overflow-hidden hover-lift press-scale h-full"
                style={{ border: "0.5px solid #e0e8e3", boxShadow: "var(--shadow-sm)" }}>
                <div className="absolute top-0 left-0 right-0 h-[2.5px]" style={{ background: "linear-gradient(90deg, #0F766E, #0F766E00 70%)" }} />
                <div className="absolute -right-7 -top-7 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" style={{ background: "#0F766E1f" }} />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <motion.span
                        initial={{ scale: 0, rotate: -12 }} animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.55 }}
                        className="w-9 h-9 rounded-xl flex items-center justify-center border group-hover:scale-110 transition-transform"
                        style={{ background: "linear-gradient(135deg, #0F766E26, #0F766E0a)", color: "#0F766E", borderColor: "#0F766E26" }}>
                        <Store className="w-4 h-4" />
                      </motion.span>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">My business</p>
                    </div>
                    {hasBusiness && bizSim && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full"
                        style={{ color: statusLabel(bizSim).color, background: `${statusLabel(bizSim).color}1a` }}>
                        {statusLabel(bizSim).label}
                      </span>
                    )}
                  </div>

                  {hasBusiness && bizSim ? (
                    <>
                      {/* Revenue hero + reputation arc side by side */}
                      <div className="flex items-end justify-between mt-3">
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">Revenue / mo</p>
                          <p className="font-display text-[26px] font-extrabold tracking-tight leading-none">
                            🪙 <AnimatedNumber value={monthlyRevenue(bizSim)} countUp />
                          </p>
                        </div>
                        <RadialGauge value={bizSim.reputation} color="#0F766E" label="Rep" />
                      </div>

                      {/* Animated customer dots */}
                      <div className="mt-3">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                          Customers · <span className="font-extrabold" style={{ color: "#0F766E" }}>{bizSim.customers}</span>
                        </p>
                        <div className="flex gap-1 flex-wrap">
                          {Array.from({ length: Math.min(bizSim.customers, 12) }).map((_, k) => (
                            <motion.div key={k}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.65 + k * 0.055, type: "spring", stiffness: 420, damping: 14 }}
                              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white"
                              style={{ background: k === 0 ? "#0F766E" : k < 4 ? "#0F766E99" : "#0F766E40", fontSize: "9px" }}>
                              {k < 3 ? "★" : "·"}
                            </motion.div>
                          ))}
                          {bizSim.customers > 12 && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.35 }}
                              className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
                              style={{ background: "#0F766E20", color: "#0F766E" }}>
                              +{bizSim.customers - 12}
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Brand gradient bar */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Brand strength</span>
                          <span className="text-[11px] font-extrabold tabular-nums" style={{ color: "#3BA7C4" }}>
                            <AnimatedNumber value={Math.round(bizSim.brand)} countUp />
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(100, bizSim.brand)}%` }}
                            transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
                            className="h-full rounded-full" style={{ background: "linear-gradient(90deg, #0F766E, #3BA7C4)" }} />
                        </div>
                      </div>

                      {/* Products */}
                      {bizSim.products.length > 0 && (
                        <div className="mt-3">
                          <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                            Products · <span className="font-extrabold" style={{ color: "#8B5CF6" }}>{bizSim.products.length}</span>
                          </p>
                          <div className="flex gap-1.5 flex-wrap">
                            {bizSim.products.slice(0, 4).map((p, k) => (
                              <motion.span key={p.id}
                                initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.75 + k * 0.07, duration: 0.25 }}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold"
                                style={{ background: "#8B5CF610", color: "#8B5CF6", border: "1px solid #8B5CF620" }}>
                                📦 {p.name}
                                <span className="opacity-60">🪙{p.price}</span>
                              </motion.span>
                            ))}
                            {bizSim.products.length > 4 && (
                              <span className="inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold"
                                style={{ background: "#8B5CF610", color: "#8B5CF6" }}>
                                +{bizSim.products.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Pending scenario — pulsing alert */}
                      {bizSim.pending ? (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8, duration: 0.3 }}
                          className="mt-3 rounded-xl p-3 relative overflow-hidden"
                          style={{ background: "linear-gradient(135deg, #F97316, #EF4444)", boxShadow: "0 4px 12px rgba(249,115,22,0.25)" }}>
                          <motion.div
                            animate={{ opacity: [0.4, 0.8, 0.4] }}
                            transition={{ repeat: Infinity, duration: 2.5 }}
                            className="absolute inset-0 rounded-xl"
                            style={{ background: "linear-gradient(135deg, #F9731620, transparent)" }} />
                          <div className="relative flex items-start gap-2.5">
                            <span className="text-xl shrink-0 mt-0.5">{bizSim.pending.emoji}</span>
                            <div className="min-w-0">
                              <p className="text-[9px] font-bold uppercase tracking-wider text-white/60">Situation waiting</p>
                              <p className="text-[12px] font-extrabold text-white leading-tight mt-0.5 truncate">{bizSim.pending.title}</p>
                              <p className="text-[10px] text-white/70 mt-0.5">Tap to react →</p>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        /* Recent activity log — last 2 entries */
                        bizSim.log.length > 0 && (
                          <div className="mt-3">
                            <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Recent activity</p>
                            <div className="space-y-1.5">
                              {bizSim.log.slice(-2).reverse().map((entry, k) => (
                                <motion.div key={k}
                                  initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.85 + k * 0.1, duration: 0.25 }}
                                  className="flex items-start gap-2">
                                  <span className="text-[10px] font-bold shrink-0 mt-0.5 px-1.5 py-0.5 rounded"
                                    style={{ background: "#0F766E15", color: "#0F766E" }}>M{entry.month}</span>
                                  <p className="text-[10px] text-muted-foreground leading-tight line-clamp-2">{entry.text}</p>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )
                      )}

                      <p className="text-[11px] text-muted-foreground mt-3 flex items-center gap-1.5">
                        <span>Month <AnimatedNumber value={bizSim.month} countUp /></span>
                        <span className="opacity-40">·</span>
                        <span>🪙 <AnimatedNumber value={Math.round(bizSim.cash)} countUp /> cash</span>
                      </p>
                    </>
                  ) : (
                    <div className="mt-3">
                      <p className="font-display text-[22px] font-extrabold tracking-tight leading-tight">Start yours</p>
                      <p className="text-xs text-muted-foreground mt-1">Design a product, win customers, and run the books — your own company from scratch.</p>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </MCard>

          {/* ── Portfolio: interactive terminal ── */}
          <PortfolioSnapshot
            portfolio={portfolio}
            livePrices={livePrices}
            plPct={plPct}
          />

          {/* ── Class Leaderboard snapshot ── */}
          <MCard i={10}>
            <Link to="/leaderboard" className="block h-full">
              <div className="group bg-white rounded-[20px] overflow-hidden hover-lift press-scale h-full relative"
                style={{ border: "0.5px solid #e0e8e3", boxShadow: "var(--shadow-sm)" }}>
                <div className="absolute top-0 left-0 right-0 h-[2.5px]" style={{ background: "linear-gradient(90deg, #E3A008, #E3A00800 70%)" }} />

                {lbRows.length > 0 && rankInfo ? (
                  <>
                    {/* ── Hero rank section — dark gradient bg ── */}
                    <div className="px-5 pt-5 pb-4 relative overflow-hidden"
                      style={{ background: "linear-gradient(145deg, #1a1208, #2d1f06)" }}>
                      {/* Glow orb */}
                      <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full blur-3xl pointer-events-none"
                        style={{ background: "rgba(227,160,8,0.25)" }} />
                      <div className="absolute -left-4 bottom-0 w-20 h-20 rounded-full blur-2xl pointer-events-none"
                        style={{ background: "rgba(227,160,8,0.1)" }} />

                      <div className="relative flex items-start justify-between">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "#E3A00880" }}>Class rank</p>
                          <motion.div
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.65, duration: 0.35 }}
                            className="flex items-end gap-2 mt-1">
                            <p className="font-display font-extrabold leading-none" style={{ fontSize: "52px", color: "#E3A008", lineHeight: 1 }}>
                              #{rankInfo.rank}
                            </p>
                          </motion.div>
                          <p className="text-sm font-bold mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                            of {rankInfo.total} students
                          </p>
                        </div>

                        {/* Rank medal badge */}
                        <motion.div
                          initial={{ scale: 0, rotate: 20 }} animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.7 }}
                          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mt-1 shrink-0"
                          style={{ background: "rgba(227,160,8,0.15)", border: "1px solid rgba(227,160,8,0.3)" }}>
                          {rankInfo.rank === 1 ? "🥇" : rankInfo.rank === 2 ? "🥈" : rankInfo.rank === 3 ? "🥉" : "🏅"}
                        </motion.div>
                      </div>

                      {/* Coins + progress to next rank */}
                      {(() => {
                        const above = lbRows.find(r => r.rank === rankInfo.rank - 1);
                        const gap = above ? above.xp - rankInfo.pts : null;
                        const pctToAbove = above && above.xp > 0 ? Math.min((rankInfo.pts / above.xp) * 100, 100) : null;
                        return (
                          <div className="mt-3 relative">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[11px] font-extrabold tabular-nums" style={{ color: "#E3A008" }}>
                                🪙 {rankInfo.pts.toLocaleString()} coins
                              </span>
                              {gap != null && (
                                <span className="text-[10px] font-bold" style={{ color: "rgba(255,255,255,0.45)" }}>
                                  {gap.toLocaleString()} to #{rankInfo.rank - 1}
                                </span>
                              )}
                            </div>
                            {pctToAbove != null && (
                              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                                <motion.div
                                  initial={{ width: 0 }} animate={{ width: `${pctToAbove}%` }}
                                  transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                                  className="h-full rounded-full"
                                  style={{ background: "linear-gradient(90deg, #E3A008, #FCD34D)" }} />
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>

                    {/* ── Standings list ── */}
                    <div className="px-5 py-3 space-y-0">
                      {(() => {
                        const maxXp = Math.max(...lbRows.map(r => r.xp), 1);
                        return lbRows.map((r, i) => {
                          const medals = ["🥇", "🥈", "🥉"];
                          const barColor = r.isMe ? "#1D9E75" : r.rank <= 3 ? ["#E3A008", "#9CA3AF", "#CD7C3A"][r.rank - 1] : "#CBD5E1";
                          return (
                            <motion.div key={r.name + i}
                              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.75 + i * 0.08, duration: 0.28 }}
                              className="py-2.5"
                              style={r.isMe ? { borderTop: "1px solid rgba(29,158,117,0.2)", borderBottom: "1px solid rgba(29,158,117,0.2)", marginTop: "2px", marginBottom: "2px" } : { borderTop: "1px solid #f0f5f3" }}>
                              <div className={`rounded-xl px-2 py-1 -mx-2 transition-colors ${r.isMe ? "bg-success/5" : ""}`}>
                                <div className="flex items-center gap-2.5 mb-1">
                                  <span className="text-base shrink-0 w-5 text-center">
                                    {r.rank <= 3 ? medals[r.rank - 1] : <span className="text-[11px] font-extrabold text-muted-foreground">{r.rank}</span>}
                                  </span>
                                  <span className={`text-sm flex-1 truncate ${r.isMe ? "font-extrabold" : "font-semibold"}`}
                                    style={r.isMe ? { color: "#1D9E75" } : { color: "#374151" }}>
                                    {r.name}
                                  </span>
                                  <span className="text-xs font-bold tabular-nums" style={{ color: barColor }}>
                                    🪙{r.xp.toLocaleString()}
                                  </span>
                                </div>
                                <div className="ml-7 h-1.5 rounded-full bg-muted overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }} animate={{ width: `${(r.xp / maxXp) * 100}%` }}
                                    transition={{ duration: 1.0, delay: 0.82 + i * 0.1, ease: "easeOut" }}
                                    className="h-full rounded-full"
                                    style={{ background: barColor }} />
                                </div>
                              </div>
                            </motion.div>
                          );
                        });
                      })()}
                    </div>
                  </>
                ) : (
                  <div className="p-5">
                    <div className="flex items-center gap-2.5 mb-3">
                      <motion.span
                        initial={{ scale: 0, rotate: -12 }} animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.65 }}
                        className="w-9 h-9 rounded-xl flex items-center justify-center border"
                        style={{ background: "linear-gradient(135deg, #E3A00826, #E3A0080a)", color: "#E3A008", borderColor: "#E3A00826" }}>
                        <Trophy className="w-4 h-4" />
                      </motion.span>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Class rank</p>
                    </div>
                    <p className="font-display text-[22px] font-extrabold tracking-tight leading-tight">Class rank</p>
                    <p className="text-xs text-muted-foreground mt-1">Join a class to see where you stand against your classmates.</p>
                  </div>
                )}
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
            stations={coasterLessons.map((al) => ({
              id: al.lesson.id,
              title: al.lesson.title,
              done: al.status === "validated" || isLessonCompleted(al.lesson.id),
              unlocked: coasterUnlocked(al.lesson.id),
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

// ─── Interactive portfolio snapshot ───────────────────────────────────────────
const CHART_RANGES = [
  { label: "1W", value: "5d" },
  { label: "1M", value: "1m" },
  { label: "6M", value: "6m" },
  { label: "1Y", value: "1y" },
] as const;
type ChartRangeVal = typeof CHART_RANGES[number]["value"];

interface PortfolioSnapshotProps {
  portfolio: { symbol: string; shares: number; purchasePrice: number }[];
  livePrices: Map<string, number>;
  plPct: number;
}
function PortfolioSnapshot({ portfolio, livePrices, plPct }: PortfolioSnapshotProps) {
  const [activeSymbol, setActiveSymbol] = useState<string | undefined>(undefined);
  const [chartRange, setChartRange] = useState<ChartRangeVal>("1y");
  const [hoverPrice, setHoverPrice] = useState<number | null>(null);
  const [hoverDate, setHoverDate] = useState<string | null>(null);

  const topHolding = useMemo(() => {
    if (portfolio.length === 0) return undefined;
    return [...portfolio].sort(
      (a, b) =>
        b.shares * (livePrices.get(b.symbol) ?? b.purchasePrice) -
        a.shares * (livePrices.get(a.symbol) ?? a.purchasePrice)
    )[0];
  }, [portfolio, livePrices]);

  const symbol = activeSymbol ?? topHolding?.symbol;
  const { historicalData } = useStockHistory(symbol, chartRange);
  const chartData = useMemo(
    () => (historicalData ?? []).map((d) => ({ p: d.price, date: d.date })),
    [historicalData]
  );
  const chartUp = chartData.length >= 2 ? chartData[chartData.length - 1].p >= chartData[0].p : true;
  const chartColor = chartUp ? "#1D9E75" : "#dc2626";

  const activeHolding = portfolio.find((h) => h.symbol === symbol);
  const livePrice = symbol ? (livePrices.get(symbol) ?? activeHolding?.purchasePrice ?? 0) : 0;
  const displayPrice = hoverPrice ?? livePrice;
  const holdingPnl =
    activeHolding && activeHolding.purchasePrice > 0
      ? ((livePrice - activeHolding.purchasePrice) / activeHolding.purchasePrice) * 100
      : 0;

  return (
    <MCard i={9}>
      <div
        className="bg-white rounded-[20px] p-5 relative overflow-hidden h-full"
        style={{ border: "0.5px solid #e0e8e3", boxShadow: "var(--shadow-sm)" }}
      >
        <div className="absolute top-0 left-0 right-0 h-[2.5px]" style={{ background: "linear-gradient(90deg, #3BA7C4, #3BA7C400 70%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(59,167,196,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,167,196,0.04) 1px,transparent 1px)",
          backgroundSize: "20px 20px",
        }} />
        <div className="absolute -right-7 -top-7 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-60" style={{ background: "#3BA7C41f" }} />

        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <motion.span
                initial={{ scale: 0, rotate: -12 }} animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.6 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center border"
                style={{ background: "linear-gradient(135deg,#3BA7C426,#3BA7C40a)", color: "#3BA7C4", borderColor: "#3BA7C426" }}>
                <LineChart className="w-4 h-4" />
              </motion.span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Portfolio</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}
                    className="w-1.5 h-1.5 rounded-full bg-success inline-block" />
                  <span className="text-[9px] font-bold text-success">LIVE</span>
                </div>
              </div>
            </div>
            {portfolio.length > 0 && (
              <Link to="/stocks" onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground hover:text-foreground transition-colors">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>

          {portfolio.length > 0 && activeHolding ? (
            <>
              {/* Price display — updates on hover */}
              <div className="mt-3 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded font-mono font-extrabold text-sm shrink-0"
                      style={{ background: "#3BA7C420", color: "#3BA7C4" }}>{symbol}</span>
                    <span className={`text-[11px] font-extrabold ${holdingPnl >= 0 ? "text-success" : "text-destructive"}`}>
                      {holdingPnl >= 0 ? "+" : ""}{holdingPnl.toFixed(2)}%
                    </span>
                  </div>
                  <p className="font-display text-[22px] font-extrabold tracking-tight tabular-nums mt-0.5">
                    🪙 {Math.floor(displayPrice).toLocaleString()}
                  </p>
                  <p className="text-[10px] text-muted-foreground h-4">
                    {hoverDate ?? `${activeHolding.shares} sh · per share`}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Total P/L</p>
                  <p className={`text-sm font-extrabold ${plPct >= 0 ? "text-success" : "text-destructive"}`}>
                    {plPct >= 0 ? "▲ +" : "▼ "}{plPct.toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Range pills */}
              <div className="flex gap-1 mt-2">
                {CHART_RANGES.map((r) => (
                  <button key={r.value} onClick={() => setChartRange(r.value)}
                    className="px-2.5 py-1 rounded-full text-[10px] font-bold transition-all press-scale"
                    style={chartRange === r.value
                      ? { background: "#3BA7C4", color: "white" }
                      : { background: "rgba(0,0,0,0.05)", color: "#94a3b8" }}>
                    {r.label}
                  </button>
                ))}
              </div>

              {/* Interactive chart with crosshair */}
              <div className="h-28 mt-2 -mx-2 cursor-crosshair">
                {chartData.length >= 2 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{ top: 4, right: 0, bottom: 0, left: 0 }}
                      onMouseMove={(state) => {
                        if (state.isTooltipActive && state.activePayload?.[0]) {
                          setHoverPrice(Number(state.activePayload[0].value));
                          setHoverDate(String(state.activePayload[0].payload.date));
                        }
                      }}
                      onMouseLeave={() => { setHoverPrice(null); setHoverDate(null); }}>
                      <defs>
                        <linearGradient id="dashSpark" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={chartColor} stopOpacity={0.5} />
                          <stop offset="100%" stopColor={chartColor} stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <YAxis hide domain={[(min: number) => min * 0.993, (max: number) => max * 1.007]} />
                      <Tooltip
                        cursor={{ stroke: chartColor, strokeWidth: 1, strokeDasharray: "4 3" }}
                        content={() => null}
                      />
                      <Area type="monotone" dataKey="p" stroke={chartColor} strokeWidth={2.5}
                        fill="url(#dashSpark)" dot={false} isAnimationActive animationDuration={900} animationBegin={0} />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full rounded-lg bg-muted/40 animate-pulse" />
                )}
              </div>

              {/* Holdings list — click to switch chart */}
              <div className="mt-1.5">
                {portfolio.slice(0, 4).map((h, idx) => {
                  const price = livePrices.get(h.symbol) ?? h.purchasePrice;
                  const pct = h.purchasePrice > 0 ? ((price - h.purchasePrice) / h.purchasePrice) * 100 : 0;
                  const isActive = h.symbol === symbol;
                  return (
                    <motion.button
                      key={h.symbol}
                      initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.85 + idx * 0.07, duration: 0.25 }}
                      onClick={() => setActiveSymbol(h.symbol)}
                      className="w-full flex items-center gap-2 py-2 border-t border-border/40 transition-all press-scale rounded-lg hover:bg-muted/40 px-1.5"
                      style={isActive ? { background: "#3BA7C40c" } : {}}>
                      <span className="font-mono font-extrabold text-sm w-12 text-left shrink-0"
                        style={isActive ? { color: "#3BA7C4" } : {}}>
                        {h.symbol}
                      </span>
                      <span className="text-xs text-muted-foreground w-10 shrink-0">{h.shares}sh</span>
                      <span className="text-sm font-bold tabular-nums flex-1 text-right">
                        🪙{Math.floor(h.shares * price).toLocaleString()}
                      </span>
                      <span className={`text-xs font-bold w-12 text-right shrink-0 ${pct >= 0 ? "text-success" : "text-destructive"}`}>
                        {pct >= 0 ? "+" : ""}{pct.toFixed(1)}%
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="mt-3">
              <p className="font-display text-[22px] font-extrabold tracking-tight leading-tight">First trade</p>
              <p className="text-xs text-muted-foreground mt-1">
                Buy real companies with virtual cash and watch your chart grow right here.
              </p>
            </div>
          )}
        </div>
      </div>
    </MCard>
  );
}

function RadialGauge({ value, color, label }: { value: number; color: string; label: string }) {
  const r = 22;
  const circ = Math.PI * r;
  const pct = Math.min(Math.max(value, 0), 100) / 100;
  return (
    <div className="flex flex-col items-center gap-0.5">
      <svg width={54} height={34} viewBox="0 0 54 34" className="overflow-visible">
        <path d={`M 5 30 A ${r} ${r} 0 0 1 49 30`} fill="none" stroke="#e5e7eb" strokeWidth={5} strokeLinecap="round" />
        <motion.path
          d={`M 5 30 A ${r} ${r} 0 0 1 49 30`} fill="none" stroke={color} strokeWidth={5} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={circ}
          animate={{ strokeDashoffset: circ * (1 - pct) }}
          transition={{ duration: 1.3, delay: 0.65, ease: "easeOut" }}
        />
        <text x="27" y="27" textAnchor="middle" fontSize="11" fontWeight="800" fill={color}>{Math.round(value)}</text>
      </svg>
      <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
    </div>
  );
}

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
