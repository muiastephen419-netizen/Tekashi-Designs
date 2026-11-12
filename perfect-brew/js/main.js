/* Perfect Brew Café — Main JS */

document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    if (window.scrollY > 500) {
      backToTop?.classList.add('visible');
    } else {
      backToTop?.classList.remove('visible');
    }
  });

  // Mobile menu
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav a');

  hamburger?.addEventListener('click', () => {
    mobileNav?.classList.toggle('open');
    hamburger.classList.toggle('active');
    document.body.style.overflow = mobileNav?.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav?.classList.remove('open');
      hamburger?.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Back to top
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Intersection Observer — fade up
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.feature-card, .visit-card, .timeline-item, .menu-item, .team-card, .value-card').forEach(el => {
    fadeObserver.observe(el);
  });

  // Stagger delay for feature cards
  document.querySelectorAll('.feature-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });

  document.querySelectorAll('.visit-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
  });

  // Menu category filtering
  const catTabs = document.querySelectorAll('.cat-tab');
  const menuSections = document.querySelectorAll('.menu-section');

  catTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      catTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.dataset.category;

      menuSections.forEach(section => {
        if (target === 'all' || section.id === target) {
          section.style.display = 'block';
          section.style.animation = 'fadeIn 0.4s ease';
        } else {
          section.style.display = 'none';
        }
      });

      // Smooth scroll to menu content
      const menuContent = document.querySelector('.menu-content');
      if (menuContent && target !== 'all') {
        menuContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Animated counters (About page)
  const counters = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const duration = 1800;
        const start = performance.now();

        const update = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(ease * target).toLocaleString();
          if (progress < 1) requestAnimationFrame(update);
          else el.textContent = target.toLocaleString() + (el.dataset.suffix || '');
        };

        requestAnimationFrame(update);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // Contact form
  const form = document.querySelector('#contactForm');
  const formSuccess = document.querySelector('.form-success');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simple validation
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const message = form.querySelector('[name="message"]');

    let valid = true;
    [name, email, message].forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#c0392b';
        valid = false;
      } else {
        field.style.borderColor = '';
      }
    });

    if (!valid) return;

    // Simulate submit
    form.style.opacity = '0.5';
    form.style.pointerEvents = 'none';

    setTimeout(() => {
      form.style.display = 'none';
      formSuccess?.classList.add('show');
    }, 800);
  });

  // Testimonial dots (simple)
  const track = document.querySelector('.testimonial-track');
  const dots = document.querySelectorAll('.dot');

  if (track && dots.length) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        const card = track.children[i];
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
        }
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
      });
    });

    // Update active dot on scroll
    track.addEventListener('scroll', () => {
      const scrollLeft = track.scrollLeft;
      const cardWidth = track.children[0]?.offsetWidth + 24 || 340;
      const index = Math.round(scrollLeft / cardWidth);
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    });
  }

  // Add to order buttons
  document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const original = this.textContent;
      this.textContent = 'Added ✓';
      this.style.background = 'var(--caramel)';
      this.style.color = 'white';
      setTimeout(() => {
        this.textContent = original;
        this.style.background = '';
        this.style.color = '';
      }, 1800);
    });
  });
});

// Simple fade-in keyframe used by menu filter
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
