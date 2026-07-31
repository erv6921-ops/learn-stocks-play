import React from "react";
import { cn } from "@/lib/utils";

interface JeffLogoProps {
  size?: number;
  className?: string;
}

export function JeffLogo({ size = 36, className }: JeffLogoProps) {
  return (
    <div
      className={cn(
        "relative shrink-0 flex items-center justify-center",
        className,
      )}
      style={{ width: size, height: size }}
      aria-label="InvestiPlay logo"
    >
      <div
        className="absolute -inset-1 opacity-20 blur-[14px] transition-opacity duration-200"
        style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.35) 0%, transparent 70%)" }}
      />
      <img
        src="/brand/mascot-character.png?v=2"
        alt="InvestiPlay mascot"
        className="relative h-full w-full object-contain transition-all duration-200 [filter:drop-shadow(0_0_12px_rgba(var(--brand-rgb),0.35))_drop-shadow(0_0_24px_rgba(var(--brand-rgb),0.18))]"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}

export default JeffLogo;
