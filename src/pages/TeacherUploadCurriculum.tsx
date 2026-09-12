import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
// Vite-friendly worker resolution (pdfjs-dist v6). The `?url` suffix returns
// the hashed asset URL that Vite emits for the worker bundle.
import PdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Loader2,
  UploadCloud,
  FileText,
  AlertCircle,
  RefreshCw,
  ScanLine,
  X,
} from "lucide-react";
import { CurationReview } from "@/components/teacher/curation/CurationReview";
import { callFunction, functionError, NOT_ENOUGH_TEXT, type ExtractResponse } from "@/components/teacher/curation/api";

pdfjsLib.GlobalWorkerOptions.workerSrc = PdfWorkerUrl;

// ---------------------------------------------------------------------------
// Config & types
// ---------------------------------------------------------------------------

const PREVIEW_LIMIT = 500;

type Phase =
  | "idle" // no file selected
  | "parsing" // reading text out of the PDF
  | "ready" // text extracted, awaiting upload
  | "uploading" // POSTing to the edge function
  | "review" // extracted; teacher curates + generates (CurationReview)
  | "error";

type ErrorKind = "generic" | "no-text";

interface PageText {
  page: number;
  text: string;
}

// The generated Supabase `Database` type does not yet include the curriculum
// tables (run `supabase gen types typescript` to regenerate). Until then, use a
// loosely-typed accessor for these tables so the build stays green.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface TeacherUploadCurriculumProps {
  /** Render without the full-screen page chrome (for embedding in a tab). */
  embedded?: boolean;
  /** Called after a successful extraction (e.g. to refresh an upload list). */
  onExtracted?: () => void;
}

