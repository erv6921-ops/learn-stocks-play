// The "business page" a PE student opens for any company - everything you'd
// study before buying it (product, profit, margins, the flaw you'd fix, risks)
// and, once you own it, the tools to run it: structure the debt, work the
// weekly value-creation playbook, watch profit and the loan move, and exit for
// a MOIC. This is where leverage, EBITDA growth and debt paydown come alive.

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import {
  leveragePlans, structureDeal, generateOpScenario, applyOpChoice,
  exitRoutes, computeExit, buyoutEV, equityValue, buyoutMOIC, annualInterest,
  wordCountOk, PE_THESIS_MIN_WORDS, PE_MEMO_MIN_WORDS,
  type BuyoutTarget, type PortfolioBuyout, type LeveragePlan, type OpResult, type ExitRoute,
} from "@/lib/peFund"
import { wordCount } from "@/lib/careerSim"
import {
  ArrowLeft, Coins, Users, TrendingUp, TrendingDown, Package, AlertTriangle,
  MessageSquare, LogOut, Building2, PenLine, Quote, Landmark, Wallet, Gauge,
  Layers, Percent,
} from "lucide-react"

const SIGNAL_VARIANT = { Strong: "success", Fair: "warning", Risky: "destructive" } as const
const STATUS_META = {
  thriving: { label: "Thriving", color: "#10b981" },
  steady: { label: "Steady", color: "#d97706" },
  distressed: { label: "Distressed", color: "#ef4444" },
} as const

function Metric({ icon: I, label, value, tone }: { icon: typeof Users; label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
      <p className="text-[9px] uppercase font-bold text-muted-foreground flex items-center gap-1"><I className="h-3 w-3" />{label}</p>
      <p className="text-sm font-extrabold tabular-nums mt-0.5" style={tone ? { color: tone } : undefined}>{value}</p>
    </div>
  )
}

function Bars({ history, accent, format }: { history: { week: number; ebitda: number }[]; accent: string; format: (n: number) => string }) {
  if (history.length < 2) return null
  const vals = history.map(h => h.ebitda)
  const min = Math.min(...vals), max = Math.max(...vals)
  const span = max - min || 1
  return (
    <div className="flex items-end gap-1 h-12">
      {history.map((h, i) => (
        <div key={i} className="flex-1 rounded-t" style={{ height: `${20 + ((h.ebitda - min) / span) * 80}%`, background: i === history.length - 1 ? accent : `${accent}66` }} title={`Week ${h.week}: ${format(h.ebitda)}`} />
      ))}
    </div>
  )
}

