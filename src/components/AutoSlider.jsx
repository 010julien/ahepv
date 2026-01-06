import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AutoSlider = ({ 
  images = [], 
  interval = 4000, 
  height = "400px",
  overlayOpacity = 0.3
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (!images || images.length === 0) return null;

  return (
    <div className="auto-slider-container" style={{ height }}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="auto-slider-image"
          style={{
            backgroundImage: `url(${images[currentIndex].src})`
          }}
        />
      </AnimatePresence>
      
      <div className="auto-slider-overlay" style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }}></div>
      
      <div className="auto-slider-content">
        <AnimatePresence mode="wait">
            <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="slider-text-wrapper"
            >
                <h3>{images[currentIndex].title}</h3>
                <p>{images[currentIndex].paragraph}</p>
            </motion.div>
        </AnimatePresence>
      </div>

      <div className="auto-slider-indicators">
        {images.map((_, idx) => (
            <button
                key={idx}
                className={`indicator ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
            />
        ))}
      </div>

      <style>{`
        .auto-slider-container {
            position: relative;
            width: 100%;
            overflow: hidden;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-xl);
            margin-bottom: var(--spacing-4xl);
        }

        .auto-slider-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
        }

        .auto-slider-overlay {
            position: absolute;
            inset: 0;
            z-index: 1;
        }

        .auto-slider-content {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: var(--spacing-2xl);
            z-index: 2;
            color: white;
            background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
        }

        .slider-text-wrapper h3 {
            color: white;
            font-size: var(--font-size-2xl);
            margin-bottom: var(--spacing-xs);
            text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        .slider-text-wrapper p {
            color: rgba(255,255,255,0.9);
            font-size: var(--font-size-lg);
            max-width: 600px;
        }

        .auto-slider-indicators {
            position: absolute;
            bottom: var(--spacing-lg);
            right: var(--spacing-lg);
            display: flex;
            gap: var(--spacing-sm);
            z-index: 3;
        }

        .indicator {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(255,255,255,0.3);
            border: none;
            cursor: pointer;
            transition: all 0.3s;
        }

        .indicator.active {
            background: white;
            transform: scale(1.2);
        }

        @media (max-width: 768px) {
            .slider-text-wrapper h3 {
                font-size: var(--font-size-xl);
            }
            .slider-text-wrapper p {
                font-size: var(--font-size-base);
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            .auto-slider-content {
                padding: var(--spacing-lg);
            }
        }
      `}</style>
    </div>
  );
};

export default AutoSlider;
