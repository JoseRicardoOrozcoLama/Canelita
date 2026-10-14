const giftButton = document.getElementById('giftButton');
const tapHint = document.getElementById('tapHint');
const openLetterButton = document.getElementById('openLetterButton');
const closeLetterButton = document.getElementById('closeLetterButton');
const letterWrap = document.getElementById('letterWrap');
const giftSection = document.getElementById('giftSection');
const particles = document.getElementById('particles');
const toast = document.getElementById('toast');
const musicButton = document.getElementById('musicButton');
const musicaFondo = document.getElementById('musicaFondo');
musicaFondo.volume = 0.35;
let musicPlaying = false;

let giftOpened = false;
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function openGift() {
  if (giftOpened) {
    openLetter();
    return;
  }

  giftOpened = true;
  giftButton.classList.add('opened');
  giftButton.setAttribute('aria-label', 'Regalo abierto; mostrar la carta');
  tapHint.textContent = '¡Sorpresa! Hay una cartita especial para ti 💗';
  openLetterButton.textContent = 'Descubrir mi cartita 💌';
  showerHearts();
  showToast('¡Feliz cumpleaños, Canelita! 🌷');
}

function openLetter() {
  letterWrap.classList.add('visible');
  if (musicaFondo.paused) startMusic();
  letterWrap.setAttribute('aria-hidden', 'false');
  openLetterButton.textContent = 'Volver a leer la cartita 💌';
  closeLetterButton.focus({ preventScroll: true });
  showerHearts(12);

  window.setTimeout(() => {
    letterWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function closeLetter() {
  letterWrap.classList.remove('visible');
  letterWrap.setAttribute('aria-hidden', 'true');
  openLetterButton.textContent = 'Abrir mi cartita 💌';
  giftSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function makeParticle(symbol) {
  const particle = document.createElement('span');
  particle.className = 'particle';
  particle.textContent = symbol;
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.fontSize = `${12 + Math.random() * 20}px`;
  particle.style.animationDuration = `${5 + Math.random() * 5}s`;
  particle.style.animationDelay = `${Math.random() * 1.8}s`;
  particles.appendChild(particle);
  window.setTimeout(() => particle.remove(), 11500);
}

function showerHearts(amount = 24) {
  const symbols = ['♥', '♡', '✿', '✧', '💕'];
  for (let i = 0; i < amount; i++) {
    window.setTimeout(() => {
      makeParticle(symbols[Math.floor(Math.random() * symbols.length)]);
    }, i * 65);
  }
}

// La canción personalizada se reproduce después de una interacción del usuario.
async function startMusic() {
  try {
    await musicaFondo.play();
    musicPlaying = true;
    musicButton.classList.add('playing');
    musicButton.setAttribute('aria-pressed', 'true');
    musicButton.textContent = 'Ⅱ Pausar música';
  } catch (error) {
    musicPlaying = false;
    musicButton.classList.remove('playing');
    musicButton.setAttribute('aria-pressed', 'false');
    musicButton.textContent = '♫ Activar música de fondo';
    showToast('No se pudo reproducir. Verifica que cancion.mp3 esté en la carpeta.');
    console.error('Error al reproducir la canción:', error);
  }
}

function stopMusic() {
  musicaFondo.pause();
  musicPlaying = false;
  musicButton.classList.remove('playing');
  musicButton.setAttribute('aria-pressed', 'false');
  musicButton.textContent = '♫ Activar música de fondo';
}

musicButton.addEventListener('click', () => {
  if (musicaFondo.paused) startMusic();
  else stopMusic();
});

giftButton.addEventListener('click', openGift);
openLetterButton.addEventListener('click', openLetter);
closeLetterButton.addEventListener('click', closeLetter);

// Unos pocos corazones suaves mantienen la página viva sin distraer.
for (let i = 0; i < 7; i++) {
  window.setTimeout(() => makeParticle(['♡', '♥', '✧'][i % 3]), i * 700);
}
