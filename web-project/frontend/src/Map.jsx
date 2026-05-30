import React, { useEffect, useRef, useState } from 'react';
import './Map_style.css'; 

const cafeteriaLocations = [
  { id: 'gongdae', name: '공식당', label: '공대 식당', lat: 35.8584, lng: 128.4893 },
  { id: 'guba', name: '구바', lat: 35.8543, lng: 128.4861 },
  { id: 'shinba', name: '신바', lat: 35.8540, lng: 128.4856 },
  { id: 'aram', name: '아람관', lat: 35.8541, lng: 128.4826 },
];

function Map() {
  const mapElement = useRef(null);
  const mapRef = useRef(null);
  const currentPolyline = useRef(null);
  const markersAndWindowsRef = useRef({});
  const [myLocation, setMyLocation] = useState(null);
  const [naverReady, setNaverReady] = useState(() => Boolean(window.naver?.maps));
  const [mapError, setMapError] = useState(null);
  const TMAP_KEY = 'NhPEBpY4iC2XVJJFxYttUaB27IAi9vwd216HB3nw';
  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_MAP_CLIENT_ID;

  // 브라우저 GPS 센서로부터 좌표를 먼저 받아오는 useEffect
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // GPS 수신 성공 시 실제 사용자 좌표 세팅
          setMyLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.warn("실시간 위치 확보 실패, 기본 좌표로 대체함:", error.message);
          // 실패 시 백업용 기본 좌표 세팅
          setMyLocation({ lat: 35.8564, lng: 128.4938 });
        },
        { enableHighAccuracy: true, timeout: 7000, maximumAge: 0 } // 정확도 최대로 높임
      );
    } else {
      setMyLocation({ lat: 35.8564, lng: 128.4938 });
    }
  }, []);

  useEffect(() => {
    if (window.naver?.maps) {
      setNaverReady(true);
      return;
    }

    if (!NAVER_CLIENT_ID) {
      setMapError(
        '네이버 지도 API 키가 없습니다. frontend/.env.local 파일에 REACT_APP_NAVER_MAP_CLIENT_ID=발급받은키 를 추가한 뒤 서버를 재시작하세요.'
      );
      return;
    }

    const existingScript = document.querySelector('script[data-naver-maps]');
    if (existingScript) {
      existingScript.addEventListener('load', () => setNaverReady(true));
      return;
    }

    const script = document.createElement('script');
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_CLIENT_ID}`;
    script.async = true;
    script.dataset.naverMaps = 'true';
    script.onload = () => setNaverReady(true);
    script.onerror = () => {
      setMapError('네이버 지도 스크립트를 불러오지 못했습니다. Client ID와 도메인 설정을 확인하세요.');
    };
    document.head.appendChild(script);
  }, [NAVER_CLIENT_ID]);

  useEffect(() => {
    if (!myLocation || !naverReady || !mapElement.current || !window.naver?.maps) return;

    if (mapRef.current) return;

    const mapOptions = {
      center: new window.naver.maps.LatLng(myLocation.lat, myLocation.lng),
      zoom: 17,
    };

    const map = new window.naver.maps.Map(mapElement.current, mapOptions);
    mapRef.current = map;

    const markerListeners = [];

    // 사용자 현재 위치 파란색 마커 표시
    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(myLocation.lat, myLocation.lng),
      map: map,
      icon: {
        content: `
          <div style="
            width: 14px; 
            height: 14px; 
            background: #3b82f6; 
            border: 2px solid #fff; 
            border-radius: 50%; 
            box-shadow: 0 0 5px rgba(0,0,0,0.3);
          "></div>
        `,
        anchor: new window.naver.maps.Point(7, 7)
      }
    });

    // 학식당 마커 세팅
    cafeteriaLocations.forEach((loc) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(loc.lat, loc.lng),
        map: map,
        title: loc.name,
      });

      const infoWindow = new window.naver.maps.InfoWindow({
        content: `
          <div style="padding: 10px; font-size: 14px;">
            <b>${loc.name}</b><br/>경로 탐색 중...
          </div>
        `,
      });

      markersAndWindowsRef.current[loc.id] = { marker, infoWindow };

      const listener = window.naver.maps.Event.addListener(marker, 'click', () => {
        infoWindow.open(map, marker);
        getPedestrianRoute(loc, infoWindow, myLocation); 
      });
      markerListeners.push(listener);
    });

    return () => {
      markerListeners.forEach((listener) => {
        window.naver.maps.Event.removeListener(listener);
      });
      if (currentPolyline.current) {
        currentPolyline.current.setMap(null);
        currentPolyline.current = null;
      }
      mapRef.current = null;
      markersAndWindowsRef.current = {};
    };

  }, [myLocation, naverReady]);

  const getPedestrianRoute = async (target, infoWindow, originPos = myLocation) => {
    const map = mapRef.current;
    if (!map || !originPos) return;

    if (currentPolyline.current) {
      currentPolyline.current.setMap(null);
      currentPolyline.current = null;
    }

    try {
      const response = await fetch(
        'https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&callback=function',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'appKey': TMAP_KEY,
          },
          body: JSON.stringify({
            startX: String(originPos.lng),
            startY: String(originPos.lat),
            endX: String(target.lng),
            endY: String(target.lat),
            reqCoordType: 'WGS84GEO',
            resCoordType: 'WGS84GEO',
            startName: '내 위치',
            endName: target.name,
          }),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        if (errText.includes('4322') || errText.includes('너무 가깝습니다')) {
          infoWindow.setContent(`
            <div style="padding: 10px; font-size: 14px; line-height: 1.5;">
              <b>${target.name}</b><br/>
              <span style="color: #ef4444;">너무 가까운 거리입니다 (직선 표시)</span>
            </div>
          `);
          drawFailureLine(target, originPos);
          return;
        }
        throw new Error('티맵 에러');
      }

      const data = await response.json();
      const routePath = [];

      let distance = data.features[0].properties.totalDistance;
      let time = Math.ceil(data.features[0].properties.totalTime / 60);

      data.features.forEach((feature) => {
        const { geometry } = feature;
        if (geometry.type === 'Point') {
          const [lng, lat] = geometry.coordinates;
          routePath.push(new window.naver.maps.LatLng(lat, lng));
        } else if (geometry.type === 'LineString') {
          geometry.coordinates.forEach((coord) => {
            const [lng, lat] = coord;
            routePath.push(new window.naver.maps.LatLng(lat, lng));
          });
        }
      });

      infoWindow.setContent(`
        <div style="padding: 10px; font-size: 14px; line-height: 1.5;">
          <b>${target.name}</b><br/>
          ⏱️ 소요시간: <span style="color: #3b82f6; font-weight: bold;">${time}분</span><br/>
          📏 총거리: ${distance}m
        </div>
      `);

      currentPolyline.current = new window.naver.maps.Polyline({
        map: map,
        path: routePath,
        strokeColor: '#3b82f6',
        strokeOpacity: 0.8,
        strokeWeight: 6,
      });

    } catch (err) {
      console.error('Route error:', err);
    }
  };

  const drawFailureLine = (target, originPos = myLocation) => {
    const map = mapRef.current;
    if (!map || !originPos) return;

    const points = [
      new window.naver.maps.LatLng(originPos.lat, originPos.lng),
      new window.naver.maps.LatLng(target.lat, target.lng)
    ];

    currentPolyline.current = new window.naver.maps.Polyline({
      map: map,
      path: points,
      strokeColor: '#ef4444',
      strokeOpacity: 0.6,
      strokeWeight: 4,
      strokeStyle: 'dash'
    });
  };

  const triggerClickEvent = (targetId) => {
    const targetData = markersAndWindowsRef.current[targetId];
    const locInfo = cafeteriaLocations.find(l => l.id === targetId);

    if (targetData && locInfo && mapRef.current) {
      const { marker, infoWindow } = targetData;
      infoWindow.open(mapRef.current, marker);
      getPedestrianRoute(locInfo, infoWindow, myLocation);
    }
  };

  return (
    <div className="map-wrapper">
      {!myLocation ? (
        <div className="map-status">
          실시간 GPS 위치를 확인하고 있습니다...
        </div>
      ) : mapError ? (
        <div className="map-status map-status--error">
          {mapError}
        </div>
      ) : !naverReady ? (
        <div className="map-status">
          네이버 지도를 불러오는 중...
        </div>
      ) : (
        <div ref={mapElement} className="map-container" />
      )}
      
      <div className="cafeteria_list">
        {cafeteriaLocations.map((loc) => (
          <div
            key={loc.id}
            className={loc.id}
            onClick={() => triggerClickEvent(loc.id)}
            style={{ cursor: 'pointer' }}
          >
            <div><p>{loc.label || loc.name}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Map;
