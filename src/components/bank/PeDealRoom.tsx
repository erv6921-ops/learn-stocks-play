// The Private Equity "Deal Room" - an immersive, email-driven run through one
// real buyout, start to finish. The student reads emails from named characters,
// makes weighty decisions, meets the founder, NEGOTIATES the price over several
// rounds, and finally sees their MOIC. A live "term sheet" fills in as the deal
// takes shape. Campaign progress lives in bankStore; coin bonuses pay out at
// close and exit through AppContext.

import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useApp } from "@/contexts/AppContext"
import { useBankStore } from "@/stores/bankStore"
import type { Career } from "@/data/careers"
import {
  DEALS, getDeal, PHASES, INITIAL_VARS,
  entryEV, entryDebt, entryEquity, computeExit, closeBonus, exitCarry,
  fmtM, fmtX, applyNegMove,
  type PeVars, type Step, type Choice, type Negotiation, type NegChoice, type ExitResult, type Deal,
} from "@/lib/peDealRoom"
import {
  Mail, ChevronRight, Landmark, Coins, Handshake, FileText,
  MessageSquare, Trophy, RotateCcw, PenLine, ChevronLeft, Lock,
} from "lucide-react"

const clamp = (n: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, n))
const initials = (name: string) => name.split(" ").map(w => w[0]).slice(0, 2).join("")

// Deterministic shuffle so the correct answer isn't always in the same slot.
function hashStr(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) }
  return h >>> 0
}
function shuffleSeeded<T>(key: string, arr: T[]): T[] {
  let a = hashStr(key)
  const rng = () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [out[i], out[j]] = [out[j], out[i]] }
  return out
}

/** Merge a chosen option into the deal vars (deltas vs absolutes handled explicitly). */
function applyChoice(v: PeVars, c: Choice): Partial<PeVars> {
  const e = c.effect ?? {}
  const patch: Partial<PeVars> = {
    score: v.score + c.points,
    buildQuality: clamp(v.buildQuality + (typeof e.buildQuality === "number" ? e.buildQuality : 0)),
    bankerRel: clamp(v.bankerRel + (c.rel ?? 0) + (typeof e.bankerRel === "number" ? e.bankerRel : 0)),
  }
  if (typeof e.leverageMult === "number") patch.leverageMult = e.leverageMult
  if (typeof e.ebitda === "number") patch.ebitda = e.ebitda
  if (typeof e.exitMultiple === "number") patch.exitMultiple = e.exitMultiple
  if (typeof e.retraded === "boolean") patch.retraded = e.retraded
  if (typeof e.rolloverAccepted === "boolean") patch.rolloverAccepted = e.rolloverAccepted
  return patch
}

const ACCENT = "#34d399" // PE emerald

/* ── shared bits ────────────────────────────────────────────────────── */

function Avatar({ name }: { name: string }) {
  return (
    <div className="h-9 w-9 rounded-full flex items-center justify-center text-[11px] font-extrabold text-white shrink-0" style={{ background: ACCENT }}>
      {initials(name)}
    </div>
  )
}

function PointBadge({ p }: { p: 0 | 1 | 2 }) {
  const { t } = useTranslation()
  return <Badge variant={p === 2 ? "success" : p === 1 ? "warning" : "destructive"} className="shrink-0 text-[9px]">{p === 2 ? t("bankCareers.dealRoom.rating.pro") : p === 1 ? t("bankCareers.dealRoom.rating.okay") : t("bankCareers.dealRoom.rating.rookie")}</Badge>
}

/* ── negotiation runner ─────────────────────────────────────────────── */

