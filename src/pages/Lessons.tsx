import React, { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { lessons, unitInfo, getUnitRewardTotal } from "@/data/lessons";
import { getUnitTestByCategory } from "@/data/unitTestQuestions";
import { getAdaptiveCurriculum, AdaptiveLessonInfo } from "@/lib/curriculumEngine";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import GameNav from "@/components/GameNav";
import { ArrowRight, Lock, CheckCircle, Coins } from "lucide-react";
import { LessonCategory, LEVEL_TITLES } from "@/types";
import APModeToggle from "@/components/APModeToggle";
import APModeSections from "@/components/APModeSections";

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
  const { user, lessonProgress, unitTestProgress, getRewardMultiplier, jeffsBalance } = useApp();
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

  // Prerequisite gating
  const unlockedUnits = useMemo(() => {
    const unlocked = new Set<string>();
    for (const unit of unitInfo) {
      if (unit.orderIndex === 1) { unlocked.add(unit.id); continue; }
      const previousUnits = unitInfo.filter(u => u.orderIndex < unit.orderIndex);
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
  }, [adaptiveCurriculum, lessonProgress]);

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

  // Find the first unit with incomplete lessons (active unit)
  const firstActiveUnitId = useMemo(() => {
    for (const unit of unitInfo) {
      if (!unlockedUnits.has(unit.id)) continue;
      const adaptive = adaptiveCurriculum.get(unit.id);
      if (!adaptive) continue;
      const allDone = adaptive.lessons.every(
        l => l.status === "validated" || isLessonCompleted(l.lesson.id)
      );
      if (!allDone) return unit.id;
    }
    return unitInfo[0]?.id || "";
  }, [adaptiveCurriculum, lessonProgress, unlockedUnits]);

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

  // Level info for the active unit
  const activeLevel = activeUnit?.level ?? 1;
  const activeLevelTitle = LEVEL_TITLES[activeLevel] || `Level ${activeLevel}`;

  // Units in same level (for the strip)
  const levelUnits = unitInfo.filter(u => u.level === activeLevel);

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
    return unitInfo.find(u => u.orderIndex === activeUnit.orderIndex + 1) || null;
  }, [activeUnit]);

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

      <main className="container mx-auto px-4 py-6 max-w-3xl">
        {/* AP Mode Toggle */}
        <div className="mb-6">
          <APModeToggle apMode={apMode} onToggle={setApMode} />
        </div>

        {apMode ? renderAPMode() : (
          <>
            {/* 1. Page header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-1">
                  Your knowledge portfolio
                </p>
                <h1 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight">
                  {activeUnit ? `Unit ${activeUnit.unitNumber} — ${activeUnit.title}` : "Curriculum"}
                </h1>
              </div>
              <div className="bg-foreground/5 border border-border rounded-full px-4 py-1.5 shrink-0">
                <span className="font-mono text-sm font-bold text-foreground">
                  {jeffsBalance.toLocaleString()} pts
                </span>
              </div>
            </div>

            {/* 2. Stock chart card */}
            <div className="rounded-[20px] bg-card overflow-hidden mb-4"
              style={{ border: "0.5px solid hsl(45 10% 82%)" }}>
              {/* Card header */}
              <div className="px-5 pt-5 pb-3 flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.12em]">
                    {activeUnit?.title ?? "—"}
                  </p>
                  <p className="text-lg font-extrabold text-foreground tracking-tight mt-0.5">
                    {completedCount} of {totalLessons} lessons done
                  </p>
                </div>
                <div className="text-right flex items-center gap-2">
                  <span className="text-sm font-bold" style={{ color: "#1D9E75" }}>
                    {earnedPts.toLocaleString()} pts
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(29,158,117,0.1)", color: "#1D9E75" }}>
                    ▲ {pctComplete}%
                  </span>
                </div>
              </div>

              {/* Chart SVG */}
              <ChartSVG
                lessons={activeLessons}
                currentIdx={currentLessonIdx}
                multiplier={multiplier}
                unitTotalPts={Math.round(unitTotalPts * multiplier)}
              />

              {/* X-axis labels */}
              <div className="px-5 pb-4 flex justify-between">
                {["start", "25%", "now", "75%", "done"].map((label) => (
                  <span key={label} className="text-[10px] font-semibold"
                    style={{ color: label === "now" ? "#EF9F27" : "hsl(215 12% 56%)" }}>
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* 3. Unit strip */}
            <div ref={stripRef} className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
              {levelUnits.map((unit) => {
                const adaptive = adaptiveCurriculum.get(unit.id);
                const uLessons = adaptive?.lessons ?? [];
                const done = uLessons.filter(l => l.status === "validated" || isLessonCompleted(l.lesson.id)).length;
                const total = uLessons.length;
                const pct = total > 0 ? Math.round((done / total) * 100) : 0;
                const isActive = unit.id === activeUnitId;
                const isLocked = !unlockedUnits.has(unit.id);
                const isComplete = done >= total && total > 0;

                return (
                  <button
                    key={unit.id}
                    data-unit={unit.id}
                    onClick={() => !isLocked && setActiveUnitId(unit.id)}
                    className="shrink-0 rounded-2xl px-4 py-3 text-left transition-colors min-w-[120px] relative overflow-hidden"
                    style={{
                      background: isActive ? "#2C2C2A" : isComplete ? "#E1F5EE" : "hsl(45 10% 91%)",
                      opacity: isLocked ? 0.6 : 1,
                      cursor: isLocked ? "not-allowed" : "pointer",
                    }}
                  >
                    <span className="text-[9px] font-bold uppercase tracking-[0.12em] block"
                      style={{ color: isActive ? "rgba(255,255,255,0.5)" : isComplete ? "#1D9E75" : "hsl(215 12% 56%)" }}>
                      Unit {unit.unitNumber}
                    </span>
                    <span className="text-[12px] font-bold block mt-0.5 truncate"
                      style={{ color: isActive ? "#fff" : isComplete ? "#1D9E75" : "hsl(215 12% 38%)" }}>
                      {unit.title}
                    </span>
                    {/* Progress bar at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-[3px]"
                      style={{ background: isActive ? "rgba(255,255,255,0.1)" : isComplete ? "rgba(29,158,117,0.15)" : "transparent" }}>
                      <div className="h-full transition-all duration-300"
                        style={{
                          width: `${pct}%`,
                          background: isActive ? "#EF9F27" : isComplete ? "#1D9E75" : "transparent",
                        }} />
                    </div>
                  </button>
                );
              })}
            </div>

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
              <div className="rounded-[20px] px-6 py-5 flex items-center justify-between"
                style={{ background: "#2C2C2A", border: "0.5px solid hsl(45 10% 25%)" }}>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-1"
                    style={{ color: "rgba(255,255,255,0.4)" }}>
                    Next lesson · L{nextLessonInUnit.lesson.lessonNumber}
                  </p>
                  <p className="text-white font-bold text-[15px]">
                    {nextLessonInUnit.lesson.title}
                  </p>
                  <p className="text-sm font-bold mt-1" style={{ color: "#1D9E75" }}>
                    +{Math.round(nextLessonInUnit.lesson.reward * multiplier).toLocaleString()} pts on completion
                  </p>
                </div>
                <Link to={`/lessons/${nextLessonInUnit.lesson.id}`}>
                  <Button size="sm" className="bg-[#1D9E75] hover:bg-[#1a8f6a] text-white font-bold gap-1.5 press-scale">
                    Start <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
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
