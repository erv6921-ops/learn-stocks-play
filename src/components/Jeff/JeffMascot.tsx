import React, { useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import type { JeffMoodType } from "@/contexts/JeffContext"

// Mouth path variants (face coords, viewBox 0 0 100 150).
const MOUTH = {
  happy: "M42 56 Q50 63 58 56",
  bigSmile: "M39 54 Q50 68 61 54",
  neutral: "M44 58 Q50 60 56 58",
  flat: "M44 58 L56 58",
  o: "M50 57 m-4 0 a4 4.5 0 1 0 8 0 a4 4.5 0 1 0 -8 0",
}

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))
const loop = (dur: number) => ({ duration: dur, repeat: Infinity, repeatType: "mirror" as const, ease: "easeInOut" as const })

interface MoodCfg {
  bobY: number[]
  bobDur: number
  rightArm: number[] | number
  leftArm: number[] | number
  armDur: number
  mouth: keyof typeof MOUTH
  eyesOpen: boolean
  headTilt: number[] | null   // null = follow cursor
  pupil: { x: number; y: number } | null  // null = follow cursor
  brows: "neutral" | "raised" | "happy"
}

const MOODS: Record<JeffMoodType, MoodCfg> = {
  idle:      { bobY: [0, -3, 0],  bobDur: 2.6, rightArm: [6, 12, 6],     leftArm: [-6, -12, -6], armDur: 2.6, mouth: "happy",    eyesOpen: true,  headTilt: null,        pupil: null,            brows: "neutral" },
  celebrate: { bobY: [0, -22, 0], bobDur: 0.45,rightArm: [10, -135, 10], leftArm: [-10, 135, -10], armDur: 0.45, mouth: "bigSmile", eyesOpen: true,  headTilt: [0, 0, 0],   pupil: { x: 0, y: -1 }, brows: "happy" },
  encourage: { bobY: [0, -5, 0],  bobDur: 1.4, rightArm: [10, -55, 10],  leftArm: [-6, -10, -6], armDur: 0.55,mouth: "happy",    eyesOpen: true,  headTilt: null,        pupil: null,            brows: "happy" },
  think:     { bobY: [0, -2, 0],  bobDur: 3.4, rightArm: 16,             leftArm: -6,            armDur: 3.4, mouth: "flat",     eyesOpen: true,  headTilt: [-8, 8, -8], pupil: { x: -2.6, y: -1 }, brows: "raised" },
  sleep:     { bobY: [0, -1.5, 0],bobDur: 4,   rightArm: 5,              leftArm: -5,            armDur: 4,   mouth: "neutral",  eyesOpen: false, headTilt: [0, 0, 0],   pupil: { x: 0, y: 0 },  brows: "neutral" },
}

const BROWS: Record<MoodCfg["brows"], { l: string; r: string }> = {
  neutral: { l: "M36 30 Q41 28 46 30", r: "M54 30 Q59 28 64 30" },
  raised:  { l: "M36 30 Q41 28 46 30", r: "M54 26 Q59 23 64 27" },
  happy:   { l: "M36 31 Q41 27 46 30", r: "M54 30 Q59 27 64 31" },
}

/**
 * Animated SVG "Jeff" — an adventurer boy (explorer hat + backpack) who breathes,
 * blinks, tracks your cursor with his eyes/head, waves on hover, and reacts to
 * events. Fills its container (size controlled by the parent).
 *
 * SWAP: replace the inline <svg> below with a richer asset when ready — e.g.
 * <img src={jeffImagePath}> (import jeffImagePath from "@/assets/jeff-character.png")
 * or a Lottie/Rive player — keeping the wrapping motion bob/wiggle.
 */
