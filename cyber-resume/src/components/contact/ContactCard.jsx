import { MessageCircle, MapPin, Monitor, DollarSign } from 'lucide-react';
import './ContactCard.css';

const infoIcons = {
  '广州增城': MapPin,
  '线上线下均可': Monitor,
  '60-100元/小时': DollarSign,
  '首节优惠试听': DollarSign,
};

export default function ContactCard({ contactData }) {
  return (
    <section id="contact" className="contact-card animate-on-scroll">
      <div className="contact-card__content">
        <div className="contact-card__info">
          <h2 className="contact-card__title">
            <MessageCircle size={20} />
            <span>{contactData.title}</span>
          </h2>
          <p className="contact-card__description">{contactData.description}</p>

          <div className="contact-card__tags">
            {contactData.infoTags.map((tag, index) => {
              const Icon = infoIcons[tag];
              return (
                <div key={index} className="contact-card__tag">
                  {Icon && <Icon size={14} />}
                  <span>{tag}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="contact-card__qr">
          <div className="contact-card__qr-wrapper">
            <img
              src={contactData.qrImage}
              alt="微信二维码"
              className="contact-card__qr-image"
            />
            <div className="contact-card__qr-glow" />
          </div>
          <p className="contact-card__qr-text">{contactData.qrText}</p>
        </div>
      </div>
    </section>
  );
}
