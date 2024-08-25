'use client';

import Image from 'next/image';
import React, { useState } from 'react';

export function ShareButton() {
  const [buttonState, setButtonState] = useState<boolean>(false);

  const setSharePopupState = () => {
    setButtonState(!buttonState);
  };

  return (
    <>
      <div className="cursor-pointer" onClick={setSharePopupState}>
        <Image src="/share.svg" width={30} height={20} alt="공유하기" />
      </div>

      {buttonState && (
        <SharePopup buttonState={buttonState} setButtonState={setButtonState} />
      )}
    </>
  );
}

export function SharePopup({
  buttonState,
  setButtonState,
}: {
  buttonState: boolean;
  setButtonState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleShareToKakao = () => {
    const { Kakao, location } = window;
    Kakao.Share.sendScrap({
      requestUrl: location.href,
    });
  };

  const copyURL = () => {
    let currentUrl = window.document.location.href;
    let t = document.createElement('textarea');
    document.body.appendChild(t);
    t.value = currentUrl;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);

    alert('링크가 복사되었습니다.');
  };

  return (
    <>
      <div className="h-full w-full fixed left-0 top-0 flx justify-center items-center bg-black bg-opacity-50 text-center">
        <div className="absolute top-1/3 left-1/3 md:left-52 transform -translate-x-1/2 -translate-y-1/2 inset-1 w-full max-w-[400px] h-[200px] bg-white rounded-xl shadow-lg">
          <button
            className="absolute right-0 top-3 px-4 py-1 bg-[url('/exit.svg')] w-5 h-5 bg-contain bg-no-repeat ml-auto"
            onClick={() => setButtonState(!buttonState)}
          ></button>
          <h4 className="font-bold text-2xl m-4">공유하기</h4>
          <div className="flex gap-10 place-content-center justify-center">
            <button onClick={handleShareToKakao}>
              <div className="rounded-full p-3 bg-yellow-300 mt-3">
                <Image
                  className="h-10 w-10 cursor-pointer"
                  src="/images/kakao-talk.svg"
                  width={40}
                  height={40}
                  alt="KakaoTalk"
                />
              </div>
            </button>
            <button onClick={copyURL}>
              <div className="rounded-full p-3 mt-2 bg-main-green/50">
                <Image
                  src="/clip-board.svg"
                  className="h-10 w-10 cursor-pointer"
                  width={40}
                  height={40}
                  alt="ClipBoard"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
