// DEV-only URL overrides for previewing the lesson path without matching real
// enrollment/progress. Gated on the same flag as the local auth bypass
// (import.meta.env.DEV, or a VITE_LOCAL_NOAUTH preview build) so they work in
// `npm run dev` / `npm run preview` yet never ship to production CI.
import { DEV_LOCAL_BYPASS } from "@/lib/devBypass";

function param(name: string): string | null {
  if (!DEV_LOCAL_BYPASS) return null;
  try {
    return new URLSearchParams(window.location.search).get(name);
  } catch {
    return null;
  }
}

/**
 * ?track=regular | gulliver_intro | biz_lab — forces which curriculum the path
 * renders, so the 35-unit personal-finance climb can be previewed on the dev
 * (gulliver) user. Returns null when unset/disabled.
 */
export function devTrackOverride(): string | null {
  const raw = param("track");
  if (!raw) return null;
  const v = raw.toLowerCase();
  if (v === "regular" || v === "personal-finance" || v === "pf") return "regular";
  if (v === "gulliver" || v === "gulliver_intro" || v === "gulliver-intro") return "gulliver_intro";
  if (v === "biz_lab" || v === "biz-lab") return "biz_lab";
  return raw;
}

/** ?progress=N — forces the current node to index N (clamped to [0, total]). */
export function devProgressOverride(total: number): number | null {
  const raw = param("progress");
  if (raw == null) return null;
  const n = parseInt(raw, 10);
  if (Number.isNaN(n)) return null;
  return Math.max(0, Math.min(total, n));
}
