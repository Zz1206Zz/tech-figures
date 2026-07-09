import { useState, useEffect } from 'react';
import {
  Terminal,
  BarChart3,
  User,
  Lightbulb,
  BookMarked,
  Sparkles,
  ShieldCheck,
  Quote,
  MessageCircle,
} from 'lucide-react';
import './Sidebar.css';

const iconMap = {
  Terminal,
  BarChart3,
  User,
  Lightbulb,
  BookMarked,
  Sparkles,
  ShieldCheck,
  Quote,
  MessageCircle,
};

export default function Sidebar({ navItems, activeSection }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside
      className={`sidebar ${isHovered ? 'sidebar--expanded' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="sidebar__logo">
        <Terminal size={20} className="sidebar__logo-icon" />
        {isHovered && (
          <span className="sidebar__logo-text mono">Zxz.dev</span>
        )}
      </div>

      <nav className="sidebar__nav">
        {navItems.map((item) => {
          const IconComponent = iconMap[item.icon];
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              className={`sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`}
              onClick={() => handleNavClick(item.id)}
              title={item.label}
            >
              {IconComponent && <IconComponent size={18} />}
              {isHovered && (
                <span className="sidebar__nav-label">{item.label}</span>
              )}
              {isActive && <span className="sidebar__nav-indicator" />}
            </button>
          );
        })}
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__status">
          <span className="sidebar__status-dot" />
          {isHovered && (
            <span className="sidebar__status-text">System Online</span>
          )}
        </div>
      </div>
    </aside>
  );
}
