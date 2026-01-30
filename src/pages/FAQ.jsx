import { useState } from 'react';
import Hero from '../components/Hero';
import Accordion from '../components/Accordion';
import { useTranslation } from '../i18n/useTranslation';
import { CONTACT } from '../config/site';
import { FaSearch } from 'react-icons/fa';

const FAQ = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get FAQ data from translations
  const faqQuestions = t('faq.questions') || [];
  const categories = [
    { key: 'all', label: t('faq.categories.all') },
    { key: 'donations', label: t('faq.categories.donations') },
    { key: 'volunteering', label: t('faq.categories.volunteering') },
    { key: 'general', label: t('faq.categories.general') },
    { key: 'programs', label: t('faq.categories.programs') }
  ];

  const filteredFAQs = faqQuestions.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="faq-page">
      <Hero 
        title={t('faq.breadcrumb')}
        subtitle={t('faq.searchPlaceholder')}
        breadcrumb={t('faq.breadcrumb')}
        images={['/images/hero-faq.jpg', '/images/hero3.jpeg']}
        overlayOpacity={0.7}
      />

      <section className="section">
        <div className="container">
          {/* Search */}
          <div className="faq-search">
            <FaSearch />
            <input
              type="text"
              placeholder={t('faq.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filters */}
          <div className="faq-categories">
            {categories.map((category) => (
              <button
                key={category.key}
                className={`faq-category-btn ${selectedCategory === category.key ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.key)}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="faq-content">
            {filteredFAQs.length > 0 ? (
              <Accordion items={filteredFAQs} />
            ) : (
              <div className="no-results">
                <p>{t('faq.noQuestions')}</p>
              </div>
            )}
          </div>

          {/* Contact CTA */}
          <div className="faq-cta">
            <h3>{t('faq.stillQuestions')}</h3>
            <p>{t('faq.stillQuestionsText')}</p>
            <a href={`mailto:${CONTACT.email}`} className="btn btn-primary">
              {t('faq.contactUs')}
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .faq-search {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          padding: var(--spacing-lg) var(--spacing-xl);
          background: var(--color-white);
          border: 2px solid var(--color-gray-300);
          border-radius: var(--radius-md);
          margin-bottom: var(--spacing-2xl);
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .faq-search svg {
          color: var(--color-gray-400);
          font-size: var(--font-size-xl);
        }

        .faq-search input {
          flex: 1;
          border: none;
          outline: none;
          font-size: var(--font-size-lg);
        }

        .faq-categories {
          display: flex;
          justify-content: center;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-3xl);
          flex-wrap: wrap;
        }

        .faq-category-btn {
          padding: var(--spacing-md) var(--spacing-xl);
          background: var(--color-white);
          border: 2px solid var(--color-gray-300);
          border-radius: var(--radius-md);
          font-family: var(--font-primary);
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
          transition: all var(--transition-base);
          cursor: pointer;
        }

        .faq-category-btn:hover,
        .faq-category-btn.active {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: var(--color-white);
        }

        .faq-content {
          max-width: 900px;
          margin: 0 auto var(--spacing-4xl);
        }

        .no-results {
          text-align: center;
          padding: var(--spacing-4xl);
          color: var(--text-secondary);
          font-size: var(--font-size-lg);
        }

        .faq-cta {
          text-align: center;
          padding: var(--spacing-3xl);
          background: var(--bg-secondary);
          border-radius: var(--radius-lg);
          max-width: 600px;
          margin: 0 auto;
        }

        .faq-cta h3 {
          margin-bottom: var(--spacing-md);
        }

        .faq-cta p {
          color: var(--text-secondary);
          margin-bottom: var(--spacing-xl);
        }

        @media (max-width: 768px) {
          .faq-search {
            padding: var(--spacing-md);
          }

          .faq-categories {
            flex-direction: column;
            align-items: stretch;
          }

          .faq-category-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default FAQ;
