# 🤖 Week 2 — The New Ledger

> **The story so far...**
>
> One week in, and Boti can already count stock, answer
> customers, survive a recall and merge double deliveries. 🎉
>
> But across the street, the concrete is dry: **El MegaMercado**
> has OPENED. 🏗️➡️🏬 Fluorescent lights. Eleven aisles. A
> parking lot.
>
> Doña Carmen is not scared. She bought a new **ledger**: a proper
> book where every product is ONE line — with a name, a price, a
> stock count, an emoji for the shelf, and a category.
>
> Sticky notes with duplicate names? Gone. This week, Boti
> learns to read the ledger: **objects**.

## 🎮 How this week works

Exactly like week 1 (in case the workshop was long ago):

```zsh
npm run week2        # run the diagnostics (the tests)
```

- Pick quests top-down in `skills.js`, make the tests green.
- Never edit the tests — Doña Carmen's exact orders.
- Open **`simulator/index.html`** and press **▶ Run a shift**:
  this week the simulator has a **search bar** and a **HAPPY
  HOUR** button. They run on YOUR functions.
- Each week is self-contained: if week 1's boss is still
  unfinished, week 2 doesn't care. (Boti is a robot. He
  compartmentalises.)

**Total XP this week: 215.**

| #   | Quest                          | Skill                | XP  |
| --- | ------------------------------ | -------------------- | --- |
| 1   | 📖 Read the ledger             | `getProduct`         | 15  |
| 2   | 🏷️ Price check                 | `getPrice`           | 15  |
| 3   | 😤 The picky customer          | `isInStock`          | 20  |
| 4   | 🛒 Basket run                  | `getBasketTotal`     | 25  |
| 5a  | 💸 Happy hour                  | `applyDiscount`      | 20  |
| 5b  | 🎟️ The coupon                  | `makeDiscountedCopy` | 25  |
| 6   | 🔎 The search bar              | `parseShopQuery`     | 25  |
| 7   | 🧹 Tidy the shelves            | `filterByCategory`   | 20  |
| 8a  | 🏆 BOSS: the cheapest thing    | `getCheapestProduct` | 20  |
| 8b  | 🏆 BOSS: the MegaMercado audit | `makeReport`         | 30  |

---

## 📖 Quest 1 — Read the ledger _(15 XP)_

The ledger (`week-2/bodega.js`) is an array of **objects**. One
object = one product:

```js
{ name: "tortilla", price: 3.25, stock: 4, emoji: "🥘", category: "food" }
```

> _Given_ an array of products and a product name
> _When_ we call `getProduct` with them
> _Then_ we get the product object with that name,
> or `undefined` if no product has that name.

Week 1 you looped over an array of strings and compared them.
This week you loop over an array of **objects** and compare
something _inside_ each object: `product.name`.

<details>
<summary>🧠 Boti's memory bank</summary>

1. Loop over the array of products with `for...of`.
2. For each product, is `product.name === name`?
3. If yes — you found the line. Return the product.
4. Loop finished with no match? Return `undefined` (or just let
   the function end — what does a function with no return
   statement give back?).

</details>

---

## 🏷️ Quest 2 — Price check _(15 XP)_

> _Given_ an array of products and a product name
> _When_ we call `getPrice` with them
> _Then_ we get that product's price (`undefined` if the product
> doesn't exist).

Carmen's rule this week: **never repeat yourself**. You already
built a product-finder in Quest 1. A good programmer calls it.

<details>
<summary>🧠 Boti's memory bank</summary>

1. `const product = getProduct(products, name)` — reuse!
2. If it's `undefined`, return `undefined`.
3. Otherwise return `product.price`.

</details>

---

## 😤 Quest 3 — The picky customer _(20 XP)_

**Ramon** 👓: _"churros, por favor."_ The ledger says churros
have `stock: 0`. Sold out! "In stock" means **two** things at
once: the product exists **and** its stock is bigger than zero.

> _Given_ an array of products and a product name
> _When_ we call `isInStock` with them
> _Then_ we get `true` only if the product exists AND
> `stock > 0` — `false` in every other case.

⚠️ **Danger for robots:** if `getProduct` gives you `undefined`
and you ask for `undefined.stock`, your program 💥 crashes with
a TypeError. Check for `undefined` first. The tests include this
exact trap.

<details>
<summary>🧠 Boti's memory bank</summary>

1. Find the product (Quest 1!).
2. If the product is `undefined`, return `false`.
3. Otherwise return `product.stock > 0`.

</details>

---

## 🛒 Quest 4 — Basket run _(25 XP)_

Marta arrives with a basket: `["tortilla", "agua", "croissant"]`
— an array of product **names**.

> _Given_ an array of products and an array of basket names
> _When_ we call `getBasketTotal` with them
> _Then_ we get the sum of those products' prices.

You've summed an array of numbers before. This time each loop
step must look up a product, then grab its `price`.

<details>
<summary>🧠 Boti's memory bank</summary>

1. Start a total at 0.
2. Loop over the _basket names_.
3. For each name, get its price (hmm — which quest built a
   price-finder?).
4. Add it to the total, return the total.

</details>

---

## 💸 Quest 5a — Happy hour _(20 XP)_

Carmen stamps a big paper sign: **HAPPY HOUR — 50% OFF
BOCADILLOS**. She wants the real bocadillo line in the ledger to
change — the ledger, the shelf, the whole shop. One product,
everywhere, new price. This week mutation is not the bug.
**It's the feature.**

