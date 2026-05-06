import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, MapPin, SlidersHorizontal, Bell, MessageSquare,
  Bookmark, Briefcase, ChevronDown, ChevronUp, Home, User,
  Grid, CheckCircle, Menu, Filter, X, List, LayoutGrid,
  Users, MoreHorizontal, GraduationCap, FileText
} from 'lucide-react';
import './CandidatesPage.css';
import logo from '../assets/logo-vasista.png';

/* ─── DATA ─────────────────────────────────────────── */
const CANDIDATES = [
  {
    id: 1,
    name: 'Amit Verma',
    title: 'Senior Full Stack Developer',
    location: 'Noida, UP',
    exp: '3.5 Years',
    skills: ['React.js', 'Node.js', 'JavaScript', 'MongoDB'],
    match: 98,
    salary: '₹ 12 LPA',
    availability: 'Immediately',
    about: 'Enthusiastic and detail-oriented Full Stack Developer with 3.5 years of experience in building scalable web applications using React, Node.js and MongoDB. Passionate about writing clean code and solving real-world problems.',
    experience: [
      {
        role: 'Senior Full Stack Developer',
        company: 'TechCorp Solutions',
        period: 'Jan 2022 - Present',
        loc: 'Noida, India',
        bullets: [
          'Developed and maintained scalable web applications using MERN stack.',
          'Collaborated with cross-functional teams to deliver high-quality products.',
          'Improved application performance and optimized code for better efficiency.'
        ]
      }
    ],
    education: [
      {
        degree: 'Bachelor of Technology in Computer Science',
        uni: 'Dr. A.P.J. Abdul Kalam Technical University',
        period: '2016 - 2020'
      }
    ]
  },
  {
    id: 2,
    name: 'Priya Singh',
    title: 'Frontend Developer',
    location: 'Bangalore, KA',
    exp: '2.8 Years',
    skills: ['React.js', 'TypeScript', 'HTML', 'CSS'],
    match: 90,
  },
  {
    id: 3,
    name: 'Rahul Mehta',
    title: 'Backend Developer',
    location: 'Pune, Maharashtra',
    exp: '4.2 Years',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'AWS'],
    match: 88,
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    title: 'Full Stack Developer',
    location: 'Hyderabad, TG',
    exp: '3.1 Years',
    skills: ['React.js', 'Node.js', 'JavaScript', 'PostgreSQL'],
    match: 85,
  },
  {
    id: 5,
    name: 'Vikram Joshi',
    title: 'Software Engineer',
    location: 'Mumbai, MH',
    exp: '2.3 Years',
    skills: ['Java', 'Spring Boot', 'MySQL', 'AWS'],
    match: 82,
  },
];

const LOCATIONS = ['Noida', 'Bangalore', 'Pune', 'Mumbai'];
const EXPERIENCES = ['0 - 1 Years', '1 - 3 Years', '3 - 5 Years', '5 - 10 Years', '10+ Years'];
const AVAILABILITY = ['Immediately', 'Within 15 Days'];

const NAV_ITEMS = [
  { key: 'home',       label: 'Home',       icon: Home,      path: '/home' },
  { key: 'jobs',       label: 'Jobs',       icon: Briefcase, path: '/jobs' },
  { key: 'companies',  label: 'Companies',  icon: Grid,      path: '/companies' },
  { key: 'candidates', label: 'Candidates', icon: Users,     path: '/candidates' },
  { key: 'profile',    label: 'Profile',    icon: User,      path: '/profile' },
];

