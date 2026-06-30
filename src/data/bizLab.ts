// ════════════════════════════════════════════════════════════════════════
// GULLIVER BIZ LAB — Mrs. Fortgang's Shark Tank Project
// ════════════════════════════════════════════════════════════════════════
// All curriculum content for the 6-part entrepreneurship unit lives here so
// the UI components stay presentational. Each part carries its own vocabulary
// (rendered as flashcards), content sections, hands-on activities, reflection
// journal prompts, and the submission forms that feed
// `entrepreneurship_submissions` in Supabase.

export interface VocabTerm {
  term: string
  definition: string
  example?: string
}

export interface ContentSection {
  heading: string
  body?: string
  bullets?: string[]
  /** Optional highlighted callout under the section. */
  note?: string
}

export interface BizLabActivity {
  id: string
  title: string
  /** Short framing of what students do. */
  description: string
  /** Optional ordered steps. */
  steps?: string[]
  /** e.g. "Group" | "Pairs" | "Individual". */
  format?: string
  /** Optional timer in seconds for timed activities (Feedback Frenzy). */
  timerSeconds?: number
}

export interface ReflectionPrompt {
  id: string
  prompt: string
}

export type SubmissionFieldType = "text" | "textarea" | "link" | "url-list"

export interface SubmissionField {
  key: string
  label: string
  type: SubmissionFieldType
  placeholder?: string
  help?: string
}

export interface SubmissionSpec {
  /** Matches `submission_type` in the DB; one current version per student. */
  submissionType: string
  title: string
  description?: string
  fields: SubmissionField[]
  /** Whether this submission carries an external link (video/website). */
  linkField?: { key: string; label: string; placeholder: string; embed?: boolean }
  xp: number
}

export interface BizLabPart {
  id: string
  number: number
  title: string
  subtitle: string
  /** lucide-react icon name resolved in the component. */
  icon: string
  /** Accent gradient (tailwind-friendly hex pair) for the part header. */
  accent: [string, string]
  estMinutes: number
  overview: string[]
  vocab: VocabTerm[]
  sections: ContentSection[]
  activities: BizLabActivity[]
  reflections: ReflectionPrompt[]
  submissions: SubmissionSpec[]
  /** InvestiCoins awarded for completing the part. */
  xp: number
}

// ── Shared reference content ───────────────────────────────────────────────

export const SHARK_TANK_OVERVIEW =
  "On Shark Tank, everyday entrepreneurs pitch their business ideas to a panel of wealthy investors called \"Sharks.\" If a Shark believes in the idea, they invest their own money in exchange for a slice of the company. Your mission this unit: build a business worth investing in — then pitch it to our classroom Sharks."

// A brainstorming starter list — a teen-focused sample of the "100 Problems
// for Teens" prompt used to spark business ideas.
export const PROBLEMS_FOR_TEENS: string[] = [
  "Forgetting homework or assignment due dates",
  "Losing AirPods, chargers, or earbuds",
  "Water bottles that leak inside backpacks",
  "Phone batteries dying during the school day",
  "Not knowing what to cook for an easy snack",
  "Tangled headphone and charger cords",
  "Procrastinating on big projects",
  "Hard to wake up on time in the morning",
  "Forgetting to drink enough water",
  "Backpacks that are too heavy and disorganized",
  "Boredom on long car or bus rides",
  "Trouble focusing while studying",
  "Stress and anxiety before tests",
  "Not enough time to eat a healthy breakfast",
  "Losing track of money / overspending",
  "Group projects where no one does their part",
  "Sports gear that smells bad in lockers",
  "Cracked or scratched phone screens",
  "Hard to find affordable, stylish clothes",
  "Acne and skincare confusion",
  "Difficulty making new friends at a new school",
  "Remembering passwords for everything",
  "Slow or dead phone storage from too many photos",
  "Messy dorm-style bedrooms",
  "Forgetting to charge devices overnight",
  "Boring or unhealthy school lunches",
  "Sunburn at outdoor practices and games",
  "Keeping plants or pets alive when busy",
  "Finding a part-time job as a teen",
  "Sharing rides / coordinating pickups with parents",
  "Staying motivated to exercise",
  "Recycling and reducing single-use plastic",
  "Saving money for big purchases",
  "Studying vocabulary for tests efficiently",
  "Keeping group chats organized",
  "Finding volunteer or community-service hours",
  "Remembering to take medications or vitamins",
  "Dorm/locker space that's too small to organize",
  "Phones overheating while gaming or charging",
  "Hard to find healthy snacks at school",
  "Forgetting reusable bags when shopping",
  "Pens and pencils that always go missing",
  "Glasses fogging up with masks or in the cold",
  "Sweaty palms before presentations",
  "Hard to study with a noisy household",
  "Tangled jewelry and accessories",
  "Shoes that get scuffed or dirty fast",
  "Not enough outlets to charge everything",
  "Bad posture from looking at phones all day",
  "Forgetting library books or returns",
  "Hard to split the bill with friends",
  "Keeping houseplants watered on schedule",
  "Losing the TV remote constantly",
  "Headphones that hurt after long wear",
  "Hard to find time to read for fun",
  "Forgetting to defrost food for dinner",
  "Messy phone photo libraries with duplicates",
  "Backpack straps that dig into shoulders",
  "Forgetting locker or bike-lock combinations",
  "Hard to stay off social media while studying",
  "Cold lunches with no way to reheat",
  "Wet sneakers after walking in the rain",
  "Dead pens you can't tell are empty until you write",
  "Hard to keep track of subscriptions and free trials",
  "Frustration learning a new language alone",
  "No easy way to sell or trade old textbooks",
  "Hard to remember everyone's birthday",
]

