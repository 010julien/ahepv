import { useState } from 'react';
import Hero from '../components/Hero';
import Button from '../components/Button';
import { useTranslation } from '../i18n/useTranslation';
import { FaHeart, FaUsers, FaHandHoldingHeart, FaCreditCard, FaPaypal, FaUniversity, FaMobileAlt, FaShieldAlt, FaCheck } from 'react-icons/fa';

const Donate = () => {
  const { t } = useTranslation();
  const [donationType, setDonationType] = useState('once');
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const predefinedAmounts = [25, 50, 100, 250, 500, 1000];

  const handleDonate = (e) => {
    e.preventDefault();
    const amount = customAmount || selectedAmount;
    alert(`Merci pour votre don de ${amount}€ !`);
  };

  return (
    <div className="donate-page">
      <Hero 
        title="Faire un Don" 
        subtitle="Votre générosité change des vies. Chaque don compte et fait une vraie différence."
        breadcrumb="Don"
        backgroundImage="/images/hero-causes.jpg"
      />

      {/* Impact Stats Section */}
      <section className="section section-bg">
        <div className="container">
          <div className="impact-stats">
            <div className="impact-item">
              <FaHeart className="impact-icon" />
              <h3>1 500+</h3>
              <p>Vies changées</p>
            </div>
            <div className="impact-item">
              <FaUsers className="impact-icon" />
              <h3>500+</h3>
              <p>Bénévoles actifs</p>
            </div>
            <div className="impact-item">
              <FaHandHoldingHeart className="impact-icon" />
              <h3>50+</h3>
              <p>Projets en cours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="section">
        <div className="container">
          <div className="donate-layout">
            {/* Main Form */}
            <div className="donate-form-container">
              <form className="donate-form" onSubmit={handleDonate}>
                {/* Donation Type */}
                <div className="form-section">
                  <h3>Type de don</h3>
                  <div className="donation-type-buttons">
                    <button
                      type="button"
                      className={`type-btn ${donationType === 'once' ? 'active' : ''}`}
                      onClick={() => setDonationType('once')}
                    >
                      Don unique
                    </button>
                    <button
                      type="button"
                      className={`type-btn ${donationType === 'monthly' ? 'active' : ''}`}
                      onClick={() => setDonationType('monthly')}
                    >
                      Don mensuel
                    </button>
                  </div>
                </div>

                {/* Amount Selection */}
                <div className="form-section">
                  <h3>Montant du don</h3>
                  <div className="amount-grid">
                    {predefinedAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        className={`amount-btn ${selectedAmount === amount && !customAmount ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount('');
                        }}
                      >
                        {amount}€
                      </button>
                    ))}
                  </div>
                  <div className="custom-amount">
                    <label>Ou entrez un montant personnalisé</label>
                    <div className="input-wrapper">
                      <input
                        type="number"
                        placeholder="Montant"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        min="1"
                      />
                      <span className="currency">€</span>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="form-section">
                  <h3>Méthode de paiement</h3>
                  <div className="payment-methods">
                    <button
                      type="button"
                      className={`payment-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <FaCreditCard />
                      <span>Carte bancaire</span>
                    </button>
                    <button
                      type="button"
                      className={`payment-btn ${paymentMethod === 'paypal' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('paypal')}
                    >
                      <FaPaypal />
                      <span>PayPal</span>
                    </button>
                    <button
                      type="button"
                      className={`payment-btn ${paymentMethod === 'bank' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('bank')}
                    >
                      <FaUniversity />
                      <span>Virement</span>
                    </button>
                    <button
                      type="button"
                      className={`payment-btn ${paymentMethod === 'mobile' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('mobile')}
                    >
                      <FaMobileAlt />
                      <span>Mobile Money</span>
                    </button>
                  </div>
                </div>

                {/* Personal Info */}
                <div className="form-section">
                  <h3>Vos informations</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Prénom *</label>
                      <input type="text" required placeholder="Votre prénom" />
                    </div>
                    <div className="form-group">
                      <label>Nom *</label>
                      <input type="text" required placeholder="Votre nom" />
                    </div>
                    <div className="form-group full-width">
                      <label>Email *</label>
                      <input type="email" required placeholder="votre.email@example.com" />
                    </div>
                    <div className="form-group full-width">
                      <label>Téléphone</label>
                      <input type="tel" placeholder="+33 6 12 34 56 78" />
                    </div>
                  </div>
                </div>

                {/* Tax Receipt */}
                <div className="form-section">
                  <div className="checkbox-group">
                    <input type="checkbox" id="receipt" defaultChecked />
                    <label htmlFor="receipt">
                      Je souhaite recevoir un reçu fiscal (66% de déduction d'impôts)
                    </label>
                  </div>
                  <div className="checkbox-group">
                    <input type="checkbox" id="newsletter" />
                    <label htmlFor="newsletter">
                      Je souhaite recevoir les actualités de l'association
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <Button variant="primary" type="submit" style={{ width: '100%', padding: '1rem 2rem', fontSize: '1.125rem' }}>
                  Faire un don de {customAmount || selectedAmount}€
                </Button>

                {/* Security Note */}
                <div className="security-note">
                  <FaShieldAlt />
                  <p>Paiement 100% sécurisé et crypté SSL</p>
                </div>
              </form>
            </div>

            {/* Sidebar Info */}
            <aside className="donate-sidebar">
              <div className="sidebar-card">
                <h3>Pourquoi donner ?</h3>
                <ul className="benefits-list">
                  <li>
                    <FaCheck />
                    <span>Impact direct sur le terrain</span>
                  </li>
                  <li>
                    <FaCheck />
                    <span>Transparence totale</span>
                  </li>
                  <li>
                    <FaCheck />
                    <span>Déduction fiscale 66%</span>
                  </li>
                  <li>
                    <FaCheck />
                    <span>Suivi de vos dons</span>
                  </li>
                </ul>
              </div>

              <div className="sidebar-card impact-card">
                <h3>Votre impact</h3>
                <div className="impact-example">
                  <strong>25€</strong>
                  <p>Fournit des fournitures scolaires pour 5 enfants</p>
                </div>
                <div className="impact-example">
                  <strong>50€</strong>
                  <p>Finance un mois de repas pour une famille</p>
                </div>
                <div className="impact-example">
                  <strong>100€</strong>
                  <p>Permet l'accès à l'eau potable pour 20 personnes</p>
                </div>
              </div>

              <div className="sidebar-card other-ways">
                <h3>Autres façons d'aider</h3>
                <p>Vous pouvez également nous soutenir en :</p>
                <ul>
                  <li>Devenant bénévole</li>
                  <li>Partageant notre mission</li>
                  <li>Organisant une collecte</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <style>{`
        .section-bg {
          background: var(--bg-secondary);
        }

        .impact-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-2xl);
          text-align: center;
        }

        .impact-item {
          padding: var(--spacing-2xl);
          background: var(--color-white);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
        }

        .impact-icon {
          font-size: var(--font-size-5xl);
          color: var(--color-primary);
          margin-bottom: var(--spacing-md);
        }

        .impact-item h3 {
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-extrabold);
          color: var(--text-primary);
          margin-bottom: var(--spacing-sm);
        }

        .impact-item p {
          color: var(--text-secondary);
          font-size: var(--font-size-lg);
        }

        .donate-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: var(--spacing-3xl);
          align-items: start;
        }

        .donate-form-container {
          background: var(--color-white);
          padding: var(--spacing-3xl);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
        }

        .form-section {
          margin-bottom: var(--spacing-2xl);
        }

        .form-section h3 {
          font-size: var(--font-size-xl);
          margin-bottom: var(--spacing-lg);
          color: var(--text-primary);
        }

        .donation-type-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-md);
        }

        .type-btn {
          padding: var(--spacing-lg) var(--spacing-xl);
          background: var(--color-white);
          border: 2px solid var(--color-gray-300);
          border-radius: var(--radius-md);
          font-family: var(--font-primary);
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .type-btn:hover,
        .type-btn.active {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: var(--color-white);
        }

        .amount-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-lg);
        }

        .amount-btn {
          padding: var(--spacing-lg);
          background: var(--color-white);
          border: 2px solid var(--color-gray-300);
          border-radius: var(--radius-md);
          font-family: var(--font-primary);
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .amount-btn:hover,
        .amount-btn.active {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: var(--color-white);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .custom-amount label {
          display: block;
          margin-bottom: var(--spacing-sm);
          color: var(--text-secondary);
          font-weight: var(--font-weight-medium);
        }

        .input-wrapper {
          position: relative;
        }

        .input-wrapper input {
          width: 100%;
          padding: var(--spacing-md) var(--spacing-xl);
          padding-right: 3rem;
          border: 2px solid var(--color-gray-300);
          border-radius: var(--radius-md);
          font-size: var(--font-size-lg);
          font-family: var(--font-primary);
        }

        .input-wrapper input:focus {
          outline: none;
          border-color: var(--color-primary);
        }

        .currency {
          position: absolute;
          right: var(--spacing-lg);
          top: 50%;
          transform: translateY(-50%);
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          color: var(--text-secondary);
        }

        .payment-methods {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-md);
        }

        .payment-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-lg);
          background: var(--color-white);
          border: 2px solid var(--color-gray-300);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .payment-btn svg {
          font-size: var(--font-size-2xl);
          color: var(--text-secondary);
        }

        .payment-btn:hover,
        .payment-btn.active {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: var(--color-white);
        }

        .payment-btn:hover svg,
        .payment-btn.active svg {
          color: var(--color-white);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-md);
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
          color: var(--text-primary);
          font-weight: var(--font-weight-medium);
        }

        .form-group input {
          padding: var(--spacing-md) var(--spacing-lg);
          border: 2px solid var(--color-gray-300);
          border-radius: var(--radius-md);
          font-size: var(--font-size-base);
          font-family: var(--font-primary);
        }

        .form-group input:focus {
          outline: none;
          border-color: var(--color-primary);
        }

        .checkbox-group {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-md);
        }

        .checkbox-group input[type="checkbox"] {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        .checkbox-group label {
          cursor: pointer;
          color: var(--text-secondary);
        }

        .security-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-md);
          margin-top: var(--spacing-lg);
          padding: var(--spacing-md);
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
        }

        .security-note svg {
          color: var(--color-primary);
          font-size: var(--font-size-xl);
        }

        .donate-sidebar {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xl);
          position: sticky;
          top: 100px;
        }

        .sidebar-card {
          background: var(--color-white);
          padding: var(--spacing-xl);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
        }

        .sidebar-card h3 {
          font-size: var(--font-size-xl);
          margin-bottom: var(--spacing-lg);
          color: var(--text-primary);
          padding-bottom: var(--spacing-sm);
          border-bottom: 2px solid var(--color-primary);
        }

        .benefits-list {
          list-style: none;
          padding: 0;
        }

        .benefits-list li {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-md);
          color: var(--text-secondary);
        }

        .benefits-list svg {
          color: var(--color-primary);
          flex-shrink: 0;
        }

        .impact-example {
          margin-bottom: var(--spacing-lg);
          padding: var(--spacing-md);
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
          border-left: 4px solid var(--color-primary);
        }

        .impact-example strong {
          display: block;
          font-size: var(--font-size-xl);
          color: var(--color-primary);
          margin-bottom: var(--spacing-sm);
        }

        .impact-example:last-child {
          margin-bottom: 0;
        }

        .other-ways p {
          margin-bottom: var(--spacing-md);
          color: var(--text-secondary);
        }

        .other-ways ul {
          list-style: none;
          padding: 0;
        }

        .other-ways li {
          padding: var(--spacing-sm) 0;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--color-gray-200);
        }

        .other-ways li:last-child {
          border-bottom: none;
        }

        @media (max-width: 1024px) {
          .donate-layout {
            grid-template-columns: 1fr;
          }

          .donate-sidebar {
            position: static;
          }

          .impact-stats {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .amount-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .payment-methods {
            grid-template-columns: 1fr;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .donation-type-buttons {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Donate;
