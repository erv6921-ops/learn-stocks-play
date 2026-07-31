// Teaching-aligned top-up questions that extend each lesson pool to ~10.
// Scope: business-management (mgmt-1..8). Every question must be answerable from the lesson content.
import { QuizQuestion } from "@/types"

export const topUpBusinessQuizzes: { lessonId: string; questions: QuizQuestion[] }[] = [
  {
    lessonId: "mgmt-1",
    questions: [
      {
        id: "mgmt1-q6",
        question: "Who first described the four functions of management over 100 years ago?",
        options: [
          "Michael Porter, a Harvard business professor",
          "Henri Fayol, who defined these functions long ago",
          "Jeff Bezos, the founder of Amazon",
          "Steve Jobs, the co-founder of Apple"
        ],
        correctAnswer: 1,
        explanation: "The lesson states the four functions - planning, organizing, leading, and controlling - were first described by Henri Fayol over 100 years ago and still define effective management today."
      },
      {
        id: "mgmt1-q7",
        question: "According to the lesson, what is management fundamentally about?",
        options: [
          "Telling people exactly what to do at all times",
          "Creating the conditions for a team to succeed",
          "Maximizing short-term profit above everything else",
          "Reducing the number of employees a company needs"
        ],
        correctAnswer: 1,
        explanation: "The lesson opens by stating management is not about telling people what to do - it's about creating the conditions for a team to succeed through planning, organizing, leading, and controlling."
      },
      {
        id: "mgmt1-q8",
        question: "In the restaurant example, a manager reviews waste reports daily to keep food costs down. Which function is this?",
        options: [
          "Controlling - monitoring results and making corrections",
          "Organizing - arranging staff schedules for peak hours",
          "Leading - energizing the team in pre-shift meetings",
          "Planning - choosing the weekly menu in advance"
        ],
        correctAnswer: 0,
        explanation: "In the lesson's restaurant example, controlling food costs by reviewing waste reports daily is an act of controlling - tracking performance and adjusting to stay on target."
      },
      {
        id: "mgmt1-q9",
        question: "According to the lesson, at what scale do the four management functions apply?",
        options: [
          "Only at large Fortune 500 corporations",
          "Only in businesses that sell physical products",
          "At every scale, from running a club to leading a corporation",
          "Only in companies with more than 100 employees"
        ],
        correctAnswer: 2,
        explanation: "The lesson emphasizes these functions apply at every scale - whether you are running a Fortune 500 company or a school club, they still apply."
      },
      {
        id: "mgmt1-q10",
        question: "The lesson says poor management is not always about bad people. What is it usually about instead?",
        options: [
          "A lack of funding and physical resources",
          "Missing systems and habits like consistent planning and controlling",
          "Employees who are simply not talented enough",
          "Too much competition in the marketplace"
        ],
        correctAnswer: 1,
        explanation: "The recap states poor management is not always about bad people - it is about missing systems and habits, as shown by Marcus reacting instead of managing proactively."
      }
    ]
  },
  {
    lessonId: "mgmt-2",
    questions: [
      {
        id: "mgmt2-q6",
        question: "According to the lesson, what does leadership style describe?",
        options: [
          "How much profit a leader is expected to generate each year",
          "How a leader makes decisions, communicates expectations, and interacts with their team",
          "The number of employees a leader is allowed to supervise",
          "The salary and benefits a leader receives from the company"
        ],
        correctAnswer: 1,
        explanation: "The lesson defines leadership style as how a leader makes decisions, communicates expectations, and interacts with their team."
      },
      {
        id: "mgmt2-q7",
        question: "In the founders scenario, why did Jordan's democratic approach hurt the company?",
        options: [
          "The team disliked the culture and most employees quit",
          "Weekly team votes slowed the launch to 14 months, missing the market window",
          "Jordan made every decision alone and burned the team out",
          "The senior engineers were given too much freedom and caused chaos"
        ],
        correctAnswer: 1,
        explanation: "The scenario shows Jordan's weekly team votes on features meant the app took 14 months to launch and missed the market window - illustrating that democratic leadership can be too slow."
      },
      {
        id: "mgmt2-q8",
        question: "Which leadership style does the lesson associate with tight control and clear expectations set by the leader?",
        options: [
          "Democratic leadership",
          "Laissez-faire leadership",
          "Autocratic leadership",
          "Situational leadership"
        ],
        correctAnswer: 2,
        explanation: "The lesson states autocratic leaders make decisions unilaterally, set clear expectations, and maintain tight control - effective in emergencies but hard on morale over time."
      },
      {
        id: "mgmt2-q9",
        question: "According to the lesson, what did Steve Jobs demonstrate during development of the first iPhone?",
        options: [
          "A laissez-faire style, giving engineers total freedom",
          "A largely autocratic style, making final design decisions himself",
          "A democratic style, letting the team vote on features",
          "That no leadership style is needed for talented teams"
        ],
        correctAnswer: 1,
        explanation: "The real-world example notes Steve Jobs used a largely autocratic style on the first iPhone, making final design decisions and pushing the team relentlessly."
      },
      {
        id: "mgmt2-q10",
        question: "The lesson says democratic leadership works well for creative problem-solving but has what drawback?",
        options: [
          "It removes all accountability from team members",
          "It can be slow when fast decisions are needed",
          "It always produces lower-quality decisions",
          "It only works with inexperienced teams"
        ],
        correctAnswer: 1,
        explanation: "The lesson states democratic leaders foster collaboration and buy-in, which works well for creative problem-solving, but can be slow when fast decisions are needed."
      }
    ]
  },
  {
    lessonId: "mgmt-3",
    questions: [
      {
        id: "mgmt3-q6",
        question: "According to the lesson, what does organizational structure define?",
        options: [
          "How tasks are divided, who reports to whom, and how information flows",
          "How much revenue each product line generates annually",
          "Which marketing channels a company should invest in",
          "The total number of customers a company can serve"
        ],
        correctAnswer: 0,
        explanation: "The lesson defines organizational structure as the framework that defines how tasks are divided, who reports to whom, and how information flows through a company."
      },
      {
        id: "mgmt3-q7",
        question: "Why does the lesson say Valve can operate with an almost completely flat structure and no formal managers?",
        options: [
          "Because it is a very small company with only a few employees",
          "Because it hires exceptionally talented, self-motivated people",
          "Because video game companies are legally exempt from having managers",
          "Because flat structures are always more profitable than hierarchies"
        ],
        correctAnswer: 1,
        explanation: "The example explains Valve's nearly flat structure works because they hire exceptionally talented, self-motivated people who choose their own projects."
      },
      {
        id: "mgmt3-q8",
        question: "According to the lesson, why does McDonald's use a strict hierarchy?",
        options: [
          "Because its employees prefer many layers of management",
          "Because consistency across 40,000 locations demands standardized procedures and clear chains of command",
          "Because hierarchies are cheaper to run than flat structures",
          "Because the law requires large chains to be hierarchical"
        ],
        correctAnswer: 1,
        explanation: "The example states McDonald's uses a strict hierarchy because consistency across 40,000 locations demands standardized procedures and clear chains of command."
      },
      {
        id: "mgmt3-q9",
        question: "In the scenario, what mistake did StructureFirst make with only 25 employees?",
        options: [
          "It stayed completely flat so no one had final say",
          "It added four management layers, so every decision needed three approvals",
          "It fired all of its managers to save money",
          "It refused to hire any new employees as it grew"
        ],
        correctAnswer: 1,
        explanation: "The scenario shows StructureFirst added four management layers at just 25 employees, so every decision needed three approvals and product updates took 4x longer than competitors."
      },
      {
        id: "mgmt3-q10",
        question: "According to the lesson, what is the biggest downside of too many layers in a hierarchical structure?",
        options: [
          "Roles become impossible to define clearly",
          "It slows decisions and creates bureaucracy",
          "Employees can no longer communicate with leadership at all",
          "The company automatically loses money every quarter"
        ],
        correctAnswer: 1,
        explanation: "The lesson notes that while hierarchical structures give clear authority and defined roles, too many layers slow decisions and create bureaucracy."
      }
    ]
  },
  {
    lessonId: "mgmt-4",
    questions: [
      {
        id: "mgmt4-q6",
        question: "According to the lesson, what does the acronym SWOT stand for?",
        options: [
          "Strategy, Workflow, Operations, and Timing",
          "Strengths, Weaknesses, Opportunities, and Threats",
          "Sales, Workforce, Overhead, and Turnover",
          "Systems, Wins, Objectives, and Tactics"
        ],
        correctAnswer: 1,
        explanation: "The lesson states SWOT stands for Strengths, Weaknesses, Opportunities, and Threats, mapping four areas to make more informed decisions."
      },
      {
        id: "mgmt4-q7",
        question: "According to the lesson, where does the real power of a SWOT analysis come from?",
        options: [
          "Listing as many items as possible in each of the four boxes",
          "Understanding how the four areas interact and connecting the dots",
          "Focusing only on strengths and ignoring the other categories",
          "Presenting the analysis in a formal slideshow to investors"
        ],
        correctAnswer: 1,
        explanation: "The lesson stresses the power of SWOT is not just listing items - it is understanding how they interact, using a strength to seize an opportunity or seeing how a weakness amplifies a threat."
      },
      {
        id: "mgmt4-q8",
        question: "In the Netflix example, why was having no streaming content library classified as a weakness?",
        options: [
          "It was an external market condition Netflix could capitalize on",
          "It was an internal gap within Netflix as they shifted to streaming",
          "It was a threat posed by Blockbuster's physical stores",
          "It was a strength that helped Netflix transform the industry"
        ],
        correctAnswer: 1,
        explanation: "In the Netflix example, no streaming content library was listed as a weakness - an internal gap - since weaknesses are internal factors within the organization."
      },
      {
        id: "mgmt4-q9",
        question: "In the Netflix example, what was classified as an opportunity?",
        options: [
          "Netflix's massive subscriber base",
          "Growing broadband adoption",
          "Blockbuster's 10,000 physical stores",
          "Netflix's recommendation algorithm"
        ],
        correctAnswer: 1,
        explanation: "The Netflix example lists growing broadband adoption as the opportunity - an external condition Netflix could capitalize on by leveraging its strengths."
      },
      {
        id: "mgmt4-q10",
        question: "In the tutoring scenario, which item was listed as a weakness for the student?",
        options: [
          "A 4.0 GPA in STEM subjects",
          "Having no business experience and limited time due to sports",
          "The school having 2,000 students and no tutoring service",
          "A national tutoring company opening 2 miles away"
        ],
        correctAnswer: 1,
        explanation: "The scenario lists no business experience, limited time due to sports, and no marketing skills as the student's weaknesses - internal gaps to address."
      }
    ]
  },
  {
    lessonId: "mgmt-5",
    questions: [
      {
        id: "mgmt5-q6",
        question: "According to the lesson, who developed the Five Forces framework?",
        options: [
          "Henri Fayol, a French mining engineer",
          "Michael Porter, a Harvard professor",
          "Jeff Bezos, the founder of Amazon",
          "Peter Drucker, a management consultant"
        ],
        correctAnswer: 1,
        explanation: "The lesson states Michael Porter, a Harvard professor, developed the Five Forces framework to help businesses understand the competitive forces shaping every industry."
      },
      {
        id: "mgmt5-q7",
        question: "According to the lesson, what happens to industry profits when all five forces are strong?",
        options: [
          "Profits become outsized because competition drives innovation",
          "The industry is brutally competitive and profits are thin",
          "Profits are unaffected because the forces cancel each other out",
          "Only new entrants earn profits while existing firms lose money"
        ],
        correctAnswer: 1,
        explanation: "The lesson explains that when all five forces are strong, an industry is brutally competitive and profits are thin; when forces are weak, companies can earn outsized profits."
      },
      {
        id: "mgmt5-q8",
        question: "In the airline example, why is supplier power described as high?",
        options: [
          "Customers can compare prices instantly online",
          "Boeing and Airbus are the only major plane makers",
          "Trains, cars, and video calls are available substitutes",
          "Budget carriers keep emerging in the market"
        ],
        correctAnswer: 1,
        explanation: "The airline example attributes high supplier power to the fact that Boeing and Airbus are the only major plane makers, giving them leverage over airlines."
      },
      {
        id: "mgmt5-q9",
        question: "According to the lesson, what does 'competitive rivalry' measure?",
        options: [
          "How easy it is for new competitors to enter the market",
          "The intensity of competition among existing players",
          "The ability of suppliers to raise prices",
          "Whether customers can switch to alternative products"
        ],
        correctAnswer: 1,
        explanation: "The lesson defines competitive rivalry as the intensity of competition among existing players in an industry."
      },
      {
        id: "mgmt5-q10",
        question: "In Maya's coffee shop analysis, why is buyer power rated HIGH?",
        options: [
          "There are 12 coffee shops within 3 miles of the location",
          "College students are price-sensitive and will walk a block for a cheaper latte",
          "New coffee shops open and close frequently in college towns",
          "She sources beans from three local roasters"
        ],
        correctAnswer: 1,
        explanation: "In Maya's scenario, buyer power is HIGH because college students are extremely price-sensitive and will walk an extra block for a cheaper latte."
      }
    ]
  },
  {
    lessonId: "mgmt-6",
    questions: [
      {
        id: "mgmt6-q6",
        question: "The lesson contrasts a metric with a KPI using revenue. Which statement matches the lesson?",
        options: [
          "Revenue is a KPI, but revenue growth compared to the industry is just a metric",
          "Revenue is a metric, but revenue growth rate compared to the industry average is a KPI",
          "Both revenue and its growth rate are always leading indicators",
          "Neither revenue nor its growth rate can ever be a KPI"
        ],
        correctAnswer: 1,
        explanation: "The lesson explains revenue is a metric, while revenue growth rate compared to the industry average is a KPI because it connects to a strategic objective."
      },
      {
        id: "mgmt6-q7",
        question: "According to the lesson, which of the following is given as an example of a lagging indicator?",
        options: [
          "Customer satisfaction scores",
          "New leads generated this month",
          "Quarterly revenue or annual profit",
          "The size of the sales pipeline"
        ],
        correctAnswer: 2,
        explanation: "The lesson describes lagging indicators as results that have already happened, giving quarterly revenue and annual profit as examples."
      },
      {
        id: "mgmt6-q8",
        question: "The lesson compares relying on only one type of indicator to what?",
        options: [
          "Building a house without a foundation",
          "Driving a car using only the rearview mirror, or only looking ahead",
          "Sailing a ship without a compass or map",
          "Cooking a meal without tasting it first"
        ],
        correctAnswer: 1,
        explanation: "The lesson says relying on only one type of indicator is like driving a car using only the rearview mirror, or only looking ahead without checking your gauges."
      },
      {
        id: "mgmt6-q9",
        question: "According to the lesson, which three KPIs did Jeff Bezos focus on above all others at Amazon?",
        options: [
          "Employee count, office space, and marketing spend",
          "Customer selection, price, and delivery speed",
          "Stock price, quarterly profit, and CEO pay",
          "Website traffic, ad clicks, and social media followers"
        ],
        correctAnswer: 1,
        explanation: "The Amazon example states Jeff Bezos focused on three KPIs: customer selection, price, and delivery speed, which drove every major investment."
      },
      {
        id: "mgmt6-q10",
        question: "In the ShopFast vs SteadyGoods scenario, what did both companies have in common at the start?",
        options: [
          "Both had a 72% customer retention rate",
          "Both generated 2 million dollars in revenue last year",
          "Both relied on 70% of revenue from paid ads",
          "Both had a 30 dollar customer acquisition cost"
        ],
        correctAnswer: 1,
        explanation: "The scenario notes both ShopFast and SteadyGoods generated 2 million dollars in revenue, so revenue alone made them look equally healthy despite very different leading indicators."
      }
    ]
  },
  {
    lessonId: "mgmt-7",
    questions: [
      {
        id: "mgmt7-q6",
        question: "According to the lesson, roughly how much does a bad hire cost for a 60,000 dollar position?",
        options: [
          "About 6,000 dollars",
          "About 18,000 dollars",
          "About 45,000 dollars",
          "About 60,000 dollars"
        ],
        correctAnswer: 1,
        explanation: "The lesson applies the 30% estimate to a 60,000 dollar position, giving 18,000 dollars wasted on recruitment, training, lost productivity, and starting over."
      },
      {
        id: "mgmt7-q7",
        question: "According to the lesson, what are the three critical phases of the hiring process?",
        options: [
          "Advertising, interviewing, and negotiating",
          "Recruitment, onboarding, and retention",
          "Screening, hiring, and terminating",
          "Planning, organizing, and controlling"
        ],
        correctAnswer: 1,
        explanation: "The lesson lists the three critical phases as recruitment (finding candidates), onboarding (integrating new hires), and retention (keeping good employees)."
      },
      {
        id: "mgmt7-q8",
        question: "In the Zappos example, why does the company offer new hires 2,000 dollars to quit after training?",
        options: [
          "To reduce headcount and lower total salary costs",
          "Because they would rather pay 2,000 dollars now than keep someone who is not truly committed",
          "Because employment law requires an opt-out payment",
          "To recover the cost of the four-week training program"
        ],
        correctAnswer: 1,
        explanation: "The Zappos example explains they would rather pay 2,000 dollars now than keep an uncommitted employee, which would cost far more long term - and about 97% of hires stay."
      },
      {
        id: "mgmt7-q9",
        question: "In the scenario, why did Kai's rushed marketing hire fail with three campaigns?",
        options: [
          "The hire demanded too high a salary",
          "The hire did not understand the product or customers",
          "Elena poached the hire to her own company",
          "The company ran out of funding for advertising"
        ],
        correctAnswer: 1,
        explanation: "The scenario states Kai's hire launched three campaigns that failed because they did not understand the product or customers, wasting 140,000 dollars in ad spend."
      },
      {
        id: "mgmt7-q10",
        question: "According to the lesson, what does the phrase 'hire slow, fire fast' mean?",
        options: [
          "Firing quickly is more important than hiring carefully",
          "Taking time to find the right person is almost always cheaper than quickly hiring the wrong one",
          "Companies should always hire the first impressive candidate",
          "Slow hiring is legally required in most states"
        ],
        correctAnswer: 1,
        explanation: "The lesson explains 'hire slow, fire fast' means taking your time to find the right person is almost always cheaper than quickly hiring the wrong one and dealing with the fallout."
      }
    ]
  },
  {
    lessonId: "mgmt-8",
    questions: [
      {
        id: "mgmt8-q6",
        question: "According to the lesson, what is an ethical dilemma in business?",
        options: [
          "A situation where two departments disagree about a budget",
          "A situation where the profitable choice and the right choice seem to conflict",
          "A legal requirement to disclose financial statements",
          "A disagreement between a manager and an employee about hours"
        ],
        correctAnswer: 1,
        explanation: "The lesson defines an ethical dilemma as a situation where the profitable choice and the right choice seem to conflict."
      },
      {
        id: "mgmt8-q7",
        question: "According to the lesson, how much did the Volkswagen emissions scandal cost the company?",
        options: [
          "Over 5 billion dollars",
          "Over 33 billion dollars",
          "Over 400 million dollars",
          "Over 100 billion dollars"
        ],
        correctAnswer: 1,
        explanation: "The example states Volkswagen's short-term savings on emissions technology cost over 33 billion dollars in fines, buybacks, and legal settlements, with the stock dropping 40%."
      },
      {
        id: "mgmt8-q8",
        question: "According to the lesson, what does short-term thinking often lead businesses to do?",
        options: [
          "Invest heavily in employee training and long-term research",
          "Cut corners such as using cheaper materials or hiding product defects",
          "Overpay workers to boost morale in the short term",
          "Disclose every possible risk to customers immediately"
        ],
        correctAnswer: 1,
        explanation: "The lesson says short-term thinking often leads to cutting corners - using cheaper materials, underpaying workers, or hiding product defects - which creates reputational risk."
      },
      {
        id: "mgmt8-q9",
        question: "In the scenario, why did QuickMeals decide to keep the questionable supplier?",
        options: [
          "The supplier offered organic ingredients at a discount",
          "Switching would cost 400,000 dollars and delay deliveries by two weeks",
          "The law required them to continue the existing contract",
          "Customers had specifically requested that supplier"
        ],
        correctAnswer: 1,
        explanation: "The scenario states QuickMeals kept the supplier because switching would cost 400,000 dollars and delay deliveries by two weeks, choosing short-term cost savings."
      },
      {
        id: "mgmt8-q10",
        question: "According to the lesson, what does an ethical culture describe?",
        options: [
          "An organization where doing the right thing is the default behavior",
          "A company that follows only the minimum legal requirements",
          "A business focused solely on maximizing shareholder profit",
          "A workplace where all decisions are made by a single executive"
        ],
        correctAnswer: 0,
        explanation: "The lesson defines an ethical culture as organizations where doing the right thing is the default behavior, which helps attract talent and build customer loyalty."
      }
    ]
  }
]