export const LOGO_PRINCIPLES = [
  { title: "Simple in design", detail: "Could a 7-year-old draw it from memory? The best logos are clean and uncluttered." },
  { title: "Memorable or impactful", detail: "It sticks in your mind after one glance — think of the Nike swoosh or Apple." },
  { title: "Timeless", detail: "It will still look good in 10 or 20 years, not just this year's trend." },
  { title: "Versatile or adaptable", detail: "It works big or small, in full color or one color, on a shirt or a screen." },
  { title: "Appropriate or relevant", detail: "It fits your industry and audience — playful for a toy brand, sleek for tech." },
]

export const WEBSITE_TRAITS = [
  { title: "Easy to Navigate", detail: "Visitors find what they need in a few clicks with clear menus." },
  { title: "Visual Design", detail: "Colorful, clean, and on-brand with consistent fonts and images." },
  { title: "Interactive & Engaging", detail: "Buttons, embedded video, and elements that invite people to explore." },
  { title: "Informative", detail: "Clearly answers what the product is, what it costs, and why it matters." },
  { title: "Branding", detail: "Your logo, colors, and voice appear consistently on every page." },
  { title: "Conversion", detail: "Guides visitors toward action — \"sell, sell, sell!\"" },
]

export const WEBSITE_PAGES = [
  {
    title: "Business Information",
    items: ["Company name", "Product name", "Slogan", "Owner names", "Business logo", "Mission statement (your philosophy/purpose)"],
  },
  {
    title: "Product Details",
    items: ["Clear description of the product or service", "Photos or videos of your prototype", "Pricing breakdown (cost to make, sell price, projected profit)"],
  },
  {
    title: "Business Plan / About",
    items: ["Manufacturing costs", "Market research (is your price reasonable?)", "Target consumers (age, gender, region)", "Competitors & what makes you better", "Startup costs and investment ask"],
  },
  {
    title: "Vision / Philosophy",
    items: ["Where will your company be in 10 or 20 years?", "Why should the Sharks invest in you?"],
  },
  {
    title: "Marketing / Commercial",
    items: ["Commercial, jingle, or creative pitch piece (embedded)", "Testimonials or customer stories (real or fictional)"],
  },
]

// ── Judge's scoring rubric (130 points total) ───────────────────────────────

export interface RubricCategory {
  name: string
  points: number
  criteria: string[]
}

export const RUBRIC: RubricCategory[] = [
  {
    name: "Product Development",
    points: 40,
    criteria: [
      "Product is unique and creative",
      "Has realistic market value",
      "Includes a working prototype or example",
      "Shows effort and originality",
    ],
  },
  {
    name: "Business Website",
    points: 40,
    criteria: [
      "Includes all required sections",
      "Well-organized and professional-looking",
      "Realistic figures and research-backed",
      "Engaging visuals and clear writing",
    ],
  },
  {
    name: "Presentation",
    points: 40,
    criteria: [
      "All group members speak and are well-prepared",
      "Demonstrates knowledge and confidence",
      "Creative, persuasive, and engaging pitch",
      "Marketing material is showcased",
    ],
  },
  {
    name: "Sharks' Scores",
    points: 10,
    criteria: ["Based on whether the Sharks want to invest", "Evaluates persuasiveness and marketability"],
  },
  {
    name: "Bonus",
    points: 5,
    criteria: ["Going above and beyond", "Extra creativity, high-quality materials, or unique ideas"],
  },
]

