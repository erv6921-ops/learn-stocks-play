// ─────────────────────────────────────────────────────────────────────────────
// STANDALONE VISUAL MOCK — Tower map UI. Throwaway. Route: /tower-preview
// Self-contained: no Supabase, no auth, no shared components, all data hardcoded.
// Safe to delete this whole file + its one route line in App.tsx.
// ─────────────────────────────────────────────────────────────────────────────
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Lock, Check, ChevronUp, ChevronDown, Building2, ArrowUpToLine, Loader2, Circle, DoorOpen,
} from "lucide-react";

// ── Zone model ───────────────────────────────────────────────────────────────
type ZoneId = "vault" | "lobby" | "cubicles" | "trading" | "research" | "exec" | "penthouse";

interface Zone {
  id: ZoneId;
  name: string;
  min: number; // lowest floor number
  max: number; // highest floor number
  theme: string;
  // Distinct flat Tailwind accent per zone (light + dark). Kept as full class
  // strings so Tailwind's JIT keeps them.
  tintBg: string; // card / bar tint
  tintBorder: string;
  tintText: string;
  tintDot: string; // solid accent (elevator lit state, current chip)
}

// Bottom (vault) → top (penthouse).
const ZONES: Zone[] = [
  { id: "vault",     name: "The Vault",   min: 1,  max: 4,  theme: "Money basics, banking, saving",
    tintBg: "bg-amber-500/10",  tintBorder: "border-amber-500/40",  tintText: "text-amber-700 dark:text-amber-300",  tintDot: "bg-amber-500" },
  { id: "lobby",     name: "The Lobby",   min: 5,  max: 9,  theme: "Income, paychecks, taxes",
    tintBg: "bg-lime-500/10",   tintBorder: "border-lime-500/40",   tintText: "text-lime-700 dark:text-lime-300",    tintDot: "bg-lime-500" },
  { id: "cubicles",  name: "The Cubicles", min: 10, max: 14, theme: "Credit, debt, insurance, risk",
    tintBg: "bg-orange-500/10", tintBorder: "border-orange-500/40", tintText: "text-orange-700 dark:text-orange-300", tintDot: "bg-orange-500" },
  { id: "trading",   name: "The Trading Floor", min: 15, max: 19, theme: "Markets, stocks, orders",
    tintBg: "bg-emerald-500/10", tintBorder: "border-emerald-500/40", tintText: "text-emerald-700 dark:text-emerald-300", tintDot: "bg-emerald-500" },
  { id: "research",  name: "Research", min: 20, max: 24, theme: "Analysis, valuation, diversification",
    tintBg: "bg-sky-500/10",    tintBorder: "border-sky-500/40",    tintText: "text-sky-700 dark:text-sky-300",      tintDot: "bg-sky-500" },
  { id: "exec",      name: "Executive Suite", min: 25, max: 29, theme: "Retirement, real estate, strategy",
    tintBg: "bg-violet-500/10", tintBorder: "border-violet-500/40", tintText: "text-violet-700 dark:text-violet-300", tintDot: "bg-violet-500" },
  { id: "penthouse", name: "The Penthouse", min: 30, max: 34, theme: "Wealth building, legacy, giving",
    tintBg: "bg-fuchsia-500/10", tintBorder: "border-fuchsia-500/40", tintText: "text-fuchsia-700 dark:text-fuchsia-300", tintDot: "bg-fuchsia-500" },
];

