import React from "react"
import { Gavel } from "lucide-react"
import { RUBRIC } from "@/data/bizLab"

/** The judge's 130-point scoring rubric, displayed for transparency. */
export default function RubricCard() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <Gavel className="w-5 h-5 text-gold" />
        <h4 className="font-display font-bold text-lg">Judge's Scoring Rubric</h4>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        130 points total — here's exactly how the Sharks will score you.
      </p>
      <div className="space-y-3">
        {RUBRIC.map(cat => (
          <div key={cat.name} className="rounded-xl border border-border/40 p-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-sm">{cat.name}</span>
              <span className="text-sm font-extrabold text-primary tabular-nums">{cat.points} pts</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-0.5 list-disc list-inside">
              {cat.criteria.map(c => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
