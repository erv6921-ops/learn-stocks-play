import { StructuredLessonContent } from "@/types"

export const businessManagementContent: StructuredLessonContent[] = [
  // ═══════════════════════════════════════════════
  // MGMT-1: What Managers Actually Do
  // ═══════════════════════════════════════════════
  {
    lessonId: "mgmt-1",
    sections: [
      {
        type: "concept",
        title: "The Four Functions of Management",
        paragraphs: [
          "Management is not about telling people what to do. It's about creating the conditions for a team to succeed. The best managers plan ahead, organize resources, lead with purpose, and control quality - every single day.",
          "These four functions - planning, organizing, leading, and controlling - were first described by Henri Fayol over 100 years ago, and they still define what effective managers do today. Whether you're running a Fortune 500 company or a school club, these functions apply.",
          "Planning means setting goals and deciding how to achieve them. Organizing means arranging people, tasks, and resources. Leading means motivating and guiding your team. Controlling means monitoring performance and making corrections when things go off track."
        ],
        bullets: [
          "Planning - setting objectives and mapping out how to reach them",
          "Organizing - assigning tasks, allocating resources, structuring teams",
          "Leading - inspiring, motivating, and communicating a clear vision",
          "Controlling - tracking progress, comparing results to goals, adjusting"
        ],
        realWorldExample: "Consider a restaurant manager who plans the weekly menu based on seasonal ingredients and customer demand, organizes staff schedules so the right people work during peak hours, leads pre-shift meetings to energize the team, and controls food costs by reviewing waste reports daily. Each function supports the others - skip one, and the whole operation suffers."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mgmt1-mc1",
            question: "Which management function involves setting goals and deciding how to achieve them?",
            options: [
              "Organizing resources across departments effectively",
              "Planning objectives and mapping a path forward",
              "Leading team members through daily motivation",
              "Controlling outcomes by reviewing weekly reports"
            ],
            correctAnswer: 1,
            explanation: "Planning is the first function of management - it's about deciding what to accomplish and how. Without a plan, organizing, leading, and controlling have no clear direction."
          },
          {
            id: "mgmt1-mc2",
            question: "A manager notices sales are 15% below target and adjusts the team's strategy. Which function is this?",
            options: [
              "Planning - because the manager is creating a new goal",
              "Organizing - because the manager is restructuring tasks",
              "Leading - because the manager is motivating the team",
              "Controlling - because the manager is correcting course"
            ],
            correctAnswer: 3,
            explanation: "Controlling means monitoring actual performance against goals and taking corrective action. Noticing the gap and adjusting is the essence of the controlling function."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Restaurant Managers, Two Very Different Results",
        narrative: "Marcus and Priya both manage restaurants with the same owner, similar menus, and equally skilled staff. After six months, Marcus's location has high turnover, inconsistent food quality, and declining reviews. Priya's location has a loyal team, consistent five-star ratings, and growing revenue. The difference isn't talent or resources - it's management approach.",
        details: [
          "Marcus skips weekly planning meetings and handles problems as they come up",
          "Priya plans each week's priorities on Sunday and shares them with her team Monday morning",
          "Marcus assigns tasks randomly based on who's available at the moment",
          "Priya organizes roles clearly so every team member knows their responsibilities before each shift",
          "Marcus rarely checks sales data or customer feedback until the monthly owner review",
          "Priya reviews daily reports and adjusts staffing and specials based on real-time performance"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mgmt1-aq1",
          question: "Based on the scenario, what is the PRIMARY reason Priya's restaurant outperforms Marcus's?",
          options: [
            "Priya has better staff and more experienced cooks on her team",
            "Priya consistently applies all four management functions each week",
            "Marcus spends too much on ingredients compared to Priya",
            "Marcus's location has lower foot traffic and fewer customers"
          ],
          correctAnswer: 1,
          explanation: "Both managers have similar resources. The difference is that Priya plans, organizes, leads, and controls consistently. Marcus reacts instead of managing proactively, which leads to chaos over time."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Management has four core functions: planning, organizing, leading, and controlling",
          "Effective managers use all four functions consistently - not just when problems arise",
          "Planning sets direction, organizing builds structure, leading drives motivation, and controlling ensures quality",
          "Poor management isn't always about bad people - it's about missing systems and habits",
          "These functions apply at every scale - from running a club to leading a corporation"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "mgmt1-mq1",
            question: "A startup founder creates a quarterly roadmap with milestones and deadlines. Which management function is she performing?",
            options: [
              "Controlling - she's measuring progress against benchmarks",
              "Organizing - she's arranging resources for the quarter",
              "Planning - she's setting objectives and timelines ahead",
              "Leading - she's inspiring the team with a clear direction"
            ],
            correctAnswer: 2,
            explanation: "Creating a roadmap with milestones and deadlines is planning - defining what needs to happen and by when. The roadmap then guides organizing, leading, and controlling."
          },
          {
            id: "mgmt1-mq2",
            question: "Why is the controlling function important even when a team is performing well?",
            options: [
              "It lets managers micromanage every task and decision",
              "Good performance today doesn't guarantee good results next quarter",
              "Controlling is only necessary during times of financial crisis",
              "Teams always need constant supervision to maintain output levels"
            ],
            correctAnswer: 1,
            explanation: "Controlling helps catch small problems before they become big ones. Even high-performing teams need monitoring to sustain results and adapt to changing conditions."
          },
          {
            id: "mgmt1-mq3",
            question: "Which of the following BEST describes the relationship between the four management functions?",
            options: [
              "They are separate activities performed at different times of the year",
              "They are interdependent - each function supports and strengthens the others",
              "Planning is the only important function and the others are optional",
              "Leading replaces the need for controlling in well-managed organizations"
            ],
            correctAnswer: 1,
            explanation: "The four functions work together as a cycle. Planning sets direction, organizing creates structure, leading drives execution, and controlling provides feedback - which informs the next round of planning."
          },
          {
            id: "mgmt1-mq4",
            question: "A team leader assigns specific project roles based on each member's strengths. Which function is this?",
            options: [
              "Planning - the leader is deciding what the project goals are",
              "Organizing - the leader is structuring roles and resources",
              "Leading - the leader is motivating team members to perform",
              "Controlling - the leader is reviewing individual performance"
            ],
            correctAnswer: 1,
            explanation: "Assigning roles based on strengths is organizing - arranging people and resources so the team operates effectively. It's about structure, not motivation or measurement."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // MGMT-2: Leadership Styles
  // ═══════════════════════════════════════════════
  {
    lessonId: "mgmt-2",
    sections: [
      {
        type: "concept",
        title: "Three Leadership Styles That Shape Organizations",
        paragraphs: [
          "Leadership style is how a leader makes decisions, communicates expectations, and interacts with their team. The three classic styles - autocratic, democratic, and laissez-faire - each have strengths and weaknesses depending on the situation.",
          "Autocratic leaders make decisions unilaterally. They set clear expectations and maintain tight control. This works well in emergencies or with inexperienced teams, but can crush creativity and morale over time.",
          "Democratic leaders involve the team in decisions. They encourage input, foster collaboration, and build buy-in. This works well for creative problem-solving, but can be slow when fast decisions are needed. Laissez-faire leaders give near-total freedom to their team. This works when team members are highly skilled and self-motivated, but can lead to chaos without clear direction."
        ],
        bullets: [
          "Autocratic - leader decides alone; fast decisions, less creativity",
          "Democratic - team input shapes decisions; strong buy-in, slower process",
          "Laissez-faire - minimal direction; great for experts, risky for new teams",
          "No single style is always best - effective leaders adapt to the situation"
        ],
        realWorldExample: "During the development of the first iPhone, Steve Jobs used a largely autocratic style - he made final design decisions and pushed the team relentlessly. But Google's early engineering teams thrived under a more laissez-faire approach, giving brilliant engineers freedom to innovate. Neither style is universally 'right' - the context determines what works."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mgmt2-mc1",
            question: "In which situation would an autocratic leadership style be MOST effective?",
            options: [
              "A creative brainstorming session for a marketing campaign",
              "An emergency evacuation that requires immediate coordination",
              "A long-term research project with experienced scientists",
              "A team-building retreat focused on improving communication"
            ],
            correctAnswer: 1,
            explanation: "Emergencies require fast, decisive action without time for group discussion. Autocratic leadership provides clear direction when speed matters most."
          },
          {
            id: "mgmt2-mc2",
            question: "What is the biggest risk of laissez-faire leadership with an inexperienced team?",
            options: [
              "Team members may feel overly micromanaged and stressed",
              "Decisions will be made too quickly without proper analysis",
              "Lack of direction may lead to confusion and poor coordination",
              "The leader will become too involved in day-to-day operations"
            ],
            correctAnswer: 2,
            explanation: "Laissez-faire works when people are self-directed experts. With inexperienced team members, the lack of guidance creates confusion, duplicated effort, and missed deadlines."
          }
        ]
      },
      {
        type: "scenario",
        title: "Three Founders, One Product, Very Different Outcomes",
        narrative: "Alex, Jordan, and Sam each launched a food delivery app with similar funding, similar technology, and comparable teams of twelve people. After eighteen months, only one company is thriving. The difference came down to how each founder led their team.",
        details: [
          "Alex (autocratic) made every product decision alone - the app launched fast but the team burned out, and eight of twelve employees quit within a year",
          "Jordan (democratic) held weekly team votes on features - the team loved the culture, but the app took 14 months to launch and missed the market window",
          "Sam (adaptive) used autocratic decisions for urgent technical issues, democratic input for product features, and laissez-faire freedom for the senior engineering team",
          "Sam's company launched in 7 months, retained 11 of 12 employees, and captured market share from both competitors"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mgmt2-aq1",
          question: "What does Sam's success in the scenario demonstrate about effective leadership?",
          options: [
            "Democratic leadership is always the safest approach for startups",
            "Adapting leadership style to the situation produces better outcomes",
            "Autocratic leadership should be avoided in all business contexts",
            "Laissez-faire works best when teams are small and well-funded"
          ],
          correctAnswer: 1,
          explanation: "Sam succeeded by matching the leadership style to the situation - autocratic for urgency, democratic for product vision, laissez-faire for senior experts. The best leaders are situational, not one-dimensional."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Autocratic leadership is fast and decisive but can harm morale and creativity",
          "Democratic leadership builds buy-in and engagement but can slow decision-making",
          "Laissez-faire leadership empowers experts but can create chaos without direction",
          "The most effective leaders adapt their style to the situation and team maturity",
          "Leadership style directly impacts retention, speed, and organizational culture"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "mgmt2-mq1",
            question: "A hospital emergency room director must coordinate staff during a mass casualty event. Which style fits best?",
            options: [
              "Democratic - gather input from all medical staff before acting",
              "Laissez-faire - let each doctor decide their own patient priorities",
              "Autocratic - issue clear directives to coordinate the response",
              "Collaborative - form committees to discuss treatment protocols"
            ],
            correctAnswer: 2,
            explanation: "In a mass casualty event, there's no time for discussion. Autocratic leadership provides the clear, immediate coordination needed to save lives."
          },
          {
            id: "mgmt2-mq2",
            question: "A game design studio wants to brainstorm ideas for their next title. Which leadership approach would generate the most creative output?",
            options: [
              "Autocratic - the creative director should decide all concepts alone",
              "Democratic - involve the team in ideation and evaluate ideas together",
              "Laissez-faire - cancel all meetings and let people work independently",
              "Hierarchical - have each department submit one idea through their manager"
            ],
            correctAnswer: 1,
            explanation: "Creative work benefits from diverse perspectives and collaborative input. Democratic leadership encourages everyone to contribute ideas while maintaining structure."
          },
          {
            id: "mgmt2-mq3",
            question: "Why might a laissez-faire style work well for a team of experienced senior engineers?",
            options: [
              "Senior engineers prefer having no deadlines or deliverables at all",
              "They have the expertise to self-direct without constant oversight",
              "It eliminates the need for any project management tools or processes",
              "Experienced teams never disagree, so leadership is unnecessary"
            ],
            correctAnswer: 1,
            explanation: "Experienced professionals often work best with autonomy. They understand the work, can self-organize, and may feel constrained by too much oversight."
          },
          {
            id: "mgmt2-mq4",
            question: "What is the PRIMARY disadvantage of relying on only one leadership style in all situations?",
            options: [
              "It makes the leader appear consistent and predictable to their team",
              "Some situations require a different approach than the leader's default",
              "Teams always prefer leaders who change styles frequently every day",
              "Single-style leaders earn higher trust because of their predictability"
            ],
            correctAnswer: 1,
            explanation: "Different situations demand different approaches. A leader who is always autocratic will stifle innovation; one who is always laissez-faire may lose control during crises."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // MGMT-3: Organizational Structure
  // ═══════════════════════════════════════════════
  {
    lessonId: "mgmt-3",
    sections: [
      {
        type: "concept",
        title: "How Companies Organize Themselves",
        paragraphs: [
          "Organizational structure is the framework that defines how tasks are divided, who reports to whom, and how information flows through a company. Get it right, and people work efficiently. Get it wrong, and even talented teams struggle.",
          "In a flat structure, there are few management layers between employees and leadership. Communication is fast, decisions happen quickly, and everyone feels close to the mission. But as companies grow, flat structures can create confusion about who makes final calls.",
          "In a hierarchical structure, there are clear chains of command. Roles are well-defined, promotions are visible, and accountability is straightforward. However, too many layers slow decisions and create bureaucracy. The 'span of control' - how many people a manager oversees - determines how wide or tall the org chart looks."
        ],
        bullets: [
          "Flat structure - fewer layers, faster communication, harder to scale",
          "Hierarchical structure - clear authority, defined roles, risk of bureaucracy",
          "Span of control - number of direct reports per manager",
          "No perfect structure exists - the right one depends on size, culture, and industry"
        ],
        realWorldExample: "Valve, the video game company, famously operates with an almost completely flat structure - employees choose their own projects and there are no formal managers. This works because they hire exceptionally talented, self-motivated people. Meanwhile, McDonald's uses a strict hierarchy because consistency across 40,000 locations demands standardized procedures and clear chains of command. Both companies are successful - with radically different structures."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mgmt3-mc1",
            question: "What is 'span of control' in organizational design?",
            options: [
              "The total number of employees in the entire organization",
              "The number of direct reports a single manager oversees",
              "The geographic area a company's operations cover",
              "The amount of budget authority given to each department"
            ],
            correctAnswer: 1,
            explanation: "Span of control refers to how many people report directly to one manager. A wide span means many reports (common in flat orgs); a narrow span means fewer reports (common in hierarchies)."
          },
          {
            id: "mgmt3-mc2",
            question: "What is the biggest challenge when a startup maintains a flat structure as it grows from 10 to 200 employees?",
            options: [
              "Employees will demand higher salaries automatically",
              "Decision-making becomes unclear without defined authority",
              "Flat structures prevent companies from hiring new employees",
              "All employees must become managers to maintain the structure"
            ],
            correctAnswer: 1,
            explanation: "At 10 people, everyone can talk to everyone. At 200, without defined roles and authority, decisions stall, responsibilities overlap, and accountability disappears."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Startups, Two Structural Mistakes",
        narrative: "NovaTech and StructureFirst both started as 8-person teams building similar SaaS products. As they grew, each made a different organizational mistake - and both paid the price.",
        details: [
          "NovaTech stayed flat at 120 employees - no one knew who had final say on product decisions, leading to six months of conflicting priorities",
          "StructureFirst added four management layers at just 25 employees - every decision needed three approvals, and their product updates took 4x longer than competitors",
          "NovaTech eventually lost three key engineers who were frustrated by the lack of clear career paths and role definition",
          "StructureFirst's best designer quit because she had to get approval from people who didn't understand her work",
          "Both companies eventually restructured - NovaTech added team leads with clear authority, and StructureFirst flattened to two management layers"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mgmt3-aq1",
          question: "What do both companies' mistakes in the scenario have in common?",
          options: [
            "Both hired the wrong people for their management positions",
            "Both mismatched their organizational structure to their actual size",
            "Both failed because flat structures never work for tech companies",
            "Both should have hired external consultants to make all decisions"
          ],
          correctAnswer: 1,
          explanation: "NovaTech stayed too flat for 120 people, and StructureFirst added too much hierarchy for 25. The lesson: structure should evolve with company size and needs."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Flat structures enable speed but can create confusion at scale",
          "Hierarchical structures provide clarity but can slow innovation",
          "Span of control determines how many people one manager oversees",
          "The right structure depends on company size, industry, and culture",
          "Successful companies adapt their structure as they grow - rigidity is the enemy"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "mgmt3-mq1",
            question: "A 15-person startup has no managers and makes decisions by team consensus. What structural risk do they face as they grow?",
            options: [
              "They will automatically become more profitable over time",
              "Consensus decision-making breaks down when too many voices are involved",
              "Small companies never need to worry about organizational structure",
              "Adding managers is only necessary for companies with over 1,000 employees"
            ],
            correctAnswer: 1,
            explanation: "Consensus works with small groups but becomes impractical as headcount grows. Eventually, decisions stall because too many people need to agree."
          },
          {
            id: "mgmt3-mq2",
            question: "Why would a fast-food chain like Subway use a hierarchical structure rather than a flat one?",
            options: [
              "Hierarchy prevents employees from communicating with each other",
              "Flat structures are illegal for franchised restaurant businesses",
              "Consistency across thousands of locations requires standardized processes",
              "Hierarchies are always more profitable than flat organizations"
            ],
            correctAnswer: 2,
            explanation: "With thousands of locations, consistency is critical. Hierarchical structures enforce standards, training protocols, and accountability across the entire franchise system."
          },
          {
            id: "mgmt3-mq3",
            question: "What is the relationship between span of control and organizational layers?",
            options: [
              "Wider span of control typically means fewer organizational layers",
              "Wider span of control always means more organizational layers",
              "Span of control has no impact on how many layers exist overall",
              "Narrow span of control always creates flat organizational charts"
            ],
            correctAnswer: 0,
            explanation: "When managers oversee more people (wider span), you need fewer layers to cover everyone. Narrow spans mean more managers and more layers - creating a taller hierarchy."
          },
          {
            id: "mgmt3-mq4",
            question: "A company with 50 employees has five management layers. What is the most likely problem?",
            options: [
              "The company is too small for that many layers of hierarchy",
              "Five layers is the minimum required for any company over 20 people",
              "The company should add more layers to improve communication flow",
              "Management layers have no effect on company performance or speed"
            ],
            correctAnswer: 0,
            explanation: "Five layers for 50 people means excessive bureaucracy - decisions pass through too many hands, slowing everything down. Most 50-person companies operate well with 2-3 layers."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // MGMT-4: SWOT Analysis
  // ═══════════════════════════════════════════════
  {
    lessonId: "mgmt-4",
    sections: [
      {
        type: "concept",
        title: "SWOT - A Framework for Better Decisions",
        paragraphs: [
          "SWOT analysis is one of the most widely used decision-making frameworks in business. It stands for Strengths, Weaknesses, Opportunities, and Threats. By mapping these four areas, you can make more informed decisions about whether to pursue a project, launch a product, or enter a market.",
          "Strengths and weaknesses are internal - things you control. Your skills, resources, reputation, and team fall into these categories. Opportunities and threats are external - things happening in the market, economy, or competitive landscape that affect you.",
          "The power of SWOT isn't just listing items in each box. It's about understanding how they interact. A strength can help you seize an opportunity. A weakness can amplify a threat. The best strategists use SWOT to connect the dots, not just create lists."
        ],
        bullets: [
          "Strengths - internal advantages you can leverage (skills, brand, resources)",
          "Weaknesses - internal gaps to address (limited funding, small team)",
          "Opportunities - external conditions to capitalize on (market trends, gaps)",
          "Threats - external risks to prepare for (competition, regulation, economy)"
        ],
        realWorldExample: "When Netflix decided to shift from DVD-by-mail to streaming, their SWOT looked like this: Strengths included a massive subscriber base and recommendation algorithm. Weaknesses included no streaming content library. Opportunities included growing broadband adoption. Threats included Blockbuster's 10,000 physical stores. By leveraging their strengths against the opportunity, they transformed an entire industry."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mgmt4-mc1",
            question: "In a SWOT analysis, which two categories represent factors you can directly control?",
            options: [
              "Opportunities and threats - external market dynamics",
              "Strengths and opportunities - positive factors only",
              "Strengths and weaknesses - internal characteristics",
              "Weaknesses and threats - negative factors only"
            ],
            correctAnswer: 2,
            explanation: "Strengths and weaknesses are internal - they come from within your organization. Opportunities and threats are external - they come from the market and environment."
          },
          {
            id: "mgmt4-mc2",
            question: "A coffee shop's experienced baristas are a SWOT _______, while a new competitor opening next door is a SWOT _______.",
            options: [
              "Opportunity, weakness - because both can be changed over time",
              "Strength, threat - one is internal advantage, one is external risk",
              "Weakness, opportunity - one needs improvement, one creates growth",
              "Threat, strength - competition drives the baristas to work harder"
            ],
            correctAnswer: 1,
            explanation: "Experienced baristas are an internal advantage (strength). A new competitor is an external risk you can't control (threat). SWOT categorization depends on whether the factor is internal or external."
          }
        ]
      },
      {
        type: "scenario",
        title: "Should You Launch a Tutoring Business at School?",
        narrative: "You're a junior who excels at math and science. Several classmates have asked you for help, and you're considering starting a paid tutoring business at your school. Before investing time and money, you decide to run a SWOT analysis.",
        details: [
          "Strengths: You have strong grades (4.0 GPA in STEM), a good reputation with teachers, and three classmates willing to be your first clients",
          "Weaknesses: You have no business experience, limited time due to sports, and no marketing skills",
          "Opportunities: Your school has 2,000 students, no existing tutoring service, and SAT prep season is approaching",
          "Threats: A national tutoring company recently opened a location 2 miles away charging $50/hour, and some teachers offer free after-school help"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mgmt4-aq1",
          question: "Based on the SWOT analysis, what is the student's strongest strategic advantage over the national tutoring company?",
          options: [
            "The student has more business experience and marketing resources",
            "The student can charge higher rates due to their strong reputation",
            "The student has on-campus access and peer relationships competitors lack",
            "The national company is unlikely to attract any local students"
          ],
          correctAnswer: 2,
          explanation: "Being physically at school with existing peer relationships is a strength the national company can't replicate. Combined with the opportunity (no on-campus competition), this creates a strategic advantage."
        }
      },
      {
        type: "recap",
        takeaways: [
          "SWOT stands for Strengths, Weaknesses, Opportunities, and Threats",
          "Strengths and weaknesses are internal; opportunities and threats are external",
          "The value of SWOT is in connecting the dots - not just making lists",
          "Use strengths to seize opportunities and prepare for threats",
          "SWOT works for personal decisions, business launches, and strategic planning"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "mgmt4-mq1",
            question: "A bakery has an award-winning recipe but limited parking. Which SWOT categories do these represent?",
            options: [
              "Both are weaknesses because they affect customer experience",
              "Award-winning recipe is an opportunity; parking is a threat",
              "Award-winning recipe is a strength; limited parking is a weakness",
              "Both are strengths because the bakery is already established"
            ],
            correctAnswer: 2,
            explanation: "The recipe is an internal advantage (strength). Limited parking is an internal limitation (weakness). Both are within the bakery's domain, not external market factors."
          },
          {
            id: "mgmt4-mq2",
            question: "New government regulations requiring food trucks to have health inspections would be classified as what in a food truck's SWOT?",
            options: [
              "Strength - regulations show the government supports food trucks",
              "Weakness - the food truck should already have health inspections",
              "Opportunity - inspections will help the truck attract more customers",
              "Threat - external regulation increases costs and compliance burden"
            ],
            correctAnswer: 3,
            explanation: "Government regulations are external factors outside the business's control. New requirements that increase costs represent a threat - even if the truck can adapt."
          },
          {
            id: "mgmt4-mq3",
            question: "Why is it important to analyze how SWOT factors interact rather than just listing them?",
            options: [
              "Lists are harder to read than paragraphs in business presentations",
              "Interactions reveal strategic actions - like using strengths to counter threats",
              "SWOT categories overlap completely, so listing them is redundant",
              "Business professors require interaction analysis for higher exam scores"
            ],
            correctAnswer: 1,
            explanation: "The strategic value of SWOT comes from connections: Can a strength neutralize a threat? Can a weakness be fixed to capture an opportunity? These interactions guide real decisions."
          },
          {
            id: "mgmt4-mq4",
            question: "A tech startup's biggest competitor just went bankrupt. In the startup's SWOT, this is best classified as:",
            options: [
              "A strength - it proves the startup's product is better",
              "A weakness - the startup may face the same financial issues",
              "An opportunity - reduced competition creates market share to capture",
              "A threat - the industry may be declining if competitors are failing"
            ],
            correctAnswer: 2,
            explanation: "A competitor's failure is an external event that creates potential market share for the startup. This is an opportunity - though a savvy analyst would also consider if it signals industry-wide threats."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // MGMT-5: Porter's Five Forces
  // ═══════════════════════════════════════════════
  {
    lessonId: "mgmt-5",
    sections: [
      {
        type: "concept",
        title: "Porter's Five Forces - Understanding Competitive Dynamics",
        paragraphs: [
          "Michael Porter, a Harvard professor, developed the Five Forces framework to help businesses understand the competitive forces that shape every industry. It goes beyond just looking at your direct competitors - it examines five different pressures that determine how profitable an industry can be.",
          "The five forces are: competitive rivalry (how intense is competition?), supplier power (can suppliers dictate terms?), buyer power (can customers demand lower prices?), threat of substitutes (can customers switch to alternatives?), and threat of new entrants (how easy is it for new competitors to enter?).",
          "When all five forces are strong, an industry is brutally competitive and profits are thin. When forces are weak, companies can earn outsized profits. Understanding these forces helps businesses decide where to compete and how to position themselves."
        ],
        bullets: [
          "Competitive rivalry - intensity of competition among existing players",
          "Supplier power - ability of suppliers to raise prices or limit quality",
          "Buyer power - ability of customers to demand lower prices or better terms",
          "Threat of substitutes - availability of alternative products or services",
          "Threat of new entrants - how easy it is for new competitors to enter the market"
        ],
        realWorldExample: "The airline industry is a textbook example of strong Five Forces: intense rivalry (many airlines compete on price), high supplier power (Boeing and Airbus are the only major plane makers), strong buyer power (customers compare prices instantly online), many substitutes (trains, cars, video calls), and moderate threat of new entrants (expensive but budget carriers keep emerging). That's why airline profit margins are notoriously thin."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mgmt5-mc1",
            question: "In Porter's Five Forces, what does 'threat of substitutes' mean?",
            options: [
              "The risk that your employees will leave for competing companies",
              "The risk that customers will switch to alternative products or services",
              "The risk that your suppliers will start selling directly to consumers",
              "The risk that the government will regulate your industry more heavily"
            ],
            correctAnswer: 1,
            explanation: "Threat of substitutes refers to customers choosing different products that meet the same need. For example, someone might choose a train over a flight - a substitute, not a direct competitor."
          },
          {
            id: "mgmt5-mc2",
            question: "When buyer power is HIGH, which of the following is most likely?",
            options: [
              "Companies can charge premium prices without losing customers",
              "Customers can pressure companies to lower prices or improve quality",
              "Suppliers gain more control over the industry's supply chain",
              "New competitors are discouraged from entering the marketplace"
            ],
            correctAnswer: 1,
            explanation: "High buyer power means customers have leverage - perhaps because there are many alternatives or switching costs are low. This forces companies to compete harder on price and quality."
          }
        ]
      },
      {
        type: "scenario",
        title: "Should a Local Coffee Shop Expand?",
        narrative: "Maya owns a successful single-location coffee shop in a college town. She's considering opening a second location across town. Before committing $150,000 in startup costs, she analyzes the market using Porter's Five Forces.",
        details: [
          "Competitive rivalry: HIGH - there are 12 coffee shops within 3 miles of the proposed location, including two Starbucks",
          "Supplier power: MODERATE - Maya sources beans from three local roasters who also supply her competitors",
          "Buyer power: HIGH - college students are extremely price-sensitive and will walk an extra block for a cheaper latte",
          "Threat of substitutes: MODERATE - energy drinks, tea shops, and home brewing are popular alternatives",
          "Threat of new entrants: HIGH - low startup costs mean new coffee shops open (and close) frequently in college towns"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mgmt5-aq1",
          question: "Based on Maya's Five Forces analysis, what should concern her MOST about the expansion?",
          options: [
            "Supplier power - her roasters might stop selling to her entirely",
            "Intense rivalry combined with high buyer power will compress her profit margins",
            "The threat of substitutes - students will stop drinking coffee altogether",
            "Threat of new entrants - the government may ban new coffee shop permits"
          ],
          correctAnswer: 1,
          explanation: "The combination of 12 competitors (high rivalry) and price-sensitive students (high buyer power) means Maya will face heavy pressure to keep prices low while competing for customers - squeezing margins dangerously."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Porter's Five Forces analyzes competitive rivalry, supplier power, buyer power, substitutes, and new entrants",
          "Strong forces mean lower profits; weak forces mean higher profit potential",
          "The framework helps businesses understand why some industries are more profitable than others",
          "Analyzing forces BEFORE entering a market prevents costly mistakes",
          "Forces interact - high rivalry plus high buyer power is worse than either force alone"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "mgmt5-mq1",
            question: "Why are pharmaceutical companies generally more profitable than restaurant chains?",
            options: [
              "Pharmaceutical companies have lower operating costs than restaurants",
              "Restaurant chains have stronger brand loyalty than drug companies",
              "Pharma has weaker Five Forces - patents block entrants and buyers have less power",
              "Restaurants benefit from higher threat of substitutes which drives innovation"
            ],
            correctAnswer: 2,
            explanation: "Patents create massive barriers to entry, and patients often can't choose alternatives to prescribed medications (low buyer power, low substitutes). This creates a favorable Five Forces environment for pharma."
          },
          {
            id: "mgmt5-mq2",
            question: "A software company is the ONLY provider of a specialized tool with no alternatives. Which force is weakest for them?",
            options: [
              "Competitive rivalry - they have no direct competitors currently",
              "Supplier power - they don't depend on any external suppliers",
              "Buyer power - their customers have many choices available",
              "Threat of new entrants - it's easy for others to build similar tools"
            ],
            correctAnswer: 0,
            explanation: "Being the only provider means competitive rivalry is essentially zero. However, this doesn't mean the company is safe - new entrants or substitutes could emerge."
          },
          {
            id: "mgmt5-mq3",
            question: "How does the threat of new entrants affect existing companies in an industry?",
            options: [
              "It has no impact because existing companies already have loyal customers",
              "It forces existing companies to keep prices reasonable and innovate continuously",
              "It only matters for small businesses, not large established corporations",
              "New entrants always fail, so existing companies can safely ignore the threat"
            ],
            correctAnswer: 1,
            explanation: "Even the threat of new competitors entering keeps existing companies disciplined - they can't raise prices too high or stop innovating, because that would create a profit opportunity for entrants."
          },
          {
            id: "mgmt5-mq4",
            question: "A grocery store's main supplier of organic produce is the only farm within 100 miles. Which Five Force is strongest?",
            options: [
              "Competitive rivalry - grocery stores compete intensely on produce quality",
              "Buyer power - customers can easily switch to a different grocery store",
              "Supplier power - the farm can dictate prices because there's no alternative",
              "Threat of substitutes - customers will switch to conventional produce instead"
            ],
            correctAnswer: 2,
            explanation: "With only one supplier available, that farm has enormous leverage - they can raise prices knowing the grocery store has no alternative source for organic produce within 100 miles."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // MGMT-6: KPIs & Measuring Business Performance
  // ═══════════════════════════════════════════════
  {
    lessonId: "mgmt-6",
    sections: [
      {
        type: "concept",
        title: "KPIs - The Numbers That Actually Matter",
        paragraphs: [
          "Key Performance Indicators (KPIs) are the specific metrics a business tracks to measure whether it's achieving its goals. Not every number is a KPI - only the ones that directly connect to strategic objectives qualify. Revenue is a metric. Revenue growth rate compared to the industry average is a KPI.",
          "KPIs fall into two categories: leading and lagging indicators. Lagging indicators measure results that have already happened - like quarterly revenue or annual profit. Leading indicators predict future performance - like customer satisfaction scores or new leads generated this month.",
          "The best businesses track both types. Lagging indicators tell you where you've been. Leading indicators tell you where you're headed. Relying on only one type is like driving a car using only the rearview mirror - or only looking ahead without checking your gauges."
        ],
        bullets: [
          "KPIs are metrics directly tied to strategic business objectives",
          "Leading indicators predict future outcomes (customer satisfaction, pipeline)",
          "Lagging indicators measure past results (revenue, profit, churn rate)",
          "Different departments track different KPIs aligned to their specific goals"
        ],
        realWorldExample: "Amazon tracks hundreds of metrics, but Jeff Bezos famously focused on three KPIs above all others: customer selection (how many products are available), price (are we the cheapest?), and delivery speed (how fast can we get it there?). Every major investment - from warehouses to Prime - was driven by these three KPIs. This focus transformed Amazon from an online bookstore into the world's largest retailer."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mgmt6-mc1",
            question: "What is the difference between a leading and a lagging indicator?",
            options: [
              "Leading indicators are more important; lagging indicators can be ignored",
              "Leading indicators predict future results; lagging indicators measure past outcomes",
              "Leading indicators apply to large companies; lagging indicators apply to startups",
              "Leading indicators track expenses; lagging indicators track only revenue"
            ],
            correctAnswer: 1,
            explanation: "Leading indicators (like customer satisfaction) predict what's coming. Lagging indicators (like revenue) confirm what already happened. Both are essential for a complete picture."
          },
          {
            id: "mgmt6-mc2",
            question: "Why shouldn't a business track every possible metric as a KPI?",
            options: [
              "Tracking metrics is too expensive for most small businesses",
              "Too many KPIs create information overload and dilute strategic focus",
              "Most business metrics are completely unreliable and inaccurate",
              "Government regulations limit how many metrics companies can track"
            ],
            correctAnswer: 1,
            explanation: "When everything is a KPI, nothing is. Too many metrics make it impossible to focus on what truly drives success. The best companies identify a few critical KPIs and track them obsessively."
          }
        ]
      },
      {
        type: "scenario",
        title: "Same Revenue, Very Different Health",
        narrative: "ShopFast and SteadyGoods are two e-commerce businesses that both generated $2 million in revenue last year. An investor looking only at revenue might think they're equally healthy. But a deeper KPI analysis reveals a very different picture.",
        details: [
          "ShopFast: Customer acquisition cost is $85, customer retention rate is 15%, average order value is declining 8% per quarter, and 70% of revenue comes from paid ads",
          "SteadyGoods: Customer acquisition cost is $30, customer retention rate is 72%, average order value is growing 3% per quarter, and 55% of revenue comes from repeat customers",
          "ShopFast's leading indicators (declining order value, low retention) predict future revenue will drop",
          "SteadyGoods' leading indicators (growing order value, high retention) predict future revenue will increase",
          "Within 18 months, ShopFast's revenue dropped to $800K while SteadyGoods grew to $3.2 million"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mgmt6-aq1",
          question: "What does the ShopFast vs SteadyGoods scenario demonstrate about KPIs?",
          options: [
            "Revenue is the only KPI that matters for evaluating business performance",
            "Leading indicators like retention and acquisition cost reveal health that revenue alone hides",
            "E-commerce businesses should only track customer acquisition cost as a KPI",
            "Paid advertising is always a bad strategy for online retail businesses"
          ],
          correctAnswer: 1,
          explanation: "Revenue (a lagging indicator) looked identical for both companies. But leading indicators - retention, acquisition cost, order trends - revealed that ShopFast was on a decline while SteadyGoods was building sustainable growth."
        }
      },
      {
        type: "recap",
        takeaways: [
          "KPIs are specific metrics tied to strategic objectives - not just any number",
          "Leading indicators predict the future; lagging indicators measure the past",
          "Revenue alone doesn't tell you if a business is healthy or heading for trouble",
          "The best companies focus on a few critical KPIs rather than tracking everything",
          "Different departments need different KPIs aligned to their specific goals"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "mgmt6-mq1",
            question: "A subscription service notices that monthly cancellation requests have increased by 40%. This metric is best described as:",
            options: [
              "A leading indicator predicting future revenue decline",
              "A lagging indicator confirming the company is already unprofitable",
              "An irrelevant metric that has no impact on business performance",
              "A supplier-related metric that management cannot influence"
            ],
            correctAnswer: 0,
            explanation: "Rising cancellation requests are a leading indicator - they predict that revenue will decline in the coming months as those cancellations take effect. Acting on this signal early can prevent losses."
          },
          {
            id: "mgmt6-mq2",
            question: "Which of the following would be the BEST KPI for a restaurant trying to improve customer experience?",
            options: [
              "Total number of employees working each shift at the restaurant",
              "Average customer satisfaction score from post-meal surveys taken",
              "The restaurant's total square footage and seating capacity",
              "Number of menu items offered compared to competitor restaurants"
            ],
            correctAnswer: 1,
            explanation: "Customer satisfaction scores directly measure the experience the restaurant is trying to improve. The other options are operational metrics that don't directly capture customer experience quality."
          },
          {
            id: "mgmt6-mq3",
            question: "Why is customer retention rate considered a more valuable KPI than total revenue for many subscription businesses?",
            options: [
              "Retention rate is easier and cheaper to calculate than total revenue",
              "High retention drives sustainable revenue; high revenue can mask churn",
              "Total revenue includes expenses, making it an unreliable metric overall",
              "Retention rate is the only metric investors examine during fundraising"
            ],
            correctAnswer: 1,
            explanation: "A company can have high revenue while losing customers rapidly (through aggressive acquisition spending). Retention rate reveals whether revenue is sustainable or artificially inflated."
          },
          {
            id: "mgmt6-mq4",
            question: "A company's quarterly profit report shows a 20% increase. What additional KPI would help determine if this trend is sustainable?",
            options: [
              "The CEO's total compensation package compared to industry averages",
              "Customer acquisition cost and customer lifetime value trends over time",
              "The total number of employees hired during the same quarter",
              "The company's office lease terms and real estate expenses this year"
            ],
            correctAnswer: 1,
            explanation: "Profit is a lagging indicator. Customer acquisition cost and lifetime value are leading indicators that reveal whether that profit growth can continue - or if it was a one-time spike."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // MGMT-7: Human Resources & Hiring
  // ═══════════════════════════════════════════════
  {
    lessonId: "mgmt-7",
    sections: [
      {
        type: "concept",
        title: "The True Cost of Getting Hiring Wrong",
        paragraphs: [
          "Hiring the right people is one of the most important - and most expensive - decisions a business makes. The U.S. Department of Labor estimates that a bad hire costs a company 30% of that employee's first-year salary. For a $60,000 position, that's $18,000 wasted on recruitment, training, lost productivity, and starting over.",
          "The hiring process has three critical phases: recruitment (finding candidates), onboarding (integrating new hires), and retention (keeping good employees). Companies that rush recruitment often regret it. Companies that skip onboarding lose people within months. And companies that ignore retention watch their best talent walk to competitors.",
          "There's a well-known saying in business: 'Hire slow, fire fast.' It means taking your time to find the right person is almost always cheaper than quickly hiring the wrong one and dealing with the fallout. The best companies treat hiring as an investment, not an expense."
        ],
        bullets: [
          "Recruitment - finding and attracting qualified candidates for open positions",
          "Onboarding - training and integrating new hires into the company culture",
          "Retention - keeping talented employees through growth, compensation, and culture",
          "A bad hire costs roughly 30% of the position's annual salary in total losses"
        ],
        realWorldExample: "Zappos, the online shoe retailer, is famous for its hiring culture. After an intensive interview process, new hires go through a 4-week paid training program. At the end, Zappos offers each new employee $2,000 to quit - yes, to leave. Why? Because they'd rather pay $2,000 now than keep someone who isn't truly committed, which would cost far more in the long run. About 97% of new hires stay."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mgmt7-mc1",
            question: "Why is 'hire slow, fire fast' considered good business advice?",
            options: [
              "Slow hiring processes discourage unqualified candidates from applying",
              "Taking time to evaluate candidates prevents costly bad hire mistakes",
              "Fast firing saves the company from paying employee health benefits",
              "Slow hiring is legally required by employment regulations in most states"
            ],
            correctAnswer: 1,
            explanation: "Carefully evaluating candidates reduces the chance of a bad hire - which costs time, money, and team morale. Rushing the process often leads to expensive mistakes that take months to fix."
          },
          {
            id: "mgmt7-mc2",
            question: "What is the PRIMARY purpose of employee onboarding?",
            options: [
              "To test whether new employees can handle pressure immediately",
              "To integrate new hires into the company's culture, tools, and expectations",
              "To evaluate whether the employee should receive a raise in six months",
              "To comply with government requirements for new employee documentation"
            ],
            correctAnswer: 1,
            explanation: "Onboarding is about setting new employees up for success - teaching them how the company works, introducing them to their team, and ensuring they can contribute effectively from day one."
          }
        ]
      },
      {
        type: "scenario",
        title: "Fast Hire vs. Careful Hire - 18 Month Comparison",
        narrative: "Two founders, Kai and Elena, each needed to hire a head of marketing for their growing startups. They took very different approaches, and the results over eighteen months were dramatic.",
        details: [
          "Kai hired the first impressive candidate after two interviews - the hire started in 10 days",
          "Elena interviewed 23 candidates over 8 weeks, including skills tests and team-fit assessments",
          "Kai's hire launched three campaigns that failed because they didn't understand the product or customers - total cost: $140,000 in wasted ad spend plus the $95,000 salary",
          "Elena's hire spent her first month learning the product deeply before launching - her first campaign generated $380,000 in new revenue",
          "At month 12, Kai had to fire his hire and start the search again - losing another 3 months of productivity",
          "At month 18, Elena's hire had been promoted and was training a team of three marketing associates"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mgmt7-aq1",
          question: "What was the most costly consequence of Kai's rushed hiring decision?",
          options: [
            "He had to conduct too many interviews before finding a replacement",
            "The combined cost of wasted spend, salary, and lost time exceeded $250,000",
            "Elena's company gained a temporary marketing advantage for two weeks",
            "Kai's other employees demanded higher salaries after the bad hire left"
          ],
          correctAnswer: 1,
          explanation: "Kai lost $140K in failed campaigns, paid $95K+ in salary, then lost 3 months restarting the search. The total cost far exceeded what a slower, more careful process would have cost upfront."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A bad hire costs roughly 30% of the position's annual salary - often more",
          "The three phases of hiring are recruitment, onboarding, and retention",
          "Taking time to evaluate candidates saves money compared to rushing decisions",
          "Strong onboarding programs dramatically improve new hire success and retention",
          "Retention strategies (growth opportunities, culture, fair pay) are cheaper than constant rehiring"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "mgmt7-mq1",
            question: "A company has 40% annual employee turnover. Which area of HR should they investigate FIRST?",
            options: [
              "Recruitment - they may be attracting the wrong type of candidates",
              "Onboarding - new employees may not be getting enough initial support",
              "Retention - something is causing trained employees to leave consistently",
              "Termination - they may be firing too many employees unnecessarily"
            ],
            correctAnswer: 2,
            explanation: "40% turnover means nearly half the workforce leaves every year. While recruitment and onboarding matter, the primary issue is retention - why are people leaving after being hired and trained?"
          },
          {
            id: "mgmt7-mq2",
            question: "Why does Zappos offer new hires $2,000 to quit after training?",
            options: [
              "They want to reduce their workforce to save on salary expenses",
              "It filters out people who aren't genuinely committed to the company",
              "New employees are required by law to have an opt-out option available",
              "The $2,000 is deducted from the employee's first paycheck if they stay"
            ],
            correctAnswer: 1,
            explanation: "The 'pay to quit' offer is a brilliant retention filter. Someone who takes $2,000 to leave would have eventually become a disengaged employee costing far more in lost productivity."
          },
          {
            id: "mgmt7-mq3",
            question: "A startup founder says 'I don't have time for formal onboarding - we just throw people in and they figure it out.' What is the likely result?",
            options: [
              "Employees learn faster because they're forced to be independent",
              "Higher early turnover and longer time before new hires become productive",
              "The company saves significant money by eliminating training programs",
              "New hires prefer this approach because they dislike structured training"
            ],
            correctAnswer: 1,
            explanation: "Without onboarding, new hires take longer to become productive, make more mistakes, and are more likely to leave within the first few months - all of which cost more than a proper onboarding program."
          },
          {
            id: "mgmt7-mq4",
            question: "Which factor has the GREATEST impact on long-term employee retention?",
            options: [
              "Free snacks, game rooms, and casual dress code in the office",
              "Opportunities for professional growth, fair pay, and meaningful work",
              "A strict policy of promoting based solely on years of experience",
              "Limiting all employees to exactly 40 hours per week with no overtime"
            ],
            correctAnswer: 1,
            explanation: "Research consistently shows that growth opportunities, fair compensation, and meaningful work drive long-term retention. Perks are nice but don't compensate for lack of career development."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // MGMT-8: Ethics in Business Decision-Making
  // ═══════════════════════════════════════════════
  {
    lessonId: "mgmt-8",
    sections: [
      {
        type: "concept",
        title: "Ethics, Stakeholders, and the Long Game",
        paragraphs: [
          "Every business faces ethical dilemmas - situations where the profitable choice and the 'right' choice seem to conflict. Stakeholder theory argues that businesses should consider the impact of their decisions on all stakeholders - employees, customers, communities, and shareholders - not just the bottom line.",
          "Short-term thinking often leads to cutting corners: using cheaper materials, underpaying workers, or hiding product defects. These decisions might boost quarterly profits, but they create reputational risk - the chance that public exposure of unethical behavior will destroy the company's brand and customer trust.",
          "Long-term thinking considers how today's decisions affect the company five, ten, or twenty years from now. Companies with strong ethical cultures tend to attract better talent, build deeper customer loyalty, and avoid the catastrophic costs of scandals. Ethics isn't just a moral issue - it's a strategic advantage."
        ],
        bullets: [
          "Stakeholder theory - consider impact on employees, customers, communities, and investors",
          "Reputational risk - unethical decisions can permanently destroy brand trust",
          "Short-term thinking - maximizing immediate profits at the expense of long-term health",
          "Ethical culture - organizations where doing the right thing is the default behavior"
        ],
        realWorldExample: "In 2015, Volkswagen was caught cheating on emissions tests - software in 11 million cars made them appear cleaner than they actually were. The short-term 'savings' on emissions technology cost VW over $33 billion in fines, buybacks, and legal settlements. Their stock dropped 40%, and their reputation damage lasted years. Meanwhile, Patagonia's commitment to environmental ethics has built one of the most loyal customer bases in retail - customers pay premium prices because they trust the brand."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mgmt8-mc1",
            question: "What does stakeholder theory argue businesses should consider when making decisions?",
            options: [
              "Only shareholder profit, since they own the company's equity",
              "The impact on all stakeholders - employees, customers, communities, and investors",
              "Government regulations only, ignoring customer and employee concerns",
              "Only the CEO's personal values and leadership philosophy preferences"
            ],
            correctAnswer: 1,
            explanation: "Stakeholder theory says businesses exist within a web of relationships. Decisions affect employees, customers, suppliers, communities, and shareholders - and considering all of them leads to better long-term outcomes."
          },
          {
            id: "mgmt8-mc2",
            question: "What is 'reputational risk' in business?",
            options: [
              "The chance that a company's logo design will become outdated",
              "The risk that a competitor will develop a better advertising campaign",
              "The risk that public exposure of unethical behavior will damage brand trust",
              "The financial cost of changing a company's name after a merger"
            ],
            correctAnswer: 2,
            explanation: "Reputational risk is the potential for negative public perception due to unethical actions. In the age of social media, one scandal can destroy decades of brand-building overnight."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Companies, Same Dilemma, Different Choices",
        narrative: "FreshBite and QuickMeals are two meal-kit delivery companies. Both discover that one of their suppliers has been using a pesticide that's legal but linked to health concerns in recent studies. Neither company is required by law to act. Here's what happened next.",
        details: [
          "QuickMeals decided to keep the supplier - switching would cost $400,000 and delay deliveries by two weeks. They chose short-term cost savings and said nothing publicly.",
          "FreshBite immediately disclosed the finding to customers, switched to an organic supplier at higher cost, and offered full refunds to recent customers who were concerned",
          "Six months later, an investigative journalist published a story about the pesticide - naming QuickMeals as a company that knew but didn't act",
          "QuickMeals lost 35% of subscribers within 60 days and faced a class-action lawsuit",
          "FreshBite was praised in the same article for their proactive response - their subscriber base grew 22% as QuickMeals customers switched",
          "Five years later, FreshBite is the market leader. QuickMeals was acquired at a discount after never recovering their reputation"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mgmt8-aq1",
          question: "What does the FreshBite vs QuickMeals scenario demonstrate about ethical decision-making?",
          options: [
            "Ethical decisions always cost more money and reduce a company's profitability",
            "Short-term cost savings from unethical choices often create larger long-term losses",
            "Companies should only act ethically when required to do so by existing laws",
            "Investigative journalists are the primary reason companies should behave ethically"
          ],
          correctAnswer: 1,
          explanation: "QuickMeals saved $400K short-term but lost 35% of revenue and faced lawsuits. FreshBite invested upfront in ethics and gained market share. The ethical choice was also the more profitable long-term choice."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Stakeholder theory says businesses should consider impact on all affected groups",
          "Reputational risk from unethical behavior can cost billions and destroy companies",
          "Short-term cost savings from cutting corners often create much larger long-term costs",
          "Companies with strong ethical cultures attract better talent and more loyal customers",
          "Ethics in business isn't just about morality - it's a strategic competitive advantage"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "mgmt8-mq1",
            question: "Volkswagen's emissions scandal cost them over $33 billion. This is an example of:",
            options: [
              "Supplier power in Porter's Five Forces framework affecting profitability",
              "Reputational risk materializing into massive financial and brand damage",
              "A normal business expense that all car manufacturers regularly experience",
              "Market competition driving prices down across the automotive industry"
            ],
            correctAnswer: 1,
            explanation: "VW's decision to cheat emissions tests was a classic case of short-term thinking creating catastrophic reputational risk. The $33 billion in costs dwarfed whatever they saved by not meeting emissions standards properly."
          },
          {
            id: "mgmt8-mq2",
            question: "Why does Patagonia's ethical stance on environmental issues actually INCREASE their profits?",
            options: [
              "Government subsidies reward companies that claim environmental commitment",
              "Customers pay premium prices because they trust and align with the brand values",
              "Ethical companies are exempt from paying standard corporate income taxes",
              "Patagonia has no competitors in the outdoor clothing and gear marketplace"
            ],
            correctAnswer: 1,
            explanation: "Patagonia's genuine commitment to environmental ethics builds deep customer loyalty. People willingly pay more because they trust the brand - proving that ethics can be a powerful profit driver."
          },
          {
            id: "mgmt8-mq3",
            question: "A CEO argues that the company's only obligation is to maximize shareholder profit. Which perspective does this represent?",
            options: [
              "Stakeholder theory - considering all groups affected by the business",
              "Shareholder primacy - prioritizing investor returns above all other groups",
              "Corporate social responsibility - balancing profit with social impact",
              "Servant leadership - putting employee needs before company profits"
            ],
            correctAnswer: 1,
            explanation: "Shareholder primacy holds that a company's primary duty is to its owners. Stakeholder theory argues for a broader view - considering employees, customers, and communities alongside shareholders."
          },
          {
            id: "mgmt8-mq4",
            question: "What makes ethical decision-making a 'strategic advantage' rather than just a cost?",
            options: [
              "Ethical companies are never subject to government audits or regulations",
              "It builds trust, attracts talent, retains customers, and prevents costly scandals",
              "Ethical companies can charge any price they want without losing sales",
              "Government agencies give ethical companies exclusive tax breaks and benefits"
            ],
            correctAnswer: 1,
            explanation: "Ethics creates measurable strategic advantages: stronger brand trust, better employee retention, more loyal customers, and avoidance of scandal costs. These compound over time into a durable competitive edge."
          }
        ]
      }
    ]
  }
]
