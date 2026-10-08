const fs = require('fs');
const path = require('path');

const suspectsDir = path.join(__dirname, 'images', 'suspects');
const cluesDir = path.join(__dirname, 'images', 'clues');

if (!fs.existsSync(suspectsDir)) fs.mkdirSync(suspectsDir, { recursive: true });
if (!fs.existsSync(cluesDir)) fs.mkdirSync(cluesDir, { recursive: true });

// 1. Garth (Woodcutter: Red Plaid Shirt, Beard, holding wooden axe, pine forest vibe)
const garthSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <!-- Background Badge -->
  <rect x="8" y="8" width="112" height="112" fill="#1f2421" stroke="#3d5a45" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#2d382e"/>
  
  <!-- Pine Tree silhouette behind -->
  <polygon points="64,20 44,48 84,48" fill="#1c2b1e"/>
  <polygon points="64,36 38,70 90,70" fill="#1c2b1e"/>

  <!-- Character Hair & Cap -->
  <rect x="44" y="24" width="40" height="16" fill="#543310"/>
  <rect x="40" y="28" width="48" height="12" fill="#402208"/>
  <rect x="40" y="22" width="48" height="8" fill="#8c3a27"/>

  <!-- Face -->
  <rect x="44" y="36" width="40" height="28" fill="#f5c298"/>
  <!-- Eyes -->
  <rect x="48" y="44" width="8" height="8" fill="#ffffff"/>
  <rect x="52" y="44" width="4" height="8" fill="#291d0f"/>
  <rect x="72" y="44" width="8" height="8" fill="#ffffff"/>
  <rect x="72" y="44" width="4" height="8" fill="#291d0f"/>
  <!-- Nose -->
  <rect x="60" y="48" width="8" height="8" fill="#d99b6c"/>
  <!-- Beard -->
  <rect x="40" y="56" width="48" height="20" fill="#543310"/>
  <rect x="44" y="60" width="40" height="20" fill="#402208"/>
  <rect x="52" y="72" width="24" height="8" fill="#2b1402"/>

  <!-- Red Plaid Shirt (Flannel) -->
  <rect x="32" y="76" width="64" height="40" fill="#b82626"/>
  <!-- Plaid Black Stripes -->
  <rect x="32" y="84" width="64" height="6" fill="#1c1c1c"/>
  <rect x="32" y="98" width="64" height="6" fill="#1c1c1c"/>
  <rect x="48" y="76" width="6" height="40" fill="#1c1c1c"/>
  <rect x="74" y="76" width="6" height="40" fill="#1c1c1c"/>
  <!-- Suspenders / Straps -->
  <rect x="42" y="76" width="6" height="40" fill="#543310"/>
  <rect x="80" y="76" width="6" height="40" fill="#543310"/>

  <!-- Axe on shoulder -->
  <rect x="84" y="40" width="8" height="50" fill="#8b5a2b" transform="rotate(-20 84 40)"/>
  <polygon points="96,30 114,24 116,46 94,40" fill="#a8a8b2"/>
  <polygon points="96,30 102,28 102,38 94,40" fill="#6c6c75"/>
  <rect x="110" y="26" width="4" height="18" fill="#e0e0eb"/>
