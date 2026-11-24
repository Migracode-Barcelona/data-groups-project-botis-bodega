// 🌈 BOTI'S SIDE-QUEST LAB — week 2
//
// Your lab. The one place you may write tests. The tests below
// are switched off — remove the // when you start a side quest.

test("🌈 the lab is open", () => {
  expect(true).toEqual(true);
});

// ---------------------------------------------------------------
// 🧊 SIDE QUEST — Deep freeze
// ---------------------------------------------------------------
// Carmen checks the freezer every morning: which products have
// stock 0? Uncomment this test when you implement getOutOfStock.

// const { getOutOfStock, printReceipt } = require("./skills");

// test("🧊 finds every product that is sold out", () => {
//   const freezer = [
//     { name: "helado", price: 2.5, stock: 0 },
//     { name: "churros", price: 2.5, stock: 0 },
//     { name: "tortilla", price: 3.25, stock: 4 },
//   ];
//   expect(getOutOfStock(freezer)).toEqual(["helado", "churros"]);
// });

// ---------------------------------------------------------------
// 🧾 SIDE QUEST — Receipt printer
// ---------------------------------------------------------------
// toContain works on strings too: it checks the string contains
// the snippet you give it. If the receipt contains BOTH the item
// lines and the total, the printer works. Run it and read the
// failure — the diff will show you exactly what's missing!

// test("🧾 the receipt has every item, the total and a goodbye", () => {
//   const ledger = [
//     { name: "tortilla", price: 3.25, stock: 4 },
//     { name: "agua", price: 0.75, stock: 24 },
//   ];
//   const receipt = printReceipt(ledger, ["tortilla", "agua"]);
//   expect(receipt).toContain("tortilla — €3.25");
//   expect(receipt).toContain("agua — €0.75");
//   expect(receipt).toContain("TOTAL: €4.00");
//   expect(receipt).toContain("gràcies! 🤖");
// });

// ---------------------------------------------------------------
// 🧪 LAB — Write the missing test
// ---------------------------------------------------------------
// Quest 5b has a test checking the ORIGINAL product never
// changes. Notice: makeReport (Q8b) takes the products array and
// builds a report from it. Write a test here proving makeReport
// doesn't change the products array it was given.
// Hint: look at the "stays exactly as it was" tests in
// skills.test.js — you've seen this shape three times now.

// test("🧪 lab: makeReport leaves the ledger untouched", () => {
//   // your turn
// });

// ---------------------------------------------------------------
// ⭐ MEGA SIDE QUEST — Customer profiles (canAfford / recommendFor)
// ---------------------------------------------------------------
// No tests provided. Write your own here, or trust the
// simulator's bonus panel. You know how to do this now. 😎
