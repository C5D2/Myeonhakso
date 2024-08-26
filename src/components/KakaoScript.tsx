'use client';

import Script from 'next/script';
const appKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY;

function KakaoScript() {
  const onLoad = () => {
    window.Kakao.init(appKey);
  };

  return (
    <Script
      src="https://developers.kakao.com/sdk/js/kakao.js"
      async
      onLoad={onLoad}
    />
  );
}

export default KakaoScript;
