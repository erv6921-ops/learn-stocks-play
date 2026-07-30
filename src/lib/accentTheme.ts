// Accent themes - swap the app's brand/primary color family without touching
// financial semantics (gains stay green, losses stay red, coins stay gold).
// The chosen id is written to <html data-accent="..."> and matching CSS
// variable overrides live in index.css. Persisted per-device in localStorage.

export type AccentId = "green" | "blue" | "red" | "yellow";

export interface AccentTheme {
  id: AccentId;
  label: string;
  // Representative swatch colors for the picker (mid + deep of the family).
  swatch: string;
  swatchDeep: string;
}

export const ACCENT_THEMES: AccentTheme[] = [
  { id: "green",  label: "Emerald", swatch: "#1D9E75", swatchDeep: "#0f2d1e" },
  { id: "blue",   label: "Ocean",   swatch: "#2E7FD6", swatchDeep: "#0f2438" },
  { id: "red",    label: "Ruby",    swatch: "#D5473F", swatchDeep: "#2e0b0b" },
  { id: "yellow", label: "Amber",   swatch: "#D99A00", swatchDeep: "#2e2208" },
];

const STORAGE_KEY = "investiplay_accent";
const DEFAULT: AccentId = "green";

export function getAccent(): AccentId {
  if (typeof window === "undefined") return DEFAULT;
  const stored = window.localStorage.getItem(STORAGE_KEY) as AccentId | null;
  return ACCENT_THEMES.some((t) => t.id === stored) ? (stored as AccentId) : DEFAULT;
}

export function applyAccent(id: AccentId) {
  if (typeof document === "undefined") return;
  // Green is the default declared on :root, so it needs no attribute.
  if (id === DEFAULT) document.documentElement.removeAttribute("data-accent");
  else document.documentElement.setAttribute("data-accent", id);
  try {
    window.localStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* ignore private-mode write failures */
  }
}

// Apply the stored choice as early as possible (called from main.tsx).
export function initAccent() {
  applyAccent(getAccent());
}
