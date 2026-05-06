import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Search, MapPin, SlidersHorizontal, Bell, MessageSquare,
  Bookmark, Briefcase, Clock, ChevronDown, ChevronUp,
  Home, FileText, User, Grid,
  ArrowRight, ChevronLeft, ChevronRight, Star, Menu, X, Filter, Users
} from 'lucide-react';
import './JobsPage.css';
import logo from '../assets/logo-vasista.png';
import BottomNav from '../components/BottomNav';
/* ─── DATA ─────────────────────────────────────────── */
const ALL_JOBS = [
  {
    id: 1, featured: true,
    icon: '🏗️', iconBg: '#e8f4fd', iconColor: '#2563eb',
    title: 'Site Supervisor',
    company: 'BuildTech Engineers Pvt. Ltd.',
    location: 'Noida, Uttar Pradesh', exp: '3-5 Yrs',
    salary: '₹25,000 - ₹35,000 /mo',
    type: 'Full Time', mode: 'On-site', time: '2h ago',
  },
  {
    id: 2, featured: false,
    icon: '🏢', iconBg: '#edf7f0', iconColor: '#16a34a',
    title: 'Mechanical Engineer',
    company: 'ABC Infra Solutions',
    location: 'Pune, Maharashtra', exp: '2-4 Yrs',
    salary: '₹30,000 - ₹45,000 /mo',
    type: 'Full Time', mode: 'On-site', time: '5h ago',
  },
  {
    id: 3, featured: false,
    icon: '⚡', iconBg: '#fdf3e8', iconColor: '#ea580c',
    title: 'Electrical Technician',
    company: 'MEP Contractors Pvt. Ltd.',
    location: 'Mumbai, Maharashtra', exp: '1-3 Yrs',
    salary: '₹18,000 - ₹25,000 /mo',
    type: 'Full Time', mode: 'On-site', time: '1d ago',
  },
  {
    id: 4, featured: false,
    icon: '🛡️', iconBg: '#fef3c7', iconColor: '#d97706',
    title: 'Safety Officer',
    company: 'Reliable Constructions',
    location: 'Delhi NCR', exp: '2-4 Yrs',
    salary: '₹20,000 - ₹30,000 /mo',
    type: 'Full Time', mode: 'On-site', time: '1d ago',
  },
  {
    id: 5, featured: false,
    icon: '🔧', iconBg: '#f3e8ff', iconColor: '#9333ea',
    title: 'Welder',
    company: 'Galaxy Infra Projects',
    location: 'Noida, UP', exp: '1-3 Yrs',
    salary: '₹16,000 - ₹22,000 /mo',
    type: 'Full Time', mode: 'On-site', time: '2d ago',
  },
];

const LOCATIONS = ['Noida', 'Delhi NCR', 'Bangalore', 'Mumbai', 'Pune'];
const JOB_TYPES = ['Full Time', 'Part Time', 'Contract', 'Internship', 'Temporary'];
const EXPERIENCES = ['0 - 1 Years', '1 - 3 Years', '3 - 5 Years'];
const POPULAR = ['Site Supervisor', 'Mechanical Engineer', 'Safety Officer', 'Civil Engineer', 'Electrician'];

const NAV_ITEMS = [
  { key: 'home',         label: 'Home',         icon: Home,      path: '/home' },
  { key: 'jobs',         label: 'Jobs',         icon: Briefcase, path: '/jobs' },
  { key: 'companies',    label: 'Companies',    icon: Grid,      path: '/companies' },
  { key: 'candidates', label: 'Candidates', icon: Users,     path: '/candidates' },
  { key: 'profile',      label: 'Profile',      icon: User,      path: '/profile' },
];

