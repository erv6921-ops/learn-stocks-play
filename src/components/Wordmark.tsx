import { cn } from "@/lib/utils";

interface WordmarkProps {
  className?: string;
}

/**
 * Text-based "InvestiPlay" wordmark in dark green (#04342C). The dot of the
 * lowercase "i" before "Play" is a small round green circle (#1D9E75) with a
 * white "$" inside. No background box, no border, no tilt — just the text on
 * whatever it sits on. Color/size can be overridden via className (e.g. with
 * `!text-white` on dark surfaces).
 */
export function Wordmark({ className }: WordmarkProps) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-display font-extrabold tracking-tight leading-none text-[#04342C] select-none",
        className,
      )}
      aria-label="InvestiPlay"
    >
      <span aria-hidden="true">Invest</span>
      {/* lowercase dotless "i" (U+0131) whose dot is a green "$" circle */}
      <span aria-hidden="true" className="relative inline-block">
        ı
        <span
          className="absolute left-1/2 -translate-x-1/2 -top-[0.02em] inline-flex items-center justify-center rounded-full"
          style={{ width: "0.34em", height: "0.34em", backgroundColor: "#1D9E75" }}
        >
          <span style={{ color: "#FFFFFF", fontSize: "0.22em", fontWeight: 800, lineHeight: 1 }}>
            $
          </span>
        </span>
      </span>
      <span aria-hidden="true">Play</span>
    </span>
  );
}

export default Wordmark;
