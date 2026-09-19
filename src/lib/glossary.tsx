import React, { createContext, useContext, useMemo } from "react"

// Per-lesson glossary for the green hover-definition highlights. The Intro to
// Business track has a static word list (src/data/introVocab); a generated
// lesson brings its own terms (the teacher-approved vocabulary extracted from
// the upload). Both feed HighlightedText the same way: a term -> definition
// map plus one regex that matches any term as a whole word.

export interface GlossaryEntry {
  term: string
  definition: string
}

export interface Glossary {
  byTerm: Map<string, GlossaryEntry>
  regex: RegExp
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

/** Builds a glossary from term/definition pairs; null when there are none. Longer terms match first. */
export function buildGlossary(entries: { term: string; definition: string }[] | null | undefined): Glossary | null {
  const clean = (entries ?? [])
    .map((e) => ({ term: (e.term ?? "").trim(), definition: (e.definition ?? "").trim() }))
    .filter((e) => e.term.length > 1 && e.definition.length > 0)
  if (clean.length === 0) return null
  const byTerm = new Map<string, GlossaryEntry>()
  for (const e of clean) {
    const key = e.term.toLowerCase()
    if (!byTerm.has(key)) byTerm.set(key, e)
    // Simple plural / singular so "tariffs" lights up for "tariff" and back.
    const alt = key.endsWith("s") ? key.slice(0, -1) : `${key}s`
    if (!byTerm.has(alt)) byTerm.set(alt, e)
  }
  const sorted = [...byTerm.keys()].sort((a, b) => b.length - a.length).map(escapeRe)
  return { byTerm, regex: new RegExp(`\\b(${sorted.join("|")})\\b`, "gi") }
}

const GlossaryContext = createContext<Glossary | null>(null)

/** Makes a lesson's vocabulary available to every HighlightedText below it. */
export function GlossaryProvider({ entries, children }: { entries: { term: string; definition: string }[] | null | undefined; children: React.ReactNode }) {
  const glossary = useMemo(() => buildGlossary(entries), [entries])
  return <GlossaryContext.Provider value={glossary}>{children}</GlossaryContext.Provider>
}

export function useGlossary(): Glossary | null {
  return useContext(GlossaryContext)
}
