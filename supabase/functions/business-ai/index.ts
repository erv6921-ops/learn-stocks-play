// business-ai — proxies Micro-Business AI features to the Anthropic API.
// Used by: weekly report insight, business-plan scoring, complaint responses,
// supplier negotiation, and the job-interview candidate (features 5,6,7,8,10).
// Requires the ANTHROPIC_API_KEY secret:  supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MAX_SYSTEM = 6000;
const MAX_PROMPT = 8000;

function clampStr(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.slice(0, max);
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
    if (!ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY is not configured");

    const body = await req.json();
    const system = clampStr(body.system, MAX_SYSTEM);
    const prompt = clampStr(body.prompt, MAX_PROMPT);
    // max_tokens capped at 1000 per the feature spec.
    const maxTokens = Math.min(1000, Math.max(64, Number(body.max_tokens) || 1000));
    if (!prompt) {
      return new Response(JSON.stringify({ error: "prompt is required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: maxTokens,
        // Fast, cheap structured-output calls — no extended thinking needed.
        thinking: { type: "disabled" },
        output_config: { effort: "low" },
        system: system || undefined,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const t = await response.text();
      console.error("Anthropic error:", response.status, t);
      const status = response.status === 429 ? 429 : 502;
      return new Response(JSON.stringify({ error: "AI temporarily unavailable" }), {
        status, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const text = Array.isArray(data?.content)
      ? data.content.filter((b: any) => b.type === "text").map((b: any) => b.text).join("")
      : "";

    return new Response(JSON.stringify({ text }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("business-ai error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
