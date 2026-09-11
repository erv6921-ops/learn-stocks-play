import React from "react"
import { useNavigate, Link } from "react-router-dom"
import { Wordmark } from "@/components/Wordmark"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

/**
 * Shared chrome for the static legal pages (Privacy Policy, Terms of Service).
 * Renders a slim top bar, a prose-styled content column, and a cross-link
 * footer. No auth required — these must be reachable by prospective users,
 * parents, and school administrators before an account exists.
 */
export default function LegalLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string
  lastUpdated: string
  children: React.ReactNode
}) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/60 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link to="/" aria-label="InvestiPlay home">
            <Wordmark className="text-xl" />
          </Link>
          <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground mt-2">Last updated: {lastUpdated}</p>

          <article className="prose prose-neutral dark:prose-invert mt-8 max-w-none prose-headings:font-display prose-headings:font-bold prose-h2:mt-10 prose-h2:mb-3 prose-h2:text-xl prose-a:text-primary">
            {children}
          </article>

          <div className="mt-12 pt-6 border-t flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
            <Link to="/auth" className="text-muted-foreground hover:underline">Back to sign in</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
