import { StructuredLessonContent } from "@/types"

// ═══════════════════════════════════════════════
// UNIT 35: INSURANCE & PROTECTION (Florida SS.912.FL.7.x)
// ═══════════════════════════════════════════════

export const insuranceContent: StructuredLessonContent[] = [
  // ─────────────────────────────────────────────
  // ins-1: What Is Insurance & Why You Need It (FL.7.1)
  // ─────────────────────────────────────────────
  {
    lessonId: "ins-1",
    sections: [
      {
        type: "concept",
        title: "Insurance: Trading a Small Loss to Avoid a Huge One",
        paragraphs: [
          "Insurance is a deal: you pay a small, predictable amount of money on a regular schedule, and in exchange a company promises to cover a large, unpredictable cost if something bad happens. You are trading a tiny guaranteed loss (your payment) to protect yourself from a giant, surprise loss that could wipe you out.",
          "The magic behind insurance is called risk pooling. Thousands of people each pay into a shared pot. Most of them will not have a disaster this year, so most of the money sits there. When a few unlucky people DO have a car crash, house fire, or surgery, the pot pays their huge bills. Nobody knows in advance who the unlucky ones will be, so everyone chips in to protect each other.",
          "Without insurance, a single bad day can erase years of saving. One car accident, one trip to the emergency room, or one apartment fire can cost tens of thousands of dollars. With insurance, that same disaster becomes a much smaller, manageable bill — which is exactly why insurance exists and why nearly every adult needs at least some of it."
        ],
        bullets: [
          "Insurance turns a scary, unpredictable cost into a small, predictable monthly payment.",
          "Risk pooling means many people share the cost of the few who have disasters.",
          "You will usually pay more in premiums over your life than you get back — and that is fine, because the point is protection, not profit.",
          "The uninsured pay 100% of a disaster out of their own pocket; the insured pay a fraction.",
          "Insurance protects the savings and assets you have worked hard to build."
        ],
        realWorldExample: "Think of your phone. If you drop and shatter a $1,000 phone with no protection, you pay the full $1,000. With a $7/month protection plan, you pay maybe a $29 repair fee. You 'lost' $7/month, but you avoided a $1,000 hit — that's insurance in miniature."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ins1-mc1",
            question: "What is 'risk pooling'?",
            options: [
              "Many people contribute money so the unlucky few who have disasters get covered",
              "Saving all your own money in a special pool for emergencies",
              "A government program that pays for all medical bills",
              "Betting against the insurance company to make a profit"
            ],
            correctAnswer: 0,
            explanation: "Risk pooling is the core idea of insurance: a large group pays in, and the pooled money covers the small number of people who actually face a disaster. It is not your personal savings account, and it is not designed for you to 'win' money."
          },
          {
            id: "ins1-mc2",
            question: "Why do people pay insurance premiums even in years when nothing bad happens?",
            options: [
              "Because the law requires everyone to lose money",
              "Because premiums buy protection against the chance of a huge, unpredictable cost",
              "Because the premium is refunded at the end of the year",
              "Because premiums are actually a type of investment that always grows"
            ],
            correctAnswer: 1,
            explanation: "Premiums buy peace of mind and protection, not a guaranteed payout. In a good year you 'lose' the premium, but you were protected the whole time — that protection is what you paid for."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Drivers, One Crash",
        narrative: "Sofia, 17, just got her license in Miami. Her family pays $120/month for auto insurance. Her best friend Camila rides with a family that dropped their insurance to save money. One afternoon, Camila's family car rear-ends another vehicle on the Palmetto Expressway, causing $8,000 in damage. The same week, Sofia's family is in a minor fender bender.",
        details: [
          "Camila's family has no insurance, so they must pay the entire $8,000 repair bill themselves — money they don't have saved.",
          "Sofia's family files a claim; after their deductible, insurance covers most of the repair cost.",
          "Sofia's family paid $1,440 over the past year in premiums ($120 × 12) but avoided a financial catastrophe.",
          "Camila's family 'saved' on premiums for months but now faces a bill larger than their entire emergency fund."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ins1-aq1",
          question: "Based on the scenario, why was Sofia's family in a better financial position even though they paid $1,440 in premiums?",
          options: [
            "Because they earned interest on their premiums",
            "Because insurance is always cheaper than not having it",
            "Because their premiums protected them from a sudden bill far larger than what they paid",
            "Because Camila's family was legally required to pay Sofia's bill"
          ],
          correctAnswer: 2,
          explanation: "Sofia's family traded a predictable $1,440/year for protection against an unpredictable multi-thousand-dollar disaster. Camila's family avoided premiums but was fully exposed when the $8,000 bill hit — that's the difference insurance makes."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Insurance trades a small, predictable payment for protection against a large, unpredictable loss.",
          "Risk pooling spreads the cost of disasters across many people so no single person is ruined.",
          "Being uninsured means you personally absorb 100% of any disaster.",
          "It is normal and expected to pay more in premiums than you receive — protection is the product.",
          "Insurance guards the savings and assets you've worked to build."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "ins1-mastery1",
            question: "Which best describes the basic trade insurance offers?",
            options: [
              "A guaranteed profit in exchange for monthly payments",
              "A small predictable cost in exchange for protection against a large unpredictable cost",
              "Free money whenever something goes wrong",
              "A way to avoid ever paying for anything yourself"
            ],
            correctAnswer: 1,
            explanation: "Insurance is fundamentally about swapping a small certain cost (premium) for protection against a large uncertain one."
          },
          {
            id: "ins1-mastery2",
            question: "Who benefits MOST from insurance in any given year?",
            options: [
              "Only the insurance company",
              "Everyone equally, since premiums are always refunded",
              "The unlucky few who experience a disaster and get their huge bills covered",
              "Only people who never file a claim"
            ],
            correctAnswer: 2,
            explanation: "In any year, the people who actually face a disaster benefit most — the pooled premiums of everyone else cover their large losses."
          },
          {
            id: "ins1-mastery3",
            question: "What happens financially to someone who chooses to be uninsured when disaster strikes?",
            options: [
              "The government automatically covers the cost",
              "They pay the full cost of the disaster out of their own pocket",
              "Other drivers' insurance always pays for them",
              "They owe nothing because they had no policy"
            ],
            correctAnswer: 1,
            explanation: "Without insurance, you are personally responsible for 100% of the cost — which can be financially devastating."
          },
          {
            id: "ins1-mastery4",
            question: "Why is paying more in total premiums than you get back NOT a sign that insurance is a bad deal?",
            options: [
              "Because premiums are tax-free",
              "Because the purpose is protection from catastrophe, not earning a return",
              "Because you always get the money back at retirement",
              "Because insurance companies are non-profits"
            ],
            correctAnswer: 1,
            explanation: "Insurance is protection, not an investment. Paying premiums and never needing a big payout means you stayed safe — that's success, not loss."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // ins-2: How Insurance Works — Premiums, Deductibles, Co-pays (FL.7.3)
  // ─────────────────────────────────────────────
  {
    lessonId: "ins-2",
    sections: [
      {
        type: "concept",
        title: "The Five Words That Decide What You Actually Pay",
        paragraphs: [
          "Every insurance policy runs on a handful of key terms. The premium is what you pay regularly (usually monthly) just to have the policy — like a subscription. The deductible is the amount YOU pay out of pocket before the insurance company starts paying anything. A co-pay is a small fixed amount you pay for a specific service, like $20 each time you see a doctor.",
          "Two more terms set the limits. The coverage limit is the maximum the insurance company will pay for a claim — anything above that is on you. The out-of-pocket maximum is a yearly cap on what YOU can be forced to pay; once you hit it, insurance covers 100% for the rest of the year.",
          "Here's how they connect with real numbers: imagine a policy with a $200/month premium, a $1,000 deductible, a $20 co-pay, and a $50,000 coverage limit. You pay $200 every month no matter what. If you have a big claim, you pay the first $1,000 yourself (the deductible), then insurance kicks in. There's also a key trade-off to remember: a higher deductible usually means a lower monthly premium, because you're agreeing to take on more of the risk yourself."
        ],
        bullets: [
          "Premium = your regular payment just to keep the policy active.",
          "Deductible = what you pay first, before insurance pays anything.",
          "Co-pay = a small fixed charge for a specific service (e.g., $20 per doctor visit).",
          "Coverage limit = the most insurance will pay; you cover anything above it.",
          "Out-of-pocket maximum = the yearly cap on your spending, after which insurance pays 100%."
        ],
        realWorldExample: "A $1,000-deductible car policy might cost $90/month, while a $250-deductible version of the same policy costs $140/month. Choosing the higher deductible saves $50/month ($600/year) — but you'd pay $750 more out of pocket if you actually crash. The 'right' choice depends on your savings and how much risk you can handle."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ins2-mc1",
            question: "What is a deductible?",
            options: [
              "The monthly payment that keeps your policy active",
              "The amount you pay out of pocket before insurance starts paying",
              "The maximum the insurance company will ever pay",
              "A reward the insurer pays you for not filing claims"
            ],
            correctAnswer: 1,
            explanation: "The deductible is your share that comes first. Until you've paid it, the insurer pays nothing toward that claim. The monthly payment is the premium, and the max payout is the coverage limit."
          },
          {
            id: "ins2-mc2",
            question: "If you raise your deductible, what usually happens to your premium?",
            options: [
              "The premium goes up",
              "The premium goes down",
              "The premium stays exactly the same",
              "The coverage limit disappears"
            ],
            correctAnswer: 1,
            explanation: "A higher deductible means you're taking on more risk yourself, so the insurer charges a lower premium. Lower deductible = higher premium."
          }
        ]
      },
      {
        type: "scenario",
        title: "Marcus and the $3,200 Repair",
        narrative: "Marcus, 19, has car insurance with a $500 deductible. One rainy night in Tampa, he slides into a guardrail. The repair shop estimates $3,200 in damage. Marcus is nervous about the bill, so he reviews exactly how his policy works before filing the claim.",
        details: [
          "Marcus pays his $500 deductible first.",
          "Insurance then covers the remaining $2,700 of the $3,200 repair.",
          "A month later, Marcus gets a smaller scratch that costs only $400 to fix.",
          "Because $400 is less than his $500 deductible, insurance pays nothing — Marcus pays the full $400 himself."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ins2-aq1",
          question: "Why did insurance pay $0 on Marcus's $400 scratch but $2,700 on his $3,200 crash?",
          options: [
            "Because the insurer ran out of money",
            "Because the $400 repair was below his $500 deductible, so it never reached the insurer's responsibility",
            "Because scratches are never covered",
            "Because Marcus forgot to pay his premium"
          ],
          correctAnswer: 1,
          explanation: "The deductible is the threshold. The $400 repair was under his $500 deductible, so Marcus paid all of it. The $3,200 crash exceeded the deductible, so he paid $500 and insurance covered the remaining $2,700."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Premium is your ongoing cost; deductible is what you pay before coverage begins.",
          "A co-pay is a small fixed fee for a specific service; the coverage limit caps the insurer's payout.",
          "The out-of-pocket maximum protects you with a yearly ceiling on your own spending.",
          "Higher deductible = lower premium, and vice versa — it's a risk trade-off.",
          "If a repair costs less than your deductible, insurance pays nothing and you cover it all."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "ins2-mastery1",
            question: "You have a $750 deductible and get into an accident with $5,000 in damage. How much does insurance pay (assuming it's under your coverage limit)?",
            options: [
              "$5,000",
              "$750",
              "$4,250",
              "$0"
            ],
            correctAnswer: 2,
            explanation: "You pay the $750 deductible first; insurance covers the rest: $5,000 − $750 = $4,250."
          },
          {
            id: "ins2-mastery2",
            question: "Which term means 'a small fixed amount you pay for a specific service, like a doctor visit'?",
            options: [
              "Deductible",
              "Premium",
              "Co-pay",
              "Coverage limit"
            ],
            correctAnswer: 2,
            explanation: "A co-pay is a fixed charge per service (e.g., $20 per visit). A deductible is what you pay before coverage starts, and a premium is your regular policy payment."
          },
          {
            id: "ins2-mastery3",
            question: "Why does a higher deductible lead to a lower premium?",
            options: [
              "Because the insurer makes more profit, so it gives discounts",
              "Because you're agreeing to pay more yourself before insurance helps, lowering the insurer's risk",
              "Because higher deductibles are illegal to charge for",
              "Because the coverage limit also drops automatically"
            ],
            correctAnswer: 1,
            explanation: "When you take on more of the upfront cost (higher deductible), the insurer's expected payout drops, so they charge you a lower premium."
          },
          {
            id: "ins2-mastery4",
            question: "What's the difference between a deductible and a co-pay?",
            options: [
              "They are the same thing",
              "A deductible is a one-time monthly fee; a co-pay is paid once a year",
              "A deductible is what you pay before insurance starts covering; a co-pay is a fixed fee per service",
              "A co-pay is paid by the insurer; a deductible is paid by the government"
            ],
            correctAnswer: 2,
            explanation: "The deductible is the amount you must pay before insurance contributes; a co-pay is a small fixed fee you pay each time you use a specific service."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // ins-3: Auto Insurance (FL.7.2)
  // ─────────────────────────────────────────────
  {
    lessonId: "ins-3",
    sections: [
      {
        type: "concept",
        title: "Driving in Florida: What the Law Requires and What Actually Protects You",
        paragraphs: [
          "Florida is a 'no-fault' state, which means that after most accidents, your own insurance pays for your medical bills no matter who caused the crash. That's why Florida requires every driver to carry Personal Injury Protection (PIP) — coverage for your own injuries — plus Property Damage Liability (PDL), which pays for damage you cause to other people's property.",
          "There are several types of auto coverage. Liability covers the damage and injuries you cause to others. Collision covers damage to YOUR car from a crash. Comprehensive covers your car from non-crash events like theft, fire, floods, or a tree falling on it. Uninsured/underinsured motorist coverage protects you when the other driver has no insurance — a real risk in Florida, which has one of the highest uninsured-driver rates in the country.",
          "Insurers set your premium based on risk factors: your age (teens pay the most because they crash the most), your driving record (tickets and accidents raise it), the type of car (a sports car costs more to insure than a sedan), and even your ZIP code (busy, theft-prone areas cost more). In many states, minimum liability limits are written in shorthand like 10/20/10: $10,000 per person for injuries, $20,000 per accident for injuries, and $10,000 for property damage. Florida is different — its standard legal minimum is just PIP ($10,000) plus PDL ($10,000), with no bodily-injury liability required for most drivers. That surprisingly thin requirement is a big reason uninsured/underinsured motorist coverage matters so much here."
        ],
        bullets: [
          "Florida is a no-fault state and requires PIP (your injuries) and PDL (others' property).",
          "Liability = damage you cause to others; Collision = your car in a crash; Comprehensive = theft, fire, weather.",
          "Uninsured-motorist coverage matters a lot in Florida due to many uninsured drivers.",
          "Teens pay the highest premiums because statistically they crash most often.",
          "Minimum coverage meets the law but can leave you exposed; full coverage protects your own car too."
        ],
        realWorldExample: "If a hurricane floods your car in a Fort Myers parking lot, collision insurance won't help — that's what comprehensive coverage is for. In flood-prone Florida, comprehensive can be the difference between replacing your car and losing it entirely."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ins3-mc1",
            question: "What does Florida require every driver to carry because it is a 'no-fault' state?",
            options: [
              "Only comprehensive coverage",
              "Personal Injury Protection (PIP) and Property Damage Liability (PDL)",
              "Life insurance",
              "Nothing — Florida has no insurance requirements"
            ],
            correctAnswer: 1,
            explanation: "Florida's no-fault system requires PIP (covers your own injuries regardless of fault) and PDL (covers property damage you cause to others)."
          },
          {
            id: "ins3-mc2",
            question: "Which coverage pays for your car if it's stolen or damaged by a flood?",
            options: [
              "Collision",
              "Liability",
              "Comprehensive",
              "Property Damage Liability"
            ],
            correctAnswer: 2,
            explanation: "Comprehensive covers non-crash events like theft, fire, vandalism, and weather. Collision only covers crash damage to your car."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Eighteen-Year-Olds in Orlando",
        narrative: "Diego and Tyler both turn 18 and buy used cars in Orlando. Diego buys minimum coverage only (the cheapest legal option) to save money. Tyler pays more for full coverage that includes collision and comprehensive. A few months later, both are in separate single-car accidents — each one's own fault — with about $6,000 in damage to their own vehicles.",
        details: [
          "Diego's minimum policy has no collision coverage, so it pays nothing toward his own car's $6,000 in damage.",
          "Diego must pay the full $6,000 himself or drive a wrecked car.",
          "Tyler's full-coverage policy pays for his repairs after his deductible (say $500), so he's out only $500.",
          "Tyler paid higher premiums, but saved roughly $5,500 when the accident actually happened."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ins3-aq1",
          question: "Why did Tyler's full coverage protect his own car while Diego's minimum coverage did not?",
          options: [
            "Because minimum coverage in Florida focuses on others' injuries/property, not damage to your own car",
            "Because Diego didn't pay his premium",
            "Because Tyler's car was newer",
            "Because comprehensive and collision are illegal in Florida"
          ],
          correctAnswer: 0,
          explanation: "Florida's minimum (PIP + PDL) is built to cover your injuries and damage you cause to others — not damage to your own vehicle. Collision/comprehensive (part of full coverage) is what repairs your own car."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Florida is no-fault and legally requires PIP and PDL coverage.",
          "Liability covers others; collision and comprehensive cover your own car.",
          "Comprehensive is key in Florida for theft, floods, and storm damage.",
          "Teen drivers pay the most because of higher statistical crash risk.",
          "Minimum coverage is cheapest but leaves your own car (and big injury costs) unprotected."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "ins3-mastery1",
            question: "What coverage does Florida require because it is a no-fault state?",
            options: [
              "Collision and comprehensive",
              "Personal Injury Protection (PIP) and Property Damage Liability (PDL)",
              "Uninsured motorist only",
              "Full coverage with a $0 deductible"
            ],
            correctAnswer: 1,
            explanation: "Florida requires PIP and PDL. PIP covers your own injuries regardless of fault; PDL covers damage you cause to others' property."
          },
          {
            id: "ins3-mastery2",
            question: "What is the difference between collision and comprehensive coverage?",
            options: [
              "Collision covers crashes with other cars/objects; comprehensive covers theft, fire, and weather",
              "They are identical",
              "Collision covers theft; comprehensive covers crashes",
              "Comprehensive only covers other drivers"
            ],
            correctAnswer: 0,
            explanation: "Collision pays for crash damage to your car; comprehensive pays for non-crash losses like theft, fire, vandalism, and flooding."
          },
          {
            id: "ins3-mastery3",
            question: "Why do teen drivers typically pay higher premiums?",
            options: [
              "Insurers dislike young people",
              "Teens statistically have more accidents, raising their risk to the insurer",
              "It's required by federal law",
              "Teens always buy expensive cars"
            ],
            correctAnswer: 1,
            explanation: "Premiums reflect risk. Because teens have higher crash rates as a group, insurers charge them more."
          },
          {
            id: "ins3-mastery4",
            question: "What does liability coverage protect?",
            options: [
              "Damage to your own car only",
              "Your medical bills only",
              "The injuries and property damage you cause to OTHER people",
              "Theft of your car"
            ],
            correctAnswer: 2,
            explanation: "Liability coverage pays for harm you cause to others — their injuries and property — not your own car or losses."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // ins-4: Renters & Homeowners Insurance (FL.7.2)
  // ─────────────────────────────────────────────
  {
    lessonId: "ins-4",
    sections: [
      {
        type: "concept",
        title: "Protecting Your Stuff and Your Home",
        paragraphs: [
          "Renters insurance protects YOUR belongings — your laptop, clothes, furniture, and electronics — when you rent an apartment or house. It does NOT cover the building itself; that's the landlord's responsibility. A huge surprise for many young renters: if the building burns down or gets robbed, the landlord's insurance covers the structure, but nothing inside that belongs to you. Renters insurance also includes liability coverage if someone gets hurt in your place.",
          "Homeowners insurance is broader because you own the building. It covers the structure, your belongings inside, and liability if someone is injured on your property. In Florida, homeowners insurance is among the most expensive in the country — often $4,000+ per year — largely because of hurricane risk. Renters insurance, by contrast, is remarkably cheap: often just $15 to $30 per month.",
          "Both policies have important gaps. In Florida, standard homeowners and renters policies usually do NOT cover floods or mold — you typically need a separate flood policy (often through the National Flood Insurance Program). It also matters whether your policy pays 'actual cash value' (the depreciated, used value of your stuff) or 'replacement cost' (what it costs to buy new). Replacement cost coverage costs a bit more but pays a lot more when you file a claim."
        ],
        bullets: [
          "Renters insurance covers your belongings and your liability — not the building.",
          "Homeowners insurance covers the building, your belongings, AND liability.",
          "Renters insurance is cheap ($15–$30/month); Florida homeowners often runs $4,000+/year — among the priciest in the U.S.",
          "In Florida, floods are usually NOT covered — you need separate flood insurance.",
          "Replacement cost pays to buy new; actual cash value only pays the depreciated value."
        ],
        realWorldExample: "A college renter who thinks 'my landlord's insurance covers me' learns the hard way after a break-in: the landlord's policy fixes the broken door, but does nothing for the stolen $2,000 laptop and TV. A $18/month renters policy would have replaced them."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ins4-mc1",
            question: "What does renters insurance cover?",
            options: [
              "The apartment building itself",
              "Your personal belongings and your liability",
              "The landlord's mortgage",
              "Nothing — renters can't get insurance"
            ],
            correctAnswer: 1,
            explanation: "Renters insurance covers your stuff and liability. The building is the landlord's responsibility, covered by the landlord's own policy."
          },
          {
            id: "ins4-mc2",
            question: "In Florida, what is usually NOT covered by a standard homeowners policy?",
            options: [
              "Fire damage",
              "Theft",
              "Flood damage",
              "A guest injury on your property"
            ],
            correctAnswer: 2,
            explanation: "Standard policies typically exclude floods (and mold). In flood-prone Florida, you usually need a separate flood insurance policy."
          }
        ]
      },
      {
        type: "scenario",
        title: "Roommates in Tampa",
        narrative: "Andrea and Bianca share an apartment near the University of South Florida in Tampa. Andrea buys renters insurance for $18/month. Bianca skips it to save money, figuring the landlord's policy will protect her. One weekend while they're home for break, the apartment is broken into and about $2,000 worth of electronics are stolen from each of them.",
        details: [
          "The landlord's insurance repairs the broken door and window frame — the building.",
          "Andrea files a renters claim and is reimbursed for her stolen $2,000 in electronics (minus a small deductible).",
          "Bianca has no renters insurance, so the landlord's policy gives her nothing for her stolen items.",
          "Bianca must spend $2,000 of her own money to replace everything; Andrea spent about $216/year on premiums."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ins4-aq1",
          question: "Why did the landlord's insurance NOT replace Bianca's stolen electronics?",
          options: [
            "Because the landlord forgot to pay for it",
            "Because a landlord's policy covers the building, not tenants' personal belongings",
            "Because electronics are never insurable",
            "Because Bianca lived in Florida"
          ],
          correctAnswer: 1,
          explanation: "A landlord's insurance protects the structure they own. Tenants' personal belongings are only covered if the tenant has their own renters insurance — which is exactly why Andrea was reimbursed and Bianca wasn't."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Renters insurance covers your belongings and liability, not the building.",
          "Homeowners insurance covers the structure, contents, and liability.",
          "Florida homeowners insurance is pricey largely due to hurricane risk.",
          "Floods (and mold) usually need separate coverage in Florida.",
          "Replacement cost pays more than actual cash value — worth the small extra premium."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "ins4-mastery1",
            question: "A renter's apartment is burglarized and their belongings are stolen. What covers the renter's belongings?",
            options: [
              "The landlord's insurance",
              "The renter's own renters insurance",
              "Nothing can ever cover stolen items",
              "The city government"
            ],
            correctAnswer: 1,
            explanation: "Only the renter's own renters insurance covers their personal belongings. The landlord's policy covers the building, not tenants' stuff."
          },
          {
            id: "ins4-mastery2",
            question: "Why do many Florida homeowners need a SEPARATE flood insurance policy?",
            options: [
              "Because floods are illegal to insure normally",
              "Because standard homeowners policies typically exclude flood damage",
              "Because flood insurance is free in Florida",
              "Because floods never happen in Florida"
            ],
            correctAnswer: 1,
            explanation: "Standard homeowners policies usually exclude flood damage, so flood-prone Florida residents often buy separate flood insurance."
          },
          {
            id: "ins4-mastery3",
            question: "What is the difference between a landlord's coverage and a tenant's coverage?",
            options: [
              "The landlord covers the building; the tenant's renters insurance covers the tenant's belongings",
              "They cover exactly the same things",
              "The tenant covers the building; the landlord covers the tenant's belongings",
              "Neither covers anything"
            ],
            correctAnswer: 0,
            explanation: "Landlord insurance protects the structure they own; the tenant's renters insurance protects the tenant's personal property and liability."
          },
          {
            id: "ins4-mastery4",
            question: "What's the difference between 'actual cash value' and 'replacement cost' coverage?",
            options: [
              "Actual cash value pays to buy new items; replacement cost pays the used value",
              "Replacement cost pays to buy new items; actual cash value pays the depreciated (used) value",
              "They are identical terms",
              "Both only apply to cars"
            ],
            correctAnswer: 1,
            explanation: "Replacement cost reimburses what it costs to buy the item new. Actual cash value only pays the depreciated, used value — so it pays out less."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // ins-5: Health Insurance (FL.7.2, FL.7.3)
  // ─────────────────────────────────────────────
  {
    lessonId: "ins-5",
    sections: [
      {
        type: "concept",
        title: "Decoding Your Health Insurance Card",
        paragraphs: [
          "Health insurance helps pay for doctor visits, hospital stays, prescriptions, and emergencies. It works through the same building blocks you've learned — premium, deductible, co-pay, out-of-pocket maximum — plus one more: co-insurance, which is a percentage you pay after meeting your deductible (for example, you pay 20% and the insurer pays 80% until you hit your out-of-pocket max).",
          "Plans differ in how they handle your choice of doctors. An HMO is usually cheaper but requires you to stay within a set network and get referrals to see specialists. A PPO costs more but lets you see more doctors, including out-of-network, with more freedom. An HDHP (High-Deductible Health Plan) has low premiums but a high deductible, and often pairs with a tax-advantaged Health Savings Account. The word 'network' matters a lot: staying in-network costs far less than going out-of-network, where you pay much more.",
          "How do young people get covered? You can usually stay on a parent's plan until age 26. After that, you might get coverage through an employer (often the cheapest because employers pay part of the premium), or buy your own through the ACA 'Marketplace' (HealthCare.gov), where you might qualify for subsidies based on income. The key lesson: going without health insurance leaves you exposed to bills that can reach tens of thousands of dollars for a single emergency."
        ],
        bullets: [
          "Co-insurance is a percentage you pay after your deductible (e.g., you 20% / insurer 80%).",
          "HMO = cheaper, network-restricted, needs referrals; PPO = pricier, more flexible.",
          "HDHP = low premium, high deductible, often paired with an HSA.",
          "In-network care costs far less than out-of-network care.",
          "You can stay on a parent's plan until age 26; then use an employer plan or the ACA Marketplace."
        ],
        realWorldExample: "A single ER visit for a broken arm can be billed at $2,500+. Without insurance you owe all of it; with insurance you might owe a co-pay plus co-insurance up to your out-of-pocket max — and once you hit that max, the insurer covers 100% for the rest of the year."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ins5-mc1",
            question: "What is co-insurance?",
            options: [
              "A second insurance company that backs up the first",
              "A percentage of costs you pay after meeting your deductible",
              "The monthly premium",
              "A fee for switching doctors"
            ],
            correctAnswer: 1,
            explanation: "Co-insurance is the percentage share you pay (e.g., 20%) after your deductible is met, until you reach your out-of-pocket maximum."
          },
          {
            id: "ins5-mc2",
            question: "Until what age can you typically stay on a parent's health insurance plan?",
            options: [
              "18",
              "21",
              "26",
              "30"
            ],
            correctAnswer: 2,
            explanation: "Under current U.S. law, young adults can usually remain on a parent's health plan until they turn 26."
          }
        ]
      },
      {
        type: "scenario",
        title: "Jaylen's Emergency Surgery",
        narrative: "Jaylen, 19, is a college student in Gainesville covered by a student health plan. One night he develops severe stomach pain and needs emergency appendix surgery. The hospital bill totals $28,000. Jaylen is terrified — until he reviews how his insurance applies.",
        details: [
          "Jaylen's plan has a $1,500 deductible, which he pays first.",
          "After the deductible, his 20% co-insurance would owe thousands more — but his plan's $2,000 out-of-pocket maximum caps his co-insurance at just $500.",
          "His total out-of-pocket cost is capped at $2,000 — far below the full $28,000. That's the out-of-pocket max doing its job.",
          "A classmate with no insurance who had the same surgery owes the entire $28,000 and is offered a multi-year payment plan."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ins5-aq1",
          question: "Why did Jaylen pay about $2,000 while his uninsured classmate owed $28,000 for the same surgery?",
          options: [
            "Because Jaylen's hospital was cheaper",
            "Because Jaylen's insurance covered the bulk of the bill after his deductible and co-insurance",
            "Because the classmate chose a worse surgeon",
            "Because uninsured patients always get charged double on purpose"
          ],
          correctAnswer: 1,
          explanation: "Insurance capped Jaylen's exposure: he paid his deductible plus co-insurance (about $2,000), and the insurer covered the rest. The uninsured classmate had no such protection and owed the full $28,000."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Health insurance uses premium, deductible, co-pay, co-insurance, and an out-of-pocket maximum.",
          "HMO is cheaper but restrictive; PPO is pricier but flexible; HDHP has low premiums and high deductibles.",
          "Staying in-network dramatically lowers your costs.",
          "You can usually stay on a parent's plan until 26, then use employer or Marketplace coverage.",
          "Going uninsured exposes you to bills that can reach tens of thousands of dollars."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "ins5-mastery1",
            question: "Why does seeing an out-of-network doctor usually cost more than an in-network one?",
            options: [
              "Out-of-network doctors are always better",
              "The insurer has negotiated lower rates with in-network providers, so out-of-network care costs you much more",
              "In-network care is illegal",
              "There is no real difference"
            ],
            correctAnswer: 1,
            explanation: "Insurers negotiate discounted rates with in-network providers. Out-of-network providers haven't agreed to those rates, so you pay significantly more."
          },
          {
            id: "ins5-mastery2",
            question: "What does the out-of-pocket maximum do for you?",
            options: [
              "It's the most the insurer will ever pay",
              "It caps how much YOU pay in a year; after that, insurance covers 100%",
              "It's your monthly premium",
              "It's a penalty for switching plans"
            ],
            correctAnswer: 1,
            explanation: "The out-of-pocket maximum is the yearly ceiling on your own spending. Once you hit it, the insurer pays 100% of covered costs for the rest of the year."
          },
          {
            id: "ins5-mastery3",
            question: "What is a key difference between an HMO and a PPO?",
            options: [
              "An HMO lets you see any doctor anywhere with no referrals; a PPO is very restrictive",
              "An HMO is usually cheaper but restricts you to a network and needs referrals; a PPO is pricier but more flexible",
              "They are exactly the same",
              "A PPO has no premiums at all"
            ],
            correctAnswer: 1,
            explanation: "HMOs are typically cheaper but keep you in-network and require referrals to specialists. PPOs cost more but offer more freedom, including out-of-network options."
          },
          {
            id: "ins5-mastery4",
            question: "A 25-year-old loses access to their parent's plan next year. Why?",
            options: [
              "Because health insurance ends at 25",
              "Because young adults can typically stay on a parent's plan only until they turn 26",
              "Because they got a job",
              "Because they moved out of Florida"
            ],
            correctAnswer: 1,
            explanation: "Coverage on a parent's plan generally ends at age 26, so the person will need employer or Marketplace coverage after that."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // ins-6: Life & Disability Insurance (FL.7.2)
  // ─────────────────────────────────────────────
  {
    lessonId: "ins-6",
    sections: [
      {
        type: "concept",
        title: "Protecting the People Who Depend on Your Income",
        paragraphs: [
          "Life insurance pays money to the people you choose (your beneficiaries) when you die. Its main purpose is to protect anyone who depends on your income — like a spouse, kids, or a relative you support. If no one relies on your income, you may not need it yet; if people do, it can keep them financially afloat after you're gone. There are two main types: term life (covers you for a set period, like 20 years, and is cheap) and whole life (lasts your whole life and builds cash value, but costs much more).",
          "Disability insurance is the one most people forget, even though you're statistically more likely to become disabled during your working years than to die young. It replaces a portion of your income if illness or injury prevents you from working. Short-term disability covers a few weeks to months; long-term disability can cover years. Many employers offer some disability coverage as a benefit, which is often the easiest and cheapest way to get it.",
          "Here's the priority logic: term life is the smart starting point for most young families because it's affordable and covers the years when your kids are growing up and your mortgage is being paid off. Whole life is more of a specialized tool. And disability insurance protects the asset that funds everything else — your ability to earn. Losing your income for a year due to injury can be more financially damaging than almost anything else."
        ],
        bullets: [
          "Life insurance pays your beneficiaries when you die — most important if others depend on your income.",
          "Term life is cheap and covers a set period; whole life is costly but permanent and builds cash value.",
          "Disability insurance replaces income if you can't work due to illness or injury.",
          "Short-term disability covers weeks/months; long-term covers years.",
          "Employer benefits are often the easiest, cheapest way to get disability and basic life coverage."
        ],
        realWorldExample: "A 30-year-old parent earning $60,000 can often buy a 20-year, $500,000 term life policy for around $25–$35/month. If they pass away, that payout can replace years of income for their kids — something whole life would cost several times more to provide."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ins6-mc1",
            question: "Who has the GREATEST need for life insurance?",
            options: [
              "A single 18-year-old with no dependents and no debt",
              "A parent whose children depend on their income",
              "A retiree with no family",
              "A teenager with a part-time job"
            ],
            correctAnswer: 1,
            explanation: "Life insurance matters most when people depend on your income. A parent supporting children has the clearest need; someone with no dependents has little need for it yet."
          },
          {
            id: "ins6-mc2",
            question: "What does disability insurance do?",
            options: [
              "Pays your beneficiaries when you die",
              "Replaces part of your income if you can't work due to illness or injury",
              "Covers your car repairs",
              "Pays off your credit cards automatically"
            ],
            correctAnswer: 1,
            explanation: "Disability insurance replaces a portion of your income when an illness or injury keeps you from working — protecting your ability to earn."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Thirty-Year-Olds, One Accident",
        narrative: "Marcus and Andre are both 30, both work, and both have young families. Marcus carries term life insurance and disability insurance (partly through his employer). Andre has neither, figuring he's young and healthy. One winter, Andre is in a serious car accident and can't work for six months. Separately, the story considers what would happen to each family if the breadwinner died.",
        details: [
          "Andre has no disability insurance, so his income stops completely for six months while he recovers.",
          "Marcus's disability coverage replaces a large portion of his income during a similar recovery, keeping his family stable.",
          "If Andre died, his family would receive nothing and could lose their home without his income.",
          "If Marcus died, his term life policy would pay his family a lump sum to replace years of lost income."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ins6-aq1",
          question: "During his six-month recovery, why was Marcus's family financially stable while Andre's was in crisis?",
          options: [
            "Marcus had a higher salary",
            "Marcus's disability insurance replaced much of his income while he couldn't work; Andre had none",
            "Andre's accident was more expensive to treat",
            "Marcus's employer paid his full salary out of kindness"
          ],
          correctAnswer: 1,
          explanation: "Disability insurance replaced Marcus's income during recovery, so his family kept paying their bills. Andre had no such coverage, so his income simply stopped — putting his family in crisis."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Life insurance protects people who depend on your income.",
          "Term life is affordable and time-limited; whole life is permanent, pricier, and builds cash value.",
          "Disability insurance replaces income when you can't work — a commonly overlooked protection.",
          "Short-term vs long-term disability differ by how long benefits last.",
          "Employer benefits are often the simplest, cheapest way to start both coverages."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "ins6-mastery1",
            question: "Who MOST needs life insurance?",
            options: [
              "Anyone, equally, regardless of dependents",
              "People whose income others depend on, like parents with children",
              "Only retirees",
              "Only people without jobs"
            ],
            correctAnswer: 1,
            explanation: "The clearest need is when others rely on your income. Parents supporting children are a classic example."
          },
          {
            id: "ins6-mastery2",
            question: "What is the key difference between term and whole life insurance?",
            options: [
              "Term lasts your whole life; whole life expires after a set period",
              "Term covers a set period and is cheaper; whole life is permanent, costs more, and builds cash value",
              "They are identical",
              "Whole life is only for teenagers"
            ],
            correctAnswer: 1,
            explanation: "Term covers a fixed number of years at a low cost; whole life is permanent, more expensive, and accumulates cash value."
          },
          {
            id: "ins6-mastery3",
            question: "What does disability insurance cover?",
            options: [
              "Funeral costs",
              "A portion of your income when illness or injury keeps you from working",
              "Damage to your home",
              "Your children's college tuition"
            ],
            correctAnswer: 1,
            explanation: "Disability insurance replaces part of your income if you become unable to work due to illness or injury."
          },
          {
            id: "ins6-mastery4",
            question: "What is short-term disability insurance through an employer?",
            options: [
              "Coverage that replaces income for a short stretch (weeks to a few months) when you can't work",
              "A life insurance payout",
              "A permanent income replacement for life",
              "A type of health co-pay"
            ],
            correctAnswer: 0,
            explanation: "Short-term disability replaces income for a limited period (typically weeks to a few months), often offered as an employer benefit."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // ins-7: Identity Theft — Prevention & Recovery (FL.7.4)
  // ─────────────────────────────────────────────
  {
    lessonId: "ins-7",
    sections: [
      {
        type: "concept",
        title: "When Someone Steals Your Most Valuable Asset: Your Identity",
        paragraphs: [
          "Identity theft happens when someone uses your personal information — your Social Security number (SSN), credit card, or login details — to commit fraud in your name. It comes in several forms: financial identity theft (opening credit cards or loans as you), medical identity theft (using your insurance for treatment), and tax fraud (filing a fake tax return to steal your refund). Teens are surprisingly common targets because their clean, unused credit histories can go unnoticed for years.",
          "Prevention is mostly about controlling access to your information. Freeze your credit (a free tool that blocks new accounts from being opened in your name), use strong, unique passwords, turn on two-factor authentication (2FA), and never share your SSN unless absolutely required. You're entitled to a free credit report each year at AnnualCreditReport.com — checking it regularly is how you catch fraud early.",
          "If your identity IS stolen, there's a clear recovery process. The official starting point is reporting at IdentityTheft.gov (the FTC's site), which generates a personalized recovery plan. From there: place a fraud alert, freeze your credit, file the FTC report (and often a police report), dispute the fraudulent charges and accounts, and keep records of everything. Acting fast limits the damage and shifts the responsibility off you."
        ],
        bullets: [
          "Identity theft = someone using your SSN, cards, or logins for fraud.",
          "Common types: financial, medical, and tax identity theft.",
          "Prevent it: freeze credit, strong unique passwords, 2FA, guard your SSN.",
          "Check your free credit report yearly at AnnualCreditReport.com to catch fraud early.",
          "Recover at IdentityTheft.gov: fraud alert, credit freeze, FTC report, dispute charges."
        ],
        realWorldExample: "A thief who gets your SSN can open a credit card, run up $3,000, and never pay — and you won't know until a collector calls or you're denied a loan. A free credit freeze would have blocked that new account from ever being opened."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ins7-mc1",
            question: "What does a credit freeze do?",
            options: [
              "Locks your money so you can't spend it",
              "Blocks new accounts from being opened in your name",
              "Erases your credit history",
              "Automatically raises your credit score"
            ],
            correctAnswer: 1,
            explanation: "A credit freeze blocks lenders from opening new accounts in your name, which stops most financial identity theft. It's free and doesn't hurt your score."
          },
          {
            id: "ins7-mc2",
            question: "Where can you get your free annual credit report?",
            options: [
              "AnnualCreditReport.com",
              "Any random website that offers 'free scores'",
              "Your bank's ATM",
              "You can't get it for free"
            ],
            correctAnswer: 0,
            explanation: "AnnualCreditReport.com is the official, federally authorized site for your free yearly credit reports from the three major bureaus."
          }
        ]
      },
      {
        type: "scenario",
        title: "Maya's Surprise Denial",
        narrative: "Maya, 16, lives in Fort Lauderdale and has never checked her credit — she figures she's too young to have any. At 18, she applies for her first credit card and is denied. Confused, she pulls her credit report and discovers that someone opened three fraudulent accounts in her name when she was 14, using her stolen SSN. The accounts are unpaid and have wrecked a credit history she didn't even know she had.",
        details: [
          "A thief used Maya's SSN at age 14 to open accounts she never knew existed.",
          "Because Maya never checked her credit, the fraud went undetected for years.",
          "The unpaid fraudulent accounts dragged down her credit, causing the denial at 18.",
          "Maya begins the recovery process to clear her name and restore her credit."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ins7-aq1",
          question: "What is the recommended FIRST step for Maya to begin recovering from identity theft?",
          options: [
            "Ignore it since she's young",
            "Report the theft at IdentityTheft.gov to get an official recovery plan, then place a fraud alert/freeze",
            "Open more credit cards to rebuild quickly",
            "Pay off the fraudulent accounts herself"
          ],
          correctAnswer: 1,
          explanation: "The official first move is reporting at IdentityTheft.gov, which creates a personalized recovery plan, followed by a fraud alert and credit freeze. She should never pay fraudulent debts as if they're hers."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Identity theft is the fraudulent use of your personal information; teens are common targets.",
          "Types include financial, medical, and tax identity theft.",
          "Prevent it with credit freezes, strong unique passwords, 2FA, and guarding your SSN.",
          "Check your free credit report yearly at AnnualCreditReport.com to catch fraud early.",
          "Recover by starting at IdentityTheft.gov, then fraud alert, freeze, report, and disputes."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "ins7-mastery1",
            question: "What is the recommended first step if your identity is stolen?",
            options: [
              "Close all your bank accounts immediately",
              "Report it at IdentityTheft.gov to get an official recovery plan",
              "Wait a year to see if it resolves itself",
              "Post about it on social media"
            ],
            correctAnswer: 1,
            explanation: "IdentityTheft.gov (the FTC) is the official starting point and generates a step-by-step recovery plan tailored to your situation."
          },
          {
            id: "ins7-mastery2",
            question: "How can you get a free credit report each year?",
            options: [
              "Pay a credit bureau directly",
              "Request it at the official AnnualCreditReport.com",
              "Ask your employer",
              "It's never free"
            ],
            correctAnswer: 1,
            explanation: "Federal law entitles you to free annual reports through AnnualCreditReport.com from each of the three major bureaus."
          },
          {
            id: "ins7-mastery3",
            question: "What does freezing your credit accomplish?",
            options: [
              "It prevents new accounts from being opened in your name",
              "It deletes your debts",
              "It boosts your credit score instantly",
              "It locks you out of your own bank account"
            ],
            correctAnswer: 0,
            explanation: "A credit freeze stops lenders from opening new accounts in your name — a powerful, free defense against identity theft."
          },
          {
            id: "ins7-mastery4",
            question: "Which piece of personal information do identity thieves target most because it unlocks so much?",
            options: [
              "Your favorite color",
              "Your Social Security number (SSN)",
              "Your home address only",
              "Your phone's wallpaper"
            ],
            correctAnswer: 1,
            explanation: "The SSN is the master key to your financial identity — thieves prize it because it lets them open accounts and file fraud in your name."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // ins-8: Wills, Inheritance & Financial Planning (FL.7.5, FL.7.6)
  // ─────────────────────────────────────────────
  {
    lessonId: "ins-8",
    sections: [
      {
        type: "concept",
        title: "Building a Plan That Outlives You",
        paragraphs: [
          "Financial planning means setting clear goals — short, medium, and long term — and building steps to reach them. A widely used order of priorities looks like this: build a small emergency fund, pay off high-interest debt, invest for the future, protect what you have with insurance, and finally create an estate plan. A helpful tool for setting goals is the SMART framework: Specific, Measurable, Achievable, Relevant, and Time-bound (for example, 'save $1,000 for emergencies in 6 months' instead of 'save more money').",
          "A will is a legal document that says who gets your assets and who cares for any dependents when you die. Young adults often think wills are only for the old or wealthy, but even a simple will — plus medical directives that state your healthcare wishes — prevents confusion and family conflict. Just as important are beneficiary designations: the names you put on accounts like life insurance, a 401(k), or a bank account that direct the money straight to that person, often bypassing the long court process.",
          "If you die without a will, you die 'intestate,' and the state decides who gets your assets using a fixed legal formula called intestate succession. In Florida, that means the law — not you — chooses how your property is divided among relatives, which can be slow, public, and not what you would have wanted. Having a will and up-to-date beneficiary designations keeps you in control."
        ],
        bullets: [
          "Financial planning sets short-, medium-, and long-term goals with concrete steps.",
          "Common priority order: emergency fund → pay off high-interest debt → invest → insure → estate plan.",
          "SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound.",
          "A will names who gets your assets and who cares for dependents; medical directives state health wishes.",
          "Dying without a will (intestate) means Florida law decides who inherits."
        ],
        realWorldExample: "A 23-year-old with a $50,000 life insurance policy who names their younger sibling as beneficiary ensures that money goes directly to the sibling — fast and outside of court — even without a full estate plan. That single beneficiary line can matter more than a long legal document."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ins8-mc1",
            question: "What does it mean to die 'intestate'?",
            options: [
              "To die with a detailed will",
              "To die without a will, so the state decides who inherits your assets",
              "To die owing no debts",
              "To die in another state"
            ],
            correctAnswer: 1,
            explanation: "Dying intestate means having no valid will, so state law (intestate succession) determines how your assets are distributed."
          },
          {
            id: "ins8-mc2",
            question: "In the common order of financial priorities, what generally comes FIRST?",
            options: [
              "Investing aggressively in stocks",
              "Building an emergency fund",
              "Writing a will",
              "Buying whole life insurance"
            ],
            correctAnswer: 1,
            explanation: "An emergency fund comes first — it's the foundation that keeps a surprise expense from forcing you into debt while you pursue other goals."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Cousins in Jacksonville",
        narrative: "Camila and her cousin Hector, both 25, live in Jacksonville. Camila has taken steps: a simple will, beneficiary designations on her bank and life insurance accounts, and a basic financial plan. Hector has none of these, figuring he's too young to bother. Tragically, one of them dies unexpectedly in an accident, and the family must sort out what happens to their assets.",
        details: [
          "Camila's beneficiary designations send her accounts directly to the people she chose, quickly and outside of court.",
          "Camila's will clearly states her wishes, preventing family disputes.",
          "Because Hector had no will, Florida's intestate succession laws decide who gets his assets.",
          "Hector's family faces a slower, public court process and an outcome he never got to choose."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ins8-aq1",
          question: "Why did Camila's assets transfer smoothly while Hector's went through a court-controlled process?",
          options: [
            "Camila had more money",
            "Camila had a will and beneficiary designations, while Hector died intestate and Florida law took over",
            "Hector lived outside Florida",
            "Beneficiary designations are illegal in Florida"
          ],
          correctAnswer: 1,
          explanation: "Camila's will and beneficiary designations directed her assets according to her wishes, often bypassing court. Hector had neither, so Florida's intestate succession laws controlled the outcome."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Financial planning means setting SMART goals and following a clear order of priorities.",
          "A common priority order is emergency fund → pay off debt → invest → insure → estate plan.",
          "A will names who inherits your assets and who cares for dependents.",
          "Beneficiary designations send specific accounts straight to named people, often skipping court.",
          "Dying intestate (without a will) hands the decision to state law — in Florida, intestate succession."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "ins8-mastery1",
            question: "What is intestate succession?",
            options: [
              "The process of writing a detailed will",
              "The state's legal formula for distributing assets when someone dies without a will",
              "A type of life insurance",
              "A way to avoid all taxes"
            ],
            correctAnswer: 1,
            explanation: "Intestate succession is the set of state laws that decide who inherits when a person dies without a valid will."
          },
          {
            id: "ins8-mastery2",
            question: "Why might even a young adult want a will?",
            options: [
              "Wills are only useful for the elderly",
              "To control who gets their assets and to state their wishes, avoiding family conflict and state default rules",
              "Because the law forces everyone over 18 to have one",
              "To increase their credit score"
            ],
            correctAnswer: 1,
            explanation: "A will lets anyone — at any age — decide who receives their assets and care for dependents, rather than leaving it to state default rules."
          },
          {
            id: "ins8-mastery3",
            question: "What is a beneficiary designation?",
            options: [
              "A tax you pay when you inherit money",
              "The named person who receives a specific account (like life insurance or a 401k) directly",
              "A type of credit score",
              "A government ID number"
            ],
            correctAnswer: 1,
            explanation: "A beneficiary designation names who gets a specific account's money directly, often bypassing the court process entirely."
          },
          {
            id: "ins8-mastery4",
            question: "What is the correct first priority in the common financial planning order?",
            options: [
              "Buy stocks before anything else",
              "Build an emergency fund first",
              "Write a will before saving anything",
              "Take on debt to invest"
            ],
            correctAnswer: 1,
            explanation: "Building an emergency fund comes first; it protects you from going into debt when surprise expenses hit, creating a stable base for everything else."
          }
        ]
      }
    ]
  }
]
