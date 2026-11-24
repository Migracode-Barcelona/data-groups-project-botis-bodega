// 🎬 THE GLUE — Boti's Bodega goes online
//
// Two files, two jobs:
//   shop.js    → LOGIC, tested by Jest        (npm run week3)
//   script.js  → GLUE, tested by your eyes   (open index.html)
//
// The DOM is not tested by Jest this week. Instead you get ✅
// checks: after every step, QUESTS.md tells you exactly what you
// should SEE in the browser.
//
// 💡 THE BIG IDEA of week 3: in weeks 1 and 2, changing shared
// data was the bug. This week the shop page is LIVE state — the
// products array gets updated on purpose (restock! checkout!).
// But only HERE, in the glue. The logic in shop.js stays pure.

// ---------------------------------------------------------------
// 🎯 The elements — found for you with querySelector.
// Notice the pattern: CSS selector in, element object out.
// ---------------------------------------------------------------

const productList = document.querySelector("#product-list");
const searchInput = document.querySelector("#search-input");
const cartList = document.querySelector("#cart-list");
const cartTotal = document.querySelector("#cart-total");
const checkoutButton = document.querySelector("#checkout-button");
const receipt = document.querySelector("#receipt");
const restockForm = document.querySelector("#restock-form");
const banner = document.querySelector("#megamercado-banner");

// 🧺 The LIVE STATE of the shop:
//   products → the global array from bodega.js. This week we are
//              ALLOWED to push restocks onto it and change stock.
//   cart     → the basket: an array of product NAMES.

const cart = [];

// ---------------------------------------------------------------
// 🖼️ QUEST 1c — Open the shutters                              20 XP
// ---------------------------------------------------------------
// Fill the shelves: build the HTML for every product card.
//
// Step 1: build an empty string.
// Step 2: loop over the products with for...of, adding
//         renderProductCard(product) to your string each time.
// Step 3: put the finished string into productList.innerHTML.
//
// ✅ check: open index.html — 12 cards with emojis and prices!
// ✅ check: npm run week3 — Q1a and Q1b green?

function renderProducts(listToShow) {
  const list = listToShow || products; // glue magic: fall back to everything
  let shelfHTML = "";
  // 🤖 TODO: Quest 1c — your loop here
  productList.innerHTML = shelfHTML;
  wireAddButtons(); // Quest 3 plugs the buttons in
}

// ---------------------------------------------------------------
// 🔍 QUEST 2 — The search bar goes live                        20 XP
// ---------------------------------------------------------------
// This is your prep's character-limit pattern, exactly:
// the page runs once on load, then again on every keystroke.
//
// Step 1: read the search term (searchInput.value).
// Step 2: use your searchProducts to filter.
// Step 3: renderProducts with the results — when the term is
//         empty, renderProducts() shows everything again.
//
// Then (bottom of the file): register handleSearch for the
// "input" event on searchInput.
//
// ✅ check: type "tort" — only the tortilla survives.
// ✅ check: clear the box — all 12 return.

function handleSearch() {
  // 🤖 TODO: Quest 2
}

// ---------------------------------------------------------------
// 🛒 QUEST 3 — Baskets online                                  30 XP
// ---------------------------------------------------------------
// Customers click "Add to basket" and the basket fills up.
//
// Step 1: addToBasket(name) — push the name onto cart, then
//         renderCart().
// Step 2: wireAddButtons() — find every .add-button with
//         querySelectorAll, loop over them, and add a "click"
//         listener that reads button.dataset.name (that's the
//         data-name attribute from your product card!).
//         ⚠️ This must run after every renderProducts — old
//         buttons die when innerHTML replaces them.
// Step 3: renderCart() — one <li> per cart item
//         ("tortilla — €3.25" via getProduct), plus the running
//         total in cartTotal via getBasketTotal.
//
// ✅ check: click Add a few times — the basket fills, the total adds up.

function wireAddButtons() {
  // 🤖 TODO: Quest 3
}

