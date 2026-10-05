/**
 * CASE: ABHEDYA — ADMIN LEADERBOARD CONTROLLER (admin.js)
 * Dual Real-Time Engine (Cloud Firestore + Local Multi-Tab Broadcast Sync).
 */

const AdminPortal = (function () {
    // SHA-256 Hash of default master key ("admin123"). Plaintext password is NEVER stored in code.
    const DEFAULT_ADMIN_HASH = "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9";
    const SESSION_KEY = "CASE_ABHEDYA_ADMIN_AUTH";
    const CUSTOM_HASH_KEY = "CASE_ABHEDYA_CUSTOM_ADMIN_HASH";

    let failedAttempts = 0;
    let lockUntil = 0;

    let unsubscribeSnapshot = null;
    let syncChannel = null;

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
        const storedHash = localStorage.getItem(CUSTOM_HASH_KEY) || DEFAULT_ADMIN_HASH;

        if (inputHash === storedHash) {
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
        window.addEventListener('abhedya:player_update', (e) => {
            console.log('[Admin] abhedya:player_update event received');
            refreshLocalLeaderboard();
        });

        // 3. BroadcastChannel for instant cross-tab sync
        try {
            if (typeof BroadcastChannel !== 'undefined') {
                syncChannel = new BroadcastChannel('case_abhedya_leaderboard');
                syncChannel.onmessage = (event) => {
                    console.log('[Admin] Real-time broadcast received:', event.data);
                    refreshLocalLeaderboard();
                };
            }
        } catch (e) {}

        // 4. Window storage listener fallback
        window.addEventListener('storage', (e) => {
            if (e.key === 'CASE_ABHEDYA_LOCAL_PLAYERS' || e.key === 'CASE_ABHEDYA_USER' || e.key === 'CASE_ABHEDYA_SAVE_V1') {
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
                statusHtml = '<span class="status-tag status-victory">🏆 ABHEDYA RESTORED</span>';
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

    function escapeHtml(text) {
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
        saveCustomFirebaseConfig
    };
})();

// Boot on load
document.addEventListener('DOMContentLoaded', () => {
    AdminPortal.init();
});
