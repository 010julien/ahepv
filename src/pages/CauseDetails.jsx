import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';
import { causes } from '../data/causes';
import { FaUsers } from 'react-icons/fa';

const CauseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cause = useMemo(() => causes.find(c => c.id === parseInt(id, 10)), [id]);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    if (!cause) {
      navigate('/causes');
    }
  }, [cause, navigate]);

  if (!cause) return null;

  const percentage = Math.min(100, Math.floor((cause.raised / cause.goal) * 100));

  const openLightbox = (src, title) => {
    setCurrentImage({ src, title });
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage(null);
    document.body.style.overflow = 'auto';
  };

  const otherCauses = causes.filter(c => c.id !== cause.id).slice(0, 3);

  return (
    <div className="cause-details-page">
      <Hero
        title={cause.title}
        subtitle={cause.category}
        breadcrumb="Cause"
        backgroundImage={cause.image}
      />

      <section className="section">
        <div className="container">
          <div className="cause-layout">
            <div className="cause-main">
              <div className="cause-info-card">
                <h2 className="mb-md">{cause.title}</h2>
                <p className="cause-description">{cause.description}</p>

                <ProgressBar percentage={percentage} raised={cause.raised} goal={cause.goal} />

                <div className="cause-meta">
                  <div className="meta-item">
                    <FaUsers />
                    <span>
                      {cause.donors} donateurs
                    </span>
                  </div>
                </div>

                <div className="mt-lg">
                  <Link to="/donate" className="btn btn-primary">Faire un don</Link>
                </div>
              </div>

              <div className="gallery-section">
                <h3>Galerie d'images</h3>
                <div className="gallery-grid">
                  {cause.images && cause.images.length > 0 && cause.images.map((src, idx) => (
                    <div key={idx} className="gallery-item" onClick={() => openLightbox(src, cause.title)}>
                      <img src={src} alt={`${cause.title} ${idx + 1}`} loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="cause-sidebar">
              <div className="sidebar-card">
                <h3>À propos de cette cause</h3>
                <ul className="sidebar-list">
                  <li><strong>Catégorie:</strong> {cause.category}</li>
                  <li><strong>Objectif:</strong> {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(cause.goal)}</li>
                  <li><strong>Collecté:</strong> {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(cause.raised)}</li>
                  <li><strong>Progression:</strong> {percentage}%</li>
                </ul>
                <Button variant="secondary" style={{ width: '100%' }} onClick={() => navigate('/causes')}>Retour à la liste</Button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Autres causes */}
      <section className="section section-bg">
        <div className="container">
          <div className="section-title">
            <h2>Autres causes</h2>
            <p>Découvrez d'autres projets que vous pouvez soutenir.</p>
          </div>
          <div className="other-causes-grid">
            {otherCauses.map((c) => (
              <Link key={c.id} to={`/causes/${c.id}`} className="other-cause-card">
                <div className="other-cause-image">
                  <img src={c.image} alt={c.title} loading="lazy" />
                </div>
                <div className="other-cause-content">
                  <h4>{c.title}</h4>
                  <p>{c.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && currentImage && (
        <div className="lightbox" onClick={closeLightbox} role="dialog" aria-modal="true">
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Fermer">&times;</button>
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

        .sidebar-list {
          list-style: none;
          padding: 0;
          margin-bottom: var(--spacing-xl);
        }

        .sidebar-list li {
          margin-bottom: var(--spacing-sm);
          color: var(--text-secondary);
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
          .other-cause-image { height: 160px; }
        }
      `}</style>
    </div>
  );
};

export default CauseDetails;
