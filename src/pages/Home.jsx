import { Link } from 'react-router-dom';
import { FaHeart, FaUsers, FaHandHoldingHeart, FaArrowRight } from 'react-icons/fa';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import Counter from '../components/Counter';
import Button from '../components/Button';
import { useTranslation } from '../i18n/useTranslation';
import { causes } from '../data/causes';
import { events } from '../data/events';
 

const Home = () => {
  const { t } = useTranslation();
  const featuredCauses = causes.slice(0, 3);
  const upcomingEvents = events.filter(e => e.status === 'upcoming').slice(0, 3);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero-overlay"></div>
        <div className="container">
          <div className="home-hero-content">
            <h1 className="home-hero-title">{t('home.heroTitle')}</h1>
            <p className="home-hero-subtitle">
              {t('home.heroSubtitle')}
            </p>
            <div className="home-hero-buttons">
              <Link to="/causes" className="btn btn-primary btn-lg">
                {t('home.ourCauses')}
              </Link>
              <Link to="/about" className="btn btn-outline-hero btn-lg">
                {t('home.learnMore')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section">
        <div className="container">
          <div className="about-preview">
            <div className="about-preview-content">
              <h2>{t('home.welcome')}</h2>
              <p>
                {t('home.welcomeText1')}
              </p>
              <p>
                {t('home.welcomeText2')}
              </p>
              <Link to="/about" className="btn btn-primary" style={{ marginTop: '2rem' }} >
                {t('home.discoverStory')}
              </Link>
            </div>
            <div className="about-preview-image">
              <img src="/images/bienvenue.jpg" alt="About us" />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      {/* <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <FaHeart className="stat-icon" />
              <h3 className="stat-number">
                <Counter end={80} suffix="+" />
              </h3>
              <p className="stat-label">{t('home.stats.livesChanged')}</p>
            </div>
            <div className="stat-item">
              <FaUsers className="stat-icon" />
              <h3 className="stat-number">
                <Counter end={34} suffix="+" />
              </h3>
              <p className="stat-label">{t('home.stats.volunteers')}</p>
            </div>
            <div className="stat-item">
              <FaHandHoldingHeart className="stat-icon" />
              <h3 className="stat-number">
                <Counter end={10} suffix="+" />
              </h3>
              <p className="stat-label">{t('home.stats.projects')}</p>
            </div>
            <div className="stat-item">
              <FaHeart className="stat-icon" />
              <h3 className="stat-number">
                $<Counter end={130} suffix="K+" />
              </h3>
              <p className="stat-label">{t('home.stats.fundsRaised')}</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Featured Causes */}
      <section className="section section-bg">
        <div className="container">
          <div className="section-title">
            <h2>{t('home.featuredCauses')}</h2>
            <p>{t('home.featuredCausesDesc')}</p>
          </div>
          <div className="featured-causes">
          <div className="grid grid-3">
            {featuredCauses.map((cause) => {
              const percentage = Math.floor((cause.raised / cause.goal) * 100);
              return (
                <Card
                  key={cause.id}
                  image={cause.image}
                  title={cause.title}
                  description={cause.description}
                  clickable
                  link={`/causes/${cause.id}`}
                >
                  <ProgressBar
                    percentage={percentage}
                    raised={cause.raised}
                    goal={cause.goal}
                  />
                  <div className="button-row">
                    <Link to="/donate" className="btn btn-primary" onClick={(e) => e.stopPropagation()}>{t('home.donateNow')}</Link>
                    <Link to={`/causes/${cause.id}`} className="btn btn-primary" onClick={(e) => e.stopPropagation()}>{t('home.readMore')}</Link>
                  </div>
                </Card>
              );
            })}
          </div>
          </div>
          <div className="text-center" style={{ marginTop: 'var(--spacing-2xl)' }}>
            <Link to="/causes" className="btn btn-outline">
              {t('home.viewAll')} <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>{t('home.upcomingEvents')}</h2>
            <p>{t('home.upcomingEventsDesc')}</p>
          </div>
          <div className="grid grid-3">
            {upcomingEvents.map((event) => (
              <Card
                key={event.id}
                image={event.image}
                title={event.title}
                description={event.description}
                clickable
                link={`/events/${event.id}`}
                linkText={t('home.readMore')}
                linkVariant="button"
                alwaysShowLink
              >
                <div className="event-meta">
                  <span className="event-date">{new Date(event.date).toLocaleDateString()}</span>
                  <span className="event-location">{event.location}</span>
                </div>
                <Link to={`/events/${event.id}`} className="btn btn-secondary" onClick={(e) => e.stopPropagation()}>{t('home.joinEvent')}</Link>
              </Card>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 'var(--spacing-2xl)' }}>
            <Link to="/events" className="btn btn-outline">
              {t('home.viewAll')} <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
       {/* <section className="section section-bg">
        <div className="container">
          <div className="section-title">
            <h2>{t('home.latestNews')}</h2>
            <p>{t('home.latestNewsDesc')}</p>
          </div>
          <div className="grid grid-3">
            {latestPosts.map((post) => (
              <Card key={post.id} image={post.image} title={post.title} description={post.excerpt}>
                <div className="blog-meta">
                  <span className="blog-author">{t('blog.by')} {post.author}</span>
                  <span className="blog-date">{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <Link to={`/blog/${post.id}`} className="btn btn-outline btn-sm">
                  {t('home.readMore')}
                </Link>
              </Card>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 'var(--spacing-2xl)' }}>
            <Link to="/blog" className="btn btn-outline">
              {t('home.viewAll')} <FaArrowRight style={{ marginLeft: '8px' }} />
            </Link>
          </div>
        </div>
      </section>  */}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>{t('home.ctaTitle')}</h2>
            <p>{t('home.ctaText')}</p>
            <div className="cta-buttons">
              <Link to="/donate" className="btn btn-primary btn-lg">
                {t('home.donateNow')}
              </Link>
              <Link to="/volunteer" className="btn btn-secondary btn-lg">
                {t('home.becomeVolunteer')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .home-hero {
          position: relative;
          min-height: 720px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-image: url('/images/hero-image.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          // margin-top: 80px;
        }

        .home-hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background:rgba(0, 0, 0, 0.37);
          opacity: 0.9;
        }

        .home-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: var(--color-white);
          max-width: 800px;
          margin: 0 auto;
          animation: fadeInUp 0.8s ease-out;
        }

        .home-hero-title {
          font-size: var(--font-size-6xl);
          font-weight: var(--font-weight-extrabold);
          color: var(--color-white);
          margin-top: 10rem;
          margin-bottom: var(--spacing-lg);
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .home-hero-subtitle {
          font-size: var(--font-size-xl);
          color: var(--color-white);
          margin-bottom: var(--spacing-2xl);
          line-height: 1.8;
        }

        .home-hero-buttons {
          display: flex;
          gap: var(--spacing-lg);
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-outline-hero {
          background: transparent;
          border: 2px solid var(--color-white);
          color: var(--color-white);
        }

        .btn-outline-hero:hover {
          background: var(--color-white);
          color: var(--color-primary);
        }

        .about-preview {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-3xl);
          align-items: center;
        }

        .about-preview-content h2 {
          color: var(--text-primary);
          margin-bottom: var(--spacing-lg);
        }

        .about-preview-content p {
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: var(--spacing-md);
        }

        .about-preview-image {
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-xl);
        }

        .about-preview-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .stats-section {
          padding: var(--spacing-4xl) 0;
          background: var(--gradient-primary);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--spacing-2xl);
        }

        .stat-item {
          text-align: center;
          color: var(--color-white);
        }

        .stat-icon {
          font-size: var(--font-size-5xl);
          margin-bottom: var(--spacing-md);
        }

        .stat-number {
          font-size: var(--font-size-4xl);
          font-weight: var(--font-weight-extrabold);
          color: var(--color-white);
          margin-bottom: var(--spacing-sm);
        }

        .stat-label {
          font-size: var(--font-size-lg);
          color: var(--color-white);
          opacity: 0.9;
        }

        .section-bg {
          background: var(--bg-secondary);
        }

        /* Clamp featured causes description to 3 lines */
        .featured-causes .card-text {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }

        .event-meta,
        .blog-meta {
          display: flex;
          justify-content: space-between;
          font-size: var(--font-size-sm);
          color: var(--text-light);
          margin-top: var(--spacing-md);
          margin-bottom: var(--spacing-md);
        }

        .button-row {
          display: flex;
          gap: var(--spacing-sm);
          margin-top: var(--spacing-md);
          flex-wrap: wrap;
        }

        .cta-section {
          padding: var(--spacing-4xl) 0;
          background: var(--gradient-secondary);
          text-align: center;
          margin-bottom: 10rem;
        }

        .cta-content h2 {
          font-size: var(--font-size-4xl);
          color: var(--color-white);
          margin-bottom: var(--spacing-md);
        }

        .cta-content p {
          font-size: var(--font-size-xl);
          color: var(--color-white);
          margin-bottom: var(--spacing-2xl);
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-buttons {
          display: flex;
          gap: var(--spacing-lg);
          justify-content: center;
          flex-wrap: wrap;
        }

        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .about-preview {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .home-hero-title {
            font-size: var(--font-size-4xl);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
