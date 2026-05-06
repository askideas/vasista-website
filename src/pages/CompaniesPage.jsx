import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, MapPin, Grid, Bell, MessageSquare, Bookmark,
  ChevronDown, ChevronRight, Briefcase, User, FileText,
  MessageCircle, Home, SlidersHorizontal, Menu, Filter,
  Building2, Users, MapPin as Pin
} from 'lucide-react';
import './CompaniesPage.css';
import logo from '../assets/logo-vasista.png';

/* ─── DATA ──────────────────────────────────────────── */
const TOP_COMPANIES = [
  { id: 1, abbr: 'TATA',    name: 'Tata Consultancy\nServices',  color: '#1d3557' },
  { id: 2, abbr: 'Infosys', name: 'Infosys Limited',             color: '#007CC3' },
  { id: 3, abbr: 'wipro',   name: 'Wipro Limited',               color: '#9B2335' },
  { id: 4, abbr: 'HCL',     name: 'HCL Technologies',            color: '#009bde' },
  { id: 5, abbr: 'Tech\nMahindra', name: 'Tech Mahindra',        color: '#cc0000' },
  { id: 6, abbr: 'L&T',     name: 'Larsen & Toubro',             color: '#004990' },
];

const ALL_COMPANIES = [
  {
    id: 1, abbr: 'TATA',  color: '#1d3557',
    name: 'Tata Consultancy Services',
    industry: 'IT Services & Consulting',
    location: 'Mumbai, Maharashtra',
    size: '100K+ Employees', jobs: 128,
  },
  {
    id: 2, abbr: 'Infosys', color: '#007CC3',
    name: 'Infosys Limited',
    industry: 'IT Services & Consulting',
    location: 'Bangalore, Karnataka',
    size: '50K+ Employees', jobs: 98,
  },
  {
    id: 3, abbr: 'wipro', color: '#9B2335',
    name: 'Wipro Limited',
    industry: 'IT Services & Consulting',
    location: 'Bangalore, Karnataka',
    size: '20K+ Employees', jobs: 76,
  },
  {
    id: 4, abbr: 'HCL', color: '#009bde',
    name: 'HCL Technologies',
    industry: 'IT Services & Consulting',
    location: 'Noida, Uttar Pradesh',
    size: '50K+ Employees', jobs: 65,
  },
  {
    id: 5, abbr: 'TM', color: '#cc0000',
    name: 'Tech Mahindra',
    industry: 'IT Services & Consulting',
    location: 'Pune, Maharashtra',
    size: '20K+ Employees', jobs: 54,
  },
  {
    id: 6, abbr: 'L&T', color: '#004990',
    name: 'Larsen & Toubro',
    industry: 'Construction & Engineering',
    location: 'Mumbai, Maharashtra',
    size: '50K+ Employees', jobs: 48,
  },
  {
    id: 7, abbr: 'acce', color: '#A100FF',
    name: 'Accenture',
    industry: 'IT Services & Consulting',
    location: 'Bangalore, Karnataka',
    size: '7K+ Employees', jobs: 42,
  },
  {
    id: 8, abbr: 'Deloitte', color: '#86BC25',
    name: 'Deloitte',
    industry: 'Professional Services',
    location: 'Hyderabad, Telangana',
    size: '10K+ Employees', jobs: 38,
  },
];

const NAV_ITEMS = [
  { key: 'home',         label: 'Home',         icon: Home,          path: '/home' },
  { key: 'jobs',         label: 'Jobs',         icon: Briefcase,     path: '/jobs' },
  { key: 'companies',    label: 'Companies',    icon: Building2,     path: '/companies' },
  { key: 'candidates', label: 'Candidates', icon: Users,     path: '/candidates' },
  { key: 'profile',      label: 'Profile',      icon: User,          path: '/profile' },
];

