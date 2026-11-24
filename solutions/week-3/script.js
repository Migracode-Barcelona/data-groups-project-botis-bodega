// 🎬 THE GLUE — week 3 · ✅ REFERENCE SOLUTIONS (teacher only!)
// Normally lives at solutions/week-3/script.js.

const productList = document.querySelector("#product-list");
const searchInput = document.querySelector("#search-input");
const cartList = document.querySelector("#cart-list");
const cartTotal = document.querySelector("#cart-total");
const checkoutButton = document.querySelector("#checkout-button");
const receipt = document.querySelector("#receipt");
const restockForm = document.querySelector("#restock-form");
const banner = document.querySelector("#megamercado-banner");

const cart = [];

// 🖼️ Q1c — Open the shutters

function renderProducts(listToShow) {
  const list = listToShow || products;
  let shelfHTML = "";
  for (const product of list) {
    shelfHTML += renderProductCard(product);
  }
  productList.innerHTML = shelfHTML;
  wireAddButtons();
}

// 🔍 Q2 — Live search

function handleSearch() {
  const term = searchInput.value;
  if (term === "") {
    renderProducts();
    return;
  }
  renderProducts(searchProducts(products, term));
}

// 🛒 Q3 — Baskets online

function wireAddButtons() {
  const buttons = document.querySelectorAll(".add-button");
  for (const button of buttons) {
    button.addEventListener("click", () => {
      addToBasket(button.dataset.name);
    });
  }
}

function addToBasket(name) {
  cart.push(name);
  renderCart();
}

function renderCart() {
  let cartHTML = "";
  for (const name of cart) {
    const product = getProduct(products, name);
    if (product !== undefined) {
      cartHTML +=
        "<li>" + product.name + " — €" + product.price.toFixed(2) + "</li>";
    }
  }
  cartList.innerHTML = cartHTML;
  const total = getBasketTotal(products, cart);
  cartTotal.textContent =
    cart.length === 0 ? "" : "Total: €" + total.toFixed(2);
}

// 🧹 Q4 — The refactor

function renderAll() {
  renderProducts();
  renderCart();
}

// 📦 Q5 — The employee portal

function handleRestock(event) {
  event.preventDefault();

  const nameInput = document.querySelector("#product-name");
  const priceInput = document.querySelector("#product-price");
  const stockInput = document.querySelector("#product-stock");
  const emojiInput = document.querySelector("#product-emoji");
  const categoryInput = document.querySelector("#product-category");

  const newProduct = {
    name: nameInput.value,
    price: Number(priceInput.value),
    stock: Number(stockInput.value),
    emoji: emojiInput.value || "🥫",
    category: categoryInput.value || "food",
  };

  products.push(newProduct);
  renderAll();
  restockForm.reset();
}

// 🏆 Q6 — BOSS: Launch day

function handleCheckout() {
  if (cart.length === 0) {
    receipt.textContent = "Your basket is empty! MegaMercado is laughing. 🏢";
    return;
  }

  let receiptHTML = "🧾 LA BODEGA DE GRÀCIA\n";
  for (const name of cart) {
    const product = getProduct(products, name);
    if (product !== undefined) {
      receiptHTML += product.name + " — €" + product.price.toFixed(2) + "\n";
    }
  }
  receiptHTML += "TOTAL: €" + getBasketTotal(products, cart).toFixed(2);
  receipt.textContent = receiptHTML;

  for (const name of cart) {
    const product = getProduct(products, name);
    if (product !== undefined) {
      product.stock -= 1;
    }
  }

  cart.length = 0;
  renderAll();
  celebrate();
}

// 🎉 The party cannon

function celebrate() {
  const emojis = ["🎉", "🥳", "🎊", "✨", "🏆"];
  for (let i = 0; i < 40; i += 1) {
    const drop = document.createElement("span");
    drop.className = "confetti";
    drop.textContent = emojis[i % emojis.length];
    drop.style.left = Math.random() * 100 + "%";
    drop.style.animationDelay = Math.random() * 0.9 + "s";
    document.body.appendChild(drop);
    setTimeout(() => drop.remove(), 2800);
  }
  banner.classList.add("show");
}

// 🔌 Wire it up

searchInput.addEventListener("input", handleSearch);
restockForm.addEventListener("submit", handleRestock);
checkoutButton.addEventListener("click", handleCheckout);

// 🚀 On page load

renderAll();
