const fs = require('fs');
const path = require('path');

const suspectsDir = path.join(__dirname, 'images', 'suspects');
const cluesDir = path.join(__dirname, 'images', 'clues');

if (!fs.existsSync(suspectsDir)) fs.mkdirSync(suspectsDir, { recursive: true });
if (!fs.existsSync(cluesDir)) fs.mkdirSync(cluesDir, { recursive: true });

// Helper to write SVG file
function saveSvg(filePath, svgContent) {
  fs.writeFileSync(filePath, svgContent.trim());
}

/* =========================================================================
   CASE 1 ASSETS
   ========================================================================= */

// Garth (Woodcutter: Red Plaid Shirt, Beard, holding wooden axe)
const garthSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#1f2421" stroke="#3d5a45" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#2d382e"/>
  <polygon points="64,20 44,48 84,48" fill="#1c2b1e"/>
  <polygon points="64,36 38,70 90,70" fill="#1c2b1e"/>
  <rect x="44" y="24" width="40" height="16" fill="#543310"/>
  <rect x="40" y="28" width="48" height="12" fill="#402208"/>
  <rect x="40" y="22" width="48" height="8" fill="#8c3a27"/>
  <rect x="44" y="36" width="40" height="28" fill="#f5c298"/>
  <rect x="48" y="44" width="8" height="8" fill="#ffffff"/>
  <rect x="52" y="44" width="4" height="8" fill="#291d0f"/>
  <rect x="72" y="44" width="8" height="8" fill="#ffffff"/>
  <rect x="72" y="44" width="4" height="8" fill="#291d0f"/>
  <rect x="60" y="48" width="8" height="8" fill="#d99b6c"/>
  <rect x="40" y="56" width="48" height="20" fill="#543310"/>
  <rect x="44" y="60" width="40" height="20" fill="#402208"/>
  <rect x="52" y="72" width="24" height="8" fill="#2b1402"/>
  <rect x="32" y="76" width="64" height="40" fill="#b82626"/>
  <rect x="32" y="84" width="64" height="6" fill="#1c1c1c"/>
  <rect x="32" y="98" width="64" height="6" fill="#1c1c1c"/>
  <rect x="48" y="76" width="6" height="40" fill="#1c1c1c"/>
  <rect x="74" y="76" width="6" height="40" fill="#1c1c1c"/>
  <rect x="84" y="40" width="8" height="50" fill="#8b5a2b" transform="rotate(-20 84 40)"/>
  <polygon points="96,30 114,24 116,46 94,40" fill="#a8a8b2"/>
  <polygon points="96,30 102,28 102,38 94,40" fill="#6c6c75"/>
  <rect x="110" y="26" width="4" height="18" fill="#e0e0eb"/>
</svg>`;

// Lin (Farmer: Straw Hat, Denim Overalls, Shovel)
const linSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#242118" stroke="#665829" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#383320"/>
  <rect x="20" y="70" width="88" height="40" fill="#4d441e"/>
  <ellipse cx="64" cy="32" rx="46" ry="12" fill="#d4af37"/>
  <rect x="42" y="14" width="44" height="20" fill="#e5c158"/>
  <rect x="42" y="28" width="44" height="6" fill="#8c3322"/>
  <rect x="46" y="34" width="36" height="34" fill="#fcd0a1"/>
  <rect x="42" y="36" width="6" height="16" fill="#362213"/>
  <rect x="80" y="36" width="6" height="16" fill="#362213"/>
  <rect x="50" y="44" width="6" height="6" fill="#211811"/>
  <rect x="72" y="44" width="6" height="6" fill="#211811"/>
  <rect x="48" y="52" width="6" height="4" fill="#f0998b"/>
  <rect x="74" y="52" width="6" height="4" fill="#f0998b"/>
  <rect x="58" y="56" width="12" height="4" fill="#9c5446"/>
  <rect x="34" y="68" width="60" height="48" fill="#e8a838"/>
  <rect x="42" y="74" width="44" height="42" fill="#2b5282"/>
  <rect x="46" y="68" width="8" height="24" fill="#1f3d61"/>
  <rect x="74" y="68" width="8" height="24" fill="#1f3d61"/>
  <rect x="20" y="45" width="6" height="60" fill="#7a5230" transform="rotate(15 20 45)"/>
  <path d="M12,40 L34,40 L28,62 L18,62 Z" fill="#8fa3ad"/>
</svg>`;

// Sam (Guard: Iron Helmet, Chainmail, Coiled Rope)
const samSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#1c212b" stroke="#3a4b66" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#262e3d"/>
  <rect x="40" y="18" width="48" height="30" fill="#7a8799"/>
  <rect x="44" y="14" width="40" height="10" fill="#98a7bd"/>
  <rect x="44" y="32" width="40" height="8" fill="#2b313b"/>
  <rect x="46" y="40" width="36" height="26" fill="#f0c299"/>
  <rect x="48" y="44" width="8" height="6" fill="#1f2329"/>
  <rect x="72" y="44" width="8" height="6" fill="#1f2329"/>
  <rect x="30" y="66" width="68" height="48" fill="#485363"/>
  <rect x="44" y="72" width="40" height="40" fill="#8594a6"/>
  <ellipse cx="94" cy="74" rx="14" ry="18" fill="none" stroke="#b08d5b" stroke-width="6"/>
  <ellipse cx="94" cy="78" rx="12" ry="16" fill="none" stroke="#8c6a3c" stroke-width="4"/>
</svg>`;

// Clue 1: Footprints with pine needles
const c1FootprintsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#222026" stroke="#423e4d" stroke-width="4"/>
  <line x1="8" y1="40" x2="152" y2="40" stroke="#16151a" stroke-width="3"/>
  <line x1="8" y1="80" x2="152" y2="80" stroke="#16151a" stroke-width="3"/>
  <ellipse cx="50" cy="55" rx="14" ry="24" fill="#382414" transform="rotate(-15 50 55)"/>
  <ellipse cx="50" cy="74" rx="10" ry="12" fill="#29180b" transform="rotate(-15 50 74)"/>
  <ellipse cx="105" cy="45" rx="14" ry="24" fill="#382414" transform="rotate(10 105 45)"/>
  <ellipse cx="107" cy="64" rx="10" ry="12" fill="#29180b" transform="rotate(10 107 64)"/>
  <line x1="30" y1="40" x2="48" y2="35" stroke="#2e5927" stroke-width="3"/>
  <line x1="68" y1="65" x2="85" y2="60" stroke="#427a38" stroke-width="3"/>
  <line x1="120" y1="35" x2="135" y2="45" stroke="#2e5927" stroke-width="3"/>
  <line x1="88" y1="80" x2="102" y2="92" stroke="#427a38" stroke-width="3"/>
</svg>`;

