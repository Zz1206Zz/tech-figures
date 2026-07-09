import { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import HeroCard from './components/hero/HeroCard';
import StatCard from './components/stats/StatCard';
import AboutCard from './components/about/AboutCard';
import MethodCards from './components/method/MethodCards';
import SubjectCard from './components/subjects/SubjectCard';
import AIShowcase from './components/ai-showcase/AIShowcase';
import StrengthList from './components/strengths/StrengthList';
import QuoteCard from './components/quote/QuoteCard';
import ContactCard from './components/contact/ContactCard';
import {
  siteConfig,
  heroStatus,
  heroTypingTexts,
  stats,
  aboutInfo,
  methods,
  subjects,
  aiShowcase,
  strengths,
  quoteData,
  contactData,
  navItems,
} from './data/content';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      <Sidebar navItems={navItems} activeSection={activeSection} />

      <main className="app__main">
        <div className="app__grid">
          <HeroCard
            siteConfig={siteConfig}
            heroStatus={heroStatus}
            typingTexts={heroTypingTexts}
          />

          <StatCard stats={stats} />

          <AboutCard aboutInfo={aboutInfo} price={siteConfig.price} />

          <MethodCards methods={methods} />

          <SubjectCard subjects={subjects} />

          <AIShowcase data={aiShowcase} />

          <StrengthList strengths={strengths} />

          <QuoteCard quoteData={quoteData} />

          <ContactCard contactData={contactData} />
        </div>

        <footer className="app__footer">
          <p className="mono">
            © 2026 {siteConfig.name} · {siteConfig.location} · 天道酬勤
          </p>
          <p className="app__footer-note">
            Built with ❤️ and AI
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
