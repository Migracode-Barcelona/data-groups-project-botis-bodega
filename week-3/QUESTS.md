# 🤖 Week 3 — The Shop Goes Online

> **The story so far...**
>
> Boti can count stock, read a ledger, survive happy hour and
> print coupons. Doña Carmen's bodega is thriving.
>
> Then Marta walks in holding her phone: _"Have you seen El
> MegaMercado's WEBSITE? You click a button and the shopping
> arrives at your house!"_
>
> Carmen goes quiet. She looks at Boti. Boti looks at you.
>
> _"Boti's Bodega goes ONLINE. Tonight."_ 🚀
>
> This week, you're not training Boti's brain. You are building
> Boti's **face**: the shop page itself, in HTML + JavaScript.

## 🧠 The big idea: logic vs glue

The bodega's code now lives in two files, and that's not an
accident:

| File        | Kind of code                                                             | Tested by                    |
| ----------- | ------------------------------------------------------------------------ | ---------------------------- |
| `shop.js`   | **LOGIC** — pure functions. Data in, data out. No `document`, no events. | Jest: `npm run week3`        |
| `script.js` | **GLUE** — `querySelector`, events, `innerHTML`, live state.             | Your eyes: open `index.html` |

Your week 2 functions were pure so they could be tested. This
week they get a promotion: `getProduct`, `filterByCategory` and
`getBasketTotal` are **already in `shop.js`**, tests green, ready
to be reused by the page. That's the payoff of pure functions —
they plug in anywhere.

And one more twist — the big one:

> **Weeks 1 and 2: changing shared data was the BUG.**
> **This week: the live shop page is shared data — updating it is the FEATURE.**
> Restocking pushes onto the products array. Checkout decrements
> stock. Mutation is welcome _in the glue_. The logic in
> `shop.js` stays pure.

## 🎮 How this week works

1. `npm run week3` — the logic diagnostics (red is normal!).
2. Open `index.html` (double-click it) — your ✅ checks live here.
3. Quests go top-down in `shop.js` then `script.js`.

**Total XP this week: 200.**

| #   | Quest                       | Where                   | XP  |
| --- | --------------------------- | ----------------------- | --- |
| 1a  | 🏷️ Stock labels             | `shop.js`               | 10  |
| 1b  | 🖼️ The product card         | `shop.js`               | 20  |
| 1c  | 🖼️ Open the shutters        | `script.js`             | 20  |
| 2   | 🔍 The search bar goes live | `shop.js` + `script.js` | 35  |
| 3   | 🛒 Baskets online           | `script.js`             | 30  |
| 4   | 🧹 The refactor             | `script.js`             | 15  |
| 5   | 📦 The employee portal      | `script.js`             | 25  |
| 6   | 🏆 BOSS: Launch day         | `script.js`             | 45  |

---

## 🏷️ Quest 1a — Stock labels _(10 XP, in `shop.js`)_

The shelf cards need a little stock message.

> _Given_ a product object
> _When_ we call `getStockLabel` with it
> _Then_ we get `"SOLD OUT"` if stock is 0, `"only N left!"`
> if stock is 3 or fewer, `"in stock"` otherwise.

<details>
<summary>🧠 Boti's memory bank</summary>

1. Three cases, three `if`s — order matters! Check 0 first,
   then ≤ 3, then everything else.
2. `"only " + product.stock + " left!"` builds the warning.

</details>

---

## 🖼️ Quest 1b — The product card _(20 XP, in `shop.js`)_

One product = one shelf card, built as an HTML **string**. A
pure function that returns HTML — that's the bridge between
logic and DOM, and Jest can test it (the Q1b tests use
`toContain` on strings — you met it in the labs).

> _Given_ a product object
> _When_ we call `renderProductCard` with it
> _Then_ we get one string, exactly this shape:

```html
<li class="product-card">
  <span class="product-emoji">💧</span>
  <span class="product-name">agua</span>
  <span class="product-price">€0.75</span>
  <button class="add-button" data-name="agua">Add to basket</button>
  <span class="stock-label">in stock</span>
</li>
```

