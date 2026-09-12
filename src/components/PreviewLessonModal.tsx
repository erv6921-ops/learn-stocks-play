import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { StagedProgress } from "@/components/StagedProgress";
import { QuestionApprovalPanel, type ApprovalCounts } from "@/components/teacher/QuestionApprovalPanel";

// ---------------------------------------------------------------------------
// Post-generation screen for an upload: generates the question pool on first
// open, then lets the teacher approve / edit / reject each question (see
// QuestionApprovalPanel) before assigning the lesson to a class. Students only
// ever see questions the teacher approved.
// ---------------------------------------------------------------------------

interface PreviewLessonModalProps {
  uploadId: string;
  isOpen: boolean;
  onClose: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

export const PreviewLessonModal: React.FC<PreviewLessonModalProps> = ({
  uploadId,
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const [lessonName, setLessonName] = useState("");
  const [conceptCount, setConceptCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const [panelKey, setPanelKey] = useState(0);
  const [counts, setCounts] = useState<ApprovalCounts | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    setReady(false);
    try {
      const [{ count }, { count: qCount, error: qErr }] = await Promise.all([
        db
          .from("concepts")
          .select("id", { count: "exact", head: true })
          .eq("upload_id", uploadId),
        db
          .from("generated_questions")
          .select("id", { count: "exact", head: true })
          .eq("upload_id", uploadId)
          .eq("status", "pending"),
      ]);
      if (qErr) throw new Error(qErr.message);
      setConceptCount(count ?? 0);

      // No questions yet → generate them on demand.
      if (!qCount) {
        setGenerating(true);
        const { data: genData, error: genErr } =
          await supabase.functions.invoke("generate-questions", {
            body: { uploadId },
          });
        setGenerating(false);
        if (genErr) throw new Error(genErr.message);
        if (genData && genData.success === false) {
          throw new Error(
            (genData.errors && genData.errors.join(" • ")) ||
              "Question generation failed.",
          );
        }
      }
      setPanelKey((k) => k + 1);
      setReady(true);
    } catch (err) {
      console.error("Preview load failed:", err);
      setError(err instanceof Error ? err.message : "Could not load the lesson preview.");
    } finally {
      setGenerating(false);
      setLoading(false);
    }
  }, [uploadId]);

  // Load whenever the modal opens for a given upload; reset on close.
  useEffect(() => {
    if (isOpen) {
      setLessonName("");
      setCounts(null);
      void load();
    } else {
      setReady(false);
      setError("");
    }
  }, [isOpen, load]);

  const handleAssign = useCallback(() => {
    const name = lessonName.trim() || "Untitled lesson";
    onClose();
    navigate(
      `/teacher/assign-lesson?uploadId=${encodeURIComponent(uploadId)}&lessonName=${encodeURIComponent(name)}`,
    );
  }, [lessonName, uploadId, navigate, onClose]);

  const busy = loading || generating;
  const approvedCount = counts?.approved ?? 0;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-hidden p-0">
        <DialogHeader className="border-b border-slate-100 px-6 py-4">
          <DialogTitle className="text-lg text-slate-900">Review questions</DialogTitle>
          <DialogDescription>
            Approve, edit, or reject the generated questions. Only approved questions reach students.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[55vh] space-y-5 overflow-y-auto px-6 py-4">
          {/* Lesson name */}
          <div className="space-y-1.5">
            <Label htmlFor="lesson-name" className="text-sm text-slate-700">
              Lesson name
            </Label>
            <Input
              id="lesson-name"
              value={lessonName}
              onChange={(e) => setLessonName(e.target.value)}
              placeholder="e.g., Chapter 1: Entrepreneurship"
            />
          </div>

          {/* Counts */}
          {ready && counts && counts.total > 0 && (
            <p className="text-sm font-medium text-slate-600">
              {counts.total} questions generated from {conceptCount} concepts
            </p>
          )}

          {/* Busy */}
          {generating && (
            <div className="py-8">
              <StagedProgress
                estimatedMs={30000}
                stages={[
                  "Analyzing concepts…",
                  "Writing questions…",
                  "Balancing difficulty…",
                  "Almost done…",
                ]}
              />
            </div>
          )}
          {busy && !generating && (
            <div className="flex flex-col items-center justify-center gap-2 py-10 text-sm text-slate-500">
              <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
              Loading preview…
            </div>
          )}

          {/* Error */}
          {!busy && error && (
            <div className="space-y-3 rounded-lg border border-red-200 bg-red-50/60 p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => void load()}
                className="border-red-300 text-red-700 hover:bg-red-100"
              >
                <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                Retry
              </Button>
            </div>
          )}

          {/* Questions: approve / edit / reject */}
          {!busy && !error && ready && (
            <QuestionApprovalPanel key={panelKey} uploadId={uploadId} onCountsChange={setCounts} />
          )}
        </div>

        <DialogFooter className="border-t border-slate-100 px-6 py-4">
          {ready && counts && counts.total > 0 && approvedCount === 0 && (
            <p className="mr-auto self-center text-xs text-amber-700">
              Approve at least one question before assigning.
            </p>
          )}
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleAssign}
            disabled={busy || !ready || approvedCount === 0}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700"
          >
            Assign to class{approvedCount > 0 ? ` (${approvedCount} approved)` : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewLessonModal;
