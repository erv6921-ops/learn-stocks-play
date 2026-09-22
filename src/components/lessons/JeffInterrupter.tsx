// JeffInterrupter — the "QUICK CHECK" card that slides up in place of the
// reply pills every few teaching beats. It renders one of four AI-generated
// activity types (true/false, fill-in-the-blank, opinion poll, spot-the-
// mistake), gives instant feedback, flashes a coin reward, and then hands a
// short result summary back so Jeff can acknowledge it in his next message.
//
// Content is generated upstream (see lib/jeffInterrupter). This file is purely
// the interaction + presentation. All tap targets are >=44px and there are no
// hover-only affordances, so every type works on mobile.
import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { Interrupter } from "@/lib/jeffInterrupter"

/** What the student did, summarized for Jeff's follow-up acknowledgment. */
export interface InterrupterResult {
  /** The thing they engaged with (statement / question / "the scenario"). */
  description: string
  /** "correct" | "wrong" | "answered '<their choice>'". */
  outcome: string
}

interface JeffInterrupterProps {
  /** The generated activity, or null while still loading. */
  interrupter: Interrupter | null
  /** True while the content is still being generated (show the skeleton). */
  loading: boolean
  /** Award coins for a completed activity (correct answers / sharing). */
  onCoins: (amount: number, reason: string) => void
  /** Student tapped "Continue →"; resume the chat with this result. */
  onComplete: (result: InterrupterResult) => void
}

const GOLD = "#f59e0b"

/** The card chrome shared by the loading and loaded states. */
function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      style={{ borderRadius: 12, border: "0.5px solid #e0e8e3", padding: 16 }}
      className="bg-white shadow-lg"
    >
      <div className="flex items-center gap-2 mb-3">
        <img
          src="/brand/mascot-character.png?v=2"
          alt=""
          width={24}
          height={24}
          className="shrink-0 object-contain"
          style={{ width: 24, height: 24 }}
        />
        <span
          className="font-extrabold uppercase tracking-wider rounded-full px-2 py-0.5"
          style={{ background: GOLD, color: "#3b2a06", fontSize: 10 }}
        >
          Quick check
        </span>
      </div>
      {children}
    </motion.div>
  )
}

/** Two text lines + two button placeholders, gently shimmering. */
function Skeleton() {
  return (
    <div className="animate-pulse space-y-3" aria-label="Loading quick check">
      <div className="h-3.5 rounded bg-black/10 w-[85%]" />
      <div className="h-3.5 rounded bg-black/10 w-[60%]" />
      <div className="grid gap-2 pt-1">
        <div className="h-11 rounded-xl bg-black/[0.07]" />
        <div className="h-11 rounded-xl bg-black/[0.07]" />
      </div>
    </div>
  )
}

/** The little gold "+N coins" burst shown just before the card dismisses. */
function CoinFlash({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      className="text-center font-extrabold py-1"
      style={{ color: GOLD }}
    >
      {label}
    </motion.div>
  )
}

const btnBase =
  "w-full rounded-xl border-2 px-4 text-[15px] font-semibold text-left transition-colors flex items-center"
const btnHeight = { minHeight: 44 }

export default function JeffInterrupter({ interrupter, loading, onCoins, onComplete }: JeffInterrupterProps) {
  if (loading || !interrupter) {
    return <CardShell><Skeleton /></CardShell>
  }
  return (
    <CardShell>
      <Activity interrupter={interrupter} onCoins={onCoins} onComplete={onComplete} />
    </CardShell>
  )
}

function Activity({
  interrupter,
  onCoins,
  onComplete,
}: {
  interrupter: Interrupter
  onCoins: (amount: number, reason: string) => void
  onComplete: (result: InterrupterResult) => void
}) {
  switch (interrupter.type) {
    case "true_or_false":
      return <TrueFalse data={interrupter} onCoins={onCoins} onComplete={onComplete} />
    case "fill_in_blank":
      return <FillBlank data={interrupter} onCoins={onCoins} onComplete={onComplete} />
    case "poll":
      return <PollActivity data={interrupter} onCoins={onCoins} onComplete={onComplete} />
    case "spot_the_mistake":
      return <SpotMistake data={interrupter} onCoins={onCoins} onComplete={onComplete} />
    case "sort_it":
      return <SortIt data={interrupter} onCoins={onCoins} onComplete={onComplete} />
    case "rank_it":
      return <RankIt data={interrupter} onCoins={onCoins} onComplete={onComplete} />
    case "smart_move":
      return <SmartMove data={interrupter} onCoins={onCoins} onComplete={onComplete} />
  }
}

