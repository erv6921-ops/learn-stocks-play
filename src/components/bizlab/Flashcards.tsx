import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, RotateCw, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VocabTerm } from "@/data/bizLab"
import { useBizLabStore } from "@/stores/bizLabStore"

/**
 * Vocabulary flashcards. Tap a card to flip between the term and its definition
 * (rendered inline). Viewing a card records the term in the store so the unit
 * can show flashcard progress.
 */
export default function Flashcards({ terms }: { terms: VocabTerm[] }) {
  const { t } = useTranslation()
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const viewTerm = useBizLabStore(s => s.viewTerm)
  const viewedTerms = useBizLabStore(s => s.viewedTerms)

  const current = terms[idx]
  const viewedCount = terms.filter(t => viewedTerms.includes(t.term)).length

  const go = (dir: number) => {
    setFlipped(false)
    setIdx(prev => (prev + dir + terms.length) % terms.length)
  }

  const flip = () => {
    if (!flipped) viewTerm(current.term)
    setFlipped(f => !f)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t("bizlab.flashcards.cardCount", { current: idx + 1, total: terms.length })}
        </span>
        <span className="text-xs font-semibold text-primary">
          {t("bizlab.flashcards.learnedCount", { count: viewedCount, total: terms.length })}
        </span>
      </div>

      <div className="relative" style={{ perspective: 1200 }}>
        <button
          onClick={flip}
          className="block w-full text-left"
          aria-label={t("bizlab.flashcards.flipAria", { term: current.term })}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${idx}-${flipped}`}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="min-h-[170px] rounded-2xl border-2 border-border bg-card p-6 shadow-card flex flex-col justify-center"
            >
              {!flipped ? (
                <div className="text-center">
                  <Sparkles className="w-6 h-6 mx-auto text-gold mb-3" />
                  <h4 className="font-display text-2xl font-extrabold">{current.term}</h4>
                  <p className="text-xs text-muted-foreground mt-3">{t("bizlab.flashcards.tapToReveal")}</p>
                </div>
              ) : (
                <div>
                  <h4 className="font-display text-lg font-bold text-primary mb-2">{current.term}</h4>
                  <p className="text-sm text-foreground leading-relaxed">{current.definition}</p>
                  {current.example && (
                    <p className="text-sm text-muted-foreground italic mt-3 border-l-2 border-primary/40 pl-3">
                      {t("bizlab.flashcards.example", { example: current.example })}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      <div className="flex items-center justify-between mt-4">
        <Button variant="outline" size="sm" onClick={() => go(-1)}>
          <ChevronLeft className="w-4 h-4 mr-1" /> {t("bizlab.flashcards.prev")}
        </Button>
        <Button variant="ghost" size="sm" onClick={flip}>
          <RotateCw className="w-4 h-4 mr-1" /> {t("bizlab.flashcards.flip")}
        </Button>
        <Button variant="outline" size="sm" onClick={() => go(1)}>
          {t("bizlab.flashcards.next")} <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}
