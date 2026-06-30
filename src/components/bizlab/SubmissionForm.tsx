import React, { useState } from "react"
import { Upload, Check, Loader2, ExternalLink, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { SubmissionSpec } from "@/data/bizLab"
import { useBizLabStore } from "@/stores/bizLabStore"
import { useApp } from "@/contexts/AppContext"
import VideoEmbed from "./VideoEmbed"

function isValidUrl(v: string): boolean {
  try {
    const u = new URL(v.trim())
    return u.protocol === "http:" || u.protocol === "https:"
  } catch {
    return false
  }
}

/**
 * Renders one submission deliverable (elevator pitch, business plan, prototype,
 * logo, commercial, website, ...). Saves to `entrepreneurship_submissions` in
 * Supabase (upsert on user_id + submission_type), mirrors to the local store,
 * and pays the submission's InvestiCoin reward once. Falls back to a local-only
 * save if the database write fails so students never lose their work.
 */
export default function SubmissionForm({ spec }: { spec: SubmissionSpec }) {
  const cached = useBizLabStore(s => s.submissions[spec.submissionType])
  const cacheSubmission = useBizLabStore(s => s.cacheSubmission)
  const hasAwarded = useBizLabStore(s => s.hasAwarded)
  const markAwarded = useBizLabStore(s => s.markAwarded)
  const touchStreak = useBizLabStore(s => s.touchStreak)
  const { earnJeffs } = useApp()
  const { toast } = useToast()

  const initial: Record<string, string> = {}
  spec.fields.forEach(f => (initial[f.key] = cached?.content?.[f.key] ?? ""))
  if (spec.linkField) initial[spec.linkField.key] = cached?.content?.[spec.linkField.key] ?? cached?.link ?? ""

  const [values, setValues] = useState<Record<string, string>>(initial)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const awardKey = `submission:${spec.submissionType}`
  const saved = !!cached

  const set = (k: string, v: string) => setValues(prev => ({ ...prev, [k]: v }))

  const handleSubmit = async () => {
    setError(null)

    // Validate the primary external link, if present.
    const linkVal = spec.linkField ? (values[spec.linkField.key] ?? "").trim() : ""
    if (spec.linkField && linkVal && !isValidUrl(linkVal)) {
      setError(`Please enter a valid link (starting with http:// or https://).`)
      return
    }
    // Validate any url-list fields line by line.
    for (const f of spec.fields) {
      if (f.type === "url-list" && (values[f.key] ?? "").trim()) {
        const bad = (values[f.key] ?? "")
          .split(/\n+/)
          .map(s => s.trim())
          .filter(Boolean)
          .find(line => !isValidUrl(line))
        if (bad) {
          setError(`"${bad}" isn't a valid link. Put one valid link per line.`)
          return
        }
      }
    }

    setSaving(true)
    const content: Record<string, string> = {}
    spec.fields.forEach(f => (content[f.key] = (values[f.key] ?? "").trim()))
    if (spec.linkField) content[spec.linkField.key] = linkVal

    // Persist locally first so work is never lost.
    cacheSubmission(spec.submissionType, content, linkVal || undefined)
    touchStreak()

    let dbOk = true
    try {
      const { data } = await supabase.auth.getSession()
      const uid = data.session?.user?.id
      if (uid) {
        const { error: dbErr } = await supabase
          .from("entrepreneurship_submissions")
          .upsert(
            {
              user_id: uid,
              submission_type: spec.submissionType,
              content,
              link: linkVal || null,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "user_id,submission_type" },
          )
        if (dbErr) {
          console.error("[entrepreneurship_submissions upsert]", dbErr)
          dbOk = false
        }
      } else {
        dbOk = false
      }
    } catch (e) {
      console.error("[submission save]", e)
      dbOk = false
    }

    if (!hasAwarded(awardKey)) {
      earnJeffs(spec.xp, `Biz Lab: ${spec.title}`)
      markAwarded(awardKey)
    }

    setSaving(false)
    toast({
      title: saved ? "Submission updated!" : "Submission saved!",
      description: dbOk
        ? `+${spec.xp} InvestiCoins · synced to your account.`
        : "Saved on this device. (We'll sync when you're back online.)",
    })
  }

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <Upload className="w-4 h-4 text-primary" />
        <h4 className="font-display font-bold">{spec.title}</h4>
        {saved && (
          <span className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-success">
            <Check className="w-3.5 h-3.5" /> Submitted
          </span>
        )}
      </div>
      {spec.description && <p className="text-sm text-muted-foreground mb-4">{spec.description}</p>}

      <div className="space-y-3">
        {spec.fields.map(f => (
          <div key={f.key}>
            <label className="text-sm font-medium block mb-1.5">{f.label}</label>
            {f.type === "textarea" || f.type === "url-list" ? (
              <Textarea
                value={values[f.key] ?? ""}
                onChange={e => set(f.key, e.target.value)}
                placeholder={f.placeholder}
                rows={f.type === "url-list" ? 3 : 3}
              />
            ) : (
              <Input
                value={values[f.key] ?? ""}
                onChange={e => set(f.key, e.target.value)}
                placeholder={f.placeholder}
              />
            )}
            {f.help && <p className="text-xs text-muted-foreground mt-1">{f.help}</p>}
          </div>
        ))}

        {spec.linkField && (
          <div>
            <label className="text-sm font-medium block mb-1.5">{spec.linkField.label}</label>
            <Input
              value={values[spec.linkField.key] ?? ""}
              onChange={e => set(spec.linkField!.key, e.target.value)}
              placeholder={spec.linkField.placeholder}
              type="url"
            />
            {values[spec.linkField.key] && isValidUrl(values[spec.linkField.key]) && (
              spec.linkField.embed ? (
                <div className="mt-3">
                  <VideoEmbed url={values[spec.linkField.key]} />
                </div>
              ) : (
                <a
                  href={values[spec.linkField.key]}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
                >
                  <ExternalLink className="w-3 h-3" /> Preview link
                </a>
              )
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-start gap-2 mt-3 text-sm text-destructive">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <Button onClick={handleSubmit} variant="hero" className="mt-4" disabled={saving}>
        {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
        {saved ? "Update Submission" : `Submit (+${spec.xp})`}
      </Button>
    </div>
  )
}
