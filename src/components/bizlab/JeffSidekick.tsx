import React, { useEffect, useRef, useState } from "react"
import { motion, useAnimationControls, AnimatePresence } from "framer-motion"

const MASCOT_SRC = "/brand/mascot-character.png?v=2"

// Jeff's repertoire - he picks one at random every ~12-20s so he's always
// doing something. A mix of in-place fidgets, travel ("walk"), hops, and a
// full backflip keep him lively rather than static in a corner.
const ACTIONS = [
  // backflip - hop up and rotate a full 360°
  { y: [0, -12, -62, -62, 0], rotate: [0, 0, -180, -360, -360], scaleY: [1, 1.06, 1, 1, 1], transition: { duration: 1.15, times: [0, 0.15, 0.5, 0.82, 1], ease: "easeOut" as const } },
  // walk side to side with a waddle
  { x: [0, -32, 32, -18, 0], rotate: [0, -5, 5, -3, 0], transition: { duration: 2.4, ease: "easeInOut" as const } },
  // big double jump
  { y: [0, -48, 0, -28, 0], transition: { duration: 1.3, times: [0, 0.3, 0.55, 0.8, 1], ease: "easeOut" as const } },
  // jelly wobble
  { rotate: [0, -9, 7, -5, 3, 0], scaleX: [1, 1.07, 0.94, 1.03, 1], transition: { duration: 0.9, ease: "easeInOut" as const } },
  // spin-hop
  { y: [0, 6, -46, -46, 0], rotate: [0, 0, 180, 360, 360], scaleY: [1, 0.82, 1.12, 1, 1], transition: { duration: 1.0, times: [0, 0.12, 0.5, 0.8, 1], ease: "easeOut" as const } },
  // anticipation squash → springy boing
  { y: [0, 10, -42, 0], scaleY: [1, 0.76, 1.2, 1], scaleX: [1, 1.24, 0.84, 1], transition: { duration: 0.95, times: [0, 0.16, 0.55, 1], ease: "easeOut" as const } },
  // curious look around
  { rotate: [0, -14, 14, -8, 0], transition: { duration: 1.6, ease: "easeInOut" as const } },
]
// A bigger celebration: two backflips in a row.
const PARTY = { y: [0, -60, 0, -60, 0], rotate: [0, -360, -360, -720, -720], transition: { duration: 1.6, times: [0, 0.3, 0.5, 0.8, 1], ease: "easeOut" as const } }
const REST = { x: 0, y: 0, rotate: 0, scale: 1, scaleX: 1, scaleY: 1 }

const CHEERS = [
  "You've got this! 💪", "Looking good, founder! ✨", "Sharks love hustle! 🦈",
  "Big brain energy! 🧠", "This could be HUGE 🚀", "I believe in you! ⭐",
  "Future CEO vibes 😎", "One step closer to the Tank! 🏆", "Keep it going! 🔥",
  "Wheee! 🤸", "Watch this! 😄",
]

const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)]

/**
 * The single large Jeff for the Biz Lab. Shows the current stage's coaching
 * line and, every ~12-20s, picks a random move (walk, jump, wobble, backflip…)
 * with a quick cheer. Bumping `celebrateKey` triggers a big double-backflip
 * party - used when a student completes a part.
 *
 *  variant="side"    - big, stacked vertically (sticky desktop rail)
 *  variant="compact" - small, horizontal (mobile banner)
 */
export default function JeffSidekick({
  message,
  variant = "side",
  celebrateKey = 0,
}: {
  message?: string
  variant?: "side" | "compact"
  celebrateKey?: number
}) {
  const controls = useAnimationControls()
  const [bubble, setBubble] = useState(message)
  const busy = useRef(false)

  useEffect(() => {
    if (!busy.current) setBubble(message)
  }, [message])

  // Self-running move engine.
  useEffect(() => {
    let alive = true
    let timer: ReturnType<typeof setTimeout>
    const schedule = () => {
      const delay = 12000 + Math.random() * 8000 // 12-20s
      timer = setTimeout(async () => {
        if (!alive) return
        busy.current = true
        setBubble(pick(CHEERS))
        try {
          await controls.start(pick(ACTIONS))
          await controls.start(REST)
        } catch { /* unmounted mid-animation */ }
        if (!alive) return
        busy.current = false
        setBubble(message)
        schedule()
      }, delay)
    }
    schedule()
    return () => { alive = false; clearTimeout(timer) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message])

  // Big party flip when a part is completed.
  const firstCelebrate = useRef(true)
  useEffect(() => {
    if (firstCelebrate.current) { firstCelebrate.current = false; return }
    let alive = true
    ;(async () => {
      busy.current = true
      setBubble("WOOHOO! You did it! 🎉🦈")
      try {
        await controls.start(PARTY)
        await controls.start(REST)
      } catch { /* ignore */ }
      if (!alive) return
      busy.current = false
      setBubble(message)
    })()
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [celebrateKey])

  const isSide = variant === "side"
  const imgClass = isSide ? "w-32 lg:w-40" : "w-16"

  return (
    <div className={isSide ? "flex flex-col items-center text-center gap-3" : "flex items-center gap-3"}>
      {isSide && <Bubble text={bubble} side />}
      <div className="overflow-visible">
        <motion.div
          animate={{ y: [0, -7, 0], rotate: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="shrink-0"
        >
          <motion.img
            src={MASCOT_SRC}
            alt="Jeff, your Biz Lab coach"
            animate={controls}
            draggable={false}
            className={`${imgClass} select-none drop-shadow-[0_10px_18px_rgba(0,0,0,0.18)]`}
            style={{ transformOrigin: "center bottom" }}
          />
        </motion.div>
      </div>
      {!isSide && <Bubble text={bubble} />}
    </div>
  )
}

function Bubble({ text, side }: { text?: string; side?: boolean }) {
  if (!text) return null
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={text}
        initial={{ opacity: 0, scale: 0.9, y: side ? 6 : 0, x: side ? 0 : -6 }}
        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className={`relative rounded-2xl border border-border bg-card px-3.5 py-2.5 text-sm font-medium text-foreground shadow-card rounded-bl-md ${
          side ? "max-w-[15rem]" : "flex-1"
        }`}
      >
        {text}
      </motion.div>
    </AnimatePresence>
  )
}
