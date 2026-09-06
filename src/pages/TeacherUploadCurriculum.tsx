import React, { useCallback, useRef, useState } from "react";
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
import { cn } from "@/lib/utils";
import {
  Loader2,
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  X,
} from "lucide-react";

pdfjsLib.GlobalWorkerOptions.workerSrc = PdfWorkerUrl;

// ---------------------------------------------------------------------------
// Config & types
// ---------------------------------------------------------------------------

const EXTRACT_FN_URL = `${
  import.meta.env.VITE_SUPABASE_URL ?? "https://vcjdshippmqopaffuzbw.supabase.co"
}/functions/v1/extract-curriculum`;

const PREVIEW_LIMIT = 500;

type Phase =
  | "idle" // no file selected
  | "parsing" // reading text out of the PDF
  | "ready" // text extracted, awaiting upload
  | "uploading" // POSTing to the edge function
  | "success"
  | "error";

interface ExtractResponse {
  success: boolean;
  conceptsCount: number;
  vocabularyCount: number;
  objectivesCount: number;
  errors?: string[];
}

// The generated Supabase `Database` type does not yet include the curriculum
// tables (run `supabase gen types typescript` to regenerate). Until then, use a
// loosely-typed accessor for these two tables so the build stays green.
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
  const [extractedText, setExtractedText] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [result, setResult] = useState<ExtractResponse | null>(null);
  const [topConcepts, setTopConcepts] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const busy = phase === "parsing" || phase === "uploading";

  // --- PDF parsing --------------------------------------------------------
  const parsePdf = useCallback(async (file: File) => {
    setPhase("parsing");
    setErrorMsg("");
    setResult(null);
    setTopConcepts([]);
    setFileName(file.name);

    try {
      const buffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

      const pages: string[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const text = content.items
          .map((item) => ("str" in item ? item.str : ""))
          .join(" ");
        pages.push(text);
      }

      const fullText = pages.join("\n\n").replace(/[ \t]+/g, " ").trim();

      if (!fullText) {
        throw new Error(
          "No selectable text found in this PDF. It may be a scanned image — OCR is not supported.",
        );
      }

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

  // --- Upload -> edge function -------------------------------------------
  const runExtraction = useCallback(async () => {
    if (!extractedText) return;
    setPhase("uploading");
    setErrorMsg("");

    try {
      // 1. Identify the teacher and get a JWT for the function call.
      const [{ data: userData }, { data: sessionData }] = await Promise.all([
        supabase.auth.getUser(),
        supabase.auth.getSession(),
      ]);
      const user = userData?.user;
      const accessToken = sessionData?.session?.access_token;
      if (!user || !accessToken) {
        throw new Error("You must be signed in to upload curriculum.");
      }

      // 2. Create the curriculum_uploads row so we have a real UUID to pass
      //    as uploadId (the edge function inserts concepts with this FK).
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
        throw new Error(
          insertError?.message ?? "Could not create the upload record.",
        );
      }
      const uploadId: string = upload.id;

      // 3. Call the edge function with the user's JWT.
      const res = await fetch(EXTRACT_FN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ uploadId, extractedText }),
      });

      const payload = (await res.json()) as ExtractResponse;

      if (!res.ok || !payload.success) {
        throw new Error(
          payload.errors?.join(" • ") ||
            `Extraction failed (HTTP ${res.status}).`,
        );
      }

      // 4. Fetch the top concept names for display (the function returns
      //    counts only). Readable via the concepts SELECT RLS policy.
      const { data: conceptRows } = await db
        .from("concepts")
        .select("name")
        .eq("upload_id", uploadId)
        .order("created_at", { ascending: true })
        .limit(5);

      setTopConcepts(
        (conceptRows ?? [])
          .map((r: { name: string }) => r.name)
          .filter(Boolean),
      );
      setResult(payload);
      setPhase("success");
      onExtracted?.();
    } catch (err) {
      console.error("Extraction failed:", err);
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong during extraction.",
      );
      setPhase("error");
    }
  }, [extractedText, fileName]);

  // --- Reset --------------------------------------------------------------
  const reset = useCallback(() => {
    setPhase("idle");
    setFileName("");
    setExtractedText("");
    setErrorMsg("");
    setResult(null);
    setTopConcepts([]);
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const previewText =
    extractedText.length > PREVIEW_LIMIT
      ? `${extractedText.slice(0, PREVIEW_LIMIT)}…`
      : extractedText;

  // ------------------------------------------------------------------------
  return (
    <div
      className={
        embedded
          ? "w-full"
          : "min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 px-4 py-10 sm:px-6 lg:px-8"
      }
    >
      <div className={embedded ? "w-full space-y-6" : "mx-auto w-full max-w-2xl space-y-6"}>
        {/* Header (hidden when embedded — the host page provides its own) */}
        {!embedded && (
          <div className="space-y-2 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20">
              <UploadCloud className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Upload Curriculum
            </h1>
            <p className="text-sm text-slate-500">
              Upload a PDF and we&apos;ll extract concepts, vocabulary, and learning
              objectives automatically.
            </p>
          </div>
        )}

        <Card className="border-emerald-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">
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
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-slate-200 bg-slate-50 hover:border-emerald-400 hover:bg-emerald-50/60",
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
                <p className="text-sm font-medium text-slate-700">
                  {phase === "parsing"
                    ? "Reading PDF…"
                    : "Drop your PDF here or click to browse"}
                </p>
                <p className="text-xs text-slate-400">PDF up to ~20 MB</p>
              </div>
            </div>

            {/* Selected file chip */}
            {fileName && phase !== "idle" && (
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2">
                <div className="flex min-w-0 items-center gap-2">
                  <FileText className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span className="truncate text-sm text-slate-700">
                    {fileName}
                  </span>
                </div>
                {!busy && (
                  <button
                    type="button"
                    onClick={reset}
                    className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                    aria-label="Remove file"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}

            {/* Extracted text preview */}
            {(phase === "ready" ||
              phase === "uploading" ||
              phase === "success") &&
              extractedText && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="preview"
                      className="text-sm font-medium text-slate-700"
                    >
                      Extracted text preview
                    </label>
                    <span className="text-xs text-slate-400">
                      {extractedText.length.toLocaleString()} chars
                    </span>
                  </div>
                  <textarea
                    id="preview"
                    readOnly
                    value={previewText}
                    rows={5}
                    className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600 focus:outline-none"
                  />
                </div>
              )}
          </CardContent>
        </Card>

        {/* Upload action */}
        {(phase === "ready" || phase === "uploading") && (
          <Button
            onClick={runExtraction}
            disabled={phase === "uploading"}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700"
            size="lg"
          >
            {phase === "uploading" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Extracting concepts…
              </>
            ) : (
              "Extract concepts"
            )}
          </Button>
        )}

        {/* Success */}
        {phase === "success" && result && (
          <Card className="border-emerald-200 bg-emerald-50/60 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-emerald-800">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                Extraction successful
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <StatTile label="Concepts" value={result.conceptsCount} />
                <StatTile label="Vocabulary" value={result.vocabularyCount} />
                <StatTile label="Objectives" value={result.objectivesCount} />
              </div>

              {topConcepts.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-700">
                    Top concepts
                  </p>
                  <ul className="space-y-1">
                    {topConcepts.map((name, i) => (
                      <li
                        key={`${name}-${i}`}
                        className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm text-slate-700"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700">
                          {i + 1}
                        </span>
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button
                variant="outline"
                onClick={reset}
                className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-100"
              >
                Upload another
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Error */}
        {phase === "error" && (
          <Card className="border-red-200 bg-red-50/60 shadow-sm">
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-red-800">
                    Something went wrong
                  </p>
                  <p className="text-sm text-red-700">
                    {errorMsg || "Unexpected error."}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {extractedText && (
                  <Button
                    onClick={runExtraction}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Retry
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={reset}
                  className="flex-1 border-slate-300 text-slate-600 hover:bg-slate-100"
                >
                  Start over
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Small presentational helper
// ---------------------------------------------------------------------------

const StatTile: React.FC<{ label: string; value: number }> = ({
  label,
  value,
}) => (
  <div className="rounded-xl border border-emerald-100 bg-white p-3 text-center">
    <div className="text-2xl font-bold text-emerald-700">{value}</div>
    <div className="text-xs font-medium text-slate-500">{label}</div>
  </div>
);

export default TeacherUploadCurriculum;
