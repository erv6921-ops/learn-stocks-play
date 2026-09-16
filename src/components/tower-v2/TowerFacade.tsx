import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ZONES, floorsInZone, zoneColor, type Floor, type FloorState, type Zone, type ZoneId } from "./towerData";

// The mascot art the app already ships (same file the JeffMascot component uses).
const JEFF_SRC = "/brand/mascot-character.png?v=2";

interface TowerFacadeProps {
  floors: Floor[];
  /** Derived state for every floor, indexed by floor number. */
  stateOf: (floor: number) => FloorState;
  currentFloor: number;
  /** Zone currently shown in the floor list. */
  viewZone: ZoneId;
  onSelectZone: (id: ZoneId) => void;
  /** Wide variant draws the illustrated cutaway building (desktop / scene). */
  wide?: boolean;
  /** Scene mode: a floor is selected and each room is clickable. */
  selectedFloor?: number;
  onSelectFloor?: (floor: number) => void;
  /** Taller rooms with more desks for the big centrepiece building. */
  big?: boolean;
  /** Scene mode: content to open INSIDE the selected floor (the floor expands in place). */
  renderInside?: (floor: Floor) => React.ReactNode;
  className?: string;
}

/**
 * The whole 34-floor building as a facade, penthouse on top, vault at the
 * bottom. One window row per floor: lit = complete, dashed = skipped, half-lit =
 * in progress, dark = locked. Jeff peeks out of the current floor. Tapping a
 * zone block brings that zone into the floor list - this is the "where am I in
 * the building" instrument, so it never scrolls.
 */
export const TowerFacade: React.FC<TowerFacadeProps> = ({ floors, stateOf, currentFloor, viewZone, onSelectZone, wide = false, selectedFloor, onSelectFloor, big = false, renderInside, className }) => {
  const reduce = useReducedMotion();
  const zonesTopDown = [...ZONES].reverse();

  if (wide) {
    return <Building floors={floors} stateOf={stateOf} currentFloor={currentFloor} viewZone={viewZone} onSelectZone={onSelectZone} selectedFloor={selectedFloor} onSelectFloor={onSelectFloor} big={big} renderInside={renderInside} reduce={!!reduce} className={className} />;
  }

  return (
    <div className={cn("flex flex-col items-stretch", className)} aria-label="Tower overview">
      {/* Roof - a little parapet so it reads as a building, not a bar chart. */}
      <div className={cn("flex", wide ? "pl-0" : "justify-center")}>
        <div className={cn("flex flex-col items-center", wide ? "w-[64px]" : "w-[44px]")}>
          <div className="w-[3px] h-3 rounded-full bg-foreground/35" />
          <div className="h-[6px] w-[60%] rounded-t-md bg-foreground/25" />
        </div>
      </div>

      <ol className="flex flex-col gap-[5px]">
        {zonesTopDown.map((zone) => (
          <ZoneBlock
            key={zone.id}
            zone={zone}
            floors={floors}
            stateOf={stateOf}
            currentFloor={currentFloor}
            active={viewZone === zone.id}
            onSelect={() => onSelectZone(zone.id)}
            wide={wide}
            reduce={!!reduce}
          />
        ))}
      </ol>

      {/* Ground line */}
      <div className={cn("mt-1.5 h-[3px] rounded-full bg-foreground/20", wide ? "w-[64px]" : "w-[44px] mx-auto")} />
    </div>
  );
};

interface ZoneBlockProps {
  zone: Zone;
  floors: Floor[];
  stateOf: (floor: number) => FloorState;
  currentFloor: number;
  active: boolean;
  onSelect: () => void;
  wide: boolean;
  reduce: boolean;
}

const ZoneBlock: React.FC<ZoneBlockProps> = ({ zone, floors: allFloors, stateOf, currentFloor, active, onSelect, wide, reduce }) => {
  const floors = [...floorsInZone(zone, allFloors)].reverse(); // top floor first
  const done = floors.filter((f) => stateOf(f.number) === "complete").length;
  const skipped = floors.filter((f) => stateOf(f.number) === "skipped").length;

  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={active}
        aria-label={`${zone.name}, floors ${zone.from} to ${zone.to}`}
        className={cn(
          "group flex items-stretch gap-3 rounded-lg text-left transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
          wide ? "w-full" : "w-[44px] mx-auto",
        )}
      >
        {/* Facade block: tinted masonry with one window per floor */}
        <div
          className={cn(
            "relative shrink-0 rounded-md transition-shadow flex flex-col",
            wide ? "w-[64px] px-[8px] py-[6px] gap-[4px]" : "w-[44px] px-[6px] py-[5px] gap-[3px]",
            active ? "ring-2 ring-primary/70 ring-offset-2 ring-offset-background" : "group-hover:ring-2 group-hover:ring-primary/30 group-hover:ring-offset-2 group-hover:ring-offset-background",
          )}
          style={{
            background: `linear-gradient(180deg, ${zoneColor(zone, 40, 0.55)}, ${zoneColor(zone, 28, 0.7)})`,
            boxShadow: `inset 0 1px 0 ${zoneColor(zone, 80, 0.35)}`,
          }}
        >
          {floors.map((f) => (
            <WindowRow key={f.number} state={stateOf(f.number)} isCurrent={f.number === currentFloor} reduce={reduce} tall={wide} />
          ))}
        </div>

        {wide && (
          <div className="min-w-0 flex-1 flex flex-col justify-center py-0.5">
            <p className={cn("text-[14px] font-bold leading-tight truncate", active ? "text-foreground" : "text-foreground/80")}>{zone.name}</p>
            <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
              Floors {floors[floors.length - 1]?.number}–{floors[0]?.number}
              <span className="mx-1">·</span>
              <span className="tabular-nums">{done}/{floors.length}</span>
              {skipped > 0 && <span className="ml-1 text-warning font-semibold">{skipped} skipped</span>}
            </p>
          </div>
        )}
      </button>
    </li>
  );
};