// Clue 2: Wooden Axe
const c1AxeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#1a181f" stroke="#3b3547" stroke-width="4"/>
  <rect x="20" y="65" width="120" height="35" fill="#382a1c" stroke="#1f160e" stroke-width="3"/>
  <rect x="35" y="80" width="90" height="12" fill="#543e2a"/>
  <rect x="30" y="35" width="100" height="12" fill="#8a5529" transform="rotate(25 30 35)"/>
  <polygon points="105,45 135,32 140,75 110,65" fill="#80562e"/>
  <polygon points="120,40 135,32 140,75 125,70" fill="#523417"/>
  <polygon points="135,50 130,55 136,58" fill="#1f160e"/>
</svg>`;

// Clue 3: Note with Axe and Coin
const c1NoteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#1c1924" stroke="#473e5c" stroke-width="4"/>
  <polygon points="35,18 125,18 135,98 25,98" fill="#d9c596"/>
  <polygon points="30,22 120,22 130,94 25,94" fill="#faebd0"/>
  <line x1="38" y1="32" x2="115" y2="32" stroke="#423420" stroke-width="3" stroke-dasharray="8 4"/>
  <line x1="38" y1="42" x2="95" y2="42" stroke="#423420" stroke-width="3" stroke-dasharray="6 3"/>
  <line x1="50" y1="58" x2="75" y2="82" stroke="#6e461f" stroke-width="4"/>
  <polygon points="68,54 82,48 84,68 70,62" fill="#4d3216"/>
  <circle cx="102" cy="68" r="14" fill="#e0a828" stroke="#996e14" stroke-width="3"/>
  <circle cx="102" cy="68" r="8" fill="#ffd147"/>
</svg>`;

/* =========================================================================
   CASE 2 ASSETS (Windmill / Farmlands)
   ========================================================================= */

// Lin (Botanist in green robe with green potion)
const linPotionsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#182419" stroke="#33663b" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#243b27"/>
  <rect x="42" y="20" width="44" height="20" fill="#2b472e"/>
  <rect x="44" y="34" width="40" height="28" fill="#fcd0a1"/>
  <rect x="50" y="42" width="6" height="6" fill="#142416"/>
  <rect x="72" y="42" width="6" height="6" fill="#142416"/>
  <rect x="32" y="62" width="64" height="54" fill="#2a6635"/>
  <rect x="48" y="62" width="32" height="54" fill="#1f4d27"/>
  <ellipse cx="94" cy="80" rx="12" ry="16" fill="#3dd95c" stroke="#1f4d27" stroke-width="3"/>
  <rect x="91" y="60" width="6" height="10" fill="#694827"/>
  <circle cx="94" cy="82" r="5" fill="#a3ffb8"/>
</svg>`;

// Tuck (Baker in white apron with bread)
const tuckBakerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#292621" stroke="#6e5837" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#423b30"/>
  <ellipse cx="64" cy="24" rx="26" ry="14" fill="#f0ede6"/>
  <rect x="44" y="34" width="40" height="28" fill="#f7cb9c"/>
  <rect x="50" y="42" width="6" height="6" fill="#241e17"/>
  <rect x="72" y="42" width="6" height="6" fill="#241e17"/>
  <rect x="34" y="62" width="60" height="54" fill="#7a4b29"/>
  <rect x="42" y="64" width="44" height="52" fill="#f5f2eb"/>
  <ellipse cx="30" cy="85" rx="14" ry="8" fill="#d49444" stroke="#875317" stroke-width="2"/>
</svg>`;

// Clara (Weaver with wool scarf)
const claraWeaverSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#2b1f24" stroke="#6b3749" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#452a35"/>
  <rect x="38" y="20" width="52" height="30" fill="#542e18"/>
  <rect x="44" y="34" width="40" height="28" fill="#fcd0a1"/>
  <rect x="50" y="42" width="6" height="6" fill="#2e190d"/>
  <rect x="72" y="42" width="6" height="6" fill="#2e190d"/>
  <rect x="34" y="62" width="60" height="54" fill="#8a4b63"/>
  <rect x="38" y="60" width="52" height="14" fill="#d95f87"/>
  <rect x="70" y="68" width="12" height="32" fill="#d95f87"/>
</svg>`;

// Clue 2-1: Green Poison Bottle
const c2BottleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#182419" stroke="#2a472c" stroke-width="4"/>
  <rect x="20" y="75" width="120" height="30" fill="#54402a" stroke="#2e2113" stroke-width="3"/>
  <rect x="72" y="24" width="16" height="16" fill="#80562e"/>
  <polygon points="68,40 92,40 108,82 52,82" fill="#2ee656" stroke="#166e29" stroke-width="3"/>
  <circle cx="75" cy="65" r="6" fill="#baffc7"/>
  <circle cx="90" cy="72" r="4" fill="#baffc7"/>
</svg>`;

// Clue 2-2: Green Splash on floor
const c2StainSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#1a1c17" stroke="#36402b" stroke-width="4"/>
  <line x1="8" y1="30" x2="152" y2="30" stroke="#292014" stroke-width="4"/>
  <line x1="8" y1="65" x2="152" y2="65" stroke="#292014" stroke-width="4"/>
  <line x1="8" y1="100" x2="152" y2="100" stroke="#292014" stroke-width="4"/>
  <ellipse cx="80" cy="62" rx="42" ry="24" fill="#2ee656"/>
  <circle cx="45" cy="50" r="10" fill="#2ee656"/>
  <circle cx="115" cy="70" r="12" fill="#2ee656"/>
  <ellipse cx="82" cy="60" rx="30" ry="16" fill="#75ff91"/>
</svg>`;

// Clue 2-3: Recipe Scroll signed by Lin
const c2ScrollSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#172118" stroke="#314f34" stroke-width="4"/>
  <polygon points="30,16 130,16 130,104 30,104" fill="#faebd0"/>
  <line x1="42" y1="30" x2="118" y2="30" stroke="#1f4d27" stroke-width="3"/>
  <line x1="42" y1="42" x2="105" y2="42" stroke="#1f4d27" stroke-width="3"/>
  <ellipse cx="80" cy="65" rx="14" ry="14" fill="#2ee656" stroke="#166e29" stroke-width="2"/>
  <text x="50" y="94" fill="#143b1a" font-family="monospace" font-size="10" font-weight="bold">- LIN (BOTANIST)</text>
</svg>`;

/* =========================================================================
   CASE 3 ASSETS (Stone Fortress / Lightning Tower)
   ========================================================================= */

