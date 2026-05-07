import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, Briefcase, FileText, User, Home, Grid,
  Bell, MessageSquare, ChevronDown, Eye, Pencil,
  Plus, Download, ExternalLink, CheckCircle, Building2,
  GraduationCap, Globe, GitBranch, ChevronRight,
  Menu, MoreVertical, Users, Clock
} from 'lucide-react';
import './ProfilePage.css';
import logo from '../assets/logo-vasista.png';
import BottomNav from '../components/BottomNav';
import OnboardingForm from '../components/OnboardingForm';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('info');
  const [showAllSkills, setShowAllSkills] = useState(false);
  
  const userStr = localStorage.getItem('user');
  const userObj = userStr ? JSON.parse(userStr) : null;
  const isProfileIncomplete = userObj ? !userObj.firstName : false;

  const [isNewUser, setIsNewUser] = useState(localStorage.getItem('isNewUser') === 'true' || isProfileIncomplete);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem('user'));
      if (u) setUserData(u);
    } catch(e) {}
  }, [isNewUser]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login', { replace: true });
  };

  if (isNewUser) {
    return <OnboardingForm onSuccess={() => {
      localStorage.setItem('isNewUser', 'false');
      setIsNewUser(false);
    }} />;
  }

  const userExperience = userData?.experienceList || [];
  const userEducation = userData?.educationList || [];
  const userSkills = userData?.skills ? userData.skills.split(',').map(s => s.trim()).filter(Boolean) : [];
  
  const visibleSkills = showAllSkills ? userSkills : userSkills.slice(0, 6);
  
  const userInitials = userData?.firstName && userData?.lastName ? `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase() : 'U';
  const fullName = userData?.firstName ? `${userData.firstName} ${userData.lastName}` : 'Candidate Name';
  const userRole = userData?.qualification || 'Not Specified';
  const userLocation = userData?.city || 'Location Not Provided';
  const userExperienceYrs = userData?.experience ? `${userData.experience}+` : '0';

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
                { id: 'info', label: 'Info', icon: User },
                { id: 'allotments', label: 'Allotments', icon: Clock },
                { id: 'documents', label: 'Documents', icon: FileText }
              ].map(tab => (
                <button
                  key={tab.id}
                  className={`pp-tab-nav ${activeNav === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveNav(tab.id)}
                >
                  {activeNav === tab.id && (
                    <motion.div layoutId="header-tab-bg" className="pp-tab-nav-bg" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                  )}
                  <span className="pp-tab-nav-content">
                    <tab.icon size={15} /> {tab.label}
                  </span>
                </button>
              ))}
            </nav>
            <div className="pp-header-right">
              <button className="pp-icon-btn"><MessageSquare size={18} /></button>
              <button className="pp-icon-btn pp-notif">
                <Bell size={18} /><span className="pp-badge">2</span>
              </button>
              <div className="pp-profile-chip">
                <div className="pp-avatar-sm">{userInitials}</div>
                <div className="pp-profile-text">
                  <span className="pp-profile-name">{fullName}</span>
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
              <div className="pp-hero-avatar" style={userData?.profilePhoto ? { backgroundImage: `url(${userData.profilePhoto})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
                {!userData?.profilePhoto && <span className="pp-avatar-initials">{userInitials}</span>}
              </div>
              <div className="pp-hero-info">
                <h1 className="pp-hero-name">
                  {fullName}
                  {userData?.kycStatus === 'Verified' ? (
                    <span className="pp-verified-badge"><CheckCircle size={14} /> Verified</span>
                  ) : (
                    <span className="pp-pending-badge">Verification in progress</span>
                  )}
                  {userData?.candidateStatus && (
                    <span className={`pp-status-badge ${userData.candidateStatus.toLowerCase().replace(/\s+/g, '-')}`}>
                      {userData.candidateStatus}
                    </span>
                  )}
                </h1>
                <p className="pp-hero-title">{userRole}</p>
                <p className="pp-hero-location"><MapPin size={14} /> {userLocation}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="pp-public-btn">
                <Eye size={16} /> View Public Profile
              </button>
              <button className="pp-public-btn" onClick={handleLogout} style={{ backgroundColor: '#fff0f0', color: '#d32f2f', border: '1px solid #d32f2f' }}>
                Logout
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="pp-stats-row">
            {[
              { val: userExperienceYrs,  label: 'Years Experience' },
              { val: '0', label: 'Applications' },
              { val: '0',   label: 'Shortlisted' },
              { val: '0',   label: 'Interviews' },
            ].map(s => (
              <div key={s.label} className="pp-stat">
                <div className="pp-stat-val">{s.val}</div>
                <div className="pp-stat-label">{s.label}</div>
              </div>
            ))}
        </div>
      </div>

      {/* ── TAB CONTENT ── */}
        {activeNav === 'info' && (
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
              {userExperience.length > 0 ? (
                <>
                  <div className="pp-exp-list">
                    {userExperience.map((exp, i) => <ExpItem key={i} exp={exp} />)}
                  </div>
                  <button className="pp-view-all-link">View All Experience</button>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '20px 0', color: '#888', fontSize: '0.9rem' }}>
                  <p>No experience details added yet.</p>
                  <button style={{ marginTop: '10px', padding: '8px 16px', background: '#f0f4f8', color: '#001f3f', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Experience</button>
                </div>
              )}
            </SectionCard>

            {/* Education */}
            <SectionCard title="Education" actionLabel="+ Add Education" action={() => {}}>
              {userEducation.length > 0 ? (
                userEducation.map((edu, i) => (
                  <div key={i} className="pp-edu-item">
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
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '20px 0', color: '#888', fontSize: '0.9rem' }}>
                  <p>No education details added yet.</p>
                  <button style={{ marginTop: '10px', padding: '8px 16px', background: '#f0f4f8', color: '#001f3f', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Education</button>
                </div>
              )}
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
              {userSkills.length > 0 ? (
                <div className="pp-skills-wrap">
                  {userSkills.map((skill, i) => (
                    <span key={i} className="pp-skill-tag">{skill}</span>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '15px 0', color: '#888', fontSize: '0.9rem' }}>
                  <p>No skills added yet.</p>
                  <button style={{ marginTop: '10px', padding: '6px 14px', background: '#f0f4f8', color: '#001f3f', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Skills</button>
                </div>
              )}
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
        )}

        {activeNav === 'allotments' && (
          <div className="pp-tab-content">
            <div className="pp-card" style={{ maxWidth: '800px', margin: '20px auto' }}>
              <h2 className="pp-card-title" style={{ marginBottom: '15px' }}>Allotment History</h2>
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>
                <p>No allotments found.</p>
              </div>
            </div>
          </div>
        )}

        {activeNav === 'documents' && (
          <div className="pp-tab-content">
            <div className="pp-card" style={{ maxWidth: '800px', margin: '20px auto' }}>
              <h2 className="pp-card-title" style={{ marginBottom: '15px' }}>My Documents</h2>
              <div className="pp-docs-grid">
                <div className="pp-doc-item">
                  <p className="pp-doc-label">Profile Photo</p>
                  <div className="pp-doc-img" style={{ backgroundImage: `url(${userData?.profilePhoto || 'https://via.placeholder.com/150'})` }} />
                </div>
                <div className="pp-doc-item">
                  <p className="pp-doc-label">Aadhar Front</p>
                  <div className="pp-doc-img" style={{ backgroundImage: `url(${userData?.aadharFrontUrl || 'https://via.placeholder.com/300x200?text=Not+Uploaded'})` }} />
                </div>
                <div className="pp-doc-item">
                  <p className="pp-doc-label">Aadhar Back</p>
                  <div className="pp-doc-img" style={{ backgroundImage: `url(${userData?.aadharBackUrl || 'https://via.placeholder.com/300x200?text=Not+Uploaded'})` }} />
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
      <div className="pp-mobile">

        {/* Mobile header */}
        <header className="pp-mob-header">
          <button className="pp-icon-btn"><Menu size={20} /></button>
          <h1 className="pp-mob-title">Profile</h1>
          <button className="pp-icon-btn" onClick={handleLogout} style={{ color: '#d32f2f', fontSize: '12px', fontWeight: 'bold' }}>Logout</button>
        </header>

        <div className="pp-mob-content">

          {/* Mobile hero banner */}
          <div className="pp-mob-banner">
            <div className="pp-mob-avatar-wrap">
              <div className="pp-mob-avatar" style={userData?.profilePhoto ? { backgroundImage: `url(${userData.profilePhoto})`, backgroundSize: 'cover', backgroundPosition: 'center', color: 'transparent' } : {}}>{!userData?.profilePhoto && userInitials}</div>
              <button className="pp-mob-avatar-edit"><Pencil size={12} /></button>
            </div>
            <h2 className="pp-mob-name">
              {fullName} 
              {userData?.kycStatus === 'Verified' ? (
                <span className="pp-verified-badge" style={{ padding: '3px 8px', fontSize: '0.65rem' }}><CheckCircle size={12} /> Verified</span>
              ) : (
                <span className="pp-pending-badge" style={{ padding: '3px 8px', fontSize: '0.65rem' }}>Verification in progress</span>
              )}
              {userData?.candidateStatus && (
                <span className={`pp-status-badge ${userData.candidateStatus.toLowerCase().replace(/\s+/g, '-')}`} style={{ padding: '3px 8px', fontSize: '0.65rem', marginLeft: '5px' }}>
                  {userData.candidateStatus}
                </span>
              )}
            </h2>
            <p className="pp-mob-role">{userRole}</p>
            <p className="pp-mob-location"><MapPin size={12} /> {userLocation}</p>

            {/* Stats */}
            <div className="pp-mob-stats">
              {[
                { val: userExperienceYrs,  label: 'Experience' },
                { val: '0', label: 'Applications' },
                { val: '0',   label: 'Shortlisted' },
                { val: '0',   label: 'Interviews' },
              ].map(s => (
                <div key={s.label} className="pp-mob-stat">
                  <span className="pp-mob-stat-val">{s.val}</span>
                  <span className="pp-mob-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {activeNav === 'info' && (
            <>
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
            {userSkills.length > 0 ? (
              <div className="pp-skills-wrap">
                {visibleSkills.map((skill, i) => (
                  <span key={i} className="pp-skill-tag">{skill}</span>
                ))}
                {!showAllSkills && userSkills.length > 6 && (
                  <button className="pp-skill-more" onClick={() => setShowAllSkills(true)}>
                    +{userSkills.length - 6} more
                  </button>
                )}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '15px 0', color: '#888', fontSize: '0.85rem' }}>
                <p>No skills added yet.</p>
                <button style={{ marginTop: '10px', padding: '6px 14px', background: '#f0f4f8', color: '#001f3f', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Skills</button>
              </div>
            )}
          </div>

          {/* Experience (compact) */}
          <div className="pp-mob-card">
            <div className="pp-mob-card-hdr">
              <h3 className="pp-mob-section-title">Experience</h3>
              <button className="pp-edit-btn"><Pencil size={13} /> Edit</button>
            </div>
            {userExperience.length > 0 ? (
              <>
                {userExperience.map((exp, i) => (
                  <div key={i} className="pp-mob-exp-item">
                    <div className="pp-exp-logo sm" style={{ background: exp?.color ? exp.color + '15' : '#f0f4f8', color: exp?.color || '#001f3f' }}>
                      {exp?.abbr || 'EXP'}
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
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0', color: '#888', fontSize: '0.85rem' }}>
                <p>No experience details added yet.</p>
                <button style={{ marginTop: '10px', padding: '8px 16px', background: '#f0f4f8', color: '#001f3f', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Experience</button>
              </div>
            )}
          </div>
          </>
          )}

          {activeNav === 'allotments' && (
            <div className="pp-mob-card" style={{ marginBottom: '80px', padding: '30px 15px', textAlign: 'center' }}>
              <h3 className="pp-mob-section-title">Allotment History</h3>
              <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '10px' }}>No allotments found.</p>
            </div>
          )}

          {activeNav === 'documents' && (
            <div className="pp-mob-card" style={{ marginBottom: '80px', padding: '15px' }}>
              <h3 className="pp-mob-section-title" style={{ marginBottom: '15px' }}>My Documents</h3>
              <div className="pp-docs-grid mob">
                <div className="pp-doc-item">
                  <p className="pp-doc-label">Profile Photo</p>
                  <div className="pp-doc-img" style={{ backgroundImage: `url(${userData?.profilePhoto || 'https://via.placeholder.com/150'})` }} />
                </div>
                <div className="pp-doc-item">
                  <p className="pp-doc-label">Aadhar Front</p>
                  <div className="pp-doc-img" style={{ backgroundImage: `url(${userData?.aadharFrontUrl || 'https://via.placeholder.com/300x200?text=Not+Uploaded'})` }} />
                </div>
                <div className="pp-doc-item">
                  <p className="pp-doc-label">Aadhar Back</p>
                  <div className="pp-doc-img" style={{ backgroundImage: `url(${userData?.aadharBackUrl || 'https://via.placeholder.com/300x200?text=Not+Uploaded'})` }} />
                </div>
              </div>
            </div>
          )}

          <div style={{ height: '80px' }} />
        </div>

        <BottomNav 
          activeTab={activeNav} 
          onTabClick={(key) => setActiveNav(key)}
          items={[
            { key: 'info',       label: 'Info',       icon: User },
            { key: 'allotments', label: 'Allotments', icon: Clock },
            { key: 'documents',  label: 'Documents',  icon: FileText },
            { key: 'home',       label: 'Back',       icon: Home, path: '/home' }
          ]} 
        />
      </div>
    </div>
  );
};

export default ProfilePage;
