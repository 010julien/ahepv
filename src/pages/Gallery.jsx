import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import { useTranslation } from '../i18n/useTranslation';

const Gallery = () => {
  const { t } = useTranslation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const base = (import.meta?.env?.BASE_URL || '/');

  // Force reveal visibility in case old reveal classes linger
  useEffect(() => {
    const els = document.querySelectorAll('.gallery-page .reveal');
    els.forEach((el) => {
      el.classList.remove('reveal');
      el.classList.add('reveal-visible');
    });
  }, []);

  // Build galleries (ensure existing images only)
  const gallery1 = [1,2,3,4,5,6,7].map(n => ({
    src: `${base}images/gall1.${n}.jpg`,
    title: `Galerie 1 - Photo ${n}`,
    paragraph: 'Cliquez pour agrandir'
  }));

  const gallery2 = [1,2,3,4,5,6,7,8].map(n => ({
    src: `${base}images/gall2.${n}.jpg`,
    title: `Galerie 2 - Photo ${n}`,
    paragraph: 'Nos actions sur le terrain'
  }));

  const gallery3 = [1,2,3,4,5,6,7,8].map(n => ({
    src: `${base}images/gall3.${n}.jpg`,
    title: `Galerie 3 - Photo ${n}`,
    paragraph: 'Moments de solidarité'
  }));

  const gallery4 = [1,2,3,4,5,6,7,8,9,10,11,12].map(n => ({
    src: `${base}images/gall4.${n}.jpg`,
    title: `Galerie 4 - Photo ${n}`,
    paragraph: 'Moments de solidarité'
  }));

  const gallery5 = [1,2,3,4,5,6,7,8,9,10,11].map(n => ({
    src: `${base}images/gall5.${n}.jpg`,
    title: `Galerie 5 - Photo ${n}`,
    paragraph: 'Moments de solidarité'
  }));

  const gallery6 = [1,2,3,4,5,6,7,8,9,10,11].map(n => ({
    src: `${base}images/gall6.${n}.jpg`,
    title: `Galerie 6 - Photo ${n}`,
    paragraph: 'Moments de solidarité'
  }));

  // const gallery7 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(n => ({
  //   src: `/images/gall7.${n}.jpg`,
  //   title: `Galerie 7 - Photo ${n}`,
  //   paragraph: 'Moments de solidarité'
  // }));
  

  const galleries = [
    { title: 'Galerie 1', images: gallery1 },
    { title: 'Galerie 2', images: gallery2 },
    { title: 'Galerie 3', images: gallery3 },
    { title: 'Galerie 4', images: gallery4 },
    { title: 'Galerie 5', images: gallery5 },
    { title: 'Galerie 6', images: gallery6 },
    // { title: 'Galerie 7', images: gallery7 },
  ];

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
        backgroundImage={`${base}images/gall3.jpg`}
      />

      <section className="section">
        <div className="container">
          {galleries.map((gal) => (
            <div key={gal.title} className="gallery-section">
              <h3 className="gallery-year-title">{gal.title}</h3>
              <div className="gallery-grid">
                {gal.images.map((image) => (
                  <div
                    key={image.src}
                    className="gallery-item"
                    onClick={() => openLightbox(image)}
                  >
                    <img
                      src={image.src}
                      alt={image.title}
                      loading="lazy"
                      onError={(e) => {
                        if (e.currentTarget.dataset.fallback !== '1') {
                          e.currentTarget.dataset.fallback = '1';
                          e.currentTarget.src = `${base}images/5ans.jpg`;
                          try { console.warn('Gallery image missing, using fallback:', image.src); } catch(_) {}
                        }
                      }}
                    />
                    <div className="gallery-overlay">
                      <h4>{image.title}</h4>
                      {image.paragraph && <p className="text-sm text-white mt-2">{image.paragraph}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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

        /* Safety: if any stale .reveal classes remain in the gallery, make them visible */
        .gallery-page .reveal {
          opacity: 1 !important;
          transform: none !important;
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
