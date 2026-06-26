import React, { useEffect, useState } from "react"
import { useSpring } from "framer-motion"

/**
 * Smoothly tweens to its target value whenever `value` changes, so counters
 * like the coin balance roll up/down instead of snapping. Renders the rounded,
 * locale-formatted integer.
 */
export default function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 90, damping: 20, mass: 0.6 })
  const [display, setDisplay] = useState(value)

  useEffect(() => { spring.set(value) }, [value, spring])
  useEffect(() => spring.on("change", v => setDisplay(Math.round(v))), [spring])

  return <>{display.toLocaleString()}</>
}
