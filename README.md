# 🤖 Boti's Bodega

> A 3-week coding quest: program Boti, a shopkeeper robot, and
> save **La Bodega de Gràcia** from **El MegaMercado**.

```
      ___
     |o o|     beep boop...
     |___|        B O T I  v0.1
    [=====]    brain: EMPTY (that's your job)
   🛞       🛞  shopkeeper robot · Gràcia, Barcelona
```

> Doña Carmen runs a tiny corner shop. Her knees are tired, so
> she bought a second-hand shopkeeper robot from the feria:
> **Boti**. Smiling face, shiny wheels, completely empty brain.
> The seller's last words: _"You'll need a programmer."_
>
> That's you.

---

## 🎮 The mission — three weeks

| Week | Chapter                  | You learn                                 | Folder    |
| ---- | ------------------------ | ----------------------------------------- | --------- |
| 1    | **Boti's First Day**     | Arrays, loops, references & mutation      | `week-1/` |
| 2    | **The New Ledger**       | Objects, keys & values, shared references | `week-2/` |
| 3    | **The Shop Goes Online** | DOM: querySelector, events, live state    | `week-3/` |

Every week is **self-contained**: its own quests, tests and
simulator. Side quests are optional and never block the next week.

## 👥 The cast

- 🤖 **Boti** — second-hand shopkeeper robot. Brain = this repo.
- 👩‍🍳 **Doña Carmen** — owner. Writes every test ("order") herself.
- 🧘‍♀️ **Marta**, 👓 **Ramon**, 💪 **Big Tony** — regulars with demands.
- 🏢 **El MegaMercado** — the fluorescent rival across the street.

## 🚀 How to play

**Requirements:** [Node.js](https://nodejs.org) and
[VS Code](https://code.visualstudio.com).

1. **Open this folder in VS Code.** Accept the prompt to install
   the recommended extensions (Prettier formats your code on
   save — that's the industry habit).
2. **Install the diagnostics:**

   ```zsh
   npm install
   ```

3. **Run the diagnostics for your current week:**

   ```zsh
   npm run week1   # week 2: npm run week2 · week 3: npm run week3
   ```

4. **Open the quest log** for your week:
   `week-1/QUESTS.md` (then week-2, week-3).
5. **Make tests green** by writing functions in `skills.js`
   (weeks 1–2) or `shop.js` + `script.js` (week 3).
6. **Watch Boti use your code:**
   - Weeks 1–2: open `week-1/simulator/index.html` (double-click),
     press **▶ Run a shift**, and read Boti's brain scan panel.
   - Week 3: open `week-3/index.html` — the shop YOU built.
7. **Side quests** (labs, mega quests) live at the bottom of each
   QUESTS.md and in each week's `lab.test.js`.

## 📜 Rules of the game

1. **Never edit the tests.** They are Doña Carmen's exact orders.
   If a test looks wrong, tell Doña Carmen (your teacher).
2. **Red is normal.** Red means "quest open". You finish a quest
   by making its tests green.
3. **Side quests never block the next week.** Boss unfinished?
   The story moves on. (Boti compartmentalises. He's a robot.)
4. **Asking for help is a job skill.** Even Boti asks Carmen.

## ⭐ XP and ranks

Each quest pays XP when its tests go green. The simulator's brain
scan tracks it live, and the ranks are:

| Rank            | Badge |
| --------------- | ----- |
| Cardboard Boti  | 📦    |
| Intern Boti     | 🧑‍🏭    |
| Junior Clerk    | 🛍️    |
| Shift Leader    | 🌟    |
| **Bodega Boss** | 😎    |

- Week 1: **170 XP** up for grabs
- Week 2: **215 XP**
- Week 3: **200 XP**

## ❓ FAQ

**All the tests are red! Is that bad?**
That's the game saying "welcome". Red = skill not installed yet.
Start at the top of QUESTS.md.

**Wait — a couple of tests are already green. Did I win something?**
No 😄 Those are the **guard tests**: they only check that an
input array was _not_ changed (like "Carmen's original list must
stay exactly as she wrote it"). A stub does nothing — so it
breaks nothing... yet. The guards earn their keep the moment your
code writes into a list it was only supposed to read: then they
flip red and catch the phantom. Passing one of those without the
return-value test next to it means nothing yet.

**`npm test` runs every week's tests. Do I fix them all?**
No — use `npm run week1` (or 2/3) for your current week. Future
weeks stay red until you get there. That's not a bug, that's the
story.

**The simulator says 💥 SKILL NOT INSTALLED.**
It means exactly that: the function it tried to use is still a
stub (or crashed). The panel tells you which quest it maps to.

**The simulator went 🚨 PHANTOM STOCK DETECTED.**
Congratulations, you reproduced a real bug from your prep! A
function changed data it was only supposed to read. Go back to
the no-mutation tests — they're telling you a story.

**I'm behind. Can I still do this week?**
Yes — every week folder stands alone. Tell your teacher where
you got stuck and open the current week's QUESTS.md.

**My file is a MESS of indentation.**
Save it. Prettier (the extension you installed) fixes it
automatically on save. Real teams do exactly this.

**Found a bug in the bodega itself?**
Tell Doña Carmen — she checks the orders, not you. 🫡

---

_For teachers: `TEACHER-GUIDE.md` has the runbooks, hint
ladders and common mistakes. The reference answers live on the
`solutions` branch — this branch is the game itself._
