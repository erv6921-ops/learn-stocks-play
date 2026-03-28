const ET_TIMEZONE = "America/New_York";
const PRE_MARKET_OPEN_MIN = 4 * 60;
const REGULAR_OPEN_MIN = 9 * 60 + 30;
const REGULAR_CLOSE_MIN = 16 * 60;
const EARLY_CLOSE_MIN = 13 * 60;
const AFTER_HOURS_CLOSE_MIN = 20 * 60;

type ProviderMarketState = "REGULAR" | "PRE" | "PREPRE" | "POST" | "POSTPOST" | "CLOSED";

export type MarketSession = "pre" | "regular" | "post" | "closed";

interface EtParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  dayOfWeek: number;
  dateKey: string;
}

interface SessionContext {
  nowEt: EtParts;
  scheduledSession: MarketSession;
  regularCloseMinuteToday: number;
}

export interface MarketSessionStatus {
  session: MarketSession;
  label: "Pre-Market" | "Market Open" | "After Hours" | "Market Closed";
  quoteDate: Date | null;
  quoteTimeText: string | null;
  lastCloseDate: Date;
  lastCloseText: string;
  /** Always "4:00 PM ET" (or "1:00 PM ET" on early-close days) — never a quote timestamp */
  regularCloseTimeET: string;
}

export interface MarketSessionInput {
  marketState?: string | null;
  session?: string | null;
  quoteTimestamp?: number | null;
  regularMarketTime?: number | null;
  now?: Date;
}

const ET_PARTS_FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeZone: ET_TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  weekday: "short",
});

