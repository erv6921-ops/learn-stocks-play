import { test } from "node:test"
import assert from "node:assert/strict"
import { rankLessons, tokenize, stem, expandQuery, isMeaningfulQuery, type SearchableLesson } from "./lessonSearch.ts"

const LESSONS: SearchableLesson[] = [
  { id: "1.1", title: "Why Money Feels the Way It Does", description: "Emotions, habits and the psychology behind spending.", category: "psychology-of-money", unitTitle: "The Psychology of Money" },
  { id: "3.2", title: "Building a Budget", description: "The 50/30/20 rule and tracking expenses.", category: "budgeting", unitTitle: "Budgeting Mastery" },
  { id: "5.1", title: "How Savings Accounts Work", description: "APY, compounding, and why time matters.", category: "banking", unitTitle: "Banking Systems" },
  { id: "6.3", title: "Credit Scores Explained", description: "What goes into a score and how to build one.", category: "credit-debt", unitTitle: "Credit & Debt" },
  { id: "8.1", title: "What Is a Stock?", description: "Owning a share of a company.", category: "stocks", unitTitle: "Stocks Explained" },
  { id: "gen-1", title: "Reading Your First Paycheck", generated: true, keywords: ["Explain gross versus net pay", "Identify withholding on a pay stub"] },
]

test("stem folds common suffixes", () => {
  assert.equal(stem("investing"), "invest")
  assert.equal(stem("budgets"), "budget")
  assert.equal(stem("companies"), "company")
  assert.equal(stem("tax"), "tax")
  assert.equal(stem("taxes"), "tax")
  assert.equal(stem("expenses"), stem("expense"))
  assert.equal(stem("marketing"), "marketing")
  assert.equal(stem("plants"), "plant")
})

test("tokenize drops filler words", () => {
  assert.deepEqual(tokenize("I want to teach my students about budgeting"), ["budget"])
})

test("empty query lists everything in order", () => {
  const r = rankLessons(LESSONS, "   ")
  assert.equal(r.length, LESSONS.length)
  assert.equal(r[0].lesson.id, "1.1")
})

test("describing a topic finds the lesson without exact title wording", () => {
  const r = rankLessons(LESSONS, "how compound interest grows savings")
  assert.equal(r[0].lesson.id, "5.1")
})

test("synonyms map everyday phrasing onto curriculum vocabulary", () => {
  const r = rankLessons(LESSONS, "borrowing money and paying it back")
  assert.ok(r.some((x) => x.lesson.id === "6.3"), "credit lesson should surface for 'borrowing'")
  assert.ok(rankLessons(LESSONS, "spending plan").some((x) => x.lesson.id === "3.2"), "budget lesson should surface for 'spending plan'")
  const top = rankLessons(LESSONS, "a budget for a teenager")[0]
  assert.equal(top.lesson.id, "3.2")
})

test("generated lessons are searchable through their objectives", () => {
  const r = rankLessons(LESSONS, "gross vs net pay")
  assert.equal(r[0].lesson.id, "gen-1")
})

test("an unrelated topic returns nothing", () => {
  const r = rankLessons(LESSONS, "photosynthesis in plants")
  assert.equal(r.length, 0)
  assert.equal(isMeaningfulQuery("photosynthesis in plants"), true)
  assert.equal(isMeaningfulQuery("the a of"), false)
})

test("expandQuery adds related terms but never duplicates direct ones", () => {
  const { direct, related } = expandQuery("credit")
  assert.deepEqual(direct, ["credit"])
  assert.ok(related.includes("debt"))
  assert.ok(!related.includes("credit"))
})
