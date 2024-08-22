'use client';
/* global Kakao */

import { useEffect, useRef } from 'react';

export default function KakaoMap({ address }: { address: string }) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadKakaoMap = () => {
      if (window.Kakao && mapRef.current) {
        const container = mapRef.current;
        const options = {
          center: new window.Kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        const map = new window.Kakao.maps.Map(container, options);

        if (address) {
          const geocoder = new window.Kakao.maps.services.Geocoder();
          geocoder.addressSearch(address, function (result: any, status: any) {
            if (status === window.Kakao.maps.services.Status.OK) {
              const coords = new window.Kakao.maps.LatLng(
                result[0].y,
                result[0].x,
              );
              const marker = new window.Kakao.maps.Marker({
                map: map,
                position: coords,
              });
              map.setCenter(coords);
            }
          });
        }
      }
    };

    if (window.Kakao && window.Kakao.maps) {
      loadKakaoMap();
    } else {
      const script = document.createElement('script');
      script.src = `//dapi.Kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false&libraries=services`;
      script.onload = () => {
        window.Kakao.maps.load(loadKakaoMap);
      };
      document.head.appendChild(script);
    }
  }, [address]);

  return (
    <>
      <div id="map" ref={mapRef} className="w-full h-screen" />
    </>
  );
}
