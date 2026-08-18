particlesJS('particles-js',
{
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 23.67442924896818,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "repulse"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": false
  }

);
const playlist = [
    "ANH SAI ROI.mp3",
    "DE DANH CHO EM.mp3",
    "TIM THAY NHAU.mp3"
];
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
