import { useState, useEffect } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getLocalized } from '../i18n/utils';

const QuoteCarousel = ({ quotes, language, autoPlayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (isPaused || !quotes || quotes.length === 0) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, quotes, autoPlayInterval]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleDotClick = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  if (!quotes || quotes.length === 0) return null;

  const currentQuote = quotes[currentIndex];

  return (
    <div 
      className="quote-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="quote-carousel-container">
        <FaQuoteLeft className="quote-icon" />
        
        <div className={`quote-content ${isAnimating ? 'fade-out' : 'fade-in'}`}>
          <p className="quote-text">
            {getLocalized(currentQuote.text, language)}
          </p>
          <p className="quote-author">
            - {getLocalized(currentQuote.author, language)}
          </p>
        </div>

        {quotes.length > 1 && (
          <>
            <button 
              className="carousel-btn carousel-prev" 
              onClick={handlePrev}
              aria-label="Previous quote"
            >
              <FaChevronLeft />
            </button>
            <button 
              className="carousel-btn carousel-next" 
              onClick={handleNext}
              aria-label="Next quote"
            >
              <FaChevronRight />
            </button>

            <div className="carousel-dots">
              {quotes.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Go to quote ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <style>{`
        .quote-carousel {
          position: relative;
          padding: var(--spacing-4xl) 0;
          background: linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.05) 0%, rgba(var(--color-secondary-rgb), 0.05) 100%);
          overflow: hidden;
        }

        .quote-carousel::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('/images/pattern.svg') repeat;
          opacity: 0.03;
          pointer-events: none;
        }

        .quote-carousel-container {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          padding: var(--spacing-3xl);
          text-align: center;
        }

        .quote-icon {
          font-size: var(--font-size-5xl);
          color: var(--color-primary);
          opacity: 0.2;
          margin-bottom: var(--spacing-lg);
        }

        .quote-content {
          min-height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 var(--spacing-2xl);
        }

        .quote-content.fade-in {
          animation: fadeIn 0.5s ease-in;
        }

        .quote-content.fade-out {
          animation: fadeOut 0.5s ease-out;
        }

        .quote-text {
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-medium);
          font-style: italic;
          color: var(--text-primary);
          line-height: 1.8;
          margin-bottom: var(--spacing-xl);
          max-width: 800px;
        }

        .quote-author {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--color-primary);
          margin-top: var(--spacing-md);
        }

        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.9);
          border: 2px solid var(--color-primary);
          color: var(--color-primary);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-base);
          z-index: 10;
          box-shadow: var(--shadow-md);
        }

        .carousel-btn:hover {
          background: var(--color-primary);
          color: var(--color-white);
          transform: translateY(-50%) scale(1.1);
        }

        .carousel-prev {
          left: var(--spacing-md);
        }

        .carousel-next {
          right: var(--spacing-md);
        }

        .carousel-dots {
          display: flex;
          gap: var(--spacing-sm);
          justify-content: center;
          margin-top: var(--spacing-2xl);
        }

        .carousel-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid var(--color-primary);
          background: transparent;
          cursor: pointer;
          transition: all var(--transition-base);
          padding: 0;
        }

        .carousel-dot:hover {
          background: rgba(var(--color-primary-rgb), 0.5);
          transform: scale(1.2);
        }

        .carousel-dot.active {
          background: var(--color-primary);
          transform: scale(1.3);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
          }
        }

        @media (max-width: 768px) {
          .quote-carousel-container {
            padding: var(--spacing-xl) var(--spacing-md);
          }

          .quote-content {
            min-height: 250px;
            padding: 0 var(--spacing-md);
          }

          .quote-text {
            font-size: var(--font-size-xl);
          }

          .quote-author {
            font-size: var(--font-size-md);
          }

          .carousel-btn {
            width: 40px;
            height: 40px;
          }

          .carousel-prev {
            left: var(--spacing-xs);
          }

          .carousel-next {
            right: var(--spacing-xs);
          }
        }

        @media (max-width: 480px) {
          .quote-text {
            font-size: var(--font-size-lg);
          }

          .quote-icon {
            font-size: var(--font-size-4xl);
          }

          .carousel-btn {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </div>
  );
};

export default QuoteCarousel;
