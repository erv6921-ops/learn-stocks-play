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

const Sewers: React.FC<SceneProps> = ({ tier = 0, parallax = 0 }) => {
  const p = tierPalette(tier);
  return (
    <SceneShell
      tier={tier}
      parallax={parallax}
      layers={[
        { d: 0.1, el: (
          <Svg>
            <path d="M0 100 L0 48 Q50 12 100 48 L100 100 Z" fill={p.mid} />
            <path d="M14 100 L14 56 Q50 28 86 56 L86 100 Z" fill={hexA(p.sky[0], 0.9)} />
          </Svg>
        ) },
        { d: 0.5, el: (
          <Svg>
            {/* pipes */}
            <rect x="0" y="66" width="100" height="2.4" fill={p.fg} opacity={0.85} />
            <rect x="68" y="0" width="3.4" height="70" fill={p.fg} opacity={0.75} />
            <circle cx="69.7" cy="66" r="2.4" fill={p.fg} />
            {/* brick lines */}
            <g stroke={hexA(p.fg, 0.25)} strokeWidth="0.4">
              {[74, 82, 90].map((y) => <line key={y} x1="0" y1={y} x2="100" y2={y} />)}
            </g>
          </Svg>
        ) },
        { d: 1, el: (
          <Svg>
            {/* glowing water + drips + dust motes */}
            <rect x="0" y="96" width="100" height="8" fill={hexA(p.glow, 0.18)} />
            <circle cx="70" cy="76" r="1" fill={p.glow} opacity={0.8} />
            <circle cx="30" cy="90" r="1.3" fill={p.glow} opacity={0.6} />
            {[[20, 40], [55, 30], [82, 52], [12, 62]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={0.5} fill={p.glow} opacity={0.4} />
            ))}
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
