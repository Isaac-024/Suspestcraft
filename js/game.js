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
     * Load Case and show Briefing Dashboard
     */
    function startCase(caseId) {
        const targetCase = getCaseById(caseId);
        if (!targetCase) {
            console.error(`[Game] Case #${caseId} not found.`);
            return;
        }

        if (!Storage.isCaseUnlocked(caseId)) {
            console.warn(`[Game] Case #${caseId} is locked.`);
            return;
        }

        currentCase = targetCase;
        setState(STATES.BRIEFING);
        UI.renderBriefing(currentCase);
        UI.showScreen('briefing');

        // Play Dimension Entrance Audio Trigger
        if (caseId === 1) {
            AudioEngine.playEnterLevel1();
        } else if (caseId === 4) {
            AudioEngine.playEnterLevel4();
        } else if (caseId === 7) {
            AudioEngine.playEnterLevel7();
        }
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

    function solveCase() {
        const isFinalCase = currentCase.id >= 10;

        if (isFinalCase) {
            AudioEngine.playGameComplete();
            Storage.completeCase(currentCase.id, null);
            setState(STATES.ENDING);
            UI.showScreen('grandFinale');
        } else {
            setState(STATES.CASE_SOLVED);
            AudioEngine.playLevelClear();
            const nextCaseId = currentCase.id + 1;
            Storage.completeCase(currentCase.id, nextCaseId);
            UI.renderCaseSolved(currentCase);
            UI.showScreen('caseSolved');
        }
    }

    function nextCase() {
        AudioEngine.playClick();
        if (!currentCase) return;

        if (currentCase.id < 10) {
            const nextId = currentCase.id + 1;
            startCase(nextId);
        } else {
            setState(STATES.ENDING);
            UI.showScreen('grandFinale');
        }
    }

    function continueGame() {
        AudioEngine.playContinue();
        const saveData = Storage.load();
        const unlocked = saveData.unlockedCases;
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