import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { useApp } from "@/contexts/AppContext"
import { useJeff, JeffActivity } from "@/contexts/JeffContext"
import { JeffMascot } from "./JeffMascot"
import { SpeechBubble } from "./SpeechBubble"

const HIDDEN_ROUTES = ["/auth", "/login", "/signup", "/onboarding", "/reset-password", "/forgot-password"]

// How the whole widget moves for roaming activities.
function containerAnim(activity: JeffActivity, w: number, h: number) {
  const distX = Math.min(w * 0.62, 360)
  const distY = Math.min(h * 0.55, 320)
  switch (activity) {
    case "walkAcross":
      return { animate: { x: [0, -distX, -distX, 0], y: 0 }, transition: { duration: 8, times: [0, 0.45, 0.55, 1], ease: "easeInOut" as const } }
    case "walkSide":
      return { animate: { x: 0, y: [0, -distY, -distY, 0] }, transition: { duration: 8, times: [0, 0.45, 0.55, 1], ease: "easeInOut" as const } }
    case "jump":
      return { animate: { x: 0, y: [0, -46, 0, -28, 0] }, transition: { duration: 1.3, times: [0, 0.3, 0.55, 0.8, 1], ease: "easeOut" as const } }
    default:
      return { animate: { x: 0, y: 0 }, transition: { type: "spring" as const, stiffness: 120, damping: 18 } }
  }
}

// Little props/scene that accompany an activity, drawn around Jeff.
function JeffScene({ activity }: { activity: JeffActivity }) {
  if (activity === "nap") {
    return (
      <div
        className="absolute left-0 right-0 -bottom-0.5 h-5 md:h-7 rounded-full"
        style={{ background: "#f3ead2", boxShadow: "inset 0 -3px 0 rgba(0,0,0,0.08)", transform: "rotate(-4deg)" }}
        aria-hidden
      />
    )
  }
  if (activity === "cook") {
    return (
      <div className="absolute right-full bottom-0 mr-0.5 flex flex-col items-center pointer-events-none" aria-hidden>
        <div className="relative leading-none">
          {[0, 0.5, 1].map((d, i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 -translate-x-1/2 -top-3 text-[8px] md:text-[10px] text-slate-400"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 0.8, 0], y: [-2, -12, -18] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: d, ease: "easeOut" }}
              style={{ left: `${40 + i * 12}%` }}
            >
              ∿
            </motion.span>
          ))}
          <span className="text-base md:text-2xl">🍳</span>
        </div>
      </div>
    )
  }
  if (activity === "pack") {
    return (
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 flex items-end pointer-events-none" aria-hidden>
        <div className="relative">
          {["🍎", "🧭", "🗺️"].map((it, i) => (
            <motion.span
              key={it}
              className="absolute left-1/2 -translate-x-1/2 text-[10px] md:text-sm"
              initial={{ opacity: 0, y: -22 }}
              animate={{ opacity: [0, 1, 1, 0], y: [-22, -4, -4, -2] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.6, ease: "easeIn" }}
            >
              {it}
            </motion.span>
          ))}
          <span className="text-base md:text-2xl">🎒</span>
        </div>
      </div>
    )
  }
  return null
}

export function JeffWidget() {
  const location = useLocation()
  const { user } = useApp()
  const { mood, message, visible, activity, nudge, dismiss } = useJeff()
  const [hovered, setHovered] = useState(false)
  const [dims, setDims] = useState({ w: typeof window !== "undefined" ? window.innerWidth : 1200, h: typeof window !== "undefined" ? window.innerHeight : 800 })

  useEffect(() => {
    const on = () => setDims({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener("resize", on)
    return () => window.removeEventListener("resize", on)
  }, [])

  if (!user) return null
  if (HIDDEN_ROUTES.some(r => location.pathname.startsWith(r))) return null

  const cont = containerAnim(activity, dims.w, dims.h)
  const facing = activity === "walkAcross"
    ? { animate: { scaleX: [-1, -1, 1, 1] }, transition: { duration: 8, times: [0, 0.48, 0.52, 1] } }
    : { animate: { scaleX: 1 }, transition: { duration: 0.3 } }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none"
      animate={cont.animate}
      transition={cont.transition}
    >
      {/* Speech bubble above */}
      <div className="pointer-events-auto">
        <AnimatePresence>
          {visible && message && <SpeechBubble key={message} message={message} onClose={dismiss} />}
        </AnimatePresence>
      </div>

      {/* Scene + Jeff */}
      <div className="relative w-16 md:w-24 h-16 md:h-24">
        <JeffScene activity={activity} />
        <motion.button
          type="button"
          aria-label="Jeff says hi"
          onClick={nudge}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="absolute inset-0 pointer-events-auto cursor-pointer select-none"
          style={{ filter: "drop-shadow(0 6px 14px rgba(6,41,31,0.25))" }}
        >
          <motion.div className="w-full h-full" animate={facing.animate} transition={facing.transition}>
            <JeffMascot mood={mood} waving={hovered} activity={activity} />
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default JeffWidget
