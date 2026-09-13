import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { QuestionApprovalPanel, GroundingBadge, type ApprovalCounts } from "@/components/teacher/QuestionApprovalPanel";
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Loader2,
  Quote,
  ShieldAlert,
  Undo2,
} from "lucide-react";

/**
 * /teacher/lesson-review/:lessonId
 *
 * The teacher's post-generation screen for a synthesized lesson. Shows every
 * teaching slide, check question and scenario with its evidence quote, page
 * number and verification badge, the items that were removed for failing
 * verification, and the mastery-pool questions with approve / edit / reject.
 *
 * "Approve lesson" sets lessons.teacher_approved_at (+ _by). Students cannot
 * open the lesson until that is set.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;
const LETTERS = ["A", "B", "C", "D", "E", "F"];

interface LessonRow {
  id: string;
  name: string;
  upload_id: string;
  status: string | null;
  content: LessonContent | null;
  teacher_approved_at?: string | null;
  teacher_approved_by?: string | null;
}

interface QuizQ {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  sourceChunkIds?: string[];
  evidenceQuote?: string;
  groundingStatus?: string;
}

interface Section {
  type: string;
  title?: string;
  paragraphs?: string[];
  bullets?: string[];
  realWorldExample?: string;
  narrative?: string;
  details?: string[];
  questions?: QuizQ[];
  requiredCorrect?: number;
  sourceChunkIds?: string[];
  evidenceQuote?: string;
  groundingStatus?: string;
}

interface FailedItem {
  kind: string;
  id: string;
  reason: string;
  item?: { title?: string; question?: string; narrative?: string };
}

interface LessonContent {
  version?: number;
  sections?: Section[];
  failed_items?: FailedItem[];
  grounding?: { verifiedCount?: number; failedCount?: number; insufficientSourceReason?: string };
}

interface ChunkRow {
  id: string;
  page_start: number | null;
  page_end: number | null;
}

function pagesFor(ids: string[] | undefined, chunks: Map<string, ChunkRow>): string | null {
  const labels: string[] = [];
  for (const id of ids ?? []) {
    const c = chunks.get(id);
    if (!c || c.page_start == null) continue;
    labels.push(c.page_end != null && c.page_end !== c.page_start ? `pp. ${c.page_start}-${c.page_end}` : `p. ${c.page_start}`);
  }
  return labels.length ? [...new Set(labels)].join(", ") : null;
}

function EvidenceLine({ quote, pages }: { quote?: string; pages: string | null }) {
  if (!quote) return null;
  return (
    <div className="flex items-start gap-2 rounded-md border border-amber-100 bg-amber-50/60 p-3 text-xs text-amber-900">
      <Quote className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      <div>
        <p className="font-medium">From your material{pages ? ` (${pages})` : ""}:</p>
        <p className="italic">“{quote}”</p>
      </div>
    </div>
  );
}

export default function TeacherLessonReview() {
  const { lessonId = "" } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lesson, setLesson] = useState<LessonRow | null>(null);
  const [chunks, setChunks] = useState<Map<string, ChunkRow>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [counts, setCounts] = useState<ApprovalCounts | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data, error: lErr } = await db.from("lessons").select("*").eq("id", lessonId).maybeSingle();
      if (lErr) throw new Error(lErr.message);
      if (!data) throw new Error("Lesson not found, or it isn't yours.");
      const row = data as LessonRow;
      setLesson(row);
      const { data: chunkData } = await db
        .from("curriculum_source_chunks")
        .select("id, page_start, page_end")
        .eq("upload_id", row.upload_id);
      const map = new Map<string, ChunkRow>();
      for (const c of (chunkData as ChunkRow[] | null) ?? []) map.set(c.id, c);
      setChunks(map);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load the lesson.");
    } finally {
      setLoading(false);
    }
  }, [lessonId]);

  useEffect(() => {
    void load();
  }, [load]);

  const setApproval = async (approve: boolean) => {
    if (!lesson) return;
    setSaving(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) throw new Error("You must be signed in.");
      const patch = approve
        ? { teacher_approved_at: new Date().toISOString(), teacher_approved_by: userData.user.id }
        : { teacher_approved_at: null, teacher_approved_by: null };
      const { data, error: uErr } = await db
        .from("lessons")
        .update(patch)
        .eq("id", lesson.id)
        .select("id, teacher_approved_at, teacher_approved_by")
        .single();
      if (uErr) throw new Error(uErr.message);
      setLesson({ ...lesson, ...(data as Partial<LessonRow>) });
      toast({
        title: approve ? "Lesson approved" : "Approval removed",
        description: approve
          ? "Students in the assigned classes can open it now."
          : "Students can no longer open this lesson until you approve it again.",
      });
    } catch (err) {
      toast({ title: "Couldn't update the lesson", description: err instanceof Error ? err.message : "Please try again.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const sections = useMemo(() => lesson?.content?.sections ?? [], [lesson]);
  const failedItems = lesson?.content?.failed_items ?? [];
  const approved = !!lesson?.teacher_approved_at;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-2 bg-background text-sm text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" /> Loading lesson…
      </div>
    );
  }
  if (error || !lesson) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background px-4 text-center">
        <AlertCircle className="h-6 w-6 text-red-600" />
        <p className="text-sm text-red-700">{error || "Lesson not found."}</p>
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-1.5 h-4 w-4" /> Back
        </Button>
      </div>
    );
  }

  let checkIndex = 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <button type="button" onClick={() => navigate("/teacher-dashboard")} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
          <ArrowLeft className="h-4 w-4" /> Teacher dashboard
        </button>

        {/* Header + lesson approval */}
        <Card className="border-emerald-100 shadow-sm">
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center gap-2 text-lg text-slate-900">
              <BookOpen className="h-5 w-5 text-emerald-600" />
              {lesson.name}
              {approved ? (
                <Badge variant="success" className="gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Approved for students
                </Badge>
              ) : (
                <Badge variant="warning" className="gap-1">
                  <ShieldAlert className="h-3 w-3" /> Not yet visible to students
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <p>
              Read through Jeff's teaching below. Every slide and question shows the exact sentence from your material it was built
              from. When it looks right, approve the lesson so students in the assigned classes can open it.
            </p>
            {lesson.content?.grounding?.insufficientSourceReason && (
              <p className="rounded-md border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
                <strong>Note from generation:</strong> {lesson.content.grounding.insufficientSourceReason}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-2">
              {approved ? (
                <Button variant="outline" onClick={() => void setApproval(false)} disabled={saving}>
                  {saving ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <Undo2 className="mr-1.5 h-4 w-4" />}
                  Remove approval
                </Button>
              ) : (
                <Button onClick={() => void setApproval(true)} disabled={saving} className="bg-emerald-600 text-white hover:bg-emerald-700">
                  {saving ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <CheckCircle2 className="mr-1.5 h-4 w-4" />}
                  Approve lesson for students
                </Button>
              )}
              {counts && (
                <span className="text-xs text-slate-500">
                  Mastery pool: {counts.approved} of {counts.total} questions approved
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Teaching content */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base text-slate-900">Jeff's lesson</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sections.length === 0 && (
              <p className="text-sm text-slate-500">
                This lesson has no teaching content. Students will get the question list only.
              </p>
            )}
            {sections.map((s, i) => {
              if (s.type === "concept") {
                return (
                  <div key={i} className="space-y-2 rounded-lg border border-slate-200 bg-white p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-slate-900">{s.title}</p>
                      {s.groundingStatus && <GroundingBadge status={s.groundingStatus} />}
                    </div>
                    {(s.paragraphs ?? []).map((p, pi) => (
                      <p key={pi} className="text-sm text-slate-700">
                        {p}
                      </p>
                    ))}
                    {s.bullets?.length ? (
                      <ul className="list-disc space-y-0.5 pl-5 text-sm text-slate-700">
                        {s.bullets.map((b, bi) => (
                          <li key={bi}>{b}</li>
                        ))}
                      </ul>
                    ) : null}
                    {s.realWorldExample && <p className="text-sm italic text-slate-600">{s.realWorldExample}</p>}
                    <EvidenceLine quote={s.evidenceQuote} pages={pagesFor(s.sourceChunkIds, chunks)} />
                  </div>
                );
              }
              if (s.type === "activity-check") {
                const act = (s as unknown as { activity?: { kind?: string; pairs?: { term: string; definition: string }[] } }).activity;
                return (
                  <div key={i} className="space-y-2 rounded-lg border border-violet-100 bg-violet-50/40 p-4 dark:border-violet-900 dark:bg-violet-950/20">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="text-[11px]">
                        Activity · {act?.kind === "vocab-match" ? "match the terms" : act?.kind ?? "activity"}
                      </Badge>
                      {s.groundingStatus && <GroundingBadge status={s.groundingStatus} />}
                    </div>
                    {act?.pairs?.length ? (
                      <ul className="space-y-0.5 text-sm text-slate-700 dark:text-slate-300">
                        {act.pairs.map((p, pi) => (
                          <li key={pi}>
                            <span className="font-medium">{p.term}</span> — {p.definition}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <p className="text-xs text-slate-500 dark:text-slate-400">Built from your verified vocabulary; students tap each term to its definition.</p>
                  </div>
                );
              }
              if (s.type === "micro-check") {
                const q = s.questions?.[0];
                if (!q) return null;
                checkIndex += 1;
                return (
                  <div key={i} className="space-y-2 rounded-lg border border-indigo-100 bg-indigo-50/40 p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="text-[11px]">
                        Check-in {checkIndex}
                      </Badge>
                      {q.groundingStatus && <GroundingBadge status={q.groundingStatus} />}
                    </div>
                    <p className="text-sm font-medium text-slate-900">{q.question}</p>
                    <ul className="space-y-1">
                      {q.options.map((o, oi) => (
                        <li key={oi} className={oi === q.correctAnswer ? "text-sm font-semibold text-emerald-700" : "text-sm text-slate-600"}>
                          {LETTERS[oi]}. {o}
                        </li>
                      ))}
                    </ul>
                    {q.explanation && <p className="text-xs text-slate-600">{q.explanation}</p>}
                    <EvidenceLine quote={q.evidenceQuote} pages={pagesFor(q.sourceChunkIds, chunks)} />
                  </div>
                );
              }
              if (s.type === "scenario") {
                return (
                  <div key={i} className="space-y-2 rounded-lg border border-teal-100 bg-teal-50/40 p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="text-[11px]">
                        Scenario
                      </Badge>
                      <p className="text-sm font-semibold text-slate-900">{s.title}</p>
                      {s.groundingStatus && <GroundingBadge status={s.groundingStatus} />}
                    </div>
                    <p className="text-sm text-slate-700">{s.narrative}</p>
                    {s.details?.length ? (
                      <ul className="list-disc space-y-0.5 pl-5 text-sm text-slate-700">
                        {s.details.map((d, di) => (
                          <li key={di}>{d}</li>
                        ))}
                      </ul>
                    ) : null}
                    <EvidenceLine quote={s.evidenceQuote} pages={pagesFor(s.sourceChunkIds, chunks)} />
                  </div>
                );
              }
              if (s.type === "mastery-check") {
                return (
                  <p key={i} className="text-xs text-slate-500">
                    Mastery check: {s.questions?.length ?? 0} questions in the pool, {s.requiredCorrect ?? 0} correct to pass. Approve them below.
                  </p>
                );
              }
              return null;
            })}
          </CardContent>
        </Card>

        {/* Removed items */}
        {failedItems.length > 0 && (
          <Card className="border-red-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-red-800">
                <ShieldAlert className="h-4 w-4" /> Removed before students see it ({failedItems.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-xs text-slate-600">
                These were generated but could not be matched to your material, so they are not part of the lesson.
              </p>
              {failedItems.map((f, i) => (
                <div key={i} className="rounded-md border border-red-100 bg-red-50/50 p-3 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="destructive" className="text-[10px] uppercase">
                      {f.kind}
                    </Badge>
                    <span className="font-medium text-slate-800">{f.item?.title ?? f.item?.question ?? f.item?.narrative ?? f.id}</span>
                  </div>
                  <p className="mt-1 text-red-800">{f.reason}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Mastery pool approvals */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base text-slate-900">Mastery-check questions</CardTitle>
          </CardHeader>
          <CardContent>
            <QuestionApprovalPanel lessonId={lesson.id} onCountsChange={setCounts} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
