# 🤖 Week 1 — Boti's First Day

> **The story so far...**
>
> Doña Carmen runs La Bodega de Gràcia, a tiny corner shop in
> Barcelona. Business is good, her knees are tired, so she bought
> a second-hand shopkeeper robot from the feria: **Boti**.
>
> Boti has a smiling face, shiny wheels... and a completely empty
> brain. The seller's last words were: _"You'll need a programmer."_
>
> That's you. Welcome to your first day at the bodega.
>
> Across the street, **El MegaMercado** is watching. 🏢

## 🎮 How this week works

- Boti's brain is the file **`skills.js`** (next to this file).
- Each **quest** below is one of Boti's skills — one function.
- The **diagnostics** live in `skills.test.js`. Run them:

  ```zsh
  npm run week1
  ```

- ⚠️ **Red tests are normal.** Red means "skill not installed".
  Your job is to make them green.
- Never edit the tests — they are Doña Carmen's exact orders.
- After each quest, open **`simulator/index.html`** in your
  browser (double-click it) and press **▶ Run a shift** to watch
  Boti use your code. The 🧠 brain scan panel tracks your skills,
  XP and rank.

**Total XP this week: 170. Collect them all to become Bodega Boss.**

| #   | Quest                                  | Skill             | XP  |
| --- | -------------------------------------- | ----------------- | --- |
| 0   | 🔦 Shelf map                           | `getItemAt`       | 10  |
| 1   | 🧮 Stock-take                          | `countStock`      | 20  |
| 2   | ❓ The customer's question             | `hasItem`         | 20  |
| 3   | 📦 Restock day                         | `addItems`        | 30  |
| 4   | 🐞 BUG HUNT: The Great Horchata Recall | `removeItem`      | 30  |
| 5   | 🏷️ The label gun                       | `makeShelfLabels` | 20  |
| 6   | 🏆 BOSS: Double delivery               | `mergeDeliveries` | 40  |

---

## 🔦 Quest 0 — Shelf map _(10 XP)_

**Doña Carmen says:** _"The shelves are numbered, Boti. Learn the numbers."_

> _Given_ an array of items and a position (index)
> _When_ we call `getItemAt` with them
> _Then_ we get the item at that position.
> If nothing lives at that position, we get `"nothing there"`.

Carmen counts shelves like a programmer: **the first one is 0**.
When Boti looks at a shelf where nothing lives, `items[index]`
gives back `undefined` — you've seen that word in Jest's
"Received" field. Boti should say `"nothing there"` instead.

<details>
<summary>🧠 Boti's memory bank (hints — open only if stuck)</summary>

1. Look up a value by position: `items[index]`.
2. If that value is `undefined`, return `"nothing there"`.
3. Otherwise return the value.

</details>

---

## 🧮 Quest 1 — Stock-take _(20 XP)_

**Big Tony** 💪 bursts in: _"TORTILLA! I eat three a day — how many you got?"_

> _Given_ an array of items and an item name
> _When_ we call `countStock` with them
> _Then_ we get the number of times the item appears in the array.

Remember: `inventory` is just an array of strings, and Carmen's
sticky notes have **duplicates** — you're counting occurrences,
not just checking if it's there.

<details>
<summary>🧠 Boti's memory bank</summary>

1. Start a count at `0`.
2. Loop over the list with `for...of`.
3. When an item is exactly the one you're looking for (`===`),
   add `1` to the count.
4. Return the count.

</details>

---

## ❓ Quest 2 — The customer's question _(20 XP)_

**Marta** 🧘‍♀️: _"¿Tienes churros?"_ Boti must answer yes or no —
not stand there humming until closing time.

> _Given_ an array of items and an item name
> _When_ we call `hasItem` with them
> _Then_ we get `true` if the item is anywhere in the array,
> and `false` if it isn't.

<details>
<summary>🧠 Boti's memory bank</summary>

1. Loop over the list.
2. If you meet the item you're looking for — you can stop
   immediately and `return true`.
