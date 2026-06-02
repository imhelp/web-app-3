import React from "react";

export default function Item({ id, name, status, level, people, zoneCongestion, onUpdate }) {
  return (
    <div className="restaurant_card">
      
      {/*구역 정보*/}
      <div className="card_header_info">
        <div className="card_title_area">
          <span className={`status_dot ${level}`}></span>
          <h3 className="card_zone_name">
            {name} {status && <span className={`status_text_badge ${level}`}>{status}</span>}
          </h3>
        </div>
        <div className="card_data_area">
          <span className="card_people_num">현재 {people || 0}명</span>
          <span className="card_percent_num">{zoneCongestion || 0}%</span>
        </div>
      </div>

      {/*실시간 확률 게이지 바 */}
      <div className="gauge_bar_track">
        <div 
          className={`gauge_bar_fill ${level}`} 
          style={{ width: `${zoneCongestion || 0}%` }}
        ></div>
      </div>

      {/*퇴장 버튼*/}
      <div className="card_button_container">
        {/*입장 버튼*/}
        <div className="button_row_top">
          <button className="btn_action enter_btn" onClick={() => onUpdate(id, "ENTER")}>
            입장
          </button>
        </div>
        {/*퇴장 버튼*/}
        <div className="button_row_bottom">
          <button className="btn_action exit_btn" onClick={() => onUpdate(id, "EXIT")}>
            퇴장
          </button>
        </div>
      </div>

    </div>
  );
}