export function JeffMascot({ mood = "idle", waving = false }: { mood?: JeffMoodType; waving?: boolean }) {
  const c = MOODS[mood]
  const tracking = c.pupil === null // idle / encourage follow the cursor
  const ref = useRef<SVGSVGElement | null>(null)

  // Cursor-following eyes + head (the "alive" bit).
  const pxRaw = useMotionValue(0)
  const pyRaw = useMotionValue(0)
  const hrRaw = useMotionValue(0)
  const px = useSpring(pxRaw, { stiffness: 140, damping: 15 })
  const py = useSpring(pyRaw, { stiffness: 140, damping: 15 })
  const headR = useSpring(hrRaw, { stiffness: 90, damping: 13 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height * 0.3
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy) || 1
      pxRaw.set(clamp((dx / dist) * 2.8, -2.8, 2.8))
      pyRaw.set(clamp((dy / dist) * 2.2, -2, 2.2))
      hrRaw.set(clamp(dx / 45, -9, 9))
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [pxRaw, pyRaw, hrRaw])

  const rightArm = waving && mood !== "celebrate" ? [10, -60, 10] : c.rightArm
  const rightArmDur = waving && mood !== "celebrate" ? 0.4 : c.armDur

  return (
    <svg ref={ref} viewBox="0 0 100 150" width="100%" height="100%" aria-label="Jeff the adventurer" role="img">
      <defs>
        <linearGradient id="jeffShirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c8059" />
          <stop offset="1" stopColor="#15604a" />
        </linearGradient>
      </defs>

      {/* Ground shadow — shrinks as Jeff rises */}
      <motion.ellipse
        cx="50" cy="144" rx="26" ry="5" fill="rgba(6,41,31,0.22)"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        animate={{ scaleX: c.bobY.map(v => 1 + v / 70), opacity: c.bobY.map(v => 0.22 + v / 260) }}
        transition={loop(c.bobDur)}
      />

      {/* Whole-body bob */}
      <motion.g animate={{ y: c.bobY }} transition={loop(c.bobDur)}>
        {/* Backpack peeking behind shoulders */}
        <rect x="22" y="60" width="14" height="20" rx="6" fill="#9a5a2b" />
        <rect x="64" y="60" width="14" height="20" rx="6" fill="#9a5a2b" />

        {/* Legs + boots */}
        <rect x="40" y="104" width="8" height="20" rx="4" fill="#2f6db0" />
        <rect x="52" y="104" width="8" height="20" rx="4" fill="#2f6db0" />
        <rect x="37" y="120" width="13" height="8" rx="4" fill="#5a3d22" />
        <rect x="50" y="120" width="13" height="8" rx="4" fill="#5a3d22" />

        {/* Left arm */}
        <motion.g style={{ transformBox: "fill-box", transformOrigin: "top center" }} animate={{ rotate: c.leftArm }} transition={loop(c.armDur)}>
          <rect x="22" y="66" width="9" height="26" rx="4.5" fill="#1c8059" />
          <circle cx="26.5" cy="92" r="5" fill="#fcd9a8" />
        </motion.g>
        {/* Right arm (waves on hover/encourage, raises on celebrate) */}
        <motion.g style={{ transformBox: "fill-box", transformOrigin: "top center" }} animate={{ rotate: rightArm }} transition={loop(rightArmDur)}>
          <rect x="69" y="66" width="9" height="26" rx="4.5" fill="#1c8059" />
          <circle cx="73.5" cy="92" r="5" fill="#fcd9a8" />
        </motion.g>

        {/* Torso / shirt with gentle breathing */}
        <motion.g style={{ transformBox: "fill-box", transformOrigin: "center top" }}
          animate={{ scaleY: [1, 1.04, 1], scaleX: [1, 0.99, 1] }} transition={loop(2.2)}>
          <rect x="31" y="62" width="38" height="46" rx="15" fill="url(#jeffShirt)" />
          {/* Backpack straps */}
          <rect x="38" y="62" width="5" height="40" rx="2.5" fill="#7a4a22" />
          <rect x="57" y="62" width="5" height="40" rx="2.5" fill="#7a4a22" />
          {/* Coin emblem on a strap */}
          <circle cx="40.5" cy="80" r="4.5" fill="#e0a52e" stroke="#b9831c" strokeWidth="1.2" />
          <text x="40.5" y="83" textAnchor="middle" fontSize="6" fontWeight="800" fill="#5a3d00" fontFamily="system-ui, sans-serif">$</text>
        </motion.g>

        {/* Head group (tilts toward cursor when idle, else per mood) */}
        <motion.g
          style={c.headTilt === null ? { transformBox: "fill-box", transformOrigin: "center bottom", rotate: headR } : { transformBox: "fill-box", transformOrigin: "center bottom" }}
          animate={c.headTilt === null ? undefined : { rotate: c.headTilt }}
          transition={c.headTilt === null ? undefined : loop(c.bobDur)}
        >
          {/* Ears */}
          <circle cx="29" cy="40" r="4" fill="#fcd9a8" />
          <circle cx="71" cy="40" r="4" fill="#fcd9a8" />
          {/* Head */}
          <ellipse cx="50" cy="40" rx="22" ry="20.5" fill="#fcd9a8" />
          {/* Hair fringe under the hat */}
          <path d="M30 30 Q50 20 70 30 Q66 26 50 25 Q34 26 30 30 Z" fill="#6b4324" />
          <path d="M30 30 Q34 34 40 31 Q44 35 50 31 Q56 35 60 31 Q66 34 70 30 L70 27 Q50 22 30 27 Z" fill="#6b4324" />

          {/* Explorer hat: brim + dome + band + gold pin */}
          <ellipse cx="50" cy="24" rx="30" ry="7" fill="#a87a3e" />
          <ellipse cx="50" cy="23" rx="30" ry="6" fill="#b9894a" />
          <path d="M33 24 Q34 6 50 6 Q66 6 67 24 Z" fill="#b9894a" />
          <path d="M33 24 Q34 6 50 6 Q66 6 67 24 Z" fill="none" stroke="#9a6a32" strokeWidth="1" />
          <rect x="33" y="19" width="34" height="5" rx="2.5" fill="#5a3d22" />
          <circle cx="62" cy="21.5" r="3" fill="#e0a52e" stroke="#b9831c" strokeWidth="1" />

          {/* Eyes */}
          {c.eyesOpen ? (
            <>
              <ellipse cx="42" cy="40" rx="6.5" ry="7" fill="#fff" />
              <ellipse cx="58" cy="40" rx="6.5" ry="7" fill="#fff" />
              {tracking ? (
                <>
                  <motion.circle cx="42" cy="40.5" r="3.2" fill="#1e293b" style={{ x: px, y: py }} />
                  <motion.circle cx="58" cy="40.5" r="3.2" fill="#1e293b" style={{ x: px, y: py }} />
                </>
              ) : (
                <>
                  <motion.circle cx="42" cy="40.5" r="3.2" fill="#1e293b" animate={{ x: c.pupil!.x, y: c.pupil!.y }} transition={{ duration: 0.4 }} />
                  <motion.circle cx="58" cy="40.5" r="3.2" fill="#1e293b" animate={{ x: c.pupil!.x, y: c.pupil!.y }} transition={{ duration: 0.4 }} />
                </>
              )}
              {/* eye sparkle */}
              <circle cx="43.4" cy="38.8" r="1" fill="#fff" />
              <circle cx="59.4" cy="38.8" r="1" fill="#fff" />
              {/* Blink: skin lids drop briefly */}
              <motion.rect x="35.5" y="33" width="13" height="14" rx="6.5" fill="#fcd9a8"
                style={{ transformBox: "fill-box", transformOrigin: "top center" }}
                animate={{ scaleY: [0, 0, 1, 0, 0] }}
                transition={{ duration: 3, repeat: Infinity, times: [0, 0.9, 0.95, 0.99, 1] }} />
              <motion.rect x="51.5" y="33" width="13" height="14" rx="6.5" fill="#fcd9a8"
                style={{ transformBox: "fill-box", transformOrigin: "top center" }}
                animate={{ scaleY: [0, 0, 1, 0, 0] }}
                transition={{ duration: 3, repeat: Infinity, times: [0, 0.9, 0.95, 0.99, 1] }} />
            </>
          ) : (
            <>
              <path d="M36 41 Q42 45 48 41" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M52 41 Q58 45 64 41" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round" />
            </>
          )}

          {/* Eyebrows */}
          <path d={BROWS[c.brows].l} stroke="#5a3d22" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d={BROWS[c.brows].r} stroke="#5a3d22" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Mouth */}
          <path d={MOUTH[c.mouth]} stroke="#9a4a2f" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </motion.g>
      </motion.g>

      {/* Celebrate star particles */}
      <AnimatePresence>
        {mood === "celebrate" && (
          <g>
            {[{ x: 20, y: 28, d: 0 }, { x: 80, y: 24, d: 0.15 }, { x: 28, y: 12, d: 0.3 }, { x: 72, y: 14, d: 0.45 }].map((s, i) => (
              <motion.path key={i}
                d="M0 -5 L1.4 -1.5 L5 -1.5 L2 1 L3 5 L0 2.4 L-3 5 L-2 1 L-5 -1.5 L-1.4 -1.5 Z"
                fill="#e0a52e" style={{ transformBox: "fill-box", transformOrigin: "center" }}
                initial={{ opacity: 0, scale: 0, x: s.x, y: s.y + 8 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.4], x: s.x, y: [s.y + 8, s.y - 6, s.y - 14] }}
                transition={{ duration: 1, repeat: Infinity, delay: s.d, ease: "easeOut" }} />
            ))}
          </g>
        )}
      </AnimatePresence>

      {/* Sleep Zzz */}
      <AnimatePresence>
        {mood === "sleep" && (
          <g>
            {[{ x: 66, size: 9, d: 0 }, { x: 72, size: 11, d: 0.6 }, { x: 79, size: 13, d: 1.2 }].map((z, i) => (
              <motion.text key={i} x={z.x} y={26} fontSize={z.size} fontWeight="800" fill="#7fae9a" fontFamily="system-ui, sans-serif"
                initial={{ opacity: 0, y: 26 }} animate={{ opacity: [0, 1, 0], y: [26, 12, 2] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: z.d, ease: "easeOut" }}>z</motion.text>
            ))}
          </g>
        )}
      </AnimatePresence>
    </svg>
  )
}

export default JeffMascot
