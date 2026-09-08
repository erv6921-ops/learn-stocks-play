import React from "react";
import { tierPalette, tierBlend, clampTier, TIER_COUNT } from "@/lib/pathEnvironments";

// ── Swappable environment scenes for the lesson path ────────────────────────
//
// Each biome is ONE self-contained component with a single clean interface
// (`SceneProps` — tier index in, a full-bleed layered scene out), registered in
// `SCENES` by tier index. Deliberately placeholder procedural art: to drop in
// real illustrations later, replace an entry in `SCENES` with a component that
// renders an <img>/<svg> asset — nothing in the path/progress logic references
// scene internals.
//
// A scene stacks several depth layers (far → near) that drift at increasing
// parallax rates, plus optional stars and a horizon glow. `EnvironmentBackdrop`
// composes the two biomes straddling the current position and cross-fades them
// by the intra-tier blend so unit boundaries never show a hard seam.

export interface SceneProps {
  tier: number;
  /** px offset for the slow parallax drift. 0 when reduced-motion is on. */
  parallax?: number;
}

const fill = "absolute inset-0 h-full w-full";

type Layer = { d: number; el: React.ReactNode }; // d = parallax depth (0 far … 1 near)

const SceneShell: React.FC<{
  tier: number;
  parallax: number;
  layers: Layer[];
  extra?: React.ReactNode;
}> = ({ tier, parallax, layers, extra }) => {
  const p = tierPalette(tier);
  return (
    <div className={fill} aria-hidden style={{ background: `linear-gradient(to top, ${p.sky[0]}, ${p.sky[1]})` }}>
      {p.stars && <Stars glow={p.glow} />}
      {extra}
      {layers.map((l, i) => (
        <div key={i} className={fill} style={{ transform: `translateY(${parallax * (0.2 + l.d * 0.7)}px)`, willChange: "transform" }}>
          {l.el}
        </div>
      ))}
      {/* horizon glow bloom */}
      <div className={fill} style={{ background: `radial-gradient(120% 55% at 50% 100%, ${hexA(p.glow, 0.2)}, transparent 70%)` }} />
    </div>
  );
};

const Svg: React.FC<{ children: React.ReactNode; className?: string; opacity?: number }> = ({ children, className, opacity }) => (
  <svg className={className ?? fill} viewBox="0 0 100 100" preserveAspectRatio="xMidYMax slice" style={{ opacity }}>
    {children}
  </svg>
);

// Deterministic star field (no per-render randomness → no flicker on scroll).
const STAR_POSITIONS: [number, number, number][] = Array.from({ length: 70 }, (_, i) => {
  const x = (i * 61.803) % 100;
  const y = (i * 37.117) % 92;
  const r = 0.15 + ((i * 7) % 5) * 0.1;
  return [x, y, r];
});
const Stars: React.FC<{ glow: string }> = ({ glow }) => (
  <Svg opacity={0.95}>
    {STAR_POSITIONS.map(([x, y, r], i) => (
      <circle key={i} cx={x} cy={y} r={r} fill={glow} opacity={0.35 + (i % 4) * 0.18} />
    ))}
  </Svg>
);

function hexA(hex: string, a: number): string {
  const h = hex.replace("#", "");
  const v = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return `rgba(${parseInt(v.slice(0, 2), 16)},${parseInt(v.slice(2, 4), 16)},${parseInt(v.slice(4, 6), 16)},${a})`;
}

// A row of building silhouettes at a given baseline — reused across city biomes.
const Buildings: React.FC<{ color: string; baseline: number; specs: [number, number, number][]; windows?: string }> = ({
  color,
  baseline,
  specs,
  windows,
}) => (
  <Svg>
    <g fill={color}>
      {specs.map(([x, w, h], i) => (
        <rect key={i} x={x} y={baseline - h} width={w} height={h + 20} rx={0.6} />
      ))}
    </g>
    {windows &&
      specs.map(([x, w, h], i) => (
        <g key={i} fill={windows} opacity={0.75}>
          {Array.from({ length: Math.max(0, Math.floor(h / 8)) }).map((_, r) =>
            Array.from({ length: Math.max(1, Math.floor(w / 4)) }).map((_, c) =>
              (r + c + i) % 3 === 0 ? (
                <rect key={`${r}-${c}`} x={x + 1.4 + c * 4} y={baseline - h + 3 + r * 8} width={1.6} height={2.4} />
              ) : null,
            ),
          )}
        </g>
      ))}
  </Svg>
);

