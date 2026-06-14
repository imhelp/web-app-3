import React, { useState } from "react";

const LEVEL_TO_PERCENT = { LOW: 22, MEDIUM: 58, HIGH: 94, UNKNOWN: 0 };

const formatAgo = (seconds) => {
  if (seconds == null) return null;
  if (seconds < 60) return '방금 전';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}분 전`;
  return `${Math.floor(seconds / 3600)}시간 전`;
};

const SIGNAL_COLOR = { LOW: '#16A34A', MEDIUM: '#D97706', HIGH: '#DC2626' };

function SignalBars({ count, level }) {
  const filled = count >= 7 ? 3 : count >= 3 ? 2 : count >= 1 ? 1 : 0;
  const color = SIGNAL_COLOR[level] || '#9CA3AF';
  const heights = [8, 13, 18];
  return (
    <svg width="22" height="18" viewBox="0 0 22 18" style={{ verticalAlign: 'middle', marginRight: 4, flexShrink: 0 }}>
      {heights.map((h, i) => (
        <rect key={i} x={i * 7 + 1} y={18 - h} width="5" height={h} rx="1.5"
          fill={i < filled ? color : '#E5E7EB'} />
      ))}
    </svg>
  );
}

export default function Item({
  id, name, displayName, buildingColor,
  level, label, reportCount, lastReportedSecondsAgo,
  isClosed,
  onReport,
  onCardClick,
}) {
  const [justVoted, setJustVoted] = useState(null);

  const cardName   = displayName || name;
  const levelClass = isClosed ? 'none'
                   : level === 'UNKNOWN' ? 'none'
                   : (level?.toLowerCase() ?? 'none');
  const percent    = isClosed ? 0 : (LEVEL_TO_PERCENT[level] ?? 0);
  const agoText    = formatAgo(lastReportedSecondsAgo);

  const handleReport = (e, lvl) => {
    e.stopPropagation();
    if (isClosed) return;
    setJustVoted(lvl);
    setTimeout(() => setJustVoted(null), 2000);
    onReport(id, lvl);
  };

  return (
    <div
      className={`restaurant_card${isClosed ? ' card_closed' : ''}${onCardClick ? ' card_clickable' : ''}`}
      style={{ '--bc': isClosed ? 'transparent' : (buildingColor || 'transparent') }}
      onClick={onCardClick}
    >
      {/* 구역 이름 + 혼잡도 / 운영종료 뱃지 */}
      <div className="card_header_info">
        <div className="card_title_area">
          <span className={`status_dot ${levelClass}`} />
          <h3 className="card_zone_name">{cardName}</h3>
        </div>
        {isClosed
          ? <span className="card_closed_badge">운영 종료</span>
          : level !== 'UNKNOWN' && label
            ? <span className={`status_text_badge ${levelClass}`}>{label}</span>
            : null
        }
      </div>

      {/* 혼잡도 게이지 */}
      <div className="gauge_bar_track">
        <div
          className={`gauge_bar_fill ${levelClass}`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* 제보 현황 + 신뢰도 바 */}
      <div className="card_report_info">
        {isClosed
          ? <span className="no_report">오늘 운영이 종료되었습니다</span>
          : reportCount > 0
            ? <>
                <SignalBars count={reportCount} level={level} />
                최근 <strong>{reportCount}건</strong>의 제보
                {agoText && <span className="ago_text"> · {agoText}</span>}
              </>
            : <span className="no_report">최근 20분 이내 제보 없음</span>
        }
      </div>

      {/* 혼잡도 직접 제보 버튼 */}
      <div className="report_btn_row">
        <button
          className={`btn_report btn_low${justVoted === 'LOW' ? ' btn_voted' : ''}`}
          onClick={(e) => handleReport(e, 'LOW')}
          disabled={isClosed}
        >
          여유
        </button>
        <button
          className={`btn_report btn_medium${justVoted === 'MEDIUM' ? ' btn_voted' : ''}`}
          onClick={(e) => handleReport(e, 'MEDIUM')}
          disabled={isClosed}
        >
          보통
        </button>
        <button
          className={`btn_report btn_high${justVoted === 'HIGH' ? ' btn_voted' : ''}`}
          onClick={(e) => handleReport(e, 'HIGH')}
          disabled={isClosed}
        >
          혼잡
        </button>
      </div>
    </div>
  );
}
