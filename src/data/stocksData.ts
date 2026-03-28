import { Stock } from "@/types"

// Mock stock data for demonstration
export const mockStocks: Stock[] = [
  // Technology
  { symbol: "AAPL", name: "Apple Inc.", price: 178.72, change: 2.34, changePercent: 1.32, volume: 52847621, marketCap: 2780000000000, peRatio: 29.5, high52Week: 199.62, low52Week: 164.08, historicalData: generateHistoricalData(178.72) },
  { symbol: "MSFT", name: "Microsoft Corporation", price: 378.91, change: -1.23, changePercent: -0.32, volume: 18234567, marketCap: 2810000000000, peRatio: 35.2, high52Week: 384.30, low52Week: 309.45, historicalData: generateHistoricalData(378.91) },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 141.80, change: 3.45, changePercent: 2.49, volume: 21456789, marketCap: 1780000000000, peRatio: 25.8, high52Week: 153.78, low52Week: 115.35, historicalData: generateHistoricalData(141.80) },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 178.25, change: 4.12, changePercent: 2.36, volume: 45678123, marketCap: 1850000000000, peRatio: 62.4, high52Week: 189.50, low52Week: 118.35, historicalData: generateHistoricalData(178.25) },
  { symbol: "NVDA", name: "NVIDIA Corporation", price: 495.22, change: 12.56, changePercent: 2.60, volume: 38456123, marketCap: 1220000000000, peRatio: 65.3, high52Week: 505.48, low52Week: 222.97, historicalData: generateHistoricalData(495.22) },
  { symbol: "META", name: "Meta Platforms, Inc.", price: 505.95, change: 8.34, changePercent: 1.67, volume: 15234567, marketCap: 1300000000000, peRatio: 28.9, high52Week: 531.49, low52Week: 274.38, historicalData: generateHistoricalData(505.95) },
  { symbol: "TSLA", name: "Tesla, Inc.", price: 248.48, change: -5.67, changePercent: -2.23, volume: 98765432, marketCap: 789000000000, peRatio: 72.1, high52Week: 299.29, low52Week: 152.37, historicalData: generateHistoricalData(248.48) },
  { symbol: "AMD", name: "Advanced Micro Devices, Inc.", price: 121.45, change: 3.21, changePercent: 2.71, volume: 42567890, marketCap: 196000000000, peRatio: 45.2, high52Week: 164.46, low52Week: 93.12, historicalData: generateHistoricalData(121.45) },
  { symbol: "INTC", name: "Intel Corporation", price: 43.28, change: -0.89, changePercent: -2.01, volume: 28456789, marketCap: 182000000000, peRatio: 12.8, high52Week: 51.28, low52Week: 29.73, historicalData: generateHistoricalData(43.28) },
  { symbol: "CRM", name: "Salesforce, Inc.", price: 272.34, change: 5.67, changePercent: 2.13, volume: 5678234, marketCap: 264000000000, peRatio: 48.9, high52Week: 318.71, low52Week: 212.00, historicalData: generateHistoricalData(272.34) },
  { symbol: "ORCL", name: "Oracle Corporation", price: 118.92, change: 1.45, changePercent: 1.23, volume: 8234567, marketCap: 328000000000, peRatio: 22.4, high52Week: 127.54, low52Week: 99.26, historicalData: generateHistoricalData(118.92) },
  { symbol: "ADBE", name: "Adobe Inc.", price: 574.23, change: 8.92, changePercent: 1.58, volume: 2345678, marketCap: 258000000000, peRatio: 44.6, high52Week: 638.25, low52Week: 433.97, historicalData: generateHistoricalData(574.23) },
  { symbol: "CSCO", name: "Cisco Systems, Inc.", price: 48.56, change: 0.34, changePercent: 0.71, volume: 18234567, marketCap: 198000000000, peRatio: 14.2, high52Week: 58.19, low52Week: 44.42, historicalData: generateHistoricalData(48.56) },
  { symbol: "IBM", name: "International Business Machines", price: 162.78, change: 2.12, changePercent: 1.32, volume: 3456789, marketCap: 148000000000, peRatio: 21.5, high52Week: 196.90, low52Week: 135.87, historicalData: generateHistoricalData(162.78) },
  { symbol: "QCOM", name: "Qualcomm Incorporated", price: 145.67, change: 3.45, changePercent: 2.42, volume: 6789234, marketCap: 162000000000, peRatio: 18.9, high52Week: 170.43, low52Week: 101.47, historicalData: generateHistoricalData(145.67) },
  { symbol: "AVGO", name: "Broadcom Inc.", price: 1012.34, change: 15.67, changePercent: 1.57, volume: 2134567, marketCap: 472000000000, peRatio: 28.4, high52Week: 1115.00, low52Week: 796.02, historicalData: generateHistoricalData(1012.34) },
  { symbol: "TXN", name: "Texas Instruments Inc.", price: 168.92, change: -1.23, changePercent: -0.72, volume: 4567890, marketCap: 153000000000, peRatio: 22.8, high52Week: 187.19, low52Week: 139.49, historicalData: generateHistoricalData(168.92) },
  { symbol: "NOW", name: "ServiceNow, Inc.", price: 712.45, change: 12.34, changePercent: 1.76, volume: 1234567, marketCap: 145000000000, peRatio: 78.4, high52Week: 815.32, low52Week: 538.00, historicalData: generateHistoricalData(712.45) },
  { symbol: "UBER", name: "Uber Technologies, Inc.", price: 62.34, change: 1.23, changePercent: 2.01, volume: 15678234, marketCap: 129000000000, peRatio: 112.5, high52Week: 82.14, low52Week: 40.09, historicalData: generateHistoricalData(62.34) },
  { symbol: "SHOP", name: "Shopify Inc.", price: 78.92, change: 2.45, changePercent: 3.20, volume: 8234567, marketCap: 102000000000, peRatio: 85.3, high52Week: 91.57, low52Week: 45.50, historicalData: generateHistoricalData(78.92) },
  { symbol: "SQ", name: "Block, Inc.", price: 67.45, change: 1.89, changePercent: 2.88, volume: 9876543, marketCap: 41000000000, peRatio: 42.1, high52Week: 89.21, low52Week: 51.81, historicalData: generateHistoricalData(67.45) },
  { symbol: "PYPL", name: "PayPal Holdings, Inc.", price: 62.18, change: 0.92, changePercent: 1.50, volume: 12345678, marketCap: 68000000000, peRatio: 16.8, high52Week: 76.54, low52Week: 50.25, historicalData: generateHistoricalData(62.18) },
  { symbol: "SNAP", name: "Snap Inc.", price: 11.23, change: -0.34, changePercent: -2.94, volume: 23456789, marketCap: 18500000000, peRatio: -22.4, high52Week: 17.89, low52Week: 8.28, historicalData: generateHistoricalData(11.23) },
  { symbol: "PINS", name: "Pinterest, Inc.", price: 32.45, change: 0.78, changePercent: 2.46, volume: 7654321, marketCap: 22000000000, peRatio: 35.2, high52Week: 40.68, low52Week: 23.59, historicalData: generateHistoricalData(32.45) },
  { symbol: "SPOT", name: "Spotify Technology S.A.", price: 234.56, change: 5.67, changePercent: 2.48, volume: 2345678, marketCap: 46000000000, peRatio: 156.4, high52Week: 299.00, low52Week: 132.00, historicalData: generateHistoricalData(234.56) },
  { symbol: "NFLX", name: "Netflix, Inc.", price: 478.92, change: 7.89, changePercent: 1.67, volume: 4567890, marketCap: 212000000000, peRatio: 45.2, high52Week: 639.00, low52Week: 344.73, historicalData: generateHistoricalData(478.92) },
  { symbol: "ZM", name: "Zoom Video Communications", price: 68.45, change: -1.23, changePercent: -1.77, volume: 3456789, marketCap: 21000000000, peRatio: 18.9, high52Week: 75.91, low52Week: 58.88, historicalData: generateHistoricalData(68.45) },
  { symbol: "TWLO", name: "Twilio Inc.", price: 62.34, change: 1.56, changePercent: 2.57, volume: 2134567, marketCap: 11000000000, peRatio: -15.4, high52Week: 77.24, low52Week: 50.00, historicalData: generateHistoricalData(62.34) },
  { symbol: "DOCU", name: "DocuSign, Inc.", price: 58.92, change: 0.89, changePercent: 1.53, volume: 1876543, marketCap: 12000000000, peRatio: 48.2, high52Week: 64.96, low52Week: 40.00, historicalData: generateHistoricalData(58.92) },
  { symbol: "CRWD", name: "CrowdStrike Holdings", price: 234.56, change: 4.56, changePercent: 1.98, volume: 3234567, marketCap: 56000000000, peRatio: 89.4, high52Week: 365.00, low52Week: 140.52, historicalData: generateHistoricalData(234.56) },
  { symbol: "PANW", name: "Palo Alto Networks", price: 312.45, change: 5.67, changePercent: 1.85, volume: 2567890, marketCap: 102000000000, peRatio: 52.3, high52Week: 380.84, low52Week: 249.85, historicalData: generateHistoricalData(312.45) },
  { symbol: "DDOG", name: "Datadog, Inc.", price: 118.92, change: 2.34, changePercent: 2.01, volume: 2876543, marketCap: 39000000000, peRatio: 245.6, high52Week: 130.27, low52Week: 81.12, historicalData: generateHistoricalData(118.92) },
  { symbol: "NET", name: "Cloudflare, Inc.", price: 82.45, change: 1.89, changePercent: 2.35, volume: 4234567, marketCap: 28000000000, peRatio: 178.9, high52Week: 116.00, low52Week: 55.13, historicalData: generateHistoricalData(82.45) },
  { symbol: "PLTR", name: "Palantir Technologies", price: 18.92, change: 0.45, changePercent: 2.44, volume: 34567890, marketCap: 41000000000, peRatio: 245.8, high52Week: 27.50, low52Week: 13.68, historicalData: generateHistoricalData(18.92) },
  { symbol: "SNOW", name: "Snowflake Inc.", price: 178.45, change: 3.56, changePercent: 2.04, volume: 3456789, marketCap: 59000000000, peRatio: -156.4, high52Week: 237.72, low52Week: 107.13, historicalData: generateHistoricalData(178.45) },
  { symbol: "MDB", name: "MongoDB, Inc.", price: 378.92, change: 6.78, changePercent: 1.82, volume: 1234567, marketCap: 27000000000, peRatio: -89.4, high52Week: 509.62, low52Week: 212.74, historicalData: generateHistoricalData(378.92) },
  { symbol: "OKTA", name: "Okta, Inc.", price: 98.45, change: 1.67, changePercent: 1.73, volume: 1876543, marketCap: 16000000000, peRatio: -34.5, high52Week: 114.50, low52Week: 65.73, historicalData: generateHistoricalData(98.45) },
  { symbol: "WDAY", name: "Workday, Inc.", price: 268.92, change: 4.23, changePercent: 1.60, volume: 1567890, marketCap: 71000000000, peRatio: 42.8, high52Week: 289.79, low52Week: 196.10, historicalData: generateHistoricalData(268.92) },
  { symbol: "ZS", name: "Zscaler, Inc.", price: 198.45, change: 3.89, changePercent: 2.00, volume: 1234567, marketCap: 30000000000, peRatio: 312.5, high52Week: 259.61, low52Week: 154.31, historicalData: generateHistoricalData(198.45) },

  // Finance
  { symbol: "JPM", name: "JPMorgan Chase & Co.", price: 172.45, change: 2.34, changePercent: 1.38, volume: 8765432, marketCap: 498000000000, peRatio: 10.2, high52Week: 200.94, low52Week: 135.19, historicalData: generateHistoricalData(172.45) },
  { symbol: "BAC", name: "Bank of America Corp.", price: 34.56, change: 0.45, changePercent: 1.32, volume: 32456789, marketCap: 272000000000, peRatio: 9.8, high52Week: 38.60, low52Week: 24.96, historicalData: generateHistoricalData(34.56) },
  { symbol: "WFC", name: "Wells Fargo & Company", price: 48.92, change: 0.78, changePercent: 1.62, volume: 15678234, marketCap: 178000000000, peRatio: 11.4, high52Week: 62.55, low52Week: 38.38, historicalData: generateHistoricalData(48.92) },
  { symbol: "GS", name: "Goldman Sachs Group", price: 412.34, change: 5.67, changePercent: 1.39, volume: 2134567, marketCap: 134000000000, peRatio: 14.8, high52Week: 479.00, low52Week: 289.36, historicalData: generateHistoricalData(412.34) },
  { symbol: "MS", name: "Morgan Stanley", price: 92.45, change: 1.23, changePercent: 1.35, volume: 6789234, marketCap: 152000000000, peRatio: 13.2, high52Week: 109.73, low52Week: 72.35, historicalData: generateHistoricalData(92.45) },
  { symbol: "C", name: "Citigroup Inc.", price: 52.34, change: 0.67, changePercent: 1.30, volume: 12345678, marketCap: 99000000000, peRatio: 8.4, high52Week: 63.69, low52Week: 38.17, historicalData: generateHistoricalData(52.34) },
  { symbol: "BLK", name: "BlackRock, Inc.", price: 812.45, change: 12.34, changePercent: 1.54, volume: 567890, marketCap: 122000000000, peRatio: 21.8, high52Week: 971.53, low52Week: 638.72, historicalData: generateHistoricalData(812.45) },
  { symbol: "SCHW", name: "Charles Schwab Corp.", price: 68.92, change: 1.12, changePercent: 1.65, volume: 5678234, marketCap: 125000000000, peRatio: 18.4, high52Week: 84.00, low52Week: 48.66, historicalData: generateHistoricalData(68.92) },
  { symbol: "AXP", name: "American Express Company", price: 178.45, change: 2.56, changePercent: 1.46, volume: 2876543, marketCap: 132000000000, peRatio: 16.8, high52Week: 241.72, low52Week: 141.14, historicalData: generateHistoricalData(178.45) },
  { symbol: "V", name: "Visa Inc.", price: 278.92, change: 3.45, changePercent: 1.25, volume: 5234567, marketCap: 572000000000, peRatio: 29.4, high52Week: 290.96, low52Week: 227.68, historicalData: generateHistoricalData(278.92) },
  { symbol: "MA", name: "Mastercard Incorporated", price: 438.45, change: 5.67, changePercent: 1.31, volume: 2456789, marketCap: 412000000000, peRatio: 35.8, high52Week: 490.00, low52Week: 359.77, historicalData: generateHistoricalData(438.45) },
  { symbol: "COF", name: "Capital One Financial", price: 128.92, change: 1.89, changePercent: 1.49, volume: 2567890, marketCap: 49000000000, peRatio: 9.2, high52Week: 168.22, low52Week: 99.55, historicalData: generateHistoricalData(128.92) },
  { symbol: "USB", name: "U.S. Bancorp", price: 42.34, change: 0.56, changePercent: 1.34, volume: 4567890, marketCap: 66000000000, peRatio: 11.8, high52Week: 49.50, low52Week: 30.47, historicalData: generateHistoricalData(42.34) },
  { symbol: "PNC", name: "PNC Financial Services", price: 152.45, change: 2.12, changePercent: 1.41, volume: 1876543, marketCap: 61000000000, peRatio: 10.4, high52Week: 182.55, low52Week: 118.56, historicalData: generateHistoricalData(152.45) },

  // Healthcare
  { symbol: "JNJ", name: "Johnson & Johnson", price: 158.92, change: 1.23, changePercent: 0.78, volume: 6234567, marketCap: 383000000000, peRatio: 14.8, high52Week: 175.97, low52Week: 143.13, historicalData: generateHistoricalData(158.92) },
  { symbol: "UNH", name: "UnitedHealth Group", price: 512.34, change: 6.78, changePercent: 1.34, volume: 3234567, marketCap: 472000000000, peRatio: 22.4, high52Week: 554.70, low52Week: 436.38, historicalData: generateHistoricalData(512.34) },
  { symbol: "PFE", name: "Pfizer Inc.", price: 28.45, change: -0.34, changePercent: -1.18, volume: 28765432, marketCap: 160000000000, peRatio: 12.8, high52Week: 40.37, low52Week: 25.20, historicalData: generateHistoricalData(28.45) },
  { symbol: "MRK", name: "Merck & Co., Inc.", price: 108.92, change: 1.45, changePercent: 1.35, volume: 7234567, marketCap: 276000000000, peRatio: 15.2, high52Week: 131.95, low52Week: 99.14, historicalData: generateHistoricalData(108.92) },
  { symbol: "ABBV", name: "AbbVie Inc.", price: 162.45, change: 2.12, changePercent: 1.32, volume: 5678234, marketCap: 287000000000, peRatio: 13.4, high52Week: 179.77, low52Week: 135.85, historicalData: generateHistoricalData(162.45) },
  { symbol: "LLY", name: "Eli Lilly and Company", price: 612.34, change: 8.92, changePercent: 1.48, volume: 2456789, marketCap: 582000000000, peRatio: 78.4, high52Week: 629.97, low52Week: 309.20, historicalData: generateHistoricalData(612.34) },
  { symbol: "TMO", name: "Thermo Fisher Scientific", price: 512.45, change: 6.78, changePercent: 1.34, volume: 1567890, marketCap: 198000000000, peRatio: 32.8, high52Week: 604.57, low52Week: 456.78, historicalData: generateHistoricalData(512.45) },
  { symbol: "DHR", name: "Danaher Corporation", price: 248.92, change: 3.45, changePercent: 1.41, volume: 2234567, marketCap: 183000000000, peRatio: 28.4, high52Week: 273.37, low52Week: 197.83, historicalData: generateHistoricalData(248.92) },
  { symbol: "BMY", name: "Bristol-Myers Squibb", price: 52.34, change: 0.67, changePercent: 1.30, volume: 8234567, marketCap: 106000000000, peRatio: 18.9, high52Week: 73.63, low52Week: 39.35, historicalData: generateHistoricalData(52.34) },
  { symbol: "AMGN", name: "Amgen Inc.", price: 278.92, change: 3.56, changePercent: 1.29, volume: 2876543, marketCap: 149000000000, peRatio: 14.2, high52Week: 329.72, low52Week: 251.01, historicalData: generateHistoricalData(278.92) },
  { symbol: "GILD", name: "Gilead Sciences, Inc.", price: 78.45, change: 0.89, changePercent: 1.15, volume: 5678234, marketCap: 98000000000, peRatio: 11.8, high52Week: 87.84, low52Week: 62.07, historicalData: generateHistoricalData(78.45) },
  { symbol: "CVS", name: "CVS Health Corporation", price: 72.34, change: 0.78, changePercent: 1.09, volume: 6234567, marketCap: 91000000000, peRatio: 10.2, high52Week: 83.25, low52Week: 52.77, historicalData: generateHistoricalData(72.34) },
  { symbol: "CI", name: "The Cigna Group", price: 298.92, change: 3.89, changePercent: 1.32, volume: 1234567, marketCap: 86000000000, peRatio: 12.4, high52Week: 357.63, low52Week: 261.33, historicalData: generateHistoricalData(298.92) },
  { symbol: "HUM", name: "Humana Inc.", price: 412.45, change: 5.67, changePercent: 1.39, volume: 876543, marketCap: 50000000000, peRatio: 16.8, high52Week: 533.55, low52Week: 286.63, historicalData: generateHistoricalData(412.45) },
  { symbol: "MRNA", name: "Moderna, Inc.", price: 98.45, change: 2.34, changePercent: 2.44, volume: 4567890, marketCap: 38000000000, peRatio: -8.4, high52Week: 170.47, low52Week: 62.55, historicalData: generateHistoricalData(98.45) },
  { symbol: "REGN", name: "Regeneron Pharmaceuticals", price: 892.34, change: 12.45, changePercent: 1.42, volume: 567890, marketCap: 99000000000, peRatio: 22.8, high52Week: 1037.19, low52Week: 698.69, historicalData: generateHistoricalData(892.34) },
  { symbol: "VRTX", name: "Vertex Pharmaceuticals", price: 412.45, change: 5.89, changePercent: 1.45, volume: 1234567, marketCap: 106000000000, peRatio: 28.4, high52Week: 464.60, low52Week: 340.60, historicalData: generateHistoricalData(412.45) },
  { symbol: "BIIB", name: "Biogen Inc.", price: 218.92, change: 2.78, changePercent: 1.29, volume: 987654, marketCap: 32000000000, peRatio: 18.4, high52Week: 283.92, low52Week: 192.21, historicalData: generateHistoricalData(218.92) },

  // Consumer
  { symbol: "KO", name: "The Coca-Cola Company", price: 58.92, change: 0.45, changePercent: 0.77, volume: 12345678, marketCap: 255000000000, peRatio: 23.8, high52Week: 64.99, low52Week: 51.55, historicalData: generateHistoricalData(58.92) },
  { symbol: "PEP", name: "PepsiCo, Inc.", price: 168.45, change: 1.23, changePercent: 0.74, volume: 4567890, marketCap: 232000000000, peRatio: 26.4, high52Week: 196.88, low52Week: 155.83, historicalData: generateHistoricalData(168.45) },
  { symbol: "WMT", name: "Walmart Inc.", price: 162.34, change: 1.89, changePercent: 1.18, volume: 6789234, marketCap: 437000000000, peRatio: 28.2, high52Week: 170.00, low52Week: 143.15, historicalData: generateHistoricalData(162.34) },
  { symbol: "COST", name: "Costco Wholesale Corp.", price: 578.92, change: 6.78, changePercent: 1.18, volume: 1876543, marketCap: 257000000000, peRatio: 42.8, high52Week: 605.00, low52Week: 474.00, historicalData: generateHistoricalData(578.92) },
  { symbol: "HD", name: "The Home Depot, Inc.", price: 348.45, change: 4.56, changePercent: 1.33, volume: 3456789, marketCap: 347000000000, peRatio: 22.4, high52Week: 396.87, low52Week: 274.26, historicalData: generateHistoricalData(348.45) },
  { symbol: "MCD", name: "McDonald's Corporation", price: 292.34, change: 2.89, changePercent: 1.00, volume: 2567890, marketCap: 212000000000, peRatio: 25.8, high52Week: 302.39, low52Week: 243.53, historicalData: generateHistoricalData(292.34) },
  { symbol: "NKE", name: "NIKE, Inc.", price: 98.45, change: 1.23, changePercent: 1.26, volume: 5678234, marketCap: 149000000000, peRatio: 28.4, high52Week: 123.39, low52Week: 88.66, historicalData: generateHistoricalData(98.45) },
  { symbol: "SBUX", name: "Starbucks Corporation", price: 98.92, change: 1.12, changePercent: 1.14, volume: 5234567, marketCap: 113000000000, peRatio: 26.2, high52Week: 115.48, low52Week: 71.80, historicalData: generateHistoricalData(98.92) },
  { symbol: "DIS", name: "The Walt Disney Company", price: 91.24, change: -0.89, changePercent: -0.97, volume: 8765432, marketCap: 167000000000, peRatio: 44.2, high52Week: 123.74, low52Week: 78.73, historicalData: generateHistoricalData(91.24) },
  { symbol: "PG", name: "Procter & Gamble Co.", price: 152.34, change: 0.89, changePercent: 0.59, volume: 5678234, marketCap: 358000000000, peRatio: 24.8, high52Week: 165.35, low52Week: 141.45, historicalData: generateHistoricalData(152.34) },
  { symbol: "TGT", name: "Target Corporation", price: 142.45, change: 1.67, changePercent: 1.19, volume: 3234567, marketCap: 66000000000, peRatio: 16.8, high52Week: 181.86, low52Week: 102.93, historicalData: generateHistoricalData(142.45) },
  { symbol: "LOW", name: "Lowe's Companies, Inc.", price: 218.92, change: 2.89, changePercent: 1.34, volume: 2456789, marketCap: 128000000000, peRatio: 18.4, high52Week: 263.69, low52Week: 181.85, historicalData: generateHistoricalData(218.92) },
  { symbol: "CMG", name: "Chipotle Mexican Grill", price: 2245.67, change: 28.92, changePercent: 1.30, volume: 234567, marketCap: 62000000000, peRatio: 48.6, high52Week: 2440.00, low52Week: 1344.05, historicalData: generateHistoricalData(2245.67) },
  { symbol: "YUM", name: "Yum! Brands, Inc.", price: 132.45, change: 1.45, changePercent: 1.11, volume: 1567890, marketCap: 37000000000, peRatio: 24.2, high52Week: 143.22, low52Week: 119.41, historicalData: generateHistoricalData(132.45) },
  { symbol: "DPZ", name: "Domino's Pizza, Inc.", price: 428.92, change: 5.67, changePercent: 1.34, volume: 567890, marketCap: 15000000000, peRatio: 26.8, high52Week: 543.69, low52Week: 282.58, historicalData: generateHistoricalData(428.92) },
  { symbol: "LULU", name: "Lululemon Athletica", price: 412.34, change: 5.89, changePercent: 1.45, volume: 876543, marketCap: 52000000000, peRatio: 32.4, high52Week: 516.39, low52Week: 293.03, historicalData: generateHistoricalData(412.34) },
  { symbol: "ULTA", name: "Ulta Beauty, Inc.", price: 478.92, change: 6.78, changePercent: 1.44, volume: 567890, marketCap: 24000000000, peRatio: 18.6, high52Week: 574.76, low52Week: 347.00, historicalData: generateHistoricalData(478.92) },
  { symbol: "ROST", name: "Ross Stores, Inc.", price: 142.34, change: 1.89, changePercent: 1.35, volume: 1876543, marketCap: 48000000000, peRatio: 24.8, high52Week: 157.50, low52Week: 107.03, historicalData: generateHistoricalData(142.34) },
  { symbol: "TJX", name: "The TJX Companies, Inc.", price: 98.45, change: 1.12, changePercent: 1.15, volume: 3456789, marketCap: 113000000000, peRatio: 26.4, high52Week: 110.26, low52Week: 83.48, historicalData: generateHistoricalData(98.45) },
  { symbol: "DG", name: "Dollar General Corporation", price: 128.92, change: 1.56, changePercent: 1.22, volume: 2234567, marketCap: 28000000000, peRatio: 14.8, high52Week: 168.07, low52Week: 101.00, historicalData: generateHistoricalData(128.92) },
  { symbol: "DLTR", name: "Dollar Tree, Inc.", price: 142.45, change: 1.78, changePercent: 1.26, volume: 1567890, marketCap: 31000000000, peRatio: 22.4, high52Week: 152.95, low52Week: 103.41, historicalData: generateHistoricalData(142.45) },

  // Industrial
  { symbol: "CAT", name: "Caterpillar Inc.", price: 298.45, change: 3.89, changePercent: 1.32, volume: 2456789, marketCap: 152000000000, peRatio: 16.8, high52Week: 351.63, low52Week: 227.02, historicalData: generateHistoricalData(298.45) },
  { symbol: "BA", name: "The Boeing Company", price: 212.34, change: 2.78, changePercent: 1.33, volume: 4567890, marketCap: 128000000000, peRatio: -28.4, high52Week: 267.54, low52Week: 176.25, historicalData: generateHistoricalData(212.34) },
  { symbol: "GE", name: "General Electric Company", price: 118.92, change: 1.89, changePercent: 1.61, volume: 6234567, marketCap: 130000000000, peRatio: 22.4, high52Week: 143.98, low52Week: 84.82, historicalData: generateHistoricalData(118.92) },
  { symbol: "HON", name: "Honeywell International", price: 198.45, change: 2.45, changePercent: 1.25, volume: 2876543, marketCap: 130000000000, peRatio: 24.8, high52Week: 221.22, low52Week: 176.00, historicalData: generateHistoricalData(198.45) },
  { symbol: "UPS", name: "United Parcel Service", price: 152.34, change: 1.78, changePercent: 1.18, volume: 2567890, marketCap: 131000000000, peRatio: 16.2, high52Week: 193.61, low52Week: 123.12, historicalData: generateHistoricalData(152.34) },
  { symbol: "FDX", name: "FedEx Corporation", price: 262.45, change: 3.45, changePercent: 1.33, volume: 1876543, marketCap: 65000000000, peRatio: 14.8, high52Week: 319.90, low52Week: 214.18, historicalData: generateHistoricalData(262.45) },
  { symbol: "RTX", name: "RTX Corporation", price: 92.34, change: 1.12, changePercent: 1.23, volume: 4234567, marketCap: 124000000000, peRatio: 18.4, high52Week: 112.44, low52Week: 74.29, historicalData: generateHistoricalData(92.34) },
  { symbol: "LMT", name: "Lockheed Martin Corp.", price: 452.34, change: 5.67, changePercent: 1.27, volume: 987654, marketCap: 115000000000, peRatio: 16.2, high52Week: 510.23, low52Week: 403.99, historicalData: generateHistoricalData(452.34) },
  { symbol: "NOC", name: "Northrop Grumman Corp.", price: 478.92, change: 5.89, changePercent: 1.24, volume: 678234, marketCap: 73000000000, peRatio: 18.8, high52Week: 520.68, low52Week: 426.12, historicalData: generateHistoricalData(478.92) },
  { symbol: "GD", name: "General Dynamics Corp.", price: 262.45, change: 3.12, changePercent: 1.20, volume: 876543, marketCap: 72000000000, peRatio: 18.4, high52Week: 293.30, low52Week: 225.20, historicalData: generateHistoricalData(262.45) },
  { symbol: "DE", name: "Deere & Company", price: 398.45, change: 4.89, changePercent: 1.24, volume: 1456789, marketCap: 115000000000, peRatio: 12.8, high52Week: 451.46, low52Week: 343.96, historicalData: generateHistoricalData(398.45) },
  { symbol: "MMM", name: "3M Company", price: 98.92, change: 1.23, changePercent: 1.26, volume: 2567890, marketCap: 55000000000, peRatio: 11.4, high52Week: 128.30, low52Week: 85.35, historicalData: generateHistoricalData(98.92) },
  { symbol: "EMR", name: "Emerson Electric Co.", price: 98.45, change: 1.12, changePercent: 1.15, volume: 2234567, marketCap: 56000000000, peRatio: 18.2, high52Week: 110.00, low52Week: 83.00, historicalData: generateHistoricalData(98.45) },

  // Energy
  { symbol: "XOM", name: "Exxon Mobil Corporation", price: 102.34, change: 1.45, changePercent: 1.44, volume: 14567890, marketCap: 408000000000, peRatio: 10.8, high52Week: 120.70, low52Week: 95.77, historicalData: generateHistoricalData(102.34) },
  { symbol: "CVX", name: "Chevron Corporation", price: 152.45, change: 1.89, changePercent: 1.25, volume: 6234567, marketCap: 284000000000, peRatio: 11.2, high52Week: 189.68, low52Week: 139.62, historicalData: generateHistoricalData(152.45) },
  { symbol: "COP", name: "ConocoPhillips", price: 118.92, change: 1.56, changePercent: 1.33, volume: 5234567, marketCap: 139000000000, peRatio: 11.8, high52Week: 127.69, low52Week: 96.46, historicalData: generateHistoricalData(118.92) },
  { symbol: "SLB", name: "Schlumberger Limited", price: 52.34, change: 0.78, changePercent: 1.51, volume: 7234567, marketCap: 75000000000, peRatio: 14.8, high52Week: 62.80, low52Week: 42.27, historicalData: generateHistoricalData(52.34) },
  { symbol: "EOG", name: "EOG Resources, Inc.", price: 122.45, change: 1.67, changePercent: 1.38, volume: 2876543, marketCap: 72000000000, peRatio: 9.4, high52Week: 139.67, low52Week: 107.30, historicalData: generateHistoricalData(122.45) },
  { symbol: "PXD", name: "Pioneer Natural Resources", price: 228.92, change: 2.89, changePercent: 1.28, volume: 1567890, marketCap: 53000000000, peRatio: 8.2, high52Week: 265.89, low52Week: 197.94, historicalData: generateHistoricalData(228.92) },
  { symbol: "OXY", name: "Occidental Petroleum", price: 62.34, change: 0.89, changePercent: 1.45, volume: 8234567, marketCap: 56000000000, peRatio: 12.4, high52Week: 71.18, low52Week: 55.12, historicalData: generateHistoricalData(62.34) },
  { symbol: "VLO", name: "Valero Energy Corporation", price: 142.45, change: 1.78, changePercent: 1.26, volume: 2567890, marketCap: 49000000000, peRatio: 5.8, high52Week: 175.30, low52Week: 109.20, historicalData: generateHistoricalData(142.45) },
  { symbol: "PSX", name: "Phillips 66", price: 118.92, change: 1.45, changePercent: 1.23, volume: 2234567, marketCap: 52000000000, peRatio: 6.4, high52Week: 150.73, low52Week: 98.78, historicalData: generateHistoricalData(118.92) },
  { symbol: "MPC", name: "Marathon Petroleum Corp.", price: 152.34, change: 1.89, changePercent: 1.25, volume: 2456789, marketCap: 59000000000, peRatio: 5.2, high52Week: 190.91, low52Week: 116.63, historicalData: generateHistoricalData(152.34) },

  // Utilities
  { symbol: "NEE", name: "NextEra Energy, Inc.", price: 72.34, change: 0.56, changePercent: 0.78, volume: 7234567, marketCap: 149000000000, peRatio: 22.4, high52Week: 86.10, low52Week: 50.13, historicalData: generateHistoricalData(72.34) },
  { symbol: "DUK", name: "Duke Energy Corporation", price: 98.45, change: 0.67, changePercent: 0.69, volume: 2876543, marketCap: 76000000000, peRatio: 18.8, high52Week: 107.48, low52Week: 85.61, historicalData: generateHistoricalData(98.45) },
  { symbol: "SO", name: "The Southern Company", price: 72.34, change: 0.45, changePercent: 0.63, volume: 4234567, marketCap: 79000000000, peRatio: 21.2, high52Week: 80.57, low52Week: 62.61, historicalData: generateHistoricalData(72.34) },
  { symbol: "D", name: "Dominion Energy, Inc.", price: 48.92, change: 0.34, changePercent: 0.70, volume: 3234567, marketCap: 41000000000, peRatio: 16.4, high52Week: 56.19, low52Week: 38.23, historicalData: generateHistoricalData(48.92) },
  { symbol: "AEP", name: "American Electric Power", price: 82.34, change: 0.56, changePercent: 0.68, volume: 2456789, marketCap: 43000000000, peRatio: 16.8, high52Week: 96.47, low52Week: 72.13, historicalData: generateHistoricalData(82.34) },
  { symbol: "EXC", name: "Exelon Corporation", price: 38.45, change: 0.28, changePercent: 0.73, volume: 5678234, marketCap: 38000000000, peRatio: 14.2, high52Week: 44.67, low52Week: 34.24, historicalData: generateHistoricalData(38.45) },

  // Real Estate
  { symbol: "AMT", name: "American Tower Corporation", price: 198.45, change: 1.89, changePercent: 0.96, volume: 1567890, marketCap: 93000000000, peRatio: 42.8, high52Week: 230.00, low52Week: 154.58, historicalData: generateHistoricalData(198.45) },
  { symbol: "PLD", name: "Prologis, Inc.", price: 128.92, change: 1.23, changePercent: 0.96, volume: 2234567, marketCap: 119000000000, peRatio: 48.4, high52Week: 141.68, low52Week: 96.64, historicalData: generateHistoricalData(128.92) },
  { symbol: "CCI", name: "Crown Castle Inc.", price: 112.34, change: 0.89, changePercent: 0.80, volume: 1876543, marketCap: 49000000000, peRatio: 38.2, high52Week: 124.00, low52Week: 84.72, historicalData: generateHistoricalData(112.34) },
  { symbol: "EQIX", name: "Equinix, Inc.", price: 812.45, change: 8.92, changePercent: 1.11, volume: 456789, marketCap: 78000000000, peRatio: 82.4, high52Week: 884.00, low52Week: 655.00, historicalData: generateHistoricalData(812.45) },
  { symbol: "SPG", name: "Simon Property Group", price: 148.92, change: 1.67, changePercent: 1.13, volume: 1234567, marketCap: 49000000000, peRatio: 22.8, high52Week: 160.34, low52Week: 104.63, historicalData: generateHistoricalData(148.92) },
  { symbol: "O", name: "Realty Income Corporation", price: 58.45, change: 0.45, changePercent: 0.78, volume: 3456789, marketCap: 42000000000, peRatio: 42.4, high52Week: 66.69, low52Week: 47.99, historicalData: generateHistoricalData(58.45) },

  // Communications
  { symbol: "VZ", name: "Verizon Communications", price: 38.92, change: 0.34, changePercent: 0.88, volume: 15678234, marketCap: 164000000000, peRatio: 8.4, high52Week: 43.42, low52Week: 30.14, historicalData: generateHistoricalData(38.92) },
  { symbol: "T", name: "AT&T Inc.", price: 17.45, change: 0.12, changePercent: 0.69, volume: 28765432, marketCap: 125000000000, peRatio: 6.8, high52Week: 22.84, low52Week: 13.43, historicalData: generateHistoricalData(17.45) },
  { symbol: "TMUS", name: "T-Mobile US, Inc.", price: 162.34, change: 1.89, changePercent: 1.18, volume: 3456789, marketCap: 191000000000, peRatio: 24.2, high52Week: 174.00, low52Week: 131.88, historicalData: generateHistoricalData(162.34) },
  { symbol: "CMCSA", name: "Comcast Corporation", price: 42.34, change: 0.45, changePercent: 1.07, volume: 14567890, marketCap: 173000000000, peRatio: 10.8, high52Week: 47.07, low52Week: 37.25, historicalData: generateHistoricalData(42.34) },
  { symbol: "CHTR", name: "Charter Communications", price: 378.92, change: 4.56, changePercent: 1.22, volume: 987654, marketCap: 56000000000, peRatio: 11.2, high52Week: 502.21, low52Week: 290.62, historicalData: generateHistoricalData(378.92) },

  // Materials
  { symbol: "LIN", name: "Linde plc", price: 412.34, change: 4.56, changePercent: 1.12, volume: 1456789, marketCap: 201000000000, peRatio: 32.8, high52Week: 469.96, low52Week: 351.10, historicalData: generateHistoricalData(412.34) },
  { symbol: "APD", name: "Air Products & Chemicals", price: 292.45, change: 3.12, changePercent: 1.08, volume: 987654, marketCap: 65000000000, peRatio: 28.4, high52Week: 313.00, low52Week: 212.85, historicalData: generateHistoricalData(292.45) },
  { symbol: "SHW", name: "The Sherwin-Williams Co.", price: 312.45, change: 3.45, changePercent: 1.12, volume: 876543, marketCap: 81000000000, peRatio: 32.2, high52Week: 340.00, low52Week: 234.94, historicalData: generateHistoricalData(312.45) },
  { symbol: "FCX", name: "Freeport-McMoRan Inc.", price: 42.34, change: 0.78, changePercent: 1.88, volume: 12345678, marketCap: 61000000000, peRatio: 22.8, high52Week: 51.99, low52Week: 33.22, historicalData: generateHistoricalData(42.34) },
  { symbol: "NUE", name: "Nucor Corporation", price: 168.92, change: 2.12, changePercent: 1.27, volume: 1567890, marketCap: 41000000000, peRatio: 8.4, high52Week: 196.24, low52Week: 140.79, historicalData: generateHistoricalData(168.92) },
  { symbol: "NEM", name: "Newmont Corporation", price: 42.34, change: 0.56, changePercent: 1.34, volume: 6234567, marketCap: 33000000000, peRatio: 18.2, high52Week: 52.81, low52Week: 29.42, historicalData: generateHistoricalData(42.34) },

  // Automotive
  { symbol: "F", name: "Ford Motor Company", price: 12.34, change: 0.18, changePercent: 1.48, volume: 42567890, marketCap: 49000000000, peRatio: 6.8, high52Week: 15.42, low52Week: 9.63, historicalData: generateHistoricalData(12.34) },
  { symbol: "GM", name: "General Motors Company", price: 38.45, change: 0.56, changePercent: 1.48, volume: 12345678, marketCap: 53000000000, peRatio: 5.4, high52Week: 43.63, low52Week: 26.30, historicalData: generateHistoricalData(38.45) },
  { symbol: "RIVN", name: "Rivian Automotive, Inc.", price: 18.92, change: 0.45, changePercent: 2.44, volume: 23456789, marketCap: 18000000000, peRatio: -4.2, high52Week: 28.06, low52Week: 10.05, historicalData: generateHistoricalData(18.92) },
  { symbol: "LCID", name: "Lucid Group, Inc.", price: 4.56, change: 0.12, changePercent: 2.70, volume: 34567890, marketCap: 10500000000, peRatio: -2.8, high52Week: 8.37, low52Week: 2.29, historicalData: generateHistoricalData(4.56) },

  // Airlines
  { symbol: "DAL", name: "Delta Air Lines, Inc.", price: 42.34, change: 0.67, changePercent: 1.61, volume: 8234567, marketCap: 27000000000, peRatio: 7.2, high52Week: 53.86, low52Week: 32.86, historicalData: generateHistoricalData(42.34) },
  { symbol: "UAL", name: "United Airlines Holdings", price: 48.92, change: 0.89, changePercent: 1.85, volume: 5678234, marketCap: 16000000000, peRatio: 5.8, high52Week: 60.75, low52Week: 33.68, historicalData: generateHistoricalData(48.92) },
  { symbol: "AAL", name: "American Airlines Group", price: 14.56, change: 0.23, changePercent: 1.60, volume: 18234567, marketCap: 10000000000, peRatio: 5.2, high52Week: 18.19, low52Week: 10.13, historicalData: generateHistoricalData(14.56) },
  { symbol: "LUV", name: "Southwest Airlines Co.", price: 28.45, change: 0.34, changePercent: 1.21, volume: 6234567, marketCap: 17000000000, peRatio: 28.4, high52Week: 37.58, low52Week: 21.91, historicalData: generateHistoricalData(28.45) },

  // Entertainment & Gaming
  { symbol: "EA", name: "Electronic Arts Inc.", price: 138.92, change: 1.78, changePercent: 1.30, volume: 2234567, marketCap: 38000000000, peRatio: 32.8, high52Week: 148.86, low52Week: 113.32, historicalData: generateHistoricalData(138.92) },
  { symbol: "TTWO", name: "Take-Two Interactive", price: 152.34, change: 1.89, changePercent: 1.26, volume: 1234567, marketCap: 26000000000, peRatio: -42.8, high52Week: 171.02, low52Week: 132.11, historicalData: generateHistoricalData(152.34) },
  { symbol: "ATVI", name: "Activision Blizzard", price: 94.45, change: 0.12, changePercent: 0.13, volume: 4567890, marketCap: 74000000000, peRatio: 28.4, high52Week: 95.23, low52Week: 70.00, historicalData: generateHistoricalData(94.45) },
  { symbol: "RBLX", name: "Roblox Corporation", price: 42.34, change: 1.12, changePercent: 2.72, volume: 12345678, marketCap: 26000000000, peRatio: -28.4, high52Week: 47.86, low52Week: 24.90, historicalData: generateHistoricalData(42.34) },
  { symbol: "DKNG", name: "DraftKings Inc.", price: 32.45, change: 0.78, changePercent: 2.46, volume: 8234567, marketCap: 15000000000, peRatio: -18.2, high52Week: 49.57, low52Week: 21.13, historicalData: generateHistoricalData(32.45) },

  // Food & Beverage
  { symbol: "MDLZ", name: "Mondelez International", price: 72.34, change: 0.56, changePercent: 0.78, volume: 5234567, marketCap: 99000000000, peRatio: 22.4, high52Week: 77.57, low52Week: 62.01, historicalData: generateHistoricalData(72.34) },
  { symbol: "KHC", name: "The Kraft Heinz Company", price: 34.56, change: 0.23, changePercent: 0.67, volume: 6789234, marketCap: 42000000000, peRatio: 14.8, high52Week: 40.99, low52Week: 29.70, historicalData: generateHistoricalData(34.56) },
  { symbol: "GIS", name: "General Mills, Inc.", price: 68.92, change: 0.45, changePercent: 0.66, volume: 3234567, marketCap: 39000000000, peRatio: 16.2, high52Week: 89.00, low52Week: 60.12, historicalData: generateHistoricalData(68.92) },
  { symbol: "K", name: "Kellogg Company", price: 58.45, change: 0.34, changePercent: 0.59, volume: 2456789, marketCap: 20000000000, peRatio: 18.4, high52Week: 74.38, low52Week: 55.73, historicalData: generateHistoricalData(58.45) },
  { symbol: "HSY", name: "The Hershey Company", price: 198.92, change: 1.23, changePercent: 0.62, volume: 876543, marketCap: 41000000000, peRatio: 22.8, high52Week: 276.88, low52Week: 178.82, historicalData: generateHistoricalData(198.92) },
  { symbol: "MKC", name: "McCormick & Company", price: 78.45, change: 0.56, changePercent: 0.72, volume: 1234567, marketCap: 21000000000, peRatio: 28.4, high52Week: 95.63, low52Week: 67.30, historicalData: generateHistoricalData(78.45) },

  // Restaurants
  { symbol: "QSR", name: "Restaurant Brands Intl.", price: 72.34, change: 0.78, changePercent: 1.09, volume: 1876543, marketCap: 23000000000, peRatio: 18.2, high52Week: 81.00, low52Week: 61.85, historicalData: generateHistoricalData(72.34) },
  { symbol: "WING", name: "Wingstop Inc.", price: 312.45, change: 5.67, changePercent: 1.85, volume: 345678, marketCap: 9200000000, peRatio: 112.4, high52Week: 423.00, low52Week: 175.00, historicalData: generateHistoricalData(312.45) },
  { symbol: "SHAK", name: "Shake Shack Inc.", price: 72.34, change: 1.23, changePercent: 1.73, volume: 567890, marketCap: 3000000000, peRatio: 178.9, high52Week: 115.49, low52Week: 50.85, historicalData: generateHistoricalData(72.34) },

  // Semiconductors
  { symbol: "MU", name: "Micron Technology, Inc.", price: 78.45, change: 1.89, changePercent: 2.47, volume: 18234567, marketCap: 87000000000, peRatio: -12.8, high52Week: 85.99, low52Week: 56.14, historicalData: generateHistoricalData(78.45) },
  { symbol: "LRCX", name: "Lam Research Corporation", price: 712.34, change: 12.45, changePercent: 1.78, volume: 1234567, marketCap: 95000000000, peRatio: 22.4, high52Week: 800.75, low52Week: 506.72, historicalData: generateHistoricalData(712.34) },
  { symbol: "AMAT", name: "Applied Materials, Inc.", price: 152.34, change: 2.56, changePercent: 1.71, volume: 5678234, marketCap: 127000000000, peRatio: 18.9, high52Week: 178.00, low52Week: 123.76, historicalData: generateHistoricalData(152.34) },
  { symbol: "KLAC", name: "KLA Corporation", price: 578.92, change: 9.45, changePercent: 1.66, volume: 876543, marketCap: 79000000000, peRatio: 22.8, high52Week: 640.00, low52Week: 433.50, historicalData: generateHistoricalData(578.92) },
  { symbol: "MRVL", name: "Marvell Technology, Inc.", price: 58.45, change: 1.34, changePercent: 2.35, volume: 12345678, marketCap: 51000000000, peRatio: -58.4, high52Week: 79.49, low52Week: 41.52, historicalData: generateHistoricalData(58.45) },
  { symbol: "ON", name: "ON Semiconductor Corp.", price: 78.92, change: 1.67, changePercent: 2.16, volume: 6234567, marketCap: 34000000000, peRatio: 14.2, high52Week: 108.00, low52Week: 55.38, historicalData: generateHistoricalData(78.92) },
  { symbol: "ADI", name: "Analog Devices, Inc.", price: 198.45, change: 2.78, changePercent: 1.42, volume: 2345678, marketCap: 99000000000, peRatio: 32.4, high52Week: 216.00, low52Week: 161.21, historicalData: generateHistoricalData(198.45) },

  // Biotech
  { symbol: "ILMN", name: "Illumina, Inc.", price: 138.92, change: 2.34, changePercent: 1.71, volume: 1567890, marketCap: 22000000000, peRatio: -18.4, high52Week: 180.38, low52Week: 89.00, historicalData: generateHistoricalData(138.92) },
  { symbol: "EXAS", name: "Exact Sciences Corporation", price: 68.45, change: 1.23, changePercent: 1.83, volume: 2234567, marketCap: 12000000000, peRatio: -22.8, high52Week: 93.67, low52Week: 47.63, historicalData: generateHistoricalData(68.45) },
  { symbol: "SGEN", name: "Seagen Inc.", price: 212.34, change: 0.45, changePercent: 0.21, volume: 987654, marketCap: 39000000000, peRatio: -48.2, high52Week: 229.00, low52Week: 107.88, historicalData: generateHistoricalData(212.34) },
  { symbol: "ALNY", name: "Alnylam Pharmaceuticals", price: 198.92, change: 3.45, changePercent: 1.76, volume: 876543, marketCap: 25000000000, peRatio: -28.4, high52Week: 245.00, low52Week: 152.34, historicalData: generateHistoricalData(198.92) },
  { symbol: "BMRN", name: "BioMarin Pharmaceutical", price: 92.34, change: 1.23, changePercent: 1.35, volume: 1234567, marketCap: 17000000000, peRatio: 52.8, high52Week: 103.17, low52Week: 71.00, historicalData: generateHistoricalData(92.34) },

  // Insurance
  { symbol: "BRK.B", name: "Berkshire Hathaway Inc.", price: 378.92, change: 3.45, changePercent: 0.92, volume: 3234567, marketCap: 783000000000, peRatio: 8.4, high52Week: 401.20, low52Week: 311.71, historicalData: generateHistoricalData(378.92) },
  { symbol: "PGR", name: "The Progressive Corp.", price: 162.34, change: 1.89, changePercent: 1.18, volume: 2456789, marketCap: 95000000000, peRatio: 18.2, high52Week: 175.00, low52Week: 121.99, historicalData: generateHistoricalData(162.34) },
  { symbol: "TRV", name: "The Travelers Companies", price: 192.45, change: 2.12, changePercent: 1.11, volume: 1234567, marketCap: 45000000000, peRatio: 12.8, high52Week: 207.45, low52Week: 165.20, historicalData: generateHistoricalData(192.45) },
  { symbol: "ALL", name: "The Allstate Corporation", price: 152.34, change: 1.67, changePercent: 1.11, volume: 1567890, marketCap: 41000000000, peRatio: 10.4, high52Week: 171.10, low52Week: 105.57, historicalData: generateHistoricalData(152.34) },
  { symbol: "MET", name: "MetLife, Inc.", price: 68.92, change: 0.78, changePercent: 1.14, volume: 3234567, marketCap: 55000000000, peRatio: 10.8, high52Week: 76.00, low52Week: 55.46, historicalData: generateHistoricalData(68.92) },
  { symbol: "AFL", name: "Aflac Incorporated", price: 82.34, change: 0.89, changePercent: 1.09, volume: 2234567, marketCap: 50000000000, peRatio: 10.2, high52Week: 87.00, low52Week: 66.76, historicalData: generateHistoricalData(82.34) },

  // Aerospace
  { symbol: "TDG", name: "TransDigm Group Inc.", price: 978.45, change: 12.34, changePercent: 1.28, volume: 345678, marketCap: 55000000000, peRatio: 42.8, high52Week: 1032.00, low52Week: 763.29, historicalData: generateHistoricalData(978.45) },
  { symbol: "HWM", name: "Howmet Aerospace Inc.", price: 52.34, change: 0.78, changePercent: 1.51, volume: 2567890, marketCap: 22000000000, peRatio: 32.4, high52Week: 59.22, low52Week: 37.30, historicalData: generateHistoricalData(52.34) },
  { symbol: "TXT", name: "Textron Inc.", price: 82.45, change: 0.89, changePercent: 1.09, volume: 987654, marketCap: 17000000000, peRatio: 14.8, high52Week: 93.60, low52Week: 67.48, historicalData: generateHistoricalData(82.45) },

  // Chemicals
  { symbol: "DD", name: "DuPont de Nemours, Inc.", price: 72.34, change: 0.78, changePercent: 1.09, volume: 2876543, marketCap: 31000000000, peRatio: 28.4, high52Week: 81.65, low52Week: 63.80, historicalData: generateHistoricalData(72.34) },
  { symbol: "DOW", name: "Dow Inc.", price: 54.56, change: 0.56, changePercent: 1.04, volume: 4234567, marketCap: 38000000000, peRatio: 18.2, high52Week: 60.12, low52Week: 47.78, historicalData: generateHistoricalData(54.56) },
  { symbol: "LYB", name: "LyondellBasell Industries", price: 98.92, change: 1.12, changePercent: 1.14, volume: 1567890, marketCap: 32000000000, peRatio: 8.4, high52Week: 108.00, low52Week: 82.57, historicalData: generateHistoricalData(98.92) },
  { symbol: "ECL", name: "Ecolab Inc.", price: 192.34, change: 1.89, changePercent: 0.99, volume: 876543, marketCap: 55000000000, peRatio: 42.8, high52Week: 210.73, low52Week: 159.47, historicalData: generateHistoricalData(192.34) },
  { symbol: "PPG", name: "PPG Industries, Inc.", price: 142.45, change: 1.23, changePercent: 0.87, volume: 987654, marketCap: 33000000000, peRatio: 22.4, high52Week: 160.00, low52Week: 116.93, historicalData: generateHistoricalData(142.45) },

  // Hospitality & Travel
  { symbol: "MAR", name: "Marriott International", price: 218.92, change: 2.78, changePercent: 1.29, volume: 1567890, marketCap: 65000000000, peRatio: 22.8, high52Week: 239.93, low52Week: 166.20, historicalData: generateHistoricalData(218.92) },
  { symbol: "HLT", name: "Hilton Worldwide Holdings", price: 178.45, change: 2.12, changePercent: 1.20, volume: 1234567, marketCap: 47000000000, peRatio: 32.4, high52Week: 197.00, low52Week: 143.20, historicalData: generateHistoricalData(178.45) },
  { symbol: "H", name: "Hyatt Hotels Corporation", price: 118.92, change: 1.45, changePercent: 1.23, volume: 567890, marketCap: 12000000000, peRatio: 18.2, high52Week: 145.00, low52Week: 102.91, historicalData: generateHistoricalData(118.92) },
  { symbol: "ABNB", name: "Airbnb, Inc.", price: 142.34, change: 2.56, changePercent: 1.83, volume: 5234567, marketCap: 91000000000, peRatio: 28.4, high52Week: 170.10, low52Week: 110.20, historicalData: generateHistoricalData(142.34) },
  { symbol: "EXPE", name: "Expedia Group, Inc.", price: 128.92, change: 1.78, changePercent: 1.40, volume: 1876543, marketCap: 18000000000, peRatio: 14.8, high52Week: 157.00, low52Week: 86.63, historicalData: generateHistoricalData(128.92) },
  { symbol: "BKNG", name: "Booking Holdings Inc.", price: 3245.67, change: 42.34, changePercent: 1.32, volume: 234567, marketCap: 117000000000, peRatio: 22.4, high52Week: 3678.03, low52Week: 2432.92, historicalData: generateHistoricalData(3245.67) },

  // Packaging
  { symbol: "AMCR", name: "Amcor plc", price: 9.78, change: 0.08, changePercent: 0.82, volume: 5234567, marketCap: 14000000000, peRatio: 12.8, high52Week: 12.70, low52Week: 8.66, historicalData: generateHistoricalData(9.78) },
  { symbol: "BALL", name: "Ball Corporation", price: 58.45, change: 0.56, changePercent: 0.97, volume: 1567890, marketCap: 18000000000, peRatio: 28.4, high52Week: 66.99, low52Week: 42.00, historicalData: generateHistoricalData(58.45) },
  { symbol: "SEE", name: "Sealed Air Corporation", price: 38.92, change: 0.34, changePercent: 0.88, volume: 987654, marketCap: 6000000000, peRatio: 14.2, high52Week: 45.00, low52Week: 29.51, historicalData: generateHistoricalData(38.92) },

  // Mining
  { symbol: "RIO", name: "Rio Tinto Group", price: 72.34, change: 0.89, changePercent: 1.24, volume: 2876543, marketCap: 118000000000, peRatio: 8.4, high52Week: 84.50, low52Week: 56.63, historicalData: generateHistoricalData(72.34) },
  { symbol: "BHP", name: "BHP Group Limited", price: 62.45, change: 0.78, changePercent: 1.26, volume: 3234567, marketCap: 158000000000, peRatio: 12.8, high52Week: 73.50, low52Week: 51.42, historicalData: generateHistoricalData(62.45) },
  { symbol: "VALE", name: "Vale S.A.", price: 14.56, change: 0.23, changePercent: 1.60, volume: 18234567, marketCap: 65000000000, peRatio: 6.2, high52Week: 18.00, low52Week: 10.46, historicalData: generateHistoricalData(14.56) },

  // Defense
  { symbol: "HII", name: "Huntington Ingalls Ind.", price: 252.34, change: 2.89, changePercent: 1.16, volume: 345678, marketCap: 10000000000, peRatio: 14.8, high52Week: 282.13, low52Week: 198.60, historicalData: generateHistoricalData(252.34) },
  { symbol: "LHX", name: "L3Harris Technologies", price: 198.45, change: 2.12, changePercent: 1.08, volume: 876543, marketCap: 38000000000, peRatio: 28.4, high52Week: 228.15, low52Week: 169.58, historicalData: generateHistoricalData(198.45) },

  // Agricultural
  { symbol: "ADM", name: "Archer-Daniels-Midland", price: 78.45, change: 0.67, changePercent: 0.86, volume: 2567890, marketCap: 42000000000, peRatio: 10.8, high52Week: 98.88, low52Week: 66.93, historicalData: generateHistoricalData(78.45) },
  { symbol: "BG", name: "Bunge Limited", price: 102.34, change: 1.12, changePercent: 1.11, volume: 1234567, marketCap: 15000000000, peRatio: 7.2, high52Week: 122.50, low52Week: 85.21, historicalData: generateHistoricalData(102.34) },
  { symbol: "CTVA", name: "Corteva, Inc.", price: 52.34, change: 0.45, changePercent: 0.87, volume: 3234567, marketCap: 37000000000, peRatio: 22.8, high52Week: 65.57, low52Week: 45.23, historicalData: generateHistoricalData(52.34) },

  // Water & Waste
  { symbol: "WM", name: "Waste Management, Inc.", price: 178.45, change: 1.45, changePercent: 0.82, volume: 1567890, marketCap: 72000000000, peRatio: 28.4, high52Week: 192.14, low52Week: 152.58, historicalData: generateHistoricalData(178.45) },
  { symbol: "RSG", name: "Republic Services, Inc.", price: 162.34, change: 1.23, changePercent: 0.76, volume: 876543, marketCap: 51000000000, peRatio: 28.2, high52Week: 176.00, low52Week: 138.69, historicalData: generateHistoricalData(162.34) },
  { symbol: "AWK", name: "American Water Works", price: 138.92, change: 0.89, changePercent: 0.64, volume: 987654, marketCap: 27000000000, peRatio: 32.8, high52Week: 164.14, low52Week: 117.66, historicalData: generateHistoricalData(138.92) },

  // Media & Publishing
  { symbol: "PARA", name: "Paramount Global", price: 14.56, change: 0.23, changePercent: 1.60, volume: 12345678, marketCap: 10000000000, peRatio: -8.4, high52Week: 18.33, low52Week: 10.51, historicalData: generateHistoricalData(14.56) },
  { symbol: "WBD", name: "Warner Bros. Discovery", price: 11.23, change: 0.18, changePercent: 1.63, volume: 23456789, marketCap: 28000000000, peRatio: -4.2, high52Week: 16.80, low52Week: 7.40, historicalData: generateHistoricalData(11.23) },
  { symbol: "FOXA", name: "Fox Corporation", price: 32.45, change: 0.34, changePercent: 1.06, volume: 2876543, marketCap: 16000000000, peRatio: 14.8, high52Week: 36.47, low52Week: 26.78, historicalData: generateHistoricalData(32.45) },
  { symbol: "NWSA", name: "News Corporation", price: 24.56, change: 0.28, changePercent: 1.15, volume: 1567890, marketCap: 14000000000, peRatio: 32.4, high52Week: 28.99, low52Week: 19.32, historicalData: generateHistoricalData(24.56) },
  { symbol: "NYT", name: "The New York Times Co.", price: 48.92, change: 0.56, changePercent: 1.16, volume: 1234567, marketCap: 8000000000, peRatio: 38.2, high52Week: 54.81, low52Week: 36.24, historicalData: generateHistoricalData(48.92) },

  // E-commerce
  { symbol: "EBAY", name: "eBay Inc.", price: 42.34, change: 0.56, changePercent: 1.34, volume: 5678234, marketCap: 22000000000, peRatio: 8.4, high52Week: 51.35, low52Week: 37.56, historicalData: generateHistoricalData(42.34) },
  { symbol: "ETSY", name: "Etsy, Inc.", price: 72.34, change: 1.23, changePercent: 1.73, volume: 2876543, marketCap: 9000000000, peRatio: 18.2, high52Week: 95.52, low52Week: 55.00, historicalData: generateHistoricalData(72.34) },
  { symbol: "W", name: "Wayfair Inc.", price: 58.45, change: 1.34, changePercent: 2.35, volume: 3234567, marketCap: 7000000000, peRatio: -8.4, high52Week: 85.63, low52Week: 37.50, historicalData: generateHistoricalData(58.45) },
  { symbol: "CHWY", name: "Chewy, Inc.", price: 22.34, change: 0.45, changePercent: 2.05, volume: 5234567, marketCap: 10000000000, peRatio: -42.8, high52Week: 33.30, low52Week: 14.69, historicalData: generateHistoricalData(22.34) },

  // Consulting & Professional Services
  { symbol: "ACN", name: "Accenture plc", price: 318.92, change: 3.45, changePercent: 1.09, volume: 1876543, marketCap: 200000000000, peRatio: 28.4, high52Week: 369.00, low52Week: 268.33, historicalData: generateHistoricalData(318.92) },
  { symbol: "INFY", name: "Infosys Limited", price: 18.92, change: 0.23, changePercent: 1.23, volume: 8234567, marketCap: 79000000000, peRatio: 24.8, high52Week: 22.15, low52Week: 14.18, historicalData: generateHistoricalData(18.92) },
  { symbol: "WIT", name: "Wipro Limited", price: 5.34, change: 0.06, changePercent: 1.14, volume: 2567890, marketCap: 28000000000, peRatio: 18.2, high52Week: 6.15, low52Week: 4.06, historicalData: generateHistoricalData(5.34) }
]

function generateHistoricalData(currentPrice: number): { date: string; price: number }[] {
  const data: { date: string; price: number }[] = []
  const today = new Date()
  let price = currentPrice * 0.85 // Start 15% lower

  for (let i = 30; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    // Random walk with slight upward bias
    const change = (Math.random() - 0.45) * (currentPrice * 0.03)
    price = Math.max(price + change, currentPrice * 0.7)
    
    data.push({
      date: date.toISOString().split("T")[0],
      price: Math.round(price * 100) / 100
    })
  }

  // Ensure last price matches current
  data[data.length - 1].price = currentPrice

  return data
}

export function searchStocks(query: string): Stock[] {
  const lowerQuery = query.toLowerCase()
  return mockStocks.filter(
    stock =>
      stock.symbol.toLowerCase().includes(lowerQuery) ||
      stock.name.toLowerCase().includes(lowerQuery)
  )
}

export function getStockBySymbol(symbol: string): Stock | undefined {
  return mockStocks.find(stock => stock.symbol === symbol)
}

export function formatMarketCap(value: number): string {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
  return `$${value.toLocaleString()}`
}

export function formatVolume(value: number): string {
  if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`
  if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`
  if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`
  return value.toLocaleString()
}
