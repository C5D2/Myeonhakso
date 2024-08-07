'use client';

import { IOrderSaleList } from '@/types/mypage';
import React from 'react';
import Button from './Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

type ParamType = {
  item: IOrderSaleList;
};

function OrderSaleItem({ item }: ParamType) {
  const path = usePathname();
  const p = path.split('/');
  const type = p[2];
  const listName = p[3];

  return (
    <>
      <div className="p-5 flex flex-col">
        <div className="flex items-center p-2">
          <p>주문 날짜 {item?.createdAt.substring(0, 10)}</p>
        </div>
        <div className="flex flex-col border border-black rounded-xl">
          <div className="flex w-full border border-b-black py-5 px-10">
            <p className="mr-auto">강의 정보</p>
            <p>금액</p>
          </div>
          {item?.products.map((item, index) => (
            <div
              key={index}
              className="flex flex-col py-5 px-10 border border-b-black"
            >
              <div className="flex">
                <img
                  className="w-20 h-16"
                  src={`${SERVER}/${item?.image?.path}`}
                />
                <p>한 입 크기로 잘라먹는 타입스크립트</p>
                <p className="ml-auto">
                  ₩{' '}
                  {item?.price
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                </p>
              </div>
              {type === 'tutee' && (
                <Link
                  className="bg-main-green px-2 py-1 w-fit rounded-md ml-auto text-white"
                  href={`/${item?.extra?.type}/${item?._id}`}
                >
                  강의 가기
                </Link>
              )}
            </div>
          ))}
          <div className="flex flex-col ml-auto w-[50%] p-5">
            <div className="flex text-lg font-bold">
              <p>총계</p>
              <p className="ml-auto">
                {item?.cost?.total
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
              </p>
            </div>
            <div className="flex text-sm">
              <p>주문상태</p>
              <p className="ml-auto text-gray-50">결제완료</p>
            </div>
            <div className="flex text-sm">
              <p>주문시각</p>
              <p className="ml-auto text-gray-50">{item?.createdAt}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderSaleItem;
