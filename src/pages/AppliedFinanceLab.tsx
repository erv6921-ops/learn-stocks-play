import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GameNav from "@/components/GameNav";
import taxDocIcon from "@/assets/icons/tax-document.png";
import employmentIcon from "@/assets/icons/employment-briefcase.png";
import bankingIcon from "@/assets/icons/banking-building.png";
import creditCardIcon from "@/assets/icons/credit-card.png";
import insuranceShieldIcon from "@/assets/icons/insurance-shield.png";
import investingChartIcon from "@/assets/icons/investing-chart.png";
import retirementBeachIcon from "@/assets/icons/retirement-beach.png";
import estateScrollIcon from "@/assets/icons/estate-scroll.png";
import governmentBuildingIcon from "@/assets/icons/government-building.png";
import smallBusinessIcon from "@/assets/icons/small-business.png";
import advancedWealthIcon from "@/assets/icons/advanced-wealth.png";
import realEstateIcon from "@/assets/icons/real-estate-house.png";
import { labCategories } from "@/data/labDocuments";
import { ArrowRight, Lock, Coins, Clock, FlaskConical, CheckCircle2 } from "lucide-react";

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: "text-success",
  intermediate: "text-warning",
  advanced: "text-destructive"
};
const DIFFICULTY_DOT: Record<string, string> = {
  beginner: "bg-success",
  intermediate: "bg-warning",
  advanced: "bg-destructive"
};

// Category id → illustrated icon. Falls back to the category's emoji.
const CATEGORY_ICONS: Record<string, string> = {
  taxes: taxDocIcon,
  employment: employmentIcon,
  banking: bankingIcon,
  "credit-loans": creditCardIcon,
  insurance: insuranceShieldIcon,
  investing: investingChartIcon,
  retirement: retirementBeachIcon,
  estate: estateScrollIcon,
  government: governmentBuildingIcon,
  "small-business": smallBusinessIcon,
  "advanced-wealth": advancedWealthIcon,
  "real-estate": realEstateIcon,
};

// A signature hue per category, so the index reads as a colour-coded dossier.
const CATEGORY_HUE: Record<string, number> = {
  taxes: 160,
  employment: 210,
  banking: 182,
  "credit-loans": 268,
  insurance: 192,
  investing: 42,
  retirement: 24,
  estate: 338,
  government: 244,
  "small-business": 146,
  "advanced-wealth": 50,
  "real-estate": 200,
};

const catIcon = (id: string) => CATEGORY_ICONS[id];
const catHue = (id: string) => CATEGORY_HUE[id] ?? 170;

