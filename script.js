// Get DOM elements
const audio = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const canvas = document.getElementById('galaxyCanvas');
const ctx = canvas.getContext('2d');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const progressBar = document.getElementById('progress');
const progressBarContainer = document.querySelector('.progress-bar');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Particles for cosmic animation
const particles = [];
const forceFields = [];
const waveParticles = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.size = Math.random() * 1.5 + 0.3;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.hue = Math.random() * 90 + 260; // Purple to magenta range
        this.life = 1;
    }

    update(audioLevel = 0) {
        this.x += this.vx;
        this.y += this.vy;
        
        // Wrap around screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Affect by force fields
        forceFields.forEach(field => {
            const dx = field.x - this.x;
            const dy = field.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = field.radius;

            if (distance < maxDistance) {
                const force = (1 - distance / maxDistance) * field.strength;
                this.vx += (dx / distance) * force;
                this.vy += (dy / distance) * force;
            }
        });

        // Add drift
        this.vx *= 0.98;
        this.vy *= 0.98;

        // Damping
        this.life -= 0.001;
    }

    draw() {
        ctx.globalAlpha = this.opacity * this.life;
        ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

class ForceField {
    constructor(x, y, radius, strength) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.strength = strength;
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.globalAlpha = 0.1;
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
    }
}

class WaveParticle {
    constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.life = 1;
        this.size = Math.random() * 4 + 2;
        this.hue = Math.random() * 120 + 180; // Cyan to blue
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.1; // Gravity
        this.life -= 0.02;
    }

    draw() {
        ctx.globalAlpha = this.life * 0.7;
        ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

// Initialize particles
for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
}

// Initialize force fields
for (let i = 0; i < 3; i++) {
    forceFields.push(new ForceField(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        60 + Math.random() * 40,
        0.15 + Math.random() * 0.1
    ));
}

// Audio visualization
let audioLevel = 0;
let targetAudioLevel = 0;

function getAudioLevel() {
    // Slower, more mystical audio level for visual effect
    return Math.sin(Date.now() * 0.0005) * 0.2 + 0.2;
}

function initAudio() {
    // Audio initialization (simplified version)
    return true;
}

// Central glowing orb
let globX = canvas.width / 2;
let globY = canvas.height / 2;
let globVX = (Math.random() - 0.5) * 0.3;
let globVY = (Math.random() - 0.5) * 0.3;
let globSize = 80;

// Animation loop
function animate() {
    // Clear canvas with very dark fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Get audio level
    let currentAudioLevel = getAudioLevel();

    // Update glowing orb position
    globX += globVX;
    globY += globVY;

    // Bounce off edges
    if (globX - globSize < 0 || globX + globSize > canvas.width) {
        globVX *= -1;
    }
    if (globY - globSize < 0 || globY + globSize > canvas.height) {
        globVY *= -1;
    }

    // Keep in bounds
    globX = Math.max(globSize, Math.min(canvas.width - globSize, globX));
    globY = Math.max(globSize, Math.min(canvas.height - globSize, globY));

    // Draw glowing orb
    const orbGradient = ctx.createRadialGradient(globX, globY, 0, globX, globY, globSize);
    orbGradient.addColorStop(0, `rgba(138, 43, 226, ${0.6 + currentAudioLevel * 0.2})`);
    orbGradient.addColorStop(0.5, `rgba(75, 0, 130, ${0.3 + currentAudioLevel * 0.1})`);
    orbGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.fillStyle = orbGradient;
    ctx.beginPath();
    ctx.arc(globX, globY, globSize, 0, Math.PI * 2);
    ctx.fill();

    // Draw outer glow ring
    ctx.globalAlpha = 0.15;
    ctx.strokeStyle = '#8a2be2';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(globX, globY, globSize + 20, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;

    requestAnimationFrame(animate);
}

animate();

// Audio Controls
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        initAudio();
        audio.play();
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
    }
});

pauseBtn.addEventListener('click', () => {
    if (!audio.paused) {
        audio.pause();
        pauseBtn.style.display = 'none';
        playBtn.style.display = 'block';
    }
});

// Update time display
function formatTime(seconds) {
    if (!isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

audio.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
    progressBar.style.width = (audio.currentTime / audio.duration) * 100 + '%';
});

// Click on progress bar to seek
progressBarContainer.addEventListener('click', (e) => {
    const rect = progressBarContainer.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percentage * audio.duration;
});

// Mark audio as playing for force field detection
audio.addEventListener('play', () => {
    audio.playing = true;
});

audio.addEventListener('pause', () => {
    audio.playing = false;
});

audio.addEventListener('ended', () => {
    audio.playing = false;
    pauseBtn.style.display = 'none';
    playBtn.style.display = 'block';
});

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        e.preventDefault();
        if (audio.paused) {
            playBtn.click();
        } else {
            pauseBtn.click();
        }
    }
});
