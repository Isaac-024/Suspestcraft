/**
 * Automated Verification Script for CASE: AARNA
 * Verifies all 10 cases, clues, options, answers, image assets, audio assets, and data integrity.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== STARTING AUTOMATED TEST SUITE FOR CASE: AARNA ===\n');

// 1. Verify all code files exist
const requiredFiles = [
    'index.html',
    'css/style.css',
    'css/menu.css',
    'css/investigation.css',
    'css/animations.css',
    'js/storage.js',
    'js/audio.js',
    'js/cases.js',
    'js/ui.js',
    'js/game.js',
    'js/main.js',
    'README.md'
];

let allFilesPresent = true;
requiredFiles.forEach(file => {
    const fullPath = path.join(__dirname, file);
    if (!fs.existsSync(fullPath)) {
        console.error(`❌ Missing required file: ${file}`);
        allFilesPresent = false;
    } else {
        const stats = fs.statSync(fullPath);
        console.log(`✅ Code file present: ${file} (${stats.size} bytes)`);
    }
});

// 2. Verify all local image assets
const requiredImages = [
    'images/logo.svg',
    'images/underwater.png',
    'images/overworld.png',
    'images/nether.jpg',
    'images/end.png',
    'images/sfit.png',
    'images/tnt.png'
];

console.log('\n--- Checking Image Assets ---');
requiredImages.forEach(img => {
    const fullPath = path.join(__dirname, img);
    if (!fs.existsSync(fullPath)) {
        console.error(`❌ Missing image asset: ${img}`);
        allFilesPresent = false;
    } else {
        const stats = fs.statSync(fullPath);
        console.log(`✅ Image asset verified: ${img} (${stats.size} bytes)`);
    }
});

// 3. Verify all local audio assets
const requiredAudio = [
    'audio/minecraft_click.mp3',
    'audio/teleport1_Cw1ot9l.mp3',
    'audio/minecraft-cave-sound-10.mp3',
    'audio/nether-portal-travil-sound.mp3',
    'audio/end_portal_activation.mp3',
    'audio/minecraft-chest-open-and-close.mp3',
    'audio/levelup.mp3',
    'audio/challenge_complete_uHsY1YS.mp3',
    'audio/tnt-explosion.mp3'
];

console.log('\n--- Checking Audio Assets ---');
requiredAudio.forEach(aud => {
    const fullPath = path.join(__dirname, aud);
    if (!fs.existsSync(fullPath)) {
        console.error(`❌ Missing audio asset: ${aud}`);
        allFilesPresent = false;
    } else {
        const stats = fs.statSync(fullPath);
        console.log(`✅ Audio asset verified: ${aud} (${stats.size} bytes)`);
    }
});

if (!allFilesPresent) {
    console.error('\n❌ Test suite failed: missing files');
    process.exit(1);
}

// 4. Load cases.js in node context and validate data integrity
const casesCode = fs.readFileSync(path.join(__dirname, 'js/cases.js'), 'utf-8');
const context = { console };
vm.createContext(context);
vm.runInContext(casesCode + '\nthis.CASES = CASES;', context);
const CASES = context.CASES;

console.log(`\n--- Validating CASES data (Total: ${CASES.length} cases) ---`);

if (CASES.length !== 10) {
    console.error(`❌ Expected 10 cases, but found ${CASES.length}`);
    process.exit(1);
}

const requiredEvidenceKeys = [
    'clue1',
    'clue2',
    'clue3'
];

let allCasesValid = true;

CASES.forEach((c, idx) => {
    const caseNum = idx + 1;
    console.log(`Checking Case #${caseNum}: "${c.title}" [Dimension: ${c.dimension}]`);

    // Verify basic fields
    if (c.id !== caseNum) {
        console.error(`❌ Case ID mismatch: expected ${caseNum}, got ${c.id}`);
        allCasesValid = false;
    }
    if (!c.victim || !c.location || !c.time || !c.synopsis) {
        console.error(`❌ Case #${caseNum} is missing basic metadata.`);
        allCasesValid = false;
    }

    // Verify suspects (2-4 suspects)
    if (!Array.isArray(c.suspects) || c.suspects.length < 2) {
        console.error(`❌ Case #${caseNum} requires at least 2 suspects, got ${c.suspects?.length}`);
        allCasesValid = false;
    } else {
        c.suspects.forEach(s => {
            if (s.image) {
                const sImgPath = path.join(__dirname, s.image);
                if (!fs.existsSync(sImgPath)) {
                    console.error(`❌ Case #${caseNum}: Suspect image not found: ${s.image}`);
                    allCasesValid = false;
                }
            }
        });
    }

    // Verify 3 Evidence categories
    if (!c.evidence) {
        console.error(`❌ Case #${caseNum} is missing evidence object.`);
        allCasesValid = false;
    } else {
        requiredEvidenceKeys.forEach(ek => {
            if (!c.evidence[ek]) {
                console.error(`❌ Case #${caseNum} missing evidence key: ${ek}`);
                allCasesValid = false;
            } else if (c.evidence[ek].image) {
                const cImgPath = path.join(__dirname, c.evidence[ek].image);
                if (!fs.existsSync(cImgPath)) {
                    console.error(`❌ Case #${caseNum}: Clue image not found: ${c.evidence[ek].image}`);
                    allCasesValid = false;
                }
            }
        });
    }

    // Verify Options & Correct Answer
    if (!c.options || !c.options.who || !c.options.how || !c.options.why) {
        console.error(`❌ Case #${caseNum} missing options structure.`);
        allCasesValid = false;
    } else {
        if (!c.correctAnswer || !c.correctAnswer.who || !c.correctAnswer.how || !c.correctAnswer.why) {
            console.error(`❌ Case #${caseNum} missing correctAnswer.`);
            allCasesValid = false;
        } else {
            // Verify that correct answer exists inside the options list!
            if (!c.options.who.includes(c.correctAnswer.who)) {
                console.error(`❌ Case #${caseNum}: correct WHO "${c.correctAnswer.who}" not in options!`);
                allCasesValid = false;
            }
            if (!c.options.how.includes(c.correctAnswer.how)) {
                console.error(`❌ Case #${caseNum}: correct HOW "${c.correctAnswer.how}" not in options!`);
                allCasesValid = false;
            }
            if (!c.options.why.includes(c.correctAnswer.why)) {
                console.error(`❌ Case #${caseNum}: correct WHY "${c.correctAnswer.why}" not in options!`);
                allCasesValid = false;
            }
        }
    }

    // Verify explanation
    if (!c.explanation || !c.explanation.summary) {
        console.error(`❌ Case #${caseNum} missing explanation summary.`);
        allCasesValid = false;
    }
});

if (!allCasesValid) {
    console.error('\n❌ Case data validation failed.');
    process.exit(1);
} else {
    console.log('\n🎉 ALL 10 CASES FULLY VALIDATED AND AIRTIGHT!');
}

console.log('\n--- Validating Competition Countdown Timer & Lockout Implementation ---');

// 5. Verify Admin Portal (admin.html & admin.js)
const adminHtml = fs.readFileSync(path.join(__dirname, 'admin.html'), 'utf-8');
const adminJs = fs.readFileSync(path.join(__dirname, 'admin.js'), 'utf-8');

const adminHtmlChecks = [
    { name: 'Start Competition Button', pattern: 'id="btn-start-competition"' },
    { name: 'Force Lock Button', pattern: 'id="btn-force-lock"' },
    { name: 'Admin Timer Display', pattern: 'id="admin-timer-display"' },
    { name: 'Admin Locked Banner', pattern: 'id="admin-lock-banner"' },
    { name: 'Golden Lock Text', pattern: 'COMPETITION CONCLUDED — FINAL LEADERBOARD LOCKED' },
    { name: 'Pixel green border on start button', pattern: '#227744' },
    { name: 'Pixel green accent on start button', pattern: '#55ffaa' }
];

adminHtmlChecks.forEach(check => {
    if (adminHtml.includes(check.pattern)) {
        console.log(`✅ admin.html: ${check.name} verified`);
    } else {
        console.error(`❌ admin.html missing: ${check.name} (${check.pattern})`);
        process.exit(1);
    }
});

const adminJsChecks = [
    { name: 'Firestore gameControl/session collection', pattern: '"gameControl"' },
    { name: 'Firestore session document', pattern: '"session"' },
    { name: '10-minute durationMs (600000)', pattern: '600000' },
    { name: 'startCompetition method', pattern: 'startCompetition' },
    { name: 'forceLockCompetition method', pattern: 'forceLockCompetition' },
    { name: 'applyCompetitionSession method', pattern: 'applyCompetitionSession' },
    { name: 'Leaderboard frozen check', pattern: 'isLeaderboardFrozen' }
];

adminJsChecks.forEach(check => {
    if (adminJs.includes(check.pattern)) {
        console.log(`✅ admin.js: ${check.name} verified`);
    } else {
        console.error(`❌ admin.js missing: ${check.name} (${check.pattern})`);
        process.exit(1);
    }
});

// 6. Verify Main Game Client (index.html, js/game.js, js/main.js, css/style.css)
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
const gameJs = fs.readFileSync(path.join(__dirname, 'js/game.js'), 'utf-8');
const styleCss = fs.readFileSync(path.join(__dirname, 'css/style.css'), 'utf-8');

const clientChecks = [
    { file: 'index.html', name: 'Lockout screen ID', pattern: 'id="lockout-screen"' },
    { file: 'index.html', name: 'Lockout box class', pattern: 'class="lockout-box"' },
    { file: 'index.html', name: 'TIME IS UP! header', pattern: 'TIME IS UP!' },
    { file: 'index.html', name: 'Waiting standby screen', pattern: 'id="waiting-screen"' },
    { file: 'index.html', name: 'HUD competition timer', pattern: 'id="hud-competition-timer"' },
    { file: 'js/game.js', name: 'Game competition listener', pattern: 'initCompetitionListener' },
    { file: 'js/game.js', name: 'Game competition lock guard', pattern: 'isCompetitionLocked' },
    { file: 'js/game.js', name: 'Game stop audio on lockout', pattern: 'AudioEngine.stopBGM()' },
    { file: 'css/style.css', name: 'Lockout overlay dark backdrop (rgba(0, 0, 0, 0.92))', pattern: 'rgba(0, 0, 0, 0.92)' },
    { file: 'css/style.css', name: 'Lockout red warning border (#ff3344)', pattern: '#ff3344' },
    { file: 'css/style.css', name: 'HUD timer badge CSS', pattern: '.hud-competition-timer' }
];

clientChecks.forEach(check => {
    const content = check.file === 'index.html' ? indexHtml : (check.file === 'js/game.js' ? gameJs : styleCss);
    if (content.includes(check.pattern)) {
        console.log(`✅ ${check.file}: ${check.name} verified`);
    } else {
        console.error(`❌ ${check.file} missing: ${check.name} (${check.pattern})`);
        process.exit(1);
    }
});

console.log('\n=== ALL TESTS PASSED SUCCESSFULLY! ===\n');
