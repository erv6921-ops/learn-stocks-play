import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LessonPreviewButtons } from "@/components/teacher/LessonPreviewButtons";
import { cn } from "@/lib/utils";
import { Loader2, AlertCircle, ArrowLeft, BookOpen, CheckCircle2, FileQuestion, ShieldAlert, ShieldCheck, Wand2 } from "lucide-react";

interface ClassRow {
  id: string;
  name: string;
  description: string | null;
}

/** The v2 (source-grounded, teacher-approved) lesson row for this upload. */
interface V2Lesson {
  id: string;
  name: string;
  sub_lesson_id: string | null;
  teacher_approved_at: string | null;
  sectionsCount: number;
  masteryCount: number;
}

interface LessonRowRaw {
  id: string;
  name: string;
  sub_lesson_id?: string | null;
  teacher_approved_at?: string | null;
  content?: {
    version?: number;
    sections?: { type: string; questions?: unknown[] }[];
  } | null;
}

// The generated Supabase `Database` type does not yet include the curriculum
// tables (run `supabase gen types typescript` to regenerate).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

// The real dashboard route is /teacher-dashboard (see App.tsx).
const DASHBOARD_ROUTE = "/teacher-dashboard?tab=curriculum";

/**
 * Assigns the upload's EXISTING v2 lesson to classes. The lesson is built and
 * approved by the teacher on the curation review (Upload Curriculum page) and
 * /teacher/lesson-review/:lessonId; this page never synthesizes anything and
 * never creates a lesson row. If there is no approved v2 lesson, assignment is
 * blocked and the teacher is pointed at the right screen.
 */
const AssignLessonPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const uploadId = searchParams.get("uploadId") ?? "";
  // Optional: a specific lesson (lesson bank). Without it, the upload's latest v2 lesson is used.
  const lessonIdParam = searchParams.get("lessonId") ?? "";
  const lessonNameParam = searchParams.get("lessonName") ?? "Untitled lesson";

  const [classes, setClasses] = useState<ClassRow[]>([]);
  const [questionCount, setQuestionCount] = useState<number | null>(null);
  const [approvedCount, setApprovedCount] = useState<number>(0);
  const [lesson, setLesson] = useState<V2Lesson | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [assigning, setAssigning] = useState(false);
  const [dueDate, setDueDate] = useState(""); // optional; yyyy-mm-dd

  const lessonName = lesson?.name ?? lessonNameParam;
  const lessonReady = !!lesson?.teacher_approved_at;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) throw new Error("You must be signed in.");

      const [classesRes, questionsRes, lessonsRes] = await Promise.all([
        db
          .from("classes")
          .select("id, name, description")
          .eq("teacher_id", userData.user.id)
          .order("name", { ascending: true }),
        db
          .from("generated_questions")
          .select("id, sub_lesson_id, teacher_approved_at")
          .eq("upload_id", uploadId)
          .eq("status", "pending"),
        db
          .from("lessons")
          .select("id, name, sub_lesson_id, teacher_approved_at, content")
          .eq("upload_id", uploadId)
          .order("created_at", { ascending: false }),
      ]);

      if (classesRes.error) throw new Error(classesRes.error.message);
      if (questionsRes.error) throw new Error(questionsRes.error.message);
      if (lessonsRes.error) throw new Error(lessonsRes.error.message);

      setClasses((classesRes.data as ClassRow[] | null) ?? []);
      // Only a v2 lesson counts: built by synthesize-lesson-v2 from the
      // teacher's marks and approved questions. v1 rows are ignored here.
      const rows = (lessonsRes.data as LessonRowRaw[] | null) ?? [];
      const v2 = (lessonIdParam ? rows.find((r) => r.id === lessonIdParam && r.content?.version === 2) : null) ?? rows.find((r) => r.content?.version === 2) ?? null;
      // Question counts are this lesson's sub-lesson only.
      const allQs = (questionsRes.data as { sub_lesson_id?: string | null; teacher_approved_at: string | null }[] | null) ?? [];
      const qs = v2?.sub_lesson_id ? allQs.filter((q) => q.sub_lesson_id === v2.sub_lesson_id) : allQs.filter((q) => !q.sub_lesson_id);
      setQuestionCount(qs.length);
      setApprovedCount(qs.filter((q) => !!q.teacher_approved_at).length);
      setLesson(
        v2
          ? {
              id: v2.id,
              name: v2.name,
              sub_lesson_id: v2.sub_lesson_id ?? null,
              teacher_approved_at: v2.teacher_approved_at ?? null,
              sectionsCount: v2.content?.sections?.length ?? 0,
              masteryCount:
                v2.content?.sections?.find((s) => s.type === "mastery-check")?.questions?.length ?? 0,
            }
          : null,
      );
    } catch (err) {
      console.error("Failed to load assignment data:", err);
      setError(err instanceof Error ? err.message : "Could not load your classes.");
    } finally {
      setLoading(false);
    }
  }, [uploadId, lessonIdParam]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const handleAssign = useCallback(async () => {
    if (!uploadId) {
      toast({ title: "Missing upload", description: "No uploadId in the URL.", variant: "destructive" });
      return;
    }
    if (!lesson || !lesson.teacher_approved_at) {
      toast({
        title: "Lesson isn't ready",
        description: "Build and approve Jeff's lesson on the review screen first.",
        variant: "destructive",
      });
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
      const lessonId = lesson.id;

      // 1. Publish the existing, approved v2 lesson (no synthesis here), then
      //    create one assignment row per selected class.
      const { error: pErr } = await db.from("lessons").update({ status: "published" }).eq("id", lessonId);
      if (pErr) throw new Error(pErr.message);
      const assignmentRows = Array.from(selected).map((classId) => ({
        lesson_id: lessonId,
        class_id: classId,
      }));
      const { error: aErr } = await db.from("class_lesson_assignments").insert(assignmentRows);
      if (aErr) throw new Error(aErr.message);

      // 2. ALSO write to the regular `assigned_lessons` table so generated
      //    lessons flow through the SAME plumbing as hand-built lessons:
      //    the teacher per-student view, the Homework tab, and the
      //    new-assignment popup all read assigned_lessons + lesson_progress.
      //    (lesson_id is text here; the generated lesson's UUID is stored as-is
      //    and resolved via src/lib/generatedLessons.ts.) Non-fatal.
      const assignedRows = Array.from(selected).map((classId) => ({
        class_id: classId,
        lesson_id: lessonId,
        assigned_by: userData.user.id,
        assignment_type: "homework",
        due_date: dueDate || null,
      }));
      const { error: alErr } = await db.from("assigned_lessons").insert(assignedRows);
      if (alErr) console.warn("assigned_lessons insert failed (non-fatal):", alErr.message);

      // 3. Link ONLY this lesson's own sub-lesson's pending questions to it.
      //    A question must never be relabelled to another sub-lesson's lesson;
      //    a legacy lesson with no sub-lesson links only unowned questions.
      //    Students can only read the approved ones (RLS); the lesson JSON
      //    already holds the approved mastery pool. Non-fatal.
      let linkQuery = db
        .from("generated_questions")
        .update({ lesson_id: lessonId })
        .eq("upload_id", uploadId)
        .eq("status", "pending");
      linkQuery = lesson.sub_lesson_id ? linkQuery.eq("sub_lesson_id", lesson.sub_lesson_id) : linkQuery.is("sub_lesson_id", null);
      const { data: linked, error: linkErr } = await linkQuery.select("id");
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
        description: `"${lessonName}" assigned to ${assignmentRows.length} class${assignmentRows.length === 1 ? "" : "es"}. Students can open it now.`,
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
  }, [uploadId, lesson, lessonName, selected, questionCount, dueDate, navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 px-4 py-10 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-xl space-y-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <Card className="border-emerald-100 shadow-sm dark:border-emerald-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-slate-900 dark:text-slate-100">
              <BookOpen className="h-5 w-5 text-emerald-600" />
              Assign lesson
            </CardTitle>
            <div className="space-y-1 pt-1 text-sm">
              <p className="text-slate-500 dark:text-slate-400">
                Lesson: <span className="font-medium text-slate-700 dark:text-slate-200">{lessonName}</span>
              </p>
              <p className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <FileQuestion className="h-3.5 w-3.5 text-emerald-600" />
                {questionCount === null
                  ? "Counting questions…"
                  : `${approvedCount} of ${questionCount} question${questionCount === 1 ? "" : "s"} approved`}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Lesson readiness: the v2 lesson must exist AND be approved. */}
            {!loading && !error && (
              lessonReady && lesson ? (
                <div className="flex flex-wrap items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50/60 p-3 dark:border-emerald-800 dark:bg-emerald-950/30">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <div className="min-w-0 flex-1 text-xs text-emerald-900 dark:text-emerald-100">
                    <p className="font-semibold">Jeff&apos;s lesson is approved and ready.</p>
                    <p>
                      {lesson.sectionsCount} sections · {lesson.masteryCount} mastery questions · approved{" "}
                      {new Date(lesson.teacher_approved_at as string).toLocaleDateString()}
                    </p>
                  </div>
                  <LessonPreviewButtons lessonId={lesson.id} source="generated" lessonName={lesson.name} />
                </div>
              ) : (
                <div className="flex flex-wrap items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 dark:border-amber-700 dark:bg-amber-950/40">
                  <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                  <div className="min-w-0 flex-1 space-y-1 text-xs text-amber-900 dark:text-amber-100">
                    <p className="font-semibold">
                      {lesson ? "Jeff's lesson is built but not approved yet." : "Jeff's lesson hasn't been built yet."}
                    </p>
                    <p>
                      {lesson
                        ? "Preview it on the curriculum page and tick \"I've reviewed this lesson\". Students can't open a lesson you haven't approved."
                        : "Mark what matters on the curriculum page, approve the questions, and build Jeff's lesson. Nothing is generated at assign time."}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() =>
                      navigate(
                        `/teacher/curriculum/${encodeURIComponent(uploadId)}`,
                      )
                    }
                    className="bg-amber-600 text-white hover:bg-amber-700"
                  >
                    {lesson ? <ShieldCheck className="mr-1.5 h-3.5 w-3.5" /> : <Wand2 className="mr-1.5 h-3.5 w-3.5" />}
                    {lesson ? "Review & approve" : "Build & approve"}
                  </Button>
                </div>
              )
            )}

            {/* Optional due date — reused by the Homework tab + teacher view */}
            <div>
              <Label htmlFor="due-date" className="text-sm text-slate-700 dark:text-slate-200">
                Due date <span className="text-slate-400">(optional)</span>
              </Label>
              <input
                id="due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-emerald-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              />
            </div>

            <div>
              <Label className="text-sm text-slate-700 dark:text-slate-200">Choose classes</Label>

              {loading && (
                <div className="mt-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                  Loading your classes…
                </div>
              )}

              {!loading && error && (
                <div className="mt-3 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50/60 p-3 dark:border-red-900 dark:bg-red-950/30">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                  <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                </div>
              )}

              {!loading && !error && classes.length === 0 && (
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
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
                            ? "border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/40"
                            : "border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/60",
                        )}
                      >
                        <Checkbox
                          checked={checked}
                          onCheckedChange={() => toggle(c.id)}
                          className="mt-0.5"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{c.name}</p>
                          {c.description && (
                            <p className="truncate text-xs text-slate-500 dark:text-slate-400">{c.description}</p>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
              <span className="text-xs text-slate-400">{selected.size} selected</span>
              <Button
                onClick={() => void handleAssign()}
                disabled={assigning || loading || !lessonReady || selected.size === 0}
                title={!lessonReady ? "Build and approve Jeff's lesson first" : undefined}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700"
              >
                {assigning ? (
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
