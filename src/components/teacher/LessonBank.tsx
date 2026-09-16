import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LessonPreviewButtons } from "@/components/teacher/LessonPreviewButtons";
import { cn } from "@/lib/utils";
import { AlertCircle, BookOpen, CheckCircle2, Inbox, Loader2, RefreshCw, Send, SlidersHorizontal } from "lucide-react";

/**
 * Lesson bank: every lesson this teacher has built from an upload, so a
 * lesson can be previewed or assigned to another class later without
 * regenerating anything. Rows come straight from `lessons` (teacher_id =
 * me); the assign flow is the existing /teacher/assign-lesson page.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

interface BankLesson {
  id: string;
  name: string;
  upload_id: string | null;
  status: string | null;
  created_at: string;
  teacher_approved_at: string | null;
  sectionsCount: number;
  masteryCount: number;
  starredCount: number;
  uploadName: string | null;
  subLessonTitle: string | null;
  assignedClasses: number;
}

interface RawLesson {
  id: string;
  name: string;
  upload_id: string | null;
  sub_lesson_id?: string | null;
  status: string | null;
  created_at: string;
  teacher_approved_at?: string | null;
  content?: { version?: number; sections?: { type: string; questions?: unknown[]; pinnedQuestionIds?: string[] }[] } | null;
}

const fmtDay = (iso: string): string => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export interface LessonBankProps {
  className?: string;
  /** Bumped by the parent to reload (e.g. after an upload list refresh). */
  refreshKey?: number;
}

