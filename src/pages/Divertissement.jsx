import { useState } from 'react';
import Hero from '../components/Hero';
import { useTranslation } from '../i18n/useTranslation';
import { getLocalized } from '../i18n/utils';
import { entertainments } from '../data/entertainment';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaMapMarkerAlt, FaLongArrowAltRight } from 'react-icons/fa';

const Divertissement = () => {
  const { t, language } = useTranslation();
  const [selectedItem, setSelectedItem] = useState(null);

  const dateBadges = [
    { day: "21", month: t('common.months.jun') },
    { day: "01", month: t('common.months.sep') },
    { day: "15", month: t('common.months.oct') },
    { day: "05", month: t('common.months.nov') },
    { day: "24", month: t('common.months.dec') },
    { day: "08", month: t('common.months.jan') },
    { day: "14", month: t('common.months.feb') },
    { day: "30", month: t('common.months.mar') },
    { day: "12", month: t('common.months.apr') }
  ];

  return (
    <div className="divertissement-wrapper">
      <Hero 
        title={t('events.hero.title')} 
        subtitle={t('events.hero.subtitle')}
        breadcrumb={t('events.breadcrumb')}
        images={['/images/hero-events.jpg', '/images/actitehero1.jpg', '/images/actitehero2.jpg']}
        overlayOpacity={0.2}
      />

      <section className="divertissement-section">
        <div className="container">
          <div className="masonry-grid">
            {entertainments.map((item, index) => {
               const date = dateBadges[index % dateBadges.length];
               const isPrimaryCard = index === 1 || index === 4 || index === 7;
               
               return (
                <motion.div 
                  key={item.id}
                  className="masonry-item"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className={`activity-card ${isPrimaryCard ? 'card-primary' : 'card-white'}`}>
                    <div className="card-image-wrapper">
                       <img 
                          src={item.image} 
                          alt={getLocalized(item.title, language)}
                          className="card-img"
                          onError={(e) => { e.target.src = "/images/5ans.jpg"; }}
                        />
                        <div className="image-overlay"></div>
                        
                        <div className={`date-badge ${isPrimaryCard ? 'badge-on-primary' : 'badge-on-white'}`}>
                          <span className="badge-day">{date.day}</span>
                          <span className="badge-month">{date.month}</span>
                        </div>
                    </div>

                    <div className="card-body">
                      <div className="card-meta">
                         <span className="meta-line"></span>
                         <div className="meta-category">{item.category}</div>
                      </div>

                      <h3 className="card-title">
                        {getLocalized(item.title, language)}
                      </h3>
                      
                      <p className="card-excerpt">
                        {getLocalized(item.description, language)}
                      </p>

                      <div className="card-footer">
                        <div className="author-info">
                           <span className="author-prefix">{t('common.by')}</span>
                           <span className="author-name">Asso-ahp2v</span>
                        </div>
                        <div className="read-more">
                           <span>{t('home.readMore')}</span>
                           <FaLongArrowAltRight />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            className="custom-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div 
              className="custom-modal-content"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
               <div className="modal-left">
                  <img src={selectedItem.image} alt="" className="modal-img" />
                  <div className="modal-img-overlay">
                     <span className="modal-category-tag">{selectedItem.category}</span>
                  </div>
               </div>
               
               <div className="modal-right">
                  <button onClick={() => setSelectedItem(null)} className="modal-close-btn">
                       <FaTimes />
                  </button>

                  <h2 className="modal-title">{getLocalized(selectedItem.title, language)}</h2>
                  
                  <div className="modal-meta-row">
                     <div className="modal-location">
                        <FaMapMarkerAlt />
                        <span>{getLocalized(selectedItem.location, language)}</span>
                     </div>
                  </div>
                  
                  <div className="modal-description">
                    {getLocalized(selectedItem.description, language)}
                  </div>
                  
                  <div className="modal-actions">
                     <button className="btn-participate">{t('home.joinEvent')}</button>
                  </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style>{`
        .divertissement-wrapper {
          min-h: 100vh;
          background: linear-gradient(135deg, var(--color-gray-50), var(--color-white), var(--color-gray-100));
        }

        .divertissement-section {
          padding: var(--spacing-4xl) 0;
        }

        .masonry-grid {
          column-count: 3;
          column-gap: var(--spacing-xl);
        }

        @media (max-width: 1024px) {
          .masonry-grid { column-count: 2; }
        }

        @media (max-width: 768px) {
          .masonry-grid { column-count: 1; }
        }

        .masonry-item {
          break-inside: avoid;
          margin-bottom: var(--spacing-xl);
          cursor: pointer;
        }

        .activity-card {
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 2px solid;
          transition: all var(--transition-base);
          position: relative;
        }

        .card-white {
          background: var(--color-white);
          border-color: var(--color-gray-300);
          box-shadow: var(--shadow-lg);
          color: var(--color-gray-900);
        }

        .card-primary {
          background: var(--gradient-primary);
          border-color: var(--color-primary-dark);
          box-shadow: 0 10px 30px rgba(52, 149, 67, 0.2);
          color: var(--color-white);
        }

        .activity-card:hover {
          transform: translateY(-8px);
        }

        .card-white:hover {
          box-shadow: var(--shadow-2xl);
          border-color: var(--color-primary-light);
        }

        .card-primary:hover {
          box-shadow: 0 20px 50px rgba(52, 149, 67, 0.4);
        }

        .card-image-wrapper {
          position: relative;
          overflow: hidden;
        }

        .card-img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.6s ease;
        }

        .activity-card:hover .card-img {
          transform: scale(1.05);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0);
          transition: background 0.3s;
        }

        .activity-card:hover .image-overlay {
          background: rgba(0,0,0,0.05);
        }

        .date-badge {
          position: absolute;
          bottom: -20px;
          right: 25px;
          width: 65px;
          height: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 10;
          border-radius: var(--radius-sm);
          border: 2px solid;
          box-shadow: var(--shadow-xl);
        }

        .badge-on-white {
          background: linear-gradient(to bottom, #1a1a1a, #000);
          border-color: #333;
          color: white;
        }

        .badge-on-primary {
          background: white;
          border-color: white;
          color: var(--color-primary-dark);
        }

        .badge-day {
          font-size: 1.5rem;
          font-weight: 800;
          line-height: 1;
        }

        .badge-month {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-top: 4px;
          opacity: 0.8;
        }

        .card-body {
          padding: var(--spacing-xl);
          padding-top: var(--spacing-2xl);
        }

        .card-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 15px;
        }

        .meta-line {
          width: 25px;
          height: 2px;
          border-radius: 2px;
        }

        .card-white .meta-line { background: var(--color-primary); }
        .card-primary .meta-line { background: rgba(255,255,255,0.6); }

        .meta-category {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .card-white .meta-category { color: var(--color-gray-400); }
        .card-primary .meta-category { color: rgba(255,255,255,0.8); }

        .card-title {
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 15px;
          font-family: var(--font-primary);
        }

        .card-primary .card-title {
          color: white !important;
        }

        .card-excerpt {
          font-size: 0.95rem;
          line-height: 1.6;
          opacity: 0.8;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: var(--spacing-xl);
        }

        .card-primary .card-excerpt {
          color: white !important;
          opacity: 0.95;
        }

        .card-footer {
          border-top: 1px solid;
          padding-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .card-white .card-footer { border-color: var(--color-gray-100); }
        .card-primary .card-footer { border-color: rgba(255,255,255,0.15); }

        .author-info { display: flex; gap: 6px; }
        .author-prefix { color: var(--color-primary); }
        .card-primary .author-prefix { color: white; opacity: 0.7; }

        .read-more {
          display: flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.3s;
        }

        .activity-card:hover .read-more { transform: translateX(5px); }

        /* Modal Styles */
        .custom-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: var(--z-modal);
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .custom-modal-content {
          background: white;
          width: 100%;
          max-width: 1100px;
          max-height: 90vh;
          border-radius: var(--radius-xl);
          overflow: hidden;
          display: flex;
          box-shadow: var(--shadow-2xl);
        }

        @media (max-width: 850px) {
          .custom-modal-content { flex-direction: column; overflow-y: auto; }
        }

        .modal-left {
          flex: 1.2;
          position: relative;
          min-h: 400px;
        }

        .modal-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-category-tag {
          position: absolute;
          bottom: 30px;
          left: 30px;
          background: var(--color-primary);
          color: white;
          padding: 6px 15px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          border-radius: 4px;
        }

        .modal-right {
          flex: 1;
          padding: 50px;
          position: relative;
          overflow-y: auto;
        }

        .modal-close-btn {
          position: absolute;
          top: 30px;
          right: 30px;
          background: var(--color-gray-100);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s;
        }

        .modal-close-btn:hover { background: var(--color-gray-200); }

        .modal-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 25px;
          line-height: 1.1;
        }

        .modal-meta-row {
          margin-bottom: 30px;
          padding-bottom: 25px;
          border-bottom: 1px solid var(--color-gray-100);
        }

        .modal-location {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .modal-location svg { color: var(--color-primary); }

        .modal-description {
          line-height: 1.8;
          color: var(--text-secondary);
          margin-bottom: 40px;
        }

        .btn-participate {
          width: 100%;
          background: var(--color-gray-900);
          color: white;
          padding: 18px;
          border-radius: var(--radius-md);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: all 0.3s;
        }

        .btn-participate:hover {
          background: var(--color-primary);
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(52, 149, 67, 0.2);
        }
      `}</style>
    </div>
  );
};

export default Divertissement;
