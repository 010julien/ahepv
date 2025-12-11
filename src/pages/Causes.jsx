import Hero from '../components/Hero';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';
import { useTranslation } from '../i18n/useTranslation';
import { causes } from '../data/causes';
import { FaUsers } from 'react-icons/fa';

const Causes = () => {
  const { t } = useTranslation();
  return (
    <div className="causes-page">
      <Hero 
        title={t('causes.title')} 
        subtitle={t('causes.subtitle')}
        breadcrumb={t('causes.breadcrumb')}
        backgroundImage="/images/hero-causes.jpg"
      />

      <section className="section">
        <div className="container">
          <div className="causes-grid">
            {causes.map((cause) => {
              const percentage = Math.floor((cause.raised / cause.goal) * 100);
              return (
                <Card key={cause.id} image={cause.image} title={cause.title} description={cause.description}>
                  <ProgressBar
                    percentage={percentage}
                    raised={cause.raised}
                    goal={cause.goal}
                  />
                  <div className="cause-donors">
                    <FaUsers />
                    <span>{cause.donors} {t('causes.donors')}</span>
                  </div>
                  <Button variant="primary">{t('home.donateNow')}</Button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        .causes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: var(--spacing-xl);
        }

        .cause-donors {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          color: var(--text-secondary);
          margin-bottom: var(--spacing-md);
          font-size: var(--font-size-sm);
        }

        .btn-outline {
          color: var(--color-primary);
        }
        

        .cause-donors svg {
          color: var(--color-primary);
        }

        .cause-donors t{
          color: var(--color-primary);
        }

        @media (max-width: 768px) {
          .causes-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Causes;
