// The "client page" a Wealth Manager opens for any household - who they are,
// what they're saving for, how much risk they can stomach - and the tools to
// serve them: build a suitable stock/bond/cash mix and sign them, then run the
// weekly review where the market moves their money and you coach them through
// storms, greed and life events. Trust and AUM are the score.

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import {
  ALLOC_PRESETS, scoreAllocation, householdFromProspect, regimeForWeek,
  generateReviewScenario, applyReview, portfolioReturn, totalReturnPct,
  wordCountOk, WM_PLAN_MIN_WORDS, WM_NOTE_MIN_WORDS,
  type ProspectClient, type ClientHousehold, type AllocPreset, type ReviewResult,
} from "@/lib/wealthBook"
import { wordCount } from "@/lib/careerSim"
import {
  ArrowLeft, Coins, Target, HeartHandshake, PenLine, Quote, MessageSquare,
  PieChart, TrendingUp, TrendingDown, CalendarClock, Briefcase, Gauge,
} from "lucide-react"

const RISK_LABEL = { cautious: "Cautious", balanced: "Balanced", bold: "Bold" } as const
const STATUS_META = {
  happy: { label: "Happy", color: "#10b981" },
  content: { label: "Content", color: "#d97706" },
  worried: { label: "Worried", color: "#ef4444" },
} as const

function AllocBar({ alloc }: { alloc: { stocks: number; bonds: number; cash: number } }) {
  return (
    <div className="flex h-2.5 w-full overflow-hidden rounded-full">
      <div style={{ width: `${alloc.stocks}%`, background: "#6366f1" }} title={`Stocks ${alloc.stocks}%`} />
      <div style={{ width: `${alloc.bonds}%`, background: "#f59e0b" }} title={`Bonds ${alloc.bonds}%`} />
      <div style={{ width: `${alloc.cash}%`, background: "#94a3b8" }} title={`Cash ${alloc.cash}%`} />
    </div>
  )
}

function Sparkline({ history, accent }: { history: { week: number; assets: number }[]; accent: string }) {
  if (history.length < 2) return null
  const vals = history.map(h => h.assets)
  const min = Math.min(...vals), max = Math.max(...vals)
  const span = max - min || 1
  return (
    <div className="flex items-end gap-1 h-12">
      {history.map((h, i) => (
        <div key={i} className="flex-1 rounded-t" style={{ height: `${20 + ((h.assets - min) / span) * 80}%`, background: i === history.length - 1 ? accent : `${accent}66` }} title={`Week ${h.week}: ${h.assets.toLocaleString()}`} />
      ))}
    </div>
  )
}

