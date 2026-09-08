import React from "react";
import { tierPalette, tierBlend, clampTier, TIER_COUNT } from "@/lib/pathEnvironments";

// ── Swappable environment scenes for the lesson path ────────────────────────
//
// Each tier is ONE self-contained component with a single clean interface
// (`SceneProps` — tier index in, a full-bleed layered scene out). They are
// registered in `SCENES` by tier index. This is deliberately placeholder
// procedural art: to drop in real illustrations later, replace an entry in
// `SCENES` with a component that renders an <img>/<svg> asset — nothing in the
// path/progress logic (LessonPath.tsx) references scene internals.
//
// A scene owns three stacked layers:
//   • background  — the sky/ambient gradient (from the tier palette)
//   • mid         — silhouettes that drift slowly on scroll (parallax)
//   • foreground  — nearer detail that drifts a touch faster
//
// `EnvironmentBackdrop` composes two adjacent scenes and cross-fades them by
// the intra-tier blend so unit boundaries never show a hard seam.

export interface SceneProps {
  tier: number;
  /** px offset for the slow parallax drift. 0 when reduced-motion is on. */
  parallax?: number;
}

const fill = "absolute inset-0 h-full w-full";

/** Shared plumbing: gradient sky + two parallax layers. */
const SceneShell: React.FC<{
  tier: number;
  parallax: number;
  mid: React.ReactNode;
  fg: React.ReactNode;
  extra?: React.ReactNode;
}> = ({ tier, parallax, mid, fg, extra }) => {
  const p = tierPalette(tier);
  return (
    <div className={fill} aria-hidden style={{ background: `linear-gradient(to top, ${p.sky[0]}, ${p.sky[1]})` }}>
      {p.stars && <Stars glow={p.glow} />}
      {extra}
      <div className={fill} style={{ transform: `translateY(${parallax * 0.35}px)`, willChange: "transform" }}>
        {mid}
      </div>
      <div className={fill} style={{ transform: `translateY(${parallax * 0.7}px)`, willChange: "transform" }}>
        {fg}
      </div>
      {/* soft ambient glow blooming from the horizon */}
      <div
        className={fill}
        style={{ background: `radial-gradient(120% 60% at 50% 100%, ${hexA(p.glow, 0.18)}, transparent 70%)` }}
      />
    </div>
  );
};

const Svg: React.FC<{ children: React.ReactNode; className?: string; opacity?: number }> = ({ children, className, opacity }) => (
  <svg className={className ?? fill} viewBox="0 0 100 100" preserveAspectRatio="xMidYMax slice" style={{ opacity }}>
    {children}
  </svg>
);

const Stars: React.FC<{ glow: string }> = ({ glow }) => (
  <Svg opacity={0.9}>
    {STAR_POSITIONS.map(([x, y, r], i) => (
      <circle key={i} cx={x} cy={y} r={r} fill={glow} opacity={0.5 + (i % 3) * 0.2} />
    ))}
  </Svg>
);
// Deterministic star field (no per-render randomness → no flicker on scroll).
const STAR_POSITIONS: [number, number, number][] = Array.from({ length: 46 }, (_, i) => {
  const x = (i * 61.803) % 100;
  const y = (i * 37.117) % 78;
  const r = 0.18 + ((i * 7) % 5) * 0.09;
  return [x, y, r];
});

function hexA(hex: string, a: number): string {
  const h = hex.replace("#", "");
  const v = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return `rgba(${parseInt(v.slice(0, 2), 16)},${parseInt(v.slice(2, 4), 16)},${parseInt(v.slice(4, 6), 16)},${a})`;
}

// ── The eight tier scenes ───────────────────────────────────────────────────
// Each pulls its colors from the tier palette so the whole set stays coherent.

const SewerScene: React.FC<SceneProps> = ({ tier = 0, parallax = 0 }) => {
  const p = tierPalette(tier);
  return (
    <SceneShell
      tier={tier}
      parallax={parallax}
      mid={
        <Svg>
          {/* tunnel arch */}
          <path d="M0 100 L0 55 Q50 20 100 55 L100 100 Z" fill={p.mid} />
          <path d="M12 100 L12 60 Q50 34 88 60 L88 100 Z" fill={hexA(p.sky[0], 0.85)} />
        </Svg>
      }
      fg={
        <Svg>
          {/* pipes + drips */}
          <rect x="0" y="70" width="100" height="3" fill={p.fg} opacity={0.8} />
          <rect x="70" y="0" width="4" height="74" fill={p.fg} opacity={0.7} />
          <circle cx="72" cy="80" r="1.1" fill={p.glow} opacity={0.7} />
          <circle cx="30" cy="92" r="1.4" fill={p.glow} opacity={0.5} />
        </Svg>
      }
    />
  );
};

