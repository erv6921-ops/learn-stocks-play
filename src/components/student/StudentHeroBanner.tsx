import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { supabase } from "@/integrations/supabase/client";
import { lessons, unitInfo, getLessonsByUnit } from "@/data/lessons";
import { getStreak, getBestStreak } from "@/lib/playerStats";
import { getLeague } from "@/lib/leagues";
import { useDailyMissions } from "@/hooks/useDailyMissions";
import { DIFFICULTY_META } from "@/lib/dailyMissions";
import DailyMissions from "@/components/DailyMissions";
import { getNextAction } from "@/lib/getNextAction";
import { devTrackOverride } from "@/lib/devPathOverride";
import { BookOpen, ArrowRight, Flame, Coins, Star, Trophy, Check } from "lucide-react";

// The main-branch greeting hero (Daily-missions / Lessons toggle, league + class
// rank, stats, Start/Continue CTA), extracted into a reusable component so the
// lesson path page can drop it in at the BOTTOM (ground level) beneath the path.

const LEVEL_NAMES = [
  "Beginner Learner", "Investor in Training", "Market Observer", "Portfolio Strategist",
  "Wealth Builder", "Capital Manager", "Market Analyst", "Capital Architect",
  "Financial Engineer", "Master Economist",
];

function getCurriculumLevel(completedLessons: number, totalLessons: number, unitScores: { done: number; total: number }[]) {
  const completionPct = totalLessons > 0 ? completedLessons / totalLessons : 0;
  const unitsFullyComplete = unitScores.filter((u) => u.total > 0 && u.done >= u.total).length;
  const totalUnits = unitScores.filter((u) => u.total > 0).length;
  const unitMasteryPct = totalUnits > 0 ? unitsFullyComplete / totalUnits : 0;
  const score = completionPct * 0.6 + unitMasteryPct * 0.4;
  if (score >= 0.95) return 10;
  if (score >= 0.85) return 9;
  if (score >= 0.72) return 8;
  if (score >= 0.6) return 7;
  if (score >= 0.48) return 6;
  if (score >= 0.36) return 5;
  if (score >= 0.25) return 4;
  if (score >= 0.15) return 3;
  if (score >= 0.05) return 2;
  return 1;
}

