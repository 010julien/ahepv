import Hero from '../components/Hero';
import { teamMembers } from '../data/team';
import { useTranslation } from '../i18n/useTranslation';
import { FaEye, FaBullseye, FaHeart, FaUsers, FaHandshake, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="about">
      <Hero 
        title={t('about.title')} 
        subtitle={t('about.subtitle')}
        breadcrumb={t('about.breadcrumb')}
        backgroundImage="/images/hero-about.jpg"
        
      />

      {/* Our Story */}
      <section className="section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>{t('about.ourStory')}</h2>
              <p>
                {t('about.storyText1')}
              </p>
              <p>
                {t('about.storyText2')}
              </p>
            </div>
            <div className="story-image">
              <img src="/images/story.jpg" alt="Our Story" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section section-bg">
        <div className="container">
          <div className="mission-vision">
            <div className="mv-card">
              <FaBullseye className="mv-icon" />
              <h3>{t('about.mission')}</h3>
              <p>
                {t('about.missionText')}
              </p>
            </div>
            <div className="mv-card">
              <FaEye className="mv-icon" />
              <h3>{t('about.vision')}</h3>
              <p>
                {t('about.visionText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>{t('about.values')}</h2>
            <p>{t('about.valuesDesc')}</p>
          </div>
          <div className="values-grid">
            <div className="value-item">
              <FaHeart className="value-icon" />
              <h4>{t('about.compassion')}</h4>
              <p>{t('about.compassionText')}</p>
            </div>
            <div className="value-item">
              <FaUsers className="value-icon" />
              <h4>{t('about.community')}</h4>
              <p>{t('about.communityText')}</p>
            </div>
            <div className="value-item">
              <FaHandshake className="value-icon" />
              <h4>{t('about.integrity')}</h4>
              <p>{t('about.integrityText')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="section section-bg">
        <div className="container">
          <div className="section-title">
            <h2>{t('about.team')}</h2>
            <p>{t('about.teamDesc')}</p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                  <div className="team-overlay">
                    <div className="team-social">
                      <a href={member.social.facebook} aria-label="Facebook"><FaFacebookF /></a>
                      <a href={member.social.twitter} aria-label="Twitter"><FaTwitter /></a>
                      <a href={member.social.linkedin} aria-label="LinkedIn"><FaLinkedinIn /></a>
                    </div>
                  </div>
                </div>
                <div className="team-info">
                  <h4>{member.name}</h4>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .story-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-3xl);
          align-items: center;
        }

        .story-text h2 {
          margin-bottom: var(--spacing-lg);
        }

        .story-text p {
          margin-bottom: var(--spacing-md);
          line-height: 1.8;
        }

        .story-image {
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-xl);
        }

        .story-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .mission-vision {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-3xl);
        }

        .mv-card {
          background: var(--color-white);
          padding: var(--spacing-3xl);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          text-align: center;
        }

        .mv-icon {
          font-size: var(--font-size-5xl);
          color: var(--color-primary);
          margin-bottom: var(--spacing-lg);
        }

        .mv-card h3 {
          margin-bottom: var(--spacing-md);
        }

        .mv-card p {
          line-height: 1.8;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-2xl);
        }

        .value-item {
          text-align: center;
          padding: var(--spacing-2xl);
          background: var(--color-white);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          transition: all var(--transition-base);
        }

        .value-item:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-xl);
        }

        .value-icon {
          font-size: var(--font-size-4xl);
          color: var(--color-primary);
          margin-bottom: var(--spacing-md);
        }

        .value-item h4 {
          margin-bottom: var(--spacing-sm);
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-xl);
        }

        .team-card {
          background: var(--color-white);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          transition: all var(--transition-base);
        }

        .team-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-xl);
        }

        .team-image {
          position: relative;
          height: 300px;
          overflow: hidden;
        }

        .team-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-slow);
        }

        .team-card:hover .team-image img {
          transform: scale(1.1);
        }

        .team-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--gradient-overlay);
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity var(--transition-base);
        }

        .team-card:hover .team-overlay {
          opacity: 1;
        }

        .team-social {
          display: flex;
          gap: var(--spacing-md);
        }

        .team-social a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          background: var(--color-white);
          color: var(--color-primary);
          transition: all var(--transition-base);
        }

        .team-social a:hover {
          background: var(--color-primary);
          color: var(--color-white);
          transform: translateY(-3px);
        }

        .team-info {
          padding: var(--spacing-lg);
        }

        .team-info h4 {
          margin-bottom: var(--spacing-xs);
        }

        .team-role {
          color: var(--color-primary);
          font-weight: var(--font-weight-semibold);
          margin-bottom: var(--spacing-sm);
        }

        .team-bio {
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
        }

        .section-bg {
          background: var(--bg-secondary);
        }

        @media (max-width: 1024px) {
          .team-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .story-content,
          .mission-vision {
            grid-template-columns: 1fr;
          }

          .values-grid,
          .team-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
