import React, { useMemo, useRef, useState, useEffect, useLayoutEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Lock, CheckCircle, Coins, Plus, Minus, LocateFixed } from "lucide-react";
import { JeffMascot } from "@/components/Jeff/JeffMascot";
import type { UnitInfo } from "@/types";
// @ts-ignore - d3-geo / world-atlas ship no local types; runtime only.
import { geoOrthographic, geoPath, geoGraticule10, geoDistance } from "d3-geo";
// @ts-ignore
import { feature, mesh } from "topojson-client";
// @ts-ignore
import landTopo from "world-atlas/land-110m.json";
// @ts-ignore
import countriesTopo from "world-atlas/countries-110m.json";
// @ts-ignore
import statesTopo from "us-atlas/states-10m.json";

/* ══════════════════════════════════════════════════════════════════════
   MISSIONS - HAND-DRAWN GLOBE OF CENTRAL BANKS
   A round, pencil-sketch planet you can spin & zoom (stays crisp - the map is
   re-projected, never bitmap-scaled). Every unit is a central bank pinned at
   its real spot. Jeff flies the world: all 12 U.S. Federal Reserve banks, then
   the globe spins east to Europe, then Asia.
   ══════════════════════════════════════════════════════════════════════ */

const LAND = feature(landTopo as any, (landTopo as any).objects.land);
const GRAT = geoGraticule10();
// Interior borders only (a !== b skips the outer coastline).
const COUNTRY_LINES = mesh(countriesTopo as any, (countriesTopo as any).objects.countries, (a: any, b: any) => a !== b);
const STATE_LINES = mesh(statesTopo as any, (statesTopo as any).objects.states, (a: any, b: any) => a !== b);

