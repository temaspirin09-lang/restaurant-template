/* =========================================================
   SALT & STEM — interactions
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header shrink on scroll ---------- */
  const header = document.getElementById('siteHeader');
  const setHeaderState = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Testimonial slider ---------- */
  const track = document.getElementById('sliderTrack');
  const dotsWrap = document.getElementById('sliderDots');
  if (track && dotsWrap) {
    const slides = Array.from(track.querySelectorAll('.slide'));
    let current = 0;
    let timer = null;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Показать отзыв ${i + 1}`);
      dot.addEventListener('click', () => goTo(i, true));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function goTo(index, userTriggered) {
      slides[current].classList.remove('is-active');
      dots[current].classList.remove('is-active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      dots[current].classList.add('is-active');
      if (userTriggered) restartAutoplay();
    }
    function restartAutoplay() {
      if (timer) clearInterval(timer);
      timer = setInterval(() => goTo(current + 1), 6000);
    }
    goTo(0);
    restartAutoplay();
  }

  /* ---------- Reservation form (front-end only demo) ---------- */
  const form = document.getElementById('reserveForm');
  const note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Static template, no backend attached.
      // Wire up to Formspree / Netlify Forms / your API before going live.
      note.textContent = 'Спасибо! Заявка сформирована — подключите форму к сервису отправки (см. README).';
      form.reset();
    });
  }

});
