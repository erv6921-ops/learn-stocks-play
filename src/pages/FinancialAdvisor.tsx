import React, { useState, useEffect, useMemo } from "react";
import GameNav from "@/components/GameNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/components/BackButton";
import {
  ClipboardList, ArrowRight, ArrowLeft, CheckCircle,
  DollarSign, GraduationCap, Home, PiggyBank, FileText, Send, RotateCcw
} from "lucide-react";
import { useApp } from "@/contexts/AppContext";

/* ── Fictional household profile ── */
const HOUSEHOLD = {
  name: "The Martinez Family",
  members: "Carlos (38) - warehouse logistics manager, Maria (36) - part-time dental hygienist, Sofia (12) - 7th grade, Diego (8) - 3rd grade",
  grossIncome: "Carlos: $52,000/year · Maria: $24,000/year (part-time) · Combined: $76,000/year",
  netMonthlyIncome: "$5,100/month after taxes",
  currentExpenses: {
    rent: 1450,
    carPayment: 380,
    carInsurance: 160,
    groceries: 720,
    utilities: 210,
    phones: 140,
    childcare: 300,
    clothing: 120,
    entertainment: 200,
    dining: 180,
    subscriptions: 65,
    miscellaneous: 175,
  },
  debts: "Car loan: $14,200 remaining at 6.5% APR (3 years left) · Credit card: $3,800 at 22% APR · Student loan (Carlos): $8,500 at 4.5% APR",
  savings: "Checking: $2,100 · Savings: $4,300 · No retirement accounts · No college savings",
  goals: "Sofia starts college in ~6 years · Diego in ~10 years · Carlos and Maria want to buy a home within 5 years · Both want to retire by 65",
};

const TOTAL_EXPENSES = Object.values(HOUSEHOLD.currentExpenses).reduce((s, v) => s + v, 0);

/* ── Project area definitions ── */
interface ProjectArea {
  id: string;
  title: string;
  number: number;
  icon: React.ReactNode;
  description: string;
  context: string;
  prompts: { label: string; type: "text" | "number" | "textarea"; placeholder: string; prefix?: string }[];
  calculationHint?: string;
}

