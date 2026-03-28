import React, { useMemo } from "react"
import { Link } from "react-router-dom"
import { useApp } from "@/contexts/AppContext"
import { lessons, unitInfo, getLessonsByUnit } from "@/data/lessons"
import { ArrowRight, Compass } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * Daily Signal — a curriculum-aware learning nudge that surfaces
 * a contextual recommendation based on the student's progress.
 * Styled with InvestiPlay's dark-emerald premium branding.
 */

interface SignalPayload {
  label: string
  title: string
  description: string
  cta: string
  link: string
}

function getDailySignal(
  lessonProgress: { lessonId: string; completed: boolean }[]
): SignalPayload {
  const isComplete = (id: string) => lessonProgress.some(p => p.lessonId === id && p.completed)

  // Find first unit with some but not all lessons done → "finish this unit"
  for (const unit of unitInfo) {
    const ul = getLessonsByUnit(unit.id)
    const done = ul.filter(l => isComplete(l.id)).length
    if (done > 0 && done < ul.length) {
      const nextLesson = ul.find(l => !isComplete(l.id))
      return {
        label: "Continue Unit",
        title: `You're ${Math.round((done / ul.length) * 100)}% through ${unit.title}`,
        description: `${ul.length - done} lessons remaining — finish strong.`,
        cta: "Resume",
        link: nextLesson ? `/lessons/${nextLesson.id}` : "/lessons",
      }
    }
  }

  // Find first completely untouched unit → "explore new topic"
  for (const unit of unitInfo) {
    const ul = getLessonsByUnit(unit.id)
    const done = ul.filter(l => isComplete(l.id)).length
    if (done === 0 && ul.length > 0) {
      return {
        label: "New Territory",
        title: `Ready for ${unit.title}?`,
        description: `${ul.length} lessons covering Level ${unit.level} concepts.`,
        cta: "Start",
        link: `/lessons/${ul[0].id}`,
      }
    }
  }

  // All done
  return {
    label: "All Clear",
    title: "You've completed the full curriculum",
    description: "Review any lesson to reinforce your knowledge.",
    cta: "Browse",
    link: "/lessons",
  }
}

export default function DailySignal() {
  const { lessonProgress } = useApp()

  const signal = useMemo(() => getDailySignal(lessonProgress), [lessonProgress])

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/[0.06]"
      style={{
        background: "linear-gradient(135deg, hsl(170 72% 14%) 0%, hsl(170 55% 18%) 50%, hsl(168 50% 22%) 100%)",
      }}
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      />

      <div className="relative flex flex-col md:flex-row md:items-center gap-3 md:gap-4 p-4 md:p-5">
        {/* Icon + Content row */}
        <div className="flex items-start md:items-center gap-3 flex-1 min-w-0">
          <div className="shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, hsl(42 85% 48% / 0.15), hsl(42 85% 48% / 0.05))", border: "1px solid hsl(42 85% 48% / 0.12)" }}
          >
            <Compass className="w-4 h-4 md:w-5 md:h-5" style={{ color: "hsl(42 85% 48% / 0.8)" }} />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-0.5"
              style={{ color: "hsl(42 85% 48% / 0.6)" }}
            >
              Daily Signal · {signal.label}
            </p>
            <p className="text-sm font-semibold text-white/90">{signal.title}</p>
            <p className="text-xs mt-0.5" style={{ color: "hsl(0 0% 100% / 0.35)" }}>{signal.description}</p>
          </div>
        </div>

        {/* CTA — full width on mobile */}
        <Link to={signal.link} className="shrink-0 block">
          <Button size="sm" className="w-full md:w-auto gap-1.5 text-xs font-semibold rounded-lg min-h-[44px] md:min-h-0"
            style={{
              background: "linear-gradient(135deg, hsl(42 85% 48% / 0.2), hsl(42 85% 48% / 0.1))",
              color: "hsl(42 85% 48% / 0.9)",
              border: "1px solid hsl(42 85% 48% / 0.15)",
            }}
          >
            {signal.cta} <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
