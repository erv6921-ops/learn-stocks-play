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
import DailyMissions from "@/components/DailyMissions";
import { anchor } from "@/lib/tourAnchors";
import { isEarnedEntry } from "@/lib/playerStats";
import { getLeague } from "@/lib/leagues";
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
        {/* ═══ 1. HERO — who you are + the ONE thing to do next ═══ */}
        <div className="hud-panel p-5 md:p-8 mb-5 relative z-10 overflow-hidden">
          <div className="relative z-10 grid lg:grid-cols-2 gap-6 items-center">
            {/* Left: greeting + vitals */}
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight">{getGreeting()} 👋</h1>
              <p className="text-white/50 text-sm mt-1">{formattedDate}</p>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                {streak > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/15 text-orange-300 text-xs font-bold border border-orange-500/20">
                    <Flame className="w-3.5 h-3.5" /> {streak} day streak
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gold/15 text-gold text-xs font-bold border border-gold/20">
                  <Coins className="w-3.5 h-3.5" /> {Math.floor(netWorth).toLocaleString()}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-white text-xs font-bold border border-white/10">
                  <Star className="w-3.5 h-3.5 text-yellow-300" /> Lv {currLevel}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-white/10" style={{ color: myLeague.color, background: "rgba(255,255,255,0.06)" }}>
                  {myLeague.icon} {myLeague.name} League
                </span>
              </div>
              {earnedToday > 0 && (
                <p className="text-success text-xs font-bold mt-3">+{earnedToday.toLocaleString()} InvestiCoins earned today — keep going!</p>
              )}
            </div>

            {/* Right: NEXT UP — the single most important card on the page */}
            {nextLesson ? (
              <div ref={anchor("dash-today")} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-1.5">▶ Next up</p>
                <p className="text-white font-display font-extrabold text-lg leading-snug">{nextLesson.title}</p>
                <p className="text-white/50 text-xs mt-1">Unit {currentUnit.unitNumber} · {currentUnit.title}</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full bg-success transition-all" style={{ width: `${currentUnitProgress}%` }} />
                  </div>
                  <span className="text-white/50 text-[11px] font-bold">{currentUnitProgress}%</span>
                </div>
                <div className="flex items-center justify-between gap-3 mt-4">
                  <span className="text-gold font-bold text-sm flex items-center gap-1">
                    <Coins className="w-4 h-4" />+{Math.round(nextLesson.reward * getRewardMultiplier()).toLocaleString()}
                  </span>
                  <Link to={`/lessons/${nextLesson.id}`}>
                    <Button size="lg" className="press-scale gap-1.5 font-bold">Continue <ArrowRight className="w-4 h-4" /></Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-2xl mb-1">🎉</p>
                <p className="text-white font-extrabold">Every lesson complete — legend!</p>
                <Link to="/leaderboard" className="inline-block mt-3">
                  <Button size="sm" className="press-scale">See your rank</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ──── JOIN A CLASS (only for students not yet in one) ──── */}
        {inClass === false &&
        <Card variant="elevated" className="mb-5 border-primary/30">
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

        {/* ═══ 2. TODAY — quick daily coins, nothing else ═══ */}
        <SectionHeader icon={Flame} title="Today" subtitle="Quick wins — fresh coins every day" />
        <div className="grid lg:grid-cols-2 gap-4 mb-6 items-start">
          <Card
            className={`border-0 overflow-hidden ${dailyDone ? "opacity-70" : ""}`}
            style={{ background: "linear-gradient(135deg,#0f3d2a,#06291f)" }}>
            <CardContent className="p-4 md:p-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "rgba(43,182,115,0.18)" }}>
                  <Flame className="w-5 h-5 text-success" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-base md:text-lg font-extrabold text-white">Daily Challenge</p>
                  <p className="text-sm text-white/70 truncate">
                    <span className="font-bold text-white">{dailyGameName}</span>
                    <span className="mx-1.5">·</span>
                    <span className="font-bold text-gold">🪙 75</span>
                  </p>
                </div>
                {dailyDone ?
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-success/20 text-success font-bold text-sm border border-success/30 shrink-0">
                    Done ✓
                  </span> :
                <Link to="/daily" className="shrink-0">
                    <Button className="press-scale gap-1.5">Play <ArrowRight className="w-4 h-4" /></Button>
                  </Link>
                }
              </div>
            </CardContent>
          </Card>

          <DailyMissions
            lessonProgress={lessonProgress}
            portfolio={portfolio}
            earnJeffs={earnJeffs} />
        </div>

        {/* ═══ 3. YOUR WORLD — six doors, one live number each ═══ */}
        <SectionHeader icon={Target} title="Your World" subtitle="Everything you build, one tap away" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <WorldTile to="/lessons" icon={BookOpen} tint="#8B5CF6" title="Missions"
            stat={`${progressPercent}%`} sub={`${completedLessons}/${totalLessons} lessons done`} progress={progressPercent} />
          <WorldTile to="/stocks" icon={LineChart} tint="#E3A008" title="Stocks"
            stat={portfolio.length > 0 ? `🪙 ${Math.floor(portfolioValue).toLocaleString()}` : undefined}
            sub={portfolio.length > 0 ? `${portfolio.length} ${portfolio.length === 1 ? "stock" : "stocks"} owned` : "Make your first trade"} />
          <WorldTile to="/micro-business" icon={Store} tint="#F97316" title="Business"
            stat={hasBusiness && bizSim ? `Month ${bizSim.month}` : undefined}
            sub={hasBusiness && bizSim ? `${statusLabel(bizSim).label} · 🪙 ${monthlyRevenue(bizSim).toLocaleString()}/mo` : "Build your own company"} />
          <WorldTile to="/bank" icon={Landmark} tint="#0F766E" title="Bank"
            sub="Vault, loans, bonds & careers" />
          <WorldTile to="/leaderboard" icon={Trophy} tint="#E0457B" title="Leaderboard"
            stat={`${myLeague.icon} ${myLeague.name}`} sub="Race your class up the leagues" />
          <WorldTile to="/lab" icon={FlaskConical} tint="#3BA7C4" title="Lab"
            sub="Real-world money skills" />
        </div>
      </main>
    </div>);

}

/* ──── Sub-components ──── */

// Unified section header used across the dashboard for a cohesive look.
function SectionHeader({ icon: Icon, title, subtitle, action, right }: {icon: React.ComponentType<{className?: string;}>;title: string;subtitle?: string;action?: {label: string;to: string;};right?: React.ReactNode;}) {
  return (
    <div className="flex items-end justify-between gap-3 mb-3 md:mb-4">
      <div className="flex items-center gap-2.5">
        <span className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-primary" />
        </span>
        <div>
          <h3 className="font-display text-base font-extrabold leading-none tracking-tight">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        </div>
      </div>
      {right ? right : action ?
      <Link to={action.to}>
          <Button variant="ghost" size="sm" className="press-scale text-xs shrink-0">
            {action.label}<ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Link> :
      null}
    </div>);

}

// One "door" into a section of the app: icon, one live number, one line of
// context, and an optional progress bar — the whole dashboard vocabulary.
function WorldTile({ to, icon: Icon, tint, title, stat, sub, progress }: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  tint: string;
  title: string;
  stat?: string;
  sub: string;
  progress?: number;
}) {
  return (
    <Link
      to={to}
      className="group rounded-2xl bg-card border border-border/40 p-4 md:p-5 hover-lift press-scale block relative overflow-hidden"
    >
      {/* Top accent strip in the section's tint */}
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: tint }} />
      <span className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${tint}1a`, color: tint }}>
        <Icon className="w-5 h-5" />
      </span>
      <div className="flex items-center justify-between gap-2">
        <p className="font-display font-extrabold text-base tracking-tight">{title}</p>
        <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
      </div>
      {stat && <p className="text-xl font-extrabold mt-0.5 tracking-tight" style={{ color: tint }}>{stat}</p>}
      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{sub}</p>
      {progress != null && (
        <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: tint }} />
        </div>
      )}
    </Link>
  );
}
