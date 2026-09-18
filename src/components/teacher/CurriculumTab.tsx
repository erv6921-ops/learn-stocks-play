import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LessonPreviewButtons } from "@/components/teacher/LessonPreviewButtons";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  Loader2,
  FileText,
  Trash2,
  Sparkles,
  AlertCircle,
  RefreshCw,
  Inbox,
  MessageCircle,
  Users,
  UploadCloud,
  SlidersHorizontal,
  Search,
  ChevronRight,
  BookOpen,
  Send,
  CheckCircle2,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type UploadStatus = "pending" | "extracted" | "extraction_failed" | string;

interface CurriculumUpload {
  id: string;
  file_name: string;
  status: UploadStatus;
  created_at: string;
  conceptsCount: number;
  vocabularyCount: number;
  objectivesCount: number;
  /** Chat with Jeff: sections currently fed to the tutor (null = not fed). */
  jeffChunkCount: number | null;
  /** Chat with Jeff: when the material was last fed (null = not fed). */
  jeffIngestedAt: string | null;
}

interface TeacherClass {
  id: string;
  name: string;
}

/** A built lesson (public.lessons with content) shown under its upload. */
interface BuiltLesson {
  id: string;
  name: string;
  upload_id: string | null;
  sub_lesson_id: string | null;
  subLessonTitle: string | null;
  created_at: string;
  teacher_approved_at: string | null;
  sectionsCount: number;
  masteryCount: number;
  assignedClasses: number;
}

interface RawLesson {
  id: string;
  name: string;
  upload_id: string | null;
  sub_lesson_id?: string | null;
  created_at: string;
  teacher_approved_at?: string | null;
  content?: { sections?: { type: string; questions?: unknown[] }[] } | null;
}

// PostgREST aggregate embeds come back as `[{ count: N }]`.
interface RawUploadRow {
  id: string;
  file_name: string;
  status: UploadStatus;
  created_at: string;
  jeff_chunk_count?: number | null;
  jeff_ingested_at?: string | null;
  concepts?: { count: number }[] | null;
  vocabulary?: { count: number }[] | null;
  learning_objectives?: { count: number }[] | null;
}

// The generated Supabase `Database` type does not yet include the curriculum
// tables (run `supabase gen types typescript` to regenerate). Loosely-typed
// accessor keeps the build green until then.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const fmtDate = (iso: string): string =>
  new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const firstCount = (agg?: { count: number }[] | null): number =>
  Array.isArray(agg) && agg.length > 0 ? agg[0].count : 0;

const fmtDay = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });

/**
 * Turn whatever supabase.functions.invoke() hands back for a failed
 * ingest-curriculum-chunks call into one plain sentence a teacher can act on.
 * Never surfaces the raw error string.
 */
async function readableJeffError(err: unknown, mode: "feed" | "remove"): Promise<string> {
  const fallback = mode === "feed"
    ? "Jeff couldn't take this material right now. Please try again in a moment."
    : "Couldn't remove this material from Jeff right now. Please try again.";
  const ctx = (err as { context?: unknown } | null)?.context;
  if (ctx instanceof Response) {
    let serverMsg = "";
    try {
      const body = (await ctx.clone().json()) as { error?: unknown };
      if (typeof body?.error === "string") serverMsg = body.error;
    } catch {
      /* not JSON */
    }
    if (ctx.status === 401 || ctx.status === 403) return "You can only feed Jeff from your own uploads and classes. Try signing in again.";
    if (ctx.status === 422 || /no extracted text|no usable text/i.test(serverMsg)) {
      return "This upload has no readable text yet. Extract it first, then feed it to Jeff.";
    }
    if (ctx.status === 410) return "This upload was deleted.";
    if (ctx.status === 400) return "Something about this request wasn't right. Refresh the page and try again.";
    return fallback;
  }
  const msg = err instanceof Error ? err.message : "";
  if (/fetch|network|Failed to send/i.test(msg)) return "Couldn't reach the server. Check your connection and try again.";
  return fallback;
}

