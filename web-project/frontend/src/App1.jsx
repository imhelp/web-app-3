import React, { useState, useEffect } from "react";
import "./App1.css";
import Header from "./Header";
import List from "./List";

//인원수 적어두면 자동으로 초기 상태 계산
const initialRawData = [
  { id: 0, name: "입구 쪽", people: 15 }, //테스트용 15명(여유) 세팅
  { id: 1, name: "중간 쪽", people: 31 }, //테스트용 31명(보통) 세팅
  { id: 2, name: "출구 쪽", people: 40 }, //테스트용 40명(혼잡) 세팅
];

//인원수 기준으로 상태, 색상 레벨을 구해주는 공통 함수(숫자는 임의로 정함)
const getZoneStatus = (people) => {
  if (people === 0) return { status: "", level: "none" };
  if (people >= 1 && people <= 16) return { status: "여유", level: "low" };
  if (people >= 17 && people <= 32) return { status: "보통", level: "medium" };
  return { status: "혼잡", level: "high" }; // 33~48명 이상
};

export default function App1() {
  const [restaurants, setRestaurants] = useState([]);

  //인원수 맞춰 여유/보통/혼잡 계산
  useEffect(() => {
    const calculatedMock = initialRawData.map((it) => {
      const { status, level } = getZoneStatus(it.people);
      return { ...it, status, level, myEntry: false }; //사용자가 입장했는지 확인
    });
    setRestaurants(calculatedMock);
  }, []);

  //입장, 퇴장 상태 변경 및 인원 제어
  const onUpdate = (id, action) => {
    //식당 전체 구역 중 한 곳이라도 입장했는지 검사
    const isAnyZoneActive = restaurants.some(it => it.myEntry === true);

    //이미 한 곳에 입장하면 중복 입장 x
    if (action === "ENTER" && isAnyZoneActive) {
      return; 
    }

    setRestaurants(
      restaurants.map((it) => {
        if (it.id === id) {
          let updatedPeople = it.people;
          let isEntered = it.myEntry;

          if (action === "ENTER") {
            updatedPeople = Math.min(48, it.people + 1); // 사용자의 컴퓨터에서 누르면 +1명
            isEntered = true; // 사용자 입장
          } else if (action === "EXIT") {
            updatedPeople = Math.max(0, it.people - 1); // 퇴장 시 -1명
            isEntered = false; // 퇴장 처리
          }

          //실시간 상태 자동 업데이트
          const { status, level } = getZoneStatus(updatedPeople);

          return { 
            ...it, 
            status, 
            level, 
            people: updatedPeople,
            myEntry: isEntered
          };
        }
        return it;
      })
    );
  };

  //사용자가 이용 중인 구역
  const activeUsers = restaurants.filter(it => it.myEntry === true).length;

  //총 인원수
  let totalPeople = 0;
  for (let i = 0; i < restaurants.length; i++) {
    totalPeople += restaurants[i].people;
  }

  //전체 평균 혼잡도 계산(총합 144명 기준, 최대 혼잡도 100%)
  const averageCongestion = Math.min(100, Math.round((totalPeople / 144) * 100));

  //가장 인원수 적은 구역 찾기 
  let recommendedZone = "선택 불가";
  let minPeople = 999;
  for (let i = 0; i < restaurants.length; i++) {
    if (restaurants[i].people < minPeople) {
      minPeople = restaurants[i].people;
      recommendedZone = restaurants[i].name;
    }
  }

  //각 구역별 개별 혼잡도 퍼센트(구역 만석 48명 기준)
  const updatedRestaurants = restaurants.map(zone => {
    const zonePercent = Math.min(100, Math.round((zone.people / 48) * 100));
    return { ...zone, zoneCongestion: zonePercent };
  });
  // ========================================================

  return (
    <div className="App1">
      <Header />
      
      <div className="dashboard_horiz_container">
        <div className="dash_item recommend_box">
          <p className="dash_label">추천 구역</p>
          <p className="dash_value_recommend">{recommendedZone}</p>
        </div>

        <div className="dash_item user_count_box">
          <p className="dash_label">이용 인원</p>
          <p className="dash_value_highlight">{activeUsers}명</p>
        </div>
        
        <div className="dash_item total_box">
          <p className="dash_label">총 인원수</p>
          <p className="dash_value">{totalPeople}명</p>
        </div>
        
        <div className="dash_item avg_box">
          <p className="dash_label">평균 혼잡도</p>
          <p className="dash_value">{averageCongestion}%</p>
        </div>
      </div>

      <div className="list_main_wrapper">
        <List restaurants={updatedRestaurants} onUpdate={onUpdate} />
      </div>
    </div>
  );
}