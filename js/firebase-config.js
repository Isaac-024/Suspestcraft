/**
 * CASE: ABHEDYA — TRI-ENGINE REAL-TIME LEADERBOARD & SYNC SERVICE (js/firebase-config.js)
 * 1. Global Cloud Relay (Internet-wide Real-Time Sync with Retained Messages across Vercel)
 * 2. Firebase Cloud Firestore (Optional permanent cloud database with custom keys)
 * 3. Local Multi-Tab BroadcastChannel & LocalStorage Auto-Recovery Engine.
 */

// 1. DEFAULT FIREBASE CONFIGURATION (Can be configured here or in the Admin Dashboard)
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
                    console.log('[Firebase] Initialized Cloud Firestore with Project ID:', firebaseConfig.projectId);
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

// 3. Centralized Dual-Mode Service (Cloud Firestore + Internet Relay + Local BroadcastChannel)
const FirebaseService = (function () {
    const COLLECTION_NAME = 'players';
    const USER_KEY = 'CASE_ABHEDYA_USER';
    const ID_KEY = 'CASE_ABHEDYA_PLAYER_ID';
    const LOCAL_PLAYERS_KEY = 'CASE_ABHEDYA_LOCAL_PLAYERS';
    
    // MQTT Cloud Relay Topics (Secure WebSockets)
    const TOPIC_PLAYER_PREFIX = 'case_abhedya_live_v2/players/';
    const TOPIC_PLAYER_WILDCARD = 'case_abhedya_live_v2/players/+';
    const TOPIC_EVENTS = 'case_abhedya_live_v2/events';
    const TOPIC_CONTROL = 'case_abhedya_live_v2/control';

    const listeners = [];

    // BroadcastChannel for zero-latency cross-tab sync
    let localChannel = null;
    try {
        if (typeof BroadcastChannel !== 'undefined') {
            localChannel = new BroadcastChannel('case_abhedya_leaderboard');
        }
    } catch (e) {}

    // Global Internet-wide MQTT WebSocket Relay for cross-device classroom sync on Vercel
    let mqttClient = null;
    let isCloudRelayConnected = false;

    function initCloudRelay() {
        if (typeof mqtt === 'undefined') return;
        try {
            const clientId = 'abhedya_' + Math.random().toString(16).substring(2, 10);
            mqttClient = mqtt.connect('wss://broker.emqx.io:8084/mqtt', {
                clientId: clientId,
                clean: false,
                connectTimeout: 8000,
                reconnectPeriod: 2000,
                keepalive: 60
            });

            mqttClient.on('connect', () => {
                isCloudRelayConnected = true;
                console.log('[Cloud Relay] Connected to Live Global Stream (EMQX WSS).');

                // Subscribe to all retained player records + real-time events + control
                mqttClient.subscribe([TOPIC_PLAYER_WILDCARD, TOPIC_EVENTS, TOPIC_CONTROL], { qos: 1 });

                // If this is a student with existing progress, broadcast state with retain: true
                announceCurrentPlayer();

                // Ask other active clients to sync state as well
                try {
                    mqttClient.publish(TOPIC_CONTROL, JSON.stringify({ action: 'SYNC_REQUEST', from: clientId }), { qos: 0 });
                } catch (e) {}
            });

            mqttClient.on('message', (topic, message) => {
                try {
                    const data = JSON.parse(message.toString());
                    
                    if (topic === TOPIC_CONTROL) {
                        if (data && data.action === 'SYNC_REQUEST') {
                            announceCurrentPlayer();
                        }
                    } else {
                        handleIncomingCloudPlayer(data);
                    }
                } catch (e) {}
            });

            mqttClient.on('error', (err) => {
                console.warn('[Cloud Relay] Notice:', err.message);
            });
        } catch (e) {
            console.warn('[Cloud Relay] Connection skipped:', e);
        }
    }

    function announceCurrentPlayer() {
        const currentU = localStorage.getItem(USER_KEY);
        if (!currentU) return;
        const localList = getLocalPlayers();
        const me = localList.find(p => p.username.toLowerCase() === currentU.toLowerCase());
        if (me) {
            broadcastCloudPlayer(me);
        }
    }

    function handleIncomingCloudPlayer(data) {
        if (!data) return;
        const incomingPlayer = data.player || (data.username ? data : null);
        if (!incomingPlayer || !incomingPlayer.username) return;

        const localList = getLocalPlayers();
        const pId = incomingPlayer.id || incomingPlayer.playerId || sanitizePlayerId(incomingPlayer.username);
        let existing = localList.find(p => p.id === pId || p.username.toLowerCase() === incomingPlayer.username.toLowerCase());

        let changed = false;
        if (!existing) {
            localList.push({
                id: pId,
                playerId: pId,
                username: incomingPlayer.username,
                casesSolved: parseInt(incomingPlayer.casesSolved, 10) || 0,
                currentCaseId: parseInt(incomingPlayer.currentCaseId, 10) || ((parseInt(incomingPlayer.casesSolved, 10) || 0) + 1),
                lastSolvedAt: incomingPlayer.lastSolvedAt || null,
                createdAt: incomingPlayer.createdAt || new Date().toISOString(),
                status: incomingPlayer.status || (incomingPlayer.casesSolved >= 10 ? 'VICTORY' : 'ACTIVE')
            });
            changed = true;
        } else {
            const incomingSolved = parseInt(incomingPlayer.casesSolved, 10) || 0;
            const currentSolved = parseInt(existing.casesSolved, 10) || 0;
            if (incomingSolved >= currentSolved) {
                existing.casesSolved = incomingSolved;
                existing.lastSolvedAt = incomingPlayer.lastSolvedAt || existing.lastSolvedAt;
                existing.status = incomingPlayer.status || (incomingSolved >= 10 ? 'VICTORY' : (incomingSolved > 0 ? `CASE #${incomingSolved + 1}` : 'ACTIVE'));
                changed = true;
            }
        }

        if (changed) {
            try {
                localStorage.setItem(LOCAL_PLAYERS_KEY, JSON.stringify(localList));
            } catch (e) {}
            notifyListeners(localList);
        }
    }

    function broadcastCloudPlayer(player) {
        if (!player || !player.username) return;
        const pId = player.id || player.playerId || sanitizePlayerId(player.username);
        
        if (mqttClient && isCloudRelayConnected) {
            try {
                const payload = JSON.stringify({
                    type: 'PLAYER_UPDATE',
                    player: player,
                    sentAt: Date.now()
                });
                
                // Retained message ensures any admin opening later gets the latest score immediately
                mqttClient.publish(TOPIC_PLAYER_PREFIX + pId, payload, { qos: 1, retain: true });
                mqttClient.publish(TOPIC_EVENTS, payload, { qos: 1, retain: false });
            } catch (e) {}
        }
    }

    function notifyListeners(list) {
        // 1. In-process callbacks (for Admin portal in same window)
        listeners.forEach(cb => {
            try { cb(list); } catch (e) {}
        });

        // 2. Custom DOM Event
        try {
            window.dispatchEvent(new CustomEvent('abhedya:player_update', { detail: list }));
        } catch (e) {}

        // 3. Cross-tab BroadcastChannel
        try {
            if (localChannel) {
                localChannel.postMessage({ type: 'PLAYERS_UPDATED', payload: list });
            }
        } catch (e) {}
    }

    function onPlayerUpdate(callback) {
        if (typeof callback === 'function') {
            listeners.push(callback);
        }
    }

    function isReady() {
        return isFirebaseReady && db !== null && firebaseConfig.projectId !== "YOUR_PROJECT_ID";
    }

    function sanitizePlayerId(username) {
        return username.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    }

    /**
     * Get local players registry from localStorage (with Auto-Recovery)
     */
    function getLocalPlayers() {
        try {
            const raw = localStorage.getItem(LOCAL_PLAYERS_KEY);
            const list = raw ? JSON.parse(raw) : [];

            // Auto-heal: If current user (e.g. Isaac) is registered, ensure their ACTUAL completed cases are reflected
            const currentU = localStorage.getItem(USER_KEY);
            if (currentU) {
                const pId = sanitizePlayerId(currentU);
                let pObj = list.find(p => p.id === pId || p.username.toLowerCase() === currentU.toLowerCase());

                // Read actual completed cases from Storage
                let solvedCount = 0;
                try {
                    const saveRaw = localStorage.getItem('CASE_ABHEDYA_SAVE_V1');
                    if (saveRaw) {
                        const saveData = JSON.parse(saveRaw);
                        if (saveData && Array.isArray(saveData.completedCases)) {
                            solvedCount = saveData.completedCases.length;
                        }
                    }
                } catch (e) {}

                if (!pObj) {
                    pObj = {
                        id: pId,
                        playerId: pId,
                        username: currentU,
                        casesSolved: solvedCount,
                        currentCaseId: solvedCount + 1,
                        lastSolvedAt: solvedCount > 0 ? new Date().toISOString() : null,
                        createdAt: new Date().toISOString(),
                        status: solvedCount >= 10 ? 'VICTORY' : (solvedCount > 0 ? `CASE #${solvedCount + 1}` : 'ACTIVE')
                    };
                    list.push(pObj);
                } else {
                    if (solvedCount > (pObj.casesSolved || 0)) {
                        pObj.casesSolved = solvedCount;
                        if (!pObj.lastSolvedAt) pObj.lastSolvedAt = new Date().toISOString();
                        pObj.status = solvedCount >= 10 ? 'VICTORY' : `CASE #${solvedCount + 1}`;
                    }
                }
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
            notifyListeners(list);
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

        // 2. Update local player list with actual solved cases from storage
        let solvedCount = 0;
        try {
            const saveRaw = localStorage.getItem('CASE_ABHEDYA_SAVE_V1');
            if (saveRaw) {
                const saveData = JSON.parse(saveRaw);
                if (saveData && Array.isArray(saveData.completedCases)) {
                    solvedCount = saveData.completedCases.length;
                }
            }
        } catch (e) {}

        const localList = getLocalPlayers();
        let existing = localList.find(p => p.id === playerId || p.username.toLowerCase() === cleanName.toLowerCase());

        if (!existing) {
            existing = {
                id: playerId,
                playerId: playerId,
                username: cleanName,
                casesSolved: solvedCount,
                currentCaseId: solvedCount + 1,
                lastSolvedAt: solvedCount > 0 ? new Date().toISOString() : null,
                createdAt: new Date().toISOString(),
                status: solvedCount >= 10 ? 'VICTORY' : (solvedCount > 0 ? `CASE #${solvedCount + 1}` : 'ACTIVE')
            };
            localList.push(existing);
        } else {
            existing.username = cleanName;
            if (solvedCount > (existing.casesSolved || 0)) {
                existing.casesSolved = solvedCount;
                if (!existing.lastSolvedAt) existing.lastSolvedAt = new Date().toISOString();
                existing.status = solvedCount >= 10 ? 'VICTORY' : `CASE #${solvedCount + 1}`;
            }
        }

        saveLocalPlayers(localList);

        // 3. Broadcast to Global Internet Cloud Relay (retained so Admin gets it instantly)
        broadcastCloudPlayer(existing);

        // 4. Sync to Cloud Firestore if connected
        if (isReady()) {
            try {
                const playerRef = db.collection(COLLECTION_NAME).doc(playerId);
                const docSnap = await playerRef.get();

                if (!docSnap.exists) {
                    await playerRef.set({
                        username: cleanName,
                        playerId: playerId,
                        casesSolved: existing.casesSolved || 0,
                        currentCaseId: existing.currentCaseId || 1,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        lastSolvedAt: existing.lastSolvedAt ? new Date(existing.lastSolvedAt) : null,
                        status: existing.status || 'ACTIVE'
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
            target.casesSolved = Math.max(target.casesSolved || 0, count);
            target.lastSolvedAt = nowIso;
            target.status = count >= 10 ? 'VICTORY' : `CASE #${count + 1}`;
        } else if (username) {
            target = {
                id: playerId || sanitizePlayerId(username),
                playerId: playerId || sanitizePlayerId(username),
                username: username,
                casesSolved: count,
                lastSolvedAt: nowIso,
                createdAt: nowIso,
                status: count >= 10 ? 'VICTORY' : `CASE #${count + 1}`
            };
            localList.push(target);
        }

        saveLocalPlayers(localList);

        // 2. Broadcast to Global Internet Cloud Relay
        broadcastCloudPlayer(target);

        // 3. Sync to Cloud Firestore if connected
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

    // Initialize auto-recovery & cloud relay
    getLocalPlayers();
    setTimeout(initCloudRelay, 100);

    return {
        isReady,
        registerPlayer,
        recordCaseSolved,
        getLocalPlayers,
        saveLocalPlayers,
        saveCustomConfig,
        getConfig,
        sanitizePlayerId,
        onPlayerUpdate,
        COLLECTION_NAME
    };
})();
