import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollReveal = () => {
  const location = useLocation();

  useEffect(() => {
    const selectors = [
      // Global typography and elements
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p',
      'img',
      'button',
      '.btn',
      // Components
      '.section-title',
      '.card',
      '.team-card',
      /* Keep gallery items excluded to ensure thumbs are always visible */
      '.mv-card',
      '.value-item',
      '.about-block',
      '.togo-grid > *',
      '.cause-layout > *',
      '.events-grid > *',
      '.event-details',
    ];

    const elements = Array.from(document.querySelectorAll(selectors.join(',')));

    // Cleanup: ensure no stale 'reveal' remains on generic sections or gallery items
    document.querySelectorAll('section.reveal, .gallery-item.reveal').forEach((el) => {
      el.classList.remove('reveal');
      el.classList.add('reveal-visible');
    });

    // Ensure hero is never hidden by reveal logic
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.classList.add('reveal-visible');
      hero.classList.remove('reveal');
    }

    // If on Gallery route, do not apply reveal animations to avoid invisibility on desktop
    if (location.pathname.startsWith('/gallery')) {
      return () => {};
    }

    let revealedAny = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            revealedAny = true;
          } else {
            // Remove class when out of view to re-trigger animation next time
            entry.target.classList.remove('reveal-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    elements.forEach((el) => {
      el.classList.add('reveal');
      observer.observe(el);
    });

    // Safety fallback: if nothing was revealed soon after mount (e.g., some mobile/IOS quirks), force show.
    const timeoutId = window.setTimeout(() => {
      if (!revealedAny) {
        elements.forEach((el) => {
          if (!el.classList.contains('reveal-visible')) {
            el.classList.add('reveal-visible');
          }
        });
      }
    }, 700);

    return () => {
      window.clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [location.pathname]);

  return null;
};

export default ScrollReveal;
