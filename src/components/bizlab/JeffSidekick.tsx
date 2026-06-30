import React, { useEffect, useRef, useState } from "react"
import { motion, useAnimationControls, AnimatePresence } from "framer-motion"

const MASCOT_SRC = "/brand/mascot-character.png?v=2"

// One-shot "personality" moves Jeff plays on his own every 20–30s. Each composes
// on top of the gentle idle bob applied to the outer wrapper.
const ACTIONS = [
  { rotate: [0, -9, 7, -5, 3, 0], scaleX: [1, 1.06, 0.95, 1.03, 1], transition: { duration: 0.9, ease: "easeInOut" as const } }, // wobble
  { y: [0, 8, -40, 0], scaleY: [1, 0.78, 1.2, 1], scaleX: [1, 1.22, 0.84, 1], transition: { duration: 0.95, times: [0, 0.16, 0.55, 1], ease: "easeOut" as const } }, // boing
  { x: [0, -7, 7, -7, 7, 0], rotate: [0, -6, 6, -6, 6, 0], transition: { duration: 0.75, ease: "easeInOut" as const } }, // shimmy
  { y: [0, 6, -44, -44, 0], rotate: [0, 0, 180, 360, 360], scaleY: [1, 0.82, 1.12, 1, 1], transition: { duration: 1.0, times: [0, 0.12, 0.5, 0.8, 1], ease: "easeOut" as const } }, // spin-hop
  { rotate: [0, -13, 13, -8, 0], transition: { duration: 1.6, ease: "easeInOut" as const } }, // look around
  { scale: [1, 1.16, 0.97, 1.1, 1], rotate: [0, -4, 4, -2, 0], transition: { duration: 0.75, ease: "easeOut" as const } }, // double-take
]
const REST = { x: 0, y: 0, rotate: 0, scale: 1, scaleX: 1, scaleY: 1 }

const CHEERS = [
  "You've got this! 💪", "Looking good, founder! ✨", "Sharks love hustle! 🦈",
  "Big brain energy! 🧠", "This could be HUGE 🚀", "I believe in you! ⭐",
  "Future CEO vibes 😎", "One step closer to the Tank! 🏆", "Keep it going! 🔥",
]

const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)]

/**
 * A larger, animated Jeff that lives on the side of the Biz Lab. He shows the
 * current stage's coaching line, and every 20–30 seconds plays a random
 * "fidget" (wobble, boing, spin-hop…) with a quick cheer so he always feels
 * alive instead of static in a corner.
 *
 *  variant="side"    — big, stacked vertically (sticky desktop rail)
 *  variant="compact" — small, horizontal (mobile banner)
 */
export default function JeffSidekick({
  message,
  variant = "side",
}: {
  message?: string
  variant?: "side" | "compact"
}) {
  const controls = useAnimationControls()
  const [bubble, setBubble] = useState(message)
  const showingCheer = useRef(false)

  // Keep the bubble in sync with the stage line (unless mid-cheer).
  useEffect(() => {
    if (!showingCheer.current) setBubble(message)
  }, [message])

  // Self-running fidget engine.
  useEffect(() => {
    let alive = true
    let timer: ReturnType<typeof setTimeout>
    const schedule = () => {
      const delay = 20000 + Math.random() * 10000 // 20–30s
      timer = setTimeout(async () => {
        if (!alive) return
        showingCheer.current = true
        setBubble(pick(CHEERS))
        try {
          await controls.start(pick(ACTIONS))
          await controls.start(REST)
        } catch { /* unmounted mid-animation */ }
        if (!alive) return
        showingCheer.current = false
        setBubble(message)
        schedule()
      }, delay)
    }
    schedule()
    return () => { alive = false; clearTimeout(timer) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message])

  const isSide = variant === "side"
  const imgClass = isSide ? "w-36 lg:w-44" : "w-16"

  return (
    <div className={isSide ? "flex flex-col items-center text-center gap-3" : "flex items-center gap-3"}>
      {isSide && <Bubble text={bubble} side />}
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
        className={`relative rounded-2xl border border-border bg-card px-3.5 py-2.5 text-sm font-medium text-foreground shadow-card ${
          side ? "rounded-bl-md max-w-[15rem]" : "rounded-bl-md flex-1"
        }`}
      >
        {text}
      </motion.div>
    </AnimatePresence>
  )
}
