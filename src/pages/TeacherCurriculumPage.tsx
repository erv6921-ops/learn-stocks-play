import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
// Vite-friendly worker resolution (pdfjs-dist v6). The `?url` suffix returns
// the hashed asset URL that Vite emits for the worker bundle.
import PdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { AlertCircle, ArrowLeft, FileText, Loader2, RefreshCw, ScanLine, UploadCloud, X } from "lucide-react";
import { CurationReview } from "@/components/teacher/curation/CurationReview";
import { ExtractionProgress } from "@/components/teacher/curation/ExtractionProgress";
import { db, functionError, NOT_ENOUGH_TEXT, REVIEWABLE_STATUSES, runSteppedExtraction, type PageForExtraction } from "@/components/teacher/curation/api";

pdfjsLib.GlobalWorkerOptions.workerSrc = PdfWorkerUrl;

/**
 * The teacher curriculum page: /teacher/curriculum (new upload) and
 * /teacher/curriculum/:uploadId (an existing upload).
 *
 *   choose PDF -> "Extract concepts" -> real progress bar (server stages)
 *   -> the same page becomes the tabbed review (CurationReview)
 *
 * The URL is updated to /teacher/curriculum/<id> once an upload row exists so
 * a refresh lands back on the review, but the page never navigates away.
 */

const PREVIEW_LIMIT = 500;

type Phase =
  | "idle" // no file selected
  | "parsing" // reading text out of the PDF in the browser
  | "ready" // text extracted, awaiting "Extract concepts"
  | "extracting" // extract-curriculum-v2 in flight; progress bar
  | "loading" // opened an existing upload; checking its state
  | "review" // extracted; the tabbed review
  | "error";

type ErrorKind = "generic" | "no-text";

type PageText = PageForExtraction;

/**
 * Rebuilds the page's lines from pdf.js text items using their y-coordinate
 * (a new line when y changes by more than about half a line's height, a
 * blank line on a gap of roughly two lines), items within a line ordered by
 * x. Headings, labels and term lists keep their own lines instead of being
 * run together with spaces.
 */
function itemsToText(items: { str: string; transform: number[]; height?: number; width?: number; hasEOL?: boolean }[]): string {
  type It = { str: string; x: number; y: number; h: number };
  const its: It[] = items
    .filter((it) => typeof it.str === "string" && it.str.length > 0 && Array.isArray(it.transform))
    .map((it) => ({ str: it.str, x: it.transform[4], y: it.transform[5], h: Math.abs(it.height ?? it.transform[3] ?? 10) || 10 }));
  if (its.length === 0) return "";
  const medianH = [...its.map((i) => i.h)].sort((a, b) => a - b)[Math.floor(its.length / 2)] || 10;
  // Cluster into lines by y (PDF y grows upward: sort descending).
  its.sort((a, b) => b.y - a.y || a.x - b.x);
  const lines: { y: number; items: It[] }[] = [];
  for (const it of its) {
    const last = lines[lines.length - 1];
    if (last && Math.abs(last.y - it.y) <= Math.max(2, medianH * 0.5)) last.items.push(it);
    else lines.push({ y: it.y, items: [it] });
  }
  const out: string[] = [];
  let prevY: number | null = null;
  for (const line of lines) {
    line.items.sort((a, b) => a.x - b.x);
    const text = line.items
      .map((i) => i.str)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    if (!text) continue;
    if (prevY != null && prevY - line.y > medianH * 2.2) out.push("");
    out.push(text);
    prevY = line.y;
  }
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

/** Thin or garbled: too few words, or mostly non-letter characters (scans, slide decks, decorative pages). */
function looksThin(text: string): boolean {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length < 25) return true;
  const letters = (text.match(/\p{L}/gu) ?? []).length;
  return letters / Math.max(1, text.length) < 0.5;
}

