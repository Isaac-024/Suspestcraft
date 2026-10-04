# CASE: ABHEDYA — Voxel Detective Murder Mystery

> **A 10-Level Minecraft-Inspired Detective Murder Mystery Game built with Vanilla HTML5, CSS3, and JavaScript.**

---

## 🗡️ 1. Concept & Story Overview

In the shattered voxel realm, an ancient cosmic artifact known as the **Abhedya Conduit** (the impenetrable celestial block maintaining the dimensional boundaries) has been fractured into 10 resonant shards.

A clandestine syndicate known as the **Obsidian Circle** is executing precise assassinations across the four dimensions to seize every shard:
1. **Cases 1–3 — Overworld**: Rural village mysteries, lightning-charged fortresses, and poisoned mills.
2. **Cases 4–6 — Nether**: Fiery bastion gates, magma sea crossings, and overcharged respawn anchor traps.
3. **Cases 7–9 — The End**: High spire water assaults, sabotaged kinetic elytra flights, and inverted dragon crystal laser matrices.
4. **Case 10 — The Slit / Deep Dark**: The final confrontation against the Shadow Master at the Ancient City Sculk Catalyst Shrine.

---

## 🎮 2. Gameplay Loop

```text
LOAD GAME (Pixel Loading Bar)
   ↓
MAIN MENU
   ↓
CASE SELECT ARCHIVES (10 Cases across 4 Dimensions)
   ↓
CASE BRIEFING (Restricted Dossier)
   ↓
INVESTIGATION (7 Evidence Types + 4 Suspects)
   ↓
INSPECT EVIDENCE & CROSS-REFERENCE CLUES
   ↓
ACCUSATION (WHO + HOW + WHY)
   ↓
CORRECT → CASE SOLVED (Level Up Fanfare + Shard Recovered)
WRONG   → TNT DETONATION FAILURE (Hiss → Flashing 3D TNT → Screen Shake → Explosion → RESPAWN)
```

---

## 🛠️ 3. Architecture & Data-Driven Engine

All 10 cases are completely data-driven and defined in `js/cases.js`. Adding a new case requires only appending a new case object to the `CASES` array without modifying any game engine logic.

### Case Data Structure

```javascript
{
    id: 1,
    title: "THE SILENT VILLAGE",
    dimension: "overworld", // 'overworld' | 'nether' | 'end' | 'deepdark'
    victim: "Villager Librarian (Eldred)",
    location: "Abandoned Village Library",
    time: "23:47",
    status: "MURDER",
    difficulty: 1,
    synopsis: "...",
    suspects: [
        {
            id: "durand",
            name: "Villager Blacksmith (Durand)",
            role: "Master Blacksmith",
            relation: "Trade Competitor",
            personality: "...",
            alibi: "...",
            motive: "...",
            avatarEmoji: "⚒️"
        }
    ],
    evidence: {
        blockPrints: { ... },
        observerLog: { ... },
        chatLog: { ... },
        witness: { ... },
        weapon: { ... },
        roomLayout: { ... },
        timeline: { ... }
    },
    options: {
        who: [...],
        how: [...],
        why: [...]
    },
    correctAnswer: {
        who: "Villager Blacksmith (Durand)",
        how: "Rigged an Anvil Drop through the Skylight via Redstone",
        why: "To steal the Ancient Conduit Shard locked in the lectern"
    },
    explanation: { ... },
    failureHint: "..."
}
```

---

## 📁 4. Project Structure

```text
CASE-ABHEDYA/
│
├── index.html                  # Accessible semantic application markup
│
├── css/
│   ├── style.css               # Design tokens, dimension themes, pixel bevels, custom selects
│   ├── menu.css                # Loading screen, main menu, case select grid, settings
│   ├── investigation.css       # HUD, suspects sidebar, 7 evidence cards, blueprints, modals
│   └── animations.css          # 3D TNT block, drops, shakes, white flashes, glitch text
│
├── js/
│   ├── storage.js              # LocalStorage progress persistence & safe memory fallback
│   ├── audio.js                # Web Audio API synthesizers (MC click, TNT hiss/explosion, level up)
│   ├── effects.js              # HTML5 Canvas ambient particles (leaves, embers, void dust, sculk)
│   ├── cases.js                # 10 Data-driven cases database
│   ├── ui.js                   # DOM rendering, screen router, blueprint schematic drawer
│   ├── game.js                 # State machine, accusation validator, TNT failure sequencer
│   └── main.js                 # 3-second animated loading bar, event listeners, keyboard binds
│
├── assets/
│   ├── audio/                  # Audio asset placeholders
│   ├── images/                 # Image assets
│   └── textures/               # Texture assets
│
└── README.md
```

---

## 🔊 5. Zero-Dependency Audio Synthesis

The game includes a dedicated **Web Audio API Sound Engine** (`js/audio.js`) that procedurally synthesizes:
* **Tactile Block Click**: Snappy square/noise click.
* **TNT Fuse Hiss**: Frequency-sweeping bandpass white noise with sizzle modulation.
* **TNT Explosion**: 40Hz sub-bass rumble + distorted explosion blast.
* **Level Up Fanfare**: 5-note rising arpeggio chord chime.
* **Ambient Soundscapes**: Procedural background audio tailored to Overworld, Nether, The End, and Deep Dark.

---

## 🧪 6. Testing & Debug Mode

To reset all case completions and test the game from scratch:
Open the browser developer console and run:
```javascript
window.resetGameProgress();
```
Or open **Settings → Reset Data**.

---

## 🚀 7. Running Locally

Simply serve `index.html` via any local static server, e.g.:
```bash
npx serve .
# or
python -m http.server 8000
```
Or open `index.html` directly in any modern browser.
