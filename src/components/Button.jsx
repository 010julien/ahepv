const Button = ({ children, variant = 'primary', onClick, type = 'button', style, disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`modern-btn modern-btn-${variant}`}
      style={style}
    >
      {children}
      <style>{`
        .modern-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-sm);
          padding: 14px 32px;
          font-family: var(--font-primary);
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          text-align: center;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          text-decoration: none;
        }

        .modern-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .modern-btn:hover::before {
          width: 300px;
          height: 300px;
        }

        .modern-btn:active {
          transform: scale(0.95);
        }

        .modern-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Primary Button - Green Gradient */
        .modern-btn-primary {
          background: linear-gradient(135deg, #006a4e 0%, #004a37 100%);
          color: var(--color-white);
          box-shadow: 0 4px 15px rgba(0, 106, 78, 0.3);
        }

        .modern-btn-primary:hover {
          box-shadow: 0 6px 20px rgba(0, 106, 78, 0.4);
          transform: translateY(-2px);
        }

        /* Secondary Button - Darker Green */
        .modern-btn-secondary {
          background: linear-gradient(135deg, #004a37 0%, #003829 100%);
          color: var(--color-white);
          box-shadow: 0 4px 15px rgba(0, 74, 55, 0.3);
        }

        .modern-btn-secondary:hover {
          box-shadow: 0 6px 20px rgba(0, 74, 55, 0.4);
          transform: translateY(-2px);
        }

        /* Outline Button - White Background */
        .modern-btn-outline {
          background: var(--color-white);
          color: var(--color-primary);
          border: 2px solid var(--color-primary);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .modern-btn-outline:hover {
          background: var(--color-primary);
          color: var(--color-white);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 106, 78, 0.3);
        }

        /* Ghost Button - Transparent */
        .modern-btn-ghost {
          background: transparent;
          color: var(--color-primary);
          border: 2px solid var(--color-primary);
        }

        .modern-btn-ghost:hover {
          background: rgba(0, 106, 78, 0.1);
          transform: translateY(-2px);
        }

        /* Light Button - Light Green Background */
        .modern-btn-light {
          background: #f4fffc;
          color: var(--color-primary);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .modern-btn-light:hover {
          background: #e0f9f4;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        }

        /* Dark Button - Black */
        .modern-btn-dark {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          color: var(--color-white);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .modern-btn-dark:hover {
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
          transform: translateY(-2px);
        }
      `}</style>
    </button>
  );
};

export default Button;