const TeacherUploadCurriculum: React.FC<TeacherUploadCurriculumProps> = ({
  embedded = false,
  onExtracted,
}) => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [fileName, setFileName] = useState<string>("");
  const [pages, setPages] = useState<PageText[]>([]);
  const [extractedText, setExtractedText] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [errorKind, setErrorKind] = useState<ErrorKind>("generic");
  const [uploadId, setUploadId] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  /** Set when the server answered 409: the file was extracted before. */
  const [reextractPrompt, setReextractPrompt] = useState<{ uploadId: string } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams] = useSearchParams();

  // Deep link: /teacher/upload?curateUploadId=<id> opens the review of an
  // existing extraction (used by the assign page when no lesson is built yet).
  const curateUploadId = searchParams.get("curateUploadId");
  useEffect(() => {
    if (!curateUploadId) return;
    let cancelled = false;
    (async () => {
      const { data } = await db
        .from("curriculum_uploads")
        .select("id, file_name")
        .eq("id", curateUploadId)
        .neq("status", "deleted")
        .maybeSingle();
      if (cancelled) return;
      if (data?.id) {
        setFileName(data.file_name ?? "");
        setUploadId(data.id);
        setPhase("review");
      } else {
        setErrorMsg("That upload could not be found. It may have been deleted, or it isn't yours.");
        setErrorKind("generic");
        setPhase("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [curateUploadId]);

  const busy = phase === "parsing" || phase === "uploading";

  // --- PDF parsing --------------------------------------------------------
  const parsePdf = useCallback(async (file: File) => {
    setPhase("parsing");
    setErrorMsg("");
    setErrorKind("generic");
    setUploadId(null);
    setFileName(file.name);

    try {
      const buffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

      // One entry per PDF page: the v2 extractor stores a chunk per page so the
      // teacher can emphasize or trash by page (docs/curation-contract.md).
      const perPage: PageText[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const text = content.items
          .map((item) => ("str" in item ? item.str : ""))
          .join(" ")
          .replace(/[ \t]+/g, " ")
          .trim();
        perPage.push({ page: i, text });
      }

      const fullText = perPage.map((p) => p.text).filter(Boolean).join("\n\n");

      if (!fullText) {
        setErrorKind("no-text");
        throw new Error(
          "No selectable text found in this PDF. It may be a scanned image — OCR is not supported.",
        );
      }

      setPages(perPage);
      setExtractedText(fullText);
      setPhase("ready");
    } catch (err) {
      console.error("PDF parse failed:", err);
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to read the PDF file.",
      );
      setPhase("error");
    }
  }, []);

  // --- File selection handlers -------------------------------------------
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

  // --- Upload -> extract-curriculum-v2 ------------------------------------
  const runExtraction = useCallback(
    async (opts: { reextract?: boolean; uploadId?: string } = {}) => {
      if (pages.length === 0) return;
      setPhase("uploading");
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
        let id = opts.uploadId ?? null;
        if (!id) {
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

        // 2. Call the v2 extractor with page-level text.
        const { status, data } = await callFunction<ExtractResponse>("extract-curriculum-v2", {
          uploadId: id,
          pages,
          ...(opts.reextract ? { reextract: true } : {}),
        });

        if (status === 409) {
          // Already extracted: ask before wiping the previous marks.
          setReextractPrompt({ uploadId: id });
          setPhase("ready");
          return;
        }
        if (status === 422 || data?.insufficientSourceReason?.startsWith(NOT_ENOUGH_TEXT)) {
          setErrorKind("no-text");
          throw new Error(data?.insufficientSourceReason || data?.errors?.join(" • ") || `${NOT_ENOUGH_TEXT}.`);
        }
        if (!data?.success) {
          throw new Error(functionError(status, data, "Extraction failed"));
        }

        setUploadId(id);
        setPhase("review");
        onExtracted?.();
      } catch (err) {
        console.error("Extraction failed:", err);
        setErrorMsg(
          err instanceof Error ? err.message : "Something went wrong during extraction.",
        );
        setPhase("error");
      }
    },
    [pages, extractedText, fileName, onExtracted],
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
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const previewText =
    extractedText.length > PREVIEW_LIMIT
      ? `${extractedText.slice(0, PREVIEW_LIMIT)}…`
      : extractedText;

  const wordCount = extractedText ? extractedText.split(/\s+/).length : 0;

  // ------------------------------------------------------------------------
  return (
    <div
      className={
        embedded
          ? "w-full"
          : "min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 px-4 py-10 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 sm:px-6 lg:px-8"
      }
    >
      <div className={embedded ? "w-full space-y-6" : "mx-auto w-full max-w-3xl space-y-6"}>
        {/* Header (hidden when embedded — the host page provides its own) */}
        {!embedded && (
          <div className="space-y-2 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20">
              <UploadCloud className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
              Upload Curriculum
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Upload a PDF and we&apos;ll extract concepts, vocabulary, and learning
              objectives from your material, page by page.
            </p>
          </div>
        )}

        <Card className="border-emerald-100 shadow-sm dark:border-emerald-900">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900 dark:text-slate-100">
              1. Choose a PDF
            </CardTitle>
            <CardDescription>
              Drag &amp; drop a file, or click to browse. Text is extracted in your
              browser.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Dropzone */}
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
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf,.pdf"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
              {phase === "parsing" ? (
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
              ) : (
                <UploadCloud className="h-8 w-8 text-emerald-500" />
              )}
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {phase === "parsing"
                    ? "Reading PDF…"
                    : "Drop your PDF here or click to browse"}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">PDF up to ~20 MB · text-based (not a scan)</p>
              </div>
            </div>

            {/* Selected file chip */}
            {fileName && phase !== "idle" && (
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
                <div className="flex min-w-0 items-center gap-2">
                  <FileText className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span className="truncate text-sm text-slate-700 dark:text-slate-200">
                    {fileName}
                  </span>
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

            {/* Extracted text preview (before extraction; the review shows every page after) */}
            {(phase === "ready" || phase === "uploading") && extractedText && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="preview"
                    className="text-sm font-medium text-slate-700 dark:text-slate-200"
                  >
                    Extracted text preview
                  </label>
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {extractedText.length.toLocaleString()} chars
                  </span>
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

        {/* Upload action */}
        {(phase === "ready" || phase === "uploading") && (
          <Button
            onClick={() => void runExtraction()}
            disabled={phase === "uploading"}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700"
            size="lg"
          >
            {phase === "uploading" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Extracting and verifying against your pages…
              </>
            ) : (
              "Extract concepts"
            )}
          </Button>
        )}

        {/* Review: everything extracted, Emphasize / Trash, generate, approve */}
        {phase === "review" && uploadId && (
          <>
            <CurationReview uploadId={uploadId} fileName={fileName} />
            <Button
              variant="outline"
              onClick={reset}
              className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-950/50"
            >
              Upload another
            </Button>
          </>
        )}

        {/* Error */}
        {phase === "error" && (
          <Card className="border-red-200 bg-red-50/60 shadow-sm dark:border-red-900 dark:bg-red-950/30">
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-start gap-3">
                {errorKind === "no-text" ? (
                  <ScanLine className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                ) : (
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                )}
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-red-800 dark:text-red-200">
                    {errorKind === "no-text" ? "Not enough readable text" : "Something went wrong"}
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    {errorMsg || "Unexpected error."}
                  </p>
                  {errorKind === "no-text" && (
                    <p className="text-xs text-red-700/90 dark:text-red-300/90">
                      This usually means the PDF is a scan (pictures of pages). Export or print the
                      document to a text-based PDF from Word, Google Docs, or your textbook site and
                      upload that instead.
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {pages.length > 0 && errorKind !== "no-text" && (
                  <Button
                    onClick={() => void runExtraction()}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Retry
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={reset}
                  className="flex-1 border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
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
              <span className="font-medium">{fileName}</span> was already extracted. Re-extracting replaces
              the previous concepts, vocabulary, objectives and page text, and clears any Emphasize or
              Trash marks you made on them. Questions you already approved are kept.
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

export default TeacherUploadCurriculum;
