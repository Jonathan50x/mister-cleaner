// script.js
// -------------------------------------------------
// Interatividade geral do site Mister Cleaner
// -------------------------------------------------

// 1. Menu hamburger (mobile)
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// 2. Depoimentos – fade‑in ao entrar na viewport
const testimonialObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.testimonial-card').forEach(card => {
  testimonialObserver.observe(card);
});

// 3. Modal de Política de Privacidade
const privacyOpenBtn = document.querySelector('.privacy-modal-open');
const privacyModal = document.getElementById('privacy-modal');
const privacyClose = privacyModal ? privacyModal.querySelector('.close-modal') : null;
if (privacyOpenBtn && privacyModal) {
  privacyOpenBtn.addEventListener('click', () => {
    privacyModal.style.display = 'block';
  });
}
if (privacyClose) {
  privacyClose.addEventListener('click', () => {
    privacyModal.style.display = 'none';
  });
}
// Fechar modal ao clicar fora do conteúdo
window.addEventListener('click', e => {
  if (e.target === privacyModal) {
    privacyModal.style.display = 'none';
  }
});

// 4. Track WhatsApp button clicks (analytics placeholders)
function trackWhatsAppClick() {
  // Google Analytics (gtag.js) – substitua 'GA_MEASUREMENT_ID' pelo seu ID
  if (window.gtag) {
    gtag('event', 'whatsapp_click', {
      'event_category': 'conversion',
      'event_label': 'Orçamento via WhatsApp'
    });
  }
  // Meta Pixel – substitua 'PIXEL_ID' pelo seu ID
  if (window.fbq) {
    fbq('track', 'Lead', { content_name: 'WhatsApp Click' });
  }
}
// Attach listener to all WhatsApp buttons (inclui versão navbar e hero)
const whatsappButtons = document.querySelectorAll('.whatsapp-button');
whatsappButtons.forEach(btn => {
  btn.addEventListener('click', trackWhatsAppClick);
});

// 5. Smooth scroll fallback for browsers que não suportam CSS scroll-behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
    // fecha menu mobile ao clicar em link
    if (navLinks && navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
    }
  });
});

// -------------------------------------------------
// Fim do script.js
// -------------------------------------------------