const StreetScene: React.FC<SceneProps> = ({ tier = 1, parallax = 0 }) => {
  const p = tierPalette(tier);
  return (
    <SceneShell
      tier={tier}
      parallax={parallax}
      mid={
        <Svg>
          <g fill={p.mid}>
            <rect x="4" y="58" width="16" height="42" />
            <rect x="26" y="46" width="14" height="54" />
            <rect x="60" y="52" width="18" height="48" />
            <rect x="82" y="40" width="14" height="60" />
          </g>
        </Svg>
      }
      fg={
        <Svg>
          {/* lit windows + streetlamp glow */}
          <g fill={p.glow} opacity={0.7}>
            <rect x="30" y="52" width="2" height="3" />
            <rect x="35" y="60" width="2" height="3" />
            <rect x="85" y="48" width="2" height="3" />
            <rect x="90" y="56" width="2" height="3" />
          </g>
          <circle cx="50" cy="86" r="10" fill={hexA(p.glow, 0.22)} />
        </Svg>
      }
    />
  );
};

const InteriorScene: React.FC<SceneProps> = ({ tier = 2, parallax = 0 }) => {
  const p = tierPalette(tier);
  return (
    <SceneShell
      tier={tier}
      parallax={parallax}
      mid={
        <Svg>
          {/* window grid of a big interior */}
          <g stroke={p.mid} strokeWidth="1.4" fill="none">
            {[20, 40, 60, 80].map((y) => (
              <line key={y} x1="0" y1={y} x2="100" y2={y} />
            ))}
            {[20, 40, 60, 80].map((x) => (
              <line key={x} x1={x} y1="10" x2={x} y2="100" />
            ))}
          </g>
        </Svg>
      }
      fg={
        <Svg>
          <g fill={hexA(p.glow, 0.16)}>
            <rect x="0" y="10" width="20" height="20" />
            <rect x="40" y="30" width="20" height="20" />
            <rect x="80" y="50" width="20" height="20" />
          </g>
        </Svg>
      }
    />
  );
};

const RooftopScene: React.FC<SceneProps> = ({ tier = 3, parallax = 0 }) => {
  const p = tierPalette(tier);
  return (
    <SceneShell
      tier={tier}
      parallax={parallax}
      mid={
        <Svg>
          <g fill={p.mid}>
            <rect x="0" y="74" width="30" height="26" />
            <rect x="40" y="68" width="26" height="32" />
            <rect x="74" y="80" width="26" height="20" />
          </g>
        </Svg>
      }
      fg={
        <Svg>
          {/* antenna + water tower */}
          <line x1="52" y1="68" x2="52" y2="50" stroke={p.fg} strokeWidth="1.2" />
          <line x1="52" y1="55" x2="47" y2="60" stroke={p.fg} strokeWidth="1" />
          <line x1="52" y1="55" x2="57" y2="60" stroke={p.fg} strokeWidth="1" />
          <ellipse cx="20" cy="86" rx="18" ry="8" fill={hexA(p.glow, 0.5)} />
        </Svg>
      }
    />
  );
};

const CloudsScene: React.FC<SceneProps> = ({ tier = 4, parallax = 0 }) => {
  const p = tierPalette(tier);
  const puff = (cx: number, cy: number, s: number, o: number) => (
    <g fill={p.fg} opacity={o}>
      <ellipse cx={cx} cy={cy} rx={12 * s} ry={5 * s} />
      <ellipse cx={cx - 8 * s} cy={cy + 2 * s} rx={8 * s} ry={4 * s} />
      <ellipse cx={cx + 8 * s} cy={cy + 2 * s} rx={8 * s} ry={4 * s} />
    </g>
  );
  return (
    <SceneShell
      tier={tier}
      parallax={parallax}
      mid={<Svg>{puff(30, 30, 1.4, 0.55)}{puff(78, 55, 1.1, 0.5)}</Svg>}
      fg={<Svg>{puff(60, 80, 1.9, 0.85)}{puff(15, 92, 1.5, 0.8)}</Svg>}
    />
  );
};

