import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { UnitInfo } from "@/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Briefcase, TrendingUp, Info, FileText, ClipboardList } from "lucide-react";

interface APExtra {
  label: string;
  description: string;
  link: string;
  icon: React.ReactNode;
}

interface APNote {
  text: string;
}

interface APSubsection {
  label: string;
  unitIds: string[];
  extras?: APExtra[];
}

interface APSection {
  title: string;
  subtitle: string;
  unitIds?: string[];
  subsections?: APSubsection[];
  extras?: APExtra[];
  note?: APNote;
  topNote?: string;
}

const AP_SECTIONS: APSection[] = [
  {
    title: "Unit 1: Businesses, Competition & New Ideas",
    subtitle: "Markets, competitive advantage, PESTEL, business ethics, supply chains — 25 class periods",
    unitIds: ["unit-19", "unit-20", "unit-26", "unit-33"],
    extras: [
      { label: "Micro Business Simulator", description: "Apply what you've learned — run your own business", link: "/micro-business", icon: <Briefcase className="w-4 h-4" /> },
    ],
  },
  {
    title: "Unit 2: Marketing",
    subtitle: "Consumer behavior, market research, the 4 Ps — 25 class periods",
    unitIds: ["unit-15", "unit-16", "unit-28", "unit-29", "unit-30"],
  },
  {
    title: "Unit 3: Finance & Accounting",
    subtitle: "Personal finance, financial statements, business capital — 35 class periods",
    subsections: [
      {
        label: "Part 1 — Personal Finance",
        unitIds: ["unit-1", "unit-2", "unit-3", "unit-4", "unit-5"],
        extras: [
          { label: "Lab: Taxes (W-4, W-2, 1040-EZ)", description: "Hands-on tax document practice", link: "/applied-finance-lab", icon: <BookOpen className="w-4 h-4" /> },
          { label: "Lab: Employment (I-9, Pay Stub)", description: "Real-world employment documents", link: "/applied-finance-lab", icon: <BookOpen className="w-4 h-4" /> },
        ],
      },
      {
        label: "Part 2 — Business Finance",
        unitIds: ["unit-12", "unit-13", "unit-14", "unit-6", "unit-7", "unit-8"],
      },
    ],
  },
  {
    title: "Unit 4: Management & Strategy",
    subtitle: "Leadership, KPIs, SWOT analysis, Porter's Five Forces — 25 class periods",
    unitIds: ["unit-26", "unit-31", "unit-32"],
  },
  {
    title: "Unit 5: Personal Goals & Investing",
    subtitle: "Taxes, risk management, retirement goals — 50 class periods · Financial Advisor Project",
    topNote: "This unit supports the Financial Advisor Project and is not directly tested on the AP Exam",
    unitIds: ["unit-9", "unit-10", "unit-11", "unit-17", "unit-18", "unit-23", "unit-24"],
    extras: [
      { label: "Stock Market Simulator", description: "Trade stocks with virtual money in real-time", link: "/stocks", icon: <TrendingUp className="w-4 h-4" /> },
      { label: "Financial Advisor Project — AP Culminating", description: "Advise a fictional household on budgeting, education, home buying & retirement", link: "/financial-advisor", icon: <ClipboardList className="w-4 h-4" /> },
    ],
  },
];

const BEYOND_AP_IDS = ["unit-21", "unit-22", "unit-25"];

interface APModeSectionsProps {
  allUnits: UnitInfo[];
  renderUnit: (unit: UnitInfo) => React.ReactNode;
}

