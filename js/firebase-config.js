/**
 * CASE: ABHEDYA — HYBRID FIREBASE & LOCAL REAL-TIME LEADERBOARD ENGINE (js/firebase-config.js)
 * Supports both Cloud Firestore and Zero-Config Local / Multi-Tab Broadcast Sync.
 */

// 1. DEFAULT FIREBASE CONFIGURATION (Can be edited here or via the Admin Dashboard)
let firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Check for saved custom Firebase config in localStorage
try {
    const savedCustomConfig = localStorage.getItem('CASE_ABHEDYA_CUSTOM_FIREBASE_CONFIG');
    if (savedCustomConfig) {
        const parsed = JSON.parse(savedCustomConfig);
        if (parsed && parsed.projectId && parsed.projectId !== "YOUR_PROJECT_ID") {
            firebaseConfig = parsed;
        }
    }
} catch (e) {}

// 2. Initialize Firebase & Firestore safely
let db = null;
let isFirebaseReady = false;

function initFirebaseApp() {
    try {
        if (typeof firebase !== 'undefined') {
            if (!firebase.apps || !firebase.apps.length) {
                if (firebaseConfig.projectId && firebaseConfig.projectId !== "YOUR_PROJECT_ID") {
                    firebase.initializeApp(firebaseConfig);
                    db = firebase.firestore();
                    isFirebaseReady = true;
                    console.log('[Firebase] Initialized Cloud Firestore successfully with Project ID:', firebaseConfig.projectId);
                }
            } else {
                db = firebase.firestore();
                isFirebaseReady = true;
            }
        }
    } catch (err) {
        console.warn('[Firebase] Cloud initialization notice:', err.message);
    }
}

initFirebaseApp();

