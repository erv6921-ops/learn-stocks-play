// Introduction to Business vocabulary for Gulliver Intro students. These terms
// are highlighted in green inside Jeff's lessons (see src/lib/highlightTerms)
// and collected in the Vocab glossary on the Missions screen. The `chapter`
// number is where the term is introduced in the course textbook.

export interface VocabWord {
  term: string;
  chapter: number;
  definition: string;
}

// Kept in the textbook's order of introduction. `term` is matched
// case-insensitively on word boundaries when highlighting lesson text.
export const INTRO_VOCAB: VocabWord[] = [
  { term: "Business", chapter: 3, definition: "Any activity or organization that provides goods or services to earn a profit." },
  { term: "Goods", chapter: 3, definition: "Physical, tangible products people can buy, like phones, food, or clothing." },
  { term: "Services", chapter: 3, definition: "Intangible products — work done for others that you can't hold — like haircuts, education, or streaming." },
  { term: "Entrepreneur", chapter: 3, definition: "A person who takes on the risk of starting and running a business in the hope of earning a profit." },
  { term: "Revenue", chapter: 3, definition: "The total amount of money a business takes in from selling its goods and services." },
  { term: "Profit", chapter: 3, definition: "The money a business has left after subtracting all of its costs and expenses from its revenue." },
  { term: "Loss", chapter: 3, definition: "What happens when a business spends more money than it earns in revenue." },
  { term: "Risk", chapter: 4, definition: "The chance a business takes of losing time and money on something that may not pay off." },
  { term: "Stakeholders", chapter: 4, definition: "All the people who have a stake in an organization — customers, employees, owners, suppliers, and the community." },
  { term: "Standard of living", chapter: 4, definition: "The amount of goods and services people can buy with the money they have." },
  { term: "Quality of life", chapter: 4, definition: "The general well-being of a society — freedom, health, safety, education, and the environment — not just money." },
  { term: "Outsourcing", chapter: 5, definition: "Contracting with other companies, often in other countries, to do some of a firm's work instead of doing it in-house." },
  { term: "Nonprofit organization", chapter: 6, definition: "An organization whose goals do not include making a personal profit for its owners; it serves a social or public purpose." },
  { term: "Factors of production", chapter: 7, definition: "The resources used to create goods and services — land, labor, capital, entrepreneurship, and knowledge." },
  { term: "Business environment", chapter: 8, definition: "The surrounding factors — economic, technological, competitive, social, and legal/global — that affect how a business operates." },
  { term: "Technology", chapter: 10, definition: "Tools, machines, and especially information technology like computers and the internet that help businesses work more efficiently." },
  { term: "Productivity", chapter: 11, definition: "The amount of output produced compared with the resources, like labor and time, used to make it." },
  { term: "Database", chapter: 12, definition: "An organized electronic collection of information a business uses to store and quickly find data about customers, products, and sales." },
  { term: "E-commerce", chapter: 12, definition: "The buying and selling of goods and services online over the internet." },
  { term: "Identity theft", chapter: 12, definition: "Stealing someone's personal information, such as their name or credit card number, to commit fraud." },
  { term: "Demography", chapter: 13, definition: "The study of a population's characteristics — age, race, income, and location — used to understand customers." },
  { term: "Empowerment", chapter: 13, definition: "Giving employees the authority and responsibility to make decisions on their own without waiting for a manager's approval." },
  { term: "Climate change", chapter: 17, definition: "Long-term shifts in temperatures and weather patterns, largely driven by human activity, that businesses must respond to." },
  { term: "Greening", chapter: 17, definition: "Making business practices more environmentally friendly to reduce harm to the planet." },
];

// Fast lookup by lowercased term, for the highlighter's popover content.
export const VOCAB_BY_TERM: Map<string, VocabWord> = new Map(
  INTRO_VOCAB.map(v => [v.term.toLowerCase(), v]),
);

// A single case-insensitive regex that matches any vocab term on word
// boundaries. Terms are sorted longest-first so multi-word terms (e.g.
// "Business environment") win over their shorter substrings ("Business").
function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
const sortedTerms = [...INTRO_VOCAB]
  .map(v => v.term)
  .sort((a, b) => b.length - a.length)
  .map(escapeRegex);
export const VOCAB_REGEX = new RegExp(`\\b(${sortedTerms.join("|")})\\b`, "gi");
