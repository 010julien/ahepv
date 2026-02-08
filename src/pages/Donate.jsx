import { useState } from "react";
import Hero from "../components/Hero";
import Button from "../components/Button.jsx";
import { useTranslation } from "../i18n/useTranslation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaUsers,
  FaHandHoldingHeart,
  FaCreditCard,
  FaPaypal,
  FaUniversity,
  FaMobileAlt,
  FaShieldAlt,
  FaCheck,
  FaTimes,
  FaLock,
  FaCopy,
} from "react-icons/fa";

const Donate = () => {
  const { t } = useTranslation();
  const [donationType, setDonationType] = useState("once");
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [mobileProvider, setMobileProvider] = useState("tmoney");
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    if (name === "firstName" || name === "lastName") {
      const regex = /^[a-zA-ZÀ-ÿ\s'-]*$/;
      if (!regex.test(value)) return;
    }
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const handleDonate = (e) => {
    e.preventDefault();
    if (!customAmount || parseFloat(customAmount) <= 0) {
      alert("Veuillez entrer un montant valide.");
      return;
    }
    setShowPaymentModal(true);
  };

  return (
    <div className="donate-wrapper">
      {/* <Hero 
        title={t('donate.hero.title')} 
        subtitle={t('donate.hero.subtitle')}
        breadcrumb={t('donate.breadcrumb')}
        backgroundImage="/images/hero-donate.2.jpg"
      >
        <div style={{ marginTop: '20px' }}>
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => document.getElementById('donate-anchor').scrollIntoView({ behavior: 'smooth' })}
          >
            <FaHeart style={{ marginRight: '10px' }} />
            {t('donate.hero.cta')}
          </Button>
        </div>
      </Hero> */}

      <section className="impact-overview">
        {/* <div className="container">
          <div className="impact-grid">
            <div className="impact-card-stat">
              <div className="stat-icon-bg">
                <FaHeart />
              </div>
              <h3>150+</h3>
              <p>{t("donate.impact.lives")}</p>
            </div>
            <div className="impact-card-stat">
              <div className="stat-icon-bg">
                <FaUsers />
              </div>
              <h3>50+</h3>
              <p>{t("donate.impact.volunteers")}</p>
            </div>
            <div className="impact-card-stat">
              <div className="stat-icon-bg">
                <FaHandHoldingHeart />
              </div>
              <h3>5+</h3>
              <p>{t("donate.impact.projects")}</p>
            </div>
          </div>
        </div> */}
      </section>

      <div id="donate-anchor"></div>

      <section className="donation-main-section">
        <div className="container">
          <div className="donate-page-layout">
            <div className="donate-form-column">
              <div className="elegant-form-card">
                <div className="form-header">
                  <h2>{t("donate.form.title")}</h2>
                  <p>{t("donate.form.subtitle")}</p>
                </div>

                <form onSubmit={handleDonate}>
                  <div className="form-section-wrapper">
                    <h3 className="section-subtitle">
                      {t("donate.form.section1")}
                    </h3>
                    <div className="type-toggle">
                      <button
                        type="button"
                        className={donationType === "once" ? "active" : ""}
                        onClick={() => setDonationType("once")}
                      >
                        {t("donate.form.once")}
                      </button>
                      <button
                        type="button"
                        className={donationType === "monthly" ? "active" : ""}
                        onClick={() => setDonationType("monthly")}
                      >
                        {t("donate.form.monthly")}
                      </button>
                    </div>
                  </div>

                  <div className="form-section-wrapper">
                    <h3 className="section-subtitle">
                      {t("donate.form.section2")}
                    </h3>
                    <div className="amount-input-box">
                      <div className="input-group-premium">
                        <input
                          type="number"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          min="1"
                          required
                        />
                        <span className="unit-symbol">€/CFA</span>
                      </div>
                    </div>
                  </div>

                  <div className="form-section-wrapper">
                    <h3 className="section-subtitle">
                      {t("donate.form.section3")}
                    </h3>
                    <div className="payment-grid-selection">
                      <button
                        type="button"
                        className={`payment-choice-btn ${paymentMethod === "card" ? "active" : ""}`}
                        onClick={() => setPaymentMethod("card")}
                      >
                        <div className="choice-icon-wrapper">
                          <FaCreditCard className="default-icon" />
                          <div className="hover-logos">
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                              alt="Visa"
                              className="pay-logo"
                            />
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                              alt="Mastercard"
                              className="pay-logo"
                            />
                          </div>
                        </div>
                        <span className="choice-label">
                          {t("donate.modal.methods.card")}
                        </span>
                      </button>

                      <button
                        type="button"
                        className={`payment-choice-btn ${paymentMethod === "paypal" ? "active" : ""}`}
                        onClick={() => setPaymentMethod("paypal")}
                      >
                        <div className="choice-icon-wrapper">
                          <FaPaypal className="default-icon" />
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                            alt="PayPal"
                            className="pay-logo hover-logo"
                          />
                        </div>
                        <span className="choice-label">
                          {t("donate.modal.methods.paypal")}
                        </span>
                      </button>

                      <button
                        type="button"
                        className={`payment-choice-btn ${paymentMethod === "bank" ? "active" : ""}`}
                        onClick={() => setPaymentMethod("bank")}
                      >
                        <div className="choice-icon-wrapper">
                          <FaUniversity className="default-icon" />
                          <img
                            src="/images/payment/bank.png"
                            alt="Virement"
                            className="pay-logo hover-logo"
                          />
                        </div>
                        <span className="choice-label">
                          {t("donate.modal.methods.bank")}
                        </span>
                      </button>

                      <button
                        type="button"
                        className={`payment-choice-btn ${paymentMethod === "mobile" ? "active" : ""}`}
                        onClick={() => setPaymentMethod("mobile")}
                      >
                        <div className="choice-icon-wrapper">
                          <FaMobileAlt className="default-icon" />
                          <div className="hover-logos">
                            <img
                              src="/images/payment/tmoney.jpg"
                              alt="T-Money"
                              className="pay-logo"
                            />
                            <img
                              src="/images/payment/flooz.png"
                              alt="Flooz"
                              className="pay-logo"
                            />
                          </div>
                        </div>
                        <span className="choice-label">
                          {t("donate.modal.methods.mobile")}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="form-section-wrapper">
                    <h3 className="section-subtitle">
                      {t("donate.form.section4")}
                    </h3>
                    <div className="input-grid-2">
                      <div className="premium-input-field">
                        <label>{t("donate.form.firstName")}</label>
                        <input
                          type="text"
                          name="firstName"
                          value={personalInfo.firstName}
                          onChange={handleInfoChange}
                          required
                        />
                      </div>
                      <div className="premium-input-field">
                        <label>{t("donate.form.lastName")}</label>
                        <input
                          type="text"
                          name="lastName"
                          value={personalInfo.lastName}
                          onChange={handleInfoChange}
                          required
                        />
                      </div>
                      <div className="premium-input-field full-row">
                        <label>{t("donate.form.email")}</label>
                        <input
                          type="email"
                          name="email"
                          value={personalInfo.email}
                          onChange={handleInfoChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-agreement">
                    <label className="checkbox-item">
                      <input type="checkbox" defaultChecked />
                      <span>{t("donate.form.agreement")}</span>
                    </label>
                  </div>

                  <button type="submit" className="btn-submit-donate">
                    {t("donate.form.submit", {
                      amount: customAmount ? `de ${customAmount}` : "",
                    })}
                  </button>

                  <div className="security-footer">
                    <FaShieldAlt />
                    <span>{t("donate.form.security")}</span>
                  </div>
                </form>
              </div>
            </div>

            <aside className="donate-info-column">
              <div className="sidebar-elegant-card highlight-border">
                <h3>{t("donate.sidebar.impactTitle")}</h3>
                <div className="impact-steps">
                  <div className="impact-step">
                    <span className="step-val">25€</span>
                    <p>{t("donate.sidebar.step1")}</p>
                  </div>
                  <div className="impact-step">
                    <span className="step-val">50€</span>
                    <p>{t("donate.sidebar.step2")}</p>
                  </div>
                  <div className="impact-step">
                    <span className="step-val">100€</span>
                    <p>{t("donate.sidebar.step3")}</p>
                  </div>
                </div>
              </div>

              <div className="sidebar-elegant-card bg-primary-gradient text-white">
                <h3 className="text-white">
                  {t("donate.sidebar.transparencyTitle")}
                </h3>
                <p className="card-desc-white">
                  {t("donate.sidebar.transparencyText")}
                </p>
                <div className="trust-badges">
                  <FaShieldAlt /> <FaLock /> <FaCheck />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Payment Modal Refined */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div
            className="donate-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPaymentModal(false)}
          >
            <motion.div
              className="donate-modal-box"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header-refined">
                <h3>{t("donate.modal.confirmTitle")}</h3>
                <button
                  className="close-x"
                  onClick={() => setShowPaymentModal(false)}
                >
                  <FaTimes />
                </button>
              </div>

              <div className="modal-body-refined">
                <div className="amount-display-pill">
                  {t("donate.modal.amount")} <span>{customAmount} €/CFA</span>
                </div>

                {paymentMethod === "card" && (
                  <div className="card-payment-form">
                    <div className="form-group-p">
                      <label>{t("donate.modal.cardHolder")}</label>
                      <input type="text" />
                    </div>
                    <div className="form-group-p">
                      <label>{t("donate.modal.cardNumber")}</label>
                      <div className="icon-input">
                        <FaCreditCard />
                        <input type="text" />
                      </div>
                    </div>
                    <div className="form-row-p">
                      <div className="form-group-p">
                        <label>{t("donate.modal.expiration")}</label>
                        <input type="text" placeholder="MM/AA" />
                      </div>
                      <div className="form-group-p">
                        <label>{t("donate.modal.cvv")}</label>
                        <input type="text" placeholder="123" />
                      </div>
                    </div>
                    <button className="confirm-btn-p">
                      {t("donate.form.submit", { amount: "" })}
                    </button>
                  </div>
                )}

                {paymentMethod === "mobile" && (
                  <div className="mobile-payment-selection">
                    <div className="mobile-providers">
                      <div
                        className={`provider-box ${mobileProvider === "tmoney" ? "active" : ""}`}
                        onClick={() => setMobileProvider("tmoney")}
                      >
                        <img src="/images/payment/tmoney.jpg" alt="TMoney" />
                        <span>T-Money</span>
                      </div>
                      <div
                        className={`provider-box ${mobileProvider === "flooz" ? "selected" : ""}`}
                        onClick={() => setMobileProvider("flooz")}
                      >
                        <img src="/images/payment/flooz.png" alt="Flooz" />
                        <span>Flooz</span>
                      </div>
                    </div>
                    <div className="form-group-p">
                      <label>{t("donate.modal.phone")}</label>
                      <input type="tel" placeholder="Ex: 90123456" />
                    </div>
                    <button className="confirm-btn-p">
                      {t("donate.modal.mobile.confirm")}
                    </button>
                  </div>
                )}

                {paymentMethod === "bank" && (
                  <div className="bank-details-premium">
                    <p>{t("donate.modal.mobile.title")}</p>
                    <div className="bank-info-table">
                      <div className="info-r">
                        <span>{t("donate.modal.bank.bankName")}</span>{" "}
                        <strong>ECOBANK TOGO</strong>
                      </div>
                      <div className="info-r">
                        <span>{t("donate.modal.bank.accountName")}</span>{" "}
                        <strong>ASSO AHP2V</strong>
                      </div>
                      <div className="info-r">
                        <span>{t("donate.modal.bank.iban")}</span>{" "}
                        <strong>TG25 1020 3040 5060 7080 9001</strong>
                      </div>
                    </div>
                    <button
                      className="confirm-btn-p"
                      onClick={() => setShowPaymentModal(false)}
                    >
                      {t("donate.modal.bank.confirm")}
                    </button>
                  </div>
                )}

                {paymentMethod === "paypal" && (
                  <div className="paypal-center">
                    <FaPaypal size={60} color="#003087" />
                    <p>{t("donate.modal.paypal.text")}</p>
                    <button className="confirm-btn-p">
                      {t("donate.modal.paypal.confirm")}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .donate-wrapper {
          min-height: 100vh;
          background-color: var(--color-gray-50);
        }

        .impact-overview {
          padding: 35px 0;
          background: white;
          // border-bottom: 2px solid var(--color-gray-100);
        }

        .impact-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .impact-card-stat {
          text-align: center;
          padding: 40px;
          border-radius: var(--radius-lg);
          background: var(--color-gray-50);
          border: 2px solid var(--color-gray-100);
          transition: transform 0.3s;
        }

        .impact-card-stat:hover { transform: translateY(-5px); }

        .stat-icon-bg {
          width: 70px;
          height: 70px;
          background: var(--gradient-primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 1.5rem;
          box-shadow: 0 8px 15px rgba(52, 149, 67, 0.2);
        }

        .impact-card-stat h3 {
          font-size: 2.2rem;
          color: var(--color-gray-900);
          margin-bottom: 10px;
        }

        .donation-main-section {
          padding: var(--spacing-4xl) 0;
        }

        .donate-page-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 40px;
          align-items: start;
        }

        @media (max-width: 992px) {
          .donate-page-layout { grid-template-columns: 1fr; }
          .impact-grid { grid-template-columns: 1fr; }
        }

        .elegant-form-card {
          background: white;
          padding: 50px;
          border-radius: var(--radius-xl);
          border: 2px solid var(--color-gray-200);
          box-shadow: var(--shadow-xl);
        }

        .form-header {
          margin-bottom: 40px;
          text-align: center;
        }

        .form-header h2 { font-size: 2.5rem; margin-bottom: 10px; }
        .form-header p { color: var(--text-secondary); }

        .form-section-wrapper {
          margin-bottom: 35px;
        }

        .section-subtitle {
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-primary);
          margin-bottom: 20px;
          font-weight: 700;
        }

        .type-toggle {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .type-toggle button {
          padding: 15px;
          border-radius: var(--radius-md);
          border: 2px solid var(--color-gray-200);
          background: white;
          font-weight: 700;
          transition: all 0.3s;
        }

        .type-toggle button.active {
          border-color: var(--color-primary);
          background: rgba(52, 149, 67, 0.05);
          color: var(--color-primary);
          box-shadow: 0 4px 10px rgba(52, 149, 67, 0.1);
        }

        .amount-input-box {
          border: 2px solid var(--color-gray-200);
          border-radius: var(--radius-md);
          padding: 10px 20px;
          background: var(--color-gray-50);
        }

        .input-group-premium {
          display: flex;
          align-items: center;
        }

        .input-group-premium input {
          flex: 1;
          background: transparent;
          border: none;
          font-size: 2rem;
          font-weight: 800;
          padding: 10px;
          color: var(--color-gray-900);
        }

        .unit-symbol {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--color-gray-400);
        }

        .payment-grid-selection {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
        }

        @media (max-width: 500px) {
          .payment-grid-selection { grid-template-columns: repeat(2, 1fr); }
        }

        .payment-choice-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 15px;
          border: 2px solid var(--color-gray-200);
          border-radius: var(--radius-md);
          background: white;
          transition: all 0.3s;
        }

        .payment-choice-btn:hover { border-color: var(--color-primary-light); }

        .payment-choice-btn.active {
          border-color: var(--color-primary);
          background: var(--gradient-primary);
          color: white;
        }

        .choice-icon-wrapper {
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 5px;
          position: relative;
          width: 100%;
        }

        .default-icon { font-size: 1.8rem; transition: opacity 0.3s; }
        
        .hover-logos, .hover-logo {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: none;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          height: 100%;
        }

        .pay-logo {
          height: 25px;
          width: auto;
          object-fit: contain;
        }

        .payment-choice-btn:hover .default-icon,
        .payment-choice-btn.active .default-icon { 
          opacity: 0; 
        }

        .payment-choice-btn:hover .hover-logos,
        .payment-choice-btn.active .hover-logos,
        .payment-choice-btn:hover .hover-logo,
        .payment-choice-btn.active .hover-logo {
          display: flex;
        }

        .choice-label { font-size: 0.8rem; font-weight: 700; }

        .card-desc-white {
          color: white !important;
          opacity: 0.95;
        }

        .input-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .full-row { grid-column: span 2; }

        .premium-input-field label {
          display: block;
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--color-gray-700);
        }

        .premium-input-field input {
          width: 100%;
          padding: 14px;
          border-radius: var(--radius-md);
          border: 2px solid var(--color-gray-200);
          background: white;
          transition: border-color 0.3s;
        }

        .premium-input-field input:focus { border-color: var(--color-primary); }

        .btn-submit-donate {
          width: 100%;
          background: var(--gradient-primary);
          color: white;
          padding: 20px;
          border-radius: var(--radius-full);
          font-size: 1.1rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 30px;
          box-shadow: 0 10px 25px rgba(52, 149, 67, 0.3);
          transition: all 0.3s;
        }

        .btn-submit-donate:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(52, 149, 67, 0.4);
        }

        .security-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 25px;
          color: var(--color-gray-400);
          font-size: 0.8rem;
        }

        /* Sidebar Styles */
        .sidebar-elegant-card {
          background: white;
          padding: 30px;
          border-radius: var(--radius-lg);
          border: 2px solid var(--color-gray-200);
          margin-bottom: 30px;
          box-shadow: var(--shadow-lg);
        }

        .highlight-border { border-left: 8px solid var(--color-primary); }

        .bg-primary-gradient { background: var(--gradient-primary); color: white; border: none; }

        .sidebar-elegant-card h3 { margin-bottom: 20px; font-size: 1.4rem; }

        .impact-step { margin-bottom: 25px; }
        .step-val { font-size: 1.5rem; font-weight: 800; color: var(--color-primary); display: block; }
        .text-white .step-val { color: white; }

        .trust-badges { display: flex; gap: 15px; margin-top: 20px; font-size: 1.5rem; opacity: 0.8; }

        /* Modal Styles Refined */
        .donate-modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: var(--z-modal); display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(5px);
        }

        .donate-modal-box {
          background: white; width: 100%; max-width: 480px; border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-2xl);
        }

        .modal-header-refined {
          padding: 20px 30px; border-bottom: 2px solid var(--color-gray-100); display: flex; justify-content: space-between; align-items: center; background: var(--color-gray-50);
        }
        
        .modal-header-refined h3 { margin: 0; font-size: 1.2rem; font-weight: 800; }
        .close-x { background: transparent; font-size: 1.2rem; color: var(--color-gray-400); transition: color 0.3s; }
        .close-x:hover { color: var(--color-black); }

        .modal-body-refined { padding: 30px; }

        .amount-display-pill {
          background: var(--color-gray-100); padding: 12px 20px; border-radius: 50px; text-align: center; margin-bottom: 30px; font-weight: 700; border: 1px solid var(--color-primary-light);
        }

        .amount-display-pill span { color: var(--color-primary); font-size: 1.6rem; font-weight: 900; }

        .form-group-p { margin-bottom: 20px; }
        .form-group-p label { display: block; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; margin-bottom: 8px; color: var(--color-gray-600); letter-spacing: 0.05em; }
        
        .icon-input-wrapper { position: relative; display: flex; align-items: center; }
        .input-icon { position: absolute; left: 15px; color: var(--color-primary); font-size: 1.1rem; }
        .icon-input-wrapper input { padding-left: 45px !important; }
        
        .form-group-p input { width: 100%; padding: 14px; border: 2px solid var(--color-gray-200); border-radius: 10px; transition: all 0.3s; font-size: 0.95rem; }
        .form-group-p input:focus { border-color: var(--color-primary); box-shadow: 0 0 0 4px rgba(52, 149, 67, 0.1); outline: none; }

        .form-row-p { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }

        .confirm-btn-p { 
           width: 100%; padding: 16px; border-radius: 12px; font-weight: 800; font-size: 1rem; border: none; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        
        .bg-dark { background: #1a1a1a; color: white; }
        .bg-dark:hover { background: #000; transform: translateY(-2px); }
        
        .bg-primary { background: var(--gradient-primary); color: white; }
        .bg-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(52, 149, 67, 0.3); }

        /* Mobile Provider Grid */
        .payment-hint { font-size: 0.85rem; font-weight: 700; margin-bottom: 15px; color: var(--color-gray-600); }
        .mobile-providers-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px; }
        
        .provider-card {
           padding: 20px; border: 2px solid var(--color-gray-200); border-radius: 15px; text-align: center; cursor: pointer; transition: all 0.3s; position: relative;
        }
        
        .provider-card.active { border-color: var(--color-primary); background: rgba(52, 149, 67, 0.05); }
        
        .provider-logo-bg { 
           width: 60px; height: 60px; border-radius: 50%; background: white; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; overflow: hidden; border: 1px solid var(--color-gray-100);
        }
        .provider-logo-bg img { width: 100%; height: 100%; object-fit: cover; }
        .provider-card span { font-size: 0.9rem; font-weight: 800; display: block; }
        
        .selected-dot { position: absolute; top: 10px; right: 10px; background: var(--color-primary); color: white; width: 22px; height: 22px; border-radius: 50%; font-size: 0.7rem; display: flex; align-items: center; justify-content: center; }

        /* Bank Details Refined */
        .bank-alert { display: flex; align-items: center; gap: 12px; background: rgba(52, 149, 67, 0.08); padding: 15px; border-radius: 10px; margin-bottom: 25px; border-left: 4px solid var(--color-primary); }
        .bank-alert svg { color: var(--color-primary); font-size: 1.2rem; }
        .bank-alert p { margin: 0; font-size: 0.85rem; font-weight: 600; color: var(--color-primary-dark); line-height: 1.4; }
        
        .bank-info-cards { display: flex; flex-direction: column; gap: 10px; margin-bottom: 30px; }
        
        .bank-info-row { 
           display: flex; align-items: center; justify-content: space-between; background: var(--color-gray-50); padding: 15px; border-radius: 12px; border: 1px solid var(--color-gray-200);
        }
        
        .info-label-group { display: flex; flex-direction: column; gap: 4px; }
        .label-text { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; color: var(--color-gray-400); letter-spacing: 0.05em; }
        .value-text { font-size: 0.95rem; font-weight: 700; color: var(--color-gray-900); }
        
        .copy-small-btn { background: white; width: 35px; height: 35px; border-radius: 8px; border: 1px solid var(--color-gray-200); display: flex; align-items: center; justify-content: center; color: var(--color-gray-500); transition: all 0.3s; }
        .copy-small-btn:hover { background: var(--color-primary); color: white; border-color: var(--color-primary); }

        .outline-dark { background: transparent; border: 2px solid #1a1a1a; color: #1a1a1a; }
        .outline-dark:hover { background: #1a1a1a; color: white; }

        /* PayPal Refined */
        .paypal-center-refined { text-align: center; padding: 20px 0; }
        .paypal-logo-big { font-size: 4rem; color: #003087; margin-bottom: 20px; }
        .paypal-center-refined h4 { font-size: 1.4rem; margin-bottom: 10px; }
        .paypal-center-refined p { font-size: 0.9rem; color: var(--color-gray-500); margin-bottom: 30px; }
        .bg-paypal { background: #0070ba; color: white; }
        .bg-paypal:hover { background: #005ea6; transform: translateY(-2px); }
      `}</style>
    </div>
  );
};

export default Donate;
