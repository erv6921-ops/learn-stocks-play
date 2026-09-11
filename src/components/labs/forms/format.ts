// Input masking + grading normalization for IRS form fields.
import type { IRSFieldKind } from "./types"

/** Keep only digits, cap length (9 for SSN/EIN). */
function digits(v: string, max = 9): string {
  return v.replace(/\D/g, "").slice(0, max)
}

/** Mask a partial SSN as XXX-XX-XXXX while typing. */
export function maskSSN(v: string): string {
  const d = digits(v, 9)
  const a = d.slice(0, 3)
  const b = d.slice(3, 5)
  const c = d.slice(5, 9)
  return [a, b, c].filter(Boolean).join("-")
}

/** Mask a partial EIN as XX-XXXXXXX while typing. */
export function maskEIN(v: string): string {
  const d = digits(v, 9)
  const a = d.slice(0, 2)
  const b = d.slice(2, 9)
  return [a, b].filter(Boolean).join("-")
}

/**
 * Format a currency field as the student types: allow digits + one decimal
 * point, add thousands separators to the whole-dollar part. Kept lenient so
 * grading (which strips formatting) is what actually decides correctness.
 */
export function formatCurrency(v: string): string {
  // Strip everything except digits and the first decimal point.
  let cleaned = v.replace(/[^\d.]/g, "")
  const firstDot = cleaned.indexOf(".")
  if (firstDot !== -1) {
    cleaned =
      cleaned.slice(0, firstDot + 1) +
      cleaned.slice(firstDot + 1).replace(/\./g, "")
  }
  const [whole, dec] = cleaned.split(".")
  const wholeFmt = whole ? Number(whole).toLocaleString("en-US") : ""
  if (cleaned.includes(".")) return `${wholeFmt}.${(dec ?? "").slice(0, 2)}`
  return wholeFmt
}

export function maskField(kind: IRSFieldKind, v: string): string {
  switch (kind) {
    case "ssn":
      return maskSSN(v)
    case "ein":
      return maskEIN(v)
    case "currency":
      return formatCurrency(v)
    default:
      return v
  }
}

/** Normalize a value to a canonical form for exact grading comparison. */
export function normalize(kind: IRSFieldKind, v: string): string {
  const s = (v ?? "").trim()
  switch (kind) {
    case "ssn":
    case "ein":
      return s.replace(/\D/g, "")
    case "currency": {
      const n = Number(s.replace(/[^\d.-]/g, ""))
      return Number.isFinite(n) ? n.toFixed(2) : ""
    }
    case "checkbox":
    case "radio":
      return s.toLowerCase()
    default:
      return s.replace(/\s+/g, " ").toLowerCase()
  }
}

/** Are two values equal for grading purposes? */
export function valuesMatch(kind: IRSFieldKind, a: string, b: string): boolean {
  // A blank entry is never correct — even when the expected value is "0", the
  // student has to actually enter 0 rather than leave the box empty. (Without
  // this, "" normalizes to "0.00" for currency and would auto-pass a $0 box.)
  if (!a || a.trim() === "") return false
  const na = normalize(kind, a)
  const nb = normalize(kind, b)
  return na !== "" && na === nb
}
