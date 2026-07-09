import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(selector = '.animate-on-scroll', options = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(selector);

    elements.forEach((el, index) => {
      gsap.from(el, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        delay: index * 0.08,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
          ...options,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger && elements.contains(st.vars.trigger)) {
          st.kill();
        }
      });
    };
  }, [selector, options]);

  return containerRef;
}

export function useCountUp(targetValue, duration = 1.2, startOnView = true) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof targetValue !== 'number') return;

    const animate = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const obj = { val: 0 };
      gsap.to(obj, {
        val: targetValue,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          setValue(Math.round(obj.val));
        },
      });
    };

    if (startOnView) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animate();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(element);
      return () => observer.disconnect();
    } else {
      animate();
    }
  }, [targetValue, duration, startOnView]);

  return { ref, value };
}