// Vance (Engineer: rubber gloves, goggles, copper wire)
const vanceEngineerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#1f232b" stroke="#3e4f6e" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#2a3345"/>
  <rect x="42" y="18" width="44" height="18" fill="#4d301b"/>
  <rect x="40" y="32" width="48" height="14" fill="#d67b29"/>
  <circle cx="52" cy="38" r="7" fill="#5ef7ff"/>
  <circle cx="76" cy="38" r="7" fill="#5ef7ff"/>
  <rect x="44" y="46" width="40" height="20" fill="#fcd0a1"/>
  <rect x="32" y="66" width="64" height="50" fill="#475266"/>
  <rect x="30" y="80" width="16" height="24" fill="#f29424"/>
  <path d="M90,70 Q105,85 88,100" stroke="#e07719" stroke-width="4" fill="none"/>
</svg>`;

// Bruno (Mason: grey chisel belt)
const brunoMasonSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#242426" stroke="#525257" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#38383d"/>
  <rect x="42" y="18" width="44" height="20" fill="#302621"/>
  <rect x="44" y="34" width="40" height="28" fill="#f0c299"/>
  <rect x="50" y="44" width="6" height="6" fill="#1f1814"/>
  <rect x="72" y="44" width="6" height="6" fill="#1f1814"/>
  <rect x="34" y="62" width="60" height="54" fill="#5e5954"/>
  <rect x="34" y="80" width="60" height="10" fill="#36322d"/>
  <rect x="58" y="76" width="8" height="22" fill="#a3aab8"/>
</svg>`;

// Selena (Trader: blue pack)
const selenaTraderSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#19242b" stroke="#305a73" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#233a47"/>
  <rect x="38" y="18" width="52" height="28" fill="#3b2014"/>
  <rect x="44" y="34" width="40" height="28" fill="#fcd0a1"/>
  <rect x="50" y="42" width="6" height="6" fill="#17242e"/>
  <rect x="72" y="42" width="6" height="6" fill="#17242e"/>
  <rect x="34" y="62" width="60" height="54" fill="#2e7068"/>
  <rect x="84" y="60" width="22" height="36" fill="#235c87" stroke="#123552" stroke-width="3"/>
</svg>`;

// Clue 3-1: Copper Wire on Lightning Rod
const c3WireSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#1a2029" stroke="#374d6e" stroke-width="4"/>
  <rect x="74" y="15" width="12" height="75" fill="#a1a8b5"/>
  <polygon points="70,15 90,15 80,4" fill="#ffd000"/>
  <path d="M80,30 Q120,45 105,75 T135,100" stroke="#f28729" stroke-width="5" fill="none"/>
  <polygon points="105,40 120,30 115,55 130,45 105,75 115,55" fill="#5efffb"/>
</svg>`;

// Clue 3-2: Scorch Marks
const c3BurnSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#242426" stroke="#4a4a52" stroke-width="4"/>
  <rect x="35" y="25" width="90" height="70" fill="#757d8a" stroke="#36393d" stroke-width="4"/>
  <circle cx="80" cy="60" r="28" fill="#141414"/>
  <polygon points="80,35 68,60 82,60 74,85 92,55 78,55" fill="#ffd000"/>
  <path d="M55,45 Q70,55 45,75" stroke="#242424" stroke-width="3" fill="none"/>
  <path d="M105,45 Q90,55 115,75" stroke="#242424" stroke-width="3" fill="none"/>
</svg>`;

// Clue 3-3: Spool Label marked Vance
const c3TagSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#1b212b" stroke="#3e506e" stroke-width="4"/>
  <circle cx="55" cy="60" r="32" fill="#784b23" stroke="#47280d" stroke-width="4"/>
  <circle cx="55" cy="60" r="14" fill="#1b212b"/>
  <rect x="75" y="35" width="65" height="50" fill="#faebd0" stroke="#784b23" stroke-width="2"/>
  <text x="82" y="55" fill="#21180f" font-family="monospace" font-size="9" font-weight="bold">COPPER WIRE</text>
  <text x="82" y="72" fill="#9c3b14" font-family="monospace" font-size="10" font-weight="bold">PROP: VANCE</text>
</svg>`;

/* =========================================================================
   CASE 4 ASSETS (Lava Keep)
   ========================================================================= */

// Zul (Treasurer: gold ring, merchant robes)
const zulTreasurerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#2b1f14" stroke="#75471b" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#422c17"/>
  <rect x="38" y="16" width="52" height="18" fill="#8f2020"/>
  <rect x="44" y="34" width="40" height="28" fill="#fcd0a1"/>
  <rect x="50" y="42" width="6" height="6" fill="#241405"/>
  <rect x="72" y="42" width="6" height="6" fill="#241405"/>
  <rect x="32" y="62" width="64" height="54" fill="#691a32"/>
  <rect x="52" y="62" width="24" height="54" fill="#d99f2b"/>
  <circle cx="34" cy="85" r="8" fill="#fcd0a1"/>
  <circle cx="34" cy="85" r="5" fill="#ffd700" stroke="#875300" stroke-width="2"/>
</svg>`;

// Pyra (Handler: lava staff)
const pyraHandlerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#2e1414" stroke="#7a2a2a" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#4d1f1f"/>
  <rect x="40" y="18" width="48" height="26" fill="#b03117"/>
  <rect x="44" y="34" width="40" height="28" fill="#fcd0a1"/>
  <rect x="50" y="42" width="6" height="6" fill="#290a0a"/>
  <rect x="72" y="42" width="6" height="6" fill="#290a0a"/>
  <rect x="34" y="62" width="60" height="54" fill="#4a1818"/>
  <rect x="94" y="30" width="6" height="80" fill="#82512c"/>
  <circle cx="97" cy="26" r="10" fill="#ff5d17" stroke="#ffd000" stroke-width="3"/>
</svg>`;

// Vorg (Sentry: iron shield)
const vorgSentrySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#212429" stroke="#485466" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#323c4a"/>
  <rect x="42" y="16" width="44" height="28" fill="#758296"/>
  <rect x="44" y="34" width="40" height="28" fill="#f0c299"/>
  <rect x="50" y="44" width="6" height="6" fill="#1c2026"/>
  <rect x="72" y="44" width="6" height="6" fill="#1c2026"/>
  <rect x="34" y="62" width="60" height="54" fill="#525d6e"/>
  <polygon points="20,60 42,60 38,105 24,105" fill="#9eaec4" stroke="#252c38" stroke-width="3"/>
