// Floating "Report a bug" button, mounted once globally so it appears on every
// page. Collects a short title + description and files it as a GitHub issue via
// the report-bug edge function (which is deployed with --no-verify-jwt, so this
// works for signed-out users too). Route + user agent are captured automatically
// to help reproduce the report.

import { useState } from "react"
import { useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Bug, Loader2, Send } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { getRecentErrors } from "@/lib/errorLog"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog"

export default function ReportBugButton() {
  const location = useLocation()
  const { toast } = useToast()
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const reset = () => { setTitle(""); setDescription("") }

  const submit = async () => {
    if (!title.trim()) {
      toast({ title: t("bugReport.toastAddTitle"), description: t("bugReport.toastAddTitleDesc"), variant: "destructive" })
      return
    }
    setSubmitting(true)
    try {
      const { data, error } = await supabase.functions.invoke("report-bug", {
        body: {
          title: title.trim(),
          description: description.trim(),
          route: location.pathname + location.search,
          userAgent: navigator.userAgent,
          consoleErrors: getRecentErrors(),
        },
      })
      if (error || (data as { error?: string })?.error) {
        throw new Error(error?.message || (data as { error?: string })?.error || t("common.somethingWentWrong"))
      }
      toast({
        title: t("bugReport.toastReported"),
        description: (data as { number?: number })?.number
          ? t("bugReport.toastLoggedAs", { number: (data as { number: number }).number })
          : t("bugReport.toastGotIt"),
      })
      reset()
      setOpen(false)
    } catch (err) {
      toast({
        title: t("bugReport.toastFailed"),
        description: err instanceof Error ? err.message : t("bugReport.toastTryAgain"),
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* Bottom-left so it never collides with the bottom-right Jeff widget.
          z-40 keeps it under modals/toasts. Nudged up on mobile to clear the
          bottom tab bar, plus the safe-area inset so it doesn't sit under
          iOS Safari's bottom toolbar/home indicator. */}
      <button
        type="button"
        aria-label={t("bugReport.button")}
        onClick={() => setOpen(true)}
        className="fixed left-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] md:bottom-6 z-40 flex items-center gap-1.5 rounded-full border border-border bg-card/95 px-3 py-2 text-xs font-semibold text-muted-foreground shadow-card backdrop-blur transition-colors hover:text-foreground hover:border-primary/40"
      >
        <Bug className="h-4 w-4" />
        <span className="hidden sm:inline">{t("bugReport.button")}</span>
      </button>

      <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) reset() }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bug className="h-5 w-5 text-primary" /> {t("bugReport.title")}
            </DialogTitle>
            <DialogDescription>
              {t("bugReport.description")}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-1">
            <div className="space-y-1.5">
              <Label htmlFor="bug-title">{t("bugReport.whatWentWrong")}</Label>
              <Input
                id="bug-title"
                placeholder={t("bugReport.titlePlaceholder")}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={120}
                autoFocus
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bug-desc">{t("bugReport.details")} <span className="text-muted-foreground font-normal">{t("bugReport.optional")}</span></Label>
              <Textarea
                id="bug-desc"
                placeholder={t("bugReport.detailsPlaceholder")}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                maxLength={2000}
              />
            </div>
            <p className="text-[11px] text-muted-foreground">
              {t("bugReport.autoInclude")}
            </p>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)} disabled={submitting}>{t("common.cancel")}</Button>
            <Button onClick={submit} disabled={submitting || !title.trim()} className="gap-1.5">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {submitting ? t("bugReport.sending") : t("bugReport.send")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
