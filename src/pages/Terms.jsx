import Hero from '../components/Hero';
import { useTranslation } from '../i18n/useTranslation';

const Terms = () => {
  const { t } = useTranslation();

  return (
    <div className="terms-page">
      <Hero 
        title="Conditions d'utilisation" 
        breadcrumb="Conditions"
        backgroundImage="/images/hero-about.jpg" 
      />

      <section className="section">
        <div className="container">
          <div className="legal-content">
            <p className="last-updated">Dernière mise à jour : 14 Décembre 2025</p>

            <section className="legal-section">
              <h2>1. Mentions Légales</h2>
              <p>
                Le site ah2pv.org est édité par l'association AH2PV, organisme à but non lucratif.
                <br />
                Adresse : 123 Avenue de la Charité, 75001 Paris, France
                <br />
                Email : contact@ah2pv.org
                <br />
                Téléphone : +33 1 23 45 67 89
              </p>
            </section>

            <section className="legal-section">
              <h2>2. Hébergement</h2>
              <p>
                Ce site est hébergé par [Nom de l'hébergeur], [Adresse de l'hébergeur].
              </p>
            </section>

            <section className="legal-section">
              <h2>3. Propriété Intellectuelle</h2>
              <p>
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
                Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                La reproduction de tout ou partie de ce site est formellement interdite sauf autorisation expresse du directeur de la publication.
              </p>
            </section>

            <section className="legal-section">
              <h2>4. Responsabilité</h2>
              <p>
                L'association AH2PV s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. 
                Toutefois, nous ne pouvons garantir l'exactitude, la précision ou l'exhaustivité des informations mises à la disposition sur ce site.
                En conséquence, l'association décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site.
              </p>
            </section>

            <section className="legal-section">
              <h2>5. Liens Hypertextes</h2>
              <p>
                Les liens hypertextes mis en place dans le cadre du présent site internet en direction d'autres ressources présentes sur le réseau Internet 
                ne sauraient engager la responsabilité de l'association AH2PV.
              </p>
            </section>

            <section className="legal-section">
              <h2>6. Modification des Conditions</h2>
              <p>
                L'association AH2PV se réserve le droit de modifier les présentes conditions d'utilisation à tout moment. 
                L'utilisateur s'engage donc à les consulter régulièrement.
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

        @media (max-width: 768px) {
          .legal-content {
            padding: var(--spacing-xl);
          }
        }
      `}</style>
    </div>
  );
};

export default Terms;