export const StudentHeroBanner: React.FC = () => {
  const { user, lessonProgress, jeffsBalance, jeffsHistory } = useApp();
  const navigate = useNavigate();

  const enrollTrack = devTrackOverride() ?? user?.track;
  const track = enrollTrack === "gulliver_intro" ? "gulliver-intro" : "regular";
  const dashUnits = useMemo(() => unitInfo.filter((u) => (u.track ?? "regular") === track), [track]);
  const dashLessonIds = useMemo(
    () => new Set(lessons.filter((l) => (l.track ?? "regular") === track).map((l) => l.id)),
    [track],
  );
  const completed = new Set(lessonProgress.filter((p) => p.completed).map((p) => p.lessonId));
  const completedLessons = [...completed].filter((id) => dashLessonIds.has(id)).length;
  const totalLessons = dashLessonIds.size;

  const unitScores = useMemo(
    () => dashUnits.map((u) => {
      const ul = getLessonsByUnit(u.id);
      return { done: ul.filter((l) => completed.has(l.id)).length, total: ul.length };
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dashUnits, lessonProgress],
  );
  const currLevel = getCurriculumLevel(completedLessons, totalLessons, unitScores);
  const levelProgressPct = totalLessons > 0 ? Math.min((completedLessons / totalLessons) * 100, 100) : 0;

  const streak = useMemo(() => getStreak(jeffsHistory), [jeffsHistory]);
  const bestStreak = useMemo(() => getBestStreak(jeffsHistory), [jeffsHistory]);
  const myLeague = getLeague(jeffsBalance);

  const action = useMemo(
    () => getNextAction({ assignedTrack: enrollTrack as typeof user.track, lessonProgress, unitTestProgress: [], assignments: [] }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [enrollTrack, lessonProgress],
  );

  const formattedDate = useMemo(
    () => new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" }),
    [],
  );
  const greetingSub = useMemo(() => {
    const lines = [
      "Ready to build some wealth today?",
      "Every lesson is money in the bank.",
      "Small steps today, big returns tomorrow.",
      "Let's turn knowledge into net worth.",
      "One more lesson closer to the summit.",
      "Compound your streak, compound your coins.",
    ];
    return lines[Math.floor(Math.random() * lines.length)];
  }, []);
  const getGreeting = () => {
    const h = new Date().getHours();
    const name = user?.firstName ? `, ${user.firstName}` : "";
    return h < 12 ? `Good morning${name}` : h < 18 ? `Good afternoon${name}` : `Good evening${name}`;
  };

  // Daily missions (shared hook; headless <DailyMissions> below awards them).
  const { missions: heroMissions, completedCount: missionsCompleted, total: missionsTotal } = useDailyMissions();
  const allMissionsDone = missionsCompleted >= missionsTotal;

  const [heroView, setHeroView] = useState<"daily" | "lessons">("daily");
  const autoSwitchedRef = useRef(false);
  useEffect(() => {
    if (!allMissionsDone || autoSwitchedRef.current) return;
    autoSwitchedRef.current = true;
    const t = setTimeout(() => setHeroView("lessons"), 1200);
    return () => clearTimeout(t);
  }, [allMissionsDone]);

  // Class rank badge (best-effort; hidden if not in a class / on error).
  const [rankInfo, setRankInfo] = useState<{ rank: number; total: number } | null>(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!user?.id) return;
      try {
        const { data: memberships } = await supabase.from("class_members").select("class_id").eq("user_id", user.id);
        const classId = memberships?.[0]?.class_id;
        if (!classId) return;
        const { data: lb } = await supabase.rpc("get_class_leaderboard", { _class_id: classId });
        if (cancelled || !lb) return;
        const sorted = [...lb].sort((a, b) => Number(b.xp) - Number(a.xp));
        const idx = sorted.findIndex((r) => r.user_id === user.id);
        if (idx !== -1) setRankInfo({ rank: idx + 1, total: sorted.length });
      } catch { /* ignore */ }
    })();
    return () => { cancelled = true; };
  }, [user?.id]);

  return (
    <>
      <DailyMissions headless />
      <div className="relative overflow-hidden rounded-3xl p-7 md:p-10 text-white" style={{ background: "var(--brand-hero)" }}>
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 25% 15%, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        <div className="absolute -right-16 -top-24 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(227,160,8,0.18)" }} />
        <div className="absolute -left-20 -bottom-24 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(var(--brand-rgb),0.18)" }} />

        <div className="relative">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{formattedDate}</p>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.05] mt-1.5 break-words">{getGreeting()}</h1>
              <p className="text-sm md:text-[15px] text-white/60 mt-2">{greetingSub}</p>
            </div>
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
              <div className="inline-flex items-center gap-0.5 rounded-full p-0.5" style={{ background: "rgba(0,0,0,0.22)", border: "1px solid rgba(255,255,255,0.12)" }}>
                {(["daily", "lessons"] as const).map((v) => {
                  const active = heroView === v;
                  return (
                    <button key={v} onClick={() => setHeroView(v)} className="text-[11px] font-bold rounded-full transition-colors"
                      style={{ width: 70, height: 24, background: active ? "#ffffff" : "transparent", color: active ? "#12281f" : "rgba(255,255,255,0.55)" }}>
                      {v === "daily" ? "Daily" : "Lessons"}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

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
                  <p className="text-[11px] font-semibold text-white/45 tabular-nums">{completedLessons}/{totalLessons} lessons</p>
                </>
              )}
            </div>
            <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.09)" }}>
              <div className="h-full rounded-full" style={{
                width: heroView === "daily" ? `${(missionsCompleted / Math.max(1, missionsTotal)) * 100}%` : `${levelProgressPct}%`,
                background: heroView === "daily" ? "#f59e0b" : "linear-gradient(90deg, #E3A008, var(--brand-bright))",
                transition: "width 0.4s ease",
                boxShadow: heroView === "daily" && allMissionsDone ? "0 0 12px rgba(245,158,11,0.75)" : "none",
              }} />
            </div>
          </div>

          {heroView === "daily" ? (
            <motion.div key="daily" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
              className="mt-6 rounded-2xl grid grid-cols-3 overflow-hidden" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}>
              {heroMissions.map((m, idx) => {
                const { id, blurb, icon: Icon, reward, done, progress, target, ratio } = m;
                const diff = DIFFICULTY_META[m.difficulty];
                const showCounter = !done && target > 1;
                return (
                  <div key={id} className={`relative flex flex-col items-center text-center gap-1.5 px-2 py-3 sm:flex-row sm:items-center sm:text-left sm:gap-3 sm:px-4 sm:py-3.5 min-w-0 border-white/10 ${idx > 0 ? "border-l" : ""}`}
                    style={{ background: done ? "rgba(34,197,94,0.12)" : "transparent" }}>
                    <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: done ? "rgba(34,197,94,0.16)" : "rgba(245,158,11,0.14)", border: `1px solid ${done ? "rgba(34,197,94,0.32)" : "rgba(245,158,11,0.28)"}` }}>
                      <Icon className="w-4 h-4" style={{ color: done ? "#4ade80" : "#f59e0b" }} />
                    </span>
                    <div className="min-w-0 w-full sm:flex-1">
                      <div className="flex flex-col items-center gap-0.5 sm:flex-row sm:items-center sm:gap-1.5 min-w-0">
                        <p className="text-[11px] leading-[1.15] sm:text-[13px] font-bold sm:leading-tight sm:truncate break-words">{blurb}</p>
                        <span className="hidden sm:inline-block text-[8px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full shrink-0" style={{ color: diff.color, background: diff.bg }}>{diff.label}</span>
                      </div>
                      <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                        <p className="text-[12px] font-extrabold leading-none" style={{ color: "#f59e0b" }}>+{reward}</p>
                        {showCounter && <span className="text-[11px] font-bold tabular-nums text-white/50">{progress}/{target}</span>}
                      </div>
                      {showCounter && (
                        <div className="h-1 rounded-full overflow-hidden mt-1.5" style={{ background: "rgba(255,255,255,0.12)" }}>
                          <div className="h-full rounded-full" style={{ width: `${ratio * 100}%`, background: "#f59e0b", transition: "width 0.4s ease" }} />
                        </div>
                      )}
                    </div>
                    {done && (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 16 }}
                        className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#22c55e" }}>
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </motion.span>
                    )}
                  </div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div key="lessons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
              className="mt-6 rounded-2xl grid grid-cols-2 sm:grid-cols-5 overflow-hidden" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}>
              {[
                { Icon: Flame, tint: "#fb923c", value: String(streak), label: "Day streak" },
                { Icon: Coins, tint: "#F5C26B", value: jeffsBalance.toLocaleString(), label: "Coins" },
                { Icon: Star, tint: "#fde047", value: `Lv ${currLevel}`, label: "Level" },
                { Icon: Flame, tint: "#fdba74", value: `${bestStreak}d`, label: "Best streak" },
                { Icon: BookOpen, tint: "#6ee7b7", value: `${completedLessons}/${totalLessons}`, label: "Lessons" },
              ].map(({ Icon, tint, value, label }, idx) => (
                <div key={label} className={`flex items-center gap-3 px-4 py-3.5 min-w-0 border-white/10 ${idx > 0 ? "sm:border-l" : ""} ${idx >= 2 ? "border-t sm:border-t-0" : ""} ${idx % 2 === 1 ? "border-l sm:border-l" : ""}`}>
                  <span className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: `${tint}1f`, border: `1px solid ${tint}33` }}>
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

          <button onClick={() => navigate(action.route || "/lessons")}
            className="press-scale mt-6 w-full inline-flex items-center justify-center gap-2.5 rounded-2xl px-8 py-5 md:py-6 text-lg md:text-xl font-extrabold tracking-tight"
            style={{ background: "linear-gradient(180deg, #ffffff 0%, #eef3f0 100%)", color: "#12281f", border: "1px solid rgba(255,255,255,0.7)", boxShadow: "0 20px 40px -10px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.9)" }}>
            <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
            {completedLessons === 0 ? "Start learning" : completedLessons >= totalLessons ? "Review lessons" : "Continue learning"}
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </>
  );
};

export default StudentHeroBanner;
