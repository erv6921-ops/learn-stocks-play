import React, { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { supabase } from "@/integrations/supabase/client";
import { lessons, unitInfo, getUnitRewardTotal, getLessonsByUnit } from "@/data/lessons";
import { getUnitTestByCategory } from "@/data/unitTestQuestions";
import { AP_UNIT_CHALLENGES } from "@/data/apMicro";
import { getAdaptiveCurriculum, AdaptiveLessonInfo } from "@/lib/curriculumEngine";
import {
  getStreak, getBestStreak, getCurriculumLevel, getTotalEarned, getCoinsThisWeek,
} from "@/lib/playerStats";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import GameNav from "@/components/GameNav";
import FullScreenCoaster from "@/components/FullScreenCoaster";
import {
  ArrowRight, Lock, CheckCircle, Coins, Flame, Star, Trophy,
  Award, Footprints, Zap, Crown, LineChart, Coins as CoinsIcon,
  GraduationCap, Target, BookOpen, Medal, Rocket, Compass, Shield, Sparkles, Gem,
  Maximize2, Minimize2,
} from "lucide-react";
import { LessonCategory, CourseTrack, EnrollmentTrack } from "@/types";
import APModeToggle from "@/components/APModeToggle";
import APModeSections from "@/components/APModeSections";
import GulliverBizLab from "@/components/bizlab/GulliverBizLab";
import { JeffChatAvatar } from "@/components/lessons/JeffChat";
import { JeffMascot } from "@/components/Jeff/JeffMascot";
import { anchor } from "@/lib/tourAnchors";
import MissionsWorldMap, { UnitMeta } from "@/components/MissionsWorldMap";

// ── #4 Next-lesson one-line descriptions, keyed L<unit>.<lesson> ──
const lessonDescriptions: Record<string, string> = {
  "L1.1": "Why our brains make terrible money decisions",
  "L1.2": "How waiting pays off - literally",
  "L1.3": "The trap of wanting what others have",
  "L1.4": "Why you spend more than you think",
  "L2.1": "What your time is actually worth per hour",
  "L2.2": "Salary vs. hourly - which is really better?",
  "L2.3": "How taxes shrink your paycheck",
  "L2.4": "Side hustles that actually make money",
  "L3.1": "Build a budget that doesn't feel like a punishment",
  "L3.2": "The 50/30/20 rule explained",
  "L3.3": "Needs vs. wants - drawing the line",
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
  6: "Understand taxes - what you owe, why, and how to keep more of what you earn.",
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

  // Persisted enrollment track (profiles.track). `bizLabEnrolled` gates the
  // Biz Lab tab + content; `hidesApElective` gates the AP elective (hidden for
  // both Biz Lab and Gulliver Intro). If a stale view-state track was stored,
  // fall back to the regular course.
  const enrollmentTrack: EnrollmentTrack = user?.track ?? "regular";
  const bizLabEnrolled = enrollmentTrack === "biz_lab";
  const hidesApElective = enrollmentTrack === "biz_lab" || enrollmentTrack === "gulliver_intro";
  useEffect(() => {
    if (hidesApElective && activeTrack === "ap-micro") setActiveTrack("florida");
    if (!bizLabEnrolled && activeTrack === "gulliver-biz-lab") setActiveTrack("florida");
  }, [hidesApElective, bizLabEnrolled, activeTrack]);

  // Biz Lab / Gulliver Intro students get the original Regular Course format
  // (roller coaster, badges, etc.) - never the AP Mode layout, even if AP Mode
  // was toggled on before enrolling and is still stored in localStorage.
  const effectiveApMode = apMode && !hidesApElective;
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

  // Prerequisite gating - scoped to the units of the active track.
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

  // Center the active chip within its own horizontal strip - scroll only the
  // strip container (not the page), so entering the tab never jumps vertically.
  useEffect(() => {
    const container = stripRef.current;
    if (!container) return;
    const el = container.querySelector(`[data-unit="${activeUnitId}"]`) as HTMLElement | null;
    if (!el) return;
    const cRect = container.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    const left = container.scrollLeft + (eRect.left - cRect.left) - (container.clientWidth - el.clientWidth) / 2;
    container.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
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

  // ── #5 Badges (derived from milestones; no badges table exists) ──
  const stocksVisits = useMemo(() => {
    try { return parseInt(localStorage.getItem('investiplay_stocks_visits') || '0', 10) || 0; } catch { return 0; }
  }, []);
  const unitsDone = unitScores.filter(u => u.total > 0 && u.done >= u.total).length;
  const badges = useMemo(() => [
    { id: 'first-step',     name: 'First Step',     Icon: Footprints,    earned: completedLessonsAll >= 1 },
    { id: 'getting-going',  name: 'Getting Going',  Icon: BookOpen,      earned: completedLessonsAll >= 10 },
    { id: 'scholar',        name: 'Scholar',        Icon: GraduationCap, earned: completedLessonsAll >= 25 },
    { id: 'centurion',      name: 'Centurion',      Icon: Medal,         earned: completedLessonsAll >= 100 },
    { id: 'on-a-roll',      name: 'On a Roll',      Icon: Flame,         earned: bestStreak >= 3 },
    { id: 'week-warrior',   name: 'Week Warrior',   Icon: Zap,           earned: bestStreak >= 7 },
    { id: 'unstoppable',    name: 'Unstoppable',    Icon: Rocket,        earned: bestStreak >= 30 },
    { id: 'unit-master',    name: 'Unit Master',    Icon: Crown,         earned: anyUnitComplete },
    { id: 'trailblazer',    name: 'Trailblazer',    Icon: Compass,       earned: unitsDone >= 3 },
    { id: 'graduate',       name: 'Graduate',       Icon: Shield,        earned: unitsDone >= 5 },
    { id: 'rising-star',    name: 'Rising Star',    Icon: Sparkles,      earned: level >= 5 },
    { id: 'maxed-out',      name: 'Maxed Out',      Icon: Star,          earned: level >= 10 },
    { id: 'market-watcher', name: 'Market Watcher', Icon: LineChart,     earned: stocksVisits >= 5 },
    { id: 'coin-collector', name: 'Coin Collector', Icon: CoinsIcon,     earned: totalEarned >= 500 },
    { id: 'big-earner',     name: 'Big Earner',     Icon: Gem,           earned: totalEarned >= 10000 },
  ], [completedLessonsAll, bestStreak, anyUnitComplete, unitsDone, level, stocksVisits, totalEarned]);
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
      } catch { /* leaderboard unavailable - leave rank hidden */ }
    })();
    return () => { active = false; };
  }, [lessonProgress]);

  // ── #8 Locked-unit preview panel state ──
  const [previewUnitId, setPreviewUnitId] = useState<string | null>(null);
  const previewUnit = previewUnitId ? unitInfo.find(u => u.id === previewUnitId) : null;

  // Fullscreen roller-coaster overlay (mini-coaster journey variant).
  const [coasterFull, setCoasterFull] = useState(false);

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

  // ── World-map missions: one bank per unit, in track order ──
  const worldUnitsMeta: UnitMeta[] = useMemo(() => trackUnits.map(unit => {
    const adaptive = adaptiveCurriculum.get(unit.id);
    const uLessons = adaptive?.lessons ?? [];
    const done = uLessons.filter(l => l.status === "validated" || isLessonCompleted(l.lesson.id)).length;
    const total = uLessons.length;
    return { unit, done, total, complete: total > 0 && done >= total, unlocked: unlockedUnits.has(unit.id) };
  }), [trackUnits, adaptiveCurriculum, unlockedUnits, isLessonCompleted]);

  const worldRewardTotals = useMemo(() => {
    const r: Record<string, number> = {};
    for (const unit of trackUnits) r[unit.id] = Math.round(getUnitRewardTotal(unit.id) * multiplier);
    return r;
  }, [trackUnits, multiplier]);

  // Clicking a bank drops you into that unit's next unfinished lesson.
  const openUnit = useCallback((unitId: string) => {
    const adaptive = adaptiveCurriculum.get(unitId);
    const uLessons = adaptive?.lessons ?? [];
    const next = uLessons.find(al =>
      al.status === "required" && !isLessonCompleted(al.lesson.id) && isLessonUnlocked(unitId, al.lesson.id));
    const target = next?.lesson.id ?? uLessons[0]?.lesson.id;
    if (target) navigate(`/lessons/${target}`);
  }, [adaptiveCurriculum, isLessonCompleted, unlockedUnits, navigate]); // eslint-disable-line react-hooks/exhaustive-deps

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

  // The immersive world map is the default Missions view. Biz Lab and AP Mode
  // keep their own (container) layouts.
  const trackTabs: { key: CourseTrack; label: string }[] = bizLabEnrolled
    ? [
        { key: "florida", label: "Course" },
        { key: "gulliver-biz-lab", label: "Biz Lab" },
      ]
    : hidesApElective
    // Gulliver Intro: no AP elective and no Biz Lab tab - just the course.
    ? [{ key: "florida", label: "Course" }]
    : [
        { key: "florida", label: "Personal Finance" },
        { key: "ap-micro", label: "AP Micro" },
      ];
  const isMapView = activeTrack !== "gulliver-biz-lab" && !(effectiveApMode && activeTrack === "florida");

  // Live station + stats data shared by the small coaster and the fullscreen one.
  const coasterStations = activeLessons.map(al => ({
    id: al.lesson.id,
    title: al.lesson.title,
    done: al.status === "validated" || !!isLessonCompleted(al.lesson.id),
    unlocked: isLessonUnlocked(activeUnitId, al.lesson.id),
  }));
  const coasterOverlay = coasterFull && (
    <div className="fixed inset-0 z-[60] bg-background">
      <FullScreenCoaster
        unitNumber={activeUnit?.unitNumber}
        unitTitle={activeUnit?.title ?? "Your ride"}
        unitReward={Math.round(unitTotalPts * multiplier)}
        stations={coasterStations}
        currentIdx={currentLessonIdx}
        stats={{ streak, points: jeffsBalance, level }}
        onSelectStation={(s) => navigate(`/lessons/${s.id}`)}
      />
      {/* Exit-fullscreen button, top-left */}
      <button
        onClick={() => setCoasterFull(false)}
        className="absolute top-4 left-4 z-[61] inline-flex items-center gap-1.5 rounded-full pl-2.5 pr-3.5 py-2 text-[13px] font-bold text-[#0d3524] shadow-lg transition-transform active:scale-95"
        style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.9)" }}
      >
        <Minimize2 className="w-4 h-4" /> Exit fullscreen
      </button>
    </div>
  );

  // Mini-coaster journey is the default Missions experience: the original card
  // layout + a Fullscreen button that opens the big roller coaster. Only the
  // VITE_COASTER_TAB comparison build (big coaster as the whole tab) opts out.
  const coasterMini = !import.meta.env.VITE_COASTER_TAB;

  if (isMapView && !coasterMini) {
    return (
      <div className="fixed inset-0 flex flex-col bg-background">
        <GameNav />
        <div className="relative flex-1 overflow-hidden">
          {import.meta.env.VITE_COASTER_TAB ? (
            <FullScreenCoaster
              embedded
              unitNumber={activeUnit?.unitNumber}
              unitTitle={activeUnit?.title ?? "Your ride"}
              unitReward={Math.round(unitTotalPts * multiplier)}
              stations={activeLessons.map(al => ({
                id: al.lesson.id,
                title: al.lesson.title,
                done: al.status === "validated" || !!isLessonCompleted(al.lesson.id),
                unlocked: isLessonUnlocked(activeUnitId, al.lesson.id),
              }))}
              currentIdx={currentLessonIdx}
              stats={{ streak, points: jeffsBalance, level }}
              onSelectStation={(s) => navigate(`/lessons/${s.id}`)}
            />
          ) : (
          <MissionsWorldMap
            unitsMeta={worldUnitsMeta}
            activeUnitId={activeUnitId}
            onOpenUnit={openUnit}
            rewardTotals={worldRewardTotals}
          />
          )}
          {/* Floating track switcher (keeps AP Micro / Biz Lab reachable). */}
          <div className="absolute top-3 right-3 md:top-4 md:right-4 z-20 inline-flex items-center rounded-full bg-white/90 backdrop-blur p-1 border border-black/5 shadow-md">
            {trackTabs.map(tb => (
              <button
                key={tb.key}
                onClick={() => setActiveTrack(tb.key)}
                className={`px-3 py-1 rounded-full text-[12px] font-bold transition-all ${activeTrack === tb.key ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                {tb.label}
              </button>
            ))}
            {activeTrack === "florida" && !hidesApElective && (
              <button
                onClick={() => setApMode(true)}
                className="px-3 py-1 rounded-full text-[12px] font-bold text-muted-foreground hover:text-foreground transition-all"
                title="Switch to AP business list view"
              >
                AP Mode
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <GameNav />

      <main className="container mx-auto px-4 md:px-6 py-6 max-w-7xl">
        {/* Course track switcher (left) + Fullscreen button (right), one row.
            Biz Lab students see only Regular Course + Gulliver Biz Lab;
            everyone else keeps the AP Micro elective tab. */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="inline-flex items-center rounded-full bg-muted/60 p-1 border border-border/40">
            {((bizLabEnrolled
              ? [
                  { key: "florida", label: "Regular Course" },
                  { key: "gulliver-biz-lab", label: "Gulliver Biz Lab" },
                ]
              : hidesApElective
              // Gulliver Intro: no AP elective and no Biz Lab tab.
              ? [{ key: "florida", label: "Regular Course" }]
              : [
                  { key: "florida", label: "Personal Finance" },
                  { key: "ap-micro", label: "AP Microeconomics" },
                ]) as { key: CourseTrack; label: string }[]
            ).map(t => (
              <button
                key={t.key}
                onClick={() => setActiveTrack(t.key)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${activeTrack === t.key ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                {t.label}
              </button>
            ))}
          </div>
          {coasterMini && isMapView && (
            <button
              onClick={() => setCoasterFull(true)}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-full pl-2.5 pr-3.5 py-2 text-[13px] font-bold text-white shadow-md transition-transform active:scale-95"
              style={{ background: "linear-gradient(135deg,var(--brand-bright),var(--brand-strong))", boxShadow: "0 6px 16px rgba(var(--brand-rgb),0.35)" }}
            >
              <Maximize2 className="w-4 h-4" /> Fullscreen
            </button>
          )}
        </div>

        {/* AP Mode Toggle (business AP tracks - Florida only). Hidden for Biz
            Lab and Gulliver Intro students, who don't get the AP elective. */}
        {activeTrack === "florida" && !hidesApElective && (
          <div className="mb-5">
            <APModeToggle apMode={apMode} onToggle={setApMode} />
          </div>
        )}

        {/* AP Micro elective banner */}
        {activeTrack === "ap-micro" && (
          <div className="rounded-2xl p-4 mb-5 text-white" style={{ background: "linear-gradient(135deg,hsl(var(--primary)),var(--brand))" }}>
            <p className="text-sm font-bold flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-gold" /> AP Microeconomics - College Board aligned
            </p>
            <p className="text-white/60 text-xs mt-0.5">An elective track. Your required curriculum and level are unaffected.</p>
          </div>
        )}

        {activeTrack === "gulliver-biz-lab" ? <GulliverBizLab /> : effectiveApMode && activeTrack === "florida" ? renderAPMode() : coasterMini ? null : (
          <MissionsWorldMap
            unitsMeta={worldUnitsMeta}
            activeUnitId={activeUnitId}
            onOpenUnit={openUnit}
            rewardTotals={worldRewardTotals}
          />
        )}
        {coasterMini && isMapView && (
          <>
            {/* 2. Progress card - circular ring hero + chart */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-[20px] bg-card overflow-hidden mb-4"
              style={{ border: "0.5px solid hsl(45 10% 82%)" }}>
              {/* Slim header - the coaster is the hero; key stats sit beside it */}
              <div className="px-5 pt-4 pb-1 flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.12em] truncate">
                    {activeUnit ? `Unit ${activeUnit.unitNumber} · Your ride` : "Your ride"}
                  </p>
                  <p className="font-display font-extrabold text-foreground tracking-tight leading-tight mt-0.5 text-lg truncate">
                    {activeUnit?.title ?? "-"}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-foreground tracking-tight" style={{ fontSize: 15, fontWeight: 600 }}>
                    {completedCount} of {totalLessons} done
                  </p>
                  <div className="flex items-center justify-end gap-2 mt-1">
                    <span className="text-sm font-bold" style={{ color: "var(--brand)" }}>
                      {earnedPts.toLocaleString()} pts
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(var(--brand-rgb),0.1)", color: "var(--brand)" }}>
                      ▲ {pctComplete}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Roller-coaster ride - Jeff travels through this unit's lessons.
                  Each station is a lesson: ridden track is solid green, the track
                  ahead is dashed, and tapping a station jumps to that lesson. */}
              <div className="px-2 sm:px-4 pt-1 pb-5">
                <CoasterTrack
                  lessons={activeLessons}
                  currentIdx={currentLessonIdx}
                  unitTotalPts={Math.round(unitTotalPts * multiplier)}
                  isUnlocked={(id) => isLessonUnlocked(activeUnitId, id)}
                  isCompleted={(al) => al.status === "validated" || !!isLessonCompleted(al.lesson.id)}
                  onSelect={(id) => navigate(`/lessons/${id}`)}
                  celebrate={unitIsComplete}
                />
                {/* Overall track progress (replaces the old pie) */}
                <div className="mt-2 flex items-center justify-center gap-2 flex-wrap text-center">
                  <span className="text-sm font-extrabold" style={{ color: "var(--brand)" }}>{trackPct}% of all units complete</span>
                  <span className="text-muted-foreground text-xs">·</span>
                  <span className="text-sm font-bold text-foreground">
                    {lessonsLeft} {lessonsLeft === 1 ? "lesson" : "lessons"} to the finish line
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Two-column desktop layout: journey (left) + goals & trophies (right) */}
            <div className="grid lg:grid-cols-3 gap-5 items-start">
            <div className="lg:col-span-2 space-y-4 min-w-0">

            {/* 3. Unit strip - scrollable "mission" tabs */}
            <div>
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
                    const labelColor = isActive ? "rgba(255,255,255,0.55)" : isComplete ? "var(--brand)" : "hsl(215 12% 52%)";
                    const titleColor = isActive ? "#fff" : isComplete ? "hsl(var(--primary))" : "hsl(215 12% 28%)";
                    const fill = isActive ? "#EF9F27" : "var(--brand)";
                    const track = isActive ? "rgba(255,255,255,0.16)" : isComplete ? "rgba(var(--brand-rgb),0.18)" : "hsl(45 10% 84%)";

                    return (
                      <button
                        key={unit.id}
                        data-unit={unit.id}
                        ref={anchor("lesson-node")}
                        onClick={() => handleUnitTabClick(unit.id)}
                        className="shrink-0 rounded-2xl p-3 text-left transition-all duration-200 w-[160px] press-scale hover:-translate-y-0.5"
                        style={{
                          background: isActive ? "#2C2C2A" : isComplete ? "rgba(var(--brand-rgb),0.1)" : "hsl(45 10% 93%)",
                          opacity: isLocked ? 0.55 : 1,
                          boxShadow: isActive ? "0 8px 20px rgba(44,44,42,0.22)" : "none",
                          border: isActive ? "1px solid #2C2C2A" : isComplete ? "1px solid rgba(var(--brand-rgb),0.22)" : "1px solid hsl(45 10% 86%)",
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-bold uppercase tracking-[0.14em]" style={{ color: labelColor }}>
                            Unit {unit.unitNumber}
                          </span>
                          <span className="shrink-0 flex items-center">
                            {isLocked ? <Lock className="w-3 h-3" style={{ color: labelColor }} />
                              : isComplete ? <CheckCircle className="w-4 h-4" style={{ color: "var(--brand)" }} />
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
              <div className="rounded-[20px] bg-card px-6 py-5"
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

            {/* 4. Next lesson CTA / Completion banner */}
            {unitIsComplete ? (
              <div className="rounded-[20px] px-6 py-5 flex items-center justify-between"
                style={{ background: "var(--brand)" }}>
                <div>
                  <p className="text-white font-extrabold text-base">
                    Unit complete - {earnedPts.toLocaleString()} earned
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
                </div>
                <Link to={`/lessons/${nextLessonInUnit.lesson.id}`} className="shrink-0">
                  <Button size="sm" className="bg-[var(--brand)] hover:bg-[var(--brand-strong)] text-white font-bold gap-1.5 press-scale">
                    Start <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </motion.div>
            ) : null}

            {/* Lesson cards - same card language as the unit tabs, one per lesson */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                  {activeUnit ? `Unit ${activeUnit.unitNumber} lessons` : "Lessons"}
                </p>
                <span className="text-[11px] font-semibold text-muted-foreground">{completedCount}/{totalLessons} done</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {activeLessons.map((al, idx) => {
                  const lesson = al.lesson;
                  const completed = al.status === "validated" || !!isLessonCompleted(lesson.id);
                  const unlocked = isLessonUnlocked(activeUnitId, lesson.id);
                  const isValidated = al.status === "validated";
                  const isCurrent = idx === currentLessonIdx && !completed;
                  const locked = !unlocked && !completed;

                  // Same palette as the unit tabs: charcoal current, light-green
                  // complete, warm-grey default; gold/green accents.
                  const labelColor = isCurrent ? "rgba(255,255,255,0.55)" : completed ? "var(--brand)" : "hsl(215 12% 52%)";
                  const titleColor = isCurrent ? "#fff" : completed ? "hsl(var(--primary))" : "hsl(215 12% 28%)";

                  const card = (
                    <div
                      className={`rounded-2xl p-3 text-left transition-all duration-200 h-full ${locked ? "" : "press-scale hover:-translate-y-0.5"}`}
                      style={{
                        background: isCurrent ? "#2C2C2A" : completed ? "rgba(var(--brand-rgb),0.1)" : "hsl(45 10% 93%)",
                        opacity: locked ? 0.55 : 1,
                        boxShadow: isCurrent ? "0 8px 20px rgba(44,44,42,0.22)" : "none",
                        border: isCurrent ? "1px solid #2C2C2A" : completed ? "1px solid rgba(var(--brand-rgb),0.22)" : "1px solid hsl(45 10% 86%)",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold uppercase tracking-[0.14em]" style={{ color: labelColor }}>
                          Lesson {idx + 1}
                        </span>
                        <span className="shrink-0 flex items-center">
                          {locked ? <Lock className="w-3 h-3" style={{ color: labelColor }} />
                            : completed ? <CheckCircle className="w-4 h-4" style={{ color: "var(--brand)" }} />
                            : isCurrent ? <span className="text-[9px] font-extrabold uppercase tracking-wider" style={{ color: "#EF9F27" }}>Up next</span>
                            : null}
                        </span>
                      </div>
                      <span className="text-[12.5px] font-bold block mt-1 leading-snug line-clamp-2 min-h-[2.4em]" style={{ color: titleColor }}>
                        {lesson.title}
                      </span>
                      <div className="mt-2.5 flex items-center justify-end gap-2">
                        {!completed && !locked && (
                          <span title="Chat with Jeff" className="shrink-0 inline-flex"><JeffChatAvatar size={16} /></span>
                        )}
                        {isValidated && <span className="text-[9px] font-bold" style={{ color: "var(--brand)" }}>Validated</span>}
                      </div>
                    </div>
                  );

                  return locked ? (
                    <div key={lesson.id}>{card}</div>
                  ) : (
                    <Link key={lesson.id} to={`/lessons/${lesson.id}`} className="block h-full">{card}</Link>
                  );
                })}
              </div>
            </div>

            </div>{/* /left column */}

            {/* ── Right sidebar: goals & trophies ── */}
            <div className="space-y-4 min-w-0">

            {/* AP Micro: unit challenge tie-in (simulator / lab / business mode) */}
            {activeTrack === "ap-micro" && AP_UNIT_CHALLENGES[activeUnitId] && (
              <div className="rounded-[20px] px-5 py-4 border" style={{ borderColor: "hsl(45 10% 82%)", background: "rgba(var(--brand-rgb),0.06)" }}>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand)] flex items-center gap-1.5 mb-1">
                  <Target className="w-3.5 h-3.5" /> Apply it - challenge
                </p>
                <p className="text-sm text-foreground/80">{AP_UNIT_CHALLENGES[activeUnitId]}</p>
              </div>
            )}

            {/* Unit Test CTA - shown for categories that have authored test
                data; unlocks once every lesson in the unit is done. (The
                /unit-test route previously had no inbound link anywhere.) */}
            {(() => {
              const testCategory = activeUnit?.categories.find(c => getUnitTestByCategory(c));
              if (!testCategory) return null;
              const test = getUnitTestByCategory(testCategory)!;
              const allDone = activeLessons.length > 0 && activeLessons.every(
                al => al.status === "validated" || !!isLessonCompleted(al.lesson.id)
              );
              const passed = !!unitTestPassed(testCategory);
              return (
                <div className={`rounded-[20px] bg-card p-4 flex items-center gap-3 ${!allDone && !passed ? "opacity-60" : ""}`}
                  style={{ border: passed ? "1.5px solid var(--brand)" : "0.5px solid hsl(45 10% 82%)" }}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${passed ? "bg-[rgba(var(--brand-rgb),0.1)] text-[var(--brand)]" : "bg-[#EF9F27]/10 text-[#EF9F27]"}`}>
                    {passed ? <CheckCircle className="w-4.5 h-4.5" /> : <Trophy className="w-4.5 h-4.5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold">Unit Test</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {passed
                        ? "Passed - nice work!"
                        : allDone
                          ? `${test.questions.length} questions · score ${test.passingScore}%+ to earn ${Math.round(test.reward * multiplier)} coins`
                          : "Finish every lesson in this unit to unlock"}
                    </p>
                  </div>
                  {passed ? (
                    <Link to={`/unit-test/${testCategory}`} className="shrink-0">
                      <Button size="sm" variant="outline" className="press-scale">Retake</Button>
                    </Link>
                  ) : allDone ? (
                    <Link to={`/unit-test/${testCategory}`} className="shrink-0">
                      <Button size="sm" className="bg-[#EF9F27] hover:bg-[#df8f1a] text-white font-bold press-scale">
                        Take the test
                      </Button>
                    </Link>
                  ) : (
                    <Lock className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                </div>
              );
            })()}

            {/* #5 Badges - trophy cabinet */}
            <div className="rounded-[20px] bg-card px-5 py-4"
              style={{ border: "0.5px solid hsl(45 10% 82%)" }}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-display text-sm font-bold flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-gold" /> Your badges
                </h2>
                <span className="text-[11px] font-semibold text-muted-foreground">{earnedBadgeCount} earned</span>
              </div>
              {statsReady ? (
                <div className="grid grid-cols-3 gap-x-2 gap-y-4">
                  {badges.map(b => (
                    <div key={b.id} className="flex flex-col items-center gap-1.5 text-center">
                      <div className={`relative w-12 h-12 rounded-full flex items-center justify-center ${b.earned ? "" : "grayscale opacity-50"}`}
                        style={{ background: b.earned ? "linear-gradient(135deg,var(--brand),hsl(var(--primary)))" : "hsl(45 10% 88%)" }}>
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
                <div className="grid grid-cols-3 gap-3">
                  {[0, 1, 2, 3, 4, 5].map(i => <div key={i} className="w-12 h-12 mx-auto rounded-full animate-pulse bg-muted" />)}
                </div>
              )}
            </div>

            </div>{/* /sidebar */}
            </div>{/* /two-column grid */}
          </>
        )}
      </main>
      {coasterOverlay}
    </div>
  );
}

/* ════════════════════════════════════════════════
   INTERACTIVE ROLLER-COASTER PROGRESS TRACK
   Jeff rides a cart through the active unit's lessons. The track he's already
   ridden is solid green; the track ahead is dashed. Every station is a lesson -
   tap one to jump straight to it. Horizontally scrollable for long units.
   ════════════════════════════════════════════════ */
// Jeff's coaster chatter - one line rotates in based on the current station.
const JEFF_DIALOGUE = [
  "Next stop: new skills! 🎢",
  "You're on a roll - keep going!",
  "Climbing higher every lesson 📈",
  "Coins ahead… let's grab 'em! 🪙",
  "Smooth ride so far, nice work!",
  "Hop in, let's learn something!",
  "Almost at the top - hang on!",
  "Big brain energy, let's go! 🧠",
];

// Dense Catmull-Rom samples through the station points. Used to draw real
// coaster rails + cross-ties that hug the exact curve the cart rides.
function sampleSpline(pts: { x: number; y: number }[], perSeg: number) {
  if (pts.length < 2) return pts.slice();
  const out: { x: number; y: number }[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    for (let s = 0; s < perSeg; s++) {
      const t = s / perSeg, t2 = t * t, t3 = t2 * t;
      out.push({
        x: 0.5 * (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y: 0.5 * (2 * p1.y + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
      });
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}

interface CoasterTrackProps {
  lessons: AdaptiveLessonInfo[];
  currentIdx: number;
  unitTotalPts: number;
  isUnlocked: (lessonId: string) => boolean;
  isCompleted: (al: AdaptiveLessonInfo) => boolean;
  onSelect: (lessonId: string) => void;
  celebrate: boolean;
}

export function CoasterTrack({ lessons, currentIdx, unitTotalPts, isUnlocked, isCompleted, onSelect, celebrate }: CoasterTrackProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const n = lessons.length;

  // Geometry in viewBox units, then rendered at a fixed pixel height so Jeff's
  // cart never clips regardless of how many stations there are. Generous edge
  // padding keeps his speech bubble on-screen even at the first/last station.
  const padL = 84, padR = 84, sx = 122;
  const W = Math.max(560, padL + padR + Math.max(0, n - 1) * sx);
  const H = 240;
  const groundY = 214;
  const my = 124, amp = 52;
  const HPX = 360;
  const scale = HPX / H;
  const WPX = W * scale;

  const pointAt = (i: number) => {
    const x = n > 1 ? padL + i * ((W - padL - padR) / (n - 1)) : W / 2;
    const trend = n > 1 ? (my + 30) - (i / (n - 1)) * 60 : my;
    const hill = -amp * Math.sin(i * 1.15 + 0.5);
    // Min y of 86 leaves headroom above the tallest hill for cart + bubble.
    const y = Math.max(86, Math.min(186, trend + hill));
    return { x, y };
  };
  const pts = Array.from({ length: Math.max(n, 1) }, (_, i) => pointAt(i));
  const jeffIdx = Math.min(currentIdx, n - 1);
  const jeff = pts[Math.max(jeffIdx, 0)];
  const dialogue = celebrate
    ? "Woohoo - unit complete! 🎉"
    : currentIdx <= 0
      ? "All aboard! Tap to start 🎢"
      : JEFF_DIALOGUE[Math.max(jeffIdx, 0) % JEFF_DIALOGUE.length];

  // Smooth curve through a slice of points (Catmull-Rom → cubic bezier).
  const smooth = (slice: { x: number; y: number }[]) => {
    if (slice.length < 2) return "";
    let d = `M${slice[0].x},${slice[0].y}`;
    for (let i = 0; i < slice.length - 1; i++) {
      const p0 = slice[i - 1] || slice[i];
      const p1 = slice[i];
      const p2 = slice[i + 1];
      const p3 = slice[i + 2] || p2;
      const c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
    }
    return d;
  };

  const remainSlice = pts.slice(Math.max(currentIdx, 0));
  const remainPath = smooth(remainSlice);

  // Dense samples → twin rails + cross-ties that follow the curve exactly.
  const perSeg = 14;
  const dense = sampleSpline(pts, perSeg);
  const normals = dense.map((p, i) => {
    const a = dense[Math.max(0, i - 1)], b = dense[Math.min(dense.length - 1, i + 1)];
    const tx = b.x - a.x, ty = b.y - a.y, len = Math.hypot(tx, ty) || 1;
    return { x: -ty / len, y: tx / len };
  });
  const doneEnd = Math.max(0, Math.min(dense.length - 1, currentIdx * perSeg));
  const railGap = 5;
  const railPath = (gap: number, from: number, to: number) => {
    let d = "";
    for (let i = from; i <= to; i++) {
      const p = dense[i], nrm = normals[i];
      const x = (p.x + nrm.x * gap).toFixed(2), y = (p.y + nrm.y * gap).toFixed(2);
      d += i === from ? `M${x},${y}` : ` L${x},${y}`;
    }
    return d;
  };
  const ties: { x1: number; y1: number; x2: number; y2: number; done: boolean }[] = [];
  for (let i = 0; i < dense.length; i += 5) {
    const p = dense[i], nrm = normals[i], g = railGap + 1.5;
    ties.push({ x1: p.x - nrm.x * g, y1: p.y - nrm.y * g, x2: p.x + nrm.x * g, y2: p.y + nrm.y * g, done: i <= doneEnd });
  }

  // Bring Jeff into view when the active unit / position changes.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const target = jeff.x * scale - el.clientWidth / 2;
    el.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [jeffIdx, n]); // eslint-disable-line react-hooks/exhaustive-deps

  if (n === 0) {
    return <div className="h-44 flex items-center justify-center text-sm text-muted-foreground">No lessons in this unit yet</div>;
  }

  const px = (v: number) => v * scale;

  // Keep Jeff's speech bubble fully inside the track area: estimate its half
  // width from the text and nudge it right/left when he's near an edge, so the
  // words never get cut off. The tail arrow stays centered on Jeff.
  const bubbleHalf = Math.min(180, Math.round(dialogue.length * 3.6 + 20));
  const bubbleShift = Math.round(
    Math.max(0, bubbleHalf + 10 - px(jeff.x)) +
    Math.min(0, (WPX - 10) - (px(jeff.x) + bubbleHalf))
  );

  return (
    <div ref={scrollRef} className="w-full overflow-x-auto no-scrollbar">
      <div className="relative mx-auto" style={{ width: WPX, height: HPX }}>
        <svg viewBox={`0 0 ${W} ${H}`} width={WPX} height={HPX} className="block" style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id="coasterSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--accent) / 0.16)" />
              <stop offset="55%" stopColor="hsl(var(--accent) / 0.07)" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
            <linearGradient id="coasterDone" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--brand)" />
              <stop offset="100%" stopColor="var(--brand-bright)" />
            </linearGradient>
            <radialGradient id="coasterSun" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FCD25C" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FCD25C" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* sky */}
          <rect x="0" y="0" width={W} height={groundY} fill="url(#coasterSky)" />
          {/* sun */}
          <circle cx={W - 70} cy={48} r={46} fill="url(#coasterSun)" />
          <circle cx={W - 70} cy={48} r={17} fill="#FCD25C" />
          {/* clouds */}
          {[{ x: 88, y: 50, s: 1 }, { x: W * 0.46, y: 36, s: 0.78 }, { x: W * 0.72, y: 64, s: 1.05 }].map((c, i) => (
            <g key={`cloud${i}`} fill="#ffffff" opacity="0.92">
              <ellipse cx={c.x} cy={c.y} rx={26 * c.s} ry={11 * c.s} />
              <ellipse cx={c.x - 18 * c.s} cy={c.y + 4 * c.s} rx={16 * c.s} ry={9 * c.s} />
              <ellipse cx={c.x + 20 * c.s} cy={c.y + 3 * c.s} rx={18 * c.s} ry={10 * c.s} />
            </g>
          ))}

          {/* grass ground - themed accent wash so it matches the accent */}
          <rect x="0" y={groundY} width={W} height={H - groundY} fill="hsl(var(--accent) / 0.16)" />
          <rect x="0" y={groundY} width={W} height="3" fill="hsl(var(--accent) / 0.45)" />

          {/* support posts beneath each station */}
          {pts.map((p, i) => (
            <g key={`post${i}`} stroke="hsl(45 12% 80%)">
              <line x1={p.x} y1={p.y} x2={p.x} y2={groundY} strokeWidth="3" />
              <line x1={p.x} y1={(p.y + groundY) / 2} x2={p.x + (i % 2 ? 13 : -13)} y2={groundY} strokeWidth="2" opacity="0.5" />
            </g>
          ))}

          {/* soft glow under the ridden track */}
          {doneEnd > 0 && (
            <path d={railPath(0, 0, doneEnd)} fill="none" stroke="var(--brand)" strokeWidth="16" strokeLinecap="round" opacity="0.14" />
          )}

          {/* cross-ties (sleepers) */}
          {ties.map((t, i) => (
            <line key={`tie${i}`} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
              stroke={t.done ? "var(--brand-strong)" : "hsl(45 8% 80%)"} strokeWidth={t.done ? 3 : 2.5} strokeLinecap="round" />
          ))}

          {/* remaining rails (light) + dashed center hint */}
          {doneEnd < dense.length - 1 && (
            <>
              <path d={railPath(railGap, doneEnd, dense.length - 1)} fill="none" stroke="hsl(45 9% 79%)" strokeWidth="3" strokeLinecap="round" />
              <path d={railPath(-railGap, doneEnd, dense.length - 1)} fill="none" stroke="hsl(45 9% 79%)" strokeWidth="3" strokeLinecap="round" />
            </>
          )}
          {remainSlice.length >= 2 && (
            <path d={remainPath} fill="none" stroke="hsl(215 12% 78%)" strokeWidth="2.5" strokeDasharray="2 9" strokeLinecap="round" />
          )}

          {/* ridden rails (green) */}
          {doneEnd > 0 && (
            <>
              <path d={railPath(railGap, 0, doneEnd)} fill="none" stroke="url(#coasterDone)" strokeWidth="3.5" strokeLinecap="round" />
              <path d={railPath(-railGap, 0, doneEnd)} fill="none" stroke="url(#coasterDone)" strokeWidth="3.5" strokeLinecap="round" />
            </>
          )}
        </svg>

        {/* Station markers - HTML overlay for easy tap + hover */}
        {pts.map((p, i) => {
          const al = lessons[i];
          const done = isCompleted(al);
          const unlocked = isUnlocked(al.lesson.id);
          const isCurrent = i === jeffIdx && !celebrate;
          const clickable = unlocked || done;
          return (
            <button
              key={al.lesson.id}
              type="button"
              disabled={!clickable}
              onClick={() => clickable && onSelect(al.lesson.id)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
              className="absolute rounded-full flex items-center justify-center transition-transform"
              style={{
                left: px(p.x), top: px(p.y),
                width: 36, height: 36,
                transform: `translate(-50%,-50%) scale(${hovered === i ? 1.18 : 1})`,
                cursor: clickable ? "pointer" : "default",
                zIndex: isCurrent ? 2 : 3,
                opacity: isCurrent ? 0 : 1, // current station hides behind Jeff's cart
                background: done ? "var(--brand)" : unlocked ? "#fff" : "hsl(45 10% 90%)",
                border: done ? "2.5px solid #fff" : unlocked ? "2.5px solid var(--brand)" : "2.5px solid hsl(45 10% 82%)",
                boxShadow: done ? "0 3px 8px rgba(var(--brand-rgb),0.4)" : "0 2px 5px rgba(0,0,0,0.14)",
              }}
              aria-label={al.lesson.title}
            >
              {done ? <CheckCircle className="w-5 h-5 text-white" />
                : unlocked ? <span className="text-[14px] font-extrabold" style={{ color: "var(--brand)" }}>{i + 1}</span>
                : <Lock className="w-4 h-4 text-muted-foreground" />}
              {hovered === i && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 max-w-[200px] truncate whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[12px] font-bold text-white pointer-events-none"
                  style={{ background: "#2C2C2A", zIndex: 10 }}>
                  {al.lesson.title}
                </span>
              )}
            </button>
          );
        })}

        {/* Finish-line flag with the unit's total reward (hidden once complete) */}
        {!celebrate && (
          <div className="absolute pointer-events-none" style={{ left: px(pts[n - 1].x), top: px(pts[n - 1].y), transform: "translate(-50%,-155%)", zIndex: 2 }}>
            <span className="text-[11px] font-extrabold px-2 py-1 rounded-md text-white whitespace-nowrap" style={{ background: "#2C2C2A" }}>
              🏁 +{unitTotalPts.toLocaleString()}
            </span>
          </div>
        )}

        {/* Jeff in his cart at the current station */}
        <div className="absolute" style={{ left: px(jeff.x), top: px(jeff.y), transform: "translate(-50%,-87%)", zIndex: 6 }}>
          <button
            type="button"
            onClick={() => {
              const al = lessons[Math.max(jeffIdx, 0)];
              if (al && (isUnlocked(al.lesson.id) || isCompleted(al))) onSelect(al.lesson.id);
            }}
            className="flex flex-col items-center cursor-pointer select-none"
            aria-label={celebrate ? "Unit complete" : "Continue current lesson"}
          >
            {/* Jeff's speech bubble - shifted near the edges so it never clips */}
            <div className="relative mb-2">
              <div className="rounded-2xl px-3.5 py-2 text-[12px] font-bold whitespace-nowrap shadow-md"
                style={{ background: "#fff", color: "#2C2C2A", border: "1.5px solid hsl(45 12% 86%)", transform: `translateX(${bubbleShift}px)` }}>
                {dialogue}
              </div>
              <div className="absolute left-1/2 -bottom-1.5 w-3 h-3 rotate-45"
                style={{ background: "#fff", transform: "translateX(-50%) rotate(45deg)", borderRight: "1.5px solid hsl(45 12% 86%)", borderBottom: "1.5px solid hsl(45 12% 86%)" }} />
            </div>
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 8px 14px rgba(var(--brand-rgb),0.26))" }}
            >
              {/* Coaster car with Jeff seated and strapped in */}
              <div className="relative" style={{ width: 88, height: 92 }}>
                {/* wheels */}
                <div className="absolute rounded-full" style={{ width: 17, height: 17, left: 15, bottom: 3, background: "#2C2C2A", border: "2.5px solid #d9871a", zIndex: 1 }} />
                <div className="absolute rounded-full" style={{ width: 17, height: 17, right: 15, bottom: 3, background: "#2C2C2A", border: "2.5px solid #d9871a", zIndex: 1 }} />
                {/* Jeff seated - his lower half tucks down behind the car body */}
                <div className="absolute" style={{ left: "50%", top: -5, transform: "translateX(-50%)", width: 58, height: 64, zIndex: 1 }}>
                  <JeffMascot mood={celebrate ? "celebrate" : "encourage"} />
                </div>
                {/* car body in front of Jeff's legs */}
                <div className="absolute" style={{ left: 2, right: 2, bottom: 8, height: 46, borderRadius: "11px 11px 20px 20px", background: "linear-gradient(#F2A937,#d9871a)", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.35), 0 4px 8px rgba(var(--brand-rgb),0.18)", zIndex: 2 }}>
                  <div className="absolute" style={{ left: 8, right: 8, top: 6, height: 3, borderRadius: 999, background: "rgba(255,255,255,0.35)" }} />
                </div>
                {/* lap bar pulled down across the car lip */}
                <div className="absolute" style={{ left: 9, right: 9, top: 46, height: 7, borderRadius: 999, background: "linear-gradient(#3a3a36,#2C2C2A)", boxShadow: "0 1px 2px rgba(0,0,0,0.3)", zIndex: 3 }} />
              </div>
            </motion.div>
          </button>
        </div>
      </div>
    </div>
  );
}

