import { Sigma, Atom, Languages, BookMarked } from 'lucide-react';
import './SubjectCard.css';

const iconMap = {
  Sigma,
  Atom,
  Languages,
};

export default function SubjectCard({ subjects }) {
  return (
    <section id="subjects" className="subject-section animate-on-scroll">
      <div className="subject-section__header">
        <h2 className="subject-section__title">
          <BookMarked size={18} />
          <span>辅导科目</span>
        </h2>
      </div>

      <div className="subject-grid">
        {subjects.map((subject) => {
          const Icon = iconMap[subject.icon];
          return (
            <div key={subject.id} className="subject-card">
              <div className="subject-card__icon">
                {Icon && <Icon size={24} />}
              </div>
              <h3 className="subject-card__title">{subject.title}</h3>
              <p className="subject-card__desc">{subject.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
