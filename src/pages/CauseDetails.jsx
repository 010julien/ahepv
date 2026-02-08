import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Hero from "../components/Hero";
import Button from "../components/Button.jsx";
import { causes } from "../data/causes";
import { FaUsers } from "react-icons/fa";
import { useTranslation } from "../i18n/useTranslation";
import { getLocalized } from "../i18n/utils";

const CauseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const cause = useMemo(
    () => causes.find((c) => c.id === parseInt(id, 10)),
    [id],
  );

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    if (!cause) {
      navigate("/causes");
    }
  }, [cause, navigate]);

  if (!cause) return null;

  const localizedTitle = getLocalized(cause.title, language);
  const localizedDescription = getLocalized(cause.description, language);
  const categoryLabel = t(`gallery.${cause.category}`) || cause.category;
  const quoteText = (() => {
    const normalized = (localizedDescription || "").replace(/\s+/g, " ").trim();
    if (!normalized) return t("causes.quoteFallback");
    const match = normalized.match(/[^.!?]+[.!?]/);
    const sentence = (match ? match[0] : normalized).trim();
    return sentence.length > 180 ? `${sentence.slice(0, 177)}...` : sentence;
  })();

  const openLightbox = (src, title) => {
    setCurrentImage({ src, title });
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage(null);
    document.body.style.overflow = "auto";
  };

  const otherCauses = causes.filter((c) => c.id !== cause.id).slice(0, 3);

  return (
    <div className="cause-details-page">
      <Hero
        title={getLocalized(cause.title, language)}
        subtitle={t(`gallery.${cause.category}`) || cause.category}
        breadcrumb={t("causes.breadcrumb")}
        backgroundImage={cause.image}
      />

      <section className="section">
        <div className="container">
          <div className="cause-layout">
            <div className="cause-main">
              <div className="cause-info-card">
                <h2 className="mb-md">{localizedTitle}</h2>
                <p className="cause-description">{localizedDescription}</p>

                {/* <ProgressBar percentage={percentage} raised={cause.raised} goal={cause.goal} /> */}

                <div className="cause-meta">
                  <div className="meta-item">
                    <FaUsers />
                    <span>
                      {cause.donors} {t("causes.donors")}
                    </span>
                  </div>
                </div>

                <div className="mt-lg">
                  <Link to="/donate" className="btn btn-primary">
                    {t("home.donateNow")}
                  </Link>
                </div>
              </div>

              <div className="gallery-section">
                <h3>{t("causes.imageGallery")}</h3>
                <div className="gallery-grid">
                  {cause.images &&
                    cause.images.length > 0 &&
                    cause.images.map((src, idx) => (
                      <div
                        key={idx}
                        className="gallery-item"
                        onClick={() =>
                          openLightbox(src, getLocalized(cause.title, language))
                        }
                      >
                        <img
                          src={src}
                          alt={`${getLocalized(cause.title, language)} ${idx + 1}`}
                          loading="lazy"
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <aside className="cause-sidebar">
              <div className="sidebar-card sidebar-card--quote">
                <div className="sidebar-header">
                  <span className="sidebar-eyebrow">
                    {t("causes.aboutThisCause")}
                  </span>
                  <h3>{t("causes.causeVoice")}</h3>
                </div>

                <blockquote className="cause-quote">
                  <span className="quote-mark">"</span>
                  <p>{quoteText}</p>
                  <span className="quote-mark">"</span>
                </blockquote>

                <p className="sidebar-mission">{t("causes.missionLine")}</p>

                <div className="cause-tags">
                  <span className="cause-tag">{categoryLabel}</span>
                  <span className="cause-tag">{t("causes.actionOnField")}</span>
                </div>

                <div className="cause-facts">
                  <div className="cause-fact">
                    <span className="fact-label">{t("causes.supporters")}</span>
                    <span className="fact-value">{cause.donors}</span>
                  </div>
                  <div className="cause-fact">
                    <span className="fact-label">{t("causes.status")}</span>
                    <span className="fact-value">{t("causes.active")}</span>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  style={{ width: "100%" }}
                  onClick={() => navigate("/causes")}
                >
                  {t("causes.backToList")}
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Other causes */}
      <section className="section section-bg">
        <div className="container">
          <div className="section-title">
            <h2>{t("causes.otherCauses")}</h2>
            <p>{t("causes.otherCausesDesc")}</p>
          </div>
          <div className="other-causes-grid">
            {otherCauses.map((c) => (
              <Link
                key={c.id}
                to={`/causes/${c.id}`}
                className="other-cause-card"
              >
                <div className="other-cause-image">
                  <img src={c.image} alt={c.title} loading="lazy" />
                </div>
                <div className="other-cause-content">
                  <h4>{getLocalized(c.title, language)}</h4>
                  <p>{getLocalized(c.description, language)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && currentImage && (
        <div
          className="lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label={t("common.close")}
            >
              &times;
            </button>
            <img src={currentImage.src} alt={currentImage.title} />
            <h3>{currentImage.title}</h3>
          </div>
        </div>
      )}

      <style>{`
        .cause-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: var(--spacing-3xl);
          align-items: start;
        }

        .cause-info-card {
          background: var(--color-white);
          padding: var(--spacing-2xl);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          margin-bottom: var(--spacing-2xl);
        }

        .cause-description {
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: var(--spacing-xl);
        }

        .cause-meta {
          display: flex;
          gap: var(--spacing-xl);
          margin-top: var(--spacing-md);
          color: var(--text-secondary);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .gallery-section h3 {
          margin-bottom: var(--spacing-lg);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: var(--spacing-lg);
        }

        .gallery-item {
          position: relative;
          height: 180px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          cursor: pointer;
          box-shadow: var(--shadow-sm);
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-slow);
        }

        .gallery-item:hover img {
          transform: scale(1.05);
        }

        .cause-sidebar {
          position: sticky;
          top: 100px;
          height: fit-content;
        }

        .sidebar-card {
          background: var(--color-white);
          padding: var(--spacing-xl);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
        }

        .sidebar-card--quote {
          position: relative;
          overflow: hidden;
          background: linear-gradient(160deg, #ffffff 0%, #f1fff6 100%);
          border: 1px solid rgba(39, 122, 52, 0.12);
        }

        .sidebar-card--quote::before {
          content: "";
          position: absolute;
          top: -80px;
          right: -80px;
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, rgba(52, 149, 67, 0.18), transparent 70%);
          opacity: 0.8;
        }

        .sidebar-header {
          margin-bottom: var(--spacing-lg);
        }

        .sidebar-eyebrow {
          display: inline-flex;
          align-items: center;
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-primary-dark);
          margin-bottom: var(--spacing-sm);
        }

        .cause-quote {
          position: relative;
          padding: var(--spacing-lg);
          margin: 0 0 var(--spacing-lg) 0;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.9);
          box-shadow: var(--shadow-sm);
        }

        .cause-quote p {
          margin: 0;
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-medium);
          color: var(--text-primary);
        }

        .quote-mark {
          position: absolute;
          font-size: 2.5rem;
          line-height: 1;
          color: rgba(39, 122, 52, 0.3);
        }

        .quote-mark:first-of-type {
          top: 12px;
          left: 14px;
        }

        .quote-mark:last-of-type {
          bottom: 8px;
          right: 12px;
        }

        .sidebar-mission {
          margin-bottom: var(--spacing-lg);
          color: var(--text-secondary);
        }

        .cause-tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-lg);
        }

        .cause-tag {
          padding: 6px 12px;
          border-radius: var(--radius-full);
          background: rgba(52, 149, 67, 0.12);
          color: var(--color-primary-dark);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
        }

        .cause-facts {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-xl);
        }

        .cause-fact {
          background: var(--color-white);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          box-shadow: var(--shadow-sm);
        }

        .fact-label {
          display: block;
          font-size: var(--font-size-xs);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-light);
          margin-bottom: var(--spacing-xs);
        }

        .fact-value {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          color: var(--text-primary);
        }

        .other-causes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: var(--spacing-xl);
        }

        .other-cause-card {
          display: block;
          background: var(--color-white);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          text-decoration: none;
          color: inherit;
          transition: transform var(--transition-base), box-shadow var(--transition-base);
        }

        .other-cause-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl);
        }

        .other-cause-image {
          height: 180px;
        }

        .other-cause-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .other-cause-content {
          padding: var(--spacing-lg);
        }

        /* Lightbox */
        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: var(--z-modal);
          padding: var(--spacing-xl);
        }

        .lightbox-content {
          position: relative;
          max-width: 90%;
          max-height: 90%;
          text-align: center;
        }

        .lightbox-content img {
          max-width: 100%;
          max-height: 80vh;
          border-radius: var(--radius-lg);
        }

        .lightbox-close {
          position: absolute;
          top: -40px;
          right: 0;
          background: transparent;
          border: none;
          color: var(--color-white);
          font-size: var(--font-size-5xl);
          cursor: pointer;
        }

        @media (max-width: 1024px) {
          .cause-layout { grid-template-columns: 1fr; }
          .cause-sidebar {
            position: static;
            top: auto;
          }
          .other-cause-image { height: 160px; }
        }

        @media (max-width: 768px) {
          .cause-info-card {
            padding: var(--spacing-xl);
          }

          .gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: var(--spacing-md);
          }

          .gallery-item {
            height: 150px;
          }

          .lightbox {
            padding: var(--spacing-md);
          }

          .lightbox-close {
            top: -28px;
            font-size: var(--font-size-4xl);
          }
        }

        @media (max-width: 480px) {
          .gallery-item {
            height: 130px;
          }

          .other-cause-image {
            height: 140px;
          }
        }
      `}</style>
    </div>
  );
};

export default CauseDetails;
