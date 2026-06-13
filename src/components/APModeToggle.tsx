import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

interface APModeToggleProps {
  apMode: boolean;
  onToggle: (ap: boolean) => void;
}

export default function APModeToggle({ apMode, onToggle }: APModeToggleProps) {
  // React-state tooltip (not CSS hover) so it also works on mobile tap.
  const [showTip, setShowTip] = useState(false);

  return (
    <div className="inline-flex items-center rounded-full bg-muted/60 p-1 border border-border/40">
      <button
        onClick={() => onToggle(false)}
        className={cn(
          "px-4 py-1.5 rounded-full text-sm font-semibold transition-all",
          !apMode
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        All Courses
      </button>
      <button
        onClick={() => onToggle(true)}
        className={cn(
          "flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all",
          apMode
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        AP Mode
        <span
          role="button"
          tabIndex={0}
          aria-label="About AP Mode"
          className="relative inline-flex"
          onMouseEnter={() => setShowTip(true)}
          onMouseLeave={() => setShowTip(false)}
          onClick={(e) => { e.stopPropagation(); setShowTip((v) => !v); }}
          onBlur={() => setShowTip(false)}
        >
          <Info className="w-3.5 h-3.5 opacity-70" />
          {showTip && (
            <span
              className="absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 rounded-lg px-3 py-2 text-left text-[12px] leading-snug text-white shadow-lg font-normal"
              style={{ backgroundColor: "#0f2d1e", maxWidth: 220, width: "max-content" }}
            >
              Advanced curriculum aligned with AP Economics and AP Personal Finance standards. Recommended for students in AP courses.
            </span>
          )}
        </span>
      </button>
    </div>
  );
}
