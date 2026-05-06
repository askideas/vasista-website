import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Target, Handshake, ArrowRight, Smartphone, User,
  ShieldCheck, Clock, Pencil, ChevronDown, ArrowLeft
} from 'lucide-react';
import './LoginPage.css';
import logo from '../assets/logo-vasista.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(90);
  const [timerActive, setTimerActive] = useState(false);
  const [roleTab, setRoleTab] = useState('candidate'); // 'candidate' | 'business'

  const handleTabSwitch = (tab) => {
    setRoleTab(tab);
    setStep(1);
    setPhone('');
    setOtp(['', '', '', '', '', '']);
  };

  // ── Desktop OTP refs ──
  const d0 = useRef(null), d1 = useRef(null), d2 = useRef(null);
  const d3 = useRef(null), d4 = useRef(null), d5 = useRef(null);
  const desktopRefs = [d0, d1, d2, d3, d4, d5];

  // ── Mobile OTP refs ──
  const m0 = useRef(null), m1 = useRef(null), m2 = useRef(null);
  const m3 = useRef(null), m4 = useRef(null), m5 = useRef(null);
  const mobileRefs = [m0, m1, m2, m3, m4, m5];

  /* ── auto-focus first box whenever step 2 becomes visible ── */
  useEffect(() => {
    if (step === 2) {
      const id = requestAnimationFrame(() => {
        // focus whichever layout is currently visible
        if (window.innerWidth > 768) {
          d0.current?.focus();
        } else {
          m0.current?.focus();
        }
      });
      return () => cancelAnimationFrame(id);
    }
  }, [step]);

  /* ── countdown ── */
  useEffect(() => {
    if (!timerActive || timer === 0) return;
    const id = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [timerActive, timer]);

  const fmt = s =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  /* ── OTP change: fill current box, advance focus (refs = layout-specific array) ── */
  const handleOtpChange = (val, i, refs) => {
    if (!/^\d?$/.test(val)) return;
    setOtp(prev => {
      const next = [...prev];
      next[i] = val;
      return next;
    });
    if (val !== '' && i < 5) {
      refs[i + 1].current?.focus();
    }
  };

  /* ── Backspace: clear box, retreat focus ── */
  const handleOtpKeyDown = (e, i, refs) => {
    if (e.key === 'Backspace') {
      if (otp[i] !== '') {
        setOtp(prev => { const n = [...prev]; n[i] = ''; return n; });
      } else if (i > 0) {
        refs[i - 1].current?.focus();
        setOtp(prev => { const n = [...prev]; n[i - 1] = ''; return n; });
      }
      e.preventDefault();
    }
    if (e.key === 'ArrowLeft' && i > 0) refs[i - 1].current?.focus();
    if (e.key === 'ArrowRight' && i < 5) refs[i + 1].current?.focus();
  };

  /* ── Paste: fill all six at once ── */
  const handleOtpPaste = (e, refs) => {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const next = ['', '', '', '', '', ''];
    digits.split('').forEach((ch, i) => { next[i] = ch; });
    setOtp(next);
    const lastFilled = Math.min(digits.length, 5);
    refs[lastFilled].current?.focus();
  };

  const sendOtp = () => {
    if (phone.length < 10 || !agreed) return;
    setOtp(['', '', '', '', '', '']);
    setStep(2);
    setTimer(90);
    setTimerActive(true);
  };

  const resendOtp = () => {
    setOtp(['', '', '', '', '', '']);
    setTimer(90);
    requestAnimationFrame(() => {
      if (window.innerWidth > 768) d0.current?.focus();
      else m0.current?.focus();
    });
  };

  const verifyOtp = () => navigate('/home');

  /* ════════════════════════════════════════
     RENDER
  ════════════════════════════════════════ */
  return (
    <div className="lp-root">

      {/* ═══ DESKTOP ════════════════════════════════════ */}
      <div className="lp-desktop">

        {/* ── Left brand panel ── */}
        <div className="lp-left">
          <div className="lp-blob" />
          <div className="lp-left-inner">
            <img src={logo} alt="Vasista" className="lp-logo" />
            <h2 className="lp-brand-tag">Welcome to Vasista</h2>
            <p className="lp-brand-sub">Your trusted partner in manpower solutions.</p>
            <div className="lp-features">
              <div className="lp-feat"><Users size={24} strokeWidth={1.8} /><span>RIGHT PEOPLE</span></div>
              <div className="lp-vsep" />
              <div className="lp-feat"><Target size={24} strokeWidth={1.8} /><span>RIGHT SKILLS</span></div>
              <div className="lp-vsep" />
              <div className="lp-feat"><Handshake size={24} strokeWidth={1.8} /><span>RIGHT SOLUTION</span></div>
            </div>
            <div className="lp-powering">
              <span className="lp-hline" /><span>POWERING YOUR GROWTH</span><span className="lp-hline" />
            </div>
          </div>
          <div className="lp-skyline">
            <svg viewBox="0 0 800 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,60 L0,90 L800,90 L800,60
                L780,60 L780,35 L770,35 L770,20 L762,20 L762,35 L752,35 L752,60
                L730,60 L730,28 L720,28 L720,12 L712,12 L712,28 L702,28 L702,60
                L680,60 L680,38 L670,38 L670,22 L662,22 L662,38 L652,38 L652,60
                L630,60 L630,45 L622,45 L622,28 L614,28 L614,45 L606,45 L606,60
                L580,60 L580,32 L570,32 L570,16 L562,16 L562,32 L552,32 L552,60
                L530,60 L530,42 L520,42 L520,26 L512,26 L512,42 L502,42 L502,60
                L475,60 L475,50 L466,50 L466,34 L458,34 L458,50 L449,50 L449,60
                L420,60 L420,38 L410,38 L410,22 L402,22 L402,38 L392,38 L392,60
                L370,60 L370,30 L360,30 L360,14 L352,14 L352,30 L342,30 L342,60
                L318,60 L318,44 L308,44 L308,28 L300,28 L300,44 L290,44 L290,60
                L262,60 L262,36 L252,36 L252,20 L244,20 L244,36 L234,36 L234,60
                L210,60 L210,48 L200,48 L200,32 L192,32 L192,48 L182,48 L182,60
                L155,60 L155,38 L145,38 L145,22 L137,22 L137,38 L127,38 L127,60
                L100,60 L100,28 L90,28 L90,12 L82,12 L82,28 L72,28 L72,60
                L48,60 L48,42 L38,42 L38,26 L30,26 L30,42 L20,42 L20,60 Z"
                fill="rgba(160,200,230,0.3)"
              />
            </svg>
          </div>
          <div className="lp-wave">
            <svg viewBox="0 0 800 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,40 C200,10 600,70 800,25 L800,52 C600,97 200,37 0,67 Z" fill="#f29727" opacity="0.9" />
              <path d="M0,52 C200,22 600,82 800,37 L800,80 L0,80 Z" fill="#001f3f" />
            </svg>
          </div>
        </div>

        {/* ── Right form panel ── */}
        <div className="lp-right">

          {/* Step indicator — outside AnimatePresence, never animates */}
          <div className="lp-steps">
            <div className={`lp-step-dot ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className={`lp-step-line ${step >= 2 ? 'filled' : ''}`} />
            <div className={`lp-step-dot ${step >= 2 ? 'active' : ''}`}>2</div>
          </div>

          <div className="lp-form-area">
            {/* Both steps always rendered — visibility toggled by CSS.
                This keeps all 6 OTP refs permanently attached to the DOM. */}

            {/* ── STEP 1: Phone entry ── */}
            <div
              className="lp-form-card"
              style={{ display: step === 1 ? 'flex' : 'none' }}
            >
              {/* ── Role Tab Switcher ── */}
              <div className="lp-tab-switch">
                <button
                  className={`lp-tab ${roleTab === 'candidate' ? 'active' : ''}`}
                  onClick={() => handleTabSwitch('candidate')}
                >
                  <User size={15} /> Candidate
                </button>
                <button
                  className={`lp-tab ${roleTab === 'business' ? 'active' : ''}`}
                  onClick={() => handleTabSwitch('business')}
                >
                  <Handshake size={15} /> Business Owner
                </button>
                <div className={`lp-tab-indicator ${roleTab === 'business' ? 'right' : ''}`} />
              </div>

              <div className="lp-form-heading">
                <div className="lp-icon-circle"><Smartphone size={20} /></div>
                <div>
                  <h2 className="lp-form-title">
                    {roleTab === 'candidate' ? 'Candidate Login' : 'Business Owner Login'}
                  </h2>
                  <p className="lp-form-sub">
                    {roleTab === 'candidate'
                      ? 'Find the right job with Vasista'
                      : 'Hire the right talent with Vasista'}
                  </p>
                </div>
              </div>

              <label className="lp-label">Mobile Number</label>
              <div className="lp-phone-row">
                <div className="lp-country">
                  <img src="https://flagcdn.com/w20/in.png" alt="IN" className="lp-flag" />
                  <span>+91</span>
                  <ChevronDown size={14} />
                </div>
                <input
                  className="lp-phone-input"
                  type="tel"
                  maxLength={10}
                  placeholder="Enter mobile number"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                />
              </div>

              <label className="lp-checkbox-row">
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
                <span>I agree to the <a href="#">Terms &amp; Conditions</a> and <a href="#">Privacy Policy</a></span>
              </label>

              <button
                className={`lp-primary-btn ${!agreed || phone.length < 10 ? 'disabled' : ''}`}
                onClick={sendOtp}
                disabled={!agreed || phone.length < 10}
              >
                Send OTP <ArrowRight size={18} strokeWidth={2.5} />
              </button>

              {/* <div className="lp-or"><span>OR</span></div>

                  <button className="lp-secondary-btn">
                    <User size={18} /> Continue with Account
                  </button> */}
            </div>

            {/* ── STEP 2: OTP verify ── */}
            <div
              className="lp-form-card"
              style={{ display: step === 2 ? 'flex' : 'none' }}
            >
              <h2 className="lp-otp-title">Verify OTP</h2>
              <p className="lp-otp-sub">Enter the 6-digit OTP sent to</p>
              <p className="lp-otp-number">
                +91 {phone}{' '}
                <button className="lp-edit-btn" onClick={() => setStep(1)}><Pencil size={14} /></button>
              </p>

              {/* ── Desktop OTP boxes ── */}
              <div className="lp-otp-grid" onPaste={e => handleOtpPaste(e, desktopRefs)}>
                {desktopRefs.map((ref, i) => (
                  <input
                    key={i}
                    ref={ref}
                    className={`lp-otp-box${otp[i] ? ' filled' : ''}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[i]}
                    onChange={e => handleOtpChange(e.target.value, i, desktopRefs)}
                    onKeyDown={e => handleOtpKeyDown(e, i, desktopRefs)}
                    autoComplete="one-time-code"
                  />
                ))}
              </div>

              <div className="lp-timer">
                <Clock size={15} className="lp-timer-icon" />
                OTP expires in <span className="lp-timer-val">{fmt(timer)}</span>
              </div>

              <button className="lp-primary-btn" onClick={verifyOtp}>Verify OTP</button>

              <p className="lp-resend">
                Didn't receive OTP?{' '}
                <button className="lp-resend-link" onClick={resendOtp} disabled={timer > 0}>
                  Resend OTP
                </button>
              </p>
            </div>
          </div>

          <div className="lp-safety">
            <ShieldCheck size={16} /> Your data is safe and secure with us
          </div>
        </div>
      </div>

      {/* ═══ MOBILE ══════════════════════════════════════ */}
      <div className="lp-mobile">
        <div className="lp-mob-blob" />

        {step === 2 && (
          <button className="lp-mob-back" onClick={() => setStep(1)}>
            <ArrowLeft size={22} />
          </button>
        )}

        <div className="lp-mob-logo-wrap">
          <img src={logo} alt="Vasista" className="lp-mob-logo" />
        </div>

        <div className="lp-mob-body">
          {/* Both steps always rendered for stable refs */}
          <div style={{ display: step === 1 ? 'block' : 'none' }}>
            <h2 className="lp-mob-welcome">Welcome to Vasista</h2>
            <p className="lp-mob-wsub">Your trusted partner in manpower solutions.</p>

            {/* ── Role Tab Switcher (mobile) ── */}
            <div className="lp-tab-switch">
              <button
                className={`lp-tab ${roleTab === 'candidate' ? 'active' : ''}`}
                onClick={() => handleTabSwitch('candidate')}
              >
                <User size={14} /> Candidate
              </button>
              <button
                className={`lp-tab ${roleTab === 'business' ? 'active' : ''}`}
                onClick={() => handleTabSwitch('business')}
              >
                <Handshake size={14} /> Business Owner
              </button>
              <div className={`lp-tab-indicator ${roleTab === 'business' ? 'right' : ''}`} />
            </div>

            <div className="lp-mob-login-label">
              <div className="lp-mob-phone-icon"><Smartphone size={18} /></div>
              <div>
                <p className="lp-mob-ll-title">
                  {roleTab === 'candidate' ? 'Candidate Login' : 'Business Owner Login'}
                </p>
                <p className="lp-mob-ll-sub">
                  {roleTab === 'candidate'
                    ? 'Find the right job with Vasista'
                    : 'Hire the right talent with Vasista'}
                </p>
              </div>
            </div>

            <div className="lp-phone-row">
              <div className="lp-country">
                <img src="https://flagcdn.com/w20/in.png" alt="IN" className="lp-flag" />
                <span>+91</span>
                <ChevronDown size={14} />
              </div>
              <input
                className="lp-phone-input"
                type="tel"
                maxLength={10}
                placeholder="Enter mobile number"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
              />
            </div>

            <label className="lp-checkbox-row">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
              <span>I agree to the <a href="#">Terms &amp; Conditions</a> and <a href="#">Privacy Policy</a></span>
            </label>

            <button
              className={`lp-primary-btn ${!agreed || phone.length < 10 ? 'disabled' : ''}`}
              onClick={sendOtp}
              disabled={!agreed || phone.length < 10}
            >
              Send OTP <ArrowRight size={18} strokeWidth={2.5} />
            </button>

            {/* <div className="lp-or"><span>OR</span></div>

            <button className="lp-secondary-btn">
              <User size={18} /> Continue with Account
            </button> */}
          </div>

          <div style={{ display: step === 2 ? 'block' : 'none' }}>
            <h2 className="lp-mob-otp-title">Verify Your Mobile Number</h2>
            <p className="lp-mob-otp-sub">Enter the 6-digit OTP sent to</p>
            <p className="lp-otp-number">
              +91 {phone}{' '}
              <button className="lp-edit-btn" onClick={() => setStep(1)}><Pencil size={14} /></button>
            </p>

            {/* ── Mobile OTP boxes ── */}
            <div className="lp-otp-grid" onPaste={e => handleOtpPaste(e, mobileRefs)}>
              {mobileRefs.map((ref, i) => (
                <input
                  key={i}
                  ref={ref}
                  className={`lp-otp-box${otp[i] ? ' filled' : ''}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={otp[i]}
                  onChange={e => handleOtpChange(e.target.value, i, mobileRefs)}
                  onKeyDown={e => handleOtpKeyDown(e, i, mobileRefs)}
                  autoComplete="one-time-code"
                />
              ))}
            </div>

            <div className="lp-timer">
              <Clock size={15} className="lp-timer-icon" />
              OTP expires in <span className="lp-timer-val">{fmt(timer)}</span>
            </div>

            <button className="lp-primary-btn" onClick={verifyOtp}>Verify OTP</button>

            <p className="lp-resend">
              Didn't receive OTP?{' '}
              <button className="lp-resend-link" onClick={resendOtp} disabled={timer > 0}>
                Resend OTP
              </button>
            </p>
          </div>
        </div>

        <div className="lp-mob-bottom">
          <div className="lp-mob-skyline">
            <svg viewBox="0 0 375 70" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,50 L0,70 L375,70 L375,50
                L362,50 L362,30 L356,30 L356,18 L350,18 L350,30 L344,30 L344,50
                L330,50 L330,22 L324,22 L324,10 L318,10 L318,22 L312,22 L312,50
                L298,50 L298,32 L292,32 L292,20 L286,20 L286,32 L280,32 L280,50
                L265,50 L265,38 L259,38 L259,26 L253,26 L253,38 L247,38 L247,50
                L232,50 L232,28 L226,28 L226,16 L220,16 L220,28 L214,28 L214,50
                L198,50 L198,36 L192,36 L192,24 L186,24 L186,36 L180,36 L180,50
                L165,50 L165,42 L159,42 L159,30 L153,30 L153,42 L147,42 L147,50
                L132,50 L132,34 L126,34 L126,22 L120,22 L120,34 L114,34 L114,50
                L98,50 L98,26 L92,26 L92,14 L86,14 L86,26 L80,26 L80,50
                L64,50 L64,38 L58,38 L58,26 L52,26 L52,38 L46,38 L46,50
                L30,50 L30,30 L24,30 L24,18 L18,18 L18,30 L12,30 L12,50 Z"
                fill="rgba(160,200,230,0.35)"
              />
            </svg>
          </div>
          <div className="lp-mob-wave">
            <svg viewBox="0 0 375 55" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,20 C100,0 275,42 375,12 L375,32 C275,62 100,20 0,40 Z" fill="#f29727" opacity="0.9" />
              <path d="M0,30 C100,10 275,52 375,22 L375,55 L0,55 Z" fill="#001f3f" />
            </svg>
          </div>
          <div className="lp-mob-safety-bar">
            <ShieldCheck size={14} /> Your data is safe and secure with us
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
