/**
 * CASE: AARNA - Master Case Database
 * 10 Mystery Cases for the Aarna Investigation Bureau.
 * Features ultra-clear 3-clue visual deduction, strict evidence structures, and balanced option lengths.
 */

const CASES = [
    {
        id: 1,
        title: "THE MISSING COIN",
        dimension: "village",
        victim: "Bob",
        location: "Town Hall",
        time: "06:00 AM",
        status: "MURDER",
        difficulty: 1,
        synopsis: "Bob was struck in his office. The first Aarna Shard is missing.",
        suspects: [
            { id: "garth", name: "Garth", role: "Woodcutter", relation: "Neighbor", personality: "Wears a red flannel shirt and carries a heavy wooden axe.", alibi: "I was chopping pine trees.", motive: "Needs gold for new tools.", image: "images/suspects/garth.svg", avatarEmoji: "🪓" },
            { id: "lin", name: "Lin", role: "Farmer", relation: "Friend", personality: "Wears denim overalls and carries a metal shovel.", alibi: "I was planting wheat seeds.", motive: "Angry about the land taxes.", image: "images/suspects/lin.svg", avatarEmoji: "🌾" },
            { id: "sam", name: "Sam", role: "Guard", relation: "Security", personality: "Wears iron chainmail and carries a coiled rope.", alibi: "I was sleeping at home.", motive: "No known motive at all.", image: "images/suspects/sam.svg", avatarEmoji: "🛡️" }
        ],
        evidence: {
            clue1: { 
                title: "MUDDY FOOTPRINTS", 
                icon: "👣", 
                summary: "Deep boot prints covered in green pine needles.", 
                details: "Fresh mud prints with pine needles tracked directly from the pine forest.", 
                image: "images/clues/c1-footprints.svg",
                crossRefHint: "HINT: Which suspect chops pine trees in the forest?" 
            },
            clue2: { 
                title: "CHIPPED WOODEN AXE", 
                icon: "🪓", 
                summary: "A heavy wooden axe with fresh wood splinters.", 
                details: "A wooden axe used to break through the office door.", 
                weaponName: "Wooden Axe", 
                image: "images/clues/c1-axe.svg",
                crossRefHint: "HINT: Which suspect carries a heavy wooden axe?" 
            },
            clue3: { 
                title: "DROPPED NOTE", 
                icon: "📜", 
                summary: "A dropped note showing an axe and gold coin.", 
                details: "A parchment scrap reading: 'USE AXE FOR COIN - G'.",
                messages: [{ sender: "Garth", time: "05:00", text: "I will use my axe to take that gold coin." }], 
                image: "images/clues/c1-note.svg",
                crossRefHint: "HINT: Read the sender's initial on the note." 
            }
        },
        options: {
            who: ["Garth", "Lin", "Sam"],
            how: ["Broke the door using an axe", "Dug a tunnel with a shovel", "Climbed the roof with a rope"],
            why: ["To steal the ancient gold coin", "To protest the high land taxes", "To take back a stolen shield"]
        },
        correctAnswer: {
            who: "Garth",
            how: "Broke the door using an axe",
            why: "To steal the ancient gold coin"
        },
        explanation: {
            summary: "Garth used his wooden axe to smash the door and steal the first shard to buy new woodcutting tools.",
            clueChain: ["Pine needles matched his woodcutting alibi.", "Chipped wooden axe left at the scene.", "Dropped note outlined his plan."]
        },
        failureHint: "HINT: Look at who carries a wooden axe and works with pine trees."
    },

    {
        id: 2,
        title: "THE POISONED MILL",
        dimension: "farmlands",
        victim: "Milo",
        location: "Hilltop Windmill",
        time: "08:00 AM",
        status: "MURDER",
        difficulty: 1,
        synopsis: "Milo was poisoned in the flour mill. The second Aarna Shard is missing.",
        suspects: [
            { id: "clara", name: "Clara", role: "Weaver", relation: "Partner", personality: "Wears a bright magenta wool scarf.", alibi: "I was knitting wool scarves.", motive: "Upset about high wool taxes.", image: "images/suspects/clara_weaver.svg", avatarEmoji: "🧣" },
            { id: "tuck", name: "Tuck", role: "Baker", relation: "Friend", personality: "Wears a white chef apron and hat.", alibi: "I was baking fresh bread.", motive: "Argued over flour delivery costs.", image: "images/suspects/tuck_baker.svg", avatarEmoji: "🥖" },
            { id: "lin", name: "Lin", role: "Botanist", relation: "Neighbor", personality: "Wears green robes and carries green poison vials.", alibi: "I was mixing green herbal potions.", motive: "Wants the second shard power.", image: "images/suspects/lin_potions.svg", avatarEmoji: "🧪" }
        ],
        evidence: {
            clue1: {
                title: "GREEN LIQUID SPLASH",
                icon: "💧",
                summary: "Bright green poison spilled across the floor.",
                details: "A puddle of green liquid spilled beneath the window sill.",
                image: "images/clues/c2-stain.svg",
                crossRefHint: "HINT: Which suspect mixes bright green herbal liquids?"
            },
            clue2: {
                title: "GREEN POISON VIAL",
                icon: "🧪",
                summary: "A shattered glass vial of acid-green poison.",
                details: "A glass vial with a toxic skull symbol containing green pesticide.",
                weaponName: "Green Poison Vial",
                image: "images/clues/c2-bottle.svg",
                crossRefHint: "HINT: Who carries glowing green poison vials?"
            },
            clue3: {
                title: "POISON RECIPE SCROLL",
                icon: "📜",
                summary: "A formula scroll signed by Lin.",
                details: "A recipe scroll reading: 'POISON RECIPE - AUTHOR: LIN'.",
                messages: [{ sender: "Lin", time: "07:30", text: "I will pour the green poison and take the second shard." }],
                image: "images/clues/c2-scroll.svg",
                crossRefHint: "HINT: Read the author's name on the recipe scroll."
            }
        },
        options: {
            who: ["Clara", "Tuck", "Lin"],
            how: ["Poured green poison through the window", "Struck the victim with a pin", "Choked the victim with a scarf"],
            why: ["To steal the second glowing shard", "To protest the high flour prices", "To avenge a ruined wool order"]
        },
        correctAnswer: {
            who: "Lin",
            how: "Poured green poison through the window",
            why: "To steal the second glowing shard"
        },
        explanation: {
            summary: "Lin poured toxic green poison through the windmill window to knock out Milo and steal the second Aarna Shard.",
            clueChain: ["Bright green poison puddle on the floor.", "Shattered green poison vial on the sill.", "Poison recipe scroll signed by Lin."]
        },
        failureHint: "HINT: Look at who wears green robes and carries green poison vials."
    },

    {
        id: 3,
        title: "THE LIGHTNING TOWER",
        dimension: "fortress",
        victim: "Lord",
        location: "Stone Watchtower",
        time: "10:00 PM",
        status: "MURDER",
        difficulty: 1,
        synopsis: "The Lord was electrocuted in the watchtower. The third Aarna Shard is missing.",
        suspects: [
            { id: "vance", name: "Vance", role: "Engineer", relation: "Technician", personality: "Wears orange goggles and carries orange copper wire.", alibi: "I was winding orange copper wire.", motive: "Needs power for his generator.", image: "images/suspects/vance_engineer.svg", avatarEmoji: "⚡" },
            { id: "bruno", name: "Bruno", role: "Mason", relation: "Builder", personality: "Carries a steel stone chisel in belt.", alibi: "I was carving granite wall blocks.", motive: "Upset about unpaid building fees.", image: "images/suspects/bruno_mason.svg", avatarEmoji: "⛏️" },
            { id: "selena", name: "Selena", role: "Trader", relation: "Merchant", personality: "Carries a large blue merchant backpack.", alibi: "I was counting blue trade tokens.", motive: "Wants money for travel expenses.", image: "images/suspects/selena_trader.svg", avatarEmoji: "🎒" }
        ],
        evidence: {
            clue1: {
                title: "ELECTRICAL SCORCH MARK",
                icon: "🔥",
                summary: "High voltage electrical scorch mark on floor.",
                details: "Radial burn patterns from extreme electrical voltage.",
                image: "images/clues/c3-burn.svg",
                crossRefHint: "HINT: Who understands electrical circuitry and power?"
            },
            clue2: {
                title: "ORANGE COPPER WIRE",
                icon: "⚡",
                summary: "Coiled orange copper wire hooked to roof rod.",
                details: "Thick orange conductive copper wire tied to the lightning rod.",
                weaponName: "Orange Copper Wire",
                image: "images/clues/c3-wire.svg",
                crossRefHint: "HINT: Which suspect carries bright orange copper wire?"
            },
            clue3: {
                title: "WIRE SPOOL TAG",
                icon: "🏷️",
                summary: "A wire spool tag labeled Vance.",
                details: "An inventory tag reading: 'COPPER CABLE - VANCE (ENG)'.",
                messages: [{ sender: "Vance", time: "09:15", text: "I can channel lightning through copper wire to take the shard." }],
                image: "images/clues/c3-tag.svg",
                crossRefHint: "HINT: Read the owner on the spool tag."
            }
        },
        options: {
            who: ["Vance", "Bruno", "Selena"],
            how: ["Channeled lightning through a copper wire", "Smashed the iron plate with chisel", "Shorted the lightning rod with water"],
            why: ["To steal the third ancient shard", "To retaliate over unpaid stone fees", "To collect on an overdue debt"]
        },
        correctAnswer: {
            who: "Vance",
            how: "Channeled lightning through a copper wire",
            why: "To steal the third ancient shard"
        },
        explanation: {
            summary: "Vance hooked his orange copper wire to the lightning rod to electrocute the Lord and steal the third shard.",
            clueChain: ["Electrical scorch marks on the iron plate.", "Orange copper wire attached to the roof.", "Wire spool tag labeled with Vance's name."]
        },
        failureHint: "HINT: Look at who wears orange goggles and works with copper wire."
    },

    {
        id: 4,
        title: "THE LAVA GATE",
        dimension: "caverns",
        victim: "Sentry",
        location: "Lava Chamber",
        time: "02:00 PM",
        status: "MURDER",
        difficulty: 2,
        synopsis: "The Sentry was crushed under the portcullis. The fourth Aarna Shard is missing.",
        suspects: [
            { id: "zul", name: "Zul", role: "Treasurer", relation: "Coworker", personality: "Wears crimson robes and a gold signet ring.", alibi: "I was counting gold vault coins.", motive: "Wants the fourth shard power.", image: "images/suspects/zul_treasurer.svg", avatarEmoji: "💍" },
            { id: "pyra", name: "Pyra", role: "Handler", relation: "Transporter", personality: "Carries a flaming red lava staff.", alibi: "I was feeding the lava pits.", motive: "Needs gold for lava supplies.", image: "images/suspects/pyra_handler.svg", avatarEmoji: "🔥" },
            { id: "vorg", name: "Vorg", role: "Guard", relation: "Security", personality: "Wears dark steel armor with iron shield.", alibi: "I was guarding the tunnel entrance.", motive: "Upset about long watch shifts.", image: "images/suspects/vorg_sentry.svg", avatarEmoji: "🛡️" }
        ],
        evidence: {
            clue1: {
                title: "GATE CONTROL LEVER",
                icon: "⚙️",
                summary: "Gold signet ring smudge on gate lever.",
                details: "A distinct gold imprint from a heavy ring pressed into the switch.",
                image: "images/clues/c4-lever.svg",
                crossRefHint: "HINT: Which suspect wears a heavy gold signet ring?"
            },
            clue2: {
                title: "CRUSHED PORTCULLIS",
                icon: "🚪",
                summary: "Heavy iron portcullis dropped onto stone.",
                details: "The iron gate dropped suddenly, smashing the stone walkway.",
                weaponName: "Heavy Portcullis Gate",
                image: "images/clues/c4-gate.svg",
                crossRefHint: "HINT: The portcullis was triggered using the control lever."
            },
            clue3: {
                title: "GATE DROP ORDER",
                icon: "📜",
                summary: "An official directive sealed by Zul.",
                details: "A written order reading: 'DROP PORTCULLIS - SEAL: ZUL'.",
                messages: [{ sender: "Zul", time: "01:20", text: "I will pull the gate lever and grab the fourth shard." }],
                image: "images/clues/c4-ledger.svg",
                crossRefHint: "HINT: Read the gold wax seal on the directive."
            }
        },
        options: {
            who: ["Zul", "Pyra", "Vorg"],
            how: ["Dropped the portcullis with a lever", "Blasted the heavy door with fire", "Crushed the entrance using iron shields"],
            why: ["To steal the fourth fiery shard", "To protect the secret lava chambers", "To protest dangerous overtime guard duties"]
        },
        correctAnswer: {
            who: "Zul",
            how: "Dropped the portcullis with a lever",
            why: "To steal the fourth fiery shard"
        },
        explanation: {
            summary: "Zul pulled the gate lever to crush the Sentry under the iron portcullis and take the fourth shard.",
            clueChain: ["Gold signet ring smudge on the lever.", "Heavy iron portcullis dropped on the path.", "Gate drop directive stamped with Zul's seal."]
        },
        failureHint: "HINT: Look at who wears a gold signet ring and sealed the gate order."
    },

    {
        id: 5,
        title: "THE ROPE BRIDGE",
        dimension: "magma",
        victim: "Scout",
        location: "Canyon Crossing",
        time: "04:00 PM",
        status: "MURDER",
        difficulty: 2,
        synopsis: "The Scout fell into the lava canyon. The fifth Aarna Shard is missing.",
        suspects: [
            { id: "malakor", name: "Malakor", role: "Nomad", relation: "Rival", personality: "Wears a dark black hooded cowl.", alibi: "I was resting in shadow tents.", motive: "Wants the fifth shard power.", image: "images/suspects/malakor_nomad.svg", avatarEmoji: "🥷" },
            { id: "darek", name: "Darek", role: "Quarryman", relation: "Miner", personality: "Carries a heavy iron pickaxe.", alibi: "I was chipping hard basalt rock.", motive: "Wants to buy new quarry tools.", image: "images/suspects/darek_quarryman.svg", avatarEmoji: "⛏️" },
            { id: "mira", name: "Mira", role: "Scout", relation: "Explorer", personality: "Wears brown leather exploration boots.", alibi: "I was scouting the canyon rim.", motive: "Wants fame from new maps.", image: "images/suspects/mira_scout.svg", avatarEmoji: "👢" }
        ],
        evidence: {
            clue1: {
                title: "BLACK COWL THREADS",
                icon: "🧵",
                summary: "Pitch-black cowl threads caught on buckle.",
                details: "Fibers from a black hooded cowl caught on the scout's saddle buckle.",
                image: "images/clues/c5-thread.svg",
                crossRefHint: "HINT: Which suspect wears a black hooded cowl?"
            },
            clue2: {
                title: "SWAPPED WATER FLASK",
                icon: "🧪",
                summary: "A swapped flask filled with plain water.",
                details: "The victim's fire potion was swapped with cold water.",
                weaponName: "Swapped Water Flask",
                image: "images/clues/c5-flask.svg",
                crossRefHint: "HINT: The fire potion was secretly replaced with plain water."
            },
            clue3: {
                title: "MARKED FLASK CORK",
                icon: "🍾",
                summary: "A wooden flask cork stamped M.",
                details: "A flask cork floating in lava stamped with the bold initial 'M'.",
                messages: [{ sender: "Malakor", time: "03:30", text: "Swapping the potion with water ensures the fifth shard is mine." }],
                image: "images/clues/c5-cork.svg",
                crossRefHint: "HINT: Look at the letter stamped on the floating cork."
            }
        },
        options: {
            who: ["Malakor", "Darek", "Mira"],
            how: ["Swapped fire potion with plain water", "Cut the ferry cables with pickaxe", "Pushed the boat off the ledge"],
            why: ["To steal the fifth burning shard", "To claim ownership over the ferry", "To conceal an illegal trading route"]
        },
        correctAnswer: {
            who: "Malakor",
            how: "Swapped fire potion with plain water",
            why: "To steal the fifth burning shard"
        },
        explanation: {
            summary: "Malakor swapped the scout's fire protection potion with cold water, causing the victim to fall in the lava and lose the fifth shard.",
            clueChain: ["Black cowl threads on the saddle buckle.", "Swapped flask filled with cold water.", "Flask cork stamped with 'M' for Malakor."]
        },
        failureHint: "HINT: Look at who wears a black hooded cowl and whose name starts with M."
    },

    {
        id: 6,
        title: "THE STONE VAULT",
        dimension: "nether",
        victim: "Jada",
        location: "Basalt Shelter",
        time: "07:00 PM",
        status: "MURDER",
        difficulty: 2,
        synopsis: "Jada was blast-injured inside the shelter. The sixth Aarna Shard is missing.",
        suspects: [
            { id: "solas", name: "Solas", role: "Alchemist", relation: "Neighbor", personality: "Wears maroon robes dusted in yellow sulfur.", alibi: "I was mixing explosive sulfur powder.", motive: "Needs the sixth shard power.", image: "images/suspects/solas_firemage.svg", avatarEmoji: "✨" },
            { id: "varren", name: "Varren", role: "Stonecutter", relation: "Builder", personality: "Carries a steel saw blade.", alibi: "I was cutting dark basalt slabs.", motive: "Needs money for building stones.", image: "images/suspects/varren_cutter.svg", avatarEmoji: "🪚" },
            { id: "nari", name: "Nari", role: "Carrier", relation: "Merchant", personality: "Carries large burlap canvas sacks.", alibi: "I was carrying heavy trade sacks.", motive: "Argued over unpaid market taxes.", image: "images/suspects/nari_carrier.svg", avatarEmoji: "👜" }
        ],
        evidence: {
            clue1: {
                title: "YELLOW SULFUR DUST",
                icon: "✨",
                summary: "Bright yellow sulfur powder on threshold.",
                details: "Yellow sulfur dust tracked from the blast point toward the delta.",
                image: "images/clues/c6-powder.svg",
                crossRefHint: "HINT: Which suspect has sleeves covered in yellow sulfur?"
            },
            clue2: {
                title: "YELLOW SULFUR BOMB",
                icon: "💣",
                summary: "A spherical explosive bomb stamped S.",
                details: "An unexploded yellow sulfur demolition sphere stamped with 'S'.",
                weaponName: "Yellow Sulfur Bomb",
                image: "images/clues/c6-bomb.svg",
                crossRefHint: "HINT: Who builds yellow sulfur explosive bombs?"
            },
            clue3: {
                title: "BOMB BLUEPRINT",
                icon: "📐",
                summary: "A bomb wiring blueprint signed Solas.",
                details: "A blue grid schematic reading: 'CHEM-BOMB - SOLAS'.",
                messages: [{ sender: "Solas", time: "06:30", text: "My explosive sulfur will blast the door so I can take the shard." }],
                image: "images/clues/c6-blueprint.svg",
                crossRefHint: "HINT: Read the author's name on the blueprint."
            }
        },
        options: {
            who: ["Solas", "Varren", "Nari"],
            how: ["Detonated yellow bomb at the door", "Cut the basalt roof with saw", "Trapped the exit using heavy sacks"],
            why: ["To steal the sixth glowing shard", "To secure rare basalt stone quarry", "To monopolize the underground shipping routes"]
        },
        correctAnswer: {
            who: "Solas",
            how: "Detonated yellow bomb at the door",
            why: "To steal the sixth glowing shard"
        },
        explanation: {
            summary: "Solas placed a yellow sulfur bomb at the shelter entrance to blast open the vault and claim the sixth shard.",
            clueChain: ["Yellow sulfur dust tracked on the floor.", "Spherical sulfur bomb stamped with 'S'.", "Bomb design blueprint signed by Solas."]
        },
        failureHint: "HINT: Look at who has yellow sulfur dust on their sleeves and designs chemical bombs."
    },

    {
        id: 7,
        title: "THE SKY SPIRE",
        dimension: "sky",
        victim: "Watcher",
        location: "High Sky Spire",
        time: "11:00 AM",
        status: "MURDER",
        difficulty: 3,
        synopsis: "The Watcher was attacked on the isolated high balcony. The seventh Aarna Shard is missing.",
        suspects: [
            { id: "nyx", name: "Nyx", role: "Assassin", relation: "Infiltrator", personality: "Wears large purple feathered glider wings.", alibi: "I was gliding between cloud towers.", motive: "Wants the seventh shard power.", image: "images/suspects/nyx_assassin.svg", avatarEmoji: "🪽" },
            { id: "brak", name: "Brak", role: "Sky Sentry", relation: "Guard", personality: "Wears a round dome steel helmet.", alibi: "I was guarding ground tower stairs.", motive: "Wants money for armor upgrades.", image: "images/suspects/brak_sentry.svg", avatarEmoji: "🪖" },
            { id: "lyra", name: "Lyra", role: "Sky Mystic", relation: "Scholar", personality: "Carries a glowing cyan crystal pendant.", alibi: "I was praying at cloud shrines.", motive: "Angry over stolen shrine scrolls.", image: "images/suspects/lyra_mystic.svg", avatarEmoji: "🔮" }
        ],
        evidence: {
            clue1: {
                title: "PURPLE GLIDER FEATHER",
                icon: "🪽",
                summary: "A purple glider wing feather on railing.",
                details: "A bright purple glider feather snagged on the high balcony parapet.",
                image: "images/clues/c7-wing.svg",
                crossRefHint: "HINT: Which suspect wears purple glider wings?"
            },
            clue2: {
                title: "SHATTERED WATER VIAL",
                icon: "💧",
                summary: "Shattered cyan glass from landing cushion.",
                details: "Glass shards from a landing potion used to glide onto the high spire.",
                weaponName: "Purple Glider Wings",
                image: "images/clues/c7-water.svg",
                crossRefHint: "HINT: The perpetrator glided from above onto the stairs-free balcony."
            },
            clue3: {
                title: "LANDING TARGET BEACON",
                icon: "🎯",
                summary: "A balcony drop marker marked Agent Nyx.",
                details: "A landing crosshair painted on the floor reading: 'AGENT: NYX'.",
                messages: [{ sender: "Nyx", time: "10:30", text: "I will glide from the sky and steal the seventh shard." }],
                image: "images/clues/c7-feather.svg",
                crossRefHint: "HINT: Read the agent tag on the landing beacon."
            }
        },
        options: {
            who: ["Nyx", "Brak", "Lyra"],
            how: ["Glided from above with purple wings", "Breached the balcony using siege ram", "Overloaded the altar with holy water"],
            why: ["To steal the seventh floating shard", "To take command of sky guard", "To silence an outspoken temple critic"]
        },
        correctAnswer: {
            who: "Nyx",
            how: "Glided from above with purple wings",
            why: "To steal the seventh floating shard"
        },
        explanation: {
            summary: "Nyx used her purple glider wings to dive from the sky onto the isolated balcony and steal the seventh shard.",
            clueChain: ["Purple glider feather on the railing.", "Shattered glass from a landing potion.", "Landing target beacon stenciled with 'NYX'."]
        },
        failureHint: "HINT: Look at who flies with purple glider wings between cloud towers."
    },

    {
        id: 8,
        title: "THE SKY SHIP",
        dimension: "sky",
        victim: "Captain",
        location: "Docked Airship",
        time: "01:00 PM",
        status: "MURDER",
        difficulty: 3,
        synopsis: "The Captain was injured when the airship engine burst. The eighth Aarna Shard is missing.",
        suspects: [
            { id: "brak", name: "Brak", role: "Mechanic", relation: "Engineer", personality: "Carries bright red rocket fuses in belt.", alibi: "I was testing red rocket fuses.", motive: "Wants the eighth shard power.", image: "images/suspects/brak_mechanic.svg", avatarEmoji: "🔧" },
            { id: "vesper", name: "Vesper", role: "Priest", relation: "Temple Leader", personality: "Wears dark flowing obsidian robes.", alibi: "I was chanting in dark shrines.", motive: "Wants to disrupt airship commerce.", image: "images/suspects/vesper_priest.svg", avatarEmoji: "🕯️" },
            { id: "tuck", name: "Tuck", role: "Deckhand", relation: "Runner", personality: "Carries heavy wooden fruit crates.", alibi: "I was hauling fresh food crates.", motive: "Upset about low delivery wages.", image: "images/suspects/tuck_runner.svg", avatarEmoji: "📦" }
        ],
        evidence: {
            clue1: {
                title: "RED FIREWORK CASING",
                icon: "📜",
                summary: "Red explosive paper casing and copper fuse.",
                details: "Burnt red paper casings and copper fuse wire matching toolbelt items.",
                image: "images/clues/c8-wrapper.svg",
                crossRefHint: "HINT: Which suspect carries red rocket fuses in their belt?"
            },
            clue2: {
                title: "RED BOOSTER ROCKET",
                icon: "🧨",
                summary: "A red explosive rocket inside engine.",
                details: "A red booster rocket explosive jammed into the airship intake slot.",
                weaponName: "Red Booster Rocket",
                image: "images/clues/c8-firework.svg",
                crossRefHint: "HINT: Who had access to the engine booster slots?"
            },
            clue3: {
                title: "ENGINEER TOOL CRATE",
                icon: "📦",
                summary: "A tool crate stenciled to Brak.",
                details: "A wooden tool crate stenciled: 'ENG: BRAK' containing rocket casings.",
                messages: [{ sender: "Brak", time: "12:30", text: "I will blow the engine with fire crackers and grab the shard." }],
                image: "images/clues/c8-crate.svg",
                crossRefHint: "HINT: Read the engineer tag on the tool crate."
            }
        },
        options: {
            who: ["Brak", "Vesper", "Tuck"],
            how: ["Jammed red firework into booster slot", "Cast a curse onto navigation engine", "Dropped heavy fruit crates into propeller"],
            why: ["To steal the eighth aerial shard", "To sacrifice the airship to shadows", "To protest harsh cargo delivery terms"]
        },
        correctAnswer: {
            who: "Brak",
            how: "Jammed red firework into booster slot",
            why: "To steal the eighth aerial shard"
        },
        explanation: {
            summary: "Brak stuffed a red booster rocket into the airship intake to cause an explosion and steal the eighth shard.",
            clueChain: ["Burnt red paper casings matching his fuses.", "Red rocket explosive jammed in the engine.", "Tool crate stenciled with 'ENG: BRAK'."]
        },
        failureHint: "HINT: Look at who carries red rocket fuses and works as the airship mechanic."
    },

    {
        id: 9,
        title: "THE CRYSTAL ROOM",
        dimension: "temple",
        victim: "Guardian",
        location: "Sacred Glass Altar",
        time: "05:00 PM",
        status: "MURDER",
        difficulty: 3,
        synopsis: "The Guardian was blinded by focused laser energy. The ninth Aarna Shard is missing.",
        suspects: [
            { id: "vesper", name: "Vesper", role: "Cultist", relation: "Temple Leader", personality: "Carries a glowing purple laser tuning rod.", alibi: "I was aligning temple energy rods.", motive: "Wants the ninth shard power.", image: "images/suspects/vesper_cultist.svg", avatarEmoji: "🔮" },
            { id: "omen", name: "Omen", role: "Sage", relation: "Librarian", personality: "Carries a heavy embossed blue spell book.", alibi: "I was reading sacred blue scrolls.", motive: "Upset about damaged temple history.", image: "images/suspects/omen_sage.svg", avatarEmoji: "📖" },
            { id: "mira", name: "Mira", role: "Courier", relation: "Messenger", personality: "Carries a green leather courier bag.", alibi: "I was delivering temple post letters.", motive: "Needs money to travel abroad.", image: "images/suspects/mira_courier.svg", avatarEmoji: "🎒" }
        ],
        evidence: {
            clue1: {
                title: "HEXAGON ROD SCRATCHES",
                icon: "🏛️",
                summary: "Hexagonal lock scratches on the pedestal.",
                details: "Distinct hexagonal indentation marks matching a tuning rod tip.",
                image: "images/clues/c9-chisel.svg",
                crossRefHint: "HINT: Which suspect carries a hexagonal tuning rod?"
            },
            clue2: {
                title: "FOCUSED LASER BEAM",
                icon: "💎",
                summary: "A focused purple laser crystal beam.",
                details: "A concentrated purple crystal laser beam focused onto the altar.",
                weaponName: "Purple Laser Beam",
                image: "images/clues/c9-lens.svg",
                crossRefHint: "HINT: How was the laser energy redirected?"
            },
            clue3: {
                title: "PURPLE TUNING ROD",
                icon: "🔮",
                summary: "A glowing purple tuning rod on mount.",
                details: "A resonant purple metallic rod left attached to the lens adjuster.",
                messages: [{ sender: "Vesper", time: "04:30", text: "I will focus the sun beam with my rod to take the shard." }],
                image: "images/clues/c9-rod.svg",
                crossRefHint: "HINT: Who carries a glowing purple tuning rod?"
            }
        },
        options: {
            who: ["Vesper", "Omen", "Mira"],
            how: ["Focused crystal beam with tuning rod", "Deflected the light using ancient books", "Smashed the prism with heavy satchel"],
            why: ["To steal the ninth radiant shard", "To decipher forbidden lost temple rituals", "To ransom the ancient sacred relic"]
        },
        correctAnswer: {
            who: "Vesper",
            how: "Focused crystal beam with tuning rod",
            why: "To steal the ninth radiant shard"
        },
        explanation: {
            summary: "Vesper used his purple tuning rod to align the temple crystal laser onto the Guardian, seizing the ninth shard.",
            clueChain: ["Hexagonal scratches on the pedestal lock.", "Focused purple crystal laser beam.", "Purple tuning rod left on the lens adjuster."]
        },
        failureHint: "HINT: Look at who works with laser tuning rods and aligns temple optical crystals."
    },

    {
        id: 10,
        title: "THE AARNA AWAKENING",
        dimension: "deepdark",
        victim: "Leo",
        location: "Underground Echo Chamber",
        time: "11:30 PM",
        status: "MURDER",
        difficulty: 3,
        synopsis: "Leo was stunned by sonic vibration. Vesper is assembling all 10 shards into the Aarna Singularity!",
        suspects: [
            { id: "vesper", name: "Vesper", role: "Mastermind", relation: "Shadow Leader", personality: "Wears white padded wool boots and fork.", alibi: "I was studying acoustic cavern resonance.", motive: "Wants to trigger Aarna Singularity.", image: "images/suspects/vesper_mastermind.svg", avatarEmoji: "👑" },
            { id: "durand", name: "Durand", role: "Blacksmith", relation: "Iron Master", personality: "Wears loud steel iron plate boots.", alibi: "I was forging iron cavern gates.", motive: "Wants to melt shards for iron.", image: "images/suspects/durand_smith.svg", avatarEmoji: "🔨" },
            { id: "solas", name: "Solas", role: "Fire Scout", relation: "Scout", personality: "Carries bright burning flame torches.", alibi: "I was lighting deep cavern walls.", motive: "Wants to illuminate dark depths.", image: "images/suspects/solas_pyro.svg", avatarEmoji: "🔥" },
            { id: "nyx", name: "Nyx", role: "Shadow Guard", relation: "Assassin", personality: "Carries a curved stealth dagger.", alibi: "I was patrolling upper tunnel arches.", motive: "Wants to flee the underground.", image: "images/suspects/nyx_shadow.svg", avatarEmoji: "🗡️" }
        ],
        evidence: {
            clue1: {
                title: "WHITE WOOL BOOT FIBERS",
                icon: "🧶",
                summary: "White wool fibers from padded boots.",
                details: "Soft white wool padding fibers left beside the acoustic motion sensor.",
                image: "images/clues/c10-wool.svg",
                crossRefHint: "HINT: Who wears white wool-padded boots for silent movement?"
            },
            clue2: {
                title: "ACOUSTIC TUNING FORK",
                icon: "🎵",
                summary: "A vibrating iron acoustic tuning fork.",
                details: "A steel resonance fork tuned to trigger the sonic vibration sensor.",
                weaponName: "Acoustic Tuning Fork",
                image: "images/clues/c10-fork.svg",
                crossRefHint: "HINT: Which suspect carries an acoustic tuning fork?"
            },
            clue3: {
                title: "AARNA SINGULARITY PLAN",
                icon: "📜",
                summary: "Master ledger signed by Vesper.",
                details: "A master record reading: 'AARNA SINGULARITY - MASTER: VESPER'.",
                messages: [{ sender: "Vesper", time: "11:00", text: "Striking the acoustic bell will stun Leo so I can assemble the Aarna Singularity." }],
                image: "images/clues/c10-ledger.svg",
                crossRefHint: "HINT: Read the master signature on the Singularity ledger."
            }
        },
        options: {
            who: ["Vesper", "Durand", "Solas", "Nyx"],
            how: ["Struck acoustic sensor with tuning fork", "Smashed the sound chamber with hammer", "Burned the resonance cables with torch", "Sliced the sensory wires with dagger"],
            why: ["To trigger the cataclysmic Aarna Singularity", "To melt ancient shards into weapons", "To illuminate the deep dark depths", "To escape the underground cavern fortress"]
        },
        correctAnswer: {
            who: "Vesper",
            how: "Struck acoustic sensor with tuning fork",
            why: "To trigger the cataclysmic Aarna Singularity"
        },
        explanation: {
            summary: "Vesper muffled his steps with white wool boots, struck the acoustic sensor with his tuning fork to stun Leo, and attempted to assemble the cataclysmic Aarna Singularity.",
            clueChain: ["White wool boot fibers near the sensor.", "Vibrating acoustic tuning fork on the pedestal.", "Master Singularity ledger signed by Vesper."]
        },
        failureHint: "HINT: Look at who wears white wool boots, carries an acoustic tuning fork, and seeks the Aarna Singularity."
    }
];

function getCaseById(id) {
    const numId = parseInt(id, 10);
    return CASES.find(c => c.id === numId) || null;
}

function getAllCases() {
    return CASES;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CASES, getCaseById, getAllCases };
}
