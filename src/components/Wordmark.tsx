import { cn } from "@/lib/utils";

interface WordmarkProps {
  className?: string;
}

/**
 * Plain "InvestiPlay" wordmark in dark green (#04342C), rendered in the display
 * font. Color/size can be overridden via className (e.g. with `!text-white` on
 * dark surfaces).
 */
export function Wordmark({ className }: WordmarkProps) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-display font-extrabold tracking-tight leading-none text-[#04342C] select-none",
        className,
      )}
    >
      InvestiPlay
    </span>
  );
}

export default Wordmark;
