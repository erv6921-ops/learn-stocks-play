import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useApp } from "@/contexts/AppContext";
import { DEV_LOCAL_BYPASS } from "@/lib/devBypass";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Loader2, AlertCircle, CheckCircle2, XCircle, ArrowLeft, Sparkles } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;
const LETTERS = ["A", "B", "C", "D", "E", "F"];

interface SGQuestion { id: string; question: string; options: string[]; correctIndex: number; explanation: string }
interface SGScenario { id: string; title: string; narrative: string; prompt: string }
interface SGActivity { id: string; title: string; task: string }
interface SGContent { questions: SGQuestion[]; scenarios: SGScenario[]; activities: SGActivity[] }

const StudentStudyGuideView: React.FC = () => {
  const { studyGuideId = "" } = useParams();
  const navigate = useNavigate();
  const { user } = useApp();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState<SGContent | null>(null);

  // Per-question chosen answer index (practice: immediate feedback, ungraded).
  const [picked, setPicked] = useState<Record<string, number>>({});
  // Text responses for scenarios/activities (saved, not graded).
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [savingKey, setSavingKey] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [{ data: sg, error: e }, respRes] = await Promise.all([
          db.from("study_guides").select("name, content").eq("id", studyGuideId).single(),
          !DEV_LOCAL_BYPASS && user?.id
            ? db.from("study_guide_responses").select("item_key, response").eq("study_guide_id", studyGuideId).eq("user_id", user.id)
            : Promise.resolve({ data: [] }),
        ]);
        if (cancelled) return;
        if (e) throw new Error(e.message);
        setName(sg?.name ?? "Study guide");
        setContent((sg?.content ?? { questions: [], scenarios: [], activities: [] }) as SGContent);
        const r: Record<string, string> = {};
        for (const row of (respRes?.data ?? []) as { item_key: string; response: string | null }[]) {
          if (row.response) r[row.item_key] = row.response;
        }
        setResponses(r);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Could not load this study guide.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [studyGuideId, user?.id]);

  const saveResponse = useCallback(
    async (itemKey: string) => {
      if (DEV_LOCAL_BYPASS || !user?.id) return;
      setSavingKey(itemKey);
      try {
        await db.from("study_guide_responses").upsert(
          {
            study_guide_id: studyGuideId,
            user_id: user.id,
            item_key: itemKey,
            response: responses[itemKey] ?? "",
            updated_at: new Date().toISOString(),
          },
          { onConflict: "study_guide_id,user_id,item_key" },
        );
      } finally {
        setSavingKey(null);
      }
    },
    [studyGuideId, user?.id, responses],
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin text-indigo-600" /> Loading study guide…
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-background p-6">
        <Card className="mx-auto max-w-md border-red-200 bg-red-50/60">
          <CardContent className="flex items-start gap-2 pt-6">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
            <p className="text-sm text-red-700">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const c = content ?? { questions: [], scenarios: [], activities: [] };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-emerald-50 px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-2xl space-y-5">
        <button type="button" onClick={() => navigate("/homework")} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
          <ArrowLeft className="h-4 w-4" /> Homework
        </button>

        <div className="space-y-1">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
            <Sparkles className="h-3.5 w-3.5" /> Review practice · ungraded
          </p>
          <h1 className="text-2xl font-bold text-slate-900">{name}</h1>
        </div>

        {/* Questions — immediate feedback, no scoring */}
        {c.questions.map((q, i) => {
          const chosen = picked[q.id];
          const answered = chosen !== undefined;
          return (
            <Card key={q.id} className="border-slate-200">
              <CardContent className="space-y-3 p-4">
                <p className="text-sm font-medium text-slate-900">{i + 1}. {q.question}</p>
                <div className="space-y-2">
                  {q.options.map((o, oi) => {
                    const isChosen = chosen === oi;
                    const isCorrect = oi === q.correctIndex;
                    return (
                      <button
                        key={oi}
                        type="button"
                        disabled={answered}
                        onClick={() => setPicked((p) => ({ ...p, [q.id]: oi }))}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                          answered && isCorrect && "border-emerald-300 bg-emerald-50 text-emerald-800",
                          answered && isChosen && !isCorrect && "border-red-300 bg-red-50 text-red-800",
                          !answered && "border-slate-200 hover:bg-slate-50",
                          answered && !isCorrect && !isChosen && "border-slate-100 bg-slate-50 text-slate-500",
                        )}
                      >
                        <span className="font-semibold">{LETTERS[oi]}.</span>
                        <span className="flex-1">{o}</span>
                        {answered && isCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                        {answered && isChosen && !isCorrect && <XCircle className="h-4 w-4 text-red-600" />}
                      </button>
                    );
                  })}
                </div>
                {answered && q.explanation && (
                  <p className="rounded-md bg-slate-50 p-2.5 text-xs text-slate-600">
                    <span className="font-semibold">Why: </span>{q.explanation}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}

        {/* Scenarios — read + reflect (saved, ungraded) */}
        {c.scenarios.map((s) => {
          const key = `scenario-${s.id}`;
          return (
            <Card key={s.id} className="border-amber-200 bg-amber-50/30">
              <CardContent className="space-y-2 p-4">
                <p className="text-sm font-semibold text-slate-900">Scenario: {s.title}</p>
                <p className="text-sm text-slate-700">{s.narrative}</p>
                <p className="text-xs italic text-slate-500">{s.prompt}</p>
                <Textarea
                  value={responses[key] ?? ""}
                  onChange={(e) => setResponses((r) => ({ ...r, [key]: e.target.value }))}
                  onBlur={() => void saveResponse(key)}
                  placeholder="Write your reflection…"
                  rows={3}
                />
                <p className="text-right text-xs text-slate-400">{savingKey === key ? "Saving…" : "Saved on blur"}</p>
              </CardContent>
            </Card>
          );
        })}

        {/* Activities — do-it task (saved, ungraded) */}
        {c.activities.map((a) => {
          const key = `activity-${a.id}`;
          return (
            <Card key={a.id} className="border-indigo-200 bg-indigo-50/30">
              <CardContent className="space-y-2 p-4">
                <p className="text-sm font-semibold text-slate-900">Activity: {a.title}</p>
                <p className="text-sm text-slate-700">{a.task}</p>
                <Textarea
                  value={responses[key] ?? ""}
                  onChange={(e) => setResponses((r) => ({ ...r, [key]: e.target.value }))}
                  onBlur={() => void saveResponse(key)}
                  placeholder="Your work…"
                  rows={3}
                />
                <p className="text-right text-xs text-slate-400">{savingKey === key ? "Saving…" : "Saved on blur"}</p>
              </CardContent>
            </Card>
          );
        })}

        <Button variant="outline" onClick={() => navigate("/homework")} className="w-full">
          Done
        </Button>
      </div>
    </div>
  );
};

export default StudentStudyGuideView;
