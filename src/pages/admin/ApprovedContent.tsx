import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GroundingBadge } from "@/components/teacher/QuestionApprovalPanel";
import { AlertCircle, CheckCircle2, ChevronDown, Loader2, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * /admin/approved-content — READ-ONLY view of everything that went live across
 * all teachers: each generated lesson with its verification counts, who
 * approved it and when, and every generated question with its verification
 * badge and approver. No approve / reject controls here; teachers own those on
 * their post-generation screens.
 *
 * Reads rely on the admin SELECT policies from sql/2026-09-11_teacher_approval.sql
 * (same email allowlist as profiles_admin_read).
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;
const ADMIN_EMAILS = ["erv6921@gmail.com"];

interface LessonRow {
  id: string;
  name: string;
  upload_id: string;
  teacher_id: string;
  status: string | null;
  created_at: string;
  teacher_approved_at?: string | null;
  teacher_approved_by?: string | null;
  content?: {
    version?: number;
    grounding?: { generator?: string; verifiedCount?: number; failedCount?: number };
    sections?: { type: string }[];
    failed_items?: unknown[];
  } | null;
}

interface QuestionRow {
  id: string;
  upload_id: string;
  lesson_id: string | null;
  question_text: string;
  correct_answer: string;
  status?: string | null;
  grounding_status?: string | null;
  evidence_quote?: string | null;
  teacher_approved_at?: string | null;
  teacher_approved_by?: string | null;
  created_at: string;
  origin?: "generated" | "teacher_authored" | null;
}

interface UploadRow {
  id: string;
  file_name: string;
  teacher_id: string;
  status: string | null;
}

interface ProfileRow {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
}

const fmt = (iso: string | null | undefined) => (iso ? new Date(iso).toLocaleString() : "—");

export default function ApprovedContent() {
  const { user, loading: authLoading } = useAuth();
  const allowed = !!user && ADMIN_EMAILS.includes((user.email ?? "").toLowerCase());

  const [lessons, setLessons] = useState<LessonRow[]>([]);
  const [questions, setQuestions] = useState<QuestionRow[]>([]);
  const [uploads, setUploads] = useState<Map<string, UploadRow>>(new Map());
  const [profiles, setProfiles] = useState<Map<string, ProfileRow>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [liveOnly, setLiveOnly] = useState(true);
  const [open, setOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!allowed) return;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const [lRes, qRes, uRes, pRes] = await Promise.all([
          db.from("lessons").select("*").order("created_at", { ascending: false }),
          db.from("generated_questions").select("*").order("created_at", { ascending: true }),
          db.from("curriculum_uploads").select("id, file_name, teacher_id, status"),
          db.from("profiles").select("id, first_name, last_name, email"),
        ]);
        for (const r of [lRes, qRes, uRes, pRes]) if (r.error) throw new Error(r.error.message);
        setLessons((lRes.data as LessonRow[]) ?? []);
        setQuestions((qRes.data as QuestionRow[]) ?? []);
        setUploads(new Map(((uRes.data as UploadRow[]) ?? []).map((u) => [u.id, u])));
        setProfiles(new Map(((pRes.data as ProfileRow[]) ?? []).map((p) => [p.id, p])));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load content.");
      } finally {
        setLoading(false);
      }
    })();
  }, [allowed]);

  const who = (id: string | null | undefined): string => {
    if (!id) return "—";
    const p = profiles.get(id);
    if (!p) return id.slice(0, 8);
    const name = [p.first_name, p.last_name].filter(Boolean).join(" ");
    return name || p.email || id.slice(0, 8);
  };

  const questionsByLesson = useMemo(() => {
    const m = new Map<string, QuestionRow[]>();
    for (const q of questions) {
      if (!q.lesson_id) continue;
      if (!m.has(q.lesson_id)) m.set(q.lesson_id, []);
      m.get(q.lesson_id)!.push(q);
    }
    return m;
  }, [questions]);

  const unlinkedByUpload = useMemo(() => {
    const m = new Map<string, QuestionRow[]>();
    for (const q of questions) {
      if (q.lesson_id) continue;
      if (!m.has(q.upload_id)) m.set(q.upload_id, []);
      m.get(q.upload_id)!.push(q);
    }
    return m;
  }, [questions]);

  const shownLessons = liveOnly ? lessons.filter((l) => !!l.teacher_approved_at) : lessons;

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading…
      </div>
    );
  }
  if (!allowed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-background text-center">
        <h1 className="text-2xl font-bold">Access denied</h1>
        <p className="text-muted-foreground">This page is for administrators only.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold">Live generated content</h1>
          <p className="text-sm text-muted-foreground">
            Read-only. Every generated lesson and question across all teachers, with source verification and who approved it.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Button size="sm" variant={liveOnly ? "default" : "outline"} onClick={() => setLiveOnly(true)}>
              Live only ({lessons.filter((l) => !!l.teacher_approved_at).length})
            </Button>
            <Button size="sm" variant={!liveOnly ? "default" : "outline"} onClick={() => setLiveOnly(false)}>
              All lessons ({lessons.length})
            </Button>
          </div>
        </header>

        {loading && (
          <div className="flex items-center gap-2 py-10 text-sm text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading…
          </div>
        )}
        {!loading && error && (
          <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
          </div>
        )}

        {!loading && !error && (
          <section className="space-y-3">
            {shownLessons.length === 0 && <p className="text-sm text-muted-foreground">No lessons to show.</p>}
            {shownLessons.map((l) => {
              const upload = uploads.get(l.upload_id);
              const qs = questionsByLesson.get(l.id) ?? [];
              const approvedQs = qs.filter((q) => !!q.teacher_approved_at).length;
              const failedQs = qs.filter((q) => q.grounding_status === "failed").length;
              const g = l.content?.grounding;
              const isOpen = !!open[l.id];
              return (
                <div key={l.id} className="rounded-xl border border-border bg-card">
                  <button
                    type="button"
                    className="flex w-full flex-wrap items-center gap-2 px-4 py-3 text-left"
                    onClick={() => setOpen((p) => ({ ...p, [l.id]: !p[l.id] }))}
                  >
                    <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
                    <span className="font-semibold">{l.name}</span>
                    {l.teacher_approved_at ? (
                      <Badge variant="success" className="gap-1 text-[11px]">
                        <CheckCircle2 className="h-3 w-3" /> Live
                      </Badge>
                    ) : (
                      <Badge variant="warning" className="gap-1 text-[11px]">
                        <ShieldAlert className="h-3 w-3" /> Not approved
                      </Badge>
                    )}
                    {l.content?.version === 2 ? (
                      <Badge variant="outline" className="text-[11px]">
                        source-grounded · {g?.verifiedCount ?? 0} verified · {g?.failedCount ?? 0} removed
                      </Badge>
                    ) : (
                      <Badge variant="muted" className="text-[11px]">
                        {l.content ? "v1 lesson (not verified)" : "no teaching content"}
                      </Badge>
                    )}
                    <span className="ml-auto text-xs text-muted-foreground">
                      {who(l.teacher_id)} · {upload?.file_name ?? "upload"} · created {fmt(l.created_at)}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="space-y-3 border-t border-border px-4 py-3 text-sm">
                      <dl className="grid grid-cols-1 gap-x-6 gap-y-1 text-xs sm:grid-cols-2">
                        <dt className="text-muted-foreground">Approved by</dt>
                        <dd>{l.teacher_approved_at ? `${who(l.teacher_approved_by)} · ${fmt(l.teacher_approved_at)}` : "—"}</dd>
                        <dt className="text-muted-foreground">Sections</dt>
                        <dd>{l.content?.sections?.length ?? 0}</dd>
                        <dt className="text-muted-foreground">Mastery pool</dt>
                        <dd>
                          {qs.length} questions · {approvedQs} approved{failedQs > 0 ? ` · ${failedQs} not found in source` : ""}
                        </dd>
                      </dl>
                      {qs.length > 0 && (
                        <ul className="space-y-1.5">
                          {qs.map((q) => (
                            <li key={q.id} className="rounded-md border border-border/60 p-2 text-xs">
                              <div className="flex flex-wrap items-center gap-2">
                                <GroundingBadge status={q.grounding_status} origin={q.origin ?? null} />
                                {q.teacher_approved_at ? (
                                  <Badge variant="success" className="text-[10px]">
                                    approved by {who(q.teacher_approved_by)} · {fmt(q.teacher_approved_at)}
                                  </Badge>
                                ) : (
                                  <Badge variant="muted" className="text-[10px]">
                                    not approved
                                  </Badge>
                                )}
                              </div>
                              <p className="mt-1 font-medium">{q.question_text}</p>
                              <p className="text-muted-foreground">Answer: {q.correct_answer}</p>
                              {q.evidence_quote && <p className="italic text-muted-foreground">“{q.evidence_quote}”</p>}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        )}

        {!loading && !error && unlinkedByUpload.size > 0 && (
          <section className="space-y-2">
            <h2 className="text-lg font-semibold">Question banks not yet in a lesson</h2>
            {[...unlinkedByUpload.entries()].map(([uploadId, qs]) => {
              const u = uploads.get(uploadId);
              return (
                <div key={uploadId} className="flex flex-wrap items-center gap-2 rounded-lg border border-border px-4 py-2 text-xs">
                  <span className="font-medium">{u?.file_name ?? uploadId.slice(0, 8)}</span>
                  <span className="text-muted-foreground">{u ? who(u.teacher_id) : ""}</span>
                  <span className="ml-auto text-muted-foreground">
                    {qs.length} questions · {qs.filter((q) => !!q.teacher_approved_at).length} approved ·{" "}
                    {qs.filter((q) => q.grounding_status === "verified").length} verified ·{" "}
                    {qs.filter((q) => q.grounding_status === "failed").length} not found in source
                  </span>
                </div>
              );
            })}
          </section>
        )}
      </div>
    </div>
  );
}
