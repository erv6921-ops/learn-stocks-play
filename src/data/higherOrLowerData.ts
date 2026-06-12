export interface HoLRound {
  // Left option
  aLabel: string
  aValue: string
  // Right option
  bLabel: string
  bValue: string
  // Which side is the larger value
  winner: "A" | "B"
}

export interface HoLSet {
  title: string
  rounds: HoLRound[]
}

export const higherOrLowerSets: HoLSet[] = [
  {
    title: "Stock Prices",
    rounds: [
      { aLabel: "AAPL", aValue: "$213", bLabel: "TSLA", bValue: "$248", winner: "B" },
      { aLabel: "NVDA", aValue: "$875", bLabel: "MSFT", bValue: "$415", winner: "A" },
      { aLabel: "AMZN", aValue: "$185", bLabel: "GOOGL", bValue: "$175", winner: "A" },
      { aLabel: "META", aValue: "$520", bLabel: "NFLX", bValue: "$680", winner: "B" },
      { aLabel: "JPM", aValue: "$205", bLabel: "BAC", bValue: "$40", winner: "A" },
    ],
  },
  {
    title: "Average US Salaries",
    rounds: [
      { aLabel: "Teacher", aValue: "$51,000", bLabel: "Nurse", bValue: "$63,000", winner: "B" },
      { aLabel: "Software Engineer", aValue: "$120,000", bLabel: "Plumber", bValue: "$61,000", winner: "A" },
      { aLabel: "Doctor", aValue: "$215,000", bLabel: "Lawyer", bValue: "$145,000", winner: "A" },
      { aLabel: "Electrician", aValue: "$61,000", bLabel: "Accountant", bValue: "$78,000", winner: "B" },
      { aLabel: "Chef", aValue: "$53,000", bLabel: "Firefighter", bValue: "$55,000", winner: "B" },
    ],
  },
  {
    title: "Interest Rates & Financial Facts",
    rounds: [
      { aLabel: "Credit card APR", aValue: "21.5%", bLabel: "Car loan APR", bValue: "7.1%", winner: "A" },
      { aLabel: "30yr mortgage rate", aValue: "6.8%", bLabel: "Student loan rate", bValue: "5.5%", winner: "A" },
      { aLabel: "Savings account", aValue: "4.5%", bLabel: "CD rate", bValue: "5.1%", winner: "B" },
      { aLabel: "S&P 500 avg annual return", aValue: "10%", bLabel: "Bond avg return", bValue: "4%", winner: "A" },
      { aLabel: "Inflation 2024", aValue: "3.1%", bLabel: "Fed funds rate", bValue: "5.3%", winner: "B" },
    ],
  },
  {
    title: "Real-World Costs",
    rounds: [
      { aLabel: "Average US rent", aValue: "$1,987/mo", bLabel: "Average car payment", bValue: "$738/mo", winner: "A" },
      { aLabel: "College tuition avg", aValue: "$10,662/yr", bLabel: "Average student debt", bValue: "$37,574", winner: "B" },
      { aLabel: "Netflix", aValue: "$15.49/mo", bLabel: "Spotify", bValue: "$10.99/mo", winner: "A" },
      { aLabel: "iPhone 15", aValue: "$799", bLabel: "PS5", bValue: "$499", winner: "A" },
      { aLabel: "Florida min wage", aValue: "$13/hr", bLabel: "Federal min wage", bValue: "$7.25/hr", winner: "A" },
    ],
  },
  {
    title: "Taxes & Government",
    rounds: [
      { aLabel: "Federal income tax top rate", aValue: "37%", bLabel: "Florida state income tax", bValue: "0%", winner: "A" },
      { aLabel: "Social Security tax rate", aValue: "6.2%", bLabel: "Medicare tax rate", bValue: "1.45%", winner: "A" },
      { aLabel: "Capital gains short-term", aValue: "37%", bLabel: "Capital gains long-term", bValue: "20%", winner: "A" },
      { aLabel: "Standard deduction single", aValue: "$14,600", bLabel: "Standard deduction married", bValue: "$29,200", winner: "B" },
      { aLabel: "Corporate tax rate", aValue: "21%", bLabel: "Self-employment tax", bValue: "15.3%", winner: "A" },
    ],
  },
  {
    title: "Fun Finance Facts",
    rounds: [
      { aLabel: "Warren Buffett net worth", aValue: "$130B", bLabel: "Elon Musk net worth", bValue: "$230B", winner: "B" },
      { aLabel: "US national debt", aValue: "$33T", bLabel: "US GDP", bValue: "$27T", winner: "A" },
      { aLabel: "Bitcoin all-time high", aValue: "$73,000", bLabel: "Gold price per oz", bValue: "$2,300", winner: "A" },
      { aLabel: "Cost to raise a child to 18", aValue: "$310,000", bLabel: "Average wedding cost", bValue: "$35,000", winner: "A" },
      { aLabel: "Amazon revenue per day", aValue: "$1.4B", bLabel: "Apple revenue per day", bValue: "$1.2B", winner: "A" },
    ],
  },
]

// Pick the set of 5 rounds for the day using (dayOfYear % 6) as the seed.
export function getHoLSetForDay(dayOfYear: number): HoLSet {
  return higherOrLowerSets[dayOfYear % higherOrLowerSets.length]
}
