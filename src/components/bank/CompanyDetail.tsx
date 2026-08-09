// The "company page" a student opens for any startup - everything a real VC
// would study before and during an investment: the team and what each person
// does, the mission, live metrics, valuation history, and the risks. For a
// holding it also hosts the weekly catch-up: a founder brings a real situation
// and the student gives graded advice that moves the company's valuation.

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  generateScenario, applyScenarioChoice, companyMultiple,
  type InvestOption, type PortfolioCompany, type CatchUpResult, type CompanyProfile,
} from "@/lib/careerSim"
import {
  ArrowLeft, Coins, Users, TrendingUp, TrendingDown, Wallet, Timer,
  Target, Package, AlertTriangle, MessageSquare, LogOut, Building2,
} from "lucide-react"

const SIGNAL_VARIANT = {
  "Strong signal": "success",
  "Mixed signal": "warning",
  "Weak signal": "destructive",
} as const

function Metric({ icon: I, label, value, tone }: { icon: typeof Users; label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
      <p className="text-[9px] uppercase font-bold text-muted-foreground flex items-center gap-1"><I className="h-3 w-3" />{label}</p>
      <p className="text-sm font-extrabold tabular-nums mt-0.5" style={tone ? { color: tone } : undefined}>{value}</p>
    </div>
  )
}

function MetricsGrid({ p }: { p: CompanyProfile }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Metric icon={Users} label="Users" value={p.users.toLocaleString()} />
      <Metric icon={p.growthPct >= 0 ? TrendingUp : TrendingDown} label="Growth/mo" value={`${p.growthPct >= 0 ? "+" : ""}${p.growthPct}%`} tone={p.growthPct >= 12 ? "#10b981" : p.growthPct < 0 ? "#ef4444" : undefined} />
      <Metric icon={Coins} label="Revenue/mo" value={p.revenue.toLocaleString()} />
      <Metric icon={Timer} label="Runway" value={`${p.runwayMonths} mo`} tone={p.runwayMonths <= 4 ? "#ef4444" : undefined} />
      <Metric icon={Wallet} label="Valuation" value={p.valuation.toLocaleString()} />
      <Metric icon={Building2} label="Stage" value={p.stage} />
    </div>
  )
}

function Sparkline({ history, accent }: { history: { week: number; valuation: number }[]; accent: string }) {
  if (history.length < 2) return null
  const vals = history.map(h => h.valuation)
  const min = Math.min(...vals), max = Math.max(...vals)
  const span = max - min || 1
  return (
    <div className="flex items-end gap-1 h-12">
      {history.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t"
          style={{ height: `${20 + ((h.valuation - min) / span) * 80}%`, background: i === history.length - 1 ? accent : `${accent}66` }}
          title={`Week ${h.week}: ${h.valuation.toLocaleString()}`}
        />
      ))}
    </div>
  )
}

