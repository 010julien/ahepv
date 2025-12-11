import { Link } from 'react-router-dom';

const Card = ({ image, title, description, link, linkText = 'Learn More', children }) => {
  return (
    <div className="card">
      {image && (
        <div className="card-img-wrapper">
          <img src={image} alt={title} className="card-img" />
        </div>
      )}
      <div className="card-content">
        {title && <h3 className="card-title">{title}</h3>}
        {description && <p className="card-text">{description}</p>}
        {children}
        {link && (
          <Link to={link} className="card-link">
            {linkText}
          </Link>
        )}
      </div>

      <style>{`
        .card-img-wrapper {
          position: relative;
          overflow: hidden;
        }

        .card-img-wrapper::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--gradient-overlay);
          opacity: 0;
          transition: opacity var(--transition-base);
        }

        .card:hover .card-img-wrapper::after {
          opacity: 0.3;
        }

        .card:hover .card-img {
          transform: scale(1.1);
        }

        .card-img {
          transition: transform var(--transition-slow);
        }

        .card-link {
          display: inline-block;
          color: var(--color-primary);
          font-weight: var(--font-weight-semibold);
          margin-top: var(--spacing-md);
          transition: all var(--transition-fast);
        }

        .card-link:hover {
          color: var(--color-primary-dark);
          transform: translateX(5px);
        }
      `}</style>
    </div>
  );
};

export default Card;
