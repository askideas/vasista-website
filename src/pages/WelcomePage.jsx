import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Target, Handshake, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './WelcomePage.css';
import logo from '../assets/logo-vasista.png';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="wp-root">
      {/* ── DESKTOP LAYOUT ──────────────────────────────────── */}
      <div className="wp-desktop">
        {/* Orange blob – top-left corner */}
        <div className="wp-blob-tl" />

        {/* ── LEFT PANEL: logo + brand ── */}
        <motion.div
          className="wp-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img src={logo} alt="Vasista Logo" className="wp-logo" />
        </motion.div>

        {/* ── RIGHT PANEL: content ── */}
        <motion.div
          className="wp-right"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <h1 className="wp-title">Welcome to Vasista</h1>
          <p className="wp-subtitle">Your trusted partner in<br />manpower solutions.</p>

          <div className="wp-features">
            <div className="wp-feat">
              <Users size={28} strokeWidth={1.8} />
              <span>RIGHT PEOPLE</span>
            </div>
            <div className="wp-sep" />
            <div className="wp-feat">
              <Target size={28} strokeWidth={1.8} />
              <span>RIGHT SKILLS</span>
            </div>
            <div className="wp-sep" />
            <div className="wp-feat">
              <Handshake size={28} strokeWidth={1.8} />
              <span>RIGHT SOLUTION</span>
            </div>
          </div>

          <button className="wp-btn" onClick={() => navigate('/login')}>
            Get Started <ArrowRight size={18} strokeWidth={2.5} />
          </button>

          <div className="wp-tagline">
            <span className="wp-tline" />
            <span className="wp-ttext">POWERING YOUR GROWTH</span>
            <span className="wp-tline" />
          </div>
        </motion.div>

        {/* City skyline silhouette strip */}
        <div className="wp-skyline-strip">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,80 L0,120 L1200,120 L1200,80
              L1170,80 L1170,50 L1155,50 L1155,30 L1145,30 L1145,50 L1130,50 L1130,80
              L1100,80 L1100,40 L1090,40 L1090,20 L1080,20 L1080,40 L1070,40 L1070,80
              L1040,80 L1040,55 L1030,55 L1030,35 L1020,35 L1020,55 L1010,55 L1010,80
              L980,80 L980,45 L970,45 L970,25 L960,25 L960,45 L950,45 L950,80
              L900,80 L900,60 L890,60 L890,40 L880,40 L880,60 L870,60 L870,80
              L840,80 L840,50 L830,50 L830,30 L820,30 L820,50 L810,50 L810,80
              L780,80 L780,65 L770,65 L770,45 L760,45 L760,65 L750,65 L750,80
              L700,80 L700,55 L690,55 L690,35 L680,35 L680,55 L670,55 L670,80
              L640,80 L640,45 L630,45 L630,25 L620,25 L620,45 L610,45 L610,80
              L580,80 L580,60 L570,60 L570,40 L560,40 L560,60 L550,60 L550,80
              L500,80 L500,50 L490,50 L490,30 L480,30 L480,50 L470,50 L470,80
              L440,80 L440,65 L430,65 L430,45 L420,45 L420,65 L410,65 L410,80
              L380,80 L380,55 L370,55 L370,35 L360,35 L360,55 L350,55 L350,80
              L320,80 L320,45 L310,45 L310,25 L300,25 L300,45 L290,45 L290,80
              L250,80 L250,60 L240,60 L240,40 L230,40 L230,60 L220,60 L220,80
              L190,80 L190,50 L180,50 L180,30 L170,30 L170,50 L160,50 L160,80
              L130,80 L130,65 L120,65 L120,45 L110,45 L110,65 L100,65 L100,80
              L60,80 L60,55 L50,55 L50,35 L40,35 L40,55 L30,55 L30,80
              Z"
              fill="rgba(180,210,240,0.35)"
            />
          </svg>
        </div>

        {/* Navy + orange wave at bottom */}
        <div className="wp-wave-wrap">
          <svg viewBox="0 0 1200 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            {/* orange thin wave line */}
            <path d="M0,55 C300,20 900,90 1200,40 L1200,60 C900,110 300,40 0,75 Z" fill="#f29727" opacity="0.9" />
            {/* navy solid wave */}
            <path d="M0,65 C300,30 900,100 1200,50 L1200,100 L0,100 Z" fill="#001f3f" />
          </svg>
        </div>
      </div>

      {/* ── MOBILE LAYOUT ──────────────────────────────────── */}
      <div className="wp-mobile">
        {/* top orange blob */}
        <div className="wp-mob-blob" />

        {/* logo + brand on white area */}
        <motion.div
          className="wp-mob-top"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img src={logo} alt="Vasista Logo" className="wp-mob-logo" />

          <div className="wp-mob-features">
            <div className="wp-feat-sm">
              <Users size={22} strokeWidth={1.8} />
              <span>RIGHT PEOPLE</span>
            </div>
            <div className="wp-sep-sm" />
            <div className="wp-feat-sm">
              <Target size={22} strokeWidth={1.8} />
              <span>RIGHT SKILLS</span>
            </div>
            <div className="wp-sep-sm" />
            <div className="wp-feat-sm">
              <Handshake size={22} strokeWidth={1.8} />
              <span>RIGHT SOLUTION</span>
            </div>
          </div>
        </motion.div>

        {/* navy wave section */}
        <div className="wp-mob-wave-section">
          {/* orange wave divider */}
          <div className="wp-mob-wave-svg">
            <svg viewBox="0 0 375 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,30 C100,5 275,55 375,20 L375,45 C275,80 100,30 0,55 Z" fill="#f29727" />
              <path d="M0,40 C100,15 275,65 375,30 L375,60 L0,60 Z" fill="#001f3f" />
            </svg>
          </div>

          {/* content on navy */}
          <motion.div
            className="wp-mob-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="wp-mob-title">Welcome to Vasista</h1>
            <p className="wp-mob-subtitle">Your trusted partner in manpower solutions.</p>

            <button className="wp-mob-btn" onClick={() => navigate('/login')}>
              Get Started <ArrowRight size={18} strokeWidth={2.5} />
            </button>

            <div className="wp-mob-tagline">
              <span className="wp-tline-w" />
              <span className="wp-ttext-w">POWERING YOUR GROWTH</span>
              <span className="wp-tline-w" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
