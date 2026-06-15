import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { JeffMoodType } from "@/contexts/JeffContext"

// Mouth path variants (face coords, viewBox 0 0 100 120).
const MOUTH = {
  happy: "M40 80 Q50 88 60 80",
  bigSmile: "M37 78 Q50 93 63 78",
  neutral: "M42 82 Q50 84 58 82",
  flat: "M42 82 L58 82",
}

interface MoodCfg {
  bobY: number[]
  bobDur: number
  rightArm: number[] | number
  leftArm: number[] | number
  armDur: number
  mouth: keyof typeof MOUTH
  pupilX: number
  pupilY: number
  eyesOpen: boolean
  headTilt: number[]
  browRaiseR: boolean
}

const MOODS: Record<JeffMoodType, MoodCfg> = {
  idle:      { bobY: [0, -3, 0],  bobDur: 2.4, rightArm: 10,            leftArm: -10,            armDur: 2.4, mouth: "happy",    pupilX: 0,  pupilY: 0,  eyesOpen: true,  headTilt: [0, 0, 0],    browRaiseR: false },
  celebrate: { bobY: [0, -16, 0], bobDur: 0.5, rightArm: [10, -125, 10], leftArm: [-10, 125, -10], armDur: 0.5, mouth: "bigSmile", pupilX: 0,  pupilY: -1, eyesOpen: true,  headTilt: [0, 0, 0],    browRaiseR: false },
  encourage: { bobY: [0, -4, 0],  bobDur: 1.6, rightArm: [8, -45, 8],   leftArm: -8,             armDur: 0.7, mouth: "happy",    pupilX: 0,  pupilY: 0,  eyesOpen: true,  headTilt: [-2, 2, -2],  browRaiseR: false },
  think:     { bobY: [0, -2, 0],  bobDur: 3.2, rightArm: 14,            leftArm: -6,             armDur: 3.2, mouth: "flat",     pupilX: -2.4, pupilY: 0, eyesOpen: true, headTilt: [-7, 7, -7],  browRaiseR: true },
  sleep:     { bobY: [0, -1.5, 0],bobDur: 3.8, rightArm: 6,             leftArm: -6,             armDur: 3.8, mouth: "neutral",  pupilX: 0,  pupilY: 0,  eyesOpen: false, headTilt: [0, 0, 0],    browRaiseR: false },
}

const loop = (dur: number) => ({ duration: dur, repeat: Infinity, repeatType: "mirror" as const, ease: "easeInOut" as const })

/**
 * Animated SVG Jeff. Fills its container (size controlled by the parent).
 *
 * SWAP: replace the inline <svg> below with <img src={jeffImagePath}> (e.g.
 * import jeffImagePath from "@/assets/jeff-character.png") when final art is
 * ready — keep the wrapping motion.div so the bob/wiggle animations still apply.
 */
