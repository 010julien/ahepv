import { FaHome, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Hero = ({ title, subtitle, breadcrumb, backgroundImage = '/images/hero-bg.jpg' }) => {
  return (
    <section className="hero" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">{title}</h1>
          {subtitle && <p className="hero-subtitle">{subtitle}</p>}
          {breadcrumb && (
            <div className="breadcrumb">
              <Link to="/">
                <FaHome />
                <span>Home</span>
              </Link>
              <FaChevronRight />
              <span>{breadcrumb}</span>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          margin-top: 80px;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #000000bc;
          opacity: 0.9;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: var(--color-white);
          animation: fadeInUp 0.8s ease-out;
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
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-md);
          font-size: var(--font-size-base);
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

        @media (max-width: 768px) {
          .hero {
            min-height: 300px;
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
