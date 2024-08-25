'use client';
/* global kakao */

import Script from 'next/script';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap({ address }: { address: string }) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadKakaoMap = () => {
      if (window.kakao && mapRef.current) {
        const container = mapRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        if (address) {
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.addressSearch(address, function (result: any, status: any) {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x,
              );
              const marker = new window.kakao.maps.Marker({
                map: map,
                position: coords,
              });
              map.setCenter(coords);
            }
          });
        }
      }
    };

    if (window.kakao && window.kakao.maps) {
      loadKakaoMap();
    } else {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false&libraries=services`;
      script.onload = () => {
        window.kakao.maps.load(loadKakaoMap);
      };
      document.head.appendChild(script);
    }
  }, [address]);

  return (
    <>
      <div id="map" ref={mapRef} className="w-full h-screen md:h-96" />
    </>
  );
}
