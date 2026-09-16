import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Check, Coins, Flame, Star } from "lucide-react";
import type { MissionView } from "@/hooks/useDailyMissions";
import { DIFFICULTY_META } from "@/lib/dailyMissions";
import { getLeague } from "@/lib/leagues";

/* ═══════════════════════════════════════════════════════════════════════════
   TOWER HERO BANNER - the student dashboard's greeting banner, reproduced for
   the tower page. Same recipe as Dashboard.tsx's "GREETING BANNER": brand-hero
   background, dotted texture, colour orbs, date + greeting, league badge, the
   Daily / Lessons switcher with its progress bar and either the 3 daily
   missions or the 5 stats, and the Start / Continue learning CTA (kept
   smaller here on purpose).
   ═══════════════════════════════════════════════════════════════════════════ */

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
  "Master Economist",
];

const GREETING_LINES = [
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

export interface TowerHeroBannerProps {
  firstName?: string;
  coins: number;
  streak: number;
  bestStreak: number;
  level: number;
  completedLessons: number;
  totalLessons: number;
  missions: MissionView[];
  missionsCompleted: number;
  missionsTotal: number;
  /** Label for the CTA's target, e.g. "Step 9.6 · Why Prices Move". */
  nextLabel: string | null;
  onContinue: () => void;
}

export const TowerHeroBanner: React.FC<TowerHeroBannerProps> = ({
  firstName, coins, streak, bestStreak, level, completedLessons, totalLessons,
  missions, missionsCompleted, missionsTotal, nextLabel, onContinue,
}) => {
  const [view, setView] = useState<"daily" | "lessons">("daily");
  const league = getLeague(coins);
  const allMissionsDone = missionsTotal > 0 && missionsCompleted >= missionsTotal;
  const levelPct = totalLessons > 0 ? Math.min(100, (completedLessons / totalLessons) * 100) : 0;

  const formattedDate = useMemo(
    () => new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" }),
    [],
  );
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    const suffix = firstName ? `, ${firstName}` : "";
    if (hour < 12) return `Good morning${suffix}`;
    if (hour < 18) return `Good afternoon${suffix}`;
    return `Good evening${suffix}`;
  }, [firstName]);
  const greetingSub = useMemo(() => GREETING_LINES[Math.floor(Math.random() * GREETING_LINES.length)], []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="relative overflow-hidden rounded-3xl p-7 md:p-10 text-white" style={{ background: "var(--brand-hero)" }}>
        {/* dotted texture + soft colored depth orbs */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 25% 15%, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        <div className="absolute -right-16 -top-24 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(227,160,8,0.18)" }} />
        <div className="absolute -left-20 -bottom-24 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(var(--brand-rgb),0.18)" }} />

        <div className="relative">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{formattedDate}</p>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.05] mt-1.5 break-words">{greeting}</h1>
              <p className="text-sm md:text-[15px] text-white/60 mt-2">{greetingSub}</p>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-bold" style={{ background: league.soft, color: league.color, border: `1px solid ${league.color}55` }}>
                <span className="text-sm leading-none">{league.icon}</span> {league.name}
              </div>
              {/* Daily / Lessons view switcher */}
              <div className="inline-flex items-center gap-0.5 rounded-full p-0.5" style={{ background: "rgba(0,0,0,0.22)", border: "1px solid rgba(255,255,255,0.12)" }}>
                {(["daily", "lessons"] as const).map((v) => {
                  const active = view === v;
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setView(v)}
                      className="text-[11px] font-bold rounded-full transition-colors"
                      style={{ width: 70, height: 24, background: active ? "#ffffff" : "transparent", color: active ? "#12281f" : "rgba(255,255,255,0.55)" }}
                    >
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
              {view === "daily" ? (
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
                    <span style={{ color: "var(--brand-bright)" }}>Level {level}</span>
                    <span className="text-white/45 font-semibold"> · {LEVEL_NAMES[level - 1]}</span>
                  </p>
                  <p className="text-[11px] font-semibold text-white/45 tabular-nums">{completedLessons}/{totalLessons} lessons</p>
                </>
              )}
            </div>
            <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.09)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: view === "daily" ? `${missionsTotal > 0 ? (missionsCompleted / missionsTotal) * 100 : 0}%` : `${levelPct}%`,
                  background: view === "daily" ? "#f59e0b" : "linear-gradient(90deg, #E3A008, var(--brand-bright))",
                  transition: "width 0.4s ease",
                  boxShadow: view === "daily" && allMissionsDone ? "0 0 12px rgba(245,158,11,0.75)" : "none",
                }}
              />
            </div>
          </div>

          {/* Stats row - switches between daily missions and the 5 stats */}
          {view === "daily" ? (
            <motion.div
              key="hero-stats-daily"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
              className="mt-6 rounded-2xl grid grid-cols-3 overflow-hidden"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
            >
              {missions.map((m, idx) => {
                const { id, blurb, icon: Icon, reward, done, progress, target, ratio } = m;
                const diff = DIFFICULTY_META[m.difficulty];
                const showCounter = !done && target > 1;
                return (
                  <div
                    key={id}
                    className={`relative flex flex-col items-center text-center gap-1.5 px-2 py-3 sm:flex-row sm:items-center sm:text-left sm:gap-3 sm:px-4 sm:py-3.5 min-w-0 border-white/10 ${idx > 0 ? "border-l" : ""}`}
                    style={{ background: done ? "rgba(34,197,94,0.12)" : "transparent" }}
                  >
                    <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: done ? "rgba(34,197,94,0.16)" : "rgba(245,158,11,0.14)", border: `1px solid ${done ? "rgba(34,197,94,0.32)" : "rgba(245,158,11,0.28)"}` }}>
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
                      <motion.span
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 16 }}
                        className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: "#22c55e" }}
                      >
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
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
            >
              {[
                { Icon: Flame, tint: "#fb923c", value: String(streak), label: "Day streak" },
                { Icon: Coins, tint: "#F5C26B", value: coins.toLocaleString(), label: "Coins" },
                { Icon: Star, tint: "#fde047", value: `Lv ${level}`, label: "Level" },
                { Icon: Flame, tint: "#fdba74", value: `${bestStreak}d`, label: "Best streak" },
                { Icon: BookOpen, tint: "#6ee7b7", value: `${completedLessons}/${totalLessons}`, label: "Lessons" },
              ].map(({ Icon, tint, value, label }, idx) => (
                <div
                  key={label}
                  className={`flex items-center gap-3 px-4 py-3.5 min-w-0 border-white/10 ${idx > 0 ? "sm:border-l" : ""} ${idx >= 2 ? "border-t sm:border-t-0" : ""} ${idx % 2 === 1 ? "border-l sm:border-l" : ""}`}
                >
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

          {/* Start / Continue learning CTA - deliberately smaller than the
              dashboard's: one line, auto width on desktop, names the next step. */}
          <div className="mt-5 flex justify-start">
            <button
              type="button"
              onClick={onContinue}
              className="press-scale inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-[14px] font-extrabold tracking-tight"
              style={{
                background: "linear-gradient(180deg, #ffffff 0%, #eef3f0 100%)",
                color: "#12281f",
                border: "1px solid rgba(255,255,255,0.7)",
                boxShadow: "0 10px 24px -10px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              <BookOpen className="w-4 h-4" />
              {nextLabel ? (completedLessons === 0 ? "Start learning" : "Continue learning") : "Review lessons"}
              {nextLabel && <span className="hidden sm:inline text-[12px] font-semibold text-[#12281f]/60">· {nextLabel}</span>}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TowerHeroBanner;
