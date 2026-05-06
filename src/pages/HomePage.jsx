import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, MapPin, Grid, Bell, MessageSquare, Bookmark,
  ChevronDown, MapPin as Pin, Briefcase, Clock, User,
  Home, FileText, MessageCircle, Star, ToggleLeft, ToggleRight,
  ArrowRight, CheckCircle, Circle, ChevronRight, Menu, X, Users
} from 'lucide-react';
import './HomePage.css';
import logo from '../assets/logo-vasista.png';
import BottomNav from '../components/BottomNav';
/* ─── DATA ──────────────────────────────────────────────── */
const JOBS = [
  {
    id: 1, icon: '🏗️', color: '#e8f4fd',
    title: 'Site Supervisor',
    company: 'BuildTech Engineers Pvt. Ltd.',
    location: 'Noida, Uttar Pradesh',
    exp: '3-5 Yrs',
    salary: '₹25,000 - ₹35,000 /mo',
    time: '2h ago',
  },
  {
    id: 2, icon: '🏢', color: '#edf7f0',
    title: 'Mechanical Engineer',
    company: 'ABC Infra Solutions',
    location: 'Pune, Maharashtra',
    exp: '2-4 Yrs',
    salary: '₹30,000 - ₹45,000 /mo',
    time: '5h ago',
  },
  {
    id: 3, icon: '⚡', color: '#fdf3e8',
    title: 'Electrical Technician',
    company: 'MEP Contractors Pvt. Ltd.',
    location: 'Mumbai, Maharashtra',
    exp: '1-3 Yrs',
    salary: '₹18,000 - ₹25,000 /mo',
    time: '1d ago',
  },
];

const COMPANIES = [
  { id: 1, name: 'L&T Construction', abbr: 'L&T', color: '#e63946' },
  { id: 2, name: 'Tata Projects', abbr: 'TATA', color: '#1d3557' },
  { id: 3, name: 'JSW Group', abbr: 'JSW', color: '#e76f51' },
  { id: 4, name: 'Shapoorji Paltonji', abbr: 'SP', color: '#2a9d8f' },
  { id: 5, name: 'Reliance Industries', abbr: 'RIL', color: '#f4a261' },
  { id: 6, name: 'Adani Group', abbr: 'adani', color: '#023e8a' },
];

const PROFILE_ITEMS = [
  { label: 'Basic Info', done: true },
  { label: 'Experience', done: true },
  { label: 'Skills', done: true },
  { label: 'Resume', done: false },
  { label: 'Profile Photo', done: false },
];

const ALERTS = [
  { id: 1, title: 'Supervisor in Noida', freq: 'Daily', on: true },
  { id: 2, title: 'Engineer in Pune', freq: 'Daily', on: true },
  { id: 3, title: 'Technician in Mumbai', freq: 'Weekly', on: true },
];

const POPULAR = ['Electrician', 'Mechanical Engineer', 'Supervisor', 'Safety Officer', 'Welder'];

const QUICK_ACTIONS = [
  { label: 'Find Jobs', icon: Briefcase, color: '#4361ee' },
  { label: 'Find Candidates', icon: User, color: '#f77f00' },
  { label: 'My Applications', icon: FileText, color: '#9b5de5' },
  { label: 'Saved', icon: Bookmark, color: '#2dc653' },
];

