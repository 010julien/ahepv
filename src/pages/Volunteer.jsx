import { useState } from 'react';
import Hero from '../components/Hero';
import Button from '../components/Button';
import { useTranslation } from '../i18n/useTranslation';

const Volunteer = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interests: [],
    availability: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const updatedInterests = checked 
        ? [...formData.interests, value]
        : formData.interests.filter(interest => interest !== value);
      
      setFormData({
        ...formData,
        interests: updatedInterests
      });
    } else {
      // Restrict Name field to alphabetic characters only
      if (name === 'name') {
        const regex = /^[a-zA-ZÀ-ÿ\s'-]*$/;
        if (!regex.test(value)) {
          return;
        }
      }

      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Merci ${formData.name} ! Votre candidature a été envoyée.`);
    // Reset form or redirect
  };

  const interestOptions = [
    { value: 'events', label: 'Événements' },
    { value: 'fundraising', label: 'Collecte de fonds' },
    { value: 'logistics', label: 'Logistique' },
    { value: 'education', label: 'Éducation' },
    { value: 'communication', label: 'Communication' }
  ];

  return (
    <div className="volunteer-page">
      <Hero 
        title="Devenir Bénévole" 
        subtitle="Rejoignez notre équipe et faites une différence concrète."
        breadcrumb="Bénévolat"
        backgroundImage="/images/hero-about.jpg" 
      />

      <section className="section">
        <div className="container">
          <div className="volunteer-content">
            <div className="mb-xl flex flex-col w-full justify-content-center align-items-center text-center">
              <h2>Pourquoi nous rejoindre ?</h2>
              <p className=" justify-content-center align-items-center text-center">
                En devenant bénévole, vous contribuez directement à nos actions sur le terrain.
                Que vous ayez quelques heures par mois ou plusieurs jours par semaine, votre aide est précieuse.
              </p>
            </div>

            <div className="volunteer-form-container">
              <form className="volunteer-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Nom complet *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Votre nom"
                    />
                  </div>
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

                <div className="form-group">
                  <label>Centres d'intérêt</label>
                  <div className="checkbox-group">
                    {interestOptions.map(option => (
                      <label key={option.value} className="checkbox-label">
                        <input
                          type="checkbox"
                          name="interests"
                          value={option.value}
                          checked={formData.interests.includes(option.value)}
                          onChange={handleChange}
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="availability">Disponibilités</label>
                  <select
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionnez votre disponibilité</option>
                    <option value="weekdays">En semaine</option>
                    <option value="weekends">Le week-end</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message (motiver votre candidature)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Dites-nous pourquoi vous souhaitez nous rejoindre..."
                  ></textarea>
                </div>

                <Button variant="primary" type="submit" style={{ width: '100%', padding: '1rem' }}>
                  Envoyer ma candidature
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .volunteer-form-container {
          max-width: 800px;
          margin: 0 auto;
          background: var(--color-white);
          padding: var(--spacing-3xl);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
        }

        .volunteer-form {
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

        .form-group label {
          margin-bottom: var(--spacing-sm);
          font-weight: var(--font-weight-medium);
          color: var(--text-primary);
        }

        .form-group input[type="text"],
        .form-group input[type="email"],
        .form-group input[type="tel"],
        .form-group select,
        .form-group textarea {
          padding: var(--spacing-md);
          border: 2px solid var(--color-gray-300);
          border-radius: var(--radius-md);
          transition: border-color var(--transition-base);
          font-family: var(--font-primary);
          font-size: var(--font-size-base);
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--color-primary);
        }

        .checkbox-group {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: var(--spacing-md);
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          cursor: pointer;
        }
        
        .section-desc {
          justify-content: center;
          
          max-width: 700px;
          color: var(--text-secondary);
          margin-bottom: var(--spacing-3xl);
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .volunteer-form-container {
             padding: var(--spacing-xl);
          }
        }
      `}</style>
    </div>
  );
};

export default Volunteer;
