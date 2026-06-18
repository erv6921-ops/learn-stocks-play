import React from "react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

// A signature hue per category, so the index reads as a colour-coded dossier
// rather than another grid of identical cards. Kept in the brand's family.
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

export default function AppliedFinanceLab() {
  const navigate = useNavigate();

  const totalDocs = labCategories.reduce((s, c) => s + c.documents.length, 0);
  const availableDocs = labCategories.reduce(
    (s, c) => s + c.documents.filter((d) => d.available).length,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <GameNav />

      <main className="container mx-auto px-4 py-8 pb-24 md:pb-10 max-w-3xl">
        {/* Hero */}
        <div
          className="rounded-2xl p-6 md:p-8 mb-6 border border-white/[0.06] relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(170 72% 12%) 0%, hsl(170 55% 18%) 50%, hsl(168 50% 22%) 100%)"
          }}>

          {/* Blueprint grid texture — evokes a workshop/lab bench */}
          <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

          <div className="relative z-10">
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

            {/* Library progress */}
            <div className="mt-5 max-w-sm">
              <div className="flex items-center justify-between text-[11px] font-semibold text-white/55 mb-1.5">
                <span className="uppercase tracking-wider">Document Library</span>
                <span>{availableDocs}/{totalDocs} unlocked</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full bg-gold transition-all"
                  style={{ width: `${totalDocs ? (availableDocs / totalDocs) * 100 : 0}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Section label */}
        <div className="flex items-center gap-2 mb-3 px-1">
          <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Case Files</span>
          <span className="h-px flex-1 bg-border" />
          <span className="text-[11px] font-medium text-muted-foreground">{labCategories.length} topics</span>
        </div>

        {/* Colour-coded category index — collapsed by default, scannable */}
        <Accordion type="single" collapsible className="space-y-2.5">
          {labCategories.map((cat) => {
            const availableCount = cat.documents.filter((d) => d.available).length;
            const totalReward = cat.documents.reduce((s, d) => s + d.reward, 0);
            const icon = CATEGORY_ICONS[cat.id];
            const hue = CATEGORY_HUE[cat.id] ?? 170;
            const pct = cat.documents.length ? (availableCount / cat.documents.length) * 100 : 0;
            const allUnlocked = availableCount === cat.documents.length;

            return (
              <AccordionItem
                key={cat.id}
                value={cat.id}
                className="relative border border-border rounded-xl bg-card overflow-hidden transition-shadow data-[state=open]:shadow-md"
                style={{ borderLeft: `3px solid hsl(${hue} 65% 45%)` }}
              >
                <AccordionTrigger className="hover:no-underline px-4 py-3.5">
                  <div className="flex items-center gap-3 flex-1 min-w-0 text-left">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `hsl(${hue} 60% 48% / 0.12)`, border: `1px solid hsl(${hue} 60% 48% / 0.18)` }}
                    >
                      {icon ?
                      <img src={icon} alt="" className="w-7 h-7 rounded-md object-cover" /> :
                      <span className="text-xl">{cat.icon}</span>
                      }
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-foreground text-sm truncate">{cat.title}</h3>
                        {allUnlocked && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate mb-1.5">{cat.description}</p>
                      {/* Unlock progress for this topic */}
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-20 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full transition-all"
                            style={{ width: `${pct}%`, background: `hsl(${hue} 65% 45%)` }} />
                        </div>
                        <span className="text-[10px] text-muted-foreground font-medium">
                          {availableCount}/{cat.documents.length}
                        </span>
                      </div>
                    </div>

                    <span className="hidden sm:flex items-center gap-1 text-xs text-gold font-semibold shrink-0 mr-1">
                      <Coins className="w-3.5 h-3.5" />
                      {totalReward.toLocaleString()}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-3">
                  <ol className="space-y-1.5">
                    {cat.documents.map((doc, i) =>
                    <li
                      key={doc.id}
                      className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all ${
                      doc.available ?
                      "border-border hover:bg-muted/40 cursor-pointer hover:border-primary/40" :
                      "border-transparent opacity-45"}`
                      }
                      onClick={() => doc.available && navigate(`/lab/${doc.id}`)}>

                        {/* Index chip / lock */}
                        <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 text-[11px] font-bold tabular-nums"
                          style={doc.available
                            ? { background: `hsl(${hue} 60% 48% / 0.1)`, color: `hsl(${hue} 55% 38%)` }
                            : undefined}>
                          {doc.available ? String(i + 1).padStart(2, "0") : <Lock className="w-3 h-3 text-muted-foreground" />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{doc.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{doc.subtitle}</p>
                        </div>

                        <div className="flex items-center gap-2.5 shrink-0">
                          <span className="hidden sm:flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${DIFFICULTY_DOT[doc.difficulty]}`} />
                            <span className={`text-[10px] font-semibold uppercase ${DIFFICULTY_COLORS[doc.difficulty]}`}>
                              {doc.difficulty}
                            </span>
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                            <Clock className="w-3 h-3" />{doc.estimatedMinutes}m
                          </span>
                          {doc.available && <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />}
                        </div>
                      </li>
                    )}
                  </ol>
                </AccordionContent>
              </AccordionItem>);

          })}
        </Accordion>
      </main>
    </div>);

}
