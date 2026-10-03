// Supabase Edge Function: translate
//
// Runtime translation of the app's STATIC English content (daily challenge,
// quiz / unit-test / assessment questions, lesson reading sections) so a
// Spanish-mode student sees them in Spanish without us pre-translating and
// shipping ~5 MB of duplicate data. The client collects the English strings a
// screen needs, de-dupes them, and asks this function to translate the batch;
// it caches the result on-device so each string is translated at most once.
//
// Input:  { texts: string[], target?: "es" | "en", context?: string }
// Output: { translations: string[] }  // same length & order as `texts`
//
// Translations follow the app glossary (neutral Latin American Spanish,
// informal "tú"); brand names, tickers, numbers, placeholders and markdown are
// preserved verbatim. The model is told to return a JSON array 1:1 with input.
//
// Runtime:  Deno (Supabase Edge Functions)
// Env vars: ANTHROPIC_API_KEY
// Project:  InvestiPlay (vcjdshippmqopaffuzbw)

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const MODEL = "claude-sonnet-4-6";
const MAX_TEXTS = 100; // per request; the client batches beyond this
const MAX_CHARS_PER_TEXT = 4000;

// Compact glossary (mirrors src/i18n/GLOSSARY.md) so content matches the UI chrome.
const GLOSSARY_ES = `Finance: stock=acción, share=acción, shares=acciones, portfolio=portafolio, holding=posición, watchlist=lista de seguimiento, trade=operación, buy=comprar, sell=vender, market=mercado, bond=bono, dividend=dividendo, broker=corredor de bolsa, capital gains=ganancias de capital, profit=ganancia, loss=pérdida, revenue=ingresos, cash=efectivo, net worth=patrimonio neto, return=retorno, bank=banco, savings=ahorro, investor=inversionista (no "inversor"), interest=interés, loan=préstamo, credit=crédito, budget=presupuesto, income=ingresos, expense=gasto, tax=impuesto, debt=deuda.
Game: coins=monedas, streak=racha, level=nivel, badge=insignia, league=liga, leaderboard=tabla de posiciones, rank=puesto, mission=misión, challenge=desafío, lesson=lección, unit=unidad, quiz=cuestionario, progress=progreso, homework=tarea.
Business: business=negocio, entrepreneur=emprendedor, customers=clientes, product=producto, profitable=rentable.
Accounts: student=estudiante, teacher=docente, class=clase, grade=grado.
Keep unchanged (NEVER translate): InvestiPlay, InvestiCoins, Jeff, stock tickers (AAPL, TSLA...), EPS, P/E, EBITDA, beta, numbers, currency, percentages, emojis, and any {{placeholder}} tokens or **markdown**.`;

async function translateBatch(apiKey: string, texts: string[], target: string, context?: string): Promise<string[]> {
  const targetName = target === "en" ? "English" : "neutral Latin American Spanish (informal \"tú\")";
  const system = [
    `You are a professional translator for InvestiPlay, a financial-literacy app for high-school students (ages 14-17).`,
    `Translate each input string to ${targetName}.`,
    context ? `Context: these strings are ${context}.` : "",
    `Rules:`,
    `- Preserve meaning, tone (friendly, teen-appropriate), and formatting exactly.`,
    `- Keep numbers, currency, %, stock tickers, emojis, {{placeholders}}, and **markdown**/HTML markers untouched.`,
    `- Translate the full string even if it already contains some target-language words.`,
    `- Do NOT add notes, quotes, or explanations.`,
    target === "en" ? "" : GLOSSARY_ES,
    `You are given a JSON array of strings. Return ONLY a JSON array of the translations, exactly the same length and order, nothing else (no code fences, no prose).`,
  ].filter(Boolean).join("\n");

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8000,
      system,
      messages: [{ role: "user", content: JSON.stringify(texts) }],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("anthropic error", response.status, body.slice(0, 500));
    throw new Error(response.status === 429 ? "rate_limited" : "upstream_error");
  }

  const data = await response.json();
  const raw: string = data?.content?.[0]?.text ?? "";
  const m = raw.match(/\[[\s\S]*\]/);
  if (!m) throw new Error("unparseable");
  const parsed = JSON.parse(m[0]);
  if (!Array.isArray(parsed)) throw new Error("not_array");
  // Pad/trim defensively so the client's 1:1 mapping never breaks.
  const out: string[] = [];
  for (let i = 0; i < texts.length; i++) {
    const v = parsed[i];
    out.push(typeof v === "string" && v.trim() ? v : texts[i]);
  }
  return out;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  try {
    if (req.method !== "POST") return json({ error: "Use POST." }, 405);

    const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!apiKey) return json({ error: "Server misconfiguration: missing ANTHROPIC_API_KEY." }, 500);

    const body = await req.json().catch(() => null);
    const target = body?.target === "en" ? "en" : "es";
    const context = typeof body?.context === "string" ? body.context.slice(0, 200) : undefined;
    const rawTexts = Array.isArray(body?.texts) ? body.texts : [];

    const texts: string[] = rawTexts
      .filter((t: unknown) => typeof t === "string")
      .slice(0, MAX_TEXTS)
      .map((t: string) => t.slice(0, MAX_CHARS_PER_TEXT));

    if (texts.length === 0) return json({ translations: [] });

    // Strings with no translatable letters (pure numbers / symbols) pass through.
    const translatable = texts.filter((t) => /\p{L}/u.test(t));
    if (translatable.length === 0) return json({ translations: texts });

    const translatedMap = new Map<string, string>();
    const translated = await translateBatch(apiKey, translatable, target, context);
    translatable.forEach((t, i) => translatedMap.set(t, translated[i]));

    const translations = texts.map((t) => translatedMap.get(t) ?? t);
    return json({ translations });
  } catch (e) {
    console.error("translate error:", e);
    const msg = e instanceof Error ? e.message : "Unknown error";
    const status = msg === "rate_limited" ? 429 : msg === "upstream_error" ? 502 : 500;
    return json({ error: "Translation temporarily unavailable" }, status);
  }
});
