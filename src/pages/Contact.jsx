import { useState } from 'react';
import Hero from '../components/Hero';
import Button from '../components/Button';
import { useTranslation } from '../i18n/useTranslation';
import { FaPhone, FaEnvelope, FaLocationDot, FaClock } from 'react-icons/fa6';
import SocialLink from '../components/SocialLink';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Restrict Name fields to alphabetic characters only
    if (name === 'firstName' || name === 'lastName') {
      // Regex allows letters (including accents), spaces, hyphens, and apostrophes
      const regex = /^[a-zA-ZÀ-ÿ\s'-]*$/;
      if (!regex.test(value)) {
        return;
      }
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Merci ${formData.firstName} ! Votre message a été envoyé.`);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-page">
      <Hero 
        title={t('contactPage.title')}
        subtitle={t('contactPage.subtitle')}
        breadcrumb={t('contactPage.breadcrumb')}
        backgroundImage="/images/hero-faq.jpg"
      />

      <section className="section">
        <div className="container">
          <div className="contact-layout">
            {/* Contact Form */}
            <div className="contact-form-container">
              <h2>{t('contactPage.formTitle')}</h2>
              <p className="form-intro">{t('contactPage.formIntro')}</p>
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">{t('contactPage.firstName')} *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder={t('contactPage.placeholders.firstName')}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">{t('contactPage.lastName')} *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder={t('contactPage.placeholders.lastName')}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">{t('contactPage.email')} *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t('contactPage.placeholders.email')}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">{t('contactPage.phone')}</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t('contactPage.placeholders.phone')}
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="subject">{t('contactPage.subject')} *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder={t('contactPage.placeholders.subject')}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">{t('contactPage.message')} *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder={t('contactPage.placeholders.message')}
                  ></textarea>
                </div>

                <Button variant="primary" type="submit" style={{ width: '100%', padding: '1rem 2rem' }}>
                  {t('contactPage.send')}
                </Button>
              </form>
            </div>

            {/* Contact Info Sidebar */}
            <aside className="contact-sidebar">
              <div className="contact-info-card">
                <h3>{t('contactPage.infoTitle')}</h3>
                
                <div className="contact-info-item">
                  <div className="info-icon">
                    <FaLocationDot />
                  </div>
                  <div className="info-content">
                    <h4>{t('contactPage.addressTitle')}</h4>
                    <p>123 Avenue de la Charité<br />75001 Paris, France</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="info-icon">
                    <FaPhone />
                  </div>
                  <div className="info-content">
                    <h4>{t('contactPage.phoneTitle')}</h4>
                    <p>+33 1 23 45 67 89</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="info-icon">
                    <FaEnvelope />
                  </div>
                  <div className="info-content">
                    <h4>{t('contactPage.emailTitle')}</h4>
                    <p>contact@ah2pv.org<br />info@ah2pv.org</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="info-icon">
                    <FaClock />
                  </div>
                  <div className="info-content">
                    <h4>{t('contactPage.hoursTitle')}</h4>
                    <p style={{ whiteSpace: 'pre-line' }}>{t('contactPage.hoursText')}</p>
                  </div>
                </div>
              </div>

              <div className="social-card">
                <h3>{t('contactPage.followUs')}</h3>
                <div className="social-links">
                  <SocialLink platform="facebook" url="#" style={{ color: 'var(--color-primary)' }} />
                  <SocialLink platform="twitter" url="#" style={{ color: 'var(--color-primary)' }} />
                  <SocialLink platform="linkedin" url="#" style={{ color: 'var(--color-primary)' }} />
                  <SocialLink platform="instagram" url="#" style={{ color: 'var(--color-primary)' }} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.3412!3d48.8566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUxJzIzLjgiTiAywrAyMCcyOC4zIkU!5e0!3m2!1sen!2sfr!4v1234567890"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={t('contactPage.addressTitle')}
          ></iframe>
        </div>
      </section>

      <style>{`
        .contact-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: var(--spacing-3xl);
          align-items: start;
        }

        .contact-form-container {
          background: var(--color-white);
          padding: var(--spacing-3xl);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
        }

        .contact-form-container h2 {
          margin-bottom: var(--spacing-md);
          color: var(--text-primary);
        }

        .form-intro {
          color: var(--text-secondary);
          margin-bottom: var(--spacing-2xl);
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-lg);
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          margin-bottom: var(--spacing-sm);
          font-weight: var(--font-weight-medium);
          color: var(--text-primary);
        }

        .form-group input,
        .form-group textarea {
          padding: var(--spacing-md) var(--spacing-lg);
          border: 2px solid var(--color-gray-300);
          border-radius: var(--radius-md);
          font-size: var(--font-size-base);
          font-family: var(--font-primary);
          transition: border-color var(--transition-base);
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--color-primary);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .contact-sidebar {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xl);
          position: sticky;
          top: 100px;
        }

        .contact-info-card,
        .social-card {
          background: var(--color-white);
          padding: var(--spacing-xl);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
        }

        .contact-info-card h3,
        .social-card h3 {
          font-size: var(--font-size-xl);
          margin-bottom: var(--spacing-lg);
          color: var(--text-primary);
          padding-bottom: var(--spacing-sm);
          border-bottom: 2px solid var(--color-primary);
        }

        .contact-info-item {
          display: flex;
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-xl);
          padding-bottom: var(--spacing-lg);
          border-bottom: 1px solid var(--color-gray-200);
        }

        .contact-info-item:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .info-icon {
          flex-shrink: 0;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--gradient-primary);
          border-radius: var(--radius-md);
          color: var(--color-white);
          font-size: var(--font-size-xl);
        }

        .info-content h4 {
          font-size: var(--font-size-lg);
          margin-bottom: var(--spacing-xs);
          color: var(--text-primary);
        }

        .info-content p {
          color: var(--text-secondary);
          font-size: var(--font-size-base);
          line-height: 1.6;
          margin: 0;
        }

        .social-links {
          display: flex;
          gap: var(--spacing-md);
        }

        .map-section {
          padding: 0;
          margin-top: var(--spacing-4xl);
        }

        .map-container {
          width: 100%;
          height: 450px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-xl);
        }

        @media (max-width: 1024px) {
          .contact-layout {
            grid-template-columns: 1fr;
          }

          .contact-sidebar {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }

          .contact-form-container {
            padding: var(--spacing-xl);
          }

          .map-container {
            height: 300px;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
