import React, { useEffect, useMemo, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useApp } from "@/contexts/AppContext"
import { xpLevelForCoins } from "@/lib/xpLevels"

const CONFETTI_COLORS = [
  "hsl(var(--success))",
  "hsl(var(--gold))",
  "#ffffff",
  "#2dd4bf", // teal
]

// Jeff's face - a gold circle with dot eyes and a smile - matching the app's
// mascot look, kept self-contained so the overlay has no external asset deps.
function JeffAvatar() {
  return (
    <motion.div
      className="w-20 h-20 rounded-full bg-gold flex items-center justify-center shadow-lg"
      animate={{ y: [-10, 0, -10] }}
      transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="52" height="52" viewBox="0 0 52 52">
        <circle cx="19" cy="21" r="3.2" fill="#1f2937" />
        <circle cx="33" cy="21" r="3.2" fill="#1f2937" />
        <path
          d="M17 31 Q26 40 35 31"
          stroke="#1f2937"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </motion.div>
  )
}

function Confetti() {
  // A single, finite shower - pieces fall once across the screen width. No
  // infinite loops, so the celebration stays smooth even on mobile.
  const pieces = useMemo(
    () =>
      Array.from({ length: 16 }, () => ({
        left: Math.random() * 100, // vw
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        duration: 2 + Math.random() * 1.5, // 2s..3.5s
        delay: Math.random() * 0.6,
        size: 6 + Math.random() * 5,
      })),
    [],
  )
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p, i) => (
        <motion.div
          key={i}
          className="absolute top-0 rounded-full"
          style={{ left: `${p.left}vw`, width: p.size, height: p.size, background: p.color }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: "110vh", opacity: [0, 1, 1, 0] }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
        />
      ))}
    </div>
  )
}

function Overlay({ level, onDismiss }: { level: number; onDismiss: () => void }) {
  // Auto-dismiss after 5s if the student doesn't tap.
  useEffect(() => {
    const t = setTimeout(onDismiss, 5000)
    return () => clearTimeout(t)
  }, [onDismiss])

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center px-6"
      style={{ zIndex: 9999, background: "rgba(0,0,0,0.85)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onDismiss}
    >
      <Confetti />
      <motion.div
        className="relative flex flex-col items-center text-center gap-4"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontSize: 48, fontWeight: 500, color: "#f59e0b" }}>LEVEL UP!</div>
        <div style={{ fontSize: 72, fontWeight: 700, color: "#ffffff", lineHeight: 1 }}>{level}</div>
        <JeffAvatar />
        <div style={{ color: "#ffffff", fontSize: 18 }}>You're now Level {level}!</div>
        <button
          onClick={onDismiss}
          className="mt-2 px-6 py-3 rounded-xl bg-gold text-gold-foreground font-semibold text-base active:scale-95 transition-transform"
        >
          Keep going →
        </button>
      </motion.div>
    </motion.div>
  )
}

/**
 * Watches the InvestiCoins balance and fires a full-screen LEVEL UP!
 * celebration whenever the coin-derived level increases. Renders nothing until
 * then. Mount once, high in the tree (it reads useApp()).
 */
export default function LevelUpWatcher() {
  const { jeffsBalance } = useApp()
  const level = xpLevelForCoins(jeffsBalance)

  // Seed with the current level on first run so we never fire on load / login.
  const lastLevelRef = useRef<number | null>(null)
  const [shownLevel, setShownLevel] = useState<number | null>(null)
  // Hold the celebration during an active quiz so it never covers the lesson
  // mid-combo; it fires once when the student leaves the quiz.
  const { pathname } = useLocation()
  const inQuiz = pathname.startsWith("/lessons/") || pathname.startsWith("/unit-test/")

  useEffect(() => {
    if (lastLevelRef.current === null) {
      lastLevelRef.current = level
      return
    }
    if (inQuiz) return // hold until the quiz is done
    if (level > lastLevelRef.current) {
      setShownLevel(level)
    }
    lastLevelRef.current = level
  }, [level, inQuiz])

  return (
    <AnimatePresence>
      {shownLevel !== null && (
        <Overlay level={shownLevel} onDismiss={() => setShownLevel(null)} />
      )}
    </AnimatePresence>
  )
}
