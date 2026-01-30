import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaHandHoldingHeart, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import Card from '../components/Card.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import Counter from '../components/Counter';
import QuoteCarousel from '../components/QuoteCarousel';
import AnimatedSection from '../components/AnimatedSection';
import { useTranslation } from '../i18n/useTranslation';
import { getLocalized, localeFromLang } from '../i18n/utils';
import { causes } from '../data/causes';
import { events } from '../data/events';
import { quotes } from '../data/quotes';
import { values } from '../data/values';

// Background Bubbles Component
const BackgroundBubbles = () => (
    <div className="bubbles-container">
      {[...Array(5)].map((_, i) => (
        <div key={i} className={`bubble bubble-${i + 1}`}></div>
      ))}
      <style>{`
        .bubbles-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }
        .bubble {
          position: absolute;
          background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
          border-radius: 50%;
          animation: float 20s infinite ease-in-out;
        }
        .bubble-1 { width: 120px; height: 120px; top: 10%; left: 10%; animation-duration: 25s; animation-delay: 0s; }
        .bubble-2 { width: 80px; height: 80px; top: 60%; left: 80%; animation-duration: 22s; animation-delay: -2s; }
        .bubble-3 { width: 150px; height: 150px; top: 40%; left: 40%; animation-duration: 28s; animation-delay: -5s; opacity: 0.08; }
        .bubble-4 { width: 60px; height: 60px; top: 80%; left: 20%; animation-duration: 18s; animation-delay: -8s; }
        .bubble-5 { width: 100px; height: 100px; top: 20%; left: 90%; animation-duration: 30s; animation-delay: -12s; }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(30px, -50px); }
          66% { transform: translate(-20px, 20px); }
        }
      `}</style>
    </div>
);


