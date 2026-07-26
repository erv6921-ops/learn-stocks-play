import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { useStockHistory } from "@/hooks/useStockHistory";
import { supabase } from "@/integrations/supabase/client";
import { formatMarketCap, formatVolume } from "@/data/stocksData";
import {
  X, ArrowUpRight, Star, Eye, Wallet, TrendingUp, TrendingDown, Coins, Loader2,
} from "lucide-react";

// Cyan/teal is the portfolio's signature accent (matches the dashboard snapshot).
const ACCENT = "#3BA7C4";

const RANGES = [
  { label: "1W", value: "5d" },
  { label: "1M", value: "1m" },
  { label: "6M", value: "6m" },
  { label: "1Y", value: "1y" },
  { label: "5Y", value: "5y" },
] as const;
type RangeVal = typeof RANGES[number]["value"];

interface Holding {
  symbol: string;
  shares: number;
  purchasePrice: number;
}

// Loose shape of a get-stock-quote row — every field may be missing/null.
interface Quote {
  symbol: string;
  price?: number | null;
  change?: number | null;
  changePercent?: number | null;
  volume?: number | null;
  marketCap?: number | null;
  high52Week?: number | null;
  low52Week?: number | null;
  open?: number | null;
  dayHigh?: number | null;
  dayLow?: number | null;
  previousClose?: number | null;
  peRatio?: number | null;
  eps?: number | null;
  beta?: number | null;
  dividendYield?: number | null;
  avgVolume3M?: number | null;
}

interface Fundamentals {
  revenue?: number | null;
  ebitda?: number | null;
  profit_margin?: number | null;
  operating_margin?: number | null;
  forward_pe?: number | null;
  forward_eps?: number | null;
  shares_outstanding?: number | null;
  price_to_book?: number | null;
  price_to_sales?: number | null;
  dividend_rate?: number | null;
  target_est?: number | null;
  market_cap?: number | null;
  pe_ratio?: number | null;
  eps?: number | null;
  beta?: number | null;
  dividend_yield?: number | null;
  high_52_week?: number | null;
  low_52_week?: number | null;
}

interface PortfolioExpandedProps {
  open: boolean;
  onClose: () => void;
  portfolio: Holding[];
  watchlist: string[];
  livePrices: Map<string, number>;
  initialSymbol?: string;
  portfolioValue: number;
  plPct: number;
}

const fmt = (v: number, d = 2) =>
  Number.isFinite(v)
    ? v.toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d })
    : "—";