Rules: the price always shows two decimals
(`"€" + price.toFixed(2)`), `data-name` holds the product's name
(Quest 3 will read it!), and the stock label comes from your
Quest 1a function. Template literals make this lovely.

<details>
<summary>🧠 Boti's memory bank</summary>

1. One template literal for the whole card.
2. `${product.price.toFixed(2)}` prints 0.75 as "0.75".
3. `${getStockLabel(product)}` drops the stock label in.

</details>

---

## 🖼️ Quest 1c — Open the shutters _(20 XP, in `script.js`)_

Time to fill the empty shelves. `renderProducts` in `script.js`
has three steps and one big ✅:

> **✅ check:** refresh the page — 12 product cards with emojis
> and prices. The bodega is OPEN.

<details>
<summary>🧠 Boti's memory bank</summary>

1. Build the string in a loop: `shelfHTML += renderProductCard(p)`.
2. `productList.innerHTML = shelfHTML` — the moment of truth.
3. Why is the page empty at first? Play computer: what does
   `renderProductCard` return before Quest 1b is done?

</details>

---

## 🔍 Quest 2 — The search bar goes live _(15 + 20 XP)_

**2a (`shop.js`)** — the search engine:

> _Given_ an array of products and a search term
> _When_ we call `searchProducts` with them
> _Then_ we get a NEW array with only the products whose name
> contains the term. CAPITALS don't matter.

New tools: `"Tortilla".toLowerCase()` and
`"tortilla".includes("tort")`. You know the array-building part.

**2b (`script.js`)** — your prep's character-limit pattern,
exactly: the interface updates **on page load** and **on every
keystroke**. Declare `handleSearch`, then register it:

```js
searchInput.addEventListener("input", handleSearch);
```

> **✅ check:** type `tort` — only the tortilla survives.
> **✅ check:** clear the box — all 12 return.

<details>
<summary>🧠 Boti's memory bank (2b)</summary>

1. Read the term: `searchInput.value`.
2. Empty term? `renderProducts()` shows everything again.
3. Otherwise `renderProducts(searchProducts(products, term))`.
4. Wire the listener at the bottom of script.js where the
   TODO points you.

</details>

---

## 🛒 Quest 3 — Baskets online _(30 XP, in `script.js`)_

Every card has an Add button. Clicking fills the basket.

Three pieces:

1. `addToBasket(name)` — push onto `cart`, then `renderCart()`.
2. `wireAddButtons()` — `querySelectorAll(".add-button")`, loop,
   and add a `"click"` listener to each. The handler reads
   `button.dataset.name` — that's the `data-name` attribute your
   product card planted in Quest 1b. Then it calls
   `addToBasket(name)`.
3. `renderCart()` — one `<li>` per cart item
   (`"tortilla — €3.25"` via `getProduct`), and the running
   total into `cartTotal` via `getBasketTotal`.

⚠️ **The trap of the week:** `innerHTML` replaces old elements —
and their listeners die with them. That's why `wireAddButtons`
runs at the end of every `renderProducts`. New buttons, new
wires, every time.

> **✅ check:** click Add a few times — the basket fills and the
> total adds up. Buy 2 aguas and a tortilla: €4.00.

<details>
<summary>🧠 Boti's memory bank</summary>

1. `for (const button of document.querySelectorAll(".add-button"))`.
2. Inside the loop: `button.addEventListener("click", () => { … })`.
3. `button.dataset.name` reads `data-name`.
4. `getProduct(products, name).price` → `"€" + price.toFixed(2)`.

</details>

---

## 🧹 Quest 4 — The refactor _(15 XP, in `script.js`)_

Exactly the refactor from your prep: several places do the same
renders — pull them into `renderAll()` and call it everywhere:
on page load, after search, after restock, after checkout.

> **✅ check:** everything still works, and your render calls live
> in one function.

---

## 📦 Quest 5 — The employee portal _(25 XP, in `script.js`)_

