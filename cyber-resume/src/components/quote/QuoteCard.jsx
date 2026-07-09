import { Quote } from 'lucide-react';
import './QuoteCard.css';

export default function QuoteCard({ quoteData }) {
  return (
    <section id="quote" className="quote-card animate-on-scroll">
      <div className="quote-card__icon">
        <Quote size={32} />
      </div>
      <blockquote className="quote-card__text">
        {quoteData.text}
      </blockquote>
      <cite className="quote-card__author">— {quoteData.author}</cite>
    </section>
  );
}