const WindowRow: React.FC<{ state: FloorState; isCurrent: boolean; reduce: boolean; tall?: boolean }> = ({ state, isCurrent, reduce, tall }) => {
  // Window "lighting" per state. Lit = warm lamp glow (complete). Skipped is a
  // hollow dashed frame, never a lit window, so teachers can spot it from across
  // the room. Locked stays dark glass.
  const base = cn("relative w-full rounded-[2px] transition-colors", tall ? "h-[11px]" : "h-[8px]");
  const style: React.CSSProperties =
    state === "complete"
      ? { background: "hsl(46 95% 68%)", boxShadow: "0 0 6px hsl(46 95% 60% / 0.7)" }
      : state === "in-progress"
        ? { background: "linear-gradient(90deg, hsl(46 95% 68%) 0 50%, hsl(220 25% 18% / 0.7) 50% 100%)" }
        : state === "skipped"
          ? { background: "transparent", border: "1.5px dashed hsl(38 92% 60%)" }
          : state === "available"
            ? { background: "hsl(0 0% 100% / 0.9)" }
            : { background: "hsl(220 25% 14% / 0.7)" };

  return (
    <div className={base} style={style}>
      {isCurrent && (
        <>
          {!reduce && (
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-[2px]"
              style={{ boxShadow: "0 0 0 2px hsl(var(--primary))" }}
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          {reduce && <span aria-hidden className="absolute inset-0 rounded-[2px]" style={{ boxShadow: "0 0 0 2px hsl(var(--primary))" }} />}
          {/* Jeff peeking out of the current floor's window */}
          <img
            src={JEFF_SRC}
            alt=""
            draggable={false}
            className={cn("pointer-events-none absolute object-contain select-none", tall ? "-right-[16px] -top-[7px] h-[22px] w-[22px]" : "-right-[13px] -top-[6px] h-[18px] w-[18px]")}
            style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.35))" }}
          />
        </>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   BUILDING - the wide, illustrated, living facade for the dashboard's left
   column. One continuous tower: sky behind the roof (sun + clouds by day, moon
   + stars at night), parapet, spire with a blinking beacon, a waving flag and a
   steaming vent; a zone band per curriculum level with its name as signage; a
   stone slab between bands; five windows per floor with people in the lit
   ones; a glass elevator shaft whose car (with Jeff aboard) rides between
   floors when the student moves; and a street with a lobby entrance,
   pedestrians and a passing taxi. Every loop is disabled under reduced motion.
   ═══════════════════════════════════════════════════════════════════════════ */

interface BuildingProps {
  floors: Floor[];
  stateOf: (floor: number) => FloorState;
  currentFloor: number;
  viewZone: ZoneId;
  onSelectZone: (id: ZoneId) => void;
  selectedFloor?: number;
  onSelectFloor?: (floor: number) => void;
  big?: boolean;
  renderInside?: (floor: Floor) => React.ReactNode;
  reduce: boolean;
  className?: string;
}

const SHAFT_W = 18; // px - elevator shaft column
const ROW_H = 20; // px - one floor, seen in cutaway
const ROW_H_BIG = 34; // px - scene mode rooms
const GLASS = "hsl(220 25% 14% / 0.75)";

// Tiny deterministic hash so the same windows always have the same tenants.
const hash = (a: number, b: number) => ((a * 73856093) ^ (b * 19349663)) >>> 0;

const Building: React.FC<BuildingProps> = ({ floors, stateOf, currentFloor, viewZone, onSelectZone, selectedFloor, onSelectFloor, big = false, renderInside, reduce, className }) => {
  const zonesTopDown = [...ZONES].reverse().filter((z) => floorsInZone(z, floors).length > 0);
  const top = zonesTopDown[0];

  return (
    <div className={cn("relative pt-14 pb-1", className)} aria-label="The building">
      <Sky reduce={reduce} />

      {/* Side face for depth - a shaded strip skewed along the right edge. */}
      <div
        aria-hidden
        className="absolute right-[-9px] top-[72px] bottom-[52px] w-[9px] origin-top-left skew-y-[-55deg] rounded-tr-sm"
        style={{ background: "linear-gradient(180deg, hsl(220 20% 22%), hsl(220 24% 12%))", opacity: 0.55 }}
      />

      {/* Roof: flag, spire + beacon, vent with steam, machine room, parapet */}
      <div aria-hidden className="relative h-7">
        {/* flag pole + flag */}
        <div className="absolute left-[14px] bottom-[6px] w-[2px] h-[22px] rounded-full bg-foreground/45" />
        <motion.div
          className="absolute left-[16px] bottom-[18px] h-[7px] w-[12px] rounded-r-[2px] origin-left"
          style={{ background: "hsl(var(--primary))" }}
          animate={reduce ? undefined : { skewY: [0, -8, 0, 8, 0], scaleX: [1, 0.92, 1, 0.94, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* spire + beacon */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[6px] w-[3px] h-[20px] rounded-full bg-foreground/45" />
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-[24px] w-[7px] h-[7px] rounded-full"
          style={{ background: "hsl(0 85% 60%)", boxShadow: "0 0 8px hsl(0 85% 60% / 0.9)" }}
          animate={reduce ? undefined : { opacity: [1, 0.25, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* vent + steam puffs */}
        <div className="absolute left-[60%] bottom-[6px] w-[8px] h-[9px] rounded-t-[2px] bg-foreground/40" />
        {!reduce &&
          [0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute left-[60%] bottom-[14px] ml-[1px] h-[6px] w-[6px] rounded-full bg-foreground/25"
              initial={{ y: 0, opacity: 0, scale: 0.6 }}
              animate={{ y: -18, opacity: [0, 0.6, 0], scale: [0.6, 1.4], x: [0, 3, -2] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
            />
          ))}
        {/* elevator machine room */}
        <div className="absolute right-0 bottom-[6px] rounded-t-[3px]" style={{ width: SHAFT_W + 8, height: 10, background: top ? zoneColor(top, 26) : GLASS }} />
        {/* parapet */}
        <div className="absolute inset-x-[-3px] bottom-0 h-[7px] rounded-t-[4px]" style={{ background: top ? zoneColor(top, 22) : GLASS, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)" }} />
      </div>

      {/* Facade */}
      <ol className="relative flex flex-col">
        {zonesTopDown.map((zone, zi) => (
          <Band
            key={zone.id}
            zone={zone}
            floors={[...floorsInZone(zone, floors)].reverse()}
            stateOf={stateOf}
            currentFloor={currentFloor}
            active={viewZone === zone.id}
            onSelect={() => onSelectZone(zone.id)}
            selectedFloor={selectedFloor}
            onSelectFloor={onSelectFloor}
            big={big}
            renderInside={renderInside}
            reduce={reduce}
            last={zi === zonesTopDown.length - 1}
          />
        ))}
      </ol>

      <Street reduce={reduce} />
    </div>
  );
};

/* ── Sky behind the roof: day (sun + clouds) or night (moon + stars) ──────── */
const Sky: React.FC<{ reduce: boolean }> = ({ reduce }) => (
  <div aria-hidden className="absolute inset-x-[-16px] top-[-40px] h-[116px] overflow-hidden rounded-t-3xl pointer-events-none">
    {/* day */}
    <div className="absolute inset-0 dark:hidden" style={{ background: "linear-gradient(180deg, hsl(205 70% 88%), hsl(205 60% 95%) 70%, transparent)" }} />
    <div className="absolute right-[26px] top-[14px] h-[18px] w-[18px] rounded-full dark:hidden" style={{ background: "hsl(46 95% 65%)", boxShadow: "0 0 18px hsl(46 95% 60% / 0.7)" }} />
    {[0, 1].map((i) => (
      <motion.div
        key={i}
        className="absolute dark:hidden"
        style={{ top: i === 0 ? 20 : 44 }}
        initial={{ x: i === 0 ? -60 : 120 }}
        animate={reduce ? undefined : { x: [i === 0 ? -60 : 120, 340] }}
        transition={{ duration: i === 0 ? 46 : 62, repeat: Infinity, ease: "linear", delay: i * -20 }}
      >
        <Cloud scale={i === 0 ? 1 : 0.7} />
      </motion.div>
    ))}
    {/* night */}
    <div className="absolute inset-0 hidden dark:block" style={{ background: "linear-gradient(180deg, hsl(225 40% 10%), hsl(225 35% 14%) 70%, transparent)" }} />
    <div className="absolute right-[30px] top-[12px] h-[16px] w-[16px] rounded-full hidden dark:block" style={{ background: "hsl(48 60% 88%)", boxShadow: "inset -5px -2px 0 hsl(225 40% 12%), 0 0 12px hsl(48 60% 88% / 0.5)" }} />
    {Array.from({ length: 14 }, (_, i) => (
      <motion.span
        key={i}
        className="absolute hidden dark:block h-[2px] w-[2px] rounded-full bg-white"
        style={{ left: `${(hash(i, 7) % 90) + 3}%`, top: 6 + (hash(i, 11) % 50) }}
        animate={reduce ? undefined : { opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 1.6 + (hash(i, 3) % 20) / 10, repeat: Infinity, delay: (hash(i, 5) % 20) / 10, ease: "easeInOut" }}
      />
    ))}
  </div>
);

const Cloud: React.FC<{ scale: number }> = ({ scale }) => (
  <div className="relative" style={{ width: 46 * scale, height: 16 * scale }}>
    <span className="absolute bottom-0 left-0 rounded-full bg-white/90" style={{ width: 46 * scale, height: 10 * scale }} />
    <span className="absolute bottom-[3px] left-[8px] rounded-full bg-white/90" style={{ width: 16 * scale, height: 16 * scale }} />
    <span className="absolute bottom-[2px] left-[22px] rounded-full bg-white/90" style={{ width: 13 * scale, height: 13 * scale }} />
  </div>
);

/* ── One zone band of the facade ─────────────────────────────────────────── */
interface BandProps {
  zone: Zone;
  floors: Floor[]; // top floor first
  stateOf: (floor: number) => FloorState;
  currentFloor: number;
  active: boolean;
  onSelect: () => void;
  selectedFloor?: number;
  onSelectFloor?: (floor: number) => void;
  big: boolean;
  renderInside?: (floor: Floor) => React.ReactNode;
  reduce: boolean;
  last: boolean;
}

const Band: React.FC<BandProps> = ({ zone, floors, stateOf, currentFloor, active, onSelect, selectedFloor, onSelectFloor, big, renderInside, reduce, last }) => {
  const done = floors.filter((f) => stateOf(f.number) === "complete").length;
  const skipped = floors.filter((f) => stateOf(f.number) === "skipped").length;
  const lo = floors[floors.length - 1]?.number;
  const hi = floors[0]?.number;

  return (
    <li className="relative">
      <div
        className={cn("relative px-2 pt-1.5 pb-2", active && "z-10")}
        style={{
          background: `linear-gradient(180deg, ${zoneColor(zone, 40, 0.62)}, ${zoneColor(zone, 28, 0.78)})`,
          boxShadow: active && !onSelectFloor ? `inset 0 0 0 2px hsl(var(--primary)), inset 0 1px 0 ${zoneColor(zone, 80, 0.35)}` : `inset 0 1px 0 ${zoneColor(zone, 80, 0.35)}`,
        }}
      >
        {/* Signage (tap = bring this zone into view) */}
        <button
          type="button"
          onClick={onSelect}
          aria-pressed={active}
          aria-label={`${zone.name}, floors ${lo} to ${hi}, ${done} of ${floors.length} complete`}
          className="flex w-full items-center justify-between gap-2 mb-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
          style={{ paddingRight: SHAFT_W + 6 }}
        >
          <span className={cn(big ? "text-[11px]" : "text-[9px]", "font-extrabold uppercase tracking-[0.16em] leading-none truncate", active ? "text-white" : "text-white/85")} style={{ textShadow: "0 1px 0 rgba(0,0,0,0.35)" }}>
            {zone.name}
          </span>
          <span className="text-[9px] font-bold tabular-nums leading-none text-white/70 shrink-0">
            {lo}–{hi}{skipped > 0 && <span className="text-warning"> · {skipped}⇡</span>}
          </span>
        </button>

        {/* Floors: a cutaway room + the shaft cell */}
        <div className="flex flex-col gap-[3px]">
          {floors.map((f) => {
            const st = stateOf(f.number);
            const isCurrent = f.number === currentFloor;
            const open = renderInside && selectedFloor === f.number;
            return (
              <React.Fragment key={f.number}>
                <div className="flex items-stretch gap-[3px]" style={{ height: big ? ROW_H_BIG : ROW_H }}>
                  <Room
                    zone={zone}
                    state={st}
                    floor={f.number}
                    title={f.title}
                    isCurrent={isCurrent}
                    selected={selectedFloor === f.number}
                    onSelect={onSelectFloor ? () => onSelectFloor(f.number) : undefined}
                    big={big}
                    reduce={reduce}
                  />
                  <ShaftCell isCurrent={isCurrent} floor={f.number} reduce={reduce} />
                </div>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="inside"
                      id={`tower-floor-${f.number}`}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex items-stretch gap-[3px] pt-[3px]">
                        {/* the opened floor - a lit interior (or a shuttered one) wrapping the panel */}
                        <div
                          className="relative flex-1 min-w-0 rounded-[3px] p-2 sm:p-3"
                          style={{
                            background: st === "locked"
                              ? "linear-gradient(180deg, hsl(220 25% 16% / 0.85), hsl(220 25% 11% / 0.9))"
                              : "linear-gradient(180deg, hsl(46 85% 91% / 0.92), hsl(40 70% 84% / 0.95))",
                            boxShadow: st === "locked" ? "inset 0 1px 0 rgba(255,255,255,0.06)" : "inset 0 0 12px hsl(46 95% 70% / 0.5)",
                          }}
                        >
                          {st === "locked" && (
                            <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[3px]" style={{ background: "repeating-linear-gradient(180deg, hsl(220 12% 30% / 0.35) 0 2px, transparent 2px 6px)" }} />
                          )}
                          <div className="relative">{renderInside(f)}</div>
                          {/* floor slab */}
                          <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] rounded-b-[3px]" style={{ background: st === "locked" ? "hsl(220 15% 20%)" : "hsl(28 35% 32%)" }} />
                        </div>
                        {/* the shaft keeps running beside the opened floor */}
                        <span
                          className="relative shrink-0 rounded-[2px]"
                          style={{ width: SHAFT_W, background: "linear-gradient(90deg, hsl(200 30% 30% / 0.55), hsl(200 30% 45% / 0.35), hsl(200 30% 30% / 0.55))", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)" }}
                        >
                          <span className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/15" />
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Stone slab between bands (a cornice) */}
      {!last && (
        <div aria-hidden className="h-[5px] -mx-[2px] rounded-[2px]" style={{ background: `linear-gradient(180deg, ${zoneColor(zone, 55, 0.55)}, ${zoneColor(zone, 30, 0.9)})`, boxShadow: "0 1px 2px rgba(0,0,0,0.35)" }} />
      )}
    </li>
  );
};

/* ── A floor, seen in cutaway: desks, screens, people, zone furniture ─────
   Lit + busy once Jeff has passed (complete), lit with Jeff in it on the
   current floor, shuttered and dark above him (locked). ──────────────────── */
const SHIRTS = ["hsl(210 60% 45%)", "hsl(350 55% 50%)", "hsl(152 45% 38%)", "hsl(265 45% 50%)", "hsl(30 70% 50%)", "hsl(190 50% 40%)"];
const SKIN = ["hsl(28 45% 62%)", "hsl(25 40% 45%)", "hsl(30 35% 30%)", "hsl(32 50% 75%)"];

export interface RoomProps {
  zone: Zone;
  state: FloorState;
  floor: number;
  title?: string;
  isCurrent: boolean;
  selected?: boolean;
  onSelect?: () => void;
  big?: boolean;
  /** Scale of the furniture and people (1 = 20px floors, 1.75 = big building, ~6 = the walk-in stage). */
  zoom?: number;
  /** Hide Jeff (the stage draws its own, larger one). */
  hideJeff?: boolean;
  reduce: boolean;
}

export const Room: React.FC<RoomProps> = ({ zone, state, floor, title, isCurrent, selected = false, onSelect, big = false, zoom, hideJeff = false, reduce }) => {
  const h = hash(floor, 101);
  const lit = state === "complete" || state === "available" || state === "in-progress";
  const locked = state === "locked";
  const skipped = state === "skipped";
  const busy = lit && !skipped; // people at work on every open floor
  const k = zoom ?? (big ? 1.75 : 1);
  const stations = (k > 1 ? 5 : 3) + (h % 2); // workstations per floor
  const Tag: "button" | "span" = onSelect ? "button" : "span";
  const grow: React.CSSProperties = k !== 1 ? { transform: `scale(${k})`, transformOrigin: "bottom left" } : {};
  const wood = lit ? "hsl(28 40% 40%)" : "hsl(220 12% 26%)";
  const screen = lit ? "hsl(200 90% 62%)" : "hsl(220 12% 28%)";
  const animate = !reduce && busy;

  return (
    <Tag
      {...(onSelect ? { type: "button" as const, onClick: onSelect, "aria-pressed": selected, "aria-label": `Floor ${floor}${title ? `, ${title}` : ""}, ${state === "in-progress" ? "in progress" : state}` } : {})}
      className={cn(
        "relative flex-1 overflow-hidden rounded-[2px] text-left",
        onSelect && "cursor-pointer focus-visible:outline-none transition-[filter] hover:brightness-110",
        skipped && "border border-dashed border-warning/80",
      )}
      style={{
        background: lit
          ? "linear-gradient(180deg, hsl(46 85% 91% / 0.92), hsl(40 70% 84% / 0.95))"
          : "linear-gradient(180deg, hsl(220 25% 16% / 0.85), hsl(220 25% 11% / 0.9))",
        boxShadow: selected
          ? "inset 0 0 0 2px hsl(var(--primary)), 0 0 0 2px hsl(var(--primary) / 0.35)"
          : lit ? "inset 0 0 8px hsl(46 95% 70% / 0.5)" : "inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* floor number plate by the door */}
      {big && (
        <span className={cn("absolute left-[3px] top-[2px] rounded-[2px] px-[4px] text-[9px] font-extrabold leading-[12px] tabular-nums z-[5]", lit ? "bg-black/20 text-black/70" : "bg-white/10 text-white/60")}>
          {floor}
        </span>
      )}
      {/* floor slab */}
      <span className="absolute inset-x-0 bottom-0 h-[2px]" style={{ background: lit ? "hsl(28 35% 32%)" : "hsl(220 15% 20%)" }} />
      {/* ceiling lamp line */}
      {lit && <span className="absolute inset-x-[8%] top-[1px] h-px" style={{ background: "hsl(46 95% 55% / 0.6)" }} />}

      {/* zone furniture */}
      <Furniture zone={zone.id} lit={lit} seed={h} zoom={k} />

      {/* workstations */}
      {Array.from({ length: stations }, (_, i) => {
        const x = (k > 1 ? 10 : 8) + i * (76 / stations) + (hash(floor, i) % 4); // % from left
        const seed = hash(floor, i + 7);
        return (
          <span key={i} className="absolute bottom-[2px]" style={{ left: `${x}%`, ...grow }}>
            {/* desk */}
            <span className="absolute bottom-0 left-0 h-[5px] w-[13px] rounded-[1px]" style={{ background: wood }} />
            <span className="absolute bottom-[5px] left-[1px] h-[4px] w-[5px] rounded-[1px]" style={{ background: screen, boxShadow: lit ? `0 0 4px ${screen}` : "none" }} />
            {zone.id === "trading" && <span className="absolute bottom-[5px] left-[7px] h-[4px] w-[5px] rounded-[1px]" style={{ background: screen, boxShadow: lit ? `0 0 4px ${screen}` : "none" }} />}
            {/* worker on the chair (only once Jeff has passed) */}
            {busy && (
              <motion.span
                className="absolute bottom-[3px] left-[9px] flex flex-col items-center"
                animate={animate ? { y: [0, -1, 0] } : undefined}
                transition={{ duration: 0.9 + (seed % 10) / 10, repeat: Infinity, delay: (seed % 20) / 10, ease: "easeInOut" }}
              >
                <span className="rounded-full" style={{ width: 4, height: 4, background: SKIN[seed % SKIN.length] }} />
                <span className="rounded-t-[2px]" style={{ width: 6, height: 5, background: SHIRTS[seed % SHIRTS.length], marginTop: 0.5 }} />
              </motion.span>
            )}
          </span>
        );
      })}

      {/* someone walking across on a few busy floors */}
      {busy && h % 4 === 0 && (
        <motion.span
          className="absolute bottom-[2px]"
          initial={{ left: "10%" }}
          animate={reduce ? undefined : { left: ["10%", "85%", "10%"], scaleX: [1, 1, -1, -1, 1] }}
          transition={{ duration: 14 + (h % 6), repeat: Infinity, ease: "linear", delay: -(h % 9) }}
        >
          <span className="block" style={grow}><Walker tone={SHIRTS[(h >> 3) % SHIRTS.length]} reduce={reduce} small /></span>
        </motion.span>
      )}

      {/* Jeff standing on the current floor */}
      {isCurrent && !hideJeff && (
        <motion.img
          src={JEFF_SRC}
          alt=""
          draggable={false}
          className="pointer-events-none absolute bottom-[1px] object-contain select-none z-10"
          style={{ left: "44%", height: 16 * k, width: 16 * k, filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.35))" }}
          animate={reduce ? undefined : { y: [0, -2, 0], rotate: [-4, 4, -4] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Locked: roller shutter down + padlock */}
      {locked && (
        <>
          <span
            className="absolute inset-0"
            style={{ background: "repeating-linear-gradient(180deg, hsl(220 12% 30% / 0.85) 0 2px, hsl(220 12% 20% / 0.85) 2px 4px)" }}
          />
          <span className="absolute right-[4px] top-1/2 -translate-y-1/2 h-[6px] w-[5px] rounded-[1px]" style={{ background: "hsl(46 60% 55%)", transform: `translateY(-50%) scale(${Math.min(k, 3)})`, transformOrigin: "center" }}>
            <span className="absolute -top-[3px] left-[1px] h-[3px] w-[3px] rounded-t-full border border-b-0" style={{ borderColor: "hsl(46 60% 55%)" }} />
          </span>
        </>
      )}
      {skipped && <span className="absolute inset-0" style={{ background: "repeating-linear-gradient(135deg, hsl(38 92% 60% / 0.18) 0 3px, transparent 3px 8px)" }} />}
    </Tag>
  );
};

/* Furniture that tells you which part of the building you're in. */
const Furniture: React.FC<{ zone: ZoneId; lit: boolean; seed: number; zoom?: number }> = ({ zone, lit, seed, zoom = 1 }) => {
  const dim = lit ? 1 : 0.45;
  const big = zoom !== 1;
  const grow: React.CSSProperties = big ? { transform: `scale(${zoom})`, transformOrigin: "bottom left" } : {};
  const plant = (left: string) => (
    <span className="absolute bottom-[2px]" style={{ left, opacity: dim, ...grow }}>
      <span className="absolute bottom-0 left-[1px] h-[3px] w-[4px] rounded-[1px]" style={{ background: "hsl(20 40% 40%)" }} />
      <span className="absolute bottom-[2px] -left-[1px] h-[6px] w-[8px] rounded-full" style={{ background: "hsl(140 45% 38%)" }} />
    </span>
  );
  switch (zone) {
    case "vault":
      return (
        <>
          {/* safe */}
          <span className="absolute bottom-[2px] right-[6%] h-[9px] w-[9px] rounded-[1px]" style={{ background: "hsl(220 12% 40%)", opacity: dim, ...grow }}>
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[4px] w-[4px] rounded-full border" style={{ borderColor: "hsl(46 60% 60%)" }} />
          </span>
          {/* bars */}
          <span className="absolute inset-y-[3px] left-[2%] w-[6px]" style={{ backgroundImage: "repeating-linear-gradient(90deg, hsl(220 12% 45%) 0 1px, transparent 1px 3px)", opacity: dim, ...grow }} />
        </>
      );
    case "lobby":
      return (
        <>
          <span className="absolute bottom-[2px] left-[2%] h-[6px] w-[22%] rounded-t-[2px]" style={{ background: "hsl(28 35% 45%)", opacity: dim, ...grow }} />
          {plant("88%")}
        </>
      );
    case "cubicles":
      return (
        <>
          {[26, 50, 74].map((x) => (
            <span key={x} className="absolute bottom-[2px] h-[9px] w-[2px]" style={{ left: `${x}%`, background: "hsl(220 10% 55%)", opacity: dim, ...grow }} />
          ))}
        </>
      );
    case "trading":
      return (
        <span className="absolute inset-x-[4%] top-[2px] h-[2px]" style={{ backgroundImage: "repeating-linear-gradient(90deg, hsl(152 60% 45%) 0 4px, transparent 4px 6px, hsl(0 70% 55%) 6px 9px, transparent 9px 12px)", opacity: dim, backgroundPositionX: seed % 12 }} />
      );
    case "research":
      return (
        <>
          <span className="absolute bottom-[2px] right-[3%] h-[10px] w-[10px] rounded-[1px]" style={{ background: "hsl(28 35% 35%)", backgroundImage: "repeating-linear-gradient(180deg, transparent 0 2px, hsl(200 40% 55%) 2px 3px)", opacity: dim, ...grow }} />
          <span className="absolute top-[2px] left-[3%] h-[5px] w-[12px] rounded-[1px] border" style={{ background: "white", borderColor: "hsl(220 10% 60%)", opacity: dim, ...(big ? { transform: `scale(${zoom})`, transformOrigin: "top left" } : {}) }} />
        </>
      );
    case "exec":
      return (
        <>
          <span className="absolute bottom-[2px] left-[40%] h-[5px] w-[24%] rounded-[1px]" style={{ background: "hsl(20 45% 30%)", opacity: dim, ...grow }} />
          {plant("4%")}
          <span className="absolute top-[2px] right-[4%] h-[6px] w-[14px]" style={{ backgroundImage: "repeating-linear-gradient(180deg, hsl(200 30% 70%) 0 1px, transparent 1px 2px)", opacity: dim, ...(big ? { transform: `scale(${zoom})`, transformOrigin: "top right" } : {}) }} />
        </>
      );
    case "penthouse":
      return (
        <>
          <span className="absolute bottom-[2px] left-[8%] h-[5px] w-[18%] rounded-t-[3px]" style={{ background: "hsl(345 45% 45%)", opacity: dim, ...grow }} />
          {plant("70%")}
          {plant("90%")}
          <span className="absolute top-[2px] left-[45%] h-[3px] w-[3px] rounded-full" style={{ background: "hsl(46 95% 65%)", boxShadow: lit ? "0 0 4px hsl(46 95% 60%)" : "none", opacity: dim }} />
        </>
      );
    default:
      return null;
  }
};

/* ── The elevator shaft cell; the car rides between floors via layoutId ─── */
const ShaftCell: React.FC<{ isCurrent: boolean; floor: number; reduce: boolean }> = ({ isCurrent, floor, reduce }) => (
  <span
    className="relative shrink-0 rounded-[2px]"
    style={{
      width: SHAFT_W,
      background: "linear-gradient(90deg, hsl(200 30% 30% / 0.55), hsl(200 30% 45% / 0.35), hsl(200 30% 30% / 0.55))",
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)",
    }}
  >
    <span className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/15" />
    {isCurrent && (
      <motion.span
        layoutId="tower-elevator-car"
        layout={!reduce}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="absolute inset-[1px] rounded-[2px] z-10"
        style={{ background: "linear-gradient(180deg, hsl(46 95% 75%), hsl(42 90% 55%))", boxShadow: "0 0 10px hsl(46 95% 60% / 0.9)" }}
      >
        <span className="absolute left-1/2 top-[2px] bottom-[2px] w-px -translate-x-1/2 bg-black/25" />
        <span className="sr-only">Elevator at floor {floor}</span>
      </motion.span>
    )}
  </span>
);

/* ── A little person: head + shoulders silhouette (lobby windows) ────────── */
const Person: React.FC<{ left: number; tone: string; size: number; sway: boolean; seed: number }> = ({ left, tone, size, sway, seed }) => {
  const head = Math.max(3, Math.round(size * 0.34));
  const body = Math.max(4, Math.round(size * 0.5));
  return (
    <motion.span
      className="absolute bottom-0 flex flex-col items-center"
      style={{ left, width: body + 2 }}
      animate={sway ? { y: [0, -1, 0], x: [0, seed % 2 ? 1 : -1, 0] } : undefined}
      transition={{ duration: 2.2 + (seed % 25) / 10, repeat: Infinity, delay: (seed % 30) / 10, ease: "easeInOut" }}
    >
      <span className="rounded-full" style={{ width: head, height: head, background: tone }} />
      <span className="rounded-t-[3px]" style={{ width: body + 2, height: body, background: tone, marginTop: 1 }} />
    </motion.span>
  );
};

/* ── Street level: lobby, sidewalk with pedestrians, road with a taxi ─────── */
const Street: React.FC<{ reduce: boolean }> = ({ reduce }) => (
  <div aria-hidden className="relative">
    {/* lobby */}
    <div className="relative h-[30px] overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(220 18% 20%), hsl(220 20% 14%))", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)" }}>
      <div className="absolute left-1/2 -translate-x-1/2 top-[3px] h-[6px] w-[52px] rounded-b-[3px]" style={{ background: "repeating-linear-gradient(90deg, hsl(var(--primary)) 0 6px, hsl(var(--primary-glow)) 6px 12px)" }} />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex gap-[2px]">
        <div className="w-[12px] h-[17px] rounded-t-[3px]" style={{ background: "hsl(46 95% 68% / 0.9)", boxShadow: "0 0 8px hsl(46 95% 60% / 0.6)" }} />
        <div className="w-[12px] h-[17px] rounded-t-[3px]" style={{ background: "hsl(46 95% 68% / 0.9)", boxShadow: "0 0 8px hsl(46 95% 60% / 0.6)" }} />
      </div>
      {/* receptionist behind the left lobby window */}
      <div className="absolute left-[10px] bottom-[6px] w-[22px] h-[10px] rounded-[2px] overflow-hidden" style={{ background: "hsl(46 95% 68% / 0.55)" }}>
        <Person left={7} tone="hsl(30 30% 18% / 0.8)" size={9} sway={!reduce} seed={17} />
      </div>
      <div className="absolute left-[38px] bottom-[6px] w-[22px] h-[10px] rounded-[2px]" style={{ background: "hsl(46 95% 68% / 0.55)" }} />
      <div className="absolute right-[10px] bottom-[6px] w-[22px] h-[10px] rounded-[2px]" style={{ background: "hsl(46 95% 68% / 0.55)" }} />
      <div className="absolute right-[38px] bottom-[6px] w-[22px] h-[10px] rounded-[2px] overflow-hidden" style={{ background: "hsl(46 95% 68% / 0.55)" }}>
        <Person left={5} tone="hsl(30 30% 18% / 0.8)" size={9} sway={!reduce} seed={29} />
      </div>
    </div>

    {/* sidewalk with pedestrians */}
    <div className="relative h-[14px] -mx-[10px] overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(220 10% 78%), hsl(220 10% 70%))" }}>
      <div className="absolute inset-x-0 top-0 h-px bg-white/50" />
      {/* planters */}
      <span className="absolute left-[2px] bottom-[2px] w-[14px] h-[11px] rounded-t-full" style={{ background: "hsl(152 45% 40%)" }} />
      <span className="absolute right-[2px] bottom-[2px] w-[14px] h-[11px] rounded-t-full" style={{ background: "hsl(152 45% 40%)" }} />
      {[
        { from: -12, to: 320, dur: 18, delay: 0, tone: "hsl(200 40% 30%)" },
        { from: 320, to: -12, dur: 24, delay: -9, tone: "hsl(345 40% 35%)" },
        { from: -12, to: 320, dur: 30, delay: -20, tone: "hsl(152 40% 28%)" },
      ].map((w, i) => (
        <motion.div
          key={i}
          className="absolute bottom-[1px]"
          initial={{ x: w.from }}
          animate={reduce ? undefined : { x: [w.from, w.to] }}
          transition={{ duration: w.dur, repeat: Infinity, ease: "linear", delay: w.delay }}
        >
          <Walker tone={w.tone} reduce={reduce} />
        </motion.div>
      ))}
    </div>

    {/* road with a taxi */}
    <div className="relative h-[12px] -mx-[10px] overflow-hidden rounded-b-[6px]" style={{ background: "hsl(220 12% 24%)" }}>
      <div className="absolute inset-x-0 top-1/2 h-px" style={{ backgroundImage: "repeating-linear-gradient(90deg, hsl(46 90% 60% / 0.7) 0 8px, transparent 8px 16px)" }} />
      <motion.div
        className="absolute bottom-[1px]"
        initial={{ x: 330 }}
        animate={reduce ? undefined : { x: [330, -40] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
      >
        <Taxi />
      </motion.div>
    </div>
  </div>
);

const Walker: React.FC<{ tone: string; reduce: boolean; small?: boolean }> = ({ tone, reduce, small }) => (
  <motion.div
    className={cn("relative", small ? "w-[6px] h-[10px] scale-[0.85] origin-bottom" : "w-[7px] h-[12px]")}
    animate={reduce ? undefined : { y: [0, -1, 0] }}
    transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
  >
    <span className="absolute top-0 left-1/2 -translate-x-1/2 h-[4px] w-[4px] rounded-full" style={{ background: tone }} />
    <span className="absolute top-[4px] left-1/2 -translate-x-1/2 h-[6px] w-[5px] rounded-t-[2px]" style={{ background: tone }} />
    <motion.span className="absolute bottom-0 left-[1px] h-[3px] w-[2px]" style={{ background: tone }} animate={reduce ? undefined : { x: [0, 2, 0] }} transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }} />
    <motion.span className="absolute bottom-0 right-[1px] h-[3px] w-[2px]" style={{ background: tone }} animate={reduce ? undefined : { x: [0, -2, 0] }} transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }} />
  </motion.div>
);

const Taxi: React.FC = () => (
  <div className="relative w-[26px] h-[10px]">
    <span className="absolute bottom-[2px] inset-x-0 h-[6px] rounded-[2px]" style={{ background: "hsl(46 95% 55%)" }} />
    <span className="absolute bottom-[6px] left-[6px] w-[13px] h-[4px] rounded-t-[2px]" style={{ background: "hsl(46 95% 55%)" }} />
    <span className="absolute bottom-[6px] left-[8px] w-[4px] h-[3px] rounded-[1px]" style={{ background: "hsl(200 40% 30%)" }} />
    <span className="absolute bottom-[6px] left-[13px] w-[4px] h-[3px] rounded-[1px]" style={{ background: "hsl(200 40% 30%)" }} />
    <span className="absolute bottom-[8px] left-[11px] w-[4px] h-[2px] rounded-[1px]" style={{ background: "hsl(220 20% 20%)" }} />
    <span className="absolute bottom-0 left-[4px] w-[4px] h-[4px] rounded-full" style={{ background: "hsl(220 20% 15%)" }} />
    <span className="absolute bottom-0 right-[4px] w-[4px] h-[4px] rounded-full" style={{ background: "hsl(220 20% 15%)" }} />
    <span className="absolute bottom-[3px] left-0 w-[2px] h-[2px] rounded-full" style={{ background: "hsl(0 90% 55%)" }} />
    <span className="absolute bottom-[3px] right-0 w-[2px] h-[2px] rounded-full" style={{ background: "hsl(46 100% 80%)" }} />
  </div>
);

export default TowerFacade;
