// ===== Snow effect =====
(function () {
    const container = document.getElementById('snow');
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const FLAKE_COUNT = 1000;
    let flakes = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function newFlake(startAnywhere) {
        return {
            x: Math.random() * canvas.width,
            y: startAnywhere ? Math.random() * canvas.height : -10,
            r: 0.6 + Math.random() * 2.4,            // kích thước bông tuyết
            speed: 0.4 + Math.random() * 1.4,        // tốc độ rơi
            sway: Math.random() * Math.PI * 2,       // pha đu đưa
            swaySpeed: 0.005 + Math.random() * 0.02, // tốc độ đu đưa
            swayAmp: 10 + Math.random() * 30,        // biên độ đu đưa
            opacity: 0.3 + Math.random() * 0.7
        };
    }

    for (let i = 0; i < FLAKE_COUNT; i++) {
        flakes.push(newFlake(true));
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff';

        for (const f of flakes) {
            ctx.globalAlpha = f.opacity;
            ctx.beginPath();
            ctx.arc(f.x + Math.sin(f.sway) * f.swayAmp, f.y, f.r, 0, Math.PI * 2);
            ctx.fill();

            f.y += f.speed;
            f.sway += f.swaySpeed;

            // Bông tuyết rơi xuống đáy thì quay lên trên đầu
            if (f.y > canvas.height + 10) {
                Object.assign(f, newFlake(false));
            }
        }

        ctx.globalAlpha = 1;
        requestAnimationFrame(draw);
    }
    draw();
})();

// ===== Music player =====
// Playlist được nạp từ js/playlist.js (chạy update-playlist.bat để cập nhật)
let currentTrack = 0;

const audio = document.getElementById('audioSource');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressFill = document.getElementById('progressFill');
const progressBar = document.getElementById('progressBar');
const trackName = document.getElementById('trackName');

function loadTrack(index, autoplay) {
    currentTrack = (index + playlist.length) % playlist.length;
    const fileName = playlist[currentTrack];
    audio.src = "music/" + fileName;
    trackName.textContent = fileName.replace(/\.mp3$/i, '');
    if (autoplay) {
        audio.play();
        playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
    }
}

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
    }
});

prevBtn.addEventListener('click', () => loadTrack(currentTrack - 1, true));
nextBtn.addEventListener('click', () => loadTrack(currentTrack + 1, true));
audio.addEventListener('ended', () => loadTrack(currentTrack + 1, true));

audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = percent + '%';
});

progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const clickPercent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = clickPercent * audio.duration;
});

loadTrack(0, false);
const overlay = document.getElementById('enterOverlay');
overlay.addEventListener('click', () => {
    loadTrack(currentTrack, true);
    overlay.classList.add('hidden');
});