/** Renders one page to a JPEG data URL (base64 body returned) for transcription. */
async function renderPageImage(page: { getViewport: (o: { scale: number }) => { width: number; height: number }; render: (o: { canvasContext: CanvasRenderingContext2D; viewport: unknown }) => { promise: Promise<unknown> } }): Promise<string | null> {
  try {
    const base = page.getViewport({ scale: 1 });
    const scale = Math.min(1.6, 1400 / Math.max(base.width, base.height));
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    await page.render({ canvasContext: ctx, viewport }).promise;
    const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
    return dataUrl.split(",")[1] ?? null;
  } catch (err) {
    console.warn("page render failed", err);
    return null;
  }
}

const DASHBOARD_ROUTE = "/teacher-dashboard?tab=curriculum";

// TEMPORARY tracing for the "was never extracted" bug (remove once diagnosed).
const trace = (...args: unknown[]) => console.log("[curriculum]", new Date().toISOString().slice(11, 23), ...args);

const TeacherCurriculumPage: React.FC = () => {
  const navigate = useNavigate();
  const { uploadId: routeUploadId } = useParams<{ uploadId?: string }>();

  const [phase, setPhase] = useState<Phase>(routeUploadId ? "loading" : "idle");
  const [fileName, setFileName] = useState("");
  const [pages, setPages] = useState<PageText[]>([]);
  const [extractedText, setExtractedText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorKind, setErrorKind] = useState<ErrorKind>("generic");
  const [uploadId, setUploadId] = useState<string | null>(routeUploadId ?? null);
  const [dragging, setDragging] = useState(false);
  /** Set when the server answered 409: the file was extracted before. */
  const [reextractPrompt, setReextractPrompt] = useState<{ uploadId: string } | null>(null);
  /** Shown above the dropzone when an existing row needs its PDF chosen again (pending / failed, no pages). */
  const [notice, setNotice] = useState<string | null>(null);
  /** An interrupted stepped run (plan + pages stored): can continue without the PDF. */
  const [resumable, setResumable] = useState<{ done: number; groups: number } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  // Set right before this page rewrites its own URL (runExtraction / reset),
  // so the "open an existing upload" effect below ignores that navigation
  // instead of reloading the row and clobbering the in-flight phase.
  const selfNavigatedRef = useRef<string | null>(null);
  // TEMP: one id per component instance, so a remount is visible in the log.
  const instanceRef = useRef(Math.random().toString(36).slice(2, 7));

  // TEMP tracing: mount / unmount and every phase transition.
  useEffect(() => {
    const instance = instanceRef.current;
    trace("MOUNT instance", instance, "routeUploadId", routeUploadId);
    return () => trace("UNMOUNT instance", instance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    trace("phase ->", phase, "| instance", instanceRef.current, "| routeUploadId", routeUploadId, "| uploadId state", uploadId);
  }, [phase, routeUploadId, uploadId]);

  // --- Existing upload: /teacher/curriculum/:uploadId ---------------------
  useEffect(() => {
    trace("route effect fired | instance", instanceRef.current, "| routeUploadId", routeUploadId, "| selfNavigatedRef", selfNavigatedRef.current);
    if (!routeUploadId) return;
    if (selfNavigatedRef.current === routeUploadId) {
      trace("route effect SKIPPED (self navigation)");
      selfNavigatedRef.current = null;
      return;
    }
    trace("route effect NOT skipped -> loading row");
    let cancelled = false;
    setPhase("loading");
    (async () => {
      const { data } = await db
        .from("curriculum_uploads")
        .select("id, file_name, status, extraction_progress")
        .eq("id", routeUploadId)
        .neq("status", "deleted")
        .maybeSingle();
      trace("route effect row", data ? { id: data.id, status: data.status } : null, "| cancelled", cancelled);
      if (cancelled) return;
      if (!data?.id) {
        setErrorMsg("That upload could not be found. It may have been deleted, or it isn't yours.");
        setErrorKind("generic");
        setPhase("error");
        return;
      }
      setFileName(data.file_name ?? "");
      setUploadId(data.id);
      if (REVIEWABLE_STATUSES.has(data.status ?? "")) {
        trace("route effect -> review (status", data.status, ")");
        setPhase("review");
      } else {
        // 'pending' (the first request never finished) or 'extraction_failed':
        // the row has no pages. Not a dead end: show the dropzone with a
        // notice, keep the row id, and extract the chosen PDF INTO this row.
        trace("route effect -> idle with notice (status", data.status, "), row kept for re-use");
        // An interrupted stepped run still has its pages and plan on the row:
        // it can continue from the next group without the PDF.
        const prog = data.extraction_progress as { groups?: number; done?: number[]; failed?: unknown[] } | null;
        const settled = (prog?.done?.length ?? 0) + (prog?.failed?.length ?? 0);
        if (data.status === "pending" && prog && typeof prog.groups === "number" && prog.groups > 0 && settled < prog.groups) {
          setResumable({ done: settled, groups: prog.groups });
          setNotice(
            `Extraction of "${data.file_name ?? "this file"}" was interrupted after ${settled} of ${prog.groups} page groups. You can continue it from where it stopped, or choose the PDF again to start over.`,
          );
        } else {
          setResumable(null);
          setNotice(
            data.status === "extraction_failed"
              ? `The last extraction of "${data.file_name ?? "this file"}" failed. Choose the PDF again to retry; it will be extracted into this same upload.`
              : `"${data.file_name ?? "This upload"}" was never extracted. Choose the PDF again; it will be extracted into this same upload.`,
          );
        }
        setPages([]);
        setExtractedText("");
        setPhase("idle");
      }
    })();
    return () => {
      trace("route effect cleanup (routeUploadId changing away from", routeUploadId, ")");
      cancelled = true;
    };
  }, [routeUploadId]);

  const busy = phase === "parsing" || phase === "extracting";

  // --- PDF parsing --------------------------------------------------------
  const parsePdf = useCallback(async (file: File) => {
    setPhase("parsing");
    setErrorMsg("");
    setErrorKind("generic");
    setFileName(file.name);

    try {
      const buffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

      // One entry per PDF page: the v2 extractor stores a chunk per page so the
      // teacher can emphasize or trash by page (docs/curation-contract.md).
      const perPage: PageText[] = [];
      let thinPages = 0;
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const text = itemsToText(content.items.filter((it): it is typeof it & { str: string } => "str" in it) as { str: string; transform: number[]; height?: number; width?: number; hasEOL?: boolean }[]);
        const entry: PageText = { page: i, text, source: "pdf_text" };
        // Thin or garbled text (scan, slide deck, decorative page): send the
        // page as an image so the server can transcribe it.
        if (looksThin(text) && thinPages < 60) {
          const img = await renderPageImage(page as unknown as Parameters<typeof renderPageImage>[0]);
          if (img) {
            entry.imageBase64 = img;
            thinPages++;
          }
        }
        perPage.push(entry);
      }

      const fullText = perPage.map((p) => p.text).filter(Boolean).join("\n\n");
      const anyImages = perPage.some((p) => p.imageBase64);
      if (!fullText && !anyImages) {
        setErrorKind("no-text");
        throw new Error("No selectable text found in this PDF and the pages could not be rendered for transcription.");
      }

      setPages(perPage);
      setExtractedText(fullText);
      setPhase("ready");
    } catch (err) {
      console.error("PDF parse failed:", err);
      setErrorMsg(err instanceof Error ? err.message : "Failed to read the PDF file.");
      setPhase("error");
    }
  }, []);

  const handleFile = useCallback(
    (file: File | undefined | null) => {
      if (!file) return;
      if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
        setFileName(file.name);
        setErrorMsg("Please select a PDF file.");
        setErrorKind("generic");
        setPhase("error");
        return;
      }
      void parsePdf(file);
    },
    [parsePdf],
  );

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      if (busy) return;
      handleFile(e.dataTransfer.files?.[0]);
    },
    [busy, handleFile],
  );

  // --- Extract: create/reuse the upload row, call extract-curriculum-v2 ----
  const runExtraction = useCallback(
    async function runExtraction(opts: { reextract?: boolean; uploadId?: string; resume?: boolean } = {}): Promise<void> {
      trace("runExtraction START", opts, "| instance", instanceRef.current, "| routeUploadId", routeUploadId, "| uploadId state", uploadId, "| pages", pages.length);
      if (pages.length === 0 && !opts.resume) return;
      setNotice(null);
      setResumable(null);
      setErrorMsg("");
      setErrorKind("generic");
      setReextractPrompt(null);

      try {
        const { data: userData } = await supabase.auth.getUser();
        const user = userData?.user;
        if (!user) throw new Error("You must be signed in to upload curriculum.");

        // 1. Reuse the teacher's existing upload row for this file name (so a
        //    re-upload hits the server's 409 and the re-extract confirm), or
        //    create a new row so we have a real UUID for the function call.
        let id = opts.uploadId ?? uploadId ?? null;
        if (opts.resume && !id) throw new Error("Nothing to resume.");
        if (!id && !opts.resume) {
          const { data: existing } = await db
            .from("curriculum_uploads")
            .select("id")
            .eq("teacher_id", user.id)
            .eq("file_name", fileName || "upload.pdf")
            .neq("status", "deleted")
            .order("created_at", { ascending: false })
            .limit(1)
            .maybeSingle();
          id = existing?.id ?? null;
        }
        if (id && !opts.resume) {
          // Re-using a row (a dead 'pending' / failed row opened directly, or
          // the 409 path): keep its name and text in step with the chosen file.
          await db.from("curriculum_uploads").update({ file_name: fileName || "upload.pdf", extracted_text: extractedText }).eq("id", id);
        }
        if (!id) {
          const { data: upload, error: insertError } = await db
            .from("curriculum_uploads")
            .insert({
              teacher_id: user.id,
              file_name: fileName || "upload.pdf",
              extracted_text: extractedText,
              status: "pending",
            })
            .select("id")
            .single();
          if (insertError || !upload?.id) {
            throw new Error(insertError?.message ?? "Could not create the upload record.");
          }
          id = upload.id as string;
        }
        setUploadId(id);
        trace("runExtraction row id", id, "| will navigate?", routeUploadId !== id);
        // Put the id in the URL so a refresh lands on this upload. Same page,
        // no navigation: the component stays mounted (same route element), and
        // the route effect skips this change (selfNavigatedRef).
        if (routeUploadId !== id) {
          selfNavigatedRef.current = id;
          trace("runExtraction set selfNavigatedRef =", id, "then navigate");
          navigate(`/teacher/curriculum/${id}`, { replace: true });
        }
        setPhase("extracting");

        // 2. Run the stepped extractor: plan, one request per page group,
        //    finalize. The progress bar polls the upload row meanwhile.
        const { status, data } = await runSteppedExtraction({
          uploadId: id,
          ...(opts.resume ? { resume: true } : { pages }),
          ...(opts.reextract ? { reextract: true } : {}),
        });

        trace("runExtraction fetch response", { status, success: data?.success, chunksCount: data?.chunksCount, errors: data?.errors }, "| instance", instanceRef.current);
        if (status === 409) {
          // The row was extracted before. With stored pages there are marks
          // to lose: ask first. With no pages (a v1 row, or a failed first
          // attempt) there is nothing to lose: re-extract straight away.
          if ((data?.chunksCount ?? 0) === 0 && !opts.reextract) {
            trace("409 with zero chunks -> re-extract immediately");
            await runExtraction({ reextract: true, uploadId: id });
            return;
          }
          trace("409 -> opening re-extract dialog, phase ready");
          setReextractPrompt({ uploadId: id });
          setPhase("ready");
          return;
        }
        if (status === 422 || data?.insufficientSourceReason?.startsWith(NOT_ENOUGH_TEXT)) {
          setErrorKind("no-text");
          throw new Error(data?.insufficientSourceReason || data?.errors?.join(" • ") || `${NOT_ENOUGH_TEXT}.`);
        }
        if (!data?.success) {
          // Surface what the server actually said (errors[] and any
          // insufficient-source note), never a generic line.
          const detail = [data?.errors?.join(" • "), data?.insufficientSourceReason].filter(Boolean).join(" ");
          throw new Error(detail || functionError(status, data, "Extraction failed"));
        }

        // Same page becomes the review. No navigation.
        trace("runExtraction success -> phase review");
        setPhase("review");
      } catch (err) {
        trace("runExtraction CATCH -> ERROR card (this is the only remaining writer of the error card besides 'row not found')", err instanceof Error ? err.message : err);
        console.error("Extraction failed:", err);
        setErrorMsg(err instanceof Error ? err.message : "Something went wrong during extraction.");
        setPhase("error");
      }
    },
    [pages, extractedText, fileName, uploadId, routeUploadId, navigate],
  );

  // --- Reset --------------------------------------------------------------
  const reset = useCallback(() => {
    setPhase("idle");
    setFileName("");
    setPages([]);
    setExtractedText("");
    setErrorMsg("");
    setErrorKind("generic");
    setUploadId(null);
    setReextractPrompt(null);
    setNotice(null);
    setResumable(null);
    if (inputRef.current) inputRef.current.value = "";
    selfNavigatedRef.current = null;
    trace("reset -> idle, navigating to /teacher/curriculum");
    if (routeUploadId) navigate("/teacher/curriculum", { replace: true });
  }, [routeUploadId, navigate]);

  const previewText = extractedText.length > PREVIEW_LIMIT ? `${extractedText.slice(0, PREVIEW_LIMIT)}…` : extractedText;
  const wordCount = extractedText ? extractedText.split(/\s+/).length : 0;
  const showUploadCard = phase === "idle" || phase === "parsing" || phase === "ready" || (phase === "error" && !uploadId);

  // ------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 px-4 py-8 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 sm:px-6 lg:px-8">
      <div className={cn("mx-auto w-full space-y-6", phase === "review" ? "max-w-6xl" : "max-w-3xl")}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => navigate(DASHBOARD_ROUTE)}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <ArrowLeft className="h-4 w-4" /> Back to dashboard
          </button>
          {phase === "review" && (
            <Button variant="outline" size="sm" onClick={reset} className="border-emerald-300 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-950/50">
              <UploadCloud className="mr-1.5 h-3.5 w-3.5" /> Upload another
            </Button>
          )}
        </div>

        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20">
            <UploadCloud className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            {phase === "review" ? fileName || "Curriculum review" : "Upload Curriculum"}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {phase === "review"
              ? "Mark what matters, write or approve questions, then build, preview and assign Jeff's lesson."
              : "Upload a PDF and we'll extract concepts, vocabulary, and learning objectives from your material, page by page."}
          </p>
        </div>

        {phase === "loading" && (
          <div className="flex items-center justify-center gap-2 py-10 text-sm text-slate-500 dark:text-slate-400">
            <Loader2 className="h-5 w-5 animate-spin text-emerald-600" /> Opening this upload…
          </div>
        )}

        {showUploadCard && (
          <Card className="border-emerald-100 shadow-sm dark:border-emerald-900">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900 dark:text-slate-100">1. Choose a PDF</CardTitle>
              <CardDescription>Drag &amp; drop a file, or click to browse. Text is extracted in your browser.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {notice && (
                <div className="flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-100">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <p>{notice}</p>
                    <div className="flex flex-wrap items-center gap-3">
                      {resumable && uploadId && (
                        <Button size="sm" onClick={() => void runExtraction({ resume: true, uploadId })} className="bg-emerald-600 text-white hover:bg-emerald-700">
                          <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Continue extraction ({resumable.done} of {resumable.groups} groups done)
                        </Button>
                      )}
                      <button type="button" onClick={reset} className="font-medium underline underline-offset-2 hover:text-amber-700">
                        Or start a brand-new upload instead
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div
                role="button"
                tabIndex={0}
                onClick={() => !busy && inputRef.current?.click()}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && !busy) {
                    e.preventDefault();
                    inputRef.current?.click();
                  }
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (!busy) setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                className={cn(
                  "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors",
                  dragging
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40"
                    : "border-slate-200 bg-slate-50 hover:border-emerald-400 hover:bg-emerald-50/60 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-emerald-950/30",
                  busy && "pointer-events-none opacity-60",
                )}
              >
                <input ref={inputRef} type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
                {phase === "parsing" ? <Loader2 className="h-8 w-8 animate-spin text-emerald-600" /> : <UploadCloud className="h-8 w-8 text-emerald-500" />}
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{phase === "parsing" ? "Reading PDF…" : "Drop your PDF here or click to browse"}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">PDF up to ~20 MB · text-based (not a scan)</p>
                </div>
              </div>

              {fileName && phase !== "idle" && pages.length > 0 && (
                <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
                  <div className="flex min-w-0 items-center gap-2">
                    <FileText className="h-4 w-4 shrink-0 text-emerald-600" />
                    <span className="truncate text-sm text-slate-700 dark:text-slate-200">{fileName}</span>
                    {pages.length > 0 && (
                      <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500">
                        {pages.length} page{pages.length === 1 ? "" : "s"} · {wordCount.toLocaleString()} words
                      </span>
                    )}
                  </div>
                  {!busy && (
                    <button
                      type="button"
                      onClick={reset}
                      className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                      aria-label="Remove file"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              )}

              {phase === "ready" && extractedText && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="preview" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      Extracted text preview
                    </label>
                    <span className="text-xs text-slate-400 dark:text-slate-500">{extractedText.length.toLocaleString()} chars</span>
                  </div>
                  <textarea
                    id="preview"
                    readOnly
                    value={previewText}
                    rows={5}
                    className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {phase === "ready" && (
          <Button
            onClick={() => void runExtraction()}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700"
            size="lg"
          >
            Extract concepts
          </Button>
        )}

        {/* Real progress: stages written by the server, polled here. */}
        {phase === "extracting" && uploadId && <ExtractionProgress uploadId={uploadId} fileName={fileName} pageCount={pages.length} />}

        {/* Review: same page, tabs, generate, approve, assign */}
        {phase === "review" && uploadId && <CurationReview uploadId={uploadId} fileName={fileName} />}

        {/* Error */}
        {phase === "error" && (
          <Card className="border-red-200 bg-red-50/60 shadow-sm dark:border-red-900 dark:bg-red-950/30">
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-start gap-3">
                {errorKind === "no-text" ? <ScanLine className="mt-0.5 h-5 w-5 shrink-0 text-red-600" /> : <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />}
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-red-800 dark:text-red-200">{errorKind === "no-text" ? "Not enough readable text" : "Something went wrong"}</p>
                  <p className="text-sm text-red-700 dark:text-red-300">{errorMsg || "Unexpected error."}</p>
                  {errorKind === "no-text" && (
                    <p className="text-xs text-red-700/90 dark:text-red-300/90">
                      This usually means the PDF is a scan (pictures of pages). Export or print the document to a text-based PDF from Word, Google Docs,
                      or your textbook site and upload that instead.
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {pages.length > 0 && errorKind !== "no-text" && (
                  <Button onClick={() => void runExtraction()} className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700">
                    <RefreshCw className="mr-2 h-4 w-4" /> Retry
                  </Button>
                )}
                <Button variant="outline" onClick={reset} className="flex-1 border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                  Start over
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* 409: the file was extracted before */}
      <AlertDialog open={!!reextractPrompt} onOpenChange={(open) => !open && setReextractPrompt(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Re-extract this file?</AlertDialogTitle>
            <AlertDialogDescription>
              <span className="font-medium">{fileName}</span> was already extracted. Re-extracting replaces the previous concepts, vocabulary, objectives
              and page text, and clears every Emphasize and Trash mark on the old extraction. If you split this upload into several lessons, the
              split is reset to one lesson (page boundaries may change). Questions you approved or wrote yourself are kept.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                // Open the review of what is already there instead of dead-ending.
                if (reextractPrompt) {
                  setUploadId(reextractPrompt.uploadId);
                  setPhase("review");
                }
              }}
            >
              Keep the existing extraction
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => reextractPrompt && void runExtraction({ reextract: true, uploadId: reextractPrompt.uploadId })}
              className="bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Re-extract
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TeacherCurriculumPage;
