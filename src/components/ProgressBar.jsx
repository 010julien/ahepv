import { useEffect, useState } from 'react';

const ProgressBar = ({ percentage, label, raised, goal, animated = true }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setWidth(percentage), 100);
      return () => clearTimeout(timer);
    } else {
      setWidth(percentage);
    }
  }, [percentage, animated]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="progress-wrapper">
      {label && (
        <div className="progress-label">
          <span>{label}</span>
          <span className="progress-percentage">{percentage}%</span>
        </div>
      )}
      {(raised !== undefined && goal !== undefined) && (
        <div className="progress-amounts">
          <span className="progress-raised">{formatCurrency(raised)} raised</span>
          <span className="progress-goal">Goal: {formatCurrency(goal)}</span>
        </div>
      )}
      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${width}%` }}
        ></div>
      </div>

      <style>{`
        .progress-wrapper {
          margin-bottom: var(--spacing-lg);
        }

        .progress-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
        }

        .progress-percentage {
          color: var(--color-primary);
        }

        .progress-amounts {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-sm);
          font-size: var(--font-size-sm);
        }

        .progress-raised {
          color: var(--color-secondary);
          font-weight: var(--font-weight-semibold);
        }

        .progress-goal {
          color: var(--text-secondary);
        }

        .progress-bar-container {
          height: 12px;
          background: var(--color-gray-200);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: var(--gradient-primary);
          border-radius: var(--radius-full);
          transition: width 1s ease-out;
          position: relative;
        }

        .progress-bar-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default ProgressBar;
