// The Venture Capitalist's living portfolio, shown under the weekly deal on the
// Careers desk. Two tabs: Portfolio (startups you've funded) and Invest (browse
// this week's deals). Clicking any startup opens its full company page
// (CompanyDetail) - team, mission, metrics, valuation, risks - where you invest,
// give scenario-based advice to grow it, or exit. Coins flow through AppContext;
// holdings + reputation live in bankStore.

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
  generateInvestOptions, holdingFromOption, companyMultiple,
  type InvestOption, type PortfolioCompany,
} from "@/lib/careerSim"
import {
  Search, Coins, TrendingUp, TrendingDown, Minus, Building2, Wallet,
  ChevronRight, Users, Timer,
} from "lucide-react"
import CompanyDetail from "./CompanyDetail"

const NO_PORTFOLIO: PortfolioCompany[] = []

const STATUS_META = {
  growing: { label: "Growing", color: "#10b981", Icon: TrendingUp },
  steady: { label: "Steady", color: "#d97706", Icon: Minus },
  struggling: { label: "Struggling", color: "#ef4444", Icon: TrendingDown },
} as const

const SIGNAL_VARIANT = {
  "Strong signal": "success",
  "Mixed signal": "warning",
  "Weak signal": "destructive",
} as const

type Selected = { mode: "invest" | "holding"; id: string } | null