/* ─── COMPONENT ──────────────────────────────────────── */
const JobsPage = () => {
  const navigate = useNavigate();

  const [savedJobs, setSavedJobs] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState(['Full Time']);
  const [selectedExp, setSelectedExp] = useState(['1 - 3 Years']);
  const [showMoreLoc, setShowMoreLoc] = useState(false);
  const [jobTypeOpen, setJobTypeOpen] = useState(true);
  const [expOpen, setExpOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('Most Relevant');
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [activeNav, setActiveNav] = useState('jobs');
  const [searchVal, setSearchVal] = useState('');

  const totalJobs = 1248;
  const totalPages = 24;

  const toggleSave = (id) =>
    setSavedJobs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const toggleCheck = (val, list, setList) =>
    setList(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);

  const clearAll = () => {
    setSelectedLocations([]);
    setSelectedTypes([]);
    setSelectedExp([]);
  };

  /* ── Job Card ── */
  const JobCard = ({ job }) => (
    <div className={`jp-job-card ${job.featured ? 'featured' : ''}`}>
      {job.featured && <span className="jp-featured-badge">Featured</span>}
      <div className="jp-card-inner">
        <div className="jp-job-icon" style={{ background: job.iconBg }}>
          <span>{job.icon}</span>
        </div>
        <div className="jp-job-info">
          <div className="jp-job-top-row">
            <div>
              <h3 className="jp-job-title">{job.title}</h3>
              <p className="jp-job-company">{job.company}</p>
            </div>
            <div className="jp-job-right">
              <span className="jp-salary">{job.salary}</span>
              <button
                className={`jp-save-btn ${savedJobs.includes(job.id) ? 'saved' : ''}`}
                onClick={() => toggleSave(job.id)}
              >
                <Bookmark size={15} />
              </button>
            </div>
          </div>
          <div className="jp-job-meta">
            <span className="jp-meta-item"><MapPin size={12} /> {job.location}</span>
            <span className="jp-meta-dot">•</span>
            <span className="jp-meta-item"><Briefcase size={12} /> {job.exp}</span>
          </div>
          <div className="jp-job-footer">
            <span className="jp-tag">{job.type}</span>
            <span className="jp-tag">{job.mode}</span>
            <span className="jp-time"><Clock size={11} /> {job.time}</span>
          </div>
        </div>
      </div>
    </div>
  );

  /* ── Compact Mobile Job Card ── */
  const MobileJobCard = ({ job }) => (
    <div className="jp-mob-card">
      <div className="jp-job-icon sm" style={{ background: job.iconBg }}>{job.icon}</div>
      <div className="jp-job-info">
        <div className="jp-job-top-row">
          <div>
            <h3 className="jp-job-title">{job.title}</h3>
            <p className="jp-job-company">{job.company}</p>
          </div>
          <button
            className={`jp-save-btn ${savedJobs.includes(job.id) ? 'saved' : ''}`}
            onClick={() => toggleSave(job.id)}
          >
            <Bookmark size={14} />
          </button>
        </div>
        <div className="jp-mob-meta">
          <span><MapPin size={11} /> {job.location.split(',')[0]}, {job.location.includes(',') ? job.location.split(', ')[1]?.slice(0,2) : ''}</span>
          <span><Briefcase size={11} /> {job.exp}</span>
        </div>
        <p className="jp-mob-salary">{job.salary}</p>
        <span className="jp-mob-time"><Clock size={10} /> {job.time}</span>
      </div>
    </div>
  );

  /* ── Filter sidebar ── */
  const FilterPanel = ({ mobile = false }) => (
    <div className={`jp-filter-panel ${mobile ? 'mobile' : ''}`}>
      <div className="jp-filter-header">
        <h3 className="jp-filter-title">Filters</h3>
        <button className="jp-clear-all" onClick={clearAll}>Clear All</button>
      </div>

      {/* Location */}
      <div className="jp-filter-section">
        <h4 className="jp-filter-section-title">Location</h4>
        <div className="jp-search-loc">
          <Search size={13} />
          <input type="text" placeholder="Search location" className="jp-loc-input" />
        </div>
        {LOCATIONS.slice(0, showMoreLoc ? LOCATIONS.length : 4).map(loc => (
          <label key={loc} className="jp-checkbox-row">
            <input
              type="checkbox"
              checked={selectedLocations.includes(loc)}
              onChange={() => toggleCheck(loc, selectedLocations, setSelectedLocations)}
            />
            <span>{loc}</span>
          </label>
        ))}
        <button className="jp-show-more" onClick={() => setShowMoreLoc(v => !v)}>
          {showMoreLoc ? '- Show less' : '+ Show more'}
        </button>
      </div>

      {/* Job Type */}
      <div className="jp-filter-section">
        <div className="jp-filter-section-hdr" onClick={() => setJobTypeOpen(v => !v)}>
          <h4 className="jp-filter-section-title">Job Type</h4>
          {jobTypeOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>
        {jobTypeOpen && JOB_TYPES.map(t => (
          <label key={t} className="jp-checkbox-row">
            <input
              type="checkbox"
              checked={selectedTypes.includes(t)}
              onChange={() => toggleCheck(t, selectedTypes, setSelectedTypes)}
            />
            <span>{t}</span>
          </label>
        ))}
      </div>

      {/* Experience */}
      <div className="jp-filter-section">
        <div className="jp-filter-section-hdr" onClick={() => setExpOpen(v => !v)}>
          <h4 className="jp-filter-section-title">Experience</h4>
          {expOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>
        {expOpen && EXPERIENCES.map(e => (
          <label key={e} className="jp-checkbox-row">
            <input
              type="checkbox"
              checked={selectedExp.includes(e)}
              onChange={() => toggleCheck(e, selectedExp, setSelectedExp)}
            />
            <span>{e}</span>
          </label>
        ))}
      </div>
    </div>
  );

  /* ── Pagination ── */
  const Pagination = () => (
    <div className="jp-pagination">
      <button className="jp-page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
        <ChevronLeft size={16} />
      </button>
      {[1, 2, 3, 4, 5].map(p => (
        <button
          key={p}
          className={`jp-page-btn ${currentPage === p ? 'active' : ''}`}
          onClick={() => setCurrentPage(p)}
        >
          {p}
        </button>
      ))}
      <span className="jp-page-ellipsis">...</span>
      <button className="jp-page-btn" onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
      <button className="jp-page-btn" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}>
        <ChevronRight size={16} />
      </button>
    </div>
  );

  return (
    <div className="jp-root">

      {/* ═══════════════ DESKTOP ════════════════ */}
      <div className="jp-desktop">

        {/* Header */}
        <header className="jp-header">
          <div className="jp-header-inner">
            <img src={logo} alt="Vasista" className="jp-logo" onClick={() => navigate('/home')} />
            <nav className="jp-nav">
              {[
                { label: 'Home', icon: Home, path: '/home' },
                { label: 'Jobs', icon: Briefcase, path: '/jobs' },
                { label: 'Companies', icon: Grid, path: '/companies' },
                { label: 'Candidates', icon: User, path: '/candidates' },
                { label: 'My Applications', icon: FileText, path: '#' },
              ].map(item => (
                <a key={item.label} href={item.path}
                  className={`jp-nav-link ${item.label === 'Jobs' ? 'active' : ''}`}
              onClick={e => { if (item.path !== '#') { e.preventDefault(); navigate(item.path); } }}
                >
                  <item.icon size={15} /> {item.label}
                </a>
              ))}
            </nav>
            <div className="jp-header-right">
              <button className="jp-icon-btn"><MessageSquare size={18} /></button>
              <button className="jp-icon-btn jp-notif"><Bell size={18} /><span className="jp-badge">2</span></button>
              <div className="jp-profile-chip" onClick={() => navigate('/profile')}>
                <div className="jp-avatar">RS</div>
                <div className="jp-profile-text">
                  <span className="jp-profile-name">Rohit Sharma</span>
                  <span className="jp-profile-role">Job Seeker</span>
                </div>
                <ChevronDown size={14} />
              </div>
            </div>
          </div>
        </header>

        {/* Hero */}
        <div className="jp-hero">
          <div className="jp-hero-text">
            <h1 className="jp-hero-title">Find the right opportunity</h1>
            <p className="jp-hero-sub">Explore jobs that match your skills and build your future</p>
          </div>
          <div className="jp-hero-img">
            <div className="jp-hero-people">👨‍💻👩‍💼</div>
            <div className="jp-hero-wave" />
          </div>
        </div>

        {/* Search bar */}
        <div className="jp-search-wrap">
          <div className="jp-search-bar">
            <div className="jp-search-left">
              <Search size={16} className="jp-search-ico" />
              <input
                type="text"
                placeholder="Job title, skills or company"
                className="jp-search-input"
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
              />
            </div>
            <div className="jp-search-divider" />
            <div className="jp-search-loc-select">
              <MapPin size={15} />
              <span>All Locations</span>
              <ChevronDown size={13} />
            </div>
            <div className="jp-search-divider" />
            <button className="jp-filter-toggle-btn">
              <SlidersHorizontal size={15} /> Filters
            </button>
            <button className="jp-search-btn">Search Jobs</button>
          </div>
        </div>

        {/* 3-column content */}
        <div className="jp-content">

          {/* Left: Filter Sidebar */}
          <aside className="jp-sidebar">
            <FilterPanel />
          </aside>

          {/* Center: Job Listings */}
          <main className="jp-listings">
            <div className="jp-listings-header">
              <p className="jp-results-count"><strong>{totalJobs.toLocaleString()}</strong> jobs found</p>
              <div className="jp-sort-wrap">
                <span>Sort by:</span>
                <div className="jp-sort-select">
                  <span>{sortBy}</span>
                  <ChevronDown size={13} />
                </div>
              </div>
            </div>

            <div className="jp-job-list">
              {ALL_JOBS.map(job => <JobCard key={job.id} job={job} />)}
            </div>

            <Pagination />
          </main>

          {/* Right: Widgets */}
          <aside className="jp-widgets">

            {/* Create Alert */}
            <div className="jp-widget-card">
              <div className="jp-widget-icon-row">
                <div className="jp-widget-bell"><Bell size={22} /></div>
              </div>
              <h3 className="jp-widget-title">Create Job Alert</h3>
              <p className="jp-widget-sub">Get notified about new jobs that match your preferences.</p>
              <button className="jp-alert-btn">Create Alert</button>
            </div>

            {/* Popular Searches */}
            <div className="jp-widget-card">
              <h3 className="jp-widget-title">Popular Searches</h3>
              <div className="jp-popular-list">
                {POPULAR.map(p => (
                  <a key={p} href="#" className="jp-popular-link">{p}</a>
                ))}
              </div>
              <a href="#" className="jp-popular-viewall">View all popular searches →</a>
            </div>

            {/* Stand out */}
            <div className="jp-widget-card dark">
              <div className="jp-standout-icon">👔</div>
              <h3 className="jp-widget-title light">Stand out to employers</h3>
              <p className="jp-widget-sub light">Update your profile and let top companies find you.</p>
              <button className="jp-update-btn" onClick={() => navigate('/home')}>Update Profile</button>
            </div>

          </aside>
        </div>
      </div>

      {/* ═══════════════ MOBILE ════════════════ */}
      <div className="jp-mobile">

        {/* Mobile header */}
        <header className="jp-mob-header">
          <button className="jp-icon-btn"><Menu size={20} /></button>
          <h1 className="jp-mob-title">Jobs</h1>
          <button className="jp-icon-btn"><Filter size={20} /></button>
        </header>

        <div className="jp-mob-content">
          {/* Search */}
          <div className="jp-mob-search">
            <Search size={14} className="jp-search-ico" />
            <input type="text" placeholder="Job title, skills or company" className="jp-search-input" />
          </div>

          {/* Filter + Sort row */}
          <div className="jp-mob-filter-row">
            <button className="jp-mob-filter-btn" onClick={() => setShowMobileFilter(true)}>
              <SlidersHorizontal size={14} /> Filters
              <span className="jp-filter-dot" />
            </button>
            <div className="jp-mob-sort">
              <span>Sort: Most Relevant</span>
              <ChevronDown size={13} />
            </div>
          </div>

          <p className="jp-mob-results"><strong>{totalJobs.toLocaleString()}</strong> jobs found</p>

          {/* Job cards */}
          <div className="jp-mob-job-list">
            {ALL_JOBS.map(job => <MobileJobCard key={job.id} job={job} />)}
          </div>

          <div style={{ height: '80px' }} />
        </div>

        <BottomNav activeTab="jobs" />

        {/* Mobile Filter Drawer */}
        {showMobileFilter && (
          <div className="jp-filter-overlay" onClick={() => setShowMobileFilter(false)}>
            <div className="jp-filter-drawer" onClick={e => e.stopPropagation()}>
              <div className="jp-drawer-header">
                <h3>Filters</h3>
                <button onClick={() => setShowMobileFilter(false)}><X size={20} /></button>
              </div>
              <div className="jp-drawer-body">
                <FilterPanel mobile />
              </div>
              <div className="jp-drawer-footer">
                <button className="jp-drawer-apply" onClick={() => setShowMobileFilter(false)}>
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;
