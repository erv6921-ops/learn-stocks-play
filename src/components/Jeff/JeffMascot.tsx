import React, { useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useAnimationControls } from "framer-motion"
import type { JeffMoodType, JeffActivity } from "@/contexts/JeffContext"

const MASCOT_SRC = "/brand/mascot-character.png?v=2"

const loop = (dur: number) => ({ duration: dur, repeat: Infinity, repeatType: "mirror" as const, ease: "easeInOut" as const })
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

// Per-mood "alive" motion applied to the mascot image. Because the mascot is a
// flat illustration we sell life through bob, breathing scale, lean and the odd
// wiggle rather than rigged limbs.
interface MoodMotion {
  y: number[]
  rotate: number[]
  scale: number[]
  dur: number
}

const MOODS: Record<JeffMoodType, MoodMotion> = {
  idle:      { y: [0, -4, 0],   rotate: [-1.5, 1.5, -1.5], scale: [1, 1.015, 1],  dur: 2.8 },
  celebrate: { y: [0, -16, 0],  rotate: [-6, 6, -6],       scale: [1, 1.08, 1],   dur: 0.5 },
  encourage: { y: [0, -7, 0],   rotate: [-3, 3, -3],       scale: [1, 1.03, 1],   dur: 1.3 },
  think:     { y: [0, -2, 0],   rotate: [-5, 5, -5],       scale: [1, 1.01, 1],   dur: 3.4 },
  sleep:     { y: [0, -2, 0],   rotate: [-2, -4, -2],      scale: [1, 1.01, 1],   dur: 4 },
}

// One-shot "personality" moves the mascot plays at random while idle, so he
// never feels static. Each is a self-contained framer-motion keyframe set run on
// its own wrapper, so it composes on top of the breathing/bob/lean underneath.
const FIDGETS = {
  // Jelly wobble - a quick gelatinous shimmy.
  wobble: { rotate: [0, -9, 7, -5, 3, 0], scaleX: [1, 1.06, 0.95, 1.03, 1], transition: { duration: 0.9, ease: "easeInOut" } },
  // Excited hop with a full spin.
  spin: { y: [0, 6, -34, -34, 0], rotate: [0, 0, 180, 360, 360], scaleY: [1, 0.82, 1.12, 1, 1], transition: { duration: 0.95, times: [0, 0.12, 0.5, 0.8, 1], ease: "easeOut" } },
  // Side-to-side dance shimmy.
  shimmy: { x: [0, -6, 6, -6, 6, 0], rotate: [0, -5, 5, -5, 5, 0], transition: { duration: 0.7, ease: "easeInOut" } },
  // Anticipation squash then a big springy boing upward.
  boing: { y: [0, 8, -36, 0], scaleY: [1, 0.78, 1.2, 1], scaleX: [1, 1.22, 0.84, 1], transition: { duration: 0.9, times: [0, 0.16, 0.55, 1], ease: "easeOut" } },
  // Curious look from side to side.
  lookAround: { rotate: [0, -13, 13, -8, 0], transition: { duration: 1.7, ease: "easeInOut" } },
  // A surprised double-take pop.
  doubleTake: { scale: [1, 1.16, 0.97, 1.1, 1], rotate: [0, -4, 4, -2, 0], transition: { duration: 0.75, ease: "easeOut" } },
} as const

const FIDGET_KEYS = Object.keys(FIDGETS) as (keyof typeof FIDGETS)[]
const REST_POSE = { x: 0, y: 0, rotate: 0, scale: 1, scaleX: 1, scaleY: 1 }

/**
 * The friendly explorer mascot. Renders the brand illustration (a transparent
 * character cut from mascot.png) and brings it to life with framer-motion:
 *   • idle breathing + a jelly squash-and-stretch bob
 *   • cursor tracking - he leans and shifts toward your pointer
 *   • a random "fidget" engine that plays playful one-off moves while idle
 *   • celebrate sparkles, a hover wave, and sleepy "z"s
 * Roaming/flip/party motion is layered on by the parent <JeffWidget>, so this
 * component stays purely cosmetic.
 */
