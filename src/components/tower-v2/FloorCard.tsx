import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ChevronsUp, CircleCheck, Coins, Lock, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { JeffMascot } from "@/components/JeffMascot";
import { zoneColor, type Floor, type FloorState, type Step, type Zone } from "./towerData";

interface FloorCardProps {
  floor: Floor;
  zone: Zone;
  state: FloorState;
  /** The floor the student is standing on - rendered expanded, with Jeff. */
  isCurrent: boolean;
  /** Lessons done, for the in-progress meter. */
  lessonsDone: number;
  skipCost: number;
  /** Top floor has nowhere to skip to. */
  canSkip: boolean;
  onEnter: () => void;
  onSkip: () => void;
  /** Open one specific step (lesson) on this floor. */
  onStep?: (step: Step) => void;
  /** Hide the staircase list (when the steps are drawn elsewhere, e.g. as rooms). */
  hideSteps?: boolean;
}

/**
 * One floor plate = one curriculum unit. Its sub-steps are the unit's lessons,
 * drawn as a staircase inside the plate. Compact for floors you're not on
 * (tap to peek at the steps); expanded for the floor you are on. The thick
 * bottom edge is the slab - it's what makes the stack read as floors.
 */
export const FloorCard: React.FC<FloorCardProps> = ({ floor, zone, state, isCurrent, lessonsDone, skipCost, canSkip, onEnter, onSkip, onStep, hideSteps = false }) => {
  const reduce = useReducedMotion();
  const [peek, setPeek] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const locked = state === "locked";
  const skipped = state === "skipped";
  const inProgress = state === "in-progress";
  const slab = zoneColor(zone, 38, locked ? 0.25 : 0.85);
  const steps = floor.steps ?? [];
  const hasSteps = steps.length > 0;
  const nextStep = steps.find((s) => !s.done) ?? null;
  const total = hasSteps ? steps.length : floor.lessons;
  const eyebrow = floor.unitId ? `Unit ${floor.number}${floor.levelTitle ? ` · ${floor.levelTitle}` : ""}` : `${floor.room} · ${zone.short}`;
  // Compact rows keep just "Unit N" on phones; the level name returns from sm: up.
  const eyebrowCompact = floor.unitId ? (
    <>Unit {floor.number}{floor.levelTitle && <span className="hidden sm:inline"> · {floor.levelTitle}</span>}</>
  ) : (
    <>{floor.room}<span className="hidden sm:inline"> · {zone.short}</span></>
  );

  // Skipped floors get a hatched plate + dashed frame. Deliberately NOT green
  // and never a checkmark, so "skipped" and "complete" can't be confused.
  const hatch: React.CSSProperties | undefined = skipped
    ? { backgroundImage: "repeating-linear-gradient(135deg, hsl(var(--warning) / 0.12) 0 6px, transparent 6px 14px)" }
    : undefined;

  if (!isCurrent) {
    return (
      <li
        className={cn(
          "relative rounded-2xl bg-card border border-border/70 overflow-hidden",
          locked && "bg-muted/40 border-border/40",
          skipped && "border-2 border-dashed border-warning/70",
        )}
        style={{ borderBottomWidth: skipped ? 2 : 4, borderBottomColor: skipped ? undefined : slab, ...hatch }}
      >
        <button
          type="button"
          onClick={() => hasSteps && setPeek((v) => !v)}
          aria-expanded={hasSteps ? peek : undefined}
          aria-label={`Floor ${floor.number}, ${floor.title}, ${stateLabel(state)}${hasSteps ? `, ${total} steps` : ""}`}
          className={cn("w-full text-left px-4 py-3 flex items-center gap-3.5 min-h-[64px]", hasSteps && "hover:bg-muted/30 transition-colors")}
        >
          <FloorNumber n={floor.number} zone={zone} muted={locked} />
          <div className="min-w-0 flex-1">
            <p className={cn("text-[11px] font-bold uppercase tracking-[0.14em] leading-none truncate", locked ? "text-muted-foreground/70" : "text-muted-foreground")}>{eyebrowCompact}</p>
            <p className={cn("mt-1 text-[15px] font-semibold leading-snug line-clamp-2", locked ? "text-muted-foreground" : "text-foreground")}>{floor.title}</p>
            {hasSteps && (
              <p className="mt-0.5 text-[11px] text-muted-foreground tabular-nums">
                {state === "complete" ? `${total} steps · all done` : skipped ? `${total} steps skipped` : `${total} steps`}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <StateBadge state={state} lessonsDone={lessonsDone} lessons={total} />
            {hasSteps && <ChevronDown className={cn("h-4 w-4 text-muted-foreground/60 transition-transform", peek && "rotate-180")} />}
          </div>
        </button>

        <AnimatePresence initial={false}>
          {peek && hasSteps && (
            <motion.div
              key="steps"
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduce ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <ol className="px-4 pb-3 pt-1.5 flex flex-col gap-1 border-t border-border/50">
                {[...steps].reverse().map((s) => (
                  <StepRow
                    key={s.id}
                    step={s}
                    tone={locked ? "locked" : s.done ? "done" : s.unlocked ? "next" : "later"}
                    onClick={!locked && s.unlocked && onStep ? () => onStep(s) : undefined}
                  />
                ))}
              </ol>
            </motion.div>
          )}
        </AnimatePresence>
      </li>
    );
  }

  const pct = total > 0 ? Math.round((lessonsDone / total) * 100) : 0;

  // Staircase inside the current floor: done steps collapse into one summary
  // row, the next step is highlighted, and only a couple of upcoming steps
  // show until the student asks for the full list.
  const nextIdx = nextStep ? steps.indexOf(nextStep) : steps.length;
  const doneSteps = steps.filter((s) => s.done);
  const upcoming = steps.slice(nextIdx + 1);
  const shownUpcoming = showAll ? upcoming : upcoming.slice(0, 2);
  const hiddenUpcoming = upcoming.length - shownUpcoming.length;

  return (
    <motion.li
      layout={!reduce}
      className="relative rounded-2xl bg-card border-2 border-primary/50 shadow-card-lg px-4 pt-4 pb-4"
      style={{ borderBottomWidth: 5, borderBottomColor: slab }}
      aria-label={`Floor ${floor.number}, ${floor.title}, current floor`}
      aria-current="step"
    >
      {/* Ambient zone glow behind the plate so the current floor feels lit */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ background: `radial-gradient(120% 90% at 100% 0%, ${zoneColor(zone, 55, 0.18)}, transparent 60%)` }}
      />

      <div className="relative">
        <div className="flex items-start gap-3.5">
          <FloorNumber n={floor.number} zone={zone} big />
          <div className="min-w-0 flex-1 pt-0.5">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground leading-none">{eyebrow}</p>
            <h2 className="mt-1.5 font-display text-[19px] sm:text-[21px] font-extrabold leading-tight tracking-tight text-foreground">
              {floor.title}
            </h2>
            <p className="mt-1 text-[13px] text-muted-foreground tabular-nums">
              {lessonsDone > 0 ? `${lessonsDone} of ${total} steps done` : `${total} steps · You're here`}
            </p>
          </div>
        </div>

        {lessonsDone > 0 && (
          <div className="mt-3 h-2 w-full rounded-full bg-muted overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
            <motion.div
              className="h-full rounded-full bg-gradient-primary"
              initial={reduce ? false : { width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        )}

        {/* Jeff standing on the floor, with his one-liner. */}
        <motion.div layoutId="tower-jeff" layout={!reduce} className="mt-3.5 flex items-end gap-2.5">
          <JeffMascot size="lg" mood={inProgress ? "teaching" : "happy"} animate={!reduce} className="shrink-0" />
          <div className="relative flex-1 min-w-0 mb-3 rounded-2xl border border-primary/15 bg-primary/[0.07] px-3 py-2 before:absolute before:-left-[7px] before:bottom-4 before:h-3 before:w-3 before:rotate-45 before:rounded-[2px] before:border-b before:border-l before:border-primary/15 before:bg-[hsl(var(--primary)/0.07)] before:content-['']">
            <p className="relative text-[13px] leading-snug text-foreground/90">{floor.jeffLine ?? zone.jeffLine}</p>
          </div>
        </motion.div>

        {/* The staircase: this floor's steps */}
        {hasSteps && !hideSteps && (
          <div className="mt-3 rounded-xl border border-border/60 bg-background/60 px-2.5 py-2">
            <p className="px-1 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground mb-1.5">Steps on this floor</p>
            <ol className="flex flex-col gap-1">
              {doneSteps.length > 0 && (
                <li>
                  <button
                    type="button"
                    onClick={() => setShowAll((v) => !v)}
                    aria-expanded={showAll}
                    className="w-full flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-[12px] text-muted-foreground hover:bg-muted/60 transition-colors"
                  >
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-success/15 text-success shrink-0"><CircleCheck className="h-3.5 w-3.5" /></span>
                    <span className="flex-1 tabular-nums">{doneSteps.length} {doneSteps.length === 1 ? "step" : "steps"} done</span>
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", showAll && "rotate-180")} />
                  </button>
                  <AnimatePresence initial={false}>
                    {showAll && (
                      <motion.ol
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden flex flex-col gap-1"
                      >
                        {doneSteps.map((s) => (
                          <StepRow key={s.id} step={s} tone="done" onClick={onStep ? () => onStep(s) : undefined} />
                        ))}
                      </motion.ol>
                    )}
                  </AnimatePresence>
                </li>
              )}
              {nextStep && <StepRow step={nextStep} tone="next" onClick={onStep ? () => onStep(nextStep) : undefined} />}
              {shownUpcoming.map((s) => <StepRow key={s.id} step={s} tone="later" />)}
              {hiddenUpcoming > 0 && (
                <li>
                  <button type="button" onClick={() => setShowAll(true)} className="w-full rounded-lg px-2 py-1.5 text-left text-[12px] font-semibold text-primary hover:bg-muted/60 transition-colors">
                    + {hiddenUpcoming} more {hiddenUpcoming === 1 ? "step" : "steps"}
                  </button>
                </li>
              )}
            </ol>
          </div>
        )}

        <div className="mt-3.5 flex flex-col gap-2">
          <button
            type="button"
            onClick={onEnter}
            className="cta-bounce inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary text-primary-foreground text-[15px] font-bold shadow-md transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
          >
            <Play className="h-4 w-4 fill-current" />
            {nextStep ? `${lessonsDone > 0 ? "Continue" : "Start"} · Step ${nextStep.label}` : inProgress ? "Continue this floor" : "Enter this floor"}
          </button>

          <button
            type="button"
            onClick={onSkip}
            disabled={!canSkip}
            className="inline-flex h-11 w-full items-center justify-between gap-2 rounded-xl border border-border bg-background/60 px-3.5 text-[13px] font-semibold text-foreground transition-colors hover:bg-muted/60 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <span className="inline-flex items-center gap-2">
              <ElevatorGlyph className="h-4 w-4 text-muted-foreground" />
              <span className="whitespace-nowrap">{canSkip ? "Skip via elevator" : "Top floor · no elevator"}</span>
            </span>
            {canSkip && (
              <span className="inline-flex items-center gap-1 rounded-lg border border-gold/15 bg-gold/10 px-2 py-1 text-xs font-bold text-gold tabular-nums">
                <Coins className="h-3.5 w-3.5" />
                {skipCost.toLocaleString()}
              </span>
            )}
          </button>
        </div>
      </div>
    </motion.li>
  );
};

/** One step (lesson) row inside a floor. */
const StepRow: React.FC<{ step: Step; tone: "done" | "next" | "later" | "locked"; onClick?: () => void }> = ({ step, tone, onClick }) => {
  const inner = (
    <>
      <span
        className={cn(
          "inline-flex h-5 w-5 items-center justify-center rounded-full shrink-0 text-[10px] font-bold tabular-nums",
          tone === "done" && "bg-success/15 text-success",
          tone === "next" && "bg-primary text-primary-foreground",
          tone === "later" && "bg-muted text-muted-foreground",
          tone === "locked" && "bg-muted text-muted-foreground/60",
        )}
      >
        {tone === "done" ? <CircleCheck className="h-3.5 w-3.5" /> : tone === "locked" ? <Lock className="h-3 w-3" /> : step.label.split(".").pop()}
      </span>
      <span className="text-[11px] font-bold tabular-nums text-muted-foreground shrink-0 w-8">{step.label}</span>
      <span className={cn("flex-1 min-w-0 truncate", tone === "next" ? "font-semibold text-foreground" : tone === "done" ? "text-foreground/80" : "")}>{step.title}</span>
      {tone === "next" && <span className="text-[10px] font-extrabold uppercase tracking-wide text-primary shrink-0">Next</span>}
    </>
  );
  const cls = cn(
    "w-full flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-[13px] transition-colors",
    onClick && "hover:bg-muted/60 cursor-pointer",
    tone === "next" && "bg-primary/[0.08] border border-primary/25",
    (tone === "later" || tone === "locked") && "text-muted-foreground",
  );
  return (
    <li>
      {onClick ? (
        <button type="button" onClick={onClick} className={cls}>{inner}</button>
      ) : (
        <div className={cls}>{inner}</div>
      )}
    </li>
  );
};

const FloorNumber: React.FC<{ n: number; zone: Zone; muted?: boolean; big?: boolean }> = ({ n, zone, muted, big }) => (
  <div
    className={cn(
      "shrink-0 rounded-xl flex items-center justify-center font-display font-extrabold tabular-nums tracking-tight",
      big ? "h-14 w-14 text-[26px]" : "h-11 w-11 text-[19px]",
    )}
    style={
      muted
        ? { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground) / 0.7)" }
        : { background: `linear-gradient(160deg, ${zoneColor(zone, 42)}, ${zoneColor(zone, 30)})`, color: "white", boxShadow: `inset 0 1px 0 ${zoneColor(zone, 85, 0.45)}` }
    }
    aria-hidden
  >
    {n}
  </div>
);

const StateBadge: React.FC<{ state: FloorState; lessonsDone: number; lessons: number }> = ({ state, lessonsDone, lessons }) => {
  if (state === "complete") {
    return (
      <span className="inline-flex items-center gap-1 text-success text-xs font-bold shrink-0" aria-label="Complete">
        <CircleCheck className="h-5 w-5" />
        <span className="hidden min-[400px]:inline">Done</span>
      </span>
    );
  }
  if (state === "skipped") {
    return (
      <span className="inline-flex items-center gap-1 rounded-lg border border-dashed border-warning bg-warning/10 px-1.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-warning shrink-0">
        <ChevronsUp className="h-3.5 w-3.5" />
        Skipped
      </span>
    );
  }
  if (state === "in-progress") {
    const pct = lessons > 0 ? Math.round((lessonsDone / lessons) * 100) : 0;
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary shrink-0" aria-label={`${pct}% done`}>
        <span
          className="h-5 w-5 rounded-full"
          style={{ background: `conic-gradient(hsl(var(--primary)) ${pct}%, hsl(var(--muted)) 0)`, maskImage: "radial-gradient(circle, transparent 52%, black 54%)", WebkitMaskImage: "radial-gradient(circle, transparent 52%, black 54%)" }}
        />
        {pct}%
      </span>
    );
  }
  if (state === "locked") {
    return <Lock className="h-4 w-4 text-muted-foreground/60 shrink-0" aria-label="Locked" />;
  }
  return null;
};

export const stateLabel = (s: FloorState): string =>
  s === "in-progress" ? "In progress" : s.charAt(0).toUpperCase() + s.slice(1);

/** Tiny elevator-doors glyph (lucide has none). */
export const ElevatorGlyph: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M12 3v18" />
    <path d="M8 9l2-2 2 2" transform="translate(-2 0)" />
    <path d="M14 15l2 2 2-2" transform="translate(-2 0)" />
  </svg>
);

export default FloorCard;
