import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Loader2, AlertCircle, ArrowLeft, BookOpen } from "lucide-react";

interface ClassRow {
  id: string;
  name: string;
  description: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

const AssignLessonPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const uploadId = searchParams.get("uploadId") ?? "";
  const lessonName = searchParams.get("lessonName") ?? "Untitled lesson";

  const [classes, setClasses] = useState<ClassRow[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [assigning, setAssigning] = useState(false);

  const fetchClasses = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) throw new Error("You must be signed in.");
      const { data, error: qErr } = await db
        .from("classes")
        .select("id, name, description")
        .eq("teacher_id", userData.user.id)
        .order("name", { ascending: true });
      if (qErr) throw new Error(qErr.message);
      setClasses((data as ClassRow[] | null) ?? []);
    } catch (err) {
      console.error("Failed to load classes:", err);
      setError(err instanceof Error ? err.message : "Could not load your classes.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchClasses();
  }, [fetchClasses]);

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
      toast({ title: "Pick at least one class", variant: "destructive" });
      return;
    }
    setAssigning(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) throw new Error("You must be signed in.");

      // 1. Create the lesson.
      const { data: lesson, error: lErr } = await db
        .from("lessons")
        .insert({
          upload_id: uploadId,
          teacher_id: userData.user.id,
          name: lessonName,
          status: "published",
        })
        .select("id")
        .single();
      if (lErr || !lesson?.id) throw new Error(lErr?.message ?? "Could not create the lesson.");

      // 2. Create the class assignments.
      const rows = Array.from(selected).map((classId) => ({
        lesson_id: lesson.id,
        class_id: classId,
      }));
      const { error: aErr } = await db.from("class_lesson_assignments").insert(rows);
      if (aErr) throw new Error(aErr.message);

      toast({
        title: "Lesson assigned",
        description: `"${lessonName}" assigned to ${rows.length} class${rows.length === 1 ? "" : "es"}.`,
      });
      navigate("/teacher-dashboard");
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
  }, [uploadId, lessonName, selected, navigate, toast]);

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
            <p className="pt-1 text-sm text-slate-500">
              Lesson: <span className="font-medium text-slate-700">{lessonName}</span>
            </p>
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

            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-xs text-slate-400">
                {selected.size} selected
              </span>
              <Button
                onClick={() => void handleAssign()}
                disabled={assigning || loading || selected.size === 0}
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
