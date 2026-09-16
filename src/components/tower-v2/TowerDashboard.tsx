import React, { useCallback, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { unitInfo } from "@/data/lessons";
import { getAdaptiveCurriculum } from "@/lib/curriculumEngine";
import { getStreak, getBestStreak, getCurriculumLevel } from "@/lib/playerStats";
import { useDailyMissions } from "@/hooks/useDailyMissions";
import GameNav from "@/components/GameNav";
import { TowerPath } from "./TowerPath";
import { TowerHeroBanner } from "./TowerHeroBanner";
import { FLOORS, zoneOfFloor, type Floor, type FloorState, type Step } from "./towerData";

/* ═══════════════════════════════════════════════════════════════════════════
   TOWER DASHBOARD - the tower as the student's home screen.
   Route: /tower. Laid out like the real dashboard: full-bleed, the greeting
   banner on top, then the tower path - one Duolingo-style trail of lesson
   stones climbing the building, with a side card for where you are.

   Real data from AppContext: regular-track units in curriculum order, lesson
   progress, coin balance + history, reward multiplier, daily missions,
   portfolio. Each floor is one UNIT and its steps are that unit's lessons.
   Only the "skip" flow is local: the app has no skipped-unit record yet, so a
   skip is remembered for this visit and the fare comes off the displayed
   balance only.

   Floor number = position in curriculum order (orderIndex), not unitNumber:
   the real track has 35 units and "Insurance & Protection" (unitNumber 35)
   sits at position 7.
   ═══════════════════════════════════════════════════════════════════════════ */

// Jeff's arrival line per curriculum level (the real LEVEL_TITLES).
const JEFF_BY_LEVEL: Record<number, string> = {
  1: "Everything starts down here. Get the basics right and the rest of the tower gets easier.",
  2: "Banks, credit, protection. Boring-sounding, but this floor saves you real money.",
  3: "Investing floor. This is where your money starts working for you.",
  4: "Time to build a portfolio. One stock is a bet; a mix is a plan.",
  5: "Company analysis. Let's learn to read what a business is actually worth.",
  6: "Behavioral finance. The biggest risk to your money is usually you.",
  7: "Macro floor. Inflation and rates move everything above and below us.",
  8: "Entrepreneurship wing. Here you learn how businesses are built and run.",
  9: "Advanced investing. Options and alternatives - handle with care.",
  10: "Top of the tower. Time to put the whole plan to work.",
};

const CARD = "bg-card rounded-3xl p-5 relative overflow-hidden";
const CARD_STYLE: React.CSSProperties = { border: "1px solid hsl(var(--border))", boxShadow: "0 1px 2px rgba(16,40,34,0.03), 0 14px 30px -16px rgba(16,40,34,0.13)" };
const EYEBROW = "text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground";
// Compact big balances (12,300 -> "12.3K") like the nav's coin pill.
const compact = (n: number) =>
  Math.abs(n) >= 10_000 ? Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n) : n.toLocaleString();

