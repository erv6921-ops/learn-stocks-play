import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, BookOpen, CheckCircle2, Loader2, MessageSquareText, RefreshCw, Send, ShieldCheck, Sparkles, Star, Wand2 } from "lucide-react";
import type { ApprovalCounts } from "@/components/teacher/QuestionApprovalPanel";
import { LessonPreviewButtons } from "@/components/teacher/LessonPreviewButtons";
import { CoverageSummary } from "./CoverageSummary";
import { TEACHER_INSTRUCTIONS_MAX_CHARS, type CoverageEntry, type LessonRow } from "./api";

/**
 * The build area under the tabs: teacher instructions, Generate (or
 * Regenerate), question stats and coverage, Build Jeff's lesson, then
 * Preview -> approval checkbox -> Assign to class.
 *
 * The question list itself lives on the Questions tab (QuestionApprovalPanel);
 * this panel only reads its counts.
 */
export interface GenerationPanelProps {
  uploadId: string;
  /** The sub-lesson being built (everything here is scoped to it). */
  subLessonTitle: string;
  /** This sub-lesson's coverage report and shortfall notes. */
  coverage: CoverageEntry[] | null;
  insufficientReason: string | null;
  /** Live counts from the Questions tab; null = none yet. */
  questionStats: ApprovalCounts | null;
  lesson: LessonRow | null;
  lessonName: string;
  onLessonNameChange: (name: string) => void;
  /** Marks or settings changed since the questions were last generated. */
  marksDirty: boolean;
  marksSummary: string;
  generating: boolean;
  building: boolean;
  onGenerate: (regenerate: boolean) => void;
  onBuildLesson: () => void;
  /** Upload-wide instructions (curriculum_uploads.teacher_instructions): apply to every lesson from this upload. */
  uploadInstructions: string;
  onUploadInstructionsChange: (text: string) => void;
  onUploadInstructionsBlur: () => void;
  uploadInstructionsSaving: boolean;
  /** This sub-lesson's own instructions (sub_lessons.instructions): win where the two conflict. */
  instructions: string;
  onInstructionsChange: (text: string) => void;
  onInstructionsBlur: () => void;
  instructionsSaving: boolean;
  /** Starred questions above the current mastery pass mark; > 0 blocks generation and building. */
  starredOverage: number;
  /** Whole-lesson approval checkbox. */
  approvingLesson: boolean;
  onApproveLesson: (approve: boolean) => void;
  /** Upload has no source pages (extracted by v1): must re-verify before anything else. */
  needsVerification: boolean;
  /** Existing questions were generated before verification (no quotes). */
  legacyQuestions: boolean;
  upgrading: boolean;
  onUpgrade: () => void;
}

const Stat: React.FC<{ label: string; value: number; tone?: "ok" | "warn" | "muted" | "info" }> = ({ label, value, tone = "muted" }) => (
  <div
    className={cn(
      "rounded-lg border px-3 py-2 text-center",
      tone === "ok" && "border-emerald-200 bg-emerald-50/60 dark:border-emerald-800 dark:bg-emerald-950/30",
      tone === "warn" && "border-red-200 bg-red-50/60 dark:border-red-900 dark:bg-red-950/30",
      tone === "info" && "border-sky-200 bg-sky-50/60 dark:border-sky-800 dark:bg-sky-950/30",
      tone === "muted" && "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900",
    )}
  >
    <div
      className={cn(
        "text-xl font-bold",
        tone === "ok" ? "text-emerald-700 dark:text-emerald-300" : tone === "warn" ? "text-red-700 dark:text-red-300" : tone === "info" ? "text-sky-700 dark:text-sky-300" : "text-slate-800 dark:text-slate-100",
      )}
    >
      {value}
    </div>
    <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{label}</div>
  </div>
);

