// productProfile - turns the student's ACTUAL product into a realistic economic
// profile + personalized coaching, instead of forcing every product into one of
// four fixed business-type buckets (which made a phone "cost 2 IC to make").
//
// Two AI-powered pieces, both with deterministic fallbacks so the studio keeps
// working offline / if the edge function is down:
//   • generateProductProfile - reads name/problem/audience and returns a
//     believable unit cost, price range and margin FOR THAT product. A phone
//     comes back with a high cost & thin margin; an app comes back near-zero.
//   • generateCoach - after each activity, a short response that reacts to what
//     the student actually wrote and sets up the next module.
import { businessAI, parseAIJson } from "@/lib/businessAI";
import { bizDef, type BusinessType } from "@/lib/businessActivities";

export interface CostItem { item: string; cost: number }
export interface ProductProfile {
  version: number;
  product: string;        // the product name this profile was built for
  unitCost: number;       // realistic cost to make/deliver ONE unit (in-game coins)
  unitLabel: string;      // e.g. "per phone", "per haircut", "per download"
  suggestedPrice: number; // a believable sell price
  priceLow: number;
  priceHigh: number;
  targetMargin: number;   // %, derived from suggestedPrice vs unitCost
  breakdown: CostItem[];  // what makes up the unit cost (teaches COGS)
  note: string;           // one-line "why the economics look like this"
  generatedAt: number;
}

export interface CoachNote {
  message: string;   // personalized reaction to what they just did
  nextHint: string;  // a tip that sets up the next module
  score: number;     // 0-100 quality grade of THEIR submission
  generatedAt: number;
}

// Scale an activity's base coin reward by the graded quality of the answer, so a
// thoughtful, specific response earns more than a vague / low-effort one.
export function coinsForScore(base: number, score: number): number {
  if (score >= 85) return Math.round(base * 1.5); // excellent - bonus
  if (score >= 70) return base;                    // solid - full reward
  if (score >= 55) return Math.round(base * 0.7);  // okay - trimmed
  return Math.max(5, Math.round(base * 0.45));      // weak/broad - reduced (never 0)
}
export function gradeLabel(score: number): { label: string; color: string } {
  if (score >= 85) return { label: "Excellent", color: "#1D9E75" };
  if (score >= 70) return { label: "Solid", color: "#22c55e" };
  if (score >= 55) return { label: "Okay", color: "#EF9F27" };
  return { label: "Needs work", color: "#dc2626" };
}

export const PROFILE_KEY = "__profile";
export const coachKey = (activityId: string) => `__coach_${activityId}`;

const str = (v: unknown) => (typeof v === "string" ? v : "");
const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

// Pull the readable free-text out of a saved submission (skips internal __keys).
function summarizeSubmission(fields: Record<string, unknown> | undefined): string {
  if (!fields) return "";
  return Object.entries(fields)
    .filter(([k, v]) => !k.startsWith("__") && typeof v === "string" && v.trim().length > 1)
    .map(([k, v]) => `${k}: ${String(v).slice(0, 220)}`)
    .join(" | ")
    .slice(0, 900);
}

/* ───────────────────────── Product economics ───────────────────────── */

function fallbackProfile(bt: BusinessType, design: Record<string, unknown> | undefined): ProductProfile {
  const def = bizDef(bt);
  const name = str(design?.name).trim() || def.label;
  const unitCost = def.unitCost;
  const suggested = Math.max(unitCost + 2, Math.round(unitCost * (bt === "creative" ? 2.4 : bt === "tech" ? 6 : 2.6)));
  return {
    version: 1,
    product: name,
    unitCost,
    unitLabel: def.unitLabel,
    suggestedPrice: suggested,
    priceLow: Math.max(1, Math.round(suggested * 0.8)),
    priceHigh: Math.round(suggested * 1.35),
    targetMargin: Math.round(((suggested - unitCost) / suggested) * 100),
    breakdown: [{ item: "Materials & delivery", cost: unitCost }],
    note: "Estimated from your industry - design your product for a sharper number.",
    generatedAt: Date.now(),
  };
}

