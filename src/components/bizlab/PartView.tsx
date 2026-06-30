import React from "react"
import { motion } from "framer-motion"
import {
  BookOpen, ListChecks, Sparkles, CheckCircle2, Circle, Coins, Timer, Users, Lightbulb,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { BizLabPart, PROBLEMS_FOR_TEENS } from "@/data/bizLab"
import { useBizLabStore } from "@/stores/bizLabStore"
import { useApp } from "@/contexts/AppContext"
import { bizIcon } from "./icons"
import Flashcards from "./Flashcards"
import ReflectionJournal from "./ReflectionJournal"
import SubmissionForm from "./SubmissionForm"
import RubricCard from "./RubricCard"

function SectionBlock({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="font-display font-bold text-lg">{title}</h3>
      </div>
      {children}
    </section>
  )
}

export default function PartView({ part }: { part: BizLabPart }) {
  const { toast } = useToast()
  const { earnJeffs } = useApp()
  const activities = useBizLabStore(s => s.activities)
  const toggleActivity = useBizLabStore(s => s.toggleActivity)
  const submissions = useBizLabStore(s => s.submissions)
  const journals = useBizLabStore(s => s.journals)
  const completedParts = useBizLabStore(s => s.completedParts)
  const completePart = useBizLabStore(s => s.completePart)
  const hasAwarded = useBizLabStore(s => s.hasAwarded)
  const markAwarded = useBizLabStore(s => s.markAwarded)

  const Icon = bizIcon(part.icon)
  const isComplete = completedParts.includes(part.id)

  // Completion gating: every submission saved + every reflection answered.
  const allSubmissionsSaved = part.submissions.every(s => !!submissions[s.submissionType])
  const allReflectionsAnswered = part.reflections.every(r => (journals[r.id] ?? "").trim().length > 0)
  const canComplete = allSubmissionsSaved && allReflectionsAnswered

  const handleComplete = () => {
    const newly = completePart(part.id)
    const key = `part:${part.id}`
    if (newly && !hasAwarded(key)) {
      earnJeffs(part.xp, `Completed Biz Lab ${part.title}`)
      markAwarded(key)
      toast({ title: `Part ${part.number} complete! 🦈`, description: `+${part.xp} InvestiCoins. Badge unlocked!` })
    }
  }

  return (
    <motion.div
      key={part.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      {/* Part header */}
      <div
        className="relative overflow-hidden rounded-[20px] p-5 md:p-6 text-white"
        style={{ background: `linear-gradient(135deg, ${part.accent[0]}, ${part.accent[1]})` }}
      >
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 25% 15%, white 1px, transparent 1px)", backgroundSize: "22px 22px" }}
        />
        <div className="relative flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/55">
              Part {part.number} {isComplete && "· ✓ Complete"}
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold leading-tight mt-0.5">{part.title}</h2>
            <p className="text-white/70 text-sm mt-1">{part.subtitle}</p>
            <div className="flex items-center gap-3 mt-3 text-xs text-white/70">
              <span className="inline-flex items-center gap-1"><Timer className="w-3.5 h-3.5" /> ~{part.estMinutes} min</span>
              <span className="inline-flex items-center gap-1"><Coins className="w-3.5 h-3.5 text-gold" /> up to {part.xp + part.submissions.reduce((s, x) => s + x.xp, 0)} coins</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overview */}
      <SectionBlock title="Overview" icon={<BookOpen className="w-5 h-5 text-primary" />}>
        <div className="space-y-3 text-sm text-foreground/90 leading-relaxed">
          {part.overview.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </SectionBlock>

      {/* Part 1 special: brainstorming list */}
      {part.id === "part-1" && (
        <SectionBlock title="100 Problems for Teens — Brainstorm Starters" icon={<Lightbulb className="w-5 h-5 text-gold" />}>
          <p className="text-sm text-muted-foreground mb-3">
            Every business starts with a problem. Scan these for inspiration — which ones frustrate you most?
          </p>
          <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto pr-1">
            {PROBLEMS_FOR_TEENS.map((p, i) => (
              <span key={i} className="text-xs bg-muted rounded-full px-3 py-1.5 border border-border/50">
                {p}
              </span>
            ))}
          </div>
        </SectionBlock>
      )}

      {/* Vocabulary flashcards */}
      <SectionBlock title="Vocabulary Flashcards" icon={<Sparkles className="w-5 h-5 text-gold" />}>
        <Flashcards terms={part.vocab} />
      </SectionBlock>

      {/* Content sections */}
      {part.sections.map((sec, i) => (
        <SectionBlock key={i} title={sec.heading} icon={<BookOpen className="w-5 h-5 text-primary" />}>
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
        </SectionBlock>
      ))}

      {/* Activities */}
      <SectionBlock title="Hands-On Activities" icon={<ListChecks className="w-5 h-5 text-primary" />}>
        <div className="space-y-3">
          {part.activities.map(act => {
            const done = !!activities[act.id]
            return (
              <div key={act.id} className="rounded-xl border border-border/50 p-4">
                <button
                  onClick={() => toggleActivity(act.id, !done)}
                  className="flex items-start gap-3 w-full text-left"
                >
                  {done ? (
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground/50 shrink-0 mt-0.5" />
                  )}
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
                        {act.steps.map((st, k) => (
                          <li key={k}>{st}</li>
                        ))}
                      </ol>
                    )}
                  </div>
                </button>
              </div>
            )
          })}
        </div>
      </SectionBlock>

      {/* Submissions */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-lg flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-primary" /> Submit Your Work
        </h3>
        {part.submissions.map(spec => (
          <SubmissionForm key={spec.submissionType} spec={spec} />
        ))}
      </div>

      {/* Reflection journal */}
      <ReflectionJournal partId={part.id} prompts={part.reflections} />

      {/* Part 6 special: rubric */}
      {part.id === "part-6" && <RubricCard />}

      {/* Complete part */}
      <div className="rounded-2xl border border-border/60 bg-muted/30 p-5 text-center">
        {isComplete ? (
          <div className="inline-flex items-center gap-2 text-success font-bold">
            <CheckCircle2 className="w-5 h-5" /> Part {part.number} complete — nice work!
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-3">
              {canComplete
                ? "You've finished everything in this part. Lock it in to earn your badge!"
                : "Save all submissions and reflections to complete this part."}
            </p>
            <Button variant="hero" size="lg" disabled={!canComplete} onClick={handleComplete}>
              Complete Part {part.number} (+{part.xp})
            </Button>
          </>
        )}
      </div>
    </motion.div>
  )
}
