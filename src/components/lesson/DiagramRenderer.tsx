// DiagramRenderer — the "Explore" tier of the IB Economics module. Each
// interactive-diagram section names a single fixed economic model (see
// DiagramKind in src/types); this file owns one self-contained, animated SVG
// component per model plus the shared card chrome + Continue footer, mirroring
// the ActivityCheckRenderer pattern. Diagrams are exploratory, not scored.
//
// Styling: everything uses the app's semantic theme tokens (primary, gold,
// accent, success, warning, muted...) via Tailwind classes or `hsl(var(--…))`
// in raw SVG attributes, so the diagrams track light/dark mode automatically.
//
// Accessibility: no hover-only affordances carry meaning — every reveal is also
// reachable by tap/click and keyboard (<button>). Hover is a progressive
// enhancement on top of the click behaviour.
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Compass, ArrowRight, ChevronRight, Microscope, Telescope,
  Mountain, Users, Lightbulb, Building2,
} from "lucide-react"
import type { InteractiveDiagramSection, DiagramKind } from "@/types"

// ─────────────────────────────────────────────────────────────
// Shared shell: "Explore" header, optional title/caption, the diagram body,
// and the Continue button that advances the lesson.
// ─────────────────────────────────────────────────────────────
export function DiagramRenderer({
  section,
  onContinue,
}: {
  section: InteractiveDiagramSection
  onContinue: () => void
}) {
  return (
    <Card variant="elevated" className="overflow-hidden">
      <div className="bg-gold/10 border-b border-border px-6 py-3 flex items-center gap-2">
        <Compass className="w-4 h-4 text-gold" />
        <span className="text-xs font-semibold text-gold uppercase tracking-wider">Explore</span>
        <Badge variant="outline" className="ml-auto text-[10px] uppercase tracking-wide">Interactive</Badge>
      </div>
      <CardContent className="p-5 sm:p-6 space-y-4">
        {section.title && <h2 className="text-xl font-bold text-foreground">{section.title}</h2>}
        {section.caption && (
          <p className="text-sm text-muted-foreground leading-relaxed">{section.caption}</p>
        )}
        <DiagramBody diagram={section.diagram} />
        <div className="pt-1">
          <Button onClick={onContinue}>
            Continue <ArrowRight className="ml-1.5 w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function DiagramBody({ diagram }: { diagram: DiagramKind }) {
  switch (diagram) {
    case "concept-network": return <ConceptNetwork />
    case "factors-tree": return <FactorsTree />
    case "micro-macro": return <MicroMacro />
    case "economic-systems": return <EconomicSystems />
    case "ppf": return <PpfGraph />
    case "circular-flow": return <CircularFlow />
    default: return null
  }
}

// A small hint chip telling the student the diagram is tappable.
function TapHint({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground/80 flex items-center gap-1.5">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
      {children}
    </p>
  )
}

// ═══════════════════════════════════════════════════════════════
// 1. CONCEPT NETWORK — the 9 key concepts, scarcity at the hub.
// ═══════════════════════════════════════════════════════════════
type Concept = { key: string; label: string; def: string; why: string; example: string }

const CONCEPTS: Concept[] = [
  { key: "scarcity", label: "Scarcity", def: "Limited resources set against unlimited human wants and needs.", why: "It is the root problem of all economics — without scarcity there would be no need to choose.", example: "There is not enough farmland, oil, or doctors' time to give everyone all they want." },
  { key: "choice", label: "Choice", def: "Because resources are scarce, every decision-maker must pick between competing alternatives.", why: "Every choice reveals what a society values most and forces an opportunity cost.", example: "A government funds new hospitals instead of new highways this year." },
  { key: "efficiency", label: "Efficiency", def: "Making the best possible use of scarce resources with no waste.", why: "An efficient economy squeezes the most well-being out of what little it has.", example: "A factory reorganises its line to make more goods from the same workers and machines." },
  { key: "equity", label: "Equity", def: "Fairness or justice in how income and outcomes are distributed — fair, not necessarily equal.", why: "Markets can be efficient yet leave some people unable to meet basic needs.", example: "Progressive taxes fund support for low-income families." },
  { key: "wellbeing", label: "Economic Well-being", def: "Prosperity and standard of living: income security, opportunity, and quality of life over time.", why: "It is ultimately what economic activity is meant to raise.", example: "Rising real incomes and access to healthcare improve a nation's well-being." },
  { key: "sustainability", label: "Sustainability", def: "Meeting present needs without compromising future generations' ability to meet theirs.", why: "Resource use today can shrink the choices available tomorrow.", example: "Managing a fishery so stocks are not wiped out for the next generation." },
  { key: "change", label: "Change", def: "Economic conditions and relationships are constantly shifting; economists study the shift between situations.", why: "Understanding what moves and why is how policy is judged.", example: "A new technology lowers costs and changes what a country can produce." },
  { key: "interdependence", label: "Interdependence", def: "Individuals, firms, governments and nations depend on and interact with one another.", why: "No one is fully self-sufficient — decisions ripple outward.", example: "A drought abroad raises grain prices in shops at home." },
  { key: "intervention", label: "Intervention", def: "Government stepping into markets to fix problems of equity, sustainability, well-being or efficiency.", why: "Markets left alone can produce unfair or unsustainable outcomes.", example: "A carbon tax nudges firms to pollute less." },
]

function ConceptNetwork() {
  const [selected, setSelected] = useState<string>("scarcity")
  const cx = 180, cy = 150, R = 112
  const outer = CONCEPTS.slice(1) // scarcity is the hub
  const pos = (i: number) => {
    const a = (i / outer.length) * Math.PI * 2 - Math.PI / 2
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) }
  }
  const current = CONCEPTS.find((c) => c.key === selected)!

  return (
    <div className="space-y-3">
      <TapHint>Tap a concept to explore how it connects to scarcity</TapHint>
      <div className="grid md:grid-cols-2 gap-4 items-center">
        <svg viewBox="0 0 360 300" className="w-full h-auto" role="img" aria-label="Network of the nine key economic concepts around scarcity">
          {/* connecting spokes */}
          {outer.map((c, i) => {
            const p = pos(i)
            const active = selected === c.key || selected === "scarcity"
            return (
              <motion.line
                key={c.key}
                x1={cx} y1={cy} x2={p.x} y2={p.y}
                stroke="hsl(var(--primary))"
                strokeWidth={selected === c.key ? 2.5 : 1}
                initial={{ opacity: 0 }}
                animate={{ opacity: active ? 0.5 : 0.12 }}
                transition={{ duration: 0.4 }}
              />
            )
          })}
          {/* outer nodes */}
          {outer.map((c, i) => {
            const p = pos(i)
            const isSel = selected === c.key
            return (
              <g key={c.key} onClick={() => setSelected(c.key)} className="cursor-pointer" role="button" tabIndex={0}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelected(c.key) }}>
                <motion.circle
                  cx={p.x} cy={p.y} r={isSel ? 26 : 22}
                  fill={isSel ? "hsl(var(--primary))" : "hsl(var(--card))"}
                  stroke="hsl(var(--primary))" strokeWidth={1.5}
                  whileHover={{ scale: 1.08 }}
                />
                <text x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central"
                      className="pointer-events-none select-none"
                      fontSize={8} fontWeight={600}
                      fill={isSel ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))"}>
                  {c.label.length > 12 ? c.label.split(" ").map((w, wi) => (
                    <tspan key={wi} x={p.x} dy={wi === 0 ? -4 : 9}>{w}</tspan>
                  )) : c.label}
                </text>
              </g>
            )
          })}
          {/* hub */}
          <g onClick={() => setSelected("scarcity")} className="cursor-pointer" role="button" tabIndex={0}
             onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelected("scarcity") }}>
            <motion.circle cx={cx} cy={cy} r={34}
              fill={selected === "scarcity" ? "hsl(var(--gold))" : "hsl(var(--gold) / 0.85)"}
              stroke="hsl(var(--gold))" strokeWidth={2} whileHover={{ scale: 1.06 }} />
            <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight={700}
                  fill="hsl(var(--gold-foreground))" className="pointer-events-none select-none">Scarcity</text>
          </g>
        </svg>

        <AnimatePresence mode="wait">
          <motion.div key={current.key}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="bg-muted/40 rounded-xl p-4 border border-border space-y-2">
            <h3 className="text-base font-bold text-foreground">{current.label}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{current.def}</p>
            <p className="text-xs text-foreground"><span className="font-semibold text-primary">Why it matters: </span>{current.why}</p>
            <div className="bg-card rounded-lg p-2.5 border border-border">
              <p className="text-[11px] font-semibold text-foreground flex items-center gap-1 mb-0.5">
                <Lightbulb className="w-3 h-3 text-gold" /> In practice
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">{current.example}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// 2. FACTORS OF PRODUCTION — expandable tree.
// ═══════════════════════════════════════════════════════════════
type FactorNode = { label: string; blurb: string; children?: FactorNode[] }
const FACTORS: { icon: React.ComponentType<{ className?: string }>; node: FactorNode }[] = [
  { icon: Mountain, node: { label: "Land", blurb: "All natural resources ('gifts of nature') used to produce.", children: [
    { label: "Natural resources", blurb: "Minerals, oil, fertile soil, fish stocks." },
    { label: "Climate & geography", blurb: "Rainfall, sunlight, harbours, arable terrain." },
  ] } },
  { icon: Users, node: { label: "Labour", blurb: "The physical and mental human effort used in production.", children: [
    { label: "Unskilled workers", blurb: "Labour needing little specific training." },
    { label: "Skilled workers", blurb: "Labour with trade or technical training." },
    { label: "Professional expertise", blurb: "Doctors, engineers, specialists." },
  ] } },
  { icon: Building2, node: { label: "Capital", blurb: "Manufactured resources used to produce other goods — four kinds.", children: [
    { label: "Physical capital", blurb: "Machinery, tools, factory buildings." },
    { label: "Human capital", blurb: "The skills, knowledge and health embodied in workers." },
    { label: "Natural capital", blurb: "Forests, water, and ecosystems as productive assets." },
    { label: "Financial capital", blurb: "Money and funds channelled into investment." },
  ] } },
  { icon: Lightbulb, node: { label: "Entrepreneurship", blurb: "Organising the other three factors and bearing the risk.", children: [
    { label: "Risk-taking", blurb: "Committing resources with no guaranteed return." },
    { label: "Innovation", blurb: "Bringing new products and methods to market." },
    { label: "Organisation", blurb: "Combining land, labour and capital into output." },
  ] } },
]