const AtmosphereScene: React.FC<SceneProps> = ({ tier = 5, parallax = 0 }) => {
  const p = tierPalette(tier);
  return (
    <SceneShell
      tier={tier}
      parallax={parallax}
      mid={
        <Svg>
          {/* faint curved horizon glow */}
          <path d="M-20 105 Q50 78 120 105" stroke={hexA(p.glow, 0.5)} strokeWidth="3" fill="none" />
          <path d="M-20 112 Q50 86 120 112" stroke={hexA(p.fg, 0.4)} strokeWidth="6" fill="none" />
        </Svg>
      }
      fg={
        <Svg>
          <g fill={p.fg} opacity={0.4}>
            <ellipse cx="35" cy="40" rx="18" ry="2.4" />
            <ellipse cx="72" cy="24" rx="12" ry="1.8" />
          </g>
        </Svg>
      }
    />
  );
};

const OrbitScene: React.FC<SceneProps> = ({ tier = 6, parallax = 0 }) => {
  const p = tierPalette(tier);
  return (
    <SceneShell
      tier={tier}
      parallax={parallax}
      extra={
        <Svg>
          {/* Earth's limb curving across the bottom */}
          <defs>
            <radialGradient id="earthGrad" cx="50%" cy="120%" r="80%">
              <stop offset="0%" stopColor={p.glow} />
              <stop offset="55%" stopColor={p.mid} />
              <stop offset="100%" stopColor={p.sky[0]} />
            </radialGradient>
          </defs>
          <ellipse cx="50" cy="150" rx="90" ry="70" fill="url(#earthGrad)" />
          <path d="M-40 92 Q50 66 140 92" stroke={hexA(p.glow, 0.6)} strokeWidth="1.6" fill="none" />
        </Svg>
      }
      mid={<span />}
      fg={
        <Svg>
          {/* a drifting satellite dash */}
          <g fill={p.fg} opacity={0.8}>
            <rect x="66" y="26" width="6" height="2" />
            <rect x="63" y="25" width="2" height="4" />
            <rect x="72" y="25" width="2" height="4" />
          </g>
        </Svg>
      }
    />
  );
};

const DeepSpaceScene: React.FC<SceneProps> = ({ tier = 7, parallax = 0 }) => {
  const p = tierPalette(tier);
  return (
    <SceneShell
      tier={tier}
      parallax={parallax}
      extra={
        <div
          className={fill}
          style={{ background: `radial-gradient(60% 40% at 70% 30%, ${hexA(p.fg, 0.35)}, transparent 60%)` }}
        />
      }
      mid={<span />}
      fg={
        <Svg>
          {/* distant planet */}
          <circle cx="26" cy="30" r="9" fill={p.mid} />
          <ellipse cx="26" cy="30" rx="15" ry="3" fill="none" stroke={hexA(p.glow, 0.5)} strokeWidth="1" />
        </Svg>
      }
    />
  );
};

/** Registry: tier index → scene component. Swap any entry for illustrated art. */
export const SCENES: Record<number, React.FC<SceneProps>> = {
  0: SewerScene,
  1: StreetScene,
  2: InteriorScene,
  3: RooftopScene,
  4: CloudsScene,
  5: AtmosphereScene,
  6: OrbitScene,
  7: DeepSpaceScene,
};

export function sceneForTier(tier: number): React.FC<SceneProps> {
  return SCENES[clampTier(tier)] ?? SewerScene;
}

/**
 * Full-bleed backdrop that cross-fades the two scenes straddling the current
 * continuous position, so adjacent tiers blend at unit boundaries. Drives all
 * scene rendering off a single `fraction` (0 = bottom/sewer, 1 = top/space) and
 * a `parallax` offset — it owns NO node/progress logic.
 */
export const EnvironmentBackdrop: React.FC<{ fraction: number; parallax?: number }> = ({ fraction, parallax = 0 }) => {
  const f = Math.max(0, Math.min(1, fraction));
  const scaled = f * (TIER_COUNT - 1);
  const lower = Math.floor(scaled);
  const upper = Math.min(TIER_COUNT - 1, lower + 1);
  const blend = tierBlend(f); // 0 at lower tier → 1 at upper
  const Lower = sceneForTier(lower);
  const Upper = sceneForTier(upper);
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0" style={{ opacity: 1 }}>
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