/* ─── COMPONENT ─────────────────────────────────────── */
const CompaniesPage = () => {
  const navigate = useNavigate();
  const [savedCompanies, setSavedCompanies] = useState([]);
  const [activeNav, setActiveNav] = useState('companies');
  const [showMore, setShowMore] = useState(false);

  const toggleSave = (id) =>
    setSavedCompanies(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const displayed = showMore ? ALL_COMPANIES : ALL_COMPANIES.slice(0, 8);

  /* ── City skyline SVG illustration ── */
  const CityIllustration = () => (
    <svg viewBox="0 0 500 180" className="cp-city-svg" xmlns="http://www.w3.org/2000/svg">
      {/* Sun/orange circle */}
      <circle cx="380" cy="80" r="70" fill="#f29727" opacity="0.18" />
      {/* Sky bg */}
      <rect x="0" y="0" width="500" height="180" fill="none"/>
      {/* Buildings back */}
      <rect x="20"  y="90"  width="30" height="90" fill="#b8cfe8" rx="2"/>
      <rect x="55"  y="60"  width="25" height="120" fill="#a0bcda" rx="2"/>
      <rect x="85"  y="75"  width="35" height="105" fill="#b8cfe8" rx="2"/>
      <rect x="125" y="45"  width="28" height="135" fill="#93b4d4" rx="2"/>
      <rect x="158" y="70"  width="22" height="110" fill="#b8cfe8" rx="2"/>
      {/* Tall center buildings */}
      <rect x="195" y="30"  width="40" height="150" fill="#6d9dc5" rx="3"/>
      <rect x="200" y="20"  width="30" height="20"  fill="#5a8ab5" rx="2"/>
      <rect x="240" y="50"  width="50" height="130" fill="#4a7fa8" rx="3"/>
      <rect x="245" y="38"  width="40" height="18"  fill="#3d7099" rx="2"/>
      <rect x="295" y="65"  width="35" height="115" fill="#6d9dc5" rx="3"/>
      {/* Right buildings */}
      <rect x="335" y="80"  width="28" height="100" fill="#93b4d4" rx="2"/>
      <rect x="368" y="55"  width="32" height="125" fill="#b8cfe8" rx="2"/>
      <rect x="405" y="75"  width="25" height="105" fill="#a0bcda" rx="2"/>
      <rect x="435" y="90"  width="30" height="90"  fill="#b8cfe8" rx="2"/>
      <rect x="470" y="100" width="30" height="80"  fill="#c8d9ea" rx="2"/>
      {/* Windows */}
      {[200,210,220,200,210,220,200,210,220,200,210,220].map((x,i) => (
        <rect key={i} x={x} y={35+(i%4)*25} width="6" height="10" fill="rgba(255,255,255,0.5)" rx="1"/>
      ))}
      {/* Ground / grass */}
      <ellipse cx="250" cy="178" rx="260" ry="18" fill="#c8e6c9" opacity="0.5"/>
      {/* Trees */}
      <ellipse cx="170" cy="162" rx="12" ry="10" fill="#66bb6a" opacity="0.7"/>
      <rect x="168" y="165" width="4" height="12" fill="#795548" opacity="0.6"/>
      <ellipse cx="330" cy="160" rx="14" ry="12" fill="#66bb6a" opacity="0.7"/>
      <rect x="328" y="165" width="4" height="14" fill="#795548" opacity="0.6"/>
    </svg>
  );

  /* ── Company Logo Badge ── */
  const LogoBadge = ({ c, size = 'md' }) => (
    <div
      className={`cp-logo-badge ${size}`}
      style={{ background: c.color + '15', color: c.color, borderColor: c.color + '30' }}
    >
      <span>{c.abbr}</span>
    </div>
  );

  return (
    <div className="cp-root">

      {/* ══════════════ DESKTOP ══════════════ */}
      <div className="cp-desktop">

        {/* ── Header ── */}
        <header className="cp-header">
          <div className="cp-header-inner">
            <img src={logo} alt="Vasista" className="cp-logo" onClick={() => navigate('/home')} />
            <nav className="cp-nav">
              {[
                { label: 'Home',           icon: Home,     path: '/home' },
                { label: 'Jobs',           icon: Briefcase,path: '/jobs' },
                { label: 'Companies',      icon: Grid,     path: '/companies' },
                { label: 'Candidates',     icon: User,     path: '/candidates' },
                { label: 'My Applications',icon: FileText, path: '#' },
              ].map(item => (
                <a
                  key={item.label}
                  href={item.path}
                  className={`cp-nav-link ${item.label === 'Companies' ? 'active' : ''}`}
                  onClick={e => { e.preventDefault(); if (item.path !== '#') navigate(item.path); }}
                >
                  <item.icon size={15} /> {item.label}
                </a>
              ))}
            </nav>
            <div className="cp-header-right">
              <button className="cp-icon-btn"><MessageSquare size={18} /></button>
              <button className="cp-icon-btn cp-notif">
                <Bell size={18} /><span className="cp-badge">2</span>
              </button>
              <div className="cp-profile-chip" onClick={() => navigate('/profile')}>
                <div className="cp-avatar">RS</div>
                <div className="cp-profile-text">
                  <span className="cp-profile-name">Rohit Sharma</span>
                  <span className="cp-profile-role">Job Seeker</span>
                </div>
                <ChevronDown size={14} />
              </div>
            </div>
          </div>
        </header>

        {/* ── Hero ── */}
        <div className="cp-hero">
          <div className="cp-hero-text">
            <h1 className="cp-hero-title">Discover great companies<br />and find the right fit for you</h1>
            <p className="cp-hero-sub">Explore top companies and find opportunities to grow your career.</p>
          </div>
          <div className="cp-hero-visual">
            <CityIllustration />
          </div>
        </div>

        {/* ── Search ── */}
        <div className="cp-search-wrap">
          <div className="cp-search-bar">
            <div className="cp-search-left">
              <Search size={16} className="cp-search-ico" />
              <input type="text" placeholder="Search company name, industry or location" className="cp-search-input" />
            </div>
            <div className="cp-search-div" />
            <div className="cp-search-select">
              <MapPin size={15} /> <span>All Locations</span> <ChevronDown size={13} />
            </div>
            <div className="cp-search-div" />
            <div className="cp-search-select">
              <Grid size={15} /> <span>All Industries</span> <ChevronDown size={13} />
            </div>
            <button className="cp-search-btn">Search</button>
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="cp-main">

          {/* Top Companies */}
          <div className="cp-section">
            <div className="cp-section-hdr">
              <h2 className="cp-section-title">Top Companies</h2>
              <a href="#" className="cp-view-all">View All</a>
            </div>
            <div className="cp-top-companies-row">
              {TOP_COMPANIES.map(c => (
                <div key={c.id} className="cp-top-card">
                  <LogoBadge c={c} size="lg" />
                  <p className="cp-top-card-name">{c.name}</p>
                </div>
              ))}
              <button className="cp-scroll-arrow"><ChevronRight size={20} /></button>
            </div>
          </div>

          {/* All Companies */}
          <div className="cp-section">
            <div className="cp-all-hdr">
              <h2 className="cp-section-title">All Companies</h2>
              <div className="cp-filters-row">
                <div className="cp-filter-select">
                  <Grid size={14} /> <span>All Industries</span> <ChevronDown size={13} />
                </div>
                <div className="cp-filter-select">
                  <Users size={14} /> <span>All Company Sizes</span> <ChevronDown size={13} />
                </div>
                <div className="cp-sort-wrap">
                  <span className="cp-sort-label">Sort by:</span>
                  <div className="cp-sort-select">
                    <span>Most Popular</span> <ChevronDown size={13} />
                  </div>
                </div>
              </div>
            </div>

            <div className="cp-companies-grid">
              {displayed.map(c => (
                <div key={c.id} className="cp-company-card">
                  <LogoBadge c={c} size="xl" />
                  <div className="cp-card-info">
                    <h3 className="cp-card-name">{c.name}</h3>
                    <p className="cp-card-industry">{c.industry}</p>
                    <div className="cp-card-meta">
                      <span><Pin size={12} /> {c.location}</span>
                    </div>
                    <div className="cp-card-meta">
                      <span><Users size={12} /> {c.size}</span>
                      <span className="cp-jobs-count"><Briefcase size={12} /> {c.jobs} Open Jobs</span>
                    </div>
                  </div>
                  <button className="cp-view-jobs-btn" onClick={() => navigate('/jobs')}>
                    View Jobs
                  </button>
                </div>
              ))}
            </div>

            <div className="cp-view-more-wrap">
              <button className="cp-view-more-btn" onClick={() => setShowMore(v => !v)}>
                {showMore ? 'Show Less' : 'View More Companies'}
                <ChevronDown size={16} className={showMore ? 'rotated' : ''} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════ MOBILE ══════════════ */}
      <div className="cp-mobile">

        {/* Mobile header */}
        <header className="cp-mob-header">
          <button className="cp-icon-btn"><Menu size={20} /></button>
          <h1 className="cp-mob-title">Companies</h1>
          <button className="cp-icon-btn"><Filter size={20} /></button>
        </header>

        <div className="cp-mob-content">

          {/* Mobile hero */}
          <div className="cp-mob-hero">
            <div className="cp-mob-hero-text">
              <h2 className="cp-mob-hero-title">Discover great companies and find the right fit for you</h2>
              <p className="cp-mob-hero-sub">Explore top companies and find opportunities to grow your career.</p>
            </div>
            <div className="cp-mob-hero-img">
              <CityIllustration />
            </div>
          </div>

          {/* Mobile search */}
          <div className="cp-mob-search-wrap">
            <div className="cp-mob-search">
              <Search size={14} className="cp-search-ico" />
              <input type="text" placeholder="Search company name or industry" className="cp-search-input" />
            </div>
            <div className="cp-mob-search-row2">
              <div className="cp-mob-select">
                <MapPin size={13} /> <span>All Locations</span> <ChevronDown size={12} />
              </div>
              <div className="cp-mob-select">
                <SlidersHorizontal size={13} /> <span>Filters</span> <ChevronDown size={12} />
              </div>
            </div>
          </div>

          {/* Top Companies */}
          <div className="cp-mob-section">
            <div className="cp-section-hdr">
              <h2 className="cp-section-title">Top Companies</h2>
              <a href="#" className="cp-view-all">View All</a>
            </div>
            <div className="cp-mob-top-row">
              {TOP_COMPANIES.map(c => (
                <div key={c.id} className="cp-mob-top-card">
                  <LogoBadge c={c} size="md" />
                  <p className="cp-mob-top-name">{c.name.replace('\n', ' ')}</p>
                </div>
              ))}
            </div>
          </div>

          {/* All Companies list */}
          <div className="cp-mob-section">
            <div className="cp-all-hdr-mob">
              <h2 className="cp-section-title">All Companies</h2>
              <div className="cp-mob-sort">
                <span>Sort by: Most Popular</span>
                <ChevronDown size={13} />
              </div>
            </div>

            <div className="cp-mob-list">
              {displayed.map(c => (
                <div key={c.id} className="cp-mob-company-item">
                  <LogoBadge c={c} size="md" />
                  <div className="cp-mob-item-info">
                    <h3 className="cp-card-name">{c.name}</h3>
                    <p className="cp-card-industry">{c.industry}</p>
                    <div className="cp-mob-item-meta">
                      <span><Pin size={11} /> {c.location.split(',')[0]}, {c.location.split(', ')[1]?.slice(0, 2)}</span>
                      <span><Users size={11} /> {c.size}</span>
                      <span className="cp-jobs-count"><Briefcase size={11} /> {c.jobs} Open Jobs</span>
                    </div>
                  </div>
                  <button
                    className={`cp-mob-save ${savedCompanies.includes(c.id) ? 'saved' : ''}`}
                    onClick={() => toggleSave(c.id)}
                  >
                    <Bookmark size={15} />
                  </button>
                </div>
              ))}
            </div>

            <button className="cp-view-more-btn mob" onClick={() => setShowMore(v => !v)}>
              {showMore ? 'Show Less' : 'View More Companies'}
              <ChevronDown size={15} className={showMore ? 'rotated' : ''} />
            </button>
          </div>

          <div style={{ height: '80px' }} />
        </div>

        {/* Bottom Nav */}
        <nav className="cp-mob-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.key}
              className={`cp-mob-nav-btn ${activeNav === item.key ? 'active' : ''}`}
              onClick={() => { setActiveNav(item.key); if (item.path) navigate(item.path); }}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default CompaniesPage;
