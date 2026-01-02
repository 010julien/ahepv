const GradientBlob = ({ 
  size = '400px', 
  top = '10%', 
  left = '10%',
  colors = ['#FF6B9D', '#C96DD8', '#9D6BFF'],
  blur = '100px',
  opacity = 0.3,
  duration = '20s'
}) => {
  return (
    <div 
      className="gradient-blob"
      style={{
        width: size,
        height: size,
        top,
        left,
        filter: `blur(${blur})`,
        opacity,
        animationDuration: duration,
      }}
    >
      <style>{`
        .gradient-blob {
          position: absolute;
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          background: linear-gradient(
            45deg,
            ${colors[0]} 0%,
            ${colors[1]} 50%,
            ${colors[2]} 100%
          );
          animation: morph infinite ease-in-out, float2 infinite ease-in-out;
          pointer-events: none;
          z-index: 0;
          will-change: border-radius, transform;
        }

        @keyframes morph {
          0%, 100% {
            border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          }
          25% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          50% {
            border-radius: 30% 70% 50% 50% / 50% 60% 40% 60%;
          }
          75% {
            border-radius: 70% 30% 60% 40% / 30% 70% 50% 50%;
          }
        }

        @keyframes float2 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gradient-blob {
            animation: none;
          }
        }

        @media (max-width: 768px) {
          .gradient-blob {
            width: 200px;
            height: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default GradientBlob;
