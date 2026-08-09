// Careers desk for the Virtual Bank - a long-running "living job", built the
// same way MicroBusinessOffice runs the business over weeks.
//
// The loop: every work week your desk gets a procedurally generated deal
// (lib/careerSim). You play its decision stages, then WRITE the deliverable -
// a deal memo / client letter with a word minimum, Micro-Business style -
// before the week closes. Pay = rank salary + performance bonus (scaled by
// reputation) + a writing stipend. Memos accumulate in a "work file" so
// students build a body of writing. Authored milestone deals are promotion
// cases: ranks 2/4/6 stay locked until theirs is closed.

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useApp } from "@/contexts/AppContext"
import { useBankStore } from "@/stores/bankStore"
import {
  CAREERS, getCareer, dealMaxPoints, rankForXp,
  type Career, type CareerDeal,
} from "@/data/careers"
import {
  generateWeekDeal, momentForWeek, salaryForRank, repMultiplier,
  memoSpec, memoPay, wordCount, MEMO_MIN_WORDS, MEMO_XP,
} from "@/lib/careerSim"
import {
  ArrowLeft, ArrowRightLeft, Award, Briefcase, CalendarDays, CheckCircle2,
  ChevronDown, ChevronRight, Coins, FileSignature, FolderOpen, Gauge, Heart,
  PenLine, Star,
} from "lucide-react"
import { ACCENT, ACCENT_SOFT } from "./theme"
import VentureFund from "./VentureFund"

/* ══════════════════════════ Career picker ══════════════════════════ */

