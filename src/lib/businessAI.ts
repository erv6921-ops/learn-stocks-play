// businessAI - client wrapper around the `business-ai` edge function (Anthropic,
// claude-sonnet-4-6, max_tokens 1000). Used by the AI-powered Micro-Business
// features: weekly report insight, business-plan scoring, complaint grading,
// supplier negotiation, and the AI interview candidate.
import { supabase } from "@/integrations/supabase/client";

export async function businessAI(system: string, prompt: string, maxTokens = 1000): Promise<string> {
  const { data, error } = await supabase.functions.invoke("business-ai", {
    body: { system, prompt, max_tokens: Math.min(1000, maxTokens) },
  });
  if (error) throw new Error(error.message || "AI request failed");
  if (data?.error) throw new Error(data.error);
  return (data?.text as string) || "";
}

// Best-effort JSON extraction - models sometimes wrap JSON in prose or fences.
export function parseAIJson<T>(text: string, fallback: T): T {
  if (!text) return fallback;
  try {
    const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    const candidate = fenced ? fenced[1] : text;
    const m = candidate.match(/\{[\s\S]*\}/);
    return m ? (JSON.parse(m[0]) as T) : fallback;
  } catch {
    return fallback;
  }
}