/* ─── COMPONENT ──────────────────────────────────────── */
const CandidatesPage = () => {
  const navigate = useNavigate();

  const [savedCandidates, setSavedCandidates] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedExp, setSelectedExp] = useState(['1 - 3 Years']);
  const [selectedAvail, setSelectedAvail] = useState([]);
  const [showMoreLoc, setShowMoreLoc] = useState(false);
  const [expOpen, setExpOpen] = useState(true);
  const [skillsOpen, setSkillsOpen] = useState(true);
  const [availOpen, setAvailOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('Most Relevant');
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [activeNav, setActiveNav] = useState('candidates');
  const [searchVal, setSearchVal] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(CANDIDATES[0]);

  const totalCandidates = 1248;
  const totalPages = 25;

  const toggleSave = (id, e) => {
    e.stopPropagation();
    setSavedCandidates(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleCheck = (val, list, setList) =>
    setList(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);

  const clearAll = () => {
    setSelectedLocations([]);
    setSelectedExp([]);
    setSelectedAvail([]);
  };

  /* ── Candidate Card ── */
  const CandidateCard = ({ cand }) => {
    const isSelected = selectedCandidate?.id === cand.id;
    return (
      <div 
        className={`cdp-cand-card ${isSelected ? 'active' : ''}`}
        onClick={() => setSelectedCandidate(cand)}
      >
        <div className="cdp-card-inner">
          <div className="cdp-avatar">
            {cand.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="cdp-cand-info">
            <div className="cdp-cand-top-row">
              <div>
                <h3 className="cdp-cand-name">
                  {cand.name} <CheckCircle size={14} className="cdp-verified" />
                </h3>
                <p className="cdp-cand-title">{cand.title}</p>
              </div>
              <div className="cdp-cand-right">
                <div className="cdp-match-wrap">
                  <span className="cdp-match-pct">{cand.match}%</span>
                  <span className="cdp-match-lbl">Match</span>
                </div>
                <button
                  className={`cdp-save-btn ${savedCandidates.includes(cand.id) ? 'saved' : ''}`}
                  onClick={(e) => toggleSave(cand.id, e)}
                >
                  <Bookmark size={15} />
                </button>
              </div>
            </div>
            <div className="cdp-cand-meta">
              <span className="cdp-meta-item"><MapPin size={12} /> {cand.location}</span>
              <span className="cdp-meta-item"><Briefcase size={12} /> {cand.exp}</span>
            </div>
            <div className="cdp-cand-footer">
              <div className="cdp-skills-list">
                {cand.skills.slice(0, 3).map(s => <span key={s} className="cdp-tag">{s}</span>)}
                {cand.skills.length > 3 && <span className="cdp-tag count">+{cand.skills.length - 3}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* ── Mobile Candidate Card ── */
  const MobileCandidateCard = ({ cand }) => (
    <div className="cdp-mob-card" onClick={() => setSelectedCandidate(cand)}>
      <div className="cdp-card-inner">
        <div className="cdp-avatar sm">
           {cand.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="cdp-cand-info">
          <div className="cdp-cand-top-row">
            <div>
              <h3 className="cdp-cand-name">
                {cand.name} <CheckCircle size={12} className="cdp-verified" />
              </h3>
              <p className="cdp-cand-title">{cand.title}</p>
            </div>
            <button
              className={`cdp-save-btn ${savedCandidates.includes(cand.id) ? 'saved' : ''}`}
              onClick={(e) => toggleSave(cand.id, e)}
            >
              <Bookmark size={14} />
            </button>
          </div>
          <div className="cdp-cand-meta">
            <span className="cdp-meta-item"><MapPin size={11} /> {cand.location.split(',')[0]}</span>
            <span className="cdp-meta-item"><Briefcase size={11} /> {cand.exp}</span>
          </div>
          <div className="cdp-cand-mob-footer">
             <div className="cdp-skills-list">
                {cand.skills.slice(0, 2).map(s => <span key={s} className="cdp-tag sm">{s}</span>)}
                {cand.skills.length > 2 && <span className="cdp-tag sm count">+{cand.skills.length - 2}</span>}
              </div>
              <span className="cdp-match-pct sm">{cand.match}% Match</span>
          </div>
        </div>
      </div>
    </div>
  );

  /* ── Filter sidebar ── */
  const FilterPanel = ({ mobile = false }) => (
    <div className={`cdp-filter-panel ${mobile ? 'mobile' : ''}`}>
      <div className="cdp-filter-header">
        <h3 className="cdp-filter-title">Filters</h3>
        <button className="cdp-clear-all" onClick={clearAll}>Clear All</button>
      </div>

      {/* Location */}
      <div className="cdp-filter-section">
        <h4 className="cdp-filter-section-title">Location</h4>
        <div className="cdp-search-loc">
          <Search size={13} />
          <input type="text" placeholder="Search location" className="cdp-loc-input" />
        </div>
        {LOCATIONS.slice(0, showMoreLoc ? LOCATIONS.length : 4).map(loc => (
          <label key={loc} className="cdp-checkbox-row">
            <input
              type="checkbox"
              checked={selectedLocations.includes(loc)}
              onChange={() => toggleCheck(loc, selectedLocations, setSelectedLocations)}
            />
            <span>{loc}</span>
          </label>
        ))}
        <button className="cdp-show-more" onClick={() => setShowMoreLoc(v => !v)}>
          {showMoreLoc ? '- Show less' : '+ Show more'}
        </button>
      </div>

      {/* Experience */}
      <div className="cdp-filter-section">
        <div className="cdp-filter-section-hdr" onClick={() => setExpOpen(v => !v)}>
          <h4 className="cdp-filter-section-title">Experience</h4>
          {expOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>
        {expOpen && EXPERIENCES.map(e => (
          <label key={e} className="cdp-checkbox-row">
            <input
              type="checkbox"
              checked={selectedExp.includes(e)}
              onChange={() => toggleCheck(e, selectedExp, setSelectedExp)}
            />
            <span>{e}</span>
          </label>
        ))}
      </div>
      
      {/* Skills */}
      <div className="cdp-filter-section">
        <div className="cdp-filter-section-hdr" onClick={() => setSkillsOpen(v => !v)}>
          <h4 className="cdp-filter-section-title">Skills</h4>
          {skillsOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>
        {skillsOpen && (
          <>
            <div className="cdp-search-loc">
              <Search size={13} />
              <input type="text" placeholder="Search skills" className="cdp-loc-input" />
            </div>
            <div className="cdp-active-skills">
                <span className="cdp-active-skill-tag">React.js <X size={12}/></span>
                <span className="cdp-active-skill-tag">Node.js <X size={12}/></span>
            </div>
            <button className="cdp-show-more" style={{marginTop: '8px'}}>+ Show more</button>
          </>
        )}
      </div>

       {/* Availability */}
       <div className="cdp-filter-section">
        <div className="cdp-filter-section-hdr" onClick={() => setAvailOpen(v => !v)}>
          <h4 className="cdp-filter-section-title">Availability</h4>
          {availOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>
        {availOpen && AVAILABILITY.map(a => (
          <label key={a} className="cdp-checkbox-row">
            <input
              type="checkbox"
              checked={selectedAvail.includes(a)}
              onChange={() => toggleCheck(a, selectedAvail, setSelectedAvail)}
            />
            <span>{a}</span>
          </label>
        ))}
      </div>
    </div>
  );

  /* ── Pagination ── */
  const Pagination = () => (
    <div className="cdp-pagination">
      <button className="cdp-page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
        <ChevronDown size={16} style={{transform: 'rotate(90deg)'}}/>
      </button>
      {[1, 2, 3, 4, 5].map(p => (
        <button
          key={p}
          className={`cdp-page-btn ${currentPage === p ? 'active' : ''}`}
          onClick={() => setCurrentPage(p)}
        >
          {p}
        </button>
      ))}
      <span className="cdp-page-ellipsis">...</span>
      <button className="cdp-page-btn" onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
      <button className="cdp-page-btn" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}>
        <ChevronDown size={16} style={{transform: 'rotate(-90deg)'}}/>
      </button>
    </div>
  );
  
  /* ── Hero Illustration ── */
  const HeroIllustration = () => (
    <svg viewBox="0 0 400 160" className="cdp-hero-svg" xmlns="http://www.w3.org/2000/svg">
       {/* Background blobs */}
       <path d="M 50 80 Q 100 20 200 60 T 350 70" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="5,5"/>
       <circle cx="320" cy="40" r="30" fill="#e8f0fe" opacity="0.8"/>
       <rect x="260" y="80" width="80" height="40" rx="8" fill="#e8f0fe" opacity="0.8"/>
       
       {/* Candidate Cards Abstract */}
       <rect x="220" y="10" width="60" height="80" rx="6" fill="#fff" stroke="#cbd5e0" strokeWidth="1.5" />
       <circle cx="250" cy="35" r="12" fill="#cbd5e0" />
       <rect x="230" y="55" width="40" height="4" rx="2" fill="#cbd5e0" />
       <rect x="235" y="65" width="30" height="4" rx="2" fill="#cbd5e0" />
       
       <rect x="290" y="30" width="70" height="90" rx="6" fill="#fff" stroke="#cbd5e0" strokeWidth="1.5" />
       <circle cx="325" cy="55" r="14" fill="#f29727" opacity="0.8"/>
       <rect x="300" y="80" width="50" height="4" rx="2" fill="#cbd5e0" />
       <rect x="305" y="90" width="40" height="4" rx="2" fill="#cbd5e0" />
       {/* Stars */}
       <circle cx="305" cy="105" r="2" fill="#f29727"/>
       <circle cx="315" cy="105" r="2" fill="#f29727"/>
       <circle cx="325" cy="105" r="2" fill="#f29727"/>
       <circle cx="335" cy="105" r="2" fill="#f29727"/>
       <circle cx="345" cy="105" r="2" fill="#cbd5e0"/>
       
       {/* Character abstract - Woman with magnifying glass */}
       <path d="M 120 160 L 120 100 Q 120 70 140 70 L 160 70 Q 180 70 180 100 L 180 160 Z" fill="#004990"/>
       <path d="M 150 70 Q 150 40 160 30 Q 180 30 180 60 Q 180 90 160 90 Q 140 90 140 70" fill="#001f3f"/>
       <circle cx="160" cy="50" r="15" fill="#fcdbb6"/>
       {/* Arm & Magnifying glass */}
       <path d="M 165 85 L 200 110" stroke="#fcdbb6" strokeWidth="8" strokeLinecap="round"/>
       <circle cx="215" cy="85" r="20" fill="none" stroke="#001f3f" strokeWidth="4"/>
       <line x1="200" y1="100" x2="190" y2="110" stroke="#001f3f" strokeWidth="6" strokeLinecap="round"/>
    </svg>
  );

  return (
    <div className="cdp-root">

      {/* ═══════════════ DESKTOP ════════════════ */}
      <div className="cdp-desktop">

        {/* Header */}
        <header className="cdp-header">
          <div className="cdp-header-inner">
            <img src={logo} alt="Vasista" className="cdp-logo" onClick={() => navigate('/home')} />
            <nav className="cdp-nav">
              {[
                { label: 'Home', icon: Home, path: '/home' },
                { label: 'Jobs', icon: Briefcase, path: '/jobs' },
                { label: 'Companies', icon: Grid, path: '/companies' },
                { label: 'Candidates', icon: Users, path: '/candidates' },
                { label: 'My Applications', icon: FileText, path: '#' },
              ].map(item => (
                <a key={item.label} href={item.path}
                  className={`cdp-nav-link ${item.label === 'Candidates' ? 'active' : ''}`}
                  onClick={e => { if (item.path !== '#') { e.preventDefault(); navigate(item.path); } }}
                >
                  <item.icon size={15} /> {item.label}
                </a>
              ))}
            </nav>
            <div className="cdp-header-right">
              <button className="cdp-icon-btn"><MessageSquare size={18} /></button>
              <button className="cdp-icon-btn cdp-notif"><Bell size={18} /><span className="cdp-badge">2</span></button>
              <div className="cdp-profile-chip" onClick={() => navigate('/profile')}>
                <div className="cdp-avatar-sm">RS</div>
                <div className="cdp-profile-text">
                  <span className="cdp-profile-name">Rohit Sharma</span>
                  <span className="cdp-profile-role">Employer</span>
                </div>
                <ChevronDown size={14} />
              </div>
            </div>
          </div>
        </header>

        {/* Hero */}
        <div className="cdp-hero">
          <div className="cdp-hero-inner">
              <div className="cdp-hero-text">
                <h1 className="cdp-hero-title">Find the right talent</h1>
                <p className="cdp-hero-sub">Search and connect with skilled professionals<br/>who can help you build a stronger team.</p>
              </div>
              <div className="cdp-hero-img">
                 <HeroIllustration />
              </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="cdp-search-wrap">
          <div className="cdp-search-bar">
            <div className="cdp-search-left">
              <Search size={16} className="cdp-search-ico" />
              <input
                type="text"
                placeholder="Search by name, skills, job title or keyword"
                className="cdp-search-input"
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
              />
            </div>
            <div className="cdp-search-divider" />
            <div className="cdp-search-select">
              <MapPin size={15} />
              <span>All Locations</span>
              <ChevronDown size={13} />
            </div>
            <div className="cdp-search-divider" />
            <div className="cdp-search-select">
              <Briefcase size={15} />
              <span>All Experience</span>
              <ChevronDown size={13} />
            </div>
            <div className="cdp-search-divider" />
            <div className="cdp-search-select">
              <LayoutGrid size={15} />
              <span>All Skills</span>
              <ChevronDown size={13} />
            </div>
            <div className="cdp-search-divider" />
            <button className="cdp-filter-toggle-btn">
              <SlidersHorizontal size={15} /> Filters <span className="cdp-filter-dot"/>
            </button>
          </div>
        </div>

        {/* Content Header */}
        <div className="cdp-content-hdr">
             <p className="cdp-results-count"><strong>{totalCandidates.toLocaleString()}</strong> candidates found</p>
             <div className="cdp-sort-view">
                 <div className="cdp-sort-wrap">
                    <span>Sort by:</span>
                    <div className="cdp-sort-select">
                        <span>{sortBy}</span>
                        <ChevronDown size={13} />
                    </div>
                </div>
                <div className="cdp-view-toggles">
                    <button className="cdp-view-btn active"><List size={16}/></button>
                    <button className="cdp-view-btn"><Grid size={16}/></button>
                </div>
             </div>
        </div>

        {/* 3-column content */}
        <div className="cdp-content">

          {/* Left: Filter Sidebar */}
          <aside className="cdp-sidebar">
            <FilterPanel />
          </aside>

          {/* Center: Candidates List */}
          <main className="cdp-listings">
            <div className="cdp-cand-list">
              {CANDIDATES.map(cand => <CandidateCard key={cand.id} cand={cand} />)}
            </div>
            <Pagination />
          </main>

          {/* Right: Candidate Detail Panel */}
          <aside className="cdp-detail-panel">
            {selectedCandidate ? (
               <div className="cdp-detail-card">
                  <div className="cdp-detail-header">
                      <div className="cdp-detail-hdr-actions">
                          <button className="cdp-icon-action"><Bookmark size={16}/></button>
                          <button className="cdp-icon-action"><X size={16}/></button>
                      </div>
                      <div className="cdp-detail-profile-row">
                          <div className="cdp-detail-avatar">
                             {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="cdp-detail-info">
                              <h2 className="cdp-detail-name">
                                {selectedCandidate.name} <CheckCircle size={16} className="cdp-verified" />
                              </h2>
                              <p className="cdp-detail-title">{selectedCandidate.title}</p>
                              <p className="cdp-detail-loc"><MapPin size={12}/> {selectedCandidate.location}</p>
                          </div>
                      </div>
                      <div className="cdp-detail-stats">
                          <div className="cdp-detail-stat">
                              <span className="cdp-stat-val">{selectedCandidate.exp}</span>
                              <span className="cdp-stat-lbl">Experience</span>
                          </div>
                          <div className="cdp-vsep"/>
                          <div className="cdp-detail-stat">
                              <span className="cdp-stat-val">{selectedCandidate.salary || 'Negotiable'}</span>
                              <span className="cdp-stat-lbl">Expected Salary</span>
                          </div>
                          <div className="cdp-vsep"/>
                          <div className="cdp-detail-stat">
                              <span className="cdp-stat-val">{selectedCandidate.availability || '15 Days'}</span>
                              <span className="cdp-stat-lbl">Available</span>
                          </div>
                      </div>
                      <div className="cdp-detail-actions">
                          <button className="cdp-btn-outline">View Profile</button>
                          <button className="cdp-btn-primary">Contact</button>
                          <button className="cdp-btn-icon"><MoreHorizontal size={18}/></button>
                      </div>
                  </div>
                  
                  <div className="cdp-detail-body">
                      <div className="cdp-detail-section">
                          <h3 className="cdp-section-title">About</h3>
                          <p className="cdp-section-text">{selectedCandidate.about || 'Passionate software developer.'}</p>
                      </div>
                      
                      <div className="cdp-detail-section">
                          <h3 className="cdp-section-title">Skills</h3>
                          <div className="cdp-skills-wrap">
                             {selectedCandidate.skills.map(s => <span key={s} className="cdp-tag">{s}</span>)}
                             <span className="cdp-tag">Redux</span>
                             <span className="cdp-tag">HTML</span>
                             <span className="cdp-tag">CSS</span>
                             <span className="cdp-tag">Git</span>
                          </div>
                      </div>
                      
                      <div className="cdp-detail-section">
                          <h3 className="cdp-section-title">Experience</h3>
                          {selectedCandidate.experience?.map((exp, i) => (
                             <div key={i} className="cdp-exp-item">
                                 <h4 className="cdp-exp-role">{exp.role}</h4>
                                 <p className="cdp-exp-comp">{exp.company}</p>
                                 <p className="cdp-exp-meta">{exp.period} • {exp.loc}</p>
                                 <ul className="cdp-exp-bullets">
                                     {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                                 </ul>
                             </div>
                          ))}
                          <button className="cdp-view-link">View Full Experience</button>
                      </div>
                      
                      <div className="cdp-detail-section">
                          <h3 className="cdp-section-title">Education</h3>
                          {selectedCandidate.education?.map((edu, i) => (
                              <div key={i} className="cdp-edu-item">
                                  <h4 className="cdp-edu-degree">{edu.degree}</h4>
                                  <p className="cdp-edu-uni">{edu.uni}</p>
                                  <p className="cdp-edu-meta">{edu.period}</p>
                              </div>
                          ))}
                      </div>
                  </div>
               </div>
            ) : (
                <div className="cdp-empty-detail">
                    <p>Select a candidate to view details</p>
                </div>
            )}
          </aside>
        </div>
      </div>

      {/* ═══════════════ MOBILE ════════════════ */}
      <div className="cdp-mobile">

        {/* Mobile header */}
        <header className="cdp-mob-header">
          <button className="cdp-icon-btn"><Menu size={20} /></button>
          <h1 className="cdp-mob-title">Candidates</h1>
          <button className="cdp-icon-btn"><Filter size={20} /></button>
        </header>

        <div className="cdp-mob-content">
          {/* Search */}
          <div className="cdp-mob-search">
            <Search size={14} className="cdp-search-ico" />
            <input type="text" placeholder="Search by name, skills or job title" className="cdp-search-input" />
          </div>

          {/* Filter + Sort row */}
          <div className="cdp-mob-filter-row">
            <button className="cdp-mob-filter-btn" onClick={() => setShowMobileFilter(true)}>
              <Filter size={14} /> Filters <ChevronDown size={12}/>
            </button>
            <div className="cdp-mob-sort">
              <span>Sort: Most Relevant</span>
              <ChevronDown size={13} />
            </div>
          </div>

          <p className="cdp-mob-results"><strong>{totalCandidates.toLocaleString()}</strong> candidates found</p>

          {/* Candidate cards */}
          <div className="cdp-mob-cand-list">
            {CANDIDATES.map(cand => <MobileCandidateCard key={cand.id} cand={cand} />)}
          </div>

          <div style={{ height: '80px' }} />
        </div>

        {/* Bottom Nav */}
        <nav className="cdp-mob-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.key}
              className={`cdp-mob-nav-btn ${activeNav === item.key ? 'active' : ''}`}
              onClick={() => { setActiveNav(item.key); if (item.path !== '#') navigate(item.path); }}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Mobile Filter Drawer */}
        {showMobileFilter && (
          <div className="cdp-filter-overlay" onClick={() => setShowMobileFilter(false)}>
            <div className="cdp-filter-drawer" onClick={e => e.stopPropagation()}>
              <div className="cdp-drawer-header">
                <h3>Filters</h3>
                <button onClick={() => setShowMobileFilter(false)}><X size={20} /></button>
              </div>
              <div className="cdp-drawer-body">
                <FilterPanel mobile />
              </div>
              <div className="cdp-drawer-footer">
                <button className="cdp-drawer-apply" onClick={() => setShowMobileFilter(false)}>
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

export default CandidatesPage;
