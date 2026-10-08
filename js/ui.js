/**
 * CASE: AARNA — USER INTERFACE ENGINE (js/ui.js)
 * Manages DOM rendering, screens, modal dialogs, blueprint schematics, and form states.
 * Uses pure HTML/CSS without Canvas.
 */

const UI = (function() {
    // Screen Elements Cache
    const screens = {
        loading: document.getElementById('screen-loading'),
        menu: document.getElementById('screen-menu'),
        caseSelect: document.getElementById('screen-case-select'),
        briefing: document.getElementById('screen-briefing'),
        investigation: document.getElementById('screen-investigation'),
        accusation: document.getElementById('screen-accusation'),
        caseSolved: document.getElementById('screen-case-solved'),
        gameOver: document.getElementById('screen-game-over'),
        grandFinale: document.getElementById('screen-grand-finale')
    };

    // Modal Elements Cache
    const modals = {
        evidence: document.getElementById('modal-evidence'),
        suspect: document.getElementById('modal-suspect'),
        notebook: document.getElementById('modal-notebook'),
        credits: document.getElementById('modal-credits')
    };

    /**
     * Switch active full-screen view
     */
    function showScreen(screenKey) {
        Object.keys(screens).forEach(key => {
            const screen = screens[key];
            if (!screen) return;
            if (key === screenKey) {
                screen.hidden = false;
                void screen.offsetWidth;
                screen.classList.add('active');
            } else {
                screen.classList.remove('active');
                screen.hidden = true;
            }
        });
    }

    /**
     * Set dimension theme and background styling on document body
     */
    function setDimensionTheme(dimension) {
        if (!dimension) return;
        document.body.className = `dimension-${dimension}`;
        document.body.setAttribute('data-theme', dimension);
    }

    /**
     * Set Main Menu Lobby Theme (Underwater Theme — ONLY for Start/Continue/Credits Lobby)
     */
    function setMenuTheme() {
        document.body.className = 'state-menu dimension-underwater';
        document.body.setAttribute('data-theme', 'underwater');
    }

    /**
     * Set Case Files Archive Theme (Overworld/Neutral Archive Theme)
     */
    function setArchiveTheme() {
        document.body.className = 'dimension-overworld state-archive';
        document.body.setAttribute('data-theme', 'overworld');
    }

    /**
     * Render Case Select Grid (10 Cases with status badges)
     */
    function renderCaseSelectGrid(cases, unlockedList, completedList, onSelectCase) {
        const grid = document.getElementById('case-grid');
        if (!grid) return;
        grid.innerHTML = '';

        cases.forEach(caseItem => {
            const isUnlocked = unlockedList.includes(caseItem.id);
            const isCompleted = completedList.includes(caseItem.id);

            const card = document.createElement('article');
            card.className = `case-card ${isUnlocked ? 'case-unlocked' : 'case-locked'}`;
            card.setAttribute('role', 'listitem');
            card.setAttribute('tabindex', isUnlocked ? '0' : '-1');

            const stars = '★'.repeat(caseItem.difficulty) + '☆'.repeat(5 - caseItem.difficulty);

            let statusHtml = '<span class="case-card-status status-locked">🔒 LOCKED</span>';
            if (isCompleted) {
                statusHtml = '<span class="case-card-status status-solved">✓ SOLVED</span>';
            } else if (isUnlocked) {
                statusHtml = '<span class="case-card-status status-available">▶ READY</span>';
            }

            card.innerHTML = `
                <div class="case-card-header">
                    <span class="case-num-tag">CASE #${String(caseItem.id).padStart(3, '0')}</span>
                    <span class="case-dim-tag dim-tag-${caseItem.dimension}">${caseItem.dimension}</span>
                </div>
                <h3 class="case-card-title">${caseItem.title}</h3>
                <div class="case-card-meta">
                    <span>DIFF: ${stars}</span>
                    ${statusHtml}
                </div>
            `;

            if (isUnlocked) {
                card.addEventListener('click', () => {
                    AudioEngine.playClick();
                    onSelectCase(caseItem.id);
                });
                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        AudioEngine.playClick();
                        onSelectCase(caseItem.id);
                    }
                });
            }

            grid.appendChild(card);
        });

        // Update solved counter
        const statsTag = document.getElementById('quick-stats-tag');
        if (statsTag) {
            statsTag.textContent = `${completedList.length}/10 SOLVED`;
        }
    }

    /**
     * Render Case Briefing Screen
     */
    function renderBriefing(caseData) {
        document.getElementById('briefing-case-num').textContent = `CASE #${String(caseData.id).padStart(3, '0')}`;
        document.getElementById('briefing-title').textContent = caseData.title;
        document.getElementById('briefing-dimension').textContent = `DIMENSION: ${caseData.dimension.toUpperCase()}`;
        document.getElementById('briefing-victim').textContent = caseData.victim;
        document.getElementById('briefing-location').textContent = caseData.location;
        document.getElementById('briefing-time').textContent = caseData.time;
        document.getElementById('briefing-status').textContent = caseData.status;
        document.getElementById('briefing-synopsis').textContent = caseData.synopsis;

        setDimensionTheme(caseData.dimension);
    }

    /**
     * Render Investigation HUD & Suspects & Evidence Grid
     */
    function renderInvestigation(caseData, inspectedCluesList, onInspectClue, onOpenSuspect) {
        setDimensionTheme(caseData.dimension);

        const evidenceKeys = Object.keys(caseData.evidence || {});
        const totalClues = evidenceKeys.length || 3;

        // Update HUD
        document.getElementById('hud-case-number').textContent = `CASE #${String(caseData.id).padStart(3, '0')}`;
        document.getElementById('hud-case-title').textContent = caseData.title;
        updateInspectedCount(inspectedCluesList.length, totalClues);

        // Render Suspects Sidebar
        const suspectsListEl = document.getElementById('suspects-list');
        suspectsListEl.innerHTML = '';
        document.getElementById('suspects-count-badge').textContent = `${caseData.suspects.length} SUSPECTS`;

        caseData.suspects.forEach(suspect => {
            const item = document.createElement('div');
            item.className = 'suspect-card';
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
            item.setAttribute('aria-label', `Inspect Dossier for ${suspect.name}`);

            const avatarMarkup = suspect.image
                ? `<img src="${suspect.image}" class="suspect-photo" alt="${suspect.name}" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100\\' height=\\'100\\' viewBox=\\'0 0 100 100\\'><rect width=\\'100\\' height=\\'100\\' fill=\\'%231b1a26\\'/><text x=\\'50%25\\' y=\\'50%25\\' dominant-baseline=\\'middle\' text-anchor=\\'middle\' font-size=\\'36\\'>👤</text></svg>';" style="width: 100%; height: 100%; object-fit: cover; image-rendering: pixelated;">`
                : (suspect.avatarEmoji || '👤');

            item.innerHTML = `
                <div class="suspect-avatar-box">${avatarMarkup}</div>
                <div class="suspect-info">
                    <h4 class="suspect-name">${suspect.name}</h4>
                    <div class="suspect-role">${suspect.role}</div>
                    <div class="suspect-alibi-teaser">${suspect.personality}</div>
                </div>
            `;

            item.addEventListener('click', () => {
                AudioEngine.playClick();
                onOpenSuspect(suspect);
            });
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    AudioEngine.playClick();
                    onOpenSuspect(suspect);
                }
            });

            suspectsListEl.appendChild(item);
        });

        // Render Evidence Grid
        const evidenceGridEl = document.getElementById('evidence-grid');
        evidenceGridEl.innerHTML = '';

        evidenceKeys.forEach((key, index) => {
            const clueData = caseData.evidence[key];
            if (!clueData) return;

            const isInspected = inspectedCluesList.includes(key);
            const num = String(index + 1).padStart(2, '0');

            const card = document.createElement('article');
            card.className = `evidence-card ${isInspected ? 'is-inspected' : 'is-uninspected'}`;
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Evidence ${num}: ${clueData.title}`);

            card.innerHTML = `
                <span class="evidence-badge-num">${num} — EVIDENCE</span>
                <div class="evidence-icon-large">${clueData.icon || '🔍'}</div>
                <h4 class="evidence-card-title">${clueData.title}</h4>
                <p class="evidence-card-preview">${clueData.summary}</p>
                <div class="evidence-status-tag ${isInspected ? 'evidence-inspected' : 'evidence-uninspected'}">
                    ${isInspected ? '✓ INSPECTED' : '🔍 UNINSPECTED'}
                </div>
            `;

            card.addEventListener('click', () => {
                AudioEngine.playClick();
                onInspectClue(key, clueData, caseData);
            });
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    AudioEngine.playClick();
                    onInspectClue(key, clueData, caseData);
                }
            });

            evidenceGridEl.appendChild(card);
        });
    }

    /**
     * Update inspected evidence counter badge
     */
    function updateInspectedCount(inspectedCount, total = 3) {
        const counter = document.getElementById('inspected-count');
        if (counter) {
            counter.textContent = `${inspectedCount} / ${total}`;
            if (inspectedCount === total) {
                counter.style.color = '#55ff77';
            } else {
                counter.style.color = 'var(--ui-text-highlight)';
            }
        }
    }

    /**
     * Open Clue Inspection Modal
     */
    function openEvidenceModal(clueKey, clueData, caseData) {
        const modal = modals.evidence;
        if (!modal) return;

        document.getElementById('modal-evidence-type').textContent = `CRIME SCENE CLUE • ${clueData.icon || '🔍'}`;
        document.getElementById('modal-evidence-title').textContent = clueData.title;
        document.getElementById('modal-evidence-description').textContent = clueData.summary;
        document.getElementById('modal-evidence-crossref').textContent = clueData.crossRefHint || 'Cross-reference this clue with suspect alibis.';

        const displayArea = document.getElementById('modal-evidence-display');
        displayArea.innerHTML = '';

        if (clueData.image) {
            const imgWrapper = document.createElement('div');
            imgWrapper.className = 'clue-image-wrapper';
            imgWrapper.style.cssText = 'width: 100%; margin-bottom: 12px; border: 2px solid #3a5a80; background: #0b0a0f; padding: 6px; display: flex; justify-content: center;';
            imgWrapper.innerHTML = `<img src="${clueData.image}" class="clue-photo" alt="${clueData.title || 'Evidence'}" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'180\\' height=\\'120\\' viewBox=\\'0 0 180 120\\'><rect width=\\'180\\' height=\\'120\\' fill=\\'%2314131b\\' stroke=\\'%233a5a80\\' stroke-width=\\'2\\'/><text x=\\'50%25\\' y=\\'50%25\\' dominant-baseline=\\'middle\' text-anchor=\\'middle\' fill=\\'%23ffcc00\' font-family=\\'monospace\' font-size=\\'12\\'>[ CLUE ARTIFACT ]</text></svg>';" style="max-width: 100%; max-height: 200px; object-fit: contain; image-rendering: pixelated;">`;
            displayArea.appendChild(imgWrapper);
        }

        if (clueKey === 'chatLog' && Array.isArray(clueData.messages)) {
            const chatBox = document.createElement('div');
            chatBox.className = 'clue-chatlog';
            clueData.messages.forEach(msg => {
                const row = document.createElement('div');
                row.className = 'chat-msg';
                row.innerHTML = `
                    <span class="chat-sender">&lt;${msg.sender}&gt;</span>
                    <span class="chat-body">${msg.text}</span>
                    <span class="chat-time">${msg.time}</span>
                `;
                chatBox.appendChild(row);
            });
            displayArea.appendChild(chatBox);

        } else if (clueKey === 'observerLog' && Array.isArray(clueData.details)) {
            const obsBox = document.createElement('div');
            obsBox.className = 'timeline-list';
            clueData.details.forEach(item => {
                const row = document.createElement('div');
                row.className = 'timeline-item';
                row.innerHTML = `
                    <span class="timeline-time">${item.time}</span>
                    <span class="timeline-desc">${item.event}</span>
                `;
                obsBox.appendChild(row);
            });
            displayArea.appendChild(obsBox);

        } else if (clueKey === 'timeline' && Array.isArray(clueData.entries)) {
            const timeBox = document.createElement('div');
            timeBox.className = 'timeline-list';
            clueData.entries.forEach(entry => {
                const row = document.createElement('div');
                row.className = 'timeline-item';
                row.innerHTML = `
                    <span class="timeline-time">${entry.time}</span>
                    <span class="timeline-desc">${entry.event}</span>
                `;
                timeBox.appendChild(row);
            });
            displayArea.appendChild(timeBox);

        } else if (clueKey === 'roomLayout') {
            const layoutBox = document.createElement('div');
            layoutBox.className = 'blueprint-html-container';
            layoutBox.style.cssText = 'background:#081424; border:2px solid #1a3f6e; padding:12px; display:flex; flex-direction:column; gap:8px;';

            const schematicHeader = document.createElement('div');
            schematicHeader.style.cssText = 'font-size:10px; color:#5ec2ff; border-bottom:1px dashed #1a3f6e; padding-bottom:4px;';
            schematicHeader.textContent = `LOCATION SCHEMATIC: ${caseData.location}`;
            layoutBox.appendChild(schematicHeader);

            const hotspotsGrid = document.createElement('div');
            hotspotsGrid.style.cssText = 'display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:8px; margin-top:4px;';

            (clueData.floorplanHotspots || []).forEach((spot, idx) => {
                const spotItem = document.createElement('div');
                spotItem.style.cssText = 'background:#0f2238; border:1px solid #28558a; padding:6px 10px; font-size:9px;';
                spotItem.innerHTML = `<strong style="color:#ffdd40;">[${idx + 1}] 📍 ${spot.name}:</strong> <span style="color:#d8e8ff;">${spot.note}</span>`;
                hotspotsGrid.appendChild(spotItem);
            });
            layoutBox.appendChild(hotspotsGrid);

            const descText = document.createElement('p');
            descText.style.cssText = 'font-size:9px; color:#a0c0e0; line-height:1.5; margin-top:4px;';
            descText.textContent = clueData.layoutDesc || '';
            layoutBox.appendChild(descText);

            displayArea.appendChild(layoutBox);

        } else if (clueKey === 'witness') {
            const witnessBox = document.createElement('div');
            witnessBox.className = 'suspect-statement-section';
            witnessBox.innerHTML = `
                <h4>RECORDED TESTIMONY (${clueData.witnessName || 'Witness'}):</h4>
                <blockquote class="pixel-quote">"${clueData.statement}"</blockquote>
            `;
            displayArea.appendChild(witnessBox);

        } else {
            const rawBox = document.createElement('div');
            rawBox.className = 'clue-raw-text';
            rawBox.textContent = clueData.details || clueData.summary;
            displayArea.appendChild(rawBox);
        }

        if (typeof modal.showModal === 'function') {
            modal.showModal();
        } else {
            modal.setAttribute('open', '');
        }
    }

    /**
     * Open Suspect Profile Modal
     */
    function openSuspectModal(suspect) {
        const modal = modals.suspect;
        if (!modal) return;

        document.getElementById('modal-suspect-name').textContent = suspect.name;
        const avatarEl = document.getElementById('modal-suspect-avatar');
        if (suspect.image) {
            avatarEl.innerHTML = `<img src="${suspect.image}" class="suspect-photo" alt="${suspect.name}" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100\\' height=\\'100\\' viewBox=\\'0 0 100 100\\'><rect width=\\'100\\' height=\\'100\\' fill=\\'%231b1a26\\'/><text x=\\'50%25\\' y=\\'50%25\\' dominant-baseline=\\'middle\' text-anchor=\\'middle\' font-size=\\'36\\'>👤</text></svg>';" style="width: 100%; height: 100%; object-fit: cover; image-rendering: pixelated;">`;
        } else {
            avatarEl.textContent = suspect.avatarEmoji || '👤';
        }
        document.getElementById('modal-suspect-occupation').textContent = suspect.role;
        document.getElementById('modal-suspect-relation').textContent = suspect.relation;
        document.getElementById('modal-suspect-personality').textContent = suspect.personality;
        document.getElementById('modal-suspect-alibi').textContent = `"${suspect.alibi}"`;
        document.getElementById('modal-suspect-motive').textContent = suspect.motive;

        if (typeof modal.showModal === 'function') {
            modal.showModal();
        } else {
            modal.setAttribute('open', '');
        }
    }

    /**
     * Open Case Deduction Notebook Modal
     */
    function openNotebookModal(caseData, inspectedCluesList) {
        const modal = modals.notebook;
        if (!modal) return;

        const container = document.getElementById('notebook-clues-list');
        container.innerHTML = '';

        if (inspectedCluesList.length === 0) {
            container.innerHTML = '<p class="analysis-text">No evidence inspected yet. Explore the crime scene to record clues into your notebook.</p>';
        } else {
            inspectedCluesList.forEach(clueKey => {
                const clue = caseData.evidence[clueKey];
                if (!clue) return;

                const item = document.createElement('div');
                item.className = 'evidence-analysis-box';
                item.innerHTML = `
                    <div class="analysis-label">${clue.icon || '🔍'} ${clue.title}</div>
                    <p class="analysis-text">${clue.summary}</p>
                    <div class="crossref-text">💡 ${clue.crossRefHint || ''}</div>
                `;
                container.appendChild(item);
            });
        }

        if (typeof modal.showModal === 'function') {
            modal.showModal();
        } else {
            modal.setAttribute('open', '');
        }
    }

    /**
     * Close any open native modal dialog
     */
    function closeModal(modalElement) {
        if (!modalElement) return;
        if (typeof modalElement.close === 'function' && modalElement.open) {
            modalElement.close();
        } else {
            modalElement.removeAttribute('open');
        }
    }

    /**
     * Populate Accusation Form Select Dropdowns
     */
    function setupAccusationScreen(caseData) {
        const selectWho = document.getElementById('select-who');
        const selectHow = document.getElementById('select-how');
        const selectWhy = document.getElementById('select-why');
        const btnSubmit = document.getElementById('btn-submit-accuse');

        selectWho.innerHTML = '<option value="" disabled selected>— Select Prime Suspect —</option>';
        selectHow.innerHTML = '<option value="" disabled selected>— Select Method of Murder —</option>';
        selectWhy.innerHTML = '<option value="" disabled selected>— Select True Motive —</option>';

        caseData.options.who.forEach(opt => {
            const el = document.createElement('option');
            el.value = opt;
            el.textContent = opt;
            selectWho.appendChild(el);
        });

        caseData.options.how.forEach(opt => {
            const el = document.createElement('option');
            el.value = opt;
            el.textContent = opt;
            selectHow.appendChild(el);
        });

        caseData.options.why.forEach(opt => {
            const el = document.createElement('option');
            el.value = opt;
            el.textContent = opt;
            selectWhy.appendChild(el);
        });

        document.getElementById('preview-who').textContent = 'Awaiting suspect selection...';
        document.getElementById('preview-how').textContent = 'Awaiting method selection...';
        document.getElementById('preview-why').textContent = 'Awaiting motive selection...';

        btnSubmit.disabled = true;
    }

    /**
     * Render Case Solved Screen
     */
    function renderCaseSolved(caseData) {
        if (caseData && caseData.dimension) {
            setDimensionTheme(caseData.dimension);
        }
        document.getElementById('solved-case-title').textContent = caseData.title;
        document.getElementById('solved-shard-badge').textContent = `💎 ANCIENT CONDUIT SHARD #${caseData.id} RECOVERED (${caseData.id}/10)`;
        document.getElementById('solved-who-text').textContent = caseData.correctAnswer.who;
        document.getElementById('solved-how-text').textContent = caseData.correctAnswer.how;
        document.getElementById('solved-why-text').textContent = caseData.correctAnswer.why;
        document.getElementById('solved-explanation').textContent = caseData.explanation.summary;
    }

    /**
     * Render Game Over / TNT Trap Screen
     */
    function renderGameOver(caseData) {
        if (caseData && caseData.dimension) {
            setDimensionTheme(caseData.dimension);
        }
        document.getElementById('failure-hint').textContent = caseData?.failureHint || 'Check your timeline and verify if the suspect had access to the murder weapon.';
    }

    return {
        screens,
        modals,
        showScreen,
        setDimensionTheme,
        setMenuTheme,
        setArchiveTheme,
        renderCaseSelectGrid,
        renderBriefing,
        renderInvestigation,
        updateInspectedCount,
        openEvidenceModal,
        openSuspectModal,
        openNotebookModal,
        closeModal,
        setupAccusationScreen,
        renderCaseSolved,
        renderGameOver
    };
})();
