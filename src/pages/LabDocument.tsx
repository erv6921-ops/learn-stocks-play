import React, { useState, useCallback, useRef, useEffect, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useApp } from "@/contexts/AppContext"
import { getLabDocument, labFormFields, markLabDocDone, FormField } from "@/data/labDocuments"
import { supabase } from "@/integrations/supabase/client"
import GameNav from "@/components/GameNav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import { stripDashes } from "@/lib/text"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft, ArrowRight, ArrowDown, CheckCircle, XCircle, Coins,
  Lightbulb, FlaskConical, Loader2, Send, Info, FileText,
  ChevronDown, ChevronUp, Eye, EyeOff, BookOpen, AlertTriangle,
  Calendar, HelpCircle, Shield,
} from "lucide-react"

/* ────────────────────────────────────────────── */
/*  MAIN COMPONENT                                */
/* ────────────────────────────────────────────── */

export default function LabDocument() {
  const { docId } = useParams<{ docId: string }>()
  const navigate = useNavigate()
  const { earnJeffs, getRewardMultiplier } = useApp()

  const result = getLabDocument(docId || "")
  const [formValues, setFormValues] = useState<Record<string, string>>({})
  const [fieldFeedback, setFieldFeedback] = useState<Record<string, { correct: boolean; feedback: string; tip: string }>>({})
  const [loadingField, setLoadingField] = useState<string | null>(null)
  const [completed, setCompleted] = useState(false)
  const [guidedMode, setGuidedMode] = useState(true)
  const [activeFieldId, setActiveFieldId] = useState<string | null>(null)
  const [expandedExplanations, setExpandedExplanations] = useState<Set<string>>(new Set())
  const [showEducation, setShowEducation] = useState(true)
  const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const formTopRef = useRef<HTMLDivElement>(null)

  // ── Derived data ──
  const fields = labFormFields[docId || ""] ?? []
  const sections = useMemo(() => {
    const seen = new Map<string, number>()
    fields.forEach(f => { if (!seen.has(f.section)) seen.set(f.section, f.sectionNumber) })
    return Array.from(seen.entries()).map(([name, num]) => ({ name, number: num }))
  }, [fields])

  const totalRequired = fields.filter(f => f.required).length
  const filledRequired = fields.filter(f => f.required && formValues[f.id]?.trim()).length
  const overallProgress = totalRequired > 0 ? Math.round((filledRequired / totalRequired) * 100) : 0

  // In guided mode, auto-focus next empty required field
  useEffect(() => {
    if (!guidedMode || completed) return
    const nextEmpty = fields.find(f => f.required && (!formValues[f.id] || !formValues[f.id].trim()))
    if (nextEmpty && activeFieldId !== nextEmpty.id) {
      setActiveFieldId(nextEmpty.id)
    }
  }, [formValues, guidedMode, completed, fields, activeFieldId])

  // Scroll to active field in guided mode
  useEffect(() => {
    if (!guidedMode || !activeFieldId) return
    const el = fieldRefs.current[activeFieldId]
    if (el) {
      const timer = setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "center" })
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [activeFieldId, guidedMode])

  const toggleExplanation = (fieldId: string) => {
    setExpandedExplanations(prev => {
      const next = new Set(prev)
      next.has(fieldId) ? next.delete(fieldId) : next.add(fieldId)
      return next
    })
  }

  const requestFeedback = useCallback(async (field: FormField) => {
    const value = formValues[field.id]
    if (!value || value.trim() === "") {
      toast({ title: "Please fill in the field first", variant: "destructive" })
      return
    }
    setLoadingField(field.id)
    try {
      const { data, error } = await supabase.functions.invoke("lab-feedback", {
        body: {
          documentType: `${doc.title} - ${doc.subtitle}`,
          fieldName: field.label,
          fieldValue: value,
          allFields: formValues,
        },
      })
      if (error) throw error
      const fb = data as { correct: boolean; feedback: string; tip: string }
      setFieldFeedback(prev => ({
        ...prev,
        // Strip dashes so AI feedback reads human, not machine-written.
        [field.id]: { ...fb, feedback: stripDashes(fb.feedback || ""), tip: stripDashes(fb.tip || "") },
      }))

      // In guided mode, advance to next field after feedback
      if (guidedMode) {
        const idx = fields.findIndex(f => f.id === field.id)
        const nextField = fields.slice(idx + 1).find(f => f.required && (!formValues[f.id] || !formValues[f.id].trim()))
        if (nextField) {
          setTimeout(() => setActiveFieldId(nextField.id), 600)
        }
      }
    } catch (err) {
      console.error("Feedback error:", err)
      toast({ title: "Couldn't get feedback - try again", variant: "destructive" })
    } finally {
      setLoadingField(null)
    }
  }, [formValues, guidedMode, fields])

  const handleSubmitAll = useCallback(async () => {
    // In independent mode, check all at once
    const requiredFields = fields.filter(f => f.required)
    const unfilled = requiredFields.filter(f => !formValues[f.id]?.trim())
    if (unfilled.length > 0) {
      toast({ title: `Please fill in all required fields (${unfilled.length} remaining)`, variant: "destructive" })
      return
    }
    setCompleted(true)
    markLabDocDone(doc.id)
    earnJeffs(doc.reward, `Completed Lab: ${doc.title}`)
  }, [fields, formValues])

  const handleComplete = () => {
    setCompleted(true)
    markLabDocDone(doc.id)
    earnJeffs(doc.reward, `Completed Lab: ${doc.title}`)
  }

  const setValue = (fieldId: string, value: string) => {
    setFormValues(prev => ({ ...prev, [fieldId]: value }))
    // Clear feedback if value changes
    if (fieldFeedback[fieldId]) {
      setFieldFeedback(prev => {
        const next = { ...prev }
        delete next[fieldId]
        return next
      })
    }
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-background">
        <GameNav />
        <div className="flex items-center justify-center pt-20">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Document not found</h2>
            <Button onClick={() => navigate("/lab")}>Back to Lab</Button>
          </div>
        </div>
      </div>
    )
  }

  const { document: doc, category } = result
  const allRequiredFilled = fields.filter(f => f.required).every(f => formValues[f.id]?.trim())
  const allChecked = fields.filter(f => f.required).every(f => fieldFeedback[f.id])

  /* ═══════════════════════════════════════════════ */
  /*  COMPLETION SCREEN                              */
  /* ═══════════════════════════════════════════════ */
  if (completed) {
    return (
      <div className="min-h-screen bg-background pb-24 md:pb-8">
        <GameNav />
        <main className="container mx-auto px-4 py-10 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card variant="elevated">
              <CardContent className="p-8 text-center space-y-5">
                <div className="w-20 h-20 mx-auto rounded-full bg-success/20 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-success" />
                </div>
                <h2 className="text-2xl font-bold">Lab Complete! 🧪</h2>
                <p className="text-muted-foreground">You've successfully practiced the {doc.title}.</p>
                <div className="bg-gold/10 border border-gold/20 rounded-xl p-4">
                  <div className="flex items-center justify-center gap-2">
                    <Coins className="w-5 h-5 text-gold" />
                    <span className="text-2xl font-semibold text-gold">
                      +{Math.round(doc.reward * getRewardMultiplier()).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">InvestiCoins earned!</p>
                </div>
                <Button onClick={() => navigate("/lab")} className="min-h-[44px]">
                  Back to Lab <ArrowRight className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    )
  }

  /* ═══════════════════════════════════════════════ */
  /*  MAIN DOCUMENT VIEW                             */
  /* ═══════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <GameNav />

      {/* ── Sticky Header ── */}
      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-14 gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/lab")} className="min-h-[44px] min-w-[44px]">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{doc.title}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <Progress value={overallProgress} className="h-1.5 flex-1 max-w-[160px]" variant="success" />
                <span className="text-[10px] text-muted-foreground font-medium">{overallProgress}%</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Guided mode toggle */}
              <div className="hidden sm:flex items-center gap-1.5 bg-muted/50 rounded-lg px-2.5 py-1.5 border border-border/50">
                <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-[10px] font-semibold text-muted-foreground">Guided</span>
                <Switch
                  checked={guidedMode}
                  onCheckedChange={setGuidedMode}
                  className="scale-75"
                />
              </div>
              <Badge variant="outline" className="text-xs gap-1">
                <Coins className="w-3 h-3 text-gold" />{doc.reward}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 max-w-3xl">

        {/* ═══ EDUCATION BLOCK ═══ */}
        {doc.education && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Card variant="elevated" className="overflow-hidden border-primary/10">
              {/* Header */}
              <div
                className="p-5 md:p-6"
                style={{
                  background: "var(--brand-deep)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "hsl(42 85% 48% / 0.12)", border: "1px solid hsl(42 85% 48% / 0.1)" }}
                  >
                    <FileText className="w-5 h-5" style={{ color: "hsl(42 85% 48% / 0.8)" }} />
                  </div>
                  <div>
                    <h1 className="text-lg md:text-xl font-bold text-white">{doc.title}</h1>
                    <p className="text-white/40 text-xs">{doc.subtitle}</p>
                  </div>
                </div>

                {/* Collapsible education content */}
                <button
                  onClick={() => setShowEducation(!showEducation)}
                  className="flex items-center gap-1.5 text-white/60 text-xs font-semibold hover:text-white/80 transition-colors mt-2"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  {showEducation ? "Hide" : "Show"} learning guide
                  {showEducation ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              <AnimatePresence>
                {showEducation && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <CardContent className="p-5 md:p-6 space-y-4">
                      <EducationItem icon={HelpCircle} label="What is this document?" text={doc.education.whatItIs} />
                      <EducationItem icon={Calendar} label="When do you fill it out?" text={doc.education.whenYouFillItOut} />
                      <EducationItem icon={Shield} label="Why does it matter?" text={doc.education.whyItMatters} />
                      <EducationItem icon={AlertTriangle} label="What happens if done incorrectly?" text={doc.education.whatHappensIfWrong} accentColor="destructive" />

                      <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl p-3.5">
                        <p className="text-xs font-semibold text-amber-600 flex items-center gap-1.5 mb-1">
                          <Info className="w-3.5 h-3.5" /> Educational Simulation
                        </p>
                        <p className="text-xs text-muted-foreground">
                          This is a simplified educational version. Do NOT enter real personal information like your actual SSN.
                        </p>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                        <span>⏱ ~{doc.estimatedMinutes} minutes</span>
                        <span className="flex items-center gap-1"><Coins className="w-3 h-3 text-gold" />{doc.reward} on completion</span>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}

        {/* ── Mobile guided toggle ── */}
        <div className="sm:hidden flex items-center justify-between bg-muted/30 rounded-xl px-4 py-3 mb-4 border border-border/50">
          <div className="flex items-center gap-2">
            {guidedMode ? <Eye className="w-4 h-4 text-primary" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
            <span className="text-sm font-semibold">{guidedMode ? "Guided Mode" : "Independent Mode"}</span>
          </div>
          <Switch checked={guidedMode} onCheckedChange={setGuidedMode} />
        </div>

        {/* ═══ SINGLE CONTINUOUS FORM SHEET ═══ */}
        <div ref={formTopRef}>
          <Card variant="elevated" className="overflow-hidden">
            {/* Document title bar */}
            <div className="bg-primary/5 border-b border-border px-5 py-3 flex items-center gap-3">
              <FlaskConical className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-wider flex-1">
                {doc.title} - {doc.subtitle}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {filledRequired}/{totalRequired} required fields
              </span>
            </div>

            <div className="divide-y divide-border">
              {sections.map((section, sectionIdx) => {
                const sectionFields = fields.filter(f => f.section === section.name)
                const sectionFilled = sectionFields.filter(f => !f.required || formValues[f.id]?.trim()).length
                const sectionTotal = sectionFields.length
                const sectionComplete = sectionFilled === sectionTotal

                return (
                  <div key={section.name} className="relative">
                    {/* Section header */}
                    <div className="px-5 py-3 bg-muted/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                          sectionComplete
                            ? "bg-success/15 text-success"
                            : "bg-primary/10 text-primary"
                        }`}>
                          {sectionComplete ? <CheckCircle className="w-3.5 h-3.5" /> : section.number}
                        </div>
                        <span className="text-sm font-semibold">{section.name}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">{sectionFilled}/{sectionTotal}</span>
                    </div>

                    {/* Fields */}
                    <div className="px-5 py-4 space-y-5">
                      {sectionFields.map((field) => {
                        const isActive = guidedMode && activeFieldId === field.id
                        const hasFeedback = !!fieldFeedback[field.id]
                        const hasValue = !!formValues[field.id]?.trim()
                        const isExpanded = expandedExplanations.has(field.id)

                        return (
                          <div
                            key={field.id}
                            ref={el => { fieldRefs.current[field.id] = el }}
                            className={`relative rounded-xl transition-all duration-300 ${
                              isActive
                                ? "bg-primary/[0.03] ring-2 ring-primary/20 p-4 -mx-1"
                                : "p-0"
                            }`}
                            onClick={() => !guidedMode && setActiveFieldId(field.id)}
                          >
                            {/* Guided mode indicator arrow */}
                            {isActive && guidedMode && (
                              <motion.div
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="absolute -left-1 top-4 flex items-center gap-1"
                              >
                                <ArrowRight className="w-4 h-4 text-primary animate-pulse" />
                              </motion.div>
                            )}

                            <Label
                              htmlFor={field.id}
                              className={`text-sm font-medium flex items-center gap-1.5 mb-1.5 ${
                                isActive && guidedMode ? "pl-5" : ""
                              }`}
                            >
                              {field.label}
                              {field.required && <span className="text-destructive text-xs">*</span>}
                              {hasFeedback && fieldFeedback[field.id].correct && (
                                <CheckCircle className="w-3.5 h-3.5 text-success" />
                              )}
                            </Label>

                            {/* Help text - always shown in guided, hover in independent */}
                            {field.helpText && (guidedMode || isActive) && (
                              <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-2.5 border border-border/50 mb-2.5"
                              >
                                💡 {field.helpText}
                              </motion.p>
                            )}

                            {/* Input */}
                            {field.type === "text" && (
                              <Input
                                id={field.id}
                                value={formValues[field.id] || ""}
                                onChange={(e) => setValue(field.id, e.target.value)}
                                placeholder={field.placeholder}
                                maxLength={field.validation?.maxLength}
                                className="min-h-[44px]"
                              />
                            )}

                            {field.type === "number" && (
                              <Input
                                id={field.id}
                                type="number"
                                value={formValues[field.id] || ""}
                                onChange={(e) => setValue(field.id, e.target.value)}
                                placeholder={field.placeholder}
                                min={field.validation?.min}
                                max={field.validation?.max}
                                className="min-h-[44px]"
                              />
                            )}

                            {field.type === "radio" && field.options && (
                              <RadioGroup
                                value={formValues[field.id] || ""}
                                onValueChange={(val) => setValue(field.id, val)}
                                className="space-y-2"
                              >
                                {field.options.map((opt) => (
                                  <div key={opt.value} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/40 transition-colors min-h-[44px]">
                                    <RadioGroupItem value={opt.value} id={`${field.id}-${opt.value}`} />
                                    <Label htmlFor={`${field.id}-${opt.value}`} className="text-sm cursor-pointer flex-1">
                                      {opt.label}
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            )}

                            {/* "Why this matters" expandable - guided mode */}
                            {guidedMode && field.whyItMatters && (
                              <button
                                onClick={() => toggleExplanation(field.id)}
                                className="flex items-center gap-1.5 text-[11px] text-primary/70 font-semibold mt-2 hover:text-primary transition-colors"
                              >
                                <Lightbulb className="w-3 h-3" />
                                Why this matters
                                {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                              </button>
                            )}

                            <AnimatePresence>
                              {isExpanded && field.whyItMatters && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-2 p-3 rounded-lg bg-primary/[0.04] border border-primary/10 text-xs text-muted-foreground leading-relaxed">
                                    {field.whyItMatters}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Check answer / feedback */}
                            {hasValue && !hasFeedback && (
                              <div className="mt-2.5">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => requestFeedback(field)}
                                  disabled={loadingField === field.id}
                                  className="text-xs gap-1.5 min-h-[40px]"
                                >
                                  {loadingField === field.id ? (
                                    <><Loader2 className="w-3 h-3 animate-spin" /> Checking...</>
                                  ) : (
                                    <><Send className="w-3 h-3" /> Check my answer</>
                                  )}
                                </Button>
                              </div>
                            )}

                            {hasFeedback && (
                              <motion.div
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`mt-2.5 p-3.5 rounded-xl border text-sm ${
                                  fieldFeedback[field.id].correct
                                    ? "bg-success/5 border-success/20"
                                    : "bg-amber-500/5 border-amber-500/20"
                                }`}
                              >
                                <div className="flex items-start gap-2">
                                  {fieldFeedback[field.id].correct
                                    ? <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                                    : <XCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                  }
                                  <p className="text-xs text-foreground leading-relaxed">{fieldFeedback[field.id].feedback}</p>
                                </div>
                                <div className="mt-2 flex items-start gap-1.5 pl-6">
                                  <Lightbulb className="w-3 h-3 text-gold mt-0.5 flex-shrink-0" />
                                  <p className="text-xs text-muted-foreground italic">{fieldFeedback[field.id].tip}</p>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* ── Form Footer ── */}
            <div className="border-t border-border px-5 py-4 bg-muted/10">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Progress value={overallProgress} className="h-2 w-24" variant="success" />
                  <span>{overallProgress}% complete</span>
                </div>
                <Button
                  onClick={guidedMode ? handleComplete : handleSubmitAll}
                  disabled={!allRequiredFilled}
                  className="min-h-[48px] gap-2 text-sm font-semibold"
                >
                  {allRequiredFilled ? (
                    <>Complete Document <CheckCircle className="w-4 h-4" /></>
                  ) : (
                    <>Fill all required fields ({totalRequired - filledRequired} left)</>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

/* ────────────────────────────────────────────── */
/*  SUB-COMPONENTS                                */
/* ────────────────────────────────────────────── */

function EducationItem({
  icon: Icon,
  label,
  text,
  accentColor = "primary",
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  text: string
  accentColor?: string
}) {
  const colorMap: Record<string, string> = {
    primary: "text-primary bg-primary/10",
    destructive: "text-destructive bg-destructive/10",
  }
  const c = colorMap[accentColor] || colorMap.primary
  const [iconBg, iconText] = c.split(" ")

  return (
    <div className="flex items-start gap-3">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${c}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-0.5">{label}</p>
        <p className="text-sm text-foreground leading-relaxed">{text}</p>
      </div>
    </div>
  )
}