</svg>`;

// Clue 4-1: Lever with Gold Ring Smudge
const c4LeverSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#291a14" stroke="#572b16" stroke-width="4"/>
  <rect x="30" y="45" width="40" height="55" fill="#4a423d" stroke="#211d1a" stroke-width="3"/>
  <line x1="50" y1="65" x2="105" y2="25" stroke="#949da8" stroke-width="10"/>
  <circle cx="108" cy="22" r="12" fill="#c73232"/>
  <circle cx="105" cy="24" r="7" fill="#ffd700" stroke="#754700" stroke-width="2"/>
</svg>`;

// Clue 4-2: Crushed Stone Gate
const c4GateSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#2b1b16" stroke="#542e21" stroke-width="4"/>
  <rect x="30" y="15" width="100" height="60" fill="#404047" stroke="#1f1f24" stroke-width="4"/>
  <line x1="45" y1="15" x2="45" y2="75" stroke="#1f1f24" stroke-width="4"/>
  <line x1="70" y1="15" x2="70" y2="75" stroke="#1f1f24" stroke-width="4"/>
  <line x1="95" y1="15" x2="95" y2="75" stroke="#1f1f24" stroke-width="4"/>
  <line x1="120" y1="15" x2="120" y2="75" stroke="#1f1f24" stroke-width="4"/>
  <polygon points="20,80 140,80 130,105 30,105" fill="#ff5d17"/>
  <polygon points="40,78 60,65 75,80 50,90" fill="#696973"/>
  <polygon points="90,75 115,68 120,85 100,92" fill="#696973"/>
</svg>`;

// Clue 4-3: Order Ledger signed Zul
const c4LedgerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#2e1a14" stroke="#5c2e1b" stroke-width="4"/>
  <polygon points="25,18 135,18 135,102 25,102" fill="#faebd0"/>
  <rect x="35" y="28" width="90" height="8" fill="#872917"/>
  <line x1="35" y1="48" x2="125" y2="48" stroke="#42291d" stroke-width="3"/>
  <line x1="35" y1="60" x2="110" y2="60" stroke="#42291d" stroke-width="3"/>
  <text x="35" y="80" fill="#801c1c" font-family="monospace" font-size="9" font-weight="bold">ORDER: DROP GATE</text>
  <text x="75" y="95" fill="#80440a" font-family="monospace" font-size="10" font-weight="bold">SIGN: ZUL</text>
</svg>`;

/* =========================================================================
   CASE 5 ASSETS (Lava Ferry / Canyon Crossing)
   ========================================================================= */

// Malakor (Nomad: black cloak, cowl, carrying swapped flask)
const malakorNomadSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#1c1c1f" stroke="#404047" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#2b2b30"/>
  <polygon points="64,16 34,42 94,42" fill="#141417"/>
  <rect x="42" y="38" width="44" height="28" fill="#1f1f24"/>
  <rect x="50" y="44" width="8" height="4" fill="#ff4747"/>
  <rect x="70" y="44" width="8" height="4" fill="#ff4747"/>
  <rect x="30" y="64" width="68" height="52" fill="#141417"/>
  <ellipse cx="94" cy="85" rx="10" ry="14" fill="#5ee7ff" stroke="#1f1f24" stroke-width="3"/>
</svg>`;

// Darek (Quarryman: iron pickaxe)
const darekQuarrymanSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#2b251f" stroke="#634f3b" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#42372a"/>
  <rect x="42" y="18" width="44" height="18" fill="#3b2719"/>
  <rect x="44" y="34" width="40" height="28" fill="#fcd0a1"/>
  <rect x="50" y="42" width="6" height="6" fill="#291a0c"/>
  <rect x="72" y="42" width="6" height="6" fill="#291a0c"/>
  <rect x="34" y="62" width="60" height="54" fill="#6e5033"/>
  <line x1="88" y1="40" x2="108" y2="100" stroke="#7a4e27" stroke-width="6"/>
  <path d="M75,35 Q100,20 120,40" stroke="#a3b1c2" stroke-width="8" fill="none"/>
</svg>`;

// Mira (Scout: leather boots)
const miraScoutSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#1d261e" stroke="#3b593f" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#2c4030"/>
  <rect x="38" y="18" width="52" height="26" fill="#4d301b"/>
  <rect x="44" y="34" width="40" height="28" fill="#fcd0a1"/>
  <rect x="50" y="42" width="6" height="6" fill="#122415"/>
  <rect x="72" y="42" width="6" height="6" fill="#122415"/>
  <rect x="34" y="62" width="60" height="54" fill="#3d5c43"/>
  <rect x="42" y="90" width="16" height="24" fill="#694020"/>
  <rect x="70" y="90" width="16" height="24" fill="#694020"/>
</svg>`;

// Clue 5-1: Swapped Flask showing Water
const c5FlaskSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#1a2026" stroke="#374b5e" stroke-width="4"/>
  <rect x="72" y="20" width="16" height="18" fill="#80562e"/>
  <ellipse cx="80" cy="70" rx="36" ry="34" fill="#5ee7ff" stroke="#2a4559" stroke-width="4"/>
  <path d="M55,75 Q80,90 105,75" stroke="#ffffff" stroke-width="3" fill="none"/>
  <text x="52" y="112" fill="#85dfff" font-family="monospace" font-size="9" font-weight="bold">CLEAR WATER</text>
</svg>`;

// Clue 5-2: Torn Black Cloth on Pouch
const c5ThreadSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#241e1a" stroke="#4f3f35" stroke-width="4"/>
  <rect x="40" y="30" width="80" height="60" fill="#784b2a" stroke="#3b210f" stroke-width="4"/>
  <polygon points="70,70 100,50 115,80 85,95" fill="#141417"/>
  <line x1="100" y1="50" x2="110" y2="35" stroke="#141417" stroke-width="3"/>
  <line x1="115" y1="80" x2="130" y2="85" stroke="#141417" stroke-width="3"/>
</svg>`;

// Clue 5-3: Cork Floating in Lava
const c5CorkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#2b1612" stroke="#5e261c" stroke-width="4"/>
  <rect x="15" y="45" width="130" height="60" fill="#ff4d17"/>
  <polygon points="15,65 45,55 75,68 115,52 145,65 145,105 15,105" fill="#ffd000"/>
  <ellipse cx="80" cy="55" rx="18" ry="12" fill="#80562e" stroke="#422911" stroke-width="3"/>
  <text x="73" y="58" fill="#faebd0" font-family="monospace" font-size="10" font-weight="bold">M</text>
</svg>`;

/* =========================================================================
   CASE 6 ASSETS (Lava Delta / Stone Vault)
   ========================================================================= */

