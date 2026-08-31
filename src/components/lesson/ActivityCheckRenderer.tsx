// ActivityCheckRenderer — renders an "activity" micro-check (a tap-based
// baseline check) in place of a plain multiple-choice micro-check. It dispatches
// on the activity kind, owns the shared card chrome + result footer, and scores
// the outcome through the lesson's QuizSession exactly once.
//
// Scoring model: every activity resolves to a single formative outcome, worth
// the same low stakes as an MCQ micro-check (coins = 10). Single-pick kinds
// (fill-blank, odd-one-out, two-truths) resolve on the first tap. Multi-step
// kinds (vocab-match, categorize, sequence) can only be *finished* correctly —
// so "getting it wrong" means fumbling on the way: any wrong tap marks the
// attempt as not-clean, which registers as a miss. That's the rigor: the check
// passes cleanly only if the student knew every element cold.
//
// All tap targets are >=44px; there are no hover-only affordances, so every
// kind works on mobile.
import { useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BrainCircuit, ArrowRight, Lightbulb } from "lucide-react"
import { useQuizSession } from "@/components/lesson/QuizSessionContext"
import type {
  ActivityCheckSection,
  ActivityCheck,
  VocabMatchActivity,
  FillBlankActivity,
  CategorizeActivity,
  SequenceActivity,
  OddOneOutActivity,
  TwoTruthsActivity,
} from "@/types"

// Coins staked on the formative outcome — matches the MCQ micro-check.
const ACTIVITY_COINS = 10
// A nominal "expected" duration so the QuizSession speed tiers have a baseline.
// Activities are untimed; this only shapes the coin reward, never a penalty.
const EXPECTED_MS = 12000

// Shuffle helper — a fresh array so the source order is never mutated.
function shuffled<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

// Shared tap-button base. Idle / correct / wrong / muted variants use the app's
// design tokens so activities match the lesson card styling (not hardcoded).
const stateClass = {
  idle: "border-border hover:border-primary/50 hover:bg-muted/50",
  correct: "border-success bg-success/10 text-success",
  wrong: "border-destructive bg-destructive/10 text-destructive",
  muted: "border-border/60 bg-muted/40 text-muted-foreground",
} as const
type TapState = keyof typeof stateClass

const shake = { x: [0, -8, 8, -6, 6, 0] }
const shakeTransition = { duration: 0.4 }
// A quick scale "pop" when a tile locks in, and the springy transition that
// gives taps and selection their bounce.
const POP = { scale: [1, 1.08, 1] }
const SPRING = { type: "spring" as const, stiffness: 420, damping: 16 }

// ─── Parent: chrome + dispatch + scoring + footer ───

