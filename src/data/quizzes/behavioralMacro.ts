import type { LessonQuiz } from "../lessonQuizzes"

// Authored quiz pools: behavioral biases, bubbles & crashes, macro, and economic indicators.
export const behavioralMacroQuizzes: LessonQuiz[] = [
  // BEHAVIOR-1: Loss Aversion
  {
    lessonId: "behavior-1",
    questions: [
      {
        id: "behavior-1-q1",
        question: "According to loss aversion research, how do losses compare to gains emotionally?",
        options: [
          "Losses hurt about twice as much as equal gains",
          "Gains feel roughly twice as pleasant as equal losses do",
          "Losses and gains produce exactly the same emotional reaction",
          "Losses only hurt when they exceed ten percent overall"
        ],
        correctAnswer: 0,
        explanation: "Research by Kahneman and Tversky found losses feel roughly twice as intense as equivalent gains. Losing $50 stings far more than winning $50 feels good."
      },
      {
        id: "behavior-1-q2",
        question: "Which behavior is a classic sign of loss aversion in investors?",
        options: [
          "Buying even more shares every time a stock price rises",
          "Checking stock prices only once every single year",
          "Holding a losing stock to avoid admitting the loss",
          "Ignoring their portfolio completely during long market rallies"
        ],
        correctAnswer: 2,
        explanation: "Loss-averse investors often refuse to sell losers because selling makes the loss feel 'real.' Holding on lets them avoid the pain of admitting a mistake — even when selling is smarter."
      },
      {
        id: "behavior-1-q3",
        question: "Maya's stock dropped from $50 to $40. She refuses to sell because selling would 'make the loss real.' What bias is this?",
        options: [
          "Confirmation bias about her original stock research",
          "Loss aversion driving her to avoid the pain",
          "Herd behavior copying what other investors are doing",
          "Anchoring to analyst price targets she read online recently"
        ],
        correctAnswer: 1,
        explanation: "Maya is avoiding the emotional pain of locking in a loss — the hallmark of loss aversion. The loss already happened on paper; refusing to sell doesn't undo it."
      },
      {
        id: "behavior-1-q4",
        question: "Jaden feels devastated after losing $20 on one stock but only mildly happy after winning $20 on another. Why?",
        options: [
          "His winning trade was actually much smaller in dollars",
          "Winning trades always take longer to feel emotionally real",
          "He secretly wanted the losing stock to keep falling",
          "Losses register far more strongly than equal gains"
        ],
        correctAnswer: 3,
        explanation: "This is loss aversion in action: our brains weigh losses roughly twice as heavily as equivalent gains, so a $20 loss feels much bigger than a $20 win."
      },
      {
        id: "behavior-1-q5",
        question: "How can loss aversion hurt a long-term investor during a market dip?",
        options: [
          "It makes them buy too many risky stocks quickly",
          "It causes them to ignore all financial news completely",
          "It pushes them to panic-sell near the bottom",
          "It forces them to pay much higher trading fees"
        ],
        correctAnswer: 2,
        explanation: "The pain of watching losses grow can push investors to sell right when prices are lowest, locking in losses and missing the recovery that follows most dips."
      },
      {
        id: "behavior-1-q6",
        question: "Why did loss aversion likely help our ancestors survive?",
        options: [
          "Avoiding deadly threats mattered more than finding extra rewards",
          "Chasing every possible reward always guaranteed survival during harsh winters",
          "Early humans traded goods and needed protective instincts",
          "Feeling no emotions helped hunters stay calm under pressure"
        ],
        correctAnswer: 0,
        explanation: "For early humans, missing a meal was survivable but ignoring a predator was fatal. Overweighting losses kept our ancestors alive — but the same wiring misfires in modern markets."
      },
      {
        id: "behavior-1-q7",
        question: "Which strategy best counters loss aversion when investing?",
        options: [
          "Checking your portfolio balance many times every single day",
          "Only buying stocks that have never dropped in price",
          "Selling everything at the first sign of any loss",
          "Setting rules in advance for when to sell"
        ],
        correctAnswer: 3,
        explanation: "Deciding your sell criteria before emotions kick in removes the in-the-moment pain from the decision. Rules made calmly beat choices made in panic."
      },
      {
        id: "behavior-1-q8",
        question: "Why can loss aversion cause investors to take MORE risk after losing money?",
        options: [
          "Losses make investors permanently more cautious about every trade",
          "They gamble on risky bets to break even",
          "Brokerages require bigger trades after an account loses value",
          "Losing money automatically unlocks riskier investments in most apps"
        ],
        correctAnswer: 1,
        explanation: "Because losses hurt so much, people desperate to erase them often take reckless gambles to 'get back to even' — the same trap that keeps casino gamblers at the table."
      }
    ]
  },

  // BEHAVIOR-2: Anchoring
  {
    lessonId: "behavior-2",
    questions: [
      {
        id: "behavior-2-q1",
        question: "What is anchoring bias?",
        options: [
          "Refusing to sell any stock during market downturns",
          "Relying too heavily on the first number seen",
          "Copying trades made by popular social media investors",
          "Believing every prediction from your favorite financial news channel"
        ],
        correctAnswer: 1,
        explanation: "Anchoring means the first piece of information you encounter — often a number — becomes a mental reference point that biases every judgment afterward."
      },
      {
        id: "behavior-2-q2",
        question: "Which of these is a common anchor in investing?",
        options: [
          "The dividend amount a company pays its newest shareholders",
          "The total number of shares an investor owns",
          "The commission a brokerage charges on every trade",
          "The price you originally paid for a stock"
        ],
        correctAnswer: 3,
        explanation: "Your purchase price is a powerful anchor — investors judge every future price against it, even though the market doesn't know or care what you paid."
      },
      {
        id: "behavior-2-q3",
        question: "A hoodie is 'marked down' from $120 to $60. Why does it suddenly feel like a bargain?",
        options: [
          "The $120 anchor makes $60 seem cheap",
          "Stores must legally prove markdowns reflect true value",
          "Hoodies always cost exactly $60 at fair prices",
          "Discounts remove sales tax from the final price"
        ],
        correctAnswer: 0,
        explanation: "The original $120 price acts as an anchor, so $60 feels like a steal by comparison — even if the hoodie was never worth $120. Retailers use this trick constantly."
      },
      {
        id: "behavior-2-q4",
        question: "Liam bought a stock at $80; it now trades at $45. He insists it's still 'worth $80.' What's happening?",
        options: [
          "He has insider knowledge about the company's true value",
          "The market has mispriced the stock temporarily for everyone",
          "He is anchored to his original purchase price",
          "His brokerage app is displaying an outdated quote price"
        ],
        correctAnswer: 2,
        explanation: "Liam's $80 purchase price is anchoring his sense of the stock's value. What he paid has no bearing on what the company is actually worth today."
      },
      {
        id: "behavior-2-q5",
        question: "How might anchoring affect someone who reads an analyst's $200 price target?",
        options: [
          "They will ignore the target and study fundamentals instead",
          "They will always short the stock to bet against it",
          "The target legally forces the stock toward that price",
          "They may judge all future prices against $200"
        ],
        correctAnswer: 3,
        explanation: "Once $200 is planted in their mind, any price below it can feel like a 'deal' — even if the target was just one analyst's guess."
      },
      {
        id: "behavior-2-q6",
        question: "What's the best defense against anchoring when valuing a stock?",
        options: [
          "Always trusting the first price target you ever read",
          "Evaluating the company's fundamentals from a fresh start",
          "Memorizing your purchase price for every single holding",
          "Asking friends what they originally paid for shares"
        ],
        correctAnswer: 1,
        explanation: "Asking 'what is this business worth today, based on its earnings and prospects?' — as if seeing it for the first time — strips old numbers of their anchoring power."
      },
      {
        id: "behavior-2-q7",
        question: "Why is a stock's 52-week high a dangerous anchor?",
        options: [
          "Exchanges delete stocks that fall below yearly highs",
          "Stocks are legally required to revisit previous highs eventually",
          "Past prices don't determine a company's current worth",
          "The high only matters for stocks paying dividends"
        ],
        correctAnswer: 2,
        explanation: "A stock that fell from $100 to $40 isn't automatically a bargain — the business may genuinely be worth less now. The old high is history, not a promise."
      },
      {
        id: "behavior-2-q8",
        question: "Why do negotiators often try to name the first number in a deal?",
        options: [
          "The first number anchors the whole negotiation range",
          "Speaking first is required by standard business contract law",
          "The first number is legally binding on both sides",
          "Going first shows weakness that opponents always reward"
        ],
        correctAnswer: 0,
        explanation: "The opening number becomes the reference point both sides adjust from, pulling the final agreement toward it. That's anchoring working in the anchor-setter's favor."
      }
    ]
  },

  // BEHAVIOR-3: Confirmation Bias
  {
    lessonId: "behavior-3",
    questions: [
      {
        id: "behavior-3-q1",
        question: "What is confirmation bias?",
        options: [
          "Waiting for official confirmations before placing any stock trade",
          "Confirming your password before logging into brokerage accounts",
          "Seeking information that supports what you already believe",
          "Double-checking every fact before sharing it online"
        ],
        correctAnswer: 2,
        explanation: "Confirmation bias is our tendency to notice, seek out, and remember evidence that agrees with our existing views while dismissing evidence that contradicts them."
      },
      {
        id: "behavior-3-q2",
        question: "Which action shows confirmation bias?",
        options: [
          "Only reading articles that praise a stock you own",
          "Reading both bullish and bearish takes on a company",
          "Selling a stock after carefully reviewing negative evidence",
          "Asking a skeptical friend to poke holes in your thesis"
        ],
        correctAnswer: 0,
        explanation: "Filtering your reading to only positive coverage of stocks you own is textbook confirmation bias — you're collecting cheerleading, not information."
      },
      {
        id: "behavior-3-q3",
        question: "Zoe loves a sneaker brand's stock. She follows five superfans of the brand and blocks all critics. What's the risk?",
        options: [
          "She will pay higher taxes on her gains",
          "Her brokerage account will be flagged for unusual activity",
          "The brand will sue her for blocking customers",
          "She'll miss warning signs the fans won't mention"
        ],
        correctAnswer: 3,
        explanation: "By curating a feed of pure positivity, Zoe has built an echo chamber. If the company starts struggling, the people she follows will be the last to say so."
      },
      {
        id: "behavior-3-q4",
        question: "Before buying a stock, Dev googles 'why StockX will soar.' What should he search instead?",
        options: [
          "Only the company's own press releases and paid ads",
          "Arguments both for and against buying the stock",
          "More posts agreeing that StockX will definitely soar",
          "Celebrity endorsements that mention the StockX brand name"
        ],
        correctAnswer: 1,
        explanation: "Dev's search is designed to confirm what he already wants to believe. Searching for the bear case too gives him a balanced picture before risking money."
      },
      {
        id: "behavior-3-q5",
        question: "How does confirmation bias affect how investors interpret mixed news?",
        options: [
          "They spin ambiguous news to fit their existing view",
          "They always treat good and bad news with equal weight",
          "They forward mixed news to regulators for official clarification",
          "They automatically sell whenever any headline seems slightly unclear"
        ],
        correctAnswer: 0,
        explanation: "The same ambiguous earnings report reads as 'great news' to a bull and 'clear trouble' to a bear. Confirmation bias makes us interpret gray areas in our favor."
      },
      {
        id: "behavior-3-q6",
        question: "Which habit best fights confirmation bias?",
        options: [
          "Joining fan communities for every stock you own",
          "Muting anyone online who disagrees with your picks",
          "Re-reading your own past bullish notes for reassurance",
          "Actively seeking the strongest case against your idea"
        ],
        correctAnswer: 3,
        explanation: "Deliberately hunting for the best opposing argument — sometimes called 'steelmanning' — forces you to test your idea instead of just decorating it with agreement."
      },
      {
        id: "behavior-3-q7",
        question: "Why do social media feeds make confirmation bias worse?",
        options: [
          "Social platforms charge extra money to display any opposing viewpoints",
          "Algorithms show more of what you already engage with",
          "Posting online is illegal for licensed financial advisors",
          "Feeds update too slowly to include negative stories"
        ],
        correctAnswer: 1,
        explanation: "Recommendation algorithms learn what you like and serve you more of it, automatically building an echo chamber that keeps reinforcing your existing beliefs."
      },
      {
        id: "behavior-3-q8",
        question: "Why is confirmation bias especially dangerous AFTER you buy a stock?",
        options: [
          "Brokerage apps deliberately hide negative news from their current shareholders",
          "Stocks fall faster once a purchase order settles",
          "Owning it gives you a stake in being right",
          "New buyers stop receiving analyst reports after purchase"
        ],
        correctAnswer: 2,
        explanation: "Once your money and ego are invested, admitting the stock was a mistake hurts — so your brain works overtime to dismiss warning signs you'd otherwise notice."
      }
    ]
  },

  // BEHAVIOR-4: Overconfidence
  {
    lessonId: "behavior-4",
    questions: [
      {
        id: "behavior-4-q1",
        question: "What is overconfidence bias in investing?",
        options: [
          "Overestimating your own knowledge and prediction ability",
          "Being confident that markets will always recover eventually",
          "Feeling nervous about every single trade you make",
          "Trusting professional fund managers more than your instincts"
        ],
        correctAnswer: 0,
        explanation: "Overconfidence means believing your knowledge, skill, or forecasts are better than they really are — which leads investors to take risks they don't fully understand."
      },
      {
        id: "behavior-4-q2",
        question: "Which trading behavior is most linked to overconfidence?",
        options: [
          "Holding one diversified index fund quietly for many decades",
          "Rebalancing a portfolio once every single calendar year",
          "Trading frequently because you feel certain you'll win",
          "Setting up automatic deposits into a savings account"
        ],
        correctAnswer: 2,
        explanation: "Studies show overconfident investors trade far more often — and the extra fees and mistimed bets cause them to underperform investors who trade less."
      },
      {
        id: "behavior-4-q3",
        question: "After three winning trades, Ty doubles his position sizes because he 'has a gift.' What's the danger?",
        options: [
          "Winning streaks legally require investors to reduce positions",
          "He may be mistaking luck for genuine skill",
          "His broker will freeze accounts that grow too quickly",
          "Three wins always guarantee that a loss comes next"
        ],
        correctAnswer: 1,
        explanation: "Three trades is far too small a sample to prove skill — in a rising market almost anyone can win three times. Betting bigger on luck is how accounts blow up."
      },
      {
        id: "behavior-4-q4",
        question: "Ana skips researching a stock because she 'always picks winners.' Which bias is at work?",
        options: [
          "Loss aversion making her afraid of missing gains",
          "Anchoring to the stock's most recent closing price",
          "Herd behavior following her classmates' favorite stock picks",
          "Overconfidence in her own stock-picking ability"
        ],
        correctAnswer: 3,
        explanation: "Ana's belief in her flawless track record is leading her to skip the homework that protects investors. That inflated self-assessment is overconfidence."
      },
      {
        id: "behavior-4-q5",
        question: "How does overconfidence typically hurt investment returns?",
        options: [
          "It causes nervous investors to hold too much cash",
          "It makes investors diversify across too many funds",
          "Excess trading racks up costs and mistimed bets",
          "It leads investors to copy index funds too closely"
        ],
        correctAnswer: 2,
        explanation: "Overconfident investors trade too often and concentrate too heavily, paying more in costs and taxes while making more timing mistakes than patient investors."
      },
      {
        id: "behavior-4-q6",
        question: "Which practice best keeps overconfidence in check?",
        options: [
          "Keeping a journal of predictions and actual results",
          "Celebrating your wins publicly and forgetting losses quickly afterward",
          "Trading larger amounts to prove your skill faster",
          "Following only your own analysis and nobody else's"
        ],
        correctAnswer: 0,
        explanation: "Writing down predictions before outcomes are known creates an honest scorecard. Most people who track their forecasts discover they're right far less often than they remembered."
      },
      {
        id: "behavior-4-q7",
        question: "Why do most people rate themselves 'above average' at driving and investing?",
        options: [
          "Most people genuinely are above the true average",
          "Statistical averages are meaningless when measuring any human skill",
          "Testing agencies inflate scores for drivers and investors",
          "We judge ourselves by intentions, not measured results"
        ],
        correctAnswer: 3,
        explanation: "It's mathematically impossible for most people to be above average, yet surveys consistently show they believe it — we grade ourselves on effort and intent rather than outcomes."
      },
      {
        id: "behavior-4-q8",
        question: "Why can a long bull market fuel overconfidence?",
        options: [
          "Bull markets only reward investors with real skill",
          "Rising prices make almost every pick look smart",
          "Brokerages raise everyone's account limits during long market rallies",
          "Bull markets erase all trading fees and taxes"
        ],
        correctAnswer: 1,
        explanation: "When nearly everything goes up, even random picks win — and investors credit their genius instead of the rising tide. The mistake gets exposed when the market turns."
      }
    ]
  },

  // BEHAVIOR-5: Herd Behavior
  {
    lessonId: "behavior-5",
    questions: [
      {
        id: "behavior-5-q1",
        question: "What is herd behavior in markets?",
        options: [
          "Spreading money across many different animal agriculture stocks",
          "Copying the crowd instead of thinking independently",
          "Holding stocks for decades regardless of any news",
          "Buying only large well-known companies with famous brands"
        ],
        correctAnswer: 1,
        explanation: "Herd behavior means making investment decisions because 'everyone else is doing it' rather than from your own analysis — following the crowd off a cliff, sometimes."
      },
      {
        id: "behavior-5-q2",
        question: "Which situation shows herd behavior?",
        options: [
          "Buying an index fund after reading its prospectus",
          "Selling a stock because its earnings badly missed estimates",
          "Researching a company for weeks before investing money",
          "Buying a stock only because everyone else is"
        ],
        correctAnswer: 3,
        explanation: "When popularity itself is the entire reason for buying, that's herding. The other choices involve actual reasons — research, fundamentals, or documented facts."
      },
      {
        id: "behavior-5-q3",
        question: "A meme stock is trending and Kai's whole group chat is buying. Kai buys too, without any research. What drove his decision?",
        options: [
          "Herd behavior and social pressure from his peers",
          "His careful analysis of the company's revenue and profits",
          "A financial advisor's personalized recommendation for his goals",
          "The company's strong dividend history over many years"
        ],
        correctAnswer: 0,
        explanation: "Kai bought because his friends did — pure herd behavior. Social proof feels safe, but the crowd knows nothing about whether the price makes sense."
      },
      {
        id: "behavior-5-q4",
        question: "During a sell-off, Nina dumps her index fund purely because 'everyone is selling.' What's the likely outcome?",
        options: [
          "She perfectly avoids further losses and buys back much cheaper",
          "Her fund manager refunds her original purchase price",
          "She locks in losses and may miss the rebound",
          "The exchange pauses her trades until prices recover"
        ],
        correctAnswer: 2,
        explanation: "Selling with the panicking herd usually means selling near the lows. Historically, investors who held through sell-offs recovered; those who sold locked in the damage."
      },
      {
        id: "behavior-5-q5",
        question: "How does herd behavior relate to market bubbles?",
        options: [
          "Bubbles form only when investors ignore each other",
          "Bubbles only happen when regulators encourage everyone to buy",
          "Bubbles are caused entirely by professional traders' computer algorithms",
          "Crowds piling in push prices past real value"
        ],
        correctAnswer: 3,
        explanation: "Bubbles inflate when waves of buyers join simply because prices are rising and everyone else is in — herding pushes prices far beyond what fundamentals justify."
      },
      {
        id: "behavior-5-q6",
        question: "What's a smart response when 'everyone' is buying a hot stock?",
        options: [
          "Buy immediately before the crowd pushes prices higher",
          "Do your own research before making any move",
          "Borrow extra money so you can buy even more",
          "Short the stock since crowds are always wrong"
        ],
        correctAnswer: 1,
        explanation: "Popularity is not analysis. The crowd is sometimes right and sometimes wrong — the only way to know is to evaluate the investment yourself before acting."
      },
      {
        id: "behavior-5-q7",
        question: "Why did following the herd help our ancestors but hurt investors today?",
        options: [
          "Ancient herds moved very slowly while modern markets never change",
          "Ancestors had better information about danger than investors do",
          "Safety came from groups; profits come from independent thinking",
          "Investors today face no real dangers worth fleeing from"
        ],
        correctAnswer: 2,
        explanation: "Running with the group protected early humans from predators. In markets, though, buying what's already popular usually means paying peak prices — the crowd's comfort costs you returns."
      },
      {
        id: "behavior-5-q8",
        question: "Why is herd behavior strongest during market extremes?",
        options: [
          "Fear and euphoria make people crave group validation",
          "Trading apps disable research tools during volatile market periods",
          "Regulators require coordinated buying during extreme price swings",
          "Market extremes only occur when every investor already agrees"
        ],
        correctAnswer: 0,
        explanation: "At peaks and panics, emotions run highest and uncertainty feels unbearable — so people look to the crowd for reassurance exactly when the crowd is most likely wrong."
      }
    ]
  },

  // BEHAVIOR-6: FOMO
  {
    lessonId: "behavior-6",
    questions: [
      {
        id: "behavior-6-q1",
        question: "What does FOMO stand for in investing?",
        options: [
          "Fear of major market outages",
          "Focus on major market opportunities",
          "Fear of missing out",
          "Fear of moving on quickly"
        ],
        correctAnswer: 2,
        explanation: "FOMO — the fear of missing out — is the anxious feeling that others are getting rich without you, which pressures you into rushed, poorly researched investments."
      },
      {
        id: "behavior-6-q2",
        question: "How does FOMO typically influence buying decisions?",
        options: [
          "It pushes people to buy quickly without research",
          "It makes investors demand lots of extra research before buying",
          "It encourages waiting patiently for prices to fall",
          "It causes people to prefer safe government bonds"
        ],
        correctAnswer: 0,
        explanation: "FOMO creates urgency — the feeling that waiting even a day means missing the gains. That urgency short-circuits the research a smart purchase requires."
      },
      {
        id: "behavior-6-q3",
        question: "A crypto coin jumped 300% this week. Leo feels sick watching friends profit and wants in NOW. What should he recognize?",
        options: [
          "The coin will certainly keep rising for months",
          "His friends clearly have insider information he should follow",
          "A 300% jump guarantees another 300% jump soon",
          "FOMO is driving him, not any real analysis"
        ],
        correctAnswer: 3,
        explanation: "Leo's urge comes from envy and urgency, not from understanding the asset. Recognizing 'this is FOMO talking' is the first step to pausing before a reckless buy."
      },
      {
        id: "behavior-6-q4",
        question: "Priya buys at a stock's all-time high because 'it keeps going up.' It then drops 40%. What made her vulnerable?",
        options: [
          "Diversifying her money across too many different types of investments",
          "Buying out of FOMO instead of studying value",
          "Holding too much cash in her brokerage account",
          "Following a licensed advisor's long-term financial plan"
        ],
        correctAnswer: 1,
        explanation: "Priya chased past performance out of fear of missing more gains, without asking whether the price still made sense. Chasing hype often means buying near the top."
      },
      {
        id: "behavior-6-q5",
        question: "Which tactic best defuses FOMO?",
        options: [
          "Sticking to a written plan with clear criteria",
          "Watching live price charts constantly to catch every move",
          "Following more influencers to find hot picks faster",
          "Keeping cash ready to chase whatever trends next"
        ],
        correctAnswer: 0,
        explanation: "A written plan with rules for what you buy and why turns 'should I chase this?' into a simple check: does it fit my criteria? Usually hype doesn't."
      },
      {
        id: "behavior-6-q6",
        question: "Why do 'limited time' investment pitches work so well?",
        options: [
          "Short windows legally increase an investment's actual returns",
          "Regulators approve time-limited offers faster than normal ones",
          "Deadlines give investors extra time to think carefully",
          "Urgency triggers FOMO and short-circuits careful thinking"
        ],
        correctAnswer: 3,
        explanation: "Artificial deadlines manufacture fear of missing out, pushing people to act before thinking. Legitimate investments rarely vanish overnight — urgency is a classic scam ingredient."
      },
      {
        id: "behavior-6-q7",
        question: "Why does social media amplify investing FOMO?",
        options: [
          "Posting losses is banned on most social media platforms",
          "People post wins, not losses, warping your view",
          "Platforms verify every gain screenshot before it gets posted",
          "Social apps automatically execute trades their users mention"
        ],
        correctAnswer: 1,
        explanation: "Feeds overflow with screenshots of gains because nobody brags about losses. This survivorship bias makes everyone else look rich and makes you feel left behind."
      },
      {
        id: "behavior-6-q8",
        question: "What usually happens to investors who consistently buy into hype at peaks?",
        options: [
          "They reliably earn the market average over long periods",
          "They pay lower taxes because of frequent trading",
          "They buy high, sell low, and underperform badly",
          "They get priority access to future stock offerings"
        ],
        correctAnswer: 2,
        explanation: "Chasing hype means buying after big run-ups and panic-selling after drops — the exact opposite of buy low, sell high. Studies show performance-chasers lag the market badly."
      }
    ]
  },

  // BEHAVIOR-7: Emotional Trading
  {
    lessonId: "behavior-7",
    questions: [
      {
        id: "behavior-7-q1",
        question: "What is emotional trading?",
        options: [
          "Making trades based on feelings instead of analysis",
          "Trading only the companies whose products you personally love",
          "Using meditation apps to select promising stock tickers",
          "Investing exclusively in entertainment and gaming company stocks"
        ],
        correctAnswer: 0,
        explanation: "Emotional trading means letting fear, greed, excitement, or regret drive buy and sell decisions instead of a rational plan based on evidence."
      },
      {
        id: "behavior-7-q2",
        question: "Which two emotions most often drive bad trades?",
        options: [
          "Boredom and mild curiosity about new market sectors",
          "Patience and steady discipline during long market cycles",
          "Fear during crashes and greed during rallies",
          "Gratitude and generosity toward all other market participants"
        ],
        correctAnswer: 2,
        explanation: "Fear makes people sell low during crashes; greed makes them buy high during rallies. Together they produce the classic wealth-destroying pattern of emotional investors."
      },
      {
        id: "behavior-7-q3",
        question: "Marcus checks his portfolio 30 times a day and trades whenever he feels anxious. What's the likely result?",
        options: [
          "Superior returns from staying constantly informed and instantly reactive",
          "Worse returns from fees and poorly timed trades",
          "Automatic bonuses from his brokerage for active trading",
          "Lower taxes because short-term trades are tax-free"
        ],
        correctAnswer: 1,
        explanation: "Constant monitoring feeds anxiety, and anxiety-driven trades tend to be poorly timed. Frequent traders consistently underperform patient investors after costs and taxes."
      },
      {
        id: "behavior-7-q4",
        question: "After a stock she sold rises 20%, Jade angrily buys it back at the higher price. What is this?",
        options: [
          "A disciplined re-entry strategy based on updated fundamentals",
          "A required buyback under standard brokerage account rules",
          "Dollar-cost averaging spread across two separate purchases",
          "Revenge trading driven by regret and frustration"
        ],
        correctAnswer: 3,
        explanation: "Jade is trading to soothe regret, not because the stock became a better value. Revenge trading swaps analysis for emotion — usually at the worst possible price."
      },
      {
        id: "behavior-7-q5",
        question: "How does having a written investment plan reduce emotional trading?",
        options: [
          "It legally prevents you from ever selling during crashes",
          "It guarantees your portfolio will beat the market",
          "It supplies preset rules for moments of panic",
          "It hides your losses so they hurt less"
        ],
        correctAnswer: 2,
        explanation: "When markets get scary, a plan written in a calm moment tells you exactly what to do — so your past rational self overrules your present panicked self."
      },
      {
        id: "behavior-7-q6",
        question: "Which habit helps separate emotions from investing decisions?",
        options: [
          "Waiting 24 hours before acting on any impulse",
          "Trading immediately whenever any strong feeling signals an opportunity",
          "Deleting all research tools to simplify every decision",
          "Following your gut because instincts usually beat analysis"
        ],
        correctAnswer: 0,
        explanation: "A 24-hour cooling-off period lets the emotional surge fade. If the trade still makes sense tomorrow with a clear head, it was probably reasonable to begin with."
      },
      {
        id: "behavior-7-q7",
        question: "Why do fear and greed cause investors to buy high and sell low?",
        options: [
          "Fear peaks at market tops and greed at bottoms",
          "Emotions perfectly track what stocks are truly worth",
          "High prices always signal safety to professional traders",
          "Greed peaks near tops and fear near bottoms"
        ],
        correctAnswer: 3,
        explanation: "Excitement is strongest after prices have already soared, and terror is strongest after they've already crashed — so emotions push people to buy at peaks and sell at lows."
      },
      {
        id: "behavior-7-q8",
        question: "Why is automating investments, like monthly auto-deposits, emotionally powerful?",
        options: [
          "Automation always buys at the lowest price each month",
          "It removes in-the-moment feelings from each decision",
          "Banks pay higher interest on all automated deposit accounts",
          "Automatic investing is completely exempt from market losses"
        ],
        correctAnswer: 1,
        explanation: "When investing happens automatically, fear and greed never get a vote. The money goes in on schedule whether markets feel scary or euphoric."
      }
    ]
  },

  // BEHAVIOR-8: Avoiding Traps
  {
    lessonId: "behavior-8",
    questions: [
      {
        id: "behavior-8-q1",
        question: "What is the first step to overcoming a behavioral bias?",
        options: [
          "Eliminating all human emotions permanently from your daily life",
          "Becoming aware that the bias exists in you",
          "Hiring a professional to make every decision instead",
          "Avoiding the stock market entirely for your lifetime"
        ],
        correctAnswer: 1,
        explanation: "You can't correct a bias you don't know you have. Awareness turns invisible mental shortcuts into things you can watch for and work around."
      },
      {
        id: "behavior-8-q2",
        question: "What is a written investment plan or 'policy statement' for?",
        options: [
          "Registering your personal investment strategy with federal securities regulators",
          "Proving to brokerages that you understand market risks",
          "Advertising your strategy to attract other investors' money",
          "Setting rules in advance so emotions don't decide"
        ],
        correctAnswer: 3,
        explanation: "A written plan records your goals and rules while you're calm, so during panics or manias you follow the plan instead of your feelings."
      },
      {
        id: "behavior-8-q3",
        question: "Sam sets an automatic monthly $50 investment into an index fund. Which bias does this best neutralize?",
        options: [
          "Emotional timing decisions driven by fear and greed",
          "Anchoring to the ticker symbol of the fund",
          "Confirmation bias from reading the fund's yearly annual report",
          "Overconfidence about picking the perfect fund manager"
        ],
        correctAnswer: 0,
        explanation: "Automatic investing removes the 'when should I buy?' decision entirely, so fear can't stop his deposits in downturns and greed can't rush extra money in at peaks."
      },
      {
        id: "behavior-8-q4",
        question: "Before buying, Ava writes down exactly why she's buying and what would make her sell. When the stock later dips, she rereads it. What trap is she avoiding?",
        options: [
          "Paying extra commissions on trades she never intended",
          "Missing the dividend payment dates for her shares",
          "Panic-selling based on emotion instead of reasons",
          "Triggering capital gains taxes on her original purchase"
        ],
        correctAnswer: 2,
        explanation: "Her written thesis lets her check whether anything fundamental actually changed. If her original reasons still hold, the dip is noise — not a reason to panic-sell."
      },
      {
        id: "behavior-8-q5",
        question: "How does diversification protect against behavioral mistakes?",
        options: [
          "It guarantees positive returns in every market year",
          "It lets you trade more often without extra fees",
          "It removes the need to ever review your portfolio",
          "One bad emotional pick can't sink everything"
        ],
        correctAnswer: 3,
        explanation: "Everyone makes biased picks sometimes. Spreading money across many holdings limits the damage any single overconfident or FOMO-driven mistake can do."
      },
      {
        id: "behavior-8-q6",
        question: "A 'cooling-off rule' before placing trades helps because...",
        options: [
          "brokerages reward their patient investors with lower margin rates",
          "impulses fade, letting logic catch up before acting",
          "prices always drop if you wait a full day",
          "regulators require waiting periods for all retail trades"
        ],
        correctAnswer: 1,
        explanation: "Emotional urges are strongest in the moment and fade with time. A mandatory pause gives your rational side a chance to veto impulsive trades."
      },
      {
        id: "behavior-8-q7",
        question: "Why is simply knowing about biases not enough to beat them?",
        options: [
          "Biases only affect people who never studied them",
          "Learning about biases actually makes them grow much stronger",
          "Biases operate automatically, so you need systems too",
          "Only professional investors are capable of overcoming biases"
        ],
        correctAnswer: 2,
        explanation: "Biases fire fast and unconsciously — even experts who study them still fall for them. Systems like rules, automation, and checklists catch what awareness alone misses."
      },
      {
        id: "behavior-8-q8",
        question: "Why do checklists help investors the way they help pilots?",
        options: [
          "They force consistent steps even under stress",
          "They transfer legal responsibility to whoever wrote them",
          "They make every flight and trade perfectly safe",
          "They replace the need for any training or knowledge"
        ],
        correctAnswer: 0,
        explanation: "Under pressure, both pilots and investors skip steps and rely on gut feel. A checklist guarantees the critical checks happen every time, no matter the emotion."
      }
    ]
  },
  // __CHUNK_MARKER__
]
