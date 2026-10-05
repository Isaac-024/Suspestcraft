/**
 * CASE: ABHEDYA — DATA-DRIVEN CASE DATABASE (js/cases.js)
 * 10-Level Cozy Mystery Engine with Clean, Punchy, Capitalized Clues & Intuitive Matching Logic.
 * Accessible for casual players and non-gamers with zero jargon.
 */

const CASES = [
    // =========================================================================
    // CASE 01 — THE SILENT VILLAGE (OVERWORLD)
    // =========================================================================
    {
        id: 1,
        title: "THE SILENT VILLAGE",
        dimension: "overworld",
        victim: "Elder Eldred the Librarian",
        location: "Cozy Village Library",
        time: "23:47",
        status: "MURDER",
        difficulty: 1,

        synopsis: "Elder Eldred was crushed by a falling anvil inside the library. The Ancient Emerald Shard was stolen from his desk.",

        suspects: [
            {
                id: "durand",
                name: "Durand the Blacksmith",
                role: "Village Blacksmith",
                relation: "Neighbor",
                personality: "Strong blacksmith who owns a heavy iron anvil.",
                alibi: "I was in my workshop.",
                motive: "Wanted the Ancient Emerald Shard.",
                avatarEmoji: "⚒️"
            },
            {
                id: "steve",
                name: "Steve the Woodcutter",
                role: "Village Woodcutter",
                relation: "Library Visitor",
                personality: "Carries a wooden axe.",
                alibi: "I was at the tavern with Alex.",
                motive: "Had no reason to attack Eldred.",
                avatarEmoji: "🪓"
            },
            {
                id: "alex",
                name: "Alex the Guard",
                role: "Village Guard",
                relation: "First Responder",
                personality: "Carries a wooden bow and protects the village.",
                alibi: "I was at the tavern with Steve.",
                motive: "Had no reason to attack Eldred.",
                avatarEmoji: "🏹"
            }
        ],

        evidence: {

            blockPrints: {
                title: "BLOCK PRINTS",
                icon: "👣",
                summary: "Boot prints marked with the letter 'D' were found on the library roof.",
                details: "The prints match Durand's boots.",
                crossRefHint: "The 'D' prints match DURAND."
            },

            observerLog: {
                title: "OBSERVER LOG",
                icon: "👁️",
                summary: "The roof sensor recorded an anvil falling through the skylight at 23:45.",
                details: [
                    { time: "23:30", event: "Eldred locked the front door." },
                    { time: "23:45", event: "A heavy anvil fell through the roof skylight." },
                    { time: "23:47", event: "The Ancient Emerald Shard was stolen." }
                ],
                crossRefHint: "The killer entered through the roof, not the locked front door."
            },

            chatLog: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "Durand wrote about stealing the Emerald Shard.",
                messages: [
                    {
                        sender: "Durand",
                        time: "21:00",
                        text: "I will take the Ancient Emerald Shard tonight."
                    }
                ],
                crossRefHint: "Durand clearly planned to steal the shard."
            },

            witness: {
                title: "WITNESS STATEMENT",
                icon: "📜",
                summary: "Alex saw Durand carrying his anvil toward the library roof.",
                statement: "I saw Durand carrying his heavy anvil up to the library roof.",
                witnessName: "Alex the Guard",
                crossRefHint: "Alex saw DURAND with the murder weapon."
            },

            weapon: {
                title: "MURDER WEAPON",
                icon: "🔨",
                summary: "Durand's heavy blacksmith anvil was found on the crushed desk.",
                details: "The anvil has 'DURAND' engraved on it.",
                weaponName: "Durand's Heavy Blacksmith Anvil",
                crossRefHint: "The murder weapon belongs to DURAND."
            },

            roomLayout: {
                title: "ROOM LAYOUT",
                icon: "📐",
                summary: "The reading desk was directly below the roof skylight.",
                layoutDesc: "The anvil could fall directly from the skylight onto the desk.",
                floorplanHotspots: [
                    {
                        name: "Locked Front Door",
                        x: 45,
                        y: 88,
                        note: "Locked from inside."
                    },
                    {
                        name: "Reading Desk",
                        x: 50,
                        y: 50,
                        note: "Eldred was found here."
                    },
                    {
                        name: "Roof Skylight",
                        x: 50,
                        y: 15,
                        note: "Open directly above the desk."
                    }
                ],
                crossRefHint: "The skylight is directly above the victim."
            },

            timeline: {
                title: "TIMELINE",
                icon: "⏳",
                summary: "The events clearly point to Durand.",
                entries: [
                    {
                        time: "23:30",
                        event: "Eldred locks the library.",
                        verified: true
                    },
                    {
                        time: "23:40",
                        event: "Steve and Alex are seen at the tavern.",
                        verified: true
                    },
                    {
                        time: "23:45",
                        event: "Durand drops his anvil through the skylight.",
                        verified: true
                    },
                    {
                        time: "23:47",
                        event: "The Ancient Emerald Shard is stolen.",
                        verified: true
                    }
                ],
                crossRefHint: "Steve and Alex were at the tavern. DURAND was at the library."
            }
        },

        options: {
            who: [
                "Steve the Woodcutter",
                "Durand the Blacksmith",
                "Alex the Guard"
            ],

            how: [
                "Shot an arrow through the window",
                "Cut the ceiling with an axe",
                "Dropped a Heavy Blacksmith Anvil through the Skylight"
            ],

            why: [
                "Over a 3-coin book debt",
                "To steal the Ancient Emerald Shard from the lectern",
                "By accident"
            ]
        },

        correctAnswer: {
            who: "Durand the Blacksmith",
            how: "Dropped a Heavy Blacksmith Anvil through the Skylight",
            why: "To steal the Ancient Emerald Shard from the lectern"
        },

        explanation: {
            summary: "Durand wanted the Ancient Emerald Shard. He climbed onto the library roof, dropped his anvil through the skylight, killed Eldred, and stole the shard.",

            clueChain: [
                "Durand's boot prints were found on the roof.",
                "Alex saw Durand carrying the anvil to the roof.",
                "The anvil had DURAND's name engraved on it."
            ]
        },

        failureHint: "Look at the roof prints, the anvil, and Alex's statement. They all point to DURAND."
    },

    // =========================================================================
    // CASE 02 — WHISPERS IN THE WINDMILL (OVERWORLD)
    // =========================================================================
    {
        id: 2,
        title: "WHISPERS IN THE WINDMILL",
        dimension: "overworld",
        victim: "Farmer Giles",
        location: "Hillside Windmill Grain Room",
        time: "02:00",
        status: "MURDER",
        difficulty: 1,

        synopsis: "Farmer Giles was poisoned inside the windmill. The Golden Wheat Shard was stolen from the grain shelf.",

        suspects: [
            {
                id: "lin",
                name: "Lin the Chemistry Brewer",
                role: "Chemistry Brewer",
                relation: "Neighbor",
                personality: "Wears a green robe and makes different potions.",
                alibi: "I was in my chemistry hut.",
                motive: "Wanted the Golden Wheat Shard.",
                avatarEmoji: "🧪"
            },
            {
                id: "tuck",
                name: "Tuck the Baker",
                role: "Village Baker",
                relation: "Flour Buyer",
                personality: "Wears a white baker hat and makes bread.",
                alibi: "I was baking bread with Clara.",
                motive: "Was unhappy about grain prices.",
                avatarEmoji: "🍞"
            },
            {
                id: "clara",
                name: "Clara the Weaver",
                role: "Cloth Maker",
                relation: "Friend",
                personality: "Wears a brown dress and works with wool.",
                alibi: "I was helping Tuck at the bakery.",
                motive: "Had no reason to hurt Giles.",
                avatarEmoji: "🧶"
            }
        ],

        evidence: {

            blockPrints: {
                title: "BLOCK PRINTS",
                icon: "👣",
                summary: "Green poison drops were found leading toward the windmill.",
                details: "The poison trail starts near Lin's chemistry hut and leads to the windmill.",
                crossRefHint: "The poison trail leads back to LIN."
            },

            observerLog: {
                title: "OBSERVER LOG",
                icon: "👁️",
                summary: "A green poison bottle was thrown through the windmill window.",
                details: [
                    {
                        time: "01:50",
                        event: "Giles enters the grain room."
                    },
                    {
                        time: "02:00",
                        event: "A green poison bottle is thrown through the open window."
                    },
                    {
                        time: "02:05",
                        event: "The Golden Wheat Shard is stolen."
                    }
                ],
                crossRefHint: "The killer used poison through the open window."
            },

            chatLog: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "Lin wrote about using poison to steal the shard.",
                messages: [
                    {
                        sender: "Lin",
                        time: "18:00",
                        text: "I will use my green poison to get the Golden Wheat Shard tonight."
                    }
                ],
                crossRefHint: "Lin planned to use poison and steal the shard."
            },

            witness: {
                title: "WITNESS STATEMENT",
                icon: "📜",
                summary: "Tuck saw Lin near the windmill.",
                statement: "I saw Lin in his green robe near the windmill window. He threw something inside.",
                witnessName: "Tuck the Baker",
                crossRefHint: "Tuck saw LIN at the windmill."
            },

            weapon: {
                title: "MURDER WEAPON",
                icon: "🧪",
                summary: "A green poison bottle labeled with Lin's name.",
                details: "The broken bottle found inside the grain room is labeled 'LIN'S GREEN POISON'.",
                weaponName: "Lin's Green Poison Bottle",
                crossRefHint: "The poison bottle belongs to LIN."
            },

            roomLayout: {
                title: "ROOM LAYOUT",
                icon: "📐",
                summary: "An open window leads directly into the grain room.",
                layoutDesc: "The killer could throw the poison bottle directly through the open window.",
                floorplanHotspots: [
                    {
                        name: "Open Window",
                        x: 20,
                        y: 50,
                        note: "The poison bottle was thrown through here."
                    },
                    {
                        name: "Grain Room Shelf",
                        x: 70,
                        y: 50,
                        note: "The Golden Wheat Shard was kept here."
                    }
                ],
                crossRefHint: "The poison was thrown through the open window."
            },

            timeline: {
                title: "TIMELINE",
                icon: "⏳",
                summary: "The events point directly to Lin.",
                entries: [
                    {
                        time: "01:50",
                        event: "Giles enters the windmill.",
                        verified: true
                    },
                    {
                        time: "01:55",
                        event: "Tuck and Clara are together at the bakery.",
                        verified: true
                    },
                    {
                        time: "02:00",
                        event: "Lin throws green poison through the window.",
                        verified: true
                    },
                    {
                        time: "02:05",
                        event: "The Golden Wheat Shard is stolen.",
                        verified: true
                    }
                ],
                crossRefHint: "Tuck and Clara were at the bakery. LIN was responsible for the poison attack."
            }
        },

        options: {
            who: [
                "Clara the Weaver",
                "Tuck the Baker",
                "Lin the Chemistry Brewer"
            ],

            how: [
                "Hit with a wooden rolling pin",
                "Splashed a Green Poison Bottle through the Window",
                "Cut the windmill sails"
            ],

            why: [
                "Accidental poison spill",
                "Over bread flour prices",
                "To steal the Golden Wheat Shard from the grain shelf"
            ]
        },

        correctAnswer: {
            who: "Lin the Chemistry Brewer",
            how: "Splashed a Green Poison Bottle through the Window",
            why: "To steal the Golden Wheat Shard from the grain shelf"
        },

        explanation: {
            summary: "Lin used his green poison bottle to attack Farmer Giles through the windmill window and then stole the Golden Wheat Shard.",

            clueChain: [
                "The poison bottle was labeled with LIN'S name.",
                "Tuck saw LIN near the windmill window.",
                "The poison trail led back toward LIN'S chemistry hut."
            ]
        },

        failureHint: "Look at the poison bottle, the green robe, and the witness statement. They all point to LIN."
    },
    // =========================================================================
    // CASE 03 — THE IRON FORTRESS (OVERWORLD)
    // =========================================================================
    {
        id: 3,
        title: "THE IRON FORTRESS",
        dimension: "overworld",
        victim: "Iron Sentinel Guard",
        location: "Fortress Watchtower Gate",
        time: "03:00 (Midnight Thunderstorm)",
        status: "MURDER",
        difficulty: 1,

        synopsis: "The Iron Sentinel was destroyed by a lightning strike during a storm. The Fortress Power Shard was stolen from the gate chest.",

        suspects: [
            {
                id: "vance",
                name: "Vance the Electrician",
                role: "Fortress Electrician",
                relation: "Fortress Mechanic",
                personality: "Wears rubber gloves and carries copper wire.",
                alibi: "I was reading in my bedroom.",
                motive: "Wanted the Fortress Power Shard for his generator.",
                avatarEmoji: "⚡"
            },
            {
                id: "bruno",
                name: "Bruno the Stonemason",
                role: "Castle Builder",
                relation: "Contractor",
                personality: "Wears grey overalls and carries a stone chisel.",
                alibi: "I was drinking tea with Selena in the barracks.",
                motive: "Was unhappy about stone supply delays.",
                avatarEmoji: "🧱"
            },
            {
                id: "selena",
                name: "Selena the Merchant",
                role: "Traveling Merchant",
                relation: "Visitor",
                personality: "Wears a blue cloak and travels with pack ponies.",
                alibi: "I was drinking tea with Bruno in the barracks.",
                motive: "Had no reason to attack the Sentinel.",
                avatarEmoji: "🧳"
            }
        ],

        evidence: {

            blockPrints: {
                title: "BLOCK PRINTS",
                icon: "👣",
                summary: "Copper wire pieces were found beside the fortress lightning rod.",
                details: "The wire matches the copper wire carried by Vance.",
                crossRefHint: "The copper wire belongs to VANCE."
            },

            observerLog: {
                title: "OBSERVER LOG",
                icon: "👁️",
                summary: "Copper wire connected the lightning rod to the Iron Sentinel.",
                details: [
                    {
                        time: "02:50",
                        event: "Copper wire is connected from the roof lightning rod to the Iron Sentinel."
                    },
                    {
                        time: "03:00",
                        event: "Lightning strikes the rod and travels through the copper wire into the Sentinel."
                    },
                    {
                        time: "03:05",
                        event: "The Fortress Power Shard is stolen."
                    }
                ],
                crossRefHint: "The copper wire caused the lightning to hit the Sentinel."
            },

            chatLog: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "Vance wrote about using the storm to destroy the Sentinel.",
                messages: [
                    {
                        sender: "Vance",
                        time: "20:00",
                        text: "Tonight's storm will let me use my copper wire to destroy the Sentinel and take the Fortress Power Shard."
                    }
                ],
                crossRefHint: "Vance planned to use the storm and copper wire."
            },

            witness: {
                title: "WITNESS STATEMENT",
                icon: "📜",
                summary: "Selena saw Vance near the lightning rod.",
                statement: "I saw Vance connecting copper wire to the lightning rod before the storm struck.",
                witnessName: "Selena the Merchant",
                crossRefHint: "Selena saw VANCE setting up the copper wire."
            },

            weapon: {
                title: "MURDER WEAPON",
                icon: "⚡",
                summary: "Copper wire marked with Vance's name was found attached to the Sentinel.",
                details: "The wire used in the attack has a tag reading 'PROPERTY OF VANCE'.",
                weaponName: "Vance's Copper Lightning Wire",
                crossRefHint: "The wire used in the attack belongs to VANCE."
            },

            roomLayout: {
                title: "ROOM LAYOUT",
                icon: "📐",
                summary: "The lightning rod was directly above the Iron Sentinel.",
                layoutDesc: "A copper wire could connect the roof lightning rod directly to the Sentinel.",
                floorplanHotspots: [
                    {
                        name: "Roof Lightning Rod",
                        x: 50,
                        y: 10,
                        note: "The copper wire was connected here."
                    },
                    {
                        name: "Iron Sentinel",
                        x: 50,
                        y: 60,
                        note: "The wire carried the lightning to the Sentinel."
                    }
                ],
                crossRefHint: "The wire connected the lightning rod directly to the Sentinel."
            },

            timeline: {
                title: "TIMELINE",
                icon: "⏳",
                summary: "The timeline points directly to Vance.",
                entries: [
                    {
                        time: "02:45",
                        event: "Bruno and Selena are together in the barracks.",
                        verified: true
                    },
                    {
                        time: "02:50",
                        event: "Vance connects copper wire to the lightning rod.",
                        verified: true
                    },
                    {
                        time: "03:00",
                        event: "Lightning strikes the Sentinel through the copper wire.",
                        verified: true
                    },
                    {
                        time: "03:05",
                        event: "The Fortress Power Shard is stolen.",
                        verified: true
                    }
                ],
                crossRefHint: "Bruno and Selena were together. VANCE was responsible for the lightning setup."
            }
        },

        options: {
            who: [
                "Bruno the Stonemason",
                "Vance the Electrician",
                "Selena the Merchant"
            ],

            how: [
                "Hit with a heavy stone chisel",
                "Poured water on the Sentinel",
                "Channeled Thunderstorm Lightning through a Copper Wire"
            ],

            why: [
                "Over delayed stone deliveries",
                "By accident during the storm",
                "To steal the Fortress Power Shard from the gate chest"
            ]
        },

        correctAnswer: {
            who: "Vance the Electrician",
            how: "Channeled Thunderstorm Lightning through a Copper Wire",
            why: "To steal the Fortress Power Shard from the gate chest"
        },

        explanation: {
            summary: "Vance connected his copper wire to the fortress lightning rod. When lightning struck, the electricity traveled through the wire and destroyed the Iron Sentinel. Vance then stole the Fortress Power Shard.",

            clueChain: [
                "The attack used copper wire belonging to Vance.",
                "Selena saw Vance setting up the wire.",
                "Vance wanted the Fortress Power Shard."
            ]
        },

        failureHint: "Look at the copper wire, who set it up, and who wanted the Fortress Power Shard."
    },
    // =========================================================================
    // CASE 04 — THE CRIMSON VAULT (NETHER)
    // =========================================================================
    {
        id: 4,
        title: "THE CRIMSON VAULT",
        dimension: "nether",
        victim: "Chieftain Gorg",
        location: "Volcanic Bastion Vault",
        time: "14:10",
        status: "MURDER",
        difficulty: 1,

        synopsis: "Chieftain Gorg was crushed by the heavy vault gate. The Nether Gold Shard was stolen from the vault.",

        suspects: [
            {
                id: "zul",
                name: "Zul the Gold Merchant",
                role: "Treasury Keeper",
                relation: "Treasurer",
                personality: "Wears a gold crown and a large gold signet ring. Controls the vault gate lever.",
                alibi: "I was sleeping in my bedroom.",
                motive: "Wanted the Nether Gold Shard.",
                avatarEmoji: "🐷"
            },
            {
                id: "pyra",
                name: "Pyra the Lava Boat Pilot",
                role: "Boat Ferryman",
                relation: "Worker",
                personality: "Carries a wooden boat oar.",
                alibi: "I was repairing boats with Vorg at the lava dock.",
                motive: "Had no reason to attack Gorg.",
                avatarEmoji: "🛶"
            },
            {
                id: "vorg",
                name: "Vorg the Gate Guard",
                role: "Bastion Guard",
                relation: "Security",
                personality: "Wears red armor and carries an iron shield.",
                alibi: "I was repairing boats with Pyra at the lava dock.",
                motive: "Had no reason to attack Gorg.",
                avatarEmoji: "🛡️"
            }
        ],

        evidence: {

            blockPrints: {
                title: "BLOCK PRINTS",
                icon: "👣",
                summary: "Zul's gold ring left a mark on the vault lever.",
                details: "The lever has a fingerprint mark matching Zul's large gold signet ring.",
                crossRefHint: "The mark belongs to ZUL."
            },

            observerLog: {
                title: "OBSERVER LOG",
                icon: "👁️",
                summary: "The vault gate was activated from Zul's lever booth.",
                details: [
                    {
                        time: "14:05",
                        event: "Gorg walks under the vault gate."
                    },
                    {
                        time: "14:10",
                        event: "The vault gate lever is pulled and the gate crushes Gorg."
                    },
                    {
                        time: "14:12",
                        event: "The Nether Gold Shard is stolen."
                    }
                ],
                crossRefHint: "The gate was controlled from ZUL'S booth."
            },

            chatLog: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "Zul wrote about using the vault gate.",
                messages: [
                    {
                        sender: "Zul",
                        time: "11:00",
                        text: "I will pull the vault gate lever when Gorg enters and take the Nether Gold Shard."
                    }
                ],
                crossRefHint: "Zul planned the attack."
            },

            witness: {
                title: "WITNESS STATEMENT",
                icon: "📜",
                summary: "Pyra saw Zul at the vault lever.",
                statement: "I saw Zul inside his lever booth when the vault gate suddenly came down on Gorg.",
                witnessName: "Pyra the Lava Boat Pilot",
                crossRefHint: "Pyra saw ZUL at the lever."
            },

            weapon: {
                title: "MURDER WEAPON",
                icon: "🚪",
                summary: "The heavy vault gate was used to crush Gorg.",
                details: "The gate can only be activated using the lever inside Zul's private booth.",
                weaponName: "Heavy Vault Gate",
                crossRefHint: "The vault gate was controlled by ZUL."
            },

            roomLayout: {
                title: "ROOM LAYOUT",
                icon: "📐",
                summary: "Zul's lever booth overlooks the vault gate.",
                layoutDesc: "The lever booth has a clear view of the gate.",
                floorplanHotspots: [
                    {
                        name: "Zul's Lever Booth",
                        x: 80,
                        y: 20,
                        note: "The vault gate lever is located here."
                    },
                    {
                        name: "Vault Gate",
                        x: 50,
                        y: 50,
                        note: "Gorg was crushed here."
                    }
                ],
                crossRefHint: "Zul could see and control the vault gate from his booth."
            },

            timeline: {
                title: "TIMELINE",
                icon: "⏳",
                summary: "The timeline points directly to Zul.",
                entries: [
                    {
                        time: "14:00",
                        event: "Pyra and Vorg are together at the lava dock.",
                        verified: true
                    },
                    {
                        time: "14:05",
                        event: "Gorg enters the vault.",
                        verified: true
                    },
                    {
                        time: "14:10",
                        event: "Zul pulls the vault gate lever.",
                        verified: true
                    },
                    {
                        time: "14:12",
                        event: "The Nether Gold Shard is stolen.",
                        verified: true
                    }
                ],
                crossRefHint: "Pyra and Vorg were together. ZUL controlled the gate."
            }
        },

        options: {
            who: [
                "Pyra the Lava Boat Pilot",
                "Vorg the Gate Guard",
                "Zul the Gold Merchant"
            ],

            how: [
                "Pushed the victim into the lava pool",
                "Pulled the Lever to Crush the Victim with the Heavy Vault Gate",
                "Shot the victim with a flaming crossbow"
            ],

            why: [
                "Over boat repair costs",
                "To steal the Nether Gold Shard from the vault",
                "Accidental gate failure"
            ]
        },

        correctAnswer: {
            who: "Zul the Gold Merchant",
            how: "Pulled the Lever to Crush the Victim with the Heavy Vault Gate",
            why: "To steal the Nether Gold Shard from the vault"
        },

        explanation: {
            summary: "Zul used the vault gate lever to crush Gorg and then stole the Nether Gold Shard.",

            clueChain: [
                "Zul controlled the vault gate.",
                "His fingerprint was found on the lever.",
                "He wanted the Nether Gold Shard."
            ]
        },

        failureHint: "Look at who controlled the vault lever and whose mark was found on it."
    },
    // =========================================================================
    // CASE 05 — THE MAGMA CROSSING (NETHER)
    // =========================================================================
    {
        id: 5,
        title: "THE MAGMA CROSSING",
        dimension: "nether",
        victim: "Navigator Cinder (Strider Master)",
        location: "Nether Magma Sea Ferry Dock",
        time: "16:45",
        status: "MURDER",
        difficulty: 1,

        synopsis: "Navigator Cinder was thrown into the magma sea when his strider saddle strap was cut with a sharp flint knife. The 5th Nether Ember Shard was stolen from his cargo pouch.",

        suspects: [
            {
                id: "krag",
                name: "Krag the Strider Breeder",
                role: "Strider Master",
                relation: "Rival Ferryman",
                personality: "Carries a sharp carved flint knife and wears obsidian gloves.",
                alibi: "I was feeding striders in the back stables.",
                motive: "Wanted the 5th Nether Ember Shard to control the ferry trade.",
                avatarEmoji: "🐗"
            },
            {
                id: "valka",
                name: "Valka the Crimson Scout",
                role: "Crimson Scout",
                relation: "Guide",
                personality: "Wears a red warped mushroom cloak and carries a wooden compass.",
                alibi: "I was checking supply crates with Thorne at the dock gate.",
                motive: "Had no reason to harm Cinder.",
                avatarEmoji: "🧭"
            },
            {
                id: "thorne",
                name: "Thorne the Gate Sentry",
                role: "Ferry Sentry",
                relation: "Security",
                personality: "Carries an iron spear and guards the dock walkway.",
                alibi: "I was checking supply crates with Valka at the dock gate.",
                motive: "No conflict with Cinder.",
                avatarEmoji: "🛡️"
            }
        ],

        evidence: {

            blockPrints: {
                title: "BLOCK PRINTS",
                icon: "👣",
                summary: "Obsidian dust and heavy hoof prints were found by Cinder's strider pen.",
                details: "The obsidian dust matches Krag's obsidian work gloves.",
                crossRefHint: "The obsidian glove marks belong to KRAG."
            },

            observerLog: {
                title: "OBSERVER LOG",
                icon: "👁️",
                summary: "The dock log recorded a figure cutting the saddle strap before departure.",
                details: [
                    {
                        time: "16:30",
                        event: "Cinder ties his strider to dock post #2."
                    },
                    {
                        time: "16:40",
                        event: "A figure cuts the strider saddle strap with a sharp blade."
                    },
                    {
                        time: "16:45",
                        event: "Cinder mounts the strider; the saddle slips and he falls into the magma sea."
                    },
                    {
                        time: "16:47",
                        event: "The 5th Nether Ember Shard is stolen from the cargo dock."
                    }
                ],
                crossRefHint: "The saddle strap was cut just before Cinder mounted the strider."
            },

            chatLog: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "Krag's message reveals his plan to take the ferry shard.",
                messages: [
                    {
                        sender: "Krag",
                        time: "15:00",
                        text: "I will cut Cinder's saddle strap at dock #2 and take the 5th Nether Ember Shard."
                    }
                ],
                crossRefHint: "KRAG planned to sabotage the saddle strap and steal the shard."
            },

            witness: {
                title: "WITNESS STATEMENT",
                icon: "📜",
                summary: "Valka saw Krag tampering with the strider saddle.",
                statement: "I saw Krag using his flint knife on Cinder's strider saddle right before Cinder went out onto the magma.",
                witnessName: "Valka the Crimson Scout",
                crossRefHint: "Valka saw KRAG with the sharp knife at the strider saddle."
            },

            weapon: {
                title: "MURDER WEAPON",
                icon: "🔪",
                summary: "A carved flint knife was used to slice through the heavy leather strap.",
                details: "Flint blade shavings were found on the severed saddle strap. Krag's name is engraved on the flint knife handle.",
                weaponName: "Krag's Carved Flint Knife",
                crossRefHint: "The severed strap matches KRAG'S carved flint knife."
            },

            roomLayout: {
                title: "ROOM LAYOUT",
                icon: "📐",
                summary: "Dock Post #2 sits directly over the deep magma channel.",
                layoutDesc: "The strider launch dock connects to the open magma sea.",
                floorplanHotspots: [
                    {
                        name: "Dock Post #2",
                        x: 40,
                        y: 70,
                        note: "Cinder's strider saddle was cut here."
                    },
                    {
                        name: "Magma Channel",
                        x: 50,
                        y: 30,
                        note: "Cinder fell into the magma sea here."
                    }
                ],
                crossRefHint: "Dock #2 is isolated near Krag's stable."
            },

            timeline: {
                title: "TIMELINE",
                icon: "⏳",
                summary: "The timeline shows Valka and Thorne were together at the gate.",
                entries: [
                    {
                        time: "16:25",
                        event: "Valka and Thorne meet at the dock gate.",
                        verified: true
                    },
                    {
                        time: "16:40",
                        event: "Krag cuts the strider saddle strap.",
                        verified: true
                    },
                    {
                        time: "16:45",
                        event: "Cinder falls as the saddle detaches in the magma.",
                        verified: true
                    },
                    {
                        time: "16:47",
                        event: "The 5th Nether Ember Shard is stolen.",
                        verified: true
                    }
                ],
                crossRefHint: "Valka and Thorne were together at the gate. KRAG was alone at the strider dock."
            }
        },

        options: {
            who: [
                "Valka the Crimson Scout",
                "Krag the Strider Breeder",
                "Thorne the Gate Sentry"
            ],

            how: [
                "Pushed Cinder from the dock with an iron spear",
                "Distracted the strider with warped fungus",
                "Sliced the Strider Saddle Strap with a Carved Flint Knife"
            ],

            why: [
                "Over strider stable rental fees",
                "Accidental saddle malfunction",
                "To steal the 5th Nether Ember Shard and monopolize the ferry route"
            ]
        },

        correctAnswer: {
            who: "Krag the Strider Breeder",
            how: "Sliced the Strider Saddle Strap with a Carved Flint Knife",
            why: "To steal the 5th Nether Ember Shard and monopolize the ferry route"
        },

        explanation: {
            summary: "Krag used his carved flint knife to slice Cinder's strider saddle strap at Dock #2. When Cinder rode out onto the magma sea, the saddle detached, causing him to fall into the magma. Krag then stole the 5th Nether Ember Shard.",

            clueChain: [
                "Valka saw Krag tampering with the strider saddle with a flint knife.",
                "Flint blade shavings matching Krag's engraved knife were found on the severed strap.",
                "Krag's message revealed his scheme to seize the 5th Nether Ember Shard."
            ]
        },

        failureHint: "Look at whose flint knife cut the saddle strap and who wanted to seize the 5th Nether Ember Shard."
    },
    // =========================================================================
    // CASE 06 — THE BASALT SHELTER (NETHER)
    // =========================================================================
    {
        id: 6,
        title: "THE BASALT SHELTER",
        dimension: "nether",
        victim: "Researcher Ignis",
        location: "Fortified Stone Shelter",
        time: "22:00",
        status: "MURDER",
        difficulty: 1,

        synopsis: "Researcher Ignis was killed by an explosive trap at his shelter door. The Soulfire Shard was stolen from his safe.",

        suspects: [
            {
                id: "solas",
                name: "Solas the Fire Mage",
                role: "Fire Mage",
                relation: "Rival Researcher",
                personality: "Wears a flame-patterned cloak and carries explosive powder.",
                alibi: "I was reading fire scrolls in my cave.",
                motive: "Wanted the Soulfire Shard for his fire magic.",
                avatarEmoji: "🔥"
            },
            {
                id: "varren",
                name: "Varren the Stonecutter",
                role: "Stone Builder",
                relation: "Contractor",
                personality: "Carries a stone hand-saw and wears a grey apron.",
                alibi: "I was working with Nari at the workshop.",
                motive: "Had a dispute over construction payment.",
                avatarEmoji: "⛏️"
            },
            {
                id: "nari",
                name: "Nari the Sand Trader",
                role: "Sand Merchant",
                relation: "Supplier",
                personality: "Carries bags of sand and wears a blue scarf.",
                alibi: "I was working with Varren at the workshop.",
                motive: "Had no reason to attack Ignis.",
                avatarEmoji: "📦"
            }
        ],

        evidence: {

            blockPrints: {
                title: "BLOCK PRINTS",
                icon: "👣",
                summary: "Explosive powder was found around the shelter doorway.",
                details: "The powder matches the explosive powder carried by Solas.",
                crossRefHint: "The explosive powder belongs to SOLAS."
            },

            observerLog: {
                title: "OBSERVER LOG",
                icon: "👁️",
                summary: "An explosive trap was placed at the shelter door.",
                details: [
                    {
                        time: "21:50",
                        event: "An explosive trap is placed at the shelter doorway."
                    },
                    {
                        time: "21:55",
                        event: "The explosive trap is armed."
                    },
                    {
                        time: "22:00",
                        event: "Ignis opens the door and the trap explodes."
                    },
                    {
                        time: "22:05",
                        event: "The Soulfire Shard is stolen from the damaged safe."
                    }
                ],
                crossRefHint: "The trap was placed directly at the shelter entrance."
            },

            chatLog: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "Solas wrote about attacking Ignis with an explosive trap.",
                messages: [
                    {
                        sender: "Solas",
                        time: "18:00",
                        text: "I will place an explosive trap at Ignis's door and take the Soulfire Shard."
                    }
                ],
                crossRefHint: "Solas planned to use an explosive trap."
            },

            witness: {
                title: "WITNESS STATEMENT",
                icon: "📜",
                summary: "Nari saw Solas placing the trap.",
                statement: "I saw Solas in his flame cloak place a glowing explosive trap at Ignis's door before running away.",
                witnessName: "Nari the Sand Trader",
                crossRefHint: "Nari saw SOLAS place the trap."
            },

            weapon: {
                title: "MURDER WEAPON",
                icon: "💥",
                summary: "The explosive trap was marked with Solas's name.",
                details: "Pieces of the destroyed trap were found at the doorway. The base was engraved with 'SOLAS'.",
                weaponName: "Solas's Explosive Trap",
                crossRefHint: "The explosive trap belongs to SOLAS."
            },

            roomLayout: {
                title: "ROOM LAYOUT",
                icon: "📐",
                summary: "The shelter has one main entrance.",
                layoutDesc: "The explosive trap was placed directly outside the only entrance.",
                floorplanHotspots: [
                    {
                        name: "Shelter Doorway",
                        x: 50,
                        y: 80,
                        note: "The explosive trap was placed here."
                    },
                    {
                        name: "Soulfire Safe",
                        x: 50,
                        y: 20,
                        note: "The shard was kept inside this safe."
                    }
                ],
                crossRefHint: "The trap was placed directly at the shelter entrance."
            },

            timeline: {
                title: "TIMELINE",
                icon: "⏳",
                summary: "The timeline points directly to Solas.",
                entries: [
                    {
                        time: "21:45",
                        event: "Varren and Nari are together at the workshop.",
                        verified: true
                    },
                    {
                        time: "21:55",
                        event: "Solas places and arms the explosive trap.",
                        verified: true
                    },
                    {
                        time: "22:00",
                        event: "The trap explodes when Ignis opens the door.",
                        verified: true
                    },
                    {
                        time: "22:05",
                        event: "The Soulfire Shard is stolen.",
                        verified: true
                    }
                ],
                crossRefHint: "Varren and Nari were together. SOLAS was responsible for the trap."
            }
        },

        options: {
            who: [
                "Varren the Stonecutter",
                "Nari the Sand Trader",
                "Solas the Fire Mage"
            ],

            how: [
                "Hit with a stone hand-saw",
                "Planted an Explosive Yellow Powder Trap at the Doorway",
                "Flooded the shelter with lava"
            ],

            why: [
                "Over an unpaid construction bill",
                "To steal the Soulfire Shard from the safe",
                "Accidental explosion"
            ]
        },

        correctAnswer: {
            who: "Solas the Fire Mage",
            how: "Planted an Explosive Yellow Powder Trap at the Doorway",
            why: "To steal the Soulfire Shard from the safe"
        },

        explanation: {
            summary: "Solas placed an explosive trap at Ignis's door. When Ignis opened the door, the trap exploded. Solas then took the Soulfire Shard from the damaged safe.",

            clueChain: [
                "Nari saw Solas place the explosive trap.",
                "The trap was marked with Solas's name.",
                "The explosive powder matched Solas's equipment."
            ]
        },

        failureHint: "Look at who placed the trap and whose name was written on it."
    },
    // =========================================================================
    // CASE 07 — THE HIGH SKY SPIRE (THE END)
    // =========================================================================
    {
        id: 7,
        title: "THE HIGH SKY SPIRE",
        dimension: "end",
        victim: "Sage Kael (High Sky Scholar)",
        location: "Open Spire Balcony",
        time: "00:30",
        status: "MURDER",
        difficulty: 1,

        synopsis: "Sage Kael was killed when water was dropped onto his open balcony from above. The Purple Sky Shard was stolen from the altar.",

        suspects: [
            {
                id: "nyx",
                name: "Nyx the Glider Assassin",
                role: "Shadow Assassin",
                relation: "Invader",
                personality: "Wears purple glider wings and carries splash water bottles.",
                alibi: "I was flying over distant sky islands.",
                motive: "Wanted to steal the Purple Sky Shard.",
                avatarEmoji: "🥷"
            },
            {
                id: "brak",
                name: "Brak the Tower Guard",
                role: "Spire Guard",
                relation: "Guard",
                personality: "Wears a brass helmet and carries a wooden guard baton.",
                alibi: "I was guarding the ground floor with Lyra.",
                motive: "No reason to attack Kael.",
                avatarEmoji: "🐚"
            },
            {
                id: "lyra",
                name: "Lyra the Astrologist",
                role: "Spire Astrologist",
                relation: "Scholar",
                personality: "Carries a brass telescope and wears white robes.",
                alibi: "I was studying star charts with Brak.",
                motive: "No reason to attack Kael.",
                avatarEmoji: "🔮"
            }
        ],

        evidence: {

            blockPrints: {
                title: "BLOCK PRINTS",
                icon: "👣",
                summary: "A purple glider feather was found beside the water puddle.",
                details: "The feather matches the purple glider wings worn by Nyx.",
                crossRefHint: "The purple feather belongs to NYX."
            },

            observerLog: {
                title: "OBSERVER LOG",
                icon: "👁️",
                summary: "A flying figure dropped a water bottle onto the balcony.",
                details: [
                    {
                        time: "00:20",
                        event: "Sage Kael sits on the open balcony."
                    },
                    {
                        time: "00:30",
                        event: "A glider flies above the balcony and drops a splash water bottle."
                    },
                    {
                        time: "00:32",
                        event: "The Purple Sky Shard is missing from the altar."
                    }
                ],
                crossRefHint: "The attacker dropped the water bottle from above."
            },

            chatLog: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "Nyx's message reveals her plan.",
                messages: [
                    {
                        sender: "Nyx",
                        time: "21:00",
                        text: "I will fly over Kael's open balcony, drop water on him, and take the Purple Sky Shard."
                    }
                ],
                crossRefHint: "NYX planned to drop water from her glider."
            },

            witness: {
                title: "WITNESS STATEMENT",
                icon: "📜",
                summary: "Brak saw the attacker from the ground.",
                statement: "I looked up and saw Nyx flying her purple glider above the balcony. She dropped a water bottle before flying away.",
                witnessName: "Brak the Tower Guard",
                crossRefHint: "Brak saw NYX flying overhead and dropping the bottle."
            },

            weapon: {
                title: "MURDER WEAPON",
                icon: "💧",
                summary: "A broken splash water bottle marked with Nyx's emblem.",
                details: "The broken bottle was found on the balcony. It has Nyx's glider emblem on it.",
                weaponName: "Nyx's Splash Water Bottle",
                crossRefHint: "The water bottle has NYX'S emblem."
            },

            roomLayout: {
                title: "ROOM LAYOUT",
                icon: "📐",
                summary: "The balcony has no roof.",
                layoutDesc: "The open balcony allowed someone flying above to drop a water bottle directly onto Kael.",
                floorplanHotspots: [
                    {
                        name: "Meditation Pad",
                        x: 50,
                        y: 50,
                        note: "Where Kael was standing when the water hit him."
                    },
                    {
                        name: "Open Sky",
                        x: 50,
                        y: 15,
                        note: "Nyx flew here before dropping the water bottle."
                    }
                ],
                crossRefHint: "The open roof made an attack from above possible."
            },

            timeline: {
                title: "TIMELINE",
                icon: "⏳",
                summary: "The timeline shows when the attack happened.",
                entries: [
                    {
                        time: "00:15",
                        event: "Brak and Lyra guard the ground floor together.",
                        verified: true
                    },
                    {
                        time: "00:25",
                        event: "Kael sits on the open balcony.",
                        verified: true
                    },
                    {
                        time: "00:30",
                        event: "Nyx flies over the balcony and drops the water bottle.",
                        verified: true
                    },
                    {
                        time: "00:32",
                        event: "The Purple Sky Shard is stolen.",
                        verified: true
                    }
                ],
                crossRefHint: "Brak and Lyra were together. NYX was the person flying above the balcony."
            }
        },

        options: {
            who: [
                "Brak the Tower Guard",
                "Nyx the Glider Assassin",
                "Lyra the Astrologist"
            ],

            how: [
                "Hit with a wooden guard baton",
                "Pushed off the balcony",
                "Dropped a Splash Water Bottle from a Flying Glider"
            ],

            why: [
                "Over an astronomy book dispute",
                "Accidental balcony accident",
                "To steal the Purple Sky Shard from the altar"
            ]
        },

        correctAnswer: {
            who: "Nyx the Glider Assassin",
            how: "Dropped a Splash Water Bottle from a Flying Glider",
            why: "To steal the Purple Sky Shard from the altar"
        },

        explanation: {
            summary: "Nyx flew her glider above the open balcony and dropped a splash water bottle onto Sage Kael. After Kael was killed, Nyx took the Purple Sky Shard from the altar.",

            clueChain: [
                "Brak saw Nyx flying above the balcony and dropping the bottle.",
                "A purple glider feather matching Nyx was found at the scene.",
                "The broken water bottle had Nyx's glider emblem."
            ]
        },

        failureHint: "Look at who can fly above the balcony and whose water bottle was found at the scene."
    },
    // =========================================================================
    // CASE 08 — THE SKY SHIP SABOTAGE (THE END)
    // =========================================================================
    {
        id: 8,
        title: "THE SKY SHIP SABOTAGE",
        dimension: "end",
        victim: "Navigator Corvus",
        location: "Airship Takeoff Pier",
        time: "03:15",
        status: "MURDER",
        difficulty: 1,

        synopsis: "Navigator Corvus was killed when explosive rockets were used during takeoff. The Void Star Shard was stolen from the airship cabin.",

        suspects: [
            {
                id: "brak",
                name: "Brak the Rocket Mechanic",
                role: "Airship Mechanic",
                relation: "Ship Crew",
                personality: "Wears a leather tool belt and carries explosive firework rockets.",
                alibi: "I was sleeping in the lower cargo hold.",
                motive: "Wanted to steal the Void Star Shard.",
                avatarEmoji: "🚀"
            },
            {
                id: "vesper",
                name: "High Priest Vesper",
                role: "Ceremonial Priest",
                relation: "Passenger",
                personality: "Wears dark ceremonial robes and carries an ancient stone tablet.",
                alibi: "I was chanting in the airship chapel with Tuck.",
                motive: "Wanted sacred relics, not the Void Star Shard.",
                avatarEmoji: "🕯️"
            },
            {
                id: "tuck",
                name: "Tuck the Airship Courier",
                role: "Supply Runner",
                relation: "Crew",
                personality: "Carries supply crates and wears a woolen cap.",
                alibi: "I was in the chapel with Vesper.",
                motive: "No reason to attack Corvus.",
                avatarEmoji: "📦"
            }
        ],

        evidence: {

            blockPrints: {
                title: "BLOCK PRINTS",
                icon: "👣",
                summary: "Red firework paper was found inside the rocket holster.",
                details: "The paper matches the red explosive fireworks used by Brak.",
                crossRefHint: "The explosive firework material belongs to BRAK."
            },

            observerLog: {
                title: "OBSERVER LOG",
                icon: "👁️",
                summary: "The normal launch rockets were replaced with explosive fireworks.",
                details: [
                    {
                        time: "03:00",
                        event: "Brak replaces the normal boosters with red explosive fireworks."
                    },
                    {
                        time: "03:15",
                        event: "Corvus starts the airship and the explosive rockets detonate."
                    },
                    {
                        time: "03:18",
                        event: "The Void Star Shard is missing from the cabin."
                    }
                ],
                crossRefHint: "The launch rockets were deliberately replaced with explosives."
            },

            chatLog: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "Brak's message reveals his plan.",
                messages: [
                    {
                        sender: "Brak",
                        time: "01:30",
                        text: "I will replace Corvus's launch rockets with explosive fireworks. When he takes off, I will take the Void Star Shard."
                    }
                ],
                crossRefHint: "BRAK planned to replace the rockets with explosives."
            },

            witness: {
                title: "WITNESS STATEMENT",
                icon: "📜",
                summary: "Tuck saw Brak working on the rockets.",
                statement: "I saw Brak putting red explosive firework rockets into Corvus's rocket holder before the launch.",
                witnessName: "Tuck the Airship Courier",
                crossRefHint: "Tuck saw BRAK replacing the rockets."
            },

            weapon: {
                title: "MURDER WEAPON",
                icon: "🚀",
                summary: "An explosive rocket marked with Brak's name.",
                details: "An unused red explosive rocket was found near the launch area. It was labeled 'BRAK'S BLAST ROCKET'.",
                weaponName: "Brak's Explosive Firework Rocket",
                crossRefHint: "The explosive rocket is marked with BRAK'S name."
            },

            roomLayout: {
                title: "ROOM LAYOUT",
                icon: "📐",
                summary: "The rocket dispenser is next to the takeoff pier.",
                layoutDesc: "The rocket dispenser is located directly beside the launch platform.",
                floorplanHotspots: [
                    {
                        name: "Takeoff Pier",
                        x: 50,
                        y: 70,
                        note: "Where Corvus launched the airship."
                    },
                    {
                        name: "Rocket Dispenser",
                        x: 80,
                        y: 30,
                        note: "Where the normal rockets were replaced."
                    }
                ],
                crossRefHint: "The rocket dispenser was right beside the launch platform."
            },

            timeline: {
                title: "TIMELINE",
                icon: "⏳",
                summary: "The timeline shows Brak's actions before the explosion.",
                entries: [
                    {
                        time: "02:50",
                        event: "Vesper and Tuck are together in the chapel.",
                        verified: true
                    },
                    {
                        time: "03:00",
                        event: "Brak replaces the normal rockets with explosives.",
                        verified: true
                    },
                    {
                        time: "03:15",
                        event: "Corvus launches and the rockets explode.",
                        verified: true
                    },
                    {
                        time: "03:18",
                        event: "The Void Star Shard is stolen.",
                        verified: true
                    }
                ],
                crossRefHint: "Vesper and Tuck were together. BRAK was working with the rockets."
            }
        },

        options: {
            who: [
                "High Priest Vesper",
                "Tuck the Airship Courier",
                "Brak the Rocket Mechanic"
            ],

            how: [
                "Cut the airship ropes with shears",
                "Swapped Boosters with Red Explosive Firework Rockets",
                "Pushed the navigator from the pier"
            ],

            why: [
                "Over fruit crate delivery fees",
                "To steal the Void Star Shard from the airship cabin",
                "Accidental firework accident"
            ]
        },

        correctAnswer: {
            who: "Brak the Rocket Mechanic",
            how: "Swapped Boosters with Red Explosive Firework Rockets",
            why: "To steal the Void Star Shard from the airship cabin"
        },

        explanation: {
            summary: "Brak replaced Corvus's normal launch rockets with explosive fireworks. When Corvus launched the airship, the rockets exploded and killed him. Brak then stole the Void Star Shard from the cabin.",

            clueChain: [
                "Tuck saw Brak replacing the rockets.",
                "The explosive rocket was marked with Brak's name.",
                "The red firework material matched Brak's equipment."
            ]
        },

        failureHint: "Look at who replaced the rockets and whose name was written on the explosive rocket."
    },

    // =========================================================================
    // CASE 09 — THE CRYSTAL SANCTUARY (THE END)
    // =========================================================================
    {
        id: 9,
        title: "THE CRYSTAL SANCTUARY",
        dimension: "end",
        victim: "Arch-Priestess Lyra",
        location: "Central Sanctuary Altar & Pillar #3",
        time: "04:45",
        status: "MURDER",
        difficulty: 1,

        synopsis: "Arch-Priestess Lyra was killed when the crystal laser on Pillar #3 was turned toward the altar. The 9th Sanctuary Shard was stolen.",

        suspects: [
            {
                id: "vesper",
                name: "High Priest Vesper",
                role: "Ceremonial Priest",
                relation: "Co-Officiant",
                personality: "Wears dark ceremonial robes and carries a purple-tipped tuning rod.",
                alibi: "I was praying at the bottom of the stairs.",
                motive: "Wanted to steal the 9th Sanctuary Shard.",
                avatarEmoji: "🕯️"
            },
            {
                id: "omen",
                name: "Master Omen the Archivist",
                role: "Grand Archivist",
                relation: "Visitor",
                personality: "Wears blue robes and carries an ancient history book.",
                alibi: "I was at the entrance gate with Mira.",
                motive: "Wanted to protect the ancient records.",
                avatarEmoji: "📜"
            },
            {
                id: "mira",
                name: "Mira the Messenger",
                role: "Sanctuary Messenger",
                relation: "Courier",
                personality: "Wears a green scarf and carries a scroll satchel.",
                alibi: "I was delivering scrolls with Omen at the entrance.",
                motive: "No reason to attack Lyra.",
                avatarEmoji: "🧭"
            }
        ],

        evidence: {

            blockPrints: {
                title: "BLOCK PRINTS",
                icon: "👣",
                summary: "Purple marks from a tuning rod were found on Pillar #3.",
                details: "The purple residue matches Vesper's purple-tipped tuning rod.",
                crossRefHint: "The purple residue matches VESPER'S tuning rod."
            },

            observerLog: {
                title: "OBSERVER LOG",
                icon: "👁️",
                summary: "Pillar #3 was turned toward the central altar.",
                details: [
                    {
                        time: "04:30",
                        event: "Lyra stands at the central altar."
                    },
                    {
                        time: "04:40",
                        event: "A figure turns the crystal beam on Pillar #3 toward the altar."
                    },
                    {
                        time: "04:45",
                        event: "The crystal beam fires and strikes Lyra."
                    },
                    {
                        time: "04:48",
                        event: "The 9th Sanctuary Shard is taken from the altar."
                    }
                ],
                crossRefHint: "Someone deliberately turned Pillar #3 toward the altar."
            },

            chatLog: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "Vesper's message reveals his plan.",
                messages: [
                    {
                        sender: "Vesper",
                        time: "02:00",
                        text: "I will turn the crystal beam on Pillar #3 toward the altar and take the 9th Sanctuary Shard."
                    }
                ],
                crossRefHint: "VESPER planned to turn the crystal beam toward the altar."
            },

            witness: {
                title: "WITNESS STATEMENT",
                icon: "📜",
                summary: "Mira saw Vesper at Pillar #3.",
                statement: "I saw High Priest Vesper standing on Pillar #3 and using his purple tuning rod to turn the crystal beam toward Lyra.",
                witnessName: "Mira the Messenger",
                crossRefHint: "Mira saw VESPER controlling the crystal beam."
            },

            weapon: {
                title: "MURDER WEAPON",
                icon: "🔮",
                summary: "The crystal laser on Pillar #3 was used as the weapon.",
                details: "Vesper's purple-tipped tuning rod was found beside the beam control.",
                weaponName: "Vesper's Redirected Crystal Laser",
                crossRefHint: "VESPER'S tuning rod was found beside the beam control."
            },

            roomLayout: {
                title: "ROOM LAYOUT",
                icon: "📐",
                summary: "Pillar #3 has a clear path to the central altar.",
                layoutDesc: "The crystal beam from Pillar #3 can reach the central altar directly.",
                floorplanHotspots: [
                    {
                        name: "Pillar #3",
                        x: 25,
                        y: 25,
                        note: "The crystal beam was redirected from here."
                    },
                    {
                        name: "Central Altar",
                        x: 50,
                        y: 50,
                        note: "Where Lyra was standing."
                    }
                ],
                crossRefHint: "Pillar #3 has a direct line to the central altar."
            },

            timeline: {
                title: "TIMELINE",
                icon: "⏳",
                summary: "The timeline shows who controlled the beam.",
                entries: [
                    {
                        time: "04:25",
                        event: "Omen and Mira are together at the entrance gate.",
                        verified: true
                    },
                    {
                        time: "04:40",
                        event: "Vesper turns the crystal beam on Pillar #3.",
                        verified: true
                    },
                    {
                        time: "04:45",
                        event: "The beam fires at the altar.",
                        verified: true
                    },
                    {
                        time: "04:48",
                        event: "The 9th Sanctuary Shard is stolen.",
                        verified: true
                    }
                ],
                crossRefHint: "Omen and Mira were together. VESPER was at Pillar #3."
            }
        },

        options: {
            who: [
                "Master Omen the Archivist",
                "High Priest Vesper",
                "Mira the Messenger"
            ],

            how: [
                "Hit with a heavy ancient book",
                "Pushed Lyra from the altar",
                "Turned the Crystal Laser Beam on Pillar 3 toward the Altar"
            ],

            why: [
                "Over a messenger delivery dispute",
                "Accidental crystal reflection",
                "To steal the 9th Sanctuary Shard for the Secret Syndicate"
            ]
        },

        correctAnswer: {
            who: "High Priest Vesper",
            how: "Turned the Crystal Laser Beam on Pillar 3 toward the Altar",
            why: "To steal the 9th Sanctuary Shard for the Secret Syndicate"
        },

        explanation: {
            summary: "High Priest Vesper used his purple-tipped tuning rod to turn the crystal laser on Pillar #3 toward the altar. The beam struck Lyra, and Vesper then stole the 9th Sanctuary Shard.",

            clueChain: [
                "Mira saw Vesper turning the crystal beam toward the altar.",
                "Vesper's purple-tipped tuning rod was found beside the beam control.",
                "Vesper's message revealed his plan to steal the 9th Sanctuary Shard."
            ]
        },

        failureHint: "Look at who was seen controlling Pillar #3 and whose tuning rod was found beside the beam."
    },
    // =========================================================================
    // CASE 10 — THE ABHEDYA AWAKENING (THE FINALE)
    // =========================================================================
    {
        id: 10,
        title: "THE ABHEDYA AWAKENING",
        dimension: "deepdark",
        victim: "Master Omen (Grand Archivist)",
        location: "Ancient Underground Shrine",
        time: "00:00 (The Midnight Hour)",
        status: "MURDER",
        difficulty: 3,

        synopsis: "Master Omen was killed by a sonic blast inside the ancient shrine. The final shard was stolen, revealing the mastermind behind the entire conspiracy.",

        suspects: [
            {
                id: "vesper",
                name: "High Priest Vesper (The Syndicate Leader)",
                role: "Leader of the Secret Syndicate",
                relation: "Chief Conspirator",
                personality: "Wears silent wool boots and carries an iron tuning fork.",
                alibi: "I was meditating near the library ruins.",
                motive: "Wanted to unite all 10 Shards and awaken the Abhedya Singularity.",
                avatarEmoji: "👑"
            },
            {
                id: "durand",
                name: "Durand the Blacksmith",
                role: "Syndicate Blacksmith",
                relation: "Accomplice",
                personality: "Wears heavy iron boots that make loud sounds.",
                alibi: "I was working at the surface camp.",
                motive: "Was paid to make equipment for the Syndicate.",
                avatarEmoji: "⚒️"
            },
            {
                id: "solas",
                name: "Solas the Fire Mage",
                role: "Syndicate Mage",
                relation: "Accomplice",
                personality: "Carries bright torches and glowing crystals.",
                alibi: "I was at the surface tunnel entrance.",
                motive: "Wanted to learn dark fire magic.",
                avatarEmoji: "🔥"
            },
            {
                id: "nyx",
                name: "Nyx the Assassin",
                role: "Syndicate Scout",
                relation: "Accomplice",
                personality: "Carries glider wings and watches the surface exit.",
                alibi: "I was guarding the surface escape tunnel.",
                motive: "Was hired by the Syndicate.",
                avatarEmoji: "🥷"
            }
        ],

        evidence: {

            blockPrints: {
                title: "BLOCK PRINTS",
                icon: "👣",
                summary: "Soft wool fibers were found beside the acoustic alarm.",
                details: "The fibers match Vesper's silent wool boots.",
                crossRefHint: "Only VESPER wears silent wool boots."
            },

            observerLog: {
                title: "OBSERVER LOG",
                icon: "👁️",
                summary: "A tuning fork triggered the acoustic alarm at midnight.",
                details: [
                    {
                        time: "23:50",
                        event: "Master Omen guards the final shard inside the shrine."
                    },
                    {
                        time: "23:55",
                        event: "A figure enters the shrine wearing silent boots."
                    },
                    {
                        time: "23:59",
                        event: "The figure drops an iron tuning fork onto the acoustic alarm."
                    },
                    {
                        time: "00:00",
                        event: "The alarm releases a powerful sonic blast and strikes Omen."
                    },
                    {
                        time: "00:02",
                        event: "The final shard is taken from the shrine."
                    }
                ],
                crossRefHint: "The killer used an iron tuning fork to trigger the sonic blast."
            },

            chatLog: {
                title: "CHAT LOG",
                icon: "💬",
                summary: "Vesper's message reveals the entire plan.",
                messages: [
                    {
                        sender: "High Priest Vesper",
                        time: "23:00",
                        text: "The first 9 shards are already secured. Tonight I will take the final shard and awaken the Abhedya Singularity."
                    },
                    {
                        sender: "Durand",
                        time: "23:10",
                        text: "The shard frame is ready, Master Vesper."
                    }
                ],
                crossRefHint: "VESPER planned to take the final shard and awaken the Abhedya Singularity."
            },

            witness: {
                title: "WITNESS STATEMENT",
                icon: "📜",
                summary: "Omen's final recorded message names the killer.",
                statement: "The Syndicate Leader... Vesper... he came into the shrine with silent boots and an iron tuning fork. Stop him before he unites the shards!",
                witnessName: "Master Omen's Final Recording",
                crossRefHint: "Omen directly names VESPER."
            },

            weapon: {
                title: "MURDER WEAPON",
                icon: "🔊",
                summary: "The acoustic alarm was triggered by an iron tuning fork.",
                details: "The tuning fork was used to activate the sonic alarm that struck Omen.",
                weaponName: "Acoustic Sound Alarm Sonic Blast",
                crossRefHint: "The sonic blast was triggered by the IRON TUNING FORK."
            },

            roomLayout: {
                title: "ROOM LAYOUT",
                icon: "📐",
                summary: "The acoustic alarm was positioned directly behind Omen.",
                layoutDesc: "The alarm had a clear path toward Omen's position.",
                floorplanHotspots: [
                    {
                        name: "Acoustic Sound Alarm",
                        x: 30,
                        y: 70,
                        note: "The tuning fork was dropped here."
                    },
                    {
                        name: "Ancient Gateway",
                        x: 50,
                        y: 50,
                        note: "Omen was standing here when the sonic blast fired."
                    },
                    {
                        name: "Shard Chamber",
                        x: 70,
                        y: 30,
                        note: "The final shard was stored here."
                    }
                ],
                crossRefHint: "The alarm had a direct path toward Omen."
            },

            timeline: {
                title: "TIMELINE",
                icon: "⏳",
                summary: "The final timeline reveals Vesper's movements.",
                entries: [
                    {
                        time: "23:50",
                        event: "Durand, Solas, and Nyx remain at the surface.",
                        verified: true
                    },
                    {
                        time: "23:55",
                        event: "Vesper enters the deep shrine.",
                        verified: true
                    },
                    {
                        time: "23:59",
                        event: "Vesper drops the iron tuning fork onto the acoustic alarm.",
                        verified: true
                    },
                    {
                        time: "00:00",
                        event: "The sonic blast strikes Omen.",
                        verified: true
                    },
                    {
                        time: "00:02",
                        event: "The final shard is taken.",
                        verified: true
                    }
                ],
                crossRefHint: "The other suspects were at the surface. VESPER was inside the shrine."
            }
        },

        options: {
            who: [
                "Solas the Fire Mage",
                "Durand the Blacksmith",
                "High Priest Vesper (The Syndicate Leader)",
                "Nyx the Assassin"
            ],

            how: [
                "Hit with a heavy iron blacksmith hammer",
                "Planted an explosive yellow powder trap",
                "Dropped a Tuning Fork onto the Acoustic Sound Alarm to trigger a Sonic Blast",
                "Dropped splash water from a flying glider"
            ],

            why: [
                "To buy forging metals for blacksmith tools",
                "To practice dark fire magic",
                "To unite all 10 Shards and awaken the Abhedya Singularity",
                "Over a surface tunnel mercenary contract"
            ]
        },

        correctAnswer: {
            who: "High Priest Vesper (The Syndicate Leader)",
            how: "Dropped a Tuning Fork onto the Acoustic Sound Alarm to trigger a Sonic Blast",
            why: "To unite all 10 Shards and awaken the Abhedya Singularity"
        },

        explanation: {
            summary: "High Priest Vesper was the mastermind behind the entire Syndicate. He entered the shrine wearing silent wool boots, used his iron tuning fork to trigger the acoustic alarm, and killed Master Omen with the sonic blast. He then took the final shard to unite all 10 Shards and awaken the Abhedya Singularity.",

            clueChain: [
                "Omen's final recording directly names Vesper.",
                "Silent wool fibers matching Vesper's boots were found beside the alarm.",
                "Vesper's plan revealed that he wanted the final shard.",
                "The other suspects were at the surface."
            ]
        },

        failureHint: "Look at who was inside the shrine, who wore silent boots, and who wanted to unite all 10 Shards."
    },
];

// Helper getters
function getCaseById(id) {
    const numId = parseInt(id, 10);
    return CASES.find(c => c.id === numId) || null;
}

function getAllCases() {
    return CASES;
}
