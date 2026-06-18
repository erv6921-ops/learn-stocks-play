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
import { ArrowRight, Lock, Coins, Clock, FlaskConical } from "lucide-react";

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: "text-success",
  intermediate: "text-warning",
  advanced: "text-destructive"
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

      <main className="container mx-auto px-4 py-8 pb-24 md:pb-10 max-w-4xl">
        {/* Hero */}
        <div
          className="rounded-2xl p-6 md:p-7 mb-6 border border-white/[0.06] relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(170 72% 12%) 0%, hsl(170 55% 18%) 50%, hsl(168 50% 22%) 100%)"
          }}>

          <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle at 30% 40%, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, hsl(42 85% 48% / 0.15), hsl(42 85% 48% / 0.05))", border: "1px solid hsl(42 85% 48% / 0.12)" }}>

                <FlaskConical className="w-5 h-5" style={{ color: "hsl(42 85% 48% / 0.8)" }} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Applied Finance Lab</h1>
                <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">Educational Simulation</p>
              </div>
            </div>
            <p className="text-white/50 text-sm max-w-xl leading-relaxed">
              Practice filling out real-world financial documents in a safe, guided environment.
              Pick a topic below to see the forms inside.
            </p>

            <div className="flex items-center gap-4 mt-4 text-xs text-white/45 font-medium">
              <span>{labCategories.length} topics</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>{availableDocs} of {totalDocs} documents unlocked</span>
            </div>
          </div>
        </div>

        {/* Category accordion — collapsed by default so the page stays scannable */}
        <Accordion type="single" collapsible defaultValue={labCategories[0]?.id} className="space-y-3">
          {labCategories.map((cat) => {
            const availableCount = cat.documents.filter((d) => d.available).length;
            const totalReward = cat.documents.reduce((s, d) => s + d.reward, 0);
            const icon = CATEGORY_ICONS[cat.id];

            return (
              <AccordionItem
                key={cat.id}
                value={cat.id}
                className="border border-border rounded-xl bg-card px-4 overflow-hidden data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0 text-left">
                    {icon ?
                    <img src={icon} alt="" className="w-8 h-8 rounded-md object-cover shrink-0" /> :
                    <span className="text-2xl shrink-0">{cat.icon}</span>
                    }
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground text-sm truncate">{cat.title}</h3>
                      <p className="text-xs text-muted-foreground truncate">{cat.description}</p>
                    </div>
                    <div className="hidden sm:flex flex-col items-end gap-1 mr-2 shrink-0">
                      <span className="flex items-center gap-1 text-xs text-gold font-semibold">
                        <Coins className="w-3 h-3" />
                        {totalReward.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-medium">
                        {availableCount}/{cat.documents.length} unlocked
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <div className="space-y-2 pb-1">
                    {cat.documents.map((doc) =>
                    <div
                      key={doc.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      doc.available ?
                      "border-border hover:border-primary/40 hover:bg-muted/30 cursor-pointer" :
                      "border-border/50 opacity-50"}`
                      }
                      onClick={() => doc.available && navigate(`/lab/${doc.id}`)}>

                        {!doc.available && <Lock className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{doc.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{doc.subtitle}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`hidden sm:inline text-[10px] font-semibold uppercase ${DIFFICULTY_COLORS[doc.difficulty]}`}>
                            {doc.difficulty}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                            <Clock className="w-3 h-3" />{doc.estimatedMinutes}m
                          </span>
                          {doc.available && <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />}
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>);

          })}
        </Accordion>
      </main>
    </div>);

}
