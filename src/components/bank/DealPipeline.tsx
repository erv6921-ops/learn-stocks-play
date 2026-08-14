// The Investment Banker's deal pipeline, shown under the weekly deal on the
// Careers desk. Tabs: Pipeline (live deals you're executing) and Mandates
// (jobs to pitch for this week), plus a league table vs rival banks. Tap any
// to open its full page (DealDetail) - pitch to win a mandate, or work a live
// deal's current stage. Success fees flow to coins via AppContext; the pipeline
// lives in bankStore.

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useApp } from "@/contexts/AppContext"
import { useBankStore } from "@/stores/bankStore"
import { type Career, rankForXp } from "@/data/careers"
import {
  generateMandates, DEAL_TYPES, leagueTable,
  type Mandate, type Engagement, type StageResult,
} from "@/lib/dealPipeline"
import {
  Search, Coins, Briefcase, ChevronRight, Trophy, Heart, Layers, Swords,
} from "lucide-react"
import DealDetail from "./DealDetail"

const NO_PIPE: Engagement[] = []

type Selected = { mode: "mandate" | "engagement"; id: string } | null

export default function DealPipeline({ career, week }: { career: Career; week: number }) {
  const { earnJeffs } = useApp()
  const pipeline = useBankStore(s => s.ibPipeline) ?? NO_PIPE
  const feesYtd = useBankStore(s => s.ibFeesYtd)
  const dealResults = useBankStore(s => s.dealResults)
  const xp = useBankStore(s => s.careerXp[career.id] ?? 0)
  const winMandate = useBankStore(s => s.winMandate)
  const workDeal = useBankStore(s => s.workDeal)
  const dismissDeal = useBankStore(s => s.dismissDeal)
  const addMemo = useBankStore(s => s.addMemo)

  const { currentIdx } = rankForXp(career, xp, Object.keys(dealResults))

  const [tab, setTab] = useState<"pipeline" | "mandates">("pipeline")
  const [selected, setSelected] = useState<Selected>(null)
  const [flash, setFlash] = useState<string | null>(null)

  const mandates = useMemo(() => generateMandates(week, currentIdx), [week, currentIdx])
  const wonIds = useMemo(() => new Set(pipeline.map(e => e.id)), [pipeline])
  const league = useMemo(() => leagueTable(week, feesYtd), [week, feesYtd])
  const myRank = league.findIndex(r => r.you) + 1
  // Only live deals show in the pipeline; finished ones linger just long enough
  // to show their result screen, then get dismissed on the way back.
  const liveDeals = pipeline.filter(e => e.status === "live")
  const pipeValue = liveDeals.reduce((n, e) => n + e.value, 0)

  const leaveDeal = (id: string) => {
    const cur = pipeline.find(e => e.id === id)
    if (cur && cur.status !== "live") dismissDeal(id)
    setSelected(null)
  }

  const win = (e: Engagement, pitchText: string) => {
    if (wonIds.has(e.id)) return
    winMandate(e)
    addMemo({ careerId: career.id, week, dealTitle: `Pitch won · ${e.project} (${e.client})`, prompt: "Why should the client hire you?", text: pitchText })
    setFlash(`You won the mandate on ${e.project} for ${e.client}! Now execute it stage by stage to earn the fee.`)
    setSelected({ mode: "engagement", id: e.id })
    setTab("pipeline")
  }

  const work = (engagement: Engagement, result: StageResult, writeUp: { headline: string; question: string; text: string }) => {
    const fee = result.closedFee ?? 0
    if (fee > 0) earnJeffs(fee, `Success fee · ${engagement.project} (${engagement.client})`)
    workDeal(career.id, engagement.id, result.patch, result.repDelta, fee)
    addMemo({ careerId: career.id, week, dealTitle: `Deal memo · ${engagement.project}: ${writeUp.headline}`, prompt: writeUp.question, text: writeUp.text })
    if (result.closedFee) setFlash(`${engagement.project} closed! You banked a ${result.closedFee.toLocaleString()}-coin success fee. 🎉`)
    else if (result.broke) setFlash(`${engagement.project} fell apart. No fee this time - execution risk is real.`)
  }

  // ── detail ──
  if (selected) {
    if (selected.mode === "mandate") {
      const m = mandates.find(o => o.id === selected.id)
      if (!m) { setSelected(null); return null }
      return <DealDetail mode="mandate" week={week} accent={career.accent} onBack={() => setSelected(null)} mandate={m} onWin={win} />
    }
    const e = pipeline.find(x => x.id === selected.id)
    if (!e) { setSelected(null); return null }
    return <DealDetail mode="engagement" week={week} accent={career.accent} onBack={() => leaveDeal(e.id)} engagement={e} onWork={(result, w) => work(e, result, w)} />
  }

  const TabButton = ({ id, label, icon: I }: { id: "pipeline" | "mandates"; label: string; icon: typeof Search }) => (
    <button onClick={() => setTab(id)} className={cn("flex-1 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-colors", tab === id ? "text-white shadow-sm" : "text-muted-foreground hover:bg-muted/60")} style={tab === id ? { background: career.accent } : undefined}>
      <I className="h-3.5 w-3.5" /> {label}
      {id === "pipeline" && pipeline.length > 0 && <span className={cn("ml-0.5 rounded-full px-1.5 text-[10px]", tab === id ? "bg-white/25" : "bg-muted")}>{pipeline.length}</span>}
    </button>
  )

  const liveCount = liveDeals.length
  const Kpi = ({ label, value }: { label: string; value: string }) => (
    <div className="rounded-lg bg-white/12 px-2.5 py-1.5 text-center min-w-[62px]">
      <p className="text-sm font-extrabold tabular-nums leading-none">{value}</p>
      <p className="text-[9px] text-white/70 uppercase tracking-wide mt-0.5">{label}</p>
    </div>
  )

  return (
    <div className="space-y-3">
      {/* ── IB hero: the deal desk ── */}
      <div className={`rounded-2xl overflow-hidden bg-gradient-to-br ${career.gradient} text-white shadow-card`}>
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/70 flex items-center gap-1"><Briefcase className="h-3 w-3" /> Advisory Desk</p>
              <p className="font-display text-xl font-extrabold leading-tight">{liveCount} live {liveCount === 1 ? "deal" : "deals"}</p>
              <p className="text-[11px] text-white/70">Win the mandate · execute · collect the fee</p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 shrink-0">
              <Trophy className="h-4 w-4" />
              <span className="font-display font-extrabold text-lg leading-none">#{myRank}</span>
              <span className="text-[10px] text-white/70 uppercase">league</span>
            </div>
          </div>
          <div className="flex gap-2 mt-3.5 flex-wrap">
            <Kpi label="Pipeline" value={pipeValue >= 1000 ? `${Math.round(pipeValue / 1000)}k` : pipeValue.toLocaleString()} />
            <Kpi label="Fees YTD" value={feesYtd >= 1000 ? `${(feesYtd / 1000).toFixed(1)}k` : Math.round(feesYtd).toLocaleString()} />
            <Kpi label="Mandates" value={String(mandates.length)} />
          </div>
        </div>
      </div>

      {/* league table */}
      <Card variant="elevated">
        <CardContent className="p-3">
          <p className="text-[10px] uppercase font-extrabold tracking-wide text-muted-foreground mb-2 flex items-center gap-1"><Swords className="h-3 w-3" /> League table · fees this season</p>
          <div className="space-y-1">
            {league.map((row, i) => (
              <div key={row.bank} className={cn("flex items-center gap-2 rounded-md px-2 py-1 text-xs", row.you && "font-bold")} style={row.you ? { background: `${career.accent}14` } : undefined}>
                <span className="w-4 text-muted-foreground tabular-nums">{i + 1}</span>
                <span className="flex-1 truncate" style={row.you ? { color: career.accent } : undefined}>{row.bank}</span>
                <span className="tabular-nums">{Math.round(row.fees).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card variant="elevated" className="overflow-hidden">
        <div className="p-1.5 flex gap-1.5 bg-muted/40">
          <TabButton id="pipeline" label="Pipeline" icon={Layers} />
          <TabButton id="mandates" label="Mandates" icon={Search} />
        </div>

        <CardContent className="p-3 sm:p-4">
          <AnimatePresence>
            {flash && (
              <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-3 rounded-lg border px-3 py-2 text-xs font-medium text-foreground/90" style={{ borderColor: `${career.accent}66`, background: `${career.accent}12` }}>
                {flash}
              </motion.div>
            )}
          </AnimatePresence>

          {tab === "pipeline" ? (
            liveDeals.length === 0 ? (
              <div className="text-center py-8 space-y-2">
                <Layers className="h-7 w-7 mx-auto text-muted-foreground/60" />
                <p className="text-sm font-semibold">No live deals yet</p>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">Open the <b>Mandates</b> tab to pitch for a deal. Win it, then execute each stage to close and collect your success fee.</p>
                <Button size="sm" variant="outline" className="mt-1" onClick={() => setTab("mandates")}>See mandates</Button>
              </div>
            ) : (
              <div className="space-y-2">
                {liveDeals.map(e => {
                  const meta = DEAL_TYPES[e.dealType]
                  const needsYou = e.status === "live" && e.lastWorkedWeek < week
                  const hColor = e.health >= 66 ? "#10b981" : e.health >= 33 ? "#d97706" : "#ef4444"
                  return (
                    <button key={e.id} onClick={() => setSelected({ mode: "engagement", id: e.id })} className="w-full text-left rounded-xl border border-border/60 p-3 hover:bg-muted/40 transition-colors">
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-display font-extrabold text-sm">{e.project}</span>
                            <Badge variant="outline" className="text-[9px]">{meta.icon} {meta.short}</Badge>
                            {needsYou && <Badge className="text-[9px]" style={{ background: career.accent }}>Needs you</Badge>}
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-2">
                            <span className="truncate max-w-[120px]">{e.client}</span>
                            <span className="flex items-center gap-0.5"><Layers className="h-3 w-3" />{Math.min(e.stageIdx + 1, 5)}/5</span>
                            <span style={{ color: hColor }} className="flex items-center gap-0.5 font-semibold"><Heart className="h-3 w-3" />{e.health}</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="text-right">
                            <p className="text-xs font-bold">{e.value.toLocaleString()}</p>
                            <p className="text-[10px] text-muted-foreground">size</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </button>
                  )
                })}
                <p className="text-[10px] text-muted-foreground text-center pt-1">Tap a deal to work its current stage. Keep the health up - two rookie calls in a row can break a deal.</p>
              </div>
            )
          ) : (
            <div className="space-y-2">
              <p className="text-[11px] text-muted-foreground flex items-center gap-1.5"><Coins className="h-3.5 w-3.5" /> Pipeline value <b className="text-foreground">{pipeValue.toLocaleString()}</b> · new mandates each week</p>
              {mandates.map(m => {
                const meta = DEAL_TYPES[m.dealType]
                const won = wonIds.has(m.id)
                return (
                  <button key={m.id} onClick={() => setSelected({ mode: "mandate", id: m.id })} className="w-full text-left rounded-xl border border-border/60 p-3 hover:bg-muted/40 transition-colors">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-display font-extrabold text-sm">{m.project}</span>
                          <Badge variant="outline" className="text-[9px]">{meta.icon} {meta.label}</Badge>
                          {won && <Badge variant="secondary" className="text-[9px]">Won</Badge>}
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-2">
                          <span className="truncate max-w-[110px]">{m.client}</span>
                          <span className="flex items-center gap-0.5"><Swords className="h-3 w-3" />{m.rivals.length} rivals</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="text-right">
                          <p className="text-xs font-bold">{m.value.toLocaleString()}</p>
                          <p className="text-[10px] text-muted-foreground">deal size</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </button>
                )
              })}
              <p className="text-[10px] text-muted-foreground text-center pt-1">Tap a mandate to pitch for it. You advise for a fee - credibility wins the job, not the biggest promise.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
