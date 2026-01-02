const FloatingParticles = ({ count = 20, color = 'var(--color-primary)' }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className="floating-particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            background: color,
          }}
        />
      ))}

      <style>{`
        .floating-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.3;
          animation: float infinite ease-in-out;
          will-change: transform, opacity;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.2;
          }
          25% {
            transform: translate(20px, -30px) scale(1.2);
            opacity: 0. 4;
          }
          50% {
            transform: translate(-15px, -60px) scale(0.8);
            opacity: 0.6;
          }
          75% {
            transform: translate(30px, -90px) scale(1.1);
            opacity: 0.3;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .particle {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingParticles;
