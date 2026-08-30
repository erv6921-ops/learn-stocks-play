// jeff-chat — powers the "Chat with Jeff" lesson experience.
//
// Accepts a full conversation history and returns Jeff's next teaching
// message PLUS 3 suggested student replies. The reply options come from a
// second, tiny model call made here server-side so the client only pays
// one network round trip. When Jeff's message contains the end-of-lesson
// signal ("Ready to test what you learned? 🎯") no options are generated —
// the client shows the quiz button instead.
//
// Providers (first configured wins):
//   1. GEMINI_API_KEY    → Google Gemini (free tier, aistudio.google.com)
//   2. ANTHROPIC_API_KEY → Anthropic claude-sonnet-4-6
// Set with:  supabase secrets set GEMINI_API_KEY=...
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MAX_SYSTEM = 6000;
const MAX_MESSAGES = 40;
const MAX_CONTENT = 2000;
const END_SIGNAL = "Ready to test what you learned?";
const GEMINI_MODEL = "gemini-2.5-flash";

interface Msg { role: "user" | "assistant"; content: string }

function clampStr(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.slice(0, max);
}

async function callAnthropic(apiKey: string, system: string | undefined, messages: Msg[], maxTokens: number): Promise<string> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: maxTokens,
      thinking: { type: "disabled" },
      output_config: { effort: "low" },
      system,
      messages,
    }),
  });
  if (!response.ok) {
    const t = await response.text();
    console.error("Anthropic error:", response.status, t);
    throw new Error(response.status === 429 ? "rate_limited" : "upstream_error");
  }
  const data = await response.json();
  return Array.isArray(data?.content)
    ? data.content.filter((b: { type: string }) => b.type === "text").map((b: { text: string }) => b.text).join("")
    : "";
}

async function callGemini(apiKey: string, system: string | undefined, messages: Msg[], maxTokens: number): Promise<string> {
  // Gemini uses "model" instead of "assistant" and parts[] for content.
  const contents = messages.map(m => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: "POST",
      headers: { "x-goog-api-key": apiKey, "content-type": "application/json" },
      body: JSON.stringify({
        ...(system ? { systemInstruction: { parts: [{ text: system }] } } : {}),
        contents,
        generationConfig: {
          maxOutputTokens: maxTokens,
          temperature: 0.8,
          // Flash is a thinking model by default — disable for speed/cost.
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    },
  );
  if (!response.ok) {
    const t = await response.text();
    console.error("Gemini error:", response.status, t);
    throw new Error(response.status === 429 ? "rate_limited" : "upstream_error");
  }
  const data = await response.json();
  const parts = data?.candidates?.[0]?.content?.parts;
  return Array.isArray(parts) ? parts.map((p: { text?: string }) => p.text ?? "").join("") : "";
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
    if (!GEMINI_API_KEY && !ANTHROPIC_API_KEY) throw new Error("No AI provider configured");

    const call = (system: string | undefined, messages: Msg[], maxTokens: number) =>
      GEMINI_API_KEY
        ? callGemini(GEMINI_API_KEY, system, messages, maxTokens)
        : callAnthropic(ANTHROPIC_API_KEY!, system, messages, maxTokens);

    const body = await req.json();
    const system = clampStr(body.system, MAX_SYSTEM);
    const rawMessages = Array.isArray(body.messages) ? body.messages.slice(-MAX_MESSAGES) : [];
    const messages: Msg[] = rawMessages
      .map((m: { role?: string; content?: string }) => ({
        role: m.role === "assistant" ? "assistant" as const : "user" as const,
        content: clampStr(m.content, MAX_CONTENT),
      }))
      .filter((m: Msg) => m.content);

    if (!system || messages.length === 0) {
      return new Response(JSON.stringify({ error: "system and messages are required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Raw mode — a single model call that returns just { text } with no reply
    // options generated. Used by the lesson interrupter ("quick check"), which
    // packs its whole instruction into the system prompt and needs the JSON
    // straight back. Provider is whatever's configured (Gemini first, else
    // Anthropic claude-sonnet-4-6). maxTokens defaults to 400 (interrupter cap).
    if (body.raw === true) {
      const maxTokens = typeof body.maxTokens === "number"
        ? Math.min(Math.max(1, body.maxTokens), 1000)
        : 400;
      const rawText = await call(system, messages, maxTokens);
      return new Response(JSON.stringify({ text: rawText }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 1) Jeff's next teaching message.
    const text = await call(system, messages, 300);

    // 2) Suggested student replies — skipped once the lesson wraps up.
    let options: string[] = [];
    if (!text.includes(END_SIGNAL)) {
      try {
        const optText = await call(undefined, [{
          role: "user",
          content: `Given Jeff (a friendly financial literacy guide for teens) just said: '${text.slice(0, 800)}', generate exactly 3 short reply options a student might say to continue the conversation naturally. Return ONLY a JSON array of 3 strings, each under 8 words, no punctuation. Example: ["Tell me more","Give me an example","What does that mean"]`,
        }], 150);
        const m = optText.match(/\[[\s\S]*\]/);
        if (m) {
          const parsed = JSON.parse(m[0]);
          if (Array.isArray(parsed)) {
            options = parsed.filter((o: unknown) => typeof o === "string" && o.trim()).slice(0, 3);
          }
        }
      } catch (e) {
        console.error("options generation failed:", e);
      }
      // Never leave the student without a way to continue.
      if (options.length === 0) options = ["Tell me more", "Give me an example", "Got it, what's next"];
    }

    return new Response(JSON.stringify({ text, options }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("jeff-chat error:", e);
    const msg = e instanceof Error ? e.message : "Unknown error";
    const status = msg === "rate_limited" ? 429 : msg === "upstream_error" ? 502 : 500;
    return new Response(JSON.stringify({ error: "AI temporarily unavailable" }), {
      status, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
