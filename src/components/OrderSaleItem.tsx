'use client';

import { IOrderSaleList } from '@/types/mypage';
import React from 'react';
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
        <div className="flex flex-col border border-gray-30 rounded-xl ">
          <div className="flex w-full border-b border-gray-30 py-5 px-10 ">
            <p className="mr-auto text-gray-50">강의 정보</p>
            <p className="text-gray-50">금액</p>
          </div>
          {item?.products.map((item, index) => (
            <>
              <div
                key={index}
                className="flex flex-col py-5 px-10 border-b border-gray-30"
              >
                <div className="flex">
                  <img
                    className="w-36 h-24 mr-5"
                    src={`${SERVER}/${item?.image?.path}`}
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      // target.setAttribute('src', '/lecture-default.jpg')
                      target.src = '/lecture-default.jpg';
                    }}
                  />
                  <p className="truncate">{item?.name}</p>
                  <p className="ml-auto text-gray-50">
                    ₩{' '}
                    {item?.price
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                  </p>
                </div>
                {type === 'tutee' && (
                  <Link
                    className="bg-main-green px-2 py-1 w-fit rounded-md ml-auto text-white"
                    href={`/order/${item?._id}`}
                  >
                    강의 가기
                  </Link>
                )}
              </div>
              {type === 'tutor' && (
                <div className="flex flex-col py-5 px-10 border-b border-gray-30 ">
                  <div className="flex flex-col gap-2">
                    <div className="flex">
                      <p className="text-gray-50">수강 시작 일자</p>
                      <p className="text-left ml-[75px]">
                        {item?.extra?.schedule[0]?.slice(0, 10)}
                      </p>
                    </div>
                    <div className="flex">
                      <p className=" text-gray-50">수강 종료 일자</p>
                      <p className="text-left ml-[75px]">
                        {item?.extra?.schedule[1]?.slice(0, 10)}
                      </p>
                    </div>
                    <div className="flex ">
                      <p className=" text-gray-50 ">수강 방식</p>
                      <p className="text-left ml-28">
                        {item?.extra?.address ? '대면 강의' : '화상 강의'}
                      </p>
                    </div>
                  </div>
                  <Link
                    className="bg-main-green px-2 py-1 w-fit rounded-md ml-auto text-white"
                    href={`/${item?.extra?.type}/${item?._id}`}
                  >
                    강의 가기
                  </Link>
                </div>
              )}
            </>
          ))}
          {type === 'tutor' && (
            <div className="flex flex-col py-5 px-10 gap-2 border-b border-gray-30">
              <div className="flex">
                <p className="text-gray-50">수강생 이름</p>
                <p className="text-left ml-24">{item?.user?.name}</p>
              </div>
              <div className="flex">
                <p className="text-gray-50">수강생 이메일</p>
                <p className="text-left ml-20 truncate">{item?.user?.email}</p>
              </div>
            </div>
          )}

          <div className="bg-light-green">
            <div className="flex flex-col ml-auto w-[50%] p-5 gap-3 ">
              <div className="flex text-lg font-bold">
                <p>총계</p>
                <p className="ml-auto">
                  ₩{' '}
                  {item?.cost?.total
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                </p>
              </div>
              <div className="flex text-sm">
                <p className="font-semibold">주문상태</p>
                <p className="ml-auto text-gray-50">결제완료</p>
              </div>
              <div className="flex text-sm">
                <p className="font-semibold">주문시각</p>
                <p className="ml-auto text-gray-50">{item?.createdAt}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderSaleItem;