export default function BuyoutDetail(props: {
  mode: "buy" | "holding"
  week: number
  accent: string
  onBack: () => void
  target?: BuyoutTarget
  owned?: boolean
  balance?: number
  onBuy?: (t: BuyoutTarget, plan: LeveragePlan, thesis: string) => void
  holding?: PortfolioBuyout
  onRun?: (patch: Partial<PortfolioBuyout>, repDelta: number, writeUp: { headline: string; question: string; text: string }) => void
  onExit?: (c: PortfolioBuyout, route: ExitRoute, payout: number) => void
}) {
  const { mode, week, accent, onBack, target, owned, balance = 0, onBuy, holding, onRun, onExit } = props
  const base = mode === "buy" ? target! : holding!
  const profile = base.profile
  const p = profile

  // buy-mode state
  const plans = useMemo(() => (mode === "buy" ? leveragePlans(target!) : []), [mode, target])
  const [planId, setPlanId] = useState<LeveragePlan["id"]>("balanced")
  const plan = plans.find(pl => pl.id === planId) ?? plans[0]
  const struct = mode === "buy" && plan ? structureDeal(target!, plan) : null
  const [thesis, setThesis] = useState("")
  const thesisWords = wordCount(thesis)
  const thesisOk = wordCountOk(thesis, PE_THESIS_MIN_WORDS)
  const afford = struct ? balance >= struct.equityIn : false

  // holding-mode state
  const canRun = mode === "holding" && holding!.lastRunWeek < week
  const scenario = useMemo(
    () => (canRun ? generateOpScenario(holding!, week) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, holding?.id, week, holding?.lastRunWeek]
  )
  const [picked, setPicked] = useState<number | null>(null)
  const [preview, setPreview] = useState<OpResult | null>(null)
  const [applied, setApplied] = useState<OpResult | null>(null)
  const [note, setNote] = useState("")
  const noteOk = wordCountOk(note, PE_MEMO_MIN_WORDS)
  const noteWords = wordCount(note)
  const [exiting, setExiting] = useState(false)

  const pickChoice = (i: number) => {
    if (picked !== null || !scenario || !holding) return
    setPicked(i)
    setPreview(applyOpChoice(holding, week, scenario, scenario.choices[i], i))
  }
  const apply = () => {
    if (!preview || !onRun || !scenario || picked === null || !noteOk) return
    onRun(preview.patch, preview.repDelta, { headline: scenario.headline, question: scenario.question, text: note.trim() })
    setApplied(preview)
  }

  const ev = mode === "holding" ? buyoutEV(holding!) : target!.price
  const eq = mode === "holding" ? equityValue(holding!) : 0
  const moic = mode === "holding" ? buyoutMOIC(holding!) : 1
  const routes = mode === "holding" ? exitRoutes(holding!, week) : []

  return (
    <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
      <button onClick={onBack} className="flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground -ml-1">
        <ArrowLeft className="h-4 w-4" /> Back to {mode === "buy" ? "the market" : "your fund"}
      </button>

      <Card variant="elevated" className="overflow-hidden">
        <div className="px-4 py-3 flex items-start justify-between gap-2" style={{ background: `${accent}12` }}>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-display text-lg font-extrabold">{base.name}</h3>
              <Badge variant="outline" className="text-[9px] capitalize">{base.sector}</Badge>
              {mode === "buy" && <Badge variant={SIGNAL_VARIANT[target!.signal]} className="text-[9px]">{target!.signal}</Badge>}
              {mode === "holding" && <Badge className="text-[9px]" style={{ background: STATUS_META[holding!.status].color }}>{STATUS_META[holding!.status].label}</Badge>}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{mode === "buy" ? `Owner: ${base.owner} · wants to retire` : `You own 100% · bought week ${holding!.investedWeek}`}</p>
          </div>
          {mode === "holding" && (
            <div className="text-right shrink-0">
              <p className="text-sm font-extrabold" style={{ color: moic >= 1 ? "#10b981" : "#ef4444" }}>{moic}×</p>
              <p className="text-[10px] text-muted-foreground">MOIC</p>
            </div>
          )}
        </div>

        <CardContent className="p-4 space-y-4">
          {/* what it does */}
          <div className="flex items-start gap-2">
            <Package className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
            <div>
              <p className="text-[10px] uppercase font-bold text-muted-foreground">The business</p>
              <p className="text-sm text-foreground/90">It {p.product}.</p>
            </div>
          </div>

          {/* numbers */}
          <div>
            <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1.5">The numbers</p>
            <div className="grid grid-cols-3 gap-2">
              <Metric icon={Coins} label="Profit/yr" value={p.ebitda.toLocaleString()} />
              <Metric icon={Wallet} label="Sales/yr" value={p.revenue.toLocaleString()} />
              <Metric icon={Percent} label="Margin" value={`${p.marginPct}%`} />
              <Metric icon={Users} label="Staff" value={p.employees.toLocaleString()} />
              <Metric icon={p.growthPct >= 0 ? TrendingUp : TrendingDown} label="Growth" value={`${p.growthPct >= 0 ? "+" : ""}${p.growthPct}%`} tone={p.growthPct >= 6 ? "#10b981" : p.growthPct < 0 ? "#ef4444" : undefined} />
              <Metric icon={Gauge} label={mode === "buy" ? "Price" : "Value now"} value={mode === "buy" ? `${target!.price.toLocaleString()}` : `${ev.toLocaleString()}`} />
            </div>
            {mode === "buy" && (
              <p className="text-[10px] text-muted-foreground mt-1.5">Priced at {target!.entryMultiple}× profit ({p.ebitda.toLocaleString()} × {target!.entryMultiple} = {target!.price.toLocaleString()} coins).</p>
            )}
          </div>

          {/* the flaw = the thesis */}
          <div className="rounded-lg border border-dashed px-3 py-2" style={{ borderColor: `${accent}66` }}>
            <p className="text-[10px] uppercase font-bold mb-0.5 flex items-center gap-1" style={{ color: accent }}><Layers className="h-3 w-3" /> The opportunity</p>
            <p className="text-xs text-foreground/85">Right now, {p.flaw}. Fix that and the profit grows - that's your value-creation plan.</p>
          </div>

          {/* risks */}
          <div>
            <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1.5 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Watch out for</p>
            <ul className="space-y-1">
              {p.risks.map((rk, i) => <li key={i} className="text-xs text-foreground/80 flex gap-1.5"><span style={{ color: accent }}>•</span>{rk}</li>)}
            </ul>
          </div>

          {/* ── BUY MODE: structure the deal ── */}
          {mode === "buy" && struct && (
            <div className="pt-1 border-t border-border/50 space-y-3">
              <div>
                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1.5 flex items-center gap-1"><Landmark className="h-3 w-3" /> Structure the buyout</p>
                <p className="text-[11px] text-muted-foreground mb-2">Choose how much to borrow. More debt means a smaller check from you (bigger MOIC if it works) - but the loan must be paid whether the business has a good year or not.</p>
                <div className="space-y-1.5">
                  {plans.map(pl => {
                    const s = structureDeal(target!, pl)
                    const active = pl.id === planId
                    return (
                      <button key={pl.id} onClick={() => setPlanId(pl.id)} className={cn("w-full text-left rounded-lg border-2 p-2.5 transition-all", active ? "" : "border-border/60 hover:bg-muted/50")} style={active ? { borderColor: accent, background: `${accent}10` } : undefined}>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-extrabold">{pl.label}</span>
                          <span className="text-[10px] text-muted-foreground">{pl.debtMultiple}× debt</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{pl.blurb}</p>
                        <div className="flex items-center gap-3 mt-1.5 text-[10px] font-bold">
                          <span className="text-muted-foreground">Debt: <span className="text-foreground">{s.debt.toLocaleString()}</span></span>
                          <span style={{ color: accent }}>Your check: {s.equityIn.toLocaleString()}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {!owned && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-foreground/90 flex items-center gap-1"><PenLine className="h-3.5 w-3.5" style={{ color: accent }} /> Your investment thesis</label>
                    <span className={cn("text-[10px] font-bold tabular-nums", thesisOk ? "text-primary" : "text-muted-foreground")}>{thesisWords}/{PE_THESIS_MIN_WORDS} words {thesisOk && "✓"}</span>
                  </div>
                  <Textarea rows={3} value={thesis} onChange={e => setThesis(e.target.value)} placeholder={`Why buy ${base.name}? What's the flaw you'll fix, how will you grow the profit, and how will you exit?`} className={cn("text-xs leading-relaxed", thesisOk && "border-primary/50")} />
                </div>
              )}

              <Button size="lg" className="w-full press-scale gap-1.5" disabled={owned || !afford || !thesisOk} onClick={() => onBuy?.(target!, plan, thesis.trim())}>
                <Coins className="h-4 w-4" />
                {owned ? "Already owned ✓" : !afford ? `Need ${struct.equityIn.toLocaleString()} coins` : thesisOk ? `Buy for ${struct.equityIn.toLocaleString()} coins (equity)` : `Write your thesis first (${PE_THESIS_MIN_WORDS - thesisWords} more)`}
              </Button>
              <p className="text-[10px] text-muted-foreground text-center">You pay the equity check; the {struct.debt.toLocaleString()}-coin loan rides on the company. Pay it down and it becomes your gain.</p>
            </div>
          )}

          {/* ── HOLDING MODE: stake, capital stack, playbook, exit ── */}
          {mode === "holding" && holding && (
            <>
              <div className="pt-1 border-t border-border/50">
                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1.5">Your capital stack</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div><p className="text-[10px] text-muted-foreground uppercase font-bold">Equity in</p><p className="text-sm font-extrabold">{holding.equityIn.toLocaleString()}</p></div>
                  <div><p className="text-[10px] text-muted-foreground uppercase font-bold">Debt left</p><p className="text-sm font-extrabold" style={{ color: annualInterest(holding.debt) > holding.ebitda ? "#ef4444" : undefined }}>{holding.debt.toLocaleString()}</p></div>
                  <div><p className="text-[10px] text-muted-foreground uppercase font-bold">Equity worth</p><p className="text-sm font-extrabold" style={{ color: eq >= holding.equityIn ? "#10b981" : "#ef4444" }}>{eq.toLocaleString()}</p></div>
                </div>
                <p className="text-[10px] text-muted-foreground text-center mt-1.5">Business value {ev.toLocaleString()} ({holding.ebitda.toLocaleString()} profit × {holding.currentMultiple.toFixed(1)}×) − {holding.debt.toLocaleString()} debt = {eq.toLocaleString()} equity. Interest ~{annualInterest(holding.debt).toLocaleString()}/yr.{holding.boltOns > 0 ? ` · ${holding.boltOns} bolt-on${holding.boltOns > 1 ? "s" : ""}` : ""}</p>
              </div>

              {holding.thesis && (
                <div className="rounded-lg bg-muted/40 px-3 py-2">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground mb-0.5 flex items-center gap-1"><Quote className="h-3 w-3" /> Your thesis</p>
                  <p className="text-xs text-foreground/85 leading-relaxed italic">{holding.thesis}</p>
                </div>
              )}

              {holding.ebitdaHistory.length >= 2 && (
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1.5">Profit over time</p>
                  <Bars history={holding.ebitdaHistory} accent={accent} format={n => n.toLocaleString()} />
                </div>
              )}

              {holding.events.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1.5">Deal log</p>
                  <div className="space-y-1 max-h-28 overflow-y-auto pr-1">
                    {[...holding.events].reverse().map((e, i) => <p key={i} className="text-[11px] text-muted-foreground"><b className="text-foreground/70">Wk {e.week}:</b> {e.text}</p>)}
                  </div>
                </div>
              )}

              {/* weekly playbook */}
              {!exiting && (
                <div className="rounded-xl border-2 p-3" style={{ borderColor: `${accent}55` }}>
                  <p className="text-[10px] uppercase font-extrabold tracking-wide mb-1.5 flex items-center gap-1" style={{ color: accent }}><MessageSquare className="h-3.5 w-3.5" /> Run the playbook</p>
                  {applied ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                      <p className="text-xs text-foreground/90 leading-relaxed">{applied.outcome}</p>
                      <Badge variant={applied.repDelta >= 0 ? "success" : "destructive"} className="text-[10px]">Reputation {applied.repDelta >= 0 ? "+" : ""}{applied.repDelta}</Badge>
                      <p className="text-[10px] text-muted-foreground pt-1">Come back next week for the next move - or exit below when the return looks great.</p>
                    </motion.div>
                  ) : !canRun ? (
                    <p className="text-xs text-muted-foreground">You already worked {holding.name} this week. Finish your weekly deal (advance a week) to run the next play.</p>
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
                            <label className="text-[11px] font-bold text-foreground/90 flex items-center gap-1"><PenLine className="h-3.5 w-3.5" style={{ color: accent }} /> Note it in your investor update</label>
                            <span className={cn("text-[10px] font-bold tabular-nums", noteOk ? "text-primary" : "text-muted-foreground")}>{noteWords}/{PE_MEMO_MIN_WORDS} words {noteOk && "✓"}</span>
                          </div>
                          <Textarea rows={3} value={note} onChange={e => setNote(e.target.value)} placeholder={`Explain the move to your investors: what you did to ${base.name} and why it grows the value.`} className={cn("text-xs leading-relaxed", noteOk && "border-primary/50")} />
                          <Button size="sm" className="w-full press-scale" disabled={!noteOk} onClick={apply}>{noteOk ? "Make the move" : `Write your reasoning (${PE_MEMO_MIN_WORDS - noteWords} more words)`}</Button>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              )}

              {/* exit */}
              {exiting ? (
                <div className="rounded-xl border-2 p-3 space-y-2" style={{ borderColor: `${accent}55` }}>
                  <p className="text-[10px] uppercase font-extrabold tracking-wide flex items-center gap-1" style={{ color: accent }}><LogOut className="h-3.5 w-3.5" /> Choose your exit</p>
                  <p className="text-[11px] text-muted-foreground">Your equity stake is worth ~{eq.toLocaleString()} coins today. Each buyer values it a little differently.</p>
                  {routes.map(rt => {
                    const payout = computeExit(holding, rt)
                    return (
                      <button key={rt.id} onClick={() => onExit?.(holding, rt, payout)} className="w-full text-left rounded-lg border-2 border-border/60 p-2.5 hover:bg-muted/50 transition-all">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-extrabold">{rt.label}</span>
                          <span className="text-xs font-extrabold" style={{ color: payout >= holding.equityIn ? "#10b981" : "#ef4444" }}>{payout.toLocaleString()} · {(payout / Math.max(1, holding.equityIn)).toFixed(1)}×</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{rt.blurb}</p>
                      </button>
                    )
                  })}
                  <Button variant="ghost" size="sm" className="w-full" onClick={() => setExiting(false)}>Not yet - keep building</Button>
                </div>
              ) : (
                <Button variant="ghost" size="sm" className="w-full gap-1.5 press-scale" onClick={() => setExiting(true)}>
                  <LogOut className="h-4 w-4" /> Explore exits (worth ~{eq.toLocaleString()} coins)
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
