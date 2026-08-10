import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useApp } from "@/contexts/AppContext"
import { LEAGUES, getLeagueIdx } from "@/lib/leagues"
import JeffMascot from "@/components/Jeff/JeffMascot"

// Big league-promotion celebration (Bronze → Silver → Gold → …): Jeff in the
// middle cheering, a confetti shower, and three mystery gifts the student
// chooses ONE of. Fires only when the coin balance crosses into a new LEAGUE,
// so it stays a rare, momentous moment.

const CONFETTI_COLORS = ["#E3A008", "#10b981", "#ffffff", "#2dd4bf", "#E0457B", "#8B5CF6"]

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 44 }, (_, i) => ({
        left: Math.random() * 100,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        duration: 2.4 + Math.random() * 2,
        delay: Math.random() * 1.4,
        size: 7 + Math.random() * 7,
        rotate: Math.random() * 360,
        round: Math.random() > 0.5,
      })),
    [],
  )
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p, i) => (
        <motion.div
          key={i}
          className="absolute top-0"
          style={{ left: `${p.left}vw`, width: p.size, height: p.size, background: p.color, borderRadius: p.round ? "50%" : 2 }}
          initial={{ y: -30, opacity: 0, rotate: 0 }}
          animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: p.rotate }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn", repeat: Infinity }}
        />
      ))}
    </div>
  )
}

// The real Jeff mascot, celebrating, with a bouncing "YAYYY!" above him.
function JeffCheer({ color }: { color: string }) {
  return (
    <div className="relative flex flex-col items-center pt-8">
      <motion.div
        className="relative w-40 h-40"
        initial={{ scale: 0, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.05 }}
      >
        <JeffMascot mood="encourage" />

        {/* YAYYY! shout above his head. */}
        <motion.div
          className="absolute font-display font-extrabold whitespace-nowrap"
          style={{ left: "50%", top: -24, x: "-50%", zIndex: 6, fontSize: 34, color, textShadow: "0 3px 0 rgba(0,0,0,0.3)" }}
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.08, 1], rotate: [-2, 2, -2] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        >
          YAYYY!
        </motion.div>
      </motion.div>
    </div>
  )
}

interface Prize { emoji: string; label: string; coins: number }

const PRIZE_POOL: { emoji: string; label: string; base: number }[] = [
  { emoji: "💰", label: "Treasure Chest", base: 1000 },
  { emoji: "💎", label: "Gem Haul", base: 1500 },
  { emoji: "👑", label: "Royal Bounty", base: 2000 },
  { emoji: "🚀", label: "Rocket Fuel", base: 2500 },
  { emoji: "⭐", label: "Lucky Star", base: 750 },
  { emoji: "🎁", label: "Mystery Bonus", base: 1250 },
  { emoji: "🔥", label: "Hot Streak", base: 1750 },
  { emoji: "🪙", label: "Coin Vault", base: 900 },
]

// Three distinct choices, scaled up for higher leagues so they stay generous.
function rollPrizes(leagueIdx: number): Prize[] {
  const pool = [...PRIZE_POOL]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  const mult = 1 + Math.max(0, leagueIdx) * 0.3
  return pool.slice(0, 3).map(p => ({
    emoji: p.emoji,
    label: p.label,
    coins: Math.round((p.base * mult) / 50) * 50,
  }))
}

