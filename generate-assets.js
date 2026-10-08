/**
 * CASE: AARNA - High-Clarity Retro Pixel-Art & Vector Asset Generator
 * Generates clear, high-contrast, self-contained SVG assets with embedded title banners for all 10 cases.
 */

const fs = require('fs');
const path = require('path');

const suspectsDir = path.join(__dirname, 'images', 'suspects');
const cluesDir = path.join(__dirname, 'images', 'clues');

if (!fs.existsSync(suspectsDir)) fs.mkdirSync(suspectsDir, { recursive: true });
if (!fs.existsSync(cluesDir)) fs.mkdirSync(cluesDir, { recursive: true });

function escapeXml(str) {
    return str.replace(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;)/g, '&amp;');
}

function saveSvg(filePath, svgContent) {
    fs.writeFileSync(filePath, escapeXml(svgContent).trim());
}

/**
 * Standard Clue Frame Helper
 * @param {string} title Clue Title at Top
 * @param {string} subtitle Short helper tag at bottom
 * @param {string} borderColor Accent color for border and title
 * @param {string} graphicSvg Inner SVG content (centered at 120, 90)
 */
function createClueSvg(title, subtitle, borderColor, graphicSvg) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180" width="240" height="180" shape-rendering="crispEdges">
  <!-- Background -->
  <rect width="240" height="180" fill="#08080d"/>
  <rect x="6" y="6" width="228" height="168" fill="#12121a" stroke="${borderColor}" stroke-width="3"/>
  <rect x="10" y="10" width="220" height="160" fill="#171722"/>

  <!-- Top Title Banner -->
  <rect x="10" y="10" width="220" height="26" fill="#0c0c14" stroke="${borderColor}" stroke-width="2"/>
  <text x="120" y="27" text-anchor="middle" fill="${borderColor}" font-family="'Courier New', monospace" font-size="11" font-weight="900" letter-spacing="1">${title}</text>

  <!-- Clue Graphic Area -->
  <g>
    ${graphicSvg}
  </g>

  <!-- Bottom Detail Tag -->
  <rect x="16" y="152" width="208" height="16" fill="#0c0c14"/>
  <text x="120" y="164" text-anchor="middle" fill="#8e8e9e" font-family="'Courier New', monospace" font-size="8" font-weight="bold" letter-spacing="1">${subtitle}</text>
</svg>`;
}

/**
 * Standard Suspect Portrait Helper
 * @param {string} name Suspect Name
 * @param {string} role Role / Occupation
 * @param {string} borderColor Accent color
 * @param {string} characterSvg Character drawing
 */
function createSuspectSvg(name, role, borderColor, characterSvg) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" shape-rendering="crispEdges">
  <!-- Background Card -->
  <rect width="200" height="200" fill="#0a0910"/>
  <rect x="6" y="6" width="188" height="188" fill="#15141f" stroke="${borderColor}" stroke-width="3"/>
  <rect x="12" y="12" width="176" height="176" fill="#1c1a29"/>

  <!-- Character Artwork -->
  <g>
    ${characterSvg}
  </g>

  <!-- Name Banner -->
  <rect x="12" y="162" width="176" height="26" fill="#0d0c14" stroke="${borderColor}" stroke-width="2"/>
  <text x="100" y="176" text-anchor="middle" fill="#ffffff" font-family="'Courier New', monospace" font-size="11" font-weight="900" letter-spacing="1">${name.toUpperCase()}</text>
  <text x="100" y="186" text-anchor="middle" fill="${borderColor}" font-family="'Courier New', monospace" font-size="7" font-weight="bold" letter-spacing="1">${role.toUpperCase()}</text>
</svg>`;
}

/* =========================================================================
   CASE 1: THE MISSING COIN (Village)
   Culprit: Garth (Woodcutter with axe and pine needles)
   ========================================================================= */

// Garth (Woodcutter: Red Flannel, Beard, Large Axe)
const garthSvg = createSuspectSvg('Garth', 'Woodcutter', '#e63946', `
  <!-- Pine Background Backdrop -->
  <polygon points="100,20 60,70 140,70" fill="#1b2e1e"/>
  <!-- Hair / Cap -->
  <rect x="70" y="30" width="60" height="16" fill="#5c2e14"/>
  <rect x="65" y="34" width="70" height="12" fill="#8b3a1b"/>
  <!-- Face -->
  <rect x="70" y="44" width="60" height="40" fill="#fcd0a1"/>
  <!-- Eyes -->
  <rect x="76" y="52" width="10" height="10" fill="#ffffff"/>
  <rect x="82" y="54" width="4" height="8" fill="#1c120c"/>
  <rect x="114" y="52" width="10" height="10" fill="#ffffff"/>
  <rect x="114" y="54" width="4" height="8" fill="#1c120c"/>
  <!-- Nose -->
  <rect x="94" y="58" width="12" height="10" fill="#d99b6c"/>
  <!-- Full Bushy Beard -->
  <rect x="62" y="70" width="76" height="34" fill="#4a220d"/>
  <rect x="74" y="76" width="52" height="28" fill="#361707"/>
  <!-- Red Flannel Shirt -->
  <rect x="45" y="104" width="110" height="58" fill="#b81d24"/>
  <!-- Plaid Black Lines -->
  <rect x="45" y="118" width="110" height="8" fill="#241415"/>
  <rect x="45" y="138" width="110" height="8" fill="#241415"/>
  <rect x="72" y="104" width="8" height="58" fill="#241415"/>
  <rect x="120" y="104" width="8" height="58" fill="#241415"/>
  <!-- Large Prominent Axe on Shoulder -->
  <rect x="145" y="45" width="10" height="90" fill="#8c5828" transform="rotate(-15 145 45)"/>
  <polygon points="140,40 180,25 185,65 145,55" fill="#a8b2bd" stroke="#48535e" stroke-width="2"/>
  <polygon points="175,28 185,25 185,65 178,60" fill="#ffffff"/>
`);

// Lin (Farmer: Straw Hat, Blue Overalls, Shovel)
const linSvg = createSuspectSvg('Lin', 'Farmer', '#f1a208', `
  <!-- Straw Hat -->
  <ellipse cx="100" cy="40" rx="68" ry="16" fill="#d4af37" stroke="#87680c" stroke-width="2"/>
  <rect x="68" y="16" width="64" height="26" fill="#f2cb44"/>
  <rect x="68" y="36" width="64" height="6" fill="#8a2d1d"/>
  <!-- Face -->
  <rect x="72" y="44" width="56" height="42" fill="#fcd0a1"/>
  <rect x="78" y="54" width="8" height="8" fill="#21180f"/>
  <rect x="114" y="54" width="8" height="8" fill="#21180f"/>
  <rect x="74" y="66" width="10" height="6" fill="#f79c88"/>
  <rect x="116" y="66" width="10" height="6" fill="#f79c88"/>
  <rect x="90" y="72" width="20" height="6" fill="#8f3e30"/>
  <!-- Wheat Stalk in mouth -->
  <line x1="100" y1="74" x2="140" y2="82" stroke="#eed469" stroke-width="3"/>
  <polygon points="140,82 148,78 150,86" fill="#f2cb44"/>
  <!-- Yellow Shirt + Blue Overalls -->
  <rect x="50" y="95" width="100" height="67" fill="#f0b429"/>
  <rect x="62" y="105" width="76" height="57" fill="#2b5282"/>
  <rect x="68" y="95" width="12" height="40" fill="#1d3859"/>
  <rect x="120" y="95" width="12" height="40" fill="#1d3859"/>
  <!-- Metal Shovel in Hand -->
  <rect x="25" y="60" width="8" height="80" fill="#875323"/>
  <path d="M15,50 L43,50 L38,80 L20,80 Z" fill="#9eaec4" stroke="#48535e" stroke-width="2"/>
`);