function FactorsTree() {
  const [open, setOpen] = useState<string | null>("Land")
  return (
    <div className="space-y-3">
      <TapHint>Tap a factor to expand its categories</TapHint>
      <div className="grid sm:grid-cols-2 gap-3">
        {FACTORS.map(({ icon: Icon, node }) => {
          const isOpen = open === node.label
          return (
            <div key={node.label} className="rounded-xl border border-border bg-card overflow-hidden">
              <button
                onClick={() => setOpen(isOpen ? null : node.label)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/40 transition-colors"
                aria-expanded={isOpen}>
                <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-bold text-foreground">{node.label}</span>
                  <span className="block text-xs text-muted-foreground truncate">{node.blurb}</span>
                </span>
                <motion.span animate={{ rotate: isOpen ? 90 : 0 }} className="text-muted-foreground">
                  <ChevronRight className="w-4 h-4" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }} className="overflow-hidden border-t border-border">
                    {node.children!.map((ch) => (
                      <li key={ch.label} className="px-4 py-2 pl-14 border-b border-border/60 last:border-b-0">
                        <span className="block text-xs font-semibold text-foreground">{ch.label}</span>
                        <span className="block text-xs text-muted-foreground">{ch.blurb}</span>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// 3. MICRO vs MACRO — microscope vs. telescope, tap to expand.
// ═══════════════════════════════════════════════════════════════
function MicroMacro() {
  const [side, setSide] = useState<"micro" | "macro">("micro")
  const data = {
    micro: {
      icon: Microscope, tint: "primary", tag: "Microscope",
      title: "Microeconomics",
      blurb: "Zooms in on individual decision-makers — single consumers, households, and firms — and how one market sets one price.",
      bullets: ["An individual consumer's choice", "One firm's pricing and hiring", "The labour market for a single industry"],
      qs: ["Why does a latte cost $5?", "Why do nurses earn more than baristas?"],
    },
    macro: {
      icon: Telescope, tint: "gold", tag: "Telescope",
      title: "Macroeconomics",
      blurb: "Pulls back to the whole economy, studying aggregates — total output, total employment, and the overall price level.",
      bullets: ["The national unemployment rate", "GDP growth for the country", "Inflation across the whole economy"],
      qs: ["Why is the economy growing?", "What causes inflation everywhere at once?"],
    },
  } as const
  return (
    <div className="space-y-3">
      <TapHint>Tap either lens to compare the two views</TapHint>
      <div className="grid grid-cols-2 gap-3">
        {(["micro", "macro"] as const).map((k) => {
          const d = data[k]; const Icon = d.icon; const active = side === k
          const tintBg = d.tint === "primary" ? "bg-primary" : "bg-gold"
          const tintText = d.tint === "primary" ? "text-primary" : "text-gold"
          return (
            <button key={k} onClick={() => setSide(k)} aria-pressed={active}
              className={`rounded-xl border p-4 text-left transition-all ${active ? `border-transparent ring-2 ${d.tint === "primary" ? "ring-primary" : "ring-gold"} bg-muted/40` : "border-border bg-card hover:bg-muted/30"}`}>
              <span className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-2 ${active ? tintBg : "bg-muted"}`}>
                <Icon className={`w-5 h-5 ${active ? (d.tint === "primary" ? "text-primary-foreground" : "text-gold-foreground") : "text-muted-foreground"}`} />
              </span>
              <span className={`block text-[10px] font-semibold uppercase tracking-wide ${tintText}`}>{d.tag}</span>
              <span className="block text-sm font-bold text-foreground">{d.title}</span>
            </button>
          )
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={side}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}
          className="bg-muted/40 rounded-xl p-4 border border-border space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">{data[side].blurb}</p>
          <ul className="grid sm:grid-cols-3 gap-2">
            {data[side].bullets.map((b) => (
              <li key={b} className="text-xs text-foreground bg-card rounded-lg p-2 border border-border">{b}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {data[side].qs.map((q) => (
              <span key={q} className="text-xs italic text-muted-foreground bg-card rounded-full px-3 py-1 border border-border">“{q}”</span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// 4. ECONOMIC SYSTEMS — Traditional / Market / Command / Mixed.
// ═══════════════════════════════════════════════════════════════
type SystemRow = {
  key: string; name: string; what: string; how: string; forWhom: string
  pros: string; cons: string; examples: string
}
const SYSTEMS: SystemRow[] = [
  { key: "traditional", name: "Traditional", what: "Custom & ritual decide.", how: "Family / tribe methods passed down.", forWhom: "By family and social rank.", pros: "Stable and socially cohesive.", cons: "Inefficient, little innovation.", examples: "🌾 Indigenous / subsistence economies" },
  { key: "market", name: "Market", what: "Price signals decide.", how: "Competition between private firms.", forWhom: "By profit and buying power.", pros: "Efficient, innovative, wide choice.", cons: "Inequality and instability.", examples: "🇺🇸 USA · 🇬🇧 UK" },
  { key: "command", name: "Command", what: "A central plan decides.", how: "The state dictates methods.", forWhom: "Egalitarian in theory.", pros: "Mobilises resources, guarantees basics.", cons: "Inefficient, stifles innovation, corruption.", examples: "🇰🇵 North Korea · pre-1990 🇷🇺 USSR" },
  { key: "mixed", name: "Mixed", what: "Markets plus government.", how: "Markets plus regulation.", forWhom: "Markets plus safety nets.", pros: "Balances growth and fairness.", cons: "Regulation friction; inequality remains.", examples: "🇩🇪 Germany · 🇨🇦 Canada · most of the EU" },
]
const SYS_TINT: Record<string, string> = {
  traditional: "warning", market: "primary", command: "destructive", mixed: "success",
}

function EconomicSystems() {
  const [sel, setSel] = useState<string>("market")
  const cur = SYSTEMS.find((s) => s.key === sel)!
  const tint = SYS_TINT[sel]
  return (
    <div className="space-y-3">
      <TapHint>Tap a system to see how it answers the three questions</TapHint>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {SYSTEMS.map((s) => {
          const active = sel === s.key; const t = SYS_TINT[s.key]
          return (
            <button key={s.key} onClick={() => setSel(s.key)} aria-pressed={active}
              className={`rounded-lg border px-3 py-2.5 text-sm font-bold transition-all ${active ? "text-white border-transparent" : "bg-card text-foreground border-border hover:bg-muted/40"}`}
              style={active ? { backgroundColor: `hsl(var(--${t}))` } : undefined}>
              {s.name}
            </button>
          )
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={cur.key}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}
          className="rounded-xl border border-border overflow-hidden">
          <div className="px-4 py-2.5 text-white text-sm font-bold" style={{ backgroundColor: `hsl(var(--${tint}))` }}>
            {cur.name} economy
          </div>
          <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border bg-card">
            {[["What to produce?", cur.what], ["How to produce?", cur.how], ["For whom?", cur.forWhom]].map(([q, a]) => (
              <div key={q} className="p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{q}</p>
                <p className="text-sm text-foreground mt-0.5">{a}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 divide-x divide-border border-t border-border bg-muted/30">
            <div className="p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-success">Strengths</p>
              <p className="text-sm text-foreground mt-0.5">{cur.pros}</p>
            </div>
            <div className="p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-destructive">Weaknesses</p>
              <p className="text-sm text-foreground mt-0.5">{cur.cons}</p>
            </div>
          </div>
          <div className="px-4 py-2.5 border-t border-border bg-card">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Examples </span>
            <span className="text-sm text-foreground">{cur.examples}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// 5. PPF — Production Possibilities Curve with scenarios.
// ═══════════════════════════════════════════════════════════════
// Plot geometry. Origin at bottom-left of the plot area; the base curve is a
// quadratic Bézier bowed away from the origin (concave to origin), the standard
// PPF shape reflecting increasing opportunity cost.
const OX = 52, OY = 232, TOP = 40, RIGHT = 330 // axis extents in the 360×260 viewBox
// Base curve control points: P0 (all Y), C (outer corner), P1 (all X).
const P0 = { x: OX, y: TOP }, PC = { x: RIGHT, y: TOP }, P1 = { x: RIGHT, y: OY }
function ppfPoint(t: number) {
  const mt = 1 - t
  return {
    x: mt * mt * P0.x + 2 * mt * t * PC.x + t * t * P1.x,
    y: mt * mt * P0.y + 2 * mt * t * PC.y + t * t * P1.y,
  }
}
const BASE_PATH = `M ${P0.x} ${P0.y} Q ${PC.x} ${PC.y} ${P1.x} ${P1.y}`

type Scenario = "none" | "actual" | "potential" | "tech" | "resource"
const SCENARIO_INFO: Record<Exclude<Scenario, "none">, { label: string; text: string }> = {
  actual:   { label: "Actual growth", text: "Point D was inside the curve — resources sat idle. Putting them to work moves the economy ONTO the frontier. Output rises with no new resources: this is actual growth (using existing capacity fully)." },
  potential:{ label: "Potential growth", text: "More or better resources push the entire frontier outward. Combinations that were once unattainable (E, F) become possible. This rise in productive capacity is potential growth." },
  tech:     { label: "Technology (Good X)", text: "A technology that helps only Good X pivots the curve outward along the X-axis while the Y-intercept stays put — the economy can make far more X for any given amount of Y." },
  resource: { label: "More resources", text: "An equal increase in resources useful to both goods shifts the whole curve outward symmetrically — more of everything becomes possible." },
}

function PpfGraph() {
  const [sc, setSc] = useState<Scenario>("none")
  const A = ppfPoint(0.22), B = ppfPoint(0.5), C = ppfPoint(0.78)
  const D = { x: 150, y: 175 } // inside the curve (inefficient)
  const E = ppfPoint(0.5)      // will render outside once curve grows; label as unattainable
  const shifted = sc === "potential" || sc === "resource" || sc === "tech"
  // outward curve for growth scenarios
  const outCurve = sc === "tech"
    ? `M ${P0.x} ${P0.y} Q ${RIGHT + 34} ${TOP} ${RIGHT + 34} ${OY}` // pivot on X only
    : `M ${P0.x} ${TOP - 26} Q ${RIGHT + 26} ${TOP - 26} ${RIGHT + 26} ${OY}` // symmetric out

  return (
    <div className="grid md:grid-cols-2 gap-4 items-start">
      <div className="space-y-3">
        <svg viewBox="0 0 360 260" className="w-full h-auto" role="img" aria-label="Production possibilities curve">
          {/* axes */}
          <line x1={OX} y1={TOP - 6} x2={OX} y2={OY} stroke="hsl(var(--foreground))" strokeWidth={1.5} />
          <line x1={OX} y1={OY} x2={RIGHT + 8} y2={OY} stroke="hsl(var(--foreground))" strokeWidth={1.5} />
          <text x={OX - 6} y={TOP - 12} fontSize={9} fill="hsl(var(--muted-foreground))" textAnchor="start">Good Y</text>
          <text x={RIGHT + 4} y={OY + 16} fontSize={9} fill="hsl(var(--muted-foreground))" textAnchor="end">Good X</text>

          {/* grown frontier */}
          <AnimatePresence>
            {shifted && (
              <motion.path key={sc} d={outCurve} fill="none" stroke="hsl(var(--gold))" strokeWidth={2.5}
                initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }} />
            )}
          </AnimatePresence>

          {/* base frontier */}
          <path d={BASE_PATH} fill="none" stroke="hsl(var(--primary))" strokeWidth={2.5}
                opacity={shifted ? 0.35 : 1} />

          {/* efficient points A B C */}
          {[["A", A], ["B", B], ["C", C]].map(([lbl, p]) => {
            const pt = p as { x: number; y: number }
            return (
              <g key={lbl as string}>
                <circle cx={pt.x} cy={pt.y} r={4} fill="hsl(var(--primary))" />
                <text x={pt.x + 7} y={pt.y - 5} fontSize={9} fontWeight={700} fill="hsl(var(--foreground))">{lbl as string}</text>
              </g>
            )
          })}

          {/* inefficient point D — animates onto the curve on "actual growth" */}
          <motion.g animate={sc === "actual" ? { x: B.x - D.x, y: B.y - D.y } : { x: 0, y: 0 }} transition={{ duration: 0.7 }}>
            <circle cx={D.x} cy={D.y} r={4} fill="hsl(var(--destructive))" />
            <text x={D.x - 12} y={D.y + 4} fontSize={9} fontWeight={700} fill="hsl(var(--destructive))">D</text>
          </motion.g>

          {/* unattainable point E (only meaningful before growth) */}
          {!shifted && (
            <g>
              <circle cx={E.x + 40} cy={E.y - 40} r={4} fill="hsl(var(--muted-foreground))" />
              <text x={E.x + 46} y={E.y - 44} fontSize={9} fontWeight={700} fill="hsl(var(--muted-foreground))">E</text>
            </g>
          )}
        </svg>
        <div className="flex flex-wrap gap-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: "hsl(var(--primary))" }} /> On the curve = efficient</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: "hsl(var(--destructive))" }} /> Inside = idle resources</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: "hsl(var(--muted-foreground))" }} /> Outside = unattainable</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(SCENARIO_INFO) as Exclude<Scenario, "none">[]).map((k) => (
            <button key={k} onClick={() => setSc(sc === k ? "none" : k)} aria-pressed={sc === k}
              className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${sc === k ? "bg-primary text-primary-foreground border-transparent" : "bg-card text-foreground border-border hover:bg-muted/40"}`}>
              {SCENARIO_INFO[k].label}
            </button>
          ))}
        </div>
        <div className="bg-muted/40 rounded-xl p-4 border border-border min-h-[112px]">
          <AnimatePresence mode="wait">
            <motion.p key={sc} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-sm text-muted-foreground leading-relaxed">
              {sc === "none"
                ? "The curve shows every efficient combination of two goods a country can make with its resources fully employed. Tap a scenario to see the frontier respond."
                : SCENARIO_INFO[sc].text}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="bg-card rounded-xl p-3 border border-border">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-primary mb-1">Model assumptions</p>
          <ul className="text-xs text-muted-foreground space-y-0.5 list-disc pl-4">
            <li>Only two goods are produced</li>
            <li>Resources are fixed in quantity and quality</li>
            <li>Technology is constant</li>
            <li>Resources are fully and efficiently employed</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// 6. CIRCULAR FLOW — Households ↔ Firms, real & money flows.
// ═══════════════════════════════════════════════════════════════
type Flow = { key: string; label: string; detail: string; color: string; path: string; mid: { x: number; y: number } }
const FLOWS: Flow[] = [
  { key: "factors", label: "Factors of production", detail: "Households supply land, labour and capital to firms.", color: "primary",
    path: "M 118 96 C 165 70, 195 70, 242 96", mid: { x: 180, y: 66 } },
  { key: "income", label: "Factor income (money)", detail: "Firms pay rent, wages, interest and profit back to households.", color: "gold",
    path: "M 118 118 C 165 142, 195 142, 242 118", mid: { x: 180, y: 150 } },
  { key: "spending", label: "Consumer spending (money)", detail: "Households spend income on goods and services.", color: "success",
    path: "M 118 196 C 165 170, 195 170, 242 196", mid: { x: 180, y: 166 } },
  { key: "goods", label: "Goods & services", detail: "Firms supply finished goods and services to households.", color: "destructive",
    path: "M 118 218 C 165 244, 195 244, 242 218", mid: { x: 180, y: 250 } },
]

function CircularFlow() {
  const [active, setActive] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)
  const cur = FLOWS.find((f) => f.key === active)
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <TapHint>Tap any arrow to see what flows</TapHint>
        <button onClick={() => setShowAll((s) => !s)}
          className="text-xs font-semibold text-primary hover:underline">
          {showAll ? "Hide all labels" : "Show all labels"}
        </button>
      </div>
      <svg viewBox="0 0 360 300" className="w-full h-auto" role="img" aria-label="Circular flow of income between households and firms">
        <defs>
          {["primary", "gold", "success", "destructive"].map((c) => (
            <marker key={c} id={`arrow-${c}`} markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={`hsl(var(--${c}))`} />
            </marker>
          ))}
        </defs>

        {/* the two sectors */}
        <g>
          <rect x="18" y="118" width="100" height="78" rx="12" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth={1.5} />
          <text x="68" y="150" textAnchor="middle" fontSize={11} fontWeight={700} fill="hsl(var(--foreground))">Households</text>
          <text x="68" y="166" textAnchor="middle" fontSize={8} fill="hsl(var(--muted-foreground))">own the factors</text>
        </g>
        <g>
          <rect x="242" y="118" width="100" height="78" rx="12" fill="hsl(var(--gold) / 0.14)" stroke="hsl(var(--gold))" strokeWidth={1.5} />
          <text x="292" y="150" textAnchor="middle" fontSize={11} fontWeight={700} fill="hsl(var(--foreground))">Firms</text>
          <text x="292" y="166" textAnchor="middle" fontSize={8} fill="hsl(var(--muted-foreground))">produce output</text>
        </g>

        {/* flows */}
        {FLOWS.map((f) => {
          const isOn = active === f.key || showAll
          return (
            <g key={f.key} onClick={() => setActive(active === f.key ? null : f.key)} className="cursor-pointer"
               role="button" tabIndex={0}
               onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActive(active === f.key ? null : f.key) }}>
              {/* fat invisible hit area */}
              <path d={f.path} fill="none" stroke="transparent" strokeWidth={18} />
              <path d={f.path} fill="none" stroke={`hsl(var(--${f.color}))`} strokeWidth={active === f.key ? 3 : 2}
                    opacity={active && active !== f.key && !showAll ? 0.3 : 1}
                    markerEnd={`url(#arrow-${f.color})`} />
              {isOn && (
                <text x={f.mid.x} y={f.mid.y} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={`hsl(var(--${f.color}))`}
                      className="pointer-events-none select-none">{f.label}</text>
              )}
            </g>
          )
        })}
      </svg>

      <div className="grid grid-cols-2 gap-2">
        {FLOWS.map((f) => (
          <button key={f.key} onClick={() => setActive(active === f.key ? null : f.key)}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left transition-all ${active === f.key ? "border-transparent ring-2 bg-muted/40" : "border-border bg-card hover:bg-muted/30"}`}
            style={active === f.key ? { boxShadow: `0 0 0 2px hsl(var(--${f.color}))` } : undefined}>
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: `hsl(var(--${f.color}))` }} />
            <span className="text-xs font-semibold text-foreground">{f.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {cur ? (
          <motion.div key={cur.key} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            className="bg-muted/40 rounded-xl p-3 border border-border">
            <p className="text-sm text-foreground"><span className="font-semibold" style={{ color: `hsl(var(--${cur.color}))` }}>{cur.label}: </span>{cur.detail}</p>
          </motion.div>
        ) : (
          <motion.div key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="bg-card rounded-xl p-3 border border-border">
            <p className="text-xs text-muted-foreground">The <span className="font-semibold text-primary">real flow</span> (factors and goods) runs opposite to the <span className="font-semibold text-gold">money flow</span> (income and spending). One household's spending is another's income — the loop never stops.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
