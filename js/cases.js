/**
 * CASE: ABHEDYA - Master Case Database
 * 10 Brand New Mystery Cases with balanced options and relaxed deduction logic.
 */

const CASES = [
    {
        id: 1,
        title: "THE MISSING COIN",
        dimension: "overworld",
        victim: "Bob",
        location: "Village Town Hall",
        time: "06:00 AM",
        status: "MURDER",
        difficulty: 1,
        synopsis: "Bob was struck in his office. The town ancient gold coin is missing.",
        suspects: [
            { id: "lin", name: "Lin", role: "Farmer", relation: "Friend", personality: "Always carries a metal shovel.", alibi: "I was planting wheat seeds.", motive: "Angry about high land taxes.", avatarEmoji: "🌾" },
            { id: "garth", name: "Garth", role: "Woodcutter", relation: "Neighbor", personality: "Always carries a wooden axe.", alibi: "I was chopping pine trees.", motive: "Needs gold for new tools.", avatarEmoji: "🪓" },
            { id: "sam", name: "Sam", role: "Guard", relation: "Security", personality: "Always carries a long rope.", alibi: "I was sleeping at home.", motive: "Wants a new shiny shield.", avatarEmoji: "🛡️" }
        ],
        evidence: {
            blockPrints: {
                title: "FOOTPRINTS",
                icon: "👣",
                summary: "Deep boot prints filled with pine needles.",
                details: "Fresh mud and pine needles were found on the floor.",
                crossRefHint: "HINT: Match the pine needles to the suspect's alibi."
            },
            observerLog: {
                title: "CAMERA LOG",
                icon: "👁️",
                summary: "Camera shows a heavy tool smashing the lock.",
                details: [
                    { time: "05:55", event: "Figure raises a wooden axe at the door." }
                ],
                crossRefHint: "HINT: Match the weapon on camera to the suspect."
            },
            chatLog: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "A dropped note about stealing gold.",
                messages: [
                    { sender: "Garth", time: "05:00", text: "I will use my axe to get that gold coin." }
                ],
                crossRefHint: "HINT: Read the sender's name on the note."
            },
            witness: {
                title: "WITNESS",
                icon: "📜",
                summary: "The baker saw the suspect running.",
                statement: "I saw Garth running away with a wooden axe!",
                witnessName: "Tuck",
                crossRefHint: "HINT: Trust the witness statement."
            },
            weapon: {
                title: "WEAPON",
                icon: "⚔️",
                summary: "A heavy wooden axe left on the desk.",
                details: "The axe is covered in wood splinters.",
                weaponName: "Wooden Axe",
                crossRefHint: "HINT: Which suspect carries an axe?"
            },
            roomLayout: {
                title: "LAYOUT",
                icon: "📐",
                summary: "The front door was smashed open.",
                layoutDesc: "Only a heavy chopping tool could break this door.",
                floorplanHotspots: [
                    { name: "Smashed Door", x: 50, y: 80, note: "Broken with an axe." }
                ],
                crossRefHint: "HINT: Look at how the door was broken."
            },
            timeline: {
                title: "TIMELINE",
                icon: "⏳",
                summary: "Sequence of the break-in.",
                entries: [
                    { time: "05:50", event: "Lin and Sam are seen across town.", verified: true },
                    { time: "05:55", event: "Door is smashed open.", verified: false }
                ],
                crossRefHint: "HINT: Lin and Sam have verified alibis."
            }
        },
        options: {
            who: ["Lin", "Garth", "Sam"],
            how: [
                "Dug a tunnel with a shovel",
                "Broke the door using an axe",
                "Climbed the roof with a rope"
            ],
            why: [
                "To protest the high land taxes",
                "To steal the ancient gold coin",
                "To take back a stolen shield"
            ]
        },
        correctAnswer: {
            who: "Garth",
            how: "Broke the door using an axe",
            why: "To steal the ancient gold coin"
        },
        explanation: {
            summary: "Garth used his wooden axe to smash the door and steal the gold coin because he needed money for tools.",
            clueChain: [
                "The witness saw Garth running.",
                "A wooden axe was left behind.",
                "Pine needles matched his alibi."
            ]
        },
        failureHint: "HINT: Look at who carries a wooden axe and works with pine trees."
    },

    {
        id: 2,
        title: "THE BROKEN FLOUR MILL",
        dimension: "overworld",
        victim: "Milo",
        location: "Hilltop Windmill",
        time: "08:00 AM",
        status: "MURDER",
        difficulty: 1,
        synopsis: "Milo was attacked in the flour mill. The golden grain sack was stolen.",
        suspects: [
            { id: "clara", name: "Clara", role: "Baker", relation: "Partner", personality: "Always carries a rolling pin.", alibi: "I was baking sweet bread.", motive: "Upset about high flour prices.", avatarEmoji: "🥖" },
            { id: "tuck", name: "Tuck", role: "Carpenter", relation: "Friend", personality: "Always carries a metal saw.", alibi: "I was cutting cedar planks.", motive: "Argued over wooden mill parts.", avatarEmoji: "🪚" },
            { id: "finn", name: "Finn", role: "Gardener", relation: "Neighbor", personality: "Always carries green plant poison.", alibi: "I was spraying rose bushes.", motive: "Wants money for rare seeds.", avatarEmoji: "🧪" }
        ],
        evidence: {
            blockPrints: {
                title: "FOOTPRINTS",
                icon: "👣",
                summary: "Shoe prints smelling strongly of rose bushes.",
                details: "Wet soil smelling of rose spray was tracked into the mill.",
                crossRefHint: "HINT: Match the rose spray smell to the gardener."
            },
            observerLog: {
                title: "CAMERA LOG",
                icon: "👁️",
                summary: "Camera captured green liquid thrown into the window.",
                details: [
                    { time: "07:55", event: "Green liquid flask is hurled through the glass." }
                ],
                crossRefHint: "HINT: Who carries green plant poison?"
            },
            chatLog: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "A message about stealing the golden grain sack.",
                messages: [
                    { sender: "Finn", time: "07:30", text: "I will throw my poison and take that golden grain sack." }
                ],
                crossRefHint: "HINT: Look at the author of the note."
            },
            witness: {
                title: "WITNESS",
                icon: "📜",
                summary: "The mailman saw Finn running with a green bottle.",
                statement: "I saw Finn running from the mill holding green poison!",
                witnessName: "Sam",
                crossRefHint: "HINT: Trust the witness statement."
            },
            weapon: {
                title: "WEAPON",
                icon: "⚔️",
                summary: "A shattered flask of green plant poison.",
                details: "The glass shards still smell of plant pesticide.",
                weaponName: "Green Poison Flask",
                crossRefHint: "HINT: Who carries plant poison?"
            },
            roomLayout: {
                title: "LAYOUT",
                icon: "📐",
                summary: "Green liquid marks under the broken window.",
                layoutDesc: "The poison was tossed directly from the outside garden.",
                floorplanHotspots: [
                    { name: "Broken Window", x: 60, y: 30, note: "Stained with green poison." }
                ],
                crossRefHint: "HINT: Check the poison on the window."
            },
            timeline: {
                title: "TIMELINE",
                icon: "⏳",
                summary: "Verified events at the mill.",
                entries: [
                    { time: "07:45", event: "Clara and Tuck are seen together at the bakery.", verified: true },
                    { time: "07:55", event: "Green poison splashed into mill.", verified: false }
                ],
                crossRefHint: "HINT: Clara and Tuck were together at the bakery."
            }
        },
        options: {
            who: ["Clara", "Tuck", "Finn"],
            how: [
                "Smashed the mill with a pin",
                "Cut the gears with a saw",
                "Threw toxic poison through the window"
            ],
            why: [
                "To protest high bread flour prices",
                "To settle a wooden mill dispute",
                "To steal the golden grain sack"
            ]
        },
        correctAnswer: {
            who: "Finn",
            how: "Threw toxic poison through the window",
            why: "To steal the golden grain sack"
        },
        explanation: {
            summary: "Finn threw green plant poison through the window to knock out Milo and steal the golden grain sack for seed money.",
            clueChain: [
                "The witness spotted Finn running with poison.",
                "Shattered green flask found on the floor.",
                "Footprints smelled of rose garden spray."
            ]
        },
        failureHint: "HINT: Look at who carries green plant poison and sprays rose bushes."
    },

    {
        id: 3,
        title: "THE LIGHTNING TOWER",
        dimension: "overworld",
        victim: "Bruno",
        location: "Fortress Watchtower",
        time: "10:00 PM",
        status: "MURDER",
        difficulty: 2,
        synopsis: "Bruno was struck during a storm. The fortress power crystal is gone.",
        suspects: [
            { id: "tara", name: "Tara", role: "Stonemason", relation: "Builder", personality: "Always carries a heavy chisel.", alibi: "I was carving granite stones.", motive: "Upset about unpaid building fees.", avatarEmoji: "🧱" },
            { id: "vance", name: "Vance", role: "Electrician", relation: "Technician", personality: "Always carries long copper wire.", alibi: "I was fixing copper wires.", motive: "Wants the crystal for power.", avatarEmoji: "⚡" },
            { id: "cole", name: "Cole", role: "Courier", relation: "Delivery", personality: "Always carries a leather pouch.", alibi: "I was resting by the fire.", motive: "Wants to sell rare gems.", avatarEmoji: "📦" }
        ],
        evidence: {
            blockPrints: {
                title: "FOOTPRINTS",
                icon: "👣",
                summary: "Boot prints with copper wire clippings.",
                details: "Small cut pieces of orange copper wire were pressed into the steps.",
                crossRefHint: "HINT: Who works with copper wires?"
            },
            observerLog: {
                title: "CAMERA LOG",
                icon: "👁️",
                summary: "Camera shows copper wire tied to the roof rod.",
                details: [
                    { time: "09:55", event: "A figure attaches long copper wire to the lightning rod." }
                ],
                crossRefHint: "HINT: Look at the copper wire on camera."
            },
            chatLog: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "A written note about lightning power.",
                messages: [
                    { sender: "Vance", time: "09:00", text: "I can channel lightning through copper wire to take the power crystal." }
                ],
                crossRefHint: "HINT: Check Vance's plan in the note."
            },
            witness: {
                title: "WITNESS",
                icon: "📜",
                summary: "The gate guard saw Vance running in the rain.",
                statement: "I saw Vance running from the watchtower holding glowing crystals!",
                witnessName: "Sam",
                crossRefHint: "HINT: Trust the guard's witness report."
            },
            weapon: {
                title: "WEAPON",
                icon: "⚔️",
                summary: "A burnt copper wire connected to the rod.",
                details: "The copper wire directed lightning straight to the floor.",
                weaponName: "Long Copper Wire",
                crossRefHint: "HINT: Who carries copper wires?"
            },
            roomLayout: {
                title: "LAYOUT",
                icon: "📐",
                summary: "Scorched wire running along the wall.",
                layoutDesc: "The wire channeled the storm strike into the power safe.",
                floorplanHotspots: [
                    { name: "Scorched Safe", x: 45, y: 70, note: "Burned by channeled lightning." }
                ],
                crossRefHint: "HINT: Examine the scorched wire line."
            },
            timeline: {
                title: "TIMELINE",
                icon: "⏳",
                summary: "Timeline during the heavy thunderstorm.",
                entries: [
                    { time: "09:40", event: "Tara and Cole are seen inside the warm inn.", verified: true },
                    { time: "09:55", event: "Lightning hits the watchtower wire.", verified: false }
                ],
                crossRefHint: "HINT: Tara and Cole stayed inside the inn."
            }
        },
        options: {
            who: ["Tara", "Vance", "Cole"],
            how: [
                "Cracked the wall with a chisel",
                "Channeled lightning with a copper wire",
                "Pulled the lock with a pouch"
            ],
            why: [
                "Over unpaid stone building fee disputes",
                "To steal the fortress power crystal",
                "To sell stolen shiny trade gems"
            ]
        },
        correctAnswer: {
            who: "Vance",
            how: "Channeled lightning with a copper wire",
            why: "To steal the fortress power crystal"
        },
        explanation: {
            summary: "Vance hooked copper wire to the lightning rod to channel lightning into the watchtower and steal the power crystal.",
            clueChain: [
                "The witness spotted Vance leaving the tower.",
                "Scorched copper wire found at the scene.",
                "Copper wire clippings found in the footprints."
            ]
        },
        failureHint: "HINT: Look at who carries copper wire and understands electricity."
    },

    {
        id: 4,
        title: "THE LAVA GATE",
        dimension: "nether",
        victim: "Vorg",
        location: "Crimson Lava Vault",
        time: "02:00 PM",
        status: "MURDER",
        difficulty: 2,
        synopsis: "Vorg was trapped beneath the heavy gate. The glowing red ruby is missing.",
        suspects: [
            { id: "pyra", name: "Pyra", role: "Boat Pilot", relation: "Transporter", personality: "Always carries a wooden oar.", alibi: "I was rowing across lava.", motive: "Needs gold to fix boat.", avatarEmoji: "🛶" },
            { id: "kira", name: "Kira", role: "Scout", relation: "Guard", personality: "Always carries a heavy crossbow.", alibi: "I was scouting distant hills.", motive: "Wants to buy armor upgrades.", avatarEmoji: "🏹" },
            { id: "zul", name: "Zul", role: "Gate Operator", relation: "Coworker", personality: "Always carries an iron lever.", alibi: "I was oiling iron levers.", motive: "Wants the ruby for wealth.", avatarEmoji: "⚙️" }
        ],
        evidence: {
            blockPrints: {
                title: "FOOTPRINTS",
                icon: "👣",
                summary: "Boot prints coated in black lever grease.",
                details: "Slick gear oil and lever grease were smeared on the vault stones.",
                crossRefHint: "HINT: Who was oiling iron levers?"
            },
            observerLog: {
                title: "CAMERA LOG",
                icon: "👁️",
                summary: "Camera shows someone pulling down the gate switch.",
                details: [
                    { time: "01:55", event: "Figure uses an iron lever to trigger the heavy gate." }
                ],
                crossRefHint: "HINT: Look at the lever mechanism on camera."
            },
            chatLog: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "A message about the red vault ruby.",
                messages: [
                    { sender: "Zul", time: "01:15", text: "I will pull the gate lever and grab the glowing ruby." }
                ],
                crossRefHint: "HINT: Read Zul's plan in the message."
            },
            witness: {
                title: "WITNESS",
                icon: "📜",
                summary: "A miner saw Zul running from the vault.",
                statement: "I saw Zul sprint out of the vault with the glowing red ruby!",
                witnessName: "Garth",
                crossRefHint: "HINT: Trust the miner's statement."
            },
            weapon: {
                title: "WEAPON",
                icon: "⚔️",
                summary: "An iron lever pulled down to drop the gate.",
                details: "The iron lever is covered in fresh mechanical oil.",
                weaponName: "Heavy Iron Lever",
                crossRefHint: "HINT: Which suspect carries iron levers?"
            },
            roomLayout: {
                title: "LAYOUT",
                icon: "📐",
                summary: "The heavy stone gate dropped from the ceiling.",
                layoutDesc: "The gate is triggered only from the main lever switch.",
                floorplanHotspots: [
                    { name: "Gate Lever", x: 75, y: 40, note: "Oiled lever pulled down." }
                ],
                crossRefHint: "HINT: Check the lever that dropped the gate."
            },
            timeline: {
                title: "TIMELINE",
                icon: "⏳",
                summary: "Recorded movements near the lava river.",
                entries: [
                    { time: "01:45", event: "Pyra and Kira are seen rowing across the river.", verified: true },
                    { time: "01:55", event: "Vault gate slammed shut.", verified: false }
                ],
                crossRefHint: "HINT: Pyra and Kira were out on the river."
            }
        },
        options: {
            who: ["Pyra", "Kira", "Zul"],
            how: [
                "Pushed the victim with an oar",
                "Shot an arrow from the hills",
                "Dropped the gate with a lever"
            ],
            why: [
                "To pay for broken boat repairs",
                "To purchase new heavy armor upgrades",
                "To steal the glowing red ruby"
            ]
        },
        correctAnswer: {
            who: "Zul",
            how: "Dropped the gate with a lever",
            why: "To steal the glowing red ruby"
        },
        explanation: {
            summary: "Zul pulled the heavy iron lever to drop the stone gate on Vorg and steal the glowing red ruby.",
            clueChain: [
                "The witness saw Zul flee with the ruby.",
                "The gate was dropped using an iron lever.",
                "Footprints were smeared with lever grease."
            ]
        },
        failureHint: "HINT: Look at who works with iron levers and has grease on their boots."
    },

    {
        id: 5,
        title: "THE ROPE BRIDGE",
        dimension: "nether",
        victim: "Cinder",
        location: "Magma River Crossing",
        time: "04:00 PM",
        status: "MURDER",
        difficulty: 2,
        synopsis: "Cinder fell from the high rope bridge. The fire amulet was taken from him.",
        suspects: [
            { id: "valka", name: "Valka", role: "Explorer", relation: "Rival", personality: "Always carries a long spear.", alibi: "I was mapping dark caves.", motive: "Wants fame from new discoveries.", avatarEmoji: "🗺️" },
            { id: "krag", name: "Krag", role: "Climber", relation: "Guide", personality: "Always carries a sharp flint knife.", alibi: "I was carving flint tools.", motive: "Wants the rare fire amulet.", avatarEmoji: "🔪" },
            { id: "thorne", name: "Thorne", role: "Sentry", relation: "Guard", personality: "Always carries an iron shield.", alibi: "I was guarding the gate.", motive: "Upset about guard shift hours.", avatarEmoji: "🛡️" }
        ],
        evidence: {
            blockPrints: {
                title: "FOOTPRINTS",
                icon: "👣",
                summary: "Bridge planks covered in flint shavings.",
                details: "Small grey flint chips from knife sharpening were left on the wooden bridge.",
                crossRefHint: "HINT: Who was carving flint tools?"
            },
            observerLog: {
                title: "CAMERA LOG",
                icon: "👁️",
                summary: "Camera captured a knife slicing the bridge rope.",
                details: [
                    { time: "03:55", event: "Figure uses a sharp flint knife to cut support ropes." }
                ],
                crossRefHint: "HINT: Match the flint knife on camera to the suspect."
            },
            chatLog: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "A message about the bridge ropes.",
                messages: [
                    { sender: "Krag", time: "03:10", text: "I will cut the bridge ropes to take the fire amulet." }
                ],
                crossRefHint: "HINT: Check who sent the message."
            },
            witness: {
                title: "WITNESS",
                icon: "📜",
                summary: "A scout saw Krag on the bridge post.",
                statement: "I saw Krag slicing the rope and snatching the fire amulet!",
                witnessName: "Lin",
                crossRefHint: "HINT: Trust the scout's witness testimony."
            },
            weapon: {
                title: "WEAPON",
                icon: "⚔️",
                summary: "A sharp flint knife stuck in the bridge post.",
                details: "The blade is sharp and has rope fibers on its edge.",
                weaponName: "Sharp Flint Knife",
                crossRefHint: "HINT: Which suspect carries a flint knife?"
            },
            roomLayout: {
                title: "LAYOUT",
                icon: "📐",
                summary: "Cleanly sliced bridge support rope.",
                layoutDesc: "The thick hemp rope was cut cleanly by a sharp blade.",
                floorplanHotspots: [
                    { name: "Cut Rope", x: 50, y: 50, note: "Sliced cleanly with a knife." }
                ],
                crossRefHint: "HINT: Look at the sliced rope end."
            },
            timeline: {
                title: "TIMELINE",
                icon: "⏳",
                summary: "Movements at the magma crossing.",
                entries: [
                    { time: "03:45", event: "Valka and Thorne are stationed at the main gate.", verified: true },
                    { time: "03:55", event: "Bridge rope is cut.", verified: false }
                ],
                crossRefHint: "HINT: Valka and Thorne were at the gate."
            }
        },
        options: {
            who: ["Valka", "Krag", "Thorne"],
            how: [
                "Pushed from dock with a spear",
                "Cut bridge ropes with a knife",
                "Blocked the path with a shield"
            ],
            why: [
                "To gain fame from cave maps",
                "To steal the rare fire amulet",
                "To protest long guard shift hours"
            ]
        },
        correctAnswer: {
            who: "Krag",
            how: "Cut bridge ropes with a knife",
            why: "To steal the rare fire amulet"
        },
        explanation: {
            summary: "Krag used his sharp flint knife to cut the bridge ropes, causing Cinder to fall so he could steal the fire amulet.",
            clueChain: [
                "The witness saw Krag cut the ropes.",
                "A sharp flint knife was left in the post.",
                "Flint shavings matched his carving alibi."
            ]
        },
        failureHint: "HINT: Look at who carries a sharp flint knife and carves tools."
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
        synopsis: "Jada was injured by an explosion. The ancient flame core was stolen.",
        suspects: [
            { id: "varren", name: "Varren", role: "Mason", relation: "Builder", personality: "Always carries a stone hammer.", alibi: "I was chipping basalt rock.", motive: "Wants money for stone blocks.", avatarEmoji: "🔨" },
            { id: "nari", name: "Nari", role: "Trader", relation: "Merchant", personality: "Always carries a silver scale.", alibi: "I was weighing trade items.", motive: "Argued over trade tax debts.", avatarEmoji: "⚖️" },
            { id: "solas", name: "Solas", role: "Alchemist", relation: "Neighbor", personality: "Always carries yellow explosive powder.", alibi: "I was mixing yellow powder.", motive: "Needs the core for experiments.", avatarEmoji: "💥" }
        ],
        evidence: {
            blockPrints: {
                title: "FOOTPRINTS",
                icon: "👣",
                summary: "Dusty boot tracks covered in yellow powder.",
                details: "Bright yellow sulfur powder residue was left around the doorway.",
                crossRefHint: "HINT: Who was mixing yellow explosive powder?"
            },
            observerLog: {
                title: "CAMERA LOG",
                icon: "👁️",
                summary: "Camera shows yellow powder placed at the door.",
                details: [
                    { time: "06:55", event: "Figure lays a bag of yellow powder by the shelter entrance." }
                ],
                crossRefHint: "HINT: Look at the yellow powder bag on camera."
            },
            chatLog: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "A note regarding the flame core.",
                messages: [
                    { sender: "Solas", time: "06:15", text: "My explosive yellow powder will blast the vault and give me the flame core." }
                ],
                crossRefHint: "HINT: Check Solas's note."
            },
            witness: {
                title: "WITNESS",
                icon: "📜",
                summary: "A merchant saw Solas ignite the powder.",
                statement: "I saw Solas light yellow powder and run away with the flame core!",
                witnessName: "Tuck",
                crossRefHint: "HINT: Trust the merchant's witness account."
            },
            weapon: {
                title: "WEAPON",
                icon: "⚔️",
                summary: "A scorched sack of yellow explosive powder.",
                details: "Remnants of yellow powder and a burnt fuse wire.",
                weaponName: "Yellow Explosive Powder",
                crossRefHint: "HINT: Who carries yellow explosive powder?"
            },
            roomLayout: {
                title: "LAYOUT",
                icon: "📐",
                summary: "The shelter door was blasted outward.",
                layoutDesc: "An explosive charge at the threshold blew the door open.",
                floorplanHotspots: [
                    { name: "Blown Doorway", x: 50, y: 85, note: "Scorched with yellow residue." }
                ],
                crossRefHint: "HINT: Check the scorched entrance."
            },
            timeline: {
                title: "TIMELINE",
                icon: "⏳",
                summary: "Market and shelter logs.",
                entries: [
                    { time: "06:45", event: "Varren and Nari are seen trading at the public market.", verified: true },
                    { time: "06:55", event: "Yellow powder detonates at shelter.", verified: false }
                ],
                crossRefHint: "HINT: Varren and Nari were at the market."
            }
        },
        options: {
            who: ["Varren", "Nari", "Solas"],
            how: [
                "Smashed the wall with a hammer",
                "Damaged the door with a scale",
                "Planted explosive yellow powder at doorway"
            ],
            why: [
                "To pay for heavy stone blocks",
                "To settle trade market tax debts",
                "To steal the ancient flame core"
            ]
        },
        correctAnswer: {
            who: "Solas",
            how: "Planted explosive yellow powder at doorway",
            why: "To steal the ancient flame core"
        },
        explanation: {
            summary: "Solas planted explosive yellow powder at the doorway to blow open the shelter and steal the ancient flame core.",
            clueChain: [
                "The witness saw Solas ignite the powder.",
                "Scorched yellow powder found at the entrance.",
                "Yellow powder traces matched his boot prints."
            ]
        },
        failureHint: "HINT: Look at who works with yellow explosive powder."
    },

    {
        id: 7,
        title: "THE SKY SPIRE",
        dimension: "end",
        victim: "Lyra",
        location: "High Sky Tower",
        time: "11:00 AM",
        status: "MURDER",
        difficulty: 3,
        synopsis: "Lyra was pushed from the high platform. The purple sky star is missing.",
        suspects: [
            { id: "brak", name: "Brak", role: "Guard", relation: "Tower Watch", personality: "Always carries a wooden baton.", alibi: "I was inspecting the stairs.", motive: "Wants money to buy armor.", avatarEmoji: "🪵" },
            { id: "nyx", name: "Nyx", role: "Glider", relation: "Messenger", personality: "Always carries flying cloth wings.", alibi: "I was flying between towers.", motive: "Wants the sky star trophy.", avatarEmoji: "🪽" },
            { id: "zane", name: "Zane", role: "Scholar", relation: "Colleague", personality: "Always carries an old telescope.", alibi: "I was studying distant clouds.", motive: "Angry over stolen research notes.", avatarEmoji: "🔭" }
        ],
        evidence: {
            blockPrints: {
                title: "FOOTPRINTS",
                icon: "👣",
                summary: "White feathers from flying cloth wings.",
                details: "Soft wing feathers were caught in the platform metal railings.",
                crossRefHint: "HINT: Who carries flying cloth wings?"
            },
            observerLog: {
                title: "CAMERA LOG",
                icon: "👁️",
                summary: "Camera shows a winged figure gliding from above.",
                details: [
                    { time: "10:55", event: "A person with cloth wings lands silently on the high platform." }
                ],
                crossRefHint: "HINT: Match the winged flyer on camera to the suspect."
            },
            chatLog: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "A message about the purple star.",
                messages: [
                    { sender: "Nyx", time: "10:20", text: "I will glide from the sky and steal that purple star." }
                ],
                crossRefHint: "HINT: Read Nyx's message."
            },
            witness: {
                title: "WITNESS",
                icon: "📜",
                summary: "An astronomer saw Nyx glide away with the star.",
                statement: "I saw Nyx glide off the platform holding the glowing purple star!",
                witnessName: "Omen",
                crossRefHint: "HINT: Trust the astronomer's testimony."
            },
            weapon: {
                title: "WEAPON",
                icon: "⚔️",
                summary: "A pair of flying cloth wings left on the rail.",
                details: "Lightweight gliding wings used to swoop down onto the tower.",
                weaponName: "Flying Cloth Wings",
                crossRefHint: "HINT: Who uses flying cloth wings?"
            },
            roomLayout: {
                title: "LAYOUT",
                icon: "📐",
                summary: "The platform has no stairs connecting to it.",
                layoutDesc: "The high platform is accessible only by gliding from above.",
                floorplanHotspots: [
                    { name: "High Balcony", x: 50, y: 25, note: "Accessible only by air." }
                ],
                crossRefHint: "HINT: The balcony is reachable only by gliding."
            },
            timeline: {
                title: "TIMELINE",
                icon: "⏳",
                summary: "Stairway and tower logs.",
                entries: [
                    { time: "10:45", event: "Brak and Zane are logged on the ground stairs.", verified: true },
                    { time: "10:55", event: "Glider lands on top platform.", verified: false }
                ],
                crossRefHint: "HINT: Brak and Zane were down on the ground stairs."
            }
        },
        options: {
            who: ["Brak", "Nyx", "Zane"],
            how: [
                "Hit victim with a wooden baton",
                "Dived from above using cloth wings",
                "Pushed victim with a heavy telescope"
            ],
            why: [
                "To buy expensive new tower armor",
                "To steal the purple sky star",
                "To reclaim stolen ancient research notes"
            ]
        },
        correctAnswer: {
            who: "Nyx",
            how: "Dived from above using cloth wings",
            why: "To steal the purple sky star"
        },
        explanation: {
            summary: "Nyx used flying cloth wings to swoop onto the isolated high platform and steal the purple sky star.",
            clueChain: [
                "The witness saw Nyx glide away with the star.",
                "Cloth wing feathers were left on the railing.",
                "The platform could only be reached from the sky."
            ]
        },
        failureHint: "HINT: Look at who uses cloth wings to fly between high towers."
    },

    {
        id: 8,
        title: "THE SKY SHIP",
        dimension: "end",
        victim: "Rex",
        location: "Docked Sky Airship",
        time: "01:00 PM",
        status: "MURDER",
        difficulty: 3,
        synopsis: "Rex was injured when the airship engine burst. The golden navigation compass was stolen.",
        suspects: [
            { id: "tuck", name: "Tuck", role: "Courier", relation: "Deckhand", personality: "Always carries a fruit crate.", alibi: "I was loading food crates.", motive: "Angry about crate loading pay.", avatarEmoji: "🍎" },
            { id: "maya", name: "Maya", role: "Pilot", relation: "Captain", personality: "Always carries metal rope shears.", alibi: "I was trimming ship sails.", motive: "Wants to control the fleet.", avatarEmoji: "✂️" },
            { id: "brak", name: "Brak", role: "Mechanic", relation: "Engineer", personality: "Always carries red fire crackers.", alibi: "I was testing red rockets.", motive: "Wants the golden compass.", avatarEmoji: "🧨" }
        ],
        evidence: {
            blockPrints: {
                title: "FOOTPRINTS",
                icon: "👣",
                summary: "Red paper wrappers found by the engine hatch.",
                details: "Small pieces of red fire cracker casings were dropped by the fuel chamber.",
                crossRefHint: "HINT: Who carries red fire crackers?"
            },
            observerLog: {
                title: "CAMERA LOG",
                icon: "👁️",
                summary: "Camera shows red fire crackers stuffed in the fuel tank.",
                details: [
                    { time: "12:55", event: "A mechanic inserts red fire crackers into the fuel box." }
                ],
                crossRefHint: "HINT: Look at the red fire crackers on camera."
            },
            chatLog: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "A message about the navigation compass.",
                messages: [
                    { sender: "Brak", time: "12:15", text: "I will blow the engine with fire crackers and grab the compass." }
                ],
                crossRefHint: "HINT: Read Brak's note."
            },
            witness: {
                title: "WITNESS",
                icon: "📜",
                summary: "A sailor saw Brak running with the compass.",
                statement: "I saw Brak run off the ship holding the golden compass right after the blast!",
                witnessName: "Sam",
                crossRefHint: "HINT: Trust the sailor's testimony."
            },
            weapon: {
                title: "WEAPON",
                icon: "⚔️",
                summary: "Burnt red fire crackers inside the engine.",
                details: "Red paper casings and gunpowder remnants from fire crackers.",
                weaponName: "Red Fire Crackers",
                crossRefHint: "HINT: Which suspect carries red fire crackers?"
            },
            roomLayout: {
                title: "LAYOUT",
                icon: "📐",
                summary: "The engine compartment was blown open from within.",
                layoutDesc: "Internal explosion caused by ignited fire crackers.",
                floorplanHotspots: [
                    { name: "Engine Tank", x: 50, y: 75, note: "Damaged by red fire crackers." }
                ],
                crossRefHint: "HINT: Inspect the damaged engine tank."
            },
            timeline: {
                title: "TIMELINE",
                icon: "⏳",
                summary: "Airship dock logs.",
                entries: [
                    { time: "12:45", event: "Tuck and Maya are seen on the front cargo deck.", verified: true },
                    { time: "12:55", event: "Engine explodes at the rear.", verified: false }
                ],
                crossRefHint: "HINT: Tuck and Maya were on the front cargo deck."
            }
        },
        options: {
            who: ["Tuck", "Maya", "Brak"],
            how: [
                "Dropped heavy food crates onto engine",
                "Cut fuel lines with metal shears",
                "Put red fire crackers inside engine"
            ],
            why: [
                "Over low food crate loading wages",
                "To gain control of the fleet",
                "To steal the golden navigation compass"
            ]
        },
        correctAnswer: {
            who: "Brak",
            how: "Put red fire crackers inside engine",
            why: "To steal the golden navigation compass"
        },
        explanation: {
            summary: "Brak placed red fire crackers into the fuel tank to blow up the engine and steal the golden navigation compass.",
            clueChain: [
                "The witness saw Brak run with the compass.",
                "Burnt red fire crackers were found in the engine.",
                "Red paper wrappers matched his rocket supplies."
            ]
        },
        failureHint: "HINT: Look at who carries red fire crackers and works on engines."
    },

    {
        id: 9,
        title: "THE CRYSTAL ROOM",
        dimension: "end",
        victim: "Nora",
        location: "Sacred Glass Altar",
        time: "05:00 PM",
        status: "MURDER",
        difficulty: 3,
        synopsis: "Nora was blinded by a heat ray. The sacred white crystal was taken.",
        suspects: [
            { id: "omen", name: "Omen", role: "Archivist", relation: "Librarian", personality: "Always carries heavy ancient books.", alibi: "I was reading library scrolls.", motive: "Upset about damaged old books.", avatarEmoji: "📖" },
            { id: "vesper", name: "Vesper", role: "Priest", relation: "Temple Leader", personality: "Always carries a polished glass mirror.", alibi: "I was aligning temple mirrors.", motive: "Wants the white crystal power.", avatarEmoji: "🪞" },
            { id: "mira", name: "Mira", role: "Messenger", relation: "Courier", personality: "Always carries a silver bell.", alibi: "I was ringing evening bells.", motive: "Wants gold to travel abroad.", avatarEmoji: "🔔" }
        ],
        evidence: {
            blockPrints: {
                title: "FOOTPRINTS",
                icon: "👣",
                summary: "Polished glass dust on altar steps.",
                details: "Fine glass polishing powder was brushed across the marble altar floor.",
                crossRefHint: "HINT: Who carries a polished glass mirror?"
            },
            observerLog: {
                title: "CAMERA LOG",
                icon: "👁️",
                summary: "Camera captured a mirror directing a sun ray.",
                details: [
                    { time: "04:55", event: "Figure aims a handheld glass mirror toward the central altar." }
                ],
                crossRefHint: "HINT: Match the mirror on camera to the priest."
            },
            chatLog: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "A message about the sun ray.",
                messages: [
                    { sender: "Vesper", time: "04:15", text: "I will direct the sun beam with my mirror to take the crystal." }
                ],
                crossRefHint: "HINT: Check Vesper's message."
            },
            witness: {
                title: "WITNESS",
                icon: "📜",
                summary: "A monk saw Vesper leave with the crystal.",
                statement: "I saw Vesper flee the temple holding the glowing white crystal!",
                witnessName: "Garth",
                crossRefHint: "HINT: Trust the monk's witness report."
            },
            weapon: {
                title: "WEAPON",
                icon: "⚔️",
                summary: "A polished glass mirror mounted on a stand.",
                details: "A concave glass mirror used to focus intense sunlight.",
                weaponName: "Polished Glass Mirror",
                crossRefHint: "HINT: Who carries a glass mirror?"
            },
            roomLayout: {
                title: "LAYOUT",
                icon: "📐",
                summary: "Focused beam line from pillar to altar.",
                layoutDesc: "The beam was reflected from the mirror stand directly onto the altar.",
                floorplanHotspots: [
                    { name: "Mirror Stand", x: 40, y: 60, note: "Aimed at the altar." }
                ],
                crossRefHint: "HINT: Look at the mirror angle."
            },
            timeline: {
                title: "TIMELINE",
                icon: "⏳",
                summary: "Temple visitor records.",
                entries: [
                    { time: "04:40", event: "Omen and Mira are seen together in the library.", verified: true },
                    { time: "04:55", event: "Sunlight beam focuses on the altar.", verified: false }
                ],
                crossRefHint: "HINT: Omen and Mira were in the library."
            }
        },
        options: {
            who: ["Omen", "Vesper", "Mira"],
            how: [
                "Struck victim with heavy ancient books",
                "Aimed sun rays with a mirror",
                "Distracted victim with a silver bell"
            ],
            why: [
                "Over damaged ancient temple library scrolls",
                "To steal the sacred white crystal",
                "To buy tickets to travel abroad"
            ]
        },
        correctAnswer: {
            who: "Vesper",
            how: "Aimed sun rays with a mirror",
            why: "To steal the sacred white crystal"
        },
        explanation: {
            summary: "Vesper used a polished glass mirror to focus sun rays on Nora, allowing him to steal the sacred white crystal.",
            clueChain: [
                "The witness saw Vesper flee with the crystal.",
                "A polished glass mirror was found on the stand.",
                "Glass dust matched his mirror polishing alibi."
            ]
        },
        failureHint: "HINT: Look at who works with mirrors and understands optical reflection."
    },

    {
        id: 10,
        title: "THE DEEP CHAMBER",
        dimension: "deepdark",
        victim: "Leo",
        location: "Underground Echo Chamber",
        time: "11:30 PM",
        status: "MURDER",
        difficulty: 3,
        synopsis: "Leo was knocked out by a sonic vibration. The legendary master key was taken.",
        suspects: [
            { id: "solas", name: "Solas", role: "Explorer", relation: "Rival", personality: "Always carries a fire torch.", alibi: "I was lighting dark tunnels.", motive: "Wants to find cave treasures.", avatarEmoji: "🔥" },
            { id: "garth", name: "Garth", role: "Miner", relation: "Partner", personality: "Always carries a stone pickaxe.", alibi: "I was mining blue rocks.", motive: "Wants to pay mining debts.", avatarEmoji: "⛏️" },
            { id: "vesper", name: "Vesper", role: "Scholar", relation: "Historian", personality: "Always carries a silver tuning fork.", alibi: "I was studying cave sounds.", motive: "Wants the master key secret.", avatarEmoji: "🎵" },
            { id: "nyx", name: "Nyx", role: "Scout", relation: "Guide", personality: "Always carries a leather whip.", alibi: "I was scouting monster dens.", motive: "Wants money for cave gear.", avatarEmoji: "🧗" }
        ],
        evidence: {
            blockPrints: {
                title: "FOOTPRINTS",
                icon: "👣",
                summary: "Silver metal dust by the acoustic pillar.",
                details: "Silver metal filings and vibration marks were left on the stone pillar.",
                crossRefHint: "HINT: Who carries a silver tuning fork?"
            },
            observerLog: {
                title: "CAMERA LOG",
                icon: "👁️",
                summary: "Camera shows someone striking the giant sonic bell.",
                details: [
                    { time: "11:25", event: "Figure strikes the acoustic sound pillar with a silver tuning fork." }
                ],
                crossRefHint: "HINT: Look at the tuning fork on camera."
            },
            chatLog: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "A note about the sonic wave.",
                messages: [
                    { sender: "Vesper", time: "11:00", text: "Striking the acoustic bell with my tuning fork will stun Leo and unlock the master key." }
                ],
                crossRefHint: "HINT: Read Vesper's plan in the note."
            },
            witness: {
                title: "WITNESS",
                icon: "📜",
                summary: "A cave scout saw Vesper pocket the master key.",
                statement: "I saw Vesper take the master key and sprint into the dark tunnel!",
                witnessName: "Tuck",
                crossRefHint: "HINT: Trust the scout's testimony."
            },
            weapon: {
                title: "WEAPON",
                icon: "⚔️",
                summary: "A silver tuning fork left on the pillar.",
                details: "A tuning fork vibrating at the exact frequency of the echo chamber.",
                weaponName: "Silver Tuning Fork",
                crossRefHint: "HINT: Which suspect carries a tuning fork?"
            },
            roomLayout: {
                title: "LAYOUT",
                icon: "📐",
                summary: "Sound waves reverberated across the chamber.",
                layoutDesc: "The acoustic bell focused a powerful sonic wave straight at the pedestal.",
                floorplanHotspots: [
                    { name: "Acoustic Bell", x: 50, y: 35, note: "Struck with a tuning fork." }
                ],
                crossRefHint: "HINT: Examine the acoustic sound pillar."
            },
            timeline: {
                title: "TIMELINE",
                icon: "⏳",
                summary: "Underground base camp logs.",
                entries: [
                    { time: "11:15", event: "Solas, Garth, and Nyx are logged at the base camp.", verified: true },
                    { time: "11:25", event: "Sonic blast reverberates through the cave.", verified: false }
                ],
                crossRefHint: "HINT: Solas, Garth, and Nyx were at base camp."
            }
        },
        options: {
            who: ["Solas", "Garth", "Vesper", "Nyx"],
            how: [
                "Burned the chamber with a torch",
                "Smashed the door with a pickaxe",
                "Struck sonic bell with tuning fork",
                "Struck the pillars with a whip"
            ],
            why: [
                "To discover secret ancient cave treasures",
                "To pay off heavy mining debts",
                "To steal the legendary master key",
                "To purchase new dark cave gear"
            ]
        },
        correctAnswer: {
            who: "Vesper",
            how: "Struck sonic bell with tuning fork",
            why: "To steal the legendary master key"
        },
        explanation: {
            summary: "Vesper used a silver tuning fork on the acoustic bell to trigger a sonic wave that stunned Leo, allowing him to steal the master key.",
            clueChain: [
                "The witness saw Vesper take the master key.",
                "A silver tuning fork was left on the pillar.",
                "Silver metal dust matched his tuning fork."
            ]
        },
        failureHint: "HINT: Look at who studies cave sounds and carries a silver tuning fork."
    }
];

function getCaseById(id) {
    const numId = parseInt(id, 10);
    return CASES.find(c => c.id === numId) || null;
}

function getAllCases() {
    return CASES;
}
