/**
 * CASE: ABHEDYA — VISUAL EFFECTS & PARTICLE SYSTEMS
 * Handles ambient dimension particles, explosion bursts, celebration confetti, and screen shakes.
 */

const Effects = (function() {
    let ambientCanvas = null;
    let ambientCtx = null;
    let vfxCanvas = null;
    let vfxCtx = null;

    let width = 0;
    let height = 0;
    let animFrameId = null;

    let particles = [];
    let vfxParticles = [];
    let currentDimension = 'overworld';
    let isParticlesEnabled = true;

    /**
     * Initialize canvas contexts and resize handlers
     */
    function init() {
        ambientCanvas = document.getElementById('ambient-canvas');
        vfxCanvas = document.getElementById('vfx-canvas');

        if (!ambientCanvas || !vfxCanvas) return;

        ambientCtx = ambientCanvas.getContext('2d');
        vfxCtx = vfxCanvas.getContext('2d');

        handleResize();
        window.addEventListener('resize', handleResize);

        const settings = Storage.getSettings();
        isParticlesEnabled = settings.particles !== false;

        initDimensionParticles(currentDimension);
        startLoop();
    }

    function handleResize() {
        width = window.innerWidth;
        height = window.innerHeight;

        if (ambientCanvas) {
            ambientCanvas.width = width;
            ambientCanvas.height = height;
        }
        if (vfxCanvas) {
            vfxCanvas.width = width;
            vfxCanvas.height = height;
        }
    }

    /**
     * Set active dimension particle style
     */
    function setDimension(dimension) {
        currentDimension = dimension;
        initDimensionParticles(dimension);
    }

    /**
     * Spawn ambient particles based on dimension theme
     */
    function initDimensionParticles(dimension) {
        particles = [];
        const count = 35;

        for (let i = 0; i < count; i++) {
            particles.push(createParticle(dimension));
        }
    }

    function createParticle(dimension) {
        const p = {
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.floor(Math.random() * 4) + 3,
            speedX: (Math.random() - 0.5) * 0.8,
            speedY: 0,
            color: '#ffffff',
            opacity: Math.random() * 0.7 + 0.3,
            type: dimension
        };

        switch (dimension) {
            case 'overworld':
                // Falling leaves / pollen
                p.speedY = Math.random() * 0.7 + 0.3;
                p.speedX = Math.sin(Math.random() * Math.PI) * 0.6;
                p.color = Math.random() > 0.5 ? '#5b8c32' : '#85c242';
                break;

            case 'nether':
                // Rising fire embers / ash
                p.speedY = -(Math.random() * 1.2 + 0.4);
                p.speedX = (Math.random() - 0.5) * 1.0;
                p.color = Math.random() > 0.4 ? '#ff5500' : '#ffcc00';
                break;

            case 'end':
                // Floating void crystals
                p.speedY = -(Math.random() * 0.5 + 0.2);
                p.speedX = Math.sin(Math.random() * Math.PI) * 0.4;
                p.color = Math.random() > 0.5 ? '#b854ff' : '#dfa8ff';
                break;

            case 'deepdark':
                // Pulsing sculk shimmers
                p.speedY = (Math.random() - 0.5) * 0.3;
                p.speedX = (Math.random() - 0.5) * 0.3;
                p.color = Math.random() > 0.3 ? '#00ffd0' : '#009988';
                break;
        }

        return p;
    }

    /**
     * Main animation loop
     */
    function startLoop() {
        function loop() {
            if (isParticlesEnabled) {
                renderAmbient();
                renderVFX();
            } else {
                if (ambientCtx) ambientCtx.clearRect(0, 0, width, height);
                if (vfxCtx) vfxCtx.clearRect(0, 0, width, height);
            }
            animFrameId = requestAnimationFrame(loop);
        }
        loop();
    }

    /**
     * Render ambient particles
     */
    function renderAmbient() {
        if (!ambientCtx) return;
        ambientCtx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            p.x += p.speedX;
            p.y += p.speedY;

            // Wrap around boundaries
            if (p.y < -10) p.y = height + 10;
            if (p.y > height + 10) p.y = -10;
            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;

            ambientCtx.fillStyle = p.color;
            ambientCtx.globalAlpha = p.opacity;
            // Draw pixel block
            ambientCtx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
        }
        ambientCtx.globalAlpha = 1.0;
    }

    /**
     * Render burst VFX particles (Explosions, confetti)
     */
    function renderVFX() {
        if (!vfxCtx) return;
        vfxCtx.clearRect(0, 0, width, height);

        for (let i = vfxParticles.length - 1; i >= 0; i--) {
            const p = vfxParticles[i];

            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.life -= p.decay;

            if (p.life <= 0) {
                vfxParticles.splice(i, 1);
                continue;
            }

            vfxCtx.fillStyle = p.color;
            vfxCtx.globalAlpha = Math.max(0, p.life);
            vfxCtx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
        }
        vfxCtx.globalAlpha = 1.0;
    }

    /**
     * Trigger TNT Explosion Burst (Fire, smoke, and debris)
     */
    function triggerExplosion(centerX, centerY) {
        const x = centerX || width / 2;
        const y = centerY || height / 2;
        const count = 90;

        const colors = ['#ffffff', '#ffdd33', '#ff6600', '#cc1100', '#333333', '#555555'];

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 12 + 3;
            vfxParticles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                gravity: 0.25,
                size: Math.floor(Math.random() * 8) + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 1.0,
                decay: Math.random() * 0.02 + 0.015
            });
        }
    }

    /**
     * Trigger Victory Confetti (Diamonds, emeralds, gold)
     */
    function triggerCelebration(centerX, centerY) {
        const x = centerX || width / 2;
        const y = centerY || height / 2;
        const count = 75;

        const gemColors = ['#55ffff', '#55ff55', '#ffaa00', '#ff55ff', '#ffffff'];

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 9 + 2;
            vfxParticles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 4,
                gravity: 0.18,
                size: Math.floor(Math.random() * 6) + 4,
                color: gemColors[Math.floor(Math.random() * gemColors.length)],
                life: 1.2,
                decay: Math.random() * 0.015 + 0.01
            });
        }
    }

    /**
     * Trigger Screen Shake
     */
    function shake(type = 'mild') {
        const app = document.getElementById('game-app');
        if (!app) return;

        const cls = type === 'heavy' ? 'shake-heavy' : (type === 'tnt' ? 'shake-tnt-escalate' : 'shake-mild');
        app.classList.remove('shake-mild', 'shake-heavy', 'shake-tnt-escalate');
        
        // Force reflow
        void app.offsetWidth;
        app.classList.add(cls);

        const duration = type === 'tnt' ? 2400 : (type === 'heavy' ? 600 : 400);
        setTimeout(() => {
            app.classList.remove(cls);
        }, duration);
    }

    /**
     * Toggle Particles
     */
    function toggleParticles(state) {
        isParticlesEnabled = state;
        Storage.updateSetting('particles', state);
        if (!state) {
            if (ambientCtx) ambientCtx.clearRect(0, 0, width, height);
            if (vfxCtx) vfxCtx.clearRect(0, 0, width, height);
        }
    }

    return {
        init,
        setDimension,
        triggerExplosion,
        triggerCelebration,
        shake,
        toggleParticles
    };
})();
