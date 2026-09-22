// "Create a lesson from a description" (teacher dashboard, Assign tab).
//
// The teacher describes what they want to teach; Jeff writes the source
// material from his own financial-literacy knowledge, and then the SAME
// pipeline a PDF upload goes through runs on it, with the same settings
// (bank size, difficulty, quick checks, pass mark) and instructions:
//
//   author-lesson-material  -> pages + concepts/vocab/objectives stored like an extraction
//   generate-questions-v2   -> verified question bank (verified rows auto-approved here)
//   synthesize-lesson-v2    -> Jeff's lesson (approved here so it can be assigned at once)
//
// The result is a normal generated lesson: it shows up in the Curriculum tab,
// can be fine-tuned on /teacher/curriculum/:uploadId, and is assignable from
// the finder that opened this dialog.
import React, { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { GenerationSettingsPanel } from "@/components/teacher/curation/GenerationSettingsPanel"
import { LessonPreviewButtons } from "@/components/teacher/LessonPreviewButtons"
import {
  DEFAULT_SETTINGS,
  TEACHER_INSTRUCTIONS_MAX_CHARS,
  callFunction,
  db,
  functionError,
  type AuthorMaterialResponse,
  type GenerateResponse,
  type GenerationSettings,
  type SynthesizeResponse,
} from "@/components/teacher/curation/api"
import { AlertCircle, CheckCircle2, Circle, Loader2, Sparkles, SlidersHorizontal, Wrench } from "lucide-react"

export interface CreatedLesson {
  id: string
  name: string
  uploadId: string
  /** Learning objectives from the built lesson, for topic search. */
  objectives: string[]
}

export interface CreateLessonDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** The topic the teacher typed into the finder; pre-fills the description. */
  initialDescription?: string
  onCreated: (lesson: CreatedLesson) => void
}

type StepKey = "author" | "questions" | "lesson"

const STEPS: { key: StepKey; label: string; hint: string }[] = [
  { key: "author", label: "Jeff writes the material", hint: "Pages, key ideas, vocabulary and objectives from Jeff's financial-literacy knowledge." },
  { key: "questions", label: "Generating the question bank", hint: "Every question is checked against the material; verified ones are approved for you." },
  { key: "lesson", label: "Building Jeff's lesson", hint: "Slides, quick checks, a scenario and the mastery check, then it's ready to assign." },
]

type Phase = "form" | "running" | "done" | "error"

const DESCRIPTION_MIN = 10

