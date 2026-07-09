import { useEffect, useRef, useState } from 'react';
import './ScrollProgress.css';

const ScrollProgress = ({ className = '' }) => {
  const barRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const max = scrollHeight - clientHeight;
      const progress = max > 0 ? scrollTop / max : 0;
      setWidth(Math.max(0, Math.min(1, progress)) * 100);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className={`scroll-progress ${className}`}
      style={{ width: `${width}%` }}
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;
