// ===== ACCORDION FUNCTIONALITY =====
class AccordionManager {
  constructor() {
    this.accordionHeaders = document.querySelectorAll('.accordion-header');
    this.init();
  }

  init() {
    this.accordionHeaders.forEach(header => {
      header.addEventListener('click', () => this.toggle(header));
    });
  }

  toggle(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.accordion-icon');
    const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

    // Close all other accordions
    this.accordionHeaders.forEach(h => {
      const c = h.nextElementSibling;
      const i = h.querySelector('.accordion-icon');
      if (h !== header) {
        c.style.maxHeight = '0px';
        if (i) i.style.transform = 'rotate(0deg)';
      }
    });

    // Toggle current accordion
    if (isOpen) {
      content.style.maxHeight = '0px';
      if (icon) icon.style.transform = 'rotate(0deg)';
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
      if (icon) icon.style.transform = 'rotate(180deg)';
    }
  }
}

// ===== ANIMATED COUNTER FOR STATISTICS =====
class CounterAnimation {
  constructor() {
    this.counters = [
      { id: 'stat-co2', target: 50000, suffix: '+', duration: 2000 },
      { id: 'stat-members', target: 12000, suffix: '', duration: 2000 },
      { id: 'stat-farms', target: 200, suffix: '+', duration: 2000 },
      { id: 'stat-waste', target: 95, suffix: '%', duration: 2000 }
    ];
    this.hasAnimated = false;
    this.init();
  }

  init() {
    // Use Intersection Observer to trigger animation when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.animateAll();
            this.hasAnimated = true;
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = document.querySelector('#stat-co2')?.closest('section');
    if (statsSection) {
      observer.observe(statsSection);
    }
  }

  animateAll() {
    this.counters.forEach(counter => {
      this.animateCounter(counter);
    });
  }

  animateCounter({ id, target, suffix, duration }) {
    const element = document.getElementById(id);
    if (!element) return;

    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = this.formatNumber(target) + suffix;
        clearInterval(timer);
      } else {
        element.textContent = this.formatNumber(Math.floor(current)) + suffix;
      }
    }, 16);
  }

  formatNumber(num) {
    return num.toLocaleString();
  }
}

// ===== SCROLL REVEAL ANIMATION =====
class ScrollReveal {
  constructor() {
    this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Add initial hidden state and observe elements
    document.querySelectorAll('.content-card, .product-card').forEach(el => {
      el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
      observer.observe(el);
    });
  }
}

// ===== INITIALIZE ALL =====
document.addEventListener('DOMContentLoaded', () => {
  new AccordionManager();
  new CounterAnimation();
  new ScrollReveal();
  
  console.log('About page interactions loaded ✓');
});