export function ActivityCheckRenderer({
  section,
  onContinue,
}: {
  section: ActivityCheckSection
  onContinue: () => void
}) {
  const session = useQuizSession()
  // null while unsolved; true = solved cleanly, false = solved with a slip.
  const [clean, setClean] = useState<boolean | null>(null)
  const startRef = useRef(Date.now())
  const scoredRef = useRef(false)

  const handleResolve = (wasClean: boolean) => {
    if (scoredRef.current) return
    scoredRef.current = true
    const ctx = { responseMs: Date.now() - startRef.current, questionB: 0, expectedMs: EXPECTED_MS }
    if (wasClean) session.registerCorrect(ACTIVITY_COINS, ctx)
    else session.registerWrong(ACTIVITY_COINS, ctx)
    setClean(wasClean)
  }

  const explanation = activityExplanation(section.activity)

  return (
    <Card variant="elevated" className="overflow-hidden">
      <div className="bg-accent/10 border-b border-border px-6 py-3 flex items-center gap-2">
        <BrainCircuit className="w-4 h-4 text-accent" />
        <span className="text-xs font-semibold text-accent uppercase tracking-wider">Micro Check</span>
        <Badge variant="outline" className="ml-auto text-xs">{activityLabel(section.activity.kind)}</Badge>
      </div>
      <CardContent className="p-6 space-y-4">
        {section.title && <h3 className="text-base font-bold text-foreground">{section.title}</h3>}

        <ActivityBody activity={section.activity} onResolve={handleResolve} />

        {clean !== null && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <div className={`p-4 rounded-lg border ${clean ? "bg-success/10 border-success/20" : "bg-amber-500/10 border-amber-500/20"}`}>
              <p className={`font-medium text-sm ${clean ? "text-success" : "text-amber-600"}`}>
                {clean ? "✓ Nailed it!" : "✗ Not quite — here's the idea"}
              </p>
              {explanation && (
                <p className="text-xs text-muted-foreground mt-1.5 flex items-start gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span>{explanation}</span>
                </p>
              )}
            </div>
            <Button size="sm" onClick={onContinue}>
              Continue <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

function activityLabel(kind: ActivityCheck["kind"]): string {
  switch (kind) {
    case "vocab-match": return "Match"
    case "fill-blank": return "Fill in"
    case "categorize": return "Sort"
    case "sequence": return "Order"
    case "odd-one-out": return "Odd one out"
    case "two-truths-a-lie": return "Spot the lie"
  }
}

function activityExplanation(a: ActivityCheck): string | undefined {
  return "explanation" in a ? a.explanation : undefined
}

function ActivityBody({ activity, onResolve }: { activity: ActivityCheck; onResolve: (clean: boolean) => void }) {
  switch (activity.kind) {
    case "vocab-match": return <VocabMatch data={activity} onResolve={onResolve} />
    case "fill-blank": return <FillBlank data={activity} onResolve={onResolve} />
    case "categorize": return <Categorize data={activity} onResolve={onResolve} />
    case "sequence": return <Sequence data={activity} onResolve={onResolve} />
    case "odd-one-out": return <OddOneOut data={activity} onResolve={onResolve} />
    case "two-truths-a-lie": return <TwoTruths data={activity} onResolve={onResolve} />
  }
}

type BodyProps<T> = { data: T; onResolve: (clean: boolean) => void }

// ─── Vocab match ───
// Two columns (terms | definitions), each shuffled. Tap a term, then its
// definition. A correct pair locks green; a wrong pair flashes and clears.
// Solved when every pair is locked; clean only if no wrong tap happened.
function VocabMatch({ data, onResolve }: BodyProps<VocabMatchActivity>) {
  const termOrder = useMemo(() => shuffled(data.pairs.map((_, i) => i)), [data.pairs])
  const defOrder = useMemo(() => shuffled(data.pairs.map((_, i) => i)), [data.pairs])
  const [selected, setSelected] = useState<number | null>(null) // pair index of picked term
  const [locked, setLocked] = useState<number[]>([])
  const [wrongDef, setWrongDef] = useState<number | null>(null)
  const erred = useRef(false)
  const done = useRef(false)

  const finish = (nextLocked: number[]) => {
    if (nextLocked.length === data.pairs.length && !done.current) {
      done.current = true
      onResolve(!erred.current)
    }
  }

  const tapTerm = (pairIdx: number) => {
    if (done.current || locked.includes(pairIdx)) return
    setSelected(pairIdx)
  }
  const tapDef = (pairIdx: number) => {
    if (done.current || locked.includes(pairIdx)) return
    if (selected === null) return
    if (selected === pairIdx) {
      const next = [...locked, pairIdx]
      setLocked(next)
      setSelected(null)
      finish(next)
    } else {
      erred.current = true
      setWrongDef(pairIdx)
      setSelected(null)
      setTimeout(() => setWrongDef(w => (w === pairIdx ? null : w)), 450)
    }
  }

  return (
    <div>
      <p className="text-sm font-semibold text-foreground mb-3">Match each term to its meaning.</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {termOrder.map(i => {
            const isLocked = locked.includes(i)
            const isSel = selected === i
            const s: TapState = isLocked ? "correct" : "idle"
            return (
              <motion.button
                key={i}
                onClick={() => tapTerm(i)}
                disabled={isLocked}
                // Pop when it locks in, a gentle lift while selected, tap-shrink
                // for touch feedback.
                animate={isLocked ? POP : isSel ? { scale: 1.04 } : { scale: 1 }}
                whileTap={isLocked ? undefined : { scale: 0.95 }}
                transition={SPRING}
                style={{ minHeight: 44 }}
                className={`w-full text-left px-3 py-2 rounded-xl border-2 text-[13px] font-bold transition-colors ${
                  isSel ? "border-primary bg-primary/10 shadow-sm shadow-primary/20" : stateClass[s]
                }`}
              >
                {data.pairs[i].term}
              </motion.button>
            )
          })}
        </div>
        <div className="space-y-2">
          {defOrder.map(i => {
            const isLocked = locked.includes(i)
            const isWrong = wrongDef === i
            const s: TapState = isLocked ? "correct" : isWrong ? "wrong" : "idle"
            return (
              <motion.button
                key={i}
                onClick={() => tapDef(i)}
                disabled={isLocked}
                animate={isLocked ? POP : isWrong ? shake : { scale: 1 }}
                whileTap={isLocked ? undefined : { scale: 0.95 }}
                transition={isWrong ? shakeTransition : SPRING}
                style={{ minHeight: 44 }}
                className={`w-full text-left px-3 py-2 rounded-xl border-2 text-[13px] leading-snug transition-colors ${stateClass[s]}`}
              >
                {data.pairs[i].definition}
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Fill in the blank ── (single pick)
function FillBlank({ data, onResolve }: BodyProps<FillBlankActivity>) {
  const options = useMemo(() => shuffled(data.options), [data.options])
  const [chosen, setChosen] = useState<string | null>(null)
  const parts = data.sentence.split("[BLANK]")

  const pick = (opt: string) => {
    if (chosen !== null) return
    setChosen(opt)
    onResolve(opt === data.answer)
  }
  const correct = chosen !== null && chosen === data.answer

  return (
    <div>
      <p className="text-[15px] font-medium text-foreground leading-relaxed mb-3">
        {parts[0]}
        <span className={`inline-block min-w-[3.5rem] text-center font-extrabold ${
          chosen === null ? "text-primary" : correct ? "text-success" : "text-destructive"
        }`}>
          {chosen ?? "______"}
        </span>
        {parts[1] ?? ""}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => {
          const s: TapState = chosen === null ? "idle" : opt === data.answer ? "correct" : opt === chosen ? "wrong" : "muted"
          return (
            <motion.button
              key={opt}
              onClick={() => pick(opt)}
              disabled={chosen !== null}
              animate={s === "wrong" ? shake : undefined}
              transition={shakeTransition}
              style={{ minHeight: 44 }}
              className={`px-4 rounded-full border-2 font-semibold text-sm transition-colors ${stateClass[s]}`}
            >
              {opt}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Categorize ── (multi-step)
// Each item is a row with the bins as pills. Correct pick locks green; a wrong
// pick flashes and clears so they retry. Clean only if no wrong pick.
function Categorize({ data, onResolve }: BodyProps<CategorizeActivity>) {
  const [choice, setChoice] = useState<(number | null)[]>(() => data.items.map(() => null))
  const [wrongItem, setWrongItem] = useState<number | null>(null)
  const erred = useRef(false)
  const done = useRef(false)

  const pick = (itemIdx: number, binIdx: number) => {
    const item = data.items[itemIdx]
    if (done.current || choice[itemIdx] === item.bin) return
    if (binIdx === item.bin) {
      const next = choice.map((c, i) => (i === itemIdx ? binIdx : c))
      setChoice(next)
      if (next.every((c, i) => c === data.items[i].bin) && !done.current) {
        done.current = true
        onResolve(!erred.current)
      }
    } else {
      erred.current = true
      setChoice(prev => prev.map((c, i) => (i === itemIdx ? binIdx : c)))
      setWrongItem(itemIdx)
      setTimeout(() => {
        setChoice(prev => prev.map((c, i) => (i === itemIdx && c !== data.items[i].bin ? null : c)))
        setWrongItem(w => (w === itemIdx ? null : w))
      }, 500)
    }
  }

  return (
    <div>
      <p className="text-sm font-semibold text-foreground mb-3">Put each one in the right group.</p>
      <div className="space-y-2">
        {data.items.map((it, i) => {
          const locked = choice[i] === it.bin
          return (
            <div
              key={i}
              className={`flex items-center gap-2 rounded-xl border-2 pl-3 pr-1.5 py-1.5 transition-colors ${
                locked ? "border-success bg-success/10" : "border-border"
              }`}
            >
              <span className="flex-1 text-[13px] font-medium leading-tight">{it.text}</span>
              <div className="flex gap-1 shrink-0">
                {data.bins.map((b, bi) => {
                  const isChoice = choice[i] === bi
                  const lockedHere = locked && it.bin === bi
                  const wrongHere = wrongItem === i && isChoice && bi !== it.bin
                  const s: TapState = lockedHere ? "correct" : wrongHere ? "wrong" : "idle"
                  return (
                    <motion.button
                      key={bi}
                      onClick={() => pick(i, bi)}
                      disabled={locked}
                      animate={wrongHere ? { x: [0, -5, 5, -3, 3, 0] } : undefined}
                      transition={shakeTransition}
                      style={{ minHeight: 44 }}
                      className={`px-3 rounded-lg border-2 text-xs font-bold transition-colors ${stateClass[s]}`}
                    >
                      {b}
                    </motion.button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Sequence ── (multi-step)
// Tap items into the correct order; a complete-but-wrong order shakes and
// resets. Clean only if the first completed order is correct.
function Sequence({ data, onResolve }: BodyProps<SequenceActivity>) {
  // Display order is shuffled; `data.steps` is the correct order. Each rendered
  // item carries its correct rank (index in data.steps).
  const items = useMemo(
    () => shuffled(data.steps.map((text, rank) => ({ text, rank }))),
    [data.steps],
  )
  const [sequence, setSequence] = useState<number[]>([]) // display indices, tap order
  const [wrong, setWrong] = useState(false)
  const [solved, setSolved] = useState(false)
  const erred = useRef(false)
  const done = useRef(false)

  const tap = (i: number) => {
    if (solved || wrong || sequence.includes(i)) return
    const next = [...sequence, i]
    setSequence(next)
    if (next.length === items.length) {
      const correct = next.every((di, pos) => items[di].rank === pos)
      if (correct) {
        setSolved(true)
        if (!done.current) {
          done.current = true
          onResolve(!erred.current)
        }
      } else {
        erred.current = true
        setWrong(true)
        setTimeout(() => {
          setSequence([])
          setWrong(false)
        }, 700)
      }
    }
  }

  return (
    <div>
      <p className="text-sm font-semibold text-foreground mb-1">{data.prompt}</p>
      <p className="text-xs text-muted-foreground mb-3">Tap them in the correct order.</p>
      <div className="space-y-2">
        {items.map((item, i) => {
          const pos = sequence.indexOf(i)
          const placed = pos >= 0
          const s: TapState = solved ? "correct" : wrong && placed ? "wrong" : "idle"
          return (
            <motion.button
              key={i}
              onClick={() => tap(i)}
              disabled={solved}
              animate={wrong && placed ? shake : undefined}
              transition={shakeTransition}
              style={{ minHeight: 44 }}
              className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-xl border-2 text-sm font-medium transition-colors ${
                placed && !solved && !wrong ? "border-primary bg-primary/5" : stateClass[s]
              }`}
            >
              <span className={`shrink-0 w-6 h-6 rounded-full grid place-items-center text-xs font-extrabold ${
                placed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {placed ? pos + 1 : "•"}
              </span>
              {item.text}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Odd one out ── (single pick)
function OddOneOut({ data, onResolve }: BodyProps<OddOneOutActivity>) {
  // Shuffle display order while tracking which display slot is the odd one.
  const order = useMemo(() => shuffled(data.options.map((_, i) => i)), [data.options])
  const [chosen, setChosen] = useState<number | null>(null) // original index

  const pick = (origIdx: number) => {
    if (chosen !== null) return
    setChosen(origIdx)
    onResolve(origIdx === data.oddIndex)
  }

  return (
    <div>
      <p className="text-sm font-semibold text-foreground mb-3">{data.prompt}</p>
      <div className="grid gap-2">
        {order.map(origIdx => {
          const s: TapState =
            chosen === null ? "idle"
              : origIdx === data.oddIndex ? "correct"
              : origIdx === chosen ? "wrong"
              : "muted"
          return (
            <motion.button
              key={origIdx}
              onClick={() => pick(origIdx)}
              disabled={chosen !== null}
              animate={s === "wrong" ? shake : undefined}
              transition={shakeTransition}
              style={{ minHeight: 44 }}
              className={`w-full text-left px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-colors ${stateClass[s]}`}
            >
              {data.options[origIdx]}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Two truths and a lie ── (single pick)
function TwoTruths({ data, onResolve }: BodyProps<TwoTruthsActivity>) {
  const order = useMemo(() => shuffled(data.statements.map((_, i) => i)), [data.statements])
  const [chosen, setChosen] = useState<number | null>(null) // original index

  const pick = (origIdx: number) => {
    if (chosen !== null) return
    setChosen(origIdx)
    onResolve(origIdx === data.lieIndex)
  }

  return (
    <div>
      <p className="text-sm font-semibold text-foreground mb-3">{data.prompt ?? "Two of these are true. Tap the one that's false."}</p>
      <div className="grid gap-2">
        {order.map(origIdx => {
          const s: TapState =
            chosen === null ? "idle"
              : origIdx === data.lieIndex ? "correct" // reveal the lie (the target) in green
              : origIdx === chosen ? "wrong"
              : "muted"
          return (
            <motion.button
              key={origIdx}
              onClick={() => pick(origIdx)}
              disabled={chosen !== null}
              animate={s === "wrong" ? shake : undefined}
              transition={shakeTransition}
              style={{ minHeight: 44 }}
              className={`w-full text-left px-4 py-2.5 rounded-xl border-2 text-sm leading-snug transition-colors ${stateClass[s]}`}
            >
              {data.statements[origIdx]}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