const StatusBadge: React.FC<{ status: UploadStatus }> = ({ status }) => {
  const map: Record<string, { label: string; cls: string }> = {
    pending: {
      label: "Pending",
      cls: "bg-amber-100 text-amber-700 border-amber-200",
    },
    extracted: {
      label: "Extracted",
      cls: "bg-emerald-100 text-emerald-700 border-emerald-200",
    },
    extraction_failed: {
      label: "Failed",
      cls: "bg-red-100 text-red-700 border-red-200",
    },
    awaiting_teacher_review: {
      label: "Ready to review",
      cls: "bg-emerald-100 text-emerald-700 border-emerald-200",
    },
    questions_generated: {
      label: "Questions generated",
      cls: "bg-sky-100 text-sky-700 border-sky-200",
    },
    lesson_synthesized: {
      label: "Lesson built",
      cls: "bg-emerald-100 text-emerald-700 border-emerald-200",
    },
  };
  const s = map[status] ?? {
    label: status,
    cls: "bg-slate-100 text-slate-600 border-slate-200",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
        s.cls,
      )}
    >
      {s.label}
    </span>
  );
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const CurriculumTab: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [uploads, setUploads] = useState<CurriculumUpload[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  // Chat with Jeff: the teacher's classes (ingest needs a class), the upload
  // currently being fed/removed, and the upload waiting on a class choice.
  const [classes, setClasses] = useState<TeacherClass[]>([]);
  const [jeffBusy, setJeffBusy] = useState<{ id: string; mode: "feed" | "remove" } | null>(null);
  const [classPickFor, setClassPickFor] = useState<CurriculumUpload | null>(null);
  // Built lessons grouped by upload (the lesson bank), search, details popup.
  const [lessonsByUpload, setLessonsByUpload] = useState<Map<string, BuiltLesson[]>>(new Map());
  const [query, setQuery] = useState("");
  /** Upload whose details popup is open. */
  const [detailId, setDetailId] = useState<string | null>(null);

  const fetchUploads = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) throw new Error("You must be signed in.");

      // Counts come from embedded aggregates on the child tables. RLS scopes
      // the parent rows to auth.uid(); teacher_id filter is belt-and-suspenders.
      const { data, error: qErr } = await db
        .from("curriculum_uploads")
        .select(
          "id, file_name, status, created_at, jeff_chunk_count, jeff_ingested_at, concepts(count), vocabulary(count), learning_objectives(count)",
        )
        .eq("teacher_id", userData.user.id)
        .neq("status", "deleted")
        .order("created_at", { ascending: false });

      if (qErr) throw new Error(qErr.message);

      const rows: CurriculumUpload[] = (data as RawUploadRow[] | null ?? []).map(
        (r) => ({
          id: r.id,
          file_name: r.file_name,
          status: r.status,
          created_at: r.created_at,
          conceptsCount: firstCount(r.concepts),
          vocabularyCount: firstCount(r.vocabulary),
          objectivesCount: firstCount(r.learning_objectives),
          jeffChunkCount: typeof r.jeff_chunk_count === "number" ? r.jeff_chunk_count : null,
          jeffIngestedAt: r.jeff_ingested_at ?? null,
        }),
      );
      setUploads(rows);

      // Built lessons for the bank, grouped by upload.
      const { data: lessonData } = await db
        .from("lessons")
        .select("id, name, upload_id, sub_lesson_id, created_at, teacher_approved_at, content")
        .eq("teacher_id", userData.user.id)
        .order("created_at", { ascending: false });
      const built = ((lessonData as RawLesson[] | null) ?? []).filter((l) => !!l.content?.sections?.length);
      const subIds = [...new Set(built.map((l) => l.sub_lesson_id).filter(Boolean))] as string[];
      const subTitles = new Map<string, string>();
      if (subIds.length) {
        const { data: subs } = await db.from("sub_lessons").select("id, title").in("id", subIds);
        for (const sl of (subs as { id: string; title: string }[] | null) ?? []) subTitles.set(sl.id, sl.title);
      }
      const assignedCount = new Map<string, number>();
      if (built.length) {
        const { data: asg } = await db.from("assigned_lessons").select("lesson_id, class_id").in("lesson_id", built.map((l) => l.id));
        const seen = new Set<string>();
        for (const a of (asg as { lesson_id: string; class_id: string }[] | null) ?? []) {
          const k = `${a.lesson_id}:${a.class_id}`;
          if (seen.has(k)) continue;
          seen.add(k);
          assignedCount.set(a.lesson_id, (assignedCount.get(a.lesson_id) ?? 0) + 1);
        }
      }
      const grouped = new Map<string, BuiltLesson[]>();
      for (const l of built) {
        const key = l.upload_id ?? "";
        const mastery = l.content?.sections?.find((x) => x.type === "mastery-check");
        grouped.set(key, [
          ...(grouped.get(key) ?? []),
          {
            id: l.id,
            name: l.name,
            upload_id: l.upload_id,
            sub_lesson_id: l.sub_lesson_id ?? null,
            subLessonTitle: l.sub_lesson_id ? subTitles.get(l.sub_lesson_id) ?? null : null,
            created_at: l.created_at,
            teacher_approved_at: l.teacher_approved_at ?? null,
            sectionsCount: l.content?.sections?.length ?? 0,
            masteryCount: mastery?.questions?.length ?? 0,
            assignedClasses: assignedCount.get(l.id) ?? 0,
          },
        ]);
      }
      setLessonsByUpload(grouped);

      // Classes this teacher owns (same query shape as the dashboard). A
      // failure here only disables "Feed to Jeff"; the upload list still shows.
      const { data: classRows, error: cErr } = await db
        .from("classes")
        .select("id, name")
        .eq("teacher_id", userData.user.id)
        .order("created_at", { ascending: false });
      if (cErr) console.error("Failed to load classes for Feed to Jeff:", cErr.message);
      setClasses(((classRows as TeacherClass[] | null) ?? []).filter((c) => c.id && c.name));
    } catch (err) {
      console.error("Failed to load curriculum uploads:", err);
      setError(
        err instanceof Error ? err.message : "Could not load upload history.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchUploads();
  }, [fetchUploads]);

  const handleDelete = useCallback(
    async (upload: CurriculumUpload) => {
      if (
        !window.confirm(
          `Remove "${upload.file_name}" from your uploads? This can't be undone from here.`,
        )
      ) {
        return;
      }
      setDeletingId(upload.id);
      try {
        // Soft-delete: child rows (vocabulary/learning_objectives) are FK
        // RESTRICT, so a hard delete would fail while they exist. Flagging the
        // row as 'deleted' hides it and keeps extracted data intact.
        const { error: delErr } = await db
          .from("curriculum_uploads")
          .update({ status: "deleted" })
          .eq("id", upload.id);
        if (delErr) throw new Error(delErr.message);

        setUploads((prev) => prev.filter((u) => u.id !== upload.id));
        toast({ title: "Upload removed", description: upload.file_name });
      } catch (err) {
        console.error("Delete failed:", err);
        toast({
          title: "Couldn't remove upload",
          description:
            err instanceof Error ? err.message : "Please try again.",
          variant: "destructive",
        });
      } finally {
        setDeletingId(null);
      }
    },
    [toast],
  );

  // Update one upload's Jeff status in place - no refetch, so the list doesn't
  // flash and the teacher keeps their scroll position.
  const patchUpload = useCallback((id: string, patch: Partial<CurriculumUpload>) => {
    setUploads((prev) => prev.map((u) => (u.id === id ? { ...u, ...patch } : u)));
  }, []);

  const feedToJeff = useCallback(
    async (upload: CurriculumUpload, cls: TeacherClass) => {
      setClassPickFor(null);
      setJeffBusy({ id: upload.id, mode: "feed" });
      try {
        const { data, error: fnErr } = await supabase.functions.invoke("ingest-curriculum-chunks", {
          body: { upload_id: upload.id, class_id: cls.id },
        });
        if (fnErr) throw fnErr;
        const res = data as { success?: boolean; chunk_count?: number; ingested_at?: string } | null;
        if (!res?.success || typeof res.chunk_count !== "number") {
          throw new Error("Unexpected response");
        }
        patchUpload(upload.id, {
          jeffChunkCount: res.chunk_count,
          jeffIngestedAt: res.ingested_at ?? new Date().toISOString(),
        });
        toast({
          title: "Fed to Jeff",
          description: `${upload.file_name} · ${res.chunk_count} section${res.chunk_count === 1 ? "" : "s"} now answer ${cls.name}'s questions.`,
        });
      } catch (err) {
        console.error("Feed to Jeff failed:", err);
        toast({
          title: "Couldn't feed this to Jeff",
          description: await readableJeffError(err, "feed"),
          variant: "destructive",
        });
      } finally {
        setJeffBusy(null);
      }
    },
    [patchUpload, toast],
  );

  const removeFromJeff = useCallback(
    async (upload: CurriculumUpload) => {
      setJeffBusy({ id: upload.id, mode: "remove" });
      try {
        const { data, error: fnErr } = await supabase.functions.invoke("ingest-curriculum-chunks", {
          body: { upload_id: upload.id, action: "remove" },
        });
        if (fnErr) throw fnErr;
        if (!(data as { success?: boolean } | null)?.success) throw new Error("Unexpected response");
        patchUpload(upload.id, { jeffChunkCount: null, jeffIngestedAt: null });
        toast({ title: "Removed from Jeff", description: `Jeff no longer answers from ${upload.file_name}.` });
      } catch (err) {
        console.error("Remove from Jeff failed:", err);
        toast({
          title: "Couldn't remove from Jeff",
          description: await readableJeffError(err, "remove"),
          variant: "destructive",
        });
      } finally {
        setJeffBusy(null);
      }
    },
    [patchUpload, toast],
  );

  // Feed / Re-feed entry point: one class -> go; several -> ask which.
  const startFeed = useCallback(
    (upload: CurriculumUpload) => {
      if (classes.length === 0) {
        toast({
          title: "Create a class first",
          description: "Jeff answers per class, so the material needs a class to belong to.",
          variant: "destructive",
        });
        return;
      }
      if (classes.length === 1) {
        void feedToJeff(upload, classes[0]);
        return;
      }
      setClassPickFor(upload);
    },
    [classes, feedToJeff, toast],
  );

  return (
    <div className="space-y-8">
      {/* Upload entry point: routes to the dedicated curriculum page */}
      <section>
        <h3 className="mb-3 text-base font-semibold text-slate-900 dark:text-slate-100">
          Upload new curriculum
        </h3>
        <Card className="border-emerald-100 shadow-sm dark:border-emerald-900">
          <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-sm">
                <UploadCloud className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0 space-y-0.5">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Upload a PDF and build a lesson</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Concepts, vocabulary and objectives are pulled from your pages. You mark what matters, approve or write questions, then preview and assign Jeff&apos;s lesson.
                </p>
              </div>
            </div>
            <Button
              onClick={() => navigate("/teacher/curriculum")}
              className="shrink-0 self-end bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 sm:self-auto"
            >
              <UploadCloud className="mr-1.5 h-4 w-4" /> Upload curriculum
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Your materials: one card per upload with its built lessons nested. */}
      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Your materials</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Every upload with the lessons built from it. Open one to review, build and assign; assign a built lesson to another class from here.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search uploads and lessons" className="h-8 w-56 pl-7 text-xs" />
            </div>
            <Button variant="ghost" size="sm" onClick={() => void fetchUploads()} disabled={loading} className="text-slate-500 hover:text-slate-700">
              <RefreshCw className={cn("mr-1.5 h-3.5 w-3.5", loading && "animate-spin")} />
              Refresh
            </Button>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-10 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
            Loading your materials…
          </div>
        )}

        {!loading && error && (
          <Card className="border-red-200 bg-red-50/60">
            <CardContent className="flex flex-col items-start gap-3 pt-6">
              <div className="flex items-start gap-2">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
              <Button size="sm" variant="outline" onClick={() => void fetchUploads()} className="border-red-300 text-red-700 hover:bg-red-100">
                <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Retry
              </Button>
            </CardContent>
          </Card>
        )}

        {!loading && !error && uploads.length === 0 && (
          <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-slate-200 py-10 text-center">
            <Inbox className="h-8 w-8 text-slate-300" />
            <p className="text-sm text-slate-500">No curriculum uploads yet.</p>
            <p className="text-xs text-slate-400">Use &ldquo;Upload curriculum&rdquo; above to add your first PDF.</p>
          </div>
        )}

        {!loading && !error && uploads.length > 0 && (() => {
          const q = query.trim().toLowerCase();
          const visible = uploads.filter((u) => {
            if (!q) return true;
            if (u.file_name.toLowerCase().includes(q)) return true;
            return (lessonsByUpload.get(u.id) ?? []).some((l) => l.name.toLowerCase().includes(q) || (l.subLessonTitle ?? "").toLowerCase().includes(q));
          });
          if (visible.length === 0) return <p className="py-6 text-center text-sm text-slate-500">Nothing matches &ldquo;{query}&rdquo;.</p>;
          return (
            <div className="space-y-2">
              {visible.map((u) => {
                const lessons = lessonsByUpload.get(u.id) ?? [];
                const approved = lessons.filter((l) => !!l.teacher_approved_at).length;
                return (
                  <Card key={u.id} className="border-slate-200 transition-shadow hover:shadow-sm">
                    <CardContent className="flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:justify-between">
                      <button type="button" onClick={() => setDetailId(u.id)} className="flex min-w-0 flex-1 items-start gap-3 text-left" title="Show this upload's lessons and actions">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                          <FileText className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex min-w-0 flex-wrap items-center gap-2">
                            <p className="min-w-0 break-words text-sm font-medium text-slate-900 dark:text-slate-100">{u.file_name}</p>
                            <StatusBadge status={u.status} />
                          </div>
                          <p className="break-words text-xs text-slate-500">
                            {fmtDate(u.created_at)} · {u.conceptsCount} concepts · {u.vocabularyCount} terms
                            {lessons.length > 0 ? ` · ${lessons.length} lesson${lessons.length === 1 ? "" : "s"} built, ${approved} approved` : " · no lesson built yet"}
                            {u.jeffIngestedAt ? " · in Jeff" : ""}
                          </p>
                        </div>
                      </button>
                      <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
                        <Button size="sm" variant="outline" onClick={() => setDetailId(u.id)} className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                          Details <ChevronRight className="ml-1 h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" onClick={() => navigate(`/teacher/curriculum/${encodeURIComponent(u.id)}`)} className="bg-emerald-600 text-white hover:bg-emerald-700" title="Review what was extracted, build and assign lessons">
                          <SlidersHorizontal className="mr-1.5 h-3.5 w-3.5" /> Open
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          );
        })()}
      </section>

      {/* Upload details popup: its lessons (preview / assign) and every action, all visible at once. */}
      <Dialog open={detailId !== null} onOpenChange={(o) => { if (!o) setDetailId(null); }}>
        <DialogContent className="h-[94vh] max-h-[94vh] w-[96vw] max-w-[96vw] overflow-y-auto overflow-x-hidden p-4 sm:max-w-[96vw] sm:p-6 lg:w-[92vw] lg:max-w-[92vw]">
          {(() => {
            const u = uploads.find((x) => x.id === detailId);
            if (!u) return null;
            const lessons = lessonsByUpload.get(u.id) ?? [];
            const approved = lessons.filter((l) => !!l.teacher_approved_at).length;
            return (
              <>
                <DialogHeader>
                  <DialogTitle className="flex min-w-0 flex-wrap items-center gap-2 pr-6">
                    <FileText className="h-4 w-4 shrink-0 text-emerald-600" />
                    <span className="min-w-0 break-words">{u.file_name}</span>
                    <StatusBadge status={u.status} />
                  </DialogTitle>
                  <DialogDescription className="break-words">
                    Uploaded {fmtDate(u.created_at)} · {u.conceptsCount} concepts · {u.vocabularyCount} terms · {u.objectivesCount} objectives
                    {lessons.length > 0 ? ` · ${lessons.length} lesson${lessons.length === 1 ? "" : "s"} built, ${approved} approved` : ""}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  {/* Primary: open the review page */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Button onClick={() => { setDetailId(null); navigate(`/teacher/curriculum/${encodeURIComponent(u.id)}`); }} className="bg-emerald-600 text-white hover:bg-emerald-700">
                      <SlidersHorizontal className="mr-1.5 h-4 w-4" /> Open: review, build and assign
                    </Button>
                    <Button variant="outline" onClick={() => { setDetailId(null); navigate(`/teacher/build-study-guide?uploadId=${u.id}`); }} className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                      <Sparkles className="mr-1.5 h-4 w-4" /> Build extra practice
                    </Button>
                  </div>

                  {/* Lessons built from this upload */}
                  <div>
                    <h4 className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      <BookOpen className="h-4 w-4 text-emerald-600" /> Lessons built ({lessons.length})
                    </h4>
                    {lessons.length === 0 ? (
                      <p className="rounded-lg border border-dashed border-slate-200 p-3 text-xs text-slate-500 dark:border-slate-700">
                        No lesson built from this upload yet. Open it to generate questions and build Jeff&apos;s lesson.
                      </p>
                    ) : (
                      <ul className="grid grid-cols-1 gap-2 xl:grid-cols-2">
                        {lessons.map((l) => {
                          const ok = !!l.teacher_approved_at;
                          return (
                            <li key={l.id} className="flex min-w-0 flex-col gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
                              <div className="min-w-0">
                                <div className="flex min-w-0 flex-wrap items-center gap-2">
                                  <p className="min-w-0 break-words text-sm font-medium text-slate-900 dark:text-slate-100">{l.name}</p>
                                  {ok ? (
                                    <Badge variant="success" className="gap-1 text-[10px]"><CheckCircle2 className="h-3 w-3" /> Reviewed</Badge>
                                  ) : (
                                    <Badge variant="warning" className="text-[10px]">Not reviewed</Badge>
                                  )}
                                  {l.assignedClasses > 0 && <Badge variant="outline" className="text-[10px]">In {l.assignedClasses} class{l.assignedClasses === 1 ? "" : "es"}</Badge>}
                                </div>
                                <p className="break-words text-xs text-slate-500">
                                  {l.subLessonTitle && l.subLessonTitle !== l.name ? `${l.subLessonTitle} · ` : ""}{l.sectionsCount} sections · {l.masteryCount} mastery questions · built {fmtDay(l.created_at)}
                                </p>
                              </div>
                              <div className="flex flex-wrap items-center gap-2">
                                <LessonPreviewButtons lessonId={l.id} source="generated" lessonName={l.name} />
                                <Button
                                  size="sm"
                                  onClick={() => { setDetailId(null); navigate(`/teacher/assign-lesson?uploadId=${encodeURIComponent(u.id)}&lessonId=${encodeURIComponent(l.id)}&lessonName=${encodeURIComponent(l.name)}`); }}
                                  disabled={!ok}
                                  title={ok ? "Assign to a class" : "Review and approve this lesson first"}
                                  className="bg-emerald-600 text-white hover:bg-emerald-700"
                                >
                                  <Send className="mr-1 h-3.5 w-3.5" /> Assign
                                </Button>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>

                  {/* Chat with Jeff */}
                  <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                    <h4 className="mb-1 flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      <MessageCircle className="h-4 w-4 text-emerald-600" /> Chat with Jeff
                    </h4>
                    <p className="mb-2 text-xs text-slate-500 dark:text-slate-400">
                      Material you feed to Jeff is used to answer that class&apos;s Chat with Jeff questions, and only students in that class can see it.
                    </p>
                    {u.jeffIngestedAt ? (
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300">
                          <MessageCircle className="h-3 w-3" /> In Jeff · {u.jeffChunkCount ?? 0} section{u.jeffChunkCount === 1 ? "" : "s"} · fed {fmtDay(u.jeffIngestedAt)}
                        </span>
                        <Button size="sm" variant="outline" onClick={() => startFeed(u)} disabled={jeffBusy?.id === u.id} className="h-7 text-xs">
                          {jeffBusy?.id === u.id && jeffBusy.mode === "feed" ? "Re-feeding…" : "Re-feed"}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => void removeFromJeff(u)} disabled={jeffBusy?.id === u.id} className="h-7 text-xs text-slate-500 hover:text-red-600">
                          {jeffBusy?.id === u.id && jeffBusy.mode === "remove" ? "Removing…" : "Remove from Jeff"}
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startFeed(u)}
                        disabled={jeffBusy?.id === u.id || u.status === "pending" || u.status === "extraction_failed"}
                        title={u.status === "extraction_failed" || u.status === "pending" ? "Extract the PDF's text first" : undefined}
                        className="border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300"
                      >
                        {jeffBusy?.id === u.id && jeffBusy.mode === "feed" ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <MessageCircle className="mr-1.5 h-3.5 w-3.5" />}
                        Feed to Jeff
                      </Button>
                    )}
                  </div>

                  {/* Danger */}
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => void handleDelete(u).then(() => setDetailId(null))}
                      disabled={deletingId === u.id}
                      className="text-slate-400 hover:bg-red-50 hover:text-red-600"
                    >
                      {deletingId === u.id ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <Trash2 className="mr-1.5 h-4 w-4" />}
                      Remove this upload
                    </Button>
                  </div>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* Which class should Jeff answer for? Only shown when the teacher has
          more than one class; a single class is used without asking. */}
      <Dialog open={classPickFor !== null} onOpenChange={(o) => { if (!o) setClassPickFor(null); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Feed to Jeff for which class?</DialogTitle>
            <DialogDescription>
              {classPickFor?.file_name ? `"${classPickFor.file_name}" will ` : "This material will "}
              only be used to answer questions from students in the class you pick.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            {classes.map((c) => (
              <Button
                key={c.id}
                variant="outline"
                className="h-auto justify-start gap-2 px-3 py-2.5 text-left"
                onClick={() => { if (classPickFor) void feedToJeff(classPickFor, c); }}
              >
                <Users className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span className="truncate font-medium">{c.name}</span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CurriculumTab;
