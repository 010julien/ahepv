import { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Card from '../components/Card.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import Button from '../components/Button.jsx';
import Pagination from '../components/Pagination';
import { useTranslation } from '../i18n/useTranslation';
import { getLocalized } from '../i18n/utils';
import { causes } from '../data/causes';
import { FaUsers } from 'react-icons/fa';

const Causes = () => {
  const { t, language } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Pagination logic
  const totalPages = Math.ceil(causes.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = causes.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    document.getElementById('causes-list').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="causes-page">
      <Hero 
        title={t('causes.hero.title')} 
        subtitle={t('causes.hero.subtitle')}
        breadcrumb={t('causes.breadcrumb')}
        images={['/images/causes1.jpg', '/images/medical.jpg', '/images/education1.jpg']}
        overlayOpacity={0.2}
      >
        <Button 
          variant="primary" 
          size="lg" 
          onClick={() => document.getElementById('causes-list').scrollIntoView({ behavior: 'smooth' })}
        >
          Voir les urgences
        </Button>
      </Hero>

      <section id="causes-list" className="section">
        <div className="container">
          <div className="causes-grid">
            {currentItems.map((cause) => {
              const percentage = Math.floor((cause.raised / cause.goal) * 100);
              return (
                <Card
                  key={cause.id}
                  image={cause.image}
                  images={cause.images}
                  title={getLocalized(cause.title, language)}
                  description={getLocalized(cause.description, language)}
                  clickable
                  link={`/causes/${cause.id}`}
                >
                  <ProgressBar
                    percentage={percentage}
                    raised={cause.raised}
                    goal={cause.goal}
                  />
                  <div className="cause-donors">
                    <FaUsers />
                    <span className="donors-text">{cause.donors} {t('causes.donors')}</span>
                  </div>
                  <div className="button-row">
                    <Link
                      to="/donate"
                      className="btn btn-primary"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t('home.donateNow')}
                    </Link>
                    <Link
                      to={`/causes/${cause.id}`}
                      className="btn btn-primary"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t('home.readMore')}
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>

          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>

      <style>{`
        .causes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--spacing-xl);
          margin-top: var(--spacing-lg);
        }

        .cause-donors {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          color: var(--text-primary) !important;
          margin-bottom: var(--spacing-md);
          font-size: var(--font-size-sm);
        }

        

        .cause-donors svg {
          color: var(--color-primary);
        }

        .donors-text {
          color: var(--color-primary) !important;
          font-weight: var(--font-weight-medium);
        }

        /* Clamp description text to 3 lines only on the Causes page */
        .causes-page .card-text {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3; /* show 3 lines */
          overflow: hidden;
        }

        .button-row {
          display: flex;
          gap: var(--spacing-sm);
          margin-top: var(--spacing-md);
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .causes-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-lg);
          }
        }
      `}</style>
    </div>
  );
};

export default Causes;
