import React from "react"
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
        whileHover={{ rotate: [0, -5, 5, -5, 0] }}
        whileTap={{ scale: 0.92 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-auto w-14 md:w-20 h-14 md:h-20 cursor-pointer select-none"
        style={{ filter: "drop-shadow(0 6px 14px rgba(6,41,31,0.25))" }}
      >
        <JeffMascot mood={mood} />
      </motion.button>
    </div>
  )
}

export default JeffWidget
