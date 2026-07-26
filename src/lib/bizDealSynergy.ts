// bizDealSynergy — maps pairs of business types to real B2B deal structures.
// Each entry defines: deal title, flavor description, and the per-month bonuses
// each party gets (revenue %, customers, reputation) while the deal is active.

export type BizType = "food" | "tech" | "retail" | "creative";

export interface BizBonus {
  revenuePct: number;    // extra % applied to monthly revenue
  customers: number;     // flat monthly customer boost
  reputation: number;    // flat monthly reputation boost (0–100 scale)
}

export interface SynergyEntry {
  title: string;
  emoji: string;
  // "A" is the alphabetically-first type in the sorted canonical key.
  descriptionAProposing: string;  // description when A proposes to B
  descriptionBProposing: string;  // description when B proposes to A
  bonusA: BizBonus;               // bonus for type A player
  bonusB: BizBonus;               // bonus for type B player
  durationDays: number;
}

export interface GeneratedDeal {
  title: string;
  emoji: string;
  description: string;
  proposerBenefit: string;
  receiverBenefit: string;
  proposerBonus: BizBonus;
  receiverBonus: BizBonus;
  durationDays: number;
}

// canonical order: creative < food < retail < tech
const MATRIX: Record<string, SynergyEntry> = {
  // ── same-type ────────────────────────────────────────────────────────────
  "creative:creative": {
    title: "Creative Collective",
    emoji: "🎨🎨",
    descriptionAProposing: "Two creative shops pool talent for bigger client projects. Overflow work flows both ways and referrals compound.",
    descriptionBProposing: "Two creative shops pool talent for bigger client projects. Overflow work flows both ways and referrals compound.",
    bonusA: { revenuePct: 12, customers: 0, reputation: 5 },
    bonusB: { revenuePct: 12, customers: 0, reputation: 5 },
    durationDays: 180,
  },
  "food:food": {
    title: "Industry Co-op",
    emoji: "🍽️🤝",
    descriptionAProposing: "Share bulk sourcing costs and cross-promote to each other's regulars. Your menus become complementary rather than competing.",
    descriptionBProposing: "Share bulk sourcing costs and cross-promote to each other's regulars. Your menus become complementary rather than competing.",
    bonusA: { revenuePct: 0, customers: 120, reputation: 6 },
    bonusB: { revenuePct: 0, customers: 120, reputation: 6 },
    durationDays: 180,
  },
  "retail:retail": {
    title: "Merchant Network",
    emoji: "🛒🛒",
    descriptionAProposing: "Refer customers to each other for complementary products. What you don't sell, they do. What they don't carry, you do.",
    descriptionBProposing: "Refer customers to each other for complementary products. What you don't sell, they do. What they don't carry, you do.",
    bonusA: { revenuePct: 0, customers: 180, reputation: 0 },
    bonusB: { revenuePct: 0, customers: 180, reputation: 0 },
    durationDays: 180,
  },
  "tech:tech": {
    title: "Developer Alliance",
    emoji: "💻🤝",
    descriptionAProposing: "Build complementary features and share user flows. A user who outgrows one product naturally moves to the other.",
    descriptionBProposing: "Build complementary features and share user flows. A user who outgrows one product naturally moves to the other.",
    bonusA: { revenuePct: 10, customers: 100, reputation: 0 },
    bonusB: { revenuePct: 10, customers: 100, reputation: 0 },
    durationDays: 180,
  },

  // ── cross-type ───────────────────────────────────────────────────────────
  // creative (A) + food (B)
  "creative:food": {
    title: "Brand & Content Deal",
    emoji: "📸🍔",
    descriptionAProposing: "You handle photography, brand identity, and social content for their food business. They supply product for shoots and credit your studio.",
    descriptionBProposing: "They produce photography, brand identity, and social content for your food business. You supply product for shoots and credit their studio.",
    bonusA: { revenuePct: 14, customers: 80, reputation: 0 },
    bonusB: { revenuePct: 0, customers: 150, reputation: 8 },
    durationDays: 180,
  },
  // creative (A) + retail (B)
  "creative:retail": {
    title: "Brand Identity Deal",
    emoji: "🎨🛍️",
    descriptionAProposing: "You build their brand — logo, signage, in-store visuals, packaging. They feature your portfolio in their flagship space and refer clients.",
    descriptionBProposing: "They build your brand — logo, signage, in-store visuals, packaging. You feature their portfolio and refer business their way.",
    bonusA: { revenuePct: 16, customers: 0, reputation: 0 },
    bonusB: { revenuePct: 0, customers: 120, reputation: 10 },
    durationDays: 180,
  },
  // creative (A) + tech (B)
  "creative:tech": {
    title: "Digital Creative Studio",
    emoji: "🎨💻",
    descriptionAProposing: "You handle UI design, branding, and marketing visuals for their product. They provide the digital infrastructure powering your deliverables.",
    descriptionBProposing: "They handle UI design, branding, and marketing visuals for your product. You provide digital infrastructure for their deliverables.",
    bonusA: { revenuePct: 14, customers: 60, reputation: 0 },
    bonusB: { revenuePct: 5, customers: 0, reputation: 8 },
    durationDays: 180,
  },
  // food (A) + retail (B)
  "food:retail": {
    title: "Wholesale Distribution Deal",
    emoji: "🏪🍱",
    descriptionAProposing: "Your food products move through their retail channels at wholesale price. You focus on production; they focus on the shelf and customer relationships.",
    descriptionBProposing: "Their food products move through your retail channels at wholesale price. They focus on production; you handle the shelf and customer relationships.",
    bonusA: { revenuePct: 15, customers: 80, reputation: 0 },
    bonusB: { revenuePct: 12, customers: 100, reputation: 0 },
    durationDays: 180,
  },
  // food (A) + tech (B)
  "food:tech": {
    title: "App & Delivery Partnership",
    emoji: "🍕💻",
    descriptionAProposing: "Their platform handles your digital ordering, delivery routing, and customer reviews. You supply the product that fills their platform's demand.",
    descriptionBProposing: "Your platform handles their digital ordering, delivery routing, and customer reviews. They supply the product that fills your platform's demand.",
    bonusA: { revenuePct: 18, customers: 150, reputation: 0 },
    bonusB: { revenuePct: 12, customers: 100, reputation: 0 },
    durationDays: 180,
  },
  // retail (A) + tech (B)
  "retail:tech": {
    title: "E-Commerce Platform Deal",
    emoji: "🛒💻",
    descriptionAProposing: "Their tech powers your online store — checkout, inventory sync, and analytics. You drive consistent transaction volume and real-world credibility for their platform.",
    descriptionBProposing: "Your tech powers their online store — checkout, inventory sync, and analytics. They drive consistent transaction volume and real-world credibility for your platform.",
    bonusA: { revenuePct: 0, customers: 200, reputation: 6 },
    bonusB: { revenuePct: 18, customers: 0, reputation: 0 },
    durationDays: 180,
  },
};

