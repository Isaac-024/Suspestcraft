/**
 * CASE: ABHEDYA — APPLICATION ENTRY POINT & EVENT BINDINGS (js/main.js)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Audio Engine
    AudioEngine.init();

    // 2. Setup All Event Listeners
    setupMenuEvents();
    setupBriefingEvents();
    setupInvestigationEvents();
    setupAccusationEvents();
    setupResultEvents();
    setupModalEvents();
    setupKeyboardEvents();
    setupGlobalClickSound();

    // 3. Run Animated 3-Second Loading Sequence
    runLoadingSequence(() => {
        Game.showMainMenu();
    });
});

/**
 * Animated Loading Sequence (3 seconds 0% -> 100%)
 */
function runLoadingSequence(onComplete) {
    const loadingBar = document.getElementById('loading-bar');
    const loadingPct = document.getElementById('loading-percentage');
    const loadingStatus = document.getElementById('loading-status-text');

    const duration = 3000;
    const startTime = performance.now();

    const statusSteps = [
        { pct: 20, text: 'INITIALIZING CONDUIT ARCHIVES...' },
        { pct: 45, text: 'SYNCHRONIZING OBSERVER LOGS...' },
        { pct: 70, text: 'ANALYZING VOXEL FOOTPRINTS...' },
        { pct: 90, text: 'VERIFYING DIMENSIONAL INTEGRITY...' },
        { pct: 100, text: 'INVESTIGATION PROTOCOL READY.' }
    ];

    function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const currentPct = Math.floor(progress * 100);

        if (loadingBar) loadingBar.style.width = `${currentPct}%`;
        if (loadingPct) loadingPct.textContent = `${currentPct}%`;

        const step = statusSteps.find(s => currentPct <= s.pct) || statusSteps[statusSteps.length - 1];
        if (loadingStatus && step) {
            loadingStatus.textContent = step.text;
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            setTimeout(() => {
                const loadingScreen = document.getElementById('screen-loading');
                if (loadingScreen) {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.hidden = true;
                        if (typeof onComplete === 'function') onComplete();
                    }, 350);
                }
            }, 250);
        }
    }
    requestAnimationFrame(update);
}

/**
 * Universal Click Handler Wrapper to prevent reloads
 */
function bindSafeClick(id, callback) {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            callback(e);
        });
    }
}

/**
 * 1. Main Menu Navigation
 */
function setupMenuEvents() {
    bindSafeClick('btn-new-game', () => Game.startCase(1));
    bindSafeClick('btn-continue', () => Game.continueGame());
    bindSafeClick('btn-case-files', () => Game.showCaseSelect());
    bindSafeClick('btn-close-case-select', () => Game.showMainMenu());
    bindSafeClick('btn-credits', () => {
        const modal = document.getElementById('modal-credits');
        if (modal) {
            if (typeof modal.showModal === 'function') modal.showModal();
            else modal.setAttribute('open', '');
        }
    });
}

/**
 * 2. Briefing Dashboard Events
 */
function setupBriefingEvents() {
    bindSafeClick('btn-back-briefing', () => Game.showCaseSelect());
    bindSafeClick('btn-begin-investigation', () => Game.beginInvestigation());
}

/**
 * 3. Investigation HUD & Controls
 */
function setupInvestigationEvents() {
    bindSafeClick('btn-hud-menu', () => Game.showCaseSelect());
    bindSafeClick('btn-open-notebook', () => {
        const saveData = Storage.load();
        const currentCaseId = saveData.currentCaseId || 1;
        const currentCase = getCaseById(currentCaseId) || getCaseById(1);
        const inspectedList = Storage.getInspectedClues(currentCase.id);
        UI.openNotebookModal(currentCase, inspectedList);
    });
    bindSafeClick('btn-ready-accuse', () => Game.openAccusation());
}

/**
 * 4. Accusation Selects & Submission
 */
function setupAccusationEvents() {
    const selectWho = document.getElementById('select-who');
    const selectHow = document.getElementById('select-how');
    const selectWhy = document.getElementById('select-why');
    const btnSubmit = document.getElementById('btn-submit-accuse');

    function checkAccusationReady() {
        const whoVal = selectWho.value;
        const howVal = selectHow.value;
        const whyVal = selectWhy.value;

        document.getElementById('preview-who').textContent = whoVal ? `SELECTED: ${whoVal}` : 'Awaiting suspect selection...';
        document.getElementById('preview-how').textContent = howVal ? `SELECTED: ${howVal}` : 'Awaiting method selection...';
        document.getElementById('preview-why').textContent = whyVal ? `SELECTED: ${whyVal}` : 'Awaiting motive selection...';

        const isReady = whoVal && howVal && whyVal;
        if (btnSubmit) {
            btnSubmit.disabled = !isReady;
        }
    }

    selectWho?.addEventListener('change', checkAccusationReady);
    selectHow?.addEventListener('change', checkAccusationReady);
    selectWhy?.addEventListener('change', checkAccusationReady);

    bindSafeClick('btn-cancel-accuse', () => Game.cancelAccusation());

    bindSafeClick('btn-submit-accuse', () => {
        if (!btnSubmit.disabled) {
            Game.submitAccusation(selectWho.value, selectHow.value, selectWhy.value);
        }
    });
}

/**
 * 5. Case Solved, Game Over & Grand Finale Events
 */
function setupResultEvents() {
    bindSafeClick('btn-solved-case-files', () => Game.showCaseSelect());
    bindSafeClick('btn-next-case', () => Game.nextCase());
    bindSafeClick('btn-respawn', () => Game.respawnCase());
    bindSafeClick('btn-gameover-menu', () => Game.showMainMenu());
    bindSafeClick('btn-finale-credits', () => {
        const modal = document.getElementById('modal-credits');
        if (modal) {
            if (typeof modal.showModal === 'function') modal.showModal();
            else modal.setAttribute('open', '');
        }
    });
    bindSafeClick('btn-finale-files', () => Game.showCaseSelect());
    bindSafeClick('btn-finale-restart', () => Game.startCase(1));
}

/**
 * 6. Modal Dialog Close Handlers
 */
function setupModalEvents() {
    const closeButtons = [
        'btn-close-evidence-modal', 'btn-done-inspecting',
        'btn-close-suspect-modal', 'btn-close-suspect-dossier',
        'btn-close-notebook-modal', 'btn-close-notebook-action',
        'btn-close-credits-modal', 'btn-close-credits-action'
    ];

    closeButtons.forEach(id => {
        bindSafeClick(id, (e) => {
            const targetModal = e.target.closest('dialog');
            if (targetModal) UI.closeModal(targetModal);
        });
    });
}

/**
 * 7. Universal Click Sound Trigger
 */
function setupGlobalClickSound() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('#btn-continue') || e.target.closest('#btn-ready-accuse')) {
            return;
        }
        const interactive = e.target.closest('button, [role="button"], select, .case-card, .suspect-card, .evidence-card, .btn-pixel-close');
        if (interactive) {
            AudioEngine.playClick();
        }
    });
}

/**
 * 8. Keyboard Accessibility
 */
function setupKeyboardEvents() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            Object.values(UI.modals).forEach(modal => {
                if (modal && modal.open) {
                    UI.closeModal(modal);
                }
            });
        }
    });
}