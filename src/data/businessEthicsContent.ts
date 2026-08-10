import { StructuredLessonContent } from "@/types"

export const businessEthicsContent: StructuredLessonContent[] = [
  // ETHICS-1: What is Business Ethics
  {
    lessonId: "ethics-1",
    sections: [
      {
        type: "concept",
        title: "Beyond Just Following the Law",
        paragraphs: [
          "Business ethics is the study of what is right and wrong in the context of business decisions. It goes far beyond simply following the law - many things that are technically legal can still be harmful, unfair, or dishonest.",
          "Ethics matters because businesses affect people: employees, customers, communities, and the environment. When companies cut corners ethically, the consequences can be devastating - lost jobs, environmental damage, broken trust, and even economic crises.",
          "Ethical businesses tend to perform better over the long term. Customers trust them more, employees are more loyal, and investors see them as lower risk. Ethics isn't just 'the right thing to do' - it's also good business strategy."
        ],
        bullets: [
          "Ethics = what you SHOULD do; Law = what you MUST do",
          "Legal ≠ ethical - a company can follow every law and still behave unethically",
          "Ethical behavior builds trust, loyalty, and long-term profitability",
          "Unethical behavior creates reputational, legal, and financial risk",
          "Business ethics applies to every level - from the CEO to entry-level employees"
        ],
        realWorldExample: "Wells Fargo employees opened millions of fake bank accounts to meet aggressive sales targets. While the practice eventually broke laws, it started as an ethical failure - leadership created incentives that rewarded dishonesty. The scandal cost Wells Fargo over $3 billion in fines and destroyed customer trust."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ethics-1-mc1",
            question: "Which statement best explains the difference between ethics and the law?",
            options: ["They are exactly the same thing", "Ethics covers what you should do; law covers what you must do", "Laws are always more strict than ethics", "Ethics only applies to large corporations"],
            correctAnswer: 1,
            explanation: "Ethics is about what's right and responsible, while law is about minimum legal requirements. Something can be legal but unethical."
          },
          {
            id: "ethics-1-mc2",
            question: "Why do ethical businesses tend to perform better long-term?",
            options: ["They spend less on advertising", "They avoid all government regulation", "They build trust with customers, employees", "They charge higher prices"],
            correctAnswer: 2,
            explanation: "Trust is a competitive advantage. Ethical companies attract loyal customers, motivated employees, and confident investors."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Shortcut Dilemma",
        narrative: "You're a manager at a food company. Your team discovers that a cheaper ingredient passes all safety regulations but has a slightly different taste. Using it would save $2 million per year, but some customers might notice the change. Your boss says 'if it's legal, do it.' But you know customers trust your brand for quality.",
        details: [
          "The cheaper ingredient is 100% legal and passes all FDA requirements",
          "Internal taste tests show 15% of customers notice the difference",
          "Your brand's slogan is 'Quality you can taste'",
          "Competitors already use the cheaper ingredient"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ethics-1-aq1",
          question: "In the scenario above, what is the MOST ethically responsible approach?",
          options: ["Switch immediately - it's legal and saves money", "Switch without telling anyone since most won't notice", "Be transparent with customers about the change and let them decide", "Ignore the option entirely - never change anything"],
          correctAnswer: 2,
          explanation: "Transparency respects customer trust. Being honest about changes - even small ones - upholds the brand's ethical promise and builds long-term loyalty."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Business ethics goes beyond legal compliance - it's about doing what's right",
          "Ethical behavior builds trust, loyalty, and sustainable profitability",
          "Unethical practices create enormous financial and reputational risk",
          "Every business decision has an ethical dimension worth considering"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "ethics-1-mq1",
            question: "A company follows every law but pays workers the absolute minimum, provides no benefits, and uses misleading advertising. Is this ethical?",
            options: ["Yes - if it's legal, it's ethical", "No - ethical behavior requires more than minimum legal compliance", "It depends on the industry", "Only if competitors do the same thing"],
            correctAnswer: 1,
            explanation: "Legal compliance is the floor, not the ceiling. Ethical behavior means considering the impact on people, not just meeting minimum requirements."
          },
          {
            id: "ethics-1-mq2",
            question: "Which of the following is a long-term benefit of ethical business practices?",
            options: ["Higher short-term profits", "Stronger customer trust and brand loyalty", "Avoiding all government oversight", "Eliminating competition"],
            correctAnswer: 1,
            explanation: "Ethical practices build trust, which translates to customer loyalty, employee retention, and investor confidence over time."
          },
          {
            id: "ethics-1-mq3",
            question: "Why did the Wells Fargo fake accounts scandal happen?",
            options: ["Employees wanted to commit fraud", "Leadership created incentives that rewarded dishonest behavior", "Customers asked for extra accounts", "Government regulations required it"],
            correctAnswer: 1,
            explanation: "Wells Fargo's leadership set aggressive sales targets that incentivized employees to create fake accounts. The ethical failure started at the top."
          },
          {
            id: "ethics-1-mq4",
            question: "What does it mean that 'legal ≠ ethical'?",
            options: ["Laws are never ethical", "Something can be legal but still wrong or harmful", "Ethics don't matter if you follow the law", "Ethical companies never break laws"],
            correctAnswer: 1,
            explanation: "Many actions are technically legal but can still harm people, mislead customers, or damage communities. Ethics asks us to go beyond the legal minimum."
          }
        ]
      }
    ]
  },

  // ETHICS-2: Corporate Social Responsibility
  {
    lessonId: "ethics-2",
    sections: [
      {
        type: "concept",
        title: "Corporate Social Responsibility (CSR)",
        paragraphs: [
          "Corporate Social Responsibility (CSR) is the idea that businesses have obligations beyond making profit - they should also contribute positively to society and the environment. CSR programs range from charitable donations to sustainable supply chains to community investment.",
          "CSR is not just charity. It's a strategic approach where companies integrate social and environmental concerns into their business operations. Companies with strong CSR programs often see benefits like improved brand reputation, higher employee engagement, and customer loyalty.",
          "However, CSR involves real trade-offs. Sustainable materials cost more. Fair wages reduce margins. Environmental programs require investment. The question businesses face is: how much responsibility do they owe beyond profit?"
        ],
        bullets: [
          "CSR = businesses voluntarily going beyond legal requirements to benefit society",
          "Common CSR areas: environment, labor practices, community investment, ethical sourcing",
          "Benefits: brand reputation, employee retention, customer loyalty, reduced risk",
          "Trade-offs: higher costs, lower short-term margins, complexity in supply chain",
          "Critics argue some CSR is 'greenwashing' - marketing disguised as social good"
        ],
        realWorldExample: "Patagonia donates 1% of all sales to environmental causes, uses recycled materials, and even ran an ad saying 'Don't Buy This Jacket' to discourage overconsumption. Their commitment to CSR has built an intensely loyal customer base and made them one of the most respected brands in the world - proving CSR can be good for both society and business."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ethics-2-mc1",
            question: "What is Corporate Social Responsibility (CSR)?",
            options: ["A government regulation requiring charity", "A voluntary commitment by businesses to benefit society beyond profit", "A tax deduction strategy", "A marketing campaign type"],
            correctAnswer: 1,
            explanation: "CSR is a voluntary approach where businesses take responsibility for their impact on society and the environment, going beyond what the law requires."
          },
          {
            id: "ethics-2-mc2",
            question: "What is 'greenwashing'?",
            options: ["Using green energy in manufacturing", "Making products more sustainable", "Marketing that exaggerates environmental efforts to look ethical", "A cleaning product certification"],
            correctAnswer: 2,
            explanation: "Greenwashing is when companies make misleading claims about their environmental practices to appear more responsible than they actually are."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Fast Fashion Dilemma",
        narrative: "A clothing company sells trendy clothes at low prices. An investigation reveals that their overseas suppliers pay workers below living wages and dump chemical waste into local rivers. The CEO argues that the company follows all local laws in those countries and that raising wages would increase prices, hurting sales.",
        details: [
          "Workers earn $3/day - legal in that country but below a living wage",
          "Chemical waste disposal meets local (but not international) environmental standards",
          "Raising wages by 50% would increase retail prices by only 3%",
          "Competitors face similar supply chain issues"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ethics-2-aq1",
          question: "Which response best reflects genuine CSR rather than greenwashing?",
          options: ["Launch an ad campaign about 'caring for workers' without changing practices", "Raise supplier wages and publish a transparent supply chain report", "Donate to charity while continuing harmful practices", "Blame the problem on local government regulations"],
          correctAnswer: 1,
          explanation: "Genuine CSR requires actual changes to business practices, not just marketing. Raising wages and being transparent addresses the root problem."
        }
      },
      {
        type: "recap",
        takeaways: [
          "CSR means businesses voluntarily contributing to social and environmental well-being",
          "Effective CSR creates business value through trust, loyalty, and reduced risk",
          "CSR involves real trade-offs between costs and social impact",
          "Greenwashing undermines genuine CSR and erodes consumer trust"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "ethics-2-mq1",
            question: "Which of these is an example of genuine CSR?",
            options: ["Donating leftover products to avoid disposal costs", "Redesigning the supply chain to reduce carbon emissions by 40%", "Adding a green leaf to the company logo", "Sponsoring a charity event for press coverage only"],
            correctAnswer: 1,
            explanation: "Genuine CSR involves substantive changes to business operations that create real social or environmental benefit."
          },
          {
            id: "ethics-2-mq2",
            question: "What is a real trade-off of implementing strong CSR?",
            options: ["It always reduces profits permanently", "It may increase costs in the short term but build long-term brand value", "It eliminates all business risk", "It requires government approval"],
            correctAnswer: 1,
            explanation: "CSR often costs more upfront but generates long-term value through reputation, loyalty, and risk reduction."
          },
          {
            id: "ethics-2-mq3",
            question: "How did Patagonia demonstrate authentic CSR?",
            options: ["By running ads with environmental imagery", "By donating 1% of sales and actively discouraging overconsumption", "By raising prices to seem premium", "By outsourcing to cheaper suppliers"],
            correctAnswer: 1,
            explanation: "Patagonia backed up its environmental claims with real action - donating revenue and even discouraging unnecessary purchases."
          },
          {
            id: "ethics-2-mq4",
            question: "Why is greenwashing harmful?",
            options: ["It costs too much money", "It deceives consumers and undermines trust in real CSR efforts", "It's illegal in all countries", "It only affects small businesses"],
            correctAnswer: 1,
            explanation: "Greenwashing erodes consumer trust and makes it harder for genuinely responsible companies to differentiate themselves."
          }
        ]
      }
    ]
  },

  // ETHICS-3: Stakeholder Theory
  {
    lessonId: "ethics-3",
    sections: [
      {
        type: "concept",
        title: "Who Are Businesses Responsible To?",
        paragraphs: [
          "Stakeholder theory argues that businesses have responsibilities to ALL groups affected by their decisions - not just shareholders (owners). Stakeholders include employees, customers, suppliers, communities, the environment, and even future generations.",
          "This contrasts with shareholder theory, popularized by Milton Friedman, which says a company's only responsibility is to maximize profit for its owners. The debate between these two views shapes how companies make decisions about wages, environmental impact, and community investment.",
          "Modern business increasingly favors stakeholder thinking. In 2019, 181 CEOs of major corporations signed the Business Roundtable statement, committing to serve all stakeholders - not just shareholders. But critics argue this can be vague and hard to measure."
        ],
        bullets: [
          "Stakeholders = anyone affected by a business: employees, customers, suppliers, communities, environment",
          "Shareholders = owners who hold equity (stock) in a company",
          "Shareholder theory: maximize profit for owners above all else",
          "Stakeholder theory: balance the needs of all affected groups",
          "Most modern frameworks try to balance both perspectives"
        ],
        realWorldExample: "When Johnson & Johnson discovered contaminated Tylenol bottles in 1982, they immediately recalled 31 million bottles at a cost of $100 million - prioritizing customer safety (stakeholders) over short-term profit (shareholders). This decision is considered one of the greatest examples of stakeholder-first thinking and actually strengthened the brand long-term."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ethics-3-mc1",
            question: "What is the key difference between stakeholder theory and shareholder theory?",
            options: ["Stakeholder theory focuses on profit; shareholder theory focuses on people", "Stakeholder theory considers all affected groups; shareholder theory prioritizes owners", "They are the same thing with different names", "Shareholder theory is newer than stakeholder theory"],
            correctAnswer: 1,
            explanation: "Stakeholder theory says businesses are responsible to everyone they affect, while shareholder theory says the primary duty is to owners/investors."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Factory Closure",
        narrative: "A manufacturing company can save $5 million per year by closing a factory in a small town and moving production overseas. The factory employs 300 people - nearly 20% of the town's workforce. Shareholders want the cost savings. The CEO must decide.",
        details: [
          "300 jobs would be lost in a town of 1,600 workers",
          "The move would increase shareholder returns by 8%",
          "The town has no other major employers",
          "The company has been in this town for 40 years"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ethics-3-aq1",
          question: "From a stakeholder perspective, what should the CEO consider MOST?",
          options: ["Only the 8% increase in shareholder returns", "The impact on all groups: workers, the community, shareholders", "Only what is cheapest for the company", "Only what employees want"],
          correctAnswer: 1,
          explanation: "Stakeholder theory requires considering the impact on all affected groups - employees, community, shareholders, and the company's long-term reputation."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Stakeholder theory says businesses owe duties to all affected parties, not just owners",
          "Shareholder theory prioritizes profit maximization for investors",
          "Modern business increasingly embraces stakeholder thinking",
          "Balancing stakeholder needs is complex but builds long-term resilience"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "ethics-3-mq1",
            question: "Which group is a stakeholder but NOT a shareholder?",
            options: ["A person who owns stock in the company", "A factory worker employed by the company", "An investor who bought shares last week", "The company's board of directors (if they own equity)"],
            correctAnswer: 1,
            explanation: "Employees are stakeholders affected by business decisions but don't necessarily own shares. All shareholders are stakeholders, but not all stakeholders are shareholders."
          },
          {
            id: "ethics-3-mq2",
            question: "What did the Business Roundtable statement of 2019 commit to?",
            options: ["Maximizing shareholder profit above all", "Serving all stakeholders, not just shareholders", "Eliminating corporate taxes", "Reducing employee wages"],
            correctAnswer: 1,
            explanation: "181 major CEOs signed a statement expanding the purpose of a corporation to serve all stakeholders - customers, employees, suppliers, communities, and shareholders."
          },
          {
            id: "ethics-3-mq3",
            question: "Why is the Tylenol recall considered a stakeholder-first decision?",
            options: ["It maximized short-term profit", "J&J prioritized customer safety over immediate financial cost", "The government forced the recall", "It was a marketing stunt"],
            correctAnswer: 1,
            explanation: "J&J voluntarily spent $100 million to protect customers, prioritizing stakeholder safety over shareholder returns - and it strengthened the brand long-term."
          },
          {
            id: "ethics-3-mq4",
            question: "A critic of stakeholder theory might argue that…",
            options: ["Companies should never make profit", "Trying to serve everyone makes it hard to measure accountability", "Shareholders don't matter at all", "Only employees are stakeholders"],
            correctAnswer: 1,
            explanation: "Critics argue that stakeholder theory can be vague - if you're accountable to everyone, it's hard to measure whether you're actually fulfilling your duties."
          }
        ]
      }
    ]
  },

  // ETHICS-4: Ethical Dilemmas in Business
  {
    lessonId: "ethics-4",
    sections: [
      {
        type: "concept",
        title: "How to Reason Through Hard Decisions",
        paragraphs: [
          "An ethical dilemma is a situation where there's no clearly 'right' answer - every option involves a trade-off between competing values. In business, these dilemmas arise constantly: profit vs. safety, efficiency vs. fairness, growth vs. sustainability.",
          "Ethical frameworks help structure thinking: Utilitarianism asks 'what produces the greatest good for the greatest number?' Rights-based ethics asks 'does this respect everyone's fundamental rights?' Virtue ethics asks 'what would a person of good character do?' Each framework can lead to different conclusions.",
          "The key is not to memorize frameworks but to develop ethical reasoning - the ability to identify stakeholders, consider consequences, weigh competing values, and make a defensible decision."
        ],
        bullets: [
          "Ethical dilemma = a situation with no clearly right answer; all options involve trade-offs",
          "Utilitarianism: maximize overall good for the most people",
          "Rights-based ethics: protect individual rights regardless of outcomes",
          "Virtue ethics: act as a person of integrity and good character would",
          "Good ethical reasoning considers all stakeholders and long-term consequences"
        ],
        realWorldExample: "During COVID-19, companies faced impossible dilemmas: Should factories stay open (protecting jobs but risking worker health)? Should they raise prices on essential goods (legal, but ethical)? Should they lay off workers or cut executive pay first? There was no 'right' answer - but the companies that communicated transparently and shared sacrifices across all levels earned the most public trust."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ethics-4-mc1",
            question: "What makes a situation an ethical dilemma?",
            options: ["There's a clear right and wrong answer", "Every option involves trade-offs between competing values", "It only involves money", "It's always illegal"],
            correctAnswer: 1,
            explanation: "Ethical dilemmas are situations where there's no clearly right answer - each option requires sacrificing one value to uphold another."
          },
          {
            id: "ethics-4-mc2",
            question: "What does utilitarianism focus on?",
            options: ["Protecting individual rights above all", "Producing the greatest good for the greatest number of people", "Following rules exactly as written", "Maximizing profit"],
            correctAnswer: 1,
            explanation: "Utilitarianism evaluates actions based on their overall consequences - the best action is the one that produces the most good for the most people."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Whistleblower's Choice",
        narrative: "You work in the accounting department of a mid-size company. You discover that your manager has been inflating revenue numbers in quarterly reports to meet targets and earn bonuses. If you report it, your manager will likely be fired - and they've been a good mentor to you. If you stay quiet, investors are being misled.",
        details: [
          "The inflated numbers aren't large enough to trigger an audit automatically",
          "Your manager has a family and would struggle to find another job",
          "Investors are making decisions based on false information",
          "The company has a whistleblower hotline but you've heard it's not truly anonymous"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ethics-4-aq1",
          question: "Using ethical reasoning, which action is most defensible?",
          options: ["Stay quiet to protect your manager's career", "Report the fraud through proper channels - investors have a right to accurate information", "Inflate your own numbers too since everyone does it", "Quit without saying anything"],
          correctAnswer: 1,
          explanation: "While difficult, reporting fraud protects investors' rights, prevents greater harm, and upholds integrity. Ethical reasoning prioritizes transparency even when personally costly."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Ethical dilemmas have no perfect answer - they require weighing competing values",
          "Three frameworks: utilitarianism (greatest good), rights-based (protect rights), virtue ethics (good character)",
          "Good ethical reasoning considers stakeholders, consequences, and long-term impact",
          "Transparency and shared sacrifice build trust during difficult decisions"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "ethics-4-mq1",
            question: "A rights-based ethical framework would prioritize…",
            options: ["Whatever produces the most profit", "Protecting individual rights even if the outcome isn't optimal for everyone", "Following the majority opinion", "Whatever is easiest to implement"],
            correctAnswer: 1,
            explanation: "Rights-based ethics says certain rights (privacy, safety, truth) must be protected regardless of whether violating them would produce a 'better' outcome overall."
          },
          {
            id: "ethics-4-mq2",
            question: "Why is whistleblowing considered ethically important?",
            options: ["It's always financially rewarded", "It protects stakeholders from ongoing harm caused by hidden wrongdoing", "It's required by law in all cases", "It never has negative consequences for the whistleblower"],
            correctAnswer: 1,
            explanation: "Whistleblowing exposes wrongdoing that harms stakeholders. While it can be personally costly, it serves the broader ethical good."
          },
          {
            id: "ethics-4-mq3",
            question: "During COVID-19, which company response earned the most public trust?",
            options: ["Raising prices on essential goods", "Laying off workers while increasing executive pay", "Communicating transparently and sharing sacrifices across all levels", "Ignoring the crisis entirely"],
            correctAnswer: 2,
            explanation: "Companies that were transparent and distributed sacrifices fairly - like cutting executive pay before laying off workers - earned the most trust."
          },
          {
            id: "ethics-4-mq4",
            question: "What is the best approach to an ethical dilemma?",
            options: ["Always choose the cheapest option", "Identify stakeholders, consider consequences, weigh values", "Avoid making any decision", "Do whatever your boss says"],
            correctAnswer: 1,
            explanation: "Ethical reasoning requires systematic thinking - not avoiding decisions or defaulting to authority, but carefully weighing impacts and values."
          }
        ]
      }
    ]
  },

  // ETHICS-5: Ethics and the Law
  {
    lessonId: "ethics-5",
    sections: [
      {
        type: "concept",
        title: "Where Ethics and Law Overlap - and Diverge",
        paragraphs: [
          "Laws set the minimum standard of behavior that society requires. Ethics sets a higher bar - what we should do even when the law doesn't require it. Sometimes they align perfectly; other times, legal behavior can still be deeply unethical.",
          "Key areas where business ethics and law intersect include: employment law (minimum wage, discrimination, safety), consumer protection (truth in advertising, product safety), environmental regulation (emissions, waste disposal), and corporate governance (financial reporting, insider trading).",
          "The gap between ethics and law creates both risk and opportunity. Companies that merely comply with the law face reputational risks when laws are weak. Companies that exceed legal requirements often build stronger brands and attract better talent."
        ],
        bullets: [
          "Law = minimum standard enforced by government; Ethics = higher standard of responsible behavior",
          "Employment law: minimum wage, anti-discrimination, workplace safety (OSHA)",
          "Consumer protection: FTC regulations, truth in advertising, product recalls",
          "Environmental law: EPA regulations, emissions standards, waste disposal",
          "Corporate governance: SEC regulations, Sarbanes-Oxley Act, financial transparency"
        ],
        realWorldExample: "Before child labor laws existed, employing children in factories was legal. Ethical businesses chose not to exploit child labor even before it became illegal. Today, similar gaps exist globally - many countries have weak labor or environmental laws, and ethical companies choose higher standards voluntarily."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ethics-5-mc1",
            question: "What is the relationship between ethics and law?",
            options: ["They are always identical", "Law sets the minimum; ethics sets a higher standard", "Ethics only applies when there is no law", "Law is more important than ethics"],
            correctAnswer: 1,
            explanation: "Laws represent the minimum standard society enforces. Ethics goes further - asking what the right thing to do is, even when the law doesn't require it."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Data Privacy Question",
        narrative: "A social media company collects user data and sells it to advertisers. In the country where they operate, this is 100% legal - there are no data privacy laws restricting the practice. However, users don't realize how much data is being collected or how it's being used.",
        details: [
          "The company's terms of service mention data collection in page 47 of a 60-page document",
          "Users can technically opt out but the process requires 12 steps",
          "93% of users don't know their data is being sold",
          "A competitor offers a privacy-focused alternative but charges a subscription fee"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ethics-5-aq1",
          question: "Is this company behaving ethically even though it's acting legally?",
          options: ["Yes - it's following the law so it's fine", "No - burying consent in complex terms and making opt-out difficult is ethically wrong", "Ethics don't apply to technology companies", "Only if users read the terms of service"],
          correctAnswer: 1,
          explanation: "Hiding data practices in complex documents and making opt-out deliberately difficult fails the ethical test of transparency and informed consent, even when legal."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Laws set minimum standards; ethics demands more",
          "Key legal areas: employment, consumer protection, environment, corporate governance",
          "Gaps between law and ethics create both risks and opportunities",
          "Companies that exceed legal minimums often build stronger, more trusted brands"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "ethics-5-mq1",
            question: "Which law was created to improve corporate financial transparency after major accounting scandals?",
            options: ["The Fair Labor Standards Act", "The Sarbanes-Oxley Act", "The Clean Air Act", "The Americans with Disabilities Act"],
            correctAnswer: 1,
            explanation: "The Sarbanes-Oxley Act (2002) was enacted after scandals like Enron and WorldCom to strengthen corporate financial reporting and accountability."
          },
          {
            id: "ethics-5-mq2",
            question: "A company is legal but makes it nearly impossible for users to opt out of data collection. This is an example of…",
            options: ["Strong corporate governance", "An ethical gap - legal behavior that fails ethical standards", "Best business practice", "Stakeholder theory in action"],
            correctAnswer: 1,
            explanation: "When companies use technically legal tactics to undermine user choice, they expose the gap between legal compliance and ethical responsibility."
          },
          {
            id: "ethics-5-mq3",
            question: "Why do ethical companies often exceed legal requirements?",
            options: ["Because laws are always wrong", "Because going beyond the minimum builds trust and reduces long-term risk", "Because it's required by shareholders", "Because regulators force them to"],
            correctAnswer: 1,
            explanation: "Exceeding legal minimums signals integrity, builds customer trust, attracts talent, and reduces the risk of future regulatory problems."
          },
          {
            id: "ethics-5-mq4",
            question: "Before child labor laws, ethical businesses…",
            options: ["Had no choice but to use child labor", "Chose not to exploit children even though it was legal", "Only hired children part-time", "Waited for government to act first"],
            correctAnswer: 1,
            explanation: "Ethical companies led the way by refusing to exploit child labor before laws caught up - demonstrating that ethics can precede and drive legal change."
          }
        ]
      }
    ]
  },

  // ETHICS-6: Case Study - Enron and Volkswagen
  {
    lessonId: "ethics-6",
    sections: [
      {
        type: "concept",
        title: "When Ethics Fail: Enron and Volkswagen",
        paragraphs: [
          "Studying ethical failures teaches us more than studying success. Two of the most infamous cases are Enron (2001) and Volkswagen's emissions scandal (2015). Both involved deliberate deception, culture-wide ethical breakdowns, and catastrophic consequences.",
          "Enron was an energy company that used fraudulent accounting to hide billions in debt and inflate profits. Executives enriched themselves while employees and investors lost everything. The company's collapse destroyed $74 billion in shareholder value and led to the Sarbanes-Oxley Act.",
          "Volkswagen installed software in 11 million diesel vehicles that detected emissions tests and temporarily reduced emissions during testing - while polluting up to 40x the legal limit during normal driving. The scandal cost VW over $33 billion in fines, destroyed their 'clean diesel' brand, and led to criminal charges against executives."
        ],
        bullets: [
          "Enron: fraudulent accounting, hidden debt, executive enrichment, $74B in shareholder losses",
          "VW: emissions cheating software in 11 million vehicles, up to 40x legal pollution limits",
          "Both cases: leadership knew, culture tolerated deception, whistleblowers were ignored or silenced",
          "Consequences: criminal charges, massive fines, destroyed brands, new regulations",
          "Lesson: ethical culture must come from the top - incentives shape behavior"
        ],
        realWorldExample: "Sherron Watkins, an Enron VP, wrote a memo to CEO Ken Lay warning that the company's accounting practices could cause it to 'implode in a wave of accounting scandals.' Her warnings were ignored. She later testified before Congress and became one of the most famous whistleblowers in corporate history, helping inspire stronger protections for corporate whistleblowers."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ethics-6-mc1",
            question: "What did Enron do that was unethical and illegal?",
            options: ["Sold energy at fair market prices", "Used fraudulent accounting to hide debt and inflate profits", "Paid employees too much", "Invested in renewable energy"],
            correctAnswer: 1,
            explanation: "Enron used complex financial structures to hide billions in debt, making the company appear profitable while executives secretly enriched themselves."
          },
          {
            id: "ethics-6-mc2",
            question: "How did Volkswagen cheat on emissions tests?",
            options: ["They used cleaner fuel during tests", "They installed software that reduced emissions only during testing", "They bribed testing officials", "They tested different vehicles than they sold"],
            correctAnswer: 1,
            explanation: "VW installed 'defeat device' software that detected when a car was being tested and temporarily reduced emissions - while polluting far more during normal driving."
          }
        ]
      },
      {
        type: "scenario",
        title: "Spotting the Warning Signs",
        narrative: "You're reviewing a case study of a fictional company, GreenTech Solutions. They claim to be carbon-neutral, but internal documents show they buy cheap carbon credits from unverified sources. Their CEO just received a $12 million bonus for 'sustainability leadership.' Employee surveys show that 60% of staff don't believe the company's environmental claims.",
        details: [
          "Carbon credits are purchased from a company with no third-party verification",
          "The 'carbon-neutral' claim is central to their marketing and pricing strategy",
          "Employees report pressure to avoid questioning environmental claims",
          "A junior analyst who raised concerns was moved to a different department"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ethics-6-aq1",
          question: "Which warning sign from the Enron and VW cases is MOST visible in the GreenTech scenario?",
          options: ["Fair executive compensation", "Leadership rewarding deception while silencing internal critics", "Strong employee engagement", "Transparent environmental reporting"],
          correctAnswer: 1,
          explanation: "Like Enron and VW, GreenTech shows a pattern of rewarding misleading claims while silencing employees who question them - a hallmark of ethical culture failure."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Enron and VW show how ethical failures can destroy companies worth billions",
          "Both cases involved leadership-driven cultures that tolerated and rewarded deception",
          "Whistleblowers play a critical role in exposing corporate wrongdoing",
          "Ethical culture must be built from the top - incentives and values must align"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "ethics-6-mq1",
            question: "What law was created partly in response to the Enron scandal?",
            options: ["The Clean Air Act", "The Sarbanes-Oxley Act", "The Dodd-Frank Act", "The Fair Labor Standards Act"],
            correctAnswer: 1,
            explanation: "The Sarbanes-Oxley Act (2002) strengthened financial reporting requirements and corporate accountability, directly in response to Enron's accounting fraud."
          },
          {
            id: "ethics-6-mq2",
            question: "How much did the VW emissions scandal cost the company in fines?",
            options: ["$1 million", "$100 million", "Over $33 billion", "$500,000"],
            correctAnswer: 2,
            explanation: "VW paid over $33 billion in fines, settlements, and costs related to the emissions cheating scandal - one of the largest corporate penalties in history."
          },
          {
            id: "ethics-6-mq3",
            question: "What role did Sherron Watkins play in the Enron scandal?",
            options: ["She helped create the fraudulent accounting", "She was the CEO who approved the fraud", "She was a whistleblower who warned leadership about accounting problems", "She was the external auditor"],
            correctAnswer: 2,
            explanation: "Sherron Watkins was an Enron VP who warned CEO Ken Lay about the company's accounting fraud. Her warnings were ignored, but she later testified before Congress."
          },
          {
            id: "ethics-6-mq4",
            question: "What is the most important lesson from both the Enron and VW scandals?",
            options: ["Technology companies are more ethical than energy companies", "Ethical culture must come from leadership - incentives shape behavior", "Large companies can't be held accountable", "Fraud is only a problem in the United States"],
            correctAnswer: 1,
            explanation: "Both scandals show that when leadership creates incentives for deception and silences critics, ethical failures become systemic. Culture starts at the top."
          }
        ]
      }
    ]
  }
]