function NegotiationView({ neg, startRel, onFinish }: { neg: Negotiation; startRel: number; onFinish: (agreed: number, relDelta: number, points: number) => void }) {
  const { t } = useTranslation()
  const [round, setRound] = useState(0)
  const [current, setCurrent] = useState(neg.start)
  const [relDelta, setRelDelta] = useState(0)
  const [points, setPoints] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [afterNumber, setAfterNumber] = useState(neg.start)

  const r = neg.rounds[round]
  const isLast = round === neg.rounds.length - 1
  const rChoices = useMemo(() => shuffleSeeded(`${neg.id}-${round}`, r.choices), [neg.id, round, r.choices])

  const pick = (i: number) => {
    if (picked !== null) return
    const ch = rChoices[i]
    const next = applyNegMove(neg, current, ch.move)
    setAfterNumber(next)
    setPicked(i)
    setRelDelta(d => d + ch.rel)
    setPoints(p => p + ch.points)
  }

  const advance = () => {
    setCurrent(afterNumber)
    if (isLast) { onFinish(afterNumber, relDelta, points); return }
    setRound(n => n + 1)
    setPicked(null)
  }

  const chosen: NegChoice | null = picked !== null ? rChoices[picked] : null

  return (
    <div className="space-y-3">
      {/* their standing position */}
      <div className="rounded-xl border-2 p-3" style={{ borderColor: `${ACCENT}44` }}>
        <div className="flex items-center gap-2.5 mb-2">
          <Avatar name={neg.counterparty} />
          <div className="min-w-0">
            <p className="text-sm font-extrabold leading-tight">{neg.counterparty}</p>
            <p className="text-[11px] text-muted-foreground leading-tight">{neg.role}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-lg font-extrabold tabular-nums" style={{ color: ACCENT }}>{neg.unit === "×" ? fmtX(current) : fmtM(current)}</p>
            <p className="text-[9px] text-muted-foreground uppercase">{t("bankCareers.dealRoom.onTheTable")}</p>
          </div>
        </div>
        <p className="text-sm text-foreground/90 leading-relaxed">{r.theirLine}</p>
      </div>

      {/* your move */}
      <div className="space-y-1.5">
        <p className="text-[11px] font-extrabold uppercase tracking-wide text-muted-foreground flex items-center gap-1"><Handshake className="h-3.5 w-3.5" /> {t("bankCareers.dealRoom.yourMove", { round: round + 1, total: neg.rounds.length })}</p>
        {rChoices.map((ch, i) => {
          const isPicked = picked === i
          const revealed = picked !== null
          return (
            <button key={i} disabled={revealed} onClick={() => pick(i)}
              className={cn("w-full text-left rounded-xl border-2 p-3 text-sm transition-all",
                isPicked ? ch.points === 2 ? "border-primary bg-primary/10" : ch.points === 1 ? "border-amber-500 bg-amber-500/10" : "border-red-500 bg-red-500/10"
                  : revealed ? "border-border/50 opacity-45" : "border-border/60 hover:bg-muted/60")}>
              <div className="flex items-start justify-between gap-2">
                <span className="font-medium">{ch.text}</span>
                {isPicked && <PointBadge p={ch.points} />}
              </div>
            </button>
          )
        })}
      </div>

      {/* their reply */}
      <AnimatePresence>
        {chosen && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <div className="rounded-xl bg-muted/50 p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <Avatar name={neg.counterparty} />
                <span className="text-xs font-bold">{t("bankCareers.dealRoom.replies", { name: neg.counterparty })}</span>
                <span className="ml-auto text-xs font-extrabold tabular-nums" style={{ color: ACCENT }}>{neg.unit === "×" ? fmtX(afterNumber) : fmtM(afterNumber)}</span>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed">{chosen.reply}</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed mt-2 pt-2 border-t border-border/50">{chosen.feedback}</p>
            </div>
            <Button size="lg" className="w-full press-scale gap-1.5" onClick={advance}>
              {isLast ? t("bankCareers.dealRoom.shakeOnIt") : t("bankCareers.dealRoom.nextRound")} <ChevronRight className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── term sheet sidebar ─────────────────────────────────────────────── */

function TermSheet({ v, company }: { v: PeVars; company: string }) {
  const { t } = useTranslation()
  const hasEntry = v.entryMultiple > 0
  const Row = ({ k, val, show = true }: { k: string; val: string; show?: boolean }) => (
    <div className="flex items-baseline justify-between gap-2 py-1">
      <span className="text-[11px] text-muted-foreground">{k}</span>
      <span className="text-xs font-bold tabular-nums">{show ? val : "-"}</span>
    </div>
  )
  const ex = v.exitMultiple > 0 ? computeExit(v) : null
  return (
    <Card variant="elevated">
      <CardContent className="p-4">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-muted-foreground mb-2 flex items-center gap-1.5"><FileText className="h-3.5 w-3.5" /> {t("bankCareers.dealRoom.terms.title")}</p>
        <div className="divide-y divide-border/50">
          <Row k={t("bankCareers.dealRoom.terms.company")} val={company} />
          <Row k={t("bankCareers.dealRoom.terms.entryProfit")} val={fmtM(v.ebitda)} />
          <Row k={t("bankCareers.dealRoom.terms.purchaseMultiple")} val={fmtX(v.entryMultiple)} show={hasEntry} />
          <Row k={t("bankCareers.dealRoom.terms.purchasePrice")} val={fmtM(entryEV(v))} show={hasEntry} />
          <Row k={t("bankCareers.dealRoom.terms.debtLeverage")} val={`${fmtM(entryDebt(v))} · ${v.leverageMult}×`} show={hasEntry} />
          <Row k={t("bankCareers.dealRoom.terms.equityCheck")} val={fmtM(entryEquity(v))} show={hasEntry} />
          <Row k={t("bankCareers.dealRoom.terms.bankerRapport")} val={`${v.bankerRel}/100`} />
        </div>
        {ex && (
          <div className="mt-3 pt-3 border-t-2" style={{ borderColor: `${ACCENT}55` }}>
            <p className="text-[10px] uppercase font-extrabold" style={{ color: ACCENT }}>{t("bankCareers.dealRoom.terms.atExit")}</p>
            <div className="divide-y divide-border/50">
              <Row k={t("bankCareers.dealRoom.terms.exitProfit")} val={fmtM(ex.exitEbitda)} />
              <Row k={t("bankCareers.dealRoom.terms.exitMultiple")} val={fmtX(ex.exitMultiple)} />
              <Row k={t("bankCareers.dealRoom.terms.equityValue")} val={fmtM(ex.exitEquity)} />
            </div>
            <div className="mt-2 flex items-center justify-between rounded-lg px-3 py-2" style={{ background: `${ACCENT}18` }}>
              <span className="text-xs font-extrabold">MOIC</span>
              <span className="text-lg font-extrabold tabular-nums" style={{ color: ex.moic >= 1 ? "#10b981" : "#ef4444" }}>{ex.moic}×</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

/* ── main ───────────────────────────────────────────────────────────── */

export default function PeDealRoom({ career }: { career: Career; week: number }) {
  const { t } = useTranslation()
  const { earnJeffs } = useApp()
  const dealId = useBankStore(s => s.peDealId)
  const step = useBankStore(s => s.peDealStep)
  const vars = useBankStore(s => s.peDealVars) ?? INITIAL_VARS
  const done = useBankStore(s => s.peDealsDone)
  const startDeal = useBankStore(s => s.peDealStart)
  const advanceStep = useBankStore(s => s.peDealAdvance)
  const exitDeal = useBankStore(s => s.peDealExit)
  const finishDeal = useBankStore(s => s.peDealFinish)
  const addMemo = useBankStore(s => s.addMemo)

  const [picked, setPicked] = useState<number | null>(null)
  const [meetingPicks, setMeetingPicks] = useState<number[]>([])
  const [paid, setPaid] = useState(false)

  const deal: Deal | undefined = dealId ? getDeal(dealId) : undefined
  const steps = deal?.steps ?? []
  const cur = steps[step] as Step | undefined
  const finished = !!deal && step >= steps.length

  // Shuffle authored option order so the answer isn't always the first choice.
  const decisionChoices = useMemo(
    () => (cur && cur.kind === "decision" ? shuffleSeeded(cur.id, cur.choices) : []),
    [cur?.id]
  )
  const meetingOrder = useMemo(
    () => (cur && cur.kind === "meeting" ? shuffleSeeded(cur.id, cur.questions.map((_, i) => i)) : []),
    [cur?.id]
  )

  const go = (patch?: Partial<PeVars>) => {
    advanceStep(step + 1, patch)
    setPicked(null)
    setMeetingPicks([])
    setPaid(false)
  }
  const restart = () => { if (deal) startDeal(deal.id, deal.initVars); setPicked(null); setMeetingPicks([]); setPaid(false) }

  const phaseIdx = cur ? PHASES.indexOf(cur.phase) : PHASES.length

  // ── the case-study library (no deal in progress) ──
  if (!deal) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-1.5"><Landmark className="h-3.5 w-3.5" /> {t("bankCareers.dealRoom.library.title")}</h3>
          <span className="text-[11px] text-muted-foreground">{t("bankCareers.dealRoom.library.closed", { done: Object.keys(done).length, total: DEALS.length })}</span>
        </div>
        <p className="text-xs text-muted-foreground -mt-1">{t("bankCareers.dealRoom.library.intro")}</p>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {DEALS.map(d => {
            const best = done[d.id]
            return (
              <button key={d.id} onClick={() => { startDeal(d.id, d.initVars); setPicked(null); setMeetingPicks([]); setPaid(false) }}
                className="text-left rounded-2xl border border-border/60 bg-card p-3.5 hover:-translate-y-0.5 hover:shadow-lg transition-all">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: `${ACCENT}1f` }}>{d.emoji}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-display font-extrabold text-sm">{d.company}</span>
                      {best !== undefined && <Badge variant="success" className="text-[9px]">✓ {best}×</Badge>}
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: ACCENT }}>{d.strategy}</p>
                    <p className="text-[11px] text-muted-foreground leading-snug mt-1">{d.tagline}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Badge variant="outline" className="text-[9px]">{d.sector}</Badge>
                      <Badge variant="secondary" className="text-[9px]">{d.difficulty}</Badge>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // ── finished (safety net; exits normally route back to the library) ──
  if (finished || !cur) {
    return (
      <div className="space-y-3">
        <Card variant="elevated" className="overflow-hidden">
          <div className={`bg-gradient-to-br ${career.gradient} p-5 text-white text-center`}>
            <Trophy className="h-8 w-8 mx-auto mb-1" />
            <p className="font-display text-lg font-extrabold">{t("bankCareers.dealRoom.complete.title")}</p>
            <p className="text-sm text-white/80">{t("bankCareers.dealRoom.complete.body")}</p>
          </div>
          <CardContent className="p-4">
            <Button className="w-full gap-1.5" onClick={() => { exitDeal(); setPaid(false) }}><ChevronLeft className="h-4 w-4" /> {t("bankCareers.dealRoom.backToLibrary")}</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* deal header */}
      <div className="flex items-center gap-2">
        <button onClick={() => exitDeal()} className="text-[11px] font-bold text-muted-foreground hover:text-foreground flex items-center gap-0.5 shrink-0">
          <ChevronLeft className="h-3.5 w-3.5" /> {t("bankCareers.dealRoom.library.short")}
        </button>
        <span className="text-muted-foreground/40">·</span>
        <span className="text-sm font-extrabold truncate">{deal.emoji} {deal.company}</span>
        <Badge variant="outline" className="text-[9px] ml-auto shrink-0" style={{ color: ACCENT }}>{deal.strategy}</Badge>
      </div>

      {/* phase progress */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {PHASES.map((p, i) => (
          <div key={p} className="flex items-center gap-1 shrink-0">
            <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap", i < phaseIdx ? "text-white" : i === phaseIdx ? "text-white" : "bg-muted text-muted-foreground/60")}
              style={i <= phaseIdx ? { background: i === phaseIdx ? ACCENT : `${ACCENT}77` } : undefined}>{p}</span>
            {i < PHASES.length - 1 && <ChevronRight className="h-3 w-3 text-muted-foreground/40" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_260px] gap-3 items-start">
        <AnimatePresence mode="wait">
          <motion.div key={cur.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }}>

            {/* ── EMAIL ── */}
            {cur.kind === "email" && (
              <Card variant="elevated" className="overflow-hidden">
                <div className="px-4 py-3 border-b border-border/60 bg-muted/30">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={cur.from.name} />
                    <div className="min-w-0">
                      <p className="text-sm font-bold leading-tight">{cur.from.name}</p>
                      <p className="text-[11px] text-muted-foreground leading-tight truncate">{cur.from.role}</p>
                    </div>
                    <Mail className="h-4 w-4 text-muted-foreground ml-auto shrink-0" />
                  </div>
                  <p className="text-sm font-extrabold mt-2">{cur.subject}</p>
                </div>
                <CardContent className="p-4 space-y-3">
                  {cur.body.map((p, i) => <p key={i} className="text-sm leading-relaxed text-foreground/90">{p}</p>)}
                  <p className="text-xs text-muted-foreground italic">{t("bankCareers.dealRoom.from", { name: cur.from.name })}</p>
                  <Button size="lg" className="w-full press-scale gap-1.5" onClick={() => go()}>{cur.cta} <ChevronRight className="h-4 w-4" /></Button>
                </CardContent>
              </Card>
            )}

            {/* ── DOCUMENT ── */}
            {cur.kind === "document" && (
              <Card variant="elevated" className="overflow-hidden">
                <div className={`bg-gradient-to-r ${career.gradient} px-4 py-3 text-white`}>
                  <p className="text-[10px] uppercase tracking-widest text-white/70 flex items-center gap-1"><FileText className="h-3 w-3" /> {t("bankCareers.dealRoom.confidential")}</p>
                  <p className="font-display font-extrabold">{cur.title}</p>
                  <p className="text-[11px] text-white/70">{cur.subtitle}</p>
                </div>
                <CardContent className="p-4 space-y-3">
                  <div className="rounded-lg border border-border/60 divide-y divide-border/50">
                    {cur.rows.map((row, i) => (
                      <div key={i} className="flex items-baseline justify-between gap-2 px-3 py-1.5">
                        <span className="text-[11px] text-muted-foreground">{row.k}</span>
                        <span className="text-xs font-bold text-right">{row.v}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-extrabold text-emerald-600 dark:text-emerald-400 mb-1">{t("bankCareers.dealRoom.whyAttractive")}</p>
                    <ul className="space-y-1">{cur.highlights.map((h, i) => <li key={i} className="text-xs text-foreground/85 flex gap-1.5"><span style={{ color: ACCENT }}>+</span>{h}</li>)}</ul>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-extrabold text-red-500 mb-1">{t("bankCareers.dealRoom.watchOutFor")}</p>
                    <ul className="space-y-1">{cur.risks.map((rk, i) => <li key={i} className="text-xs text-foreground/85 flex gap-1.5"><span className="text-red-500">!</span>{rk}</li>)}</ul>
                  </div>
                  <Button size="lg" className="w-full press-scale gap-1.5" onClick={() => go()}>{cur.cta} <ChevronRight className="h-4 w-4" /></Button>
                </CardContent>
              </Card>
            )}

            {/* ── DECISION ── */}
            {cur.kind === "decision" && (
              <Card variant="elevated" className="overflow-hidden">
                {cur.from && (
                  <div className="px-4 py-2.5 border-b border-border/60 bg-muted/30 flex items-center gap-2.5">
                    <Avatar name={cur.from.name} />
                    <div className="min-w-0"><p className="text-xs font-bold leading-tight">{cur.from.name}</p>{cur.subject && <p className="text-[11px] text-muted-foreground truncate">{cur.subject}</p>}</div>
                  </div>
                )}
                <CardContent className="p-4 space-y-3">
                  {cur.situation.map((p, i) => <p key={i} className="text-sm leading-relaxed text-foreground/90">{p}</p>)}
                  <p className="font-display font-extrabold">{cur.question}</p>
                  <div className="space-y-2">
                    {decisionChoices.map((ch, i) => {
                      const isPicked = picked === i
                      const revealed = picked !== null
                      return (
                        <button key={i} disabled={revealed} onClick={() => setPicked(i)}
                          className={cn("w-full text-left rounded-xl border-2 p-3 text-sm transition-all",
                            isPicked ? ch.points === 2 ? "border-primary bg-primary/10" : ch.points === 1 ? "border-amber-500 bg-amber-500/10" : "border-red-500 bg-red-500/10"
                              : revealed ? "border-border/50 opacity-45" : "border-border/60 hover:bg-muted/60")}>
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-medium">{ch.text}</span>
                            {isPicked && <PointBadge p={ch.points} />}
                          </div>
                          {isPicked && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2 text-xs text-muted-foreground leading-relaxed">{ch.feedback}</motion.p>}
                        </button>
                      )
                    })}
                  </div>
                  {picked !== null && (
                    <Button size="lg" className="w-full press-scale gap-1.5" onClick={() => go(applyChoice(vars, decisionChoices[picked]))}>{t("bankCareers.dealRoom.continue")} <ChevronRight className="h-4 w-4" /></Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* ── MEETING ── */}
            {cur.kind === "meeting" && (
              <Card variant="elevated" className="overflow-hidden">
                <div className="px-4 py-2.5 border-b border-border/60 bg-muted/30 flex items-center gap-2.5">
                  <Avatar name={cur.person.name} />
                  <div><p className="text-xs font-bold leading-tight">{cur.person.name}</p><p className="text-[11px] text-muted-foreground">{cur.person.role}</p></div>
                  <Badge variant="outline" className="ml-auto text-[10px] gap-1"><MessageSquare className="h-3 w-3" /> {t("bankCareers.dealRoom.pick", { count: cur.pickCount })}</Badge>
                </div>
                <CardContent className="p-4 space-y-3">
                  {cur.intro.map((p, i) => <p key={i} className="text-sm leading-relaxed text-foreground/90">{p}</p>)}
                  <div className="space-y-2">
                    {meetingOrder.map(origIdx => {
                      const q = cur.questions[origIdx]
                      const asked = meetingPicks.includes(origIdx)
                      const full = meetingPicks.length >= cur.pickCount
                      return (
                        <div key={origIdx}>
                          <button disabled={asked || full} onClick={() => setMeetingPicks(m => [...m, origIdx])}
                            className={cn("w-full text-left rounded-xl border-2 p-3 text-sm transition-all",
                              asked ? "border-primary/60 bg-primary/5" : full ? "border-border/50 opacity-40" : "border-border/60 hover:bg-muted/60")}>
                            <span className="font-medium">{q.q}</span>
                          </button>
                          {asked && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-foreground/80 leading-relaxed px-3 py-2">{q.a}</motion.p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  {meetingPicks.length >= cur.pickCount && (() => {
                    const keyCount = meetingPicks.filter(i => cur.questions[i].key).length
                    const patch: Partial<PeVars> = { score: vars.score + keyCount, buildQuality: clamp(vars.buildQuality + keyCount * 2) }
                    return (
                      <>
                        <p className="text-xs text-muted-foreground leading-relaxed border-t border-border/50 pt-2">
                          {keyCount === 3 ? t("bankCareers.dealRoom.meetingSummary.all") : keyCount >= 1 ? t("bankCareers.dealRoom.meetingSummary.some", { count: keyCount }) : t("bankCareers.dealRoom.meetingSummary.none")}
                        </p>
                        <Button size="lg" className="w-full press-scale gap-1.5" onClick={() => go(patch)}>{t("bankCareers.dealRoom.headBack")} <ChevronRight className="h-4 w-4" /></Button>
                      </>
                    )
                  })()}
                </CardContent>
              </Card>
            )}

            {/* ── NEGOTIATION ── */}
            {cur.kind === "negotiation" && (
              <Card variant="elevated" className="overflow-hidden">
                <div className={`bg-gradient-to-r ${career.gradient} px-4 py-3 text-white`}>
                  <p className="text-[10px] uppercase tracking-widest text-white/70 flex items-center gap-1"><Handshake className="h-3 w-3" /> {t("bankCareers.dealRoom.negotiation")}</p>
                  <p className="font-display font-extrabold">{cur.neg.title}</p>
                </div>
                <CardContent className="p-4 space-y-3">
                  {cur.neg.intro.map((p, i) => <p key={i} className="text-sm leading-relaxed text-foreground/90">{p}</p>)}
                  <NegotiationView neg={cur.neg} startRel={vars.bankerRel}
                    onFinish={(agreed, relDelta, pts) => {
                      const patch: Partial<PeVars> = {
                        [cur.neg.resultVar]: agreed,
                        bankerRel: clamp(vars.bankerRel + relDelta),
                        score: vars.score + pts,
                      } as Partial<PeVars>
                      addMemo({ careerId: career.id, week: 0, dealTitle: `${deal.company} · ${cur.neg.title}`, prompt: t("bankCareers.dealRoom.memo.negPrompt"), text: t("bankCareers.dealRoom.memo.negText", { amount: cur.neg.unit === "×" ? fmtX(agreed) : fmtM(agreed), name: cur.neg.counterparty }) })
                      go(patch)
                    }} />
                </CardContent>
              </Card>
            )}

            {/* ── MILESTONE ── */}
            {cur.kind === "milestone" && (
              <MilestoneCard step={cur} vars={vars} career={career} paid={paid}
                onContinue={() => {
                  if (!paid) {
                    if (cur.variant === "closed") {
                      const b = closeBonus(vars); earnJeffs(b, `${deal.company} closed: associate bonus`)
                    } else {
                      const ex = computeExit(vars); const carry = exitCarry(vars, ex.moic); earnJeffs(carry, `${deal.company} exit: carry (${ex.moic}×)`)
                    }
                    setPaid(true)
                  }
                  if (cur.variant === "exit") { finishDeal(deal.id, computeExit(vars).moic); setPaid(false) } else { go() }
                }} />
            )}

          </motion.div>
        </AnimatePresence>

        <div className="lg:sticky lg:top-3 space-y-2">
          <TermSheet v={vars} company={deal.company} />
          <button onClick={() => { if (confirm(t("bankCareers.dealRoom.restartConfirm"))) restart() }}
            className="w-full text-[11px] text-muted-foreground hover:text-foreground flex items-center justify-center gap-1 py-1">
            <RotateCcw className="h-3 w-3" /> {t("bankCareers.dealRoom.restartDeal")}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── milestone card (close / exit scorecard) ────────────────────────── */

function MilestoneCard({ step, vars, career, paid, onContinue }: { step: Extract<Step, { kind: "milestone" }>; vars: PeVars; career: Career; paid: boolean; onContinue: () => void }) {
  const { t } = useTranslation()
  const ex: ExitResult | null = step.variant === "exit" ? computeExit(vars) : null
  const bonus = step.variant === "closed" ? closeBonus(vars) : ex ? exitCarry(vars, ex.moic) : 0
  const grade = ex ? (ex.moic >= 3 ? t("bankCareers.dealRoom.grade.homeRun") : ex.moic >= 2 ? t("bankCareers.dealRoom.grade.strongWin") : ex.moic >= 1.3 ? t("bankCareers.dealRoom.grade.solid") : ex.moic >= 1 ? t("bankCareers.dealRoom.grade.moneyBack") : t("bankCareers.dealRoom.grade.loss")) : ""

  return (
    <Card variant="elevated" className="overflow-hidden">
      <div className={`bg-gradient-to-br ${career.gradient} p-5 text-white text-center`}>
        {step.variant === "closed" ? <Handshake className="h-8 w-8 mx-auto mb-1" /> : <Trophy className="h-8 w-8 mx-auto mb-1" />}
        <p className="font-display text-lg font-extrabold">{step.title}</p>
      </div>
      <CardContent className="p-4 space-y-3">
        {step.body.map((p, i) => <p key={i} className="text-sm leading-relaxed text-foreground/90">{p}</p>)}

        {step.variant === "exit" && ex && (
          <div className="rounded-xl border-2 p-3 space-y-2" style={{ borderColor: `${ACCENT}55` }}>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div><p className="text-[10px] text-muted-foreground uppercase font-bold">MOIC</p><p className="text-lg font-extrabold" style={{ color: ex.moic >= 1 ? "#10b981" : "#ef4444" }}>{ex.moic}×</p></div>
              <div><p className="text-[10px] text-muted-foreground uppercase font-bold">IRR</p><p className="text-lg font-extrabold" style={{ color: ex.irr >= 0 ? "#10b981" : "#ef4444" }}>{ex.irr}%</p></div>
              <div><p className="text-[10px] text-muted-foreground uppercase font-bold">{t("bankCareers.dealRoom.scorecard.grade")}</p><p className="text-sm font-extrabold pt-1">{grade}</p></div>
            </div>
            <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
              {t("bankCareers.dealRoom.scorecard.summary", { entryMult: fmtX(vars.entryMultiple), equity: fmtM(entryEquity(vars)), exitMult: fmtX(ex.exitMultiple), entryProfit: fmtM(vars.ebitda), exitProfit: fmtM(ex.exitEbitda) })}
            </p>
          </div>
        )}

        {step.variant === "closed" && (
          <div className="grid grid-cols-3 gap-2 text-center rounded-xl bg-muted/40 p-3">
            <div><p className="text-[10px] text-muted-foreground uppercase font-bold">{t("bankCareers.dealRoom.scorecard.price")}</p><p className="text-sm font-extrabold">{fmtM(entryEV(vars))}</p></div>
            <div><p className="text-[10px] text-muted-foreground uppercase font-bold">{t("bankCareers.dealRoom.scorecard.debt")}</p><p className="text-sm font-extrabold">{fmtM(entryDebt(vars))}</p></div>
            <div><p className="text-[10px] text-muted-foreground uppercase font-bold">{t("bankCareers.dealRoom.scorecard.yourEquity")}</p><p className="text-sm font-extrabold" style={{ color: ACCENT }}>{fmtM(entryEquity(vars))}</p></div>
          </div>
        )}

        <div className="flex items-center justify-center gap-1.5 text-sm font-bold" style={{ color: ACCENT }}>
          <Coins className="h-4 w-4" /> {step.variant === "closed" ? t("bankCareers.dealRoom.associateBonus", { amount: bonus.toLocaleString() }) : t("bankCareers.dealRoom.carriedInterest", { amount: bonus.toLocaleString() })}
        </div>

        <Button size="lg" className="w-full press-scale gap-1.5" onClick={onContinue}>
          {step.variant === "exit" ? <><RotateCcw className="h-4 w-4" /> {t("bankCareers.dealRoom.newDeal")}</> : <>{t("bankCareers.dealRoom.onTo100Day")} <ChevronRight className="h-4 w-4" /></>}
        </Button>
      </CardContent>
    </Card>
  )
}
