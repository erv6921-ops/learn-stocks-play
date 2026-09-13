import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, BookOpen, CheckCircle2, Loader2, RefreshCw, Send, ShieldCheck, Sparkles, Wand2 } from "lucide-react";
import { QuestionApprovalPanel, type ApprovalCounts } from "@/components/teacher/QuestionApprovalPanel";
import { LessonPreviewButtons } from "@/components/teacher/LessonPreviewButtons";
import { CoverageSummary } from "./CoverageSummary";
import type { LessonRow, UploadRow } from "./api";

/**
 * Bottom half of the review screen: the Generate Lesson action, the
 * "selections changed" banner, and everything that appears after generation
 * (counts, coverage in plain language, the teacher's approval panel, Jeff's
 * lesson build + preview, and Assign to class).
 */
export interface GenerationPanelProps {
  uploadId: string;
  upload: UploadRow;
  /** Live counts from generated_questions for this upload; null = none yet. */
  questionStats: ApprovalCounts | null;
  lesson: LessonRow | null;
  lessonName: string;
  onLessonNameChange: (name: string) => void;
  /** Marks changed since the questions were last generated. */
  marksDirty: boolean;
  marksSummary: string;
  generating: boolean;
  building: boolean;
  onGenerate: (regenerate: boolean) => void;
  onBuildLesson: () => void;
  onCountsChange: (c: ApprovalCounts) => void;
  /** Bumped after generation so the approval panel reloads. */
  panelKey: number;
  /** Upload has no source pages (extracted by v1): must re-verify before anything else. */
  needsVerification: boolean;
  /** Existing questions were generated before verification (no quotes). */
  legacyQuestions: boolean;
  upgrading: boolean;
  onUpgrade: () => void;
}

const Stat: React.FC<{ label: string; value: number; tone?: "ok" | "warn" | "muted" }> = ({ label, value, tone = "muted" }) => (
  <div
    className={cn(
      "rounded-lg border px-3 py-2 text-center",
      tone === "ok" && "border-emerald-200 bg-emerald-50/60 dark:border-emerald-800 dark:bg-emerald-950/30",
      tone === "warn" && "border-red-200 bg-red-50/60 dark:border-red-900 dark:bg-red-950/30",
      tone === "muted" && "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900",
    )}
  >
    <div className={cn("text-xl font-bold", tone === "ok" ? "text-emerald-700 dark:text-emerald-300" : tone === "warn" ? "text-red-700 dark:text-red-300" : "text-slate-800 dark:text-slate-100")}>
      {value}
    </div>
    <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{label}</div>
  </div>
);