export default function APModeSections({ allUnits, renderUnit }: APModeSectionsProps) {
  const allApIds = useMemo(() => {
    const ids = new Set<string>();
    AP_SECTIONS.forEach((s) => {
      s.unitIds?.forEach((id) => ids.add(id));
      s.subsections?.forEach((sub) => sub.unitIds.forEach((id) => ids.add(id)));
    });
    BEYOND_AP_IDS.forEach((id) => ids.add(id));
    return ids;
  }, []);

  const beyondUnits = useMemo(
    () => BEYOND_AP_IDS.map((id) => allUnits.find((u) => u.id === id)).filter(Boolean) as UnitInfo[],
    [allUnits]
  );

  const resolveUnits = (ids: string[]) =>
    ids.map((id) => allUnits.find((u) => u.id === id)).filter(Boolean) as UnitInfo[];

  const renderExtras = (extras: APExtra[]) => (
    <div className="mt-4 space-y-3">
      {extras.map((extra, eIdx) => (
        <Link key={eIdx} to={extra.link}>
          <Card className="flex items-center gap-4 px-6 py-4 border rounded-2xl bg-card shadow-card hover:bg-muted/20 transition-colors press-scale">
            <div className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
              {extra.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[14px] text-foreground">{extra.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{extra.description}</p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );

  const renderNote = (note: APNote) => (
    <Card className="flex items-start gap-3 px-5 py-4 mt-4 border rounded-2xl bg-muted/30 border-muted">
      <Info className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
      <p className="text-xs text-muted-foreground leading-relaxed">{note.text}</p>
    </Card>
  );

  return (
    <div className="space-y-10">
      {/* AP Banner */}
      <div className="rounded-2xl bg-[hsl(var(--primary))] text-primary-foreground px-6 py-5">
        <h2 className="font-display text-xl md:text-2xl font-extrabold tracking-tight">
          AP Business with Personal Finance
        </h2>
        <p className="text-primary-foreground/80 text-sm mt-1">
          Aligned to the official College Board 5-unit framework · Launching fall 2026
        </p>
      </div>

      {/* Business Canvas Project — AP Required */}
      <Link to="/business-canvas">
        <Card className="flex items-center gap-4 px-6 py-5 border-2 border-primary/20 rounded-2xl bg-primary/3 shadow-card hover:bg-primary/5 transition-colors press-scale">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="font-display font-bold text-[15px] text-foreground">Business Canvas Project</p>
              <Badge variant="outline" className="text-[10px] font-bold border-primary/30 text-primary">AP Required</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Build a complete Business Model Canvas for your own business idea — 9 guided blocks + submission
            </p>
          </div>
          <div className="text-primary shrink-0">
            <FileText className="w-5 h-5" />
          </div>
        </Card>
      </Link>

      {/* AP Sections */}
      {AP_SECTIONS.map((section, idx) => (
        <section key={idx}>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 text-primary font-extrabold text-sm border border-primary/15">
              {idx + 1}
            </div>
            <div>
              <h2 className="font-display text-lg md:text-xl font-bold tracking-tight">
                {section.title}
              </h2>
              <p className="text-[11px] text-muted-foreground mt-0.5">{section.subtitle}</p>
            </div>
          </div>

          {section.topNote && (
            <p className="text-[11px] text-muted-foreground mb-3 pl-12">{section.topNote}</p>
          )}

          {/* Flat unit list (no subsections) */}
          {section.unitIds && !section.subsections && (
            <Accordion type="multiple" className="space-y-4">
              {resolveUnits(section.unitIds).map((unit) => renderUnit(unit))}
            </Accordion>
          )}

          {/* Subsections */}
          {section.subsections && section.subsections.map((sub, sIdx) => (
            <div key={sIdx} className={sIdx > 0 ? "mt-6" : ""}>
              <p className="text-sm font-semibold text-foreground/80 mb-3 pl-12">{sub.label}</p>
              <Accordion type="multiple" className="space-y-4">
                {resolveUnits(sub.unitIds).map((unit) => renderUnit(unit))}
              </Accordion>
              {sub.extras && sub.extras.length > 0 && renderExtras(sub.extras)}
            </div>
          ))}

          {section.extras && section.extras.length > 0 && renderExtras(section.extras)}
          {section.note && renderNote(section.note)}
        </section>
      ))}

      {/* Beyond AP — collapsed */}
      {beyondUnits.length > 0 && (
        <section>
          <Accordion type="single" collapsible className="space-y-0">
            <AccordionItem value="beyond-ap" className="border rounded-2xl overflow-hidden bg-card shadow-card">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-9 h-9 rounded-xl bg-muted/60 text-muted-foreground flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-display text-lg md:text-xl font-bold tracking-tight">
                      Beyond AP — Advanced Content
                    </h2>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {beyondUnits.length} additional unit{beyondUnits.length !== 1 ? "s" : ""} for advanced exploration
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-0 pb-0">
                <div className="px-4 pb-4">
                  <Accordion type="multiple" className="space-y-4">
                    {beyondUnits.map((unit) => renderUnit(unit))}
                  </Accordion>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      )}
    </div>
  );
}
