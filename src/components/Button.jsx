const Button = ({ children, variant = 'primary', size = 'md', onClick, type = 'button', style, disabled = false, className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} btn-${size} ${className}`}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