function keyFromParts(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parseDateKey(dateKey: string): { year: number; month: number; day: number } {
  const [y, m, d] = dateKey.split("-").map(Number);
  return { year: y, month: m, day: d };
}

function dateKeyToUtcDate(dateKey: string): Date {
  const { year, month, day } = parseDateKey(dateKey);
  return new Date(Date.UTC(year, month - 1, day));
}

function shiftDateKey(dateKey: string, days: number): string {
  const base = dateKeyToUtcDate(dateKey);
  base.setUTCDate(base.getUTCDate() + days);
  return keyFromParts(base.getUTCFullYear(), base.getUTCMonth() + 1, base.getUTCDate());
}

function observedFixedHoliday(year: number, month: number, day: number): string {
  const d = new Date(Date.UTC(year, month - 1, day));
  const weekday = d.getUTCDay();
  if (weekday === 6) d.setUTCDate(d.getUTCDate() - 1);
  if (weekday === 0) d.setUTCDate(d.getUTCDate() + 1);
  return keyFromParts(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
}

function nthWeekdayOfMonth(year: number, monthZeroBased: number, weekday: number, nth: number): string {
  const d = new Date(Date.UTC(year, monthZeroBased, 1));
  let seen = 0;
  while (d.getUTCMonth() === monthZeroBased) {
    if (d.getUTCDay() === weekday) {
      seen += 1;
      if (seen === nth) {
        return keyFromParts(year, monthZeroBased + 1, d.getUTCDate());
      }
    }
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return keyFromParts(year, monthZeroBased + 1, 1);
}

function lastWeekdayOfMonth(year: number, monthZeroBased: number, weekday: number): string {
  const d = new Date(Date.UTC(year, monthZeroBased + 1, 0));
  while (d.getUTCDay() !== weekday) {
    d.setUTCDate(d.getUTCDate() - 1);
  }
  return keyFromParts(year, monthZeroBased + 1, d.getUTCDate());
}

function calculateEasterSunday(year: number): { month: number; day: number } {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return { month, day };
}

const holidayCache = new Map<number, Set<string>>();
const earlyCloseCache = new Map<number, Set<string>>();

function getNyseHolidaySet(year: number): Set<string> {
  const existing = holidayCache.get(year);
  if (existing) return existing;

  const holidays = new Set<string>([
    observedFixedHoliday(year, 1, 1),
    nthWeekdayOfMonth(year, 0, 1, 3), // MLK Day
    nthWeekdayOfMonth(year, 1, 1, 3), // Presidents Day
    lastWeekdayOfMonth(year, 4, 1), // Memorial Day
    observedFixedHoliday(year, 6, 19), // Juneteenth
    observedFixedHoliday(year, 7, 4), // Independence Day
    nthWeekdayOfMonth(year, 8, 1, 1), // Labor Day
    nthWeekdayOfMonth(year, 10, 4, 4), // Thanksgiving
    observedFixedHoliday(year, 12, 25), // Christmas
  ]);

  const easter = calculateEasterSunday(year);
  const goodFridayBase = new Date(Date.UTC(year, easter.month - 1, easter.day));
  goodFridayBase.setUTCDate(goodFridayBase.getUTCDate() - 2);
  holidays.add(keyFromParts(goodFridayBase.getUTCFullYear(), goodFridayBase.getUTCMonth() + 1, goodFridayBase.getUTCDate()));

  holidayCache.set(year, holidays);
  return holidays;
}

function getNyseEarlyCloseSet(year: number): Set<string> {
  const existing = earlyCloseCache.get(year);
  if (existing) return existing;

  const holidays = getNyseHolidaySet(year);
  const early = new Set<string>();

  // Day after Thanksgiving
  early.add(shiftDateKey(nthWeekdayOfMonth(year, 10, 4, 4), 1));

  // Christmas Eve (if open weekday)
  const christmasEve = keyFromParts(year, 12, 24);
  if (!isWeekendDateKey(christmasEve) && !holidays.has(christmasEve)) {
    early.add(christmasEve);
  }

  // July 3rd often has early close when open
  const julyThird = keyFromParts(year, 7, 3);
  if (!isWeekendDateKey(julyThird) && !holidays.has(julyThird)) {
    early.add(julyThird);
  }

  earlyCloseCache.set(year, early);
  return early;
}

function isWeekendDateKey(dateKey: string): boolean {
  const d = dateKeyToUtcDate(dateKey);
  const day = d.getUTCDay();
  return day === 0 || day === 6;
}

function isTradingDay(dateKey: string): boolean {
  const { year } = parseDateKey(dateKey);
  if (isWeekendDateKey(dateKey)) return false;
  return !getNyseHolidaySet(year).has(dateKey);
}

function getRegularCloseMinute(dateKey: string): number {
  const { year } = parseDateKey(dateKey);
  const earlySet = getNyseEarlyCloseSet(year);
  return earlySet.has(dateKey) ? EARLY_CLOSE_MIN : REGULAR_CLOSE_MIN;
}

function getEtParts(date: Date): EtParts {
  const parts = ET_PARTS_FORMATTER.formatToParts(date);
  const map = new Map(parts.map((p) => [p.type, p.value]));

  const weekdayRaw = map.get("weekday") ?? "Mon";
  const weekdayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  const year = Number(map.get("year"));
  const month = Number(map.get("month"));
  const day = Number(map.get("day"));

  return {
    year,
    month,
    day,
    hour: Number(map.get("hour")),
    minute: Number(map.get("minute")),
    dayOfWeek: weekdayMap[weekdayRaw] ?? 1,
    dateKey: keyFromParts(year, month, day),
  };
}

function getScheduledSession(nowEt: EtParts): SessionContext {
  const minutes = nowEt.hour * 60 + nowEt.minute;
  const regularCloseMinuteToday = getRegularCloseMinute(nowEt.dateKey);

  if (!isTradingDay(nowEt.dateKey)) {
    return { nowEt, scheduledSession: "closed", regularCloseMinuteToday };
  }

  if (minutes >= REGULAR_OPEN_MIN && minutes < regularCloseMinuteToday) {
    return { nowEt, scheduledSession: "regular", regularCloseMinuteToday };
  }

  if (minutes >= PRE_MARKET_OPEN_MIN && minutes < REGULAR_OPEN_MIN) {
    return { nowEt, scheduledSession: "pre", regularCloseMinuteToday };
  }

  if (minutes >= regularCloseMinuteToday && minutes < AFTER_HOURS_CLOSE_MIN) {
    return { nowEt, scheduledSession: "post", regularCloseMinuteToday };
  }

  return { nowEt, scheduledSession: "closed", regularCloseMinuteToday };
}

function normalizeProviderSession(session: string | null | undefined): MarketSession | null {
  if (!session) return null;
  const s = session.trim().toUpperCase() as ProviderMarketState;
  if (s === "REGULAR") return "regular";
  if (s === "PRE" || s === "PREPRE") return "pre";
  if (s === "POST" || s === "POSTPOST") return "post";
  if (s === "CLOSED") return "closed";
  return null;
}

function findPreviousTradingDay(dateKey: string): string {
  let probe = shiftDateKey(dateKey, -1);
  for (let i = 0; i < 10; i++) {
    if (isTradingDay(probe)) return probe;
    probe = shiftDateKey(probe, -1);
  }
  return dateKey;
}

function getTimeZoneOffsetMs(date: Date, timeZone: string): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const parts = dtf.formatToParts(date);
  const map = new Map(parts.map((p) => [p.type, p.value]));
  const asUtc = Date.UTC(
    Number(map.get("year")),
    Number(map.get("month")) - 1,
    Number(map.get("day")),
    Number(map.get("hour")),
    Number(map.get("minute")),
    Number(map.get("second")),
  );

  return asUtc - date.getTime();
}

function zonedDateTimeToDate(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string,
): Date {
  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
  const offsetMs = getTimeZoneOffsetMs(utcGuess, timeZone);
  return new Date(utcGuess.getTime() - offsetMs);
}

function buildLastCloseDate(scheduled: SessionContext): Date {
  const nowMinutes = scheduled.nowEt.hour * 60 + scheduled.nowEt.minute;
  const { year, month, day } = scheduled.nowEt;

  if (scheduled.scheduledSession === "post") {
    return zonedDateTimeToDate(year, month, day, Math.floor(scheduled.regularCloseMinuteToday / 60), scheduled.regularCloseMinuteToday % 60, ET_TIMEZONE);
  }

  if (scheduled.scheduledSession === "closed" && isTradingDay(scheduled.nowEt.dateKey) && nowMinutes >= AFTER_HOURS_CLOSE_MIN) {
    return zonedDateTimeToDate(year, month, day, Math.floor(scheduled.regularCloseMinuteToday / 60), scheduled.regularCloseMinuteToday % 60, ET_TIMEZONE);
  }

  const previousTradingDateKey = findPreviousTradingDay(scheduled.nowEt.dateKey);
  const { year: py, month: pm, day: pd } = parseDateKey(previousTradingDateKey);
  const prevClose = getRegularCloseMinute(previousTradingDateKey);
  return zonedDateTimeToDate(py, pm, pd, Math.floor(prevClose / 60), prevClose % 60, ET_TIMEZONE);
}

function hasExtendedQuoteForCurrentSession(
  scheduled: SessionContext,
  quoteTimestamp: number | null,
): boolean {
  if (!quoteTimestamp) return false;

  const quoteEt = getEtParts(new Date(quoteTimestamp * 1000));
  if (quoteEt.dateKey !== scheduled.nowEt.dateKey) return false;

  const quoteMinutes = quoteEt.hour * 60 + quoteEt.minute;
  if (scheduled.scheduledSession === "pre") {
    return quoteMinutes >= PRE_MARKET_OPEN_MIN && quoteMinutes < REGULAR_OPEN_MIN;
  }

  if (scheduled.scheduledSession === "post") {
    return quoteMinutes >= scheduled.regularCloseMinuteToday && quoteMinutes < AFTER_HOURS_CLOSE_MIN;
  }

  return false;
}

function labelForSession(session: MarketSession): MarketSessionStatus["label"] {
  if (session === "regular") return "Market Open";
  if (session === "pre") return "Pre-Market";
  if (session === "post") return "After Hours";
  return "Market Closed";
}

export function getMarketSessionStatus({
  marketState,
  session,
  quoteTimestamp,
  regularMarketTime,
  now = new Date(),
}: MarketSessionInput): MarketSessionStatus {
  const effectiveQuoteTimestamp = quoteTimestamp ?? regularMarketTime ?? null;
  const quoteDate = effectiveQuoteTimestamp ? new Date(effectiveQuoteTimestamp * 1000) : null;

  const scheduled = getScheduledSession(getEtParts(now));
  const providerSession = normalizeProviderSession(session) ?? normalizeProviderSession(marketState);

  let resolvedSession: MarketSession;
  if (providerSession && providerSession !== "closed") {
    resolvedSession = providerSession;
  } else if (
    (scheduled.scheduledSession === "pre" || scheduled.scheduledSession === "post")
    && hasExtendedQuoteForCurrentSession(scheduled, effectiveQuoteTimestamp)
  ) {
    resolvedSession = scheduled.scheduledSession;
  } else if (scheduled.scheduledSession === "regular") {
    resolvedSession = "regular";
  } else {
    resolvedSession = "closed";
  }

  const lastCloseDate = buildLastCloseDate(scheduled);

  // Build the canonical close time string in ET (e.g. "4:00 PM ET" or "1:00 PM ET")
  const closeMin = scheduled.regularCloseMinuteToday;
  const closeHour24 = Math.floor(closeMin / 60);
  const closeMinute = closeMin % 60;
  const closeHour12 = closeHour24 > 12 ? closeHour24 - 12 : closeHour24;
  const closeAmPm = closeHour24 >= 12 ? "PM" : "AM";
  const regularCloseTimeET = `${closeHour12}:${String(closeMinute).padStart(2, "0")} ${closeAmPm} ET`;

  return {
    session: resolvedSession,
    label: labelForSession(resolvedSession),
    quoteDate,
    quoteTimeText: quoteDate
      ? quoteDate.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })
      : null,
    lastCloseDate,
    lastCloseText: lastCloseDate.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }),
    regularCloseTimeET,
  };
}

export function isLiveMarketSessionNow(now = new Date()): boolean {
  const { scheduledSession } = getScheduledSession(getEtParts(now));
  return scheduledSession === "pre" || scheduledSession === "regular" || scheduledSession === "post";
}

export function isRegularMarketSessionNow(now = new Date()): boolean {
  const { scheduledSession } = getScheduledSession(getEtParts(now));
  return scheduledSession === "regular";
}

export function formatLocalTimestamp(timestampSec: number, withDate = false): string {
  const date = new Date(timestampSec * 1000);
  if (withDate) {
    return date.toLocaleString(undefined, {
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatHistoryTimestamp(timestampSec: number, range: string): string {
  const date = new Date(timestampSec * 1000);

  if (range === "1d") {
    return date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  }

  if (range === "5d") {
    return date.toLocaleString(undefined, {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (range === "1m" || range === "6m") {
    return date.toLocaleDateString(undefined, { month: "2-digit", day: "2-digit" });
  }

  if (range === "1y") {
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  return date.toLocaleDateString(undefined, { year: "numeric", month: "short" });
}
