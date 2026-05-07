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

const RECOMMENDED_INDUSTRIES = [
  { id: 1, name: 'Construction', img: 'https://ik.imagekit.io/ecommerceapi/Sarees/ChatGPT%20Image%20May%207,%202026,%2002_45_59%20PM.png' },
  { id: 2, name: 'Software', img: 'https://ik.imagekit.io/ecommerceapi/Sarees/ChatGPT%20Image%20May%207,%202026,%2002_46_04%20PM.png' },
  { id: 3, name: 'Hospitality', img: 'https://ik.imagekit.io/ecommerceapi/Sarees/ChatGPT%20Image%20May%207,%202026,%2002_45_33%20PM.png' },
  { id: 4, name: 'Manufacturing', img: 'https://ik.imagekit.io/ecommerceapi/Sarees/ChatGPT%20Image%20May%207,%202026,%2002_45_43%20PM.png' },
  { id: 5, name: 'Retail', img: 'https://ik.imagekit.io/ecommerceapi/Sarees/ChatGPT%20Image%20May%207,%202026,%2002_45_51%20PM.png' },
  { id: 6, name: 'Logistics', img: 'https://ik.imagekit.io/ecommerceapi/Sarees/ChatGPT%20Image%20May%207,%202026,%2002_45_37%20PM.png' },
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('info');
  const [sliderIndex, setSliderIndex] = useState(0);
  const itemsPerView = 3;
  const maxIndex = RECOMMENDED_INDUSTRIES.length - itemsPerView;

  const nextSlide = () => setSliderIndex(prev => prev >= maxIndex ? 0 : prev + 1);
  const prevSlide = () => setSliderIndex(prev => prev <= 0 ? maxIndex : prev - 1);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000); // 4 seconds
    return () => clearInterval(timer);
  }, [maxIndex]);
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
    } catch (e) { }
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
              {/* <button className="pp-public-btn">
                <Eye size={16} /> View Public Profile
              </button> */}
              <button className="pp-public-btn" onClick={handleLogout} style={{ backgroundColor: '#fff0f0', color: '#d32f2f', border: '1px solid #d32f2f' }}>
                Logout
              </button>
            </div>
          </div>

          {/* Stats row */}
          {/* <div className="pp-stats-row">
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
        </div> */}
        </div>

        {/* ── TAB CONTENT ── */}
        {activeNav === 'info' && (
          <>
            {/* Recommended for you - FULL WIDTH WRAPPER */}
            <div className="pp-full-width-section">
              <div className="pp-card pp-recommended-section">
                <h3 className="pp-card-title">Recommended for you</h3>
                <p className="pp-card-subtitle">Based on your skills and preferences</p>
                <div className="pp-industry-slider-container">
                  <div className="pp-slider-actions">
                    <button className="pp-slider-btn prev" onClick={prevSlide} disabled={sliderIndex === 0}>
                      <ChevronRight style={{ transform: 'rotate(180deg)' }} size={18} />
                    </button>
                    <button className="pp-slider-btn next" onClick={nextSlide} disabled={sliderIndex >= maxIndex}>
                      <ChevronRight size={18} />
                    </button>
                  </div>
                  <div className="pp-industry-slider-wrapper">
                    <motion.div
                      className="pp-industry-slider"
                      animate={{ x: `-${sliderIndex * (100 / itemsPerView)}%` }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      {RECOMMENDED_INDUSTRIES.map(ind => (
                        <div key={ind.id} className="pp-industry-card">
                          <div className="pp-industry-img" style={{ backgroundImage: `url(${ind.img})` }}>
                            {/* No overlay as requested */}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pp-main-grid">
              <div className="pp-left-col">

                {/* About Me */}
                <SectionCard title="About Me" actionLabel="Edit" action={() => { }}>
                  <p className="pp-about-text">
                    Passionate and detail-oriented Software Engineer with 3+ years of experience in building
                    scalable web applications. Skilled in JavaScript, React, Node.js and cloud technologies.
                    Always eager to learn new technologies and solve real-world problems.
                  </p>
                </SectionCard>

                {/* Work Experience */}
                <SectionCard title="Work Experience" actionLabel="+ Add Experience" action={() => { }}>
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
                <SectionCard title="Education" actionLabel="+ Add Education" action={() => { }}>
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
                {/* Skills (Moved from left column to right as part of restructure) */}
                <SectionCard title="Skills" actionLabel="Edit" action={() => { }}>
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

                {/* Personal Information (Basic Info) */}
                <SectionCard title="Personal Information" actionLabel="Edit" action={() => { }}>
                  <div className="pp-info-grid">
                    <div className="pp-info-item">
                      <span className="pp-info-label">Current Status</span>
                      <span className={`pp-info-val ${userData?.candidateStatus === 'Open to work' ? 'status-open' : ''}`}>{userData?.candidateStatus || 'Not Specified'}</span>
                    </div>
                    <div className="pp-info-item">
                      <span className="pp-info-label">KYC Status</span>
                      <span className={`pp-info-val ${userData?.kycStatus === 'Verified' ? 'status-verified' : 'status-pending'}`}>{userData?.kycStatus || 'Pending'}</span>
                    </div>
                    <div className="pp-info-item">
                      <span className="pp-info-label">Guardian Name</span>
                      <span className="pp-info-val">{userData?.guardians?.[0]?.name || 'Not Specified'}</span>
                    </div>
                    <div className="pp-info-item">
                      <span className="pp-info-label">Guardian Relation</span>
                      <span className="pp-info-val">{userData?.guardians?.[0]?.relation || 'Not Specified'}</span>
                    </div>
                    <div className="pp-info-item">
                      <span className="pp-info-label">Guardian Phone</span>
                      <span className="pp-info-val">{userData?.guardians?.[0]?.phone || 'Not Specified'}</span>
                    </div>
                    <div className="pp-info-item">
                      <span className="pp-info-label">Date of Birth</span>
                      <span className="pp-info-val">{userData?.dob || 'Not Specified'}</span>
                    </div>
                    <div className="pp-info-item">
                      <span className="pp-info-label">Mobile Number</span>
                      <span className="pp-info-val">{userData?.phone || userData?.phoneNumber || 'Not Specified'}</span>
                    </div>
                    <div className="pp-info-item">
                      <span className="pp-info-label">Email ID</span>
                      <span className="pp-info-val" style={{ wordBreak: 'break-all' }}>{userData?.email || 'Not Specified'}</span>
                    </div>
                    <div className="pp-info-item">
                      <span className="pp-info-label">Location</span>
                      <span className="pp-info-val">{userData?.city && userData?.state ? `${userData.city}, ${userData.state}` : 'Not Specified'}</span>
                    </div>
                    <div className="pp-info-item">
                      <span className="pp-info-label">Address</span>
                      <span className="pp-info-val">{userData?.address || 'Not Specified'}</span>
                    </div>
                    <div className="pp-info-item">
                      <span className="pp-info-label">Qualification</span>
                      <span className="pp-info-val">{userData?.qualification || 'Not Specified'}</span>
                    </div>
                    <div className="pp-info-item">
                      <span className="pp-info-label">Total Experience</span>
                      <span className="pp-info-val">{userData?.experience ? `${userData.experience} Years` : 'Not Specified'}</span>
                    </div>
                    <div className="pp-info-item">
                      <span className="pp-info-label">KYC (Aadhar Number)</span>
                      <span className="pp-info-val">{userData?.aadharNumber || 'Not Specified'}</span>
                    </div>
                  </div>
                </SectionCard>
              </div>
            </div>
          </>
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
                { val: userExperienceYrs, label: 'Experience' },
                { val: '0', label: 'Applications' },
                { val: '0', label: 'Shortlisted' },
                { val: '0', label: 'Interviews' },
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
              {/* Recommended for you (Mobile) */}
              <div className="pp-mob-card pp-recommended-mob">
                <h3 className="pp-mob-section-title">Recommended for you</h3>
                <div className="pp-industry-slider-container mob">
                  <div className="pp-industry-slider mob">
                    {RECOMMENDED_INDUSTRIES.map(ind => (
                      <div key={ind.id} className="pp-industry-card mob">
                        <div className="pp-industry-img mob" style={{ backgroundImage: `url(${ind.img})` }}>
                          {/* No overlay as requested */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Personal Information (Mobile) */}
              <div className="pp-mob-card">
                <h3 className="pp-mob-section-title">Personal Information</h3>
                <div className="pp-info-grid mob">
                  <div className="pp-info-item">
                    <span className="pp-info-label">Father's Name</span>
                    <span className="pp-info-val">{userData?.fatherName || '-'}</span>
                  </div>
                  <div className="pp-info-item">
                    <span className="pp-info-label">Date of Birth</span>
                    <span className="pp-info-val">{userData?.dob || '-'}</span>
                  </div>
                  <div className="pp-info-item">
                    <span className="pp-info-label">Aadhar</span>
                    <span className="pp-info-val">{userData?.aadharNumber || '-'}</span>
                  </div>
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
            { key: 'info', label: 'Info', icon: User },
            { key: 'allotments', label: 'Allotments', icon: Clock },
            { key: 'documents', label: 'Documents', icon: FileText },
            { key: 'home', label: 'Back', icon: Home, path: '/home' }
          ]}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
