// ─────────────────────────────────────────────────────────────────────────────
// TOWER PREVIEW V2 - hardcoded placeholder data.
// 34 floors = 34 curriculum units. Floor number IS the unit number. Seven zones
// stack from the Vault (basement-ish, floors 1-4) to the Penthouse (30-34).
// Everything here is a placeholder to judge the design; swap in real unit
// titles / lesson counts when wiring data.
// ─────────────────────────────────────────────────────────────────────────────

export type ZoneId = "vault" | "lobby" | "cubicles" | "trading" | "research" | "exec" | "penthouse";

export type FloorState = "locked" | "available" | "in-progress" | "complete" | "skipped";

export interface Zone {
  id: ZoneId;
  /** Display name, e.g. "The Trading Floor". */
  name: string;
  /** Short label used where space is tight (facade rail, chips). */
  short: string;
  /** One-line theme of the zone. */
  theme: string;
  /** Inclusive floor range. */
  from: number;
  to: number;
  /** HSL hue used for the zone's tint (kept subtle so it sits on the app palette). */
  hue: number;
  /** Saturation for the tint; lower for the "greyer" office zones. */
  sat: number;
  /** InvestiCoin cost to skip a floor in this zone (scales up the tower). */
  skipCost: number;
  /** Jeff's one-liner when you arrive on a floor in this zone. */
  jeffLine: string;
}

/** A sub-step inside a floor - one lesson of the unit. */
export interface Step {
  id: string;
  /** Short label, e.g. "9.3". */
  label: string;
  title: string;
  done: boolean;
  /** Can be opened right now (done, or the next one up). */
  unlocked: boolean;
  /** InvestiCoins for finishing this step (already multiplied). */
  reward?: number;
  /** Approximate minutes. */
  minutes?: number;
}

export interface Floor {
  /** 1-based position in the tower (bottom = 1). */
  number: number;
  zone: ZoneId;
  /** In-world room name, e.g. "Teller Window". */
  room: string;
  /** Placeholder unit title, e.g. "Saving and Interest". */
  title: string;
  /** Lesson count for the progress meter. */
  lessons: number;
  /** Real curriculum unit id when wired to app data (absent in the mock). */
  unitId?: string;
  /** Secondary line under the zone name, e.g. the curriculum level. */
  levelTitle?: string;
  /** Jeff's line for this specific floor; falls back to the zone line. */
  jeffLine?: string;
  /** The floor's sub-steps (lessons), bottom step first. */
  steps?: Step[];
}

export const ZONES: Zone[] = [
  { id: "vault",     name: "The Vault",         short: "Vault",     theme: "Money basics, banking, saving",        from: 1,  to: 4,  hue: 218, sat: 22, skipCost: 150,  jeffLine: "Everything starts down here. Learn how money works before you move it." },
  { id: "lobby",     name: "The Lobby",         short: "Lobby",     theme: "Income, paychecks, taxes",             from: 5,  to: 9,  hue: 32,  sat: 60, skipCost: 250,  jeffLine: "Your first paycheck is smaller than you think. Let's find out where it goes." },
  { id: "cubicles",  name: "The Cubicles",      short: "Cubicles",  theme: "Credit, debt, insurance, risk",        from: 10, to: 14, hue: 196, sat: 45, skipCost: 400,  jeffLine: "Borrowing is a tool. Up here we learn which end to hold." },
  { id: "trading",   name: "The Trading Floor", short: "Trading",   theme: "Markets, stocks, orders",              from: 15, to: 19, hue: 152, sat: 55, skipCost: 600,  jeffLine: "Hear that noise? That's the market. Time to learn its language." },
  { id: "research",  name: "Research",          short: "Research",  theme: "Analysis, valuation, diversification", from: 20, to: 24, hue: 256, sat: 48, skipCost: 850,  jeffLine: "Quiet floor. This is where we figure out what things are actually worth." },
  { id: "exec",      name: "Executive Suite",   short: "Exec",      theme: "Retirement, real estate, strategy",    from: 25, to: 29, hue: 345, sat: 42, skipCost: 1200, jeffLine: "Big decisions, long horizons. Retirement starts with a plan, not a date." },
  { id: "penthouse", name: "The Penthouse",     short: "Penthouse", theme: "Wealth building, legacy, giving",      from: 30, to: 34, hue: 42,  sat: 80, skipCost: 2000, jeffLine: "Look at that view. Up here, money is about what you leave behind." },
];

