// 🤖 BOTI'S BRAIN SCAN + SHIFT SIMULATOR — week 2
//
// The game engine (pre-written, uses JavaScript from the future).
// Your code lives in ../skills.js. This file plugs your skills
// into the scene: the brain scan, the customers, Carmen's search
// bar, the Happy Hour button, and the MegaMercado audit.

(function () {
  "use strict";

  // ---------- tiny helpers ---------------------------------------

  const $ = (selector) => document.querySelector(selector);
  const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const euros = (amount) => "€" + Number(amount).toFixed(2);
  const pretty = (value) => {
    if (value === undefined) return "undefined";
    const text = JSON.stringify(value);
    return text.length > 40 ? text.slice(0, 40) + "…" : text;
  };

  let speedFactor = 1;
  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms * speedFactor));

  // ---------- skill definitions ----------------------------------

  const CORE_SKILLS = [
    {
      id: "getProduct",
      quest: "Q1",
      label: "Read the ledger",
      xp: 15,
      probe: () => {
        const ledger = [{ name: "agua", price: 0.75, stock: 4 }];
        return (
          getProduct(ledger, "agua").name === "agua" &&
          getProduct(ledger, "caviar") === undefined
        );
      },
    },
    {
      id: "getPrice",
      quest: "Q2",
      label: "Price check",
      xp: 15,
      probe: () => {
        const ledger = [
          { name: "agua", price: 0.75, stock: 4 },
          { name: "tortilla", price: 3.25, stock: 2 },
        ];
        return (
          getPrice(ledger, "tortilla") === 3.25 &&
          getPrice(ledger, "caviar") === undefined
        );
      },
    },
    {
      id: "isInStock",
      quest: "Q3",
      label: "Picky customer",
      xp: 20,
      probe: () => {
        const ledger = [
          { name: "churros", price: 2.5, stock: 0 },
          { name: "tortilla", price: 3.25, stock: 4 },
        ];
        return (
          isInStock(ledger, "tortilla") === true &&
          isInStock(ledger, "churros") === false &&
          isInStock(ledger, "caviar") === false
        );
      },
    },
    {
      id: "getBasketTotal",
      quest: "Q4",
      label: "Basket run",
      xp: 25,
      probe: () => {
        const ledger = [
          { name: "agua", price: 0.75, stock: 4 },
          { name: "tortilla", price: 3.25, stock: 2 },
        ];
        return (
          getBasketTotal(ledger, ["agua", "tortilla"]) === 4 &&
          getBasketTotal(ledger, []) === 0
        );
      },
    },
    {
      id: "applyDiscount",
      quest: "Q5a",
      label: "Happy hour",
      xp: 20,
      probe: () => {
        const bocadillo = { name: "bocadillo", price: 4.5, stock: 5 };
        const result = applyDiscount(bocadillo, 50);
        return bocadillo.price === 2.25 && result === bocadillo;
      },
    },
    {
      id: "makeDiscountedCopy",
      quest: "Q5b",
      label: "The coupon",
      xp: 25,
      probe: () => {
        const cafe = { name: "café con leche", price: 1.5, stock: 20 };
        const coupon = makeDiscountedCopy(cafe, 50);
        return (
          coupon !== cafe &&
          cafe.price === 1.5 &&
          coupon.price === 0.75 &&
          coupon.name === "café con leche"
        );
      },
    },
    {
      id: "parseShopQuery",
      quest: "Q6",
      label: "Search bar",
      xp: 25,
      probe: () =>
        deepEqual(parseShopQuery("category=drinks&max=2"), {
          category: "drinks",
          max: "2",
        }) && deepEqual(parseShopQuery(""), {}),
    },
    {
      id: "filterByCategory",
      quest: "Q7",
      label: "Tidy the shelves",
      xp: 20,
      probe: () => {
        const ledger = [
          { name: "agua", category: "drinks", price: 0.75, stock: 4 },
          { name: "tortilla", category: "food", price: 3.25, stock: 2 },
        ];
        const drinks = filterByCategory(ledger, "drinks");
        return (
          drinks.length === 1 &&
          drinks[0].name === "agua" &&
          filterByCategory(ledger, "toys").length === 0
        );
      },
    },
    {
      id: "getCheapestProduct",
      quest: "Q8a",
      label: "Cheapest thing (BOSS)",
      xp: 20,
      probe: () => {
        const ledger = [
          { name: "bocadillo", price: 4.5, stock: 5 },
          { name: "agua", price: 0.75, stock: 24 },
        ];
        return getCheapestProduct(ledger).name === "agua";
      },
    },
    {
      id: "makeReport",
      quest: "Q8b",
      label: "MegaMercado audit (BOSS)",
      xp: 30,
      probe: () => {
        const ledger = [
          { name: "agua", price: 0.75, stock: 4 },
          { name: "tortilla", price: 3.25, stock: 2 },
        ];
        return deepEqual(makeReport(ledger), {
          itemCount: 2,
          totalValue: 9.5,
          cheapest: "agua",
        });
      },
    },
  ];

  const BONUS_SKILLS = [
    {
      id: "getOutOfStock",
      label: "🧊 Deep freeze",
      probe: () => {
        const freezer = [
          { name: "helado", stock: 0 },
          { name: "tortilla", stock: 4 },
          { name: "churros", stock: 0 },
        ];
        return deepEqual(getOutOfStock(freezer), ["helado", "churros"]);
      },
    },
    {
      id: "printReceipt",
      label: "🧾 Receipt printer",
      probe: () => {
        const ledger = [{ name: "agua", price: 0.75, stock: 4 }];
        const receipt = printReceipt(ledger, ["agua"]);
        return (
          typeof receipt === "string" &&
          receipt.includes("TOTAL") &&
          receipt.includes("gràcies")
        );
      },
    },
    {
      id: "canAfford",
      label: "⭐ canAfford",
      probe: () =>
        canAfford(
          { name: "Marta", budget: 2, favoriteCategory: "drinks" },
          {
            name: "agua",
            price: 0.75,
            stock: 4,
          },
        ) === true &&
        canAfford(
          { name: "Marta", budget: 2, favoriteCategory: "drinks" },
          {
            name: "tortilla",
            price: 3.25,
            stock: 4,
          },
        ) === false &&
        canAfford(
          { name: "Marta", budget: 2, favoriteCategory: "drinks" },
          {
            name: "churros",
            price: 2.5,
            stock: 0,
          },
        ) === false,
    },
    {
      id: "recommendFor",
      label: "⭐ recommendFor",
      probe: () => {
        const ledger = [
          { name: "agua", price: 0.75, stock: 4, category: "drinks" },
          { name: "tortilla", price: 3.25, stock: 2, category: "food" },
        ];
        const picks = recommendFor(
          { name: "Marta", budget: 2, favoriteCategory: "drinks" },
          ledger,
        );
        return picks.length === 1 && picks[0].name === "agua";
      },
    },
  ];

  const RANKS = [
    { min: 10, name: "😎 Bodega Boss" },
    { min: 8, name: "🌟 Shift Leader" },
    { min: 5, name: "🛍️ Junior Clerk" },
    { min: 2, name: "🧑‍🏭 Intern Boti" },
    { min: 0, name: "📦 Cardboard Boti" },
  ];

  // ---------- brain scan (dashboard) ------------------------------

  function scan(skill) {
    if (typeof window[skill.id] !== "function") {
      return "missing";
    }
    try {
      return skill.probe() ? "installed" : "broken";
    } catch (error) {
      return "broken";
    }
  }

  function chipFor(skill, status) {
    const li = document.createElement("li");
    li.className = "skill-chip " + status;
    const icon =
      status === "installed" ? "🟢" : status === "broken" ? "🔴" : "⚪";
    const left = document.createElement("span");
    left.textContent = `${icon} ${skill.quest ? skill.quest + " · " : ""}${
      skill.label
    }`;
    const right = document.createElement("span");
    right.className = "xp-tag";
    right.textContent = status === "installed" ? `${skill.xp} XP ✓` : "—";
    li.append(left, right);
    return li;
  }

  function renderDashboard() {
    let installedCount = 0;
    let xp = 0;
    const chips = $("#skill-chips");
    chips.innerHTML = "";
    for (const skill of CORE_SKILLS) {
      const status = scan(skill);
      if (status === "installed") {
        installedCount += 1;
        xp += skill.xp;
      }
      chips.appendChild(chipFor(skill, status));
    }

    const bonus = $("#bonus-chips");
    bonus.innerHTML = "";
    for (const skill of BONUS_SKILLS) {
      bonus.appendChild(chipFor(skill, scan(skill)));
    }

    $("#skills-count").textContent =
      installedCount + " / " + CORE_SKILLS.length + " skills installed";
    $("#xp").textContent = xp + " XP this week";
    const rank = RANKS.find((entry) => installedCount >= entry.min);
    $("#rank").textContent = rank.name;
    return installedCount;
  }

  // ---------- scene pieces ------------------------------------------

  // a fresh copy of Carmen's pristine ledger, so every shift
  // starts clean no matter what happy hour did yesterday
  const freshLedger = () => products.map((product) => ({ ...product }));

  const state = { products: freshLedger() };

  function pristinePrice(name) {
    const original = products.find((p) => p.name === name);
    return original ? original.price : undefined;
  }

  function renderShelves(listToShow) {
    const list = listToShow || state.products;
    const ul = $("#product-list");
    ul.innerHTML = "";
    for (const product of list) {
      const li = document.createElement("li");
      li.className = "product-card";
      const original = pristinePrice(product.name);
      if (typeof original === "number" && product.price < original) {
        li.classList.add("discounted");
      }
      const emoji = document.createElement("span");
      emoji.className = "product-emoji";
      emoji.textContent = product.emoji;
      const name = document.createElement("span");
      name.className = "product-name";
      name.textContent = product.name;
      const price = document.createElement("span");
      price.className = "price-chip";
      price.textContent = euros(product.price);
      const stock = document.createElement("span");
      stock.className = "stock-chip" + (product.stock === 0 ? " zero" : "");
      stock.textContent =
        product.stock === 0 ? "SOLD OUT" : product.stock + " left";
      li.append(emoji, name, price, stock);
      ul.appendChild(li);
    }
    // show the scroll hint only when the shelf actually overflows
    const hint = $("#scroll-hint");
    if (hint !== null) {
      hint.style.display = ul.scrollWidth > ul.clientWidth ? "inline" : "none";
    }
  }

  async function say(text, voice) {
    const bubble = $("#bubble");
    bubble.className = "bubble show " + voice;
    bubble.textContent = text;
    await sleep(Math.min(900 + text.length * 22, 2600));
  }

  const botiSays = (text) => say("🤖 " + text, "boti-voice");
  const carmenSays = (text) => say("👩‍🍳 " + text, "carmen-voice");
  const customerSays = (text) => say(text, "carmen-voice");

  function enterCustomer(emoji, name) {
    $("#customer-emoji").textContent = emoji;
    $("#customer-name").textContent = name;
    $("#customer").classList.add("entered");
  }

  function exitCustomer() {
    $("#customer").classList.remove("entered");
  }

  function smoke() {
    const boti = $("#boti");
    boti.classList.remove("smoking");
    void boti.offsetWidth;
    boti.classList.add("smoking");
    const layer = $("#smoke-layer");
    layer.innerHTML = "";
    for (let i = 0; i < 3; i += 1) {
      const puff = document.createElement("span");
      puff.textContent = "💨";
      puff.className = "puff";
      puff.style.animationDelay = i * 0.25 + "s";
      layer.appendChild(puff);
    }
  }

  function rain(emojis) {
    const scene = $("#scene");
    for (let i = 0; i < 26; i += 1) {
      const drop = document.createElement("span");
      drop.className = "rain-emoji";
      drop.textContent = emojis[i % emojis.length];
      drop.style.left = 5 + Math.random() * 90 + "%";
      drop.style.animationDelay = Math.random() * 1.2 + "s";
      scene.appendChild(drop);
      setTimeout(() => drop.remove(), 3200);
    }
  }

  function logLine(text, kind) {
    const log = $("#shift-log");
    const li = document.createElement("li");
    li.textContent = text;
    if (kind) {
      li.className = kind;
    }
    log.appendChild(li);
    log.scrollTop = log.scrollHeight;
  }

  function call(name, args) {
    if (typeof window[name] !== "function") {
      return { ok: false, status: "missing" };
    }
    let result;
    try {
      result = window[name].apply(null, args);
    } catch (error) {
      return { ok: false, status: "broken", error: error };
    }
    // a stub runs without crashing but returns undefined — that is
    // NOT a working skill. Jest shows the same thing as
    // "Received: undefined".
    if (result === undefined) {
      return { ok: false, status: "stub" };
    }
    return { ok: true, result: result };
  }

  async function useSkill(name, args, reason) {
    const attempt = call(name, args);
    if (!attempt.ok) {
      smoke();
      if (attempt.status === "missing") {
        await botiSays("💥 " + name + " is not installed — SMOKE EVERYWHERE!");
        logLine("💥 " + reason + " — skill '" + name + "' is missing.", "bad");
      } else if (attempt.status === "stub") {
        await botiSays(
          "🧱 " + name + " is still an empty stub. Received: undefined!",
        );
        logLine(
          "💥 " +
            reason +
            " — '" +
            name +
            "' is not implemented yet (it returned undefined — the same thing your tests are saying).",
          "bad",
        );
      } else {
        await botiSays("⚡ " + name + " short-circuited! " + reason + "…");
        logLine(
          "💥 " + reason + " — '" + name + "' crashed: " + attempt.error,
          "bad",
        );
      }
      return null;
    }
    return attempt.result;
  }

  // ---------- Carmen's search bar -----------------------------------
  // Runs on the student's parseShopQuery + filterByCategory!

  function runSearch() {
    const query = $("#search-input").value.trim();
    const note = $("#search-note");
    const params = call("parseShopQuery", [query]);
    if (!params.ok) {
      smoke();
      note.textContent =
        "💥 parseShopQuery is not installed — the laptop just smoked.";
      return;
    }
    if (typeof params.result !== "object" || params.result === null) {
      note.textContent =
        "🤨 parseShopQuery returned " +
        pretty(params.result) +
        " — expected an object.";
      return;
    }
    if (params.result.category === undefined) {
      renderShelves();
      note.textContent =
        "Parsed " +
        pretty(params.result) +
        " — no category given, showing everything.";
      return;
    }
    const matches = call("filterByCategory", [
      state.products,
      params.result.category,
    ]);
    if (!matches.ok) {
      smoke();
      note.textContent =
        "💥 filterByCategory is not installed — cannot tidy the shelves.";
      return;
    }
    if (!Array.isArray(matches.result)) {
      note.textContent =
        "🤨 filterByCategory returned " + pretty(matches.result);
      return;
    }
    renderShelves(matches.result);
    note.textContent =
      "Parsed " +
      pretty(params.result) +
      " — showing " +
      matches.result.length +
      " product(s).";
  }

  // ---------- the shift ----------------------------------------------

  let running = false;

  async function runShift() {
    if (running) {
      return;
    }
    running = true;
    $("#run-shift").disabled = true;

    $("#shift-log").innerHTML = "";
    state.products = freshLedger();
    renderShelves();

    logLine(
      "🔔 ding ding! The bodega opens. MegaMercado hums across the street.",
    );
    await carmenSays("New ledger, new week! Customers!");

    // Ramon — isInStock + getPrice
    enterCustomer("👓", "Ramon");
    await customerSays("Ramon: churros, por favor.");
    const churros = await useSkill(
      "isInStock",
      [state.products, "churros"],
      "Ramon wants churros",
    );
    if (churros !== null) {
      if (churros === true) {
        await botiSays("¡Sí! Churros right here! 🍩");
        logLine("✅ isInStock says true.", "good");
      } else {
        await botiSays("Ay, Ramon… the ledger says 0 in stock. SOLD OUT 😢");
        logLine("✅ isInStock says false — churros are sold out.", "good");
        const agua = await useSkill(
          "getPrice",
          [state.products, "agua"],
          "Ramon settles for agua",
        );
        if (agua !== null) {
          await botiSays(
            "Agua instead? " +
              (typeof agua === "number" ? euros(agua) : pretty(agua)) +
              " 💧",
          );
          logLine("✅ getPrice says agua costs " + pretty(agua) + ".", "good");
        }
      }
    }
    exitCustomer();

    // Marta — getBasketTotal
    enterCustomer("🧘‍♀️", "Marta");
    await customerSays("Marta: tortilla, agua and a croissant, boti ♥");
    const total = await useSkill(
      "getBasketTotal",
      [state.products, ["tortilla", "agua", "croissant"]],
      "Marta's basket needs a total",
    );
    if (total !== null) {
      if (typeof total === "number") {
        await botiSays("That'll be " + euros(total) + ", gracias! 🛒");
        logLine("✅ getBasketTotal says " + euros(total) + ".", "good");
      } else {
        await botiSays("that's… " + pretty(total) + "? 🤨");
        logLine("🤨 getBasketTotal returned " + pretty(total), "bad");
      }
    }
    exitCustomer();

    // Big Tony — getCheapestProduct
    enterCustomer("💪", "Big Tony");
    await customerSays("Big Tony: cheapest thing in this shop. NOW.");
    const cheapest = await useSkill(
      "getCheapestProduct",
      [state.products],
      "Tony wants the cheapest product",
    );
    if (cheapest !== null) {
      if (cheapest && typeof cheapest === "object" && cheapest.name) {
        await botiSays(
          "The " + cheapest.name + "! Only " + euros(cheapest.price) + " 💪",
        );
        logLine("✅ getCheapestProduct found " + cheapest.name + ".", "good");
      } else {
        await botiSays("the cheapest is… " + pretty(cheapest) + "? 🤨");
        logLine("🤨 getCheapestProduct returned " + pretty(cheapest), "bad");
      }
    }
    exitCustomer();

    // The MegaMercado audit — makeReport
    await carmenSays("A MegaMercado manager is here! 🕶️ Boti — the AUDIT!");
    const report = await useSkill(
      "makeReport",
      [state.products],
      "The audit needs the shop report",
    );
    if (report !== null) {
      if (
        report &&
        typeof report === "object" &&
        typeof report.itemCount === "number"
      ) {
        $("#report-content").innerHTML =
          "🧾 LA BODEGA DE GRÀCIA — official numbers<br />" +
          "products: <b>" +
          report.itemCount +
          "</b><br />" +
          "total value: <b>" +
          pretty(report.totalValue) +
          "</b><br />" +
          "cheapest product: <b>" +
          pretty(report.cheapest) +
          "</b>";
        $("#report-overlay").classList.add("show");
        logLine("📊 audit delivered: " + pretty(report), "good");
        await botiSays("Read them and weep, MegaMercado. 📊");
      } else {
        await botiSays("the report is… " + pretty(report) + "? 🤨");
        logLine("🤨 makeReport returned " + pretty(report), "bad");
      }
    }

    // Happy hour — applyDiscount (mutation is the FEATURE)
    await carmenSays(
      "HAPPY HOUR! 50% off bocadillos — change the REAL ledger line!",
    );
    const bocadillo = state.products.find((p) => p.name === "bocadillo");
    const discounted = await useSkill(
      "applyDiscount",
      [bocadillo, 50],
      "Happy hour needs the real price changed",
    );
    if (discounted !== null) {
      if (bocadillo.price === 2.25) {
        renderShelves();
        await botiSays(
          "Bocadillo is now €2.25 — on the shelf AND in the ledger. Same object! 🤯",
        );
        logLine(
          "✅ applyDiscount mutated the real product — the whole shop sees it.",
          "good",
        );
      } else if (discounted === bocadillo) {
        renderShelves();
        await botiSays(
          "You returned the same jar, but its price is " +
            euros(bocadillo.price) +
            "? 🤨",
        );
        logLine(
          "🤨 applyDiscount returned the product but the price is " +
            euros(bocadillo.price),
          "bad",
        );
      } else {
        await botiSays("the coupon says… " + pretty(discounted) + "? 🤨");
        logLine("🤨 applyDiscount returned " + pretty(discounted), "bad");
      }
      const coupon = call("makeDiscountedCopy", [bocadillo, 50]);
      if (
        coupon.ok &&
        typeof coupon.result === "object" &&
        coupon.result !== bocadillo
      ) {
        await carmenSays(
          "And a printed coupon: " +
            euros(coupon.result.price) +
            " — a COPY, the ledger is safe. 🎟️",
        );
        logLine(
          "🎟️ makeDiscountedCopy printed a coupon without touching the ledger.",
          "good",
        );
      }
    }

    // Marta again — filterByCategory
    enterCustomer("🧘‍♀️", "Marta");
    await customerSays(
      "Marta: just show me the drinks for yoga night, por favor.",
    );
    const drinks = await useSkill(
      "filterByCategory",
      [state.products, "drinks"],
      "Marta wants only drinks",
    );
    if (drinks !== null) {
      if (Array.isArray(drinks)) {
        renderShelves(drinks);
        await botiSays(drinks.length + " drinks on the front shelf! 🥤☕💧");
        logLine(
          "✅ filterByCategory put " +
            drinks.length +
            " drinks on the front shelf.",
          "good",
        );
        await sleep(1400);
        renderShelves();
      } else {
        await botiSays("the drinks shelf is… " + pretty(drinks) + "? 🤨");
        logLine("🤨 filterByCategory returned " + pretty(drinks), "bad");
      }
    }
    exitCustomer();

    // Finale
    const installed = renderDashboard();
    await botiSays("beep… boop… the ledger is alive 🥹");
    logLine(
      "🌙 SHIFT COMPLETE — " +
        installed +
        "/" +
        CORE_SKILLS.length +
        " skills installed.",
    );
    if (installed === CORE_SKILLS.length) {
      rain(["🎉", "📊", "🥳", "🏆"]);
      await carmenSays("BODEGA BOSS! MegaMercado doesn't scare us! 😎");
    }

    running = false;
    $("#run-shift").disabled = false;
  }

  // ---------- wiring ---------------------------------------------------

  $("#run-shift").addEventListener("click", runShift);

  $("#happy-hour").addEventListener("click", () => {
    const bocadillo = state.products.find((p) => p.name === "bocadillo");
    if (typeof bocadillo === "undefined" || bocadillo === null) {
      $("#search-note").textContent = "No bocadillo in the ledger today!";
      return;
    }
    const attempt = call("applyDiscount", [bocadillo, 50]);
    if (!attempt.ok) {
      smoke();
      $("#search-note").textContent =
        "💥 applyDiscount is not installed — the button just sparked.";
      return;
    }
    renderShelves();
    renderDashboard();
    $("#search-note").textContent =
      "HAPPY HOUR! Bocadillo: " +
      euros(bocadillo.price) +
      " — the real product object changed, everywhere at once. That's Quest 5a!";
  });

  $("#search-apply").addEventListener("click", runSearch);
  $("#search-input").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      runSearch();
    }
  });
  $("#search-clear").addEventListener("click", () => {
    $("#search-input").value = "";
    renderShelves();
    $("#search-note").textContent = "Showing the whole bodega.";
  });

  $("#speed-toggle").addEventListener("click", () => {
    speedFactor = speedFactor === 1 ? 0.5 : 1;
    $("#speed-toggle").textContent =
      speedFactor === 1 ? "Speed: normal 🚶" : "Speed: fast 🏃";
  });

  $("#phantom-close").addEventListener("click", () => {
    $("#phantom-overlay").classList.remove("show");
  });

  $("#report-close").addEventListener("click", () => {
    $("#report-overlay").classList.remove("show");
  });

  state.products = freshLedger();
  renderShelves();
  renderDashboard();
})();
