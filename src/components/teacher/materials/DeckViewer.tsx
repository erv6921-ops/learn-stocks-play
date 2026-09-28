// Presentation viewer/editor. Slide list on the left, editable fields on the
// right (heading, bullets, speaker notes). "Present" opens a fullscreen mode
// navigable with arrow keys; "Download .pptx" exports via pptxgenjs.

import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { DeckContent, Slide } from "@/types/materials"
import { downloadDeckPptx } from "@/lib/materials/pptx"
import {
  Play,
  Download,
  Save,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  Loader2,
} from "lucide-react"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  deck: DeckContent
  onDeckChange: (deck: DeckContent) => void
  onSave: () => void
  saving?: boolean
}

const KIND_LABEL: Record<Slide["kind"], string> = {
  agenda: "Agenda",
  title: "Title",
  content: "Content",
  example: "Example",
  check: "Check",
  recap: "Recap",
}

export function DeckViewer({ open, onOpenChange, deck, onDeckChange, onSave, saving }: Props) {
  const { t } = useTranslation()
  const [current, setCurrent] = useState(0)
  const [presenting, setPresenting] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const slide = deck.slides[current]

  const patchSlide = (patch: Partial<Slide>) => {
    const slides = deck.slides.map((s, i) => (i === current ? { ...s, ...patch } : s))
    onDeckChange({ ...deck, slides })
  }
  const deleteSlide = () => {
    if (deck.slides.length <= 1) return
    const slides = deck.slides.filter((_, i) => i !== current)
    onDeckChange({ ...deck, slides })
    setCurrent((c) => Math.max(0, Math.min(c, slides.length - 1)))
  }

  const download = async () => {
    setDownloading(true)
    try {
      await downloadDeckPptx(deck)
    } finally {
      setDownloading(false)
    }
  }

  // Present mode: keyboard navigation.
  useEffect(() => {
    if (!presenting) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault()
        setCurrent((c) => Math.min(deck.slides.length - 1, c + 1))
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault()
        setCurrent((c) => Math.max(0, c - 1))
      } else if (e.key === "Escape") {
        setPresenting(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [presenting, deck.slides.length])

  const startPresent = () => {
    setPresenting(true)
    // Best-effort real fullscreen; harmless if the browser refuses.
    document.documentElement.requestFullscreen?.().catch(() => {})
  }
  const stopPresent = () => {
    setPresenting(false)
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {})
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-5xl w-[95vw] h-[85vh] p-0 flex flex-col gap-0">
          <div className="flex items-center gap-2 border-b px-4 py-3">
            <Input
              value={deck.title}
              onChange={(e) => onDeckChange({ ...deck, title: e.target.value })}
              className="font-semibold max-w-sm"
            />
            <div className="flex-1" />
            <Button size="sm" variant="outline" onClick={startPresent}>
              <Play className="h-4 w-4 mr-1.5" />
              {t("materials.present")}
            </Button>
            <Button size="sm" variant="outline" onClick={download} disabled={downloading}>
              {downloading ? <Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> : <Download className="h-4 w-4 mr-1.5" />}
              {t("materials.downloadPptx")}
            </Button>
            <Button size="sm" onClick={onSave} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> : <Save className="h-4 w-4 mr-1.5" />}
              {t("common.save")}
            </Button>
          </div>

          <div className="flex flex-1 min-h-0">
            {/* Slide list */}
            <ul className="w-56 shrink-0 overflow-y-auto border-r p-2 space-y-1">
              {deck.slides.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => setCurrent(i)}
                    className={cn(
                      "w-full text-left rounded-md px-2.5 py-2 text-xs transition-colors",
                      i === current ? "bg-primary/10 border border-primary/40" : "hover:bg-muted",
                    )}
                  >
                    <span className="block text-[10px] uppercase tracking-wide text-muted-foreground">
                      {i + 1} · {KIND_LABEL[s.kind]}
                    </span>
                    <span className="block truncate font-medium">{s.heading || "—"}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Editor */}
            {slide && (
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">
                    {KIND_LABEL[slide.kind]}
                    {slide.lessonTitle ? ` · ${slide.lessonTitle}` : ""}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive"
                    onClick={deleteSlide}
                    disabled={deck.slides.length <= 1}
                  >
                    <Trash2 className="h-4 w-4 mr-1.5" />
                    {t("materials.deleteSlide")}
                  </Button>
                </div>
                <div>
                  <Label className="text-xs">{t("materials.heading")}</Label>
                  <Input value={slide.heading} onChange={(e) => patchSlide({ heading: e.target.value })} />
                </div>
                <div>
                  <Label className="text-xs">{t("materials.bullets")}</Label>
                  <Textarea
                    value={slide.bullets.join("\n")}
                    onChange={(e) => patchSlide({ bullets: e.target.value.split("\n") })}
                    rows={6}
                    className="font-mono text-sm"
                  />
                  <p className="text-[11px] text-muted-foreground mt-1">{t("materials.onePerLine")}</p>
                </div>
                <div>
                  <Label className="text-xs">{t("materials.speakerNotes")}</Label>
                  <Textarea
                    value={slide.notes}
                    onChange={(e) => patchSlide({ notes: e.target.value })}
                    rows={4}
                  />
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Fullscreen present mode */}
      {presenting && slide && (
        <div className="fixed inset-0 z-[100] bg-slate-950 text-white flex flex-col">
          <div className="flex-1 flex flex-col justify-center px-16 py-12 max-w-6xl mx-auto w-full">
            <h1 className={cn("font-bold mb-8", slide.kind === "agenda" || slide.kind === "title" || slide.kind === "recap" ? "text-6xl" : "text-5xl")}>
              {slide.heading}
            </h1>
            <ul className="space-y-4">
              {slide.bullets.map((b, i) => (
                <li key={i} className="text-3xl leading-snug flex gap-3">
                  <span className="text-primary">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            {slide.notes && (
              <div className="mt-10 border-t border-white/20 pt-4 text-lg text-white/60 max-h-32 overflow-y-auto">
                <span className="uppercase text-xs tracking-widest text-white/40 block mb-1">
                  {t("materials.speakerNotes")}
                </span>
                {slide.notes}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between px-8 py-4 bg-black/40">
            <span className="text-sm text-white/60">
              {current + 1} / {deck.slides.length}
            </span>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/10" onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}>
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/10" onClick={() => setCurrent((c) => Math.min(deck.slides.length - 1, c + 1))} disabled={current === deck.slides.length - 1}>
                <ChevronRight className="h-6 w-6" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/10 ml-4" onClick={stopPresent}>
                <X className="h-5 w-5 mr-1.5" />
                {t("materials.exitPresent")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DeckViewer