// Solas (Firemage: yellow sulfur dust on sleeves)
const solasFiremageSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#2b2612" stroke="#756419" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#453a18"/>
  <rect x="40" y="18" width="48" height="24" fill="#d9ad26"/>
  <rect x="44" y="34" width="40" height="28" fill="#fcd0a1"/>
  <rect x="50" y="42" width="6" height="6" fill="#2e2508"/>
  <rect x="72" y="42" width="6" height="6" fill="#2e2508"/>
  <rect x="32" y="62" width="64" height="54" fill="#82321e"/>
  <rect x="25" y="80" width="16" height="30" fill="#ffd700"/>
  <rect x="87" y="80" width="16" height="30" fill="#ffd700"/>
</svg>`;

// Varren (Cutter: mason saw)
const varrenCutterSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#212124" stroke="#4d4d54" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#36363d"/>
  <rect x="42" y="18" width="44" height="20" fill="#26221f"/>
  <rect x="44" y="34" width="40" height="28" fill="#f0c299"/>
  <rect x="50" y="44" width="6" height="6" fill="#17171a"/>
  <rect x="72" y="44" width="6" height="6" fill="#17171a"/>
  <rect x="34" y="62" width="60" height="54" fill="#575761"/>
  <polygon points="85,50 115,50 110,85 85,85" fill="#9eaec4"/>
</svg>`;

// Nari (Carrier: canvas sacks)
const nariCarrierSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#2b241c" stroke="#69533a" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#473826"/>
  <rect x="38" y="18" width="52" height="26" fill="#422513"/>
  <rect x="44" y="34" width="40" height="28" fill="#fcd0a1"/>
  <rect x="50" y="42" width="6" height="6" fill="#21170d"/>
  <rect x="72" y="42" width="6" height="6" fill="#21170d"/>
  <rect x="34" y="62" width="60" height="54" fill="#7d6041"/>
  <ellipse cx="25" cy="85" rx="14" ry="18" fill="#c4aa89" stroke="#614a31" stroke-width="3"/>
</svg>`;

// Clue 6-1: Yellow Bomb Base
const c6BombSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#241e14" stroke="#544122" stroke-width="4"/>
  <circle cx="80" cy="70" r="32" fill="#ffd000" stroke="#7a5f00" stroke-width="4"/>
  <rect x="74" y="28" width="12" height="15" fill="#423d38"/>
  <path d="M80,28 Q100,10 115,20" stroke="#ff3c00" stroke-width="4" fill="none"/>
  <text x="65" y="78" fill="#523f00" font-family="monospace" font-size="18" font-weight="bold">S</text>
</svg>`;

// Clue 6-2: Sulfur Powder Trail
const c6PowderSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#1c1c1f" stroke="#3d3d47" stroke-width="4"/>
  <ellipse cx="40" cy="75" rx="15" ry="8" fill="#ffd000"/>
  <ellipse cx="75" cy="55" rx="20" ry="10" fill="#ffd000"/>
  <ellipse cx="115" cy="40" rx="18" ry="8" fill="#ffd000"/>
  <circle cx="95" cy="48" r="4" fill="#fff07a"/>
</svg>`;

// Clue 6-3: Bomb Wiring Blueprint with Solas's mark
const c6BlueprintSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#142130" stroke="#254d78" stroke-width="4"/>
  <rect x="25" y="16" width="110" height="88" fill="#1c3b61" stroke="#5294e2" stroke-width="2"/>
  <circle cx="60" cy="55" r="18" fill="none" stroke="#ffffff" stroke-width="3"/>
  <line x1="78" y1="55" x2="115" y2="55" stroke="#ffd000" stroke-width="3"/>
  <text x="35" y="94" fill="#ffffff" font-family="monospace" font-size="9" font-weight="bold">SOLAS CHEM-BOMB</text>
</svg>`;

/* =========================================================================
   CASE 7 ASSETS (Sky City / Sky Spire)
   ========================================================================= */

// Nyx (Assassin: purple glider wings)
const nyxAssassinSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#1f182b" stroke="#51367a" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#312247"/>
  <polygon points="20,40 5,75 35,75" fill="#8034eb"/>
  <polygon points="108,40 123,75 93,75" fill="#8034eb"/>
  <rect x="42" y="18" width="44" height="24" fill="#1c1626"/>
  <rect x="44" y="34" width="40" height="28" fill="#fcd0a1"/>
  <rect x="50" y="42" width="6" height="6" fill="#9347ff"/>
  <rect x="72" y="42" width="6" height="6" fill="#9347ff"/>
  <rect x="34" y="62" width="60" height="54" fill="#241738"/>
</svg>`;

// Brak (Sentry: round shell helmet)
const brakSentrySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#182329" stroke="#335669" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#253a47"/>
  <circle cx="64" cy="30" r="26" fill="#7594a8" stroke="#354d5c" stroke-width="3"/>
  <rect x="44" y="36" width="40" height="26" fill="#f0c299"/>
  <rect x="50" y="44" width="6" height="6" fill="#142129"/>
  <rect x="72" y="44" width="6" height="6" fill="#142129"/>
  <rect x="34" y="62" width="60" height="54" fill="#435e70"/>
</svg>`;

// Lyra (Mystic: crystal pendant)
const lyraMysticSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#291829" stroke="#6e336e" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#422042"/>
  <rect x="38" y="18" width="52" height="28" fill="#e0c2ff"/>
  <rect x="44" y="34" width="40" height="28" fill="#fcd0a1"/>
  <rect x="50" y="42" width="6" height="6" fill="#300d30"/>
  <rect x="72" y="42" width="6" height="6" fill="#300d30"/>
  <rect x="34" y="62" width="60" height="54" fill="#692b69"/>
  <polygon points="64,74 56,88 72,88" fill="#66ffff" stroke="#1f4d4d" stroke-width="2"/>
</svg>`;

// Clue 7-1: Purple Feather
const c7WingSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#1d1629" stroke="#462f6b" stroke-width="4"/>
  <path d="M40,90 Q80,20 125,35 Q100,80 40,90" fill="#8034eb" stroke="#48188f" stroke-width="3"/>
  <line x1="40" y1="90" x2="120" y2="40" stroke="#d5abff" stroke-width="3"/>
</svg>`;

// Clue 7-2: Water Bottle Fragments
const c7WaterSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#18232b" stroke="#33566e" stroke-width="4"/>
  <polygon points="40,50 65,30 60,65" fill="#69e1ff"/>
  <polygon points="80,45 110,35 105,70 75,65" fill="#69e1ff"/>
  <polygon points="65,80 90,75 80,105" fill="#69e1ff"/>
  <ellipse cx="80" cy="75" rx="45" ry="18" fill="none" stroke="#2b9bc7" stroke-width="3"/>
