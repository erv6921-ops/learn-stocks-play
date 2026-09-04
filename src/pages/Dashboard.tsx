import React, { useMemo, useState, useEffect, useCallback, useRef } from "react";
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
import PortfolioExpanded from "@/components/PortfolioExpanded";
import { useStockHistory } from "@/hooks/useStockHistory";
import { Area, AreaChart, ResponsiveContainer, YAxis, Tooltip } from "recharts";
import GameNav from "@/components/GameNav";
import { Wordmark } from "@/components/Wordmark";
import { lessons, unitInfo, getLessonsByUnit, getUnitRewardTotal } from "@/data/lessons";
import { getGameTypeForDate, gameTypeLabel } from "@/lib/dailyGames";
import { getAdaptiveUnit } from "@/lib/curriculumEngine";
import { supabase } from "@/integrations/supabase/client";
import { anchor } from "@/lib/tourAnchors";
import { getStreak, getBestStreak, getStreakRestore, streakRepairReason } from "@/lib/playerStats";
import { getLeague } from "@/lib/leagues";
import { CoasterTrack } from "./Lessons";
import FullScreenCoaster from "@/components/FullScreenCoaster";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import DailyMissions from "@/components/DailyMissions";
import { useDailyMissions } from "@/hooks/useDailyMissions";
import { DIFFICULTY_META } from "@/lib/dailyMissions";
import { loadActivities, bizDef, type ActivitiesState, type BusinessType } from "@/lib/businessActivities";
import { type BizState, monthlyRevenue, statusLabel } from "@/lib/businessSim";
import {
  BookOpen, LineChart, Coins, TrendingUp, TrendingDown,
  Star, StarOff, ChevronRight, ChevronDown, Wallet,
  GraduationCap, Flame, Lock, Trophy, Shield, Zap, Award, Store, Landmark, FlaskConical, Maximize2, Minimize2, Users,
  Target, Eye, ArrowRight, RotateCcw, Check } from
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


type LbRow = { name: string; xp: number; isMe: boolean; rank: number };
type LbInfo = { rank: number; pts: number; total: number };

// Sort a set of entries, find the current user's rank, and return the top-5
// rows (always including the user even if they're outside the top 5).
function buildBoard(all: { name: string; xp: number; isMe: boolean }[]): { rows: LbRow[]; info: LbInfo | null } {
  if (all.length === 0) return { rows: [], info: null };
  const sorted = [...all].sort((a, b) => b.xp - a.xp);
  const idx = sorted.findIndex((r) => r.isMe);
  const info: LbInfo | null = idx !== -1 ? { rank: idx + 1, pts: Math.round(sorted[idx].xp), total: sorted.length } : null;
  const rows: LbRow[] = sorted.slice(0, 5).map((r, i) => ({ name: r.name, xp: Math.round(r.xp), isMe: r.isMe, rank: i + 1 }));
  if (idx >= 5) rows.push({ name: sorted[idx].name, xp: Math.round(sorted[idx].xp), isMe: true, rank: idx + 1 });
  return { rows, info };
}

