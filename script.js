// ===========================
// PORTFOLIO V2 — script.js
// Minimal: active nav highlight on scroll
// ===========================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

// IntersectionObserver buat highlight nav yang aktif
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Hapus active dari semua link
            navLinks.forEach(l => l.classList.remove('active'));
            // Tambahin active ke link yang match section ini
            const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}, { threshold: 0.3 });

sections.forEach(s => observer.observe(s));