export default function ClientDetail(props: {
  mode: "prospect" | "client"
  week: number
  accent: string
  onBack: () => void
  prospect?: ProspectClient
  signed?: boolean
  onSign?: (p: ProspectClient, alloc: AllocPreset["alloc"], plan: string) => void
  client?: ClientHousehold
  onReview?: (result: ReviewResult, writeUp: { headline: string; question: string; text: string }) => void
}) {
  const { mode, week, accent, onBack, prospect, signed, onSign, client, onReview } = props
  const base = mode === "prospect" ? prospect! : client!

  // prospect state
  const [presetId, setPresetId] = useState<string>("balanced")
  const preset = ALLOC_PRESETS.find(p => p.id === presetId) ?? ALLOC_PRESETS[2]
  const suit = mode === "prospect" ? scoreAllocation(prospect!, preset.alloc) : null
  const [plan, setPlan] = useState("")
  const planOk = wordCountOk(plan, WM_PLAN_MIN_WORDS)
  const planWords = wordCount(plan)

  // client review state
  const regime = useMemo(() => regimeForWeek(week), [week])
  const canReview = mode === "client" && client!.lastReviewWeek < week
  const scenario = useMemo(
    () => (canReview ? generateReviewScenario(client!, week, regime) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, client?.id, week, client?.lastReviewWeek]
  )
  const [picked, setPicked] = useState<number | null>(null)
  const [preview, setPreview] = useState<ReviewResult | null>(null)
  const [applied, setApplied] = useState<ReviewResult | null>(null)
  const [note, setNote] = useState("")
  const noteOk = wordCountOk(note, WM_NOTE_MIN_WORDS)
  const noteWords = wordCount(note)

  const pickChoice = (i: number) => {
    if (picked !== null || !scenario || !client) return
    setPicked(i)
    setPreview(applyReview(client, week, regime, scenario.choices[i], i))
  }
  const apply = () => {
    if (!preview || !onReview || !scenario || picked === null || !noteOk) return
    onReview(preview, { headline: scenario.headline, question: scenario.question, text: note.trim() })
    setApplied(preview)
  }

  return (
    <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
      <button onClick={onBack} className="flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground -ml-1">
        <ArrowLeft className="h-4 w-4" /> Back to {mode === "prospect" ? "prospects" : "your book"}
      </button>

      <Card variant="elevated" className="overflow-hidden">
        <div className="px-4 py-3 flex items-start justify-between gap-2" style={{ background: `${accent}12` }}>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-display text-lg font-extrabold">{base.name}</h3>
              <Badge variant="outline" className="text-[9px]">{RISK_LABEL[base.risk]}</Badge>
              {mode === "client" && <Badge className="text-[9px]" style={{ background: STATUS_META[client!.status].color }}>{STATUS_META[client!.status].label}</Badge>}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{base.age} · {base.job}</p>
          </div>
          {mode === "client" && (
            <div className="text-right shrink-0">
              <p className="text-sm font-extrabold" style={{ color: totalReturnPct(client!) >= 0 ? "#10b981" : "#ef4444" }}>{client!.assets.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground">under mgmt</p>
            </div>
          )}
        </div>

        <CardContent className="p-4 space-y-4">
          {/* goal + temperament */}
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-lg leading-none">{base.goal.icon}</span>
              <div>
                <p className="text-[10px] uppercase font-bold text-muted-foreground">The goal</p>
                <p className="text-sm font-semibold">Wants to {base.goal.label}</p>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1"><CalendarClock className="h-3 w-3" /> about {base.goal.horizon} year{base.goal.horizon === 1 ? "" : "s"} away</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <HeartHandshake className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-[10px] uppercase font-bold text-muted-foreground">Temperament</p>
                <p className="text-xs text-foreground/85">{mode === "prospect" ? prospect!.note : `${RISK_LABEL[base.risk]} investor.`}</p>
              </div>
            </div>
          </div>

          {/* ── PROSPECT MODE: build the plan & sign ── */}
          {mode === "prospect" && suit && (
            <div className="pt-1 border-t border-border/50 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> Brings <b className="text-foreground">{prospect!.assets.toLocaleString()}</b> coins to manage</span>
                <span className="text-muted-foreground">Fee ≈ 1%/yr of what you grow</span>
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1.5 flex items-center gap-1"><PieChart className="h-3 w-3" /> Choose their mix</p>
                <div className="space-y-1.5">
                  {ALLOC_PRESETS.map(pr => {
                    const active = pr.id === presetId
                    return (
                      <button key={pr.id} onClick={() => setPresetId(pr.id)} className={cn("w-full text-left rounded-lg border-2 p-2.5 transition-all", active ? "" : "border-border/60 hover:bg-muted/50")} style={active ? { borderColor: accent, background: `${accent}10` } : undefined}>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-extrabold">{pr.label}</span>
                          <span className="text-[10px] text-muted-foreground">{pr.alloc.stocks}/{pr.alloc.bonds}/{pr.alloc.cash}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{pr.blurb}</p>
                        {active && <div className="mt-1.5"><AllocBar alloc={pr.alloc} /></div>}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* live suitability read */}
              <div className="rounded-lg border-2 p-2.5" style={{ borderColor: suit.score === 2 ? "#10b98188" : suit.score === 1 ? "#f59e0b88" : "#ef444488" }}>
                <p className="text-[10px] uppercase font-extrabold flex items-center gap-1" style={{ color: suit.score === 2 ? "#10b981" : suit.score === 1 ? "#d97706" : "#ef4444" }}>
                  <Gauge className="h-3 w-3" /> Suitability: {suit.score === 2 ? "Great fit" : suit.score === 1 ? "Workable" : "Poor fit"}
                </p>
                <p className="text-[11px] text-foreground/85 mt-1 leading-relaxed">{suit.feedback}</p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-foreground/90 flex items-center gap-1"><PenLine className="h-3.5 w-3.5" style={{ color: accent }} /> Your plan for {prospect!.name.split(" ")[0]}</label>
                  <span className={cn("text-[10px] font-bold tabular-nums", planOk ? "text-primary" : "text-muted-foreground")}>{planWords}/{WM_PLAN_MIN_WORDS} words {planOk && "✓"}</span>
                </div>
                <Textarea rows={3} value={plan} onChange={e => setPlan(e.target.value)} placeholder={`Explain to ${prospect!.name.split(" ")[0]} why this mix fits their ${prospect!.goal.horizon}-year goal and their nerves - in plain words they'd understand.`} className={cn("text-xs leading-relaxed", planOk && "border-primary/50")} />
              </div>

              <Button size="lg" className="w-full press-scale gap-1.5" disabled={signed || !planOk} onClick={() => onSign?.(prospect!, preset.alloc, plan.trim())}>
                <HeartHandshake className="h-4 w-4" />
                {signed ? "Already a client ✓" : planOk ? `Sign ${prospect!.name.split(" ")[0]} with the ${preset.label} mix` : `Write their plan first (${WM_PLAN_MIN_WORDS - planWords} more words)`}
              </Button>
              <p className="text-[10px] text-muted-foreground text-center">Signing is free - you earn by growing and keeping their trust, review after review.</p>
            </div>
          )}

          {/* ── CLIENT MODE: status, history, weekly review ── */}
          {mode === "client" && client && (
            <>
              <div className="pt-1 border-t border-border/50 grid grid-cols-3 gap-2 text-center">
                <div><p className="text-[10px] text-muted-foreground uppercase font-bold">Return</p><p className="text-sm font-extrabold" style={{ color: totalReturnPct(client) >= 0 ? "#10b981" : "#ef4444" }}>{totalReturnPct(client) >= 0 ? "+" : ""}{totalReturnPct(client)}%</p></div>
                <div><p className="text-[10px] text-muted-foreground uppercase font-bold">Trust</p><p className="text-sm font-extrabold" style={{ color: STATUS_META[client.status].color }}>{client.satisfaction}</p></div>
                <div><p className="text-[10px] text-muted-foreground uppercase font-bold">Since</p><p className="text-sm font-extrabold">Wk {client.signedWeek}</p></div>
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1 flex items-center gap-1"><PieChart className="h-3 w-3" /> Their mix · {client.alloc.stocks}/{client.alloc.bonds}/{client.alloc.cash}</p>
                <AllocBar alloc={client.alloc} />
              </div>

              {client.plan && (
                <div className="rounded-lg bg-muted/40 px-3 py-2">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground mb-0.5 flex items-center gap-1"><Quote className="h-3 w-3" /> Your plan</p>
                  <p className="text-xs text-foreground/85 leading-relaxed italic">{client.plan}</p>
                </div>
              )}

              {client.assetHistory.length >= 2 && (
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1.5">Assets over time</p>
                  <Sparkline history={client.assetHistory} accent={accent} />
                </div>
              )}

              {client.events.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1.5">Client log</p>
                  <div className="space-y-1 max-h-28 overflow-y-auto pr-1">
                    {[...client.events].reverse().map((e, i) => <p key={i} className="text-[11px] text-muted-foreground"><b className="text-foreground/70">Wk {e.week}:</b> {e.text}</p>)}
                  </div>
                </div>
              )}

              {/* weekly review */}
              <div className="rounded-xl border-2 p-3" style={{ borderColor: `${accent}55` }}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[10px] uppercase font-extrabold tracking-wide flex items-center gap-1" style={{ color: accent }}><MessageSquare className="h-3.5 w-3.5" /> This week's review</p>
                  <Badge variant="outline" className="text-[9px]">{regime.emoji} {regime.label} · stocks {regime.stocks >= 0 ? "+" : ""}{Math.round(regime.stocks * 100)}%</Badge>
                </div>

                {applied ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                    <p className="text-xs text-foreground/90 leading-relaxed">{applied.outcome}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="success" className="text-[10px]">Fee +{applied.fee.toLocaleString()} 🪙</Badge>
                      <Badge variant={applied.repDelta >= 0 ? "success" : "destructive"} className="text-[10px]">Reputation {applied.repDelta >= 0 ? "+" : ""}{applied.repDelta}</Badge>
                    </div>
                    {!applied.left && <p className="text-[10px] text-muted-foreground pt-1">Check back next week - the market never stops moving.</p>}
                  </motion.div>
                ) : !canReview ? (
                  <p className="text-xs text-muted-foreground">You already reviewed {client.name.split(" ")[0]} this week. Finish your weekly deal (advance a week) for the next review.</p>
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
                          <button key={i} disabled={revealed} onClick={() => pickChoice(i)} className={cn("w-full text-left rounded-lg border-2 p-2.5 text-xs transition-all", isPicked ? ch.points === 2 ? "border-primary bg-primary/10" : ch.points === 1 ? "border-amber-500 bg-amber-500/10" : "border-red-500 bg-red-500/10" : revealed ? "border-border/50 opacity-45" : "border-border/60 hover:bg-muted/60")}>
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
                          <label className="text-[11px] font-bold text-foreground/90 flex items-center gap-1"><PenLine className="h-3.5 w-3.5" style={{ color: accent }} /> Note it in your client letter</label>
                          <span className={cn("text-[10px] font-bold tabular-nums", noteOk ? "text-primary" : "text-muted-foreground")}>{noteWords}/{WM_NOTE_MIN_WORDS} words {noteOk && "✓"}</span>
                        </div>
                        <Textarea rows={3} value={note} onChange={e => setNote(e.target.value)} placeholder={`Write what you told ${client.name.split(" ")[0]} and why it protects their goal.`} className={cn("text-xs leading-relaxed", noteOk && "border-primary/50")} />
                        <Button size="sm" className="w-full press-scale" disabled={!noteOk} onClick={apply}>{noteOk ? "Give this advice & bill the fee" : `Write your reasoning (${WM_NOTE_MIN_WORDS - noteWords} more words)`}</Button>
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