3. If the loop ends and you never met it, `return false`.
4. (Yes, arrays have a `.includes()` method. Try it after your
   loop works — and ask yourself: what would Carmen say about
   skills you can't explain?)

</details>

---

## 📦 Quest 3 — Restock day _(30 XP)_

The warehouse van arrives 🚚. Carmen hands Boti the delivery and
points at **her wall list** — a hand-written copy of the stock.

> _Given_ an array of items and an array of new items
> _When_ we call `addItems` with them
> _Then_ we get a **NEW array** with the new items added at the end.
> _And_ Carmen's original array must stay **exactly** as it was.

⚠️ Look carefully at the diagnostics: **two tests** guard this
quest. The second one is the wall list. If you mutate Carmen's
array, the simulator will detect it — and it is _loud_.

<details>
<summary>🧠 Boti's memory bank</summary>

1. How do you build a brand-new array from scratch?
   (You did it in Quest 5 of your testing week... we mean the
   `doubleAllNumbers` warm-up from prep!)
2. Copy every old item in, one by one.
3. Then copy every new item in.
4. Return the new array. Never touch the originals.

</details>

---

## 🐞 Quest 4 — BUG HUNT: The Great Horchata Recall _(30 XP)_

🚨 **Incident report:** the horchata batch went off. Carmen orders
a recall: pull **every** horchata off the shelves.

Boti says: _"already did it, boss!"_ — but three strange things
happened. The tests in `skills.test.js` (Q4) describe all three:

1. Only the **first** horchata was removed. The rest stayed on
   the shelves (customers got the sour ones! 🤢).
2. When Boti was asked to recall an item that wasn't there at
   all, **a completely different item disappeared**. Spooky. 👻
3. Carmen's wall list lost its horchata too — now she can't
   reorder the batch!

**Your mission:** read the failing Q4 tests, _play computer_ on
Boti's `splice` code to explain each bug, then rewrite the
function. You are allowed — and required — to change
`removeItem`. That's the whole point of a bug hunt.

> _Given_ an array of items and an item name
> _When_ we call `removeItem` with them
> _Then_ we get a **NEW array** without **any** of that item,
> and the original array must be unchanged.
> If the item isn't in the array, the new list keeps everything.

<details>
<summary>🧠 Boti's memory bank</summary>

1. Bug 1: `splice` removes only ONE item — that's why Carmen
   says "new array, built from scratch" instead.
2. Bug 2: when `indexOf` doesn't find the item it returns `-1`.
   What does `splice(-1, 1)` do? Play computer!
3. Bug 3: `splice` mutates. Same cure as Quest 3.
4. The clean fix: build a new array and only keep items that are
   _not_ the recalled one.

</details>

---

## 🏷️ Quest 5 — The label gun _(20 XP)_

Carmen bought a label gun 🔫🏷️. Every item needs a big label.

> _Given_ an array of items
> _When_ we call `makeShelfLabels` with it
> _Then_ we get a NEW array of strings where every item became
> `"SHELF: "` + the name in CAPITALS.
> An empty stock list gives an empty array.

<details>
<summary>🧠 Boti's memory bank</summary>

1. `"SHELF: " + item` builds the label — or a template literal.
2. `toUpperCase()` shouts for you.
3. New array, loop, push, return. You know this dance by now.

</details>

---

## 🏆 Quest 6 — BOSS: Double delivery _(40 XP)_

Tomorrow the warehouse sends **two vans at once**. Carmen wants
one clean list, no duplicates, ready for the shelves.

> _Given_ two arrays of items
> _When_ we call `mergeDeliveries` with them
> _Then_ we get a NEW array with everything from the first
> delivery, followed by anything from the second delivery that
> the first didn't already have.
> Both original deliveries stay unchanged.

Bosses don't teach new moves. They make you use **all the old
moves at once**. When you beat this one, check the brain scan —
Bodega Boss rank awaits. 😎

<details>
<summary>🧠 Boti's memory bank</summary>

1. Start from the first list (a copy!).
2. Then look at each item of the second list: have you already
   got it?
3. Only add what's missing.
4. Which skill from this week tells you if you already have it?

</details>

---

## 🌈 Side quests — optional, never block week 2

These live in `skills.js` (bottom) and `lab.test.js`. Saturday
heroes and evening explorers — this is your queue:

| Quest                         | Skill                | XP  | Where                     |
| ----------------------------- | -------------------- | --- | ------------------------- |
| 🌸 Mystery box                | `pickMysteryItem`    | 15  | spec in `lab.test.js`     |
| 🧪 Lab: write your own tests  | —                    | 20  | template in `lab.test.js` |
| ⭐ Mega: alphabetical shelves | `sortAlphabetically` | 25  | spec below                |

**⭐ Alphabetical shelves** — _Given_ an array of items, _when_ we
call `sortAlphabetically`, _then_ we get a NEW array with the
same items sorted A → Z, and the original stays unchanged.
Warning: `.sort()` is a mutator in disguise. It sorts the array
you call it on. Sort a copy — how do you make a copy, by now?
Check yourself with `console.log`, or write your own test in the
lab. You know how. 😉

---

## 🆘 Stuck?

1. Re-read the quest. Say the Given/When/Then out loud.
2. Open the 🧠 memory bank **only** after step 1.
3. Run the diagnostics and read the **Expected** vs **Received**
   carefully. They are telling you a story.
4. Still stuck? Post in Slack with: the quest number, the test
   output, and one sentence about what you _expected_ to happen.
   Asking for help is a job skill — even Boti asks Carmen.
