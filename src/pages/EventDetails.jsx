import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Button from '../components/Button';
import { events } from '../data/events';
import { FaCalendar, FaClock, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Merci ${formData.name} ! Votre inscription pour "${event.title}" a été confirmée.`);
    navigate('/events');
  };

  if (!event) return <div className="loading">Chargement...</div>;

  return (
    <div className="event-details-page">
      <Hero 
        title={event.title} 
        breadcrumb="Événement"
        backgroundImage="/images/hero-events.jpg"
      />

      <section className="section">
        <div className="container">
          <div className="event-layout">
            <div className="event-main">
              <div className="event-image-container">
                <img src={event.image} alt={event.title} className="event-image" />
                <span className={`event-category ${event.category}`}>{event.category}</span>
              </div>
              
              <div className="event-info-card">
                <h3>À propos de l'événement</h3>
                <p className="event-description">{event.description}</p>
                
                <div className="event-meta">
                  <div className="meta-item">
                    <div className="meta-icon"><FaCalendar /></div>
                    <div>
                      <span className="label">Date</span>
                      <span className="value">{new Date(event.date).toLocaleDateString('fr-FR', { 
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
                      <span className="label">Heure</span>
                      <span className="value">{event.time}</span>
                    </div>
                  </div>
                  <div className="meta-item">
                    <div className="meta-icon"><FaMapMarkerAlt /></div>
                    <div>
                      <span className="label">Lieu</span>
                      <span className="value">{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="event-sidebar">
              <div className="registration-card">
                <h3>Inscription</h3>
                <form className="registration-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Nom complet</label>
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
                    <label htmlFor="email">Email</label>
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
                    <label htmlFor="phone">Téléphone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="tickets">Nombre de places</label>
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
                    Confirmer l'inscription
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
        }
      `}</style>
    </div>
  );
};

export default EventDetails;
