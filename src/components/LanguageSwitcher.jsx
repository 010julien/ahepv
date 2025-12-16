import { useState, useEffect } from 'react';

const LanguageSwitcher = () => {
  const [selectedLang, setSelectedLang] = useState('fr');
  const [isOpen, setIsOpen] = useState(false);

  // Initialize Google Translate Script
  useEffect(() => {
    // Check if script is already added
    if (document.querySelector('script[src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]')) {
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    // Initialize function
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'fr',
          includedLanguages: 'fr,en,de',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    // Robust hidden styles injection
    const style = document.createElement('style');
    style.id = 'google-translate-overrides';
    style.innerHTML = `
      .goog-te-banner-frame.skiptranslate, 
      .goog-te-gadget-icon, 
      #google_translate_element .skiptranslate, 
      .goog-te-banner-frame,
      .goog-tooltip,
      .goog-tooltip:hover {
        display: none !important;
        visibility: hidden !important;
        height: 0 !important;
        width: 0 !important;
        opacity: 0 !important;
        pointer-events: none !important;
        z-index: -9999 !important;
      }
      body {
        top: 0px !important;
        position: static !important;
      }
      .goog-text-highlight {
        background-color: transparent !important;
        box-shadow: none !important;
        box-sizing: border-box !important;
      }
    `;
    // Ensure we don't validly duplicate
    if (!document.getElementById('google-translate-overrides')) {
        document.head.appendChild(style);
    }

    // Aggressive Interval to fight Google's script
    const intervalId = setInterval(() => {
      // Hide banner frame
      const banners = document.querySelectorAll('.goog-te-banner-frame');
      banners.forEach(banner => {
          if (banner) {
            banner.style.display = 'none';
            banner.style.visibility = 'hidden';
            banner.style.height = '0';
            banner.style.width = '0';
            banner.style.opacity = '0';
          }
      });

      // Fix body
      if (document.body.style.top !== '0px') {
        document.body.style.top = '0px';
        document.body.style.position = 'static';
      }

      // Hide tooltips
      const tooltips = document.querySelectorAll('.goog-tooltip');
      tooltips.forEach(tooltip => {
          tooltip.style.display = 'none';
      });

    }, 100); // Check every 100ms

    return () => {
       clearInterval(intervalId);
       // We can choose to leave the style or remove it. 
       // Keeping it might be safer if component unmounts but script stays.
    };
  }, []);

  const languages = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' }
  ];

  const currentLang = languages.find(lang => lang.code === selectedLang) || languages[0];

  const handleLanguageChange = (code) => {
    setSelectedLang(code);
    setIsOpen(false);
    
    // Robust Fallback: Set Cookie and Reload
    // This is the most reliable way to force Google Translate to apply the new language
    document.cookie = `googtrans=/auto/${code}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=/auto/${code}; path=/`; 

    // Reloading the page forces the Google script to re-initialize with the new language cookie
    window.location.reload();
  };

  return (
    <>
      {/* Hidden Google Translate Element - Opacity 0 to ensure DOM presence */}
      <div id="google_translate_element" style={{ opacity: 0, width: 1, height: 1, overflow: 'hidden', position: 'absolute', pointerEvents: 'none', zIndex: -1 }}></div>
      
      <div className="language-switcher">
        <button 
          className="lang-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Change language"
        >
          <span className="lang-flag">{currentLang.flag}</span>
          <span className="lang-code">{currentLang.code.toUpperCase()}</span>
        </button>

        {isOpen && (
          <div className="lang-dropdown">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`lang-option ${selectedLang === lang.code ? 'active' : ''}`}
                onClick={() => handleLanguageChange(lang.code)}
              >
                <span className="lang-flag">{lang.flag}</span>
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

        .lang-flag {
          font-size: var(--font-size-xl);
          line-height: 1;
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