function CareerPicker({ onPick }: { onPick: (id: string) => void }) {
  const careerXp = useBankStore(s => s.careerXp)
  const careerWeek = useBankStore(s => s.careerWeek)
  return (
    <div className="space-y-5">
      <div className="text-center space-y-1.5">
        <h2 className="font-display text-2xl font-extrabold">Choose your career</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Take a real job in finance. Work deals week after week, write real memos, earn a salary, and climb six ranks to the top. Switch anytime - every career remembers your progress.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {CAREERS.map((career, i) => {
          const Icon = career.icon
          const xp = careerXp[career.id] ?? 0
          const week = careerWeek[career.id]
          return (
            <motion.button
              key={career.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onPick(career.id)}
              className="text-left group"
            >
              <div className="h-full rounded-2xl border border-border/60 bg-card shadow-card overflow-hidden transition-shadow group-hover:shadow-lg">
                <div className={`bg-gradient-to-br ${career.gradient} p-4 relative overflow-hidden`}>
                  <div className="absolute -right-4 -top-4 opacity-15">
                    <Icon className="h-24 w-24 text-white" />
                  </div>
                  <div className="relative flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-display font-extrabold text-white text-lg leading-tight">{career.name}</div>
                      <div className="text-[11px] text-white/75 font-semibold uppercase tracking-wider">
                        6 ranks · weekly {career.dealNoun.toLowerCase()}s
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-2.5">
                  <p className="text-sm text-muted-foreground leading-relaxed">{career.description}</p>
                  {week ? (
                    <Badge variant="secondary" className="gap-1 text-[11px]">
                      <CalendarDays className="h-3 w-3" /> Week {week} · {xp} Rep - continue
                    </Badge>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold" style={{ color: career.accent }}>
                      Start this career <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

/* ══════════════════════════ Deal player ══════════════════════════ */

interface PlayerProps {
  career: Career
  deal: CareerDeal
  week: number
  mode: "weekly" | "milestone"
  onExit: () => void
}

function DealPlayer({ career, deal, week, mode, onExit }: PlayerProps) {
  const { earnJeffs } = useApp()
  const recordDeal = useBankStore(s => s.recordDeal)
  const advanceWeek = useBankStore(s => s.advanceWeek)
  const addMemo = useBankStore(s => s.addMemo)
  const rep = useBankStore(s => s.careerRep[career.id] ?? 50)
  const xp = useBankStore(s => s.careerXp[career.id] ?? 0)
  const dealResults = useBankStore(s => s.dealResults)
  const prevBest = dealResults[deal.id]?.points ?? 0
  const { currentIdx } = rankForXp(career, xp, Object.keys(dealResults))

  const [stageIdx, setStageIdx] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [points, setPoints] = useState(0)
  const [phase, setPhase] = useState<"stages" | "memo" | "done">("stages")
  const [memoText, setMemoText] = useState("")
  const [payout, setPayout] = useState({ salary: 0, bonus: 0, stipend: 0, gained: 0 })

  const stage = deal.stages[stageIdx]
  // Every deal ends with the written deliverable, worth MEMO_XP on top of stage points.
  const maxPoints = dealMaxPoints(deal) + MEMO_XP
  const isLastStage = stageIdx === deal.stages.length - 1
  const memo = memoSpec(career.id)
  const words = wordCount(memoText)
  const memoOk = words >= MEMO_MIN_WORDS

  const choose = (i: number) => {
    if (picked !== null) return
    setPicked(i)
    setPoints(p => p + stage.choices[i].points)
  }

  const nextStage = () => {
    if (!isLastStage) {
      setStageIdx(i => i + 1)
      setPicked(null)
    } else {
      setPhase("memo")
    }
  }

  const submitMemo = () => {
    if (!memoOk) return
    const totalPoints = points + MEMO_XP
    addMemo({ careerId: career.id, week, dealTitle: deal.title, prompt: memo.prompt, text: memoText.trim() })

    if (mode === "weekly") {
      const salary = salaryForRank(currentIdx)
      const bonus = Math.round(deal.baseFee * (points / dealMaxPoints(deal)) * repMultiplier(rep))
      const stipend = memoPay(currentIdx)
      recordDeal(career.id, deal.id, totalPoints, salary + bonus + stipend)
      earnJeffs(salary + bonus + stipend, `${career.name} week ${week}: "${deal.title}"`)
      advanceWeek(career.id, points >= dealMaxPoints(deal) - 1 ? 2 : points <= 2 ? -2 : 0)
      setPayout({ salary, bonus, stipend, gained: totalPoints })
    } else {
      // Milestone promotion case: pays only for improvement, never advances the week.
      const gained = Math.max(0, totalPoints - prevBest)
      const bonus = Math.round(deal.baseFee * (gained / maxPoints))
      recordDeal(career.id, deal.id, totalPoints, bonus)
      if (bonus > 0) earnJeffs(bonus, `${career.name} promotion case: "${deal.title}"`)
      setPayout({ salary: 0, bonus, stipend: 0, gained })
    }
    setPhase("done")
  }

  /* ── payday: an actual pay stub ── */
  if (phase === "done") {
    const totalPoints = points + MEMO_XP
    const pct = totalPoints / maxPoints
    const grade = pct >= 0.9 ? "Outstanding" : pct >= 0.65 ? "Strong work" : pct >= 0.4 ? "Getting there" : "Rough one"
    const totalPay = payout.salary + payout.bonus + payout.stipend

    const StubRow = ({ label, value, gold }: { label: string; value: string; gold?: boolean }) => (
      <div className="flex items-baseline gap-2">
        <span className={cn("text-[11px] uppercase font-bold tracking-wide", gold ? "text-foreground" : "text-muted-foreground")}>{label}</span>
        <span className="flex-1 border-b border-dotted border-muted-foreground/40 translate-y-[-3px]" />
        <span className={cn("font-mono text-sm font-bold tabular-nums", gold && "text-base")} style={gold ? { color: ACCENT } : undefined}>{value}</span>
      </div>
    )

    return (
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
        <div className="rounded-2xl border-2 bg-card overflow-hidden shadow-card" style={{ borderColor: `rgba(var(--brand-rgb),0.333)` }}>
          {/* stub header */}
          <div className="px-5 py-4 text-center border-b border-dashed" style={{ borderColor: `rgba(var(--brand-rgb),0.267)` }}>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.28em]" style={{ color: ACCENT }}>
              InvestiBank · {mode === "weekly" ? "Payroll Dept." : "Promotions Board"}
            </p>
            <h3 className="font-display font-extrabold text-lg mt-1">{deal.title}</h3>
            <p className="text-xs text-muted-foreground">
              {grade} · {totalPoints}/{maxPoints} pts{mode === "weekly" && ` · Week ${week}`} · memo filed 📁
            </p>
          </div>

          {/* stub body */}
          <div className="p-5 space-y-2.5 relative">
            {mode === "weekly" ? (
              <>
                <StubRow label="Base salary" value={String(payout.salary)} />
                <StubRow label="Performance bonus" value={String(payout.bonus)} />
                <StubRow label="Writing stipend" value={String(payout.stipend)} />
                <div className="border-t pt-2.5 mt-1" style={{ borderColor: `rgba(var(--brand-rgb),0.2)` }}>
                  <StubRow label="Total paid" value={`${totalPay} coins`} gold />
                </div>
                <StubRow label="Rep earned" value={`+${payout.gained}`} />
              </>
            ) : payout.bonus > 0 ? (
              <>
                <StubRow label="Case fee" value={`${payout.bonus} coins`} gold />
                <StubRow label="Rep earned" value={`+${payout.gained}`} />
              </>
            ) : (
              <p className="text-xs text-muted-foreground text-center py-1">
                No new pay - beat your best ({prevBest}/{maxPoints}) to earn more.
              </p>
            )}

            {/* stamp */}
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 rotate-[-14deg] border-[3px] rounded-md px-2.5 py-0.5 font-display font-extrabold text-sm uppercase tracking-widest opacity-60 pointer-events-none"
              style={{ borderColor: mode === "weekly" ? "#34d399" : career.accent, color: mode === "weekly" ? "#34d399" : career.accent }}
            >
              {mode === "weekly" ? "Paid" : "Closed"}
            </div>
          </div>

          <div className="px-5 pb-5">
            <Button onClick={onExit} className="w-full press-scale" size="lg">
              {mode === "weekly" ? "Start next week" : "Back to your desk"}
            </Button>
          </div>
        </div>
      </motion.div>
    )
  }

  /* ── memo phase ── */
  if (phase === "memo") {
    return (
      <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} className="max-w-3xl mx-auto space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-muted-foreground">
            Final step · the write-up
          </span>
          <Badge variant="outline" className="gap-1 text-[10px]">
            <PenLine className="h-3 w-3" /> +{MEMO_XP} Rep · +{memoPay(currentIdx)} 🪙
          </Badge>
        </div>
        <Card variant="elevated" className="overflow-hidden">
          <div className={`bg-gradient-to-r ${career.gradient} px-5 py-3 flex items-center gap-2`}>
            <PenLine className="h-4 w-4 text-white/80" />
            <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-white/90">
              {memo.title} · {deal.title}
            </span>
          </div>
          <CardContent className="p-5 space-y-3">
            <p className="text-sm leading-relaxed text-foreground/90">{memo.prompt}</p>
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-muted-foreground">Your {memo.title.toLowerCase()}</label>
              <span className={cn("text-[11px] font-bold tabular-nums", memoOk ? "text-primary" : "text-muted-foreground")}>
                {words}/{MEMO_MIN_WORDS} words {memoOk && "✓"}
              </span>
            </div>
            <Textarea
              rows={7}
              value={memoText}
              onChange={e => setMemoText(e.target.value)}
              placeholder={`Think about the choices you just made in "${deal.title}" - what did you decide, and why was it right (or wrong)?`}
              className={cn("text-sm leading-relaxed", memoOk && "border-primary/50")}
            />
            <Button onClick={submitMemo} disabled={!memoOk} size="lg" className="w-full press-scale gap-1.5">
              <FileSignature className="h-4 w-4" />
              {memoOk ? (mode === "weekly" ? "File it & close out the week" : "File it & close the case") : `${MEMO_MIN_WORDS - words} more words…`}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  /* ── decision stages ── */
  return (
    <div className="max-w-3xl mx-auto space-y-3">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onExit} className="gap-1 -ml-2">
          <ArrowLeft className="h-4 w-4" /> Your desk
        </Button>
        <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-muted-foreground">
          Stage {stageIdx + 1} / {deal.stages.length} · then the write-up
        </span>
      </div>

      {/* stage rail (final slot = the memo) */}
      <div className="flex items-center gap-1.5">
        {deal.stages.map((_, i) => (
          <span
            key={i}
            className="h-1.5 flex-1 rounded-full bg-muted transition-colors"
            style={i < stageIdx || (i === stageIdx && picked !== null) ? { background: career.accent } : i === stageIdx ? { background: `${career.accent}66` } : undefined}
          />
        ))}
        <span className="h-1.5 w-8 rounded-full bg-muted flex items-center justify-center" title="The write-up">
          <PenLine className="h-3 w-3 -mt-2.5 text-muted-foreground" />
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={stageIdx}
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -28 }}
          transition={{ duration: 0.22 }}
        >
          <Card variant="elevated" className="overflow-hidden">
            <div className={`bg-gradient-to-r ${career.gradient} px-5 py-3 flex items-center gap-2`}>
              <FileSignature className="h-4 w-4 text-white/80" />
              <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-white/90 truncate">
                {deal.title} · {deal.client}
              </span>
            </div>
            <CardContent className="p-5 space-y-4">
              <p className="text-sm leading-relaxed text-foreground/90">{stage.situation}</p>
              <p className="font-display font-extrabold">{stage.question}</p>

              <div className="space-y-2">
                {stage.choices.map((choice, i) => {
                  const isPicked = picked === i
                  const revealed = picked !== null
                  return (
                    <motion.button
                      key={i}
                      whileTap={revealed ? undefined : { scale: 0.99 }}
                      onClick={() => choose(i)}
                      disabled={revealed}
                      className={cn(
                        "w-full text-left rounded-xl border-2 p-3.5 text-sm transition-all",
                        isPicked
                          ? choice.points === 2
                            ? "border-primary bg-primary/10"
                            : choice.points === 1
                              ? "border-amber-500 bg-amber-500/10"
                              : "border-red-500 bg-red-500/10"
                          : revealed
                            ? "border-border/60 opacity-45"
                            : "border-border/60 hover:bg-muted/60 hover:-translate-y-0.5 hover:shadow-sm"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-medium">{choice.text}</span>
                        {isPicked && (
                          <Badge
                            variant={choice.points === 2 ? "success" : choice.points === 1 ? "warning" : "destructive"}
                            className="shrink-0 text-[10px]"
                          >
                            {choice.points === 2 ? "Pro move" : choice.points === 1 ? "Okay" : "Rookie"} · +{choice.points}
                          </Badge>
                        )}
                      </div>
                      {isPicked && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-2 text-xs text-muted-foreground leading-relaxed"
                        >
                          {choice.feedback}
                        </motion.p>
                      )}
                    </motion.button>
                  )
                })}
              </div>

              {picked !== null && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <Button onClick={nextStage} className="w-full press-scale gap-1" size="lg">
                    {isLastStage ? "On to the write-up" : "Next"}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ══════════════════════════ Office moment ══════════════════════════ */

// Stable fallback - returning a fresh [] from a zustand selector causes an
// infinite re-render loop (new reference every snapshot).
const NO_WEEKS: number[] = []

function OfficeMomentCard({ career, week }: { career: Career; week: number }) {
  const momentsDone = useBankStore(s => s.momentsDone[career.id]) ?? NO_WEEKS
  const resolveMoment = useBankStore(s => s.resolveMoment)
  const [reaction, setReaction] = useState<{ text: string; rep: number } | null>(null)

  const moment = useMemo(() => momentForWeek(career.id, week), [career.id, week])
  if (!moment || (momentsDone.includes(week) && !reaction)) return null

  if (reaction) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card variant="elevated" className="border-dashed">
          <CardContent className="p-4 flex items-start gap-3">
            <span className="text-xl">{moment.emoji}</span>
            <div className="text-sm">
              <p className="text-foreground/90">{reaction.text}</p>
              <Badge variant={reaction.rep >= 0 ? "success" : "destructive"} className="mt-2 text-[10px]">
                Reputation {reaction.rep >= 0 ? "+" : ""}{reaction.rep}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card variant="elevated" className="border-dashed">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{moment.emoji}</span>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.16em]" style={{ color: career.accent }}>
              Office moment
            </span>
          </div>
          <p className="text-sm text-foreground/90">{moment.text}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {moment.options.map((opt, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                className="h-auto py-2 whitespace-normal press-scale"
                onClick={() => {
                  resolveMoment(career.id, week, opt.rep)
                  setReaction({ text: opt.reaction, rep: opt.rep })
                }}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

/* ══════════════════════════ Work file ══════════════════════════ */

const NO_MEMOS: never[] = []

function WorkFile({ career }: { career: Career }) {
  const allMemos = useBankStore(s => s.memos) ?? NO_MEMOS
  const memos = allMemos.filter(m => m.careerId === career.id)
  const [open, setOpen] = useState<number | null>(null)

  return (
    <Card variant="elevated">
      <CardContent className="p-4">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-muted-foreground mb-3 flex items-center gap-1.5">
          <FolderOpen className="h-3.5 w-3.5" /> Your work file
        </p>
        {memos.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            Every {memoSpec(career.id).title.toLowerCase()} you write gets filed here - your body of work on the {career.name} desk.
          </p>
        ) : (
          <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
            {memos.map((m, i) => (
              <button
                key={`${m.week}-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left rounded-lg border border-border/60 px-3 py-2 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold truncate">{m.dealTitle}</span>
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground shrink-0">
                    Wk {m.week} <ChevronDown className={cn("h-3 w-3 transition-transform", open === i && "rotate-180")} />
                  </span>
                </div>
                {open === i && (
                  <p className="text-xs text-muted-foreground mt-2 whitespace-pre-wrap leading-relaxed">{m.text}</p>
                )}
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

/* ══════════════════════════ Job desk ══════════════════════════ */

function JobDesk({ career, onSwitch }: { career: Career; onSwitch: () => void }) {
  const dealResults = useBankStore(s => s.dealResults)
  const xp = useBankStore(s => s.careerXp[career.id] ?? 0)
  const week = useBankStore(s => s.careerWeek[career.id] ?? 1)
  const rep = useBankStore(s => s.careerRep[career.id] ?? 50)
  const careerEarnings = useBankStore(s => s.careerEarnings)
  const [active, setActive] = useState<{ deal: CareerDeal; mode: "weekly" | "milestone" } | null>(null)

  const completedIds = Object.keys(dealResults)
  const { current, currentIdx, next, needsMilestone, nextMilestone } = rankForXp(career, xp, completedIds)
  const weekDeal = useMemo(() => generateWeekDeal(career.id, week, currentIdx), [career.id, week, currentIdx])
  const Icon = career.icon

  if (active) {
    return <DealPlayer career={career} deal={active.deal} week={week} mode={active.mode} onExit={() => setActive(null)} />
  }

  const xpProgress = next ? Math.min(100, ((xp - current.minXp) / (next.minXp - current.minXp)) * 100) : 100
  const weeksWorked = week - 1
  const salary = salaryForRank(currentIdx)

  // Light "employee ID badge" stat chip - deliberately not the dark HUD look.
  const BadgeChip = ({ icon: I, label, value, color }: { icon: typeof Star; label: string; value: string; color?: string }) => (
    <div className="rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-center min-w-[64px]">
      <p className="text-[9px] text-muted-foreground uppercase font-bold flex items-center gap-1 justify-center"><I className="h-3 w-3" />{label}</p>
      <p className="text-sm font-extrabold tabular-nums" style={color ? { color } : undefined}>{value}</p>
    </div>
  )

  return (
    <div className="space-y-4">
      {/* ── Executive ID badge ── */}
      <Card variant="elevated" className="overflow-hidden">
        {/* lanyard strip */}
        <div className={`h-2.5 bg-gradient-to-r ${career.gradient} relative`}>
          <div className="absolute left-1/2 -translate-x-1/2 top-1 h-1 w-10 rounded-full bg-black/20" />
        </div>
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3.5">
              <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${career.gradient} flex items-center justify-center shrink-0 shadow-md`}>
                <Icon className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
                  Floor 04 · {career.name}
                </p>
                <p className="font-display text-xl font-extrabold leading-tight flex items-center gap-1.5">
                  {current.title} <Award className="h-4 w-4" style={{ color: ACCENT }} />
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <BadgeChip icon={CalendarDays} label="Week" value={String(week)} />
              <BadgeChip icon={Heart} label="Rep" value={String(rep)} color={rep >= 60 ? "#10b981" : rep >= 40 ? "#d97706" : "#ef4444"} />
              <BadgeChip icon={Coins} label="Salary" value={`${salary}/wk`} />
              <BadgeChip icon={Star} label="Rep" value={String(xp)} />
              <Button variant="outline" size="sm" onClick={onSwitch} className="gap-1.5">
                <ArrowRightLeft className="h-3.5 w-3.5" /> Switch
              </Button>
            </div>
          </div>

          {/* promotion progress */}
          <div className="space-y-1 mt-4">
            <div className="flex justify-between text-[11px] font-semibold text-muted-foreground">
              <span>{current.title}</span>
              <span>
                {next
                  ? needsMilestone && xp >= next.minXp
                    ? `Close your promotion case to become ${next.title}!`
                    : `${Math.max(0, next.minXp - xp)} Rep to ${next.title}`
                  : "Top of the ladder 🏆"}
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${xpProgress}%`, background: `linear-gradient(90deg, ${career.accent}, ${ACCENT_SOFT})` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Two-column desk: work on the left, records on the right ── */}
      <div className="grid lg:grid-cols-[1fr_340px] gap-4 items-start">
        <div className="space-y-4">
          {/* promotion case callout */}
          {nextMilestone && needsMilestone && xp >= (next?.minXp ?? Infinity) - 6 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card variant="elevated" className="overflow-hidden border-2" style={{ borderColor: `${career.accent}88` }}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${career.gradient} flex items-center justify-center shrink-0`}>
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.16em]" style={{ color: career.accent }}>
                      Promotion case {xp >= (next?.minXp ?? 0) ? "- ready now!" : "- coming up"}
                    </p>
                    <p className="font-display font-extrabold text-sm">{nextMilestone.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{nextMilestone.tagline}</p>
                  </div>
                  <Button
                    size="sm"
                    className="shrink-0 press-scale"
                    disabled={xp < (next?.minXp ?? 0)}
                    onClick={() => setActive({ deal: nextMilestone, mode: "milestone" })}
                  >
                    {xp >= (next?.minXp ?? 0) ? "Take the case" : `${(next?.minXp ?? 0) - xp} Rep away`}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* this week's deal */}
          <div className="space-y-2">
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5" /> This week on your desk
            </h3>
            <Card variant="elevated" className="overflow-hidden">
              <div className={`h-1 bg-gradient-to-r ${career.gradient}`} />
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-display font-extrabold">{weekDeal.title}</span>
                      <Badge variant="outline" className="text-[10px]">{weekDeal.difficulty}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{weekDeal.tagline}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs font-semibold flex-wrap">
                      <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                        <Coins className="h-3.5 w-3.5" /> {salary} salary + up to {Math.round(weekDeal.baseFee * repMultiplier(rep))} bonus
                      </span>
                      <span className="flex items-center gap-1 text-sky-500">
                        <PenLine className="h-3.5 w-3.5" /> +{memoPay(currentIdx)} for the write-up
                      </span>
                      <span className="flex items-center gap-1 text-purple-500">
                        <Star className="h-3.5 w-3.5" /> up to {dealMaxPoints(weekDeal) + MEMO_XP} Rep
                      </span>
                    </div>
                  </div>
                  <Button size="lg" className="shrink-0 press-scale gap-1" onClick={() => setActive({ deal: weekDeal, mode: "weekly" })}>
                    Work it <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* office moment */}
          <OfficeMomentCard career={career} week={week} />

          {/* VC only: living portfolio + deal browser */}
          {career.id === "venture-capitalist" && <VentureFund career={career} week={week} />}

          {/* résumé strip */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Weeks worked", value: weeksWorked.toLocaleString(), icon: CalendarDays },
              { label: "Career earnings", value: careerEarnings.toLocaleString(), icon: Coins },
              { label: `${career.dealNoun}s closed`, value: completedIds.filter(id => id.startsWith("gen-") || career.deals.some(d => d.id === id)).length.toLocaleString(), icon: CheckCircle2 },
            ].map(({ label, value, icon: I }) => (
              <Card key={label} variant="elevated">
                <CardContent className="p-3 text-center">
                  <I className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="font-display font-extrabold text-sm">{value}</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wide">{label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ── sidebar: ladder + work file ── */}
        <div className="space-y-4">
          <Card variant="elevated">
            <CardContent className="p-4">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-muted-foreground mb-3 flex items-center gap-1.5">
                <Gauge className="h-3.5 w-3.5" /> The ladder
              </p>
              <div className="space-y-1.5">
                {career.ranks.map((r, i) => {
                  const reached = i <= currentIdx
                  const isCurrent = i === currentIdx
                  return (
                    <div
                      key={r.title}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-sm",
                        isCurrent && "bg-muted font-bold",
                        !reached && "text-muted-foreground/60"
                      )}
                    >
                      <span
                        className="h-2 w-2 rounded-full shrink-0"
                        style={{ background: reached ? career.accent : "hsl(var(--muted))" }}
                      />
                      <span className="flex-1">{r.title}</span>
                      {isCurrent && <Badge variant="secondary" className="text-[10px]">You</Badge>}
                      {!reached && <span className="text-[10px] font-semibold">{r.minXp} Rep{[1, 3, 5].includes(i) ? " + case" : ""}</span>}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <WorkFile career={career} />
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════ Public component ══════════════════════════ */

export default function CareersDesk() {
  const activeCareer = useBankStore(s => s.activeCareer)
  const chooseCareer = useBankStore(s => s.chooseCareer)
  const [picking, setPicking] = useState(false)

  const career = activeCareer ? getCareer(activeCareer) : undefined

  if (!career || picking) {
    return (
      <CareerPicker
        onPick={id => {
          chooseCareer(id)
          setPicking(false)
        }}
      />
    )
  }
  return <JobDesk career={career} onSwitch={() => setPicking(true)} />
}
