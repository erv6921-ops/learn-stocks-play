// Export a deck to a .pptx file using pptxgenjs (browser-side download).

import type { DeckContent } from "@/types/materials"

const BRAND = "0E7C7B" // teal, matches the app's --brand family
const DARK = "1F2937"
const MUTED = "6B7280"

function safeName(title: string): string {
  const base = title.replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 60)
  return `${base || "presentation"}.pptx`
}

export async function downloadDeckPptx(deck: DeckContent): Promise<void> {
  // Dynamic import keeps pptxgenjs out of the main bundle until it's needed.
  const mod = await import("pptxgenjs")
  const PptxGenJS = mod.default
  const pptx = new PptxGenJS()
  pptx.layout = "LAYOUT_WIDE" // 13.33 x 7.5 in
  pptx.defineSlideMaster({
    title: "IP_MASTER",
    background: { color: "FFFFFF" },
    objects: [{ rect: { x: 0, y: 0, w: "100%", h: 0.25, fill: { color: BRAND } } }],
  })

  for (const s of deck.slides) {
    const slide = pptx.addSlide({ masterName: "IP_MASTER" })
    const isTitleLike = s.kind === "agenda" || s.kind === "title" || s.kind === "recap"

    slide.addText(s.heading || "", {
      x: 0.6,
      y: 0.5,
      w: 12.1,
      h: isTitleLike ? 1.2 : 0.9,
      fontSize: isTitleLike ? 32 : 26,
      bold: true,
      color: s.kind === "check" ? BRAND : DARK,
      fontFace: "Arial",
    })

    if (s.bullets.length) {
      slide.addText(
        s.bullets.map((b) => ({ text: b, options: { bullet: true, breakLine: true } })),
        {
          x: 0.8,
          y: isTitleLike ? 2.0 : 1.7,
          w: 11.7,
          h: 4.4,
          fontSize: 18,
          color: DARK,
          fontFace: "Arial",
          valign: "top",
          lineSpacingMultiple: 1.2,
        },
      )
    }

    if (s.lessonTitle) {
      slide.addText(s.lessonTitle, {
        x: 0.6,
        y: 6.9,
        w: 12.1,
        h: 0.4,
        fontSize: 11,
        italic: true,
        color: MUTED,
        fontFace: "Arial",
      })
    }

    if (s.notes) slide.addNotes(s.notes)
  }

  await pptx.writeFile({ fileName: safeName(deck.title) })
}
