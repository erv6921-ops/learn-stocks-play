import React, { useEffect, useMemo, useRef, useState } from "react";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";
import { toast } from "sonner";
import { Check, ChevronsUp, Coins, Flag, Lock, Play, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { ElevatorDialog } from "./ElevatorDialog";
import { BuildingFloor, FINISH } from "./BuildingFloor";
import { ElevatorGlyph } from "./FloorCard";
import { ElevatorDigits, Legend } from "./TowerView";
import { JeffMascot } from "@/components/JeffMascot";
import { ZONES, floorsInZone, zoneColor, zoneOfFloor, type Floor, type FloorState, type Step } from "./towerData";

const JEFF_SRC = "/brand/mascot-character.png?v=2";

/* ═══════════════════════════════════════════════════════════════════════════
   TOWER PATH - one clear trail to the top.
   A single winding path of lesson nodes climbs the building from the lobby to
   the roof. Each floor (unit) is a landing with a banner; its lessons are the
   stepping stones above it. Done stones are filled, the next one is big with
   Jeff standing on it, everything above is grey until you get there. Skipped
   floors stay amber and dashed. The trail lives in its own scroll window that
   opens on your next step, so 35 floors never scroll under you all at once.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface TowerPathProps {
  floors: Floor[];
  stateOf: (floor: number) => FloorState;
  currentFloor: number;
  balance: number;
  lessonsDoneOf: (floor: number) => number;
  onEnter: (floor: Floor) => void;
  onStep: (floor: Floor, step: Step) => void;
  onConfirmSkip: (floor: Floor, cost: number) => void;
  /** Extra detail for the current floor (e.g. coins / time), rendered under its card. */
  floorExtra?: (floor: Floor) => React.ReactNode;
  className?: string;
}

// Duolingo-style zig-zag: horizontal offset per node, walking up the path.
const WAVE = [0, 1, 2, 1, 0, -1, -2, -1];
const STEP_X = 40; // px per wave unit
const NODE = 64; // px node diameter
const BUILDING_W = 236; // px - the cutaway building beside the trail (sm and up)

