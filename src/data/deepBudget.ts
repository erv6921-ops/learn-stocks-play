import { StructuredLessonContent } from "@/types"

// Wave-2 deepened content (Mortgages-depth rebuild) for: budgeting
export const deepBudget: StructuredLessonContent[] = [
  // ─────────────────────────────────────────────
  // budget-1: What is a Budget & Why It Matters
  // ─────────────────────────────────────────────
  {
    lessonId: "budget-1",
    sections: [
      {
        type: "concept",
        title: "A Budget Is a Plan for Your Money",
        paragraphs: [
          "A budget is simply a plan that decides where your money goes before it disappears. Think of it like a game plan a coach writes before the match: without one, you react randomly and usually lose. Say you earn $200 a month from a part-time job plus $50 in allowance, for $250 total. A budget maps out how much of that $250 goes to food, saving, and fun. Money is limited, so every dollar you spend on one thing is a dollar you can't spend on another - that trade-off is exactly what a budget helps you see clearly.",
          "Without a budget, most people spend on autopilot and wonder where their cash went. You buy a $6 boba here, a $15 game skin there, a $12 shirt somewhere else, and by the end of the month your $250 is gone with nothing saved. This is called 'leakage' - small, forgotten purchases that quietly drain you. A budget stops leakage by giving every dollar a job in advance. When money has a job, you notice immediately when something doesn't fit the plan, instead of being surprised by an empty account.",
          "The biggest myth is that budgets are about saying no to everything fun. The opposite is true: a good budget makes room for fun on purpose, so you can enjoy it guilt-free. If you plan $40 a month for entertainment, spending it isn't a mistake - it's the plan working. Budgeting also builds a skill you'll use for life: matching what you have against what you want and deciding on purpose. People who budget early tend to reach big goals - a car, college, a first apartment - years faster than those who never learn."
        ],
        bullets: [
          "A budget is a plan that gives every dollar a job before you spend it.",
          "Money is limited, so every choice is a trade-off between one thing and another.",
          "'Leakage' is small forgotten purchases that quietly drain your account.",
          "A good budget plans for fun on purpose, so you enjoy it without guilt.",
          "Budgeting is a lifelong skill that helps you reach big goals faster."
        ],
        realWorldExample: "Jordan earns $250 a month but never tracks it, and somehow ends each month with $0. After writing a simple budget - $80 food, $50 saving, $40 fun, $80 phone and transport - he suddenly saves $50 every month. Same income, but now $600 a year piles up instead of vanishing into forgotten snacks."
      },
      {
        type: "concept",
        title: "Why Budgeting Changes Your Whole Life",
        paragraphs: [
          "Budgeting gives you something powerful: control. When you know exactly what's coming in and going out, money stops being scary and starts being a tool. Studies of adults show that those who budget report far less financial stress, even when they don't earn much. The reason is simple - surprises cause stress, and a budget removes surprises. You already know the phone bill is $45 and rent is due on the first, so nothing blindsides you. That calm is worth more than a slightly bigger paycheck spent chaotically.",
          "A budget also turns vague wishes into real goals. 'I want a $600 laptop someday' is a daydream. But '$50 a month for 12 months' is a plan you can actually finish. Breaking a big number into monthly pieces is the secret behind almost every financial success. The same trick works for a $1,200 car in two years or a $300 concert trip. Once you see the monthly amount, you can check whether it fits your income - and if it doesn't, you adjust the timeline instead of giving up.",
          "Finally, budgeting protects you from debt. When you spend only money you actually have, you never need a credit card or a loan just to survive the month. People who don't budget often borrow to cover gaps, then pay interest on top - turning a $50 shortfall into $60 or more. A budget catches these gaps early so you can cut spending or earn more before you're forced to borrow. Learning this as a teen means you enter adulthood ahead of most people, who figure it out only after painful mistakes."
        ],
        bullets: [
          "Budgeting gives you control, which sharply lowers money stress.",
          "It removes surprises, because you already know your bills and due dates.",
          "Big goals become doable when you break them into small monthly amounts.",
          "Spending only money you have keeps you out of debt and interest charges.",
          "Learning to budget as a teen puts you ahead of most adults."
        ],
        realWorldExample: "Priya wants a $600 laptop. As a wish, it feels impossible on her $250 monthly income. Broken into a budget line of $50 a month, it becomes a 12-month plan she can track. A year later she buys it in cash - no credit card, no interest - while friends who 'wing it' are still saying someday."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "budget1-mc1",
            question: "What is the core purpose of a budget?",
            options: [
              "To ban all spending on things that are fun",
              "To plan where your money goes in advance",
              "To hide your money from friends and family",
              "To make you feel guilty about every purchase"
            ],
            correctAnswer: 1,
            explanation: "A budget is a plan that gives every dollar a job before you spend it. It's not about banning fun - a good budget actually makes room for fun on purpose."
          },
          {
            id: "budget1-mc2",
            question: "What does 'leakage' mean in budgeting?",
            options: [
              "Small forgotten purchases that quietly drain your money",
              "A tax the government adds to every purchase",
              "Money you earn but choose to save each month",
              "The interest a bank pays on your savings"
            ],
            correctAnswer: 0,
            explanation: "Leakage is the steady drip of small, forgotten purchases - a boba here, a skin there - that adds up and empties your account without you noticing."
          }
        ]
      },
      {
        type: "scenario",
        title: "Sam Wonders Where the Money Went",
        narrative: "Sam earns $300 a month walking dogs and doing yard work. He never plans his spending. At the end of the month he checks his account and finds only $4 left, with nothing saved - and he can't even remember what he bought. He wants to understand why a budget might fix this.",
        details: [
          "Sam's $300 income is real, but with no plan every dollar gets spent reactively.",
          "His money leaked away in small buys: snacks, app purchases, and rides he barely remembers.",
          "With a budget, he could assign each dollar a job - like $60 to saving - before spending starts.",
          "A plan would also let him fund fun on purpose, so he enjoys it without ending at $4."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "budget1-aq1",
          question: "Sam ends every month near $0 despite earning $300. What is the BEST first step a budget gives him?",
          options: [
            "Deciding where each dollar goes before spending it",
            "Borrowing money to cover the gap each month",
            "Earning more so leakage stops on its own",
            "Cutting out every single fun purchase you enjoy"
          ],
          correctAnswer: 0,
          explanation: "A budget's power is giving each dollar a job in advance, which stops leakage. Earning more alone won't help if there's still no plan, and a good budget keeps some fun rather than cutting it all."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A budget is a plan that gives every dollar a job before you spend it.",
          "It stops 'leakage' - the small forgotten purchases that drain your account.",
          "Good budgets plan for fun on purpose, so spending it is the plan working.",
          "Breaking big goals into monthly amounts makes them achievable and trackable.",
          "Budgeting lowers stress, avoids debt, and puts you ahead of most adults."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "budget1-mastery1",
            question: "Why is every spending choice in a budget considered a 'trade-off'?",
            options: [
              "Because prices always climb faster than what you earn",
              "Because a dollar spent here can't be spent elsewhere",
              "Because stores force you to buy items in pairs",
              "Because saving is somehow illegal for anyone under 18"
            ],
            correctAnswer: 1,
            explanation: "Money is limited, so every dollar you put toward one thing is a dollar unavailable for another. Seeing that trade-off clearly is exactly what a budget helps you do."
          },
          {
            id: "budget1-mastery2",
            question: "Which statement about budgets and fun is TRUE?",
            options: [
              "A good budget plans for fun on purpose",
              "Budgets require you to cut all fun spending",
              "Fun money is banned until you turn 18",
              "Fun spending you plan always counts as leakage"
            ],
            correctAnswer: 0,
            explanation: "A good budget sets aside money for fun on purpose. When you spend that planned amount, it isn't a mistake - it's the budget working as intended."
          },
          {
            id: "budget1-mastery3",
            question: "How does a budget help you reach a big goal like a $600 laptop?",
            options: [
              "By breaking it into small monthly amounts to save",
              "By letting a store lower the price for teens",
              "By making the whole goal appear instantly free somehow",
              "By forcing a bank to lend you the full amount"
            ],
            correctAnswer: 0,
            explanation: "A budget turns a scary total into a doable plan - like $50 a month for 12 months. That monthly framing is the secret behind almost every financial success."
          },
          {
            id: "budget1-mastery4",
            question: "How does budgeting help you avoid debt?",
            options: [
              "By raising your credit limit automatically",
              "By spending only money you actually have",
              "By deleting interest charges on all loans",
              "By hiding bills so they never come due"
            ],
            correctAnswer: 1,
            explanation: "When you plan around money you truly have, you don't need to borrow to survive the month. A budget catches gaps early so you can adjust before being forced into debt."
          },
          {
            id: "budget1-mastery5",
            question: "Research shows people who budget usually report…",
            options: [
              "Much less stress about their money",
              "That they can never enjoy any purchases",
              "Higher taxes than people who don't budget",
              "That their income drops every month"
            ],
            correctAnswer: 0,
            explanation: "Budgeting removes surprises, and surprises cause stress. So people who budget feel more in control and calmer about money, even when they don't earn a lot."
          },
          {
            id: "budget1-mastery6",
            question: "Jordan earns $250 but always ends at $0. What most likely fixes this?",
            options: [
              "Waiting for prices in stores to fall",
              "Giving each dollar a job before spending",
              "Asking for a raise to $1,000 a month",
              "Closing down his bank account entirely for good"
            ],
            correctAnswer: 1,
            explanation: "The issue isn't income - it's the lack of a plan. Assigning each dollar a job before spending stops leakage, so money is saved instead of vanishing into forgotten buys."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // budget-2: How to Make a Simple Budget
  // ─────────────────────────────────────────────
  {
    lessonId: "budget-2",
    sections: [
      {
        type: "concept",
        title: "The Three Pieces: Income, Spending, Saving",
        paragraphs: [
          "Every budget is built from three simple pieces: income, spending, and saving. Income is all the money coming in - a job, allowance, gifts, or side hustles. Suppose you earn $180 from a job and get $40 allowance; your income is $220. The golden rule of a simple budget is that spending plus saving can never exceed income. If money out is bigger than money in, you're heading for an empty account or debt. So the very first step is to add up your real income - not what you hope to earn, but what actually shows up.",
          "Spending is money that leaves for things you buy or bills you owe. To budget it, you list categories - food, transport, phone, clothes, fun - and assign a dollar amount to each. The trick is being honest and specific. Writing '$30 for eating out' is useful; writing 'some money for stuff' is not. When you total your spending categories, the number has to leave room for saving. If your listed spending already eats all $220 of income, you have to trim a category before the budget can work.",
          "Saving is the money you deliberately keep instead of spending. Beginners often treat saving as 'whatever is left over' - but leftovers are usually zero, because spending expands to fill whatever's available. The pro move is to 'pay yourself first': decide your saving amount before you plan spending. If you set aside $40 to save the moment your $220 arrives, you then budget the remaining $180 for spending. This flips the order and guarantees saving actually happens instead of being an afterthought that never comes."
        ],
        bullets: [
          "A simple budget has three parts: income, spending, and saving.",
          "Golden rule: spending plus saving must never exceed income.",
          "List spending as specific categories with real dollar amounts, not vague guesses.",
          "'Pay yourself first' means setting your saving amount before planning spending.",
          "Treating saving as 'leftovers' usually results in saving nothing."
        ],
        realWorldExample: "Ava has $220 income. She first pays herself $40 into savings, leaving $180. She assigns $70 food, $30 transport, $45 phone, and $35 fun - exactly $180. Because saving came first, it always happens, while friends who save 'what's left' end most months with nothing set aside."
      },
      {
        type: "concept",
        title: "Building and Balancing Your Budget",
        paragraphs: [
          "To build a budget, write income at the top, then subtract your planned saving, then list spending categories until you reach zero left unassigned. A budget is 'balanced' when income equals saving plus spending exactly. If you have money unassigned, give it a job - add to saving or a category. If you're over income, cut something. This back-and-forth is normal; even experts adjust their first draft. The goal isn't a perfect guess, it's a plan you can follow and tweak. A budget on paper that you actually use beats a perfect one in your head.",
          "Budgets only work if the numbers are realistic. If you write $10 for food but truly spend $60, the plan collapses in a week and you'll quit. Base your amounts on what you really spend, which is why tracking past spending helps so much. Start a little generous on categories you tend to overspend, then tighten them next month once you see real data. It's better to plan $50 for fun and come in under than plan $20 and blow past it, feeling like a failure. Accuracy keeps you motivated to keep going.",
          "A budget is a living document, not a one-time chore. Life changes - you get a raise, a subscription price rises, a new expense appears - so you revisit the plan each month and adjust. Many people review weekly for five minutes to check they're on track. If one category runs low mid-month, you can 'move' money from another category to cover it, as long as the total still balances. This flexibility is a feature, not cheating: you're steering your money on purpose instead of hoping it works out."
        ],
        bullets: [
          "A budget is 'balanced' when income equals saving plus spending exactly.",
          "If money is unassigned, give it a job; if you're over, cut a category.",
          "Use realistic amounts based on what you actually spend, not wishful numbers.",
          "Being slightly generous on tough categories beats setting them too tight.",
          "Revisit and adjust the budget monthly - and move money between categories as needed."
        ],
        realWorldExample: "Marcus first budgets $15 for snacks, then blows through it in four days. Next month he sets a realistic $40 and comes in at $37. The honest number let him actually stick to the plan, while his too-tight first attempt just made him feel like budgeting 'doesn't work.'"
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "budget2-mc1",
            question: "What does 'pay yourself first' mean?",
            options: [
              "Spend on wants before paying any bills",
              "Set your saving amount before planning spending",
              "Give yourself a cash bonus every payday",
              "Pay off all friends you owe before saving"
            ],
            correctAnswer: 1,
            explanation: "Paying yourself first means deciding your saving amount up front, before you budget spending. This guarantees saving happens instead of being a leftover that never appears."
          },
          {
            id: "budget2-mc2",
            question: "When is a budget considered 'balanced'?",
            options: [
              "When spending is larger than your income",
              "When you have leftover money you ignore",
              "When income equals saving plus spending",
              "When you skip saving to buy more wants"
            ],
            correctAnswer: 2,
            explanation: "A balanced budget means income equals saving plus spending exactly, with every dollar given a job and nothing left unassigned or overspent."
          }
        ]
      },
      {
        type: "scenario",
        title: "Lena Drafts Her First Budget",
        narrative: "Lena brings in $260 a month: $200 from a café job and $60 in allowance. She wants to save for a $480 bike. She decides to build a simple budget that puts saving first, then divides the rest among her real spending needs so she can hit her goal without going broke.",
        details: [
          "Her income is $260; she pays herself $60 for the bike fund first, leaving $200 to budget.",
          "She lists spending: $80 food, $40 transport, $45 phone, $35 fun - totaling exactly $200.",
          "Saving $60 a month, she'll reach the $480 bike in eight months with no borrowing.",
          "If a category runs short, she can move money from fun, as long as the total still balances."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "budget2-aq1",
          question: "Lena wants to be sure she saves $60 monthly for her bike. What should she do FIRST each month?",
          options: [
            "Set aside the $60 before planning any spending",
            "Spend on food and fun, then save what remains",
            "Wait until the month ends to see what's left",
            "Borrow $60 now and repay it later somehow"
          ],
          correctAnswer: 0,
          explanation: "Paying herself first - moving the $60 to savings before budgeting the rest - guarantees the goal gets funded. Saving 'what's left' usually leaves nothing, and borrowing defeats the purpose."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A simple budget has three parts: income, spending, and saving.",
          "The golden rule: spending plus saving must never exceed income.",
          "'Pay yourself first' by setting saving before you plan any spending.",
          "A balanced budget means income equals saving plus spending exactly.",
          "Use realistic numbers and revisit the plan monthly, moving money as needed."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "budget2-mastery1",
            question: "What are the three basic pieces of a simple budget?",
            options: [
              "Taxes, tips, and interest owed",
              "Income, spending, and saving",
              "Loans, gifts, and refunds",
              "Wants, needs, and credit cards"
            ],
            correctAnswer: 1,
            explanation: "Every budget is built from income (money in), spending (money out), and saving (money you deliberately keep). Balancing these three is the whole task."
          },
          {
            id: "budget2-mastery2",
            question: "What is the golden rule of a simple budget?",
            options: [
              "Spending plus saving must not exceed income",
              "Income should be spent completely each month",
              "Saving must always be larger than income",
              "Bills should be ignored until money runs out"
            ],
            correctAnswer: 0,
            explanation: "If money going out (spending plus saving) exceeds money coming in, you head toward an empty account or debt. Keeping spending plus saving within income is the core rule."
          },
          {
            id: "budget2-mastery3",
            question: "Why is 'pay yourself first' better than saving whatever's left?",
            options: [
              "Because leftovers are usually zero after spending",
              "Because banks require it by federal law",
              "Because it doubles your income each month",
              "Because it lets you skip all your bills"
            ],
            correctAnswer: 0,
            explanation: "Spending tends to expand to fill whatever's available, so 'leftovers' are usually nothing. Setting saving first guarantees it happens before spending can absorb it."
          },
          {
            id: "budget2-mastery4",
            question: "Marcus budgets $15 for snacks but really spends $40. What's the fix?",
            options: [
              "Quit budgeting entirely since plans simply never work",
              "Set a realistic amount based on real spending",
              "Hide the extra $25 away from himself somehow",
              "Add $15 more to every other category too"
            ],
            correctAnswer: 1,
            explanation: "A too-tight number collapses fast and kills motivation. Basing the amount on what he truly spends - like $40 - makes the plan realistic enough to actually follow."
          },
          {
            id: "budget2-mastery5",
            question: "Your budget has $20 unassigned after listing everything. What should you do?",
            options: [
              "Leave it floating with no job at all",
              "Give it a job, such as saving it",
              "Delete that whole amount from your income entirely",
              "Spend it right away on anything you see nearby"
            ],
            correctAnswer: 1,
            explanation: "A balanced budget gives every dollar a job. Unassigned money should be sent somewhere on purpose - such as savings or a category - rather than left to leak away."
          },
          {
            id: "budget2-mastery6",
            question: "Why is a budget called a 'living document'?",
            options: [
              "It has to be printed on special legal paper",
              "You revisit and adjust it as life changes",
              "It expires and quietly deletes itself every month",
              "Only an accountant is allowed to edit it"
            ],
            correctAnswer: 1,
            explanation: "Income and expenses change over time, so you revisit the budget each month and adjust. Moving money between categories to stay balanced is steering on purpose, not cheating."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // budget-3: Tracking Your Spending
  // ─────────────────────────────────────────────
  {
    lessonId: "budget-3",
    sections: [
      {
        type: "concept",
        title: "Why Tracking Beats Guessing",
        paragraphs: [
          "Tracking means recording what you actually spend, purchase by purchase. It matters because memory lies: research shows people underestimate their own spending by 20% to 40%, especially on small, frequent buys. You might swear you spend '$20 a month on snacks' while the receipts say $75. A budget built on a wrong guess is doomed, because the plan never matches reality. Tracking replaces the guess with facts. Once you see the true numbers, you can finally make decisions that actually work instead of decisions based on a comforting fiction.",
          "The biggest culprits are tiny recurring purchases - the '$5 problem.' A $5 drink every school day is about $100 a month, or $1,200 a year, but each single purchase feels harmless. Because they're small and constant, these buys hide from your memory and blow up your budget. Tracking drags them into the light. When you see '$1,200 a year on drinks' written down, you can decide on purpose whether that's worth it. Maybe it is - but now it's a choice, not an accident quietly eating your future car fund.",
          "Tracking also reveals patterns you'd never notice otherwise. Maybe you always overspend on weekends, or every time you hang out with a certain friend, or right after payday. These patterns are gold: once you see the trigger, you can plan around it. You might set a weekend cash limit or eat before going out so you buy less. Without tracking, you just feel vaguely broke and confused. With it, you get a clear map of exactly where and why your money leaves - which is the first step to steering it somewhere better. Even a single month of honest tracking usually surprises people and nudges them to fix at least one costly habit for good."
        ],
        bullets: [
          "Tracking records what you actually spend, replacing faulty memory with facts.",
          "People routinely underestimate their spending by 20% to 40%.",
          "Small recurring buys - the '$5 problem' - hide from memory but add up fast.",
          "Seeing yearly totals turns invisible habits into conscious choices.",
          "Tracking reveals patterns and triggers so you can plan around them."
        ],
        realWorldExample: "Devi guessed she spent about $25 a month on coffee. After tracking every purchase for one month, the total was $88 - a $63 gap. Seeing $88 (over $1,000 a year) let her cut back to two coffees a week and redirect the difference toward a summer trip fund."
      },
      {
        type: "concept",
        title: "How to Actually Track",
        paragraphs: [
          "There are three main ways to track, and the best one is whichever you'll actually stick with. First, a simple notes app or notebook: jot each purchase right after you make it. Second, a budgeting app that links to your account and auto-sorts spending into categories. Third, the 'receipt jar' method - keep every receipt and total them weekly. Apps are easiest but require setup; pen and paper is instant but needs discipline. Consistency matters far more than the method; a messy tracker you keep beats a perfect system you abandon after three days.",
          "The key habit is recording purchases promptly, ideally within minutes. The longer you wait, the more you forget - and forgotten purchases are exactly the ones wrecking your budget. Build a trigger: every time you tap your card or hand over cash, log it immediately. It takes ten seconds. Round to whole dollars to keep it fast; precision to the penny doesn't matter for spotting patterns. If you miss a day, don't quit - just catch up from memory and receipts. The goal is a good-enough record, not a flawless one.",
          "Tracking only pays off if you review it. Once a week, spend five minutes adding up categories and comparing them to your budget. Ask three questions: Where did I spend the most? What surprised me? What will I change next week? This review turns raw data into decisions. Maybe you cut a category, move money, or set a limit. Over a few weeks, you'll spot your real habits and your budget will get sharper. Tracking without reviewing is just collecting numbers; the review is where the money actually changes."
        ],
        bullets: [
          "Three methods: a notes app, a budgeting app, or a receipt jar - pick what sticks.",
          "Consistency matters far more than which method you choose.",
          "Record purchases promptly, within minutes, before you forget them.",
          "Round to whole dollars; precision to the penny isn't needed for spotting patterns.",
          "Review weekly and ask what surprised you and what to change."
        ],
        realWorldExample: "Theo tries a fancy spreadsheet and quits in two days because it's too fussy. He switches to logging each buy in his phone's notes app in ten seconds. Six weeks later he's still tracking, and his weekly reviews have already cut his impulse snack spending in half."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "budget3-mc1",
            question: "Why can't you rely on memory to know your spending?",
            options: [
              "Memory adds fake purchases you never made",
              "People underestimate spending by 20% to 40%",
              "Banks legally hide your true spending totals",
              "Prices change too fast to ever remember"
            ],
            correctAnswer: 1,
            explanation: "Studies show people underestimate their own spending by 20% to 40%, especially on small frequent buys. Tracking replaces that faulty guess with real facts."
          },
          {
            id: "budget3-mc2",
            question: "What matters most when choosing a tracking method?",
            options: [
              "That it's the most expensive app available",
              "That it records spending down to the penny",
              "That it's one you'll actually stick with",
              "That it hides your spending from yourself"
            ],
            correctAnswer: 2,
            explanation: "Consistency beats sophistication. A messy tracker you keep using is far better than a perfect system you abandon after a few days."
          }
        ]
      },
      {
        type: "scenario",
        title: "Owen Hunts for His Missing Money",
        narrative: "Owen earns $240 a month but is always broke by week three, and he can't explain why. He decides to track every purchase in his phone's notes app for one month. At the end, he adds up the categories and finds a surprising pattern he never suspected.",
        details: [
          "Owen logged each buy within minutes, rounding to whole dollars to keep it fast.",
          "His tracking revealed $110 spent on food delivery - far more than the $40 he'd assumed.",
          "The damage came from small, frequent orders that each felt harmless in the moment.",
          "Seeing the $110 total let him set a delivery limit and redirect money to savings."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "budget3-aq1",
          question: "Owen discovers $110 a month in delivery orders he never noticed. Why did tracking reveal this when memory didn't?",
          options: [
            "Delivery apps must be secretly overcharging every single user",
            "Small frequent buys hide from memory but add up",
            "His bank quietly deleted the charges from his statement",
            "Memory somehow always overstates what most people really spend"
          ],
          correctAnswer: 1,
          explanation: "Small, frequent purchases each feel harmless and slip out of memory, so they hide until you write them all down. Tracking makes the invisible total visible - the opposite of overstating."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Tracking records real spending, replacing faulty memory with facts.",
          "People underestimate spending by 20% to 40%, mostly on small frequent buys.",
          "Choose whatever method you'll stick with; consistency beats sophistication.",
          "Record purchases promptly and round to whole dollars to keep it fast.",
          "Review weekly and turn the data into decisions - the review is where money changes."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "budget3-mastery1",
            question: "What is the '$5 problem' in spending?",
            options: [
              "A rule that all items must cost $5",
              "Small recurring buys that quietly add up",
              "A fee banks charge for tiny purchases",
              "The maximum you can spend per day"
            ],
            correctAnswer: 1,
            explanation: "A small recurring purchase - like a $5 daily drink - feels harmless each time but adds up to about $100 a month. These hidden buys are why tracking matters so much."
          },
          {
            id: "budget3-mastery2",
            question: "Why should you record a purchase within minutes of making it?",
            options: [
              "Because the price changes if you wait",
              "Because you forget purchases as time passes",
              "Because the store requires an instant log",
              "Because apps stop working after an hour"
            ],
            correctAnswer: 1,
            explanation: "The longer you wait, the more purchases you forget - and forgotten buys are exactly the ones wrecking budgets. Logging promptly captures them before they slip away."
          },
          {
            id: "budget3-mastery3",
            question: "What should you do during a weekly tracking review?",
            options: [
              "Delete the data so it doesn't clutter your phone",
              "Compare categories to your budget and decide changes",
              "Add fake purchases to reach a round number",
              "Ignore surprises and keep spending the same"
            ],
            correctAnswer: 1,
            explanation: "The review turns raw numbers into decisions: see where you spent most, what surprised you, and what to change. Tracking without reviewing is just collecting numbers."
          },
          {
            id: "budget3-mastery4",
            question: "Theo abandons a fancy spreadsheet but sticks with a notes app. What's the lesson?",
            options: [
              "Only detailed spreadsheets can ever track spending correctly",
              "The method you'll actually keep works best",
              "Tracking should always take at least an hour",
              "Simple methods can never reveal your real spending"
            ],
            correctAnswer: 1,
            explanation: "Consistency beats sophistication. A quick method he keeps using works far better than a perfect system he quits, because only a maintained tracker reveals real habits."
          },
          {
            id: "budget3-mastery5",
            question: "Devi guessed $25 a month on coffee but tracked $88. What did tracking give her?",
            options: [
              "Proof that coffee is bad for her health",
              "A true number she can act on",
              "A surprise discount from the coffee shop nearby",
              "A convenient reason to stop budgeting entirely"
            ],
            correctAnswer: 1,
            explanation: "Tracking replaced a comforting guess with the real $88 figure. Seeing the true number - over $1,000 a year - let her make a deliberate choice to cut back and redirect the cash."
          },
          {
            id: "budget3-mastery6",
            question: "Besides totals, what valuable thing does tracking reveal?",
            options: [
              "Patterns and triggers behind your spending",
              "The exact stock price of every store",
              "Your future income for the next decade",
              "Which friends have the most money saved"
            ],
            correctAnswer: 0,
            explanation: "Tracking exposes patterns - like overspending on weekends or after payday. Spotting these triggers lets you plan around them, which you can't do while just feeling vaguely broke."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // budget-4: The 50/30/20 Rule
  // ─────────────────────────────────────────────
  {
    lessonId: "budget-4",
    sections: [
      {
        type: "concept",
        title: "What the 50/30/20 Rule Says",
        paragraphs: [
          "The 50/30/20 rule is a famous shortcut for splitting your after-tax income into three buckets: 50% for needs, 30% for wants, and 20% for saving and paying off debt. Say you take home $300 a month. That's $150 for needs, $90 for wants, and $60 for saving. The appeal is simplicity - instead of agonizing over dozens of categories, you sort every dollar into just three groups. It gives beginners a sensible starting shape for a budget without demanding a spreadsheet or hours of math. You can set it up in five minutes.",
          "The '50 for needs' bucket covers things you truly must pay for: for a teen, that might be a phone plan, transport to work, or a share of groceries; for an adult, rent, utilities, and basic food. The '30 for wants' bucket is for the fun stuff you enjoy but could live without - streaming, eating out, games, new clothes beyond the basics. The line between need and want can be blurry (a phone is a need, but the newest model is a want), and being honest about that line is where the rule teaches real discipline.",
          "The '20 for saving' bucket is the part most people skip - and exactly why the rule bakes it in. This 20% goes to building an emergency fund, saving for goals, or paying down any debt you owe. By making saving a fixed fifth of your income, the rule guarantees your future self gets paid, not just your present self. On $300 income, that's $60 a month, or $720 a year, growing automatically. The genius is that once the percentages are set, saving happens by default instead of depending on willpower each month."
        ],
        bullets: [
          "50/30/20 splits after-tax income into 50% needs, 30% wants, 20% saving/debt.",
          "It's a fast, simple starting shape - just three buckets instead of many.",
          "Needs are things you must pay for; wants are things you enjoy but could skip.",
          "The line between need and want can blur, so honesty is where discipline comes in.",
          "Baking in 20% saving guarantees your future self gets paid by default."
        ],
        realWorldExample: "Nia takes home $300. Using 50/30/20, she assigns $150 to needs (phone, bus pass, groceries), $90 to wants (games, eating out), and $60 to saving. In one year her saving bucket alone builds to $720 - all because the percentages made saving automatic."
      },
      {
        type: "concept",
        title: "Using the Rule Wisely",
        paragraphs: [
          "The 50/30/20 rule is a guideline, not a law. The exact numbers can flex to fit your life. If you live with parents and have almost no needs, you might do 20/30/50 and save half your income - a huge head start. If money is tight, needs might swallow 70%, leaving less for wants and saving. The point isn't to hit 50/30/20 perfectly; it's to have clear proportions you decide on purpose. Even a rough version beats no plan, and you can adjust the percentages as your situation changes over time.",
          "The most common mistake is mislabeling wants as needs to justify spending. 'I need the latest phone,' 'I need takeout tonight,' 'I need those shoes' - calling a want a need quietly inflates the 50% bucket and starves your saving. A useful test: could you survive a month without it? If yes, it's a want. This honesty is uncomfortable but powerful, because it's exactly where money leaks. People who master the need-versus-want line find their 20% saving bucket suddenly easy to fill instead of impossible.",
          "The rule also handles debt smartly by grouping it with saving in the 20% bucket. If you owe money - say to a friend or on a card - paying it off counts toward that fifth, because reducing debt is a form of building wealth (you stop paying interest and free up future income). Once debt is cleared, that whole 20% flows into pure saving and investing. Starting this habit as a teen, when your needs are usually low, lets you save a bigger share than most adults ever manage - a real long-term advantage."
        ],
        bullets: [
          "50/30/20 is a flexible guideline; adjust the percentages to fit your life.",
          "With low needs (living at home), saving far more than 20% is a great move.",
          "The classic mistake is relabeling wants as needs to justify spending.",
          "The test: if you could survive a month without it, it's a want.",
          "Paying off debt counts in the 20% bucket, since it's a form of building wealth."
        ],
        realWorldExample: "Because Leo lives at home, his real needs are tiny - just $40 for transport. Instead of forcing 50/30/20, he runs roughly 15/35/50 and saves $150 of his $300 income each month. By flexing the rule to his low needs, he saves twice what a strict 20% would give him."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "budget4-mc1",
            question: "In the 50/30/20 rule, what does the 20% bucket cover?",
            options: [
              "Only fun spending like games and eating out",
              "Paying rent, utilities, and other basic needs",
              "Saving and paying off any debt you owe",
              "The taxes taken out before you ever get paid"
            ],
            correctAnswer: 2,
            explanation: "The 20% bucket is for saving and paying down debt. Grouping debt with saving works because clearing debt frees future income - a form of building wealth."
          },
          {
            id: "budget4-mc2",
            question: "What's a good test for whether something is a want, not a need?",
            options: [
              "Whether the item costs less than twenty dollars",
              "Whether you could survive a month without it",
              "Whether some friend of yours already owns one",
              "Whether it's on sale at the store today"
            ],
            correctAnswer: 1,
            explanation: "If you could get through a month without it, it's a want. This honest test stops you from mislabeling wants as needs and quietly inflating your needs bucket."
          }
        ]
      },
      {
        type: "scenario",
        title: "Kayla Splits Her Paycheck",
        narrative: "Kayla takes home $400 a month from her job. She lives with her family, so her real needs are modest. She wants to use the 50/30/20 rule as a starting point but wonders whether she should follow it exactly or adjust it to her low-needs situation to save more.",
        details: [
          "A strict 50/30/20 would give $200 needs, $120 wants, and $80 saving.",
          "But Kayla's true needs are only about $60 (phone and transport), far under $200.",
          "Since the rule is a flexible guideline, she can shift the extra toward saving.",
          "By running roughly 15/35/50, she saves $200 a month instead of just $80."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "budget4-aq1",
          question: "Kayla's real needs are only $60 of her $400 income. What's the smartest way to use 50/30/20?",
          options: [
            "Force exactly $200 into needs to obey the rule",
            "Flex the percentages and save the extra money",
            "Skip saving since her needs are already low",
            "Move all the extra into the wants bucket"
          ],
          correctAnswer: 1,
          explanation: "50/30/20 is a guideline, not a law. With low needs, the smart move is flexing the percentages to save far more - reaching $200 saved instead of the strict $80."
        }
      },
      {
        type: "recap",
        takeaways: [
          "50/30/20 splits after-tax income into needs, wants, and saving/debt.",
          "It's a fast, simple starting shape using just three buckets.",
          "The 20% bucket bakes in saving so it happens by default, not by willpower.",
          "It's a flexible guideline - adjust the percentages to fit your life.",
          "The key discipline is honestly separating needs from wants."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "budget4-mastery1",
            question: "On $300 of take-home pay, how much does 50/30/20 assign to wants?",
            options: [
              "$150 for the wants bucket",
              "$90 for the wants bucket",
              "$60 for the wants bucket",
              "$30 for the wants bucket"
            ],
            correctAnswer: 1,
            explanation: "Wants get 30% of $300, which is $90. Needs get 50% ($150) and saving gets 20% ($60). The three buckets always add up to the full income."
          },
          {
            id: "budget4-mastery2",
            question: "Why does the rule bake saving into a fixed 20%?",
            options: [
              "So saving happens by default, not by willpower",
              "Because some bank legally demands you save exactly 20%",
              "So you can skip building any emergency fund",
              "Because your wants should always come before any saving"
            ],
            correctAnswer: 0,
            explanation: "Making saving a set fifth of income means it happens automatically each month, instead of depending on leftover willpower. That's the rule's real genius."
          },
          {
            id: "budget4-mastery3",
            question: "What is the most common mistake people make with 50/30/20?",
            options: [
              "Saving far too much of their income",
              "Labeling wants as needs to justify spending",
              "Refusing to spend anything on wants at all",
              "Counting their income twice by accident"
            ],
            correctAnswer: 1,
            explanation: "Calling wants 'needs' - the latest phone, takeout, new shoes - inflates the 50% bucket and starves saving. Honestly separating the two is the core discipline."
          },
          {
            id: "budget4-mastery4",
            question: "Why can Leo, who lives at home, save more than a strict 20%?",
            options: [
              "Because his needs are very low, freeing income",
              "Because the rule strictly forbids you saving under 50%",
              "Because just living at home somehow doubles his paycheck",
              "Because wants are illegal for teens at home"
            ],
            correctAnswer: 0,
            explanation: "With tiny needs, less income is locked into that bucket, so Leo can flex the guideline and pour the difference into saving - a real head start over most adults."
          },
          {
            id: "budget4-mastery5",
            question: "Why does paying off debt count in the 20% bucket?",
            options: [
              "Because paying off debt is technically a type of want",
              "Because clearing debt is a form of building wealth",
              "Because lenders forbid saving until debt is gone",
              "Because your debt payments directly reduce the taxes owed"
            ],
            correctAnswer: 1,
            explanation: "Paying down debt stops interest and frees future income, so it builds wealth much like saving does. Once debt is cleared, that 20% flows into pure saving."
          },
          {
            id: "budget4-mastery6",
            question: "A teen calls a brand-new phone model a 'need.' What's the honest label?",
            options: [
              "A need, since every phone is always essential",
              "A want, because a basic phone would do",
              "Neither a want nor a need at all",
              "A saving, because phones tend to hold their value"
            ],
            correctAnswer: 1,
            explanation: "A phone may be a need, but the newest model is a want - a basic one covers the actual need. Being honest about that line keeps the needs bucket from ballooning."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // budget-5: Monthly Budget
  // ─────────────────────────────────────────────
  {
    lessonId: "budget-5",
    sections: [
      {
        type: "concept",
        title: "Fixed vs. Variable Expenses",
        paragraphs: [
          "A complete monthly budget starts by sorting expenses into two types: fixed and variable. Fixed expenses stay the same every month - a $45 phone plan, a $10 streaming subscription, a $30 bus pass. You can predict them exactly, which makes them easy to plan around. Variable expenses change month to month - food, entertainment, gifts, clothes. They're harder to plan because the amount moves. Knowing which is which is powerful: fixed costs show your baseline (the minimum you must cover), while variable costs are where you have the most room to adjust when money is tight.",
          "Fixed expenses feel safe because they're predictable, but they carry a hidden danger: they lock in your money before the month even starts. If your fixed costs eat $120 of a $250 income, you've only got $130 of flexibility left, no matter what. That's why smart budgeters watch their fixed costs closely and question each one. Do you really use all three streaming subscriptions? Every fixed cost you cut frees the same amount every single month, forever - so trimming a $12 subscription you barely use saves $144 a year with a single decision.",
          "Variable expenses are where budgets are won or lost, because that's where your choices show up daily. Since they move, you plan them with an estimate based on past tracking, then watch them during the month. If groceries run high one week, you can pull back the next. The trap with variable costs is that they feel 'small' in the moment but swing wildly over a month. Setting a target for each variable category - and checking your progress weekly - keeps them from quietly ballooning past your income."
        ],
        bullets: [
          "Fixed expenses stay the same monthly (phone plan, subscriptions, bus pass).",
          "Variable expenses change monthly (food, fun, gifts, clothes).",
          "Fixed costs lock in money before the month starts - question each one.",
          "Cutting a fixed cost frees that amount every month, forever.",
          "Variable costs are where you have the most room to adjust when tight."
        ],
        realWorldExample: "Aiden lists $95 in fixed costs (phone $45, transit $30, streaming $20) and estimates $115 in variable costs (food, fun) on his $250 income. Spotting a $9 duplicate streaming service he never watches, he cancels it - freeing $108 a year from one quick decision."
      },
      {
        type: "concept",
        title: "Building and Running the Monthly Budget",
        paragraphs: [
          "To build a full monthly budget, list your income, then your fixed expenses, then your variable expenses, then your saving - and make it all balance. A common method is the running total: start with income, subtract each category, and watch the number shrink to exactly zero (every dollar assigned). If you finish above zero, send the rest to saving; if below zero, trim a variable category. Because fixed costs are certain, you can subtract those first and know precisely how much is left to divide among variable spending and saving.",
          "Timing matters as much as amounts. A monthly budget has to account for when bills are due, not just how big they are. If your phone bill hits on the 3rd but your paycheck lands on the 15th, you could be short even with a balanced budget. The fix is to line up due dates with income, or keep a small buffer so timing gaps don't cause a missed payment or an overdraft fee (often $30 or more). Mapping out a simple calendar of income dates and bill dates prevents nasty mid-month surprises.",
          "A monthly budget is a cycle, not a single event. At month's end, compare what you planned against what actually happened - this is the 'reconcile' step. Where did you overspend? Underspend? Use that reality to adjust next month's plan. Maybe food always runs $20 over, so you raise it and cut fun to match. Over three or four months, your budget gets remarkably accurate because it's tuned to your real life. The people who succeed aren't those with a perfect first budget - they're the ones who keep adjusting each cycle."
        ],
        bullets: [
          "Build it by listing income, fixed costs, variable costs, and saving - then balance.",
          "The running-total method subtracts each category until you reach exactly zero.",
          "Account for bill timing, not just amounts, to avoid mid-month shortfalls.",
          "A small buffer prevents overdraft fees when due dates don't line up with pay.",
          "Each month, reconcile plan vs. reality and adjust next month accordingly."
        ],
        realWorldExample: "Sofia's budget balanced perfectly, but her $45 phone bill was due on the 3rd while her pay arrived on the 15th - so she overdrafted and paid a $35 fee. Next month she kept a $50 buffer and mapped her due dates, and the timing problem vanished."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "budget5-mc1",
            question: "Which of these is a FIXED expense?",
            options: [
              "A $45 monthly phone plan",
              "Weekly spending on snacks",
              "Gifts you buy for friends",
              "Money spent going out on weekends"
            ],
            correctAnswer: 0,
            explanation: "A $45 phone plan is the same every month, so it's fixed. Snacks, gifts, and going out change month to month, which makes them variable expenses."
          },
          {
            id: "budget5-mc2",
            question: "Why does bill timing matter in a monthly budget?",
            options: [
              "Bills cost more if paid late in the month",
              "You can be short if a bill precedes payday",
              "Poor timing changes the total amount you actually owe",
              "Your fixed bills disappear entirely if paid early enough"
            ],
            correctAnswer: 1,
            explanation: "Even a balanced budget can leave you short if a bill is due before your income arrives. Lining up due dates or keeping a buffer prevents missed payments and overdraft fees."
          }
        ]
      },
      {
        type: "scenario",
        title: "Malik Builds His First Full Month",
        narrative: "Malik earns $350 a month and wants a complete monthly budget. He lists his fixed costs, estimates his variable costs from last month's tracking, and sets a saving goal. He also notices his biggest bill is due before his paycheck arrives, and wonders how to handle it.",
        details: [
          "Fixed costs total $120 (phone, transit, subscriptions); these are subtracted first.",
          "That leaves $230 to split between variable spending and his saving goal.",
          "He assigns $150 variable and $80 saving, balancing the budget to exactly zero.",
          "His $60 bill is due on the 5th but pay lands on the 20th, so he keeps a buffer."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "budget5-aq1",
          question: "Malik's $60 bill is due on the 5th, but his pay arrives on the 20th. What's the best fix?",
          options: [
            "Simply skip the bill until his next paycheck arrives",
            "Keep a buffer so the timing gap is covered",
            "Cancel his whole budget since it clearly doesn't work",
            "Move all of his saving into that one bill"
          ],
          correctAnswer: 1,
          explanation: "Even a balanced budget can hit a timing gap. Keeping a small buffer bridges the days between the due date and payday, avoiding a missed payment or overdraft fee."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Sort expenses into fixed (same monthly) and variable (changing) types.",
          "Fixed costs lock in money early - cutting one frees that amount forever.",
          "Variable costs are where you have the most room to adjust.",
          "Account for bill timing and keep a buffer to avoid overdraft fees.",
          "Each month, reconcile plan vs. reality and adjust the next cycle."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "budget5-mastery1",
            question: "What's the difference between fixed and variable expenses?",
            options: [
              "Fixed are wants; variable are always needs",
              "Fixed stay the same monthly; variable change",
              "Fixed costs are illegal; variable ones are allowed",
              "Fixed are small; variable are always large"
            ],
            correctAnswer: 1,
            explanation: "Fixed expenses (like a phone plan) stay the same each month, while variable expenses (like food or fun) change. Knowing which is which shows your baseline and your flexibility."
          },
          {
            id: "budget5-mastery2",
            question: "Why is cutting a fixed cost so valuable?",
            options: [
              "It frees that amount every month going forward",
              "It only saves you money one single time",
              "It somehow raises your income for the whole month",
              "It removes any need to track your spending"
            ],
            correctAnswer: 0,
            explanation: "Because fixed costs repeat, cutting one saves the same amount every month, forever. Canceling a $12 subscription you don't use saves $144 a year from one decision."
          },
          {
            id: "budget5-mastery3",
            question: "In the running-total method, what does reaching exactly zero mean?",
            options: [
              "You have spent every single dollar on wants",
              "Every dollar has been assigned a job",
              "Your entire income was completely wasted this month",
              "You simply forgot to include any of your saving"
            ],
            correctAnswer: 1,
            explanation: "Subtracting each category from income down to zero means every dollar is assigned. If you finish above zero, add to saving; below zero, trim a variable category."
          },
          {
            id: "budget5-mastery4",
            question: "Sofia's budget balanced but she still overdrafted. Why?",
            options: [
              "Her total monthly spending secretly doubled overnight",
              "A bill was due before her paycheck arrived",
              "Her fixed costs can't be included in any budget",
              "She simply saved far too much of her income"
            ],
            correctAnswer: 1,
            explanation: "A balanced budget can still fail on timing: her bill was due before payday, causing an overdraft. A buffer and a due-date calendar solve this timing gap."
          },
          {
            id: "budget5-mastery5",
            question: "What is the 'reconcile' step at month's end?",
            options: [
              "Deleting all of last month's entire budget completely",
              "Comparing what you planned to what happened",
              "Doubling every spending category for next month",
              "Ignoring all your overspending until next year"
            ],
            correctAnswer: 1,
            explanation: "Reconciling means comparing your plan against reality - where you over- or underspent - then adjusting next month. This tuning makes your budget accurate over a few cycles."
          },
          {
            id: "budget5-mastery6",
            question: "Why subtract fixed costs first when building the budget?",
            options: [
              "Because fixed costs are the only expenses that matter",
              "Because they're certain, showing what's left to divide",
              "Because fixed costs change the most every month",
              "Because fixed costs can be skipped in most months"
            ],
            correctAnswer: 1,
            explanation: "Fixed costs are predictable, so subtracting them first tells you exactly how much remains to split among variable spending and saving - a solid foundation for the plan."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // budget-6: Emergency Funds
  // ─────────────────────────────────────────────
  {
    lessonId: "budget-6",
    sections: [
      {
        type: "concept",
        title: "What an Emergency Fund Is and Why It Matters",
        paragraphs: [
          "An emergency fund is money set aside only for true emergencies - a sudden expense you didn't plan for and can't skip. A cracked phone screen, a car repair, a surprise medical bill, or a lost job all qualify. The whole point is to have cash ready so a surprise doesn't wreck your finances or force you into debt. Without one, an unexpected $200 bill becomes a crisis: you borrow, put it on a credit card, or skip other necessities. With a fund, the same bill is a minor annoyance you simply pay and move on from.",
          "The reason emergency funds matter so much is that emergencies are not rare - they're guaranteed to happen, just unpredictably in timing. Surveys show that a large share of adults can't cover a surprise $400 expense without borrowing. That fragility is what turns a small setback into a spiral: one car repair leads to a credit card balance, which leads to interest, which leads to more debt. An emergency fund breaks that chain. It's the difference between 'that was stressful' and 'that ruined my whole year.' It buys you calm and options.",
          "An emergency fund is not a savings goal for something fun, and that distinction is crucial. Money for a new laptop or a concert is a 'sinking fund' - saving toward a known, planned purchase. An emergency fund is different: it sits untouched, guarding against the unknown. Mixing them is a classic mistake - you 'borrow' from your emergency fund for a sale, then an actual emergency hits and you're unprotected. Keeping the emergency fund mentally and often physically separate is what keeps it ready for its one real job."
        ],
        bullets: [
          "An emergency fund is cash reserved only for true, unexpected, unavoidable costs.",
          "Its purpose is to absorb surprises without forcing you into debt.",
          "Emergencies are guaranteed to happen eventually - just not on a schedule.",
          "Many adults can't cover a surprise $400 expense without borrowing.",
          "It's separate from a 'sinking fund,' which saves for a known planned purchase."
        ],
        realWorldExample: "Ravi's phone screen shatters and repair costs $180. Because he'd built a $300 emergency fund, he pays it instantly and refills the fund over the next two months. His friend without a fund charges the same repair to a credit card and, with interest, ends up paying about $215."
      },
      {
        type: "concept",
        title: "How Big and How to Build It",
        paragraphs: [
          "How big should an emergency fund be? Adults are usually told to save three to six months of expenses, but for a teen that's overkill and discouraging. A better teen starter goal is a fixed amount like $300 to $500 - enough to cover most real surprises without borrowing. The key is to pick a target that feels reachable, hit it, then decide whether to grow it. A fund you actually build to $300 protects you far more than a $3,000 goal you never start. Start where you are, not where a textbook says an adult should be.",
          "You build an emergency fund the same way you eat an elephant - one bite at a time. Add a small, automatic amount every time you get paid, even $20. On a $250 monthly income, saving $25 a month reaches a $300 fund in a year without pain. The magic word is automatic: set the transfer to happen the moment money arrives, before you can spend it. Slow and boring is exactly right here; the fund isn't meant to be exciting, it's meant to exist. Consistency, not size of contribution, is what gets you there.",
          "Where you keep the fund matters too. It should be accessible but not too accessible - reachable in a day for a real emergency, but not so handy that you tap it for pizza. A separate savings account is ideal: it's safe, slightly harder to reach than your spending account, and often earns a little interest. Avoid keeping it as cash in your room (easy to spend, easy to lose) or invested in something risky (its value could drop right when you need it). The emergency fund's job is to be boringly, reliably there."
        ],
        bullets: [
          "A solid teen starter goal is a fixed $300 to $500, not months of expenses.",
          "Pick a reachable target, hit it, then decide whether to grow it.",
          "Build it with small automatic contributions every time you get paid.",
          "Automatic transfers move money to savings before you can spend it.",
          "Keep it in a separate savings account - accessible but not too easy to raid."
        ],
        realWorldExample: "Mia sets a $300 emergency fund goal and automates $25 from each month's income into a separate savings account. She barely notices it leaving. Twelve months later she has her full $300 fund, built painlessly - and when her bike needs a $90 repair, she's completely covered."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "budget6-mc1",
            question: "What is an emergency fund for?",
            options: [
              "Saving up for a planned vacation",
              "Covering unexpected, unavoidable costs",
              "Buying a new phone on release day",
              "Investing in risky stocks for growth"
            ],
            correctAnswer: 1,
            explanation: "An emergency fund covers true surprises - a repair, a medical bill, a lost job - so they don't force you into debt. Saving for a planned purchase is a sinking fund instead."
          },
          {
            id: "budget6-mc2",
            question: "What's a realistic starter emergency fund goal for a teen?",
            options: [
              "Six months of an adult's full expenses",
              "A fixed amount like $300 to $500",
              "Exactly one dollar kept in a jar",
              "Nothing at all, since teens face no emergencies"
            ],
            correctAnswer: 1,
            explanation: "A fixed $300 to $500 is reachable and covers most real teen surprises. The adult 'three to six months' target is overkill and often just discourages people from starting."
          }
        ]
      },
      {
        type: "scenario",
        title: "Ella Prepares for the Unexpected",
        narrative: "Ella earns $280 a month and has no savings for surprises. Last month a $150 car repair forced her to borrow from a friend, which felt awful. She decides to build an emergency fund so the next surprise won't derail her, and wants to do it in a way she'll actually stick with.",
        details: [
          "She sets a reachable $400 goal - enough to cover most real emergencies.",
          "She automates $30 from each month's income into a separate savings account.",
          "The automatic transfer moves the money before she can spend it on wants.",
          "She keeps the fund separate from her goal-saving so she won't accidentally raid it."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "budget6-aq1",
          question: "Ella wants her emergency fund to actually get built. What habit makes that most likely?",
          options: [
            "Saving whatever happens to be left over",
            "Automating a set amount every payday",
            "Keeping the cash loose in her backpack",
            "Waiting for a big windfall to fund it"
          ],
          correctAnswer: 1,
          explanation: "Automating a fixed amount each payday moves money to savings before she can spend it, so the fund grows reliably. Leftovers are usually zero and windfalls rarely come."
        }
      },
      {
        type: "recap",
        takeaways: [
          "An emergency fund is cash reserved for unexpected, unavoidable costs.",
          "It absorbs surprises without forcing you into debt and interest.",
          "A reachable teen goal is a fixed $300 to $500, not months of expenses.",
          "Build it with small automatic contributions every payday.",
          "Keep it separate and accessible - but not so handy you raid it for wants."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "budget6-mastery1",
            question: "How does an emergency fund prevent a debt spiral?",
            options: [
              "It pays surprises in cash, not on credit",
              "It quietly raises your available credit limit automatically",
              "It somehow makes all future emergencies stop happening",
              "It refunds all the interest you already paid"
            ],
            correctAnswer: 0,
            explanation: "By paying a surprise in cash, you avoid borrowing and the interest that follows. That breaks the chain where one repair leads to a card balance, then more debt."
          },
          {
            id: "budget6-mastery2",
            question: "How is an emergency fund different from a sinking fund?",
            options: [
              "A sinking fund is really only for rich millionaires",
              "An emergency fund guards surprises; sinking funds a plan",
              "They are honestly exactly the same kind of thing",
              "An emergency fund must always be invested in stocks"
            ],
            correctAnswer: 1,
            explanation: "An emergency fund sits untouched for unexpected costs, while a sinking fund saves toward a known, planned purchase. Mixing them leaves you unprotected when a real emergency hits."
          },
          {
            id: "budget6-mastery3",
            question: "Why is 'automatic' the key word when building the fund?",
            options: [
              "It moves money before you can spend it",
              "It somehow doubles the total amount you save",
              "It removes the need for you to earn income",
              "It quietly hides the money away from the bank"
            ],
            correctAnswer: 0,
            explanation: "An automatic transfer sends money to savings the moment you're paid, before spending can absorb it. That consistency, not the size of each contribution, gets the fund built."
          },
          {
            id: "budget6-mastery4",
            question: "Where should you keep an emergency fund?",
            options: [
              "In a risky stock for maximum growth",
              "In a separate, accessible savings account",
              "As loose cash in your bedroom",
              "Spent quickly so it doesn't tempt you"
            ],
            correctAnswer: 1,
            explanation: "A separate savings account is reachable in a day but not so handy you raid it for wants, and it stays safe. Risky investments could drop right when you need the money."
          },
          {
            id: "budget6-mastery5",
            question: "Why is a $300 fund you build better than a $3,000 goal you never start?",
            options: [
              "Because bigger goals earn no interest at all",
              "Because a real fund actually protects you",
              "Because $3,000 is against the rules for teens",
              "Because small funds grow faster on their own"
            ],
            correctAnswer: 1,
            explanation: "Protection comes from money that actually exists. A reachable $300 you truly save guards you, while a giant target you never begin protects you from nothing."
          },
          {
            id: "budget6-mastery6",
            question: "Ravi pays a $180 repair from his fund; his friend charges it to a card. What's the difference?",
            options: [
              "Ravi pays $180; his friend pays more with interest",
              "Both of them pay exactly the same total amount",
              "The friend's credit card magically erases the whole cost",
              "Ravi somehow ends up owing the repair shop later"
            ],
            correctAnswer: 0,
            explanation: "Ravi pays only the $180 in cash, while his friend adds interest on the card - ending near $215. The fund turned a crisis into a minor, cheaper annoyance."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // budget-7: Lifestyle Inflation
  // ─────────────────────────────────────────────
  {
    lessonId: "budget-7",
    sections: [
      {
        type: "concept",
        title: "What Lifestyle Inflation Is",
        paragraphs: [
          "Lifestyle inflation is the habit of spending more every time you earn more, so your savings never actually grow. You get a raise or a better job, and instead of saving the extra, you 'upgrade' - a nicer phone, pricier food, more subscriptions. It feels natural and even deserved, but the trap is that your expenses rise to swallow your income no matter how much you make. This is why plenty of people earning $100,000 still live paycheck to paycheck: their lifestyle inflated right alongside their pay, leaving nothing extra.",
          "The math is sneaky. Suppose you earn $200 a month and save $40. Then your income jumps to $300 - a big raise. If you save the same $40 and let the extra $100 flow to fun, your saving rate actually falls from 20% to 13%. You earn more but save a smaller share. True progress means saving at least part of every raise, so your saving grows as fast as your income. Lifestyle inflation is dangerous precisely because it hides: you feel richer while your financial position quietly stays the same or gets worse.",
          "Lifestyle inflation is driven by adaptation - humans get used to whatever they have shockingly fast. The exciting new phone becomes normal in a month, so you crave the next upgrade. This 'hedonic treadmill' means more spending rarely brings lasting happiness; you just reset to wanting more. Recognizing this pattern is powerful, because it lets you step off the treadmill on purpose. The goal isn't to never enjoy nicer things - it's to make sure your spending upgrades are chosen deliberately, not swept along automatically every time a bit more money shows up."
        ],
        bullets: [
          "Lifestyle inflation is spending more each time you earn more.",
          "It makes expenses rise to swallow income, so savings never grow.",
          "Keeping the same dollar saving after a raise lowers your saving rate.",
          "Adaptation makes new upgrades feel normal fast - the 'hedonic treadmill.'",
          "The fix is choosing upgrades deliberately, not automatically."
        ],
        realWorldExample: "Tara's babysitting pay rises from $200 to $320 a month. Instead of upgrading her spending, she keeps her old lifestyle and lifts her saving from $40 to $150. A friend with the same raise inflated his spending and still saves just $40 - earning far more but building nothing extra."
      },
      {
        type: "concept",
        title: "Beating the Trap",
        paragraphs: [
          "The single best defense against lifestyle inflation is the 'save the raise' rule: whenever your income goes up, direct a big chunk of the increase straight to saving before you get used to spending it. If your pay rises by $100, send $50 or more to savings automatically. You never miss money you never started spending. This one habit separates people who build wealth from people who stay stuck - because it lets your saving grow with your income instead of letting your lifestyle eat every gain the moment it arrives.",
          "Another tool is distinguishing upgrades that genuinely improve your life from ones that just look better. Some spending increases really are worth it - reliable transport to a better job, or healthier food. Others are pure inflation - a logo, a trend, a slightly newer model of something that already works. Before any upgrade, pause and ask: 'Will this still matter to me in a year, or is it the treadmill talking?' Deliberate upgrades chosen after that pause are fine. It's the automatic, unquestioned ones that quietly drain your future.",
          "Finally, watch your fixed costs as your income grows, because inflated lifestyles often hide in new recurring bills. A pricier phone plan, a bigger streaming bundle, a subscription box - each feels small but locks in higher spending forever. Every new fixed cost raises the floor you must clear every single month, making it harder to save and harder to weather a pay cut. Keeping your fixed costs lean even as you earn more is a quiet superpower: it keeps your options open and your savings rate high no matter what your income does."
        ],
        bullets: [
          "The 'save the raise' rule sends most of any income increase to saving.",
          "You never miss money you never started spending.",
          "Separate genuine life-improving upgrades from pure status inflation.",
          "Pause and ask if an upgrade will still matter in a year.",
          "Keep fixed costs lean as income grows to protect your saving rate."
        ],
        realWorldExample: "When Marco's pay rose by $120 a month, he automated $80 of it straight into savings and let $40 improve his daily life. A year later he'd saved almost $1,000 extra without ever feeling deprived, because he never got used to spending the $80 in the first place."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "budget7-mc1",
            question: "What is lifestyle inflation?",
            options: [
              "General prices rising across the whole entire economy",
              "Spending more each time you earn more",
              "An extra tax added whenever your income grows",
              "Saving a larger share after every raise"
            ],
            correctAnswer: 1,
            explanation: "Lifestyle inflation is upgrading your spending every time your income rises, so expenses swallow the raise and your savings never actually grow."
          },
          {
            id: "budget7-mc2",
            question: "What does the 'save the raise' rule tell you to do?",
            options: [
              "Spend the entire raise on brand-new upgrades right away",
              "Send a big chunk of any raise to saving",
              "Give the whole raise to a friend for safekeeping",
              "Refuse each and every raise just to avoid temptation"
            ],
            correctAnswer: 1,
            explanation: "The rule directs a large part of any income increase straight to saving before you adjust to spending it. You never miss money you never started spending."
          }
        ]
      },
      {
        type: "scenario",
        title: "Noah Gets a Raise",
        narrative: "Noah's part-time pay jumps from $250 to $370 a month - a $120 raise. He's excited and tempted to upgrade his phone plan, subscriptions, and eating out. He remembers learning about lifestyle inflation and wants to make sure this raise actually improves his future instead of vanishing.",
        details: [
          "If Noah inflates his lifestyle by $120, his savings stay flat despite earning more.",
          "Using 'save the raise,' he could automate $80 of the increase into savings.",
          "New recurring bills like a bigger plan would raise his fixed costs forever.",
          "Adaptation means the upgrades would feel normal within a month anyway."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "budget7-aq1",
          question: "Noah wants his $120 raise to build his future, not disappear. What's the smartest move?",
          options: [
            "Automate most of the raise into savings",
            "Upgrade his phone, plan, and subscriptions now",
            "Spend it fast before he gets used to it",
            "Add several new monthly bills right away"
          ],
          correctAnswer: 0,
          explanation: "Automating most of the raise into savings before adjusting his spending lets his savings grow with his income. Upgrading everything is lifestyle inflation that leaves savings flat."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Lifestyle inflation is spending more each time you earn more.",
          "It makes expenses swallow raises, so savings never actually grow.",
          "The 'save the raise' rule sends most of any increase to savings first.",
          "Adaptation makes upgrades feel normal fast - the hedonic treadmill.",
          "Keeping fixed costs lean as income rises protects your saving rate."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "budget7-mastery1",
            question: "Why do some high earners still live paycheck to paycheck?",
            options: [
              "Their lifestyle inflated right along with their pay",
              "Their income is secretly taxed at 100 percent",
              "They are somehow legally barred from ever saving",
              "Their banks flatly refuse to hold accounts for them"
            ],
            correctAnswer: 0,
            explanation: "As their pay rose, their spending rose to match, leaving nothing extra. Lifestyle inflation means expenses expand to swallow income no matter how much you earn."
          },
          {
            id: "budget7-mastery2",
            question: "You earn $200 and save $40. Income rises to $300 but you still save $40. What happened?",
            options: [
              "Your overall saving rate suddenly rose very sharply",
              "Your saving rate fell from 20% to 13%",
              "You suddenly now save exactly half of your income",
              "Your monthly income secretly went right back down"
            ],
            correctAnswer: 1,
            explanation: "Saving the same $40 out of $300 is only about 13%, down from 20% of $200. You earn more but save a smaller share - the quiet damage of lifestyle inflation."
          },
          {
            id: "budget7-mastery3",
            question: "What is the 'hedonic treadmill'?",
            options: [
              "A special machine that automatically tracks your spending",
              "Getting used to upgrades, then wanting more",
              "A trendy workout plan endorsed by expert budgeters",
              "A bank account that pays extra interest"
            ],
            correctAnswer: 1,
            explanation: "People adapt to whatever they have fast, so a new upgrade feels normal quickly and you crave the next one. That's why more spending rarely brings lasting happiness."
          },
          {
            id: "budget7-mastery4",
            question: "Why is keeping fixed costs lean as income grows a 'superpower'?",
            options: [
              "It somehow magically increases the size of your paycheck",
              "It keeps your saving rate high and options open",
              "It removes any need for you to earn income",
              "It somehow makes all future emergencies stop happening entirely"
            ],
            correctAnswer: 1,
            explanation: "Every new recurring bill raises the floor you must clear monthly. Keeping fixed costs low keeps saving easy and makes you resilient to a pay cut - real long-term flexibility."
          },
          {
            id: "budget7-mastery5",
            question: "What question helps you separate a good upgrade from pure inflation?",
            options: [
              "Is this really the single most expensive option available?",
              "Will this still matter to me in a year?",
              "Does some very popular online influencer own one too?",
              "Is it on sale for a limited time only?"
            ],
            correctAnswer: 1,
            explanation: "Pausing to ask whether an upgrade will still matter in a year filters out treadmill-driven wants. Deliberate upgrades are fine; automatic, unquestioned ones drain your future."
          },
          {
            id: "budget7-mastery6",
            question: "Marco saved $80 of his $120 raise automatically. Why did it feel painless?",
            options: [
              "Because the bank paid him a bonus for it",
              "Because he never started spending that $80",
              "Because his fixed costs disappeared",
              "Because he stopped enjoying anything at all"
            ],
            correctAnswer: 1,
            explanation: "You don't miss money you never began spending. By automating the $80 before adapting to it, Marco grew his savings nearly $1,000 in a year without feeling deprived."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // budget-8: Goal Budgeting
  // ─────────────────────────────────────────────
  {
    lessonId: "budget-8",
    sections: [
      {
        type: "concept",
        title: "Turning Goals Into Budget Lines",
        paragraphs: [
          "Goal budgeting means building your budget around what you actually want in life, not just paying bills. A goal is a specific thing you're saving toward - a $600 laptop, a $1,200 car, a $400 trip. The power move is turning each goal into a real line in your budget with a monthly amount. Vague hopes stay hopes; a budget line makes them happen. When 'someday I'll have a car' becomes '$50 a month toward a car,' your money starts flowing toward your dreams on purpose instead of scattering into random spending.",
          "Good goals are SMART: Specific, Measurable, Achievable, Relevant, and Time-bound. 'Save more' is weak - it's vague and has no finish line. 'Save $600 for a laptop in 12 months' is strong: you know the exact amount, can measure progress, and have a deadline that creates urgency. The deadline is what converts a goal into a monthly number: $600 over 12 months is $50 a month. Without a time frame, a goal drifts forever because there's no pressure to fund it this month rather than someday.",
          "Most people have several goals at once, which means you must prioritize. You can't fully fund everything, so you rank goals by importance and urgency, then split your saving among them. Maybe a car is your top goal getting $40 a month, while a trip gets $15. Some people focus everything on one goal to finish it fast, then move to the next; others fund several slowly in parallel. Both work - the key is deciding on purpose rather than letting whichever want feels loudest today grab all your money. A quick tip is to give your single most important goal the biggest share, so it finishes first and frees room for the rest to move faster afterward."
        ],
        bullets: [
          "Goal budgeting builds your budget around what you actually want.",
          "Turn each goal into a real budget line with a monthly dollar amount.",
          "SMART goals are Specific, Measurable, Achievable, Relevant, Time-bound.",
          "A deadline converts a goal into a monthly number ($600 in 12 months = $50).",
          "With several goals, prioritize and split your saving on purpose."
        ],
        realWorldExample: "Jade wants a $900 used scooter. She sets a SMART goal: save $900 in 15 months, which is $60 a month. She adds a '$60 scooter' line to her budget and automates it. Fifteen months later she buys the scooter in cash - because a vague wish became a concrete monthly number."
      },
      {
        type: "concept",
        title: "Short, Medium, and Long-Term Goals",
        paragraphs: [
          "Goals come in three time frames, and healthy budgets include a mix. Short-term goals take under a year - a $120 pair of headphones, a $200 phone. Medium-term goals take one to five years - a $2,000 car, a first apartment's deposit. Long-term goals take five-plus years - college, or even early investing for the future. Balancing all three matters because focusing only on short-term goals means the big life stuff never gets funded, while ignoring short-term goals makes budgeting feel joyless and easy to quit.",
          "The time frame changes where you keep the money. Short-term goal money should sit in safe, easy-to-reach savings, because you'll need it soon and can't risk it dropping. Long-term goal money can go somewhere with more growth potential, like investments, because time smooths out the ups and downs. Putting your $150 headphone savings in the stock market would be risky - it might fall right before you buy. But money you won't touch for a decade can afford to ride out market swings in exchange for higher expected growth.",
          "Motivation is the hidden battle in goal budgeting, especially for medium and long-term goals that take forever to reach. Tricks help: break a big goal into milestones and celebrate each 25% mark, use a visual tracker you fill in, or name the goal something exciting rather than 'savings account #2.' Seeing progress keeps you going when the finish line is far away. The people who reach big goals aren't more disciplined by nature - they've just set up systems that make the slow, boring middle of a goal feel like visible, steady progress."
        ],
        bullets: [
          "Short-term goals take under a year; medium, one to five; long, five-plus.",
          "Healthy budgets include a mix of all three time frames.",
          "Keep short-term goal money safe and easy to reach; you'll need it soon.",
          "Long-term money can chase growth, since time smooths out market swings.",
          "Use milestones and visual trackers to stay motivated on slow goals."
        ],
        realWorldExample: "Kofi keeps his $180 short-term concert savings in a plain savings account so it's safe for next month. His long-term college money goes into investments, since he won't touch it for years and can ride out the ups and downs for more growth."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "budget8-mc1",
            question: "What makes a goal 'SMART'?",
            options: [
              "It's expensive, trendy, and impressive",
              "It's Specific, Measurable, and Time-bound",
              "It's a secret you tell no one about",
              "It's vague enough to change anytime"
            ],
            correctAnswer: 1,
            explanation: "SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound. The deadline especially matters, because it converts a goal into a concrete monthly amount."
          },
          {
            id: "budget8-mc2",
            question: "Where should you keep money for a short-term goal?",
            options: [
              "In risky stocks for maximum growth",
              "In safe, easy-to-reach savings",
              "As cash hidden in a friend's house",
              "In a long-term retirement account"
            ],
            correctAnswer: 1,
            explanation: "Short-term goal money should stay safe and accessible because you'll need it soon and can't risk it dropping. Risky investments could fall right before you buy."
          }
        ]
      },
      {
        type: "scenario",
        title: "Amara Plans for Three Goals",
        narrative: "Amara earns $320 a month and has three goals: $150 headphones (soon), a $1,800 car (a couple years off), and college savings (years away). She can save $120 a month total. She wants to fund all three sensibly and keep the money in the right places for each time frame.",
        details: [
          "Her headphones are short-term, so that money belongs in safe, reachable savings.",
          "The car is medium-term; steady monthly saving builds toward it over a couple years.",
          "College is long-term, so that money can chase growth through investments.",
          "She splits her $120 across the goals on purpose instead of by whichever feels loudest."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "budget8-aq1",
          question: "Where should Amara keep her long-term college savings, versus her short-term headphone money?",
          options: [
            "Both belong in the exact same risky account",
            "College in growth investments; headphones in safe savings",
            "Both should sit as loose cash at home",
            "Headphones in stocks; college in a checking account"
          ],
          correctAnswer: 1,
          explanation: "Long-term money can ride out market swings for more growth, so college fits investments. Short-term money must stay safe and reachable, so headphones belong in plain savings."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Goal budgeting builds your budget around what you actually want.",
          "Turn each goal into a budget line with a monthly amount and a deadline.",
          "SMART goals are Specific, Measurable, Achievable, Relevant, Time-bound.",
          "Match where you keep money to the goal's time frame.",
          "Use milestones and trackers to stay motivated through slow goals."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "budget8-mastery1",
            question: "How do you turn a $600 laptop goal into a monthly budget number?",
            options: [
              "Divide the cost by your chosen deadline",
              "Wait for the price to drop to zero",
              "Multiply the total cost by a full twelve months",
              "Just guess some random amount to save each month"
            ],
            correctAnswer: 0,
            explanation: "A deadline converts a goal into a monthly amount: $600 over 12 months is $50 a month. Dividing cost by time frame gives you the concrete number to budget."
          },
          {
            id: "budget8-mastery2",
            question: "Why is 'save more' a weak goal?",
            options: [
              "It's too specific and detailed to follow",
              "It's vague with no amount or deadline",
              "It saves too much money too quickly",
              "It first requires a bank's official written approval"
            ],
            correctAnswer: 1,
            explanation: "'Save more' has no target and no finish line, so it drifts forever. A SMART goal like 'save $600 in 12 months' gives you a measurable amount and a deadline."
          },
          {
            id: "budget8-mastery3",
            question: "Why should long-term goal money be treated differently from short-term?",
            options: [
              "Long-term money can pursue growth over time",
              "Any long-term money must be spent almost immediately",
              "Short-term money should go into risky stocks",
              "There is no real difference between them"
            ],
            correctAnswer: 0,
            explanation: "Time lets long-term money ride out market swings for higher expected growth, so investments fit. Short-term money must stay safe and reachable because you'll need it soon."
          },
          {
            id: "budget8-mastery4",
            question: "You have several goals but can't fully fund all of them. What should you do?",
            options: [
              "Fund only whichever want feels loudest today",
              "Prioritize and split your saving on purpose",
              "Give up on every goal until you earn more",
              "Fund none of them until one becomes urgent"
            ],
            correctAnswer: 1,
            explanation: "Rank goals by importance and urgency, then divide your saving deliberately. Whether you focus on one or fund several slowly, the key is choosing on purpose."
          },
          {
            id: "budget8-mastery5",
            question: "Why include a mix of short, medium, and long-term goals?",
            options: [
              "So that the budget takes much longer to write",
              "So big life stuff and near-term wins both happen",
              "Because banks strictly require you have all three types",
              "So that you never actually reach a single goal"
            ],
            correctAnswer: 1,
            explanation: "Only short-term goals means big life stuff never gets funded; ignoring short-term goals makes budgeting joyless and easy to quit. A mix keeps you both funded and motivated."
          },
          {
            id: "budget8-mastery6",
            question: "What helps you stay motivated on a slow, long-term goal?",
            options: [
              "Ignoring your progress until the very end",
              "Breaking it into milestones you can celebrate",
              "Deleting the goal whenever it feels far",
              "Refusing to name or track the goal"
            ],
            correctAnswer: 1,
            explanation: "Milestones and visual trackers make the slow middle of a goal feel like steady, visible progress. Seeing that progress is what keeps you going when the finish line is far off."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // budget-9: Zero-Based Budgeting
  // ─────────────────────────────────────────────
  {
    lessonId: "budget-9",
    sections: [
      {
        type: "concept",
        title: "Every Dollar Gets a Job",
        paragraphs: [
          "Zero-based budgeting is a method where you assign every single dollar of income a job until you have zero left unassigned. 'Zero' doesn't mean you spend everything - saving is a job too. It means income minus all your assignments equals exactly zero, with no dollars floating around undirected. If you earn $300, you divide that whole $300 among spending, saving, and goals until nothing is left over. This forces total intentionality: no money slips through the cracks because you've consciously told each dollar where to go before the month begins.",
          "This differs from casual budgeting, where you cover the big stuff and let leftovers drift. In zero-based budgeting there are no leftovers by design - every dollar is claimed. That's the whole point: undirected money is the money that leaks away on impulse buys. Say after all your categories you have $23 unassigned. A casual budgeter lets it float and it vanishes; a zero-based budgeter immediately gives that $23 a job, like adding it to savings or a goal. Nothing is allowed to be homeless, so nothing gets wasted by accident.",
          "Zero-based budgeting is especially powerful because it makes you confront trade-offs directly. When every dollar must be assigned, adding money to one category forces you to pull it from another - you literally see the cost of each choice. Want $20 more for eating out? You must decide what gives it up. This clarity is uncomfortable at first but builds real discipline fast. It's why many people who felt out of control finally 'get' budgeting when they try the zero-based method: the plan leaves no fuzzy edges where money quietly disappears. Once you feel that every choice has a visible cost, spending on autopilot becomes much harder to do."
        ],
        bullets: [
          "Zero-based budgeting assigns every dollar a job until zero is unassigned.",
          "'Zero left' includes saving - it means nothing is undirected, not nothing saved.",
          "Undirected money is exactly what leaks away on impulse buys.",
          "Any leftover gets an immediate job, so nothing stays 'homeless.'",
          "It forces you to face trade-offs: adding to one category pulls from another."
        ],
        realWorldExample: "Ivan earns $280 and assigns it all: $90 food, $50 transport, $40 fun, $60 saving, $40 car goal - exactly $280, zero left. When he wants $20 more for a concert, he must pull it from his fun or food line. The method makes every trade-off visible instead of hidden."
      },
      {
        type: "concept",
        title: "How to Run a Zero-Based Budget",
        paragraphs: [
          "To build a zero-based budget, start with your total income for the period, then list every category - fixed costs, variable spending, saving, and goals - and assign dollars until the remaining balance hits exactly zero. Work from most important to least: cover needs first, then saving, then wants, then extras. If you run out of money before assigning everything, you've found real categories that must shrink. If you have money left, keep assigning - to savings or a goal - until zero. The finished budget accounts for 100% of your income.",
          "Zero-based budgeting works best when you redo it each period rather than copying last month blindly. Every month is a little different - a birthday, a school trip, a slow work week - so you rebuild from your actual expected income and needs. This is why some people pair it with 'irregular income' handling: if your pay varies, you budget only money you've actually received, assigning new income as it arrives. That keeps you from planning around money that never shows up, which is a common way casual budgets fall apart.",
          "The method has a downside worth knowing: it takes more effort than simpler approaches. Assigning every dollar and rebuilding monthly is more work than a loose 50/30/20 split. For some people that effort is worth it because the control is life-changing; for others it feels exhausting and they quit. A smart compromise is going zero-based on the categories that matter most while keeping flexible 'fun money' you don't micro-track. The best budget is the one you'll actually keep, so match the method's intensity to your own personality and patience."
        ],
        bullets: [
          "Build it by assigning income to categories until the balance is exactly zero.",
          "Work most-important first: needs, then saving, then wants, then extras.",
          "Rebuild each period instead of blindly copying last month.",
          "For irregular income, budget only money you've actually received.",
          "It takes more effort - match the method's intensity to your patience."
        ],
        realWorldExample: "Because Lucia's dog-walking income varies, she uses zero-based budgeting only on money already in her account. When $60 comes in, she immediately assigns all $60 a job. She never plans around income she hasn't earned yet, so a slow week never blows up her budget."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "budget9-mc1",
            question: "In zero-based budgeting, what does 'zero left' mean?",
            options: [
              "You have spent all of your money on wants",
              "Every dollar is assigned a job, including saving",
              "You are left with zero dollars of any income",
              "You ended up saving nothing at all this month"
            ],
            correctAnswer: 1,
            explanation: "'Zero left' means no dollar is unassigned - income minus all assignments equals zero. Saving counts as a job, so it doesn't mean you spent or saved nothing."
          },
          {
            id: "budget9-mc2",
            question: "How should you handle irregular (varying) income in zero-based budgeting?",
            options: [
              "Assume your best month every time",
              "Budget only money you've actually received",
              "Skip budgeting until income is steady",
              "Plan around income you hope to earn"
            ],
            correctAnswer: 1,
            explanation: "With irregular income, you assign only money already in hand, giving new income a job as it arrives. This keeps you from planning around money that never shows up."
          }
        ]
      },
      {
        type: "scenario",
        title: "Diego Tries the Zero-Based Method",
        narrative: "Diego earns $300 a month and always feels like some money mysteriously disappears. He decides to try zero-based budgeting, assigning every dollar a job. Partway through, he realizes he wants $25 more for a game but has already assigned all his income, forcing a decision.",
        details: [
          "Diego assigns all $300 across needs, saving, fun, and a goal - zero unassigned.",
          "The method leaves no floating money, which is where his cash used to leak.",
          "To add $25 for the game, he must pull it from another already-assigned category.",
          "This makes the trade-off visible: the game's real cost is whatever he gives up."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "budget9-aq1",
          question: "Diego has assigned all $300 but wants $25 more for a game. What must he do?",
          options: [
            "Pull the $25 from another assigned category",
            "Add $25 of income that doesn't exist",
            "Just leave the $25 unassigned and floating around",
            "Abandon the whole budget for the month"
          ],
          correctAnswer: 0,
          explanation: "In zero-based budgeting every dollar is already claimed, so new spending must come from another category. That's the point - the trade-off becomes visible, not hidden."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Zero-based budgeting assigns every dollar a job until zero is unassigned.",
          "'Zero left' includes saving - it means no money is undirected.",
          "It kills leakage by leaving no floating, homeless dollars.",
          "It forces you to face trade-offs, since adding to one category pulls from another.",
          "It takes more effort, so match the method's intensity to your patience."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "budget9-mastery1",
            question: "How is zero-based budgeting different from casual budgeting?",
            options: [
              "It ignores your needs and funds only your wants",
              "Every dollar is assigned, so nothing floats free",
              "It requires you to spend all your income",
              "It strictly forbids you from saving any money"
            ],
            correctAnswer: 1,
            explanation: "Casual budgeting lets leftovers drift and vanish; zero-based budgeting claims every dollar, including savings. Undirected money is exactly what leaks away, so none is allowed."
          },
          {
            id: "budget9-mastery2",
            question: "You finish assigning categories and have $23 left. What does zero-based budgeting say to do?",
            options: [
              "Leave it floating for spontaneous buys",
              "Give it an immediate job, like savings",
              "Return the leftover $23 back to your employer",
              "Ignore it since it's a small amount"
            ],
            correctAnswer: 1,
            explanation: "No dollar stays homeless. That $23 gets assigned right away - to savings or a goal - so it doesn't leak away on an impulse buy later in the month."
          },
          {
            id: "budget9-mastery3",
            question: "Why does zero-based budgeting build discipline so effectively?",
            options: [
              "It hides all trade-offs from your view",
              "Adding to one category forces cutting another",
              "It removes the need to make any choices",
              "It somehow automatically increases your monthly income"
            ],
            correctAnswer: 1,
            explanation: "Because every dollar is assigned, funding one thing means pulling from another, making the cost of each choice visible. That clarity builds real discipline fast."
          },
          {
            id: "budget9-mastery4",
            question: "Why rebuild a zero-based budget each period instead of copying last month?",
            options: [
              "Because the numbers are illegal to reuse",
              "Because each month's income and needs differ",
              "Because copying it somehow doubles your income",
              "Because otherwise it quietly deletes all your savings"
            ],
            correctAnswer: 1,
            explanation: "Every month varies - a birthday, a slow work week - so you rebuild from actual expected income and needs. Blindly copying can leave the plan out of sync with reality."
          },
          {
            id: "budget9-mastery5",
            question: "What is the main downside of zero-based budgeting?",
            options: [
              "It takes more effort than simpler methods",
              "It is against the law in most states",
              "It always leaves money unaccounted for",
              "It forbids you from spending on needs"
            ],
            correctAnswer: 0,
            explanation: "Assigning every dollar and rebuilding monthly is more work than a loose split. The control can be worth it, but the best budget is one you'll actually keep."
          },
          {
            id: "budget9-mastery6",
            question: "Lucia's income varies. How does she apply zero-based budgeting?",
            options: [
              "She budgets her highest-ever month each time",
              "She assigns only money already in her account",
              "She simply stops budgeting until her pay is steady",
              "She guesses next month's income and spends it"
            ],
            correctAnswer: 1,
            explanation: "With irregular income, Lucia gives a job only to money she's actually received. That way a slow week never blows up a plan built on income that never arrived."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // budget-10: Digital Budget Tools
  // ─────────────────────────────────────────────
  {
    lessonId: "budget-10",
    sections: [
      {
        type: "concept",
        title: "What Budgeting Tools Do",
        paragraphs: [
          "Digital budgeting tools are apps and software that help you track spending and plan your money automatically. Many link to your bank account and card, then sort each purchase into categories for you - so instead of writing down every $4 coffee by hand, the app captures it instantly. Popular tools range from full budgeting apps to simple spreadsheets you build yourself. Their core value is removing friction: the easier tracking is, the more likely you'll actually do it. A tool that logs spending automatically turns budgeting from a tedious chore into something that mostly runs itself.",
          "The biggest advantage of these tools is automation and instant feedback. A good app can show you, in real time, that you've spent $85 of your $100 food budget with a week left - a warning you'd never get from a paper notebook. Some send alerts when you're close to a limit, or when a bill is due, preventing overdrafts and missed payments. Seeing your categories update live keeps spending front-of-mind, which naturally curbs overspending. The tool becomes a dashboard for your money, giving you the kind of clear picture that used to require hours of manual math.",
          "But tools have real limits, and the biggest mistake is thinking an app will budget for you. An app can track and categorize, but it can't decide your priorities, set your goals, or stop you from overspending - those are human jobs. People sometimes download a fancy app, feel productive, and change nothing because they never actually look at it or act on it. A tool is a helper, not a magic fix. The best results come from combining a tool's automatic tracking with your own weekly review and real decisions about where your money should go."
        ],
        bullets: [
          "Budgeting tools track spending and sort purchases into categories for you.",
          "Many link to your bank and card, capturing purchases instantly.",
          "Their core value is removing friction so you actually keep tracking.",
          "Automation gives instant feedback and alerts that curb overspending.",
          "A tool can't set priorities or stop overspending - those are human jobs."
        ],
        realWorldExample: "Zoe used to forget half her purchases with pen and paper. She switches to an app that auto-categorizes her spending, and it alerts her when she hits $90 of her $100 fun budget. That live warning stops her from overspending - something a notebook never did for her."
      },
      {
        type: "concept",
        title: "Choosing and Using Tools Safely",
        paragraphs: [
          "Not every tool fits every person, so match the tool to your style. If you like automation and have a bank account, a linked app saves time. If you prefer control and understanding every number, a simple spreadsheet you build teaches you more. Some people love detailed apps with charts; others get overwhelmed and quit, doing better with a basic notes app. Watch out for cost too - some apps charge monthly fees that ironically hurt your budget. A free tool you use beats a paid one you abandon, so start simple and upgrade only if you truly need more.",
          "Security matters a lot when a tool connects to your money. Linking an app to your bank means sharing sensitive data, so use only reputable, well-reviewed tools and protect your accounts with strong, unique passwords and two-factor authentication. Never share login details, and be cautious of any app that seems sketchy or asks for more access than it needs. If a tool is free, understand how it makes money - some sell anonymized data or push financial products. Being a careful, informed user keeps the convenience of digital tools from turning into a privacy or security risk.",
          "The most important habit is actually using the tool consistently, not just installing it. Set a routine: a quick daily glance and a five-minute weekly review where you check categories and adjust. The tool provides data, but you provide the decisions - what to cut, where to move money, whether you're on track for goals. Over time, the combination of automatic tracking plus your regular review makes budgeting nearly effortless and remarkably accurate. Remember the golden rule of tools: they amplify good habits, but they can't create habits you don't build yourself."
        ],
        bullets: [
          "Match the tool to your style - apps for automation, spreadsheets for control.",
          "A free tool you use beats a paid one you abandon; start simple.",
          "Protect linked accounts with strong passwords and two-factor authentication.",
          "If a tool is free, understand how it makes money from you.",
          "Tools amplify good habits but can't create habits you don't build."
        ],
        realWorldExample: "Ben picks a free budgeting app, sets a strong password with two-factor login, and does a five-minute review every Sunday. His friend downloaded three fancy paid apps but never opens them - so despite paying more, the friend's spending is still a mystery while Ben's is fully under control."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "budget10-mc1",
            question: "What is the biggest mistake people make with budgeting apps?",
            options: [
              "Thinking the app will budget for them",
              "Checking their spending categories far too often",
              "Setting a strong password on the app",
              "Carefully reviewing their spending every single week"
            ],
            correctAnswer: 0,
            explanation: "An app can track and categorize, but it can't set your priorities or stop overspending - those are human jobs. Installing an app and never acting on it changes nothing."
          },
          {
            id: "budget10-mc2",
            question: "How should you protect an app that links to your bank?",
            options: [
              "Share your password with close friends",
              "Use strong passwords and two-factor login",
              "Pick the least-reviewed app available",
              "Give it access to everything it asks"
            ],
            correctAnswer: 1,
            explanation: "Linking to your money means sharing sensitive data, so use reputable tools with strong, unique passwords and two-factor authentication - and never share login details."
          }
        ]
      },
      {
        type: "scenario",
        title: "Priya Picks a Budgeting Tool",
        narrative: "Priya wants to start budgeting and is comparing options. She's tempted by a flashy paid app with lots of charts, but she also sees a free app and a simple spreadsheet. She wants a tool she'll actually stick with, and she's aware her accounts need to stay secure.",
        details: [
          "The flashy paid app charges a monthly fee that would eat into her budget.",
          "A free tool she actually uses would beat a paid one she abandons.",
          "Whatever she links to her bank needs a strong password and two-factor login.",
          "The tool can track for her, but she still has to review and make decisions."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "budget10-aq1",
          question: "Priya wants a tool she'll stick with and can afford. What's the smartest starting choice?",
          options: [
            "The priciest app with the most features",
            "A free tool she'll actually use consistently",
            "Three apps at once to compare them all",
            "No tool, tracking everything from memory"
          ],
          correctAnswer: 1,
          explanation: "A free tool she uses consistently beats a paid one she abandons. The best tool is the one you'll keep using; you can upgrade later only if you truly need more."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Budgeting tools track spending and categorize purchases, often automatically.",
          "Their core value is removing friction and giving instant feedback.",
          "A tool can't set priorities or stop overspending - those are human jobs.",
          "Match the tool to your style, and a free one you use beats a paid one you abandon.",
          "Protect linked accounts and actually review the data to make decisions."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "budget10-mastery1",
            question: "What is the core value of a digital budgeting tool?",
            options: [
              "It removes friction so you keep tracking",
              "It somehow guarantees you will never overspend again",
              "It replaces the need for any income",
              "It somehow makes all of your bills disappear"
            ],
            correctAnswer: 0,
            explanation: "The easier tracking is, the more likely you'll do it. Tools remove friction by capturing and sorting purchases automatically, turning a chore into something that runs itself."
          },
          {
            id: "budget10-mastery2",
            question: "Why can't an app truly 'budget for you'?",
            options: [
              "Because apps can't do any math at all",
              "Because setting priorities is a human job",
              "Because budgeting apps are basically always broken",
              "Because banks quietly block all budgeting apps"
            ],
            correctAnswer: 1,
            explanation: "An app tracks and categorizes, but deciding priorities, setting goals, and choosing not to overspend are human jobs. The tool is a helper, not a magic fix."
          },
          {
            id: "budget10-mastery3",
            question: "Why might a simple spreadsheet be better than a fancy app for some people?",
            options: [
              "It teaches you more by handling every number",
              "It conveniently links straight to your bank account",
              "It is always far more expensive than apps",
              "It stops you from ever making your own decisions"
            ],
            correctAnswer: 0,
            explanation: "Building a spreadsheet means touching every number yourself, which teaches you more and gives full control. Match the tool to your style - automation or hands-on understanding."
          },
          {
            id: "budget10-mastery4",
            question: "If a budgeting tool is free, what should you understand?",
            options: [
              "That it must be broken or fake",
              "How it actually makes its money",
              "That it will pay you to use it",
              "That it can't track anything real"
            ],
            correctAnswer: 1,
            explanation: "Free tools earn money somehow - sometimes by selling anonymized data or pushing products. Knowing how a tool profits helps you use it as a careful, informed user."
          },
          {
            id: "budget10-mastery5",
            question: "What habit makes a budgeting tool actually work?",
            options: [
              "Installing it and never opening it again",
              "Reviewing the data and making decisions",
              "Downloading as many apps as possible",
              "Letting alerts pile up without reading them"
            ],
            correctAnswer: 1,
            explanation: "Tools provide data, but you provide the decisions. A quick daily glance plus a weekly review where you adjust is what turns tracking into real progress."
          },
          {
            id: "budget10-mastery6",
            question: "Ben uses one free app well; his friend bought three apps but never opens them. What's the lesson?",
            options: [
              "Paying more for apps always improves your budget",
              "A tool you use beats fancier ignored ones",
              "You should really always own several different apps",
              "Free tools honestly can never track your spending"
            ],
            correctAnswer: 1,
            explanation: "Tools amplify good habits but can't create them. Ben's consistent use of one free app beats his friend's unused paid ones - the habit matters far more than the price."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // budget-11: Smart Buying: Evaluating Big Purchases
  // ─────────────────────────────────────────────
  {
    lessonId: "budget-11",
    sections: [
      {
        type: "concept",
        title: "Total Cost of Ownership",
        paragraphs: [
          "When you buy something big, the sticker price is only part of the story. The real number to compare is the total cost of ownership - everything the item will cost you over its whole life, not just the day you buy it. A $300 gaming console might also need $60-a-year online subscriptions, $70 games, and controllers that break. A cheap $200 printer can cost more than a $350 one if its ink is wildly expensive. Smart buyers add up the full lifetime cost before deciding, because the upfront price often hides the biggest expenses.",
          "Durability is a huge part of total cost. A well-made item that costs more upfront but lasts five years can be far cheaper than a flimsy one you replace yearly. This is the 'buy it once' idea: paying $80 for boots that last five years beats paying $30 for boots that die every year (that's $150 over five years for the cheap ones). But it's not automatic - sometimes the expensive version isn't actually more durable, just more expensive. The skill is judging real durability through reviews and materials, not just assuming pricier means longer-lasting.",
          "Ongoing and hidden costs sneak up on people constantly. Subscriptions, batteries, repairs, insurance, accessories, and even the electricity or data a device uses all add to the true price. A 'free' phone can lock you into a two-year plan that costs hundreds. Before a big purchase, list every ongoing cost you can think of and add it to the upfront price for a fair comparison. Doing this turns a confusing choice into simple math: the option with the lowest total cost of ownership for the quality you need is usually the smart pick."
        ],
        bullets: [
          "Total cost of ownership is everything an item costs over its whole life.",
          "The sticker price often hides bigger costs like subscriptions and refills.",
          "Durability matters: 'buy it once' can beat replacing a cheap item yearly.",
          "Pricier doesn't automatically mean more durable - check reviews and materials.",
          "List every ongoing cost and add it to the upfront price for a fair comparison."
        ],
        realWorldExample: "A $200 printer looks cheaper than a $350 model, but its ink cartridges cost $45 each and run dry fast - about $270 a year. The $350 printer uses $90 of ink a year. Over two years, the 'cheap' printer costs $740 total while the pricier one costs $530. Total cost flips the winner."
      },
      {
        type: "concept",
        title: "Needs, Features, and Avoiding Regret",
        paragraphs: [
          "Before buying anything big, separate the features you actually need from the ones that just sound cool. Companies love selling you capability you'll never use - a laptop with pro-video power when you only browse and type, or a phone with specs you can't tell apart. Each extra feature adds cost. The smart move is to define what you truly need first, then buy the item that meets those needs well without paying for extras. Overbuying wastes money; underbuying means replacing the item soon. Matching features to real needs hits the sweet spot.",
          "Research is your best defense against a bad big purchase. Read multiple reviews, compare at least three options, and look for patterns - if many reviewers mention the same flaw, believe them. Check the return policy and warranty, since even good products sometimes fail. A little research time pays off enormously: an hour of reading can save you hundreds on a purchase you'll live with for years. Beware relying on a single glowing review or an influencer paid to promote something; independent, varied sources give you a far more honest picture.",
          "Finally, guard against impulse and pressure on big buys. 'Limited time' deals and 'only two left' warnings are designed to rush you past careful thinking. A powerful tool is the waiting rule: for any large purchase, wait 24 to 48 hours before buying. If you still want it and it still fits your budget and needs, buy with confidence. Often the urgency fades and you realize you didn't really need it. Big purchases deserve slow decisions, because the cost of a rushed mistake - money wasted and possibly financed with interest - is simply too high."
        ],
        bullets: [
          "Separate features you truly need from ones that just sound impressive.",
          "Overbuying wastes money; underbuying means replacing it soon.",
          "Research: compare at least three options and look for repeated complaints.",
          "Check return policy and warranty before buying a big-ticket item.",
          "Use a 24-to-48-hour waiting rule to beat impulse and pressure tactics."
        ],
        realWorldExample: "Leah almost bought a $1,200 laptop for its pro-video features, pressured by a 'today only' sale. She waited 48 hours, realized she only browses and writes essays, and bought a solid $550 model instead. The waiting rule and matching features to real needs saved her $650."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "budget11-mc1",
            question: "What does 'total cost of ownership' include?",
            options: [
              "Just the plain sticker price you pay upfront",
              "Everything the item costs over its whole life",
              "Only the sales tax that is added at checkout",
              "Only the cost of repairs, not the price"
            ],
            correctAnswer: 1,
            explanation: "Total cost of ownership is the full lifetime cost - upfront price plus subscriptions, refills, repairs, and accessories. The sticker price often hides the biggest expenses."
          },
          {
            id: "budget11-mc2",
            question: "What is the 'waiting rule' for big purchases?",
            options: [
              "Buy instantly before the deal expires",
              "Wait 24 to 48 hours before deciding",
              "Wait until the item is completely sold out",
              "Buy only if an influencer recommends it"
            ],
            correctAnswer: 1,
            explanation: "Waiting 24 to 48 hours defeats impulse and pressure tactics. If you still want it and it fits your budget and needs afterward, you can buy with confidence."
          }
        ]
      },
      {
        type: "scenario",
        title: "Marcus Compares Two Laptops",
        narrative: "Marcus needs a laptop for schoolwork - browsing, essays, and video calls. He's torn between a $1,100 model with powerful video-editing features and a $600 model that easily handles his actual tasks. A 'today only' banner is pushing him to buy the expensive one right now.",
        details: [
          "Marcus's real needs are basic: browsing, writing, and calls - not video editing.",
          "The $1,100 model's extra power is a feature he'd pay for but never use.",
          "The 'today only' banner is a pressure tactic designed to rush his decision.",
          "A 24-to-48-hour wait would let him decide calmly instead of under pressure."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "budget11-aq1",
          question: "Marcus only needs a laptop for browsing and essays. What's the smartest choice?",
          options: [
            "Go grab the $1,100 model before the deal ends",
            "Buy the $600 model that meets his real needs",
            "Purchase both of the laptops to compare them home",
            "Buy the priciest one since it must be best"
          ],
          correctAnswer: 1,
          explanation: "Matching features to real needs saves money. The $600 model handles his actual tasks well, so paying $500 more for video power he'll never use is wasted - and the deal pressure is a trap."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Compare total cost of ownership, not just the sticker price.",
          "Durability and the 'buy it once' idea can make a pricier item cheaper long-term.",
          "Match features to your real needs; don't pay for capability you won't use.",
          "Research by comparing options and checking warranties and return policies.",
          "Use a 24-to-48-hour waiting rule to beat impulse and pressure tactics."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "budget11-mastery1",
            question: "Why can a $200 printer end up costing more than a $350 one?",
            options: [
              "Its ink and refills cost far more over time",
              "Cheaper printers are always taxed at much higher rates",
              "Stores secretly add hidden fees only to cheap items",
              "The pricier $350 printer is always returned for free"
            ],
            correctAnswer: 0,
            explanation: "Total cost of ownership includes ongoing costs like ink. If the cheap printer's cartridges are expensive, its lifetime cost can exceed the pricier model with cheaper refills."
          },
          {
            id: "budget11-mastery2",
            question: "What is the 'buy it once' idea about durability?",
            options: [
              "Always simply choose the single cheapest option that is available",
              "A durable item can beat replacing cheap ones yearly",
              "You should really only ever own one of anything",
              "More expensive items will always last the very longest"
            ],
            correctAnswer: 1,
            explanation: "Paying more for something that lasts years can beat repeatedly replacing a flimsy cheap version. But pricier isn't automatically more durable - you still check reviews and materials."
          },
          {
            id: "budget11-mastery3",
            question: "Why should you match features to your real needs?",
            options: [
              "Because all the extra features are always free",
              "Because overbuying wastes money on unused capability",
              "Because having fewer features somehow costs more money",
              "Because your real needs never affect the price"
            ],
            correctAnswer: 1,
            explanation: "Each extra feature adds cost, so paying for capability you'll never use wastes money. Defining real needs first lets you buy the right item without over- or underbuying."
          },
          {
            id: "budget11-mastery4",
            question: "What's the best way to research a big purchase?",
            options: [
              "Trust a single glowing review completely",
              "Compare options and look for repeated complaints",
              "Buy whatever an influencer is paid to promote",
              "Skip research to save yourself some time"
            ],
            correctAnswer: 1,
            explanation: "Comparing at least three options and spotting patterns of complaints gives an honest picture. A single review or a paid influencer can mislead you on an expensive, long-term buy."
          },
          {
            id: "budget11-mastery5",
            question: "Why do stores use 'only two left' and 'today only' messages?",
            options: [
              "To rush you past careful thinking",
              "To help you save the most money",
              "To slow your decision down on purpose",
              "Because the law requires those warnings"
            ],
            correctAnswer: 0,
            explanation: "Urgency tactics are designed to push you into buying before you think it through. The waiting rule counters them: if the urgency fades, you probably didn't need it."
          },
          {
            id: "budget11-mastery6",
            question: "Leah waited 48 hours and bought a $550 laptop instead of a $1,200 one. What did the wait do?",
            options: [
              "It somehow forced her to go buy the pricier model",
              "It let her match the buy to her real needs",
              "It somehow made both laptops end up costing the same",
              "It completely removed her whole ability to buy anything new"
            ],
            correctAnswer: 1,
            explanation: "Waiting let the sale pressure fade and gave her time to realize she only browses and writes. Matching features to needs plus the waiting rule saved her $650."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // budget-12: The Psychology of Pricing
  // ─────────────────────────────────────────────
  {
    lessonId: "budget-12",
    sections: [
      {
        type: "concept",
        title: "Pricing Tricks That Fool Your Brain",
        paragraphs: [
          "Stores design prices to make you spend more, using tricks based on how your brain works. The most common is 'charm pricing': $9.99 instead of $10. Your brain anchors on the first digit, so $9.99 feels much closer to $9 than to $10, even though it's basically $10. This tiny trick reliably boosts sales. Once you know it, you can mentally round up: treat $9.99 as $10 and $19.95 as $20. Seeing the real price instead of the illusion helps you judge whether something is actually worth it.",
          "Another powerful trick is 'anchoring.' Stores show a high 'original' price crossed out next to a lower 'sale' price, so the deal feels huge - even if the item was never really sold at the high price. The high number becomes an anchor that makes the lower one look like a steal. The same trick appears in menus with one absurdly expensive item that makes everything else seem reasonable. Your brain judges prices by comparison, not absolute value, so sellers plant a reference point that makes their target price look attractive.",
          "The 'decoy effect' is sneakier still. A store offers a small popcorn for $4 and a large for $7, and you'd pick small. Then they add a medium for $6.50 - now the large looks like a bargain and you 'upgrade,' spending $7 you weren't going to. The medium exists only to push you toward the large; it's a decoy. Bundles work similarly, making you buy more than you need because the per-item price looks lower. Spotting these setups lets you ask the real question: do I actually want this, or am I being steered?"
        ],
        bullets: [
          "Charm pricing ($9.99) anchors your brain on the first digit - round up mentally.",
          "Anchoring shows a high 'original' price to make the sale price feel huge.",
          "Your brain judges prices by comparison, not absolute value.",
          "The decoy effect adds a middle option to push you toward a pricier one.",
          "Bundles make you buy more than you need with a low-looking per-item price."
        ],
        realWorldExample: "A theater sells small popcorn for $4 and large for $7; most pick small. It adds a $6.50 medium, and suddenly buyers 'upgrade' to the $7 large - it feels like a deal next to the pointless medium. Sales of the large jump, purely because a decoy reframed the choice."
      },
      {
        type: "concept",
        title: "Emotional and Environmental Nudges",
        paragraphs: [
          "Beyond number tricks, stores shape the whole environment to loosen your wallet. Scarcity messages ('only 3 left!', 'sale ends tonight') trigger fear of missing out, pushing you to buy fast before you think. Free-shipping thresholds ('spend $50 for free shipping') make you add items you didn't want to 'save' $6 on shipping - spending more to save less. Loyalty points and 'members save' pricing make you feel you're winning even as you spend. None of these are illegal, but all are engineered to nudge you toward buying more than you planned.",
          "Payment methods change how much you spend, too. Studies show people spend more with cards and one-tap payments than with cash, because handing over physical money 'hurts' more than a tap. 'Buy now, pay later' services split a purchase into small installments that feel painless, but they can lead you to buy things you can't really afford, sometimes with fees if you're late. The easier and more painless paying feels, the more your brain disconnects from the real cost. Awareness of this 'pain of paying' effect helps you stay grounded in what you're actually spending.",
          "The best defense is a set of simple habits that put your rational brain back in charge. Make a list before shopping and stick to it. Calculate the real per-unit or per-month cost instead of trusting the display. Pause when you feel urgency - that feeling is often manufactured. Ask 'would I buy this at full price, with no deal?' If the only reason you want something is the discount or the fear of missing out, that's the trick working. You can enjoy real deals while refusing to be manipulated into buying things you never needed."
        ],
        bullets: [
          "Scarcity messages trigger fear of missing out to rush your decision.",
          "Free-shipping thresholds make you spend more to 'save' a little.",
          "People spend more with cards and one-tap payments than with cash.",
          "'Buy now, pay later' makes purchases feel painless but can cause overspending.",
          "Defenses: shop with a list, compute real cost, and pause on urgency."
        ],
        realWorldExample: "Sara's cart totals $44, but the site offers free shipping over $50. To 'save' the $6 shipping, she adds a $12 item she didn't want - spending $12 to save $6. The threshold worked exactly as designed, making her spend more while feeling like she got a deal."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "budget12-mc1",
            question: "Why does '$9.99' make you more likely to buy than '$10'?",
            options: [
              "It is actually a legally required lower price",
              "Your brain anchors on the first digit",
              "It somehow always includes completely free shipping",
              "It costs the store far less to make"
            ],
            correctAnswer: 1,
            explanation: "This is charm pricing: your brain anchors on the first digit, so $9.99 feels close to $9 rather than $10. Rounding up mentally shows the real price."
          },
          {
            id: "budget12-mc2",
            question: "What is the 'decoy effect'?",
            options: [
              "A middle option that steers you toward pricier picks",
              "A special discount that applies only to store members",
              "Any price that happens to end in ninety-nine cents",
              "A small free item added onto every single purchase"
            ],
            correctAnswer: 0,
            explanation: "A decoy is a deliberately unappealing middle option that makes a pricier choice look like a bargain, steering you to spend more than you planned - like the $6.50 popcorn trick."
          }
        ]
      },
      {
        type: "scenario",
        title: "Jordan's Cart at Checkout",
        narrative: "Jordan is buying a $44 hoodie online. At checkout, the site flashes 'Free shipping on orders over $50!' and 'Only 2 left in stock!' He feels an urge to add more to hit free shipping and to buy fast before it's gone. He pauses to think about what's really happening.",
        details: [
          "The free-shipping threshold tempts him to add items to 'save' the shipping fee.",
          "Adding a $10 item to save $6 shipping means spending more to save less.",
          "'Only 2 left' is a scarcity message designed to rush his decision.",
          "A pause and a quick real-cost check put his rational brain back in charge."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "budget12-aq1",
          question: "Jordan wants the $44 hoodie but is tempted to add items for free shipping. What's the smart move?",
          options: [
            "Add a $10 item to save the $6 shipping",
            "Buy just the hoodie and skip the extras",
            "Add two items so shipping feels worth it",
            "Buy fast before the 'only 2 left' runs out"
          ],
          correctAnswer: 1,
          explanation: "Adding a $10 item to save $6 shipping means spending more to save less. Buying only what he came for beats the threshold trick, and the scarcity message is manufactured urgency."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Charm pricing ($9.99) anchors your brain on the first digit - round up.",
          "Anchoring and decoys make target prices look like great deals by comparison.",
          "Scarcity and free-shipping thresholds nudge you to buy more than planned.",
          "Cards and 'buy now, pay later' reduce the 'pain of paying,' so you spend more.",
          "Defend yourself: shop with a list, compute real cost, and pause on urgency."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "budget12-mastery1",
            question: "How does 'anchoring' with a crossed-out price work?",
            options: [
              "The high number makes the sale price feel amazing",
              "It somehow lowers the tax you pay at checkout",
              "It magically guarantees the item was truly cheaper before",
              "It forces the store to honor the low price"
            ],
            correctAnswer: 0,
            explanation: "The high 'original' price becomes an anchor, so the lower price feels huge by comparison - even if the item was never really sold at the high price. Your brain judges by comparison."
          },
          {
            id: "budget12-mastery2",
            question: "Why do people tend to spend more with cards than with cash?",
            options: [
              "Paying with cards charges a lower total price",
              "Handing over cash 'hurts' more than a tap",
              "Cash purchases secretly include extra hidden fees",
              "Most stores flatly refuse to give change in cash"
            ],
            correctAnswer: 1,
            explanation: "The 'pain of paying' is real: physical cash leaving your hand feels worse than a painless tap, so tapping disconnects your brain from the real cost and you spend more."
          },
          {
            id: "budget12-mastery3",
            question: "What's the risk of 'buy now, pay later' services?",
            options: [
              "They always refund your entire purchase",
              "Painless installments can lead to overspending",
              "They make items cost far less overall",
              "They are only available to adults over 40"
            ],
            correctAnswer: 1,
            explanation: "Splitting a purchase into small, painless installments makes it feel affordable, which can push you to buy things you can't really afford - sometimes with late fees on top."
          },
          {
            id: "budget12-mastery4",
            question: "A free-shipping threshold makes Sara add a $12 item to save $6 shipping. What happened?",
            options: [
              "She saved money overall by hitting the threshold",
              "She spent more to 'save' less",
              "The store lost money on her order",
              "Her shipping became more expensive"
            ],
            correctAnswer: 1,
            explanation: "Adding $12 to avoid a $6 fee means spending a net $6 more. Free-shipping thresholds are designed to make you buy extra while feeling like you got a deal."
          },
          {
            id: "budget12-mastery5",
            question: "Which question best defends against pricing tricks?",
            options: [
              "Exactly how many are left in stock right now?",
              "Would I buy this at full price, no deal?",
              "Does this listed sale price end in ninety-nine cents?",
              "Is some paid online influencer currently promoting this item?"
            ],
            correctAnswer: 1,
            explanation: "If the only reason you want something is the discount or fear of missing out, the trick is working. Asking whether you'd buy it at full price reveals your real desire for it."
          },
          {
            id: "budget12-mastery6",
            question: "You see an item priced at $19.95. What's the smart mental move?",
            options: [
              "Treat it as roughly $20, not $19",
              "Just round it down to about $18 instead",
              "Assume that it is a legally capped price",
              "Buy it because the digits look small"
            ],
            correctAnswer: 0,
            explanation: "Charm pricing tempts you to anchor on the '19.' Rounding up to $20 shows the real price so you can judge whether it's actually worth it, free of the illusion."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // budget-13: Giving Back: Charitable Donations & Nonprofits
  // ─────────────────────────────────────────────
  {
    lessonId: "budget-13",
    sections: [
      {
        type: "concept",
        title: "How Charitable Giving and Nonprofits Work",
        paragraphs: [
          "A nonprofit is an organization that exists to serve a cause - feeding people, protecting animals, funding research - rather than to earn profit for owners. It still handles money, pays staff, and covers costs, but any surplus goes back into its mission instead of to shareholders. When you donate, your money funds that mission. Giving can be part of a healthy budget: many people add a 'giving' line, deciding in advance how much to share. Even small amounts matter - $5 a month is $60 a year that can do real good when pooled with others.",
          "Not all giving is money. You can donate time by volunteering, donate goods like clothes or food, or donate skills. For teens especially, time is often more valuable to give than cash, and it builds experience and connections. When you do give money, it helps to give on purpose rather than impulsively. Deciding your giving amount as a budget line - say 5% of your income, or a fixed $10 a month - means you help causes you care about without accidentally overspending or feeling pressured into random donations at every checkout counter.",
          "In the US, donations to registered charities can be tax-deductible for people who itemize their taxes, which means giving can slightly lower the taxes some adults owe. This isn't the reason to give, but it's useful to understand. To claim it, the organization must be a qualified nonprofit (often called a 501(c)(3)), and you need a receipt. Most teens won't itemize, so the tax angle matters more later in life. The bigger point is that giving is a normal, planned part of many people's financial lives, not just a spontaneous act. Building the habit while young makes generosity feel natural later, when your income and your ability to help are both much larger."
        ],
        bullets: [
          "A nonprofit serves a cause; any surplus funds its mission, not owners.",
          "Giving can be a planned budget line - decide the amount in advance.",
          "You can give money, time, goods, or skills; time is often ideal for teens.",
          "Give on purpose to avoid pressure and accidental overspending.",
          "US donations to qualified charities can be tax-deductible for itemizers."
        ],
        realWorldExample: "Aisha decides to give 5% of her $200 monthly income - $10 - to an animal shelter she cares about. She sets it as a budget line so it's planned, not impulsive. Over a year that's $120, plus she volunteers on weekends, giving valuable time on top of her steady, deliberate cash donation."
      },
      {
        type: "concept",
        title: "Giving Wisely and Avoiding Scams",
        paragraphs: [
          "Sadly, some 'charities' are scams or waste most of your money on overhead. Giving wisely means checking where your money actually goes. Watchdog sites rate charities on how much of each dollar reaches the cause versus administration and fundraising. A well-run charity typically spends most of each dollar on its actual programs. Before donating a meaningful amount, look up the organization: is it a registered nonprofit, and how does it use its funds? A few minutes of research ensures your generosity does real good instead of lining a scammer's pockets.",
          "Scammers exploit generosity, especially after disasters when people want to help fast. Warning signs include high-pressure demands to give 'right now,' vague names that copy real charities, requests for payment by gift card or wire transfer, and refusal to give details or a receipt. A legitimate charity is happy to answer questions and never rushes you. If someone pressures you to donate immediately or pay in an untraceable way, that's a major red flag. Slowing down and verifying protects both your money and the causes you actually want to support.",
          "Giving wisely also means giving sustainably - within your budget. Generosity is wonderful, but you can't pour from an empty cup. Guilt-driven or pressured giving that wrecks your own finances helps no one long-term. That's why a planned giving line works so well: you decide a comfortable amount, give it consistently, and say no to extra asks without guilt because you've already done your part. Consistent, modest giving from a stable budget often does more good over time than dramatic one-time gifts you later regret or can't afford."
        ],
        bullets: [
          "Some 'charities' are scams or waste most donations on overhead.",
          "Check watchdog ratings; well-run charities spend most on their programs.",
          "Scam red flags: high pressure, gift-card or wire requests, and vague names.",
          "A legitimate charity answers questions and never rushes you.",
          "Give sustainably within a planned budget line - you can't pour from empty."
        ],
        realWorldExample: "After a hurricane, Tomas gets a call demanding he donate 'right now' via gift card to a charity he's never heard of. He recognizes the red flags - pressure and an untraceable payment - and hangs up. He instead gives to a verified relief nonprofit he researched, ensuring his money actually helps."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "budget13-mc1",
            question: "What makes an organization a nonprofit?",
            options: [
              "It never handles or spends any money",
              "Any surplus funds its mission, not owners",
              "It quietly pays large profits out to shareholders",
              "It refuses all donations from the public"
            ],
            correctAnswer: 1,
            explanation: "A nonprofit serves a cause, and any surplus goes back into its mission rather than to owners or shareholders. It still handles money and pays staff to run programs."
          },
          {
            id: "budget13-mc2",
            question: "Which is a red flag for a charity scam?",
            options: [
              "A willingness to patiently answer all your questions",
              "Pressure to donate right now by gift card",
              "Freely providing a clear receipt for your donation",
              "Clearly being a properly registered, well-rated public nonprofit"
            ],
            correctAnswer: 1,
            explanation: "High-pressure demands to give immediately, especially by untraceable methods like gift cards or wire transfer, are classic scam signs. Real charities answer questions and never rush you."
          }
        ]
      },
      {
        type: "scenario",
        title: "Nia Plans Her Giving",
        narrative: "Nia earns $240 a month and wants to give back to a cause she cares about. She's gotten several emotional donation requests online, some pressuring her to give large amounts immediately. She wants to be generous but also smart, sustainable, and safe from scams.",
        details: [
          "Nia sets a planned giving line of $12 a month so it fits her budget.",
          "A planned amount lets her say no to extra pressured asks without guilt.",
          "She researches organizations to check that most of each dollar reaches the cause.",
          "She avoids any request that pressures her to pay immediately by gift card."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "budget13-aq1",
          question: "Nia wants to give generously but sustainably. What's the best approach?",
          options: [
            "Give large impulsive amounts to whoever happens to ask",
            "Set a planned giving line she can afford",
            "Donate money to whoever pressures her the most",
            "Give by gift card to save on fees"
          ],
          correctAnswer: 1,
          explanation: "A planned giving line lets Nia help consistently within her budget and decline pressured extra asks guilt-free. Impulsive or pressured giving can wreck her own finances or feed scams."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A nonprofit serves a cause; surpluses fund its mission, not owners.",
          "Make giving a planned budget line to avoid pressure and overspending.",
          "You can give money, time, goods, or skills - time is often ideal for teens.",
          "Check watchdog ratings so most of each dollar reaches the cause.",
          "Beware scams: pressure and gift-card or wire requests are red flags."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "budget13-mastery1",
            question: "Besides money, what can you donate to a cause?",
            options: [
              "Only cash counts as a real donation",
              "Time, goods, or skills you can offer",
              "Nothing at all except what registered charities allow",
              "Only the tax refunds you happen to receive yearly"
            ],
            correctAnswer: 1,
            explanation: "You can give time by volunteering, goods like clothes or food, or your skills. For teens especially, time is often more valuable to give than cash and builds experience."
          },
          {
            id: "budget13-mastery2",
            question: "Why check a charity's watchdog rating before donating a lot?",
            options: [
              "To see how much reaches the actual cause",
              "To find the charity with the highest overhead",
              "To magically make your entire donation tax-free automatically",
              "To guarantee the charity will make a profit"
            ],
            correctAnswer: 0,
            explanation: "Ratings show how much of each dollar funds real programs versus administration. A well-run charity spends most on its cause, so checking ensures your money does real good."
          },
          {
            id: "budget13-mastery3",
            question: "Why is a planned 'giving line' in your budget helpful?",
            options: [
              "It forces you to give away your income",
              "It lets you give without overspending or guilt",
              "It somehow makes each and every donation fully tax-deductible",
              "It requires you to give to every request"
            ],
            correctAnswer: 1,
            explanation: "Deciding your giving amount in advance lets you help causes you care about consistently, while comfortably declining extra pressured asks - you've already done your part."
          },
          {
            id: "budget13-mastery4",
            question: "How can charitable giving affect some adults' taxes in the US?",
            options: [
              "It doubles the taxes they owe that year",
              "Donations to qualified charities can be deductible",
              "It makes them exempt from all future taxes",
              "It has no effect on taxes for anyone ever"
            ],
            correctAnswer: 1,
            explanation: "Donations to qualified nonprofits can be tax-deductible for people who itemize, slightly lowering taxes owed. You need a receipt, and most teens won't itemize, so this matters more later."
          },
          {
            id: "budget13-mastery5",
            question: "Someone demands you donate immediately by wire transfer. What should you do?",
            options: [
              "Pay very fast before the special offer disappears",
              "Treat the pressure and method as red flags",
              "Send them extra just to prove you're generous",
              "Trust it fully because it just sounds urgent"
            ],
            correctAnswer: 1,
            explanation: "Pressure to give right now plus untraceable payment methods are classic scam signs. A legitimate charity answers questions and never rushes you, so verify before giving."
          },
          {
            id: "budget13-mastery6",
            question: "Why is 'you can't pour from an empty cup' relevant to giving?",
            options: [
              "Giving that wrecks your finances helps no one",
              "You must give until you have nothing left",
              "Most charities only ever accept very large gifts",
              "True generosity requires completely ignoring your own budget"
            ],
            correctAnswer: 0,
            explanation: "Guilt-driven giving that ruins your own finances isn't sustainable. Consistent, modest giving from a stable budget does more good over time than gifts you can't afford."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // budget-14: Consumer Protection: Your Rights & Agencies
  // ─────────────────────────────────────────────
  {
    lessonId: "budget-14",
    sections: [
      {
        type: "concept",
        title: "Your Rights as a Consumer",
        paragraphs: [
          "As a buyer, you have legal rights that protect you from being cheated. One core right is protection against false advertising: a company can't legally claim a product does something it doesn't, or advertise a price and then refuse to honor it. Products also generally must be safe and work as described - if you buy headphones advertised as waterproof and they die in the rain, you have grounds to complain or return them. These rights exist because lawmakers recognized that buyers need protection against far more powerful sellers who write all the rules.",
          "You also have rights around returns, warranties, and disclosures. Many products come with a warranty - a promise to repair or replace if it fails within a set time. Stores must clearly disclose important terms, like whether a sale is final or a subscription auto-renews. In the US, you have specific protections for things bought on credit, and rules against deceptive fees hidden until checkout. Knowing these rights turns you from an easy target into an informed buyer who can push back when a company tries to bend the rules or bury the truth in fine print.",
          "A crucial right involves your personal and financial data. Companies that hold your information have legal duties to protect it and rules about how they can use it. You often have the right to know what data is collected and, in some places, to have it deleted. If your data is breached, companies may be required to notify you. As more of life happens online, these privacy rights grow more important. Understanding that you have a say over your own information - not just your money - is a key part of being a protected, empowered consumer today."
        ],
        bullets: [
          "You're protected against false advertising and bait-and-switch pricing.",
          "Products generally must be safe and work as described.",
          "Warranties promise repair or replacement within a set time.",
          "Stores must disclose key terms like final sales and auto-renewals.",
          "You have rights over your personal and financial data, too."
        ],
        realWorldExample: "Kai buys a 'waterproof' speaker that stops working after light rain. Because false advertising is illegal and products must work as described, he has solid grounds to demand a refund or replacement. Knowing his rights, he cites the waterproof claim and the store replaces it without a fight."
      },
      {
        type: "concept",
        title: "Agencies That Protect You",
        paragraphs: [
          "When a company won't make things right, government agencies can step in. In the US, the Federal Trade Commission (FTC) fights unfair and deceptive business practices - false ads, scams, and hidden fees - across the whole economy. It sets rules companies must follow and takes action against violators. When many people report the same scam, the FTC can investigate and shut it down. You can file a complaint with the FTC when a business cheats you. Knowing this agency exists changes the balance of power: you're not alone against a big company.",
          "For money-specific problems, the Consumer Financial Protection Bureau (CFPB) is your ally. It oversees banks, lenders, credit card companies, and debt collectors, and handles complaints about things like surprise fees, unfair loan terms, or errors on your accounts. Filing a CFPB complaint often gets a fast response, because companies must reply. There are also state-level consumer protection offices and the Better Business Bureau, where you can research a company's complaint history before buying. These bodies give you real leverage when a business ignores your reasonable requests.",
          "Using these protections follows a smart order. First, try to resolve the issue directly with the company - most problems end here, and it's the fastest path. Keep records: receipts, emails, and notes of calls, because documentation is power if you escalate. If the company won't cooperate, then file a complaint with the right agency (FTC for scams and deceptive practices, CFPB for financial products). For small money disputes, small claims court is an option too. Escalating step by step, with good records, resolves most consumer problems without needing a lawyer."
        ],
        bullets: [
          "The FTC fights unfair and deceptive practices across the economy.",
          "The CFPB oversees banks, lenders, and credit issues; companies must respond.",
          "State offices and the Better Business Bureau also help and inform you.",
          "Resolve directly with the company first, and keep detailed records.",
          "Escalate to the right agency if the company won't cooperate."
        ],
        realWorldExample: "A lender charges Maya a fee she was never told about and refuses to remove it. She first complains directly with her records in hand; when they stall, she files a CFPB complaint. Because companies must respond to the CFPB, the lender quickly reverses the surprise fee she was wrongly charged."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "budget14-mc1",
            question: "Which is a basic consumer right?",
            options: [
              "Protection against false advertising",
              "The right to never pay any taxes",
              "Free products from any store you choose",
              "Guaranteed profit on everything you buy"
            ],
            correctAnswer: 0,
            explanation: "Protection against false advertising is a core consumer right - companies can't legally claim a product does something it doesn't or refuse to honor an advertised price."
          },
          {
            id: "budget14-mc2",
            question: "What should you do FIRST when a company overcharges you?",
            options: [
              "Immediately go sue the company in federal court",
              "Try to resolve it directly with the company",
              "Post many angry reviews and do nothing else",
              "Immediately go and hire an expensive private lawyer"
            ],
            correctAnswer: 1,
            explanation: "Most problems are solved fastest by contacting the company directly with your records. If they won't cooperate, then you escalate to the right agency."
          }
        ]
      },
      {
        type: "scenario",
        title: "Ethan's Surprise Fee",
        narrative: "Ethan signed up for a service that advertised one price, but his bill includes a fee he was never told about. He contacts the company with his records, but they refuse to remove it. He wants to know his rights and where to turn next to resolve the problem fairly.",
        details: [
          "Hidden fees not disclosed upfront can violate consumer protection rules.",
          "Ethan kept his records - the ad, the signup terms, and his bill.",
          "He tried resolving it directly first, which is the right initial step.",
          "Since the company won't cooperate, he can escalate to a government agency."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "budget14-aq1",
          question: "The company refused to remove Ethan's undisclosed fee on a financial service. Where should he escalate?",
          options: [
            "Nowhere; he must simply pay the fee",
            "File a complaint with the CFPB",
            "Wait a year and hope it goes away",
            "Pay it and never use records again"
          ],
          correctAnswer: 1,
          explanation: "The CFPB handles complaints about financial products like surprise fees and unfair terms, and companies must respond. With his records ready, escalating there is the smart next step."
        }
      },
      {
        type: "recap",
        takeaways: [
          "You have rights against false advertising and for products working as described.",
          "Warranties, disclosure rules, and data-privacy rights all protect buyers.",
          "The FTC fights deceptive practices; the CFPB handles financial complaints.",
          "State offices and the Better Business Bureau offer help and research.",
          "Resolve directly first, keep records, then escalate to the right agency."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "budget14-mastery1",
            question: "What does a product warranty promise?",
            options: [
              "A surprise cash bonus for buying the product",
              "Repair or replacement within a set time",
              "A promise the price will never rise again",
              "Free automatic upgrades to newer models forever"
            ],
            correctAnswer: 1,
            explanation: "A warranty is a promise to repair or replace an item if it fails within a set period. It's one of several rights, alongside protection from false advertising and hidden terms."
          },
          {
            id: "budget14-mastery2",
            question: "What does the FTC mainly do?",
            options: [
              "It sets the price of every single product sold",
              "Fights unfair and deceptive business practices",
              "It lends money directly to everyday consumers",
              "It collects extra taxes from online shoppers"
            ],
            correctAnswer: 1,
            explanation: "The Federal Trade Commission fights false ads, scams, and hidden fees across the economy, sets rules, and acts against violators. You can file a complaint when a business cheats you."
          },
          {
            id: "budget14-mastery3",
            question: "Which agency handles complaints about banks, loans, and credit cards?",
            options: [
              "The CFPB",
              "The local library board",
              "The post office",
              "A product's manufacturer"
            ],
            correctAnswer: 0,
            explanation: "The Consumer Financial Protection Bureau oversees banks, lenders, and credit issues and handles complaints about surprise fees or unfair terms - and companies must respond."
          },
          {
            id: "budget14-mastery4",
            question: "Why is keeping records important in a consumer dispute?",
            options: [
              "Detailed records are required to buy almost anything",
              "Documentation gives you power if you escalate",
              "Good records will automatically double your total refund",
              "You must mail them to the FTC before buying"
            ],
            correctAnswer: 1,
            explanation: "Receipts, emails, and call notes are your evidence. Good documentation strengthens your case whether you resolve it with the company or escalate to an agency."
          },
          {
            id: "budget14-mastery5",
            question: "Kai's 'waterproof' speaker dies in the rain. Why does he have grounds to complain?",
            options: [
              "Because products must work as described",
              "Because all electronics come with lifetime service",
              "Because rain damage is always the buyer's fault",
              "Because he simply changed his mind about it"
            ],
            correctAnswer: 0,
            explanation: "False advertising is illegal and products must work as described. Since the speaker was sold as waterproof but failed in rain, Kai can demand a refund or replacement."
          },
          {
            id: "budget14-mastery6",
            question: "Besides your money, what else do consumer protections cover?",
            options: [
              "Your personal and financial data",
              "Your grades and school records only",
              "Nothing beyond the purchase price",
              "Only items that cost over $1,000"
            ],
            correctAnswer: 0,
            explanation: "Companies holding your information have duties to protect it and rules on how they use it. You often can know what's collected and, in some places, have it deleted."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // budget-15: Reading & Evaluating Contracts
  // ─────────────────────────────────────────────
  {
    lessonId: "budget-15",
    sections: [
      {
        type: "concept",
        title: "What a Contract Really Is",
        paragraphs: [
          "A contract is a legally binding agreement between two parties - once you sign or click 'I agree,' you're committed to its terms. Contracts are everywhere in adult life: phone plans, gym memberships, apartment leases, job offers, and every app's terms of service. The key word is 'binding': a contract can be enforced in court, so agreeing to one is a serious act, not a formality. That's exactly why companies write them carefully to protect themselves. Understanding that a signature creates real obligations is the first step to never getting trapped by one.",
          "Contracts have standard parts worth recognizing. There's the offer (what each side provides), the price and payment terms, the length or 'term,' and the conditions for ending it. Crucial details often hide in sections about fees, penalties, and cancellation. For example, a gym contract might be cheap monthly but lock you in for a year with a steep early-termination fee. The headline number is rarely the whole story; the real cost and risk live in the terms. Reading past the big friendly print to the specifics is what separates informed signers from trapped ones.",
          "The scariest parts of contracts are usually the ones written to be boring so you skip them. Auto-renewal clauses quietly re-sign you every year unless you cancel in a specific window. Arbitration clauses may waive your right to sue. 'Introductory' rates that jump later, cancellation fees, and automatic price increases all lurk in the fine print. Companies count on you not reading. But these clauses are binding whether you read them or not - so the fine print is precisely where you must look. A few minutes of reading can save you from months of a bill you can't easily escape."
        ],
        bullets: [
          "A contract is a legally binding agreement enforceable in court.",
          "Signing or clicking 'I agree' commits you to all its terms.",
          "Key parts: the offer, price, term length, and how to end it.",
          "Real cost and risk hide in fees, penalties, and cancellation terms.",
          "Auto-renewal and hidden clauses bind you whether you read them or not."
        ],
        realWorldExample: "Liam signs a gym contract advertised at '$15 a month.' Buried in the terms is a 12-month lock-in and a $120 early-cancellation fee. When he tries to quit after three months, he's stuck paying. The cheap headline hid the real commitment - all spelled out in the fine print he skipped."
      },
      {
        type: "concept",
        title: "How to Read and Protect Yourself",
        paragraphs: [
          "You don't need to be a lawyer to read a contract safely - you need a checklist. Before signing anything, find and understand five things: the total cost (including all fees), the length of the commitment, how to cancel and any penalty, what happens if you pay late or break a term, and whether it auto-renews. If you can't find these, ask - a trustworthy company will answer clearly. If they dodge, that's a warning. Reading with these five questions in mind turns a wall of text into a quick, manageable check.",
          "Certain red flags should make you pause hard. Blank spaces to be 'filled in later,' pressure to sign immediately without reading, verbal promises that aren't written in the contract, and anyone saying 'don't worry about that part' are all danger signs. Only what's written counts - a salesperson's friendly promise means nothing if the contract says otherwise. Never sign a contract you haven't read or don't understand, no matter how much you're rushed. It's completely reasonable to take a contract home, read it slowly, or ask a trusted adult before committing.",
          "If a contract has terms you don't like, remember you can often negotiate or simply walk away - signing isn't mandatory. Many people feel pressured to agree, forgetting that 'no' is always an option before you sign. Once signed, though, your power drops sharply, which is why the moment before signing is when your leverage is highest. Keep a copy of every contract you sign, so you can check the terms later and prove what you agreed to. Treating contracts with healthy respect - reading them, questioning them, keeping them - protects you from years of avoidable trouble."
        ],
        bullets: [
          "Before signing, check total cost, length, cancellation, penalties, and auto-renewal.",
          "A trustworthy company answers your questions clearly; dodging is a warning.",
          "Red flags: blank spaces, pressure to sign fast, and unwritten verbal promises.",
          "Only what's written counts - never sign what you haven't read or understand.",
          "You can negotiate or walk away before signing; keep a copy afterward."
        ],
        realWorldExample: "A salesperson tells Priya, 'Don't worry about the cancellation section, we never enforce it,' and rushes her to sign. She recognizes the red flags, takes the contract home, and finds a real $200 penalty. Because only the written terms count, she walks away instead of trusting the verbal promise."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "budget15-mc1",
            question: "What makes a contract different from a casual promise?",
            options: [
              "It is legally binding and enforceable in court",
              "It can be ignored once you change your mind",
              "It only applies if you read every word",
              "It never involves any money at all"
            ],
            correctAnswer: 0,
            explanation: "A contract is a legally binding agreement enforceable in court. Once you sign or click 'I agree,' you're committed to its terms - which is why signing is a serious act."
          },
          {
            id: "budget15-mc2",
            question: "A salesperson says 'don't worry about that clause.' What's true?",
            options: [
              "Verbal promises override the written contract",
              "Only what's written in the contract counts",
              "You should sign quickly to lock in the deal",
              "The clause disappears if they say to ignore it"
            ],
            correctAnswer: 1,
            explanation: "Only the written terms are binding. A verbal promise means nothing if the contract says otherwise, so 'don't worry about that part' is a red flag to slow down."
          }
        ]
      },
      {
        type: "scenario",
        title: "Sofia Signs a Phone Plan",
        narrative: "Sofia is offered a phone plan advertised at a low monthly price. The salesperson is friendly, rushing her to sign 'before the deal ends,' and waves off her question about cancellation, saying not to worry about it. Sofia wants to make a smart decision instead of signing under pressure.",
        details: [
          "The rush to sign 'before the deal ends' is a pressure tactic, a red flag.",
          "Waving off her cancellation question hides a term she should understand.",
          "Only the written terms count, not the salesperson's reassuring words.",
          "She can take the contract home to read the total cost and cancellation terms."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "budget15-aq1",
          question: "Sofia is rushed to sign and told not to worry about cancellation. What's the smart move?",
          options: [
            "Sign now to grab the deal before it ends",
            "Read the full terms before signing anything",
            "Trust the salesperson's verbal promise fully",
            "Sign and ask about cancellation next year"
          ],
          correctAnswer: 1,
          explanation: "Pressure and dodged questions are red flags, and only written terms are binding. Reading the full contract first - even taking it home - protects her from a trap she can't easily escape."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A contract is legally binding; signing commits you to all its terms.",
          "Real cost and risk hide in fees, penalties, and cancellation terms.",
          "Auto-renewal and fine-print clauses bind you whether you read them or not.",
          "Before signing, check cost, length, cancellation, penalties, and renewal.",
          "Only written terms count; you can negotiate or walk away before signing."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "budget15-mastery1",
            question: "Why do companies write contracts carefully?",
            options: [
              "Mainly to make the document look impressive",
              "Because contracts are enforceable and protect them",
              "Because the law strictly bans all short contracts",
              "Mainly to give their customers extra free benefits"
            ],
            correctAnswer: 1,
            explanation: "Contracts are legally binding and enforceable in court, so companies write them to protect their own interests. That's exactly why you must read the terms before agreeing."
          },
          {
            id: "budget15-mastery2",
            question: "Where does the real cost and risk of a contract usually hide?",
            options: [
              "In the big friendly headline number",
              "In fees, penalties, and cancellation terms",
              "In the company's logo and colors",
              "In the font size of the title"
            ],
            correctAnswer: 1,
            explanation: "The headline number is rarely the whole story. Early-termination fees, penalties, and cancellation conditions in the fine print carry the real cost and risk."
          },
          {
            id: "budget15-mastery3",
            question: "What does an auto-renewal clause do?",
            options: [
              "Politely cancels the whole contract on your behalf automatically",
              "Re-signs you unless you cancel in a set window",
              "Quietly lowers your monthly price a bit every single year",
              "Makes the whole contract become legally void over time"
            ],
            correctAnswer: 1,
            explanation: "An auto-renewal clause quietly renews your agreement each term unless you cancel within a specific window. It binds you whether you read it or not, so watch for it."
          },
          {
            id: "budget15-mastery4",
            question: "Which is a red flag when someone asks you to sign a contract?",
            options: [
              "They give you time to read it fully",
              "They pressure you to sign immediately",
              "They answer all your questions clearly",
              "They hand you a copy to keep"
            ],
            correctAnswer: 1,
            explanation: "Pressure to sign right away, blank spaces, and unwritten verbal promises are danger signs. Never sign something you haven't read or don't understand, no matter the rush."
          },
          {
            id: "budget15-mastery5",
            question: "When is your leverage highest with a contract?",
            options: [
              "The moment before you sign it",
              "A full year after you have signed it",
              "Only after you have already broken its terms",
              "Only once you have fully paid it in full"
            ],
            correctAnswer: 0,
            explanation: "Before signing, you can negotiate or walk away entirely. Once signed, your power drops sharply, so the moment before committing is when you hold the most leverage."
          },
          {
            id: "budget15-mastery6",
            question: "Liam signs a '$15 a month' gym deal and gets stuck with a $120 fee. What went wrong?",
            options: [
              "The gym broke the law by charging him",
              "He skipped the fine print with the lock-in",
              "The advertised monthly price was actually secretly illegal",
              "He read every single term but still signed anyway"
            ],
            correctAnswer: 1,
            explanation: "The cheap headline hid a 12-month lock-in and a $120 cancellation fee in the fine print he skipped. Those binding terms are exactly what reading before signing catches."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // budget-16: Disputing Billing Errors
  // ─────────────────────────────────────────────
  {
    lessonId: "budget-16",
    sections: [
      {
        type: "concept",
        title: "Spotting Billing Errors",
        paragraphs: [
          "A billing error is any incorrect charge on an account - a bank statement, credit card, phone bill, or subscription. Errors are more common than people think: a double charge, a subscription you canceled that keeps billing, a price higher than advertised, a fee you never agreed to, or a purchase you never made. The catch is that you'll only catch these if you actually check your statements. Money you don't monitor is money that quietly leaks away through mistakes and sneaky charges. Reviewing statements regularly is the habit that makes disputing possible in the first place.",
          "Some billing errors are honest mistakes, but others are signs of something worse, like fraud. A charge you don't recognize could be a computer glitch - or someone using your stolen card number. That's why you review every line, not just the total. If the total 'looks about right,' you might miss a $9 fraudulent charge that a thief is testing before making bigger ones. Small unexplained charges are a classic warning sign of a compromised account. Treating every unfamiliar charge as worth investigating protects you from both simple errors and real theft.",
          "The most powerful habit is a quick monthly statement review. Once a month, go line by line through each account and match charges to purchases you actually made. Flag anything you don't recognize, anything that seems too high, and any subscription you meant to cancel. This takes ten minutes and can save you real money. People who never review their statements often pay for forgotten subscriptions and undetected errors for months or years. The review isn't just about catching fraud - it's about staying the boss of your own money instead of trusting companies to always get it right."
        ],
        bullets: [
          "A billing error is any incorrect charge on any account.",
          "Common errors: double charges, zombie subscriptions, and unagreed fees.",
          "You only catch errors if you actually review your statements.",
          "Small unfamiliar charges can be a warning sign of fraud.",
          "A ten-minute monthly line-by-line review catches errors and theft."
        ],
        realWorldExample: "Reviewing her statement, Dana spots a $12 charge for a streaming service she canceled two months ago - it kept billing her. She also finds a $3 charge she doesn't recognize at all. The zombie subscription was an error worth $24 so far, and the mystery $3 turns out to be a thief testing her card."
      },
      {
        type: "concept",
        title: "How to Dispute a Charge",
        paragraphs: [
          "When you find an error, you have the right to dispute it, and there's a clear process. First, gather evidence: your statement, any receipts, emails, or screenshots proving the charge is wrong. Then contact the company or your bank, explain the error clearly, and state what you want fixed. For credit card errors, US law gives you strong protections - you can formally dispute a charge, and the card issuer must investigate. You generally shouldn't have to pay the disputed amount while it's being investigated. Knowing you have these rights turns a frustrating charge into a solvable problem.",
          "Documentation and persistence win disputes. Keep records of every call and message - dates, names, and what was said. If a first request is denied or ignored, escalate: ask for a supervisor, put your dispute in writing, or file a complaint with an agency like the CFPB for financial accounts. Many valid disputes are resolved simply because the customer stayed organized and didn't give up after the first 'no.' Companies sometimes hope you'll drop it; being calm, factual, and persistent, with evidence in hand, is exactly what gets a wrongful charge reversed.",
          "Act quickly, because disputes have deadlines. Credit card billing-error rights, for example, typically require you to dispute within a set number of days of the statement - often around 60 days. Wait too long and you can lose your protections, so a prompt monthly review matters even more. Also know the difference between a billing error (a wrong charge you dispute with the company) and unauthorized fraud (report it immediately so the card can be frozen). For subscriptions, cancel through official channels and confirm in writing so a 'canceled' service can't keep charging you. Speed plus records is the winning combination."
        ],
        bullets: [
          "You have the right to dispute an incorrect charge, with a clear process.",
          "Gather evidence, contact the company, and state the fix you want.",
          "For credit cards, the issuer must investigate and you needn't pay it meanwhile.",
          "Keep records and escalate if denied - persistence wins many disputes.",
          "Act fast: disputes have deadlines, often around 60 days."
        ],
        realWorldExample: "Omar is double-charged $40 for one order. He gathers his receipt and statement, calls his card issuer, and formally disputes the extra charge. The issuer investigates, removes the $40, and he isn't required to pay it during the review. Because he acted within the deadline and kept records, the fix was quick."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "budget16-mc1",
            question: "Why should you review every line of a statement, not just the total?",
            options: [
              "Small unfamiliar charges can signal fraud",
              "Totals are always wrong on purpose",
              "The line items change the amount you owe",
              "Banks legally hide the total from you"
            ],
            correctAnswer: 0,
            explanation: "If the total 'looks about right,' you can miss a small fraudulent charge a thief is testing. Reviewing every line catches both honest errors and real theft."
          },
          {
            id: "budget16-mc2",
            question: "Why is acting quickly important when disputing a charge?",
            options: [
              "That disputed charge grows larger with every passing day",
              "Disputes have deadlines, often around 60 days",
              "Companies simply close your accounts after just one week",
              "Filing fast disputes will automatically cost you extra"
            ],
            correctAnswer: 1,
            explanation: "Billing-error rights typically require disputing within a set window, often around 60 days. Wait too long and you can lose your protections, so prompt review matters."
          }
        ]
      },
      {
        type: "scenario",
        title: "Maya Finds a Double Charge",
        narrative: "Reviewing her monthly statement, Maya notices she was charged $35 twice for a single online order. She also sees a small $4 charge she doesn't recognize at all. She wants to fix the double charge properly and figure out what the mystery charge might be.",
        details: [
          "The $35 double charge is a billing error she has the right to dispute.",
          "She gathers her receipt and statement as evidence before contacting anyone.",
          "The unrecognized $4 charge could be fraud, so she treats it as urgent.",
          "Acting within the dispute deadline and keeping records will speed the fix."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "budget16-aq1",
          question: "Maya wants to fix the $35 double charge on her card. What's the best first step?",
          options: [
            "Pay it twice and hope for a refund later",
            "Gather evidence and dispute it with her issuer",
            "Ignore it since it's a small amount",
            "Wait a year to see if it corrects itself"
          ],
          correctAnswer: 1,
          explanation: "Gathering her receipt and statement, then formally disputing with the card issuer, uses her rights properly. The issuer must investigate, and she needn't pay the disputed amount meanwhile."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A billing error is any incorrect charge - review statements to catch them.",
          "Small unfamiliar charges can be a warning sign of fraud.",
          "You have the right to dispute; gather evidence and state the fix you want.",
          "For credit cards, the issuer must investigate the disputed charge.",
          "Act fast within deadlines, keep records, and escalate if denied."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "budget16-mastery1",
            question: "What is a 'zombie subscription'?",
            options: [
              "A service you canceled that keeps billing you",
              "A generous free trial that never charges you anything",
              "A subscription that quietly lowers its own price monthly",
              "A one-time charge that appears only a single time"
            ],
            correctAnswer: 0,
            explanation: "A zombie subscription keeps billing you after you thought you canceled it. Catching it requires reviewing statements, then disputing and canceling through official channels."
          },
          {
            id: "budget16-mastery2",
            question: "What's the right first step once you spot a billing error?",
            options: [
              "Just post about the whole thing on social media",
              "Gather solid evidence like receipts and bank statements",
              "Immediately rush to close down all of your accounts",
              "Quietly pay extra just to avoid any late fees"
            ],
            correctAnswer: 1,
            explanation: "Start by gathering evidence - your statement, receipts, emails, or screenshots proving the charge is wrong. Then contact the company and clearly state the fix you want."
          },
          {
            id: "budget16-mastery3",
            question: "For a disputed credit card charge, what protection do you generally have?",
            options: [
              "You must pay double until it's resolved",
              "The issuer must investigate the disputed charge",
              "You lose the account during the dispute",
              "That disputed charge can never be investigated at all"
            ],
            correctAnswer: 1,
            explanation: "US law requires the card issuer to investigate a properly disputed charge, and you generally don't have to pay the disputed amount while it's being reviewed."
          },
          {
            id: "budget16-mastery4",
            question: "Why does persistence matter in a dispute?",
            options: [
              "Most companies charge less to more persistent people",
              "Many disputes are won by staying organized",
              "Sheer persistence removes any need for real evidence",
              "The law requires exactly three phone calls"
            ],
            correctAnswer: 1,
            explanation: "Companies sometimes hope you'll drop it. Staying calm, factual, and persistent with records - escalating to a supervisor or the CFPB if needed - is what reverses wrongful charges."
          },
          {
            id: "budget16-mastery5",
            question: "How does a billing error differ from unauthorized fraud?",
            options: [
              "They are honestly the very same exact situation",
              "Fraud should be reported to freeze the card",
              "Fraud simply can never be disputed at all",
              "Billing errors must always go to the police"
            ],
            correctAnswer: 1,
            explanation: "A billing error is a wrong charge you dispute with the company; fraud is unauthorized use you report right away so the card can be frozen before more damage is done."
          },
          {
            id: "budget16-mastery6",
            question: "How can you make sure a canceled subscription truly stops charging you?",
            options: [
              "Assume it stopped and never check again",
              "Cancel officially and confirm it in writing",
              "Simply delete the app from your phone",
              "Wait for the company to remind you"
            ],
            correctAnswer: 1,
            explanation: "Cancel through official channels and get written confirmation, so a 'canceled' service can't keep billing you. Then verify on your next statement that the charges have stopped."
          }
        ]
      }
    ]
  },
]
