// Curated ticker list for the Stock Prediction Draft — the fixed menu students
// pick from on day one. Kept intentionally small (18) and recognizable so a
// whole class can pick within one class period without analysis paralysis.
//
// NOTE on symbols: `ticker` is the display symbol. Berkshire's class-B shares
// are "BRK.B" to students but Yahoo Finance expects "BRK-B" — the price fetch
// helper (src/lib/stockPredictionDraft.ts) handles that conversion, so keep the
// human-facing "BRK.B" here.

export interface CuratedTicker {
  ticker: string
  companyName: string
  logoUrl?: string
  category: string
}

export const STOCK_PREDICTION_TICKERS: CuratedTicker[] = [
  // Tech / Consumer
  { ticker: "AAPL", companyName: "Apple", category: "Tech & Consumer" },
  { ticker: "TSLA", companyName: "Tesla", category: "Tech & Consumer" },
  { ticker: "NKE", companyName: "Nike", category: "Tech & Consumer" },
  { ticker: "NFLX", companyName: "Netflix", category: "Tech & Consumer" },
  { ticker: "DIS", companyName: "Disney", category: "Tech & Consumer" },
  { ticker: "MCD", companyName: "McDonald's", category: "Tech & Consumer" },
  { ticker: "SBUX", companyName: "Starbucks", category: "Tech & Consumer" },

  // Gaming / Entertainment
  { ticker: "TTWO", companyName: "Take-Two", category: "Gaming & Entertainment" },
  { ticker: "RBLX", companyName: "Roblox", category: "Gaming & Entertainment" },
  { ticker: "SPOT", companyName: "Spotify", category: "Gaming & Entertainment" },

  // Retail
  { ticker: "AMZN", companyName: "Amazon", category: "Retail" },
  { ticker: "TGT", companyName: "Target", category: "Retail" },
  { ticker: "COST", companyName: "Costco", category: "Retail" },

  // Finance / Other
  { ticker: "V", companyName: "Visa", category: "Finance & Other" },
  { ticker: "BRK.B", companyName: "Berkshire Hathaway", category: "Finance & Other" },

  // Wildcards
  { ticker: "RIVN", companyName: "Rivian", category: "Wildcards" },
  { ticker: "GME", companyName: "GameStop", category: "Wildcards" },
  { ticker: "COIN", companyName: "Coinbase", category: "Wildcards" },
]
