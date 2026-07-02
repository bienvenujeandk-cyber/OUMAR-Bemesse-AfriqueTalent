// ================================================================
// AfriTalent – main.js
// JavaScript Vanilla – Toutes les fonctionnalités interactives
// ================================================================

// ------------------------------------------------------------
// 1. Dark / Light Mode – toggle + localStorage
// ------------------------------------------------------------
// Récupère le thème sauvegardé (ou 'light' par défaut)
const savedTheme = localStorage.getItem('afriTheme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Quand le DOM est prêt, initialise le toggle
const themeToggle = document.getElementById('darkModeToggle');
if (themeToggle) {
  themeToggle.checked = savedTheme === 'dark';
  themeToggle.addEventListener('change', function () {
    const theme = this.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('afriTheme', theme);
  });
}

// ------------------------------------------------------------
// 2. Navbar dynamique au scroll (fond, ombre, shrink)
// ------------------------------------------------------------
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ------------------------------------------------------------
// 3. Bouton « Retour en haut » – apparaît au scroll
// ------------------------------------------------------------
const backBtn = document.getElementById('backToTop');
if (backBtn) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      backBtn.classList.add('show');
    } else {
      backBtn.classList.remove('show');
    }
  });
  backBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ------------------------------------------------------------
// 4. Compteurs animés – IntersectionObserver
//    Fonctionne sur index.html (#stats) et about.html (#stats)
// ------------------------------------------------------------
const counters = document.querySelectorAll('h3[data-target]');
const counterObserver = new IntersectionObserver(function (entries, observer) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'), 10);
      let current = 0;
      // Calcule un pas pour que l'animation dure ~2 secondes
      const step = Math.ceil(target / 100);
      const interval = setInterval(function () {
        current += step;
        if (current >= target) {
          // Affiche la valeur finale avec séparateur de milliers
          el.textContent = target.toLocaleString('fr-FR');
          clearInterval(interval);
        } else {
          el.textContent = current.toLocaleString('fr-FR');
        }
      }, 20);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(function (counter) {
  counterObserver.observe(counter);
});

// ------------------------------------------------------------
// 5. Fade-in des sections au scroll – IntersectionObserver
// ------------------------------------------------------------
const sections = document.querySelectorAll('section, .page-header');
const fadeObserver = new IntersectionObserver(function (entries, observer) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

sections.forEach(function (section) {
  fadeObserver.observe(section);
});

// ------------------------------------------------------------
// 6. Filtrage dynamique des freelances (freelances.html)
//    9 profils fictifs – filtrage par catégorie sans rechargement
// ------------------------------------------------------------
var freelancers = [
  { name: 'Corei Cooper',       category: 'frontend',  specialty: 'Développeuse React',       rate: '30 €/h', rating: 4, bio: 'Spécialiste React avec 4 ans d\'expérience en applications SPA.', image: 'https://i.pravatar.cc/150?img=47' },
  { name: 'Kofi Mensah',      category: 'backend',   specialty: 'Ingénieur Node.js',        rate: '35 €/h', rating: 5, bio: 'Expert backend, APIs REST et microservices en Node.js.', image: 'https://i.pravatar.cc/150?img=68' },
  { name: 'Léa N\'Diaye',     category: 'design',    specialty: 'Designer UI/UX',           rate: '28 €/h', rating: 4, bio: 'Passionnée par le design centré utilisateur et l\'accessibilité.', image: 'https://i.pravatar.cc/150?img=49' },
  { name: 'Samuel Berlin',      category: 'ia',        specialty: 'Data Scientist',           rate: '40 €/h', rating: 5, bio: 'Machine Learning et analyse de données pour startups.', image: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Sakoura Queen', category: 'devops',    specialty: 'Ingénieure Cloud AWS',     rate: '32 €/h', rating: 4, bio: 'Infrastructure cloud, CI/CD et automatisation DevOps.', image: 'https://i.pravatar.cc/150?img=32' },
  { name: 'Nicolas Ly',  category: 'marketing', specialty: 'Marketing Digital',        rate: '25 €/h', rating: 3, bio: 'Stratégie digitale, SEO et campagnes publicitaires.', image: 'https://i.pravatar.cc/150?img=52' },
  { name: 'Dezi Obrayane',       category: 'frontend',  specialty: 'Développeuse Vue.js',      rate: '30 €/h', rating: 4, bio: 'Interfaces réactives et performantes avec Vue.js et Nuxt.', image: 'https://i.pravatar.cc/150?img=26' },
  { name: 'Marcio Donarosa',    category: 'backend',   specialty: 'Développeur Python/Django', rate: '33 €/h', rating: 5, bio: 'Architecture backend robuste, Django REST Framework.', image: 'https://i.pravatar.cc/150?img=33' },
  { name: 'Khary Fernadez',      category: 'design',    specialty: 'Graphiste & Brand Designer', rate: '27 €/h', rating: 4, bio: 'Identité visuelle, branding et supports de communication.', image: 'https://i.pravatar.cc/150?img=41' }
];

// Fonction qui génère le HTML des cartes freelance
function renderFreelancers(filter) {
  var container = document.getElementById('freelance-grid');
  if (!container) return; // Page sans grille freelance
  container.innerHTML = '';

  var list = (filter === 'all' || !filter)
    ? freelancers
    : freelancers.filter(function (f) { return f.category === filter; });

  list.forEach(function (f, index) {
    var col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';
    // Générer les étoiles
    var stars = '';
    for (var i = 0; i < 5; i++) {
      stars += i < f.rating ? '★' : '☆';
    }
    col.innerHTML =
      '<div class="card service-card h-100 text-center p-4">' +
        '<div class="mb-3 d-flex justify-content-center">' +
          '<img src="' + f.image + '" ' +
               'alt="Portrait de ' + f.name + ', ' + f.specialty + '" ' +
               'class="freelance-avatar img-thumbnail rounded-circle" />' +
        '</div>' +
        '<h5>' + f.name + '</h5>' +
        '<p class="text-primary mb-1"><small>' + f.specialty + '</small></p>' +
        '<p class="mb-1 text-muted"><small>' + f.bio + '</small></p>' +
        '<p class="mb-1"><strong>' + f.rate + '</strong></p>' +
        '<p class="text-warning mb-3">' + stars + '</p>' +
        '<button class="btn btn-outline-primary btn-sm mt-auto" onclick="alert(\'Profil de ' + f.name.replace(/'/g, "\\'") + '\')">Voir le profil</button>' +
      '</div>';
    container.appendChild(col);
  });
}

// Rendu initial au chargement de la page
renderFreelancers('all');

// Écoute des boutons de filtre
var filterButtons = document.querySelectorAll('[data-category]');
filterButtons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    var cat = this.getAttribute('data-category');
    renderFreelancers(cat);
    // Met à jour le style actif des boutons
    filterButtons.forEach(function (b) {
      b.classList.remove('active', 'btn-primary');
      b.classList.add('btn-outline-primary');
    });
    this.classList.remove('btn-outline-primary');
    this.classList.add('active', 'btn-primary');
  });
});

