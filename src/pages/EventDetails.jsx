import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Button from '../components/Button.jsx';
import { events } from '../data/events';
import { FaCalendar, FaClock, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';
import { useTranslation } from '../i18n/useTranslation';
import { CONTACT } from '../config/site';
import { sendEmail } from '../utils/email';
import { getLocalized, localeFromLang, mapEventCategoryKey } from '../i18n/utils';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profession: '',
    tickets: 1
  });

  useEffect(() => {
    // Determine if id is valid and find the event
    const foundEvent = events.find(e => e.id === parseInt(id));
    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      // Redirect to events page if not found
      navigate('/events');
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    // Restrict Name field to alphabetic characters only
    if (e.target.name === 'name') {
      const regex = /^[a-zA-ZÀ-ÿ\s'-]*$/;
      if (!regex.test(e.target.value)) {
        return;
      }
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      to_email: CONTACT.email,
      from_email: formData.email,
      from_name: formData.name,
      phone: formData.phone,
      profession: formData.profession,
      tickets: formData.tickets,
      event_title: getLocalized(event?.title, language) || '',
      subject: `${t('events.registerTitle')}: ${getLocalized(event?.title, language) || ''}`,
      reply_to: formData.email,
    };
    try {
      await sendEmail(import.meta?.env?.VITE_EMAILJS_TEMPLATE_EVENT || 'event_registration_template', payload);
      alert(`${t('events.registerSuccess')}${event?.title ? `: ${getLocalized(event.title, language)}` : ''}`);
      navigate('/events');
    } catch (err) {
      const body = `${t('events.nameLabel')}: ${formData.name}\n${t('events.emailLabel')}: ${formData.email}\n${t('events.phoneLabel')}: ${formData.phone}\n${t('events.professionLabel')}: ${formData.profession}\n${t('events.ticketsLabel')}: ${formData.tickets}\n\n${t('events.aboutTitle')}: ${getLocalized(event?.title, language) || ''}`;
      const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`${t('events.registerTitle')}: ${getLocalized(event?.title, language) || ''}`)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    }
  };

  if (!event) return <div className="loading">{t('common.loading')}</div>;

  return (
    <div className="event-details-page">
      <Hero 
        title={getLocalized(event.title, language)} 
        breadcrumb={t('events.breadcrumb')}
        backgroundImage="/images/hero-events.jpg"
      />

      <section className="section">
        <div className="container">
          <div className="event-layout">
            <div className="event-main">
              <div className="event-image-container">
                <img src={event.image} alt={getLocalized(event.title, language)} className="event-image" />
                <span className={`event-category ${event.category}`}>{t(`events.categories.${mapEventCategoryKey(event.category)}`)}</span>
              </div>
              
              <div className="event-info-card">
                <h3>{t('events.aboutTitle')}</h3>
                <p className="event-description">{getLocalized(event.description, language)}</p>
                
                <div className="event-meta">
                  <div className="meta-item">
                    <div className="meta-icon"><FaCalendar /></div>
                    <div>
                      <span className="label">{t('events.dateTitle')}</span>
                      <span className="value">{new Date(event.date).toLocaleDateString(localeFromLang(language), { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                  </div>
                  <div className="meta-item">
                    <div className="meta-icon"><FaClock /></div>
                    <div>
                      <span className="label">{t('events.timeTitle')}</span>
                      <span className="value">{event.time}</span>
                    </div>
                  </div>
                  <div className="meta-item">
                    <div className="meta-icon"><FaMapMarkerAlt /></div>
                    <div>
                      <span className="label">{t('events.placeTitle')}</span>
                      <span className="value">{getLocalized(event.location, language)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {event.video && (
              <div className="event-video">
                <h3>{t('events.videoTitle')}</h3>
                <div className="video-wrapper">
                  <video controls preload="metadata" poster={event.image}>
                    <source src={event.video} type="video/mp4" />
                    {t('common.videoNotSupported')}
                  </video>
                </div>
              </div>
            )}

            <div className="event-sidebar">
              <div className="registration-card">
                <h3>{t('events.registerTitle')}</h3>
                <form className="registration-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">{t('events.nameLabel')}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">{t('events.emailLabel')}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">{t('events.phoneLabel')}</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="profession">{t('events.professionLabel')}</label>
                    <input
                      type="text"
                      id="profession"
                      name="profession"
                      value={formData.profession}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="tickets">{t('events.ticketsLabel')}</label>
                    <div className="ticket-input">
                      <FaTicketAlt className="ticket-icon" />
                      <input
                        type="number"
                        id="tickets"
                        name="tickets"
                        min="1"
                        max="10"
                        value={formData.tickets}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button variant="primary" type="submit" style={{ width: '100%' }}>
                    {t('events.registerConfirm')}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .event-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: var(--spacing-3xl);
        }

        .event-image-container {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          margin-bottom: var(--spacing-xl);
          height: 400px;
        }

        .event-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .event-category {
          position: absolute;
          top: var(--spacing-md);
          right: var(--spacing-md);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          font-weight: var(--font-weight-bold);
          font-size: var(--font-size-sm);
          text-transform: uppercase;
          background: var(--color-white);
          color: var(--color-primary);
        }

        .event-info-card {
          background: var(--color-white);
          padding: var(--spacing-2xl);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
        }

        .event-info-card h3 {
          margin-bottom: var(--spacing-lg);
          color: var(--text-primary);
        }

        .event-description {
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: var(--spacing-2xl);
        }

        .event-meta {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-lg);
          padding-top: var(--spacing-xl);
          border-top: 1px solid var(--color-gray-200);
        }

        .meta-item {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-md);
        }

        .meta-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-secondary);
          border-radius: var(--radius-full);
          color: var(--color-primary);
          flex-shrink: 0;
        }

        .meta-item .label {
          display: block;
          font-size: var(--font-size-xs);
          text-transform: uppercase;
          color: var(--text-secondary);
          margin-bottom: 2px;
        }

        .meta-item .value {
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
        }

        /* Video section */
        .event-video {
          margin-top: var(--spacing-3xl);
          background: var(--color-white);
          padding: var(--spacing-2xl);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
        }

        .event-video h3 {
          margin-bottom: var(--spacing-lg);
        }

        .video-wrapper {
          position: relative;
          width: 100%;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }

        .video-wrapper video {
          width: 100%;
          height: auto;
          display: block;
        }

        .event-sidebar {
          position: sticky;
          top: 100px;
          height: fit-content;
        }

        .registration-card {
          background: var(--color-white);
          padding: var(--spacing-xl);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          border-top: 5px solid var(--color-primary);
        }

        .registration-card h3 {
          margin-bottom: var(--spacing-lg);
          text-align: center;
        }

        .registration-form {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          margin-bottom: var(--spacing-sm);
          font-weight: var(--font-weight-medium);
          color: var(--text-primary);
        }

        .form-group input {
          padding: var(--spacing-md);
          border: 2px solid var(--color-gray-300);
          border-radius: var(--radius-md);
          transition: border-color var(--transition-base);
        }

        .form-group input:focus {
          outline: none;
          border-color: var(--color-primary);
        }

        .ticket-input {
          position: relative;
        }

        .ticket-icon {
          position: absolute;
          left: var(--spacing-md);
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
        }

        .ticket-input input {
          width: 100%;
          padding-left: 40px;
        }

        @media (max-width: 1024px) {
          .event-layout {
            grid-template-columns: 1fr;
          }
          
          .event-image-container {
             height: 300px;
          }
          
          .event-meta {
            grid-template-columns: 1fr;
            gap: var(--spacing-md);
          }

          .event-sidebar {
            position: static;
            top: auto;
          }
        }

        @media (max-width: 768px) {
          .event-info-card {
            padding: var(--spacing-xl);
          }

          .event-video {
            padding: var(--spacing-xl);
          }
        }

        @media (max-width: 480px) {
          .event-image-container {
            height: 240px;
          }
        }
      `}</style>
    </div>
  );
};

export default EventDetails;