const Home = () => {
  const { t, language } = useTranslation();
  const featuredCauses = causes.slice(0, 3);
  const upcomingEvents = events.filter(e => e.status === 'upcoming').slice(0, 3);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [objectiveIndex, setObjectiveIndex] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const [valuesIndex, setValuesIndex] = useState(0);

  const heroImages = [
    '/images/hero1.jpeg',
    '/images/hero2.jpeg',
    '/images/hero3.jpeg',
    '/images/hero4.jpg',
    '/images/hero-image.jpg'
  ];

  const objectives = [
    {
      title: t('about.objectives.proximityTitle'),
      text: t('about.objectives.proximityText'),
      image: '/images/ong.jpg',
    },
    {
      title: t('about.objectives.healthcareTitle'),
      text: t('about.objectives.healthcareText'),
      image: '/images/medical.jpg',
    },
    {
      title: t('about.objectives.sustainableTitle'),
      text: t('about.objectives.sustainableText'),
      image: '/images/education1.jpg',
    },
  ];

  useEffect(() => {
    const id = window.setInterval(() => {
      setObjectiveIndex((i) => (i + 1) % objectives.length);
    }, 8000); // Slowed down to 8 seconds
    return () => window.clearInterval(id);
  }, [objectives.length]);

  useEffect(() => {
    const heroId = window.setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroImages.length);
    }, 6000); // Slow transition every 8 seconds
    return () => window.clearInterval(heroId);
  }, [heroImages.length]);

  useEffect(() => {
    const valuesId = window.setInterval(() => {
      setValuesIndex((i) => (i + 1) % values.length);
    }, 8000); // Slowed down to 8 seconds
    return () => window.clearInterval(valuesId);
  }, [values.length]);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubmitted(true);
    setNewsletterEmail('');
  };

  return (
    <div className="home">
      {/* Hero Section - UNCHANGED */}
      {/* Hero Section - Redesigned Split Layout */}
      <section className="about-slider-section">
        <div className="split-background-top">
           <BackgroundBubbles />
        </div>
        <div className="split-background-bottom"></div>
        
        <div className="container about-slider-container">
          <div className="about-slider-grid">
            {/* Text Side */}
            <div className="about-text-content">
              <h1 className="about-slide-title">
                {t('home.hero.line1')} <span className="highlight-text">{t('home.hero.highlight1')}</span><br />
                <span className="highlight-text">{t('home.hero.line2')}</span>{t('home.hero.line2suffix')}<br />
                {t('home.hero.line3')} <span className="highlight-text">{t('home.hero.highlight3')}</span>
              </h1>
            </div>

            {/* Image Side */}
            <div className="about-image-wrapper">
              {heroImages.map((img, index) => (
                <div 
                  key={index}
                  className={`home-hero-bg ${index === heroIndex ? 'active' : ''}`}
                  style={{ 
                    backgroundImage: `url(${img})`,
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                  }}
                />
              ))}
            </div>
          </div>

           {/* Scroll Down Indicator */}
           <div className="hero-scroll-btn-wrapper">
              <button 
                className="hero-scroll-btn"
                onClick={() => {
                  const nextSection = document.querySelector('.home-about');
                  if(nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="Découvrir plus"
              >
                <FaArrowLeft style={{ transform: 'rotate(-90deg)' }} />
              </button>
           </div>

          {/* Slider Controls - Positioned at bottom left of section */}
          <div className="slider-controls">
            <button 
              className="slider-btn" 
              onClick={() => setHeroIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
              aria-label="Previous Slide"
            >
              <FaArrowLeft />
            </button>
            <button 
              className="slider-btn" 
              onClick={() => setHeroIndex((prev) => (prev + 1) % heroImages.length)}
              aria-label="Next Slide"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* About Preview Section with Parallax */}
      <section className="section home-about">
        <div className="container">
          <div className="home-split">
            <AnimatedSection animation="slide-right" delay={0}>
              <div className="home-split-content">
                <p className="home-kicker">{t('home.learnMore')}</p>
                <h2>{t('home.welcome')}</h2>
                <p>{t('home.welcomeText1')}</p>
                <p>{t('home.welcomeText2')}</p>
                <div className="home-actions">
                  <Link to="/about" className="btn btn-primary">
                    {t('home.discoverStory')}
                  </Link>
                  <Link to="/contact" className="btn btn-outline">
                    {t('nav.contact')}
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-left" delay={150}>
              <div className="home-split-media">
                <img src="/images/bienvenue.jpg" alt="About us" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Objectives (AfricaSecours-like) */}
      <section className="section home-objectives">
        <div className="container">
          <AnimatedSection animation="fade-up" delay={0}>
            <div className="section-title">
              <h2>{t('about.objectivesTitle')}</h2>
            </div>
          </AnimatedSection>

          <div className="home-objectives-slider" aria-roledescription="carousel">
            <div
              className="home-objectives-track"
              style={{ transform: `translateX(-${objectiveIndex * 100}%)` }}
            >
              {objectives.map((o, idx) => (
                <div className="home-objective-slide" key={idx} aria-hidden={idx !== objectiveIndex}>
                  <div className="value-image">
                    <img src={o.image} alt={o.title} loading="lazy" />
                    <div className="value-overlay"></div>
                  </div>
                  <div className="value-content">
                    <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>{o.title}</h3>
                    <p className="value-quote" style={{ fontStyle: 'normal', fontSize: '1.2rem' }}>{o.text}</p>
                    <Link to="/contact" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                      Je veux participer <FaArrowRight style={{ marginLeft: '8px' }} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="home-objectives-dots" role="tablist" aria-label="Objectifs">
              {objectives.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={idx === objectiveIndex ? 'home-dot active' : 'home-dot'}
                  onClick={() => setObjectiveIndex(idx)}
                  aria-label={`Objectif ${idx + 1}`}
                  aria-pressed={idx === objectiveIndex}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="home-stats">
        <div className="container">
          <div className="home-stats-grid">
            <AnimatedSection animation="fade-up" delay={0}>
              <div className="home-stat">
                <div className="home-stat-icon">
                  <FaHeart />
                </div>
                <div className="home-stat-value">
                  <Counter end={80} suffix="+" />
                </div>
                <div className="home-stat-label">{t('home.stats.livesChanged')}</div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={100}>
              <div className="home-stat">
                <div className="home-stat-icon">
                  <FaHandHoldingHeart />
                </div>
                <div className="home-stat-value">
                  <Counter end={10} suffix="+" />
                </div>
                <div className="home-stat-label">{t('home.stats.projects')}</div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="home-stat">
                <div className="home-stat-icon">
                  <FaHeart />
                </div>
                <div className="home-stat-value">
                  $<Counter end={130} suffix="K+" />
                </div>
                <div className="home-stat-label">{t('home.stats.fundsRaised')}</div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section - Redesigned */}
      <section className="section home-values">
        <div className="container">
          <AnimatedSection animation="fade-up" delay={0}>
            <div className="section-title">
              <h2>{t('about.values') || "Nos Valeurs"}</h2>
              <p>Ce qui guide chacune de nos actions au quotidien.</p>
            </div>
          </AnimatedSection>

          <div className="home-objectives-slider" aria-roledescription="carousel">
            <div
              className="home-objectives-track"
              style={{ transform: `translateX(-${valuesIndex * 100}%)` }}
            >
              {values.map((value, index) => (
                <div className="home-objective-slide" key={value.id} aria-hidden={index !== valuesIndex}>
                  <div className="value-card slider-card">
                    <div className="value-image">
                      <img src={value.image} alt={value.author} />
                      <div className="value-overlay"></div>
                    </div>
                    <div className="value-content">
                      <div className="quote-icon">❝</div>
                      <p className="value-quote">{value.quote}</p>
                      <h4 className="value-author">{value.author}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="home-objectives-dots" role="tablist" aria-label="Valeurs">
              {values.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={idx === valuesIndex ? 'home-dot active' : 'home-dot'}
                  onClick={() => setValuesIndex(idx)}
                  aria-label={`Valeur ${idx + 1}`}
                  aria-pressed={idx === valuesIndex}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Carousel Section - REMOVED or KEPT based on preference, keeping for now but Values is new */}
      {/* <section className="section home-quotes"> ... </section> */}

      {/* Featured Causes with 3D Cards */}
      <section className="section section-bg causes-section-enhanced">
        <div className="container">
          <AnimatedSection animation="fade-up" delay={0}>
            <div className="section-title">
              <h2>{t('home.featuredCauses')}</h2>
              <p>{t('home.featuredCausesDesc')}</p>
            </div>
          </AnimatedSection>
          
          <div className="featured-causes">
            <div className="grid grid-3">
              {featuredCauses.map((cause, index) => {
                const percentage = Math.floor((cause.raised / cause.goal) * 100);
                return (
                  <AnimatedSection 
                    key={cause.id}
                    animation="fade-up" 
                    delay={index * 150}
                  >
                    <div className="card-3d-wrapper">
                      <Card
                        image={cause.image}
                        images={cause.images}
                        title={getLocalized(cause.title, language)}
                        description={getLocalized(cause.description, language)}
                        clickable
                        link={`/causes/${cause.id}`}
                      >
                        <ProgressBar
                          percentage={percentage}
                          raised={cause.raised}
                          goal={cause.goal}
                        />
                        <div className="button-row featured-causes-btns">
                          <Link to="/donate" className="btn btn-primary btn-sm" onClick={(e) => e.stopPropagation()}>{t('home.donateNow')}</Link>
                          <Link to={`/causes/${cause.id}`} className="btn btn-primary btn-sm" onClick={(e) => e.stopPropagation()}>{t('home.readMore')}</Link>
                        </div>
                      </Card>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
          
          <AnimatedSection animation="fade-up" delay={0}>
            <div className="text-center" style={{ marginTop: 'var(--spacing-2xl)' }}>
              <Link to="/causes" className="btn btn-outline">
                {t('home.viewAll')} <FaArrowRight />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Upcoming Events with Staggered Animation */}
      <section className="section events-section-enhanced">
        <div className="container">
          <AnimatedSection animation="fade-up" delay={0}>
            <div className="section-title">
              <h2>{t('home.upcomingEvents')}</h2>
              <p>{t('home.upcomingEventsDesc')}</p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-3">
            {upcomingEvents.map((event, index) => (
              <AnimatedSection 
                key={event.id}
                animation={index % 2 === 0 ? "slide-right" : "slide-left"}
                delay={index * 100}
              >
                <div className="event-card-wrapper">
                  <Card
                    image={event.image}
                    title={getLocalized(event.title, language)}
                    description={getLocalized(event.description, language)}
                    clickable
                    link={`/events/${event.id}`}
                  >
                    <div className="event-meta">
                      <span className="event-date">{new Date(event.date).toLocaleDateString(localeFromLang(language))}</span>
                      <span className="event-location">{getLocalized(event.location, language)}</span>
                    </div>
                    <div className="button-row event-buttons">
                      <Link to={`/events/${event.id}`} className="btn btn-primary btn-sm" onClick={(e) => e.stopPropagation()}>{t('home.readMore')}</Link>
                      <Link to={`/events/${event.id}`} className="btn btn-secondary btn-sm" onClick={(e) => e.stopPropagation()}>{t('home.joinEvent')}</Link>
                    </div>
                  </Card>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
          <AnimatedSection animation="fade-up" delay={0}>
            <div className="text-center" style={{ marginTop: 'var(--spacing-2xl)' }}>
              <Link to="/events" className="btn btn-outline">
                {t('home.viewAll')} <FaArrowRight />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission / Support */}
      <section className="section home-mission">
        <div className="container">
          <div className="home-split home-split-reverse">
            <AnimatedSection animation="slide-right" delay={0}>
              <div className="home-split-content">
                <p className="home-kicker">{t('about.mission')}</p>
                <h2>{t('about.mission')}</h2>
                <p>{t('about.missionText')}</p>
                <div className="home-actions">
                  <Link to="/donate" className="btn btn-primary">
                    {t('home.donateNow')}
                  </Link>
                  <Link to="/volunteer" className="btn btn-outline">
                    {t('home.becomeVolunteer')}
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-left" delay={150}>
              <div className="home-mission-card">
                <h3>Soutenez notre cause</h3>
                <p>{t('home.ctaText')}</p>
                <div className="home-mission-ctas">
                  <Link to="/donate" className="btn btn-secondary">
                    {t('home.donateNow')}
                  </Link>
                  <Link to="/contact" className="btn btn-outline">
                    {t('nav.contact')}
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section home-newsletter">
        <div className="container">
          <div className="home-newsletter-inner">
            <div>
              <h2>{t('footer.newsletter')}</h2>
              <p>{t('footer.newsletterText')}</p>
            </div>
            <form className="home-newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => {
                  setNewsletterSubmitted(false);
                  setNewsletterEmail(e.target.value);
                }}
                placeholder={t('footer.emailPlaceholder')}
                required
              />
              <button className="btn btn-primary" type="submit">
                {t('footer.subscribe')}
              </button>
            </form>
            {newsletterSubmitted && (
              <p className="home-newsletter-success">{t('footer.newsletterThanks')}</p>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section with Animated Gradient */}
      <section className="cta-section-enhanced">
        <div className="container">
          <AnimatedSection animation="zoom-in" delay={0}>
            <div className="cta-content">
              <h2>{t('home.ctaTitle')}</h2>
              <p>{t('home.ctaText')}</p>
              <div className="cta-buttons">
                <Link to="/donate" className="btn btn-primary btn-lg pulse-btn">
                  {t('home.donateNow')}
                </Link>
                <Link to="/volunteer" className="btn btn-secondary btn-lg pulse-btn">
                  {t('home.becomeVolunteer')}
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <style>{`
        /* About Slider Design */
        .about-slider-section {
          position: relative;
          width: 100%;
          min-height: 700px;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding-bottom: 0;
        }

        .split-background-top {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 75%;
          background-color: #33312e; /* Dark brown/black from reference */
          z-index: 0;
        }

        .split-background-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 25%;
          background-color: #c5ddc95b; /* Creamy white */
          z-index: 0;
        }

        .about-slider-container {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
        }

        .about-slider-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.3fr;
          gap: var(--spacing-3xl);
          align-items: center;
          padding: var(--spacing-3xl) 0;
        }

        .about-text-content {
          color: var(--color-white);
          /* Padding mainly to align slightly right */
          padding-right: var(--spacing-xl);
        }

        .about-slide-title {
          font-family: var(--font-primary);
          font-size: 3.1rem; /* Large text */
          font-weight: 300; /* Thin by default */
          line-height: 1.2;
          color: var(--color-white);
          /* margin-bottom: var(--spacing-3xl); */
          margin-bottom: var(--spacing-3xl);
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .highlight-text {
          font-weight: 800; /* Bold for specific words */
        }

        .about-image-wrapper {
          position: relative;
          height: 650px;
          width: 110%;
          margin-top: -60px;
          margin-left: -5%;
          z-index: 2;
        }

        .about-slide-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: var(--radius-sm);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .slider-controls {
          position: absolute;
          bottom: 10%;
          left: clamp(16px, 5vw, 56px);
          display: flex;
          gap: var(--spacing-md);
          z-index: 100;
        }

        .slider-btn {
          width: 50px;
          height: 50px;
          background-color: #2b8238; /* Beige color from reference */
          border: 2px solid transparent;
          border-radius: 10%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s ease;
          color: #fbf7f7ff;
          z-index: 100;
        }

        .slider-btn:hover {
          background-color: #f9f9f8ff;
          border: 2px solid #2b8238;
          color: #2b8238;
        }

        .slider-btn:focus-visible {
          outline: 3px solid rgba(43, 130, 56, 0.45);
          outline-offset: 2px;
        }

        /* Hero Section - UNCHANGED */
        .home-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .home-hero-bg-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .home-hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          margin-top: 195px;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 2s cubic-bezier(0.4, 0, 0.2, 1), transform 8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform: scale(1.15); /* Start zoomed in slightly more */
          will-change: opacity, transform;
          z-index: 0;
        }
        
        .home-hero-bg.active {
          opacity: 1;
          transform: scale(1); /* Zoom out slowly */
          z-index: 1;
        }

        .home-hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0);
          opacity: 0.6;
          z-index: 2;
        }

        .home-hero-content {
          position: relative;
          z-index: 3;
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
          margin-top: 18rem;
          margin-bottom: var(--spacing-lg);
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .home-hero-subtitle {
          font-size: var(--font-size-xl);
          color: var(--color-white);
          margin-bottom: var(--spacing-2xl);
          line-height: 1.8;
          text-align: center;
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

        @media (max-width: 900px) {
           .about-slider-grid {
             grid-template-columns: 1fr;
             gap: var(--spacing-xl);
           }
           .about-slide-title {
             font-size: 2.5rem;
           }
           .split-background-top {
             height: 100%;
           }
           .split-background-bottom {
             display: none;
           }
           .about-text-content {
             padding-right: 0;
             text-align: center;
           }
           .slider-controls {
             left: 50%;
             transform: translateX(-50%);
             justify-content: center;
             bottom: 5%;
           }
           .about-image-wrapper {
             height: 400px;
             width: 100%;
             margin-top: 0;
             margin-left: 0;
             overflow: hidden;
           }
           .about-slider-section {
             min-height: auto;
             padding: var(--spacing-2xl) 0;
           }
        }

        @media (max-width: 600px) {
          .about-slide-title {
            font-size: 1.8rem;
            line-height: 1.2;
          }
          .slider-btn {
            width: 40px;
            height: 40px;
          }
          .about-image-wrapper {
            height: 55vh; /* Increased from 300px for better immersion */
            min-height: 400px;
          }
           .about-slider-section {
            padding-bottom: 80px; /* Space for controls */
          }
        }


        /* Enhanced About Section */
        .home-about {
          background: var(--bg-primary);
        }

        .home-split {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: var(--spacing-3xl);
          align-items: center;
        }

        .home-split-reverse {
          grid-template-columns: 0.85fr 1.15fr;
        }

        .home-kicker {
          color: var(--color-primary);
          font-weight: var(--font-weight-semibold);
          letter-spacing: 0.03em;
          text-transform: uppercase;
          margin-bottom: var(--spacing-sm);
        }

        .home-split-content h2 {
          margin-bottom: var(--spacing-lg);
        }

        .home-split-content p {
          line-height: 1.8;
        }

        .home-actions {
          display: flex;
          gap: var(--spacing-md);
          flex-wrap: wrap;
          margin-top: var(--spacing-xl);
        }

        .home-split-media {
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-xl);
        }

        .home-split-media img {
          width: 100%;
          height: 420px;
          object-fit: cover;
        }

        .home-objectives {
          background: var(--bg-secondary);
        }

        .home-objectives-slider {
          margin-top: var(--spacing-xl);
          background: var(--color-white);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          border: 1px solid var(--color-gray-200);
          overflow: hidden;
        }

        .home-objectives-track {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: 100%;
          transition: transform 550ms ease;
          will-change: transform;
        }

        .home-objective-slide {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          align-items: stretch;
          min-height: 340px;
        }

        .home-objective-image {
          position: relative;
          overflow: hidden;
          background: var(--bg-secondary);
        }

        .home-objective-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.02);
        }

        .home-objective-content {
          padding: var(--spacing-2xl);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .home-objective-content h3 {
          font-size: var(--font-size-2xl);
        }

        .home-objective-content p {
          margin-bottom: var(--spacing-lg);
        }

        .home-objectives-dots {
          display: flex;
          justify-content: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-md);
          background: var(--bg-secondary);
          border-top: 1px solid var(--color-gray-200);
        }

        .home-dot {
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          background: var(--color-gray-300);
          border: none;
        }

        .home-dot.active {
          background: var(--color-primary);
          width: 26px;
          transition: width 250ms ease;
        }

        .home-link {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--color-primary);
        }

        .home-link:hover {
          color: var(--color-primary-dark);
        }

        .home-stats {
          padding: var(--spacing-3xl) 0;
          background: var(--color-white);
          border-top: 1px solid var(--color-gray-200);
          border-bottom: 1px solid var(--color-gray-200);
        }

        .home-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-xl);
        }

        .home-stat {
          text-align: center;
          padding: var(--spacing-xl);
          border-radius: var(--radius-lg);
          background: var(--bg-secondary);
          box-shadow: var(--shadow-sm);
        }

        .home-stat-icon {
          width: 54px;
          height: 54px;
          border-radius: 9999px;
          margin: 0 auto var(--spacing-md);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--gradient-primary);
          color: var(--color-white);
          font-size: 1.25rem;
        }

        .home-stat-value {
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-extrabold);
          color: var(--text-primary);
        }

        .home-stat-label {
          color: var(--text-secondary);
          margin-top: var(--spacing-xs);
          font-weight: var(--font-weight-medium);
        }

        .home-quotes {
          background: var(--bg-primary);
          padding-top: var(--spacing-xl);
          padding-bottom: var(--spacing-xl);
        }

        .home-quotes .section-title {
          margin-bottom: var(--spacing-lg);
        }

        .home-mission {
          background: var(--bg-secondary);
        }

        .home-mission-card {
          background: var(--color-white);
          border-radius: var(--radius-lg);
          padding: var(--spacing-2xl);
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--color-gray-200);
        }

        .home-mission-ctas {
          display: flex;
          gap: var(--spacing-md);
          flex-wrap: wrap;
          margin-top: var(--spacing-lg);
        }

        .home-newsletter {
          background: var(--color-white);
        }

        .home-newsletter-inner {
          border-radius: var(--radius-lg);
          padding: var(--spacing-2xl);
          background: var(--bg-secondary);
          border: 1px solid var(--color-gray-200);
        }

        .home-newsletter-form {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: var(--spacing-md);
          margin-top: var(--spacing-lg);
        }

        .home-newsletter-form input {
          width: 100%;
          padding: 14px 16px;
          border-radius: var(--radius-md);
          border: 2px solid var(--color-gray-300);
          background: var(--color-white);
        }

        .home-newsletter-form input:focus {
          border-color: var(--color-primary);
        }

        .home-newsletter-success {
          margin-top: var(--spacing-md);
          color: var(--color-primary);
          font-weight: var(--font-weight-semibold);
        }

        /* Enhanced Causes Section */
        .causes-section-enhanced {
          position: relative;
        }

        .card-3d-wrapper {
          perspective: 1000px;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-3d-wrapper:hover {
          transform: translateY(-15px);
        }

        .card-3d-wrapper .card {
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .card-3d-wrapper:hover .card {
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
          transform: rotateX(5deg) rotateY(5deg);
        }

        /* Enhanced Events Section */
        .events-section-enhanced {
          position: relative;
          overflow: hidden;
        }

        .event-card-wrapper {
          transition: transform 0.4s ease;
        }

        .event-card-wrapper:hover {
          transform: translateY(-10px) scale(1.02);
        }

        /* Enhanced CTA Section */
        .cta-section-enhanced {
          position: relative;
          padding: var(--spacing-4xl) 0;
          background: var(--color-primary);
        
          text-align: center;
          margin-bottom: 0;
          overflow: hidden;
        }

        .cta-content h2 {
          font-size: var(--font-size-4xl);
          color: var(--color-white);
          margin-bottom: var(--spacing-md);
          position: relative;
          z-index: 1;
        }

        .cta-content p {
          font-size: var(--font-size-xl);
          color: var(--color-white);
          margin-bottom: var(--spacing-2xl);
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          z-index: 1;
        }

        .cta-buttons {
          display: flex;
          gap: var(--spacing-lg);
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .pulse-btn {
          animation: buttonPulse 2s infinite;
        }

        .pulse-btn:hover {
          animation: none;
          transform: scale(1.05);
        }

        @keyframes buttonPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
          }
          50% {
            box-shadow: 0 0 0 15px rgba(255, 255, 255, 0);
          }
        }

        .section-bg {
          background: var(--bg-secondary);
        }

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

        /* Responsive Design */
        @media (max-width: 1024px) {
          .home-hero {
            background-attachment: scroll;
          }

          .home-hero-title {
            margin-top: 10rem;
          }

          .home-objective-slide {
            grid-template-columns: 1fr;
          }

          .home-objective-slide {
            min-height: auto;
          }

          .home-objective-image {
            height: 260px;
          }

          .home-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--spacing-lg);
          }

          .home-split {
            gap: var(--spacing-xl);
          }
          .cta-section-enhanced {
            margin-bottom: 0;
          }

          .event-meta,
          .blog-meta {
            flex-wrap: wrap;
            gap: var(--spacing-sm);
          }
        }

        @media (max-width: 768px) {
          .home-split,
          .home-split-reverse {
            grid-template-columns: 1fr;
          }

          .home-split-media img {
            height: 320px;
          }

          .home-newsletter-form {
            grid-template-columns: 1fr;
          }

          .home-hero-title {
            font-size: var(--font-size-4xl);
            margin-top: 2rem;
          }

          .home-hero-content {
            padding-top: 140px; /* Account for 130px header height */
          }
          .home-hero-subtitle {
            font-size: var(--font-size-lg);
            margin-bottom: var(--spacing-xl);
          }

          .home-stats-grid {
            grid-template-columns: 1fr;
          }

          .home-stat {
            padding: var(--spacing-lg);
          }

          .home-objective-content {
            padding: var(--spacing-lg);
          }

          .cta-section-enhanced {
            padding: var(--spacing-3xl) 0;
            margin-bottom: 0;
          }

          .cta-content h2 {
            font-size: var(--font-size-3xl);
          }

          .cta-content p {
            font-size: var(--font-size-lg);
          }
        }

        @media (max-width: 480px) {

        .about-text-content {
        margin-top: 4rem;
        }
          .home-hero-title {
            margin-top: 9rem;
          }
          .home-hero-bg {
          margin-top: 2rem;
          }

          .home-hero-content {
            padding-top: 140px;
          }
          .home-objective-image {
            height: 220px;
          }

          .cta-section-enhanced {
            padding: var(--spacing-2xl) 0;
            margin-bottom: 0;
          }
        }

        /* prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .card-3d-wrapper:hover .card,
          .pulse-btn {
            animation: none;
          }
        }
        /* Scroll Button Styles */
        .hero-scroll-btn-wrapper {
            position: absolute;
            left: clamp(20px, 8vw, 120px); 
            bottom: 30px; 
            z-index: 10;
        }

        /* Adjust position to be distinct from slider controls */
        @media (min-width: 901px) {
           .hero-scroll-btn-wrapper {
              left: 50%;
              transform: translateX(-50%);
              bottom: 40px;
           }
        }
        
        .hero-scroll-btn {
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.3);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(255,255,255,0.9);
            cursor: pointer;
            transition: all 0.3s;
            backdrop-filter: blur(5px);
            animation: bounce 2s infinite;
        }
        
        .hero-scroll-btn:hover {
            border-color: var(--color-white);
            color: var(--color-white);
            background: var(--color-primary);
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }

        @media (max-width: 900px) {
           .hero-scroll-btn-wrapper {
              display: none; 
           }
        }
        .home-values {
          background-color: var(--bg-secondary);
        }

        /* Values Slider - Split Layout Design */
        .home-values {
          background-color: var(--bg-secondary);
          padding: var(--spacing-4xl) 0;
        }

        .home-objectives-slider {
          position: relative;
          width: 100%;
          max-width: 1200px; /* Increased from 1000px */
          margin: 0 auto;
          overflow: hidden;
          background: var(--color-white);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-xl);
        }

        .home-objectives-track {
          display: flex;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          height: 600px; /* Increased from 500px */
        }

        .home-objective-slide {
          min-width: 100%;
          height: 100%;
          display: flex; /* Split layout */
        }

        .slider-card {
          display: flex;
          width: 100%;
          height: 100%;
          margin: 0;
          max-width: none;
          flex-direction: row; /* Side by side */
        }

        .value-image {
          flex: 1;
          position: relative;
          height: 100%;
          overflow: hidden;
        }

        .value-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 6s ease; /* Slow zoom effect */
        }

        .home-objective-slide[aria-hidden="false"] .value-image img {
          transform: scale(1.1);
        }

        .value-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.2); /* Slight darken */
        }

        .value-content {
          flex: 1;
          padding: var(--spacing-3xl);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          background: var(--color-white);
          position: relative;
        }

        .quote-icon {
          font-size: 4rem;
          color: var(--color-primary);
          opacity: 0.2;
          line-height: 1;
          margin-bottom: var(--spacing-lg);
        }

        .value-quote {
          font-family: var(--font-secondary); /* Use serif if available or just secondary */
          font-style: italic;
          color: var(--text-primary);
          margin-bottom: var(--spacing-xl);
          font-size: 1.5rem;
          line-height: 1.6;
        }

        .value-author {
          font-size: 1.1rem;
          font-weight: var(--font-weight-bold);
          color: var(--color-primary);
          text-transform: uppercase;
          letter-spacing: 2px;
          position: relative;
          padding-top: var(--spacing-md);
        }

        .value-author::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 3px;
          background: var(--color-gray-300);
        }

        /* Dots Navigation */
        .home-objectives-dots {
          position: absolute;
          bottom: var(--spacing-lg);
          right: var(--spacing-lg); /* Position bottom-right of the whole card or just content side */
          display: flex;
          gap: var(--spacing-sm);
          z-index: 10;
        }

        /* Responsive Design for Slider */
        @media (max-width: 768px) {
          .home-objectives-track {
            height: auto;
          }
          
          .slider-card {
            flex-direction: column;
          }

          .value-image {
            height: 250px;
            flex: none;
          }

          .value-content {
            padding: var(--spacing-xl) var(--spacing-lg);
          }

          .value-quote {
            font-size: 1.2rem;
          }
          
          .home-objectives-dots {
             right: 50%;
             transform: translateX(50%);
             bottom: var(--spacing-md);
          }
        }

        /* Featured Causes Buttons */
        .featured-causes-btns, .event-buttons {
          display: flex;
          gap: var(--spacing-md);
          margin-top: var(--spacing-md);
        }

        .featured-causes-btns .btn, .event-buttons .btn {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.5rem 1rem; /* Smaller padding */
          font-size: 0.9rem; /* Smaller font */
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Home;
