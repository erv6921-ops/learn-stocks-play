// Teaching-aligned top-up questions that extend each lesson pool to ~10.
// Scope: marketing (mkt-1..8). Every question must be answerable from the lesson content.
import { QuizQuestion } from "@/types"

export const topUpMarketingQuizzes: { lessonId: string; questions: QuizQuestion[] }[] = [
  {
    lessonId: "mkt-1",
    questions: [
      {
        id: "mkt1-q6",
        question: "According to the lesson, in what order do the pieces of marketing happen?",
        options: [
          "Promote first, then design the product, then figure out who needs it",
          "Understand needs, design a product, price it, make it available, then promote it",
          "Set the price first, then advertise, then build the product to match demand",
          "Advertise widely, collect the profits, then improve the product later"
        ],
        correctAnswer: 1,
        explanation: "The lesson states marketing begins with understanding needs, then designing a product, pricing it, making it available, and finally promoting it."
      },
      {
        id: "mkt1-q7",
        question: "The lesson uses Apple as an example. What does it say about Apple's marketing?",
        options: [
          "Apple relies almost entirely on television commercials to sell its products",
          "Apple's marketing is baked into every detail of the customer experience, not just its ads",
          "Apple avoids marketing because its products are good enough to sell themselves",
          "Apple copies the store designs and packaging of its biggest competitors"
        ],
        correctAnswer: 1,
        explanation: "The lesson explains Apple designs museum-like stores and gift-like packaging, baking marketing into every detail of the experience rather than just commercials."
      },
      {
        id: "mkt1-q8",
        question: "In the lemonade scenario, what did Mia's banner say that Jake's sign did not?",
        options: [
          "Just the price of the lemonade written by hand",
          "Her brand name and a tagline: Made While You Watch",
          "A promise of a full refund if customers were unsatisfied",
          "The list of ingredients used in the lemonade recipe"
        ],
        correctAnswer: 1,
        explanation: "The scenario describes Mia's colorful banner reading Mia's Fresh-Squeezed Lemonade - Made While You Watch, including her brand name and a tagline, while Jake had only a handwritten price sign."
      },
      {
        id: "mkt1-q9",
        question: "The lesson says a business grows organically when marketing is done well. What drives that organic growth?",
        options: [
          "Buying more advertising space across additional channels",
          "Word of mouth spreading and customers coming back",
          "Constantly lowering prices below every competitor",
          "Hiring a larger sales team to reach more people"
        ],
        correctAnswer: 1,
        explanation: "The lesson states that when real value is delivered, word of mouth spreads, customers come back, and the business grows organically."
      },
      {
        id: "mkt1-q10",
        question: "Based on the lesson, which statement about advertising is TRUE?",
        options: [
          "Advertising and marketing mean exactly the same thing",
          "Advertising is one specific promotional tool within the broader marketing strategy",
          "Advertising is the very first step of the marketing process",
          "Advertising is the only part of marketing that creates value for customers"
        ],
        correctAnswer: 1,
        explanation: "The lesson defines advertising as one specific promotional tool within the broader marketing strategy, not the whole of marketing."
      }
    ]
  },
  {
    lessonId: "mkt-2",
    questions: [
      {
        id: "mkt2-q6",
        question: "The lesson lists bases for segmentation. Which of these is one of them?",
        options: [
          "The color of the product packaging",
          "Behavior, such as buying habits and brand loyalty",
          "The season in which the product launches",
          "The number of competitors in the market"
        ],
        correctAnswer: 1,
        explanation: "The lesson says segments can be based on demographics, psychographics, behavior (buying habits, brand loyalty), or needs."
      },
      {
        id: "mkt2-q7",
        question: "In the lesson, what does it say the term target market means?",
        options: [
          "Everyone who could theoretically afford the product",
          "The specific group of people most likely to buy your product",
          "The geographic region where a store is physically located",
          "The competitors a business is trying to outsell"
        ],
        correctAnswer: 1,
        explanation: "The lesson defines target market as the specific group of people most likely to buy your product."
      },
      {
        id: "mkt2-q8",
        question: "The lesson's Nike example shows segmentation in action. What does Nike do?",
        options: [
          "It markets a single message to everyone who wears shoes",
          "It gives runners, basketball players, and yoga practitioners different ads and products",
          "It focuses only on selling to professional athletes",
          "It sets one low price to appeal to the widest audience"
        ],
        correctAnswer: 1,
        explanation: "The example explains Nike segments ruthlessly, giving runners, basketball players, and yoga practitioners different products and messaging suited to each group."
      },
      {
        id: "mkt2-q9",
        question: "In the phone case scenario, how did Zara research her target customer before designing?",
        options: [
          "She copied the best-selling designs from a competitor",
          "She surveyed 30 college students about what they wanted in a phone case",
          "She guessed based on her own personal taste in cases",
          "She hired a professional marketing agency to run focus groups"
        ],
        correctAnswer: 1,
        explanation: "The scenario states Zara researched her target customer by surveying 30 college students about what they wanted in a phone case."
      },
      {
        id: "mkt2-q10",
        question: "The lesson says a 16-year-old athlete and a 16-year-old artist might share demographics. What differs between them?",
        options: [
          "Their age and their location in the country",
          "Their motivations, values, and purchasing triggers",
          "Their income level and household size",
          "Their access to the internet and social media"
        ],
        correctAnswer: 1,
        explanation: "The lesson uses this example to show that people with the same demographics can have completely different motivations, values, and purchasing triggers - which is what psychographics reveal."
      }
    ]
  },
  {
    lessonId: "mkt-3",
    questions: [
      {
        id: "mkt3-q6",
        question: "The lesson defines market research. What does it say research is the difference between?",
        options: [
          "Making a profit and losing money",
          "Guessing what people want and knowing what people want",
          "A small business and a large corporation",
          "Advertising online and advertising in print"
        ],
        correctAnswer: 1,
        explanation: "The lesson describes market research as the difference between guessing what people want and knowing what people want."
      },
      {
        id: "mkt3-q7",
        question: "According to the lesson, what does secondary research give a business?",
        options: [
          "Specific insights about your exact customers only",
          "The big picture and an understanding of trends",
          "A guarantee that a product will succeed",
          "Original data collected directly from your market"
        ],
        correctAnswer: 1,
        explanation: "The lesson states secondary research gives you the big picture and helps you understand trends, while primary research gives specific insights about your exact customers."
      },
      {
        id: "mkt3-q8",
        question: "The lesson's Apple example describes what kind of research before the iPhone?",
        options: [
          "Large-scale surveys asking customers what phone they wanted",
          "Observational research watching how people actually used their phones",
          "Analysis of competitor sales reports and industry data",
          "Focus groups where customers designed their ideal phone"
        ],
        correctAnswer: 1,
        explanation: "The example explains Apple observed how people actually used their phones - fumbling with tiny keyboards, squinting at small screens - revealing needs customers could not even articulate."
      },
      {
        id: "mkt3-q9",
        question: "In the food truck scenario, what price range did Diana's research show people were willing to pay?",
        options: [
          "The $5-7 range",
          "The $10-12 range",
          "The $15-20 range",
          "Whatever competitors were charging at the time"
        ],
        correctAnswer: 1,
        explanation: "The scenario states Diana priced her grain bowls and wraps at the $10-12 range her research showed people were willing to pay."
      },
      {
        id: "mkt3-q10",
        question: "The lesson lists examples of primary research methods. Which is one of them?",
        options: [
          "Reading published industry reports",
          "Focus groups",
          "Analyzing census data",
          "Reviewing competitor pricing pages"
        ],
        correctAnswer: 1,
        explanation: "The lesson lists surveys, interviews, focus groups, and observation as primary research - data you collect yourself. Reports, census data, and competitor analysis are secondary research."
      }
    ]
  },
  {
    lessonId: "mkt-4",
    questions: [
      {
        id: "mkt4-q6",
        question: "The lesson says Product is more than the physical item. Which of these does it say Product includes?",
        options: [
          "The advertising budget and media schedule",
          "The features, quality, design, packaging, brand name, and problem it solves",
          "The distribution route from the factory to the store",
          "The number of competitors in the same category"
        ],
        correctAnswer: 1,
        explanation: "The lesson states Product includes the features, quality, design, packaging, brand name, and the problem it solves - not just the physical item."
      },
      {
        id: "mkt4-q7",
        question: "According to the lesson, what are the 4 Ps of marketing?",
        options: [
          "Product, Price, Place, and Promotion",
          "People, Process, Profit, and Product",
          "Price, Placement, Positioning, and Promotion",
          "Product, Packaging, Promotion, and Publicity"
        ],
        correctAnswer: 0,
        explanation: "The lesson names the 4 Ps as Product, Price, Place, and Promotion, and focuses this lesson on the first two."
      },
      {
        id: "mkt4-q8",
        question: "The lesson's Starbucks example contrasts two pricing strategies. What does it say the gas station uses?",
        options: [
          "Value-based pricing at $5-7 per cup",
          "Competitive pricing at $1.50 per cup",
          "Cost-plus pricing at exactly $0.30 per cup",
          "Free pricing to attract customers inside the store"
        ],
        correctAnswer: 1,
        explanation: "The example states a gas station sells coffee for $1.50 using competitive pricing, while Starbucks charges $5-7 using value-based pricing."
      },
      {
        id: "mkt4-q9",
        question: "In the bracelet scenario, what did Marcus add that Ella did not, allowing him to charge more?",
        options: [
          "More expensive raw materials for each bracelet",
          "A brand called Thread and Stone plus gift-box packaging with a card",
          "A lower price to undercut Ella and win customers",
          "A location closer to the market entrance"
        ],
        correctAnswer: 1,
        explanation: "The scenario describes Marcus creating a brand called Thread & Stone and packaging each bracelet in a gift box with a card, raising perceived value while using the same materials."
      },
      {
        id: "mkt4-q10",
        question: "How does the lesson describe cost-plus pricing?",
        options: [
          "Charging what customers believe the product is worth",
          "Adding a markup to your costs",
          "Matching or undercutting what competitors charge",
          "Giving the product away to build an audience first"
        ],
        correctAnswer: 1,
        explanation: "The lesson defines cost-plus pricing as adding a markup to your costs, distinct from value-based and competitive pricing."
      }
    ]
  },
  {
    lessonId: "mkt-5",
    questions: [
      {
        id: "mkt5-q6",
        question: "How does the lesson define distribution channels?",
        options: [
          "The paths a product takes from creator to customer",
          "The social media accounts a business posts on",
          "The discounts a business offers to attract buyers",
          "The team of salespeople who close deals in person"
        ],
        correctAnswer: 0,
        explanation: "The lesson defines distribution channels as the paths a product takes from creator to customer, and says choosing the right ones can make or break a business."
      },
      {
        id: "mkt5-q7",
        question: "The lesson lists methods of Promotion. Which of these is included?",
        options: [
          "Detailed product differentiation and market positioning",
          "Public relations, described as earned media",
          "Careful customer segmentation and audience targeting",
          "Simple cost-plus markup pricing method"
        ],
        correctAnswer: 1,
        explanation: "The lesson lists advertising (paid), public relations (earned media), social media (organic reach), sales promotions, and personal selling as forms of Promotion."
      },
      {
        id: "mkt5-q8",
        question: "According to the lesson, what does the term omnichannel mean?",
        options: [
          "Selling only through a single online store",
          "Being present across multiple channels so customers can buy wherever they prefer",
          "Running the same advertisement on every television network",
          "Offering one product in many different colors and sizes"
        ],
        correctAnswer: 1,
        explanation: "The lesson defines omnichannel as being present across multiple channels so customers can buy wherever they prefer."
      },
      {
        id: "mkt5-q9",
        question: "In the candle scenario, what happened to Kai's revenue when the farmers market closed for winter?",
        options: [
          "It stayed roughly the same because of loyal customers",
          "It dropped to zero because he had no other channel",
          "It increased as customers shopped for the holidays",
          "It shifted entirely to his online store overnight"
        ],
        correctAnswer: 1,
        explanation: "The scenario states that when the farmers market closed for winter, Kai's revenue dropped to zero, while Nadia's online sales actually increased during the holiday season."
      },
      {
        id: "mkt5-q10",
        question: "The lesson describes the biggest shift in modern marketing. What is it?",
        options: [
          "The rise of expensive television advertising",
          "The rise of organic promotion through content, community, and social media without paying for ads",
          "The move toward selling only in physical retail stores",
          "The shift to charging premium prices for every product"
        ],
        correctAnswer: 1,
        explanation: "The lesson calls the rise of organic promotion - building an audience through content, community, and social media without paying for ads - the biggest shift in modern marketing, which levels the playing field for small businesses."
      }
    ]
  },
  {
    lessonId: "mkt-6",
    questions: [
      {
        id: "mkt6-q6",
        question: "According to the lesson, what is a logo in relation to a brand?",
        options: [
          "The single most important part of a brand",
          "A visual shortcut to the deeper brand perception",
          "Basically the same thing as brand equity",
          "A legal requirement for registering any business"
        ],
        correctAnswer: 1,
        explanation: "The lesson states a brand is the total perception people have about your business, and a logo is just a visual shortcut to that deeper perception."
      },
      {
        id: "mkt6-q7",
        question: "How does the lesson define brand voice?",
        options: [
          "The volume of advertising a company runs each month",
          "How your business speaks - playful or professional, bold or understated",
          "The literal spokesperson who narrates commercials",
          "The price signals a brand sends to customers"
        ],
        correctAnswer: 1,
        explanation: "The lesson describes brand voice as how your business speaks - playful or professional, bold or understated, inclusive or exclusive - building an emotional connection."
      },
      {
        id: "mkt6-q8",
        question: "The lesson's Patagonia example says their brand is really about what?",
        options: [
          "Making the highest-quality jackets on the market",
          "Environmental activism",
          "Offering the lowest prices in outdoor retail",
          "Selling as many new products as possible"
        ],
        correctAnswer: 1,
        explanation: "The lesson states Patagonia's brand is not about jackets but about environmental activism, shown by their Don't Buy This Jacket ad encouraging repair over replacement."
      },
      {
        id: "mkt6-q9",
        question: "In the tutoring scenario, what specific brand elements did Sarah create for Apex Tutoring?",
        options: [
          "A celebrity endorsement and a paid ad campaign",
          "A name, consistent colors (navy and gold), and a tagline (Think Sharper)",
          "A lower price and a money-back guarantee",
          "A physical storefront near the school"
        ],
        correctAnswer: 1,
        explanation: "The scenario states Sarah created a name (Apex Tutoring), consistent colors (navy and gold), and a tagline (Think Sharper), with all her social posts following the same visual style."
      },
      {
        id: "mkt6-q10",
        question: "The lesson says customers buy from brands they recognize and trust even when what exists?",
        options: [
          "Cheaper alternatives exist",
          "The brand stops advertising entirely",
          "The product quality declines over time",
          "A newer competitor enters the market"
        ],
        correctAnswer: 0,
        explanation: "The lesson states that brand consistency builds recognition and trust, and customers buy from brands they recognize and trust even when cheaper alternatives exist - this is brand equity."
      }
    ]
  },
  {
    lessonId: "mkt-7",
    questions: [
      {
        id: "mkt7-q6",
        question: "According to the lesson, what does the Awareness stage involve?",
        options: [
          "Choosing a product and making the purchase",
          "Realizing you have a need, want, or problem to solve",
          "Returning to repurchase and recommend to others",
          "Comparing reviews and alternatives in detail"
        ],
        correctAnswer: 1,
        explanation: "The lesson defines Awareness as the stage where the customer realizes they have a need, want, or problem to solve."
      },
      {
        id: "mkt7-q7",
        question: "The lesson says different tactics work at different stages. What does the Decision stage require?",
        options: [
          "Visibility, so customers can simply be seen",
          "Trust and urgency, such as testimonials, guarantees, and limited offers",
          "Ongoing value, such as rewards and follow-up",
          "Information, such as reviews and comparisons"
        ],
        correctAnswer: 1,
        explanation: "The lesson states Decision requires trust and urgency - testimonials, guarantees, and limited offers - while Awareness needs visibility and Consideration needs information."
      },
      {
        id: "mkt7-q8",
        question: "In the shoe example, what does the lesson say happens at the Loyalty stage?",
        options: [
          "You notice your old shoes are worn out",
          "You browse several brands and read reviews",
          "If they fit great and lasted long, you buy the same brand again",
          "You choose based on a friend's recommendation and a sale"
        ],
        correctAnswer: 2,
        explanation: "The example explains that if the shoes fit great and lasted long, you would buy the same brand again - that repeat purchase is the Loyalty stage."
      },
      {
        id: "mkt7-q9",
        question: "In Maya's laptop journey, what tipped her over the edge at the Decision stage in the Apple Store?",
        options: [
          "An article ranking the top 10 laptops",
          "A student discount promotion",
          "A Reddit thread comparing specifications",
          "An Instagram post she made afterward"
        ],
        correctAnswer: 1,
        explanation: "The scenario states Maya tried the laptop in person and a student discount promotion tipped her over the edge, so she bought it that day - the Decision stage."
      },
      {
        id: "mkt7-q10",
        question: "The lesson says the Consideration stage requires what?",
        options: [
          "Information - reviews, comparisons, demos",
          "Ongoing value - customer service and rewards",
          "Visibility - being seen by new people",
          "Urgency - limited-time offers and guarantees"
        ],
        correctAnswer: 0,
        explanation: "The lesson states Consideration requires information such as reviews, comparisons, and demos, as customers research and compare options."
      }
    ]
  },
  {
    lessonId: "mkt-8",
    questions: [
      {
        id: "mkt8-q6",
        question: "According to the lesson, why is every business idea called a hypothesis?",
        options: [
          "Because it is a proven fact that always works",
          "Because it is an educated guess that needs to be validated with real data",
          "Because it must be approved by investors before launch",
          "Because it can never be tested until the product is finished"
        ],
        correctAnswer: 1,
        explanation: "The lesson describes every business idea as a hypothesis - an educated guess that needs to be validated with real data before you invest time and money."
      },
      {
        id: "mkt8-q7",
        question: "The lesson describes the goal of an MVP approach. What is it?",
        options: [
          "To build the most complete product possible before launch",
          "To learn fast and fail cheap",
          "To maximize profit on the very first sale",
          "To copy what a successful competitor already built"
        ],
        correctAnswer: 1,
        explanation: "The lesson states that with an MVP you launch a basic version quickly, get real feedback, and iterate - the goal is to learn fast and fail cheap."
      },
      {
        id: "mkt8-q8",
        question: "The lesson's Dropbox example describes their MVP. What was it?",
        options: [
          "A fully coded early version of the software",
          "A 3-minute video and a sign-up page made before writing any code",
          "A paid advertising campaign on social media",
          "A physical prototype shown to investors"
        ],
        correctAnswer: 1,
        explanation: "The example explains Dropbox made a 3-minute video and a sign-up page before writing a single line of code, and 75,000 signups validated demand - that video was their MVP."
      },
      {
        id: "mkt8-q9",
        question: "In the study guide scenario, what did Riley's quick test reveal that changed her approach?",
        options: [
          "Students wanted printed guides covering every subject",
          "Students wanted digital guides and preferred subject-specific bundles",
          "Students were unwilling to pay anything for study guides",
          "Students only wanted guides for a single subject"
        ],
        correctAnswer: 1,
        explanation: "The scenario states Riley's test revealed students wanted digital guides (not printed) and preferred subject-specific bundles - two insights that changed her entire approach."
      },
      {
        id: "mkt8-q10",
        question: "How does the lesson describe A/B testing?",
        options: [
          "Building the full product and hoping customers buy it",
          "Testing two versions simultaneously and letting data decide which performs better",
          "Asking friends which option they personally prefer",
          "Launching one version and improving it over several years"
        ],
        correctAnswer: 1,
        explanation: "The lesson defines A/B testing as testing two versions simultaneously - two prices, headlines, or designs - and letting data decide the winner, replacing opinions with evidence."
      }
    ]
  }
]
