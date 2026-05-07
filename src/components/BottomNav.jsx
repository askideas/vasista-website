import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Briefcase, Grid, Users, User } from 'lucide-react';
import './BottomNav.css';

const NAV_ITEMS = [
  { key: 'home',       label: 'Home',       icon: Home,      path: '/home' },
  { key: 'jobs',       label: 'Jobs',       icon: Briefcase, path: '/jobs' },
  { key: 'companies',  label: 'Companies',  icon: Grid,      path: '/companies' },
  { key: 'candidates', label: 'Candidates', icon: Users,     path: '/candidates' },
  { key: 'profile',    label: 'Profile',    icon: User,      path: '/profile' },
];

const BottomNav = ({ activeTab, items, onTabClick }) => {
  const navigate = useNavigate();
  const navItems = items || NAV_ITEMS;

  return (
    <nav className="global-bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.key;
        return (
          <button
            key={item.key}
            className={`global-bottom-nav-btn ${isActive ? 'active' : ''}`}
            onClick={() => {
              if (onTabClick) {
                onTabClick(item.key);
              } else if (item.path && item.path !== '#') {
                navigate(item.path);
              }
            }}
          >
            <Icon size={20} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
