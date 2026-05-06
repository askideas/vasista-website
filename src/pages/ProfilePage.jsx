import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin, Briefcase, FileText, User, Home, Grid,
  Bell, MessageSquare, ChevronDown, Eye, Pencil,
  Plus, Download, ExternalLink, CheckCircle, Building2,
  GraduationCap, Globe, GitBranch, ChevronRight,
  Menu, MoreVertical, Users
} from 'lucide-react';
import './ProfilePage.css';
import logo from '../assets/logo-vasista.png';
import BottomNav from '../components/BottomNav';
/* ─── DATA ──────────────────────────────────────────── */
const SKILLS = ['JavaScript', 'React.js', 'Node.js', 'TypeScript', 'HTML', 'CSS', 'MongoDB', 'Express.js', 'Git', 'AWS'];

const EXPERIENCE = [
  {
    id: 1, abbr: 'TATA', color: '#1d3557',
    title: 'Senior Software Engineer',
    company: 'Tata Consultancy Services',
    period: 'Jan 2022 - Present', location: 'Noida, India',
    bullets: [
      'Developed and maintained scalable web applications using React and Node.js.',
      'Collaborated with cross-functional teams to deliver high-quality solutions.',
      'Improved application performance by optimizing code and database queries.',
    ],
  },
  {
    id: 2, abbr: 'Infosys', color: '#007CC3',
    title: 'Software Engineer',
    company: 'Infosys Limited',
    period: 'Jun 2020 - Dec 2021', location: 'Bangalore, India',
    bullets: [
      'Worked on RESTful APIs and integrated third-party services.',
      'Participated in code reviews and agile development processes.',
      'Fixed bugs and improved application functionality.',
    ],
  },
];

const EDUCATION = [
  {
    id: 1,
    degree: 'Bachelor of Technology in Computer Science',
    university: 'Dr. A.P.J. Abdul Kalam Technical University',
    period: '2016 - 2020', location: 'Lucknow, India',
  },
];

const NAV_ITEMS = [
  { key: 'home',         label: 'Home',         icon: Home,      path: '/home' },
  { key: 'jobs',         label: 'Jobs',         icon: Briefcase, path: '/jobs' },
  { key: 'companies',    label: 'Companies',    icon: Building2, path: '/companies' },
  { key: 'candidates', label: 'Candidates', icon: Users,     path: '/candidates' },
  { key: 'profile',      label: 'Profile',      icon: User,      path: '/profile' },
];

