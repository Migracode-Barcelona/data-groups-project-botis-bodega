// 🤖 BOTI'S BRAIN SCAN + SHIFT SIMULATOR — week 1
//
// This is the game engine. It's pre-written and it uses
// JavaScript you haven't learned yet — that's on purpose.
// By the end of the course you'll be able to read every line.
//
// Your code lives in ../skills.js. This file plugs your skills
// into the scene: the brain scan panel, the customers, and
// Boti's dramatic failures when a skill is missing or broken.

(function () {
  "use strict";

  // ---------- tiny helpers ---------------------------------------

  const $ = (selector) => document.querySelector(selector);
  const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const pretty = (value) => {
    if (value === undefined) return "undefined";
    const text = JSON.stringify(value);
    return text.length > 40 ? text.slice(0, 40) + "…" : text;
  };

  let speedFactor = 1; // 1 = normal, 0.5 = fast
  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms * speedFactor));

  // ---------- skill definitions ----------------------------------
  // probe: a quick practice run that proves the skill works.

  const CORE_SKILLS = [
    {
      id: "getItemAt",
      quest: "Q0",
      label: "Shelf map",
      xp: 10,
      probe: () =>
        getItemAt(["churros", "tortilla"], 1) === "tortilla" &&
        getItemAt(["churros"], 5) === "nothing there",
    },
    {
      id: "countStock",
      quest: "Q1",
      label: "Stock-take",
      xp: 20,
      probe: () =>
        countStock(["a", "b", "a"], "a") === 2 && countStock(["a"], "b") === 0,
    },
    {
      id: "hasItem",
      quest: "Q2",
      label: "Customer question",
      xp: 20,
      probe: () =>
        hasItem(["a", "b"], "b") === true && hasItem(["a"], "z") === false,
    },
    {
      id: "addItems",
      quest: "Q3",
      label: "Restock",
      xp: 30,
      probe: () => {
        const before = ["a"];
        const out = addItems(before, ["b"]);
        return deepEqual(out, ["a", "b"]) && deepEqual(before, ["a"]);
      },
    },
    {
      id: "removeItem",
      quest: "Q4",
      label: "The recall",
      xp: 30,
      probe: () => {
        const before = ["x", "y", "x"];
        const out = removeItem(before, "x");
        return deepEqual(out, ["y"]) && deepEqual(before, ["x", "y", "x"]);
      },
    },
    {
      id: "makeShelfLabels",
      quest: "Q5",
      label: "Label gun",
      xp: 20,
      probe: () =>
        deepEqual(makeShelfLabels(["a", "b c"]), ["SHELF: A", "SHELF: B C"]) &&
        deepEqual(makeShelfLabels([]), []),
    },
    {
      id: "mergeDeliveries",
      quest: "Q6",
      label: "Double delivery (BOSS)",
      xp: 40,
      probe: () => {
        const a = ["p", "q"];
        const b = ["q", "r"];
        return (
          deepEqual(mergeDeliveries(a, b), ["p", "q", "r"]) &&
          deepEqual(a, ["p", "q"]) &&
          deepEqual(b, ["q", "r"])
        );
      },
    },
  ];

  const BONUS_SKILLS = [
    {
      id: "pickMysteryItem",
      label: "🌸 Mystery box",
      probe: () => ["a", "b", "c"].includes(pickMysteryItem(["a", "b", "c"])),
    },
    {
      id: "sortAlphabetically",
      label: "⭐ Alphabetical shelves",
      probe: () => {
        const before = ["b", "a"];
        const out = sortAlphabetically(before);
        return deepEqual(out, ["a", "b"]) && deepEqual(before, ["b", "a"]);
      },
    },
  ];

  const RANKS = [
    { min: 7, name: "😎 Bodega Boss" },
    { min: 5, name: "🌟 Shift Leader" },
    { min: 3, name: "🛍️ Junior Clerk" },
    { min: 1, name: "🧑‍🏭 Intern Boti" },
    { min: 0, name: "📦 Cardboard Boti" },
  ];

  // ---------- brain scan (dashboard) -----------------------------

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

  // ---------- scene pieces ----------------------------------------

  const state = { inventory: [] };

  function renderWallList() {
    const ul = $("#wall-list");
    ul.innerHTML = "";
    for (const item of state.inventory) {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    }
  }

  function renderShelves() {
    const ul = $("#shelf-list");
    ul.innerHTML = "";
    for (const item of state.inventory) {
      const li = document.createElement("li");
      li.className = "sticky";
      li.textContent = item;
      ul.appendChild(li);
    }
  }

  function renderAll() {
    renderWallList();
    renderShelves();
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
    void boti.offsetWidth; // restart the animation
    boti.classList.add("smoking");
    const layer = $("#smoke-layer");
    layer.innerHTML = "";
    for (let i = 0; i < 3; i += 1) {
      const puff = document.createElement("span");
      puff.textContent = "💨";
      puff.className = "puff";
      puff.style.animationDelay = i * 0.25 + "s";
      puff.style.right = 80 + i * 20 + "px";
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

  function phantomAlert(message) {
    $("#phantom-message").textContent = message;
    $("#phantom-overlay").classList.add("show");
    logLine(
      "🚨 PHANTOM STOCK DETECTED — a function changed data it shouldn't have!",
      "alert",
    );
  }

  // ---------- calling student skills -------------------------------

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

  // ---------- the shift --------------------------------------------

  let running = false;

  async function runShift() {
    if (running) {
      return;
    }
    running = true;
    $("#run-shift").disabled = true;

    $("#shift-log").innerHTML = "";
    $("#labels-strip").innerHTML = "";
    state.inventory = [...inventory]; // Carmen's fresh list for today
    renderAll();

    logLine("🔔 ding ding! La Bodega de Gràcia opens.");
    await carmenSays("Boti! First day! Customers any minute — be charming!");

    // Marta — hasItem
    enterCustomer("🧘‍♀️", "Marta");
    await customerSays("Marta: ¡Hola! Do you have churros?");
    const churros = await useSkill(
      "hasItem",
      [state.inventory, "churros"],
      "Marta asks about churros",
    );
    if (churros !== null) {
      if (churros === true) {
        await botiSays("¡SÍ! Churros for you! 🍩");
        logLine("✅ hasItem says true — Marta gets her churros.", "good");
      } else {
        await botiSays("lo siento… no churros today 😢");
        logLine("🤷 hasItem says false — Marta leaves sadly.", "good");
      }
    }
    exitCustomer();

    // Ramon — getItemAt
    enterCustomer("👓", "Ramon");
    await customerSays("Ramon: grab me whatever lives on shelf 9, please.");
    const shelfNine = await useSkill(
      "getItemAt",
      [state.inventory, 9],
      "Ramon wants shelf 9",
    );
    if (shelfNine !== null) {
      if (shelfNine === "nothing there") {
        await botiSays("Shelf 9 is… nothing there 🕳️");
        logLine("🕳️ shelf 9 is empty.", "good");
      } else {
        await botiSays("Here from shelf 9: " + shelfNine + "!");
        logLine("✅ getItemAt says shelf 9 holds '" + shelfNine + "'.", "good");
      }
    }
    exitCustomer();

    // Big Tony — countStock
    enterCustomer("💪", "Big Tony");
    await customerSays("Big Tony: TORTILLA! How many you got?");
    const tortillas = await useSkill(
      "countStock",
      [state.inventory, "tortilla"],
      "Tony counts the tortillas",
    );
    if (tortillas !== null) {
      if (typeof tortillas === "number") {
        await botiSays(tortillas + " tortillas, señor! 🥘");
        logLine("✅ countStock counts " + tortillas + " tortillas.", "good");
      } else {
        await botiSays("er… " + pretty(tortillas) + " tortillas? 🤨");
        logLine("🤨 countStock returned " + pretty(tortillas), "bad");
      }
    }
    exitCustomer();

    // Restock — addItems (mutation theatre!)
    await carmenSays(
      "Warehouse van! 🚚 Add 3 ensaimadas and 2 crema catalanas!",
    );
    const beforeRestock = JSON.stringify(state.inventory);
    const restocked = await useSkill(
      "addItems",
      [
        state.inventory,
        [
          "ensaimada",
          "ensaimada",
          "ensaimada",
          "crema catalana",
          "crema catalana",
        ],
      ],
      "Boti restocks the shelves",
    );
    if (restocked !== null) {
      if (!Array.isArray(restocked)) {
        await botiSays("my restock returned… " + pretty(restocked) + "? 🤨");
        logLine("🤨 addItems returned " + pretty(restocked), "bad");
      } else {
        if (JSON.stringify(state.inventory) !== beforeRestock) {
          phantomAlert(
            "Your addItems changed Doña Carmen's wall list! Carmen's " +
              "original list was supposed to stay exactly as she wrote it " +
              "— the new items belong on a NEW list.",
          );
        }
        state.inventory = restocked;
        renderAll();
        await carmenSays(
          "Perfecto! " + restocked.length + " items on the shelves!",
        );
        logLine("📦 restocked — now " + restocked.length + " items.", "good");
      }
    }

    // Recall — removeItem (mutation theatre!)
    await carmenSays(
      "🚨 Bad news — the horchata batch went OFF! Pull EVERY horchata!",
    );
    const beforeRecall = JSON.stringify(state.inventory);
    const beforeRecallCount = state.inventory.length;
    const recalled = await useSkill(
      "removeItem",
      [state.inventory, "horchata"],
      "Boti recalls the horchata",
    );
    if (recalled !== null) {
      if (!Array.isArray(recalled)) {
        await botiSays("the recall returned… " + pretty(recalled) + "? 🤨");
        logLine("🤨 removeItem returned " + pretty(recalled), "bad");
      } else {
        const phantom = JSON.stringify(state.inventory) !== beforeRecall;
        if (phantom) {
          phantomAlert(
            "Your removeItem changed Doña Carmen's wall list! Carmen " +
              "still needs horchata on it so she can reorder the batch. " +
              "The recall should have produced a NEW list.",
          );
        }
        state.inventory = recalled;
        renderAll();
        const pulled = beforeRecallCount - recalled.length;
        await botiSays(
          "Recall done. " + pulled + " horchata pulled from the shelves.",
        );
        if (phantom) {
          logLine(
            "🚨 recall pulled " + pulled + " — but the wall list changed too!",
            "alert",
          );
        } else {
          logLine("✅ recall complete — " + pulled + " items pulled.", "good");
        }
      }
    }

    // Labels — makeShelfLabels
    await carmenSays("Label gun time! 🏷️ Big shiny labels, one per shelf!");
    const labels = await useSkill(
      "makeShelfLabels",
      [state.inventory],
      "Boti labels the shelves",
    );
    if (labels !== null) {
      if (!Array.isArray(labels)) {
        await botiSays("the label gun printed… " + pretty(labels) + "? 🤨");
        logLine("🤨 makeShelfLabels returned " + pretty(labels), "bad");
      } else {
        const strip = $("#labels-strip");
        strip.innerHTML = "";
        for (const label of labels.slice(0, 24)) {
          const chip = document.createElement("span");
          chip.className = "label-chip";
          chip.textContent = label;
          strip.appendChild(chip);
        }
        await botiSays("🏷️ " + labels.length + " labels printed!");
        logLine("✅ " + labels.length + " shelf labels printed.", "good");
      }
    }

    // Boss teaser — mergeDeliveries
    if (
      typeof window.mergeDeliveries === "function" &&
      scan(CORE_SKILLS[6]) === "installed"
    ) {
      await carmenSays("Bonus van test: TWO deliveries at once! 🚚🚚");
      const merged = await useSkill(
        "mergeDeliveries",
        [
          ["bocadillo", "olives"],
          ["olives", "agua"],
        ],
        "Boti merges two deliveries",
      );
      if (
        merged !== null &&
        deepEqual(merged, ["bocadillo", "olives", "agua"])
      ) {
        await carmenSays(
          "One clean list, no duplicates — you're ready for tomorrow!",
        );
        logLine(
          "🏆 BOSS BEATEN — deliveries merged with no duplicates!",
          "good",
        );
      } else if (merged !== null) {
        await botiSays("merged into… " + pretty(merged) + "? 🤨");
        logLine("🤨 mergeDeliveries returned " + pretty(merged), "bad");
      }
    } else {
      await carmenSays(
        "Tomorrow TWO vans arrive at once… mergeDeliveries is your BOSS quest. Homework! 😏",
      );
      logLine("🏆 Boss quest still open: mergeDeliveries (Q6).");
    }

    // Finale
    const installed = renderDashboard();
    await botiSays("beep… boop… I survived my first day 🥹");
    logLine(
      "🌙 SHIFT COMPLETE — " +
        installed +
        "/" +
        CORE_SKILLS.length +
        " skills installed.",
    );
    if (installed === CORE_SKILLS.length) {
      rain(["🎉", "🥳", "✨", "🏆"]);
      await carmenSays(
        "BODEGA BOSS! El MegaMercado doesn't stand a chance! 😎",
      );
    }

    running = false;
    $("#run-shift").disabled = false;
  }

  // ---------- wiring -----------------------------------------------

  $("#run-shift").addEventListener("click", runShift);

  $("#speed-toggle").addEventListener("click", () => {
    speedFactor = speedFactor === 1 ? 0.5 : 1;
    $("#speed-toggle").textContent =
      speedFactor === 1 ? "Speed: normal 🚶" : "Speed: fast 🏃";
  });

  $("#phantom-close").addEventListener("click", () => {
    $("#phantom-overlay").classList.remove("show");
  });

  state.inventory = [...inventory];
  renderAll();
  renderDashboard();
})();
