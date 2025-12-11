import { useState } from 'react';
import Hero from '../components/Hero';
import Accordion from '../components/Accordion';
import { useTranslation } from '../i18n/useTranslation';
import { faqData, faqCategories } from '../data/faq';
import { FaSearch } from 'react-icons/fa';

const FAQ = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="faq-page">
      <Hero 
        title={t('faq.title')} 
        subtitle={t('faq.subtitle')}
        breadcrumb={t('faq.breadcrumb')}
        backgroundImage="/images/hero-faq.jpg"
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
            {faqCategories.map((category) => (
              <button
                key={category}
                className={`faq-category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
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
            <h3>Still have questions?</h3>
            <p>Can't find the answer you're looking for? Feel free to reach out to our team.</p>
            <a href="mailto:info@charity.org" className="btn btn-primary">
              Contact Us
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
