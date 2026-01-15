import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExpand, FaTimes } from 'react-icons/fa';
import AutoSlider from '../components/AutoSlider.jsx';
import { useTranslation } from '../i18n/useTranslation';
import Pagination from '../components/Pagination';

const Gallery = () => {
  const { t } = useTranslation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const itemsPerPage = 2; // Galleries per page
  const base = (import.meta?.env?.BASE_URL || '/');
  const [currentPageState, setCurrentPage] = useState(1);



  // Build galleries
  const gallery1 = [1,2,3,4,5,6,7].map(n => ({
    src: `${base}images/gall1.${n}.jpg`,
    title: t('gallery.items.actionTerrain', { n }),
    paragraph: t('gallery.items.supportLocal')
  }));

  const gallery2 = [1,2,3,4,5,6,7,8].map(n => ({
    src: `${base}images/gall2.${n}.jpg`,
    title: t('gallery.items.healthCare', { n }),
    paragraph: t('gallery.items.medicalCampaigns')
  }));

  const gallery3 = [1,2,3,4,5,6,7,8].map(n => ({
    src: `${base}images/gall3.${n}.jpg`,
    title: t('gallery.items.educationTitle', { n }),
    paragraph: t('gallery.items.schoolKits')
  }));

  const gallery4 = [1,2,3,4,5,6,7,8,9,10,11,12].map(n => ({
    src: `${base}images/gall4.${n}.jpg`,
    title: t('gallery.items.solidarityTitle', { n }),
    paragraph: t('gallery.items.foodHelp')
  }));

  const gallery5 = [1,2,3,4,5,6,7,8,9,10,11].map(n => ({
    src: `${base}images/gall5.${n}.jpg`,
    title: t('gallery.items.environmentTitle', { n }),
    paragraph: t('gallery.items.ecoActions')
  }));

  const gallery6 = [1,2,3,4,5,6,7,8,9,10,11].map(n => ({
    src: `${base}images/gall6.${n}.jpg`,
    title: t('gallery.items.eventsTitle', { n }),
    paragraph: t('gallery.items.highlights')
  }));

  const galleries = [
    { title: t('gallery.categories.recent'), images: gallery1 },
    { title: t('gallery.categories.medical'), images: gallery2 },
    { title: t('gallery.categories.school'), images: gallery3 },
    { title: t('gallery.categories.solidarity'), images: gallery4 },
    { title: t('gallery.categories.environment'), images: gallery5 },
    { title: t('gallery.categories.association'), images: gallery6 },
  ];

  const categories = Object.keys(galleries);
  // Flatten all images for the featured slider (take first 5)
  const featuredImages = [
    ...gallery1.slice(0, 1),
    ...gallery2.slice(0, 1),
    ...gallery3.slice(0, 1),
    ...gallery4.slice(0, 1),
    ...gallery5.slice(0, 1)
  ];

  // Pagination logic
  const totalPages = Math.ceil(galleries.length / itemsPerPage);
  const indexOfLastItem = currentPageState * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGalleries = galleries.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Stagger effect for children
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      y: 80, 
      x: -40,
      opacity: 0, 
      scale: 0.9,
      rotateX: -15 
    },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 12,
        mass: 1.2
      }
    }
  };

  return (
    <div className="gallery-page">

      
      <section className="section bg-gray-50 gallery-content-wrapper">
        <div className="container">
          {/* Featured Auto Slider */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
             <h2 className="section-title text-center mt-[12rem] " style={{ marginBottom: "var(--spacing-xl)" }}>
                {t('gallery.autoSliderTitle')}
             </h2>
             <AutoSlider images={featuredImages} height="500px" />
          </motion.div>

          {currentGalleries.map((gal) => (
            <div key={gal.title} className="gallery-section">
              <motion.div 
                 className="gallery-header"
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.7, ease: "easeOut" }}
              >
                  <h3 className="gallery-section-title">{gal.title}</h3>
                  <div className="gallery-divider"></div>
              </motion.div>
              
              <motion.div 
                className="gallery-grid"
              >
                {gal.images.map((image, index) => (
                  <motion.div
                    key={image.src}
                    className="gallery-item group"
                    onClick={() => openLightbox(image)}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ 
                        y: -12, 
                        scale: 1.02,
                        transition: { type: "spring", stiffness: 300 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="gallery-img-wrapper">
                      <motion.img
                        src={image.src}
                        alt={image.title}
                        loading="lazy"
                        className="gallery-img"
                        onError={(e) => {
                          if (e.currentTarget.dataset.fallback !== '1') {
                            e.currentTarget.dataset.fallback = '1';
                            e.currentTarget.src = `${base}images/5ans.jpg`;
                          }
                        }}
                      />
                      <div className="gallery-overlay">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring" }}
                        >
                             <FaExpand className="expand-icon" />
                        </motion.div>
                      </div>
                    </div>
                    
                    <motion.div 
                        className="gallery-content"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1, x: 5 }} // Slight translation on text
                    >
                       <h4>{image.title}</h4>
                       <p>{image.paragraph}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}

          <Pagination 
            currentPage={currentPageState}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div 
            className="lightbox" 
            onClick={closeLightbox}
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
                className="lightbox-content" 
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.5, opacity: 0, y: 100 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.5, opacity: 0, y: 100 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <button className="lightbox-close" onClick={closeLightbox}>
                 <FaTimes />
              </button>
              <img src={currentImage.src} alt={currentImage.title} />
              <motion.div 
                  className="lightbox-caption"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
              >
                  <h3>{currentImage.title}</h3>
                  <p>{currentImage.paragraph}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .bg-gray-50 {
            background-color: var(--color-gray-50);
        }

        .gallery-content-wrapper {
          padding-top: 140px;
        }

        .gallery-section {
          margin-bottom: var(--spacing-4xl);
        }

        .gallery-header {
            margin-bottom: var(--spacing-xl);
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
        }

        .gallery-section-title {
          font-size: var(--font-size-3xl);
          color: var(--color-primary);
          margin: 0;
        }
        
        .gallery-divider {
            flex-grow: 1;
            height: 1px;
            background: linear-gradient(to right, var(--color-gray-300), transparent);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: var(--spacing-xl);
          perspective: 1000px; /* Added perspective for 3D rotation visibility */
        }

        .gallery-item {
          background: var(--color-white);
          border-radius: var(--radius-lg);
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); /* Soft shadow */
          border: 1px solid var(--color-gray-100);
          /* Transform/Transition handled by framer-motion interactions */
        }

        .gallery-item:hover {
          box-shadow: 0 25px 50px -12px rgba(52, 149, 67, 0.2); /* Colored shadow on hover */
        }

        .gallery-img-wrapper {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .gallery-item:hover .gallery-img {
          transform: scale(1.15); /* Slightly more zoom */
        }

        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        .expand-icon {
            color: white;
            font-size: 1.8rem;
        }
        
        .gallery-content {
            padding: var(--spacing-lg);
        }

        .gallery-content h4 {
            font-size: var(--font-size-lg);
            margin-bottom: var(--spacing-xs);
            color: var(--text-primary);
        }

        .gallery-content p {
            font-size: var(--font-size-sm);
            color: var(--text-secondary);
            margin: 0;
        }

        /* Lightbox */
        .lightbox {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          z-index: var(--z-modal);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-xl);
          /* backdrop-filter handled by motion */
        }

        .lightbox-content {
          position: relative;
          max-width: 95%;
          max-height: 95vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .lightbox-content img {
          max-width: 100%;
          max-height: 80vh;
          border-radius: var(--radius-md);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        
        .lightbox-caption {
            margin-top: var(--spacing-lg);
            text-align: center;
            color: white;
        }
        
        .lightbox-caption h3 {
             color: white;
             font-size: var(--font-size-xl);
             margin-bottom: var(--spacing-xs);
        }

        .lightbox-close {
          position: absolute;
          top: -10px;
          right: -45px;
          background: rgba(255,255,255,0.1);
          border: none;
          color: var(--color-white);
          font-size: 1.5rem;
          cursor: pointer;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s;
        }

        .lightbox-close:hover {
          background: rgba(255,255,255,0.25);
          transform: rotate(90deg);
          transition: all 0.3s;
        }

        @media (max-width: 768px) {
           .lightbox-close {
               top: -50px;
               right: 0;
           }
           
          .gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: var(--spacing-md);
          }
        }

        @media (max-width: 580px) {
          .gallery-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Gallery;