export default function TowerDashboard() {
  const { user, lessonProgress, jeffsBalance, jeffsHistory, getRewardMultiplier } = useApp();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const multiplier = getRewardMultiplier();

  // Regular-track units in curriculum order - exactly how Missions builds its map.
  const units = useMemo(
    () => unitInfo.filter((u) => (u.track ?? "regular") === "regular").sort((a, b) => a.orderIndex - b.orderIndex),
    [],
  );

  // Same adaptive curriculum the Missions page uses (benchmark-validated
  // lessons don't count as required).
  const adaptive = useMemo(
    () => getAdaptiveCurriculum(user?.benchmarkCategoryScores || null, user?.benchmarkScores || null, user?.assessmentScore ?? null, 50),
    [user?.benchmarkCategoryScores, user?.benchmarkScores, user?.assessmentScore],
  );

  const isDone = useCallback(
    (lessonId: string) => lessonProgress.some((p) => p.lessonId === lessonId && p.completed),
    [lessonProgress],
  );
  const hasStarted = useCallback(
    (lessonId: string) => lessonProgress.some((p) => p.lessonId === lessonId && ((p.progressPercent ?? 0) > 0 || p.completed)),
    [lessonProgress],
  );

  // Local-only skips (see header comment).
  const [skipped, setSkipped] = useState<Set<number>>(() => new Set());
  const [spent, setSpent] = useState(0);

  // One row per unit: real title/level, real lessons as steps, real progress + rewards.
  const rows = useMemo(() => {
    return units.map((u, i) => {
      const number = i + 1;
      const required = (adaptive.get(u.id)?.lessons ?? []).filter((l) => l.status === "required").map((l) => l.lesson);
      const done = required.filter((l) => isDone(l.id)).length;
      const started = required.some((l) => hasStarted(l.id));
      const complete = required.length === 0 || done >= required.length;
      let seenGap = false;
      const steps: Step[] = required.map((l, si) => {
        const d = isDone(l.id);
        // Unlocked = done, or the first not-done lesson (Missions gates lessons in order).
        const unlocked = d || !seenGap;
        if (!d) seenGap = true;
        // Label by floor position (9.1, 9.2 ...) so floor and step numbers agree.
        // The lesson's own lessonNumber follows unitNumber, which is off by one
        // above the inserted Insurance unit.
        return { id: l.id, label: `${number}.${si + 1}`, title: l.title, done: d, unlocked, reward: Math.round(l.reward * multiplier), minutes: l.duration || 2 };
      });
      const rewardTotal = Math.round(required.reduce((s, l) => s + l.reward, 0) * multiplier);
      const rewardEarned = Math.round(required.filter((l) => isDone(l.id)).reduce((s, l) => s + l.reward, 0) * multiplier);
      const minutesLeft = required.filter((l) => !isDone(l.id)).reduce((s, l) => s + (l.duration || 2), 0);
      const floor: Floor = {
        number,
        zone: zoneOfFloor(number).id,
        room: FLOORS[i]?.room ?? `Suite ${number}`,
        title: u.title,
        lessons: required.length,
        unitId: u.id,
        levelTitle: u.levelTitle,
        jeffLine: JEFF_BY_LEVEL[u.level],
        steps,
      };
      return { floor, done, started, complete, rewardTotal, rewardEarned, minutesLeft, nextLessonId: steps.find((s) => !s.done)?.id ?? steps[0]?.id ?? null };
    });
  }, [units, adaptive, isDone, hasStarted, multiplier]);

  // The floor the student is standing on: the lowest unit that is neither
  // complete nor skipped. `?floor=N` overrides it for demos.
  const currentFloor = useMemo(() => {
    const forced = Number(params.get("floor"));
    if (forced >= 1 && forced <= rows.length) return forced;
    const idx = rows.findIndex((r) => !r.complete && !skipped.has(r.floor.number));
    return idx === -1 ? rows.length : idx + 1;
  }, [rows, skipped, params]);

  // Steps on locked floors aren't openable, whatever the lesson gating says.
  const floors = useMemo(
    () =>
      rows.map((r) =>
        r.floor.number > currentFloor && !r.complete
          ? { ...r.floor, steps: r.floor.steps?.map((s) => ({ ...s, unlocked: false })) }
          : r.floor,
      ),
    [rows, currentFloor],
  );

  const stateOf = useCallback(
    (n: number): FloorState => {
      const r = rows[n - 1];
      if (!r) return "locked";
      if (skipped.has(n)) return "skipped";
      if (r.complete || n < currentFloor) return "complete";
      if (n === currentFloor) return r.started ? "in-progress" : "available";
      return "locked";
    },
    [rows, skipped, currentFloor],
  );

  const lessonsDoneOf = useCallback((n: number) => rows[n - 1]?.done ?? 0, [rows]);

  const onEnter = useCallback(
    (f: Floor) => {
      const r = rows[f.number - 1];
      if (r?.nextLessonId) navigate(`/lessons/${r.nextLessonId}`);
    },
    [rows, navigate],
  );
  const onStep = useCallback((_f: Floor, s: Step) => navigate(`/lessons/${s.id}`), [navigate]);

  const onConfirmSkip = useCallback((f: Floor, cost: number) => {
    setSkipped((s) => new Set(s).add(f.number));
    setSpent((v) => v + cost);
  }, []);

  // ── Banner + detail inputs (same sources as the current dashboard) ─────
  const streak = useMemo(() => getStreak(jeffsHistory), [jeffsHistory]);
  const bestStreak = useMemo(() => getBestStreak(jeffsHistory), [jeffsHistory]);
  const totalLessons = rows.reduce((s, r) => s + r.floor.lessons, 0);
  const doneLessons = rows.reduce((s, r) => s + r.done, 0);
  const level = useMemo(
    () => getCurriculumLevel(doneLessons, totalLessons, rows.map((r) => ({ done: r.done, total: r.floor.lessons }))),
    [doneLessons, totalLessons, rows],
  );
  const balance = Math.max(0, Math.round(jeffsBalance) - spent);
  const currentRow = rows[currentFloor - 1];
  const nextStep = currentRow?.floor.steps?.find((st) => !st.done) ?? null;

  // Today's 3 daily missions, read-only (the awarding instance lives on the real dashboard).
  const { missions, completedCount, total: missionsTotal } = useDailyMissions();

  return (
    <div className="min-h-screen bg-background">
      <GameNav />

      {/* Full-bleed like the real dashboard (no container max-width). */}
      <main className="p-4 pb-28 md:pb-6">
        <TowerHeroBanner
          firstName={user?.firstName}
          coins={balance}
          streak={streak}
          bestStreak={bestStreak}
          level={level}
          completedLessons={doneLessons}
          totalLessons={totalLessons}
          missions={missions}
          missionsCompleted={completedCount}
          missionsTotal={missionsTotal}
          nextLabel={nextStep ? `Step ${nextStep.label} · ${nextStep.title}` : null}
          onContinue={() => (currentRow ? onEnter(currentRow.floor) : navigate("/lessons"))}
        />

        {/* ═══ THE TOWER ═══ */}
        <MCard i={1} className="mt-6 mb-2.5 px-1">
          <p className={`${EYEBROW} flex items-center gap-1.5`}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--brand)" }} />
            Your climb
          </p>
        </MCard>
        <MCard i={2}>
          <TowerPath
            floors={floors}
            stateOf={stateOf}
            currentFloor={currentFloor}
            balance={balance}
            lessonsDoneOf={lessonsDoneOf}
            onEnter={onEnter}
            onStep={onStep}
            onConfirmSkip={onConfirmSkip}
            floorExtra={(f) => {
              const r = rows[f.number - 1];
              return r && f.number === currentFloor ? (
                <ThisFloorCard
                  floor={r.floor}
                  done={r.done}
                  rewardEarned={r.rewardEarned}
                  rewardTotal={r.rewardTotal}
                  minutesLeft={r.minutesLeft}
                  nextStep={nextStep}
                  onStep={(st) => onStep(r.floor, st)}
                  statsOnly
                />
              ) : null;
            }}
          />
        </MCard>

      </main>
    </div>
  );
}

