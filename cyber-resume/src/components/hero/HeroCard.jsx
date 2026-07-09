import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Circle, MapPin, BookOpen } from 'lucide-react';
import './HeroCard.css';

const statusIcons = {
  online: Circle,
  location: MapPin,
  subjects: BookOpen,
};

export default function HeroCard({ siteConfig, heroStatus, typingTexts }) {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const statusRef = useRef(null);
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl.from(titleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
    })
      .from(subtitleRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
      }, '-=0.4')
      .from(statusRef.current?.children || [], {
        x: -20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
      }, '-=0.3');

    return () => tl.kill();
  }, []);

  useEffect(() => {
    const currentText = typingTexts[typingIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 200 : 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTypingIndex((prev) => (prev + 1) % typingTexts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, typingIndex, typingTexts]);

  return (
    <section id="hero" className="hero-card animate-on-scroll">
      <div className="hero-card__border" />
      <div className="hero-card__content">
        <div className="hero-card__header">
          <div className="hero-card__terminal">
            <span className="hero-card__terminal-dot hero-card__terminal-dot--red" />
            <span className="hero-card__terminal-dot hero-card__terminal-dot--yellow" />
            <span className="hero-card__terminal-dot hero-card__terminal-dot--green" />
            <span className="hero-card__terminal-title mono">
              ~/zeng-xuezhang/system
            </span>
          </div>
        </div>

        <div className="hero-card__body">
          <h1 ref={titleRef} className="hero-card__title">
            <span className="mono glow-text">{siteConfig.nameEn}</span>
            <span className="hero-card__title-divider">·</span>
            <span className="hero-card__title-system mono">
              {siteConfig.systemName}
            </span>
          </h1>

          <p ref={subtitleRef} className="hero-card__subtitle">
            高考608分 · 英语137分 · AI赋能教学 · {siteConfig.location}
          </p>

          <div className="hero-card__typing">
            <span className="mono hero-card__typing-prefix">$</span>
            <span className="mono hero-card__typing-text">{displayText}</span>
            <span className="hero-card__typing-cursor" />
          </div>

          <div ref={statusRef} className="hero-card__status">
            {heroStatus.map((item, index) => {
              const Icon = statusIcons[item.status];
              return (
                <div key={index} className="hero-card__status-item">
                  {item.status === 'online' ? (
                    <span className="hero-card__status-dot" />
                  ) : (
                    Icon && <Icon size={14} />
                  )}
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
