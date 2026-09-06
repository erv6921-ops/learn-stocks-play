import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import TeacherUploadCurriculum from "@/pages/TeacherUploadCurriculum";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  Loader2,
  FileText,
  Trash2,
  Eye,
  Sparkles,
  AlertCircle,
  RefreshCw,
  Inbox,
} from "lucide-react";
import PreviewLessonModal from "@/components/PreviewLessonModal";

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
}

// PostgREST aggregate embeds come back as `[{ count: N }]`.
interface RawUploadRow {
  id: string;
  file_name: string;
  status: UploadStatus;
  created_at: string;
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
  const [previewUploadId, setPreviewUploadId] = useState<string | null>(null);

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
          "id, file_name, status, created_at, concepts(count), vocabulary(count), learning_objectives(count)",
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
        }),
      );
      setUploads(rows);
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

  return (
    <div className="space-y-8">
      {/* Upload form */}
      <section>
        <h3 className="mb-3 text-base font-semibold text-slate-900">
          Upload new curriculum
        </h3>
        <TeacherUploadCurriculum embedded onExtracted={fetchUploads} />
      </section>

      {/* Upload history */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900">
            Upload history
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => void fetchUploads()}
            disabled={loading}
            className="text-slate-500 hover:text-slate-700"
          >
            <RefreshCw className={cn("mr-1.5 h-3.5 w-3.5", loading && "animate-spin")} />
            Refresh
          </Button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-10 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
            Loading uploads…
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <Card className="border-red-200 bg-red-50/60">
            <CardContent className="flex flex-col items-start gap-3 pt-6">
              <div className="flex items-start gap-2">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => void fetchUploads()}
                className="border-red-300 text-red-700 hover:bg-red-100"
              >
                <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                Retry
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Empty */}
        {!loading && !error && uploads.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-200 bg-slate-50 py-12 text-center">
            <Inbox className="h-8 w-8 text-slate-300" />
            <p className="text-sm font-medium text-slate-600">
              No curriculum uploads yet.
            </p>
            <p className="text-xs text-slate-400">
              Upload your first PDF above.
            </p>
          </div>
        )}

        {/* List */}
        {!loading && !error && uploads.length > 0 && (
          <div className="space-y-3">
            {uploads.map((u) => (
              <Card key={u.id} className="border-slate-200 transition-shadow hover:shadow-sm">
                <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                      <FileText className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium text-slate-900">
                          {u.file_name}
                        </p>
                        <StatusBadge status={u.status} />
                      </div>
                      <p className="text-xs text-slate-400">
                        {fmtDate(u.created_at)}
                      </p>
                      <p className="text-xs text-slate-500">
                        {u.conceptsCount} concepts • {u.vocabularyCount} vocabulary •{" "}
                        {u.objectivesCount} objectives
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setPreviewUploadId(u.id)}
                      className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    >
                      <Eye className="mr-1.5 h-3.5 w-3.5" />
                      Assign lesson
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/teacher/build-study-guide?uploadId=${u.id}`)}
                      className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                    >
                      <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                      Build extra practice
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => void handleDelete(u)}
                      disabled={deletingId === u.id}
                      className="text-slate-400 hover:bg-red-50 hover:text-red-600"
                      aria-label={`Delete ${u.file_name}`}
                    >
                      {deletingId === u.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {previewUploadId && (
        <PreviewLessonModal
          uploadId={previewUploadId}
          isOpen
          onClose={() => setPreviewUploadId(null)}
        />
      )}
    </div>
  );
};

export default CurriculumTab;
