import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { useApp } from "@/contexts/AppContext"
import { useJeff } from "@/contexts/JeffContext"
import { JeffMascot } from "./JeffMascot"
import { SpeechBubble } from "./SpeechBubble"

// Routes where Jeff should never appear (pre-auth / account flows).
const HIDDEN_ROUTES = ["/auth", "/login", "/signup", "/onboarding", "/reset-password", "/forgot-password"]

export function JeffWidget() {
  const location = useLocation()
  const { user } = useApp()
  const { mood, message, visible, nudge, dismiss } = useJeff()
  const [hovered, setHovered] = useState(false)

  // Only on authenticated app pages.
  if (!user) return null
  if (HIDDEN_ROUTES.some(r => location.pathname.startsWith(r))) return null

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none">
      {/* SpeechBubble above */}
      <div className="pointer-events-auto">
        <AnimatePresence>
          {visible && message && <SpeechBubble key={message} message={message} onClose={dismiss} />}
        </AnimatePresence>
      </div>

      {/* JeffMascot below — quick wiggle on hover, cycles encouragement on click */}
      <motion.button
        type="button"
        aria-label="Jeff says hi"
        onClick={nudge}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.92, rotate: -3 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="pointer-events-auto w-16 md:w-24 h-16 md:h-24 cursor-pointer select-none"
        style={{ filter: "drop-shadow(0 6px 14px rgba(6,41,31,0.25))" }}
      >
        <JeffMascot mood={mood} waving={hovered} />
      </motion.button>
    </div>
  )
}

export default JeffWidget
