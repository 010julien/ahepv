import { Link } from 'react-router-dom';
import { FaHeart, FaEnvelope, FaPhone, FaLocationDot } from 'react-icons/fa6';
import { useTranslation } from '../i18n/useTranslation';
import logoARR from '/images/LogoARR.png';
import SocialLink from './SocialLink';
import { CONTACT } from '../config/site';

const Footer = () => {
  const { t } = useTranslation();
  const quickLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/causes', label: t('nav.causes') },
    { path: '/activities', label: t('nav.events') },
    { path: '/donate', label: 'Faire un don' }
  ];

  const supportLinks = [
    { path: '/gallery', label: t('nav.gallery') },
    { path: '/faq', label: t('nav.faq') },
    { path: '/contact', label: 'Contact' },
    { path: '/volunteer', label: 'Devenir bénévole' }
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Merci de vous être inscrit à notre newsletter !');
  };

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-content">
            {/* Column 1: About */}
            <div className="footer-col footer-about">
              <div className="footer-logo">
                 <img src={logoARR} alt="" style={
                              {
                                width: '150px',
                                height: '90px'
                              }
                            }/>
              </div>
              <p className="footer-desc">
                {t('footer.description')}
              </p>
              <div className="social-links">
                <SocialLink platform="facebook" url="#" style={{ background: 'rgba(255, 255, 255, 0.08)' }} />
                <SocialLink platform="twitter" url="#" style={{ background: 'rgba(255, 255, 255, 0.08)' }} />
                <SocialLink platform="instagram" url="#" style={{ background: 'rgba(255, 255, 255, 0.08)' }} />
                <SocialLink platform="linkedin" url="#" style={{ background: 'rgba(255, 255, 255, 0.08)' }} />
              </div>
            </div>

            {/* ... other cols ... */}
            <div className="footer-col">
              <h4>{t('footer.quickLinks')}</h4>
              <ul className="footer-links">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Support */}
            <div className="footer-col">
              <h4>Support</h4>
              <ul className="footer-links">
                {supportLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact & Newsletter */}
            <div className="footer-col">
              <h4>{t('footer.contactInfo')}</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <FaLocationDot />
                  <span>Adresse 
Bruno-körnerstr 
67059
Allemagne</span>
                </div>
                <div className="contact-item">
                  <FaPhone />
                  <span><a href={`tel:${CONTACT.phone.replace(/\s+/g, '')}`} style={{ color: 'inherit' }}>{CONTACT.phone}</a></span>
                </div>
                <div className="contact-item">
                  <FaEnvelope />
                  <span><a href={`mailto:${CONTACT.email}`} style={{ color: 'inherit' }}>{CONTACT.email}</a></span>
                </div>
              </div>
              
              <div className="newsletter-section">
                <h5>Newsletter</h5>
                <p>Restez informé de nos actions</p>
                <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                  <input
                    type="email"
                    placeholder="Votre email"
                    required
                  />
                  <button type="submit" className="btn-subscribe">
                    S'inscrire
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>&copy; 2024 AH2PV. Tous droits réservés.</p>
            <div className="footer-bottom-links">
              <Link to="/privacy">Politique de confidentialité</Link>
              <span className="separator">|</span>
              <Link to="/terms">Conditions d'utilisation</Link>
              <span className="separator">|</span>
              <Link to="/contact">Nous contacter</Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background: linear-gradient(135deg, #1F2937 0%, #111827 100%);
          color: var(--color-white);
        }

        .footer-main {
          padding: var(--spacing-4xl) 0 var(--spacing-3xl);
        }

        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: var(--spacing-3xl);
        }

        .footer-col h4 {
          color: var(--color-white);
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          margin-bottom: var(--spacing-lg);
          position: relative;
          padding-bottom: var(--spacing-sm);
        }

        .footer-col h4::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 3px;
          background: var(--gradient-primary);
          border-radius: var(--radius-full);
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-family: var(--font-primary);
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-extrabold);
          margin-bottom: var(--spacing-md);
          color: var(--color-white);
        }

        .footer-logo-icon {
          font-size: var(--font-size-3xl);
          color: var(--color-primary);
        }

        .footer-desc {
          color: var(--color-gray-300);
          line-height: 1.7;
          margin-bottom: var(--spacing-xl);
          font-size: var(--font-size-base);
        }

        .social-links {
          display: flex;
          gap: var(--spacing-sm);
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.08);
          color: var(--color-white);
          transition: all var(--transition-base);
          font-size: var(--font-size-lg);
        }

        .social-link:hover {
          background: var(--gradient-primary);
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
        }

        .footer-links {
          list-style: none;
        }

        .footer-links li {
          margin-bottom: var(--spacing-sm);
        }

        .footer-links a {
          color: var(--color-gray-300);
          transition: all var(--transition-fast);
          display: inline-block;
          font-size: var(--font-size-base);
        }

        .footer-links a:hover {
          color: var(--color-primary);
          padding-left: 8px;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-xl);
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-md);
          color: var(--color-gray-300);
          font-size: var(--font-size-sm);
        }

        .contact-item svg {
          margin-top: 3px;
          color: var(--color-primary);
          flex-shrink: 0;
          font-size: var(--font-size-base);
        }

        .newsletter-section {
          margin-top: var(--spacing-xl);
          padding-top: var(--spacing-lg);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .newsletter-section h5 {
          color: var(--color-white);
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          margin-bottom: var(--spacing-xs);
        }

        .newsletter-section p {
          color: var(--color-gray-400);
          font-size: var(--font-size-sm);
          margin-bottom: var(--spacing-md);
        }

        .newsletter-form {
          display: flex;
          gap: var(--spacing-xs);
        }

        .newsletter-form input {
          flex: 1;
          padding: var(--spacing-sm) var(--spacing-md);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.05);
          color: var(--color-white);
          font-size: var(--font-size-sm);
        }

        .newsletter-form input::placeholder {
          color: var(--color-gray-400);
        }

        .newsletter-form input:focus {
          outline: none;
          border-color: var(--color-primary);
          background: rgba(255, 255, 255, 0.08);
        }

        .btn-subscribe {
          padding: var(--spacing-sm) var(--spacing-lg);
          background: var(--gradient-primary);
          color: var(--color-white);
          border: none;
          border-radius: var(--radius-md);
          font-weight: var(--font-weight-semibold);
          cursor: pointer;
          transition: all var(--transition-base);
          font-size: var(--font-size-sm);
        }

        .btn-subscribe:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .footer-bottom {
          background: rgba(0, 0, 0, 0.3);
          padding: var(--spacing-lg) 0;
        }

        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--color-gray-400);
          font-size: var(--font-size-sm);
        }

        .footer-bottom-links {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .footer-bottom-links a {
          color: var(--color-gray-400);
          transition: color var(--transition-fast);
        }

        .footer-bottom-links a:hover {
          color: var(--color-primary);
        }

        .separator {
          color: var(--color-gray-600);
        }

        @media (max-width: 1024px) {
          .footer-content {
            grid-template-columns: repeat(2, 1fr);
          }

          .footer-about {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
          }

          .footer-bottom-content {
            flex-direction: column;
            gap: var(--spacing-md);
            text-align: center;
          }

          .footer-bottom-links {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