/** Shared "Continue →" footer + optional coin flash + explanation line. */
function Footer({
  explanation,
  coinLabel,
  onContinue,
}: {
  explanation?: string
  coinLabel?: string
  onContinue: () => void
}) {
  // This footer only mounts once the quick-check is solved. Inside the scrolling
  // chat, the "Continue →" button can appear below the fold — so scroll it into
  // view on mount, otherwise it reads as a missing/absent Continue button.
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" })
  }, [])
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.15 }}
      className="mt-3 space-y-2"
    >
      {explanation && <p className="text-sm text-muted-foreground leading-snug">{explanation}</p>}
      {coinLabel && <CoinFlash label={coinLabel} />}
      <Button onClick={onContinue} className="w-full font-bold h-11">Continue →</Button>
    </motion.div>
  )
}

// ── Type 1: True or False ────────────────────────────────────────────
function TrueFalse({
  data,
  onCoins,
  onComplete,
}: {
  data: Extract<Interrupter, { type: "true_or_false" }>
  onCoins: (a: number, r: string) => void
  onComplete: (result: InterrupterResult) => void
}) {
  const [chosen, setChosen] = useState<boolean | null>(null)
  const correct = chosen !== null && chosen === data.answer

  const pick = (value: boolean) => {
    if (chosen !== null) return
    setChosen(value)
    if (value === data.answer) onCoins(25, "Quick check: correct")
  }

  const state = (value: boolean) => {
    if (chosen === null) return "idle"
    if (value === data.answer) return "correct" // reveal the right answer
    if (value === chosen) return "wrong"
    return "muted"
  }

  return (
    <div>
      <p className="text-[17px] font-semibold text-foreground leading-snug mb-3">{data.statement}</p>
      <div className="grid grid-cols-2 gap-2">
        {[true, false].map(value => {
          const s = state(value)
          return (
            <motion.button
              key={String(value)}
              onClick={() => pick(value)}
              disabled={chosen !== null}
              animate={s === "wrong" ? { x: [0, -6, 6, -4, 4, 0] } : {}}
              transition={{ duration: 0.35 }}
              style={btnHeight}
              className={`justify-center rounded-xl border-2 font-bold text-base transition-colors ${
                s === "correct"
                  ? "border-green-500 bg-green-50 text-green-700"
                  : s === "wrong"
                    ? "border-red-500 bg-red-50 text-red-600"
                    : s === "muted"
                      ? "border-black/10 text-muted-foreground"
                      : "border-primary/30 hover:border-primary hover:bg-primary/5"
              }`}
            >
              {value ? "True" : "False"}
            </motion.button>
          )
        })}
      </div>
      {chosen !== null && (
        <Footer
          explanation={data.explanation}
          coinLabel={correct ? "+25 coins" : undefined}
          onContinue={() =>
            onComplete({
              description: data.statement,
              outcome: correct ? "correct" : "wrong",
            })
          }
        />
      )}
    </div>
  )
}

