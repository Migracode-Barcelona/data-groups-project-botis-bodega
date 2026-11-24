// 🧠 SHOP LOGIC — week 3
//
// A web app has two kinds of code:
//
//   • LOGIC  (this file) — pure functions. Data in, data out.
//     No document, no events, no innerHTML. Jest tests these.
//
//   • GLUE   (script.js) — the DOM. querySelector, events,
//     innerHTML. Jest doesn't test the glue yet — we test what
//     feeds it: this file.
//
// Keeping them apart is the big idea of this week. The logic you
// write here gets checked by:   npm run week3
// The glue gets checked by your eyes in the browser.

// ---------------------------------------------------------------
// ✅ PROVIDED BY THE BODEGA — from week 2, tests already green.
// You don't need to touch these (but reading them is free).
// Notice: they are pure functions, so the website can reuse them.
// ---------------------------------------------------------------

function getProduct(products, name) {
  for (const product of products) {
    if (product.name === name) {
      return product;
    }
  }
  return undefined;
}

function filterByCategory(products, category) {
  const matches = [];
  for (const product of products) {
    if (product.category === category) {
      matches.push(product);
    }
  }
  return matches;
}

function getBasketTotal(products, basket) {
  let total = 0;
  for (const name of basket) {
    const price = getPrice(products, name);
    if (price !== undefined) {
      total += price;
    }
  }
  return total;
}

// Oh no — getBasketTotal above calls a getPrice that doesn't
// exist in this file yet! Add it here, from your week 2 brain
// (it was two lines with getProduct inside). The tests will
// tell you instantly if it's wrong.
function getPrice(products, name) {
  // 🤖 TODO: port your week 2 getPrice here
}

// ---------------------------------------------------------------
// 🏷️ QUEST 1a — Stock labels                                   10 XP
// ---------------------------------------------------------------
// The shelf cards need a little stock message.
//
// Given a product object
// When we call getStockLabel with it
// Then we get:
//   "SOLD OUT"          — if stock is 0
//   "only N left!"      — if stock is 3 or fewer (N = the stock)
//   "in stock"          — in every other case
function getStockLabel(product) {
  // 🤖 TODO: Quest 1a
}

// ---------------------------------------------------------------
// 🖼️ QUEST 1b — The product card                              20 XP
// ---------------------------------------------------------------
// One product = one shelf card, built as an HTML string.
// A pure function that RETURNS an HTML string — that's the
// bridge between logic and DOM, and it's testable!
//
// Given a product object
// When we call renderProductCard with it
// Then we get ONE string that looks EXACTLY like this:
//
//   <li class="product-card">
//     <span class="product-emoji">💧</span>
//     <span class="product-name">agua</span>
//     <span class="product-price">€0.75</span>
//     <button class="add-button" data-name="agua">Add to basket</button>
//     <span class="stock-label">in stock</span>
//   </li>
//
// Rules:
//   • the price always has two decimals: "€" + price.toFixed(2)
//   • data-name holds the product's name (Quest 3 needs it!)
//   • the stock label comes from your getStockLabel (Quest 1a)
//   • template literals make this lovely: `<li ...>${...}</li>`
function renderProductCard(product) {
  // 🤖 TODO: Quest 1b
}

// ---------------------------------------------------------------
// 🔍 QUEST 2a — The search engine                              15 XP
// ---------------------------------------------------------------
// MegaMercado has a search bar. Now so does the bodega.
//
// Given an array of products and a search term (like "tort")
// When we call searchProducts with them
// Then we get a NEW array with only the products whose name
// contains the search term. The search must ignore CAPITALS:
// "TORT", "tort" and "Tort" all find the tortilla.
// The original array stays unchanged.
//
// 💡 New tools (read this twice):
//   "Tortilla".toLowerCase()  →  "tortilla"
//   "tortilla".includes("tort")  →  true
function searchProducts(products, searchTerm) {
  // 🤖 TODO: Quest 2a
}

// ---------------------------------------------------------------
// 🌈 SIDE QUESTS — optional, never block the next module
// ---------------------------------------------------------------

// 🧾 SIDE — Category chips                       20 XP
// The shop wants filter chips: buttons "drinks", "food",
// "bakery", "snacks" that show one category.
// Spec in QUESTS.md — the function is filterByCategory,
// already provided. The DOM wiring is your quest.
function wireCategoryChips() {
  // 🤖 TODO: Side quest — see QUESTS.md
}

// ⏰ MEGA SIDE — Rush hour                        40 XP
// A mini-game: customers appear on a timer and demand a random
// product. Serve them with your week 2 skills before they
// storm off! Spec and starter code in QUESTS.md.
function startRushHour() {
  // 🤖 TODO: Mega side quest — see QUESTS.md
}

// ✨ Boti's USB port — do not edit below this line.
if (typeof module !== "undefined") {
  module.exports = {
    getProduct,
    getPrice,
    filterByCategory,
    getBasketTotal,
    getStockLabel,
    renderProductCard,
    searchProducts,
  };
}
