import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../MenuReView/NavActions.css';
import './mainPage_style.css';

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="main-page">
      <h1>메인 페이지 (테스트)</h1>
      <p className="main-page-desc">이동할 페이지를 선택하세요.</p>
      <div className="Menu-Nav-Actions main-page-nav">
        <button type="button" onClick={() => navigate('/menu')}>
          메뉴
        </button>
        <button type="button" onClick={() => navigate('/map')}>
          지도
        </button>
        <button type="button" onClick={() => navigate('/congestion')}>
          혼잡도
        </button>
        <button type="button" onClick={() => navigate('/login')}>
          로그인
        </button>
      </div>
    </div>
  );
}
