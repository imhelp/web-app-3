import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../MenuReView/NavActions.css';
import './mainPage_style.css';

export default function MainPage() {
  const navigate = useNavigate();
  const studentId = localStorage.getItem("studentId");

  const logout = () => {

    localStorage.removeItem("studentId");
    localStorage.removeItem("isLogin");

    alert("로그아웃 되었습니다.");

    navigate("/");
  };

  const deleteUser = async () => {

    const studentId =
      localStorage.getItem("studentId");

    try {

      const response = await fetch(
        "http://localhost:8080/deleteUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            studentId
          })
        }
      );

      const data = await response.json();

      if (data.success) {

        alert("회원탈퇴 완료");

        localStorage.removeItem(
          "studentId"
        );

        navigate("/");

      } else {

        alert("회원 정보 없음");

      }

    } catch (error) {

      console.log(error);

      alert("탈퇴 실패");

    }
  };
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
      </div>

      <div className="Menu-Nav-Actions main-page-nav">
        <button type="button" onClick={() => navigate('/login')}>
          로그인/회원가입
        </button>
        <button type="button" onClick={logout}>
          로그아웃
        </button>
        <button type="button" onClick={deleteUser}>
          회원탈퇴
        </button>
      </div>

      <p>현재 로그인: {studentId}</p>
    </div>
  );
}
