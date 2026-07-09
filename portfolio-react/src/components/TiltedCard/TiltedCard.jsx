import { useRef } from 'react';
import './TiltedCard.css';

const TiltedCard = ({
  children,
  rotateAmplitude = 14,
  scaleOnHover = 1.1,
  className,
}) => {
  const cardRef = useRef(null);

  const handleMouseMove = e => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const offsetX = (e.clientX - centerX) / (width / 2);
    const offsetY = (e.clientY - centerY) / (height / 2);
    const rotateY = offsetX * rotateAmplitude;
    const rotateX = -offsetY * rotateAmplitude;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scaleOnHover})`;
  };

  const handleMouseEnter = () => {
    const card = cardRef.current;
    if (!card) return;
    card.classList.add('is-hovering');
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.classList.remove('is-hovering');
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <div className={`tilted-card-container ${className || ''}`}>
      <div
        ref={cardRef}
        className="tilted-card"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    </div>
  );
};

export default TiltedCard;