export default function VentureFund({ career, week }: { career: Career; week: number }) {
  const { jeffsBalance, spendJeffs, awardJeffs } = useApp()
  const portfolio = useBankStore(s => s.vcPortfolio) ?? NO_PORTFOLIO
  const investVC = useBankStore(s => s.investVC)
  const catchUpVC = useBankStore(s => s.catchUpVC)
  const exitVC = useBankStore(s => s.exitVC)
  const addMemo = useBankStore(s => s.addMemo)

  const [tab, setTab] = useState<"portfolio" | "invest">("portfolio")
  const [selected, setSelected] = useState<Selected>(null)
  const [flash, setFlash] = useState<string | null>(null)

  const options = useMemo(() => generateInvestOptions(week), [week])
  const heldIds = useMemo(() => new Set(portfolio.map(c => c.id)), [portfolio])

  const totalInvested = portfolio.reduce((n, c) => n + c.invested, 0)
  const totalValue = portfolio.reduce((n, c) => n + Math.round(c.invested * companyMultiple(c)), 0)

  const invest = (opt: InvestOption, thesis: string) => {
    if (heldIds.has(opt.id)) return
    if (jeffsBalance < opt.ask) {
      setFlash(`You need ${opt.ask} coins to back ${opt.name} - you have ${Math.floor(jeffsBalance)}.`)
      return
    }
    if (!spendJeffs(opt.ask, `Invested in ${opt.name}`)) return
    investVC(holdingFromOption(opt, week, thesis))
    addMemo({
      careerId: career.id, week,
      dealTitle: `Investment thesis · ${opt.name}`,
      prompt: `Why did you back ${opt.name}?`,
      text: thesis,
    })
    setFlash(`You backed ${opt.name} for ${opt.ask} coins (${opt.ownership}% stake). Thesis filed.`)
    setSelected(null)
    setTab("portfolio")
  }

  const catchUp = (
    holding: PortfolioCompany,
    patch: Partial<PortfolioCompany>,
    repDelta: number,
    writeUp: { headline: string; question: string; text: string },
  ) => {
    catchUpVC(career.id, holding.id, patch, repDelta)
    addMemo({
      careerId: career.id, week,
      dealTitle: `Advice · ${holding.name}: ${writeUp.headline}`,
      prompt: writeUp.question,
      text: writeUp.text,
    })
  }

  const exit = (c: PortfolioCompany) => {
    const payout = Math.round(c.invested * companyMultiple(c))
    awardJeffs(payout, `Exited ${c.name}`)
    exitVC(c.id, payout)
    setSelected(null)
    setFlash(
      payout >= c.invested
        ? `Exited ${c.name} for ${payout.toLocaleString()} coins - a ${(c.invested ? payout / c.invested : 0).toFixed(1)}× return! 🎉`
        : `Exited ${c.name} for ${payout.toLocaleString()} coins, taking a loss. Cutting losers is part of the job.`
    )
  }

  // ── detail screen ──
  if (selected) {
    if (selected.mode === "invest") {
      const opt = options.find(o => o.id === selected.id)
      if (!opt) { setSelected(null); return null }
      return (
        <CompanyDetail
          mode="invest" week={week} accent={career.accent} onBack={() => setSelected(null)}
          option={opt} held={heldIds.has(opt.id)} balance={jeffsBalance} onInvest={invest}
        />
      )
    }
    const holding = portfolio.find(c => c.id === selected.id)
    if (!holding) { setSelected(null); return null }
    return (
      <CompanyDetail
        mode="holding" week={week} accent={career.accent} onBack={() => setSelected(null)}
        holding={holding}
        onCatchUp={(patch, repDelta, writeUp) => catchUp(holding, patch, repDelta, writeUp)}
        onExit={exit}
      />
    )
  }

  const TabButton = ({ id, label, icon: I }: { id: "portfolio" | "invest"; label: string; icon: typeof Search }) => (
    <button
      onClick={() => setTab(id)}
      className={cn(
        "flex-1 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-colors",
        tab === id ? "text-white shadow-sm" : "text-muted-foreground hover:bg-muted/60"
      )}
      style={tab === id ? { background: career.accent } : undefined}
    >
      <I className="h-3.5 w-3.5" /> {label}
      {id === "portfolio" && portfolio.length > 0 && (
        <span className={cn("ml-0.5 rounded-full px-1.5 text-[10px]", tab === id ? "bg-white/25" : "bg-muted")}>{portfolio.length}</span>
      )}
    </button>
  )

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-1.5">
          <Building2 className="h-3.5 w-3.5" /> Your fund
        </h3>
        {portfolio.length > 0 && (
          <div className="flex items-center gap-1.5 text-[11px] font-semibold">
            <Wallet className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">Invested {totalInvested.toLocaleString()}</span>
            <span aria-hidden>·</span>
            <span style={{ color: totalValue >= totalInvested ? "#10b981" : "#ef4444" }}>Worth {totalValue.toLocaleString()}</span>
          </div>
        )}
      </div>

      <Card variant="elevated" className="overflow-hidden">
        <div className="p-1.5 flex gap-1.5 bg-muted/40">
          <TabButton id="portfolio" label="Portfolio" icon={Building2} />
          <TabButton id="invest" label="Invest" icon={Search} />
        </div>

        <CardContent className="p-3 sm:p-4">
          <AnimatePresence>
            {flash && (
              <motion.div
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mb-3 rounded-lg border px-3 py-2 text-xs font-medium text-foreground/90"
                style={{ borderColor: `${career.accent}66`, background: `${career.accent}12` }}
              >
                {flash}
              </motion.div>
            )}
          </AnimatePresence>

          {tab === "portfolio" ? (
            portfolio.length === 0 ? (
              <div className="text-center py-8 space-y-2">
                <Building2 className="h-7 w-7 mx-auto text-muted-foreground/60" />
                <p className="text-sm font-semibold">Your portfolio is empty</p>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                  Open the <b>Invest</b> tab to study startups and back your first one. Then meet each founder weekly to help them grow.
                </p>
                <Button size="sm" variant="outline" className="mt-1" onClick={() => setTab("invest")}>Browse startups</Button>
              </div>
            ) : (
              <div className="space-y-2">
                {portfolio.map(c => {
                  const meta = STATUS_META[c.status]
                  const mult = companyMultiple(c)
                  const value = Math.round(c.invested * mult)
                  const needsYou = c.lastAdvisedWeek < week
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelected({ mode: "holding", id: c.id })}
                      className="w-full text-left rounded-xl border border-border/60 p-3 hover:bg-muted/40 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-display font-extrabold text-sm">{c.name}</span>
                            <Badge variant="outline" className="text-[9px] capitalize">{c.sector}</Badge>
                            {needsYou && <Badge className="text-[9px]" style={{ background: career.accent }}>Needs you</Badge>}
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-2">
                            <span className="flex items-center gap-0.5"><Users className="h-3 w-3" />{c.profile.users.toLocaleString()}</span>
                            <span className="flex items-center gap-0.5"><Timer className="h-3 w-3" />{c.profile.runwayMonths}mo</span>
                            <span style={{ color: meta.color }} className="flex items-center gap-0.5 font-semibold"><meta.Icon className="h-3 w-3" />{meta.label}</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="text-right">
                            <p className="text-sm font-extrabold" style={{ color: value >= c.invested ? "#10b981" : "#ef4444" }}>{mult}×</p>
                            <p className="text-[10px] text-muted-foreground">{value.toLocaleString()}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </button>
                  )
                })}
                <p className="text-[10px] text-muted-foreground text-center pt-1">
                  Tap a company to see its full page and meet the founder. Good advice compounds winners; nothing saves a broken bet.
                </p>
              </div>
            )
          ) : (
            <div className="space-y-2">
              <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                <Coins className="h-3.5 w-3.5" /> You have <b className="text-foreground">{Math.floor(jeffsBalance).toLocaleString()}</b> coins · new startups each week
              </p>
              {options.map(opt => {
                const held = heldIds.has(opt.id)
                const p = opt.profile
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelected({ mode: "invest", id: opt.id })}
                    className="w-full text-left rounded-xl border border-border/60 p-3 hover:bg-muted/40 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-display font-extrabold text-sm">{opt.name}</span>
                          <Badge variant="outline" className="text-[9px] capitalize">{opt.sector}</Badge>
                          <Badge variant={SIGNAL_VARIANT[opt.signal]} className="text-[9px]">{opt.signal}</Badge>
                          {held && <Badge variant="secondary" className="text-[9px]">Held</Badge>}
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-2">
                          <span className="flex items-center gap-0.5"><Users className="h-3 w-3" />{p.users.toLocaleString()}</span>
                          <span className={cn("flex items-center gap-0.5 font-semibold")} style={{ color: p.growthPct >= 12 ? "#10b981" : p.growthPct < 0 ? "#ef4444" : undefined }}>
                            {p.growthPct >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}{p.growthPct >= 0 ? "+" : ""}{p.growthPct}%
                          </span>
                          <span className="flex items-center gap-0.5"><Timer className="h-3 w-3" />{p.runwayMonths}mo</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="text-right">
                          <p className="text-xs font-bold">{opt.ask.toLocaleString()}</p>
                          <p className="text-[10px] text-muted-foreground">{opt.ownership}%</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </button>
                )
              })}
              <p className="text-[10px] text-muted-foreground text-center pt-1">
                Tap a startup to study its team, mission and numbers before you invest. Read the signal, not the hype.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