</svg>`;

// 2. Lin (Farmer: Straw Hat, Denim Overalls, Shovel, Wheat Straw)
const linSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <!-- Background Badge -->
  <rect x="8" y="8" width="112" height="112" fill="#242118" stroke="#665829" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#383320"/>

  <!-- Wheat Field Silhouette -->
  <rect x="20" y="70" width="88" height="40" fill="#4d441e"/>
  <polygon points="30,80 34,60 38,80" fill="#94802c"/>
  <polygon points="50,80 54,56 58,80" fill="#94802c"/>
  <polygon points="86,80 90,58 94,80" fill="#94802c"/>

  <!-- Straw Hat -->
  <ellipse cx="64" cy="32" rx="46" ry="12" fill="#d4af37"/>
  <rect x="42" y="14" width="44" height="20" fill="#e5c158"/>
  <rect x="42" y="28" width="44" height="6" fill="#8c3322"/>

  <!-- Face -->
  <rect x="46" y="34" width="36" height="34" fill="#fcd0a1"/>
  <!-- Hair peeking -->
  <rect x="42" y="36" width="6" height="16" fill="#362213"/>
  <rect x="80" y="36" width="6" height="16" fill="#362213"/>
  <!-- Eyes -->
  <rect x="50" y="44" width="6" height="6" fill="#211811"/>
  <rect x="72" y="44" width="6" height="6" fill="#211811"/>
  <!-- Cheeks blush -->
  <rect x="48" y="52" width="6" height="4" fill="#f0998b"/>
  <rect x="74" y="52" width="6" height="4" fill="#f0998b"/>
  <!-- Smile -->
  <rect x="58" y="56" width="12" height="4" fill="#9c5446"/>
  <!-- Wheat Stalk in mouth -->
  <line x1="64" y1="58" x2="88" y2="66" stroke="#eed469" stroke-width="3"/>
  <polygon points="88,66 94,62 96,68" fill="#e0b838"/>

  <!-- Shirt (Yellow) -->
  <rect x="34" y="68" width="60" height="48" fill="#e8a838"/>
  <!-- Denim Overalls (Blue) -->
  <rect x="42" y="74" width="44" height="42" fill="#2b5282"/>
  <rect x="46" y="68" width="8" height="24" fill="#1f3d61"/>
  <rect x="74" y="68" width="8" height="24" fill="#1f3d61"/>
  <!-- Overall Buttons -->
  <circle cx="50" cy="80" r="3" fill="#e0c050"/>
  <circle cx="78" cy="80" r="3" fill="#e0c050"/>

  <!-- Metal Shovel on side -->
  <rect x="92" y="42" width="6" height="64" fill="#87582b"/>
  <polygon points="88,30 102,30 100,44 90,44" fill="#9ba1a8"/>
  <polygon points="90,44 100,44 98,54 92,54" fill="#69717a"/>
</svg>`;

// 3. Sam (Guard: Iron Helmet, Chainmail/Blue Tabard, Coiled Rope)
const samSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" shape-rendering="crispEdges">
  <rect width="128" height="128" fill="#14141c"/>
  <!-- Background Badge -->
  <rect x="8" y="8" width="112" height="112" fill="#191c29" stroke="#364566" stroke-width="4"/>
  <rect x="16" y="16" width="96" height="96" fill="#242b3d"/>

  <!-- Watchtower battlements silhouette -->
  <rect x="24" y="60" width="16" height="50" fill="#131721"/>
  <rect x="48" y="60" width="16" height="50" fill="#131721"/>
  <rect x="72" y="60" width="16" height="50" fill="#131721"/>
  <rect x="96" y="60" width="16" height="50" fill="#131721"/>

  <!-- Iron Helmet -->
  <rect x="40" y="20" width="48" height="42" fill="#9da6b3"/>
  <rect x="36" y="32" width="56" height="8" fill="#758091"/>
  <!-- Helmet Crown Ridge -->
  <rect x="60" y="14" width="8" height="18" fill="#c2cbd6"/>
  <rect x="62" y="12" width="4" height="6" fill="#e8edf5"/>

  <!-- Helmet Visor / Face Opening -->
  <rect x="46" y="38" width="36" height="18" fill="#141821"/>
  <!-- Vigilant Eyes behind visor slit -->
  <rect x="50" y="44" width="10" height="6" fill="#ffffff"/>
  <rect x="54" y="44" width="6" height="6" fill="#1b4f8a"/>
  <rect x="68" y="44" width="10" height="6" fill="#ffffff"/>
  <rect x="68" y="44" width="6" height="6" fill="#1b4f8a"/>
  <!-- Noseguard -->
  <rect x="61" y="34" width="6" height="24" fill="#7d8794"/>

  <!-- Shoulders & Iron Pauldrons -->
  <rect x="28" y="66" width="72" height="50" fill="#314463"/>
  <rect x="24" y="66" width="18" height="20" fill="#8e99a8"/>
  <rect x="86" y="66" width="18" height="20" fill="#8e99a8"/>
  <rect x="24" y="72" width="18" height="4" fill="#586270"/>
  <rect x="86" y="72" width="18" height="4" fill="#586270"/>

  <!-- Guard Crest on chest -->
  <polygon points="64,74 54,84 64,104 74,84" fill="#d4af37"/>
  <polygon points="64,78 58,85 64,98 70,85" fill="#192a42"/>

  <!-- Coiled Rope over shoulder -->
  <ellipse cx="44" cy="88" rx="12" ry="16" fill="none" stroke="#b0844d" stroke-width="6"/>
  <ellipse cx="46" cy="90" rx="10" ry="14" fill="none" stroke="#7a5526" stroke-width="3"/>
