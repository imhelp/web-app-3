import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './mainPage_style.css';

const FEATURES = [
  { id: 'congestion', title: '혼잡도 제보', desc: '식당 혼잡도를 실시간으로 확인해요', path: '/congestion', color: '#5B6CF5' },
  { id: 'info',       title: '식당 정보',   desc: '운영시간과 혼잡도를 한눈에 봐요', path: '/info',       color: '#F59E0B' },
  { id: 'map',        title: '캠퍼스 지도', desc: '건물 위치를 한눈에 찾아봐요',     path: '/map',        color: '#0D9488' },
];

function FeatureIcon({ id }) {
  if (id === 'congestion') return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
  if (id === 'info') return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
  if (id === 'map') return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
  return null;
}

export default function MainPage() {
  const navigate  = useNavigate();
  const studentId = localStorage.getItem('studentId') || sessionStorage.getItem('studentId');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const logout = () => {
    localStorage.removeItem('studentId');
    localStorage.removeItem('loginType');
    localStorage.removeItem('isLogin');
    sessionStorage.removeItem('studentId');
    sessionStorage.removeItem('loginType');
    setMenuOpen(false);
    alert('로그아웃 되었습니다.');
    navigate('/login');
  };

return (
    <div className="mp">

      {/* 헤더 */}
      <header className="mp-hdr">
        <span className="mp-logo" onClick={() => navigate('/main')}>밥탐</span>
        <nav className="mp-nav">
          {FEATURES.map(f => (
            <button key={f.id} className="mp-nav-btn" onClick={() => navigate(f.path)}>{f.title}</button>
          ))}
        </nav>
        <div className="mp-profile" ref={menuRef}>
          {studentId ? (
            <>
              <button className="mp-avatar" onClick={() => setMenuOpen(v => !v)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4"/>
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
              </button>
              {menuOpen && (
                <div className="mp-dropdown">
                  <div className="mp-dd-id">{studentId}</div>
                  <hr className="mp-dd-div" />
                  <button className="mp-dd-item" onClick={() => { setMenuOpen(false); navigate('/mypage'); }}>내 정보</button>
                  <button className="mp-dd-item" onClick={logout}>로그아웃</button>
                </div>
              )}
            </>
          ) : (
            <button className="mp-login-btn" onClick={() => navigate('/login')}>로그인</button>
          )}
        </div>
      </header>

      <main className="mp-main">

        {/* 히어로 */}
        <section className="mp-hero">
          <h1 className="mp-hero-title">밥탐</h1>
          <p className="mp-hero-sub">
            실시간 제보를 확인하는<br />
            식당 혼잡도 서비스입니다
          </p>
          <div className="mp-hero-actions">
            <button className="mp-hero-cta" onClick={() => navigate('/congestion')}>
              혼잡도 확인하기 →
            </button>
          </div>
        </section>

        {/* 기능 카드 */}
        <section className="mp-cards">
          {FEATURES.map((f, i) => (
            <button
              key={f.id}
              className="mp-card"
              style={{ '--fc': f.color, '--ic': f.color, animationDelay: `${i * 0.12}s` }}
              onClick={() => navigate(f.path)}
            >
              <div className="mp-card-icon">
                <FeatureIcon id={f.id} />
              </div>
              <div className="mp-card-content">
                <span className="mp-card-title">{f.title}</span>
                <p className="mp-card-desc">{f.desc}</p>
              </div>
              <span className="mp-card-arrow">→</span>
            </button>
          ))}
        </section>

      </main>
    </div>
  );
}
