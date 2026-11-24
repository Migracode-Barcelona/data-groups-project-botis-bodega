// 🤖 BOTI'S BRAIN — week 1
//
// Every function in this file is one of Boti's skills.
// Every skill has a quest in QUESTS.md and a test in skills.test.js.
//
// HOW TO PLAY:
//   1. Pick a quest in QUESTS.md (start at the top)
//   2. Run the diagnostics:   npm run week1
//   3. Write the code here until the tests go green
//   4. Open simulator/index.html in your browser and watch
//      Boti use your new skill
//
// 🗣️ Rule of the game: never edit the tests. They are Doña
// Carmen's exact orders. If a test looks wrong, tell Doña
// Carmen (your teacher) — she checks the orders, not you.

// ---------------------------------------------------------------
// 🔦 QUEST 0 — Shelf map                                      10 XP
// ---------------------------------------------------------------
// Boti must learn where things live on the shelves.
//
// Given an array of items and a position (index)
// When we call getItemAt with them
// Then we get the item at that position.
// If nothing lives at that position, we get "nothing there".
function getItemAt(items, index) {
  // 🤖 TODO: Quest 0
}

// ---------------------------------------------------------------
// 🧮 QUEST 1 — Stock-take                                      20 XP
// ---------------------------------------------------------------
// "TORTILLA! I eat three a day — how many you got?"
//
// Given an array of items and an item name
// When we call countStock with them
// Then we get the number of times the item appears in the array.
// (If the item is not there at all, the answer is 0.)
function countStock(inventory, itemName) {
  // 🤖 TODO: Quest 1
}

// ---------------------------------------------------------------
// ❓ QUEST 2 — The customer's question                         20 XP
// ---------------------------------------------------------------
// Customers ask "do you have churros?" Boti must answer
// yes or no — before wandering the aisles forever.
//
// Given an array of items and an item name
// When we call hasItem with them
// Then we get true if the item is somewhere in the array,
// and false if it is not.
function hasItem(inventory, itemName) {
  // 🤖 TODO: Quest 2
}

// ---------------------------------------------------------------
// 📦 QUEST 3 — Restock day                                    30 XP
// ---------------------------------------------------------------
// The warehouse delivers new items. Carmen wants them ADDED
// to the stock list — but her original list must stay exactly
// as she wrote it. She keeps it on the wall. She checks it.
//
// Given an array of items and an array of new items
// When we call addItems with them
// Then we get a NEW array with the new items at the end,
// and the original array must be unchanged.
function addItems(inventory, newItems) {
  // 🤖 TODO: Quest 3
  // 💡 How do you make a NEW array? Where could a loop put
  //    the new items? Watch out — some array methods change
  //    the array you call them on...
}

// ---------------------------------------------------------------
// 🐞 QUEST 4 — BUG HUNT: The Great Horchata Recall            30 XP
// ---------------------------------------------------------------
// The horchata batch went off. Carmen orders a recall: pull
// EVERY horchata off the shelves.
//
// Boti already wrote this skill. It has THREE bugs, and the
// shop is suffering for it:
//   1. It only removes the FIRST horchata — the rest stay
//      on the shelves (customers get served sour horchata!).
//   2. If you ask it to recall something that isn't there,
//      it steals a completely different item! (spooky 👻)
//   3. It also wipes the horchata from Carmen's wall list —
//      now she can't reorder the batch!
//
// The tests in skills.test.js (Q4) will show you all three.
// 🕵️ You ARE allowed — and required — to change this function.
//
// Given an array of items and an item name
// When we call removeItem with them
// Then we get a NEW array without ANY of that item,
// and the original array must be unchanged.
// If the item isn't in the array, the new array keeps
// everything that was there.
function removeItem(inventory, itemName) {
  const index = inventory.indexOf(itemName);
  inventory.splice(index, 1);
  return inventory;
}

// ---------------------------------------------------------------
// 🏷️ QUEST 5 — The label gun                                   20 XP
// ---------------------------------------------------------------
// Carmen wants big shiny labels on every shelf, one per item,
// in the same order as the stock list.
//
// Given an array of items
// When we call makeShelfLabels with it
// Then we get a NEW array of strings, where every item became
// "SHELF: " + the item name in CAPITALS.
// e.g. ["churros", "tortilla"] -> ["SHELF: CHURROS", "SHELF: TORTILLA"]
// (An empty stock list gives an empty array of labels.)
function makeShelfLabels(inventory) {
  // 🤖 TODO: Quest 5
}

// ---------------------------------------------------------------
// 🏆 QUEST 6 — BOSS: Double delivery                           40 XP
// ---------------------------------------------------------------
// Tomorrow the warehouse sends TWO deliveries at once, and
// Carmen wants ONE clean list with no duplicates on it.
//
// Given two arrays of items
// When we call mergeDeliveries with them
// Then we get a NEW array with everything from the first
// delivery, followed by anything from the second delivery
// that the first one didn't already have.
// Both original deliveries must be unchanged.
function mergeDeliveries(deliveryA, deliveryB) {
  // 🤖 TODO: Quest 6
  // 💡 You already know every move this needs. That's the
  //    thing about bosses.
}

// ---------------------------------------------------------------
// 🌈 SIDE QUESTS — optional, never block the next week
// ---------------------------------------------------------------

// 🌸 SIDE QUEST — Mystery box                        15 XP
// Carmen keeps one "mystery item" behind the counter.
//
// Given an array of items
// When we call pickMysteryItem with it
// Then we get ONE of the items in the array — any of them!
// (An empty array is a mystery too... whatever you like.)
function pickMysteryItem(items) {
  // 🤖 TODO: Side quest — see lab.test.js
}

// ⭐ MEGA SIDE QUEST — Alphabetical shelves          25 XP
// Carmen's new idea: shelve everything A → Z.
//
// Given an array of items
// When we call sortAlphabetically with it
// Then we get a NEW array with the same items in alphabetical
// order, and the original array must be unchanged.
//
// ⚠️ Research tip: there IS a method that sorts arrays —
// but it changes the array you call it on! The phantom's
// favourite trick. Sort a copy instead. 🕵️
function sortAlphabetically(items) {
  // 🤖 TODO: Mega side quest — see QUESTS.md
}

// ✨ Boti's USB port — do not edit below this line.
// This is the cable that lets the tests (npm run week1) and the
// simulator (simulator/index.html) plug into Boti's brain.
if (typeof module !== "undefined") {
  module.exports = {
    getItemAt,
    countStock,
    hasItem,
    addItems,
    removeItem,
    makeShelfLabels,
    mergeDeliveries,
    pickMysteryItem,
    sortAlphabetically,
  };
}
