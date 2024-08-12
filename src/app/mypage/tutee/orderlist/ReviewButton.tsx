'use client';

import { postReview } from '@/data/actions/mypageAction';
import React, { useState } from 'react';
import { useForm, UseFormRegister } from 'react-hook-form';

interface IReview {
  content: string;
}
interface DOMEvent<T extends EventTarget> extends Event {
  readonly target: T;
}

export default function ReviewButton({
  buttonState,
  setButtonState,
  orderId,
  productId,
}: {
  buttonState: boolean;
  setButtonState: React.Dispatch<React.SetStateAction<boolean>>;
  orderId: number;
  productId: number;
}) {
  const { register, handleSubmit, watch } = useForm<IReview>();
  const [starArray, setStarArray] = useState([0, 0, 0, 0, 0]);

  const handleStarClick = (e: DOMEvent<HTMLImageElement>) => {
    const rate = Number(e.target.getAttribute('data-rate'));
    let newStarArray = [];
    for (let i = 1; i <= rate; i++) {
      newStarArray.push(1);
    }
    for (let j = rate; j < 5; j++) {
      newStarArray.push(0);
    }
    setStarArray(newStarArray);
  };

  const handleReview = async formData => {
    const rate = starArray.filter(i => i === 1).length;
    formData.order_id = orderId;
    formData.product_id = productId;
    formData.rating = rate;

    const resData = await postReview(formData);
    setButtonState(!buttonState);

    if ('errors' in resData) {
      console.error(resData.errors);
    }
  };

  return (
    <>
      <div className="h-screen w-full fixed left-0 top-0 flx justify-center items-center bg-black bg-opacity-50 text-center">
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
      </div>
    </>
  );
}
