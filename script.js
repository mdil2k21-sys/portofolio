/* ===========================
   script.js
   JavaScript buat interactivity
   =========================== */


// ===========================
// 1. NAVBAR HAMBURGER TOGGLE
// Buat mobile: klik hamburger → menu muncul/hilang
// ===========================

// querySelector: cari element berdasarkan CSS selector
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

// addEventListener: pasang "listener" yang nunggu event tertentu
// 'click' = pas di-klik, jalanin function ini
navToggle.addEventListener('click', () => {
    // classList.toggle: kalau belum ada class 'active', tambahin.
    // Kalau udah ada, hapus. Jadi kayak on/off switch.
    navLinks.classList.toggle('active');
});

// Close menu kalau salah satu link di-klik (mobile)
// querySelectorAll: cari SEMUA element yang match
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        // Hapus class 'active' → menu tertutup
        navLinks.classList.remove('active');
    });
});


// ===========================
// 2. NAVBAR SCROLL EFFECT
// Navbar berubah style pas scroll ke bawah
// ===========================

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');

    // window.scrollY = seberapa jauh user udah scroll dari atas
    if (window.scrollY > 50) {
        // Kalau scroll lebih dari 50px, tambah class 'scrolled'
        navbar.classList.add('scrolled');
        // Tambahin inline style: background lebih solid pas scroll
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.background = 'rgba(15, 23, 42, 0.9)';
    }
});


// ===========================
// 3. SCROLL REVEAL ANIMATION
// Elements muncul dengan animasi pas di-scroll ke view
// ===========================

// IntersectionObserver: browser API yang ngasih tau
// kapan suatu element masuk/keluar dari viewport (layar)
const observerOptions = {
    threshold: 0.1,     // Trigger kalau 10% element udah keliatan
    rootMargin: '0px'   // Gak ada margin tambahan
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Kalau element masuk viewport, tambahin class 'visible'
            entry.target.classList.add('visible');
            // unobserve: berhenti observe element ini (animasi cuma sekali)
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe semua section dan card
document.querySelectorAll('section, .skill-card, .project-card').forEach(el => {
    // Tambahin class 'fade-in' ke semua element yang mau di-animasi
    el.classList.add('fade-in');
    // Mulai observe
    observer.observe(el);
});


// ===========================
// 4. SMOOTH SCROLL (Enhancement)
// Kalau anchor link di-klik, scroll smooth ke section tujuan
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // preventDefault: cancel behavior default browser
        e.preventDefault();

        const targetId = this.getAttribute('href');
        // Kalau cuma '#', skip
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // scrollIntoView: scroll halaman sampai element keliatan
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// ===========================
// 5. TYPING EFFECT (Hero section)
// Text di hero muncul kayak diketik
// ===========================

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';  // Kosongin dulu

    function type() {
        if (i < text.length) {
            // Tambahin 1 karakter tiap interval
            element.textContent += text.charAt(i);
            i++;
            // setTimeout: jalanin function 'type' lagi setelah 'speed' ms
            setTimeout(type, speed);
        }
    }
    type();
}

// Jalanin typing effect pas page load
window.addEventListener('load', () => {
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        typeWriter(heroName, 'Aidil', 100);
    }
});


// ===========================
// CSS buat fade-in animation (inject via JS)
// Bisa juga ditaro di CSS file, tapi disini biar lu liat
// gimana JS bisa bikin style juga
// ===========================

const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
