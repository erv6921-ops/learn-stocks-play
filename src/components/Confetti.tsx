import React, { useMemo } from "react"
import { motion } from "framer-motion"

/**
 * Lightweight, dependency-free confetti burst. Renders a fixed, non-interactive
 * overlay of colored pieces that fall and drift once on mount. Use it to
 * celebrate a moment (e.g. email confirmed); it plays a single pass.
 */
export default function Confetti({ pieces = 90 }: { pieces?: number }) {
  const bits = useMemo(() => {
    const colors = [
      "hsl(var(--brand))",
      "hsl(var(--accent))",
      "hsl(var(--primary))",
      "#EBB13E", // gold
      "#F97316", // orange
      "#E0457B", // pink
      "#6366F1", // indigo
    ]
    return Array.from({ length: pieces }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 6 + Math.random() * 8,
      color: colors[i % colors.length],
      delay: Math.random() * 0.6,
      duration: 2.6 + Math.random() * 1.8,
      drift: (Math.random() - 0.5) * 220,
      rotate: (Math.random() - 0.5) * 720,
      round: Math.random() > 0.5,
    }))
  }, [pieces])

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden>
      {bits.map(b => (
        <motion.span
          key={b.id}
          initial={{ y: "-12vh", x: 0, opacity: 1, rotate: 0 }}
          animate={{ y: "112vh", x: b.drift, opacity: [1, 1, 0.9, 0], rotate: b.rotate }}
          transition={{ duration: b.duration, delay: b.delay, ease: "easeIn" }}
          style={{
            position: "absolute",
            top: 0,
            left: `${b.left}%`,
            width: b.size,
            height: b.size * (b.round ? 1 : 1.6),
            background: b.color,
            borderRadius: b.round ? "9999px" : "2px",
          }}
        />
      ))}
    </div>
  )
}