export const GenerationPanel: React.FC<GenerationPanelProps> = ({
  uploadId,
  upload,
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
  onCountsChange,
  panelKey,
  needsVerification,
  legacyQuestions,
  upgrading,
  onUpgrade,
}) => {
  const navigate = useNavigate();
  const hasQuestions = !!questionStats && questionStats.total > 0;
  const approved = questionStats?.approved ?? 0;
  const busy = generating || building || upgrading;

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
            concepts, terms and objectives above are re-extracted with a quote and page number each, and your marks reset.
            {hasQuestions ? " The existing questions stay until you regenerate them." : ""}
          </p>
        </div>
        <Button onClick={onUpgrade} disabled={busy} className="bg-amber-600 text-white hover:bg-amber-700">
          {upgrading ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <ShieldCheck className="mr-1.5 h-4 w-4" />}
          {upgrading ? "Verifying your material…" : "Verify against your material"}
        </Button>
      </div>
    );
  }
  const reasons = (upload.insufficient_source_reason ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const assign = () => {
    const name = (lessonName.trim() || lesson?.name || "Untitled lesson").trim();
    navigate(`/teacher/assign-lesson?uploadId=${encodeURIComponent(uploadId)}&lessonName=${encodeURIComponent(name)}`);
  };

  return (
    <div className="space-y-5">
      {/* Selections changed banner */}
      {hasQuestions && marksDirty && (
        <div className="flex flex-wrap items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 p-3 dark:border-amber-700 dark:bg-amber-950/40">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <div className="min-w-0 flex-1 space-y-0.5">
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">You changed your selections. Regenerate the lesson?</p>
            <p className="text-xs text-amber-800 dark:text-amber-200">
              Regenerating removes questions you have not approved yet and writes new ones from your current marks. Approved questions are kept.
            </p>
          </div>
          <Button size="sm" onClick={() => onGenerate(true)} disabled={busy} className="bg-amber-600 text-white hover:bg-amber-700">
            {generating ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="mr-1.5 h-3.5 w-3.5" />}
            Regenerate
          </Button>
        </div>
      )}

      {/* Primary action */}
      {!hasQuestions && (
        <div className="space-y-2">
          <p className="text-xs text-slate-500 dark:text-slate-400">{marksSummary}</p>
          <Button onClick={() => onGenerate(false)} disabled={busy} size="lg" className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700">
            {generating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Writing questions from your material…
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" /> Generate Lesson
              </>
            )}
          </Button>
          <p className="text-center text-[11px] text-slate-400 dark:text-slate-500">
            Writes the question bank first. You approve the questions, then Jeff's taught lesson is built from what you approved.
          </p>
        </div>
      )}

      {/* After generation */}
      {hasQuestions && questionStats && (
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
              <Button size="sm" onClick={() => onGenerate(true)} disabled={busy} className="bg-amber-600 text-white hover:bg-amber-700">
                {generating ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="mr-1.5 h-3.5 w-3.5" />}
                Regenerate with verification
              </Button>
            </div>
          )}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Stat label="Questions generated" value={questionStats.total} />
            <Stat label="Found in source" value={questionStats.verified} tone="ok" />
            <Stat label="Not found in source" value={questionStats.failed} tone={questionStats.failed > 0 ? "warn" : "muted"} />
            <Stat label="Approved by you" value={approved} tone={approved > 0 ? "ok" : "muted"} />
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

          {upload.coverage_report && upload.coverage_report.length > 0 && (
            <CoverageSummary coverage={upload.coverage_report} className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900" />
          )}

          {/* Approvals */}
          <div className="space-y-2">
            <h4 className="flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Approve your questions
            </h4>
            <QuestionApprovalPanel key={panelKey} uploadId={uploadId} onCountsChange={onCountsChange} />
          </div>

          {/* Jeff's lesson */}
          <div className="space-y-3 rounded-lg border border-emerald-200 bg-emerald-50/40 p-4 dark:border-emerald-800 dark:bg-emerald-950/20">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Jeff's taught lesson
              </h4>
              {lesson ? (
                lesson.teacher_approved_at ? (
                  <Badge variant="success" className="gap-1 text-[10px]">
                    <CheckCircle2 className="h-3 w-3" /> Approved for students
                  </Badge>
                ) : (
                  <Badge variant="warning" className="text-[10px]">Built · not yet approved</Badge>
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
                ? `The mastery check will use the ${approved} question${approved === 1 ? "" : "s"} you approved. Every slide is built from your emphasized and remaining material.`
                : "Approve at least one question above, then build the lesson so the mastery check has something to draw from."}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <Button onClick={onBuildLesson} disabled={busy || approved === 0} className="bg-emerald-600 text-white hover:bg-emerald-700">
                {building ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <Sparkles className="mr-1.5 h-4 w-4" />}
                {lesson ? "Rebuild Jeff's lesson" : "Build Jeff's lesson"}
                {approved > 0 ? ` (${approved} approved)` : ""}
              </Button>
              {lesson && (
                <>
                  <LessonPreviewButtons lessonId={lesson.id} source="generated" lessonName={lesson.name} />
                  <Button variant="outline" size="sm" onClick={() => navigate(`/teacher/lesson-review/${lesson.id}`)} className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-950/50">
                    <ShieldCheck className="mr-1.5 h-3.5 w-3.5" /> Review &amp; approve lesson
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <Button onClick={assign} disabled={busy || approved === 0} className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700">
              <Send className="mr-1.5 h-4 w-4" /> Assign to class
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerationPanel;
