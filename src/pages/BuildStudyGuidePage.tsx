import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { StagedProgress } from "@/components/StagedProgress";
import { cn } from "@/lib/utils";
import { ArrowLeft, Sparkles, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

interface SGQuestion { id: string; question: string; options: string[]; correctIndex: number; explanation: string }
interface SGScenario { id: string; title: string; narrative: string; prompt: string }
interface SGActivity { id: string; title: string; task: string }
interface SGContent { questions: SGQuestion[]; scenarios: SGScenario[]; activities: SGActivity[] }
interface ClassRow { id: string; name: string }

type Phase = "form" | "generating" | "review" | "publishing";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

const BuildStudyGuidePage: React.FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const uploadId = params.get("uploadId") ?? "";

  const [phase, setPhase] = useState<Phase>("form");
  const [name, setName] = useState("");
  const [numQuestions, setNumQuestions] = useState(10);
  const [numScenarios, setNumScenarios] = useState(2);
  const [numActivities, setNumActivities] = useState(1);
  const [error, setError] = useState("");

  const [studyGuideId, setStudyGuideId] = useState<string | null>(null);
  const [content, setContent] = useState<SGContent | null>(null);

  const [classes, setClasses] = useState<ClassRow[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Load the teacher's classes (for the publish step).
  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) return;
      const { data } = await db
        .from("classes")
        .select("id, name")
        .eq("teacher_id", userData.user.id)
        .order("name", { ascending: true });
      setClasses((data as ClassRow[] | null) ?? []);
    })();
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!uploadId) {
      setError("Missing uploadId in the URL.");
      return;
    }
    setPhase("generating");
    setError("");
    try {
      const { data, error: genErr } = await supabase.functions.invoke("generate-study-guide", {
        body: {
          uploadId,
          name: name.trim() || "Extra practice",
          numQuestions,
          numScenarios,
          numActivities,
        },
      });
      if (genErr) throw new Error(genErr.message);
      if (!data?.success) throw new Error((data?.errors && data.errors.join(" • ")) || "Generation failed.");

      // Fetch the stored guide for read-only review.
      const { data: sg, error: sgErr } = await db
        .from("study_guides")
        .select("id, content")
        .eq("id", data.studyGuideId)
        .single();
      if (sgErr) throw new Error(sgErr.message);
      setStudyGuideId(sg.id);
      setContent(sg.content as SGContent);
      setPhase("review");
    } catch (err) {
      console.error("Study guide generation failed:", err);
      setError(err instanceof Error ? err.message : "Could not build the study guide.");
      setPhase("form");
    }
  }, [uploadId, name, numQuestions, numScenarios, numActivities]);

  const toggleClass = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const handlePublish = useCallback(async () => {
    if (!studyGuideId) return;
    if (selected.size === 0) {
      toast({ title: "Pick at least one class", variant: "destructive" });
      return;
    }
    setPhase("publishing");
    try {
      const rows = Array.from(selected).map((classId) => ({ study_guide_id: studyGuideId, class_id: classId }));
      const { error: aErr } = await db.from("study_guide_assignments").insert(rows);
      if (aErr) throw new Error(aErr.message);
      toast({
        title: "Study guide published",
        description: `Shared to ${rows.length} class${rows.length === 1 ? "" : "es"} as review practice.`,
      });
      navigate("/teacher-dashboard");
    } catch (err) {
      console.error("Publish failed:", err);
      toast({
        title: "Couldn't publish",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
      setPhase("review");
    }
  }, [studyGuideId, selected, navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-emerald-50 px-4 py-10 sm:px-6">
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="space-y-1">
          <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
            <Sparkles className="h-6 w-6 text-indigo-600" /> Build extra practice
          </h1>
          <p className="text-sm text-slate-500">
            Optional, ungraded review material generated from this upload — questions, scenarios, and activities.
          </p>
        </div>

        {/* FORM */}
        {(phase === "form" || phase === "generating") && (
          <Card className="border-indigo-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">Configure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="sg-name">Study guide name</Label>
                <Input id="sg-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Unit 1 Review Pack" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <NumField label="Questions" value={numQuestions} onChange={setNumQuestions} max={30} />
                <NumField label="Scenarios" value={numScenarios} onChange={setNumScenarios} max={10} />
                <NumField label="Activities" value={numActivities} onChange={setNumActivities} max={10} />
              </div>
              <p className="text-xs text-slate-400">
                Activities are short do-it tasks (e.g. “draft a one-week budget”), distinct from read-and-reflect scenarios.
              </p>

              {error && (
                <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50/60 p-3">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {phase === "generating" ? (
                <StagedProgress
                  estimatedMs={30000}
                  stages={["Reading your material…", "Writing questions…", "Writing scenarios & activities…", "Finalizing…"]}
                />
              ) : (
                <Button
                  onClick={() => void handleGenerate()}
                  disabled={numQuestions + numScenarios + numActivities === 0}
                  className="w-full bg-gradient-to-r from-indigo-600 to-emerald-600 text-white hover:from-indigo-700 hover:to-emerald-700"
                >
                  Generate
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* REVIEW + PUBLISH */}
        {(phase === "review" || phase === "publishing") && content && (
          <>
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-slate-900">Review</CardTitle>
                <p className="text-sm text-slate-500">
                  {content.questions.length} questions • {content.scenarios.length} scenarios • {content.activities.length} activities
                </p>
              </CardHeader>
              <CardContent className="max-h-[45vh] space-y-4 overflow-y-auto">
                {content.questions.map((q, i) => (
                  <div key={q.id} className="rounded-lg border border-slate-200 p-3">
                    <p className="text-sm font-medium text-slate-900">{i + 1}. {q.question}</p>
                    <ul className="mt-1.5 space-y-1">
                      {q.options.map((o, oi) => (
                        <li key={oi} className={cn("flex items-center gap-2 text-sm", oi === q.correctIndex ? "font-medium text-emerald-700" : "text-slate-600")}>
                          <span>{LETTERS[oi]}.</span> {o}
                          {oi === q.correctIndex && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {content.scenarios.map((s) => (
                  <div key={s.id} className="rounded-lg border border-amber-200 bg-amber-50/40 p-3">
                    <p className="text-sm font-semibold text-slate-900">Scenario: {s.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{s.narrative}</p>
                    <p className="mt-1 text-xs italic text-slate-500">Prompt: {s.prompt}</p>
                  </div>
                ))}
                {content.activities.map((a) => (
                  <div key={a.id} className="rounded-lg border border-indigo-200 bg-indigo-50/40 p-3">
                    <p className="text-sm font-semibold text-slate-900">Activity: {a.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{a.task}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-emerald-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base text-slate-900">Publish to classes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {classes.length === 0 && <p className="text-sm text-slate-500">You have no classes yet.</p>}
                {classes.map((c) => {
                  const checked = selected.has(c.id);
                  return (
                    <label key={c.id} className={cn("flex cursor-pointer items-center gap-3 rounded-lg border p-3", checked ? "border-emerald-300 bg-emerald-50" : "border-slate-200 hover:bg-slate-50")}>
                      <Checkbox checked={checked} onCheckedChange={() => toggleClass(c.id)} />
                      <span className="text-sm font-medium text-slate-800">{c.name}</span>
                    </label>
                  );
                })}
                <Button
                  onClick={() => void handlePublish()}
                  disabled={phase === "publishing" || selected.size === 0}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700"
                >
                  {phase === "publishing" ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Publishing…</>
                  ) : (
                    "Publish as review practice"
                  )}
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

const NumField: React.FC<{ label: string; value: number; onChange: (n: number) => void; max: number }> = ({ label, value, onChange, max }) => (
  <div className="space-y-1.5">
    <Label className="text-xs">{label}</Label>
    <Input
      type="number"
      min={0}
      max={max}
      value={value}
      onChange={(e) => onChange(Math.max(0, Math.min(max, Math.round(Number(e.target.value) || 0))))}
    />
  </div>
);

export default BuildStudyGuidePage;
