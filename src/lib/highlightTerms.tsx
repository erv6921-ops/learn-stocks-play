import React from "react"

// Renders inline **term** markers as a bold green highlight, used to call out
// important vocabulary and definitions in lesson teaching text (Jeff's chat and
// the concept reader). Plain text with no markers renders unchanged, so this is
// safe to wrap around any lesson string.
export function HighlightedText({ text }: { text: string }) {
  if (!text.includes("**")) return <>{text}</>
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((part, i) => {
        const m = /^\*\*([^*]+)\*\*$/.exec(part)
        return m ? (
          <strong key={i} className="font-semibold text-success">{m[1]}</strong>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      })}
    </>
  )
}