const PROJECT_AREAS: ProjectArea[] = [
  {
    id: "budgeting",
    title: "Budgeting Analysis",
    number: 1,
    icon: <DollarSign className="w-5 h-5" />,
    description: "Analyze the Martinez family's current spending and recommend an improved budget using the 50/30/20 rule or another framework.",
    context: `The family earns ${HOUSEHOLD.netMonthlyIncome}. Their total monthly expenses are $${TOTAL_EXPENSES.toLocaleString()}. That leaves $${(5100 - TOTAL_EXPENSES).toLocaleString()} per month. They have high-interest credit card debt ($3,800 at 22% APR) and no emergency fund.`,
    prompts: [
      { label: "What percentage of their income goes to needs vs. wants? Show your calculation.", type: "textarea", placeholder: "Needs: rent + car + insurance + groceries + utilities + phones + childcare = $___\nWants: clothing + entertainment + dining + subscriptions = $___\n% needs = ___ / 5,100 = ___%..." },
      { label: "Recommended monthly savings amount ($)", type: "number", placeholder: "e.g. 510", prefix: "$" },
      { label: "Which expenses would you recommend reducing, and by how much?", type: "textarea", placeholder: "I would recommend reducing dining out from $180 to $80 because..." },
      { label: "What should the family prioritize first - emergency fund or paying off credit card debt? Explain your reasoning.", type: "textarea", placeholder: "The family should prioritize... because..." },
      { label: "Write a recommended monthly budget with specific dollar amounts for each category.", type: "textarea", placeholder: "Rent: $1,450\nCar payment: $380\nGroceries: $650\n..." },
    ],
    calculationHint: "The 50/30/20 rule suggests 50% needs ($2,550), 30% wants ($1,530), 20% savings ($1,020). Compare this to their actual spending."
  },
  {
    id: "education",
    title: "Education Savings Plan",
    number: 2,
    icon: <GraduationCap className="w-5 h-5" />,
    description: "Recommend a savings strategy for Sofia's and Diego's postsecondary education, including account types and monthly contribution targets.",
    context: "Sofia starts college in approximately 6 years, Diego in 10 years. The average annual cost of a 4-year public university is approximately $25,000/year (tuition, room & board). The family currently has $0 saved for education. A 529 plan offers tax-free growth and withdrawals for qualified education expenses.",
    prompts: [
      { label: "Estimated total education cost for Sofia (4 years)", type: "number", placeholder: "e.g. 100000", prefix: "$" },
      { label: "Estimated total education cost for Diego (4 years)", type: "number", placeholder: "e.g. 100000", prefix: "$" },
      { label: "Recommended monthly 529 contribution for Sofia", type: "number", placeholder: "e.g. 200", prefix: "$" },
      { label: "Recommended monthly 529 contribution for Diego", type: "number", placeholder: "e.g. 150", prefix: "$" },
      { label: "Explain why you chose a 529 plan (or an alternative) and how the family can realistically afford these contributions given their budget.", type: "textarea", placeholder: "I recommend a 529 plan because... The family can afford this by..." },
      { label: "What other strategies could help reduce education costs? (scholarships, community college, work-study, etc.)", type: "textarea", placeholder: "Additional strategies include..." },
    ],
    calculationHint: "At 7% annual return, $200/month for 6 years ≈ $17,400. $150/month for 10 years ≈ $26,000. Consider whether partial funding + scholarships is a realistic plan."
  },
  {
    id: "home-buying",
    title: "Home Buying Strategy",
    number: 3,
    icon: <Home className="w-5 h-5" />,
    description: "Assess the Martinez family's mortgage readiness and recommend a timeline and strategy for purchasing their first home.",
    context: "The family currently rents at $1,450/month. They want to buy a home within 5 years. Median home price in their area is approximately $320,000. A conventional mortgage typically requires 3.5-20% down payment. Their current credit card debt and limited savings are obstacles. A good credit score (700+) is needed for favorable mortgage rates.",
    prompts: [
      { label: "Minimum down payment needed (at 10%)", type: "number", placeholder: "e.g. 32000", prefix: "$" },
      { label: "Estimated monthly mortgage payment (30-year at 6.5% on $288,000)", type: "number", placeholder: "e.g. 1820", prefix: "$" },
      { label: "How much should they save per month toward a down payment?", type: "number", placeholder: "e.g. 400", prefix: "$" },
      { label: "What steps should the family take before applying for a mortgage? (debt payoff, credit score, emergency fund, etc.)", type: "textarea", placeholder: "Before applying, the Martinez family should: 1) Pay off credit card debt... 2) Build emergency fund... 3) ..." },
      { label: "Recommend a realistic timeline. Can they buy in 5 years? Why or why not?", type: "textarea", placeholder: "Based on my analysis, a realistic timeline is... because..." },
    ],
    calculationHint: "At $400/month saved for 5 years = $24,000. With 7% returns ≈ $28,600. They'd need additional savings or a lower-cost home. Consider FHA loans (3.5% down = $11,200)."
  },
  {
    id: "retirement",
    title: "Retirement Planning",
    number: 4,
    icon: <PiggyBank className="w-5 h-5" />,
    description: "Recommend a retirement savings approach for Carlos and Maria, including account types, contribution rates, and long-term projections.",
    context: "Carlos is 38, Maria is 36. Neither has any retirement savings. Carlos's employer offers a 401(k) with a 3% match. Maria's part-time employer does not offer retirement benefits. The general guideline is to save 10-15% of gross income for retirement. They want to retire by age 65, giving Carlos 27 years and Maria 29 years.",
    prompts: [
      { label: "Recommended monthly 401(k) contribution for Carlos", type: "number", placeholder: "e.g. 430", prefix: "$" },
      { label: "What percentage of Carlos's salary does your recommendation represent?", type: "number", placeholder: "e.g. 10", prefix: "%" },
      { label: "Should Maria open a Roth IRA or Traditional IRA? Explain your recommendation.", type: "textarea", placeholder: "I recommend Maria open a... because at her income level..." },
      { label: "Recommended monthly IRA contribution for Maria", type: "number", placeholder: "e.g. 200", prefix: "$" },
      { label: "Project Carlos's 401(k) balance at age 65 (assume 7% annual return, include employer match). Show your reasoning.", type: "textarea", placeholder: "Monthly contribution: $___\nEmployer match (3%): $___/month\nTotal monthly: $___\nOver 27 years at 7% ≈ $___..." },
      { label: "What is the biggest risk to their retirement plan, and how would you mitigate it?", type: "textarea", placeholder: "The biggest risk is... I would mitigate this by..." },
    ],
    calculationHint: "Carlos at $430/month + $130 match = $560/month for 27 years at 7% ≈ $512,000. Maria at $200/month for 29 years at 7% ≈ $212,000. Combined ≈ $724,000. Is that enough?"
  },
];