/* ─── COMPONENT ─────────────────────────────────────── */
const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('profile');
  const [showAllSkills, setShowAllSkills] = useState(false);

  const visibleSkills = showAllSkills ? SKILLS : SKILLS.slice(0, 6);

  /* ── Reusable section card ── */
  const SectionCard = ({ title, action, actionLabel, children }) => (
    <div className="pp-card">
      <div className="pp-card-hdr">
        <h2 className="pp-card-title">{title}</h2>
        {action && (
          <button className="pp-edit-btn" onClick={action}>
            {actionLabel?.startsWith('+') ? <Plus size={14} /> : <Pencil size={14} />}
            {actionLabel}
          </button>
        )}
      </div>
      {children}
    </div>
  );

  /* ── Experience item ── */
  const ExpItem = ({ exp }) => (
    <div className="pp-exp-item">
      <div className="pp-exp-logo" style={{ background: exp.color + '15', color: exp.color }}>
        {exp.abbr}
      </div>
      <div className="pp-exp-info">
        <h3 className="pp-exp-title">{exp.title}</h3>
        <p className="pp-exp-company">{exp.company}</p>
        <p className="pp-exp-meta">
          <span>{exp.period}</span>
          <span className="pp-dot">•</span>
          <span><MapPin size={11} /> {exp.location}</span>
        </p>
        <ul className="pp-exp-bullets">
          {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="pp-root">

      {/* ══════════════ DESKTOP ══════════════ */}
      <div className="pp-desktop">

        {/* ── Header ── */}
        <header className="pp-header">
          <div className="pp-header-inner">
            <img src={logo} alt="Vasista" className="pp-logo" onClick={() => navigate('/home')} />
            <nav className="pp-nav">
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
                  className={`pp-nav-link ${item.label === 'My Applications' ? '' : ''}`}
                  onClick={e => { e.preventDefault(); if (item.path !== '#') navigate(item.path); }}
                >
                  <item.icon size={15} /> {item.label}
                </a>
              ))}
            </nav>
            <div className="pp-header-right">
              <button className="pp-icon-btn"><MessageSquare size={18} /></button>
              <button className="pp-icon-btn pp-notif">
                <Bell size={18} /><span className="pp-badge">2</span>
              </button>
              <div className="pp-profile-chip">
                <div className="pp-avatar-sm">RS</div>
                <div className="pp-profile-text">
                  <span className="pp-profile-name">Rohit Sharma</span>
                  <span className="pp-profile-role">Job Seeker</span>
                </div>
                <ChevronDown size={14} />
              </div>
            </div>
          </div>
        </header>

        {/* ── Profile Hero Banner ── */}
        <div className="pp-hero-banner">
          <div className="pp-hero-inner">
            <div className="pp-hero-left">
              <div className="pp-hero-avatar">
                <span className="pp-avatar-initials">RS</span>
              </div>
              <div className="pp-hero-info">
                <h1 className="pp-hero-name">
                  Rohit Sharma
                  <CheckCircle size={20} className="pp-verified" />
                </h1>
                <p className="pp-hero-title">Senior Software Engineer</p>
                <p className="pp-hero-location"><MapPin size={14} /> Noida, Uttar Pradesh, India</p>
              </div>
            </div>
            <button className="pp-public-btn">
              <Eye size={16} /> View Public Profile
            </button>
          </div>

          {/* Stats row */}
          <div className="pp-stats-row">
            {[
              { val: '3+',  label: 'Years Experience' },
              { val: '15+', label: 'Applications' },
              { val: '5',   label: 'Shortlisted' },
              { val: '2',   label: 'Interviews' },
            ].map(s => (
              <div key={s.label} className="pp-stat">
                <div className="pp-stat-val">{s.val}</div>
                <div className="pp-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 2-column grid ── */}
        <div className="pp-main-grid">

          {/* LEFT column */}
          <div className="pp-left-col">

            {/* About Me */}
            <SectionCard title="About Me" actionLabel="Edit" action={() => {}}>
              <p className="pp-about-text">
                Passionate and detail-oriented Software Engineer with 3+ years of experience in building
                scalable web applications. Skilled in JavaScript, React, Node.js and cloud technologies.
                Always eager to learn new technologies and solve real-world problems.
              </p>
            </SectionCard>

            {/* Work Experience */}
            <SectionCard title="Work Experience" actionLabel="+ Add Experience" action={() => {}}>
              <div className="pp-exp-list">
                {EXPERIENCE.map(exp => <ExpItem key={exp.id} exp={exp} />)}
              </div>
              <button className="pp-view-all-link">View All Experience</button>
            </SectionCard>

            {/* Education */}
            <SectionCard title="Education" actionLabel="+ Add Education" action={() => {}}>
              {EDUCATION.map(edu => (
                <div key={edu.id} className="pp-edu-item">
                  <div className="pp-edu-icon">🎓</div>
                  <div>
                    <h3 className="pp-edu-degree">{edu.degree}</h3>
                    <p className="pp-edu-uni">{edu.university}</p>
                    <p className="pp-edu-meta">
                      <span>{edu.period}</span>
                      <span className="pp-dot">•</span>
                      <span><MapPin size={11} /> {edu.location}</span>
                    </p>
                  </div>
                </div>
              ))}
            </SectionCard>
          </div>

          {/* RIGHT column */}
          <div className="pp-right-col">

            {/* Resume */}
            <SectionCard title="Resume">
              <div className="pp-resume-file">
                <div className="pp-resume-icon">📄</div>
                <div className="pp-resume-info">
                  <p className="pp-resume-name">Rohit_Sharma_Resume.pdf</p>
                  <p className="pp-resume-date">Updated on 20 May 2024</p>
                </div>
                <button className="pp-download-btn"><Download size={16} /></button>
              </div>
              <button className="pp-update-resume-btn">Update Resume</button>
            </SectionCard>

            {/* Skills */}
            <SectionCard title="Skills" actionLabel="Edit" action={() => {}}>
              <div className="pp-skills-wrap">
                {SKILLS.map(skill => (
                  <span key={skill} className="pp-skill-tag">{skill}</span>
                ))}
              </div>
            </SectionCard>

            {/* Career Preferences */}
            <SectionCard title="Career Preferences" actionLabel="Edit" action={() => {}}>
              <div className="pp-pref-list">
                <div className="pp-pref-item">
                  <span className="pp-pref-label">Preferred Roles</span>
                  <span className="pp-pref-val">Frontend Developer, Software Engineer</span>
                </div>
                <div className="pp-pref-item">
                  <span className="pp-pref-label">Employment Type</span>
                  <span className="pp-pref-val">Full-time</span>
                </div>
                <div className="pp-pref-item">
                  <span className="pp-pref-label">Preferred Locations</span>
                  <span className="pp-pref-val">Noida, Bangalore, Pune</span>
                </div>
                <div className="pp-pref-item">
                  <span className="pp-pref-label">Expected Salary</span>
                  <span className="pp-pref-val">₹ 12 - 18 LPA</span>
                </div>
              </div>
            </SectionCard>

            {/* Links */}
            <SectionCard title="Links" actionLabel="Edit" action={() => {}}>
              <div className="pp-links-list">
                <div className="pp-link-item">
                  <div className="pp-link-icon linkedin"><Globe size={16} /></div>
                  <div className="pp-link-info">
                    <p className="pp-link-label">LinkedIn</p>
                    <a href="#" className="pp-link-url">linkedin.com/in/rohitsharma <ExternalLink size={12} /></a>
                  </div>
                </div>
                <div className="pp-link-item">
                  <div className="pp-link-icon github"><GitBranch size={16} /></div>
                  <div className="pp-link-info">
                    <p className="pp-link-label">GitHub</p>
                    <a href="#" className="pp-link-url">github.com/rohitsharma <ExternalLink size={12} /></a>
                  </div>
                </div>
              </div>
            </SectionCard>

          </div>
        </div>
      </div>

      {/* ══════════════ MOBILE ══════════════ */}
      <div className="pp-mobile">

        {/* Mobile header */}
        <header className="pp-mob-header">
          <button className="pp-icon-btn"><Menu size={20} /></button>
          <h1 className="pp-mob-title">Profile</h1>
          <button className="pp-icon-btn"><MoreVertical size={20} /></button>
        </header>

        <div className="pp-mob-content">

          {/* Mobile hero banner */}
          <div className="pp-mob-banner">
            <div className="pp-mob-avatar-wrap">
              <div className="pp-mob-avatar">RS</div>
              <button className="pp-mob-avatar-edit"><Pencil size={12} /></button>
            </div>
            <h2 className="pp-mob-name">
              Rohit Sharma <CheckCircle size={16} className="pp-verified" />
            </h2>
            <p className="pp-mob-role">Senior Software Engineer</p>
            <p className="pp-mob-location"><MapPin size={12} /> Noida, Uttar Pradesh, India</p>

            {/* Stats */}
            <div className="pp-mob-stats">
              {[
                { val: '3+',  label: 'Experience' },
                { val: '15+', label: 'Applications' },
                { val: '5',   label: 'Shortlisted' },
                { val: '2',   label: 'Interviews' },
              ].map(s => (
                <div key={s.label} className="pp-mob-stat">
                  <span className="pp-mob-stat-val">{s.val}</span>
                  <span className="pp-mob-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Completeness */}
          <div className="pp-mob-complete">
            <div className="pp-complete-top">
              <div>
                <p className="pp-complete-pct">85%</p>
                <p className="pp-complete-label">Profile Completeness</p>
              </div>
              <ChevronRight size={18} className="pp-complete-arrow" />
            </div>
            <div className="pp-progress-bar">
              <div className="pp-progress-fill" style={{ width: '85%' }} />
            </div>
            <p className="pp-complete-sub">Almost there! Complete your profile to get more job opportunities.</p>
          </div>

          {/* Resume */}
          <div className="pp-mob-card">
            <h3 className="pp-mob-section-title">Resume</h3>
            <div className="pp-resume-file">
              <div className="pp-resume-icon">📄</div>
              <div className="pp-resume-info">
                <p className="pp-resume-name">Rohit_Sharma_Resume.pdf</p>
                <p className="pp-resume-date">Updated on 20 May 2024</p>
              </div>
              <button className="pp-download-btn"><Download size={15} /></button>
            </div>
            <button className="pp-update-resume-btn">Update Resume</button>
          </div>

          {/* Skills */}
          <div className="pp-mob-card">
            <div className="pp-mob-card-hdr">
              <h3 className="pp-mob-section-title">Skills</h3>
              <button className="pp-edit-btn"><Pencil size={13} /> Edit</button>
            </div>
            <div className="pp-skills-wrap">
              {visibleSkills.map(skill => (
                <span key={skill} className="pp-skill-tag">{skill}</span>
              ))}
              {!showAllSkills && SKILLS.length > 6 && (
                <button className="pp-skill-more" onClick={() => setShowAllSkills(true)}>
                  +{SKILLS.length - 6} more
                </button>
              )}
            </div>
          </div>

          {/* Experience (compact) */}
          <div className="pp-mob-card">
            <div className="pp-mob-card-hdr">
              <h3 className="pp-mob-section-title">Experience</h3>
              <button className="pp-edit-btn"><Pencil size={13} /> Edit</button>
            </div>
            {EXPERIENCE.map(exp => (
              <div key={exp.id} className="pp-mob-exp-item">
                <div className="pp-exp-logo sm" style={{ background: exp.color + '15', color: exp.color }}>
                  {exp.abbr}
                </div>
                <div>
                  <p className="pp-exp-title">{exp.title}</p>
                  <p className="pp-exp-company">{exp.company}</p>
                  <p className="pp-exp-meta sm">
                    <span>{exp.period}</span>
                    <span className="pp-dot">•</span>
                    <MapPin size={10} /> {exp.location}
                  </p>
                </div>
              </div>
            ))}
            <button className="pp-view-all-link">View All Experience</button>
          </div>

          <div style={{ height: '80px' }} />
        </div>

        <BottomNav activeTab="profile" />
      </div>
    </div>
  );
};

export default ProfilePage;
