import { useState, useEffect, useRef } from 'react';
import './CyberCounter.css';

export default function CyberCounter({ target, duration = 2000, label, suffix = '', prefix = '' }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const startTimeRef = useRef(null);
  const startValueRef = useRef(0);
  const animationRef = useRef(null);
  const [glitchChars, setGlitchChars] = useState([]);

  useEffect(() => {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const interval = setInterval(() => {
      const newGlitchChars = [];
      for (let i = 0; i < 8; i++) {
        newGlitchChars.push(chars[Math.floor(Math.random() * chars.length)]);
      }
      setGlitchChars(newGlitchChars);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animate = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
        startValueRef.current = displayValue;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(
        startValueRef.current + (target - startValueRef.current) * easeOutQuart
      );

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        startContinuousFluctuation();
      }
    };

    setIsAnimating(true);
    startTimeRef.current = null;
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [target, duration]);

  const startContinuousFluctuation = () => {
    const fluctuate = () => {
      const fluctuation = Math.floor(Math.random() * 5) - 2;
      setDisplayValue(prev => {
        const newValue = prev + fluctuation;
        return Math.max(target - 3, Math.min(target + 3, newValue));
      });
    };

    const interval = setInterval(fluctuate, 200 + Math.random() * 300);
    return () => clearInterval(interval);
  };

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <div className="cyber-counter">
      <div className="cyber-counter__glitch-row">
        {glitchChars.map((char, i) => (
          <span key={i} className="cyber-counter__glitch-char" style={{ animationDelay: `${i * 0.05}s` }}>
            {char}
          </span>
        ))}
      </div>

      <div className="cyber-counter__value-wrapper">
        <span className="cyber-counter__prefix">{prefix}</span>
        <span className={`cyber-counter__value ${isAnimating ? 'cyber-counter__value--animating' : ''}`}>
          {formatNumber(displayValue)}
        </span>
        <span className="cyber-counter__suffix">{suffix}</span>
      </div>

      {label && (
        <div className="cyber-counter__label">
          <span className="cyber-counter__label-bracket">[</span>
          {label}
          <span className="cyber-counter__label-bracket">]</span>
        </div>
      )}

      <div className="cyber-counter__scan-line" />
    </div>
  );
}
