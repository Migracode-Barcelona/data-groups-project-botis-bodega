# 🎓 Teacher Guide — Boti's Bodega

Everything you need to run the three Thursday sessions (2h,
remote). Read the **Orientation** once; then use each week's
runbook on the day.

**Contents:** orientation · pre-class checklist · week 1/2/3
runbooks (with hint ladders and common mistakes) · catch-up
strategy · facilitation notes.

---

## 0. Orientation

### What's in the repo

| Path                                           | What it is                                     | Who edits it            |
| ---------------------------------------------- | ---------------------------------------------- | ----------------------- |
| `week-N/QUESTS.md`                             | The quest log: story + specs + hints           | nobody (it's the book)  |
| `week-N/bodega.js`                             | The shop's data (pre-written)                  | nobody                  |
| `week-1,2/skills.js`, `week-3/shop.js`         | **Students' main workbench**                   | students                |
| `week-3/script.js`                             | Students' DOM glue workbench                   | students                |
| `week-N/skills.test.js`, `week-3/shop.test.js` | The diagnostics (Carmen's orders)              | **never students**      |
| `week-N/lab.test.js`                           | Side-quest lab (students MAY write tests here) | students                |
| `week-N/simulator/`                            | Browser game engine (weeks 1–2)                | nobody                  |
| `week-3/index.html`, `style.css`               | The shop page + pre-written design             | nobody (bonus: allowed) |
| solutions branch                               | Reference answers — **not on main**            | you                     |

### The game loop students learn on day 1

```zsh
npm run week1        # red = quest open, green = skill installed
```

…write functions until green… then open the simulator, run a
shift, watch Boti use their code. Week 3 replaces the simulator
with the real shop page.

### Before you share the repo with students

Nothing to clean: `main` ships **without solutions** — students
clone it as-is. The reference answers live on the `solutions`
branch:

```zsh
git checkout solutions   # peek at the answers
git checkout main        # back to the student branch
```

When you improve a quest later, commit on `main`, then port the
matching answer to `solutions` (or cherry-pick).

### Pre-class checklist (each week, 10 minutes)

1. `npm install` and `npm run weekN` in a fresh clone — expect
   the right kind of red (see week sections below).
2. Open the simulator (weeks 1–2) or `week-3/index.html` and
   click through once — with zero skills installed you should
   see 💥 smoke everywhere, **no crashes**.
3. Decide breakout pairs (see facilitation notes).
4. Have the QUESTS.md open on a second screen for screenshare.

---

## 1. Week 1 — Arrays: "Boti's First Day"

**Prep they've done:** arrays, `for...of`, references, mutation,
side effects, the `calculateMedian` splice bug, "doesn't modify
the input" tests. They know Jest basics from the week before.

**Quests:** Q0 `getItemAt` → Q1 `countStock` → Q2 `hasItem` →
Q3 `addItems` (no-mutation) → Q4 bug hunt `removeItem` → Q5
`makeShelfLabels` → Q6 boss `mergeDeliveries`.

### Zoom runbook (2h)

| Time      | What                                                                          | Mode                |
| --------- | ----------------------------------------------------------------------------- | ------------------- |
| 0:00–0:10 | **Cold open** (below)                                                         | screenshare         |
| 0:10–0:30 | Q0–Q1 solo, questions in chat                                                 | solo                |
| 0:30–0:55 | Q2–Q3; after Q3, screenshare the 🚨 PHANTOM STOCK alert (someone will mutate) | solo → screenshare  |
| 0:55–1:00 | Break                                                                         | —                   |
| 1:00–1:25 | **Q4 bug hunt** as a shared investigation, then pairs fix it                  | screenshare → pairs |
| 1:25–1:40 | Q5 label gun, launch Q6 boss                                                  | solo                |
| 1:40–1:55 | Simulator show-and-tell: run shifts, ranks, XP                                | screenshare         |
| 1:55–2:00 | Homework + next-week teaser                                                   | screenshare         |

**Cold open (say this):** "This is Boti. Boti is a shopkeeper
robot with an empty brain. We are the programming team. Every
function you write this module installs one of Boti's skills, and
the tests are the robot's diagnostics. Let's install nothing and
watch a shift first." → run the simulator with zero skills →
smoke everywhere → big laughs → "let's fix this robot."

### Per-quest: common mistakes + hint ladders

**Q0 `getItemAt`** — symptom: test 3 fails ("nothing there").
Cause: returned `items[index]` without handling `undefined`.
H1: What does `items[5]` give you on a 2-item list?
H2: Can you check for `undefined` and answer differently?
H3: `if (item === undefined) { return "nothing there"; }`
H4: return the item otherwise.

**Q1 `countStock`** — symptom: returns `true`/`1`/crashes.
Cause: boolean instead of counter, or early return inside loop.
H1: You need a number that grows. Where does it start?
H2: `let count = 0` — when do you add 1?
H3: `if (item === itemName) { count += 1; }` — return _after_ the loop.
H4: Why would returning inside the loop undercount?

**Q2 `hasItem`** — symptom: always false / always true.
H1: What do you do when you _find_ the item mid-loop?
H2: `return true` the moment you find it.
H3: Where does `return false` belong — inside or after the loop?
H4: `.includes()` also works — but explain what it does first.

**Q3 `addItems`** (the mutation quest) — symptom: test 2 fails
("original list must stay"). Cause: `push`ed into the input and
returned it. This is _the_ week-1 lesson — let them feel it.
H1: Which of the two tests is failing? Read its name out loud.
H2: Where does `push` put the item — a new list, or Carmen's?
H3: Build `const newList = []` first — where do the old items go?
H4: Two loops (old, then new) or one — then return `newList`.
Also say: `concat` exists and doesn't mutate — but build it by
hand first so you know what it does.

**Q4 bug hunt `removeItem`** — run the three failing tests
together on screen; play computer on `splice`. Symptom→cause map:

- Test 1 fails → `splice` removes only ONE match.
- Test 2 fails → `indexOf` returned -1; `splice(-1, 1)` steals
  the LAST item. (Do this live. It's theatre.)
- Test 3 fails → mutation, same as Q3.
  H1: Which line mutates? Which line trusts `indexOf`?
  H2: New array + keep-if-different solves all three at once.
  H3: `if (item !== itemName) { remaining.push(item); }`
  H4: What happens to "not found" for free with this approach?

**Q5 `makeShelfLabels`** — like the prep's `doubleAllNumbers`.
H1: New array, loop, push — what's different each push?
H2: `"SHELF: " + item.toUpperCase()`.
H3/H4: nudge formatting only.

**Q6 boss `mergeDeliveries`** — H1: start from a _copy_ of A.
H2: for each B item, ask: do I already have you?
H3: You wrote that question in Q2 — `hasItem(merged, item)`.
H4: push B's item only when `hasItem` says false.

**Sim demo moments:** after Q3 (phantom stock alert), after Q4
(the recall visibly pulls items), end of class (ranks + confetti
if boss is done).

**Homework / Saturday:** boss + side quests (lab tests, mystery
box, alphabetical shelves). Nothing here blocks week 2.

### Week 1 testing thread

They _read_ failing tests as specs (Q3/Q4 include the
"doesn't modify the input" pattern from their prep), and the lab
side quest has them **write** tests for `countStock` edge cases
and meet `toContain`. The sim gives the mutation lesson a face
(🚨 overlay).

**Expected day-one tally** for `npm run week1`: **15 red / 3
green**. The green ones are the two mutation guards (Q3, Q6) —
they pass vacuously against do-nothing stubs — plus the lab
opener. Say this out loud in class: it's a lovely "tests can
pass for boring reasons" moment, and it stops students from
thinking they've earned points. Week 2 fresh state is 18 red /
6 green, week 3 is 10 red / 4 green — same benign causes.

---

## 2. Week 2 — Objects: "The New Ledger"

**Prep they've done:** object literals, dot/bracket access,
mutation & shared references (`twinData`), `parseQueryString`
with `queryParams[key] = value`, filtering arrays of objects.

**Quests:** Q1 `getProduct` → Q2 `getPrice` → Q3 `isInStock` →
Q4 `getBasketTotal` → Q5a `applyDiscount` (mutation WANTED) →
Q5b `makeDiscountedCopy` → Q6 `parseShopQuery` → Q7
`filterByCategory` → Q8a/b boss.

### Zoom runbook (2h)

| Time      | What                                                                                       | Mode                |
| --------- | ------------------------------------------------------------------------------------------ | ------------------- |
| 0:00–0:10 | Recap + **ledger reveal**: week-1 list vs week-2 objects on screen; show `bodega.js`       | screenshare         |
| 0:10–0:35 | Q1–Q3 solo                                                                                 | solo                |
| 0:35–1:00 | Q4 + start Q5a/b; screenshare Happy Hour in the sim (real jar turns yellow everywhere)     | solo → screenshare  |
| 1:00–1:05 | Break                                                                                      | —                   |
| 1:05–1:30 | Q6 search bar — do the FIRST split together on screen (`"a=1&b=2".split("&")`), then pairs | screenshare → pairs |
| 1:30–1:45 | Q7 filter, start boss                                                                      | solo                |
| 1:45–2:00 | Audit show: a student runs the sim audit; homework + teaser                                | screenshare         |

**Ledger reveal (say this):** "Last week 'churros, churros'
meant two churros. Carmen's new ledger has one line per product
with a `stock` number. Why did we even have duplicates? Because
we didn't have a better tool. Now we do. That's what objects
are: labelled data."

### Per-quest: common mistakes + hint ladders

**Q1 `getProduct`** — symptom: compares `product === name`.
H1: The name lives _inside_ the object — how do you read it?
H2: `product.name === name`. H3: return the product on match.
H4: What does a function return if it never hits `return`?

**Q2 `getPrice`** — the lesson is _reuse_. H1: You already have
a product-finder. H2: `const product = getProduct(...)`. H3:
guard `undefined`. H4: `return product.price`.

**Q3 `isInStock`** — symptom: TypeError reading 'stock'.
H1: What happens when `getProduct` gives you `undefined`?
H2: Check `undefined` first, return false. H3: `product.stock > 0`.
H4: Two conditions, one `&&` — or two ifs.

**Q4 `getBasketTotal`** — symptom: sums all product prices.
H1: Loop over the basket names, not the products. H2: per name,
find its price (Q2!). H3: `total += price`. H4: skip missing
products gracefully (`if (price !== undefined)`).

**Q5a `applyDiscount`** — symptom: `toBe` test fails (returned a
fresh object), or price wrong. This quest deliberately _reverses_
week 1's rule — mutation is the feature.
H1: discount = price × percent / 100. H2: `product.price = product.price - discount`.
H3: `return product` — the SAME object, no new `{}`.

**Q5b `makeDiscountedCopy`** — symptom: `toEqual` shows a missing
property (the test prints the diff — point at it!).
H1: You're the copy machine: build a `{}` with all five keys.
H2: price gets the discounted value. H3: original untouched —
you never touch it. H4: `not.toBe` proves it's a twin, not the jar.

**Q6 `parseShopQuery`** — THE prep trap lives here.
Symptom: result is `{ key: "..." }` — literal "key" property.
H1: Split first on `"&"`, then on `"="`.
H2: Destructure: `const [key, value] = pair.split("=")`.
H3: `queryParams[key] = value` — why must it be brackets?
H4: Empty string early-return `return {}`.

**Q7 `filterByCategory`** — H1/H2 as in prep's ice creams.
H3: `product.category === category`. H4: original untouched.

**Q8a boss** — H1: track cheapest-so-far; start with
`products[0]`. H2: compare `.price`, replace if lower.
H4: careful — `products[0]` of an empty array is `undefined`.

**Q8b boss** — symptom: `totalValue` too small (summed prices
not price×stock). H1: three numbers: count, value, cheapest.
H2: value adds `price * stock`. H3: cheapest reuses Q8a —
`.name`. H4: build the report object at the end.

**Sim demo moments:** Happy Hour button (real jar changes
everywhere — reference lesson made visible), search bar typing
`category=drinks`, audit overlay during a shift.

**Homework / Saturday:** boss, deep freeze, receipt printer
(`toFixed`), mega customer profiles. The sim's bonus panel
verifies `canAfford`/`recommendFor` for them.

### Week 2 testing thread

`toEqual` on objects; the `toBe` identity idea (same object vs
twin) lands in Q5a; the lab asks students to _write_ the
no-mutation test for the coupon — the same test pattern they met
in week 1, now authored by them.

---

## 3. Week 3 — DOM: "The Shop Goes Online"

**Prep they've done:** DOM tree, `querySelector`, `textContent`,
events + `addEventListener`, `setTimeout`, the character-limit
"run on load + run on event" pattern, the extract-function
refactor.

**Structure:** logic (`shop.js`, Jest-tested) vs glue
(`script.js`, checked by ✅ browser checks). Week-2 functions
are _provided_ in `shop.js` — except `getPrice`, which students
port themselves (the provided tests fail until they do; the file
says so).

**Quests:** 1a `getStockLabel` + 1b `renderProductCard` (pure) →
1c render on load → 2 `searchProducts` + live search → 3 baskets
(buttons + events) → 4 refactor `renderAll` → 5 restock form →
6 boss checkout.

### Zoom runbook (2h)

| Time      | What                                                                                                                         | Mode                |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| 0:00–0:10 | The two-files talk (logic vs glue) + open `index.html` — empty shelves, "we fix this tonight"                                | screenshare         |
| 0:10–0:35 | Q1a/1b in `shop.js` until `npm run week3` is green for them; then **live-code Q1c together** (first innerHTML moment)        | solo → live-code    |
| 0:35–1:00 | Q2 search — recap the prep's on-load + on-event pattern first                                                                | solo                |
| 1:00–1:05 | Break                                                                                                                        | —                   |
| 1:05–1:30 | Q3 baskets — do the FIRST `addEventListener` + `dataset.name` read on screen, then pairs; let them hit the dead-buttons trap | screenshare → pairs |
| 1:30–1:45 | Q4 refactor + Q5 form (`preventDefault` mystery — say "browser default magic, keep the line")                                | solo                |
| 1:45–2:00 | Boss launch + live checkout demo; side quests; module wrap-up (see below)                                                    | solo → screenshare  |

**The wrap-up speech (don't skip it):** "Week 1, mutation was
the bug. Today, checkout _decrements_ stock — mutation is the
feature. The difference isn't the code — it's where the code
lives. Pure logic: testable, reusable, never mutates. Glue:
live, stateful, full of effects. You just built both layers of a
real web app."

### Per-quest: common mistakes + hint ladders

**1a `getStockLabel`** — symptom: "only 0 left!" Cause: checked
`<= 3` before `=== 0`. H1: order your three cases. H2: 0 first.

**1b `renderProductCard`** — symptom: `€2.5` instead of `€2.50`
(the gominolas test catches missing `toFixed`). H1: one template
literal. H2: `price.toFixed(2)`. H3: `data-name="${product.name}"`.
H4: the stock label calls your Q1a function.

**1c render** — symptom: empty page. H1: loop + `+=`.
H2: `productList.innerHTML = shelfHTML`. H3: check the console —
red is information.

**Q2 search** — symptom: works with exact case only, or page
never updates. H1: `searchInput.value`. H2: lowercase BOTH sides.
H3: re-render with results; empty term → `renderProducts()`.
H4: register the listener at the TODO at the bottom of the file.

**Q3 baskets** — symptom: buttons dead after searching.
Cause: `innerHTML` replaced the old buttons; listeners died
with them. THE trap of the week — let them hit it, then name it.
H1: `querySelectorAll(".add-button")` + loop. H2: inside the
loop, `"click"` listener calling `addToBasket`.
H3: read the name with `button.dataset.name` (the `data-name`
they planted in Q1b). H4: call `wireAddButtons()` at the end of
`renderProducts` — every fresh set of buttons gets fresh wires.

**Q4 refactor** — H1: what did the prep refactor in the
character-limit? Same move. H2: `renderAll` = renderProducts +
renderCart.

**Q5 form** — symptom: page reloads and "nothing happened"
(missing listener), or price "3.251.5" (string concatenation —
missing `Number()`). H1: find the five inputs, read `.value`.
H2: `Number()` the price and stock. H3: build the object, push,
`renderAll()`, `reset()`. H4: register for `"submit"` — and keep
`preventDefault`.

**Q6 boss** — symptom: stock never visibly drops (forgot
`renderAll`), or receipt wrong (looped products instead of cart).
H1: empty-basket check first. H2: receipt = loop over cart.
H3: decrement: `getProduct` then `product.stock -= 1`.
H4: clear cart, `renderAll()`, `celebrate()`.

**Demo moments:** after 1c (the shelves light up — applause),
after Q3 (dead-button trap live), boss checkout with confetti.

### Week 3 testing thread

The pure layer stays Jest-tested (`renderProductCard` string
tests with `toContain`, incl. the two-decimals catch), and the
lab has them loop-test every product's card. The glue is
deliberately untested — and the guide explains why (that's the
architecture lesson).

---

## 4. Catch-up strategy (all weeks)

- **Every week folder is self-contained.** A student who never
  finished week 1's boss still starts week 2 clean. Say this out
  loud in week 2.
- **Behind during class?** The rule: finish the _current_ core
  quest's tests first (helps if pairs share screens), homework is
  the catch-up time, and the hint ladders exist so nobody stalls
  alone. Use H1–H2 in class; H3–H4 only if they've tried.
- **Missed a week entirely?** Week 3 provides the week-2 logic
  functions ready-made in `shop.js`, so a total restart on week 3
  is viable. Point them at the QUESTS.md ✅ checks.
- **A student edited the tests to make them green?** The game
  crime 😄 — ask them to explain each assertion back to you, then
  `git checkout -- <testfile>` (another reason to distribute via
  git). Frame it kindly: Carmen double-checks her own orders.

## 5. Facilitation notes (remote)

- **Breakout rooms:** pair students across levels; put a strong
  student with a quieter one, not two stallers. 10–12 minutes,
  then pull everyone back for a 2-minute show.
- **The sim is your co-teacher:** when energy dips, run a shift
  on screen — students see _their_ installed skills work and the
  funny failures for missing ones. Zero skills installed = the
  cold open. Full rank = the finale.
- **Red is the curriculum.** Never fix a failing test on screen
  without first reading "Expected vs Received" out loud — that's
  the testing-skills goal of this module.
- **Slack ritual:** end each session asking everyone to post
  their XP + rank + one thing that surprised them. It seeds
  Monday's channel and normalises being mid-quest.
