import { StructuredLessonContent } from "@/types"

// Deepened lesson content (Mortgages-depth rebuild) for: AP microeconomics units 2-6.
// Unit 1 (apm-1-x) already ships full content in apMicroUnit1.ts, so this file
// covers apm-2-x through apm-6-x. Each entry replaces the thin auto-generated
// version for its lessonId.
export const deepApMicro: StructuredLessonContent[] = [
  // ═══════════════════════════════════════════════
  // UNIT 2: SUPPLY AND DEMAND (apm-2-x)
  // ═══════════════════════════════════════════════
  {
    lessonId: "apm-2-1",
    sections: [
      {
        type: "concept",
        title: "The Law of Demand and the Demand Curve",
        paragraphs: [
          "Demand is the whole relationship between the price of a good and how much people are willing and able to buy at each price. The law of demand says that, holding everything else constant, when price rises quantity demanded falls, and when price drops quantity demanded rises. Think of concert tickets: at $200 maybe 1,000 teens buy, at $100 maybe 3,000 buy, at $40 maybe 8,000 buy. Graph price on the vertical axis and quantity on the horizontal axis and this pattern draws a line that slopes down from upper-left to lower-right.",
          "Two forces explain that downward slope. The substitution effect: when a good gets pricier, buyers switch to cheaper alternatives, so if pizza jumps to $30 you order tacos instead. The income effect: a higher price makes your fixed allowance buy less overall, so you feel poorer and cut back. Both push quantity demanded down as price rises. A crucial vocabulary point tested constantly on the AP exam: a price change causes a movement ALONG the demand curve (a change in 'quantity demanded'), not a shift of the whole curve.",
          "The demand curve is drawn for a single moment with everything but price frozen. That freezing is the phrase 'ceteris paribus,' meaning 'all else equal.' If the price of the good itself changes, you slide to a new point on the same curve. Only when something OTHER than the good's own price changes does the entire curve pick up and move. Keeping that distinction straight is the single most common thing graders check, so anchor it now: own price equals movement, everything else equals shift."
        ],
        bullets: [
          "Demand links each possible price to the quantity buyers will purchase at that price.",
          "Law of demand: higher price lowers quantity demanded, lower price raises it (curve slopes down).",
          "The substitution effect and income effect together explain the downward slope.",
          "A change in the good's own price is a movement along the curve, not a shift.",
          "The curve is drawn ceteris paribus - all non-price factors are held constant."
        ],
        realWorldExample: "A boba shop sees this daily: at $7 a cup it sells 40 drinks an afternoon, at $5 it sells 90, and at $3 it sells 160. Those points, plotted from high price and low quantity down to low price and high quantity, trace out a downward-sloping demand curve."
      },
      {
        type: "concept",
        title: "What Shifts the Whole Demand Curve",
        paragraphs: [
          "A demand shift means buyers now want more (or less) at EVERY price, so the entire curve moves right (increase) or left (decrease). A handy memory list is TRIBE: Tastes, Related goods, Income, Buyers, and Expectations. Tastes: a viral trend makes a shoe suddenly desirable, shifting demand right. Number of Buyers: a new dorm opening near a cafe means more customers at every price. Expectations: if shoppers expect prices to jump next week, they buy more today, shifting current demand right.",
          "Related goods split into two types. Substitutes are goods used instead of each other, like Pepsi and Coke; if Pepsi's price rises, people buy more Coke, so Coke's demand shifts right. Complements are used together, like phones and cases; if phones get cheaper and more people buy them, demand for cases shifts right too. Income effects depend on the good type: for a normal good (most things), more income shifts demand right. For an inferior good like instant ramen or a used bus pass, more income shifts demand LEFT because people upgrade to nicer options.",
          "Distinguishing normal from inferior goods trips up many students, so tie it to real life. When a teen's part-time paycheck grows, they buy more concert tickets and restaurant meals - normal goods, demand rises. But they buy less cup ramen and fewer thrift-store clothes, trading up to better substitutes - inferior goods, demand falls. The good itself isn't 'bad'; 'inferior' only means demand moves opposite to income. Nail these five shifters and you can predict which way any demand curve jumps."
        ],
        bullets: [
          "A shift = more or less demanded at every price; right is an increase, left is a decrease.",
          "TRIBE shifters: Tastes, Related goods, Income, Buyers, Expectations.",
          "Substitutes move demand the same direction as the other good's price; complements move it opposite.",
          "Normal goods: demand rises with income; inferior goods: demand falls with income.",
          "A shifter is anything except the good's own price - that stays a movement along the curve."
        ],
        realWorldExample: "When a hit show makes a certain sneaker famous, demand shifts right - at $120 buyers now want 5,000 pairs instead of 2,000. When those same buyers get summer jobs and more income, demand for the pricey sneakers rises further, while their demand for cheap flip-flops (an inferior good) falls."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-2-1-mc1",
            question: "The price of a good rises while nothing else changes. What happens on its demand curve?",
            options: [
              "The whole curve shifts to the left",
              "You move upward along the same curve",
              "The whole curve shifts to the right",
              "The whole curve becomes perfectly flat and horizontal"
            ],
            correctAnswer: 1,
            explanation: "A change in the good's OWN price is a movement along the curve - here, up and to the left to a smaller quantity demanded. Only non-price factors shift the entire curve."
          },
          {
            id: "apm-2-1-mc2",
            question: "Incomes rise, and buyers purchase LESS cup ramen at every price. Cup ramen is best described as…",
            options: [
              "A direct complement to a buyer's income",
              "A normal good in this market",
              "An inferior good in this market",
              "A perfectly elastic good with flat demand"
            ],
            correctAnswer: 2,
            explanation: "For an inferior good, higher income shifts demand left because buyers trade up to better options. The demand for ramen moving opposite to income is exactly what defines it as inferior."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Campus Coffee Cart",
        narrative: "Jordan runs a coffee cart outside a high school. He notices that when he charges $4 he sells 60 cups a morning, and when he drops the price to $3 he sells 95. Then two things happen in one week: a popular teacher tells students coffee helps them focus, and the price of the tea sold next door doubles.",
        details: [
          "Dropping his price from $4 to $3 and selling more cups is a movement along his demand curve, not a shift.",
          "The teacher's endorsement is a change in tastes, shifting Jordan's demand curve to the right at every price.",
          "Tea is a substitute for coffee, so tea's higher price also shifts coffee demand to the right.",
          "With both shifters pushing the same way, Jordan can now sell more cups at any given price than before."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-2-1-aq1",
          question: "Both the tastes change and the tea price rise hit Jordan's coffee at once. What is the BEST prediction for his coffee demand curve?",
          options: [
            "It stays fixed but he moves down along it",
            "It shifts right because two shifters raise demand",
            "It shifts to the left because coffee suddenly became much pricier",
            "It flattens out completely into one perfectly horizontal line"
          ],
          correctAnswer: 1,
          explanation: "Improved tastes and a pricier substitute (tea) each raise demand for coffee at every price, so the whole curve shifts right. Coffee's own price didn't change, so this is a shift, not a movement."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Demand is the price-to-quantity relationship; the law of demand makes the curve slope downward.",
          "The substitution and income effects explain why higher prices reduce quantity demanded.",
          "The good's own price causes a movement along the curve; other factors cause a shift.",
          "TRIBE shifters - Tastes, Related goods, Income, Buyers, Expectations - move the whole curve.",
          "Normal goods rise with income; inferior goods fall with income; substitutes and complements differ in direction."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-2-1-mastery1",
            question: "Which change causes a movement ALONG a demand curve rather than a shift?",
            options: [
              "A rise in buyers' average income",
              "A change in the good's own price",
              "A new advertising campaign for the good",
              "A drop in the price of a substitute"
            ],
            correctAnswer: 1,
            explanation: "Only a change in the good's OWN price moves you along the curve. Income, advertising, and substitute prices are shifters that move the entire curve."
          },
          {
            id: "apm-2-1-mastery2",
            question: "Coke and Pepsi are substitutes. If Pepsi's price rises sharply, demand for Coke will…",
            options: [
              "Shift left as buyers avoid both drinks",
              "Shift right as buyers switch to Coke",
              "Stay completely fixed since only the Pepsi price changed",
              "Move steadily down along its own existing curve"
            ],
            correctAnswer: 1,
            explanation: "When a substitute becomes more expensive, buyers switch to the alternative, so Coke's demand shifts right. Substitutes' demand moves the same direction as the other good's price."
          },
          {
            id: "apm-2-1-mastery3",
            question: "Which pair of goods are complements?",
            options: [
              "Tacos and burritos for a hungry buyer",
              "Printers and the ink cartridges they use",
              "City bus rides and someone's own personal car trips",
              "Regular butter and the much cheaper margarine spreads sold nearby"
            ],
            correctAnswer: 1,
            explanation: "Complements are used together, like printers and ink. The others are substitutes - goods used instead of each other, whose demand moves the opposite direction from complements."
          },
          {
            id: "apm-2-1-mastery4",
            question: "The substitution effect helps explain the downward slope of demand because…",
            options: [
              "Firms will always immediately cut their output when their costs rise",
              "Buyers switch to cheaper goods as a price rises",
              "Governments always step in to cap prices during any shortage",
              "Household incomes automatically fall a little bit every single year"
            ],
            correctAnswer: 1,
            explanation: "As a good's price rises, buyers substitute toward cheaper alternatives, lowering quantity demanded. That switching is the substitution effect behind the law of demand."
          },
          {
            id: "apm-2-1-mastery5",
            question: "Shoppers expect laptop prices to jump next month. What happens to CURRENT laptop demand?",
            options: [
              "It shifts to the left as many buyers simply wait it out",
              "It shifts right as buyers rush to buy now",
              "It stays exactly the very same as it is today",
              "It slides steadily down along the current existing curve"
            ],
            correctAnswer: 1,
            explanation: "Expectations of higher future prices push buyers to purchase today, shifting current demand right. Expectations are the E in the TRIBE list of demand shifters."
          },
          {
            id: "apm-2-1-mastery6",
            question: "A good is 'inferior' when…",
            options: [
              "It is poorly made and breaks quickly",
              "Its demand falls as buyers' income rises",
              "Its price can never fall below cost",
              "It has no close substitutes at all"
            ],
            correctAnswer: 1,
            explanation: "Inferior is about income, not quality: demand for the good falls as income rises because buyers trade up. The good itself may work fine - the label is purely economic."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-2-2",
    sections: [
      {
        type: "concept",
        title: "The Law of Supply and the Supply Curve",
        paragraphs: [
          "Supply is the relationship between a good's price and how much sellers are willing and able to produce and offer for sale at each price. The law of supply says that, holding all else constant, a higher price leads sellers to offer a larger quantity, and a lower price leads them to offer less. Plot price on the vertical axis and quantity on the horizontal axis and supply slopes UPWARD from lower-left to upper-right - the mirror image of demand. At $2 a bracelet a maker might produce 20; at $6 the same maker produces 70.",
          "Why does the supply curve slope up? Higher prices mean bigger profit per unit, which is a reward that pulls sellers to make more - they'll work extra hours or buy more materials. Higher prices also cover the rising marginal cost of squeezing out more output; producing the 100th unit usually costs more than the 10th, so sellers only bother if the price makes it worthwhile. Just like demand, a change in the good's OWN price is a movement ALONG the supply curve (a change in 'quantity supplied'), never a shift.",
          "The curve is drawn ceteris paribus, with every non-price factor frozen. If the good's own price changes, you slide to a new point on the same supply curve. When something else changes - a cost, a technology, a tax - the entire curve lifts up or moves down. Graders check this movement-versus-shift distinction as strictly for supply as for demand, so lock it in: own price is a movement, anything else is a shift."
        ],
        bullets: [
          "Supply links each price to the quantity sellers will produce and offer at that price.",
          "Law of supply: higher price raises quantity supplied, lower price lowers it (curve slopes up).",
          "Higher prices attract more output because they boost profit and cover rising marginal cost.",
          "A change in the good's own price is a movement along the supply curve, not a shift.",
          "The curve holds all non-price factors constant (ceteris paribus)."
        ],
        realWorldExample: "A student who bakes cookies to sell will make only 2 dozen if she can charge $4 a dozen, because it barely beats her time and ingredient cost. At $10 a dozen she'll happily bake 8 dozen - the higher price makes the extra effort and cost worthwhile, tracing an upward-sloping supply curve."
      },
      {
        type: "concept",
        title: "What Shifts the Whole Supply Curve",
        paragraphs: [
          "A supply shift means sellers offer more (or less) at EVERY price, moving the whole curve right (increase) or left (decrease). The big shifters are input costs, technology, taxes and subsidies, expectations, and the number of sellers. Input (resource) costs matter most: if flour and sugar get cheaper, making cookies costs less, so supply shifts right. If wages or materials get more expensive, supply shifts left. Remember it as anything that changes the cost or ease of producing.",
          "Technology that raises productivity shifts supply right, because sellers can make more with the same resources - a faster oven or better software lowers cost per unit. Taxes on producers act like an added cost and shift supply left, while subsidies (government payments to producers) lower cost and shift supply right. The number of sellers matters too: when more firms enter a market, total supply shifts right; when firms exit, it shifts left. Expectations of higher future prices can make sellers hold back today, shifting current supply left.",
          "A common trap is confusing a producer tax with a demand change - a tax on sellers shifts SUPPLY, not demand. Keep the logic simple: any force that makes production cheaper or easier pushes supply right, and any force that makes it costlier or harder pushes supply left. Practice by asking one question about each event: does this change the cost of producing the good itself? If yes, it's a supply shift; if it changes what buyers want at each price, it's a demand shift instead."
        ],
        bullets: [
          "A shift = more or less supplied at every price; right is an increase, left is a decrease.",
          "Cheaper inputs or better technology lower cost and shift supply right.",
          "Producer taxes shift supply left; subsidies shift supply right.",
          "More sellers entering shifts supply right; sellers exiting shifts it left.",
          "A supply shifter is anything except the good's own price - that stays a movement along the curve."
        ],
        realWorldExample: "When a new machine lets a T-shirt printer make 400 shirts a day instead of 150 at the same cost, its supply curve shifts right - at $15 a shirt it now offers far more. But if the government adds a $2-per-shirt excise tax, that cost pushes the supply curve back to the left."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-2-2-mc1",
            question: "A bakery's own selling price rises and it produces more loaves. This is…",
            options: [
              "A rightward shift of the supply curve",
              "A movement along the supply curve",
              "A leftward shift of the supply curve",
              "A shift of the demand curve"
            ],
            correctAnswer: 1,
            explanation: "A change in the good's own price is a movement along the supply curve - here, up and to the right to a larger quantity supplied. Only non-price factors shift the whole curve."
          },
          {
            id: "apm-2-2-mc2",
            question: "The government gives corn farmers a per-bushel subsidy. What happens to corn supply?",
            options: [
              "It shifts left as costs effectively rise",
              "It shifts right as costs effectively fall",
              "It stays fixed since price didn't change",
              "It slides up along the same curve"
            ],
            correctAnswer: 1,
            explanation: "A subsidy is a payment to producers that lowers their cost per unit, so they offer more at every price and supply shifts right. A tax would do the opposite."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Custom Phone-Case Startup",
        narrative: "Priya makes custom phone cases in her garage. She notices that when the market price rises from $12 to $18, she chooses to produce 40 cases a week instead of 25. Then two changes hit: the plastic she buys drops 30% in price, and her city adds a $1 excise tax on each case sold.",
        details: [
          "Producing more cases because her selling price rose is a movement along her supply curve, not a shift.",
          "Cheaper plastic is a lower input cost, shifting her supply curve to the right at every price.",
          "The $1 excise tax acts like an added cost, shifting her supply curve to the left.",
          "The net effect depends on which change is larger - the two shifters push in opposite directions."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-2-2-aq1",
          question: "Which of Priya's changes shifts her SUPPLY curve to the right?",
          options: [
            "The rise in her selling price from $12 to $18",
            "The 30% drop in the price of her plastic input",
            "The brand new $1 excise tax charged on each and every case",
            "A very sudden and sharp increase in buyers wanting to purchase cases"
          ],
          correctAnswer: 1,
          explanation: "Cheaper plastic lowers her cost of production, so she offers more at every price - a rightward supply shift. The selling-price rise is only a movement along the curve, the tax shifts supply left, and more buyers shift demand."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Supply is the price-to-quantity relationship for sellers; the law of supply makes the curve slope upward.",
          "Higher prices raise quantity supplied because they boost profit and cover rising marginal cost.",
          "The good's own price causes a movement along the curve; other factors cause a shift.",
          "Cheaper inputs, better technology, and subsidies shift supply right; costlier inputs and taxes shift it left.",
          "More sellers entering shifts supply right; the key test is whether production got cheaper or harder."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-2-2-mastery1",
            question: "Which event shifts a supply curve to the LEFT?",
            options: [
              "A drop in the price of key raw materials",
              "A new tax charged on each unit produced",
              "A brand new technology that greatly speeds up production",
              "A generous government subsidy paid directly to the producers"
            ],
            correctAnswer: 1,
            explanation: "A per-unit producer tax raises the cost of supplying each unit, so sellers offer less at every price and supply shifts left. Cheaper materials, better tech, and subsidies all shift supply right."
          },
          {
            id: "apm-2-2-mastery2",
            question: "The supply curve slopes upward mainly because…",
            options: [
              "Buyers always demand much more when the prices rise",
              "Higher prices reward sellers for making more",
              "Governments legally require a rising output every single year",
              "Input costs always fall as output grows"
            ],
            correctAnswer: 1,
            explanation: "A higher price means more profit per unit and helps cover rising marginal cost, so sellers are willing to produce more. That positive price-quantity link gives supply its upward slope."
          },
          {
            id: "apm-2-2-mastery3",
            question: "New firms enter a growing sneaker market. Market supply will…",
            options: [
              "Shift left as competition thins out",
              "Shift right as more sellers produce",
              "Stay completely fixed until the prices change",
              "Move down along the same curve"
            ],
            correctAnswer: 1,
            explanation: "More sellers means more total output offered at every price, so market supply shifts right. The number of sellers is a standard supply shifter."
          },
          {
            id: "apm-2-2-mastery4",
            question: "A change in 'quantity supplied' (a movement along the curve) is triggered by…",
            options: [
              "A change in the good's own price",
              "A sudden change in the available production technology used",
              "A change in the wage paid to workers",
              "A change in the number of firms"
            ],
            correctAnswer: 0,
            explanation: "Only the good's own price moves you along the supply curve. Technology, wages, and the number of firms are shifters that move the whole curve."
          },
          {
            id: "apm-2-2-mastery5",
            question: "A faster, cheaper 3D printer lets a firm make more toys at the same cost. Supply…",
            options: [
              "Shifts to the left because the total output is capped",
              "Shifts right because cost per unit falls",
              "Stays exactly the same until buyer demand rises",
              "Slides up along the current curve"
            ],
            correctAnswer: 1,
            explanation: "Better technology lowers cost per unit, so the firm offers more at every price and supply shifts right. Improved productivity is a classic rightward supply shifter."
          },
          {
            id: "apm-2-2-mastery6",
            question: "Which of these is a SUPPLY shifter rather than a demand shifter?",
            options: [
              "A sudden rise in the buyers' average yearly incomes",
              "An increase in the wage sellers must pay",
              "A big change in overall buyer tastes and trends",
              "A brand new price for a close substitute good"
            ],
            correctAnswer: 1,
            explanation: "A higher wage is a rising input cost, which shifts the supply curve left. Incomes, tastes, and substitute prices all shift demand, not supply."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-2-3",
    sections: [
      {
        type: "concept",
        title: "Price Elasticity of Demand: How Sensitive Are Buyers?",
        paragraphs: [
          "Price elasticity of demand (PED) measures how strongly quantity demanded responds to a price change. The formula is the percentage change in quantity demanded divided by the percentage change in price. If a 10% price rise causes a 20% drop in quantity, elasticity is 20/10 = 2. Because demand slopes down the raw number is negative, but AP convention takes the absolute value, so we call it 2. The bigger the number, the more sensitive buyers are - a small price nudge causes a big change in how much they buy.",
          "The result falls into three buckets. If the value is greater than 1, demand is ELASTIC - buyers are very responsive, like with restaurant meals or a specific brand of soda. If it's less than 1, demand is INELASTIC - buyers barely react, like with insulin, gas, or salt. If it equals exactly 1, demand is UNIT elastic. Picture two curves: a nearly flat demand curve is elastic (tiny price change, huge quantity change), while a nearly vertical one is inelastic (big price change, tiny quantity change).",
          "Four things make demand more elastic. First, availability of substitutes: more alternatives means buyers flee a price hike, so demand is elastic (one brand of cereal). Second, whether it's a necessity or a luxury: necessities like medicine are inelastic, luxuries like cruises are elastic. Third, share of income: expensive items eat a big budget chunk, so buyers react hard (cars are elastic). Fourth, time: given more time to adjust, buyers find substitutes, so demand grows more elastic over the long run than the short run."
        ],
        bullets: [
          "PED = % change in quantity demanded / % change in price (AP uses the absolute value).",
          "Elastic (>1): buyers very responsive; Inelastic (<1): barely responsive; Unit elastic (=1).",
          "A flatter demand curve is more elastic; a steeper one is more inelastic.",
          "More substitutes, luxuries, big-budget items, and longer time all raise elasticity.",
          "Necessities with few substitutes (gas, insulin) tend to be highly inelastic."
        ],
        realWorldExample: "If one pizza shop raises prices 15% and loses 40% of its customers to nearby shops, its demand is elastic (40/15 = 2.7). But when gas prices climb 15%, drivers cut back only about 3% because they still need to commute - inelastic demand (3/15 = 0.2)."
      },
      {
        type: "concept",
        title: "The Total-Revenue Test and Supply Elasticity",
        paragraphs: [
          "Elasticity tells a seller whether raising the price will actually make more money. Total revenue equals price times quantity. When demand is ELASTIC, quantity falls by a bigger percent than price rises, so raising price LOWERS total revenue - and cutting price raises it. When demand is INELASTIC, quantity barely moves, so raising price RAISES total revenue. This is the total-revenue test: with inelastic goods (like a life-saving drug) sellers can hike prices and earn more; with elastic goods a price cut can bring in more overall.",
          "This is why a concert promoter and a corner gas station behave differently. If tickets are elastic, cutting the price fills far more seats and total revenue climbs. If gas is inelastic, a station can raise its price and total revenue rises because drivers keep buying nearly the same amount. Businesses study elasticity precisely to price for maximum revenue, and governments use it too - taxing inelastic goods like cigarettes raises steady revenue because buyers keep buying despite the higher price.",
          "Supply has its own elasticity: price elasticity of supply measures how much quantity supplied responds to a price change, using the same percentage formula. Supply is elastic when firms can ramp up output easily (a printer with spare capacity) and inelastic when they can't (beachfront land, or a farm crop already planted for the season). Time matters here too: supply is usually more elastic in the long run, when firms can build factories, hire, or plant more, than in the short run when capacity is fixed."
        ],
        bullets: [
          "Total revenue = price × quantity; elasticity predicts how a price change affects it.",
          "Elastic demand: raise price and total revenue FALLS; cut price and it rises.",
          "Inelastic demand: raise price and total revenue RISES; buyers barely cut back.",
          "Governments tax inelastic goods (cigarettes, gas) for steady, reliable revenue.",
          "Supply elasticity measures seller responsiveness; supply is usually more elastic over time."
        ],
        realWorldExample: "A subway raises fares 20% and ridership falls only 5% (inelastic), so total revenue rises - riders have few substitutes. Meanwhile a food truck that raises prices 20% loses 35% of customers (elastic) and its total revenue drops, because hungry students simply walk to the next truck."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-2-3-mc1",
            question: "A 10% price increase causes quantity demanded to fall 4%. Demand is…",
            options: [
              "Elastic, since buyers react strongly",
              "Inelastic, since buyers barely react",
              "Unit elastic, since the numbers match",
              "Perfectly elastic, a flat curve"
            ],
            correctAnswer: 1,
            explanation: "Elasticity is 4/10 = 0.4, which is less than 1, so demand is inelastic. Quantity changed by a smaller percentage than price, meaning buyers barely responded."
          },
          {
            id: "apm-2-3-mc2",
            question: "For an INELASTIC good, raising the price will usually…",
            options: [
              "Lower total revenue sharply",
              "Raise total revenue",
              "Leave total revenue unchanged",
              "Make the good perfectly elastic"
            ],
            correctAnswer: 1,
            explanation: "When demand is inelastic, quantity barely falls when price rises, so price × quantity (total revenue) goes up. That's the total-revenue test in action."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Vending Machines, Two Decisions",
        narrative: "A school has two vending machines. One sells bottled water, which students need after gym class and can't easily get elsewhere on campus. The other sells brand-name chips, right next to a machine offering three cheaper snack alternatives. The vendor is deciding whether to raise prices on each to boost revenue.",
        details: [
          "Water has few substitutes on campus and is close to a necessity, so its demand is inelastic.",
          "The brand-name chips have several nearby substitutes, so their demand is elastic.",
          "Raising the water price will likely raise total revenue because quantity barely falls.",
          "Raising the chip price will likely lower total revenue because many students switch to alternatives."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-2-3-aq1",
          question: "To boost total revenue, what should the vendor do based on elasticity?",
          options: [
            "Raise both prices since higher prices always earn more",
            "Raise the water price but not the brand-name chips",
            "Raise only the price of the chips but never the bottled water",
            "Lower both of the prices at once just to sell many more units"
          ],
          correctAnswer: 1,
          explanation: "Water is inelastic, so raising its price raises total revenue. Chips are elastic, so raising their price would lose too many buyers and lower revenue. Higher prices do NOT always earn more."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Price elasticity of demand = % change in quantity / % change in price (use the absolute value).",
          "Elastic (>1) means responsive buyers; inelastic (<1) means unresponsive; unit elastic equals 1.",
          "More substitutes, luxuries, big-budget items, and more time all make demand more elastic.",
          "Total-revenue test: raise price on inelastic goods to earn more; cut price on elastic goods to earn more.",
          "Supply elasticity measures seller responsiveness and is usually higher in the long run."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-2-3-mastery1",
            question: "Which good most likely has the MOST inelastic demand?",
            options: [
              "One brand of soda among many rivals",
              "Insulin for a diabetic patient",
              "Movie tickets on a weekend night",
              "A particular airline's economy seats"
            ],
            correctAnswer: 1,
            explanation: "Insulin is a necessity with essentially no substitutes, so buyers keep buying despite price changes - highly inelastic. The others have close substitutes or are discretionary, making them more elastic."
          },
          {
            id: "apm-2-3-mastery2",
            question: "A 20% price cut raises quantity demanded 50%. This demand is…",
            options: [
              "Inelastic, value below one",
              "Elastic, value above one",
              "Unit elastic, value equals one",
              "Perfectly inelastic, a vertical line"
            ],
            correctAnswer: 1,
            explanation: "Elasticity is 50/20 = 2.5, greater than 1, so demand is elastic. Quantity changed by a larger percentage than price, showing strong buyer responsiveness."
          },
          {
            id: "apm-2-3-mastery3",
            question: "Why do governments often tax cigarettes to raise revenue?",
            options: [
              "Cigarette demand is fairly elastic, so total revenue soars",
              "Cigarette demand is inelastic, so buyers keep buying",
              "Cigarettes have many easy and very close substitutes",
              "Taxes always lower the final price that buyers pay"
            ],
            correctAnswer: 1,
            explanation: "Because cigarette demand is inelastic, a tax that raises the price barely reduces quantity, so the government collects steady revenue. Inelastic goods are reliable tax targets."
          },
          {
            id: "apm-2-3-mastery4",
            question: "Which factor makes a good's demand MORE elastic?",
            options: [
              "Having many close substitutes available",
              "Being a life-or-death necessity",
              "Taking up a tiny share of income",
              "Having no time for buyers to adjust"
            ],
            correctAnswer: 0,
            explanation: "More substitutes let buyers flee a price hike, raising elasticity. Necessities, tiny-budget items, and short time frames all make demand more inelastic instead."
          },
          {
            id: "apm-2-3-mastery5",
            question: "A seller of an ELASTIC good wants more total revenue. It should…",
            options: [
              "Raise the price to earn more per unit",
              "Lower the price to sell many more units",
              "Keep the current price exactly the same as before",
              "Stop selling entirely until the demand becomes fully inelastic"
            ],
            correctAnswer: 1,
            explanation: "With elastic demand, a price cut raises quantity by a larger percentage than the price falls, so total revenue rises. Raising price on an elastic good would lose too many buyers."
          },
          {
            id: "apm-2-3-mastery6",
            question: "Supply tends to be MORE elastic when…",
            options: [
              "Firms have plenty of time to expand output",
              "A crop is already planted for the season",
              "The main resource is totally fixed, like rare beachfront land",
              "The factories are already running fully at their maximum capacity"
            ],
            correctAnswer: 0,
            explanation: "Given time, firms can build capacity, hire, or plant more, so quantity supplied responds strongly to price - elastic supply. Fixed inputs and full capacity make supply inelastic."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-2-4",
    sections: [
      {
        type: "concept",
        title: "Equilibrium, Surpluses, and Shortages",
        paragraphs: [
          "Market equilibrium is the price where the amount buyers want to buy exactly equals the amount sellers want to sell. On a graph it's the single point where the downward demand curve crosses the upward supply curve, setting the equilibrium price and equilibrium quantity. At that price there is no leftover product and no unmet buyer - the market 'clears.' Suppose burgers clear at $5 with 300 sold: at $5, buyers want exactly 300 and sellers offer exactly 300, so nothing pushes the price to move.",
          "When the price sits ABOVE equilibrium, quantity supplied beats quantity demanded and you get a SURPLUS - unsold goods piling up. Sellers respond by cutting the price to move inventory, sliding the market back down toward equilibrium. When the price sits BELOW equilibrium, quantity demanded beats quantity supplied and you get a SHORTAGE - empty shelves and eager buyers. Sellers notice they can charge more, so the price rises back up. These self-correcting forces are why free markets tend to gravitate to equilibrium on their own.",
          "A famous phrase captures this: the price acts like an 'invisible hand' guiding the market. A surplus signals 'price too high, cut it'; a shortage signals 'price too low, raise it.' No one plans this - it emerges from thousands of buyers and sellers reacting to price. Understanding surplus and shortage as the result of prices being off equilibrium is essential, because almost every AP supply-and-demand question tests whether you can spot which one appears and which way the price will move."
        ],
        bullets: [
          "Equilibrium is where quantity demanded equals quantity supplied - the curves cross.",
          "At equilibrium the market clears: no surplus and no shortage.",
          "Price above equilibrium creates a surplus (excess supply), pushing price down.",
          "Price below equilibrium creates a shortage (excess demand), pushing price up.",
          "Surpluses and shortages are self-correcting, driving the market back to equilibrium."
        ],
        realWorldExample: "If a store prices a hot new game console at $700 when equilibrium is $500, few sell and unsold boxes stack up - a surplus that forces a price cut. If it prices the console at $300, crowds clear the shelves instantly and scalpers appear - a shortage that pushes the real price up toward $500."
      },
      {
        type: "concept",
        title: "Predicting How Shifts Change Equilibrium",
        paragraphs: [
          "When a curve shifts, both the equilibrium price and quantity usually change, and you can predict the direction. If demand shifts RIGHT (buyers want more), equilibrium price AND quantity both rise. If demand shifts LEFT, both fall. If supply shifts RIGHT (sellers offer more), equilibrium price FALLS but quantity RISES. If supply shifts LEFT, price RISES but quantity FALLS. Memorize these four single-shift outcomes - they come straight from sliding one curve along the other.",
          "A quick worked example: a heat wave makes everyone crave ice cream, shifting demand right. Price rises and quantity rises - shops sell more cones at higher prices. Now a different case: a frost destroys half the orange crop, shifting supply left. Orange juice price rises but quantity falls. Notice the pattern - demand shifts move price and quantity the SAME direction, while supply shifts move them OPPOSITE directions. That single sentence solves most single-shift problems on the exam.",
          "When BOTH curves shift at once, one of the two outcomes becomes 'indeterminate' - you can predict either price or quantity, but not both, without knowing which shift is bigger. Example: if demand rises and supply rises together, quantity definitely rises, but price could go up, down, or stay flat depending on which shift dominates. The trick is to draw it: shift both curves, and whichever result changes in a consistent direction is certain, while the other is ambiguous. Always label your axes and arrows to avoid errors."
        ],
        bullets: [
          "Demand right: price up, quantity up. Demand left: price down, quantity down.",
          "Supply right: price down, quantity up. Supply left: price up, quantity down.",
          "Demand shifts move price and quantity the SAME way; supply shifts move them OPPOSITE ways.",
          "When both curves shift, one variable (price or quantity) becomes indeterminate.",
          "Sketch the graph and label arrows to nail the direction every time."
        ],
        realWorldExample: "A viral dance makes a certain sneaker cool (demand shifts right): price and sales both jump. Separately, a factory fire cuts sneaker production (supply shifts left): price jumps but sales fall. If BOTH happen at once, sales could rise or fall - it depends on which shift is stronger, so that outcome is indeterminate."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-2-4-mc1",
            question: "At the current price, quantity demanded is 400 and quantity supplied is 250. This market has a…",
            options: [
              "Surplus, so price will fall",
              "Shortage, so price will rise",
              "Perfect equilibrium already reached, so no change",
              "Surplus, so price will rise"
            ],
            correctAnswer: 1,
            explanation: "Quantity demanded (400) exceeds quantity supplied (250), so there is a shortage. Eager buyers and empty shelves push the price up toward equilibrium."
          },
          {
            id: "apm-2-4-mc2",
            question: "Demand for umbrellas shifts right during a rainy month. Equilibrium price and quantity will…",
            options: [
              "Both fall as sellers panic",
              "Both rise together",
              "Move in opposite directions",
              "Stay exactly the same"
            ],
            correctAnswer: 1,
            explanation: "A rightward demand shift raises both equilibrium price and quantity. Demand shifts move price and quantity in the same direction."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Farmers' Market Tomato Stand",
        narrative: "At the farmers' market, tomatoes usually clear at $3 a pound. One Saturday a food blogger raves about a tomato recipe, and demand jumps. That same morning, an unusually good harvest means several farmers bring twice as many tomatoes as normal to sell. The market opens with both changes in play.",
        details: [
          "The blogger's praise shifts tomato demand to the right, which alone would raise price and quantity.",
          "The bumper harvest shifts tomato supply to the right, which alone would lower price and raise quantity.",
          "Both shifts push quantity in the same direction, so equilibrium quantity clearly rises.",
          "The two shifts push price in opposite directions, so the change in price is indeterminate without more info."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-2-4-aq1",
          question: "With demand AND supply both shifting right, what can you predict for certain about tomatoes?",
          options: [
            "Both price and quantity definitely rise",
            "Quantity definitely rises; price is indeterminate",
            "Price definitely rises; quantity is indeterminate",
            "Both price and quantity definitely fall"
          ],
          correctAnswer: 1,
          explanation: "Both rightward shifts increase quantity, so quantity certainly rises. But they push price in opposite directions, so price could rise, fall, or hold - it's indeterminate without knowing which shift is larger."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Equilibrium is where the curves cross; the market clears with no surplus or shortage.",
          "Price above equilibrium makes a surplus (price falls); price below makes a shortage (price rises).",
          "Demand right: price and quantity up. Demand left: both down.",
          "Supply right: price down, quantity up. Supply left: price up, quantity down.",
          "When both curves shift, one of price or quantity becomes indeterminate - draw it to see which."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-2-4-mastery1",
            question: "A price set ABOVE equilibrium produces a…",
            options: [
              "Shortage that pushes price up",
              "Surplus that pushes price down",
              "Perfectly cleared market with no pressure",
              "Shortage that pushes price down"
            ],
            correctAnswer: 1,
            explanation: "Above equilibrium, quantity supplied exceeds quantity demanded, creating a surplus. Unsold goods pressure sellers to cut the price back toward equilibrium."
          },
          {
            id: "apm-2-4-mastery2",
            question: "A frost destroys much of the coffee crop. Coffee's equilibrium price and quantity will…",
            options: [
              "Both rise as demand explodes",
              "Price rise, quantity fall",
              "Price fall, quantity rise",
              "Both fall as sellers exit",
            ],
            correctAnswer: 1,
            explanation: "A ruined crop shifts supply left, so price rises and quantity falls. Supply shifts move price and quantity in opposite directions."
          },
          {
            id: "apm-2-4-mastery3",
            question: "New technology lets a chip maker produce far more chips cheaply. Equilibrium will show…",
            options: [
              "Higher price and lower quantity",
              "Lower price and higher quantity",
              "Higher price and higher quantity",
              "No change to price or quantity"
            ],
            correctAnswer: 1,
            explanation: "Cheaper production shifts supply right, lowering the equilibrium price and raising quantity. A rightward supply shift always pushes price down and quantity up."
          },
          {
            id: "apm-2-4-mastery4",
            question: "Which statement about single-curve shifts is correct?",
            options: [
              "Demand shifts move price and quantity oppositely",
              "Supply shifts move price and quantity oppositely",
              "Supply shifts move price and quantity the same way",
              "Neither shift affects equilibrium at all"
            ],
            correctAnswer: 1,
            explanation: "A supply shift moves equilibrium price and quantity in opposite directions, while a demand shift moves them the same direction. That contrast is the key single-shift rule."
          },
          {
            id: "apm-2-4-mastery5",
            question: "Demand shifts right while supply shifts left at the same time. What is certain?",
            options: [
              "Quantity definitely rises",
              "Price definitely rises",
              "Both price and quantity fall",
              "Nothing at all can be predicted"
            ],
            correctAnswer: 1,
            explanation: "Both shifts push price up, so price definitely rises. But they push quantity in opposite directions, making the quantity change indeterminate."
          },
          {
            id: "apm-2-4-mastery6",
            question: "Why does a free market tend to return to equilibrium on its own?",
            options: [
              "The federal government simply resets all prices each day",
              "Surpluses lower prices and shortages raise them",
              "Buyers and sellers honestly never change their behavior",
              "Prices are legally fixed at equilibrium"
            ],
            correctAnswer: 1,
            explanation: "A surplus pressures sellers to cut prices and a shortage pressures them to raise prices, automatically nudging the market back to equilibrium. No central planner is needed."
          }
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════════
  // UNIT 1: BASIC ECONOMIC CONCEPTS (apm-1-x)
  // ═══════════════════════════════════════════════
  {
    lessonId: "apm-1-1",
    sections: [
      {
        type: "concept",
        title: "Scarcity: The Root of Every Economic Choice",
        paragraphs: [
          "Scarcity is the basic fact that our wants are unlimited but the resources to satisfy them are limited. It is not the same as poverty. A billionaire still has only 24 hours a day, so even they must choose. Because resources are scarce, every choice carries a cost: the value of the next-best option you gave up, called opportunity cost. If you spend Saturday working a $60 shift, the opportunity cost is the hangout, the sleep, or the homework you skipped, not just the money.",
          "Economics is the study of how people, firms, and governments make choices under scarcity. Notice the three levels: a teen deciding between saving and spending $50, a boba shop deciding how many workers to hire, and a city deciding whether to fund a park or a bus line. All three face the same wall of limited resources and must rank their options. The single most important habit in this course is asking 'What is given up?' every time a decision is made.",
          "A few things are not scarce and so are called free goods: sunlight on a bright day, or air to breathe, exist in such abundance that using them costs no one anything. Almost everything else is an economic good, meaning getting more of it requires giving something up. Because free goods are rare, opportunity cost lurks behind nearly every decision, which is why economists say 'there is no such thing as a free lunch.'"
        ],
        bullets: [
          "Scarcity means unlimited wants meet limited resources - it affects everyone, rich or poor.",
          "Opportunity cost is the value of the next-best option surrendered by a choice.",
          "Economics studies choices under scarcity at the personal, firm, and government levels.",
          "Free goods (like sunlight) are not scarce; economic goods require a trade-off.",
          "Always ask 'What was given up?' to spot the true cost of any decision."
        ],
        realWorldExample: "A student with $200 and one Saturday can buy a concert ticket or new sneakers, not both. Choosing the concert makes the sneakers the opportunity cost. The limited money and single free day are the scarcity that forces the ranking."
      },
      {
        type: "concept",
        title: "Positive vs. Normative and Thinking at the Margin",
        paragraphs: [
          "Economists separate two kinds of statements. A positive statement describes what IS and can be tested against data, such as 'a $2 rise in bus fares cut ridership 8%.' A normative statement says what OUGHT to be and reflects a value judgment, such as 'bus fares should be free for students.' Signal words like should, ought, fair, or too high flag normative claims. On the AP exam, sorting these two apart is a common quick-point question, so train your ear for the giveaways.",
          "Real decisions are rarely all-or-nothing; they happen at the margin, meaning one more unit at a time. Marginal analysis compares the marginal benefit (the added satisfaction from one more unit) with the marginal cost (the added cost of that unit). The rule: do an activity as long as marginal benefit is at least as large as marginal cost, and stop when they meet. You do not ask 'Should I study?' but 'Is one MORE hour of studying worth what it costs me?'",
          "Marginal benefit usually falls as you consume more, a pattern called diminishing marginal utility. The first slice of pizza when you are starving is worth a lot; the fifth is worth little; the seventh might make you feel sick. Because extra benefit shrinks while extra cost often stays steady or rises, there is a sweet spot where marginal benefit equals marginal cost. Optimizers stop exactly there - that single idea drives consumer choice, firm production, and government policy alike."
        ],
        bullets: [
          "Positive statements state testable facts; normative statements state opinions (should, ought, fair).",
          "Decisions happen at the margin - one additional unit at a time.",
          "Rule: keep doing an activity while marginal benefit is at least the marginal cost.",
          "Diminishing marginal utility means each extra unit adds less satisfaction than the last.",
          "The optimal choice sits where marginal benefit equals marginal cost."
        ],
        realWorldExample: "Deciding how many hours to work a weekend job, a teen compares the $15 earned each hour (marginal benefit) against the fun and rest given up, which grows as free time shrinks (marginal cost). They stop adding hours once the next hour's cost exceeds its $15 benefit."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-1-1-mc1",
            question: "Which statement is normative rather than positive?",
            options: [
              "Higher gas taxes clearly reduced the total miles driven last year",
              "The gas tax ought to be lowered for families",
              "Unemployment fell to just 4 percent nationwide back in March",
              "A price rise cut the quantity of soda bought"
            ],
            correctAnswer: 1,
            explanation: "Normative statements say what OUGHT to be and carry value words like 'ought.' The other three describe measurable facts that data could confirm or disprove."
          },
          {
            id: "apm-1-1-mc2",
            question: "You keep studying only while the next hour's benefit beats its cost. This is…",
            options: [
              "A normative value judgment",
              "Reasoning at the margin",
              "An example of a free good",
              "Ignoring opportunity cost"
            ],
            correctAnswer: 1,
            explanation: "Comparing the benefit and cost of one MORE unit is marginal analysis. You act while marginal benefit is at least marginal cost, then stop when they meet."
          }
        ]
      },
      {
        type: "scenario",
        title: "Priya's Saturday Trade-Offs",
        narrative: "Priya has $80 and one open Saturday. She could work a $12-an-hour shift, study for the SAT, or go to a friend's lake day that costs $30. She figures the first two study hours help her score a lot, but by hour five she is barely improving, and the lake day is priceless the first time but boring the third weekend in a row.",
        details: [
          "Whatever Priya picks, the value of her best rejected option is the opportunity cost of her choice.",
          "Saying 'studying is the responsible thing to do' is a normative statement, not a testable fact.",
          "Her fading gains from each extra study hour show diminishing marginal benefit at work.",
          "She should keep studying only until the next hour's benefit falls below its cost in fun and rest."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-1-1-aq1",
          question: "Each extra SAT study hour helps Priya less than the one before. This pattern is called…",
          options: [
            "Increasing opportunity cost of money",
            "Diminishing marginal benefit from studying",
            "A purely normative judgment",
            "The presence of a free good"
          ],
          correctAnswer: 1,
          explanation: "Added satisfaction or gain shrinks with each additional unit - here, each study hour helps less. That is diminishing marginal benefit, which pushes her to stop once benefit dips below cost."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Scarcity forces everyone to choose because wants exceed available resources.",
          "Opportunity cost is the value of the next-best option a choice gives up.",
          "Positive statements are testable facts; normative statements are value-laden opinions.",
          "Rational decisions are made at the margin, comparing marginal benefit to marginal cost.",
          "Because marginal benefit diminishes, the best choice is where marginal benefit equals marginal cost."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-1-1-mastery1",
            question: "Scarcity exists because…",
            options: [
              "Governments print too little money",
              "Wants exceed the resources available",
              "Only poor nations lack resources",
              "People refuse to work hard enough"
            ],
            correctAnswer: 1,
            explanation: "Scarcity is unlimited wants meeting limited resources, so everyone faces it. It is not about money supply, effort, or being poor."
          },
          {
            id: "apm-1-1-mastery2",
            question: "The opportunity cost of attending a free concert instead of a paid $50 shift is best described as…",
            options: [
              "Exactly zero dollars, since the whole concert is free",
              "The $50 of wages you gave up",
              "The full printed face value of the concert ticket",
              "Only the gas used to drive there"
            ],
            correctAnswer: 1,
            explanation: "Opportunity cost is the value of the next-best option surrendered - here the $50 shift. 'Free' entry does not make the choice costless once you count what you gave up."
          },
          {
            id: "apm-1-1-mastery3",
            question: "Which is the best example of a free good?",
            options: [
              "A bottle of spring water",
              "Sunlight on a clear day",
              "A seat at a concert",
              "An hour of a tutor's time"
            ],
            correctAnswer: 1,
            explanation: "A free good is so abundant that using it costs no one anything, like sunlight. The others are scarce economic goods that require a trade-off."
          },
          {
            id: "apm-1-1-mastery4",
            question: "A rational person keeps doing an activity until…",
            options: [
              "The total benefit reaches zero",
              "Marginal benefit equals marginal cost",
              "Every resource is fully used up",
              "The activity stops being enjoyable"
            ],
            correctAnswer: 1,
            explanation: "The marginal rule says continue while marginal benefit is at least marginal cost, stopping where they are equal. Total benefit and enjoyment are not the stopping signals."
          },
          {
            id: "apm-1-1-mastery5",
            question: "'The minimum wage should be raised to help workers' is…",
            options: [
              "A positive, testable claim",
              "A normative value judgment",
              "A statement of scarcity",
              "A marginal cost calculation"
            ],
            correctAnswer: 1,
            explanation: "'Should' signals an opinion about what ought to be, making it normative. Positive statements instead describe facts that data can test."
          },
          {
            id: "apm-1-1-mastery6",
            question: "Diminishing marginal utility means that…",
            options: [
              "Market prices always fall steadily over time",
              "Each extra unit adds less satisfaction",
              "Resources are actually completely unlimited",
              "Total utility can honestly never rise"
            ],
            correctAnswer: 1,
            explanation: "Diminishing marginal utility means the added satisfaction from one more unit shrinks as you consume more. Total utility can still rise, just by smaller and smaller amounts."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-1-2",
    sections: [
      {
        type: "concept",
        title: "The Factors of Production and Opportunity Cost",
        paragraphs: [
          "Everything an economy produces comes from four resources, remembered as CELL: Capital, Entrepreneurship, Land, and Labor. Land is all natural resources, from acres to oil to water. Labor is human effort, like the 30 hours a week a barista works. Capital is human-made tools used to produce more goods - ovens, delivery trucks, software - not money itself. Entrepreneurship is the risk-taking that combines the other three into a business. Each factor earns income: land earns rent, labor earns wages, capital earns interest, and entrepreneurship earns profit.",
          "Because these factors are scarce, using them one way means not using them another, which is opportunity cost again. A field planted with corn cannot also grow soybeans that season; a worker training as a nurse is not simultaneously learning to code. Every society, no matter how it is organized, must answer three questions: WHAT to produce, HOW to produce it, and FOR WHOM to produce it. The differences between economic systems come down to who answers these three questions.",
          "This lesson also sets up the difference between microeconomics and macroeconomics. Micro zooms in on individual decision-makers: a single household, one firm, one market for sneakers. Macro zooms out to the whole economy: total output, overall unemployment, and economy-wide inflation. AP Microeconomics lives mostly at the small scale, studying how prices coordinate the choices of many buyers and sellers, while leaving nationwide totals to the macro course."
        ],
        bullets: [
          "The four factors of production are Capital, Entrepreneurship, Land, and Labor (CELL).",
          "Each factor earns income: rent, profit, interest, and wages respectively.",
          "Every economy must decide WHAT, HOW, and FOR WHOM to produce.",
          "Capital means human-made tools used in production, not money.",
          "Micro studies individual firms and markets; macro studies the whole economy."
        ],
        realWorldExample: "A food truck combines land (the parking spot), labor (the cook), capital (the grill and truck), and entrepreneurship (the owner risking savings). Devoting the truck to tacos means giving up the burgers it could have sold - the opportunity cost of that menu choice."
      },
      {
        type: "concept",
        title: "Market, Command, and Mixed Economies",
        paragraphs: [
          "Economic systems differ in who decides what gets produced. In a pure market economy, private individuals and firms own resources and prices coordinate everything - no central planner tells a bakery how many loaves to bake; the price signal does. In a pure command economy, the government owns resources and central planners answer the three questions by decree, setting production targets and prices. Most real countries are mixed economies, blending private markets with government rules, taxes, and public services like roads and schools.",
          "Markets rely on property rights: the legal power to own, use, and sell resources and keep the rewards. Strong property rights give people the incentive to work, invest, and maintain what they own, because they capture the gains. If anyone could take your business's profits, you would not build the business. This is why economists link secure property rights to prosperity - they turn self-interest into productive effort, letting the 'invisible hand' guide resources toward what people value most.",
          "Each system trades off differently. Markets are efficient and responsive but can leave some people behind and underprovide things like clean air. Command systems can aim for equality and mobilize resources fast but often misjudge what people want and blunt incentives, causing shortages. Mixed economies try to keep the efficiency of markets while using government to soften rough edges - funding schools, curbing pollution, and helping those the market underserves. Almost every modern economy, including the United States, sits somewhere on this spectrum."
        ],
        bullets: [
          "Market economy: private owners and prices answer the three questions.",
          "Command economy: government planners own resources and dictate production.",
          "Mixed economy: private markets plus government roles - what most nations actually use.",
          "Property rights give owners incentives to work, invest, and maintain resources.",
          "Markets are efficient but imperfect; command systems can equalize but blunt incentives."
        ],
        realWorldExample: "The U.S. is a mixed economy: a teen's phone is made and sold through private markets, yet the roads it is delivered on, the public school they use it in, and the safety rules on its battery all come from government - private choice and public rules side by side."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-1-2-mc1",
            question: "In economics, 'capital' as a factor of production refers to…",
            options: [
              "Physical money simply kept in a bank account",
              "Tools and machines used to produce goods",
              "The raw natural resources found beneath the land",
              "The wages a worker takes home"
            ],
            correctAnswer: 1,
            explanation: "Capital means human-made tools like machines and equipment used in production, not money. Money is a way to buy capital, but it is not itself a productive resource."
          },
          {
            id: "apm-1-2-mc2",
            question: "Which feature most defines a market economy?",
            options: [
              "Planners set output targets by decree",
              "Prices coordinate private decisions",
              "The state owns all major resources",
              "No trade-offs ever have to be made"
            ],
            correctAnswer: 1,
            explanation: "In a market economy, prices guide privately owned resources toward what buyers value. Central planning and full state ownership describe a command economy instead."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Towns, Two Systems",
        narrative: "In Marketville, a teen who invents a better skateboard can start a company, keep the profits, and hire friends; prices rise and fall to match supply with demand. In Planville, a government office decides how many skateboards to make, sets the price, and assigns workers to factories. Both towns have the same scarce wood, workers, and machines.",
        details: [
          "The wood, workers, and machines are land, labor, and capital - scarce in both towns.",
          "Marketville's inventor is the entrepreneur, risking effort in exchange for profit.",
          "Strong property rights in Marketville let the inventor keep gains, spurring the new company.",
          "Planville's planners, not prices, answer what, how, and for whom to produce."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-1-2-aq1",
          question: "Why do secure property rights encourage the Marketville teen to build the skateboard company?",
          options: [
            "They completely guarantee that the whole business can simply never fail",
            "They let the owner keep the rewards of the effort",
            "They force absolutely all of the profits to be shared out equally",
            "They personally set the market price of skateboards for everyone else"
          ],
          correctAnswer: 1,
          explanation: "Property rights let owners capture the gains from their work and investment, creating the incentive to build. They do not guarantee success, mandate sharing, or fix prices."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The four factors of production are Capital, Entrepreneurship, Land, and Labor (CELL).",
          "Every economy must answer what, how, and for whom to produce.",
          "Market economies use prices; command economies use planners; most nations are mixed.",
          "Property rights give people incentives to work, invest, and maintain resources.",
          "Micro studies individual firms and markets while macro studies the whole economy."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-1-2-mastery1",
            question: "Which list correctly names the four factors of production?",
            options: [
              "Money, labor, land, and taxes",
              "Land, labor, capital, and entrepreneurship",
              "Wages, rent, profit, and interest",
              "Supply, demand, price, and quantity"
            ],
            correctAnswer: 1,
            explanation: "The factors are land, labor, capital, and entrepreneurship (CELL). Wages, rent, profit, and interest are the incomes those factors earn, not the factors themselves."
          },
          {
            id: "apm-1-2-mastery2",
            question: "A pure command economy is one in which…",
            options: [
              "Prices alone guide private firms",
              "Government planners decide production",
              "There are no scarce resources",
              "Property is owned by individuals"
            ],
            correctAnswer: 1,
            explanation: "In a command economy the state owns resources and planners answer the three questions. Price-guided private ownership describes a market economy."
          },
          {
            id: "apm-1-2-mastery3",
            question: "The study of a single firm's pricing decision belongs to…",
            options: [
              "Macroeconomics, not micro",
              "Microeconomics",
              "Neither branch of economics",
              "Only command economies"
            ],
            correctAnswer: 1,
            explanation: "Microeconomics examines individual decision-makers such as one firm or market. Macroeconomics instead looks at economy-wide totals like national output."
          },
          {
            id: "apm-1-2-mastery4",
            question: "Which income is paid to the factor 'labor'?",
            options: [
              "Rent for using the resource",
              "Wages for work performed",
              "Interest on borrowed capital",
              "Profit from running a firm"
            ],
            correctAnswer: 1,
            explanation: "Labor earns wages, land earns rent, capital earns interest, and entrepreneurship earns profit. Matching each factor to its income is a common exam point."
          },
          {
            id: "apm-1-2-mastery5",
            question: "Strong property rights promote prosperity mainly because they…",
            options: [
              "Completely remove every last bit of scarcity from an economy",
              "Give owners incentives to invest and produce",
              "Force the government to set every price",
              "Fully guarantee perfectly equal outcomes for absolutely everyone"
            ],
            correctAnswer: 1,
            explanation: "When owners can keep the rewards of their effort, they invest, work, and maintain resources. Property rights do not erase scarcity or guarantee equality."
          },
          {
            id: "apm-1-2-mastery6",
            question: "Most real-world economies today are best classified as…",
            options: [
              "Pure market economies",
              "Mixed economies",
              "Pure command economies",
              "Economies without scarcity"
            ],
            correctAnswer: 1,
            explanation: "Nations like the U.S. blend private markets with government rules and services, making them mixed economies. Pure market or pure command systems are rare in practice."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-1-3",
    sections: [
      {
        type: "concept",
        title: "Reading the Production Possibilities Curve",
        paragraphs: [
          "The production possibilities curve (PPC) is a graph of every combination of two goods an economy can make when it uses all its resources fully. Put pizzas on one axis and robots on the other. A point ON the curve, like 100 pizzas and 40 robots, means resources are fully and efficiently used. Move to more robots and you must slide down to fewer pizzas, because resources are scarce. That trade-off, seen as the curve's downward slope, is opportunity cost drawn as a picture.",
          "Where a point sits tells a story. Any point INSIDE the curve, like 60 pizzas and 20 robots, means resources are idle or wasted - unemployed workers or unused factories - so the economy is inefficient. A point OUTSIDE the curve, like 120 pizzas and 60 robots, is currently unattainable with today's resources and technology. The frontier itself marks the boundary between what is possible and what is not, which is why it is also called the production possibilities frontier.",
          "The PPC captures two kinds of efficiency the AP exam loves to test. Productive efficiency means producing at the lowest possible cost, which happens anywhere on the curve - no resources wasted. Allocative efficiency is stricter: producing the specific mix society values most, the single 'right' point on the curve. An economy can be productively efficient (on the curve) yet allocatively inefficient if it makes 90 robots and only 10 pizzas when people actually crave far more pizza."
        ],
        bullets: [
          "The PPC shows all combos of two goods possible using resources fully.",
          "Points on the curve are efficient; inside means wasted resources; outside is unattainable.",
          "The downward slope shows opportunity cost - more of one good means less of the other.",
          "Productive efficiency (lowest cost) holds anywhere on the curve.",
          "Allocative efficiency is the one point matching what society values most."
        ],
        realWorldExample: "Picture a school's staff time split between tutoring and coaching. Using every teacher fully puts the school on its PPC; leaving some teachers idle drops it inside the curve; wanting more of both than the staff can deliver is a point outside, unreachable until the school hires more teachers."
      },
      {
        type: "concept",
        title: "Increasing Costs and Economic Growth",
        paragraphs: [
          "A PPC is usually bowed outward, not a straight line, because of the law of increasing opportunity cost. Resources are specialized: some workers and machines are great at making pizzas but clumsy at making robots. When you first shift toward robots, you move the least-suited pizza resources over, giving up few pizzas. Keep going and you must pull your best pizza-makers into robots, sacrificing many pizzas per robot. So each extra robot costs more pizzas than the last, and the curve bows out. If resources were equally good at both goods, the PPC would be a straight line with constant opportunity cost.",
          "To read opportunity cost from numbers, compare two points. Suppose moving from 100 pizzas/40 robots to 80 pizzas/50 robots gains 10 robots by giving up 20 pizzas, so each robot costs 2 pizzas here. Later, moving from 80/50 to 50/60 gains 10 robots for 30 pizzas, so each robot now costs 3 pizzas. The rising cost per robot is the law of increasing opportunity cost in action, and it is exactly the kind of table the exam asks you to compute.",
          "The whole PPC can shift outward, which represents economic growth: producing more of both goods becomes possible. Growth comes from more resources (a bigger workforce, new land, more factories), better technology, or improved skills through education and training. A shift outward on the robot axis only - because of a robotics breakthrough - tilts the curve, letting the economy make more robots at every pizza level. Investing in capital and education today sacrifices some current consumption but pushes the frontier out tomorrow."
        ],
        bullets: [
          "The PPC bows outward due to the law of increasing opportunity cost.",
          "Specialized resources make each extra unit cost more of the other good.",
          "A straight-line PPC means constant opportunity cost (resources equally useful).",
          "Compute opportunity cost by comparing the goods given up between two points.",
          "Growth shifts the whole PPC outward via more resources, technology, or skills."
        ],
        realWorldExample: "A country moving farm workers into factories loses few crops at first (least-skilled farmers move), but eventually pulls its best farmers, sacrificing lots of food per extra machine - increasing cost. When it later invents better tractors, its PPC shifts outward, allowing more food AND machines at once."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-1-3-mc1",
            question: "An economy operating at a point INSIDE its PPC is…",
            options: [
              "Producing an unattainable combination",
              "Using its resources inefficiently",
              "Growing faster than any rival",
              "Allocatively efficient by definition"
            ],
            correctAnswer: 1,
            explanation: "A point inside the curve means idle or wasted resources, so production is inefficient. Points outside are unattainable, and only points on the curve can be efficient."
          },
          {
            id: "apm-1-3-mc2",
            question: "The PPC bows outward primarily because…",
            options: [
              "Money slowly loses its value over time",
              "Resources are specialized, raising opportunity cost",
              "Governments always intervene directly in markets",
              "Consumers tend to prefer more variety in goods"
            ],
            correctAnswer: 1,
            explanation: "Specialized resources make each extra unit of one good cost more of the other, the law of increasing opportunity cost, which bows the curve outward. Equally useful resources would give a straight line."
          }
        ]
      },
      {
        type: "scenario",
        title: "Zaraland's Bread-and-Bots Choice",
        narrative: "Zaraland can produce bread and robots. Fully employed, it makes 200 loaves and 0 robots, or 0 loaves and 50 robots, or points in between along a curve that bows outward. Right now a recession leaves many factories idle, and the country is producing 120 loaves and 20 robots. Engineers just announced a robotics breakthrough.",
        details: [
          "At 120 loaves and 20 robots with idle factories, Zaraland is operating inside its PPC.",
          "Moving toward more robots forces up bread sacrificed per robot - increasing opportunity cost.",
          "The robotics breakthrough shifts the PPC outward, expanding what Zaraland can produce.",
          "A combination beyond the current curve is unattainable until resources or technology grow."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-1-3-aq1",
          question: "The robotics breakthrough lets Zaraland make more robots at every bread level. On its PPC this appears as…",
          options: [
            "A move to a point inside the curve",
            "An outward shift showing economic growth",
            "A slide down along the existing curve",
            "No change since resources stay fixed"
          ],
          correctAnswer: 1,
          explanation: "Better technology expands what can be produced, shifting the PPC outward - the picture of economic growth. Sliding along the old curve would just trade one good for the other."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The PPC shows every efficient combination of two goods using resources fully.",
          "Inside the curve is inefficient, on it is efficient, outside is unattainable.",
          "Its downward slope is opportunity cost; its outward bow is increasing opportunity cost.",
          "Productive efficiency is any point on the curve; allocative efficiency is the best mix.",
          "More resources, technology, or skills shift the whole PPC outward as economic growth."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-1-3-mastery1",
            question: "A point located OUTSIDE the current PPC represents a combination that is…",
            options: [
              "Efficient and fully attainable",
              "Currently unattainable",
              "Wasteful of some resources",
              "Always allocatively efficient"
            ],
            correctAnswer: 1,
            explanation: "Points beyond the frontier cannot be reached with today's resources and technology. Only growth can bring such points within reach later."
          },
          {
            id: "apm-1-3-mastery2",
            question: "The downward slope of the PPC illustrates…",
            options: [
              "The gains from printing money",
              "Opportunity cost between two goods",
              "That all resources are truly unlimited",
              "Perfect allocative efficiency for the whole economy"
            ],
            correctAnswer: 1,
            explanation: "Sliding along the curve trades one good for the other, so the slope is opportunity cost. Scarcity forces this trade-off between the two goods."
          },
          {
            id: "apm-1-3-mastery3",
            question: "Moving from 90 pizzas/10 robots to 70 pizzas/15 robots, the opportunity cost of one robot is…",
            options: [
              "5 pizzas per robot",
              "4 pizzas per robot",
              "2 pizzas per robot",
              "20 pizzas per robot"
            ],
            correctAnswer: 1,
            explanation: "Giving up 20 pizzas to gain 5 robots is 20 ÷ 5 = 4 pizzas per robot. Always divide the good sacrificed by the good gained."
          },
          {
            id: "apm-1-3-mastery4",
            question: "A straight-line (not bowed) PPC implies that…",
            options: [
              "Opportunity cost is constant",
              "Resources are perfectly wasted",
              "The economy cannot grow",
              "All points are unattainable"
            ],
            correctAnswer: 1,
            explanation: "A straight line means each unit costs the same amount of the other good - constant opportunity cost - because resources are equally useful for both goods."
          },
          {
            id: "apm-1-3-mastery5",
            question: "Which change would shift a nation's entire PPC outward?",
            options: [
              "A rise in unemployment",
              "An advance in production technology",
              "A shift in consumer tastes",
              "Idle factories reopening to the curve"
            ],
            correctAnswer: 1,
            explanation: "Better technology raises what the economy can produce, shifting the whole PPC out. Reopening idle factories only moves the economy back onto its existing curve."
          },
          {
            id: "apm-1-3-mastery6",
            question: "Allocative efficiency differs from productive efficiency because it requires…",
            options: [
              "Producing at the lowest possible cost",
              "Producing the mix society values most",
              "Operating at just about anywhere on the curve",
              "Leaving some of the available resources fully idle"
            ],
            correctAnswer: 1,
            explanation: "Allocative efficiency is the single point matching what society most wants, while productive efficiency is any on-curve point with no waste. A country can be productively efficient yet make the wrong mix."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-1-4",
    sections: [
      {
        type: "concept",
        title: "Absolute vs. Comparative Advantage",
        paragraphs: [
          "Absolute advantage means producing more of a good with the same resources, or the same amount with fewer resources - being the outright better producer. Comparative advantage is subtler and far more important: it means producing a good at a lower opportunity cost than someone else. The stunning result, at the heart of Unit 1, is that gains from trade depend on comparative advantage, not absolute advantage. Even a person or country that is better at everything still benefits from specializing where its opportunity cost is lowest and trading for the rest.",
          "Consider two teens making bracelets and posters in an hour. Ana can make 6 bracelets or 12 posters; Ben can make 2 bracelets or 8 posters. Ana has the absolute advantage in both. But look at opportunity costs. For Ana, one bracelet costs 12/6 = 2 posters. For Ben, one bracelet costs 8/2 = 4 posters. Ana gives up fewer posters per bracelet, so Ana has the comparative advantage in bracelets. Flip it: a poster costs Ana 6/12 = 0.5 bracelets but costs Ben only 8/... rather 2/8 = 0.25 bracelets, so Ben has the comparative advantage in posters.",
          "The rule of thumb for tables: each producer should specialize in the good for which its opportunity cost is LOWEST. To find opportunity cost of good X, divide the amount of the OTHER good by the amount of X (the 'other-over-same' method). Then compare across producers. The one with the smaller opportunity cost for a good should make it. This holds even when one side is more productive at everything, which is why trade can make both parties better off - a result that surprises many students but drives real-world specialization."
        ],
        bullets: [
          "Absolute advantage: producing more output with the same resources.",
          "Comparative advantage: producing a good at a lower opportunity cost.",
          "Gains from trade come from comparative, not absolute, advantage.",
          "Opportunity cost of a good = the OTHER good's amount divided by that good's amount.",
          "Each side specializes where its opportunity cost is lowest, then trades."
        ],
        realWorldExample: "A star lawyer might type faster than any assistant (absolute advantage in both law and typing), but her opportunity cost of typing is huge billable hours lost. The assistant's opportunity cost of typing is far lower, so the assistant types and the lawyer lawyers - both gain from specializing."
      },
      {
        type: "concept",
        title: "Terms of Trade and the Gains from Trade",
        paragraphs: [
          "Once each side specializes, they trade at a price called the terms of trade. A trade only benefits both parties if the terms of trade fall BETWEEN their two opportunity costs. Back to Ana and Ben: a bracelet costs Ana 2 posters and Ben 4 posters. Any trade price for a bracelet between 2 and 4 posters makes both better off. If Ana sells a bracelet for 3 posters, she gains (she only sacrificed 2 posters' worth) and Ben gains too (he would have sacrificed 4 posters to make it himself).",
          "Why does specializing plus trading beat self-sufficiency? By concentrating on their low-cost good, both produce more total output than if each tried to make everything. That larger pie is the gain from trade, and it lets both consume beyond their individual production possibilities curves - a combination each could never reach alone. Trade effectively pushes each party's consumption point outside its own PPC, which is the clearest picture of why voluntary exchange creates value.",
          "Beware two traps the exam sets. First, do not pick specialization based on who makes more (absolute advantage); always compare opportunity costs. Second, a valid trade price must sit strictly between the two opportunity costs; a price equal to one side's own cost leaves that side indifferent, and a price outside the range makes one side refuse. Master finding opportunity cost from a table, identify each comparative advantage, and check that the terms of trade lie in the mutually beneficial zone."
        ],
        bullets: [
          "Terms of trade is the agreed price at which the two goods are exchanged.",
          "A mutually beneficial trade price lies between the two producers' opportunity costs.",
          "Specialization plus trade lets both parties consume beyond their own PPCs.",
          "Compare opportunity costs, not raw output, to assign specialization.",
          "A price outside the opportunity-cost range makes one side refuse to trade."
        ],
        realWorldExample: "Two roommates: one bakes cookies cheaply (in time), the other fixes bikes cheaply. If a bike repair 'costs' 3 dozen cookies for one and 6 dozen for the other, any trade priced between 3 and 6 dozen cookies per repair leaves both roommates better off than doing everything themselves."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-1-4-mc1",
            question: "In one hour Ana makes 6 bracelets or 12 posters. Her opportunity cost of one bracelet is…",
            options: [
              "6 posters",
              "2 posters",
              "12 posters",
              "0.5 posters"
            ],
            correctAnswer: 1,
            explanation: "Opportunity cost of a bracelet is the other good over the same good: 12 posters ÷ 6 bracelets = 2 posters per bracelet. Divide the good given up by the good gained."
          },
          {
            id: "apm-1-4-mc2",
            question: "Gains from trade between two countries depend on…",
            options: [
              "Which country has more workers",
              "Differences in comparative advantage",
              "Which country is richer overall",
              "Absolute advantage in both goods"
            ],
            correctAnswer: 1,
            explanation: "Trade creates gains when each side specializes where its opportunity cost is lowest - its comparative advantage. Absolute advantage and size do not determine the gains."
          }
        ]
      },
      {
        type: "scenario",
        title: "Maya and Leo's Snack Stand",
        narrative: "In an hour Maya can make 10 smoothies or 20 sandwiches. Leo can make 4 smoothies or 12 sandwiches. Maya is faster at both. They wonder whether they should each make both items or specialize and trade.",
        details: [
          "Maya has the absolute advantage in both smoothies and sandwiches.",
          "A smoothie costs Maya 2 sandwiches but costs Leo 3 sandwiches, so Maya has the comparative advantage in smoothies.",
          "A sandwich costs Leo one-third of a smoothie but costs Maya one-half, so Leo has the comparative advantage in sandwiches.",
          "A trade price of one smoothie for 2.5 sandwiches lies between their costs, benefiting both."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-1-4-aq1",
          question: "Given the opportunity costs above, how should Maya and Leo specialize?",
          options: [
            "Maya makes both goods since she is faster",
            "Maya makes smoothies and Leo makes sandwiches",
            "Leo makes smoothies and Maya makes sandwiches",
            "Neither one of them should ever specialize at all"
          ],
          correctAnswer: 1,
          explanation: "Each specializes where opportunity cost is lowest: Maya in smoothies (2 vs 3 sandwiches) and Leo in sandwiches (1/3 vs 1/2 smoothie). Being faster overall does not override comparative advantage."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Absolute advantage is producing more; comparative advantage is producing at lower opportunity cost.",
          "Gains from trade flow from comparative advantage, not absolute advantage.",
          "Find opportunity cost by dividing the other good's amount by the good in question.",
          "Each producer specializes in its lowest-opportunity-cost good, then trades.",
          "A mutually beneficial trade price lies between the two producers' opportunity costs."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-1-4-mastery1",
            question: "A country has a comparative advantage in a good when it…",
            options: [
              "Produces more of it than any rival",
              "Produces it at a lower opportunity cost",
              "Has by far the single largest total workforce",
              "Uses only the very newest and fastest factory machines"
            ],
            correctAnswer: 1,
            explanation: "Comparative advantage is about the lowest opportunity cost, not raw output. Producing more is absolute advantage, which does not determine the gains from trade."
          },
          {
            id: "apm-1-4-mastery2",
            question: "If a shirt costs Country A 3 hats and Country B 5 hats, which trade price benefits both?",
            options: [
              "1 hat per shirt",
              "4 hats per shirt",
              "6 hats per shirt",
              "3 hats per shirt exactly"
            ],
            correctAnswer: 1,
            explanation: "A beneficial price lies strictly between the two costs, 3 and 5, so 4 hats works. Prices at or outside the range leave one side no better off or unwilling to trade."
          },
          {
            id: "apm-1-4-mastery3",
            question: "Even if one nation is better at producing everything, trade can still benefit both because…",
            options: [
              "Absolute advantage guarantees gains",
              "Comparative advantage still differs",
              "One nation must give up trading",
              "Opportunity costs are always equal"
            ],
            correctAnswer: 1,
            explanation: "As long as opportunity costs differ, each side has a comparative advantage in something, so specializing and trading raises total output. Absolute advantage alone does not create the gains."
          },
          {
            id: "apm-1-4-mastery4",
            question: "Leo makes 4 smoothies or 12 sandwiches per hour. His opportunity cost of one sandwich is…",
            options: [
              "A full 3 smoothies given up per sandwich",
              "One-third of a smoothie",
              "12 smoothies, matching his sandwich rate",
              "4 smoothies, his full hourly output"
            ],
            correctAnswer: 1,
            explanation: "Opportunity cost of a sandwich is smoothies over sandwiches: 4 ÷ 12 = one-third of a smoothie. Divide the good given up by the good gained."
          },
          {
            id: "apm-1-4-mastery5",
            question: "Specialization and trade allow a country to…",
            options: [
              "Eliminate all scarcity entirely and forever",
              "Consume beyond its own PPC",
              "Completely ignore all of its opportunity costs",
              "Produce inside its PPC forever"
            ],
            correctAnswer: 1,
            explanation: "By specializing and trading, a country can reach a consumption point outside its own production possibilities curve. Scarcity and opportunity cost still exist; trade just uses them wisely."
          },
          {
            id: "apm-1-4-mastery6",
            question: "The 'terms of trade' refers to…",
            options: [
              "The total number of workers that each country has",
              "The rate at which goods are exchanged",
              "The number of factories in use",
              "The overall absolute advantage held by a nation"
            ],
            correctAnswer: 1,
            explanation: "Terms of trade is the exchange rate between the two goods being traded. It must fall between the trading partners' opportunity costs to benefit both."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-1-5",
    sections: [
      {
        type: "concept",
        title: "Explicit vs. Implicit Costs and Two Kinds of Profit",
        paragraphs: [
          "Every choice has costs, but economists split them in two. Explicit costs are out-of-pocket payments - the $2,000 a month a food-truck owner pays for ingredients, fuel, and permits. Implicit costs are the value of resources the owner already owns and could have used elsewhere, like the $4,000 salary they gave up by quitting a job, or the interest their savings could have earned. Implicit costs never appear on a receipt, but they are real opportunity costs and must be counted in good decision-making.",
          "This split creates two profit measures. Accounting profit = total revenue minus explicit costs only. Economic profit = total revenue minus BOTH explicit and implicit costs. Because economic profit subtracts more, it is always smaller than or equal to accounting profit. Suppose the truck earns $8,000 revenue with $2,000 explicit costs and $4,000 implicit costs. Accounting profit is $6,000, but economic profit is only $2,000. Economic profit is the truer test of whether the venture beats the owner's next-best alternative.",
          "A key milestone is normal profit, which occurs when economic profit equals exactly zero. Zero economic profit sounds like failure, but it actually means the business is earning just enough to cover ALL costs, including the implicit opportunity cost of the owner's time and money. In other words, the owner is doing exactly as well as their next-best option - no better, no worse. Positive economic profit means the venture beats the alternative; negative economic profit means the owner would be better off doing something else."
        ],
        bullets: [
          "Explicit costs are out-of-pocket payments; implicit costs are forgone opportunities.",
          "Accounting profit = revenue minus explicit costs only.",
          "Economic profit = revenue minus explicit AND implicit costs (always ≤ accounting profit).",
          "Normal profit is zero economic profit - covering every cost including opportunity cost.",
          "Positive economic profit means the venture beats the owner's next-best alternative."
        ],
        realWorldExample: "A teen who quits a $15-an-hour job to run a lawn-care business must count that lost wage as an implicit cost. If the business nets $500 a week in accounting profit but the forgone wages were $600, its economic profit is negative - a sign the teen was better off keeping the job."
      },
      {
        type: "concept",
        title: "Sunk Costs, Net Benefit, and Capital vs. Consumer Goods",
        paragraphs: [
          "A sunk cost is money already spent that cannot be recovered, and the golden rule is to IGNORE sunk costs in decisions. If you paid $12 for a movie ticket, the $12 is gone whether you stay or leave; the smart question is only whether the remaining hour of a bad film beats doing something else. Basing choices on sunk costs - 'I already paid, so I have to finish' - is the sunk-cost fallacy, and avoiding it is a favorite AP theme because it isolates true marginal thinking.",
          "Rational cost-benefit analysis picks the option with the greatest net benefit, defined as total benefit minus total cost, counting only relevant future costs. If joining a club gives $200 of value but costs $150 of time and money, its net benefit is $50; an activity with net benefit of $80 beats it. This connects to marginal analysis: keep adding units while each one's marginal benefit exceeds its marginal cost, since doing so raises net benefit until they are equal.",
          "Finally, distinguish two uses of production. Capital goods are things used to make other goods - a bakery's oven, a coder's laptop, a delivery van. Consumer goods are bought for direct enjoyment - a slice of cake, a video game, a movie ticket. Choosing to build more capital goods today means fewer consumer goods now, but that investment expands future production, pushing the PPC outward. This trade-off between consuming now and investing for later ties Unit 1's ideas together: scarcity, opportunity cost, and growth."
        ],
        bullets: [
          "A sunk cost is unrecoverable and should be ignored in current decisions.",
          "The sunk-cost fallacy is letting past spending drive future choices.",
          "Net benefit = total benefit minus total (relevant, future) cost; pick the highest.",
          "Capital goods produce other goods; consumer goods are enjoyed directly.",
          "Investing in capital now sacrifices present consumption but grows future output."
        ],
        realWorldExample: "A gamer who bought a $60 game they now dislike should not keep playing just to 'get their money's worth' - that $60 is sunk. The only sensible question is whether the next hour of the game beats other things they could do with that hour."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-1-5-mc1",
            question: "Economic profit differs from accounting profit because it also subtracts…",
            options: [
              "All the firm's explicit costs",
              "Implicit opportunity costs",
              "The firm's total revenue",
              "Future sunk costs only"
            ],
            correctAnswer: 1,
            explanation: "Economic profit subtracts implicit costs (forgone opportunities) on top of explicit costs. That is why economic profit is always less than or equal to accounting profit."
          },
          {
            id: "apm-1-5-mc2",
            question: "You paid $30 for a concert ticket you now cannot resell. In deciding whether to attend, that $30 is…",
            options: [
              "An implicit cost to weigh",
              "A sunk cost to ignore",
              "A marginal benefit of going",
              "Part of your net benefit"
            ],
            correctAnswer: 1,
            explanation: "Money already spent and unrecoverable is a sunk cost, which should not affect the decision. Only the remaining benefits and costs of attending matter now."
          }
        ]
      },
      {
        type: "scenario",
        title: "Devon's Photography Side Hustle",
        narrative: "Devon quit a $500-a-week job to launch a photography business. Each week he spends $200 on gear rental and travel and brings in $900 in revenue. He already spent $1,000 on a camera he cannot return. He is deciding whether the business is worth continuing.",
        details: [
          "The $200 weekly gear and travel spending is an explicit cost of the business.",
          "The $500 weekly wage Devon gave up is an implicit cost he must include.",
          "The $1,000 camera is a sunk cost and should not affect whether he continues.",
          "His economic profit is $900 minus $200 explicit and $500 implicit costs, or $200 per week."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-1-5-aq1",
          question: "Based on the numbers, what should Devon conclude about continuing the business?",
          options: [
            "Stop, since his accounting profit is negative",
            "Continue, since his economic profit is positive",
            "Continue only to recover the camera's $1,000",
            "Stop right away, because implicit costs simply never matter"
          ],
          correctAnswer: 1,
          explanation: "Economic profit of $200 per week is positive, so the business beats his next-best option, the old job. The sunk $1,000 camera is irrelevant, and implicit costs do matter."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Explicit costs are paid out; implicit costs are the value of forgone opportunities.",
          "Accounting profit ignores implicit costs; economic profit subtracts them too.",
          "Normal profit means zero economic profit - covering every cost including opportunity cost.",
          "Ignore sunk costs; base decisions only on future benefits and costs.",
          "Capital goods build future output; investing in them trades present consumption for growth."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-1-5-mastery1",
            question: "Which is an example of an implicit cost for a business owner?",
            options: [
              "The monthly rent paid out on the physical storefront",
              "The salary given up to run the firm",
              "The regular wages paid out to all the hired workers",
              "The cash directly spent on buying the raw materials"
            ],
            correctAnswer: 1,
            explanation: "The forgone salary is an opportunity cost the owner does not pay out of pocket, making it implicit. Rent, wages, and materials are explicit, paid-out costs."
          },
          {
            id: "apm-1-5-mastery2",
            question: "A firm earns zero economic profit. This means it is earning…",
            options: [
              "Less than its next-best option",
              "Exactly a normal profit",
              "No revenue whatsoever",
              "A large accounting loss"
            ],
            correctAnswer: 1,
            explanation: "Zero economic profit is normal profit: the firm covers every cost, including opportunity cost, and does exactly as well as its next-best alternative."
          },
          {
            id: "apm-1-5-mastery3",
            question: "The sunk-cost fallacy occurs when a person…",
            options: [
              "Weighs only future costs and benefits",
              "Lets unrecoverable past spending drive choices",
              "Ignores all of their implicit costs",
              "Carefully compares the net benefits of each option"
            ],
            correctAnswer: 1,
            explanation: "The fallacy is letting money already spent, which cannot be recovered, dictate current decisions. Rational choice looks only at future costs and benefits."
          },
          {
            id: "apm-1-5-mastery4",
            question: "Revenue is $10,000; explicit costs are $4,000 and implicit costs are $3,000. Economic profit is…",
            options: [
              "$6,000",
              "$3,000",
              "$10,000",
              "$7,000"
            ],
            correctAnswer: 1,
            explanation: "Economic profit subtracts both explicit and implicit costs: $10,000 - $4,000 - $3,000 = $3,000. Accounting profit would be the larger $6,000."
          },
          {
            id: "apm-1-5-mastery5",
            question: "Which of the following is a capital good rather than a consumer good?",
            options: [
              "A slice of pizza eaten for lunch",
              "A delivery van used by a bakery",
              "A single movie ticket bought purely for fun",
              "A brand new video game played at home for hours"
            ],
            correctAnswer: 1,
            explanation: "A delivery van is used to produce and sell other goods, making it a capital good. Pizza, movie tickets, and games are consumed directly for enjoyment."
          },
          {
            id: "apm-1-5-mastery6",
            question: "Choosing to produce more capital goods today generally…",
            options: [
              "Steadily shrinks the whole economy's future output over time",
              "Raises future output but lowers present consumption",
              "Has no effect on the PPC at all",
              "Completely eliminates the ongoing need to make choices"
            ],
            correctAnswer: 1,
            explanation: "Building capital now means fewer consumer goods today but more production capacity later, shifting the PPC outward. It is a trade-off between present and future, not a free gain."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-1-6",
    sections: [
      {
        type: "concept",
        title: "Marginal Benefit, Marginal Cost, and Diminishing Utility",
        paragraphs: [
          "Utility is the satisfaction you get from consuming something, measured in made-up units called utils just to compare choices. Total utility is the whole stack of satisfaction from all units consumed; marginal utility is the EXTRA satisfaction from one more unit. When you are starving, the first taco might give 20 utils, the second 14, the third 8, the fourth 3. Total utility keeps rising (20, 34, 42, 45), but each addition is smaller. That shrinking pattern is the law of diminishing marginal utility, and it appears almost everywhere in consumption.",
          "The decision rule for any single activity is to keep going while marginal benefit is at least marginal cost, stopping where they meet. If each taco costs 5 utils' worth of money, you buy the first (20 > 5), second (14 > 5), and third (8 > 5), but stop before the fourth (3 < 5). This is pure marginal thinking: you never ask about totals, only about whether the NEXT unit is worth its cost. The optimum sits exactly where marginal benefit equals marginal cost.",
          "Diminishing marginal utility also explains the downward-sloping demand curve from Unit 2. Because each extra unit is worth less to you, you will only buy more if the price falls to match that lower marginal value. So a person's willingness to pay drops as they consume more, which is precisely why demand curves slope down. Marginal analysis, then, is the engine underneath consumer behavior, tying the small idea of 'one more util' to the big shape of market demand."
        ],
        bullets: [
          "Utility is satisfaction; total utility stacks it while marginal utility is the extra from one more unit.",
          "The law of diminishing marginal utility: each additional unit adds less satisfaction.",
          "Decision rule: consume while marginal benefit is at least marginal cost.",
          "The optimum for one activity is where marginal benefit equals marginal cost.",
          "Falling marginal utility is why the demand curve slopes downward."
        ],
        realWorldExample: "At an all-you-can-eat buffet, the first plate delivers big satisfaction, the third much less, and the fifth may add almost none. Diners stop piling on food when the marginal utility of another plate drops below the effort of getting up - marginal analysis at the dinner table."
      },
      {
        type: "concept",
        title: "The Utility-Maximizing Rule Across Goods",
        paragraphs: [
          "With a limited budget and many goods, how do you split your money? The utility-maximizing rule says to allocate spending so the marginal utility per dollar is equal across all goods: MU-of-A divided by price-of-A equals MU-of-B divided by price-of-B, and so on. The 'per dollar' part is key, because a good with high utility but a high price may deliver less bang per dollar than a cheaper good. You want each dollar to buy the same amount of extra satisfaction no matter where it is spent.",
          "Work an example. Suppose a burger gives 30 utils and costs $6, so 5 utils per dollar, while fries give 12 utils and cost $2, so 6 utils per dollar. Fries currently give more satisfaction per dollar, so you should shift a dollar from burgers to fries. As you buy more fries, their marginal utility falls (diminishing utility), and as you buy fewer burgers, burger marginal utility rises, until the two ratios equalize. At that balance point, no reshuffling of dollars can raise your total utility - you are maximizing.",
          "This rule quietly powers a lot of economics. If the price of one good falls, its marginal utility per dollar rises, so you buy more of it to restore balance - which is exactly the law of demand. It also explains why people buy variety rather than blowing an entire budget on one item: diminishing marginal utility pulls each additional dollar toward whatever now offers the best per-dollar payoff. Balancing marginal utility per dollar is the tidy math behind the everyday habit of shopping smart."
        ],
        bullets: [
          "The utility-maximizing rule sets marginal utility per dollar equal across all goods.",
          "Compare MU divided by price, not marginal utility alone, because prices differ.",
          "If one good gives more utility per dollar, shift spending toward it.",
          "Diminishing utility rebalances the ratios until no reshuffle helps.",
          "A price drop raises a good's MU per dollar, so you buy more - the law of demand."
        ],
        realWorldExample: "With $10, a student compares snacks: if candy gives 8 utils per dollar and juice gives 5, they buy more candy first. As candy's marginal utility falls with each bar, the ratios eventually even out, and the last dollar spent on candy delivers the same satisfaction as the last spent on juice."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-1-6-mc1",
            question: "As you eat more slices of pizza, the fourth adds less satisfaction than the third. This illustrates…",
            options: [
              "Rising total utility only",
              "Diminishing marginal utility",
              "The utility-maximizing rule",
              "Negative explicit costs"
            ],
            correctAnswer: 1,
            explanation: "Each extra slice adding less satisfaction is diminishing marginal utility. Total utility may still climb, but by smaller amounts each time."
          },
          {
            id: "apm-1-6-mc2",
            question: "A consumer maximizes utility when the marginal utility per dollar is…",
            options: [
              "Highest for the priciest good",
              "Equal across all goods bought",
              "Zero for every single good",
              "Ignored in favor of total utility"
            ],
            correctAnswer: 1,
            explanation: "Utility is maximized when MU divided by price is equal across all goods, so no dollar could be moved to gain more satisfaction. It is the per-dollar ratio that must match."
          }
        ]
      },
      {
        type: "scenario",
        title: "Rosa's $12 Snack Budget",
        narrative: "Rosa has $12 to spend at a food fair. A pretzel gives her 24 utils and costs $4; a lemonade gives her 15 utils and costs $3. She wants the most satisfaction possible and notices the first of each item feels great but later ones feel less exciting.",
        details: [
          "The fading excitement of each additional item shows diminishing marginal utility.",
          "The pretzel gives 24 ÷ 4 = 6 utils per dollar; the lemonade gives 15 ÷ 3 = 5 utils per dollar.",
          "Because the pretzel offers more utility per dollar, Rosa should buy pretzels first.",
          "She maximizes utility when the marginal utility per dollar is equal across both snacks."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-1-6-aq1",
          question: "With the pretzel at 6 utils per dollar and the lemonade at 5, what is Rosa's next best move?",
          options: [
            "Simply spend every single dollar he has on lemonade first",
            "Buy a pretzel, which gives more utility per dollar",
            "Split the money perfectly evenly between them no matter what",
            "Buy absolutely neither of them until the prices change"
          ],
          correctAnswer: 1,
          explanation: "The pretzel delivers more satisfaction per dollar (6 vs 5), so a rational shopper spends the next dollar there. As she buys more pretzels their marginal utility falls, eventually equalizing the ratios."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Utility is satisfaction; marginal utility is the extra from one more unit.",
          "The law of diminishing marginal utility means each unit adds less than the last.",
          "For one activity, consume until marginal benefit equals marginal cost.",
          "The utility-maximizing rule equalizes marginal utility per dollar across goods.",
          "Diminishing marginal utility underlies the downward-sloping demand curve."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-1-6-mastery1",
            question: "Marginal utility is best defined as…",
            options: [
              "The full total satisfaction gained from all of the units",
              "The extra satisfaction from one more unit",
              "The current dollar market price of a good",
              "The number of goods a person owns"
            ],
            correctAnswer: 1,
            explanation: "Marginal utility is the added satisfaction from consuming one more unit. Total utility is the sum across all units, a different measure."
          },
          {
            id: "apm-1-6-mastery2",
            question: "A good costs $5 and gives 20 utils; another costs $2 and gives 10 utils. Which offers more utility per dollar?",
            options: [
              "The $5 good, at 4 per dollar",
              "The $2 good, at 5 per dollar",
              "They are both exactly equal in value per dollar",
              "Neither one, since utility points are fake"
            ],
            correctAnswer: 1,
            explanation: "The $2 good gives 10 ÷ 2 = 5 utils per dollar, beating the $5 good's 20 ÷ 5 = 4. Comparing per-dollar ratios, not raw utility, guides the choice."
          },
          {
            id: "apm-1-6-mastery3",
            question: "For a single activity, the optimal amount to consume is where…",
            options: [
              "Total utility first turns positive",
              "Marginal benefit equals marginal cost",
              "Marginal utility reaches its highest point",
              "The price of the good is lowest"
            ],
            correctAnswer: 1,
            explanation: "You keep consuming while marginal benefit exceeds marginal cost and stop where they are equal. That equality marks the utility-maximizing quantity for the activity."
          },
          {
            id: "apm-1-6-mastery4",
            question: "The law of diminishing marginal utility helps explain why…",
            options: [
              "Supply curves slope upward",
              "Demand curves slope downward",
              "Firms earn zero profit long run",
              "Governments impose excise taxes"
            ],
            correctAnswer: 1,
            explanation: "Because each extra unit is worth less, buyers pay more only if price falls, so demand slopes down. The other options come from unrelated parts of the course."
          },
          {
            id: "apm-1-6-mastery5",
            question: "At the utility-maximizing point, spending one more dollar on any good would…",
            options: [
              "Always raise total utility further",
              "Not increase total utility",
              "Guarantee a larger budget",
              "Eliminate diminishing utility"
            ],
            correctAnswer: 1,
            explanation: "When marginal utility per dollar is equal everywhere, no reshuffling of dollars can raise total utility. That balance is exactly what maximizing means."
          },
          {
            id: "apm-1-6-mastery6",
            question: "If the price of a good a consumer buys falls, the utility-maximizing rule predicts they will…",
            options: [
              "Buy less of that good",
              "Buy more of that good",
              "Stop buying every other good",
              "Ignore the whole price change completely"
            ],
            correctAnswer: 1,
            explanation: "A lower price raises the good's marginal utility per dollar, so the consumer buys more to restore balance. This response is the law of demand emerging from utility maximization."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-2-5",
    sections: [
      {
        type: "concept",
        title: "Price Ceilings and Price Floors",
        paragraphs: [
          "A price control is a legal limit on what a good can sell for. A price ceiling is a legal maximum price, meant to help buyers; a price floor is a legal minimum, meant to help sellers. A control only bites when it is set on the 'wrong' side of equilibrium. A binding ceiling must sit below the equilibrium price, and a binding floor must sit above it. If a ceiling is set above equilibrium, or a floor below it, the market clears normally and the control does nothing.",
          "A binding ceiling creates a shortage. Imagine apartments clear at $1,500 with 10,000 rented. A rent cap of $1,000 makes renters want 14,000 units but landlords only offer 7,000, so 7,000 hopeful renters cannot find a home. The gap of 7,000 is the shortage. Nonprice rationing appears: long waitlists, bribes, and quality decline as landlords stop maintaining buildings they cannot charge more for.",
          "A binding floor creates a surplus. The minimum wage is the classic case: if the wage clears at $9 but the law sets $12, firms want fewer workers while more people want jobs, so quantity of labor supplied exceeds quantity demanded and the gap is unemployment. Agricultural price floors work the same way and leave governments buying up unsold crops. On a supply-and-demand graph, draw the horizontal control line, read quantity demanded and quantity supplied off it, and the horizontal distance between them is the shortage or surplus."
        ],
        bullets: [
          "A price ceiling is a legal maximum; a price floor is a legal minimum.",
          "A ceiling binds only below equilibrium; a floor binds only above equilibrium.",
          "A binding ceiling causes a shortage (Qd greater than Qs) and nonprice rationing.",
          "A binding floor causes a surplus (Qs greater than Qd), like unemployment under a minimum wage.",
          "A control set on the harmless side of equilibrium has no effect on price or quantity."
        ],
        realWorldExample: "During a fuel crisis a city caps gasoline at $3 while it would clear at $4.50. Drivers want far more gas than stations will supply at $3, so lines stretch for blocks and stations run dry by noon - a textbook shortage from a binding ceiling."
      },
      {
        type: "concept",
        title: "Excise Taxes, Incidence, and Deadweight Loss",
        paragraphs: [
          "An excise tax is a per-unit tax on a specific good, like $2 per pack of cigarettes. It drives a wedge between the price buyers pay and the price sellers keep. Graphically, the supply curve shifts up by the tax amount. The new buyer price rises, the seller's after-tax price falls, and equilibrium quantity drops. The government collects tax revenue equal to the tax per unit times the quantity still traded - a rectangle on the graph.",
          "Tax incidence is the split of that burden between buyers and sellers, and it depends on relative elasticity, not on who legally writes the check. The more inelastic side pays the larger share because it is less able to change behavior. Cigarettes have very inelastic demand, so buyers bear most of a tobacco tax even though stores technically remit it. When supply is more inelastic than demand, sellers shoulder more of the burden instead.",
          "Because the tax shrinks quantity below the efficient level, some mutually beneficial trades never happen. The value those lost trades would have created is deadweight loss - a triangle between the supply and demand curves over the reduced-quantity range. Deadweight loss is pure lost surplus that goes to nobody. A subsidy is the mirror image: it lowers the price buyers pay, raises the price sellers get, and expands quantity above equilibrium, which also creates deadweight loss from overproduction."
        ],
        bullets: [
          "An excise tax is a per-unit tax that shifts supply up by the tax and lowers quantity.",
          "Incidence depends on elasticity, not on who legally remits the tax.",
          "The more inelastic side of the market bears the larger share of the tax.",
          "Deadweight loss is the surplus lost from trades that no longer occur.",
          "A subsidy is a mirror image, raising quantity above equilibrium and also causing deadweight loss."
        ],
        realWorldExample: "A $2 soda tax raises the shelf price from $1.50 to $3.20, not the full $2, because sellers absorb part of it. Sales fall, the city collects $2 per can sold, and the cans no longer bought represent deadweight loss - value that simply vanishes."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-2-5-mc1",
            question: "A binding price ceiling on rent is set below the equilibrium price. The predictable result is…",
            options: [
              "A surplus of empty apartments",
              "A shortage of available apartments",
              "No change in the housing market",
              "A rise in the equilibrium rent"
            ],
            correctAnswer: 1,
            explanation: "Below equilibrium, quantity demanded exceeds quantity supplied, so renters cannot find enough units. That gap is a shortage, the signature result of a binding ceiling."
          },
          {
            id: "apm-2-5-mc2",
            question: "An excise tax is placed on a good with very inelastic demand. Most of the tax burden falls on…",
            options: [
              "Buyers, who cannot easily cut back",
              "Sellers, who set the shelf price",
              "The government collecting it for this good",
              "Nobody, since trades continue in that market"
            ],
            correctAnswer: 0,
            explanation: "The inelastic side changes quantity the least, so it bears more of the tax. Inelastic demand means buyers keep buying, so they absorb most of the burden."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Concert Ticket Cap",
        narrative: "A city worried about scalping passes a law capping resale concert tickets at $80. For a sold-out show the market would clear near $200. Separately, the state adds a $10 excise tax on every ticket sold through official channels, where demand for that headliner is highly inelastic.",
        details: [
          "The $80 resale cap sits below the $200 clearing price, so it is a binding ceiling that creates a ticket shortage.",
          "With far more fans wanting tickets than are available at $80, nonprice rationing appears through waitlists and black-market deals.",
          "The $10 excise tax shifts the ticket supply curve up and lowers the number of official tickets sold.",
          "Because demand for this headliner is inelastic, fans bear most of the $10 tax through a higher face price."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-2-5-aq1",
          question: "Given the $80 resale cap on tickets that would clear at $200, what should the city expect?",
          options: [
            "A surplus of unsold tickets at $80",
            "A shortage with fans unable to buy",
            "The clearing price to rise to $200",
            "No effect on how tickets are sold"
          ],
          correctAnswer: 1,
          explanation: "An $80 ceiling below the $200 clearing price is binding, so quantity demanded far exceeds quantity supplied. Many fans are left without tickets - a shortage."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Price ceilings are legal maximums and bind below equilibrium, causing shortages.",
          "Price floors are legal minimums and bind above equilibrium, causing surpluses like unemployment.",
          "An excise tax shifts supply up, lowers quantity, and raises the buyer price above the seller price.",
          "Tax incidence falls more heavily on the more inelastic side of the market.",
          "Both taxes and binding controls create deadweight loss from trades that no longer happen."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-2-5-mastery1",
            question: "For a price floor to have any effect on the market, it must be set…",
            options: [
              "Below the equilibrium price",
              "Above the equilibrium price",
              "Exactly at equilibrium",
              "At zero for the good"
            ],
            correctAnswer: 1,
            explanation: "A floor only binds when it is above equilibrium, forcing the price up and creating a surplus. A floor below equilibrium is irrelevant."
          },
          {
            id: "apm-2-5-mastery2",
            question: "A minimum wage set above the equilibrium wage will most likely cause…",
            options: [
              "A shortage of available workers for this good",
              "A surplus of labor, or unemployment",
              "Wages to fall back to equilibrium",
              "No change in hiring at all"
            ],
            correctAnswer: 1,
            explanation: "A binding wage floor makes quantity of labor supplied exceed quantity demanded. The extra job-seekers who cannot find work are the surplus, seen as unemployment."
          },
          {
            id: "apm-2-5-mastery3",
            question: "An excise tax on a good drives a wedge that makes the price buyers pay…",
            options: [
              "Equal to the seller's price",
              "Higher than the seller keeps",
              "Lower than before the tax",
              "Unrelated to the tax size"
            ],
            correctAnswer: 1,
            explanation: "The tax separates the two prices: buyers pay more while sellers keep less, and the difference is the per-unit tax. The gap between them equals the tax."
          },
          {
            id: "apm-2-5-mastery4",
            question: "Deadweight loss from a tax represents…",
            options: [
              "Revenue collected by the government in that market",
              "Surplus lost from trades that stop",
              "Extra profit earned by sellers",
              "Money saved by buyers for this good"
            ],
            correctAnswer: 1,
            explanation: "Deadweight loss is the value of mutually beneficial trades that no longer occur because the tax shrinks quantity. It is surplus lost to everyone, not revenue."
          },
          {
            id: "apm-2-5-mastery5",
            question: "Supply is far more inelastic than demand in a market that gets a new excise tax. The burden falls mainly on…",
            options: [
              "Buyers, who can shop elsewhere",
              "Sellers, who cannot adjust quantity",
              "The government agency involved for this good",
              "Neither side in the market"
            ],
            correctAnswer: 1,
            explanation: "The more inelastic side bears more of the tax. With supply more inelastic than demand, sellers change quantity least and absorb the larger share."
          },
          {
            id: "apm-2-5-mastery6",
            question: "Compared with a tax, a per-unit subsidy on a good will…",
            options: [
              "Reduce the quantity traded",
              "Expand quantity above equilibrium",
              "Raise the price buyers pay",
              "Leave the market unchanged"
            ],
            correctAnswer: 1,
            explanation: "A subsidy lowers the buyer price and raises the seller price, pushing quantity above the efficient level. That overproduction also creates deadweight loss."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-2-6",
    sections: [
      {
        type: "concept",
        title: "Comparative Advantage as the Basis for Trade",
        paragraphs: [
          "Nations trade for the same reason people do: specialization based on comparative advantage makes everyone richer. Absolute advantage means producing a good using fewer resources. Comparative advantage means producing it at a lower opportunity cost - giving up less of other goods. A country should export the goods in which it has a comparative advantage and import the rest, even if it is worse at making everything or better at making everything.",
          "Work a simple example. Suppose in a day the US can make 100 phones or 200 shirts, while Vietnam can make 20 phones or 100 shirts. The US phone's opportunity cost is 2 shirts; Vietnam's phone costs 5 shirts. The US gives up fewer shirts per phone, so it has the comparative advantage in phones. For shirts, the US opportunity cost is 0.5 phones while Vietnam's is 0.2 phones, so Vietnam should specialize in shirts. Each exports what it sacrifices least to make.",
          "Trade is beneficial when the terms of trade fall between the two opportunity costs. If one phone trades for somewhere between 2 and 5 shirts, both countries end up with more of both goods than they could produce alone. This is why economists overwhelmingly favor free trade: total world output rises, and consumers in both countries gain access to cheaper goods. The catch is that the gains are spread widely while losses concentrate on displaced industries and workers."
        ],
        bullets: [
          "Absolute advantage uses fewer resources; comparative advantage means lower opportunity cost.",
          "A country exports goods where its opportunity cost is lowest and imports the rest.",
          "Opportunity cost of a good equals how much of the other good is given up to make it.",
          "Trade benefits both sides when the terms of trade fall between the two opportunity costs.",
          "Specialization by comparative advantage raises total output beyond what either could make alone."
        ],
        realWorldExample: "A surgeon may type faster than her assistant, giving her an absolute advantage at both surgery and typing. But her opportunity cost of typing is enormous, so she specializes in surgery and lets the assistant type. Countries follow the same logic when they specialize and trade."
      },
      {
        type: "concept",
        title: "Tariffs, Quotas, and Surplus Effects",
        paragraphs: [
          "Free trade helps consumers but pressures domestic producers who compete with cheaper imports, so governments often impose trade barriers. A tariff is a tax on imported goods. It raises the domestic price toward the pre-trade level, which helps domestic producers and the government but hurts consumers. On a supply-and-demand graph, the higher price expands domestic quantity supplied, shrinks quantity demanded, and reduces imports to the gap between them.",
          "Tracking surplus shows the tradeoff. Under free trade at the low world price, consumer surplus is large. A tariff raises the price, so consumer surplus falls. Part of that lost consumer surplus becomes producer surplus for domestic firms, part becomes government tariff revenue, and part simply vanishes as deadweight loss. The deadweight loss comes from two triangles: inefficient extra domestic production and lost consumption from buyers priced out.",
          "A quota is a legal limit on the quantity of a good that can be imported. It also raises the domestic price and creates similar deadweight loss, but instead of government revenue the extra money goes to whoever holds the import licenses - often foreign producers. Because total surplus falls under both tariffs and quotas, economists view them as net losses for the economy even though specific domestic industries clearly benefit. Arguments for protection usually rest on infant industries, national security, or protecting jobs."
        ],
        bullets: [
          "A tariff is a tax on imports that raises the domestic price and reduces the volume of imports.",
          "A tariff lowers consumer surplus while raising producer surplus and government revenue.",
          "Tariffs and quotas both create deadweight loss, so total surplus falls.",
          "A quota caps import quantity; its extra revenue goes to license holders, not the government.",
          "Common protection arguments cite infant industries, national security, and saving jobs."
        ],
        realWorldExample: "A 25 percent tariff on imported steel lifts US steel prices. Domestic mills and the Treasury gain, but carmakers and appliance buyers pay more, and the trades priced out of the market are deadweight loss - value lost to the whole economy."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-2-6-mc1",
            question: "The US gives up 2 shirts per phone while Vietnam gives up 5 shirts per phone. Comparative advantage in phones belongs to…",
            options: [
              "Vietnam, with the higher cost in that market",
              "The US, with the lower cost",
              "Neither country produces phones for this good",
              "Both equally share the phones"
            ],
            correctAnswer: 1,
            explanation: "Comparative advantage goes to the lower-opportunity-cost producer. The US gives up only 2 shirts per phone versus Vietnam's 5, so the US should specialize in phones."
          },
          {
            id: "apm-2-6-mc2",
            question: "A tariff on imported shoes will most directly…",
            options: [
              "Raise consumer surplus for buyers in that market",
              "Raise the domestic price of shoes",
              "Increase the volume of imports",
              "Lower domestic producer surplus for this good"
            ],
            correctAnswer: 1,
            explanation: "A tariff taxes imports and pushes the domestic price up. That higher price helps domestic producers and the government but reduces imports and hurts consumers."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Sneaker Trade Debate",
        narrative: "A country can make sneakers cheaply abroad, where the world price is $40, far below the $70 it costs local factories. Domestic shoemakers lobby for protection. Lawmakers weigh a $20 tariff on imported sneakers versus an import quota limiting foreign sneakers.",
        details: [
          "At the $40 world price, consumers enjoy large consumer surplus but domestic factories lose sales to imports.",
          "A $20 tariff raises the domestic price toward $60, helping local factories and giving the government revenue.",
          "The tariff shrinks consumer surplus, and part of that loss becomes pure deadweight loss for the economy.",
          "A quota would raise the price similarly, but the extra revenue would flow to import license holders instead of the treasury."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-2-6-aq1",
          question: "Comparing the $20 tariff with an equivalent quota on sneakers, a key difference is that…",
          options: [
            "Only the quota raises the price",
            "The tariff generates government revenue",
            "Only the tariff cuts imports",
            "The quota avoids deadweight loss"
          ],
          correctAnswer: 1,
          explanation: "Both raise the price and create deadweight loss, but the tariff's extra revenue goes to the government while a quota's goes to license holders. That revenue split is the key contrast."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Comparative advantage - lowest opportunity cost - is the basis for beneficial specialization and trade.",
          "Countries export goods they sacrifice least to make and import the rest.",
          "Trade benefits both sides when terms of trade fall between the two opportunity costs.",
          "A tariff raises domestic price, aids producers and government, but cuts consumer surplus and total surplus.",
          "A quota mirrors a tariff but channels the extra revenue to license holders rather than the government."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-2-6-mastery1",
            question: "A country has a comparative advantage in a good when it has the…",
            options: [
              "Highest total output of it",
              "Lowest opportunity cost of it",
              "Largest workforce making it for this good",
              "Newest technology for it"
            ],
            correctAnswer: 1,
            explanation: "Comparative advantage is defined by opportunity cost, not output size or technology. The country giving up the least of other goods should specialize in it."
          },
          {
            id: "apm-2-6-mastery2",
            question: "One country can produce more of every good than another. Trade can still benefit both because…",
            options: [
              "Absolute advantage settles all trade",
              "Comparative advantage still differs",
              "One country must lose out",
              "Prices always fall to zero"
            ],
            correctAnswer: 1,
            explanation: "Even with an absolute advantage in everything, opportunity costs differ, so each side gains by specializing where its cost is lowest. Comparative, not absolute, advantage drives trade."
          },
          {
            id: "apm-2-6-mastery3",
            question: "Trade between two nations is mutually beneficial when the terms of trade…",
            options: [
              "Equal one country's cost exactly",
              "Fall between the two opportunity costs",
              "Exceed both opportunity costs for this good",
              "Are set by a single nation"
            ],
            correctAnswer: 1,
            explanation: "If the trade ratio lands between the two countries' opportunity costs, each gets a good more cheaply than making it, so both gain. Outside that range, one side would refuse."
          },
          {
            id: "apm-2-6-mastery4",
            question: "A tariff on imports reduces total surplus because it…",
            options: [
              "Transfers surplus to producers",
              "Creates deadweight loss triangles",
              "Raises government revenue for this good",
              "Helps domestic factories grow"
            ],
            correctAnswer: 1,
            explanation: "Transfers to producers and the government are not net losses. Total surplus falls because of deadweight loss from inefficient production and lost consumption."
          },
          {
            id: "apm-2-6-mastery5",
            question: "Under a tariff, the loss in consumer surplus is split among all of these EXCEPT…",
            options: [
              "Government tariff revenue",
              "Extra domestic producer surplus",
              "Deadweight loss to the economy",
              "Higher surplus for consumers"
            ],
            correctAnswer: 3,
            explanation: "Consumer surplus falls, so it cannot rise. The lost consumer surplus becomes producer surplus, government revenue, and deadweight loss."
          },
          {
            id: "apm-2-6-mastery6",
            question: "A quota differs from a tariff mainly in that a quota…",
            options: [
              "Lowers the domestic price for this good",
              "Limits the quantity of imports",
              "Avoids any deadweight loss",
              "Raises no price at all"
            ],
            correctAnswer: 1,
            explanation: "A quota caps import quantity directly rather than taxing it. Like a tariff it raises price and causes deadweight loss, but the price effect works through the quantity limit."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-3-1",
    sections: [
      {
        type: "concept",
        title: "Inputs, Outputs, and the Production Function",
        paragraphs: [
          "A production function shows the maximum output a firm can make from given inputs. Economists sort inputs into fixed and variable. A fixed input cannot change quickly - the size of a factory or number of ovens. A variable input can change fast, like the number of workers or bags of flour. This distinction defines two time frames. In the short run at least one input is fixed; in the long run every input, including plant size, is variable.",
          "Total product is the total output produced. Marginal product is the extra output from adding one more unit of the variable input, usually labor. Average product is total output divided by the number of workers. Suppose a pizza shop with a fixed kitchen produces 10 pizzas an hour with one worker, 25 with two, and 45 with three. The marginal products are 10, then 15, then 20 - rising at first as workers specialize and cover for one another.",
          "Eventually crowding sets in. Add a fourth worker and output may climb to 60, a marginal product of 15; a fifth pushes it to 70, marginal product 10. The extra output per worker is now shrinking. This is the law of diminishing marginal returns: as you add more of a variable input to fixed inputs, the marginal product eventually falls. Notice returns diminish, but total product still rises - just more slowly - until marginal product hits zero, after which more workers actually reduce output."
        ],
        bullets: [
          "A production function maps inputs to the maximum output they can produce.",
          "Fixed inputs cannot change in the short run; all inputs are variable in the long run.",
          "Marginal product is the extra output from one more unit of the variable input.",
          "Marginal product often rises first from specialization, then falls as crowding sets in.",
          "Diminishing marginal returns means added output per worker eventually shrinks, not that total output falls."
        ],
        realWorldExample: "A food truck has one grill (fixed). One cook makes 20 tacos an hour; a second helper raises it to 50; a third to 65. The marginal products - 20, then 30, then 15 - rise, then fall as the small grill gets crowded, exactly what diminishing returns describe."
      },
      {
        type: "concept",
        title: "Why Marginal Returns Diminish and Why It Matters",
        paragraphs: [
          "Diminishing marginal returns happen because the fixed input becomes a bottleneck. With one grill, the first extra cook adds a lot, but each further cook has less grill space to work with, so their added output shrinks. This is a short-run idea - it depends on something being fixed. In the long run the firm could buy a second grill or a bigger truck, so the bottleneck disappears and this particular law no longer applies.",
          "The shapes of the marginal and average product curves are linked in a way the AP exam loves. When marginal product is above average product, it pulls the average up; when marginal product is below average product, it drags the average down. So the marginal product curve always crosses the average product curve at the average's peak. It is the same math as a test score: a quiz above your average raises your GPA, a quiz below it lowers your GPA.",
          "Diminishing returns matter because they drive cost curves, the next lesson's topic. When marginal product is rising, each extra unit of output gets cheaper to make; when marginal product falls, each extra unit gets more expensive because you need more labor per unit. That is the hidden reason marginal cost curves eventually slope upward. Understanding productivity first makes the U-shaped cost curves feel inevitable rather than memorized."
        ],
        bullets: [
          "Diminishing returns arise because a fixed input becomes a bottleneck in the short run.",
          "In the long run firms can expand fixed inputs, so the law need not apply.",
          "Marginal product above average pulls the average up; below it drags the average down.",
          "The marginal product curve crosses the average product curve at the average's maximum.",
          "Falling marginal product is the root cause of rising marginal cost, linking output to cost."
        ],
        realWorldExample: "Adding cashiers to a store with two registers helps until the registers are the bottleneck - a fifth cashier just waits for a free register. That falling marginal product is exactly why serving each additional customer starts costing the store more labor."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-3-1-mc1",
            question: "The law of diminishing marginal returns says that adding more of a variable input to a fixed input eventually causes…",
            options: [
              "Marginal product to keep rising",
              "Marginal product to start falling",
              "Total product to fall right away",
              "Fixed costs to increase sharply"
            ],
            correctAnswer: 1,
            explanation: "Beyond some point each extra worker adds less than the one before, so marginal product falls. Total product can still rise; it just grows more slowly."
          },
          {
            id: "apm-3-1-mc2",
            question: "The short run in production is defined as a period in which…",
            options: [
              "Every input can be varied for this good",
              "At least one input is fixed",
              "No output is produced yet",
              "All costs equal zero always"
            ],
            correctAnswer: 1,
            explanation: "The short run has at least one fixed input, such as plant size. In the long run all inputs, including capital, become variable."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Smoothie Stand Crew",
        narrative: "A smoothie stand has two blenders (fixed) and hires students by the shift. With one worker it makes 30 smoothies an hour; two workers make 70; three make 96; four make 110; five make 115. The owner studies the numbers before deciding how many to hire.",
        details: [
          "Marginal products run 30, 40, 26, 14, then 5 - rising at first, then clearly diminishing.",
          "The rise from 30 to 40 comes from specialization: one blends while the other takes orders.",
          "Diminishing returns kick in at the third worker because only two blenders exist as a bottleneck.",
          "In the long run the owner could buy more blenders, which would push the diminishing point further out."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-3-1-aq1",
          question: "At the smoothie stand, why does marginal product fall starting with the third worker?",
          options: [
            "The workers become lazier over time",
            "The two blenders limit added output",
            "Total product begins to decline for this good",
            "Wages rise for each new worker"
          ],
          correctAnswer: 1,
          explanation: "With only two fixed blenders, extra workers have less equipment to use, so each adds less output. The fixed input is the bottleneck driving diminishing returns."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A production function shows maximum output from given inputs, split into fixed and variable.",
          "The short run has at least one fixed input; the long run makes all inputs variable.",
          "Marginal product is the extra output from one more worker; it rises then diminishes.",
          "The marginal product curve crosses the average product curve at the average's peak.",
          "Falling marginal product from a fixed-input bottleneck is what drives rising marginal cost."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-3-1-mastery1",
            question: "Marginal product is best defined as…",
            options: [
              "Total output divided by workers for this good",
              "Extra output from one more input",
              "The selling price of the output",
              "Fixed cost per unit produced"
            ],
            correctAnswer: 1,
            explanation: "Marginal product is the additional output from adding one more unit of the variable input. Total output divided by workers is average product instead."
          },
          {
            id: "apm-3-1-mastery2",
            question: "Diminishing marginal returns occur because…",
            options: [
              "Workers get paid more each hour",
              "A fixed input becomes a bottleneck",
              "Total product falls immediately for this good",
              "Prices of the good keep rising"
            ],
            correctAnswer: 1,
            explanation: "As more variable input is added to a fixed input, that fixed input limits each new worker's output. The bottleneck is why marginal product eventually falls."
          },
          {
            id: "apm-3-1-mastery3",
            question: "When marginal product is greater than average product, average product is…",
            options: [
              "Falling toward zero for this good",
              "Rising as marginal pulls it up",
              "Exactly at its lowest point",
              "Unrelated to marginal product in that market"
            ],
            correctAnswer: 1,
            explanation: "A marginal value above the average pulls the average up, just like a quiz above your GPA raises it. So average product rises when marginal exceeds it."
          },
          {
            id: "apm-3-1-mastery4",
            question: "In the long run, the law of diminishing marginal returns…",
            options: [
              "Always applies more strongly for this good",
              "Need not apply, as inputs vary",
              "Makes total product fall in that market",
              "Forces marginal product to zero"
            ],
            correctAnswer: 1,
            explanation: "The law is a short-run idea requiring a fixed input. In the long run firms can expand every input, removing the bottleneck, so it need not apply."
          },
          {
            id: "apm-3-1-mastery5",
            question: "As marginal product declines while output keeps rising, marginal cost will…",
            options: [
              "Fall toward zero quickly in that market",
              "Rise as each unit needs more labor",
              "Stay perfectly constant for this good",
              "Become negative for a while for the seller"
            ],
            correctAnswer: 1,
            explanation: "Falling marginal product means more labor is needed per extra unit, so marginal cost rises. This link is why marginal cost curves eventually slope upward."
          },
          {
            id: "apm-3-1-mastery6",
            question: "If a fifth worker's marginal product is positive but smaller than the fourth's, then total product is…",
            options: [
              "Falling with the fifth worker",
              "Still rising, just more slowly",
              "Exactly at its maximum for this good",
              "Equal to average product"
            ],
            correctAnswer: 1,
            explanation: "A positive marginal product still adds output, so total product rises, but a smaller marginal product means it rises more slowly. Total product only falls when marginal product is negative."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-3-2",
    sections: [
      {
        type: "concept",
        title: "Fixed, Variable, and Total Cost",
        paragraphs: [
          "In the short run costs split into fixed and variable. Total fixed cost (TFC) does not change with output - rent on a bakery, insurance, a loan payment - you pay it even if you bake zero loaves. Total variable cost (TVC) rises with output because it pays for the variable inputs like flour, labor, and electricity. Total cost (TC) is simply TFC plus TVC. If the bakery's rent is $200 a day and making 100 loaves costs $150 in ingredients and wages, total cost is $350.",
          "Per-unit costs reveal more. Average fixed cost (AFC) is TFC divided by quantity. Because fixed cost is spread over more units as output grows, AFC always falls - the classic 'spreading the overhead' effect. Average variable cost (AVC) is TVC divided by quantity, and average total cost (ATC) is TC divided by quantity, or equivalently AFC plus AVC. ATC tells the firm the typical cost of one unit and is central to measuring profit.",
          "Marginal cost (MC) is the extra cost of producing one more unit - the change in total cost divided by the change in quantity. MC is the single most important cost for decisions because firms decide production one unit at a time. Since fixed costs never change with output, marginal cost comes entirely from variable cost. Early on MC may fall as productivity rises, but diminishing marginal returns eventually push MC upward, giving it a U shape."
        ],
        bullets: [
          "Total fixed cost stays the same at every output level, even zero output.",
          "Total variable cost rises with output; total cost is fixed plus variable cost.",
          "Average fixed cost always falls as output rises, spreading overhead over more units.",
          "Average total cost equals average fixed cost plus average variable cost.",
          "Marginal cost is the extra cost of one more unit and comes entirely from variable cost."
        ],
        realWorldExample: "A print shop pays $300 a month for its machine lease no matter what (fixed). Paper and ink for each poster cost $2 (variable). Printing 150 posters costs $300 plus $300, so total cost is $600 and average total cost is $4 per poster."
      },
      {
        type: "concept",
        title: "The U-Shaped Cost Curves and How They Fit Together",
        paragraphs: [
          "Draw cost per unit on the vertical axis and quantity on the horizontal. AFC slopes steadily downward forever. AVC and ATC are both U-shaped: they fall at first, reach a minimum, then rise. ATC sits above AVC, and the vertical gap between them is AFC - a gap that narrows as output grows because AFC keeps shrinking. That is why ATC and AVC get closer together at high output but never touch.",
          "The marginal cost curve is also U-shaped and does something special: it passes through the minimum of both the AVC and ATC curves. The reason is the same marginal-average relationship from productivity. When MC is below ATC, it pulls average cost down; when MC is above ATC, it pushes average cost up. So average cost is falling until MC catches up to it at the bottom, then rising after. MC always crosses AVC and ATC at their lowest points.",
          "These curves come straight from the production function. When marginal product is rising, marginal cost is falling; when marginal product peaks and then falls due to diminishing returns, marginal cost bottoms out and rises. So the U shape of cost is a mirror image of the hump shape of productivity. Master these relationships and you can sketch a firm's entire short-run cost picture from a single table of output and input numbers."
        ],
        bullets: [
          "AFC falls continuously; AVC and ATC are U-shaped, falling then rising.",
          "The vertical gap between ATC and AVC equals AFC and shrinks as output grows.",
          "Marginal cost passes through the minimum points of both AVC and ATC.",
          "MC below average cost pulls the average down; MC above it pushes the average up.",
          "Cost curves mirror productivity: rising marginal product means falling marginal cost."
        ],
        realWorldExample: "A T-shirt printer's average total cost per shirt falls from $9 at 50 shirts to $5 at 200 shirts as fixed setup spreads out, then creeps back up past 300 shirts as overtime and crowding raise marginal cost - the textbook U shape in action."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-3-2-mc1",
            question: "As a firm produces more output, average fixed cost will…",
            options: [
              "Rise steadily with output for this good",
              "Fall as overhead spreads out",
              "Stay constant at every level",
              "Equal marginal cost exactly"
            ],
            correctAnswer: 1,
            explanation: "Fixed cost is spread over more units as output rises, so average fixed cost always falls. That downward slope continues at every output level."
          },
          {
            id: "apm-3-2-mc2",
            question: "The marginal cost curve intersects the average total cost curve at…",
            options: [
              "The highest point of ATC",
              "The minimum point of ATC",
              "The vertical intercept for this good",
              "A point far above ATC"
            ],
            correctAnswer: 1,
            explanation: "MC crosses ATC at its minimum: while MC is below ATC it pulls the average down, and above it pushes the average up, so they meet at the bottom of the U."
          }
        ]
      },
      {
        type: "scenario",
        title: "Maria's Candle Workshop",
        narrative: "Maria rents a small studio for $400 a month (fixed) and buys wax, wicks, and jars for each candle (variable). Making 200 candles costs her $600 in materials and labor. She wants to understand her per-unit costs before setting a price.",
        details: [
          "Her total cost at 200 candles is $400 plus $600, or $1,000, giving an average total cost of $5.",
          "Average fixed cost is $400 divided by 200, or $2, and it will keep falling as she makes more candles.",
          "Her average variable cost of $3 plus the $2 average fixed cost equals the $5 average total cost.",
          "As output grows the gap between her ATC and AVC narrows because average fixed cost keeps shrinking."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-3-2-aq1",
          question: "If Maria doubles output to 400 candles and variable costs rise proportionally, what happens to her average fixed cost?",
          options: [
            "It rises to $4 per candle",
            "It falls to $1 per candle",
            "It stays at $2 per candle",
            "It equals her total cost for this good"
          ],
          correctAnswer: 1,
          explanation: "Fixed cost of $400 spread over 400 candles is $1 each, down from $2. Average fixed cost always falls as output rises because the fixed sum is divided by more units."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Fixed cost stays constant with output; variable cost rises; total cost is their sum.",
          "Average fixed cost always falls; ATC equals AFC plus AVC.",
          "Marginal cost is the extra cost of one more unit and comes only from variable cost.",
          "AVC and ATC are U-shaped, and MC crosses each at its minimum point.",
          "Cost curves mirror productivity: rising marginal product means falling marginal cost."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-3-2-mastery1",
            question: "Which cost does NOT change as output rises in the short run?",
            options: [
              "Total variable cost",
              "Total fixed cost",
              "Total cost for this good",
              "Marginal cost paid"
            ],
            correctAnswer: 1,
            explanation: "Total fixed cost stays the same regardless of output. Variable, total, and marginal costs all change as quantity produced changes."
          },
          {
            id: "apm-3-2-mastery2",
            question: "Average total cost can be found by…",
            options: [
              "Subtracting AVC from AFC for this good",
              "Adding AFC and AVC together",
              "Dividing MC by quantity",
              "Multiplying TFC by output"
            ],
            correctAnswer: 1,
            explanation: "ATC equals AFC plus AVC, since total cost is fixed plus variable cost. Dividing that total by quantity gives the same result."
          },
          {
            id: "apm-3-2-mastery3",
            question: "Marginal cost eventually rises because of…",
            options: [
              "Falling average fixed cost",
              "Diminishing marginal returns",
              "Rising total fixed cost",
              "A drop in the good's price"
            ],
            correctAnswer: 1,
            explanation: "As marginal product falls from diminishing returns, more labor is needed per unit, so marginal cost rises. Fixed cost has nothing to do with marginal cost."
          },
          {
            id: "apm-3-2-mastery4",
            question: "The vertical distance between the ATC and AVC curves at any output equals…",
            options: [
              "Marginal cost there for this good",
              "Average fixed cost there",
              "Total fixed cost there",
              "Total variable cost there"
            ],
            correctAnswer: 1,
            explanation: "Since ATC equals AVC plus AFC, the gap between them is average fixed cost. That gap shrinks as output rises because AFC falls."
          },
          {
            id: "apm-3-2-mastery5",
            question: "When marginal cost is below average total cost, average total cost is…",
            options: [
              "Rising with each unit",
              "Falling with each unit",
              "At its maximum point",
              "Equal to marginal cost"
            ],
            correctAnswer: 1,
            explanation: "A marginal cost below the average pulls the average down, so ATC is falling. Only when MC rises above ATC does the average begin to climb."
          },
          {
            id: "apm-3-2-mastery6",
            question: "A firm makes 100 units for a total cost of $800 with $300 in fixed cost. Its average variable cost is…",
            options: [
              "$8.00 per unit made",
              "$5.00 per unit made",
              "$3.00 per unit made",
              "$11.00 per unit made"
            ],
            correctAnswer: 1,
            explanation: "Variable cost is $800 minus $300, or $500, over 100 units, giving $5. Average total cost is $8, and average fixed cost is $3."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-3-3",
    sections: [
      {
        type: "concept",
        title: "The Long Run and the LRATC Curve",
        paragraphs: [
          "The long run is the planning horizon in which every input is variable - a firm can change its plant size, buy new machines, or move to a bigger building. There are no fixed costs in the long run. The long-run average total cost curve (LRATC) shows the lowest possible average cost of producing each output level when the firm is free to choose the best plant size. It is often described as an envelope curve wrapping under a series of short-run ATC curves, one for each possible plant size.",
          "Picture three short-run ATC curves for a small, medium, and large factory. For low output, the small factory has the lowest average cost; for medium output, the medium factory wins; for high output, the large factory is cheapest. The LRATC traces the bottom edge of all these choices. Because the firm always picks the plant size that minimizes cost for its chosen output, the LRATC lies at or below every short-run curve.",
          "The LRATC is typically U-shaped too, but for different reasons than the short-run curves. Short-run U shapes come from diminishing returns to a fixed input; long-run U shapes come from economies and diseconomies of scale, which are about changing the scale of the whole operation. The downward part reflects economies of scale, the flat bottom is the minimum efficient scale, and the upward part reflects diseconomies of scale."
        ],
        bullets: [
          "In the long run all inputs are variable, so there are no fixed costs.",
          "LRATC shows the lowest average cost for each output when plant size can be chosen freely.",
          "LRATC is an envelope lying at or below every short-run ATC curve.",
          "For each output level the firm picks the plant size with the lowest average cost.",
          "The long-run U shape comes from scale effects, not from diminishing returns."
        ],
        realWorldExample: "A coffee chain deciding between a kiosk, a cafe, or a drive-through picks whichever format is cheapest per cup for its expected volume. Stitching together the cheapest option at each volume traces out its long-run average cost curve."
      },
      {
        type: "concept",
        title: "Economies of Scale, Diseconomies, and Minimum Efficient Scale",
        paragraphs: [
          "Economies of scale exist when LRATC falls as output rises: bigger operations produce each unit more cheaply. Sources include specialization of labor, bulk-buying discounts, and spreading the cost of expensive equipment or research over many units. A carmaker that builds 500,000 cars can afford robots and dedicated assembly lines that would be wasteful for a shop making 500 cars, so its cost per car is far lower - this is why large-scale manufacturing often dominates.",
          "Diseconomies of scale exist when LRATC rises as output grows further. Past some size, giant firms become hard to manage: communication slows, bureaucracy multiplies, and coordination breaks down. A company with 200,000 employees may find that adding another division raises cost per unit because managers cannot oversee everything efficiently. Between economies and diseconomies lies a range of constant returns to scale, where LRATC is flat and cost per unit does not change with size.",
          "The minimum efficient scale (MES) is the smallest output at which LRATC reaches its lowest point. It shapes industry structure. If MES is huge relative to market demand - as with electricity grids or aircraft manufacturing - only a few large firms can survive, tending toward oligopoly or natural monopoly. If MES is small, many small firms can compete, as with restaurants or hair salons. So the shape of the LRATC curve helps predict how concentrated an industry will be."
        ],
        bullets: [
          "Economies of scale make LRATC fall from specialization, bulk buying, and spreading big costs.",
          "Diseconomies of scale make LRATC rise as huge firms grow hard to coordinate.",
          "Constant returns to scale leave LRATC flat over a range of output.",
          "Minimum efficient scale is the smallest output reaching lowest LRATC.",
          "A large MES relative to demand pushes an industry toward few large firms."
        ],
        realWorldExample: "A microchip fab costs billions to build, so cost per chip plummets as production runs into the millions - massive economies of scale. That is why only a handful of firms make cutting-edge chips: minimum efficient scale is enormous relative to the market."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-3-3-mc1",
            question: "In the long run, a firm's fixed costs are…",
            options: [
              "Larger than in the short run",
              "Nonexistent, as all inputs vary",
              "Equal to marginal costs",
              "The main source of scale"
            ],
            correctAnswer: 1,
            explanation: "The long run lets the firm vary every input, including plant size, so nothing is fixed. There are no fixed costs in the long run."
          },
          {
            id: "apm-3-3-mc2",
            question: "The downward-sloping part of the LRATC curve reflects…",
            options: [
              "Diseconomies of scale",
              "Economies of scale",
              "Diminishing marginal returns",
              "Rising fixed costs"
            ],
            correctAnswer: 1,
            explanation: "When LRATC falls as output rises, the firm is enjoying economies of scale from specialization, bulk buying, and spreading large costs over more units."
          }
        ]
      },
      {
        type: "scenario",
        title: "Scaling the Granola Company",
        narrative: "A granola startup bakes in a rented kitchen at $6 per bag. As it grows it builds a small plant, dropping cost to $4 per bag, then a large automated facility at $3 per bag. Pushing output even higher in a sprawling multi-site operation, cost per bag creeps back to $3.50 as coordination gets harder.",
        details: [
          "Moving from the kitchen to the small plant to the large facility traces economies of scale as cost per bag falls.",
          "The lowest cost of $3 per bag marks the company's minimum efficient scale.",
          "The rise to $3.50 in the sprawling operation reflects diseconomies of scale from harder coordination.",
          "Each plant size is a short-run ATC curve, and the LRATC is the envelope tracing the lowest cost at each output."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-3-3-aq1",
          question: "The granola company's cost per bag rises from $3 to $3.50 as it grows into a sprawling multi-site operation. This best illustrates…",
          options: [
            "Economies of scale kicking in",
            "Diseconomies of scale from size",
            "Diminishing returns to a fixed plant",
            "Falling average fixed cost"
          ],
          correctAnswer: 1,
          explanation: "Rising long-run cost per unit as the whole operation grows is diseconomies of scale, usually from coordination and management problems. It is a scale effect, not short-run diminishing returns."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The long run varies all inputs, so there are no fixed costs.",
          "LRATC is the envelope of short-run ATC curves, showing lowest cost at each output.",
          "Economies of scale lower LRATC; diseconomies of scale raise it.",
          "Minimum efficient scale is the smallest output reaching lowest LRATC.",
          "A large MES relative to demand pushes an industry toward few large firms."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-3-3-mastery1",
            question: "The long-run average total cost curve is best described as…",
            options: [
              "A single short-run cost curve",
              "An envelope of short-run curves",
              "The marginal cost of one plant",
              "A flat line at every output"
            ],
            correctAnswer: 1,
            explanation: "LRATC wraps under all the short-run ATC curves, tracing the lowest average cost achievable at each output when plant size can be chosen freely."
          },
          {
            id: "apm-3-3-mastery2",
            question: "Economies of scale can come from all of these EXCEPT…",
            options: [
              "Bulk discounts on inputs",
              "Coordination getting harder",
              "Specialization of labor",
              "Spreading large equipment costs"
            ],
            correctAnswer: 1,
            explanation: "Harder coordination causes diseconomies of scale, raising cost. Bulk discounts, specialization, and spreading big costs are sources of economies of scale."
          },
          {
            id: "apm-3-3-mastery3",
            question: "Minimum efficient scale is the…",
            options: [
              "Largest output a firm can make",
              "Smallest output at lowest LRATC",
              "Output where fixed cost is zero",
              "Point of maximum total profit"
            ],
            correctAnswer: 1,
            explanation: "MES is the smallest output at which LRATC reaches its minimum. Below it, the firm has not fully captured economies of scale."
          },
          {
            id: "apm-3-3-mastery4",
            question: "An industry where minimum efficient scale is huge relative to market demand tends to have…",
            options: [
              "Very many small competitors",
              "Only a few large firms",
              "No firms able to survive",
              "Perfectly identical products for this good"
            ],
            correctAnswer: 1,
            explanation: "If a firm must be enormous to reach lowest cost, the market only supports a few such firms, tending toward oligopoly or natural monopoly."
          },
          {
            id: "apm-3-3-mastery5",
            question: "The long-run U shape of LRATC differs from the short-run U shape because it comes from…",
            options: [
              "Diminishing marginal returns for this good",
              "Economies and diseconomies of scale",
              "Rising average fixed cost in that market",
              "A fixed plant bottleneck"
            ],
            correctAnswer: 1,
            explanation: "Short-run U shapes come from diminishing returns to a fixed input; long-run U shapes come from scale effects as the whole operation grows or shrinks."
          },
          {
            id: "apm-3-3-mastery6",
            question: "Over the flat portion of an LRATC curve, a firm experiences…",
            options: [
              "Sharp economies of scale",
              "Constant returns to scale",
              "Severe diseconomies of scale",
              "Falling total output for this good"
            ],
            correctAnswer: 1,
            explanation: "A flat LRATC means cost per unit does not change with size, which is constant returns to scale - the range between economies and diseconomies."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-3-4",
    sections: [
      {
        type: "concept",
        title: "Explicit Costs, Implicit Costs, and Two Kinds of Profit",
        paragraphs: [
          "Economists count costs differently than accountants, and the gap changes what 'profit' means. Explicit costs are out-of-pocket payments a firm actually makes - wages, rent, materials, utilities. Implicit costs are the value of resources the owner already owns and uses in the business, measured by their next-best use. If you run a shop in a building you own, the rent you could have earned by leasing it out is an implicit cost, even though no check is written.",
          "Accounting profit is total revenue minus only explicit costs - the number on a tax form. Economic profit is total revenue minus BOTH explicit and implicit costs. Because economic profit subtracts more, it is always smaller than accounting profit. The most important implicit cost is usually the owner's forgone salary elsewhere and the forgone return on money invested in the firm. Economic profit answers the deeper question: is this the best possible use of the owner's time and money?",
          "Suppose Ava earns $200,000 revenue, pays $120,000 in explicit costs, quit an $80,000 job to run the business, and tied up savings that would have earned $10,000 in interest. Accounting profit is $200,000 minus $120,000, or $80,000. But economic profit subtracts the $80,000 forgone salary and $10,000 forgone interest too, leaving zero economic profit. She is doing exactly as well as her next-best option - no better, no worse."
        ],
        bullets: [
          "Explicit costs are actual cash payments; implicit costs are the value of owner-supplied resources.",
          "Accounting profit subtracts only explicit costs.",
          "Economic profit subtracts both explicit and implicit costs, so it is always smaller.",
          "The owner's forgone salary and forgone interest are common implicit costs.",
          "Economic profit measures whether resources are in their best possible use."
        ],
        realWorldExample: "A dentist opens a practice earning $300,000 after paying $250,000 in staff and supplies (accounting profit $50,000). But she gave up a $150,000 hospital salary. Counting that implicit cost, her economic profit is negative - she would be richer taking the hospital job."
      },
      {
        type: "concept",
        title: "Normal Profit and Why Zero Economic Profit Is Fine",
        paragraphs: [
          "Normal profit is the level of accounting profit just large enough to cover all implicit costs - the minimum return needed to keep the owner from leaving for the next-best option. When a firm earns normal profit, its economic profit is exactly zero. Zero economic profit sounds alarming to beginners, but it simply means the owner is earning exactly what their resources could earn elsewhere. They have no reason to switch, and no outsider has an unusual incentive to enter.",
          "This idea drives the long-run outcome of competitive markets. Positive economic profit signals that a business earns more than the next-best alternative, which attracts new firms into the industry. Negative economic profit (an economic loss) means resources would do better elsewhere, so firms exit. Both movements continue until economic profit returns to zero - the normal-profit resting point. So zero economic profit is the stable long-run equilibrium, not a sign of failure.",
          "Keep the vocabulary straight for the exam. A firm can have a healthy accounting profit yet zero or negative economic profit if implicit costs are large. 'Breaking even' in the economic sense means covering every cost including opportunity cost, which is why a firm earning normal profit stays in business happily. When a problem says a firm earns 'zero economic profit,' read it as 'earning a normal profit and doing exactly as well as its best alternative.'"
        ],
        bullets: [
          "Normal profit is the accounting profit just covering all implicit costs.",
          "Earning normal profit means economic profit is exactly zero.",
          "Zero economic profit means resources earn as much here as their next-best use.",
          "Positive economic profit attracts entry; economic losses cause exit.",
          "A firm can post accounting profit while earning zero or negative economic profit."
        ],
        realWorldExample: "A food-truck owner nets $70,000 in accounting profit, exactly what she could earn at a restaurant job plus interest on her savings. Her economic profit is zero - a normal profit - so she happily keeps the truck, since switching would gain her nothing."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-3-4-mc1",
            question: "Which cost is an implicit cost for a business owner?",
            options: [
              "Wages paid to employees for this good",
              "The salary the owner gave up",
              "Rent paid on a leased shop",
              "Electricity bills each month in that market"
            ],
            correctAnswer: 1,
            explanation: "Implicit costs are the value of owner-supplied resources, like the salary forgone by running the business. Wages, rent, and utilities are explicit, out-of-pocket costs."
          },
          {
            id: "apm-3-4-mc2",
            question: "A firm earning zero economic profit is…",
            options: [
              "Losing money and about to close",
              "Earning a normal profit",
              "Earning more than any rival",
              "Ignoring its implicit costs"
            ],
            correctAnswer: 1,
            explanation: "Zero economic profit means all costs, including implicit ones, are covered - a normal profit. The owner earns exactly what their resources could earn elsewhere."
          }
        ]
      },
      {
        type: "scenario",
        title: "Leo's Guitar Repair Shop",
        narrative: "Leo left a $60,000 job to open a guitar repair shop. Last year he earned $180,000 in revenue and paid $110,000 in rent, parts, and a part-time helper. He also invested $50,000 of savings that would have earned $4,000 in interest elsewhere.",
        details: [
          "Leo's accounting profit is $180,000 minus $110,000 in explicit costs, or $70,000.",
          "His implicit costs are the $60,000 forgone salary plus $4,000 forgone interest, totaling $64,000.",
          "His economic profit is $70,000 minus $64,000, or $6,000, so the shop beats his next-best option.",
          "If revenue fell so economic profit hit zero, Leo would be earning a normal profit and be indifferent about staying."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-3-4-aq1",
          question: "Given Leo's $70,000 accounting profit and $64,000 in implicit costs, his economic profit is…",
          options: [
            "$70,000, the same as accounting",
            "$6,000, a small positive amount",
            "$134,000, adding the two figures",
            "Negative, so he should quit"
          ],
          correctAnswer: 1,
          explanation: "Economic profit subtracts implicit costs from accounting profit: $70,000 minus $64,000 equals $6,000. The positive figure means the shop beats his next-best alternative."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Explicit costs are cash payments; implicit costs value the owner's own resources.",
          "Accounting profit subtracts only explicit costs.",
          "Economic profit subtracts both explicit and implicit costs and is always smaller.",
          "Normal profit means zero economic profit - resources earn as much here as elsewhere.",
          "Positive economic profit attracts entry; economic losses cause exit."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-3-4-mastery1",
            question: "Economic profit differs from accounting profit because it also subtracts…",
            options: [
              "Explicit wage payments",
              "Implicit opportunity costs",
              "Sales tax on revenue",
              "The cost of raw materials"
            ],
            correctAnswer: 1,
            explanation: "Economic profit subtracts implicit costs - the value of the owner's forgone alternatives - on top of explicit costs. That makes it smaller than accounting profit."
          },
          {
            id: "apm-3-4-mastery2",
            question: "Because economic profit subtracts more costs, it is always…",
            options: [
              "Larger than accounting profit",
              "Smaller than accounting profit",
              "Equal to accounting profit",
              "Greater than total revenue"
            ],
            correctAnswer: 1,
            explanation: "Subtracting implicit costs in addition to explicit costs makes economic profit less than or equal to accounting profit, never larger."
          },
          {
            id: "apm-3-4-mastery3",
            question: "Normal profit is best described as the profit that…",
            options: [
              "Exceeds all rivals in the market",
              "Just covers all implicit costs",
              "Ignores the owner's alternatives for this good",
              "Equals total revenue exactly"
            ],
            correctAnswer: 1,
            explanation: "Normal profit is the accounting profit just large enough to cover implicit costs, leaving zero economic profit. The owner does exactly as well as the next-best option."
          },
          {
            id: "apm-3-4-mastery4",
            question: "Positive economic profit in an industry tends to cause…",
            options: [
              "Existing firms to exit fast in that market",
              "New firms to enter the market",
              "The market to shut down",
              "Implicit costs to disappear for this good"
            ],
            correctAnswer: 1,
            explanation: "Positive economic profit means the business beats alternatives, which attracts new entrants. Entry continues until economic profit falls back to zero."
          },
          {
            id: "apm-3-4-mastery5",
            question: "A shop reports $90,000 in accounting profit, but the owner gave up a $95,000 salary elsewhere. The shop's economic profit is…",
            options: [
              "Positive, about $5,000",
              "Negative, about $5,000",
              "Exactly zero for the year",
              "Equal to $185,000 total"
            ],
            correctAnswer: 1,
            explanation: "Subtracting the $95,000 implicit cost from $90,000 accounting profit gives negative $5,000. The owner would be better off taking the salary."
          },
          {
            id: "apm-3-4-mastery6",
            question: "A firm earning zero economic profit will, in the long run, most likely…",
            options: [
              "Shut down immediately",
              "Stay in business contentedly",
              "Attract a rush of new rivals",
              "Report an accounting loss"
            ],
            correctAnswer: 1,
            explanation: "Zero economic profit means the owner earns exactly the next-best return, so there is no reason to leave and no unusual incentive for others to enter. The firm stays put."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-3-5",
    sections: [
      {
        type: "concept",
        title: "The MR = MC Profit-Maximizing Rule",
        paragraphs: [
          "Every firm, in every market structure, maximizes profit by producing the quantity where marginal revenue equals marginal cost. Marginal revenue (MR) is the extra revenue from selling one more unit; marginal cost (MC) is the extra cost of making it. The logic is simple: as long as one more unit adds more to revenue than to cost (MR greater than MC), producing it raises profit. Once a unit adds more cost than revenue (MC greater than MR), it shrinks profit. The best stopping point is where they are equal.",
          "Think of climbing a hill of profit. Each unit where MR exceeds MC is a step up; each unit where MC exceeds MR is a step down. The top of the hill - maximum profit - is exactly where MR crosses MC. This is why firms never simply maximize output or revenue; pushing past MR = MC destroys profit. The rule holds for a competitive firm, a monopoly, and everything in between; what differs is the shape of the MR curve.",
          "For a perfectly competitive firm, price is fixed by the market, so MR equals the price - the firm can sell all it wants at that price. It therefore produces where price equals marginal cost. For a firm with market power like a monopoly, MR is below price because selling more requires cutting price on all units, so it produces where MR = MC and then charges the higher price the demand curve allows. Same rule, different MR."
        ],
        bullets: [
          "Profit is maximized at the quantity where marginal revenue equals marginal cost.",
          "If MR is greater than MC, making one more unit adds to profit.",
          "If MC is greater than MR, cutting back output raises profit.",
          "For a competitive firm MR equals price, so it produces where price equals MC.",
          "The MR = MC rule applies to every market structure; only the MR curve differs."
        ],
        realWorldExample: "A lemonade stand sells cups for $2 each. As long as making one more cup costs less than $2, the seller profits by making it. She stops where the cost of the next cup just reaches $2 - the point where marginal cost equals the $2 price and marginal revenue."
      },
      {
        type: "concept",
        title: "Calculating Profit as (P - ATC) times Q",
        paragraphs: [
          "Finding the profit-maximizing quantity is step one; measuring profit is step two. Once you know the quantity where MR = MC, read the price the firm charges and the average total cost at that quantity. Profit per unit is price minus average total cost (P minus ATC). Total profit is that per-unit margin times quantity: (P minus ATC) times Q. On a graph this is a rectangle whose height is the gap between price and ATC and whose width is the quantity.",
          "The sign of P minus ATC tells the story. If price is above ATC, the rectangle sits above the cost curve and the firm earns positive economic profit. If price equals ATC, the rectangle collapses to zero and the firm earns exactly a normal profit - zero economic profit. If price is below ATC, the firm suffers an economic loss, shown as a rectangle below the price line. The firm still produces at MR = MC in the loss case; that quantity minimizes the loss.",
          "Work an example. A firm produces 500 units where MR = MC, charges $12, and has ATC of $9 at that output. Profit per unit is $12 minus $9, or $3, and total profit is $3 times 500, or $1,500. If instead ATC were $14, the firm would lose $2 per unit, or $1,000 total, but $1,000 is still the smallest loss possible given its cost curves. Always locate quantity first, then compute the rectangle."
        ],
        bullets: [
          "First find quantity where MR = MC, then read price and ATC at that quantity.",
          "Profit per unit is price minus average total cost.",
          "Total profit equals (price minus ATC) times quantity - a rectangle on the graph.",
          "Price above ATC means economic profit; price equal to ATC means normal profit.",
          "Price below ATC means a loss, but MR = MC still minimizes that loss."
        ],
        realWorldExample: "A print shop's best output is 800 mugs where MR meets MC. It charges $10 a mug with ATC of $7, so it earns $3 per mug times 800, or $2,400 in economic profit - the area of the profit rectangle between price and average total cost."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-3-5-mc1",
            question: "A firm should keep expanding output as long as…",
            options: [
              "Marginal cost exceeds marginal revenue",
              "Marginal revenue exceeds marginal cost",
              "Average cost exceeds the price",
              "Total revenue is above zero"
            ],
            correctAnswer: 1,
            explanation: "While MR is above MC, each extra unit adds more revenue than cost, raising profit. The firm stops when the two are equal, the profit-maximizing point."
          },
          {
            id: "apm-3-5-mc2",
            question: "At its profit-maximizing quantity a firm charges $12 with an ATC of $9. Its per-unit profit is…",
            options: [
              "$21 per unit made",
              "$3 per unit made",
              "$12 per unit made",
              "$108 per unit made"
            ],
            correctAnswer: 1,
            explanation: "Per-unit profit is price minus ATC: $12 minus $9 equals $3. Multiplying by quantity would give total economic profit."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Screen-Print Startup",
        narrative: "Devon's shirt-printing shop finds that its marginal cost equals its marginal revenue at 600 shirts. At that output it can charge $15 per shirt, and its average total cost is $11. Devon wants to confirm the quantity and calculate the profit.",
        details: [
          "Producing beyond 600 shirts would push marginal cost above marginal revenue, lowering total profit.",
          "Producing fewer than 600 shirts leaves marginal revenue above marginal cost, so profit could still rise.",
          "Profit per shirt is $15 minus $11, a margin of $4 at the chosen quantity.",
          "Total economic profit is $4 times 600 shirts, or $2,400, shown as the profit rectangle on the graph."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-3-5-aq1",
          question: "At 600 shirts Devon charges $15 with an ATC of $11. What is his total economic profit?",
          options: [
            "$9,000 in total profit",
            "$2,400 in total profit",
            "$6,600 in total profit",
            "$26 in total profit"
          ],
          correctAnswer: 1,
          explanation: "Total profit is (P minus ATC) times Q, or ($15 minus $11) times 600, which is $4 times 600, giving $2,400."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Every firm maximizes profit where marginal revenue equals marginal cost.",
          "Produce more when MR exceeds MC; cut back when MC exceeds MR.",
          "A competitive firm's MR equals price, so it produces where price equals MC.",
          "Total profit equals (price minus ATC) times quantity - the profit rectangle.",
          "Price above ATC is profit, price equal to ATC is normal profit, price below ATC is a loss."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-3-5-mastery1",
            question: "The universal profit-maximizing rule for any firm is to produce where…",
            options: [
              "Price is at its highest",
              "Marginal revenue equals marginal cost",
              "Total revenue is largest for this good",
              "Average cost is lowest"
            ],
            correctAnswer: 1,
            explanation: "Every firm maximizes profit at the quantity where MR equals MC. Maximizing revenue or minimizing average cost does not maximize profit."
          },
          {
            id: "apm-3-5-mastery2",
            question: "For a perfectly competitive firm, marginal revenue equals…",
            options: [
              "Average total cost",
              "The market price",
              "Marginal cost only",
              "Total fixed cost"
            ],
            correctAnswer: 1,
            explanation: "A price taker can sell any amount at the market price, so each extra unit adds exactly the price to revenue. Thus MR equals price."
          },
          {
            id: "apm-3-5-mastery3",
            question: "If at the MR = MC quantity price equals average total cost, the firm earns…",
            options: [
              "A large economic profit",
              "Exactly a normal profit",
              "A heavy economic loss",
              "Negative total revenue for this good"
            ],
            correctAnswer: 1,
            explanation: "Price equal to ATC makes the profit rectangle zero, so economic profit is zero - a normal profit. The firm covers all costs including opportunity cost."
          },
          {
            id: "apm-3-5-mastery4",
            question: "Total economic profit is calculated as…",
            options: [
              "Price times quantity sold for this good",
              "(Price minus ATC) times quantity",
              "Marginal cost times quantity",
              "ATC minus AVC per unit"
            ],
            correctAnswer: 1,
            explanation: "Profit per unit is price minus ATC, and multiplying by quantity gives total profit. Price times quantity is total revenue, not profit."
          },
          {
            id: "apm-3-5-mastery5",
            question: "When price lies below ATC at the MR = MC quantity, producing there…",
            options: [
              "Guarantees positive profit for this good",
              "Minimizes the firm's loss",
              "Maximizes total revenue",
              "Raises average fixed cost"
            ],
            correctAnswer: 1,
            explanation: "MR = MC still gives the best quantity, so producing there yields the smallest possible loss when price is below ATC. Any other output would lose more."
          },
          {
            id: "apm-3-5-mastery6",
            question: "A firm makes 400 units where MR = MC, charges $20, and has ATC of $16. Its total economic profit is…",
            options: [
              "$8,000 in profit",
              "$1,600 in profit",
              "$14,400 in profit",
              "$36 in profit"
            ],
            correctAnswer: 1,
            explanation: "Profit is ($20 minus $16) times 400, which is $4 times 400, giving $1,600. The $8,000 figure mistakenly uses price rather than the margin."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-3-6",
    sections: [
      {
        type: "concept",
        title: "Price Takers and the Perfectly Competitive Firm",
        paragraphs: [
          "Perfect competition is the benchmark market structure defined by four traits: many small buyers and sellers, an identical (homogeneous) product, free entry and exit, and perfect information. Because each firm is tiny relative to the market and sells the same product as everyone else, no single firm can influence the price. Each is a price taker - it must accept the market price set by industry supply and demand. Wheat farming and foreign-currency trading come close to this ideal.",
          "The price-taker condition gives the individual firm a perfectly horizontal (perfectly elastic) demand curve at the market price. If it tried to charge even a penny more, buyers would instantly switch to identical rivals, so it would sell nothing. Because the firm sells every unit at the same market price, marginal revenue equals price, and price also equals average revenue. The firm's demand, MR, and AR curves are all the same flat line at the going price.",
          "Combining this with the MR = MC rule, a competitive firm produces where price equals marginal cost. To decide its output, it slides along its rising marginal cost curve until MC reaches the market price. The upward-sloping portion of the firm's MC curve (above average variable cost) is therefore its supply curve. Add up all firms' MC curves and you get the market supply curve - the microfoundation of the supply curves from the demand-and-supply unit."
        ],
        bullets: [
          "Perfect competition has many firms, identical products, free entry and exit, and perfect information.",
          "Each firm is a price taker accepting the market price it cannot influence.",
          "The firm faces a horizontal, perfectly elastic demand curve at the market price.",
          "For a competitive firm price equals marginal revenue equals average revenue.",
          "The firm produces where price equals MC, and its MC curve above AVC is its supply curve."
        ],
        realWorldExample: "A single wheat farmer selling into a global market cannot raise the price - buyers just purchase identical wheat from thousands of others. She takes the going price and decides only how much to grow, producing until her marginal cost reaches that price."
      },
      {
        type: "concept",
        title: "The Shutdown Rule and Long-Run Zero Profit",
        paragraphs: [
          "In the short run a competitive firm might lose money yet still operate. The shutdown rule says: keep producing if price is at least average variable cost; shut down if price falls below AVC. The reason is fixed costs are paid whether or not the firm operates. If price covers AVC and a bit more, the firm can pay all its variable costs and put something toward fixed costs, losing less than the full fixed cost it would lose by closing. If price is below AVC, operating loses even more than shutting down.",
          "So there are three short-run zones. If price is above ATC, the firm earns economic profit. If price is between AVC and ATC, the firm takes a loss but keeps operating because it covers variable costs and part of fixed costs. If price falls below AVC, the firm shuts down to limit its loss to fixed costs alone. The point where price equals minimum AVC is the shutdown point; the point where price equals minimum ATC is the break-even point.",
          "The long run erases short-run profits and losses through entry and exit. Positive economic profit lures new firms in, which raises market supply, pushes price down, and shrinks each firm's profit. Economic losses drive firms out, cutting supply and raising price. This continues until price settles at the minimum of ATC, where every firm earns exactly zero economic profit - a normal profit. In long-run equilibrium, competitive firms produce at the lowest point of ATC, achieving productive efficiency, and price equals MC, achieving allocative efficiency."
        ],
        bullets: [
          "The shutdown rule: operate if price is at least AVC; shut down if price is below AVC.",
          "Fixed costs are paid regardless, so covering AVC makes operating better than closing.",
          "Price below ATC but above AVC means a loss the firm still operates through.",
          "Entry and exit push long-run price to minimum ATC, giving zero economic profit.",
          "In long-run equilibrium price equals MC and minimum ATC, giving allocative and productive efficiency."
        ],
        realWorldExample: "A struggling orchard sells apples below its total cost but above its variable cost, so it keeps picking - the revenue covers labor and supplies plus part of the land loan. If the price dropped below variable cost, it would stop picking to avoid losing even more."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-3-6-mc1",
            question: "The demand curve facing a single perfectly competitive firm is…",
            options: [
              "Steeply downward sloping for this good",
              "Horizontal at the market price",
              "Upward sloping with output",
              "Vertical at a fixed quantity"
            ],
            correctAnswer: 1,
            explanation: "A price taker can sell any amount at the market price but nothing above it, so its demand curve is horizontal (perfectly elastic) at that price."
          },
          {
            id: "apm-3-6-mc2",
            question: "A competitive firm should shut down in the short run when price falls below…",
            options: [
              "Average total cost",
              "Average variable cost",
              "Marginal cost for this good",
              "Average fixed cost"
            ],
            correctAnswer: 1,
            explanation: "If price cannot cover average variable cost, operating loses more than the fixed cost lost by closing, so the firm shuts down. Between AVC and ATC it keeps operating at a loss."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Family Egg Farm",
        narrative: "The Ruizes sell eggs into a competitive market at the going price of $2 a dozen; they cannot change it. Their average variable cost is $1.60 and their average total cost is $2.30 per dozen. Egg prices have been sliding for months, and the family is deciding whether to keep collecting eggs.",
        details: [
          "At $2 the price is above their $1.60 average variable cost but below their $2.30 average total cost, so they operate at a loss.",
          "They keep producing because $2 covers all variable cost and puts $0.40 per dozen toward fixed costs.",
          "If the price fell below $1.60, they would shut down to limit losses to their fixed costs alone.",
          "In the long run, ongoing losses would drive some egg farms out, cutting supply and lifting the price toward minimum ATC."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-3-6-aq1",
          question: "With price $2, AVC $1.60, and ATC $2.30, what should the Ruiz farm do in the short run?",
          options: [
            "Shut down to avoid the loss",
            "Keep operating despite the loss",
            "Raise its price above $2",
            "Expand output sharply for this good"
          ],
          correctAnswer: 1,
          explanation: "Price of $2 exceeds AVC of $1.60, so operating covers all variable cost plus part of fixed cost, losing less than shutting down. The firm keeps producing even though it is below ATC."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Perfect competition features many firms, identical products, free entry, and price takers.",
          "The firm faces a horizontal demand curve where price equals MR equals AR.",
          "It produces where price equals MC, and its MC above AVC is its supply curve.",
          "Shutdown rule: operate if price is at least AVC; shut down if price falls below AVC.",
          "Entry and exit drive long-run price to minimum ATC, giving zero economic profit and efficiency."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-3-6-mastery1",
            question: "Which is NOT a feature of perfect competition?",
            options: [
              "Many small firms and buyers in that market",
              "A single firm sets the price",
              "An identical, standardized product for this good",
              "Free entry into the industry"
            ],
            correctAnswer: 1,
            explanation: "No single firm can set the price in perfect competition; each is a price taker. Many firms, identical products, and free entry are all defining features."
          },
          {
            id: "apm-3-6-mastery2",
            question: "For a perfectly competitive firm, price equals all of the following EXCEPT…",
            options: [
              "Marginal revenue",
              "Average variable cost",
              "Average revenue",
              "Marginal cost at its output"
            ],
            correctAnswer: 1,
            explanation: "Price equals MR and AR for a price taker, and it produces where price equals MC. Price need not equal AVC, which varies with output."
          },
          {
            id: "apm-3-6-mastery3",
            question: "A competitive firm keeps operating at a loss in the short run when price is…",
            options: [
              "Below average variable cost",
              "Between AVC and ATC",
              "Below average fixed cost",
              "At exactly zero for this good"
            ],
            correctAnswer: 1,
            explanation: "If price is above AVC but below ATC, the firm covers variable cost and part of fixed cost, so operating loses less than closing. Below AVC it would shut down."
          },
          {
            id: "apm-3-6-mastery4",
            question: "In long-run competitive equilibrium, each firm earns…",
            options: [
              "Large positive economic profit",
              "Zero economic profit",
              "A steadily growing profit",
              "An ever-deepening loss"
            ],
            correctAnswer: 1,
            explanation: "Entry and exit push price to minimum ATC, leaving zero economic profit - a normal profit. Positive profit attracts entry until it disappears."
          },
          {
            id: "apm-3-6-mastery5",
            question: "The firm's short-run supply curve is the portion of its marginal cost curve that lies…",
            options: [
              "Below average variable cost",
              "Above average variable cost",
              "Below average fixed cost",
              "To the left of the origin"
            ],
            correctAnswer: 1,
            explanation: "The firm produces where price equals MC only while price covers AVC, so its supply curve is the MC curve above minimum AVC. Below that it shuts down."
          },
          {
            id: "apm-3-6-mastery6",
            question: "Long-run competitive equilibrium achieves allocative efficiency because…",
            options: [
              "Total revenue is maximized",
              "Price equals marginal cost",
              "Fixed costs reach zero",
              "Firms earn high profits"
            ],
            correctAnswer: 1,
            explanation: "Allocative efficiency means the last unit's value to buyers equals its cost, which is price equal to MC. Competition delivers this, along with production at minimum ATC."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-4-1",
    sections: [
      {
        type: "concept",
        title: "Monopoly, Market Power, and Why MR Is Below Price",
        paragraphs: [
          "A monopoly is a single seller of a product with no close substitutes, protected by high barriers to entry. Those barriers can be legal (patents, government licenses), resource-based (control of a key input), or cost-based (economies of scale so large one firm can supply the whole market). Unlike a price taker, a monopolist is a price maker: it faces the entire downward-sloping market demand curve, so it must lower price to sell more. That single fact reshapes its revenue and its choices.",
          "Because a monopolist must cut price to sell an extra unit - and cut it on ALL units, not just the last one - marginal revenue is less than price. Suppose it can sell 3 units at $10 each ($30) or 4 units at $9 each ($36). The fourth unit adds $6 to revenue even though it sells for $9, because dropping to $9 sacrificed $1 on each of the first three units. So the MR curve lies below the demand curve and falls twice as steeply. This MR-below-price gap is the defining feature of any firm with market power.",
          "Applying MR = MC, the monopolist finds its profit-maximizing quantity where its downward-sloping MR curve crosses MC. But it does not charge that MR - it goes straight up to the demand curve to find the highest price buyers will pay for that quantity. So price sits above marginal revenue and above marginal cost. If that price exceeds ATC at the chosen quantity, the monopolist earns economic profit, and because entry is blocked, that profit can persist in the long run - unlike in competition."
        ],
        bullets: [
          "A monopoly is a single seller of a good with no close substitutes and high entry barriers.",
          "Barriers can be legal, resource-based, or from large economies of scale.",
          "A monopolist is a price maker facing the whole downward-sloping demand curve.",
          "Marginal revenue is below price because selling more requires cutting price on all units.",
          "It produces where MR equals MC, then charges the higher price demand allows, earning lasting profit."
        ],
        realWorldExample: "A patented drug with no substitute lets its maker set a high price. To sell more pills it would have to lower the price for everyone, so its marginal revenue sits below the price - and the patent blocks rivals, letting the profit last for years."
      },
      {
        type: "concept",
        title: "Deadweight Loss and the Natural Monopoly",
        paragraphs: [
          "Compared with a competitive market producing where price equals MC, a monopoly restricts output and charges a higher price. At the monopoly quantity, price exceeds marginal cost, meaning some buyers who value the good above its cost of production are priced out. The value of those lost mutually beneficial trades is deadweight loss - a welfare cost the monopoly imposes on society. The monopoly also transfers surplus from consumers to itself, shrinking consumer surplus and enlarging producer surplus.",
          "So monopoly is allocatively inefficient: because price is above marginal cost, the last unit produced is worth more to buyers than it costs to make, yet it is not produced. Monopolies also tend to be productively inefficient, since they usually do not produce at the minimum of ATC. The absence of competitive pressure can allow higher costs and less innovation, though defenders note that monopoly profits sometimes fund research and that patents deliberately grant temporary monopoly to reward invention.",
          "A natural monopoly is a special case where one firm can serve the entire market at lower cost than several firms could, because economies of scale keep LRATC falling over the whole relevant range. Utilities like water and electricity distribution fit: duplicating the pipe or grid network would waste enormous resources. Splitting the market among rivals would raise average cost, so society tolerates a single firm but typically regulates its price - often setting price where it equals ATC (fair-return) or MC (socially optimal, though it may require a subsidy)."
        ],
        bullets: [
          "Monopoly restricts output and charges a price above marginal cost, creating deadweight loss.",
          "Consumer surplus falls and shifts partly to the monopolist as producer surplus.",
          "Monopoly is allocatively inefficient because price exceeds marginal cost.",
          "A natural monopoly has economies of scale so large one firm supplies the market most cheaply.",
          "Regulators often set a natural monopoly's price at ATC (fair return) or MC (socially optimal)."
        ],
        realWorldExample: "A city's water utility is a natural monopoly: laying a second set of pipes would waste money, so one firm serves everyone. Regulators cap its price near average total cost so it covers its costs without exploiting its monopoly position."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-4-1-mc1",
            question: "For a monopolist, marginal revenue is…",
            options: [
              "Equal to the price charged",
              "Less than the price charged",
              "Greater than the price charged",
              "Always exactly zero for this good"
            ],
            correctAnswer: 1,
            explanation: "Selling one more unit requires cutting price on all units, so the added revenue is below the price. The MR curve lies below the demand curve."
          },
          {
            id: "apm-4-1-mc2",
            question: "A natural monopoly arises when…",
            options: [
              "The government bans all rivals in that market",
              "One firm supplies the market most cheaply",
              "Many small firms make identical goods",
              "Buyers have perfect information for this good"
            ],
            correctAnswer: 1,
            explanation: "Large economies of scale let a single firm serve the whole market at lower average cost than several firms could, defining a natural monopoly."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Only Bridge Toll",
        narrative: "A company holds the sole license to operate the only bridge into a town and faces the entire market demand. Building a second bridge would cost far more than the traffic could justify. Each extra crossing it wants to sell requires lowering the toll for everyone, and regulators are watching its pricing.",
        details: [
          "Because it faces the whole downward-sloping demand curve, the bridge operator is a price maker, not a price taker.",
          "To attract one more driver it must cut the toll for all drivers, so its marginal revenue lies below the toll.",
          "The high cost of a second bridge makes this a natural monopoly best served by one operator.",
          "By charging a toll above marginal cost, the operator prices out some drivers, creating deadweight loss the regulators worry about."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-4-1-aq1",
          question: "Why does a single bridge into town qualify as a natural monopoly?",
          options: [
            "The government outlawed competitors for this good",
            "One bridge serves the market most cheaply",
            "Drivers all have perfect information in that market",
            "The toll equals marginal cost exactly"
          ],
          correctAnswer: 1,
          explanation: "Huge fixed costs and economies of scale mean one bridge serves everyone at lower average cost than two would. That cost structure defines a natural monopoly."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A monopoly is a single seller with no close substitutes and high barriers to entry.",
          "Facing whole-market demand, the monopolist is a price maker with MR below price.",
          "It produces where MR equals MC, then charges the higher price demand allows.",
          "Monopoly restricts output and prices above MC, causing deadweight loss and inefficiency.",
          "A natural monopoly serves the market most cheaply as one firm and is often price-regulated."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-4-1-mastery1",
            question: "Compared with a competitive market, a monopoly tends to produce…",
            options: [
              "More output at a lower price",
              "Less output at a higher price",
              "The same output and price for this good",
              "Output at a zero price"
            ],
            correctAnswer: 1,
            explanation: "A monopolist restricts quantity to raise price, producing less than a competitive market and charging more. This creates deadweight loss."
          },
          {
            id: "apm-4-1-mastery2",
            question: "The deadweight loss of monopoly arises because…",
            options: [
              "Price is set below marginal cost",
              "Price exceeds marginal cost",
              "Firms earn only normal profit",
              "Entry is completely free"
            ],
            correctAnswer: 1,
            explanation: "When price is above marginal cost, some buyers who value the good above its cost are priced out, so beneficial trades are lost. That lost surplus is deadweight loss."
          },
          {
            id: "apm-4-1-mastery3",
            question: "A monopolist chooses its quantity where…",
            options: [
              "Price equals marginal cost for this good",
              "Marginal revenue equals marginal cost",
              "Price equals average total cost",
              "Marginal revenue equals price"
            ],
            correctAnswer: 1,
            explanation: "Like all firms, it uses MR = MC to pick quantity, then reads the higher price off the demand curve. Price equals MC only in perfect competition."
          },
          {
            id: "apm-4-1-mastery4",
            question: "Which is a barrier to entry that can create a monopoly?",
            options: [
              "Many identical competitors for this good",
              "An exclusive government patent",
              "Perfect market information",
              "Free entry and exit"
            ],
            correctAnswer: 1,
            explanation: "A patent legally blocks rivals, protecting a monopoly. Many competitors, perfect information, and free entry are features of competition, not barriers."
          },
          {
            id: "apm-4-1-mastery5",
            question: "A regulator setting a natural monopoly's price equal to average total cost aims to…",
            options: [
              "Maximize the firm's profit for this good",
              "Let it earn a fair, normal return",
              "Eliminate all its output in that market",
              "Force it to shut down for the seller"
            ],
            correctAnswer: 1,
            explanation: "Pricing at ATC gives the firm zero economic profit - a fair return that covers costs without monopoly exploitation. Pricing at MC would be socially optimal but may need a subsidy."
          },
          {
            id: "apm-4-1-mastery6",
            question: "Monopoly profit can persist in the long run mainly because…",
            options: [
              "Products are all identical",
              "Barriers block new entry",
              "Marginal revenue equals price",
              "Buyers have all the power"
            ],
            correctAnswer: 1,
            explanation: "In competition, entry erases profit, but a monopoly's barriers to entry keep rivals out, so its economic profit can last. Blocked entry is what protects the profit."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-4-2",
    sections: [
      {
        type: "concept",
        title: "What Price Discrimination Is and Its Three Degrees",
        paragraphs: [
          "Price discrimination is charging different buyers different prices for the same good when the price gap is not due to cost differences. It lets a firm with market power capture more of the surplus that a single uniform price would leave on the table. The classic examples are student and senior discounts, airline fares that differ by booking date, and coupons that only price-sensitive shoppers bother to clip. The seller is not being generous - it is squeezing extra revenue from each group's willingness to pay.",
          "Economists distinguish three degrees. First-degree (perfect) price discrimination charges each buyer the maximum they would pay, capturing all consumer surplus - a theoretical ideal rarely achieved, though personalized online pricing edges toward it. Second-degree discrimination charges by quantity or version, like bulk discounts or 'good-better-best' product tiers, so buyers self-select. Third-degree discrimination charges different identifiable groups different prices - students, seniors, or peak-versus-off-peak customers - based on each group's elasticity.",
          "Third-degree pricing follows a clear logic: charge a higher price to the group with more inelastic demand and a lower price to the group with more elastic demand. Business travelers who must fly on short notice have inelastic demand and pay more; vacationers who can shift dates have elastic demand and pay less. The firm effectively runs the MR = MC rule separately in each market segment. The result raises the firm's profit relative to charging everyone the same single price."
        ],
        bullets: [
          "Price discrimination charges different buyers different prices for the same good, not due to cost.",
          "First-degree pricing charges each buyer their maximum willingness to pay.",
          "Second-degree pricing varies price by quantity or version, letting buyers self-select.",
          "Third-degree pricing charges identifiable groups different prices based on elasticity.",
          "Charge more to the inelastic group and less to the elastic group to raise profit."
        ],
        realWorldExample: "A movie theater charges adults $15 but students $10 for the identical film. Students have more elastic demand - they would skip the movie at $15 - so the lower price fills seats that would otherwise stay empty, raising the theater's total revenue."
      },
      {
        type: "concept",
        title: "Required Conditions and Effects on Surplus",
        paragraphs: [
          "Price discrimination only works when three conditions hold. First, the firm must have some market power - a price taker cannot set different prices because it cannot set price at all. Second, the firm must be able to identify or separate buyers by their willingness to pay, using signals like age, booking timing, or membership. Third, it must prevent resale (arbitrage); otherwise low-price buyers would resell to high-price buyers and undercut the scheme. This is why haircuts and airline seats are easy to discriminate but gold bars are not.",
          "The welfare effects are nuanced and a favorite AP nuance. Price discrimination transfers surplus from consumers to the firm, so consumer surplus generally falls and producer surplus rises. But perfect (first-degree) price discrimination actually eliminates the deadweight loss of monopoly, because the firm produces all the way to where price equals marginal cost - every buyer who values the good above cost gets served, just at a personalized price. Output rises to the efficient level even though consumers keep none of the surplus.",
          "So price discrimination has a surprising efficiency twist. A single-price monopoly underproduces and creates deadweight loss; perfect price discrimination produces the efficient quantity but hands all surplus to the seller. Real-world third-degree discrimination lands in between - it usually expands output beyond the single-price level (serving the elastic group that would otherwise be priced out) while still leaving some deadweight loss. Judging it requires weighing efficiency gains against the distributional shift toward the firm."
        ],
        bullets: [
          "Price discrimination requires market power, the ability to separate buyers, and no resale.",
          "It transfers surplus from consumers to the firm, lowering consumer surplus.",
          "Perfect price discrimination eliminates monopoly deadweight loss by serving every worthwhile buyer.",
          "Under perfect discrimination output reaches the efficient level but the firm keeps all surplus.",
          "Third-degree discrimination usually expands output while leaving some deadweight loss."
        ],
        realWorldExample: "Airlines separate buyers by booking date and forbid ticket transfers, so a cheap advance seat cannot be resold to a last-minute business flyer. That prevention of resale is exactly what keeps the high-price and low-price segments apart."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-4-2-mc1",
            question: "Third-degree price discrimination charges a higher price to the group with…",
            options: [
              "More elastic demand",
              "More inelastic demand",
              "The lowest incomes",
              "Perfect information for this good"
            ],
            correctAnswer: 1,
            explanation: "Inelastic buyers keep buying even at higher prices, so the firm charges them more and offers the elastic group a discount to keep their business."
          },
          {
            id: "apm-4-2-mc2",
            question: "Which condition is required for price discrimination to work?",
            options: [
              "The firm must be a price taker",
              "Resale between buyers must be blocked",
              "All buyers must pay the same",
              "The product must be identical to rivals'"
            ],
            correctAnswer: 1,
            explanation: "If low-price buyers could resell to high-price buyers, the scheme collapses. Blocking resale, along with market power and separable buyers, is essential."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Amusement Park Pricing Puzzle",
        narrative: "A popular amusement park has real pricing power. It charges $80 for regular adult tickets, $50 for students with ID, and offers cheaper weekday passes. It also stamps hands so tickets cannot be shared or resold between visitors.",
        details: [
          "Students get the lower $50 price because their demand is more elastic - many would skip the park at $80.",
          "The full $80 adult price targets the more inelastic group willing to pay premium prices.",
          "Charging different identifiable groups different prices is third-degree price discrimination.",
          "Stamping hands prevents resale, one of the three conditions that makes the pricing scheme work."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-4-2-aq1",
          question: "Why does the amusement park stamp hands to prevent ticket sharing?",
          options: [
            "To make the tickets identical for this good",
            "To stop resale that would undercut pricing",
            "To become a price taker in that market",
            "To raise its marginal cost"
          ],
          correctAnswer: 1,
          explanation: "Blocking resale keeps low-price buyers from reselling to high-price buyers, which would collapse the price discrimination. No-resale is a required condition."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Price discrimination charges different buyers different prices for the same good, not due to cost.",
          "The three degrees are perfect, quantity- or version-based, and group-based pricing.",
          "Third-degree pricing charges the inelastic group more and the elastic group less.",
          "It requires market power, separable buyers, and no resale between them.",
          "It shifts surplus to the firm; perfect discrimination removes deadweight loss but keeps all surplus."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-4-2-mastery1",
            question: "Price discrimination is defined as charging different prices that are not based on differences in…",
            options: [
              "The seller's costs",
              "Buyers' willingness to pay",
              "The time of purchase",
              "The buyer's age group"
            ],
            correctAnswer: 0,
            explanation: "The price gap must not reflect cost differences; it reflects differing willingness to pay. That is what distinguishes discrimination from ordinary cost-based pricing."
          },
          {
            id: "apm-4-2-mastery2",
            question: "First-degree (perfect) price discrimination charges each buyer…",
            options: [
              "One single uniform price for this good",
              "Their maximum willingness to pay",
              "The lowest price available",
              "A price equal to marginal cost"
            ],
            correctAnswer: 1,
            explanation: "Perfect price discrimination extracts each buyer's full reservation price, capturing all consumer surplus for the firm."
          },
          {
            id: "apm-4-2-mastery3",
            question: "A firm cannot price discriminate unless it has…",
            options: [
              "Perfectly elastic demand for this good",
              "Some degree of market power",
              "Identical competitors nearby in that market",
              "A perfectly flat demand curve"
            ],
            correctAnswer: 1,
            explanation: "Only a firm with market power can set prices at all, so price discrimination is impossible for a price taker. Market power is the first requirement."
          },
          {
            id: "apm-4-2-mastery4",
            question: "Perfect price discrimination affects efficiency by…",
            options: [
              "Increasing deadweight loss sharply",
              "Eliminating deadweight loss entirely",
              "Leaving deadweight loss unchanged",
              "Reducing total output to zero"
            ],
            correctAnswer: 1,
            explanation: "Because every buyer valuing the good above cost is served, output reaches the efficient level and deadweight loss vanishes - though the firm captures all the surplus."
          },
          {
            id: "apm-4-2-mastery5",
            question: "Bulk discounts and 'good-better-best' product tiers are examples of…",
            options: [
              "First-degree discrimination",
              "Second-degree discrimination",
              "Third-degree discrimination",
              "No discrimination at all"
            ],
            correctAnswer: 1,
            explanation: "Charging by quantity or version and letting buyers self-select is second-degree price discrimination. Group-based pricing would be third-degree."
          },
          {
            id: "apm-4-2-mastery6",
            question: "Relative to a single-price monopoly, price discrimination generally shifts surplus toward…",
            options: [
              "Consumers for this good",
              "The firm doing it",
              "The government in that market",
              "Foreign competitors for the seller"
            ],
            correctAnswer: 1,
            explanation: "By capturing more of buyers' willingness to pay, the firm gains surplus while consumer surplus falls. The distributional shift favors the seller."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-4-3",
    sections: [
      {
        type: "concept",
        title: "Monopolistic Competition and Product Differentiation",
        paragraphs: [
          "Monopolistic competition blends features of competition and monopoly. Like perfect competition it has many firms and free entry and exit. Like monopoly, each firm sells a differentiated product - not identical, but distinguished by brand, quality, location, or style. Think fast-food restaurants, hair salons, coffee shops, and clothing boutiques. Because each product is a little different, each firm has a small amount of market power and faces a downward-sloping demand curve rather than a flat one.",
          "That downward slope means the firm is a price maker on a small scale: it can raise its price a bit without losing all its customers, because some buyers prefer its particular version. But the demand curve is highly elastic (fairly flat) since many close substitutes exist. As with any price maker, marginal revenue lies below price, so the firm maximizes profit where MR = MC and then charges the higher price its demand curve allows - exactly the monopoly diagram, just with a flatter demand curve.",
          "Firms compete not only on price but heavily through non-price competition: advertising, branding, packaging, and product tweaks meant to make their version feel unique and shift their demand curve outward. This is why fast-food chains spend fortunes on ads and mascots. In the short run a monopolistically competitive firm can earn economic profit (price above ATC) or a loss (price below ATC), just like a monopoly, depending on where its demand and cost curves sit."
        ],
        bullets: [
          "Monopolistic competition has many firms, free entry and exit, and differentiated products.",
          "Product differentiation gives each firm slight market power and a downward-sloping demand curve.",
          "Demand is highly elastic because many close substitutes exist.",
          "Firms maximize profit where MR equals MC, then charge the higher price demand allows.",
          "Non-price competition through advertising and branding aims to shift demand outward."
        ],
        realWorldExample: "A neighborhood coffee shop can charge a bit more than the cafe down the street because regulars love its vibe and lattes. But push the price too high and most will walk to a rival - the many close substitutes keep its demand curve quite elastic."
      },
      {
        type: "concept",
        title: "Long-Run Zero Profit and Excess Capacity",
        paragraphs: [
          "Free entry and exit drive the long-run outcome, just as in perfect competition. If firms earn short-run economic profit, new differentiated rivals enter, each stealing some customers, which shifts every existing firm's demand curve leftward until profit disappears. If firms take losses, some exit, shifting the survivors' demand right until losses vanish. Long-run equilibrium settles at zero economic profit - a normal profit - where each firm's demand curve is just tangent to its ATC curve.",
          "At that tangency point, price equals ATC (zero profit), but two inefficiencies remain that distinguish this structure from perfect competition. First, price is above marginal cost, so the outcome is allocatively inefficient - the last unit is worth more to buyers than it costs to make, yet is not produced. Second, the tangency occurs on the downward-sloping part of ATC, to the left of minimum ATC, so the firm is not producing at its lowest-cost scale. This gap between the firm's output and the minimum-ATC output is called excess capacity.",
          "Excess capacity is why you see many half-empty restaurants, salons with idle chairs, and gas stations on every corner - each firm could produce more cheaply per unit at higher volume but does not, because differentiation splits demand across many firms. The tradeoff: consumers get variety and choice, but at a slightly higher price and higher average cost than perfect competition would deliver. Economists debate whether the value of variety outweighs the modest efficiency loss."
        ],
        bullets: [
          "Free entry and exit push monopolistic competitors to zero economic profit in the long run.",
          "Long-run equilibrium occurs where the demand curve is tangent to ATC, so price equals ATC.",
          "Price exceeds marginal cost, so the outcome is allocatively inefficient.",
          "The firm produces to the left of minimum ATC, leaving excess capacity.",
          "Consumers gain product variety but pay slightly higher prices and costs than under perfect competition."
        ],
        realWorldExample: "A town with a dozen pizzerias shows excess capacity: each shop has empty tables and could make pizzas more cheaply at full capacity, but demand is split among them. Diners get variety, yet each slice costs a bit more than a single high-volume shop would charge."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-4-3-mc1",
            question: "A monopolistically competitive firm faces a demand curve that is…",
            options: [
              "Perfectly horizontal for this good",
              "Downward sloping but elastic",
              "Perfectly vertical in that market",
              "Upward sloping with output"
            ],
            correctAnswer: 1,
            explanation: "Product differentiation gives the firm slight market power, so its demand slopes down, but many close substitutes make it highly elastic."
          },
          {
            id: "apm-4-3-mc2",
            question: "In long-run equilibrium a monopolistically competitive firm earns…",
            options: [
              "Large economic profit",
              "Zero economic profit",
              "A permanent economic loss",
              "Profit above a monopoly's"
            ],
            correctAnswer: 1,
            explanation: "Free entry and exit compete away profits and losses, leaving zero economic profit where demand is tangent to ATC - a normal profit."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Crowded Smoothie Street",
        narrative: "A trendy street has eight smoothie shops, each with its own recipes, decor, and loyal fans. New shops keep opening whenever the existing ones seem to make good money. Each shop has some pricing freedom but plenty of empty seats most afternoons.",
        details: [
          "Each shop's unique recipes and vibe give it a downward-sloping but highly elastic demand curve.",
          "When shops earn profit, new smoothie shops enter and pull customers away until profit disappears.",
          "In the long run each shop earns zero economic profit where its demand is tangent to average total cost.",
          "The many empty seats reflect excess capacity, since each shop produces below its minimum-cost scale."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-4-3-aq1",
          question: "The smoothie shops' persistent empty seats best illustrate which feature of monopolistic competition?",
          options: [
            "Perfectly elastic demand for this good",
            "Excess capacity below minimum ATC",
            "Zero product differentiation in that market",
            "A binding price ceiling"
          ],
          correctAnswer: 1,
          explanation: "Each firm produces to the left of minimum ATC, so it has room to expand and lower per-unit cost but does not. Those idle seats are excess capacity."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Monopolistic competition has many firms, free entry, and differentiated products.",
          "Differentiation gives slight market power and a downward-sloping, elastic demand curve.",
          "Firms maximize where MR equals MC and use non-price competition to shift demand.",
          "Entry and exit push long-run profit to zero at the demand-ATC tangency.",
          "Price exceeds MC and output sits below minimum ATC, leaving excess capacity."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-4-3-mastery1",
            question: "Monopolistic competition differs from perfect competition mainly because its firms…",
            options: [
              "Sell an identical product",
              "Sell differentiated products",
              "Face barriers to entry",
              "Are all price takers"
            ],
            correctAnswer: 1,
            explanation: "Both have many firms and free entry, but monopolistic competitors differentiate their products, giving each slight market power. Perfect competitors sell identical goods."
          },
          {
            id: "apm-4-3-mastery2",
            question: "In long-run equilibrium, a monopolistically competitive firm's demand curve is…",
            options: [
              "Below its ATC everywhere for this good",
              "Tangent to its ATC curve",
              "Above its ATC everywhere",
              "Horizontal at minimum ATC"
            ],
            correctAnswer: 1,
            explanation: "Entry and exit shift demand until it just touches ATC, giving zero economic profit at that tangency point."
          },
          {
            id: "apm-4-3-mastery3",
            question: "Monopolistic competition is allocatively inefficient because in long-run equilibrium…",
            options: [
              "Price equals marginal cost",
              "Price exceeds marginal cost",
              "Price is below average cost",
              "Firms earn large profits"
            ],
            correctAnswer: 1,
            explanation: "With price above marginal cost, the last unit is worth more than it costs to make, yet is not produced. That gap is allocative inefficiency."
          },
          {
            id: "apm-4-3-mastery4",
            question: "Excess capacity means the firm produces at an output where ATC is…",
            options: [
              "At its minimum point",
              "Above its minimum point",
              "Equal to marginal cost",
              "Below marginal revenue for this good"
            ],
            correctAnswer: 1,
            explanation: "The tangency lies on the downward-sloping part of ATC, left of the minimum, so average cost is higher than it could be. The unused room is excess capacity."
          },
          {
            id: "apm-4-3-mastery5",
            question: "A key form of competition among monopolistic competitors is…",
            options: [
              "Colluding to fix output",
              "Advertising and branding",
              "Producing identical goods",
              "Blocking all new entry"
            ],
            correctAnswer: 1,
            explanation: "Firms compete through non-price means like advertising and branding to differentiate their product and shift demand outward. Entry is free, not blocked."
          },
          {
            id: "apm-4-3-mastery6",
            question: "Compared with perfect competition, monopolistic competition offers consumers…",
            options: [
              "Lower prices and less variety in that market",
              "More variety at slightly higher prices",
              "Identical products and prices for this good",
              "No product choices at all"
            ],
            correctAnswer: 1,
            explanation: "Differentiation gives buyers variety and choice but at prices above marginal cost and above minimum ATC. Variety is the benefit; slightly higher cost is the tradeoff."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-4-4",
    sections: [
      {
        type: "concept",
        title: "Oligopoly, Interdependence, and Collusion",
        paragraphs: [
          "An oligopoly is a market dominated by a few large firms, often selling similar or differentiated products behind high barriers to entry. Think airlines, wireless carriers, soft-drink giants, and gas companies. The defining feature is interdependence: because each firm is large, one firm's pricing or output decision noticeably affects the others, so each must anticipate rivals' reactions before acting. This strategic guessing game is what makes oligopoly different from every other structure and is why economists analyze it with game theory.",
          "A concentration ratio measures how much of an industry's sales the largest firms control; a high four-firm concentration ratio signals oligopoly. Because firms are interdependent, they face a temptation to collude - to secretly or openly coordinate on higher prices and lower output, acting like a shared monopoly to boost joint profit. A formal collusive agreement is a cartel, such as OPEC coordinating oil output. Collusion is illegal in most countries because it harms consumers, so much of it is tacit rather than written.",
          "Collusion is inherently unstable. Once rivals agree to keep prices high, each firm has a private incentive to cheat by quietly cutting its price to grab market share, since it would capture huge sales at the high price others maintain. If everyone reasons this way, the agreement collapses and prices fall. This tension between cooperating for joint profit and cheating for individual gain is the heart of oligopoly, and the Prisoner's Dilemma captures it precisely."
        ],
        bullets: [
          "An oligopoly is dominated by a few large firms behind high barriers to entry.",
          "Interdependence means each firm must anticipate rivals' reactions to its choices.",
          "A high concentration ratio signals that a few firms control most industry sales.",
          "Collusion coordinates high prices and low output; a formal agreement is a cartel.",
          "Collusion is unstable because each firm has a private incentive to cheat by undercutting."
        ],
        realWorldExample: "When two dominant airlines share a route, one cannot cut fares without the other quickly matching, so both hesitate to start a price war. Their constant watching of each other's fares is textbook oligopoly interdependence."
      },
      {
        type: "concept",
        title: "Game Theory, the Prisoner's Dilemma, and Nash Equilibrium",
        paragraphs: [
          "Game theory models strategic decisions using a payoff matrix showing each firm's outcome for every combination of choices. A dominant strategy is a choice that is best for a player no matter what the rival does. A Nash equilibrium is an outcome where no player can improve by changing strategy alone, given what the other is doing - so no one has a reason to deviate. Not every game has a dominant strategy, but a Nash equilibrium is the standard prediction of where players end up.",
          "The Prisoner's Dilemma shows why self-interest can lead to a worse outcome for everyone. Imagine two firms choosing 'high price' or 'low price.' If both keep prices high, each earns, say, $10 million. If both cut prices, each earns only $6 million. But if one cheats with a low price while the other stays high, the cheater grabs $14 million and the loyal firm gets just $2 million. For each firm, cutting price is the dominant strategy - it does better regardless of the rival - so both cut and land at $6 million, worse than the $10 million cooperation would bring.",
          "That mutual low-price outcome is the Nash equilibrium: given the rival is charging low, neither firm wants to raise its price alone. This explains why collusion is fragile and why competition often benefits consumers even among few firms. Repeated interaction can sustain cooperation through trust and retaliation strategies like tit-for-tat, which is why some oligopolies maintain high prices for years. Reading a payoff matrix, finding dominant strategies, and identifying the Nash equilibrium are core AP skills."
        ],
        bullets: [
          "A payoff matrix shows each firm's outcome for every combination of choices.",
          "A dominant strategy is best for a player regardless of what the rival does.",
          "A Nash equilibrium is an outcome where no player gains by changing strategy alone.",
          "In the Prisoner's Dilemma both firms cheat and end up worse than if they cooperated.",
          "Repeated play and retaliation strategies can help sustain cooperation over time."
        ],
        realWorldExample: "Two burger chains each decide whether to run a discount. If neither discounts, both keep healthy profits; but each fears the other will discount and steal customers, so both discount and earn less - a Prisoner's Dilemma landing at the low-profit Nash equilibrium."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-4-4-mc1",
            question: "The defining feature of an oligopoly is that firms are…",
            options: [
              "Perfectly competitive price takers",
              "Interdependent in their decisions",
              "Sellers of identical goods only",
              "Free of any entry barriers"
            ],
            correctAnswer: 1,
            explanation: "With only a few large firms, each one's choices noticeably affect the others, so they must anticipate rivals' reactions. That mutual interdependence defines oligopoly."
          },
          {
            id: "apm-4-4-mc2",
            question: "A Nash equilibrium is an outcome in which…",
            options: [
              "Every firm earns maximum profit for this good",
              "No firm gains by changing strategy alone",
              "All firms choose to collude in that market",
              "Prices always fall to marginal cost"
            ],
            correctAnswer: 1,
            explanation: "At a Nash equilibrium, given what rivals are doing, no single player can improve by switching strategy. It need not be the best joint outcome."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Two Gas Stations",
        narrative: "Two gas stations sit across an intersection with no others nearby. If both keep prices high, each earns $4,000 a week. If both cut prices, each earns $2,500. If one cuts while the other stays high, the cutter earns $5,500 by grabbing drivers and the loyal one earns only $1,200.",
        details: [
          "The two stations are interdependent: each station's price directly affects the other's sales.",
          "For each station, cutting price yields more than staying high no matter what the rival does, so cutting is dominant.",
          "Both follow their dominant strategy and cut, landing at $2,500 each - the Nash equilibrium.",
          "Both would prefer the $4,000 cooperative outcome, but the incentive to cheat makes that agreement unstable."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-4-4-aq1",
          question: "Given the payoffs, what is the likely Nash equilibrium for the two gas stations?",
          options: [
            "Both keep prices high at $4,000",
            "Both cut prices at $2,500 each",
            "One cuts and earns $5,500 forever",
            "Both shut down their pumps for this good"
          ],
          correctAnswer: 1,
          explanation: "Cutting price is each station's dominant strategy, so both cut and earn $2,500 - a Nash equilibrium where neither can gain by switching alone, though both prefer cooperating."
        }
      },
      {
        type: "recap",
        takeaways: [
          "An oligopoly is a few large, interdependent firms behind high entry barriers.",
          "Firms may collude or form cartels to act like a shared monopoly and raise profit.",
          "Collusion is unstable because each firm has a private incentive to cheat.",
          "A dominant strategy is best regardless of rivals; a Nash equilibrium leaves no one wanting to switch.",
          "The Prisoner's Dilemma shows self-interest can push firms to a worse mutual outcome."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-4-4-mastery1",
            question: "A formal agreement among firms to coordinate prices and output is called a…",
            options: [
              "Perfect market",
              "Cartel",
              "Price taker",
              "Free-rider"
            ],
            correctAnswer: 1,
            explanation: "A cartel is an explicit collusive agreement, like OPEC, that raises prices and restricts output to boost joint profit. It is illegal in most countries."
          },
          {
            id: "apm-4-4-mastery2",
            question: "A dominant strategy is one that…",
            options: [
              "Depends on the rival's choice",
              "Is best regardless of the rival",
              "Maximizes joint industry profit for this good",
              "Always sets price at marginal cost"
            ],
            correctAnswer: 1,
            explanation: "A dominant strategy yields the best payoff for a player no matter what the other player does. It does not depend on the rival's move."
          },
          {
            id: "apm-4-4-mastery3",
            question: "In a Prisoner's Dilemma between two firms, the equilibrium outcome is usually…",
            options: [
              "Better than cooperating",
              "Worse than cooperating",
              "Identical to full collusion",
              "Impossible to predict"
            ],
            correctAnswer: 1,
            explanation: "Both firms follow their dominant strategy to cut price and land in a worse spot than if they had cooperated. Self-interest produces a worse mutual result."
          },
          {
            id: "apm-4-4-mastery4",
            question: "Collusion among oligopolists tends to break down because each firm has an incentive to…",
            options: [
              "Raise its price further",
              "Cheat by secretly undercutting",
              "Exit the market entirely",
              "Match the government's price"
            ],
            correctAnswer: 1,
            explanation: "By quietly cutting price while others hold high prices, a firm can grab market share and extra profit. That temptation to cheat makes collusion unstable."
          },
          {
            id: "apm-4-4-mastery5",
            question: "A high four-firm concentration ratio in an industry indicates…",
            options: [
              "Perfect competition",
              "An oligopoly structure",
              "Many tiny price takers",
              "No barriers to entry"
            ],
            correctAnswer: 1,
            explanation: "When four firms control most of an industry's sales, a few firms dominate - the hallmark of oligopoly. Low concentration would suggest competition."
          },
          {
            id: "apm-4-4-mastery6",
            question: "Cooperation among oligopolists is easier to sustain when firms…",
            options: [
              "Interact only one single time",
              "Interact repeatedly over time",
              "Cannot observe each other",
              "Have no barriers to entry"
            ],
            correctAnswer: 1,
            explanation: "Repeated interaction lets firms punish cheaters through retaliation like tit-for-tat, making cooperation more stable than in a one-shot game."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-5-1",
    sections: [
      {
        type: "concept",
        title: "Factor Markets and Derived Demand",
        paragraphs: [
          "Factor markets (or resource markets) are where firms buy the inputs of production - labor, capital, and land - rather than where households buy finished goods. The roles reverse: in product markets firms sell and households buy, but in factor markets households sell their resources (like labor) and firms buy them. The price of labor is the wage, the price of capital is interest or rental rates, and the price of land is rent. Understanding factor markets explains where wages and incomes come from.",
          "The key idea is that demand for a factor is a derived demand - it comes from the demand for the goods that factor helps produce. Firms do not want workers for their own sake; they want the output workers create and the revenue that output brings. If demand for pizza rises, pizzerias hire more cooks; if demand for pizza collapses, cooks are laid off. So a factor's demand is derived from, and moves with, the product market it serves.",
          "This connects the two markets tightly. A booming product market raises the value of the resources that make the product, pushing up their prices and the incomes of their owners. When electric cars became popular, demand for battery engineers and lithium rose. When demand for a good falls, the resources tied to it lose value. So factor prices and household incomes ultimately trace back to consumer demand in product markets - a chain the AP exam expects you to explain."
        ],
        bullets: [
          "Factor markets are where firms buy inputs: labor, capital, and land.",
          "Roles reverse - households supply resources and firms demand them.",
          "The price of labor is the wage; capital earns interest; land earns rent.",
          "Factor demand is derived demand, flowing from demand for the final product.",
          "A rise in product demand raises the value and price of the resources that make it."
        ],
        realWorldExample: "When a video game becomes a hit, the studio hires more programmers and animators. Nobody demands programmers for fun - the demand comes from gamers wanting the product, so it is a derived demand flowing back from the game's popularity."
      },
      {
        type: "concept",
        title: "Marginal Revenue Product and the Hiring Rule",
        paragraphs: [
          "How many workers should a firm hire? It weighs what each worker adds to revenue against what each worker costs. Marginal revenue product (MRP) is the extra revenue from hiring one more unit of a factor. It equals marginal product times marginal revenue: MRP = MP times MR. In a competitive product market where price is fixed, MR equals price, so MRP = MP times P, sometimes called the value of the marginal product. MRP is the firm's demand curve for the factor.",
          "MRP slopes downward because of diminishing marginal returns: as more workers are added to fixed capital, each adds less output, so each adds less revenue. Suppose each worker's marginal product falls from 20 units to 15 to 10, and the product sells for $5. The MRP falls from $100 to $75 to $50. That declining MRP schedule is exactly the labor demand curve - it tells how much a worker is worth to the firm at the margin, and it slopes down for the same reason product demand curves do.",
          "The cost side is marginal resource cost (MRC) - the extra cost of hiring one more unit of the factor. In a competitive labor market the firm is a wage taker, so MRC simply equals the market wage. The profit-maximizing rule mirrors MR = MC: hire until MRP = MRC. Keep hiring while a worker's MRP exceeds the wage (they add more revenue than cost) and stop when MRP falls to the wage. This single rule determines employment in factor markets."
        ],
        bullets: [
          "Marginal revenue product is the extra revenue from one more unit of a factor.",
          "MRP equals marginal product times marginal revenue (times price in a competitive market).",
          "MRP slopes downward because of diminishing marginal returns, and it is the factor demand curve.",
          "Marginal resource cost is the extra cost of hiring one more unit of the factor.",
          "The firm hires until MRP equals MRC, the profit-maximizing hiring rule."
        ],
        realWorldExample: "A bakery finds each extra baker produces fewer additional loaves as the ovens fill up. With loaves at $4, one baker's MRP might be $160, the next $120, the next $80 - so the bakery keeps hiring only while a baker's MRP beats the wage it must pay."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-5-1-mc1",
            question: "Demand for labor is called a derived demand because it comes from…",
            options: [
              "The wage workers are paid for this good",
              "Demand for the goods labor makes",
              "The number of firms hiring",
              "The supply of workers available"
            ],
            correctAnswer: 1,
            explanation: "Firms want workers only for the output and revenue they generate, so labor demand is derived from demand for the final product."
          },
          {
            id: "apm-5-1-mc2",
            question: "A firm maximizes profit in the labor market by hiring until…",
            options: [
              "Marginal product is highest for this good",
              "MRP equals marginal resource cost",
              "The wage equals the product price",
              "Total revenue is largest"
            ],
            correctAnswer: 1,
            explanation: "Hiring continues while each worker adds more revenue than cost, stopping where MRP equals MRC. This mirrors the MR = MC rule for output."
          }
        ]
      },
      {
        type: "scenario",
        title: "Hiring at the Sign Shop",
        narrative: "A sign shop sells custom signs at $50 each in a competitive market. Its first new worker makes 6 signs a day, the second makes 5, the third makes 4, and the fourth makes 3, as the shop's few machines get crowded. The daily wage for a worker is $200.",
        details: [
          "Each worker's MRP is marginal product times the $50 price: $300, $250, $200, then $150.",
          "MRP falls as workers are added because diminishing returns lower each worker's marginal product.",
          "The shop hires while MRP is above the $200 wage, so it hires the first three workers.",
          "It stops at the fourth worker, whose $150 MRP is below the $200 wage, following the MRP equals MRC rule."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-5-1-aq1",
          question: "With a $200 daily wage and worker MRPs of $300, $250, $200, and $150, how many workers should the sign shop hire?",
          options: [
            "Two workers",
            "Three workers",
            "Four workers",
            "One worker"
          ],
          correctAnswer: 1,
          explanation: "The firm hires while MRP is at least the $200 wage. The first three qualify ($300, $250, $200); the fourth's $150 MRP is below the wage, so it hires three."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Factor markets are where firms buy labor, capital, and land from households.",
          "Factor demand is derived demand, flowing from demand for the final product.",
          "MRP is the extra revenue from one more factor unit: marginal product times MR.",
          "MRP slopes down from diminishing returns and is the firm's factor demand curve.",
          "The firm hires until MRP equals MRC, which in competition equals the market wage."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-5-1-mastery1",
            question: "In factor markets, the roles are reversed so that…",
            options: [
              "Firms supply and households demand",
              "Households supply and firms demand",
              "Only the government participates",
              "Prices are always fixed by law"
            ],
            correctAnswer: 1,
            explanation: "In factor markets households sell their resources like labor, and firms buy them - the opposite of product markets where firms sell to households."
          },
          {
            id: "apm-5-1-mastery2",
            question: "Marginal revenue product equals marginal product times…",
            options: [
              "Average fixed cost",
              "Marginal revenue",
              "Total resource cost",
              "The quantity of labor"
            ],
            correctAnswer: 1,
            explanation: "MRP is MP times MR. In a competitive product market MR equals price, so MRP equals marginal product times price."
          },
          {
            id: "apm-5-1-mastery3",
            question: "The MRP curve slopes downward mainly because of…",
            options: [
              "Rising fixed costs",
              "Diminishing marginal returns",
              "Falling product prices",
              "Higher marginal resource cost"
            ],
            correctAnswer: 1,
            explanation: "As more workers are added to fixed capital, each adds less output, so MRP falls. Diminishing marginal returns drive the downward slope."
          },
          {
            id: "apm-5-1-mastery4",
            question: "In a competitive labor market, marginal resource cost equals…",
            options: [
              "The marginal product",
              "The market wage",
              "The product's price",
              "Total fixed cost"
            ],
            correctAnswer: 1,
            explanation: "A wage-taking firm can hire any number of workers at the going wage, so each extra worker costs exactly that wage. Thus MRC equals the market wage."
          },
          {
            id: "apm-5-1-mastery5",
            question: "The MRP curve for a factor also serves as the firm's…",
            options: [
              "Supply curve for output",
              "Demand curve for that factor",
              "Average cost curve for this good",
              "Total revenue curve in that market"
            ],
            correctAnswer: 1,
            explanation: "MRP shows how much each additional worker is worth to the firm, which is exactly its willingness to pay - the factor demand curve."
          },
          {
            id: "apm-5-1-mastery6",
            question: "If demand for a product rises, the demand for the labor that makes it will…",
            options: [
              "Fall as costs increase",
              "Rise as a derived demand",
              "Stay perfectly constant for this good",
              "Become perfectly inelastic in that market"
            ],
            correctAnswer: 1,
            explanation: "Since labor demand is derived from product demand, a stronger product market raises the value of workers and shifts labor demand right."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-5-2",
    sections: [
      {
        type: "concept",
        title: "What Shifts Labor Demand and Labor Supply",
        paragraphs: [
          "In a competitive labor market, the wage and quantity of workers are set where labor demand (the summed MRP curves of all firms) meets labor supply (workers willing to work at each wage). Labor supply slopes upward because higher wages draw more people into a job. Just as with product markets, we distinguish movements along these curves (caused by a wage change) from shifts of the whole curve (caused by anything else). Predicting wage changes means figuring out which curve shifts and which way.",
          "Labor demand shifts when anything changes the MRP of workers. It rises if the product's price or demand rises (more revenue per worker), if worker productivity rises through training or better technology, or if the price of a substitute input like machinery rises so firms use more labor. It falls if the product loses popularity or if cheaper automation replaces workers. Remember MRP = MP times price, so anything raising marginal product or the product price shifts labor demand right.",
          "Labor supply shifts with the number of qualified workers and how attractive the job is. It rises with population growth, immigration, or more people gaining a needed skill; it falls if workers retire, migrate away, or if licensing requirements shrink the pool. Non-wage factors matter too: unpleasant or dangerous jobs need higher wages to attract workers, while jobs with great perks attract workers at lower wages. Combining a demand shift and a supply shift lets you predict the new equilibrium wage and employment."
        ],
        bullets: [
          "The competitive wage and employment are set where labor demand meets labor supply.",
          "A wage change is a movement along the curves; other factors shift them.",
          "Labor demand shifts with product price, worker productivity, and prices of substitute inputs.",
          "Labor supply shifts with population, immigration, skills, and job attractiveness.",
          "Combining shifts in both curves predicts the new equilibrium wage and quantity."
        ],
        realWorldExample: "When a region's tech industry booms, the higher revenue per programmer shifts labor demand right, raising wages. If coding bootcamps then flood the area with new programmers, labor supply shifts right too, moderating how high wages ultimately climb."
      },
      {
        type: "concept",
        title: "Wage Determination and Predicting Changes",
        paragraphs: [
          "To predict a wage change, identify which curve moves and in which direction, then read the new equilibrium. If labor demand rises while supply is unchanged, both the wage and employment rise. If labor supply rises while demand is unchanged, employment rises but the wage falls. When both curves shift, one variable's change is certain and the other is ambiguous without knowing the relative sizes of the shifts - a classic AP trap that mirrors the product-market rule of simultaneous shifts.",
          "This framework explains real wage differences. Surgeons earn more than cashiers largely because a surgeon's MRP is high (skills that generate large revenue) and the supply of qualified surgeons is small (long training limits the pool). High demand plus low supply yields a high equilibrium wage. Cashiers have lower MRP and a large, easily entered supply, so the equilibrium wage is lower. Wage gaps thus reflect both the demand side (productivity and product value) and the supply side (scarcity of the skill).",
          "Compensating differentials add another layer. Two jobs with similar skills can pay differently if one is riskier, dirtier, or less pleasant - the worse job must offer a higher wage to attract workers, shifting its labor supply left at any wage. Deep-sea welders and night-shift workers earn premiums for this reason. So equilibrium wages combine marginal productivity, the scarcity of the skill, and the non-wage qualities of the job - all readable off shifting supply and demand curves."
        ],
        bullets: [
          "A rise in labor demand raises both wage and employment; a rise in supply raises employment but lowers wage.",
          "When both curves shift, one outcome is certain and the other depends on relative shift sizes.",
          "High wages come from high MRP (productivity, product value) plus scarce supply.",
          "Easily entered, low-productivity jobs have large supply and lower equilibrium wages.",
          "Compensating differentials pay more for riskier or less pleasant jobs by shifting supply left."
        ],
        realWorldExample: "A skilled welder on an offshore oil rig earns far more than a welder in a comfortable workshop with identical skills. The dangerous, isolated conditions shrink the supply of willing workers, so the rig must pay a compensating differential to fill the job."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-5-2-mc1",
            question: "An increase in the demand for a product will, in its labor market, shift labor demand…",
            options: [
              "Left, lowering wages",
              "Right, raising wages",
              "Not at all, wages fixed",
              "Down along the supply curve"
            ],
            correctAnswer: 1,
            explanation: "Higher product demand raises each worker's MRP, shifting labor demand right and raising the equilibrium wage. Labor demand is derived from product demand."
          },
          {
            id: "apm-5-2-mc2",
            question: "If labor supply rises while labor demand is unchanged, the equilibrium wage will…",
            options: [
              "Rise as more work",
              "Fall as workers compete",
              "Stay exactly the same",
              "Become perfectly inelastic for this good"
            ],
            correctAnswer: 1,
            explanation: "More workers competing for jobs pushes the wage down while employment rises. A rightward supply shift lowers the equilibrium wage."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Nursing Shortage",
        narrative: "A city's hospitals expand as the population ages, sharply raising the demand for nurses. Nursing requires years of training, so the supply of qualified nurses grows only slowly. Meanwhile, some hospital shifts involve grueling overnight hours that many nurses avoid.",
        details: [
          "Rising demand for hospital care shifts the derived demand for nurses to the right, pushing wages up.",
          "Because training is long, the nurse supply is limited, so the wage rises more sharply than it otherwise would.",
          "The combination of high demand and scarce supply produces a high equilibrium nursing wage.",
          "Overnight shifts pay a compensating differential, since the unpleasant hours shrink the willing supply for those slots."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-5-2-aq1",
          question: "Why do overnight nursing shifts pay more than daytime shifts with the same skills?",
          options: [
            "Overnight nurses have higher MRP",
            "The unpleasant hours reduce willing supply",
            "Product demand is higher at night",
            "The wage is fixed by the hospital"
          ],
          correctAnswer: 1,
          explanation: "Undesirable overnight hours shrink the supply of willing workers, so a compensating differential is needed to attract them. Skills and MRP are the same either way."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The competitive wage is set where labor demand meets labor supply.",
          "Labor demand shifts with product price, productivity, and substitute-input prices.",
          "Labor supply shifts with population, skills, immigration, and job attractiveness.",
          "A demand rise lifts wage and employment; a supply rise lifts employment but lowers wage.",
          "Wage gaps reflect MRP, scarcity of the skill, and compensating differentials for bad conditions."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-5-2-mastery1",
            question: "Which change would shift the labor demand curve to the right?",
            options: [
              "A fall in the product's price",
              "A rise in worker productivity",
              "A wave of new job seekers",
              "A drop in demand for the good"
            ],
            correctAnswer: 1,
            explanation: "Higher productivity raises marginal product and thus MRP, shifting labor demand right. A falling product price or demand would shift it left."
          },
          {
            id: "apm-5-2-mastery2",
            question: "A surge of immigration into a labor market shifts labor…",
            options: [
              "Demand to the right",
              "Supply to the right",
              "Demand to the left",
              "Supply to the left"
            ],
            correctAnswer: 1,
            explanation: "More available workers increase labor supply, shifting it right. This tends to raise employment but lower the equilibrium wage, all else equal."
          },
          {
            id: "apm-5-2-mastery3",
            question: "Surgeons earn high wages largely because they have…",
            options: [
              "Low MRP and large supply",
              "High MRP and scarce supply",
              "High supply and low demand",
              "No compensating differentials for this good"
            ],
            correctAnswer: 1,
            explanation: "High productivity (MRP) plus a small pool of qualified surgeons means strong demand meets limited supply, producing a high equilibrium wage."
          },
          {
            id: "apm-5-2-mastery4",
            question: "If labor demand and labor supply both increase, the equilibrium…",
            options: [
              "Wage definitely falls for this good",
              "Quantity of labor rises",
              "Wage definitely rises",
              "Quantity definitely falls"
            ],
            correctAnswer: 1,
            explanation: "Both rightward shifts clearly raise employment, but the wage change is ambiguous without knowing which shift is larger. Quantity is the certain outcome."
          },
          {
            id: "apm-5-2-mastery5",
            question: "A compensating differential is a wage premium paid for a job that is…",
            options: [
              "Especially safe and pleasant",
              "Dangerous or unpleasant",
              "Very easy to enter",
              "In high product demand"
            ],
            correctAnswer: 1,
            explanation: "Undesirable jobs must pay more to attract workers, since the bad conditions shrink willing supply. That extra pay is a compensating differential."
          },
          {
            id: "apm-5-2-mastery6",
            question: "Cheaper automation that replaces workers would shift labor demand…",
            options: [
              "Right, raising wages",
              "Left, lowering wages",
              "Right, lowering supply",
              "Not at all in the market"
            ],
            correctAnswer: 1,
            explanation: "If machines substitute for workers, firms need fewer workers at any wage, so labor demand shifts left and wages fall. Automation is a substitute input here."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-5-3",
    sections: [
      {
        type: "concept",
        title: "Hiring Where MRP Equals MRC in Competitive Markets",
        paragraphs: [
          "A firm in a perfectly competitive labor market is a wage taker: it is so small relative to the labor market that it can hire as many workers as it wants at the going market wage. Its labor supply curve is therefore horizontal at that wage, which means marginal resource cost equals the wage for every worker hired - the tenth worker costs the same wage as the first. This is the factor-market twin of a price-taking firm facing a flat product demand curve.",
          "The profit-maximizing rule is to hire where MRP = MRC. Since MRC equals the market wage here, the firm hires every worker whose MRP is at least the wage and stops when MRP falls to the wage. Graphically, the firm's downward-sloping MRP curve is its labor demand, the horizontal wage line is its labor supply, and their intersection sets the number of workers. If the market wage falls, the firm slides down its MRP curve and hires more; if the wage rises, it hires fewer.",
          "This produces an efficient labor outcome in competition: workers are paid a wage equal to their MRP - the value of what they add at the margin. No worker is paid less than they contribute, and none more. Total wages paid equal the wage times workers, while the area under the MRP curve above the wage line represents the firm's surplus from hiring. This clean result is the benchmark against which market imperfections like monopsony are later judged."
        ],
        bullets: [
          "A competitive labor-market firm is a wage taker facing a horizontal labor supply curve.",
          "Marginal resource cost equals the market wage for every worker hired.",
          "The firm hires where MRP equals MRC, which equals the market wage.",
          "The MRP curve is labor demand; the wage line is labor supply; they cross at the hiring level.",
          "In competition workers are paid a wage equal to their marginal revenue product."
        ],
        realWorldExample: "A single small warehouse hiring forklift drivers has no power over the regional wage - it pays the market rate for each driver. It keeps hiring drivers while each one's MRP beats that wage, stopping exactly where MRP falls to the going wage."
      },
      {
        type: "concept",
        title: "The Least-Cost Rule for Combining Inputs",
        paragraphs: [
          "Most firms use several inputs at once - labor and capital, or different types of workers - and must decide the cheapest mix to produce a given output. The least-cost combination rule says to allocate spending so that the marginal product per dollar is equal across all inputs: MP of labor divided by the price of labor equals MP of capital divided by the price of capital. If one input gives more output per dollar than another, the firm should shift spending toward it until the ratios balance.",
          "The logic mirrors the consumer's utility-maximizing rule. Suppose a worker costs $20 an hour and adds 40 units, giving 2 units per dollar, while a machine-hour costs $50 and adds 150 units, giving 3 units per dollar. The machine delivers more output per dollar, so the firm should use more capital and less labor. As it does, diminishing returns lower the machine's marginal product and raise labor's, until the two per-dollar ratios equalize and no reshuffling can cut cost further.",
          "There is a related profit-maximizing condition: hire each input until its MRP divided by its price equals one, meaning MRP equals the input's price for every input simultaneously. The least-cost rule ensures a given output is made as cheaply as possible; the profit-maximizing rule also pins down how much total output to make. When input prices change - say wages rise relative to machine rents - the firm substitutes toward the now-cheaper input, which is exactly why rising wages encourage automation."
        ],
        bullets: [
          "Firms choose the cheapest input mix using the least-cost combination rule.",
          "Least cost requires equal marginal product per dollar across all inputs.",
          "If one input yields more output per dollar, shift spending toward it until ratios balance.",
          "The profit-maximizing rule hires each input until its MRP equals its price.",
          "When an input's price rises, the firm substitutes toward the now-cheaper input."
        ],
        realWorldExample: "A farm weighing hand-pickers against a harvesting machine compares output per dollar of each. When wages climb, labor's output per dollar falls, so the farm buys the machine - the least-cost rule pushing it toward capital as labor grows relatively expensive."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-5-3-mc1",
            question: "For a firm in a competitive labor market, marginal resource cost equals…",
            options: [
              "The worker's marginal product",
              "The market wage",
              "The product's selling price",
              "Average total cost"
            ],
            correctAnswer: 1,
            explanation: "As a wage taker facing a horizontal labor supply, each extra worker costs the same market wage, so MRC equals that wage."
          },
          {
            id: "apm-5-3-mc2",
            question: "The least-cost combination of inputs requires that the marginal product per dollar be…",
            options: [
              "Highest for capital only",
              "Equal across all inputs",
              "Zero for every input",
              "Equal to the product price"
            ],
            correctAnswer: 1,
            explanation: "When MP per dollar is equal across inputs, no reshuffling of spending can lower cost. Unequal ratios mean the firm should shift toward the higher-yield input."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Packaging Line Decision",
        narrative: "A factory in a competitive labor market pays the going wage of $18 an hour for packers, each adding 36 boxes an hour. It also rents packaging machines at $60 an hour, each adding 180 boxes an hour. The manager wants both the right number of packers and the cheapest mix of workers and machines.",
        details: [
          "As a wage taker, the factory's MRC for packers equals the $18 market wage, so it hires where packer MRP meets $18.",
          "A packer yields 36 boxes per $18, or 2 boxes per dollar, while a machine yields 180 boxes per $60, or 3 boxes per dollar.",
          "Because the machine delivers more boxes per dollar, the least-cost rule says shift toward more machines and fewer packers.",
          "The firm keeps substituting until the marginal product per dollar is equal for packers and machines."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-5-3-aq1",
          question: "Packers give 2 boxes per dollar and machines give 3 boxes per dollar. To lower costs, the factory should…",
          options: [
            "Hire more packers, fewer machines",
            "Use more machines, fewer packers",
            "Keep the exact same mix",
            "Stop producing boxes entirely for this good"
          ],
          correctAnswer: 1,
          explanation: "The input with higher output per dollar (machines, at 3 versus 2) should get more spending. Shifting toward machines lowers cost until the per-dollar ratios equalize."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A competitive labor-market firm is a wage taker with MRC equal to the market wage.",
          "It hires where MRP equals MRC, paying workers a wage equal to their MRP.",
          "The least-cost rule equalizes marginal product per dollar across all inputs.",
          "Shift spending toward whichever input yields more output per dollar until ratios balance.",
          "Rising wages push firms to substitute toward capital, encouraging automation."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-5-3-mastery1",
            question: "A firm in a perfectly competitive labor market faces a labor supply curve that is…",
            options: [
              "Downward sloping for this good",
              "Horizontal at the wage",
              "Upward sloping steeply",
              "Vertical at zero labor"
            ],
            correctAnswer: 1,
            explanation: "A wage taker can hire any number at the going wage, so its labor supply is horizontal at that wage, making MRC equal to the wage."
          },
          {
            id: "apm-5-3-mastery2",
            question: "In a competitive labor market, workers are paid a wage equal to their…",
            options: [
              "Average product",
              "Marginal revenue product",
              "Total revenue product",
              "Marginal resource cost gap"
            ],
            correctAnswer: 1,
            explanation: "Hiring where MRP equals the wage means each worker is paid the value of what they add at the margin - their marginal revenue product."
          },
          {
            id: "apm-5-3-mastery3",
            question: "The least-cost rule is satisfied when, for every input, the ratio of marginal product to price is…",
            options: [
              "As high as possible",
              "Equal across all inputs",
              "Equal to the wage",
              "Falling toward zero for this good"
            ],
            correctAnswer: 1,
            explanation: "Equal marginal product per dollar across inputs means no reallocation can reduce cost. Unequal ratios signal a cheaper mix is available."
          },
          {
            id: "apm-5-3-mastery4",
            question: "If labor gives 4 units per dollar and capital gives 6 units per dollar, the firm should use…",
            options: [
              "More labor and less capital",
              "More capital and less labor",
              "Exactly equal amounts for this good",
              "Neither input at all"
            ],
            correctAnswer: 1,
            explanation: "Capital yields more output per dollar, so shifting toward capital lowers cost. The firm substitutes until the per-dollar ratios equalize."
          },
          {
            id: "apm-5-3-mastery5",
            question: "A rise in the wage relative to machine rents will lead a firm to…",
            options: [
              "Hire more workers",
              "Substitute toward machines",
              "Ignore the price change",
              "Raise its product price"
            ],
            correctAnswer: 1,
            explanation: "As labor becomes relatively more expensive, its output per dollar falls, so the firm substitutes toward capital. This is why higher wages encourage automation."
          },
          {
            id: "apm-5-3-mastery6",
            question: "The profit-maximizing input rule is to hire each input until its MRP equals its…",
            options: [
              "Marginal product",
              "Price",
              "Average revenue",
              "Total cost"
            ],
            correctAnswer: 1,
            explanation: "Just as MR equals MC for output, each input is hired until its marginal revenue product equals its price, pinning down the profit-maximizing quantity of each input."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-5-4",
    sections: [
      {
        type: "concept",
        title: "Monopsony: A Single Buyer of Labor",
        paragraphs: [
          "A monopsony is a market with a single buyer, most often a single major employer of labor. Just as a monopoly is the only seller of a good, a monopsonist is the only buyer of a resource. Classic examples include a lone factory or mine in a small town where nearly everyone works, a hospital that is the only employer of nurses in a rural region, or a professional sports league acting as the sole buyer of certain athletes' services. The single-buyer position gives the firm power over wages.",
          "Unlike a competitive wage taker, a monopsonist faces the entire upward-sloping market labor supply curve. To hire one more worker it must raise the wage - and it must pay that higher wage to ALL workers, not just the new one. This makes marginal resource cost greater than the wage, exactly mirroring how a monopolist's marginal revenue is below its price. The MRC curve lies above the labor supply curve, because each new hire raises the wage bill for everyone already employed.",
          "The profit-maximizing rule is unchanged - hire where MRP equals MRC - but the consequences differ sharply. The monopsonist finds its hiring level where the MRP curve crosses the MRC curve, then reads the wage it must pay off the lower labor supply curve at that quantity. Because MRC is above supply, the intersection occurs at fewer workers than a competitive market would hire, and the wage read off the supply curve is below MRP. The monopsonist deliberately hires less and pays less."
        ],
        bullets: [
          "A monopsony is a market with a single buyer, typically the sole employer of labor.",
          "The monopsonist faces the whole upward-sloping market labor supply curve.",
          "Hiring one more worker requires raising the wage for all workers, so MRC exceeds the wage.",
          "It hires where MRP equals MRC, then pays the wage read off the labor supply curve.",
          "MRC lies above the supply curve, mirroring how a monopolist's MR lies below price."
        ],
        realWorldExample: "In a company town where one mine employs almost everyone, the mine knows that hiring more workers means bidding up the wage for its whole workforce. That extra cost on all workers makes its marginal resource cost climb faster than the wage itself."
      },
      {
        type: "concept",
        title: "Monopsony Outcomes and Efficiency",
        paragraphs: [
          "Compared with a competitive labor market, a monopsony hires fewer workers and pays a lower wage. In competition, hiring occurs where MRP equals the market wage (the supply curve), so wage equals MRP. Under monopsony, hiring occurs where MRP equals MRC, and since MRC is above supply, this lands at a smaller quantity; the wage is then read off the supply curve below that, so the wage is less than MRP. Workers are paid less than the value they add at the margin - the monopsonist captures the difference.",
          "This creates deadweight loss, just as monopoly does. Some workers whose MRP exceeds the wage they would accept are not hired, so mutually beneficial employment does not happen. The outcome is allocatively inefficient: too few workers are employed relative to the competitive benchmark. The monopsonist gains by underpaying and underhiring, while workers and society lose. The result parallels monopoly's underproduction and above-marginal-cost pricing on the selling side.",
          "Policy can counter monopsony power in a surprising way. A minimum wage or a labor union can raise both the wage AND employment in a monopsonized market - the opposite of the competitive case. By fixing a wage floor, a minimum wage flattens the effective MRC at that wage over a range, so the firm no longer bids up wages by hiring more and will employ more workers up to where MRP meets the fixed wage. Similarly, a union bargaining collectively can push the wage toward the competitive level. This is a key AP nuance: minimum wages harm employment under competition but can improve it under monopsony."
        ],
        bullets: [
          "A monopsony hires fewer workers and pays a lower wage than a competitive market.",
          "The wage is read off the supply curve below MRP, so workers are paid less than their MRP.",
          "Monopsony creates deadweight loss by underhiring relative to the competitive level.",
          "A minimum wage or union can raise both the wage and employment under monopsony.",
          "This reverses the competitive result, where a minimum wage reduces employment."
        ],
        realWorldExample: "A rural hospital that is the only nursing employer can hold nurse wages below their MRP. A nurses' union bargaining collectively - or a higher legal minimum wage - can push the wage up while also getting more nurses hired, countering the hospital's monopsony power."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-5-4-mc1",
            question: "For a monopsonist, marginal resource cost is…",
            options: [
              "Equal to the wage paid",
              "Greater than the wage paid",
              "Less than the wage paid",
              "Always exactly zero for this good"
            ],
            correctAnswer: 1,
            explanation: "Hiring one more worker requires raising the wage for all workers, so the added cost exceeds the wage. MRC lies above the labor supply curve."
          },
          {
            id: "apm-5-4-mc2",
            question: "Compared with a competitive labor market, a monopsony results in…",
            options: [
              "More workers at a higher wage",
              "Fewer workers at a lower wage",
              "The same wage and employment for this good",
              "Workers paid above their MRP"
            ],
            correctAnswer: 1,
            explanation: "The monopsonist hires where MRP equals MRC, which is fewer workers, and pays a wage off the supply curve below MRP. Both employment and wage fall."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Only Cannery in Town",
        narrative: "A remote coastal town has one fish cannery that employs nearly all the local workers. To attract more workers the cannery must offer a higher wage, and it pays that raised wage to everyone on its payroll. Local workers have organized and are considering forming a union.",
        details: [
          "As the sole employer, the cannery is a monopsony facing the whole upward-sloping labor supply curve.",
          "Because hiring more raises the wage for all workers, the cannery's MRC lies above the labor supply curve.",
          "The cannery hires where MRP meets MRC, employing fewer workers and paying below their MRP.",
          "A union bargaining collectively could raise the wage and, unusually, increase employment toward the competitive level."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-5-4-aq1",
          question: "How could a union most likely affect wages and employment at the monopsony cannery?",
          options: [
            "Lower both wages and jobs",
            "Raise both wages and jobs",
            "Raise wages but cut jobs sharply",
            "Leave both completely unchanged"
          ],
          correctAnswer: 1,
          explanation: "Under monopsony, a union or minimum wage can raise the wage and employment together by removing the firm's power to hold both down - the reverse of the competitive case."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A monopsony is a single buyer of labor facing the whole upward-sloping supply curve.",
          "Hiring more raises the wage for everyone, so MRC exceeds the wage.",
          "It hires where MRP equals MRC, then pays a wage off the supply curve below MRP.",
          "Monopsony hires fewer workers at a lower wage than competition, causing deadweight loss.",
          "A minimum wage or union can raise both wage and employment under monopsony."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-5-4-mastery1",
            question: "A monopsony is a market characterized by…",
            options: [
              "A single seller of a good",
              "A single buyer of a resource",
              "Many identical employers for this good",
              "Free entry of new firms in that market"
            ],
            correctAnswer: 1,
            explanation: "A monopsony has one buyer, typically the sole employer of labor, giving it power over the wage. A single seller would be a monopoly instead."
          },
          {
            id: "apm-5-4-mastery2",
            question: "A monopsonist's marginal resource cost curve lies above the labor supply curve because…",
            options: [
              "Workers have all the power for this good",
              "Hiring more raises the wage for all",
              "The wage is set by law",
              "MRP is above the wage in that market"
            ],
            correctAnswer: 1,
            explanation: "To hire an extra worker the firm raises the wage for everyone, so each hire adds more to cost than that worker's wage. That pushes MRC above supply."
          },
          {
            id: "apm-5-4-mastery3",
            question: "Under monopsony, the wage paid is…",
            options: [
              "Above the worker's MRP",
              "Below the worker's MRP",
              "Equal to the worker's MRP",
              "Equal to marginal resource cost"
            ],
            correctAnswer: 1,
            explanation: "The firm hires where MRP equals MRC, then reads the wage off the lower supply curve, so the wage falls below MRP. Workers are paid less than they add."
          },
          {
            id: "apm-5-4-mastery4",
            question: "Relative to a competitive market, monopsony causes deadweight loss because it…",
            options: [
              "Hires too many workers",
              "Hires too few workers",
              "Pays above-market wages for this good",
              "Eliminates all barriers"
            ],
            correctAnswer: 1,
            explanation: "By employing fewer workers than the competitive level, some beneficial hires do not happen, creating deadweight loss from underhiring."
          },
          {
            id: "apm-5-4-mastery5",
            question: "A well-set minimum wage in a monopsonized labor market can…",
            options: [
              "Reduce both wages and jobs",
              "Raise both wages and jobs",
              "Only reduce total employment for this good",
              "Have no effect at all"
            ],
            correctAnswer: 1,
            explanation: "By fixing the wage, it removes the firm's incentive to hold down hiring, so both the wage and employment can rise - opposite to the competitive outcome."
          },
          {
            id: "apm-5-4-mastery6",
            question: "The monopsony hiring rule is to employ workers up to where…",
            options: [
              "The wage equals MRP",
              "MRP equals MRC",
              "MRC equals the wage",
              "MRP is at its maximum"
            ],
            correctAnswer: 1,
            explanation: "Like all firms, the monopsonist hires where marginal revenue product equals marginal resource cost. Because MRC is above the wage, this yields fewer workers."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-6-1",
    sections: [
      {
        type: "concept",
        title: "Consumer Surplus, Producer Surplus, and Total Surplus",
        paragraphs: [
          "Market outcomes can be measured by surplus, the net gains that trading creates. Consumer surplus is the difference between what buyers are willing to pay and what they actually pay. If you would pay $50 for a concert ticket but buy it for $30, you gain $20 of consumer surplus. On a supply-and-demand graph it is the area below the demand curve and above the price, up to the quantity traded - a triangle capturing every buyer's bonus from paying less than their maximum.",
          "Producer surplus is the mirror image: the difference between the price sellers receive and the lowest price they would have accepted (their cost). If a seller would take $18 for a shirt but sells it for $25, that $7 is producer surplus. Graphically it is the area above the supply curve and below the price, up to the quantity traded. Total surplus, or total welfare, is consumer surplus plus producer surplus - the entire gain from trade shared between both sides of the market.",
          "At the competitive equilibrium, total surplus is maximized. Every unit whose value to buyers (height of demand) exceeds its cost to sellers (height of supply) is produced, and no unit costing more than it is worth is produced. The market squeezes out all mutually beneficial trades. Any move away from equilibrium - a shortage, surplus, tax, or quota - shrinks total surplus, and that lost welfare is deadweight loss, a triangle between the supply and demand curves over the missing trades."
        ],
        bullets: [
          "Consumer surplus is willingness to pay minus the price actually paid.",
          "Producer surplus is the price received minus the seller's minimum acceptable price.",
          "Total surplus is consumer surplus plus producer surplus - the full gain from trade.",
          "Competitive equilibrium maximizes total surplus by capturing all beneficial trades.",
          "Any deviation from equilibrium creates deadweight loss, a triangle of lost surplus."
        ],
        realWorldExample: "At a farmers market, a shopper willing to pay $6 for berries buys them for $4, gaining $2 of consumer surplus, while the farmer who would accept $3 gains $1 of producer surplus. Together their $3 total surplus is the value the trade created."
      },
      {
        type: "concept",
        title: "Allocative and Productive Efficiency",
        paragraphs: [
          "Economists judge markets by two efficiency standards. Allocative efficiency means society produces the mix of goods people value most - resources flow to their highest-valued uses. It is achieved at the quantity where price equals marginal cost, because the price reflects the marginal benefit buyers place on the last unit, and marginal cost reflects what society gives up to make it. When P equals MC, the last unit's benefit exactly equals its cost, so no reallocation could make society better off.",
          "Productive efficiency means each good is made at the lowest possible cost - production occurs at the minimum of average total cost, using the fewest resources per unit. A firm producing at minimum ATC wastes nothing. Perfect competition achieves both efficiencies in long-run equilibrium: firms produce where price equals marginal cost (allocative) and at minimum ATC (productive). This is why perfect competition is the efficiency benchmark against which other market structures are compared.",
          "Deadweight loss is the visible cost of falling short of allocative efficiency. When output is below the efficient level - as under monopoly, a tax, or a binding price control - some units whose marginal benefit exceeds marginal cost go unproduced, and the lost surplus is deadweight loss. When output is pushed above the efficient level - as with a subsidy - units whose cost exceeds their benefit are produced, also creating deadweight loss. The efficient quantity is precisely where marginal benefit equals marginal cost, with no deadweight loss."
        ],
        bullets: [
          "Allocative efficiency directs resources to their highest-valued uses at the quantity where P equals MC.",
          "At P equals MC, the last unit's marginal benefit equals its marginal cost.",
          "Productive efficiency means producing at the minimum of average total cost.",
          "Perfect competition achieves both allocative and productive efficiency in the long run.",
          "Deadweight loss appears whenever output is above or below the efficient P equals MC quantity."
        ],
        realWorldExample: "In a competitive bread market, loaves are made at the lowest cost per loaf (productive efficiency) and produced until the price equals the marginal cost of the last loaf (allocative efficiency), so buyers get exactly the quantity of bread society values most."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-6-1-mc1",
            question: "Consumer surplus is the difference between…",
            options: [
              "Price and the seller's cost for this good",
              "Willingness to pay and the price",
              "Total revenue and total cost",
              "Marginal benefit and total benefit"
            ],
            correctAnswer: 1,
            explanation: "Consumer surplus is what buyers would have paid minus what they actually paid. The gap between price and seller cost is producer surplus instead."
          },
          {
            id: "apm-6-1-mc2",
            question: "Allocative efficiency in a market is achieved at the quantity where…",
            options: [
              "Price equals average cost",
              "Price equals marginal cost",
              "Total surplus is zero",
              "Marginal cost is lowest"
            ],
            correctAnswer: 1,
            explanation: "When price (marginal benefit) equals marginal cost, the last unit's benefit matches its cost, so resources are allocated to their highest-valued use."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Ticket Resale Market",
        narrative: "Fans resell concert tickets in a competitive online market that clears at $60. One buyer would have paid $95, and one seller would have accepted as little as $40. The site runs smoothly with no taxes or price limits, letting the market reach its equilibrium.",
        details: [
          "The buyer willing to pay $95 who pays $60 enjoys $35 of consumer surplus.",
          "The seller willing to accept $40 who receives $60 earns $20 of producer surplus.",
          "Total surplus is the sum of all such consumer and producer gains across every trade.",
          "Because the market clears freely at equilibrium, total surplus is maximized with no deadweight loss."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-6-1-aq1",
          question: "In the freely clearing $60 ticket market, why is total surplus maximized?",
          options: [
            "Sellers capture all the gains",
            "Every beneficial trade takes place",
            "The price is held below cost",
            "A tax raises extra revenue"
          ],
          correctAnswer: 1,
          explanation: "At equilibrium, every trade where a buyer values the ticket above a seller's cost occurs, and none where cost exceeds value. Capturing all beneficial trades maximizes total surplus."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Consumer surplus is willingness to pay minus price; producer surplus is price minus cost.",
          "Total surplus is their sum and is maximized at competitive equilibrium.",
          "Allocative efficiency occurs where price equals marginal cost.",
          "Productive efficiency occurs at the minimum of average total cost.",
          "Deadweight loss arises whenever output differs from the efficient P equals MC quantity."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-6-1-mastery1",
            question: "Producer surplus is measured as the area…",
            options: [
              "Below demand, above price",
              "Above supply, below price",
              "Below supply, above price",
              "Above demand, below price"
            ],
            correctAnswer: 1,
            explanation: "Producer surplus is the gap between the price received and sellers' costs, shown as the area above the supply curve and below the price."
          },
          {
            id: "apm-6-1-mastery2",
            question: "Total surplus in a market equals…",
            options: [
              "Consumer surplus minus producer surplus",
              "Consumer surplus plus producer surplus",
              "Total revenue minus total cost",
              "Price times quantity traded for this good"
            ],
            correctAnswer: 1,
            explanation: "Total surplus is the combined gain to both sides: consumer surplus plus producer surplus. It measures the full value trade creates."
          },
          {
            id: "apm-6-1-mastery3",
            question: "Productive efficiency is achieved when a good is produced at…",
            options: [
              "The highest possible price for this good",
              "The minimum of average total cost",
              "The point where MR is zero",
              "The maximum of marginal cost"
            ],
            correctAnswer: 1,
            explanation: "Producing at minimum ATC uses the fewest resources per unit, which is productive efficiency. Perfect competition delivers this in the long run."
          },
          {
            id: "apm-6-1-mastery4",
            question: "Deadweight loss occurs when a market produces…",
            options: [
              "Exactly the efficient quantity for this good",
              "Less or more than the efficient quantity",
              "At minimum average total cost in that market",
              "The largest possible total surplus for the seller"
            ],
            correctAnswer: 1,
            explanation: "Any output away from the P equals MC quantity - too little or too much - forgoes or wastes beneficial trades, creating deadweight loss."
          },
          {
            id: "apm-6-1-mastery5",
            question: "Perfect competition in long-run equilibrium achieves…",
            options: [
              "Only productive efficiency for this good",
              "Both allocative and productive efficiency",
              "Only allocative efficiency in that market",
              "Neither type of efficiency"
            ],
            correctAnswer: 1,
            explanation: "Competitive firms produce where price equals marginal cost (allocative) and at minimum ATC (productive), so both efficiencies hold in the long run."
          },
          {
            id: "apm-6-1-mastery6",
            question: "A per-unit subsidy that pushes output above the efficient level will…",
            options: [
              "Eliminate deadweight loss for this good",
              "Create deadweight loss from overproduction",
              "Maximize total surplus in that market",
              "Leave the market unchanged"
            ],
            correctAnswer: 1,
            explanation: "Overproducing means making units whose cost exceeds their benefit, which wastes resources and creates deadweight loss. The efficient quantity is where marginal benefit equals marginal cost."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-6-2",
    sections: [
      {
        type: "concept",
        title: "Negative Externalities and Overproduction",
        paragraphs: [
          "An externality is a cost or benefit that falls on a third party not involved in a market transaction. When markets have externalities, prices no longer reflect the full value or cost to society, so the market fails to allocate resources efficiently. A negative externality is a spillover cost - like pollution from a factory that harms nearby residents who neither buy nor sell the product. The residents bear a cost the market ignores, so the good is overproduced from society's point of view.",
          "The key is the gap between private and social costs. Marginal private cost (MPC) is what the producer pays; marginal social cost (MSC) is MPC plus the external cost imposed on others. With a negative externality, MSC lies above MPC. The market equilibrium sets quantity where demand meets MPC, but the socially efficient quantity is where demand meets the higher MSC. Because the market ignores the external cost, it produces too much - the quantity is greater than the socially optimal level, creating deadweight loss.",
          "Graph it: the demand curve is marginal benefit, and two cost curves sit below it - the lower MPC the market uses and the higher MSC that includes the spillover. The market quantity where demand crosses MPC exceeds the efficient quantity where demand crosses MSC. The deadweight loss is the triangle between MSC and demand over that overproduced range, representing units whose social cost exceeds their benefit. Steel mills emitting smoke and drivers creating traffic and emissions are everyday negative externalities."
        ],
        bullets: [
          "An externality is a cost or benefit falling on a third party outside the transaction.",
          "A negative externality is a spillover cost, like pollution harming neighbors.",
          "Marginal social cost equals marginal private cost plus the external cost.",
          "With a negative externality, MSC lies above MPC and the good is overproduced.",
          "The overproduction beyond the MSC-equals-demand quantity creates deadweight loss."
        ],
        realWorldExample: "A factory dumping waste into a river saves on disposal but sickens downstream communities who never bought its product. Because the factory ignores that cost, it produces more than is socially optimal - a classic negative externality with overproduction."
      },
      {
        type: "concept",
        title: "Positive Externalities and Correcting Market Failure",
        paragraphs: [
          "A positive externality is a spillover benefit to third parties - vaccinations protect not just the person vaccinated but everyone they might have infected, and education makes a more productive, informed society. Here marginal social benefit (MSB) exceeds marginal private benefit (MPB): the demand curve (private benefit) understates the good's true value. The market produces where MPB meets supply, but the efficient quantity is where the higher MSB meets supply, so the good is underproduced, again creating deadweight loss.",
          "Governments correct externalities by making people face the full social cost or benefit - 'internalizing' the externality. For a negative externality, a Pigouvian tax equal to the external cost per unit shifts the private cost curve up to match MSC, cutting output to the efficient level. Carbon taxes and cigarette taxes work this way. For a positive externality, a per-unit subsidy equal to the external benefit shifts demand or lowers cost, raising output to the efficient quantity - which is why governments subsidize vaccines and education.",
          "The Coase theorem offers a private alternative: if property rights are clearly defined and bargaining is cheap, the parties can negotiate to the efficient outcome on their own, regardless of who initially holds the rights. A beekeeper and an orchard owner might strike a deal that captures the mutual benefit of pollination. But Coase bargaining breaks down when many parties are involved and transaction costs are high - as with global pollution - which is why government taxes, subsidies, and regulation remain the common remedies for large-scale externalities."
        ],
        bullets: [
          "A positive externality is a spillover benefit, like vaccination or education.",
          "With a positive externality, marginal social benefit exceeds private benefit and the good is underproduced.",
          "A Pigouvian tax equal to the external cost corrects a negative externality by cutting output.",
          "A subsidy equal to the external benefit corrects a positive externality by raising output.",
          "The Coase theorem shows private bargaining can fix externalities when rights are clear and bargaining is cheap."
        ],
        realWorldExample: "Getting a flu shot protects you and everyone you would have infected, a benefit the market ignores, so too few people vaccinate. A government subsidy that lowers the price nudges vaccinations up toward the socially optimal level."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-6-2-mc1",
            question: "With a negative externality like pollution, the market tends to…",
            options: [
              "Underproduce the good",
              "Overproduce the good",
              "Produce the efficient amount",
              "Stop production entirely"
            ],
            correctAnswer: 1,
            explanation: "Because producers ignore the external cost, marginal social cost exceeds private cost and the market makes too much of the good - overproduction."
          },
          {
            id: "apm-6-2-mc2",
            question: "To correct a positive externality, a government would most likely use a…",
            options: [
              "Tax equal to the external cost",
              "Subsidy equal to the external benefit",
              "Binding price ceiling for this good",
              "Ban on the entire good in that market"
            ],
            correctAnswer: 1,
            explanation: "A positive externality means underproduction, so a subsidy equal to the spillover benefit raises output to the efficient level. Taxes fix negative externalities instead."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Riverside Paper Mill",
        narrative: "A paper mill discharges chemicals into a river, imposing cleanup and health costs on a town downstream that has no stake in the mill. The mill sets output based only on its own costs. Nearby, a college educates students who go on to start businesses and volunteer, benefiting the whole community.",
        details: [
          "The mill's pollution is a negative externality, so marginal social cost lies above its private cost.",
          "Ignoring the downstream cost, the mill overproduces paper beyond the socially efficient quantity.",
          "A Pigouvian tax equal to the pollution cost per unit would raise the mill's costs and cut output to the efficient level.",
          "The college's graduates create a positive externality, so education tends to be underproduced without a subsidy."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-6-2-aq1",
          question: "What policy would move the polluting paper mill toward the socially efficient output?",
          options: [
            "A subsidy per unit of paper",
            "A Pigouvian tax on its output",
            "A price floor on paper for this good",
            "A guaranteed purchase of paper"
          ],
          correctAnswer: 1,
          explanation: "A Pigouvian tax equal to the external pollution cost raises the mill's private cost to match social cost, cutting output to the efficient level. Subsidies fix positive externalities, not negative ones."
        }
      },
      {
        type: "recap",
        takeaways: [
          "An externality is a spillover cost or benefit on a third party outside the transaction.",
          "Negative externalities make social cost exceed private cost, causing overproduction.",
          "Positive externalities make social benefit exceed private benefit, causing underproduction.",
          "A Pigouvian tax corrects overproduction; a subsidy corrects underproduction.",
          "The Coase theorem shows private bargaining can fix externalities when rights are clear and costs low."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-6-2-mastery1",
            question: "An externality is best defined as a cost or benefit that falls on…",
            options: [
              "The buyer in the transaction in that market",
              "A third party outside the transaction",
              "The seller producing the good",
              "The government collecting taxes for this good"
            ],
            correctAnswer: 1,
            explanation: "Externalities spill over onto third parties who are neither the buyer nor the seller, which is why the market price fails to reflect them."
          },
          {
            id: "apm-6-2-mastery2",
            question: "With a negative externality, marginal social cost is…",
            options: [
              "Below marginal private cost",
              "Above marginal private cost",
              "Equal to marginal private cost",
              "Equal to marginal benefit"
            ],
            correctAnswer: 1,
            explanation: "MSC equals private cost plus the external cost, so it lies above MPC. The market ignoring that gap leads to overproduction."
          },
          {
            id: "apm-6-2-mastery3",
            question: "A good with a positive externality is produced in a quantity that is…",
            options: [
              "Above the efficient level",
              "Below the efficient level",
              "Exactly efficient for this good",
              "Equal to zero"
            ],
            correctAnswer: 1,
            explanation: "Because private benefit understates social benefit, the market makes too little of the good - underproduction relative to the efficient quantity."
          },
          {
            id: "apm-6-2-mastery4",
            question: "A Pigouvian tax is designed to…",
            options: [
              "Increase a good's output",
              "Make producers face external costs",
              "Subsidize positive spillovers for this good",
              "Set a legal price maximum"
            ],
            correctAnswer: 1,
            explanation: "A Pigouvian tax equals the external cost per unit, raising private cost to social cost so producers internalize the harm and cut output to the efficient level."
          },
          {
            id: "apm-6-2-mastery5",
            question: "The Coase theorem states that externalities can be resolved privately when…",
            options: [
              "The national government directly sets the market price",
              "Property rights are clear and bargaining is cheap",
              "Many separate parties are involved in the good",
              "Transaction costs are very high for the seller"
            ],
            correctAnswer: 1,
            explanation: "Clear property rights and low transaction costs let parties bargain to the efficient outcome on their own. High costs or many parties make this impractical."
          },
          {
            id: "apm-6-2-mastery6",
            question: "The deadweight loss from a negative externality comes from units whose…",
            options: [
              "Benefit exceeds their private cost",
              "Social cost exceeds their benefit",
              "Price exceeds their marginal cost",
              "Supply exceeds market demand for this good"
            ],
            correctAnswer: 1,
            explanation: "Overproduction means making units whose full social cost is greater than the benefit buyers receive. That excess is the deadweight loss."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-6-3",
    sections: [
      {
        type: "concept",
        title: "Classifying Goods by Excludability and Rivalry",
        paragraphs: [
          "Not all goods can be efficiently provided by private markets. Economists classify goods using two traits. Excludability is whether people who do not pay can be prevented from using the good. Rivalry (rivalrousness) is whether one person's use reduces the amount available for others. Crossing these two traits gives four categories, and where a good lands predicts whether markets, governments, or shared rules are needed to provide it.",
          "A private good is both excludable and rival - a slice of pizza. You can be kept from eating it unless you pay, and once you eat it, no one else can. Markets handle these well. A public good is both non-excludable and non-rival - national defense or a fireworks display. You cannot easily exclude non-payers, and one person enjoying it does not reduce anyone else's enjoyment. Public goods are the classic case of market failure because private firms struggle to profit from them.",
          "The other two categories fill out the grid. A club good (or artificially scarce good) is excludable but non-rival - streaming services or a toll road with light traffic; you can charge for access, but one more user does not use it up. A common resource is non-excludable but rival - ocean fish or a public grazing field; anyone can access it, but each user depletes it for others. Knowing the two traits lets you place any good and predict its provision problem."
        ],
        bullets: [
          "Excludability is whether non-payers can be kept from using a good.",
          "Rivalry is whether one person's use reduces the amount left for others.",
          "A private good is excludable and rival; markets provide it well.",
          "A public good is non-excludable and non-rival, a classic market failure.",
          "Club goods are excludable but non-rival; common resources are non-excludable but rival."
        ],
        realWorldExample: "A fireworks show is non-excludable and non-rival: the city cannot stop anyone in town from watching, and your enjoyment does not dim anyone else's. Because no firm can charge everyone who watches, the government usually funds it - a public good."
      },
      {
        type: "concept",
        title: "The Free-Rider Problem and Tragedy of the Commons",
        paragraphs: [
          "Public goods suffer the free-rider problem. Because non-payers cannot be excluded and enjoy the good anyway, each person has an incentive to let others pay while they benefit for free. If everyone free-rides, no one pays, and the good is not provided at all even though society values it. This is why national defense, clean air, and basic research are typically funded by government through taxes rather than sold in markets - the market underprovides or fails to provide them entirely.",
          "Common resources suffer the opposite failure: the tragedy of the commons. Because the resource is non-excludable but rival, each user has an incentive to grab as much as possible before others do, ignoring the depletion they impose on everyone. Overfishing collapses fisheries, overgrazing ruins shared pastures, and unchecked emissions degrade the atmosphere. Each individual acts rationally, but the collective result overexploits and destroys the resource - a negative externality baked into open access.",
          "Solutions target the missing incentives. For public goods, government provision funded by taxes overcomes free-riding, since taxes force everyone to contribute. For common resources, the fixes assign or limit access: government quotas (fishing limits), tradable permits, privatization that creates an owner with a stake in preservation, or community management of shared rules. Assigning property rights or usage limits transforms open access into managed use, aligning private incentives with the long-run health of the resource."
        ],
        bullets: [
          "The free-rider problem: people enjoy non-excludable goods without paying, so markets underprovide them.",
          "Government provision funded by taxes overcomes free-riding for public goods.",
          "The tragedy of the commons: open-access rival resources get overused and depleted.",
          "Each user ignores the depletion they impose, so the resource is overexploited.",
          "Quotas, permits, privatization, or community rules can protect common resources."
        ],
        realWorldExample: "A shared ocean fishery collapses when every boat races to catch as many fish as possible, since none can be excluded and each fish caught is gone for others. Catch limits or tradable fishing permits realign incentives and let the stock recover."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-6-3-mc1",
            question: "A public good is defined as one that is…",
            options: [
              "Excludable and rival",
              "Non-excludable and non-rival",
              "Excludable and non-rival",
              "Non-excludable and rival"
            ],
            correctAnswer: 1,
            explanation: "Public goods are both non-excludable and non-rival, like national defense. Non-payers cannot be kept out and one person's use does not reduce others'."
          },
          {
            id: "apm-6-3-mc2",
            question: "The tragedy of the commons occurs with resources that are…",
            options: [
              "Excludable and non-rival",
              "Non-excludable and rival",
              "Excludable and rival",
              "Non-excludable and non-rival"
            ],
            correctAnswer: 1,
            explanation: "Common resources are non-excludable but rival, so open access lets users deplete them for everyone. That overuse is the tragedy of the commons."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Village Fishing Pond",
        narrative: "A village shares an open pond full of fish that anyone may catch. No one can be stopped from fishing, and every fish caught is one fewer for the next person. The village also wants a new levee to protect all homes from floods, but no household wants to pay for something everyone will benefit from.",
        details: [
          "The pond is a common resource: non-excludable but rival, so each fisher depletes the stock for others.",
          "With everyone racing to catch fish first, the pond is overfished - a tragedy of the commons.",
          "The flood levee is a public good, non-excludable and non-rival, protecting all homes at once.",
          "Households want to free-ride on the levee, so it will be underprovided unless the village funds it collectively."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-6-3-aq1",
          question: "Why will the flood levee likely be underprovided if left to voluntary payments?",
          options: [
            "It is rival and gets used up",
            "Households free-ride on others' payments",
            "It is a private, excludable good",
            "The village has no flood risk"
          ],
          correctAnswer: 1,
          explanation: "Because the levee is non-excludable, each household benefits whether or not it pays, so all try to free-ride. That free-rider problem leaves the public good underprovided."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Goods are classified by excludability and rivalry into four categories.",
          "Private goods are excludable and rival; public goods are neither.",
          "Club goods are excludable but non-rival; common resources are non-excludable but rival.",
          "Public goods suffer free-riding and are usually funded by government taxes.",
          "Common resources face the tragedy of the commons, fixed by quotas, permits, or property rights."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-6-3-mastery1",
            question: "A private good is one that is…",
            options: [
              "Non-excludable and non-rival",
              "Excludable and rival",
              "Non-excludable and rival",
              "Excludable and non-rival"
            ],
            correctAnswer: 1,
            explanation: "A private good like a sandwich is excludable (pay to get it) and rival (eating it leaves none for others). Markets provide these efficiently."
          },
          {
            id: "apm-6-3-mastery2",
            question: "The free-rider problem explains why markets tend to…",
            options: [
              "Overprovide public goods",
              "Underprovide public goods",
              "Perfectly provide public goods",
              "Overprice public goods"
            ],
            correctAnswer: 1,
            explanation: "Since non-payers cannot be excluded, everyone hopes others will pay, so too little is collected and the public good is underprovided."
          },
          {
            id: "apm-6-3-mastery3",
            question: "A streaming service that charges subscribers but is not used up by extra viewers is a…",
            options: [
              "Pure public good",
              "Club good",
              "Common resource",
              "Pure private good"
            ],
            correctAnswer: 1,
            explanation: "It is excludable (you must subscribe) but non-rival (one more viewer does not use it up), which defines a club good."
          },
          {
            id: "apm-6-3-mastery4",
            question: "A common way to solve the tragedy of the commons is to…",
            options: [
              "Remove all usage limits",
              "Assign property rights or quotas",
              "Make the resource free to all",
              "Subsidize more extraction for this good"
            ],
            correctAnswer: 1,
            explanation: "Assigning ownership or setting limits gives users a stake in preservation and caps overuse. Removing limits or subsidizing extraction would worsen depletion."
          },
          {
            id: "apm-6-3-mastery5",
            question: "National defense is typically funded by government because it is…",
            options: [
              "A rival private good",
              "A non-excludable public good",
              "An excludable club good",
              "A depletable common resource"
            ],
            correctAnswer: 1,
            explanation: "Defense protects everyone and cannot exclude non-payers, so private firms cannot profitably provide it. Government funds it through taxes."
          },
          {
            id: "apm-6-3-mastery6",
            question: "Rivalry in consumption means that…",
            options: [
              "Non-payers can be excluded for this good",
              "One person's use reduces others' availability",
              "The good never gets used up",
              "Everyone can be charged a fee"
            ],
            correctAnswer: 1,
            explanation: "A rival good is diminished by use - one person consuming it leaves less for others. Non-rival goods can be enjoyed by many at once without depletion."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-6-4",
    sections: [
      {
        type: "concept",
        title: "Antitrust Law and Regulating Natural Monopolies",
        paragraphs: [
          "When market power leads to inefficient outcomes, governments intervene to protect competition and consumers. Antitrust laws prohibit practices that harm competition - forming cartels, fixing prices, or merging to dominate a market. In the United States, landmark laws like the Sherman Act and Clayton Act let regulators block anticompetitive mergers, break up monopolies, and ban collusion. The goal is to keep markets competitive so that price stays near marginal cost and deadweight loss stays small, mimicking the efficiency of competition.",
          "Natural monopolies pose a special problem because competition would be wasteful - duplicating an electric grid or water system raises costs. Instead of breaking them up, regulators control their prices. Two benchmarks appear on the AP exam. Marginal-cost pricing (socially optimal) sets price equal to marginal cost, the allocatively efficient point, but because a natural monopoly has falling average cost, price below ATC means the firm loses money and needs a subsidy to survive.",
          "The alternative is average-cost pricing, also called fair-return pricing, which sets price equal to average total cost. Here the firm earns exactly zero economic profit - a normal return - and needs no subsidy, but because price still exceeds marginal cost, a bit of deadweight loss remains. Regulators thus face a tradeoff: marginal-cost pricing is efficient but requires a subsidy, while average-cost pricing is self-sustaining but slightly inefficient. Real utility regulation usually lands near fair-return pricing to avoid taxpayer subsidies."
        ],
        bullets: [
          "Antitrust laws ban price fixing, collusion, and anticompetitive mergers to protect competition.",
          "Natural monopolies are regulated rather than broken up, since competition would raise costs.",
          "Marginal-cost pricing (P equals MC) is socially optimal but forces a loss needing a subsidy.",
          "Average-cost pricing (P equals ATC) gives fair return and zero economic profit but leaves some deadweight loss.",
          "Regulators trade off efficiency against the need for subsidies when setting utility prices."
        ],
        realWorldExample: "A state utility commission caps an electric company's rates near its average total cost. The utility earns a fair return without a taxpayer subsidy, though the price sits above marginal cost, leaving a small amount of deadweight loss - the fair-return compromise."
      },
      {
        type: "concept",
        title: "Rent-Seeking and Government Failure",
        paragraphs: [
          "Government intervention is not always a clean fix. Rent-seeking is spending resources to gain wealth through favorable government treatment rather than by producing value - lobbying for a protective tariff, a special license, or a subsidy. A firm that hires lobbyists to win a monopoly-granting regulation gains at consumers' expense while producing nothing new. Rent-seeking wastes real resources (the lobbying effort itself) and can entrench inefficient market power, turning government policy into a prize firms compete to capture.",
          "Government failure occurs when intervention makes outcomes worse than the market failure it was meant to fix. Causes include imperfect information (regulators cannot know the true efficient price), regulatory capture (agencies come to serve the industries they regulate), unintended consequences (a price control causing shortages), and political incentives that favor concentrated interests over the diffuse public. Just as markets can fail, so can the political process, and good analysis compares the imperfect market to the imperfect remedy, not to a perfect ideal.",
          "This is why economists weigh the costs and benefits of intervention case by case. Sometimes a market failure like pollution or monopoly clearly justifies a tax, subsidy, or antitrust action. Other times the cure - a poorly designed regulation captured by insiders, or a subsidy that invites rent-seeking - is worse than the disease. The mature view is neither blind faith in markets nor blind faith in government, but a clear-eyed comparison of how each performs given real-world imperfections and incentives."
        ],
        bullets: [
          "Rent-seeking spends resources to win favorable government treatment rather than to produce value.",
          "Rent-seeking wastes real resources and can entrench inefficient market power.",
          "Government failure occurs when intervention leaves outcomes worse than the original problem.",
          "Causes include imperfect information, regulatory capture, and political incentives.",
          "Sound policy compares the imperfect market with the imperfect remedy, not a perfect ideal."
        ],
        realWorldExample: "A sugar producer spends millions lobbying for import quotas that raise domestic sugar prices. The money buys no new output - it just secures protection - so consumers pay more and the lobbying effort itself is wasted resources, a textbook case of rent-seeking."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-6-4-mc1",
            question: "Regulating a natural monopoly with average-cost (fair-return) pricing sets price equal to…",
            options: [
              "Marginal cost for this good",
              "Average total cost",
              "Marginal revenue",
              "Average fixed cost"
            ],
            correctAnswer: 1,
            explanation: "Fair-return pricing sets P equal to ATC, giving the firm zero economic profit and no need for a subsidy, though some deadweight loss remains."
          },
          {
            id: "apm-6-4-mc2",
            question: "Rent-seeking refers to spending resources to…",
            options: [
              "Lower a firm's production costs",
              "Win favorable government treatment",
              "Increase output and value",
              "Reduce the price of inputs"
            ],
            correctAnswer: 1,
            explanation: "Rent-seeking uses resources to secure special government favors like tariffs or licenses, gaining wealth without producing anything new."
          }
        ]
      },
      {
        type: "scenario",
        title: "Regulating the Water Company",
        narrative: "A town's water company is a natural monopoly with steadily falling average cost. Regulators debate setting its price at marginal cost or at average total cost. Meanwhile, the company hires lobbyists to push for a rule blocking any future competitors from entering.",
        details: [
          "Marginal-cost pricing would be socially optimal but leaves price below average cost, forcing a loss that needs a subsidy.",
          "Average-cost pricing gives the company a fair return with zero economic profit and no subsidy, but leaves some deadweight loss.",
          "The lobbying to block competitors is rent-seeking - spending resources to secure protection rather than to produce value.",
          "If regulators are captured by the company, the resulting rules could produce government failure that harms consumers."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-6-4-aq1",
          question: "Why might regulators choose average-cost pricing over marginal-cost pricing for the water company?",
          options: [
            "It fully eliminates deadweight loss for this good",
            "It avoids the need for a subsidy",
            "It maximizes the firm's profit in that market",
            "It sets price below marginal cost"
          ],
          correctAnswer: 1,
          explanation: "Marginal-cost pricing forces a loss for a falling-cost natural monopoly, requiring a subsidy. Average-cost pricing lets the firm break even without one, at the cost of a little deadweight loss."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Antitrust laws protect competition by banning collusion and anticompetitive mergers.",
          "Natural monopolies are regulated rather than broken up.",
          "Marginal-cost pricing is efficient but needs a subsidy; average-cost pricing breaks even with some deadweight loss.",
          "Rent-seeking wastes resources to win government favors rather than to create value.",
          "Government failure means intervention can leave outcomes worse than the original market failure."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-6-4-mastery1",
            question: "Antitrust laws are primarily intended to…",
            options: [
              "Guarantee firms high profits",
              "Preserve competition in markets",
              "Set every good's price",
              "Ban all large companies"
            ],
            correctAnswer: 1,
            explanation: "Antitrust laws stop collusion and anticompetitive mergers to keep markets competitive, which keeps price near marginal cost and limits deadweight loss."
          },
          {
            id: "apm-6-4-mastery2",
            question: "Setting a natural monopoly's price at marginal cost is socially optimal but…",
            options: [
              "Yields huge monopoly profit for this good",
              "Forces a loss needing a subsidy",
              "Raises price above demand in that market",
              "Eliminates the firm's output"
            ],
            correctAnswer: 1,
            explanation: "Because a natural monopoly has falling average cost, price at MC lies below ATC, so the firm loses money and requires a subsidy to keep operating."
          },
          {
            id: "apm-6-4-mastery3",
            question: "Under fair-return (average-cost) pricing, a regulated natural monopoly earns…",
            options: [
              "Large economic profit",
              "Zero economic profit",
              "A permanent economic loss",
              "Profit above the unregulated level"
            ],
            correctAnswer: 1,
            explanation: "Price equal to ATC means the firm covers all costs including a normal return, so economic profit is zero and no subsidy is needed."
          },
          {
            id: "apm-6-4-mastery4",
            question: "Regulatory capture is a form of government failure in which…",
            options: [
              "Regulators serve the public well for the seller",
              "Agencies come to serve the regulated industry",
              "Markets fix themselves quickly for this good",
              "Firms compete more fiercely in that market"
            ],
            correctAnswer: 1,
            explanation: "Capture occurs when a regulatory agency ends up advancing the interests of the industry it oversees, undermining the public purpose of regulation."
          },
          {
            id: "apm-6-4-mastery5",
            question: "The main social cost of rent-seeking is that it…",
            options: [
              "Increases total output for this good",
              "Wastes resources without creating value",
              "Lowers prices for consumers",
              "Improves market competition in that market"
            ],
            correctAnswer: 1,
            explanation: "Rent-seeking spends real resources on lobbying to capture favors, producing nothing new and often entrenching inefficient market power."
          },
          {
            id: "apm-6-4-mastery6",
            question: "The idea of government failure reminds economists to compare a market failure with…",
            options: [
              "A perfectly efficient ideal",
              "The imperfect real-world remedy",
              "The largest possible subsidy",
              "A completely unregulated market"
            ],
            correctAnswer: 1,
            explanation: "Since intervention itself can be flawed, sound analysis weighs the imperfect market against the imperfect policy rather than against a perfect ideal."
          }
        ]
      }
    ]
  },
  {
    lessonId: "apm-6-5",
    sections: [
      {
        type: "concept",
        title: "Measuring Inequality: The Lorenz Curve and Gini Coefficient",
        paragraphs: [
          "Income is how much people earn in a period (wages, interest, rent, profit); wealth is the stock of assets they own minus debts. Both are distributed unequally, and economists need ways to measure that spread. The Lorenz curve is the main graphical tool. It plots the cumulative percentage of total income on the vertical axis against the cumulative percentage of households, ranked from poorest to richest, on the horizontal axis. A perfectly equal society would trace a straight 45-degree line - the bottom 20 percent of households earn 20 percent of income, and so on.",
          "Real distributions bow below that line of equality. If the poorest 20 percent of households earn only 5 percent of income while the richest 20 percent earn 50 percent, the curve sags well below the diagonal. The farther the Lorenz curve bows away from the 45-degree line, the more unequal the distribution. Comparing two countries' Lorenz curves, the one bowed farther from equality has greater inequality - a quick visual read the AP exam expects you to interpret.",
          "The Gini coefficient turns that picture into a single number. It equals the area between the line of equality and the Lorenz curve divided by the entire area under the line of equality. The Gini ranges from 0 (perfect equality, curve on the diagonal) to 1 (perfect inequality, one household has everything). A country with a Gini of 0.25 is far more equal than one at 0.55. A rising Gini over time signals widening inequality, while a falling Gini signals narrowing - a compact summary statistic for the whole distribution."
        ],
        bullets: [
          "Income is a flow of earnings; wealth is a stock of assets minus debts.",
          "The Lorenz curve plots cumulative income share against cumulative share of households.",
          "A 45-degree line means perfect equality; bowing below it signals inequality.",
          "The farther the Lorenz curve is from the diagonal, the greater the inequality.",
          "The Gini coefficient runs from 0 (perfect equality) to 1 (perfect inequality)."
        ],
        realWorldExample: "If a nation's poorest 40 percent of households earn just 12 percent of income while the top 20 percent earn over half, its Lorenz curve sags far below the diagonal and its Gini coefficient sits high, flagging substantial income inequality."
      },
      {
        type: "concept",
        title: "Sources of Inequality and the Equity-Efficiency Trade-off",
        paragraphs: [
          "Inequality has many sources. Differences in human capital - education, training, and skills - lead to large wage gaps because more productive workers command higher pay. Inherited wealth compounds over generations, since assets earn returns and can be passed on. Discrimination, differences in luck, market power, and the fact that capital income (returns on investments) flows disproportionately to those who already own assets all widen gaps. Some inequality reflects effort and skill, while some reflects circumstances beyond an individual's control - a distinction that fuels debates over fairness.",
          "Governments redistribute income to reduce inequality through two main tools. Progressive taxes take a larger percentage from higher incomes, while transfer payments - unemployment benefits, food assistance, Social Security - direct resources to lower-income households. Together these can pull the Lorenz curve toward the line of equality and lower the Gini coefficient. In-kind transfers like public education and health care also reduce effective inequality by providing services rather than cash.",
          "Redistribution involves the equity-efficiency trade-off, a central tension in economics. Taxes and transfers that reduce inequality (improving equity) can dull incentives to work, save, and invest (reducing efficiency): a very high income tax may lead top earners to work less, and generous benefits may reduce the incentive to seek work. Economists debate how much efficiency society should trade for greater equity. There is no purely technical answer - it is partly a normative value judgment about how much fairness is worth relative to total output."
        ],
        bullets: [
          "Inequality stems from differences in human capital, inherited wealth, discrimination, and capital income.",
          "Progressive taxes take a larger share from higher incomes.",
          "Transfer payments and in-kind benefits direct resources to lower-income households.",
          "Redistribution pulls the Lorenz curve toward equality and lowers the Gini coefficient.",
          "The equity-efficiency trade-off means reducing inequality can weaken incentives to produce."
        ],
        realWorldExample: "A country funds food assistance and public schooling through a progressive income tax. Inequality falls and its Gini drops, but critics warn that very high top tax rates could lead some high earners to work or invest less - the equity-efficiency trade-off in action."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "apm-6-5-mc1",
            question: "A Lorenz curve that bows farther away from the 45-degree line indicates…",
            options: [
              "Less income inequality",
              "More income inequality",
              "Perfect income equality",
              "Higher economic efficiency"
            ],
            correctAnswer: 1,
            explanation: "The diagonal represents perfect equality, so the farther the curve sags below it, the more unequal the distribution of income."
          },
          {
            id: "apm-6-5-mc2",
            question: "A Gini coefficient of 0 represents…",
            options: [
              "Perfect income inequality",
              "Perfect income equality",
              "Maximum efficiency for this good",
              "Zero total income"
            ],
            correctAnswer: 1,
            explanation: "A Gini of 0 means the Lorenz curve lies exactly on the line of equality - everyone has the same income, or perfect equality. A Gini of 1 is perfect inequality."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Nations Compared",
        narrative: "Economists compare two countries. In Northland the poorest 20 percent earn 9 percent of income and the Gini is 0.28. In Southland the poorest 20 percent earn just 4 percent while the Gini is 0.52. Southland is considering a progressive tax funding education and food assistance.",
        details: [
          "Southland's Lorenz curve bows farther from the line of equality than Northland's, showing greater inequality.",
          "Southland's higher Gini of 0.52 versus 0.28 confirms its income is distributed much more unequally.",
          "A progressive tax funding transfers would pull Southland's Lorenz curve toward equality and lower its Gini.",
          "Very high tax rates could weaken work and investment incentives, illustrating the equity-efficiency trade-off."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "apm-6-5-aq1",
          question: "How would a progressive tax funding transfers most likely affect Southland's Gini coefficient?",
          options: [
            "Raise it toward 1",
            "Lower it toward 0",
            "Leave it unchanged for this good",
            "Make it exceed 1"
          ],
          correctAnswer: 1,
          explanation: "Progressive taxes and transfers redistribute income toward lower-income households, pulling the Lorenz curve toward equality and lowering the Gini coefficient."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Income is a flow of earnings; wealth is a stock of assets minus debts.",
          "The Lorenz curve plots cumulative income against cumulative households; bowing signals inequality.",
          "The Gini coefficient runs from 0 (perfect equality) to 1 (perfect inequality).",
          "Inequality stems from human capital, inherited wealth, discrimination, and capital income.",
          "Redistribution lowers inequality but raises the equity-efficiency trade-off."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "apm-6-5-mastery1",
            question: "The Gini coefficient measures…",
            options: [
              "A country's inflation rate",
              "Income or wealth inequality",
              "The unemployment rate for this good",
              "Total economic output"
            ],
            correctAnswer: 1,
            explanation: "The Gini coefficient summarizes how unequally income or wealth is distributed, ranging from 0 for perfect equality to 1 for perfect inequality."
          },
          {
            id: "apm-6-5-mastery2",
            question: "On a Lorenz curve, the 45-degree line of equality means that…",
            options: [
              "One household holds all income for this good",
              "Each income share matches its population share",
              "Inequality is at its maximum in that market",
              "The Gini coefficient equals one"
            ],
            correctAnswer: 1,
            explanation: "Along the diagonal, the bottom 20 percent earns 20 percent of income and so on, so every income share equals its population share - perfect equality."
          },
          {
            id: "apm-6-5-mastery3",
            question: "Which is a common source of income inequality?",
            options: [
              "Identical wages for all jobs",
              "Differences in human capital",
              "Perfectly equal inheritances",
              "A flat, non-progressive tax"
            ],
            correctAnswer: 1,
            explanation: "Differences in education, training, and skills - human capital - lead to wage gaps and inequality. Identical wages or equal inheritances would reduce it."
          },
          {
            id: "apm-6-5-mastery4",
            question: "A progressive tax system is one in which…",
            options: [
              "Everyone pays the same rate for this good",
              "Higher incomes pay a larger share",
              "Lower incomes pay a larger share",
              "No one pays any tax"
            ],
            correctAnswer: 1,
            explanation: "A progressive tax takes a larger percentage of income from higher earners, which helps redistribute income and reduce inequality."
          },
          {
            id: "apm-6-5-mastery5",
            question: "The equity-efficiency trade-off suggests that reducing inequality may…",
            options: [
              "Always raise total output",
              "Weaken incentives to produce",
              "Have no effect on incentives",
              "Guarantee faster growth"
            ],
            correctAnswer: 1,
            explanation: "High taxes and generous transfers can dull incentives to work, save, and invest, so gaining equity may cost some efficiency. The balance is a value judgment."
          },
          {
            id: "apm-6-5-mastery6",
            question: "If a country's Gini coefficient falls over time, its income distribution has become…",
            options: [
              "More unequal",
              "More equal",
              "Perfectly unequal",
              "Impossible to measure"
            ],
            correctAnswer: 1,
            explanation: "A lower Gini means the Lorenz curve has moved toward the line of equality, so income is distributed more equally than before."
          }
        ]
      }
    ]
  }
]
