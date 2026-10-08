/**
 * CASE: AARNA - Master Case Database
 * 10 Brand New Mystery Cases for the Aarna Investigation Bureau.
 * Features balanced options, strict 3-clue evidence structures, and progressive deduction.
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
            { id: "garth", name: "Garth", role: "Woodcutter", relation: "Neighbor", personality: "Carries a heavy wooden axe.", alibi: "I was chopping pine trees.", motive: "Needs gold for new tools." },
            { id: "lin", name: "Lin", role: "Farmer", relation: "Friend", personality: "Carries a metal shovel.", alibi: "I was planting wheat seeds.", motive: "Angry about the land taxes." },
            { id: "sam", name: "Sam", role: "Guard", relation: "Security", personality: "Carries a long rope.", alibi: "I was sleeping at home.", motive: "No known motive at all." }
        ],
        evidence: {
            clue1: { 
                title: "FOOTPRINTS", 
                icon: "👣", 
                summary: "Deep boot prints with pine needles.", 
                details: "Fresh mud and pine needles were found on the floor.", 
                crossRefHint: "HINT: Match the pine needles to the suspect's alibi." 
            },
            clue2: { 
                title: "WEAPON", 
                icon: "⚔️", 
                summary: "A heavy wooden axe.", 
                details: "The wooden axe is covered in fresh splinters.", 
                weaponName: "Wooden Axe", 
                crossRefHint: "HINT: Which suspect carries an axe?" 
            },
            clue3: { 
                title: "CHAT LOG", 
                icon: "💬", 
                summary: "A dropped note about stealing.", 
                messages: [{ sender: "Garth", time: "05:00", text: "I will use my axe to get that gold." }], 
                crossRefHint: "HINT: Read the sender's name on the note." 
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
            { id: "clara", name: "Clara", role: "Baker", relation: "Partner", personality: "Carries a heavy rolling pin.", alibi: "I was baking sweet bread.", motive: "Upset about high flour prices." },
            { id: "tuck", name: "Tuck", role: "Carpenter", relation: "Friend", personality: "Carries a sharp metal saw.", alibi: "I was cutting cedar planks.", motive: "Argued over wooden mill parts." },
            { id: "finn", name: "Finn", role: "Gardener", relation: "Neighbor", personality: "Carries toxic green plant poison.", alibi: "I was spraying rose bushes.", motive: "Wants money for rare seeds." }
        ],
        evidence: {
            clue1: {
                title: "FOOTPRINTS",
                icon: "👣",
                summary: "Shoe prints smelling of rose bushes.",
                details: "Wet garden soil smelling of rose spray was tracked inside.",
                crossRefHint: "HINT: Match the rose scent to the suspect."
            },
            clue2: {
                title: "WEAPON",
                icon: "🧪",
                summary: "A broken green poison bottle.",
                details: "A shattered flask containing lethal green pesticide.",
                weaponName: "Green Poison Bottle",
                crossRefHint: "HINT: Who carries green plant poison?"
            },
            clue3: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "A written note about poison.",
                messages: [{ sender: "Finn", time: "07:30", text: "I will spray poison and take the glowing shard." }],
                crossRefHint: "HINT: Read the sender's name on the note."
            }
        },
        options: {
            who: ["Clara", "Tuck", "Finn"],
            how: ["Threw toxic poison through the window", "Struck the victim with a pin", "Cut the gears with a saw"],
            why: ["To steal the second glowing shard", "To protest the high flour prices", "To settle a wooden mill dispute"]
        },
        correctAnswer: {
            who: "Finn",
            how: "Threw toxic poison through the window",
            why: "To steal the second glowing shard"
        },
        explanation: {
            summary: "Finn threw green plant poison through the window to knock out Milo and steal the second Aarna Shard.",
            clueChain: ["The shoe prints smelled of rose spray.", "Shattered green poison flask on the floor.", "Dropped note outlined the poison attack."]
        },
        failureHint: "HINT: Look at who carries green plant poison and sprays rose bushes."
    },

    {
        id: 3,
        title: "THE LIGHTNING TOWER",
        dimension: "fortress",
        victim: "Bruno",
        location: "Stone Watchtower",
        time: "10:00 PM",
        status: "MURDER",
        difficulty: 1,
        synopsis: "Bruno was struck by lightning in the tower. The third Aarna Shard is missing.",
        suspects: [
            { id: "tara", name: "Tara", role: "Stonemason", relation: "Builder", personality: "Carries a heavy iron chisel.", alibi: "I was carving granite stones.", motive: "Upset about unpaid building fees." },
            { id: "vance", name: "Vance", role: "Electrician", relation: "Technician", personality: "Carries a long copper wire.", alibi: "I was stripping copper cables.", motive: "Needs power for his generator." },
            { id: "cole", name: "Cole", role: "Courier", relation: "Delivery", personality: "Carries a leather postal pouch.", alibi: "I was resting by campfire.", motive: "Wants money for travel expenses." }
        ],
        evidence: {
            clue1: {
                title: "FOOTPRINTS",
                icon: "👣",
                summary: "Tracks covered in copper clippings.",
                details: "Orange copper wire fragments were embedded in the muddy steps.",
                crossRefHint: "HINT: Match the copper fragments to the alibi."
            },
            clue2: {
                title: "WEAPON",
                icon: "⚡",
                summary: "A scorched long copper wire.",
                details: "A copper wire tied between the roof rod and the victim's vault.",
                weaponName: "Long Copper Wire",
                crossRefHint: "HINT: Who carries copper wire?"
            },
            clue3: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "A dropped note about electricity.",
                messages: [{ sender: "Vance", time: "09:15", text: "I can channel lightning through copper wire to take the shard." }],
                crossRefHint: "HINT: Read Vance's plan in the note."
            }
        },
        options: {
            who: ["Tara", "Vance", "Cole"],
            how: ["Channeled lightning with a copper wire", "Smashed the wall with a chisel", "Snagged the lock with a pouch"],
            why: ["To steal the third ancient shard", "To demand unpaid stone building fees", "To pay for expensive travel costs"]
        },
        correctAnswer: {
            who: "Vance",
            how: "Channeled lightning with a copper wire",
            why: "To steal the third ancient shard"
        },
        explanation: {
            summary: "Vance connected copper wire to the lightning rod to direct lightning into the vault and steal the third shard.",
            clueChain: ["Copper clippings matched his work alibi.", "Burnt copper wire tied to the roof rod.", "Dropped note detailed the lightning plan."]
        },
        failureHint: "HINT: Look at who works with copper wire and understands electrical circuits."
    },

    {
        id: 4,
        title: "THE LAVA GATE",
        dimension: "caverns",
        victim: "Vorg",
        location: "Lava Chamber",
        time: "02:00 PM",
        status: "MURDER",
        difficulty: 2,
        synopsis: "Vorg was crushed under the heavy stone gate. The fourth Aarna Shard is missing.",
        suspects: [
            { id: "pyra", name: "Pyra", role: "Pilot", relation: "Transporter", personality: "Carries a long wooden oar.", alibi: "I was steering the lava boat.", motive: "Needs gold to repair boat." },
            { id: "kira", name: "Kira", role: "Scout", relation: "Guard", personality: "Carries a heavy steel crossbow.", alibi: "I was scouting distant ridges.", motive: "Wants to purchase better armor." },
            { id: "zul", name: "Zul", role: "Operator", relation: "Coworker", personality: "Carries an oily iron lever.", alibi: "I was greasing iron levers.", motive: "Wants the shard for power." }
        ],
        evidence: {
            clue1: {
                title: "FOOTPRINTS",
                icon: "👣",
                summary: "Boot prints slick with lever grease.",
                details: "Black gear lubricant was tracked from the switch to the door.",
                crossRefHint: "HINT: Who works with lever grease?"
            },
            clue2: {
                title: "WEAPON",
                icon: "⚙️",
                summary: "An oily heavy iron lever.",
                details: "An iron lever pulled down to drop the massive stone gate.",
                weaponName: "Heavy Iron Lever",
                crossRefHint: "HINT: Which suspect carries iron levers?"
            },
            clue3: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "A dropped note about the gate.",
                messages: [{ sender: "Zul", time: "01:20", text: "I will pull the gate lever and grab the fourth shard." }],
                crossRefHint: "HINT: Check the name on the message."
            }
        },
        options: {
            who: ["Pyra", "Kira", "Zul"],
            how: ["Dropped the gate with a lever", "Pushed the victim with an oar", "Fired a bolt from the ridges"],
            why: ["To steal the fourth powerful shard", "To pay for broken boat repairs", "To purchase expensive heavy body armor"]
        },
        correctAnswer: {
            who: "Zul",
            how: "Dropped the gate with a lever",
            why: "To steal the fourth powerful shard"
        },
        explanation: {
            summary: "Zul pulled the heavy iron lever to drop the stone gate on Vorg and steal the fourth Aarna Shard.",
            clueChain: ["Black lever grease on boot prints.", "Oily iron lever left at the switch.", "Message outlined dropping the gate."]
        },
        failureHint: "HINT: Look at who carries iron levers and has grease on their boots."
    },

    {
        id: 5,
        title: "THE ROPE BRIDGE",
        dimension: "magma",
        victim: "Cinder",
        location: "Canyon Crossing",
        time: "04:00 PM",
        status: "MURDER",
        difficulty: 2,
        synopsis: "Cinder fell when the rope bridge was sliced. The fifth Aarna Shard is missing.",
        suspects: [
            { id: "valka", name: "Valka", role: "Explorer", relation: "Rival", personality: "Carries a long metal spear.", alibi: "I was mapping dark tunnels.", motive: "Wants fame from new maps." },
            { id: "krag", name: "Krag", role: "Climber", relation: "Guide", personality: "Carries a sharp flint knife.", alibi: "I was carving flint tools.", motive: "Wants the valuable ancient shard." },
            { id: "thorne", name: "Thorne", role: "Sentry", relation: "Guard", personality: "Carries a heavy iron shield.", alibi: "I was guarding the gate.", motive: "Upset about long guard shifts." }
        ],
        evidence: {
            clue1: {
                title: "FOOTPRINTS",
                icon: "👣",
                summary: "Bridge planks covered in flint shavings.",
                details: "Small grey flint chips from knife carving were left on the wooden planks.",
                crossRefHint: "HINT: Match the flint shavings to the suspect."
            },
            clue2: {
                title: "WEAPON",
                icon: "🔪",
                summary: "A sharp flint carving knife.",
                details: "A keen flint knife covered in frayed hemp rope strands.",
                weaponName: "Sharp Flint Knife",
                crossRefHint: "HINT: Who carries a flint knife?"
            },
            clue3: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "A dropped note about cutting rope.",
                messages: [{ sender: "Krag", time: "03:30", text: "I will cut the bridge ropes to take the fifth shard." }],
                crossRefHint: "HINT: Read the sender's plan in the note."
            }
        },
        options: {
            who: ["Valka", "Krag", "Thorne"],
            how: ["Cut bridge ropes with a knife", "Pushed from cliff with a spear", "Blocked the exit with a shield"],
            why: ["To steal the fifth ancient shard", "To gain fame from cave maps", "To protest unfair long guard shifts"]
        },
        correctAnswer: {
            who: "Krag",
            how: "Cut bridge ropes with a knife",
            why: "To steal the fifth ancient shard"
        },
        explanation: {
            summary: "Krag used his sharp flint knife to cut the bridge ropes, causing Cinder to fall so he could take the fifth shard.",
            clueChain: ["Flint shavings matched his carving alibi.", "Flint knife left with cut rope fibers.", "Note described cutting the bridge ropes."]
        },
        failureHint: "HINT: Look at who carries a sharp flint knife and carves stone tools."
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
            { id: "varren", name: "Varren", role: "Mason", relation: "Builder", personality: "Carries a heavy stone hammer.", alibi: "I was chipping basalt rock.", motive: "Needs money for building stones." },
            { id: "nari", name: "Nari", role: "Trader", relation: "Merchant", personality: "Carries a silver balance scale.", alibi: "I was weighing trade items.", motive: "Argued over unpaid market taxes." },
            { id: "solas", name: "Solas", role: "Alchemist", relation: "Neighbor", personality: "Carries yellow explosive sulfur powder.", alibi: "I was mixing sulfur powder.", motive: "Needs the shard for alchemy." }
        ],
        evidence: {
            clue1: {
                title: "FOOTPRINTS",
                icon: "👣",
                summary: "Yellow sulfur powder on doorway.",
                details: "Bright yellow sulfur dust was tracked across the stone threshold.",
                crossRefHint: "HINT: Who was mixing yellow sulfur powder?"
            },
            clue2: {
                title: "WEAPON",
                icon: "💥",
                summary: "A pouch of yellow sulfur powder.",
                details: "A scorched cloth pouch containing explosive sulfur powder remnants.",
                weaponName: "Yellow Sulfur Powder",
                crossRefHint: "HINT: Which suspect carries sulfur powder?"
            },
            clue3: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "A dropped note about an explosion.",
                messages: [{ sender: "Solas", time: "06:30", text: "My explosive sulfur will blast the door so I can take the shard." }],
                crossRefHint: "HINT: Read Solas's message."
            }
        },
        options: {
            who: ["Varren", "Nari", "Solas"],
            how: ["Detonated yellow powder at the door", "Smashed the vault with a hammer", "Forced the latch with a scale"],
            why: ["To steal the sixth glowing shard", "To pay for heavy basalt blocks", "To collect unpaid trade market taxes"]
        },
        correctAnswer: {
            who: "Solas",
            how: "Detonated yellow powder at the door",
            why: "To steal the sixth glowing shard"
        },
        explanation: {
            summary: "Solas placed explosive yellow sulfur powder at the doorway to blow open the shelter and steal the sixth shard.",
            clueChain: ["Yellow sulfur dust in footprints.", "Scorched sulfur pouch at the entrance.", "Note outlined blasting the shelter door."]
        },
        failureHint: "HINT: Look at who works with yellow explosive sulfur powder."
    },

    {
        id: 7,
        title: "THE SKY SPIRE",
        dimension: "sky",
        victim: "Lyra",
        location: "High Sky Spire",
        time: "11:00 AM",
        status: "MURDER",
        difficulty: 3,
        synopsis: "Lyra was attacked on the isolated high balcony. The seventh Aarna Shard is missing.",
        suspects: [
            { id: "brak", name: "Brak", role: "Guard", relation: "Tower Watch", personality: "Carries a heavy wooden baton.", alibi: "I was patrolling ground stairs.", motive: "Wants money for armor upgrades." },
            { id: "nyx", name: "Nyx", role: "Glider", relation: "Messenger", personality: "Carries flying white cloth wings.", alibi: "I was gliding between towers.", motive: "Wants the shard as trophy." },
            { id: "zane", name: "Zane", role: "Scholar", relation: "Colleague", personality: "Carries a long brass telescope.", alibi: "I was observing the clouds.", motive: "Angry over stolen research scrolls." }
        ],
        evidence: {
            clue1: {
                title: "FOOTPRINTS",
                icon: "👣",
                summary: "White feathers caught on railings.",
                details: "Soft white wing feathers were snagged in the isolated balcony rails.",
                crossRefHint: "HINT: Who carries flying white cloth wings?"
            },
            clue2: {
                title: "WEAPON",
                icon: "🪽",
                summary: "A pair of white cloth wings.",
                details: "Gliding cloth wings used to dive onto the stairs-free platform.",
                weaponName: "Flying Cloth Wings",
                crossRefHint: "HINT: Which suspect glides with cloth wings?"
            },
            clue3: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "A dropped note about flying.",
                messages: [{ sender: "Nyx", time: "10:30", text: "I will glide from the sky and steal the seventh shard." }],
                crossRefHint: "HINT: Read the sender on the flight note."
            }
        },
        options: {
            who: ["Brak", "Nyx", "Zane"],
            how: ["Dived from above using cloth wings", "Struck the victim with a baton", "Pushed the victim with a telescope"],
            why: ["To steal the seventh sky shard", "To pay for heavy tower armor", "To recover stolen ancient research scrolls"]
        },
        correctAnswer: {
            who: "Nyx",
            how: "Dived from above using cloth wings",
            why: "To steal the seventh sky shard"
        },
        explanation: {
            summary: "Nyx used flying cloth wings to swoop down onto the isolated high platform and steal the seventh shard.",
            clueChain: ["White feathers caught on railing.", "Cloth wings found abandoned on platform.", "Message proved the aerial heist plan."]
        },
        failureHint: "HINT: Look at who uses cloth wings to glide between high towers."
    },

    {
        id: 8,
        title: "THE SKY SHIP",
        dimension: "sky",
        victim: "Rex",
        location: "Docked Airship",
        time: "01:00 PM",
        status: "MURDER",
        difficulty: 3,
        synopsis: "Rex was injured when the airship engine burst. The eighth Aarna Shard is missing.",
        suspects: [
            { id: "tuck", name: "Tuck", role: "Courier", relation: "Deckhand", personality: "Carries heavy wooden cargo crates.", alibi: "I was loading food crates.", motive: "Upset about low loading pay." },
            { id: "maya", name: "Maya", role: "Pilot", relation: "Captain", personality: "Carries sharp metal rope shears.", alibi: "I was trimming sail ropes.", motive: "Wants total control of airship." },
            { id: "brak", name: "Brak", role: "Mechanic", relation: "Engineer", personality: "Carries explosive red fire crackers.", alibi: "I was testing red rockets.", motive: "Wants the valuable ancient shard." }
        ],
        evidence: {
            clue1: {
                title: "FOOTPRINTS",
                icon: "👣",
                summary: "Red paper wrappers by engine.",
                details: "Burnt red paper casings from fire crackers were scattered near the hatch.",
                crossRefHint: "HINT: Match red wrappers to the suspect."
            },
            clue2: {
                title: "WEAPON",
                icon: "🧨",
                summary: "Explosive red fire crackers.",
                details: "Burnt fire crackers jammed directly inside the fuel tank.",
                weaponName: "Red Fire Crackers",
                crossRefHint: "HINT: Who carries red fire crackers?"
            },
            clue3: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "A dropped note about airship.",
                messages: [{ sender: "Brak", time: "12:30", text: "I will blow the engine with fire crackers and grab the shard." }],
                crossRefHint: "HINT: Read Brak's plan in the note."
            }
        },
        options: {
            who: ["Tuck", "Maya", "Brak"],
            how: ["Put red fire crackers inside engine", "Dropped heavy cargo crates onto engine", "Cut the fuel lines using shears"],
            why: ["To steal the eighth ancient shard", "To protest low cargo loading wages", "To seize full control of airship"]
        },
        correctAnswer: {
            who: "Brak",
            how: "Put red fire crackers inside engine",
            why: "To steal the eighth ancient shard"
        },
        explanation: {
            summary: "Brak stuffed red fire crackers into the fuel tank to blow up the engine and steal the eighth shard.",
            clueChain: ["Red paper casings matched his rocket supplies.", "Burnt fire crackers found in fuel tank.", "Dropped note detailed the engine sabotage."]
        },
        failureHint: "HINT: Look at who carries red fire crackers and works on engines."
    },

    {
        id: 9,
        title: "THE CRYSTAL ROOM",
        dimension: "temple",
        victim: "Nora",
        location: "Sacred Glass Altar",
        time: "05:00 PM",
        status: "MURDER",
        difficulty: 3,
        synopsis: "Nora was blinded by focused sun rays. The ninth Aarna Shard is missing.",
        suspects: [
            { id: "omen", name: "Omen", role: "Archivist", relation: "Librarian", personality: "Carries heavy ancient leather books.", alibi: "I was reading library scrolls.", motive: "Upset about damaged old books." },
            { id: "vesper", name: "Vesper", role: "Priest", relation: "Temple Leader", personality: "Carries a polished glass mirror.", alibi: "I was cleaning temple mirrors.", motive: "Wants the ninth shard power." },
            { id: "mira", name: "Mira", role: "Messenger", relation: "Courier", personality: "Carries a ringing silver bell.", alibi: "I was ringing evening bells.", motive: "Needs money to travel abroad." }
        ],
        evidence: {
            clue1: {
                title: "FOOTPRINTS",
                icon: "👣",
                summary: "Glass polishing dust on steps.",
                details: "Fine white glass polishing residue was smeared on the altar steps.",
                crossRefHint: "HINT: Who was cleaning glass mirrors?"
            },
            clue2: {
                title: "WEAPON",
                icon: "🪞",
                summary: "A polished concave glass mirror.",
                details: "A curved mirror positioned on a stand to focus sun rays on the altar.",
                weaponName: "Polished Glass Mirror",
                crossRefHint: "HINT: Which suspect carries a glass mirror?"
            },
            clue3: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "A dropped note about sun ray.",
                messages: [{ sender: "Vesper", time: "04:30", text: "I will focus the sun beam with my mirror to take the shard." }],
                crossRefHint: "HINT: Read Vesper's message."
            }
        },
        options: {
            who: ["Omen", "Vesper", "Mira"],
            how: ["Aimed focused sun rays with mirror", "Struck the victim with heavy books", "Distracted the victim with silver bell"],
            why: ["To steal the ninth sacred shard", "To protect damaged ancient library scrolls", "To fund expensive foreign travel tickets"]
        },
        correctAnswer: {
            who: "Vesper",
            how: "Aimed focused sun rays with mirror",
            why: "To steal the ninth sacred shard"
        },
        explanation: {
            summary: "Vesper used a polished concave glass mirror to focus sun rays on Nora, allowing him to steal the ninth shard.",
            clueChain: ["White glass dust matched mirror polishing.", "Concave mirror mounted on focusing stand.", "Note proved the sun beam plan."]
        },
        failureHint: "HINT: Look at who works with mirrors and understands optical reflection."
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
            { id: "solas", name: "Solas", role: "Explorer", relation: "Rival", personality: "Carries a bright flame torch.", alibi: "I was lighting dark tunnels.", motive: "Wants to find cave relics." },
            { id: "garth", name: "Garth", role: "Miner", relation: "Partner", personality: "Carries a heavy iron pickaxe.", alibi: "I was mining blue crystals.", motive: "Wants to pay mining debts." },
            { id: "vesper", name: "Vesper", role: "Mastermind", relation: "Shadow Leader", personality: "Carries a silver tuning fork.", alibi: "I was studying cave acoustics.", motive: "Wants to trigger Aarna Singularity." },
            { id: "nyx", name: "Nyx", role: "Scout", relation: "Guide", personality: "Carries a long leather whip.", alibi: "I was exploring monster dens.", motive: "Wants money for cave supplies." }
        ],
        evidence: {
            clue1: {
                title: "FOOTPRINTS",
                icon: "👣",
                summary: "Silver filings near acoustic bell.",
                details: "Silver metal filings from a tuning fork were left on the sonic pedestal.",
                crossRefHint: "HINT: Who carries a silver tuning fork?"
            },
            clue2: {
                title: "WEAPON",
                icon: "🎵",
                summary: "A vibrating silver tuning fork.",
                details: "A silver tuning fork tuned to resonate with the ancient sonic bell.",
                weaponName: "Silver Tuning Fork",
                crossRefHint: "HINT: Which suspect carries a tuning fork?"
            },
            clue3: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "A dropped note about Singularity.",
                messages: [{ sender: "Vesper", time: "11:00", text: "Striking the acoustic bell will stun Leo so I can assemble the Aarna Singularity." }],
                crossRefHint: "HINT: Read Vesper's master plan."
            }
        },
        options: {
            who: ["Solas", "Garth", "Vesper", "Nyx"],
            how: ["Struck sonic bell with tuning fork", "Burned the chamber with a torch", "Smashed the gate with a pickaxe", "Lashed the pillars with a whip"],
            why: ["To assemble the ultimate Aarna Singularity", "To uncover secret ancient cave relics", "To pay off heavy mining debts", "To purchase expensive underground cave supplies"]
        },
        correctAnswer: {
            who: "Vesper",
            how: "Struck sonic bell with tuning fork",
            why: "To assemble the ultimate Aarna Singularity"
        },
        explanation: {
            summary: "Vesper struck the giant acoustic bell with his silver tuning fork to incapacitate Leo and seize all shards to assemble the Aarna Singularity.",
            clueChain: ["Silver filings matched tuning fork.", "Tuning fork left on sonic pedestal.", "Dropped note revealed the Aarna Singularity plot."]
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
