import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import { toast } from "sonner";
import { ArrowDown, ArrowUp, ChevronsUp, CircleCheck, Coins, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { TowerFacade } from "./TowerFacade";
import { FloorCard, ElevatorGlyph } from "./FloorCard";
import { ElevatorDialog } from "./ElevatorDialog";
import { ZONES, floorsInZone, zoneById, zoneColor, zoneOfFloor, type Floor, type FloorState, type Step, type ZoneId } from "./towerData";

/** A stat tile shown inside the hero header (dashboard use). */
export interface TowerStat {
  key: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  /** Text colour for the value. */
  tone?: string;
}

/* ═══════════════════════════════════════════════════════════════════════════
   TOWER VIEW - the building itself (header, facade, zone stage, elevator).
   Data-agnostic: the page that renders it decides where floors, states and the
   coin balance come from (mock in TowerPreviewV2, real app data in TowerInApp).
   ═══════════════════════════════════════════════════════════════════════════ */

export interface TowerViewProps {
  floors: Floor[];
  stateOf: (floor: number) => FloorState;
  currentFloor: number;
  balance: number;
  /** Lessons done on a floor (drives the in-progress meter). */
  lessonsDoneOf: (floor: number) => number;
  onEnter: (floor: Floor) => void;
  /** Called after the student confirms in the elevator dialog. */
  onConfirmSkip: (floor: Floor, cost: number) => void;
  /** Open one specific step (lesson) on a floor. */
  onStep?: (floor: Floor, step: Step) => void;
  /** Dashboard hero: greeting + subline above the floor indicator. */
  greeting?: { title: string; sub?: string; badge?: React.ReactNode };
  /** Dashboard hero: stat tiles under the climb bar. */
  stats?: TowerStat[];
  /** Extra content rendered between the hero and the tower (e.g. daily missions). */
  belowHero?: React.ReactNode;
  /** Slimmer elevator header for when a hero banner already sits above the tower. */
  compactHeader?: boolean;
  /** Full-width 12-column layout (facade 3 / stage 6 / aside 3) for the dashboard. */
  wide?: boolean;
  /** Extra cards under the facade (desktop left column). */
  leftExtra?: React.ReactNode;
  /** Extra cards at the top of the right column (desktop); shown after the stage on phones. */
  asideTop?: React.ReactNode;
  /** Constrain to a phone-width frame (dev preview only). */
  narrow?: boolean;
  className?: string;
}

export const TowerView: React.FC<TowerViewProps> = ({ floors, stateOf, currentFloor, balance, lessonsDoneOf, onEnter, onConfirmSkip, onStep, greeting, stats, belowHero, compactHeader = false, wide = false, leftExtra, asideTop, narrow = false, className }) => {
  const reduce = useReducedMotion();
  const topFloor = floors.length;

  const [viewZone, setViewZone] = useState<ZoneId>(() => zoneOfFloor(currentFloor).id);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [skipOpen, setSkipOpen] = useState(false);

  const selectZone = useCallback((id: ZoneId) => {
    setViewZone((prev) => {
      if (prev === id) return prev;
      setDirection(ZONES.findIndex((x) => x.id === id) > ZONES.findIndex((x) => x.id === prev) ? 1 : -1);
      return id;
    });
  }, []);

  // Follow the student: whenever the current floor moves, bring its zone into view.
  useEffect(() => { selectZone(zoneOfFloor(currentFloor).id); }, [currentFloor, selectZone]);

  // ── Derived ─────────────────────────────────────────────────────────────
  const zone = zoneById(viewZone);
  const zoneIdx = ZONES.findIndex((z) => z.id === viewZone);
  const zoneAbove = ZONES[zoneIdx + 1] ?? null;
  const zoneBelow = ZONES[zoneIdx - 1] ?? null;
  const floorsTopDown = useMemo(() => [...floorsInZone(zone, floors)].reverse(), [zone, floors]);
  const zoneRange = useMemo(() => {
    const fs = floorsInZone(zone, floors);
    return fs.length ? `${fs[0].number}–${fs[fs.length - 1].number}` : "";
  }, [zone, floors]);
  // Secondary line under the zone name: real level titles when wired, else the placeholder theme.
  const zoneSubtitle = useMemo(() => {
    const levels = Array.from(new Set(floorsInZone(zone, floors).map((f) => f.levelTitle).filter((t): t is string => !!t)));
    return levels.length ? levels.join(" · ") : zone.theme;
  }, [zone, floors]);

  const currentZone = zoneOfFloor(currentFloor);
  const current = floors[currentFloor - 1] ?? floors[0];
  const nextFloor = floors[currentFloor] ?? null;
  const skipCost = currentZone.skipCost;
  const climbed = currentFloor - 1;
  const climbPct = Math.round((climbed / topFloor) * 100);
  const skippedCount = floors.filter((f) => stateOf(f.number) === "skipped").length;

  const confirmSkip = () => {
    if (!nextFloor) return;
    setSkipOpen(false);
    onConfirmSkip(current, skipCost);
    toast(`Elevator arrived at Floor ${nextFloor.number} · ${nextFloor.room}`, {
      description: `Floor ${current.number} is marked Skipped. You can come back any time.`,
    });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className={className}>
        {/* ── Header: elevator indicator panel ──────────────────────────── */}
        <header className={cn("hud-panel border border-white/10", compactHeader ? "px-4 py-3.5 sm:px-5 sm:py-4" : "px-4 py-4 sm:px-6 sm:py-5")}>
          {greeting && (
            <div className="relative z-10 mb-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight leading-[1.05] text-white break-words">{greeting.title}</h1>
                {greeting.sub && <p className="mt-1 text-[13px] sm:text-sm text-white/60">{greeting.sub}</p>}
              </div>
              {greeting.badge && <div className="shrink-0">{greeting.badge}</div>}
            </div>
          )}
          <div className="relative z-10 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">InvestiPlay Tower</p>
              <div className="mt-1 flex items-end gap-2.5">
                <span className="text-[13px] font-semibold text-white/70 pb-[7px]">Floor</span>
                <ElevatorDigits value={currentFloor} />
                <span className="text-[13px] font-semibold text-white/50 pb-[7px] tabular-nums">of {topFloor}</span>
              </div>
              <p className="mt-1 text-[14px] font-semibold text-white/85 truncate">
                {currentZone.name}
                <span className={cn("text-white/45 font-normal", narrow ? "hidden" : "hidden sm:inline")}>
                  {" "}· {current.unitId ? `Unit ${current.number}: ${current.title}` : current.room}
                </span>
              </p>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              {/* InvestiCoin pill - same recipe as the app's HUD nav (the banner already shows coins in compact mode) */}
              {!compactHeader && (
                <div className="flex items-center gap-1.5 bg-gold/15 text-gold px-2.5 py-1.5 rounded-xl text-xs font-bold border border-gold/25 shadow-sm tabular-nums">
                  <Coins className="w-3.5 h-3.5 shrink-0" />
                  {balance.toLocaleString()}
                </div>
              )}
              <p className="text-[11px] text-white/60 text-right leading-tight">
                <span className="text-white font-bold tabular-nums">{climbPct}%</span> of the way up
              </p>
            </div>
          </div>

          {/* Climb bar: one segment per zone, filled to the current floor. */}
          <div className="relative z-10 mt-3.5 flex gap-1" aria-hidden>
            {ZONES.map((z) => {
              const zf = floorsInZone(z, floors);
              const n = zf.length;
              if (n === 0) return null;
              const done = zf.filter((f) => f.number < currentFloor).length;
              return (
                <div key={z.id} className="h-1.5 rounded-full bg-white/[0.16] overflow-hidden" style={{ flex: n }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: zoneColor(z, 62) }}
                    initial={false}
                    animate={{ width: `${(done / n) * 100}%` }}
                    transition={{ duration: reduce ? 0 : 0.5, ease: "easeOut" }}
                  />
                </div>
              );
            })}
          </div>

          {stats && stats.length > 0 && (
            <div className="relative z-10 mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {stats.map((st) => (
                <div key={st.key} className="rounded-xl px-3 py-2.5 min-w-0" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/50 flex items-center gap-1.5">
                    <span className="inline-flex h-3.5 w-3.5 items-center justify-center" style={{ color: st.tone ?? "rgba(255,255,255,0.7)" }}>{st.icon}</span>
                    {st.label}
                  </p>
                  <p className="mt-1 font-display text-lg font-extrabold leading-none tabular-nums truncate" style={{ color: st.tone ?? "white" }}>{st.value}</p>
                </div>
              ))}
            </div>
          )}
        </header>

        {belowHero}

        {/* ── Body: facade + zone stage (+ elevator panel on desktop) ──── */}
        <div
          className={cn(
            "mt-4 sm:mt-5 grid gap-3 sm:gap-4",
            narrow
              ? "grid-cols-[56px_minmax(0,1fr)]"
              : wide
                ? "grid-cols-[56px_minmax(0,1fr)] lg:grid-cols-12 lg:gap-4"
                : "grid-cols-[56px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)_280px] lg:gap-8",
          )}
        >
          <div className={cn("pt-1 self-start sticky top-3", wide && "lg:col-span-3")}>
            <TowerFacade floors={floors} stateOf={stateOf} currentFloor={currentFloor} viewZone={viewZone} onSelectZone={selectZone} className={cn(narrow ? "" : "lg:hidden")} />
            {!narrow && (
              <div className={cn("hidden lg:block", wide && "rounded-3xl bg-card border border-border/70 p-4 shadow-card")}>
                {wide && (
                  <p className="relative z-10 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-3">The building</p>
                )}
                <TowerFacade wide floors={floors} stateOf={stateOf} currentFloor={currentFloor} viewZone={viewZone} onSelectZone={selectZone} />
              </div>
            )}
            {!narrow && leftExtra && <div className="hidden lg:block mt-4 space-y-4">{leftExtra}</div>}
          </div>

          {/* Zone stage */}
          <section className={cn("min-w-0", wide && "lg:col-span-6")} aria-label={`${zone.name}, floors ${zoneRange}`}>
            <ZoneNavButton dir="up" target={zoneAbove?.name ?? null} onClick={() => zoneAbove && selectZone(zoneAbove.id)} />

            <div className="mt-2.5 mb-2 flex items-baseline justify-between gap-2 px-1">
              <h1 className="font-display text-[15px] sm:text-base font-extrabold tracking-tight truncate">{zone.name}</h1>
              <p className="text-[11px] font-semibold text-muted-foreground shrink-0 tabular-nums">Floors {zoneRange}</p>
            </div>
            <p className="px-1 -mt-1 mb-3 text-xs text-muted-foreground line-clamp-2">{zoneSubtitle}</p>

            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.ol
                  key={zone.id}
                  custom={direction}
                  variants={stageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-2.5"
                >
                  {floorsTopDown.map((f) => {
                    const s = stateOf(f.number);
                    return (
                      <FloorCard
                        key={f.number}
                        floor={f}
                        zone={zone}
                        state={s}
                        isCurrent={f.number === currentFloor}
                        lessonsDone={lessonsDoneOf(f.number)}
                        skipCost={zone.skipCost}
                        canSkip={f.number < topFloor}
                        onEnter={() => onEnter(f)}
                        onSkip={() => setSkipOpen(true)}
                        onStep={onStep ? (st) => onStep(f, st) : undefined}
                      />
                    );
                  })}
                </motion.ol>
              </AnimatePresence>
            </div>

            <div className="mt-2.5">
              <ZoneNavButton dir="down" target={zoneBelow?.name ?? null} onClick={() => zoneBelow && selectZone(zoneBelow.id)} />
            </div>

            {/* Legend - always visible, so a teacher glancing at a student's
                screen can decode Skipped vs Complete without asking. */}
            {asideTop && <div className={cn("mt-5 space-y-4", !narrow && "lg:hidden")}>{asideTop}</div>}
            <Legend className={cn("mt-5", !narrow && "lg:hidden")} />
          </section>

          {/* Desktop-only elevator panel */}
          {!narrow && (
            <aside className={cn("hidden lg:block space-y-4", wide && "lg:col-span-3")}>
              {asideTop}
              <div className="rounded-2xl bg-card border border-border/70 p-4 shadow-card">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground flex items-center gap-1.5">
                  <ElevatorGlyph className="h-3.5 w-3.5" /> Elevator fares
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Skip a floor with InvestiCoins. The higher you go, the pricier the ride.</p>
                <ul className="mt-3 space-y-1.5">
                  {[...ZONES].reverse().map((z) => (
                    <li key={z.id} className={cn("flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-[13px]", z.id === currentZone.id && "bg-muted/60")}>
                      <span className="inline-flex items-center gap-2 min-w-0">
                        <span className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ background: zoneColor(z, 45) }} />
                        <span className={cn("truncate", z.id === currentZone.id ? "font-bold" : "text-foreground/80")}>{z.short}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 text-gold font-bold tabular-nums text-xs">
                        <Coins className="h-3 w-3" /> {z.skipCost.toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <Legend />
              <div className="rounded-2xl border border-border/60 bg-muted/40 p-4 text-xs text-muted-foreground leading-relaxed">
                <p>
                  <span className="font-bold text-foreground">{climbed}</span> floors climbed · <span className="font-bold text-foreground">{topFloor - currentFloor}</span> to the roof
                  {skippedCount > 0 && <> · <span className="font-bold text-warning">{skippedCount} skipped</span></>}
                </p>
              </div>
            </aside>
          )}
        </div>

        <ElevatorDialog
          open={skipOpen}
          onOpenChange={setSkipOpen}
          floor={current}
          zone={currentZone}
          nextFloor={nextFloor}
          cost={skipCost}
          balance={balance}
          onConfirm={confirmSkip}
        />
      </div>
    </MotionConfig>
  );
};

/* ── Bits ──────────────────────────────────────────────────────────────────── */

// Going up: the new zone drops in from above (the car rises past the floors).
const stageVariants = {
  enter: (d: 1 | -1) => ({ y: d * -28, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (d: 1 | -1) => ({ y: d * 28, opacity: 0 }),
};

const ZoneNavButton: React.FC<{ dir: "up" | "down"; target: string | null; onClick: () => void }> = ({ dir, target, onClick }) => {
  const Icon = dir === "up" ? ArrowUp : ArrowDown;
  if (!target) {
    return (
      <div className="h-10 flex items-center justify-center rounded-xl border border-dashed border-border/70 text-[12px] font-semibold text-muted-foreground/70">
        {dir === "up" ? "Roof · nothing above" : "Ground · nothing below"}
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-10 w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card text-[13px] font-semibold text-foreground hover:bg-muted/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <Icon className="h-4 w-4 text-primary" />
      {dir === "up" ? "Up to" : "Down to"} {target}
    </button>
  );
};

/** Elevator-style rolling floor number. */
export const ElevatorDigits: React.FC<{ value: number }> = ({ value }) => (
  <span className="relative inline-block h-[44px] min-w-[2ch] overflow-hidden font-display text-[40px] font-extrabold leading-[44px] tabular-nums text-white tracking-tight" aria-live="polite">
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={value}
        initial={{ y: 26, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -26, opacity: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="inline-block"
      >
        {value}
      </motion.span>
    </AnimatePresence>
  </span>
);

export const Legend: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("rounded-2xl bg-card border border-border/70 px-4 py-3", className)}>
    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Floor states</p>
    <ul className="mt-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-x-4 gap-y-2 text-[12px]">
      <LegendItem icon={<Lock className="h-3.5 w-3.5 text-muted-foreground" />} label="Locked" />
      <LegendItem icon={<span className="h-3.5 w-3.5 rounded-full border-2 border-primary bg-background" />} label="You're here" />
      <LegendItem icon={<span className="h-3.5 w-3.5 rounded-full" style={{ background: "conic-gradient(hsl(var(--primary)) 45%, hsl(var(--muted)) 0)" }} />} label="In progress" />
      <LegendItem icon={<CircleCheck className="h-4 w-4 text-success" />} label="Complete" />
      <LegendItem icon={<span className="inline-flex h-4 w-4 items-center justify-center rounded border border-dashed border-warning text-warning"><ChevronsUp className="h-3 w-3" /></span>} label="Skipped" />
    </ul>
  </div>
);

const LegendItem: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <li className="flex items-center gap-2 text-foreground/85">
    <span className="inline-flex h-4 w-4 items-center justify-center shrink-0">{icon}</span>
    {label}
  </li>
);

export default TowerView;