// Sam (Guard: Iron Helmet, Armor, Rope)
const samSvg = createSuspectSvg('Sam', 'Town Guard', '#4cc9f0', `
  <!-- Iron Helmet -->
  <rect x="65" y="24" width="70" height="40" fill="#8a99ad" stroke="#374352" stroke-width="2"/>
  <rect x="70" y="16" width="60" height="12" fill="#adbdd1"/>
  <rect x="65" y="44" width="70" height="10" fill="#242c36"/>
  <!-- Face Visor opening -->
  <rect x="72" y="54" width="56" height="34" fill="#f0c299"/>
  <rect x="78" y="60" width="10" height="8" fill="#14181f"/>
  <rect x="112" y="60" width="10" height="8" fill="#14181f"/>
  <!-- Armor -->
  <rect x="46" y="92" width="108" height="70" fill="#58687d"/>
  <rect x="64" y="98" width="72" height="64" fill="#8a99ad"/>
  <!-- Coiled Rope on shoulder -->
  <ellipse cx="145" cy="115" rx="18" ry="24" fill="none" stroke="#b0834a" stroke-width="8"/>
  <ellipse cx="145" cy="120" rx="14" ry="20" fill="none" stroke="#875d27" stroke-width="6"/>
`);

// Case 1 Clues
const c1FootprintsSvg = createClueSvg('MUDDY BOOT PRINTS', 'EVIDENCE: DEEP TREADS + PINE NEEDLES', '#55ff55', `
  <!-- Floor Tile Lines -->
  <line x1="10" y1="90" x2="230" y2="90" stroke="#252538" stroke-width="2"/>
  <line x1="120" y1="36" x2="120" y2="152" stroke="#252538" stroke-width="2"/>
  <!-- Left Mud Boot Print -->
  <ellipse cx="75" cy="85" rx="18" ry="32" fill="#382110" transform="rotate(-10 75 85)"/>
  <ellipse cx="73" cy="110" rx="14" ry="16" fill="#29160a" transform="rotate(-10 73 110)"/>
  <!-- Right Mud Boot Print -->
  <ellipse cx="155" cy="75" rx="18" ry="32" fill="#382110" transform="rotate(10 155 75)"/>
  <ellipse cx="157" cy="100" rx="14" ry="16" fill="#29160a" transform="rotate(10 157 100)"/>
  <!-- Bright Green Pine Needles on top of prints -->
  <line x1="50" y1="65" x2="80" y2="55" stroke="#2ed63b" stroke-width="4"/>
  <line x1="65" y1="95" x2="95" y2="85" stroke="#2ed63b" stroke-width="4"/>
  <line x1="140" y1="60" x2="170" y2="70" stroke="#2ed63b" stroke-width="4"/>
  <line x1="150" y1="105" x2="180" y2="115" stroke="#2ed63b" stroke-width="4"/>
  <line x1="105" y1="80" x2="125" y2="95" stroke="#2ed63b" stroke-width="4"/>
`);

const c1AxeSvg = createClueSvg('CHIPPED WOODEN AXE', 'EVIDENCE: HEAVY SPLINTERED BLADE', '#ff9f1c', `
  <!-- Desk Base -->
  <rect x="30" y="115" width="180" height="25" fill="#3b2716" stroke="#1f1308" stroke-width="2"/>
  <!-- Axe Handle -->
  <rect x="40" y="60" width="140" height="16" fill="#8c5828" stroke="#4a2a0c" stroke-width="2" transform="rotate(20 40 60)"/>
  <!-- Axe Blade Head -->
  <polygon points="145,65 195,45 205,105 155,95" fill="#80562e" stroke="#3b2410" stroke-width="3"/>
  <polygon points="175,55 195,45 205,105 185,98" fill="#ba8049"/>
  <!-- Chipped Splinters -->
  <polygon points="195,70 185,75 197,80" fill="#12121a"/>
  <polygon points="140,110 148,105 145,115" fill="#e0a058"/>
  <polygon points="160,118 170,112 165,122" fill="#e0a058"/>
`);

const c1NoteSvg = createClueSvg('DROPPED NOTE', 'EVIDENCE: SCRAP SHOWING AXE AND GOLD', '#ffdd59', `
  <!-- Crinkled Parchment Sheet -->
  <polygon points="40,42 200,38 195,142 35,145" fill="#f5e6c4" stroke="#8a6f3b" stroke-width="3"/>
  <!-- Bold Axe Sketch on Note -->
  <line x1="60" y1="65" x2="95" y2="105" stroke="#7a3e14" stroke-width="5"/>
  <polygon points="85,60 110,50 112,78 90,72" fill="#8a4f21"/>
  <!-- Gold Coin Sketch on Note -->
  <circle cx="150" cy="80" r="22" fill="#ffd000" stroke="#a37a00" stroke-width="3"/>
  <circle cx="150" cy="80" r="14" fill="#ffe266"/>
  <text x="150" y="86" text-anchor="middle" fill="#735200" font-family="'Courier New', monospace" font-size="14" font-weight="bold">$</text>
  <!-- Handwritten Lettering -->
  <text x="50" y="125" fill="#3b2310" font-family="'Courier New', monospace" font-size="10" font-weight="900">"USE AXE FOR COIN - G"</text>
`);

/* =========================================================================
   CASE 2: THE POISONED MILL (Farmlands)
   Culprit: Lin (Botanist in green robe with green poison)
   ========================================================================= */

// Clara (Weaver: Pink Scarf)
const claraWeaverSvg = createSuspectSvg('Clara', 'Weaver', '#f72585', `
  <rect x="65" y="24" width="70" height="36" fill="#4d2411"/>
  <rect x="72" y="44" width="56" height="42" fill="#fcd0a1"/>
  <rect x="78" y="54" width="8" height="8" fill="#24140b"/>
  <rect x="114" y="54" width="8" height="8" fill="#24140b"/>
  <!-- Dress -->
  <rect x="45" y="95" width="110" height="67" fill="#693043"/>
  <!-- Bright Magenta Wool Scarf wrapped around neck -->
  <rect x="52" y="85" width="96" height="22" fill="#f72585" stroke="#a80a53" stroke-width="2"/>
  <rect x="110" y="98" width="22" height="50" fill="#f72585" stroke="#a80a53" stroke-width="2"/>
`);

// Tuck (Baker: Chef Hat & Apron, Bread)
const tuckBakerSvg = createSuspectSvg('Tuck', 'Baker', '#ffffff', `
  <!-- Tall White Chef Hat -->
  <ellipse cx="100" cy="30" rx="40" ry="20" fill="#ffffff" stroke="#a3a3a3" stroke-width="2"/>
  <rect x="68" y="25" width="64" height="24" fill="#ffffff"/>
  <!-- Face -->
  <rect x="72" y="48" width="56" height="40" fill="#fcd0a1"/>
  <rect x="78" y="58" width="8" height="8" fill="#24140b"/>
  <rect x="114" y="58" width="8" height="8" fill="#24140b"/>
  <!-- White Chef Apron -->
  <rect x="45" y="96" width="110" height="66" fill="#7a4e28"/>
  <rect x="60" y="96" width="80" height="66" fill="#ffffff" stroke="#b0b0b0" stroke-width="2"/>
  <!-- Holding French Bread Loaf -->
  <ellipse cx="40" cy="125" rx="20" ry="10" fill="#d49444" stroke="#7a4e18" stroke-width="2" transform="rotate(-30 40 125)"/>
`);

// Lin (Botanist in Green Robe + Green Poison Flask)
const linPotionsSvg = createSuspectSvg('Lin', 'Botanist', '#55ff55', `
  <!-- Green Hood / Robe -->
  <polygon points="100,16 55,54 145,54" fill="#1b4d24"/>
  <rect x="66" y="38" width="68" height="52" fill="#2a7a3a"/>
  <!-- Face inside hood -->
  <rect x="74" y="48" width="52" height="38" fill="#fcd0a1"/>
  <rect x="80" y="58" width="8" height="8" fill="#113317"/>
  <rect x="112" y="58" width="8" height="8" fill="#113317"/>
  <!-- Robe Body -->
  <rect x="45" y="96" width="110" height="66" fill="#2a7a3a"/>
  <rect x="78" y="96" width="44" height="66" fill="#1b4d24"/>
  <!-- Holding Glowing Acid-Green Poison Flask -->
  <ellipse cx="150" cy="120" rx="18" ry="24" fill="#39ff14" stroke="#166606" stroke-width="3"/>
  <rect x="145" y="92" width="10" height="12" fill="#80562e"/>
  <circle cx="150" cy="122" r="8" fill="#baffc7"/>
`);