</svg>`;

// 4. Clue 1: Footprints (Muddy boot tracks on wood planks with pine needles)
const clueFootprintsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160" width="240" height="160" shape-rendering="crispEdges">
  <rect width="240" height="160" fill="#121118"/>
  <!-- Wood Floor Planks -->
  <rect x="8" y="8" width="224" height="144" fill="#4a3018"/>
  <line x1="8" y1="44" x2="232" y2="44" stroke="#2b1a0b" stroke-width="4"/>
  <line x1="8" y1="84" x2="232" y2="84" stroke="#2b1a0b" stroke-width="4"/>
  <line x1="8" y1="124" x2="232" y2="124" stroke="#2b1a0b" stroke-width="4"/>
  <!-- Wood Grain Details -->
  <rect x="20" y="20" width="60" height="4" fill="#3b2511"/>
  <rect x="140" y="60" width="80" height="4" fill="#3b2511"/>
  <rect x="50" y="100" width="70" height="4" fill="#3b2511"/>
  <rect x="170" y="136" width="40" height="4" fill="#3b2511"/>

  <!-- Left Muddy Boot Print -->
  <g transform="translate(45, 30) rotate(12)">
    <!-- Heel -->
    <rect x="12" y="56" width="26" height="20" rx="6" fill="#1a120b"/>
    <rect x="15" y="59" width="20" height="14" rx="4" fill="#362213"/>
    <!-- Sole -->
    <rect x="8" y="14" width="34" height="38" rx="10" fill="#1a120b"/>
    <rect x="11" y="17" width="28" height="32" rx="8" fill="#362213"/>
    <!-- Tread Marks -->
    <rect x="14" y="22" width="22" height="4" fill="#1a120b"/>
    <rect x="14" y="30" width="22" height="4" fill="#1a120b"/>
    <rect x="14" y="38" width="22" height="4" fill="#1a120b"/>
  </g>

  <!-- Right Muddy Boot Print (Further up) -->
  <g transform="translate(130, 15) rotate(-8)">
    <!-- Heel -->
    <rect x="12" y="56" width="26" height="20" rx="6" fill="#1a120b"/>
    <rect x="15" y="59" width="20" height="14" rx="4" fill="#362213"/>
    <!-- Sole -->
    <rect x="8" y="14" width="34" height="38" rx="10" fill="#1a120b"/>
    <rect x="11" y="17" width="28" height="32" rx="8" fill="#362213"/>
    <!-- Tread Marks -->
    <rect x="14" y="22" width="22" height="4" fill="#1a120b"/>
    <rect x="14" y="30" width="22" height="4" fill="#1a120b"/>
    <rect x="14" y="38" width="22" height="4" fill="#1a120b"/>
  </g>

  <!-- Fresh Green Pine Needles (Scattered over mud) -->
  <line x1="60" y1="40" x2="80" y2="48" stroke="#3d7a36" stroke-width="3" stroke-linecap="round"/>
  <line x1="68" y1="36" x2="86" y2="44" stroke="#255220" stroke-width="3" stroke-linecap="round"/>
  <line x1="55" y1="95" x2="72" y2="108" stroke="#3d7a36" stroke-width="3" stroke-linecap="round"/>
  <line x1="150" y1="30" x2="170" y2="22" stroke="#4ea844" stroke-width="3" stroke-linecap="round"/>
  <line x1="145" y1="35" x2="162" y2="28" stroke="#255220" stroke-width="3" stroke-linecap="round"/>
  <line x1="175" y1="85" x2="198" y2="92" stroke="#3d7a36" stroke-width="3" stroke-linecap="round"/>
  <line x1="180" y1="78" x2="204" y2="88" stroke="#4ea844" stroke-width="3" stroke-linecap="round"/>
  <line x1="110" y1="120" x2="132" y2="128" stroke="#3d7a36" stroke-width="3" stroke-linecap="round"/>

  <!-- Evidence Tag -->
  <rect x="16" y="12" width="48" height="18" fill="#d9534f" stroke="#000" stroke-width="2"/>
  <text x="40" y="24" font-family="monospace" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">CLUE #1</text>
</svg>`;

