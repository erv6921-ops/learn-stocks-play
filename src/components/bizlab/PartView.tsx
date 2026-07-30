import React, { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen, ListChecks, Sparkles, CheckCircle2, Circle, Coins, Timer, Users, Lightbulb,
  GraduationCap, Hammer, BookHeart, ArrowLeft, ArrowRight, ChevronDown, PartyPopper,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import JeffSidekick from "./JeffSidekick"
import { useToast } from "@/hooks/use-toast"
import { BizLabPart, PROBLEMS_FOR_TEENS } from "@/data/bizLab"
import { useBizLabStore } from "@/stores/bizLabStore"
import { useApp } from "@/contexts/AppContext"
import { bizIcon } from "./icons"
import Flashcards from "./Flashcards"
import ReflectionJournal from "./ReflectionJournal"
import SubmissionForm from "./SubmissionForm"
import RubricCard from "./RubricCard"
import TemplateBox from "./TemplateBox"

type StageId = "brief" | "words" | "learn" | "do" | "build" | "reflect"

const STAGES: { id: StageId; label: string; icon: typeof BookOpen }[] = [
  { id: "brief", label: "Brief", icon: BookOpen },
  { id: "words", label: "Words", icon: Sparkles },
  { id: "learn", label: "Learn", icon: GraduationCap },
  { id: "do", label: "Do", icon: ListChecks },
  { id: "build", label: "Build", icon: Hammer },
  { id: "reflect", label: "Reflect", icon: BookHeart },
]

type JeffMood = "happy" | "thinking" | "excited" | "teaching" | "celebrating"

function jeffFor(stage: StageId, part: BizLabPart): { mood: JeffMood; line: string } {
  switch (stage) {
    case "brief":
      return { mood: "excited", line: part.jeffIntro ?? `Part ${part.number}: ${part.subtitle}!` }
    case "words":
      return { mood: "teaching", line: "Lock in these power-words - flip every card and you'll talk like a real founder! 📚" }
    case "learn":
      return { mood: "teaching", line: "Here's the playbook. Tap each card to open it. 🧠" }
    case "do":
      return { mood: "happy", line: "Enough reading - time to take ACTION! Check off each move. 💪" }
    case "build":
      return { mood: "thinking", line: "Show me what you've built. Stuck? Grab a template to get rolling. 🛠️" }
    case "reflect":
      return { mood: "happy", line: "Brain check-in - be honest, how'd it go? 💭" }
  }
}

// ── A collapsible content card used in the "Learn" stage ───────────────────
function LearnAccordion({ part }: { part: BizLabPart }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="space-y-2.5">
      {part.sections.map((sec, i) => {
        const isOpen = open === i
        return (
          <div key={i} className="rounded-2xl border border-border/60 bg-card overflow-hidden">
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left"
            >
              <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                {i + 1}
              </div>
              <span className="flex-1 font-bold text-sm">{sec.heading}</span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="px-4 pb-4 pt-0">
                    {sec.body && <p className="text-sm text-foreground/90 leading-relaxed mb-2">{sec.body}</p>}
                    {sec.bullets && (
                      <ul className="text-sm text-foreground/90 space-y-1.5 list-disc list-inside">
                        {sec.bullets.map((b, j) => (
                          <li key={j}>{b}</li>
                        ))}
                      </ul>
                    )}
                    {sec.note && (
                      <div className="mt-3 rounded-xl bg-primary/10 border border-primary/20 px-3 py-2 text-sm text-foreground">
                        💡 {sec.note}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export default function PartView({ part }: { part: BizLabPart }) {
  const { toast } = useToast()
  const { earnJeffs } = useApp()
  const [celebrate, setCelebrate] = useState(0)
  const activities = useBizLabStore(s => s.activities)
  const toggleActivity = useBizLabStore(s => s.toggleActivity)
  const submissions = useBizLabStore(s => s.submissions)
  const journals = useBizLabStore(s => s.journals)
  const viewedTerms = useBizLabStore(s => s.viewedTerms)
  const completedParts = useBizLabStore(s => s.completedParts)
  const completePart = useBizLabStore(s => s.completePart)
  const hasAwarded = useBizLabStore(s => s.hasAwarded)
  const markAwarded = useBizLabStore(s => s.markAwarded)

  const [stageIdx, setStageIdx] = useState(0)
  const stage = STAGES[stageIdx]
  const Icon = bizIcon(part.icon)
  const isComplete = completedParts.includes(part.id)
  const jeff = jeffFor(stage.id, part)

  // Reset to the first stage when switching parts.
  const partKeyRef = React.useRef(part.id)
  if (partKeyRef.current !== part.id) {
    partKeyRef.current = part.id
    if (stageIdx !== 0) setStageIdx(0)
  }

  const allSubmissionsSaved = part.submissions.every(s => !!submissions[s.submissionType])
  const allReflectionsAnswered = part.reflections.every(r => (journals[r.id] ?? "").trim().length > 0)
  const allWordsViewed = part.vocab.every(v => viewedTerms.includes(v.term))
  const canComplete = allSubmissionsSaved && allReflectionsAnswered

  const stageDone = (i: number): boolean => {
    const id = STAGES[i].id
    if (id === "words") return allWordsViewed
    if (id === "build") return allSubmissionsSaved
    if (id === "reflect") return allReflectionsAnswered
    return i < stageIdx
  }

  const goNext = () => {
    if (stageIdx < STAGES.length - 1) setStageIdx(stageIdx + 1)
  }
  const goBack = () => stageIdx > 0 && setStageIdx(stageIdx - 1)

  const handleComplete = () => {
    const newly = completePart(part.id)
    const key = `part:${part.id}`
    if (newly && !hasAwarded(key)) {
      earnJeffs(part.xp, `Completed Biz Lab ${part.title}`)
      markAwarded(key)
      setCelebrate(c => c + 1) // triggers Jeff's big party flip
      toast({ title: `Part ${part.number} complete! 🦈`, description: `+${part.xp} InvestiCoins. Badge unlocked!` })
    }
  }

  return (
    <motion.div
      key={part.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Slim part header */}
      <div
        className="relative overflow-hidden rounded-[20px] p-4 md:p-5 text-white"
        style={{ background: `linear-gradient(135deg, ${part.accent[0]}, ${part.accent[1]})` }}
      >
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 25% 15%, white 1px, transparent 1px)", backgroundSize: "22px 22px" }}
        />
        <div className="relative flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/55">
              Part {part.number} {isComplete && "· ✓ Complete"}
            </p>
            <h2 className="font-display text-xl md:text-2xl font-extrabold leading-tight">{part.title}</h2>
          </div>
          <div className="hidden sm:flex flex-col items-end gap-1 text-xs text-white/70 shrink-0">
            <span className="inline-flex items-center gap-1"><Timer className="w-3.5 h-3.5" /> ~{part.estMinutes}m</span>
            <span className="inline-flex items-center gap-1"><Coins className="w-3.5 h-3.5 text-gold" /> {part.xp + part.submissions.reduce((s, x) => s + x.xp, 0)}</span>
          </div>
        </div>
      </div>

      {/* Side-by-side: big animated Jeff coach on the left, content on the right */}
      <div className="lg:flex lg:gap-6 lg:items-start">
        <aside className="hidden lg:block lg:w-[210px] shrink-0 sticky top-20 self-start">
          <JeffSidekick message={jeff.line} variant="side" celebrateKey={celebrate} />
        </aside>

        <div className="flex-1 min-w-0 space-y-4">
          {/* Mobile Jeff banner */}
          <div className="lg:hidden rounded-2xl border border-border/60 bg-muted/30 p-3">
            <JeffSidekick message={jeff.line} variant="compact" celebrateKey={celebrate} />
          </div>

      {/* Stage stepper */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
        {STAGES.map((s, i) => {
          const active = i === stageIdx
          const done = stageDone(i)
          const SIcon = s.icon
          return (
            <button
              key={s.id}
              onClick={() => setStageIdx(i)}
              className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all border ${
                active
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : done
                  ? "bg-success/10 text-success border-success/30"
                  : "bg-card text-muted-foreground border-border/50 hover:text-foreground"
              }`}
            >
              {done && !active ? <CheckCircle2 className="w-3.5 h-3.5" /> : <SIcon className="w-3.5 h-3.5" />}
              {s.label}
            </button>
          )
        })}
      </div>

      {/* Stage content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stage.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.22 }}
          className="space-y-4"
        >
          {stage.id === "brief" && (
            <>
              <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-3 text-sm text-foreground/90 leading-relaxed">
                {part.overview.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {part.id === "part-1" && (
                <div className="rounded-2xl border border-border/60 bg-card p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-gold" />
                    <h3 className="font-display font-bold">Stuck for ideas? Steal one of these.</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto pr-1">
                    {PROBLEMS_FOR_TEENS.map((p, i) => (
                      <span key={i} className="text-xs bg-muted rounded-full px-3 py-1.5 border border-border/50">{p}</span>
                    ))}
                  </div>
                </div>
              )}
              {part.id === "part-6" && <RubricCard />}
            </>
          )}

          {stage.id === "words" && (
            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <Flashcards terms={part.vocab} />
              {!allWordsViewed && (
                <p className="text-xs text-muted-foreground mt-3 text-center">Flip all {part.vocab.length} cards to light up this stage ✨</p>
              )}
            </div>
          )}

          {stage.id === "learn" && <LearnAccordion part={part} />}

          {stage.id === "do" && (
            <div className="space-y-3">
              {part.activities.map(act => {
                const done = !!activities[act.id]
                return (
                  <div key={act.id} className={`rounded-2xl border p-4 transition-colors ${done ? "border-success/40 bg-success/[0.05]" : "border-border/60 bg-card"}`}>
                    <button onClick={() => toggleActivity(act.id, !done)} className="flex items-start gap-3 w-full text-left">
                      {done ? <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" /> : <Circle className="w-5 h-5 text-muted-foreground/50 shrink-0 mt-0.5" />}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm">{act.title}</span>
                          {act.format && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide bg-muted rounded-full px-2 py-0.5 text-muted-foreground">
                              <Users className="w-3 h-3" /> {act.format}
                            </span>
                          )}
                          {act.timerSeconds && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-orange-500/10 text-orange-500 rounded-full px-2 py-0.5">
                              <Timer className="w-3 h-3" /> {act.timerSeconds}s
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">{act.description}</p>
                        {act.steps && (
                          <ol className="text-sm text-foreground/80 mt-2 space-y-0.5 list-decimal list-inside">
                            {act.steps.map((st, k) => <li key={k}>{st}</li>)}
                          </ol>
                        )}
                      </div>
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {stage.id === "build" && (
            <div className="space-y-4">
              {part.templates?.map((t, i) => <TemplateBox key={i} template={t} />)}
              {part.submissions.map(spec => <SubmissionForm key={spec.submissionType} spec={spec} />)}
            </div>
          )}

          {stage.id === "reflect" && (
            <>
              <ReflectionJournal partId={part.id} prompts={part.reflections} />
              <div className="rounded-2xl border border-border/60 bg-muted/30 p-5 text-center">
                {isComplete ? (
                  <div className="inline-flex items-center gap-2 text-success font-bold">
                    <CheckCircle2 className="w-5 h-5" /> Part {part.number} complete - nice work!
                  </div>
                ) : (
                  <>
                    <PartyPopper className="w-7 h-7 mx-auto text-gold mb-2" />
                    <p className="text-sm text-muted-foreground mb-3">
                      {canComplete
                        ? "You've finished everything in this part. Lock it in to earn your badge!"
                        : "Save all your submissions (Build) and reflections to finish this part."}
                    </p>
                    <Button variant="hero" size="lg" disabled={!canComplete} onClick={handleComplete}>
                      Complete Part {part.number} (+{part.xp})
                    </Button>
                  </>
                )}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Stage nav */}
      <div className="flex items-center justify-between pt-1">
        <Button variant="outline" size="sm" onClick={goBack} disabled={stageIdx === 0}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <span className="text-xs font-semibold text-muted-foreground">
          {stageIdx + 1} / {STAGES.length}
        </span>
        {stageIdx < STAGES.length - 1 ? (
          <Button size="sm" onClick={goNext}>
            Next <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <span className="w-[72px]" />
        )}
      </div>
        </div>
      </div>
    </motion.div>
  )
}
