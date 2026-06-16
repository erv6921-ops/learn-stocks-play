import React, { useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, animate } from "framer-motion"
import type { JeffMoodType, JeffActivity } from "@/contexts/JeffContext"

// Mouth path variants (face coords, viewBox 0 0 100 150).
const MOUTH = {
  happy: "M42 56 Q50 63 58 56",
  bigSmile: "M39 54 Q50 68 61 54",
  neutral: "M44 58 Q50 60 56 58",
  flat: "M44 58 L56 58",
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
 * Animated SVG "Jeff" — adventurer boy who breathes, blinks, tracks the cursor,
 * waves on hover, and plays autonomous activities (walk, cook, pack, nap, jump).
 * Eyes/head are driven by stable MotionValues (never switching control mode), so
 * mood/activity changes can't crash mid-render.
 *
 * SWAP: replace the inline <svg> with a richer asset when ready (img / Lottie /
 * Rive), keeping the wrapping motion bob/wiggle.
 */
export function JeffMascot({ mood = "idle", waving = false, activity = "none" }: { mood?: JeffMoodType; waving?: boolean; activity?: JeffActivity }) {
  const c = MOODS[mood]
  const ref = useRef<SVGSVGElement | null>(null)

  const walking = activity === "walkAcross" || activity === "walkSide"
  const cooking = activity === "cook"
  const packing = activity === "pack"
  const napping = activity === "nap"
  const busy = activity !== "none"

  // Where eyes look when NOT following the cursor (always non-null).
  const pupilTarget = cooking || packing ? { x: 0, y: 2.8 } : { x: c.pupil?.x ?? 0, y: c.pupil?.y ?? 0 }
  const eyesFollow = c.pupil === null && !busy
  const headFollow = c.headTilt === null && !busy

  // Stable motion values for eyes + head (never swap between style/animate).
  const pxV = useMotionValue(0)
  const pyV = useMotionValue(0)
  const headSrc = useMotionValue(0)
  const px = useSpring(pxV, { stiffness: 140, damping: 15 })
  const py = useSpring(pyV, { stiffness: 140, damping: 15 })
  const headV = useSpring(headSrc, { stiffness: 90, damping: 13 })

  const eyesFollowRef = useRef(eyesFollow)
  const headFollowRef = useRef(headFollow)
  eyesFollowRef.current = eyesFollow
  headFollowRef.current = headFollow

  // Cursor tracking only mutates the raw values while following.
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
      if (eyesFollowRef.current) {
        pxV.set(clamp((dx / dist) * 2.8, -2.8, 2.8))
        pyV.set(clamp((dy / dist) * 2.2, -2, 2.2))
      }
      if (headFollowRef.current) {
        headSrc.set(clamp(dx / 45, -9, 9))
      }
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [pxV, pyV, headSrc])

  // When not following, drive eyes/head to their scripted targets.
  useEffect(() => {
    const controls: Array<{ stop: () => void }> = []
    if (!eyesFollow) {
      controls.push(animate(pxV, pupilTarget.x, { duration: 0.4 }))
      controls.push(animate(pyV, pupilTarget.y, { duration: 0.4 }))
    }
    if (!headFollow) {
      if (c.headTilt && (c.headTilt[0] !== 0 || c.headTilt[1] !== 0)) {
        controls.push(animate(headSrc, c.headTilt, loop(c.bobDur)))
      } else {
        controls.push(animate(headSrc, 0, { duration: 0.3 }))
      }
    }
    return () => controls.forEach(ctrl => ctrl.stop())
  }, [eyesFollow, headFollow, pupilTarget.x, pupilTarget.y, c.headTilt, c.bobDur, pxV, pyV, headSrc])

  // Arms.
  let leftArmA: number[] | number = c.leftArm
  let rightArmA: number[] | number = c.rightArm
  let armD = c.armDur
  if (walking) { leftArmA = [24, -24, 24]; rightArmA = [-24, 24, -24]; armD = 0.42 }
  else if (cooking) { rightArmA = [4, -26, 4]; armD = 0.45 }
  else if (waving && mood !== "celebrate") { rightArmA = [10, -60, 10]; armD = 0.4 }

  const bobRotate = packing ? [5, 8, 5] : napping ? [-11, -13, -11] : [0, 0, 0]
  const bobDur = walking ? 0.42 : c.bobDur
  const bobY = walking ? [0, -4, 0] : c.bobY
  const eyesOpen = c.eyesOpen && !napping

  return (
    <svg ref={ref} viewBox="0 0 100 150" width="100%" height="100%" aria-label="Jeff the adventurer" role="img">
      <defs>
        <linearGradient id="jeffShirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c8059" />
          <stop offset="1" stopColor="#15604a" />
        </linearGradient>
      </defs>

      {/* Ground shadow */}
      <motion.ellipse
        cx="50" cy="144" rx="26" ry="5" fill="rgba(6,41,31,0.22)"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        animate={{ scaleX: bobY.map(v => 1 + v / 70), opacity: bobY.map(v => 0.22 + v / 260) }}
        transition={loop(bobDur)}
      />

      {/* Whole-body bob + lean */}
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "center bottom" }}
        animate={{ y: bobY, rotate: bobRotate }}
        transition={loop(bobDur)}
      >
        {/* Backpack peeking behind shoulders */}
        <rect x="22" y="60" width="14" height="20" rx="6" fill="#9a5a2b" />
        <rect x="64" y="60" width="14" height="20" rx="6" fill="#9a5a2b" />

        {/* Legs + boots (swing while walking) */}
        <motion.g style={{ transformBox: "fill-box", transformOrigin: "top center" }}
          animate={walking ? { rotate: [22, -22, 22] } : { rotate: 0 }} transition={walking ? loop(0.42) : { duration: 0.3 }}>
          <rect x="40" y="104" width="8" height="20" rx="4" fill="#2f6db0" />
          <rect x="37" y="120" width="13" height="8" rx="4" fill="#5a3d22" />
        </motion.g>
        <motion.g style={{ transformBox: "fill-box", transformOrigin: "top center" }}
          animate={walking ? { rotate: [-22, 22, -22] } : { rotate: 0 }} transition={walking ? loop(0.42) : { duration: 0.3 }}>
          <rect x="52" y="104" width="8" height="20" rx="4" fill="#2f6db0" />
          <rect x="50" y="120" width="13" height="8" rx="4" fill="#5a3d22" />
        </motion.g>

        {/* Arms */}
        <motion.g style={{ transformBox: "fill-box", transformOrigin: "top center" }} animate={{ rotate: leftArmA }} transition={loop(armD)}>
          <rect x="22" y="66" width="9" height="26" rx="4.5" fill="#1c8059" />
          <circle cx="26.5" cy="92" r="5" fill="#fcd9a8" />
        </motion.g>
        <motion.g style={{ transformBox: "fill-box", transformOrigin: "top center" }} animate={{ rotate: rightArmA }} transition={loop(armD)}>
          <rect x="69" y="66" width="9" height="26" rx="4.5" fill="#1c8059" />
          <circle cx="73.5" cy="92" r="5" fill="#fcd9a8" />
        </motion.g>

        {/* Torso / shirt with breathing */}
        <motion.g style={{ transformBox: "fill-box", transformOrigin: "center top" }}
          animate={{ scaleY: [1, 1.04, 1], scaleX: [1, 0.99, 1] }} transition={loop(2.2)}>
          <rect x="31" y="62" width="38" height="46" rx="15" fill="url(#jeffShirt)" />
          <rect x="38" y="62" width="5" height="40" rx="2.5" fill="#7a4a22" />
          <rect x="57" y="62" width="5" height="40" rx="2.5" fill="#7a4a22" />
          <circle cx="40.5" cy="80" r="4.5" fill="#e0a52e" stroke="#b9831c" strokeWidth="1.2" />
          <text x="40.5" y="83" textAnchor="middle" fontSize="6" fontWeight="800" fill="#5a3d00" fontFamily="system-ui, sans-serif">$</text>
        </motion.g>

        {/* Head — rotate driven by a stable motion value */}
        <motion.g style={{ transformBox: "fill-box", transformOrigin: "center bottom", rotate: headV }}>
          <circle cx="29" cy="40" r="4" fill="#fcd9a8" />
          <circle cx="71" cy="40" r="4" fill="#fcd9a8" />
          <ellipse cx="50" cy="40" rx="22" ry="20.5" fill="#fcd9a8" />
          <path d="M30 30 Q34 34 40 31 Q44 35 50 31 Q56 35 60 31 Q66 34 70 30 L70 27 Q50 22 30 27 Z" fill="#6b4324" />

          {/* Explorer hat */}
          <ellipse cx="50" cy="24" rx="30" ry="7" fill="#a87a3e" />
          <ellipse cx="50" cy="23" rx="30" ry="6" fill="#b9894a" />
          <path d="M33 24 Q34 6 50 6 Q66 6 67 24 Z" fill="#b9894a" />
          <path d="M33 24 Q34 6 50 6 Q66 6 67 24 Z" fill="none" stroke="#9a6a32" strokeWidth="1" />
          <rect x="33" y="19" width="34" height="5" rx="2.5" fill="#5a3d22" />
          <circle cx="62" cy="21.5" r="3" fill="#e0a52e" stroke="#b9831c" strokeWidth="1" />

          {/* Eyes */}
          {eyesOpen ? (
            <>
              <ellipse cx="42" cy="40" rx="6.5" ry="7" fill="#fff" />
              <ellipse cx="58" cy="40" rx="6.5" ry="7" fill="#fff" />
              <motion.circle cx="42" cy="40.5" r="3.2" fill="#1e293b" style={{ x: px, y: py }} />
              <motion.circle cx="58" cy="40.5" r="3.2" fill="#1e293b" style={{ x: px, y: py }} />
              <circle cx="43.4" cy="38.8" r="1" fill="#fff" />
              <circle cx="59.4" cy="38.8" r="1" fill="#fff" />
              <motion.rect x="35.5" y="33" width="13" height="14" rx="6.5" fill="#fcd9a8"
                style={{ transformBox: "fill-box", transformOrigin: "top center" }}
                animate={{ scaleY: [0, 0, 1, 0, 0] }} transition={{ duration: 3, repeat: Infinity, times: [0, 0.9, 0.95, 0.99, 1] }} />
              <motion.rect x="51.5" y="33" width="13" height="14" rx="6.5" fill="#fcd9a8"
                style={{ transformBox: "fill-box", transformOrigin: "top center" }}
                animate={{ scaleY: [0, 0, 1, 0, 0] }} transition={{ duration: 3, repeat: Infinity, times: [0, 0.9, 0.95, 0.99, 1] }} />
            </>
          ) : (
            <>
              <path d="M36 41 Q42 45 48 41" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M52 41 Q58 45 64 41" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round" />
            </>
          )}

          <path d={BROWS[c.brows].l} stroke="#5a3d22" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d={BROWS[c.brows].r} stroke="#5a3d22" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d={MOUTH[c.mouth]} stroke="#9a4a2f" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </motion.g>
      </motion.g>

      {/* Celebrate stars */}
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

      {/* Sleep / nap Zzz */}
      <AnimatePresence>
        {(mood === "sleep" || napping) && (
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
