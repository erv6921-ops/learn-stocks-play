import { cn } from "@/lib/utils";

interface WordmarkProps {
  className?: string;
}

/**
 * Text-based "InvestiPlay" wordmark. The lowercase "i" before "Play" uses a
 * dollar-sign-style dot. No background — just text on whatever it sits on.
 * Defaults to the brand green (text-primary); override color/size via className.
 */
export function Wordmark({ className }: WordmarkProps) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-display font-extrabold tracking-tight leading-none text-primary select-none",
        className,
      )}
      aria-label="InvestiPlay"
    >
      <span aria-hidden="true">Invest</span>
      {/* lowercase dotless "i" (U+0131) whose dot is a gold $ coin */}
      <span aria-hidden="true" className="relative inline-block">
        ı
        <span
          className="absolute left-1/2 -translate-x-1/2 -top-[0.30em] box-border inline-flex items-center justify-center rounded-full"
          style={{
            width: "0.5em",
            height: "0.5em",
            backgroundColor: "#F5A623",
            border: "0.055em solid #B97509",
          }}
        >
          <span style={{ color: "#6B4A0F", fontSize: "0.34em", fontWeight: 800, lineHeight: 1 }}>
            $
          </span>
        </span>
      </span>
      <span aria-hidden="true">Play</span>
    </span>
  );
}

export default Wordmark;