// ── The twelve biome scenes ─────────────────────────────────────────────────

// Unmistakably a sewer: a big round brick tunnel viewed head-on (concentric
// voussoir rings receding to a black mouth), three god-ray light shafts falling
// from a manhole grate above, bold high-contrast pipes with a valve wheel and
// drips, a bright glowing water channel with ripples/bubbles/debris/rat, an
// iron ladder, a hazard sign, and foreground steam/dust. Colors are pushed much
// lighter than the ambient so the shapes actually read against the dark.
const Sewers: React.FC<SceneProps> = ({ tier = 0, parallax = 0 }) => {
  const brick = "#3a5a48"; // pushed lighter than ambient so masonry reads
  const brick2 = "#243d31";
  const mortar = "#0c1511";
  const grout = "#6a9a80"; // bright grout so the concentric tunnel rings pop
  const steel = "#5f7d69";
  const steelLite = "#b6f2ca";
  const rust = "#c68a4c";
  const wet = "#4be090"; // bright toxic green so the water channel pops
  const wetLite = "#b7ffdb";
  const cx = 50, cy = 40; // tunnel center
  const rings = [
    { r: 56, f: brick }, { r: 48, f: brick2 }, { r: 41, f: brick }, { r: 34, f: brick2 },
    { r: 28, f: brick }, { r: 22, f: brick2 }, { r: 16, f: "#12201a" }, { r: 10, f: "#060b08" },
  ];
  return (
    <SceneShell
      tier={tier}
      parallax={parallax}
      extra={
        <Svg>
          <defs>
            <pattern id="sewerBrick" width="14" height="14" patternUnits="userSpaceOnUse">
              <rect width="14" height="14" fill={brick2} />
              <g stroke={mortar} strokeWidth="1">
                <line x1="0" y1="7" x2="14" y2="7" />
                <line x1="7" y1="0" x2="7" y2="7" />
                <line x1="0" y1="7" x2="0" y2="14" />
                <line x1="14" y1="7" x2="14" y2="14" />
              </g>
              <line x1="0.8" y1="1" x2="6.2" y2="1" stroke={hexA(grout, 0.5)} strokeWidth="0.7" />
              <line x1="7.8" y1="8" x2="13.2" y2="8" stroke={hexA(grout, 0.4)} strokeWidth="0.7" />
            </pattern>
          </defs>
          {/* brick wall fills the frame (corners around the tunnel) */}
          <rect x="0" y="0" width="100" height="100" fill="url(#sewerBrick)" />
          {/* ── the big round brick tunnel: concentric voussoir rings → black mouth ── */}
          {rings.map((r, i) => (
            <circle key={i} cx={cx} cy={cy} r={r.r} fill={r.f} stroke={hexA(grout, 0.85)} strokeWidth="1" />
          ))}
          {/* radial voussoir bricks around the two outer rings */}
          <g stroke={hexA(grout, 0.8)} strokeWidth="0.9">
            {Array.from({ length: 30 }).map((_, k) => {
              const a = (k / 30) * Math.PI * 2;
              return (
                <line key={k} x1={cx + Math.cos(a) * 41} y1={cy + Math.sin(a) * 41}
                  x2={cx + Math.cos(a) * 56} y2={cy + Math.sin(a) * 56} />
              );
            })}
          </g>
          {/* bright rim + inner-mouth glow so the round pipe + depth read */}
          <circle cx={cx} cy={cy} r="56" fill="none" stroke={hexA(steelLite, 0.5)} strokeWidth="1.4" />
          <circle cx={cx} cy={cy} r="16" fill="none" stroke={hexA(wet, 0.55)} strokeWidth="2.4" />
          <circle cx={cx} cy={cy} r="10" fill="none" stroke={hexA(wet, 0.3)} strokeWidth="4" />
          {/* vignette */}
          <radialGradient id="sv" cx="50%" cy="40%" r="72%">
            <stop offset="55%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.62)" />
          </radialGradient>
          <rect x="0" y="0" width="100" height="100" fill="url(#sv)" />
        </Svg>
      }
      layers={[
        // ── manhole grate up top + three god-ray light shafts falling from it ──
        { d: 0.06, el: (
          <Svg>
            <g fill={hexA(wetLite, 0.16)} stroke="none">
              <polygon points="46,3 54,3 40,64 32,64" />
              <polygon points="50,3 56,3 62,64 54,64" />
              <polygon points="52,3 58,3 78,64 68,64" />
            </g>
            {/* manhole rim + slots */}
            <ellipse cx="50" cy="3" rx="11" ry="2.6" fill="#0b120e" stroke={steel} strokeWidth="0.6" />
            <g stroke={hexA(steelLite, 0.7)} strokeWidth="0.7">
              {[-6, -3, 0, 3, 6].map((dx) => <line key={dx} x1={50 + dx} y1="1.6" x2={50 + dx} y2="4.4" />)}
            </g>
          </Svg>
        ) },
        // ── grime + moss + a hazard sign on the brick ──
        { d: 0.12, el: (
          <Svg>
            <g fill={hexA("#000000", 0.4)}>
              <path d="M6 0 q4 18 -1 34 l5 0 q4 -16 0 -34 z" />
              <path d="M92 0 q-4 16 1 30 l4 0 q4 -14 0 -30 z" />
            </g>
            <g fill={hexA(wet, 0.22)}>
              <ellipse cx="4" cy="72" rx="9" ry="16" /><ellipse cx="96" cy="66" rx="8" ry="20" />
            </g>
            {/* hazard triangle sign */}
            <g transform="translate(13 46)">
              <path d="M0 6 L4 -2 L8 6 Z" fill="#c9a227" stroke="#111" strokeWidth="0.5" />
              <rect x="3.4" y="1" width="1.2" height="2.6" fill="#111" /><rect x="3.4" y="4.2" width="1.2" height="1" fill="#111" />
            </g>
          </Svg>
        ) },
        // ── bold pipe network across the tunnel: main pipe, drop pipe + valve ──
        { d: 0.4, el: (
          <Svg>
            {/* thick horizontal main pipe */}
            <g>
              <rect x="0" y="62" width="100" height="8" fill={steel} />
              <rect x="0" y="62.4" width="100" height="2.2" fill={steelLite} opacity={0.7} />
              <rect x="0" y="67.6" width="100" height="2" fill="rgba(0,0,0,0.45)" />
              {[20, 58, 86].map((x) => <rect key={x} x={x} y="60" width="3.4" height="12" fill="#3c5044" />)}
              <g fill={hexA(steelLite, 0.6)}>{[6, 14, 30, 44, 68, 78, 94].map((x) => <circle key={x} cx={x} cy="66" r="0.7" />)}</g>
              {[10, 74].map((x) => <rect key={x} x={x} y="55" width="1.8" height="7" fill="#243a30" />)}
            </g>
            {/* vertical drop pipe + elbow + big valve wheel */}
            <g>
              <rect x="66" y="0" width="6" height="62" fill={steel} />
              <rect x="66" y="0" width="2" height="62" fill={steelLite} opacity={0.6} />
              <rect x="63.5" y="28" width="11" height="5" fill="#3c5044" />
              <circle cx="69" cy="18" r="5.4" fill="none" stroke={rust} strokeWidth="1.6" />
              <circle cx="69" cy="18" r="5.4" fill={hexA(rust, 0.12)} />
              <g stroke={rust} strokeWidth="1.2">
                <line x1="63.6" y1="18" x2="74.4" y2="18" /><line x1="69" y1="12.6" x2="69" y2="23.4" />
                <line x1="65.2" y1="14.2" x2="72.8" y2="21.8" /><line x1="72.8" y1="14.2" x2="65.2" y2="21.8" />
              </g>
              <circle cx="69" cy="18" r="1.4" fill={rust} />
            </g>
          </Svg>
        ) },
        // ── iron ladder + hanging chain ──
        { d: 0.55, el: (
          <Svg>
            <g stroke="#3c5044" strokeWidth="1.1">
              <line x1="90" y1="24" x2="90" y2="96" /><line x1="95" y1="24" x2="95" y2="96" />
              {[30, 40, 50, 60, 70, 80, 90].map((y) => <line key={y} x1="90" y1={y} x2="95" y2={y} />)}
            </g>
            <g stroke={hexA(rust, 0.75)} strokeWidth="0.9" fill="none">
              <path d="M24 0 q1.6 6 0 12 q-1.6 6 0 12 q1.6 6 0 12" />
            </g>
          </Svg>
        ) },
        // ── bright glowing water channel: curb, ripples, bubbles, debris, rat ──
        { d: 0.9, el: (
          <Svg>
            <rect x="0" y="82" width="100" height="2.2" fill="#0a120e" />
            <rect x="0" y="84" width="100" height="16" fill={hexA(wet, 0.28)} />
            <rect x="0" y="84" width="100" height="3" fill={hexA(wetLite, 0.6)} />
            <g stroke={hexA(wetLite, 0.7)} strokeWidth="0.7" fill="none">
              <path d="M0 88 q8 -1.6 16 0 t16 0 t16 0 t16 0 t16 0 t16 0">
                <animate attributeName="d" dur="5s" repeatCount="indefinite"
                  values="M0 88 q8 -1.6 16 0 t16 0 t16 0 t16 0 t16 0 t16 0;M0 88 q8 1.6 16 0 t16 0 t16 0 t16 0 t16 0 t16 0;M0 88 q8 -1.6 16 0 t16 0 t16 0 t16 0 t16 0 t16 0" />
              </path>
            </g>
            <g fill={hexA(wetLite, 0.35)}>
              <rect x="67" y="86" width="2.4" height="10" opacity={0.5} /><rect x="20" y="86" width="2" height="10" opacity={0.4} />
            </g>
            <g fill={hexA(wetLite, 0.85)}>
              {[[30, 1.1], [34, 0.7], [56, 0.9], [61, 0.6]].map(([x, r], i) => (
                <circle key={i} cx={x} cy="96" r={r as number}>
                  <animate attributeName="cy" dur={`${3 + i}s`} repeatCount="indefinite" values="97;85;97" />
                  <animate attributeName="opacity" dur={`${3 + i}s`} repeatCount="indefinite" values="0.85;0.1;0.85" />
                </circle>
              ))}
            </g>
            {/* floating debris */}
            <rect x="40" y="86.4" width="12" height="1.8" rx="0.7" fill="#4a3720" opacity={0.9} />
            <rect x="10" y="87" width="4" height="1.6" rx="0.8" fill={hexA(steelLite, 0.5)} />
            {/* rat on the curb with glowing eye */}
            <g transform="translate(84 78)">
              <ellipse cx="0" cy="2.6" rx="3.8" ry="1.8" fill="#0c120e" />
              <circle cx="-3" cy="1.4" r="1.7" fill="#0c120e" />
              <path d="M3.4 2.2 q4.5 -1 5.6 2.4" stroke="#0c120e" strokeWidth="0.7" fill="none" />
              <circle cx="-3.6" cy="1.1" r="0.4" fill={wetLite} />
            </g>
          </Svg>
        ) },
        // ── foreground: drips, steam, dust ──
        { d: 1, el: (
          <Svg>
            <g fill={wetLite}>
              {[24, 52, 80].map((x, i) => (
                <circle key={i} cx={x} cy="70" r="0.8">
                  <animate attributeName="cy" dur={`${2.2 + i * 0.6}s`} repeatCount="indefinite" values="70;84;84" />
                  <animate attributeName="opacity" dur={`${2.2 + i * 0.6}s`} repeatCount="indefinite" values="0;1;0" />
                </circle>
              ))}
            </g>
            <g fill={hexA(wet, 0.07)}>
              <ellipse cx="40" cy="80" rx="26" ry="8" /><ellipse cx="82" cy="82" rx="18" ry="6" />
            </g>
            <g fill={hexA(wetLite, 0.55)}>
              {[[20, 38], [56, 28], [82, 50], [12, 60], [66, 44], [38, 20]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={0.5}>
                  <animate attributeName="opacity" dur={`${4 + (i % 3)}s`} repeatCount="indefinite" values="0.15;0.7;0.15" />
                </circle>
              ))}
            </g>
          </Svg>
        ) },
      ]}
    />
  );
};

