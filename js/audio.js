/**
 * CASE: ABHEDYA — AUDIO ENGINE (js/audio.js)
 * Maps exact local audio files to specific game triggers with zero background music.
 * Features Web Audio API with pre-decoded PCM AudioBuffers for true zero-latency instant playback,
 * eliminating browser hardware decoding spin-up delays.
 */

const AudioEngine = (function() {
    // Exact audio file mappings
    const audioFiles = {
        click: 'audio/minecraft_click.mp3',
        continueGame: 'audio/teleport1_Cw1ot9l.mp3',
        enterLevel1: 'audio/minecraft-cave-sound-10.mp3',
        enterLevel4: 'audio/nether-portal-travil-sound.mp3',
        enterLevel7: 'audio/end_portal_activation.mp3',
        openAccuse: 'audio/minecraft-chest-open-and-close.mp3',
        levelClear: 'audio/levelup.mp3',
        gameComplete: 'audio/challenge_complete_uHsY1YS.mp3',
        tntExplosion: 'audio/tnt-explosion.mp3'
    };

    // Web Audio API Context and pre-decoded raw PCM buffers
    let audioCtx = null;
    const decodedBuffers = {};

    // HTML5 Audio fallback instances
    const audioInstances = {};

    // Click sound pool for rapid responsive clicks
    const CLICK_POOL_SIZE = 4;
    const clickPool = [];
    let clickPoolIndex = 0;

    /**
     * Initialize or resume Web Audio Context
     */
    function getAudioContext() {
        if (!audioCtx && typeof window !== 'undefined') {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                audioCtx = new AudioContextClass();
            }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume().catch(() => {});
        }
        return audioCtx;
    }

    /**
     * Pre-fetch and decode audio file into raw PCM buffer
     */
    async function preloadAndDecodeBuffer(key, url) {
        if (typeof window === 'undefined' || typeof fetch === 'undefined') return;
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const ctx = getAudioContext();
            if (ctx) {
                ctx.decodeAudioData(arrayBuffer, (buffer) => {
                    decodedBuffers[key] = buffer;
                }, () => {});
            }
        } catch (e) {
            // Web Audio fetch failed, HTML5 audio fallback remains active
        }
    }

    function init() {
        // 1. Initialize Web Audio Context
        getAudioContext();

        // 2. Preload HTML5 Audio instances & start Web Audio decoding
        Object.keys(audioFiles).forEach(key => {
            const url = audioFiles[key];
            try {
                if (typeof Audio !== 'undefined') {
                    const aud = new Audio(url);
                    aud.preload = 'auto';
                    audioInstances[key] = aud;
                }
            } catch (e) {}

            preloadAndDecodeBuffer(key, url);
        });

        // 3. Initialize click sound pool
        for (let i = 0; i < CLICK_POOL_SIZE; i++) {
            try {
                if (typeof Audio !== 'undefined') {
                    const clickAud = new Audio(audioFiles.click);
                    clickAud.preload = 'auto';
                    clickAud.volume = 0.65;
                    clickPool.push(clickAud);
                }
            } catch (e) {}
        }

        // 4. Warm-up audio context on first user gesture
        if (typeof window !== 'undefined') {
            const warmUp = () => {
                const ctx = getAudioContext();
                if (ctx && ctx.state === 'suspended') {
                    ctx.resume();
                }
                window.removeEventListener('click', warmUp);
                window.removeEventListener('keydown', warmUp);
                window.removeEventListener('touchstart', warmUp);
            };
            window.addEventListener('click', warmUp, { once: true, passive: true });
            window.addEventListener('keydown', warmUp, { once: true, passive: true });
            window.addEventListener('touchstart', warmUp, { once: true, passive: true });
        }
    }

    /**
     * Universal zero-latency sound player:
     * - Uses Web Audio API AudioBufferSourceNode if decoded buffer is available (0ms delay)
     * - Falls back to HTML5 Audio element with instant rewind (currentTime = 0; play();)
     */
    function playSound(key, volume = 0.8) {
        try {
            const ctx = getAudioContext();
            if (ctx && decodedBuffers[key]) {
                if (ctx.state === 'suspended') {
                    ctx.resume();
                }
                const source = ctx.createBufferSource();
                source.buffer = decodedBuffers[key];
                const gainNode = ctx.createGain();
                gainNode.gain.value = volume;
                source.connect(gainNode);
                gainNode.connect(ctx.destination);
                source.start(0); // Exact 0ms immediate audio thread playback
                return;
            }

            // HTML5 Fallback
            let audio = audioInstances[key];
            if (!audio && typeof Audio !== 'undefined') {
                audio = new Audio(audioFiles[key]);
                audioInstances[key] = audio;
            }
            if (audio) {
                audio.volume = volume;
                audio.currentTime = 0; // Reset audio position
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {});
                }
            }
        } catch (e) {
            console.warn(`[AudioEngine] Error playing sound ${key}:`, e);
        }
    }

    /**
     * 1. Button Click (Trigger: clicked ANY button)
     */
    function playClick() {
        if (decodedBuffers['click']) {
            playSound('click', 0.65);
        } else if (clickPool.length > 0) {
            const audio = clickPool[clickPoolIndex];
            clickPoolIndex = (clickPoolIndex + 1) % clickPool.length;
            audio.currentTime = 0;
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {});
            }
        } else {
            playSound('click', 0.65);
        }
    }

    // 2. Continue Game (Trigger: clicked CONTINUE on main menu)
    function playContinue() {
        playSound('continueGame', 0.85);
    }

    // 3. Enter Level 1 - Overworld (Trigger: enters Case 1)
    function playEnterLevel1() {
        playSound('enterLevel1', 0.9);
    }

    // 4. Enter Level 4 - Nether Portal (Trigger: enters Case 4)
    function playEnterLevel4() {
        playSound('enterLevel4', 0.9);
    }

    // 5. Enter Level 7 / End Dimension (Trigger: enters Cases 7, 8, 9 - The End)
    function playEnterLevel7() {
        playSound('enterLevel7', 1.0);
    }

    function playEnterEndDimension() {
        playSound('enterLevel7', 1.0);
    }

    // 6. Open Accuse Tab (Trigger: clicks ACCUSE button)
    function playOpenAccuse() {
        playSound('openAccuse', 0.85);
    }

    // 7. Level Clear (Trigger: solves Cases 1-9)
    function playLevelClear() {
        playSound('levelClear', 0.85);
    }

    // 8. Game Complete (Trigger: solves Case 10)
    function playGameComplete() {
        playSound('gameComplete', 1.0);
    }

    // 9. TNT Explosion (Trigger: wrong accusation submitted - ZERO LATENCY)
    function playTntExplosion() {
        playSound('tntExplosion', 1.0);
    }

    // --- BGM ENGINE ---
    let currentBGM = null;

    const bgmMappings = {
        1: 'bgm/audio1.mpeg',
        2: 'bgm/audio2.mpeg',
        3: 'bgm/audio3.mpeg',
        4: 'bgm/audio4.mpeg',
        5: 'bgm/audio5.mpeg',
        6: 'bgm/audio6.mpeg',
        7: 'bgm/audio7.mpeg',
        8: 'bgm/audio9.mpeg', // Explicitly mapped
        9: 'bgm/audio1.mpeg', // Explicitly mapped
        10: 'bgm/audio8.mpeg' // Explicitly mapped
    };

    function playBGM(caseId) {
        stopBGM(); // Stop any currently playing track
        
        const trackPath = bgmMappings[caseId];
        if (!trackPath) return;

        currentBGM = new Audio(trackPath);
        currentBGM.loop = true;
        currentBGM.volume = 0.4; // Lower volume so it doesn't overpower sfx
        
        currentBGM.play().catch(err => {
            console.log(`[AudioEngine] BGM Autoplay prevented:`, err.message);
        });
    }

    function stopBGM() {
        if (currentBGM) {
            currentBGM.pause();
            currentBGM.currentTime = 0;
            currentBGM = null;
        }
    }

    return {
        init,
        playClick,
        playContinue,
        playEnterLevel1,
        playEnterLevel4,
        playEnterLevel7,
        playEnterEndDimension,
        playOpenAccuse,
        playLevelClear,
        playGameComplete,
        playTntExplosion,
        playBGM,
        stopBGM
    };
})();
