// 🧠 SHOP LOGIC — week 3 · ✅ REFERENCE SOLUTIONS (teacher only!)
// Normally lives at solutions/week-3/shop.js.

function getProduct(products, name) {
  for (const product of products) {
    if (product.name === name) {
      return product;
    }
  }
  return undefined;
}

function getPrice(products, name) {
  const product = getProduct(products, name);
  if (product === undefined) {
    return undefined;
  }
  return product.price;
}

function filterByCategory(products, category) {
  const matches = [];
  for (const product of products) {
    if (product.category === category) {
      matches.push(product);
    }
  }
  return matches;
}

function getBasketTotal(products, basket) {
  let total = 0;
  for (const name of basket) {
    const price = getPrice(products, name);
    if (price !== undefined) {
      total += price;
    }
  }
  return total;
}

// 🏷️ Q1a — Stock labels
function getStockLabel(product) {
  if (product.stock === 0) {
    return "SOLD OUT";
  }
  if (product.stock <= 3) {
    return "only " + product.stock + " left!";
  }
  return "in stock";
}

// 🖼️ Q1b — The product card
function renderProductCard(product) {
  return (
    '<li class="product-card">' +
    '<span class="product-emoji">' +
    product.emoji +
    "</span>" +
    '<span class="product-name">' +
    product.name +
    "</span>" +
    '<span class="product-price">€' +
    product.price.toFixed(2) +
    "</span>" +
    '<button class="add-button" data-name="' +
    product.name +
    '">Add to basket</button>' +
    '<span class="stock-label">' +
    getStockLabel(product) +
    "</span>" +
    "</li>"
  );
}

// 🔍 Q2a — The search engine
function searchProducts(products, searchTerm) {
  const matches = [];
  const lowerTerm = searchTerm.toLowerCase();
  for (const product of products) {
    if (product.name.toLowerCase().includes(lowerTerm)) {
      matches.push(product);
    }
  }
  return matches;
}

// 🧾 SIDE — Category chips
function wireCategoryChips() {
  // runs in the browser; see solutions/week-3/script.js
}

// ⏰ MEGA SIDE — Rush hour
function startRushHour() {
  // runs in the browser; see solutions/week-3/script.js
}

if (typeof module !== "undefined") {
  module.exports = {
    getProduct,
    getPrice,
    filterByCategory,
    getBasketTotal,
    getStockLabel,
    renderProductCard,
    searchProducts,
  };
}
