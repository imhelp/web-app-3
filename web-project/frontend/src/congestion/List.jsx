import React, { useState } from "react";
import Item from "./Item";

const List = ({ restaurants, onUpdate }) => {
  const [search, setSearch] = useState("");

  // 검색어 필터링
  const filteredData = restaurants.filter((it) =>
    it.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="list_container">
      {/* 검색창 */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="구역 이름 검색..."
        className="searchbar"
      />
      
      {/* 카드 리스트 감싸는 박스*/}
      <div className="list_wrapper">
        {filteredData.map((it) => (
          <Item key={it.id} {...it} onUpdate={onUpdate} />
        ))}
      </div>
    </div>
  );
};

export default List;