const Underground: React.FC<SceneProps> = ({ tier = 1, parallax = 0 }) => {
  const p = tierPalette(tier);
  return (
    <SceneShell
      tier={tier}
      parallax={parallax}
      layers={[
        { d: 0.1, el: (
          <Svg>
            <path d="M0 100 L0 40 Q50 20 100 40 L100 100 Z" fill={p.mid} />
            {/* vanishing-point rails */}
            <path d="M46 100 L49 46 L51 46 L54 100 Z" fill={hexA(p.fg, 0.5)} />
          </Svg>
        ) },
        { d: 0.4, el: (
          <Svg>
            {/* support columns */}
            <g fill={p.fg} opacity={0.7}>
              <rect x="10" y="42" width="5" height="58" />
              <rect x="85" y="42" width="5" height="58" />
            </g>
            {/* ceiling lights */}
            <g fill={p.glow} opacity={0.7}>
              <rect x="30" y="34" width="8" height="1.4" />
              <rect x="62" y="34" width="8" height="1.4" />
            </g>
          </Svg>
        ) },
        { d: 1, el: (
          <Svg>
            <rect x="40" y="70" width="20" height="30" fill={hexA(p.glow, 0.12)} />
          </Svg>
        ) },
      ]}
    />
  );
};

const StreetNight: React.FC<SceneProps> = ({ tier = 2, parallax = 0 }) => {
  const p = tierPalette(tier);
  return (
    <SceneShell
      tier={tier}
      parallax={parallax}
      extra={
        <Svg opacity={0.9}>
          <circle cx="78" cy="18" r="6" fill={hexA(p.glow, 0.55)} />
        </Svg>
      }
      layers={[
        { d: 0.2, el: <Buildings color={hexA(p.mid, 0.7)} baseline={78} specs={[[2, 14, 44], [24, 12, 56], [60, 16, 40], [82, 14, 60]]} windows={p.glow} /> },
        { d: 0.6, el: <Buildings color={p.mid} baseline={92} specs={[[6, 20, 32], [34, 24, 44], [66, 26, 34]]} windows={p.glow} /> },
        { d: 1, el: (
          <Svg>
            {/* streetlamps */}
            {[24, 62].map((x) => (
              <g key={x}>
                <rect x={x} y="80" width="1" height="20" fill={p.fg} />
                <circle cx={x + 0.5} cy="80" r="7" fill={hexA(p.glow, 0.25)} />
              </g>
            ))}
          </Svg>
        ) },
      ]}
    />
  );
};

