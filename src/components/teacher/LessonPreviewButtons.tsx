/**
 * LessonPreviewButtons — "Full Lesson" + "Question Bank" for one lesson.
 *
 * Drop this next to any lesson a teacher can see (assigned-lesson rows, the
 * assign flow, the upload page). It owns both modals, so nothing else is needed.
 *
 * Props:
 *   lessonId   (required) One of:
 *                - a built-in library lesson id ("1.1", "gulliver-lo-1", …)
 *                - a generated lesson id (public.lessons.id, a UUID)
 *                - with source="upload": a curriculum_uploads.id for a lesson
 *                  that has NOT been created yet (assign flow, before confirm).
 *                  Previews the upload's pending generated_questions.
 *   source     (optional) "library" | "generated" | "upload". When omitted it is
 *              inferred from the id shape: UUID → "generated", else "library".
 *              "upload" must always be passed explicitly.
 *   lessonName (optional) Display name; used for upload previews and the
 *              Question Bank title when the lesson has no stored name.
 *   size       (optional) "sm" (default) | "default" — button size.
 *   compact    (optional) Icon-only buttons with tooltips, for dense rows.
 *   className  (optional) Extra classes for the wrapper.
 *
 * Example:
 *   <LessonPreviewButtons lessonId={assignment.lesson_id} />
 *   <LessonPreviewButtons lessonId={uploadId} source="upload" lessonName={name} />
 */
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { inferLessonSource, type LessonSource } from "@/lib/lessonPreview"
import LessonPreviewModal from "@/components/teacher/LessonPreviewModal"
import QuestionBankView from "@/components/teacher/QuestionBankView"
import { Eye, ListChecks } from "lucide-react"

export interface LessonPreviewButtonsProps {
  lessonId: string
  source?: LessonSource
  lessonName?: string
  size?: "sm" | "default"
  compact?: boolean
  className?: string
}

export const LessonPreviewButtons: React.FC<LessonPreviewButtonsProps> = ({
  lessonId,
  source,
  lessonName,
  size = "sm",
  compact = false,
  className,
}) => {
  const [lessonOpen, setLessonOpen] = useState(false)
  const [bankOpen, setBankOpen] = useState(false)
  const resolvedSource: LessonSource = source ?? inferLessonSource(lessonId)

  const open = (setter: (v: boolean) => void) => (e: React.MouseEvent) => {
    // Rows that host these buttons often have their own click handlers.
    e.preventDefault()
    e.stopPropagation()
    setter(true)
  }

  const btnClass = cn(
    "border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-950/50",
    compact && "h-7 w-7 p-0",
  )

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)} onClick={e => e.stopPropagation()}>
      <Button
        type="button"
        variant="outline"
        size={compact ? "icon" : size}
        onClick={open(setLessonOpen)}
        className={btnClass}
        title="Full Lesson: play the lesson exactly as a student sees it (nothing is saved)"
        aria-label="Full Lesson"
      >
        <Eye className={cn("h-3.5 w-3.5", !compact && "mr-1.5")} />
        {!compact && "Full Lesson"}
      </Button>
      <Button
        type="button"
        variant="outline"
        size={compact ? "icon" : size}
        onClick={open(setBankOpen)}
        className={btnClass}
        title="Question Bank: every question in this lesson with answers and explanations"
        aria-label="Question Bank"
      >
        <ListChecks className={cn("h-3.5 w-3.5", !compact && "mr-1.5")} />
        {!compact && "Question Bank"}
      </Button>

      {lessonOpen && (
        <LessonPreviewModal
          lessonId={lessonId}
          source={resolvedSource}
          lessonName={lessonName}
          open
          onClose={() => setLessonOpen(false)}
        />
      )}
      {bankOpen && (
        <QuestionBankView
          lessonId={lessonId}
          source={resolvedSource}
          lessonName={lessonName}
          open
          onClose={() => setBankOpen(false)}
        />
      )}
    </div>
  )
}

export default LessonPreviewButtons
