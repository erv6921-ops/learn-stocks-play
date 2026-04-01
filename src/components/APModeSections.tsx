import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { UnitInfo } from "@/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { BookOpen, Briefcase, TrendingUp, ChevronDown } from "lucide-react";

interface APSection {
  title: string;
  apRef: string;
  unitIds: string[];
  /** Special cards (labs, links) rendered after units */
  extras?: { label: string; description: string; link: string; icon: React.ReactNode }[];
}

const AP_SECTIONS: APSection[] = [
  {
    title: "Personal Finance Foundations",
    apRef: "Corresponds to AP Unit 5 — 50 class periods",
    unitIds: ["unit-1", "unit-2", "unit-3", "unit-4", "unit-5"],
    extras: [
      { label: "Lab: Taxes (W-4, W-2, 1040-EZ)", description: "Hands-on tax document practice", link: "/applied-finance-lab", icon: <BookOpen className="w-4 h-4" /> },
      { label: "Lab: Employment (I-9, Pay Stub)", description: "Real-world employment documents", link: "/applied-finance-lab", icon: <BookOpen className="w-4 h-4" /> },
    ],
  },
  {
    title: "Business Finance & Investing",
    apRef: "Corresponds to AP Unit 3 — 45 class periods",
    unitIds: ["unit-6", "unit-7", "unit-8", "unit-9", "unit-10", "unit-11", "unit-12", "unit-13", "unit-14", "unit-27"],
  },
  {
    title: "Entrepreneurship & Business Foundations",
    apRef: "Corresponds to AP Units 1 & 2 — 40 class periods",
    unitIds: ["unit-19", "unit-20"],
    extras: [
      { label: "Micro Business Simulator", description: "Apply what you've learned — run your own business", link: "/micro-business", icon: <Briefcase className="w-4 h-4" /> },
    ],
  },
  {
    title: "Behavioral & Macro Economics",
    apRef: "Corresponds to AP Unit 2 context — 30 class periods",
    unitIds: ["unit-15", "unit-16", "unit-17", "unit-18"],
  },
  {
    title: "Applied Simulations",
    apRef: "Corresponds to AP Canvas Project — ongoing",
    unitIds: ["unit-23", "unit-24"],
    extras: [
      { label: "Stock Market Simulator", description: "Trade stocks with virtual money in real-time", link: "/stocks", icon: <TrendingUp className="w-4 h-4" /> },
    ],
  },
];

const BEYOND_AP_TITLE = "Beyond AP — Advanced Content";

interface APModeSectionsProps {
  allUnits: UnitInfo[];
  renderUnit: (unit: UnitInfo) => React.ReactNode;
}

export default function APModeSections({ allUnits, renderUnit }: APModeSectionsProps) {
  const apUnitIds = useMemo(() => {
    const ids = new Set<string>();
    AP_SECTIONS.forEach((s) => s.unitIds.forEach((id) => ids.add(id)));
    return ids;
  }, []);

  const beyondUnits = useMemo(
    () => allUnits.filter((u) => !apUnitIds.has(u.id)),
    [allUnits, apUnitIds]
  );

  return (
    <div className="space-y-10">
      {/* AP Banner */}
      <div className="rounded-2xl bg-[hsl(var(--primary))] text-primary-foreground px-6 py-5">
        <h2 className="font-display text-xl md:text-2xl font-extrabold tracking-tight">
          AP Business with Personal Finance
        </h2>
        <p className="text-primary-foreground/80 text-sm mt-1">
          Aligned to College Board's official course framework launching fall 2026.
        </p>
      </div>

      {/* AP Sections */}
      {AP_SECTIONS.map((section, idx) => {
        const sectionUnits = section.unitIds
          .map((id) => allUnits.find((u) => u.id === id))
          .filter(Boolean) as UnitInfo[];

        return (
          <section key={idx}>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 text-primary font-extrabold text-sm border border-primary/15">
                {idx + 1}
              </div>
              <div>
                <h2 className="font-display text-lg md:text-xl font-bold tracking-tight">
                  {section.title}
                </h2>
                <p className="text-[11px] text-muted-foreground mt-0.5">{section.apRef}</p>
              </div>
            </div>

            <Accordion type="multiple" className="space-y-4">
              {sectionUnits.map((unit) => renderUnit(unit))}
            </Accordion>

            {/* Extra cards (labs, links) */}
            {section.extras && section.extras.length > 0 && (
              <div className="mt-4 space-y-3">
                {section.extras.map((extra, eIdx) => (
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
            )}
          </section>
        );
      })}

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
                      {BEYOND_AP_TITLE}
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