// Case 2 Clues
const c2BottleSvg = createClueSvg('GREEN POISON VIAL', 'EVIDENCE: LETHAL PLANT EXTRACT', '#39ff14', `
  <!-- Pedestal -->
  <rect x="60" y="125" width="120" height="20" fill="#2d382e" stroke="#121f14" stroke-width="2"/>
  <!-- Flask Neck & Cork -->
  <rect x="110" y="40" width="20" height="18" fill="#80562e" stroke="#422911" stroke-width="2"/>
  <rect x="106" y="56" width="28" height="12" fill="#528a5e"/>
  <!-- Glass Body filled with Glowing Acid Green Liquid -->
  <polygon points="106,68 134,68 165,122 75,122" fill="#39ff14" stroke="#146107" stroke-width="4"/>
  <!-- Toxic Skull Icon on Bottle -->
  <circle cx="120" cy="98" r="10" fill="#000000"/>
  <circle cx="116" cy="96" r="3" fill="#39ff14"/>
  <circle cx="124" cy="96" r="3" fill="#39ff14"/>
  <rect x="117" y="104" width="6" height="4" fill="#000000"/>
`);

const c2StainSvg = createClueSvg('GREEN LIQUID SPLASH', 'EVIDENCE: POISON SPILLED ON FLOOR', '#39ff14', `
  <!-- Floor Planks -->
  <line x1="10" y1="70" x2="230" y2="70" stroke="#332214" stroke-width="3"/>
  <line x1="10" y1="115" x2="230" y2="115" stroke="#332214" stroke-width="3"/>
  <!-- Bright Green Poison Puddle -->
  <ellipse cx="120" cy="95" rx="65" ry="32" fill="#39ff14"/>
  <circle cx="65" cy="80" r="15" fill="#39ff14"/>
  <circle cx="175" cy="105" r="18" fill="#39ff14"/>
  <circle cx="150" cy="65" r="12" fill="#39ff14"/>
  <ellipse cx="120" cy="95" rx="45" ry="20" fill="#9eff8a"/>
`);

const c2ScrollSvg = createClueSvg('POISON RECIPE SCROLL', 'EVIDENCE: FORMULA SIGNED BY LIN', '#39ff14', `
  <!-- Parchment Scroll -->
  <rect x="45" y="38" width="150" height="106" fill="#f5f0dc" stroke="#47664c" stroke-width="3"/>
  <!-- Green Poison Icon Drawing -->
  <polygon points="65,60 85,60 95,95 55,95" fill="#39ff14" stroke="#1c5c24" stroke-width="2"/>
  <!-- Text on scroll -->
  <text x="105" y="65" fill="#1b4d24" font-family="'Courier New', monospace" font-size="10" font-weight="bold">POISON RECIPE</text>
  <line x1="105" y1="75" x2="180" y2="75" stroke="#1b4d24" stroke-width="2"/>
  <line x1="105" y1="85" x2="165" y2="85" stroke="#1b4d24" stroke-width="2"/>
  <text x="75" y="125" fill="#0d3b14" font-family="'Courier New', monospace" font-size="12" font-weight="900">AUTHOR: LIN</text>
`);

/* =========================================================================
   CASE 3: THE LIGHTNING TOWER (Fortress)
   Culprit: Vance (Engineer with orange goggles & copper wire)
   ========================================================================= */

// Vance (Engineer: Orange Goggles, Rubber Gloves, Copper Wire)
const vanceEngineerSvg = createSuspectSvg('Vance', 'Engineer', '#ff9f1c', `
  <rect x="68" y="24" width="64" height="20" fill="#4d301b"/>
  <!-- Orange Protective Goggles -->
  <rect x="60" y="42" width="80" height="22" fill="#d66800" stroke="#472300" stroke-width="2"/>
  <circle cx="80" cy="53" r="9" fill="#00ffff" stroke="#ffffff" stroke-width="2"/>
  <circle cx="120" cy="53" r="9" fill="#00ffff" stroke="#ffffff" stroke-width="2"/>
  <!-- Face -->
  <rect x="70" y="64" width="60" height="28" fill="#fcd0a1"/>
  <rect x="88" y="78" width="24" height="6" fill="#7a3616"/>
  <!-- Work Jacket -->
  <rect x="45" y="96" width="110" height="66" fill="#3a4b61"/>
  <!-- Orange Rubber Gloves -->
  <rect x="35" y="120" width="25" height="35" fill="#ff7700" stroke="#7a3900" stroke-width="2"/>
  <!-- Spool of Orange Copper Wire in hand -->
  <circle cx="150" cy="130" r="22" fill="#d95f02" stroke="#ffaa5e" stroke-width="4"/>
  <circle cx="150" cy="130" r="10" fill="#3a4b61"/>
`);

// Bruno (Mason: Grey Chisel Belt)
const brunoMasonSvg = createSuspectSvg('Bruno', 'Stonemason', '#adb5bd', `
  <rect x="66" y="24" width="68" height="26" fill="#2b2621"/>
  <rect x="72" y="48" width="56" height="42" fill="#fcd0a1"/>
  <rect x="78" y="58" width="8" height="8" fill="#141414"/>
  <rect x="114" y="58" width="8" height="8" fill="#141414"/>
  <!-- Stonemason Grey Apron -->
  <rect x="45" y="96" width="110" height="66" fill="#525459"/>
  <rect x="45" y="120" width="110" height="14" fill="#29292e"/>
  <!-- Heavy Steel Chisel in Belt -->
  <rect x="94" y="112" width="12" height="38" fill="#c4ccd4" stroke="#43484f" stroke-width="2"/>
`);

// Selena (Trader: Blue Merchant Pack)
const selenaTraderSvg = createSuspectSvg('Selena', 'Trader', '#4361ee', `
  <rect x="62" y="22" width="76" height="32" fill="#3d1d0c"/>
  <rect x="72" y="48" width="56" height="42" fill="#fcd0a1"/>
  <rect x="78" y="58" width="8" height="8" fill="#122038"/>
  <rect x="114" y="58" width="8" height="8" fill="#122038"/>
  <!-- Tunic -->
  <rect x="45" y="96" width="110" height="66" fill="#2a6f97"/>
  <!-- Huge Blue Backpack on side -->
  <rect x="135" y="80" width="35" height="60" fill="#4361ee" stroke="#16297a" stroke-width="3"/>
  <rect x="135" y="95" width="35" height="10" fill="#f72585"/>
`);

// Case 3 Clues
const c3WireSvg = createClueSvg('ORANGE COPPER WIRE', 'EVIDENCE: CONDUCTIVE LIGHTNING LINE', '#ff9f1c', `
  <!-- Lightning Rod Pole -->
  <rect x="112" y="38" width="16" height="65" fill="#a0aab5" stroke="#3e4a57" stroke-width="2"/>
  <polygon points="106,38 134,38 120,20" fill="#ffd000"/>
  <!-- Coiled Bright Orange Copper Wire -->
  <path d="M120,45 Q190,70 160,110 T90,120 T140,145" stroke="#ff7700" stroke-width="8" fill="none"/>
  <path d="M120,45 Q190,70 160,110 T90,120 T140,145" stroke="#ffc078" stroke-width="3" fill="none"/>
  <!-- Sparks -->
  <polygon points="175,65 190,55 185,75 200,68 175,95 182,78" fill="#00ffff"/>
`);

const c3BurnSvg = createClueSvg('ELECTRICAL SCORCH MARK', 'EVIDENCE: HIGH VOLTAGE BLAST', '#00f5d4', `
  <!-- Iron Floor Plate -->
  <rect x="40" y="40" width="160" height="100" fill="#586370" stroke="#252c36" stroke-width="3"/>
  <!-- Black Scorched Center -->
  <circle cx="120" cy="90" r="40" fill="#141417"/>
  <!-- Lightning Scorch Cracks -->
  <path d="M120,90 L90,50 M120,90 L160,55 M120,90 L75,115 M120,90 L165,125" stroke="#00ffff" stroke-width="3"/>
  <polygon points="120,65 110,85 125,85 115,110 135,80 122,80" fill="#ffd000"/>
`);

