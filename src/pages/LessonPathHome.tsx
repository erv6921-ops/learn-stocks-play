import React, { useMemo } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import GameNav from "@/components/GameNav";
import LessonPath from "@/components/student/LessonPath";
import { lessons } from "@/data/lessons";
import { getStreak } from "@/lib/playerStats";
import { getNextAction } from "@/lib/getNextAction";
import { BookOpen, ArrowRight, Flame, Coins, Trophy } from "lucide-react";

// Main student tab. Replaces the old dashboard: the big blue banner sits at the
// top and the vertical lesson path (LessonPath) fills the rest. The path is the
// student's home now — all the old dashboard cards are gone from the landing.
export default function LessonPathHome() {
  const { user, authReady, lessonProgress, jeffsBalance, jeffsHistory, unitTestProgress } = useApp();
  const navigate = useNavigate();

  const track = user?.track === "gulliver_intro" ? "gulliver-intro" : "regular";
  const trackLessons = useMemo(() => lessons.filter((l) => (l.track ?? "regular") === track), [track]);
  const completedIds = useMemo(
    () => new Set(lessonProgress.filter((p) => p.completed).map((p) => p.lessonId)),
    [lessonProgress],
  );
  const completed = useMemo(() => trackLessons.filter((l) => completedIds.has(l.id)).length, [trackLessons, completedIds]);
  const total = trackLessons.length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const streak = useMemo(() => getStreak(jeffsHistory), [jeffsHistory]);

  // Reuse getNextAction (source of truth) for the banner CTA route/label.
  const action = useMemo(
    () => getNextAction({ assignedTrack: user?.track, lessonProgress, unitTestProgress, assignments: [] }),
    [user?.track, lessonProgress, unitTestProgress],
  );

  if (!authReady) return null;
  if (!user) return <Navigate to="/auth" replace />;

  const greeting = (() => {
    const h = new Date().getHours();
    const name = user.firstName ? `, ${user.firstName}` : "";
    return h < 12 ? `Good morning${name}` : h < 18 ? `Good afternoon${name}` : `Good evening${name}`;
  })();
  const dateLabel = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  const ctaLabel = completed === 0 ? "Start learning" : completed >= total ? "Review lessons" : "Continue learning";

  return (
    <div className="min-h-screen bg-background">
      <GameNav />
      <main className="p-4 pb-28 md:pb-6">
        {/* ═══ Big blue banner (kept) ═══ */}
        <div className="relative overflow-hidden rounded-3xl mb-3 p-7 md:p-9 text-white" style={{ background: "var(--brand-hero)" }}>
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 25% 15%, white 1px, transparent 1px)", backgroundSize: "22px 22px" }}
          />
          <div className="absolute -right-16 -top-24 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(227,160,8,0.18)" }} />
          <div className="relative">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{dateLabel}</p>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.05] mt-1.5 break-words">{greeting}</h1>

            {/* compact stats */}
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <Stat icon={Flame} tint="#fb923c" label="Streak" value={`${streak}d`} />
              <Stat icon={Coins} tint="#F5C26B" label="Coins" value={jeffsBalance.toLocaleString()} />
              <Stat icon={Trophy} tint="#6ee7b7" label="Lessons" value={`${completed}/${total}`} />
            </div>

            {/* track progress */}
            <div className="mt-5">
              <div className="mb-2 flex items-end justify-between">
                <p className="text-[13px] font-bold">Your climb</p>
                <p className="text-[11px] font-semibold text-white/45 tabular-nums">{pct}%</p>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.09)" }}>
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#E3A008,var(--brand-bright))", transition: "width .4s ease" }} />
              </div>
            </div>

            <button
              onClick={() => navigate(action.route || "/lessons")}
              className="press-scale mt-6 w-full inline-flex items-center justify-center gap-2.5 rounded-2xl px-8 py-5 text-lg font-extrabold tracking-tight"
              style={{
                background: "linear-gradient(180deg,#fff 0%,#eef3f0 100%)",
                color: "#12281f",
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              <BookOpen className="w-5 h-5" />
              {ctaLabel}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ═══ The path (main tab content) ═══ */}
        <LessonPath />
      </main>
    </div>
  );
}

const Stat: React.FC<{ icon: typeof Flame; tint: string; label: string; value: string }> = ({ icon: Icon, tint, label, value }) => (
  <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
    <Icon className="w-4 h-4" style={{ color: tint }} />
    <span className="text-sm font-extrabold tabular-nums">{value}</span>
    <span className="text-[11px] font-semibold uppercase tracking-wider text-white/45">{label}</span>
  </div>
);