Carmen shelves new products through the form. `handleRestock` is
already declared with `event.preventDefault()` inside — keep it,
it stops the page reloading on submit (browser default magic).

> _Given_ the form is filled in
> _When_ it is submitted
> _Then_ a new product object joins `products` and the shelves
> re-render instantly.

Steps:

1. `querySelector` each input (`#product-name`, `#product-price`,
   `#product-stock`, `#product-emoji`, `#product-category`) and
   read `.value`.
2. Build the product object. ⚠️ Every input gives you a
   **string**. `Number(value)` turns "3.25" into 3.25.
3. `products.push(newProduct)`.
4. `renderAll()`, then `restockForm.reset()`.

Then register the handler for the form's `"submit"` event.

> **✅ check:** shelve a `bocadillo de calabacín` at €4.75 —
> it appears without a page reload.

<details>
<summary>🧠 Boti's memory bank</summary>

1. `const nameInput = document.querySelector("#product-name")`.
2. Number("5") === 5. Number("") is 0 — use the form's `required`
   attributes wisely.
3. Registration:
   `restockForm.addEventListener("submit", handleRestock);`

</details>

---

## 🏆 Quest 6 — BOSS: Launch day _(45 XP, in `script.js`)_

The checkout. Everything you've built, in one place.

> _Given_ a basket with items
> _When_ the customer clicks Checkout
> _Then_ a receipt appears, the stock remembers the sale,
> and MegaMercado is DEFEATED. 🎉

Steps:

1. Empty basket? Say so in the receipt and stop.
2. Build the receipt — one line per cart item plus the total
   (`getBasketTotal`). The receipt `<div>` keeps its line breaks
   (`white-space: pre-line` is already styled).
3. **Decrement stock:** for each cart item, `getProduct`, then
   `product.stock -= 1`. Mutation is the feature today — the
   live shop must remember the sale. (In the glue only. The
   logic would never.)
4. Empty the cart, `renderAll()`, `celebrate()`.

Then register the checkout button's `"click"` listener.

> **✅ check:** buy the last crema catalana three times — its
> card flips to `only 1 left!` then `SOLD OUT`.
> **✅ check:** confetti. Banner. MEGAMERCADO DEFEATED.

<details>
<summary>🧠 Boti's memory bank</summary>

1. Receipt lines: reuse the `"name — €price"` format from
   Quest 3.
2. Loop over the CART for the receipt, and again for the stock
   decrement (or once, cleverly).
3. `cart.length === 0` is your empty-basket check.

</details>

---

## 🌈 Side quests — optional, for the brave

**🧾 Category chips — 20 XP.** Add a row of buttons
(`drinks`, `food`, `bakery`, `snacks`) under the search box in
`index.html`. Clicking shows only that category — with the
provided `filterByCategory`. Starter: `wireCategoryChips` in
`shop.js`. Bonus thought: how does this interact with a search
term that's already typed?

**⏰ MEGA: Rush hour — 40 XP.** The game from your prep's timers
lesson! Every 2 seconds a customer emoji slides in
(class `rush-customer`, CSS provided) demanding a random product.
Serve them with `isInStock`-style logic before they storm off:

- Build a random product name from the array.
- If it's in stock, show it in the receipt and +1 point.
- If not (or too slow!), the customer grumbles and you lose a point.
- `startRushHour` in `shop.js` has the seat; use
  `setTimeout` and a named event handler like the prep teaches.
- First to 10 points defeats MegaMercado at dawn.

**💾 Legendary: save the bodega.** Refresh the page and the
cart empties. Where could the cart _survive_ a refresh? Research
`localStorage` — two methods, `setItem` and `getItem`, strings
only. That's all the hints you get. 🕵️

---

## 🆘 Stuck?

Same ladder as always: re-read the quest → ✅ check what you SEE
in the browser vs what you SHOULD see → open the memory bank →
DevTools console (read the red!) → Slack with quest number, what
you see, and what you expected.