// ── Floor content (invented placeholder titles + room labels) ────────────────
interface FloorDef {
  floor: number;
  room: string;
  title: string;
}
const FLOOR_DEFS: FloorDef[] = [
  // Vault 1-4
  { floor: 1, room: "Coin room", title: "What money is and why it works" },
  { floor: 2, room: "Deposit box", title: "Bank accounts and how they hold your cash" },
  { floor: 3, room: "Teller window", title: "Saving and interest" },
  { floor: 4, room: "Safe-deposit hall", title: "Emergency funds and rainy-day cash" },
  // Lobby 5-9
  { floor: 5, room: "Reception desk", title: "Where income comes from" },
  { floor: 6, room: "Payroll office", title: "Reading your first paycheck" },
  { floor: 7, room: "Break room", title: "Gross vs net and take-home pay" },
  { floor: 8, room: "Records room", title: "Taxes, W-2s, and withholding" },
  { floor: 9, room: "Benefits counter", title: "Perks, 401(k) match, and paid time off" },
  // Cubicles 10-14
  { floor: 10, room: "Credit desk", title: "How credit and credit scores work" },
  { floor: 11, room: "Loan cubicle", title: "Debt, interest, and paying it down" },
  { floor: 12, room: "Collections corner", title: "Avoiding the debt spiral" },
  { floor: 13, room: "Insurance booth", title: "Insurance and protecting what you have" },
  { floor: 14, room: "Risk desk", title: "Managing everyday financial risk" },
  // Trading floor 15-19
  { floor: 15, room: "Ticker wall", title: "How markets actually work" },
  { floor: 16, room: "Stock pit", title: "What a share of stock really is" },
  { floor: 17, room: "Order desk", title: "Placing your first trade" },
  { floor: 18, room: "Quote board", title: "Bids, asks, and order types" },
  { floor: 19, room: "Settlement room", title: "Fees, spreads, and settling trades" },
  // Research 20-24
  { floor: 20, room: "Analyst bay", title: "Reading a company's numbers" },
  { floor: 21, room: "Valuation lab", title: "What a company is worth" },
  { floor: 22, room: "Chart room", title: "Trends, ratios, and comparisons" },
  { floor: 23, room: "Portfolio studio", title: "Diversification and spreading risk" },
  { floor: 24, room: "Rebalancing desk", title: "Keeping a portfolio on target" },
  // Executive suite 25-29
  { floor: 25, room: "Corner office", title: "Long-term investing strategy" },
  { floor: 26, room: "Property desk", title: "Real estate and owning a home" },
  { floor: 27, room: "Pension room", title: "Retirement accounts and compounding" },
  { floor: 28, room: "Boardroom", title: "Building a lifelong plan" },
  { floor: 29, room: "Strategy suite", title: "Tax-advantaged strategy" },
  // Penthouse 30-34
  { floor: 30, room: "Sky lounge", title: "Growing serious wealth" },
  { floor: 31, room: "Legacy hall", title: "Estate planning and wills" },
  { floor: 32, room: "Trust office", title: "Trusts and passing wealth on" },
  { floor: 33, room: "Giving room", title: "Philanthropy and giving back" },
  { floor: 34, room: "The Summit", title: "Financial independence" },
];

const zoneOf = (floor: number): Zone => ZONES.find((z) => floor >= z.min && floor <= z.max) ?? ZONES[0];

// ── Floor state ──────────────────────────────────────────────────────────────
type FloorState = "locked" | "available" | "in-progress" | "complete" | "skipped";

// Derive each floor's state from the current floor + any forced overrides.
function deriveState(floor: number, current: number, overrides: Record<number, FloorState>): FloorState {
  if (overrides[floor]) return overrides[floor];
  if (floor < current) return "complete";
  if (floor === current) return "available";
  return "locked";
}

const MOBILE_W = 390;