</svg>`;

// Clue 7-3: Drop Marker on Balcony
const c7FeatherSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#1a1c2b" stroke="#373d63" stroke-width="4"/>
  <rect x="30" y="20" width="100" height="80" fill="#303b54" stroke="#161b2b" stroke-width="4"/>
  <circle cx="80" cy="60" r="24" fill="none" stroke="#8034eb" stroke-width="4"/>
  <line x1="80" y1="30" x2="80" y2="90" stroke="#8034eb" stroke-width="3"/>
  <line x1="50" y1="60" x2="110" y2="60" stroke="#8034eb" stroke-width="3"/>
  <text x="68" y="95" fill="#d5abff" font-family="monospace" font-size="10" font-weight="bold">NYX</text>
</svg>`;

/* =========================================================================
   CASE 8 ASSETS (Sky Pier / Airship)
   ========================================================================= */

// Brak (Mechanic: red fuse in tool belt)
const brakMechanicSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#241e19" stroke="#634c38" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#3b2f24"/>
  <rect x="40" y="18" width="48" height="20" fill="#24190f"/>
  <rect x="44" y="34" width="40" height="28" fill="#fcd0a1"/>
  <rect x="50" y="42" width="6" height="6" fill="#1c1005"/>
  <rect x="72" y="42" width="6" height="6" fill="#1c1005"/>
  <rect x="34" y="62" width="60" height="54" fill="#54473b"/>
  <rect x="34" y="80" width="60" height="12" fill="#2b1f13"/>
  <rect x="48" y="76" width="8" height="20" fill="#e62e2e"/>
  <rect x="62" y="76" width="8" height="20" fill="#e62e2e"/>
</svg>`;

// Vesper (Priest: black robes)
const vesperPriestSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#17141f" stroke="#3e3157" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#251e33"/>
  <polygon points="64,14 36,44 92,44" fill="#120e1c"/>
  <rect x="44" y="36" width="40" height="28" fill="#f5cbb0"/>
  <rect x="50" y="44" width="6" height="6" fill="#4d1b94"/>
  <rect x="72" y="44" width="6" height="6" fill="#4d1b94"/>
  <rect x="32" y="64" width="64" height="52" fill="#140f21"/>
  <rect x="60" y="64" width="8" height="52" fill="#6930c3"/>
</svg>`;

// Tuck (Runner: fruit crate)
const tuckRunnerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#1c2419" stroke="#3b5933" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#2d3d27"/>
  <rect x="42" y="18" width="44" height="18" fill="#523118"/>
  <rect x="44" y="34" width="40" height="28" fill="#fcd0a1"/>
  <rect x="50" y="42" width="6" height="6" fill="#172412"/>
  <rect x="72" y="42" width="6" height="6" fill="#172412"/>
  <rect x="34" y="62" width="60" height="54" fill="#3b5735"/>
  <rect x="25" y="75" width="25" height="25" fill="#a67137" stroke="#52320e" stroke-width="2"/>
</svg>`;

// Clue 8-1: Red Booster Firework
const c8FireworkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#261919" stroke="#5c2e2e" stroke-width="4"/>
  <rect x="45" y="40" width="70" height="35" fill="#e62e2e" stroke="#871212" stroke-width="3"/>
  <polygon points="115,35 140,57 115,80" fill="#ffd000"/>
  <line x1="45" y1="57" x2="20" y2="57" stroke="#ffffff" stroke-width="4"/>
</svg>`;

// Clue 8-2: Red Paper Wrapper
const c8WrapperSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#211a1a" stroke="#4a3636" stroke-width="4"/>
  <polygon points="35,40 85,25 125,65 75,95 25,75" fill="#e62e2e"/>
  <polygon points="50,45 80,35 110,65 75,85" fill="#ff6b6b"/>
  <line x1="75" y1="95" x2="105" y2="105" stroke="#ffffff" stroke-width="3"/>
</svg>`;

// Clue 8-3: Tampered Booster Crate marked Brak
const c8CrateSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#241e17" stroke="#52402d" stroke-width="4"/>
  <rect x="35" y="25" width="90" height="70" fill="#8f5d2c" stroke="#472b0f" stroke-width="4"/>
  <line x1="35" y1="25" x2="125" y2="95" stroke="#472b0f" stroke-width="3"/>
  <line x1="35" y1="95" x2="125" y2="25" stroke="#472b0f" stroke-width="3"/>
  <text x="45" y="62" fill="#ffd000" font-family="monospace" font-size="12" font-weight="bold">ENG: BRAK</text>
</svg>`;

/* =========================================================================
   CASE 9 ASSETS (Sky Altar / Crystal Room)
   ========================================================================= */

// Vesper (Cultist: purple laser tuning rod)
const vesperCultistSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#1d1629" stroke="#52317a" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#301f4a"/>
  <rect x="42" y="16" width="44" height="20" fill="#1a1126"/>
  <rect x="44" y="34" width="40" height="28" fill="#fcd0a1"/>
  <rect x="50" y="42" width="6" height="6" fill="#7824e6"/>
  <rect x="72" y="42" width="6" height="6" fill="#7824e6"/>
  <rect x="32" y="62" width="64" height="54" fill="#25153b"/>
  <rect x="94" y="45" width="6" height="65" fill="#a442f5"/>
  <circle cx="97" cy="40" r="8" fill="#e4b5ff"/>
</svg>`;

// Omen (Sage: blue book)
const omenSageSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#161e2b" stroke="#2c4773" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#22334f"/>
  <rect x="40" y="18" width="48" height="24" fill="#e6efff"/>
  <rect x="44" y="34" width="40" height="28" fill="#f0c299"/>
  <rect x="50" y="44" width="6" height="6" fill="#101929"/>
  <rect x="72" y="44" width="6" height="6" fill="#101929"/>
  <rect x="34" y="62" width="60" height="54" fill="#2d4a7a"/>
  <rect x="25" y="75" width="22" height="30" fill="#1f6feb" stroke="#0d3875" stroke-width="2"/>
</svg>`;

// Mira (Courier: green satchel)
const miraCourierSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#17241a" stroke="#2e5936" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#243d2a"/>
  <rect x="38" y="18" width="52" height="26" fill="#3b2413"/>
  <rect x="44" y="34" width="40" height="28" fill="#fcd0a1"/>
  <rect x="50" y="42" width="6" height="6" fill="#0d2411"/>
  <rect x="72" y="42" width="6" height="6" fill="#0d2411"/>
  <rect x="34" y="62" width="60" height="54" fill="#386140"/>
  <rect x="75" y="75" width="25" height="25" fill="#2b7a3d" stroke="#123d1d" stroke-width="2"/>