/* ── Detail cards ─────────────────────────────────────────────────────────── */

const ThisFloorCard: React.FC<{
  floor: Floor;
  done: number;
  rewardEarned: number;
  rewardTotal: number;
  minutesLeft: number;
  nextStep: Step | null;
  onStep: (s: Step) => void;
  /** Stats only - the floor card next to it already shows the title and next step. */
  statsOnly?: boolean;
}> = ({ floor, done, rewardEarned, rewardTotal, minutesLeft, nextStep, onStep, statsOnly }) => {
  const total = floor.steps?.length ?? floor.lessons;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div className={CARD} style={CARD_STYLE}>
      <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full blur-2xl pointer-events-none" style={{ background: "rgba(var(--brand-rgb),0.10)" }} />
      <div className="relative">
        <p className={EYEBROW}>This floor · Unit {floor.number}</p>
        {!statsOnly && (
          <>
            <p className="font-display text-[20px] font-extrabold tracking-tight leading-tight mt-1">{floor.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{floor.levelTitle}</p>
          </>
        )}

        {/* Step dots: one per lesson, filled as they're done */}
        <div className="mt-3 flex flex-wrap gap-1.5" aria-label={`${done} of ${total} steps done`}>
          {(floor.steps ?? []).map((s) => (
            <span
              key={s.id}
              title={`${s.label} ${s.title}`}
              className={`h-2.5 w-2.5 rounded-full ${s.done ? "bg-success" : s.id === nextStep?.id ? "bg-primary ring-2 ring-primary/30" : "bg-muted"}`}
            />
          ))}
        </div>

        <dl className="mt-4 grid grid-cols-3 gap-1.5">
          <Stat label="Steps" value={`${done}/${total}`} sub={`${pct}%`} />
          <Stat label="Coins" value={compact(rewardEarned)} sub={`of ${compact(rewardTotal)}`} gold />
          <Stat label="Time left" value={`${minutesLeft}m`} sub="approx." />
        </dl>

        {nextStep && !statsOnly && (
          <button
            type="button"
            onClick={() => onStep(nextStep)}
            className="mt-4 w-full flex items-center gap-2.5 rounded-xl border border-primary/25 bg-primary/[0.07] px-3 py-2.5 text-left hover:bg-primary/[0.12] transition-colors"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-[11px] font-bold shrink-0">{nextStep.label.split(".").pop()}</span>
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] font-bold uppercase tracking-wide text-primary">Next step · {nextStep.label}</span>
              <span className="block text-[13px] font-semibold text-foreground truncate">{nextStep.title}</span>
            </span>
            <ArrowRight className="h-4 w-4 text-primary shrink-0" />
          </button>
        )}
      </div>
    </div>
  );
};



const Stat: React.FC<{ label: string; value: string; sub?: string; gold?: boolean; warn?: boolean; icon?: React.ReactNode }> = ({ label, value, sub, gold, warn, icon }) => (
  <div className="rounded-xl bg-muted/50 border border-border/50 px-2.5 py-2 min-w-0">
    <dt className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1 truncate">{icon}{label}</dt>
    <dd className={`mt-0.5 font-display text-[16px] sm:text-[18px] font-extrabold leading-none tabular-nums truncate ${gold ? "text-gold" : warn ? "text-warning" : "text-foreground"}`}>{value}</dd>
    {sub && <dd className="text-[10px] text-muted-foreground mt-0.5 truncate">{sub}</dd>}
  </div>
);


function MCard({ i, children, className }: { i: number; children: React.ReactNode; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}
