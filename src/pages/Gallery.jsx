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

  /* Gallery Data with Dates */
  const galleryImages = [
    { id: 1, src: '/images/education.jpg', category: 'education', title: 'Education Program', paragraph:'paragraph', date: '2025-01-15' },
    { id: 2, src: '/images/medical.jpg', category: 'medical', title: 'Medical Camp', date: '2025-02-20' },
    { id: 3, src: '/images/food.jpg', category: 'food', title: 'Food Distribution', date: '2024-11-10' },
    { id: 4, src: '/images/water.jpg', category: 'water', title: 'Clean Water Project', date: '2024-10-05' },
    { id: 5, src: '/images/events.jpg', category: 'events', title: 'Community Event', date: '2024-12-25' },
    { id: 6, src: '/images/education.jpg', category: 'education', title: 'School Building', date: '2023-09-15' },
    { id: 7, src: '/images/medical.jpg', category: 'medical', title: 'Healthcare Service', date: '2023-08-20' },
    { id: 8, src: '/images/food.jpg', category: 'food', title: 'Meal Program', date: '2024-11-28' },
    { id: 9, src: '/images/water.jpg', category: 'water', title: 'Well Construction', date: '2023-05-12' },
    { id: 10, src: '/images/events.jpg', category: 'events', title: 'Fundraising Gala', date: '2023-12-10' },
    { id: 11, src: '/images/education.jpg', category: 'education', title: 'Library Donation', date: '2024-03-15' },
    { id: 12, src: '/images/medical.jpg', category: 'medical', title: 'Mobile Clinic', date: '2022-11-05' }
  ];

  /* Filtering */
  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  /* Grouping by Date (Year) */
  const groupedImages = filteredImages.reduce((acc, image) => {
    const year = new Date(image.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(image);
    return acc;
  }, {});

  // Sort years in descending order
  const sortedYears = Object.keys(groupedImages).sort((a, b) => b - a);

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

          {/* Gallery Sections by Year */}
          {sortedYears.map(year => (
            <div key={year} className="gallery-section">
              <h3 className="gallery-year-title">{year}</h3>
              <div className="gallery-grid">
                {groupedImages[year].map((image) => (
                  <div 
                    key={image.id} 
                    className="gallery-item"
                    onClick={() => openLightbox(image)}
                  >
                    <img src={image.src} alt={image.title} />
                    <div className="gallery-overlay">
                      <h4>{image.title}</h4>
                      <p>{new Date(image.date).toLocaleDateString()}</p>
                      {image.paragraph && <p className="text-sm mt-2">{image.paragraph}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {sortedYears.length === 0 && (
            <p className="text-center text-gray-500">{t('gallery.noImages') || 'No images found.'}</p>
          )}
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

        .gallery-section {
          margin-bottom: var(--spacing-3xl);
        }

        .gallery-year-title {
          font-size: var(--font-size-2xl);
          color: var(--color-primary);
          margin-bottom: var(--spacing-lg);
          padding-bottom: var(--spacing-sm);
          border-bottom: 2px solid var(--color-gray-200);
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