// 3. Centralized Dual-Mode Service (Cloud Firestore + Local Real-Time BroadcastChannel)
const FirebaseService = (function () {
    const COLLECTION_NAME = 'players';
    const USER_KEY = 'CASE_ABHEDYA_USER';
    const ID_KEY = 'CASE_ABHEDYA_PLAYER_ID';
    const LOCAL_PLAYERS_KEY = 'CASE_ABHEDYA_LOCAL_PLAYERS';

    // BroadcastChannel for instant zero-latency cross-tab real-time sync
    let syncChannel = null;
    try {
        if (typeof BroadcastChannel !== 'undefined') {
            syncChannel = new BroadcastChannel('case_abhedya_leaderboard');
        }
    } catch (e) {}

    function broadcast(type, payload) {
        if (syncChannel) {
            try {
                syncChannel.postMessage({ type, payload, timestamp: Date.now() });
            } catch (e) {}
        }
    }

    function isReady() {
        return isFirebaseReady && db !== null && firebaseConfig.projectId !== "YOUR_PROJECT_ID";
    }

    function sanitizePlayerId(username) {
        return username.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    }

    /**
     * Get local players registry from localStorage
     */
    function getLocalPlayers() {
        try {
            const raw = localStorage.getItem(LOCAL_PLAYERS_KEY);
            const list = raw ? JSON.parse(raw) : [];

            // Auto-heal: If current user (e.g., Isaac) is not in list, add them immediately
            const currentU = localStorage.getItem(USER_KEY);
            if (currentU && !list.find(p => p.username.toLowerCase() === currentU.toLowerCase())) {
                const pId = sanitizePlayerId(currentU);
                const newP = {
                    id: pId,
                    playerId: pId,
                    username: currentU,
                    casesSolved: 0,
                    currentCaseId: 1,
                    lastSolvedAt: null,
                    createdAt: new Date().toISOString(),
                    status: 'ACTIVE'
                };
                list.push(newP);
                localStorage.setItem(LOCAL_PLAYERS_KEY, JSON.stringify(list));
            }
            return list;
        } catch (e) {
            return [];
        }
    }

    function saveLocalPlayers(list) {
        try {
            localStorage.setItem(LOCAL_PLAYERS_KEY, JSON.stringify(list));
            broadcast('PLAYERS_UPDATED', list);
        } catch (e) {}
    }

    /**
     * Register a new student
     */
    async function registerPlayer(username) {
        if (!username || !username.trim()) return null;
        const cleanName = username.trim();
        const playerId = sanitizePlayerId(cleanName);

        // 1. Persist current session
        localStorage.setItem(USER_KEY, cleanName);
        localStorage.setItem(ID_KEY, playerId);

        // 2. Update local player list
        const localList = getLocalPlayers();
        let existing = localList.find(p => p.id === playerId || p.username.toLowerCase() === cleanName.toLowerCase());

        if (!existing) {
            existing = {
                id: playerId,
                playerId: playerId,
                username: cleanName,
                casesSolved: 0,
                currentCaseId: 1,
                lastSolvedAt: null,
                createdAt: new Date().toISOString(),
                status: 'ACTIVE'
            };
            localList.push(existing);
        } else {
            existing.username = cleanName;
            existing.status = 'ACTIVE';
        }

        saveLocalPlayers(localList);

        // 3. Sync to Cloud Firestore if connected
        if (isReady()) {
            try {
                const playerRef = db.collection(COLLECTION_NAME).doc(playerId);
                const docSnap = await playerRef.get();

                if (!docSnap.exists) {
                    await playerRef.set({
                        username: cleanName,
                        playerId: playerId,
                        casesSolved: existing.casesSolved || 0,
                        currentCaseId: 1,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        lastSolvedAt: null,
                        status: 'ACTIVE'
                    });
                } else {
                    await playerRef.set({
                        username: cleanName,
                        status: 'ACTIVE'
                    }, { merge: true });
                }
                console.log(`[Firebase] Synced student to Firestore: ${cleanName}`);
            } catch (err) {
                console.error('[Firebase] Firestore registration error:', err);
            }
        }

        return { username: cleanName, playerId };
    }

    /**
     * Update player's solved case count and timestamp
     */
    async function recordCaseSolved(casesSolvedCount) {
        const username = localStorage.getItem(USER_KEY);
        const playerId = localStorage.getItem(ID_KEY) || (username ? sanitizePlayerId(username) : null);

        if (!playerId && !username) return;

        const count = parseInt(casesSolvedCount, 10) || 0;
        const nowIso = new Date().toISOString();

        // 1. Update local registry
        const localList = getLocalPlayers();
        let target = localList.find(p => p.id === playerId || (username && p.username.toLowerCase() === username.toLowerCase()));

        if (target) {
            target.casesSolved = count;
            target.lastSolvedAt = nowIso;
            target.status = count >= 10 ? 'VICTORY' : 'INVESTIGATING';
        } else if (username) {
            target = {
                id: playerId || sanitizePlayerId(username),
                playerId: playerId || sanitizePlayerId(username),
                username: username,
                casesSolved: count,
                lastSolvedAt: nowIso,
                createdAt: nowIso,
                status: count >= 10 ? 'VICTORY' : 'INVESTIGATING'
            };
            localList.push(target);
        }

        saveLocalPlayers(localList);

        // 2. Sync to Cloud Firestore if connected
        if (isReady()) {
            try {
                await db.collection(COLLECTION_NAME).doc(playerId).set({
                    username: username || playerId,
                    playerId: playerId,
                    casesSolved: count,
                    lastSolvedAt: firebase.firestore.FieldValue.serverTimestamp(),
                    status: count >= 10 ? 'VICTORY' : 'INVESTIGATING'
                }, { merge: true });
                console.log(`[Firebase] Synced progress to Firestore: ${username} solved ${count}/10 cases.`);
            } catch (err) {
                console.error('[Firebase] Firestore sync error:', err);
            }
        }
    }

    /**
     * Save custom Firebase keys from Admin UI and reconnect
     */
    function saveCustomConfig(newConfig) {
        try {
            localStorage.setItem('CASE_ABHEDYA_CUSTOM_FIREBASE_CONFIG', JSON.stringify(newConfig));
            firebaseConfig = newConfig;
            initFirebaseApp();
            return true;
        } catch (e) {
            return false;
        }
    }

    function getConfig() {
        return firebaseConfig;
    }

    // Initialize auto-recovery for current player
    getLocalPlayers();

    return {
        isReady,
        registerPlayer,
        recordCaseSolved,
        getLocalPlayers,
        saveLocalPlayers,
        saveCustomConfig,
        getConfig,
        sanitizePlayerId,
        COLLECTION_NAME
    };
})();
