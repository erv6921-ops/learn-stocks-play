import React, { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { supabase } from "@/integrations/supabase/client";
import { lessons, unitInfo, getUnitRewardTotal, getLessonsByUnit } from "@/data/lessons";
import { AP_UNIT_CHALLENGES } from "@/data/apMicro";
import { getAdaptiveCurriculum, AdaptiveLessonInfo } from "@/lib/curriculumEngine";
import {
  getStreak, getBestStreak, getCurriculumLevel, getTotalEarned, getCoinsThisWeek,
} from "@/lib/playerStats";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import GameNav from "@/components/GameNav";
import {
  ArrowRight, Lock, CheckCircle, Coins, Flame, Star, Trophy,
  Award, Footprints, Zap, Crown, LineChart, Coins as CoinsIcon,
  GraduationCap, Target,
} from "lucide-react";
import { LessonCategory, CourseTrack } from "@/types";
import APModeToggle from "@/components/APModeToggle";
import APModeSections from "@/components/APModeSections";

// ── #4 Next-lesson one-line descriptions, keyed L<unit>.<lesson> ──
const lessonDescriptions: Record<string, string> = {
  "L1.1": "Why our brains make terrible money decisions",
  "L1.2": "How waiting pays off — literally",
  "L1.3": "The trap of wanting what others have",
  "L1.4": "Why you spend more than you think",
  "L2.1": "What your time is actually worth per hour",
  "L2.2": "Salary vs. hourly — which is really better?",
  "L2.3": "How taxes shrink your paycheck",
  "L2.4": "Side hustles that actually make money",
  "L3.1": "Build a budget that doesn't feel like a punishment",
  "L3.2": "The 50/30/20 rule explained",
  "L3.3": "Needs vs. wants — drawing the line",
  "L3.4": "Tracking spending without losing your mind",
};
const FALLBACK_LESSON_DESC = "Master this concept to unlock the next level.";
const lessonDescFor = (unitNumber?: number, lessonNumber?: number) =>
  lessonDescriptions[`L${unitNumber}.${lessonNumber}`] || FALLBACK_LESSON_DESC;

// ── #8 One-sentence unit summaries (by unit number) ──
const unitSummaries: Record<number, string> = {
  1: "Understand why we make bad money decisions and how to rewire your thinking.",
  2: "Learn how income works, what affects your earning power, and how to grow it.",
  3: "Master budgeting so your money goes where you actually want it to go.",
  4: "Understand debt, credit scores, and how to use borrowing without getting trapped.",
  5: "Learn to invest early and let compound interest do the heavy lifting.",
  6: "Understand taxes — what you owe, why, and how to keep more of what you earn.",
  7: "Protect yourself and your assets with the right insurance strategies.",
  8: "Plan for retirement now, even if it feels impossibly far away.",
};
const unitSummaryFor = (unitNumber: number, title: string) =>
  unitSummaries[unitNumber] || `Dive into ${title} and level up your financial skills.`;

// ── Pulse animation for current dot (injected once) ──
const PULSE_STYLE_ID = "chart-pulse-keyframe";
function ensurePulseStyle() {
  if (document.getElementById(PULSE_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = PULSE_STYLE_ID;
  style.textContent = `@keyframes chartPulse{0%{transform:scale(1);opacity:.4}100%{transform:scale(1.5);opacity:0}}`;
  document.head.appendChild(style);
}

// Distinct per-unit colours for the overall-progress pie. Assigned by unit order.
const UNIT_COLORS = ["#1D9E75", "#EF9F27", "#3B82C4", "#9B59B6", "#E5734E", "#16A0A0", "#C2487E", "#6B8E23", "#D4A017", "#5B6CDB"];

export default function Lessons() {
  const { user, lessonProgress, unitTestProgress, getRewardMultiplier, jeffsBalance, jeffsHistory } = useApp();
  const navigate = useNavigate();
  const multiplier = getRewardMultiplier();
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => { ensurePulseStyle(); }, []);

  // AP Mode toggle
  const [apMode, setApMode] = useState(() => {
    try { return localStorage.getItem("ap-mode") === "true"; } catch { return false; }
  });
  useEffect(() => {
    try { localStorage.setItem("ap-mode", String(apMode)); } catch {}
  }, [apMode]);

  // Course track: Florida Personal Finance (default) or the AP Micro elective.
  const [activeTrack, setActiveTrack] = useState<CourseTrack>(() => {
    try { return (localStorage.getItem("investiplay_active_track") as CourseTrack) || "florida"; } catch { return "florida"; }
  });
  useEffect(() => {
    try { localStorage.setItem("investiplay_active_track", activeTrack); } catch { /* storage unavailable */ }
  }, [activeTrack]);
  const trackUnits = useMemo(
    () => unitInfo.filter(u => (u.track ?? "florida") === activeTrack).sort((a, b) => a.orderIndex - b.orderIndex),
    [activeTrack]
  );

  const isLessonCompleted = useCallback(
    (lessonId: string) => lessonProgress.find((p) => p.lessonId === lessonId && p.completed),
    [lessonProgress]
  );
  const unitTestPassed = (category: LessonCategory) =>
    unitTestProgress.find((p) => p.category === category && p.completed);

  // Adaptive curriculum
  const adaptiveCurriculum = useMemo(() => {
    return getAdaptiveCurriculum(
      user?.benchmarkCategoryScores || null,
      user?.benchmarkScores || null,
      user?.assessmentScore ?? null,
      50
    );
  }, [user?.benchmarkCategoryScores, user?.benchmarkScores, user?.assessmentScore]);

  // Prerequisite gating — scoped to the units of the active track.
  const unlockedUnits = useMemo(() => {
    const unlocked = new Set<string>();
    const firstOrder = trackUnits[0]?.orderIndex;
    for (const unit of trackUnits) {
      if (unit.orderIndex === firstOrder) { unlocked.add(unit.id); continue; }
      const previousUnits = trackUnits.filter(u => u.orderIndex < unit.orderIndex);
      const allPreviousComplete = previousUnits.every(prevUnit => {
        const adaptive = adaptiveCurriculum.get(prevUnit.id);
        if (!adaptive) return false;
        const requiredLessons = adaptive.lessons.filter(l => l.status === "required");
        const completedCount = requiredLessons.filter(l => isLessonCompleted(l.lesson.id)).length;
        if (requiredLessons.length === 0) return true;
        return completedCount / requiredLessons.length >= 0.6;
      });
      if (allPreviousComplete) unlocked.add(unit.id);
    }
    return unlocked;
  }, [adaptiveCurriculum, lessonProgress, trackUnits]);

  const isLessonUnlocked = (unitId: string, lessonId: string): boolean => {
    if (!unlockedUnits.has(unitId)) return false;
    const adaptive = adaptiveCurriculum.get(unitId);
    if (!adaptive) return false;
    const requiredLessons = adaptive.lessons.filter(l => l.status === "required");
    const lessonIndex = requiredLessons.findIndex(l => l.lesson.id === lessonId);
    if (lessonIndex === -1) {
      return !!adaptive.lessons.find(l => l.lesson.id === lessonId && l.status === "validated");
    }
    if (lessonIndex === 0) return true;
    return !!isLessonCompleted(requiredLessons[lessonIndex - 1].lesson.id);
  };

  // Find the first unit with incomplete lessons (active unit) within the track.
  const firstActiveUnitId = useMemo(() => {
    for (const unit of trackUnits) {
      if (!unlockedUnits.has(unit.id)) continue;
      const adaptive = adaptiveCurriculum.get(unit.id);
      if (!adaptive) continue;
      const allDone = adaptive.lessons.every(
        l => l.status === "validated" || isLessonCompleted(l.lesson.id)
      );
      if (!allDone) return unit.id;
    }
    return trackUnits[0]?.id || "";
  }, [adaptiveCurriculum, lessonProgress, unlockedUnits, trackUnits]);

  const [activeUnitId, setActiveUnitId] = useState(firstActiveUnitId);
  useEffect(() => { setActiveUnitId(firstActiveUnitId); }, [firstActiveUnitId]);

  // Scroll active chip into view
  useEffect(() => {
    if (!stripRef.current) return;
    const el = stripRef.current.querySelector(`[data-unit="${activeUnitId}"]`) as HTMLElement;
    if (el) el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeUnitId]);

  // Active unit data
  const activeUnit = unitInfo.find(u => u.id === activeUnitId);
  const activeAdaptive = adaptiveCurriculum.get(activeUnitId);
  const activeLessons = activeAdaptive?.lessons ?? [];
  const activeRequiredLessons = activeLessons.filter(l => l.status === "required");

  // Compute stats
  const completedCount = activeLessons.filter(
    l => l.status === "validated" || isLessonCompleted(l.lesson.id)
  ).length;
  const totalLessons = activeLessons.length;
  const pctComplete = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const unitTotalPts = activeUnit ? getUnitRewardTotal(activeUnit.id) : 0;
  const earnedPts = activeLessons.reduce((sum, al) => {
    if (al.status === "validated" || isLessonCompleted(al.lesson.id)) {
      return sum + Math.round(al.lesson.reward * multiplier);
    }
    return sum;
  }, 0);

  // Next lesson in active unit
  const nextLessonInUnit = useMemo(() => {
    for (const al of activeLessons) {
      if (al.status === "required" && !isLessonCompleted(al.lesson.id) && isLessonUnlocked(activeUnitId, al.lesson.id)) {
        return al;
      }
    }
    return null;
  }, [activeLessons, lessonProgress, activeUnitId, unlockedUnits]);

  const unitIsComplete = completedCount >= totalLessons && totalLessons > 0;


  // Find current lesson index for chart
  const currentLessonIdx = useMemo(() => {
    for (let i = 0; i < activeLessons.length; i++) {
      const al = activeLessons[i];
      if (al.status !== "validated" && !isLessonCompleted(al.lesson.id)) return i;
    }
    return activeLessons.length; // all complete
  }, [activeLessons, lessonProgress]);

  // Next unit after current
  const nextUnit = useMemo(() => {
    if (!activeUnit) return null;
    return trackUnits.find(u => u.orderIndex === activeUnit.orderIndex + 1) || null;
  }, [activeUnit, trackUnits]);

  // ── Player-wide stats (level mirrors the Florida-scoped navbar HUD) ──
  const floridaUnits = useMemo(() => unitInfo.filter(u => (u.track ?? "florida") === "florida"), []);
  const floridaLessonIds = useMemo(
    () => new Set(floridaUnits.flatMap(u => getLessonsByUnit(u.id).map(l => l.id))),
    [floridaUnits]
  );
  const completedLessonsAll = lessonProgress.filter(p => p.completed).length;
  const completedFloridaLessons = lessonProgress.filter(p => p.completed && floridaLessonIds.has(p.lessonId)).length;
  const unitScores = useMemo(() =>
    floridaUnits.map(u => {
      const ul = getLessonsByUnit(u.id);
      return {
        done: ul.filter(l => lessonProgress.find(p => p.lessonId === l.id && p.completed)).length,
        total: ul.length,
      };
    }), [lessonProgress, floridaUnits]);
  const streak = useMemo(() => getStreak(jeffsHistory), [jeffsHistory]);
  const bestStreak = useMemo(() => getBestStreak(jeffsHistory), [jeffsHistory]);
  const level = useMemo(() => getCurriculumLevel(completedFloridaLessons, floridaLessonIds.size, unitScores),
    [completedFloridaLessons, floridaLessonIds, unitScores]);
  const totalEarned = useMemo(() => getTotalEarned(jeffsHistory), [jeffsHistory]);
  const coinsThisWeek = useMemo(() => getCoinsThisWeek(jeffsHistory), [jeffsHistory]);
  const anyUnitComplete = unitScores.some(u => u.total > 0 && u.done >= u.total);
  const timeSpentMins = completedLessonsAll * 3;

  // ── Overall progress across every lesson in the active track (for the pie) ──
  const trackLessonIds = useMemo(
    () => trackUnits.flatMap(u => getLessonsByUnit(u.id).map(l => l.id)),
    [trackUnits]
  );
  const trackTotalLessons = trackLessonIds.length;
  const trackDoneLessons = useMemo(
    () => trackLessonIds.filter(id => lessonProgress.some(p => p.lessonId === id && p.completed)).length,
    [trackLessonIds, lessonProgress]
  );
  const trackPct = trackTotalLessons > 0 ? Math.round((trackDoneLessons / trackTotalLessons) * 100) : 0;
  const lessonsLeft = Math.max(0, trackTotalLessons - trackDoneLessons);

  // Per-unit slices for the pie: each unit is a wedge sized by its lesson count
  // and coloured in as its lessons get completed.
  const unitPie = useMemo(
    () => trackUnits.map((u, idx) => {
      const ul = getLessonsByUnit(u.id);
      const done = ul.filter(l => lessonProgress.some(p => p.lessonId === l.id && p.completed)).length;
      return { id: u.id, total: ul.length, done, color: UNIT_COLORS[idx % UNIT_COLORS.length] };
    }),
    [trackUnits, lessonProgress]
  );

  // ── #5 Badges (derived from milestones; no badges table exists) ──
  const stocksVisits = useMemo(() => {
    try { return parseInt(localStorage.getItem('investiplay_stocks_visits') || '0', 10) || 0; } catch { return 0; }
  }, []);
  const badges = useMemo(() => [
    { id: 'first-step',     name: 'First Step',     Icon: Footprints, earned: completedLessonsAll >= 1 },
    { id: 'on-a-roll',      name: 'On a Roll',      Icon: Flame,      earned: bestStreak >= 3 },
    { id: 'week-warrior',   name: 'Week Warrior',   Icon: Zap,        earned: bestStreak >= 7 },
    { id: 'unit-master',    name: 'Unit Master',    Icon: Crown,      earned: anyUnitComplete },
    { id: 'market-watcher', name: 'Market Watcher', Icon: LineChart,  earned: stocksVisits >= 5 },
    { id: 'coin-collector', name: 'Coin Collector', Icon: CoinsIcon,  earned: totalEarned >= 500 },
  ], [completedLessonsAll, bestStreak, anyUnitComplete, stocksVisits, totalEarned]);
  const earnedBadgeCount = badges.filter(b => b.earned).length;

  // ── #9 Class rank (same query the Leaderboard page uses) ──
  const [classRank, setClassRank] = useState<number | null>(null);
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (!authUser) return;
        const { data: memberships } = await supabase
          .from('class_members').select('class_id').eq('user_id', authUser.id);
        if (!memberships || memberships.length === 0) return;
        const { data: lb } = await supabase.rpc('get_class_leaderboard', { _class_id: memberships[0].class_id });
        if (!active || !lb || lb.length === 0) return;
        const sorted = [...lb].sort((a, b) => (Number(b.xp) || 0) - (Number(a.xp) || 0));
        const idx = sorted.findIndex(r => r.user_id === authUser.id);
        if (idx >= 0) setClassRank(idx + 1);
      } catch { /* leaderboard unavailable — leave rank hidden */ }
    })();
    return () => { active = false; };
  }, [lessonProgress]);

  // ── #8 Locked-unit preview panel state ──
  const [previewUnitId, setPreviewUnitId] = useState<string | null>(null);
  const previewUnit = previewUnitId ? unitInfo.find(u => u.id === previewUnitId) : null;

  // ── #10 Brief skeleton frame to avoid layout shift on first paint ──
  const [statsReady, setStatsReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setStatsReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Handle a unit-tab click: unlocked → switch active; locked → show preview.
  const handleUnitTabClick = (unitId: string) => {
    if (unlockedUnits.has(unitId)) {
      setActiveUnitId(unitId);
      setPreviewUnitId(null);
    } else {
      setPreviewUnitId(prev => prev === unitId ? null : unitId);
    }
  };

  if (!user) { navigate("/onboarding"); return null; }

  // For AP Mode, delegate to existing component
  // but wrap with our header
  const renderAPMode = () => (
    <APModeSections allUnits={unitInfo} renderUnit={renderUnitCardLegacy} />
  );

  // Legacy unit card for AP Mode (kept from old design)
  function renderUnitCardLegacy(unit: typeof unitInfo[number]) {
    const adaptive = adaptiveCurriculum.get(unit.id);
    if (!adaptive) return null;
    const uLessons = adaptive.lessons;
    const reqLessons = uLessons.filter(l => l.status === "required");
    const valLessons = uLessons.filter(l => l.status === "validated");
    const cCount = uLessons.filter(l => l.status === "validated" || isLessonCompleted(l.lesson.id)).length;
    const prog = uLessons.length > 0 ? Math.round(cCount / uLessons.length * 100) : 0;
    const totalReward = getUnitRewardTotal(unit.id);
    const unitIsLocked = !unlockedUnits.has(unit.id);

    return (
      <div key={unit.id} className={`border rounded-[20px] overflow-hidden bg-card ${unitIsLocked ? 'opacity-60' : ''}`}
        style={{ borderWidth: "0.5px", borderColor: "hsl(45 10% 82%)" }}>
        <button
          onClick={() => { if (!unitIsLocked) setActiveUnitId(unit.id); }}
          className="w-full px-6 py-5 text-left hover:bg-muted/20 transition-colors"
        >
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">Unit {unit.unitNumber}</span>
                {unitIsLocked && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg border bg-muted text-muted-foreground border-border flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Locked
                  </span>
                )}
              </div>
              <h3 className="font-display font-bold text-lg leading-snug tracking-tight">{unit.title}</h3>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs text-muted-foreground">{reqLessons.length} lessons</span>
                {valLessons.length > 0 && <span className="text-xs text-success">{valLessons.length} validated</span>}
                <span className="text-xs text-gold font-bold flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5" />{totalReward.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="w-20 shrink-0 text-right">
              <span className="text-sm font-bold text-foreground">{prog}%</span>
            </div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <GameNav />

      <main className="container mx-auto px-4 md:px-6 py-6 max-w-5xl">
        {/* Course track switcher */}
        <div className="mb-5 inline-flex items-center rounded-full bg-muted/60 p-1 border border-border/40">
          {([
            { key: "florida" as CourseTrack, label: "Personal Finance" },
            { key: "ap-micro" as CourseTrack, label: "AP Microeconomics" },
          ]).map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTrack(t.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${activeTrack === t.key ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* AP Mode Toggle (business AP tracks — Florida only) */}
        {activeTrack === "florida" && (
          <div className="mb-5">
            <APModeToggle apMode={apMode} onToggle={setApMode} />
          </div>
        )}

        {/* AP Micro elective banner */}
        {activeTrack === "ap-micro" && (
          <div className="rounded-2xl p-4 mb-5 text-white" style={{ background: "linear-gradient(135deg,#0f2d1e,#1D9E75)" }}>
            <p className="text-sm font-bold flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-gold" /> AP Microeconomics — College Board aligned
            </p>
            <p className="text-white/60 text-xs mt-0.5">An elective track. Your required curriculum and level are unaffected.</p>
          </div>
        )}

        {apMode && activeTrack === "florida" ? renderAPMode() : (
          <>
            {/* 1. Page header — unit hero + unified stat strip */}
            <div className="relative overflow-hidden rounded-[20px] mb-4 p-5 md:p-6 text-white"
              style={{ background: "linear-gradient(135deg, #0f2d1e 0%, #143d29 55%, #1d6b4d 135%)" }}>
              {/* subtle dotted texture */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle at 25% 15%, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/45">
                      Your knowledge portfolio
                    </p>
                    <h1 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight leading-tight mt-1 break-words">
                      {activeUnit ? `Unit ${activeUnit.unitNumber} — ${activeUnit.title}` : "Curriculum"}
                    </h1>
                  </div>
                  {/* Class rank — hidden entirely when no class/leaderboard */}
                  {classRank != null && (
                    <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold shrink-0"
                      style={{ background: "rgba(239,159,39,0.18)", color: "#F5C26B" }}>
                      <Trophy className="w-3.5 h-3.5" /> #{classRank} in class
                    </div>
                  )}
                </div>

                {/* Stat strip — same info, one cohesive panel */}
                {statsReady ? (
                  <div className="mt-4 grid grid-cols-3 rounded-2xl bg-white/[0.06] border border-white/10 divide-x divide-white/10">
                    {[
                      { Icon: Flame, tint: "text-orange-400", value: String(streak), label: "Day streak" },
                      { Icon: Coins, tint: "text-gold", value: jeffsBalance.toLocaleString(), label: "Points" },
                      { Icon: Star, tint: "text-yellow-300", value: `Lv ${level}`, label: "Level" },
                    ].map(({ Icon, tint, value, label }) => (
                      <div key={label} className="px-3 py-3 sm:px-4 flex items-center gap-2.5 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 ${tint}`} />
                        <div className="min-w-0">
                          <p className="text-base md:text-lg font-extrabold leading-none tabular-nums">{value}</p>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/45 mt-1 truncate">{label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-4 h-[60px] rounded-2xl bg-white/[0.06] border border-white/10 animate-pulse" />
                )}
              </div>
            </div>

            {/* 2. Progress card — circular ring hero + chart */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-[20px] bg-card overflow-hidden mb-4"
              style={{ border: "0.5px solid hsl(45 10% 82%)" }}>
              {/* #2 Circular progress ring hero */}
              <div className="px-5 pt-5 pb-3 flex items-center gap-5">
                <ProgressRing completed={completedCount} total={totalLessons} pct={pctComplete} />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.12em] truncate">
                    {activeUnit?.title ?? "—"}
                  </p>
                  {/* #10 Prominent lessons-done line (16px / 500) */}
                  <p className="text-foreground tracking-tight mt-0.5" style={{ fontSize: 16, fontWeight: 500 }}>
                    {completedCount} of {totalLessons} lessons done
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm font-bold" style={{ color: "#1D9E75" }}>
                      {earnedPts.toLocaleString()} pts
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(29,158,117,0.1)", color: "#1D9E75" }}>
                      ▲ {pctComplete}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Chart row — line chart (~75%) + overall-progress pie on the side */}
              <div className="px-5 pb-4 flex items-center gap-4">
                {/* Line chart column (unchanged chart, just at 75% width) */}
                <div className="flex-[3] min-w-0">
                  <ChartSVG
                    lessons={activeLessons}
                    currentIdx={currentLessonIdx}
                    multiplier={multiplier}
                    unitTotalPts={Math.round(unitTotalPts * multiplier)}
                  />
                  {/* X-axis labels */}
                  <div className="flex justify-between mt-1">
                    {["start", "25%", "now", "75%", "done"].map((label) => (
                      <span key={label} className="text-[10px] font-semibold"
                        style={{ color: label === "now" ? "#EF9F27" : "hsl(215 12% 56%)" }}>
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Overall progress pie — one wedge per unit, fills as you go */}
                <div className="flex-[1.6] flex flex-col items-center justify-center gap-2 pl-4 border-l" style={{ borderColor: "hsl(45 10% 90%)" }}>
                  <ProgressPie units={unitPie} />
                  <p className="text-2xl font-extrabold leading-none" style={{ color: "#1D9E75" }}>{trackPct}%</p>
                  <p className="text-base font-extrabold text-foreground leading-none">
                    {lessonsLeft} {lessonsLeft === 1 ? "lesson" : "lessons"} left
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-center leading-tight">
                    to finish all units
                  </p>
                </div>
              </div>
            </motion.div>

            {/* #7 Mini stat grid (fills space between card and unit tabs) */}
            {statsReady ? (
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: "Best streak", value: `${bestStreak} day${bestStreak === 1 ? "" : "s"}` },
                  { label: "Coins this week", value: coinsThisWeek.toLocaleString() },
                  { label: "Time spent", value: `${timeSpentMins} mins` },
                ].map(s => (
                  <div key={s.label} className="rounded-2xl bg-muted/50 border border-border/40 px-3 py-3 text-center">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider truncate">{s.label}</p>
                    <p className="text-base font-extrabold text-foreground mt-0.5">{s.value}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[0, 1, 2].map(i => <div key={i} className="h-[58px] rounded-2xl animate-pulse bg-muted" />)}
              </div>
            )}

            {/* #5 Badges section */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-display text-sm font-bold flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-gold" /> Your badges
                </h2>
                <span className="text-[11px] font-semibold text-muted-foreground">{earnedBadgeCount} earned</span>
              </div>
              {statsReady ? (
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                  {badges.map(b => (
                    <div key={b.id} className="shrink-0 w-[72px] flex flex-col items-center gap-1.5 text-center">
                      <div className={`relative w-12 h-12 rounded-full flex items-center justify-center ${b.earned ? "" : "grayscale opacity-50"}`}
                        style={{ background: b.earned ? "linear-gradient(135deg,#1D9E75,#0f2d1e)" : "hsl(45 10% 88%)" }}>
                        <b.Icon className={`w-5 h-5 ${b.earned ? "text-white" : "text-muted-foreground"}`} />
                        {!b.earned && (
                          <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-muted-foreground/80 flex items-center justify-center">
                            <Lock className="w-2.5 h-2.5 text-white" />
                          </span>
                        )}
                      </div>
                      <span className={`text-[10px] leading-tight font-semibold ${b.earned ? "text-foreground" : "text-muted-foreground"}`}>{b.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex gap-3 pb-1">
                  {[0, 1, 2, 3, 4, 5].map(i => <div key={i} className="shrink-0 w-12 h-12 rounded-full animate-pulse bg-muted" />)}
                </div>
              )}
            </div>

            {/* 3. Unit strip — scrollable "mission" tabs */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Units</p>
                <span className="text-[11px] font-semibold text-muted-foreground">{trackUnits.length} in this track</span>
              </div>
              <div className="relative">
                <div ref={stripRef} className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar">
                  {trackUnits.map((unit) => {
                    const adaptive = adaptiveCurriculum.get(unit.id);
                    const uLessons = adaptive?.lessons ?? [];
                    const done = uLessons.filter(l => l.status === "validated" || isLessonCompleted(l.lesson.id)).length;
                    const total = uLessons.length;
                    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
                    const isActive = unit.id === activeUnitId;
                    const isLocked = !unlockedUnits.has(unit.id);
                    const isComplete = done >= total && total > 0;

                    // Same palette as the rest of the page: charcoal active,
                    // light-green complete, warm-grey default; gold/green accents.
                    const labelColor = isActive ? "rgba(255,255,255,0.55)" : isComplete ? "#1D9E75" : "hsl(215 12% 52%)";
                    const titleColor = isActive ? "#fff" : isComplete ? "#0f6b4f" : "hsl(215 12% 28%)";
                    const fill = isActive ? "#EF9F27" : "#1D9E75";
                    const track = isActive ? "rgba(255,255,255,0.16)" : isComplete ? "rgba(29,158,117,0.18)" : "hsl(45 10% 84%)";

                    return (
                      <button
                        key={unit.id}
                        data-unit={unit.id}
                        onClick={() => handleUnitTabClick(unit.id)}
                        className="shrink-0 rounded-2xl p-3 text-left transition-all duration-200 w-[160px] press-scale hover:-translate-y-0.5"
                        style={{
                          background: isActive ? "#2C2C2A" : isComplete ? "#E1F5EE" : "hsl(45 10% 93%)",
                          opacity: isLocked ? 0.55 : 1,
                          boxShadow: isActive ? "0 8px 20px rgba(44,44,42,0.22)" : "none",
                          border: isActive ? "1px solid #2C2C2A" : isComplete ? "1px solid rgba(29,158,117,0.22)" : "1px solid hsl(45 10% 86%)",
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-bold uppercase tracking-[0.14em]" style={{ color: labelColor }}>
                            Unit {unit.unitNumber}
                          </span>
                          <span className="shrink-0 flex items-center">
                            {isLocked ? <Lock className="w-3 h-3" style={{ color: labelColor }} />
                              : isComplete ? <CheckCircle className="w-4 h-4" style={{ color: "#1D9E75" }} />
                              : <span className="text-[10px] font-extrabold tabular-nums" style={{ color: labelColor }}>{pct}%</span>}
                          </span>
                        </div>
                        <span className="text-[12.5px] font-bold block mt-1 leading-snug line-clamp-2 min-h-[2.4em]" style={{ color: titleColor }}>
                          {unit.title}
                        </span>
                        <div className="mt-2.5 flex items-center gap-2">
                          <div className="h-1.5 flex-1 rounded-full overflow-hidden" style={{ background: track }}>
                            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${pct}%`, background: fill }} />
                          </div>
                          <span className="text-[10px] font-bold tabular-nums" style={{ color: labelColor }}>{done}/{total}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {/* Right fade hint */}
                <div className="pointer-events-none absolute right-0 top-0 bottom-2 w-12"
                  style={{ background: "linear-gradient(to right, transparent, hsl(var(--background)))" }} />
              </div>
            </div>

            {/* #8 Locked-unit preview panel */}
            {previewUnit && (
              <div className="rounded-[20px] bg-card px-6 py-5 mb-4"
                style={{ border: "0.5px solid hsl(45 10% 82%)" }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">
                    Unit {previewUnit.unitNumber}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg border bg-muted text-muted-foreground border-border flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Locked
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg leading-snug tracking-tight">{previewUnit.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {unitSummaryFor(previewUnit.unitNumber, previewUnit.title)}
                </p>
                <p className="text-[13px] font-semibold mt-3 flex items-center gap-1.5" style={{ color: "#C77F12" }}>
                  <Lock className="w-3.5 h-3.5" />
                  Complete Unit {Math.max(1, previewUnit.unitNumber - 1)} first to unlock
                </p>
              </div>
            )}

            {/* AP Micro: unit challenge tie-in (simulator / lab / business mode) */}
            {activeTrack === "ap-micro" && AP_UNIT_CHALLENGES[activeUnitId] && (
              <div className="rounded-[20px] px-5 py-4 mb-4 border" style={{ borderColor: "hsl(45 10% 82%)", background: "rgba(29,158,117,0.06)" }}>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#1D9E75] flex items-center gap-1.5 mb-1">
                  <Target className="w-3.5 h-3.5" /> Apply it — challenge
                </p>
                <p className="text-sm text-foreground/80">{AP_UNIT_CHALLENGES[activeUnitId]}</p>
              </div>
            )}

            {/* 4. Next lesson CTA / Completion banner */}
            {unitIsComplete ? (
              <div className="rounded-[20px] px-6 py-5 flex items-center justify-between"
                style={{ background: "#1D9E75" }}>
                <div>
                  <p className="text-white font-extrabold text-base">
                    Unit complete — {earnedPts.toLocaleString()} earned
                  </p>
                </div>
                {nextUnit && (
                  <Button
                    size="sm"
                    onClick={() => setActiveUnitId(nextUnit.id)}
                    className="bg-white text-foreground hover:bg-white/90 font-bold gap-1.5"
                  >
                    Next Unit <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>
            ) : nextLessonInUnit ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="rounded-[20px] px-6 py-5 flex items-center justify-between gap-4"
                style={{ background: "#2C2C2A", border: "0.5px solid hsl(45 10% 25%)" }}>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-1"
                    style={{ color: "rgba(255,255,255,0.4)" }}>
                    Next lesson · L{nextLessonInUnit.lesson.lessonNumber}
                  </p>
                  <p className="text-white font-bold text-[15px]">
                    {nextLessonInUnit.lesson.title}
                  </p>
                  {/* #4 One-line lesson description */}
                  <p className="text-[13px] mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {lessonDescFor(activeUnit?.unitNumber, nextLessonInUnit.lesson.lessonNumber)}
                  </p>
                  <p className="text-sm font-bold mt-1.5" style={{ color: "#1D9E75" }}>
                    +{Math.round(nextLessonInUnit.lesson.reward * multiplier).toLocaleString()} pts on completion
                  </p>
                </div>
                <Link to={`/lessons/${nextLessonInUnit.lesson.id}`} className="shrink-0">
                  <Button size="sm" className="bg-[#1D9E75] hover:bg-[#1a8f6a] text-white font-bold gap-1.5 press-scale">
                    Start <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </motion.div>
            ) : null}

            {/* Lesson list below chart (condensed) */}
            <div className="mt-4 rounded-[20px] bg-card overflow-hidden"
              style={{ border: "0.5px solid hsl(45 10% 82%)" }}>
              {activeLessons.map((al, idx) => {
                const lesson = al.lesson;
                const completed = al.status === "validated" || !!isLessonCompleted(lesson.id);
                const unlocked = isLessonUnlocked(activeUnitId, lesson.id);
                const isValidated = al.status === "validated";
                const isCurrent = idx === currentLessonIdx;

                if (!unlocked && !completed) {
                  return (
                    <div key={lesson.id}
                      className="flex items-center gap-3 px-5 py-3 opacity-40 border-b last:border-b-0"
                      style={{ borderColor: "hsl(45 10% 92%)" }}>
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 bg-muted/60 text-muted-foreground">
                        <Lock className="w-3 h-3" />
                      </div>
                      <span className="flex-1 text-[13px] font-semibold text-foreground/50 truncate">{lesson.title}</span>
                      <span className="text-xs text-muted-foreground/40 font-bold font-mono">
                        +{Math.round(lesson.reward * multiplier)}
                      </span>
                    </div>
                  );
                }

                return (
                  <Link key={lesson.id} to={`/lessons/${lesson.id}`}
                    className={`flex items-center gap-3 px-5 py-3 transition-colors border-b last:border-b-0 ${
                      isCurrent ? "bg-[#EF9F27]/5" : completed ? "bg-[#1D9E75]/3" : "hover:bg-muted/20"
                    }`}
                    style={{ borderColor: "hsl(45 10% 92%)" }}>
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-bold ${
                      completed ? "bg-[#1D9E75]/10 text-[#1D9E75]" :
                      isCurrent ? "bg-[#EF9F27]/10 text-[#EF9F27]" :
                      "bg-muted/60 text-muted-foreground"
                    }`}>
                      {completed ? <CheckCircle className="w-3.5 h-3.5" /> : `L${idx + 1}`}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[13px] font-semibold text-foreground/80 truncate block">{lesson.title}</span>
                      {isValidated && <span className="text-[10px] text-[#1D9E75] font-bold">Validated by benchmark</span>}
                    </div>
                    <span className={`text-xs font-bold font-mono ${completed ? "text-[#1D9E75]" : "text-muted-foreground"}`}>
                      +{Math.round(lesson.reward * multiplier)}
                    </span>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

/* ════════════════════════════════════════════════
   OVERALL-PROGRESS PIE — one wedge per unit
   The whole pie is grey and pre-cut into per-unit slices (bigger unit = bigger
   slice); each slice fills with its unit colour as those lessons get done.
   ════════════════════════════════════════════════ */
interface PieUnit { id: string; total: number; done: number; color: string }
function polar(cx: number, cy: number, R: number, a: number): [number, number] {
  return [cx + R * Math.sin(a), cy - R * Math.cos(a)];
}
function wedgePath(cx: number, cy: number, R: number, a0: number, a1: number): string {
  if (a1 - a0 <= 0) return "";
  const [x0, y0] = polar(cx, cy, R, a0);
  const [x1, y1] = polar(cx, cy, R, a1);
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M${cx},${cy} L${x0.toFixed(3)},${y0.toFixed(3)} A${R},${R} 0 ${large},1 ${x1.toFixed(3)},${y1.toFixed(3)} Z`;
}
function ProgressPie({ units }: { units: PieUnit[] }) {
  const cx = 50, cy = 50, R = 46;
  const totalLessons = units.reduce((s, u) => s + u.total, 0);
  const slices = units.filter(u => u.total > 0);

  if (totalLessons === 0) {
    return (
      <svg viewBox="0 0 100 100" className="w-full max-w-[170px]">
        <circle cx={cx} cy={cy} r={R} fill="hsl(45 10% 88%)" stroke="#fff" strokeWidth={2} />
      </svg>
    );
  }

  let a = 0;
  const segs = slices.map((u) => {
    const span = (u.total / totalLessons) * 2 * Math.PI;
    const seg = { ...u, a0: a, a1: a + span, fillA1: a + span * (u.done / u.total) };
    a += span;
    return seg;
  });

  return (
    <svg viewBox="0 0 100 100" className="w-full max-w-[170px]">
      {/* Grey base wedge per unit */}
      {segs.map((s) => <path key={`g${s.id}`} d={wedgePath(cx, cy, R, s.a0, s.a1)} fill="hsl(45 10% 88%)" />)}
      {/* Completed colour fill per unit */}
      {segs.map((s) => (s.fillA1 > s.a0 ? <path key={`c${s.id}`} d={wedgePath(cx, cy, R, s.a0, s.fillA1)} fill={s.color} /> : null))}
      {/* White separators between units */}
      {segs.map((s) => {
        const [x, y] = polar(cx, cy, R, s.a0);
        return <line key={`s${s.id}`} x1={cx} y1={cy} x2={x.toFixed(3)} y2={y.toFixed(3)} stroke="#fff" strokeWidth={1.5} />;
      })}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#fff" strokeWidth={2} />
    </svg>
  );
}

/* ════════════════════════════════════════════════
   #2 CIRCULAR PROGRESS RING
   ════════════════════════════════════════════════ */
function ProgressRing({ completed, total, pct }: { completed: number; total: number; pct: number }) {
  const R = 52;
  const C = 2 * Math.PI * R;
  const dash = (C * pct) / 100;
  return (
    <div className="relative shrink-0" style={{ width: 120, height: 120 }}>
      <svg width={120} height={120} viewBox="0 0 120 120">
        <circle cx={60} cy={60} r={R} fill="none" stroke="hsl(45 10% 90%)" strokeWidth={10} />
        <circle cx={60} cy={60} r={R} fill="none" stroke="#1a5c41" strokeWidth={10} strokeLinecap="round"
          strokeDasharray={`${dash} ${C}`} transform="rotate(-90 60 60)"
          style={{ transition: "stroke-dasharray 0.5s ease" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-extrabold text-foreground leading-none">{completed} of {total}</span>
        <span className="text-[10px] text-muted-foreground mt-1">lessons done</span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   CHART SVG COMPONENT
   ════════════════════════════════════════════════ */
interface ChartSVGProps {
  lessons: AdaptiveLessonInfo[];
  currentIdx: number;
  multiplier: number;
  unitTotalPts: number;
}

function ChartSVG({ lessons: lessonList, currentIdx, multiplier, unitTotalPts }: ChartSVGProps) {
  const total = lessonList.length;
  if (total === 0) return <div className="h-32" />;

  const W = 600;
  const H = 200;
  const padL = 20;
  const padR = 40;
  const padT = 35;
  const padB = 15;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const xStep = total > 1 ? chartW / (total - 1) : chartW;
  const yStep = total > 1 ? chartH / (total - 1) : chartH;

  const getPoint = (i: number) => ({
    x: padL + i * xStep,
    y: padT + chartH - i * yStep,
  });

  // Grid lines (4 horizontal)
  const gridLines = [0.25, 0.5, 0.75].map(f => padT + chartH * (1 - f));

  // Points
  const points = Array.from({ length: total }, (_, i) => getPoint(i));

  // Completed line path
  const completedPts = points.slice(0, Math.min(currentIdx + 1, total));
  const completedPath = completedPts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');

  // Fill area under completed
  const fillPath = completedPts.length >= 2
    ? `${completedPath} L${completedPts[completedPts.length - 1].x},${padT + chartH} L${completedPts[0].x},${padT + chartH} Z`
    : "";

  // Dashed remaining path
  const remainingPts = points.slice(Math.max(currentIdx, 0));
  const dashedPath = remainingPts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');

  // Current point
  const currentPoint = currentIdx < total ? points[currentIdx] : null;
  const lastPoint = points[total - 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ display: "block" }}>
      {/* Grid lines */}
      {gridLines.map((y, i) => (
        <line key={i} x1={padL} y1={y} x2={W - padR} y2={y}
          stroke="hsl(45 10% 93%)" strokeWidth="1" />
      ))}

      {/* Vertical dashed line from current dot to x-axis */}
      {currentPoint && currentIdx < total && (
        <line
          x1={currentPoint.x} y1={currentPoint.y}
          x2={currentPoint.x} y2={padT + chartH}
          stroke="#EF9F27" strokeWidth="1" strokeDasharray="3 3" opacity="0.4"
        />
      )}

      {/* Green fill area */}
      {fillPath && (
        <path d={fillPath} fill="url(#greenGrad)" />
      )}

      {/* Completed green line */}
      {completedPts.length >= 2 && (
        <path d={completedPath} fill="none" stroke="#1D9E75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      )}

      {/* Dashed gray remaining */}
      {remainingPts.length >= 2 && (
        <path d={dashedPath} fill="none" stroke="hsl(215 12% 76%)" strokeWidth="1.5" strokeDasharray="6 4" strokeLinecap="round" />
      )}

      {/* Completed dots */}
      {points.slice(0, currentIdx).map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="#1D9E75" />
      ))}

      {/* Current dot with pulse */}
      {currentPoint && currentIdx < total && (
        <g>
          <circle cx={currentPoint.x} cy={currentPoint.y} r="8" fill="#EF9F27" opacity="0.15"
            style={{ animation: "chartPulse 1.5s ease-out infinite", transformOrigin: `${currentPoint.x}px ${currentPoint.y}px` }} />
          <circle cx={currentPoint.x} cy={currentPoint.y} r="5" fill="#EF9F27" />
          <circle cx={currentPoint.x} cy={currentPoint.y} r="2" fill="white" />
          {/* "you are here" pill */}
          <rect x={currentPoint.x - 30} y={currentPoint.y - 22} width="60" height="16" rx="8"
            fill="#EF9F27" opacity="0.9" />
          <text x={currentPoint.x} y={currentPoint.y - 11} textAnchor="middle"
            fill="white" fontSize="7" fontWeight="700" fontFamily="inherit">
            you are here
          </text>
        </g>
      )}

      {/* Locked dots */}
      {points.slice(currentIdx + 1).map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="hsl(215 12% 76%)" />
      ))}

      {/* End pill with total pts */}
      <rect x={lastPoint.x - 2} y={lastPoint.y - 20} width="48" height="16" rx="8"
        fill="#2C2C2A" />
      <text x={lastPoint.x + 22} y={lastPoint.y - 9} textAnchor="middle"
        fill="white" fontSize="7" fontWeight="700" fontFamily="inherit">
        +{unitTotalPts.toLocaleString()}
      </text>

      {/* Gradient definition */}
      <defs>
        <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1D9E75" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#1D9E75" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
