import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useMotionValue } from 'framer-motion';
import './Counter.css';

const Counter = ({
  value,
  fontSize = 100,
  padding = 0,
  places,
  gap = 8,
  borderRadius = 4,
  horizontalPadding = 8,
  textColor = 'white',
  fontWeight = 'bold',
  containerStyle,
  counterStyle,
  digitStyle,
  gradientHeight = 16,
  gradientFrom = 'black',
  gradientTo = 'transparent',
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const motionVal = useMotionValue(0);
  const [count, setCount] = useState(0);

  // 计算位数数组：如果未传入 places，根据 value 推导
  const computedPlaces =
    places ||
    (() => {
      const safeValue = Math.max(0, Math.floor(Number(value) || 0));
      const len = String(safeValue).length;
      const arr = [];
      for (let i = len - 1; i >= 0; i--) {
        arr.push(Math.pow(10, i));
      }
      return arr.length ? arr : [1];
    })();

  // 订阅 motionVal 变化以同步到 state，触发重渲染显示每位数字
  useEffect(() => {
    const unsubscribe = motionVal.on('change', latest => {
      setCount(latest);
    });
    return () => unsubscribe();
  }, [motionVal]);

  // 进入视口后从 0 动画到 value
  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, value, {
      duration: 2,
      ease: 'easeOut',
    });
    return () => controls.stop();
  }, [inView, value, motionVal]);

  return (
    <div
      ref={ref}
      className="counter-container"
      style={{ padding, ...containerStyle }}
    >
      <div
        className="counter-inner"
        style={{
          gap,
          fontSize,
          color: textColor,
          fontWeight,
          padding: `0 ${horizontalPadding}px`,
          borderRadius,
          ...counterStyle,
        }}
      >
        {computedPlaces.map((place, idx) => {
          const digit = Math.floor((count / place) % 10);
          return (
            <div
              key={`${place}-${idx}`}
              className="counter-digit"
              style={{
                '--gradient-height': `${gradientHeight}px`,
                '--gradient-from': gradientFrom,
                '--gradient-to': gradientTo,
                ...digitStyle,
              }}
            >
              {digit}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Counter;