const Downtown: React.FC<SceneProps> = ({ tier = 3, parallax = 0 }) => {
  const p = tierPalette(tier);
  return (
    <SceneShell
      tier={tier}
      parallax={parallax}
      extra={<Svg><circle cx="24" cy="16" r="8" fill={hexA(p.glow, 0.6)} /></Svg>}
      layers={[
        { d: 0.2, el: <Buildings color={hexA(p.mid, 0.55)} baseline={70} specs={[[4, 16, 50], [30, 14, 62], [70, 18, 46], [90, 12, 58]]} /> },
        { d: 0.6, el: <Buildings color={p.mid} baseline={90} specs={[[2, 22, 40], [30, 26, 52], [64, 30, 44]]} windows={hexA(p.glow, 0.6)} /> },
        { d: 1, el: (
          <Svg>
            <rect x="0" y="94" width="100" height="6" fill={hexA(p.fg, 0.4)} />
            <g fill={hexA(p.glow, 0.5)}>{[10, 40, 72].map((x) => <rect key={x} x={x} y="96" width="6" height="1" />)}</g>
          </Svg>
        ) },
      ]}
    />
  );
};

const Tower: React.FC<SceneProps> = ({ tier = 4, parallax = 0 }) => {
  const p = tierPalette(tier);
  return (
    <SceneShell
      tier={tier}
      parallax={parallax}
      layers={[
        { d: 0.15, el: (
          <Svg>
            <g stroke={hexA(p.mid, 0.9)} strokeWidth="1.2" fill="none">
              {[14, 30, 46, 62, 78, 94].map((y) => <line key={y} x1="0" y1={y} x2="100" y2={y} />)}
              {[16, 34, 52, 70, 88].map((x) => <line key={x} x1={x} y1="6" x2={x} y2="100" />)}
            </g>
          </Svg>
        ) },
        { d: 0.6, el: (
          <Svg>
            {/* lit panels + desk silhouettes */}
            <g fill={hexA(p.glow, 0.16)}>
              <rect x="0" y="14" width="16" height="16" /><rect x="52" y="30" width="18" height="16" /><rect x="70" y="62" width="18" height="16" />
            </g>
            <g fill={hexA(p.mid, 0.9)}>
              <rect x="20" y="80" width="10" height="6" /><rect x="55" y="80" width="10" height="6" />
            </g>
          </Svg>
        ) },
      ]}
    />
  );
};