export const CreateLessonDialog: React.FC<CreateLessonDialogProps> = ({ open, onOpenChange, initialDescription = "", onCreated }) => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState(initialDescription)
  const [instructions, setInstructions] = useState("")
  const [settings, setSettings] = useState<GenerationSettings>(DEFAULT_SETTINGS)
  const [showSettings, setShowSettings] = useState(false)

  const [phase, setPhase] = useState<Phase>("form")
  const [step, setStep] = useState<StepKey>("author")
  const [error, setError] = useState("")
  // Ids from completed steps, so "Try again" resumes instead of starting over.
  const [uploadId, setUploadId] = useState<string | null>(null)
  const [subLessonId, setSubLessonId] = useState<string | null>(null)
  const [lessonId, setLessonId] = useState<string | null>(null)
  const [lessonName, setLessonName] = useState("")
  const [result, setResult] = useState<{ sections: number; mastery: number; objectives: string[] } | null>(null)

  // A fresh open resets everything to the new topic.
  useEffect(() => {
    if (!open) return
    setTitle("")
    setDescription(initialDescription)
    setInstructions("")
    setSettings(DEFAULT_SETTINGS)
    setShowSettings(false)
    setPhase("form")
    setStep("author")
    setError("")
    setUploadId(null)
    setSubLessonId(null)
    setLessonId(null)
    setLessonName("")
    setResult(null)
  }, [open, initialDescription])

  const run = useCallback(async () => {
    setPhase("running")
    setError("")
    try {
      const { data: userData } = await supabase.auth.getUser()
      const uid = userData?.user?.id
      if (!uid) throw new Error("You must be signed in.")

      // 1. Author the material (skipped on retry if already done).
      let upId = uploadId
      let subId = subLessonId
      let name = lessonName
      if (!upId || !subId) {
        setStep("author")
        const { status, data } = await callFunction<AuthorMaterialResponse>("author-lesson-material", {
          description: description.trim(),
          title: title.trim() || undefined,
          instructions: instructions.trim() || undefined,
          settings,
        })
        if (!data?.success || !data.uploadId || !data.subLessonId) throw new Error(functionError(status, data, "Jeff couldn't write the material"))
        upId = data.uploadId
        subId = data.subLessonId
        name = data.title || title.trim() || "Untitled lesson"
        setUploadId(upId)
        setSubLessonId(subId)
        setLessonName(name)
      }

      // 2. Question bank, then approve every verified row (the mastery pool
      //    only takes approved questions, exactly as on the review page).
      setStep("questions")
      {
        const { status, data } = await callFunction<GenerateResponse>("generate-questions-v2", {
          uploadId: upId,
          subLessonId: subId,
          settings,
          teacherInstructions: instructions.trim() || undefined,
        })
        if (!data?.success) throw new Error(functionError(status, data, "Question generation failed"))
        const { error: aErr } = await db
          .from("generated_questions")
          .update({ teacher_approved_at: new Date().toISOString(), teacher_approved_by: uid })
          .eq("upload_id", upId)
          .eq("sub_lesson_id", subId)
          .eq("grounding_status", "verified")
          .is("teacher_approved_at", null)
        if (aErr) throw new Error(`Could not approve the questions: ${aErr.message}`)
      }

      // 3. Build the lesson and approve it so it can be assigned right away.
      setStep("lesson")
      let lId = lessonId
      if (!lId) {
        const { data: created, error: cErr } = await db
          .from("lessons")
          .insert({ upload_id: upId, sub_lesson_id: subId, teacher_id: uid, name, status: "draft" })
          .select("id")
          .single()
        if (cErr || !created?.id) throw new Error(cErr?.message ?? "Could not create the lesson.")
        lId = created.id as string
        setLessonId(lId)
      }
      const { status, data } = await callFunction<SynthesizeResponse>("synthesize-lesson-v2", {
        uploadId: upId,
        lessonId: lId,
        subLessonId: subId,
        settings,
        teacherInstructions: instructions.trim() || undefined,
      })
      if (!data?.success) throw new Error(functionError(status, data, "Lesson build failed"))
      const { error: pErr } = await db
        .from("lessons")
        .update({ teacher_approved_at: new Date().toISOString(), teacher_approved_by: uid })
        .eq("id", lId)
      if (pErr) throw new Error(`Could not approve the lesson: ${pErr.message}`)
      const { data: row } = await db.from("lessons").select("objectives:content->jeffContext->learningObjectives").eq("id", lId).maybeSingle()
      const objectives = Array.isArray(row?.objectives) ? (row.objectives as unknown[]).filter((o): o is string => typeof o === "string") : []

      setResult({ sections: data.sectionsCount ?? 0, mastery: data.masteryCount ?? 0, objectives })
      setPhase("done")
      toast({ title: `"${name}" is ready`, description: "Preview it, then assign it to the class." })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Please try again.")
      setPhase("error")
    }
  }, [uploadId, subLessonId, lessonId, lessonName, description, title, instructions, settings, toast])

  const canBuild = description.trim().length >= DESCRIPTION_MIN
  const busy = phase === "running"
  const stepIndex = STEPS.findIndex((s) => s.key === step)

  const useLesson = () => {
    if (!lessonId || !uploadId) return
    onCreated({ id: lessonId, name: lessonName, uploadId, objectives: result?.objectives ?? [] })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={(next) => { if (!busy) onOpenChange(next) }}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {phase === "done" ? "Your lesson is ready" : "Create a lesson with Jeff"}
          </DialogTitle>
          <DialogDescription>
            {phase === "done"
              ? "Built from Jeff's financial-literacy knowledge with the settings below. You can fine-tune it any time on the Curriculum page."
              : "Describe what you want students to learn. Jeff writes the material, builds the question bank and the lesson, exactly as he does from an uploaded PDF."}
          </DialogDescription>
        </DialogHeader>

        {(phase === "form" || phase === "error") && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="create-lesson-description">What should this lesson teach?</Label>
              <Textarea
                id="create-lesson-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. How compound interest grows savings over time, with examples a 10th grader can relate to, and why starting early matters."
                rows={4}
                maxLength={2000}
                disabled={busy}
              />
              <p className="text-[11px] text-muted-foreground">The more specific you are (grade, examples, what to skip), the closer the lesson lands.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="create-lesson-title">Lesson title <span className="font-normal text-muted-foreground">(optional)</span></Label>
                <Input id="create-lesson-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Jeff will suggest one" maxLength={120} disabled={busy} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="create-lesson-instructions">Instructions for Jeff <span className="font-normal text-muted-foreground">(optional)</span></Label>
                <Textarea
                  id="create-lesson-instructions"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Tone, emphasis, structure. e.g. Keep it to 3 big ideas; use sports examples."
                  rows={2}
                  maxLength={TEACHER_INSTRUCTIONS_MAX_CHARS}
                  disabled={busy}
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => setShowSettings((v) => !v)}
                className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                {showSettings ? "Hide lesson settings" : `Lesson settings: ${settings.bankSize} questions · ${settings.difficulty} · ${settings.microChecks} quick checks · pass at ${settings.masteryRequired}`}
              </button>
              {showSettings && <GenerationSettingsPanel value={settings} onChange={setSettings} disabled={busy} className="mt-2" />}
            </div>

            {phase === "error" && (
              <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <div className="min-w-0">
                  <p className="font-medium">{STEPS[stepIndex]?.label ?? "Build"} didn't finish.</p>
                  <p className="break-words">{error}</p>
                  {uploadId && (
                    <p className="mt-1 text-xs">
                      The material Jeff wrote was saved. You can also{" "}
                      <button type="button" className="underline" onClick={() => navigate(`/teacher/curriculum/${uploadId}`)}>
                        finish it on the Curriculum page
                      </button>
                      .
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-wrap justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={busy}>Cancel</Button>
              <Button type="button" onClick={() => void run()} disabled={!canBuild || busy}>
                <Sparkles className="mr-1.5 h-4 w-4" />
                {phase === "error" ? "Try again" : "Build with Jeff"}
              </Button>
            </div>
          </div>
        )}

        {phase === "running" && (
          <div className="space-y-4">
            <ol className="space-y-3">
              {STEPS.map((s, i) => {
                const state = i < stepIndex ? "done" : i === stepIndex ? "active" : "todo"
                return (
                  <li key={s.key} className={cn("flex items-start gap-3 rounded-lg border p-3", state === "active" && "border-primary/40 bg-primary/5")}>
                    {state === "done" ? (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    ) : state === "active" ? (
                      <Loader2 className="mt-0.5 h-5 w-5 shrink-0 animate-spin text-primary" />
                    ) : (
                      <Circle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground/40" />
                    )}
                    <div className="min-w-0">
                      <p className={cn("text-sm font-medium", state === "todo" && "text-muted-foreground")}>{s.label}</p>
                      <p className="text-xs text-muted-foreground">{s.hint}</p>
                    </div>
                  </li>
                )
              })}
            </ol>
            <p className="text-xs text-muted-foreground">This usually takes two to four minutes. Keep this window open.</p>
          </div>
        )}

        {phase === "done" && lessonId && (
          <div className="space-y-4">
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="font-semibold">{lessonName}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {result?.sections ?? 0} sections · {result?.mastery ?? 0} mastery questions · {settings.microChecks} quick checks · pass at {settings.masteryRequired}
              </p>
              {result?.objectives.length ? (
                <ul className="mt-2 list-disc space-y-0.5 pl-5 text-sm">
                  {result.objectives.slice(0, 4).map((o) => <li key={o}>{o}</li>)}
                </ul>
              ) : null}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground">See what students will get:</span>
                <LessonPreviewButtons lessonId={lessonId} lessonName={lessonName} />
              </div>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => navigate(`/teacher/curriculum/${uploadId}`)}>
                <Wrench className="mr-1.5 h-4 w-4" />
                Fine-tune on the Curriculum page
              </Button>
              <Button type="button" onClick={useLesson}>
                <CheckCircle2 className="mr-1.5 h-4 w-4" />
                Use this lesson
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CreateLessonDialog
