import { useState } from 'react';
import Hero from '../components/Hero';
import Button from '../components/Button.jsx';
import { useTranslation } from '../i18n/useTranslation';
import { CONTACT } from '../config/site';
import { sendEmail } from '../utils/email';

const Volunteer = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profession: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      to_email: CONTACT.email,
      from_email: formData.email,
      from_name: formData.name,
      phone: formData.phone,
      profession: formData.profession,
      interests: Array.isArray(formData.interests) ? formData.interests.join(', ') : '',
      availability: formData.availability,
      message: formData.message,
      subject: t('volunteer.subject'),
      reply_to: formData.email,
    };
    try {
      await sendEmail(import.meta?.env?.VITE_EMAILJS_TEMPLATE_VOLUNTEER || 'volunteer_template', payload);
      alert(t('volunteer.success'));
    } catch (err) {
      const availabilityLabel = formData.availability ? t(`volunteer.availabilityOptions.${formData.availability}`) : '';
      const body = `${t('volunteer.nameLabel')}: ${formData.name}\n${t('volunteer.emailLabel')}: ${formData.email}\n${t('volunteer.phoneLabel')}: ${formData.phone}\n${t('volunteer.professionLabel')}: ${formData.profession}\n${t('volunteer.interests')}: ${payload.interests}\n${t('volunteer.availability')}: ${availabilityLabel}\n\n${formData.message}`;
      const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(t('volunteer.subject'))}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    }
  };

  const interestOptions = [
    { value: 'events', label: t('volunteer.interestOptions.events') },
    { value: 'fundraising', label: t('volunteer.interestOptions.fundraising') },
    { value: 'logistics', label: t('volunteer.interestOptions.logistics') },
    { value: 'education', label: t('volunteer.interestOptions.education') },
    { value: 'communication', label: t('volunteer.interestOptions.communication') }
  ];

  return (
    <div className="volunteer-page">
      <Hero 
        title="Rejoignez le Mouvement" 
        subtitle="Donnez de votre temps et de vos compétences pour construire un monde meilleur."
        breadcrumb={t('volunteer.breadcrumb')}
        images={['/images/hero-volunteer.jpg', '/images/kante4.jpg', '/images/lits-mandouri4.jpg']}
        overlayOpacity={0.65}
      >
        <Button 
          variant="primary" 
          size="lg" 
          onClick={() => document.querySelector('.volunteer-form').scrollIntoView({ behavior: 'smooth' })}
        >
          Je deviens bénévole
        </Button>
      </Hero>

      <section className="section">
        <div className="container">
          <div className="volunteer-content">
            <div className="mb-xl flex flex-col w-full justify-content-center align-items-center text-center">
              <h2>{t('volunteer.whyTitle')}</h2>
              <p className=" justify-content-center align-items-center text-center">
                {t('volunteer.whyText')}
              </p>
            </div>

            <div className="volunteer-form-container">
              <form className="volunteer-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">{t('volunteer.nameLabel')} *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t('volunteer.placeholders.name')}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">{t('volunteer.emailLabel')} *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t('volunteer.placeholders.email')}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">{t('volunteer.phoneLabel')}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('volunteer.placeholders.phone')}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="profession">{t('volunteer.professionLabel')}</label>
                  <input
                    type="text"
                    id="profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    placeholder={t('volunteer.placeholders.profession')}
                  />
                </div>

                <div className="form-group">
                  <label>{t('volunteer.interests')}</label>
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
                  <label htmlFor="availability">{t('volunteer.availability')}</label>
                  <select
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{t('volunteer.placeholders.availability')}</option>
                    <option value="weekdays">{t('volunteer.availabilityOptions.weekdays')}</option>
                    <option value="weekends">{t('volunteer.availabilityOptions.weekends')}</option>
                    <option value="flexible">{t('volunteer.availabilityOptions.flexible')}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">{t('volunteer.messageLabel')}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder={t('volunteer.placeholders.message')}
                  ></textarea>
                </div>

                <Button variant="primary" type="submit" style={{ width: '100%', padding: '1rem' }}>
                  {t('volunteer.submit')}
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
