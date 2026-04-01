import { StructuredLessonContent } from "@/types"

export const leadershipManagementContent: StructuredLessonContent[] = [
  // LM-1: The Difference Between Leadership and Management
  {
    lessonId: "lm-1",
    sections: [
      {
        type: "concept",
        title: "Leadership vs Management — What's the Real Difference?",
        paragraphs: [
          "Many people use 'leadership' and 'management' interchangeably, but they describe fundamentally different roles. Management is about organizing, planning, and controlling resources to achieve specific objectives. Leadership is about inspiring, motivating, and guiding people toward a shared vision.",
          "A manager ensures the trains run on time. A leader decides where the trains should go. Both roles are essential — an organization needs managers to handle day-to-day operations and leaders to set direction and drive change.",
          "The best professionals learn to do both. You can be a manager who also leads, or a leader who also manages. Understanding the distinction helps you know which skill to apply in different situations."
        ],
        bullets: [
          "Management focuses on processes, systems, and efficiency",
          "Leadership focuses on people, vision, and inspiration",
          "Managers plan and organize — leaders motivate and innovate",
          "Both roles are necessary for organizational success",
          "Great leaders often develop strong management skills and vice versa"
        ],
        realWorldExample: "Steve Jobs was a visionary leader who set bold product direction at Apple, but he relied on Tim Cook — a brilliant operations manager — to handle supply chains and logistics. Together, they built one of the most valuable companies in history. Neither skill alone would have been enough."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "lm1-mc1",
            question: "What is the primary focus of management?",
            options: ["Inspiring people toward a shared vision", "Organizing resources to achieve specific objectives", "Creating new products and services", "Building personal relationships with employees"],
            correctAnswer: 1,
            explanation: "Management centers on organizing, planning, and controlling resources to meet objectives efficiently."
          },
          {
            id: "lm1-mc2",
            question: "Why do organizations need both leaders and managers?",
            options: ["Leaders handle finances while managers handle people", "Leaders set direction while managers ensure execution", "Managers create the vision while leaders implement it", "Leaders work externally while managers work internally"],
            correctAnswer: 1,
            explanation: "Leaders provide vision and direction, while managers ensure the day-to-day operations run smoothly to achieve that vision."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Paths at a Growing Startup",
        narrative: "TechForward is a 50-person startup that just landed a major contract. The CEO, Maria, is great at inspiring her team and pitching bold ideas to investors. But the company keeps missing deadlines because there's no clear system for tracking projects. Meanwhile, their head of operations, David, runs incredibly efficient systems but struggles to motivate the team during stressful periods. The company needs both skillsets working together.",
        details: [
          "Maria (Leader): Sets the vision, secures funding, inspires the team during all-hands meetings",
          "David (Manager): Creates project timelines, assigns resources, tracks deliverables",
          "Problem: Without David's systems, Maria's vision stays abstract; without Maria's inspiration, David's systems feel like bureaucracy",
          "Solution: They establish weekly syncs where Maria connects projects to the bigger mission and David breaks them into actionable steps"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "lm1-aq1",
          question: "A company has great systems and processes but employees feel uninspired and turnover is high. What is the most likely missing element?",
          options: ["Better management controls", "Stronger leadership and vision", "More detailed project plans", "Higher salaries for all employees"],
          correctAnswer: 1,
          explanation: "When systems work but people feel uninspired, the organization likely lacks leadership — someone to connect daily work to a meaningful purpose and motivate the team."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Management is about efficiency and execution; leadership is about vision and inspiration",
          "Organizations need both roles to succeed — one without the other creates imbalance",
          "The best professionals develop both leadership and management capabilities",
          "Managers ask 'How do we do this?' while leaders ask 'Why are we doing this?'"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "lm1-mq1",
            question: "Which statement best describes a key difference between leadership and management?",
            options: ["Leaders focus on short-term goals while managers focus on long-term strategy", "Leaders inspire change while managers maintain order", "Leaders work alone while managers work in teams", "Leaders avoid risk while managers embrace it"],
            correctAnswer: 1,
            explanation: "Leaders inspire people and drive change, while managers focus on maintaining order, systems, and processes."
          },
          {
            id: "lm1-mq2",
            question: "A manager creates detailed project timelines and assigns tasks to team members. This is an example of which management function?",
            options: ["Motivating and inspiring", "Planning and organizing", "Setting a long-term vision", "Building company culture"],
            correctAnswer: 1,
            explanation: "Creating timelines and assigning tasks is a classic planning and organizing function of management."
          },
          {
            id: "lm1-mq3",
            question: "Why might a company with excellent processes still struggle?",
            options: ["They have too many managers", "They lack leadership to inspire and align the team", "Their processes are too efficient", "They spend too much on technology"],
            correctAnswer: 1,
            explanation: "Without leadership to provide vision and motivation, even the best processes can feel meaningless to employees, leading to disengagement."
          },
          {
            id: "lm1-mq4",
            question: "Which scenario demonstrates effective leadership?",
            options: ["Creating a detailed spreadsheet of quarterly deliverables", "Rallying the team around a new company mission during tough times", "Conducting weekly status update meetings", "Reviewing expense reports for budget compliance"],
            correctAnswer: 1,
            explanation: "Rallying the team around a mission is a leadership act — it involves inspiring and motivating people toward a shared goal."
          },
          {
            id: "lm1-mq5",
            question: "What is the ideal approach for a professional who wants to be effective in both leadership and management?",
            options: ["Focus only on leadership since it's more important", "Develop both skills and know when to apply each", "Choose one role and specialize exclusively", "Avoid management tasks and delegate them entirely"],
            correctAnswer: 1,
            explanation: "The most effective professionals develop both skillsets and apply the right approach depending on the situation."
          }
        ]
      }
    ]
  },

  // LM-2: Leadership Styles
  {
    lessonId: "lm-2",
    sections: [
      {
        type: "concept",
        title: "Leadership Styles — Finding the Right Approach",
        paragraphs: [
          "Not all leaders lead the same way. Over decades of research, scholars have identified several distinct leadership styles, each with strengths and weaknesses. The four most commonly discussed are autocratic, democratic, laissez-faire, and transformational.",
          "Autocratic leaders make decisions unilaterally — they give orders and expect compliance. This works well in emergencies or when quick decisions are needed, but it can crush creativity and morale over time. Democratic leaders involve their team in decision-making, which builds buy-in but can slow things down.",
          "Laissez-faire leaders give their team almost total freedom, which works great with highly skilled, self-motivated experts but can lead to chaos with inexperienced teams. Transformational leaders inspire followers to exceed expectations by connecting work to a larger purpose — they're often the most admired, but this style requires exceptional communication skills."
        ],
        bullets: [
          "Autocratic: leader decides alone — fast but potentially demoralizing",
          "Democratic: team input shapes decisions — inclusive but slower",
          "Laissez-faire: minimal interference — empowering but risky with inexperienced teams",
          "Transformational: inspires change through vision — powerful but demanding",
          "The best leaders adapt their style to the situation"
        ],
        realWorldExample: "During the 2008 financial crisis, Jamie Dimon at JPMorgan Chase used an autocratic style to make rapid decisions that protected the bank. In contrast, Google's founders have historically used a more democratic/laissez-faire approach, giving engineers '20% time' to pursue passion projects — which produced Gmail and Google Maps."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "lm2-mc1",
            question: "Which leadership style involves the team in decision-making?",
            options: ["Autocratic", "Democratic", "Laissez-faire", "Bureaucratic"],
            correctAnswer: 1,
            explanation: "Democratic leadership actively involves team members in the decision-making process, gathering input before deciding."
          },
          {
            id: "lm2-mc2",
            question: "In what situation might an autocratic leadership style be most effective?",
            options: ["When the team needs creative freedom", "During an emergency requiring quick decisions", "When employees are highly experienced", "When building long-term company culture"],
            correctAnswer: 1,
            explanation: "Autocratic leadership excels in emergencies where fast, decisive action is needed without time for group discussion."
          }
        ]
      },
      {
        type: "scenario",
        title: "Four Leaders, Same Problem",
        narrative: "A mid-size restaurant chain is losing customers to a trendy new competitor. Four regional managers each respond differently based on their leadership style. The results vary dramatically over six months.",
        details: [
          "Autocratic leader: Immediately changes the menu and mandates new procedures — fast response but staff feels unheard and turnover spikes",
          "Democratic leader: Holds team meetings to brainstorm solutions — slower start but staff is engaged and contributes creative ideas",
          "Laissez-faire leader: Tells the team to 'figure it out' — experienced staff innovates but newer employees flounder without guidance",
          "Transformational leader: Paints a vision of becoming the neighborhood's favorite spot, inspires staff to go above and beyond — highest customer satisfaction scores"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "lm2-aq1",
          question: "A tech startup with experienced engineers needs a leader who trusts the team to innovate independently. Which style fits best?",
          options: ["Autocratic — they need strict direction", "Democratic — they should vote on every decision", "Laissez-faire — experienced teams thrive with autonomy", "None — startups don't need leadership"],
          correctAnswer: 2,
          explanation: "Laissez-faire works well with experienced, self-motivated professionals who can manage themselves and innovate independently."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Four main leadership styles: autocratic, democratic, laissez-faire, and transformational",
          "Each style has strengths and weaknesses depending on the situation",
          "Autocratic is fast but can hurt morale; democratic is inclusive but slower",
          "The best leaders are situational — they adapt their style to the context"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "lm2-mq1",
            question: "A transformational leader is most characterized by their ability to:",
            options: ["Make all decisions without consulting others", "Inspire followers to exceed expectations through vision", "Allow complete freedom with no oversight", "Follow strict rules and procedures"],
            correctAnswer: 1,
            explanation: "Transformational leaders inspire and motivate followers by connecting work to a meaningful vision and purpose."
          },
          {
            id: "lm2-mq2",
            question: "What is a major drawback of laissez-faire leadership?",
            options: ["It is too controlling", "It can lead to chaos with inexperienced teams", "It always produces slower results", "It ignores all employee input"],
            correctAnswer: 1,
            explanation: "Without guidance, inexperienced or less motivated team members may struggle, leading to confusion and poor outcomes."
          },
          {
            id: "lm2-mq3",
            question: "A hospital emergency room would most likely benefit from which leadership style?",
            options: ["Laissez-faire — let doctors figure it out", "Democratic — hold a vote before each procedure", "Autocratic — clear commands in high-stakes situations", "Transformational — inspire during each surgery"],
            correctAnswer: 2,
            explanation: "In life-or-death situations, autocratic leadership provides the clear, rapid decision-making needed."
          },
          {
            id: "lm2-mq4",
            question: "What does it mean to be a 'situational' leader?",
            options: ["Only leading when the situation is convenient", "Adapting your leadership style based on the context and team", "Avoiding leadership responsibilities entirely", "Using the same style regardless of circumstances"],
            correctAnswer: 1,
            explanation: "Situational leaders assess the needs of their team and the demands of the moment, then choose the most appropriate leadership approach."
          },
          {
            id: "lm2-mq5",
            question: "Which leadership style is most likely to build strong employee buy-in?",
            options: ["Autocratic", "Democratic", "Laissez-faire", "Bureaucratic"],
            correctAnswer: 1,
            explanation: "Democratic leadership involves team members in decisions, which builds ownership and buy-in for the outcomes."
          }
        ]
      }
    ]
  },

  // LM-3: Motivation Theories
  {
    lessonId: "lm-3",
    sections: [
      {
        type: "concept",
        title: "What Motivates People at Work?",
        paragraphs: [
          "Understanding what motivates people is one of the most important skills a leader can develop. Two foundational theories — Maslow's Hierarchy of Needs and Herzberg's Two-Factor Theory — offer frameworks for understanding human motivation in the workplace.",
          "Maslow argued that people have five levels of needs arranged in a pyramid: physiological (food, shelter), safety (job security), social (belonging), esteem (recognition), and self-actualization (fulfilling potential). People must satisfy lower needs before they can focus on higher ones. A hungry employee won't care about creative fulfillment.",
          "Herzberg took a different approach. He found that job satisfaction and dissatisfaction are driven by two separate sets of factors. 'Hygiene factors' (salary, working conditions, job security) prevent dissatisfaction but don't create motivation. 'Motivators' (achievement, recognition, meaningful work) actually drive engagement and performance."
        ],
        bullets: [
          "Maslow's Hierarchy: physiological → safety → social → esteem → self-actualization",
          "Lower needs must be met before higher needs become motivating",
          "Herzberg's hygiene factors: salary, conditions, policies — prevent dissatisfaction",
          "Herzberg's motivators: achievement, recognition, growth — create satisfaction",
          "Both theories suggest that money alone isn't enough to truly motivate people"
        ],
        realWorldExample: "Google provides free meals, nap pods, and generous salaries (hygiene factors) but also gives engineers autonomy, recognition, and opportunities to work on world-changing projects (motivators). This combination helps them consistently rank as one of the best places to work — because they address both sides of Herzberg's equation."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "lm3-mc1",
            question: "According to Maslow, what must happen before an employee can pursue self-actualization?",
            options: ["They must receive a promotion", "Their lower-level needs (safety, belonging, etc.) must be met first", "They must work at a large company", "They must complete specialized training"],
            correctAnswer: 1,
            explanation: "Maslow's theory states that basic needs must be satisfied before people can focus on higher-level needs like self-actualization."
          },
          {
            id: "lm3-mc2",
            question: "In Herzberg's theory, which is an example of a 'hygiene factor'?",
            options: ["Meaningful work assignments", "Public recognition for achievement", "Safe and clean working conditions", "Opportunities for creative expression"],
            correctAnswer: 2,
            explanation: "Working conditions are hygiene factors — they prevent dissatisfaction but don't actively motivate employees."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Coffee Shops, Two Approaches",
        narrative: "BeanCo and BrewRight are competing coffee shops across the street from each other. Both pay the same wages, but their employee retention rates are dramatically different. BeanCo has 80% annual turnover while BrewRight has only 15%.",
        details: [
          "BeanCo: Pays market rate but offers no recognition, rigid schedules, no input on menu — hygiene factors met but no motivators",
          "BrewRight: Same pay but employees name specialty drinks, receive monthly recognition awards, and have input on store decisions",
          "BrewRight addresses esteem and belonging needs (Maslow) and provides motivators beyond just pay (Herzberg)",
          "Result: BrewRight's employees feel valued and engaged, leading to better customer service and lower hiring costs"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "lm3-aq1",
          question: "An employee earns a good salary and has job security, but feels unfulfilled and disengaged. According to Herzberg, what is the most likely issue?",
          options: ["Their hygiene factors are not being met", "They lack motivators like meaningful work and recognition", "They need a higher salary", "They should find a less demanding job"],
          correctAnswer: 1,
          explanation: "When hygiene factors (salary, security) are met but engagement is low, the issue is typically a lack of motivators — meaningful work, recognition, and growth opportunities."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Maslow's hierarchy shows that basic needs must be met before higher-level motivation kicks in",
          "Herzberg distinguishes between factors that prevent dissatisfaction and those that create motivation",
          "Money and conditions are necessary but not sufficient for employee engagement",
          "Great leaders provide both hygiene factors AND motivators to build truly engaged teams"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "lm3-mq1",
            question: "Which level of Maslow's hierarchy addresses the need for recognition and respect?",
            options: ["Physiological", "Safety", "Social/Belonging", "Esteem"],
            correctAnswer: 3,
            explanation: "Esteem needs include recognition, respect, status, and self-confidence — the fourth level of Maslow's hierarchy."
          },
          {
            id: "lm3-mq2",
            question: "According to Herzberg, what happens when hygiene factors are inadequate?",
            options: ["Employees become highly motivated", "Employees experience job dissatisfaction", "Employees seek self-actualization", "Nothing changes in job performance"],
            correctAnswer: 1,
            explanation: "Poor hygiene factors (bad pay, poor conditions, unfair policies) lead to job dissatisfaction, even if motivators are present."
          },
          {
            id: "lm3-mq3",
            question: "A company raises salaries by 20% but sees no improvement in employee motivation. Which theory best explains this?",
            options: ["Maslow — employees already had physiological needs met", "Herzberg — salary is a hygiene factor, not a motivator", "Neither theory applies to this situation", "Maslow — employees need more money for self-actualization"],
            correctAnswer: 1,
            explanation: "Herzberg's theory explains that salary increases address hygiene factors (preventing dissatisfaction) but don't create active motivation."
          },
          {
            id: "lm3-mq4",
            question: "An employee who volunteers to lead a challenging new project is likely motivated by which of Maslow's needs?",
            options: ["Physiological needs", "Safety needs", "Self-actualization", "Social belonging"],
            correctAnswer: 2,
            explanation: "Seeking challenging opportunities to grow and reach one's full potential is characteristic of self-actualization — the highest level."
          },
          {
            id: "lm3-mq5",
            question: "What do both Maslow and Herzberg agree on regarding motivation?",
            options: ["Money is the primary motivator for all workers", "Motivation comes from more than just financial compensation", "All employees are motivated by the same things", "Physical working conditions don't matter"],
            correctAnswer: 1,
            explanation: "Both theorists recognized that while money matters, true motivation comes from deeper sources — purpose, growth, recognition, and belonging."
          }
        ]
      }
    ]
  },

  // LM-4: Organizational Structures
  {
    lessonId: "lm-4",
    sections: [
      {
        type: "concept",
        title: "How Companies Organize Themselves",
        paragraphs: [
          "Organizational structure determines how roles, responsibilities, and authority are arranged within a company. The structure a company chooses affects communication, decision-making speed, and overall culture. Two fundamental distinctions matter: flat vs. hierarchical, and functional vs. divisional.",
          "Flat organizations have few management layers — employees often report directly to senior leadership. This speeds up decision-making and fosters innovation but can become chaotic as the company grows. Hierarchical organizations have many layers of management with clear chains of command — great for large-scale operations but can slow down communication.",
          "Functional structures group employees by specialization (marketing, finance, engineering), which builds deep expertise but can create 'silos.' Divisional structures organize around products, regions, or customer types, which improves focus but can duplicate resources across divisions."
        ],
        bullets: [
          "Flat structure: few management layers, fast decisions, less bureaucracy",
          "Hierarchical structure: clear chain of command, defined roles, slower communication",
          "Functional structure: organized by department (marketing, finance, HR)",
          "Divisional structure: organized by product, region, or customer segment",
          "Most large companies use a hybrid approach combining elements of each"
        ],
        realWorldExample: "Valve, the gaming company behind Steam, famously operates with a completely flat structure — no managers, no job titles, employees choose their own projects. Meanwhile, the U.S. military uses one of the most hierarchical structures in existence. Both work extremely well for their specific contexts."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "lm4-mc1",
            question: "What is a key advantage of a flat organizational structure?",
            options: ["Clear chain of command for large teams", "Faster decision-making with fewer management layers", "Better specialization in departments", "Easier to scale to thousands of employees"],
            correctAnswer: 1,
            explanation: "Flat structures speed up decisions because there are fewer layers of management that information must pass through."
          },
          {
            id: "lm4-mc2",
            question: "A company organized by its North America, Europe, and Asia divisions is using which structure?",
            options: ["Functional", "Flat", "Divisional", "Matrix"],
            correctAnswer: 2,
            explanation: "Organizing by geographic region is a classic example of a divisional structure."
          }
        ]
      },
      {
        type: "scenario",
        title: "Restructuring at GrowthCo",
        narrative: "GrowthCo started as a 20-person startup with a flat structure where everyone reported to the two founders. Now at 500 employees, the company is experiencing confusion about roles, duplicated work, and decisions taking weeks because everything flows through the founders.",
        details: [
          "Original flat structure worked brilliantly at 20 people — fast, creative, minimal bureaucracy",
          "At 500 people, founders can't make every decision — bottlenecks form everywhere",
          "Solution: GrowthCo adopts a functional structure with department heads (VP of Engineering, VP of Marketing, etc.)",
          "Result: clearer responsibilities, faster department-level decisions, but now departments struggle to collaborate across silos"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "lm4-aq1",
          question: "A consumer goods company sells three distinct product lines — snacks, beverages, and pet food. Which organizational structure would best serve their needs?",
          options: ["Flat structure with all employees reporting to one CEO", "Functional structure grouped by marketing, finance, and HR", "Divisional structure with separate teams for each product line", "No formal structure — let teams self-organize"],
          correctAnswer: 2,
          explanation: "A divisional structure allows each product line to have dedicated teams with specialized knowledge of their market, customers, and competitors."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Flat structures work well for small, agile companies but struggle at scale",
          "Hierarchical structures provide order for large organizations but slow communication",
          "Functional grouping builds expertise but can create departmental silos",
          "Divisional grouping improves focus but may duplicate resources across divisions"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "lm4-mq1",
            question: "What is a 'silo' in the context of organizational structure?",
            options: ["A type of flat organization", "When departments operate in isolation with poor cross-team communication", "A storage facility for company records", "A leadership position in hierarchical companies"],
            correctAnswer: 1,
            explanation: "Silos occur when departments become isolated, not sharing information or collaborating effectively with other teams."
          },
          {
            id: "lm4-mq2",
            question: "Why might a growing startup switch from a flat to a hierarchical structure?",
            options: ["To make decisions slower", "To reduce the number of employees", "Because the founders can no longer manage everyone directly", "To eliminate all departments"],
            correctAnswer: 2,
            explanation: "As companies grow, the flat model breaks down because founders can't effectively manage hundreds of direct reports."
          },
          {
            id: "lm4-mq3",
            question: "A company where all engineers sit together, all marketers sit together, and all salespeople sit together uses which structure?",
            options: ["Divisional", "Flat", "Functional", "Matrix"],
            correctAnswer: 2,
            explanation: "Grouping employees by their professional function or expertise is the defining characteristic of a functional structure."
          },
          {
            id: "lm4-mq4",
            question: "What is a major disadvantage of divisional structures?",
            options: ["Decisions are too slow", "Resources may be duplicated across divisions", "Employees lack specialization", "There are too few managers"],
            correctAnswer: 1,
            explanation: "Each division may have its own marketing, finance, and HR teams, leading to resource duplication across the organization."
          },
          {
            id: "lm4-mq5",
            question: "Which organizational structure would best support a company that values speed, creativity, and minimal bureaucracy?",
            options: ["Tall hierarchical structure", "Flat structure", "Heavily matrixed structure", "Divisional with many layers"],
            correctAnswer: 1,
            explanation: "Flat structures minimize bureaucracy and enable fast, creative decision-making — ideal for innovative, agile companies."
          }
        ]
      }
    ]
  },

  // LM-5: Human Resources Basics
  {
    lessonId: "lm-5",
    sections: [
      {
        type: "concept",
        title: "The People Side of Business — HR Fundamentals",
        paragraphs: [
          "Human resources (HR) is the department responsible for managing everything related to a company's people — from hiring and training to performance reviews and retention. While it might sound like a behind-the-scenes function, HR decisions directly impact a company's success.",
          "The hiring process typically follows a pipeline: job analysis → job posting → screening → interviews → offer. Great companies invest heavily in this process because a bad hire can cost 30-50% of that person's annual salary in lost productivity, training, and rehiring costs.",
          "Once hired, employees need training and development to grow. Performance reviews help managers provide feedback, set goals, and identify areas for improvement. Retention — keeping good employees — is crucial because replacing someone is far more expensive than keeping them engaged and growing."
        ],
        bullets: [
          "Hiring pipeline: job analysis → posting → screening → interview → offer",
          "Training includes onboarding, skill development, and continuous learning",
          "Performance reviews provide structured feedback and goal-setting",
          "Retention strategies: competitive pay, growth opportunities, positive culture",
          "A bad hire can cost 30-50% of the employee's annual salary"
        ],
        realWorldExample: "Costco pays significantly higher wages than competitors and invests heavily in employee training. Their annual turnover is only 6% compared to the retail industry average of 60-80%. The result? Higher productivity, better customer service, and ultimately higher profits — proving that investing in people pays off."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "lm5-mc1",
            question: "Why is employee retention important for a business?",
            options: ["It allows companies to pay lower salaries", "Replacing employees is far more expensive than keeping them", "Retention eliminates the need for management", "It reduces the need for training programs"],
            correctAnswer: 1,
            explanation: "Replacing an employee involves recruiting, hiring, and training costs, plus lost productivity — making retention much more cost-effective."
          },
          {
            id: "lm5-mc2",
            question: "What is the first step in the hiring process?",
            options: ["Posting the job online", "Conducting interviews", "Analyzing the job to understand what's needed", "Making a salary offer"],
            correctAnswer: 2,
            explanation: "Job analysis — understanding the role's requirements, skills, and responsibilities — comes first before you can write a posting or interview candidates."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Hiring Dilemma at QuickServe",
        narrative: "QuickServe, a fast-growing delivery company, needs to hire 50 drivers quickly. The HR director faces a choice: rush the hiring process to fill seats, or take time to screen, interview, and train properly — even though it means slower growth initially.",
        details: [
          "Option A (Rush hiring): Fill all 50 positions in two weeks with minimal screening — 40% quit within 3 months, customer complaints spike",
          "Option B (Careful hiring): Take six weeks to hire and train — only 35 positions filled initially, but 90% retention and higher customer ratings",
          "Cost analysis: Option A's turnover costs $340,000 in rehiring; Option B saves $280,000 over the first year",
          "Lesson: The upfront investment in quality hiring pays dividends in retention, performance, and reduced long-term costs"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "lm5-aq1",
          question: "An employee receives consistent positive feedback from customers but has never been promoted or recognized by management. What HR function is failing?",
          options: ["Hiring and recruitment", "Performance review and recognition", "Job analysis and posting", "Benefits administration"],
          correctAnswer: 1,
          explanation: "Performance reviews and recognition systems exist to acknowledge good work and provide growth paths — when they fail, strong employees may leave."
        }
      },
      {
        type: "recap",
        takeaways: [
          "HR manages the full employee lifecycle: hiring, training, reviews, and retention",
          "Quality hiring is worth the extra time — bad hires are extremely costly",
          "Regular performance reviews and recognition keep employees engaged",
          "Investing in employee development and retention saves money long-term"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "lm5-mq1",
            question: "What is the estimated cost of a bad hire relative to the employee's salary?",
            options: ["5-10%", "15-20%", "30-50%", "100-200%"],
            correctAnswer: 2,
            explanation: "Studies show a bad hire can cost 30-50% of the person's annual salary in recruiting, training, and lost productivity."
          },
          {
            id: "lm5-mq2",
            question: "Which is NOT typically a step in the hiring pipeline?",
            options: ["Job analysis", "Screening candidates", "Setting quarterly revenue targets", "Conducting interviews"],
            correctAnswer: 2,
            explanation: "Setting revenue targets is a business strategy function, not part of the HR hiring pipeline."
          },
          {
            id: "lm5-mq3",
            question: "Why does Costco consistently outperform competitors in employee retention?",
            options: ["They hire fewer employees overall", "They invest in higher wages and employee training", "They don't offer benefits", "They use a flat organizational structure"],
            correctAnswer: 1,
            explanation: "Costco's strategy of higher-than-average wages and strong training programs leads to dramatically lower turnover and better business outcomes."
          },
          {
            id: "lm5-mq4",
            question: "What is the primary purpose of a performance review?",
            options: ["To find reasons to fire employees", "To provide feedback, set goals, and identify growth opportunities", "To justify salary cuts", "To compare employees against each other"],
            correctAnswer: 1,
            explanation: "Performance reviews are development tools — they help employees understand their strengths, areas for improvement, and career growth path."
          },
          {
            id: "lm5-mq5",
            question: "A company has high employee turnover despite competitive salaries. What should they investigate?",
            options: ["Whether their salaries are high enough", "Company culture, management quality, and growth opportunities", "Whether they're hiring too many people", "If their product is selling well enough"],
            correctAnswer: 1,
            explanation: "When pay is competitive, turnover often stems from cultural issues, poor management, or lack of career development — factors beyond compensation."
          }
        ]
      }
    ]
  },

  // LM-6: Conflict Resolution and Communication
  {
    lessonId: "lm-6",
    sections: [
      {
        type: "concept",
        title: "Resolving Conflict and Communicating Effectively in Teams",
        paragraphs: [
          "Conflict in the workplace is inevitable — and it isn't always bad. Healthy conflict (disagreements about ideas, strategies, or approaches) can lead to better decisions. Unhealthy conflict (personal attacks, gossip, power struggles) destroys team cohesion. The key is knowing how to manage conflict constructively.",
          "There are five common conflict resolution styles: competing (I win, you lose), accommodating (I give in), avoiding (ignore it), compromising (we each give something up), and collaborating (we find a solution that works for everyone). The best leaders lean toward collaboration when time allows.",
          "Effective communication is the foundation of healthy teams. This includes active listening (fully concentrating on what someone says, not just waiting to respond), clear and direct messaging, and regular feedback loops. Studies show that teams with strong communication outperform those with poor communication by up to 25%."
        ],
        bullets: [
          "Healthy conflict improves decisions; unhealthy conflict destroys teams",
          "Five styles: competing, accommodating, avoiding, compromising, collaborating",
          "Collaboration produces the best outcomes but takes more time",
          "Active listening means fully engaging with the speaker's message",
          "Teams with strong communication outperform peers by up to 25%"
        ],
        realWorldExample: "At Pixar, director Ed Catmull created 'Braintrust' meetings where teams give each other brutally honest feedback on films in progress. The key rule: feedback must be about the work, never personal. This culture of constructive conflict produced Toy Story, Finding Nemo, and Inside Out — films that might have failed without honest, difficult conversations."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "lm6-mc1",
            question: "What is the difference between healthy and unhealthy workplace conflict?",
            options: ["Healthy conflict involves ideas; unhealthy conflict involves personal attacks", "All conflict is unhealthy and should be avoided", "Healthy conflict means no one disagrees", "Unhealthy conflict always leads to innovation"],
            correctAnswer: 0,
            explanation: "Healthy conflict focuses on ideas, strategies, and approaches. Unhealthy conflict involves personal attacks, gossip, and power struggles."
          },
          {
            id: "lm6-mc2",
            question: "Which conflict resolution style aims for a solution that satisfies everyone?",
            options: ["Competing", "Avoiding", "Compromising", "Collaborating"],
            correctAnswer: 3,
            explanation: "Collaborating seeks a win-win solution where everyone's needs are addressed, though it requires more time and effort."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Project Deadline Dispute",
        narrative: "Two team leads at a software company disagree over a product launch timeline. Alex wants to delay the launch by two weeks to fix bugs. Jordan insists on launching on time to meet revenue targets. Their argument escalates until the VP steps in to mediate.",
        details: [
          "Competing approach: Jordan pushes to launch on time regardless — bugs cause customer complaints post-launch",
          "Avoiding approach: The VP postpones the decision — uncertainty frustrates both teams",
          "Compromising approach: They launch on time but with a 'known issues' list and a patch scheduled for one week later",
          "Collaborating approach: They identify the three most critical bugs, fix those before launch, and schedule the rest for a patch — both quality and timeline are addressed"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "lm6-aq1",
          question: "A manager notices two employees aren't speaking to each other after a disagreement. What is the best first step?",
          options: ["Ignore it and hope they work it out", "Fire one of them to eliminate the problem", "Meet with each person separately to understand their perspective", "Send a group email about workplace behavior"],
          correctAnswer: 2,
          explanation: "Understanding each person's perspective through private conversations allows the manager to assess the situation before facilitating a resolution."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Workplace conflict is natural — the goal is to manage it constructively",
          "Collaboration produces the best outcomes but requires time and skill",
          "Active listening and clear communication prevent most conflicts from escalating",
          "The best teams embrace honest disagreement about ideas while maintaining respect"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "lm6-mq1",
            question: "What does 'active listening' involve?",
            options: ["Preparing your response while the other person speaks", "Fully concentrating on and engaging with the speaker's message", "Listening to music while working", "Only listening to people you agree with"],
            correctAnswer: 1,
            explanation: "Active listening means giving full attention to the speaker, understanding their message, and responding thoughtfully — not just waiting for your turn to talk."
          },
          {
            id: "lm6-mq2",
            question: "In the compromising conflict resolution style, what happens?",
            options: ["One person wins completely", "Both parties give up something to reach an agreement", "The conflict is ignored", "A new team is formed"],
            correctAnswer: 1,
            explanation: "Compromising involves both sides making concessions to reach a middle ground — neither gets everything they want, but both get something."
          },
          {
            id: "lm6-mq3",
            question: "Why is Pixar's 'Braintrust' model effective?",
            options: ["It avoids all criticism", "It focuses honest feedback on the work, not the person", "It only allows positive comments", "Senior leaders make all final decisions"],
            correctAnswer: 1,
            explanation: "The Braintrust works because feedback targets the creative work, not the individuals — creating psychological safety for honest, productive disagreement."
          },
          {
            id: "lm6-mq4",
            question: "When is avoiding conflict an acceptable short-term strategy?",
            options: ["When the issue is trivial and will resolve itself", "When a serious problem needs immediate attention", "When team morale is already very low", "Avoiding is never acceptable"],
            correctAnswer: 0,
            explanation: "For minor issues that aren't worth escalating, temporary avoidance can be appropriate — but important conflicts must be addressed directly."
          },
          {
            id: "lm6-mq5",
            question: "Which communication practice most helps prevent workplace conflicts from escalating?",
            options: ["Sending longer emails", "Regular, honest feedback and open dialogue", "Only communicating through management", "Avoiding difficult conversations entirely"],
            correctAnswer: 1,
            explanation: "Regular feedback and open communication catch small issues before they become big conflicts and build trust within teams."
          }
        ]
      }
    ]
  },

  // LM-7: Case Study — Satya Nadella at Microsoft
  {
    lessonId: "lm-7",
    sections: [
      {
        type: "concept",
        title: "Leadership in Action — Satya Nadella's Microsoft Transformation",
        paragraphs: [
          "When Satya Nadella became CEO of Microsoft in 2014, the company was struggling. Its stock had been flat for over a decade, employees were demoralized by internal competition, and the company was losing the cloud computing race to Amazon. What Nadella did next became one of the most studied leadership transformations in business history.",
          "Nadella's first major move was cultural, not strategic. He replaced Microsoft's 'stack ranking' system — where employees were ranked against each other and the lowest were fired — with a 'growth mindset' culture inspired by Carol Dweck's research. Instead of proving how smart you are, employees were encouraged to learn, experiment, and fail forward.",
          "He then shifted Microsoft's strategy from 'Windows first' to 'cloud first, mobile first,' embracing open-source software and partnerships with former rivals like Linux and Salesforce. Under his leadership, Microsoft's market cap grew from $300 billion to over $3 trillion, making it one of the most valuable companies in the world."
        ],
        bullets: [
          "Nadella became CEO in 2014 when Microsoft was stagnating",
          "Replaced toxic 'stack ranking' with a 'growth mindset' culture",
          "Shifted strategy from Windows-centric to cloud-first (Azure)",
          "Embraced open source and partnered with former competitors",
          "Microsoft grew from $300B to $3T+ market cap under his leadership"
        ],
        realWorldExample: "One of Nadella's most symbolic moves was bringing Microsoft Office to iPhone and iPad — something previous leadership would never have allowed because it helped a competitor's platform. But Nadella understood that serving customers wherever they are was more important than protecting Windows. Office mobile downloads skyrocketed, proving his point."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "lm7-mc1",
            question: "What was Satya Nadella's first major change at Microsoft?",
            options: ["He launched a new product", "He changed the company culture from competition to growth mindset", "He fired half the company", "He acquired Apple"],
            correctAnswer: 1,
            explanation: "Nadella prioritized culture change first — replacing the toxic stack-ranking system with a growth mindset philosophy — before making strategic shifts."
          },
          {
            id: "lm7-mc2",
            question: "What strategic shift did Nadella make for Microsoft's business?",
            options: ["Focused entirely on Windows sales", "Moved to a cloud-first strategy with Azure", "Stopped making software entirely", "Merged with Google"],
            correctAnswer: 1,
            explanation: "Nadella shifted Microsoft's focus from Windows to cloud computing (Azure), which became the company's primary growth engine."
          }
        ]
      },
      {
        type: "scenario",
        title: "Before and After — The Nadella Effect",
        narrative: "Compare Microsoft under Steve Ballmer (2000-2014) with Microsoft under Satya Nadella (2014-present). The contrast illustrates how leadership style directly impacts company culture, strategy, and ultimately financial performance.",
        details: [
          "Ballmer era: 'Stack ranking' created internal competition — teams sabotaged each other to look better in reviews",
          "Ballmer era: Windows was protected at all costs — mobile and cloud opportunities were missed or bungled (Windows Phone, late to cloud)",
          "Nadella era: 'Growth mindset' culture encouraged collaboration, learning from failure, and customer obsession",
          "Nadella era: Azure became the #2 cloud platform globally; Microsoft Teams reached 300M users; stock price increased 10x"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "lm7-aq1",
          question: "Nadella's decision to bring Office to iPhone — a competitor's device — demonstrated which leadership principle?",
          options: ["Always protect your core product at any cost", "Serve customers where they are, even on competitors' platforms", "Competitors should be avoided entirely", "Mobile platforms don't matter for software companies"],
          correctAnswer: 1,
          explanation: "Nadella prioritized customer value over platform protectionism — understanding that reaching users where they already are drives growth and loyalty."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Nadella's transformation of Microsoft proves that culture change must come before strategy change",
          "The 'growth mindset' philosophy replaced internal competition with collaboration and learning",
          "Strategic flexibility — embracing cloud and open source — positioned Microsoft for massive growth",
          "Leadership decisions around culture and strategy directly impact a company's market value and employee engagement"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "lm7-mq1",
            question: "What was 'stack ranking' and why did Nadella eliminate it?",
            options: ["A software development tool — it was outdated", "A system ranking employees against each other — it created toxic competition", "A cloud computing platform — it was too expensive", "A customer feedback system — it was inaccurate"],
            correctAnswer: 1,
            explanation: "Stack ranking forced employees to compete against each other, creating a toxic culture where teams sabotaged one another instead of collaborating."
          },
          {
            id: "lm7-mq2",
            question: "Which leadership style best describes Nadella's approach?",
            options: ["Autocratic — making all decisions alone", "Laissez-faire — hands-off management", "Transformational — inspiring change through vision and culture", "Bureaucratic — following strict procedures"],
            correctAnswer: 2,
            explanation: "Nadella exemplifies transformational leadership — he inspired the entire organization to change its culture, mindset, and strategic direction."
          },
          {
            id: "lm7-mq3",
            question: "What was the key lesson from Nadella's leadership at Microsoft?",
            options: ["Technology companies should never change their core product", "Culture change must precede and support strategic change", "The CEO should make all decisions without input", "Companies should avoid partnerships with competitors"],
            correctAnswer: 1,
            explanation: "Nadella showed that strategic pivots only succeed when the underlying culture supports them — he changed how people worked before changing what they worked on."
          },
          {
            id: "lm7-mq4",
            question: "Under Nadella, Microsoft's market cap grew from $300 billion to approximately:",
            options: ["$500 billion", "$1 trillion", "$2 trillion", "$3 trillion+"],
            correctAnswer: 3,
            explanation: "Microsoft's market cap grew from roughly $300 billion when Nadella took over to over $3 trillion — a 10x increase driven by cloud growth and cultural transformation."
          },
          {
            id: "lm7-mq5",
            question: "Why was embracing open-source software significant for Microsoft under Nadella?",
            options: ["It saved money on development", "It reversed Microsoft's historically hostile stance toward open source and signaled a new collaborative approach", "Open source was required by law", "It eliminated all competition"],
            correctAnswer: 1,
            explanation: "Microsoft had historically fought open-source software. Nadella's embrace of it signaled a fundamental cultural shift toward openness and collaboration."
          }
        ]
      }
    ]
  }
]