export default function PortfolioExpanded({
  open,
  onClose,
  portfolio,
  watchlist,
  livePrices,
  initialSymbol,
  portfolioValue,
  plPct,
}: PortfolioExpandedProps) {
  const [activeSymbol, setActiveSymbol] = useState<string | undefined>(initialSymbol);
  const [range, setRange] = useState<RangeVal>("1y");
  const [quotes, setQuotes] = useState<Record<string, Quote>>({});
  const [names, setNames] = useState<Record<string, string>>({});
  const [fundamentals, setFundamentals] = useState<Fundamentals | null>(null);
  const [fundLoading, setFundLoading] = useState(false);
  const [hover, setHover] = useState<{ price: number; date: string } | null>(null);

  // Reset the active symbol to whatever the user clicked whenever the panel opens.
  useEffect(() => {
    if (open) {
      setActiveSymbol(initialSymbol ?? portfolio[0]?.symbol ?? watchlist[0]);
      setHover(null);
    }
  }, [open, initialSymbol]); // eslint-disable-line react-hooks/exhaustive-deps

  // Lock body scroll + allow Escape to close while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const allSymbols = useMemo(() => {
    const s = new Set<string>();
    portfolio.forEach((h) => s.add(h.symbol));
    watchlist.forEach((w) => s.add(w));
    if (activeSymbol) s.add(activeSymbol);
    return [...s];
  }, [portfolio, watchlist, activeSymbol]);

  // Fetch live quotes for every symbol in the sidebar; poll while open.
  const fetchQuotes = useCallback(async () => {
    if (allSymbols.length === 0) return;
    try {
      const { data, error } = await supabase.functions.invoke("get-stock-quote", {
        body: { symbols: allSymbols },
      });
      if (error || !data?.stocks) return;
      setQuotes((prev) => {
        const next = { ...prev };
        for (const s of data.stocks as Quote[]) next[s.symbol] = s;
        return next;
      });
    } catch { /* keep previous quotes */ }
  }, [allSymbols]);

  useEffect(() => {
    if (!open) return;
    fetchQuotes();
    const id = setInterval(fetchQuotes, 30_000);
    return () => clearInterval(id);
  }, [open, fetchQuotes]);

  // Fetch friendly names once per open.
  useEffect(() => {
    if (!open || allSymbols.length === 0) return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase.from("symbols").select("symbol,name").in("symbol", allSymbols);
      if (cancelled || !data) return;
      const map: Record<string, string> = {};
      for (const r of data as { symbol: string; name: string }[]) map[r.symbol] = r.name;
      setNames(map);
    })();
    return () => { cancelled = true; };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Deep fundamentals for the active symbol's stat grid.
  useEffect(() => {
    if (!open || !activeSymbol) return;
    let cancelled = false;
    setFundLoading(true);
    setFundamentals(null);
    (async () => {
      try {
        const { data } = await supabase.functions.invoke("get-stock-fundamentals", {
          body: { symbol: activeSymbol },
        });
        if (!cancelled) setFundamentals(data?.fundamentals ?? null);
      } catch {
        if (!cancelled) setFundamentals(null);
      } finally {
        if (!cancelled) setFundLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [open, activeSymbol]);

  const { historicalData } = useStockHistory(activeSymbol, range);
  const chartData = useMemo(
    () => (historicalData ?? []).map((d) => ({ p: d.price, date: d.date })),
    [historicalData]
  );
  const chartUp = chartData.length >= 2 ? chartData[chartData.length - 1].p >= chartData[0].p : true;
  const chartColor = chartUp ? "#3DDC97" : "#FF5A5F";
  const rangePct = chartData.length >= 2
    ? ((chartData[chartData.length - 1].p - chartData[0].p) / chartData[0].p) * 100
    : 0;

  const q = activeSymbol ? quotes[activeSymbol] : undefined;
  const activeHolding = portfolio.find((h) => h.symbol === activeSymbol);
  const livePrice =
    (q?.price && q.price > 0 ? q.price : undefined) ??
    (activeSymbol ? livePrices.get(activeSymbol) : undefined) ??
    activeHolding?.purchasePrice ?? 0;
  const displayPrice = hover?.price ?? livePrice;
  const dayPct = q?.changePercent ?? 0;
  const isWatch = activeSymbol ? watchlist.includes(activeSymbol) && !activeHolding : false;

  const holdingPnlPct =
    activeHolding && activeHolding.purchasePrice > 0
      ? ((livePrice - activeHolding.purchasePrice) / activeHolding.purchasePrice) * 100
      : null;
  const holdingValue = activeHolding ? activeHolding.shares * livePrice : 0;

  // Merged stat source: quote first, fundamentals fills gaps.
  const f = fundamentals;
  const stat = (n: number | null | undefined) => (typeof n === "number" && n !== 0 ? n : null);
  const marketCap = stat(q?.marketCap) ?? stat(f?.market_cap);
  const high52 = stat(q?.high52Week) ?? stat(f?.high_52_week);
  const low52 = stat(q?.low52Week) ?? stat(f?.low_52_week);
  const peRatio = stat(q?.peRatio) ?? stat(f?.pe_ratio);
  const eps = stat(q?.eps) ?? stat(f?.eps);
  const beta = stat(q?.beta) ?? stat(f?.beta);
  const divYield = stat(q?.dividendYield) ?? stat(f?.dividend_yield);

  const stats: { label: string; value: string }[] = [];
  const push = (label: string, v: number | null, fmtFn: (n: number) => string) => {
    if (v != null) stats.push({ label, value: fmtFn(v) });
  };
  push("Open", stat(q?.open), (v) => `🪙 ${fmt(v)}`);
  push("Prev Close", stat(q?.previousClose), (v) => `🪙 ${fmt(v)}`);
  if (stat(q?.dayLow) && stat(q?.dayHigh)) stats.push({ label: "Day's Range", value: `${fmt(q!.dayLow!)} – ${fmt(q!.dayHigh!)}` });
  if (low52 && high52) stats.push({ label: "52-Wk Range", value: `${fmt(low52)} – ${fmt(high52)}` });
  push("Volume", stat(q?.volume), (v) => formatVolume(v));
  push("Avg Vol (3M)", stat(q?.avgVolume3M), (v) => formatVolume(v));
  push("Market Cap", marketCap, (v) => formatMarketCap(v));
  push("P/E (TTM)", peRatio, (v) => v.toFixed(2));
  push("Fwd P/E", stat(f?.forward_pe), (v) => v.toFixed(2));
  push("EPS (TTM)", eps, (v) => `🪙 ${fmt(v)}`);
  push("Revenue (TTM)", stat(f?.revenue), (v) => formatMarketCap(v));
  push("EBITDA", stat(f?.ebitda), (v) => formatMarketCap(v));
  push("Profit Margin", stat(f?.profit_margin), (v) => `${v.toFixed(1)}%`);
  push("Oper. Margin", stat(f?.operating_margin), (v) => `${v.toFixed(1)}%`);
  push("Price/Sales", stat(f?.price_to_sales), (v) => v.toFixed(2));
  push("Price/Book", stat(f?.price_to_book), (v) => v.toFixed(2));
  push("Beta (5Y)", beta, (v) => v.toFixed(2));
  push("Div. Yield", divYield, (v) => `${v.toFixed(2)}%`);
  push("1Y Target", stat(f?.target_est), (v) => `🪙 ${fmt(v)}`);

  const totalCost = portfolio.reduce((s, h) => s + h.shares * h.purchasePrice, 0);
  const totalPnl = portfolioValue - totalCost;

  const priceOf = (sym: string) => {
    const qp = quotes[sym]?.price;
    return qp && qp > 0 ? qp : livePrices.get(sym) ?? 0;
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="relative w-full max-w-[1400px] my-auto rounded-[24px] overflow-hidden shadow-2xl"
            style={{ background: "hsl(152 33% 97%)", border: "1px solid #d4e5dd" }}
            initial={{ scale: 0.96, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.97, y: 8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-[#d4e5dd] bg-white/70 backdrop-blur">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl flex items-center justify-center border"
                  style={{ background: `linear-gradient(135deg,${ACCENT}26,${ACCENT}0a)`, color: ACCENT, borderColor: `${ACCENT}26` }}>
                  <Wallet className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Portfolio</p>
                  <p className="font-display text-lg font-extrabold leading-none tracking-tight">
                    🪙 {fmt(portfolioValue, 0)}
                    <span className={`ml-2 text-xs font-bold ${plPct >= 0 ? "text-success" : "text-destructive"}`}>
                      {plPct >= 0 ? "▲ +" : "▼ "}{plPct.toFixed(1)}%
                    </span>
                  </p>
                </div>
              </div>
              <button onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors press-scale"
                aria-label="Close">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] max-h-[calc(100vh-8rem)] overflow-hidden">
              {/* ── Main column: chart + stats ── */}
              <div className="overflow-y-auto p-5 sm:p-7 lg:border-r border-[#d4e5dd]">
                {activeSymbol ? (
                  <>
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span className="px-2.5 py-1 rounded-lg font-mono font-extrabold text-lg"
                            style={{ background: `${ACCENT}1a`, color: ACCENT }}>{activeSymbol}</span>
                          {isWatch
                            ? <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-gold/15 text-gold-foreground/70"><Star className="w-3 h-3 fill-gold text-gold" /> Watching</span>
                            : <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: `${ACCENT}14`, color: ACCENT }}><Wallet className="w-3 h-3" /> Holding</span>}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1.5 max-w-md truncate">
                          {names[activeSymbol] ?? activeSymbol}
                        </p>
                      </div>
                      <Link to={`/stocks/${activeSymbol}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl press-scale transition-colors"
                        style={{ background: ACCENT, color: "white" }}>
                        Trade <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {/* Price */}
                    <div className="mt-4 flex items-end gap-3 flex-wrap">
                      <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight tabular-nums">
                        🪙 {fmt(displayPrice)}
                      </span>
                      <span className={`flex items-center gap-1 text-sm font-bold mb-1.5 ${dayPct >= 0 ? "text-success" : "text-destructive"}`}>
                        {dayPct >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {dayPct >= 0 ? "+" : ""}{dayPct.toFixed(2)}% <span className="text-muted-foreground font-medium">today</span>
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground h-4 mt-0.5">
                      {hover?.date ?? (activeHolding ? `You own ${activeHolding.shares} shares` : "Not in your portfolio yet")}
                    </p>

                    {/* Range pills */}
                    <div className="flex gap-1.5 mt-4">
                      {RANGES.map((r) => (
                        <button key={r.value} onClick={() => setRange(r.value)}
                          className="px-3 py-1.5 rounded-full text-xs font-bold transition-all press-scale"
                          style={range === r.value
                            ? { background: ACCENT, color: "white" }
                            : { background: "rgba(0,0,0,0.05)", color: "#64748b" }}>
                          {r.label}
                        </button>
                      ))}
                      {chartData.length >= 2 && (
                        <span className={`ml-auto self-center text-sm font-extrabold ${rangePct >= 0 ? "text-success" : "text-destructive"}`}>
                          {rangePct >= 0 ? "+" : ""}{rangePct.toFixed(2)}%
                          <span className="text-[10px] font-medium text-muted-foreground ml-1">{RANGES.find(r => r.value === range)?.label}</span>
                        </span>
                      )}
                    </div>

                    {/* Chart */}
                    <div className="h-64 sm:h-80 mt-3 -mx-2 cursor-crosshair">
                      {chartData.length >= 2 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartData} margin={{ top: 8, right: 4, bottom: 0, left: 4 }}
                            onMouseMove={(state: any) => {
                              if (state?.isTooltipActive && state.activePayload?.[0]) {
                                setHover({ price: Number(state.activePayload[0].value), date: String(state.activePayload[0].payload.date) });
                              }
                            }}
                            onMouseLeave={() => setHover(null)}>
                            <defs>
                              <linearGradient id="pfExpandGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={chartColor} stopOpacity={0.35} />
                                <stop offset="100%" stopColor={chartColor} stopOpacity={0.02} />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} minTickGap={48} />
                            <YAxis hide domain={[(min: number) => min * 0.99, (max: number) => max * 1.01]} />
                            <Tooltip cursor={{ stroke: chartColor, strokeWidth: 1, strokeDasharray: "4 3" }} content={() => null} />
                            <Area type="monotone" dataKey="p" stroke={chartColor} strokeWidth={2.5}
                              fill="url(#pfExpandGrad)" dot={false} isAnimationActive animationDuration={700} />
                          </AreaChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="h-full rounded-xl bg-muted/40 flex items-center justify-center">
                          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Your position (holdings only) */}
                    {activeHolding && (
                      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          { l: "Shares", v: `${activeHolding.shares}` },
                          { l: "Avg Cost", v: `🪙 ${fmt(activeHolding.purchasePrice)}` },
                          { l: "Value", v: `🪙 ${fmt(holdingValue, 0)}` },
                          { l: "P/L", v: `${holdingPnlPct != null && holdingPnlPct >= 0 ? "+" : ""}${holdingPnlPct?.toFixed(1) ?? "0"}%`, pnl: holdingPnlPct ?? 0 },
                        ].map((c) => (
                          <div key={c.l} className="rounded-2xl bg-white p-3.5 border border-[#e0e8e3]" style={{ boxShadow: "var(--shadow-sm)" }}>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{c.l}</p>
                            <p className={`font-display text-lg font-extrabold tabular-nums mt-0.5 ${c.pnl != null ? (c.pnl >= 0 ? "text-success" : "text-destructive") : ""}`}>
                              {c.v}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Key statistics */}
                    <div className="mt-6">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-sm font-extrabold">Key Statistics</h3>
                        {fundLoading && <Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground" />}
                      </div>
                      {stats.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3.5">
                          {stats.map((s) => (
                            <div key={s.label} className="border-b border-[#e0e8e3] pb-2">
                              <p className="text-[11px] text-muted-foreground">{s.label}</p>
                              <p className="text-sm font-bold tabular-nums mt-0.5">{s.value}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          {fundLoading ? "Loading statistics…" : "No statistics available for this symbol."}
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center py-20 text-center">
                    <div>
                      <p className="font-display text-xl font-extrabold">Nothing selected</p>
                      <p className="text-sm text-muted-foreground mt-1">Pick a stock from your portfolio or watchlist.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Side panel: holdings + watchlist ── */}
              <div className="overflow-y-auto p-4 sm:p-5 bg-white/50">
                {/* Portfolio summary */}
                <div className="rounded-2xl p-4 mb-4 relative overflow-hidden"
                  style={{ background: "linear-gradient(145deg,#0f2f2b,#123b34)" }}>
                  <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full blur-2xl" style={{ background: `${ACCENT}40` }} />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Total value</p>
                  <p className="font-display text-2xl font-extrabold text-white tracking-tight mt-0.5">🪙 {fmt(portfolioValue, 0)}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs">
                    <span className={`font-bold ${totalPnl >= 0 ? "text-[#3DDC97]" : "text-[#FF5A5F]"}`}>
                      {totalPnl >= 0 ? "+" : ""}🪙 {fmt(Math.abs(totalPnl), 0)}
                    </span>
                    <span className={`font-bold ${plPct >= 0 ? "text-[#3DDC97]" : "text-[#FF5A5F]"}`}>
                      {plPct >= 0 ? "+" : ""}{plPct.toFixed(1)}%
                    </span>
                    <span className="text-white/40">all time</span>
                  </div>
                </div>

                {/* Holdings */}
                <SideSection icon={<Wallet className="w-3.5 h-3.5" />} title="Holdings" count={portfolio.length}>
                  {portfolio.length === 0 ? (
                    <p className="text-xs text-muted-foreground px-1 py-2">No stocks yet — make your first trade.</p>
                  ) : (
                    portfolio.map((h) => {
                      const price = priceOf(h.symbol);
                      const pct = h.purchasePrice > 0 ? ((price - h.purchasePrice) / h.purchasePrice) * 100 : 0;
                      return (
                        <SideRow key={h.symbol} symbol={h.symbol} name={names[h.symbol]}
                          active={h.symbol === activeSymbol} onClick={() => { setActiveSymbol(h.symbol); setHover(null); }}
                          right={<>
                            <span className="text-sm font-bold tabular-nums">🪙{fmt(h.shares * price, 0)}</span>
                            <span className={`block text-[11px] font-bold ${pct >= 0 ? "text-success" : "text-destructive"}`}>
                              {pct >= 0 ? "+" : ""}{pct.toFixed(1)}%
                            </span>
                          </>}
                          sub={`${h.shares} sh`} />
                      );
                    })
                  )}
                </SideSection>

                {/* Watchlist */}
                <div className="mt-4">
                  <SideSection icon={<Eye className="w-3.5 h-3.5" />} title="Watchlist" count={watchlist.length}>
                    {watchlist.length === 0 ? (
                      <p className="text-xs text-muted-foreground px-1 py-2">Star stocks to watch them here.</p>
                    ) : (
                      watchlist.map((sym) => {
                        const price = priceOf(sym);
                        const dp = quotes[sym]?.changePercent ?? 0;
                        return (
                          <SideRow key={sym} symbol={sym} name={names[sym]}
                            active={sym === activeSymbol} onClick={() => { setActiveSymbol(sym); setHover(null); }}
                            right={<>
                              <span className="text-sm font-bold tabular-nums">🪙{fmt(price, price < 10 ? 2 : 0)}</span>
                              <span className={`block text-[11px] font-bold ${dp >= 0 ? "text-success" : "text-destructive"}`}>
                                {dp >= 0 ? "+" : ""}{dp.toFixed(1)}%
                              </span>
                            </>}
                            sub="watching" />
                        );
                      })
                    )}
                  </SideSection>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SideSection({ icon, title, count, children }: { icon: React.ReactNode; title: string; count: number; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 px-1 mb-1.5">
        <span className="text-muted-foreground">{icon}</span>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{title}</p>
        <span className="text-[10px] font-bold text-muted-foreground/60">{count}</span>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function SideRow({ symbol, name, sub, right, active, onClick }: {
  symbol: string; name?: string; sub: string; right: React.ReactNode; active: boolean; onClick: () => void;
}) {
  return (
    <button onClick={onClick}
      className="w-full flex items-center gap-2.5 p-2.5 rounded-xl text-left transition-all press-scale hover:bg-black/[0.04]"
      style={active ? { background: `${ACCENT}12`, boxShadow: `inset 0 0 0 1.5px ${ACCENT}55` } : {}}>
      <div className="min-w-0 flex-1">
        <p className="font-mono font-extrabold text-sm" style={active ? { color: ACCENT } : {}}>{symbol}</p>
        <p className="text-[11px] text-muted-foreground truncate">{name ?? sub}</p>
      </div>
      <div className="text-right shrink-0">{right}</div>
    </button>
  );
}
