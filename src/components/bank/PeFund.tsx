// The Private Equity fund, shown under the weekly deal on the Careers desk.
// Two tabs: Portfolio (companies you own and are improving) and Market (this
// week's businesses for sale). Tap any one to open its full page (BuyoutDetail),
// where you structure the debt and buy it, run the value-creation playbook, or
// exit for a MOIC. Coins flow through AppContext; holdings live in bankStore.

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useApp } from "@/contexts/AppContext"
import { useBankStore } from "@/stores/bankStore"
import type { Career } from "@/data/careers"
import {
  generateBuyoutTargets, structureDeal, holdingFromTarget, equityValue,
  buyoutMOIC, buyoutEV, annualInterest,
  type BuyoutTarget, type PortfolioBuyout, type LeveragePlan, type ExitRoute,
} from "@/lib/peFund"
import {
  Search, Coins, TrendingUp, Minus, TrendingDown, Building2, Wallet,
  ChevronRight, Landmark, Gauge,
} from "lucide-react"
import BuyoutDetail from "./BuyoutDetail"

const NO_PORTFOLIO: PortfolioBuyout[] = []

const STATUS_META = {
  thriving: { label: "Thriving", color: "#10b981", Icon: TrendingUp },
  steady: { label: "Steady", color: "#d97706", Icon: Minus },
  distressed: { label: "Distressed", color: "#ef4444", Icon: TrendingDown },
} as const

const SIGNAL_VARIANT = { Strong: "success", Fair: "warning", Risky: "destructive" } as const

type Selected = { mode: "buy" | "holding"; id: string } | null

