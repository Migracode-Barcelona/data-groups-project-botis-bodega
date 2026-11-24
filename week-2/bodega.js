// 🏪 La Bodega de Gràcia — Doña Carmen's NEW LEDGER.
//
// Week 2: business is booming (El MegaMercado opened across the
// street!). Sticky notes with duplicate names won't cut it any
// more. Carmen bought a proper ledger: every product is ONE line,
// with a name, a price, a stock count, an emoji for the shelf,
// and a category.
//
// Compare with week 1: back then "churros" appearing twice was
// how we counted stock. Now every product has its own `stock`
// number instead. One line per product, and duplicates are gone.
//
// You don't need to edit this file. Boti reads it, the tests read
// it, and the simulator in week-2/simulator/ reads it.

const products = [
  { name: "tortilla", price: 3.25, stock: 4, emoji: "🥘", category: "food" },
  { name: "horchata", price: 1.25, stock: 12, emoji: "🥤", category: "drinks" },
  { name: "churros", price: 2.5, stock: 0, emoji: "🍩", category: "food" },
  { name: "croissant", price: 1.75, stock: 8, emoji: "🥐", category: "bakery" },
  { name: "ensaimada", price: 2.25, stock: 6, emoji: "🌀", category: "bakery" },
  {
    name: "crema catalana",
    price: 3.5,
    stock: 3,
    emoji: "🍮",
    category: "food",
  },
  { name: "bocadillo", price: 4.5, stock: 5, emoji: "🥪", category: "food" },
  {
    name: "café con leche",
    price: 1.5,
    stock: 20,
    emoji: "☕",
    category: "drinks",
  },
  {
    name: "pan con tomate",
    price: 3.75,
    stock: 7,
    emoji: "🍞",
    category: "food",
  },
  { name: "olives", price: 2.0, stock: 15, emoji: "🫒", category: "snacks" },
  { name: "agua", price: 0.75, stock: 24, emoji: "💧", category: "drinks" },
  { name: "gominolas", price: 1.0, stock: 9, emoji: "🍬", category: "snacks" },
];

// ✨ Boti's USB port — leave this bit alone. It lets the tests
// (npm run week2) and the simulator plug into this file.
if (typeof module !== "undefined") {
  module.exports = { products };
}