export function JeffMascot({ mood = "idle", waving = false, activity = "none" }: { mood?: JeffMoodType; waving?: boolean; activity?: JeffActivity }) {
  const m = MOODS[mood]
  const napping = activity === "nap"
  const cooking = activity === "cook"
  const packing = activity === "pack"
  const busy = activity !== "none"

  // Hover wave / cooking stir adds an extra rocking lean on top of the mood.
  const rocking = (waving && mood !== "celebrate") || cooking
  const rotate = rocking ? [-7, 7, -7] : m.rotate
  const rotateDur = rocking ? 0.4 : m.dur
  // Packing has Jeff lean down toward his bag; napping tips him over to rest.
  const lean = packing ? 6 : napping ? -10 : 0

  // ── Cursor tracking: the whole body leans + drifts toward the pointer. ──
  const ref = useRef<HTMLDivElement | null>(null)
  const leanRotV = useMotionValue(0)
  const shiftXV = useMotionValue(0)
  const shiftYV = useMotionValue(0)
  const leanRot = useSpring(leanRotV, { stiffness: 120, damping: 14 })
  const shiftX = useSpring(shiftXV, { stiffness: 120, damping: 16 })
  const shiftY = useSpring(shiftYV, { stiffness: 120, damping: 16 })
  const trackRef = useRef(!busy && !napping)
  trackRef.current = !busy && !napping
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current
      if (!el) return
      if (!trackRef.current) { leanRotV.set(0); shiftXV.set(0); shiftYV.set(0); return }
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      // No rotational lean - sitting in the corner, the cursor is almost always
      // to his left, which made him perpetually tilt left. Keep him upright and
      // let only a subtle positional drift track the pointer.
      leanRotV.set(0)
      shiftXV.set(clamp(dx * 0.012, -5, 5))
      shiftYV.set(clamp(dy * 0.01, -3, 4))
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [leanRotV, shiftXV, shiftYV])
  useEffect(() => {
    if (busy || napping) { leanRotV.set(0); shiftXV.set(0); shiftYV.set(0) }
  }, [busy, napping, leanRotV, shiftXV, shiftYV])

  // ── Random fidget engine: while genuinely idle, play a playful move every few
  // seconds so he never sits still. Pauses for scripted activities / reactions. ──
  const fidget = useAnimationControls()
  const idleRef = useRef(mood === "idle" && !busy)
  idleRef.current = mood === "idle" && !busy
  useEffect(() => {
    let alive = true
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      const wait = 3500 + Math.random() * 5000 // 3.5-8.5s of calm between fidgets
      timer = setTimeout(async () => {
        if (!alive) return
        if (idleRef.current) {
          const key = FIDGET_KEYS[Math.floor(Math.random() * FIDGET_KEYS.length)]
          try { await fidget.start(FIDGETS[key]) } catch { /* unmounted */ }
          if (alive) fidget.set(REST_POSE)
        }
        if (alive) tick()
      }, wait)
    }
    tick()
    return () => { alive = false; clearTimeout(timer) }
  }, [fidget])
  // Snap out of any in-flight fidget the moment a mood/activity takes over.
  useEffect(() => {
    if (!(mood === "idle" && !busy)) fidget.set(REST_POSE)
  }, [mood, busy, fidget])

  return (
    <div ref={ref} className="relative w-full h-full" style={{ transformOrigin: "center bottom" }}>
      {/* Soft ground shadow that pulses with the bob to ground the character. */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 bottom-0 -translate-x-1/2 rounded-[50%]"
        style={{ width: "62%", height: "9%", background: "radial-gradient(ellipse at center, rgba(6,41,31,0.28), rgba(6,41,31,0) 70%)" }}
        animate={{ scaleX: [1, 0.86, 1], opacity: [0.5, 0.32, 0.5] }}
        transition={loop(m.dur)}
      />

      {/* Cursor-lean wrapper - tilts/drifts toward the pointer. */}
      <motion.div className="absolute inset-0" style={{ rotate: leanRot, x: shiftX, y: shiftY, transformOrigin: "center bottom" }}>
        {/* Breathing scale wrapper (separate axis from the bob so they compound). */}
        <motion.div
          className="absolute inset-0 flex items-end justify-center"
          animate={{ scale: m.scale }}
          transition={loop(m.dur * 1.05)}
          style={{ transformOrigin: "center bottom" }}
        >
          {/* Jelly bob + lean wrapper: y bob paired with squash/stretch. */}
          <motion.div
            className="relative w-[88%] h-[88%]"
            animate={{
              y: m.y,
              rotate,
              scaleY: [1, 1.04, 0.98, 1],
              scaleX: [1, 0.97, 1.02, 1],
            }}
            transition={{ y: loop(m.dur), rotate: loop(rotateDur), scaleY: loop(m.dur), scaleX: loop(m.dur) }}
            style={{ rotate: lean, transformOrigin: "center bottom" }}
          >
            {/* Fidget wrapper - random one-off personality moves play here. */}
            <motion.div className="w-full h-full" animate={fidget} style={{ transformOrigin: "center bottom" }}>
              <motion.img
                src={MASCOT_SRC}
                alt="Your investing guide"
                draggable={false}
                className="w-full h-full object-contain select-none pointer-events-none"
                style={{ filter: "drop-shadow(0 6px 10px rgba(6,41,31,0.22))", transformOrigin: "center bottom" }}
                // A tiny squash-and-stretch on celebrate makes the hop feel springy.
                animate={mood === "celebrate" ? { scaleY: [1, 0.94, 1.04, 1], scaleX: [1, 1.05, 0.97, 1] } : { scaleY: 1, scaleX: 1 }}
                transition={mood === "celebrate" ? loop(0.5) : { duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Celebrate sparkles */}
      <AnimatePresence>
        {mood === "celebrate" && (
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            {[
              { left: "8%", top: "18%", d: 0 },
              { left: "82%", top: "10%", d: 0.15 },
              { left: "20%", top: "2%", d: 0.3 },
              { left: "72%", top: "0%", d: 0.45 },
            ].map((s, i) => (
              <motion.span
                key={i}
                className="absolute text-amber-400"
                style={{ left: s.left, top: s.top, fontSize: "min(1.1rem, 22%)" }}
                initial={{ opacity: 0, scale: 0, y: 8 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.4], y: [8, -8, -16] }}
                transition={{ duration: 1, repeat: Infinity, delay: s.d, ease: "easeOut" }}
              >
                ✦
              </motion.span>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Sleepy z's */}
      <AnimatePresence>
        {(mood === "sleep" || napping) && (
          <div className="absolute right-1 top-0 pointer-events-none leading-none" aria-hidden>
            {[
              { size: "0.6rem", d: 0 },
              { size: "0.75rem", d: 0.6 },
              { size: "0.95rem", d: 1.2 },
            ].map((z, i) => (
              <motion.span
                key={i}
                className="absolute font-extrabold text-emerald-400/80"
                style={{ fontSize: z.size, right: `${i * 6}px` }}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: [0, 1, 0], y: [4, -10, -20] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: z.d, ease: "easeOut" }}
              >
                z
              </motion.span>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default JeffMascot
