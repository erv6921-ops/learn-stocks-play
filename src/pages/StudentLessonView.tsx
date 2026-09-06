import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useApp } from "@/contexts/AppContext";
import { useAbility } from "@/hooks/useAbility";
import { DEV_LOCAL_BYPASS } from "@/lib/devBypass";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import LessonResultsScreen from "@/components/LessonResultsScreen";
import { cn } from "@/lib/utils";
import {
  Loader2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types & helpers
// ---------------------------------------------------------------------------

interface Question {
  id: string;
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation: string | null;
  difficulty: number | null;
}

interface AnswerState {
  selected: string;
  isCorrect: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

const LETTERS = ["A", "B", "C", "D", "E", "F"];
const EXPECTED_MS = 30_000; // per-question time budget for the IRT time weight

const slugify = (s: string): string =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) ||
  "lesson";

/** Difficulty is stored 0..1; map to the engine's logit b (~-1.5..1.5). */
const toB = (difficulty: number | null): number => ((difficulty ?? 0.5) - 0.5) * 3;

/** Whether the option at `index` is correct, tolerating letter- or text-form. */
function optionIsCorrect(option: string, index: number, correctAnswer: string): boolean {
  const ca = (correctAnswer ?? "").trim();
  if (!ca) return false;
  if (ca === option) return true;
  const m = ca.match(/^([A-Fa-f])[).:\s]?$/);
  if (m) return LETTERS.indexOf(m[1].toUpperCase()) === index;
  return false;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const StudentLessonView: React.FC = () => {
  const { lessonId = "" } = useParams();
  const navigate = useNavigate();
  const { user } = useApp();

  const [lessonName, setLessonName] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, AnswerState>>({});
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [finalizing, setFinalizing] = useState(false);
  const [finished, setFinished] = useState(false);
  const [mastery, setMastery] = useState<{ passed: boolean; progress: string } | null>(null);

  const concept = useMemo(() => (lessonName ? `curriculum:${slugify(lessonName)}` : undefined), [lessonName]);
  const ability = useAbility(concept);

  const sessionIdRef = useRef<string>(crypto.randomUUID());
  const questionStartRef = useRef<number>(Date.now());
  const thetaStartRef = useRef<number | null>(null);
  const attemptSeqRef = useRef(0);

  // --- Load lesson + questions + prior attempts (for resume) ---------------
  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [lessonRes, qRes] = await Promise.all([
        db.from("lessons").select("name").eq("id", lessonId).single(),
        db
          .from("generated_questions")
          .select("id, question_text, options, correct_answer, explanation, difficulty")
          .eq("lesson_id", lessonId)
          .order("created_at", { ascending: true }),
      ]);
      if (lessonRes.error) throw new Error(lessonRes.error.message);
      if (qRes.error) throw new Error(qRes.error.message);

      setLessonName(lessonRes.data?.name ?? "Lesson");
      const qs = (qRes.data as Question[] | null) ?? [];
      setQuestions(qs);

      // Reconstruct answered state from prior attempts so resume doesn't
      // re-record. (Skipped in dev-local — no persisted attempts there.)
      if (!DEV_LOCAL_BYPASS && user?.id && qs.length > 0) {
        const { data: attempts } = await db
          .from("question_attempts")
          .select("question_id, is_correct, selected_answer, created_at")
          .eq("user_id", user.id)
          .eq("lesson_id", String(lessonId))
          .order("created_at", { ascending: true });
        const byQ = new Map<string, AnswerState>();
        for (const a of (attempts ?? []) as {
          question_id: string;
          is_correct: boolean;
          selected_answer: string | null;
        }[]) {
          byQ.set(a.question_id, {
            selected: a.selected_answer ?? "",
            isCorrect: !!a.is_correct,
          });
        }
        const restored: Record<number, AnswerState> = {};
        qs.forEach((q, i) => {
          const a = byQ.get(q.id);
          if (a) restored[i] = a;
        });
        setAnswers(restored);
        const firstUnanswered = qs.findIndex((_, i) => !restored[i]);
        setIndex(firstUnanswered === -1 ? qs.length - 1 : firstUnanswered);
      }
    } catch (err) {
      console.error("Failed to load lesson:", err);
      setError(err instanceof Error ? err.message : "Could not load this lesson.");
    } finally {
      setLoading(false);
    }
  }, [lessonId, user?.id]);

  useEffect(() => {
    void load();
  }, [load]);

  // Reset the per-question timer whenever the visible question changes.
  useEffect(() => {
    questionStartRef.current = Date.now();
  }, [index]);

  const total = questions.length;
  const answeredCount = Object.keys(answers).length;
  const current = questions[index];
  const currentAnswer = answers[index];

  // --- Submit the current answer -------------------------------------------
  const handleSubmit = useCallback(async () => {
    if (!current || selected == null || currentAnswer) return;
    setSubmitting(true);
    try {
      const optIndex = current.options.indexOf(selected);
      const isCorrect = optionIsCorrect(selected, optIndex, current.correct_answer);
      const responseMs = Date.now() - questionStartRef.current;

      // Capture the pre-session theta once, so the results delta is meaningful.
      if (thetaStartRef.current == null) thetaStartRef.current = ability.getTheta();

      // Fold into the real IRT engine (persists to student_ability by concept).
      ability.record({ isCorrect, responseMs, questionB: toB(current.difficulty), expectedMs: EXPECTED_MS });

      if (!DEV_LOCAL_BYPASS && user?.id) {
        attemptSeqRef.current += 1;
        const { error: aErr } = await db.from("question_attempts").insert({
          user_id: user.id,
          question_id: current.id,
          lesson_id: String(lessonId),
          topic_id: concept ?? null,
          source: "curriculum",
          is_correct: isCorrect,
          selected_answer: selected,
          response_time_ms: responseMs,
          attempt_session_id: sessionIdRef.current,
          session_attempt_number: attemptSeqRef.current,
        });
        if (aErr) console.error("[question_attempts insert]", aErr.message);

        const nextAnswered = answeredCount + 1;
        const nextCorrect =
          Object.values(answers).filter((a) => a.isCorrect).length + (isCorrect ? 1 : 0);
        const { error: pErr } = await db
          .from("student_lesson_progress")
          .upsert(
            {
              student_id: user.id,
              lesson_id: lessonId,
              status: "in_progress",
              num_answered: nextAnswered,
              num_correct: nextCorrect,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "student_id,lesson_id" },
          );
        if (pErr) console.error("[student_lesson_progress upsert]", pErr.message);
      }

      setAnswers((prev) => ({ ...prev, [index]: { selected, isCorrect } }));
      setSelected(null);
    } finally {
      setSubmitting(false);
    }
  }, [current, selected, currentAnswer, ability, user?.id, lessonId, concept, index, answers, answeredCount]);

  // --- Finish the lesson ----------------------------------------------------
  const handleFinish = useCallback(async () => {
    setFinalizing(true);
    try {
      ability.persist();
      const score = Object.values(answers).filter((a) => a.isCorrect).length;

      if (!DEV_LOCAL_BYPASS && user?.id) {
        await db.from("student_lesson_progress").upsert(
          {
            student_id: user.id,
            lesson_id: lessonId,
            status: "completed",
            num_answered: total,
            num_correct: score,
            completed_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          { onConflict: "student_id,lesson_id" },
        );

        const { data: m } = await supabase.functions.invoke("check-mastery", {
          body: { lessonId, userId: user.id },
        });
        if (m) setMastery({ passed: !!m.passed, progress: m.progress ?? "" });
      }
      setFinished(true);
    } catch (err) {
      console.error("Finish failed:", err);
      // Still show results — the local score is valid even if persistence failed.
      setFinished(true);
    } finally {
      setFinalizing(false);
    }
  }, [ability, answers, user?.id, lessonId, total]);

  // --- Render ---------------------------------------------------------------
  if (finished) {
    const score = Object.values(answers).filter((a) => a.isCorrect).length;
    const thetaDelta =
      thetaStartRef.current != null ? ability.getTheta() - thetaStartRef.current : null;
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 px-4 py-10">
        <LessonResultsScreen
          score={score}
          total={total}
          passed={mastery?.passed ?? false}
          masteryProgress={mastery?.progress}
          thetaDelta={thetaDelta}
          onBackToDashboard={() => navigate("/dashboard")}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-2xl space-y-5">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Dashboard
        </button>

        {loading && (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-slate-500">
            <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />
            Loading lesson…
          </div>
        )}

        {!loading && error && (
          <Card className="border-red-200 bg-red-50/60">
            <CardContent className="flex items-start gap-2 pt-6">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
              <p className="text-sm text-red-700">{error}</p>
            </CardContent>
          </Card>
        )}

        {!loading && !error && total === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-sm text-slate-500">
              This lesson has no questions yet.
            </CardContent>
          </Card>
        )}

        {!loading && !error && current && (
          <>
            {/* Header + progress */}
            <div className="space-y-2">
              <h1 className="text-xl font-bold text-slate-900">{lessonName}</h1>
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>
                  Question {index + 1} of {total}
                </span>
                <span>{answeredCount} answered</span>
              </div>
              <Progress value={total > 0 ? (answeredCount / total) * 100 : 0} className="h-2" />
            </div>

            {/* Question card */}
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="space-y-4 p-5">
                <p className="text-base font-medium text-slate-900">{current.question_text}</p>

                <div className="space-y-2">
                  {current.options.map((opt, oi) => {
                    const answered = !!currentAnswer;
                    const chosen = answered ? currentAnswer.selected === opt : selected === opt;
                    const correct = optionIsCorrect(opt, oi, current.correct_answer);
                    // After answering, reveal correctness; before, just show selection.
                    const showCorrect = answered && correct;
                    const showWrongChoice = answered && chosen && !correct;
                    return (
                      <button
                        key={oi}
                        type="button"
                        disabled={answered || submitting}
                        onClick={() => setSelected(opt)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors",
                          showCorrect && "border-emerald-300 bg-emerald-50 text-emerald-800",
                          showWrongChoice && "border-red-300 bg-red-50 text-red-800",
                          !answered && chosen && "border-emerald-400 bg-emerald-50/60",
                          !answered && !chosen && "border-slate-200 hover:bg-slate-50",
                          answered && !showCorrect && !showWrongChoice && "border-slate-100 bg-slate-50 text-slate-500",
                        )}
                      >
                        <span className="font-semibold">{LETTERS[oi]}.</span>
                        <span className="flex-1">{opt}</span>
                        {showCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                        {showWrongChoice && <XCircle className="h-4 w-4 text-red-600" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation after answering */}
                {currentAnswer && current.explanation && (
                  <div className="rounded-md bg-slate-50 p-3 text-xs text-slate-600">
                    <span className="font-semibold text-slate-700">Explanation: </span>
                    {current.explanation}
                  </div>
                )}

                {/* Submit (only before answering this question) */}
                {!currentAnswer && (
                  <Button
                    onClick={() => void handleSubmit()}
                    disabled={selected == null || submitting}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      "Submit answer"
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                disabled={index === 0}
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Previous
              </Button>

              {answeredCount === total ? (
                <Button
                  onClick={() => void handleFinish()}
                  disabled={finalizing}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700"
                >
                  {finalizing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Finishing…
                    </>
                  ) : (
                    "Finish lesson"
                  )}
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
                  disabled={!currentAnswer || index >= total - 1}
                >
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentLessonView;