const Rooftops: React.FC<SceneProps> = ({ tier = 5, parallax = 0 }) => {
  const p = tierPalette(tier);
  return (
    <SceneShell
      tier={tier}
      parallax={parallax}
      extra={<Svg><g fill={hexA(p.fg, 0.5)}>{[[20, 24], [30, 20], [26, 30]].map(([x, y], i) => <path key={i} d={`M${x} ${y} q2 -2 4 0`} stroke={hexA(p.fg, 0.5)} strokeWidth="0.8" fill="none" />)}</g></Svg>}
      layers={[
        { d: 0.2, el: <Buildings color={hexA(p.mid, 0.6)} baseline={60} specs={[[2, 18, 30], [40, 20, 24], [78, 20, 34]]} /> },
        { d: 0.6, el: (
          <Svg>
            <g fill={p.mid}>
              <rect x="0" y="76" width="34" height="24" /><rect x="42" y="70" width="28" height="30" /><rect x="76" y="82" width="24" height="18" />
            </g>
            {/* water tower + antenna */}
            <ellipse cx="18" cy="70" rx="6" ry="6" fill={p.fg} />
            <line x1="54" y1="70" x2="54" y2="52" stroke={p.fg} strokeWidth="1.2" />
            <line x1="54" y1="56" x2="49" y2="61" stroke={p.fg} strokeWidth="0.8" />
            <line x1="54" y1="56" x2="59" y2="61" stroke={p.fg} strokeWidth="0.8" />
          </Svg>
        ) },
      ]}
    />
  );
};

