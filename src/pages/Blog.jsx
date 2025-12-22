import { useState } from 'react';
import Hero from '../components/Hero';
import Card from '../components/Card';
import { useTranslation } from '../i18n/useTranslation';
import { getLocalized, localeFromLang } from '../i18n/utils';
import { blogPosts, categories } from '../data/blog';
import { FaUser, FaClock, FaSearch } from 'react-icons/fa';

const Blog = () => {
  const { t, language } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const title = getLocalized(post.title, language).toLowerCase();
    const excerpt = getLocalized(post.excerpt, language).toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesSearch = title.includes(q) || excerpt.includes(q);
    return matchesCategory && matchesSearch;
  });

  const recentPosts = blogPosts.slice(0, 3);

  return (
    <div className="blog-page">
      <Hero 
        title={t('blog.title')} 
        subtitle={t('blog.subtitle')}
        breadcrumb={t('blog.breadcrumb')}
        backgroundImage="/images/hero-blog.jpg"
      />

      <section className="section">
        <div className="container">
          <div className="blog-layout">
            {/* Main Content */}
            <div className="blog-main">
              {/* Search */}
              <div className="blog-search">
                <FaSearch />
                <input
                  type="text"
                  placeholder={t('blog.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Blog Posts */}
              <div className="blog-posts">
                {filteredPosts.map((post) => (
                  <Card key={post.id} image={post.image} title={getLocalized(post.title, language)} description={getLocalized(post.excerpt, language)}>
                    <div className="blog-meta">
                      <div className="blog-meta-item">
                        <FaUser />
                        <span>{post.author}</span>
                      </div>
                      <div className="blog-meta-item">
                        <FaClock />
                        <span>{getLocalized(post.readTime, language)}</span>
                      </div>
                    </div>
                    <div className="blog-footer">
                      <span className="blog-category">{t(`blog.categoryLabels.${post.category}`)}</span>
                      <span className="blog-date">{new Date(post.date).toLocaleDateString(localeFromLang(language))}</span>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="no-posts">
                  <p>{t('blog.noArticles')}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="blog-sidebar">
              {/* Categories */}
              <div className="sidebar-widget">
                <h3>{t('blog.categories')}</h3>
                <div className="categories-list">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {t(`blog.categoryLabels.${category}`)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Posts */}
              <div className="sidebar-widget">
                <h3>{t('blog.recentPosts')}</h3>
                <div className="recent-posts">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="recent-post-item">
                      <img src={post.image} alt={getLocalized(post.title, language)} />
                      <div className="recent-post-info">
                        <h5>{getLocalized(post.title, language)}</h5>
                        <span>{new Date(post.date).toLocaleDateString(localeFromLang(language))}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <style>{`
        .blog-layout {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: var(--spacing-3xl);
        }

        .blog-search {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          padding: var(--spacing-md) var(--spacing-lg);
          background: var(--color-white);
          border: 2px solid var(--color-gray-300);
          border-radius: var(--radius-md);
          margin-bottom: var(--spacing-2xl);
        }

        .blog-search svg {
          color: var(--color-gray-400);
        }

        .blog-search input {
          flex: 1;
          border: none;
          outline: none;
          font-size: var(--font-size-base);
        }

        .blog-posts {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xl);
        }

        .blog-meta {
          display: flex;
          gap: var(--spacing-lg);
          margin: var(--spacing-md) 0;
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
        }

        .blog-meta-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
        }

        .blog-meta-item svg {
          color: var(--color-primary);
        }

        .blog-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: var(--spacing-md);
          padding-top: var(--spacing-md);
          border-top: 1px solid var(--color-gray-200);
        }

        .blog-category {
          display: inline-block;
          padding: var(--spacing-xs) var(--spacing-md);
          background: var(--color-primary);
          color: var(--color-white);
          border-radius: var(--radius-full);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
        }

        .blog-date {
          color: var(--text-light);
          font-size: var(--font-size-sm);
        }

        .blog-sidebar {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xl);
        }

        .sidebar-widget {
          background: var(--color-white);
          padding: var(--spacing-lg);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
        }

        .sidebar-widget h3 {
          margin-bottom: var(--spacing-lg);
          padding-bottom: var(--spacing-sm);
          border-bottom: 2px solid var(--color-primary);
        }

        .categories-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .category-btn {
          padding: var(--spacing-sm) var(--spacing-md);
          background: var(--bg-secondary);
          border: none;
          border-radius: var(--radius-md);
          text-align: left;
          color: var(--text-primary);
          transition: all var(--transition-base);
          cursor: pointer;
        }

        .category-btn:hover,
        .category-btn.active {
          background: var(--color-primary);
          color: var(--color-white);
        }

        .recent-posts {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .recent-post-item {
          display: flex;
          gap: var(--spacing-md);
          padding-bottom: var(--spacing-md);
          border-bottom: 1px solid var(--color-gray-200);
        }

        .recent-post-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .recent-post-item img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: var(--radius-md);
        }

        .recent-post-info {
          flex: 1;
        }

        .recent-post-info h5 {
          font-size: var(--font-size-sm);
          margin-bottom: var(--spacing-xs);
          line-height: 1.4;
        }

        .recent-post-info span {
          font-size: var(--font-size-xs);
          color: var(--text-light);
        }

        .no-posts {
          text-align: center;
          padding: var(--spacing-4xl);
          color: var(--text-secondary);
          font-size: var(--font-size-lg);
        }

        @media (max-width: 1024px) {
          .blog-layout {
            grid-template-columns: 1fr;
          }

          .blog-sidebar {
            order: -1;
          }
        }
      `}</style>
    </div>
  );
};

export default Blog;
