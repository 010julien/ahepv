import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaHeart, FaChevronDown } from 'react-icons/fa';
import { useTranslation } from '../i18n/useTranslation';
// import logo from '/images/Logo.png';
import logoARR from '/images/LogoARR.png';

const Header = () => {
  const { t } = useTranslation();
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



  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/causes', label: t('nav.causes') },
    { path: '/events', label: t('nav.events') },
    { path: '/gallery', label: t('nav.gallery') }
  ];

  const contactSubmenu = [
    { path: '/contact', label: 'Contact' },
    { path: '/volunteer', label: 'Devenir bénévole' },
    { path: '/blog', label: t('nav.blog') },
    { path: '/faq', label: t('nav.faq') }
  ];

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <img src={logoARR} alt="Logo" className="logo-img" />
          </Link>

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
                Contact <FaChevronDown className="dropdown-icon" />
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
          </nav>

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

      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: var(--z-sticky);
          background-color: transparent;
          box-shadow: none;
          transition: all 0.4s ease; /* Smooth transition */
        }

        .header-scrolled {
          background: var(--color-white);
          box-shadow: var(--shadow-md);
          padding: var(--spacing-md) 0; /* Slightly compact on scroll */
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-lg) 0;
          transition: padding 0.4s ease;
        }
        
        .header-scrolled .header-content {
          padding: var(--spacing-sm) 0;
        }

        /* Default Text Colors (Transparent Header) */
        .header .nav-link,
        .header .dropdown-icon,
        .mobile-menu-toggle {
          color: var(--color-white);
          text-shadow: 0 2px 4px rgba(0,0,0,0.3); /* Legibility on images */
        }

        /* Scrolled Text Colors */
        .header-scrolled .nav-link,
        .header-scrolled .dropdown-icon,
        .header-scrolled .mobile-menu-toggle {
          color: var(--text-primary);
          text-shadow: none;
        }

        .header .logo-img {
          filter: brightness(0) invert(1); /* Make logo white if it's black initially */
          transition: filter 0.4s ease;
        }

        .header-scrolled .logo-img {
          filter: none; /* Restore original colored logo */
        }

        /* Special handling for Donate button */
        .header .donate-btn {
          background: transparent; /* Override global gradient */
          border: 2px solid var(--color-white);
          color: var(--color-white) !important;
          box-shadow: none; /* Remove global shadow initially */
        }
        
        .header .donate-btn:hover {
          background: var(--color-white);
          color: var(--color-primary) !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .header-scrolled .donate-btn {
          background: linear-gradient(135deg, #006a4e 0%, #004a37 100%); /* Re-apply global gradient */
          border: 2px solid transparent; /* Reset border */
          color: var(--color-white) !important;
          box-shadow: 0 4px 15px rgba(0, 106, 78, 0.3);
        }

        .header-scrolled .donate-btn:hover {
          background: linear-gradient(135deg, #008562 0%, #005c45 100%);
          box-shadow: 0 6px 20px rgba(0, 106, 78, 0.4);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
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
          width: 130px;
          height: 80px;
          object-fit: contain;
          transition: all 0.4s ease;
        }

        .header-scrolled .logo-img {
             width: 110px; /* Slight resize on scroll */
        }

        .logo-icon {
          font-size: var(--font-size-3xl);
          color: var(--color-primary);
        }

        .nav {
          display: flex;
          align-items: center;
          gap: var(--spacing-xl);
        }

        .nav-link {
          font-family: var(--font-primary);
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-medium);
          color: var(--text-primary);
          position: relative;
          transition: color var(--transition-fast);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .nav-link:hover,
        .nav-link.active {
          color: var(--color-primary);
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--color-primary);
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

        .donate-btn {
        color: var(--color-primary) !important;
          margin-left: var(--spacing-lg);
        }

        .mobile-menu-toggle {
          display: none;
          background: transparent;
          font-size: var(--font-size-2xl);
          color: var(--color-white);
          font-size: 1.7rem !important;
          margin-right: 2.5rem !important;
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
          }

          .nav-open {
            right: 0;
          }

          .nav-link {
            color: var(--text-primary);
            width: 100%;
            padding: var(--spacing-sm) 0;
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

          .donate-btn {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
