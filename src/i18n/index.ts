// i18n bootstrap (phase 1: UI chrome only). Imported once from main.tsx.
//
// Feature flag: VITE_ENABLE_I18N. When it is anything other than "true" the app
// is pinned to English, the browser/localStorage detector is skipped and the
// language selector on the Settings page is hidden - so this can ship dark.
//
// Curriculum content, lesson text and generated questions stored in Supabase
// are NOT translated here; that is a separate phase.

import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import en from "./locales/en.json"
import es from "./locales/es.json"

export const I18N_ENABLED = import.meta.env.VITE_ENABLE_I18N === "true"
export const LANGUAGE_STORAGE_KEY = "investiplay_lang"
export const SUPPORTED_LANGUAGES = ["en", "es"] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

export const resources = {
  en: { translation: en },
  es: { translation: es },
} as const

const instance = I18N_ENABLED ? i18n.use(LanguageDetector) : i18n

void instance.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  supportedLngs: [...SUPPORTED_LANGUAGES],
  // Flag off: force English regardless of what the browser/localStorage says.
  ...(I18N_ENABLED ? {} : { lng: "en" }),
  detection: {
    order: ["localStorage", "navigator"],
    lookupLocalStorage: LANGUAGE_STORAGE_KEY,
    caches: ["localStorage"],
  },
  interpolation: { escapeValue: false },
  returnNull: false,
})

/** Switch the UI language and remember it in localStorage. */
export function setLanguage(lng: SupportedLanguage) {
  try { localStorage.setItem(LANGUAGE_STORAGE_KEY, lng) } catch { /* private mode */ }
  return i18n.changeLanguage(lng)
}

/** The active UI language, narrowed to one we ship. */
export function currentLanguage(): SupportedLanguage {
  const lng = (i18n.resolvedLanguage ?? i18n.language ?? "en").slice(0, 2)
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(lng) ? (lng as SupportedLanguage) : "en"
}

export default i18n
