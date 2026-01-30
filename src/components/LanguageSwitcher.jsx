import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'fr', label: 'Français', flag: '/images/flags/fr.svg' },
    { code: 'en', label: 'English', flag: '/images/flags/gb.svg' },
    { code: 'de', label: 'Deutsch', flag: '/images/flags/de.svg' }
  ];

  const currentLang = languages.find(lang => lang.code === language) || languages[0];

  const handleLanguageChange = (code) => {
    changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <>
      <div className="language-switcher">
        <button 
          className="lang-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Change language"
        >
          <img src={currentLang.flag} alt="" className="lang-flag-img" />
          <span className="lang-code">{currentLang.code.toUpperCase()}</span>
        </button>

        {isOpen && (
          <div className="lang-dropdown">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`lang-option ${language === lang.code ? 'active' : ''}`}
                onClick={() => handleLanguageChange(lang.code)}
              >
                <img src={lang.flag} alt="" className="lang-flag-img-small" />
                <span className="lang-label">{lang.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .language-switcher {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: var(--z-fixed);
        }

        .lang-button {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-md) var(--spacing-lg);
          background: var(--color-white);
          border: 2px solid var(--color-primary);
          border-radius: var(--radius-full);
          box-shadow: var(--shadow-xl);
          cursor: pointer;
          transition: all var(--transition-base);
          font-family: var(--font-primary);
          font-weight: var(--font-weight-semibold);
          color: var(--color-primary);
        }

        .lang-button:hover {
          background: var(--color-primary);
          color: var(--color-white);
          transform: translateY(-2px);
          box-shadow: var(--shadow-2xl);
        }

        .lang-flag-img {
          width: 24px;
          height: 18px;
          object-fit: cover;
          border-radius: 2px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .lang-flag-img-small {
          width: 20px;
          height: 15px;
          object-fit: cover;
          border-radius: 1px;
        }

        .lang-code {
          font-size: var(--font-size-sm);
          letter-spacing: 0.5px;
        }

        .lang-dropdown {
          position: absolute;
          bottom: calc(100% + 10px);
          right: 0;
          background: var(--color-white);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-xl);
          overflow: hidden;
          min-width: 180px;
          animation: fadeInUp 0.3s ease-out;
        }

        .lang-option {
          width: 100%;
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          padding: var(--spacing-md) var(--spacing-lg);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all var(--transition-fast);
          font-family: var(--font-primary);
          color: var(--text-primary);
        }

        .lang-option:hover {
          background: var(--bg-secondary);
        }

        .lang-option.active {
          background: var(--color-primary);
          color: var(--color-white);
        }

        .lang-label {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-medium);
        }

        /* Styles moved to global index.css */

        @media (max-width: 768px) {
          .language-switcher {
            bottom: 20px;
            right: 20px;
          }

          .lang-button {
            padding: var(--spacing-sm) var(--spacing-md);
          }

          .lang-code {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default LanguageSwitcher;