// ── Bank roster, in journey order: 12 U.S. Fed → Europe → Asia ─────────
type BankStyle = "classic" | "dome" | "pagoda";
interface Bank { city: string; name: string; flag: string; lon: number; lat: number; style: BankStyle; }
const BANKS: Bank[] = [
  { city: "Boston",        name: "1st District Fed",  flag: "🦞", lat: 42.36, lon: -71.06, style: "classic" },
  { city: "New York",      name: "2nd District Fed",  flag: "🗽", lat: 40.71, lon: -74.01, style: "classic" },
  { city: "Philadelphia",  name: "3rd District Fed",  flag: "🔔", lat: 39.95, lon: -75.17, style: "classic" },
  { city: "Cleveland",     name: "4th District Fed",  flag: "🏭", lat: 41.50, lon: -81.69, style: "classic" },
  { city: "Richmond",      name: "5th District Fed",  flag: "🏛️", lat: 37.54, lon: -77.44, style: "classic" },
  { city: "Atlanta",       name: "6th District Fed",  flag: "🍑", lat: 33.75, lon: -84.39, style: "classic" },
  { city: "Chicago",       name: "7th District Fed",  flag: "🌆", lat: 41.88, lon: -87.63, style: "classic" },
  { city: "St. Louis",     name: "8th District Fed",  flag: "🎷", lat: 38.63, lon: -90.20, style: "classic" },
  { city: "Minneapolis",   name: "9th District Fed",  flag: "❄️", lat: 44.98, lon: -93.27, style: "classic" },
  { city: "Kansas City",   name: "10th District Fed", flag: "🌾", lat: 39.10, lon: -94.58, style: "classic" },
  { city: "Dallas",        name: "11th District Fed", flag: "🤠", lat: 32.78, lon: -96.80, style: "classic" },
  { city: "San Francisco", name: "12th District Fed", flag: "🌁", lat: 37.77, lon: -122.42, style: "classic" },
  { city: "London",     name: "Bank of England",       flag: "🇬🇧", lat: 51.51, lon: -0.13, style: "dome" },
  { city: "Paris",      name: "Banque de France",      flag: "🇫🇷", lat: 48.85, lon: 2.35, style: "dome" },
  { city: "Amsterdam",  name: "De Nederlandsche",      flag: "🇳🇱", lat: 52.37, lon: 4.90, style: "dome" },
  { city: "Brussels",   name: "Nat. Bank Belgium",     flag: "🇧🇪", lat: 50.85, lon: 4.35, style: "dome" },
  { city: "Frankfurt",  name: "European Central Bank", flag: "🇪🇺", lat: 50.11, lon: 8.68, style: "dome" },
  { city: "Zurich",     name: "Swiss National Bank",   flag: "🇨🇭", lat: 47.37, lon: 8.54, style: "dome" },
  { city: "Vienna",     name: "Oesterreichische NB",   flag: "🇦🇹", lat: 48.21, lon: 16.37, style: "dome" },
  { city: "Rome",       name: "Banca d'Italia",        flag: "🇮🇹", lat: 41.90, lon: 12.50, style: "dome" },
  { city: "Madrid",     name: "Banco de España",       flag: "🇪🇸", lat: 40.42, lon: -3.70, style: "dome" },
  { city: "Warsaw",     name: "Narodowy Bank Polski",  flag: "🇵🇱", lat: 52.23, lon: 21.01, style: "dome" },
  { city: "Stockholm",  name: "Sveriges Riksbank",     flag: "🇸🇪", lat: 59.33, lon: 18.07, style: "dome" },
  { city: "Dubai",      name: "UAE Central Bank",      flag: "🇦🇪", lat: 25.20, lon: 55.27, style: "dome" },
  { city: "Mumbai",     name: "Reserve Bank of India", flag: "🇮🇳", lat: 19.08, lon: 72.88, style: "pagoda" },
  { city: "Bangkok",    name: "Bank of Thailand",      flag: "🇹🇭", lat: 13.76, lon: 100.50, style: "pagoda" },
  { city: "Singapore",  name: "MAS",                   flag: "🇸🇬", lat: 1.35, lon: 103.82, style: "pagoda" },
  { city: "Jakarta",    name: "Bank Indonesia",        flag: "🇮🇩", lat: -6.21, lon: 106.85, style: "pagoda" },
  { city: "Manila",     name: "Bangko Sentral",        flag: "🇵🇭", lat: 14.60, lon: 120.98, style: "pagoda" },
  { city: "Hong Kong",  name: "HKMA",                  flag: "🇭🇰", lat: 22.32, lon: 114.17, style: "pagoda" },
  { city: "Shanghai",   name: "People's Bank",         flag: "🇨🇳", lat: 31.23, lon: 121.47, style: "pagoda" },
  { city: "Beijing",    name: "People's Bank",         flag: "🇨🇳", lat: 39.90, lon: 116.41, style: "pagoda" },
  { city: "Seoul",      name: "Bank of Korea",         flag: "🇰🇷", lat: 37.57, lon: 126.98, style: "pagoda" },
  { city: "Taipei",     name: "Central Bank of ROC",   flag: "🇹🇼", lat: 25.03, lon: 121.57, style: "pagoda" },
  { city: "Tokyo",      name: "Bank of Japan",         flag: "🇯🇵", lat: 35.68, lon: 139.65, style: "pagoda" },
];

const JEFF_LINE = "Touchdown in {city}! 🛬";
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

// Little pencil-sketch bank building, three regional flavors.
function BankSketch({ style, size = 44 }: { style: BankStyle; size?: number }) {
  const s = { fill: "none", stroke: "#5b544a", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" style={{ overflow: "visible" }}>
      <g filter="url(#pencilPin)">
        {style === "classic" && (
          <>
            <path d="M6,20 L24,9 L42,20 Z" {...s} fill="#fdf6e6" />
            <path d="M9,20 L9,38 M16,20 L16,38 M24,20 L24,38 M32,20 L32,38 M39,20 L39,38" {...s} />
            <path d="M5,38 L43,38 M4,42 L44,42" {...s} />
          </>
        )}
        {style === "dome" && (
          <>
            <path d="M24,6 C16,6 15,17 24,17 C33,17 32,6 24,6 Z" {...s} fill="#fdf6e6" />
            <path d="M24,4 L24,7 M10,20 L38,20 L38,17 L10,17 Z" {...s} fill="#fdf6e6" />
            <path d="M12,20 L12,38 M20,20 L20,38 M28,20 L28,38 M36,20 L36,38" {...s} />
            <path d="M8,38 L40,38 M6,42 L42,42" {...s} />
          </>
        )}
        {style === "pagoda" && (
          <>
            <path d="M8,14 L24,7 L40,14 Z" {...s} fill="#fdf6e6" />
            <path d="M11,22 L24,16 L37,22 Z" {...s} fill="#fdf6e6" />
            <path d="M14,30 L14,38 M24,26 L24,38 M34,30 L34,38" {...s} />
            <path d="M10,38 L38,38 M7,42 L41,42" {...s} />
          </>
        )}
      </g>
    </svg>
  );
}

