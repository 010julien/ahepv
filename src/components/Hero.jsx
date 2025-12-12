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
          min-height: 500px; /* Standardize height */
          display: flex;
          align-items: center;
          justify-content: center;
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          padding-top: 80px; /* Compensate for fixed header */
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6); /* Consistent premium overlay */
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

        @media (max-width: 768px) {
          .hero {
            min-height: 400px;
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
