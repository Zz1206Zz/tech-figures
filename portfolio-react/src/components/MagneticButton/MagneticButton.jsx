import { useRef } from 'react';

const MagneticButton = ({
  children,
  className = '',
  onClick,
  strength = 0.3,
  style,
  ...rest
}) => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    el.style.transition = 'transform 0.08s ease-out';
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.3s ease';
    el.style.transform = 'translate(0px, 0px)';
  };

  return (
    <button
      ref={ref}
      type="button"
      className={`magnetic-button ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        willChange: 'transform',
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
};

export default MagneticButton;
