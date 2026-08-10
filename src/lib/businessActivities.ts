// businessActivities - presets, persistence, and helpers for the restructured
// Micro-Business "Studio" (Product Development / Collaboration / Marketing).
// All rule-based, no AI. Responses persist to business_game_state.activities.
import { supabase } from "@/integrations/supabase/client";
import { UtensilsCrossed, Smartphone, ShoppingBag, Palette, type LucideIcon } from "lucide-react";

export type BusinessType = "food" | "tech" | "retail" | "creative";

export interface BizTypeDef { id: BusinessType; label: string; icon: LucideIcon; color: string; blurb: string; unitCost: number; unitLabel: string }
export const BUSINESS_TYPES: BizTypeDef[] = [
  { id: "food", label: "Food & Beverage", icon: UtensilsCrossed, color: "#f97316", blurb: "Cafés, snacks, drinks, catering", unitCost: 4, unitLabel: "per item" },
  { id: "tech", label: "Tech & Apps", icon: Smartphone, color: "#3b82f6", blurb: "Apps, software, digital tools", unitCost: 2, unitLabel: "per user / month" },
  { id: "retail", label: "Retail & Fashion", icon: ShoppingBag, color: "#ec4899", blurb: "Clothing, accessories, products", unitCost: 12, unitLabel: "per product" },
  { id: "creative", label: "Creative Services", icon: Palette, color: "#a855f7", blurb: "Design, content, media services", unitCost: 25, unitLabel: "per project hour" },
];
export const bizDef = (t: BusinessType) => BUSINESS_TYPES.find((b) => b.id === t)!;

// ── Activity 3 (Product Feedback): 5 beta reviews per type, rotate by week ──
export const BETA_REVIEWS: Record<BusinessType, string[]> = {
  food: [
    "Loved the flavor but the portion felt small for the price. I left a little hungry.",
    "Great taste! But I waited 25 minutes - way too long for a quick lunch spot.",
    "The packaging leaked all over my bag. Fix that and I'd order weekly.",
    "Honestly a bit too sweet for me. A savory option would win me over.",
    "Best snack I've had in ages, but you're only open weekends - I want it Monday too.",
  ],
  tech: [
    "The app is useful but it crashed twice while I was saving. I lost my work.",
    "Cool idea, but onboarding took 10 confusing steps. I almost gave up.",
    "Does what it promises! The free tier is too limited though - I'd pay if it gave more.",
    "Beautiful design, but it's slow to load on my older phone.",
    "I don't understand what makes this different from the free tool I already use.",
  ],
  retail: [
    "The fabric quality is amazing, but the sizing runs small. I had to return it.",
    "Love the style! Shipping took two weeks though - too slow for impulse buys.",
    "Photos looked brighter than the real color. Slightly disappointed on arrival.",
    "Great product, but there were only 3 sizes. I'm in between and couldn't fit.",
    "I'd buy more if you had a loyalty discount - full price every time adds up.",
  ],
  creative: [
    "The design was gorgeous but you missed my deadline by three days.",
    "Talented work! Communication was spotty though - I had to chase for updates.",
    "Loved the first draft, but revisions cost extra and that wasn't clear upfront.",
    "Exactly the vibe I wanted. Wish the file formats matched what I asked for.",
    "Great quality, but your pricing is higher than three competitors I checked.",
  ],
};

// ── Collaboration Activity 1: 4 potential partners per type ──
export interface Partner { id: string; name: string; bizType: string; offering: string; want: string }
export const PARTNERS: Record<BusinessType, Partner[]> = {
  food: [
    { id: "f1", name: "Mia's Bakehouse", bizType: "Bakery", offering: "Daily fresh bread & pastries at wholesale cost", want: "A storefront to sell through and 20% of pastry profit" },
    { id: "f2", name: "GreenLeaf Farms", bizType: "Local farm", offering: "Discounted seasonal produce + a 'farm-to-table' story", want: "Credit on your menu and a stall at your events" },
    { id: "f3", name: "BrewBros Coffee", bizType: "Coffee roaster", offering: "Premium beans and a co-branded drink line", want: "Exclusive coffee supplier rights for 12 months" },
    { id: "f4", name: "PackRight Co.", bizType: "Packaging", offering: "Eco-friendly custom packaging at cost", want: "Their logo on your boxes and a case study" },
  ],
  tech: [
    { id: "t1", name: "PixelForge", bizType: "Design studio", offering: "Full UI/UX redesign of your app", want: "15% revenue share for 6 months" },
    { id: "t2", name: "DataNest", bizType: "Analytics startup", offering: "Free analytics dashboard + insights", want: "Access to your anonymized usage data" },
    { id: "t3", name: "LaunchPad Media", bizType: "Marketing agency", offering: "A 30-day influencer launch campaign", want: "A flat fee plus a per-signup bonus" },
    { id: "t4", name: "CloudCore", bizType: "Infrastructure", offering: "Free hosting credits for a year", want: "A 'Powered by CloudCore' badge in your app" },
  ],
  retail: [
    { id: "r1", name: "ThreadMill", bizType: "Textile supplier", offering: "Premium fabric below market rate", want: "Minimum order commitment each season" },
    { id: "r2", name: "StyleSphere", bizType: "Fashion influencer", offering: "Promotion to 80k followers", want: "Free products and 10% of attributed sales" },
    { id: "r3", name: "PopUp Partners", bizType: "Event space", offering: "Weekend market booths in 3 cities", want: "A share of booth sales and co-marketing" },
    { id: "r4", name: "EcoDye Labs", bizType: "Sustainable dye", offering: "Natural dyes + a sustainability certification", want: "A premium price split on 'green' items" },
  ],
  creative: [
    { id: "c1", name: "SoundScape", bizType: "Audio studio", offering: "Original music & sound for your projects", want: "Cross-referrals and shared client list" },
    { id: "c2", name: "WriteWise", bizType: "Copywriting", offering: "Scripts and captions for your deliverables", want: "A flat per-project rate" },
    { id: "c3", name: "MotionMakers", bizType: "Animation", offering: "Motion graphics add-ons for clients", want: "30% of any animation upsell" },
    { id: "c4", name: "AgencyOne", bizType: "Full agency", offering: "Overflow client work and big-brand intros", want: "A finder's fee on referred clients" },
  ],
};