export function JeffMascot({ mood = "idle" }: { mood?: JeffMoodType }) {
  const c = MOODS[mood]

  return (
    <svg viewBox="0 0 100 125" width="100%" height="100%" aria-label="Jeff the mascot" role="img">
      {/* Drop shadow — shrinks as Jeff rises */}
      <motion.ellipse
        cx="50" cy="120" rx="26" ry="5" fill="rgba(6,41,31,0.22)"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        animate={{ scaleX: c.bobY.map(v => 1 + v / 60), opacity: c.bobY.map(v => 0.22 + v / 220) }}
        transition={loop(c.bobDur)}
      />

      {/* Whole body bob */}
      <motion.g animate={{ y: c.bobY }} transition={loop(c.bobDur)}>
        {/* Left arm */}
        <motion.rect
          x="20" y="62" width="9" height="30" rx="4.5" fill="#3bbf6b"
          style={{ transformBox: "fill-box", transformOrigin: "top center" }}
          animate={{ rotate: c.leftArm }}
          transition={loop(c.armDur)}
        />
        {/* Right arm (waves in encourage, raises in celebrate) */}
        <motion.rect
          x="71" y="62" width="9" height="30" rx="4.5" fill="#3bbf6b"
          style={{ transformBox: "fill-box", transformOrigin: "top center" }}
          animate={{ rotate: c.rightArm }}
          transition={loop(c.armDur)}
        />

        {/* Body */}
        <rect x="28" y="58" width="44" height="46" rx="16" fill="#4ADE80" />
        {/* Coin badge on chest */}
        <circle cx="50" cy="82" r="9" fill="#e0a52e" stroke="#b9831c" strokeWidth="1.5" />
        <text x="50" y="86" textAnchor="middle" fontSize="11" fontWeight="800" fill="#5a3d00" fontFamily="system-ui, sans-serif">$</text>

        {/* Head group (tilts in think) */}
        <motion.g
          style={{ transformBox: "fill-box", transformOrigin: "center bottom" }}
          animate={{ rotate: c.headTilt }}
          transition={loop(c.bobDur)}
        >
          {/* Head */}
          <ellipse cx="50" cy="38" rx="22" ry="20" fill="#fcd9a8" />

          {/* Hat: dark cap + brand yellow band + brim */}
          <path d="M28 30 Q50 6 72 30 Z" fill="#0f2d1e" />
          <rect x="28" y="28" width="44" height="6" rx="3" fill="#e0a52e" />
          <rect x="46" y="10" width="8" height="8" rx="2" fill="#0f2d1e" />

          {/* Eyes */}
          {c.eyesOpen ? (
            <>
              <ellipse cx="42" cy="40" rx="6" ry="6.5" fill="#fff" />
              <ellipse cx="58" cy="40" rx="6" ry="6.5" fill="#fff" />
              <motion.circle cx="42" cy="40" r="3" fill="#1e293b" animate={{ x: c.pupilX, y: c.pupilY }} transition={{ duration: 0.4 }} />
              <motion.circle cx="58" cy="40" r="3" fill="#1e293b" animate={{ x: c.pupilX, y: c.pupilY }} transition={{ duration: 0.4 }} />
              {/* Blink: skin-toned lids drop briefly */}
              <motion.rect x="36" y="33.5" width="12" height="13" rx="6" fill="#fcd9a8"
                style={{ transformBox: "fill-box", transformOrigin: "top center" }}
                animate={{ scaleY: [0, 0, 1, 0, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, times: [0, 0.86, 0.93, 0.99, 1] }} />
              <motion.rect x="52" y="33.5" width="12" height="13" rx="6" fill="#fcd9a8"
                style={{ transformBox: "fill-box", transformOrigin: "top center" }}
                animate={{ scaleY: [0, 0, 1, 0, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, times: [0, 0.86, 0.93, 0.99, 1] }} />
            </>
          ) : (
            <>
              {/* Closed eyes (sleep) */}
              <path d="M36 41 Q42 45 48 41" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M52 41 Q58 45 64 41" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round" />
            </>
          )}

          {/* Eyebrows */}
          <path d="M37 31 Q42 29 47 31" stroke="#9a6b2f" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path
            d={c.browRaiseR ? "M53 28 Q58 25 63 29" : "M53 31 Q58 29 63 31"}
            stroke="#9a6b2f" strokeWidth="2" fill="none" strokeLinecap="round"
          />

          {/* Mouth */}
          <path d={MOUTH[c.mouth]} stroke="#9a4a2f" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        </motion.g>
      </motion.g>

      {/* Celebrate star particles */}
      <AnimatePresence>
        {mood === "celebrate" && (
          <g>
            {[
              { x: 22, y: 30, d: 0 },
              { x: 78, y: 26, d: 0.15 },
              { x: 30, y: 14, d: 0.3 },
              { x: 70, y: 16, d: 0.45 },
            ].map((s, i) => (
              <motion.path
                key={i}
                d="M0 -5 L1.4 -1.5 L5 -1.5 L2 1 L3 5 L0 2.4 L-3 5 L-2 1 L-5 -1.5 L-1.4 -1.5 Z"
                fill="#e0a52e"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                initial={{ opacity: 0, scale: 0, x: s.x, y: s.y + 8 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.4], x: s.x, y: [s.y + 8, s.y - 6, s.y - 14] }}
                transition={{ duration: 1, repeat: Infinity, delay: s.d, ease: "easeOut" }}
              />
            ))}
          </g>
        )}
      </AnimatePresence>

      {/* Sleep Zzz */}
      <AnimatePresence>
        {mood === "sleep" && (
          <g>
            {[
              { x: 66, size: 9, d: 0 },
              { x: 72, size: 11, d: 0.6 },
              { x: 79, size: 13, d: 1.2 },
            ].map((z, i) => (
              <motion.text
                key={i}
                x={z.x} y={26} fontSize={z.size} fontWeight="800" fill="#7fae9a" fontFamily="system-ui, sans-serif"
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: [0, 1, 0], y: [26, 12, 2] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: z.d, ease: "easeOut" }}
              >z</motion.text>
            ))}
          </g>
        )}
      </AnimatePresence>
    </svg>
  )
}

export default JeffMascot
