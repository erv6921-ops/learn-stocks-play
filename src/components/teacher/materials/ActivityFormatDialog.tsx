// Small dialog: pick one class-activity format, then generate.

import React from "react"
import { useTranslation } from "react-i18next"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import type { ActivityFormat } from "@/types/materials"
import { Users, Layers, Ticket } from "lucide-react"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  onPick: (format: ActivityFormat) => void
}

export function ActivityFormatDialog({ open, onOpenChange, onPick }: Props) {
  const { t } = useTranslation()
  const options: { format: ActivityFormat; icon: React.ReactNode }[] = [
    { format: "team-challenge", icon: <Users className="h-5 w-5" /> },
    { format: "decision-cards", icon: <Layers className="h-5 w-5" /> },
    { format: "exit-ticket", icon: <Ticket className="h-5 w-5" /> },
  ]
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("materials.pickFormatTitle")}</DialogTitle>
          <DialogDescription>{t("materials.pickFormatDesc")}</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          {options.map((o) => (
            <button
              key={o.format}
              type="button"
              onClick={() => onPick(o.format)}
              className={cn(
                "w-full flex items-start gap-3 rounded-lg border-2 border-border p-3 text-left transition",
                "hover:border-primary/50 hover:bg-primary/5",
              )}
            >
              <span className="mt-0.5 text-primary shrink-0">{o.icon}</span>
              <span className="min-w-0">
                <span className="block font-semibold text-sm">{t(`materials.format.${o.format}.title`)}</span>
                <span className="block text-xs text-muted-foreground">{t(`materials.format.${o.format}.desc`)}</span>
              </span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ActivityFormatDialog