// ── Collaboration Activity 2: 5 partnership problems per type ──
export const PARTNER_PROBLEMS: Record<BusinessType, string[]> = {
  food: [
    "Your partner missed the delivery deadline and you ran out of stock during a rush.",
    "They want to change the revenue split from 80/20 to 70/30 in their favor.",
    "A customer got sick and your partner blames your kitchen, not their ingredients.",
    "Your partner started selling the same item to your biggest competitor.",
    "They keep raising their wholesale prices with no notice.",
  ],
  tech: [
    "Your partner missed a sprint deadline and the launch is now at risk.",
    "They want to renegotiate the revenue share after seeing your growth.",
    "A data breach happened on their side and your users are affected.",
    "They quietly shipped a feature you both agreed to build together - solo.",
    "Their team went silent for two weeks with no updates.",
  ],
  retail: [
    "Your supplier partner shipped the wrong colors for your whole season.",
    "The influencer partner wants double their cut after one viral post.",
    "Your partner double-booked the pop-up booth you were promised.",
    "They leaked your upcoming designs before launch.",
    "Quality dropped on the last batch and customers are returning items.",
  ],
  creative: [
    "Your partner delivered work that doesn't match the client's brief.",
    "They want to claim full credit on a project you led together.",
    "A shared client is unhappy and each of you blames the other.",
    "Your partner is overbooked and keeps pushing your deadlines.",
    "They invoiced the client directly and cut you out of the payment.",
  ],
};

// ── Collaboration Activity 3: vendor opening offer per type ──
export interface VendorOffer { item: string; unitPrice: number; moq: number; deliveryDays: number }
export const VENDOR_OFFERS: Record<BusinessType, VendorOffer> = {
  food: { item: "ingredient supply", unitPrice: 3.2, moq: 200, deliveryDays: 5 },
  tech: { item: "API / cloud credits", unitPrice: 1.5, moq: 1000, deliveryDays: 2 },
  retail: { item: "blank apparel stock", unitPrice: 9, moq: 100, deliveryDays: 14 },
  creative: { item: "stock asset license", unitPrice: 18, moq: 20, deliveryDays: 7 },
};

// ── Activity IDs, ordering, and XP ──
export const PD_ACTIVITIES = ["productDoc", "pricing", "feedback"] as const;
export const COLLAB_ACTIVITIES = ["partner", "partnerProblem", "vendor"] as const;
export const MKT_ACTIVITIES = ["brand", "marketingPlan", "adCampaign"] as const;
export const ALL_ACTIVITIES: string[] = [...PD_ACTIVITIES, ...COLLAB_ACTIVITIES, ...MKT_ACTIVITIES];
// Coins for finishing an activity - kept modest (30-50) so a quarter's work
// doesn't dwarf everything else the kids earn.
export const XP = { pd: 40, collab: 50, mkt: 40 };

export const ACTIVITY_TITLES: Record<string, string> = {
  productDoc: "Product Design Document", pricing: "Pricing Strategy", feedback: "Product Feedback Response",
  partner: "Find a Partner", partnerProblem: "Partnership Problem", vendor: "Vendor Negotiation",
  brand: "Brand Identity", marketingPlan: "Marketing Plan", adCampaign: "Ad Campaign",
};

// rotate presets over real time (changes weekly)
export const weekIndex = () => Math.floor(Date.now() / (7 * 86400000));

export const wordCount = (s: string) => (s && s.trim() ? s.trim().split(/\s+/).length : 0);

// ── Persistence (business_game_state.activities column) ──
export interface ActivitiesState {
  version: number;
  businessType: BusinessType | null;
  done: string[];
  xpAwarded: string[];
  data: Record<string, Record<string, unknown>>;
  sim?: unknown; // living-business state (see businessSim.ts BizState)
}
export function defaultActivities(): ActivitiesState {
  return { version: 1, businessType: null, done: [], xpAwarded: [], data: {} };
}

const LS_KEY = "investiplay_business_activities";

export async function loadActivities(): Promise<ActivitiesState> {
  try {
    const { data: au } = await supabase.auth.getUser();
    const uid = au?.user?.id;
    if (uid) {
      const { data } = await (supabase as any).from("business_game_state").select("activities").eq("user_id", uid).maybeSingle();
      const a = (data as any)?.activities;
      if (a && typeof a === "object" && a.version) return { ...defaultActivities(), ...a };
    }
  } catch { /* fall back */ }
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return { ...defaultActivities(), ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return defaultActivities();
}

let saveTimer: ReturnType<typeof setTimeout> | null = null;
export function saveActivities(s: ActivitiesState) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(s)); } catch { /* ignore */ }
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    try {
      const { data: au } = await supabase.auth.getUser();
      const uid = au?.user?.id;
      if (uid) {
        // Upsert only the `activities` column so the Office's `state` column is untouched.
        await (supabase as any).from("business_game_state").upsert(
          {
            user_id: uid,
            activities: s,
            // Expose biz_type so get_partners_with_biz() can surface it
            biz_type: s.businessType ?? null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" },
        );
      }
    } catch { /* best effort */ }
  }, 600);
}