// 5. Clue 2: Heavy Wooden Axe on Splintered Desk
const clueAxeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160" width="240" height="160" shape-rendering="crispEdges">
  <rect width="240" height="160" fill="#121118"/>
  
  <!-- Desk Surface -->
  <rect x="8" y="8" width="224" height="144" fill="#382c20"/>
  <rect x="16" y="16" width="208" height="128" fill="#4d3d2c"/>
  
  <!-- Impact Gouge & Splinters -->
  <polygon points="100,55 125,70 140,50 115,40" fill="#241a10"/>
  <polygon points="110,60 135,68 120,80" fill="#140f0a"/>
  <!-- Flying Splinters -->
  <rect x="90" y="45" width="8" height="3" fill="#8c6e4b" transform="rotate(35 90 45)"/>
  <rect x="145" y="40" width="12" height="3" fill="#8c6e4b" transform="rotate(-25 145 40)"/>
  <rect x="135" y="85" width="10" height="3" fill="#8c6e4b" transform="rotate(50 135 85)"/>
  <rect x="85" y="75" width="14" height="3" fill="#c49b6c" transform="rotate(-15 85 75)"/>

  <!-- Wooden Axe -->
  <!-- Handle -->
  <rect x="35" y="105" width="130" height="14" rx="4" fill="#69431e" transform="rotate(-30 35 105)"/>
  <rect x="40" y="107" width="120" height="6" fill="#87582b" transform="rotate(-30 35 105)"/>
  <!-- Handle grip wrap -->
  <rect x="42" y="105" width="24" height="14" fill="#3b210c" transform="rotate(-30 35 105)"/>
  <line x1="48" y1="98" x2="44" y2="114" stroke="#bf925e" stroke-width="2"/>
  <line x1="56" y1="94" x2="52" y2="110" stroke="#bf925e" stroke-width="2"/>

  <!-- Axe Head (Heavy Steel / Chipped Iron) -->
  <g transform="translate(130, 30) rotate(-30)">
    <polygon points="10,0 45,-12 55,25 35,45 10,25" fill="#7d8794"/>
    <polygon points="10,0 20,-4 20,25 10,25" fill="#4d545e"/>
    <!-- Sharp Cutting Blade -->
    <polygon points="45,-12 52,-14 62,28 35,45 38,40 55,25" fill="#cfd6e0"/>
    <!-- Chipped Notch on Blade -->
    <polygon points="58,8 52,12 56,16" fill="#241a10"/>
    <!-- Fresh wood splinters on blade edge -->
    <rect x="52" y="2" width="6" height="2" fill="#c49b6c"/>
    <rect x="46" y="24" width="8" height="3" fill="#c49b6c"/>
  </g>

  <!-- Evidence Tag -->
  <rect x="16" y="12" width="48" height="18" fill="#d9534f" stroke="#000" stroke-width="2"/>
  <text x="40" y="24" font-family="monospace" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">CLUE #2</text>