export default function CompanyDetail(props: {
  mode: "invest" | "holding"
  week: number
  accent: string
  onBack: () => void
  option?: InvestOption
  held?: boolean
  balance?: number
  onInvest?: (o: InvestOption) => void
  holding?: PortfolioCompany
  onCatchUp?: (patch: Partial<PortfolioCompany>, repDelta: number) => void
  onExit?: (c: PortfolioCompany) => void
}) {
  const { mode, week, accent, onBack, option, held, balance = 0, onInvest, holding, onCatchUp, onExit } = props

  const base = mode === "invest" ? option! : holding!
  const profile = base.profile
  const name = base.name, founder = base.founder, sector = base.sector

  // Catch-up scenario state (holding only).
  const canCatchUp = mode === "holding" && holding!.lastAdvisedWeek < week
  const scenario = useMemo(
    () => (canCatchUp ? generateScenario(holding!, week) : null),
    // Regenerate only when the holding/week identity changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, holding?.id, week, holding?.lastAdvisedWeek]
  )
  const [picked, setPicked] = useState<number | null>(null)
  const [preview, setPreview] = useState<CatchUpResult | null>(null)
  const [applied, setApplied] = useState<CatchUpResult | null>(null)

  const pickChoice = (i: number) => {
    if (picked !== null || !scenario || !holding) return
    setPicked(i)
    setPreview(applyScenarioChoice(holding, week, scenario.choices[i], i))
  }
  const applyAdvice = () => {
    if (!preview || !onCatchUp) return
    onCatchUp(preview.patch, preview.repDelta)
    setApplied(preview)
  }

  const mult = mode === "holding" ? companyMultiple(holding!) : 1
  const value = mode === "holding" ? Math.round(holding!.invested * mult) : 0
  const afford = balance >= (option?.ask ?? 0)

  return (
    <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
      <button onClick={onBack} className="flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground -ml-1">
        <ArrowLeft className="h-4 w-4" /> Back to {mode === "invest" ? "deals" : "portfolio"}
      </button>

      <Card variant="elevated" className="overflow-hidden">
        <div className="px-4 py-3 flex items-start justify-between gap-2" style={{ background: `${accent}12` }}>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-display text-lg font-extrabold">{name}</h3>
              <Badge variant="outline" className="text-[9px] capitalize">{sector}</Badge>
              <Badge variant="secondary" className="text-[9px]">{profile.stage}</Badge>
              {mode === "invest" && <Badge variant={SIGNAL_VARIANT[option!.signal]} className="text-[9px]">{option!.signal}</Badge>}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">Led by {founder}</p>
          </div>
          {mode === "holding" && (
            <div className="text-right shrink-0">
              <p className="text-sm font-extrabold" style={{ color: mult >= 1 ? "#10b981" : "#ef4444" }}>{mult}×</p>
              <p className="text-[10px] text-muted-foreground">your return</p>
            </div>
          )}
        </div>

        <CardContent className="p-4 space-y-4">
          {/* mission + product */}
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Target className="h-4 w-4 mt-0.5 shrink-0" style={{ color: accent }} />
              <div>
                <p className="text-[10px] uppercase font-bold text-muted-foreground">The goal</p>
                <p className="text-sm font-semibold">{profile.goal}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Package className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-[10px] uppercase font-bold text-muted-foreground">What they do</p>
                <p className="text-sm text-foreground/90">{profile.product}</p>
              </div>
            </div>
          </div>

          {/* metrics */}
          <div>
            <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1.5">The numbers</p>
            <MetricsGrid p={profile} />
          </div>

          {/* team */}
          <div>
            <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1.5">The team</p>
            <div className="space-y-1.5">
              {profile.team.map((m, i) => (
                <div key={i} className="flex items-center gap-2.5 rounded-lg border border-border/50 px-2.5 py-1.5">
                  <div className="h-7 w-7 rounded-full flex items-center justify-center text-[11px] font-extrabold text-white shrink-0" style={{ background: accent }}>
                    {m.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold leading-tight">{m.name} · <span className="font-semibold text-muted-foreground">{m.role}</span></p>
                    <p className="text-[11px] text-muted-foreground leading-tight">{m.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* risks */}
          <div>
            <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1.5 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" /> Watch out for
            </p>
            <ul className="space-y-1">
              {profile.risks.map((rk, i) => (
                <li key={i} className="text-xs text-foreground/80 flex gap-1.5"><span style={{ color: accent }}>•</span>{rk}</li>
              ))}
            </ul>
          </div>

          {/* ── invest mode ── */}
          {mode === "invest" && (
            <div className="pt-1 border-t border-border/50 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Round: <b className="text-foreground">{option!.ask.toLocaleString()} coins</b> for {option!.ownership}%</span>
                <span className="text-muted-foreground">Values it at {option!.entryValuation.toLocaleString()}</span>
              </div>
              <Button
                size="lg" className="w-full press-scale gap-1.5"
                disabled={held || !afford}
                onClick={() => onInvest?.(option!)}
              >
                <Coins className="h-4 w-4" />
                {held ? "Already invested ✓" : afford ? `Invest ${option!.ask.toLocaleString()} coins` : "Not enough coins"}
              </Button>
              <p className="text-[10px] text-muted-foreground text-center">
                Study the team, growth, runway and risks - then decide like a real VC.
              </p>
            </div>
          )}

          {/* ── holding mode: stake, history, catch-up, exit ── */}
          {mode === "holding" && holding && (
            <>
              <div className="pt-1 border-t border-border/50 grid grid-cols-3 gap-2 text-center">
                <div><p className="text-[10px] text-muted-foreground uppercase font-bold">Invested</p><p className="text-sm font-extrabold">{holding.invested.toLocaleString()}</p></div>
                <div><p className="text-[10px] text-muted-foreground uppercase font-bold">Now worth</p><p className="text-sm font-extrabold" style={{ color: value >= holding.invested ? "#10b981" : "#ef4444" }}>{value.toLocaleString()}</p></div>
                <div><p className="text-[10px] text-muted-foreground uppercase font-bold">Your stake</p><p className="text-sm font-extrabold">{holding.ownership}%</p></div>
              </div>

              {holding.valuationHistory.length >= 2 && (
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1.5">Valuation over time</p>
                  <Sparkline history={holding.valuationHistory} accent={accent} />
                </div>
              )}

              {holding.events.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1.5">Company log</p>
                  <div className="space-y-1 max-h-28 overflow-y-auto pr-1">
                    {[...holding.events].reverse().map((e, i) => (
                      <p key={i} className="text-[11px] text-muted-foreground"><b className="text-foreground/70">Wk {e.week}:</b> {e.text}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* catch-up scenario */}
              <div className="rounded-xl border-2 p-3" style={{ borderColor: `${accent}55` }}>
                <p className="text-[10px] uppercase font-extrabold tracking-wide mb-1.5 flex items-center gap-1" style={{ color: accent }}>
                  <MessageSquare className="h-3.5 w-3.5" /> Catch up with {founder}
                </p>

                {applied ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                    <p className="text-xs text-foreground/90 leading-relaxed">{applied.outcome}</p>
                    <Badge variant={applied.repDelta >= 0 ? "success" : "destructive"} className="text-[10px]">
                      Reputation {applied.repDelta >= 0 ? "+" : ""}{applied.repDelta}
                    </Badge>
                    <p className="text-[10px] text-muted-foreground pt-1">Come back next week for the next chapter.</p>
                  </motion.div>
                ) : !canCatchUp ? (
                  <p className="text-xs text-muted-foreground">You already met {founder} this week. Advance a week (finish your weekly deal) to check in again.</p>
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
                          <button
                            key={i}
                            disabled={revealed}
                            onClick={() => pickChoice(i)}
                            className={cn(
                              "w-full text-left rounded-lg border-2 p-2.5 text-xs transition-all",
                              isPicked
                                ? ch.points === 2 ? "border-primary bg-primary/10" : ch.points === 1 ? "border-amber-500 bg-amber-500/10" : "border-red-500 bg-red-500/10"
                                : revealed ? "border-border/50 opacity-45" : "border-border/60 hover:bg-muted/60"
                            )}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-medium">{ch.text}</span>
                              {isPicked && (
                                <Badge variant={ch.points === 2 ? "success" : ch.points === 1 ? "warning" : "destructive"} className="shrink-0 text-[9px]">
                                  {ch.points === 2 ? "Pro" : ch.points === 1 ? "Okay" : "Rookie"}
                                </Badge>
                              )}
                            </div>
                            <AnimatePresence>
                              {isPicked && (
                                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-1.5 text-[11px] text-muted-foreground leading-relaxed">
                                  {ch.feedback}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </button>
                        )
                      })}
                    </div>
                    {picked !== null && (
                      <Button size="sm" className="w-full press-scale" onClick={applyAdvice}>
                        Give this advice
                      </Button>
                    )}
                  </div>
                ) : null}
              </div>

              <Button variant="ghost" size="sm" className="w-full gap-1.5 press-scale" onClick={() => onExit?.(holding)}>
                <LogOut className="h-4 w-4" /> Exit this investment for {value.toLocaleString()} coins
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
