import { useState } from 'react';
import Hero from '../components/Hero';
import Button from '../components/Button.jsx';
import { useTranslation } from '../i18n/useTranslation';
import { FaHeart, FaUsers, FaHandHoldingHeart, FaCreditCard, FaPaypal, FaUniversity, FaMobileAlt, FaShieldAlt, FaCheck, FaTimes, FaLock, FaCopy } from 'react-icons/fa';

const Donate = () => {
  const { t } = useTranslation();
  const [donationType, setDonationType] = useState('once');
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [mobileProvider, setMobileProvider] = useState('tmoney');
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    
    // Restrict Name fields to alphabetic characters only
    if (name === 'firstName' || name === 'lastName') {
      const regex = /^[a-zA-ZÀ-ÿ\s'-]*$/;
      if (!regex.test(value)) {
        return;
      }
    }

    setPersonalInfo({
      ...personalInfo,
      [name]: value
    });
  };

  const predefinedAmounts = [25, 50, 100, 250, 500, 1000];

  const handleDonate = (e) => {
    e.preventDefault();
    setShowPaymentModal(true);
  };

  return (
    <div className="donate-page">
      <Hero 
        title="Changez une Vie Aujourd'hui" 
        subtitle="Votre générosité est le moteur de nos actions. 100% sécurisé et transparent."
        breadcrumb={t('donate.breadcrumb')}
        images={['/images/hero-donate.jpg', '/images/education2.jpg', '/images/medical4.jpg']}
        overlayOpacity={0.6}
      >
        <Button 
          variant="primary" 
          size="lg" 
          onClick={() => document.getElementById('donate-form').scrollIntoView({ behavior: 'smooth' })}
        >
          <FaHeart style={{ marginRight: '8px' }} />
          Je donne maintenant
        </Button>
      </Hero>

      {/* Impact Stats Section */}
      <section className="section section-bg">
        <div className="container">
          <div className="impact-stats">
            <div className="impact-item">
              <FaHeart className="impact-icon" />
              <h3>1 50+</h3>
              <p>Vies changées</p>
            </div>
            <div className="impact-item">
              <FaUsers className="impact-icon" />
              <h3>50+</h3>
              <p>Bénévoles actifs</p>
            </div>
            <div className="impact-item">
              <FaHandHoldingHeart className="impact-icon" />
              <h3>5+</h3>
              <p>Projets en cours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section id="donate-form" className="section">
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
                        ${amount}
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
                      <span className="currency">$</span>
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
                      <div className="icon-wrapper">
                        <FaCreditCard className="default-icon" />
                        <div className="hover-logos">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="payment-logo" />
                          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="payment-logo" />
                        </div>
                      </div>
                      <span>Carte bancaire</span>
                    </button>
                    <button
                      type="button"
                      className={`payment-btn ${paymentMethod === 'paypal' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('paypal')}
                    >
                      <div className="icon-wrapper">
                         <FaPaypal className="default-icon" />
                         <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="payment-logo large hover-logo" />
                      </div>
                      <span>PayPal</span>
                    </button>
                    <button
                      type="button"
                      className={`payment-btn ${paymentMethod === 'bank' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('bank')}
                    >
                      <div className="icon-wrapper">
                        <FaUniversity className="default-icon" />
                        <img src="/images/payment/bank.png" alt="Virement" className="payment-logo hover-logo" />
                      </div>
                      <span>Virement</span>
                    </button>
                    <button
                      type="button"
                      className={`payment-btn ${paymentMethod === 'mobile' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('mobile')}
                    >
                      <div className="icon-wrapper">
                        <FaMobileAlt className="default-icon" />
                        <div className="hover-logos">
                          <img src="/images/payment/tmoney.jpg" alt="T-Money" className="payment-logo" />
                          <img src="/images/payment/flooz.png" alt="Flooz" className="payment-logo" />
                        </div>
                      </div>
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
                      <input 
                        type="text" 
                        name="firstName"
                        value={personalInfo.firstName}
                        onChange={handleInfoChange}
                        required 
                        placeholder="Votre prénom" 
                      />
                    </div>
                    <div className="form-group">
                      <label>Nom *</label>
                      <input 
                        type="text" 
                        name="lastName"
                        value={personalInfo.lastName}
                        onChange={handleInfoChange}
                        required 
                        placeholder="Votre nom" 
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Email *</label>
                      <input 
                        type="email" 
                        name="email"
                        value={personalInfo.email}
                        onChange={handleInfoChange}
                        required 
                        placeholder="votre.email@example.com" 
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Téléphone</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={personalInfo.phone}
                        onChange={handleInfoChange}
                        placeholder="+228 12 34 56 78" 
                      />
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
                  Faire un don de ${customAmount || selectedAmount}
                </Button>

                {/* Security Note */}
                <div className="security-note">
                  <FaShieldAlt />
                  <p>Paiement 100% sécurisé et crypté SSL</p>
                </div>
              </form>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && (
              <div className="modal-overlay" onClick={() => setShowPaymentModal(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <button className="modal-close" onClick={() => setShowPaymentModal(false)}>
                    <FaTimes />
                  </button>
                  
                  <div className="modal-header">
                    {paymentMethod === 'card' && <h3>Paiement par Carte</h3>}
                    {paymentMethod === 'paypal' && <h3>Paiement via PayPal</h3>}
                    {paymentMethod === 'bank' && <h3>Virement Bancaire</h3>}
                    {paymentMethod === 'mobile' && <h3>Paiement Mobile Money</h3>}
                    <div className="modal-amount">
                      Montant à payer: <span className="highlight">${customAmount || selectedAmount}</span>
                    </div>
                  </div>

                  <div className="modal-body">
                    {paymentMethod === 'card' && (
                      <form className="modal-form" onSubmit={(e) => { e.preventDefault(); alert('Paiement par carte simulé avec succès !'); setShowPaymentModal(false); }}>
                        <div className="form-group full-width">
                          <label>Nom sur la carte</label>
                          <input type="text" placeholder="John Doe" required />
                        </div>
                        <div className="form-group full-width">
                          <label>Numéro de carte</label>
                          <div className="input-with-icon">
                            <FaCreditCard className="field-icon" />
                            <input type="text" placeholder="0000 0000 0000 0000" required />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Expiration</label>
                            <input type="text" placeholder="MM/AA" required />
                          </div>
                          <div className="form-group">
                            <label>CVC</label>
                            <div className="input-with-icon">
                              <FaLock className="field-icon" />
                              <input type="text" placeholder="123" required />
                            </div>
                          </div>
                        </div>
                        <Button variant="primary" type="submit" style={{ width: '100%', marginTop: '1rem' }}>
                          <FaLock style={{ marginRight: '8px' }} /> Payer ${customAmount || selectedAmount}
                        </Button>
                      </form>
                    )}

                    {paymentMethod === 'paypal' && (
                      <div className="payment-instructions">
                          <p>Vous allez être redirigé vers PayPal pour sécuriser votre paiement.</p>
                          <Button variant="primary" onClick={() => { alert('Redirection vers PayPal...'); setShowPaymentModal(false); }} style={{ width: '100%', marginTop: '1rem' }}>
                            Continuer vers PayPal
                          </Button>
                      </div>
                    )}

                    {paymentMethod === 'bank' && (
                      <div className="bank-details">
                        <p className="instruction-text">Veuillez effectuer votre virement vers le compte suivant :</p>
                        <div className="bank-card">
                          <div className="bank-row">
                            <span>Banque :</span>
                            <strong>Ecobank Togo</strong>
                          </div>
                          <div className="bank-row">
                            <span>Titulaire :</span>
                            <strong>Dons Humanitaires</strong>
                          </div>
                          <div className="bank-row copy-row">
                            <span>IBAN :</span>
                            <strong>TG00 0000 0000 0000 0000 00</strong>
                            <button type="button" className="copy-btn" onClick={() => alert('IBAN copié !')}><FaCopy /></button>
                          </div>
                          <div className="bank-row copy-row">
                            <span>BIC / SWIFT :</span>
                            <strong>ECOBTGTG</strong>
                            <button type="button" className="copy-btn" onClick={() => alert('BIC copié !')}><FaCopy /></button>
                          </div>
                        </div>
                        <div className="reference-note">
                          <p>Communication / Motif : <strong>DON-{personalInfo.lastName ? personalInfo.lastName.toUpperCase() : 'ANONYME'}</strong></p>
                        </div>
                        <Button variant="outline" onClick={() => setShowPaymentModal(false)} style={{ width: '100%', marginTop: '1rem' }}>
                          J'ai effectué le virement
                        </Button>
                      </div>
                    )}

                    {paymentMethod === 'mobile' && (
                      <form className="modal-form" onSubmit={(e) => { e.preventDefault(); alert('Demande de paiement envoyée sur votre mobile !'); setShowPaymentModal(false); }}>
                        <div className="provider-selection">
                          <label className={`provider-option ${mobileProvider === 'tmoney' ? 'selected' : ''}`}>
                              <input type="radio" name="provider" value="tmoney" checked={mobileProvider === 'tmoney'} onChange={() => setMobileProvider('tmoney')} />
                              <img src="/images/payment/tmoney.png" alt="T-Money" />
                              <span>T-Money</span>
                          </label>
                          <label className={`provider-option ${mobileProvider === 'flooz' ? 'selected' : ''}`}>
                              <input type="radio" name="provider" value="flooz" checked={mobileProvider === 'flooz'} onChange={() => setMobileProvider('flooz')} />
                              <img src="/images/payment/flooz.png" alt="Flooz" />
                              <span>Flooz</span>
                          </label>
                        </div>
                        <div className="form-group full-width">
                          <label>Numéro de téléphone</label>
                          <div className="input-with-icon">
                            <FaMobileAlt className="field-icon" />
                            <input type="tel" placeholder="90 00 00 00" required />
                          </div>
                        </div>
                        <Button variant="primary" type="submit" style={{ width: '100%', marginTop: '1rem' }}>
                          Confirmer le paiement
                        </Button>
                      </form>
                    )}
                  </div>
                  
                  <div className="modal-footer">
                    <div className="secure-badge">
                      <FaShieldAlt /> Paiement Sécurisé SSL
                    </div>
                  </div>
                </div>
              </div>
            )}
            
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
                  <strong>$25</strong>
                  <p>Fournit des fournitures scolaires pour 5 enfants</p>
                </div>
                <div className="impact-example">
                  <strong>$50</strong>
                  <p>Finance un mois de repas pour une famille</p>
                </div>
                <div className="impact-example">
                  <strong>$100</strong>
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
        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          backdrop-filter: blur(4px);
          animation: fadeIn 0.3s ease;
        }

        .modal-content {
          background: var(--color-white);
          border-radius: var(--radius-lg);
          width: 90%;
          max-width: 500px;
          position: relative;
          box-shadow: var(--shadow-2xl);
          animation: slideUp 0.3s ease;
          overflow: hidden;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.25rem;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 0.5rem;
          transition: color 0.2s;
          z-index: 10;
        }

        .modal-close:hover {
          color: var(--color-danger);
        }

        .modal-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--color-gray-200);
          text-align: center;
          background: var(--bg-secondary);
        }

        .modal-header h3 {
          margin: 0;
          font-size: 1.5rem;
          color: var(--text-primary);
        }
        
        .modal-amount {
          margin-top: 0.5rem;
          font-size: 1.1rem;
          color: var(--text-secondary);
        }
        
        .highlight {
          color: var(--color-primary);
          font-weight: bold;
          font-size: 1.3rem;
        }

        .modal-body {
          padding: 2rem 1.5rem;
        }

        .modal-footer {
          padding: 1rem;
          background: var(--bg-secondary);
          text-align: center;
          border-top: 1px solid var(--color-gray-200);
        }

        .secure-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: #10B981; /* Success green */
          font-weight: 500;
          font-size: 0.9rem;
        }
        
        /* Modal Form Elements */
        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        
        .input-with-icon {
          position: relative;
        }
        
        .field-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
        }
        
        .input-with-icon input {
          padding-left: 2.8rem;
          width: 100%;
          padding-top: 0.8rem;
          padding-bottom: 0.8rem;
          border: 1px solid var(--color-gray-300);
          border-radius: var(--radius-md);
        }

        /* Bank Details */
        .instruction-text {
           text-align: center;
           margin-bottom: 1rem;
           color: var(--text-secondary);
        }

        .bank-card {
           background: var(--bg-secondary);
           padding: 1rem;
           border-radius: var(--radius-md);
           border: 1px solid var(--color-gray-300);
        }
        
        .bank-row {
           display: flex;
           justify-content: space-between;
           align-items: center;
           padding: 0.5rem 0;
           border-bottom: 1px dashed var(--color-gray-300);
        }
        
        .bank-row:last-child {
           border-bottom: none;
        }
        
        .copy-btn {
           background: none;
           border: none;
           color: var(--color-primary);
           cursor: pointer;
           padding: 0.2rem;
        }
        
        .reference-note {
           margin-top: 1rem;
           padding: 0.8rem;
           background: #FFF3CD;
           border: 1px solid #FFEEC0;
           border-radius: var(--radius-md);
           text-align: center;
           font-size: 0.9rem;
           color: #856404;
        }

        /* Mobile Provider Selection */
        .provider-selection {
           display: grid;
           grid-template-columns: 1fr 1fr;
           gap: 1rem;
           margin-bottom: 1rem;
        }
        
        .provider-option {
           display: flex;
           flex-direction: column;
           align-items: center;
           gap: 0.5rem;
           padding: 1rem;
           border: 2px solid var(--color-gray-200);
           border-radius: var(--radius-md);
           cursor: pointer;
           transition: all 0.2s;
        }
        
        .provider-option.selected {
           border-color: var(--color-primary);
           background: rgba(220, 200, 172, 0.2); /* Using primary color hint */
        }
        
        .provider-option input {
           display: none;
        }
        
        .provider-option img {
           height: 30px;
           object-fit: contain;
        }
        
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

        .payment-btn .icon-wrapper {
           height: 40px;
           display: flex;
           align-items: center;
           justify-content: center;
           margin-bottom: var(--spacing-xs);
        }

        .payment-btn .default-icon {
          font-size: 2rem;
          color: var(--text-secondary);
          display: block;
          transition: all var(--transition-base);
        }
        
        /* Show generic icon by default for Virement (always visible) */
        .payment-btn .default-icon.always-visible {
           display: block !important;
        }

        .hover-logos, .hover-logo {
          display: none;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-sm);
          height: 100%;
          width: 100%;
        }

        .payment-logo {
          height: 100%;
          width: auto;
          object-fit: contain;
          max-width: 60px;
        }

        .payment-logo.large {
          max-height: 28px;
        }

        /* Hover & Active States */
        /* Hide default icon on hover/active (except Virement) */
        .payment-btn:hover .default-icon:not(.always-visible),
        .payment-btn.active .default-icon:not(.always-visible) {
          display: none;
        }

        /* Show logos on hover/active */
        .payment-btn:hover .hover-logos,
        .payment-btn.active .hover-logos,
        .payment-btn:hover .hover-logo,
        .payment-btn.active .hover-logo {
          display: flex;
        }

        .payment-btn:hover,
        .payment-btn.active {
          background: var(--color-white);
          border-color: var(--color-primary);
          color: var(--color-primary);
          box-shadow: 0 0 0 1px var(--color-primary);
        }
        
        .payment-btn:hover .default-icon.always-visible,
        .payment-btn.active .default-icon.always-visible {
           color: var(--color-primary);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
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
