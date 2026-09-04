const navbar = document.getElementById('navbar');
const menuIcon = document.getElementById('menuIcon');
const themeIcon = document.getElementById('themeIcon');
const themeText = document.getElementById('themeText');

function toggleMenu() {
    navbar.classList.toggle('active');
    if (navbar.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-xmark');
    } else {
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
    }
}

function closeMenu() {
    navbar.classList.remove('active');
    menuIcon.classList.remove('fa-xmark');
    menuIcon.classList.add('fa-bars');
}

// --- LOGIKA LIGHT / DARK MODE ---
function updateThemeUI(theme) {
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.className = 'fa-solid fa-sun';
        themeText.textContent = 'Mode Gelap';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fa-solid fa-moon';
        themeText.textContent = 'Mode Terang';
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    updateThemeUI(newTheme);
}

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
    updateThemeUI(savedTheme);
} else if (!prefersDark) {
    updateThemeUI('light');
} else {
    updateThemeUI('dark');
}

// --- FITUR INTERAKTIF 3D PERSISTEN (TAHAN SAAT DI-TAP) ---
const interactiveElements = document.querySelectorAll('.card, .info-card-box, .tool-badge, .cert-card, .summary-text');

function removeAllActiveClasses() {
    interactiveElements.forEach(el => el.classList.remove('is-active'));
}

interactiveElements.forEach(el => {
    el.addEventListener('click', function(e) {
        e.stopPropagation();
        if (this.classList.contains('is-active')) {
            this.classList.remove('is-active');
        } else {
            removeAllActiveClasses();
            this.classList.add('is-active');
        }
    });
});

// Hilangkan efek aktif jika melakukan Tap di tempat kosong atau saat Scroll
document.addEventListener('click', function() {
    removeAllActiveClasses();
});

window.addEventListener('scroll', function() {
    removeAllActiveClasses();
}, {passive: true});