const c3TagSvg = createClueSvg('WIRE SPOOL TAG', 'EVIDENCE: LABELED TO VANCE', '#ff9f1c', `
  <!-- Copper Spool -->
  <circle cx="75" cy="90" r="38" fill="#d95f02" stroke="#7a3400" stroke-width="4"/>
  <circle cx="75" cy="90" r="16" fill="#12121a"/>
  <!-- Label Tag -->
  <polygon points="110,50 215,50 205,130 100,130" fill="#ffffff" stroke="#d95f02" stroke-width="3"/>
  <text x="155" y="75" text-anchor="middle" fill="#241405" font-family="'Courier New', monospace" font-size="10" font-weight="bold">COPPER CABLE</text>
  <line x1="115" y1="85" x2="195" y2="85" stroke="#d95f02" stroke-width="2"/>
  <text x="155" y="110" text-anchor="middle" fill="#d90429" font-family="'Courier New', monospace" font-size="12" font-weight="900">VANCE - ENG</text>
`);

/* =========================================================================
   CASE 4: THE LAVA GATE (Caverns)
   Culprit: Zul (Treasurer with gold signet ring & gate lever)
   ========================================================================= */

// Zul (Treasurer: Crimson Robes, Gold Signet Ring)
const zulTreasurerSvg = createSuspectSvg('Zul', 'Treasurer', '#ffd700', `
  <!-- Crimson Headdress -->
  <rect x="60" y="20" width="80" height="28" fill="#800f2f" stroke="#ffb703" stroke-width="2"/>
  <!-- Face -->
  <rect x="70" y="44" width="60" height="42" fill="#fcd0a1"/>
  <rect x="78" y="54" width="8" height="8" fill="#2e1405"/>
  <rect x="114" y="54" width="8" height="8" fill="#2e1405"/>
  <rect x="90" y="70" width="20" height="8" fill="#541b0b"/>
  <!-- Crimson & Gold Robes -->
  <rect x="45" y="96" width="110" height="66" fill="#800f2f"/>
  <rect x="80" y="96" width="40" height="66" fill="#ffb703"/>
  <!-- Large Prominent Gold Signet Ring on Hand -->
  <circle cx="45" cy="125" r="16" fill="#fcd0a1"/>
  <circle cx="45" cy="125" r="10" fill="#ffd700" stroke="#7a5500" stroke-width="3"/>
  <rect x="41" y="121" width="8" height="8" fill="#990000"/>
`);

// Pyra (Handler: Lava Staff)
const pyraHandlerSvg = createSuspectSvg('Pyra', 'Lava Handler', '#ff5400', `
  <rect x="66" y="24" width="68" height="26" fill="#b02a07"/>
  <rect x="72" y="48" width="56" height="42" fill="#fcd0a1"/>
  <rect x="78" y="58" width="8" height="8" fill="#3b0f03"/>
  <rect x="114" y="58" width="8" height="8" fill="#3b0f03"/>
  <rect x="45" y="96" width="110" height="66" fill="#d00000"/>
  <!-- Flaming Lava Staff -->
  <rect x="150" y="30" width="8" height="120" fill="#693b19"/>
  <circle cx="154" cy="30" r="16" fill="#ff5400" stroke="#ffdd00" stroke-width="3"/>
`);

// Vorg (Sentry: Dark Steel Armor & Shield)
const vorgSentrySvg = createSuspectSvg('Vorg', 'Sentry', '#6c757d', `
  <rect x="65" y="22" width="70" height="38" fill="#495057" stroke="#212529" stroke-width="2"/>
  <rect x="72" y="50" width="56" height="38" fill="#f0c299"/>
  <rect x="78" y="58" width="8" height="8" fill="#000000"/>
  <rect x="114" y="58" width="8" height="8" fill="#000000"/>
  <rect x="45" y="96" width="110" height="66" fill="#343a40"/>
  <!-- Big Iron Shield -->
  <polygon points="20,80 55,80 50,140 25,140" fill="#6c757d" stroke="#212529" stroke-width="3"/>
`);

// Case 4 Clues
const c4LeverSvg = createClueSvg('GATE CONTROL LEVER', 'EVIDENCE: GOLD SIGNET IMPRINT ON SWITCH', '#ffd700', `
  <!-- Control Box -->
  <rect x="40" y="60" width="65" height="80" fill="#3d3a45" stroke="#1b1921" stroke-width="3"/>
  <!-- Lever Arm pulled down -->
  <line x1="72" y1="95" x2="165" y2="45" stroke="#a0aab5" stroke-width="12"/>
  <circle cx="170" cy="42" r="18" fill="#d90429"/>
  <!-- Gold Signet Ring Smudge -->
  <circle cx="166" cy="44" r="10" fill="#ffd700" stroke="#8a6700" stroke-width="2"/>
  <rect x="162" y="40" width="8" height="8" fill="#800f2f"/>
`);

const c4GateSvg = createClueSvg('CRUSHED PORTCULLIS', 'EVIDENCE: HEAVY IRON GATE DROPPED', '#ff5400', `
  <!-- Massive Iron Gate Bars -->
  <rect x="40" y="38" width="160" height="70" fill="#2b2d42" stroke="#12131c" stroke-width="3"/>
  <line x1="70" y1="38" x2="70" y2="108" stroke="#8d99ae" stroke-width="6"/>
  <line x1="100" y1="38" x2="100" y2="108" stroke="#8d99ae" stroke-width="6"/>
  <line x1="130" y1="38" x2="130" y2="108" stroke="#8d99ae" stroke-width="6"/>
  <line x1="160" y1="38" x2="160" y2="108" stroke="#8d99ae" stroke-width="6"/>
  <!-- Crushed Stone under gate -->
  <polygon points="30,110 210,110 190,145 50,145" fill="#e85d04"/>
  <polygon points="60,112 85,100 100,120" fill="#6c757d"/>
  <polygon points="140,112 165,98 175,122" fill="#6c757d"/>
`);

const c4LedgerSvg = createClueSvg('GATE DROP ORDER', 'EVIDENCE: SIGNED WITH ZUL SEAL', '#ffd700', `
  <polygon points="45,38 195,38 190,145 40,145" fill="#faebd0" stroke="#800f2f" stroke-width="3"/>
  <!-- Red Header Bar -->
  <rect x="52" y="48" width="132" height="12" fill="#800f2f"/>
  <text x="118" y="58" text-anchor="middle" fill="#ffffff" font-family="'Courier New', monospace" font-size="8" font-weight="bold">LAVA GATE DIRECTIVE</text>
  <text x="60" y="85" fill="#381b0d" font-family="'Courier New', monospace" font-size="10" font-weight="bold">DROP PORTCULLIS: 02:00</text>
  <!-- Gold Wax Seal stamped ZUL -->
  <circle cx="150" cy="115" r="18" fill="#ffd700" stroke="#7a5500" stroke-width="2"/>
  <text x="150" y="120" text-anchor="middle" fill="#800f2f" font-family="'Courier New', monospace" font-size="11" font-weight="900">ZUL</text>
`);

/* =========================================================================
   CASE 5: THE ROPE BRIDGE (Magma Canyon)
   Culprit: Malakor (Nomad with black hooded cowl & swapped water flask)
   ========================================================================= */

// Malakor (Nomad: Black Hooded Cowl, Red Glowing Eyes, Water Flask)
const malakorNomadSvg = createSuspectSvg('Malakor', 'Nomad', '#9d4edd', `
  <!-- Pure Black Hooded Cowl -->
  <polygon points="100,16 45,54 155,54" fill="#0d0d12"/>
  <rect x="55" y="40" width="90" height="52" fill="#171721"/>
  <!-- Deep Shadow Face + Glowing Red Eyes -->
  <rect x="68" y="48" width="64" height="38" fill="#08080a"/>
  <rect x="76" y="60" width="12" height="6" fill="#ff0054"/>
  <rect x="112" y="60" width="12" height="6" fill="#ff0054"/>
  <!-- Pitch Black Robe Body -->
  <rect x="40" y="94" width="120" height="68" fill="#0d0d12"/>
  <!-- Clear Cold Water Flask -->
  <circle cx="155" cy="125" r="18" fill="#00f5d4" stroke="#0077b6" stroke-width="3"/>
  <rect x="151" y="98" width="8" height="12" fill="#80562e"/>
`);

// Darek (Quarryman: Iron Pickaxe)
const darekQuarrymanSvg = createSuspectSvg('Darek', 'Quarryman', '#adb5bd', `
  <rect x="66" y="24" width="68" height="24" fill="#3b2210"/>
  <rect x="72" y="46" width="56" height="42" fill="#fcd0a1"/>
  <rect x="78" y="56" width="8" height="8" fill="#141414"/>
  <rect x="114" y="56" width="8" height="8" fill="#141414"/>
  <rect x="45" y="94" width="110" height="68" fill="#6c584c"/>
  <!-- Heavy Iron Pickaxe -->
  <line x1="130" y1="50" x2="160" y2="150" stroke="#8a5327" stroke-width="6"/>
  <path d="M110,45 Q140,25 175,50" stroke="#c4ccd4" stroke-width="8" fill="none"/>
`);

