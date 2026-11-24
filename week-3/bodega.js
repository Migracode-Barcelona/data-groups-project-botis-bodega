// 🏪 La Bodega de Gràcia — the online stock room.
//
// Week 3: the same ledger as week 2 — same products, same
// properties. Now it feeds a REAL web page.
//
// You don't need to edit this file. shop.js and script.js read it.

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

// ✨ Boti's USB port — leave this bit alone.
if (typeof module !== "undefined") {
  module.exports = { products };
}
