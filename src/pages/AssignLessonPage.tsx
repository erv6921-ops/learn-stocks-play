import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { StagedProgress } from "@/components/StagedProgress";
import { cn } from "@/lib/utils";
import { Loader2, AlertCircle, ArrowLeft, BookOpen, FileQuestion } from "lucide-react";

interface ClassRow {
  id: string;
  name: string;
  description: string | null;
}

// The generated Supabase `Database` type does not yet include the curriculum
// tables (run `supabase gen types typescript` to regenerate).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

// The real dashboard route is /teacher-dashboard (see App.tsx). The task brief
// says "/teacher/dashboard", which does not exist — using the real one.
const DASHBOARD_ROUTE = "/teacher-dashboard";

const AssignLessonPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const uploadId = searchParams.get("uploadId") ?? "";
  const lessonName = searchParams.get("lessonName") ?? "Untitled lesson";

  const [classes, setClasses] = useState<ClassRow[]>([]);
  const [questionCount, setQuestionCount] = useState<number | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [assigning, setAssigning] = useState(false);
  const [building, setBuilding] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) throw new Error("You must be signed in.");

      const [classesRes, countRes] = await Promise.all([
        db
          .from("classes")
          .select("id, name, description")
          .eq("teacher_id", userData.user.id)
          .order("name", { ascending: true }),
        db
          .from("generated_questions")
          .select("id", { count: "exact", head: true })
          .eq("upload_id", uploadId),
      ]);

      if (classesRes.error) throw new Error(classesRes.error.message);
      setClasses((classesRes.data as ClassRow[] | null) ?? []);
      setQuestionCount(countRes.count ?? 0);
    } catch (err) {
      console.error("Failed to load assignment data:", err);
      setError(err instanceof Error ? err.message : "Could not load your classes.");
    } finally {
      setLoading(false);
    }
  }, [uploadId]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const handleAssign = useCallback(async () => {
    if (!uploadId) {
      toast({ title: "Missing upload", description: "No uploadId in the URL.", variant: "destructive" });
      return;
    }
    if (selected.size === 0) {
      toast({ title: "Pick at least one class", description: "Select where to assign this lesson.", variant: "destructive" });
      return;
    }

    setAssigning(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) throw new Error("You must be signed in.");

      // 1. Create the lesson (draft until its full content is synthesized).
      const { data: lesson, error: lErr } = await db
        .from("lessons")
        .insert({
          upload_id: uploadId,
          teacher_id: userData.user.id,
          name: lessonName,
          status: "draft",
        })
        .select("id")
        .single();
      if (lErr || !lesson?.id) throw new Error(lErr?.message ?? "Could not create the lesson.");
      const lessonId: string = lesson.id;

      // 2. Synthesize the full Jeff-taught lesson BEFORE publishing.
      setBuilding(true);
      const { data: synth, error: synthErr } = await supabase.functions.invoke("synthesize-lesson", {
        body: { uploadId, lessonId },
      });
      setBuilding(false);
      if (synthErr || (synth && synth.success === false)) {
        // Non-fatal: publish anyway — the student view falls back to the plain
        // question list if content is missing.
        console.warn("Lesson synthesis failed:", synthErr?.message || synth?.errors);
        toast({
          title: "Lesson built without full teaching content",
          description: "Students still get the questions; Jeff's taught lesson couldn't be generated this time.",
        });
      }

      // 3. Publish, then create one assignment row per selected class.
      await db.from("lessons").update({ status: "published" }).eq("id", lessonId);
      const assignmentRows = Array.from(selected).map((classId) => ({
        lesson_id: lessonId,
        class_id: classId,
      }));
      const { error: aErr } = await db.from("class_lesson_assignments").insert(assignmentRows);
      if (aErr) throw new Error(aErr.message);

      // 3. Link this upload's pending questions to the new lesson. Non-fatal:
      //    the assignment already succeeded, so we warn rather than fail if the
      //    link doesn't take (e.g. an RLS gap). `.select()` lets us confirm the
      //    number of rows actually updated.
      const { data: linked, error: linkErr } = await db
        .from("generated_questions")
        .update({ lesson_id: lessonId })
        .eq("upload_id", uploadId)
        .eq("status", "pending")
        .select("id");
      if (linkErr) {
        console.warn("Question linking failed:", linkErr.message);
        toast({
          title: "Assigned, but questions not linked",
          description: linkErr.message,
        });
      } else if ((linked?.length ?? 0) === 0 && (questionCount ?? 0) > 0) {
        console.warn("Question link updated 0 rows despite existing questions.");
      }

      toast({
        title: "Lesson assigned",
        description: `"${lessonName}" assigned to ${assignmentRows.length} class${assignmentRows.length === 1 ? "" : "es"}.`,
      });
      navigate(DASHBOARD_ROUTE);
    } catch (err) {
      console.error("Assign failed:", err);
      toast({
        title: "Couldn't assign lesson",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setAssigning(false);
    }
  }, [uploadId, lessonName, selected, questionCount, navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-xl space-y-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <Card className="border-emerald-100 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
              <BookOpen className="h-5 w-5 text-emerald-600" />
              Assign lesson
            </CardTitle>
            <div className="space-y-1 pt-1 text-sm">
              {/* Lesson name — read-only, from the query param */}
              <p className="text-slate-500">
                Lesson: <span className="font-medium text-slate-700">{lessonName}</span>
              </p>
              <p className="flex items-center gap-1.5 text-slate-500">
                <FileQuestion className="h-3.5 w-3.5 text-emerald-600" />
                {questionCount === null
                  ? "Counting questions…"
                  : `${questionCount} question${questionCount === 1 ? "" : "s"} in this lesson`}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <Label className="text-sm text-slate-700">Choose classes</Label>

              {loading && (
                <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                  <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                  Loading your classes…
                </div>
              )}

              {!loading && error && (
                <div className="mt-3 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50/60 p-3">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {!loading && !error && classes.length === 0 && (
                <p className="mt-3 text-sm text-slate-500">
                  You don&apos;t have any classes yet. Create one from your dashboard first.
                </p>
              )}

              {!loading && !error && classes.length > 0 && (
                <div className="mt-3 space-y-2">
                  {classes.map((c) => {
                    const checked = selected.has(c.id);
                    return (
                      <label
                        key={c.id}
                        className={cn(
                          "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors",
                          checked
                            ? "border-emerald-300 bg-emerald-50"
                            : "border-slate-200 hover:bg-slate-50",
                        )}
                      >
                        <Checkbox
                          checked={checked}
                          onCheckedChange={() => toggle(c.id)}
                          className="mt-0.5"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-800">{c.name}</p>
                          {c.description && (
                            <p className="truncate text-xs text-slate-500">{c.description}</p>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {building && (
              <div className="rounded-lg border border-emerald-100 bg-emerald-50/40 p-3">
                <StagedProgress
                  estimatedMs={35000}
                  stages={[
                    "Reading your material…",
                    "Writing Jeff's teaching…",
                    "Adding checks & scenario…",
                    "Building the mastery check…",
                    "Finalizing lesson…",
                  ]}
                />
              </div>
            )}

            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-xs text-slate-400">{selected.size} selected</span>
              <Button
                onClick={() => void handleAssign()}
                disabled={assigning || building || loading || selected.size === 0}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700"
              >
                {building ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Building lesson…
                  </>
                ) : assigning ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Assigning…
                  </>
                ) : (
                  "Assign"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssignLessonPage;