// Mira (Scout: Green Tunic & Brown Leather Boots)
const miraScoutSvg = createSuspectSvg('Mira', 'Scout', '#52b788', `
  <rect x="62" y="22" width="76" height="30" fill="#402312"/>
  <rect x="72" y="48" width="56" height="40" fill="#fcd0a1"/>
  <rect x="78" y="58" width="8" height="8" fill="#0d2412"/>
  <rect x="114" y="58" width="8" height="8" fill="#0d2412"/>
  <rect x="45" y="94" width="110" height="68" fill="#52b788"/>
  <!-- Brown Leather Exploration Boots -->
  <rect x="60" y="130" width="22" height="32" fill="#7f4f24"/>
  <rect x="118" y="130" width="22" height="32" fill="#7f4f24"/>
`);

// Case 5 Clues
const c5ThreadSvg = createClueSvg('BLACK COWL THREADS', 'EVIDENCE: SHREDDED HOOD FIBERS ON BUCKLE', '#9d4edd', `
  <!-- Bronze Saddle Buckle -->
  <rect x="70" y="50" width="100" height="75" fill="#b08947" stroke="#523a13" stroke-width="4"/>
  <rect x="85" y="65" width="70" height="45" fill="#171722"/>
  <!-- Pitch Black Cowl Fibers Snagged -->
  <path d="M95,65 L80,120 L110,105 L95,145" stroke="#050508" stroke-width="6" fill="none"/>
  <path d="M125,65 L145,130 L160,115 L170,140" stroke="#050508" stroke-width="6" fill="none"/>
  <circle cx="80" cy="120" r="4" fill="#ff0054"/>
`);

const c5FlaskSvg = createClueSvg('SWAPPED WATER FLASK', 'EVIDENCE: COLD WATER (NO FIRE RESISTANCE)', '#00f5d4', `
  <!-- Pedestal in Lava -->
  <rect x="50" y="125" width="140" height="20" fill="#ff5400"/>
  <!-- Glass Flask filled with Clear Cold Water -->
  <ellipse cx="120" cy="85" rx="42" ry="42" fill="#00f5d4" stroke="#0077b6" stroke-width="4"/>
  <rect x="112" y="32" width="16" height="20" fill="#80562e" stroke="#422911" stroke-width="2"/>
  <!-- Frost Shimmer in water -->
  <polygon points="120,60 125,75 140,80 125,85 120,100 115,85 100,80 115,75" fill="#ffffff"/>
  <text x="120" y="115" text-anchor="middle" fill="#03045e" font-family="'Courier New', monospace" font-size="10" font-weight="bold">COLD WATER</text>
`);

const c5CorkSvg = createClueSvg('MARKED FLASK CORK', 'EVIDENCE: STAMPED WITH "M"', '#ffdd59', `
  <!-- Lava River Surface -->
  <rect x="20" y="80" width="200" height="60" fill="#e85d04"/>
  <polygon points="20,80 60,65 110,85 170,68 220,80 220,140 20,140" fill="#ffba08"/>
  <!-- Wooden Flask Cork Floating -->
  <ellipse cx="120" cy="75" rx="36" ry="22" fill="#8c5828" stroke="#4a2a0c" stroke-width="3"/>
  <!-- Bold Stamped Letter M -->
  <text x="120" y="84" text-anchor="middle" fill="#ffffff" font-family="'Courier New', monospace" font-size="22" font-weight="900">M</text>
`);

/* =========================================================================
   CASE 6: THE STONE VAULT (Nether Delta)
   Culprit: Solas (Alchemist with yellow sulfur powder & bomb)
   ========================================================================= */

// Solas (Alchemist: Maroon Robes, Bright Yellow Sulfur Dust)
const solasFiremageSvg = createSuspectSvg('Solas', 'Alchemist', '#ffea00', `
  <rect x="66" y="24" width="68" height="26" fill="#ffd000"/>
  <rect x="72" y="48" width="56" height="42" fill="#fcd0a1"/>
  <rect x="78" y="58" width="8" height="8" fill="#3b2b03"/>
  <rect x="114" y="58" width="8" height="8" fill="#3b2b03"/>
  <!-- Dark Maroon Robes with Sleeves Covered in Bright Yellow Sulfur Dust -->
  <rect x="45" y="96" width="110" height="66" fill="#6a040f"/>
  <!-- Bright Yellow Powder on Sleeves -->
  <rect x="35" y="110" width="22" height="45" fill="#ffea00" stroke="#998000" stroke-width="2"/>
  <rect x="143" y="110" width="22" height="45" fill="#ffea00" stroke="#998000" stroke-width="2"/>
`);

// Varren (Cutter: Heavy Saw)
const varrenCutterSvg = createSuspectSvg('Varren', 'Stonecutter', '#adb5bd', `
  <rect x="66" y="24" width="68" height="26" fill="#242426"/>
  <rect x="72" y="48" width="56" height="42" fill="#fcd0a1"/>
  <rect x="78" y="58" width="8" height="8" fill="#141414"/>
  <rect x="114" y="58" width="8" height="8" fill="#141414"/>
  <rect x="45" y="96" width="110" height="66" fill="#495057"/>
  <!-- Big Steel Saw Blade in hand -->
  <polygon points="140,65 175,65 170,145 145,145" fill="#c4ccd4" stroke="#212529" stroke-width="2"/>
`);

// Nari (Carrier: Large Sacks)
const nariCarrierSvg = createSuspectSvg('Nari', 'Carrier', '#d4a373', `
  <rect x="62" y="22" width="76" height="30" fill="#3b1d0a"/>
  <rect x="72" y="48" width="56" height="40" fill="#fcd0a1"/>
  <rect x="78" y="58" width="8" height="8" fill="#17120a"/>
  <rect x="114" y="58" width="8" height="8" fill="#17120a"/>
  <rect x="45" y="94" width="110" height="68" fill="#8b5e34"/>
  <!-- Canvas Sacks on shoulder -->
  <ellipse cx="40" cy="115" rx="20" ry="26" fill="#d4a373" stroke="#6f4e37" stroke-width="2"/>
`);

// Case 6 Clues
const c6PowderSvg = createClueSvg('YELLOW SULFUR DUST', 'EVIDENCE: EXPLOSIVE ALCHEMICAL RESIDUE', '#ffea00', `
  <!-- Obsidian Floor -->
  <rect x="20" y="38" width="200" height="106" fill="#1a1424"/>
  <!-- Bright Luminous Yellow Sulfur Dust Piles -->
  <ellipse cx="65" cy="100" rx="28" ry="14" fill="#ffea00"/>
  <ellipse cx="120" cy="80" rx="35" ry="18" fill="#ffea00"/>
  <ellipse cx="175" cy="110" rx="25" ry="12" fill="#ffea00"/>
  <!-- Yellow Sparkles -->
  <circle cx="95" cy="70" r="5" fill="#ffffff"/>
  <circle cx="145" cy="60" r="4" fill="#ffffff"/>
  <circle cx="150" cy="95" r="4" fill="#ffffff"/>
`);

const c6BombSvg = createClueSvg('YELLOW SULFUR BOMB', 'EVIDENCE: CHARGED DEMOLITION SPHERE', '#ffea00', `
  <!-- Demolition Sphere (Bright Yellow) -->
  <circle cx="120" cy="95" r="44" fill="#ffea00" stroke="#bfa600" stroke-width="4"/>
  <circle cx="120" cy="95" r="28" fill="#ffd000"/>
  <!-- Fuse & Cap -->
  <rect x="112" y="38" width="16" height="16" fill="#3a3a45"/>
  <path d="M120,38 Q140,15 160,25" stroke="#ff5400" stroke-width="4" fill="none"/>
  <polygon points="160,25 170,18 165,30" fill="#ffd000"/>
  <!-- Stamped Alchemical S -->
  <text x="120" y="106" text-anchor="middle" fill="#3b2b00" font-family="'Courier New', monospace" font-size="32" font-weight="900">S</text>
`);

