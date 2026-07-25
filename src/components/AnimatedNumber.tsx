import React, { useEffect, useState } from "react"
import { useSpring } from "framer-motion"

/**
 * Smoothly tweens to its target value whenever `value` changes, so counters
 * like the coin balance roll up/down instead of snapping. Renders the rounded,
 * locale-formatted integer.
 */
export default function AnimatedNumber({
  value,
  format,
  countUp = false,
}: {
  value: number
  /** Optional formatter for the tweened value (e.g. compact "12.3K" in tight spots). */
  format?: (n: number) => string
  /** Start from 0 on mount and roll up to the value (dashboard snapshots). */
  countUp?: boolean
}) {
  const spring = useSpring(countUp ? 0 : value, { stiffness: 90, damping: 20, mass: 0.6 })
  const [display, setDisplay] = useState(countUp ? 0 : value)

  useEffect(() => { spring.set(value) }, [value, spring])
  useEffect(() => spring.on("change", v => setDisplay(Math.round(v))), [spring])

  return <>{format ? format(display) : display.toLocaleString()}</>
}