export default function TowerPreview() {
  const prefersReduced = useReducedMotion();
  const [current, setCurrent] = useState(17); // dev-controlled "current floor"
  const [overrides, setOverrides] = useState<Record<number, FloorState>>({});
  const [expanded, setExpanded] = useState<ZoneId>(() => zoneOf(17).id);
  const [mobile, setMobile] = useState(false);
  const [elevatorOpen, setElevatorOpen] = useState(false); // mobile elevator sheet

  // Skip-confirm dialog target floor (null = closed).
  const [skipTarget, setSkipTarget] = useState<number | null>(null);
  const FAKE_BALANCE = 1240;
  const FAKE_SKIP_COST = 300;

  const expandedRef = useRef<HTMLDivElement | null>(null);

  // On mount (and whenever current floor changes from the dev slider) expand the
  // zone containing the current floor and center it with no animation.
  useEffect(() => {
    setExpanded(zoneOf(current).id);
  }, [current]);

  useLayoutEffect(() => {
    expandedRef.current?.scrollIntoView({ block: "center" });
    // run once on mount for the initial centering
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const zoneProgress = useCallback(
    (z: Zone) => {
      let done = 0;
      for (let f = z.min; f <= z.max; f++) {
        const s = deriveState(f, current, overrides);
        if (s === "complete" || s === "skipped") done++;
      }
      return { done, total: z.max - z.min + 1 };
    },
    [current, overrides],
  );

  const zoneStatus = useCallback(
    (z: Zone): "cleared" | "current" | "locked" => {
      if (current > z.max) return "cleared";
      if (current < z.min) return "locked";
      return "current";
    },
    [current],
  );

  const setForced = (floor: number, state: FloorState | null) =>
    setOverrides((o) => {
      const next = { ...o };
      if (state === null) delete next[floor];
      else next[floor] = state;
      return next;
    });

  const goToZone = (z: Zone) => {
    if (zoneStatus(z) === "locked") return;
    setExpanded(z.id);
    setElevatorOpen(false);
    requestAnimationFrame(() => {
      document.getElementById(`zone-${z.id}`)?.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "center" });
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ═══════════════════════════════════════════════════════════════════
          DEV CONTROL STRIP — throwaway. DELETE THIS <section> before shipping.
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="sticky top-0 z-40 border-b border-border bg-muted/95 backdrop-blur px-3 py-2 text-xs">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="font-bold uppercase tracking-wider text-muted-foreground">Dev</span>
          <label className="flex items-center gap-2">
            Current floor
            <input type="range" min={1} max={34} value={current} onChange={(e) => setCurrent(Number(e.target.value))} className="accent-primary" />
            <input type="number" min={1} max={34} value={current}
              onChange={(e) => setCurrent(Math.max(1, Math.min(34, Number(e.target.value) || 1)))}
              className="w-14 rounded border border-border bg-background px-1.5 py-0.5" />
          </label>
          <label className="flex items-center gap-1.5">
            Force floor
            <input type="number" min={1} max={34} defaultValue={current} id="forceFloor"
              className="w-14 rounded border border-border bg-background px-1.5 py-0.5" />
            {(["in-progress", "skipped", "available", "complete"] as FloorState[]).map((st) => (
              <button key={st} onClick={() => {
                const el = document.getElementById("forceFloor") as HTMLInputElement | null;
                const f = Math.max(1, Math.min(34, Number(el?.value) || current));
                setForced(f, st);
              }} className="rounded border border-border px-1.5 py-0.5 hover:bg-accent">{st}</button>
            ))}
            <button onClick={() => setOverrides({})} className="rounded border border-border px-1.5 py-0.5 hover:bg-accent">clear forced</button>
          </label>
          <label className="flex items-center gap-1.5">
            <input type="checkbox" checked={mobile} onChange={(e) => setMobile(e.target.checked)} />
            Preview mobile ({MOBILE_W}px)
          </label>
        </div>
      </section>
      {/* ════════════════════════ END DEV CONTROL STRIP ════════════════════════ */}

      <div className={mobile ? "mx-auto border-x border-dashed border-border" : ""} style={mobile ? { width: MOBILE_W } : undefined}>
        <div className="flex">
          {/* ── Elevator rail (desktop) ── */}
          {!mobile && (
            <ElevatorRail
              zones={ZONES}
              status={zoneStatus}
              expanded={expanded}
              onPick={goToZone}
              className="sticky top-[44px] hidden h-[calc(100vh-44px)] w-40 shrink-0 md:block"
            />
          )}

          {/* ── Tower (top → bottom in DOM; penthouse at the top of the page) ── */}
          <main className="min-w-0 flex-1 px-3 py-4 pb-24 md:pb-6">
            <header className="mb-3 flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-5 w-5" />
              <h1 className="text-sm font-bold uppercase tracking-widest">The Tower · 34 floors</h1>
            </header>

            <div className="space-y-2">
              {[...ZONES].reverse().map((z) => {
                const status = zoneStatus(z);
                const isExpanded = expanded === z.id && status !== "locked";
                const { done, total } = zoneProgress(z);
                return (
                  <div key={z.id} id={`zone-${z.id}`} ref={isExpanded ? expandedRef : undefined}>
                    {isExpanded ? (
                      <ExpandedZone
                        zone={z}
                        current={current}
                        overrides={overrides}
                        onCollapse={() => setExpanded("" as ZoneId)}
                        onSkipRequest={(f) => setSkipTarget(f)}
                        reduced={!!prefersReduced}
                      />
                    ) : (
                      <ZoneBar
                        zone={z}
                        status={status}
                        done={done}
                        total={total}
                        onClick={() => status !== "locked" && setExpanded(z.id)}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>

      {/* ── Mobile elevator: floating button + bottom sheet. Shown on real small
             screens (md:hidden) OR when the dev "Preview mobile" toggle is on. ── */}
      {(
        <>
          <button
            onClick={() => setElevatorOpen(true)}
            className={`fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-lg ${mobile ? "" : "md:hidden"}`}
          >
            <ArrowUpToLine className="h-4 w-4" /> Elevator
          </button>
          <AnimatePresence>
            {elevatorOpen && (
              <motion.div
                className="fixed inset-0 z-50 flex items-end bg-black/40"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setElevatorOpen(false)}
              >
                <motion.div
                  className="w-full rounded-t-2xl border-t border-border bg-card p-3"
                  initial={{ y: prefersReduced ? 0 : 40 }} animate={{ y: 0 }} exit={{ y: prefersReduced ? 0 : 40 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">Elevator</p>
                  <ElevatorRail zones={ZONES} status={zoneStatus} expanded={expanded} onPick={goToZone} className="grid grid-cols-2 gap-2" asGrid />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* ── Skip-floor confirm dialog (fake cost / balance, no network) ── */}
      <AnimatePresence>
        {skipTarget !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSkipTarget(null)}
          >
            <motion.div
              className="w-full max-w-sm rounded-2xl border border-border bg-card p-5 text-card-foreground"
              initial={{ scale: prefersReduced ? 1 : 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-2 flex items-center gap-2">
                <DoorOpen className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-base font-bold">Take the elevator past floor {skipTarget}?</h2>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                Skipping marks this floor done without finishing it. This is a mock — no coins actually move.
              </p>
              <div className="mb-4 space-y-1 rounded-xl bg-muted/60 p-3 text-sm">
                <div className="flex justify-between"><span>Skip cost</span><span className="font-bold">{FAKE_SKIP_COST} coins</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Your balance</span><span>{FAKE_BALANCE} coins</span></div>
                <div className="flex justify-between border-t border-border pt-1"><span>After</span><span className="font-bold">{FAKE_BALANCE - FAKE_SKIP_COST} coins</span></div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setSkipTarget(null)} className="flex-1 rounded-xl border border-border py-2 text-sm font-semibold hover:bg-accent">Cancel</button>
                <button
                  onClick={() => { setForced(skipTarget, "skipped"); setSkipTarget(null); }}
                  className="flex-1 rounded-xl bg-primary py-2 text-sm font-bold text-primary-foreground hover:opacity-90"
                >
                  Skip floor
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Elevator rail ────────────────────────────────────────────────────────────
function ElevatorRail({
  zones, status, expanded, onPick, className, asGrid,
}: {
  zones: Zone[];
  status: (z: Zone) => "cleared" | "current" | "locked";
  expanded: ZoneId;
  onPick: (z: Zone) => void;
  className?: string;
  asGrid?: boolean;
}) {
  return (
    <nav className={className}>
      <div className={asGrid ? "contents" : "flex h-full flex-col gap-1.5 overflow-auto p-2"}>
        {[...zones].reverse().map((z) => {
          const st = status(z);
          const isCurrentExpanded = expanded === z.id;
          const locked = st === "locked";
          return (
            <button
              key={z.id}
              disabled={locked}
              onClick={() => onPick(z)}
              className={[
                "flex items-center gap-2 rounded-xl border px-2.5 py-2 text-left text-xs transition-colors",
                locked ? "cursor-not-allowed border-border/60 opacity-45" : "hover:bg-accent",
                isCurrentExpanded ? "ring-2 ring-primary" : "",
                st === "current" ? `${z.tintBg} ${z.tintBorder}` : "border-border",
              ].join(" ")}
            >
              <span className={["h-2.5 w-2.5 shrink-0 rounded-full", locked ? "bg-muted-foreground/40" : z.tintDot].join(" ")} />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-bold">{z.name}</span>
                <span className="block text-[10px] text-muted-foreground">Fl {z.min}–{z.max}</span>
              </span>
              {locked && <Lock className="h-3.5 w-3.5 text-muted-foreground" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ── Collapsed / locked zone bar (~72px) ──────────────────────────────────────
function ZoneBar({
  zone, status, done, total, onClick,
}: {
  zone: Zone;
  status: "cleared" | "current" | "locked";
  done: number;
  total: number;
  onClick: () => void;
}) {
  const locked = status === "locked";
  return (
    <button
      onClick={onClick}
      disabled={locked}
      className={[
        "flex h-[72px] w-full items-center gap-3 rounded-2xl border px-4 text-left transition-colors",
        locked ? "cursor-not-allowed border-border bg-muted/40 opacity-60" : `${zone.tintBg} ${zone.tintBorder} hover:brightness-105`,
      ].join(" ")}
    >
      <span className={["flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", locked ? "bg-muted" : zone.tintDot].join(" ")}>
        {locked ? <Lock className="h-4 w-4 text-muted-foreground" /> : <Building2 className="h-4 w-4 text-white" />}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className={["truncate font-bold", locked ? "text-muted-foreground" : zone.tintText].join(" ")}>{zone.name}</span>
          <span className="shrink-0 text-xs text-muted-foreground">Fl {zone.min}–{zone.max}</span>
        </div>
        <p className="truncate text-xs text-muted-foreground">
          {locked ? `Reach floor ${zone.min} to unlock` : `${done} / ${total} floors complete · ${zone.theme}`}
        </p>
      </div>
      {locked ? <Lock className="h-4 w-4 shrink-0 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />}
    </button>
  );
}

// ── Expanded zone: full floor cards, lowest floor at the BOTTOM ───────────────
function ExpandedZone({
  zone, current, overrides, onCollapse, onSkipRequest, reduced,
}: {
  zone: Zone;
  current: number;
  overrides: Record<number, FloorState>;
  onCollapse: () => void;
  onSkipRequest: (floor: number) => void;
  reduced: boolean;
}) {
  const floors: number[] = [];
  for (let f = zone.min; f <= zone.max; f++) floors.push(f);
  // Highest floor first in DOM so the LOWEST floor sits at the bottom.
  const topToBottom = [...floors].reverse();

  return (
    <motion.section
      layout={!reduced}
      initial={reduced ? false : { height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      transition={{ duration: reduced ? 0 : 0.22, ease: "easeOut" }}
      className={["overflow-hidden rounded-2xl border p-3", zone.tintBg, zone.tintBorder].join(" ")}
    >
      <div className="mb-3 flex items-center gap-3">
        <span className={["flex h-9 w-9 items-center justify-center rounded-xl", zone.tintDot].join(" ")}>
          <Building2 className="h-4 w-4 text-white" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className={["font-extrabold", zone.tintText].join(" ")}>{zone.name}</h2>
            <span className="text-xs text-muted-foreground">Floors {zone.min}–{zone.max}</span>
          </div>
          <p className="truncate text-xs text-muted-foreground">{zone.theme}</p>
        </div>
        <button onClick={onCollapse} className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent" aria-label="Collapse zone">
          <ChevronUp className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-2">
        {topToBottom.map((f, i) => {
          const def = FLOOR_DEFS[f - 1];
          const state = deriveState(f, current, overrides);
          return (
            <motion.div
              key={f}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.2, ease: "easeOut", delay: reduced ? 0 : i * 0.04 }}
            >
              <FloorCard zone={zone} def={def} state={state} onSkip={() => onSkipRequest(f)} />
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}

// ── Floor card — five visual states ──────────────────────────────────────────
function FloorCard({
  zone, def, state, onSkip,
}: {
  zone: Zone;
  def: FloorDef;
  state: FloorState;
  onSkip: () => void;
}) {
  const locked = state === "locked";
  const meta = STATE_META[state];

  return (
    <div
      className={[
        "flex items-stretch gap-3 rounded-xl border bg-card/80 p-3",
        locked ? "opacity-55" : "",
        state === "available" ? "ring-2 ring-primary" : zone.tintBorder,
      ].join(" ")}
    >
      {/* Big floor number */}
      <div className={["flex w-14 shrink-0 flex-col items-center justify-center rounded-lg", zone.tintBg].join(" ")}>
        <span className={["text-2xl font-black leading-none", zone.tintText].join(" ")}>{def.floor}</span>
        <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Floor</span>
      </div>

      {/* Body */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{def.room}</p>
            <p className="truncate font-bold">{def.title}</p>
          </div>
          <span className={["inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold", meta.badgeClass].join(" ")}>
            <meta.Icon className="h-3 w-3" /> {meta.label}
          </span>
        </div>

        {/* Progress line */}
        <div className="mt-2 flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
            <div className={["h-full rounded-full", meta.barClass].join(" ")} style={{ width: `${meta.pct}%` }} />
          </div>
          <span className="text-[11px] tabular-nums text-muted-foreground">{meta.pct}%</span>
        </div>

        {/* Actions */}
        {state === "available" && (
          <div className="mt-2 flex gap-2">
            <button className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground hover:opacity-90">Enter floor</button>
            <button onClick={onSkip} className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-accent">
              Skip this floor
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Per-state visuals. 'skipped' is deliberately distinct from 'complete':
// elevator/door icon + amber "Skipped" badge, and NEVER a checkmark.
const STATE_META: Record<FloorState, { label: string; Icon: React.ComponentType<{ className?: string }>; badgeClass: string; barClass: string; pct: number }> = {
  locked:       { label: "Locked",      Icon: Lock,      badgeClass: "bg-muted text-muted-foreground",                                   barClass: "bg-muted-foreground/30", pct: 0 },
  available:    { label: "Available",   Icon: Circle,    badgeClass: "bg-primary/15 text-primary",                                       barClass: "bg-primary",             pct: 0 },
  "in-progress":{ label: "In progress", Icon: Loader2,   badgeClass: "bg-blue-500/15 text-blue-600 dark:text-blue-300",                  barClass: "bg-blue-500",            pct: 55 },
  complete:     { label: "Complete",    Icon: Check,     badgeClass: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",         barClass: "bg-emerald-500",         pct: 100 },
  skipped:      { label: "Skipped",     Icon: DoorOpen,  badgeClass: "bg-amber-500/20 text-amber-700 dark:text-amber-300",               barClass: "bg-amber-500",           pct: 100 },
};
