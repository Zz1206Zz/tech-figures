import { useState, useEffect, useRef } from 'react';
import { Sparkles, Check, Zap, Palette } from 'lucide-react';
import './AIShowcase.css';

const badgeIcons = {
  'AI 生成': Check,
  '快速学习': Zap,
  '创造力': Palette,
};

export default function AIShowcase({ data }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef(null);
  const codeRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let currentLine = 0;
    const totalLines = data.codeLines.length;

    const interval = setInterval(() => {
      if (currentLine < totalLines) {
        setVisibleLines(currentLine + 1);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [hasStarted, data.codeLines]);

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.scrollTop = codeRef.current.scrollHeight;
    }
  }, [visibleLines]);

  return (
    <section
      id="ai-showcase"
      className="ai-showcase animate-on-scroll"
      ref={containerRef}
    >
      <div className="ai-showcase__header">
        <h2 className="ai-showcase__title">
          <Sparkles size={18} />
          <span>{data.title}</span>
          <span className="ai-showcase__badge mono">NEW</span>
        </h2>
      </div>

      <div className="ai-showcase__content">
        <div className="ai-showcase__code">
          <div className="ai-showcase__code-header">
            <div className="ai-showcase__code-dots">
              <span className="ai-showcase__code-dot ai-showcase__code-dot--red" />
              <span className="ai-showcase__code-dot ai-showcase__code-dot--yellow" />
              <span className="ai-showcase__code-dot ai-showcase__code-dot--green" />
            </div>
            <span className="ai-showcase__code-filename mono">
              CyberResume.jsx
            </span>
          </div>
          <div className="ai-showcase__code-body" ref={codeRef}>
            {data.codeLines.slice(0, visibleLines).map((line, index) => (
              <div key={index} className="ai-showcase__code-line">
                <span className="ai-showcase__code-number mono">
                  {index + 1}
                </span>
                <span
                  className="ai-showcase__code-text mono"
                  dangerouslySetInnerHTML={{ __html: highlightSyntax(line) }}
                />
              </div>
            ))}
            {hasStarted && visibleLines < data.codeLines.length && (
              <div className="ai-showcase__code-cursor" />
            )}
          </div>
        </div>

        <div className="ai-showcase__info">
          <p className="ai-showcase__desc">{data.description}</p>

          <div className="ai-showcase__badges">
            {data.badges.map((badge, index) => {
              const Icon = badgeIcons[badge] || Check;
              return (
                <div key={index} className="ai-showcase__badge-item">
                  <Icon size={14} />
                  <span>{badge}</span>
                </div>
              );
            })}
          </div>

          <div className="ai-showcase__stats">
            <div className="ai-showcase__stat">
              <span className="ai-showcase__stat-value mono">100%</span>
              <span className="ai-showcase__stat-label">AI 辅助完成</span>
            </div>
            <div className="ai-showcase__stat">
              <span className="ai-showcase__stat-value mono">3天</span>
              <span className="ai-showcase__stat-label">从0到上线</span>
            </div>
            <div className="ai-showcase__stat">
              <span className="ai-showcase__stat-value mono">9+</span>
              <span className="ai-showcase__stat-label">技术栈掌握</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function highlightSyntax(line) {
  return line
    .replace(/(\/\/.*$)/g, '<span style="color:#64748b">$1</span>')
    .replace(/\b(import|export|default|from|const|let|var|function|return|if|else|useState|useEffect)\b/g, '<span style="color:#c084fc">$1</span>')
    .replace(/\b(gsap|ScrollTrigger)\b/g, '<span style="color:#22d3ee">$1</span>')
    .replace(/(['"`])(.*?)\1/g, '<span style="color:#86efac">$1$2$1</span>')
    .replace(/\b(\d+)\b/g, '<span style="color:#fbbf24">$1</span>');
}