function bonusLabel(b: BizBonus): string {
  const parts: string[] = [];
  if (b.revenuePct > 0) parts.push(`+${b.revenuePct}% monthly revenue`);
  if (b.customers > 0) parts.push(`+${b.customers} customers/month`);
  if (b.reputation > 0) parts.push(`+${b.reputation} reputation/month`);
  return parts.join(" · ") || "No direct bonus";
}

export function generateDeal(
  proposerType: BizType,
  receiverType: BizType,
): GeneratedDeal {
  const sorted = ([proposerType, receiverType].sort()) as [BizType, BizType];
  const canonicalKey = sorted.join(":") as string;
  const entry = MATRIX[canonicalKey];
  if (!entry) {
    // Fallback for any unmatched pair (shouldn't happen with 4 types)
    return {
      title: "Strategic Alliance",
      emoji: "🤝",
      description: "Two businesses agree to refer customers and share market insights.",
      proposerBenefit: "+8% monthly revenue · +80 customers/month",
      receiverBenefit: "+8% monthly revenue · +80 customers/month",
      proposerBonus: { revenuePct: 8, customers: 80, reputation: 0 },
      receiverBonus: { revenuePct: 8, customers: 80, reputation: 0 },
      durationDays: 180,
    };
  }

  const proposerIsA = proposerType === sorted[0];
  return {
    title: entry.title,
    emoji: entry.emoji,
    description: proposerIsA ? entry.descriptionAProposing : entry.descriptionBProposing,
    proposerBenefit: bonusLabel(proposerIsA ? entry.bonusA : entry.bonusB),
    receiverBenefit: bonusLabel(proposerIsA ? entry.bonusB : entry.bonusA),
    proposerBonus: proposerIsA ? entry.bonusA : entry.bonusB,
    receiverBonus: proposerIsA ? entry.bonusB : entry.bonusA,
    durationDays: entry.durationDays,
  };
}

export const BIZ_TYPE_LABELS: Record<BizType, string> = {
  food: "Food & Beverage",
  tech: "Tech & Software",
  retail: "Retail & Products",
  creative: "Creative Services",
};