/* ─── COMPONENT ─────────────────────────────────────────── */
const HomePage = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState(ALERTS);
  const [savedJobs, setSavedJobs] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  const toggleAlert = (id) =>
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, on: !a.on } : a));

  const toggleSave = (id) =>
    setSavedJobs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  /* ── Company Logo Badge ── */
  const CompanyBadge = ({ c }) => (
    <div className="hp-company-card">
      <div className="hp-company-logo" style={{ background: c.color + '18', color: c.color }}>
        <span>{c.abbr}</span>
      </div>
      <p className="hp-company-name">{c.name}</p>
    </div>
  );

  /* ── Job Card ── */
  const JobCard = ({ job }) => (
    <div className="hp-job-card">
      <div className="hp-job-icon" style={{ background: job.color }}>{job.icon}</div>
      <div className="hp-job-info">
        <div className="hp-job-top">
          <div>
            <h3 className="hp-job-title">{job.title}</h3>
            <p className="hp-job-company">{job.company}</p>
          </div>
          <div className="hp-job-meta-right">
            <span className="hp-job-time"><Clock size={12} /> {job.time}</span>
            <button
              className={`hp-save-btn ${savedJobs.includes(job.id) ? 'saved' : ''}`}
              onClick={() => toggleSave(job.id)}
            >
              <Bookmark size={15} />
            </button>
          </div>
        </div>
        <div className="hp-job-tags">
          <span><Pin size={12} /> {job.location}</span>
          <span><Briefcase size={12} /> {job.exp}</span>
          <span className="hp-salary">{job.salary}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="hp-root">

      {/* ════════════════════════════════════════
          DESKTOP LAYOUT
      ════════════════════════════════════════ */}
      <div className="hp-desktop">

        {/* ── Header ── */}
        <header className="hp-header">
          <div className="hp-header-inner">
            <div className="hp-logo-wrap">
              <img src={logo} alt="Vasista" className="hp-logo" />
            </div>

            <nav className="hp-nav">
              {['Home', 'Jobs', 'Companies', 'Candidates', 'My Applications'].map(item => (
                <a
                  key={item}
                  href="#"
                  className={`hp-nav-link ${item === 'Home' ? 'active' : ''}`}
                  onClick={e => {
                    e.preventDefault();
                    if (item === 'Jobs') navigate('/jobs');
                    if (item === 'Companies') navigate('/companies');
                    if (item === 'Candidates') navigate('/candidates');
                  }}
                >
                  {item === 'Home' && <Home size={15} />}
                  {item === 'Jobs' && <Briefcase size={15} />}
                  {item === 'Companies' && <Grid size={15} />}
                  {item === 'Candidates' && <User size={15} />}
                  {item === 'My Applications' && <FileText size={15} />}
                  {item}
                </a>
              ))}
            </nav>

            <div className="hp-header-right">
              <button className="hp-icon-btn"><MessageSquare size={18} /></button>
              <button className="hp-icon-btn hp-notif">
                <Bell size={18} />
                <span className="hp-badge">2</span>
              </button>
              <div className="hp-profile-chip" onClick={() => navigate('/profile')}>
                <div className="hp-avatar">RS</div>
                <div className="hp-profile-text">
                  <span className="hp-profile-name">Rohit Sharma</span>
                  <span className="hp-profile-role">Job Seeker</span>
                </div>
                <ChevronDown size={14} />
              </div>
            </div>
          </div>
        </header>

        {/* ── Hero ── */}
        <section className="hp-hero">
          <div className="hp-hero-content">
            <h1 className="hp-hero-title">Good Morning, Rohit! 👋</h1>
            <p className="hp-hero-sub">Explore opportunities and take the next step in your career.</p>

            <div className="hp-search-bar">
              <div className="hp-search-input-wrap">
                <Search size={16} className="hp-search-icon" />
                <input type="text" placeholder="Job title, skills, keyword or company" className="hp-search-input" />
              </div>
              <div className="hp-search-divider" />
              <div className="hp-search-select">
                <MapPin size={15} />
                <span>All Locations</span>
                <ChevronDown size={13} />
              </div>
              <div className="hp-search-divider" />
              <div className="hp-search-select">
                <Grid size={15} />
                <span>All Categories</span>
                <ChevronDown size={13} />
              </div>
              <button className="hp-search-btn">Search Jobs</button>
            </div>

            <div className="hp-popular">
              <span className="hp-popular-label">Popular Searches:</span>
              {POPULAR.map(tag => (
                <button key={tag} className="hp-popular-tag">{tag}</button>
              ))}
              <button className="hp-popular-viewall">View All</button>
            </div>
          </div>

          {/* Hero right image / branding */}
          <div className="hp-hero-visual">
            <div className="hp-hero-bg-v">V</div>
            <div className="hp-hero-people">
              <div className="hp-hero-avatar hp-hero-av1">👨‍💼</div>
              <div className="hp-hero-avatar hp-hero-av2">👩‍💼</div>
            </div>
          </div>
        </section>

        {/* ── Main Grid ── */}
        <div className="hp-main-grid">

          {/* ── LEFT COLUMN ── */}
          <div className="hp-left-col">

            {/* Recommended Jobs */}
            <div className="hp-section-card">
              <div className="hp-section-header">
                <h2 className="hp-section-title">Recommended Jobs for You</h2>
                <a href="#" className="hp-view-all">View All</a>
              </div>
              <div className="hp-job-list">
                {JOBS.map(job => <JobCard key={job.id} job={job} />)}
              </div>
              <div className="hp-section-footer">
                <a href="#" className="hp-view-all-jobs">View All Jobs</a>
              </div>
            </div>

            {/* Top Companies */}
            <div className="hp-section-card">
              <div className="hp-section-header">
                <h2 className="hp-section-title">Top Companies Hiring</h2>
                <a href="#" className="hp-view-all">View All</a>
              </div>
              <div className="hp-companies-grid">
                {COMPANIES.map(c => <CompanyBadge key={c.id} c={c} />)}
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="hp-right-col">

            {/* Profile Strength */}
            <div className="hp-section-card">
              <h2 className="hp-section-title">Profile Strength</h2>
              <div className="hp-profile-strength">
                <div className="hp-circular-progress">
                  <svg viewBox="0 0 100 100" className="hp-ring-svg">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f0f0f0" strokeWidth="10" />
                    <circle
                      cx="50" cy="50" r="40" fill="none"
                      stroke="url(#prog-grad)" strokeWidth="10"
                      strokeDasharray="251.2"
                      strokeDashoffset="75.4"
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                    <defs>
                      <linearGradient id="prog-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#001f3f" />
                        <stop offset="100%" stopColor="#f29727" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="hp-ring-label">
                    <span className="hp-ring-pct">70%</span>
                    <span className="hp-ring-sub">Good</span>
                  </div>
                </div>

                <div className="hp-profile-checklist">
                  {PROFILE_ITEMS.map(item => (
                    <div key={item.label} className="hp-profile-check-item">
                      {item.done
                        ? <CheckCircle size={15} className="hp-check-done" />
                        : <Circle size={15} className="hp-check-todo" />
                      }
                      <span className={item.done ? 'hp-check-label-done' : 'hp-check-label-todo'}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <a href="#" className="hp-improve-link">Improve Profile</a>
            </div>

            {/* Job Alerts */}
            <div className="hp-section-card">
              <div className="hp-section-header">
                <h2 className="hp-section-title">Job Alerts</h2>
                <a href="#" className="hp-view-all">Manage</a>
              </div>
              <div className="hp-alerts-list">
                {alerts.map(alert => (
                  <div key={alert.id} className="hp-alert-item">
                    <Bell size={15} className="hp-alert-icon" />
                    <div className="hp-alert-info">
                      <p className="hp-alert-title">{alert.title}</p>
                      <p className="hp-alert-freq">{alert.freq}</p>
                    </div>
                    <button
                      className={`hp-toggle ${alert.on ? 'on' : ''}`}
                      onClick={() => toggleAlert(alert.id)}
                    >
                      <span className="hp-toggle-knob" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Tips */}
            <div className="hp-section-card">
              <div className="hp-section-header">
                <h2 className="hp-section-title">Career Tips</h2>
                <a href="#" className="hp-view-all">View All</a>
              </div>
              <div className="hp-career-tip">
                <div className="hp-tip-img">📈</div>
                <div className="hp-tip-text">
                  <p className="hp-tip-title">5 Tips to Improve Your Profile Visibility</p>
                  <p className="hp-tip-sub">Complete your profile and get noticed by recruiters.</p>
                </div>
              </div>
              <div className="hp-tip-dots">
                <span className="hp-dot active" />
                <span className="hp-dot" />
                <span className="hp-dot" />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          MOBILE LAYOUT
      ════════════════════════════════════════ */}
      <div className="hp-mobile">

        {/* Mobile Header */}
        <header className="hp-mob-header">
          <img src={logo} alt="Vasista" className="hp-mob-logo" />
          <div className="hp-mob-header-icons">
            <button className="hp-icon-btn"><MessageSquare size={20} /></button>
            <button className="hp-icon-btn hp-notif">
              <Bell size={20} />
              <span className="hp-badge">2</span>
            </button>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="hp-mob-content">

          {/* Hero greeting */}
          <div className="hp-mob-hero">
            <h1 className="hp-mob-greeting">Good Morning, Rohit! 👋</h1>
            <p className="hp-mob-sub">Explore opportunities and take the next step in your career.</p>
            <div className="hp-mob-search">
              <Search size={15} className="hp-search-icon" />
              <input type="text" placeholder="Search jobs, skills, keyword..." className="hp-search-input" />
            </div>
          </div>

          {/* Quick actions */}
          <div className="hp-mob-quick">
            {QUICK_ACTIONS.map(action => (
              <button key={action.label} className="hp-quick-btn">
                <div className="hp-quick-icon" style={{ background: action.color + '1a', color: action.color }}>
                  <action.icon size={22} />
                </div>
                <span className="hp-quick-label">{action.label}</span>
              </button>
            ))}
          </div>

          {/* Recommended Jobs */}
          <div className="hp-mob-section">
            <div className="hp-section-header">
              <h2 className="hp-section-title">Recommended Jobs</h2>
              <a href="#" className="hp-view-all">View All</a>
            </div>
            {JOBS.map(job => (
              <div key={job.id} className="hp-mob-job-card">
                <div className="hp-job-icon" style={{ background: job.color }}>{job.icon}</div>
                <div className="hp-job-info">
                  <div className="hp-job-top">
                    <div>
                      <h3 className="hp-job-title">{job.title}</h3>
                      <p className="hp-job-company">{job.company}</p>
                    </div>
                    <button
                      className={`hp-save-btn ${savedJobs.includes(job.id) ? 'saved' : ''}`}
                      onClick={() => toggleSave(job.id)}
                    >
                      <Bookmark size={15} />
                    </button>
                  </div>
                  <div className="hp-mob-job-meta">
                    <span><Pin size={11} /> {job.location.split(',')[0]}, {job.location.split(', ')[1]?.slice(0,2)}</span>
                    <span><Briefcase size={11} /> {job.exp}</span>
                  </div>
                  <p className="hp-mob-salary">{job.salary}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Top Companies */}
          <div className="hp-mob-section">
            <div className="hp-section-header">
              <h2 className="hp-section-title">Top Companies</h2>
              <a href="#" className="hp-view-all">View All</a>
            </div>
            <div className="hp-mob-companies">
              {COMPANIES.map(c => (
                <div key={c.id} className="hp-mob-company-logo" style={{ background: c.color + '18', color: c.color }}>
                  <span>{c.abbr}</span>
                </div>
              ))}
            </div>
          </div>

          {/* bottom padding for nav bar */}
          <div style={{ height: '80px' }} />
        </div>

        {/* Bottom Navigation */}
        <BottomNav activeTab="home" />
      </div>
    </div>
  );
};

export default HomePage;
