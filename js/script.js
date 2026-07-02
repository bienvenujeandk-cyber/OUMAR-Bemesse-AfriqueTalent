document.addEventListener('DOMContentLoaded', () => {

  /* ===================== DARK / LIGHT MODE (localStorage) ===================== */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const root = document.documentElement;

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      themeIcon.classList.remove('bi-moon-stars-fill');
      themeIcon.classList.add('bi-sun-fill');
    } else {
      root.removeAttribute('data-theme');
      themeIcon.classList.remove('bi-sun-fill');
      themeIcon.classList.add('bi-moon-stars-fill');
    }
  };

  // Thème sauvegardé, sinon préférence système, sinon clair par défaut
  const savedTheme = localStorage.getItem('afriquetalent-theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }

  themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('afriquetalent-theme', newTheme);
  });

  /* ===================== NAVBAR DYNAMIQUE AU SCROLL ===================== */
  const navbar = document.querySelector('.custom-navbar');
  const scrollThreshold = 60;

  const updateNavbarOnScroll = () => {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('navbar-shrink');
    } else {
      navbar.classList.remove('navbar-shrink');
    }
  };
  updateNavbarOnScroll();
  window.addEventListener('scroll', updateNavbarOnScroll);

  /* ===================== BOUTON RETOUR EN HAUT ===================== */
  const backToTopBtn = document.getElementById('backToTop');
  const backToTopThreshold = 400;

  const updateBackToTop = () => {
    if (window.scrollY > backToTopThreshold) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  };
  updateBackToTop();
  window.addEventListener('scroll', updateBackToTop);

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ===================== FADE-IN DES SECTIONS AU SCROLL ===================== */
  const fadeSections = document.querySelectorAll('.fade-in-section');

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeSections.forEach(section => fadeObserver.observe(section));

  /* ===================== COMPTEURS ANIMÉS AU SCROLL ===================== */
  const statNumbers = document.querySelectorAll('.stat-number');
  const animationDuration = 1500; // ms

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / animationDuration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = Math.floor(eased * target);
      el.textContent = value + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    };

    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

});
