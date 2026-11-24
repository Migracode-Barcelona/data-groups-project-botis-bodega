// 🤖 BOTI'S BRAIN — week 2 · ✅ REFERENCE SOLUTIONS (teacher only!)
// Normally lives at solutions/week-2/skills.js.

// 📖 Q1 — Read the ledger
function getProduct(products, name) {
  for (const product of products) {
    if (product.name === name) {
      return product;
    }
  }
  return undefined;
}

// 🏷️ Q2 — Price check
function getPrice(products, name) {
  const product = getProduct(products, name);
  if (product === undefined) {
    return undefined;
  }
  return product.price;
}

// 😤 Q3 — The picky customer
function isInStock(products, name) {
  const product = getProduct(products, name);
  if (product === undefined) {
    return false;
  }
  return product.stock > 0;
}

// 🛒 Q4 — Basket run
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

// 💸 Q5a — Happy hour
function applyDiscount(product, percent) {
  const discount = (product.price * percent) / 100;
  product.price = product.price - discount;
  return product;
}

// 🎟️ Q5b — The coupon
function makeDiscountedCopy(product, percent) {
  const discount = (product.price * percent) / 100;
  return {
    name: product.name,
    price: product.price - discount,
    stock: product.stock,
    emoji: product.emoji,
    category: product.category,
  };
}

// 🔎 Q6 — The search bar
function parseShopQuery(queryString) {
  const queryParams = {};
  if (queryString.length === 0) {
    return queryParams;
  }
  const pairs = queryString.split("&");
  for (const pair of pairs) {
    const [key, value] = pair.split("=");
    queryParams[key] = value;
  }
  return queryParams;
}

// 🧹 Q7 — Tidy the shelves
function filterByCategory(products, category) {
  const matches = [];
  for (const product of products) {
    if (product.category === category) {
      matches.push(product);
    }
  }
  return matches;
}

// 🏆 Q8a — BOSS part 1
function getCheapestProduct(products) {
  let cheapest = products[0];
  for (const product of products) {
    if (product.price < cheapest.price) {
      cheapest = product;
    }
  }
  return cheapest;
}

// 🏆 Q8b — BOSS part 2
function makeReport(products) {
  let totalValue = 0;
  for (const product of products) {
    totalValue += product.price * product.stock;
  }
  let cheapest = undefined;
  if (products.length > 0) {
    cheapest = getCheapestProduct(products).name;
  }
  return {
    itemCount: products.length,
    totalValue: totalValue,
    cheapest: cheapest,
  };
}

// 🧊 SIDE — Deep freeze
function getOutOfStock(products) {
  const names = [];
  for (const product of products) {
    if (product.stock === 0) {
      names.push(product.name);
    }
  }
  return names;
}

// 🧾 SIDE — Receipt printer
function printReceipt(products, basket) {
  let receipt = "";
  for (const name of basket) {
    const price = getPrice(products, name);
    if (price !== undefined) {
      receipt += name + " — €" + price.toFixed(2) + "\n";
    }
  }
  receipt += "TOTAL: €" + getBasketTotal(products, basket).toFixed(2) + "\n";
  receipt += "gràcies! 🤖";
  return receipt;
}

// ⭐ MEGA — Customer profiles
function canAfford(customer, product) {
  return product.price <= customer.budget && product.stock > 0;
}

function recommendFor(customer, products) {
  const picks = [];
  const favourites = filterByCategory(products, customer.favoriteCategory);
  for (const product of favourites) {
    if (canAfford(customer, product)) {
      picks.push(product);
    }
  }
  return picks;
}

if (typeof module !== "undefined") {
  module.exports = {
    getProduct,
    getPrice,
    isInStock,
    getBasketTotal,
    applyDiscount,
    makeDiscountedCopy,
    parseShopQuery,
    filterByCategory,
    getCheapestProduct,
    makeReport,
    getOutOfStock,
    printReceipt,
    canAfford,
    recommendFor,
  };
}
