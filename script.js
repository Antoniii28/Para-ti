// ============================================================
// Celebración de cumpleaños para Yeni
// Basado en el corazón 3D del proyecto de San Valentín.
// ============================================================

const celebrateBtn = document.getElementById("celebrateBtn");
const celebrationScreen = document.getElementById("celebrationScreen");
const musicLink = document.getElementById("musicLink");
const sunoPlayer = document.getElementById("sunoPlayer");

const SUNO_LINK = "https://suno.com/song/a4ecfe9b-9341-4a35-9ffd-ca4acc4c4912?sh=l8alpHdxuyVkNAqr";

// Al hacer clic, la celebración y el reproductor de Suno se activan juntos.
// El navegador puede aplicar sus propias reglas de reproducción automática.
celebrateBtn.addEventListener("click", () => {
    celebrationScreen.classList.add("show");

    // Reinicia el reproductor embebido para intentar iniciar la canción
    // después de la interacción del usuario.
    sunoPlayer.src = "https://suno.com/embed/a4ecfe9b-9341-4a35-9ffd-ca4acc4c4912?autoplay=1";

    createConfetti(150);
    createHeartRain(35);
    createFireworks(18);

    document.body.style.overflow = "auto";
});

musicLink.addEventListener("click", () => {
    window.open(SUNO_LINK, "_blank", "noopener,noreferrer");
});

// -----------------------------
// Efectos de celebración
// -----------------------------

function createHeartRain(count) {
    const hearts = ["❤️", "💖", "💕", "💗", "🤍"];

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement("div");
            heart.className = "heart-rain";
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

            heart.style.left = Math.random() * 100 + "vw";
            heart.style.fontSize = Math.random() * 22 + 18 + "px";
            heart.style.animationDuration = Math.random() * 3 + 3 + "s";

            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), 7000);
        }, i * 80);
    }
}

function createConfetti(count) {
    const colors = ["#ff2e63", "#ffd166", "#ff8fab", "#ffffff", "#9d4edd"];

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const piece = document.createElement("div");
            piece.className = "confetti";

            piece.style.left = Math.random() * 100 + "vw";
            piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            piece.style.width = Math.random() * 8 + 5 + "px";
            piece.style.height = Math.random() * 12 + 7 + "px";
            piece.style.animationDuration = Math.random() * 3 + 3 + "s";
            piece.style.animationDelay = Math.random() * .8 + "s";

            document.body.appendChild(piece);

            setTimeout(() => piece.remove(), 7000);
        }, i * 18);
    }
}

function createFireworks(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight * .55;

            for (let j = 0; j < 28; j++) {
                const spark = document.createElement("div");
                spark.className = "confetti";

                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 100 + 40;

                spark.style.left = x + "px";
                spark.style.top = y + "px";
                spark.style.width = "5px";
                spark.style.height = "5px";
                spark.style.borderRadius = "50%";
                spark.style.backgroundColor = ["#ff2e63", "#ffd166", "#ffffff"][Math.floor(Math.random() * 3)];
                spark.style.transition = "transform 1s ease-out, opacity 1s ease-out";
                spark.style.animation = "none";

                document.body.appendChild(spark);

                requestAnimationFrame(() => {
                    spark.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
                    spark.style.opacity = "0";
                });

                setTimeout(() => spark.remove(), 1100);
            }
        }, i * 220);
    }
}

// ============================================================
// Corazón 3D original de San Valentín
// ============================================================

const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");

let width;
let height;
let particles = [];
let time = 0;
let rotX = 0;
let rotY = 0;
let targetRotY = 0;
let mouse = { x: 0, y: 0 };

const HEART_SIZE = 1.9;
const PARTICLE_COUNT = 1700;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

class Particle {
    constructor() {
        this.setHeartPos();
        this.x = this.tx;
        this.y = this.ty;
        this.z = this.tz;
        this.vx = 0;
        this.vy = 0;
        this.vz = 0;
        this.size = Math.random() * 2 + .4;
        this.friction = .92;
        this.color = `hsl(${340 + Math.random() * 35}, 100%, ${55 + Math.random() * 25}%)`;
    }

    setHeartPos() {
        const t = Math.random() * Math.PI * 2;
        const u = Math.random();
        const scale = Math.pow(u, 1 / 3) * HEART_SIZE;

        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(
            13 * Math.cos(t) -
            5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) -
            Math.cos(4 * t)
        );

        const z = (Math.random() - .5) * 10;

        this.tx = x * scale;
        this.ty = y * scale;
        this.tz = z * scale;
    }

    update(beat) {
        const pulse = 1 + beat * .1;

        const targetX = this.tx * pulse;
        const targetY = this.ty * pulse;
        const targetZ = this.tz * pulse;

        this.x += (targetX - this.x) * .1;
        this.y += (targetY - this.y) * .1;
        this.z += (targetZ - this.z) * .1;

        this.x += (Math.random() - .5) * .5;
        this.y += (Math.random() - .5) * .5;
        this.z += (Math.random() - .5) * .5;
    }

    draw() {
        const y1 = this.y * Math.cos(rotX) - this.z * Math.sin(rotX);
        const z1 = this.z * Math.cos(rotX) + this.y * Math.sin(rotX);

        const x1 = this.x * Math.cos(rotY) - z1 * Math.sin(rotY);
        const z2 = z1 * Math.cos(rotY) + this.x * Math.sin(rotY);

        const perspective = 500;
        const scale = perspective / (perspective + z2);

        if (scale < 0 || z2 < -perspective) return;

        const x2d = width / 2 + x1 * scale;
        const y2d = height / 2 + y1 * scale;

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(x2d, y2d, this.size * scale, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }
}

document.addEventListener("mousemove", (e) => {
    mouse.x = (e.clientX - width / 2) * .001;
    mouse.y = (e.clientY - height / 2) * .001;
});

function animate() {
    requestAnimationFrame(animate);

    ctx.fillStyle = "rgba(15, 2, 5, .42)";
    ctx.fillRect(0, 0, width, height);

    time += .02;

    const beat =
        Math.pow(Math.sin(time * 3), 60) * .5 +
        Math.sin(time * 3 + .5) * .1;

    targetRotY += .003;
    rotY += (targetRotY + mouse.x - rotY) * .05;
    rotX += (mouse.y - rotX) * .05;

    ctx.globalCompositeOperation = "lighter";

    particles.forEach(particle => {
        particle.update(beat);
        particle.draw();
    });

    ctx.globalCompositeOperation = "source-over";
}

initParticles();
animate();

// En celular, el corazón sigue girando sin depender del mouse.
document.addEventListener("touchmove", (e) => {
    if (!e.touches[0]) return;

    mouse.x = (e.touches[0].clientX - width / 2) * .001;
    mouse.y = (e.touches[0].clientY - height / 2) * .001;
}, { passive: true });
