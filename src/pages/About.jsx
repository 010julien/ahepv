import Hero from '../components/Hero';
import { teamMembers } from '../data/team';
import { useTranslation } from '../i18n/useTranslation';
import { FaEye, FaBullseye, FaHeart, FaUsers, FaHandshake, FaMapMarkerAlt, FaStethoscope, FaLeaf } from 'react-icons/fa';
import SocialLink from '../components/SocialLink';

const About = () => {
  const { t, language } = useTranslation();
  const founder = teamMembers[0];
  const otherMembers = teamMembers.slice(1);
  return (
    <div className="about">
      <Hero 
        title={t('about.title')} 
        subtitle={t('about.subtitle')}
        breadcrumb={t('about.breadcrumb')}
        backgroundImage="/images/apropos.jpg"
        
      />
      
      {/* Intro + Highlights */}
      <section className="section">
        <div className="container">
          <div className="intro-header">
            <h2>{t('about.introTitle')}</h2>
            <p className="intro-subtitle">{t('about.introSubtitle')}</p>
            <p>{t('about.introText')}</p>
          </div>

          <div className="values-grid">
            <div className="value-item">
              <FaMapMarkerAlt className="value-icon" />
              <h4>{t('about.highlights.presenceTitle')}</h4>
              <p>{t('about.highlights.presenceText')}</p>
            </div>
            <div className="value-item">
              <FaStethoscope className="value-icon" />
              <h4>{t('about.highlights.focusTitle')}</h4>
              <p>{t('about.highlights.focusText')}</p>
            </div>
            <div className="value-item">
              <FaHandshake className="value-icon" />
              <h4>{t('about.highlights.collabTitle')}</h4>
              <p>{t('about.highlights.collabText')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ONG Presentation */}
      <section className="section">
        <div className="container about-ong-grid">
          <div className="about-ong-media">
            <img src="images/ong.jpg" alt="ONG-Association Humanitaire Plus Proche de vous (AH2PV)" />
          </div>

          <div className="about-block">
            <h2>{t('about.ong.title')}</h2>
            <p>{t('about.ong.p1')}</p>
            <p>{t('about.ong.p2')}</p>
            <p>{t('about.ong.p3')}</p>
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

          {founder && (
            <div className="founder-feature">
              <div className="founder-photo">
                <img src={founder.image} alt={founder.name} loading="lazy" />
              </div>
              <div className="founder-content">
                <h3 className="founder-name">{founder.name}</h3>
                <p className="founder-role">
                  {(founder.role && typeof founder.role === 'object')
                    ? (founder.role[language] || founder.role.fr || founder.role.en || founder.role.de)
                    : founder.role}
                </p>
                <p className="founder-bio">
                  {(founder.bio && typeof founder.bio === 'object')
                    ? (founder.bio[language] || founder.bio.fr || founder.bio.en || founder.bio.de)
                    : founder.bio}
                </p>
                <div className="founder-social">
                  <SocialLink platform="facebook" url={founder.social.facebook} />
                  <SocialLink platform="twitter" url={founder.social.twitter} />
                  <SocialLink platform="linkedin" url={founder.social.linkedin} />
                </div>
              </div>
            </div>
          )}

          <div className="team-grid">
            {otherMembers.map((member) => (
              <div key={member.id} className="team-card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                  <div className="team-overlay">
                    <div className="team-social">
                      <SocialLink platform="facebook" url={member.social.facebook} />
                      <SocialLink platform="twitter" url={member.social.twitter} />
                      <SocialLink platform="linkedin" url={member.social.linkedin} />
                    </div>
                  </div>
                </div>
                <div className="team-info">
                  <h4>{member.name}</h4>
                  <p className="team-role">{(member.role && typeof member.role === 'object') ? (member.role[language] || member.role.fr || member.role.en || member.role.de) : member.role}</p>
                  <p className="team-bio">{(member.bio && typeof member.bio === 'object') ? (member.bio[language] || member.bio.fr || member.bio.en || member.bio.de) : member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap: Vision, Mission & Objectives */}
      <section className="section section-bg">
        <div className="container">
          <div className="section-title">
            <h2>{t('about.roadmapTitle')}</h2>
          </div>
          <div className="mission-vision">
            <div className="mv-card">
              <FaEye className="mv-icon" />
              <h3>{t('about.vision')}</h3>
              <p>{t('about.visionText')}</p>
            </div>
            <div className="mv-card">
              <FaBullseye className="mv-icon" />
              <h3>{t('about.mission')}</h3>
              <p>{t('about.missionText')}</p>
            </div>
          </div>

          <div className="objectives">
            <h3 className="objectives-title">{t('about.objectivesTitle')}</h3>
            <div className="values-grid">
              <div className="value-item">
                <FaMapMarkerAlt className="value-icon" />
                <h4>{t('about.objectives.proximityTitle')}</h4>
                <p>{t('about.objectives.proximityText')}</p>
              </div>
              <div className="value-item">
                <FaStethoscope className="value-icon" />
                <h4>{t('about.objectives.healthcareTitle')}</h4>
                <p>{t('about.objectives.healthcareText')}</p>
              </div>
              <div className="value-item">
                <FaLeaf className="value-icon" />
                <h4>{t('about.objectives.sustainableTitle')}</h4>
                <p>{t('about.objectives.sustainableText')}</p>
              </div>
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

      {/* Callout */}
      <section className="section">
        <div className="container">
          <div className="callout">
            <h3>{t('about.calloutTitle')}</h3>
            <p>{t('about.calloutText')}</p>
          </div>
        </div>
      </section>

      

      

      {/* Discover Togo */}
      <section className="section section-bg">
        <div className="container">
          <div className="togo-grid">
            <div className="togo-image">
              <img src="/images/CarteTogo.jpg" alt="Carte du Togo" loading="lazy" />
            </div>
            <div className="togo-content">
              <h2 className="togo-title">{t('about.togo.title')}</h2>
              <p className="togo-subtitle">{t('about.togo.subtitle')}</p>
              <p>{t('about.togo.p1')}</p>
              <p>{t('about.togo.p2')}</p>
            </div>
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

        /* New blocks */
        .intro-header {
          max-width: 900px;
          margin: 0 auto var(--spacing-3xl);
          text-align: center;
        }

        .intro-subtitle {
          color: var(--color-primary);
          font-weight: var(--font-weight-semibold);
          margin-bottom: var(--spacing-sm);
        }

        .objectives-title {
          margin: var(--spacing-2xl) 0 var(--spacing-lg);
          text-align: center;
          color: var(--color-primary);
        }

        .about-block {
          background: var(--color-white);
          padding: var(--spacing-2xl);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
        }

        .about-ong-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: var(--spacing-3xl);
          align-items: stretch;
        }

        .about-ong-media {
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          background: var(--color-white);
          min-height: 320px;
        }

        .about-ong-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .callout {
          background: var(--bg-secondary);
          padding: var(--spacing-2xl);
          border-radius: var(--radius-lg);
          text-align: center;
        }

        /* Discover Togo block */
        .togo-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: var(--spacing-3xl);
          align-items: start;
        }

        .togo-image {
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          background: var(--color-white);
        }

        .togo-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .togo-title {
          color: var(--color-primary);
          font-size: clamp(28px, 4vw, 40px);
          margin-bottom: var(--spacing-xs);
        }

        .togo-subtitle {
          font-size: clamp(18px, 2.2vw, 24px);
          color: var(--text-primary);
          margin-bottom: var(--spacing-lg);
          font-weight: var(--font-weight-semibold);
        }

        .togo-content p {
          line-height: 1.9;
          margin-bottom: var(--spacing-md);
        }

        .togo-content p strong {
          font-weight: var(--font-weight-bold);
        }

        @media (max-width: 1024px) {
          .togo-grid { grid-template-columns: 1fr; }
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

        .founder-feature {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: var(--spacing-2xl);
          align-items: center;
          background: var(--color-white);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          margin-bottom: var(--spacing-3xl);
        }

        .founder-photo {
          height: 100%;
          min-height: 280px;
          background: var(--bg-secondary);
        }

        .founder-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .founder-content {
          padding: var(--spacing-2xl);
        }

        .founder-name {
          margin-bottom: var(--spacing-xs);
        }

        .founder-role {
          color: var(--color-primary);
          font-weight: var(--font-weight-semibold);
          margin-bottom: var(--spacing-md);
        }

        .founder-bio {
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: var(--spacing-lg);
        }

        .founder-social {
          display: flex;
          gap: var(--spacing-md);
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
          .about-ong-grid {
            grid-template-columns: 1fr;
          }

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

          .founder-feature {
            grid-template-columns: 1fr;
          }

          .founder-content {
            padding: var(--spacing-xl);
          }

          .about-ong-media {
            min-height: 240px;
          }

          .about-block {
            padding: var(--spacing-xl);
          }
        }
      `}</style>
    </div>
  );
};

export default About;
