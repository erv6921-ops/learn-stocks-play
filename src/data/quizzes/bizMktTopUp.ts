// Top-up questions for the Business Management and Marketing lessons, whose
// original pools of 5 were one question short of filling micro-check +
// applied + mastery without template fillers. Two extra per lesson brings
// every pool to 7 — full coverage with zero recycled questions.
import type { LessonQuiz } from "../lessonQuizzes"

export const bizMktTopUpQuizzes: LessonQuiz[] = [
  { lessonId: "mgmt-1", questions: [
    { id: "mgmt-1-t1", question: "A manager spends Monday setting quarterly goals and Tuesday assigning who does what. Which two functions is she using?", options: ["Planning, then organizing", "Leading, then controlling", "Controlling, then planning", "Organizing, then leading"], correctAnswer: 0, explanation: "Setting goals = planning; arranging people and resources to hit them = organizing. Leading and controlling come as work happens." },
    { id: "mgmt-1-t2", question: "The 'controlling' function of management means…", options: ["Measuring results and correcting course", "Micromanaging every employee's day", "Blocking staff from making decisions", "Setting the company's long-term vision"], correctAnswer: 0, explanation: "Controlling = compare actual results to the plan and adjust — dashboards and reviews, not bossiness." },
  ]},
  { lessonId: "mgmt-2", questions: [
    { id: "mgmt-2-t1", question: "During a kitchen fire drill, the head chef barks precise orders with no discussion. That style is…", options: ["Autocratic — and fitting for emergencies", "Laissez-faire — hands-off leadership", "Democratic — collecting all opinions", "Always the wrong choice"], correctAnswer: 0, explanation: "Crises reward speed over consensus — autocratic style fits emergencies even if it's poor for daily creative work." },
    { id: "mgmt-2-t2", question: "Laissez-faire leadership works BEST with a team that is…", options: ["Skilled, self-motivated, and experienced", "Brand new and unsure of the basics", "In the middle of a crisis", "Unwilling to work without oversight"], correctAnswer: 0, explanation: "Hands-off leadership multiplies experts and sinks novices — the style must match the team's maturity." },
  ]},
  { lessonId: "mgmt-3", questions: [
    { id: "mgmt-3-t1", question: "A 'flat' organizational structure means…", options: ["Few layers between staff and the top", "The office is on a single floor", "Everyone earns identical salaries", "No one is ever promoted"], correctAnswer: 0, explanation: "Fewer layers = faster decisions and more autonomy, but each manager oversees more people." },
    { id: "mgmt-3-t2", question: "'Span of control' refers to…", options: ["How many people report to one manager", "The size of the company's market", "A manager's security clearance", "The length of executive contracts"], correctAnswer: 0, explanation: "Wide spans (many reports) suit routine work; narrow spans fit complex work needing close coaching." },
  ]},
  { lessonId: "mgmt-4", questions: [
    { id: "mgmt-4-t1", question: "In SWOT, 'opportunities' and 'threats' differ from 'strengths' and 'weaknesses' because they are…", options: ["Outside factors beyond its control", "Internal traits the company owns", "Always financial in nature", "Less important to analyze"], correctAnswer: 0, explanation: "S and W live inside the business; O and T come from the outside world — markets, rivals, trends, rules." },
    { id: "mgmt-4-t2", question: "A lemonade stand's rival opening next door belongs in which SWOT box?", options: ["Threat — an external competitive danger", "Weakness — an internal shortcoming", "Strength — something it does well", "Opportunity — a chance to grow"], correctAnswer: 0, explanation: "Competition arriving is an outside force working against you — the textbook threat." },
  ]},
  { lessonId: "mgmt-5", questions: [
    { id: "mgmt-5-t1", question: "Porter's 'threat of new entrants' asks…", options: ["How easily new rivals can enter", "Whether employees might quit soon", "If customers will pay on time", "How fast technology changes"], correctAnswer: 0, explanation: "Low barriers to entry mean profits attract a crowd fast — high barriers (licenses, capital, brand) protect incumbents." },
    { id: "mgmt-5-t2", question: "Strong 'supplier power' hurts a business because suppliers can…", options: ["Raise input prices and squeeze margins", "Purchase the company's products", "Set the company's retail prices", "Hire away all the customers"], correctAnswer: 0, explanation: "One critical supplier with no alternatives can dictate terms — think of a bakery with a single flour source." },
  ]},
  { lessonId: "mgmt-6", questions: [
    { id: "mgmt-6-t1", question: "A good KPI must above all be…", options: ["Measurable and tied to a real goal", "Impressive-sounding in reports", "Impossible to achieve", "Kept secret from the team"], correctAnswer: 0, explanation: "If it can't be measured and doesn't connect to strategy, it's decoration, not a key performance indicator." },
    { id: "mgmt-6-t2", question: "A youtuber tracking 'hours of editing' instead of 'viewer retention' illustrates…", options: ["Measuring activity instead of outcomes", "A perfectly chosen KPI", "The only metric that matters", "Why metrics are pointless"], correctAnswer: 0, explanation: "Busy ≠ effective — strong KPIs track results customers feel, not effort spent." },
  ]},
  { lessonId: "mgmt-7", questions: [
    { id: "mgmt-7-t1", question: "A 'bad hire' costs more than salary because of…", options: ["Training, disruption, and rehiring", "Government fines for mistakes", "Mandatory double severance", "The cost of new furniture"], correctAnswer: 0, explanation: "Months of ramp-up, lowered morale, lost customers, then repeating the search — often 1-2x the role's salary." },
    { id: "mgmt-7-t2", question: "'Onboarding' is…", options: ["Structured ramp-up for new hires", "The interview before an offer", "A company boat retreat", "Filing paperwork on day one only"], correctAnswer: 0, explanation: "Good onboarding — training, mentorship, early wins — is why some hires thrive in weeks while others flounder for months." },
  ]},
  { lessonId: "mgmt-8", questions: [
    { id: "mgmt-8-t1", question: "Stakeholder theory says a company should weigh the interests of…", options: ["Staff, customers, and community too", "Only the largest investors", "Competitors above all others", "Whoever complains the loudest"], correctAnswer: 0, explanation: "Decisions ripple beyond profit — firms that burn workers or towns eventually pay for it in reputation and retention." },
    { id: "mgmt-8-t2", question: "Cutting corners to boost this quarter's profit typically risks…", options: ["Reputation damage that costs more later", "Nothing measurable at all", "Only small accounting fees", "Immediate reward with no downside"], correctAnswer: 0, explanation: "Scandals erase decades of trust in days — ethics is also risk management for the brand." },
  ]},
  { lessonId: "mkt-1", questions: [
    { id: "mkt-1-t1", question: "Marketing differs from advertising because marketing…", options: ["Spans product, price, place, promotion", "Is just a fancier word for ads", "Happens only after a product exists", "Costs nothing to execute"], correctAnswer: 0, explanation: "Ads are one megaphone; marketing decides what to build, for whom, at what price, sold where — the whole value story." },
    { id: "mkt-1-t2", question: "'Creating value' in marketing means…", options: ["Solving a problem people pay for", "Convincing people to buy junk", "Raising prices without changes", "Copying a competitor exactly"], correctAnswer: 0, explanation: "Durable brands begin with genuine usefulness — marketing communicates value that actually exists." },
  ]},
  { lessonId: "mkt-2", questions: [
    { id: "mkt-2-t1", question: "Demographics vs psychographics: demographics describe…", options: ["Measurable traits like age and income", "Values, interests, and lifestyles", "Only shopping cart contents", "Social media passwords"], correctAnswer: 0, explanation: "Demographics = who they ARE on paper; psychographics = what they CARE about. Great targeting uses both." },
    { id: "mkt-2-t2", question: "Targeting 'everyone' with one message usually fails because…", options: ["A message for all lands with no one", "Laws forbid broad advertising", "Everyone sees ads identically", "Big audiences cost nothing"], correctAnswer: 0, explanation: "Sharp segments allow sharp messages — the riches are in the niches." },
  ]},
  { lessonId: "mkt-3", questions: [
    { id: "mkt-3-t1", question: "Primary vs secondary research: primary means…", options: ["Data you collect yourself, like surveys", "Reports someone else published", "The first article you find", "Research done before noon"], correctAnswer: 0, explanation: "Your own surveys, interviews, and tests = primary; industry reports and census data = secondary." },
    { id: "mkt-3-t2", question: "Research 'reduces risk' for a business because it…", options: ["Tests demand before money is fully committed", "Guarantees the product will succeed", "Eliminates all competition", "Replaces the need for a product"], correctAnswer: 0, explanation: "A $50 survey that kills a bad idea saves the $5,000 launch — research is cheap compared to failure." },
  ]},
  { lessonId: "mkt-4", questions: [
    { id: "mkt-4-t1", question: "Cost-plus vs value-based pricing: value-based sets prices on…", options: ["What the benefit is worth to the customer", "Production cost plus a fixed markup", "Whatever competitors charged in 1990", "The founder's monthly expenses"], correctAnswer: 0, explanation: "A $2 print that saves a client hours can price at $50 — value pricing captures worth, not just cost." },
    { id: "mkt-4-t2", question: "Product 'differentiation' means…", options: ["A real reason yours beats the rest", "Selling the identical thing cheaper", "Changing your logo monthly", "Avoiding all comparisons"], correctAnswer: 0, explanation: "Faster, tastier, cooler, kinder — without a difference customers can name, price is your only weapon." },
  ]},
  { lessonId: "mkt-5", questions: [
    { id: "mkt-5-t1", question: "'Place' in the 4 Ps decides…", options: ["Where and how customers can actually buy", "The office's street address", "Where employees park", "Which city the founder lives in"], correctAnswer: 0, explanation: "Distribution strategy — online, retail shelves, school lunch tables — determines whether demand can become sales." },
    { id: "mkt-5-t2", question: "Organic vs paid promotion: organic reach comes from…", options: ["Content and word-of-mouth, unpaid", "Buying every available ad slot", "Only printed newspaper ads", "Government promotional grants"], correctAnswer: 0, explanation: "Paid = renting attention; organic = earning it. Slower to build, cheaper to keep, and more trusted." },
  ]},
  { lessonId: "mkt-6", questions: [
    { id: "mkt-6-t1", question: "A brand is really…", options: ["What people feel seeing your name", "Just the logo and color palette", "A legal registration paper", "The size of the ad budget"], correctAnswer: 0, explanation: "Brand lives in customers' heads — the logo is a trigger for the reputation behind it." },
    { id: "mkt-6-t2", question: "Brand consistency matters because mixed messages…", options: ["Erode the trust that brands exist to build", "Keep audiences pleasantly surprised", "Cost less to produce", "Reach more platforms"], correctAnswer: 0, explanation: "Same voice, promise, and quality everywhere compounds recognition — chaos resets it." },
  ]},
  { lessonId: "mkt-7", questions: [
    { id: "mkt-7-t1", question: "The buyer journey's 'consideration' stage is when a customer…", options: ["Compares options after realizing a need", "Has never heard of the problem", "Completes the final purchase", "Writes a review afterward"], correctAnswer: 0, explanation: "Aware → considering → deciding → loyal. Each stage needs different messages: education first, comparisons mid, reassurance late." },
    { id: "mkt-7-t2", question: "Loyalty is the most profitable journey stage because repeat customers…", options: ["Rebuy and recruit friends for free", "Always pay double the price", "Never contact support", "Require the most advertising"], correctAnswer: 0, explanation: "Winning a new customer costs ~5x keeping one — retention and referrals are the quiet profit engine." },
  ]},
  { lessonId: "mkt-8", questions: [
    { id: "mkt-8-t1", question: "An A/B test works by…", options: ["Show two versions; measure the winner", "Asking the team which they like", "Launching both and hoping", "Testing 26 versions alphabetically"], correctAnswer: 0, explanation: "Half see A, half see B, data picks the winner — opinion loses to measurement." },
    { id: "mkt-8-t2", question: "An MVP (minimum viable product) exists to…", options: ["Test demand with the smallest version", "Win design awards at launch", "Include every feature imaginable", "Delay launching indefinitely"], correctAnswer: 0, explanation: "Build the skateboard before the car — real customer behavior on a small version beats months of guessing." },
  ]},
]
