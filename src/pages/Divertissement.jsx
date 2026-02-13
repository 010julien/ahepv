import { useState } from "react";
import Hero from "../components/Hero";
import { useTranslation } from "../i18n/useTranslation";
import { entertainments } from "../data/entertainment";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaSearchPlus } from "react-icons/fa";

const Divertissement = () => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="divertissement-wrapper">
      <Hero
        title={t("events.hero.title")}
        subtitle={t("events.hero.subtitle")}
        breadcrumb={t("events.breadcrumb")}
        images={[
          "/images/hero-events.jpg",
          "/images/actitehero1.jpg",
          "/images/actitehero2.jpg",
        ]}
        overlayOpacity={0.2}
      />

      <section className="divertissement-section">
        <div className="container">
          <div className="photo-gallery-grid">
            {entertainments.map((item, index) => (
              <motion.div
                key={item.id}
                className="gallery-item"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedItem(item)}
              >
                <div className="gallery-photo">
                  <img
                    src={item.image}
                    alt=""
                    className="photo-img"
                    onError={(e) => {
                      e.target.src = "/images/5ans.jpg";
                    }}
                  />
                  <div className="photo-overlay">
                    <FaSearchPlus className="zoom-icon" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="lightbox-close-btn"
            >
              <FaTimes />
            </button>

            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedItem.image} alt="" className="lightbox-img" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .divertissement-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #fafafa 0%, #ffffff 50%, #f5f5f5 100%);
        }

        .divertissement-section {
          padding: var(--spacing-4xl) 0;
        }

        /* Galerie Photo Grid */
        .photo-gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
          padding: 20px 0;
        }

        @media (max-width: 768px) {
          .photo-gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 15px;
          }
        }

        @media (max-width: 480px) {
          .photo-gallery-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        /* Gallery Item */
        .gallery-item {
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .gallery-photo {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 75%; /* Aspect ratio 4:3 */
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .gallery-item:hover .gallery-photo {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .photo-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .gallery-item:hover .photo-img {
          transform: scale(1.1);
        }

        /* Photo Overlay */
        .photo-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(52, 149, 67, 0.07),
            rgba(30, 59, 138, 0.06)
          );
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .gallery-item:hover .photo-overlay {
          opacity: 1;
        }

        .zoom-icon {
          color: white;
          font-size: 3rem;
          transform: scale(0.5);
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .gallery-item:hover .zoom-icon {
          transform: scale(1);
        }

        /* Lightbox Modal */
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: var(--z-modal);
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        @media (max-width: 768px) {
          .lightbox-overlay {
            padding: 20px;
          }
        }

        .lightbox-close-btn {
          position: fixed;
          top: 30px;
          right: 30px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          transition: all 0.3s ease;
          z-index: 1001;
          cursor: pointer;
        }

        .lightbox-close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
          transform: rotate(90deg);
        }

        @media (max-width: 768px) {
          .lightbox-close-btn {
            top: 20px;
            right: 20px;
            width: 44px;
            height: 44px;
            font-size: 1.2rem;
          }
        }

        .lightbox-content {
          max-width: 90vw;
          max-height: 85vh;
          position: relative;
        }

        .lightbox-img {
          width: 100%;
          height: 100%;
          max-width: 90vw;
          max-height: 85vh;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
        }

        /* Ajout d'animations supplémentaires */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .gallery-item {
          animation: fadeInUp 0.6s ease backwards;
        }

        .gallery-item:nth-child(1) { animation-delay: 0.05s; }
        .gallery-item:nth-child(2) { animation-delay: 0.1s; }
        .gallery-item:nth-child(3) { animation-delay: 0.15s; }
        .gallery-item:nth-child(4) { animation-delay: 0.2s; }
        .gallery-item:nth-child(5) { animation-delay: 0.25s; }
        .gallery-item:nth-child(6) { animation-delay: 0.3s; }
        .gallery-item:nth-child(7) { animation-delay: 0.35s; }
        .gallery-item:nth-child(8) { animation-delay: 0.4s; }
        .gallery-item:nth-child(9) { animation-delay: 0.45s; }
      `}</style>
    </div>
  );
};

export default Divertissement;