const Skyline: React.FC<SceneProps> = ({ tier = 6, parallax = 0 }) => {
  const p = tierPalette(tier);
  return (
    <SceneShell
      tier={tier}
      parallax={parallax}
      extra={
        <Svg>
          <circle cx="50" cy="40" r="14" fill={hexA(p.glow, 0.65)} />
          <circle cx="50" cy="40" r="22" fill={hexA(p.glow, 0.22)} />
        </Svg>
      }
      layers={[
        { d: 0.2, el: <Buildings color={hexA(p.mid, 0.5)} baseline={78} specs={[[2, 12, 40], [20, 10, 54], [64, 12, 48], [86, 12, 62]]} /> },
        { d: 0.6, el: <Buildings color={p.mid} baseline={94} specs={[[6, 16, 56], [34, 14, 70], [70, 18, 52]]} windows={hexA(p.glow, 0.5)} /> },
        { d: 1, el: (
          <Svg>
            {/* birds */}
            <g stroke={hexA(p.mid, 0.8)} strokeWidth="0.7" fill="none">
              {[[70, 22], [76, 26], [64, 30]].map(([x, y], i) => <path key={i} d={`M${x} ${y} q2 -2 4 0 q2 2 4 0`} />)}
            </g>
          </Svg>
        ) },
      ]}
    />
  );
};