const c6BlueprintSvg = createClueSvg('BOMB BLUEPRINT', 'EVIDENCE: DESIGN SIGNED BY SOLAS', '#4cc9f0', `
  <!-- Blue Architectural Grid -->
  <rect x="35" y="38" width="170" height="106" fill="#0077b6" stroke="#caf0f8" stroke-width="3"/>
  <line x1="35" y1="70" x2="205" y2="70" stroke="#0096c7" stroke-width="1"/>
  <line x1="35" y1="105" x2="205" y2="105" stroke="#0096c7" stroke-width="1"/>
  <!-- Bomb Schematic Drawing -->
  <circle cx="85" cy="85" r="24" fill="none" stroke="#ffffff" stroke-width="3"/>
  <line x1="85" y1="61" x2="85" y2="48" stroke="#ffffff" stroke-width="3"/>
  <text x="145" y="75" fill="#ffffff" font-family="'Courier New', monospace" font-size="9" font-weight="bold">CHEM-BOMB</text>
  <text x="145" y="115" fill="#ffd700" font-family="'Courier New', monospace" font-size="12" font-weight="900">SOLAS</text>
`);

/* =========================================================================
   CASE 7: THE SKY SPIRE (Sky Realm)
   Culprit: Nyx (Assassin with purple glider wings)
   ========================================================================= */

// Nyx (Assassin: Purple Glider Wings)
const nyxAssassinSvg = createSuspectSvg('Nyx', 'Assassin', '#7209b7', `
  <!-- Stealth Mask & Hood -->
  <rect x="66" y="24" width="68" height="60" fill="#1b1026"/>
  <!-- Glowing Violet Eyes -->
  <rect x="76" y="54" width="10" height="6" fill="#b5179e"/>
  <rect x="114" y="54" width="10" height="6" fill="#b5179e"/>
  <!-- Stealth Bodysuit -->
  <rect x="45" y="96" width="110" height="66" fill="#240046"/>
  <!-- Large Bright Purple Glider Wings -->
  <polygon points="35,50 5,105 45,95" fill="#7209b7" stroke="#f72585" stroke-width="2"/>
  <polygon points="165,50 195,105 155,95" fill="#7209b7" stroke="#f72585" stroke-width="2"/>
`);

// Brak (Sky Sentry: Round Helmet)
const brakSentrySvg = createSuspectSvg('Brak', 'Sky Sentry', '#4895ef', `
  <!-- Round Dome Helmet -->
  <ellipse cx="100" cy="40" rx="38" ry="24" fill="#4895ef" stroke="#1b4965" stroke-width="3"/>
  <rect x="70" y="48" width="60" height="40" fill="#fcd0a1"/>
  <rect x="78" y="58" width="8" height="8" fill="#122038"/>
  <rect x="114" y="58" width="8" height="8" fill="#122038"/>
  <rect x="45" y="96" width="110" height="66" fill="#3f37c9"/>
`);

// Lyra (Mystic: Sky Crystal Pendant)
const lyraMysticSvg = createSuspectSvg('Lyra', 'Sky Mystic', '#4cc9f0', `
  <rect x="62" y="20" width="76" height="34" fill="#b5e2fa"/>
  <rect x="72" y="48" width="56" height="40" fill="#fcd0a1"/>
  <rect x="78" y="58" width="8" height="8" fill="#1e1035"/>
  <rect x="114" y="58" width="8" height="8" fill="#1e1035"/>
  <rect x="45" y="94" width="110" height="68" fill="#7209b7"/>
  <!-- Cyan Glowing Sky Crystal Pendant -->
  <polygon points="100,105 90,125 110,125" fill="#4cc9f0" stroke="#ffffff" stroke-width="2"/>
`);

// Case 7 Clues
const c7WingSvg = createClueSvg('PURPLE GLIDER FEATHER', 'EVIDENCE: AERIAL GLIDER COMPONENT', '#7209b7', `
  <!-- Balcony Parapet Railing -->
  <line x1="20" y1="130" x2="220" y2="130" stroke="#3a3a4d" stroke-width="6"/>
  <!-- Vibrant Large Purple Feather -->
  <path d="M50,125 Q110,35 180,50 Q145,115 50,125" fill="#7209b7" stroke="#f72585" stroke-width="3"/>
  <line x1="50" y1="125" x2="175" y2="52" stroke="#e0aaff" stroke-width="4"/>
`);

const c7WaterSvg = createClueSvg('SHATTERED WATER VIAL', 'EVIDENCE: LANDING CUSHION SPLASH POTION', '#4cc9f0', `
  <!-- Balcony Floor -->
  <rect x="30" y="40" width="180" height="100" fill="#1a1c2b"/>
  <!-- Shattered Cyan Glass Fragments -->
  <polygon points="60,65 95,45 85,90" fill="#4cc9f0"/>
  <polygon points="110,60 155,50 145,95 105,90" fill="#4cc9f0"/>
  <polygon points="85,105 125,100 115,135" fill="#4cc9f0"/>
  <polygon points="145,105 180,95 170,130" fill="#4cc9f0"/>
  <!-- Splash Ring -->
  <ellipse cx="120" cy="95" rx="65" ry="30" fill="none" stroke="#4895ef" stroke-width="3"/>
`);

const c7FeatherSvg = createClueSvg('LANDING TARGET BEACON', 'EVIDENCE: BALCONY DROP MARKER SIGNED NYX', '#f72585', `
  <!-- Balcony Stone Floor -->
  <rect x="40" y="38" width="160" height="106" fill="#241b36" stroke="#4a3b63" stroke-width="3"/>
  <!-- Target Crosshair Marker (Bright Purple/Pink) -->
  <circle cx="120" cy="85" r="32" fill="none" stroke="#f72585" stroke-width="4"/>
  <circle cx="120" cy="85" r="16" fill="none" stroke="#f72585" stroke-width="3"/>
  <line x1="120" y1="45" x2="120" y2="125" stroke="#f72585" stroke-width="3"/>
  <line x1="80" y1="85" x2="160" y2="85" stroke="#f72585" stroke-width="3"/>
  <!-- Stenciled Name -->
  <text x="120" y="132" text-anchor="middle" fill="#ffffff" font-family="'Courier New', monospace" font-size="12" font-weight="900">AGENT: NYX</text>
`);

/* =========================================================================
   CASE 8: THE SKY SHIP (Airship Dock)
   Culprit: Brak (Mechanic with red rocket fuses)
   ========================================================================= */

// Brak (Mechanic: Red Rocket Fuses in Belt)
const brakMechanicSvg = createSuspectSvg('Brak', 'Mechanic', '#d90429', `
  <rect x="66" y="24" width="68" height="26" fill="#2b1a0e"/>
  <rect x="72" y="48" width="56" height="42" fill="#fcd0a1"/>
  <rect x="78" y="58" width="8" height="8" fill="#141414"/>
  <rect x="114" y="58" width="8" height="8" fill="#141414"/>
  <!-- Leather Overalls -->
  <rect x="45" y="96" width="110" height="66" fill="#5c4d3c"/>
  <!-- Toolbelt with Bright Red Explosive Fuses -->
  <rect x="45" y="118" width="110" height="14" fill="#241e17"/>
  <rect x="65" y="110" width="10" height="26" fill="#d90429" stroke="#5e000f" stroke-width="2"/>
  <rect x="85" y="110" width="10" height="26" fill="#d90429" stroke="#5e000f" stroke-width="2"/>
  <rect x="105" y="110" width="10" height="26" fill="#d90429" stroke="#5e000f" stroke-width="2"/>
  <rect x="125" y="110" width="10" height="26" fill="#d90429" stroke="#5e000f" stroke-width="2"/>
`);

// Vesper (Priest: Black Robe)
const vesperPriestSvg = createSuspectSvg('Vesper', 'Priest', '#9d4edd', `
  <polygon points="100,16 55,54 145,54" fill="#100b1a"/>
  <rect x="72" y="48" width="56" height="40" fill="#fcd0a1"/>
  <rect x="78" y="58" width="8" height="8" fill="#3c096c"/>
  <rect x="114" y="58" width="8" height="8" fill="#3c096c"/>
  <rect x="45" y="96" width="110" height="66" fill="#100b1a"/>
  <rect x="94" y="96" width="12" height="66" fill="#9d4edd"/>
`);

