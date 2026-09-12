import React from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { sectionLabel } from "@/lib/lessonPreview"
import type { LessonSection } from "@/types"
import { Eye, X, CheckCircle2, RotateCcw } from "lucide-react"

// Chrome the lesson players show ONLY in teacher preview mode: the sticky
// "nothing is saved" banner, the section jump menu, and the end-of-preview
// card that replaces the student completion screen (which awards coins and
// persists scores).

export function TeacherPreviewBanner({ onExit }: { onExit?: () => void }) {
  return (
    <div
      role="status"
      className="flex items-center justify-between gap-3 border-b border-amber-300 bg-amber-100 px-4 py-2 text-amber-900 dark:border-amber-700 dark:bg-amber-950/60 dark:text-amber-100"
    >
      <span className="flex items-center gap-2 text-sm font-semibold">
        <Eye className="h-4 w-4 shrink-0" />
        Teacher Preview: nothing is saved
      </span>
      {onExit && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onExit}
          className="h-7 gap-1 text-amber-900 hover:bg-amber-200 dark:text-amber-100 dark:hover:bg-amber-900/60"
        >
          <X className="h-3.5 w-3.5" /> Close preview
        </Button>
      )}
    </div>
  )
}

export function PreviewSectionNav({
  sections,
  currentIdx,
  onJump,
}: {
  sections: LessonSection[]
  currentIdx: number
  onJump: (idx: number) => void
}) {
  if (sections.length === 0) return null
  return (
    <nav aria-label="Jump to section" className="rounded-xl border border-border bg-card p-2">
      <p className="mb-1.5 px-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        Jump to section
      </p>
      <div className="flex flex-wrap gap-1.5">
        {sections.map((s, i) => {
          const active = i === currentIdx
          return (
            <button
              key={i}
              type="button"
              onClick={() => onJump(i)}
              aria-current={active ? "step" : undefined}
              className={cn(
                "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-muted",
              )}
            >
              <span className="mr-1 opacity-60">{i + 1}.</span>
              {sectionLabel(s, i, sections)}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export function PreviewCompleteCard({
  correct,
  total,
  onRestart,
  onExit,
}: {
  correct: number
  total: number
  onRestart: () => void
  onExit?: () => void
}) {
  return (
    <Card variant="elevated">
      <CardContent className="space-y-4 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600 dark:text-emerald-400" />
        <h2 className="text-xl font-bold text-foreground">End of lesson preview</h2>
        <p className="text-sm text-muted-foreground">
          You answered {correct} of {total} mastery questions correctly. Nothing was saved to your
          account or to any student.
        </p>
        <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:justify-center">
          <Button variant="outline" onClick={onRestart}>
            <RotateCcw className="mr-2 h-4 w-4" /> Restart preview
          </Button>
          {onExit && <Button onClick={onExit}>Close preview</Button>}
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Full-screen overlay shell shared by the lesson preview and question bank
 * modals. Portals to <body>, locks page scroll while open, closes on Escape.
 * `title` renders a header bar with a close button; omit it when the content
 * brings its own chrome (the lesson players show the preview banner).
 */
export function PreviewOverlay({
  open,
  onClose,
  title,
  subtitle,
  children,
}: {
  open: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  children: React.ReactNode
}) {
  React.useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [open, onClose])

  if (!open || typeof document === "undefined") return null
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title ?? "Lesson preview"}
      className="fixed inset-0 z-[80] flex flex-col bg-background text-foreground"
    >
      {title && (
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold">{title}</h2>
            {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={onClose} className="shrink-0 gap-1">
            <X className="h-4 w-4" /> Close
          </Button>
        </div>
      )}
      <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
    </div>,
    document.body,
  )
}
