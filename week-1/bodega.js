// 🏪 La Bodega de Gràcia — Doña Carmen's inventory.
//
// Week 1: the shop's stock lives on sticky notes — one note per
// item on the shelves. Carmen sometimes writes the same item twice.
// That's corner-shop life. (The duplicates will matter for Quest 1!)
//
// You don't need to edit this file. Boti reads it, the tests read
// it, and the simulator in week-1/simulator/ reads it.

const inventory = [
  "tortilla",
  "horchata",
  "churros",
  "croissant",
  "churros",
  "café con leche",
  "ensaimada",
  "tortilla",
  "bocadillo",
  "horchata",
  "olives",
  "crema catalana",
  "churros",
  "pan con tomate",
  "tortilla",
];

// ✨ Boti's USB port — leave this bit alone. It lets the tests
// (npm run week1) and the simulator plug into this file.
if (typeof module !== "undefined") {
  module.exports = { inventory };
}