// Tuck (Runner: Fruit Crate)
const tuckRunnerSvg = createSuspectSvg('Tuck', 'Deckhand', '#ffb703', `
  <rect x="66" y="24" width="68" height="24" fill="#402312"/>
  <rect x="72" y="48" width="56" height="40" fill="#fcd0a1"/>
  <rect x="78" y="58" width="8" height="8" fill="#141414"/>
  <rect x="114" y="58" width="8" height="8" fill="#141414"/>
  <rect x="45" y="94" width="110" height="68" fill="#2a9d8f"/>
  <!-- Wooden Fruit Crate in hand -->
  <rect x="130" y="105" width="40" height="35" fill="#b07d48" stroke="#543719" stroke-width="2"/>
`);

// Case 8 Clues
const c8FireworkSvg = createClueSvg('RED BOOSTER ROCKET', 'EVIDENCE: JAMMED INTO AIR INTAKE', '#d90429', `
  <!-- Airship Intake Grill -->
  <rect x="30" y="45" width="180" height="90" fill="#3a404a" stroke="#1a1c21" stroke-width="3"/>
  <line x1="30" y1="75" x2="210" y2="75" stroke="#1a1c21" stroke-width="3"/>
  <line x1="30" y1="105" x2="210" y2="105" stroke="#1a1c21" stroke-width="3"/>
  <!-- Red Rocket Explosive Jammed Inside -->
  <rect x="65" y="65" width="90" height="42" fill="#d90429" stroke="#54000c" stroke-width="3"/>
  <polygon points="155,60 185,86 155,112" fill="#ffd000"/>
  <line x1="65" y1="86" x2="40" y2="86" stroke="#ffffff" stroke-width="4"/>
`);

const c8WrapperSvg = createClueSvg('RED FIREWORK CASING', 'EVIDENCE: TORN CASINGS AND FUSE MATCHING BELT', '#d90429', `
  <polygon points="40,55 110,38 165,85 105,135 35,105" fill="#d90429" stroke="#7a0010" stroke-width="3"/>
  <polygon points="65,60 105,48 145,85 105,115" fill="#ff4d6d"/>
  <!-- Copper Fuse Wire -->
  <path d="M105,135 Q135,150 160,130 T200,140" stroke="#ffd000" stroke-width="4" fill="none"/>
  <text x="90" y="90" fill="#ffffff" font-family="'Courier New', monospace" font-size="10" font-weight="900">ROCKET FUSE</text>
`);

const c8CrateSvg = createClueSvg('ENGINEER TOOL CRATE', 'EVIDENCE: STENCILED TO BRAK', '#ffb703', `
  <!-- Heavy Wooden Maintenance Crate -->
  <rect x="40" y="38" width="160" height="106" fill="#8c5828" stroke="#4a2a0c" stroke-width="4"/>
  <!-- Cross Bracing -->
  <line x1="40" y1="38" x2="200" y2="144" stroke="#4a2a0c" stroke-width="4"/>
  <line x1="40" y1="144" x2="200" y2="38" stroke="#4a2a0c" stroke-width="4"/>
  <!-- Yellow Stenciled Plate -->
  <rect x="55" y="70" width="130" height="42" fill="#12121a" stroke="#ffd000" stroke-width="2"/>
  <text x="120" y="96" text-anchor="middle" fill="#ffd000" font-family="'Courier New', monospace" font-size="15" font-weight="900">ENG: BRAK</text>
`);

/* =========================================================================
   CASE 9: THE CRYSTAL ROOM (Sacred Temple)
   Culprit: Vesper (Cultist with purple laser tuning rod)
   ========================================================================= */

// Vesper (Cultist: Purple Laser Tuning Rod)
const vesperCultistSvg = createSuspectSvg('Vesper', 'Cultist', '#9d4edd', `
  <rect x="66" y="22" width="68" height="26" fill="#100b1a"/>
  <rect x="72" y="46" width="56" height="42" fill="#fcd0a1"/>
  <rect x="78" y="56" width="8" height="8" fill="#5a189a"/>
  <rect x="114" y="56" width="8" height="8" fill="#5a189a"/>
  <rect x="45" y="94" width="110" height="68" fill="#240046"/>
  <!-- Long Glowing Purple Laser Tuning Rod in Hand -->
  <line x1="150" y1="35" x2="150" y2="155" stroke="#7b2cbf" stroke-width="8"/>
  <polygon points="150,20 140,40 160,40" fill="#e0aaff"/>
  <circle cx="150" cy="30" r="14" fill="#c77dff" stroke="#ffffff" stroke-width="2"/>
`);

// Omen (Sage: Blue Spell Book)
const omenSageSvg = createSuspectSvg('Omen', 'Sage', '#00b4d8', `
  <rect x="62" y="20" width="76" height="30" fill="#e0e1dd"/>
  <rect x="72" y="48" width="56" height="40" fill="#fcd0a1"/>
  <rect x="78" y="58" width="8" height="8" fill="#03045e"/>
  <rect x="114" y="58" width="8" height="8" fill="#03045e"/>
  <rect x="45" y="94" width="110" height="68" fill="#0077b6"/>
  <!-- Blue Spellbook in hand -->
  <rect x="25" y="110" width="35" height="45" fill="#03045e" stroke="#00b4d8" stroke-width="3"/>
`);

// Mira (Courier: Green Bag)
const miraCourierSvg = createSuspectSvg('Mira', 'Courier', '#52b788', `
  <rect x="62" y="22" width="76" height="28" fill="#382110"/>
  <rect x="72" y="48" width="56" height="40" fill="#fcd0a1"/>
  <rect x="78" y="58" width="8" height="8" fill="#0d2412"/>
  <rect x="114" y="58" width="8" height="8" fill="#0d2412"/>
  <rect x="45" y="94" width="110" height="68" fill="#2d6a4f"/>
  <rect x="135" y="110" width="35" height="35" fill="#52b788" stroke="#1b4332" stroke-width="2"/>
`);

// Case 9 Clues
const c9RodSvg = createClueSvg('PURPLE TUNING ROD', 'EVIDENCE: RESONANT OPTICAL ALIGNER', '#9d4edd', `
  <!-- Stand Mount -->
  <rect x="40" y="125" width="160" height="20" fill="#240046" stroke="#5a189a" stroke-width="2"/>
  <!-- Metallic Violet Tuning Rod -->
  <line x1="45" y1="120" x2="185" y2="40" stroke="#7b2cbf" stroke-width="12"/>
  <line x1="45" y1="120" x2="185" y2="40" stroke="#e0aaff" stroke-width="4"/>
  <!-- Hexagonal Rod Tip with Energy Corona -->
  <polygon points="185,40 175,20 195,15 210,35 195,55 175,50" fill="#c77dff" stroke="#ffffff" stroke-width="3"/>
  <circle cx="190" cy="35" r="6" fill="#ffffff"/>
`);

const c9LensSvg = createClueSvg('FOCUSED LASER BEAM', 'EVIDENCE: CRYSTAL PRISM DEFLECTION', '#c77dff', `
  <!-- Crystal Prism on Left -->
  <polygon points="35,45 65,45 50,115" fill="#e0aaff" stroke="#5a189a" stroke-width="3"/>
  <!-- Temple Altar on Right -->
  <rect x="165" y="65" width="45" height="65" fill="#240046" stroke="#7b2cbf" stroke-width="3"/>
  <!-- Concentrated Violet Laser Ray -->
  <line x1="50" y1="80" x2="165" y2="95" stroke="#c77dff" stroke-width="10"/>
  <line x1="50" y1="80" x2="165" y2="95" stroke="#ffffff" stroke-width="3"/>
  <!-- Impact Burn on Altar -->
  <circle cx="165" cy="95" r="14" fill="#ffd000"/>
`);

const c9ChiselSvg = createClueSvg('HEXAGON ROD SCRATCHES', 'EVIDENCE: LOCK MARKS MATCHING ROD TIP', '#9d4edd', `
  <!-- Stone Pedestal -->
  <rect x="45" y="38" width="150" height="106" fill="#3a3745" stroke="#1d1b24" stroke-width="4"/>
  <!-- Hexagonal Indentation and Deep Scratches -->
  <polygon points="120,65 140,75 140,95 120,105 100,95 100,75" fill="none" stroke="#e0aaff" stroke-width="6"/>
  <line x1="75" y1="55" x2="105" y2="80" stroke="#e0aaff" stroke-width="4"/>
  <line x1="165" y1="115" x2="135" y2="95" stroke="#e0aaff" stroke-width="4"/>
  <text x="120" y="132" text-anchor="middle" fill="#c77dff" font-family="'Courier New', monospace" font-size="9" font-weight="bold">HEXAGON MATCH</text>
`);

