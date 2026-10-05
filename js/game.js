/**
 * CASE: ABHEDYA — CORE GAME STATE MACHINE & LOGIC ENGINE (js/game.js)
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
     * Load Case and show Briefing Dashboard (With Level 10 Video Support)
     */
    function startCase(caseId) {
        const numericId = parseInt(caseId, 10);
        const targetCase = getCaseById(numericId);
        if (!targetCase) return;

        if (!Storage.isCaseUnlocked(numericId)) return;

        currentCase = targetCase;

        // Special Animation Trigger for Level 10
        if (numericId === 10) {
            playLevel10Animation(() => {
                transitionToBriefing(numericId);
            });
        } else {
            transitionToBriefing(numericId);
        }
    }

    function transitionToBriefing(numericId) {
        setState(STATES.BRIEFING);
        UI.renderBriefing(currentCase);
        UI.showScreen('briefing');

        if (numericId === 1) AudioEngine.playEnterLevel1();
        else if (numericId === 4) AudioEngine.playEnterLevel4();
        else if (numericId === 7) AudioEngine.playEnterLevel7();
    }

    /**
     * Level 10 Video/Audio Sync
     */
    function playLevel10Animation(onComplete) {
        const overlay = document.getElementById('animation-overlay');
        const video = document.getElementById('lvl10-video');
        const audio = document.getElementById('lvl10-audio');

        if (!overlay || !video || !audio) {
            onComplete(); // Fallback if HTML is missing
            return;
        }

        overlay.hidden = false;
        video.currentTime = 0;
        audio.currentTime = 0;

        // Play both simultaneously
        video.play().catch(e => console.log("Video autoplay blocked:", e));
        audio.play().catch(e => console.log("Audio autoplay blocked:", e));

        // When the video ends, hide the video but let the longer audio keep playing!
        video.onended = () => {
            overlay.hidden = true;
            onComplete();
        };
    }

    /**
     * Enter Crime Scene Investigation Board
     */
    function beginInvestigation() {
        if (!currentCase) return;
        setState(STATES.INVESTIGATION);

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
        UI.updateInspectedCount(inspectedList.length, 7);

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
        if (isSubmitting || currentState !== STATES.ACCUSATION || !currentCase) return;
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
        const currentId = parseInt(currentCase.id, 10);
        const isFinalCase = currentId >= 10;

        // Sync progress to Firebase Cloud Leaderboard in real-time
        if (typeof FirebaseService !== 'undefined') {
            FirebaseService.recordCaseSolved(currentId);
        }

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
        continueGame
    };
})();