const Clouds: React.FC<SceneProps> = ({ tier = 7, parallax = 0 }) => {
  const p = tierPalette(tier);
  const puff = (cx: number, cy: number, s: number, o: number) => (
    <g fill={p.fg} opacity={o}>
      <ellipse cx={cx} cy={cy} rx={13 * s} ry={5.5 * s} />
      <ellipse cx={cx - 9 * s} cy={cy + 2 * s} rx={8 * s} ry={4.2 * s} />
      <ellipse cx={cx + 9 * s} cy={cy + 2 * s} rx={8 * s} ry={4.2 * s} />
      <ellipse cx={cx} cy={cy - 3 * s} rx={7 * s} ry={4 * s} />
    </g>
  );
  return (
    <SceneShell
      tier={tier}
      parallax={parallax}
      layers={[
        { d: 0.2, el: <Svg>{puff(28, 24, 1.2, 0.5)}{puff(80, 40, 1, 0.45)}</Svg> },
        { d: 0.6, el: <Svg>{puff(58, 60, 1.5, 0.7)}{puff(14, 72, 1.2, 0.65)}</Svg> },
        { d: 1, el: <Svg>{puff(70, 90, 2.1, 0.95)}{puff(20, 96, 1.8, 0.9)}</Svg> },
      ]}
    />
  );
};

const JetStream: React.FC<SceneProps> = ({ tier = 8, parallax = 0 }) => {
  const p = tierPalette(tier);
  return (
    <SceneShell
      tier={tier}
      parallax={parallax}
      layers={[
        { d: 0.2, el: (
          <Svg>
            <g stroke={hexA(p.fg, 0.5)} strokeWidth="1.6" fill="none" strokeLinecap="round">
              {[26, 40, 58, 74].map((y) => <path key={y} d={`M-6 ${y} q50 -6 112 0`} />)}
            </g>
          </Svg>
        ) },
        { d: 0.8, el: (
          <Svg>
            {/* airplane + contrail */}
            <path d="M20 44 h60" stroke={hexA(p.fg, 0.7)} strokeWidth="1" strokeDasharray="2 3" />
            <g fill={p.fg}>
              <path d="M80 44 l6 -1.5 l-1 3 z" />
              <rect x="74" y="43.4" width="8" height="1.6" rx="0.8" />
            </g>
          </Svg>
        ) },
      ]}
    />
  );
};

const Stratosphere: React.FC<SceneProps> = ({ tier = 9, parallax = 0 }) => {
  const p = tierPalette(tier);
  return (
    <SceneShell
      tier={tier}
      parallax={parallax}
      layers={[
        { d: 0.1, el: (
          <Svg>
            {/* curved horizon far below with atmosphere haze */}
            <path d="M-20 108 Q50 80 120 108" stroke={hexA(p.glow, 0.6)} strokeWidth="3" fill="none" />
            <path d="M-20 116 Q50 88 120 116" stroke={hexA(p.fg, 0.4)} strokeWidth="8" fill="none" />
          </Svg>
        ) },
        { d: 0.6, el: (
          <Svg>
            <g fill={p.fg} opacity={0.35}>
              <ellipse cx="34" cy="60" rx="20" ry="2" /><ellipse cx="74" cy="46" rx="14" ry="1.6" />
            </g>
          </Svg>
        ) },
      ]}
    />
  );
};

