import { useCallback, useEffect, useId, useRef, useState } from "react"
import { motion, useAnimationControls, useReducedMotion } from "framer-motion"

/**
 * JeffCharacter — the friendly explorer mascot, rebuilt from a flat PNG into a
 * fully rigged inline SVG so every part (body, head, eyes, lids, brows, mouth,
 * arms, hat) can be animated independently.
 *
 * The look is a faithful level-up of the existing brand mascot: a rounded green
 * body with a light-mint belly, big white eyes, rosy cheeks, a simple smile and
 * a tan explorer's pith helmet with an olive band and a little top knob.
 *
 * Animation is driven by Framer Motion with spring physics and classic
 * principles — anticipation, squash & stretch, overshoot/settle, and
 * follow-through (the head and arms lag a touch behind the body). Expression
 * lives mostly in the eyes, brows and mouth.
 *
 * NOTE: this is a standalone component with a dev preview at /dev/jeff. It is
 * intentionally NOT wired into the running app.
 */

export type JeffMood = "idle" | "correct" | "wrong" | "levelUp" | "welcome"

interface JeffCharacterProps {
  mood?: JeffMood
  size?: number
  onAnimationComplete?: () => void
}

// ── Brand palette, sampled from mascot-character.png ────────────────────────
const C = {
  bodyLight: "#6FC191",
  bodyMid: "#4FA67F",
  bodyDark: "#3E8B63",
  bodyEdge: "#347a56",
  belly: "#EAF6EF",
  bellyShade: "#D3EBDD",
  hatTan: "#DEC58F",
  hatTanDark: "#C9A96E",
  hatBand: "#8FA766",
  eyeWhite: "#FFFFFF",
  pupil: "#26332C",
  glint: "#FFFFFF",
  cheek: "#F2A9A2",
  ink: "#2E6B49",
  mouth: "#2B5A3B",
} as const

// Face presets: expression is carried almost entirely by eyes / brows / mouth.
type EyeShape = "open" | "wide" | "happy"
type MouthShape = "neutral" | "bigSmile" | "openO" | "sympathetic"
interface FacePose {
  eyes: EyeShape
  mouth: MouthShape
  browY: number
  browTent: number // inner ends lift → sympathetic tenting
}
const FACE: Record<string, FacePose> = {
  neutral: { eyes: "open", mouth: "neutral", browY: 0, browTent: 0 },
  happy: { eyes: "happy", mouth: "bigSmile", browY: -3, browTent: 0 },
  surprised: { eyes: "wide", mouth: "openO", browY: -6, browTent: 0 },
  sympathetic: { eyes: "open", mouth: "sympathetic", browY: -1, browTent: 11 },
}
type Expression = keyof typeof FACE
type Gesture = "rest" | "pump" | "thumbsUp" | "armsUp" | "wave"

const spring = { type: "spring" as const, stiffness: 240, damping: 14 }
const softSpring = { type: "spring" as const, stiffness: 180, damping: 16 }
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

// Mouth path geometry, centred around (100, 126).
const MOUTH_PATHS: Record<MouthShape, JSX.Element> = {
  neutral: (
    <path d="M86,124 Q100,137 114,124" fill="none" stroke={C.mouth} strokeWidth={4.5} strokeLinecap="round" />
  ),
  bigSmile: (
    <>
      <path d="M83,121 Q100,119 117,121 Q110,146 100,146 Q90,146 83,121 Z" fill={C.mouth} />
      {/* tongue */}
      <path d="M91,138 Q100,133 109,138 Q106,147 100,147 Q94,147 91,138 Z" fill="#E8807C" />
    </>
  ),
  openO: <ellipse cx={100} cy={130} rx={9} ry={11.5} fill={C.mouth} />,
  sympathetic: (
    <path d="M89,130 Q100,125 111,130" fill="none" stroke={C.mouth} strokeWidth={4.5} strokeLinecap="round" />
  ),
}

