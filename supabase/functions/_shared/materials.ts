// Shared helpers for the teacher-materials edge functions
// (generate-deck, generate-activity).
//
// Both take a lesson selection from the client. Built-in lessons arrive with
// their teaching text already serialized; generated lessons (UUID ids) arrive
// as id + title only and are read here from public.lessons under the CALLER's
// RLS, so a teacher can only ground on lessons they actually have access to.
//
// Runtime: Deno (Supabase Edge Functions).

import type { SupabaseClient } from "npm:@supabase/supabase-js@2";
import Anthropic from "npm:@anthropic-ai/sdk@0.70.0";

export const MODEL = "claude-sonnet-4-6";

export const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export function respond(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}
export const fail = (errors: string[], status: number) => respond({ success: false, errors }, status);

export function firstTextBlock(m: Anthropic.Message): string {
  for (const b of m.content) if (b.type === "text") return b.text;
  return "";
}

export const stripFences = (s: string): string =>
  s.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

export const clampInt = (n: unknown, lo: number, hi: number, dflt: number): number => {
  const v = Math.round(Number(n));
  return Number.isFinite(v) ? Math.max(lo, Math.min(hi, v)) : dflt;
};

// deno-lint-ignore no-explicit-any
type Rec = Record<string, any>;
const str = (v: unknown): string => (typeof v === "string" ? v : "");
const strArr = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x) => typeof x === "string") : []);

function serializeQuestion(q: Rec, n: number): string {
  const opts = strArr(q.options).map((o, i) => `${String.fromCharCode(65 + i)}) ${o}`).join("  ");
  // Stored questions use `correctAnswer`; fall back to `correctIndex` just in case.
  const ci = Number(q.correctAnswer ?? q.correctIndex);
  const correct = Number.isFinite(ci) ? String.fromCharCode(65 + ci) : "?";
  const why = str(q.explanation) ? ` Explanation: ${str(q.explanation)}` : "";
  return `Q${n}: ${str(q.question)}\n  Options: ${opts}\n  Correct: ${correct}.${why}`;
}

/**
 * Flatten a lesson's structured `sections` (built-in AND generated lessons use
 * the same section shape) into plain grounding text. Mirrors the client
 * serializer in src/lib/materials/lessonSource.ts.
 */
export function serializeSections(sections: unknown): string {
  if (!Array.isArray(sections)) return "";
  const parts: string[] = [];
  let qn = 0;
  for (const raw of sections) {
    if (!raw || typeof raw !== "object") continue;
    const s = raw as Rec;
    switch (s.type) {
      case "concept": {
        if (str(s.title)) parts.push(`## ${str(s.title)}`);
        if (strArr(s.paragraphs).length) parts.push(strArr(s.paragraphs).join("\n"));
        if (strArr(s.bullets).length) parts.push(strArr(s.bullets).map((b) => `- ${b}`).join("\n"));
        if (str(s.realWorldExample)) parts.push(`Real-world example: ${str(s.realWorldExample)}`);
        break;
      }
      case "scenario": {
        parts.push(`## Scenario: ${str(s.title)}`);
        if (str(s.narrative)) parts.push(str(s.narrative));
        if (strArr(s.details).length) parts.push(strArr(s.details).map((d) => `- ${d}`).join("\n"));
        break;
      }
      case "applied-question":
        if (s.question) parts.push(`## Applied question\n${serializeQuestion(s.question, ++qn)}`);
        break;
      case "micro-check":
      case "mastery-check": {
        const qs = Array.isArray(s.questions) ? s.questions : [];
        if (qs.length) parts.push(`## Check\n${qs.map((q: Rec) => serializeQuestion(q, ++qn)).join("\n")}`);
        break;
      }
      case "recap":
        if (strArr(s.takeaways).length) parts.push(`## Key takeaways\n${strArr(s.takeaways).map((t) => `- ${t}`).join("\n")}`);
        break;
      default:
        break;
    }
  }
  return parts.join("\n\n").trim();
}

export interface LessonInput {
  id: string;
  title?: string;
  unitTitle?: string;
  source?: "builtin" | "generated";
  text?: string;
}

export interface ResolvedLesson {
  id: string;
  title: string;
  unitTitle?: string;
  text: string;
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Resolve every selected lesson to grounding text. Built-in lessons already
 * carry `text`. Generated (UUID) lessons are fetched from public.lessons via
 * the caller-scoped client (RLS enforced) and their sections serialized.
 * Lessons that resolve to no usable text are dropped.
 */
export async function resolveLessons(
  caller: SupabaseClient,
  input: LessonInput[],
): Promise<ResolvedLesson[]> {
  const genIds = input
    .filter((l) => l.source === "generated" || UUID_RE.test(l.id))
    .map((l) => l.id);

  const genById = new Map<string, { name: string; sections: unknown }>();
  if (genIds.length) {
    const { data } = await caller
      .from("lessons")
      .select("id, name, content")
      .in("id", genIds);
    for (const row of (data ?? []) as Rec[]) {
      genById.set(String(row.id), { name: str(row.name), sections: row.content?.sections });
    }
  }

  const out: ResolvedLesson[] = [];
  for (const l of input) {
    const isGen = l.source === "generated" || UUID_RE.test(l.id);
    if (isGen) {
      const g = genById.get(l.id);
      if (!g) continue; // no access / not found -> skip
      const text = serializeSections(g.sections);
      if (!text) continue;
      out.push({ id: l.id, title: l.title || g.name || "Lesson", text });
    } else {
      const text = str(l.text).trim();
      if (!text) continue;
      out.push({ id: l.id, title: l.title || "Lesson", unitTitle: l.unitTitle, text });
    }
  }
  return out;
}

/** Build the source block handed to the model, clearly per-lesson. */
export function buildSourceBlock(lessons: ResolvedLesson[]): string {
  return lessons
    .map((l, i) => {
      const unit = l.unitTitle ? ` (unit: ${l.unitTitle})` : "";
      return `=== LESSON ${i + 1}: ${l.title}${unit} ===\n${l.text}`;
    })
    .join("\n\n");
}

export { Anthropic };