// ── Type 2: Fill in the Blank ────────────────────────────────────────
function FillBlank({
  data,
  onCoins,
  onComplete,
}: {
  data: Extract<Interrupter, { type: "fill_in_blank" }>
  onCoins: (a: number, r: string) => void
  onComplete: (result: InterrupterResult) => void
}) {
  const [chosen, setChosen] = useState<string | null>(null)
  const correct = chosen !== null && chosen === data.answer
  // Shuffle once so the correct answer isn't always the first pill.
  const options = useMemo(() => [...data.options].sort(() => Math.random() - 0.5), [data.options])

  const pick = (opt: string) => {
    if (chosen !== null) return
    setChosen(opt)
    if (opt === data.answer) onCoins(25, "Quick check: correct")
  }

  // Render the sentence with the blank (filled in once answered).
  const parts = data.sentence.split("[BLANK]")
  const filled = chosen !== null

  // Reject a malformed generation where the word right before or after the blank
  // already IS the answer — filling it in produces a duplicated "it it". There's
  // nothing coherent to show, so don't render the widget at all.
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/gi, "")
  const before = (parts[0]?.trim().split(/\s+/).pop() ?? "")
  const after = ((parts[1] ?? "").trim().split(/\s+/)[0] ?? "")
  if (norm(before) === norm(data.answer) || norm(after) === norm(data.answer)) return null

  return (
    <div>
      <p className="text-[17px] font-semibold text-foreground leading-relaxed mb-3">
        {parts[0]}
        <span
          className={`inline-block min-w-[3.5rem] text-center font-extrabold ${
            filled ? (correct ? "text-green-600" : "") : "text-primary"
          }`}
        >
          {!filled ? (
            "______"
          ) : correct ? (
            chosen
          ) : (
            // Wrong: reveal the correct word in green with the student's struck through.
            <>
              <span className="text-green-600">{data.answer}</span>{" "}
              <span className="text-red-600 line-through decoration-2">{chosen}</span>
            </>
          )}
        </span>
        {parts[1] ?? ""}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => {
          const isAnswer = opt === data.answer
          const isChosen = opt === chosen
          const s = chosen === null ? "idle" : isAnswer ? "correct" : isChosen ? "wrong" : "muted"
          return (
            <motion.button
              key={opt}
              onClick={() => pick(opt)}
              disabled={chosen !== null}
              animate={s === "wrong" ? { x: [0, -6, 6, -4, 4, 0] } : {}}
              transition={{ duration: 0.35 }}
              style={btnHeight}
              className={`px-4 rounded-full border-2 font-semibold text-[15px] transition-colors ${
                s === "correct"
                  ? "border-green-500 bg-green-50 text-green-700"
                  : s === "wrong"
                    ? "border-red-500 bg-red-50 text-red-600"
                    : s === "muted"
                      ? "border-black/10 text-muted-foreground"
                      : "border-primary/30 hover:border-primary hover:bg-primary/5"
              }`}
            >
              {opt}
            </motion.button>
          )
        })}
      </div>
      {chosen !== null && (
        <Footer
          explanation={data.explanation}
          coinLabel={correct ? "+25 coins" : undefined}
          onContinue={() =>
            onComplete({
              description: data.sentence.replace("[BLANK]", data.answer),
              outcome: correct ? "correct" : "wrong",
            })
          }
        />
      )}
    </div>
  )
}

