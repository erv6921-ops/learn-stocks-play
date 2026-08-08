import React, { useMemo } from "react"
import { motion } from "framer-motion"

/**
 * A one-shot burst of small gold coin particles that fly outward from the
 * origin point and fade. Rendered as absolutely-positioned divs so it never
 * affects layout (mount it inside a `relative` container). Give it a changing
 * `burstKey` to replay the burst.
 */
export default function CoinBurst({
  count = 8,
  burstKey,
}: {
  count?: number
  /** Change this to remount and replay the burst. */
  burstKey: React.Key
}) {
  // Randomised trajectories, recomputed only when the burst replays. Particles
  // fan out in a full circle with a slight upward bias so it reads as a lively
  // pop rather than a single blob.
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.6
        const dist = 34 + Math.random() * 26 // 34px..60px
        return {
          x: Math.round(Math.cos(angle) * dist),
          y: Math.round(Math.sin(angle) * dist) - 10, // bias upward
          delay: Math.random() * 0.06,
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [burstKey, count],
  )

  return (
    <div
      key={burstKey}
      aria-hidden
      className="pointer-events-none absolute right-4 top-1/2 z-20 overflow-visible"
    >
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-gold"
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.55, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  )
}