export const RUBRIC_TOTAL = RUBRIC.reduce((s, c) => s + c.points, 0) // 135 max incl. bonus

// ── Key dates (Mrs. Fortgang's timeline) ────────────────────────────────────

export interface KeyDate {
  id: string
  label: string
  day: "A Day" | "B Day"
  /** ISO date used by the countdown. */
  date: string
}

export const KEY_DATES: KeyDate[] = [
  { id: "soft-a", label: "Soft Pitches", day: "A Day", date: "2026-10-31" },
  { id: "soft-b", label: "Soft Pitches", day: "B Day", date: "2026-11-04" },
  { id: "final-a", label: "Final Shark Tank Presentation", day: "A Day", date: "2026-11-07" },
  { id: "final-b", label: "Final Shark Tank Presentation", day: "B Day", date: "2026-11-10" },
]

// ── Badges (milestone completions) ──────────────────────────────────────────

export interface BizBadge {
  id: string
  name: string
  description: string
  icon: string // lucide name
  /** Part id whose completion unlocks the badge, or "all" for the capstone. */
  unlockOn: string
}

export const BIZ_BADGES: BizBadge[] = [
  { id: "idea-spark", name: "Idea Spark", description: "Completed Part 1 — Introduction to Entrepreneurship", icon: "Lightbulb", unlockOn: "part-1" },
  { id: "plan-master", name: "Plan Master", description: "Completed Part 2 — Business Plan & Prototype", icon: "ClipboardList", unlockOn: "part-2" },
  { id: "brand-builder", name: "Brand Builder", description: "Completed Part 3 — Logo & Marketing", icon: "Palette", unlockOn: "part-3" },
  { id: "pitch-perfect", name: "Pitch Perfect", description: "Completed Part 4 — The Commercial", icon: "Clapperboard", unlockOn: "part-4" },
  { id: "web-architect", name: "Web Architect", description: "Completed Part 5 — The Website", icon: "Globe", unlockOn: "part-5" },
  { id: "shark-ready", name: "Shark Ready", description: "Completed Part 6 — Final prep. You're ready for the Tank!", icon: "Trophy", unlockOn: "part-6" },
  { id: "shark-champion", name: "Shark Tank Champion", description: "Finished the entire Gulliver Biz Lab unit", icon: "Crown", unlockOn: "all" },
]

// ════════════════════════════════════════════════════════════════════════
// THE 6 PARTS
// ════════════════════════════════════════════════════════════════════════

