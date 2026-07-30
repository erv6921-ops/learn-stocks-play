import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Lock, Flame, Coins, Star, ChevronRight } from "lucide-react";
import { JeffMascot } from "@/components/JeffMascot";

/**
 * FULL-SCREEN COASTER - the roller coaster fills its entire container, with the
 * player's core stats (streak, points, level) floating in the SKY rather than
 * in a separate strip. Each station is a lesson; tap one to jump to it.
 *
 * Reused by the standalone /coaster-journey preview AND (env-gated) as the
 * Missions tab itself. Sizes to its parent, so it works full-window or embedded.
 *
 * Styling aims for a "premium" theme-park feel: atmospheric depth (hazy mountain
 * layers, parallax hills), a blooming sun, metallic rails with a travelling
 * sheen, glass stat chips, glowing stations, floating collectible coins and
 * drifting light motes.
 */

export interface CoasterStation {
  id: string;
  title: string;
  done: boolean;
  unlocked: boolean;
}

export interface FullScreenCoasterProps {
  unitNumber?: number;
  unitTitle: string;
  unitReward: number;
  stations: CoasterStation[];
  /** Index of the station Jeff currently sits at (== count of completed for a fresh unit). */
  currentIdx: number;
  stats: { streak: number; points: number; level: number };
  onSelectStation: (station: CoasterStation) => void;
  /** Embedded inside the app shell (leaves room up top for the track switcher). */
  embedded?: boolean;
}

const JEFF_DIALOGUE = [
  "All aboard - let's learn! 🎢",
  "You're on a roll, keep climbing!",
  "Coins ahead… let's grab 'em! 🪙",
  "Big brain energy - let's go! 🧠",
  "Almost at the top, hang on!",
];