export async function generateProductProfile(
  bt: BusinessType,
  design: Record<string, unknown> | undefined,
): Promise<ProductProfile> {
  const def = bizDef(bt);
  const name = str(design?.name).trim();
  const problem = str(design?.problem).trim();
  const audience = str(design?.audience).trim();
  if (!name) return fallbackProfile(bt, design);

  const system =
    "You are a business coach helping a teen figure out the REAL unit economics of the specific product they invented. " +
    "You keep numbers in the game's small in-game coin (IC) scale but make them proportionally realistic to the actual product. " +
    "Output ONLY JSON.";
  const prompt =
    `Industry: ${def.label}. Product name: "${name}".` +
    (problem ? ` Problem it solves: ${problem}.` : "") +
    (audience ? ` Target customer: ${audience}.` : "") +
    `\n\nWork out believable unit economics FOR THIS EXACT PRODUCT (not the industry average). Rules:` +
    `\n- Costs & prices are in in-game coins (IC). Keep the sell price roughly between 3 and 250 IC.` +
    `\n- "unitCost" = what it costs to make or deliver ONE unit. Make it PROPORTIONAL to reality:` +
    ` physical hardware/electronics = high cost & thin margin; handmade goods = medium; software/digital = near-zero per unit;` +
    ` a service = priced by the time/skill it takes.` +
    `\n- Give a 2-4 item cost breakdown that adds up to unitCost.` +
    `\n- unitLabel is a short phrase like "per phone", "per haircut", "per download".` +
    `\n\nReturn ONLY this JSON shape:` +
    `\n{"unitCost": number, "unitLabel": string, "suggestedPrice": number, "priceLow": number, "priceHigh": number,` +
    ` "breakdown": [{"item": string, "cost": number}], "note": string}`;

  try {
    const text = await businessAI(system, prompt, 500);
    const raw = parseAIJson<Partial<ProductProfile> & { breakdown?: CostItem[] }>(text, {});
    const unitCost = clamp(Math.round(Number(raw.unitCost) || 0), 0, 400);
    const suggestedPrice = clamp(Math.round(Number(raw.suggestedPrice) || unitCost + 3), Math.max(1, unitCost + 1), 500);
    if (!unitCost && !raw.unitLabel) return fallbackProfile(bt, design);
    const breakdown: CostItem[] = Array.isArray(raw.breakdown)
      ? raw.breakdown.slice(0, 4).map((b) => ({ item: String(b?.item ?? "Cost").slice(0, 40), cost: clamp(Math.round(Number(b?.cost) || 0), 0, 400) }))
      : [];
    return {
      version: 1,
      product: name,
      unitCost,
      unitLabel: String(raw.unitLabel ?? def.unitLabel).slice(0, 30),
      suggestedPrice,
      priceLow: clamp(Math.round(Number(raw.priceLow) || suggestedPrice * 0.8), 1, 500),
      priceHigh: clamp(Math.round(Number(raw.priceHigh) || suggestedPrice * 1.3), 1, 600),
      targetMargin: suggestedPrice > 0 ? Math.round(((suggestedPrice - unitCost) / suggestedPrice) * 100) : 0,
      breakdown: breakdown.length ? breakdown : [{ item: "Materials & delivery", cost: unitCost }],
      note: String(raw.note ?? "").slice(0, 160),
      generatedAt: Date.now(),
    };
  } catch {
    return fallbackProfile(bt, design);
  }
}

/* ───────────────────────── Per-activity coaching ───────────────────────── */