export interface UnitMeta {
  unit: UnitInfo;
  done: number;
  total: number;
  complete: boolean;
  unlocked: boolean;
}

interface Props {
  unitsMeta: UnitMeta[];
  activeUnitId: string;
  onOpenUnit: (unitId: string) => void;
  rewardTotals: Record<string, number>;
}

export default function MissionsWorldMap({ unitsMeta, activeUnitId, onOpenUnit, rewardTotals }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [vp, setVp] = useState({ w: 0, h: 0 });
  const [hover, setHover] = useState<string | null>(null);

  const slots = useMemo(
    () => unitsMeta.map((meta, i) => ({ meta, bank: BANKS[i] })).filter(s => s.bank),
    [unitsMeta]
  );
  const activeSlot = slots.find(s => s.meta.unit.id === activeUnitId) || slots.find(s => s.meta.unlocked && !s.meta.complete) || slots[0];
  const totalDone = unitsMeta.filter(m => m.complete).length;
  const celebrate = totalDone >= slots.length && slots.length > 0;

  // ── Rotation + zoom state (drives the projection every render) ──
  const initRot = activeSlot ? [-activeSlot.bank.lon, -activeSlot.bank.lat] : [95, -38];
  const rotRef = useRef<[number, number]>([initRot[0], initRot[1]]);
  const [rot, setRotState] = useState<[number, number]>([initRot[0], initRot[1]]);
  const setRot = (r: [number, number]) => { rotRef.current = r; setRotState(r); };
  const [zoom, setZoom] = useState(0.9); // fraction of base radius filling the view
  const rafRef = useRef(0);
  const drag = useRef<{ x: number; y: number; moved: boolean } | null>(null);

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setVp({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    setVp({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  const minDim = Math.min(vp.w || 800, vp.h || 600);
  const radius = (minDim / 2) * 0.92 * zoom;
  const cx = vp.w / 2, cy = vp.h / 2;

  // Fresh projection each render → vectors stay razor-sharp at any zoom.
  const projection = useMemo(() => {
    return geoOrthographic()
      .translate([cx, cy])
      .scale(radius)
      .rotate([rot[0], rot[1], 0])
      .clipAngle(90)
      .precision(0.4);
  }, [cx, cy, radius, rot]);

  const pathGen = useMemo(() => geoPath(projection as any), [projection]);
  const landPath = useMemo(() => pathGen(LAND as any) || "", [pathGen]);
  const countryPath = useMemo(() => pathGen(COUNTRY_LINES as any) || "", [pathGen]);
  const statePath = useMemo(() => pathGen(STATE_LINES as any) || "", [pathGen]);
  const gratPath = useMemo(() => pathGen(GRAT as any) || "", [pathGen]);
  const routePath = useMemo(() => {
    if (slots.length < 2) return "";
    return pathGen({ type: "LineString", coordinates: slots.map(s => [s.bank.lon, s.bank.lat]) } as any) || "";
  }, [pathGen, slots]);

  const center: [number, number] = [-rot[0], -rot[1]];
  const isVisible = (lon: number, lat: number) => geoDistance([lon, lat], center) < Math.PI / 2 - 0.03;
  const project = (lon: number, lat: number): [number, number] => (projection([lon, lat]) as [number, number]) || [0, 0];

  // ── Spin the globe to a target rotation ──
  const spinTo = useCallback((targetLon: number, targetLat: number) => {
    cancelAnimationFrame(rafRef.current);
    const target: [number, number] = [-targetLon, -targetLat];
    const step = () => {
      const [cλ, cφ] = rotRef.current;
      let dλ = ((target[0] - cλ + 540) % 360) - 180;
      const dφ = target[1] - cφ;
      if (Math.abs(dλ) < 0.25 && Math.abs(dφ) < 0.25) { setRot(target); return; }
      setRot([cλ + dλ * 0.14, cφ + dφ * 0.14]);
      rafRef.current = requestAnimationFrame(step);
    };
    step();
  }, []);

  // Auto-spin to Jeff's bank whenever the active bank changes.
  const activeKey = activeSlot?.meta.unit.id;
  useEffect(() => {
    if (activeSlot) spinTo(activeSlot.bank.lon, activeSlot.bank.lat);
    return () => cancelAnimationFrame(rafRef.current);
  }, [activeKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Drag to rotate, wheel to zoom ──
  const onPointerDown = (e: React.PointerEvent) => {
    cancelAnimationFrame(rafRef.current);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x, dy = e.clientY - drag.current.y;
    if (Math.abs(dx) + Math.abs(dy) > 3) drag.current.moved = true;
    drag.current.x = e.clientX; drag.current.y = e.clientY;
    const sens = 0.28 / zoom;
    const [λ, φ] = rotRef.current;
    setRot([λ + dx * sens, clamp(φ - dy * sens, -88, 88)]);
  };
  const onPointerUp = () => { drag.current = null; };
  const onWheel = (e: React.WheelEvent) => setZoom(z => clamp(z * Math.exp(-e.deltaY * 0.0016), 0.55, 6));
  const zoomBy = (f: number) => setZoom(z => clamp(z * f, 0.55, 6));
  const flyToJeff = () => { if (activeSlot) { setZoom(1.15); spinTo(activeSlot.bank.lon, activeSlot.bank.lat); } };

  const jeff = activeSlot ? project(activeSlot.bank.lon, activeSlot.bank.lat) : [cx, cy];

  return (
    <div ref={viewportRef}
      className="absolute inset-0 overflow-hidden select-none"
      style={{
        background: "radial-gradient(120% 120% at 50% 15%, #fbf7ec 0%, #f3ece0 60%, #efe6d6 100%)",
        touchAction: "none", cursor: drag.current ? "grabbing" : "grab",
      }}
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* dotted paper texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(rgba(120,110,90,0.10) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }} />

      <svg width={vp.w} height={vp.h} className="absolute inset-0 block">
        <defs>
          <filter id="pencil" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves="3" seed="7" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="pencilPin" x="-40%" y="-40%" width="180%" height="180%">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="4" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="1.3" />
          </filter>
          <radialGradient id="ocean" cx="42%" cy="36%" r="72%">
            <stop offset="0%" stopColor="#d6ecf6" />
            <stop offset="70%" stopColor="#bfe0ef" />
            <stop offset="100%" stopColor="#a9d3e8" />
          </radialGradient>
          <radialGradient id="sphereShade" cx="50%" cy="50%" r="50%">
            <stop offset="72%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(40,60,70,0.16)" />
          </radialGradient>
        </defs>

        {radius > 0 && (
          <>
            {/* floating shadow under the planet */}
            <ellipse cx={cx} cy={cy + radius * 0.98} rx={radius * 0.82} ry={radius * 0.12} fill="rgba(80,70,50,0.14)" />
            {/* ocean disk */}
            <circle cx={cx} cy={cy} r={radius} fill="url(#ocean)" stroke="#5b544a" strokeWidth={1.6} filter="url(#pencil)" />
            {/* hand-drawn geography */}
            <g filter="url(#pencil)">
              <path d={gratPath} fill="none" stroke="rgba(91,84,74,0.28)" strokeWidth={0.5} />
              <path d={landPath} fill="#d8ecc4" stroke="#6f8a54" strokeWidth={1.1} strokeLinejoin="round" />
              {/* faint pencil hatch on land for texture */}
              <path d={landPath} fill="none" stroke="rgba(91,110,70,0.25)" strokeWidth={0.4} />
              {/* Country borders - solid pencil lines worldwide */}
              <path d={countryPath} fill="none" stroke="rgba(91,84,74,0.6)" strokeWidth={0.7}
                strokeLinecap="round" strokeLinejoin="round" />
              {/* U.S. state borders - lighter dashed pencil lines */}
              <path d={statePath} fill="none" stroke="rgba(91,110,70,0.45)" strokeWidth={0.5}
                strokeDasharray="1.4 1.6" strokeLinecap="round" strokeLinejoin="round" />
              {routePath && (
                <path d={routePath} fill="none" stroke="rgba(91,84,74,0.6)" strokeWidth={1.3}
                  strokeDasharray="2 3.5" strokeLinecap="round" />
              )}
            </g>
            {/* spherical shading for roundness */}
            <circle cx={cx} cy={cy} r={radius} fill="url(#sphereShade)" pointerEvents="none" />
            {/* soft top-left highlight */}
            <ellipse cx={cx - radius * 0.3} cy={cy - radius * 0.34} rx={radius * 0.42} ry={radius * 0.3}
              fill="rgba(255,255,255,0.18)" pointerEvents="none" />
          </>
        )}
      </svg>

      {/* Bank pins - HTML overlay, constant size (crisp, no scaling) */}
      {radius > 0 && slots.map(({ meta, bank }) => {
        if (!isVisible(bank.lon, bank.lat)) return null;
        const [px, py] = project(bank.lon, bank.lat);
        const clickable = meta.unlocked || meta.complete;
        const isActive = meta.unit.id === activeUnitId;
        const isHover = hover === meta.unit.id;
        const reward = rewardTotals[meta.unit.id] ?? 0;
        return (
          <div key={meta.unit.id} className="absolute" style={{ left: px, top: py, zIndex: isHover ? 60 : isActive ? 30 : 20 }}>
            <button
              type="button"
              aria-disabled={!clickable}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => clickable && !drag.current?.moved && onOpenUnit(meta.unit.id)}
              onMouseEnter={() => setHover(meta.unit.id)}
              onMouseLeave={() => setHover(h => (h === meta.unit.id ? null : h))}
              className="rounded-full flex items-center justify-center"
              style={{
                width: 30, height: 30, transform: `translate(-50%,-50%) scale(${isHover ? 1.18 : 1})`,
                cursor: clickable ? "pointer" : "not-allowed",
                opacity: isActive ? 0 : 1,
                background: meta.complete ? "var(--brand)" : meta.unlocked ? "#fdf6e6" : "#e7ded0",
                border: meta.complete ? "2.5px solid #fff" : meta.unlocked ? "2.5px solid #5b544a" : "2.5px solid #b9ae9c",
                boxShadow: meta.complete ? "0 3px 9px rgba(var(--brand-rgb),0.5)" : "0 2px 7px rgba(80,70,50,0.28)",
              }}
              aria-label={`${bank.city} - ${meta.unit.title}`}
            >
              {meta.complete ? <CheckCircle className="w-4 h-4 text-white" />
                : meta.unlocked ? <span className="text-[13px] leading-none">{bank.flag}</span>
                : <Lock className="w-3.5 h-3.5" style={{ color: "#8a8172" }} />}
            </button>

            {isHover && (
              <div className="absolute left-1/2 bottom-full -translate-x-1/2 mb-1.5 pointer-events-none">
                <div className="w-max max-w-[220px] rounded-2xl px-3 py-2.5 text-left shadow-xl flex gap-2.5 items-center"
                  style={{ background: "#fffdf7", border: "1.5px solid #e4d9c2" }}>
                  <div className="shrink-0 rounded-xl p-0.5" style={{ background: "#f4ecda" }}>
                    <BankSketch style={bank.style} size={40} />
                  </div>
                  <div>
                    <p className="text-[12px] font-extrabold leading-tight" style={{ color: "#3f3a31" }}>{bank.flag} {bank.city}</p>
                    <p className="text-[10px] leading-tight mt-0.5" style={{ color: "#8a8172" }}>{bank.name}</p>
                    <p className="text-[10px] font-bold mt-1 flex items-center gap-1" style={{ color: meta.complete ? "var(--brand)" : "#b8860b" }}>
                      {meta.complete ? "Cleared ✓"
                        : meta.unlocked
                          ? <>{meta.done}/{meta.total} lessons · <Coins className="w-2.5 h-2.5" />{reward.toLocaleString()}</>
                          : <>🔒 {meta.total} {meta.total === 1 ? "lesson" : "lessons"} · finish the previous bank</>}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Jeff - parked on the active bank, front of globe */}
      {radius > 0 && activeSlot && isVisible(activeSlot.bank.lon, activeSlot.bank.lat) && (
        <motion.div className="absolute pointer-events-none" style={{ zIndex: 50 }}
          initial={false} animate={{ left: jeff[0], top: jeff[1] }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}>
          <div style={{ transform: "translate(-50%,-100%)" }}>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 whitespace-nowrap">
              <div className="rounded-2xl px-2.5 py-1 text-[10px] font-bold shadow-md"
                style={{ background: "#fffdf7", color: "#3f3a31", border: "1.5px solid #e4d9c2" }}>
                {celebrate ? "Banked the whole world! 🌍🎉" : JEFF_LINE.replace("{city}", activeSlot.bank.city)}
              </div>
            </div>
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: 50, height: 54, filter: "drop-shadow(0 6px 10px rgba(var(--brand-rgb),0.32))" }}>
              <JeffMascot mood={celebrate ? "celebrate" : "encourage"} />
            </motion.div>
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2.5 h-2.5 rounded-full"
              style={{ background: "#EF9F27", boxShadow: "0 2px 5px rgba(0,0,0,0.3)" }} />
          </div>
        </motion.div>
      )}

      {/* ── Floating HUD ── */}
      <div className="absolute top-3 left-3 md:top-4 md:left-4 rounded-2xl px-4 py-3 pointer-events-none max-w-[78%]"
        style={{ background: "#fffdf7", border: "1.5px solid #e4d9c2", boxShadow: "0 8px 22px rgba(80,70,50,0.16)" }}>
        <p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: "#a89a80" }}>Jeff's World Bank Tour</p>
        <h1 className="font-display text-lg md:text-xl font-extrabold tracking-tight leading-tight" style={{ color: "#3f3a31" }}>Bank the whole world 🌍</h1>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white" style={{ background: "var(--brand)" }}>
            🏦 {totalDone}/{slots.length} banks
          </span>
          {activeSlot && !celebrate && <span className="text-[11px] font-semibold" style={{ color: "#8a8172" }}>✈️ {activeSlot.bank.city}</span>}
        </div>
      </div>

      {/* Zoom / recenter controls - right-middle edge */}
      <div className="absolute top-1/2 -translate-y-1/2 right-3 md:right-4 flex flex-col gap-2">
        {[
          { icon: Plus, fn: () => zoomBy(1.4), label: "Zoom in", solid: false },
          { icon: Minus, fn: () => zoomBy(1 / 1.4), label: "Zoom out", solid: false },
          { icon: LocateFixed, fn: flyToJeff, label: "Fly to Jeff", solid: true },
        ].map(({ icon: Icon, fn, label, solid }) => (
          <button key={label} onClick={fn} aria-label={label}
            className="w-10 h-10 rounded-xl shadow-md flex items-center justify-center active:scale-95 transition"
            style={solid ? { background: "var(--brand)", color: "#fff" } : { background: "#fffdf7", border: "1.5px solid #e4d9c2", color: "#3f3a31" }}>
            <Icon className="w-5 h-5" />
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="absolute bottom-20 md:bottom-5 left-3 md:left-4 rounded-xl px-3 py-2 shadow-sm flex items-center gap-3 text-[11px] font-semibold pointer-events-none"
        style={{ background: "#fffdf7", border: "1.5px solid #e4d9c2", color: "#6b6459" }}>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full" style={{ background: "var(--brand)" }} /> Cleared</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full" style={{ background: "#fdf6e6", border: "2px solid #5b544a" }} /> Open</span>
        <span className="flex items-center gap-1.5"><Lock className="w-3 h-3" style={{ color: "#8a8172" }} /> Locked</span>
      </div>
    </div>
  );
}