export const BIZ_LAB_PARTS: BizLabPart[] = [
  // ── PART 1 ────────────────────────────────────────────────────────────
  {
    id: "part-1",
    number: 1,
    title: "Introduction to Entrepreneurship",
    subtitle: "What makes a great business idea?",
    icon: "Lightbulb",
    accent: ["#0f2d1e", "#1D9E75"],
    estMinutes: 45,
    overview: [
      SHARK_TANK_OVERVIEW,
      "In this first part you'll learn the language of entrepreneurs, study how real businesses begin, and brainstorm problems worth solving. Every great company started with someone noticing a problem — your job is to find one you care about.",
    ],
    vocab: [
      { term: "Entrepreneur", definition: "A person who creates and runs a business.", example: "A teen who starts a phone-case business is an entrepreneur." },
      { term: "Sole Proprietorship", definition: "A business owned and operated by one person.", example: "A single student running a custom-sticker shop." },
      { term: "Business Partnership", definition: "A business owned and operated by two people.", example: "Two friends co-founding a tutoring service." },
      { term: "Invention", definition: "The creation of a product, or introducing a product for the first time.", example: "The first-ever smartphone was an invention." },
      { term: "Innovation", definition: "Significant changes and improvements made to an existing product.", example: "Adding a better camera and battery to a phone is innovation." },
      { term: "Startup", definition: "A newly created business venture.", example: "A brand-new app company looking for its first customers." },
    ],
    sections: [
      {
        heading: "What is Shark Tank?",
        body: SHARK_TANK_OVERVIEW,
        note: "Sharks invest real money for a percentage of the company (equity). The better your pitch and numbers, the better the deal you can get.",
      },
      {
        heading: "Invention vs. Innovation",
        body: "Not every business needs a brand-new invention. Many succeed by innovating — improving something that already exists.",
        bullets: [
          "Invention = something brand new to the world.",
          "Innovation = a meaningful improvement to an existing product or service.",
          "Most teen-friendly businesses are innovations — solving an old problem in a fresher, cheaper, or cooler way.",
        ],
      },
      {
        heading: "Start with a problem",
        body: "Great businesses solve real problems. Use the brainstorming list to spot frustrations in everyday teen life — the bigger the frustration, the bigger the opportunity.",
      },
    ],
    activities: [
      {
        id: "business-brainstorm",
        title: "Business Brainstorm",
        description: "As a group, scan the \"100 Problems for Teens\" list and brainstorm at least 5 problems you could turn into a business. Circle the one your team is most excited about.",
        format: "Group",
        steps: [
          "Read through the problems list together.",
          "Each member shares one problem they relate to most.",
          "List 5+ problems your group could solve.",
          "Vote on the single problem you'll build your business around.",
        ],
      },
    ],
    reflections: [
      { id: "p1-r1", prompt: "Which problem from the brainstorm stood out to you most, and why?" },
      { id: "p1-r2", prompt: "What qualities or skills are most important for entrepreneurs?" },
      { id: "p1-r3", prompt: "Why do you think some business ideas succeed while others fail?" },
    ],
    submissions: [
      {
        submissionType: "idea_selection",
        title: "Your Business Idea",
        description: "Lock in the problem your business will solve.",
        fields: [
          { key: "problem", label: "The problem you're solving", type: "textarea", placeholder: "Describe the problem and who has it." },
          { key: "idea", label: "Your idea for solving it", type: "textarea", placeholder: "Early thoughts — this can change later!" },
        ],
        xp: 100,
      },
    ],
    xp: 150,
  },

  // ── PART 2 ────────────────────────────────────────────────────────────
  {
    id: "part-2",
    number: 2,
    title: "The Business Plan & Prototype",
    subtitle: "Turn your idea into a real plan",
    icon: "ClipboardList",
    accent: ["#1a2a6c", "#2563eb"],
    estMinutes: 90,
    overview: [
      "A great idea needs a plan. In this part you'll craft a 30–60 second elevator pitch, research your market, work out your numbers, and build a prototype of your product.",
      "Investors don't just buy ideas — they buy plans they believe in. The clearer your plan, the more confident your Sharks will feel.",
    ],
    vocab: [
      { term: "Business Plan", definition: "A formal document outlining goals, strategies, and operational details.", example: "A roadmap showing what you'll sell, to whom, and how you'll profit." },
      { term: "Target Audience", definition: "Who will use or buy the product (their age, interests, and characteristics).", example: "Teens aged 13–17 who play sports." },
      { term: "Market Research", definition: "Gathering information about potential customers and competitors.", example: "Surveying classmates about what they'd pay for your product." },
      { term: "Financials", definition: "The numbers showing how a business will make money.", example: "Price, costs, and projected profit." },
      { term: "Prototype", definition: "An early sample or model of a product.", example: "A cardboard mock-up of your invention." },
      { term: "Elevator Pitch", definition: "A short, persuasive speech (30 seconds to 1 minute) about your business idea.", example: "A quick hook you could deliver during a short elevator ride." },
    ],
    sections: [
      {
        heading: "The Elevator Pitch",
        body: "Describe your idea in a few clear sentences. A strong elevator pitch explains what the business is, why it's valuable, and what makes it unique — all in under a minute.",
        bullets: ["What is the business?", "Why is it valuable?", "What makes it different from everything else?"],
      },
      {
        heading: "Market Research",
        body: "Smart founders know their competition. Research similar products, find their strengths and weaknesses, and figure out your advantage.",
      },
      {
        heading: "Financials",
        body: "Profit is what's left after costs. Profit = Revenue − Costs. Know your price, your costs, and your projected profit.",
        note: "Profit = (Price × Units Sold) − Total Costs. Investors love founders who know their numbers.",
      },
      {
        heading: "Build a Prototype",
        body: "Choose ONE way to bring your product to life:",
        bullets: [
          "Option A — Draw a detailed, labeled sketch on paper (materials & measurements).",
          "Option B — Build a physical prototype (cardboard, paper, popsicle sticks, tape).",
          "Option C — Create a 3D rendering in TinkerCAD.",
        ],
      },
    ],
    activities: [
      {
        id: "feedback-frenzy",
        title: "Feedback Frenzy",
        description: "Pair up. One person pitches for 45 seconds while the other listens, then swap and give 45 seconds of feedback. Repeat with a new partner.",
        format: "Pairs",
        timerSeconds: 45,
        steps: [
          "Find a partner.",
          "Partner A pitches for 45 seconds.",
          "Partner B gives 45 seconds of feedback.",
          "Swap roles, then rotate to a new partner.",
        ],
      },
      {
        id: "prototype-build",
        title: "Prototype Creation",
        description: "Pick Option A, B, or C and create the first version of your product. Photograph it for your submission.",
        format: "Individual or Group",
      },
    ],
    reflections: [
      { id: "p2-r1", prompt: "What was the most challenging or rewarding part of creating your prototype?" },
      { id: "p2-r2", prompt: "What feedback did you apply to improve your pitch or plan?" },
      { id: "p2-r3", prompt: "What have you learned about entrepreneurship that you didn't know before?" },
    ],
    submissions: [
      {
        submissionType: "elevator_pitch",
        title: "Elevator Pitch",
        description: "Write your 30–60 second pitch.",
        fields: [
          { key: "pitch", label: "Your elevator pitch", type: "textarea", placeholder: "What it is, why it's valuable, what makes it unique...", help: "Aim for something you can say in under a minute." },
        ],
        xp: 100,
      },
      {
        submissionType: "business_plan",
        title: "Business Plan",
        description: "Answer the core business-plan questions.",
        fields: [
          { key: "companyName", label: "Name of your product or company", type: "text" },
          { key: "origin", label: "How did you come up with this idea?", type: "textarea" },
          { key: "problemSolved", label: "What problem does your product solve? Key features?", type: "textarea" },
          { key: "competitors", label: "Are there similar products? Their strengths & weaknesses?", type: "textarea" },
          { key: "advantage", label: "What advantage will your company have over competitors?", type: "textarea" },
          { key: "slogan", label: "Catchy slogan for your company", type: "text" },
          { key: "targetAudience", label: "Target audience (age, interests, characteristics)", type: "textarea" },
          { key: "advertising", label: "How will you advertise your product?", type: "textarea" },
          { key: "price", label: "How much will you sell your product for?", type: "text" },
          { key: "costs", label: "What costs are associated with making it?", type: "textarea" },
          { key: "profit", label: "Projected profit — how much will you make, and how is profit calculated?", type: "textarea" },
        ],
        xp: 150,
      },
      {
        submissionType: "prototype",
        title: "Prototype",
        description: "Submit a photo or link to your prototype (sketch, physical build, or TinkerCAD design).",
        fields: [
          { key: "option", label: "Which option did you choose? (A / B / C)", type: "text" },
          { key: "description", label: "Describe your prototype (materials, measurements, features)", type: "textarea" },
          { key: "photos", label: "Photo / image links", type: "url-list", help: "Paste links to photos (Google Drive, Photos, etc.) — one per line." },
        ],
        linkField: { key: "designLink", label: "TinkerCAD or design link (optional)", placeholder: "https://www.tinkercad.com/..." },
        xp: 150,
      },
    ],
    xp: 250,
  },

  // ── PART 3 ────────────────────────────────────────────────────────────
  {
    id: "part-3",
    number: 3,
    title: "The Logo & Marketing Material",
    subtitle: "Build a brand people remember",
    icon: "Palette",
    accent: ["#7c2d12", "#ea580c"],
    estMinutes: 60,
    overview: [
      "Your brand is how the world recognizes you. In this part you'll define your brand's \"vibe,\" design a logo, and create marketing mockups that make your product pop.",
      "A strong logo and consistent branding make a tiny startup look like a real company — and that builds trust with customers and Sharks alike.",
    ],
    vocab: [
      { term: "Logo", definition: "A symbol or design that identifies a brand at a glance.", example: "The golden arches instantly mean McDonald's." },
      { term: "Branding", definition: "The overall look, feel, and personality of a company.", example: "Colors, fonts, voice, and logo working together." },
      { term: "Marketing Material", definition: "Designed items that promote your product.", example: "T-shirts, flyers, business cards, social posts." },
      { term: "Mockup", definition: "A realistic preview of how a design will look on a real product.", example: "Your logo shown on a water bottle." },
    ],
    sections: [
      {
        heading: "5 Characteristics of a Good Logo",
        body: "Keep these five traits in mind as you design:",
        bullets: LOGO_PRINCIPLES.map(p => `${p.title} — ${p.detail}`),
      },
      {
        heading: "Describe Your Vibe",
        body: "Before you sketch, brainstorm the personality of your brand: adjectives, colors, fonts, and symbols that capture who you are.",
      },
      {
        heading: "From Sketch to Canva",
        body: "Sketch a few logo ideas on paper first. Then design your favorite in Canva — modify a template to make it unique, and export a PNG with a transparent background.",
      },
      {
        heading: "Marketing Mockups",
        body: "Create 3 marketing material mockups using your logo — for example a t-shirt, water bottle, flyer, business card, or social media post.",
      },
    ],
    activities: [
      {
        id: "vibe-brainstorm",
        title: "Logo \"Vibe\" Brainstorming",
        description: "Brainstorm the adjectives, colors, fonts, and symbols that describe your brand's personality.",
        format: "Individual or Group",
      },
      {
        id: "logo-design",
        title: "Design Your Logo",
        description: "Sketch ideas on paper, then build the final version in Canva and export a transparent PNG.",
        format: "Individual",
      },
    ],
    reflections: [
      { id: "p3-r1", prompt: "Why did you choose these colors, fonts, and symbols for your logo?" },
      { id: "p3-r2", prompt: "How does your logo reflect your company's purpose and vibe?" },
      { id: "p3-r3", prompt: "How did you design your marketing materials to appeal to your target audience?" },
    ],
    submissions: [
      {
        submissionType: "logo",
        title: "Logo & Brand Vibe",
        description: "Submit your brand vibe and logo design.",
        fields: [
          { key: "adjectives", label: "Brand adjectives", type: "text", placeholder: "e.g. bold, playful, eco-friendly" },
          { key: "colors", label: "Colors", type: "text" },
          { key: "fonts", label: "Fonts", type: "text" },
          { key: "symbols", label: "Symbols / imagery", type: "text" },
          { key: "logoLinks", label: "Logo image links (PNG)", type: "url-list", help: "Paste links to your logo files — one per line." },
          { key: "mockups", label: "3 marketing mockup links", type: "url-list", help: "T-shirt, flyer, social post, etc. — one link per line." },
        ],
        xp: 150,
      },
    ],
    xp: 200,
  },

  // ── PART 4 ────────────────────────────────────────────────────────────
  {
    id: "part-4",
    number: 4,
    title: "The Pitch (Commercial)",
    subtitle: "Film a 30–60 second commercial",
    icon: "Clapperboard",
    accent: ["#581c87", "#a855f7"],
    estMinutes: 120,
    overview: [
      "Now bring your product to life on screen. You'll brainstorm, script, storyboard, film, and edit a 30–60 second commercial that sells your idea.",
      "A great commercial grabs attention fast, explains the benefit clearly, and ends with a call to action that makes people want to buy.",
    ],
    vocab: [
      { term: "Commercial", definition: "A short video advertisement that promotes a product.", example: "A 30-second ad you'd see between videos." },
      { term: "Script", definition: "The written words and directions for your video.", example: "Every line your narrator says." },
      { term: "Storyboard", definition: "Sketches of each scene that map out your video before filming.", example: "4–6 boxes showing each shot." },
      { term: "Call to Action", definition: "A statement telling viewers what to do next.", example: "\"Shop now!\" or \"Buy it today!\"" },
      { term: "Voiceover", definition: "Recorded narration played over video footage.", example: "Your voice describing the product while clips play." },
      { term: "B-roll", definition: "Extra supporting footage that makes a video richer.", example: "Close-up clips of the product in use." },
    ],
    sections: [
      {
        heading: "Commercial Requirements",
        bullets: [
          "Length: 30–60 seconds",
          "Clearly describes your product",
          "Has a beginning, middle, and end",
          "Includes your voice (on-camera or voiceover)",
          "Includes your logo & text",
        ],
      },
      {
        heading: "Step 1 — Brainstorm Ideas",
        body: "List 3 important facts about your product (what it does, cost, what people need to know). Then describe the problem it solves and how it improves lives.",
      },
      {
        heading: "Step 2 — Script Outline",
        bullets: [
          "Intro: Grab attention — ask a question or evoke emotion. e.g. \"Don't you hate it when…\"",
          "Body: Explain your product, its benefits, and how it solves the problem.",
          "Call to Action: End with an action statement like \"Shop now\" or \"Buy it now.\"",
        ],
      },
      {
        heading: "Step 3 — Write the Full Script",
        body: "Write your complete script (or share a Google Doc link to it).",
      },
      {
        heading: "Step 4 — Storyboard",
        body: "Fold paper into 4–6 sections and sketch each scene. Photograph it and include it in your submission.",
      },
      {
        heading: "Step 5 & 6 — Film & Edit",
        bullets: [
          "Film with any device using a variety of shots and angles — OR use stock footage in WeVideo with a voiceover.",
          "Edit in WeVideo: experiment with audio, voiceover, music, titles, b-roll, and transitions.",
          "Add your footage to Google Drive from your phone, and use WeVideo Academy resources for help.",
          "Include your logo.",
        ],
      },
      {
        heading: "Step 7 — Submit",
        body: "Save to Google Drive from WeVideo and paste your video link below.",
      },
    ],
    activities: [
      {
        id: "storyboard",
        title: "Commercial Storyboard",
        description: "Fold paper into 4–6 panels and sketch every scene of your commercial before filming.",
        format: "Individual or Group",
      },
      {
        id: "film-edit",
        title: "Film & Edit",
        description: "Shoot your footage and edit it together in WeVideo. Add titles, music, and your logo.",
        format: "Group",
      },
    ],
    reflections: [
      { id: "p4-r1", prompt: "What was the hardest part of filming or editing, and how did you solve it?" },
      { id: "p4-r2", prompt: "How does your commercial grab attention in the first few seconds?" },
      { id: "p4-r3", prompt: "What makes your call to action persuasive?" },
    ],
    submissions: [
      {
        submissionType: "commercial",
        title: "Commercial",
        description: "Submit your script, storyboard, and final video link.",
        fields: [
          { key: "facts", label: "3 essential facts about your product", type: "textarea" },
          { key: "script", label: "Your script (or Google Doc link)", type: "textarea" },
          { key: "storyboard", label: "Storyboard photo links", type: "url-list", help: "One link per line." },
        ],
        linkField: { key: "videoLink", label: "Commercial video link", placeholder: "https://drive.google.com/... or YouTube link", embed: true },
        xp: 200,
      },
    ],
    xp: 250,
  },

  // ── PART 5 ────────────────────────────────────────────────────────────
  {
    id: "part-5",
    number: 5,
    title: "The Website",
    subtitle: "Build your company's online home",
    icon: "Globe",
    accent: ["#134e4a", "#14b8a6"],
    estMinutes: 120,
    overview: [
      "Your website is where everything comes together — your product, pricing, story, and commercial. You'll build a 5+ page site in Google Sites and publish it for the world (and the Sharks).",
      "Keep it creative, colorful, and neat. Use images and short bullet points instead of long paragraphs — visitors skim, they don't read.",
    ],
    vocab: [
      { term: "Website", definition: "A set of connected web pages for your business.", example: "Your company's online home." },
      { term: "Navigation", definition: "The menu and links that help visitors move around a site.", example: "A top menu linking to each page." },
      { term: "Mission Statement", definition: "A short statement of your company's purpose and philosophy.", example: "\"We make hydration effortless for student athletes.\"" },
      { term: "Conversion", definition: "Turning a visitor into a customer or believer.", example: "A clear \"Buy Now\" button that drives sales." },
      { term: "Embed", definition: "Placing content like a video directly inside a web page.", example: "Your commercial playing right on the site." },
    ],
    sections: [
      {
        heading: "6 Characteristics of a Successful Website",
        bullets: WEBSITE_TRAITS.map(t => `${t.title} — ${t.detail}`),
      },
      {
        heading: "Website Requirements",
        bullets: [
          "At least 5 pages",
          "Company name & logo",
          "Explain what your product is, does, and what problem it solves",
          "Include your commercial (embedded video)",
          "Display the price of your product",
          "About the owner(s) — how/why you came up with the idea",
          "Creative, colorful & neat; images and short bullets over long paragraphs",
        ],
      },
      {
        heading: "Required Pages (minimum)",
        bullets: WEBSITE_PAGES.map(p => `${p.title}: ${p.items.join(", ")}`),
      },
      {
        heading: "Platform & Publishing",
        body: "Build your site in Google Sites. When it's ready, click \"Publish,\" then paste your published site link below.",
      },
    ],
    activities: [
      {
        id: "build-website",
        title: "Website Creation & Publication",
        description: "Build all required pages in Google Sites, embed your commercial, then publish and grab your link.",
        format: "Group",
      },
    ],
    reflections: [
      { id: "p5-r1", prompt: "Which of the 6 website characteristics is your site strongest at, and which needs work?" },
      { id: "p5-r2", prompt: "How did you make your site easy to navigate?" },
      { id: "p5-r3", prompt: "What part of your website are you most proud of?" },
    ],
    submissions: [
      {
        submissionType: "website",
        title: "Website",
        description: "Publish your Google Site and submit the link.",
        fields: [
          { key: "missionStatement", label: "Mission statement", type: "textarea" },
          { key: "pagesIncluded", label: "Which pages did you include?", type: "textarea" },
        ],
        linkField: { key: "siteLink", label: "Published website link", placeholder: "https://sites.google.com/view/..." },
        xp: 200,
      },
    ],
    xp: 250,
  },

  // ── PART 6 ────────────────────────────────────────────────────────────
  {
    id: "part-6",
    number: 6,
    title: "Final Activities & Shark Tank Presentation",
    subtitle: "Prepare to face the Sharks",
    icon: "Trophy",
    accent: ["#831843", "#ec4899"],
    estMinutes: 90,
    overview: [
      "This is it — time to bring everything together and pitch to the Sharks. Review the timeline, study the scoring rubric, and rehearse your presentation until it's sharp.",
      "Your final pitch should be persuasive, have a clear beginning and close, introduce your team, state your mission and vision, and ask for financial backing.",
    ],
    vocab: [
      { term: "Soft Pitch", definition: "A practice pitch to get feedback before the real thing.", example: "Your first run-through in front of the class." },
      { term: "Equity", definition: "A share of ownership in a company.", example: "Giving a Shark 10% of your business for their investment." },
      { term: "Investment Ask", definition: "The amount of money you request from investors and what they get in return.", example: "\"We're asking for $500 for 15% of the company.\"" },
      { term: "Vision", definition: "Where you see your company in the future.", example: "\"In 10 years we'll be in every school store.\"" },
    ],
    sections: [
      {
        heading: "Timeline",
        bullets: [
          "Soft Pitches: 10/31 (A Day) or 11/4 (B Day)",
          "Final Shark Tank Presentation: 11/7 (A Day) or 11/10 (B Day)",
        ],
        note: "Use the countdown above to stay on track for both dates.",
      },
      {
        heading: "Judge's Sheet Criteria",
        bullets: [
          "Persuasive entry with a defined beginning",
          "Contestants introduce themselves",
          "Clearly stated opinion / value proposition",
          "Mission and vision if funding is received",
          "Logical order with a defined close",
          "Team asks for financial backing",
          "Handles post-pitch questions on purpose, mission/vision, cost, and methods",
        ],
      },
      {
        heading: "Scoring Rubric (130 points)",
        bullets: RUBRIC.map(r => `${r.name} — ${r.points} pts`),
        note: "Product 40 · Website 40 · Presentation 40 · Sharks 10 · Bonus 5",
      },
    ],
    activities: [
      {
        id: "presentation-prep",
        title: "Final Shark Tank Presentation Prep",
        description: "Rehearse your full pitch as a team. Make sure every member speaks, you state your investment ask, and you can answer tough Shark questions.",
        format: "Group",
        steps: [
          "Assign speaking parts so everyone presents.",
          "Open with a persuasive hook.",
          "Cover product, market, financials, and your ask.",
          "Practice answering questions on cost, mission, and methods.",
          "Time it and tighten your close.",
        ],
      },
    ],
    reflections: [
      { id: "p6-r1", prompt: "What are you most confident about going into your pitch, and what are you still nervous about?" },
      { id: "p6-r2", prompt: "If a Shark asks 'Why should I invest in you?', what's your answer?" },
      { id: "p6-r3", prompt: "Looking back across the whole unit, what are you most proud of building?" },
    ],
    submissions: [
      {
        submissionType: "final_pitch",
        title: "Final Pitch Plan",
        description: "Lock in your investment ask and pitch roles.",
        fields: [
          { key: "investmentAsk", label: "Your investment ask (amount & equity %)", type: "text", placeholder: "e.g. $500 for 15%" },
          { key: "mission", label: "Mission & vision", type: "textarea" },
          { key: "roles", label: "Who is presenting which part?", type: "textarea" },
        ],
        xp: 150,
      },
    ],
    xp: 300,
  },
]

export const TOTAL_BIZ_LAB_XP = BIZ_LAB_PARTS.reduce(
  (sum, p) => sum + p.xp + p.submissions.reduce((s, sub) => s + sub.xp, 0),
  0,
)

export function getPart(id: string): BizLabPart | undefined {
  return BIZ_LAB_PARTS.find(p => p.id === id)
}
