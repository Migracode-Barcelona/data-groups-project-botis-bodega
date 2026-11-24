// 🤖 BOTI'S BRAIN — week 2
//
// Same game, new level. Every skill is a function in this file,
// every quest lives in QUESTS.md, every order from Doña Carmen is
// a test in skills.test.js.
//
// HOW TO PLAY:
//   1. Pick a quest in QUESTS.md (start at the top)
//   2. Run the diagnostics:   npm run week2
//   3. Write the code here until the tests go green
//   4. Open simulator/index.html and run a shift
//
// 🗣️ Rule of the game: never edit the tests.

// ---------------------------------------------------------------
// 📖 QUEST 1 — Read the ledger                                15 XP
// ---------------------------------------------------------------
// Carmen's ledger has ONE line per product. Boti must find lines.
//
// Given an array of products and a product name
// When we call getProduct with them
// Then we get the product object with that name.
// If no product has that name, we get undefined.
function getProduct(products, name) {
  // 🤖 TODO: Quest 1
}

// ---------------------------------------------------------------
// 🏷️ QUEST 2 — Price check                                    15 XP
// ---------------------------------------------------------------
// "How much is the tortilla?" Boti must answer fast.
//
// Given an array of products and a product name
// When we call getPrice with them
// Then we get that product's price.
// If the product doesn't exist, we get undefined.
//
// 💡 Carmen's rule: never repeat yourself. You already wrote a
//    function that finds the product... use it!
function getPrice(products, name) {
  // 🤖 TODO: Quest 2
}

// ---------------------------------------------------------------
// 😤 QUEST 3 — The picky customer                              20 XP
// ---------------------------------------------------------------
// Ramon 👓 asks for churros. The ledger says churros have stock 0.
// "In stock" means the product EXISTS and its stock is BIGGER
// THAN ZERO. Both conditions!
//
// Given an array of products and a product name
// When we call isInStock with them
// Then we get true if the product exists and stock > 0,
// and false in every other case.
//
// ⚠️ Careful: asking a product that doesn't exist for its stock
// is a 💥 TypeError crash — check for undefined first!
function isInStock(products, name) {
  // 🤖 TODO: Quest 3
}

// ---------------------------------------------------------------
// 🛒 QUEST 4 — Basket run                                      25 XP
// ---------------------------------------------------------------
// Marta arrives with a basket: an array of product NAMES.
// Boti must total it up.
//
// Given an array of products and an array of basket names
// When we call getBasketTotal with them
// Then we get the sum of the prices of those products.
// (An empty basket totals 0. You've summed arrays before —
// this week the accumulator grabs a price from each object.)
function getBasketTotal(products, basket) {
  // 🤖 TODO: Quest 4
}

// ---------------------------------------------------------------
// 💸 QUEST 5a — Happy hour                                     20 XP
// ---------------------------------------------------------------
// SALE TIME. Carmen wants the REAL jar's price changed — the
// ledger, the price tag, the whole shop should show the new
// price. This time mutation is not a bug. It's the FEATURE.
//
// Given a product object and a percent (like 50 for 50%)
// When we call applyDiscount with them
// Then the product's price property is updated to the
// discounted price (price minus the discount), and the SAME
// product object is returned.
//
// 💡 The discounted price of a €4.50 bocadillo at 50% is €2.25.
function applyDiscount(product, percent) {
  // 🤖 TODO: Quest 5a
}

// ---------------------------------------------------------------
// 🎟️ QUEST 5b — The coupon                                    25 XP
// ---------------------------------------------------------------
// El MegaMercado mails out coupons. A coupon is a COPY of a
// product with the discounted price — the real product in the
// ledger must NOT change. Opposite of Quest 5a!
//
// Given a product object and a percent
// When we call makeDiscountedCopy with them
// Then we get a NEW object with the same name, price
// (discounted), stock, emoji and category — and the original
// product must stay exactly as it was.
//
// 💡 You build a new object with { key: value, ... } — you
//    choose every property it gets. There is no copy machine
//    in here; you are the copy machine.
function makeDiscountedCopy(product, percent) {
  // 🤖 TODO: Quest 5b
}

