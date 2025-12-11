import { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Card from '../components/Card';
import Button from '../components/Button';
import { useTranslation } from '../i18n/useTranslation';
import { events } from '../data/events';
import { FaCalendar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const Events = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('upcoming');

  const filteredEvents = events.filter(event => event.status === activeTab);

  return (
    <div className="events-page">
      <Hero 
        title={t('events.title')} 
        subtitle={t('events.subtitle')}
        breadcrumb={t('events.breadcrumb')}
        backgroundImage="/images/hero-events.jpg"
      />

      <section className="section">
        <div className="container">
          {/* Tabs */}
          <div className="event-tabs">
            <button
              className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              {t('events.upcoming')}
            </button>
            <button
              className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
              onClick={() => setActiveTab('past')}
            >
              {t('events.past')}
            </button>
          </div>

          {/* Events Grid */}
          <div className="events-grid">
            {filteredEvents.map((event) => (
              <Card key={event.id} image={event.image} title={event.title} description={event.description}>
                <div className="event-details">
                  <div className="event-detail-item">
                    <FaCalendar />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { 
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
                    <span>{event.location}</span>
                  </div>
                </div>
                {activeTab === 'upcoming' && (
                  <Link to={`/events/${event.id}`} className="btn btn-secondary">
                    {t('home.joinEvent')}
                  </Link>
                )}
              </Card>
            ))}
          </div>

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