export const FLOORS: Floor[] = [
  // Vault - money basics, banking, saving
  { number: 1,  zone: "vault",     room: "Coin Room",          title: "Why Money Exists",             lessons: 4 },
  { number: 2,  zone: "vault",     room: "Counting Room",      title: "Banks and Accounts",           lessons: 4 },
  { number: 3,  zone: "vault",     room: "Teller Window",      title: "Saving and Interest",          lessons: 4 },
  { number: 4,  zone: "vault",     room: "Time-Lock Vault",    title: "Compound Growth",              lessons: 5 },
  // Lobby - income, paychecks, taxes
  { number: 5,  zone: "lobby",     room: "Front Desk",         title: "Your First Paycheck",          lessons: 4 },
  { number: 6,  zone: "lobby",     room: "Mailroom",           title: "Reading a Pay Stub",           lessons: 4 },
  { number: 7,  zone: "lobby",     room: "Reception",          title: "Income Types and Side Hustles", lessons: 5 },
  { number: 8,  zone: "lobby",     room: "Security Desk",      title: "Taxes 101",                    lessons: 4 },
  { number: 9,  zone: "lobby",     room: "Concierge",          title: "Filing a Return",              lessons: 5 },
  // Cubicles - credit, debt, insurance, risk
  { number: 10, zone: "cubicles",  room: "Accounts Desk",      title: "Credit Scores",                lessons: 4 },
  { number: 11, zone: "cubicles",  room: "Loan Office",        title: "Borrowing and Debt",           lessons: 5 },
  { number: 12, zone: "cubicles",  room: "Claims Desk",        title: "Insurance Basics",             lessons: 4 },
  { number: 13, zone: "cubicles",  room: "Break Room",         title: "Emergency Funds and Risk",     lessons: 4 },
  { number: 14, zone: "cubicles",  room: "Copy Room",          title: "Reading the Fine Print",       lessons: 4 },
  // Trading floor - markets, stocks, orders
  { number: 15, zone: "trading",   room: "Ticker Wall",        title: "How Markets Work",             lessons: 4 },
  { number: 16, zone: "trading",   room: "Trading Desk",       title: "What a Stock Is",              lessons: 4 },
  { number: 17, zone: "trading",   room: "Order Window",       title: "Buy, Sell and Limit Orders",   lessons: 5 },
  { number: 18, zone: "trading",   room: "Bull Pen",           title: "Funds and ETFs",               lessons: 4 },
  { number: 19, zone: "trading",   room: "Bell Podium",        title: "Bulls, Bears and Bubbles",     lessons: 4 },
  // Research - analysis, valuation, diversification
  { number: 20, zone: "research",  room: "Reading Room",       title: "Reading a Balance Sheet",      lessons: 5 },
  { number: 21, zone: "research",  room: "Chart Lab",          title: "Price and Volume",             lessons: 4 },
  { number: 22, zone: "research",  room: "Valuation Desk",     title: "What a Company Is Worth",      lessons: 5 },
  { number: 23, zone: "research",  room: "Model Room",         title: "Diversification",              lessons: 4 },
  { number: 24, zone: "research",  room: "The Archive",        title: "Risk vs. Return",              lessons: 4 },
  // Executive suite - retirement, real estate, strategy
  { number: 25, zone: "exec",      room: "Corner Office",      title: "Retirement Accounts",          lessons: 4 },
  { number: 26, zone: "exec",      room: "Boardroom",          title: "401(k) and Roth IRA",          lessons: 5 },
  { number: 27, zone: "exec",      room: "Property Desk",      title: "Buying a Home",                lessons: 5 },
  { number: 28, zone: "exec",      room: "Strategy Room",      title: "Building a Plan",              lessons: 4 },
  { number: 29, zone: "exec",      room: "Executive Lounge",   title: "Taxes for Investors",          lessons: 4 },
  // Penthouse - wealth building, legacy, giving
  { number: 30, zone: "penthouse", room: "Sky Lobby",          title: "Net Worth",                    lessons: 4 },
  { number: 31, zone: "penthouse", room: "Rooftop Garden",     title: "Passive Income",               lessons: 4 },
  { number: 32, zone: "penthouse", room: "Trust Room",         title: "Estate and Legacy",            lessons: 5 },
  { number: 33, zone: "penthouse", room: "The Gallery",        title: "Giving and Impact",            lessons: 4 },
  { number: 34, zone: "penthouse", room: "Observation Deck",   title: "Your Money Story",             lessons: 3 },
];

export const TOP_FLOOR = FLOORS.length;

export const zoneById = (id: ZoneId): Zone => ZONES.find((z) => z.id === id) as Zone;
/** Zone for a floor position. Anything above 34 (the real track has 35 units) stays in the Penthouse. */
export const zoneOfFloor = (n: number): Zone => ZONES.find((z) => n >= z.from && n <= z.to) ?? ZONES[ZONES.length - 1];
export const floorsInZone = (z: Zone, floors: Floor[] = FLOORS): Floor[] => floors.filter((f) => f.zone === z.id);

/** CSS color string for a zone tint at a given lightness/alpha. */
export const zoneColor = (z: Zone, light: number, alpha = 1): string =>
  `hsl(${z.hue} ${z.sat}% ${light}% / ${alpha})`;

/** Fake balance for the mock elevator flow. */
export const MOCK_BALANCE = 3240;
