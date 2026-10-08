/**
 * CASE: AARNA - Master Case Database
 * 10 Mystery Cases for the Aarna Investigation Bureau.
 * Features balanced options, strict 3-clue visual evidence structures, and progressive deduction.
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
            { id: "garth", name: "Garth", role: "Woodcutter", relation: "Neighbor", personality: "Carries a heavy wooden axe.", alibi: "I was chopping pine trees.", motive: "Needs gold for new tools.", image: "images/suspects/garth.svg", avatarEmoji: "🪓" },
            { id: "lin", name: "Lin", role: "Farmer", relation: "Friend", personality: "Carries a metal shovel.", alibi: "I was planting wheat seeds.", motive: "Angry about the land taxes.", image: "images/suspects/lin.svg", avatarEmoji: "🌾" },
            { id: "sam", name: "Sam", role: "Guard", relation: "Security", personality: "Carries a long rope.", alibi: "I was sleeping at home.", motive: "No known motive at all.", image: "images/suspects/sam.svg", avatarEmoji: "🛡️" }
        ],
        evidence: {
            clue1: { 
                title: "FOOTPRINTS", 
                icon: "👣", 
                summary: "Deep boot prints with pine needles.", 
                details: "Fresh mud and pine needles were found on the floor.", 
                image: "images/clues/c1-footprints.svg",
                crossRefHint: "HINT: Match the pine needles to the suspect's alibi." 
            },
            clue2: { 
                title: "WEAPON", 
                icon: "⚔️", 
                summary: "A heavy wooden axe.", 
                details: "The wooden axe is covered in fresh splinters.", 
                weaponName: "Wooden Axe", 
                image: "images/clues/c1-axe.svg",
                crossRefHint: "HINT: Which suspect carries an axe?" 
            },
            clue3: { 
                title: "NOTE", 
                icon: "📜", 
                summary: "A dropped note about stealing.", 
                details: "A crinkled piece of paper showing a drawn axe and gold coin.",
                messages: [{ sender: "Garth", time: "05:00", text: "I will use my axe to get that gold coin." }], 
                image: "images/clues/c1-note.svg",
                crossRefHint: "HINT: Read the sender's plan on the note." 
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
            summary: "Garth used his wooden axe to smash the door and steal the first shard because he needed money for tools.",
            clueChain: ["Pine needles matched his alibi.", "A wooden axe was left behind.", "The note mentioned his plan."]
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
            { id: "clara", name: "Clara", role: "Weaver", relation: "Partner", personality: "Wears a warm pink wool scarf.", alibi: "I was knitting wool scarves.", motive: "Upset about high wool taxes.", image: "images/suspects/clara_weaver.svg", avatarEmoji: "🧣" },
            { id: "tuck", name: "Tuck", role: "Baker", relation: "Friend", personality: "Wears a clean white chef apron.", alibi: "I was baking fresh bread.", motive: "Argued over flour delivery costs.", image: "images/suspects/tuck_baker.svg", avatarEmoji: "🥖" },
            { id: "lin", name: "Lin", role: "Botanist", relation: "Neighbor", personality: "Carries bottles of green plant poison.", alibi: "I was mixing green herbal potion.", motive: "Wants the second shard power.", image: "images/suspects/lin_potions.svg", avatarEmoji: "🧪" }
        ],
        evidence: {
            clue1: {
                title: "BOTTLE",
                icon: "🧪",
                summary: "A shattered green poison vial.",
                details: "A broken glass vial coated in lethal green plant poison.",
                weaponName: "Green Poison Vial",
                image: "images/clues/c2-bottle.svg",
                crossRefHint: "HINT: Match the green potion bottle to the suspect."
            },
            clue2: {
                title: "STAIN",
                icon: "💧",
                summary: "Green liquid splashed across floorboards.",
                details: "Wet green liquid matching herbal extracts was spilled under the window.",
                image: "images/clues/c2-stain.svg",
                crossRefHint: "HINT: Who was mixing green liquid?"
            },
            clue3: {
                title: "SCROLL",
                icon: "📜",
                summary: "A recipe scroll signed by Lin.",
                details: "A written formula for green poison with Lin's name signed at the bottom.",
                messages: [{ sender: "Lin", time: "07:30", text: "I will pour the green poison and take the second shard." }],
                image: "images/clues/c2-scroll.svg",
                crossRefHint: "HINT: Read the name on the recipe scroll."
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
            summary: "Lin poured toxic green herbal poison through the windmill window to incapacitate Milo and steal the second Aarna Shard.",
            clueChain: ["The shattered green poison vial.", "Green liquid puddle under the window.", "Recipe scroll signed by Lin."]
        },
        failureHint: "HINT: Look at who carries bottles of green poison and mixes herbal potions."
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
            { id: "vance", name: "Vance", role: "Engineer", relation: "Technician", personality: "Wears rubber gloves and orange goggles.", alibi: "I was winding orange copper wire.", motive: "Needs power for his generator.", image: "images/suspects/vance_engineer.svg", avatarEmoji: "⚡" },
            { id: "bruno", name: "Bruno", role: "Mason", relation: "Builder", personality: "Carries a heavy grey chisel belt.", alibi: "I was carving granite wall blocks.", motive: "Upset about unpaid building fees.", image: "images/suspects/bruno_mason.svg", avatarEmoji: "⛏️" },
            { id: "selena", name: "Selena", role: "Trader", relation: "Merchant", personality: "Carries a heavy blue trade pack.", alibi: "I was counting blue trade tokens.", motive: "Wants money for travel expenses.", image: "images/suspects/selena_trader.svg", avatarEmoji: "🎒" }
        ],
        evidence: {
            clue1: {
                title: "WIRE",
                icon: "⚡",
                summary: "Orange copper wire hooked to rod.",
                details: "Long orange copper wires rigged from the roof lightning rod into the chamber.",
                weaponName: "Orange Copper Wire",
                image: "images/clues/c3-wire.svg",
                crossRefHint: "HINT: Match the orange copper wire to the suspect."
            },
            clue2: {
                title: "BURN",
                icon: "🔥",
                summary: "Electrified scorch marks around iron plate.",
                details: "Deep electrical scorch patterns radiating across the stone floor.",
                image: "images/clues/c3-burn.svg",
                crossRefHint: "HINT: Who understands high voltage circuits?"
            },
            clue3: {
                title: "TAG",
                icon: "🏷️",
                summary: "A wire spool label marked Vance.",
                details: "An empty wire spool tag with the property label 'Vance' left on the steps.",
                messages: [{ sender: "Vance", time: "09:15", text: "I can channel lightning through copper wire to take the shard." }],
                image: "images/clues/c3-tag.svg",
                crossRefHint: "HINT: Read the owner's name on the wire spool."
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
            summary: "Vance connected orange copper wire to the tower's lightning rod during the storm to electrocute the Lord and steal the third shard.",
            clueChain: ["Orange copper wire hooked to the roof rod.", "Electrical scorch marks on the plate.", "Spool label marked with Vance's name."]
        },
        failureHint: "HINT: Look at who works with copper wire and understands electrical circuits."
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
            { id: "zul", name: "Zul", role: "Treasurer", relation: "Coworker", personality: "Wears a heavy gold signet ring.", alibi: "I was counting gold vault coins.", motive: "Wants the fourth shard power.", image: "images/suspects/zul_treasurer.svg", avatarEmoji: "💍" },
            { id: "pyra", name: "Pyra", role: "Handler", relation: "Transporter", personality: "Carries a glowing lava staff.", alibi: "I was feeding the lava pits.", motive: "Needs gold for lava supplies.", image: "images/suspects/pyra_handler.svg", avatarEmoji: "🔥" },
            { id: "vorg", name: "Vorg", role: "Guard", relation: "Security", personality: "Carries a massive iron shield.", alibi: "I was guarding the tunnel entrance.", motive: "Upset about long watch shifts.", image: "images/suspects/vorg_sentry.svg", avatarEmoji: "🛡️" }
        ],
        evidence: {
            clue1: {
                title: "LEVER",
                icon: "⚙️",
                summary: "Gold signet ring smudge on switch.",
                details: "A gold-tinted smudge from a signet ring left on the heavy iron gate lever.",
                weaponName: "Heavy Gate Lever",
                image: "images/clues/c4-lever.svg",
                crossRefHint: "HINT: Who wears a heavy gold signet ring?"
            },
            clue2: {
                title: "GATE",
                icon: "🚪",
                summary: "Crushed stone under iron portcullis.",
                details: "The heavy iron gate dropped suddenly, smashing the stone walkway below.",
                image: "images/clues/c4-gate.svg",
                crossRefHint: "HINT: How was the stone entrance crushed?"
            },
            clue3: {
                title: "LEDGER",
                icon: "📜",
                summary: "An order note signed by Zul.",
                details: "A written order requesting the gate mechanism to be triggered at 02:00 PM.",
                messages: [{ sender: "Zul", time: "01:20", text: "I will pull the gate lever and grab the fourth shard." }],
                image: "images/clues/c4-ledger.svg",
                crossRefHint: "HINT: Read the signature on the order note."
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
            summary: "Zul pulled the gate lever to drop the heavy portcullis onto the Sentry and secure the fourth Aarna Shard.",
            clueChain: ["Gold ring smudge on the gate lever.", "Crushed stone beneath the portcullis.", "Order ledger bearing Zul's signature."]
        },
        failureHint: "HINT: Look at who wears a gold signet ring and signed the gate drop order."
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
            { id: "malakor", name: "Malakor", role: "Nomad", relation: "Rival", personality: "Wears a dark hooded black cowl.", alibi: "I was resting in shadow tents.", motive: "Wants the fifth shard power.", image: "images/suspects/malakor_nomad.svg", avatarEmoji: "🥷" },
            { id: "darek", name: "Darek", role: "Quarryman", relation: "Miner", personality: "Carries a heavy iron pickaxe.", alibi: "I was chipping hard basalt rock.", motive: "Wants to buy new quarry tools.", image: "images/suspects/darek_quarryman.svg", avatarEmoji: "⛏️" },
            { id: "mira", name: "Mira", role: "Scout", relation: "Explorer", personality: "Wears flexible brown leather boots.", alibi: "I was scouting the canyon rim.", motive: "Wants fame from new maps.", image: "images/suspects/mira_scout.svg", avatarEmoji: "👢" }
        ],
        evidence: {
            clue1: {
                title: "FLASK",
                icon: "🧪",
                summary: "A swapped flask containing cold water.",
                details: "The victim's fire resistance potion was swapped with a flask of plain water.",
                weaponName: "Swapped Water Flask",
                image: "images/clues/c5-flask.svg",
                crossRefHint: "HINT: Match the cold water flask to the sabotage."
            },
            clue2: {
                title: "THREAD",
                icon: "🧵",
                summary: "Torn black cloth on saddle pouch.",
                details: "Frayed fibers from a dark hooded black cowl snagged on the victim's pouch.",
                image: "images/clues/c5-thread.svg",
                crossRefHint: "HINT: Who wears dark black hooded clothing?"
            },
            clue3: {
                title: "CORK",
                icon: "🍾",
                summary: "Marked cork floating near the boat.",
                details: "A wooden flask cork stamped with the letter 'M' found near the ferry pier.",
                messages: [{ sender: "Malakor", time: "03:30", text: "Swapping the potion with water ensures the fifth shard is mine." }],
                image: "images/clues/c5-cork.svg",
                crossRefHint: "HINT: Look at the letter stamped on the cork."
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
            summary: "Malakor swapped the scout's fire protection potion with cold water, causing the victim to perish in the lava heat and allowing him to steal the fifth shard.",
            clueChain: ["Swapped flask filled with plain water.", "Torn black cloth from a hooded cowl.", "Cork stamped with 'M' found near the scene."]
        },
        failureHint: "HINT: Look at who wears a black hooded cowl and left their marked cork."
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
            { id: "solas", name: "Solas", role: "Firemage", relation: "Alchemist", personality: "Wears yellow sulfur dust on sleeves.", alibi: "I was mixing explosive sulfur powder.", motive: "Needs the sixth shard power.", image: "images/suspects/solas_firemage.svg", avatarEmoji: "✨" },
            { id: "varren", name: "Varren", role: "Cutter", relation: "Builder", personality: "Carries a sharp steel mason saw.", alibi: "I was cutting dark basalt slabs.", motive: "Needs money for building stones.", image: "images/suspects/varren_cutter.svg", avatarEmoji: "🪚" },
            { id: "nari", name: "Nari", role: "Carrier", relation: "Merchant", personality: "Carries large woven canvas sacks.", alibi: "I was carrying heavy trade sacks.", motive: "Argued over unpaid market taxes.", image: "images/suspects/nari_carrier.svg", avatarEmoji: "👜" }
        ],
        evidence: {
            clue1: {
                title: "BOMB",
                icon: "💣",
                summary: "A yellow charged explosive bomb base.",
                details: "A round yellow sulfur bomb casing stamped with the alchemical letter 'S'.",
                weaponName: "Yellow Sulfur Bomb",
                image: "images/clues/c6-bomb.svg",
                crossRefHint: "HINT: Who works with yellow explosive sulfur?"
            },
            clue2: {
                title: "POWDER",
                icon: "✨",
                summary: "Yellow powder trail leading into cave.",
                details: "Bright yellow sulfur residue spilled along the escape path toward the delta.",
                image: "images/clues/c6-powder.svg",
                crossRefHint: "HINT: Match the yellow powder to the suspect."
            },
            clue3: {
                title: "BLUEPRINT",
                icon: "📐",
                summary: "Bomb wiring sketch marked by Solas.",
                details: "A chemical blueprint for an explosive sulfur bomb with Solas's signature.",
                messages: [{ sender: "Solas", time: "06:30", text: "My explosive sulfur will blast the door so I can take the shard." }],
                image: "images/clues/c6-blueprint.svg",
                crossRefHint: "HINT: Read the creator on the bomb blueprint."
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
            summary: "Solas planted a yellow sulfur bomb at the shelter entrance to blast open the vault and claim the sixth shard.",
            clueChain: ["Yellow bomb casing stamped with 'S'.", "Trail of yellow sulfur dust.", "Chemical bomb blueprint signed by Solas."]
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
            { id: "nyx", name: "Nyx", role: "Assassin", relation: "Infiltrator", personality: "Wears flying purple glider wings.", alibi: "I was gliding between cloud towers.", motive: "Wants the seventh shard power.", image: "images/suspects/nyx_assassin.svg", avatarEmoji: "🪽" },
            { id: "brak", name: "Brak", role: "Sentry", relation: "Guard", personality: "Wears a round iron shell helmet.", alibi: "I was guarding ground tower stairs.", motive: "Wants money for armor upgrades.", image: "images/suspects/brak_sentry.svg", avatarEmoji: "🪖" },
            { id: "lyra", name: "Lyra", role: "Mystic", relation: "Scholar", personality: "Carries a glowing crystal pendant.", alibi: "I was praying at cloud shrines.", motive: "Angry over stolen shrine scrolls.", image: "images/suspects/lyra_mystic.svg", avatarEmoji: "🔮" }
        ],
        evidence: {
            clue1: {
                title: "WING",
                icon: "🪽",
                summary: "Purple glider feather beside puddle.",
                details: "A distinct purple glider feather snagged on the high balcony parapet.",
                weaponName: "Purple Glider Wings",
                image: "images/clues/c7-wing.svg",
                crossRefHint: "HINT: Who wears flying purple glider wings?"
            },
            clue2: {
                title: "WATER",
                icon: "💧",
                summary: "Splash water bottle fragments on roof.",
                details: "Shattered blue glass from a splash potion bottle used to soften landing.",
                image: "images/clues/c7-water.svg",
                crossRefHint: "HINT: Look at the shattered glass on the roof."
            },
            clue3: {
                title: "FEATHER",
                icon: "🎯",
                summary: "Drop marker on balcony signed Nyx.",
                details: "A target beacon carved into the isolated spire balcony floor with Nyx's mark.",
                messages: [{ sender: "Nyx", time: "10:30", text: "I will glide from the sky and steal the seventh shard." }],
                image: "images/clues/c7-feather.svg",
                crossRefHint: "HINT: Read the initials on the drop marker."
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
            summary: "Nyx used her purple glider wings to swoop down onto the isolated high platform, incapacitate the Watcher, and steal the seventh shard.",
            clueChain: ["Purple glider feather on the railing.", "Shattered glass from a landing splash potion.", "Target drop marker bearing Nyx's mark."]
        },
        failureHint: "HINT: Look at who uses purple wings to glide between cloud towers."
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
            { id: "brak", name: "Brak", role: "Mechanic", relation: "Engineer", personality: "Carries red fuses in his belt.", alibi: "I was testing red rocket fuses.", motive: "Wants the eighth shard power.", image: "images/suspects/brak_mechanic.svg", avatarEmoji: "🔧" },
            { id: "vesper", name: "Vesper", role: "Priest", relation: "Temple Leader", personality: "Wears dark flowing black robes.", alibi: "I was chanting in dark shrines.", motive: "Wants to disrupt airship commerce.", image: "images/suspects/vesper_priest.svg", avatarEmoji: "🕯️" },
            { id: "tuck", name: "Tuck", role: "Runner", relation: "Deckhand", personality: "Carries heavy wooden fruit crates.", alibi: "I was hauling fresh food crates.", motive: "Upset about low delivery wages.", image: "images/suspects/tuck_runner.svg", avatarEmoji: "📦" }
        ],
        evidence: {
            clue1: {
                title: "FIREWORK",
                icon: "🧨",
                summary: "Red explosive rocket in booster slot.",
                details: "A high-yield red firework rocket jammed directly into the airship intake slot.",
                weaponName: "Red Booster Firework",
                image: "images/clues/c8-firework.svg",
                crossRefHint: "HINT: Who carries explosive red rocket fuses?"
            },
            clue2: {
                title: "WRAPPER",
                icon: "📜",
                summary: "Red explosive firework paper and fuse.",
                details: "Burnt red paper casings and copper ignition wire found near the engine hatch.",
                image: "images/clues/c8-wrapper.svg",
                crossRefHint: "HINT: Match red wrappers to the suspect's belt."
            },
            clue3: {
                title: "CRATE",
                icon: "📦",
                summary: "Tampered booster crate marked Brak.",
                details: "A maintenance crate stamped 'ENG: BRAK' containing dismantled rocket boosters.",
                messages: [{ sender: "Brak", time: "12:30", text: "I will blow the engine with fire crackers and grab the shard." }],
                image: "images/clues/c8-crate.svg",
                crossRefHint: "HINT: Read the engineer tag on the crate."
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
            summary: "Brak stuffed an explosive red firework into the engine booster slot to cause an explosion and steal the eighth shard.",
            clueChain: ["Red firework jammed in the booster.", "Burnt red paper casings from his fuses.", "Tampered maintenance crate marked 'ENG: BRAK'."]
        },
        failureHint: "HINT: Look at who carries red rocket fuses and works on engine maintenance."
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
            { id: "vesper", name: "Vesper", role: "Cultist", relation: "Temple Leader", personality: "Carries a purple laser tuning rod.", alibi: "I was aligning temple energy rods.", motive: "Wants the ninth shard power.", image: "images/suspects/vesper_cultist.svg", avatarEmoji: "🔮" },
            { id: "omen", name: "Omen", role: "Sage", relation: "Librarian", personality: "Carries heavy ancient blue books.", alibi: "I was reading sacred blue scrolls.", motive: "Upset about damaged temple history.", image: "images/suspects/omen_sage.svg", avatarEmoji: "📖" },
            { id: "mira", name: "Mira", role: "Courier", relation: "Messenger", personality: "Carries a green leather satchel.", alibi: "I was delivering temple post letters.", motive: "Needs money to travel abroad.", image: "images/suspects/mira_courier.svg", avatarEmoji: "🎒" }
        ],
        evidence: {
            clue1: {
                title: "LENS",
                icon: "💎",
                summary: "Crystal beam angled toward altar.",
                details: "A focused purple energy beam aligned to concentrate light directly onto the altar.",
                weaponName: "Purple Crystal Beam",
                image: "images/clues/c9-lens.svg",
                crossRefHint: "HINT: How was the focused energy beam redirected?"
            },
            clue2: {
                title: "ROD",
                icon: "🔮",
                summary: "Purple tuning rod on beam adjuster.",
                details: "A resonant purple metallic tuning rod left attached to the crystal lens mount.",
                image: "images/clues/c9-rod.svg",
                crossRefHint: "HINT: Who carries a purple laser tuning rod?"
            },
            clue3: {
                title: "CHISEL",
                icon: "🏛️",
                summary: "Pillar lock marks carved by rod.",
                details: "Scratches on the stone pillar lock matching the hexagonal tip of Vesper's rod.",
                messages: [{ sender: "Vesper", time: "04:30", text: "I will focus the sun beam with my rod to take the shard." }],
                image: "images/clues/c9-chisel.svg",
                crossRefHint: "HINT: Match the rod marks on the stone pillar."
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
            summary: "Vesper used his purple laser tuning rod to align the crystal lens beam onto the Guardian, seizing the ninth shard.",
            clueChain: ["Redirected purple crystal laser beam.", "Purple tuning rod left on the lens adjuster.", "Hexagonal rod marks on the pillar lock."]
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
            { id: "vesper", name: "Vesper", role: "Mastermind", relation: "Shadow Leader", personality: "Wears soft wool boots and fork.", alibi: "I was studying acoustic cavern resonance.", motive: "Wants to trigger Aarna Singularity.", image: "images/suspects/vesper_mastermind.svg", avatarEmoji: "👑" },
            { id: "durand", name: "Durand", role: "Smith", relation: "Blacksmith", personality: "Wears loud heavy iron boots.", alibi: "I was forging iron cavern gates.", motive: "Wants to melt shards for iron.", image: "images/suspects/durand_smith.svg", avatarEmoji: "🔨" },
            { id: "solas", name: "Solas", role: "Pyro", relation: "Firemage", personality: "Carries crackling bright flame torches.", alibi: "I was lighting deep cavern walls.", motive: "Wants to illuminate dark depths.", image: "images/suspects/solas_pyro.svg", avatarEmoji: "🔥" },
            { id: "nyx", name: "Nyx", role: "Shadow", relation: "Assassin", personality: "Wears silent shadow dagger sheath.", alibi: "I was patrolling upper tunnel arches.", motive: "Wants to flee the underground.", image: "images/suspects/nyx_shadow.svg", avatarEmoji: "🗡️" }
        ],
        evidence: {
            clue1: {
                title: "WOOL",
                icon: "🧶",
                summary: "White wool boot fibers near sensor.",
                details: "Soft white wool fibers caught on the sonic sensor, used to muffle footsteps.",
                image: "images/clues/c10-wool.svg",
                crossRefHint: "HINT: Who wears soft wool-padded boots to avoid detection?"
            },
            clue2: {
                title: "FORK",
                icon: "🎵",
                summary: "Iron tuning fork on acoustic sensor.",
                details: "A heavy iron acoustic tuning fork tuned to resonate with the cavern sensor.",
                weaponName: "Iron Tuning Fork",
                image: "images/clues/c10-fork.svg",
                crossRefHint: "HINT: Which suspect carries an acoustic tuning fork?"
            },
            clue3: {
                title: "LEDGER",
                icon: "📜",
                summary: "Master ledger of assembled shards.",
                details: "A master ledger detailing the positions of all 10 Aarna Shards signed by Vesper.",
                messages: [{ sender: "Vesper", time: "11:00", text: "Striking the acoustic bell will stun Leo so I can assemble the Aarna Singularity." }],
                image: "images/clues/c10-ledger.svg",
                crossRefHint: "HINT: Read Vesper's master plan for the Aarna Singularity."
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
            summary: "Vesper muffled his steps with wool-padded boots, struck the acoustic sensor with his iron tuning fork to stun Leo, and attempted to assemble the cataclysmic Aarna Singularity.",
            clueChain: ["White wool fibers from his muffled boots.", "Iron acoustic tuning fork on the sensor.", "Master ledger outlining the Aarna Singularity plan."]
        },
        failureHint: "HINT: Look at who wears wool-padded boots, carries an acoustic tuning fork, and seeks the Aarna Singularity."
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
