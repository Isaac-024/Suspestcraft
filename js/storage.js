/**
 * CASE: AARNA — STORAGE & PROGRESS MANAGER
 * Handles localStorage persistence with safe fallback and debug tools.
 */

const Storage = (function() {
    const STORAGE_KEY = 'CASE_AARNA_SAVE_V1';
    
    // Default initial state
    const defaultData = {
        unlockedCases: [1],
        completedCases: [],
        currentCaseId: 1,
        inspectedClues: {}, // { [caseId]: [clueIds...] }
        settings: {
            sfx: true,
            ambient: true,
            particles: true
        }
    };

    let memoryFallback = JSON.parse(JSON.stringify(defaultData));
    let isLocalStorageAvailable = true;

    // Test localStorage availability
    try {
        const testKey = '__test_storage__';
        window.localStorage.setItem(testKey, testKey);
        window.localStorage.removeItem(testKey);
    } catch (e) {
        console.warn('[Storage] localStorage is unavailable. Using in-memory fallback.', e);
        isLocalStorageAvailable = false;
    }

    /**
     * Load all saved data from storage
     */
    function load() {
        if (!isLocalStorageAvailable) {
            return memoryFallback;
        }

        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                save(defaultData);
                return JSON.parse(JSON.stringify(defaultData));
            }
            const parsed = JSON.parse(raw);
            return {
                unlockedCases: Array.isArray(parsed.unlockedCases) ? parsed.unlockedCases : [1],
                completedCases: Array.isArray(parsed.completedCases) ? parsed.completedCases : [],
                currentCaseId: typeof parsed.currentCaseId === 'number' ? parsed.currentCaseId : 1,
                inspectedClues: parsed.inspectedClues || {},
                settings: Object.assign({}, defaultData.settings, parsed.settings)
            };
        } catch (e) {
            console.error('[Storage] Error loading save data. Resetting to defaults.', e);
            return JSON.parse(JSON.stringify(defaultData));
        }
    }

    /**
     * Save current data to storage
     */
    function save(data) {
        if (!isLocalStorageAvailable) {
            memoryFallback = JSON.parse(JSON.stringify(data));
            return;
        }

        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error('[Storage] Error writing to localStorage', e);
        }
    }

    /**
     * Check if a case is unlocked
     */
    function isCaseUnlocked(caseId) {
        const data = load();
        return data.unlockedCases.includes(caseId);
    }

    /**
     * Check if a case is completed
     */
    function isCaseCompleted(caseId) {
        const data = load();
        return data.completedCases.includes(caseId);
    }

    /**
     * Mark a case as completed and unlock next case
     */
    function completeCase(caseId, nextCaseId) {
        const data = load();
        if (!data.completedCases.includes(caseId)) {
            data.completedCases.push(caseId);
        }
        if (nextCaseId && !data.unlockedCases.includes(nextCaseId)) {
            data.unlockedCases.push(nextCaseId);
        }
        if (nextCaseId) {
            data.currentCaseId = nextCaseId;
        }
        save(data);
    }

    /**
     * Mark a clue as inspected for a case
     */
    function markClueInspected(caseId, clueId) {
        const data = load();
        if (!data.inspectedClues[caseId]) {
            data.inspectedClues[caseId] = [];
        }
        if (!data.inspectedClues[caseId].includes(clueId)) {
            data.inspectedClues[caseId].push(clueId);
            save(data);
        }
    }

    /**
     * Get inspected clues for a case
     */
    function getInspectedClues(caseId) {
        const data = load();
        return data.inspectedClues[caseId] || [];
    }

    /**
     * Update a setting
     */
    function updateSetting(key, value) {
        const data = load();
        data.settings[key] = value;
        save(data);
    }

    /**
     * Get current settings
     */
    function getSettings() {
        const data = load();
        return data.settings;
    }

    /**
     * Reset all progress (Debug helper & Settings option)
     */
    function resetAllProgress() {
        save(defaultData);
        console.log('[Storage] Game progress has been reset.');
    }

    // Expose debug tool to global window
    window.resetGameProgress = function() {
        resetAllProgress();
        window.location.reload();
    };

    return {
        load,
        save,
        isCaseUnlocked,
        isCaseCompleted,
        completeCase,
        markClueInspected,
        getInspectedClues,
        updateSetting,
        getSettings,
        resetAllProgress
    };
})();
