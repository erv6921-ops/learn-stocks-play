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
  {
    title: "Big Tech Market Caps",
    rounds: [
      { aLabel: "Apple", aValue: "$3.4T", bLabel: "Microsoft", bValue: "$3.1T", winner: "A" },
      { aLabel: "Amazon", aValue: "$1.9T", bLabel: "Nvidia", bValue: "$3.0T", winner: "B" },
      { aLabel: "Alphabet (Google)", aValue: "$2.1T", bLabel: "Meta", bValue: "$1.3T", winner: "A" },
      { aLabel: "Tesla", aValue: "$0.8T", bLabel: "Berkshire Hathaway", bValue: "$0.9T", winner: "B" },
      { aLabel: "Netflix", aValue: "$0.30T", bLabel: "Disney", bValue: "$0.20T", winner: "A" },
    ],
  },
  {
    title: "Monthly Subscription Costs",
    rounds: [
      { aLabel: "Disney+", aValue: "$13.99", bLabel: "Hulu (no ads)", bValue: "$18.99", winner: "B" },
      { aLabel: "YouTube Premium", aValue: "$13.99", bLabel: "Apple Music", bValue: "$10.99", winner: "A" },
      { aLabel: "Amazon Prime", aValue: "$14.99", bLabel: "Costco membership", bValue: "$5.00", winner: "A" },
      { aLabel: "ChatGPT Plus", aValue: "$20.00", bLabel: "Adobe Photoshop", bValue: "$22.99", winner: "B" },
      { aLabel: "Xbox Game Pass", aValue: "$19.99", bLabel: "PlayStation Plus", bValue: "$17.99", winner: "A" },
    ],
  },
  {
    title: "Starting Salaries by Major",
    rounds: [
      { aLabel: "Nursing", aValue: "$60,000", bLabel: "Computer Science", bValue: "$75,000", winner: "B" },
      { aLabel: "Mechanical Engineering", aValue: "$70,000", bLabel: "Marketing", bValue: "$52,000", winner: "A" },
      { aLabel: "Psychology", aValue: "$42,000", bLabel: "Finance", bValue: "$62,000", winner: "B" },
      { aLabel: "Education", aValue: "$44,000", bLabel: "Accounting", bValue: "$58,000", winner: "B" },
      { aLabel: "Petroleum Engineering", aValue: "$87,000", bLabel: "Graphic Design", bValue: "$48,000", winner: "A" },
    ],
  },
  {
    title: "College Costs Per Year",
    rounds: [
      { aLabel: "Private university avg", aValue: "$56,000", bLabel: "Public in-state avg", bValue: "$11,000", winner: "A" },
      { aLabel: "Community college", aValue: "$3,900", bLabel: "Public out-of-state", bValue: "$28,000", winner: "B" },
      { aLabel: "Room & board avg", aValue: "$12,000", bLabel: "Textbooks per year", bValue: "$1,200", winner: "A" },
      { aLabel: "State flagship in-state", aValue: "$12,000", bLabel: "Harvard tuition", bValue: "$56,000", winner: "B" },
      { aLabel: "Undergrad avg", aValue: "$17,000", bLabel: "Grad school avg", bValue: "$20,000", winner: "B" },
    ],
  },
  {
    title: "Crypto & Digital Assets",
    rounds: [
      { aLabel: "Ethereum", aValue: "$3,400", bLabel: "Bitcoin", bValue: "$65,000", winner: "B" },
      { aLabel: "Dogecoin", aValue: "$0.15", bLabel: "Cardano", bValue: "$0.45", winner: "B" },
      { aLabel: "Ethereum", aValue: "$3,400", bLabel: "Solana", bValue: "$150", winner: "A" },
      { aLabel: "Litecoin", aValue: "$80", bLabel: "BNB", bValue: "$580", winner: "B" },
      { aLabel: "XRP", aValue: "$0.55", bLabel: "Dogecoin", bValue: "$0.15", winner: "A" },
    ],
  },
  {
    title: "Monthly Household Bills",
    rounds: [
      { aLabel: "Water bill", aValue: "$46", bLabel: "Electricity bill", bValue: "$137", winner: "B" },
      { aLabel: "Home internet", aValue: "$75", bLabel: "Cell phone plan", bValue: "$114", winner: "B" },
      { aLabel: "Car insurance", aValue: "$167", bLabel: "Renters insurance", bValue: "$15", winner: "A" },
      { aLabel: "Streaming services (all)", aValue: "$46", bLabel: "Natural gas bill", bValue: "$63", winner: "B" },
      { aLabel: "Gym membership", aValue: "$50", bLabel: "Groceries (1 person)", bValue: "$475", winner: "B" },
    ],
  },
  {
    title: "Retirement & Savings Numbers",
    rounds: [
      { aLabel: "401(k) contribution limit", aValue: "$23,000", bLabel: "IRA contribution limit", bValue: "$7,000", winner: "A" },
      { aLabel: "Avg savings account balance", aValue: "$8,000", bLabel: "Avg 401(k) balance", bValue: "$112,000", winner: "B" },
      { aLabel: "6-month emergency fund", aValue: "$18,000", bLabel: "Avg credit card debt", bValue: "$6,500", winner: "A" },
      { aLabel: "Federal poverty line (monthly)", aValue: "$1,255", bLabel: "Avg Social Security check", bValue: "$1,900", winner: "B" },
      { aLabel: "Median savings at age 60", aValue: "$172,000", bLabel: "Median savings at age 30", bValue: "$35,000", winner: "A" },
    ],
  },
  {
    title: "Company Revenue Per Year",
    rounds: [
      { aLabel: "Amazon", aValue: "$575B", bLabel: "Walmart", bValue: "$648B", winner: "B" },
      { aLabel: "Apple", aValue: "$383B", bLabel: "Alphabet (Google)", bValue: "$307B", winner: "A" },
      { aLabel: "Costco", aValue: "$242B", bLabel: "ExxonMobil", bValue: "$345B", winner: "B" },
      { aLabel: "McDonald's", aValue: "$25B", bLabel: "Starbucks", bValue: "$36B", winner: "B" },
      { aLabel: "Coca-Cola", aValue: "$46B", bLabel: "Nike", bValue: "$51B", winner: "B" },
    ],
  },
  {
    title: "Cars & Transportation Costs",
    rounds: [
      { aLabel: "Avg new car price", aValue: "$47,000", bLabel: "Avg used car price", bValue: "$27,000", winner: "A" },
      { aLabel: "Tesla Model 3", aValue: "$39,000", bLabel: "Toyota Camry", bValue: "$28,000", winner: "A" },
      { aLabel: "Gallon of gas (US avg)", aValue: "$3.40", bLabel: "Gallon of milk", bValue: "$4.00", winner: "B" },
      { aLabel: "New-car monthly payment", aValue: "$738", bLabel: "Used-car monthly payment", bValue: "$525", winner: "A" },
      { aLabel: "Full EV charge cost", aValue: "$12", bLabel: "Full tank of gas", bValue: "$55", winner: "B" },
    ],
  },
  {
    title: "World Economies (GDP)",
    rounds: [
      { aLabel: "China", aValue: "$18T", bLabel: "United States", bValue: "$27T", winner: "B" },
      { aLabel: "Japan", aValue: "$4.2T", bLabel: "Germany", bValue: "$4.5T", winner: "B" },
      { aLabel: "India", aValue: "$3.7T", bLabel: "United Kingdom", bValue: "$3.3T", winner: "A" },
      { aLabel: "Canada", aValue: "$2.1T", bLabel: "Brazil", bValue: "$2.2T", winner: "B" },
      { aLabel: "Italy", aValue: "$2.2T", bLabel: "France", bValue: "$3.0T", winner: "B" },
    ],
  },
  {
    title: "Debt & Credit Stats",
    rounds: [
      { aLabel: "Total student loan debt", aValue: "$1.7T", bLabel: "Total auto loan debt", bValue: "$1.6T", winner: "A" },
      { aLabel: "Avg mortgage balance", aValue: "$244,000", bLabel: "Avg auto loan balance", bValue: "$24,000", winner: "A" },
      { aLabel: "Avg credit card balance", aValue: "$6,500", bLabel: "Avg personal loan balance", bValue: "$11,000", winner: "B" },
      { aLabel: "Avg student loan balance", aValue: "$37,000", bLabel: "Avg credit card balance", bValue: "$6,500", winner: "A" },
      { aLabel: "Max FICO score", aValue: "850", bLabel: "Minimum 'good' FICO", bValue: "670", winner: "A" },
    ],
  },
  {
    title: "Sports & Entertainment Money",
    rounds: [
      { aLabel: "Avg NFL salary", aValue: "$2.7M", bLabel: "Avg NBA salary", bValue: "$9.7M", winner: "B" },
      { aLabel: "Taylor Swift Eras Tour gross", aValue: "$1B", bLabel: "Avg Hollywood movie budget", bValue: "$65M", winner: "A" },
      { aLabel: "Avg US home price", aValue: "$420,000", bLabel: "Super Bowl 30-sec ad", bValue: "$7M", winner: "B" },
      { aLabel: "Lionel Messi salary", aValue: "$135M", bLabel: "Cristiano Ronaldo salary", bValue: "$200M", winner: "B" },
      { aLabel: "Top streamer per year", aValue: "$30M", bLabel: "NFL rookie minimum", bValue: "$750,000", winner: "A" },
    ],
  },
]

// Pick the set of 5 rounds for the day using (dayOfYear % bank size) as the seed.
export function getHoLSetForDay(dayOfYear: number): HoLSet {
  return higherOrLowerSets[dayOfYear % higherOrLowerSets.length]
}
