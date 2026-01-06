import { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import Pagination from '../components/Pagination';
import { useTranslation } from '../i18n/useTranslation';
import { getLocalized, localeFromLang } from '../i18n/utils';
import { events } from '../data/events';
import { FaCalendar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const Events = () => {
  const { t, language } = useTranslation();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredEvents = events.filter(event => event.status === activeTab);

  // Pagination logic
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 400, behavior: 'smooth' }); // Scroll past hero
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page on tab change
  };

  return (
    <div className="events-page">
      <Hero 
        title={t('events.hero.title')} 
        subtitle={t('events.hero.subtitle')}
        breadcrumb={t('events.breadcrumb')}
        images={['/images/hero-events.jpg', '/images/actitehero1.jpg', '/images/actitehero2.jpg']}
        overlayOpacity={0.2}
      >
        <Button 
          variant="primary" 
          size="lg" 
          onClick={() => document.querySelector('.events-grid').scrollIntoView({ behavior: 'smooth' })}
        >
          Prochain événement
        </Button>
      </Hero>

      <section className="section">
        <div className="container">
          {/* Tabs */}
          <div className="event-tabs">
            <button
              className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
              onClick={() => handleTabChange('upcoming')}
            >
              {t('events.upcoming')}
            </button>
            <button
              className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
              onClick={() => handleTabChange('past')}
            >
              {t('events.past')}
            </button>
          </div>

          {/* Events Grid */}
          <div className="events-grid">
            {currentItems.map((event) => (
              <Card
                key={event.id}
                image={event.image}
                title={getLocalized(event.title, language)}
                description={getLocalized(event.description, language)}
                clickable
                link={`/events/${event.id}`}
                linkText={t('home.readMore')}
                linkVariant="button"
                alwaysShowLink
              >
                <div className="event-details">
                  <div className="event-detail-item">
                    <FaCalendar />
                    <span>{new Date(event.date).toLocaleDateString(localeFromLang(language), { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="event-detail-item">
                    <FaClock />
                    <span>{event.time}</span>
                  </div>
                  <div className="event-detail-item">
                    <FaMapMarkerAlt />
                    <span>{getLocalized(event.location, language)}</span>
                  </div>
                </div>
                {activeTab === 'upcoming' && (
                  <Link to={`/events/${event.id}`} className="btn btn-secondary" onClick={(e) => e.stopPropagation()}>
                    {t('home.joinEvent')}
                  </Link>
                )}
              </Card>
            ))}
          </div>

          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

          {filteredEvents.length === 0 && (
            <div className="no-events">
              <p>{t('events.noEvents')}</p>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .event-tabs {
          display: flex;
          justify-content: center;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-3xl);
        }

        .tab-btn {
          padding: var(--spacing-md) var(--spacing-2xl);
          background: var(--color-white);
          border: 2px solid var(--color-gray-300);
          border-radius: var(--radius-md);
          font-family: var(--font-primary);
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
          transition: all var(--transition-base);
          cursor: pointer;
        }

        .tab-btn:hover,
        .tab-btn.active {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: var(--color-white);
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: var(--spacing-xl);
        }

        /* Clamp description lines on event cards */
        .events-page .card-text {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }

        .event-details {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-lg);
          padding: var(--spacing-md);
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
        }

        .event-detail-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          color: var(--text-secondary);
          font-size: var(--font-size-sm);
        }

        .event-detail-item svg {
          color: var(--color-primary);
          flex-shrink: 0;
        }

        .no-events {
          text-align: center;
          padding: var(--spacing-4xl);
          color: var(--text-secondary);
          font-size: var(--font-size-lg);
        }

        @media (max-width: 768px) {
          .events-grid {
            grid-template-columns: 1fr;
          }

          .event-tabs {
            flex-direction: column;
          }

          .tab-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Events;
