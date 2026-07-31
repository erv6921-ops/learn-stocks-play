// Per-lesson scenario overrides. One UNIQUE scenario per lesson id so no
// two lessons share a scenario. Merged in ./index.ts.
import { LessonScenario } from "./index"
export const batchB_stocks: Record<string, LessonScenario> = {
  "stocks-1": {
    title: "Splitting the Lemonade Stand",
    narrative: "Maya and three friends pool $200 to build a big lemonade stand for the summer fair. To keep things fair, they cut ownership into 200 slips of paper, one per dollar, and each friend takes 50 slips. When the stand earns money, every slip gets an equal cut.",
    details: [
      "Total raised: $200 for 200 slips",
      "Each slip = 1 unit of ownership",
      "Maya holds 50 of 200 slips = 25 percent",
      "A slip is exactly what a share is",
      "More slips owned = bigger piece of profits",
    ],
  },
  "stocks-2": {
    title: "The Family Bakery Decision",
    narrative: "Devon's aunt runs a bakery she owns entirely by herself, answering to no outside owners. Her friend runs a coffee chain that sold shares to thousands of strangers on an exchange and must publish its results every three months. Devon notices only one of them can be bought by anyone with a brokerage app.",
    details: [
      "Aunt's bakery: 1 owner, no public shares",
      "Coffee chain: thousands of public shareholders",
      "Public company files reports every quarter",
      "You can only buy shares of the public one",
      "Private owner keeps full control and privacy",
    ],
  },
  "stocks-3": {
    title: "Game Studio Goes Public",
    narrative: "Priya follows a small game studio, PixelForge, that has been private for years. One morning it lists on the exchange for the first time at an offer price of $18 per share, selling 5 million new shares to raise cash for a new console title. By lunch the price is bouncing around as regular people can finally buy in.",
    details: [
      "IPO offer price: $18 per share",
      "Shares sold to public: 5 million",
      "Cash raised: about $90 million",
      "First trading day = the IPO",
      "Money funds a new console game",
    ],
  },
  "stocks-4": {
    title: "Which Company Is Bigger",
    narrative: "Leo argues that BrightBev, at $150 a share, must be bigger than SnackCo, at $12 a share. His teacher shows him that price alone lies: you multiply share price by the number of shares. SnackCo turns out to be the giant once you count all its shares.",
    details: [
      "BrightBev: $150 x 2 million shares = $300M",
      "SnackCo: $12 x 400 million shares = $4.8B",
      "Market cap = price x shares outstanding",
      "Higher price does not mean bigger company",
      "SnackCo is 16x larger despite cheaper shares",
    ],
  },
  "stocks-5": {
    title: "The Quarterly Payout Check",
    narrative: "Grace owns 40 shares of a steady utility company, Riverline Power, that shares part of its profit with owners four times a year. This quarter it announces a payout of $0.60 per share. Grace realizes she gets paid just for holding the stock, no selling required.",
    details: [
      "Grace owns 40 shares of Riverline Power",
      "Dividend: $0.60 per share this quarter",
      "Her payout: 40 x $0.60 = $24",
      "Paid 4 times a year to shareholders",
      "No need to sell to collect it",
    ],
  },
  "stocks-6": {
    title: "The Surprise Earnings Night",
    narrative: "Andre watches shares of a headphone maker, EchoWave, sitting at $50 before an evening report. The company reveals it sold far more units than expected and raised its outlook for next year. By the next morning the stock jumps to $58 as buyers pile in on the good news.",
    details: [
      "Price before report: $50",
      "News: sales beat expectations, outlook raised",
      "Price after: $58, up 16 percent",
      "New information changed what buyers will pay",
      "Prices move as expectations shift",
    ],
  },
  "stocks-7": {
    title: "Concert Ticket Frenzy",
    narrative: "Nadia notices that shares of a solar startup, SunPeak, behave like tickets to a sold-out concert. When far more people want to buy than sell, buyers keep raising their offers to get in and the price climbs. When sellers flood out and few want to buy, the price sinks fast.",
    details: [
      "Many buyers, few sellers = price rises",
      "Many sellers, few buyers = price falls",
      "SunPeak jumped $6 on a wave of buyers",
      "Price settles where buyers and sellers meet",
      "Same force sets ticket and stock prices",
    ],
  },
  "stocks-8": {
    title: "Three Ways to Place the Trade",
    narrative: "Sam has $220 saved and wants shares of a bike company, TrailCycle, trading near $44. He learns he can grab shares instantly at whatever price is showing, or set a cap and only buy at $42 or lower, or set a trigger to sell automatically if it ever drops to $38.",
    details: [
      "Market order: buys now at about $44",
      "Limit order: buys only at $42 or lower",
      "Stop order: sells if price falls to $38",
      "Sam's budget: $220, roughly 5 shares",
      "Order type controls price and timing",
    ],
  },
  "stocks-9": {
    title: "The Rollercoaster Week",
    narrative: "Talia tracks two stocks for a class project. A calm grocery chain, FreshMart, drifts between $30 and $31 all week. A tiny biotech, GenoLeap, swings from $20 to $28 and back to $19 in five days, making Talia's stomach drop just watching it.",
    details: [
      "FreshMart range: $30 to $31, very calm",
      "GenoLeap range: $19 to $28 in one week",
      "Big fast swings = high volatility",
      "Volatile stocks can gain or lose quickly",
      "Same week, wildly different risk",
    ],
  },
  "stocks-10": {
    title: "Decoding the App Screen",
    narrative: "Marcus opens his brokerage app to check a sneaker brand, StrideCo, before class. The page is packed with numbers: a current price, a day range, a 52-week range, market cap, and a P/E ratio. He wants to know what each figure is actually telling him.",
    details: [
      "Current price: $76.40, up 1.2 percent today",
      "Day range: $74.90 to $77.10",
      "52-week range: $58 to $91",
      "Market cap: $12 billion",
      "P/E ratio: 22, a valuation gauge",
    ],
  },
}