export default function Dashboard() {
  const { user, authReady, lessonProgress, watchlist, jeffsBalance, portfolio, jeffsHistory, earnJeffs, spendJeffs, getRewardMultiplier } = useApp();
  const { netWorth, portfolioValue, holdings, livePrices } = useNetWorth();
  const navigate = useNavigate();

  // The dashboard reflects the student's enrolled curriculum. Gulliver Intro
  // students see their six-block course; everyone else sees the regular
  // curriculum. (The optional AP Micro elective has its own card and never
  // affects these stats.)
  const dashTrack = user?.track === "gulliver_intro" ? "gulliver-intro" : "regular";
  const dashUnits = useMemo(() => unitInfo.filter((u) => (u.track ?? "regular") === dashTrack), [dashTrack]);
  const dashLessons = useMemo(() => lessons.filter((l) => (l.track ?? "regular") === dashTrack), [dashTrack]);
  const dashLessonIds = useMemo(() => new Set(dashLessons.map((l) => l.id)), [dashLessons]);

  const completedLessons = lessonProgress.filter((p) => p.completed && dashLessonIds.has(p.lessonId)).length;
  const totalLessons = dashLessonIds.size;

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
  // Use the shared scheduler so the dashboard label always matches the actual
  // game served on /daily (the old inline logic was inverted).
  const dailyGameName = gameTypeLabel(getGameTypeForDate(dailyDate));
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
    return dashUnits.map(u => {
      const ul = getLessonsByUnit(u.id);
      return { done: ul.filter(l => check(l.id)).length, total: ul.length };
    });
  }, [lessonProgress, dashUnits]);
  const currLevel = useMemo(() => getCurriculumLevel(completedLessons, totalLessons, unitScoresForLevel), [completedLessons, totalLessons, unitScoresForLevel]);
  // Progress within current level band
  const levelProgressPct = useMemo(() => {
    const pct = totalLessons > 0 ? completedLessons / totalLessons * 100 : 0;
    return Math.min(pct, 100);
  }, [completedLessons, totalLessons]);

  const streak = useMemo(() => getStreak(jeffsHistory), [jeffsHistory]);
  const bestStreak = useMemo(() => getBestStreak(jeffsHistory), [jeffsHistory]);
  const myLeague = getLeague(jeffsBalance);

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

  // A fresh motivational line each time the dashboard mounts.
  const greetingSub = useMemo(() => {
    const lines = [
      "Ready to build some wealth today?",
      "Your portfolio's waiting - let's make it grow.",
      "Every lesson is money in the bank.",
      "Small steps today, big returns tomorrow.",
      "Let's turn knowledge into net worth.",
      "The market never sleeps - neither does your streak.",
      "One more lesson closer to the finish line.",
      "Compound your streak, compound your coins.",
      "Time to put your money mindset to work.",
      "Let's chase that next milestone. 🚀",
    ];
    return lines[Math.floor(Math.random() * lines.length)];
  }, []);

  // ── Derive from Missions data (single source of truth) ──
  const isLessonCompleted = (id: string) => lessonProgress.some((p) => p.lessonId === id && p.completed);

  // Find next incomplete lesson (same logic as Missions page)
  const nextLesson = useMemo(() => {
    const check = (id: string) => lessonProgress.some((p) => p.lessonId === id && p.completed);
    return dashLessons.find((l) => !check(l.id));
  }, [lessonProgress, dashLessons]);

  // Find the unit the next lesson belongs to
  const currentUnit = useMemo(() => {
    if (!nextLesson) return dashUnits[dashUnits.length - 1];
    return dashUnits.find((u) => u.id === nextLesson.unitId) || dashUnits[0];
  }, [nextLesson, dashUnits]);

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
    return dashUnits
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
  }, [lessonProgress, dashUnits]);

  // Streak ring: 7-day cycle
  const streakDayInCycle = streak % 7;
  const streakRingProgress = streakDayInCycle / 7 * 100;

  // Streak restore: offered only when the student returned today but missed
  // exactly yesterday (see getStreakRestore). Cost scales with the lost streak.
  const streakRestore = useMemo(() => getStreakRestore(jeffsHistory), [jeffsHistory]);
  const [restoring, setRestoring] = useState(false);
  const handleRestoreStreak = () => {
    if (!streakRestore || restoring) return;
    if (jeffsBalance < streakRestore.cost) {
      toast.error(`You need ${streakRestore.cost.toLocaleString()} coins to restore your streak.`);
      return;
    }
    setRestoring(true);
    // The reason string doubles as the repair record: it's a spend (the cost)
    // AND declares which day is bridged, so getStreak picks it up on recompute.
    const ok = spendJeffs(streakRestore.cost, streakRepairReason(streakRestore.repairDate));
    if (ok) toast.success(`🔥 Streak restored! You're back to ${streakRestore.lostStreak + 1} days.`);
    else toast.error("Couldn't restore your streak. Try again.");
    setRestoring(false);
  };

  // Friends snapshot - accepted partners + waiting invites (Partners page RPCs).
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

  // ── Hero banner view toggle: "daily" (missions) vs "lessons" (level/stats) ──
  const [heroView, setHeroView] = useState<"daily" | "lessons">("daily");
  // Today's rotating daily missions (3 of 7), with live progress. Sourced from
  // the shared hook so the hero and the end-of-lesson screen never drift. The
  // headless <DailyMissions> below owns the coin awarding; this instance is
  // display-only.
  const { missions: heroMissions, completedCount: missionsCompleted, total: missionsTotal } =
    useDailyMissions();
  const allMissionsDone = missionsCompleted >= missionsTotal;

  // Once all daily missions are done, auto-flip the hero to the Lessons view.
  // Fires once (after the "All done!" gold flash plays) so it never traps the
  // student if they manually switch back to Daily afterward.
  const autoSwitchedRef = useRef(false);
  useEffect(() => {
    if (!allMissionsDone || autoSwitchedRef.current) return;
    autoSwitchedRef.current = true;
    const t = setTimeout(() => setHeroView("lessons"), 1200);
    return () => clearTimeout(t);
  }, [allMissionsDone]);

  // ── Leaderboard snapshot: Class / National / Partners ──
  const [lbScope, setLbScope] = useState<"class" | "national" | "partners">("class");
  const [rankInfo, setRankInfo] = useState<{ rank: number; pts: number; total: number } | null>(null);
  const [lbRows, setLbRows] = useState<{ name: string; xp: number; isMe: boolean; rank: number }[]>([]);
  // National = every user who picked a US state (excludes self; "You" is added below).
  const [nationalRows, setNationalRows] = useState<{ name: string; xp: number }[]>([]);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!user?.id) return;
      const { data } = await (supabase as any).rpc("get_national_leaderboard");
      if (cancelled || !data) return;
      const rows = (data as { user_id: string; first_name: string | null; last_name: string | null; xp: number }[])
        .filter((r) => r.user_id !== user.id)
        .map((r) => ({ name: `${r.first_name || ""} ${(r.last_name || "").charAt(0)}${r.last_name ? "." : ""}`.trim() || "Student", xp: Math.round(Number(r.xp) || 0) }));
      setNationalRows(rows);
    })();
    return () => { cancelled = true; };
  }, [user?.id]);
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

  // National + Partners boards for the snapshot dropdown. "You" is scored by the
  // live coin balance, the same number the full Leaderboard uses.
  const nationalBoard = useMemo(
    () => buildBoard([...nationalRows.map((r) => ({ name: r.name, xp: r.xp, isMe: false })), { name: "You", xp: jeffsBalance, isMe: true }]),
    [nationalRows, jeffsBalance],
  );
  const partnersBoard = useMemo(
    () => buildBoard([...(friendsInfo?.rows ?? []).map((r) => ({ name: r.name, xp: r.coins, isMe: false })), { name: "You", xp: jeffsBalance, isMe: true }]),
    [friendsInfo, jeffsBalance],
  );

  // The board currently shown in the snapshot, chosen by the dropdown.
  const activeBoard = useMemo(() => {
    if (lbScope === "national")
      return { label: "National rank", short: "National", noun: "nationwide", info: nationalBoard.info, rows: nationalBoard.rows, empty: false, emptyText: "" };
    if (lbScope === "partners")
      return { label: "Partners rank", short: "Partners", noun: "partners", info: partnersBoard.info, rows: partnersBoard.rows, empty: (partnersBoard.info?.total ?? 0) <= 1, emptyText: "Add partners to compare your coins with friends." };
    return { label: "Class rank", short: "Class", noun: "students", info: rankInfo, rows: lbRows, empty: !rankInfo, emptyText: "Join a class to see where you stand against your classmates." };
  }, [lbScope, rankInfo, lbRows, nationalBoard, partnersBoard]);

  // Board switcher pill (Class / National / Partners). The wrapper stops the
  // click from reaching the card's Link to /leaderboard.
  const boardSwitcher = (
    <div className="inline-flex" data-noscale onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-1 rounded-full bg-black/25 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-white border border-white/20 hover:bg-black/35 transition-colors">
            {activeBoard.short} <ChevronDown className="w-3 h-3" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-[8.5rem]">
          {([["class", "Class"], ["national", "National"], ["partners", "Partners"]] as const).map(([s, label]) => (
            <DropdownMenuItem key={s} onSelect={() => setLbScope(s)} className="text-xs font-semibold gap-2">
              {label}
              {lbScope === s && <span className="ml-auto text-primary">✓</span>}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

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
  // treated as done - matching the exact logic the Missions page uses.
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
    return coasterLessons.length; // all done - CoasterTrack clamps to n-1
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
          <Card variant="elevated" className="border-primary/30 rounded-3xl">
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

        {/* ═══ 1. GREETING BANNER - moved here from Missions, sits above the ride ═══ */}
        <MCard i={0}>
          <div className="relative overflow-hidden rounded-3xl mb-3 p-6 md:p-8 text-white"
            style={{ background: "var(--brand-hero)" }}>
            {/* dotted texture + soft colored depth orbs */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle at 25% 15%, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
            <div className="absolute -right-16 -top-24 w-72 h-72 rounded-full blur-3xl pointer-events-none"
              style={{ background: "rgba(227,160,8,0.18)" }} />
            <div className="absolute -left-20 -bottom-24 w-72 h-72 rounded-full blur-3xl pointer-events-none"
              style={{ background: "rgba(var(--brand-rgb),0.18)" }} />

            <div className="relative">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                    {formattedDate}
                  </p>
                  <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.05] mt-1.5 break-words">
                    {getGreeting()}
                  </h1>
                  <p className="text-sm md:text-[15px] text-white/60 mt-2">{greetingSub}</p>
                </div>
                {/* League badge + class rank */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-bold"
                    style={{ background: myLeague.soft, color: myLeague.color, border: `1px solid ${myLeague.color}55` }}>
                    <span className="text-sm leading-none">{myLeague.icon}</span> {myLeague.name}
                  </div>
                  {rankInfo != null && (
                    <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold"
                      style={{ background: "rgba(239,159,39,0.18)", color: "#F5C26B" }}>
                      <Trophy className="w-3.5 h-3.5" /> #{rankInfo.rank} in class
                    </div>
                  )}
                  {/* Daily / Lessons view switcher */}
                  <div className="inline-flex items-center gap-0.5 rounded-full p-0.5"
                    style={{ background: "rgba(0,0,0,0.22)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    {(["daily", "lessons"] as const).map((v) => {
                      const active = heroView === v;
                      return (
                        <button
                          key={v}
                          onClick={() => setHeroView(v)}
                          className="text-[11px] font-bold rounded-full transition-colors"
                          style={{
                            width: 70, height: 24,
                            background: active ? "#ffffff" : "transparent",
                            color: active ? "#12281f" : "rgba(255,255,255,0.55)",
                          }}>
                          {v === "daily" ? "Daily" : "Lessons"}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Progress bar - switches between Daily missions and Lessons */}
              <div className="mt-6">
                <div className="flex items-end justify-between gap-3 mb-2">
                  {heroView === "daily" ? (
                    <p className="text-[13px] font-bold">
                      {allMissionsDone ? (
                        <span style={{ color: "#f59e0b" }}>All done! 🎉</span>
                      ) : (
                        <>
                          <span style={{ color: "#f59e0b" }}>Daily Missions</span>
                          <span className="text-white/45 font-semibold"> · {missionsCompleted}/{missionsTotal} done</span>
                        </>
                      )}
                    </p>
                  ) : (
                    <>
                      <p className="text-[13px] font-bold">
                        <span style={{ color: "var(--brand-bright)" }}>Level {currLevel}</span>
                        <span className="text-white/45 font-semibold"> · {LEVEL_NAMES[currLevel - 1]}</span>
                      </p>
                      <p className="text-[11px] font-semibold text-white/45 tabular-nums">
                        {completedLessons}/{totalLessons} lessons
                      </p>
                    </>
                  )}
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.09)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: heroView === "daily" ? `${(missionsCompleted / missionsTotal) * 100}%` : `${levelProgressPct}%`,
                      background: heroView === "daily"
                        ? "#f59e0b"
                        : "linear-gradient(90deg, #E3A008, var(--brand-bright))",
                      transition: "width 0.4s ease",
                      boxShadow: heroView === "daily" && allMissionsDone ? "0 0 12px rgba(245,158,11,0.75)" : "none",
                      animation: heroView === "daily" && allMissionsDone ? "heroGoldFlash 0.6s ease" : "none",
                    }} />
                </div>
              </div>

              {/* Stats row - switches between daily missions and the 5 stats */}
              {heroView === "daily" ? (
                <motion.div
                  key="hero-stats-daily"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
                  className="mt-6 rounded-2xl grid grid-cols-3 overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}>
                  {heroMissions.map((m, idx) => {
                    const { id, blurb, icon: Icon, reward, done, progress, target, ratio } = m;
                    const diff = DIFFICULTY_META[m.difficulty];
                    // Show a "1/2" style counter for multi-step goals still in flight.
                    const showCounter = !done && target > 1;
                    return (
                    <div key={id}
                      className={`relative flex flex-col items-center text-center gap-1.5 px-2 py-3 sm:flex-row sm:items-center sm:text-left sm:gap-3 sm:px-4 sm:py-3.5 min-w-0 border-white/10 ${idx > 0 ? "border-l" : ""}`}
                      style={{ background: done ? "rgba(34,197,94,0.12)" : "transparent" }}>
                      <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          background: done ? "rgba(34,197,94,0.16)" : "rgba(245,158,11,0.14)",
                          border: `1px solid ${done ? "rgba(34,197,94,0.32)" : "rgba(245,158,11,0.28)"}`,
                        }}>
                        <Icon className="w-4 h-4" style={{ color: done ? "#4ade80" : "#f59e0b" }} />
                      </span>
                      <div className="min-w-0 w-full sm:flex-1">
                        <div className="flex flex-col items-center gap-0.5 sm:flex-row sm:items-center sm:gap-1.5 min-w-0">
                          <p className="text-[11px] leading-[1.15] sm:text-[13px] font-bold sm:leading-tight sm:truncate break-words">{blurb}</p>
                          <span className="hidden sm:inline-block text-[8px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full shrink-0"
                            style={{ color: diff.color, background: diff.bg }}>
                            {diff.label}
                          </span>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                          <p className="text-[12px] font-extrabold leading-none" style={{ color: "#f59e0b" }}>+{reward}</p>
                          {showCounter && (
                            <span className="text-[11px] font-bold tabular-nums text-white/50">{progress}/{target}</span>
                          )}
                        </div>
                        {showCounter && (
                          <div className="h-1 rounded-full overflow-hidden mt-1.5" style={{ background: "rgba(255,255,255,0.12)" }}>
                            <div className="h-full rounded-full" style={{ width: `${ratio * 100}%`, background: "#f59e0b", transition: "width 0.4s ease" }} />
                          </div>
                        )}
                      </div>
                      {done && (
                        <motion.span
                          initial={{ scale: 0 }} animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 16 }}
                          className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ background: "#22c55e" }}>
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </motion.span>
                      )}
                    </div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  key="hero-stats-lessons"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
                  className="mt-6 rounded-2xl grid grid-cols-2 sm:grid-cols-5 overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}>
                  {[
                    { Icon: Flame, tint: "#fb923c", value: String(streak), label: "Day streak" },
                    { Icon: Coins, tint: "#F5C26B", value: jeffsBalance.toLocaleString(), label: "Coins" },
                    { Icon: Star, tint: "#fde047", value: `Lv ${currLevel}`, label: "Level" },
                    { Icon: Flame, tint: "#fdba74", value: `${bestStreak}d`, label: "Best streak" },
                    { Icon: BookOpen, tint: "#6ee7b7", value: `${completedLessons}/${totalLessons}`, label: "Lessons" },
                  ].map(({ Icon, tint, value, label }, idx) => (
                    <div key={label}
                      className={`flex items-center gap-3 px-4 py-3.5 min-w-0 border-white/10 ${idx > 0 ? "sm:border-l" : ""} ${idx >= 2 ? "border-t sm:border-t-0" : ""} ${idx % 2 === 1 ? "border-l sm:border-l" : ""}`}>
                      <span className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: `${tint}1f`, border: `1px solid ${tint}33` }}>
                        <Icon className="w-4 h-4" style={{ color: tint }} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xl md:text-2xl font-extrabold leading-none tabular-nums">{value}</p>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/45 mt-1 truncate">{label}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </MCard>

        {/* ═══ 2. ROLLER COASTER - full-width strip (hidden - flip to true to restore) ═══ */}
        {false && (
        <MCard i={1}>
          <div className="rounded-3xl overflow-hidden relative" style={{ background: "linear-gradient(180deg, rgba(var(--brand-rgb),0.14) 0%, rgba(var(--brand-rgb),0.05) 14%, #ffffff 34%)", border: "1px solid #e7ede9", boxShadow: "0 1px 2px rgba(16,40,34,0.03), 0 14px 30px -16px rgba(16,40,34,0.13)" }}>
            <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full blur-3xl pointer-events-none"
              style={{ background: "rgba(var(--brand-rgb),0.10)" }} />
            <div className="px-5 md:px-6 pt-5 pb-1 flex items-center justify-between gap-3 relative">
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--brand)" }} />
                  Unit {currentUnit.unitNumber} · Your ride
                </p>
                <p className="font-display font-extrabold text-xl tracking-tight truncate mt-0.5">{currentUnit.title}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[12px] font-extrabold px-3 py-1.5 rounded-full"
                  style={{ color: "var(--brand-strong)", background: "rgba(var(--brand-rgb),0.1)", border: "1px solid rgba(var(--brand-rgb),0.18)" }}>
                  {currentUnitCompleted}/{currentUnitLessons.length} · {currentUnitProgress}%
                </span>
                <button
                  onClick={() => setCoasterFull(true)}
                  className="nav-bounce inline-flex items-center gap-1.5 rounded-full pl-2.5 pr-3.5 py-2 text-[13px] font-bold text-white shadow-md"
                  style={{ background: "linear-gradient(135deg,var(--brand-bright),var(--brand-strong))", boxShadow: "0 6px 16px rgba(var(--brand-rgb),0.35)" }}
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
        )}

        {/* ═══ Streak restore - only when exactly yesterday was missed ═══ */}
        {streakRestore && (
          <MCard i={5} className="mt-3">
            <div className="rounded-3xl p-5 relative overflow-hidden text-white"
              style={{ background: "linear-gradient(135deg,#f97316,#ef4444)" }}>
              <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl pointer-events-none"
                style={{ background: "rgba(255,255,255,0.18)" }} />
              <div className="relative flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border border-white/20" style={{ background: "rgba(255,255,255,0.15)" }}>
                    <Flame className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">Streak broken</p>
                    <p className="font-display font-extrabold text-lg mt-0.5">
                      You missed a day - restore your {streakRestore.lostStreak}-day streak
                    </p>
                    <p className="text-sm text-white/80 mt-0.5">Bridges yesterday so your streak keeps going.</p>
                  </div>
                </div>
                <button
                  onClick={handleRestoreStreak}
                  disabled={restoring || jeffsBalance < streakRestore.cost}
                  className="shrink-0 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 disabled:opacity-50 disabled:hover:bg-white/15 text-white text-sm font-bold transition-colors press-scale border border-white/20"
                >
                  <RotateCcw className="w-4 h-4" />
                  Restore · {streakRestore.cost.toLocaleString()} coins
                </button>
              </div>
            </div>
          </MCard>
        )}

        {/* ═══ 3. DAILY CHALLENGE - its own card (missions now live in the hero) ═══ */}
        {/* Headless DailyMissions keeps detecting + awarding the daily missions;
            the hero banner's Daily view is what displays them now. */}
        <DailyMissions headless />
        <MCard i={6} className="mt-3">
          <div className="bg-white rounded-3xl p-5 relative overflow-hidden" style={{ border: "1px solid #e7ede9", boxShadow: "0 1px 2px rgba(16,40,34,0.03), 0 14px 30px -16px rgba(16,40,34,0.13)" }}>
            <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl pointer-events-none"
              style={{ background: "rgba(var(--brand-rgb),0.06)" }} />
            <p className="relative text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Today</p>

            {/* Daily challenge - contained highlight row */}
            <div className={`relative mt-3 rounded-2xl p-4 text-white overflow-hidden ${dailyDone ? "opacity-80" : ""}`}
              style={{ background: "var(--brand-deep)" }}>
              <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full blur-2xl pointer-events-none"
                style={{ background: "rgba(var(--brand-rgb),0.18)" }} />
              <div className="relative flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border border-white/5" style={{ background: "rgba(43,182,115,0.18)" }}>
                    <Flame className="w-5 h-5 text-success" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">Daily challenge</p>
                    <p className="font-display font-extrabold text-lg truncate mt-0.5">{dailyGameName}</p>
                    <p className="text-sm font-bold mt-0.5" style={{ color: "#4ade80" }}>+75 coins</p>
                  </div>
                </div>
                {dailyDone ? (
                  <span className="shrink-0 text-sm font-bold px-4 py-2 rounded-xl bg-white/5" style={{ color: "#4ade80" }}>Completed ✓</span>
                ) : (
                  <Link to="/daily" className="shrink-0">
                    <button className="px-6 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-sm font-bold transition-colors press-scale border border-white/10">
                      Play →
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </MCard>

        {/* ═══ 4. SNAPSHOTS - business · portfolio · class rank ═══ */}
        <MCard i={7} className="mt-6 mb-2.5 px-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--brand)" }} />
            Your world
          </p>
        </MCard>
        <div className="grid grid-cols-1 min-[900px]:grid-cols-3 gap-3 items-stretch">

          {/* ── Micro-business: revenue hero + radial rep + customer dots ── */}
          <MCard i={8}>
            <Link to="/micro-business" className="block h-full">
              <div className="group bg-white rounded-3xl p-5 relative overflow-hidden hover-lift press-scale h-full"
                style={{ border: "1px solid #e7ede9", boxShadow: "0 1px 2px rgba(16,40,34,0.03), 0 14px 30px -16px rgba(16,40,34,0.13)" }}>
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

                      {/* Pending scenario - pulsing alert */}
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
                        /* Recent activity log - last 2 entries */
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
                      <p className="text-xs text-muted-foreground mt-1">Design a product, win customers, and run the books - your own company from scratch.</p>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </MCard>

          {/* ── Portfolio: interactive terminal ── */}
          <PortfolioSnapshot
            portfolio={portfolio}
            watchlist={watchlist}
            livePrices={livePrices}
            plPct={plPct}
            portfolioValue={portfolioValue}
          />

          {/* ── Class Leaderboard snapshot ── */}
          <MCard i={10}>
            <Link to="/leaderboard" className="block h-full">
              <div className="group bg-white rounded-3xl overflow-hidden hover-lift press-scale h-full relative"
                style={{ border: "1px solid #e7ede9", boxShadow: "0 1px 2px rgba(16,40,34,0.03), 0 14px 30px -16px rgba(16,40,34,0.13)" }}>

                {activeBoard.info && !activeBoard.empty ? (
                  <>
                    {/* ── Hero rank section - dark gradient bg ── */}
                    <div className="px-5 pt-5 pb-4 relative overflow-hidden"
                      style={{ background: "linear-gradient(145deg, #1a1208, #2d1f06)" }}>
                      {/* Glow orb */}
                      <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full blur-3xl pointer-events-none"
                        style={{ background: "rgba(227,160,8,0.25)" }} />
                      <div className="absolute -left-4 bottom-0 w-20 h-20 rounded-full blur-2xl pointer-events-none"
                        style={{ background: "rgba(227,160,8,0.1)" }} />

                      <div className="relative flex items-start justify-between">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "#E3A00880" }}>{activeBoard.label}</p>
                          <motion.div
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.65, duration: 0.35 }}
                            className="flex items-end gap-2 mt-1">
                            <p className="font-display font-extrabold leading-none" style={{ fontSize: "52px", color: "#E3A008", lineHeight: 1 }}>
                              #{activeBoard.info!.rank}
                            </p>
                          </motion.div>
                          <p className="text-sm font-bold mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                            of {activeBoard.info!.total} {activeBoard.noun}
                          </p>
                        </div>

                        {/* Rank medal badge */}
                        <motion.div
                          initial={{ scale: 0, rotate: 20 }} animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.7 }}
                          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mt-1 shrink-0"
                          style={{ background: "rgba(227,160,8,0.15)", border: "1px solid rgba(227,160,8,0.3)" }}>
                          {activeBoard.info!.rank === 1 ? "🥇" : activeBoard.info!.rank === 2 ? "🥈" : activeBoard.info!.rank === 3 ? "🥉" : "🏅"}
                        </motion.div>
                      </div>

                      {/* Coins + progress to next rank */}
                      {(() => {
                        const info = activeBoard.info!;
                        const above = activeBoard.rows.find(r => r.rank === info.rank - 1);
                        const gap = above ? above.xp - info.pts : null;
                        const pctToAbove = above && above.xp > 0 ? Math.min((info.pts / above.xp) * 100, 100) : null;
                        return (
                          <div className="mt-3 relative">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[11px] font-extrabold tabular-nums" style={{ color: "#E3A008" }}>
                                🪙 {info.pts.toLocaleString()} coins
                              </span>
                              {gap != null && (
                                <span className="text-[10px] font-bold" style={{ color: "rgba(255,255,255,0.45)" }}>
                                  {gap.toLocaleString()} to #{info.rank - 1}
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

                      {/* Board switcher - sits at the bottom of the banner, above the standings */}
                      <div className="mt-3">{boardSwitcher}</div>
                    </div>

                    {/* ── Standings list ── */}
                    <div className="px-5 py-3 space-y-0">
                      {(() => {
                        const maxXp = Math.max(...activeBoard.rows.map(r => r.xp), 1);
                        return activeBoard.rows.map((r, i) => {
                          const medals = ["🥇", "🥈", "🥉"];
                          const barColor = r.isMe ? "var(--brand)" : r.rank <= 3 ? ["#E3A008", "#9CA3AF", "#CD7C3A"][r.rank - 1] : "#CBD5E1";
                          return (
                            <motion.div key={r.name + i}
                              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.75 + i * 0.08, duration: 0.28 }}
                              className="py-2.5"
                              style={r.isMe ? { borderTop: "1px solid rgba(var(--brand-rgb),0.2)", borderBottom: "1px solid rgba(var(--brand-rgb),0.2)", marginTop: "2px", marginBottom: "2px" } : { borderTop: "1px solid #f0f5f3" }}>
                              <div className={`rounded-xl px-2 py-1 -mx-2 transition-colors ${r.isMe ? "bg-success/5" : ""}`}>
                                <div className="flex items-center gap-2.5 mb-1">
                                  <span className="text-base shrink-0 w-5 text-center">
                                    {r.rank <= 3 ? medals[r.rank - 1] : <span className="text-[11px] font-extrabold text-muted-foreground">{r.rank}</span>}
                                  </span>
                                  <span className={`text-sm flex-1 truncate ${r.isMe ? "font-extrabold" : "font-semibold"}`}
                                    style={r.isMe ? { color: "var(--brand)" } : { color: "#374151" }}>
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
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{activeBoard.label}</p>
                      <div className="ml-auto">{boardSwitcher}</div>
                    </div>
                    <p className="font-display text-[22px] font-extrabold tracking-tight leading-tight">{activeBoard.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activeBoard.emptyText}</p>
                  </div>
                )}
              </div>
            </Link>
          </MCard>
        </div>
      </main>

      {/* Fullscreen roller coaster - same overlay Missions uses */}
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
  watchlist: string[];
  livePrices: Map<string, number>;
  plPct: number;
  portfolioValue: number;
}
function PortfolioSnapshot({ portfolio, watchlist, livePrices, plPct, portfolioValue }: PortfolioSnapshotProps) {
  const [activeSymbol, setActiveSymbol] = useState<string | undefined>(undefined);
  const [chartRange, setChartRange] = useState<ChartRangeVal>("1y");
  const [hoverPrice, setHoverPrice] = useState<number | null>(null);
  const [hoverDate, setHoverDate] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [expandSymbol, setExpandSymbol] = useState<string | undefined>(undefined);

  const openExpanded = (sym?: string) => {
    setExpandSymbol(sym ?? symbol);
    setExpanded(true);
  };

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
  const chartColor = chartUp ? "var(--brand)" : "#dc2626";

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
        className="bg-white rounded-3xl p-5 relative overflow-hidden h-full hover-lift"
        style={{ border: "1px solid #e7ede9", boxShadow: "0 1px 2px rgba(16,40,34,0.03), 0 14px 30px -16px rgba(16,40,34,0.13)" }}
      >
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
              <button onClick={() => openExpanded()}
                className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full transition-colors press-scale"
                style={{ background: "#3BA7C414", color: "#3BA7C4" }}>
                Expand <Maximize2 className="w-3 h-3" />
              </button>
            )}
          </div>

          {portfolio.length > 0 && activeHolding ? (
            <>
              {/* Price display - updates on hover; click to expand */}
              <div onClick={() => openExpanded()}
                className="mt-3 flex items-start justify-between gap-2 cursor-pointer group/hero">
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

              {/* Interactive chart with crosshair - click to expand */}
              <div className="h-28 mt-2 -mx-2 cursor-pointer" onClick={() => openExpanded()}>
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

              {/* Holdings list - click to open the expanded view on that stock */}
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
                      onClick={() => openExpanded(h.symbol)}
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
                {portfolio.length > 4 && (
                  <button onClick={() => openExpanded()}
                    className="w-full text-center py-2 border-t border-border/40 text-[11px] font-bold text-muted-foreground hover:text-foreground transition-colors press-scale">
                    +{portfolio.length - 4} more · view full portfolio →
                  </button>
                )}
              </div>
            </>
          ) : (
            <Link to="/stocks" className="block mt-3 group/first">
              <p className="font-display text-[22px] font-extrabold tracking-tight leading-tight">First trade</p>
              <p className="text-xs text-muted-foreground mt-1">
                Buy real companies with virtual cash and watch your chart grow right here.
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-xs font-bold px-3 py-1.5 rounded-full press-scale"
                style={{ background: "#3BA7C4", color: "white" }}>
                Explore stocks <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/first:translate-x-0.5" />
              </span>
            </Link>
          )}
        </div>
      </div>

      <PortfolioExpanded
        open={expanded}
        onClose={() => setExpanded(false)}
        portfolio={portfolio}
        watchlist={watchlist}
        livePrices={livePrices}
        initialSymbol={expandSymbol}
        portfolioValue={portfolioValue}
        plPct={plPct}
      />
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
