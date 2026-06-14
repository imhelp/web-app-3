import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Item from "./Item";

const BUILDINGS = [
  { name: "공대식당",    prefix: "공대식당 ",    color: "#2563EB" },
  { name: "구 바우어관", prefix: "구 바우어관 ", color: "#7C3AED" },
  { name: "신 바우어관", prefix: "신 바우어관 ", color: "#059669" },
  { name: "아람관",      prefix: "아람관 ",       color: "#D97706" },
];

// 운영 시간: [시*60+분, 시*60+분], null = 휴무
const BUILDING_HOURS = {
  "공대식당":    { weekday: [10*60, 19*60+30], saturday: [11*60, 15*60], sunday: null },
  "구 바우어관": { weekday: [9*60,  19*60],    saturday: null,           sunday: null },
  "신 바우어관": { weekday: [9*60,  19*60],    saturday: null,           sunday: null },
  "아람관":      { weekday: [7*60+30, 19*60],  saturday: null,           sunday: null },
};

const isBuildingClosed = (buildingName) => {
  const hours = BUILDING_HOURS[buildingName];
  if (!hours) return false;

  const now    = new Date();
  const day    = now.getDay(); // 0=일, 6=토
  const curMin = now.getHours() * 60 + now.getMinutes();

  const range = day === 0 ? hours.sunday
              : day === 6 ? hours.saturday
              :             hours.weekday;

  if (!range) return true; // 휴무
  return curMin < range[0] || curMin >= range[1];
};

const List = ({ zones, onReport }) => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const grouped = BUILDINGS
    .map(b => ({ ...b, zones: zones.filter(z => z.name.startsWith(b.prefix)) }))
    .filter(b => b.zones.length > 0)
    .filter(b => selected === null || b.name === selected);

  return (
    <div className="list_container">
      <div className="building_filter_bar">
        <button
          className={`bld_filter_btn${selected === null ? ' bld_filter_active' : ''}`}
          onClick={() => setSelected(null)}
        >
          전체
        </button>
        {BUILDINGS.map(b => (
          <button
            key={b.name}
            className={`bld_filter_btn${selected === b.name ? ' bld_filter_active' : ''}`}
            onClick={() => setSelected(b.name)}
          >
            {b.name}
          </button>
        ))}
      </div>

      {grouped.map(building => {
        const closed = isBuildingClosed(building.name);
        return (
          <div key={building.name} className="building_section">
            <div className="building_header">
              <span
                className="building_dot"
                style={{ background: closed ? '#D1D5DB' : building.color }}
              />
              {building.name}
              {closed && <span className="building_closed_tag">운영 종료</span>}
            </div>
            <div className="building_zones">
              {building.zones.map(it => (
                <Item
                  key={it.id}
                  {...it}
                  displayName={it.name.replace(building.prefix, '')}
                  buildingColor={building.color}
                  isClosed={closed}
                  onReport={onReport}
                  onCardClick={() => navigate(`/congestion/${it.id}`)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
