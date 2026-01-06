import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Card = ({ image, images, title, description, link, linkText = 'Learn More', linkVariant = 'text', linkClassName = '', linkSize = '', clickable = false, alwaysShowLink = false, linkPosition = 'after', children }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  // Use images array if provided, otherwise fallback to single image wrapped in array
  const imageList = images && images.length > 0 ? images : (image ? [image] : []);
  const hasMultipleImages = imageList.length > 1;
  useEffect(() => {
    if (!hasMultipleImages || isHovered) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [hasMultipleImages, isHovered, imageList.length]);

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleCardClick = () => {
    if (clickable && link) {
      navigate(link);
    }
  };

  const handleKeyDown = (e) => {
    if (!clickable || !link) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(link);
    }
  };

  return (
    <div
      className={`card ${clickable ? 'clickable' : ''}`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={handleKeyDown}
    >
      {imageList.length > 0 && (
        <div className="card-img-wrapper">
          <img src={imageList[currentImageIndex]} alt={title} className="card-img" loading="lazy" />
          
          {hasMultipleImages && (
            <>
              <button className="slider-btn slider-prev" onClick={prevImage} aria-label="Previous image">
                <FaChevronLeft />
              </button>
              <button className="slider-btn slider-next" onClick={nextImage} aria-label="Next image">
                <FaChevronRight />
              </button>
              <div className="slider-dots">
                {imageList.map((_, idx) => (
                  <span 
                    key={idx} 
                    className={`slider-dot ${idx === currentImageIndex ? 'active' : ''}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
      <div className="card-content">
        {title && <h3 className="card-title">{title}</h3>}
        {description && <p className="card-text">{description}</p>}
        {link && (!clickable || alwaysShowLink) && linkPosition === 'before' && (
          <Link
            to={link}
            className={linkVariant === 'button' ? `btn btn-primary ${linkSize} ${linkClassName}` : `card-link ${linkClassName}`}
            onClick={(e) => { if (clickable) e.stopPropagation(); }}
          >
            {linkText}
          </Link>
        )}
        {children}
        {link && (!clickable || alwaysShowLink) && linkPosition !== 'before' && (
          <Link
            to={link}
            className={linkVariant === 'button' ? `btn btn-primary ${linkSize} ${linkClassName}` : `card-link ${linkClassName}`}
            onClick={(e) => { if (clickable) e.stopPropagation(); }}
          >
            {linkText}
          </Link>
        )}
      </div>

      <style>{`
        .card-img-wrapper {
          position: relative;
          overflow: hidden;
          height: 250px; /* Fixed height for consistency */
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
          pointer-events: none; /* Allow clicks to pass through to slider buttons */
        }

        .card:hover .card-img-wrapper::after {
          opacity: 0.3;
        }

        /* Removed hover scale for slider as it might interfere with UI controls, okeep it subtle */
        /* .card:hover .card-img {
          transform: scale(1.05); 
        } */

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-slow);
        }

        .card-img-wrapper .slider-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .card-img-wrapper .slider-btn:hover {
          background: var(--color-primary);
        }

        .card:hover .card-img-wrapper .slider-btn {
          opacity: 1;
        }

        .card-img-wrapper .slider-prev {
          left: 10px;
        }

        .card-img-wrapper .slider-next {
          right: 10px;
        }

        .card-img-wrapper .slider-dots {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          z-index: 10;
        }

        .card-img-wrapper .slider-dot {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .card-img-wrapper .slider-dot.active {
          background: var(--color-primary);
          transform: scale(1.2);
        }

        .card.clickable {
          cursor: pointer;
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

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .card-img-wrapper {
            height: 220px;
          }

          .card-img-wrapper .slider-btn {
            opacity: 1;
            width: 38px;
            height: 38px;
          }

          .card-img-wrapper .slider-dots {
            bottom: 8px;
          }

          .card-img-wrapper .slider-dot {
            width: 10px;
            height: 10px;
          }
        }
        @media (max-width: 480px) {
          .card-img-wrapper {
            height: 200px;
          }

          .card-img-wrapper .slider-prev {
            left: 8px;
          }

          .card-img-wrapper .slider-next {
            right: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default Card;
