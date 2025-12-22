import { useEffect, useRef, useState } from 'react';
import { ANNOUNCEMENT } from '../config/site';
import { useTranslation } from '../i18n/useTranslation';

const CSS_VAR = '--announcement-offset';

const isWithinWindow = (start, end, now = Date.now()) => {
  const s = start ? new Date(start).getTime() : null;
  const e = end ? new Date(end).getTime() : null;
  if (s && now < s) return false;
  if (e && now > e) return false;
  return true;
};

const TopAnnouncement = () => {
  const [dismissed, setDismissed] = useState(false);
  const barRef = useRef(null);
  const { t } = useTranslation();

  const cfg = ANNOUNCEMENT || {};
  const id = cfg.id || 'default';
  const key = `announcement_dismissed_${id}`;

  const active = Boolean(cfg.enabled) && isWithinWindow(cfg.start, cfg.end);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data && data.dismissed) {
        if (!data.expiresAt || Date.now() < Number(data.expiresAt)) {
          setDismissed(true);
        } else {
          localStorage.removeItem(key);
        }
      }
    } catch {}
  }, [key]);

  const visible = active && !dismissed;

  useEffect(() => {
    const updateOffset = () => {
      const h = visible && barRef.current ? `${barRef.current.offsetHeight}px` : '0px';
      document.documentElement.style.setProperty(CSS_VAR, h);
    };
    updateOffset();
    window.addEventListener('resize', updateOffset);
    return () => {
      window.removeEventListener('resize', updateOffset);
      document.documentElement.style.setProperty(CSS_VAR, '0px');
    };
  }, [visible]);

  const base = (import.meta?.env?.BASE_URL || '/');
  const bgUrl = cfg.backgroundImage
    ? `url(${base.replace(/\/$/, '/')}${cfg.backgroundImage.replace(/^\//, '')})`
    : 'none';

  const onClose = () => {
    setDismissed(true);
    try {
      const expiresAt = cfg.end ? new Date(cfg.end).getTime() : Date.now() + 7 * 24 * 3600 * 1000;
      localStorage.setItem(key, JSON.stringify({ dismissed: true, expiresAt }));
    } catch {}
  };

  if (!visible) return null;

  return (
    <div ref={barRef} className="top-announcement" role="region" aria-label="Announcement">
      <div className="ta-inner container">
        <div className="ta-content">
          {cfg.title && <strong className="ta-title">{cfg.title}</strong>}
          {cfg.message && <span className="ta-text">{cfg.message}</span>}
        </div>
        <div className="ta-actions">
          {cfg.ctaText && cfg.ctaLink && (
            <a
              className="btn btn-outline-white ta-cta"
              href={cfg.ctaLink}
              target={cfg.ctaNewTab ? '_blank' : '_self'}
              rel={cfg.ctaNewTab ? 'noopener noreferrer' : undefined}
            >
              {cfg.ctaText}
            </a>
          )}
          <button className="ta-close" onClick={onClose} aria-label={t('common.close')}>×</button>
        </div>
      </div>

      <style>{`
        .top-announcement {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: var(--z-sticky);
          color: var(--color-white);
          /* Brand overlay + themed image */
          background-image: var(--gradient-overlay), ${bgUrl};
          background-size: cover;
          background-position: center;
          box-shadow: var(--shadow-md);
        }

        .ta-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--spacing-lg);
          padding: var(--spacing-sm) var(--spacing-lg);
          min-height: 56px;
        }

        .ta-content {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          flex-wrap: wrap;
        }

        .ta-title {
          font-family: var(--font-primary);
          font-weight: var(--font-weight-bold);
          color: var(--color-white);
        }

        .ta-text {
          color: var(--color-white);
          opacity: 0.95;
        }

        .ta-actions {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .ta-cta {
          border-color: var(--color-white);
          color: var(--color-white) !important;
          padding: 8px 14px;
        }

        .ta-cta:hover {
          background: var(--color-white);
          color: var(--color-primary) !important;
        }

        .ta-close {
          background: transparent;
          color: var(--color-white);
          font-size: 22px;
          line-height: 1;
          opacity: 0.9;
        }

        .ta-close:hover { opacity: 1; }

        @media (max-width: 768px) {
          .ta-inner { padding: var(--spacing-sm) var(--spacing-md); gap: var(--spacing-md); }
          .ta-cta { padding: 6px 12px; }
        }
      `}</style>
    </div>
  );
};

export default TopAnnouncement;
