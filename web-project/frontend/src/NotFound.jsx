import { useNavigate } from 'react-router-dom';

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f8fafc',
    backgroundImage: 'radial-gradient(circle at 1px 1px, #d1d5db 1px, transparent 0)',
    backgroundSize: '26px 26px',
    fontFamily: "'Pretendard', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
    gap: '16px',
    textAlign: 'center',
    padding: '40px',
  },
  code: {
    fontSize: '7rem',
    fontWeight: 900,
    letterSpacing: '-0.06em',
    lineHeight: 1,
    background: 'linear-gradient(135deg, #0A0A0A 0%, #2563EB 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: 0,
  },
  msg: {
    fontSize: '1.15rem',
    color: '#6B7280',
    fontWeight: 500,
    margin: '8px 0 24px',
  },
  btn: {
    padding: '14px 32px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #2563EB 0%, #1d4ed8 100%)',
    color: '#fff',
    fontSize: '0.95rem',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(37,99,235,0.35)',
    transition: 'transform 0.15s, box-shadow 0.15s',
  },
};

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={styles.page}>
      <h1 style={styles.code}>404</h1>
      <p style={styles.msg}>페이지를 찾을 수 없습니다</p>
      <button
        style={styles.btn}
        onClick={() => navigate('/main')}
        onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 10px 32px rgba(37,99,235,0.5)'; }}
        onMouseLeave={e => { e.target.style.transform = ''; e.target.style.boxShadow = styles.btn.boxShadow; }}
      >
        메인으로 돌아가기
      </button>
    </div>
  );
}