// ── Spline helpers (Catmull-Rom → dense samples for real rails) ───────
function sampleSpline(pts: { x: number; y: number }[], perSeg: number) {
  if (pts.length < 2) return pts.slice();
  const out: { x: number; y: number }[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    for (let s = 0; s < perSeg; s++) {
      const t = s / perSeg, t2 = t * t, t3 = t2 * t;
      out.push({
        x: 0.5 * (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y: 0.5 * (2 * p1.y + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
      });
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}

// Track the size of the coaster's own container (works embedded or full-window).
function useContainerSize(ref: React.RefObject<HTMLElement>) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    if (!ref.current) return;
    const measure = () => {
      const el = ref.current;
      if (el) setSize({ w: el.clientWidth, h: el.clientHeight });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

function SkyStat({ icon, value, label, tint, glow, delay }: { icon: React.ReactNode; value: string; label: string; tint: string; glow: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: [0, -6, 0] }}
      transition={{ opacity: { duration: 0.55, delay }, y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay } }}
      className="relative flex items-center gap-2.5 rounded-[18px] px-3.5 py-2.5 sm:px-4 sm:py-3"
      style={{
        background: "linear-gradient(160deg, rgba(255,255,255,0.72), rgba(255,255,255,0.42))",
        backdropFilter: "blur(14px) saturate(1.3)",
        WebkitBackdropFilter: "blur(14px) saturate(1.3)",
        border: "1px solid rgba(255,255,255,0.85)",
        boxShadow: `0 10px 30px rgba(20,60,44,0.16), inset 0 1px 0 rgba(255,255,255,0.9)`,
      }}
    >
      <div className="relative flex items-center justify-center rounded-[13px] w-9 h-9 sm:w-11 sm:h-11 shrink-0" style={{ background: tint, boxShadow: `0 6px 16px ${glow}, inset 0 1px 0 rgba(255,255,255,0.45)` }}>
        {icon}
      </div>
      <div className="leading-none pr-1">
        <div className="font-black tabular-nums text-[#0f3a28] text-lg sm:text-[26px] tracking-tight">{value}</div>
        <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] text-[#3a6b56]/75 mt-1">{label}</div>
      </div>
    </motion.div>
  );
}

export default function FullScreenCoaster({ unitNumber, unitTitle, unitReward, stations, currentIdx, stats, onSelectStation, embedded }: FullScreenCoasterProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { w: W, h: H } = useContainerSize(rootRef);
  const [hovered, setHovered] = useState<number | null>(null);
  const n = stations.length;
  const ready = W > 0 && H > 0 && n > 0;

  // ── Track geometry, sized to the container ──────────────────────────
  const padL = Math.max(72, W * 0.09);
  const padR = Math.max(72, W * 0.09);
  const groundY = H * 0.82;
  const bandTop = H * (embedded ? 0.42 : 0.36);
  const bandBottom = H * 0.65;
  const my = (bandTop + bandBottom) / 2;
  const amp = (bandBottom - bandTop) / 2;

  const pts = useMemo(() => {
    const pointAt = (i: number) => {
      const x = n > 1 ? padL + i * ((W - padL - padR) / (n - 1)) : W / 2;
      const trend = n > 1 ? (my + amp * 0.45) - (i / (n - 1)) * (amp * 0.9) : my;
      const hill = -amp * Math.sin(i * 1.15 + 0.5);
      const y = Math.max(bandTop, Math.min(bandBottom, trend + hill));
      return { x, y };
    };
    return Array.from({ length: Math.max(n, 1) }, (_, i) => pointAt(i));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [W, H, n]);

  const jeffIdx = Math.max(0, Math.min(currentIdx, n - 1));
  const jeff = pts[jeffIdx] ?? { x: W / 2, y: my };
  const allDone = currentIdx >= n;
  const pctComplete = n > 0 ? Math.round((Math.min(currentIdx, n) / n) * 100) : 0;
  const dialogue = allDone ? "Woohoo - unit complete! 🎉" : currentIdx <= 0 ? "All aboard! Tap to start 🎢" : JEFF_DIALOGUE[jeffIdx % JEFF_DIALOGUE.length];

  // Dense samples → twin rails + cross-ties that hug the exact curve.
  const perSeg = 16;
  const dense = useMemo(() => sampleSpline(pts, perSeg), [pts]);
  const normals = useMemo(() => dense.map((p, i) => {
    const a = dense[Math.max(0, i - 1)], b = dense[Math.min(dense.length - 1, i + 1)];
    const tx = b.x - a.x, ty = b.y - a.y, len = Math.hypot(tx, ty) || 1;
    return { x: -ty / len, y: tx / len };
  }), [dense]);
  const doneEnd = Math.max(0, Math.min(dense.length - 1, currentIdx * perSeg));
  const railGap = 7;
  const railPath = (gap: number, from: number, to: number) => {
    let d = "";
    for (let i = from; i <= to; i++) {
      const p = dense[i], nrm = normals[i];
      const x = (p.x + nrm.x * gap).toFixed(2), y = (p.y + nrm.y * gap).toFixed(2);
      d += i === from ? `M${x},${y}` : ` L${x},${y}`;
    }
    return d;
  };
  const ties: { x1: number; y1: number; x2: number; y2: number; done: boolean }[] = [];
  for (let i = 0; i < dense.length; i += 5) {
    const p = dense[i], nrm = normals[i], g = railGap + 2;
    ties.push({ x1: p.x - nrm.x * g, y1: p.y - nrm.y * g, x2: p.x + nrm.x * g, y2: p.y + nrm.y * g, done: i <= doneEnd });
  }
  const centerDone = railPath(0, 0, doneEnd);
  const smooth = (slice: { x: number; y: number }[]) => {
    if (slice.length < 2) return "";
    let d = `M${slice[0].x},${slice[0].y}`;
    for (let i = 0; i < slice.length - 1; i++) {
      const p0 = slice[i - 1] || slice[i];
      const p1 = slice[i];
      const p2 = slice[i + 1];
      const p3 = slice[i + 2] || p2;
      const c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
    }
    return d;
  };
  const remainPath = smooth(pts.slice(Math.max(currentIdx, 0)));

  // Layered ridge path for atmospheric mountains / hills.
  const ridgePath = (baseY: number, h: number, seed: number) => {
    const seg = 6;
    const step = W / seg;
    let d = `M0,${H} L0,${baseY}`;
    for (let i = 0; i <= seg; i++) {
      const x = i * step;
      const jitter = Math.sin(i * 1.3 + seed) * h * 0.5;
      const y = baseY - Math.abs(Math.sin(i * 0.9 + seed)) * h - jitter * 0.3;
      d += ` Q${x - step / 2},${baseY - h * 1.15} ${x},${y}`;
    }
    return d + ` L${W},${H} Z`;
  };

  const stationSize = Math.min(58, Math.max(42, W * 0.038));
  const nextStation = !allDone ? stations[jeffIdx] : undefined;

  // Floating collectible coins sit above a few upcoming stations.
  const coinStations = pts
    .map((p, i) => ({ p, i }))
    .filter(({ i }) => i >= currentIdx && i < n - 1 && !stations[i].done)
    .slice(0, 4);

  // Ambient light motes drifting up through the sky.
  const motes = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => ({
      x: (i * 137.5) % 100,
      y: 20 + ((i * 53) % 60),
      s: 2 + (i % 3),
      dur: 9 + (i % 5) * 2.5,
      delay: (i % 7) * 0.9,
    })), []);

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden select-none">
      {ready && (
        <>
          {/* ═══ SKY + GROUND SCENE ═══ */}
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="absolute inset-0">
            <defs>
              <linearGradient id="fsc-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5cb3ef" />
                <stop offset="30%" stopColor="#8fd0f5" />
                <stop offset="62%" stopColor="#cdeefb" />
                <stop offset="82%" stopColor="#e7f7ef" />
                <stop offset="100%" stopColor="#f4fff8" />
              </linearGradient>
              <radialGradient id="fsc-skyGlow" cx="18%" cy="24%" r="60%">
                <stop offset="0%" stopColor="#fff6d8" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#ffe6b0" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#ffe6b0" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="fsc-sun" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFDF3" />
                <stop offset="40%" stopColor="#FFE9A8" />
                <stop offset="70%" stopColor="#FFD75E" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#FFD75E" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="fsc-doneRail" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0F7E5C" />
                <stop offset="50%" stopColor="#22C48C" />
                <stop offset="100%" stopColor="#16b07f" />
              </linearGradient>
              <linearGradient id="fsc-railMetal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#eef3f0" />
                <stop offset="50%" stopColor="#b9c8c0" />
                <stop offset="100%" stopColor="#8ea79b" />
              </linearGradient>
              <linearGradient id="fsc-grass" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9fe0b4" />
                <stop offset="100%" stopColor="#c9ead2" />
              </linearGradient>
              <radialGradient id="fsc-vignette" cx="50%" cy="46%" r="75%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0" />
                <stop offset="78%" stopColor="#0a2a1e" stopOpacity="0" />
                <stop offset="100%" stopColor="#0a2a1e" stopOpacity="0.14" />
              </radialGradient>
              <filter id="fsc-soft" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.4" />
              </filter>
              <filter id="fsc-haze" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" />
              </filter>
            </defs>

            {/* base sky + warm glow */}
            <rect x="0" y="0" width={W} height={H} fill="url(#fsc-sky)" />
            <rect x="0" y="0" width={W} height={H} fill="url(#fsc-skyGlow)" />

            {/* sun bloom + rotating rays */}
            <g transform={`translate(${W * 0.17}, ${H * 0.19})`}>
              <circle r={Math.min(190, W * 0.14)} fill="url(#fsc-sun)" />
              <motion.g animate={{ rotate: 360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }}>
                {Array.from({ length: 14 }).map((_, i) => {
                  const a = (i / 14) * Math.PI * 2;
                  const r1 = Math.min(64, W * 0.052), r2 = Math.min(104, W * 0.082);
                  return <line key={i} x1={Math.cos(a) * r1} y1={Math.sin(a) * r1} x2={Math.cos(a) * r2} y2={Math.sin(a) * r2} stroke="#FFEFB0" strokeWidth="4" strokeLinecap="round" opacity="0.6" />;
                })}
              </motion.g>
              <motion.circle r={Math.min(50, W * 0.04)} fill="#FFF3C8" animate={{ opacity: [0.9, 1, 0.9] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
            </g>

            {/* hazy far mountains (atmospheric depth) */}
            <path d={ridgePath(groundY - H * 0.16, H * 0.22, 1.2)} fill="#a9c8d8" opacity="0.45" filter="url(#fsc-haze)" />
            <path d={ridgePath(groundY - H * 0.11, H * 0.17, 3.7)} fill="#9dccc0" opacity="0.6" filter="url(#fsc-soft)" />

            {/* distant ferris wheel */}
            <g transform={`translate(${W * 0.86}, ${groundY - H * 0.15})`} opacity="0.32" stroke="#6aa98c" fill="none" strokeWidth="2.5">
              <motion.g animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "center" }}>
                <circle r={H * 0.12} />
                {Array.from({ length: 10 }).map((_, i) => {
                  const a = (i / 10) * Math.PI * 2;
                  return <g key={i}><line x1={0} y1={0} x2={Math.cos(a) * H * 0.12} y2={Math.sin(a) * H * 0.12} /><circle cx={Math.cos(a) * H * 0.12} cy={Math.sin(a) * H * 0.12} r={3.5} fill="#6aa98c" /></g>;
                })}
              </motion.g>
              <line x1={-H * 0.06} y1={H * 0.11} x2={0} y2={0} />
              <line x1={H * 0.06} y1={H * 0.11} x2={0} y2={0} />
            </g>

            {/* parallax hills */}
            <path d={ridgePath(groundY - H * 0.05, H * 0.1, 6.1)} fill="#bfe6c8" opacity="0.75" />
            <path d={ridgePath(groundY - H * 0.005, H * 0.06, 9.4)} fill="#a9dcb8" opacity="0.92" />

            {/* drifting clouds (layered, soft) */}
            {[{ x: W * 0.32, y: H * 0.13, s: 1.4, d: 70, o: 0.95 }, { x: W * 0.6, y: H * 0.08, s: 1, d: 90, o: 0.85 }, { x: W * 0.5, y: H * 0.23, s: 1.7, d: 110, o: 0.9 }, { x: W * 0.78, y: H * 0.16, s: 1.1, d: 80, o: 0.8 }].map((c, i) => (
              <motion.g key={i} fill="#ffffff" opacity={c.o} animate={{ x: [0, 34, 0] }} transition={{ duration: c.d, repeat: Infinity, ease: "easeInOut" }}>
                <ellipse cx={c.x} cy={c.y} rx={44 * c.s} ry={18 * c.s} />
                <ellipse cx={c.x - 32 * c.s} cy={c.y + 8 * c.s} rx={26 * c.s} ry={14 * c.s} />
                <ellipse cx={c.x + 34 * c.s} cy={c.y + 7 * c.s} rx={29 * c.s} ry={16 * c.s} />
                <ellipse cx={c.x + 4 * c.s} cy={c.y - 9 * c.s} rx={22 * c.s} ry={13 * c.s} />
              </motion.g>
            ))}

            {/* birds */}
            {[{ x: W * 0.42, y: H * 0.28 }, { x: W * 0.47, y: H * 0.24 }, { x: W * 0.72, y: H * 0.3 }].map((b, i) => (
              <path key={i} d={`M${b.x},${b.y} q6,-7 12,0 q6,-7 12,0`} fill="none" stroke="#4a7a63" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
            ))}

            {/* ground with soft top light */}
            <rect x="0" y={groundY} width={W} height={H - groundY} fill="url(#fsc-grass)" />
            <rect x="0" y={groundY} width={W} height="5" fill="#8fd6a8" />
            <rect x="0" y={groundY} width={W} height="1.5" fill="#ffffff" opacity="0.5" />

            {/* soft bushes for foreground depth */}
            {[{ x: W * 0.08, s: 1 }, { x: W * 0.28, s: 0.7 }, { x: W * 0.55, s: 0.85 }, { x: W * 0.74, s: 0.6 }, { x: W * 0.93, s: 0.95 }].map((b, i) => (
              <g key={`bush${i}`} fill="#8ad3a2" opacity="0.9" filter="url(#fsc-soft)">
                <ellipse cx={b.x} cy={groundY + 10} rx={44 * b.s} ry={20 * b.s} />
                <ellipse cx={b.x - 28 * b.s} cy={groundY + 14} rx={26 * b.s} ry={15 * b.s} />
                <ellipse cx={b.x + 30 * b.s} cy={groundY + 13} rx={28 * b.s} ry={16 * b.s} />
              </g>
            ))}

            {/* support posts */}
            {pts.map((p, i) => (
              <g key={`post${i}`} stroke="#aebfb5">
                <line x1={p.x} y1={p.y} x2={p.x} y2={groundY} strokeWidth="4.5" />
                <line x1={p.x} y1={p.y} x2={p.x} y2={groundY} strokeWidth="1.5" stroke="#ffffff" opacity="0.4" />
                <line x1={p.x} y1={(p.y + groundY) / 2} x2={p.x + (i % 2 ? 24 : -24)} y2={groundY} strokeWidth="3" opacity="0.5" />
                <line x1={p.x} y1={(p.y + groundY) * 0.72} x2={p.x + (i % 2 ? -24 : 24)} y2={groundY} strokeWidth="3" opacity="0.38" />
              </g>
            ))}

            {/* glow under ridden track */}
            {doneEnd > 0 && <path d={railPath(0, 0, doneEnd)} fill="none" stroke="#22C48C" strokeWidth="30" strokeLinecap="round" opacity="0.16" filter="url(#fsc-soft)" />}

            {/* cross-ties */}
            {ties.map((t, i) => (
              <line key={`tie${i}`} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={t.done ? "#12724f" : "#b7c6bd"} strokeWidth={t.done ? 4.5 : 3.5} strokeLinecap="round" />
            ))}

            {/* upcoming rails (metallic) + dashed hint */}
            {doneEnd < dense.length - 1 && (
              <>
                <path d={railPath(railGap, doneEnd, dense.length - 1)} fill="none" stroke="url(#fsc-railMetal)" strokeWidth="4.5" strokeLinecap="round" />
                <path d={railPath(-railGap, doneEnd, dense.length - 1)} fill="none" stroke="url(#fsc-railMetal)" strokeWidth="4.5" strokeLinecap="round" />
                <path d={remainPath} fill="none" stroke="#8aa79a" strokeWidth="3" strokeDasharray="1 13" strokeLinecap="round" opacity="0.8" />
              </>
            )}

            {/* ridden rails (green) with travelling sheen */}
            {doneEnd > 0 && (
              <>
                <path d={railPath(railGap, 0, doneEnd)} fill="none" stroke="url(#fsc-doneRail)" strokeWidth="5.5" strokeLinecap="round" />
                <path d={railPath(-railGap, 0, doneEnd)} fill="none" stroke="url(#fsc-doneRail)" strokeWidth="5.5" strokeLinecap="round" />
                {/* highlight sheen sweeping along the completed track */}
                {centerDone && (
                  <motion.path
                    d={centerDone} fill="none" stroke="#eafff6" strokeWidth="4" strokeLinecap="round"
                    pathLength={1} strokeDasharray="0.12 0.88"
                    animate={{ strokeDashoffset: [0, -1] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                    opacity="0.55"
                  />
                )}
              </>
            )}
          </svg>

          {/* ambient light motes */}
          {motes.map((m, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{ left: `${m.x}%`, top: `${m.y}%`, width: m.s, height: m.s, background: "rgba(255,255,255,0.9)", boxShadow: "0 0 6px rgba(255,255,255,0.9)" }}
              animate={{ y: [0, -26, 0], opacity: [0, 0.9, 0] }}
              transition={{ duration: m.dur, repeat: Infinity, ease: "easeInOut", delay: m.delay }}
            />
          ))}

          {/* ═══ STATS FLOATING IN THE SKY ═══ */}
          <div className={`absolute left-0 right-0 top-0 flex items-start justify-between gap-3 pointer-events-none ${embedded ? "px-4 pt-4 sm:px-6" : "px-5 pt-5 sm:px-8 sm:pt-7"}`}>
            <div className="pointer-events-auto">
              <div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 mb-1.5" style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.7)" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#22C48C", boxShadow: "0 0 6px #22C48C" }} />
                <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#2f6b52]">{unitNumber != null ? `Unit ${unitNumber} · Your ride` : "Your ride"}</p>
              </div>
              <h1 className="font-black tracking-tight text-[#0d3524] text-2xl sm:text-[40px] leading-[1.05] mt-0.5" style={{ textShadow: "0 2px 16px rgba(255,255,255,0.7)" }}>{unitTitle}</h1>
            </div>
            <div className={`flex items-center gap-2 sm:gap-3 pointer-events-auto ${embedded ? "mt-9 sm:mt-10" : ""}`}>
              <SkyStat icon={<Flame className="w-5 h-5 text-white" />} value={String(stats.streak)} label="Day streak" tint="linear-gradient(135deg,#FF9A48,#FF5E3A)" glow="rgba(255,94,58,0.45)" delay={0} />
              <SkyStat icon={<Coins className="w-5 h-5 text-white" />} value={stats.points.toLocaleString()} label="Points" tint="linear-gradient(135deg,#FBD05B,#E8A020)" glow="rgba(232,160,32,0.45)" delay={0.15} />
              <SkyStat icon={<Star className="w-5 h-5 text-white" />} value={`Lv ${stats.level}`} label="Level" tint="linear-gradient(135deg,#2FD39B,#0F7E5C)" glow="rgba(15,126,92,0.45)" delay={0.3} />
            </div>
          </div>

          {/* ═══ FLOATING COLLECTIBLE COINS ═══ */}
          {coinStations.map(({ p, i }) => (
            <motion.div
              key={`coin${i}`}
              className="absolute pointer-events-none"
              style={{ left: p.x, top: p.y - stationSize * 0.95, transform: "translate(-50%,-50%)", zIndex: 3 }}
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: (i % 4) * 0.4 }}
            >
              <div className="flex items-center justify-center rounded-full" style={{ width: 26, height: 26, background: "linear-gradient(135deg,#FFE07A,#E8A020)", border: "2px solid #fff6d8", boxShadow: "0 4px 10px rgba(232,160,32,0.5)" }}>
                <span className="text-[11px] font-black" style={{ color: "#8a5a06" }}>$</span>
              </div>
            </motion.div>
          ))}

          {/* ═══ STATION MARKERS ═══ */}
          {pts.map((p, i) => {
            const st = stations[i];
            const isCurrent = i === jeffIdx && !allDone;
            const clickable = st.unlocked || st.done;
            return (
              <button
                key={st.id}
                type="button"
                disabled={!clickable}
                onClick={() => clickable && onSelectStation(st)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
                className="absolute rounded-full flex items-center justify-center transition-transform"
                style={{
                  left: p.x, top: p.y, width: stationSize, height: stationSize,
                  transform: `translate(-50%,-50%) scale(${hovered === i ? 1.16 : 1})`,
                  cursor: clickable ? "pointer" : "default",
                  zIndex: isCurrent ? 2 : 4,
                  opacity: isCurrent ? 0 : 1,
                  background: st.done ? "linear-gradient(150deg,#22C48C,#0F7E5C)" : st.unlocked ? "linear-gradient(150deg,#ffffff,#eef4f0)" : "linear-gradient(150deg,#e9eeeb,#dbe2dd)",
                  border: st.done ? "3px solid rgba(255,255,255,0.95)" : st.unlocked ? "3px solid #1D9E75" : "3px solid #cdd6d0",
                  boxShadow: st.done
                    ? "0 6px 18px rgba(29,158,117,0.5), inset 0 2px 3px rgba(255,255,255,0.5)"
                    : st.unlocked ? "0 5px 14px rgba(20,60,44,0.2), inset 0 2px 3px rgba(255,255,255,0.8)" : "0 3px 9px rgba(0,0,0,0.14)",
                }}
                aria-label={st.title}
              >
                {st.done ? <CheckCircle style={{ width: stationSize * 0.5, height: stationSize * 0.5 }} className="text-white" />
                  : st.unlocked ? <span className="font-black" style={{ color: "#128a63", fontSize: stationSize * 0.4 }}>{i + 1}</span>
                  : <Lock style={{ width: stationSize * 0.42, height: stationSize * 0.42 }} className="text-[#9fb0a6]" />}
                {hovered === i && (
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 whitespace-nowrap rounded-xl px-3 py-2 text-[13px] font-bold text-white pointer-events-none shadow-xl" style={{ background: "linear-gradient(#1e4c37,#153a2b)", zIndex: 20 }}>
                    {st.title}
                    <span className="absolute left-1/2 -bottom-1 w-2.5 h-2.5 -translate-x-1/2 rotate-45" style={{ background: "#153a2b" }} />
                  </span>
                )}
              </button>
            );
          })}

          {/* pulsing halo on the current station (behind Jeff) */}
          {!allDone && pts[jeffIdx] && (
            <div className="absolute pointer-events-none" style={{ left: pts[jeffIdx].x, top: pts[jeffIdx].y, transform: "translate(-50%,-50%)", zIndex: 1 }}>
              {[0, 1].map(k => (
                <motion.span
                  key={k}
                  className="absolute rounded-full"
                  style={{ left: "50%", top: "50%", width: stationSize, height: stationSize, transform: "translate(-50%,-50%)", border: "2px solid #22C48C" }}
                  animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: k * 1.2 }}
                />
              ))}
            </div>
          )}

          {/* finish flag */}
          {!allDone && (
            <div className="absolute pointer-events-none" style={{ left: pts[n - 1].x, top: pts[n - 1].y, transform: "translate(-50%,-175%)", zIndex: 3 }}>
              <span className="inline-flex items-center gap-1 text-sm font-black px-3 py-1.5 rounded-xl text-white whitespace-nowrap" style={{ background: "linear-gradient(135deg,#1e4c37,#153a2b)", boxShadow: "0 6px 16px rgba(21,58,43,0.4)", border: "1px solid rgba(255,255,255,0.15)" }}>🏁 +{unitReward.toLocaleString()}</span>
            </div>
          )}

          {/* ═══ JEFF IN HIS CART ═══ */}
          <div className="absolute" style={{ left: jeff.x, top: jeff.y, transform: "translate(-50%,-84%)", zIndex: 8 }}>
            <button
              type="button"
              onClick={() => { const st = stations[jeffIdx]; if (st && (st.unlocked || st.done)) onSelectStation(st); }}
              className="flex flex-col items-center cursor-pointer"
              aria-label="Continue current lesson"
            >
              <motion.div
                className="relative mb-2.5"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="rounded-2xl px-4 py-2 text-[13px] sm:text-sm font-bold whitespace-nowrap" style={{ background: "linear-gradient(#ffffff,#f4f9f6)", color: "#153a2b", border: "1.5px solid #dbe6df", boxShadow: "0 10px 24px rgba(21,58,43,0.18)" }}>{dialogue}</div>
                <div className="absolute left-1/2 -bottom-1.5 w-3.5 h-3.5" style={{ background: "#f4f9f6", transform: "translateX(-50%) rotate(45deg)", borderRight: "1.5px solid #dbe6df", borderBottom: "1.5px solid #dbe6df" }} />
              </motion.div>
              <motion.div animate={{ y: [0, -6, 0], rotate: [-1, 1, -1] }} transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }} style={{ filter: "drop-shadow(0 16px 22px rgba(6,41,31,0.32))" }}>
                <div className="relative" style={{ width: 138, height: 144 }}>
                  {/* wheels */}
                  <div className="absolute rounded-full" style={{ width: 28, height: 28, left: 22, bottom: 3, background: "radial-gradient(circle at 35% 35%,#4a4a46,#1c1c1a)", border: "4px solid #E8A020", zIndex: 1 }} />
                  <div className="absolute rounded-full" style={{ width: 28, height: 28, right: 22, bottom: 3, background: "radial-gradient(circle at 35% 35%,#4a4a46,#1c1c1a)", border: "4px solid #E8A020", zIndex: 1 }} />
                  {/* Jeff seated */}
                  <div className="absolute" style={{ left: "50%", top: -8, transform: "translateX(-50%)", width: 94, height: 100, zIndex: 1 }}>
                    <JeffMascot mood={allDone ? "celebrating" : "excited"} size="xl" className="!w-full !h-full" />
                  </div>
                  {/* car body - glossy */}
                  <div className="absolute" style={{ left: 3, right: 3, bottom: 12, height: 72, borderRadius: "18px 18px 32px 32px", background: "linear-gradient(160deg,#FFD96B,#F2A937 55%,#d9871a)", boxShadow: "inset 0 3px 0 rgba(255,255,255,0.5), inset 0 -8px 14px rgba(150,80,10,0.35), 0 8px 16px rgba(6,41,31,0.24)", zIndex: 2 }}>
                    <div className="absolute" style={{ left: 12, right: 12, top: 9, height: 5, borderRadius: 999, background: "rgba(255,255,255,0.55)" }} />
                    {/* star emblem */}
                    <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: 12 }}>
                      <Star className="w-5 h-5" style={{ color: "rgba(255,255,255,0.85)", fill: "rgba(255,255,255,0.85)" }} />
                    </div>
                  </div>
                  {/* lap bar */}
                  <div className="absolute" style={{ left: 13, right: 13, top: 70, height: 10, borderRadius: 999, background: "linear-gradient(#45453f,#26261f)", boxShadow: "0 1px 3px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)", zIndex: 3 }} />
                </div>
              </motion.div>
            </button>
          </div>

          {/* ═══ BOTTOM CONTINUE CARD (with progress) ═══ */}
          {nextStation && (
            <div className={`absolute left-1/2 -translate-x-1/2 w-[min(94%,540px)] ${embedded ? "bottom-20 md:bottom-6" : "bottom-6 sm:bottom-8"}`} style={{ zIndex: 10 }}>
              <button
                onClick={() => onSelectStation(nextStation)}
                className="w-full rounded-[26px] px-5 pt-4 pb-4 text-left"
                style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.94), rgba(255,255,255,0.82))", backdropFilter: "blur(16px) saturate(1.3)", WebkitBackdropFilter: "blur(16px) saturate(1.3)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 18px 44px rgba(20,60,44,0.22), inset 0 1px 0 rgba(255,255,255,0.9)" }}
              >
                <div className="flex items-center gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#2f6b52]/75">Next stop · Lesson {jeffIdx + 1} of {n}</p>
                    <p className="font-black text-[#0d3524] text-lg truncate mt-0.5">{nextStation.title}</p>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-2xl px-5 py-3 font-black text-white shrink-0" style={{ background: "linear-gradient(135deg,#2FD39B,#0F7E5C)", boxShadow: "0 8px 20px rgba(15,126,92,0.45), inset 0 1px 0 rgba(255,255,255,0.35)" }}>
                    Continue <ChevronRight className="w-5 h-5" />
                  </span>
                </div>
                {/* unit progress bar */}
                <div className="mt-3.5 flex items-center gap-2.5">
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(15,126,92,0.14)" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg,#2FD39B,#0F7E5C)" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pctComplete}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                  <span className="text-[12px] font-black tabular-nums text-[#0F7E5C]">{pctComplete}%</span>
                </div>
              </button>
            </div>
          )}

          {/* cinematic vignette */}
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 pointer-events-none">
            <rect x="0" y="0" width={W} height={H} fill="url(#fsc-vignette)" />
          </svg>
        </>
      )}
    </div>
  );
}
