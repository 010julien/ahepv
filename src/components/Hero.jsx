import { useEffect, useRef, useState } from 'react';
import { FaHome, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n/useTranslation';

const Hero = ({ 
  title, 
  subtitle,
  breadcrumb, 
  backgroundImage = '/images/hero-bg.jpg', 
  images = [], 
  bottomGap = 48,
  overlayOpacity = 0.4,
  children 
}) => {
  const heroRef = useRef(null);
  const { t } = useTranslation();
  const [heroIndex, setHeroIndex] = useState(0);

  // Use provided images array, or fallback to single backgroundImage
  const slides = images.length > 0 ? images : [backgroundImage];

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

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
    <section ref={heroRef} className="hero">
      {/* Background Slideshow */}
      <div className="hero-bg-container">
        {slides.map((img, index) => (
          <div 
            key={index} 
            className={`hero-bg-slide ${index === heroIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>

      <div className="hero-overlay" style={{ opacity: overlayOpacity }}></div>
      
      <div className="container">
        <div className="hero-content">
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
          
          <h1 className="hero-title">{title}</h1>
          
          <div className="hero-divider"></div>
          
          {subtitle && <p className="hero-subtitle">{subtitle}</p>}
          
          {children && <div className="hero-actions">{children}</div>}
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
          min-height: 85vh;
          display: flex;
          align-items: center;
          margin-top: var(--hero-top-offset, 80px);
          padding-top: 0;
          overflow: hidden;
        }

        /* Slideshow Styles */
        .hero-bg-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .hero-bg-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 1.5s ease-in-out, transform 6s ease;
          transform: scale(1.1);
        }

        .hero-bg-slide.active {
          opacity: 1;
          transform: scale(1);
          z-index: 1;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.1) 80%, rgba(0,0,0,0) 100%);
          z-index: 2;
        }

        .hero-content {
          position: relative;
          z-index: 3;
          color: var(--color-white);
          width: 100%;
          max-width: 850px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 2rem 0;
        }

        /* Entry Animations */
        .breadcrumb { animation: slideInLeft 0.8s ease-out forwards; opacity: 0; }
        .hero-title { animation: slideInLeft 0.8s ease-out 0.2s forwards; opacity: 0; }
        .hero-divider { animation: scaleXIn 0.8s ease-out 0.4s forwards; opacity: 0; transform-origin: left; }
        .hero-subtitle { animation: slideInUp 0.8s ease-out 0.6s forwards; opacity: 0; }
        .hero-actions { animation: slideInUp 0.8s ease-out 0.8s forwards; opacity: 0; }

        @keyframes slideInLeft {
          from { transform: translateX(-30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes scaleXIn {
          from { transform: scaleX(0); opacity: 0; }
          to { transform: scaleX(1); opacity: 1; }
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          color: var(--color-white);
          margin-bottom: 1.5rem;
          line-height: 1.1;
          letter-spacing: -0.02em;
          text-align: left;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .hero-divider {
          width: 100px;
          height: 6px;
          background: var(--color-primary);
          margin-bottom: 2rem;
          border-radius: 3px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .hero-subtitle {
          font-size: clamp(1.25rem, 2vw, 1.5rem);
          font-weight: 300;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 2.5rem;
          line-height: 1.6;
          text-align: left;
          max-width: 650px;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-primary);
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          background: transparent;
          padding: 0;
          backdrop-filter: none;
          border: none;
        }

        .breadcrumb a {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255,255,255,0.8);
          transition: color 0.3s;
        }

        .breadcrumb a:hover {
          color: var(--color-white);
        }

        .breadcrumb svg {
          font-size: 0.9rem;
        }

        .hero-scroll-indicator {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 2rem;
          z-index: 3;
        }

        .scroll-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.1);
          color: var(--color-white);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
          animation: bounceY 2s infinite;
          cursor: pointer;
        }

        .scroll-btn:hover {
          background: var(--color-primary);
          border-color: var(--color-primary);
          transform: translateY(5px);
        }

        @keyframes bounceY {
          0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
          40% {transform: translateY(-10px);}
          60% {transform: translateY(-5px);}
        }

        @media (max-width: 1024px) {
          .hero {
            /* Disable fixed background on mobile/tablets for smoother scroll */
            background-attachment: scroll;
            min-height: 60vh;
          }
          
          .hero-content {
             align-items: center;
             text-align: center;
             margin: 0 auto;
             padding: 2rem;
          }

          .hero-title, .hero-subtitle {
             text-align: center;
          }

          .breadcrumb {
             justify-content: center;
          }

          .hero-divider {
             display: none; /* Hide divider on smaller screens for cleaner look */
          }
           
          .hero-actions {
             justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