const STORAGE_KEY = "investiplay_financial_advisor";

interface ProjectData {
  areas: Record<string, string[]>;
  reportSummary: string;
  submitted: boolean;
  submittedAt?: string;
}

function getEmptyProject(): ProjectData {
  const areas: ProjectData["areas"] = {};
  PROJECT_AREAS.forEach(a => {
    areas[a.id] = a.prompts.map(() => "");
  });
  return { areas, reportSummary: "", submitted: false };
}

function loadProject(): ProjectData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return getEmptyProject();
}

function saveProject(data: ProjectData) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

export default function FinancialAdvisor() {
  const { earnJeffs } = useApp();
  const [project, setProject] = useState<ProjectData>(loadProject);
  const [step, setStep] = useState(0); // 0=intro, 1-4=areas, 5=report

  useEffect(() => { saveProject(project); }, [project]);

  const areaCompletion = useMemo(() => {
    return PROJECT_AREAS.map(a => {
      const answers = project.areas[a.id] || [];
      return answers.some(ans => ans.trim().length > 0);
    });
  }, [project]);

  const completedAreas = areaCompletion.filter(Boolean).length;
  const totalSteps = PROJECT_AREAS.length + 2;
  const progress = Math.round((step / (totalSteps - 1)) * 100);

  const updateAnswer = (areaId: string, idx: number, value: string) => {
    setProject(prev => {
      const next = { ...prev, areas: { ...prev.areas } };
      next.areas[areaId] = next.areas[areaId].map((a, i) => i === idx ? value : a);
      return next;
    });
  };

  const handleSubmit = () => {
    if (project.submitted) return;
    setProject(prev => ({ ...prev, submitted: true, submittedAt: new Date().toISOString() }));
    earnJeffs(5000, "Financial Advisor Project completed");
  };

  const handleReset = () => {
    if (!window.confirm("Reset your entire Financial Advisor Project? This cannot be undone.")) return;
    setProject(getEmptyProject());
    setStep(0);
  };

  // ── Intro (step 0) ──
  if (step === 0) {
    return (
      <div className="min-h-screen bg-background pb-24 md:pb-8">
        <GameNav />
        <main className="container mx-auto px-4 py-8 max-w-3xl">
          <BackButton fallback="/lessons" label="Back to Missions" />

          <div className="mt-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <ClipboardList className="w-8 h-8" />
            </div>
            <Badge variant="outline" className="text-xs font-bold border-primary/30 text-primary">
              AP Culminating Project
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
              Financial Advisor Project
            </h1>
            <p className="text-muted-foreground text-[15px] max-w-xl mx-auto leading-relaxed">
              You've been hired as a financial advisor for the Martinez family. Review their financial profile, analyze their situation, and provide professional recommendations across 4 key areas.
            </p>
          </div>

          {/* Household profile card */}
          <Card className="mt-8 p-6 rounded-2xl border shadow-card">
            <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Client Profile - {HOUSEHOLD.name}
            </h2>
            <div className="space-y-3 text-sm text-foreground/80">
              <div>
                <span className="font-semibold text-foreground">Household:</span>{" "}
                {HOUSEHOLD.members}
              </div>
              <div>
                <span className="font-semibold text-foreground">Income:</span>{" "}
                {HOUSEHOLD.grossIncome}
              </div>
              <div>
                <span className="font-semibold text-foreground">Take-home pay:</span>{" "}
                {HOUSEHOLD.netMonthlyIncome}
              </div>
              <div>
                <span className="font-semibold text-foreground">Monthly expenses:</span>{" "}
                ${TOTAL_EXPENSES.toLocaleString()}/month
                <div className="mt-1.5 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 text-xs text-muted-foreground pl-2">
                  {Object.entries(HOUSEHOLD.currentExpenses).map(([k, v]) => (
                    <span key={k} className="flex justify-between">
                      <span className="capitalize">{k.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-mono">${v}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-semibold text-foreground">Debts:</span>{" "}
                {HOUSEHOLD.debts}
              </div>
              <div>
                <span className="font-semibold text-foreground">Current savings:</span>{" "}
                {HOUSEHOLD.savings}
              </div>
              <div>
                <span className="font-semibold text-foreground">Goals:</span>{" "}
                {HOUSEHOLD.goals}
              </div>
            </div>
          </Card>

          {/* Area overview */}
          <div className="mt-8 space-y-3">
            {PROJECT_AREAS.map((area, idx) => (
              <button
                key={area.id}
                onClick={() => setStep(idx + 1)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border bg-card hover:bg-muted/20 transition-colors text-left press-scale shadow-card"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  areaCompletion[idx] ? "bg-success/10 text-success" : "bg-muted/60 text-muted-foreground"
                }`}>
                  {areaCompletion[idx] ? <CheckCircle className="w-5 h-5" /> : area.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[14px] text-foreground">
                    {area.number}. {area.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                    {area.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground/40 shrink-0" />
              </button>
            ))}

            {/* Report step */}
            <button
              onClick={() => setStep(5)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border bg-card hover:bg-muted/20 transition-colors text-left press-scale shadow-card"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                project.submitted ? "bg-success/10 text-success" : "bg-gold/10 text-gold"
              }`}>
                {project.submitted ? <CheckCircle className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[14px] text-foreground">Financial Advisor Report</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {project.submitted ? "Submitted ✓" : "Generate and submit your final report"}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground/40 shrink-0" />
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            {completedAreas}/4 areas started · Progress saves automatically
          </p>
        </main>
      </div>
    );
  }

  // ── Area detail (steps 1-4) ──
  if (step >= 1 && step <= 4) {
    const area = PROJECT_AREAS[step - 1];
    const answers = project.areas[area.id] || [];

    return (
      <div className="min-h-screen bg-background pb-24 md:pb-8">
        <GameNav />
        <main className="container mx-auto px-4 py-8 max-w-3xl">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <button onClick={() => setStep(0)} className="text-sm text-primary font-semibold hover:underline flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Overview
              </button>
              <span className="text-xs text-muted-foreground font-semibold">Area {area.number} of 4</span>
            </div>
            <Progress value={progress} variant="success" className="h-2" />
          </div>

          {/* Area header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              {area.icon}
            </div>
            <div>
              <h1 className="font-display text-2xl font-extrabold tracking-tight">
                {area.number}. {area.title}
              </h1>
            </div>
          </div>

          {/* Description */}
          <Card className="p-5 rounded-2xl border shadow-card mb-4">
            <p className="text-[14px] text-foreground/80 leading-relaxed">{area.description}</p>
          </Card>

          {/* Context card */}
          <Card className="p-5 rounded-2xl border-primary/20 bg-primary/3 shadow-card mb-6">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">📊 Key Data</p>
            <p className="text-sm text-foreground/80 leading-relaxed">{area.context}</p>
          </Card>

          {/* Prompts */}
          <div className="space-y-5">
            {area.prompts.map((prompt, pIdx) => (
              <div key={pIdx}>
                <label className="text-sm font-semibold text-foreground block mb-2">
                  {prompt.label}
                </label>
                {prompt.type === "textarea" ? (
                  <Textarea
                    placeholder={prompt.placeholder}
                    value={answers[pIdx] || ""}
                    onChange={e => updateAnswer(area.id, pIdx, e.target.value)}
                    className="min-h-[90px] text-sm"
                  />
                ) : (
                  <div className="relative">
                    {prompt.prefix && (
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-semibold">
                        {prompt.prefix}
                      </span>
                    )}
                    <Input
                      type={prompt.type}
                      placeholder={prompt.placeholder}
                      value={answers[pIdx] || ""}
                      onChange={e => updateAnswer(area.id, pIdx, e.target.value)}
                      className={prompt.prefix ? "pl-7 font-mono" : "font-mono"}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Calculation hint */}
          {area.calculationHint && (
            <Card className="mt-6 p-4 rounded-2xl bg-gold/5 border-gold/20 shadow-card">
              <p className="text-xs font-bold text-gold uppercase tracking-widest mb-1.5">💡 Calculation Hint</p>
              <p className="text-xs text-foreground/70 leading-relaxed">{area.calculationHint}</p>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button variant="outline" onClick={() => setStep(step - 1)} className="gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" /> {step === 1 ? "Overview" : "Previous"}
            </Button>
            <Button onClick={() => setStep(step + 1)} className="gap-1.5 press-scale">
              {step === 4 ? "Review Report" : "Next Area"} <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // ── Report & Submit (step 5) ──
  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <GameNav />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => setStep(0)} className="text-sm text-primary font-semibold hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Overview
            </button>
            <span className="text-xs text-muted-foreground font-semibold">Final Report</span>
          </div>
          <Progress value={100} variant="success" className="h-2" />
        </div>

        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-extrabold tracking-tight mb-2">
            Financial Advisor Report
          </h1>
          <p className="text-muted-foreground text-sm">
            {HOUSEHOLD.name} · {completedAreas}/4 areas completed
          </p>
          {project.submitted && (
            <Badge variant="success" className="mt-2">
              ✓ Submitted {project.submittedAt ? new Date(project.submittedAt).toLocaleDateString() : ""}
            </Badge>
          )}
        </div>

        {/* Report summary cards */}
        <div className="space-y-4">
          {PROJECT_AREAS.map((area, idx) => {
            const answers = project.areas[area.id] || [];
            const hasContent = areaCompletion[idx];
            return (
              <Card key={area.id}
                className={`p-5 rounded-2xl border shadow-card cursor-pointer hover:bg-muted/20 transition-colors ${
                  hasContent ? "border-success/30" : ""
                }`}
                onClick={() => setStep(idx + 1)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    hasContent ? "bg-success/10 text-success" : "bg-muted/60 text-muted-foreground"
                  }`}>
                    {hasContent ? <CheckCircle className="w-4 h-4" /> : area.icon}
                  </div>
                  <h3 className="font-bold text-sm">{area.number}. {area.title}</h3>
                </div>
                <div className="space-y-1">
                  {answers.map((ans, aIdx) => (
                    ans.trim() ? (
                      <p key={aIdx} className="text-xs text-foreground/70 line-clamp-2">
                        <span className="font-semibold text-foreground/50">{area.prompts[aIdx]?.label.slice(0, 40)}…</span>{" "}
                        {ans.trim()}
                      </p>
                    ) : null
                  ))}
                  {!hasContent && <p className="text-xs text-muted-foreground italic">Not started</p>}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Executive summary */}
        <Card className="mt-6 p-5 rounded-2xl border shadow-card">
          <label className="text-sm font-bold text-foreground block mb-2">
            Executive Summary - Write a one-paragraph summary of your recommendations for the Martinez family.
          </label>
          <Textarea
            placeholder="As the financial advisor for the Martinez family, my key recommendations are..."
            value={project.reportSummary}
            onChange={e => setProject(prev => ({ ...prev, reportSummary: e.target.value }))}
            className="min-h-[120px] text-sm"
          />
        </Card>

        {/* Submit / Reset */}
        <div className="mt-8 flex items-center justify-center gap-4">
          {!project.submitted ? (
            <Button size="lg" onClick={handleSubmit} disabled={completedAreas < 3}
              className="gap-2 press-scale">
              <Send className="w-4 h-4" />
              Submit Report (+5,000 pts)
            </Button>
          ) : (
            <p className="text-sm text-success font-semibold">🎉 Report submitted! +5,000 InvestiCoins earned</p>
          )}
          <Button variant="outline" onClick={handleReset} className="gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </Button>
        </div>
        {completedAreas < 3 && !project.submitted && (
          <p className="text-center text-xs text-muted-foreground mt-3">
            Complete at least 3 of 4 areas to submit
          </p>
        )}
      </main>
    </div>
  );
}