</svg>`;

// Clue 9-1: Crystal Beam on Altar
const c9LensSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#1d1429" stroke="#4d2c73" stroke-width="4"/>
  <polygon points="20,20 40,20 30,50" fill="#a442f5"/>
  <polygon points="120,70 150,70 135,100" fill="#3b2b4d"/>
  <line x1="30" y1="35" x2="135" y2="85" stroke="#e077ff" stroke-width="6"/>
  <line x1="30" y1="35" x2="135" y2="85" stroke="#ffffff" stroke-width="2"/>
</svg>`;

// Clue 9-2: Purple Tuning Rod
const c9RodSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#1c1626" stroke="#452a69" stroke-width="4"/>
  <line x1="30" y1="90" x2="115" y2="30" stroke="#a442f5" stroke-width="8"/>
  <circle cx="120" cy="25" r="14" fill="#d994ff" stroke="#781ec7" stroke-width="3"/>
  <circle cx="120" cy="25" r="6" fill="#ffffff"/>
</svg>`;

// Clue 9-3: Pillar Chisel Marks
const c9ChiselSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#242129" stroke="#4b4259" stroke-width="4"/>
  <rect x="40" y="20" width="80" height="80" fill="#696375" stroke="#292630" stroke-width="4"/>
  <path d="M55,40 L75,70 L95,45" stroke="#a442f5" stroke-width="5" fill="none"/>
  <path d="M65,75 L85,90 L105,70" stroke="#a442f5" stroke-width="5" fill="none"/>
</svg>`;

/* =========================================================================
   CASE 10 ASSETS (Deep Cavern Finale - Aarna Awakening)
   ========================================================================= */

// Vesper (Mastermind: wool-padded boots, iron tuning fork)
const vesperMastermindSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#0d1b24" stroke="#1d4d6e" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#152b3b"/>
  <polygon points="64,10 32,44 96,44" fill="#08141f"/>
  <rect x="42" y="34" width="44" height="28" fill="#112433"/>
  <rect x="50" y="44" width="6" height="4" fill="#00ffff"/>
  <rect x="72" y="44" width="6" height="4" fill="#00ffff"/>
  <rect x="30" y="62" width="68" height="54" fill="#0a1a26"/>
  <rect x="36" y="96" width="18" height="18" fill="#f0f5fa"/>
  <rect x="74" y="96" width="18" height="18" fill="#f0f5fa"/>
  <path d="M96,45 L96,80 M90,45 L90,65 L102,65 L102,45" stroke="#a3c7e8" stroke-width="3" fill="none"/>
</svg>`;

// Durand (Smith: heavy iron boots)
const durandSmithSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#24211e" stroke="#574d43" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#3b352e"/>
  <rect x="42" y="18" width="44" height="20" fill="#24190f"/>
  <rect x="44" y="34" width="40" height="28" fill="#f0c299"/>
  <rect x="50" y="42" width="6" height="6" fill="#17120a"/>
  <rect x="72" y="42" width="6" height="6" fill="#17120a"/>
  <rect x="34" y="62" width="60" height="54" fill="#5e4f40"/>
  <rect x="40" y="96" width="18" height="18" fill="#808d9e"/>
  <rect x="70" y="96" width="18" height="18" fill="#808d9e"/>
</svg>`;

// Solas (Pyro: lit torches)
const solasPyroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#261712" stroke="#693021" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#422218"/>
  <rect x="40" y="18" width="48" height="20" fill="#d9531e"/>
  <rect x="44" y="34" width="40" height="28" fill="#fcd0a1"/>
  <rect x="50" y="42" width="6" height="6" fill="#240c05"/>
  <rect x="72" y="42" width="6" height="6" fill="#240c05"/>
  <rect x="34" y="62" width="60" height="54" fill="#752e18"/>
  <rect x="94" y="55" width="6" height="40" fill="#694320"/>
  <polygon points="97,35 90,55 104,55" fill="#ffaa00"/>
</svg>`;

// Nyx (Shadow: surface guard)
const nyxShadowSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <rect x="8" y="8" width="112" height="112" fill="#171921" stroke="#373d52" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#272c3d"/>
  <rect x="40" y="18" width="48" height="24" fill="#10131c"/>
  <rect x="44" y="34" width="40" height="28" fill="#fcd0a1"/>
  <rect x="50" y="42" width="6" height="6" fill="#00e5ff"/>
  <rect x="72" y="42" width="6" height="6" fill="#00e5ff"/>
  <rect x="34" y="62" width="60" height="54" fill="#1a1f2e"/>
</svg>`;

// Clue 10-1: White Wool Fibers near Sensor
const c10WoolSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#0b1b24" stroke="#1b455e" stroke-width="4"/>
  <rect x="30" y="60" width="100" height="40" fill="#132b3b" stroke="#050e14" stroke-width="3"/>
  <circle cx="80" cy="60" r="14" fill="#00ffff"/>
  <path d="M45,75 Q60,60 70,80" stroke="#f0f5fa" stroke-width="4" fill="none"/>
  <path d="M85,70 Q100,55 110,75" stroke="#f0f5fa" stroke-width="4" fill="none"/>
  <path d="M60,85 Q75,70 90,90" stroke="#f0f5fa" stroke-width="4" fill="none"/>
</svg>`;

// Clue 10-2: Acoustic Tuning Fork
const c10ForkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#0e1f2b" stroke="#224b69" stroke-width="4"/>
  <line x1="80" y1="65" x2="80" y2="105" stroke="#a3c7e8" stroke-width="8"/>
  <path d="M60,25 L60,65 L100,65 L100,25" stroke="#a3c7e8" stroke-width="8" fill="none"/>
  <circle cx="80" cy="45" r="30" fill="none" stroke="#00ffff" stroke-width="2" stroke-dasharray="4 4"/>
</svg>`;

// Clue 10-3: Master Ledger of 10 Shards
const c10LedgerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120" shape-rendering="crispEdges">
  <rect width="160" height="120" fill="#100f14"/>
  <rect x="6" y="6" width="148" height="108" fill="#121e29" stroke="#24445e" stroke-width="4"/>
  <polygon points="25,15 135,15 135,105 25,105" fill="#faebd0"/>
  <text x="35" y="32" fill="#0a1a26" font-family="monospace" font-size="9" font-weight="bold">AARNA SINGULARITY</text>
  <text x="35" y="50" fill="#0a3d62" font-family="monospace" font-size="8">SHARDS 1-9 SECURED</text>
  <text x="35" y="68" fill="#a82323" font-family="monospace" font-size="8">SHARD 10 AT CAVERN</text>
  <circle cx="115" cy="85" r="12" fill="#00ffff" stroke="#0a3d62" stroke-width="2"/>
  <text x="35" y="92" fill="#4d148c" font-family="monospace" font-size="10" font-weight="bold">VESPER</text>
