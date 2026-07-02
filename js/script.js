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

  /* ===================== FILTRAGE DYNAMIQUE DES FREELANCES ===================== */
  const filterBar = document.getElementById('filterBar');

  if (filterBar) {
    const filterButtons = filterBar.querySelectorAll('.filter-btn');
    const freelanceItems = document.querySelectorAll('.freelance-item');
    const noResults = document.getElementById('noResults');

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        let visibleCount = 0;

        freelanceItems.forEach(item => {
          const category = item.getAttribute('data-category');
          const matches = (filter === 'all' || category === filter);
          item.style.display = matches ? '' : 'none';
          if (matches) visibleCount++;
        });

        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
      });
    });
  }

  /* ===================== VALIDATION DU FORMULAIRE DE CONTACT ===================== */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    const fields = {
      fullName: { el: document.getElementById('fullName'), errorEl: document.getElementById('error-fullName') },
      email: { el: document.getElementById('email'), errorEl: document.getElementById('error-email') },
      subject: { el: document.getElementById('subject'), errorEl: document.getElementById('error-subject') },
      message: { el: document.getElementById('message'), errorEl: document.getElementById('error-message') },
    };
    const successMessage = document.getElementById('successMessage');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const MIN_MESSAGE_LENGTH = 20;

    const setError = (field, message) => {
      field.el.classList.add('is-invalid');
      field.errorEl.textContent = message;
    };

    const clearError = (field) => {
      field.el.classList.remove('is-invalid');
      field.errorEl.textContent = '';
    };

    const validateField = (name) => {
      const field = fields[name];
      const value = field.el.value.trim();

      if (name === 'fullName') {
        if (value === '') {
          setError(field, 'Le nom complet est requis.');
          return false;
        }
        if (value.length < 3) {
          setError(field, 'Le nom doit contenir au moins 3 caractères.');
          return false;
        }
      }

      if (name === 'email') {
        if (value === '') {
          setError(field, "L'adresse email est requise.");
          return false;
        }
        if (!emailRegex.test(value)) {
          setError(field, 'Veuillez entrer une adresse email valide.');
          return false;
        }
      }

      if (name === 'subject') {
        if (value === '') {
          setError(field, 'Le sujet est requis.');
          return false;
        }
      }

      if (name === 'message') {
        if (value === '') {
          setError(field, 'Le message est requis.');
          return false;
        }
        if (value.length < MIN_MESSAGE_LENGTH) {
          setError(field, `Le message doit contenir au moins ${MIN_MESSAGE_LENGTH} caractères (actuellement ${value.length}).`);
          return false;
        }
      }

      clearError(field);
      return true;
    };

    // Validation en direct pendant la saisie
    Object.keys(fields).forEach(name => {
      fields[name].el.addEventListener('input', () => validateField(name));
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      successMessage.classList.remove('show');

      let isFormValid = true;
      Object.keys(fields).forEach(name => {
        if (!validateField(name)) isFormValid = false;
      });

      if (isFormValid) {
        successMessage.classList.add('show');
        contactForm.reset();
        Object.keys(fields).forEach(name => clearError(fields[name]));
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

});
