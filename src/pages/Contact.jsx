import { useState } from 'react';
import Hero from '../components/Hero';
import Button from '../components/Button';
import { useTranslation } from '../i18n/useTranslation';
import { FaPhone, FaEnvelope, FaLocationDot, FaClock, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa6';

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
        title="Contactez-nous" 
        subtitle="Nous sommes là pour répondre à toutes vos questions. N'hésitez pas à nous contacter !"
        breadcrumb="Contact"
        backgroundImage="/images/hero-faq.jpg"
      />

      <section className="section">
        <div className="container">
          <div className="contact-layout">
            {/* Contact Form */}
            <div className="contact-form-container">
              <h2>Envoyez-nous un message</h2>
              <p className="form-intro">Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.</p>
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">Prénom *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Nom *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Votre nom"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="votre.email@example.com"
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
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="subject">Sujet *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Sujet de votre message"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Écrivez votre message ici..."
                  ></textarea>
                </div>

                <Button variant="primary" type="submit" style={{ width: '100%', padding: '1rem 2rem' }}>
                  Envoyer le message
                </Button>
              </form>
            </div>

            {/* Contact Info Sidebar */}
            <aside className="contact-sidebar">
              <div className="contact-info-card">
                <h3>Informations de contact</h3>
                
                <div className="contact-info-item">
                  <div className="info-icon">
                    <FaLocationDot />
                  </div>
                  <div className="info-content">
                    <h4>Adresse</h4>
                    <p>123 Avenue de la Charité<br />75001 Paris, France</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="info-icon">
                    <FaPhone />
                  </div>
                  <div className="info-content">
                    <h4>Téléphone</h4>
                    <p>+33 1 23 45 67 89</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="info-icon">
                    <FaEnvelope />
                  </div>
                  <div className="info-content">
                    <h4>Email</h4>
                    <p>contact@ah2pv.org<br />info@ah2pv.org</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="info-icon">
                    <FaClock />
                  </div>
                  <div className="info-content">
                    <h4>Horaires d'ouverture</h4>
                    <p>
                      Lundi - Vendredi: 9h00 - 18h00<br />
                      Samedi: 10h00 - 16h00<br />
                      Dimanche: Fermé
                    </p>
                  </div>
                </div>
              </div>

              <div className="social-card">
                <h3>Suivez-nous</h3>
                <div className="social-links">
                  <a href="#" className="social-link" aria-label="Facebook">
                    <FaFacebookF size={20} style={{
                      color: "var(--color-primary)"
                    }} />
                  </a>
                  <a href="#" className="social-link" aria-label="Twitter">
                    <FaTwitter size={20} style={{
                      color: "var(--color-primary)"
                    }} />
                  </a>
                  <a href="#" className="social-link" aria-label="LinkedIn">
                    <FaLinkedinIn size={20} style={{
                      color: "var(--color-primary)",
                      
                    }} />
                  </a>
                  <a href="#" className="social-link" aria-label="Instagram">
                    <FaInstagram size={20} style={{
                      color: "var(--color-primary)"
                    }} />
                  </a>
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
            title="Notre localisation"
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

        .social-link {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: "var(--color-primary)"
          
          border-radius: var(--radius-md);
        
          font-size: var(--font-size-xl);
          transition: all var(--transition-base);
        }

        .social-link:hover {
          background: var(--gradient-primary);
          color: var(--color-white);
          transform: translateY(-3px);
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