export function JeffCharacter({ mood = "idle", size = 220, onAnimationComplete }: JeffCharacterProps) {
  const reduced = useReducedMotion()
  const uid = useId().replace(/:/g, "") // safe, unique gradient ids per instance

  // Independent rigs — body carries the big motion; head + arms follow with lag.
  const body = useAnimationControls()
  const head = useAnimationControls()
  const armL = useAnimationControls()
  const armR = useAnimationControls()
  const lids = useAnimationControls()

  const [expression, setExpression] = useState<Expression>("neutral")
  const [gesture, setGesture] = useState<Gesture>("rest")
  const [glance, setGlance] = useState(0)
  const [sparkles, setSparkles] = useState(false)

  // Ref mirror so the blink/glance loops can read the live expression without
  // re-subscribing every render.
  const expressionRef = useRef(expression)
  expressionRef.current = expression

  const face = FACE[expression]

  // ── Idle blink loop: quick lid close every 2–5s while the face is neutral. ──
  useEffect(() => {
    if (reduced) return
    let alive = true
    let t: ReturnType<typeof setTimeout>
    const loop = () => {
      t = setTimeout(async () => {
        if (!alive) return
        if (expressionRef.current === "neutral" || expressionRef.current === "surprised") {
          try {
            await lids.start({ scaleY: [0, 1, 0], transition: { duration: 0.16, times: [0, 0.5, 1], ease: "easeInOut" } })
          } catch {
            /* unmounted */
          }
        }
        if (alive) loop()
      }, 2000 + Math.random() * 3000)
    }
    loop()
    return () => {
      alive = false
      clearTimeout(t)
    }
  }, [reduced, lids])

  // ── Idle glance loop: pupils drift left/right occasionally, then re-centre. ──
  useEffect(() => {
    if (reduced) return
    let alive = true
    let t: ReturnType<typeof setTimeout>
    const loop = () => {
      t = setTimeout(() => {
        if (!alive) return
        if (expressionRef.current === "neutral") {
          setGlance((Math.random() < 0.5 ? -1 : 1) * 3.2)
          setTimeout(() => alive && setGlance(0), 800 + Math.random() * 500)
        }
        if (alive) loop()
      }, 2600 + Math.random() * 3800)
    }
    loop()
    return () => {
      alive = false
      clearTimeout(t)
    }
  }, [reduced])

  // Snap every rig back to its neutral resting pose (springy overshoot).
  const settle = useCallback(() => {
    setGesture("rest")
    setExpression("neutral")
    setGlance(0)
    body.start({ y: 0, rotate: 0, scaleX: 1, scaleY: 1, transition: softSpring })
    head.start({ y: 0, rotate: 0, transition: softSpring })
    armL.start({ rotate: 0, transition: softSpring })
    armR.start({ rotate: 0, transition: softSpring })
  }, [body, head, armL, armR])

  // ── Reaction timelines. Each awaits its body track then resolves. ──────────
  const runReaction = useCallback(
    async (m: JeffMood) => {
      setGlance(0)

      // Reduced motion: no bouncing — just cross-fade the expression + hold.
      if (reduced) {
        if (m === "wrong") setExpression("sympathetic")
        else setExpression("happy")
        if (m === "levelUp") setSparkles(true)
        const hold = m === "levelUp" ? 2000 : m === "wrong" ? 1200 : m === "correct" ? 1000 : 1200
        await wait(hold)
        setSparkles(false)
        return
      }

      if (m === "correct") {
        // Anticipation dip → springy hop with squash/stretch → land → settle.
        setExpression("happy")
        setGesture("pump")
        armL.start({ rotate: [0, -88, -104, -90], transition: { duration: 1, times: [0, 0.35, 0.6, 1], ease: "easeOut" } })
        armR.start({ rotate: [0, 88, 104, 90], transition: { duration: 1, times: [0, 0.35, 0.6, 1], ease: "easeOut" } })
        head.start({ y: [0, 4, -9, 0], rotate: [0, 0, -3, 0], transition: { duration: 1, times: [0, 0.16, 0.5, 1], ease: "easeOut" } })
        await body.start({
          y: [0, 12, -46, 6, 0],
          scaleY: [1, 0.84, 1.14, 0.9, 1],
          scaleX: [1, 1.16, 0.9, 1.08, 1],
          transition: { duration: 1, times: [0, 0.15, 0.5, 0.78, 1], ease: "easeOut" },
        })
        return
      }

      if (m === "wrong") {
        // A small sympathetic wince first — supportive, never sad.
        setExpression("sympathetic")
        head.start({ rotate: [0, -7, -5], y: [0, 3, 2], transition: { duration: 0.42, ease: "easeOut" } })
        await body.start({
          y: [0, 5, 3],
          scaleY: [1, 0.94, 0.96],
          scaleX: [1, 1.06, 1.04],
          transition: { duration: 0.42, ease: "easeOut" },
        })
        // …then an encouraging nod + warm smile + thumbs up.
        setExpression("happy")
        setGesture("thumbsUp")
        armR.start({ rotate: [0, 66, 60], transition: { duration: 0.4, ease: "easeOut" } })
        head.start({ rotate: [-5, 5, -2, 3, 0], y: [2, -2, 0, -1, 0], transition: { duration: 0.78, ease: "easeInOut" } })
        await body.start({
          y: [3, -3, 0],
          scaleY: [0.96, 1.02, 1],
          scaleX: [1.04, 0.98, 1],
          transition: { duration: 0.78, ease: "easeInOut" },
        })
        return
      }

      if (m === "levelUp") {
        // Big anticipation crouch → soaring jump + mid-air spin → land → dance.
        setExpression("surprised")
        setGesture("armsUp")
        setSparkles(true)
        armL.start({ rotate: -112, transition: spring })
        armR.start({ rotate: 112, transition: spring })
        setTimeout(() => setExpression("happy"), 520)
        head.start({ y: [0, 8, -16, -12, 0], rotate: [0, 0, -10, 10, 0], transition: { duration: 1.4, times: [0, 0.12, 0.42, 0.72, 1], ease: "easeOut" } })
        await body.start({
          y: [0, 16, -62, -62, 8, 0],
          rotate: [0, 0, 0, 360, 360, 360],
          scaleY: [1, 0.8, 1.16, 1.04, 0.9, 1],
          scaleX: [1, 1.2, 0.86, 0.96, 1.08, 1],
          transition: { duration: 1.4, times: [0, 0.12, 0.42, 0.7, 0.86, 1], ease: "easeOut" },
        })
        // Little celebratory shimmy dance to fill out the ~2s.
        await body.start({
          rotate: [0, -7, 7, -5, 5, 0],
          x: [0, -4, 4, -3, 3, 0],
          transition: { duration: 0.58, ease: "easeInOut" },
        })
        setSparkles(false)
        return
      }

      // welcome — excited bounce + big wave.
      setExpression("happy")
      setGesture("wave")
      armR.start({ rotate: [0, 72, 56, 72, 56, 70], transition: { duration: 1.2, ease: "easeInOut" } })
      head.start({ rotate: [0, -4, 4, -3, 0], transition: { duration: 1.2, ease: "easeInOut" } })
      await body.start({
        y: [0, -18, 0, -12, 0],
        scaleY: [1, 1.08, 0.95, 1.05, 1],
        scaleX: [1, 0.95, 1.05, 0.97, 1],
        transition: { duration: 1.2, times: [0, 0.25, 0.5, 0.75, 1], ease: "easeOut" },
      })
    },
    [reduced, body, head, armL, armR],
  )

  // Play the reaction whenever `mood` becomes a non-idle value, then auto-return
  // to idle and fire the callback. Idle just rests.
  useEffect(() => {
    if (mood === "idle") {
      settle()
      return
    }
    let cancelled = false
    runReaction(mood).then(() => {
      if (cancelled) return
      settle()
      onAnimationComplete?.()
    })
    return () => {
      cancelled = true
    }
    // onAnimationComplete intentionally omitted — a new inline fn each render
    // would restart the reaction; parents get the callback on completion.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mood, runReaction, settle])

  // Arm resting/gesture poses (springs give the follow-through settle).
  const armLPose = gesture === "pump" ? { rotate: -92 } : gesture === "armsUp" ? { rotate: -112 } : { rotate: 0 }
  const armRPose =
    gesture === "pump"
      ? { rotate: 92 }
      : gesture === "armsUp"
        ? { rotate: 112 }
        : gesture === "thumbsUp"
          ? { rotate: 60 }
          : gesture === "wave"
            ? { rotate: 66 }
            : { rotate: 0 }

  // Idle "breathing" + bob loops (disabled under reduced motion).
  const breathe = reduced ? {} : { scale: [1, 1.02, 1] }
  const bob = reduced ? {} : { y: [0, -5, 0], rotate: [-1, 1, -1] }
  const loopT = (d: number) => ({ duration: d, repeat: Infinity, repeatType: "mirror" as const, ease: "easeInOut" as const })

  return (
    <div
      style={{ width: size, height: size * 1.06, overflow: "visible" }}
      className="relative select-none"
      aria-label="Jeff, your investing guide"
      role="img"
    >
      {/* Ground shadow — pulses with the breathing to anchor him. */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 bottom-[3%] -translate-x-1/2 rounded-[50%]"
        style={{ width: "56%", height: "7%", background: "radial-gradient(ellipse at center, rgba(6,41,31,0.28), rgba(6,41,31,0) 70%)" }}
        animate={reduced ? {} : { scaleX: [1, 0.88, 1], opacity: [0.5, 0.34, 0.5] }}
        transition={loopT(2.8)}
      />

      {/* Breathing wrapper (idle base). */}
      <motion.div className="absolute inset-0" style={{ transformOrigin: "50% 100%" }} animate={breathe} transition={loopT(3)}>
        {/* Bob wrapper (idle base). */}
        <motion.div className="absolute inset-0" style={{ transformOrigin: "50% 100%" }} animate={bob} transition={loopT(2.8)}>
          {/* Reaction wrapper — the big scripted body motion lives here. */}
          <motion.div className="absolute inset-0" style={{ transformOrigin: "50% 100%" }} animate={body}>
            <svg viewBox="0 0 200 212" width="100%" height="100%" overflow="visible" style={{ display: "block" }}>
              <defs>
                <radialGradient id={`body-${uid}`} cx="38%" cy="30%" r="80%">
                  <stop offset="0%" stopColor={C.bodyLight} />
                  <stop offset="60%" stopColor={C.bodyMid} />
                  <stop offset="100%" stopColor={C.bodyDark} />
                </radialGradient>
                <radialGradient id={`belly-${uid}`} cx="50%" cy="35%" r="75%">
                  <stop offset="0%" stopColor={C.belly} />
                  <stop offset="100%" stopColor={C.bellyShade} />
                </radialGradient>
                <linearGradient id={`hat-${uid}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.hatTan} />
                  <stop offset="100%" stopColor={C.hatTanDark} />
                </linearGradient>
              </defs>

              {/* ── Feet (behind body) ── */}
              <g>
                <ellipse cx={80} cy={196} rx={16} ry={10} fill={C.bodyDark} />
                <ellipse cx={120} cy={196} rx={16} ry={10} fill={C.bodyDark} />
              </g>

              {/* ── Arms (drawn behind so nubs peek at the body edge) ── */}
              <motion.g
                animate={armL}
                initial={armLPose}
                style={{ transformOrigin: "50px 126px" }}
                transition={spring}
              >
                <ellipse cx={30} cy={150} rx={15} ry={22} fill={C.bodyMid} stroke={C.bodyEdge} strokeWidth={1.5} />
              </motion.g>
              <motion.g
                animate={armR}
                initial={armRPose}
                style={{ transformOrigin: "150px 126px" }}
                transition={spring}
              >
                <ellipse cx={170} cy={150} rx={15} ry={22} fill={C.bodyMid} stroke={C.bodyEdge} strokeWidth={1.5} />
                {/* Thumb that appears for the encouraging thumbs-up. */}
                {gesture === "thumbsUp" && <rect x={166} y={120} width={8} height={16} rx={4} fill={C.bodyMid} stroke={C.bodyEdge} strokeWidth={1.5} />}
              </motion.g>

              {/* ── Body blob ── */}
              <ellipse cx={100} cy={126} rx={72} ry={70} fill={`url(#body-${uid})`} stroke={C.bodyEdge} strokeWidth={2} />
              {/* Light-mint belly patch. */}
              <ellipse cx={100} cy={150} rx={40} ry={42} fill={`url(#belly-${uid})`} />

              {/* ── Head group: hat + face. Small, lagging motion reads as head. ── */}
              <motion.g animate={head} style={{ transformOrigin: "100px 150px" }} transition={softSpring}>
                {/* Cheeks (drawn under the eyes). */}
                <ellipse cx={64} cy={116} rx={10} ry={6.5} fill={C.cheek} opacity={expression === "happy" ? 0.7 : 0.5} />
                <ellipse cx={136} cy={116} rx={10} ry={6.5} fill={C.cheek} opacity={expression === "happy" ? 0.7 : 0.5} />

                {/* Eyebrows — inner tenting drives the sympathetic look. */}
                <g transform={`translate(0 ${face.browY})`}>
                  <path
                    d="M74,80 Q84,74 94,79"
                    fill="none"
                    stroke={C.ink}
                    strokeWidth={4}
                    strokeLinecap="round"
                    transform={`rotate(${face.browTent} 84 78)`}
                  />
                  <path
                    d="M106,79 Q116,74 126,80"
                    fill="none"
                    stroke={C.ink}
                    strokeWidth={4}
                    strokeLinecap="round"
                    transform={`rotate(${-face.browTent} 116 78)`}
                  />
                </g>

                {/* Eyes */}
                {face.eyes === "happy" ? (
                  // Happy squint — upward arcs.
                  <>
                    <path d="M70,104 Q84,90 98,104" fill="none" stroke={C.pupil} strokeWidth={5.5} strokeLinecap="round" />
                    <path d="M102,104 Q116,90 130,104" fill="none" stroke={C.pupil} strokeWidth={5.5} strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    {[
                      { cx: 84, sx: face.eyes === "wide" ? 1.08 : 1 },
                      { cx: 116, sx: face.eyes === "wide" ? 1.08 : 1 },
                    ].map((e) => (
                      <g key={e.cx} style={{ transformOrigin: `${e.cx}px 102px`, transform: `scale(${e.sx})` }}>
                        <ellipse cx={e.cx} cy={102} rx={17} ry={19} fill={C.eyeWhite} stroke={C.bodyEdge} strokeWidth={1.2} />
                        {/* Pupils shift together for glances. */}
                        <motion.g animate={{ x: glance }} transition={softSpring}>
                          <circle cx={e.cx} cy={106} r={8.5} fill={C.pupil} />
                          <circle cx={e.cx - 3.5} cy={101} r={3} fill={C.glint} />
                        </motion.g>
                        {/* Blink lid — a body-coloured cap that scales down over the eye. */}
                        <motion.ellipse
                          cx={e.cx}
                          cy={102}
                          rx={18.5}
                          ry={20}
                          fill={C.bodyMid}
                          animate={lids}
                          initial={{ scaleY: 0 }}
                          style={{ transformOrigin: `${e.cx}px 83px` }}
                        />
                      </g>
                    ))}
                  </>
                )}

                {/* Mouth */}
                {MOUTH_PATHS[face.mouth]}

                {/* ── Explorer pith helmet ── */}
                <g>
                  {/* brim */}
                  <ellipse cx={100} cy={54} rx={62} ry={15} fill={`url(#hat-${uid})`} stroke={C.hatTanDark} strokeWidth={1.5} />
                  {/* dome */}
                  <path d="M56,54 A44,40 0 0 1 144,54 Z" fill={`url(#hat-${uid})`} stroke={C.hatTanDark} strokeWidth={1.5} />
                  {/* olive band */}
                  <path d="M60,50 A42,20 0 0 0 140,50 L140,50 Q100,62 60,50 Z" fill={C.hatBand} opacity={0.9} />
                  {/* top knob */}
                  <circle cx={100} cy={18} r={5} fill={`url(#hat-${uid})`} stroke={C.hatTanDark} strokeWidth={1.5} />
                </g>
              </motion.g>

              {/* ── Built-in SVG sparkle burst for levelUp ── */}
              {sparkles &&
                [
                  { x: 30, y: 60, d: 0 },
                  { x: 170, y: 44, d: 0.12 },
                  { x: 46, y: 24, d: 0.24 },
                  { x: 150, y: 18, d: 0.36 },
                  { x: 100, y: 6, d: 0.18 },
                  { x: 12, y: 110, d: 0.3 },
                ].map((s, i) => (
                  <motion.path
                    key={i}
                    d="M0,-8 L2,-2 L8,0 L2,2 L0,8 L-2,2 L-8,0 L-2,-2 Z"
                    fill="#F5C542"
                    style={{ transformBox: "fill-box", transformOrigin: "center" }}
                    transform={`translate(${s.x} ${s.y})`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={reduced ? { opacity: [0, 1, 0] } : { scale: [0, 1.2, 0.4], opacity: [0, 1, 0], rotate: [0, 90] }}
                    transition={{ duration: 1, repeat: Infinity, delay: s.d, ease: "easeOut" }}
                  />
                ))}
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default JeffCharacter
