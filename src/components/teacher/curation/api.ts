// Shared types + helpers for the teacher curation flow. Mirrors
// docs/curation-contract.md; keep the two in sync.

import { supabase } from "@/integrations/supabase/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db = supabase as any;

export const FN_BASE = `${
  import.meta.env.VITE_SUPABASE_URL ?? "https://vcjdshippmqopaffuzbw.supabase.co"
}/functions/v1`;

export type TeacherStatus = "active" | "emphasized" | "trashed";
export type GroundingStatus = "verified" | "failed" | "unverified";

/** The four curatable tables (contract section 2). */
export type CurationTable = "concepts" | "vocabulary" | "learning_objectives" | "curriculum_source_chunks";

export interface CurationRow {
  id: string;
  teacher_status: TeacherStatus;
  grounding_status?: GroundingStatus | null;
  source_chunk_ids?: string[] | null;
}

export interface ConceptRow extends CurationRow {
  name: string;
  definition: string;
}

export interface VocabRow extends CurationRow {
  term: string;
  definition: string;
}

export interface ObjectiveRow extends CurationRow {
  objective: string;
}

export interface ChunkRow extends CurationRow {
  chunk_index: number;
  page_start: number | null;
  page_end: number | null;
  content: string;
}

export interface CoverageEntry {
  item_type: "concept" | "vocabulary" | "objective" | "chunk";
  item_id: string;
  label: string;
  teacher_status: TeacherStatus;
  questions_generated: number;
  target: number;
  note: string;
}

export interface UploadRow {
  id: string;
  file_name: string;
  status: string | null;
  coverage_report: CoverageEntry[] | null;
  insufficient_source_reason: string | null;
  /** Joined text from the original (v1) upload; used to re-verify legacy uploads. */
  extracted_text?: string | null;
}

export interface LessonRow {
  id: string;
  name: string;
  teacher_approved_at?: string | null;
  content?: { sections?: unknown[] } | null;
}

export interface ExtractResponse {
  success: boolean;
  conceptsCount?: number;
  vocabularyCount?: number;
  objectivesCount?: number;
  chunksCount?: number;
  verifiedCount?: number;
  failedCount?: number;
  insufficientSourceReason?: string;
  errors?: string[];
}

export interface GenerateResponse {
  success: boolean;
  questionsGenerated: number;
  verifiedCount?: number;
  failedCount?: number;
  keptApproved?: number;
  coverage?: CoverageEntry[];
  insufficientSourceReason?: string;
  errors?: string[];
}

export interface SynthesizeResponse {
  success: boolean;
  sectionsCount?: number;
  masteryCount?: number;
  requiredCorrect?: number;
  verifiedCount?: number;
  failedCount?: number;
  coverage?: CoverageEntry[];
  insufficientSourceReason?: string;
  errors?: string[];
}

export const NOT_ENOUGH_TEXT = "Not enough readable text";

/**
 * Calls a v2 edge function with the signed-in user's JWT and returns the HTTP
 * status alongside the parsed body, so callers can branch on 409 / 422.
 */
export async function callFunction<T>(
  name: string,
  body: Record<string, unknown>,
): Promise<{ status: number; data: T | null }> {
  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData?.session?.access_token;
  if (!token) throw new Error("You must be signed in.");
  const res = await fetch(`${FN_BASE}/${name}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  let data: T | null = null;
  try {
    data = (await res.json()) as T;
  } catch {
    data = null;
  }
  return { status: res.status, data };
}

/** Human-readable error from a function response. */
export function functionError(status: number, data: { errors?: string[] } | null, fallback: string): string {
  return data?.errors?.join(" • ") || `${fallback} (HTTP ${status}).`;
}

/** "p. 3" / "pp. 3-4" for a chunk. */
export function chunkPageLabel(c: Pick<ChunkRow, "page_start" | "page_end" | "chunk_index">): string {
  if (c.page_start != null && c.page_end != null && c.page_end !== c.page_start) return `pp. ${c.page_start}-${c.page_end}`;
  if (c.page_start != null) return `p. ${c.page_start}`;
  return `part ${c.chunk_index + 1}`;
}

/** Page reference for an item, from its cited chunks. */
export function pageRefFor(sourceChunkIds: string[] | null | undefined, chunks: ChunkRow[]): string | null {
  if (!sourceChunkIds?.length) return null;
  const labels: string[] = [];
  for (const id of sourceChunkIds) {
    const c = chunks.find((x) => x.id === id);
    if (c && c.page_start != null) labels.push(chunkPageLabel(c));
  }
  return labels.length ? [...new Set(labels)].join(", ") : null;
}

export function countWords(text: string): number {
  const t = text.trim();
  return t ? t.split(/\s+/).length : 0;
}