export default function AppliedFinanceLab() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(labCategories[0]?.id);
  const active = labCategories.find((c) => c.id === selectedId) ?? labCategories[0];

  const totalDocs = labCategories.reduce((s, c) => s + c.documents.length, 0);
  const availableDocs = labCategories.reduce(
    (s, c) => s + c.documents.filter((d) => d.available).length,
    0
  );

  const activeHue = catHue(active.id);
  const activeAvailable = active.documents.filter((d) => d.available).length;
  const activeReward = active.documents.reduce((s, d) => s + d.reward, 0);

  return (
    <div className="min-h-screen bg-background">
      <GameNav />

      <main className="container mx-auto px-4 py-8 pb-24 md:pb-10 max-w-6xl">
        {/* Hero */}
        <div
          className="rounded-2xl p-6 md:p-7 mb-6 border border-white/[0.06] relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(170 72% 12%) 0%, hsl(170 55% 18%) 50%, hsl(168 50% 22%) 100%)"
          }}>

          {/* Blueprint grid texture — evokes a workshop/lab bench */}
          <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, hsl(42 85% 48% / 0.18), hsl(42 85% 48% / 0.05))", border: "1px solid hsl(42 85% 48% / 0.15)" }}>

                  <FlaskConical className="w-5 h-5" style={{ color: "hsl(42 85% 55%)" }} />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Applied Finance Lab</h1>
                  <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">Educational Simulation</p>
                </div>
              </div>
              <p className="text-white/55 text-sm max-w-xl leading-relaxed">
                Practice filling out real-world financial documents in a safe, guided environment.
                Pick a topic to open its case file.
              </p>
            </div>

            {/* Library progress */}
            <div className="md:w-64 shrink-0">
              <div className="flex items-center justify-between text-[11px] font-semibold text-white/55 mb-1.5">
                <span className="uppercase tracking-wider">Document Library</span>
                <span>{availableDocs}/{totalDocs}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full bg-gold transition-all"
                  style={{ width: `${totalDocs ? (availableDocs / totalDocs) * 100 : 0}%` }} />
              </div>
              <p className="text-[11px] text-white/40 mt-1.5">{labCategories.length} topics · {totalDocs} documents</p>
            </div>
          </div>
        </div>

        {/* Master–detail: topic rail on the left, the chosen case file on the right */}
        <div className="grid lg:grid-cols-5 gap-5 items-start">
          {/* Topic rail */}
          <aside className="lg:col-span-2 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6.5rem)] lg:overflow-y-auto pr-1 -mr-1">
            <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground px-1 mb-2">Case Files</p>
            <div className="space-y-1.5">
              {labCategories.map((cat) => {
                const hue = catHue(cat.id);
                const icon = catIcon(cat.id);
                const avail = cat.documents.filter((d) => d.available).length;
                const pct = cat.documents.length ? (avail / cat.documents.length) * 100 : 0;
                const allUnlocked = avail === cat.documents.length;
                const isActive = cat.id === active.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedId(cat.id)}
                    className={`w-full text-left flex items-center gap-3 p-2.5 rounded-xl border transition-all press-scale ${
                      isActive ? "bg-card shadow-sm" : "border-transparent hover:bg-muted/50"
                    }`}
                    style={isActive ? { borderColor: `hsl(${hue} 60% 48% / 0.4)`, borderLeftWidth: 3, borderLeftColor: `hsl(${hue} 65% 45%)` } : undefined}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `hsl(${hue} 60% 48% / 0.12)`, border: `1px solid hsl(${hue} 60% 48% / 0.18)` }}>
                      {icon ? <img src={icon} alt="" className="w-6 h-6 rounded object-cover" /> : <span className="text-lg">{cat.icon}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className={`font-bold text-sm truncate ${isActive ? "text-foreground" : "text-foreground/90"}`}>{cat.title}</h3>
                        {allUnlocked && <CheckCircle2 className="w-3 h-3 text-success shrink-0" />}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="h-1 w-16 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: `hsl(${hue} 65% 45%)` }} />
                        </div>
                        <span className="text-[10px] text-muted-foreground font-medium">{avail}/{cat.documents.length}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Selected case file */}
          <section className="lg:col-span-3">
            {/* Topic header */}
            <div className="rounded-2xl border border-border bg-card p-5 mb-3 relative overflow-hidden"
              style={{ borderLeft: `3px solid hsl(${activeHue} 65% 45%)` }}>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: `hsl(${activeHue} 60% 48% / 0.12)`, border: `1px solid hsl(${activeHue} 60% 48% / 0.2)` }}>
                  {catIcon(active.id) ? <img src={catIcon(active.id)} alt="" className="w-9 h-9 rounded-lg object-cover" /> : <span className="text-3xl">{active.icon}</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-display text-xl font-extrabold text-foreground">{active.title}</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">{active.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs font-semibold">
                    <span className="flex items-center gap-1 text-gold"><Coins className="w-3.5 h-3.5" />{activeReward.toLocaleString()} total</span>
                    <span className="text-muted-foreground">{activeAvailable}/{active.documents.length} unlocked</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <ol className="space-y-2">
              {active.documents.map((doc, i) => (
                <li
                  key={doc.id}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border bg-card transition-all ${
                    doc.available
                      ? "border-border hover:border-primary/40 hover:shadow-sm cursor-pointer"
                      : "border-dashed border-border/60 opacity-55"
                  }`}
                  onClick={() => doc.available && navigate(`/lab/${doc.id}`)}
                >
                  {/* Index chip / lock */}
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold tabular-nums"
                    style={doc.available ? { background: `hsl(${activeHue} 60% 48% / 0.1)`, color: `hsl(${activeHue} 55% 38%)` } : undefined}>
                    {doc.available ? String(i + 1).padStart(2, "0") : <Lock className="w-3.5 h-3.5 text-muted-foreground" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{doc.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{doc.subtitle}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${DIFFICULTY_DOT[doc.difficulty]}`} />
                      <span className={`text-[10px] font-semibold uppercase ${DIFFICULTY_COLORS[doc.difficulty]}`}>{doc.difficulty}</span>
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-0.5"><Clock className="w-3 h-3" />{doc.estimatedMinutes}m</span>
                    <span className="flex items-center gap-0.5 text-xs text-gold font-semibold"><Coins className="w-3 h-3" />{doc.reward}</span>
                    {doc.available
                      ? <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      : <span className="text-[10px] font-semibold uppercase text-muted-foreground">Soon</span>}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </main>
    </div>);

}
