import React, { useMemo, useState } from "react"
import { BookMarked, Search } from "lucide-react"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger,
} from "@/components/ui/dialog"
import { INTRO_VOCAB } from "@/data/introVocab"

// The Vocab glossary for Gulliver Intro students: a button that opens a
// searchable list of every business term Jeff highlights in his lessons, with
// its plain-language definition and the chapter it comes from. Same green words
// students tap inside a lesson, gathered in one place to review.
export default function VocabGlossary() {
  const [query, setQuery] = useState("")

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = q
      ? INTRO_VOCAB.filter(v => v.term.toLowerCase().includes(q) || v.definition.toLowerCase().includes(q))
      : INTRO_VOCAB
    // Alphabetical for easy scanning in the glossary.
    return [...list].sort((a, b) => a.term.localeCompare(b.term))
  }, [query])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="w-full rounded-[20px] px-5 py-4 flex items-center gap-3 text-left press-scale transition-transform hover:-translate-y-0.5"
          style={{ background: "rgba(var(--brand-rgb),0.1)", border: "1px solid rgba(var(--brand-rgb),0.22)" }}
        >
          <span
            className="shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{ background: "var(--brand)" }}
          >
            <BookMarked className="w-5 h-5 text-white" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-display font-extrabold text-[15px] text-foreground leading-tight">
              Vocab glossary
            </span>
            <span className="block text-[13px] text-muted-foreground mt-0.5">
              {INTRO_VOCAB.length} business terms Jeff teaches — tap to review
            </span>
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-lg max-h-[85vh] p-0 overflow-hidden flex flex-col">
        <DialogHeader className="px-5 pt-5 pb-3 shrink-0">
          <DialogTitle className="flex items-center gap-2 font-display">
            <BookMarked className="w-5 h-5 text-success" /> Vocab glossary
          </DialogTitle>
          <DialogDescription>
            Every term Jeff highlights in green. Tap a green word in a lesson to see its
            definition, or look one up here.
          </DialogDescription>
          {/* Search */}
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search terms…"
              className="w-full rounded-xl border border-border bg-background pl-9 pr-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
        </DialogHeader>

        <div className="px-5 pb-5 overflow-y-auto space-y-2.5">
          {results.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6 text-center">No terms match "{query}".</p>
          ) : (
            results.map(v => (
              <div
                key={v.term}
                className="rounded-2xl p-3.5"
                style={{ background: "hsl(45 10% 96%)", border: "1px solid hsl(45 10% 88%)" }}
              >
                <div className="mb-1">
                  <span className="font-display font-bold text-[14px] text-success">{v.term}</span>
                </div>
                <p className="text-[13px] leading-snug text-foreground/80">{v.definition}</p>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
