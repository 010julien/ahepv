import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaHeart, FaChevronDown } from 'react-icons/fa';
import { useTranslation } from '../i18n/useTranslation';
import SocialLink from './SocialLink';
// import logo from '/images/Logo.png';
import logoARR from '/images/LogoARR.png';

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force scrolled style on Gallery page since it has no Hero
  const isGallery = location.pathname === '/gallery';
  const headerClass = `header ${isScrolled || isGallery ? 'header-scrolled' : ''}`;

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/causes', label: t('nav.causes') },
    { path: '/divertissement', label: t('nav.events') },
    { path: '/gallery', label: t('nav.gallery') }
  ];

  const contactSubmenu = [
    { path: '/contact', label: t('nav.contact') },
    { path: '/volunteer', label: t('nav.volunteer') },
    // { path: '/blog', label: t('nav.blog') },
    { path: '/faq', label: t('nav.faq') }
  ];

  const socialLinks = [
    { url: '#', name: 'facebook' },
    { url: '#', name: 'linkedin' },
    { url: '#', name: 'instagram' },
    { url: 'https://www.tiktok.com/@jeannettetonye', name: 'tiktok' }
  ];

  return (
    <header className={headerClass}>
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <img src={logoARR} alt="Logo" className="logo-img" />
          </Link>

          {/* Mobile Overlay */}
          <div 
            className={`mobile-nav-overlay ${mobileMenuOpen ? 'active' : ''}`} 
            onClick={() => setMobileMenuOpen(false)}
          />

          <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={() => setMobileMenuOpen(false)}
                
              >
                {link.label}
              </NavLink>
            ))}
            
            {/* Contact Dropdown */}
            <div 
              className="nav-dropdown"
              onMouseEnter={() => setContactDropdownOpen(true)}
              onMouseLeave={() => setContactDropdownOpen(false)}
            >
              <button className="nav-link dropdown-toggle">
                {t('nav.contact')} <FaChevronDown className="dropdown-icon" />
              </button>
              <div className={`dropdown-menu ${contactDropdownOpen ? 'show' : ''}`}>
                {contactSubmenu.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className="dropdown-item"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setContactDropdownOpen(false);
                    }}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Mobile Donate Button */}
            <Link 
              to="/donate" 
              className="btn btn-primary mobile-donate-btn"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.donate')}
            </Link>

            {/* Mobile Social Icons */}
            <div className="mobile-social-header">
              {socialLinks.map((social) => (
                <SocialLink 
                  key={social.name}
                  platform={social.name}
                  url={social.url}
                  style={{ color: 'var(--text-primary)' }}
                />
              ))}
            </div>
          </nav>

          <div className="header-actions">
            <div className="social-header">
              {socialLinks.map((social) => (
                <SocialLink 
                  key={social.name}
                  platform={social.name}
                  url={social.url}
                />
              ))}
            </div>

            <Link to="/donate" className="btn btn-primary donate-btn">
              {t('nav.donate')}
            </Link>

            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .header {
          position: fixed;
          display: flex;
          justify-content: center;
          align-items: center;
          top: var(--announcement-offset, 0);
          left: 0;
          right: 0;
          z-index: var(--z-sticky);
          background-color: var(--color-white);
          border-radius: 0;
          margin-top: 0;
          padding: 15px 20px;
          box-shadow: none;
          transition: all 0.4s ease; /* Smooth transition */
        }

        .header-scrolled {
          background: rgba(255, 255, 255, 1);
          box-shadow: var(--shadow-md);
          padding: 25px;
          border-radius: 0;
          margin-top: 0;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: var(--spacing-xl);
          padding: 0.9rem 0;
          transition: padding 0.4s ease;
        }
        
        .header-scrolled .header-content {
          padding: var(--spacing-md) 0;
        }

        /* Default Text Colors */
        .header .nav-link,
        .header .dropdown-icon,
        .mobile-menu-toggle,
        .social-link-item {
          color: var(--text-primary);
          text-shadow: none;
        }

        /* Scrolled Text Colors */
        .header-scrolled .nav-link,
        .header-scrolled .dropdown-icon,
        .header-scrolled .mobile-menu-toggle,
        .header-scrolled .social-link-item {
          color: var(--text-primary);
          text-shadow: none;
        }
        
        .header .logo-img {
          filter: none;
          transition: filter 0.4s ease;

        }

        logo {
           width: 100px;
           height: 100px;
        }

        .header-scrolled .logo-img {
          filter: none;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: clamp(var(--spacing-sm), 1.5vw, var(--spacing-lg));
          flex-shrink: 0;
        }

        /* Social Icons Styles */
        .social-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          color: var(--text-primary);
        }

        .header .social-link-item {
          width: 28px;
          height: 28px;
          border-radius: 0;
          background: transparent;
        }

        /* Mobile Social Icons Styles - Hidden on Desktop */
        .mobile-social-header {
          display: none;
        }

        /* Special handling for Donate button */
        .header .donate-btn {
          background: #2b8238;
          border: 1px solid transparent;
          color: #ffffffff !important;
          box-shadow: none;
          border-radius: var(--radius-full);
          padding: 0.7rem 1.25rem;
          font-weight: var(--font-weight-semibold);
          letter-spacing: 0.02em;
        }
        
        .header .donate-btn:hover {
          background: #fff;
          color: #1f1f1f !important;
          box-shadow: none;
        }

        .header-scrolled .donate-btn {
          background: #2b8238;
          border: 1px solid transparent;
          color: #fdfdfdff !important;
          box-shadow: none;
        }

        .header-scrolled .donate-btn:hover {
          background: #2b8238;
          color: #fdfdfdff !important;
          box-shadow: none;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          flex-shrink: 0;
          font-family: var(--font-primary);
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-bold);
          color: var(--text-primary);
          transition: color var(--transition-fast);
        }

        .logo:hover {
          color: var(--color-primary);
        }

        .logo-img {
          width: 180px;
          height: 80px;
          object-fit: contain;
          transition: all 0.4s ease;
        }

        .logo-icon {
          font-size: var(--font-size-3xl);
          color: var(--color-primary);
        }

        .nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(var(--spacing-md), 2vw, var(--spacing-xl));
          flex: 1;
          min-width: 0;
        }

        .nav-link {
          font-family: var(--font-primary);
          font-size: 0.95rem;
          font-weight: var(--font-weight-medium);
          color: var(--text-primary);
          position: relative;
          transition: color var(--transition-fast);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.35rem 0;
          white-space: nowrap;
        }

        .nav-link:hover,
        .nav-link.active {
          color: #2b8238;
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          right: 0;
          height: 5px;
          background: #2b8238;
          border-radius: 5px;
        }

        

        .header-scrolled .nav-link {
          color: var(--text-primary) !important;
        }

        .header-scrolled .nav-link:hover,
        .header-scrolled .nav-link.active {
          color: #2b8238 !important;
        }

        /* Dropdown Styles */
        .nav-dropdown {
          position: relative;
        }

        .dropdown-toggle {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
        }

        .dropdown-icon {
          font-size: var(--font-size-xs);
          transition: transform var(--transition-fast);
        }

        .nav-dropdown:hover .dropdown-icon {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: var(--spacing-md);
          background: var(--color-white);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-xl);
          min-width: 200px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all var(--transition-base);
          padding: var(--spacing-sm) 0;
        }

        .dropdown-menu.show {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-item {
          display: block;
          padding: var(--spacing-md) var(--spacing-lg);
          color: var(--text-primary);
          font-family: var(--font-primary);
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-medium);
          transition: all var(--transition-fast);
          white-space: nowrap;
        }

        .dropdown-item:hover {
          background: var(--bg-secondary);
          color: var(--color-primary);
          padding-left: calc(var(--spacing-lg) + 5px);
        }

        /* Mobile Overlay */
        .mobile-nav-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: calc(var(--z-sticky) - 1); /* Just behind the nav drawer */
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          backdrop-filter: blur(2px);
        }
        
        .mobile-nav-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .mobile-menu-toggle {
          display: none;
          background: transparent;
          font-size: var(--font-size-2xl);
          color: var(--text-primary);
          font-size: 1.7rem !important;
          z-index: 1100; /* Ensure it's above everything */
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5)); /* Add contrast visibility */
        }

        .mobile-donate-btn {
          display: none;
        }

        @media (max-width: 1024px) {
          .mobile-menu-toggle {
            display: block;
          }

          .nav {
            position: fixed;
            top: 0;
            right: -100%;
            width: 280px;
            height: 100vh;
            background: var(--color-white);
            flex-direction: column;
            align-items: flex-start;
            padding: var(--spacing-4xl) var(--spacing-xl);
            gap: var(--spacing-lg);
            box-shadow: var(--shadow-xl);
            transition: right var(--transition-base);
            z-index: var(--z-sticky);
          }

          .nav-open {
            right: 0;
          }

          .header .nav-link {
            color: var(--text-primary);
            width: 100%;
            padding: var(--spacing-sm) 0;
            text-shadow: none;
          }
          
          .nav .dropdown-icon {
            color: var(--text-primary);
            text-shadow: none;
          }

          .nav-dropdown {
            width: 100%;
          }

          .dropdown-toggle {
            width: 100%;
            justify-content: space-between;
          }

          .dropdown-menu {
            position: static;
            opacity: 1;
            visibility: visible;
            transform: none;
            box-shadow: none;
            margin-top: var(--spacing-sm);
            margin-left: var(--spacing-md);
            padding-left: var(--spacing-md);
            border-left: 2px solid var(--color-primary);
          }

          .dropdown-menu.show {
            display: block;
          }

          .dropdown-menu:not(.show) {
            display: none;
          }

          .dropdown-item {
            padding: var(--spacing-sm) var(--spacing-md);
          }

          .header-actions {
             gap: var(--spacing-sm);
          }
          
          .social-header {
             display: none; 
          }
          
          /* Show Mobile Social Icons */
          .mobile-social-header {
             display: flex;
             align-items: center;
             justify-content: center;
             gap: var(--spacing-md);
             width: 100%;
             margin-top: auto; /* Push to bottom */
             padding-top: var(--spacing-lg);
             border-top: 1px solid var(--color-gray-200);
          }
           
           /* Force dark theme icons on mobile drawer */
           .mobile-social-header .social-link-item {
             color: var(--text-primary); 
             text-shadow: none;
           }

          .mobile-donate-btn {
            display: flex;
            width: 100%;
            margin-top: auto;
            margin-bottom: var(--spacing-md);
          }
          
          .header-actions .donate-btn {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .mobile-menu-toggle {
            margin-right: var(--spacing-md);
          }
          .header {
            padding: 0;
          }
          .logo-img {
            width: 100px;
            height: 48px;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
