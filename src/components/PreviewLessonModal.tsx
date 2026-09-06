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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  Loader2,
  CheckCircle2,
  ChevronDown,
  AlertCircle,
  RefreshCw,
  Sparkles,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface GeneratedQuestion {
  id: string;
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation: string | null;
}

interface PreviewLessonModalProps {
  uploadId: string;
  isOpen: boolean;
  onClose: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

const LETTERS = ["A", "B", "C", "D", "E", "F"];

/** True if `option` at `index` is the correct answer, tolerating letter- or
 *  text-form `correctAnswer` values ("A", "A)", or the full option text). */
function isCorrect(option: string, index: number, correctAnswer: string): boolean {
  const ca = (correctAnswer ?? "").trim();
  if (!ca) return false;
  if (ca === option) return true;
  const letterMatch = ca.match(/^([A-Fa-f])[).:\s]?$/);
  if (letterMatch) return LETTERS.indexOf(letterMatch[1].toUpperCase()) === index;
  return false;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const PreviewLessonModal: React.FC<PreviewLessonModalProps> = ({
  uploadId,
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const [lessonName, setLessonName] = useState("");
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [conceptCount, setConceptCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [{ count }, { data, error: qErr }] = await Promise.all([
        db
          .from("concepts")
          .select("id", { count: "exact", head: true })
          .eq("upload_id", uploadId),
        db
          .from("generated_questions")
          .select("id, question_text, options, correct_answer, explanation")
          .eq("upload_id", uploadId)
          .eq("status", "pending")
          .order("created_at", { ascending: true }),
      ]);
      if (qErr) throw new Error(qErr.message);
      setConceptCount(count ?? 0);

      let rows = (data as GeneratedQuestion[] | null) ?? [];

      // No questions yet → generate them on demand, then refetch.
      if (rows.length === 0) {
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
        const { data: refetched, error: reErr } = await db
          .from("generated_questions")
          .select("id, question_text, options, correct_answer, explanation")
          .eq("upload_id", uploadId)
          .eq("status", "pending")
          .order("created_at", { ascending: true });
        if (reErr) throw new Error(reErr.message);
        rows = (refetched as GeneratedQuestion[] | null) ?? [];
      }

      setQuestions(rows);
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
      setExpanded({});
      void load();
    } else {
      setQuestions([]);
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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-hidden p-0">
        <DialogHeader className="border-b border-slate-100 px-6 py-4">
          <DialogTitle className="text-lg text-slate-900">Preview lesson</DialogTitle>
          <DialogDescription>
            Review the auto-generated questions before assigning to a class.
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
          {!busy && !error && questions.length > 0 && (
            <p className="text-sm font-medium text-slate-600">
              {questions.length} questions generated from {conceptCount} concepts
            </p>
          )}

          {/* Busy */}
          {busy && (
            <div className="flex flex-col items-center justify-center gap-2 py-10 text-sm text-slate-500">
              <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
              {generating ? (
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                  Generating questions…
                </span>
              ) : (
                "Loading preview…"
              )}
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

          {/* Empty */}
          {!busy && !error && questions.length === 0 && (
            <p className="py-8 text-center text-sm text-slate-500">
              No questions were generated for this upload.
            </p>
          )}

          {/* Questions */}
          {!busy &&
            !error &&
            questions.map((q, qi) => (
              <div
                key={q.id}
                className="space-y-3 rounded-lg border border-slate-200 bg-white p-4"
              >
                <p className="text-sm font-medium text-slate-900">
                  <span className="mr-1.5 text-slate-400">{qi + 1}.</span>
                  {q.question_text}
                </p>
                <ul className="space-y-1.5">
                  {q.options.map((opt, oi) => {
                    const correct = isCorrect(opt, oi, q.correct_answer);
                    return (
                      <li
                        key={oi}
                        className={cn(
                          "flex items-center gap-2 rounded-md border px-3 py-2 text-sm",
                          correct
                            ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                            : "border-slate-100 bg-slate-50 text-slate-600",
                        )}
                      >
                        <span className="font-semibold">{LETTERS[oi]}.</span>
                        <span className="flex-1">{opt}</span>
                        {correct && (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                        )}
                      </li>
                    );
                  })}
                </ul>
                {q.explanation && (
                  <Collapsible
                    open={!!expanded[q.id]}
                    onOpenChange={(o) =>
                      setExpanded((prev) => ({ ...prev, [q.id]: o }))
                    }
                  >
                    <CollapsibleTrigger className="flex items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-800">
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform",
                          expanded[q.id] && "rotate-180",
                        )}
                      />
                      {expanded[q.id] ? "Hide explanation" : "Show explanation"}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-1.5 rounded-md bg-slate-50 p-3 text-xs text-slate-600">
                      {q.explanation}
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </div>
            ))}
        </div>

        <DialogFooter className="border-t border-slate-100 px-6 py-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleAssign}
            disabled={busy || questions.length === 0}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700"
          >
            Assign to class
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewLessonModal;