> _Given_ a product object and a percent (like `50` for 50%)
> _When_ we call `applyDiscount` with them
> _Then_ the product's `price` property is updated to the
> discounted price, and the **same** object is returned.

The discount at 50% is half the price. Look at the Q5a test that
uses `toBe` — it checks the returned product is the **very same
object in memory**, not a twin. When you assign to a property
(`product.price = ...`) and return the product, that's exactly
what happens.

<details>
<summary>🧠 Boti's memory bank</summary>

1. `const discount = product.price * percent / 100`.
2. `product.price = product.price - discount`.
3. `return product`.

</details>

---

## 🎟️ Quest 5b — The coupon _(25 XP)_

El MegaMercado mails out printed coupons. A coupon shows a
discounted product — but the product in **your** ledger must NOT
change. The opposite of Quest 5a: now the copy is the feature and
the mutation would be the phantom.

> _Given_ a product object and a percent
> _When_ we call `makeDiscountedCopy` with them
> _Then_ we get a **NEW object** with the same name, price
> (discounted), stock, emoji and category — and the original
> product must stay exactly as it was.

<details>
<summary>🧠 Boti's memory bank</summary>

1. Build a new object literal, property by property:
   `{ name: product.name, price: ..., ... }`
2. The new price = the discounted price (Quest 5a maths).
3. Return the new object. Never touch the original.

</details>

---

## 🔎 Quest 6 — The search bar _(25 XP)_

MegaMercado's website has search URLs like
`boti.shop/buscar?category=drinks&max=2`. The part after the `?`
is the **query string**: `"category=drinks&max=2"`. You met this
in your prep — `parseQueryString` — and now the bodega needs the
exact same skill.

> _Given_ a query string like `"category=drinks&max=2"`
> _When_ we call `parseShopQuery` with it
> _Then_ we get an object like `{ category: "drinks", max: "2" }`.
> An empty query string gives `{}`.

⚠️ The trap from prep is still there: the property name lives in
a **variable**, so dot notation (`queryParams.key`) would create
a property literally called `"key"`. You need
`queryParams[key] = value`.

<details>
<summary>🧠 Boti's memory bank</summary>

1. Empty query string? Return `{}` early.
2. `const pairs = queryString.split("&")`.
3. Loop: split each pair on `"="` — destructuring is allowed!
4. `queryParams[key] = value` — square brackets, always square
   brackets.

</details>

---

## 🧹 Quest 7 — Tidy the shelves _(20 XP)_

> _Given_ an array of products and a category
> _When_ we call `filterByCategory` with them
> _Then_ we get a NEW array with only the products whose
> category matches. Original untouched.

You did this in prep for ice creams you can eat. New shop, same
moves.

<details>
<summary>🧠 Boti's memory bank</summary>

1. New array, loop, push the matches, return.
2. `product.category === category` decides.

</details>

---

## 🏆 Quest 8 — BOSS: The MegaMercado audit _(20 + 30 XP)_

A MegaMercado manager walks in wearing sunglasses at night. 🕶️
_"Nice shop. What are the numbers?"_ Carmen smiles: "Boti?"

**8a —** _Given_ an array of products, _when_ we call
`getCheapestProduct`, _then_ we get the product object with the
lowest price. (Prep called this `getCheapest` for books.)

**8b —** _Given_ an array of products, _when_ we call
`makeReport`, _then_ we get ONE object:

```js
{ itemCount: 3, totalValue: 20, cheapest: "agua" }
```

- `itemCount` — how many products
- `totalValue` — sum of every `price × stock`
- `cheapest` — the **name** of the cheapest product

Boss rules: old moves only. Building an object with computed
values inside is the one new-ish thing — everything else you've
already beaten.

<details>
<summary>🧠 Boti's memory bank</summary>

1. For 8a, track the cheapest-so-far while looping (like finding
   the middle of a song: compare, replace, continue).
2. For 8b, three accumulators or three loops — your choice.
3. `cheapest: getCheapestProduct(products).name` — yes, you can
   call your own functions inside the object you're building.

</details>

---

## 🌈 Side quests — optional, never block week 3

| Quest                      | Skill                        | XP  | Where                        |
| -------------------------- | ---------------------------- | --- | ---------------------------- |
| 🧊 Deep freeze             | `getOutOfStock`              | 15  | spec + test in `lab.test.js` |
| 🧾 Receipt printer         | `printReceipt`               | 20  | spec + test in `lab.test.js` |
| 🧪 Lab: the missing test   | —                            | 20  | template in `lab.test.js`    |
| ⭐ MEGA: customer profiles | `canAfford` + `recommendFor` | 40  | spec in `skills.js`          |

**⭐ Customer profiles** — customers are objects now too:
`{ name: "Marta", budget: 3, favoriteCategory: "drinks" }`.
`canAfford(customer, product)` → true if the price fits the
budget AND it's in stock. `recommendFor(customer, products)` →
new array: only products from the customer's favorite category
they can afford. Verify in the simulator's bonus panel, or write
your own tests in the lab.

---

## 🆘 Stuck?

Same as week 1: re-read the Given/When/Then → open the memory
bank → read Expected vs Received in the test output → Slack with
quest number + what you expected. Asking is a job skill.
