import { useEffect, useRef } from 'react';
import { FaHome, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n/useTranslation';

const Hero = ({ title, subtitle, breadcrumb, backgroundImage = '/images/hero-bg.jpg', bottomGap = 48 }) => {
  const heroRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const setOffsets = () => {
      const header = document.querySelector('.header');
      const headerH = header ? header.offsetHeight : 80;
      let annPx = 0;
      try {
        const val = getComputedStyle(document.documentElement).getPropertyValue('--announcement-offset') || '0px';
        annPx = parseFloat(val) || 0;
      } catch (_) {}
      const totalTop = headerH + annPx;
      if (heroRef.current) {
        heroRef.current.style.setProperty('--hero-top-offset', `${totalTop}px`);
        heroRef.current.style.setProperty('--hero-bottom-gap', typeof bottomGap === 'number' ? `${bottomGap}px` : String(bottomGap));
      }
    };

    setOffsets();
    window.addEventListener('resize', setOffsets);
    return () => window.removeEventListener('resize', setOffsets);
  }, [bottomGap]);

  const scrollNext = () => {
    const el = heroRef.current;
    if (!el) return;
    const next = el.nextElementSibling;
    if (next) {
      next.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} className="hero" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">{title}</h1>
          {subtitle && <p className="hero-subtitle">{subtitle}</p>}
          {breadcrumb && (
            <div className="breadcrumb">
              <Link to="/">
                <FaHome />
                <span>{t('nav.home')}</span>
              </Link>
              <FaChevronRight />
              <span>{breadcrumb}</span>
            </div>
          )}
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <button className="scroll-btn" onClick={scrollNext} aria-label={t('common.scrollDown')}>
          <FaChevronDown />
        </button>
      </div>

      <style>{`
        .hero {
          position: relative;
          /* Fullscreen height */
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          padding-top: var(--hero-top-offset, 80px); /* Compensate for fixed header + announcement */
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.37);
          opacity: 0.6;
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: var(--color-white);
          animation: fadeInUp 0.8s ease-out;
          width: 100%;
        }

        .hero-scroll-indicator {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: calc(var(--hero-bottom-gap, 48px) / 2);
          z-index: 2;
        }

        .scroll-btn {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-full);
          border: 2px solid rgba(255,255,255,0.9);
          background: rgba(0,0,0,0.15);
          color: var(--color-white);
          display: grid;
          place-items: center;
          animation: bounceY 1.8s infinite ease-in-out;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
        }

        .scroll-btn:hover {
          background: rgba(255,255,255,0.15);
        }

        @keyframes bounceY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }

        .hero-title {
          font-size: var(--font-size-5xl);
          font-weight: var(--font-weight-extrabold);
          color: var(--color-white);
          margin-bottom: var(--spacing-md);
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .hero-subtitle {
          font-size: var(--font-size-xl);
          color: var(--color-white);
          margin-bottom: var(--spacing-xl);
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
          text-align: center;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-md);
          font-size: var(--font-size-base);
          background: rgba(255, 255, 255, 0.1);
          padding: var(--spacing-sm) var(--spacing-lg);
          border-radius: var(--radius-full);
          display: inline-flex;
          backdrop-filter: blur(5px);
        }

        .breadcrumb a {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          color: var(--color-white);
          transition: color var(--transition-fast);
        }

        .breadcrumb a:hover {
          color: var(--color-primary-light);
        }

        .breadcrumb svg {
          font-size: var(--font-size-sm);
        }

        @media (max-width: 1024px) {
          .hero {
            /* Disable fixed background on mobile/tablets for smoother scroll */
            background-attachment: scroll;
          }
        }

        @media (max-width: 768px) {
          .hero {
            min-height: calc(100svh - var(--hero-top-offset, 70px) - var(--hero-bottom-gap, 32px));
          }

          .hero-title {
            font-size: var(--font-size-4xl);
          }

          .hero-subtitle {
            font-size: var(--font-size-lg);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