const LowOrbit: React.FC<SceneProps> = ({ tier = 10, parallax = 0 }) => {
  const p = tierPalette(tier);
  return (
    <SceneShell
      tier={tier}
      parallax={parallax}
      extra={
        <Svg>
          <defs>
            <radialGradient id="earthGrad" cx="50%" cy="120%" r="80%">
              <stop offset="0%" stopColor={p.glow} />
              <stop offset="50%" stopColor="#2f6fb0" />
              <stop offset="100%" stopColor={p.sky[0]} />
            </radialGradient>
          </defs>
          <ellipse cx="50" cy="150" rx="95" ry="74" fill="url(#earthGrad)" />
          <path d="M-40 88 Q50 62 140 88" stroke={hexA(p.glow, 0.7)} strokeWidth="1.6" fill="none" />
        </Svg>
      }
      layers={[
        { d: 0.8, el: (
          <Svg>
            {/* satellite */}
            <g fill={p.fg} opacity={0.85}>
              <rect x="66" y="26" width="6" height="2.4" />
              <rect x="62" y="25" width="2.6" height="4.4" /><rect x="73.4" y="25" width="2.6" height="4.4" />
            </g>
          </Svg>
        ) },
      ]}
    />
  );
};

const DeepSpace: React.FC<SceneProps> = ({ tier = 11, parallax = 0 }) => {
  const p = tierPalette(tier);
  return (
    <SceneShell
      tier={tier}
      parallax={parallax}
      extra={
        <div
          className={fill}
          style={{ background: `radial-gradient(55% 40% at 68% 32%, ${hexA(p.fg, 0.4)}, transparent 60%)` }}
        />
      }
      layers={[
        { d: 0.6, el: (
          <Svg>
            {/* distant ringed planet */}
            <circle cx="26" cy="30" r="9" fill={p.mid} />
            <circle cx="23" cy="27" r="3" fill={hexA(p.sky[0], 0.6)} />
            <ellipse cx="26" cy="30" rx="16" ry="3.4" fill="none" stroke={hexA(p.glow, 0.55)} strokeWidth="1" />
          </Svg>
        ) },
        { d: 1, el: (
          <Svg>
            {/* comet streak */}
            <path d="M84 14 l-14 10" stroke={hexA(p.glow, 0.6)} strokeWidth="0.8" />
            <circle cx="84" cy="14" r="1.2" fill={p.glow} />
          </Svg>
        ) },
      ]}
    />
  );
};

/** Registry: tier index → scene component. Swap any entry for illustrated art. */
export const SCENES: Record<number, React.FC<SceneProps>> = {
  0: Sewers,
  1: Underground,
  2: StreetNight,
  3: Downtown,
  4: Tower,
  5: Rooftops,
  6: Skyline,
  7: Clouds,
  8: JetStream,
  9: Stratosphere,
  10: LowOrbit,
  11: DeepSpace,
};

export function sceneForTier(tier: number): React.FC<SceneProps> {
  return SCENES[clampTier(tier)] ?? Sewers;
}

/**
 * Full-bleed backdrop that cross-fades the two biomes straddling the current
 * continuous position so adjacent stages blend at unit boundaries. Driven by a
 * single `fraction` (0 = bottom/sewers, 1 = top/deep space) + a `parallax`
 * offset — owns NO node/progress logic.
 */
export const EnvironmentBackdrop: React.FC<{ fraction: number; parallax?: number }> = ({ fraction, parallax = 0 }) => {
  const f = Math.max(0, Math.min(1, fraction));
  const scaled = f * (TIER_COUNT - 1);
  const lower = Math.floor(scaled);
  const upper = Math.min(TIER_COUNT - 1, lower + 1);
  const blend = tierBlend(scaled); // 0 at lower tier → 1 at upper
  const Lower = sceneForTier(lower);
  const Upper = sceneForTier(upper);
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0">
        <Lower tier={lower} parallax={parallax} />
      </div>
      {upper !== lower && (
        <div className="absolute inset-0" style={{ opacity: blend, transition: "opacity 120ms linear" }}>
          <Upper tier={upper} parallax={parallax} />
        </div>
      )}
    </div>
  );
};