function addToBasket(name) {
  // 🤖 TODO: Quest 3
}

function renderCart() {
  // 🤖 TODO: Quest 3
}

// ---------------------------------------------------------------
// 🧹 QUEST 4 — The refactor                                    15 XP
// ---------------------------------------------------------------
// Same as your prep: two places do the same renders — pull them
// into one function and call it everywhere (after restock, after
// checkout, on load). All renders go through renderAll() now.
//
// ✅ check: search still works, basket still works, code is shorter.

function renderAll() {
  // 🤖 TODO: Quest 4
}

// ---------------------------------------------------------------
// 📦 QUEST 5 — The employee portal                             25 XP
// ---------------------------------------------------------------
// Doña Carmen shelves new products through this form.
//
// Step 1: querySelector each of the five inputs (ids: product-name,
//         product-price, product-stock, product-emoji,
//         product-category) and read their .value.
// Step 2: build a product object — Number() turns input strings
//         into numbers. (All inputs give you strings. All of them.)
// Step 3: push the new product onto products.
// Step 4: renderAll() and form.reset().
//
// Then (bottom of the file): register handleRestock for the
// form's "submit" event.
//
// ✅ check: add a product — it appears on the shelves instantly.

function handleRestock(event) {
  event.preventDefault(); // ⚠️ keep this line! It stops the page reloading.
  // 🤖 TODO: Quest 5
}

// ---------------------------------------------------------------
// 🏆 QUEST 6 — BOSS: Launch day                                45 XP
// ---------------------------------------------------------------
// The bodega needs a checkout. Launch day is TODAY.
//
// Step 1: empty basket? Say so in the receipt and stop.
// Step 2: build the receipt: one line per cart item
//         ("tortilla — €3.25") plus "TOTAL: €…" with
//         getBasketTotal. HTML or text — your call.
// Step 3: decrement the stock of every purchased product:
//         getProduct, then product.stock -= 1.
//         🎉 Mutation is the FEATURE today. Weeks 1–2 it was
//         the bug; now the live shop must remember the sale.
//         (Only in the glue! The logic stays pure.)
// Step 4: empty the cart, renderAll(), celebrate().
//
// Then (bottom of the file): register handleCheckout for the
// checkout button's "click" event.
//
// ✅ check: buy the last crema catalana (stock 3) three times —
//           the card flips to SOLD OUT.
// ✅ check: confetti. Banner. MEGAMERCADO DEFEATED.

function handleCheckout() {
  // 🤖 TODO: Boss — Quest 6
}

// ---------------------------------------------------------------
// 🎉 The party cannon — pre-written (every hero needs one).

function celebrate() {
  const emojis = ["🎉", "🥳", "🎊", "✨", "🏆"];
  for (let i = 0; i < 40; i += 1) {
    const drop = document.createElement("span");
    drop.className = "confetti";
    drop.textContent = emojis[i % emojis.length];
    drop.style.left = Math.random() * 100 + "%";
    drop.style.animationDelay = Math.random() * 0.9 + "s";
    document.body.appendChild(drop);
    setTimeout(() => drop.remove(), 2800);
  }
  banner.classList.add("show");
}

// ---------------------------------------------------------------
// 🔌 WIRE IT UP — every quest ends with an addEventListener here.
// Add each line as you reach its quest:
//
// 🤖 TODO Quest 2:  searchInput.addEventListener("input", handleSearch);
// 🤖 TODO Quest 5:  restockForm.addEventListener("submit", handleRestock);
// 🤖 TODO Quest 6:  checkoutButton.addEventListener("click", handleCheckout);
//
// (Quest 3 needs no wiring here — wireAddButtons runs inside
//  renderProducts, so every fresh set of buttons gets plugged in.)

// ---------------------------------------------------------------
// 🚀 ON PAGE LOAD — the same renders that run on every event
// also run once, right now. (Quest 4: they become renderAll().)

renderProducts();
renderCart();
