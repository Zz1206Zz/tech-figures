import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import ParticleBackground from './ParticleBackground';
import CyberCounter from './CyberCounter';
import GlitchText from './GlitchText';
import TypewriterText from './TypewriterText';
import heroImg from '../../assets/hero.png';
import './CyberHero.css';

export default function CyberHero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const countersRef = useRef(null);
  const imageRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const [currentTime, setCurrentTime] = useState('00:00:00');

  const typingTexts = [
    'INITIALIZING SYSTEM...',
    'LOADING DATA MODULES...',
    'CONNECTING TO NETWORK...',
    'SYSTEM ONLINE. READY.',
    'AI ASSISTANT ACTIVATED',
  ];

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(leftPanelRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 }
    )
      .fromTo(rightPanelRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 },
        '-=0.8'
      )
      .fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      )
      .fromTo(countersRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        '-=0.3'
      )
      .fromTo(imageRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' },
        '-=0.8'
      );

    return () => tl.kill();
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={heroRef} className="cyber-hero">
      <div className="cyber-hero__bg-gradient" />
      <ParticleBackground />

      <div className="cyber-hero__scanlines" />
      <div className="cyber-hero__grid-overlay" />

      <div className="cyber-hero__content">
        <div ref={leftPanelRef} className="cyber-hero__left">
          <div className="cyber-hero__terminal-header">
            <div className="cyber-hero__terminal-dots">
              <span className="cyber-hero__terminal-dot cyber-hero__terminal-dot--red" />
              <span className="cyber-hero__terminal-dot cyber-hero__terminal-dot--yellow" />
              <span className="cyber-hero__terminal-dot cyber-hero__terminal-dot--green" />
            </div>
            <span className="cyber-hero__terminal-title">
              cyber_system://user_profile
            </span>
          </div>

          <h1 ref={titleRef} className="cyber-hero__title">
            <GlitchText text="ZENG XUEZHANG" variant="primary" />
          </h1>

          <div ref={subtitleRef} className="cyber-hero__subtitle">
            <span className="cyber-hero__subtitle-tag">[ EDUCATOR ]</span>
            <span className="cyber-hero__subtitle-tag">[ AI ENTHUSIAST ]</span>
            <span className="cyber-hero__subtitle-tag">[ 608 GAOKAO ]</span>
          </div>

          <div className="cyber-hero__typewriter">
            <TypewriterText texts={typingTexts} />
          </div>

          <div ref={countersRef} className="cyber-hero__counters">
            <CyberCounter
              target={608}
              label="高考总分"
              suffix="分"
              duration={2500}
            />
            <CyberCounter
              target={137}
              label="英语成绩"
              suffix="分"
              duration={2000}
            />
            <CyberCounter
              target={500}
              label="辅导学生"
              suffix="+"
              duration={3000}
            />
          </div>

          <div className="cyber-hero__stats-row">
            <div className="cyber-hero__stat-item">
              <span className="cyber-hero__stat-label">STATUS</span>
              <span className="cyber-hero__stat-value cyber-hero__stat-value--online">
                <span className="cyber-hero__stat-dot" />
                ONLINE
              </span>
            </div>
            <div className="cyber-hero__stat-item">
              <span className="cyber-hero__stat-label">LOCATION</span>
              <span className="cyber-hero__stat-value">CHENGDU</span>
            </div>
            <div className="cyber-hero__stat-item">
              <span className="cyber-hero__stat-label">SYSTEM</span>
              <span className="cyber-hero__stat-value">v2.0.77</span>
            </div>
          </div>
        </div>

        <div ref={rightPanelRef} className="cyber-hero__right">
          <div className="cyber-hero__image-wrapper">
            <div className="cyber-hero__image-frame">
              <div className="cyber-hero__image-corner cyber-hero__image-corner--tl" />
              <div className="cyber-hero__image-corner cyber-hero__image-corner--tr" />
              <div className="cyber-hero__image-corner cyber-hero__image-corner--bl" />
              <div className="cyber-hero__image-corner cyber-hero__image-corner--br" />
              
              <div className="cyber-hero__image-scanline" />
              <div className="cyber-hero__image-glow" />
              
              <img
                ref={imageRef}
                src={heroImg}
                alt="Cyber Hero"
                className="cyber-hero__image"
              />

              <div className="cyber-hero__image-overlay">
                <div className="cyber-hero__hud-item cyber-hero__hud-item--top-left">
                  <span>SUBJECT_01</span>
                </div>
                <div className="cyber-hero__hud-item cyber-hero__hud-item--top-right">
                  <span>ID: 8877</span>
                </div>
                <div className="cyber-hero__hud-item cyber-hero__hud-item--bottom-left">
                  <span>LEVEL: S</span>
                </div>
                <div className="cyber-hero__hud-item cyber-hero__hud-item--bottom-right">
                  <span>SYNC OK</span>
                </div>
              </div>
            </div>

            <div className="cyber-hero__data-streams">
              <div className="cyber-hero__data-stream cyber-hero__data-stream--1">
                {Array.from({ length: 20 }).map((_, i) => (
                  <span key={i} className="cyber-hero__data-char" style={{ animationDelay: `${i * 0.1}s` }}>
                    {Math.random() > 0.5 ? '1' : '0'}
                  </span>
                ))}
              </div>
              <div className="cyber-hero__data-stream cyber-hero__data-stream--2">
                {Array.from({ length: 15 }).map((_, i) => (
                  <span key={i} className="cyber-hero__data-char" style={{ animationDelay: `${i * 0.15}s` }}>
                    {Math.random() > 0.5 ? '1' : '0'}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cyber-hero__bottom-bar">
        <div className="cyber-hero__bottom-item">
          <span className="cyber-hero__bottom-label">CPU</span>
          <div className="cyber-hero__bottom-bar-fill">
            <div className="cyber-hero__bottom-bar-progress" style={{ width: '67%' }} />
          </div>
          <span className="cyber-hero__bottom-value">67%</span>
        </div>
        <div className="cyber-hero__bottom-item">
          <span className="cyber-hero__bottom-label">MEMORY</span>
          <div className="cyber-hero__bottom-bar-fill">
            <div className="cyber-hero__bottom-bar-progress" style={{ width: '82%' }} />
          </div>
          <span className="cyber-hero__bottom-value">82%</span>
        </div>
        <div className="cyber-hero__bottom-item">
          <span className="cyber-hero__bottom-label">NETWORK</span>
          <div className="cyber-hero__bottom-bar-fill">
            <div className="cyber-hero__bottom-bar-progress cyber-hero__bottom-bar-progress--stable" style={{ width: '95%' }} />
          </div>
          <span className="cyber-hero__bottom-value">95%</span>
        </div>
        <div className="cyber-hero__bottom-item cyber-hero__bottom-item--time">
          <span className="cyber-hero__time">{currentTime}</span>
        </div>
      </div>
    </section>
  );
}
