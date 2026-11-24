// 🤖 BOTI'S BRAIN — week 1 · ✅ REFERENCE SOLUTIONS (teacher only!)
// Normally lives at solutions/week-1/skills.js.

// 🔦 Q0 — Shelf map
function getItemAt(items, index) {
  const item = items[index];
  if (item === undefined) {
    return "nothing there";
  }
  return item;
}

// 🧮 Q1 — Stock-take
function countStock(inventory, itemName) {
  let count = 0;
  for (const item of inventory) {
    if (item === itemName) {
      count += 1;
    }
  }
  return count;
}

// ❓ Q2 — The customer's question
function hasItem(inventory, itemName) {
  for (const item of inventory) {
    if (item === itemName) {
      return true;
    }
  }
  return false;
}

// 📦 Q3 — Restock day
function addItems(inventory, newItems) {
  const newList = [];
  for (const item of inventory) {
    newList.push(item);
  }
  for (const item of newItems) {
    newList.push(item);
  }
  return newList;
}

// 🐞 Q4 — BUG HUNT: The Great Horchata Recall (fixed)
function removeItem(inventory, itemName) {
  const remaining = [];
  for (const item of inventory) {
    if (item !== itemName) {
      remaining.push(item);
    }
  }
  return remaining;
}

// 🏷️ Q5 — The label gun
function makeShelfLabels(inventory) {
  const labels = [];
  for (const item of inventory) {
    labels.push("SHELF: " + item.toUpperCase());
  }
  return labels;
}

// 🏆 Q6 — BOSS: Double delivery
function mergeDeliveries(deliveryA, deliveryB) {
  const merged = [];
  for (const item of deliveryA) {
    merged.push(item);
  }
  for (const item of deliveryB) {
    if (!hasItem(merged, item)) {
      merged.push(item);
    }
  }
  return merged;
}

// 🌸 SIDE — Mystery box
function pickMysteryItem(items) {
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

// ⭐ MEGA SIDE — Alphabetical shelves (sort a copy!)
function sortAlphabetically(items) {
  const copy = [];
  for (const item of items) {
    copy.push(item);
  }
  copy.sort();
  return copy;
}

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
