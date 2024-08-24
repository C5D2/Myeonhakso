'use client';

import { useState } from 'react';
import MypageModal from './MypageModal';

export default function MobileMypageButton({
  type,
}: {
  type: string | undefined;
}) {
  const [modalActive, setModalActive] = useState(false);
  console.log('modalActive', modalActive);
  return (
    <>
      <button type="button" onClick={() => setModalActive(!modalActive)}>
        <img src="/footer-mypage.svg" alt="" className="mx-auto" />
        <p className="text-[10px]">내강의실</p>
      </button>
      {/* <div className="h-screen w-full fixed left-0 top-0 flx justify-center items-center bg-black bg-opacity-50 text-center">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inset-1 w-full max-w-[1000px] h-[500px] bg-white rounded-xl shadow-lg">
          <form
            onSubmit={handleSubmit(handleReview)}
            className="flex flex-col items-center h-full p-3 gap-3"
          >
            <button
              className="absolute right-0 top-3 px-4 py-1 bg-[url('/exit.svg')] w-5 h-5 bg-contain bg-no-repeat ml-auto"
              onClick={() => setButtonState(!buttonState)}
            ></button>
            <img src="" alt="" className="ml-auto px-3 py-1" />
            <h4 className="font-bold text-xl">수강평을 남겨 주세요.</h4>
            <div className="flex gap-1 justify-center">
              {starArray.map((item, index) => (
                <img
                  className="w-10 h-10"
                  key={index} // 리스트의 각 항목을 구분하기 위해 고유한 키를 추가합니다.
                  src={item === 0 ? '/empty-star.svg' : '/filled-star.svg'} // 예를 들어 빈 별과 채운 별을 구분할 수 있습니다.
                  onClick={handleStarClick}
                  data-rate={index + 1}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>
            <textarea
              placeholder="여기에 수강평을 작성해주세요."
              className="w-[50%] h-full p-2 border border-gray-300 rounded-md"
              {...register('content')}
            ></textarea>
            <button
              type="submit"
              className="mt-auto px-5 py-1 bg-main-green rounded-md text-white"
            >
              등록
            </button>
          </form>
        </div>
      </div> */}
      {modalActive && (
        <MypageModal
          modalActive={modalActive}
          setModalActive={setModalActive}
        />
      )}
    </>
  );
}