export default function PeFund({ career, week }: { career: Career; week: number }) {
  const { jeffsBalance, spendJeffs, awardJeffs } = useApp()
  const portfolio = useBankStore(s => s.pePortfolio) ?? NO_PORTFOLIO
  const buyPE = useBankStore(s => s.buyPE)
  const runPE = useBankStore(s => s.runPE)
  const exitPE = useBankStore(s => s.exitPE)
  const addMemo = useBankStore(s => s.addMemo)

  const [tab, setTab] = useState<"portfolio" | "market">("portfolio")
  const [selected, setSelected] = useState<Selected>(null)
  const [flash, setFlash] = useState<string | null>(null)

  const targets = useMemo(() => generateBuyoutTargets(week), [week])
  const ownedIds = useMemo(() => new Set(portfolio.map(c => c.id)), [portfolio])

  const totalEquityIn = portfolio.reduce((n, c) => n + c.equityIn, 0)
  const totalEquityValue = portfolio.reduce((n, c) => n + equityValue(c), 0)

  const buy = (t: BuyoutTarget, plan: LeveragePlan, thesis: string) => {
    if (ownedIds.has(t.id)) return
    const s = structureDeal(t, plan)
    if (jeffsBalance < s.equityIn) {
      setFlash(`You need ${s.equityIn.toLocaleString()} coins of equity to buy ${t.name} - you have ${Math.floor(jeffsBalance).toLocaleString()}.`)
      return
    }
    if (!spendJeffs(s.equityIn, `Bought ${t.name} (equity check)`)) return
    buyPE(holdingFromTarget(t, s, week, thesis))
    addMemo({ careerId: career.id, week, dealTitle: `Buyout thesis · ${t.name}`, prompt: `Why did you buy ${t.name}, and how will you make money on it?`, text: thesis })
    setFlash(`You bought ${t.name} for ${s.equityIn.toLocaleString()} coins of equity plus ${s.debt.toLocaleString()} of debt. Now go make it better.`)
    setSelected(null)
    setTab("portfolio")
  }

  const run = (holding: PortfolioBuyout, patch: Partial<PortfolioBuyout>, repDelta: number, writeUp: { headline: string; question: string; text: string }) => {
    runPE(career.id, holding.id, patch, repDelta)
    addMemo({ careerId: career.id, week, dealTitle: `Investor update · ${holding.name}: ${writeUp.headline}`, prompt: writeUp.question, text: writeUp.text })
  }

  const exit = (c: PortfolioBuyout, route: ExitRoute, payout: number) => {
    awardJeffs(payout, `Exited ${c.name} (${route.label})`)
    exitPE(c.id, payout)
    setSelected(null)
    const mult = (payout / Math.max(1, c.equityIn)).toFixed(1)
    setFlash(payout >= c.equityIn
      ? `Exited ${c.name} for ${payout.toLocaleString()} coins - a ${mult}× on your equity! 🎉`
      : `Exited ${c.name} for ${payout.toLocaleString()} coins (${mult}×). Leverage cuts both ways - a hard lesson learned.`)
  }

  // ── detail screen ──
  if (selected) {
    if (selected.mode === "buy") {
      const t = targets.find(o => o.id === selected.id)
      if (!t) { setSelected(null); return null }
      return <BuyoutDetail mode="buy" week={week} accent={career.accent} onBack={() => setSelected(null)} target={t} owned={ownedIds.has(t.id)} balance={jeffsBalance} onBuy={buy} />
    }
    const holding = portfolio.find(c => c.id === selected.id)
    if (!holding) { setSelected(null); return null }
    return <BuyoutDetail mode="holding" week={week} accent={career.accent} onBack={() => setSelected(null)} holding={holding} onRun={(patch, rep, w) => run(holding, patch, rep, w)} onExit={exit} />
  }

  const TabButton = ({ id, label, icon: I }: { id: "portfolio" | "market"; label: string; icon: typeof Search }) => (
    <button onClick={() => setTab(id)} className={cn("flex-1 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-colors", tab === id ? "text-white shadow-sm" : "text-muted-foreground hover:bg-muted/60")} style={tab === id ? { background: career.accent } : undefined}>
      <I className="h-3.5 w-3.5" /> {label}
      {id === "portfolio" && portfolio.length > 0 && <span className={cn("ml-0.5 rounded-full px-1.5 text-[10px]", tab === id ? "bg-white/25" : "bg-muted")}>{portfolio.length}</span>}
    </button>
  )

  // Fund-level KPIs for the hero.
  const totalDebt = portfolio.reduce((n, c) => n + c.debt, 0)
  const fundMoic = totalEquityIn > 0 ? Math.round((totalEquityValue / totalEquityIn) * 100) / 100 : 0
  const stackTotal = Math.max(1, totalEquityIn + totalDebt)

  return (
    <div className="space-y-3">
      {/* ── PE hero: the capital stack ── */}
      <div className={`rounded-2xl overflow-hidden bg-gradient-to-br ${career.gradient} text-white shadow-card`}>
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/70 flex items-center gap-1"><Landmark className="h-3 w-3" /> Buyout Fund I</p>
              <p className="font-display text-xl font-extrabold leading-tight">{portfolio.length} {portfolio.length === 1 ? "company" : "companies"} owned</p>
              <p className="text-[11px] text-white/70">Buy it with debt · fix it · sell it for more</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-2xl font-extrabold tabular-nums">{fundMoic ? `${fundMoic}×` : "-"}</p>
              <p className="text-[10px] text-white/70 uppercase tracking-wide">fund MOIC</p>
            </div>
          </div>
          {portfolio.length > 0 && (
            <div className="mt-3.5">
              <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-black/20">
                <div style={{ width: `${(totalEquityIn / stackTotal) * 100}%`, background: "rgba(255,255,255,0.9)" }} title="Your equity" />
                <div style={{ width: `${(totalDebt / stackTotal) * 100}%`, background: "rgba(0,0,0,0.35)" }} title="Debt (leverage)" />
              </div>
              <div className="flex items-center justify-between mt-1.5 text-[10px] font-semibold text-white/85">
                <span>◻ Equity in {totalEquityIn.toLocaleString()}</span>
                <span>◼ Debt {totalDebt.toLocaleString()}</span>
                <span className="font-extrabold">Worth {totalEquityValue.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <Card variant="elevated" className="overflow-hidden">
        <div className="p-1.5 flex gap-1.5 bg-muted/40">
          <TabButton id="portfolio" label="Portfolio" icon={Building2} />
          <TabButton id="market" label="For sale" icon={Search} />
        </div>

        <CardContent className="p-3 sm:p-4">
          <AnimatePresence>
            {flash && (
              <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-3 rounded-lg border px-3 py-2 text-xs font-medium text-foreground/90" style={{ borderColor: `${career.accent}66`, background: `${career.accent}12` }}>
                {flash}
              </motion.div>
            )}
          </AnimatePresence>

          {tab === "portfolio" ? (
            portfolio.length === 0 ? (
              <div className="text-center py-8 space-y-2">
                <Building2 className="h-7 w-7 mx-auto text-muted-foreground/60" />
                <p className="text-sm font-semibold">You don't own any companies yet</p>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">Open the <b>For sale</b> tab to study businesses, structure the debt, and buy your first one. Then improve it week by week and sell for a profit.</p>
                <Button size="sm" variant="outline" className="mt-1" onClick={() => setTab("market")}>Browse the market</Button>
              </div>
            ) : (
              <div className="space-y-2">
                {portfolio.map(c => {
                  const meta = STATUS_META[c.status]
                  const moic = buyoutMOIC(c)
                  const eq = equityValue(c)
                  const needsYou = c.lastRunWeek < week
                  return (
                    <button key={c.id} onClick={() => setSelected({ mode: "holding", id: c.id })} className="w-full text-left rounded-xl border border-border/60 p-3 hover:bg-muted/40 transition-colors">
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-display font-extrabold text-sm">{c.name}</span>
                            <Badge variant="outline" className="text-[9px] capitalize">{c.sector}</Badge>
                            {needsYou && <Badge className="text-[9px]" style={{ background: career.accent }}>Needs you</Badge>}
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-2">
                            <span className="flex items-center gap-0.5"><Coins className="h-3 w-3" />{c.ebitda.toLocaleString()} profit</span>
                            <span className="flex items-center gap-0.5"><Landmark className="h-3 w-3" />{c.debt.toLocaleString()} debt</span>
                            <span style={{ color: meta.color }} className="flex items-center gap-0.5 font-semibold"><meta.Icon className="h-3 w-3" />{meta.label}</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="text-right">
                            <p className="text-sm font-extrabold" style={{ color: eq >= c.equityIn ? "#10b981" : "#ef4444" }}>{moic}×</p>
                            <p className="text-[10px] text-muted-foreground">{eq.toLocaleString()}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </button>
                  )
                })}
                <p className="text-[10px] text-muted-foreground text-center pt-1">Tap a company to run its playbook. Grow profit, pay down debt, then exit when the MOIC looks great.</p>
              </div>
            )
          ) : (
            <div className="space-y-2">
              <p className="text-[11px] text-muted-foreground flex items-center gap-1.5"><Coins className="h-3.5 w-3.5" /> You have <b className="text-foreground">{Math.floor(jeffsBalance).toLocaleString()}</b> coins · new businesses list each week</p>
              {targets.map(t => {
                const owned = ownedIds.has(t.id)
                const p = t.profile
                return (
                  <button key={t.id} onClick={() => setSelected({ mode: "buy", id: t.id })} className="w-full text-left rounded-xl border border-border/60 p-3 hover:bg-muted/40 transition-colors">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-display font-extrabold text-sm">{t.name}</span>
                          <Badge variant="outline" className="text-[9px] capitalize">{t.sector}</Badge>
                          <Badge variant={SIGNAL_VARIANT[t.signal]} className="text-[9px]">{t.signal}</Badge>
                          {owned && <Badge variant="secondary" className="text-[9px]">Owned</Badge>}
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-2">
                          <span className="flex items-center gap-0.5"><Coins className="h-3 w-3" />{p.ebitda.toLocaleString()} profit</span>
                          <span className="flex items-center gap-0.5"><Gauge className="h-3 w-3" />{t.entryMultiple}×</span>
                          <span className={cn("flex items-center gap-0.5 font-semibold")} style={{ color: p.growthPct >= 6 ? "#10b981" : p.growthPct < 0 ? "#ef4444" : undefined }}>{p.growthPct >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}{p.growthPct >= 0 ? "+" : ""}{p.growthPct}%</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="text-right">
                          <p className="text-xs font-bold">{t.price.toLocaleString()}</p>
                          <p className="text-[10px] text-muted-foreground">price</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </button>
                )
              })}
              <p className="text-[10px] text-muted-foreground text-center pt-1">Tap a business to study it and structure your offer. A cheap, fixable company beats a perfect, pricey one.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
