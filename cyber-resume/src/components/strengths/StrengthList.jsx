import {
  Zap,
  TrendingUp,
  Globe,
  Target,
  Bot,
  Handshake,
  ShieldCheck,
} from 'lucide-react';
import './StrengthList.css';

const iconMap = {
  Zap,
  TrendingUp,
  Globe,
  Target,
  Bot,
  Handshake,
};

export default function StrengthList({ strengths }) {
  return (
    <section id="strengths" className="strength-section animate-on-scroll">
      <div className="strength-section__header">
        <h2 className="strength-section__title">
          <ShieldCheck size={18} />
          <span>核心优势</span>
        </h2>
      </div>

      <div className="strength-list">
        {strengths.map((item, index) => {
          const Icon = iconMap[item.icon];
          return (
            <div
              key={index}
              className={`strength-item ${item.highlight ? 'strength-item--highlight' : ''}`}
            >
              <div className="strength-item__icon">
                {Icon && <Icon size={18} />}
              </div>
              <div className="strength-item__content">
                <h3 className="strength-item__title">
                  {item.title}
                  {item.highlight && (
                    <span className="strength-item__tag mono">亮点</span>
                  )}
                </h3>
                <p className="strength-item__desc">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
