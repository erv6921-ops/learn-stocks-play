import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Wand2, Copy, Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export interface BizTemplate {
  title: string
  /** Friendly one-liner about what this template is for. */
  blurb: string
  /** Fill-in-the-blank scaffold the student copies and edits. */
  body: string
}

/**
 * A "need a head start?" template card. Collapsed by default so it never walls
 * off the page; expanding reveals a copy-paste fill-in-the-blank scaffold.
 * Makes the build steps feel like guided creation instead of a blank worksheet.
 */
export default function TemplateBox({ template }: { template: BizTemplate }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(template.body)
      setCopied(true)
      toast({ title: "Template copied!", description: "Paste it below and make it yours. ✏️" })
      setTimeout(() => setCopied(false), 1800)
    } catch {
      toast({ title: "Couldn't copy", description: "Select the text and copy manually.", variant: "destructive" })
    }
  }

  return (
    <div className="rounded-2xl border-2 border-dashed border-gold/40 bg-gold/[0.06] overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-2 px-4 py-3 text-left"
      >
        <Wand2 className="w-4 h-4 text-gold shrink-0" />
        <div className="flex-1 min-w-0">
          <span className="font-bold text-sm">{template.title}</span>
          <p className="text-xs text-muted-foreground">{template.blurb}</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 pb-4">
              <pre className="whitespace-pre-wrap text-sm bg-card border border-border rounded-xl p-3 font-mono leading-relaxed text-foreground/90">
{template.body}
              </pre>
              <Button onClick={copy} size="sm" variant="outline" className="mt-3">
                {copied ? <Check className="w-4 h-4 mr-1.5 text-success" /> : <Copy className="w-4 h-4 mr-1.5" />}
                {copied ? "Copied!" : "Copy template"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
