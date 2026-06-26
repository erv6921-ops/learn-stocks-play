import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MASCOT_SRC = "/brand/mascot-character.png?v=2";

interface JeffMascotProps {
  size?: "sm" | "md" | "lg" | "xl";
  mood?: "happy" | "thinking" | "excited" | "teaching" | "celebrating";
  message?: string;
  className?: string;
  animate?: boolean;
}

// Per-mood liveliness for the inline mascot. Flat illustration, so we sell life
// through bob, breathing scale and the odd happy wiggle.
const MOOD_MOTION: Record<NonNullable<JeffMascotProps["mood"]>, { y: number[]; rotate: number[]; scale: number[]; dur: number }> = {
  happy:       { y: [0, -4, 0],  rotate: [-1.5, 1.5, -1.5], scale: [1, 1.02, 1], dur: 2.8 },
  thinking:    { y: [0, -2, 0],  rotate: [-4, 4, -4],       scale: [1, 1.01, 1], dur: 3.4 },
  excited:     { y: [0, -7, 0],  rotate: [-4, 4, -4],       scale: [1, 1.04, 1], dur: 1.1 },
  teaching:    { y: [0, -3, 0],  rotate: [-2, 2, -2],       scale: [1, 1.02, 1], dur: 2.4 },
  celebrating: { y: [0, -9, 0],  rotate: [-6, 6, -6],       scale: [1, 1.06, 1], dur: 0.6 },
};

export const JeffMascot: React.FC<JeffMascotProps> = ({
  size = "md",
  mood = "happy",
  message,
  className,
  animate = true
}) => {
  const sizeClasses = {
    sm: "w-9 h-9",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24"
  };

  const m = MOOD_MOTION[mood];

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className={cn("relative shrink-0", sizeClasses[size])}>
        <motion.img
          src={MASCOT_SRC}
          alt="Your investing guide"
          draggable={false}
          className="w-full h-full object-contain select-none"
          style={{ filter: "drop-shadow(0 4px 8px rgba(6,41,31,0.18))", transformOrigin: "center bottom" }}
          animate={animate ? { y: m.y, rotate: m.rotate, scale: m.scale } : undefined}
          transition={animate ? { duration: m.dur, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" } : undefined}
        />
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
