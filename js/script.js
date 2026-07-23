const cursorGlow = document.querySelector('.cursor-glow');
const year = document.getElementById('year');
const typedText = document.getElementById('typed-text');
const typedWords = ['Ethical Hacker', 'Pentester', 'Cybersecurity', 'Dev em evolução'];
const obfuscatedLinks = {
  email: 'bWFpbHRvOmthaXF1ZWNhYnJhbDg2NkBnbWFpbC5jb20=',
  whatsapp: 'aHR0cHM6Ly93YS5tZS81NTEzOTkyMDIzMzI5',
  linkedin: 'aHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL2thaXF1ZS1jYWJyYWwtbW91cmEtYjg0NjYwMjE5'
};
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

function decodeBase64(value) {
  const bytes = Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function applyObfuscatedLinks() {
  const emailLink = document.getElementById('email-link');
  const whatsappLink = document.getElementById('whatsapp-link');
  const linkedinLink = document.getElementById('linkedin-link');

  if (emailLink) {
    emailLink.href = decodeBase64(obfuscatedLinks.email);
  }

  if (whatsappLink) {
    whatsappLink.href = decodeBase64(obfuscatedLinks.whatsapp);
  }

  if (linkedinLink) {
    linkedinLink.href = decodeBase64(obfuscatedLinks.linkedin);
  }
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

applyObfuscatedLinks();

if (year) {
  year.textContent = new Date().getFullYear();
}

function loadProtectedImage(imgId) {
  const el = document.getElementById(imgId);
  if (!el) return;

  if (window.profileImageEncodedHex) {
    const bytes = Uint8Array.from(window.profileImageEncodedHex.match(/.{1,2}/g) || [], (hex) => parseInt(hex, 16) ^ 7);
    const blob = new Blob([bytes], { type: 'image/webp' });
    const url = URL.createObjectURL(blob);
    el.src = url;
  }
}

loadProtectedImage('profile-img');
