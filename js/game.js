/**
 * CASE: AARNA — CORE GAME STATE MACHINE & LOGIC ENGINE (js/game.js)
 * Implements game state loop, dimensional audio cues, TNT failure sequence, and case progression.
 */

const Game = (function () {
    // Game States Enum
    const STATES = {
        LOADING: 'LOADING',
        MENU: 'MENU',
        CASE_SELECT: 'CASE_SELECT',
        BRIEFING: 'BRIEFING',
        INVESTIGATION: 'INVESTIGATION',
        ACCUSATION: 'ACCUSATION',
        EXPLOSION: 'EXPLOSION',
        GAME_OVER: 'GAME_OVER',
        CASE_SOLVED: 'CASE_SOLVED',
        ENDING: 'ENDING'
    };

    let currentState = STATES.LOADING;
    let currentCase = null;
    let isSubmitting = false;

    // Competition Session State
    let competitionStatus = 'waiting';
    let competitionSession = null;
    let competitionTimerInterval = null;
    let unsubscribeGameSessionSnapshot = null;

    /**
     * Real-time listener for Firestore gameControl/session on student client
     */
    function initCompetitionListener() {
        if (unsubscribeGameSessionSnapshot) {
            unsubscribeGameSessionSnapshot();
            unsubscribeGameSessionSnapshot = null;
        }

        if (typeof db !== 'undefined' && db && typeof isFirebaseReady !== 'undefined' && isFirebaseReady) {
            try {
                unsubscribeGameSessionSnapshot = db.collection("gameControl").doc("session")
                    .onSnapshot((doc) => {
                        if (doc.exists) {
                            const data = doc.data();
                            if (data) handleCompetitionSession(data);
                        }
                    }, (err) => {
                        console.warn("[Game] Firestore session snapshot notice:", err.message);
                    });
            } catch (err) {
                console.warn("[Game] Firestore listener skipped:", err);
            }
        }

        if (typeof FirebaseService !== 'undefined' && FirebaseService.onSessionUpdate) {
            FirebaseService.onSessionUpdate((session) => {
                handleCompetitionSession(session);
            });
        }
    }

    /**
     * Handle Competition State Updates (waiting, running, locked)
     */
    function handleCompetitionSession(session) {
        if (!session || !session.status) return;
        competitionStatus = session.status;
        competitionSession = session;

        const hudTimer = document.getElementById('hud-competition-timer');
        const hudDigits = document.getElementById('hud-timer-digits');
        const waitingScreen = document.getElementById('waiting-screen');
        const lockoutScreen = document.getElementById('lockout-screen');

        if (competitionTimerInterval) {
            clearInterval(competitionTimerInterval);
            competitionTimerInterval = null;
        }

        if (session.status === 'running') {
            // Running: Show persistent HUD timer, allow investigation and solving
            if (lockoutScreen) lockoutScreen.style.display = 'none';
            if (waitingScreen) waitingScreen.style.display = 'none';
            if (hudTimer) hudTimer.style.display = 'inline-flex';

            const tick = () => {
                const now = Date.now();
                const remaining = Math.max(0, (session.endTime || (now + 600000)) - now);
                const totalSecs = Math.floor(remaining / 1000);
                const mins = Math.floor(totalSecs / 60);
                const secs = totalSecs % 60;
                const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

                if (hudDigits) {
                    hudDigits.textContent = timeStr;
                    if (remaining <= 60000) {
                        hudDigits.classList.add('urgent');
                    } else {
                        hudDigits.classList.remove('urgent');
                    }
                }

                if (remaining <= 0) {
                    if (competitionTimerInterval) {
                        clearInterval(competitionTimerInterval);
                        competitionTimerInterval = null;
                    }
                    handleCompetitionSession({ ...session, status: 'locked' });
                }
            };

            tick();
            competitionTimerInterval = setInterval(tick, 1000);

        } else if (session.status === 'locked') {
            // Locked: Immediately cut any active investigation and audio, show unclosable lockout screen
            AudioEngine.stopBGM();
            if (hudTimer) hudTimer.style.display = 'none';
            if (waitingScreen) waitingScreen.style.display = 'none';
            if (lockoutScreen) lockoutScreen.style.display = 'flex';

            // Close open dialogs if any
            if (typeof UI !== 'undefined' && UI.modals) {
                Object.values(UI.modals).forEach(m => {
                    if (m && m.open) UI.closeModal(m);
                });
            }

        } else {
            // Waiting: Display overlay or prevent starting new cases
            if (hudTimer) hudTimer.style.display = 'none';
            if (lockoutScreen) lockoutScreen.style.display = 'none';
            
            // If the student is already inside a case or briefing, show waiting screen
            if (currentState !== STATES.MENU && currentState !== STATES.LOADING) {
                if (waitingScreen) waitingScreen.style.display = 'flex';
            }
        }
    }

    function isCompetitionLocked() {
        return competitionStatus === 'locked';
    }

    function isCompetitionWaiting() {
        return competitionStatus === 'waiting';
    }

    /**
     * Set active state safely
     */
    function setState(newState) {
        console.log(`[Game] State Transition: ${currentState} -> ${newState}`);
        currentState = newState;
    }

    function getState() {
        return currentState;
    }

    /**
     * Show Main Menu (Sets underwater background)
     */
    function showMainMenu() {
        AudioEngine.stopBGM();
        setState(STATES.MENU);
        UI.setMenuTheme();
        UI.showScreen('menu');

        const saveData = Storage.load();
        const completed = saveData.completedCases;

        const statsTag = document.getElementById('quick-stats-tag');
        if (statsTag) {
            statsTag.textContent = `${completed.length}/10 SOLVED`;
        }
    }

    /**
     * Open Case Files Archive / Select Screen
     */
    function showCaseSelect() {
        if (isCompetitionLocked()) {
            const lockoutScreen = document.getElementById('lockout-screen');
            if (lockoutScreen) lockoutScreen.style.display = 'flex';
            return;
        }
        if (isCompetitionWaiting()) {
            const waitingScreen = document.getElementById('waiting-screen');
            if (waitingScreen) waitingScreen.style.display = 'flex';
            return;
        }

        AudioEngine.stopBGM();
        setState(STATES.CASE_SELECT);
        UI.setArchiveTheme();
        UI.showScreen('caseSelect');

        const saveData = Storage.load();
        const cases = getAllCases();
        UI.renderCaseSelectGrid(cases, saveData.unlockedCases, saveData.completedCases, (caseId) => {
            startCase(caseId);
        });
    }

    /**
     * Mobile phone detection helper
     */
    function isMobileDevice() {
        try {
            const uaMatch = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(navigator.userAgent);
            const smallPhone = window.innerWidth <= 600;
            return uaMatch || smallPhone;
        } catch (e) {
            return false;
        }
    }

    /**
     * Load Case and show Briefing Dashboard (With Level 10 Video Support on Desktop, auto-skipped on mobile)
     */
    function startCase(caseId) {
        if (isCompetitionLocked()) {
            const lockoutScreen = document.getElementById('lockout-screen');
            if (lockoutScreen) lockoutScreen.style.display = 'flex';
            return;
        }
        if (isCompetitionWaiting()) {
            const waitingScreen = document.getElementById('waiting-screen');
            if (waitingScreen) waitingScreen.style.display = 'flex';
            return;
        }

        const numericId = parseInt(caseId, 10);
        const targetCase = getCaseById(numericId);
        if (!targetCase) return;

        if (!Storage.isCaseUnlocked(numericId)) return;

        currentCase = targetCase;

        // Special Animation Trigger for Level 10 (Skipped on phones for smooth mobile performance)
        if (numericId === 10 && !isMobileDevice()) {
            playLevel10Animation(() => {
                transitionToBriefing(numericId);
            });
        } else {
            transitionToBriefing(numericId);
        }
    }

    function transitionToBriefing(numericId) {
        AudioEngine.stopBGM();
        setState(STATES.BRIEFING);
        UI.renderBriefing(currentCase);
        UI.showScreen('briefing');

        if (numericId === 1) {
            AudioEngine.playEnterLevel1();
        } else if (numericId === 4) {
            AudioEngine.playEnterLevel4();
        } else if (numericId === 7) {
            AudioEngine.playEnterLevel7();
        }
    }

    /**
     * Level 10 Video/Audio Sync (Plays full 22s video and audio completely, with optional skip button)
     */
    function playLevel10Animation(onComplete) {
        if (isMobileDevice()) {
            if (typeof onComplete === 'function') onComplete();
            return;
        }

        const overlay = document.getElementById('animation-overlay');
        const video = document.getElementById('lvl10-video');
        const audio = document.getElementById('lvl10-audio');
        const skipBtn = document.getElementById('btn-skip-anim');

        if (!overlay || !video || !audio) {
            if (typeof onComplete === 'function') onComplete();
            return;
        }

        let finished = false;
        let safetyTimer = null;

        const finish = () => {
            if (finished) return;
            finished = true;
            if (safetyTimer) clearTimeout(safetyTimer);
            overlay.hidden = true;
            try { video.pause(); } catch (e) {}
            if (typeof onComplete === 'function') onComplete();
        };

        overlay.hidden = false;
        video.currentTime = 0;
        audio.currentTime = 0;

        // Skip button handler
        if (skipBtn) {
            skipBtn.onclick = (e) => {
                e.stopPropagation();
                finish();
            };
        }

        // Play both video and audio simultaneously
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(e => {
                console.log("Video autoplay blocked or unavailable:", e);
                finish();
            });
        }
        audio.play().catch(e => console.log("Audio autoplay notice:", e));

        // When video reaches natural completion (~22s), finish cleanly
        video.onended = () => {
            console.log("[Level 10] Video finished playing completely.");
            finish();
        };

        // Generous safety timer (45 seconds) so the 22-second video is never cut off prematurely
        safetyTimer = setTimeout(finish, 45000);
    }

    /**
     * Enter Crime Scene Investigation Board
     */
    function beginInvestigation() {
        if (!currentCase) return;
        setState(STATES.INVESTIGATION);

        // Start Investigation Background Music
        AudioEngine.playBGM(currentCase.id);

        const inspectedList = Storage.getInspectedClues(currentCase.id);

        UI.renderInvestigation(
            currentCase,
            inspectedList,
            (clueKey, clueData) => {
                inspectClue(clueKey, clueData);
            },
            (suspect) => {
                UI.openSuspectModal(suspect);
            }
        );

        UI.showScreen('investigation');
    }

    /**
     * Inspect a specific crime scene clue
     */
    function inspectClue(clueKey, clueData) {
        if (!currentCase) return;

        Storage.markClueInspected(currentCase.id, clueKey);

        const inspectedList = Storage.getInspectedClues(currentCase.id);
        const totalClues = Object.keys(currentCase.evidence || {}).length || 3;
        UI.updateInspectedCount(inspectedList.length, totalClues);

        UI.openEvidenceModal(clueKey, clueData, currentCase);

        const inspectedListUpdated = Storage.getInspectedClues(currentCase.id);
        UI.renderInvestigation(
            currentCase,
            inspectedListUpdated,
            (k, d) => inspectClue(k, d),
            (s) => UI.openSuspectModal(s)
        );
    }

    /**
     * Open Accusation Screen
     */
    function openAccusation() {
        if (currentState !== STATES.INVESTIGATION) return;
        AudioEngine.playOpenAccuse();
        setState(STATES.ACCUSATION);
        UI.setupAccusationScreen(currentCase);
        UI.showScreen('accusation');
    }

    function cancelAccusation() {
        if (currentState !== STATES.ACCUSATION) return;
        beginInvestigation();
    }

    /**
     * Deliver Final Accusation
     */
    function submitAccusation(who, how, why) {
        if (isCompetitionLocked()) {
            const lockoutScreen = document.getElementById('lockout-screen');
            if (lockoutScreen) lockoutScreen.style.display = 'flex';
            return;
        }
        if (isCompetitionWaiting() || isSubmitting || currentState !== STATES.ACCUSATION || !currentCase) return;
        isSubmitting = true;

        const correct = currentCase.correctAnswer;
        const isWhoCorrect = who.trim() === correct.who.trim();
        const isHowCorrect = how.trim() === correct.how.trim();
        const isWhyCorrect = why.trim() === correct.why.trim();

        if (isWhoCorrect && isHowCorrect && isWhyCorrect) {
            setTimeout(() => {
                isSubmitting = false;
                solveCase();
            }, 300);
        } else {
            triggerTNTFailure();
        }
    }

    function showGameOver() {
        const overlay = document.getElementById('tnt-overlay');
        if (overlay) overlay.hidden = true;
        const tntWrapper = document.getElementById('tnt-block-image-wrapper');
        if (tntWrapper) tntWrapper.classList.remove('tnt-drop');

        isSubmitting = false;
        setState(STATES.GAME_OVER);
        if (currentCase) {
            UI.setDimensionTheme(currentCase.dimension);
            UI.renderGameOver(currentCase);
        }
        UI.showScreen('gameOver');

        // Let the white flash fade out smoothly over the mounted game over screen
        setTimeout(() => {
            document.body.classList.remove('flash-white');
        }, 80);
    }

    /**
     * TNT Failure Sequence (Audio starts immediately on drop)
     */
    function triggerTNTFailure() {
        AudioEngine.stopBGM();
        setState(STATES.EXPLOSION);

        const overlay = document.getElementById('tnt-overlay');
        const tntWrapper = document.getElementById('tnt-block-image-wrapper');
        const flashScreen = overlay ? overlay.querySelector('.tnt-flash-screen') : null;

        if (overlay) overlay.hidden = false;
        
        if (flashScreen) {
            flashScreen.classList.remove('flash-white', 'flash-explosion');
        }
        document.body.classList.remove('flash-white');

        // 1. PLAY AUDIO IMMEDIATELY AS TNT DROPS
        AudioEngine.playTntExplosion();

        if (tntWrapper) {
            // Restart the drop animation
            tntWrapper.classList.remove('tnt-drop');
            void tntWrapper.offsetWidth; 
            tntWrapper.classList.add('tnt-drop');

            // 2. Trigger the visual flash exactly at the animation climax (1.5s)
            setTimeout(() => {
                document.body.classList.add('flash-white');
                if (flashScreen) flashScreen.classList.add('flash-white');
                
                // 3. Immediately transition to Game Over UNDERNEATH the white flash mask
                setTimeout(() => {
                    showGameOver();
                }, 50); 
            }, 1500);
        }
    }

    const triggerTntFailureSequence = triggerTNTFailure;

    function respawnCase() {
        if (!currentCase) return;
        AudioEngine.playClick();
        beginInvestigation();
    }

    /**
     * Solve Case (Enforcing numbers to prevent "4" + "1" = "41" bug)
     */
    function solveCase() {
        if (isCompetitionLocked()) {
            console.warn('[Game] Competition is locked! Progress halted.');
            return;
        }

        AudioEngine.stopBGM();
        const currentId = parseInt(currentCase.id, 10);
        const isFinalCase = currentId >= 10;

        if (isFinalCase) {
            AudioEngine.playGameComplete();
            Storage.completeCase(currentId, null);
            setState(STATES.ENDING);
            UI.showScreen('grandFinale');
        } else {
            setState(STATES.CASE_SOLVED);
            AudioEngine.playLevelClear();
            
            const nextCaseId = currentId + 1; // Properly calculates 4 + 1 = 5
            Storage.completeCase(currentId, nextCaseId);
            
            UI.renderCaseSolved(currentCase);
            UI.showScreen('caseSolved');
        }

        // Sync progress to Firebase Cloud Leaderboard & Cloud Relay in real-time
        if (typeof FirebaseService !== 'undefined') {
            FirebaseService.recordCaseSolved(currentId);
        }
    }

    /**
     * Proceed to Next Case
     */
    function nextCase() {
        AudioEngine.playClick();
        if (!currentCase) return;

        const currentId = parseInt(currentCase.id, 10);
        
        if (currentId < 10) {
            const nextId = currentId + 1;
            // Force unlock just in case
            Storage.completeCase(currentId, nextId); 
            startCase(nextId);
        } else {
            setState(STATES.ENDING);
            UI.showScreen('grandFinale');
        }
    }

    /**
     * Continue highest unlocked case
     */
    function continueGame() {
        AudioEngine.playContinue();
        const saveData = Storage.load();
        
        // Convert all IDs to clean numbers before finding the max
        const unlocked = saveData.unlockedCases.map(id => parseInt(id, 10)).filter(id => !isNaN(id));
        const latestId = Math.max(...unlocked, 1);
        
        startCase(latestId);
    }

    return {
        STATES,
        getState,
        showMainMenu,
        showCaseSelect,
        startCase,
        beginInvestigation,
        inspectClue,
        openAccusation,
        cancelAccusation,
        submitAccusation,
        triggerTNTFailure,
        triggerTntFailureSequence,
        showGameOver,
        respawnCase,
        solveCase,
        nextCase,
        continueGame,
        initCompetitionListener,
        isCompetitionLocked,
        isCompetitionWaiting,
        handleCompetitionSession
    };
})();