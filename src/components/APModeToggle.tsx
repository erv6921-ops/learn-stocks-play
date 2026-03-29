import React from "react";
import { cn } from "@/lib/utils";

interface APModeToggleProps {
  apMode: boolean;
  onToggle: (ap: boolean) => void;
}

export default function APModeToggle({ apMode, onToggle }: APModeToggleProps) {
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
          "px-4 py-1.5 rounded-full text-sm font-semibold transition-all",
          apMode
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        AP Mode
      </button>
    </div>
  );
}
