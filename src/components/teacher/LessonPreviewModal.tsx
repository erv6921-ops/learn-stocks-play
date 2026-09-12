import React from "react"
import LessonDetail from "@/pages/LessonDetail"
import StudentLessonView from "@/pages/StudentLessonView"
import { PreviewOverlay } from "@/components/teacher/TeacherPreviewChrome"
import type { LessonSource } from "@/lib/lessonPreview"

/**
 * Full-screen "Full Lesson" preview: renders the real student lesson player in
 * previewMode, so the teacher plays exactly what students get with nothing
 * persisted or awarded. The players show their own sticky preview banner and
 * section jump menu, so this shell has no header of its own.
 *
 *  - library   → LessonDetail (built-in curriculum, src/data/lessons)
 *  - generated → StudentLessonView (public.lessons row synthesized from an upload)
 *  - upload    → StudentLessonView in upload mode (lesson not created yet: the
 *                assign flow before confirm; previews the pending question pool)
 */
export interface LessonPreviewModalProps {
  lessonId: string
  source: LessonSource
  lessonName?: string
  open: boolean
  onClose: () => void
}

export const LessonPreviewModal: React.FC<LessonPreviewModalProps> = ({ lessonId, source, lessonName, open, onClose }) => {
  return (
    <PreviewOverlay open={open} onClose={onClose}>
      {source === "library" && (
        <LessonDetail key={`lib-${lessonId}`} previewMode lessonId={lessonId} onExit={onClose} />
      )}
      {source === "generated" && (
        <StudentLessonView key={`gen-${lessonId}`} previewMode lessonId={lessonId} onExit={onClose} />
      )}
      {source === "upload" && (
        <StudentLessonView key={`up-${lessonId}`} previewMode uploadId={lessonId} lessonName={lessonName} onExit={onClose} />
      )}
    </PreviewOverlay>
  )
}

export default LessonPreviewModal
