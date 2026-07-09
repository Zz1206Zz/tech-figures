import { useState, useEffect } from 'react';
import './GlitchText.css';

export default function GlitchText({ text, className = '', variant = 'primary' }) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.85) {
        setIsGlitching(true);
        let iterations = 0;
        const maxIterations = 5 + Math.floor(Math.random() * 5);
        
        const glitch = setInterval(() => {
          const glitched = text.split('').map((char, i) => {
            if (Math.random() > 0.7 && char !== ' ') {
              return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            }
            return char;
          }).join('');
          
          setDisplayText(glitched);
          iterations++;
          
          if (iterations >= maxIterations) {
            clearInterval(glitch);
            setDisplayText(text);
            setIsGlitching(false);
          }
        }, 50);
      }
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, [text]);

  return (
    <span className={`glitch-text glitch-text--${variant} ${isGlitching ? 'glitch-text--active' : ''} ${className}`}>
      <span className="glitch-text__content">{displayText}</span>
      <span className="glitch-text__shadow glitch-text__shadow--red" aria-hidden="true">{displayText}</span>
      <span className="glitch-text__shadow glitch-text__shadow--cyan" aria-hidden="true">{displayText}</span>
    </span>
  );
}