</svg>`;

/* =========================================================================
   SAVE ALL ASSETS
   ========================================================================= */

// Case 1
saveSvg(path.join(suspectsDir, 'garth.svg'), garthSvg);
saveSvg(path.join(suspectsDir, 'lin.svg'), linSvg);
saveSvg(path.join(suspectsDir, 'sam.svg'), samSvg);
saveSvg(path.join(cluesDir, 'c1-footprints.svg'), c1FootprintsSvg);
saveSvg(path.join(cluesDir, 'c1-axe.svg'), c1AxeSvg);
saveSvg(path.join(cluesDir, 'c1-note.svg'), c1NoteSvg);

// Case 2
saveSvg(path.join(suspectsDir, 'lin_potions.svg'), linPotionsSvg);
saveSvg(path.join(suspectsDir, 'tuck_baker.svg'), tuckBakerSvg);
saveSvg(path.join(suspectsDir, 'clara_weaver.svg'), claraWeaverSvg);
saveSvg(path.join(cluesDir, 'c2-bottle.svg'), c2BottleSvg);
saveSvg(path.join(cluesDir, 'c2-stain.svg'), c2StainSvg);
saveSvg(path.join(cluesDir, 'c2-scroll.svg'), c2ScrollSvg);

// Case 3
saveSvg(path.join(suspectsDir, 'vance_engineer.svg'), vanceEngineerSvg);
saveSvg(path.join(suspectsDir, 'bruno_mason.svg'), brunoMasonSvg);
saveSvg(path.join(suspectsDir, 'selena_trader.svg'), selenaTraderSvg);
saveSvg(path.join(cluesDir, 'c3-wire.svg'), c3WireSvg);
saveSvg(path.join(cluesDir, 'c3-burn.svg'), c3BurnSvg);
saveSvg(path.join(cluesDir, 'c3-tag.svg'), c3TagSvg);

// Case 4
saveSvg(path.join(suspectsDir, 'zul_treasurer.svg'), zulTreasurerSvg);
saveSvg(path.join(suspectsDir, 'pyra_handler.svg'), pyraHandlerSvg);
saveSvg(path.join(suspectsDir, 'vorg_sentry.svg'), vorgSentrySvg);
saveSvg(path.join(cluesDir, 'c4-lever.svg'), c4LeverSvg);
saveSvg(path.join(cluesDir, 'c4-gate.svg'), c4GateSvg);
saveSvg(path.join(cluesDir, 'c4-ledger.svg'), c4LedgerSvg);

// Case 5
saveSvg(path.join(suspectsDir, 'malakor_nomad.svg'), malakorNomadSvg);
saveSvg(path.join(suspectsDir, 'darek_quarryman.svg'), darekQuarrymanSvg);
saveSvg(path.join(suspectsDir, 'mira_scout.svg'), miraScoutSvg);
saveSvg(path.join(cluesDir, 'c5-flask.svg'), c5FlaskSvg);
saveSvg(path.join(cluesDir, 'c5-thread.svg'), c5ThreadSvg);
saveSvg(path.join(cluesDir, 'c5-cork.svg'), c5CorkSvg);

// Case 6
saveSvg(path.join(suspectsDir, 'solas_firemage.svg'), solasFiremageSvg);
saveSvg(path.join(suspectsDir, 'varren_cutter.svg'), varrenCutterSvg);
saveSvg(path.join(suspectsDir, 'nari_carrier.svg'), nariCarrierSvg);
saveSvg(path.join(cluesDir, 'c6-bomb.svg'), c6BombSvg);
saveSvg(path.join(cluesDir, 'c6-powder.svg'), c6PowderSvg);
saveSvg(path.join(cluesDir, 'c6-blueprint.svg'), c6BlueprintSvg);

// Case 7
saveSvg(path.join(suspectsDir, 'nyx_assassin.svg'), nyxAssassinSvg);
saveSvg(path.join(suspectsDir, 'brak_sentry.svg'), brakSentrySvg);
saveSvg(path.join(suspectsDir, 'lyra_mystic.svg'), lyraMysticSvg);
saveSvg(path.join(cluesDir, 'c7-wing.svg'), c7WingSvg);
saveSvg(path.join(cluesDir, 'c7-water.svg'), c7WaterSvg);
saveSvg(path.join(cluesDir, 'c7-feather.svg'), c7FeatherSvg);

// Case 8
saveSvg(path.join(suspectsDir, 'brak_mechanic.svg'), brakMechanicSvg);
saveSvg(path.join(suspectsDir, 'vesper_priest.svg'), vesperPriestSvg);
saveSvg(path.join(suspectsDir, 'tuck_runner.svg'), tuckRunnerSvg);
saveSvg(path.join(cluesDir, 'c8-firework.svg'), c8FireworkSvg);
saveSvg(path.join(cluesDir, 'c8-wrapper.svg'), c8WrapperSvg);
saveSvg(path.join(cluesDir, 'c8-crate.svg'), c8CrateSvg);

// Case 9
saveSvg(path.join(suspectsDir, 'vesper_cultist.svg'), vesperCultistSvg);
saveSvg(path.join(suspectsDir, 'omen_sage.svg'), omenSageSvg);
saveSvg(path.join(suspectsDir, 'mira_courier.svg'), miraCourierSvg);
saveSvg(path.join(cluesDir, 'c9-lens.svg'), c9LensSvg);
saveSvg(path.join(cluesDir, 'c9-rod.svg'), c9RodSvg);
saveSvg(path.join(cluesDir, 'c9-chisel.svg'), c9ChiselSvg);

// Case 10
saveSvg(path.join(suspectsDir, 'vesper_mastermind.svg'), vesperMastermindSvg);
saveSvg(path.join(suspectsDir, 'durand_smith.svg'), durandSmithSvg);
saveSvg(path.join(suspectsDir, 'solas_pyro.svg'), solasPyroSvg);
saveSvg(path.join(suspectsDir, 'nyx_shadow.svg'), nyxShadowSvg);
saveSvg(path.join(cluesDir, 'c10-wool.svg'), c10WoolSvg);
saveSvg(path.join(cluesDir, 'c10-fork.svg'), c10ForkSvg);
saveSvg(path.join(cluesDir, 'c10-ledger.svg'), c10LedgerSvg);

console.log('✅ Generated All Pixel-Art Assets for Cases 1 through 10!');