</svg>`;

// 6. Clue 3: Dropped Note (Crinkled parchment with hand-drawn axe and gold coin)
const clueNoteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160" width="240" height="160" shape-rendering="crispEdges">
  <rect width="240" height="160" fill="#121118"/>

  <!-- Desk Dark Background -->
  <rect x="8" y="8" width="224" height="144" fill="#211d24"/>

  <!-- Crinkled Parchment Paper -->
  <g transform="translate(35, 16) rotate(3)">
    <!-- Drop Shadow -->
    <polygon points="8,8 168,4 164,124 4,128" fill="#0c0b0f"/>
    <!-- Parchment Base -->
    <polygon points="4,4 164,0 160,120 0,124" fill="#e3cb98"/>
    <polygon points="8,8 158,4 154,114 6,118" fill="#fae8be"/>
    
    <!-- Crease lines -->
    <line x1="4" y1="40" x2="160" y2="35" stroke="#cfb47c" stroke-width="2"/>
    <line x1="80" y1="0" x2="75" y2="120" stroke="#cfb47c" stroke-width="2"/>

    <!-- Hand-written Header -->
    <text x="18" y="24" font-family="monospace" font-size="11" font-weight="bold" fill="#691a1a">&lt;GARTH'S PLAN&gt;</text>
    
    <!-- Written Message lines -->
    <text x="18" y="42" font-family="monospace" font-size="8" fill="#2b2319">"Tonight at 05:00 AM...</text>
    <text x="18" y="54" font-family="monospace" font-size="8" fill="#2b2319">I will use my AXE to</text>
    <text x="18" y="66" font-family="monospace" font-size="8" fill="#2b2319">take the GOLD COIN."</text>

    <!-- Hand-Drawn Doodle of Axe -->
    <g transform="translate(25, 76)">
      <line x1="0" y1="30" x2="28" y2="6" stroke="#422e17" stroke-width="3"/>
      <polygon points="24,4 36,0 40,14 26,16" fill="#525b66" stroke="#1f2329" stroke-width="1.5"/>
    </g>

    <!-- Arrow pointing to Coin -->
    <path d="M 75 92 Q 88 84 100 92" fill="none" stroke="#691a1a" stroke-width="2" stroke-dasharray="3,2"/>
    <polygon points="100,92 94,88 95,96" fill="#691a1a"/>

    <!-- Hand-Drawn Doodle of Ancient Gold Coin -->
    <g transform="translate(118, 76)">
      <circle cx="16" cy="16" r="14" fill="#fcdb38" stroke="#8a6f09" stroke-width="2"/>
      <circle cx="16" cy="16" r="10" fill="none" stroke="#d4ab17" stroke-width="1.5"/>
      <text x="16" y="20" font-family="monospace" font-size="10" font-weight="bold" fill="#8a6f09" text-anchor="middle">★</text>
    </g>
  </g>

  <!-- Evidence Tag -->
  <rect x="16" y="12" width="48" height="18" fill="#d9534f" stroke="#000" stroke-width="2"/>
  <text x="40" y="24" font-family="monospace" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">CLUE #3</text>
</svg>`;

// Write Files
fs.writeFileSync(path.join(suspectsDir, 'garth.svg'), garthSvg.trim());
fs.writeFileSync(path.join(suspectsDir, 'lin.svg'), linSvg.trim());
fs.writeFileSync(path.join(suspectsDir, 'sam.svg'), samSvg.trim());

fs.writeFileSync(path.join(cluesDir, 'c1-footprints.svg'), clueFootprintsSvg.trim());
fs.writeFileSync(path.join(cluesDir, 'c1-axe.svg'), clueAxeSvg.trim());
fs.writeFileSync(path.join(cluesDir, 'c1-note.svg'), clueNoteSvg.trim());

console.log('✅ Generated 6 Pixel-Art Visual Assets for Level 1:');
console.log('  - images/suspects/garth.svg');
console.log('  - images/suspects/lin.svg');
console.log('  - images/suspects/sam.svg');
console.log('  - images/clues/c1-footprints.svg');
console.log('  - images/clues/c1-axe.svg');
console.log('  - images/clues/c1-note.svg');
