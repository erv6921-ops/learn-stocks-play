// The "deal page" an Investment Banker opens for any mandate or live deal. For
// a mandate: study it and PITCH to win the job (you advise, you don't buy). For
// a live engagement: work the current stage - a real execution decision that
// keeps the deal healthy and protects the client's price (and your fee). Close
// it to collect a success fee; botch it and the deal can break.

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import {
  DEAL_TYPES, mandateToEngagement, stageScenario, applyStage, stageCount,
  feeRate, successFee, wordCountOk, IB_PITCH_MIN_WORDS, IB_NOTE_MIN_WORDS,
  type Mandate, type Engagement, type StageResult,
} from "@/lib/dealPipeline"
import { wordCount } from "@/lib/careerSim"
import {
  ArrowLeft, Coins, PenLine, Trophy, Swords, Building2, Heart, LineChart,
  CheckCircle2, ChevronRight, MessageSquare, Layers,
} from "lucide-react"

function HealthBar({ health }: { health: number }) {
  const color = health >= 66 ? "#10b981" : health >= 33 ? "#d97706" : "#ef4444"
  return (
    <div className="h-2 rounded-full bg-muted overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: `${health}%`, background: color }} />
    </div>
  )
}

export default function DealDetail(props: {
  mode: "mandate" | "engagement"
  week: number
  accent: string
  onBack: () => void
  mandate?: Mandate
  onWin?: (e: Engagement, pitchText: string) => void
  engagement?: Engagement
  onWork?: (result: StageResult, writeUp: { headline: string; question: string; text: string }) => void
}) {
  const { mode, week, accent, onBack, mandate, onWin, engagement, onWork } = props
  const meta = DEAL_TYPES[(mode === "mandate" ? mandate! : engagement!).dealType]

  // pitch state
  const [pitchPick, setPitchPick] = useState<number | null>(null)
  const [pitchText, setPitchText] = useState("")
  const pitchOk = wordCountOk(pitchText, IB_PITCH_MIN_WORDS)
  const pitchWords = wordCount(pitchText)
  const pitchChoice = mode === "mandate" && pitchPick !== null ? mandate!.pitch.choices[pitchPick] : null
  const startHealth = pitchChoice ? (pitchChoice.points === 2 ? 90 : pitchChoice.points === 1 ? 72 : 0) : 0
  const lostPitch = pitchChoice?.points === 0

  const winIt = () => {
    if (!mandate || !onWin || !pitchChoice || pitchChoice.points === 0 || !pitchOk) return
    onWin(mandateToEngagement(mandate, week, startHealth), pitchText.trim())
  }

  // engagement stage state
  const canWork = mode === "engagement" && engagement!.status === "live" && engagement!.lastWorkedWeek < week
  const scenario = useMemo(
    () => (mode === "engagement" ? stageScenario(engagement!) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, engagement?.id, engagement?.stageIdx]
  )
  const [picked, setPicked] = useState<number | null>(null)
  const [preview, setPreview] = useState<StageResult | null>(null)
  const [applied, setApplied] = useState<StageResult | null>(null)
  const [note, setNote] = useState("")
  const noteOk = wordCountOk(note, IB_NOTE_MIN_WORDS)
  const noteWords = wordCount(note)

  const pickStage = (i: number) => {
    if (picked !== null || !scenario || !engagement) return
    setPicked(i)
    setPreview(applyStage(engagement, week, scenario, scenario.choices[i], i))
  }
  const work = () => {
    if (!preview || !onWork || !scenario || picked === null || !noteOk) return
    onWork(preview, { headline: scenario.headline, question: scenario.question, text: note.trim() })
    setApplied(preview)
  }

  const base = mode === "mandate" ? mandate! : engagement!

  return (
    <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
      <button onClick={onBack} className="flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground -ml-1">
        <ArrowLeft className="h-4 w-4" /> Back to {mode === "mandate" ? "mandates" : "pipeline"}
      </button>

      <Card variant="elevated" className="overflow-hidden">
        <div className="px-4 py-3 flex items-start justify-between gap-2" style={{ background: `${accent}12` }}>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-display text-lg font-extrabold">{base.project}</h3>
              <Badge variant="outline" className="text-[9px]">{meta.icon} {meta.label}</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 capitalize">Client: {base.client} · {base.sector}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-sm font-extrabold">{base.value.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground">deal size</p>
          </div>
        </div>

        <CardContent className="p-4 space-y-4">
          {/* ── MANDATE MODE: pitch to win ── */}
          {mode === "mandate" && (
            <>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
                  <p className="text-[9px] uppercase font-bold text-muted-foreground flex items-center gap-1"><Coins className="h-3 w-3" /> Potential fee</p>
                  <p className="text-sm font-extrabold tabular-nums mt-0.5" style={{ color: accent }}>~{successFee(base.value, 90).toLocaleString()}</p>
                  <p className="text-[9px] text-muted-foreground">{Math.round(feeRate(base.value) * 100)}% of {base.value.toLocaleString()}, if executed well</p>
                </div>
                <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
                  <p className="text-[9px] uppercase font-bold text-muted-foreground flex items-center gap-1"><Swords className="h-3 w-3" /> Competing banks</p>
                  <p className="text-xs font-bold mt-0.5">{mandate!.rivals.join(", ")}</p>
                </div>
              </div>

              <div className="rounded-xl border-2 p-3" style={{ borderColor: `${accent}55` }}>
                <p className="text-[10px] uppercase font-extrabold tracking-wide mb-1.5 flex items-center gap-1" style={{ color: accent }}><Trophy className="h-3.5 w-3.5" /> Win the mandate</p>
                <p className="text-xs text-foreground/85 leading-relaxed">{mandate!.pitch.situation}</p>
                <p className="text-xs font-display font-extrabold mt-2">{mandate!.pitch.question}</p>
                <div className="space-y-1.5 mt-2">
                  {mandate!.pitch.choices.map((ch, i) => {
                    const isPicked = pitchPick === i
                    const revealed = pitchPick !== null
                    return (
                      <button key={i} disabled={revealed} onClick={() => setPitchPick(i)} className={cn("w-full text-left rounded-lg border-2 p-2.5 text-xs transition-all", isPicked ? ch.points === 2 ? "border-primary bg-primary/10" : ch.points === 1 ? "border-amber-500 bg-amber-500/10" : "border-red-500 bg-red-500/10" : revealed ? "border-border/50 opacity-45" : "border-border/60 hover:bg-muted/60")}>
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-medium">{ch.text}</span>
                          {isPicked && <Badge variant={ch.points === 2 ? "success" : ch.points === 1 ? "warning" : "destructive"} className="shrink-0 text-[9px]">{ch.points === 2 ? "Pro" : ch.points === 1 ? "Okay" : "Rookie"}</Badge>}
                        </div>
                        <AnimatePresence>
                          {isPicked && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-1.5 text-[11px] text-muted-foreground leading-relaxed">{ch.feedback}</motion.p>}
                        </AnimatePresence>
                      </button>
                    )
                  })}
                </div>

                {pitchPick !== null && lostPitch && (
                  <div className="mt-3 rounded-lg bg-red-500/10 border border-red-500/40 px-3 py-2">
                    <p className="text-xs font-bold text-red-500">You lost this pitch to {mandate!.rivals[0]}.</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Mandates go to the most credible bank in the room. Try a different mandate this week.</p>
                    <Button size="sm" variant="outline" className="w-full mt-2" onClick={onBack}>Back to mandates</Button>
                  </div>
                )}

                {pitchPick !== null && !lostPitch && (
                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-foreground/90 flex items-center gap-1"><PenLine className="h-3.5 w-3.5" style={{ color: accent }} /> Your pitch to the board</label>
                      <span className={cn("text-[10px] font-bold tabular-nums", pitchOk ? "text-primary" : "text-muted-foreground")}>{pitchWords}/{IB_PITCH_MIN_WORDS} words {pitchOk && "✓"}</span>
                    </div>
                    <Textarea rows={3} value={pitchText} onChange={e => setPitchText(e.target.value)} placeholder={`Make your case to ${base.client}'s board: why you, and how you'll run this ${meta.label} deal.`} className={cn("text-xs leading-relaxed", pitchOk && "border-primary/50")} />
                    <Button size="lg" className="w-full press-scale gap-1.5" disabled={!pitchOk} onClick={winIt}>
                      <Trophy className="h-4 w-4" />
                      {pitchOk ? `Win it & kick off (health ${startHealth})` : `Write your pitch first (${IB_PITCH_MIN_WORDS - pitchWords} more words)`}
                    </Button>
                  </div>
                )}
              </div>
              <p className="text-[10px] text-muted-foreground text-center">Bankers advise for a fee - you never buy the company. Win the job, then execute it stage by stage.</p>
            </>
          )}

          {/* ── ENGAGEMENT MODE: work the stage ── */}
          {mode === "engagement" && engagement && (
            <>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div><p className="text-[10px] text-muted-foreground uppercase font-bold flex items-center gap-1 justify-center"><Layers className="h-3 w-3" />Stage</p><p className="text-sm font-extrabold">{Math.min(engagement.stageIdx + 1, stageCount())}/{stageCount()}</p></div>
                <div><p className="text-[10px] text-muted-foreground uppercase font-bold flex items-center gap-1 justify-center"><Heart className="h-3 w-3" />Health</p><p className="text-sm font-extrabold" style={{ color: engagement.health >= 66 ? "#10b981" : engagement.health >= 33 ? "#d97706" : "#ef4444" }}>{engagement.health}</p></div>
                <div><p className="text-[10px] text-muted-foreground uppercase font-bold flex items-center gap-1 justify-center"><LineChart className="h-3 w-3" />Value</p><p className="text-sm font-extrabold" style={{ color: engagement.value >= engagement.startValue ? "#10b981" : "#ef4444" }}>{engagement.value.toLocaleString()}</p></div>
              </div>
              <HealthBar health={engagement.health} />

              {/* stage rail */}
              <div className="flex items-center gap-1">
                {meta.stageTitles.map((t, i) => (
                  <div key={i} className="flex-1 text-center">
                    <div className="h-1.5 rounded-full mb-1" style={{ background: i < engagement.stageIdx ? "#10b981" : i === engagement.stageIdx ? accent : "hsl(var(--muted))" }} />
                    <p className={cn("text-[8px] leading-tight", i === engagement.stageIdx ? "font-bold text-foreground" : "text-muted-foreground")}>{t}</p>
                  </div>
                ))}
              </div>

              {engagement.events.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1.5">Deal log</p>
                  <div className="space-y-1 max-h-28 overflow-y-auto pr-1">
                    {[...engagement.events].reverse().map((e, i) => <p key={i} className="text-[11px] text-muted-foreground"><b className="text-foreground/70">Wk {e.week}:</b> {e.text}</p>)}
                  </div>
                </div>
              )}

              {/* current stage */}
              <div className="rounded-xl border-2 p-3" style={{ borderColor: `${accent}55` }}>
                <p className="text-[10px] uppercase font-extrabold tracking-wide mb-1.5 flex items-center gap-1" style={{ color: accent }}><MessageSquare className="h-3.5 w-3.5" /> {meta.stageTitles[Math.min(engagement.stageIdx, stageCount() - 1)]}</p>
                {applied ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                    <p className="text-xs text-foreground/90 leading-relaxed">{applied.outcome}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {applied.closedFee ? <Badge variant="success" className="text-[10px]">Fee +{applied.closedFee.toLocaleString()} 🪙</Badge> : null}
                      <Badge variant={applied.repDelta >= 0 ? "success" : "destructive"} className="text-[10px]">Reputation {applied.repDelta >= 0 ? "+" : ""}{applied.repDelta}</Badge>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-1" onClick={onBack}>{applied.closedFee || applied.broke ? "Back to pipeline" : "Back - continue next week"}</Button>
                  </motion.div>
                ) : !canWork ? (
                  <p className="text-xs text-muted-foreground">You already advanced {engagement.client}'s deal this week. Finish your weekly deal (advance a week) to work the next stage.</p>
                ) : scenario ? (
                  <div className="space-y-2.5">
                    <div>
                      <p className="text-xs font-bold" style={{ color: accent }}>{scenario.headline}</p>
                      <p className="text-xs text-foreground/85 leading-relaxed mt-0.5">{scenario.situation}</p>
                    </div>
                    <p className="text-xs font-display font-extrabold">{scenario.question}</p>
                    <div className="space-y-1.5">
                      {scenario.choices.map((ch, i) => {
                        const isPicked = picked === i
                        const revealed = picked !== null
                        return (
                          <button key={i} disabled={revealed} onClick={() => pickStage(i)} className={cn("w-full text-left rounded-lg border-2 p-2.5 text-xs transition-all", isPicked ? ch.points === 2 ? "border-primary bg-primary/10" : ch.points === 1 ? "border-amber-500 bg-amber-500/10" : "border-red-500 bg-red-500/10" : revealed ? "border-border/50 opacity-45" : "border-border/60 hover:bg-muted/60")}>
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-medium">{ch.text}</span>
                              {isPicked && <Badge variant={ch.points === 2 ? "success" : ch.points === 1 ? "warning" : "destructive"} className="shrink-0 text-[9px]">{ch.points === 2 ? "Pro" : ch.points === 1 ? "Okay" : "Rookie"}</Badge>}
                            </div>
                            <AnimatePresence>
                              {isPicked && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-1.5 text-[11px] text-muted-foreground leading-relaxed">{ch.feedback}</motion.p>}
                            </AnimatePresence>
                          </button>
                        )
                      })}
                    </div>
                    {picked !== null && (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-bold text-foreground/90 flex items-center gap-1"><PenLine className="h-3.5 w-3.5" style={{ color: accent }} /> Note it in your deal memo</label>
                          <span className={cn("text-[10px] font-bold tabular-nums", noteOk ? "text-primary" : "text-muted-foreground")}>{noteWords}/{IB_NOTE_MIN_WORDS} words {noteOk && "✓"}</span>
                        </div>
                        <Textarea rows={3} value={note} onChange={e => setNote(e.target.value)} placeholder={`Record the call for the file: what you advised ${engagement.client} at this stage and why.`} className={cn("text-xs leading-relaxed", noteOk && "border-primary/50")} />
                        <Button size="sm" className="w-full press-scale" disabled={!noteOk} onClick={work}>{noteOk ? "Make the call" : `Write your reasoning (${IB_NOTE_MIN_WORDS - noteWords} more words)`}</Button>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