function GiftBox({ prize, index, picked, chosen, onPick }: { prize: Prize; index: number; picked: boolean; chosen: boolean; onPick: () => void }) {
  return (
    <div className="flex flex-col items-center gap-2 w-24">
      <motion.button
        onClick={onPick}
        disabled={picked}
        className="relative w-24 h-24 rounded-2xl flex items-center justify-center"
        style={{
          opacity: picked && !chosen ? 0.4 : 1,
          background: chosen ? "rgba(255,255,255,0.10)" : "linear-gradient(160deg,#3a2f12,#26324a)",
          border: chosen ? "2px solid #FCD34D" : "2px solid rgba(255,255,255,0.15)",
        }}
        initial={{ scale: 0, y: 24 }}
        animate={!picked ? { scale: 1, y: [0, -6, 0] } : { scale: chosen ? 1.08 : 0.95, y: 0 }}
        transition={
          !picked
            ? { y: { duration: 1.2, repeat: Infinity, delay: index * 0.15 }, scale: { delay: 0.3 + index * 0.1, type: "spring", stiffness: 300, damping: 18 } }
            : { type: "spring", stiffness: 300, damping: 16 }
        }
        whileHover={!picked ? { scale: 1.07 } : undefined}
        whileTap={!picked ? { scale: 0.94 } : undefined}
      >
        <AnimatePresence mode="wait">
          {picked ? (
            <motion.span key="p" initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 320, damping: 14 }} style={{ fontSize: 44 }}>
              {prize.emoji}
            </motion.span>
          ) : (
            <motion.span key="b" exit={{ scale: 0, opacity: 0 }} style={{ fontSize: 44 }}>🎁</motion.span>
          )}
        </AnimatePresence>
      </motion.button>
      <div className="h-9 text-center">
        <AnimatePresence>
          {picked && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-[11px] font-bold text-white/70 leading-tight">{prize.label}</div>
              {chosen ? (
                <div className="text-sm font-extrabold" style={{ color: "#FCD34D" }}>+{prize.coins.toLocaleString()} 🪙</div>
              ) : (
                <div className="text-[10px] text-white/40">not picked</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function Overlay({ leagueIdx, onDismiss }: { leagueIdx: number; onDismiss: () => void }) {
  const { awardJeffs } = useApp()
  const league = LEAGUES[leagueIdx] ?? LEAGUES[LEAGUES.length - 1]
  const prizes = useMemo(() => rollPrizes(leagueIdx), [leagueIdx])
  const [pickedIdx, setPickedIdx] = useState<number | null>(null)
  const picked = pickedIdx !== null

  const pick = (i: number) => {
    if (picked) return
    awardJeffs(prizes[i].coins, `${league.name} League reward`)
    setPickedIdx(i)
  }

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center px-6"
      style={{ zIndex: 10000, background: "rgba(0,0,0,0.9)" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <Confetti />
      <motion.div
        className="relative flex flex-col items-center text-center gap-4 max-w-md w-full"
        initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 18 }}
      >
        <JeffCheer color={league.color} />

        <div className="flex flex-col items-center gap-0.5">
          <div className="font-display font-extrabold tracking-wide" style={{ fontSize: 16, color: "#ffffff", opacity: 0.75 }}>LEAGUE UP!</div>
          <div className="font-display font-extrabold flex items-center gap-2" style={{ fontSize: 34, color: league.color, lineHeight: 1 }}>
            <span>{league.icon}</span> {league.name}
          </div>
        </div>

        <div className="text-white/85 text-sm font-semibold -mb-1">
          {picked ? "Nice pick - enjoy your reward! 🎉" : "Pick ONE gift to claim your reward"}
        </div>

        <div className="flex items-start justify-center gap-4">
          {prizes.map((p, i) => (
            <GiftBox key={i} prize={p} index={i} picked={picked} chosen={pickedIdx === i} onPick={() => pick(i)} />
          ))}
        </div>

        <button
          onClick={onDismiss}
          disabled={!picked}
          className="mt-1 px-7 py-3 rounded-xl font-bold text-base transition-transform disabled:opacity-40 active:scale-95"
          style={{ background: picked ? league.color : "rgba(255,255,255,0.14)", color: picked ? "#1a1205" : "#ffffff" }}
        >
          {picked ? "Keep going →" : "Pick a gift first"}
        </button>
      </motion.div>
    </motion.div>
  )
}

/**
 * Watches the coin balance and fires the big league-promotion celebration
 * whenever the student crosses into a higher league. Mount once, high in the
 * tree. In dev, append ?leagueup=<idx> to preview it (e.g. ?leagueup=2 = Gold).
 */
export default function LeagueUpWatcher() {
  const { jeffsBalance } = useApp()
  const idx = getLeagueIdx(jeffsBalance)
  const lastIdxRef = useRef<number | null>(null)
  const [shownIdx, setShownIdx] = useState<number | null>(null)

  useEffect(() => {
    if (!import.meta.env.DEV) return
    const p = new URLSearchParams(window.location.search).get("leagueup")
    if (p != null) setShownIdx(Math.max(1, Math.min(LEAGUES.length - 1, Number(p) || 1)))
  }, [])

  useEffect(() => {
    if (lastIdxRef.current === null) {
      lastIdxRef.current = idx // seed - never fire on load/login
      return
    }
    if (idx > lastIdxRef.current) setShownIdx(idx)
    lastIdxRef.current = idx
  }, [idx])

  return (
    <AnimatePresence>
      {shownIdx !== null && <Overlay leagueIdx={shownIdx} onDismiss={() => setShownIdx(null)} />}
    </AnimatePresence>
  )
}
