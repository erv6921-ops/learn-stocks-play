import React, { useRef, useState } from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { VOCAB_BY_TERM, VOCAB_REGEX, type VocabWord } from "@/data/introVocab"

// Renders inline **term** markers as a bold green highlight AND auto-highlights
// known Intro-to-Business vocabulary in the same green. Vocab words are tappable
// (and hoverable on desktop): opening one shows a little popover with its plain-
// language definition. Used in Jeff's chat and the concept reader. Plain text
// with no markers or vocab renders unchanged, so this is safe to wrap around any
// lesson string.

// A green, tappable vocab word. Opens a definition popover on hover (desktop)
// and on tap/click (touch), so it works the same everywhere.
function VocabTerm({ word, children }: { word: VocabWord; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = () => {
    if (hoverTimer.current) { clearTimeout(hoverTimer.current); hoverTimer.current = null }
  }

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          onMouseEnter={() => { clearTimer(); setOpen(true) }}
          onMouseLeave={() => { clearTimer(); hoverTimer.current = setTimeout(() => setOpen(false), 120) }}
          className="inline align-baseline p-0 m-0 bg-transparent border-0 font-semibold text-success underline decoration-dotted decoration-success/50 underline-offset-2 cursor-pointer hover:decoration-success focus:outline-none"
        >
          {children}
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="center"
          sideOffset={6}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onMouseEnter={clearTimer}
          onMouseLeave={() => setOpen(false)}
          className="z-[70] w-64 rounded-xl border border-border bg-popover p-3.5 text-popover-foreground shadow-lg outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95"
        >
          <p className="font-display font-bold text-[13px] text-success leading-tight mb-1.5">{word.term}</p>
          <p className="text-[13px] leading-snug text-foreground">{word.definition}</p>
          <PopoverPrimitive.Arrow className="fill-popover" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

// Split a run of plain text on vocab terms, wrapping the FIRST occurrence of
// each term (tracked via `seen`) in a tappable VocabTerm. Later repeats of the
// same word render as plain text so the lesson doesn't turn into a wall of green.
function renderWithVocab(text: string, keyBase: string, seen: Set<string>): React.ReactNode[] {
  const parts = text.split(VOCAB_REGEX)
  return parts.map((part, i) => {
    const word = VOCAB_BY_TERM.get(part.toLowerCase())
    if (word && !seen.has(word.term)) {
      seen.add(word.term)
      return <VocabTerm key={`${keyBase}-${i}`} word={word}>{part}</VocabTerm>
    }
    return <React.Fragment key={`${keyBase}-${i}`}>{part}</React.Fragment>
  })
}

// `vocab` opts a text block into auto-highlighting the Intro-to-Business
// glossary (Gulliver Intro lessons only). Left off, only explicit **markers**
// are highlighted, so the regular personal-finance course is unchanged.
export function HighlightedText({ text, vocab = false }: { text: string; vocab?: boolean }) {
  // Track which vocab terms have already been highlighted in this block so each
  // one lights up only once (across both **bold** markers and plain text).
  const seen = new Set<string>()
  const renderPlain = (t: string, keyBase: string): React.ReactNode =>
    vocab ? <>{renderWithVocab(t, keyBase, seen)}</> : <>{t}</>

  if (!text.includes("**")) return renderPlain(text, "v")

  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((part, i) => {
        const m = /^\*\*([^*]+)\*\*$/.exec(part)
        if (m) {
          const word = vocab ? VOCAB_BY_TERM.get(m[1].toLowerCase()) : undefined
          if (word && !seen.has(word.term)) {
            seen.add(word.term)
            return <VocabTerm key={i} word={word}>{m[1]}</VocabTerm>
          }
          // In vocab mode (Gulliver Intro) the ONLY green words are the tappable
          // glossary terms, so non-vocab **markers** render as plain bold - never
          // green - to avoid confusing kids with green words they can't tap.
          return vocab
            ? <strong key={i} className="font-semibold">{m[1]}</strong>
            : <strong key={i} className="font-semibold text-success">{m[1]}</strong>
        }
        return <React.Fragment key={i}>{renderPlain(part, `p${i}`)}</React.Fragment>
      })}
    </>
  )
}
