// 🌈 BOTI'S SIDE-QUEST LAB — week 1
//
// This file is YOURS. It is the one place where you may write
// and edit tests — in the core quests, the tests are Doña
// Carmen's orders and must never be edited. Here, you're the boss. 🧪
//
// The tests below are switched off (commented out). When you
// start a side quest, remove the // and make them pass!
// When you uncomment a test that uses a side-quest skill,
// uncomment the require line too — it connects the lab to
// Boti's brain:
//
// const { pickMysteryItem } = require("./skills");
//
// This first one always passes — it just proves your lab runs.

test("🌈 the lab is open", () => {
  expect(true).toEqual(true);
});

// ---------------------------------------------------------------
// 🌸 SIDE QUEST — Mystery box
// ---------------------------------------------------------------
// Boti keeps ONE "mystery item" behind the counter. Because it's
// random, we can't test WHICH item comes out — but we can test
// that the answer is one of the items! That's a testing superpower:
// sometimes you don't test for one exact value, you test that the
// value belongs to a set of okay values.
//
// toContain is a new matcher: it checks the received value is
// inside the array you give it.

// test("🌸 the mystery box always hides a real item from the list", () => {
//   const items = ["churros", "tortilla", "horchata", "olives"];
//   const mysteryItem = pickMysteryItem(items);
//   expect(items).toContain(mysteryItem);
// });

// ---------------------------------------------------------------
// 🧪 LAB — Write your own tests for countStock
// ---------------------------------------------------------------
// Doña Carmen has heard rumours that Boti's counting is shaky
// after lunch. She wants PROOF it works in the tricky cases.
// Write two more tests for countStock, in the same style as the
// tests in skills.test.js. Cover at least:
//   • a list where the item appears once
//   • ...your choice! What case would YOU worry about?

// test("🧪 lab: countStock works when the item appears once", () => {
//   expect(countStock(["tortilla", "churros"], "tortilla")).toEqual(1);
// });

// test("🧪 lab: my own tricky case for countStock", () => {
//   // your turn
// });

// ---------------------------------------------------------------
// ⭐ MEGA SIDE QUEST — Alphabetical shelves
// ---------------------------------------------------------------
// No test here on purpose: this one you verify yourself.
// Open QUESTS.md, follow the spec, and check with console.log —
// or write your own test right here. You know how now. 😎
