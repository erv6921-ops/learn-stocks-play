import { StructuredLessonContent } from "@/types"

// Wave-2 deepened content (Mortgages-depth rebuild) for: management + marketing + ethics
export const deepBizA: StructuredLessonContent[] = [
  // ─────────────────────────────────────────────
  // mgmt-1: What Managers Actually Do
  // ─────────────────────────────────────────────
  {
    lessonId: "mgmt-1",
    sections: [
      {
        type: "concept",
        title: "The Four Functions of Management",
        paragraphs: [
          "A manager's job isn't just bossing people around - it's turning goals into results through four connected functions: planning, organizing, leading, and controlling. Planning comes first: deciding what the team should achieve and how. Imagine a manager at a smoothie shop who sets a goal to sell 200 smoothies a day. Planning means figuring out the recipes, the hours, the staffing, and the marketing needed to hit that number. Without a plan, a team just reacts to whatever happens instead of aiming at something specific and measurable.",
          "Organizing turns the plan into structure. The manager decides who does what, arranges the equipment, and sets up the workflow. At the smoothie shop, that means assigning one worker to the blender station, another to the register, and ordering enough fruit for the week. Leading is the people part: motivating, guiding, and communicating so the team actually wants to hit the goal. A manager who explains why the target matters and encourages a tired crew on a busy afternoon is leading, not just supervising.",
          "Controlling is the feedback loop that most beginners forget. It means measuring actual results against the plan and adjusting. If the shop only sold 140 smoothies, the manager investigates: Was the line too slow? Did they run out of strawberries? Then they change the plan for tomorrow. These four functions repeat in a cycle - plan, organize, lead, control, then re-plan. Good managers move through all four instead of getting stuck barking orders (leading) while ignoring whether results actually improve (controlling)."
        ],
        bullets: [
          "Planning: setting clear goals and deciding how to reach them before acting.",
          "Organizing: arranging people, tasks, and resources to carry out the plan.",
          "Leading: motivating and guiding people so they want to hit the goal.",
          "Controlling: measuring real results against the plan and adjusting.",
          "The four functions repeat as a cycle, not a one-time checklist."
        ],
        realWorldExample: "A restaurant manager plans a Friday dinner rush (goal: seat 90 tables), organizes the schedule so enough cooks and servers show up, leads by pumping up the team before doors open, then controls by watching wait times and pulling a host onto the floor when the line grows."
      },
      {
        type: "concept",
        title: "Levels, Roles, and Efficiency vs. Effectiveness",
        paragraphs: [
          "Managers work at different levels, and the mix of functions shifts with each. Top managers (like a CEO) spend most of their time planning the big picture - which markets to enter, what the company stands for. Middle managers translate that vision into department goals. First-line managers (like a shift supervisor) spend most of their day leading and controlling the frontline workers who make the product or serve the customer. A shift lead at a store rarely sets company strategy, but they constantly organize schedules and coach staff.",
          "Beyond the four functions, managers play everyday roles. They act as figureheads and communicators, sharing information up and down the chain. They make decisions - allocating a limited budget, resolving a conflict between two employees, choosing which project gets priority. Much of management is really about handling scarce resources: there's never enough time, money, or people, so a manager constantly decides what matters most right now versus what can wait.",
          "Two words capture the goal: efficiency and effectiveness. Efficiency means doing things without wasting resources - getting the most output from the least input. Effectiveness means doing the right things - pursuing goals that actually matter. A manager can be efficient but ineffective (flawlessly producing a product nobody wants) or effective but inefficient (making a great product but burning way too much money). Strong managers aim for both: choosing the right goals and reaching them without waste. That balance is the heart of the job."
        ],
        bullets: [
          "Top managers focus on planning; first-line managers focus on leading and controlling.",
          "Managers act as communicators and decision-makers, not just supervisors.",
          "Management is largely about allocating scarce time, money, and people.",
          "Efficiency = doing things without waste; effectiveness = doing the right things.",
          "The best managers are both efficient and effective at the same time."
        ],
        realWorldExample: "A delivery company that plans the fastest routes (efficiency) but keeps delivering to a shrinking market is efficient yet ineffective. One that reaches every customer but wastes fuel and overtime is effective yet inefficient. The winner does both - right customers, lowest waste."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mgmt1-mc1",
            question: "A manager measures actual sales against the target and adjusts next week's plan. Which function is this?",
            options: [
              "Planning",
              "Organizing",
              "Leading",
              "Controlling"
            ],
            correctAnswer: 3,
            explanation: "Controlling is the feedback loop: comparing real results to the plan and making adjustments. Planning sets the goal; controlling checks whether it's being met."
          },
          {
            id: "mgmt1-mc2",
            question: "What is the difference between efficiency and effectiveness?",
            options: [
              "Efficiency is doing the right things; effectiveness is avoiding waste",
              "Efficiency is avoiding waste; effectiveness is doing the right things",
              "They mean exactly the same thing and are always fully interchangeable words",
              "Efficiency applies only to top managers and never to frontline supervisors at all"
            ],
            correctAnswer: 1,
            explanation: "Efficiency means getting output with the least waste of resources. Effectiveness means pursuing the right goals. Great managers do both at once."
          }
        ]
      },
      {
        type: "scenario",
        title: "Marcus Runs the Café Opening",
        narrative: "Marcus manages a new campus café. Opening week, he sets a goal of serving 300 drinks a day, builds a staff schedule, rallies his nervous team each morning, and tracks how many drinks actually go out. By Wednesday, sales lag at 210 and the line is too slow.",
        details: [
          "Setting the 300-drink target and mapping the week's staffing is his planning function.",
          "Assigning baristas to stations and ordering supplies is his organizing function.",
          "The morning pep talks that keep his anxious team motivated are his leading function.",
          "Tracking the 210 result and spotting the slow line so he can adjust is his controlling function."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mgmt1-aq1",
          question: "Marcus sees sales lag at 210 and the line moving slowly. Using the controlling function, what should he do next?",
          options: [
            "Ignore the numbers since it's only opening week",
            "Investigate the slow line and adjust tomorrow's plan",
            "Fire the slowest barista immediately without asking anyone what actually went wrong",
            "Raise the daily goal to 400 drinks even though today already fell far short"
          ],
          correctAnswer: 1,
          explanation: "Controlling means comparing results to the plan and adjusting. Marcus should find why the line is slow and change staffing or workflow - not ignore the data or react rashly."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Management is achieving goals through planning, organizing, leading, and controlling.",
          "The four functions form a repeating cycle, not a one-time list.",
          "Top managers plan most; first-line managers lead and control most.",
          "Managers constantly allocate scarce time, money, and people.",
          "Aim for both efficiency (no waste) and effectiveness (right goals)."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mgmt1-mastery1",
            question: "Which sequence lists the four functions of management in the usual order?",
            options: [
              "Leading, controlling, planning, organizing",
              "Planning, organizing, leading, controlling",
              "Organizing, leading, planning, controlling",
              "Controlling, planning, organizing, leading"
            ],
            correctAnswer: 1,
            explanation: "The classic order is planning, organizing, leading, controlling - set goals, arrange resources, guide people, then measure and adjust."
          },
          {
            id: "mgmt1-mastery2",
            question: "A supervisor assigns workers to stations and orders enough supplies for the shift. Which function is this?",
            options: [
              "Planning",
              "Controlling",
              "Organizing",
              "Leading"
            ],
            correctAnswer: 2,
            explanation: "Organizing arranges people, tasks, and resources to carry out the plan - exactly what assigning stations and ordering supplies does."
          },
          {
            id: "mgmt1-mastery3",
            question: "Which manager typically spends the MOST time on big-picture planning?",
            options: [
              "A shift supervisor who runs the daily floor and rarely touches strategy",
              "A top manager such as a CEO",
              "A frontline cashier scanning items and bagging groceries all day long",
              "A first-line team lead coaching a small crew on their hourly tasks"
            ],
            correctAnswer: 1,
            explanation: "Top managers focus on long-range planning and strategy, while first-line managers spend more time leading and controlling frontline work."
          },
          {
            id: "mgmt1-mastery4",
            question: "A factory flawlessly produces a gadget nobody wants to buy. This manager is…",
            options: [
              "Effective but not efficient",
              "Efficient but not effective",
              "Both efficient and effective",
              "Neither efficient nor effective"
            ],
            correctAnswer: 1,
            explanation: "Producing smoothly with little waste is efficient, but making the wrong product means the goal is wrong - so it is not effective."
          },
          {
            id: "mgmt1-mastery5",
            question: "Why is controlling described as a feedback loop?",
            options: [
              "It sets the original goals for the year and then never checks them again afterward",
              "It compares results to the plan and feeds adjustments back in",
              "It only motivates employees to work harder and has nothing to do with tracking any numbers",
              "It hires and fires staff members based purely on how the manager happens to feel that day"
            ],
            correctAnswer: 1,
            explanation: "Controlling measures actual results against the plan and loops that information back so the manager can adjust future plans."
          },
          {
            id: "mgmt1-mastery6",
            question: "A big part of a manager's job involves scarce resources. What does this mean?",
            options: [
              "Managers always have unlimited budgets and can spend whatever they want without any tradeoffs",
              "Managers decide how to use limited time, money, and people",
              "Managers avoid making any decisions and simply wait for problems to somehow solve themselves",
              "Managers only handle physical equipment like machines and never worry about people or schedules"
            ],
            correctAnswer: 1,
            explanation: "Time, money, and staff are always limited, so managers must constantly decide what to prioritize now versus later."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // mgmt-2: Leadership Styles
  // ─────────────────────────────────────────────
  {
    lessonId: "mgmt-2",
    sections: [
      {
        type: "concept",
        title: "Three Classic Leadership Styles",
        paragraphs: [
          "Leadership style is how a manager makes decisions and treats the people they lead. The three classic styles are autocratic, democratic, and laissez-faire. An autocratic leader makes decisions alone and simply tells the team what to do. Think of a head chef during a packed dinner rush shouting orders - there's no time for a vote. Autocratic leadership is fast and clear, which is why it shines in emergencies or with brand-new, untrained workers who need firm direction. Its weakness is that it can crush motivation and ignore good ideas from the team.",
          "A democratic (or participative) leader involves the team in decisions, asking for input before choosing. A store manager who gathers the staff to design a new customer-service approach is leading democratically. This style boosts buy-in and morale because people help shape the plan, and it often surfaces better ideas. The trade-off is speed: gathering input takes time, so democratic leadership is a poor fit when a decision must happen in seconds. It works best with skilled, engaged employees whose opinions genuinely add value.",
          "A laissez-faire leader (French for 'let it be') steps back and lets the team decide how to do the work, offering support only when asked. This hands-off style can be powerful with highly skilled, self-motivated experts - like a team of experienced designers who thrive on freedom. But it fails badly with people who need structure: without guidance, an inexperienced team can drift, miss deadlines, or feel abandoned. Laissez-faire is trust turned up high, which only pays off when the trust is earned."
        ],
        bullets: [
          "Autocratic: the leader decides alone and directs - fast, clear, but can hurt morale.",
          "Democratic: the leader seeks team input - strong buy-in, but slower.",
          "Laissez-faire: the leader steps back - great for experts, risky for beginners.",
          "No style is 'best'; each fits certain people and situations.",
          "Autocratic suits emergencies; democratic suits engaged teams; laissez-faire suits self-driven experts."
        ],
        realWorldExample: "A firefighting captain is autocratic at a blaze - no time to debate. Back at the station planning next year's training, the same captain turns democratic, asking the crew for ideas. Style shifts with the situation, even for one leader."
      },
      {
        type: "concept",
        title: "Matching Style to the Situation",
        paragraphs: [
          "The big lesson is that great leaders adapt. This idea is called situational leadership: the right style depends on the task, the deadline, and how skilled and motivated the team is. A crisis with untrained staff calls for autocratic direction. A creative project with experienced pros calls for a lighter touch. The mistake beginners make is picking one favorite style and using it everywhere - like being hands-off with a brand-new employee who is quietly panicking without guidance.",
          "Two other concepts help. Transactional leadership motivates through clear rewards and consequences - hit the sales target, get a bonus; miss it, face a review. It keeps routine work on track. Transformational leadership inspires people with a bigger vision, pushing them to grow beyond what's expected. A manager who convinces a team that their small startup can change an industry is leading transformationally. Most effective leaders blend both: clear expectations plus a mission worth caring about.",
          "Leadership also isn't the same as authority. You can have a fancy title and still fail to lead if no one trusts or follows you. Real leadership rests on credibility, communication, and treating people fairly. A team lead with no official power can still be the person everyone actually listens to. That's why understanding styles matters: choosing the right approach for the moment - and earning trust - turns a manager from someone who merely gives orders into someone people genuinely want to follow."
        ],
        bullets: [
          "Situational leadership: adapt your style to the task, deadline, and team's skill.",
          "Transactional leadership motivates with rewards and consequences.",
          "Transformational leadership inspires people with a bigger vision.",
          "Effective leaders often blend clear expectations with an inspiring mission.",
          "A title grants authority, but trust and credibility create real leadership."
        ],
        realWorldExample: "A new manager uses autocratic direction to train raw recruits, shifts to democratic once they gain skill, and finally goes laissez-faire when the team becomes expert - matching style to how much the team has grown."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mgmt2-mc1",
            question: "Which leadership style involves the leader making decisions alone and directing the team?",
            options: [
              "Democratic",
              "Autocratic",
              "Laissez-faire",
              "Transformational"
            ],
            correctAnswer: 1,
            explanation: "Autocratic leaders decide alone and give orders. It's fast and clear, ideal in emergencies, but can hurt morale if overused."
          },
          {
            id: "mgmt2-mc2",
            question: "When is a laissez-faire (hands-off) style MOST likely to work well?",
            options: [
              "With brand-new, untrained employees",
              "During a sudden emergency",
              "With skilled, self-motivated experts",
              "When decisions must be made in seconds"
            ],
            correctAnswer: 2,
            explanation: "Laissez-faire relies on the team to self-direct, so it thrives with experienced, motivated experts and fails with beginners who need structure."
          }
        ]
      },
      {
        type: "scenario",
        title: "Leah Leads Two Very Different Teams",
        narrative: "Leah manages both a fast-food kitchen during rush hour and a small team of veteran graphic designers. She notices that the leadership approach that works in one setting flops in the other, so she deliberately changes how she leads each group.",
        details: [
          "During the lunch rush with new hires, Leah gives direct orders and quick corrections (autocratic).",
          "When planning next month's menu with her experienced crew, she asks for their input (democratic).",
          "With her veteran designers, she sets the goal, then steps back and lets them work (laissez-faire).",
          "She adapts her style to each team's skill and the urgency of the task (situational leadership)."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mgmt2-aq1",
          question: "Why does Leah use a hands-off style with her veteran designers but a directive style with new hires during rush hour?",
          options: [
            "She likes the designers more than the new hires",
            "The right style depends on skill level and urgency",
            "Hands-off leadership is always superior no matter who is on the team",
            "New hires never deserve any input and should simply be left alone"
          ],
          correctAnswer: 1,
          explanation: "This is situational leadership: skilled, self-driven experts thrive with freedom, while untrained staff in a time-crunch need clear direction. The style fits the situation, not favoritism."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Autocratic leaders decide alone; great for emergencies and untrained staff.",
          "Democratic leaders seek input; strong morale and buy-in, but slower.",
          "Laissez-faire leaders step back; ideal for self-driven experts, risky for beginners.",
          "Situational leadership means adapting your style to task, deadline, and team skill.",
          "Real leadership comes from trust and credibility, not just a title."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mgmt2-mastery1",
            question: "A store manager gathers staff to co-design a new service policy before deciding. Which style is this?",
            options: [
              "Autocratic",
              "Democratic",
              "Laissez-faire",
              "Transactional"
            ],
            correctAnswer: 1,
            explanation: "Seeking team input before deciding is democratic (participative) leadership, which builds buy-in and often surfaces better ideas."
          },
          {
            id: "mgmt2-mastery2",
            question: "What is the main drawback of the democratic leadership style?",
            options: [
              "It gives workers no voice at all and that always makes teams more productive",
              "It can be slow when speed is critical",
              "It only works in emergencies and completely fails every single other time",
              "It always lowers team morale instantly for absolutely everyone on the crew"
            ],
            correctAnswer: 1,
            explanation: "Gathering input takes time, so democratic leadership is a poor fit when a decision must be made in seconds. Its strength is buy-in, not speed."
          },
          {
            id: "mgmt2-mastery3",
            question: "Transformational leadership primarily motivates people by…",
            options: [
              "Offering an inspiring vision to grow toward",
              "Giving cash bonuses for every single task, no matter how small the task is",
              "Threatening punishment for mistakes so people stay afraid to try anything new at all",
              "Removing all rules and structure so nobody ever knows what they are supposed to do"
            ],
            correctAnswer: 0,
            explanation: "Transformational leaders inspire with a bigger mission and push people to grow. Reward-and-consequence motivation describes transactional leadership."
          },
          {
            id: "mgmt2-mastery4",
            question: "Which situation best fits an autocratic style?",
            options: [
              "A relaxed brainstorm with senior experts",
              "A sudden emergency with untrained staff",
              "A long-term project needing team buy-in",
              "A self-directed team of specialists who already know exactly what to do"
            ],
            correctAnswer: 1,
            explanation: "Autocratic leadership is fast and clear, which fits emergencies and untrained workers who need firm, immediate direction."
          },
          {
            id: "mgmt2-mastery5",
            question: "What does 'situational leadership' mean?",
            options: [
              "Always using the autocratic style because giving orders is the only thing that ever works",
              "Adapting your style to the task and team",
              "Never changing how you lead even when the situation clearly calls for something different",
              "Leading only during a crisis and simply disappearing whenever everything is running smoothly"
            ],
            correctAnswer: 1,
            explanation: "Situational leadership means matching your approach to the task, deadline, and the team's skill and motivation rather than sticking to one style."
          },
          {
            id: "mgmt2-mastery6",
            question: "Why can someone with a big title still fail to truly lead?",
            options: [
              "Titles automatically create followers the very moment they are printed on a badge",
              "Real leadership needs trust and credibility",
              "Authority always equals leadership even when nobody actually respects the person in charge",
              "Leadership requires no communication and works fine in total silence with no explanation"
            ],
            correctAnswer: 1,
            explanation: "Authority comes from a title, but leadership rests on trust, fairness, and communication. Without those, people won't genuinely follow."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // mgmt-3: Organizational Structure
  // ─────────────────────────────────────────────
  {
    lessonId: "mgmt-3",
    sections: [
      {
        type: "concept",
        title: "How Companies Arrange People",
        paragraphs: [
          "An organizational structure is the way a company arranges its people, roles, and reporting relationships - basically, who answers to whom. This is shown on an org chart, a diagram with the top leader at the top and lines running down to teams below. The chain of command is the path authority follows: a cashier reports to a shift lead, who reports to a store manager, who reports to a regional director. A clear chain of command tells everyone who makes decisions and who to go to with a problem, preventing chaos where no one knows who's in charge.",
          "A key concept is span of control: how many people report directly to one manager. A narrow span means each manager oversees just a few people (say, 3), giving close supervision but requiring many managers. A wide span means one manager oversees many people (say, 15), which is cheaper and pushes independence but can overwhelm the manager. A café owner watching over 4 baristas has a narrow span; a warehouse supervisor overseeing 20 packers has a wide one.",
          "Structures also split into flat versus hierarchical (tall). A hierarchical structure has many layers between the top boss and the frontline worker - lots of middle managers. A flat structure has few layers, so frontline workers are closer to the top. Picture a message traveling from CEO to worker: in a tall company it passes through six levels; in a flat one, maybe two. Tall structures give clear career ladders and tight control; flat structures move information fast and cut management costs, but leave each manager with more people to handle."
        ],
        bullets: [
          "An org chart shows roles and reporting lines - who answers to whom.",
          "Chain of command is the path authority follows from top to bottom.",
          "Span of control = how many people report directly to one manager.",
          "Narrow span = close supervision but many managers; wide span = cheaper but stretched.",
          "Hierarchical (tall) = many layers; flat = few layers and faster communication."
        ],
        realWorldExample: "A startup of 12 people is flat: everyone talks directly to the founder, so decisions happen in minutes. As it grows to 500 employees, it adds layers of managers - becoming more hierarchical - so no single person has to oversee dozens of workers."
      },
      {
        type: "concept",
        title: "Trade-offs, Departments, and Centralization",
        paragraphs: [
          "Every structure is a trade-off. Tall, hierarchical companies offer clear promotion paths and close oversight, but decisions crawl through many layers, and by the time information reaches the top it can be distorted. Flat companies react quickly and cost less in management salaries, but managers can burn out overseeing too many people, and workers may get less coaching. There is no perfect structure - the right one depends on the company's size, industry, and how fast it needs to move. A hospital needs tight hierarchy for safety; a design studio may thrive flat and loose.",
          "Companies also group work into departments, a choice called departmentalization. They might organize by function (marketing, finance, operations), by product (phones division, laptops division), by geography (North America, Europe, Asia), or by customer type (business clients vs. consumers). Each grouping has strengths: functional structures build deep expertise, while product or geographic ones stay closer to specific markets. Big companies often mix these - a matrix structure - where an employee reports to both a functional boss and a project boss at once.",
          "Finally, structure reflects where decisions get made. In a centralized company, most big decisions come from the top, ensuring consistency but slowing the front lines. In a decentralized company, authority is pushed down so local managers decide quickly, which empowers people and speeds response but can create inconsistency between locations. A fast-food chain that dictates every recipe from headquarters is centralized; one that lets regional managers set local menus is decentralized. Choosing the structure is one of a leader's most important - and hardest - decisions."
        ],
        bullets: [
          "Tall structures give clear ladders and control but slow, distortable communication.",
          "Flat structures move fast and cost less but can overload managers.",
          "Departmentalization groups work by function, product, geography, or customer.",
          "A matrix structure has employees report to two bosses (e.g., function and project).",
          "Centralized = decisions at the top; decentralized = authority pushed down for speed."
        ],
        realWorldExample: "A national coffee chain that decides every drink recipe at headquarters is centralized and consistent everywhere. A rival that lets each city's manager add local drinks is decentralized - faster to match local taste, but its menu varies from town to town."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mgmt3-mc1",
            question: "What does 'span of control' measure?",
            options: [
              "The company's total yearly revenue added up across every single store location",
              "How many people report directly to one manager",
              "The number of products a company sells in a typical busy holiday season",
              "How tall the office building is measured in floors from the ground up"
            ],
            correctAnswer: 1,
            explanation: "Span of control is the number of employees reporting directly to a single manager. Narrow spans mean close supervision; wide spans mean fewer managers."
          },
          {
            id: "mgmt3-mc2",
            question: "A flat organizational structure is best described as one that…",
            options: [
              "Has many layers of middle managers stacked between the boss and the workers",
              "Has few layers between top and frontline",
              "Never uses an org chart of any kind and refuses to write one down",
              "Only exists in factories and can never be found in an office setting"
            ],
            correctAnswer: 1,
            explanation: "A flat structure has few management layers, so frontline workers are close to the top and information travels fast."
          }
        ]
      },
      {
        type: "scenario",
        title: "GreenLeaf Grows Up",
        narrative: "GreenLeaf, a plant-delivery startup, began with 10 people all reporting straight to the founder. Now it has 300 employees across three cities, and the founder can no longer oversee everyone directly. The leadership team must redesign the structure to keep things running smoothly.",
        details: [
          "Early on, GreenLeaf was flat - everyone reported to the founder, and decisions were instant.",
          "With 300 staff, one person overseeing all of them would create an impossibly wide span of control.",
          "They add layers of managers and group teams by city (geographic departmentalization).",
          "They must also decide whether headquarters sets all rules (centralized) or city managers do (decentralized)."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mgmt3-aq1",
          question: "As GreenLeaf grows to 300 people, why must it add management layers instead of staying flat?",
          options: [
            "Flat structures are illegal for big companies",
            "One manager can't effectively oversee 300 people",
            "Adding layers always increases profit no matter how the team is doing",
            "Customers demand a taller org chart before they will agree to buy anything"
          ],
          correctAnswer: 1,
          explanation: "A single manager overseeing 300 people would have an unmanageable span of control. Adding layers keeps each manager's span reasonable so people get proper supervision."
        }
      },
      {
        type: "recap",
        takeaways: [
          "An org chart maps reporting lines; the chain of command shows who has authority.",
          "Span of control is how many people report to one manager - narrow vs. wide.",
          "Tall structures give control and clear ladders; flat ones move fast and cost less.",
          "Companies departmentalize by function, product, geography, or customer.",
          "Centralized keeps decisions at the top; decentralized pushes them down for speed."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mgmt3-mastery1",
            question: "The path that authority follows from the top of a company to the frontline is called the…",
            options: [
              "Span of control",
              "Chain of command",
              "Profit margin per unit sold",
              "Product line for the season"
            ],
            correctAnswer: 1,
            explanation: "The chain of command is the reporting path from top leadership down to frontline workers, showing who answers to whom."
          },
          {
            id: "mgmt3-mastery2",
            question: "A manager oversees 18 workers directly. This is an example of a…",
            options: [
              "Narrow span of control",
              "Wide span of control",
              "Centralized decision at headquarters",
              "Matrix department reporting structure"
            ],
            correctAnswer: 1,
            explanation: "Overseeing many people directly is a wide span of control - cheaper with fewer managers, but each manager is stretched thin."
          },
          {
            id: "mgmt3-mastery3",
            question: "What is a key advantage of a flat organizational structure?",
            options: [
              "Very close supervision of each worker",
              "Faster communication and lower management costs",
              "Many clear promotion levels stacked one above the next",
              "Managers each oversee only two people"
            ],
            correctAnswer: 1,
            explanation: "Flat structures have few layers, so information moves quickly and the company spends less on middle-management salaries."
          },
          {
            id: "mgmt3-mastery4",
            question: "Grouping a company into 'North America,' 'Europe,' and 'Asia' divisions is departmentalization by…",
            options: [
              "Function",
              "Product",
              "Geography",
              "Customer type"
            ],
            correctAnswer: 2,
            explanation: "Splitting the company by region is geographic departmentalization, which keeps each division close to its local market."
          },
          {
            id: "mgmt3-mastery5",
            question: "In a decentralized company, decisions are mainly made…",
            options: [
              "Only by the CEO at the top",
              "By local managers closer to the action",
              "By an outside consulting firm hired to run the whole company",
              "By customers themselves voting on every operational choice each day"
            ],
            correctAnswer: 1,
            explanation: "Decentralization pushes authority down to local managers, speeding decisions and empowering the front lines, though it can create inconsistency."
          },
          {
            id: "mgmt3-mastery6",
            question: "What is a matrix structure?",
            options: [
              "A company with no managers at all where every worker is fully on their own",
              "One where employees report to two bosses at once",
              "A structure used only by governments and never once seen in private businesses",
              "A chart with a single straight line running from the top down to one worker"
            ],
            correctAnswer: 1,
            explanation: "In a matrix structure, an employee reports to two bosses - often a functional manager and a project manager - to balance expertise with project focus."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // mgmt-4: SWOT Analysis
  // ─────────────────────────────────────────────
  {
    lessonId: "mgmt-4",
    sections: [
      {
        type: "concept",
        title: "The Four Boxes of SWOT",
        paragraphs: [
          "SWOT analysis is a simple grid businesses use to size up a decision before making it. The letters stand for Strengths, Weaknesses, Opportunities, and Threats. The trick that trips up beginners is that two of these are internal (inside the company's control) and two are external (out in the world). Strengths and Weaknesses are internal - things about the business itself. Opportunities and Threats are external - things in the market, economy, or competition. Sorting a factor into the right box is half the skill.",
          "Strengths are internal advantages: a loyal customer base, a skilled team, a strong brand, low costs, or a great location. Weaknesses are internal disadvantages: high prices, thin cash reserves, an outdated website, or too few staff. Imagine a teen's dog-walking business. A strength might be that neighbors already know and trust them. A weakness might be that they can only work weekends because of school. Both come from inside the business - they're about what the business is and has.",
          "Opportunities are external trends the business could ride: a new neighborhood full of dog owners moving in, a rival closing down, or a rising interest in pet care. Threats are external dangers: a new competitor, rising supply costs, bad weather, or a change in the law. The key test: if you can change it by changing your own business, it's internal (S or W). If it comes from the outside world, it's external (O or T). A competitor's arrival is a threat; your own limited hours is a weakness."
        ],
        bullets: [
          "SWOT = Strengths, Weaknesses, Opportunities, Threats.",
          "Strengths and Weaknesses are INTERNAL - about the business itself.",
          "Opportunities and Threats are EXTERNAL - about the market and world.",
          "Test: can you change it by changing your business? Then it's internal.",
          "A competitor arriving is a threat; your own high prices are a weakness."
        ],
        realWorldExample: "A local bakery lists strengths (famous cinnamon rolls, loyal regulars), weaknesses (tiny kitchen, no delivery), opportunities (a new office park hiring hundreds of workers nearby), and threats (a national chain opening two blocks away). Four boxes, one clear picture."
      },
      {
        type: "concept",
        title: "Turning the Grid Into Action",
        paragraphs: [
          "A SWOT chart is useless if it just sits on a page. The real value comes from acting on it. The classic moves are: use your strengths to grab opportunities, and shore up your weaknesses so threats can't hurt you. The bakery could use its famous cinnamon rolls (strength) to win over the new office park (opportunity) with a morning delivery deal. It could fix its lack of delivery (weakness) before the national chain (threat) steals customers who want convenience. SWOT points you toward specific decisions, not just a tidy list.",
          "Good SWOT analysis is honest and specific. Vague entries like 'good service' help no one; 'fastest sandwich in town, under 3 minutes' is something you can build a strategy on. Beginners tend to inflate strengths and hide weaknesses, which makes the whole exercise worthless - you can't fix a weakness you refuse to admit. It also helps to prioritize: not every threat is equally scary, and not every opportunity is worth chasing. Focus on the few factors that could truly make or break the decision.",
          "SWOT works for almost any choice: launching a product, entering a new market, or even a student picking a career. It's often paired with other tools - like Porter's Five Forces for competition or PESTEL for big-picture trends - because SWOT alone doesn't tell you why a threat exists or how strong a rival is. Think of SWOT as the fast, flexible first step: it organizes what you know, exposes blind spots, and turns a messy situation into four clear, comparable buckets you can actually act on."
        ],
        bullets: [
          "Act on SWOT: use strengths to seize opportunities; fix weaknesses to blunt threats.",
          "Be specific and honest - vague or inflated entries make SWOT useless.",
          "Prioritize the few factors that truly make or break the decision.",
          "SWOT fits products, markets, and even personal career choices.",
          "SWOT pairs with tools like Porter's Five Forces and PESTEL for depth."
        ],
        realWorldExample: "A phone maker's SWOT shows a strength (loyal fans), a weakness (high prices), an opportunity (5G rollout), and a threat (cheaper rivals). Its move: use loyal fans and 5G to justify the price, while cutting costs on one budget model to fight the cheaper rivals."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mgmt4-mc1",
            question: "In SWOT analysis, which two categories are INTERNAL to the business?",
            options: [
              "Opportunities and Threats",
              "Strengths and Weaknesses",
              "Strengths and Opportunities",
              "Weaknesses and Threats"
            ],
            correctAnswer: 1,
            explanation: "Strengths and Weaknesses are internal - about the business itself. Opportunities and Threats are external - about the market and wider world."
          },
          {
            id: "mgmt4-mc2",
            question: "A new competitor opening nearby would go in which SWOT box?",
            options: [
              "Strength",
              "Weakness",
              "Opportunity",
              "Threat"
            ],
            correctAnswer: 3,
            explanation: "A competitor is an external danger the business can't directly control, so it's a Threat, not an internal Weakness."
          }
        ]
      },
      {
        type: "scenario",
        title: "Tanya's Food Truck Decision",
        narrative: "Tanya runs a popular taco truck and is deciding whether to open a second location downtown. She writes a SWOT analysis to think it through clearly before committing her savings to the expansion.",
        details: [
          "Strength: her tacos have a loyal following and a five-star reputation online.",
          "Weakness: she has limited savings and can't afford to hire much extra staff.",
          "Opportunity: a new downtown office complex just opened with thousands of hungry workers.",
          "Threat: two established restaurants already serve lunch in that same downtown area."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mgmt4-aq1",
          question: "Which move best uses Tanya's SWOT - pairing a strength with an opportunity?",
          options: [
            "Close the truck because rivals exist, since any competition at all means certain failure",
            "Use her five-star reputation to attract the new office workers",
            "Raise prices to cover her limited savings, hoping fewer customers will somehow bring more money",
            "Ignore the downtown market entirely even though those new office workers are her ideal buyers"
          ],
          correctAnswer: 1,
          explanation: "The classic SWOT move is using a strength (her stellar reputation) to seize an opportunity (thousands of new downtown workers). That turns the analysis into action."
        }
      },
      {
        type: "recap",
        takeaways: [
          "SWOT = Strengths, Weaknesses, Opportunities, Threats.",
          "Strengths and Weaknesses are internal; Opportunities and Threats are external.",
          "Test each factor: can you change it internally, or does it come from outside?",
          "Act on it: use strengths for opportunities and fix weaknesses against threats.",
          "Keep entries specific and honest, and pair SWOT with tools like Five Forces."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mgmt4-mastery1",
            question: "What do the letters in SWOT stand for?",
            options: [
              "Sales, Workers, Output, Targets",
              "Strengths, Weaknesses, Opportunities, Threats",
              "Strategy, Warnings, Options, Trends",
              "Systems, Wins, Obstacles, Timing"
            ],
            correctAnswer: 1,
            explanation: "SWOT stands for Strengths, Weaknesses, Opportunities, and Threats - the four boxes of the analysis."
          },
          {
            id: "mgmt4-mastery2",
            question: "A company's outdated website that turns away customers is best listed as a…",
            options: [
              "Strength",
              "Weakness",
              "Opportunity",
              "Threat"
            ],
            correctAnswer: 1,
            explanation: "An outdated website is an internal disadvantage the company can fix, so it's a Weakness rather than an external Threat."
          },
          {
            id: "mgmt4-mastery3",
            question: "A rising public interest in eco-friendly products would be a(n)…",
            options: [
              "Opportunity",
              "Weakness",
              "Strength",
              "Internal control"
            ],
            correctAnswer: 0,
            explanation: "A helpful external trend the business could ride is an Opportunity. It comes from the outside market, not from inside the company."
          },
          {
            id: "mgmt4-mastery4",
            question: "Which quick test tells you a factor is INTERNAL?",
            options: [
              "It appears in the news often and that is the only reason it ever matters",
              "You can change it by changing your business",
              "It involves the government stepping in to run each private company directly",
              "It affects the whole industry but somehow never touches any single business inside it"
            ],
            correctAnswer: 1,
            explanation: "If you can alter a factor by changing your own business, it's internal (a Strength or Weakness). External factors come from the outside world."
          },
          {
            id: "mgmt4-mastery5",
            question: "What is the classic strategic move that a SWOT points toward?",
            options: [
              "Hide weaknesses and ignore threats",
              "Use strengths to seize opportunities",
              "List factors but never act on them",
              "Treat every threat as equally urgent"
            ],
            correctAnswer: 1,
            explanation: "A core SWOT move is using your strengths to grab opportunities while shoring up weaknesses so threats can't hurt you."
          },
          {
            id: "mgmt4-mastery6",
            question: "Why should SWOT entries be specific rather than vague?",
            options: [
              "Vague entries look more professional and always impress investors far more than details",
              "Specific entries lead to real, actionable strategy",
              "Specific entries are required by law and skipping them can land a founder in court",
              "Vague entries score higher on tests because graders prefer answers with no real detail"
            ],
            correctAnswer: 1,
            explanation: "Specific, honest entries let you build a real strategy. Vague or inflated ones make the analysis useless because you can't act on them."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // mgmt-5: Porter's Five Forces
  // ─────────────────────────────────────────────
  {
    lessonId: "mgmt-5",
    sections: [
      {
        type: "concept",
        title: "Why Some Industries Print Money and Others Struggle",
        paragraphs: [
          "Porter's Five Forces is a framework created by economist Michael Porter to judge how attractive - meaning how profitable - an industry is. The big idea: your profits aren't just about how good your product is; they're shaped by five competitive pressures squeezing your industry. When all five forces are strong, everyone in that industry fights hard and margins stay thin. When they're weak, businesses can charge more and keep more profit. Understanding the forces tells you whether an industry is a goldmine or a trap before you enter it.",
          "The first force is the threat of new entrants - how easily new competitors can jump in. If starting a business in your industry is cheap and easy (like a lawn-mowing service), new rivals flood in and drive prices down. High barriers to entry (huge startup costs, patents, strict licenses) keep newcomers out and protect existing profits. The second force is the bargaining power of suppliers. If only one company sells a crucial part you need, that supplier can raise prices and squeeze you. If many suppliers compete for your business, you hold the power instead.",
          "The third force is the bargaining power of buyers - your customers. When buyers are few, large, or can easily switch to a rival, they demand lower prices and better terms. A tiny supplier selling to one giant retailer has almost no power. The fourth force is the threat of substitutes: different products that solve the same need. Streaming services are a substitute for movie theaters; video calls substitute for airline business travel. The more good substitutes exist, the harder it is to raise prices without losing customers to a totally different option."
        ],
        bullets: [
          "Five Forces measures how profitable (attractive) an industry is, not just one company.",
          "Threat of new entrants: low barriers mean rivals flood in and cut prices.",
          "Supplier power: few suppliers of a key input can raise your costs.",
          "Buyer power: few or large customers can demand lower prices.",
          "Threat of substitutes: other products solving the same need cap your prices."
        ],
        realWorldExample: "Opening a coffee cart has low barriers, cheap suppliers, picky customers, and many substitutes (energy drinks, home brewing) - a tough, low-margin industry. A patented life-saving drug has huge barriers and few substitutes - which is why its maker can charge a fortune."
      },
      {
        type: "concept",
        title: "The Fifth Force and Using the Framework",
        paragraphs: [
          "The fifth force is competitive rivalry - how fiercely existing companies fight each other. When many similar firms battle over the same customers, they slash prices, pour money into advertising, and profits shrink for everyone. Think of the airline industry: intense rivalry means constant fare wars and thin margins. When rivalry is gentle - few competitors, or each with a distinct niche - companies can keep prices healthy. This fifth force sits at the center; the other four all feed into how brutal the rivalry becomes.",
          "Put together, the Five Forces let you diagnose an industry. A dream industry has weak forces: high barriers to entry, weak suppliers and buyers, few substitutes, and mild rivalry - so profits flow easily. A nightmare industry has strong forces on every side, grinding margins to almost nothing. Most real industries sit in between. A smart manager doesn't just accept the forces; they look for ways to weaken the ones hurting them - like locking in cheap suppliers, building a brand so buyers won't switch, or finding a niche to dodge rivalry.",
          "The framework guides real strategy. If buyer power is the problem, a company might differentiate its product so customers can't easily switch. If new entrants threaten, it might build barriers - patents, brand loyalty, or scale that newcomers can't match. If substitutes loom, it innovates to stay ahead. Five Forces pairs naturally with SWOT: SWOT lists your situation, while Five Forces explains the deeper competitive 'why' behind your threats and opportunities. Together they turn a gut feeling about an industry into a clear, defensible strategy."
        ],
        bullets: [
          "Competitive rivalry: many similar firms fighting means price wars and thin profit.",
          "Weak forces = attractive, high-profit industry; strong forces = brutal, low-profit one.",
          "Smart managers act to weaken the forces hurting them.",
          "Differentiation fights buyer power; barriers fight new entrants; innovation fights substitutes.",
          "Five Forces explains the 'why' behind the threats a SWOT lists."
        ],
        realWorldExample: "Streaming exploded because it was a strong substitute that gutted cable TV and DVD rentals. Cable companies, facing that substitute plus fierce rivalry, had to slash prices and bundle services - a textbook example of the forces reshaping an entire industry."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mgmt5-mc1",
            question: "What does Porter's Five Forces framework primarily assess?",
            options: [
              "One company's employee morale measured by a survey handed out each spring",
              "How profitable and competitive an industry is",
              "A company's yearly tax bill owed to the government at the end of the year",
              "The personality of a CEO and how friendly they seem in public interviews"
            ],
            correctAnswer: 1,
            explanation: "Five Forces evaluates an industry's attractiveness - how the five competitive pressures shape the profits available to firms in it."
          },
          {
            id: "mgmt5-mc2",
            question: "Streaming services replacing movie theaters is an example of which force?",
            options: [
              "Threat of substitutes",
              "Bargaining power of suppliers",
              "Threat of new entrants",
              "Bargaining power of buyers"
            ],
            correctAnswer: 0,
            explanation: "A substitute is a different product that meets the same need. Streaming substitutes for theaters, capping what theaters can charge."
          }
        ]
      },
      {
        type: "scenario",
        title: "Devin Eyes the Meal-Kit Business",
        narrative: "Devin wants to launch a meal-kit delivery startup. Before investing, he runs a Porter's Five Forces analysis to see whether the industry is worth entering or already too brutal to profit in.",
        details: [
          "New entrants: startup costs are moderate, so new meal-kit companies keep appearing - a strong force.",
          "Suppliers: many farms and food wholesalers compete, so supplier power is weak - good for Devin.",
          "Buyers: customers can cancel anytime and switch to rivals easily - strong buyer power.",
          "Rivalry: several established meal-kit brands already fight over the same customers - intense rivalry."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mgmt5-aq1",
          question: "Given strong buyer power and intense rivalry, what strategy best fits Devin's meal-kit startup?",
          options: [
            "Copy competitors exactly to blend in, since looking identical to rivals keeps customers loyal",
            "Differentiate with a unique niche customers won't leave",
            "Ignore competitors and hope for the best while they quietly take away all the customers",
            "Raise prices well above every rival immediately and trust shoppers to pay more for the same thing"
          ],
          correctAnswer: 1,
          explanation: "When buyers can switch easily and rivalry is fierce, differentiation - a distinct niche customers value - reduces buyer power and helps Devin stand out instead of competing on price alone."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Five Forces gauges how profitable an industry is, not just one firm.",
          "The forces: new entrants, supplier power, buyer power, substitutes, and rivalry.",
          "Weak forces make an attractive industry; strong forces crush margins.",
          "Managers can act to weaken forces - via barriers, differentiation, or innovation.",
          "Five Forces explains the competitive 'why' behind a SWOT's threats."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mgmt5-mastery1",
            question: "Which of these is one of Porter's Five Forces?",
            options: [
              "Bargaining power of suppliers",
              "The company's office layout",
              "The CEO's salary level",
              "The color of the logo"
            ],
            correctAnswer: 0,
            explanation: "Supplier bargaining power is one of the five forces, alongside new entrants, buyer power, substitutes, and rivalry."
          },
          {
            id: "mgmt5-mastery2",
            question: "High barriers to entry in an industry generally lead to…",
            options: [
              "More new rivals every year",
              "Better protection for existing profits",
              "Weaker brands overall across the whole crowded market",
              "Instant price wars that crush everyone's profits fast"
            ],
            correctAnswer: 1,
            explanation: "High barriers (big costs, patents, licenses) keep newcomers out, protecting the profits of firms already in the industry."
          },
          {
            id: "mgmt5-mastery3",
            question: "A supplier is the ONLY source of a critical part. This gives the supplier…",
            options: [
              "Weak bargaining power",
              "Strong bargaining power",
              "No effect on the industry",
              "Lower prices for buyers"
            ],
            correctAnswer: 1,
            explanation: "When only one supplier provides an essential input, it holds strong bargaining power and can raise prices, squeezing the buyer."
          },
          {
            id: "mgmt5-mastery4",
            question: "Intense competitive rivalry in an industry usually causes…",
            options: [
              "Higher profits for everyone selling in that same crowded space",
              "Price wars and thinner margins",
              "Fewer advertisements running across the whole industry each year",
              "Guaranteed monopolies handed to whichever rival shows up first"
            ],
            correctAnswer: 1,
            explanation: "Many firms fighting for the same customers triggers price cuts and heavy ad spending, shrinking profits across the industry."
          },
          {
            id: "mgmt5-mastery5",
            question: "Which industry conditions make an industry MOST attractive to enter?",
            options: [
              "All five forces are strong",
              "Weak forces across the board",
              "Many substitutes and low barriers",
              "Powerful buyers and fierce rivalry"
            ],
            correctAnswer: 1,
            explanation: "Weak forces - high barriers, weak suppliers and buyers, few substitutes, mild rivalry - leave more profit available, making an industry attractive."
          },
          {
            id: "mgmt5-mastery6",
            question: "If buyer power is hurting a company, a good strategic response is to…",
            options: [
              "Make the product identical to rivals",
              "Differentiate so customers won't switch",
              "Cut quality to save money",
              "Stop advertising completely and hope buyers still remember you"
            ],
            correctAnswer: 1,
            explanation: "Differentiating the product makes it harder for buyers to switch to a rival, which reduces their bargaining power over the company."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // mgmt-6: KPIs & Measuring Performance
  // ─────────────────────────────────────────────
  {
    lessonId: "mgmt-6",
    sections: [
      {
        type: "concept",
        title: "What Gets Measured Gets Managed",
        paragraphs: [
          "A KPI - Key Performance Indicator - is a specific number a business tracks to see whether it's hitting its goals. The word 'key' matters: a company could measure a thousand things, but KPIs are the handful that truly reveal whether it's winning. If your goal is growing an online store, a KPI might be 'monthly sales' or 'number of repeat customers.' Tracking the right numbers turns fuzzy hopes ('let's do better') into clear targets ('grow monthly sales from $10,000 to $15,000') that a team can actually chase and measure.",
          "Good KPIs follow the SMART rule: Specific, Measurable, Achievable, Relevant, and Time-bound. 'Get more customers' is a weak goal - it's vague and has no deadline. 'Gain 200 new customers by June' is SMART: you know exactly what success looks like and when. A KPI must be measurable with real data, not a gut feeling. It should also be relevant - tied to what actually matters. Tracking your Instagram likes might feel good, but if likes don't lead to sales, they're a 'vanity metric,' not a true KPI.",
          "KPIs come in two flavors that smart managers balance. Leading indicators predict the future - like the number of sales calls made this week, which hints at sales next month. Lagging indicators report the past - like last quarter's revenue, which is done and can't be changed. Leading indicators let you steer before it's too late; lagging indicators confirm results. A team watching only lagging numbers is like driving while staring in the rearview mirror. The best dashboards mix both so managers can react early and confirm later."
        ],
        bullets: [
          "A KPI is a key number that shows whether a business is hitting its goals.",
          "SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound.",
          "Vanity metrics (like likes) feel good but don't drive real results.",
          "Leading indicators predict the future; lagging indicators report the past.",
          "Great dashboards mix leading and lagging indicators to steer and confirm."
        ],
        realWorldExample: "A pizza shop's KPIs might be average delivery time (leading - fast delivery keeps customers), repeat-order rate, and monthly revenue (lagging). Watching delivery time lets the manager fix slowness this week, before it shows up as lost sales next month."
      },
      {
        type: "concept",
        title: "Choosing and Using the Right KPIs",
        paragraphs: [
          "Different goals demand different KPIs, so businesses pick metrics that match what they're trying to achieve. A marketing team tracks customer acquisition cost (what it costs to win one customer) and conversion rate (the share of visitors who buy). A subscription app watches churn rate (the percentage of customers who cancel) because keeping customers is cheaper than finding new ones. A factory tracks defect rate and output per hour. The point is to choose a few KPIs tied tightly to the specific goal, not to drown the team in dozens of numbers nobody acts on.",
          "KPIs connect straight to the controlling function of management. You set a target (plan), do the work, then measure the KPI against the target (control) and adjust. If monthly sales come in at $8,000 against a $12,000 goal, the gap is a signal to investigate and change course. Many companies use a 'dashboard' - a single screen showing their top KPIs at a glance - so leaders spot problems fast. A good dashboard turns raw data into quick decisions instead of buried spreadsheets nobody reads.",
          "But KPIs have a dark side to watch for. When a single number becomes the only thing that matters, people 'game' it - hitting the metric while missing the real goal. If a call center rewards only call speed, agents may rush customers off the phone, boosting the KPI while wrecking customer satisfaction. This is why balance matters: pairing a speed KPI with a quality KPI keeps behavior honest. Wise managers remember that a KPI is a signpost toward the real goal, not the goal itself - and they review their KPIs as goals change."
        ],
        bullets: [
          "Match KPIs to goals: acquisition cost, conversion rate, churn, defect rate, and more.",
          "KPIs power the controlling function: measure against target, then adjust.",
          "Dashboards show top KPIs at a glance for fast decisions.",
          "People 'game' single metrics, so pair speed KPIs with quality KPIs.",
          "A KPI is a signpost toward the real goal, not the goal itself."
        ],
        realWorldExample: "A call center that rewarded only short call times saw agents hang up on confused customers to hit the metric. Satisfaction crashed. Adding a customer-satisfaction KPI alongside call time fixed the behavior - proof that one metric alone can mislead."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mgmt6-mc1",
            question: "What does the 'M' in a SMART goal stand for?",
            options: [
              "Motivating",
              "Measurable",
              "Major",
              "Minimal"
            ],
            correctAnswer: 1,
            explanation: "SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound. 'Measurable' means you can track it with real data."
          },
          {
            id: "mgmt6-mc2",
            question: "Which best describes a leading indicator?",
            options: [
              "A number that reports last year's profit",
              "A metric that helps predict future results",
              "A report of past sales only, with no hint about tomorrow",
              "A tax the company already paid to the government last year"
            ],
            correctAnswer: 1,
            explanation: "Leading indicators (like sales calls made this week) predict future outcomes, letting managers steer before results are locked in. Lagging indicators report the past."
          }
        ]
      },
      {
        type: "scenario",
        title: "Nadia's App Chases the Wrong Number",
        narrative: "Nadia manages a fitness app. For months her team celebrated a soaring download count. But revenue stayed flat, because most people downloaded the app and never subscribed. She realizes she's been tracking the wrong KPI and needs to refocus.",
        details: [
          "Downloads kept rising, which looked great on the team's dashboard.",
          "Revenue stayed flat because downloads didn't turn into paying subscribers.",
          "Downloads were a vanity metric - impressive-looking but not tied to real results.",
          "Nadia switches focus to conversion rate and churn rate, which actually track paying users."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mgmt6-aq1",
          question: "Why was 'downloads' a poor KPI for Nadia's revenue goal?",
          options: [
            "Downloads are impossible to measure with any modern tracking tool at all",
            "Downloads didn't translate into paying subscribers",
            "Downloads always harm an app's reputation",
            "Downloads are illegal to track"
          ],
          correctAnswer: 1,
          explanation: "A KPI must be relevant to the goal. Downloads looked good but didn't drive revenue, making it a vanity metric. Conversion and churn tie directly to paying customers."
        }
      },
      {
        type: "recap",
        takeaways: [
          "KPIs are the key numbers showing whether goals are being met.",
          "SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound.",
          "Leading indicators predict; lagging indicators confirm - use both.",
          "Match KPIs to goals and avoid vanity metrics that don't drive results.",
          "Balance metrics so people don't game a single number."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mgmt6-mastery1",
            question: "What is a KPI?",
            options: [
              "A tax form for businesses that must be filed with the government each spring",
              "A key number tracking progress toward a goal",
              "A type of employee contract signed on the very first day of a new job",
              "A brand's logo design featuring the colors and shapes people see on the package"
            ],
            correctAnswer: 1,
            explanation: "A Key Performance Indicator is a specific, important metric a business tracks to see whether it's reaching its goals."
          },
          {
            id: "mgmt6-mastery2",
            question: "Which goal is written in the SMART format?",
            options: [
              "Sell way more stuff soon without ever saying how much or when",
              "Gain 200 new customers by June",
              "Be the best company ever at absolutely everything for all time",
              "Make customers happier somehow with no number or deadline attached"
            ],
            correctAnswer: 1,
            explanation: "'Gain 200 new customers by June' is Specific, Measurable, and Time-bound. The others are vague with no clear target or deadline."
          },
          {
            id: "mgmt6-mastery3",
            question: "A 'vanity metric' is one that…",
            options: [
              "Looks impressive but doesn't drive real results",
              "Always predicts future profit perfectly with zero chance of ever being wrong",
              "Is required by tax law and must be reported to the government every quarter",
              "Measures factory defect rates on the assembly line during each production shift"
            ],
            correctAnswer: 0,
            explanation: "Vanity metrics (like social media likes) feel good but don't connect to real business goals, so they mislead rather than guide."
          },
          {
            id: "mgmt6-mastery4",
            question: "Last quarter's total revenue is an example of a…",
            options: [
              "Leading indicator",
              "Lagging indicator",
              "SMART goal",
              "Vanity metric"
            ],
            correctAnswer: 1,
            explanation: "Revenue that's already happened is a lagging indicator - it reports the past. Leading indicators predict what's coming next."
          },
          {
            id: "mgmt6-mastery5",
            question: "KPIs most directly support which management function?",
            options: [
              "Organizing",
              "Controlling",
              "Hiring",
              "Advertising"
            ],
            correctAnswer: 1,
            explanation: "KPIs feed the controlling function: you measure results against targets and adjust the plan when there's a gap."
          },
          {
            id: "mgmt6-mastery6",
            question: "Why is it risky to reward employees on a single KPI like call speed?",
            options: [
              "Single metrics are illegal and any company tracking just one number can be fined heavily",
              "People may game it and miss the real goal",
              "Speed can never be measured by any tool, stopwatch, or software that exists today",
              "It always raises customer satisfaction no matter what else happens to the product or service"
            ],
            correctAnswer: 1,
            explanation: "When one number is all that matters, people optimize it at the expense of the true goal - rushing customers to boost speed while quality suffers. Balancing metrics prevents this."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // mgmt-7: Human Resources & Hiring
  // ─────────────────────────────────────────────
  {
    lessonId: "mgmt-7",
    sections: [
      {
        type: "concept",
        title: "Finding and Choosing the Right People",
        paragraphs: [
          "Human Resources (HR) is the part of a business that handles its people - hiring them, training them, paying them, and keeping them happy enough to stay. It starts with recruitment: attracting a pool of candidates for an open job. That begins with a clear job description listing the role's duties and the skills required. A good description draws the right applicants; a vague one wastes everyone's time. Companies recruit through job boards, referrals, social media, and campus visits, aiming to fill the funnel with qualified people before narrowing down.",
          "Selection is the process of choosing the best candidate from that pool. It usually runs through screening resumes, interviews, sometimes skills tests, and reference checks. The goal is to predict who will actually perform well and fit the team - which is genuinely hard, because a polished interview doesn't always mean a great worker. Skilled interviewers ask about real past behavior ('tell me about a time you handled a tough customer') rather than hypotheticals, because how someone acted before predicts future behavior better than what they claim they'd do.",
          "Hiring is also bound by law. In the U.S., it's illegal to discriminate based on race, color, religion, sex, national origin, age, or disability. HR must keep the whole process fair and job-related - questions and tests should measure ability to do the job, nothing else. Beyond fairness being the right thing, discrimination lawsuits are hugely expensive and damage a company's reputation. So HR balances two jobs at once: finding the best person and making sure the search is legal, consistent, and fair to every applicant."
        ],
        bullets: [
          "HR handles hiring, training, pay, and keeping employees satisfied.",
          "Recruitment attracts candidates; a clear job description draws the right ones.",
          "Selection narrows the pool via resumes, interviews, tests, and references.",
          "Behavior-based questions predict performance better than hypotheticals.",
          "Hiring must be fair and legal - discrimination is illegal and costly."
        ],
        realWorldExample: "A café posts a fuzzy 'looking for help' ad and gets 200 random resumes it can't sort. A rival posts a precise job description - hours, skills, pay - and gets 40 well-matched applicants. The second café spends far less time and hires better people."
      },
      {
        type: "concept",
        title: "Onboarding, Retention, and Why Bad Hires Cost So Much",
        paragraphs: [
          "Getting someone in the door is only the start. Onboarding is how a new hire is welcomed and trained in their first weeks - shown the systems, the culture, and what success looks like. Strong onboarding helps people become productive fast and feel like they belong; weak onboarding leaves them confused and likely to quit. Studies show employees who get good onboarding are far more likely to stay past their first year. Those early days set the tone for the whole relationship.",
          "Retention means keeping good employees so they don't leave. It matters enormously because turnover - people quitting and needing replacement - is shockingly expensive. Replacing an employee can cost anywhere from half to two times their annual salary once you count recruiting, training, and lost productivity while the role sits empty. So a business losing workers constantly bleeds money even if wages look low. Managers boost retention with fair pay, growth opportunities, recognition, and good treatment - because people usually leave bad managers, not just bad jobs.",
          "This is why hiring wrong costs more than hiring slow. A bad hire drags down the team, may need to be let go, and then the whole expensive recruitment cycle restarts. Compensation - the pay and benefits package - is a core HR lever: it includes salary or wages plus health insurance, retirement contributions, and paid time off. Competitive compensation attracts and keeps talent, but it must fit the budget. The overall lesson: people are usually a company's biggest cost and biggest asset, so managing them well is one of the highest-payoff things a business can do."
        ],
        bullets: [
          "Onboarding trains and welcomes new hires; good onboarding boosts retention.",
          "Retention keeps good employees, avoiding costly turnover.",
          "Replacing an employee can cost from half to twice their annual salary.",
          "A bad hire costs more than a slow hire - the whole cycle must restart.",
          "Compensation (pay plus benefits) attracts and keeps talent within budget."
        ],
        realWorldExample: "A shop pays a worker $30,000 a year but has 50% annual turnover. Each quitter costs roughly $15,000-$30,000 to replace. Spending a bit more on pay and training to keep people would actually save the shop money overall."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mgmt7-mc1",
            question: "What is the purpose of onboarding?",
            options: [
              "To advertise an open job to the public by posting it on boards and websites everywhere",
              "To welcome and train a new hire in their early weeks",
              "To calculate the company's taxes and send the correct payment to the government each spring",
              "To fire underperforming staff who keep missing their goals month after month after month"
            ],
            correctAnswer: 1,
            explanation: "Onboarding welcomes and trains new employees so they become productive and feel they belong, which strongly improves retention."
          },
          {
            id: "mgmt7-mc2",
            question: "Roughly how much can it cost to replace an employee?",
            options: [
              "About $10 total, which barely covers a single new name badge",
              "From half to twice their annual salary",
              "Nothing at all, because finding and training a replacement is completely free",
              "Exactly one week of pay, no matter the role or how senior the person was"
            ],
            correctAnswer: 1,
            explanation: "Turnover is expensive: recruiting, training, and lost productivity can cost from half to two times the departing employee's yearly salary."
          }
        ]
      },
      {
        type: "scenario",
        title: "Bright Star Loses Workers Fast",
        narrative: "Bright Star Cleaning pays low wages and hires quickly with little training. Workers keep quitting within months, and the owner is frustrated by the constant scramble to fill positions. She reviews her HR practices to find the leak.",
        details: [
          "New hires get almost no onboarding, so many feel lost and quit within weeks.",
          "High turnover forces the owner to recruit and train replacements constantly.",
          "Each replacement costs far more than the small savings from low wages.",
          "Better pay, training, and recognition could raise retention and cut total costs."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mgmt7-aq1",
          question: "Why might paying workers a bit more actually SAVE Bright Star money?",
          options: [
            "Higher pay is required by every state law",
            "Better retention cuts expensive, constant turnover",
            "Paying more automatically doubles revenue",
            "Employees legally can't quit if paid more"
          ],
          correctAnswer: 1,
          explanation: "Turnover costs far more than modest raises. Paying and treating workers better boosts retention, reducing the frequent, expensive recruiting and training cycle."
        }
      },
      {
        type: "recap",
        takeaways: [
          "HR manages recruiting, selecting, training, paying, and retaining people.",
          "A clear job description attracts the right candidates.",
          "Hiring must be fair and legal - discrimination is illegal and costly.",
          "Strong onboarding boosts retention; turnover is very expensive to replace.",
          "Competitive compensation attracts and keeps talent within budget."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mgmt7-mastery1",
            question: "What is recruitment in HR?",
            options: [
              "Firing low performers who repeatedly miss their targets over many months",
              "Attracting a pool of candidates for a job",
              "Paying the company's taxes to the government by the deadline each and every year",
              "Designing the company logo with colors and shapes that customers will recognize instantly"
            ],
            correctAnswer: 1,
            explanation: "Recruitment is the process of attracting qualified candidates to apply for an open role, filling the funnel before selection narrows it."
          },
          {
            id: "mgmt7-mastery2",
            question: "Which interview approach best predicts future performance?",
            options: [
              "Asking about real past behavior",
              "Asking only hypothetical dreams about some imagined perfect future workplace",
              "Judging by appearance alone based on the outfit worn to the interview",
              "Skipping the interview entirely and hiring the very first person who applies"
            ],
            correctAnswer: 0,
            explanation: "Behavior-based questions about how someone actually handled past situations predict future performance better than hypotheticals or first impressions."
          },
          {
            id: "mgmt7-mastery3",
            question: "In the U.S., hiring decisions may NOT legally be based on…",
            options: [
              "A candidate's job-related skills proven through a fair, standardized test",
              "A candidate's race, religion, or age",
              "Relevant work experience earned at earlier jobs",
              "Results of a fair skills test"
            ],
            correctAnswer: 1,
            explanation: "It's illegal to discriminate by race, religion, sex, age, national origin, or disability. Decisions must be job-related and fair to all applicants."
          },
          {
            id: "mgmt7-mastery4",
            question: "What does 'retention' mean in HR?",
            options: [
              "Recruiting brand-new candidates by posting the open role on job boards everywhere",
              "Keeping good employees so they stay",
              "Cutting employee pay across the board to save the company some quick money",
              "Auditing the company's finances line by line to catch any accounting mistakes"
            ],
            correctAnswer: 1,
            explanation: "Retention is keeping valued employees on the team, which avoids the high cost of turnover and preserves experience."
          },
          {
            id: "mgmt7-mastery5",
            question: "Why does a bad hire often cost more than a slow hire?",
            options: [
              "Bad hires are always paid double",
              "The costly recruitment cycle must restart",
              "Slow hiring is against the law",
              "Bad hires never affect the team"
            ],
            correctAnswer: 1,
            explanation: "A bad hire may drag down the team and be let go, forcing the whole expensive recruiting and training process to start over."
          },
          {
            id: "mgmt7-mastery6",
            question: "Compensation in HR refers to…",
            options: [
              "Only a worker's base salary before any bonuses, benefits, or extras are counted",
              "Pay plus benefits like insurance and time off",
              "The company's advertising budget spent on commercials and online ads all year",
              "A firm's total tax payment sent to the government at the close of each year"
            ],
            correctAnswer: 1,
            explanation: "Compensation is the full package - wages or salary plus benefits such as health insurance, retirement contributions, and paid time off."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // mgmt-8: Ethics in Business Decision-Making
  // ─────────────────────────────────────────────
  {
    lessonId: "mgmt-8",
    sections: [
      {
        type: "concept",
        title: "Beyond Shareholders: Who a Business Answers To",
        paragraphs: [
          "For decades, many believed a company's only duty was to maximize profit for its shareholders - the people who own its stock. Stakeholder theory challenges that. A stakeholder is anyone affected by the business: not just shareholders, but employees, customers, suppliers, the local community, and even the environment. The theory argues that lasting success comes from balancing all these groups' interests, not squeezing every dollar for owners while harming everyone else. A company that treats workers, customers, and its community well tends to thrive over the long run.",
          "This matters because stakeholders are connected. Underpay and overwork employees to boost this quarter's profit, and you get turnover, poor service, and a bad reputation that eventually drives customers away. Cut corners on product safety to save money, and a scandal can wipe out years of gains overnight. Stakeholder theory says these groups aren't obstacles to profit - they're the foundation of it. Happy employees serve customers better; loyal customers spread the word; a trusted community grants a business the freedom to operate and grow.",
          "The tension is real, though. Sometimes what helps one stakeholder hurts another. Raising wages pleases employees but shrinks short-term shareholder profit. Lowering prices delights customers but squeezes suppliers. Good managers don't pretend these conflicts away - they weigh them openly, looking for choices that serve the most stakeholders sustainably. The shift in modern business is from asking only 'what's most profitable right now?' to asking 'what's profitable AND responsible over the long term?' That broader question is the heart of ethical decision-making."
        ],
        bullets: [
          "Shareholders own the company; stakeholders are everyone the business affects.",
          "Stakeholders include employees, customers, suppliers, community, and environment.",
          "Stakeholder theory: balancing all groups drives lasting success.",
          "Mistreating stakeholders to boost short-term profit backfires over time.",
          "Good managers weigh conflicts openly to serve the most stakeholders sustainably."
        ],
        realWorldExample: "An outdoor-gear company pays fair wages, uses sustainable materials, and even repairs old products for free. It sacrifices some short-term profit but earns fierce customer loyalty and a trusted brand - proof that serving stakeholders can pay off for owners too."
      },
      {
        type: "concept",
        title: "Reputational Risk and the Long Game",
        paragraphs: [
          "One of the biggest reasons ethics matters in business is reputational risk - the danger that unethical behavior destroys the trust a company depends on. A reputation takes years to build and can collapse in a day when a scandal breaks. Once customers, employees, and investors lose faith, they leave, and winning them back is far harder than keeping them. In the social-media age, a single video of mistreated customers or a leaked memo can go viral worldwide before a company even responds. Trust is a fragile, priceless asset.",
          "This connects to short-term versus long-term thinking, one of the deepest tensions in management. A choice can look great on this quarter's report yet quietly plant a disaster. Dumping waste illegally saves money now but risks massive fines and ruined trust later. Deceiving customers boosts sales today but destroys loyalty tomorrow. Ethical managers resist the pull of short-term gains that create long-term harm, because the biggest costs of unethical acts - lawsuits, lost customers, wrecked morale - usually arrive later, long after the quick win is spent.",
          "So how do managers decide? A useful gut-check is transparency: would you be comfortable if this decision appeared on the front page of the news, or if you had to explain it to your family? If the honest answer is no, that's a warning sign. Ethical decision-making isn't only about avoiding lawsuits; it's about building the durable trust that lets a business survive hard times. Companies with strong ethical cultures tend to attract better employees, keep loyal customers, and weather crises - because in the long run, doing right and doing well are far more connected than they first appear."
        ],
        bullets: [
          "Reputational risk: unethical acts can destroy hard-earned trust overnight.",
          "Trust takes years to build and can collapse in a single viral moment.",
          "Short-term wins can hide long-term disasters like fines and lost customers.",
          "The 'front-page test': would you be fine if this decision went public?",
          "Strong ethical cultures attract talent, keep customers, and survive crises."
        ],
        realWorldExample: "A carmaker that secretly cheated emissions tests looked more profitable for years - until the truth surfaced. It faced billions in fines, plunging sales, and a shattered reputation, proving a short-term trick can cause a long-term catastrophe."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mgmt8-mc1",
            question: "According to stakeholder theory, which group is a stakeholder but NOT a shareholder?",
            options: [
              "A person who owns company stock bought on the public exchange last year",
              "An employee who works at the company",
              "An investor holding shares purchased through a brokerage account for the long term",
              "A part-owner of the business who put in money hoping the share price climbs"
            ],
            correctAnswer: 1,
            explanation: "Shareholders own stock. Stakeholders are anyone affected by the business - like employees, customers, and the community - even if they own no shares."
          },
          {
            id: "mgmt8-mc2",
            question: "What is 'reputational risk'?",
            options: [
              "The chance a product sells out too fast and leaves the store shelves empty",
              "The danger that unethical acts destroy a company's trust",
              "The risk of paying too much in taxes to the government by filing the wrong forms",
              "The cost of hiring new managers to run each department across the whole company"
            ],
            correctAnswer: 1,
            explanation: "Reputational risk is the threat that bad behavior wrecks the trust customers, employees, and investors place in a company - trust that's slow to rebuild."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Tempting Shortcut",
        narrative: "Priya, a manager at a snack company, discovers she could cut costs by quietly using a cheaper ingredient and not updating the label. It would boost this quarter's profit and impress shareholders, but customers with allergies rely on that label being accurate.",
        details: [
          "The switch would raise short-term profit and please shareholders immediately.",
          "Customers - a key stakeholder - could be harmed by the inaccurate label.",
          "If discovered, the deception could trigger lawsuits and destroy customer trust.",
          "The 'front-page test' fails: Priya wouldn't want this decision made public."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mgmt8-aq1",
          question: "Why should Priya reject the ingredient-swap shortcut despite the short-term profit?",
          options: [
            "Short-term profit never matters at all, so companies should always ignore this quarter's earnings",
            "The long-term harm to trust and safety outweighs the quick gain",
            "Shareholders are not real stakeholders and their money in the business should be ignored",
            "Cheaper ingredients are always illegal, so no company is ever allowed to lower its costs"
          ],
          correctAnswer: 1,
          explanation: "The quick profit hides long-term disaster: harmed customers, lawsuits, and shattered trust. Ethical decisions weigh long-term stakeholder impact over a short-term win."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Shareholders own the firm; stakeholders are all who are affected by it.",
          "Stakeholder theory says balancing all groups drives lasting success.",
          "Reputational risk means unethical acts can destroy trust overnight.",
          "Short-term wins can hide long-term costs like fines and lost customers.",
          "Use the front-page test and think long-term to decide ethically."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mgmt8-mastery1",
            question: "Stakeholder theory argues that a business should…",
            options: [
              "Serve only its shareholders' profit and treat every other group as unimportant",
              "Balance the interests of all affected groups",
              "Ignore employees and customers while chasing whatever brings the fastest possible payout",
              "Focus solely on this quarter's numbers and never think about next year at all"
            ],
            correctAnswer: 1,
            explanation: "Stakeholder theory holds that lasting success comes from balancing the interests of everyone the business affects, not just enriching shareholders."
          },
          {
            id: "mgmt8-mastery2",
            question: "Which is an example of a stakeholder who is not a shareholder?",
            options: [
              "The local community near a factory",
              "A stockholder owning 100 shares bought on the exchange",
              "An investor holding company equity purchased for the long term",
              "A part-owner of the firm hoping the share price rises"
            ],
            correctAnswer: 0,
            explanation: "The surrounding community is affected by the business and is thus a stakeholder, even though it owns no shares."
          },
          {
            id: "mgmt8-mastery3",
            question: "Why is reputational risk so serious for a company?",
            options: [
              "Reputations are easy to rebuild quickly, so a scandal blows over within a day or two",
              "Lost trust drives away customers and is hard to regain",
              "It only affects the company's taxes owed to the government and touches nothing else at all",
              "It has no effect on sales whatsoever, because shoppers never pay attention to a company's behavior"
            ],
            correctAnswer: 1,
            explanation: "Trust takes years to build and can vanish overnight; once lost, customers, employees, and investors leave and are very hard to win back."
          },
          {
            id: "mgmt8-mastery4",
            question: "A decision that boosts this quarter's profit but risks huge fines later shows the tension between…",
            options: [
              "Short-term gain and long-term harm",
              "Two completely identical outcomes with no meaningful difference between them",
              "The marketing department and the accounting department sitting on separate floors",
              "Only the suppliers and the shareholders, while everyone else is left entirely out"
            ],
            correctAnswer: 0,
            explanation: "This is the classic short-term versus long-term conflict: a quick win can plant a costly long-term disaster like fines or lost trust."
          },
          {
            id: "mgmt8-mastery5",
            question: "What is the 'front-page test' for an ethical decision?",
            options: [
              "Would this decision earn the company the very most profit possible this quarter?",
              "Would you be comfortable if it went public?",
              "Is this decision truly the cheapest option available to us at this moment?",
              "Does this decision please the shareholders who own the biggest blocks of stock?"
            ],
            correctAnswer: 1,
            explanation: "The front-page test asks whether you'd be comfortable seeing the decision reported publicly. If not, that's a red flag it may be unethical."
          },
          {
            id: "mgmt8-mastery6",
            question: "Companies with strong ethical cultures tend to…",
            options: [
              "Lose customers and talent quickly no matter how well the company behaves",
              "Attract talent and keep customers loyal",
              "Face more scandals than others simply because they try to act responsibly",
              "Always earn less money forever, since acting ethically supposedly guarantees lower profits"
            ],
            correctAnswer: 1,
            explanation: "Strong ethics builds durable trust, helping firms attract better employees, retain loyal customers, and weather crises - so doing right supports doing well."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // mkt-1: What Marketing Actually Is
  // ─────────────────────────────────────────────
  {
    lessonId: "mkt-1",
    sections: [
      {
        type: "concept",
        title: "Marketing Is Bigger Than Ads",
        paragraphs: [
          "Most people think marketing means advertising - the commercials and billboards. But advertising is just one small slice. Marketing is the entire process of creating value for customers and then communicating that value to them. It covers understanding what people actually need, designing a product to meet that need, pricing it right, getting it to where buyers can find it, and only then telling them about it. Advertising is the shout at the end; marketing is everything that makes the shout worth hearing. A great ad for a bad product just helps it fail faster.",
          "The core of marketing is value - the benefit a customer gets compared to what they pay. A phone case isn't valuable because it exists; it's valuable because it stops a $1,000 phone from shattering. Marketers ask: what problem does this solve, and for whom? A business that truly understands the value it creates can communicate it clearly. One that doesn't just makes noise. This is why marketing starts with the customer, not the product - you figure out what people need before you decide what to sell.",
          "A helpful distinction is a need versus a want. A need is a basic requirement - food, safety, transportation. A want is a specific way of satisfying that need shaped by personality and culture. Everyone needs to get to school; wanting a particular sneaker brand to walk there is a want. Great marketing connects a product to a real need while appealing to the want. It also builds relationships, not just single sales - because a happy customer who returns and tells friends is worth far more than a one-time buyer lured by a clever slogan."
        ],
        bullets: [
          "Marketing is creating value for customers and communicating it - not just ads.",
          "Advertising is one small part of the whole marketing process.",
          "Value = the benefit a customer gets compared to what they pay.",
          "Marketing starts with the customer's needs, not the product.",
          "A need is a basic requirement; a want is a specific way to satisfy it."
        ],
        realWorldExample: "A water bottle brand doesn't just sell plastic and metal. It markets 'stay hydrated all day, look good doing it, and cut plastic waste.' That's the value. The clever ad only works because the product genuinely delivers those benefits people want."
      },
      {
        type: "concept",
        title: "The Marketing Concept and Building Exchange",
        paragraphs: [
          "Modern marketing follows the 'marketing concept': a business succeeds by figuring out what customers want and delivering it better than rivals, rather than making whatever it likes and pushing hard to sell it. The opposite, older approach - the 'selling concept' - assumes you can convince anyone to buy anything with enough pressure. That works briefly but fails long-term, because unhappy customers don't return. The marketing concept flips it: listen first, build what people actually want, and selling becomes far easier because the product fits real demand.",
          "At its heart, marketing enables exchange - a customer gives money (or attention) and receives value in return, and both sides feel better off. For that exchange to happen, the customer must know the product exists, believe it meets their need, and trust they're getting fair value. Marketing's job is to make all three true: create awareness, communicate benefits clearly, and build trust. When any one is missing - people never hear about it, don't understand it, or don't trust it - the exchange never happens no matter how good the product is.",
          "Marketing also spans nonprofits, personal brands, and even ideas, not just products. A charity 'markets' the value of donating; a job-seeker 'markets' their skills on a resume. The same logic applies: identify who you're trying to reach, understand what they value, create something worth their exchange, and communicate it honestly. The biggest beginner mistake is thinking marketing is about tricking people. The best marketing is the opposite - it's about genuinely understanding people and connecting them to something that truly helps them, which is what earns lasting loyalty."
        ],
        bullets: [
          "The marketing concept: find what customers want and deliver it better than rivals.",
          "The older selling concept relies on pressure and fails long-term.",
          "Marketing enables exchange - value for money, with both sides better off.",
          "Exchange needs awareness, clear benefits, and trust to happen.",
          "Marketing applies to nonprofits, personal brands, and ideas too."
        ],
        realWorldExample: "A struggling gym stopped hard-selling memberships and instead asked members what they wanted - flexible hours and beginner classes. Delivering that filled the gym through word of mouth. Listening first (the marketing concept) beat pushy sales tactics."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mkt1-mc1",
            question: "How does marketing relate to advertising?",
            options: [
              "They are exactly the same thing and the two words can always be swapped freely",
              "Advertising is one part of the larger marketing process",
              "Marketing is just a tiny part of advertising, tucked inside every single commercial",
              "They have nothing to do with each other and never once overlap in any real business"
            ],
            correctAnswer: 1,
            explanation: "Marketing is the whole process of creating and communicating value. Advertising is just one piece - the part that tells people about the product."
          },
          {
            id: "mkt1-mc2",
            question: "In marketing, what is 'value'?",
            options: [
              "The exact factory cost of a product measured down to the last raw material",
              "The benefit a customer gets versus what they pay",
              "The number of ads a company runs across TV, radio, and websites each month",
              "The color scheme of a brand chosen for its logo, package, and store signage"
            ],
            correctAnswer: 1,
            explanation: "Value is the benefit a customer receives compared to the price they pay. Marketing works by creating and clearly communicating that value."
          }
        ]
      },
      {
        type: "scenario",
        title: "Zoe's Reusable Bag Startup",
        narrative: "Zoe invents a stylish reusable grocery bag. Her first instinct is to spend all her money on flashy ads. A mentor stops her and asks whether she truly understands the value her bag creates and who needs it before she starts shouting about it.",
        details: [
          "Zoe first assumed marketing just meant buying lots of advertising.",
          "Her mentor points out that marketing starts with understanding customer value first.",
          "The real value is convenience plus cutting single-use plastic waste for eco-minded shoppers.",
          "Only after identifying that value and audience does advertising the bag make sense."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mkt1-aq1",
          question: "What should Zoe do BEFORE spending heavily on advertising?",
          options: [
            "Nothing at all, because running a few flashy ads alone will guarantee instant success",
            "Understand the value her bag creates and who needs it",
            "Immediately triple the bag's price and trust that shoppers will happily pay far more",
            "Stop selling the bag entirely and give up on the whole idea before even trying"
          ],
          correctAnswer: 1,
          explanation: "Marketing starts with the customer and value, not ads. Zoe should clarify what benefit her bag offers and who wants it, so her later advertising actually connects."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Marketing creates value for customers and communicates it - far more than ads.",
          "Value is the benefit a customer gets compared to what they pay.",
          "Marketing starts with customer needs, not with the product.",
          "The marketing concept means delivering what customers want, not just selling hard.",
          "Marketing enables exchange, which needs awareness, clarity, and trust."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mkt1-mastery1",
            question: "Which best defines marketing?",
            options: [
              "Only the ads a company airs on TV",
              "Creating value for customers and communicating it",
              "Printing money for shareholders to hand out as fat dividends",
              "Firing and hiring employees to keep the staff roster fully stocked"
            ],
            correctAnswer: 1,
            explanation: "Marketing is the full process of creating value for customers and communicating that value - advertising is only one part of it."
          },
          {
            id: "mkt1-mastery2",
            question: "What is the difference between a need and a want?",
            options: [
              "A need is basic; a want is a specific form of it",
              "A want is basic while a need is entirely optional and can be skipped",
              "They mean the exact same thing and can be swapped in any sentence",
              "Needs apply only to luxury goods that shoppers buy purely for fun and status"
            ],
            correctAnswer: 0,
            explanation: "A need is a basic requirement (like transportation); a want is a specific, culture-shaped way of meeting it (like a particular car brand)."
          },
          {
            id: "mkt1-mastery3",
            question: "The 'marketing concept' says a business should…",
            options: [
              "Make anything and push hard to sell it",
              "Find what customers want and deliver it well",
              "Ignore what customers say and simply build whatever the boss personally likes",
              "Focus only on lowering prices and never think about quality or what buyers want"
            ],
            correctAnswer: 1,
            explanation: "The marketing concept means understanding customer wants and delivering them better than rivals, rather than forcing sales of whatever you happen to make."
          },
          {
            id: "mkt1-mastery4",
            question: "For an exchange to happen, a customer must have awareness, understand the benefits, and…",
            options: [
              "Distrust the company and its every claim",
              "Trust they're getting fair value",
              "Never hear of the product",
              "Pay far above value and feel cheated afterward"
            ],
            correctAnswer: 1,
            explanation: "Exchange requires awareness, clear benefits, and trust that the value is fair. If any is missing, the sale won't happen."
          },
          {
            id: "mkt1-mastery5",
            question: "Why does a great ad for a bad product often fail?",
            options: [
              "Ads make good products worse simply by mentioning them out loud to shoppers",
              "Unhappy customers don't return or refer others",
              "Advertising is always illegal unless a special license is bought from the government first",
              "Good ads can't reach anyone no matter how much money is spent to run them"
            ],
            correctAnswer: 1,
            explanation: "Marketing builds lasting relationships. A slick ad may draw a first sale, but a bad product leaves customers unhappy, so they don't return or recommend it."
          },
          {
            id: "mkt1-mastery6",
            question: "Marketing applies to which of the following?",
            options: [
              "Only physical products for sale that you can hold in your hands",
              "Products, nonprofits, personal brands, and ideas",
              "Only large corporations with thousands of workers and offices worldwide",
              "Only television commercials aired during expensive prime-time evening slots"
            ],
            correctAnswer: 1,
            explanation: "The same logic - understand your audience, create value, communicate it honestly - applies to nonprofits, personal brands, and ideas, not just products."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // mkt-2: Understanding Your Customer
  // ─────────────────────────────────────────────
  {
    lessonId: "mkt-2",
    sections: [
      {
        type: "concept",
        title: "You Can't Sell to Everyone",
        paragraphs: [
          "The most common beginner mistake in business is trying to sell to 'everyone.' In reality, a product that tries to please everyone usually excites no one. Smart marketers pick a target market: the specific group of people most likely to want and buy their product. A skateboard brand doesn't market to retirees; it targets teens and young adults who skate. Choosing a target market focuses your money and message so every dollar reaches people who actually care, instead of being sprayed at a huge crowd that mostly ignores you.",
          "To find that group, marketers use segmentation - dividing a big market into smaller groups that share traits. You might segment by age, income, location, or lifestyle. Then you pick which segment (or few) to target. A coffee shop near a college might target budget-conscious students with cheap, fast drinks, while a shop downtown targets professionals wanting premium lattes. Same product category, totally different segments, different messages. Segmentation turns a vague 'everyone' into clear groups you can actually understand and serve well.",
          "Two key ways to describe a target market are demographics and psychographics. Demographics are measurable facts about who people are: age, gender, income, education, family size, location. Psychographics go deeper into why people buy: their values, interests, lifestyle, and attitudes. Two 20-year-olds might share demographics but differ hugely in psychographics - one values luxury and status, the other values sustainability and thrift. The best marketing combines both: demographics tell you who to reach, and psychographics tell you what message will actually move them."
        ],
        bullets: [
          "Trying to sell to everyone usually appeals to no one.",
          "A target market is the specific group most likely to buy your product.",
          "Segmentation divides a big market into smaller, similar groups.",
          "Demographics = measurable facts (age, income, location).",
          "Psychographics = values, interests, lifestyle, and attitudes."
        ],
        realWorldExample: "Two shampoos target different segments: one aims at busy parents (demographic) who want cheap, fast, family-size bottles; another targets eco-conscious shoppers (psychographic) who value cruelty-free, natural ingredients and will pay more. Same shelf, different customers, different messages."
      },
      {
        type: "concept",
        title: "Buyer Personas and Reaching Real People",
        paragraphs: [
          "To make a target market feel real, marketers build a buyer persona - a detailed, semi-fictional portrait of their ideal customer. Instead of 'women 25-40,' a persona might be 'Maria, 32, a busy nurse who values convenience, shops on her phone at night, and worries about spending too much.' Giving the customer a name, habits, and worries helps a whole team design products and messages that speak to a real human. Every decision becomes: 'Would Maria want this? Where would she see it?' That focus sharpens everything.",
          "Understanding customers also means understanding their problems - what marketers call 'pain points.' People don't buy products; they buy solutions to problems. Maria doesn't want a meal-kit box; she wants to stop stressing about dinner after a 12-hour shift. Nail the pain point and your message writes itself. This is why market research and simply talking to customers matter so much: assumptions about what people want are often wrong, and the only way to truly know is to ask, watch, and listen to the actual target audience.",
          "Finally, knowing your customer tells you where and how to reach them, which saves enormous money. If your target is teens, you advertise on the apps they scroll, not in a newspaper they'll never open. If your target is local families, community events and neighborhood social pages beat national TV. Every channel costs money, and reaching the wrong crowd wastes it. So customer understanding isn't a soft, fluffy step - it's the foundation that makes pricing, product design, messaging, and advertising all click into place efficiently."
        ],
        bullets: [
          "A buyer persona is a detailed portrait of your ideal customer.",
          "Personas give the customer a name, habits, and worries to design around.",
          "People buy solutions to problems ('pain points'), not products.",
          "Talking to real customers beats guessing what they want.",
          "Knowing your customer reveals where to reach them, saving money."
        ],
        realWorldExample: "A tutoring startup built a persona: 'Jayden, a stressed 10th-grader failing algebra whose parents pay the bills.' That clarity led them to advertise to parents on Facebook while making the app fun for Jayden - reaching both the buyer and the user precisely."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mkt2-mc1",
            question: "What is a target market?",
            options: [
              "Every single person on earth, no matter their age, taste, or budget at all",
              "The specific group most likely to buy your product",
              "The factory where products are made, packed, and shipped out to stores each week",
              "A company's total yearly profit after all costs and taxes have been subtracted out"
            ],
            correctAnswer: 1,
            explanation: "A target market is the specific group of people most likely to want and buy your product, so you can focus your money and message on them."
          },
          {
            id: "mkt2-mc2",
            question: "Which is a psychographic trait rather than a demographic one?",
            options: [
              "A customer's age counted in years since birth",
              "A customer's income level earned from a job each year",
              "A customer's values and lifestyle",
              "A customer's home city printed on their mailing address"
            ],
            correctAnswer: 2,
            explanation: "Psychographics describe values, interests, and lifestyle - the 'why' behind buying. Age, income, and city are measurable demographic facts."
          }
        ]
      },
      {
        type: "scenario",
        title: "Andre's Energy Bar Misfire",
        narrative: "Andre launches a protein energy bar and tries to sell it to 'everyone.' His broad ads flop and money drains fast. He steps back to define an actual target market and build a persona before relaunching.",
        details: [
          "Andre's 'sell to everyone' approach spread his budget thin and reached no one strongly.",
          "He segments the market and targets active gym-goers aged 18-30 (demographics).",
          "He learns they value clean ingredients and quick fuel before workouts (psychographics).",
          "He builds a persona - 'Sam, a 24-year-old lifter who reads labels' - to guide his messaging."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mkt2-aq1",
          question: "Why will defining a target market likely help Andre more than selling to 'everyone'?",
          options: [
            "Targeting is required by advertising law, and skipping it can get a company fined",
            "Focused money and message reach people who actually care",
            "A narrow market always has more people in it than the entire wide market does",
            "Everyone secretly wants a protein bar, so aiming at absolutely everybody works best"
          ],
          correctAnswer: 1,
          explanation: "Targeting focuses Andre's limited budget and tailors his message to people most likely to buy, instead of wasting money on a huge crowd that ignores him."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Selling to 'everyone' usually appeals to no one; pick a target market.",
          "Segmentation divides a market into smaller, similar groups to target.",
          "Demographics are measurable facts; psychographics are values and lifestyle.",
          "A buyer persona turns a target market into a real, relatable person.",
          "Knowing your customer reveals where to reach them and saves money."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mkt2-mastery1",
            question: "Why is trying to sell to 'everyone' usually a mistake?",
            options: [
              "It appeals strongly to no one and wastes budget",
              "It is against the law, and a company can be fined for marketing to everyone",
              "It always sells out too fast, leaving empty shelves and long lines of angry shoppers",
              "Everyone dislikes new products, so no one ever buys anything the first week it launches"
            ],
            correctAnswer: 0,
            explanation: "A message aimed at everyone connects with no one and spreads limited money too thin. Targeting a specific group focuses both message and budget."
          },
          {
            id: "mkt2-mastery2",
            question: "What is market segmentation?",
            options: [
              "Raising prices for all customers at once across every single product line",
              "Dividing a big market into smaller similar groups",
              "Merging two companies together into one larger business with a shared name",
              "Removing a product from sale and pulling it off every store shelf everywhere"
            ],
            correctAnswer: 1,
            explanation: "Segmentation splits a large market into smaller groups that share traits, so a business can choose which segment to target."
          },
          {
            id: "mkt2-mastery3",
            question: "Which of these is a demographic trait?",
            options: [
              "A customer's core values",
              "A customer's income level",
              "A customer's weekend hobbies and pastimes",
              "A customer's attitudes and personal opinions"
            ],
            correctAnswer: 1,
            explanation: "Income is a measurable demographic fact. Values, hobbies, and attitudes are psychographic - they describe why people buy."
          },
          {
            id: "mkt2-mastery4",
            question: "A buyer persona is best described as…",
            options: [
              "A company's yearly sales report showing every dollar earned in the past year",
              "A detailed portrait of an ideal customer",
              "The price tag on a product that shoppers see printed at the register",
              "A list of all competitors selling similar goods in the same busy market"
            ],
            correctAnswer: 1,
            explanation: "A buyer persona is a semi-fictional, detailed picture of your ideal customer - name, habits, worries - that guides product and message decisions."
          },
          {
            id: "mkt2-mastery5",
            question: "The idea that 'people buy solutions, not products' means marketers should focus on…",
            options: [
              "The customer's problem or pain point",
              "The factory's location on the map",
              "The company's tax rate paid each year",
              "The color of the packaging only"
            ],
            correctAnswer: 0,
            explanation: "Customers buy to solve a problem. Understanding their pain point lets marketers frame the product as the solution they actually want."
          },
          {
            id: "mkt2-mastery6",
            question: "How does knowing your customer save advertising money?",
            options: [
              "It makes ads completely free of charge for the entire company forever",
              "It targets channels the customer actually uses",
              "It removes the need for any product",
              "It guarantees zero competition in the whole market"
            ],
            correctAnswer: 1,
            explanation: "Knowing your customer tells you which channels they use, so you spend on ads that reach them instead of wasting money on the wrong crowd."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // mkt-3: Market Research
  // ─────────────────────────────────────────────
  {
    lessonId: "mkt-3",
    sections: [
      {
        type: "concept",
        title: "Replacing Guesses With Evidence",
        paragraphs: [
          "Market research is gathering information about customers, competitors, and the market so decisions rest on evidence instead of guesses. It's how a business answers questions like 'Will people buy this?' or 'What price feels fair?' before betting money on the answer. Launching a product on a hunch is gambling; researching first is investing. Even simple research - asking 30 potential customers what they think - can save a founder from pouring savings into a product nobody actually wants. Research reduces risk, which is its whole point.",
          "Research splits into two types. Primary research is new information you collect yourself, directly from your target audience - surveys, interviews, focus groups, and observation. It's specific to your exact question but takes time and money. Secondary research is existing information others already gathered - government data, industry reports, competitor websites, articles. It's fast and often free, making it a smart starting point. The usual approach: begin with cheap secondary research to understand the landscape, then use primary research to answer the specific questions only your customers can.",
          "Common research tools each have strengths. Surveys reach many people cheaply and give numbers you can compare, but they can't dig deep into 'why.' Focus groups - small guided discussions - reveal rich feelings and reactions, but a few loud voices can skew the group. Interviews go deep one-on-one but are slow. Observation - watching how people actually behave - avoids the problem that people don't always do what they say. Choosing the right tool depends on whether you need broad numbers (surveys) or deep understanding (focus groups and interviews)."
        ],
        bullets: [
          "Market research replaces guesses with evidence, reducing risk before you spend.",
          "Primary research: new data you collect yourself (surveys, interviews, observation).",
          "Secondary research: existing data others gathered (reports, articles, competitor sites).",
          "Start cheap with secondary research, then use primary for specific questions.",
          "Surveys give broad numbers; focus groups and interviews give deep insight."
        ],
        realWorldExample: "Before opening a smoothie shop, a founder reads free industry reports on smoothie trends (secondary), then surveys 100 locals about flavors and prices and runs a small taste-test focus group (primary). The combined research shapes the menu before a single dollar is spent on rent."
      },
      {
        type: "concept",
        title: "Good Data, Honest Questions, and Avoiding Bias",
        paragraphs: [
          "Research is only as good as its quality. A key idea is the sample - the group you actually study to represent your whole target market. If your sample is too small or unrepresentative, your conclusions mislead you. Surveying only your friends about your product gives a warm, useless answer because they're biased toward liking it. A good sample is big enough and reflects the real target audience, so the results actually predict how the wider market will behave. Garbage sample, garbage conclusions.",
          "Another trap is bias in the questions themselves. A 'leading question' nudges people toward the answer you want - 'Don't you agree our amazing product is great?' pressures a yes. Neutral wording - 'How would you rate this product?' - gets honest data. Founders desperate for good news often ask leading questions and hear what they want, then get shocked when the market disagrees. Honest research means being willing to hear 'no,' because a cheap 'no' now beats an expensive failure later. The goal is truth, not flattery.",
          "There's also a difference between what people say and what they do. In surveys, people may claim they'd buy an eco-friendly product at a higher price, then choose the cheaper option at the store. This is why observing real behavior and running small real-world tests can beat opinion surveys. Smart businesses treat research as ongoing, not one-and-done: markets change, competitors move, and customer tastes shift. Continually gathering evidence keeps a company from drifting away from what its customers actually want as time goes on."
        ],
        bullets: [
          "A sample must be big enough and represent the real target market.",
          "Surveying only friends gives biased, useless results.",
          "Leading questions push people toward the answer you want - use neutral wording.",
          "What people say they'll do often differs from what they actually do.",
          "Research should be ongoing, since markets and tastes keep changing."
        ],
        realWorldExample: "A startup asked, 'Would you buy this brilliant app?' and 90% said yes - but almost no one downloaded it. When they instead ran a small ad and measured real sign-ups, they got honest data. Watching behavior beat asking flattering questions."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mkt3-mc1",
            question: "What is the difference between primary and secondary research?",
            options: [
              "Primary is data you collect yourself; secondary already exists",
              "Primary is always free to gather; secondary always costs a great deal of money",
              "Primary uses only the internet; secondary uses only surveys",
              "There is no real difference between the two kinds of research at all"
            ],
            correctAnswer: 0,
            explanation: "Primary research is new data you gather directly (surveys, interviews). Secondary research is existing data others already collected, like reports and articles."
          },
          {
            id: "mkt3-mc2",
            question: "Why is surveying only your friends about your product a problem?",
            options: [
              "Friends charge too much money to fill out even a short and simple survey",
              "The sample is biased and doesn't represent real customers",
              "Friends can't answer any questions because surveys are far too hard for them to read",
              "It is illegal to survey friends without first getting a signed permission form from each one"
            ],
            correctAnswer: 1,
            explanation: "Friends are biased toward liking your product and don't represent the true target market, so their answers give a false, flattering picture."
          }
        ]
      },
      {
        type: "scenario",
        title: "Bianca Tests Her Candle Idea",
        narrative: "Bianca wants to launch a line of scented candles. Instead of guessing, she does research: she reads free trend reports, surveys 150 potential customers, and runs a small focus group to smell samples. She's careful to keep her questions neutral.",
        details: [
          "Reading existing candle-market trend reports is secondary research.",
          "Surveying 150 potential customers and running a focus group is primary research.",
          "She avoids leading questions like 'Isn't this scent amazing?' to get honest feedback.",
          "She recruits strangers in her target market, not just friends, for an unbiased sample."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mkt3-aq1",
          question: "Why does Bianca avoid asking 'Isn't this scent amazing?' in her survey?",
          options: [
            "Long questions are banned in surveys by a strict rule that regulators enforce everywhere",
            "It's a leading question that pushes a biased answer",
            "Scents can't be described in words, so any survey mentioning a smell is automatically useless",
            "Surveys must always be about price and are never allowed to ask about anything else at all"
          ],
          correctAnswer: 1,
          explanation: "'Isn't this amazing?' is a leading question that nudges people to agree, producing biased data. Neutral wording gets honest feedback she can actually trust."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Market research replaces guessing with evidence and reduces risk.",
          "Primary research is data you collect; secondary research already exists.",
          "Start with cheap secondary research, then add targeted primary research.",
          "A good sample is large enough and represents the real target market.",
          "Avoid leading questions, and remember people don't always do what they say."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mkt3-mastery1",
            question: "What is the main purpose of market research?",
            options: [
              "To guarantee a product succeeds with absolutely no chance of it ever failing",
              "To reduce risk by basing decisions on evidence",
              "To replace the need for a product entirely so nothing has to be built or sold",
              "To raise prices automatically the moment any survey is finished and turned in"
            ],
            correctAnswer: 1,
            explanation: "Research gathers evidence about customers and markets so decisions rest on facts rather than hunches, reducing the risk of an expensive failure."
          },
          {
            id: "mkt3-mastery2",
            question: "Reading a free government industry report is an example of…",
            options: [
              "Primary research",
              "Secondary research",
              "A focus group",
              "An observation study"
            ],
            correctAnswer: 1,
            explanation: "Using existing data that someone else already gathered - like a government report - is secondary research."
          },
          {
            id: "mkt3-mastery3",
            question: "Which tool is best for gathering broad, comparable numbers cheaply?",
            options: [
              "A one-on-one interview",
              "A survey",
              "A single observation",
              "A private journal"
            ],
            correctAnswer: 1,
            explanation: "Surveys reach many people cheaply and produce numbers you can compare. Interviews and focus groups give depth but reach fewer people."
          },
          {
            id: "mkt3-mastery4",
            question: "Why does a research sample need to represent the target market?",
            options: [
              "So the results actually predict real behavior",
              "Because bigger samples are always illegal and regulators cap how many people you may ask",
              "To make the survey longer so it takes far more time for each person to finish",
              "So friends feel included and nobody in your close circle is ever left out of it"
            ],
            correctAnswer: 0,
            explanation: "If the sample reflects the true target market, its results predict how the wider market will behave. An unrepresentative sample gives misleading conclusions."
          },
          {
            id: "mkt3-mastery5",
            question: "Which is an example of a leading question?",
            options: [
              "How would you rate this product on a simple scale from one to ten?",
              "Don't you agree our product is amazing?",
              "What price would you honestly be willing to pay for something like this?",
              "How often do you usually shop here in a typical month of the year?"
            ],
            correctAnswer: 1,
            explanation: "'Don't you agree our product is amazing?' pushes people toward a yes, biasing the data. Neutral wording yields honest answers."
          },
          {
            id: "mkt3-mastery6",
            question: "Why can observing behavior beat simply asking people what they'll do?",
            options: [
              "Observation is always cheaper than every other kind of research a company could run",
              "People don't always act the way they claim they will",
              "Asking questions is illegal unless the company first buys a special survey permit from the state",
              "Behavior can't be measured by any camera, sensor, or tracking tool that exists in the world today"
            ],
            correctAnswer: 1,
            explanation: "People often say one thing and do another - claiming they'd pay more, then buying cheap. Watching real behavior reveals the truth surveys can miss."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // mkt-4: The 4 Ps - Product & Price
  // ─────────────────────────────────────────────
  {
    lessonId: "mkt-4",
    sections: [
      {
        type: "concept",
        title: "Product: More Than the Thing Itself",
        paragraphs: [
          "The marketing mix - the '4 Ps' - is the toolkit marketers use to bring an offering to market: Product, Price, Place, and Promotion. This lesson covers the first two. Product is what you offer to satisfy a customer's need, and it's bigger than the physical item. It includes the design, features, quality, packaging, and even the service and warranty around it. When you buy sneakers, the 'product' is also the brand feel, the box, and the return policy. Smart marketers design the whole experience, not just the object inside.",
          "A crucial product idea is differentiation - what makes your offering meaningfully different from and better than rivals in the customer's eyes. If your product is identical to competitors', you're forced to compete on price alone, which crushes profit. Differentiation can come from superior quality, unique features, better design, stronger brand, or outstanding service. A phone case brand might differentiate with a lifetime guarantee no rival offers. The question every product must answer is: 'Why should someone choose this instead of the cheaper option next to it?'",
          "Products also move through a life cycle: introduction (launch, few buyers, high costs), growth (sales climb, competitors appear), maturity (sales peak, fierce competition), and decline (sales fall as tastes shift). Marketing must change at each stage - building awareness at launch, then defending market share at maturity. A company selling only one aging product risks riding it into decline. This is why businesses keep innovating and adding new products, so as one fades, another is rising to replace its sales."
        ],
        bullets: [
          "The 4 Ps of the marketing mix: Product, Price, Place, Promotion.",
          "Product includes design, features, quality, packaging, and service - not just the item.",
          "Differentiation makes your product meaningfully better than rivals in customers' eyes.",
          "Without differentiation, you're forced to compete on price alone.",
          "Products pass through introduction, growth, maturity, and decline stages."
        ],
        realWorldExample: "Two coffee shops sell the same beans, but one differentiates with cozy seating, friendly baristas who know your name, and free refills. Customers happily pay more there - proof that 'product' includes the whole experience, not just the drink."
      },
      {
        type: "concept",
        title: "Price: The Only P That Makes Money",
        paragraphs: [
          "Price is what customers pay, and it's uniquely powerful because it's the only P that brings in revenue - the others all cost money. Price must cover costs and leave profit, but it also sends a signal: too cheap can feel low-quality, too expensive can scare buyers off. There are three main pricing strategies. Cost-plus pricing adds a set markup to what the product costs to make - simple, but ignores what customers will actually pay. If a shirt costs $10 to produce and you add a 100% markup, you sell it for $20.",
          "Value-based pricing sets the price on what the product is worth to the customer, not what it cost to make. A phone app that saves a business $1,000 a month can charge far more than its tiny production cost, because customers happily pay for the value. This strategy often earns the most profit but requires truly understanding customer value. Competitive pricing sets prices based on what rivals charge - matching, undercutting, or pricing above to signal premium quality. It's common in crowded markets where customers easily compare options side by side.",
          "Two special tactics are worth knowing. Penetration pricing launches a product cheap to grab market share fast, then raises prices later - great for entering a crowded market. Price skimming does the opposite: launch high to capture eager early buyers (think a new gadget), then lower the price over time. Marketers also use psychological pricing, like $9.99 instead of $10, because it feels meaningfully cheaper. The right pricing strategy depends on your costs, your customers, your competitors, and your goals - there's no single correct answer, only the best fit for the situation."
        ],
        bullets: [
          "Price is the only P that generates revenue; the others cost money.",
          "Cost-plus pricing adds a markup to production cost - simple but ignores demand.",
          "Value-based pricing charges what the product is worth to the customer.",
          "Competitive pricing sets prices relative to what rivals charge.",
          "Penetration launches low to gain share; skimming launches high, then drops."
        ],
        realWorldExample: "A new streaming service uses penetration pricing at $5/month to steal subscribers from rivals, then raises it to $12 once people are hooked. Meanwhile a hot new phone uses skimming - $1,200 at launch for eager fans, dropping to $800 a year later."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mkt4-mc1",
            question: "What are the 4 Ps of the marketing mix?",
            options: [
              "Product, Price, Place, Promotion",
              "People, Profit, Power, Place",
              "Product, Profit, Promotion, People",
              "Price, Package, Power, Place"
            ],
            correctAnswer: 0,
            explanation: "The 4 Ps of the marketing mix are Product, Price, Place, and Promotion - the core tools for bringing an offering to market."
          },
          {
            id: "mkt4-mc2",
            question: "Value-based pricing sets the price based on…",
            options: [
              "Only the cost to make the product, counting nothing else at all beyond it",
              "What the product is worth to the customer",
              "A random coin flip decided fresh each morning before the store opens its doors",
              "The single cheapest rival's price alone, copied exactly no matter the situation"
            ],
            correctAnswer: 1,
            explanation: "Value-based pricing charges what the product is worth to the customer, which can far exceed production cost when the value is high."
          }
        ]
      },
      {
        type: "scenario",
        title: "Leo Prices His Study App",
        narrative: "Leo built a study app that saves students hours of note-taking. It costs him almost nothing to serve each extra user. He's deciding how to price it and how to make it stand out from free note apps already on the market.",
        details: [
          "The app costs Leo little per user, so cost-plus pricing would set the price very low.",
          "Students say the app saves them hours weekly - a high value to them.",
          "Value-based pricing lets Leo charge more, reflecting the time it saves.",
          "He differentiates with a unique AI summary feature no free app offers."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mkt4-aq1",
          question: "Why might value-based pricing earn Leo more than cost-plus pricing?",
          options: [
            "It ignores what customers think entirely and never once looks at the value they receive",
            "It charges based on the high value students get, not tiny costs",
            "It is the only legal way to price apps, since every other pricing method is banned by law",
            "It always sets the lowest possible price no matter how much value the customer actually gets"
          ],
          correctAnswer: 1,
          explanation: "Leo's cost per user is tiny, so cost-plus pricing would undercharge. Value-based pricing reflects the real value - hours saved - letting him charge what students will happily pay."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The marketing mix is the 4 Ps: Product, Price, Place, Promotion.",
          "Product includes design, quality, packaging, and service, not just the item.",
          "Differentiation lets you avoid competing on price alone.",
          "Price is the only P that creates revenue and signals quality.",
          "Cost-plus, value-based, and competitive are the main pricing strategies."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mkt4-mastery1",
            question: "Which is NOT one of the 4 Ps?",
            options: [
              "Product",
              "Profit",
              "Price",
              "Promotion"
            ],
            correctAnswer: 1,
            explanation: "The 4 Ps are Product, Price, Place, and Promotion. Profit is a result of the marketing mix, not one of the Ps."
          },
          {
            id: "mkt4-mastery2",
            question: "What does product differentiation help a business avoid?",
            options: [
              "Competing on price alone",
              "Simply having any paying customers at all",
              "Managing to make even a little profit",
              "Owning a well-known and trusted brand"
            ],
            correctAnswer: 0,
            explanation: "Differentiation makes a product stand out, so it doesn't have to compete purely on the lowest price, which protects profit."
          },
          {
            id: "mkt4-mastery3",
            question: "Cost-plus pricing works by…",
            options: [
              "Charging exactly what rivals charge and copying their price to the last penny",
              "Adding a markup to the production cost",
              "Basing price purely on customer value while ignoring what it costs to make",
              "Setting the price at zero and giving the whole product away for free forever"
            ],
            correctAnswer: 1,
            explanation: "Cost-plus pricing adds a set markup to what the product costs to make. It's simple but ignores what customers are actually willing to pay."
          },
          {
            id: "mkt4-mastery4",
            question: "Launching a product cheap to grab market share fast, then raising the price, is called…",
            options: [
              "Price skimming",
              "Penetration pricing",
              "Cost-plus pricing",
              "Value-based pricing"
            ],
            correctAnswer: 1,
            explanation: "Penetration pricing enters low to win market share quickly, then raises prices later. Skimming does the reverse - high at launch, then lower."
          },
          {
            id: "mkt4-mastery5",
            question: "Why is price called the only P that generates revenue?",
            options: [
              "The other three Ps are illegal and no company is ever allowed to use them",
              "Product, place, and promotion all cost money instead",
              "Price is completely free to set with no thought or strategy behind it whatsoever",
              "The other Ps never matter at all and can be safely ignored by any smart marketer"
            ],
            correctAnswer: 1,
            explanation: "Product, place, and promotion are expenses; only price brings money in. That's why it's uniquely powerful in the marketing mix."
          },
          {
            id: "mkt4-mastery6",
            question: "During the 'maturity' stage of the product life cycle, sales typically…",
            options: [
              "Peak amid fierce competition",
              "Are just beginning at launch",
              "Have not started yet",
              "Are unaffected by rivals"
            ],
            correctAnswer: 0,
            explanation: "At maturity, sales peak and competition is intense, so marketing shifts toward defending market share rather than building awareness."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // mkt-5: The 4 Ps - Place & Promotion
  // ─────────────────────────────────────────────
  {
    lessonId: "mkt-5",
    sections: [
      {
        type: "concept",
        title: "Place: Getting Products to Customers",
        paragraphs: [
          "Place is about distribution - how a product gets from the maker to the customer, and where customers can buy it. The best product in the world fails if people can't easily get it. Place answers questions like: Do we sell online, in physical stores, or both? Do we sell directly to customers or through retailers? These choices are called distribution channels - the path a product travels to reach buyers. A short channel (maker sells straight to customer) keeps more profit; a long channel (maker to wholesaler to retailer to customer) reaches more people but shares the profit.",
          "Direct distribution means selling straight to customers - through your own website or store - keeping full control and profit but requiring you to handle everything. Indirect distribution uses middlemen like wholesalers and retailers who buy your product and resell it. A snack brand selling through grocery stores reaches millions it could never reach alone, but the stores take a cut. Each intermediary adds reach but takes a slice of the money, so businesses weigh how much reach they need against how much margin they're willing to give up.",
          "Distribution intensity is another choice. Intensive distribution puts a product everywhere possible - like gum sold in every corner store - ideal for cheap, everyday items. Selective distribution uses a limited set of outlets, common for mid-range brands. Exclusive distribution sells through very few outlets to create prestige - think a luxury watch available only in a handful of boutiques. The right strategy matches the product: convenience items go everywhere, while luxury items stay scarce on purpose, because being hard to get can make something feel more special and valuable."
        ],
        bullets: [
          "Place is distribution - how and where customers can buy the product.",
          "Distribution channels are the path a product travels to the buyer.",
          "Direct = sell straight to customers; indirect = use wholesalers and retailers.",
          "Each middleman adds reach but takes a cut of the profit.",
          "Intensive (everywhere), selective (limited), or exclusive (very few outlets)."
        ],
        realWorldExample: "A candy maker uses intensive distribution - its bars sit in gas stations, supermarkets, and vending machines everywhere. A luxury handbag brand does the opposite: exclusive distribution in just a few boutiques, so scarcity keeps the brand feeling prestigious and expensive."
      },
      {
        type: "concept",
        title: "Promotion: Communicating Value",
        paragraphs: [
          "Promotion is how a business communicates with customers to inform, persuade, and remind them about a product. It's the P people notice most, and it's far bigger than paid ads. The 'promotional mix' includes advertising (paid messages), public relations (earned coverage and reputation-building), sales promotions (temporary deals like coupons or discounts), personal selling (one-on-one persuasion), and direct marketing (emails, texts aimed straight at individuals). Each tool suits different goals: sales promotions spark quick action, while PR builds long-term trust.",
          "A major modern distinction is organic versus paid marketing. Paid marketing means buying attention - running ads on social media, search engines, or TV, where you pay for each view or click. Organic marketing means earning attention for free through valuable content, social posts, word of mouth, and search rankings you didn't pay for. A bakery posting mouth-watering photos that followers share is organic; paying to boost that post is paid. Organic builds slowly but cheaply and creates loyal audiences; paid is fast but stops the moment you stop spending. Most businesses blend both.",
          "The golden rule of promotion is reaching the right audience with the right message on the right channel. This ties back to knowing your customer: if your target scrolls a certain app, that's where you promote. Promotion also works best when it's consistent with the other Ps - the message must match the product's quality and price, or customers feel tricked. A cheap-looking ad for a luxury product breaks trust. Great promotion doesn't just grab attention; it clearly communicates the real value the product delivers, turning strangers into interested buyers and buyers into loyal fans."
        ],
        bullets: [
          "Promotion informs, persuades, and reminds customers about a product.",
          "The promotional mix includes advertising, PR, sales promotions, and selling.",
          "Paid marketing buys attention; organic marketing earns it for free.",
          "Organic builds slowly but cheaply; paid is fast but stops when spending stops.",
          "Reach the right audience with the right message on the right channel."
        ],
        realWorldExample: "A skincare startup grows organically with free skincare-tip videos that fans share, building a loyal following. Then it runs paid ads to that same audience before a launch. Organic built trust cheaply; paid amplified the message fast - the two working together."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mkt5-mc1",
            question: "In the marketing mix, 'Place' mainly refers to…",
            options: [
              "The color of the packaging chosen to catch a shopper's eye on the shelf",
              "How and where customers can buy the product",
              "The price of the product as it is printed on the tag at checkout",
              "The company's catchy slogan repeated at the end of every single advertisement"
            ],
            correctAnswer: 1,
            explanation: "Place is about distribution - the channels and locations through which a product reaches customers, whether online, in stores, direct, or through retailers."
          },
          {
            id: "mkt5-mc2",
            question: "What is the difference between organic and paid marketing?",
            options: [
              "Organic earns attention for free; paid buys attention",
              "Organic is always on TV; paid is always online",
              "Paid marketing is illegal unless a special government license is bought first",
              "There is no difference at all between organic marketing and paid marketing"
            ],
            correctAnswer: 0,
            explanation: "Organic marketing earns attention through free content and word of mouth; paid marketing buys attention through ads you pay for per view or click."
          }
        ]
      },
      {
        type: "scenario",
        title: "Maya Launches a Sauce Brand",
        narrative: "Maya makes a hot sauce and must decide how to distribute and promote it on a tight budget. She weighs selling directly online versus getting into stores, and building a free social following versus buying ads right away.",
        details: [
          "Selling on her own website is direct distribution - full profit but limited reach.",
          "Getting into grocery stores is indirect distribution - wider reach but stores take a cut.",
          "Posting recipe videos to build a free following is organic marketing.",
          "Boosting those posts with paid ads would be faster but costs money she's short on."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mkt5-aq1",
          question: "With a tight budget, why might Maya start with organic marketing before paid ads?",
          options: [
            "Organic marketing is guaranteed to go viral and always reaches millions overnight for free",
            "It builds an audience cheaply, though more slowly",
            "Paid ads are illegal for food products, so no snack brand may ever run one",
            "Organic marketing reaches zero people no matter how good or shareable the content is"
          ],
          correctAnswer: 1,
          explanation: "Organic marketing earns attention for free, letting Maya build an audience on a tight budget. It's slower than paid ads but doesn't drain money she doesn't have."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Place is distribution - how and where customers buy the product.",
          "Direct selling keeps profit; indirect channels add reach but share it.",
          "Distribution can be intensive, selective, or exclusive to fit the product.",
          "Promotion informs and persuades via ads, PR, promotions, and selling.",
          "Organic marketing earns attention free; paid buys it fast - most blend both."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mkt5-mastery1",
            question: "A distribution channel is…",
            options: [
              "A TV station that airs ads during the most expensive evening time slots",
              "The path a product travels to reach buyers",
              "The price tag on a product that a cashier scans at the checkout counter",
              "A type of coupon handed out at the register to save shoppers a little money"
            ],
            correctAnswer: 1,
            explanation: "A distribution channel is the route a product takes from maker to customer, whether direct or through wholesalers and retailers."
          },
          {
            id: "mkt5-mastery2",
            question: "Selling through wholesalers and retailers instead of straight to customers is…",
            options: [
              "Direct distribution",
              "Indirect distribution",
              "Exclusive pricing",
              "Organic promotion"
            ],
            correctAnswer: 1,
            explanation: "Using middlemen like wholesalers and retailers is indirect distribution - it adds reach but each intermediary takes a cut of the profit."
          },
          {
            id: "mkt5-mastery3",
            question: "A luxury watch sold in only a few boutiques uses which distribution intensity?",
            options: [
              "Intensive distribution",
              "Exclusive distribution",
              "Selective distribution",
              "Direct-to-everyone distribution"
            ],
            correctAnswer: 1,
            explanation: "Exclusive distribution sells through very few outlets to create prestige and scarcity, which fits a luxury product."
          },
          {
            id: "mkt5-mastery4",
            question: "Which is part of the promotional mix?",
            options: [
              "Large regional distribution warehouses and depots",
              "Sales promotions like coupons",
              "Heavy factory machinery on the assembly line",
              "The product's raw materials"
            ],
            correctAnswer: 1,
            explanation: "The promotional mix includes advertising, PR, sales promotions (like coupons), personal selling, and direct marketing - all ways of communicating with customers."
          },
          {
            id: "mkt5-mastery5",
            question: "A key drawback of paid marketing compared to organic is that…",
            options: [
              "It reaches no one at all",
              "Attention stops when you stop paying",
              "It is completely free with no cost ever",
              "It builds deep trust instantly and keeps it forever"
            ],
            correctAnswer: 1,
            explanation: "Paid marketing is fast but attention disappears the moment you stop spending. Organic builds more slowly but keeps working without ongoing cost."
          },
          {
            id: "mkt5-mastery6",
            question: "The 'golden rule' of promotion is to reach…",
            options: [
              "As many random people as possible, whether or not they could ever want the product",
              "The right audience with the right message and channel",
              "Only your own employees, since coworkers are the only people worth advertising to at all",
              "People who never buy anything, because reaching non-buyers is somehow the smartest move"
            ],
            correctAnswer: 1,
            explanation: "Effective promotion targets the right audience with the right message on the channel they use - which is why knowing your customer matters so much."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // mkt-6: Branding
  // ─────────────────────────────────────────────
  {
    lessonId: "mkt-6",
    sections: [
      {
        type: "concept",
        title: "A Brand Is a Promise, Not a Logo",
        paragraphs: [
          "People think a brand is a logo or a name, but it's much deeper: a brand is the total impression and set of feelings people have about a business. It's the promise a company makes and the reputation it earns by keeping it. A logo, colors, and slogan are just the visible signals; the real brand lives in customers' minds. When you hear a company's name and instantly feel 'reliable' or 'cool' or 'cheap,' that feeling is the brand. It's built through every experience - the product, the service, the ads, even how complaints are handled.",
          "A strong brand shapes how a company communicates through its brand voice - the consistent personality in its words and images. One brand might be playful and joking; another serious and expert; another warm and caring. That voice should stay recognizable everywhere - website, ads, packaging, social media - so customers feel they're dealing with the same familiar 'person.' Inconsistency confuses people: if a brand is silly on Instagram but stiff in emails, it feels fake. Consistency is what makes a brand feel trustworthy and real over time.",
          "Branding matters because it builds trust, and trust drives choice. Faced with two similar products, people pick the brand they recognize and believe in - even at a higher price. A shopper grabs the familiar cereal over an unknown one because the brand promises a known experience, reducing the risk of disappointment. This is the whole point: a brand lowers the customer's perceived risk. The more a brand reliably delivers on its promise, the more customers trust it, return to it, and recommend it - turning a product into something people feel loyal to."
        ],
        bullets: [
          "A brand is the total impression and feelings people have about a business.",
          "Logos, colors, and slogans are signals; the real brand lives in customers' minds.",
          "Brand voice is the consistent personality in a company's words and images.",
          "Consistency across channels makes a brand feel trustworthy and real.",
          "A strong brand lowers perceived risk, so people choose it even at a higher price."
        ],
        realWorldExample: "Two bottles of water sit side by side. One is a trusted brand you've had before; one is unknown. Most people grab the familiar one, sometimes paying more - not because the water differs, but because the brand promises a known, safe experience."
      },
      {
        type: "concept",
        title: "Brand Equity and Building Loyalty",
        paragraphs: [
          "The measurable value a brand adds is called brand equity - the extra worth a product has simply because of its brand. Two identical shirts can sell for wildly different prices if one carries a beloved logo and the other doesn't. That price gap is brand equity in action. High brand equity lets companies charge more, launch new products more easily (customers already trust the name), and survive mistakes better, because loyal fans forgive a strong brand faster than an unknown one. Brand equity is one of a company's most valuable, if invisible, assets.",
          "Brand equity is built slowly through consistency and delivering on the promise, again and again. Every good experience adds to it; every broken promise chips it away. A brand that says 'premium quality' but ships flimsy products destroys its own equity fast. This is why the brand and the actual product must match - branding can't be a mask over a bad offering for long. The strongest brands align what they say with what they consistently do, so the reputation in customers' minds matches reality.",
          "The ultimate payoff of branding is loyalty - customers who return again and again and tell others. Loyal customers are gold: they cost nothing to re-acquire, spend more over time, and become free advocates who bring in new buyers through word of mouth. Some brands build such strong loyalty that fans defend them and line up for new releases. This loyalty is fragile, though - it must be continually earned by keeping the brand promise. Branding, done right, transforms a business from selling products to building lasting relationships that competitors find very hard to steal."
        ],
        bullets: [
          "Brand equity is the extra value a product gains from its brand.",
          "High equity lets companies charge more and launch new products easily.",
          "Equity is built slowly by consistently delivering on the brand promise.",
          "The brand and the actual product must match, or trust collapses.",
          "Loyal customers return, spend more, and advocate for free."
        ],
        realWorldExample: "A famous sneaker brand can release a new shoe and fans camp overnight to buy it - that's brand equity and loyalty. A no-name brand making similar shoes must slash prices just to get noticed, because it has no equity built up yet."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mkt6-mc1",
            question: "What is a brand, most accurately?",
            options: [
              "Just a company's logo and colors printed on the sign above the front door",
              "The total impression and feelings people have about a business",
              "The factory that makes the product, packs it into boxes, and ships it to stores",
              "The price printed on a tag that a cashier scans at the register during checkout"
            ],
            correctAnswer: 1,
            explanation: "A brand is the whole impression and set of feelings customers hold about a business - the logo is only a visible signal of that deeper reputation."
          },
          {
            id: "mkt6-mc2",
            question: "What is 'brand equity'?",
            options: [
              "The cost of printing a logo onto the package, the sign, and the shopping bags",
              "The extra value a product gains from its brand",
              "The number of employees a company has working across all of its offices and stores",
              "A special tax on famous companies charged simply because their name is widely known"
            ],
            correctAnswer: 1,
            explanation: "Brand equity is the added value a product carries because of its brand - letting it command higher prices than an identical unbranded item."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Coffee Brands, One Choice",
        narrative: "Priya is choosing between two bags of coffee. One is a brand she's bought many times and trusts; the other is unknown but a dollar cheaper. She notices herself reaching for the familiar one despite the higher price.",
        details: [
          "The familiar brand has built trust through consistently good coffee over time.",
          "That trust is brand equity - Priya will pay more for the known experience.",
          "The unknown brand, lacking equity, must compete mainly on a lower price.",
          "If the familiar brand shipped one bad batch, it would chip away at that trust."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mkt6-aq1",
          question: "Why does Priya pay more for the familiar coffee brand?",
          options: [
            "Familiar brands are always cheaper than every unknown brand on the very same shelf",
            "The brand's equity lowers her risk of disappointment",
            "Unknown brands are illegal to sell without a special permit from the government first",
            "She dislikes saving money on purpose and enjoys overpaying whenever she gets the chance"
          ],
          correctAnswer: 1,
          explanation: "The trusted brand's equity promises a known, reliable experience, lowering Priya's perceived risk. That's why she'll pay more than for an unproven cheaper option."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A brand is the total impression and feelings people have about a business.",
          "Brand voice is the consistent personality across all a company's messages.",
          "Consistency builds trust; inconsistency makes a brand feel fake.",
          "Brand equity is the extra value a product gains from its brand.",
          "Delivering on the brand promise builds loyalty - customers who return and refer."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mkt6-mastery1",
            question: "Where does a brand truly 'live'?",
            options: [
              "Only on the product's packaging where the logo is printed in bright colors",
              "In the minds and feelings of customers",
              "In the company's accounting books listed neatly as a line of numbers",
              "In the factory warehouse stacked on shelves right beside the finished products"
            ],
            correctAnswer: 1,
            explanation: "A brand lives in customers' minds as the impression and feelings they hold. Logos and packaging are just visible signals of it."
          },
          {
            id: "mkt6-mastery2",
            question: "What is 'brand voice'?",
            options: [
              "The sheer volume of a company's ads counted across TV, radio, and every website",
              "The consistent personality in a brand's words and images",
              "A famous singer hired to perform the catchy jingle in a big holiday commercial",
              "The price of the product as it appears printed on the tag at the checkout counter"
            ],
            correctAnswer: 1,
            explanation: "Brand voice is the consistent personality - playful, expert, warm - that a brand shows in its words and visuals across all channels."
          },
          {
            id: "mkt6-mastery3",
            question: "Why is consistency important for a brand?",
            options: [
              "It makes the brand feel trustworthy and real",
              "It lets the brand raise taxes on rivals and pocket the extra money for itself",
              "It removes the need for a product entirely, so nothing has to be built or sold",
              "It confuses customers on purpose so they can never tell one brand from another"
            ],
            correctAnswer: 0,
            explanation: "A consistent brand feels like the same familiar 'person' everywhere, which builds trust. Inconsistency makes a brand feel fake and confusing."
          },
          {
            id: "mkt6-mastery4",
            question: "High brand equity allows a company to…",
            options: [
              "Charge more and launch new products easily",
              "Avoid making any products at all and still somehow stay in business",
              "Ignore its customers safely without any risk of ever losing their loyalty",
              "Never advertise again forever and trust that sales will keep climbing anyway"
            ],
            correctAnswer: 0,
            explanation: "Strong brand equity lets a company command higher prices, launch new products on existing trust, and recover from mistakes more easily."
          },
          {
            id: "mkt6-mastery5",
            question: "What happens when a brand's promise doesn't match its actual product?",
            options: [
              "Trust and brand equity collapse over time",
              "The brand automatically grows stronger and more trusted with every broken promise",
              "Customers never notice at all, even after being let down again and again",
              "Prices are forced to rise by a strict law whenever a brand disappoints its buyers"
            ],
            correctAnswer: 0,
            explanation: "Branding can't mask a bad product for long. When the promise and reality don't match, trust erodes and brand equity is destroyed."
          },
          {
            id: "mkt6-mastery6",
            question: "Why are loyal customers so valuable to a brand?",
            options: [
              "They demand constant discounts and refuse to ever pay the full price again",
              "They return, spend more, and refer others for free",
              "They never buy anything twice and walk away right after their very first purchase",
              "They cost far more than new customers to keep happy and loyal over the years"
            ],
            correctAnswer: 1,
            explanation: "Loyal customers return again and again, spend more over time, and act as free advocates who bring in new buyers through word of mouth."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // mkt-7: Consumer Decision-Making
  // ─────────────────────────────────────────────
  {
    lessonId: "mkt-7",
    sections: [
      {
        type: "concept",
        title: "The Journey From Stranger to Buyer",
        paragraphs: [
          "Customers rarely buy on impulse for anything that matters; they move through a journey, and understanding it helps businesses meet people at each step. The classic buyer journey has stages: awareness, consideration, decision, and then loyalty. Awareness is when a person first realizes they have a need or discovers a product exists. Consideration is when they research options and compare choices. Decision is when they actually buy. Loyalty is what happens after - whether they return and recommend. Marketing must do a different job at each stage, not just shout 'buy now' at everyone.",
          "It often starts with problem recognition: the customer feels a gap between where they are and where they want to be. Maybe their old phone keeps dying, sparking the need for a new one. Then comes the information search - they read reviews, ask friends, watch videos, and compare. This is why online reviews and word of mouth are so powerful: most buyers research before deciding. A business that shows up helpfully during this search - with clear info and good reviews - earns a spot on the shortlist.",
          "Next is evaluating alternatives, where the buyer weighs options against what they care about - price, quality, features, brand. Then the purchase decision, where even a ready buyer can be lost to a confusing checkout, a surprise fee, or a bad final impression. Smart marketers smooth every step: easy comparisons during consideration, a frictionless purchase, and reassurance right after. Meeting the customer with the right message for their current stage - educational content early, a clear offer at decision time - is far more effective than blasting the same sales pitch at everyone."
        ],
        bullets: [
          "The buyer journey: awareness, consideration, decision, and loyalty.",
          "Problem recognition is the gap that starts the journey.",
          "During information search, reviews and word of mouth are powerful.",
          "Buyers evaluate alternatives against price, quality, features, and brand.",
          "Marketing must match its message to the customer's current stage."
        ],
        realWorldExample: "Someone whose laptop dies becomes aware of a need, spends a week reading reviews and comparing brands (consideration), buys the one with the best value (decision), then loves it and recommends it to friends (loyalty). Marketing that helped at each step won the sale."
      },
      {
        type: "concept",
        title: "What Really Drives the Choice",
        paragraphs: [
          "People like to think they buy logically, but emotion drives far more than we admit. Buyers are influenced by feelings, identity, and social pressure - not just facts and price. A car isn't only transport; it signals status or values. Marketers appeal to both the rational side (features, price, specs) and the emotional side (how the product makes you feel or who it says you are). The strongest marketing connects a practical benefit to an emotional one: 'this saves you time' plus 'so you can be present with your family.'",
          "Social influences shape decisions heavily. People look to reviews, friends, and 'social proof' - the sense that if many others chose something, it must be good. A product with thousands of positive reviews feels safer than one with none, even if quality is identical. This is why testimonials, ratings, and 'bestseller' labels work: they reduce the fear of a bad choice. Reference groups - the people we identify with - also sway us; we buy what people 'like us' buy, which is why marketers target specific communities and lifestyles.",
          "The journey doesn't end at purchase - the post-purchase stage decides loyalty. After buying, customers judge whether the product met expectations. If it does, they feel satisfied and may return and recommend; if it disappoints, they feel 'buyer's remorse' and warn others. Companies fight this with follow-up support, easy returns, and reassurance that customers made a good choice. Because keeping a customer is far cheaper than winning a new one, the smartest businesses invest heavily in this final stage - turning a single purchase into repeat business and a stream of word-of-mouth referrals."
        ],
        bullets: [
          "Emotion, identity, and social pressure drive buying more than we admit.",
          "The best marketing links a practical benefit to an emotional one.",
          "Social proof (reviews, ratings, bestseller labels) reduces fear of a bad choice.",
          "Reference groups - people we identify with - shape what we buy.",
          "The post-purchase stage decides loyalty; satisfaction drives repeat business."
        ],
        realWorldExample: "A shopper picks a blender with 5,000 five-star reviews over an unrated one at the same price - that's social proof. Afterward, a friendly 'thanks, here's how to get the most from it' email reassures them, turning one purchase into a loyal, repeat customer."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mkt7-mc1",
            question: "Which is the usual order of the buyer journey?",
            options: [
              "Decision, awareness, loyalty, consideration",
              "Awareness, consideration, decision, loyalty",
              "Loyalty, decision, consideration, awareness",
              "Consideration, loyalty, awareness, decision"
            ],
            correctAnswer: 1,
            explanation: "The buyer journey typically flows from awareness to consideration to decision, and then to loyalty after the purchase."
          },
          {
            id: "mkt7-mc2",
            question: "What is 'social proof' in buying decisions?",
            options: [
              "A printed receipt proving you already paid the full amount at the register",
              "Evidence others chose it, making it feel safer to buy",
              "A legal document required for every sale and signed by both the buyer and the seller",
              "The factory's official safety certificate hung on the wall near the assembly line"
            ],
            correctAnswer: 1,
            explanation: "Social proof is the sense that if many others chose a product (via reviews and ratings), it's a safer bet - reducing the fear of a bad choice."
          }
        ]
      },
      {
        type: "scenario",
        title: "Tariq Buys Headphones",
        narrative: "Tariq's old headphones break, kicking off a buying journey. He researches for days, compares brands, reads reviews, and finally buys a pair. His experience afterward decides whether he'll ever buy from that brand again.",
        details: [
          "His broken headphones trigger problem recognition - the start of the journey.",
          "He reads dozens of reviews (information search) and compares options (evaluating alternatives).",
          "Thousands of positive reviews act as social proof, reassuring his final decision.",
          "A helpful follow-up email after purchase makes him satisfied and likely to return."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mkt7-aq1",
          question: "Why do the thousands of positive reviews strongly influence Tariq's decision?",
          options: [
            "Reviews set the legal price of headphones, and a store may never charge a cent more than they say",
            "They act as social proof, lowering his fear of a bad choice",
            "Reviews are required before any purchase, so no shopper may check out until they read several first",
            "They make the headphones physically better, upgrading the sound quality the moment someone posts a rating"
          ],
          correctAnswer: 1,
          explanation: "Many positive reviews are social proof - the sense that if lots of others chose well, it's a safer bet. This reduces Tariq's fear of making a bad choice."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The buyer journey runs from awareness to consideration to decision to loyalty.",
          "Problem recognition starts it; information search and reviews shape it.",
          "Emotion and identity drive buying more than pure logic.",
          "Social proof and reference groups strongly sway decisions.",
          "The post-purchase stage decides loyalty and repeat business."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mkt7-mastery1",
            question: "What kicks off the buyer journey?",
            options: [
              "The final purchase itself, made at the very last step of the whole journey",
              "Problem recognition - feeling a need or gap",
              "Writing a product review long after the item has already been used for weeks",
              "Receiving a loyalty reward that arrives only after many repeat purchases over time"
            ],
            correctAnswer: 1,
            explanation: "The journey begins with problem recognition: the customer senses a gap between where they are and where they want to be."
          },
          {
            id: "mkt7-mastery2",
            question: "During the 'consideration' stage, a customer is mainly…",
            options: [
              "Unaware any product exists",
              "Researching and comparing options",
              "Already loyal and recommending",
              "Returning the product for a refund"
            ],
            correctAnswer: 1,
            explanation: "In consideration, the buyer researches, reads reviews, and compares choices before deciding. Awareness comes before; decision comes after."
          },
          {
            id: "mkt7-mastery3",
            question: "The strongest marketing often connects a practical benefit to…",
            options: [
              "An emotional benefit",
              "A higher tax rate",
              "A longer factory line",
              "A confusing checkout"
            ],
            correctAnswer: 0,
            explanation: "Great marketing links the rational benefit (saves time) to an emotional one (be present with family), appealing to both sides of the buyer."
          },
          {
            id: "mkt7-mastery4",
            question: "A 'bestseller' label works because it provides…",
            options: [
              "Social proof that others chose it",
              "A binding legal guarantee of quality signed by the maker",
              "A lower price applied automatically at the checkout counter",
              "Free shipping every time on every order with no minimum spend"
            ],
            correctAnswer: 0,
            explanation: "A 'bestseller' label is social proof - it signals that many others chose the product, making it feel like a safer choice."
          },
          {
            id: "mkt7-mastery5",
            question: "Why is the post-purchase stage so important?",
            options: [
              "It has no effect on the customer",
              "It determines loyalty and repeat business",
              "It sets the product's factory cost",
              "It only matters for the first sale"
            ],
            correctAnswer: 1,
            explanation: "After buying, satisfaction decides whether customers return and recommend. Since keeping a customer is cheaper than winning one, this stage is crucial."
          },
          {
            id: "mkt7-mastery6",
            question: "A 'reference group' influences buying because people tend to…",
            options: [
              "Avoid buying anything popular and always pick the item nobody else owns",
              "Buy what people they identify with buy",
              "Ignore everyone else's choices completely and decide with zero outside influence",
              "Only trust random strangers online while dismissing their own close friends entirely"
            ],
            correctAnswer: 1,
            explanation: "Reference groups are the people we identify with; we're drawn to buy what people 'like us' buy, which marketers use to target communities."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // mkt-8: Testing Your Ideas
  // ─────────────────────────────────────────────
  {
    lessonId: "mkt-8",
    sections: [
      {
        type: "concept",
        title: "Test Before You Bet Everything",
        paragraphs: [
          "The riskiest thing in business is spending months and all your money building something before checking whether anyone wants it. Testing ideas early avoids that trap. It starts with a hypothesis - a clear, testable guess about what will work. Not 'people will love my app,' but 'students will pay $5/month for a study app that summarizes notes.' A good hypothesis is specific enough to prove right or wrong with real data. Framing your belief as a testable hypothesis forces honesty: you're now looking for evidence, not just hoping.",
          "A powerful tool is the MVP - Minimum Viable Product - the simplest version of your idea that real customers can actually try. Instead of building a fully polished product, you build just enough to test the core assumption, release it, and learn. If your idea is a meal-delivery service, an MVP might be cooking for ten local customers by hand before building an app or renting a kitchen. The MVP answers the scariest question - 'will anyone actually pay?' - cheaply and fast, before you sink real money into scaling.",
          "This approach is called 'iterate': test, learn from real feedback, improve, and test again in a loop. Each cycle sharpens the product based on what customers actually do, not what you assumed. The mindset shift is treating your first idea as a guess to be tested rather than a truth to be defended. Founders who fall in love with their original plan and ignore feedback often build something nobody wants. Those who test, listen, and adjust steadily converge on what the market actually values - the whole point of testing."
        ],
        bullets: [
          "Test ideas early to avoid building something nobody wants.",
          "A hypothesis is a specific, testable guess you can prove right or wrong.",
          "An MVP is the simplest version customers can actually try.",
          "The MVP cheaply answers the scary question: will anyone pay?",
          "Iterate: test, learn, improve, and test again in a loop."
        ],
        realWorldExample: "Before building an app, a founder testing a dog-walking service simply posted flyers and walked five real dogs herself. That cheap MVP proved demand and revealed what owners actually wanted - saving her from building an expensive app for a service no one needed."
      },
      {
        type: "concept",
        title: "A/B Testing and Letting Data Decide",
        paragraphs: [
          "Once you have something real, you can test specific choices with A/B testing: showing two versions to different groups and measuring which performs better. Say you're unsure whether a 'Buy Now' or 'Get Started' button gets more clicks. You show version A to half your visitors and version B to the other half, then compare. The winner isn't decided by opinion or the loudest person in the room - it's decided by real behavior. A/B testing replaces arguments with evidence, and small tweaks tested this way can meaningfully boost results.",
          "The key to trustworthy testing is changing one thing at a time and using a big enough group. If you change the button color AND the headline AND the price all at once, and sales rise, you won't know which change caused it. Isolating one variable keeps the test clean. And a test on just five people can mislead by random luck; a larger sample gives results you can trust. This is the same discipline as good market research: honest tests, fair samples, and a willingness to be proven wrong.",
          "The deepest lesson is to let data guide decisions instead of ego or guesswork. It's tempting to keep a feature you personally love even when users ignore it, or to trust a gut feeling over the numbers. Data-driven businesses run small, cheap tests constantly, keep what works, and drop what doesn't - improving steadily rather than betting everything on one big untested launch. Testing turns risky guesses into a series of low-cost experiments, which is why it's one of the most valuable habits a young entrepreneur can build early."
        ],
        bullets: [
          "A/B testing shows two versions to different groups to see which wins.",
          "The winner is decided by real behavior, not opinion.",
          "Change one thing at a time so you know what caused the result.",
          "Use a big enough sample so results aren't random luck.",
          "Let data guide decisions instead of ego or guesswork."
        ],
        realWorldExample: "An online store wasn't sure which headline sold more. It ran an A/B test: half of visitors saw 'Save 20% Today,' half saw 'Free Shipping.' 'Free Shipping' won by a wide margin. One cheap test, backed by real behavior, beat weeks of the team arguing over opinions."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mkt8-mc1",
            question: "What is an MVP (Minimum Viable Product)?",
            options: [
              "The most expensive version of a product",
              "The simplest version customers can actually try",
              "A finished, fully polished product with every feature completely done",
              "A type of advertising campaign that runs across TV and social media"
            ],
            correctAnswer: 1,
            explanation: "An MVP is the simplest workable version of an idea, built to test the core assumption with real customers cheaply before scaling up."
          },
          {
            id: "mkt8-mc2",
            question: "In A/B testing, how is the winning version decided?",
            options: [
              "By the boss's personal opinion, decided alone without asking a single real user",
              "By which version real users respond to better",
              "By a coin flip tossed fresh each morning before the team starts its work",
              "By whichever version costs the most money and effort to design and build out"
            ],
            correctAnswer: 1,
            explanation: "A/B testing shows two versions to different groups and lets real user behavior - not opinion - decide which performs better."
          }
        ]
      },
      {
        type: "scenario",
        title: "Nia Tests Her Snack Box",
        narrative: "Nia has an idea for a healthy snack subscription box. Instead of spending her savings building a website and buying inventory, she runs cheap tests first to see if people actually want it and what they'll pay.",
        details: [
          "Her hypothesis: busy office workers will pay $20/month for a healthy snack box.",
          "Her MVP: she hand-delivers boxes to 15 local workers before building any website.",
          "She A/B tests two sign-up pages, changing only the price to see which converts better.",
          "She uses the real results to iterate, adjusting the box and price before scaling up."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mkt8-aq1",
          question: "Why does Nia change ONLY the price between her two A/B test pages?",
          options: [
            "To make the test take much longer than it truly needs to take at all",
            "So she knows the price caused any difference in sign-ups",
            "Because testing is required by law and skipping it can get her business fined heavily",
            "To confuse her potential customers so badly that they can't decide whether to sign up"
          ],
          correctAnswer: 1,
          explanation: "Changing one variable at a time keeps the test clean. By varying only price, Nia can be sure any change in sign-ups came from the price, not something else."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Test ideas early to avoid building something nobody wants.",
          "A hypothesis is a specific, testable guess about what will work.",
          "An MVP is the simplest version customers can try to answer 'will anyone pay?'",
          "A/B testing lets real behavior decide between two versions.",
          "Change one thing at a time, use big samples, and let data lead."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mkt8-mastery1",
            question: "Which is a well-formed, testable hypothesis?",
            options: [
              "People will love my app someday, though I can't say who, why, or when",
              "Students will pay $5/month for a note-summarizing app",
              "My idea is the best idea ever thought up by anyone in the entire world",
              "Everyone everywhere wants this, from little kids to grandparents, in every country on earth"
            ],
            correctAnswer: 1,
            explanation: "A good hypothesis is specific and testable with real data. 'Students will pay $5/month...' can be proven right or wrong; the others are vague."
          },
          {
            id: "mkt8-mastery2",
            question: "The main purpose of building an MVP is to…",
            options: [
              "Impress investors with polish and a flashy design before a single user tries it",
              "Cheaply test whether anyone actually wants it",
              "Spend as much money as possible building every feature before showing anyone at all",
              "Avoid ever talking to customers and simply guess what they might want on your own"
            ],
            correctAnswer: 1,
            explanation: "An MVP tests the core assumption - will anyone pay? - cheaply and fast, before investing heavily in building and scaling the full product."
          },
          {
            id: "mkt8-mastery3",
            question: "What does it mean to 'iterate' on a product?",
            options: [
              "Build it once and never change it, no matter what any customer says afterward",
              "Test, learn, improve, and test again in a loop",
              "Copy a competitor exactly, matching every single feature they already offer their users",
              "Ignore all customer feedback and trust your own gut about what people secretly want"
            ],
            correctAnswer: 1,
            explanation: "Iterating means repeatedly testing, learning from real feedback, improving, and testing again - steadily converging on what customers value."
          },
          {
            id: "mkt8-mastery4",
            question: "Why should you change only one variable in an A/B test?",
            options: [
              "To make the test more confusing so nobody can figure out what actually happened",
              "So you know which change caused the result",
              "Because tests must be very slow and drawn out over many long and pointless weeks",
              "To avoid getting any useful data at all from the customers who try each version"
            ],
            correctAnswer: 1,
            explanation: "Isolating one variable keeps the test clean. If you change many things at once, you can't tell which one caused the difference in results."
          },
          {
            id: "mkt8-mastery5",
            question: "Why can a test on just five people be misleading?",
            options: [
              "Five is an illegal sample size that regulators have officially banned for any test",
              "A tiny sample can be skewed by random luck",
              "Small groups always give perfect answers that match the whole market exactly every time",
              "Tests need exactly one person and adding anyone else somehow ruins the entire result"
            ],
            correctAnswer: 1,
            explanation: "A very small sample can be thrown off by random luck. A larger, representative sample gives results you can actually trust."
          },
          {
            id: "mkt8-mastery6",
            question: "The core mindset behind testing ideas is to…",
            options: [
              "Defend your first idea no matter what, brushing off every doubt that anyone ever raises",
              "Treat your idea as a guess to be tested",
              "Never listen to customer data and dismiss any number that disagrees with your gut feeling",
              "Launch big without any evidence and pour your whole budget into an untested, unproven idea"
            ],
            correctAnswer: 1,
            explanation: "Testing means treating your first idea as a guess to be tested, not a truth to defend - letting evidence, not ego, guide what you build."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // ethics-1: What is Business Ethics
  // ─────────────────────────────────────────────
  {
    lessonId: "ethics-1",
    sections: [
      {
        type: "concept",
        title: "Ethics Is the 'Should,' Not Just the 'Can'",
        paragraphs: [
          "Business ethics is the set of moral principles that guide how a company behaves - the difference between what a business can do and what it should do. The law sets a floor: the minimum you're required to follow. Ethics aims higher, at what's genuinely right and fair even when no law forces it. A company might legally use a supplier that pays terrible wages, but choosing not to is an ethical decision. Ethics fills the huge gray zone where the law is silent but the choice still affects real people.",
          "Something can be legal but still unethical, and that gap matters. It may be perfectly legal to sell a product with a confusing fee buried in fine print, but doing so to trick customers is unethical. History is full of harmful practices that were once legal until society decided they were wrong. Waiting for the law to ban something before you stop doing it is a weak standard. Ethical businesses ask 'is this fair and honest?' - not just 'can we get away with it?' - because trust, once broken, is far harder to rebuild than to keep.",
          "Ethics matters practically, not just morally. Customers, employees, and investors increasingly reward businesses they trust and punish those they don't. An unethical shortcut might boost profit briefly, but scandals cause boycotts, lawsuits, lost talent, and collapsing reputations. Meanwhile, ethical companies attract loyal customers and dedicated employees who are proud of where they work. The old idea that 'ethics and profit are enemies' is largely a myth: over the long run, treating people fairly and honestly tends to build the trust that sustainable success is built on."
        ],
        bullets: [
          "Business ethics is about what a company should do, beyond what it legally can.",
          "The law is a floor - the minimum; ethics aims higher at what's right.",
          "Something can be perfectly legal yet still unethical.",
          "Waiting for a law to ban something before stopping is a weak standard.",
          "Ethical behavior builds the trust that long-term success depends on."
        ],
        realWorldExample: "A payday lender can legally charge desperate borrowers sky-high fees hidden in fine print. It's legal, but tricking vulnerable people is unethical. A lender that clearly explains costs earns less per loan but builds trust and avoids the backlash that sinks predatory firms."
      },
      {
        type: "concept",
        title: "Why Ethics Is Harder Than It Sounds",
        paragraphs: [
          "If ethics were obvious, no one would struggle with it - but real business decisions are genuinely hard. Pressures push people toward cutting corners: a sales target that's impossible to hit honestly, a boss who rewards results and ignores methods, or a competitor who cheats and seems to win. These pressures create a slippery slope where small compromises ('just round up this one number') grow into big ones. Understanding that good people can drift into unethical acts under pressure is the first step to guarding against it.",
          "Ethics also involves conflicting duties. A manager might feel loyal to their company, their customers, their employees, and their own conscience all at once - and sometimes these clash. Cutting staff might help shareholders but hurt loyal workers. There's rarely a formula that spits out the 'correct' answer; ethics requires judgment, weighing who is affected and how. This is why businesses create codes of conduct - written standards of expected behavior - to give employees clear guidance before the pressure hits, so decisions aren't made in a panic.",
          "A simple set of gut-checks helps navigate hard calls. The transparency test: would you be comfortable if this decision were made public? The reversibility test: would you accept this if you were on the receiving end? The role-model test: would you be proud to explain this to someone you respect? None of these is perfect, but together they cut through rationalization. Business ethics isn't about being naive or ignoring profit - it's about making money in ways you can stand behind, so success is something to be proud of rather than something to hide."
        ],
        bullets: [
          "Pressures like tough targets and cheating rivals push people to cut corners.",
          "Small compromises can snowball into big ethical failures (the slippery slope).",
          "Ethics often means weighing conflicting duties with judgment, not a formula.",
          "Codes of conduct give clear guidance before pressure hits.",
          "Gut-checks: transparency, reversibility, and role-model tests."
        ],
        realWorldExample: "A sales rep under an impossible quota is tempted to promise features the product doesn't have. It might close the deal today, but the customer feels cheated tomorrow. Applying the reversibility test - 'would I want to be lied to?' - makes the ethical choice clear."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ethics1-mc1",
            question: "How do business ethics differ from the law?",
            options: [
              "Ethics and law are exactly the same, so anything legal is automatically the right thing",
              "Law is the minimum; ethics aims at what's genuinely right",
              "Ethics is only for nonprofits and never applies to any company trying to earn a profit",
              "Law always requires much more than ethics ever could, covering every possible moral question"
            ],
            correctAnswer: 1,
            explanation: "The law sets a minimum floor of required behavior. Ethics aims higher - at what is fair and right - even when no law forces it."
          },
          {
            id: "ethics1-mc2",
            question: "Which statement is true about legality and ethics?",
            options: [
              "If it's legal, it must be ethical, since the law already settles every moral question",
              "Something can be legal yet still unethical",
              "Ethics doesn't apply to businesses and matters only for churches and private individuals",
              "Only illegal acts can be unethical, so nothing allowed by law could ever count as wrong"
            ],
            correctAnswer: 1,
            explanation: "Legal and ethical aren't the same. Tricking customers with hidden fees may be legal but is still unethical - the law is silent on much that harms people."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Fine-Print Temptation",
        narrative: "Ravi manages a subscription service. He discovers he could boost profit by making cancellation hard to find and quietly auto-renewing customers at a higher price. It would be legal if disclosed in tiny fine print, but he pauses to consider whether it's right.",
        details: [
          "Hiding the cancellation option in fine print would technically be legal.",
          "It would still be unethical because it deliberately tricks trusting customers.",
          "If exposed, the tactic could trigger backlash, bad press, and lost trust.",
          "The transparency test fails: Ravi wouldn't want customers to see how it works."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ethics1-aq1",
          question: "Why is Ravi's fine-print auto-renewal plan unethical even if it's legal?",
          options: [
            "Because all subscriptions are illegal",
            "Because it deliberately deceives trusting customers",
            "Because it would lower the company's profit",
            "Because fine print is banned everywhere"
          ],
          correctAnswer: 1,
          explanation: "Legality is the floor, not the goal. Deliberately hiding cancellation to trick customers is deceptive and unfair - unethical even where the law permits it."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Business ethics is about what a company should do, beyond mere legality.",
          "The law is a minimum floor; ethics aims higher at fairness and honesty.",
          "Something can be legal yet clearly unethical.",
          "Pressures and small compromises can lead good people into unethical acts.",
          "Transparency, reversibility, and role-model tests guide hard decisions."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "ethics1-mastery1",
            question: "Business ethics is best described as…",
            options: [
              "The bare minimum that the law strictly requires and nothing more than that",
              "Moral principles guiding what a company should do",
              "A company's tax strategy for lowering the bill it owes the government each year",
              "The narrow set of rules that govern advertising and nothing else in the business"
            ],
            correctAnswer: 1,
            explanation: "Business ethics is the set of moral principles guiding how a company behaves - what it should do, beyond the legal minimum."
          },
          {
            id: "ethics1-mastery2",
            question: "The law relative to ethics is best thought of as…",
            options: [
              "The highest possible standard anyone could ever aim to reach",
              "A minimum floor of behavior",
              "Completely unrelated to conduct or to how people ought to act",
              "Far stricter than any ethical standard a company might hold itself to"
            ],
            correctAnswer: 1,
            explanation: "The law sets a minimum floor of required behavior. Ethics reaches higher, into the gray areas the law doesn't cover."
          },
          {
            id: "ethics1-mastery3",
            question: "Why is 'we didn't break any law' a weak defense for a business?",
            options: [
              "Laws never apply to companies and only bind private individuals in their daily lives",
              "Legal acts can still be unethical and harm trust",
              "Breaking laws is always ethical as long as the company happens to earn a profit from it",
              "Ethics requires ignoring the law completely and doing whatever feels convenient at the time"
            ],
            correctAnswer: 1,
            explanation: "Staying legal isn't enough - many harmful acts are legal. Ethical firms ask if a choice is fair and honest, not just whether they can get away with it."
          },
          {
            id: "ethics1-mastery4",
            question: "A 'slippery slope' in ethics refers to…",
            options: [
              "A wet office floor hazard that could make an employee slip",
              "Small compromises growing into big failures",
              "A type of pricing strategy used to set the cost of goods",
              "A law that changes every year and must be re-learned each time"
            ],
            correctAnswer: 1,
            explanation: "The slippery slope is when small ethical compromises under pressure gradually snowball into serious ethical failures."
          },
          {
            id: "ethics1-mastery5",
            question: "What is a 'code of conduct'?",
            options: [
              "A secret pricing formula kept locked away from rivals",
              "Written standards of expected behavior",
              "A government tax form filed once at the end of each year",
              "A competitor's flashy ad campaign running on TV this season"
            ],
            correctAnswer: 1,
            explanation: "A code of conduct is a written set of behavioral standards that guides employees before pressure hits, so choices aren't made in a panic."
          },
          {
            id: "ethics1-mastery6",
            question: "The 'transparency test' asks whether you would be comfortable if a decision…",
            options: [
              "Earned the most money possible without a single thought about who might be harmed",
              "Were made public for everyone to see",
              "Were kept completely hidden from the press, the public, and even the company's own staff",
              "Followed a competitor's lead exactly, doing whatever the biggest rival happened to be doing"
            ],
            correctAnswer: 1,
            explanation: "The transparency test asks: would you be fine if this decision became public? If not, that's a strong warning it may be unethical."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // ethics-2: Corporate Social Responsibility
  // ─────────────────────────────────────────────
  {
    lessonId: "ethics-2",
    sections: [
      {
        type: "concept",
        title: "When Businesses Give Back",
        paragraphs: [
          "Corporate Social Responsibility (CSR) is a company's commitment to operate in ways that benefit society and the environment, not just its own profit. It's the idea that businesses, because they're powerful and affect so many people, have a responsibility beyond making money. CSR shows up in many forms: reducing pollution, treating workers fairly, sourcing materials ethically, donating to communities, and being honest with customers. A company practicing CSR asks not only 'how do we profit?' but 'how do we profit while doing right by the world around us?'",
          "CSR is often grouped into areas. Environmental responsibility means cutting waste, emissions, and resource use - like a clothing brand using recycled fabric and solar-powered factories. Social responsibility means treating employees, customers, and communities well - fair wages, safe conditions, giving back locally. Ethical responsibility means honesty and fairness in all dealings. Some frameworks add economic responsibility - being profitable and stable, since a bankrupt company helps no one. The point is that a truly responsible business balances all of these rather than picking one and ignoring the rest.",
          "A useful way to see CSR is the 'triple bottom line': measuring success by People, Planet, and Profit - not profit alone. A traditional business tracks only the money. A triple-bottom-line business also asks how it affected people (workers, communities) and the planet (environment). This wider scorecard reflects the belief that a business embedded in society owes something back. It doesn't mean ignoring profit - a company still needs to survive - but it means profit isn't the only number that counts when judging whether a business is truly successful."
        ],
        bullets: [
          "CSR is operating to benefit society and the environment, not just profit.",
          "Environmental CSR: cutting pollution, waste, and resource use.",
          "Social CSR: fair wages, safe conditions, and giving back to communities.",
          "Ethical CSR: honesty and fairness in all dealings.",
          "The 'triple bottom line' measures People, Planet, and Profit together."
        ],
        realWorldExample: "An outdoor brand uses recycled materials, pays factory workers fair wages, donates a share of sales to conservation, and repairs old gear for free. It earns somewhat less per item but builds a loyal following that trusts it - CSR that strengthens both reputation and sales."
      },
      {
        type: "concept",
        title: "The Real Trade-offs and Greenwashing",
        paragraphs: [
          "CSR involves genuine trade-offs, which is why it's debated. Doing the responsible thing often costs more up front: sustainable materials, fair wages, and cleaner factories raise expenses, which can mean higher prices or thinner profit. Critics argue a company's main job is to make money for its owners and that CSR spending is a distraction. Supporters counter that CSR builds long-term value - loyal customers, motivated employees, lower risk of scandal, and a license to operate in communities. The honest answer is that CSR is an investment with real costs and real, if slower, payoffs.",
          "There's also a darker side to watch: greenwashing, where a company pretends to be responsible without truly being so. A brand might splash 'eco-friendly' and green leaves on packaging while changing almost nothing about its polluting practices. Greenwashing exploits customers who want to do good, and when exposed, it backfires badly - destroying the very trust it tried to fake. Real CSR is backed by action and evidence; fake CSR is just marketing. Learning to tell them apart is a key skill for both consumers and future business leaders.",
          "The strongest case for CSR is that responsibility and profit increasingly reinforce each other. Employees, especially younger ones, want to work for companies whose values they share. Customers increasingly choose brands that reflect their concerns. Investors watch for environmental and social risks that can wreck a company's future. So CSR isn't only charity - it's smart, long-term strategy that manages risk and builds trust. That said, genuine CSR requires real sacrifice and follow-through. Businesses that treat it as a checkbox or a slogan miss the point and eventually get caught."
        ],
        bullets: [
          "CSR has real trade-offs: responsible choices often cost more up front.",
          "Critics say CSR distracts from profit; supporters say it builds long-term value.",
          "Greenwashing is faking responsibility without real change.",
          "Exposed greenwashing destroys the trust it tried to fake.",
          "Genuine CSR aligns responsibility with long-term strategy and trust."
        ],
        realWorldExample: "A soda company ran ads about saving water while its bottling plants drained local supplies - classic greenwashing. When journalists exposed the gap between its ads and actions, the backlash damaged its reputation far more than honest silence would have."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ethics2-mc1",
            question: "What does Corporate Social Responsibility (CSR) mean?",
            options: [
              "Maximizing profit while completely ignoring everything and everyone else in the entire world",
              "Operating to benefit society and the environment, not just profit",
              "A special tax that only the very largest companies are ever required to pay each year",
              "A strict law banning all advertising across television, radio, billboards, and the internet"
            ],
            correctAnswer: 1,
            explanation: "CSR is a company's commitment to operate in ways that benefit society and the environment, alongside making a profit."
          },
          {
            id: "ethics2-mc2",
            question: "What is 'greenwashing'?",
            options: [
              "Cleaning factories with a special green soap that actually removes real pollution",
              "Pretending to be responsible without truly being so",
              "A real environmental program that genuinely cuts waste and lowers emissions each year",
              "Painting a company logo bright green to make the products look fresh and natural"
            ],
            correctAnswer: 1,
            explanation: "Greenwashing is faking environmental or social responsibility for marketing purposes without making genuine changes - which backfires when exposed."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Clothing Brands, Two Approaches",
        narrative: "Two clothing companies both advertise being 'sustainable.' Brand A truly invests in recycled fabric, fair wages, and cleaner factories, accepting slimmer margins. Brand B slaps 'eco' labels on its products but changes nothing about its polluting supply chain.",
        details: [
          "Brand A practices genuine CSR, backed by real action and higher costs.",
          "Brand B is greenwashing - using eco claims as marketing with no real change.",
          "Brand A accepts thinner margins but builds authentic customer trust.",
          "If journalists expose Brand B's fake claims, the backlash could damage its reputation."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ethics2-aq1",
          question: "Why is Brand B's approach risky in the long run?",
          options: [
            "Because eco-friendly fabric is illegal to sell in most stores",
            "Because exposed greenwashing destroys customer trust",
            "Because CSR always guarantees higher profit",
            "Because sustainability never matters to buyers"
          ],
          correctAnswer: 1,
          explanation: "Brand B fakes responsibility. When greenwashing is exposed, it shatters the very trust it tried to fake, often causing worse damage than saying nothing."
        }
      },
      {
        type: "recap",
        takeaways: [
          "CSR means benefiting society and the environment, not just chasing profit.",
          "It spans environmental, social, and ethical responsibilities.",
          "The triple bottom line measures People, Planet, and Profit.",
          "CSR has real trade-offs: responsible choices often cost more up front.",
          "Greenwashing fakes responsibility and destroys trust when exposed."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "ethics2-mastery1",
            question: "The 'triple bottom line' measures a business by…",
            options: [
              "Profit, profit, and more profit",
              "People, Planet, and Profit",
              "Sales, staff, and stock only",
              "Price, place, and promotion"
            ],
            correctAnswer: 1,
            explanation: "The triple bottom line judges success by People, Planet, and Profit together, not by financial profit alone."
          },
          {
            id: "ethics2-mastery2",
            question: "Which is an example of environmental CSR?",
            options: [
              "Hiding the cancellation option deep in tiny, hard-to-read fine print",
              "Using recycled materials and cutting emissions",
              "Paying the lowest legal wage possible to squeeze out extra profit",
              "Raising prices for no reason at all beyond simply wanting more money"
            ],
            correctAnswer: 1,
            explanation: "Environmental CSR means reducing pollution, waste, and resource use - like using recycled materials and cutting emissions."
          },
          {
            id: "ethics2-mastery3",
            question: "A common criticism of CSR is that…",
            options: [
              "It always bankrupts every company that ever dares to try being responsible at all",
              "It can raise costs and distract from profit",
              "It is required by every single law in every country and can never be skipped",
              "It never affects reputation in any way, whether the effort succeeds or completely fails"
            ],
            correctAnswer: 1,
            explanation: "Critics argue CSR raises costs and diverts focus from profit. Supporters counter that it builds long-term value and trust."
          },
          {
            id: "ethics2-mastery4",
            question: "How can you spot genuine CSR versus greenwashing?",
            options: [
              "Genuine CSR is backed by real action and evidence",
              "Greenwashing always costs a company far more money than honest action ever would",
              "Genuine CSR is proven simply by using the brightest and greenest logos on the package",
              "There is no way to ever tell them apart"
            ],
            correctAnswer: 0,
            explanation: "Real CSR is backed by concrete action and evidence, while greenwashing is just marketing claims with no genuine change behind them."
          },
          {
            id: "ethics2-mastery5",
            question: "Why do many employees now prefer socially responsible employers?",
            options: [
              "Such jobs are always the very highest paid roles in the entire job market anywhere",
              "People want to work for companies whose values they share",
              "The law forces them to take these jobs whether or not they actually want them at all",
              "Responsible companies never have any rules, so employees can simply do whatever they please"
            ],
            correctAnswer: 1,
            explanation: "Many workers, especially younger ones, want to work for companies whose values they share, making CSR a tool for attracting talent."
          },
          {
            id: "ethics2-mastery6",
            question: "The best long-term case for CSR is that…",
            options: [
              "Responsibility and profit can reinforce each other",
              "It lets companies ignore their customers completely and still keep making money",
              "It removes every last bit of business risk instantly and forever with no downside",
              "It replaces the need for any product"
            ],
            correctAnswer: 0,
            explanation: "Over time, CSR builds trust with customers, employees, and investors and manages risk - so responsibility and profit increasingly reinforce each other."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // ethics-3: Stakeholder Theory
  // ─────────────────────────────────────────────
  {
    lessonId: "ethics-3",
    sections: [
      {
        type: "concept",
        title: "Who a Business Is Really Responsible To",
        paragraphs: [
          "For a long time, the dominant view was 'shareholder primacy': a company's only real duty is to maximize profit for its shareholders - the owners of its stock. Stakeholder theory offers a broader view. It says a business is responsible to all its stakeholders - anyone who affects or is affected by the company. That includes shareholders, but also employees, customers, suppliers, the local community, the government, and the environment. The core claim: a business is embedded in a web of relationships, and lasting success comes from honoring all of them, not just enriching owners.",
          "Each stakeholder group has a stake - something they gain or lose based on the company's actions. Employees stake their livelihood and well-being. Customers stake their money and trust in getting a fair, safe product. Suppliers stake steady business and fair payment. The community stakes local jobs, a clean environment, and tax revenue. Shareholders stake their invested money and expected returns. Stakeholder theory argues that ignoring any of these groups eventually harms the business, because they're all connected and all necessary for it to function.",
          "The theory reframes the purpose of business. Under shareholder primacy, everything - workers, customers, community - is a means to the end of profit. Under stakeholder theory, profit is essential but so is treating all stakeholders fairly, because that's both right and, over time, more sustainable. A company that squeezes suppliers, underpays staff, and pollutes its town may boost this quarter's profit while quietly burning the relationships it depends on. Stakeholder thinking asks leaders to see the whole picture, not just the number that lands on the shareholders' report."
        ],
        bullets: [
          "Shareholder primacy: a company's only duty is profit for its owners.",
          "Stakeholder theory: a business is responsible to all who affect or are affected by it.",
          "Stakeholders include employees, customers, suppliers, community, and environment.",
          "Each group has a 'stake' - something to gain or lose from the company.",
          "Ignoring stakeholder groups eventually harms the business itself."
        ],
        realWorldExample: "A factory that dumps waste to cut costs boosts short-term profit for shareholders, but poisons the community's water, angers employees who live there, and invites lawsuits and boycotts. The stakeholders it ignored end up wrecking the very profit it chased."
      },
      {
        type: "concept",
        title: "Balancing Competing Interests",
        paragraphs: [
          "The hard part of stakeholder theory is that stakeholders' interests often conflict. Raising wages helps employees but reduces short-term shareholder profit. Lowering prices delights customers but squeezes what's left to pay suppliers. Investing in cleaner equipment helps the community and environment but costs money now. There's no magic formula that keeps everyone perfectly happy. Good leaders don't pretend these tensions away - they weigh them honestly, looking for decisions that serve the most stakeholders sustainably, and they communicate the reasoning openly.",
          "One useful tool is stakeholder mapping: listing everyone affected by a decision and asking how each is helped or harmed. Before closing a factory, a thoughtful company maps the impact on workers who'll lose jobs, the town that relies on it, suppliers who'll lose orders, and shareholders who want savings. Mapping doesn't automatically produce the answer, but it prevents the common failure of seeing only one stakeholder - usually shareholders - and steamrolling everyone else. It forces the full human cost of a decision into view before it's made.",
          "Stakeholder theory doesn't mean profit is bad or that shareholders don't matter - they clearly do, and a failing company helps no one. It means profit is pursued responsibly, with awareness of everyone in the web. The strongest argument is practical as well as moral: companies that genuinely care for employees, customers, and communities tend to earn deep loyalty, avoid costly scandals, and last. Treating stakeholders as partners rather than obstacles turns out to be, over the long run, a smarter path to the sustainable success that shareholders themselves want."
        ],
        bullets: [
          "Stakeholders' interests often conflict - there's no formula that pleases all.",
          "Leaders weigh tensions honestly and aim to serve the most stakeholders sustainably.",
          "Stakeholder mapping lists everyone affected and how each is helped or harmed.",
          "Mapping prevents steamrolling everyone to please one group.",
          "Caring for stakeholders builds loyalty and lasting, sustainable success."
        ],
        realWorldExample: "Before closing an underused plant, a company maps stakeholders: 300 workers, a small town's economy, local suppliers, and shareholders wanting savings. Seeing the full impact, it offers retraining and phased closure - balancing shareholder needs with real care for the people affected."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ethics3-mc1",
            question: "According to stakeholder theory, a business is responsible to…",
            options: [
              "Only its shareholders who bought stock hoping the share price would climb higher",
              "Everyone who affects or is affected by the company",
              "Only its paying customers who walk in the door and buy something at the register",
              "Only the government agencies that collect taxes and enforce the rules on businesses"
            ],
            correctAnswer: 1,
            explanation: "Stakeholder theory holds that a business is responsible to all stakeholders - employees, customers, suppliers, community, and environment - not just shareholders."
          },
          {
            id: "ethics3-mc2",
            question: "What does 'shareholder primacy' claim?",
            options: [
              "That employees matter most of all, above the customers, the owners, and everyone else",
              "That a company's main duty is profit for its owners",
              "That companies should never earn any profit and must give every dollar away instead",
              "That the customers legally own the company and get to vote on every business decision"
            ],
            correctAnswer: 1,
            explanation: "Shareholder primacy is the view that a company's only real duty is to maximize profit for its shareholders - the view stakeholder theory challenges."
          }
        ]
      },
      {
        type: "scenario",
        title: "Closing the Riverside Plant",
        narrative: "Ingrid, a CEO, is deciding whether to close an underused plant to save money. Before choosing, she maps out everyone the decision would affect, rather than looking only at the savings for shareholders.",
        details: [
          "Shareholders would benefit from the cost savings of closing the plant.",
          "300 employees would lose their jobs, and the small town's economy would suffer.",
          "Local suppliers who depend on the plant would lose steady orders.",
          "Mapping all these stakeholders reveals the full human cost before deciding."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ethics3-aq1",
          question: "How does stakeholder mapping help Ingrid make a better decision?",
          options: [
            "It guarantees the plant will stay open forever no matter what the numbers actually show",
            "It reveals the full impact on all affected groups",
            "It focuses only on shareholder savings and treats every other group as completely unimportant",
            "It removes the need to decide at all, since the answer is always simply the cheapest option"
          ],
          correctAnswer: 1,
          explanation: "Stakeholder mapping shows how each group is helped or harmed, so Ingrid sees the full human cost instead of steamrolling everyone to please shareholders alone."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Shareholder primacy says profit for owners is a company's only duty.",
          "Stakeholder theory says a business is responsible to all affected groups.",
          "Stakeholders include employees, customers, suppliers, community, and environment.",
          "Stakeholders' interests often conflict, requiring honest judgment.",
          "Stakeholder mapping reveals the full impact of a decision before making it."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "ethics3-mastery1",
            question: "A 'stakeholder' is anyone who…",
            options: [
              "Owns stock in the company only and cares about nothing beyond the share price",
              "Affects or is affected by the company",
              "Works at a rival firm across town competing for the very same customers",
              "Has no connection to the business at all and has never once heard its name"
            ],
            correctAnswer: 1,
            explanation: "A stakeholder is anyone who affects or is affected by the company - including employees, customers, suppliers, community, and shareholders."
          },
          {
            id: "ethics3-mastery2",
            question: "Which group is a stakeholder but NOT a shareholder?",
            options: [
              "A stockholder owning shares bought on the public exchange last spring",
              "The local community around a factory",
              "An investor holding equity purchased and kept for the very long term",
              "A part-owner of the firm hoping mainly that the share price will rise"
            ],
            correctAnswer: 1,
            explanation: "The local community is affected by the business and is thus a stakeholder, even though it owns no shares."
          },
          {
            id: "ethics3-mastery3",
            question: "Stakeholder theory reframes profit as…",
            options: [
              "The only thing that ever matters, above every person the company touches",
              "Essential but pursued responsibly toward all groups",
              "Something businesses should always avoid and feel deeply ashamed of chasing",
              "Irrelevant to any decision a manager ever has to make about the company"
            ],
            correctAnswer: 1,
            explanation: "Stakeholder theory keeps profit essential but insists it be pursued responsibly, with awareness of all stakeholders - not as the single goal."
          },
          {
            id: "ethics3-mastery4",
            question: "Why do stakeholder interests create hard decisions?",
            options: [
              "All stakeholders always want the same thing",
              "Their interests often conflict with each other",
              "Stakeholders never disagree and always want the very same outcome",
              "There is always a perfect formula that keeps every single group fully happy"
            ],
            correctAnswer: 1,
            explanation: "Interests conflict - raising wages helps workers but cuts short-term profit - so leaders must weigh tensions with judgment, not a formula."
          },
          {
            id: "ethics3-mastery5",
            question: "What is stakeholder mapping?",
            options: [
              "Drawing the office floor plan to decide where each desk and meeting room will go",
              "Listing everyone affected and how each is helped or harmed",
              "Ranking all the shareholders by how much personal wealth each one happens to hold",
              "A type of advertising that runs across television, radio, billboards, and social media"
            ],
            correctAnswer: 1,
            explanation: "Stakeholder mapping lists everyone a decision affects and how, revealing the full impact before a choice is made."
          },
          {
            id: "ethics3-mastery6",
            question: "The practical argument for stakeholder theory is that caring for stakeholders…",
            options: [
              "Always lowers a company's profit permanently, dragging it down year after year forever",
              "Builds loyalty and lasting success over time",
              "Makes shareholders completely irrelevant and strips away every right their ownership gives them",
              "Guarantees instant riches overnight for anyone who bothers to treat their stakeholders fairly"
            ],
            correctAnswer: 1,
            explanation: "Companies that care for employees, customers, and communities tend to earn loyalty, avoid scandals, and last - achieving the sustainable success shareholders want."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // ethics-4: Ethical Dilemmas in Business
  // ─────────────────────────────────────────────
  {
    lessonId: "ethics-4",
    sections: [
      {
        type: "concept",
        title: "When There's No Easy Right Answer",
        paragraphs: [
          "An ethical dilemma isn't a choice between clearly right and clearly wrong - that's easy. A true dilemma is when values collide and every option has a downside. A manager might have to choose between honesty and loyalty, or between helping employees and protecting the company. Imagine discovering a product flaw that isn't dangerous but is embarrassing: reveal it and hurt sales, or stay quiet and risk trust? Both paths cost something. Recognizing that real dilemmas have no perfect answer is the starting point - the goal is a well-reasoned choice, not a magically painless one.",
          "To reason through dilemmas, ethicists use frameworks - different lenses for judging what's right. One is consequentialism (often utilitarianism): judge an action by its outcomes, choosing whatever produces the greatest good for the greatest number. A utilitarian weighs the total help and harm across everyone affected. Its strength is caring about real results; its weakness is that it can justify hurting a few to benefit many, and outcomes are hard to predict. Still, asking 'who is helped and harmed, and by how much?' is a powerful first step in any hard decision.",
          "A contrasting lens is deontology - duty-based ethics. It judges actions by whether they follow moral rules and respect people's rights, regardless of outcomes. To a deontologist, lying is wrong even if it would produce a good result, because honesty is a duty and people deserve the truth. Its strength is protecting individual rights that utilitarianism might trample; its weakness is rigidity when rules conflict. Many decisions look different through each lens, which is exactly why considering both - outcomes and duties - leads to more thoughtful, balanced ethical choices."
        ],
        bullets: [
          "An ethical dilemma is a clash of values where every option has a downside.",
          "Frameworks are lenses for judging what's right in hard cases.",
          "Consequentialism/utilitarianism judges by outcomes - greatest good for the most.",
          "Deontology judges by duties and rights, regardless of outcomes.",
          "Considering both outcomes and duties leads to more balanced choices."
        ],
        realWorldExample: "A pharmacy finds a small labeling error on a harmless product. Utilitarian thinking weighs the cost of a recall against the tiny risk; duty-based thinking says customers have a right to accurate labels no matter what. Seeing both lenses leads to a wiser, more honest call."
      },
      {
        type: "concept",
        title: "More Lenses and a Method for Deciding",
        paragraphs: [
          "Two more frameworks round out the toolkit. Virtue ethics asks not 'what rule applies?' but 'what would a person of good character do?' It focuses on being honest, fair, courageous, and compassionate - and asks whether a choice reflects who you want to be. Rights-based ethics centers on the basic rights every person holds, like the right to safety, truth, and fair treatment, and says no decision should violate them. Together with utilitarian and duty-based thinking, these give several angles to test a tough decision from more than one direction.",
          "Beyond frameworks, simple gut-checks cut through rationalization. The publicity test: would you be comfortable if your decision were on the front page of the news? The reversibility test (the Golden Rule): would you accept this if you were the one it happened to? The generalization test: what if everyone in your position did this? These tests are quick, powerful ways to catch a choice you're tempted to excuse. If a decision fails several tests, that's a strong signal it's wrong, no matter how you've justified it to yourself.",
          "Putting it together, a practical method helps: identify the dilemma and who's affected, gather the facts, consider the options through multiple lenses (outcomes, duties, character, rights), apply the gut-check tests, then choose and be ready to explain your reasoning. The point isn't to find a formula that removes hard feelings - dilemmas hurt by nature - but to make a defensible, thoughtful choice you can stand behind. In business, where pressure to rationalize is intense, having a clear method makes you far more likely to do the right thing when it's hard."
        ],
        bullets: [
          "Virtue ethics asks what a person of good character would do.",
          "Rights-based ethics protects each person's basic rights.",
          "Gut-check tests: publicity, reversibility (Golden Rule), and generalization.",
          "A choice failing several tests is a strong sign it's wrong.",
          "A method: identify, gather facts, use multiple lenses, test, then decide."
        ],
        realWorldExample: "An engineer is pressured to hide a minor safety concern to hit a deadline. The publicity test ('would I want this in the news?'), the reversibility test ('would I want to buy this?'), and virtue ethics ('is this honest?') all point the same way - speak up. Multiple lenses agreeing gives confidence."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ethics4-mc1",
            question: "What makes something a true ethical dilemma?",
            options: [
              "One choice is clearly right and the other clearly wrong",
              "Values collide and every option has a real downside",
              "There are no people affected by the choice in any way whatsoever",
              "The law gives one exact answer that settles the whole matter cleanly"
            ],
            correctAnswer: 1,
            explanation: "A true dilemma isn't right versus wrong - it's a clash of values where every option costs something, requiring careful, reasoned judgment."
          },
          {
            id: "ethics4-mc2",
            question: "Utilitarianism judges an action mainly by…",
            options: [
              "Whether it strictly follows a fixed set of moral rules no matter the result",
              "The outcomes it produces for the most people",
              "The color of the product and how nice it happens to look on the store shelf",
              "How much personal profit the CEO earns from the decision at the end of the year"
            ],
            correctAnswer: 1,
            explanation: "Utilitarianism (a form of consequentialism) judges actions by their outcomes, aiming for the greatest good for the greatest number of people."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Deadline and the Defect",
        narrative: "Sofia, an engineer, finds a minor safety flaw in a product just before a big launch. Fixing it means missing the deadline; hiding it means shipping a small risk to customers. She uses ethical frameworks and gut-checks to decide what to do.",
        details: [
          "Utilitarian view: she weighs the harm of a delay against the risk to customers' safety.",
          "Duty and rights view: customers have a right to a safe product and honest information.",
          "The publicity test: she wouldn't want the hidden flaw exposed in the news.",
          "Multiple lenses point the same direction - disclose the flaw and fix it."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ethics4-aq1",
          question: "Why does using several ethical lenses give Sofia more confidence in her choice?",
          options: [
            "Because more lenses always mean more profit at the end of the year, guaranteed",
            "When different lenses agree, the choice is well-supported",
            "Because ethical frameworks are legally required and skipping any one can bring a fine",
            "Because using several lenses lets her ignore the customers and their real concerns entirely"
          ],
          correctAnswer: 1,
          explanation: "When outcomes, duties, rights, and gut-check tests all point the same way, the decision is well-reasoned and defensible - giving Sofia confidence it's right."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A true ethical dilemma is a clash of values where every option has a cost.",
          "Utilitarianism judges by outcomes; deontology judges by duties and rights.",
          "Virtue ethics asks what a person of good character would do.",
          "Gut-checks: publicity, reversibility (Golden Rule), and generalization tests.",
          "A method plus multiple lenses leads to defensible, thoughtful choices."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "ethics4-mastery1",
            question: "Deontology (duty-based ethics) judges an action by…",
            options: [
              "Only the profit it generates for the owners at the end of each quarter",
              "Whether it follows moral rules and respects rights",
              "How many people it pleases, counting up every single happy face it creates",
              "The color of the packaging and how eye-catching it looks on a crowded shelf"
            ],
            correctAnswer: 1,
            explanation: "Deontology judges actions by whether they follow moral duties and respect people's rights, regardless of the outcomes they produce."
          },
          {
            id: "ethics4-mastery2",
            question: "A weakness of pure utilitarianism is that it can…",
            options: [
              "Ignore outcomes entirely and care only about following rigid rules to the letter",
              "Justify harming a few to benefit many",
              "Never consider any people at all when weighing whether a choice is right or wrong",
              "Only apply to nonprofit organizations and never to any company trying to earn a profit"
            ],
            correctAnswer: 1,
            explanation: "Because it focuses on the greatest good for the most people, utilitarianism can justify sacrificing a few - a key criticism of the framework."
          },
          {
            id: "ethics4-mastery3",
            question: "Virtue ethics primarily asks…",
            options: [
              "What would a person of good character do?",
              "Which choice earns the company the most money this quarter, no matter who it hurts?",
              "What does the law demand exactly, down to the last comma written in the statute?",
              "How can we hide this decision so completely that no customer or reporter ever finds out?"
            ],
            correctAnswer: 0,
            explanation: "Virtue ethics focuses on character - asking what an honest, fair, courageous person would do, and whether the choice reflects who you want to be."
          },
          {
            id: "ethics4-mastery4",
            question: "The 'reversibility test' is based on the idea of…",
            options: [
              "Reversing a car safely out of a tight parking spot without hitting anything nearby",
              "Would you accept this if it happened to you?",
              "Undoing a purchase and returning the item to the store shelf for a full refund",
              "Doubling the company's profit by cutting costs everywhere and charging much more per sale"
            ],
            correctAnswer: 1,
            explanation: "The reversibility test applies the Golden Rule: would you accept this decision if you were the one on the receiving end of it?"
          },
          {
            id: "ethics4-mastery5",
            question: "The 'generalization test' asks…",
            options: [
              "What if everyone in your position did this?",
              "How can I make this decision secret so that nobody outside ever finds out about it?",
              "Which rival company is quietly doing the very same thing over on the other side of town?",
              "What is the single cheapest option available to us right now, no matter who it might harm?"
            ],
            correctAnswer: 0,
            explanation: "The generalization test asks what would happen if everyone in your situation made the same choice - exposing decisions that only work if few people do them."
          },
          {
            id: "ethics4-mastery6",
            question: "What is the realistic goal when facing an ethical dilemma?",
            options: [
              "To find a painless, perfect answer",
              "To make a defensible, well-reasoned choice",
              "To always maximize the company's total profit",
              "To avoid ever having to decide anything"
            ],
            correctAnswer: 1,
            explanation: "Dilemmas hurt by nature, so the goal isn't a painless answer but a thoughtful, defensible choice you can stand behind and explain."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // ethics-5: Business Ethics and the Law
  // ─────────────────────────────────────────────
  {
    lessonId: "ethics-5",
    sections: [
      {
        type: "concept",
        title: "Where Ethics and Law Meet - and Split",
        paragraphs: [
          "Ethics and the law overlap a lot but aren't the same. Think of two overlapping circles. Where they overlap, an act is both illegal and unethical - like fraud or stealing from customers. But each circle also has parts the other doesn't cover. Some things are legal yet unethical: exploiting a loophole to underpay workers, or using manipulative-but-legal marketing. And, rarely, some things could be illegal yet arguably ethical - like a whistleblower breaking a confidentiality rule to expose serious harm. Understanding this map helps you see that 'it's legal' never automatically means 'it's right.'",
          "The law generally sets the minimum standard society will enforce, often codifying the most serious ethical rules after enough harm makes them necessary. Many laws began as ethical stands: rules against dumping toxic waste, against discrimination in hiring, against selling unsafe products. Over time, society decides some ethical lines are important enough to become mandatory, with real penalties. So law often lags behind ethics - a harmful practice may be common and legal for years until public pressure finally turns the ethical objection into a binding rule.",
          "Key business laws exist precisely to enforce ethical minimums. Consumer protection laws stop companies from deceiving or endangering buyers. Employment laws ban discrimination and require safe workplaces. Antitrust laws prevent companies from crushing competition unfairly. Environmental laws limit pollution. Anti-fraud and disclosure laws force honesty in finance. These laws don't cover every ethical situation - the gray zone remains huge - but they draw firm lines around the worst behaviors, backing them with fines, lawsuits, and sometimes prison. Compliance means following these rules; ethics means going beyond them."
        ],
        bullets: [
          "Ethics and law overlap but aren't identical - picture two overlapping circles.",
          "Some acts are legal yet unethical (loopholes, manipulative marketing).",
          "The law sets an enforceable minimum, often lagging behind ethics.",
          "Many laws began as ethical stands later made mandatory.",
          "Consumer, employment, antitrust, and environmental laws enforce ethical minimums."
        ],
        realWorldExample: "For years, hiding a product's known dangers was legal simply because no rule addressed it. After scandals harmed people, consumer-protection and disclosure laws made concealment illegal. The ethical objection existed long before the law caught up - a common pattern."
      },
      {
        type: "concept",
        title: "Compliance, Whistleblowers, and Going Beyond",
        paragraphs: [
          "Because breaking the law is costly, companies build compliance programs - systems to make sure everyone follows the rules. These include training, audits, reporting channels, and a compliance officer who watches for violations. Compliance matters: lawbreaking brings fines that can reach millions, lawsuits, and criminal charges for executives, plus reputational ruin. But compliance is only the floor. A company that treats 'not getting sued' as its whole ethical standard is still one clever loophole away from harming people - which is why ethics has to reach beyond mere legal compliance.",
          "Whistleblowers sit at the tense intersection of ethics and law. A whistleblower is an insider who reports wrongdoing - fraud, safety cover-ups, illegal dumping - often at great personal risk. Laws exist to protect them, because society benefits when serious harm is exposed. Yet whistleblowers frequently face retaliation, showing how ethics and self-interest can collide. The existence of whistleblower protections reflects a key idea: sometimes doing the right thing means challenging your own organization, and the law tries to shield those brave enough to do it. Strong ethical cultures make it safe to speak up before problems explode.",
          "The big-picture lesson is that law and ethics work together but neither replaces the other. Law provides enforceable boundaries and punishes the worst acts, giving ethics teeth. Ethics provides the deeper 'should' that guides the vast gray areas law can't reach and pushes standards higher over time. A truly responsible business does both: it complies fully with the law AND holds itself to ethical standards beyond what any statute demands. Chasing only legal minimums invites the exact scandals that destroy companies - so ethics isn't a luxury on top of compliance, it's the smarter, safer path."
        ],
        bullets: [
          "Compliance programs (training, audits, officers) enforce following the law.",
          "Lawbreaking risks huge fines, lawsuits, criminal charges, and ruin.",
          "A whistleblower reports wrongdoing, often at personal risk.",
          "Whistleblower protections show doing right may mean challenging your own firm.",
          "Responsible businesses obey the law AND go beyond it ethically."
        ],
        realWorldExample: "An accountant discovers her firm is hiding losses from investors - illegal fraud. Reporting it (whistleblowing) risks her job but exposes real harm. Whistleblower protection laws exist precisely to shield people who do the right thing against their own employer."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ethics5-mc1",
            question: "Which statement best captures the relationship between law and ethics?",
            options: [
              "They are completely identical in every single case, with no gap between them ever",
              "They overlap, but some legal acts are still unethical",
              "Ethics is always a strict subset of the law and can never reach beyond what statutes say",
              "The law already covers every ethical situation, so nothing legal could ever be called wrong"
            ],
            correctAnswer: 1,
            explanation: "Law and ethics overlap but aren't the same. Some acts are legal yet unethical, and the law can't cover every ethical situation - a large gray zone remains."
          },
          {
            id: "ethics5-mc2",
            question: "What is a whistleblower?",
            options: [
              "A referee at a sports game who blows a whistle to stop play after a foul",
              "An insider who reports wrongdoing, often at personal risk",
              "A company's advertising manager who plans the commercials that run during the holidays",
              "A type of consumer-protection law that forces every store to post its prices clearly"
            ],
            correctAnswer: 1,
            explanation: "A whistleblower is an insider who reports serious wrongdoing like fraud or safety cover-ups, frequently at great personal risk, which is why laws protect them."
          }
        ]
      },
      {
        type: "scenario",
        title: "Legal, But Is It Right?",
        narrative: "A lending company finds a legal loophole letting it add a confusing fee that most customers won't notice. It's fully legal. Meanwhile, an employee named Dana discovers the company is also hiding a genuine safety issue - which is illegal.",
        details: [
          "The hidden fee is legal but unethical, exploiting a loophole to mislead customers.",
          "The concealed safety issue is both illegal and unethical - crossing a legal line.",
          "Dana could become a whistleblower by reporting the illegal safety cover-up.",
          "Whistleblower protection laws exist to shield Dana from retaliation for speaking up."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ethics5-aq1",
          question: "Why is the hidden fee still a problem even though it's legal?",
          options: [
            "Because all fees of every kind are strictly illegal for any company to ever charge",
            "Because legality doesn't make deceiving customers ethical",
            "Because it lowers the company's profit sharply and drags the quarterly earnings down hard",
            "Because fees must always be exactly zero by law, no matter what the service actually costs"
          ],
          correctAnswer: 1,
          explanation: "The law is a minimum floor. Exploiting a loophole to mislead customers is unethical even where it's legal - 'legal' never automatically means 'right.'"
        }
      },
      {
        type: "recap",
        takeaways: [
          "Ethics and law overlap but aren't identical; legal isn't always ethical.",
          "The law sets an enforceable minimum and often lags behind ethics.",
          "Consumer, employment, antitrust, and environmental laws enforce ethical minimums.",
          "Whistleblowers report wrongdoing at personal risk and are protected by law.",
          "Responsible businesses comply with the law AND go beyond it ethically."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "ethics5-mastery1",
            question: "The law generally represents…",
            options: [
              "The highest ethical standard that anyone could ever possibly reach",
              "An enforceable minimum standard of behavior",
              "A fixed standard that never changes at all from one year to the next",
              "The same thing as ethics exactly"
            ],
            correctAnswer: 1,
            explanation: "The law sets an enforceable minimum, often codifying the most serious ethical rules. Ethics reaches beyond it into the gray areas."
          },
          {
            id: "ethics5-mastery2",
            question: "An example of something legal but unethical is…",
            options: [
              "Paying all the required taxes fully and on time",
              "Exploiting a loophole to underpay workers",
              "Selling a safe, honestly labeled product",
              "Following the terms of a valid contract fairly and completely"
            ],
            correctAnswer: 1,
            explanation: "Using a legal loophole to underpay workers is legal but unethical - a clear case where staying within the law still causes unfair harm."
          },
          {
            id: "ethics5-mastery3",
            question: "Why do laws often 'lag behind' ethics?",
            options: [
              "Ethics is always written into the law first, long before anyone ever acts on it",
              "Harmful practices may be legal until pressure creates rules",
              "Laws are never based on ethics and are written with no regard for right or wrong at all",
              "Ethics has no effect whatsoever on lawmaking and never once shapes a single rule anywhere"
            ],
            correctAnswer: 1,
            explanation: "A harmful practice can be common and legal for years until public pressure turns the ethical objection into a binding law - so law often trails ethics."
          },
          {
            id: "ethics5-mastery4",
            question: "What is the purpose of a corporate compliance program?",
            options: [
              "To maximize the hidden fees quietly tacked onto every customer's bill",
              "To ensure everyone follows the law",
              "To avoid paying the employees the wages they have honestly earned",
              "To replace ethics entirely so a company never has to weigh right and wrong"
            ],
            correctAnswer: 1,
            explanation: "Compliance programs - training, audits, reporting channels - exist to make sure employees follow the law and avoid costly violations."
          },
          {
            id: "ethics5-mastery5",
            question: "Whistleblower protection laws exist because…",
            options: [
              "Reporting wrongdoing can lead to retaliation",
              "Whistleblowers always get rich and are showered with money the moment they speak up",
              "Companies love being exposed and happily thank anyone who reveals their wrongdoing",
              "The law bans reporting problems and punishes any worker who dares to raise a concern"
            ],
            correctAnswer: 0,
            explanation: "Whistleblowers often face retaliation for exposing wrongdoing, so protection laws shield those brave enough to challenge their own organization."
          },
          {
            id: "ethics5-mastery6",
            question: "A truly responsible business treats legal compliance as…",
            options: [
              "The entire goal of ethics, the single highest thing any company should ever aim for",
              "A floor to build on, not the finish line",
              "Something to ignore completely, since the rules on the books never really matter at all",
              "Fully optional and unimportant, a suggestion any business is free to brush aside whenever"
            ],
            correctAnswer: 1,
            explanation: "Compliance is the minimum floor. Responsible businesses obey the law and then hold themselves to higher ethical standards beyond what statutes require."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // ethics-6: Case Study - Enron & Volkswagen
  // ─────────────────────────────────────────────
  {
    lessonId: "ethics-6",
    sections: [
      {
        type: "concept",
        title: "Enron: How Lies Collapsed a Giant",
        paragraphs: [
          "Enron was a huge American energy company, once celebrated as one of the most innovative firms in the world. But behind the praise, its executives were hiding enormous debt and faking profits using complex accounting tricks. They created shell entities to move losses off the books, so the company looked far healthier than it was. Investors, employees, and the public were deceived into believing Enron was thriving. This was accounting fraud - deliberately misleading people about the company's true finances to keep the stock price high and the executives rich.",
          "The deception unraveled in 2001, and the collapse was catastrophic. When the truth emerged, Enron's stock crashed from around $90 to nearly zero, wiping out billions. Thousands of employees lost their jobs and their retirement savings, which had been tied up in company stock they'd been encouraged to hold. Enron's accounting firm, Arthur Andersen - one of the largest in the world - was destroyed too, because it had helped hide the fraud instead of reporting it. A web of dishonesty took down not just the company but everyone connected to it.",
          "Enron's failure was so serious it changed the law. Congress passed the Sarbanes-Oxley Act in 2002, forcing stricter financial reporting, independent audits, and personal accountability for executives who sign off on their company's numbers. The core lesson is stark: short-term deception to prop up a stock price can destroy everything - jobs, savings, and the company itself - when the truth inevitably surfaces. Enron shows how a culture that rewards hitting numbers at any cost, with no ethical brakes, can turn a celebrated company into a symbol of corporate fraud."
        ],
        bullets: [
          "Enron was a praised energy giant hiding debt and faking profits.",
          "It used shell entities and accounting tricks to look healthier than it was.",
          "The 2001 collapse wiped out stock, jobs, and employees' retirement savings.",
          "Its auditor, Arthur Andersen, was destroyed for helping hide the fraud.",
          "The scandal led to the Sarbanes-Oxley Act tightening financial reporting."
        ],
        realWorldExample: "Enron employees who'd poured their retirement savings into company stock, trusting the glowing reports, watched it fall from about $90 to near zero in months. Their savings vanished because leaders chose to fake success rather than admit the truth."
      },
      {
        type: "concept",
        title: "Volkswagen and the Lessons Both Share",
        paragraphs: [
          "Volkswagen's 'Dieselgate' scandal, exposed in 2015, is a different kind of fraud with the same root. VW installed secret 'defeat device' software in millions of diesel cars. The software detected when a car was being emissions-tested and switched to a cleaner mode to pass - then, on the real road, the cars spewed up to 40 times the legal limit of harmful pollutants. VW marketed these cars as 'clean diesel,' deceiving customers, regulators, and the public while knowingly poisoning the air. It was a deliberate, engineered lie built right into the product.",
          "The consequences were massive. VW faced over $30 billion in fines, settlements, and buybacks, its reputation was battered, executives faced criminal charges, and the trust it had built over decades was shattered. Like Enron, VW chose short-term gain - looking like an environmental leader and selling more cars - over honesty, and paid a devastating long-term price. The scandal harmed real people through pollution and betrayed the very customers who bought the cars believing they were doing something good for the planet.",
          "Both cases teach the same lessons. First, deception has a way of surfacing, and the eventual cost dwarfs the short-term gain. Second, these weren't one bad apple - they came from cultures that pressured people to hit targets and looked away from how. Third, when leaders set an example of cutting ethical corners, it spreads through the whole organization. The antidotes are the ideas from earlier lessons: honesty over short-term wins, real accountability, protection for people who speak up, and a culture where 'is this right?' matters as much as 'does this hit the number?' History keeps proving that ethics isn't soft - it's survival."
        ],
        bullets: [
          "VW's Dieselgate used secret software to cheat emissions tests.",
          "Real-road cars emitted up to 40 times the legal pollution limit.",
          "VW faced over $30 billion in costs plus criminal charges and lost trust.",
          "Both scandals came from cultures pressuring people to hit targets at any cost.",
          "The antidote: honesty, accountability, safe whistleblowing, and ethical culture."
        ],
        realWorldExample: "VW spent years advertising 'clean diesel' as eco-friendly while its cars secretly polluted far beyond legal limits. When the cheating surfaced, the $30-billion-plus fallout and shattered trust proved the short-term deception was catastrophically not worth it."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ethics6-mc1",
            question: "What did Enron's executives do that led to its collapse?",
            options: [
              "Sold far too many products at prices that were much too cheap to be profitable",
              "Hid debt and faked profits with accounting tricks",
              "Paid its workers far too much money and generous bonuses it could not truly afford",
              "Refused to advertise at all and let its sales quietly shrink year after year after year"
            ],
            correctAnswer: 1,
            explanation: "Enron hid enormous debt and faked profits using shell entities and accounting tricks, deceiving investors and employees until the truth caused its collapse."
          },
          {
            id: "ethics6-mc2",
            question: "What was Volkswagen's 'defeat device' designed to do?",
            options: [
              "Make the cars go noticeably faster on highways by boosting the engine's raw power output",
              "Detect emissions tests and switch to a cleaner mode to cheat",
              "Improve the car's radio and sound system so passengers could enjoy much clearer music inside",
              "Lower the sticker price of the car so that many more budget-minded buyers could afford one"
            ],
            correctAnswer: 1,
            explanation: "The defeat device detected when a car was being emissions-tested and switched to a cleaner mode to pass, while polluting far more on the real road."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Scandals, One Pattern",
        narrative: "A student compares the Enron and Volkswagen scandals for a class project. She notices that although one was accounting fraud and the other was product fraud, they share a striking underlying pattern in how and why they happened.",
        details: [
          "Both companies chose short-term gain - a high stock price or more sales - over honesty.",
          "Both deceptions eventually surfaced, causing costs far larger than the short-term benefit.",
          "Both came from cultures that pressured people to hit targets and ignored the methods.",
          "Both harmed real people: lost savings and jobs at Enron, pollution and betrayed buyers at VW."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ethics6-aq1",
          question: "What is the shared lesson from both the Enron and Volkswagen scandals?",
          options: [
            "Deception is perfectly safe as long as it happens to be clever and well-hidden enough",
            "Short-term deception surfaces and costs far more than it gained",
            "Ethics never affects a company's survival in any way, whether it lies or tells the truth",
            "Only small companies ever commit fraud, since the big famous firms are always fully honest"
          ],
          correctAnswer: 1,
          explanation: "Both show that deception surfaces eventually, and the fallout - fines, lost trust, ruined companies - dwarfs the short-term gain. Ethics is survival, not a soft add-on."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Enron hid debt and faked profits, collapsing and erasing jobs and savings.",
          "The Enron scandal led to the Sarbanes-Oxley Act tightening reporting.",
          "VW's Dieselgate cheated emissions tests with secret software.",
          "VW paid over $30 billion and lost decades of hard-earned trust.",
          "Both prove short-term deception surfaces and costs far more than it gains."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "ethics6-mastery1",
            question: "Enron's fraud primarily involved…",
            options: [
              "Cheating on the car emissions tests by switching to a special cleaner mode during checks",
              "Hiding debt and faking profits in its accounting",
              "Selling unsafe food products that quietly made many of its loyal customers seriously ill",
              "Underpaying its factory workers by dodging the wage rules through a clever legal loophole"
            ],
            correctAnswer: 1,
            explanation: "Enron's fraud was financial - hiding debt and faking profits with accounting tricks and shell entities to keep its stock price high."
          },
          {
            id: "ethics6-mastery2",
            question: "Which accounting firm was destroyed for helping hide Enron's fraud?",
            options: [
              "Arthur Andersen",
              "The Sarbanes Group",
              "Volkswagen Audit",
              "The Dieselgate Firm"
            ],
            correctAnswer: 0,
            explanation: "Arthur Andersen, one of the world's largest accounting firms, collapsed because it helped conceal Enron's fraud instead of reporting it."
          },
          {
            id: "ethics6-mastery3",
            question: "What law came out of the Enron scandal?",
            options: [
              "The Clean Diesel Act",
              "The Sarbanes-Oxley Act",
              "The Antitrust Act",
              "The Whistle Act"
            ],
            correctAnswer: 1,
            explanation: "The 2002 Sarbanes-Oxley Act tightened financial reporting, required independent audits, and made executives personally accountable for their numbers."
          },
          {
            id: "ethics6-mastery4",
            question: "In Dieselgate, VW's cars on the real road emitted…",
            options: [
              "Exactly the legal limit, hitting the allowed number right on the nose every time",
              "Far more pollution than the legal limit",
              "No pollution at all, running so clean that the tailpipe released nothing whatsoever",
              "Less pollution than the law allowed, coming in comfortably under the required ceiling"
            ],
            correctAnswer: 1,
            explanation: "On the real road, VW's diesel cars emitted up to 40 times the legal limit of pollutants, despite passing rigged emissions tests."
          },
          {
            id: "ethics6-mastery5",
            question: "What did BOTH scandals have in common at their root?",
            options: [
              "A culture that rewarded hitting targets at any cost",
              "Losing huge amounts of money by charging far too little for every product they sold",
              "Being tiny, unknown companies that nobody had ever once heard of anywhere in the world",
              "Openly admitting all of their problems very early and fixing each one right away in public"
            ],
            correctAnswer: 0,
            explanation: "Both grew from cultures that pressured people to hit numbers and ignored the methods, letting deception spread through the whole organization."
          },
          {
            id: "ethics6-mastery6",
            question: "The overall lesson of these case studies is that ethics is…",
            options: [
              "A soft luxury that harms profit",
              "Essential to a company's long-term survival",
              "Only relevant for small startups just getting going",
              "Completely unrelated to how any company ever fails or collapses"
            ],
            correctAnswer: 1,
            explanation: "Both collapses show deception surfaces and costs far more than it gained, proving ethics isn't soft - it's essential to a company's survival."
          }
        ]
      }
    ]
  },
]