/* =========================================================================
   CASE 10: THE AARNA AWAKENING (Deep Cavern Finale)
   Culprit: Vesper (Mastermind with wool-padded boots & tuning fork)
   ========================================================================= */

// Vesper (Mastermind: Navy Robe, White Wool Boots, Tuning Fork)
const vesperMastermindSvg = createSuspectSvg('Vesper', 'Mastermind', '#00ffff', `
  <polygon points="100,14 45,52 155,52" fill="#040b14"/>
  <rect x="68" y="44" width="64" height="42" fill="#0a192f"/>
  <!-- Glowing Cyan Eyes -->
  <rect x="76" y="56" width="10" height="6" fill="#00ffff"/>
  <rect x="114" y="56" width="10" height="6" fill="#00ffff"/>
  <!-- Shadow Navy Robe -->
  <rect x="45" y="94" width="110" height="68" fill="#0a192f"/>
  <!-- White Padded Wool Boots (Silent Movement) -->
  <rect x="55" y="135" width="28" height="26" fill="#ffffff" stroke="#90e0ef" stroke-width="3"/>
  <rect x="117" y="135" width="28" height="26" fill="#ffffff" stroke="#90e0ef" stroke-width="3"/>
  <!-- Steel Acoustic Tuning Fork in Hand -->
  <path d="M155,80 L155,120 M148,80 L148,100 L162,100 L162,80" stroke="#00ffff" stroke-width="4" fill="none"/>
`);

// Durand (Blacksmith: Heavy Iron Boots)
const durandSmithSvg = createSuspectSvg('Durand', 'Blacksmith', '#6c757d', `
  <rect x="66" y="24" width="68" height="26" fill="#241e17"/>
  <rect x="72" y="48" width="56" height="42" fill="#fcd0a1"/>
  <rect x="78" y="58" width="8" height="8" fill="#141414"/>
  <rect x="114" y="58" width="8" height="8" fill="#141414"/>
  <rect x="45" y="96" width="110" height="66" fill="#495057"/>
  <!-- Heavy Iron Boots -->
  <rect x="55" y="135" width="28" height="26" fill="#212529" stroke="#6c757d" stroke-width="3"/>
  <rect x="117" y="135" width="28" height="26" fill="#212529" stroke="#6c757d" stroke-width="3"/>
`);

// Solas (Pyro: Lit Torches)
const solasPyroSvg = createSuspectSvg('Solas', 'Fire Scout', '#ff5400', `
  <rect x="66" y="24" width="68" height="26" fill="#ff5400"/>
  <rect x="72" y="48" width="56" height="42" fill="#fcd0a1"/>
  <rect x="78" y="58" width="8" height="8" fill="#240c03"/>
  <rect x="114" y="58" width="8" height="8" fill="#240c03"/>
  <rect x="45" y="96" width="110" height="66" fill="#9d0208"/>
  <!-- Flaming Torch in hand -->
  <rect x="150" y="70" width="8" height="70" fill="#6a040f"/>
  <polygon points="154,50 142,70 166,70" fill="#ffd000"/>
`);

// Nyx (Shadow: Stealth Dagger)
const nyxShadowSvg = createSuspectSvg('Nyx', 'Shadow Guard', '#7209b7', `
  <rect x="66" y="24" width="68" height="60" fill="#10002b"/>
  <rect x="76" y="54" width="10" height="6" fill="#00ffff"/>
  <rect x="114" y="54" width="10" height="6" fill="#00ffff"/>
  <rect x="45" y="96" width="110" height="66" fill="#240046"/>
  <!-- Curved Dagger in hand -->
  <path d="M150,130 Q165,100 155,80" stroke="#00ffff" stroke-width="5" fill="none"/>
`);

// Case 10 Clues
const c10WoolSvg = createClueSvg('WHITE WOOL BOOT FIBERS', 'EVIDENCE: SILENT STEP PADDING BY SENSOR', '#ffffff', `
  <!-- Acoustic Sensor Pedestal -->
  <rect x="50" y="60" width="140" height="70" fill="#0a192f" stroke="#00ffff" stroke-width="3"/>
  <circle cx="120" cy="75" r="16" fill="#00ffff"/>
  <!-- Bright White Wool Boot Padding Fibers -->
  <path d="M60,115 Q80,95 100,125" stroke="#ffffff" stroke-width="6" fill="none"/>
  <path d="M110,110 Q130,90 150,120" stroke="#ffffff" stroke-width="6" fill="none"/>
  <path d="M85,130 Q105,110 125,140" stroke="#ffffff" stroke-width="6" fill="none"/>
  <text x="120" y="145" text-anchor="middle" fill="#90e0ef" font-family="'Courier New', monospace" font-size="8" font-weight="bold">MUFFLED WOOL STEP</text>
`);

const c10ForkSvg = createClueSvg('ACOUSTIC TUNING FORK', 'EVIDENCE: VIBRATING RESONATOR ON SENSOR', '#00ffff', `
  <!-- Pedestal -->
  <rect x="40" y="125" width="160" height="20" fill="#0a192f" stroke="#0077b6" stroke-width="2"/>
  <!-- Steel Tuning Fork -->
  <rect x="114" y="75" width="12" height="55" fill="#90e0ef" stroke="#03045e" stroke-width="2"/>
  <path d="M90,35 L90,85 L150,85 L150,35" stroke="#90e0ef" stroke-width="12" fill="none"/>
  <path d="M90,35 L90,85 L150,85 L150,35" stroke="#00ffff" stroke-width="4" fill="none"/>
  <!-- Sonic Wave Rings radiating -->
  <circle cx="120" cy="55" r="40" fill="none" stroke="#00ffff" stroke-width="3" stroke-dasharray="6 6"/>
  <circle cx="120" cy="55" r="25" fill="none" stroke="#00ffff" stroke-width="2"/>
`);

const c10LedgerSvg = createClueSvg('AARNA SINGULARITY PLAN', 'EVIDENCE: MASTER RECORD SIGNED BY VESPER', '#ffd700', `
  <!-- Dark Master Ledger -->
  <rect x="35" y="38" width="170" height="106" fill="#0b132b" stroke="#00ffff" stroke-width="3"/>
  <text x="120" y="60" text-anchor="middle" fill="#00ffff" font-family="'Courier New', monospace" font-size="11" font-weight="900">AARNA SINGULARITY</text>
  <line x1="45" y1="68" x2="195" y2="68" stroke="#0077b6" stroke-width="2"/>
  <text x="50" y="85" fill="#ffffff" font-family="'Courier New', monospace" font-size="9" font-weight="bold">• SHARDS 1-9 ASSEMBLED</text>
  <text x="50" y="100" fill="#ffffff" font-family="'Courier New', monospace" font-size="9" font-weight="bold">• STUN LEO WITH ACOUSTIC FORK</text>
  <!-- Vesper Signature -->
  <text x="120" y="128" text-anchor="middle" fill="#ffd700" font-family="'Courier New', monospace" font-size="13" font-weight="900">MASTER: VESPER</text>
`);

/* =========================================================================
   SAVE ALL 61 ASSETS
   ========================================================================= */

// Case 1
saveSvg(path.join(suspectsDir, 'garth.svg'), garthSvg);
saveSvg(path.join(suspectsDir, 'lin.svg'), linSvg);
saveSvg(path.join(suspectsDir, 'sam.svg'), samSvg);
saveSvg(path.join(cluesDir, 'c1-footprints.svg'), c1FootprintsSvg);
saveSvg(path.join(cluesDir, 'c1-axe.svg'), c1AxeSvg);
saveSvg(path.join(cluesDir, 'c1-note.svg'), c1NoteSvg);

// Case 2
saveSvg(path.join(suspectsDir, 'clara_weaver.svg'), claraWeaverSvg);
saveSvg(path.join(suspectsDir, 'tuck_baker.svg'), tuckBakerSvg);
saveSvg(path.join(suspectsDir, 'lin_potions.svg'), linPotionsSvg);
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

console.log('✅ Generated 61 High-Clarity Pixel Art Assets for Cases 1-10!');
