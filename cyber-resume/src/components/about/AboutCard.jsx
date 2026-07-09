import { MapPin, GraduationCap, BookOpen, Monitor, Tag, User } from 'lucide-react';
import './AboutCard.css';

const iconMap = {
  MapPin,
  GraduationCap,
  BookOpen,
  Monitor,
};

export default function AboutCard({ aboutInfo, price }) {
  return (
    <section id="about" className="about-card animate-on-scroll">
      <div className="about-card__header">
        <h2 className="about-card__title">
          <User size={18} />
          <span>关于我</span>
        </h2>
      </div>

      <div className="about-card__grid">
        {aboutInfo.map((item, index) => {
          const Icon = iconMap[item.icon];
          return (
            <div key={index} className="about-card__item">
              <div className="about-card__item-icon">
                {Icon && <Icon size={18} />}
              </div>
              <div className="about-card__item-content">
                <h3 className="about-card__item-title">{item.title}</h3>
                <p className="about-card__item-desc">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="about-card__price">
        <Tag size={16} className="about-card__price-icon" />
        <div className="about-card__price-info">
          <span className="about-card__price-label">课时费用</span>
          <span className="about-card__price-value mono">{price}</span>
        </div>
        <span className="about-card__price-note">首节优惠试听 · 价格面议</span>
      </div>
    </section>
  );
}
