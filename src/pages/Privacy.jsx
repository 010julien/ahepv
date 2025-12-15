import Hero from '../components/Hero';
import { useTranslation } from '../i18n/useTranslation';

const Privacy = () => {
  const { t } = useTranslation();

  return (
    <div className="privacy-page">
      <Hero 
        title="Politique de Confidentialité" 
        breadcrumb="Confidentialité"
        backgroundImage="/images/hero-about.jpg" 
      />

      <section className="section">
        <div className="container">
          <div className="legal-content">
            <p className="last-updated">Dernière mise à jour : 14 Décembre 2025</p>

            <section className="legal-section">
              <h2>1. Introduction</h2>
              <p>
                L'association AH2PV ("nous", "notre") s'engage à protéger la vie privée des visiteurs de son site web et de ses donateurs. 
                Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations personnelles.
              </p>
            </section>

            <section className="legal-section">
              <h2>2. Collecte des informations</h2>
              <p>Nous collectons les informations que vous nous fournissez volontairement lorsque :</p>
              <ul>
                <li>Vous faites un don</li>
                <li>Vous vous inscrivez à notre newsletter</li>
                <li>Vous remplissez un formulaire de contact ou de bénévolat</li>
                <li>Vous vous inscrivez à un événement</li>
              </ul>
              <p>Ces informations peuvent inclure votre nom, adresse email, numéro de téléphone, et adresse postale.</p>
            </section>

            <section className="legal-section">
              <h2>3. Utilisation des données</h2>
              <p>Vos données sont utilisées pour :</p>
              <ul>
                <li>Traiter vos dons et émettre des reçus fiscaux</li>
                <li>Vous envoyer des informations sur nos actions (avec votre consentement)</li>
                <li>Répondre à vos demandes de contact</li>
                <li>Améliorer notre site web et nos services</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>4. Protection des données</h2>
              <p>
                Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données contre l'accès non autorisé, 
                la modification, la divulgation ou la destruction. Les transactions financières sont sécurisées et cryptées par nos prestataires de paiement.
              </p>
            </section>

            <section className="legal-section">
              <h2>5. Partage des informations</h2>
              <p>
                Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers. 
                Vos données ne sont partagées qu'avec des prestataires de services tiers qui nous aident à exploiter notre site web 
                ou à mener nos activités, à condition que ces parties conviennent de garder ces informations confidentielles.
              </p>
            </section>

            <section className="legal-section">
              <h2>6. Vos droits</h2>
              <p>
                Conformément à la réglementation en vigueur (RGPD), vous disposez d'un droit d'accès, de rectification, 
                de suppression et de portabilité de vos données. Pour exercer ces droits, veuillez nous contacter à : contact@ah2pv.org
              </p>
            </section>

            <section className="legal-section">
              <h2>7. Cookies</h2>
              <p>
                Notre site utilise des cookies pour améliorer votre expérience de navigation. 
                Vous pouvez choisir de désactiver les cookies via les options de votre navigateur.
              </p>
            </section>
          </div>
        </div>
      </section>

      <style>{`
        .legal-content {
          max-width: 800px;
          margin: 0 auto;
          background: var(--color-white);
          padding: var(--spacing-3xl);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
        }

        .last-updated {
          color: var(--text-secondary);
          font-style: italic;
          margin-bottom: var(--spacing-2xl);
          border-bottom: 1px solid var(--color-gray-200);
          padding-bottom: var(--spacing-lg);
        }

        .legal-section {
          margin-bottom: var(--spacing-2xl);
        }

        .legal-section:last-child {
          margin-bottom: 0;
        }

        .legal-section h2 {
          color: var(--color-primary);
          font-size: var(--font-size-2xl);
          margin-bottom: var(--spacing-md);
        }

        .legal-section p {
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: var(--spacing-md);
        }

        .legal-section ul {
          margin-bottom: var(--spacing-md);
          padding-left: var(--spacing-xl);
        }

        .legal-section li {
          color: var(--text-secondary);
          margin-bottom: var(--spacing-sm);
          list-style-type: disc;
        }

        @media (max-width: 768px) {
          .legal-content {
            padding: var(--spacing-xl);
          }
        }
      `}</style>
    </div>
  );
};

export default Privacy;
