'use client';

import { IOrderSaleList } from '@/types/mypage';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Pagination from './Pagination';
import ReviewButton from '@/app/mypage/tutee/orderlist/ReviewButton';
import { useState } from 'react';

type itemParam = {
  item: IOrderSaleList;
};

export default function OrderList({ item }: itemParam) {
  const path = usePathname();
  const p = path.split('/');
  const type = p[2];
  const listName = p[3];
  const [buttonState, setButtonState] = useState<boolean>(false);

  const setReviewState = () => {
    setButtonState(!buttonState);
  };

  return (
    <>
      <div className="p-5">
        <div className="flex items-center p-2">
          <p>주문 날짜 {item?.createdAt}</p>
          <Link
            href={`/mypage/${type}/${listName}/${item?._id}`}
            className="ml-auto flex items-center"
          >
            <p className="">주문 상세</p>
            <img src="/right-arrow.svg" className="w-6 h-6" />
          </Link>
        </div>
        <div className="flex border border-gray-50 rounded-xl p-10">
          <div className="결제완료">
            <div className="flex gap-10 items-center text-gray-90 mb-5 text-sm">
              <p className="bg-main-green w-fit px-2 py-1 rounded-md font-bold text-white">
                결제완료
              </p>
              {/* <p>
              주문번호 {item?.createdAt}
              {item?._id}
            </p> */}
            </div>
            {item?.products?.length === 1 ? (
              <h4 className="text-gray-90 font-bold">
                {item?.products[0].name}
              </h4>
            ) : (
              <h4 className="text-gray-90 font-bold">
                {item?.products[0]?.name}
                <span className="font-bold text-black">
                  {' '}
                  외 {item?.products?.length - 1}건
                </span>
              </h4>
            )}
          </div>
          {type === 'tutee' && (
            <>
              <div className="ml-auto">
                <p className="font-bold text-lg mb-3">
                  {' '}
                  합계 ₩
                  {item?.cost?.total
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                </p>
                <button
                  onClick={setReviewState}
                  className="px-2 py-1 border border-gray-50 rounded-md hover:bg-main-light-green"
                >
                  수강평 남기기
                </button>
              </div>
            </>
          )}

          {type === 'tutor' && (
            <div className="ml-auto mt-auto">
              {item?.products.map((item, index) => (
                <p className="text-right text-gray-50" key={index}>
                  ₩
                  {item?.price
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                </p>
              ))}
              <p className="border-t border-gray-30 font-bold">
                {' '}
                합계 ₩
                {item?.cost?.total
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
              </p>
            </div>
          )}
        </div>
        {buttonState && (
          <ReviewButton
            buttonState={buttonState}
            setButtonState={setButtonState}
            orderId={item?._id}
            productId={item?.products[0]?._id}
          />
        )}
      </div>
    </>
  );
}
