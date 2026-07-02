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

});