export const GenerationPanel: React.FC<GenerationPanelProps> = ({
  uploadId,
  subLessonTitle,
  coverage,
  insufficientReason,
  questionStats,
  lesson,
  lessonName,
  onLessonNameChange,
  marksDirty,
  marksSummary,
  generating,
  building,
  onGenerate,
  onBuildLesson,
  uploadInstructions,
  onUploadInstructionsChange,
  onUploadInstructionsBlur,
  uploadInstructionsSaving,
  instructions,
  onInstructionsChange,
  onInstructionsBlur,
  instructionsSaving,
  starredOverage,
  approvingLesson,
  onApproveLesson,
  needsVerification,
  legacyQuestions,
  upgrading,
  onUpgrade,
}) => {
  const navigate = useNavigate();
  const hasGenerated = !!questionStats && questionStats.total - questionStats.teacherAuthored > 0;
  const approved = questionStats?.approved ?? 0;
  const starred = questionStats?.starred ?? 0;
  const busy = generating || building || upgrading || approvingLesson;
  const blocked = starredOverage > 0;
  const lessonApproved = !!lesson?.teacher_approved_at;
  const lessonBuilt = !!lesson && !!lesson.content?.sections?.length;

  // A v1 upload has no source pages, so nothing can be verified or generated
  // until it is re-extracted. Show only that step.
  if (needsVerification) {
    return (
      <div className="flex flex-wrap items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950/40">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">This upload was made before source verification.</p>
          <p className="text-xs text-amber-800 dark:text-amber-200">
            Its page text was never stored, so questions can&apos;t be checked against your material yet. Run verification once: the
            concepts, terms and objectives are re-extracted with a quote and page number each, and your marks reset.
            {hasGenerated ? " The existing questions stay until you regenerate them." : ""}
          </p>
        </div>
        <Button onClick={onUpgrade} disabled={busy} className="bg-amber-600 text-white hover:bg-amber-700">
          {upgrading ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <ShieldCheck className="mr-1.5 h-4 w-4" />}
          {upgrading ? "Verifying your material…" : "Verify against your material"}
        </Button>
      </div>
    );
  }
  const reasons = (insufficientReason ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const assign = () => {
    if (!lesson) return;
    const name = (lessonName.trim() || lesson.name || "Untitled lesson").trim();
    navigate(`/teacher/assign-lesson?uploadId=${encodeURIComponent(uploadId)}&lessonId=${encodeURIComponent(lesson.id)}&lessonName=${encodeURIComponent(name)}`);
  };

  return (
    <div className="space-y-5">
      {/* Teacher instructions: scope / emphasis / tone / structure only. Two levels: whole upload, then this lesson. */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <Label htmlFor="upload-instructions" className="flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
              <MessageSquareText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Instructions for every lesson from this upload
            </Label>
            <span className="text-xs text-slate-500 dark:text-slate-400">{uploadInstructionsSaving ? "Saving…" : "Saved when you click away."}</span>
          </div>
          <Textarea
            id="upload-instructions"
            value={uploadInstructions}
            onChange={(e) => onUploadInstructionsChange(e.target.value.slice(0, TEACHER_INSTRUCTIONS_MAX_CHARS))}
            onBlur={onUploadInstructionsBlur}
            disabled={busy}
            rows={3}
            maxLength={TEACHER_INSTRUCTIONS_MAX_CHARS}
            placeholder="e.g. Keep the tone light, use short slides, and always include one applied question."
            className="bg-white text-sm dark:bg-slate-900"
          />
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Applies to every lesson built from this upload. {uploadInstructions.length}/{TEACHER_INSTRUCTIONS_MAX_CHARS}
          </p>
        </div>
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <Label htmlFor="teacher-instructions" className="flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
              <MessageSquareText className="h-4 w-4 text-sky-600 dark:text-sky-400" /> Instructions for &ldquo;{subLessonTitle}&rdquo; only
            </Label>
            <span className="text-xs text-slate-500 dark:text-slate-400">{instructionsSaving ? "Saving…" : "Saved when you click away."}</span>
          </div>
          <Textarea
            id="teacher-instructions"
            value={instructions}
            onChange={(e) => onInstructionsChange(e.target.value.slice(0, TEACHER_INSTRUCTIONS_MAX_CHARS))}
            onBlur={onInstructionsBlur}
            disabled={busy}
            rows={3}
            maxLength={TEACHER_INSTRUCTIONS_MAX_CHARS}
            placeholder="e.g. Focus on the difference between saving and investing and ask at least one question that compares the two."
            className="bg-white text-sm dark:bg-slate-900"
          />
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Wins over the upload-wide instructions where they conflict. {instructions.length}/{TEACHER_INSTRUCTIONS_MAX_CHARS}
          </p>
        </div>
      </div>
      <p className="text-[11px] text-slate-500 dark:text-slate-400">
        Instructions shape what is covered and how it is presented: scope, emphasis, tone, structure. They can never add facts. Anything
        this lesson&apos;s pages do not contain is skipped and reported below.
      </p>

      {/* Starred over the pass mark: block generation until fixed. */}
      {blocked && (
        <div className="flex flex-wrap items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 p-3 dark:border-amber-700 dark:bg-amber-950/40">
          <Star className="mt-0.5 h-5 w-5 shrink-0 fill-amber-400 text-amber-500" />
          <div className="min-w-0 flex-1 space-y-0.5">
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">
              {starredOverage} starred question{starredOverage === 1 ? " is" : "s are"} over the pass mark.
            </p>
            <p className="text-xs text-amber-800 dark:text-amber-200">
              Unstar {starredOverage} on the Questions tab, or raise the pass mark in Lesson settings, before generating or building.
            </p>
          </div>
        </div>
      )}

      {/* Selections changed banner */}
      {hasGenerated && marksDirty && (
        <div className="flex flex-wrap items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 p-3 dark:border-amber-700 dark:bg-amber-950/40">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <div className="min-w-0 flex-1 space-y-0.5">
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">You changed your selections. Regenerate the questions?</p>
            <p className="text-xs text-amber-800 dark:text-amber-200">
              Regenerating removes questions you have not approved yet and writes new ones from your current marks and instructions.
              Approved questions and questions you wrote are kept.
            </p>
          </div>
          <Button size="sm" onClick={() => onGenerate(true)} disabled={busy || blocked} className="bg-amber-600 text-white hover:bg-amber-700">
            {generating ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="mr-1.5 h-3.5 w-3.5" />}
            Regenerate
          </Button>
        </div>
      )}

      {/* Primary action */}
      {!hasGenerated && (
        <div className="space-y-2">
          <p className="text-xs text-slate-500 dark:text-slate-400">{marksSummary}</p>
          <Button onClick={() => onGenerate(false)} disabled={busy || blocked} size="lg" className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700">
            {generating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Writing questions from your material…
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" /> Generate questions
              </>
            )}
          </Button>
          <p className="text-center text-[11px] text-slate-400 dark:text-slate-500">
            Writes the question bank first. You approve the questions on the Questions tab, then Jeff&apos;s taught lesson is built from what you approved.
            {questionStats && questionStats.teacherAuthored > 0
              ? ` The ${questionStats.teacherAuthored} question${questionStats.teacherAuthored === 1 ? "" : "s"} you wrote will be kept.`
              : ""}
          </p>
        </div>
      )}

      {/* After generation */}
      {hasGenerated && questionStats && (
        <div className="space-y-5">
          {legacyQuestions && (
            <div className="flex flex-wrap items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 p-3 dark:border-amber-700 dark:bg-amber-950/40">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
              <div className="min-w-0 flex-1 space-y-0.5">
                <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">These questions were written before source verification.</p>
                <p className="text-xs text-amber-800 dark:text-amber-200">
                  None of them carry a quote from your material, so none can be checked. Regenerate to get questions built from your
                  marks with a verified quote and page number each. Questions you already approved are kept.
                </p>
              </div>
              <Button size="sm" onClick={() => onGenerate(true)} disabled={busy || blocked} className="bg-amber-600 text-white hover:bg-amber-700">
                {generating ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="mr-1.5 h-3.5 w-3.5" />}
                Regenerate with verification
              </Button>
            </div>
          )}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            <Stat label="Questions in bank" value={questionStats.total} />
            <Stat label="Found in source" value={questionStats.verified} tone="ok" />
            <Stat label="Not found in source" value={questionStats.failed} tone={questionStats.failed > 0 ? "warn" : "muted"} />
            <Stat label="Written by you" value={questionStats.teacherAuthored} tone={questionStats.teacherAuthored > 0 ? "info" : "muted"} />
            <Stat label="Approved" value={approved} tone={approved > 0 ? "ok" : "muted"} />
          </div>

          {reasons.length > 0 && (
            <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50/60 p-3 text-xs text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-100">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
              <div className="space-y-0.5">
                <p className="font-semibold">Your material could not support everything that was asked for:</p>
                {reasons.map((r, i) => (
                  <p key={i}>{r.replace(/^\[(extract|questions|lesson)\]\s*/, (_, s) => `${s === "extract" ? "Extraction" : s === "questions" ? "Questions" : "Lesson"}: `)}</p>
                ))}
              </div>
            </div>
          )}

          {coverage && coverage.length > 0 && (
            <CoverageSummary coverage={coverage} className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900" />
          )}

          {/* Jeff's lesson */}
          <div className="space-y-3 rounded-lg border border-emerald-200 bg-emerald-50/40 p-4 dark:border-emerald-800 dark:bg-emerald-950/20">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Jeff&apos;s taught lesson
              </h4>
              {lessonBuilt ? (
                lessonApproved ? (
                  <Badge variant="success" className="gap-1 text-[10px]">
                    <CheckCircle2 className="h-3 w-3" /> Reviewed and approved
                  </Badge>
                ) : (
                  <Badge variant="warning" className="text-[10px]">Built · not yet reviewed</Badge>
                )
              ) : (
                <Badge variant="muted" className="text-[10px]">Not built yet</Badge>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="curation-lesson-name" className="text-xs text-slate-600 dark:text-slate-400">
                Lesson name
              </Label>
              <Input
                id="curation-lesson-name"
                value={lessonName}
                onChange={(e) => onLessonNameChange(e.target.value)}
                placeholder="e.g., Chapter 3: Saving and Compound Interest"
                className="bg-white dark:bg-slate-900"
              />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              {approved > 0
                ? `The mastery check will use the ${approved} approved question${approved === 1 ? "" : "s"}${starred > 0 ? `, and every student gets the ${starred} you starred` : ""}. Every slide is built from this lesson's pages only.`
                : "Approve at least one question on the Questions tab, then build the lesson so the mastery check has something to draw from."}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <Button onClick={onBuildLesson} disabled={busy || blocked || approved === 0} className="bg-emerald-600 text-white hover:bg-emerald-700">
                {building ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <Sparkles className="mr-1.5 h-4 w-4" />}
                {lessonBuilt ? "Rebuild Jeff's lesson" : "Build Jeff's lesson"}
                {approved > 0 ? ` (${approved} approved)` : ""}
              </Button>
              {lessonBuilt && lesson && <LessonPreviewButtons lessonId={lesson.id} source="generated" lessonName={lesson.name} />}
            </div>
            {lessonBuilt && lessonApproved && (
              <p className="text-[11px] text-amber-700 dark:text-amber-300">Rebuilding replaces the lesson students see. Review and approve it again afterwards.</p>
            )}

            {/* Preview -> approve -> assign */}
            {lessonBuilt && lesson && (
              <div className="space-y-3 border-t border-emerald-200 pt-3 dark:border-emerald-800">
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Use <span className="font-medium">Full Lesson</span> above to do the lesson exactly as a student does: Jeff teaches, the questions come up, feedback shows.
                  Nothing is saved or awarded. Then confirm below.
                </p>
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="lesson-reviewed"
                    checked={lessonApproved}
                    disabled={busy}
                    onCheckedChange={(v) => onApproveLesson(v === true)}
                    className="mt-0.5"
                  />
                  <Label htmlFor="lesson-reviewed" className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    I&apos;ve reviewed this lesson
                    <span className="block text-xs font-normal text-slate-500 dark:text-slate-400">
                      Required before it can be assigned. Students can only open a lesson you have approved.
                    </span>
                  </Label>
                  {approvingLesson && <Loader2 className="ml-1 mt-1 h-3.5 w-3.5 animate-spin text-slate-400" />}
                </div>
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <Button
                    onClick={assign}
                    disabled={busy || !lessonApproved}
                    title={lessonApproved ? "Pick classes and a due date" : "Check “I’ve reviewed this lesson” first"}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700"
                  >
                    <Send className="mr-1.5 h-4 w-4" /> Assign to class
                  </Button>
                </div>
                <p className="text-right text-[11px] text-slate-400 dark:text-slate-500">
                  After assigning, the lesson stays in your lesson bank on the dashboard so you can assign it to another class later.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerationPanel;