// ── Type 3: Real World Poll ──────────────────────────────────────────
function PollActivity({
  data,
  onCoins,
  onComplete,
}: {
  data: Extract<Interrupter, { type: "poll" }>
  onCoins: (a: number, r: string) => void
  onComplete: (result: InterrupterResult) => void
}) {
  const [chosen, setChosen] = useState<number | null>(null)

  const pick = (i: number) => {
    if (chosen !== null) return
    setChosen(i)
    onCoins(15, "Quick check: shared an opinion")
  }

  return (
    <div>
      <p className="text-[17px] font-semibold text-foreground leading-snug mb-3">{data.question}</p>
      <div className="grid gap-2">
        {data.options.map((opt, i) => {
          const revealed = chosen !== null
          const isChosen = i === chosen
          const pct = data.percentages[i] ?? 0
          return (
            <button
              key={opt}
              onClick={() => pick(i)}
              disabled={revealed}
              style={btnHeight}
              className={`relative overflow-hidden ${btnBase} justify-between ${
                isChosen ? "border-primary" : "border-primary/30 hover:border-primary hover:bg-primary/5"
              }`}
            >
              {/* the filled bar that reveals the (fake but realistic) split */}
              {revealed && (
                <motion.span
                  className="absolute inset-y-0 left-0"
                  style={{ background: isChosen ? "hsl(var(--primary) / 0.18)" : "hsl(var(--muted))" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
              )}
              <span className="relative z-10">{opt}</span>
              {revealed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative z-10 font-bold text-sm text-muted-foreground"
                >
                  {pct}%
                </motion.span>
              )}
            </button>
          )
        })}
      </div>
      {chosen !== null && (
        <Footer
          coinLabel="+15 for sharing your opinion!"
          onContinue={() =>
            onComplete({
              description: data.question,
              outcome: `answered '${data.options[chosen]}'`,
            })
          }
        />
      )}
    </div>
  )
}

// ── Type 4: Spot the Mistake ─────────────────────────────────────────
// Three separate, equally plausible money decisions — only one hides a mistake.
// The student picks the bad one; wrong picks shake and let them try again.
function SpotMistake({
  data,
  onCoins,
  onComplete,
}: {
  data: Extract<Interrupter, { type: "spot_the_mistake" }>
  onCoins: (a: number, r: string) => void
  onComplete: (result: InterrupterResult) => void
}) {
  const [solved, setSolved] = useState(false)
  const [wrongIdx, setWrongIdx] = useState<number | null>(null)
  const awarded = useRef(false)

  const tap = (i: number) => {
    if (solved) return
    if (i === data.mistakeIndex) {
      setSolved(true)
      setWrongIdx(null)
      if (!awarded.current) {
        awarded.current = true
        onCoins(25, "Quick check: correct")
      }
    } else {
      setWrongIdx(i)
    }
  }

  return (
    <div>
      <p className="text-[15px] font-semibold text-foreground mb-3">Which one is the money mistake?</p>
      <div className="grid gap-2">
        {data.scenarios.map((s, i) => {
          const mistakeHere = solved && i === data.mistakeIndex
          const wrongHere = wrongIdx === i
          return (
            <motion.button
              key={i}
              onClick={() => tap(i)}
              disabled={solved}
              animate={wrongHere ? { x: [0, -6, 6, -4, 4, 0] } : {}}
              transition={{ duration: 0.35 }}
              style={btnHeight}
              className={`block w-full text-left px-3.5 py-2.5 rounded-xl border-2 text-[15px] leading-snug transition-colors ${
                mistakeHere
                  ? "border-green-500 bg-green-50 text-green-700 font-medium"
                  : wrongHere
                    ? "border-red-500 bg-red-50 text-red-600"
                    : "border-primary/30 hover:border-primary hover:bg-primary/5"
              }`}
            >
              {s}
            </motion.button>
          )
        })}
      </div>
      {wrongIdx !== null && !solved && (
        <p className="text-sm text-red-500 mt-2">Not quite — try again.</p>
      )}
      {solved && (
        <Footer
          explanation={data.explanation}
          coinLabel="+25 coins"
          onContinue={() =>
            onComplete({ description: "spotting the money mistake", outcome: "correct" })
          }
        />
      )}
    </div>
  )
}

// ── Type 5: Sort It ──────────────────────────────────────────────────
// Each item is a compact row with the two bins as pills. Pick a bin per item;
// correct picks lock green. A wrong pick stays red with "Try the other group"
// and counts as a miss — too many misses and the round earns no coins.
function SortIt({
  data,
  onCoins,
  onComplete,
}: {
  data: Extract<Interrupter, { type: "sort_it" }>
  onCoins: (a: number, r: string) => void
  onComplete: (result: InterrupterResult) => void
}) {
  const [choice, setChoice] = useState<(number | null)[]>(() => data.items.map(() => null))
  const [misses, setMisses] = useState(0)
  const awarded = useRef(false)
  const solved = data.items.every((it, i) => choice[i] === it.bin)
  // Award nothing if they missed more than half the items.
  const earned = misses <= data.items.length / 2

  useEffect(() => {
    if (solved && !awarded.current) {
      awarded.current = true
      if (earned) onCoins(25, "Quick check: correct")
    }
  }, [solved, earned, onCoins])

  const pick = (itemIdx: number, binIdx: number) => {
    const item = data.items[itemIdx]
    if (solved || choice[itemIdx] === item.bin) return // already locked correct
    if (choice[itemIdx] === binIdx) return // re-tapping the same wrong bin — no-op
    setChoice(prev => prev.map((c, i) => (i === itemIdx ? binIdx : c)))
    if (binIdx !== item.bin) setMisses(m => m + 1) // wrong pick stays red, counts as a miss
  }

  return (
    <div>
      <p className="text-[15px] font-semibold text-foreground mb-3">Put each into the right group.</p>
      <div className="space-y-2 max-h-[42vh] overflow-y-auto pr-0.5">
        {data.items.map((it, i) => {
          const locked = choice[i] === it.bin
          const hasWrong = choice[i] !== null && !locked
          return (
            <div
              key={i}
              className={`rounded-xl border-2 pl-3 pr-1.5 py-1 transition-colors ${
                locked ? "border-green-500 bg-green-50" : hasWrong ? "border-red-500 bg-red-50" : "border-black/10"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="flex-1 text-[14px] font-medium leading-tight">{it.text}</span>
                <div className="flex gap-1 shrink-0">
                  {data.bins.map((b, bi) => {
                    const chosen = choice[i] === bi
                    const lockedHere = locked && it.bin === bi
                    const wrongHere = hasWrong && chosen && bi !== it.bin
                    return (
                      <motion.button
                        key={bi}
                        onClick={() => pick(i, bi)}
                        disabled={solved || locked}
                        animate={wrongHere ? { x: [0, -5, 5, -3, 3, 0] } : {}}
                        transition={{ duration: 0.35 }}
                        style={{ minHeight: 44 }}
                        className={`px-3 rounded-lg border-2 text-[13px] font-bold transition-colors ${
                          lockedHere
                            ? "border-green-500 bg-green-100 text-green-700"
                            : wrongHere
                              ? "border-red-500 bg-red-50 text-red-600"
                              : "border-primary/30 hover:border-primary hover:bg-primary/5"
                        }`}
                      >
                        {b}
                      </motion.button>
                    )
                  })}
                </div>
              </div>
              {hasWrong && <p className="text-[12px] text-red-500 mt-0.5">Try the other group.</p>}
            </div>
          )
        })}
      </div>
      {solved && (
        <Footer
          explanation={data.explanation}
          coinLabel={earned ? "+25 coins" : undefined}
          onContinue={() => onComplete({ description: "sorting into the right groups", outcome: "correct" })}
        />
      )}
    </div>
  )
}

// ── Type 6: Rank It ──────────────────────────────────────────────────
// Tap the items in order; the taps stamp position badges. A complete-but-wrong
// order keeps the placed items and tells the student how many are already in the
// right spot, so they can "Undo last" and adjust instead of starting over. After
// two misses a "Show me" button reveals the answer (no coins if they use it).
function RankIt({
  data,
  onCoins,
  onComplete,
}: {
  data: Extract<Interrupter, { type: "rank_it" }>
  onCoins: (a: number, r: string) => void
  onComplete: (result: InterrupterResult) => void
}) {
  const [sequence, setSequence] = useState<number[]>([])
  const [misses, setMisses] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [solvedCorrectly, setSolvedCorrectly] = useState(false)
  const awarded = useRef(false)

  const solved = solvedCorrectly || revealed
  const complete = sequence.length === data.items.length
  const wrongComplete = complete && !solvedCorrectly && !revealed
  const correctCount = sequence.reduce((n, v, k) => n + (v === data.order[k] ? 1 : 0), 0)

  const tap = (i: number) => {
    if (solved || sequence.includes(i)) return
    const next = [...sequence, i]
    setSequence(next)
    if (next.length === data.items.length) {
      if (next.every((v, k) => v === data.order[k])) {
        setSolvedCorrectly(true)
        if (!awarded.current) {
          awarded.current = true
          onCoins(25, "Quick check: correct")
        }
      } else {
        setMisses(m => m + 1)
      }
    }
  }

  const undoLast = () => {
    if (solved) return
    setSequence(prev => prev.slice(0, -1))
  }

  const showMe = () => {
    if (solved) return
    setSequence(data.order)
    setRevealed(true)
  }

  return (
    <div>
      <p className="text-[15px] font-semibold text-foreground mb-1">{data.prompt}</p>
      <p className="text-xs text-muted-foreground mb-3">Tap them in order.</p>
      <div className="grid gap-2">
        {data.items.map((s, i) => {
          const pos = sequence.indexOf(i)
          const placed = pos >= 0
          const posCorrect = placed && data.order[pos] === i
          return (
            <motion.button
              key={i}
              onClick={() => tap(i)}
              disabled={solved || placed}
              animate={wrongComplete && placed && !posCorrect ? { x: [0, -6, 6, -4, 4, 0] } : {}}
              transition={{ duration: 0.35 }}
              style={{ minHeight: 44 }}
              className={`flex items-center gap-3 w-full text-left px-3 rounded-xl border-2 text-[15px] font-semibold transition-colors ${
                solved
                  ? "border-green-500 bg-green-50 text-green-700"
                  : wrongComplete && placed
                    ? posCorrect
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-red-500 bg-red-50 text-red-600"
                    : placed
                      ? "border-primary bg-primary/5"
                      : "border-primary/30 hover:border-primary hover:bg-primary/5"
              }`}
            >
              <span
                className={`shrink-0 w-6 h-6 rounded-full grid place-items-center text-xs font-extrabold ${
                  placed ? "bg-primary text-primary-foreground" : "bg-black/[0.06] text-muted-foreground"
                }`}
              >
                {placed ? pos + 1 : "•"}
              </span>
              {s}
            </motion.button>
          )
        })}
      </div>
      {wrongComplete && (
        <p className="text-sm text-red-500 mt-2">
          Not the right order — {correctCount} of {data.items.length} correct.
        </p>
      )}
      {!solved && (sequence.length > 0 || misses >= 2) && (
        <div className="flex gap-2 mt-2">
          {sequence.length > 0 && (
            <Button variant="outline" size="sm" onClick={undoLast} className="h-9">
              Undo last
            </Button>
          )}
          {misses >= 2 && (
            <Button variant="outline" size="sm" onClick={showMe} className="h-9">
              Show me
            </Button>
          )}
        </div>
      )}
      {solved && (
        <Footer
          explanation={data.explanation}
          coinLabel={solvedCorrectly ? "+25 coins" : undefined}
          onContinue={() =>
            onComplete({ description: data.prompt, outcome: solvedCorrectly ? "correct" : "wrong" })
          }
        />
      )}
    </div>
  )
}

// ── Type 7: Smart Move ───────────────────────────────────────────────
// A short scenario ending in a fork; pick the smarter of two believable moves.
function SmartMove({
  data,
  onCoins,
  onComplete,
}: {
  data: Extract<Interrupter, { type: "smart_move" }>
  onCoins: (a: number, r: string) => void
  onComplete: (result: InterrupterResult) => void
}) {
  const [chosen, setChosen] = useState<number | null>(null)
  const correct = chosen !== null && chosen === data.answer

  const pick = (i: number) => {
    if (chosen !== null) return
    setChosen(i)
    if (i === data.answer) onCoins(25, "Quick check: correct")
  }

  return (
    <div>
      <p className="text-[15px] text-foreground leading-snug mb-3 rounded-lg bg-muted/40 px-3 py-2">
        {data.scenario}
      </p>
      <div className="grid gap-2">
        {data.options.map((opt, i) => {
          const s =
            chosen === null
              ? "idle"
              : i === data.answer
                ? "correct"
                : i === chosen
                  ? "wrong"
                  : "muted"
          return (
            <motion.button
              key={i}
              onClick={() => pick(i)}
              disabled={chosen !== null}
              animate={s === "wrong" ? { x: [0, -6, 6, -4, 4, 0] } : {}}
              transition={{ duration: 0.35 }}
              style={{ minHeight: 44 }}
              className={`w-full text-left px-4 py-2.5 rounded-xl border-2 text-[15px] font-semibold transition-colors ${
                s === "correct"
                  ? "border-green-500 bg-green-50 text-green-700"
                  : s === "wrong"
                    ? "border-red-500 bg-red-50 text-red-600"
                    : s === "muted"
                      ? "border-black/10 text-muted-foreground"
                      : "border-primary/30 hover:border-primary hover:bg-primary/5"
              }`}
            >
              {opt}
            </motion.button>
          )
        })}
      </div>
      {chosen !== null && (
        <Footer
          explanation={data.explanation}
          coinLabel={correct ? "+25 coins" : undefined}
          onContinue={() =>
            onComplete({
              description: "picking the smarter money move",
              outcome: correct ? "correct" : "wrong",
            })
          }
        />
      )}
    </div>
  )
}
