import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './ScrollVelocity.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ScrollVelocity = ({
  text = '',
  speed = 2,
  className = '',
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      const el = textRef.current;
      const container = containerRef.current;
      if (!el || !container) return;

      // 测量单段文字宽度（含 gap），作为循环单元
      const measure = () => {
        const oneChild = el.firstElementChild;
        if (!oneChild) return 0;
        const style = window.getComputedStyle(el);
        const gap = parseFloat(style.columnGap || style.gap || 0) || 0;
        const childWidth = oneChild.getBoundingClientRect().width;
        return Math.max(childWidth + gap, 1);
      };

      let unitWidth = measure();

      const getDirection = (self) => {
        // self.direction: 1 = 向下滚动, -1 = 向上滚动
        return self.direction === -1 ? -1 : 1;
      };

      const tween = gsap.to(el, {
        x: () => (getDirection({ direction: 1 }) ? -unitWidth : unitWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const dir = getDirection(self);
            const velocity = self.getVelocity() / 1000;
            // 速度系数：滚动越快，文字移动越快；方向决定正负
            const offset = -unitWidth + dir * velocity * speed * 10;
            gsap.to(el, {
              x: offset,
              duration: 0.6,
              ease: 'power3.out',
              overwrite: 'auto',
            });
          },
        },
      });

      const onResize = () => {
        unitWidth = measure();
        ScrollTrigger.refresh();
      };
      window.addEventListener('resize', onResize);

      return () => {
        window.removeEventListener('resize', onResize);
        tween && tween.kill();
      };
    },
    { scope: containerRef, dependencies: [text, speed] }
  );

  // 重复文字填满宽度
  const repeat = 8;
  const items = Array.from({ length: repeat }, (_, i) => (
    <span key={i} className="scroll-velocity-item">
      {text}
    </span>
  ));

  return (
    <div
      ref={containerRef}
      className={`scroll-velocity-container ${className}`}
      aria-hidden="true"
    >
      <div ref={textRef} className="scroll-velocity-text">
        {items}
      </div>
    </div>
  );
};

export default ScrollVelocity;