// ---------------------------------------------------------------
// 🔎 QUEST 6 — The search bar                                  25 XP
// ---------------------------------------------------------------
// El MegaMercado's website has search URLs like
//   ...?category=drinks&max=2
// Carmen wants the same for the bodega. The query string part
// is "category=drinks&max=2" — and you ALREADY met this exact
// problem in your prep (parseQueryString). Same skill, new shop.
//
// Given a query string like "category=drinks&max=2"
// When we call parseShopQuery with it
// Then we get an object: { category: "drinks", max: "2" }
// An empty query string gives an empty object {}.
//
// ⚠️ The tricky bit you met in prep: to store a property whose
// name is inside a VARIABLE, you need square brackets:
//   queryParams[key] = value;   // NOT queryParams.key = value;
function parseShopQuery(queryString) {
  // 🤖 TODO: Quest 6
}

// ---------------------------------------------------------------
// 🧹 QUEST 7 — Tidy the shelves                                20 XP
// ---------------------------------------------------------------
// "Only drinks on the front shelf, please."
//
// Given an array of products and a category
// When we call filterByCategory with them
// Then we get a NEW array containing only the products whose
// category matches. The original array stays unchanged.
function filterByCategory(products, category) {
  // 🤖 TODO: Quest 7
}

// ---------------------------------------------------------------
// 🏆 QUEST 8a — BOSS part 1: the cheapest thing                20 XP
// ---------------------------------------------------------------
// Big Tony 💪 is on a budget. He wants the cheapest product
// in the whole shop.
//
// Given an array of products
// When we call getCheapestProduct with it
// Then we get the product object with the lowest price.
// (You met this in prep: getCheapest for books.)
function getCheapestProduct(products) {
  // 🤖 TODO: Quest 8a
}

// ---------------------------------------------------------------
// 🏆 QUEST 8b — BOSS part 2: The MegaMercado audit             30 XP
// ---------------------------------------------------------------
// MegaMercado sent a SPY 🕵️ to see the bodega's numbers. Show
// them! Carmen wants a business report, built as ONE object.
//
// Given an array of products
// When we call makeReport with it
// Then we get an object with:
//   itemCount  — the number of products
//   totalValue — the sum of every product's price × stock
//   cheapest   — the NAME of the cheapest product
//
// Example: for 3 products (agua €0.75 ×4, tortilla €3.25 ×2,
// croissant €1.75 ×6) the report is
//   { itemCount: 3, totalValue: 20, cheapest: "agua" }
//
// Boss rules apply: old moves only. Which two quests does this
// one reuse? (Yes, you may call your own functions.)
function makeReport(products) {
  // 🤖 TODO: Quest 8b
}

// ---------------------------------------------------------------
// 🌈 SIDE QUESTS — optional, never block week 3
// ---------------------------------------------------------------

// 🧊 SIDE QUEST — Deep freeze                        15 XP
// Carmen checks the freezer every morning.
//
// Given an array of products
// When we call getOutOfStock with it
// Then we get a NEW array with the NAMES of every product
// whose stock is 0.
function getOutOfStock(products) {
  // 🤖 TODO: Side quest — see lab.test.js
}

// 🧾 SIDE QUEST — Receipt printer                     20 XP
// Carmen wants pretty receipts for customers.
//
// Given an array of products and an array of basket names
// When we call printReceipt with them
// Then we get a string built like this:
//   one line per product: "tortilla — €3.25"
//   then "TOTAL: €" + the total
//   then a last line: "gràcies! 🤖"
//
// 💡 toFixed(2) turns a number into a string with exactly two
//    decimals: (3.25).toFixed(2) is "3.25". Perfect for money.
function printReceipt(products, basket) {
  // 🤖 TODO: Side quest — see lab.test.js
}

// ⭐ MEGA SIDE QUEST — Customer profiles             40 XP
// Customers have profiles now too: objects with a name, a
// budget and a favoriteCategory.
//
// canAfford: given a customer and a product, return true if
//   the product's price fits the budget AND the product is
//   in stock — false otherwise.
//
// recommendFor: given a customer and an array of products,
//   return a NEW array with only the products from the
//   customer's favoriteCategory that they can afford.
//
// No tests are provided for these two — you're the boss now.
// Verify in the simulator (it checks!), or write your own tests
// in lab.test.js. 😎
function canAfford(customer, product) {
  // 🤖 TODO: Mega side quest
}

function recommendFor(customer, products) {
  // 🤖 TODO: Mega side quest
}

// ✨ Boti's USB port — do not edit below this line.
if (typeof module !== "undefined") {
  module.exports = {
    getProduct,
    getPrice,
    isInStock,
    getBasketTotal,
    applyDiscount,
    makeDiscountedCopy,
    parseShopQuery,
    filterByCategory,
    getCheapestProduct,
    makeReport,
    getOutOfStock,
    printReceipt,
    canAfford,
    recommendFor,
  };
}
