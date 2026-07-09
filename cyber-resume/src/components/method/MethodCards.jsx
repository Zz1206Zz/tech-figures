import { Lightbulb } from 'lucide-react';
import './MethodCards.css';

export default function MethodCards({ methods }) {
  return (
    <section id="method" className="method-section animate-on-scroll">
      <div className="method-section__header">
        <h2 className="method-section__title">
          <Lightbulb size={18} />
          <span>教学方法论</span>
        </h2>
        <p className="method-section__subtitle">
          不教"怎么记住一道题的答案"，而是教"怎么分析一类题"
        </p>
      </div>

      <div className="method-grid">
        {methods.map((method, index) => (
          <div key={index} className="method-card">
            <div className="method-card__step mono">{method.step}</div>
            <h3 className="method-card__title">{method.title}</h3>
            <p className="method-card__desc">{method.desc}</p>
            {index < methods.length - 1 && (
              <div className="method-card__arrow">→</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
