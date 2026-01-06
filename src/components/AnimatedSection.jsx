import { useEffect, useRef, useState } from 'react';

const AnimatedSection = ({ 
  children, 
  animation = 'fade-up', 
  delay = 0,
  threshold = 0.1, // Lower threshold for earlier mobile triggering
  once = true 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Safety timeout to ensure content is eventually visible even if observer fails
  useEffect(() => {
    const timer = setTimeout(() => {
        if (!isVisible) setIsVisible(true);
    }, 4000); // Force visible after 4 seconds
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [threshold, once]);

  return (
    <div
      ref={sectionRef}
      className={`animated-section ${animation} ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
      
      <style>{`
        .animated-section {
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animated-section.visible {
          opacity: 1;
        }

        /* Fade Up Animation */
        .animated-section.fade-up {
          transform: translateY(50px);
        }

        .animated-section.fade-up.visible {
          transform: translateY(0);
        }

        /* Fade Down Animation */
        .animated-section.fade-down {
          transform: translateY(-50px);
        }

        .animated-section.fade-down.visible {
          transform: translateY(0);
        }

        /* Slide Left Animation */
        .animated-section.slide-left {
          transform: translateX(80px);
        }

        .animated-section.slide-left.visible {
          transform: translateX(0);
        }

        /* Slide Right Animation */
        .animated-section.slide-right {
          transform: translateX(-80px);
        }

        .animated-section.slide-right.visible {
          transform: translateX(0);
        }

        /* Scale Animation */
        .animated-section.scale {
          transform: scale(0.8);
        }

        .animated-section.scale.visible {
          transform: scale(1);
        }

        /* Zoom In Animation */
        .animated-section.zoom-in {
          transform: scale(0.5);
        }

        .animated-section.zoom-in.visible {
          transform: scale(1);
        }

        /* Rotate In Animation */
        .animated-section.rotate-in {
          transform: rotate(-10deg) scale(0.8);
        }

        .animated-section.rotate-in.visible {
          transform: rotate(0) scale(1);
        }
      `}</style>
    </div>
  );
};

export default AnimatedSection;