// What each founding activity is about, and what comes next - so the coach can
// react to the right thing and tee up the next module by name.
const ACTIVITY_DESC: Record<string, string> = {
  productDoc: "designing their product - what it is, the problem it solves, and who it's for",
  recipe: "building their recipe and costing out the ingredients",
  pricing: "setting a price and working out their profit margin",
  feedback: "writing a reply to a customer's product review",
  partner: "choosing a business partner and weighing the deal",
  partnerProblem: "handling a conflict with a partner",
  vendor: "negotiating a supply deal with a vendor",
  brand: "creating their brand identity - name, colors and tagline",
  marketingPlan: "writing a marketing plan",
  adCampaign: "designing an ad campaign",
};
const NEXT_HINT: Record<string, string> = {
  productDoc: "Next you'll price it - so start thinking about what one unit really costs to make.",
  recipe: "Next you'll set a price - your cost-per-serving is the floor it has to clear.",
  pricing: "Next you'll answer a real customer review - stay in your brand's voice.",
  feedback: "Next you'll find a partner - think about what your product is missing.",
  partner: "Next you'll hit a partner problem - a clear agreement now saves you later.",
  partnerProblem: "Next you'll negotiate with a vendor - know your numbers before you do.",
  vendor: "Next you'll build your brand - who your product is for should shape the look.",
  brand: "Next you'll write a marketing plan - pick the one channel your customer actually uses.",
  marketingPlan: "Next you'll launch a campaign - tie it back to the plan you just wrote.",
  adCampaign: "Great - run your business in the Office tab to put all this to work.",
};

function fallbackCoach(activityId: string, product: string): CoachNote {
  const p = product || "your product";
  return {
    message: `Nice work on ${p}. You're building real momentum - each step is making the business more concrete.`,
    nextHint: NEXT_HINT[activityId] || "Keep going - the next step builds right on this one.",
    // Offline / AI-down: don't punish the student for our outage - give them the
    // full (base) reward rather than a low grade.
    score: 74,
    generatedAt: Date.now(),
  };
}

export async function generateCoach(
  bt: BusinessType,
  activityId: string,
  design: Record<string, unknown> | undefined,
  submission: Record<string, unknown> | undefined,
  profile: ProductProfile | null,
): Promise<CoachNote> {
  const product = str(design?.name).trim() || (profile?.product ?? "");
  const what = ACTIVITY_DESC[activityId] || "this step of building their business";
  const nextSeed = NEXT_HINT[activityId] || "the next step of building their business";
  const work = summarizeSubmission(submission);

  const system =
    "You are Jeff, a warm but honest business coach for a teen running a startup in a learning game. " +
    "You give specific feedback that references what the student ACTUALLY wrote - never generic praise - " +
    "and you grade their effort fairly so good work earns more than lazy work. " +
    "Keep it short and age-appropriate. Output ONLY JSON.";
  const prompt =
    `The student's product is "${product}" (${bizDef(bt).label}).` +
    (profile ? ` Its realistic economics: it costs about ${profile.unitCost} IC to make one ${profile.unitLabel}, and a fair price is around ${profile.suggestedPrice} IC.` : "") +
    `\nThey just finished ${what}.` +
    (work ? ` Here's what they wrote: ${work}.` : "") +
    `\n\nDo two things. Rules:` +
    `\n- "message": 2-3 sentences reacting to THEIR specific product and what they wrote. Name one genuinely good thing and one concrete way to sharpen it.` +
    `\n- "nextHint": one short sentence that sets them up for what's next (${nextSeed}).` +
    `\n- "score": grade the QUALITY of their answer from 0-100. Rubric: 85-100 = specific, thoughtful, clearly tied to their product; 70-84 = solid but could go deeper; 55-69 = generic or too broad; below 55 = vague, off-topic, or low-effort. Be fair but honest - reward real thinking, dock broad or lazy answers.` +
    `\n\nReturn ONLY: {"message": string, "nextHint": string, "score": number}`;

  try {
    const text = await businessAI(system, prompt, 340);
    const raw = parseAIJson<{ message?: string; nextHint?: string; score?: number }>(text, {});
    const message = String(raw.message ?? "").trim();
    if (!message) return fallbackCoach(activityId, product);
    const score = clamp(Math.round(Number(raw.score)), 0, 100) || 70;
    return {
      message: message.slice(0, 500),
      nextHint: String(raw.nextHint ?? NEXT_HINT[activityId] ?? "").trim().slice(0, 220) || (NEXT_HINT[activityId] || ""),
      score,
      generatedAt: Date.now(),
    };
  } catch {
    return fallbackCoach(activityId, product);
  }
}
