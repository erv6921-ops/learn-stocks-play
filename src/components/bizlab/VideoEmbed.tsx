import React from "react"
import { ExternalLink, Film } from "lucide-react"

/**
 * Turns a pasted video URL into an inline embedded player. Supports YouTube,
 * Vimeo, and Google Drive "share" links (the formats students get from
 * WeVideo → Drive or YouTube). Anything else falls back to a plain link so the
 * commercial is never lost.
 */
function toEmbedSrc(raw: string): string | null {
  let url: URL
  try {
    url = new URL(raw.trim())
  } catch {
    return null
  }
  const host = url.hostname.replace(/^www\./, "")

  // YouTube — youtu.be/ID or youtube.com/watch?v=ID or /embed/ID or /shorts/ID
  if (host === "youtu.be") {
    const id = url.pathname.slice(1)
    return id ? `https://www.youtube.com/embed/${id}` : null
  }
  if (host === "youtube.com" || host === "m.youtube.com") {
    const v = url.searchParams.get("v")
    if (v) return `https://www.youtube.com/embed/${v}`
    const m = url.pathname.match(/\/(embed|shorts)\/([^/?]+)/)
    if (m) return `https://www.youtube.com/embed/${m[2]}`
    return null
  }

  // Vimeo — vimeo.com/ID
  if (host === "vimeo.com") {
    const id = url.pathname.split("/").filter(Boolean)[0]
    return id ? `https://player.vimeo.com/video/${id}` : null
  }

  // Google Drive — drive.google.com/file/d/ID/view → /preview
  if (host === "drive.google.com") {
    const m = url.pathname.match(/\/file\/d\/([^/]+)/)
    if (m) return `https://drive.google.com/file/d/${m[1]}/preview`
    const id = url.searchParams.get("id")
    if (id) return `https://drive.google.com/file/d/${id}/preview`
    return null
  }

  return null
}

export default function VideoEmbed({ url }: { url: string }) {
  const src = toEmbedSrc(url)

  if (!src) {
    // Unknown provider — still give a way to watch it.
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm font-medium hover:border-primary transition-colors"
      >
        <Film className="w-4 h-4 text-primary" />
        Watch commercial
        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
      </a>
    )
  }

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-border bg-black" style={{ aspectRatio: "16 / 9" }}>
      <iframe
        src={src}
        title="Commercial preview"
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
