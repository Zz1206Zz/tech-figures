import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP ScrollTrigger 通用滚动动画封装
 * @param {Object} options - 动画选项
 * @param {string} options.selector - 要动画的元素选择器（在scope内）
 * @param {string} options.scopeRef - scope元素的ref
 * @param {Object} options.from - 起始属性
 * @param {Object} options.to - 结束属性
 * @param {number} options.stagger - 错开时间秒
 * @param {number} options.duration - 动画时长秒
 * @param {string} options.ease - 缓动函数
 * @param {string} options.trigger - 触发元素选择器
 * @param {string} options.start - 开始位置
 * @param {boolean} options.once - 只触发一次
 */
export function useScrollAnimation(options = {}) {
  const {
    selector,
    scopeRef,
    from = { opacity: 0, y: 30 },
    to = { opacity: 1, y: 0 },
    stagger = 0.15,
    duration = 0.8,
    ease = 'power3.out',
    start = 'top 80%',
    once = true,
  } = options;

  const animRef = useRef(null);

  useEffect(() => {
    if (!scopeRef?.current || !selector) return;

    const elements = scopeRef.current.querySelectorAll(selector);
    if (elements.length === 0) return;

    // 设置初始状态
    gsap.set(elements, from);

    // 创建 ScrollTrigger 动画
    const trigger = gsap.to(elements, {
      ...to,
      duration,
      ease,
      stagger,
      scrollTrigger: {
        trigger: scopeRef.current,
        start,
        once,
      },
    });

    animRef.current = trigger;

    return () => {
      if (trigger.scrollTrigger) {
        trigger.scrollTrigger.kill();
      }
      trigger.kill();
    };
  }, [selector, scopeRef, from, to, stagger, duration, ease, start, once]);

  return animRef;
}

export default useScrollAnimation;
