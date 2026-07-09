import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './StatCard.css';

function StatCardItem({ stat, index }) {
  const numberRef = useRef(null);
  const cardRef = useRef(null);
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.from(card, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      delay: index * 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    if (typeof stat.value === 'number') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated.current) {
              hasAnimated.current = true;
              const obj = { val: 0 };
              gsap.to(obj, {
                val: stat.value,
                duration: 1.2,
                ease: 'power2.out',
                onUpdate: () => {
                  setDisplayValue(Math.round(obj.val));
                },
              });
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(card);
      return () => observer.disconnect();
    }
  }, [stat.value, index]);

  const accentClass = stat.accent ? `stat-card--${stat.accent}` : '';

  return (
    <div ref={cardRef} className={`stat-card ${accentClass} animate-on-scroll`}>
      <div className="stat-card__value mono">
        {typeof stat.value === 'number' ? displayValue : stat.value}
        {stat.suffix && <span className="stat-card__suffix">{stat.suffix}</span>}
      </div>
      <div className="stat-card__label">{stat.label}</div>
    </div>
  );
}

export default function StatCard({ stats }) {
  return (
    <section id="stats" className="stats-section">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatCardItem key={index} stat={stat} index={index} />
        ))}
      </div>
    </section>
  );
}
