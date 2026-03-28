import React from "react";
import { cn } from "@/lib/utils";
import jeffCharacter from "@/assets/jeff-character.png";

interface JeffMascotProps {
  size?: "sm" | "md" | "lg" | "xl";
  mood?: "happy" | "thinking" | "excited" | "teaching" | "celebrating";
  message?: string;
  className?: string;
  animate?: boolean;
}

export const JeffMascot: React.FC<JeffMascotProps> = ({
  size = "md",
  message,
  className,
  animate = true
}) => {
  const sizeClasses = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "relative flex items-center justify-center shrink-0 rounded-xl overflow-hidden",
          sizeClasses[size],
          animate && "animate-float"
        )}>

        <img

          alt="InvestiPlay"
          className="w-full h-full object-contain" src="/lovable-uploads/b1e4fa65-60ee-4be3-be1d-431870d79508.png" />

      </div>

      {message &&
      <div className="relative max-w-xs">
          <div className="bg-muted/40 border border-border/50 rounded-xl px-3 py-1.5">
            <p className="text-xs text-muted-foreground leading-relaxed">{message}</p>
          </div>
        </div>
      }
    </div>);

};

export default JeffMascot;