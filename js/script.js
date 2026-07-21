const cursorGlow = document.querySelector('.cursor-glow');
const year = document.getElementById('year');
const typedText = document.getElementById('typed-text');
const typedWords = ['Ethical Hacker', 'Pentester', 'Cybersecurity', 'Dev em evolução'];
let typedWordIndex = 0;
let typedCharIndex = 0;

let isDeleting = false;
let typeDelay = 90;
let pauseDelay = 1200;

function typeLoop() {
  const currentWord = typedWords[typedWordIndex];
  const currentText = typedText.textContent || '';

  if (!isDeleting) {
    typedText.textContent = currentWord.slice(0, currentText.length + 1);
  } else {
    typedText.textContent = currentWord.slice(0, currentText.length - 1);
  }

  if (!isDeleting && typedText.textContent === currentWord) {
    setTimeout(() => {
      isDeleting = true;
      typeLoop();
    }, pauseDelay);
    return;
  }

  if (isDeleting && typedText.textContent === '') {
    isDeleting = false;
    typedWordIndex = (typedWordIndex + 1) % typedWords.length;
    setTimeout(typeLoop, 300);
    return;
  }

  const delay = isDeleting ? typeDelay / 1.5 : typeDelay;
  setTimeout(typeLoop, delay);
}

if (typedText) {
  typeLoop();
}

document.addEventListener('mousemove', (event) => {
  if (!cursorGlow) return;
  const x = event.clientX;
  const y = event.clientY;
  cursorGlow.style.left = `${x}px`;
  cursorGlow.style.top = `${y}px`;
});

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => observer.observe(item));

year.textContent = new Date().getFullYear();

// Carregamento condicional de imagens: tenta várias extensões/nomes até encontrar uma imagem existente
function loadImageWithCandidates(imgId, candidates) {
  const el = document.getElementById(imgId);
  if (!el || !candidates || candidates.length === 0) return;

  let i = 0;
  function tryNext() {
    if (i >= candidates.length) return; // nada encontrado
    const url = candidates[i++];
    const test = new Image();
    test.onload = () => { el.src = url; };
    test.onerror = () => { tryNext(); };
    test.src = url;
  }

  tryNext();
}

loadImageWithCandidates('profile-img', ['img/perfil.webp','img/perfil.jpg','img/perfil.png','img/perfil.jpeg','img/perfil.svg']);
loadImageWithCandidates('banner-img', ['img/banner.webp','img/banner.jpg','img/banner.png','img/banner.svg']);
