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
      {/* lowercase dotless "i" (U+0131) whose dot is a green "$" circle.
          line-height is pinned to 1 here (inline style, so the placement's
          text-* class can't change it) so the container stays a predictable 1em
          box at every font size. The dot is anchored from the *baseline* side
          (`bottom`, an em above the box bottom which sits just past the
          baseline) rather than the top edge: with line-height 1 the font's
          ascent overflows the box top, so a top offset drifts as the font size
          grows, whereas the descent at the bottom is small and stable — keeping
          the dot at the same height above the stem everywhere. */}
      <span
        aria-hidden="true"
        className="relative inline-block align-baseline"
        style={{ lineHeight: 1 }}
      >
        ı
        <span
          className="absolute left-1/2 -translate-x-1/2 inline-flex items-center justify-center rounded-full"
          style={{ bottom: "0.65em", width: "0.34em", height: "0.34em", backgroundColor: "#1D9E75" }}
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
