import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import './SplitText.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SplitText = ({
  text = '',
  tag: Tag = 'p',
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  triggerOnLoad = false,
  startDelay = 0,
  onLetterAnimationComplete
}) => {
  const containerRef = useRef(null);

  const renderSplit = () => {
    const types = String(splitType)
      .split(',')
      .map(t => t.trim().toLowerCase())
      .filter(Boolean);

    const isWordsAndChars =
      types.includes('words') && types.includes('chars');

    if (isWordsAndChars) {
      const words = text.split(' ');
      return words.map((word, wi) => (
        <span key={`w-${wi}`} className="split-word">
          {word.split('').map((char, ci) => (
            <span key={`c-${ci}`} className="split-child">
              {char}
            </span>
          ))}
          {wi < words.length - 1 ? '\u00A0' : ''}
        </span>
      ));
    }

    if (types.includes('words')) {
      const words = text.split(' ');
      return words.map((word, i) => (
        <span key={i} className="split-child">
          {word}
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ));
    }

    if (types.includes('lines')) {
      const lines = text.split('\n');
      return lines.map((line, i) => (
        <span key={i} className="split-child split-child--block">
          {line || '\u00A0'}
        </span>
      ));
    }

    return text.split('').map((char, i) => (
      <span key={i} className="split-child">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const children = el.querySelectorAll('.split-child');
      if (!children.length) return;

      gsap.set(children, from);

      if (triggerOnLoad) {
        gsap.to(children, {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          delay: startDelay,
          onComplete: onLetterAnimationComplete
        });
        return;
      }

      const marginMatch = /^(-?\d+(?:\.\d+)?)px$/.exec(rootMargin);
      const margin = marginMatch ? parseFloat(marginMatch[1]) : 0;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: `top bottom-=${margin}`,
        once: true,
        onEnter: () => {
          gsap.to(children, {
            ...to,
            duration,
            ease,
            stagger: delay / 1000,
            delay: startDelay,
            onComplete: onLetterAnimationComplete
          });
        }
      });

      return () => {
        trigger.kill();
      };
    },
    {
      scope: containerRef,
      dependencies: [text, splitType, delay, duration, ease, rootMargin, triggerOnLoad, startDelay]
    }
  );

  return (
    <Tag
      ref={containerRef}
      className={`split-text ${className}`.trim()}
      style={{ textAlign }}
    >
      {renderSplit()}
    </Tag>
  );
};

export default SplitText;
