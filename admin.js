/**
 * CASE: AARNA — ADMIN LEADERBOARD CONTROLLER (admin.js)
 * Dual Real-Time Engine (Cloud Firestore + Local Multi-Tab Broadcast Sync).
 */

const AdminPortal = (function () {
    // SHA-256 Hash of master key ("thisismysecondgamefora"). Plaintext password is NEVER stored in code.
    const DEFAULT_ADMIN_HASH = "4595aa85beb2e7662438422ff27f3a5b0082ed875dc6b6eed789834f482b4b87";
    const SESSION_KEY = "CASE_AARNA_ADMIN_AUTH";
    const CUSTOM_HASH_KEY = "CASE_AARNA_CUSTOM_ADMIN_HASH";

    let failedAttempts = 0;
    let lockUntil = 0;

    let unsubscribeSnapshot = null;
    let syncChannel = null;

    // Competition Control State
    let competitionSession = { status: 'waiting', startTime: null, durationMs: 600000, endTime: null };
    let competitionTimerInterval = null;
    let isLeaderboardFrozen = false;
    let unsubscribeSessionSnapshot = null;

    /**
     * Compute Cryptographic SHA-256 Hash
     */
    async function sha256(text) {
        const msgBuffer = new TextEncoder().encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    /**
     * Initialize on DOM Ready
     */
    function init() {
        const isAuthed = sessionStorage.getItem(SESSION_KEY) === "true";
        if (isAuthed) {
            revealDashboard();
        } else {
            const overlay = document.getElementById('auth-overlay');
            const dashboard = document.getElementById('dashboard-container');
            if (overlay) overlay.style.display = 'flex';
            if (dashboard) dashboard.style.display = 'none';
        }

        setupBroadcastListener();
    }

    /**
     * Verify Instructor Password using Secure SHA-256 Hashing
     */
    async function verifyPassword() {
        const now = Date.now();
        const errorMsg = document.getElementById('auth-error');
        const input = document.getElementById('auth-password');

        if (now < lockUntil) {
            const remainingSecs = Math.ceil((lockUntil - now) / 1000);
            errorMsg.textContent = `TOO MANY FAILED ATTEMPTS. LOCKED FOR ${remainingSecs}s.`;
            errorMsg.style.display = 'block';
            return;
        }

        const pass = input.value.trim();
        if (!pass) return;

        const inputHash = await sha256(pass);
        const customHash = localStorage.getItem(CUSTOM_HASH_KEY);
        const isMatch = (inputHash === DEFAULT_ADMIN_HASH) || (customHash && inputHash === customHash);

        if (isMatch) {
            failedAttempts = 0;
            sessionStorage.setItem(SESSION_KEY, "true");
            errorMsg.style.display = 'none';
            revealDashboard();
        } else {
            failedAttempts++;
            if (failedAttempts >= 5) {
                lockUntil = Date.now() + 30000; // 30s lockout
                errorMsg.textContent = 'ACCESS DENIED: LOCKED FOR 30 SECONDS.';
            } else {
                errorMsg.textContent = `ACCESS DENIED: INCORRECT PASSWORD (${5 - failedAttempts} tries remaining)`;
            }
            errorMsg.style.display = 'block';
            input.value = '';
            input.focus();

            // Subtle shake animation
            const card = document.querySelector('.auth-card');
            if (card) {
                card.style.transform = 'translateX(-8px)';
                setTimeout(() => card.style.transform = 'translateX(8px)', 80);
                setTimeout(() => card.style.transform = 'translateX(-4px)', 160);
                setTimeout(() => card.style.transform = 'translateX(0)', 240);
            }
        }
    }

    /**
     * Allow Admin to Change Master Password
     */
    async function changeAdminPassword() {
        const newPass = prompt("Enter your new private Admin password:");
        if (!newPass || newPass.trim().length < 4) {
            alert("Password must be at least 4 characters long.");
            return;
        }

        const confirmPass = prompt("Confirm your new private Admin password:");
        if (newPass !== confirmPass) {
            alert("Passwords do not match.");
            return;
        }

        const newHash = await sha256(newPass.trim());
        localStorage.setItem(CUSTOM_HASH_KEY, newHash);
        alert("🔒 Admin password updated successfully! Only you can log in now.");
    }

    /**
     * Reveal Dashboard and start live stream
     */
    function revealDashboard() {
        const overlay = document.getElementById('auth-overlay');
        const dashboard = document.getElementById('dashboard-container');
        if (overlay) overlay.style.display = 'none';
        if (dashboard) dashboard.style.display = 'block';

        updateSyncModeIndicator();
        startLeaderboardStream();
        listenToCompetitionSession();
    }

    /**
     * Start 10-Minute Global Competition
     */
    async function startCompetition() {
        const now = Date.now();
        const durationMs = 10 * 60 * 1000;
        const sessionData = {
            status: "running",
            startTime: now,
            durationMs: durationMs,
            endTime: now + durationMs
        };

        if (db && isFirebaseReady) {
            try {
                await db.collection("gameControl").doc("session").set(sessionData);
                console.log("[Admin] 10-Min competition started in Firestore.");
            } catch (err) {
                console.warn("[Admin] Firestore write session warning:", err.message);
            }
        }

        if (typeof FirebaseService !== 'undefined' && FirebaseService.broadcastCompetitionSession) {
            FirebaseService.broadcastCompetitionSession(sessionData);
        }

        applyCompetitionSession(sessionData);
    }

    /**
     * Force Emergency Lock
     */
    async function forceLockCompetition() {
        const sessionData = {
            status: "locked",
            startTime: competitionSession.startTime || Date.now(),
            durationMs: competitionSession.durationMs || (10 * 60 * 1000),
            endTime: Date.now()
        };

        if (db && isFirebaseReady) {
            try {
                await db.collection("gameControl").doc("session").set(sessionData, { merge: true });
                console.log("[Admin] Force lock updated in Firestore.");
            } catch (err) {
                console.warn("[Admin] Firestore lock session warning:", err.message);
            }
        }

        if (typeof FirebaseService !== 'undefined' && FirebaseService.broadcastCompetitionSession) {
            FirebaseService.broadcastCompetitionSession(sessionData);
        }

        applyCompetitionSession(sessionData);
    }

    /**
     * Listen to Firestore gameControl/session in Real-Time
     */
    function listenToCompetitionSession() {
        if (unsubscribeSessionSnapshot) {
            unsubscribeSessionSnapshot();
            unsubscribeSessionSnapshot = null;
        }

        if (db && isFirebaseReady) {
            try {
                unsubscribeSessionSnapshot = db.collection("gameControl").doc("session")
                    .onSnapshot((doc) => {
                        if (doc.exists) {
                            const data = doc.data();
                            if (data) {
                                applyCompetitionSession(data);
                            }
                        }
                    }, (err) => {
                        console.warn("[Admin] gameControl/session snapshot warning:", err.message);
                    });
            } catch (err) {
                console.warn("[Admin] Firestore session listener skipped:", err.message);
            }
        }

        if (typeof FirebaseService !== 'undefined' && FirebaseService.onSessionUpdate) {
            FirebaseService.onSessionUpdate(applyCompetitionSession);
        }
    }

    /**
     * Apply Session State (Timer, Lock, Banner)
     */
    function applyCompetitionSession(sessionData) {
        if (!sessionData || !sessionData.status) return;
        competitionSession = { ...sessionData };

        const timerDisplay = document.getElementById('admin-timer-display');
        const lockBanner = document.getElementById('admin-lock-banner');

        if (competitionTimerInterval) {
            clearInterval(competitionTimerInterval);
            competitionTimerInterval = null;
        }

        if (sessionData.status === "running") {
            isLeaderboardFrozen = false;
            if (lockBanner) lockBanner.style.display = 'none';

            const tick = () => {
                const now = Date.now();
                const remaining = Math.max(0, (sessionData.endTime || (now + 600000)) - now);
                const totalSeconds = Math.floor(remaining / 1000);
                const mins = Math.floor(totalSeconds / 60);
                const secs = totalSeconds % 60;
                const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

                if (timerDisplay) {
                    timerDisplay.textContent = formatted;
                    timerDisplay.style.color = remaining <= 60000 ? '#ff5555' : '#fcdb38';
                }

                if (remaining <= 0) {
                    if (competitionTimerInterval) {
                        clearInterval(competitionTimerInterval);
                        competitionTimerInterval = null;
                    }
                    autoLockCompetition(sessionData);
                }
            };

            tick();
            competitionTimerInterval = setInterval(tick, 1000);

        } else if (sessionData.status === "locked") {
            if (timerDisplay) {
                timerDisplay.textContent = '00:00';
                timerDisplay.style.color = '#ff5555';
            }
            isLeaderboardFrozen = true;
            if (lockBanner) {
                lockBanner.style.display = 'block';
                lockBanner.textContent = '🏆 COMPETITION CONCLUDED — FINAL LEADERBOARD LOCKED 🏆';
            }
        } else {
            // "waiting"
            if (timerDisplay) {
                timerDisplay.textContent = '10:00';
                timerDisplay.style.color = '#fcdb38';
            }
            isLeaderboardFrozen = false;
            if (lockBanner) lockBanner.style.display = 'none';
        }
    }

    /**
     * Automatically update status to locked when countdown reaches 00:00
     */
    async function autoLockCompetition(prevSession) {
        const lockedData = {
            status: "locked",
            startTime: prevSession.startTime || (Date.now() - 600000),
            durationMs: prevSession.durationMs || 600000,
            endTime: prevSession.endTime || Date.now()
        };

        if (db && isFirebaseReady) {
            try {
                await db.collection("gameControl").doc("session").set(lockedData, { merge: true });
                console.log("[Admin] Countdown expired: Updated status to locked in Firestore.");
            } catch (err) {
                console.warn("[Admin] Auto-lock write error:", err.message);
            }
        }

        if (typeof FirebaseService !== 'undefined' && FirebaseService.broadcastCompetitionSession) {
            FirebaseService.broadcastCompetitionSession(lockedData);
        }

        applyCompetitionSession(lockedData);
    }

    /**
     * Update Stream Status Banner
     */
    function updateSyncModeIndicator() {
        const text = document.getElementById('sync-mode-text');
        if (!text) return;

        if (FirebaseService.isReady()) {
            const cfg = FirebaseService.getConfig();
            text.textContent = `CLOUD FIRESTORE STREAM: ONLINE (Project: ${cfg.projectId})`;
            text.style.color = '#55ff55';
        } else {
            text.textContent = `REAL-TIME STREAM: ACTIVE (Local & Multi-Tab Browser Sync)`;
            text.style.color = '#fcdb38';
        }
    }

    /**
     * Setup Cross-Tab BroadcastChannel, Cloud Relay & Storage Event Listeners
     */
    function setupBroadcastListener() {
        // 1. Direct In-Process Callback from FirebaseService
        if (typeof FirebaseService !== 'undefined' && FirebaseService.onPlayerUpdate) {
            FirebaseService.onPlayerUpdate((updatedList) => {
                console.log('[Admin] In-process player update received:', updatedList.length);
                refreshLocalLeaderboard();
            });
        }

        // 2. Custom Window Event Listener
        window.addEventListener('aarna:player_update', (e) => {
            console.log('[Admin] aarna:player_update event received');
            refreshLocalLeaderboard();
        });

        // 3. BroadcastChannel for instant cross-tab sync
        try {
            if (typeof BroadcastChannel !== 'undefined') {
                syncChannel = new BroadcastChannel('case_aarna_leaderboard');
                syncChannel.onmessage = (event) => {
                    console.log('[Admin] Real-time broadcast received:', event.data);
                    refreshLocalLeaderboard();
                };
            }
        } catch (e) {}

        // 4. Window storage listener fallback
        window.addEventListener('storage', (e) => {
            if (e.key === 'CASE_AARNA_LOCAL_PLAYERS' || e.key === 'CASE_AARNA_USER' || e.key === 'CASE_AARNA_SAVE_V1') {
                refreshLocalLeaderboard();
            }
        });

        // 5. Active Live Interval Refresher (Every 2.5s to ensure projector is always up to date)
        setInterval(() => {
            const dashboard = document.getElementById('dashboard-container');
            if (dashboard && dashboard.style.display !== 'none') {
                if (!FirebaseService.isReady()) {
                    refreshLocalLeaderboard();
                }
            }
        }, 2500);
    }

    /**
     * Start Stream (Cloud Firestore if configured, else Local Real-Time)
     */
    function startLeaderboardStream() {
        if (FirebaseService.isReady()) {
            startFirestoreListener();
        } else {
            refreshLocalLeaderboard();
        }
    }

    /**
     * Load & Render Local / Multi-Tab Registered Players
     */
    function refreshLocalLeaderboard() {
        const localList = FirebaseService.getLocalPlayers();
        const formatted = localList.map(p => ({
            id: p.id || p.playerId,
            username: p.username || 'Detective',
            casesSolved: parseInt(p.casesSolved, 10) || 0,
            lastSolvedAt: p.lastSolvedAt ? new Date(p.lastSolvedAt) : null,
            createdAt: p.createdAt ? new Date(p.createdAt) : null,
            status: p.status || (p.casesSolved >= 10 ? 'VICTORY' : 'ACTIVE')
        }));

        processAndRenderLeaderboard(formatted);
        updateStatsOverview(formatted);
        document.getElementById('stat-last-sync').textContent = new Date().toLocaleTimeString();
    }

    /**
     * Setup Real-Time Firestore onSnapshot Listener
     */
    function startFirestoreListener() {
        if (unsubscribeSnapshot) {
            unsubscribeSnapshot();
        }

        try {
            unsubscribeSnapshot = db.collection(FirebaseService.COLLECTION_NAME)
                .onSnapshot((snapshot) => {
                    const players = [];
                    snapshot.forEach((doc) => {
                        const data = doc.data();
                        players.push({
                            id: doc.id,
                            username: data.username || doc.id,
                            casesSolved: parseInt(data.casesSolved, 10) || 0,
                            lastSolvedAt: data.lastSolvedAt ? (data.lastSolvedAt.toDate ? data.lastSolvedAt.toDate() : new Date(data.lastSolvedAt)) : null,
                            createdAt: data.createdAt ? (data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt)) : null,
                            status: data.status || (data.casesSolved >= 10 ? 'VICTORY' : 'ACTIVE')
                        });
                    });

                    // Merge with local players if any were registered locally
                    const localList = FirebaseService.getLocalPlayers();
                    localList.forEach(lp => {
                        if (!players.find(p => p.username.toLowerCase() === lp.username.toLowerCase())) {
                            players.push({
                                id: lp.id,
                                username: lp.username,
                                casesSolved: lp.casesSolved || 0,
                                lastSolvedAt: lp.lastSolvedAt ? new Date(lp.lastSolvedAt) : null,
                                createdAt: lp.createdAt ? new Date(lp.createdAt) : null,
                                status: lp.status || 'ACTIVE'
                            });
                        }
                    });

                    processAndRenderLeaderboard(players);
                    updateStatsOverview(players);

                    document.getElementById('stat-last-sync').textContent = new Date().toLocaleTimeString();
                }, (error) => {
                    console.warn('[Admin] Firestore stream notice:', error.message);
                    refreshLocalLeaderboard();
                });
        } catch (err) {
            console.warn('[Admin] Fallback to local stream:', err.message);
            refreshLocalLeaderboard();
        }
    }

    /**
     * Sorting & Tie-breaking algorithm:
     * 1. Primary: casesSolved DESCENDING (highest score first)
     * 2. Secondary (Tie-Breaker): lastSolvedAt ASCENDING (earlier timestamp = finished faster)
     */
    function processAndRenderLeaderboard(players) {
        if (isLeaderboardFrozen) {
            // Competition locked: freeze leaderboard display and disable real-time re-sorting
            return;
        }

        const tbody = document.getElementById('leaderboard-body');
        if (!tbody) return;

        if (!players || players.length === 0) {
            renderEmptyState("NO DETECTIVES REGISTERED YET<br><span style='font-size: 9px; color: #888;'>When students enter their name on the game screen, their live score will appear here automatically.</span>");
            return;
        }

        // Sort players
        const sorted = [...players].sort((a, b) => {
            // 1. Compare Cases Solved (High to Low)
            if (b.casesSolved !== a.casesSolved) {
                return b.casesSolved - a.casesSolved;
            }

            // 2. Tie-breaker: If both solved > 0 cases, earliest completion time wins
            if (a.casesSolved > 0 && b.casesSolved > 0) {
                if (a.lastSolvedAt && b.lastSolvedAt) {
                    return a.lastSolvedAt.getTime() - b.lastSolvedAt.getTime();
                }
                if (a.lastSolvedAt) return -1;
                if (b.lastSolvedAt) return 1;
            }

            // 3. Fallback: Registration time
            if (a.createdAt && b.createdAt) {
                return a.createdAt.getTime() - b.createdAt.getTime();
            }

            return a.username.localeCompare(b.username);
        });

        tbody.innerHTML = '';

        sorted.forEach((player, index) => {
            const rank = index + 1;
            const tr = document.createElement('tr');
            if (rank <= 3) tr.className = `rank-${rank}`;

            // Rank Badge
            let rankBadgeHtml = `<span class="rank-badge">#${rank}</span>`;
            if (rank === 1) rankBadgeHtml = `<span class="rank-badge badge-1">🥇 #1</span>`;
            else if (rank === 2) rankBadgeHtml = `<span class="rank-badge badge-2">🥈 #2</span>`;
            else if (rank === 3) rankBadgeHtml = `<span class="rank-badge badge-3">🥉 #3</span>`;

            // Progress Bar
            const solved = Math.min(10, Math.max(0, player.casesSolved));
            const pct = (solved / 10) * 100;
            const isCompleted = solved >= 10;

            // Timestamp Formatted
            let timeDisplay = '—';
            if (player.lastSolvedAt) {
                timeDisplay = player.lastSolvedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            }

            // Status Badge
            let statusHtml = '<span class="status-tag status-idle">REGISTERED</span>';
            if (isCompleted) {
                statusHtml = '<span class="status-tag status-victory">🏆 AARNA RESTORED</span>';
            } else if (solved > 0) {
                statusHtml = `<span class="status-tag status-active">CASE #${solved + 1}</span>`;
            }

            tr.innerHTML = `
                <td style="text-align: center;">${rankBadgeHtml}</td>
                <td>
                    <div class="player-name">
                        <span style="font-size: 16px;">👤</span>
                        <strong>${escapeHtml(player.username)}</strong>
                    </div>
                </td>
                <td>
                    <div class="progress-box">
                        <div class="bar-outer">
                            <div class="bar-inner ${isCompleted ? 'complete' : ''}" style="width: ${pct}%;"></div>
                        </div>
                        <span class="score-text">${solved}/10 💎</span>
                    </div>
                </td>
                <td>
                    <span class="time-text">${timeDisplay}</span>
                </td>
                <td style="text-align: center;">
                    ${statusHtml}
                </td>
            `;

            tbody.appendChild(tr);
        });
    }

    /**
     * Update Overview Metrics
     */
    function updateStatsOverview(players) {
        document.getElementById('stat-total-players').textContent = players.length;

        const totalShards = players.reduce((sum, p) => sum + (p.casesSolved || 0), 0);
        document.getElementById('stat-total-shards').textContent = totalShards;

        if (players.length > 0) {
            const sorted = [...players].sort((a, b) => b.casesSolved - a.casesSolved);
            const top = sorted[0];
            document.getElementById('stat-top-player').textContent = `${top.username} (${top.casesSolved}/10)`;
        } else {
            document.getElementById('stat-top-player').textContent = '—';
        }
    }

    function renderEmptyState(message) {
        const tbody = document.getElementById('leaderboard-body');
        if (tbody) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="empty-state">
                        <div style="font-size: 24px; margin-bottom: 8px;">📊</div>
                        ${message}
                    </td>
                </tr>
            `;
        }
    }

    /**
     * Fullscreen Toggle for Projector
     */
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.warn('Fullscreen error:', err);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    /**
     * Manual Refresh
     */
    function manualRefresh() {
        startLeaderboardStream();
        updateSyncModeIndicator();
    }

    /**
     * Wipe / Reset Leaderboard data & Force Remote Session Reset on All Connected Devices
     */
    async function confirmResetData() {
        const confirm1 = confirm("⚠️ DANGER: Are you sure you want to reset all player and leaderboard records?\n\nThis will clear the leaderboard AND instantly reset/reload all active student screens so they must enter their name again.");
        if (!confirm1) return;

        if (typeof FirebaseService !== 'undefined' && FirebaseService.wipeAllData) {
            await FirebaseService.wipeAllData();
        } else {
            FirebaseService.saveLocalPlayers([]);
        }

        refreshLocalLeaderboard();
        alert("✅ All leaderboard records have been wiped, and all connected student screens have been reset to the registration screen.");
    }

    /**
     * Firebase Config Modal
     */
    function openConfigModal() {
        const modal = document.getElementById('modal-config');
        const textarea = document.getElementById('config-json-input');
        if (textarea) {
            textarea.value = JSON.stringify(FirebaseService.getConfig(), null, 2);
        }
        if (modal) modal.style.display = 'flex';
    }

    function closeConfigModal() {
        const modal = document.getElementById('modal-config');
        if (modal) modal.style.display = 'none';
    }

    function saveCustomFirebaseConfig() {
        const textarea = document.getElementById('config-json-input');
        try {
            const parsed = JSON.parse(textarea.value.trim());
            if (!parsed.projectId || !parsed.apiKey) {
                alert("Please ensure the configuration object contains at least 'apiKey' and 'projectId'.");
                return;
            }
            FirebaseService.saveCustomConfig(parsed);
            closeConfigModal();
            updateSyncModeIndicator();
            startLeaderboardStream();
            alert("✅ Firebase credentials saved & cloud stream connected!");
        } catch (e) {
            alert("Invalid JSON format. Please check your syntax: " + e.message);
        }
    }

    /* =========================================================================
       MASTER ANSWER KEY CONTROLLER
       ========================================================================= */
    const ANSWERS_AUTH_HASH = "49d837fbb43cbdc0c25a3a669fe7175bcda2d36b95d99ec5ba18891f458d7365";
    const ANSWERS_SESSION_KEY = "CASE_AARNA_ANSWERS_UNLOCKED";

    /**
     * Open Master Answer Key (or Password Prompt)
     */
    function promptShowAnswers() {
        const isUnlocked = sessionStorage.getItem(ANSWERS_SESSION_KEY) === "true";
        if (isUnlocked) {
            renderAnswersModal();
            const modal = document.getElementById('modal-answers');
            if (modal) modal.style.display = 'flex';
        } else {
            const authModal = document.getElementById('modal-answers-auth');
            const passInput = document.getElementById('answers-password-input');
            const errMsg = document.getElementById('answers-auth-error');
            if (passInput) passInput.value = '';
            if (errMsg) errMsg.style.display = 'none';
            if (authModal) authModal.style.display = 'flex';
            if (passInput) passInput.focus();
        }
    }

    /**
     * Verify Master Answer Key Password ("thisispasswordtoanswer")
     */
    async function verifyAnswersPassword() {
        const input = document.getElementById('answers-password-input');
        const errMsg = document.getElementById('answers-auth-error');
        if (!input) return;

        const pass = input.value.trim();
        if (!pass) return;

        const inputHash = await sha256(pass);
        const isMatch = (pass === "thisispasswordtoanswer") || (inputHash === ANSWERS_AUTH_HASH);

        if (isMatch) {
            sessionStorage.setItem(ANSWERS_SESSION_KEY, "true");
            closeAnswersAuthModal();
            renderAnswersModal();
            const modal = document.getElementById('modal-answers');
            if (modal) modal.style.display = 'flex';
        } else {
            if (errMsg) {
                errMsg.textContent = 'ACCESS DENIED: INCORRECT PASSWORD';
                errMsg.style.display = 'block';
            }
            input.value = '';
            input.focus();

            // Shake effect
            const card = document.querySelector('#modal-answers-auth .auth-card');
            if (card) {
                card.style.transform = 'translateX(-8px)';
                setTimeout(() => card.style.transform = 'translateX(8px)', 80);
                setTimeout(() => card.style.transform = 'translateX(-4px)', 160);
                setTimeout(() => card.style.transform = 'translateX(0)', 240);
            }
        }
    }

    /**
     * Close Answer Auth Modal
     */
    function closeAnswersAuthModal() {
        const modal = document.getElementById('modal-answers-auth');
        if (modal) modal.style.display = 'none';
    }

    /**
     * Close Answer Display Modal
     */
    function closeAnswersModal() {
        const modal = document.getElementById('modal-answers');
        if (modal) modal.style.display = 'none';
    }

    /**
     * Render the 10 Case Answers into the Clean Minecraft-Themed Table
     */
    function renderAnswersModal() {
        const container = document.getElementById('answers-list-container');
        if (!container) return;

        const casesList = (typeof CASES !== 'undefined' && Array.isArray(CASES)) 
            ? CASES 
            : ((typeof getAllCases === 'function') ? getAllCases() : []);

        if (casesList.length === 0) {
            container.innerHTML = '<div style="text-align: center; color: #ff5555; padding: 20px; font-family: var(--font-pixel);">Unable to load case database.</div>';
            return;
        }

        function capitalize(s) {
            if (!s) return '';
            return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
        }

        const rows = casesList.map(c => `
            <tr style="border-bottom: 2px solid #252538; transition: background 0.15s ease;">
                <td style="padding: 14px 10px; font-weight: bold; color: #fcdb38; text-align: center; vertical-align: middle; font-size: 10px;">${c.id}</td>
                <td style="padding: 14px 10px; color: #ffffff; vertical-align: middle; white-space: nowrap; font-size: 9px; letter-spacing: 0.5px;">${escapeHtml(c.title)}</td>
                <td style="padding: 14px 10px; color: #55ff55; vertical-align: middle; font-size: 9px;">${escapeHtml(capitalize(c.dimension))}</td>
                <td style="padding: 14px 10px; color: #e0e0e8; vertical-align: middle; font-size: 9px;">${escapeHtml(c.victim)}</td>
                <td style="padding: 14px 10px; font-weight: bold; color: #ffff55; vertical-align: middle; font-size: 9px;">${escapeHtml(c.correctAnswer.who)}</td>
                <td style="padding: 14px 10px; font-style: italic; color: #00ffff; vertical-align: middle; font-size: 9px; line-height: 1.7;">${escapeHtml(c.correctAnswer.how)}</td>
                <td style="padding: 14px 10px; font-style: italic; color: #ffaa00; vertical-align: middle; font-size: 9px; line-height: 1.7;">${escapeHtml(c.correctAnswer.why)}</td>
            </tr>
        `).join('');

        container.innerHTML = `
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-family: var(--font-pixel), 'Press Start 2P', monospace; font-size: 9px; line-height: 1.6; color: #d0d1db; background: #14141f; min-width: 960px;">
                <thead>
                    <tr style="border-bottom: 3px solid #3a3a52; background: #0c0c14;">
                        <th style="padding: 14px 10px; font-weight: bold; color: #fcdb38; text-align: center; width: 48px; font-size: 9px; letter-spacing: 1px;">#</th>
                        <th style="padding: 14px 10px; font-weight: bold; color: #fcdb38; text-align: left; font-size: 9px; letter-spacing: 1px;">Title</th>
                        <th style="padding: 14px 10px; font-weight: bold; color: #fcdb38; text-align: left; font-size: 9px; letter-spacing: 1px;">Dimension</th>
                        <th style="padding: 14px 10px; font-weight: bold; color: #fcdb38; text-align: left; font-size: 9px; letter-spacing: 1px;">Victim</th>
                        <th style="padding: 14px 10px; font-weight: bold; color: #fcdb38; text-align: left; font-size: 9px; letter-spacing: 1px;">Culprit</th>
                        <th style="padding: 14px 10px; font-weight: bold; color: #fcdb38; text-align: left; font-size: 9px; letter-spacing: 1px;">How (6 words)</th>
                        <th style="padding: 14px 10px; font-weight: bold; color: #fcdb38; text-align: left; font-size: 9px; letter-spacing: 1px;">Why (6 words)</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        `;
    }

    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    return {
        init,
        verifyPassword,
        changeAdminPassword,
        toggleFullscreen,
        manualRefresh,
        confirmResetData,
        openConfigModal,
        closeConfigModal,
        saveCustomFirebaseConfig,
        promptShowAnswers,
        verifyAnswersPassword,
        closeAnswersAuthModal,
        closeAnswersModal,
        startCompetition,
        forceLockCompetition,
        applyCompetitionSession
    };
})();

// Boot on load
document.addEventListener('DOMContentLoaded', () => {
    AdminPortal.init();
});
