// Applied Finance Lab — practice filling out real-world financial documents.
//
// Layout: the NEXT form to complete is featured at the top with a live
// preview of its first few questions that fades out (a teaser of the real
// form); the rest of the document library sits below, grouped by topic.
// "Next" = first available, not-yet-completed document in catalog order;
// completion flags come from localStorage (written by LabDocument on finish).

import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import GameNav from "@/components/GameNav";
import { Button } from "@/components/ui/button";
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
import {
  labCategories, w4FormFields, isLabDocDone,
  type LabDocument, type LabCategory, type FormField,
} from "@/data/labDocuments";
import { ArrowRight, Lock, Coins, Clock, FlaskConical, CheckCircle2, Sparkles, FileText } from "lucide-react";
import { anchor } from "@/lib/tourAnchors";

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

// A signature hue per category, so the library reads as a colour-coded dossier.
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

/** Form fields for a doc's preview. Only the W-4 has a real field set today. */
function previewFields(docId: string): FormField[] {
  return docId === "w4" ? w4FormFields.slice(0, 3) : []
}
function totalQuestions(docId: string): number {
  return docId === "w4" ? w4FormFields.length : 0
}

/* ── Read-only mock of one form question for the teaser ── */
function PreviewField({ field, index }: { field: FormField; index: number }) {
  return (
    <div className="rounded-xl border border-border bg-background/80 p-3.5">
      <div className="flex items-start gap-2.5">
        <span className="w-5 h-5 rounded-md bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
          {index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">
            {field.label}{field.required && <span className="text-destructive ml-0.5">*</span>}
          </p>
          {field.helpText && <p className="text-xs text-muted-foreground mt-0.5">{field.helpText}</p>}
          {field.type === "radio" && field.options ? (
            <div className="mt-2 space-y-1.5">
              {field.options.slice(0, 3).map(o => (
                <div key={o.value} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-muted-foreground/40 shrink-0" />
                  {o.label}
                </div>
              ))}
            </div>
          ) : field.type === "select" && field.options ? (
            <div className="mt-2 h-9 rounded-lg border border-input bg-muted/40 px-3 flex items-center text-xs text-muted-foreground/70">
              Choose…
            </div>
          ) : (
            <div className="mt-2 h-9 rounded-lg border border-input bg-muted/40 px-3 flex items-center text-xs text-muted-foreground/70">
              {field.placeholder || "Your answer…"}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AppliedFinanceLab() {
  const navigate = useNavigate();

  // Next form = first available doc (catalog order) not yet completed.
  const { nextDoc, nextCat, doneCount } = useMemo(() => {
    let nextDoc: LabDocument | null = null
    let nextCat: LabCategory | null = null
    let doneCount = 0
    for (const cat of labCategories) {
      for (const doc of cat.documents) {
        if (!doc.available) continue
        if (isLabDocDone(doc.id)) { doneCount++; continue }
        if (!nextDoc) { nextDoc = doc; nextCat = cat }
      }
    }
    return { nextDoc, nextCat, doneCount }
  }, [])

  const totalDocs = labCategories.reduce((s, c) => s + c.documents.length, 0);
  const availableDocs = labCategories.reduce(
    (s, c) => s + c.documents.filter((d) => d.available).length,
    0
  );

  const preview = nextDoc ? previewFields(nextDoc.id) : []
  const questions = nextDoc ? totalQuestions(nextDoc.id) : 0
  const nextHue = nextCat ? catHue(nextCat.id) : 170

  return (
    <div className="min-h-screen bg-background">
      <GameNav />

      <main className="container mx-auto px-4 py-8 pb-24 md:pb-10 max-w-6xl">
        {/* Compact header */}
        <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, hsl(42 85% 48% / 0.18), hsl(42 85% 48% / 0.05))", border: "1px solid hsl(42 85% 48% / 0.15)" }}>
              <FlaskConical className="w-5 h-5" style={{ color: "hsl(42 85% 55%)" }} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Applied Finance Lab</h1>
              <p className="text-muted-foreground text-xs font-semibold uppercase tracking-widest">
                Real documents · safe practice
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold">{doneCount}/{availableDocs} completed</p>
            <div className="h-1.5 w-40 rounded-full bg-muted overflow-hidden mt-1">
              <div className="h-full rounded-full bg-gold transition-all"
                style={{ width: `${availableDocs ? (doneCount / availableDocs) * 100 : 0}%` }} />
            </div>
          </div>
        </div>

        {/* ═══ UP NEXT: the featured form with a fading question preview ═══ */}
        {nextDoc && nextCat && (
          <section
            ref={anchor("lab-doc")}
            className="rounded-2xl border bg-card mb-8 overflow-hidden"
            style={{ borderColor: `hsl(${nextHue} 60% 48% / 0.35)` }}
          >
            <div className="grid lg:grid-cols-2">
              {/* Left: what this form is + start button */}
              <div className="p-6 md:p-8 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4" style={{ color: `hsl(${nextHue} 65% 45%)` }} />
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.2em]" style={{ color: `hsl(${nextHue} 65% 45%)` }}>
                    Up next in your lab
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `hsl(${nextHue} 60% 48% / 0.12)`, border: `1px solid hsl(${nextHue} 60% 48% / 0.2)` }}>
                    {catIcon(nextCat.id)
                      ? <img src={catIcon(nextCat.id)} alt="" className="w-8 h-8 rounded-lg object-cover" />
                      : <span className="text-2xl">{nextCat.icon}</span>}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{nextCat.title}</p>
                    <h2 className="font-display text-2xl font-extrabold leading-tight">{nextDoc.title}</h2>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{nextDoc.subtitle}</p>
                {nextDoc.education?.whatItIs && (
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2">{nextDoc.education.whatItIs}</p>
                )}

                <div className="flex items-center gap-4 mt-4 text-xs font-semibold flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${DIFFICULTY_DOT[nextDoc.difficulty]}`} />
                    <span className={`uppercase ${DIFFICULTY_COLORS[nextDoc.difficulty]}`}>{nextDoc.difficulty}</span>
                  </span>
                  <span className="text-muted-foreground flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{nextDoc.estimatedMinutes} min</span>
                  <span className="flex items-center gap-1 text-gold"><Coins className="w-3.5 h-3.5" />{nextDoc.reward} coins</span>
                  {questions > 0 && (
                    <span className="text-muted-foreground flex items-center gap-1"><FileText className="w-3.5 h-3.5" />{questions} questions</span>
                  )}
                </div>

                <div className="mt-auto pt-6">
                  <Button size="lg" className="press-scale gap-2 w-full sm:w-auto" onClick={() => navigate(`/lab/${nextDoc.id}`)}>
                    Start this form <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Right: the first questions, fading out into the real form */}
              <div className="relative bg-muted/30 border-t lg:border-t-0 lg:border-l border-border p-6 md:p-8">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  A peek at the form
                </p>
                {preview.length > 0 ? (
                  <div
                    className="space-y-2.5 pointer-events-none select-none"
                    style={{
                      maskImage: "linear-gradient(180deg, black 40%, transparent 96%)",
                      WebkitMaskImage: "linear-gradient(180deg, black 40%, transparent 96%)",
                    }}
                  >
                    {preview.map((f, i) => <PreviewField key={f.id} field={f} index={i} />)}
                  </div>
                ) : (
                  <div
                    className="space-y-2.5 pointer-events-none select-none"
                    style={{
                      maskImage: "linear-gradient(180deg, black 35%, transparent 96%)",
                      WebkitMaskImage: "linear-gradient(180deg, black 35%, transparent 96%)",
                    }}
                  >
                    {/* No field set yet — tease the education intro as the opening questions */}
                    {[
                      { q: "When do you fill this out?", a: nextDoc.education?.whenYouFillItOut },
                      { q: "Why does it matter?", a: nextDoc.education?.whyItMatters },
                      { q: "What if you get it wrong?", a: nextDoc.education?.whatHappensIfWrong },
                    ].filter(x => x.a).map((x, i) => (
                      <div key={i} className="rounded-xl border border-border bg-background/80 p-3.5">
                        <p className="text-sm font-semibold">{x.q}</p>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{x.a}</p>
                      </div>
                    ))}
                  </div>
                )}
                {/* Continue hint sitting in the fade */}
                <div className="absolute inset-x-0 bottom-5 flex justify-center">
                  <button
                    onClick={() => navigate(`/lab/${nextDoc.id}`)}
                    className="press-scale rounded-full border border-border bg-card px-4 py-1.5 text-xs font-bold text-muted-foreground shadow-sm hover:text-foreground transition-colors"
                  >
                    {questions > 3 ? `+ ${questions - 3} more questions — continue inside` : "Continue inside →"}
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* All available forms finished — celebrate instead of an empty top */}
        {!nextDoc && (
          <section className="rounded-2xl border border-success/40 bg-success/5 p-6 md:p-8 mb-8 text-center">
            <CheckCircle2 className="w-10 h-10 text-success mx-auto mb-2" />
            <h2 className="font-display text-xl font-extrabold">All caught up!</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
              You've completed every form in the lab — {doneCount}/{availableDocs}. New documents unlock soon;
              revisit any form below for a refresher.
            </p>
          </section>
        )}

        {/* ═══ THE REST OF THE LIBRARY ═══ */}
        <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
          All case files · {labCategories.length} topics · {totalDocs} documents
        </p>
        <div className="space-y-6">
          {labCategories.map(cat => {
            const hue = catHue(cat.id)
            const icon = catIcon(cat.id)
            const docs = cat.documents
            return (
              <section key={cat.id}>
                {/* topic header */}
                <div className="flex items-center gap-2.5 mb-2 px-1">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `hsl(${hue} 60% 48% / 0.12)`, border: `1px solid hsl(${hue} 60% 48% / 0.18)` }}>
                    {icon ? <img src={icon} alt="" className="w-5 h-5 rounded object-cover" /> : <span className="text-sm">{cat.icon}</span>}
                  </div>
                  <h3 className="font-bold text-sm">{cat.title}</h3>
                  <span className="text-[11px] text-muted-foreground">
                    {docs.filter(d => d.available && isLabDocDone(d.id)).length}/{docs.filter(d => d.available).length} done
                  </span>
                </div>

                {/* docs grid */}
                <div className="grid sm:grid-cols-2 gap-2">
                  {docs.map(doc => {
                    const done = doc.available && isLabDocDone(doc.id)
                    const isNext = doc.id === nextDoc?.id
                    return (
                      <button
                        key={doc.id}
                        disabled={!doc.available}
                        onClick={() => navigate(`/lab/${doc.id}`)}
                        className={`flex items-center gap-3 p-3 rounded-xl border bg-card text-left transition-all ${
                          doc.available
                            ? "border-border hover:border-primary/40 hover:shadow-sm press-scale"
                            : "border-dashed border-border/60 opacity-55"
                        }`}
                        style={isNext ? { borderColor: `hsl(${hue} 60% 48% / 0.5)` } : undefined}
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={doc.available ? { background: `hsl(${hue} 60% 48% / 0.1)` } : undefined}>
                          {!doc.available
                            ? <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                            : done
                              ? <CheckCircle2 className="w-4 h-4 text-success" />
                              : <FileText className="w-4 h-4" style={{ color: `hsl(${hue} 55% 40%)` }} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold truncate ${done ? "text-muted-foreground line-through decoration-success/60" : ""}`}>
                            {doc.title}
                          </p>
                          <p className="text-[11px] text-muted-foreground truncate">
                            {doc.available
                              ? <>{doc.estimatedMinutes}m · <span className="text-gold font-semibold">{doc.reward} 🪙</span>{isNext && <span className="font-bold ml-1" style={{ color: `hsl(${hue} 60% 40%)` }}>· Up next</span>}</>
                              : "Coming soon"}
                          </p>
                        </div>
                        {doc.available && <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" />}
                      </button>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>
      </main>
    </div>
  );
}