// ------------------------------------------------------------
// 7. Validation du formulaire de contact (contact.html)
//    Regex email, longueur min message, retour visuel
// ------------------------------------------------------------
var contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var isValid = true;

    // Fonction utilitaire pour appliquer l'état de validation
    function setFieldState(field, valid, errorMsg) {
      var feedback = field.nextElementSibling;
      if (valid) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
      } else {
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');
        if (feedback && feedback.classList.contains('invalid-feedback')) {
          feedback.textContent = errorMsg;
        }
        isValid = false;
      }
    }

    // Validation du prénom
    var firstName = document.getElementById('firstName');
    setFieldState(firstName, firstName.value.trim() !== '', 'Veuillez entrer votre prénom.');

    // Validation du nom
    var lastName = document.getElementById('lastName');
    setFieldState(lastName, lastName.value.trim() !== '', 'Veuillez entrer votre nom.');

    // Validation de l'email avec regex
    var email = document.getElementById('email');
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setFieldState(email, emailRegex.test(email.value), 'Veuillez entrer un email valide (ex : nom@domaine.com).');

    // Validation du sujet
    var subject = document.getElementById('subject');
    setFieldState(subject, subject.value !== '', 'Veuillez choisir un sujet.');

    // Validation du message (min 20 caractères)
    var message = document.getElementById('message');
    setFieldState(message, message.value.trim().length >= 20, 'Le message doit contenir au moins 20 caractères.');

    // Si tout est valide, afficher le message de succès
    if (isValid) {
      var successDiv = document.getElementById('form-success');
      successDiv.style.display = 'block';
      contactForm.reset();
      // Retire les classes de validation après succès
      var fields = contactForm.querySelectorAll('.is-valid, .is-invalid');
      fields.forEach(function (el) {
        el.classList.remove('is-valid', 'is-invalid');
      });
      // Cache le message de succès après 5 secondes
      setTimeout(function () {
        successDiv.style.display = 'none';
      }, 5000);
    }
  });
}

// ------------------------------------------------------------
// 8. Année dynamique dans le footer (toutes les pages)
// ------------------------------------------------------------
var yearSpan = document.getElementById('currentYear');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}


const words = ["talents", "freelances", "experts", "développeurs"];
let wordIndex = 0, charIndex = 0, deleting = false;
const el = document.getElementById("typewriter");

function type() {
  const word = words[wordIndex];
  el.textContent = deleting
    ? word.slice(0, --charIndex)
    : word.slice(0, ++charIndex);

  if (!deleting && charIndex === word.length)
    return setTimeout(() => { deleting = true; type(); }, 1500);
  if (deleting && charIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// ================================================================
// Fin de main.js
// ================================================================