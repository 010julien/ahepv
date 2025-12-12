import { useState } from 'react';
import Hero from '../components/Hero';
import { useTranslation } from '../i18n/useTranslation';

const Gallery = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const categories = [
    { key: 'all', label: t('gallery.all') },
    { key: 'education', label: t('gallery.education') },
    { key: 'medical', label: t('gallery.medical') },
    { key: 'food', label: t('gallery.food') },
    { key: 'water', label: t('gallery.water') },
    { key: 'events', label: t('gallery.events') }
  ];

  const galleryImages = [
    { id: 1, src: '/images/education.jpg', category: 'education', title: 'Education Program', paragraph:'paragraph' },
    { id: 2, src: '/images/medical.jpg', category: 'medical', title: 'Medical Camp' },
    { id: 3, src: '/images/food.jpg', category: 'food', title: 'Food Distribution' },
    { id: 4, src: '/images/water.jpg', category: 'water', title: 'Clean Water Project' },
    { id: 5, src: '/images/events.jpg', category: 'events', title: 'Community Event' },
    { id: 6, src: '/images/education.jpg', category: 'education', title: 'School Building' },
    { id: 7, src: '/images/medical.jpg', category: 'medical', title: 'Healthcare Service' },
    { id: 8, src: '/images/food.jpg', category: 'food', title: 'Meal Program' },
    { id: 9, src: '/images/water.jpg', category: 'water', title: 'Well Construction' },
    { id: 10, src: '/images/events.jpg', category: 'events', title: 'Fundraising Gala' },
    { id: 11, src: '/images/education.jpg', category: 'education', title: 'Library Donation' },
    { id: 12, src: '/images/medical.jpg', category: 'medical', title: 'Mobile Clinic' }
  ];

  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  const openLightbox = (image) => {
    setCurrentImage(image);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="gallery-page">
      <Hero 
        title={t('gallery.title')} 
        subtitle={t('gallery.subtitle')}
        breadcrumb={t('gallery.breadcrumb')}
        backgroundImage="/images/hero-gallery.jpg"
      />

      <section className="section">
        <div className="container">
          {/* Filter Buttons */}
          <div className="gallery-filters">
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`filter-btn ${activeFilter === cat.key ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid">
            {filteredImages.map((image) => (
              <div 
                key={image.id} 
                className="gallery-item"
                onClick={() => openLightbox(image)}
              >
                <img src={image.src} alt={image.title} />
                <div className="gallery-overlay ">
                  <h4>{image.title}</h4>
                <p>{image.paragraph}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>&times;</button>
            <img src={currentImage.src} alt={currentImage.title} />
            <h3>{currentImage.title}</h3>
          </div>
        </div>
      )}

      <style>{`
        .gallery-filters {
          display: flex;
          justify-content: center;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-3xl);
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: var(--spacing-md) var(--spacing-xl);
          background: var(--color-white);
          border: 2px solid var(--color-gray-300);
          border-radius: var(--radius-md);
          font-family: var(--font-primary);
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
          transition: all var(--transition-base);
          cursor: pointer;
        }

        .filter-btn:hover,
        .filter-btn.active {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: var(--color-white);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--spacing-lg);
        }

        .gallery-item {
          position: relative;
          height: 250px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          cursor: pointer;
          box-shadow: var(--shadow-md);
          transition: all var(--transition-base);
        }

        .gallery-item:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-xl);
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-slow);
        }

        .gallery-item:hover img {
          transform: scale(1.1);
        }

        .gallery-overlay {
          position: absolute;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--gradient-overlay);
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity var(--transition-base);
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        .gallery-overlay h4 {
          color: var(--color-white);
          font-size: var(--font-size-xl);
          text-align: center;
          
        }

        .lightbox {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          z-index: var(--z-modal);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-xl);
          animation: fadeIn 0.3s ease-out;
        }

        .lightbox-content {
          position: relative;
          max-width: 90%;
          max-height: 90%;
          text-align: center;
          animation: scaleIn 0.3s ease-out;
        }

        .lightbox-content img {
          max-width: 100%;
          max-height: 80vh;
          border-radius: var(--radius-lg);
        }

        .lightbox-content h3 {
          color: var(--color-white);
          margin-top: var(--spacing-lg);
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
          line-height: 1;
          transition: color var(--transition-fast);
        }

        .lightbox-close:hover {
          color: var(--color-primary);
        }

        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
        }

        @media (max-width: 480px) {
          .gallery-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Gallery;