export const LessonBank: React.FC<LessonBankProps> = ({ className, refreshKey = 0 }) => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<BankLesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) throw new Error("You must be signed in.");
      const { data, error: lErr } = await db
        .from("lessons")
        .select("id, name, upload_id, sub_lesson_id, status, created_at, teacher_approved_at, content")
        .eq("teacher_id", userData.user.id)
        .order("created_at", { ascending: false });
      if (lErr) throw new Error(lErr.message);
      const rows = ((data as RawLesson[] | null) ?? []).filter((r) => !!r.content?.sections?.length);

      const uploadIds = [...new Set(rows.map((r) => r.upload_id).filter(Boolean))] as string[];
      const uploadNames = new Map<string, string>();
      if (uploadIds.length > 0) {
        const { data: ups } = await db.from("curriculum_uploads").select("id, file_name").in("id", uploadIds);
        for (const u of (ups as { id: string; file_name: string }[] | null) ?? []) uploadNames.set(u.id, u.file_name);
      }
      const subIds = [...new Set(rows.map((r) => r.sub_lesson_id).filter(Boolean))] as string[];
      const subTitles = new Map<string, string>();
      if (subIds.length > 0) {
        const { data: subs } = await db.from("sub_lessons").select("id, title").in("id", subIds);
        for (const sl of (subs as { id: string; title: string }[] | null) ?? []) subTitles.set(sl.id, sl.title);
      }
      const lessonIds = rows.map((r) => r.id);
      const assignedCount = new Map<string, number>();
      if (lessonIds.length > 0) {
        const { data: asg } = await db.from("assigned_lessons").select("lesson_id, class_id").in("lesson_id", lessonIds);
        const seen = new Set<string>();
        for (const a of (asg as { lesson_id: string; class_id: string }[] | null) ?? []) {
          const k = `${a.lesson_id}:${a.class_id}`;
          if (seen.has(k)) continue;
          seen.add(k);
          assignedCount.set(a.lesson_id, (assignedCount.get(a.lesson_id) ?? 0) + 1);
        }
      }

      setLessons(
        rows.map((r) => {
          const mastery = r.content?.sections?.find((s) => s.type === "mastery-check");
          return {
            id: r.id,
            name: r.name,
            upload_id: r.upload_id,
            status: r.status,
            created_at: r.created_at,
            teacher_approved_at: r.teacher_approved_at ?? null,
            sectionsCount: r.content?.sections?.length ?? 0,
            masteryCount: mastery?.questions?.length ?? 0,
            starredCount: mastery?.pinnedQuestionIds?.length ?? 0,
            uploadName: r.upload_id ? uploadNames.get(r.upload_id) ?? null : null,
            subLessonTitle: r.sub_lesson_id ? subTitles.get(r.sub_lesson_id) ?? null : null,
            assignedClasses: assignedCount.get(r.id) ?? 0,
          };
        }),
      );
    } catch (err) {
      console.error("Lesson bank load failed:", err);
      setError(err instanceof Error ? err.message : "Could not load your lessons.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load, refreshKey]);

  const assign = (l: BankLesson) => {
    const q = new URLSearchParams({ lessonId: l.id, lessonName: l.name });
    if (l.upload_id) q.set("uploadId", l.upload_id);
    navigate(`/teacher/assign-lesson?${q.toString()}`);
  };

  return (
    <section className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-1.5 text-base font-semibold text-slate-900 dark:text-slate-100">
            <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Lesson bank
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Lessons you have built. Assign one to another class any time; nothing is regenerated.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => void load()} disabled={loading} className="text-slate-500 hover:text-slate-700">
          <RefreshCw className={cn("mr-1.5 h-3.5 w-3.5", loading && "animate-spin")} /> Refresh
        </Button>
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 py-8 text-sm text-slate-500">
          <Loader2 className="h-4 w-4 animate-spin text-emerald-600" /> Loading lessons…
        </div>
      )}
      {!loading && error && (
        <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50/60 p-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
        </div>
      )}
      {!loading && !error && lessons.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-slate-200 py-8 text-center dark:border-slate-700">
          <Inbox className="h-6 w-6 text-slate-300" />
          <p className="text-sm text-slate-500">No lessons built yet.</p>
          <p className="text-xs text-slate-400">Open an upload and build Jeff&apos;s lesson; it will appear here.</p>
        </div>
      )}
      {!loading && !error && lessons.length > 0 && (
        <div className="space-y-2">
          {lessons.map((l) => {
            const approved = !!l.teacher_approved_at;
            return (
              <Card key={l.id} className="border-slate-200 transition-shadow hover:shadow-sm">
                <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">{l.name}</p>
                      {approved ? (
                        <Badge variant="success" className="gap-1 text-[10px]">
                          <CheckCircle2 className="h-3 w-3" /> Reviewed
                        </Badge>
                      ) : (
                        <Badge variant="warning" className="text-[10px]">Not reviewed yet</Badge>
                      )}
                      {l.assignedClasses > 0 && (
                        <Badge variant="outline" className="text-[10px]">
                          Assigned to {l.assignedClasses} class{l.assignedClasses === 1 ? "" : "es"}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {l.uploadName ? `From ${l.uploadName}${l.subLessonTitle && l.subLessonTitle !== l.name ? ` › ${l.subLessonTitle}` : ""} · ` : ""}built {fmtDay(l.created_at)}
                      {approved ? ` · reviewed ${fmtDay(l.teacher_approved_at as string)}` : ""}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {l.sectionsCount} sections · {l.masteryCount} mastery questions{l.starredCount ? ` · ${l.starredCount} starred` : ""}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center gap-2 self-end sm:self-auto">
                    <LessonPreviewButtons lessonId={l.id} source="generated" lessonName={l.name} />
                    {l.upload_id && (
                      <Button size="sm" variant="outline" onClick={() => navigate(`/teacher/curriculum/${l.upload_id}`)} title="Open the upload this lesson was built from">
                        <SlidersHorizontal className="mr-1.5 h-3.5 w-3.5" /> Open
                      </Button>
                    )}
                    <Button
                      size="sm"
                      onClick={() => assign(l)}
                      disabled={!approved}
                      title={approved ? "Assign to a class" : "Review and approve this lesson on its upload page first"}
                      className="bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                      <Send className="mr-1.5 h-3.5 w-3.5" /> Assign
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default LessonBank;