export const TowerPath: React.FC<TowerPathProps> = ({ floors, stateOf, currentFloor, balance, lessonsDoneOf, onEnter, onStep, onConfirmSkip, floorExtra, className }) => {
  const reduce = useReducedMotion();
  const topFloor = floors.length;
  const [skipOpen, setSkipOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const current = floors[currentFloor - 1] ?? floors[0];
  const currentZone = zoneOfFloor(currentFloor);
  const nextFloor = floors[currentFloor] ?? null;
  const skipCost = currentZone.skipCost;
  const nextStep = current.steps?.find((s) => !s.done) ?? null;
  const climbPct = Math.round(((currentFloor - 1) / topFloor) * 100);

  // Global node index from the bottom of the tower, so the zig-zag is continuous.
  const baseIndex = useMemo(() => {
    const map: Record<number, number> = {};
    let n = 0;
    for (const f of floors) { map[f.number] = n; n += (f.steps?.length ?? 0) + 1; }
    return map;
  }, [floors]);

  // Open the trail on your next step.
  useEffect(() => {
    const el = scrollRef.current?.querySelector<HTMLElement>("[data-current-node='true']");
    el?.scrollIntoView({ block: "center", behavior: "auto" });
  }, [currentFloor]);

  const jumpTo = (floorNumber: number) => {
    scrollRef.current?.querySelector<HTMLElement>(`#path-floor-${floorNumber}`)?.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
  };

  const confirmSkip = () => {
    if (!nextFloor) return;
    setSkipOpen(false);
    onConfirmSkip(current, skipCost);
    toast(`Elevator arrived at Floor ${nextFloor.number} · ${nextFloor.title}`, { description: `Floor ${current.number} is marked Skipped. You can come back any time.` });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className={className}>
        {/* Elevator indicator strip */}
        <header className="hud-panel border border-white/10 px-4 py-3.5 sm:px-5 sm:py-4">
          <div className="relative z-10 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">InvestiPlay Tower</p>
              <div className="mt-1 flex items-end gap-2.5">
                <span className="text-[13px] font-semibold text-white/70 pb-[7px]">Floor</span>
                <ElevatorDigits value={currentFloor} />
                <span className="text-[13px] font-semibold text-white/50 pb-[7px] tabular-nums">of {topFloor}</span>
                <span className="hidden sm:inline text-[14px] font-semibold text-white/85 pb-[7px] truncate">
                  · {currentZone.name} <span className="text-white/45 font-normal">· {current.title}</span>
                </span>
              </div>
            </div>
            <p className="text-[11px] text-white/60 text-right leading-tight shrink-0">
              <span className="text-white font-bold tabular-nums">{climbPct}%</span> of the way up
            </p>
          </div>
          <div className="relative z-10 mt-3 flex gap-1" aria-hidden>
            {ZONES.map((z) => {
              const zf = floorsInZone(z, floors);
              if (zf.length === 0) return null;
              const done = zf.filter((f) => f.number < currentFloor).length;
              return (
                <div key={z.id} className="h-1.5 rounded-full bg-white/[0.16] overflow-hidden" style={{ flex: zf.length }}>
                  <motion.div className="h-full rounded-full" style={{ background: zoneColor(z, 62) }} initial={false} animate={{ width: `${(done / zf.length) * 100}%` }} transition={{ duration: reduce ? 0 : 0.5, ease: "easeOut" }} />
                </div>
              );
            })}
          </div>
        </header>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-5">
          {/* ── The trail ─────────────────────────────────────────────────── */}
          <section className="min-w-0" aria-label="Your path to the top">
            {/* Zone jump chips */}
            <div className="mb-2.5 flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 [scrollbar-width:none]">
              {[...ZONES].reverse().map((z) => {
                const zf = floorsInZone(z, floors);
                if (zf.length === 0) return null;
                const here = z.id === currentZone.id;
                const cleared = zf.every((f) => f.number < currentFloor);
                return (
                  <button
                    key={z.id}
                    type="button"
                    onClick={() => jumpTo(zf[0].number)}
                    className={cn(
                      "shrink-0 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-colors",
                      here ? "border-primary bg-primary text-primary-foreground" : cleared ? "border-border bg-card text-foreground/80 hover:bg-muted" : "border-border/60 bg-card/60 text-muted-foreground hover:bg-muted/60",
                    )}
                  >
                    <span className="h-2 w-2 rounded-full" style={{ background: zoneColor(z, 50) }} />
                    {z.short}
                    {cleared && <Check className="h-3 w-3 text-success" />}
                  </button>
                );
              })}
            </div>

            <div
              ref={scrollRef}
              className="relative h-[70vh] min-h-[520px] overflow-y-auto overscroll-contain rounded-3xl border border-border/70 bg-card shadow-card [scrollbar-width:thin]"
            >
              {/* Roof */}
              <div className="relative" style={{ background: "linear-gradient(180deg, hsl(205 60% 92% / 0.7), transparent)" }}>
                {/* the building's roof, above the left column */}
                <div aria-hidden className="hidden sm:block absolute left-0 bottom-0 top-8" style={{ width: BUILDING_W }}>
                  <span className="absolute left-[10%] bottom-0 w-[2px] h-[38px] bg-foreground/40" />
                  <span className="absolute left-[calc(10%+2px)] bottom-[28px] h-[8px] w-[16px]" style={{ background: "hsl(var(--primary))" }} />
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[3px] h-[26px] rounded-full bg-foreground/40" />
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-[28px] h-[8px] w-[8px] rounded-full" style={{ background: "hsl(0 85% 60%)", boxShadow: "0 0 8px hsl(0 85% 60% / 0.9)" }} />
                  <span className="absolute inset-x-[4px] bottom-0 h-[10px] rounded-t-[4px]" style={{ background: zoneColor(ZONES[ZONES.length - 1], 26) }} />
                </div>
                <div className={cn("flex flex-col items-center justify-center gap-1 py-8 text-center", "sm:ml-[var(--bw)]")} style={{ ["--bw" as string]: `${BUILDING_W}px` }}>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold border border-gold/30"><Flag className="h-5 w-5" /></span>
                  <p className="font-display text-base font-extrabold tracking-tight">The Roof</p>
                  <p className="text-xs text-muted-foreground">Finish every floor to plant your flag up here.</p>
                </div>
              </div>

              {/* Floors, top of the tower first */}
              {[...floors].reverse().map((f) => (
                <FloorSection
                  key={f.number}
                  floor={f}
                  state={stateOf(f.number)}
                  isCurrent={f.number === currentFloor}
                  lessonsDone={lessonsDoneOf(f.number)}
                  baseIndex={baseIndex[f.number] ?? 0}
                  reduce={!!reduce}
                  onStep={(s) => onStep(f, s)}
                  onSkip={f.number === currentFloor && f.number < topFloor ? () => setSkipOpen(true) : undefined}
                  skipCost={skipCost}
                />
              ))}

              {/* Lobby */}
              <div className="relative border-t border-border/60" style={{ background: "linear-gradient(0deg, hsl(220 15% 20% / 0.08), transparent)" }}>
                <div aria-hidden className="hidden sm:block absolute left-0 top-0 bottom-0 overflow-hidden" style={{ width: BUILDING_W, background: "linear-gradient(180deg, hsl(220 18% 22%), hsl(220 20% 14%))" }}>
                  <span className="absolute left-1/2 -translate-x-1/2 top-[8px] h-[8px] w-[60%] rounded-b-[4px]" style={{ background: "repeating-linear-gradient(90deg, hsl(var(--primary)) 0 8px, hsl(var(--primary-glow)) 8px 16px)" }} />
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-[16px] flex gap-[3px]">
                    <span className="h-[44px] w-[22px] rounded-t-[4px]" style={{ background: "hsl(46 95% 68% / 0.9)", boxShadow: "0 0 12px hsl(46 95% 60% / 0.6)" }} />
                    <span className="h-[44px] w-[22px] rounded-t-[4px]" style={{ background: "hsl(46 95% 68% / 0.9)", boxShadow: "0 0 12px hsl(46 95% 60% / 0.6)" }} />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 h-[16px]" style={{ background: "linear-gradient(180deg, hsl(220 10% 78%), hsl(220 10% 70%))" }} />
                  <span className="absolute left-[8%] bottom-[16px] h-[14px] w-[18px] rounded-t-full" style={{ background: "hsl(152 45% 40%)" }} />
                  <span className="absolute right-[8%] bottom-[16px] h-[14px] w-[18px] rounded-t-full" style={{ background: "hsl(152 45% 40%)" }} />
                </div>
                <div className="flex flex-col items-center justify-center gap-1 py-8 text-center sm:ml-[var(--bw)]" style={{ ["--bw" as string]: `${BUILDING_W}px` }}>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/25"><ElevatorGlyph className="h-5 w-5" /></span>
                  <p className="font-display text-base font-extrabold tracking-tight">The Lobby</p>
                  <p className="text-xs text-muted-foreground">Everyone starts here. Floor 1 is right above you.</p>
                </div>
              </div>
            </div>

            {/* Phone: sticky continue bar */}
            <div className="lg:hidden sticky bottom-3 mt-3 z-20">
              <button
                type="button"
                onClick={() => onEnter(current)}
                className="w-full inline-flex h-12 items-center justify-between gap-3 rounded-2xl bg-gradient-primary px-4 text-primary-foreground shadow-card-lg press-scale"
              >
                <span className="min-w-0 text-left">
                  <span className="block text-[10px] font-bold uppercase tracking-wide text-white/70">{nextStep ? `Next · Step ${nextStep.label}` : `Floor ${currentFloor}`}</span>
                  <span className="block text-[14px] font-extrabold truncate">{nextStep ? nextStep.title : current.title}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-bold shrink-0"><Play className="h-4 w-4 fill-current" /> Continue</span>
              </button>
            </div>
          </section>

          {/* ── Side card: where you are ──────────────────────────────────── */}
          <aside className="space-y-4 lg:sticky lg:top-3 self-start">
            <div className="relative rounded-2xl bg-card border-2 border-primary/50 shadow-card-lg px-4 pt-4 pb-4 overflow-hidden" style={{ borderBottomWidth: 5, borderBottomColor: zoneColor(currentZone, 38, 0.85) }}>
              <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(120% 90% at 100% 0%, ${zoneColor(currentZone, 55, 0.18)}, transparent 60%)` }} />
              <div className="relative">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground leading-none">You're on floor {currentFloor} · {currentZone.name}</p>
                <h2 className="mt-1.5 font-display text-[21px] font-extrabold leading-tight tracking-tight">{current.title}</h2>
                <p className="mt-1 text-[13px] text-muted-foreground tabular-nums">{lessonsDoneOf(currentFloor)} of {current.steps?.length ?? current.lessons} steps done</p>
                <div className="mt-2.5 h-2 w-full rounded-full bg-muted overflow-hidden">
                  <motion.div className="h-full rounded-full bg-gradient-primary" initial={false} animate={{ width: `${current.steps?.length ? (lessonsDoneOf(currentFloor) / current.steps.length) * 100 : 0}%` }} transition={{ duration: 0.5 }} />
                </div>

                <div className="mt-3.5 flex items-end gap-2.5">
                  <JeffMascot size="lg" mood={lessonsDoneOf(currentFloor) > 0 ? "teaching" : "happy"} animate={!reduce} className="shrink-0" />
                  <div className="relative flex-1 min-w-0 mb-3 rounded-2xl border border-primary/15 bg-primary/[0.07] px-3 py-2 before:absolute before:-left-[7px] before:bottom-4 before:h-3 before:w-3 before:rotate-45 before:rounded-[2px] before:border-b before:border-l before:border-primary/15 before:bg-[hsl(var(--primary)/0.07)] before:content-['']">
                    <p className="relative text-[13px] leading-snug text-foreground/90">{current.jeffLine ?? currentZone.jeffLine}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onEnter(current)}
                  className="cta-bounce mt-1 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary text-primary-foreground text-[15px] font-bold shadow-md transition-transform active:scale-[0.98]"
                >
                  <Play className="h-4 w-4 fill-current" />
                  {nextStep ? `${lessonsDoneOf(currentFloor) > 0 ? "Continue" : "Start"} · Step ${nextStep.label}` : "Enter this floor"}
                </button>
                {currentFloor < topFloor && (
                  <button
                    type="button"
                    onClick={() => setSkipOpen(true)}
                    className="mt-2 inline-flex h-11 w-full items-center justify-between gap-2 rounded-xl border border-border bg-background/60 px-3.5 text-[13px] font-semibold text-foreground transition-colors hover:bg-muted/60"
                  >
                    <span className="inline-flex items-center gap-2"><ElevatorGlyph className="h-4 w-4 text-muted-foreground" /> Skip this floor via elevator</span>
                    <span className="inline-flex items-center gap-1 rounded-lg border border-gold/15 bg-gold/10 px-2 py-1 text-xs font-bold text-gold tabular-nums"><Coins className="h-3.5 w-3.5" />{skipCost.toLocaleString()}</span>
                  </button>
                )}
              </div>
            </div>

            {floorExtra && floorExtra(current)}
            <Legend />
          </aside>
        </div>

        <ElevatorDialog open={skipOpen} onOpenChange={setSkipOpen} floor={current} zone={currentZone} nextFloor={nextFloor} cost={skipCost} balance={balance} onConfirm={confirmSkip} />
      </div>
    </MotionConfig>
  );
};

/* ── One floor of the trail: a landing banner + its stepping stones ──────── */
const FloorSection: React.FC<{
  floor: Floor;
  state: FloorState;
  isCurrent: boolean;
  lessonsDone: number;
  baseIndex: number;
  reduce: boolean;
  onStep: (s: Step) => void;
  onSkip?: () => void;
  skipCost: number;
}> = ({ floor, state, isCurrent, lessonsDone, baseIndex, reduce, onStep, onSkip, skipCost }) => {
  const zone = zoneOfFloor(floor.number);
  const steps = floor.steps ?? [];
  const locked = state === "locked";
  const skipped = state === "skipped";
  const total = steps.length || floor.lessons;
  const nextId = steps.find((s) => !s.done)?.id ?? null;

  return (
    <section id={`path-floor-${floor.number}`} className="relative scroll-mt-2" aria-label={`Floor ${floor.number}, ${floor.title}`}>
      {/* Faint building interior behind the stones: window grid in the zone tint */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 1px 1px, ${zoneColor(zone, 40, locked ? 0.08 : 0.16)} 1.5px, transparent 0), linear-gradient(180deg, ${zoneColor(zone, 45, locked ? 0.05 : 0.12)}, ${zoneColor(zone, 45, locked ? 0.03 : 0.07)})`,
          backgroundSize: "26px 26px, 100% 100%",
        }}
      />
      {/* Big floor number watermark */}
      <span aria-hidden className="pointer-events-none absolute right-4 top-16 font-display text-[112px] font-extrabold leading-none tabular-nums select-none" style={{ color: zoneColor(zone, 40, 0.10) }}>
        {floor.number}
      </span>

      {/* The building: this floor's room stays in view while you climb its stones;
          the structure (wall + slabs) runs on beneath it. */}
      <div
        className="hidden sm:block absolute left-0 top-0 bottom-0 z-[1]"
        style={{
          width: BUILDING_W,
          background: `repeating-linear-gradient(180deg, transparent 0 84px, rgba(0,0,0,0.14) 84px 90px), linear-gradient(180deg, ${FINISH[zone.id].wallDark}, ${FINISH[zone.id].wallDark})`,
          boxShadow: `inset -1px 0 0 rgba(0,0,0,0.15), inset 8px 0 0 ${zoneColor(zone, 32)}`,
        }}
      >
        <div className="sticky top-0" style={{ height: "min(340px, 100%)" }}>
          <BuildingFloor zone={zone} floor={floor.number} state={state} reduce={reduce} className="h-full rounded-b-[6px] shadow-[0_6px_10px_rgba(0,0,0,0.25)]" />
        </div>
      </div>

      {/* Stones, last step at the top */}
      <ol className="relative flex flex-col items-center gap-7 pt-9 pb-8 sm:ml-[var(--bw)]" style={{ ["--bw" as string]: `${BUILDING_W}px` }}>
        {[...steps].reverse().map((s, ri) => {
          const i = steps.length - 1 - ri; // index from the bottom of this floor
          const wave = WAVE[(baseIndex + 1 + i) % WAVE.length];
          const tone: "done" | "next" | "later" | "locked" | "skipped" = locked ? "locked" : s.done ? "done" : s.id === nextId ? (skipped ? "skipped" : "next") : "later";
          return (
            <Stone key={s.id} step={s} tone={tone} zone={zone} x={wave * STEP_X} isCurrentFloor={isCurrent} reduce={reduce} onClick={() => {
              if (tone === "done" || tone === "next" || tone === "skipped") onStep(s);
              else if (tone === "later") toast(`Finish step ${steps[steps.indexOf(s) - 1]?.label ?? ""} first.`);
              else toast(`Floor ${floor.number} opens when you finish floor ${floor.number - 1}.`);
            }} />
          );
        })}
      </ol>

      {/* Landing banner - sticks while you climb this floor's stones */}
      <div
        className={cn("sticky bottom-0 z-10 mx-3 mb-3 sm:ml-[calc(var(--bw)+12px)] rounded-2xl px-4 py-3 text-white shadow-card", skipped && "ring-2 ring-warning/80 ring-offset-1")}
        style={{ ["--bw" as string]: `${BUILDING_W}px`, background: locked ? "linear-gradient(135deg, hsl(220 15% 32%), hsl(220 15% 24%))" : `linear-gradient(135deg, ${zoneColor(zone, 42)}, ${zoneColor(zone, 30)})` }}
      >
        <div className="flex items-center gap-3">
          <span className="shrink-0 h-10 w-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center font-display font-extrabold text-lg tabular-nums">{floor.number}</span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/65">Floor {floor.number} · {zone.name}{floor.levelTitle ? ` · ${floor.levelTitle}` : ""}</p>
            <p className="font-display text-[15px] font-extrabold leading-tight truncate">{floor.title}</p>
            <p className="text-[11px] text-white/70 tabular-nums">{locked ? `${total} steps · locked` : skipped ? `${total} steps · skipped by elevator` : `${lessonsDone}/${total} steps done`}</p>
          </div>
          {state === "complete" && <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20"><Check className="h-4 w-4" strokeWidth={3} /></span>}
          {locked && <Lock className="h-4 w-4 text-white/70" />}
          {skipped && <span className="inline-flex items-center gap-1 rounded-lg border border-dashed border-white/70 bg-white/15 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide"><ChevronsUp className="h-3 w-3" /> Skipped</span>}
          {onSkip && (
            <button type="button" onClick={onSkip} className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 px-2.5 py-1.5 text-[11px] font-bold transition-colors">
              <ElevatorGlyph className="h-3.5 w-3.5" /> Skip <span className="inline-flex items-center gap-0.5 text-gold"><Coins className="h-3 w-3" />{skipCost.toLocaleString()}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

/* ── A stepping stone (lesson node) ──────────────────────────────────────── */
const Stone: React.FC<{ step: Step; tone: "done" | "next" | "later" | "locked" | "skipped"; zone: ReturnType<typeof zoneOfFloor>; x: number; isCurrentFloor: boolean; reduce: boolean; onClick: () => void }> = ({ step, tone, zone, x, isCurrentFloor, reduce, onClick }) => {
  const isNext = tone === "next";
  const face =
    tone === "done"
      ? { bg: `linear-gradient(180deg, ${zoneColor(zone, 48)}, ${zoneColor(zone, 40)})`, edge: zoneColor(zone, 28), fg: "white" }
      : isNext
        ? { bg: "var(--gradient-primary)", edge: "hsl(var(--primary) / 0.7)", fg: "hsl(var(--primary-foreground))" }
        : tone === "skipped"
          ? { bg: "hsl(var(--warning) / 0.15)", edge: "hsl(var(--warning) / 0.6)", fg: "hsl(var(--warning))" }
          : { bg: "hsl(var(--muted))", edge: "hsl(var(--border))", fg: "hsl(var(--muted-foreground) / 0.7)" };

  return (
    <li className="relative" style={{ transform: `translateX(${x}px)` }}>
      {/* Jeff stands beside your next stone (opposite side to the label) */}
      {isNext && isCurrentFloor && (
        <motion.img
          src={JEFF_SRC}
          alt=""
          draggable={false}
          className={cn("pointer-events-none absolute bottom-[10px] h-[60px] w-[60px] object-contain select-none z-10", x > 0 ? "-right-[64px]" : "-left-[64px]")}
          style={{ filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.25))", transformOrigin: "center bottom" }}
          animate={reduce ? undefined : { y: [0, -5, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      {/* Label bubble beside your next stone */}
      {isNext && (
        <div className={cn("absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl bg-card border border-primary/30 px-3 py-1.5 shadow-card z-10", x > 0 ? "right-[calc(100%+14px)] text-right" : "left-[calc(100%+14px)] text-left")}>
          <p className="text-[10px] font-bold uppercase tracking-wide text-primary">Next · Step {step.label}</p>
          <p className="text-[12px] font-semibold text-foreground max-w-[180px] truncate">{step.title}</p>
          <span className={cn("absolute top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-card border-primary/30", x > 0 ? "-right-[7px] border-t border-r" : "-left-[7px] border-b border-l")} />
        </div>
      )}
      <button
        type="button"
        onClick={onClick}
        data-current-node={isNext && isCurrentFloor ? "true" : undefined}
        aria-label={`Step ${step.label}, ${step.title}, ${tone === "next" ? "next" : tone}`}
        aria-current={isNext && isCurrentFloor ? "step" : undefined}
        className={cn(
          "relative flex items-center justify-center rounded-full transition-transform active:translate-y-[3px] active:[border-bottom-width:3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
          tone === "skipped" && "border-2 border-dashed",
        )}
        style={{ width: NODE, height: NODE, background: face.bg, color: face.fg, borderBottom: `6px solid ${face.edge}`, borderColor: tone === "skipped" ? face.edge : undefined, boxShadow: isNext ? "0 0 0 6px hsl(var(--primary) / 0.15)" : undefined }}
      >
        {!reduce && isNext && (
          <motion.span aria-hidden className="absolute inset-0 rounded-full" style={{ boxShadow: "0 0 0 0 hsl(var(--primary) / 0.45)" }} animate={{ boxShadow: ["0 0 0 0 hsl(var(--primary) / 0.45)", "0 0 0 14px hsl(var(--primary) / 0)"] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }} />
        )}
        {tone === "done" ? <Check className="h-7 w-7" strokeWidth={3} /> : isNext ? <Star className="h-7 w-7 fill-current" /> : tone === "skipped" ? <ChevronsUp className="h-6 w-6" /> : <Lock className="h-5 w-5" />}
        <span className="absolute -bottom-[22px] text-[10px] font-bold tabular-nums text-muted-foreground">{step.label}</span>
      </button>
    </li>
  );
};

export default TowerPath;
