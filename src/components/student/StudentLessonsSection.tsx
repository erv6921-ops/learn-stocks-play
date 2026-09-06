import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useApp } from "@/contexts/AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { BookOpen, Loader2 } from "lucide-react";

interface LessonCard {
  id: string;
  name: string;
  total: number;
  answered: number;
  status: "not_started" | "in_progress" | "completed";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

const StatusBadge: React.FC<{ status: LessonCard["status"] }> = ({ status }) => {
  const map = {
    not_started: { label: "Not started", cls: "bg-slate-100 text-slate-600 border-slate-200" },
    in_progress: { label: "In progress", cls: "bg-amber-100 text-amber-700 border-amber-200" },
    completed: { label: "Completed", cls: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  }[status];
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium", map.cls)}>
      {map.label}
    </span>
  );
};

export const StudentLessonsSection: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useApp();
  const [lessons, setLessons] = useState<LessonCard[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      if (!user?.id) {
        setLessons([]);
        return;
      }
      // 1. My classes → 2. lessons assigned to them.
      const { data: memberships } = await db
        .from("class_members")
        .select("class_id")
        .eq("user_id", user.id);
      const classIds = (memberships ?? []).map((m: { class_id: string }) => m.class_id);
      if (classIds.length === 0) {
        setLessons([]);
        return;
      }

      const { data: assignments } = await db
        .from("class_lesson_assignments")
        .select("lesson_id")
        .in("class_id", classIds);
      const lessonIds = Array.from(
        new Set((assignments ?? []).map((a: { lesson_id: string }) => a.lesson_id)),
      );
      if (lessonIds.length === 0) {
        setLessons([]);
        return;
      }

      // 3. Lesson rows, 4. question counts, 5. my progress — in parallel.
      const [lessonsRes, questionsRes, progressRes] = await Promise.all([
        db.from("lessons").select("id, name, created_at").in("id", lessonIds).order("created_at", { ascending: false }),
        db.from("generated_questions").select("lesson_id").in("lesson_id", lessonIds),
        db
          .from("student_lesson_progress")
          .select("lesson_id, status, num_answered")
          .eq("student_id", user.id)
          .in("lesson_id", lessonIds),
      ]);

      const totals = new Map<string, number>();
      for (const q of (questionsRes.data ?? []) as { lesson_id: string }[]) {
        totals.set(q.lesson_id, (totals.get(q.lesson_id) ?? 0) + 1);
      }
      const progress = new Map<string, { status: string; num_answered: number }>();
      for (const p of (progressRes.data ?? []) as {
        lesson_id: string;
        status: string;
        num_answered: number;
      }[]) {
        progress.set(p.lesson_id, { status: p.status, num_answered: p.num_answered });
      }

      const cards: LessonCard[] = ((lessonsRes.data ?? []) as {
        id: string;
        name: string;
      }[]).map((l) => {
        const p = progress.get(l.id);
        const status: LessonCard["status"] =
          p?.status === "completed"
            ? "completed"
            : p && p.num_answered > 0
              ? "in_progress"
              : "not_started";
        return {
          id: l.id,
          name: l.name,
          total: totals.get(l.id) ?? 0,
          answered: p?.num_answered ?? 0,
          status,
        };
      });
      setLessons(cards);
    } catch (err) {
      console.error("Failed to load student lessons:", err);
      setLessons([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    void load();
  }, [load]);

  // Nothing assigned → render nothing (keep the dashboard uncluttered).
  if (!loading && lessons.length === 0) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-emerald-600" />
        <h2 className="text-lg font-semibold text-slate-900">Lessons</h2>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white py-6 pl-4 text-sm text-slate-500">
          <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
          Loading lessons…
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {lessons.map((l) => {
            const cta =
              l.status === "completed" ? "Review" : l.status === "in_progress" ? "Resume" : "Start lesson";
            return (
              <Card key={l.id} className="border-slate-200 transition-shadow hover:shadow-sm">
                <CardContent className="space-y-3 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-900">{l.name}</p>
                    <StatusBadge status={l.status} />
                  </div>
                  <div className="space-y-1">
                    <Progress value={l.total > 0 ? (l.answered / l.total) * 100 : 0} className="h-2" />
                    <p className="text-xs text-slate-400">
                      {l.answered}/{l.total} questions answered
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => navigate(`/student/lesson/${l.id}`)}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700"
                  >
                    {cta}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default StudentLessonsSection;
